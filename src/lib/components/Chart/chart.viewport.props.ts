export type ChartViewportAxis = 'x' | 'y' | 'both';

export type ChartViewportTransition = {
	duration?: number;
	easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
};

export type ChartViewportDefinition = {
	axis?: ChartViewportAxis;
	drag?: 'brush-zoom';
	reset?: boolean;
	transition?: boolean | ChartViewportTransition;
};

export type ChartViewport = boolean | ChartViewportDefinition;
