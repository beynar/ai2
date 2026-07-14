<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { TabbarProps, TabItem } from './tabbar.props.js';
	import { useTabbarTheme } from './tabbar.theme.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import { useSlidingIndicator } from '$lib/utils/useSlidingIndicator.svelte.js';
	import type { Snippet } from 'svelte';

	let {
		items,
		activeTab = $bindable(0),
		onChange,
		size = 'normal',
		orientation = 'horizontal',
		color = 'primary',
		alignment = 'start',
		position = 'top',
		variant = 'underline',
		class: className = '',
		theme,
		fullWidth = false,
		...attachments
	}: TabbarProps = $props();

	const id = $props.id();
	const classes = $derived(useTabbarTheme(theme));

	type NormalizedTab = {
		label: string | Snippet;
		prefix?: Snippet;
		suffix?: Snippet;
		href?: string;
		disabled: boolean;
		target?: string;
		rel?: string;
	};

	// Normalize tab items to always work with objects
	const normalizedTabs = $derived(
		items.map((tab): NormalizedTab =>
			typeof tab === 'string'
				? { label: tab, prefix: undefined, suffix: undefined, href: undefined, disabled: false }
				: {
						label: tab.label,
						prefix: tab.prefix,
						suffix: tab.suffix,
						href: tab.href,
						disabled: tab.disabled ?? false,
						target: tab.target,
						rel: tab.rel
					}
		)
	);

	// Navigation hook for keyboard support
	const navigation = useNavigation({
		orientation: () => orientation,
		loop: true,
		id,
		enableHoverFocus: false,
		onChange: (index) => {
			if (index !== null && index !== activeTab) {
				activeTab = index;
				onChange?.(index);
			}
		},
		defaultFocusedIndex: () => activeTab
	});

	function handleTabClick(index: number, tab: NormalizedTab) {
		if (!tab.disabled && !tab.href) {
			activeTab = index;
			onChange?.(index);
			navigation.focusItem(index);
		}
	}

	const indicator = useSlidingIndicator({
		activeIndex: () => activeTab,
		observe: () => [items, size, variant, position, orientation, alignment, fullWidth],
		getStyle: (element) => {
			const x = element.offsetLeft;
			const y = element.offsetTop;
			const width = element.offsetWidth;
			const height = element.offsetHeight;

			if (variant === 'pill') {
				return `transform:translate(${x}px, ${y}px);width:${width}px;height:${height}px`;
			}
			if (position === 'bottom') {
				return `transform:translate(${x}px, ${y}px);width:${width}px;height:2px`;
			}
			if (position === 'left') {
				return `transform:translate(${x + width - 2}px, ${y}px);width:2px;height:${height}px`;
			}
			if (position === 'right') {
				return `transform:translate(${x}px, ${y}px);width:2px;height:${height}px`;
			}
			return `transform:translate(${x}px, ${y + height - 2}px);width:${width}px;height:2px`;
		}
	});
</script>

<div
	class={classes.root({ orientation, alignment, size, variant, className, fullWidth })}
	role="tablist"
	aria-orientation={orientation}
	{@attach navigation.containerReference}
	{@attach indicator.containerReference}
	{...attachments}
>
	{#if indicator.isHydrated}
		<!-- Measured, animated indicator (client only). -->
		<div
			class={classes.indicator({ variant })}
			style={indicator.style}
			data-color={color}
			data-ready={indicator.isReady ? 'true' : 'false'}
			aria-hidden="true"
		></div>
	{/if}
	{#each normalizedTabs as tab, index}
		{@const isActive = activeTab === index}
		{@const isFocused = navigation.focusedIndex === index}
		{@const elementType = tab.href ? 'a' : 'button'}

		<svelte:element
			this={elementType}
			role="tab"
			aria-disabled={tab.disabled}
			disabled={tab.disabled}
			href={tab.href}
			target={tab.target}
			tabindex={isFocused ? 0 : -1}
			rel={tab.rel}
			data-color={color}
			data-active={isActive ? 'true' : 'false'}
			data-focused={isFocused ? 'true' : 'false'}
			data-orientation={orientation}
			class={classes.tab({
				size,
				color,
				active: isActive,
				focused: isFocused,
				disabled: tab.disabled,
				orientation,
				position,
				variant,
				fullWidth
			})}
			onclick={() => handleTabClick(index, tab)}
			{@attach navigation.itemReference}
			{@attach indicator.itemReference(index)}
		>
			{#if !indicator.isHydrated && isActive}
				<!-- CSS-only indicator for SSR / pre-hydration, positioned by layout. -->
				<span class={classes.staticIndicator({ variant, position })} aria-hidden="true"></span>
			{/if}
			<Slot render={tab.prefix} class={classes.prefix({ size })} />

			{#if typeof tab.label === 'string'}
				{tab.label}
			{:else}
				<Slot render={tab.label} />
			{/if}

			<Slot render={tab.suffix} class={classes.suffix({ size })} />
		</svelte:element>
	{/each}
</div>
