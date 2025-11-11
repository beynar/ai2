import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { WithAttachments } from '$lib/types/props.js';
import type { TabbarThemeProps } from './tabbar.theme.js';

export type TabAlignment = 'start' | 'center' | 'end';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabbarPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * A tab item can be either:
 * - A simple string (label only)
 * - An object with label, optional prefix/suffix snippets, optional href, and optional disabled state
 */
export type TabItem = string | {
	/**
	 * The label of the tab. Can be a string or a Snippet for custom rendering.
	 */
	label: string | Snippet;
	/**
	 * Optional prefix content (typically an icon).
	 */
	prefix?: Snippet;
	/**
	 * Optional suffix content (typically an icon or badge).
	 */
	suffix?: Snippet;
	/**
	 * Optional URL to navigate to. If provided, the tab renders as a link.
	 */
	href?: string;
	/**
	 * Whether this tab is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Link target attribute (only used when href is provided).
	 */
	target?: string;
	/**
	 * Link rel attribute (only used when href is provided).
	 */
	rel?: string;
};

export type TabbarProps = WithAttachments<{
	/**
	 * Array of tab items. Each item can be a simple string or an object with label, prefix, suffix, href, and disabled properties.
	 */
	tabs: TabItem[];
	/**
	 * The index of the currently active tab. This is bindable.
	 * @default 0
	 */
	activeTab?: number;
	/**
	 * Callback function called when the active tab changes.
	 * Receives the new tab index as an argument.
	 */
	onChange?: (index: number) => void;
	/**
	 * The size of the tabs.
	 * @default 'normal'
	 */
	size?: Sizes;
	/**
	 * The orientation of the tabbar.
	 * @default 'horizontal'
	 */
	orientation?: TabOrientation;
	/**
	 * The color scheme of the tabs.
	 * @default 'primary'
	 */
	color?: Colors;
	/**
	 * The alignment of the tabs within the container.
	 * @default 'start'
	 */
	alignment?: TabAlignment;
	/**
	 * The position of the tabbar (affects indicator placement).
	 * @default 'top'
	 */
	position?: TabbarPosition;
	/**
	 * Additional CSS classes for the tabbar container.
	 */
	class?: string;
	/**
	 * Custom theme overrides.
	 */
	theme?: TabbarThemeProps;
}>;

