import type { ChartMark as TanStackMark, ChartValue as TanStackValue } from '@tanstack/charts';

export function withoutTooltipPoints<
	TDatum,
	TXPointValue extends TanStackValue,
	TYPointValue extends TanStackValue,
	TXScaleValue extends TanStackValue,
	TYScaleValue extends TanStackValue
>(
	mark: TanStackMark<TDatum, TXPointValue, TYPointValue, TXScaleValue, TYScaleValue>
): TanStackMark<TDatum, TXPointValue, TYPointValue, TXScaleValue, TYScaleValue> {
	return {
		...mark,
		initialize(context) {
			const initialized = mark.initialize(context);
			return {
				...initialized,
				render(renderContext) {
					const rendered = initialized.render(renderContext);
					return { ...rendered, points: [] };
				}
			};
		}
	};
}
