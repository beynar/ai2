import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultGridSpan = cva({
	base: 'grid h-full min-w-0'
});

export const gridSpanTheme = {
	root: defaultGridSpan
};

export type GridSpanTheme = typeof gridSpanTheme;
export type GridSpanThemeProps = InferComponentTheme<GridSpanTheme>;
export const setGridSpanTheme = setComponentTheme<GridSpanTheme>('gridSpan');
export const useGridSpanTheme = useComponentTheme<GridSpanTheme>('gridSpan', gridSpanTheme);
