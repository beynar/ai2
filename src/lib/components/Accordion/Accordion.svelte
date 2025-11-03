<script lang="ts" generics="Item extends Record<string, any>">
	import { getters } from 'melt';
	import { Accordion } from 'melt/builders';
	import type { AccordionProps } from './accordion.props.js';
	import { useAccordionTheme } from './accordion.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import { slide } from 'svelte/transition';

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
		actionsProps,
		iconProps,
		titleProps,
		descriptionProps,
		contentProps,
		actions,
		title,
		description,
		content,
		transitions,
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
		<svg
			style:transform="rotate({isOpen ? '180' : '0'}deg)"
			class={classes.icon({ variant, size })}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	{:else if icon && icon === 'math'}
		<svg
			class={classes.icon({ variant, size })}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				style="transform-origin: center; transition: scale 200ms ease-in-out; transform: scale({!isOpen
					? '1'
					: '0'})"
				stroke-linecap="round"
				stroke-linejoin="round"
				d={'M12 4.5v15m7.5-7.5h-15'}
			/>
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
		</svg>
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
		<div class={classes.item({ variant, size, splitted })}>
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
				<div transition:slide {...item.content}>
					<Slot
						render={resolve(accordionItem, contentKey || 'content')}
						class={classes.content({ variant, size })}
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>
