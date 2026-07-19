<script lang="ts">
	import PopupMenu from '$lib/components/PopupMenu/PopupMenu.svelte';
	import { caretDownIcon } from '$lib/components/Icons/caretDown.js';
	import { caretUpDownIcon } from '$lib/components/Icons/caretUpDown.js';
	import type { SidebarDensity, SidebarMenuButtonItem, SidebarSize } from './sidebar.props.js';
	import { getSidebarMenuPosition } from './sidebar-position.js';
	import SidebarIcon from './SidebarIcon.svelte';
	import { useSidebarTheme, type SidebarThemeProps } from './sidebar.theme.js';

	type Props = SidebarMenuButtonItem & {
		isMobile?: boolean;
		defaultAlign?: 'start' | 'center' | 'end';
		size?: SidebarSize;
		density?: SidebarDensity;
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
		size = 'normal',
		density = 'normal',
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
	const collapsedMediaPadding = $derived(
		compact
			? 'group-data-[collapsible=icon]:![padding-inline:calc((var(--sidebar-width-icon)-var(--sidebar-compact-media-size))/2)]'
			: 'group-data-[collapsible=icon]:![padding-inline:calc((var(--sidebar-width-icon)-var(--sidebar-media-size))/2)]'
	);
	const buttonClass = $derived(
		classes.menuButton({
			componentSize: size,
			density,
			size: compact ? 'default' : 'lg',
			className: [
				compact && 'w-fit group-data-[collapsible=icon]:w-full',
				collapsedMediaPadding,
				openClass,
				className
			]
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
		<div class={classes.avatar({ componentSize: size, className: mediaClass })}>
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
		<div
			class={classes.media({
				size: compact ? 'compact' : 'default',
				componentSize: size,
				className: mediaClass
			})}
		>
			<SidebarIcon {icon} />
		</div>
	{/if}
{/snippet}

{#snippet rowText()}
	{#if compact}
		<span class={classes.menuLabel({ className: 'font-medium' })}>{title}</span>
	{:else if brand}
		<div class={classes.menuLabel({ className: 'flex flex-col gap-0.5 leading-none' })}>
			<span class="truncate font-medium">{title}</span>
			{#if subtitle}
				<span class={classes.menuSecondary({ componentSize: size })}>{subtitle}</span>
			{/if}
		</div>
	{:else}
		<div class={classes.menuLabel({ className: 'grid text-left leading-tight' })}>
			<span class="truncate font-medium">{title}</span>
			{#if subtitle}
				<span class={classes.menuSecondary({ componentSize: size })}>{subtitle}</span>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet buttonInner()}
	{@render media()}
	{@render rowText()}
	{#if resolvedTrailing}
		<SidebarIcon
			icon={resolvedTrailing}
			class={classes.menuTrailing({
				componentSize: size,
				className: compact ? 'opacity-50' : undefined
			})}
		/>
	{/if}
{/snippet}

{#snippet identityRow()}
	<div class="flex items-center gap-2 px-2 py-1 text-left">
		{@render media()}
		<div class="grid min-w-0 flex-1 leading-tight">
			<span class="truncate font-medium text-foreground">{title}</span>
			{#if subtitle}
				<span class={classes.menuSecondary({ componentSize: size })}>{subtitle}</span>
			{/if}
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
