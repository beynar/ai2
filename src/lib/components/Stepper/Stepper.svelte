<script lang="ts" generics="Item">
	import BeforeHydratation from '../Utils/BeforeHydratation.svelte';
	import { type StepperProps } from './stepper.props.js';
	import { useStepperTheme } from './stepper.theme.js';
	import { StepperState } from './stepperState.svelte.js';
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
		mode = 'classic',
		step: defaultStepSnippet,
		...snippets
	}: StepperProps<Item> = $props();

	const id = $props.id();

	const stepper = new StepperState({
		get activeStep() {
			return activeStep;
		},
		set activeStep(value) {
			activeStep = value;
		},
		items,
		onChange: (item) => {
			onChange?.(item);
		},
		keyFramesOptions
	});

	bindableStepper = stepper;
	const classes = $derived(useStepperTheme());
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
	class={classes.stepper({
		mode,
		className
	})}
	id="stepper-{id}"
	style:height="{stepper?.stepHeights?.[activeStep] || undefined}px"
	style:transition-duration={`${keyFramesOptions.duration}ms`}
>
	<div
		bind:this={stepper.stepContainer}
		class={classes.container({
			mode
		})}
		style:grid-template-columns="repeat({items.length}, 100%)"
	>
		{#each items as item, index}
			<div
				bind:clientHeight={
					() => {
						if (stepper?.stepHeights?.[index]) {
							return 0;
						}
						return stepper.stepHeights[index];
					},
					(value) => {
						if (!stepper?.stepHeights) return;
						stepper.stepHeights[index] = value || 0;
					}
				}
				data-step-active={stepper.activeStep === index}
				data-step={index}
				tabindex={stepper.activeStep === index ? 0 : -1}
				inert={stepper.activeStep !== index}
				role="tabpanel"
				aria-labelledby={`stepper-${index}`}
				class={classes.step({
					mode
				})}
			>
				{#if snippets[`step${index + 1}`]}
					{@render snippets[`step${index + 1}`]?.({ stepper, item, index })}
				{:else if defaultStepSnippet}
					{@render defaultStepSnippet({ stepper, item, index })}
				{/if}
			</div>
		{/each}
	</div>
</div>
