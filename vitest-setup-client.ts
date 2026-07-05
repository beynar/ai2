import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onChange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// jsdom lacks these observers; components (ScrollArea, PDFViewer) construct them on mount.
class MockObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
}
for (const name of ['IntersectionObserver', 'ResizeObserver'] as const) {
	if (!(name in window)) {
		Object.defineProperty(window, name, { writable: true, value: MockObserver });
	}
}

// jsdom lacks the Web Animations API; Svelte 5 drives CSS transitions (e.g. the
// Popover open/close) via element.animate(), so stub it or those transitions
// throw an unhandled "element.animate is not a function" that fails `vitest run`.
if (!('animate' in Element.prototype)) {
	Object.defineProperty(Element.prototype, 'animate', {
		writable: true,
		value: () => ({
			cancel() {},
			finish() {},
			play() {},
			pause() {},
			finished: Promise.resolve(),
			onfinish: null,
			oncancel: null
		})
	});
}

// add more mocks here if you need them
