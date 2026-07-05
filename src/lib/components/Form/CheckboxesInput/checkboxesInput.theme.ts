import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultCheckboxesInput = cva({
	base: 'grid gap-3 ',
	variants: {
		mode: {
			card: '',
			normal: ''
		}
	}
});

const defaultCheckboxesInputItem = cva({
	base: 'transition-all relative grid items-start min-h-10  gap-1 pl-12 cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-left rounded',
	variants: {
		mode: {
			card: 'rounded bg-background-light raised py-2',
			normal: 'py-1'
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

const defaultCheckboxesInputItemLabel = cva({
	base: 'flex items-center gap-4 flex-wrap text-sm'
});

const defaultCheckboxesInputItemTrack = cva({
	base: 'size-5 origin-center content-[""] bg-background-light border border-background-muted rounded absolute left-2',
	variants: {
		checked: {
			true: '',
			false: ''
		},
		mode: {
			card: 'top-2',
			normal: 'top-1'
		},
		disabled: {
			true: 'opacity-50',
			false: ''
		}
	}
});

const defaultCheckboxesInputItemThumb = cva({
	base: `size-5 origin-center radio bg-foreground rounded flex items-center justify-center transition-all content-[""] absolute left-2 scale-[85%] opacity-0 
	stroke-background [&>svg]:fill-background p-1
	`,
	variants: {
		checked: {
			true: 'bg-primary scale-[100%] opacity-100',
			false: ''
		},
		mode: {
			card: 'top-2',
			normal: 'top-1'
		},
		disabled: {
			true: 'opacity-50',
			false: ''
		}
	}
});

const defaultCheckboxesInputItemIcon = cva({
	base: ''
});

const defaultCheckboxesInputItemDescription = cva({
	base: 'text-xs text-foreground-muted'
});

const defaultCheckboxesInputContainer = cva({
	base: 'grid gap-3 grid-cols-1 items-start',
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

export const checkboxesInputTheme = {
	root: defaultCheckboxesInput,
	checkboxesInputItem: defaultCheckboxesInputItem,
	checkboxesInputItemLabel: defaultCheckboxesInputItemLabel,
	checkboxesInputItemTrack: defaultCheckboxesInputItemTrack,
	checkboxesInputItemThumb: defaultCheckboxesInputItemThumb,
	checkboxesInputItemIcon: defaultCheckboxesInputItemIcon,
	checkboxesInputItemDescription: defaultCheckboxesInputItemDescription,
	checkboxesInputContainer: defaultCheckboxesInputContainer
};

export type CheckboxesInputTheme = typeof checkboxesInputTheme;
export type CheckboxesInputThemeProps = InferComponentTheme<CheckboxesInputTheme>;
export const setCheckboxesInputTheme = setComponentTheme<CheckboxesInputTheme>('checkboxes-input');
export const useCheckboxesInputTheme = useComponentTheme<CheckboxesInputTheme>(
	'checkboxes-input',
	checkboxesInputTheme
);
