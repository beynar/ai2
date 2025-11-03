import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultAccordion = cva({
	base: 'grid h-fit',
	variants: {
		size: {
			small: 'data-[splitted="true"]:gap-2',
			normal: 'data-[splitted="true"]:gap-4',
			large: 'data-[splitted="true"]:gap-6'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		},
		splitted: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			splitted: false,
			variant: 'outlined',
			class: 'border border-surface-muted rounded'
		},
		{
			splitted: false,
			variant: 'card',
			class: 'raised rounded'
		}
	]
});

const defaultAccordionItem = cva({
	base: 'w-full isolate relative ',
	variants: {
		size: {
			normal: '',
			small: '',
			large: ''
		},
		variant: {
			classic: 'border-b border-surface-muted last:border-0',
			card: '',
			outlined: ''
		},
		splitted: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			variant: 'outlined',
			splitted: true,
			className: 'border border-surface-muted rounded'
		},
		{
			variant: 'card',
			splitted: true,
			className: 'raised rounded'
		},
		{
			variant: 'classic',
			splitted: true,
			className: ''
		}
	]
});

const defaultAccordionTrigger = cva({
	base: 'cursor-default p-2 transition-all w-full flex items-center gap-2 hover:bg-surface-lighter',
	variants: {
		size: {
			normal: '',
			small: '',
			large: ''
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		},
		splitted: {
			true: 'rounded',
			false: ''
		}
	}
});

const defaultAccordionHeader = cva({
	base: 'flex-1 text-left flex flex-col items-start',
	variants: {
		size: {
			normal: 'gap-0',
			small: 'gap-0.5',
			large: 'gap-1'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionTitle = cva({
	base: 'text-contrast text-base',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionDescription = cva({
	base: 'text-contrast-muted text-sm',
	variants: {
		size: {
			normal: 'text-xs',
			small: 'text-xs',
			large: 'text-sm'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionIcon = cva({
	base: 'size-4 transition-all',
	variants: {
		size: {
			normal: '',
			small: '',
			large: ''
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionContent = cva({
	base: 'p-2 text-sm origin-top w-full',
	variants: {
		size: {
			normal: 'text-sm',
			small: 'text-xs',
			large: 'text-base'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

export const accordionTheme = {
	accordion: defaultAccordion,
	item: defaultAccordionItem,
	header: defaultAccordionHeader,
	trigger: defaultAccordionTrigger,
	title: defaultAccordionTitle,
	description: defaultAccordionDescription,
	icon: defaultAccordionIcon,
	content: defaultAccordionContent
};

export type AccordionTheme = typeof accordionTheme;
export type AccordionThemeProps = InferComponentTheme<AccordionTheme>;
export const setAccordionTheme = setComponentTheme<AccordionTheme>('accordion');
export const useAccordionTheme = useComponentTheme('accordion', accordionTheme);

