import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultChartRoot = cva({
	base: 'relative w-full min-w-0 text-neutral'
});

const defaultChartPlot = cva({
	base: 'relative size-full min-w-0 [&_.ts-chart]:overflow-visible'
});

const defaultChartTooltip = cva({
	base: 'z-50 !max-w-80 !rounded-lg !border-neutral-muted !bg-surface-floating !px-3 !py-2 !font-sans !text-xs !leading-tight !font-medium !text-neutral !shadow-xl'
});

export const chartTheme = {
	root: defaultChartRoot,
	plot: defaultChartPlot,
	tooltip: defaultChartTooltip
};

export type ChartTheme = typeof chartTheme;
export type ChartThemeProps = InferComponentTheme<ChartTheme>;
export const setChartTheme = setComponentTheme<ChartTheme>('chart');
export const useChartTheme = useComponentTheme<ChartTheme>('chart', chartTheme);
