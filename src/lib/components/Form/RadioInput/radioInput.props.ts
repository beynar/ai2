import type { Slot } from '../../Slot/slot.js';
import type { InputProps } from '../Field/field.js';

export type RadiosOption = {
	label?: string;
	value: string;
	icon?: Slot;
	description?: string;
};
export type RadioInputProps<T extends RadiosOption = RadiosOption> = InputProps<'radio'> & {
	mode?: 'card' | 'normal';
	onClick?: (value: string) => void;
	options: T[];
};
