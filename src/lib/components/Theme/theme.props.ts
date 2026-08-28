import type { Snippet } from 'svelte';
import type { SvelteThemeProps } from 'svelte-themes';
import type { SpinnerVariant } from '../Spinner/spinner.props.js';
import type { ThemeState } from './theme.state.svelte.js';
import type { ThemeTransition } from './themeTransition.js';
import type { ThemeDesignTokenMap } from './theme.designTokens.js';

export type ThemeProps<T extends readonly string[] = readonly string[]> = Omit<
	SvelteThemeProps<T>,
	'children'
> & {
	/** App content. The snippet receives the shared ThemeState instance. */
	children: Snippet<[ThemeState]>;
	/** Global default animation for loading indicators. */
	spinnerVariant?: SpinnerVariant;
	/** Runtime design tokens keyed by logical theme name. */
	designTokens?: ThemeDesignTokenMap<T>;
	/** View transition used when ThemeState.theme changes. Omit for an instant change. */
	transition?: ThemeTransition;
};
