import type { Slot } from '../../Slot/slot.js';
import type { FieldProps, InputProps } from '../Field/field.js';

export type CheckBoxesOption = {
	label?: Slot;
	value: string;
	description?: Slot;
};
export type CheckBoxesInputProps<T extends CheckBoxesOption = CheckBoxesOption> =
	InputProps<'checkboxes'> & {
		value?: string[];
		mode?: 'card' | 'normal';
		options: T[];
	} & Partial<Omit<FieldProps<'checkboxes'>, 'children' | 'type'>>;

