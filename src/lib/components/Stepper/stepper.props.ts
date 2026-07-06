import { cva } from '$lib/utils/cva/index.js';
import type { Snippet } from 'svelte';
import type { StepperState } from './stepper.state.svelte.js';

export type StepperRenderPayload<Item> = {
	stepper: StepperState<Item>;
	item: Item;
	index: number;
};

export type StepperProps<Item> = {
	/**
	 * Data for each step, passed to the repeated children snippet as `item`.
	 */
	items: Item[];
	/**
	 * Repeated panel renderer. Called once for each item.
	 */
	children?: Snippet<[StepperRenderPayload<Item>]>;
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
};
