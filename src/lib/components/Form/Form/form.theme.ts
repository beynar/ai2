import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultForm = cva({
	base: `grid gap-y-4 gap-x-2 grid-cols-2 [&>*:not(.col-span-1)]:col-span-2`,
	variants: {
		variant: {
			plain: '',
			sectioned: '',
			card: ''
		},
		layout: {
			vertical: '',
			horizontal: 'grid-cols-1 [&>*]:!col-span-1'
		},
		density: {
			small: `gap-3`,
			normal: `gap-4`,
			large: `gap-6`
		}
	},
	defaultVariants: {
		variant: 'plain',
		layout: 'vertical',
		density: 'normal'
	},
	compoundVariants: [
		{ variant: 'card', density: 'small', class: 'px-3' },
		{ variant: 'card', density: 'normal', class: 'px-4' },
		{ variant: 'card', density: 'large', class: 'px-6' }
	]
});

const defaultFormHeader = cva({
	base: 'flex flex-col',
	variants: {
		variant: {
			plain: 'px-0',
			sectioned: 'px-0',
			card: ''
		},
		density: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		variant: 'plain',
		density: 'normal'
	},
	compoundVariants: [
		{ variant: 'card', density: 'small', class: '-mx-3' },
		{ variant: 'card', density: 'normal', class: '-mx-4' },
		{ variant: 'card', density: 'large', class: '-mx-6' }
	]
});

const defaultFormTitle = cva({
	base: '',
	variants: {
		variant: {
			plain: 'text-neutral',
			sectioned: 'text-neutral',
			card: ''
		},
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		variant: 'plain',
		size: 'normal'
	}
});

const defaultFormDescription = cva({
	base: '',
	variants: {
		variant: {
			plain: 'text-neutral/60',
			sectioned: 'text-neutral/60',
			card: ''
		},
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		variant: 'plain',
		size: 'normal'
	}
});

const defaultFormGroup = cva({
	base: 'm-0 min-w-0 border-0 bg-transparent p-0',
	variants: {
		density: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

const defaultFormGroupLabel = cva({
	base: 'text-neutral',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFormGroupDescription = cva({
	base: 'mt-1 text-neutral/60',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFormGroupFields = cva({
	base: 'grid grid-cols-1',
	variants: {
		layout: {
			vertical: '',
			horizontal: ''
		},
		columns: {
			1: 'md:grid-cols-1',
			2: 'md:grid-cols-2',
			3: 'md:grid-cols-3',
			4: 'md:grid-cols-4'
		},
		density: {
			small: 'mt-2 gap-1',
			normal: 'mt-3 gap-2',
			large: 'mt-4 gap-3'
		}
	},
	defaultVariants: {
		layout: 'vertical',
		columns: 2,
		density: 'normal'
	}
});

const defaultFormItem = cva({
	base: 'border-t border-neutral-muted',
	variants: {
		variant: {
			sectioned: '',
			card: ''
		},
		density: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		variant: 'sectioned',
		density: 'normal'
	},
	compoundVariants: [
		{ variant: 'sectioned', density: 'small', class: 'pt-3' },
		{ variant: 'sectioned', density: 'normal', class: 'pt-4' },
		{ variant: 'sectioned', density: 'large', class: 'pt-6' },
		{ variant: 'card', density: 'small', class: '-mx-3 px-3 pt-3' },
		{ variant: 'card', density: 'normal', class: '-mx-4 px-4 pt-4' },
		{ variant: 'card', density: 'large', class: '-mx-6 px-6 pt-6' }
	]
});

const defaultFormActions = cva({
	base: 'flex w-full flex-wrap',
	variants: {
		alignment: {
			start: 'justify-start',
			end: 'justify-end'
		},
		density: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	},
	defaultVariants: {
		alignment: 'end'
	}
});

const defaultFormAction = cva({
	base: 'min-w-0'
});

const defaultFormCustom = cva({
	base: 'min-w-0'
});

const defaultFormFooter = cva({
	base: 'grid',
	variants: {
		variant: {
			plain: 'px-0',
			sectioned: 'px-0',
			card: ''
		},
		density: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		variant: 'plain',
		density: 'normal'
	},
	compoundVariants: [
		{ variant: 'card', density: 'small', class: '-mx-3' },
		{ variant: 'card', density: 'normal', class: '-mx-4' },
		{ variant: 'card', density: 'large', class: '-mx-6' }
	]
});

export const formTheme = {
	root: defaultForm,
	formHeader: defaultFormHeader,
	formTitle: defaultFormTitle,
	formDescription: defaultFormDescription,
	formGroup: defaultFormGroup,
	formGroupLabel: defaultFormGroupLabel,
	formGroupDescription: defaultFormGroupDescription,
	formGroupFields: defaultFormGroupFields,
	formItem: defaultFormItem,
	formAction: defaultFormAction,
	formActions: defaultFormActions,
	formCustom: defaultFormCustom,
	formFooter: defaultFormFooter
};

export type FormTheme = typeof formTheme;
export type FormThemeProps = InferComponentTheme<FormTheme>;
export const setFormTheme = setComponentTheme<FormTheme>('form');
export const useFormTheme = useComponentTheme<FormTheme>('form', formTheme);
