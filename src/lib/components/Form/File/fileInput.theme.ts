import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

const defaultInputContainer = cva({
	base: 'px-2 bg-surface-light border border-surface-muted rounded text-contrast w-full focus-within:ring-1 focus-within:ring-primary  ring-0 transition-all p-1 min-h-32 flex flex-col items-center justify-center cursor-pointer',
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
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
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
	base: 'flex items-center gap-3 p-2 bg-surface-dark',
	variants: {
		size: {
			small: 'p-1 text-sm gap-2',
			medium: 'p-2 text-base gap-3',
			large: 'p-3 text-lg gap-4'
		}
	}
});

export const fileInputTheme = {
	inputContainer: defaultInputContainer,
	placeholder: defaultPlaceholder,
	fileList: defaultFileList,
	file: defaultFile
};

export type FileInputTheme = typeof fileInputTheme;
export type FileInputThemeProps = InferComponentTheme<FileInputTheme>;
export const setFileInputTheme = setComponentTheme<FileInputTheme>('fileInput');
export const useFileInputTheme = useComponentTheme('fileInput', fileInputTheme);
