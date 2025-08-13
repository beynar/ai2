<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';

	import { stepperTheme } from './stepper.js';
	export const setStepperTheme = setComponentTheme<typeof stepperTheme>('stepper');
	export const useStepperTheme = useComponentTheme('stepper', stepperTheme);
</script>

<script lang="ts" generics="Item">
	import { type StepperProps } from './stepper.js';
	import { StepperState } from './stepperState.svelte.js';
	let {
		items = [],
		activeStep = $bindable(0),
		stepper = $bindable<StepperState<Item>>(),
		class: className,
		children,
		onChange,
		keyFramesOptions = {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'both'
		},
		mode = 'classic',
		...snippets
	}: StepperProps<Item> = $props();

	stepper = new StepperState({
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
	const classes = $derived(useStepperTheme());
</script>

<div
	use:stepper.scroller
	class={classes.stepper({
		mode,
		className
	})}
	style:height="{stepper.stepHeights[activeStep]}px"
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
				bind:clientHeight={stepper.stepHeights[index]}
				data-step={index}
				tabindex={stepper.activeStep === index ? 0 : -1}
				inert={stepper.activeStep !== index}
				role="tabpanel"
				aria-labelledby={`stepper-${index}`}
				class={classes.step({
					mode
				})}
			>
				{@render snippets[`step${index + 1}`]?.({ stepper, item, index })}
			</div>
		{/each}
	</div>
</div>
