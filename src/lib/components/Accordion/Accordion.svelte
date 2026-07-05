<script lang="ts" generics="Item extends Record<string, any>">
	import { getters } from 'melt';
	import { Accordion } from 'melt/builders';
	import type { AccordionProps } from './accordion.props.js';
	import { useAccordionTheme } from './accordion.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import { slide, type SlideTransitionParams } from '$lib/transitions/transition.js';
	import { useTheme } from '../Theme/theme.state.svelte.js';
	import { caretDownIcon } from '../Icons/caretDown.js';
	import { plusIcon } from '../Icons/plus.js';
	import { minusIcon } from '../Icons/minus.js';

	let {
		items: itemsWithoutIds = $bindable([]),
		titleKey,
		contentKey,
		descriptionKey,
		oneAtATime = true,
		onToggle: ot,
		variant = 'classic',
		icon = 'math',
		splitted,
		size = 'normal',
		class: className,
		theme,
		actions,
		title,
		description,
		content,
		transitions,
		accessible = true,
		...attachments
	}: AccordionProps<Item> = $props();

	const id = $props.id();
	const classes = $derived(useAccordionTheme(theme));

	const themeState = useTheme();
	const split = $derived(themeState.splitTransition<SlideTransitionParams>(transitions));

	const resolve = (item: Item, key: keyof Item) => {
		return item[key] as any;
	};

	// Prefer the item's own id (stable across reorder/filter), but disambiguate
	// duplicates — melt keys by id, so collisions would toggle items together.
	const items = $derived.by(() => {
		const seen = new Map<string, number>();
		return itemsWithoutIds.map((item, index) => {
			const base = 'id' in item ? String(item.id) : id + '-' + index;
			const n = seen.get(base) ?? 0;
			seen.set(base, n + 1);
			return Object.assign({}, item, { id: n ? `${base}-${n}` : base });
		}) as (Item & { id: string })[];
	});

	let prevOpen: string[] = [];
	const accordion = new Accordion({
		...getters({
			get multiple() {
				return !oneAtATime;
			}
		}),
		onValueChange(value) {
			const next = value == null ? [] : Array.isArray(value) ? value : [value];
			const changed = [...next, ...prevOpen].find(
				(id) => next.includes(id) !== prevOpen.includes(id)
			);
			prevOpen = next;
			if (changed === undefined) return;
			const index = items.findIndex((i) => i.id === changed);
			if (index === -1) return;
			ot?.({ item: itemsWithoutIds[index], index, open: next.includes(changed) });
		}
	});
</script>

{#snippet renderIcon(isOpen: boolean)}
	{#if icon && icon === 'chevron'}
		{@render caretDownIcon({
			class: classes.icon({ variant, size }),
			transform: `rotate(${isOpen ? '180deg' : '0deg'})`
		})}
	{:else if icon && icon === 'math'}
		{@render (isOpen ? minusIcon : plusIcon)({ class: classes.icon({ variant, size }) })}
	{:else if icon}
		<Slot class={classes.icon({ variant, size })} render={icon} />
	{/if}
{/snippet}

<div
	{...accordion.root}
	data-splitted={splitted}
	data-variant={variant}
	data-size={size}
	class={classes.root({ variant, size, splitted, className })}
	{...attachments}
>
	{#each items as accordionItem}
		{@const item = accordion.getItem(accordionItem)}
		<div class={classes.item({ variant, size, splitted, expanded: item.isExpanded })}>
			<button {...item.trigger} class={classes.trigger({ variant, size, splitted })}>
				<div {...item.heading} class={classes.header({ variant, size })}>
					<Slot
						render={title || resolve(accordionItem, titleKey || 'title')}
						class={classes.title({ variant, size })}
						payload={{ item }}
					/>
					<Slot
						render={description || resolve(accordionItem, descriptionKey || 'description')}
						class={classes.description({ variant, size })}
						payload={{ item }}
					/>
				</div>
				{#if icon}
					{@render renderIcon(item.isExpanded)}
				{/if}
			</button>

			{#if item.isExpanded}
				<div
					in:slide={split.in}
					out:slide={split.out}
					{...item.content}
					class={classes.content({ variant, size })}
				>
					<Slot
						render={content || resolve(accordionItem, contentKey || 'content')}
						payload={{ item }}
					/>
				</div>
			{:else if accessible}
				<span class="sr-only">
					<Slot
						render={content || resolve(accordionItem, contentKey || 'content')}
						payload={{ item }}
					/>
				</span>
			{/if}
		</div>
	{/each}
</div>
