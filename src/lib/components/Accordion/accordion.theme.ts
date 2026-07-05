import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

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
			class: 'border border-background-muted rounded'
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
			classic: 'border-b border-background-muted last:border-0',
			card: '',
			outlined: ''
		},
		splitted: {
			true: '',
			false: ''
		},
		expanded: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			variant: 'outlined',
			splitted: true,
			className: 'border border-background-muted rounded'
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
	base: 'group/accordion-trigger cursor-pointer py-2.5 transition-all w-full flex items-center gap-2 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/50',
	variants: {
		size: {
			normal: '',
			small: 'py-2',
			large: 'py-3'
		},
		variant: {
			// Nova default: flush trigger, no hover background — the title underlines on hover.
			classic: 'px-0',
			card: 'px-2 hover:bg-background-lighter',
			outlined: 'px-2 hover:bg-background-lighter'
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
	base: 'text-foreground font-medium',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		variant: {
			classic: 'group-hover/accordion-trigger:underline',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionDescription = cva({
	base: 'text-foreground-muted text-sm',
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
	base: 'transition-all text-foreground-muted shrink-0',
	variants: {
		size: {
			small: 'size-3',
			normal: 'size-4',
			large: 'size-5'
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		}
	}
});

const defaultAccordionContent = cva({
	base: 'pt-0 pb-2.5 origin-top w-full',
	variants: {
		size: {
			normal: 'text-sm',
			small: 'text-xs',
			large: 'text-base'
		},
		variant: {
			// Nova default: content flush with the trigger text.
			classic: 'px-0',
			card: 'px-2',
			outlined: 'px-2'
		}
	}
});

export const accordionTheme = {
	root: defaultAccordion,
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
export const useAccordionTheme = useComponentTheme<AccordionTheme>('accordion', accordionTheme);
