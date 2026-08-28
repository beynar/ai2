import { getContext, setContext } from 'svelte';
import { cva, cx } from './engine.js';
import type { ClassValue, VariantProps } from './types.js';

export type ComponentVariant<T extends () => any> = VariantProps<T>;

type StringKey<T> = T extends infer S | undefined ? (S extends string ? S : never) : never;

type CustomTheme<T> = {
	[K in keyof T]: Partial<{
		[KK in StringKey<T[K]>]: string;
	}>;
} & {
	base?: string;
};

type ComponentTheme = {
	[K in string]: ReturnType<typeof cva>;
};

export type InferComponentTheme<T extends ComponentTheme> = Partial<{
	[K in keyof T]: T[K] extends ReturnType<typeof cva>
		? CustomTheme<VariantProps<T[K]>> & { base?: string }
		: never;
}> & {
	override?: boolean;
};

export const setComponentTheme =
	<T extends ComponentTheme>(component: string) =>
	(theme: InferComponentTheme<T>) => {
		setContext(`${component}Theme`, theme);
	};

type SlotOverride = Record<string, string | Record<string, string> | undefined>;

// An override contributes its `base` plus one class per variant value actually
// passed. Resolved lazily inside the final cx call — cnfast caches the merged
// string, so there is nothing to precompute or memoise.
const pick = (o: SlotOverride | undefined, props: Record<string, unknown>) =>
	o && [
		o.base,
		Object.keys(props).map((key) => {
			const value = props[key];
			return value === undefined
				? undefined
				: (o[key] as Record<string, string> | undefined)?.[`${value}`];
		})
	];

export const useComponentTheme = <T extends ComponentTheme>(
	component: string,
	defaultTheme: T
): ((theme?: InferComponentTheme<T>) => T) => {
	return (rawTheme?: InferComponentTheme<T>) => {
		const ctx = getContext<Record<string, SlotOverride> | null | undefined>(`${component}Theme`);
		const { override = false, ...local } = rawTheme ?? {};
		if (!ctx && !Object.keys(local).length) return defaultTheme;

		const theme = { ...defaultTheme } as Record<string, unknown>;
		let changed = false;
		for (const slot in defaultTheme) {
			const ctxSlot = ctx?.[slot];
			const localSlot = (local as Record<string, SlotOverride | undefined>)[slot];
			if (!ctxSlot && !localSlot) continue;
			changed = true;
			const defaultSlot = defaultTheme[slot];
			theme[slot] = (props?: Record<string, unknown>) => {
				// Instance class/className must land after theme overrides.
				const { class: klass, className, ...variants } = props ?? {};
				return cx(
					override ? null : defaultSlot(variants),
					pick(ctxSlot, variants),
					pick(localSlot, variants),
					klass as ClassValue,
					className as ClassValue
				);
			};
		}
		return changed ? (theme as T) : defaultTheme;
	};
};
