import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';

export type SwitchInputProps = InputProps<'switch'> & {
	theme?: InferComponentTheme<typeof switchInputTheme> & InputProps<'switch'>['theme'];
};

const defaultSwitchToggle = cva({
	base: 'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-contrast focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-md',
	variants: {
		checked: {
			true: 'bg-contrast border-surface-muted shadow-sm',
			false: 'bg-surface-lighter border-surface-muted hover:bg-surface-light'
		},
		size: {
			small: 'h-[20px] w-[36px]',
			normal: 'h-[24px] w-[44px]',
			large: 'h-[28px] w-[52px]'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50 hover:shadow-none',
			false: ''
		}
	}
});

const defaultSwitchThumb = cva({
	base: 'pointer-events-none block rounded-full shadow-lg ring-0 transition-all duration-200 ease-in-out transform',
	variants: {
		checked: {
			true: '',
			false: ''
		},
		size: {
			small: 'h-4 w-4',
			normal: 'h-5 w-5',
			large: 'h-6 w-6'
		}
	},
	compoundVariants: [
		// Small size translations
		{
			size: 'small',
			checked: false,
			class: 'translate-x-0 bg-surface'
		},
		{
			size: 'small',
			checked: true,
			class: 'translate-x-4 bg-surface'
		},
		// Normal size translations
		{
			size: 'normal',
			checked: false,
			class: 'translate-x-0 bg-surface'
		},
		{
			size: 'normal',
			checked: true,
			class: 'translate-x-5 bg-surface'
		},
		// Large size translations
		{
			size: 'large',
			checked: false,
			class: 'translate-x-0 bg-surface'
		},
		{
			size: 'large',
			checked: true,
			class: 'translate-x-6 bg-surface'
		}
	]
});

const defaultSwitchInputContainer = cva({
	base: 'flex items-center gap-4 justify-start select-none px-0',
	variants: {
		size: {
			small: 'gap-2',
			normal: 'gap-4',
			large: 'gap-6'
		}
	}
});

const switchInputStructure = `
<Field>
    ...otherFieldElements
        <InputParent>
            <SwitchToggle>
                <SwitchThumb />
            </SwitchToggle>
            <Label />
        </InputParent>
    ...otherFieldElements
</Field>
`;

export const switchInputTheme = {
	toggle: defaultSwitchToggle,
	thumb: defaultSwitchThumb,
	inputContainer: defaultSwitchInputContainer
};
