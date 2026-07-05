<script lang="ts">
	import Button from '../Button/Button.svelte';
	import MenuOption from '../MenuOption/MenuOption.svelte';
	import Separator from '../Separator/Separator.svelte';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import Slot from '../Slot/Slot.svelte';
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

	// The popover this menu lives in (a submenu's own popup, or undefined for a root menu).
	const parentPopover = usePopoverContext();
	const classes = $derived(useMenuTheme(theme));

	// Tracks which of this menu's own submenus are open. When any is open, focus lives inside a
	// portaled child menu, so this menu must stop reacting to keyboard — including the hover-driven
	// window listener, which a root menu (no parentPopover) would otherwise use to hijack arrows.
	let submenuOpen = $state<Record<number, boolean>>({});
	const anySubmenuOpen = $derived(Object.values(submenuOpen).some(Boolean));

	const navigation = useNavigation({
		enabled: () => {
			if (parentPopover?.hasChildOpen || anySubmenuOpen) {
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

	// ArrowLeft / go up a level: close this (sub)menu and return focus to the trigger that opened
	// it — matches native menu behavior. No-op for a root menu (nothing to go up to).
	const goUp = () => {
		if (!parentPopover) return;
		const trigger = parentPopover.referenceElement;
		parentPopover.close();
		if (trigger instanceof HTMLElement) {
			trigger.focus();
		}
	};

	const attachPrevious = (node: HTMLElement) => {
		Object.assign(node, { onPrevious: goUp });
	};
</script>

<div
	class={classes.root({ className })}
	role="menu"
	{...attachments}
	{@attach navigation.containerReference}
>
	<Slot render={header} renderIf={!!header} class={classes.header()} />
	{#each items as item, index}
		{#if item.type === 'button'}
			<Button
				role="menuitem"
				{...item}
				theme={theme?.button}
				{@attach navigation.itemReference}
				{@attach attachPrevious}
			/>
		{:else if item.type === 'option'}
			<MenuOption
				role="menuitem"
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
				onOpen={() => (submenuOpen[index] = true)}
				onClose={() => (submenuOpen[index] = false)}
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
						role="menuitem"
						{...itemProps}
						suffix={item.suffix ?? caretRightIcon}
						theme={theme?.submenu}
						active={submenuOpen[index]}
						attrs={{
							'aria-haspopup': 'menu',
							'aria-expanded': submenuOpen[index] ? 'true' : 'false'
						}}
						onClick={(payload) => {
							item.onClick?.(payload);
							popover?.toggle();
						}}
						{@attach popover.reference}
						{@attach navigation.itemReference}
						{@attach (node) => {
							Object.assign(node, {
								// ArrowRight opens this trigger's own submenu (its child menu focuses its
								// first item on mount). ArrowLeft goes up a level, like every other item.
								onNext: () => {
									// Disable this menu's keyboard nav synchronously so it can't also handle
									// the arrows now meant for the submenu (onOpen only fires at transition-end).
									submenuOpen[index] = true;
									popover.open();
								},
								onPrevious: goUp
							});
						}}
					/>
				{/snippet}
			</PopupMenu>
		{/if}
	{/each}
	<Slot render={footer} renderIf={!!footer} class={classes.footer()} />
</div>
