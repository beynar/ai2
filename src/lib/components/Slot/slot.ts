import { type Snippet } from 'svelte';

export type SnippetSlot<Payload extends any | undefined = undefined> = Payload extends undefined
	? Snippet
	: Snippet<[Payload]>;
export type Slot<Payload extends any | undefined = undefined> = string | SnippetSlot<Payload>;

export type WithSlot<
	Props,
	Name extends string,
	Payload extends any | undefined = undefined
> = Props & {
	[P in Name]?: Slot<Payload>;
};

export function isSnippet(component_fn: any) {
	return component_fn.length === 1;
}
