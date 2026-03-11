<script lang="ts" generics="I extends FormStep[]">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import { tick, type Snippet } from 'svelte';
	import type { MultiStepFormProps, FormStep } from './multiStepForm.props.js';
	import { useMultiStepFormTheme } from './multiStepForm.theme.js';
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
		header,
		nextButtonProps = {},
		previousButtonProps = {},
		submitButtonProps = {},
		value = $bindable({})
	}: MultiStepFormProps<I> = $props();

	let form = new MultiStepFormState(
		{
			get steps() {
				return steps;
			},
			onSubmitForm,
			onSubmitStep,
			get meterColor() {
				return meterColor;
			}
		},
		step
	);

	const { form: formTheme, ...baseTheme } = theme || {};
	const classes = $derived(useMultiStepFormTheme(baseTheme));
</script>

{#snippet step({ item }: { stepper: Stepper<FormStep>; item: FormStep; index: number })}
	<Form
		class="p-4"
		inputs={item.inputs}
		title={item.title}
		description={item.description}
		submitButton={null}
	/>
{/snippet}

<div class={classes.multiStepForm({ className })}>
	<Slot render={header}>
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

				// if (firstInput) {
				// 	(firstInput as HTMLElement).focus();
				// }
			});
		}}
		bind:stepper={form.stepper}
		items={form.steps}
		{...form.stepsSnippets}
	/>
	{@render children?.(form)}
	<Slot render={footer} class={classes.multiStepFormFooter()}>
		<Button
			prefix={arrowLeftIcon}
			disabled={form.stepper?.activeStep === 0}
			onClick={() => form.stepper?.previous()}
			{...previousButtonProps}
		>
			{previousText}
		</Button>
		<Button
			suffix={form.isLastStep ? arrowCircleUpIcon : arrowRightIcon}
			disabled={form.loading}
			onClick={() => form.submit()}
			{...form.isLastStep ? submitButtonProps : nextButtonProps}
		>
			{form.isLastStep ? submitText : nextText}
		</Button>
	</Slot>
</div>
