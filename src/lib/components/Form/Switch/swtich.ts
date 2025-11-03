import type { InputProps } from '../Field/field.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

export type SwitchInputProps = InputProps<'switch'> & {
	theme?: InferComponentTheme<typeof switchInputTheme> & InputProps<'switch'>['theme'];
};

const defaultSwitchToggle = cva({
	base: 'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked=false]:bg-surface-lighter',
	variants: {
		checked: {
			true: 'bg-contrast',
			false: 'bg-surface-lighter'
		},
		size: {
			small: 'h-[20px] w-[36px]',
			medium: 'h-[24px] w-[44px]',
			large: 'h-[28px] w-[52px]'
		}
	}
});

const defaultSwitchThumb = cva({
	base: 'pointer-events-none block rounded-full bg-surface shadow-lg ring-0 transition-transform',
	variants: {
		checked: {
			true: 'translate-x-5',
			false: 'translate-x-0'
		},
		size: {
			small: 'h-4 w-4 data-[checked=true]:translate-x-4',
			medium: 'h-5 w-5 data-[checked=true]:translate-x-5',
			large: 'h-6 w-6 data-[checked=true]:translate-x-6'
		}
	}
});

const defaultSwitchInputContainer = cva({
	base: 'flex items-center gap-4 justify-start select-none px-0',
	variants: {
		size: {
			small: 'gap-2',
			medium: 'gap-4',
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
