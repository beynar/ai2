import type { Slot } from '../../Slot/slot.js';
import { cva } from '$lib/utils/cva.js';

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

const defaultRadioInput = cva({
	base: 'grid gap-3',
	variants: {
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultRadioInputItem = cva({
	base: 'transition-all relative grid items-center gap-1 pl-12 cursor-pointer w-full',
	variants: {
		mode: {
			card: 'rounded raised py-2',
			normal: 'py-1'
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

const defaultRadioInputItemLabel = cva({
	base: 'flex items-center gap-4 flex-wrap text-sm'
});

const defaultRadioInputItemTrack = cva({
	base: 'size-6 origin-center content-[""] bg-surface-lighter rounded-full absolute top-0 left-2 right-0 bottom-0 my-auto',
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

const defaultRadioInputItemThumb = cva({
	base: 'size-6 my-auto origin-center radio bg-contrast rounded-full transition-all content-[""] absolute top-0 left-2 right-0 bottom-0 scale-[40%] opacity-0',
	variants: {
		checked: {
			true: 'bg-contrast scale-[60%] opacity-100',
			false: ''
		},
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultRadioInputItemIcon = cva({
	base: ''
});

const defaultRadioInputItemDescription = cva({
	base: 'text-xs text-contrast-muted'
});

const defaultRadioInputContainer = cva({
	base: 'grid gap-3 grid-cols-2',
	variants: {
		mode: {
			card: '',
			normal: ''
		}
	}
});

export const radiosInputTheme = {
	radiosInput: defaultRadioInput,
	radiosInputItem: defaultRadioInputItem,
	radiosInputItemLabel: defaultRadioInputItemLabel,
	radiosInputItemTrack: defaultRadioInputItemTrack,
	radiosInputItemThumb: defaultRadioInputItemThumb,
	radiosInputItemIcon: defaultRadioInputItemIcon,
	radiosInputItemDescription: defaultRadioInputItemDescription,
	radiosInputContainer: defaultRadioInputContainer
};
