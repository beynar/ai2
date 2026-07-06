<script lang="ts" generics="Item">
	import { untrack } from 'svelte';
	import BeforeHydratation from '../Utils/BeforeHydratation.svelte';
	import { type StepperProps } from './stepper.props.js';
	import { useStepperTheme } from './stepper.theme.js';
	import { StepperState } from './stepper.state.svelte.js';
	export type { StepperState };
	let {
		items = [],
		activeStep = $bindable(0),
		stepper: bindableStepper = $bindable<StepperState<Item>>(),
		class: className,
		children,
		onChange,
		keyFramesOptions = {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'both'
		},
		mode = 'classic'
	}: StepperProps<Item> = $props();

	const id = $props.id();

	const stepper = new StepperState({
		get activeStep() {
			return activeStep;
		},
		set activeStep(value) {
			activeStep = value;
		},
		get items() {
			return items;
		},
		get onChange() {
			return onChange;
		},
		get keyFramesOptions() {
			return keyFramesOptions;
		}
	});

	bindableStepper = stepper;
	const classes = $derived(useStepperTheme());
	const activeHeight = $derived(stepper.stepHeights[activeStep]);

	$effect(() => {
		const targetStep = activeStep;
		if (items.length === 0) return;
		untrack(() => stepper.syncActiveStep(targetStep));
	});
</script>

<BeforeHydratation
	once
	scripts={[
		`const setStepperHeight_${id} = () => {	
const container = document.getElementById('stepper-${id}');
if(!container) return;
const firstSlide = container.querySelector('[data-step-active="true"]');
if(!firstSlide) return;		
container.style.height = firstSlide.clientHeight + 'px';			
	};
	setStepperHeight_${id}();
`
	]}
/>

<div
	{@attach stepper.scroller}
	class={classes.root({
		mode,
		className
	})}
	id="stepper-{id}"
	style:overflow={stepper?.isAnimating ? 'hidden' : 'visible'}
	style:will-change="height"
	style:height={activeHeight == null ? undefined : `${activeHeight}px`}
	style:transition-duration={`${keyFramesOptions.duration}ms`}
>
	<div
		bind:this={stepper.stepContainer}
		class={classes.container({
			mode
		})}
		style:pointer-events="none"
		style:grid-template-columns="repeat({items.length}, 100%)"
	>
		{#each items as item, index}
			{@const isActiveStep = stepper.activeStep === index}
			<div
				bind:clientHeight={
					() => stepper?.stepHeights?.[index] ?? undefined,
					(value) => {
						if (!stepper?.stepHeights) return;
						stepper.stepHeights[index] = value || 0;
					}
				}
				data-step-active={isActiveStep}
				data-step={index}
				tabindex={isActiveStep ? 0 : -1}
				inert={!isActiveStep}
				role="tabpanel"
				aria-labelledby={`stepper-${index}`}
				style:opacity={isActiveStep ? 1 : 0}
				style:pointer-events={isActiveStep ? 'auto' : 'none'}
				style:transition-property="opacity"
				style:transition-duration={`${keyFramesOptions.duration}ms`}
				style:transition-timing-function={keyFramesOptions.easing}
				class={classes.step({
					mode
				})}
			>
				{@render children?.({ stepper, item, index })}
			</div>
		{/each}
	</div>
</div>
