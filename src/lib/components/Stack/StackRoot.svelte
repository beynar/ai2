<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import {
		toLayoutSpacingKey,
		type LayoutSpacing,
		type LayoutSpacingKey
	} from '../Layout/layoutSpacing.js';
	import type { StackBase, StackCrossAlignment, StackMainAlignment } from './stack.types.js';
	import { useStackTheme } from './stack.theme.js';

	type StackRootProps = StackBase & {
		direction: 'horizontal' | 'vertical';
		mainAlign: StackMainAlignment;
		crossAlign: StackCrossAlignment;
	};

	let {
		ref = $bindable(null),
		class: className,
		as = 'div',
		style,
		direction,
		mainAlign,
		crossAlign,
		gap = 0,
		padding,
		paddingInline,
		paddingBlock,
		wrap = 'nowrap',
		isScrollable = false,
		width,
		height,
		maxWidth,
		minHeight,
		theme,
		children,
		...attributes
	}: StackRootProps = $props();

	const classes = $derived(useStackTheme(theme));
	const resolvedPaddingInline = $derived(paddingInline ?? padding);
	const resolvedPaddingBlock = $derived(paddingBlock ?? padding);

	const spacingKey = (value: LayoutSpacing | undefined): LayoutSpacingKey | undefined =>
		value === undefined ? undefined : toLayoutSpacingKey(value);
	const cssSize = (value: number | string | undefined) =>
		typeof value === 'number' ? (Number.isFinite(value) ? `${value}px` : undefined) : value;
</script>

<svelte:element
	this={as}
	bind:this={ref}
	data-slot={direction === 'horizontal' ? 'h-stack' : 'v-stack'}
	data-direction={direction}
	data-wrap={wrap}
	{style}
	style:width={cssSize(width)}
	style:height={cssSize(height)}
	style:max-width={cssSize(maxWidth)}
	style:min-height={cssSize(minHeight)}
	class={classes.root({
		direction,
		mainAlign,
		crossAlign,
		gap: spacingKey(gap),
		paddingInline: spacingKey(resolvedPaddingInline),
		paddingBlock: spacingKey(resolvedPaddingBlock),
		wrap,
		scrollable: isScrollable,
		className
	})}
	{...attributes}
>
	<Slot render={children} />
</svelte:element>
