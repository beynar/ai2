import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { StepperProps } from './stepper.props.js';

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
	private animations: Animation[] = [];
	private rafId: number | null = null;
	constructor(
		props: Pick<StepperProps<Item>, 'items' | 'onChange' | 'keyFramesOptions' | 'activeStep'>
	) {
		super(props);
	}

	private freezeCurrentTransform() {
		if (!this.stepContainer) return;
		const currentTransform = getComputedStyle(this.stepContainer).transform;
		if (currentTransform && currentTransform !== 'none') {
			this.stepContainer.style.transform = currentTransform;
		}
	}

	private cancelStepAnimation() {
		this.freezeCurrentTransform();
		this.stepAnimation?.cancel();
	}

	private cancelAnimations() {
		this.animations.forEach((animation) => animation.cancel());
		this.animations = [];
		this.cancelStepAnimation();
	}

	translate = () => {
		const offset = this.offsets[this.activeStep];
		if (offset == null || Number.isNaN(offset)) return;
		if (this.destinationOffset === offset) return;
		this.destinationOffset = offset;
		this.cancelStepAnimation();
		this.stepAnimation = this.stepContainer!.animate(
			{
				transform: `translateX(-${offset}px)`
			},

			this.keyFramesOptions
		);
		this.stepAnimation.onfinish = () => {
			if (this.stepContainer) {
				this.stepContainer.style.transform = `translateX(-${offset}px)`;
			}
		};
	};

	setActiveStep = (i: number) => () => {
		if (!this.canGoToStep(i) || this.isAnimating) return;
		this.isAnimating = true;
		this.cancelAnimations();
		const previousStep = this.stepContainer!.children[this.activeStep] as HTMLElement;
		const nextStep = this.stepContainer!.children[i] as HTMLElement;
		this.activeStep = i;
		this.translate();
		void previousStep;
		void nextStep;
		this.animations = [this.stepAnimation].filter((animation): animation is Animation =>
			Boolean(animation)
		);
		Promise.all(this.animations.map((animation) => animation.finished)).finally(() => {
			const offset = this.offsets[this.activeStep];
			if (this.stepContainer && offset != null && !Number.isNaN(offset)) {
				this.destinationOffset = offset;
				this.stepContainer.style.transform = `translateX(-${offset}px)`;
			}
			this.cancelStepAnimation();
			this.isAnimating = false;
		});

		this.onChange?.(this.items[i]);
	};

	scroller = (node: HTMLElement) => {
		node.addEventListener('scroll', (e) => {
			e.preventDefault();
			node.scrollTo(0, 0);
		});
		node.scrollTo(0, 0);

		const steps = node.querySelectorAll('[data-step]');

		const setOffsets = () => {
			if (this.rafId) cancelAnimationFrame(this.rafId);
			this.rafId = requestAnimationFrame(() => {
				steps.forEach((step, i) => {
					this.offsets[i] = (step as HTMLElement).offsetLeft;
				});
				if (!this.isAnimating && this.stepContainer) {
					const offset = this.offsets[this.activeStep];
					if (offset != null && !Number.isNaN(offset)) {
						this.destinationOffset = offset;
						this.cancelStepAnimation();
						this.stepContainer.style.transform = `translateX(-${offset}px)`;
					}
				}
				this.rafId = null;
			});
		};
		const resizeObserver = new ResizeObserver(setOffsets);
		resizeObserver.observe(node);

		return () => resizeObserver.unobserve(node);
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
