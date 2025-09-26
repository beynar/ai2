import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';

export type NumberInputProps = InputProps<'number'> & {
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	theme?: InferComponentTheme<typeof numberInputTheme> & InputProps<'number'>['theme'];
};

const defaultInput = cva({
	base: 'py-1 outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none placeholder:text-contrast-muted autofill:text-contrast-muted',
	variants: {
		size: {
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-lg'
		}
	}
});

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast-light w-full focus-within:ring-1 focus-within:ring-contrast focus-within:ring-opacity-50 ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'h-4',
			medium: 'h-6',
			large: 'h-8'
		}
	}
});

const numberInputStructure = `
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

export const numberInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer
};
