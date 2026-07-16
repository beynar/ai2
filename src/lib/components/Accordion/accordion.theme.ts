import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// The default (classic) variant is the nova/shadcn look: flat rows separated by
// a muted border, a plain trigger whose title underlines on hover, a small muted
// chevron, quiet content. `card` wraps the list in a raised surface, `outlined`
// in a muted border; `splitted` breaks the list into one surface per item.
// `size` scales typography (title/description/content text, icon) only;
// `density` owns paddings and gaps.
const defaultAccordion = cva({
	base: 'w-full h-fit',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		density: {
			small: '',
			normal: '',
			large: ''
		},
		variant: {
			classic: '',
			card: '',
			outlined: ''
		},
		splitted: {
			true: 'flex flex-col',
			false: ''
		}
	},
	compoundVariants: [
		// One container surface holding all rows (same surface as the Card component).
		{ variant: 'card', splitted: false, class: 'raised rounded-lg bg-background-light' },
		{ variant: 'outlined', splitted: false, class: 'rounded-lg border border-background-muted' },
		// Gap between the per-item surfaces.
		{ splitted: true, density: 'small', class: 'gap-2' },
		{ splitted: true, density: 'normal', class: 'gap-3' },
		{ splitted: true, density: 'large', class: 'gap-4' }
	],
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		variant: 'classic',
		splitted: false
	}
});

const defaultAccordionItem = cva({
	base: 'w-full isolate relative',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		density: {
			small: '',
			normal: '',
			large: ''
		},
		variant: {
			classic: '',
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
		// Shared container (any variant): muted separator between rows.
		{ splitted: false, class: 'border-b border-background-muted last:border-b-0' },
		// One surface per item.
		{ variant: 'classic', splitted: true, class: 'border-b border-background-muted' },
		{ variant: 'card', splitted: true, class: 'raised rounded-lg bg-background-light' },
		{ variant: 'outlined', splitted: true, class: 'rounded-lg border border-background-muted' }
	],
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		variant: 'classic',
		splitted: false,
		expanded: false
	}
});

const defaultAccordionTrigger = cva({
	// items-start + the icon wrapper's slight downward nudge keep the chevron
	// aligned to the first title line when titles wrap or a description exists.
	base: 'group/accordion-trigger cursor-pointer w-full flex items-start justify-between gap-4 text-left transition-all outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		density: {
			small: 'py-2',
			normal: 'py-2.5',
			large: 'py-3.5'
		},
		variant: {
			classic: '',
			// Contained surfaces inset their rows (variant chrome, not density).
			card: 'px-4',
			outlined: 'px-4'
		}
	},
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		variant: 'classic'
	}
});

const defaultAccordionHeader = cva({
	base: 'flex-1 flex flex-col items-start',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		density: {
			small: 'gap-0',
			normal: 'gap-0.5',
			large: 'gap-1'
		}
	},
	defaultVariants: {
		size: 'normal',
		density: 'normal'
	}
});

const defaultAccordionTitle = cva({
	base: 'text-foreground font-medium group-hover/accordion-trigger:underline',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultAccordionDescription = cva({
	base: 'text-foreground-muted',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-xs',
			large: 'text-sm'
		}
	}
});

// Layout (shrink/nudge) and open-state rotation live on the span wrapper in the
// component — this part only styles the glyph itself.
const defaultAccordionIcon = cva({
	base: 'text-foreground-muted block',
	variants: {
		size: {
			small: 'size-3.5',
			normal: 'size-4',
			large: 'size-5'
		}
	}
});

const defaultAccordionContent = cva({
	base: 'pt-0 origin-top w-full',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		density: {
			small: 'pb-2',
			normal: 'pb-2.5',
			large: 'pb-3.5'
		},
		variant: {
			classic: '',
			card: 'px-4',
			outlined: 'px-4'
		}
	},
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		variant: 'classic'
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
