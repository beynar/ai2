<script lang="ts" generics="Item extends Record<string, any>">
	import { getters } from 'melt';
	import { Accordion } from 'melt/builders';
	import { SvelteSet } from 'svelte/reactivity';
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
		value = $bindable([]),
		titleKey,
		contentKey,
		descriptionKey,
		oneAtATime = true,
		onToggle: ot,
		onValueChange,
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

	let prevOpen: string[] = [...value];
	const accordion = new Accordion({
		...getters({
			get multiple() {
				return !oneAtATime;
			}
		}),
		onValueChange(nextValue) {
			const next = normalizeValue(nextValue);
			const changed = [...next, ...prevOpen].find(
				(id) => next.includes(id) !== prevOpen.includes(id)
			);
			prevOpen = next;
			value = next;
			onValueChange?.(next);
			if (changed === undefined) return;
			const index = items.findIndex((i) => i.id === changed);
			if (index === -1) return;
			ot?.({ item: itemsWithoutIds[index], index, open: next.includes(changed) });
		}
	});

	$effect(() => {
		const requested = oneAtATime ? value.slice(0, 1) : [...value];
		const current = normalizeValue(accordion.value);
		if (
			current.length === requested.length &&
			current.every((id, index) => id === requested[index])
		) {
			return;
		}
		prevOpen = requested;
		accordion.value = oneAtATime ? requested[0] : new SvelteSet(requested);
	});

	function normalizeValue(current: string | Iterable<string> | null | undefined): string[] {
		if (current == null) return [];
		return typeof current === 'string' ? [current] : [...current];
	}
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
		{@const accordionControl = accordion.getItem(accordionItem)}
		<div
			class={classes.item({
				size,
				density,
				variant,
				splitted,
				expanded: accordionControl.isExpanded
			})}
		>
			<button {...accordionControl.trigger} class={classes.trigger({ size, density, variant })}>
				<div {...accordionControl.heading} class={classes.header({ size, density })}>
					<Slot
						render={title || resolve(accordionItem, titleKey || 'title')}
						class={classes.title({ size })}
						payload={{ item: accordionItem }}
					/>
					<Slot
						render={description || resolve(accordionItem, descriptionKey || 'description')}
						class={classes.description({ size })}
						payload={{ item: accordionItem }}
					/>
				</div>
				{#if icon}
					<!-- Rotation lives on a span wrapper: the CSS rotate property is not
					     applied to SVG elements, and dynamic classes don't belong on icon
					     props (span-wrapper house pattern). -->
					<span
						aria-hidden="true"
						class="shrink-0 translate-y-0.5 transition-transform {icon === 'chevron' &&
						accordionControl.isExpanded
							? 'rotate-180'
							: ''}"
					>
						{@render renderIcon(accordionControl.isExpanded)}
					</span>
				{/if}
			</button>

			{#if accordionControl.isExpanded}
				<div
					in:slideTransition={split.in}
					out:slideTransition={split.out}
					{...accordionControl.content}
					class={classes.content({ size, density, variant })}
				>
					<Slot
						render={content || resolve(accordionItem, contentKey || 'content')}
						payload={{ item: accordionItem }}
					/>
				</div>
			{:else if accessible}
				<span class="sr-only">
					<Slot
						render={content || resolve(accordionItem, contentKey || 'content')}
						payload={{ item: accordionItem }}
					/>
				</span>
			{/if}
		</div>
	{/each}
</div>
