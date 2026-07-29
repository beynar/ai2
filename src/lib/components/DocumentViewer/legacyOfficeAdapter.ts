import type { DocumentViewerAssets } from './documentViewer.assets.js';
import type { DocumentFormat } from './documentViewer.props.js';
import { toArrayBuffer } from './documentViewer.source.js';
import { runDocumentWorker } from './documentWorkerTask.js';

export interface LegacyDocumentUnit {
	title?: string;
	text: string;
}

export interface LegacyOfficeModel {
	kind: 'legacy';
	format: Extract<DocumentFormat, 'doc' | 'ppt'>;
	units: LegacyDocumentUnit[];
	warning: string;
}

const legacyWorkerSource = (moduleUrl: string, wasmUrl?: string) => `
const collectText = (value, strings, seen) => {
	if (Array.isArray(value)) {
		for (const entry of value) collectText(entry, strings, seen);
		return;
	}
	if (!value || typeof value !== 'object') return;
	if (seen.has(value)) return;
	seen.add(value);
	if (typeof value.text === 'string') {
		const clean = value.text.replace(/\\r\\n?/g, '\\n').trim();
		if (clean) strings.push(clean);
	}
	for (const [key, entry] of Object.entries(value)) {
		if (key !== 'text') collectText(entry, strings, seen);
	}
};

const findSections = (value, seen = new WeakSet()) => {
	if (!value || typeof value !== 'object') return null;
	if (seen.has(value)) return null;
	seen.add(value);
	if (Array.isArray(value.sections)) return value.sections;
	for (const entry of Object.values(value)) {
		const sections = findSections(entry, seen);
		if (sections) return sections;
	}
	return null;
};

const paginate = (text) => {
	const explicit = text.split(/\\f+/).map((page) => page.trim()).filter(Boolean);
	if (explicit.length > 1) return explicit.map((page) => ({ text: page }));
	const lines = text.split(/\\r?\\n/);
	const pages = [];
	let page = [];
	let characters = 0;
	for (const line of lines) {
		if (page.length >= 48 || characters + line.length > 3800) {
			pages.push({ text: page.join('\\n').trim() });
			page = [];
			characters = 0;
		}
		page.push(line);
		characters += line.length + 1;
	}
	if (page.length || !pages.length) pages.push({ text: page.join('\\n').trim() });
	return pages;
};

self.onmessage = async (event) => {
	let documentHandle;
	try {
		const runtime = await import(${JSON.stringify(moduleUrl)});
		await runtime.default(${JSON.stringify(wasmUrl)});
		documentHandle = new runtime.WasmDocument(new Uint8Array(event.data.bytes), event.data.format);
		const plainText = documentHandle.plainText();
		let units;
		if (event.data.format === 'doc') {
			units = paginate(plainText);
		} else {
			let sections = null;
			try {
				sections = findSections(documentHandle.toIr());
			} catch {
				// The explicit plain-text fallback below is part of the legacy preview contract.
			}
			if (sections?.length) {
				units = sections.map((section, index) => {
					const text = [];
					collectText(section.elements ?? section, text, new WeakSet());
					const sectionTitle = typeof section.title === 'string' ? section.title.trim() : '';
					const hasGenericTitle = !sectionTitle || /^Slide \\d+$/i.test(sectionTitle);
					const title = hasGenericTitle ? text.shift() || sectionTitle : sectionTitle;
					return { title: title || 'Slide ' + (index + 1), text: text.join('\\n') };
				});
			} else {
				units = paginate(plainText).map((unit, index) => ({ title: 'Slide ' + (index + 1), text: unit.text }));
			}
		}
		self.postMessage({ ok: true, value: { units } });
	} catch (error) {
		self.postMessage({ ok: false, error: error instanceof Error ? error.message : String(error) });
	} finally {
		documentHandle?.free();
	}
};`;

export const loadLegacyOffice = async (
	bytes: Uint8Array,
	format: LegacyOfficeModel['format'],
	assets: DocumentViewerAssets,
	signal: AbortSignal
): Promise<LegacyOfficeModel> => {
	const buffer = toArrayBuffer(bytes);
	const task = runDocumentWorker<
		{ bytes: ArrayBuffer; format: LegacyOfficeModel['format'] },
		{ units: LegacyDocumentUnit[] }
	>(
		legacyWorkerSource(assets.legacy.moduleUrl, assets.legacy.wasmUrl),
		{ bytes: buffer, format },
		[buffer],
		signal
	);
	const { units } = await task.promise;
	return {
		kind: 'legacy',
		format,
		units,
		warning:
			format === 'doc'
				? 'Best-effort legacy DOC preview: pagination and layout may differ from the original.'
				: 'Best-effort legacy PPT preview: slide layout and styling may differ from the original.'
	};
};
