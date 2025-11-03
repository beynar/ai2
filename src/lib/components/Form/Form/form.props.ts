import type { Snippet } from 'svelte';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { ButtonProps } from '$lib/components/Button/index.js';
import type { FormInputs, FormSubmitHandler, InferFormValue } from './form.js';
import type { FormState } from './formState.svelte.js';
import type { FormThemeProps } from './form.theme.js';

export type FormProps<I extends FormInputs> = WithSlot<
	{
		inputs: I;
		onSubmit?: FormSubmitHandler<I>;
		value?: InferFormValue<I>;
		children?: Snippet<[form: FormState<I>]>;
		// Bindable
		form?: FormState<I>;
		class?: string;
		theme?: FormThemeProps;
		submitButton?: ButtonProps | null;
	},
	'header' | 'title' | 'description' | 'footer',
	[FormState<I>]
>;

