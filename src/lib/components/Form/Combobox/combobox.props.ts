import type { InputProps } from '../Field/field.js';
import type { ComboboxThemeProps } from './combobox.theme.js';
import type { Snippet } from 'svelte';

export type MaybePromise<T> = T | Promise<T>;

export type ComboboxOption = {
	value: string;
	label: string;
	description?: string;
	data?: Record<string, any>;
};

export type ComboboxProps = Omit<InputProps<'combobox'>, 'prefix' | 'onChange'> & {
	onChange?: (value: string, option: ComboboxOption | null) => void;
	searchValue?: string;
	loading?: boolean;
	placeholder?: string;
	options: ComboboxOption[] | ((searchValue?: string) => MaybePromise<ComboboxOption[]>);
	showAllOnFocus?: boolean;
	/**
	 * Function to get the label for a value when the option is not yet loaded.
	 * Useful for async options where the default value might not be in the initial options list.
	 */
	getValueOption?: (value: string) => MaybePromise<ComboboxOption | null | undefined>;
	/**
	 * Prefix content. Set to `false` to hide the default magnifying glass icon.
	 * If not provided, the magnifying glass icon is shown by default.
	 */
	prefix?: Snippet | false;
	/**
	 * Text to display when loading options. Defaults to "Loading...".
	 */
	loadingText?: string;
	/**
	 * Text to display when no options are found or available. Defaults to "No options found".
	 */
	noOptionsText?: string;
	theme?: ComboboxThemeProps & InputProps<'combobox'>['theme'];
};
