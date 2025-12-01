import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultAspectRatio = cva({
	base: 'relative w-full overflow-hidden'
});

const defaultAspectRatioContent = cva({
	base: 'absolute inset-0 h-full w-full'
});

export const aspectRatioTheme = {
	container: defaultAspectRatio,
	content: defaultAspectRatioContent
};

export type AspectRatioTheme = typeof aspectRatioTheme;
export type AspectRatioThemeProps = InferComponentTheme<AspectRatioTheme>;
export const setAspectRatioTheme = setComponentTheme<AspectRatioTheme>('aspect-ratio');
export const useAspectRatioTheme = useComponentTheme('aspect-ratio', aspectRatioTheme);
