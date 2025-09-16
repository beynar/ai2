// import type { ComponentsSystem } from '../plugin/components.js';

import type { Breakpoint } from '$lib/components/Theme/theme.js';

// import type { Spinner } from '$lib/plugin/spinnner.js';
export type Colors =
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'warning'
	| 'info'
	| 'contrast'
	| 'surface';
export type FontSize = `fontSize.${
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| 'DEFAULT'}`;
export type ColorKeys = `${
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'warning'
	| 'info'
	| 'contrast'
	| 'surface'}.${'light' | 'lighter' | 'DEFAULT' | 'fg' | 'dark'}`;

export type ColorPath = `colors.${ColorKeys}`;

export type ThemePaths = ColorPath | FontSize | (string & {});
export type ThemeFunction = (paths: ThemePaths) => string;

export type Styles = Partial<CSSStyleDeclaration & { textWrap: string }>;

export const deepMerge = <T>(a?: Partial<T>, b?: Partial<T>): T => {
	a = a || {};
	b = b || {};
	for (const key in b) {
		if (b[key] !== undefined && typeof b[key] === 'object') {
			Object.assign(a, {
				[key]: deepMerge(a[key] || {}, b[key] || {})
			});
		} else {
			Object.assign(a, { [key]: b[key] });
		}
	}
	return a as T;
};

export type Theme = {
	radius: number;
	shadows?: any;
};
export type Themes = Record<string, Theme>;

export type DesignSystem = {
	themes: Themes;
	// components: ComponentsSystem;
	// spinner?: Spinner;
};

export type Sizes = 'small' | 'normal' | 'large';

export type Easing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
