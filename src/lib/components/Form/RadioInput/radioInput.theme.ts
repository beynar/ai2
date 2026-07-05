import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

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
	base: 'transition-all relative grid items-start min-h-10  gap-1 pl-12 cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-left rounded',
	variants: {
		mode: {
			card: 'rounded bg-background-light raised py-2 ',
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

const defaultRadioInputItemLabel = cva({
	base: 'flex items-center gap-4 flex-wrap text-sm'
});

const defaultRadioInputItemTrack = cva({
	base: 'size-5 origin-center content-[""] bg-background-light border border-background-muted rounded-full absolute left-2',
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

const defaultRadioInputItemThumb = cva({
	base: 'size-5 origin-center radio bg-foreground rounded-full transition-all content-[""] absolute left-2 scale-[40%] opacity-0',
	variants: {
		checked: {
			true: 'bg-primary scale-[60%] opacity-100',
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

const defaultRadioInputItemIcon = cva({
	base: ''
});

const defaultRadioInputItemDescription = cva({
	base: 'text-xs text-foreground-muted'
});

const defaultRadioInputContainer = cva({
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

export const radioInputTheme = {
	root: defaultRadioInput,
	radiosInputItem: defaultRadioInputItem,
	radiosInputItemLabel: defaultRadioInputItemLabel,
	radiosInputItemTrack: defaultRadioInputItemTrack,
	radiosInputItemThumb: defaultRadioInputItemThumb,
	radiosInputItemIcon: defaultRadioInputItemIcon,
	radiosInputItemDescription: defaultRadioInputItemDescription,
	radiosInputContainer: defaultRadioInputContainer
};

export type RadioInputTheme = typeof radioInputTheme;
export type RadioInputThemeProps = InferComponentTheme<RadioInputTheme>;
export const setRadioInputTheme = setComponentTheme<RadioInputTheme>('radio-input');
export const useRadioInputTheme = useComponentTheme<RadioInputTheme>(
	'radio-input',
	radioInputTheme
);
