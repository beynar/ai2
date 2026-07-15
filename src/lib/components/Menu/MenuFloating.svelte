<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { onMount, tick, untrack } from 'svelte';
	import { on } from 'svelte/events';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import Button from '../Button/Button.svelte';
	import { arrowLeftIcon } from '../Icons/arrowLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import MenuOption from '../MenuOption/MenuOption.svelte';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import { usePopoverContext } from '../Popover/popover.state.svelte.js';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';
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

	let submenuPopovers = $state<Record<number, PopoverState>>({});
	// Derived from the popovers' own isOpen (which flips the instant open()/close()
	// is called) — NOT from onOpen/onClose callbacks, which only fire after the
	// intro/outro transitions and would keep the parent nav frozen during the fade.
	const anySubmenuOpen = $derived(Object.values(submenuPopovers).some((p) => p.isOpen));

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
		void (async () => {
			await tick();
			if (focusOnMount === 'container') navigation.focusContainer();
			else if (focusOnMount) navigation.focusFirst();
		})();
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

	const pointerFrom = (e: MouseEvent) => ({ x: e.clientX, y: e.clientY });

	const closeSubmenus = (exceptIndex?: number, pointer?: { x: number; y: number }) => {
		for (const [key, popover] of Object.entries(submenuPopovers)) {
			const index = Number(key);
			if (index === exceptIndex) continue;
			// Don't close a submenu the pointer is still travelling toward: its safe
			// area (the trigger→panel corridor) has authority during the diagonal
			// transit, so a sibling row you merely cross doesn't slam it shut.
			if (pointer && popover.safeArea.containsPoint(pointer.x, pointer.y)) continue;
			popover.close();
		}
	};

	// The moment every submenu is closed (isOpen, not transition end), hand the
	// hover highlight to the row actually under the mouse — the parent nav was
	// disabled while a submenu was open, so the highlight froze on the trigger.
	let hadSubmenuOpen = false;
	$effect(() => {
		const open = anySubmenuOpen;
		untrack(() => {
			if (hadSubmenuOpen && !open) navigation.syncPointerFocus();
			hadSubmenuOpen = open;
		});
	});
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
				{@attach (node) =>
					on(node, 'pointerenter', (e) => closeSubmenus(undefined, pointerFrom(e)))}
			/>
		{:else if item.type === 'option'}
			{@const { type: _type, ...optionProps } = item}
			<MenuOption
				role="menuitem"
				{...optionProps}
				theme={theme?.option}
				onEnter={(event) => {
					item.onEnter?.(event);
					closeSubmenus(undefined, pointerFrom(event));
				}}
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
				debugSafeArea = false,
				popoverClass,
				onClick: itemOnClick,
				onEnter: itemOnEnter,
				suffix,
				attrs,
				...itemProps
			} = submenuItem}
			<PopupMenu
				position={submenuPosition}
				openOnHover={openOnHover && !isInMobileSheet}
				{openOnClick}
				{hoverDelay}
				{closeOnMouseLeave}
				{debugSafeArea}
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
						active={popover.isOpen}
						attrs={{
							...attrs,
							'aria-haspopup': 'menu',
							'aria-expanded': popover.isOpen ? 'true' : 'false',
							'data-menu-keep-open': 'true'
						}}
						onClick={(payload) => {
							itemOnClick?.(payload);
							closeSubmenus(index);
							popover?.toggle();
						}}
						onEnter={(event) => {
							itemOnEnter?.(event);
							closeSubmenus(index, pointerFrom(event));
						}}
						{@attach popover.reference}
						{@attach navigation.itemReference}
						{@attach (node) => {
							submenuPopovers[index] = popover;
							Object.assign(node, {
								onNext: () => {
									closeSubmenus(index);
									popover.open();
								},
								onPrevious: goUp
							});
							return () => {
								delete submenuPopovers[index];
							};
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
