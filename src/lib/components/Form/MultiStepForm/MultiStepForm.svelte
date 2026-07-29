<script lang="ts" generics="I extends MultiStepFormItems">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import type { MultiStepFormItems, MultiStepFormProps } from './multiStepForm.props.js';
	import { useMultiStepFormTheme } from './multiStepForm.theme.js';
	import Form from '../Form/Form.svelte';
	import Meter from '$lib/components/Meter/Meter.svelte';
	import { MultiStepFormState } from './multiStepForm.state.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';
	import { arrowLeftIcon } from '$lib/components/Icons/arrowLeft.js';
	import { arrowRightIcon } from '$lib/components/Icons/arrowRight.js';
	import { arrowCircleUpIcon } from '$lib/components/Icons/arrowCircleUp.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { ButtonProps } from '$lib/components/Button/button.props.js';

	let {
		items,
		onSubmitForm,
		onSubmitStep,
		children,
		showMeter = true,
		meterColor,
		nextText = 'Next',
		previousText = 'Previous',
		submitText = 'Submit',
		class: className,
		variant = 'plain',
		theme,
		footer,
		header,
		nextButtonProps = {},
		previousButtonProps = {},
		submitButtonProps = {},
		value = $bindable({})
	}: MultiStepFormProps<I> = $props();

	let form = new MultiStepFormState({
		get steps() {
			return items;
		},
		get onSubmitForm() {
			return onSubmitForm;
		},
		get onSubmitStep() {
			return onSubmitStep;
		},
		get meterColor() {
			return meterColor;
		},
		get value() {
			return value;
		},
		set value(nextValue) {
			value = nextValue;
		}
	});

	const getButtonConfig = (props: ButtonProps) => {
		const { onClick, disabled, loading, ...forwardedProps } = props;
		return { onClick, disabled, loading, forwardedProps };
	};

	const previousButton = $derived(getButtonConfig(previousButtonProps));
	const nextButton = $derived(getButtonConfig(nextButtonProps));
	const submitButton = $derived(getButtonConfig(submitButtonProps));
	const activeButton = $derived(form.isLastStep ? submitButton : nextButton);

	const goToPreviousStep = () => {
		form.stepper?.previous();
		previousButton.onClick?.(undefined);
	};

	const submitCurrentStep = () => {
		void form.submit();
		activeButton.onClick?.(undefined);
	};

	const formTheme = $derived(theme?.form);
	const baseTheme = $derived.by(() => {
		if (!theme) return undefined;
		const base = { ...theme };
		delete base.form;
		return base;
	});
	const classes = $derived(useMultiStepFormTheme(baseTheme));
</script>

<div class={classes.root({ className })}>
	<Slot
		render={header}
		payload={form}
		renderIf={showMeter || !!header}
		class={classes.multiStepFormHeader()}
	>
		{#if showMeter}
			<Meter value={[form.progress]} steps={form.meterSteps} />
		{/if}
	</Slot>
	<Stepper bind:stepper={form.stepper} {items}>
		{#snippet children({ item, index })}
			<div class={variant === 'card' ? 'min-w-0 p-1' : 'min-w-0'}>
				<Form
					class="p-4"
					inputs={item.inputs}
					bind:form={() => form.getForm(index), (nextForm) => form.setForm(index, nextForm)}
					bind:value={
						() => form.getStepValue(index), (nextValue) => form.setStepValue(index, nextValue)
					}
					title={item.title}
					description={item.description}
					{variant}
					theme={formTheme}
					submitButton={null}
				/>
			</div>
		{/snippet}
	</Stepper>
	{@render children?.(form)}
	<Slot render={footer} payload={form} class={classes.multiStepFormFooter()}>
		<Button
			{...previousButton.forwardedProps}
			prefix={arrowLeftIcon}
			disabled={form.stepper?.activeStep === 0 || form.loading || previousButton.disabled}
			loading={form.loading || previousButton.loading}
			onClick={goToPreviousStep}
		>
			{previousText}
		</Button>
		<Button
			{...activeButton.forwardedProps}
			suffix={form.isLastStep ? arrowCircleUpIcon : arrowRightIcon}
			disabled={form.loading || activeButton.disabled}
			loading={form.loading || activeButton.loading}
			onClick={submitCurrentStep}
		>
			{form.isLastStep ? submitText : nextText}
		</Button>
	</Slot>
</div>
