<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { TabbarProps, TabItem } from './tabbar.props.js';
	import { useTabbarTheme } from './tabbar.theme.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import type { Snippet } from 'svelte';

	let {
		tabs,
		activeTab = $bindable(0),
		onChange,
		size = 'normal',
		orientation = 'horizontal',
		color = 'primary',
		alignment = 'start',
		position = 'top',
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

	// Normalize tabs to always work with objects
	const normalizedTabs = $derived(
		tabs.map(
			(tab): NormalizedTab =>
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
		enabled: () => false,
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
</script>

<div
	class={classes.tabbar({ orientation, alignment, size, className, fullWidth })}
	role="tablist"
	aria-orientation={orientation}
	{@attach navigation.containerReference}
	{...attachments}
>
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
				fullWidth
			})}
			onclick={() => handleTabClick(index, tab)}
			{@attach navigation.itemReference}
		>
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
