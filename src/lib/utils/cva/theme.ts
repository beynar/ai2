import { getContext, setContext } from 'svelte';
import { cva, cx, compose } from './engine.js';
import type { VariantProps } from './types.js';

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

const getKeys = (obj: any) => Object.keys(obj);

const mergeThemeObjects = (
	source: Record<string, any> | null | undefined,
	target: Record<string, any>
) => {
	if (!source) {
		return target;
	}
	const result = { ...source };
	const targetKeys = getKeys(target);

	let i, il, key;
	for (i = 0, il = targetKeys.length; i < il; ++i) {
		key = targetKeys[i];
		if (typeof target[key] === 'string') {
			const sourceValue = source[key];
			if (typeof sourceValue === 'string') {
				Object.assign(result, {
					[key]: cx(sourceValue, target[key])
				});
			} else {
				Object.assign(result, {
					[key]: target[key]
				});
			}
		} else if (typeof target[key] === 'object') {
			Object.assign(result, {
				[key]: mergeThemeObjects(source[key] || {}, target[key] || {})
			});
		}
	}
	return result;
};

const buildTheme = <T extends ComponentTheme>(
	defaultTheme: T,
	merged: Record<string, any>,
	override: boolean
): T => {
	const result = { ...defaultTheme } as Record<string, any>;
	for (const key in merged) {
		const { base = '', ...variants } = merged[key];
		result[key] = override
			? cva({ base, variants })
			: compose(defaultTheme[key], cva({ base, variants }));
	}
	return result as T;
};

const getComponentThemeContext = (component: string): Record<string, any> | null | undefined =>
	getContext<Record<string, any> | null | undefined>(`${component}Theme`);

// Sentinels so a missing context/local theme can still be a WeakMap key.
const NO_CONTEXT = {};
const NO_LOCAL = {};

// defaultTheme -> contextTheme -> rawTheme -> composed theme.
// Lets N consumers that share the same context/local theme build it once
// instead of once per instance. WeakMaps keep it GC-safe: `setContext` hands
// out a fresh object whenever the theme changes, so no manual invalidation.
const composedCache = new WeakMap<object, WeakMap<object, WeakMap<object, unknown>>>();

export const useComponentTheme = <T extends ComponentTheme>(
	component: string,
	defaultTheme: T
): ((theme?: InferComponentTheme<T>) => T) => {
	return (rawTheme?: InferComponentTheme<T>) => {
		const themeContext = getComponentThemeContext(component);
		const hasLocal = rawTheme ? Object.keys(rawTheme).some((key) => key !== 'override') : false;

		// Fast path: nothing to merge, everyone shares the default instance.
		if (!hasLocal && !themeContext) {
			return defaultTheme;
		}

		const { override = false, ...rawLocalTheme } = rawTheme ?? {};
		const theme = rawLocalTheme ?? {};

		if (override) {
			const merged = mergeThemeObjects(themeContext, theme);
			if (!Object.keys(merged).length) return defaultTheme;
			return buildTheme(defaultTheme, merged, true);
		}

		// Memoise by identity: original `rawTheme` (stable prop) + shared context.
		const ctxKey = themeContext ?? NO_CONTEXT;
		const localKey = rawTheme ?? NO_LOCAL;

		let byContext = composedCache.get(defaultTheme);
		if (!byContext) composedCache.set(defaultTheme, (byContext = new WeakMap()));
		let byLocal = byContext.get(ctxKey);
		if (!byLocal) byContext.set(ctxKey, (byLocal = new WeakMap()));

		const hit = byLocal.get(localKey) as T | undefined;
		if (hit) return hit;

		const merged = mergeThemeObjects(themeContext, theme);
		if (!Object.keys(merged).length) return defaultTheme;

		const built = buildTheme(defaultTheme, merged, false);
		byLocal.set(localKey, built);
		return built;
	};
};
