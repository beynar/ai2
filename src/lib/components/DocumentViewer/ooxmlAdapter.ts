import { loadDocumentViewerRuntime, type DocumentViewerAssets } from './documentViewer.assets.js';
import type { DocumentFormat } from './documentViewer.props.js';
import { toArrayBuffer } from './documentViewer.source.js';

export interface OoxmlTextRun {
	text: string;
	font?: string;
	[key: string]: unknown;
}

export type OoxmlHyperlinkTarget =
	{ kind: 'external'; url: string } | { kind: 'internal'; ref: string; slideIndex?: number };

interface DocxEngine {
	pageCount: number;
	pageSize(index: number): { widthPt: number; heightPt: number };
	renderPageToBitmap(
		index: number,
		options: { width: number; dpr: number; onTextRun?: (run: OoxmlTextRun) => void }
	): Promise<ImageBitmap>;
	collectPageRuns(
		index: number,
		options?: { width?: number; dpr?: number }
	): Promise<OoxmlTextRun[]>;
	getBookmarkPage(name: string): number | undefined;
	destroy(): void;
}

interface PptxEngine {
	slideCount: number;
	slideWidth: number;
	slideHeight: number;
	renderSlideToBitmap(
		index: number,
		options: { width: number; dpr: number; onTextRun?: (run: OoxmlTextRun) => void }
	): Promise<ImageBitmap>;
	collectSlideRuns(index: number, width?: number): Promise<OoxmlTextRun[]>;
	resolveInternalTarget(reference: string, currentIndex?: number): number | undefined;
	destroy(): void;
}

interface OoxmlRuntime {
	DocxDocument?: {
		load(
			source: ArrayBuffer,
			options: { mode: 'worker'; password?: string; wasmUrl?: string | URL }
		): Promise<DocxEngine>;
	};
	PptxPresentation?: {
		load(
			source: ArrayBuffer,
			options: { mode: 'worker'; password?: string; wasmUrl?: string | URL }
		): Promise<PptxEngine>;
	};
	buildDocxTextLayer?: (
		layer: HTMLDivElement,
		runs: OoxmlTextRun[],
		width: number,
		height: number,
		onLink?: (target: OoxmlHyperlinkTarget) => void
	) => void;
	buildPptxTextLayer?: (
		layer: HTMLDivElement,
		runs: OoxmlTextRun[],
		width: number,
		height: number,
		onLink?: (target: OoxmlHyperlinkTarget) => void
	) => void;
}

export type OoxmlModel =
	| {
			kind: 'ooxml';
			format: 'docx';
			engine: DocxEngine;
			runtime: OoxmlRuntime;
			textCache: Map<number, Promise<string>>;
	  }
	| {
			kind: 'ooxml';
			format: 'pptx';
			engine: PptxEngine;
			runtime: OoxmlRuntime;
			textCache: Map<number, Promise<string>>;
	  };

const assertWorkerCanvas = () => {
	if (typeof OffscreenCanvas === 'undefined' || typeof ImageBitmap === 'undefined') {
		throw new Error('DOCX and PPTX preview requires OffscreenCanvas and ImageBitmap support.');
	}
};

export const loadOoxml = async (
	bytes: Uint8Array,
	format: Extract<DocumentFormat, 'docx' | 'pptx'>,
	assets: DocumentViewerAssets,
	password: string | undefined,
	signal: AbortSignal
): Promise<OoxmlModel> => {
	assertWorkerCanvas();
	if (signal.aborted) throw new DOMException('Document loading was aborted.', 'AbortError');
	const formatAssets = assets[format];
	const runtime = await loadDocumentViewerRuntime<OoxmlRuntime>(formatAssets.moduleUrl);
	if (signal.aborted) throw new DOMException('Document loading was aborted.', 'AbortError');
	const source = toArrayBuffer(bytes);
	if (format === 'docx') {
		if (!runtime.DocxDocument) throw new Error('The DOCX runtime did not expose DocxDocument.');
		const engine = await runtime.DocxDocument.load(source, {
			mode: 'worker',
			password,
			wasmUrl: formatAssets.wasmUrl
		});
		if (signal.aborted) {
			engine.destroy();
			throw new DOMException('Document loading was aborted.', 'AbortError');
		}
		return { kind: 'ooxml', format, engine, runtime, textCache: new Map() };
	}
	if (!runtime.PptxPresentation) {
		throw new Error('The PPTX runtime did not expose PptxPresentation.');
	}
	const engine = await runtime.PptxPresentation.load(source, {
		mode: 'worker',
		password,
		wasmUrl: formatAssets.wasmUrl
	});
	if (signal.aborted) {
		engine.destroy();
		throw new DOMException('Document loading was aborted.', 'AbortError');
	}
	return { kind: 'ooxml', format, engine, runtime, textCache: new Map() };
};

export const getOoxmlUnitCount = (model: OoxmlModel) =>
	model.format === 'docx' ? model.engine.pageCount : model.engine.slideCount;

export const getOoxmlNaturalSize = (model: OoxmlModel, index: number) => {
	if (model.format === 'docx') {
		const size = model.engine.pageSize(index);
		return { width: (size.widthPt * 96) / 72, height: (size.heightPt * 96) / 72 };
	}
	return {
		width: model.engine.slideWidth / 9525,
		height: model.engine.slideHeight / 9525
	};
};

export const renderOoxmlUnit = async (
	model: OoxmlModel,
	index: number,
	width: number,
	dpr: number,
	onTextRun?: (run: OoxmlTextRun) => void
) =>
	model.format === 'docx'
		? model.engine.renderPageToBitmap(index, { width, dpr, onTextRun })
		: model.engine.renderSlideToBitmap(index, { width, dpr, onTextRun });

export const getOoxmlUnitText = (model: OoxmlModel, index: number): Promise<string> => {
	const cached = model.textCache.get(index);
	if (cached) return cached;
	const naturalWidth = getOoxmlNaturalSize(model, index).width;
	const pending = (
		model.format === 'docx'
			? model.engine.collectPageRuns(index, { width: naturalWidth, dpr: 1 })
			: model.engine.collectSlideRuns(index, naturalWidth)
	).then((runs) => runs.map((run) => run.text).join(''));
	model.textCache.set(index, pending);
	return pending;
};

export const buildOoxmlTextLayer = (
	model: OoxmlModel,
	layer: HTMLDivElement,
	runs: OoxmlTextRun[],
	width: number,
	height: number,
	onLink: (target: OoxmlHyperlinkTarget) => void
) => {
	if (model.format === 'docx') {
		model.runtime.buildDocxTextLayer?.(layer, runs, width, height, onLink);
		return;
	}
	model.runtime.buildPptxTextLayer?.(layer, runs, width, height, onLink);
};

export const resolveOoxmlInternalLink = (
	model: OoxmlModel,
	target: Extract<OoxmlHyperlinkTarget, { kind: 'internal' }>,
	currentIndex: number
) =>
	model.format === 'docx'
		? model.engine.getBookmarkPage(target.ref)
		: (target.slideIndex ?? model.engine.resolveInternalTarget(target.ref, currentIndex));

export const destroyOoxml = (model: OoxmlModel) => model.engine.destroy();
