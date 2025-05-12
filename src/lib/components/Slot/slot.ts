import { type Snippet } from 'svelte';

export type SnippetSlot<Payload extends Record<string, any> | undefined = undefined> = Snippet<
	Payload extends undefined ? [{ payload: Payload } & any] : [any]
>;
export type Slot<Payload extends Record<string, any> | undefined = undefined> =
	| string
	| SnippetSlot<Payload>;

export type WithSlot<
	Props,
	Name extends string,
	Payload extends Record<string, any> | undefined = undefined
> = Props & {
	[P in Name | `${Name}Props`]?: P extends `${Name}Props` ? Record<string, any> : Slot<Payload>;
};

export function isSnippet(component_fn: any) {
	return component_fn.length === 1;
}
