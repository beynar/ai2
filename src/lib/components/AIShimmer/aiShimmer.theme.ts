import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';

const defaultRoot = cva({ base: 'shimmer inline-block' });

export const aiShimmerTheme = { root: defaultRoot };
export type AIShimmerTheme = typeof aiShimmerTheme;
export type AIShimmerThemeProps = InferComponentTheme<AIShimmerTheme>;
export const setAIShimmerTheme = setComponentTheme<AIShimmerTheme>('aiShimmer');
export const useAIShimmerTheme = useComponentTheme<AIShimmerTheme>('aiShimmer', aiShimmerTheme);
