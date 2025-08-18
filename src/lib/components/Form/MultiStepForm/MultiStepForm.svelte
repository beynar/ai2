<script lang="ts" module>
	export { step };
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { multiStepFormTheme } from './multiStepForm.js';
	export const setMultiStepFormTheme =
		setComponentTheme<typeof multiStepFormTheme>('multiStepForm');
	export const useMultiStepFormTheme = useComponentTheme('multiStepForm', multiStepFormTheme);
</script>

<script lang="ts" generics="I extends FormStep[]">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import { StepperState } from '$lib/components/Stepper/stepperState.svelte.js';
	import { getContext, setContext, tick, type Snippet } from 'svelte';
	import type { MultiStepFormProps } from './multiStepForm.js';
	import type { FormStep } from './multiStepForm.js';
	import Form from '../Form/Form.svelte';
	import Meter from '$lib/components/Meter/Meter.svelte';
	import { MultiStepFormState } from './multiStepFormState.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';
	import { arrowLeftIcon } from '$lib/components/Icons/arrowLeft.js';
	import { arrowRightIcon } from '$lib/components/Icons/arrowRight.js';
	import { arrowCircleUpIcon } from '$lib/components/Icons/arrowCircleUp.js';
	import Slot from '$lib/components/Slot/Slot.svelte';

	let {
		steps,
		onSubmitForm,
		onSubmitStep,
		children,
		showMeter = true,
		meterColor,
		nextText = 'Next',
		previousText = 'Previous',
		submitText = 'Submit',
		class: className,
		theme,
		footer,
		footerProps,
		header,
		headerProps
	}: MultiStepFormProps<I> = $props();

	let form = new MultiStepFormState({
		get steps() {
			return steps;
		},
		onSubmitForm,
		onSubmitStep,
		get meterColor() {
			return meterColor;
		}
	});

	const { form: formTheme, ...baseTheme } = theme || {};
	const classes = $derived(useMultiStepFormTheme(baseTheme));
</script>

{#snippet step({
	stepper,
	item,
	index
}: {
	stepper: StepperState<FormStep>;
	item: FormStep;
	index: number;
})}
	<Form class="p-4" inputs={item.inputs} title={item.title} description={item.description} />
{/snippet}

<div class={classes.multiStepForm({ className })}>
	<Slot render={header} payload={form} props={headerProps}>
		{#if showMeter}
			<Meter value={[form.progress]} steps={form.meterSteps} />
		{/if}
	</Slot>
	<Stepper
		onChange={() => {
			tick().then(() => {
				const firstInput = form.stepper?.stepContainer?.querySelector(
					`[data-step="${form.stepper?.activeStep}"]`
				);

				if (firstInput) {
					(firstInput as HTMLElement).focus();
				}
			});
		}}
		bind:stepper={form.stepper}
		items={form.steps}
		{...form.stepsSnippets}
	/>
	{@render children?.(form)}
	<Slot render={footer} payload={form} props={footerProps} class={classes.multiStepFormFooter()}>
		<Button
			prefix={arrowLeftIcon}
			disabled={form.stepper?.activeStep === 0}
			onClick={() => form.stepper?.previous()}
		>
			{previousText}
		</Button>
		<Button
			suffix={form.isLastStep ? arrowCircleUpIcon : arrowRightIcon}
			disabled={form.loading}
			onClick={() => form.submit()}
		>
			{form.isLastStep ? submitText : nextText}
		</Button>
	</Slot>
</div>
