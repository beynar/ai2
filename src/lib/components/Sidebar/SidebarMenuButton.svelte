<script lang="ts">
	import PopupMenu from '$lib/components/PopupMenu/PopupMenu.svelte';
	import { caretDownIcon } from '$lib/components/Icons/caretDown.js';
	import { caretUpDownIcon } from '$lib/components/Icons/caretUpDown.js';
	import type { SidebarMenuButtonItem } from './sidebar.props.js';
	import { getSidebarMenuPosition } from './sidebar-position.js';
	import SidebarIcon from './SidebarIcon.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	type Props = SidebarMenuButtonItem & {
		isMobile?: boolean;
		defaultAlign?: 'start' | 'center' | 'end';
		collapsed?: boolean;
		theme?: SidebarThemeProps;
	};

	let {
		icon,
		avatar,
		variant = 'default',
		title,
		subtitle,
		trailing,
		href,
		onClick,
		menu,
		menuSide,
		menuAlign,
		menuClass,
		menuIconClass,
		menuShowLabel = false,
		openStyle,
		class: className,
		mediaClass,
		isMobile = false,
		defaultAlign = 'start',
		collapsed = false,
		theme
	}: Props = $props();

	let avatarImageFailed = $state(false);
	let previousAvatarSrc = $state<string | undefined>();

	const classes = $derived(useSidebarTheme(theme));
	const compact = $derived(variant === 'compact');
	const brand = $derived(variant === 'brand');
	const resolvedTrailing = $derived(
		trailing === false
			? undefined
			: (trailing ?? (menu ? (compact ? caretDownIcon : caretUpDownIcon) : undefined))
	);
	const resolvedOpenStyle = $derived(openStyle ?? (avatar ? 'muted' : 'accent'));
	const openClass = $derived(
		menu && !compact
			? resolvedOpenStyle === 'muted'
				? 'aria-expanded:bg-background-muted'
				: 'aria-expanded:bg-primary/10 aria-expanded:text-primary'
			: ''
	);
	const buttonClass = $derived(
		classes.menuButton({
			size: compact ? 'default' : 'lg',
			className: [compact && 'w-fit px-1.5', openClass, className]
		})
	);
	const menuPosition = $derived(
		getSidebarMenuPosition(
			menuSide ?? (compact || brand ? 'bottom' : undefined),
			menuAlign ?? defaultAlign,
			isMobile
		)
	);

	$effect(() => {
		const avatarSrc = avatar?.src;
		if (avatarSrc === previousAvatarSrc) return;

		previousAvatarSrc = avatarSrc;
		avatarImageFailed = false;
	});
</script>

{#snippet media()}
	{#if avatar}
		<div class={classes.avatar({ className: mediaClass })}>
			{#if avatar.src && !avatarImageFailed}
				<img
					src={avatar.src}
					alt={avatar.alt ?? ''}
					class="size-full object-cover"
					onerror={() => (avatarImageFailed = true)}
				/>
			{:else}
				{avatar.fallback ?? title.slice(0, 2).toUpperCase()}
			{/if}
		</div>
	{:else if icon}
		<div class={classes.media({ size: compact ? 'compact' : 'default', className: mediaClass })}>
			<SidebarIcon {icon} class={compact ? 'size-3' : 'size-4'} />
		</div>
	{/if}
{/snippet}

{#snippet rowText()}
	{#if !collapsed}
		{#if compact}
			<span class="truncate font-medium">{title}</span>
		{:else if brand}
			<div class="flex min-w-0 flex-col gap-0.5 leading-none">
				<span class="truncate font-medium">{title}</span>
				{#if subtitle}<span class="truncate text-xs text-foreground/60">{subtitle}</span>{/if}
			</div>
		{:else}
			<div class="grid min-w-0 flex-1 text-left text-sm leading-tight">
				<span class="truncate font-medium">{title}</span>
				{#if subtitle}<span class="truncate text-xs text-foreground/60">{subtitle}</span>{/if}
			</div>
		{/if}
	{:else}
		<span class="sr-only">{title}</span>
	{/if}
{/snippet}

{#snippet buttonInner()}
	{@render media()}
	{@render rowText()}
	{#if resolvedTrailing && !collapsed}
		<SidebarIcon icon={resolvedTrailing} class={compact ? 'opacity-50' : 'ml-auto size-4'} />
	{/if}
{/snippet}

{#snippet identityRow()}
	<div class="flex items-center gap-2 px-2 py-1 text-left text-sm">
		{@render media()}
		<div class="grid min-w-0 flex-1 leading-tight">
			<span class="truncate font-medium text-foreground">{title}</span>
			{#if subtitle}<span class="truncate text-xs text-foreground/60">{subtitle}</span>{/if}
		</div>
	</div>
{/snippet}

{#if menu}
	<PopupMenu
		menu={{
			items: menu,
			header: menuShowLabel ? identityRow : undefined,
			theme: menuIconClass ? { option: { prefix: { base: menuIconClass } } } : undefined
		}}
		position={menuPosition}
		class={menuClass ?? 'min-w-56 rounded-lg'}
		fitTrigger={!compact}
	>
		{#snippet trigger(popover)}
			<button
				type="button"
				data-slot="sidebar-menu-button"
				data-size={compact ? 'default' : 'lg'}
				class={buttonClass}
				aria-expanded={popover.isOpen}
				aria-haspopup="menu"
				aria-controls={popover.isOpen ? popover.id : undefined}
				{@attach popover.reference}
				onclick={() => popover.toggle()}
			>
				{@render buttonInner()}
			</button>
		{/snippet}
	</PopupMenu>
{:else if href}
	<a
		{href}
		data-slot="sidebar-menu-button"
		data-size={compact ? 'default' : 'lg'}
		class={buttonClass}
	>
		{@render buttonInner()}
	</a>
{:else}
	<button
		type="button"
		onclick={onClick}
		data-slot="sidebar-menu-button"
		data-size={compact ? 'default' : 'lg'}
		class={buttonClass}
	>
		{@render buttonInner()}
	</button>
{/if}
