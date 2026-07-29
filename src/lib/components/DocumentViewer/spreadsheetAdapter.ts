import type { DocumentViewerAssets } from './documentViewer.assets.js';
import type { DocumentFormat } from './documentViewer.props.js';
import { toArrayBuffer } from './documentViewer.source.js';
import { runDocumentWorker } from './documentWorkerTask.js';

export interface SpreadsheetCell {
	row: number;
	column: number;
	text: string;
	raw: string | number | boolean | null;
	formula?: string;
	numberFormat?: string;
}

export interface SpreadsheetMerge {
	startRow: number;
	startColumn: number;
	endRow: number;
	endColumn: number;
}

export interface SpreadsheetDimension {
	index: number;
	size?: number;
	hidden?: boolean;
}

interface SpreadsheetWireSheet {
	name: string;
	rowCount: number;
	columnCount: number;
	cells: SpreadsheetCell[];
	merges: SpreadsheetMerge[];
	columns: SpreadsheetDimension[];
	rows: SpreadsheetDimension[];
}

interface SpreadsheetWireWorkbook {
	sheets: SpreadsheetWireSheet[];
	warnings: string[];
}

export interface SpreadsheetSheet extends Omit<SpreadsheetWireSheet, 'cells'> {
	cells: Map<string, SpreadsheetCell>;
}

export interface SpreadsheetModel {
	kind: 'spreadsheet';
	format: Extract<DocumentFormat, 'xls' | 'xlsx' | 'csv'>;
	sheets: SpreadsheetSheet[];
	warnings: string[];
}

const spreadsheetWorkerSource = (moduleUrl: string, codepageUrl: string) => `
self.onmessage = async (event) => {
	try {
		const [XLSX, codepage] = await Promise.all([
			import(${JSON.stringify(moduleUrl)}),
			import(${JSON.stringify(codepageUrl)})
		]);
		if (typeof XLSX.set_cptable === 'function') {
			const cptable = codepage.default?.utils ? codepage.default : codepage;
			if (typeof cptable?.utils?.decode !== 'function') {
				throw new Error('The configured SheetJS codepage runtime has no compatible export.');
			}

			XLSX.set_cptable(cptable);
		}
		const workbook = XLSX.read(event.data.bytes, {
			type: 'array',
			cellDates: false,
			cellFormula: true,
			cellNF: true,
			cellStyles: true,
			cellText: true,
			dense: false
		});
		const sheets = workbook.SheetNames.map((name) => {
			const worksheet = workbook.Sheets[name];
			const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
			const cells = Object.keys(worksheet)
				.filter((address) => !address.startsWith('!'))
				.map((address) => {
					const cell = worksheet[address];
					const position = XLSX.utils.decode_cell(address);
					let raw = null;
					if (['string', 'number', 'boolean'].includes(typeof cell.v)) raw = cell.v;
					else if (cell.v != null) raw = String(cell.v);
					return {
						row: position.r,
						column: position.c,
						text: cell.w ?? (raw == null ? '' : String(raw)),
						raw,
						...(cell.f ? { formula: cell.f } : {}),
						...(cell.z ? { numberFormat: cell.z } : {})
					};
				});
			const merges = (worksheet['!merges'] || []).map((merge) => ({
				startRow: merge.s.r,
				startColumn: merge.s.c,
				endRow: merge.e.r,
				endColumn: merge.e.c
			}));
			const columns = (worksheet['!cols'] || []).flatMap((column, index) => {
				if (!column) return [];
				let size = column.wpx;
				if (size == null && column.wch) size = column.wch * 7 + 12;
				return [{ index, size, hidden: !!column.hidden }];
			});
			const rows = (worksheet['!rows'] || []).flatMap((row, index) => {
				if (!row) return [];
				let size = row.hpx;
				if (size == null && row.hpt) size = row.hpt * 96 / 72;
				return [{ index, size, hidden: !!row.hidden }];
			});
			return {
				name,
				rowCount: Math.max(1, range.e.r + 1),
				columnCount: Math.max(1, range.e.c + 1),
				cells,
				merges,
				columns,
				rows
			};
		});
		if (!sheets.length) throw new Error('The workbook contains no worksheets.');
		self.postMessage({ ok: true, value: { sheets, warnings: [] } });
	} catch (error) {
		self.postMessage({ ok: false, error: error instanceof Error ? error.message : String(error) });
	}
};`;

const csvWorkerSource = (moduleUrl: string) => `
self.onmessage = async (event) => {
	try {
		const runtime = await import(${JSON.stringify(moduleUrl)});
		const parser = runtime.parse ? runtime : runtime.default;
		if (!parser || typeof parser.parse !== 'function') throw new Error('PapaParse did not expose parse().');
		const text = new TextDecoder('utf-8').decode(event.data.bytes);
		const parsed = parser.parse(text, { skipEmptyLines: false, dynamicTyping: false });
		const rows = parsed.data;
		if (!Array.isArray(rows)) throw new Error('CSV parser returned an invalid row set.');
		const columnCount = rows.reduce((maximum, row) => Math.max(maximum, Array.isArray(row) ? row.length : 0), 0);
		const cells = [];
		for (let row = 0; row < rows.length; row++) {
			const values = Array.isArray(rows[row]) ? rows[row] : [rows[row]];
			for (let column = 0; column < values.length; column++) {
				const value = values[column] == null ? '' : String(values[column]);
				if (value) cells.push({ row, column, text: value, raw: value });
			}
		}
		const warnings = (parsed.errors || []).map((error) => error.message).filter(Boolean);
		self.postMessage({
			ok: true,
			value: {
				sheets: [{
					name: 'CSV',
					rowCount: Math.max(1, rows.length),
					columnCount: Math.max(1, columnCount),
					cells,
					merges: [],
					columns: [],
					rows: []
				}],
				warnings
			}
		});
	} catch (error) {
		self.postMessage({ ok: false, error: error instanceof Error ? error.message : String(error) });
	}
};`;

const hydrateWorkbook = (
	workbook: SpreadsheetWireWorkbook,
	format: SpreadsheetModel['format']
): SpreadsheetModel => ({
	kind: 'spreadsheet',
	format,
	warnings: workbook.warnings,
	sheets: workbook.sheets.map((sheet) => ({
		...sheet,
		cells: new Map(sheet.cells.map((cell) => [`${cell.row}:${cell.column}`, cell]))
	}))
});

export const loadSpreadsheet = async (
	bytes: Uint8Array,
	format: SpreadsheetModel['format'],
	assets: DocumentViewerAssets,
	signal: AbortSignal
): Promise<SpreadsheetModel> => {
	const buffer = toArrayBuffer(bytes);
	const source =
		format === 'csv'
			? csvWorkerSource(assets.csv.moduleUrl)
			: spreadsheetWorkerSource(assets.spreadsheet.moduleUrl, assets.spreadsheet.codepageUrl);
	const task = runDocumentWorker<{ bytes: ArrayBuffer }, SpreadsheetWireWorkbook>(
		source,
		{ bytes: buffer },
		[buffer],
		signal
	);
	return hydrateWorkbook(await task.promise, format);
};
