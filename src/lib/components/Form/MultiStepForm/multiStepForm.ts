import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { FormInputs, InferFormValue } from '../Form/form.js';
import type { FormState } from '../Form/formState.svelte.js';

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
		title?: string;
		description?: string;
		previousText?: string;
		nextText?: string;
		submitText?: string;
		onSubmit: (
			values: InferFormValue<MergedMultiStepFormInputs<I>>
		) => Promise<void> | void | never;
	},
	'content' | 'title' | 'description'
>;

type unionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

export type MergedMultiStepFormInputs<I extends FormStep[]> =
	unionToIntersection<I[number]['inputs']> extends FormInputs
		? unionToIntersection<I[number]['inputs']>
		: never;
