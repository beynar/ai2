import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultAspectRatio = cva({
	base: 'relative w-full overflow-hidden'
});

const defaultAspectRatioContent = cva({
	base: 'absolute inset-0 h-full w-full'
});

export const aspectRatioTheme = {
	root: defaultAspectRatio,
	content: defaultAspectRatioContent
};

export type AspectRatioTheme = typeof aspectRatioTheme;
export type AspectRatioThemeProps = InferComponentTheme<AspectRatioTheme>;
export const setAspectRatioTheme = setComponentTheme<AspectRatioTheme>('aspect-ratio');
export const useAspectRatioTheme = useComponentTheme<AspectRatioTheme>(
	'aspect-ratio',
	aspectRatioTheme
);
