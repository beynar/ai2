<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import StatDescription from './StatDescription.svelte';
	import StatIndicator from './StatIndicator.svelte';
	import StatLabel from './StatLabel.svelte';
	import StatSeparator from './StatSeparator.svelte';
	import StatTrend from './StatTrend.svelte';
	import StatValue from './StatValue.svelte';
	import { setStatContext } from './stat.context.js';
	import type { StatProps } from './stat.props.js';
	import { useStatTheme } from './stat.theme.js';

	let {
		ref = $bindable(),
		class: className,
		color = 'background',
		variant = 'solid',
		size = 'normal',
		theme,
		label,
		value,
		indicator,
		indicatorVariant = 'default',
		indicatorColor = 'foreground',
		showSeparator = false,
		trend,
		trendDirection = 'neutral',
		description,
		children,
		...attachments
	}: StatProps = $props();

	const classes = $derived(useStatTheme(theme));

	setStatContext({
		get size() {
			return size;
		},
		get theme() {
			return theme;
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="stat"
	data-color={color}
	data-variant={variant}
	data-size={size}
	class={classes.root({ color, variant, size, className })}
	{...attachments}
>
	{#if label}
		<StatLabel children={label} />
	{/if}

	{#if value}
		<StatValue children={value} />
	{/if}

	{#if indicator}
		<StatIndicator variant={indicatorVariant} color={indicatorColor} children={indicator} />
	{/if}

	{#if showSeparator}
		<StatSeparator />
	{/if}

	{#if trend}
		<StatTrend trend={trendDirection} children={trend} />
	{/if}

	{#if description}
		<StatDescription children={description} />
	{/if}

	<Slot render={children} />
</div>
