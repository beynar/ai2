import { describe, expect, test } from 'vitest';
import {
	clearDocumentViewerRuntimeCache,
	documentViewerAssets,
	loadDocumentViewerRuntime,
	resolveDocumentViewerAssets
} from './documentViewer.assets.js';

describe('document viewer runtime assets', () => {
	test('uses exact pinned runtime versions', () => {
		expect(documentViewerAssets.pdf.moduleUrl).toContain('/5.4.149/');
		expect(documentViewerAssets.docx.moduleUrl).toContain('@silurus/ooxml@0.72.2');
		expect(documentViewerAssets.spreadsheet.moduleUrl).toContain('xlsx-0.20.3');
		expect(documentViewerAssets.csv.moduleUrl).toContain('papaparse@5.5.4');
		expect(documentViewerAssets.legacy.moduleUrl).toContain('office-oxide-wasm@0.1.8');
	});

	test('merges one nested self-host override without changing other formats', () => {
		const assets = resolveDocumentViewerAssets({
			pptx: { moduleUrl: '/runtime/pptx.mjs' }
		});
		expect(assets.pptx.moduleUrl).toBe('/runtime/pptx.mjs');
		expect(assets.pptx.wasmUrl).toBe(documentViewerAssets.pptx.wasmUrl);
		expect(assets.docx).toEqual(documentViewerAssets.docx);
	});

	test('deduplicates concurrent imports and clears failures for retry', async () => {
		clearDocumentViewerRuntimeCache();
		const successUrl = 'data:text/javascript,export const value=42';
		const first = loadDocumentViewerRuntime<{ value: number }>(successUrl);
		const second = loadDocumentViewerRuntime<{ value: number }>(successUrl);
		expect(first).toBe(second);
		await expect(first).resolves.toMatchObject({ value: 42 });

		const failureUrl = 'data:text/javascript,throw new Error("runtime-failure")';
		const failed = loadDocumentViewerRuntime(failureUrl);
		await expect(failed).rejects.toThrow('runtime-failure');
		const retried = loadDocumentViewerRuntime(failureUrl);
		expect(retried).not.toBe(failed);
		await expect(retried).rejects.toThrow('runtime-failure');
	});
});
