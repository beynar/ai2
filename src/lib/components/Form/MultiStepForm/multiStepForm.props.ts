import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { Colors } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { FormInputs, InferFormValue } from '../Form/form.js';
import type { FormState } from '../Form/form.state.svelte.js';
import type { FormProps } from '../Form/form.props.js';
import type { MultiStepFormState } from './multiStepForm.state.svelte.js';
import type { MultiStepFormThemeProps } from './multiStepForm.theme.js';
import type { ButtonProps } from '$lib/components/Button/index.js';

export type FormStep<I extends FormInputs = FormInputs> = {
	/** Heading displayed at the top of this step's form. */
	title?: string;
	/** Supporting text shown below the step title. */
	description?: string;
	/** Field definitions rendered as a Form for this step. */
	inputs: I;

	/** Optional hook before leaving this step; call `next()` to continue. */
	onBeforeChange?: ({
		value,
		form,
		next
	}: {
		/** Validated field values from the current step. */
		value: InferFormValue<I>;
		/** Form state instance for the current step. */
		form: FormState<I>;
		/** Call to proceed with leaving this step. */
		next: () => void;
	}) => Promise<void> | void;
};

type unionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

export type MergedMultiStepFormInputs<I extends FormStep[]> =
	unionToIntersection<I[number]['inputs']> extends FormInputs
		? unionToIntersection<I[number]['inputs']>
		: never;

export type MultiStepFormProps<I extends FormStep[] = FormStep[]> = WithSlot<
	{
		/** Ordered items rendered as form steps. */
		items: I;
		/** When true, renders a progress meter above the stepper. */
		showMeter?: boolean;
		/** Color token applied to the progress meter segments. */
		meterColor?: Colors;
		/** Label for the previous-step navigation button. */
		previousText?: string;
		/** Label for the next-step navigation button. */
		nextText?: string;
		/** Label for the submit button on the final step. */
		submitText?: string;
		/** Snippet receiving the multi-step form state for custom content. */
		children?: Snippet<[MultiStepFormState<I>]>;
		/** Called with merged values when the final step is submitted. */
		onSubmitForm?: (
			values: InferFormValue<MergedMultiStepFormInputs<I>>
		) => Promise<void> | void | never;
		/** Called when advancing from a step; return false to block navigation. */
		onSubmitStep?: (
			values: InferFormValue<MergedMultiStepFormInputs<I>>,
			step: I[number],
			index: number
		) => Promise<void | boolean> | void | boolean;
		/** Additional CSS classes applied to the root container. */
		class?: string;
		/** Theme overrides for the multi-step form container and footer. */
		theme?: MultiStepFormThemeProps & {
			/** Theme overrides passed to each step's nested Form component. */
			form?: FormProps<any>['theme'];
		};
		/** Props spread onto the previous-step button. */
		previousButtonProps?: ButtonProps;
		/** Props spread onto the next-step button. */
		nextButtonProps?: ButtonProps;
		/** Props spread onto the submit button on the final step. */
		submitButtonProps?: ButtonProps;
		/** Bindable partial form values merged across all steps. */
		value?: Partial<InferFormValue<MergedMultiStepFormInputs<I>>>;
	},
	'footer' | 'header'
>;
