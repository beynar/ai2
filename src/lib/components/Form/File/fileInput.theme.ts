import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInputContainer = cva({
	base: 'px-3 py-2 bg-surface-raised border border-neutral-muted rounded text-neutral w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all min-h-32 flex flex-col items-center justify-center cursor-pointer',
	variants: {
		size: {
			small: 'min-h-24',
			normal: 'min-h-32',
			large: 'min-h-40'
		},
		state: {
			idle: '',
			potential: 'border-neutral/50',
			valid: 'border-success bg-success/5',
			invalid: 'border-danger bg-danger/5'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultPlaceholder = cva({
	base: 'flex flex-col items-center justify-center gap-2 text-neutral/60',
	variants: {
		size: {
			small: 'text-xs gap-1',
			normal: 'text-sm gap-2',
			large: 'text-base gap-3'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultFileList = cva({
	base: 'w-full flex flex-col gap-2 mt-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultFile = cva({
	base: 'flex items-center gap-3 p-2 bg-surface-canvas',
	variants: {
		size: {
			small: 'p-1 text-xs gap-2',
			normal: 'p-2 text-sm gap-3',
			large: 'p-3 text-base gap-4'
		}
	},
	defaultVariants: {
		size: 'normal'
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
