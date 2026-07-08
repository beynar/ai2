<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { onMount } from 'svelte';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import Button from '../Button/Button.svelte';
	import { arrowLeftIcon } from '../Icons/arrowLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import MenuOption from '../MenuOption/MenuOption.svelte';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import { usePopoverContext } from '../Popover/popover.state.svelte.js';
	import Separator from '../Separator/Separator.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { Breakpoint } from '../Theme/theme.js';
	import type { MenuProps } from './menu.props.js';
	import { useMenuTheme } from './menu.theme.js';

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
	const parentPopover = usePopoverContext();
	const classes = $derived(useMenuTheme(theme));
	const t = $derived(useI18n());
	const isInMobileSheet = $derived(parentPopover?.isMobileSheet ?? false);
	const hasParentMenu = $derived(!!parentPopover?.parent);
	const showBackControl = $derived(isInMobileSheet && hasParentMenu);
	const submenuPosition = (breakpoint: Breakpoint): Placement =>
		breakpoint === 'xs' || breakpoint === 'sm' ? 'bottom-start' : 'right-start';

	let submenuOpen = $state<Record<number, boolean>>({});
	const anySubmenuOpen = $derived(Object.values(submenuOpen).some(Boolean));

	const navigation = useNavigation({
		enabled: () => {
			if (parentPopover?.hasChildOpen || anySubmenuOpen) return false;
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
		if (focusOnMount === 'container') {
			navigation.focusContainer();
			return;
		}
		if (focusOnMount) navigation.focusFirst();
	});

	const closeParentMenu = () => {
		if (!parentPopover) return;
		const trigger = parentPopover.referenceElement;
		parentPopover.close();
		if (trigger instanceof HTMLElement) trigger.focus();
	};

	const goBack = () => {
		closeParentMenu();
	};

	const goUp = () => {
		if (!hasParentMenu) return;
		goBack();
	};

	const attachPrevious = (node: HTMLElement) => {
		Object.assign(node, { onPrevious: goUp });
	};

	const attachBackControl = (node: HTMLElement) => {
		Object.assign(node, { onPrevious: goBack });
	};
</script>

<div
	class={classes.root({ className })}
	role="menu"
	{...attachments}
	{@attach navigation.containerReference}
>
	{#if showBackControl}
		<MenuOption
			role="menuitem"
			title={t.back}
			prefix={arrowLeftIcon}
			theme={theme?.option}
			attrs={{ 'data-menu-keep-open': 'true' }}
			onClick={() => {
				goBack();
			}}
			{@attach navigation.itemReference}
			{@attach attachBackControl}
		/>
		<Separator theme={theme?.separator} />
	{:else}
		<Slot render={header} renderIf={!!header} class={classes.header()} />
	{/if}

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
			{@const submenuItem = item as typeof item & { popoverClass?: string }}
			{@const {
				type: _type,
				menu,
				openOnHover = true,
				openOnClick = true,
				hoverDelay = 100,
				closeOnMouseLeave = true,
				popoverClass,
				onClick: itemOnClick,
				suffix,
				attrs,
				...itemProps
			} = submenuItem}
			<PopupMenu
				onOpen={() => (submenuOpen[index] = true)}
				onClose={() => (submenuOpen[index] = false)}
				position={submenuPosition}
				openOnHover={openOnHover && !isInMobileSheet}
				{openOnClick}
				{hoverDelay}
				{closeOnMouseLeave}
				closeOnEscape={true}
				closeOnItemClick={false}
				mobileSheet={false}
				class={popoverClass}
				menu={{
					items: menu,
					focusOnMount: true,
					submenuMode: 'popover',
					theme
				}}
			>
				{#snippet trigger(popover)}
					<MenuOption
						role="menuitem"
						{...itemProps}
						suffix={suffix ?? caretRightIcon}
						theme={theme?.submenu}
						active={submenuOpen[index]}
						attrs={{
							...attrs,
							'aria-haspopup': 'menu',
							'aria-expanded': submenuOpen[index] ? 'true' : 'false',
							'data-menu-keep-open': 'true'
						}}
						onClick={(payload) => {
							itemOnClick?.(payload);
							popover?.toggle();
						}}
						{@attach popover.reference}
						{@attach navigation.itemReference}
						{@attach (node) => {
							Object.assign(node, {
								onNext: () => {
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

	{#if !showBackControl}
		<Slot render={footer} renderIf={!!footer} class={classes.footer()} />
	{/if}
</div>
