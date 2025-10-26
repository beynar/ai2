import { StepperState } from '$lib/components/Stepper/stepperState.svelte.js';
import type { Snippet } from 'svelte';
import type { FormState } from '../Form/formState.svelte.js';
import type { FormStep } from './multiStepForm.js';
import type { MergedMultiStepFormInputs } from './multiStepForm.js';
import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { InferFormValue } from '../Form/form.js';
import { step } from './MultiStepForm.svelte';
import { setContext } from 'svelte';
import type { Colors } from '$lib/types/theme.js';
export class MultiStepFormState<
	I extends FormStep[] = FormStep[]
> extends createBindableStateClass<{
	steps: FormStep[];
	onSubmitForm?: (value: InferFormValue<MergedMultiStepFormInputs<any>>) => Promise<void> | void;
	onSubmitStep?: (
		value: InferFormValue<MergedMultiStepFormInputs<any>>,
		step: FormStep,
		index: number
	) => Promise<void | boolean> | void | boolean;
	meterColor?: Colors;
}>() {
	forms = $state<FormState[]>([]);
	stepper = $state<StepperState<FormStep>>();
	loading = $state(false);
	isLastStep = $derived(this.stepper?.activeStep === this.steps.length - 1);
	constructor(opts: {
		steps: I;
		onSubmitForm?: (value: InferFormValue<MergedMultiStepFormInputs<I>>) => Promise<void> | void;
		onSubmitStep?: (
			value: InferFormValue<MergedMultiStepFormInputs<any>>,
			step: I[number],
			index: number
		) => Promise<void | boolean> | void | boolean;
		meterColor?: Colors;
	}) {
		super(opts);
		setContext('multiStepForm', this);
	}
	progress = $derived({
		value: (((this.stepper?.activeStep || 0) + 1) / this.steps.length) * 100,
		color: this.meterColor || 'info'
	});

	meterSteps = $derived(
		this.steps.map(
			(step, index) =>
				({
					label: ``,
					start: (index / this.steps.length) * 100,
					end: ((index + 1) / this.steps.length) * 100,
					color: this.meterColor || 'info'
				}) as any
		)
	);

	stepsSnippets = $derived(
		this.steps.reduce(
			(acc, _step, index) => {
				Object.assign(acc, {
					[`step${index + 1}`]: step
				});
				return acc;
			},
			{} as Record<
				`step${number}`,
				Snippet<
					[
						{
							stepper: StepperState<I>;
							item: I;
							index: number;
						}
					]
				>
			>
		)
	);

	addForm(form: FormState) {
		this.forms.push(form);
	}

	async submit() {
		let hasError = false;
		const value = this.forms.reduce(
			(acc, form, index) => {
				if (index <= this.stepper?.activeStep!) {
					const value = form.validate();
					if (value) {
						return { ...acc, ...value };
					} else {
						hasError = true;
					}
				}

				return acc;
			},
			{} as InferFormValue<MergedMultiStepFormInputs<I>>
		);

		console.log({ hasError });

		if (this.stepper?.activeStep !== this.steps.length - 1) {
			if (this.onSubmitStep && !hasError) {
				let shouldContinue = this.onSubmitStep(
					value as InferFormValue<MergedMultiStepFormInputs<I>>,
					this.steps[this.stepper?.activeStep!],
					this.stepper?.activeStep!
				);
				if (shouldContinue instanceof Promise) {
					this.loading = true;
					shouldContinue = await shouldContinue;
					this.loading = false;
					if (shouldContinue !== false) {
						this.stepper?.next();
					}
				} else if (shouldContinue !== false && !hasError) {
					this.stepper?.next();
				}
			} else if (!hasError) {
				// Automatic continue to the next step if no onSubmitStep is provided.
				this.stepper?.next();
			}
		} else if (this.stepper?.activeStep === this.steps.length - 1) {
			if (this.onSubmitForm) {
				const maybePromise = this.onSubmitForm(
					value as InferFormValue<MergedMultiStepFormInputs<I>>
				);
				if (maybePromise instanceof Promise) {
					this.loading = true;
					await maybePromise;
					this.loading = false;
				}

				if (!hasError) {
					return value;
				}
			}
		} else if (hasError) {
			return false;
		}

		return value;
	}
}
