<script lang="ts">
	import { useNavigation } from '$lib/utils/useNavigation.svelte.js';
	import Button from '../Button/Button.svelte';
	import { checkIcon } from '../Icons/check.js';
	import { dotsThreeIcon } from '../Icons/dotsThree.js';
	import type { MenuItem } from '../Menu/index.js';
	import PopupMenu from '../PopupMenu/PopupMenu.svelte';
	import ToggleButton from '../ToggleButton/ToggleButton.svelte';
	import type { ToggleButtonGroupItem } from '../ToggleButtonGroup/index.js';
	import { tooltip } from '../Tooltip/tooltip.svelte.js';
	import ToggleMenuGroup from './ToggleMenuGroup.svelte';
	import ToggleMenuMenu from './ToggleMenuMenu.svelte';
	import ToggleMenuRadioGroup from './ToggleMenuRadioGroup.svelte';
	import type {
		ToggleMenuCustomItem,
		ToggleMenuGroupItem,
		ToggleMenuItem,
		ToggleMenuMenuItem,
		ToggleMenuProps,
		ToggleMenuRadioGroupButton,
		ToggleMenuRadioGroupItem,
		ToggleMenuToggleItem
	} from './toggleMenu.props.js';
	import { useToggleMenuOverflow } from './toggleMenu.state.svelte.js';
	import { useToggleMenuTheme } from './toggleMenu.theme.js';

	let {
		items = $bindable(),
		ariaLabel,
		size,
		color,
		variant,
		disabled = false,
		onChange,
		class: className,
		theme,
		...attachments
	}: ToggleMenuProps = $props();

	const classes = $derived(useToggleMenuTheme(theme));
	const navigation = useNavigation({
		orientation: 'horizontal',
		loop: true,
		enableHoverFocus: false
	});
	const overflow = useToggleMenuOverflow();

	function getToggleProps(item: ToggleMenuToggleItem): Omit<ToggleMenuToggleItem, 'type'> {
		const { type: _type, ...props } = item;
		return props;
	}

	function replaceItem(index: number, item: ToggleMenuItem): void {
		items = items.map((currentItem, currentIndex) => (currentIndex === index ? item : currentItem));
		onChange?.(items);
	}

	function updateToggle(index: number, item: ToggleMenuToggleItem, checked: boolean): void {
		replaceItem(index, { ...item, checked });
		item.onChange?.(checked);
	}

	function updateGroup(
		index: number,
		item: ToggleMenuGroupItem,
		key: string,
		checked: boolean
	): void {
		const value = { ...item.value, [key]: checked };
		replaceItem(index, { ...item, value });
		item.items[key]?.onChange?.(checked);
		item.onChange?.(value);
	}

	function updateRadioGroup(index: number, value: string): void {
		const item = items[index];
		if (item?.type !== 'radio-group' || item.value === value) return;
		replaceItem(index, { ...item, value });
		item.onChange?.(value);
	}

	function getCustomOverflowItems(item: ToggleMenuCustomItem): MenuItem[] {
		const overflowItems =
			typeof item.overflowItems === 'function' ? item.overflowItems() : item.overflowItems;
		if (!disabled && !item.disabled) return overflowItems;

		return overflowItems.map((overflowItem) =>
			overflowItem.type === 'separator' ? overflowItem : { ...overflowItem, disabled: true }
		);
	}

	function getMenuItems(item: ToggleMenuMenuItem): MenuItem[] {
		return typeof item.menu === 'function' ? item.menu() : item.menu;
	}

	function createOverflowMenu(item: ToggleMenuMenuItem): MenuItem {
		return {
			type: 'submenu',
			children: item.children ?? item.ariaLabel,
			prefix: item.prefix ?? item.suffix,
			menu: getMenuItems(item),
			size: item.size ?? size,
			color: item.color ?? color,
			disabled: disabled || !!item.disabled,
			attrs: item.ariaLabel ? { 'aria-label': item.ariaLabel } : undefined
		};
	}

	function createOverflowOption(
		itemIndex: number,
		button: ToggleButtonGroupItem | ToggleMenuToggleItem,
		checked: boolean,
		group?: ToggleMenuGroupItem,
		key?: string
	): MenuItem {
		return {
			type: 'option',
			role: 'menuitemcheckbox',
			attrs: {
				'aria-checked': checked,
				'aria-label': typeof button.children === 'string' ? button.children : button.ariaLabel
			},
			children: button.children ?? button.ariaLabel,
			prefix: button.prefix,
			suffix: checked ? checkIcon : undefined,
			size: group?.size ?? size,
			color: group?.color ?? color,
			disabled: disabled || !!group?.disabled || !!button.disabled,
			onClick: () => {
				if (group && key !== undefined) {
					updateGroup(itemIndex, group, key, !checked);
					return;
				}
				const item = items[itemIndex];
				if (item?.type === 'toggle') updateToggle(itemIndex, item, !checked);
			}
		};
	}

	function createOverflowRadioOption(
		itemIndex: number,
		group: ToggleMenuRadioGroupItem,
		key: string,
		button: ToggleMenuRadioGroupButton
	): MenuItem {
		const checked = group.value === key;
		return {
			type: 'option',
			role: 'menuitemradio',
			attrs: {
				'aria-checked': checked,
				'aria-label': typeof button.children === 'string' ? button.children : button.ariaLabel
			},
			children: button.children ?? button.ariaLabel,
			prefix: button.prefix,
			suffix: checked ? checkIcon : undefined,
			size: group.size ?? size,
			color: group.color ?? color,
			disabled: disabled || !!group.disabled || !!button.disabled,
			onClick: () => updateRadioGroup(itemIndex, key)
		};
	}

	const overflowMenuItems = $derived.by(() => {
		const menuItems: MenuItem[] = [];

		items.slice(overflow.visibleCount).forEach((item, overflowIndex) => {
			const itemIndex = overflow.visibleCount + overflowIndex;
			const unitItems: MenuItem[] = [];

			if (item.type === 'toggle') {
				unitItems.push(createOverflowOption(itemIndex, item, !!item.checked));
			} else if (item.type === 'group') {
				Object.entries(item.items).forEach(([key, button]) => {
					unitItems.push(
						createOverflowOption(itemIndex, button, item.value?.[key] ?? false, item, key)
					);
				});
			} else if (item.type === 'radio-group') {
				Object.entries(item.items).forEach(([key, button]) => {
					unitItems.push(createOverflowRadioOption(itemIndex, item, key, button));
				});
			} else if (item.type === 'menu') {
				unitItems.push(createOverflowMenu(item));
			} else {
				unitItems.push(...getCustomOverflowItems(item));
			}

			if (unitItems.length === 0) return;
			if (menuItems.length > 0) menuItems.push({ type: 'separator' });
			menuItems.push(...unitItems);
		});

		return menuItems;
	});

	$effect(() => {
		items;
		size;
		color;
		variant;
		overflow.scheduleMeasure();
	});
