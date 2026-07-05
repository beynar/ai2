import type { Slot } from '../../Slot/slot.js';
import type { FieldProps, InputProps } from '../Field/field.js';

export type CheckboxOption = {
	/** Display content for the option, rendered as the option label. */
	label?: Slot;
	/** Unique value for the option, used as the checkbox value and selection key. */
	value: string;
	/** Supporting content rendered below the option label. */
	description?: Slot;
};
export type CheckboxesInputProps<T extends CheckboxOption = CheckboxOption> =
	InputProps<'checkboxes'> & {
		/** Selected option values, bindable with `bind:value`. */
		value?: string[];
		/** Called when an option is clicked, with the clicked option's value. */
		onClick?: (value: string) => void;
		/** Visual layout style for the checkbox group (`normal` or `card`). */
		mode?: 'card' | 'normal';
		/** Items to render as checkbox choices. */
		items: T[];
	} & Partial<Omit<FieldProps<'checkboxes'>, 'children' | 'type'>>;
