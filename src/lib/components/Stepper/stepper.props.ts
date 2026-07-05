import { cva } from '$lib/utils/cva/index.js';
import type { Snippet } from 'svelte';
import type { StepperState } from './stepperState.svelte.js';

export type StepperProps<Item> = {
	/**
	 * Data for each step, passed to step snippets as `item`.
	 */
	items: Item[];
	/**
	 * Default snippet rendered for every step when no `step{N}` snippet is provided.
	 */
	step?: Snippet<
		[
			{
				stepper: StepperState<Item>;
				item: Item;
				index: number;
			}
		]
	>;
	/**
	 * Called when the active step changes, with the newly active item.
	 */
	onChange?: (item: Item) => void;
	/**
	 * Additional CSS classes for the root stepper container.
	 */
	class?: string;
	/**
	 * Zero-based index of the currently visible step. Bindable.
	 */
	activeStep?: number;
	/**
	 * Bindable stepper state for programmatic navigation (`next`, `previous`, `goTo`).
	 */
	stepper?: StepperState<Item>;
	/**
	 * Web Animations API options for step translation and transition timing.
	 */
	keyFramesOptions?: {
		/**
		 * Animation duration in milliseconds.
		 */
		duration: number;
		/**
		 * CSS timing function used for step opacity and height transitions.
		 */
		easing: string;
		/**
		 * Web Animations API fill mode applied to the step translation animation.
		 */
		fill: 'auto' | 'backwards' | 'both' | 'forwards' | 'none';
	};
	/**
	 * Layout variant applied to the stepper, container, and step panels.
	 */
	mode?: 'classic' | 'vertical';
	/**
	 * Optional snippet receiving the bindable stepper state.
	 */
	children?: Snippet<[StepperState<Item>]>;
} & {
	[k in `step${number}`]: Snippet<
		[
			{
				stepper: StepperState<Item>;
				item: Item;
				index: number;
			}
		]
	>;
};
