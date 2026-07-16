import type { HTMLAttributes } from 'svelte/elements';

export type LayoutRootAttributes<Element extends HTMLElement = HTMLElement> = Partial<
	Pick<
		HTMLAttributes<Element>,
		| 'id'
		| 'role'
		| 'style'
		| 'title'
		| 'hidden'
		| 'tabindex'
		| 'dir'
		| 'lang'
		| 'draggable'
		| 'aria-label'
		| 'aria-labelledby'
		| 'aria-describedby'
	>
> & {
	[dataAttribute: `data-${string}`]: string | number | boolean | null | undefined;
};
