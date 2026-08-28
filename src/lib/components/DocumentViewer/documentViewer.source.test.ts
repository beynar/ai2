import { describe, expect, test } from 'vitest';
import {
	detectDocumentFormat,
	resolveDocumentSource,
	sniffDocumentFormat
} from './documentViewer.source.js';

const encoded = (value: string) => new TextEncoder().encode(value);
const withPrefix = (prefix: number[], value: string) =>
	new Uint8Array([...prefix, ...encoded(value)]);
const compound = (streamName: string) =>
	new Uint8Array([
		0xd0,
		0xcf,
		0x11,
		0xe0,
		0xa1,
		0xb1,
		0x1a,
		0xe1,
		...Array.from(streamName).flatMap((character) => [character.charCodeAt(0), 0])
	]);

describe('document format detection', () => {
	test('uses explicit format before file metadata', () => {
		expect(detectDocumentFormat({ format: 'pdf', fileName: 'report.xlsx' })).toBe('pdf');
	});

	test('detects extensions and MIME types', () => {
		expect(detectDocumentFormat({ fileName: 'report.DOCX?download=1' })).toBe('docx');
		expect(
			detectDocumentFormat({
				mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			})
		).toBe('pptx');
	});

	test('sniffs PDF and OOXML container signatures', () => {
		expect(sniffDocumentFormat(encoded('%PDF-1.7'))).toBe('pdf');
		expect(sniffDocumentFormat(withPrefix([0x50, 0x4b, 0x03, 0x04], 'word/document.xml'))).toBe(
			'docx'
		);
		expect(sniffDocumentFormat(withPrefix([0x50, 0x4b, 0x03, 0x04], 'ppt/slides/slide1.xml'))).toBe(
			'pptx'
		);
	});

	test('distinguishes legacy compound document streams', () => {
		expect(sniffDocumentFormat(compound('WordDocument'))).toBe('doc');
		expect(sniffDocumentFormat(compound('PowerPoint Document'))).toBe('ppt');
		expect(sniffDocumentFormat(compound('Workbook'))).toBe('xls');
	});

	test('detects CSV text and Apple Pages packages', () => {
		expect(sniffDocumentFormat(encoded('name,amount\nAda,10\nGrace,20'))).toBe('csv');
		expect(sniffDocumentFormat(withPrefix([0x50, 0x4b, 0x03, 0x04], 'Index/Document.iwa'))).toBe(
			'pages'
		);
	});

	test('copies binary sources so workers cannot detach caller data', async () => {
		const source = new Uint8Array([1, 2, 3]);
		const resolved = await resolveDocumentSource(source, 'file.pdf', new AbortController().signal);
		expect(resolved.bytes).toEqual(source);
		expect(resolved.bytes).not.toBe(source);
	});
});
