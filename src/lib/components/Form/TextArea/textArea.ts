import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { FieldState } from '../Field/fieldState.svelte.js';

export type TextAreaProps = InputProps<'text'> & {
	placeholder?: string;
	theme?: InferComponentTheme<typeof textAreaTheme> & InputProps<'text'>['theme'];
	rows?: number;
	maxLength?: number;
	onPressEnter?: (field: FieldState<'text'>) => void;
};

const defaultTextArea = cva({
	base: 'py-1 outline-none flex-1 h-full w-full rounded bg-transparent leading-3 text-sm resize-none placeholder:text-contrast-muted autofill:text-contrast-light',
	variants: {
		size: {
			small: 'text-sm',
			medium: 'text-base',
			large: 'text-lg'
		}
	}
});

const defaultTextAreaContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-lighter rounded text-contrast-light w-full focus-within:ring-1 focus-within:ring-contrast focus-within:ring-opacity-50 ring-0 transition-all p-1',
	variants: {
		size: {
			small: 'h-4',
			medium: 'h-6',
			large: 'h-8'
		}
	}
});

const textAreaStructure = `
<Field>
    ...otherFieldElements
        <InputParent>
            <Prefix />
            <TextArea />
            <Suffix />
        </InputParent>
    ...otherFieldElements
</Field>
`;

export const textAreaTheme = {
	input: defaultTextArea,
	inputContainer: defaultTextAreaContainer
};
