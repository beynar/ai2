import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none placeholder:text-foreground-muted autofill:text-foreground-light appearance-none text-sm leading-normal',
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
	base: 'px-3 bg-background-light border border-background-muted rounded text-foreground w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex items-center py-2',
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

const defaultCountryTrigger = cva({
	base: '-ml-3 mr-2 inline-flex h-auto shrink-0 self-stretch rounded-none border-0 bg-clip-border px-3 text-foreground hover:bg-transparent focus-visible:ring-0 focus-visible:text-primary active:translate-y-0 active:bg-transparent',
	variants: {
		size: {
			small: '-my-1.5 gap-1 text-xs',
			normal: '-my-1.5 gap-1.5 text-sm',
			large: '-my-2 gap-1.5 text-sm'
		},
		open: {
			true: 'text-primary',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		open: false
	}
});

const defaultCountryFlag = cva({
	base: 'inline-flex shrink-0 items-center justify-center leading-none',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-sm',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountryDialCode = cva({
	base: 'font-medium tabular-nums',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountryChevron = cva({
	base: 'text-foreground-muted size-3 shrink-0 transition-transform',
	variants: {
		open: {
			true: 'rotate-180 text-primary',
			false: ''
		}
	},
	defaultVariants: {
		open: false
	}
});

const defaultPopover = cva({
	base: 'w-[22rem] max-w-[calc(100vw-2rem)] p-0'
});

const defaultCountryPicker = cva({
	base: 'flex max-h-[calc(100vh-8rem)] flex-col gap-2 overflow-hidden p-2'
});

const defaultCountrySearch = cva({
	base: 'w-full'
});

const defaultCountrySearchInputContainer = cva({
	base: 'bg-background-dark',
	variants: {
		size: {
			small: 'py-1',
			normal: 'py-1',
			large: 'py-1.5'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountrySearchInput = cva({
	base: 'placeholder:text-foreground-muted',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountryList = cva({
	base: 'h-72 max-h-[calc(100vh-14rem)] min-h-0 overflow-hidden'
});

const defaultCountryListbox = cva({
	base: 'flex min-w-full flex-col gap-1'
});

const defaultCountryOption = cva({
	base: 'w-full justify-start gap-2 rounded border-0 bg-clip-border px-2 text-left font-normal shadow-none outline-none focus-visible:ring-0 active:translate-y-0',
	variants: {
		size: {
			small: 'min-h-7 py-1 text-xs',
			normal: 'min-h-7 py-1 text-sm',
			large: 'min-h-8 py-1.5 text-sm'
		},
		highlighted: {
			true: 'bg-background-dark dark:bg-background-light',
			false: ''
		},
		selected: {
			true: 'bg-primary text-primary-contrast hover:bg-primary',
			false: 'text-foreground hover:bg-background-muted'
		}
	},
	defaultVariants: {
		size: 'normal',
		highlighted: false,
		selected: false
	}
});

const defaultCountryName = cva({
	base: 'min-w-0 flex-1 truncate',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountryOptionDialCode = cva({
	base: 'text-foreground-muted ml-auto tabular-nums',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCountryCheck = cva({
	base: 'size-4 shrink-0'
});

const defaultCountryEmpty = cva({
	base: 'text-foreground-muted px-2 py-6 text-center',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const phoneInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	countryTrigger: defaultCountryTrigger,
	countryFlag: defaultCountryFlag,
	countryDialCode: defaultCountryDialCode,
	countryChevron: defaultCountryChevron,
	popover: defaultPopover,
	countryPicker: defaultCountryPicker,
	countrySearch: defaultCountrySearch,
	countrySearchInputContainer: defaultCountrySearchInputContainer,
	countrySearchInput: defaultCountrySearchInput,
	countryList: defaultCountryList,
	countryListbox: defaultCountryListbox,
	countryOption: defaultCountryOption,
	countryName: defaultCountryName,
	countryOptionDialCode: defaultCountryOptionDialCode,
	countryCheck: defaultCountryCheck,
	countryEmpty: defaultCountryEmpty
};

export type PhoneInputTheme = typeof phoneInputTheme;
export type PhoneInputThemeProps = InferComponentTheme<PhoneInputTheme>;
export const setPhoneInputTheme = setComponentTheme<PhoneInputTheme>('phoneInput');
export const usePhoneInputTheme = useComponentTheme('phoneInput', phoneInputTheme);
