import type { Slot } from '../../Slot/slot.js';
import type { InputProps } from '../Field/field.js';

export type RadiosOption = {
	label?: string;
	value: string;
	icon?: Slot;
	iconProps?: Record<string, any>;
	description?: string;
};
export type RadioInputProps<T extends RadiosOption = RadiosOption> = InputProps<'radio'> & {
	mode?: 'card' | 'normal';
	options: T[];
};

