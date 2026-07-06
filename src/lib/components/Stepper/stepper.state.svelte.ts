import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { StepperProps } from './stepper.props.js';

type StepperKeyFramesOptions = NonNullable<StepperProps<unknown>['keyFramesOptions']>;

type StepperStateBindableProps = {
	activeStep: number;
	items: unknown[];
	onChange?: (item: unknown) => void;
	keyFramesOptions: StepperKeyFramesOptions;
};

type StepperStateProps<Item> = {
	activeStep: number;
	items: Item[];
	onChange?: (item: Item) => void;
	keyFramesOptions: StepperKeyFramesOptions;
};

export class StepperState<Item> extends createBindableStateClass<StepperStateBindableProps>() {
	destinationOffset = $state(0);
	stepAnimation = $state<Animation>();
	offsets = $state<number[]>([]);
	stepHeights = $state<number[]>([]);
	stepContainer: HTMLElement | null = null;
	declare activeStep: number;
	declare keyFramesOptions: StepperKeyFramesOptions;
	visualStep = $state(0);
	isAnimating = $state(false);
	private animations: Animation[] = [];
	private rafId: number | null = null;
	private navigationId = 0;

	constructor(props: StepperStateProps<Item>) {
		super(props as unknown as StepperStateBindableProps);
		this.visualStep = props.activeStep;
	}

	private updateOffsets() {
		if (!this.stepContainer) return;
		const offsets = Array.from(this.stepContainer.children).map(
			(step) => (step as HTMLElement).offsetLeft
		);
		if (
			offsets.length === this.offsets.length &&
			offsets.every((offset, index) => offset === this.offsets[index])
		) {
			return;
		}
		this.offsets = offsets;
	}

	private getStepOffset(step: number) {
		this.updateOffsets();
		const offset = this.offsets[step];
		if (offset == null || Number.isNaN(offset)) return null;
		return offset;
	}

	private setContainerTransform(offset: number) {
		if (!this.stepContainer) return;
		this.destinationOffset = offset;
		this.stepContainer.style.transform = `translateX(-${offset}px)`;
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
		this.stepAnimation = undefined;
	}

	private cancelAnimations() {
		this.animations.forEach((animation) => animation.cancel());
		this.animations = [];
		this.cancelStepAnimation();
	}

	private settleStep(step: number) {
		const offset = this.getStepOffset(step);
		if (offset == null) return;
		this.cancelStepAnimation();
		this.setContainerTransform(offset);
		this.visualStep = step;
	}

	private getStepItem(step: number) {
		const item = (this.items as Item[])[step];
		if (item === undefined) {
			throw new Error(`Stepper item not found at index ${step}.`);
		}
		return item;
	}

	private notifyChange(step: number) {
		const onChange = this.onChange as ((item: Item) => void) | undefined;
		onChange?.(this.getStepItem(step));
	}

	private animateToStep(step: number) {
		if (!this.canGoToStep(step)) return;

		const navigationId = ++this.navigationId;
		const offset = this.getStepOffset(step);
		if (!this.stepContainer || offset == null) {
			this.visualStep = step;
			return;
		}

		this.isAnimating = true;
		this.cancelAnimations();
		const fromTransform = this.stepContainer.style.transform || 'translateX(0px)';
		const toTransform = `translateX(-${offset}px)`;
		this.destinationOffset = offset;
		this.stepAnimation = this.stepContainer.animate(
			[{ transform: fromTransform }, { transform: toTransform }],
			this.keyFramesOptions
		);
		this.animations = [this.stepAnimation];

		this.stepAnimation.finished
			.catch((error: unknown) => {
				if (error instanceof DOMException && error.name === 'AbortError') return;
				throw error;
			})
			.finally(() => {
				if (navigationId !== this.navigationId) return;
				const latestOffset = this.getStepOffset(this.activeStep) ?? offset;
				this.setContainerTransform(latestOffset);
				this.visualStep = this.activeStep;
				this.cancelStepAnimation();
				this.isAnimating = false;
			});
	}

	syncActiveStep(step: number) {
		if (!this.canGoToStep(step)) return;
		if (!this.stepContainer) {
			this.visualStep = step;
			return;
		}
		if (this.visualStep !== step) {
			this.animateToStep(step);
			return;
		}
		if (!this.isAnimating) this.settleStep(step);
	}

	private requestStep(step: number, shouldNotify: boolean) {
		if (!this.canGoToStep(step)) return;
		if (this.activeStep === step) return;
		this.activeStep = step;
		if (shouldNotify) this.notifyChange(step);
	}

	setActiveStep = (step: number) => () => {
		this.requestStep(step, true);
	};

	translate = () => {
		this.syncActiveStep(this.activeStep);
	};

	scroller = (node: HTMLElement) => {
		const preventScroll = (event: Event) => {
			event.preventDefault();
			node.scrollTo(0, 0);
		};

		const setOffsets = () => {
			if (this.rafId) cancelAnimationFrame(this.rafId);
			this.rafId = requestAnimationFrame(() => {
				this.updateOffsets();
				if (!this.isAnimating) this.settleStep(this.activeStep);
				this.rafId = null;
			});
		};

		node.addEventListener('scroll', preventScroll, { passive: false });
		node.scrollTo(0, 0);

		const resizeObserver = new ResizeObserver(setOffsets);
		resizeObserver.observe(node);
		if (this.stepContainer) resizeObserver.observe(this.stepContainer);
		setOffsets();

		return () => {
			node.removeEventListener('scroll', preventScroll);
			resizeObserver.disconnect();
			if (this.rafId) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
			this.cancelAnimations();
		};
	};

	next = () => {
		this.goTo(this.activeStep + 1);
	};

	previous = () => {
		this.goTo(this.activeStep - 1);
	};

	goTo = (step: number) => {
		this.requestStep(step, true);
	};

	canGoToStep = (targetStep: number): boolean => {
		return targetStep >= 0 && targetStep < this.items.length;
	};
}
