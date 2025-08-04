import type { Sizes } from '../../types/index.js';
import type { Slot, WithSlot } from '../Slot/slot.js';
import type { SlideTransitionProps } from '$lib/transitions/transition.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ConditionalKeys<Base, Condition> = NonNullable<
	{
		[Key in keyof Base]: Base[Key] extends Condition ? Key : never;
	}[keyof Base]
>;

export type AccordionProps<Item extends Record<string, any>> = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name to apply to the accordion. First element appended into the DOM.
			 */
			class?: string;
			/**
			 * The items to display in the accordion. An array of anything.
			 */
			items: Item[];
			/**
			 * The function to call when the accordion item is toggled. Receives the item, index and isOpen state.
			 */
			onToggle?: (otps: { item: Item; index: number; isOpen: boolean }) => void;
			/**
			 * Whether the accordion should only allow one item to be open at a time.
			 */
			oneAtATime?: boolean;
			/**
			 * The key to use to get the title from the item. By default, the accordion will use the 'title' property of the item.
			 * Usefull if the title is a string but you can pass a slot to display a custom title.
			 */
			titleKey?: ConditionalKeys<Item, Slot>;
			/**
			 * The key to use to get the content from the item. By default, the accordion will use the 'content' property of the item.
			 * Usefull if the content is a string but you can pass a slot to display a custom content.
			 */
			contentKey?: ConditionalKeys<Item, Slot>;
			/**
			 * The key to use to get the description from the item. By default, the accordion will use the 'description' property of the item.
			 * Usefull if the description is a string but you can pass a slot to display a custom description.
			 */
			descriptionKey?: ConditionalKeys<Item, Slot>;
			/**
			 * Whether the accordion items should be glued together or separated by a gap.
			 */
			splitted?: boolean;
			/**
			 * The icon to use to display the accordion item. Can be a "math" icon, a "chevron" icon or a slot. Pass false to hide the icon.
			 */
			icon?: 'math' | 'chevron' | Slot;
			/**
			 * The size of the accordion.
			 */
			size?: Sizes;
			/**
			 * The variant of the accordion.
			 */
			variant?: 'classic' | 'card' | 'outlined';
			/**
			 * The transitions of the accordion.
			 */
			transitions?: SlideTransitionProps;
			theme?: InferComponentTheme<typeof accordionTheme>;
		},
		'actions' | 'icon' | 'title' | 'description' | 'content',
		Item
	>
>;

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
			classic: 'border-b border-surface-lighter last:border-0',
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

export const accordionStructure = `
<Accordion>
	<AccordionItem>
		<AccordionTrigger>
			<AccordionHeader>
				<AccordionTitle />
				<AccordionDescription />
			</AccordionHeader>
			<AccordionIcon />
		</AccordionTrigger>
		<AccordionContent/>
	</AccordionItem>
</Accordion>
`;

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
