import type { Sizes } from '../../types/index.js';
import type { Slot, WithSlot } from '../Slot/slot.js';
import type { SlideTransitionProps } from '$lib/transitions/transition.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AccordionThemeProps } from './accordion.theme.js';

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
			theme?: AccordionThemeProps;
		},
		'actions' | 'icon' | 'title' | 'description' | 'content',
		Item
	>
>;

