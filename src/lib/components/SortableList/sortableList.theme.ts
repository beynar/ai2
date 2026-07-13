import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

// The root <ul>: a vertical stack whose gap scales with the size token.
const defaultRoot = cva({
	base: 'm-0 flex list-none flex-col p-0',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

// The <li> row. In full-row mode the whole row is the drag activator (grab cursor, no text
// selection); in handle mode the row stays selectable and only the grip drags. `dragging`
// lifts the row while it is being moved.
const defaultItem = cva({
	base: 'border-background-muted bg-background text-foreground relative flex items-center rounded-xl border outline-none transition-[box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-primary/50',
	variants: {
		size: {
			small: 'gap-2 p-2 text-sm',
			normal: 'gap-3 p-3 text-base',
			large: 'gap-4 p-4 text-lg'
		},
		handle: {
			true: '',
			false: 'cursor-grab touch-none select-none active:cursor-grabbing'
		},
		dragging: {
			true: 'raised z-10 opacity-95',
			false: ''
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	compoundVariants: [
		// A disabled row never shows the grab cursor, even in full-row mode.
		{ disabled: true, handle: false, class: 'cursor-not-allowed active:cursor-not-allowed' }
	],
	defaultVariants: {
		size: 'normal',
		handle: false,
		dragging: false,
		disabled: false
	}
});

// The row content region wrapping the `item` snippet (or the default label).
const defaultContent = cva({
	base: 'min-w-0 flex-1'
});

// The grip handle button rendered in handle mode; its content is the `handle` snippet.
const defaultHandle = cva({
	base: 'text-foreground-muted hover:text-foreground inline-flex shrink-0 cursor-grab touch-none items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50 active:cursor-grabbing disabled:pointer-events-none disabled:cursor-not-allowed',
	variants: {
		size: {
			small: 'size-6',
			normal: 'size-7',
			large: 'size-8'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const sortableListTheme = {
	root: defaultRoot,
	item: defaultItem,
	content: defaultContent,
	handle: defaultHandle
};

export type SortableListTheme = typeof sortableListTheme;
export type SortableListThemeProps = InferComponentTheme<SortableListTheme>;
/** The resolved per-part class builders returned by `useSortableListTheme`. */
export type SortableListClasses = ReturnType<typeof useSortableListTheme>;
export const setSortableListTheme = setComponentTheme<SortableListTheme>('sortableList');
export const useSortableListTheme = useComponentTheme('sortableList', sortableListTheme);
