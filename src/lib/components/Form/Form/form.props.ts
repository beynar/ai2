import type { Snippet } from 'svelte';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { ButtonProps } from '$lib/components/Button/index.js';
import type { FormInputs, FormSubmitHandler, InferFormValue } from './form.js';
import type { FormState } from './form.state.svelte.js';
import type { FormThemeProps } from './form.theme.js';

export type FormProps<I extends FormInputs> = WithSlot<
	{
		/**
		 * Field definitions keyed by name; each entry selects an input type and its props.
		 */
		inputs: I;
		/**
		 * Called after successful validation with the visible field values.
		 */
		onSubmit?: FormSubmitHandler<I>;
		/**
		 * Bindable object of current field values, inferred from the inputs configuration.
		 */
		value?: InferFormValue<I>;
		/**
		 * Custom content rendered after the fields, receiving the form state instance.
		 */
		children?: Snippet<[form: FormState<I>]>;
		// Bindable
		/**
		 * Bindable form state instance for validation, submission, and value access.
		 */
		form?: FormState<I>;
		/**
		 * Additional CSS classes applied to the form root element.
		 */
		class?: string;
		/**
		 * Theme overrides for form layout, header, title, and description styling.
		 */
		theme?: FormThemeProps;
		/**
		 * Props for an optional submit button rendered at the bottom; set to null to hide it.
		 */
		submitButton?: ButtonProps | null;
	},
	'header' | 'title' | 'description' | 'footer'
>;
