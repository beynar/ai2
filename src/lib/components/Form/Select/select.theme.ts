import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInput = cva({
	base: 'outline-none flex w-full flex-1 cursor-pointer items-center justify-between gap-1.5 rounded bg-transparent text-left leading-normal select-none',
	variants: {
		size: {
			small: 'text-xs h-5',
			normal: 'text-sm h-5',
			large: 'text-sm h-6'
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

const defaultInputContainer = cva({
	base: 'px-3 bg-surface-raised border border-neutral-muted rounded text-neutral w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex items-center py-2',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-1.5 text-sm',
			large: 'py-2 text-sm'
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

const defaultValue = cva({
	base: 'line-clamp-1 flex-1 text-left',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		placeholder: {
			true: 'text-neutral/60',
			false: 'text-neutral'
		}
	},
	defaultVariants: {
		size: 'normal',
		placeholder: false
	}
});

const defaultTriggerIcon = cva({
	base: 'text-neutral/60 pointer-events-none shrink-0',
	variants: {
		size: {
			small: 'size-3.5',
			normal: 'size-4',
			large: 'size-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultContent = cva({
	base: 'flex flex-col',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

const defaultGroup = cva({
	base: 'flex scroll-my-1 flex-col p-1',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

const defaultGroupLabel = cva({
	base: 'text-neutral/60',
	variants: {
		size: {
			small: 'px-1.5 py-1 text-[0.6875rem]',
			normal: 'px-1.5 py-1 text-xs',
			large: 'px-1.5 py-1 text-xs'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultSeparator = cva({
	// Flush (not `-mx-1`): the separator sits directly in the scroll content with no padding to
	// bleed into, so a negative margin would overflow the viewport and trigger a spurious X bar.
	base: 'bg-neutral-muted my-1 h-px',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const selectTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	value: defaultValue,
	triggerIcon: defaultTriggerIcon,
	content: defaultContent,
	group: defaultGroup,
	groupLabel: defaultGroupLabel,
	separator: defaultSeparator
};

export type SelectTheme = typeof selectTheme;
export type SelectThemeProps = InferComponentTheme<SelectTheme>;
export const setSelectTheme = setComponentTheme<SelectTheme>('select');
export const useSelectTheme = useComponentTheme('select', selectTheme);
