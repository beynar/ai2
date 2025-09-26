import type { Slot } from '../../Slot/slot.js';
import { cva } from '$lib/utils/cva.js';

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

const defaultCheckBoxesInput = cva({
	base: 'grid gap-3 ',
	variants: {
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultCheckBoxesInputItem = cva({
	base: 'transition-all relative grid items-center gap-1 pl-12 cursor-pointer w-full',
	variants: {
		mode: {
			card: 'rounded bg-surface-light raised py-2',
			normal: ''
		},
		checked: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			mode: 'card',
			checked: true,
			class: 'ring-2 ring-contrast'
		}
	]
});

const defaultCheckBoxesInputItemLabel = cva({
	base: 'flex items-center gap-4 flex-wrap text-sm'
});

const defaultCheckBoxesInputItemTrack = cva({
	base: 'size-6 origin-center content-[""] bg-surface-light border border-surface-muted rounded absolute top-0 left-2 right-0 bottom-0 my-auto',
	variants: {
		checked: {
			true: '',
			false: ''
		},
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultCheckBoxesInputItemThumb = cva({
	base: `size-6 my-auto origin-center radio bg-contrast rounded flex items-center justify-center transition-all content-[""] absolute top-0 left-2 right-0 bottom-0 scale-[85%] opacity-0 
	stroke-surface [&>svg]:fill-surface p-1
	`,
	variants: {
		checked: {
			true: 'bg-contrast scale-[100%] opacity-100',
			false: ''
		},
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultCheckBoxesInputItemIcon = cva({
	base: ''
});

const defaultCheckBoxesInputItemDescription = cva({
	base: 'text-xs text-contrast-muted'
});

const defaultCheckBoxesInputContainer = cva({
	base: 'grid gap-3 grid-cols-1 md:grid-cols-2 items-start',
	variants: {
		mode: {
			card: '',
			normal: ''
		}
	}
});

export const checkBoxesInputTheme = {
	checkboxesInput: defaultCheckBoxesInput,
	checkboxesInputItem: defaultCheckBoxesInputItem,
	checkboxesInputItemLabel: defaultCheckBoxesInputItemLabel,
	checkboxesInputItemTrack: defaultCheckBoxesInputItemTrack,
	checkboxesInputItemThumb: defaultCheckBoxesInputItemThumb,
	checkboxesInputItemIcon: defaultCheckBoxesInputItemIcon,
	checkboxesInputItemDescription: defaultCheckBoxesInputItemDescription,
	checkboxesInputContainer: defaultCheckBoxesInputContainer
};
