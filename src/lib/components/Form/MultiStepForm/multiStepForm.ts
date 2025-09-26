import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { Colors } from '$lib/types/theme.js';
import type { Snippet } from 'svelte';
import type { FormInputs, FormProps, InferFormValue } from '../Form/form.js';
import type { FormState } from '../Form/formState.svelte.js';
import type { MultiStepFormState } from './multiStepFormState.svelte.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { ButtonProps } from '$lib/components/Button/button.js';

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
		theme?: InferComponentTheme<typeof multiStepFormTheme> & {
			form?: FormProps<any>['theme'];
		};
		previousButtonProps?: ButtonProps;
		nextButtonProps?: ButtonProps;
		submitButtonProps?: ButtonProps;
	},
	'footer' | 'header',
	MultiStepFormState<I>
>;

type unionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

export type MergedMultiStepFormInputs<I extends FormStep[]> =
	unionToIntersection<I[number]['inputs']> extends FormInputs
		? unionToIntersection<I[number]['inputs']>
		: never;

export const defaultMultiStep = cva({
	base: 'flex flex-col relative p-2'
	// variants: {
	// size: {
	// 	small: 'gap-2',
	// 	normal: 'gap-4',
	// 	large: 'gap-6'
	// }
	// }
});

export const defaultMultiStepFooter = cva({
	base: 'flex justify-between gap-2'
	// variants: {
	// 	size: {
	// 		small: 'gap-2',
	// 		normal: 'gap-4',
	// 		large: 'gap-6'
	// 	}
	// }
});

export const multiStepFormTheme = {
	multiStepForm: defaultMultiStep,
	multiStepFormFooter: defaultMultiStepFooter
};
