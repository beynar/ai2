import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
// Rendered inside the Theme provider (via the harness) so the search Popover's
// theme context is present, as it always is in the real app.
import PDFViewer from './pdfViewerHarness.test.svelte';

// In jsdom the pdf.js worker can't run, so the viewer stays in its loading
// state — which is what these synchronous assertions target.
describe('PDFViewer', () => {
	test('shows a loading skeleton while the document loads', () => {
		const { container } = render(PDFViewer, { props: { src: '/x.pdf' } });
		expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
		const viewer = container.querySelector('.min-h-48') as HTMLElement;
		expect(viewer).toBeTruthy();
		expect(viewer).toHaveAttribute('aria-busy', 'true');
	});

	test('renders accessible toolbar controls including fit and search', () => {
		render(PDFViewer, { props: { src: '/x.pdf' } });
		expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
		expect(screen.getByLabelText('Next page')).toBeInTheDocument();
		expect(screen.getByLabelText('Zoom in')).toBeInTheDocument();
		expect(screen.getByLabelText('Fit to width')).toBeInTheDocument();
		expect(screen.getByLabelText('Search')).toBeInTheDocument();
		expect(screen.getByLabelText('Download')).toBeInTheDocument();
	});

	test('opens a search input when the search control is clicked', async () => {
		const { getByLabelText } = render(PDFViewer, { props: { src: '/x.pdf' } });
		await getByLabelText('Search').click();
		expect(getByLabelText('Search document')).toBeInTheDocument();
	});

	test('hides the toolbar when controls is false', () => {
		render(PDFViewer, { props: { src: '/x.pdf', controls: false } });
		expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
	});

	test('renders only the requested controls', () => {
		render(PDFViewer, { props: { src: '/x.pdf', controls: ['pageInfo', 'download'] } });
		expect(screen.queryByLabelText('Zoom in')).not.toBeInTheDocument();
		expect(screen.getByLabelText('Download')).toBeInTheDocument();
	});
});
