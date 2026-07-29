import { afterEach, describe, expect, test, vi } from 'vitest';
import { runDocumentWorker } from './documentWorkerTask.js';

class FakeWorker {
	static instances: FakeWorker[] = [];
	onmessage: ((event: MessageEvent) => void) | null = null;
	onerror: ((event: ErrorEvent) => void) | null = null;
	isTerminated = false;

	constructor() {
		FakeWorker.instances.push(this);
	}

	postMessage() {}

	terminate() {
		this.isTerminated = true;
	}
}

class FailingWorker extends FakeWorker {
	postMessage() {
		throw new Error('transfer failed');
	}
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
	FakeWorker.instances = [];
});

describe('document worker task', () => {
	test('fails explicitly when workers are unavailable', () => {
		vi.stubGlobal('Worker', undefined);
		expect(() => runDocumentWorker('', {}, [], new AbortController().signal)).toThrow(
			'requires Web Worker support'
		);
	});

	test('terminates the worker and revokes its Blob URL when cancelled', async () => {
		vi.stubGlobal('Worker', FakeWorker);
		vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:document-viewer');
		const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
		const abortController = new AbortController();
		const task = runDocumentWorker('', {}, [], abortController.signal);

		abortController.abort();

		await expect(task.promise).rejects.toMatchObject({ name: 'AbortError' });
		expect(FakeWorker.instances[0]?.isTerminated).toBe(true);
		expect(revoke).toHaveBeenCalledWith('blob:document-viewer');
	});

	test('cleans up when worker startup or message transfer fails', async () => {
		vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:document-viewer');
		const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
		vi.stubGlobal(
			'Worker',
			class {
				constructor() {
					throw new Error('blocked by CSP');
				}
			}
		);
		expect(() => runDocumentWorker('', {}, [], new AbortController().signal)).toThrow(
			'could not start: blocked by CSP'
		);
		expect(revoke).toHaveBeenCalledWith('blob:document-viewer');

		vi.stubGlobal('Worker', FailingWorker);
		const task = runDocumentWorker('', {}, [], new AbortController().signal);
		await expect(task.promise).rejects.toThrow('transfer failed');
		expect(FakeWorker.instances.at(-1)?.isTerminated).toBe(true);
		expect(revoke).toHaveBeenCalledTimes(2);
	});
});
