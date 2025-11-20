import type { TabbarProps, TabItem, TabAlignment, TabOrientation } from '../Tabbar/tabbar.props.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { TabsThemeProps } from './tabs.theme.js';
import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { StepperState } from '../Stepper/stepperState.svelte.js';
import type { TabbarThemeProps } from '../Tabbar/tabbar.theme.js';

export type TabsPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TabsProps<Item = any> = WithAttachments<
	{
		/**
		 * Array of tab items. Each item can be a simple string or an object with label, prefix, suffix, href, and disabled properties.
		 * Inherited from Tabbar component.
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
		 * The placement of the tabbar relative to the content.
		 * @default 'top'
		 */
		placement?: TabsPlacement;
		/**
		 * Additional CSS classes for the tabs container.
		 */
		class?: string;
		/**
		 * Custom theme overrides for the tabs container.
		 */
		theme?: TabsThemeProps;
		/**
		 * Bindable reference to the stepper state for programmatic control.
		 * Provides methods like next(), previous(), goTo(index).
		 */
		stepper?: StepperState<Item>;
		/**
		 * Animation configuration for tab panel transitions.
		 * @default { duration: 300, easing: 'ease-in-out', fill: 'both' }
		 */
		keyFramesOptions?: {
			duration: number;
			easing: string;
			fill: 'auto' | 'backwards' | 'both' | 'forwards' | 'none';
		};
		/**
		 * The size of the tabs.
		 * @default 'normal'
		 */
		tabbarSize?: Sizes;
		/**
		 * The orientation of the tabbar.
		 * @default 'horizontal'
		 */
		tabbarOrientation?: TabOrientation;
		/**
		 * The color scheme of the tabs.
		 * @default 'primary'
		 */
		tabbarColor?: Colors;
		/**
		 * The alignment of the tabs within the container.
		 * @default 'start'
		 */
		tabbarAlignment?: TabAlignment;
		/**
		 * Additional CSS classes for the tabbar container.
		 */
		tabbarClass?: string;
		/**
		 * Custom theme overrides for the tabbar.
		 */
		tabbarTheme?: TabbarThemeProps;
		/**
		 * The default snippet to render for each tab. Use if you do not want to render a snippet for each tab and based your rendering on the tabs array
		 */

		tab?: Snippet<
			[
				{
					stepper: StepperState<Item>;
					item: TabItem;
					index: number;
				}
			]
		>;
		/**
		 * Whether the tabbar should be full width.
		 * @default false
		 */
		tabbarFullWidth?: boolean;
	} & {
		[k in `tab${number}`]: Snippet<
			[
				{
					stepper: StepperState<Item>;
					item: TabItem;
					index: number;
				}
			]
		>;
	}
>;
