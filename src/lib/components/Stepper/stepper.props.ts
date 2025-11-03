import { cva } from '$lib/utils/cva.js';
import type { Snippet } from 'svelte';
import type { StepperState } from './stepperState.svelte.js';

export type StepperProps<Item> = {
	items: Item[];
	onChange?: (item: Item) => void;
	class?: string;
	activeStep?: number;
	stepper?: StepperState<Item>;
	keyFramesOptions?: {
		duration: number;
		easing: string;
		fill: 'auto' | 'backwards' | 'both' | 'forwards' | 'none';
	};
	mode?: 'classic' | 'vertical';
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

