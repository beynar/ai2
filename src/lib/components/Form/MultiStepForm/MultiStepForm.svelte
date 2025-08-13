<script lang="ts" module>
	export { step };
</script>

<script lang="ts" generics="I extends FormStep[]">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import { StepperState } from '$lib/components/Stepper/stepperState.svelte.js';
	import { tick, type Snippet } from 'svelte';
	import type { MultiStepFormProps } from './multiStepForm.js';
	import type { FormStep } from './multiStepForm.js';
	import Form from '../Form/Form.svelte';
	import Meter from '$lib/components/Meter/Meter.svelte';
	import { MultiStepFormState } from './multiStepFormState.svelte.js';
	import Button from '$lib/components/Button/Button.svelte';
	import { arrowArcLeftIcon } from '$lib/components/Icons/arrowArcLeft.js';
	import { arrowLeftIcon } from '$lib/components/Icons/arrowLeft.js';
	import { arrowRightIcon } from '$lib/components/Icons/arrowRight.js';
	import { arrowFatUpIcon } from '$lib/components/Icons/arrowFatUp.js';
	import { arrowCircleUpIcon } from '$lib/components/Icons/arrowCircleUp.js';

	let { steps, title, description, onSubmit }: MultiStepFormProps<I> = $props();

	let form = new MultiStepFormState({
		get steps() {
			return steps;
		},
		onSubmit
	});
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
	<Form class="p-4" inputs={item.inputs} />
{/snippet}

<div class="p-4">
	<div>
		<Meter value={[form.progress]} steps={form.meterSteps} />
	</div>
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
	<div class="flex justify-between gap-2">
		<Button
			prefix={arrowLeftIcon}
			disabled={form.stepper?.activeStep === 0}
			onClick={() => form.stepper?.previous()}
		>
			Previous
		</Button>
		<Button
			suffix={form.isLastStep ? arrowCircleUpIcon : arrowRightIcon}
			disabled={form.loading}
			onClick={() => {
				const result = form.submit();

				console.log({ result });
			}}>{form.isLastStep ? 'Submit' : 'Next'}</Button
		>
	</div>
</div>