</script>

<div
	role="toolbar"
	aria-label={ariaLabel}
	aria-orientation="horizontal"
	tabindex="-1"
	class={classes.root({ className })}
	{@attach navigation.containerReference}
	{@attach overflow.rootReference}
	{...attachments}
>
	<div class={classes.rail()} {@attach overflow.railReference}>
		{#each items as item, index}
			{@const overflowed = overflow.isOverflowed(index)}
			{#if item.type === 'group'}
				<ToggleMenuGroup
					{item}
					{size}
					{color}
					{variant}
					{disabled}
					{overflowed}
					unitClass={classes.unit()}
					unitReference={overflow.unitReference(index)}
					buttonReference={navigation.itemReference}
					onToggle={(key, checked) => updateGroup(index, item, key, checked)}
				/>
			{:else if item.type === 'radio-group'}
				<ToggleMenuRadioGroup
					{item}
					{size}
					{color}
					{variant}
					{disabled}
					{overflowed}
					unitClass={classes.unit()}
					unitReference={overflow.unitReference(index)}
					buttonReference={navigation.itemReference}
					onSelect={(value) => updateRadioGroup(index, value)}
				/>
			{:else if item.type === 'menu'}
				<ToggleMenuMenu
					{item}
					menuItems={getMenuItems(item)}
					{size}
					{color}
					{variant}
					{disabled}
					{overflowed}
					unitClass={classes.unit()}
					unitReference={overflow.unitReference(index)}
					buttonReference={navigation.itemReference}
				/>
			{:else if item.type === 'custom'}
				<span
					aria-hidden={overflowed || undefined}
					inert={overflowed || undefined}
					data-overflowed={overflowed || undefined}
					class={classes.unit({ className: item.class })}
					{@attach overflow.unitReference(index)}
				>
					{@render item.children({
						reference: overflowed ? undefined : navigation.itemReference,
						size: item.size ?? size,
						color: item.color ?? color,
						variant: item.variant ?? variant,
						disabled: disabled || !!item.disabled,
						overflowed
					})}
				</span>
			{:else}
				<span
					aria-hidden={overflowed || undefined}
					inert={overflowed || undefined}
					data-overflowed={overflowed || undefined}
					class={classes.unit()}
					{@attach overflow.unitReference(index)}
				>
					<ToggleButton
						{...getToggleProps(item)}
						size={item.size ?? size}
						color={item.color ?? color}
						variant={item.variant ?? variant}
						disabled={disabled || !!item.disabled}
						checked={item.checked ?? false}
						onChange={(checked) => updateToggle(index, item, checked)}
						{@attach overflowed ? undefined : navigation.itemReference}
						{@attach !item.children && item.ariaLabel && !overflowed
							? tooltip({ content: item.ariaLabel, delay: 350 })
							: undefined}
					/>
				</span>
			{/if}
		{/each}
	</div>

	<span
		data-overflow={overflow.hasOverflow}
		aria-hidden={!overflow.hasOverflow || undefined}
		inert={!overflow.hasOverflow || undefined}
		class={classes.more()}
		{@attach overflow.moreReference}
	>
		<PopupMenu
			menu={{ items: overflowMenuItems }}
			closeOnItemClick={false}
			position="bottom-end"
			fitTrigger={false}
		>
			{#snippet trigger(popover)}
				<Button
					variant="ghost"
					color="neutral"
					{size}
					{disabled}
					squared
					label="More tools"
					prefix={dotsThreeIcon}
					{@attach overflow.hasOverflow ? navigation.itemReference : undefined}
					{@attach popover.reference}
					onClick={() => popover.toggle()}
				/>
			{/snippet}
		</PopupMenu>
	</span>
</div>
