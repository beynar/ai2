import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';
import DocumentViewer from './documentViewerHarness.test.svelte';

class SpreadsheetWorker {
	onmessage: ((event: MessageEvent) => void) | null = null;
	onerror: ((event: ErrorEvent) => void) | null = null;

	postMessage() {
		queueMicrotask(() => {
			this.onmessage?.(
				new MessageEvent('message', {
					data: {
						ok: true,
						value: {
							warnings: ['The workbook contains one malformed record.'],
							sheets: ['January', 'February', 'March'].map((name) => ({
								name,
								rowCount: 1,
								columnCount: 1,
								cells: [],
								merges: [],
								columns: [],
								rows: []
							}))
						}
					}
				})
			);
		});
	}

	terminate() {}
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('DocumentViewer', () => {
	test('shows the PDF toolbar and loading state without bundling pdf.js', () => {
		const { container } = render(DocumentViewer, {
			props: { src: new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]), format: 'pdf' }
		});
		expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
		expect(screen.getByLabelText('Rotate clockwise')).toBeInTheDocument();
		expect(screen.getByLabelText('Print')).toBeInTheDocument();
		expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
	});

	test('filters controls for spreadsheets', () => {
		render(DocumentViewer, {
			props: { src: new Uint8Array([1]), format: 'xlsx' }
		});
		expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
		expect(screen.getByLabelText('Search')).toBeInTheDocument();
		expect(screen.getByLabelText('Download')).toBeInTheDocument();
		expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Rotate clockwise')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Print')).not.toBeInTheDocument();
	});

	test('supports a fully hidden toolbar', () => {
		render(DocumentViewer, {
			props: { src: new Uint8Array([1]), format: 'csv', controls: false }
		});
		expect(screen.queryByLabelText('Zoom in')).not.toBeInTheDocument();
	});

	test('reports Pages as explicitly unsupported', async () => {
		render(DocumentViewer, {
			props: { src: new Uint8Array([1]), format: 'pages' }
		});
		await waitFor(() =>
			expect(screen.getByRole('alert')).toHaveTextContent('Export this file as PDF or DOCX')
		);
	});

	test('rejects ambiguous anonymous bytes with an actionable error', async () => {
		render(DocumentViewer, { props: { src: new Uint8Array([1, 2, 3]) } });
		await waitFor(() =>
			expect(screen.getByRole('alert')).toHaveTextContent('Pass the format prop or fileName')
		);
	});

	test('rejects file metadata that contradicts the binary signature', async () => {
		render(DocumentViewer, {
			props: {
				src: new TextEncoder().encode('%PDF-1.7'),
				fileName: 'report.xlsx'
			}
		});
		await waitFor(() =>
			expect(screen.getByRole('alert')).toHaveTextContent(
				'metadata identifies XLSX, but its contents are PDF'
			)
		);
	});

	test('navigates workbook tabs with the keyboard and reports warnings', async () => {
		vi.stubGlobal('Worker', SpreadsheetWorker);
		vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:spreadsheet-worker');
		vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
		const onWarning = vi.fn();
		const onSheetChange = vi.fn();
		render(DocumentViewer, {
			props: {
				src: new Uint8Array([1]),
				format: 'xlsx',
				onWarning,
				onSheetChange
			}
		});

		const january = await screen.findByRole('tab', { name: 'January' });
		expect(january).toHaveAttribute('aria-selected', 'true');
		expect(onWarning).toHaveBeenCalledWith('The workbook contains one malformed record.');

		await fireEvent.keyDown(january, { key: 'ArrowRight' });
		await waitFor(() =>
			expect(screen.getByRole('tab', { name: 'February' })).toHaveAttribute('aria-selected', 'true')
		);
		expect(onSheetChange).toHaveBeenCalledWith(2);

		await fireEvent.keyDown(screen.getByRole('tab', { name: 'February' }), { key: 'End' });
		await waitFor(() =>
			expect(screen.getByRole('tab', { name: 'March' })).toHaveAttribute('aria-selected', 'true')
		);
	});

	test('downloads the untouched original workbook', async () => {
		vi.stubGlobal('Worker', SpreadsheetWorker);
		vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:document-viewer');
		vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
		const downloadedNames: string[] = [];
		vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
			this: HTMLAnchorElement
		) {
			downloadedNames.push(this.download);
		});
		render(DocumentViewer, {
			props: { src: new Uint8Array([1]), format: 'xlsx', fileName: 'book.xlsx' }
		});

		const download = await screen.findByLabelText('Download');
		await waitFor(() => expect(download).not.toBeDisabled());
		await fireEvent.click(download);

		expect(downloadedNames).toEqual(['book.xlsx']);
	});
});
