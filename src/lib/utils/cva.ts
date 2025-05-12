import { defineConfig, type VariantProps } from 'cva';
import { twMerge } from 'tailwind-merge';
import { getContext, setContext } from 'svelte';

export const { cva, cx, compose } = defineConfig({
	hooks: {
		onComplete: (className) => twMerge(className)
	}
});

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
}>;

export const setComponentTheme =
	<T extends ComponentTheme>(component: string) =>
	(theme: InferComponentTheme<T>) => {
		setContext(`${component}Theme`, theme);
	};

const getKeys = (obj: any) => Object.keys(obj);

const isNotPrototypeKey = (value: string) => {
	return value !== 'constructor' && value !== 'prototype' && value !== '__proto__';
};

const mergeObject = (source: Record<string, any>, target: Record<string, any>) => {
	const result = { ...source };
	const targetKeys = getKeys(target);

	let i, il, key;
	for (i = 0, il = targetKeys.length; i < il; ++i) {
		if (isNotPrototypeKey((key = targetKeys[i]))) {
			const isString = typeof target[key] === 'string';
			if (isString) {
				Object.assign(result, {
					[key]: target[key]
				});
			} else {
				Object.assign(result, {
					[key]: mergeObject(source[key] || {}, target[key] || {})
				});
			}
		}
	}
	return result;
};
export const useComponentTheme =
	<T extends ComponentTheme>(
		component: string,
		defaultTheme: T
	): ((theme?: InferComponentTheme<T>) => T) =>
	(theme?: InferComponentTheme<T>) => {
		const themeContext = getContext(`${component}Theme`);
		const customTheme = mergeObject(themeContext || {}, theme || {});
		if (!Object.keys(customTheme).length) {
			return defaultTheme;
		}
		let composedTheme = { ...defaultTheme };
		for (const key in customTheme) {
			// @ts-ignore
			const { base = '', ...variants } = customTheme[key];
			Object.assign(composedTheme, {
				[key]: compose(defaultTheme[key], cva({ base, variants }))
			});
		}
		return composedTheme;
	};
