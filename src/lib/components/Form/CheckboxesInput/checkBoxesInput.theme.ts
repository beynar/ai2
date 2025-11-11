import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

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
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	compoundVariants: [
		{
			mode: 'card',
			checked: true,
			class: 'ring-2 ring-primary bg-primary-muted'
		}
	]
});

const defaultCheckBoxesInputItemLabel = cva({
	base: 'flex items-center gap-4 flex-wrap text-sm'
});

const defaultCheckBoxesInputItemTrack = cva({
	base: 'size-5 origin-center content-[""] bg-surface-light border border-surface-muted rounded absolute top-0 left-2 right-0 bottom-0 my-auto',
	variants: {
		checked: {
			true: '',
			false: ''
		},
		mode: {
			card: '',
			normal: ''
		},
		disabled: {
			true: 'opacity-50',
			false: ''
		}
	}
});

const defaultCheckBoxesInputItemThumb = cva({
	base: `size-5 my-auto origin-center radio bg-contrast rounded flex items-center justify-center transition-all content-[""] absolute top-0 left-2 right-0 bottom-0 scale-[85%] opacity-0 
	stroke-surface [&>svg]:fill-surface p-1
	`,
	variants: {
		checked: {
			true: 'bg-primary scale-[100%] opacity-100',
			false: ''
		},
		mode: {
			card: '',
			normal: ''
		},
		disabled: {
			true: 'opacity-50',
			false: ''
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
		},
		disabled: {
			true: 'opacity-50',
			false: ''
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

export type CheckBoxesInputTheme = typeof checkBoxesInputTheme;
export type CheckBoxesInputThemeProps = InferComponentTheme<CheckBoxesInputTheme>;
export const setCheckBoxesInputTheme = setComponentTheme<CheckBoxesInputTheme>('checkboxesInput');
export const useCheckBoxesInputTheme = useComponentTheme('checkboxesInput', checkBoxesInputTheme);
