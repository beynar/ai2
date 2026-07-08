<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { TabbarProps, TabItem } from './tabbar.props.js';
	import { useTabbarTheme } from './tabbar.theme.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';

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

	// --- Active indicator ----------------------------------------------------
	// Two-part strategy so the bar is correct at every stage:
	//  • SSR + pre-hydration: a CSS-only indicator rendered INSIDE the active tab
	//    (`staticIndicator`), positioned purely by layout — no measurement needed.
	//  • After hydration: a single absolutely-positioned element measured onto the
	//    active tab that slides/resizes between tabs. It replaces the static one at
	//    the identical spot, so the handoff is seamless.
	let tabEls: Array<HTMLElement | undefined> = [];
	let indicatorStyle = $state('');
	let indicatorReady = $state(false);
	// Flips true once the measured indicator has been placed on the client; until
	// then the static (SSR) indicator is shown.
	let hydrated = $state(false);

	const placeIndicator = (): boolean => {
		const el = tabEls[activeTab];
		if (!el) return false;
		// offsetLeft/Top are relative to the root (it is `relative`), so this is
		// immune to page scroll and layout shifts above the tabbar.
		const x = el.offsetLeft;
		const y = el.offsetTop;
		const w = el.offsetWidth;
		const h = el.offsetHeight;
		if (variant === 'pill') {
			indicatorStyle = `transform:translate(${x}px, ${y}px);width:${w}px;height:${h}px`;
		} else if (position === 'bottom') {
			indicatorStyle = `transform:translate(${x}px, ${y}px);width:${w}px;height:2px`;
		} else if (position === 'left') {
			indicatorStyle = `transform:translate(${x + w - 2}px, ${y}px);width:2px;height:${h}px`;
		} else if (position === 'right') {
			indicatorStyle = `transform:translate(${x}px, ${y}px);width:2px;height:${h}px`;
		} else {
			// 'top' (default): underline along the bottom edge.
			indicatorStyle = `transform:translate(${x}px, ${y + h - 2}px);width:${w}px;height:2px`;
		}
		return true;
	};

	// Re-place whenever anything that moves or resizes the tabs changes.
	$effect(() => {
		activeTab;
		items;
		size;
		variant;
		position;
		orientation;
		alignment;
		fullWidth;
		untrack(() => placeIndicator());
	});

	const collectTab = (index: number) => (node: HTMLElement) => {
		return untrack(() => {
			tabEls[index] = node;
			return () => {
				tabEls[index] = undefined;
			};
		});
	};

	const rootAttachment = (node: HTMLElement) => {
		return untrack(() => {
			// Container resizes (fullWidth, font load, responsive reflow) move the
			// tabs without changing any reactive prop — re-measure on resize.
			const observer = new ResizeObserver(() => placeIndicator());
			observer.observe(node);
			// Place the measured indicator, then hand off from the static SSR bar in
			// the same update (identical position → no visible jump).
			if (placeIndicator()) hydrated = true;
			// Enable the slide transition only after the initial position has painted
			// (two frames), so the handoff is instant and only later switches slide.
			let raf = requestAnimationFrame(() => {
				raf = requestAnimationFrame(() => (indicatorReady = true));
			});
			return () => {
				observer.disconnect();
				cancelAnimationFrame(raf);
			};
		});
	};
</script>

<div
	class={classes.root({ orientation, alignment, size, variant, className, fullWidth })}
	role="tablist"
	aria-orientation={orientation}
	{@attach navigation.containerReference}
	{@attach rootAttachment}
	{...attachments}
>
	{#if hydrated}
		<!-- Measured, animated indicator (client only). -->
		<div
			class={classes.indicator({ variant })}
			style={indicatorStyle}
			data-color={color}
			data-ready={indicatorReady ? 'true' : 'false'}
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
			{@attach collectTab(index)}
		>
			{#if !hydrated && isActive}
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
