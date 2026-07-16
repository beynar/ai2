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
		icon = 'chevron',
		variant = 'classic',
		splitted = false,
		size = 'normal',
		density = 'normal',
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
	// slide is a factory: it captures the theme context at init because Svelte
	// runs transition functions outside component initialisation.
	const slideTransition = slide();

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
		{@render caretDownIcon({ class: classes.icon({ size }) })}
	{:else if icon && icon === 'math'}
		{@render (isOpen ? minusIcon : plusIcon)({ class: classes.icon({ size }) })}
	{:else if icon}
		<Slot class={classes.icon({ size })} render={icon} />
	{/if}
{/snippet}

<div
	{...accordion.root}
	data-size={size}
	data-density={density}
	data-variant={variant}
	data-splitted={splitted}
	class={classes.root({ size, density, variant, splitted, className })}
	{...attachments}
>
	{#each items as accordionItem}
		{@const item = accordion.getItem(accordionItem)}
		<div class={classes.item({ size, density, variant, splitted, expanded: item.isExpanded })}>
			<button {...item.trigger} class={classes.trigger({ size, density, variant })}>
				<div {...item.heading} class={classes.header({ size, density })}>
					<Slot
						render={title || resolve(accordionItem, titleKey || 'title')}
						class={classes.title({ size })}
						payload={{ item }}
					/>
					<Slot
						render={description || resolve(accordionItem, descriptionKey || 'description')}
						class={classes.description({ size })}
						payload={{ item }}
					/>
				</div>
				{#if icon}
					<!-- Rotation lives on a span wrapper: the CSS rotate property is not
					     applied to SVG elements, and dynamic classes don't belong on icon
					     props (span-wrapper house pattern). -->
					<span
						aria-hidden="true"
						class="shrink-0 translate-y-0.5 transition-transform {icon === 'chevron' &&
						item.isExpanded
							? 'rotate-180'
							: ''}"
					>
						{@render renderIcon(item.isExpanded)}
					</span>
				{/if}
			</button>

			{#if item.isExpanded}
				<div
					in:slideTransition={split.in}
					out:slideTransition={split.out}
					{...item.content}
					class={classes.content({ size, density, variant })}
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
