import type { InputProps } from '../Field/field.js';
import type { SelectThemeProps } from './select.theme.js';

export type SelectOption = {
	/** Option value submitted when this item is chosen. */
	value: string;
	/** Text label displayed for this option. */
	label: string;
	/** Disables this option — it renders dimmed and cannot be selected or highlighted. */
	disabled?: boolean;
};

export type SelectOptionGroup = {
	/** Optional group label rendered above the group's options. */
	label?: string;
	/** The options of the group. */
	items: SelectOption[];
};

/** Flat options and `{ label, items }` groups can be mixed freely. */
export type SelectItems = (SelectOption | SelectOptionGroup)[];

export type SelectProps = InputProps<'select'> & {
	/** Text shown in the trigger when no value is selected. */
	placeholder?: string;
	/** Theme overrides for the select trigger, dropdown, options, and field container. */
	theme?: SelectThemeProps & InputProps<'select'>['theme'];
	/** Items to display — flat `{ value, label }` entries and/or `{ label, items }` groups. */
	items?: SelectItems;
	/** Render separators between consecutive groups. */
	separators?: boolean;
};
