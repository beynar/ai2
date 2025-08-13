import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { StepperProps } from './stepper.js';

export class StepperState<Item> extends createBindableStateClass<
	Pick<StepperProps<any>, 'items' | 'onChange' | 'keyFramesOptions' | 'activeStep'>
>() {
	destinationOffset = $state(0);
	stepAnimation = $state<Animation>();
	offsets = $state<number[]>([]);
	stepHeights = $state<number[]>([]);
	stepContainer: HTMLElement | null = null;
	declare activeStep: number;
	isAnimating = $state(false);
	constructor(
		props: Pick<StepperProps<Item>, 'items' | 'onChange' | 'keyFramesOptions' | 'activeStep'>
	) {
		super(props);
	}

	translate = () => {
		if (this.destinationOffset !== this.offsets[this.activeStep]) {
			this.destinationOffset = this.offsets[this.activeStep];
			// this.stepAnimation?.cancel();
			this.stepAnimation = this.stepContainer!.animate(
				{
					transform: `translateX(-${this.offsets[this.activeStep]}px)`
				},

				this.keyFramesOptions
			);
		}
	};

	setActiveStep = (i: number) => () => {
		if (!this.canGoToStep(i)) return;
		const previousStep = this.stepContainer!.children[this.activeStep] as HTMLElement;
		const nextStep = this.stepContainer!.children[i] as HTMLElement;
		this.activeStep = i;
		this.translate();
		previousStep.animate(
			{
				opacity: `0`
			},
			this.keyFramesOptions
		);
		nextStep.animate(
			{
				opacity: `1`
			},
			this.keyFramesOptions
		);

		this.onChange?.(this.items[i]);
	};

	scroller = (node: HTMLElement) => {
		node.addEventListener('scroll', (e) => {
			e.preventDefault();
			node.scrollTo(0, 0);
		});
		node.scrollTo(0, 0);

		const steps = document.querySelectorAll('[data-step]');

		const setOffsets = () => {
			steps.forEach((step, i) => {
				this.offsets[i] = (step as HTMLElement).offsetLeft;
				this.translate();
			});
		};
		const resizeObserver = new ResizeObserver(setOffsets);
		resizeObserver.observe(node);

		return {
			destroy: () => resizeObserver.unobserve(node)
		};
	};

	next = () => {
		if (this.activeStep < this.items.length - 1) {
			this.setActiveStep(this.activeStep + 1)();
		}
	};

	previous = () => {
		if (this.activeStep > 0) {
			this.setActiveStep(this.activeStep - 1)();
		}
	};
	goTo = (i: number) => {
		if (this.canGoToStep(i)) {
			this.setActiveStep(i)();
		}
	};

	canGoToStep = (targetStep: number): boolean => {
		return targetStep >= 0 && targetStep < this.items.length;
	};
}
