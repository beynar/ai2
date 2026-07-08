import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInputContainer = cva({
	base: 'flex flex-col w-full',
	variants: {
		size: {
			small: 'gap-1.5',
			normal: 'gap-2',
			large: 'gap-2.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultRow = cva({
	base: 'flex items-center w-full',
	variants: {
		size: {
			small: 'gap-1.5',
			normal: 'gap-2',
			large: 'gap-2.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultInput = cva({
	base: 'flex-1 min-w-0 px-3 bg-background-light border border-background-muted rounded text-foreground outline-none appearance-none autofill:text-foreground-light focus:ring-1 focus:ring-primary ring-0 transition-all',
	variants: {
		size: {
			small: 'py-1.5 text-xs placeholder:text-xs',
			normal: 'py-2 text-sm placeholder:text-sm',
			large: 'py-2.5 text-base placeholder:text-base'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultRemoveButton = cva({
	base: 'flex items-center justify-center flex-shrink-0 rounded text-foreground-muted bg-transparent hover:text-danger hover:bg-danger-muted outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all',
	variants: {
		size: {
			small: 'size-7',
			normal: 'size-8',
			large: 'size-9'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultAddButton = cva({
	base: 'flex items-center justify-center gap-1.5 w-full px-3 border border-dashed border-background-muted rounded text-foreground-light bg-transparent hover:bg-background-light hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-2 text-sm',
			large: 'py-2.5 text-base'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

export const keyValueInputTheme = {
	inputContainer: defaultInputContainer,
	row: defaultRow,
	input: defaultInput,
	removeButton: defaultRemoveButton,
	addButton: defaultAddButton
};

export type KeyValueInputTheme = typeof keyValueInputTheme;
export type KeyValueInputThemeProps = InferComponentTheme<KeyValueInputTheme>;
export const setKeyValueInputTheme = setComponentTheme<KeyValueInputTheme>('keyValueInput');
export const useKeyValueInputTheme = useComponentTheme('keyValueInput', keyValueInputTheme);
