import { cva } from 'cva';
import type { InputProps } from '../Field/field.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { Snippet } from 'svelte';

export type FileInputMode = 'single' | 'multiple';
export type FileInputType<Mode extends FileInputMode> = Mode extends 'multiple' ? 'files' : 'file';
export type FileInputValue<Mode extends FileInputMode> = Mode extends 'single' ? File | null : File[] | null;

export type FileInputProps<Mode extends FileInputMode = 'single'> = Omit<
	InputProps<FileInputType<Mode>>,
	'value' | 'placeholder'
> & {
	mode?: Mode;
	value?: FileInputValue<Mode>;
	onChange?: (value: FileInputValue<Mode>) => void;
	types?: string[];
	maxFiles?: number;
	clickable?: boolean;
	maxSize?: number;
	placeholder?: string;
	// Slot props
	fileList?: Snippet<[any]>;
	fileListClass?: string;
	fileListProps?: Record<string, any>;
	file?: Snippet<[any]>;
	fileClass?: string;
	fileProps?: Record<string, any>;
	placeholderClass?: string;
	theme?: InferComponentTheme<typeof fileInputTheme> & InputProps<FileInputType<Mode>>['theme'];
};

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-contrast focus-within:ring-opacity-50 ring-0 transition-all p-1 min-h-32 flex flex-col items-center justify-center cursor-pointer',
	variants: {
		size: {
			small: 'min-h-24',
			medium: 'min-h-32',
			large: 'min-h-40'
		},
		state: {
			idle: '',
			potential: 'border-contrast/50',
			valid: 'border-success bg-success/5',
			invalid: 'border-danger bg-danger/5'
		}
	}
});

const defaultPlaceholder = cva({
	base: 'flex flex-col items-center justify-center gap-2 text-contrast-muted',
	variants: {
		size: {
			small: 'text-sm gap-1',
			medium: 'text-base gap-2',
			large: 'text-lg gap-3'
		}
	}
});

const defaultFileList = cva({
	base: 'w-full flex flex-col gap-2 mt-2',
	variants: {
		size: {
			small: 'gap-1',
			medium: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFile = cva({
	base: 'flex items-center gap-3 p-2 bg-surface-lighter rounded border border-surface-muted',
	variants: {
		size: {
			small: 'p-1 text-sm gap-2',
			medium: 'p-2 text-base gap-3',
			large: 'p-3 text-lg gap-4'
		}
	}
});

const fileInputStructure = `
<Field>
    ...otherFieldElements
        <InputContainer data-state={state}>
            <HiddenInput />
            <Placeholder />
            <FileList>
                <File />
            </FileList>
        </InputContainer>
    ...otherFieldElements
</Field>
`;

export const fileInputTheme = {
	inputContainer: defaultInputContainer,
	placeholder: defaultPlaceholder,
	fileList: defaultFileList,
	file: defaultFile
};
