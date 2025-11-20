<script lang="ts" generics="Item extends Record<string, any>">
	import { getters } from 'melt';
	import { Accordion } from 'melt/builders';
	import type { AccordionProps } from './accordion.props.js';
	import { useAccordionTheme } from './accordion.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import { slide } from 'svelte/transition';
	import { caretDownIcon } from '../Icons/caretDown.js';
	import { plusIcon } from '../Icons/plus.js';
	import { minusIcon } from '../Icons/minus.js';

	let {
		items = $bindable([]),
		titleKey,
		contentKey,
		descriptionKey,
		oneAtATime = true,
		onToggle: ot,
		variant = 'classic',
		icon = 'math',
		splitted,
		size,
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

	const resolve = (item: Item, key: keyof Item) => {
		return item[key] as any;
	};

	const accordion = new Accordion(
		getters({
			get multiple() {
				return !oneAtATime;
			}
		})
	);

	const itemsWithId = $derived(
		items.map((item, index) =>
			'id' in item ? item : Object.assign({ id: id + '-' + index }, item)
		) as (Item & { id: string })[]
	);
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
	class={classes.accordion({ variant, size, splitted, className })}
	{...attachments}
>
	{#each itemsWithId as accordionItem}
		{@const item = accordion.getItem(accordionItem)}
		<div class={classes.item({ variant, size, splitted, expanded: item.isExpanded })}>
			<button {...item.trigger} class={classes.trigger({ variant, size, splitted })}>
				<div {...item.heading} class={classes.header({ variant, size })}>
					<Slot
						render={resolve(accordionItem, titleKey || 'title')}
						class={classes.title({ variant, size })}
					/>
					<Slot
						render={resolve(accordionItem, descriptionKey || 'description')}
						class={classes.description({ variant, size })}
					/>
				</div>
				{#if icon}
					{@render renderIcon(item.isExpanded)}
				{/if}
			</button>

			{#if item.isExpanded}
				<div transition:slide {...item.content} class={classes.content({ variant, size })}>
					<Slot
						render={resolve(accordionItem, contentKey || 'content')}
						payload={{ expanded: item.isExpanded }}
					/>
				</div>
			{:else if accessible}
				<span class="sr-only">
					{@render resolve(accordionItem, contentKey || 'content')}
				</span>
			{/if}
		</div>
	{/each}
</div>
