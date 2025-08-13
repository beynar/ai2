import { cva } from '$lib/utils/cva.js';
import { createBindableStateClass } from '$lib/utils/state.svelte.js';
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

export const defaultStepper = cva({
	base: 'relative overflow-hidden transition-all',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperContainer = cva({
	base: 'grid transition-all w-full',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperStep = cva({
	base: 'h-fit w-full flex-1 focus:outline-none',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const stepperTheme = {
	stepper: defaultStepper,
	container: defaultStepperContainer,
	step: defaultStepperStep
};
