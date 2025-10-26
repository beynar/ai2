import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';

export type PasswordInputProps = InputProps<'password'> & {
	placeholder?: string;
	theme?: InferComponentTheme<typeof passwordInputTheme> & InputProps<'password'>['theme'];
};

const defaultInput = cva({
	base: 'py-1 outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none placeholder:text-contrast-muted autofill:text-contrast-light',
	variants: {
		size: {
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-lg'
		}
	}
});

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-contrast focus-within:ring-opacity-50 ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'h-4',
			medium: 'h-6',
			large: 'h-8'
		}
	}
});

const textInputStructure = `
<Field>
    ...otherFieldElements
        <InputParent>
            <Prefix />
            <Input />
            <Suffix />
        </InputParent>
    ...otherFieldElements
</Field>
`;

export const passwordInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer
};
