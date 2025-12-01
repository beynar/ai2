import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultScrollArea = cva({
	base: 'relative'
});

const defaultScrollAreaViewport = cva({
	base: 'relative overflow-hidden'
});

const defaultScrollAreaContent = cva({
	base: 'min-w-full display-table position-relative'
});

const defaultScrollAreaScrollbar = cva({
	base: 'absolute top-0 right-0 w-1.5 cursor-pointer'
});

const defaultScrollAreaScrollbarThumb = cva({
	base: 'bg-contrast-muted'
});

export const scrollAreaTheme = {
	base: defaultScrollArea,
	viewport: defaultScrollAreaViewport,
	content: defaultScrollAreaContent,
	scrollbar: defaultScrollAreaScrollbar,
	scrollbarThumb: defaultScrollAreaScrollbarThumb
};

export type ScrollAreaTheme = typeof scrollAreaTheme;
export type ScrollAreaThemeProps = InferComponentTheme<ScrollAreaTheme>;
export const setScrollAreaTheme = setComponentTheme<ScrollAreaTheme>('scrollArea');
export const useScrollAreaTheme = useComponentTheme('scrollArea', scrollAreaTheme);

