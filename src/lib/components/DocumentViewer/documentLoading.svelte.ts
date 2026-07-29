import { BROWSER } from 'esm-env';
import type { DocumentFormat } from './documentViewer.props.js';
import {
	detectDocumentFormat,
	inferDocumentFileName,
	resolveDocumentSource,
	sniffDocumentFormat
} from './documentViewer.source.js';
import { destroyOoxml, getOoxmlUnitCount, loadOoxml } from './ooxmlAdapter.js';
import { loadSpreadsheet } from './spreadsheetAdapter.js';
import { loadLegacyOffice } from './legacyOfficeAdapter.js';
import type { DocumentViewerState } from './documentViewer.state.svelte.js';

export class DocumentLoading {
	originalBytes: Uint8Array | null = null;
	sourceFileName: string | undefined;
	sourceMimeType: string | undefined;

	private loadToken = 0;
	private abortController: AbortController | null = null;

	constructor(private readonly viewer: DocumentViewerState) {}

	load = async () => {
		if (!BROWSER) return;
		const token = ++this.loadToken;
		this.abortController?.abort();
		const abortController = new AbortController();
		this.abortController = abortController;
		this.disposeModel();
		this.viewer.resetSurface();
		this.originalBytes = null;
		this.sourceFileName = undefined;
		this.sourceMimeType = undefined;
		this.viewer.resetDocument();

		const inferredName = inferDocumentFileName(this.viewer.src, this.viewer.fileName);
		const metadataFormat = detectDocumentFormat({
			format: this.viewer.requestedFormat,
			fileName: inferredName
		});
		this.viewer.format = metadataFormat ?? null;

		try {
			if (metadataFormat === 'pages') throw this.pagesError();
			const source = await resolveDocumentSource(
				this.viewer.src,
				inferredName,
				abortController.signal
			);
			if (token !== this.loadToken) return;
			const namedFormat = detectDocumentFormat({
				format: this.viewer.requestedFormat,
				fileName: source.fileName,
				mimeType: source.mimeType
			});
			const sniffedFormat = sniffDocumentFormat(source.bytes);
			if (
				!this.viewer.requestedFormat &&
				namedFormat &&
				sniffedFormat &&
				namedFormat !== sniffedFormat
			) {
				throw new Error(
					`The document metadata identifies ${namedFormat.toUpperCase()}, but its contents are ${sniffedFormat.toUpperCase()}.`
				);
			}
			const format = this.viewer.requestedFormat ?? namedFormat ?? sniffedFormat;
			if (!format) {
				throw new Error(
					'The document type could not be detected. Pass the format prop or fileName.'
				);
			}
			if (format === 'pages') throw this.pagesError();

			this.viewer.format = format;
			this.originalBytes = source.bytes;
			this.sourceFileName = source.fileName;
			this.sourceMimeType = source.mimeType;
			await this.loadModel(format, source.bytes, token, abortController);
		} catch (error) {
			if (token !== this.loadToken || abortController.signal.aborted) return;
			this.viewer.reportLoadError(error instanceof Error ? error : new Error(String(error)));
		}
	};

	finishLoad = () => {
		if (
			this.viewer.totalPages &&
			(this.viewer.page < 1 || this.viewer.page > this.viewer.totalPages)
		) {
			this.viewer.page = 1;
		}
		if (
			this.viewer.sheetNames.length &&
			(this.viewer.sheet < 1 || this.viewer.sheet > this.viewer.sheetNames.length)
		) {
			this.viewer.sheet = 1;
		}
		this.viewer.loading = false;
		this.viewer.onLoad?.(this.viewer);
	};

	dispose = () => {
		this.loadToken++;
		this.abortController?.abort();
		this.disposeModel();
	};

	private loadModel = async (
		format: Exclude<DocumentFormat, 'pages'>,
		bytes: Uint8Array,
		token: number,
		abortController: AbortController
	) => {
		const assets = this.viewer.resolvedAssets;
		switch (format) {
			case 'pdf':
				this.viewer.model = { kind: 'pdf', format, id: token, bytes };
				return;
			case 'docx':
			case 'pptx': {
				const model = await loadOoxml(
					bytes,
					format,
					assets,
					this.viewer.password,
					abortController.signal
				);
				if (token !== this.loadToken) {
					destroyOoxml(model);
					return;
				}
				const unitCount = getOoxmlUnitCount(model);
				if (!unitCount) {
					destroyOoxml(model);
					throw new Error(`The ${format.toUpperCase()} document contains no viewable units.`);
				}
				this.viewer.model = model;
				this.viewer.totalPages = unitCount;
				this.finishLoad();
				return;
			}
			case 'xlsx':
			case 'xls':
			case 'csv': {
				const model = await loadSpreadsheet(bytes, format, assets, abortController.signal);
				if (token !== this.loadToken) return;
				this.viewer.model = model;
				this.viewer.sheetNames = model.sheets.map((spreadsheet) => spreadsheet.name);
				for (const warning of model.warnings.slice(0, 3)) this.viewer.reportWarning(warning);
				this.finishLoad();
				return;
			}
			case 'doc':
			case 'ppt': {
				const model = await loadLegacyOffice(bytes, format, assets, abortController.signal);
				if (token !== this.loadToken) return;
				this.viewer.model = model;
				this.viewer.totalPages = model.units.length;
				this.viewer.reportWarning(model.warning);
				this.finishLoad();
			}
		}
	};

	private pagesError = () =>
		new Error('Apple Pages documents are not supported. Export this file as PDF or DOCX.');

	private disposeModel = () => {
		if (this.viewer.model?.kind === 'ooxml') destroyOoxml(this.viewer.model);
		this.viewer.model = null;
	};
}
