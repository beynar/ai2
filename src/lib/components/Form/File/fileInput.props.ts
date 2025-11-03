import type { InputProps } from '../Field/field.js';
import type { FileInputThemeProps } from './fileInput.theme.js';
import type { Snippet } from 'svelte';

export type FileInputMode = 'single' | 'multiple';
export type FileInputType<Mode extends FileInputMode> = Mode extends 'multiple' ? 'files' : 'file';
export type FileInputValue<Mode extends FileInputMode> = Mode extends 'single'
	? File | null
	: File[] | null;

export type FileInputProps<Mode extends FileInputMode = 'single'> = Omit<
	InputProps<FileInputType<Mode>>,
	'value' | 'placeholder'
> & {
	mode?: Mode;
	value?: FileInputValue<Mode>;
	onChange?: (value: FileInputValue<Mode>) => void;
	types?: string[];
	maxFiles?: number;
	clickable?: boolean;
	maxSize?: number;
	placeholder?: string;
	// Slot props
	fileList?: Snippet<[any]>;
	fileListClass?: string;
	fileListProps?: Record<string, any>;
	file?: Snippet<[any]>;
	fileClass?: string;
	fileProps?: Record<string, any>;
	placeholderClass?: string;
	theme?: FileInputThemeProps & InputProps<FileInputType<Mode>>['theme'];
};

