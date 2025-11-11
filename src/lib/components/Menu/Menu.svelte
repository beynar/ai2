<script lang="ts">
	import Button from '../Button/Button.svelte';
	import MenuOption from '../MenuOption/MenuOption.svelte';
	import Separator from '../Separator/Separator.svelte';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import type { MenuProps } from './menu.props.js';
	import { useMenuTheme } from './menu.theme.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import { onMount, tick } from 'svelte';
	import { usePopoverContext } from '../Popover/popover.state.svelte.js';

	let {
		items,
		class: className = '',
		theme,
		header,
		footer,
		focusOnMount,
		...attachments
	}: MenuProps = $props();
	const id = $props.id();

	const popover = usePopoverContext();
	const classes = $derived(useMenuTheme(theme));

	const navigation = useNavigation({
		enabled: () => {
			if (popover?.hasChildOpen) {
				return false;
			}
			return true;
		},
		orientation: () => 'vertical',
		loop: true,
		id,
		enableHoverFocus: true,
		defaultFocusedIndex: () => navigation.lastFocusedIndex ?? 0,
		preventKeyboardDefault: false
	});

	onMount(() => {
		if (focusOnMount) {
			if (focusOnMount === 'container') {
				navigation.focusContainer();
			} else {
				navigation.focusFirst();
			}
		}
	});

	const attachPrevious = (node: HTMLElement) => {
		Object.assign(node, {
			onPrevious: () => {
				popover?.close();
			}
		});
	};
</script>

<div
	class={classes.menu({ className })}
	role="menu"
	{...attachments}
	{@attach navigation.containerReference}
>
	{@render header?.()}
	{#each items as item}
		{#if item.type === 'button'}
			<Button
				{...item}
				theme={theme?.button}
				{@attach navigation.itemReference}
				{@attach attachPrevious}
			/>
		{:else if item.type === 'option'}
			<MenuOption
				{...item}
				theme={theme?.option}
				{@attach navigation.itemReference}
				{@attach attachPrevious}
			/>
		{:else if item.type === 'separator'}
			<Separator {...item} theme={theme?.separator} />
		{:else if item.type === 'submenu'}
			{@const {
				menu,
				openOnHover = true,
				openOnClick = true,
				hoverDelay = 100,
				closeOnMouseLeave = true,
				...itemProps
			} = item}
			<PopupMenu
				position="right-start"
				{openOnHover}
				{openOnClick}
				{hoverDelay}
				{closeOnMouseLeave}
				closeOnEscape={true}
				closeOnItemClick={false}
				menu={{ items: menu, focusOnMount: true }}
			>
				{#snippet trigger(popover)}
					<MenuOption
						{...itemProps}
						suffix={item.suffix ?? caretRightIcon}
						theme={theme?.submenu}
						onClick={(payload) => {
							item.onClick?.(payload);
							popover?.toggle();
						}}
						{@attach popover.reference}
						{@attach navigation.itemReference}
						{@attach (node) => {
							Object.assign(node, {
								onNext: () => {
									popover.open();
								},
								onPrevious: () => {
									popover.close();
								}
							});
						}}
					/>
				{/snippet}
			</PopupMenu>
		{/if}
	{/each}
	{@render footer?.()}
</div>
