import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { Colors } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { FormInputs, InferFormValue } from '../Form/form.js';
import type { FormState } from '../Form/formState.svelte.js';
import type { FormProps } from '../Form/form.props.js';
import type { MultiStepFormState } from './multiStepFormState.svelte.js';
import type { MultiStepFormThemeProps } from './multiStepForm.theme.js';
import type { ButtonProps } from '$lib/components/Button/index.js';

export type FormStep<I extends FormInputs = FormInputs> = {
	title?: string;
	description?: string;
	inputs: I;

	onBeforeChange?: ({
		value,
		form,
		next
	}: {
		value: InferFormValue<I>;
		form: FormState<I>;
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
		steps: I;
		showMeter?: boolean;
		meterColor?: Colors;
		previousText?: string;
		nextText?: string;
		submitText?: string;
		children?: Snippet<[MultiStepFormState<I>]>;
		onSubmitForm?: (
			values: InferFormValue<MergedMultiStepFormInputs<I>>
		) => Promise<void> | void | never;
		onSubmitStep?: (
			values: InferFormValue<MergedMultiStepFormInputs<I>>,
			step: I[number],
			index: number
		) => Promise<void | boolean> | void | boolean;
		class?: string;
		theme?: MultiStepFormThemeProps & {
			form?: FormProps<any>['theme'];
		};
		previousButtonProps?: ButtonProps;
		nextButtonProps?: ButtonProps;
		submitButtonProps?: ButtonProps;
		value?: Partial<InferFormValue<MergedMultiStepFormInputs<I>>>;
	},
	'footer' | 'header'
>;

