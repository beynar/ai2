import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInput = cva({
	base: 'outline-none flex-1 min-w-24 rounded bg-transparent resize-none autofill:text-neutral appearance-none text-sm leading-normal',
	variants: {
		size: {
			small: 'text-xs placeholder:text-xs h-5',
			normal: 'text-sm placeholder:text-sm h-5',
			large: 'text-sm placeholder:text-sm h-6'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultInputContainer = cva({
	base: 'px-3 bg-surface-raised border border-neutral-muted rounded text-neutral w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex flex-wrap items-center justify-start py-2',
	variants: {
		size: {
			small: 'py-1.5 text-xs gap-1',
			normal: 'py-1.5 text-sm gap-1.5',
			large: 'py-2 text-sm gap-1.5'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultTag = cva({
	base: 'inline-flex',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultLoading = cva({
	base: 'text-neutral/60 p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

const defaultError = cva({
	base: 'text-danger-readable p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

const defaultNoOptions = cva({
	base: 'text-neutral/60 p-2 text-sm',
	variants: {
		size: {
			small: 'text-xs p-1.5',
			normal: 'text-sm p-1.5',
			large: 'text-sm p-2'
		}
	}
});

export const tagsInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	tag: defaultTag,
	loading: defaultLoading,
	error: defaultError,
	noOptions: defaultNoOptions
};

export type TagsInputTheme = typeof tagsInputTheme;
export type TagsInputThemeProps = InferComponentTheme<TagsInputTheme>;
export const setTagsInputTheme = setComponentTheme<TagsInputTheme>('tagsInput');
export const useTagsInputTheme = useComponentTheme('tagsInput', tagsInputTheme);
