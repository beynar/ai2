import { getContext, setContext } from 'svelte';
import type { Sizes } from '$lib/types/theme.js';
import type { StatThemeProps } from './stat.theme.js';

const STAT_CONTEXT = Symbol('stat');

export type StatContext = {
	readonly size: Sizes;
	readonly theme: StatThemeProps | undefined;
};

export function setStatContext(context: StatContext) {
	setContext(STAT_CONTEXT, context);
}

export function getStatContext() {
	return getContext<StatContext | undefined>(STAT_CONTEXT);
}

export function resolveStatSize(size: Sizes | undefined, context: StatContext | undefined) {
	return size ?? context?.size ?? 'normal';
}

export function resolveStatTheme(
	theme: StatThemeProps | undefined,
	context: StatContext | undefined
) {
	return theme ?? context?.theme;
}
