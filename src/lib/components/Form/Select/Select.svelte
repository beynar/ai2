<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { SelectProps } from './select.props.js';
	import { useSelectTheme } from './select.theme.js';
	import { SelectState } from './select.state.svelte.js';
	import Popover from '../../Popover/Popover.svelte';
	import ScrollArea from '../../ScrollArea/ScrollArea.svelte';
	import MenuOption from '../../MenuOption/MenuOption.svelte';
	import type { PopoverState } from '../../Popover/popover.state.svelte.js';
	import { caretDownIcon } from '../../Icons/caretDown.js';
	import { checkIcon } from '../../Icons/check.js';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		placeholder = 'Select an option',
		theme,
		disabled,
		name,
		size = 'normal',
		onValidate,
		onChange,
		visible,
		items,
		separators = true,
		...rest
	}: SelectProps = $props();

	const id = $props.id();

	const field = createFieldState({
		id,
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get errors() {
			return errors;
		},
		set errors(v: any) {
			errors = v;
		},
		get focused() {
			return focused;
		},
		set focused(v: boolean) {
			focused = v;
		},
		get onChange() {
			return onChange;
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		get required() {
			return required;
		},
		get name() {
			return name;
		},
		set name(v: string | undefined) {
			name = v;
		},
		get onValidate() {
			return onValidate;
		},
		get visible() {
			return visible;
		},
		type: 'select'
	});

	const select = new SelectState({
		id,
		get items() {
			return items;
		},
		get value() {
			return field.value;
		},
		set value(v) {
			field.value = v;
		},
		get disabled() {
			return field.disabled;
		},
		get triggerEl() {
			return field.node;
		},
		set triggerEl(_) {
			// field.node is owned by the bind:this below.
		}
	});

	const classes = $derived(useSelectTheme(theme));
</script>

{#snippet checkMark()}
	{@render checkIcon({})}
{/snippet}

<Popover
	closeOnClickOutside={false}
	closeOnEscape={false}
	fitTrigger
	position="bottom"
	size="small"
	open={select.isOpen}
>
	{#snippet children(popover: PopoverState)}
		<!-- Virtual focus: DOM focus stays on the combobox trigger; tabindex=-1 keeps the
		     listbox out of the tab order while remaining a valid programmatic target. -->
		<div
			id={select.listboxId}
			role="listbox"
			aria-label="Options"
			tabindex={-1}
			class={classes.content({ size })}
			onmousedown={(event) => {
				// Keep DOM focus on the trigger for ANY press inside the panel (group labels,
				// separators, padding, scrollbar) — otherwise the trigger blurs and the dropdown
				// closes before the click lands.
				event.preventDefault();
			}}
		>
			<ScrollArea scrollOnEdges type="auto" class="flex max-h-[240px] flex-col">
				{#each select.renderGroups as group, groupIndex (groupIndex)}
					{#if separators && groupIndex > 0}
						<div role="separator" class={classes.separator({ size })}></div>
					{/if}
					<div role="group" aria-label={group.label} class={classes.group({ size })}>
						{#if group.label}
							<div aria-hidden="true" class={classes.groupLabel({ size })}>{group.label}</div>
						{/if}
						{#each group.items as option (option.value)}
							<MenuOption
								as="button"
								role="option"
								{size}
								title={option.label}
								highlighted={select.nav.highlighted === option.value}
								selected={field.value === option.value}
								disabled={!!option.disabled}
								suffix={field.value === option.value ? checkMark : undefined}
								onClick={() => select.selectValue(option.value)}
								attrs={{
									id: select.optionId(option.value),
									tabindex: -1,
									onpointermove: () => {
										if (!option.disabled) select.nav.setHighlighted(option.value);
									}
								}}
							/>
						{/each}
					</div>
				{/each}
			</ScrollArea>
		</div>
	{/snippet}
	{#snippet trigger(popover: PopoverState)}
		<Field
			{field}
			{size}
			theme={{
				...(theme || {}),
				inputContainer: {
					...(theme?.inputContainer || {}),
					base: classes.inputContainer({
						class: theme?.inputContainer?.base,
						size,
						disabled: field.disabled
					})
				}
			}}
			{...rest}
			{@attach popover.reference}
		>
			<button
				type="button"
				{id}
				bind:this={field.node}
				role="combobox"
				aria-haspopup="listbox"
				aria-expanded={select.isOpen}
				aria-controls={select.isOpen ? select.listboxId : undefined}
				aria-activedescendant={select.isOpen ? select.nav.activeDescendant : undefined}
				aria-required={required || undefined}
				data-placeholder={select.selectedOption ? undefined : ''}
				disabled={field.disabled}
				class={classes.input({ size, disabled: field.disabled })}
				onclick={select.toggle}
				onkeydown={select.onTriggerKeydown}
				onfocus={() => (field.focused = true)}
				onblur={() => {
					field.focused = false;
					select.close();
				}}
			>
				<span class={classes.value({ size, placeholder: !select.selectedOption })}>
					{select.selectedOption?.label ?? placeholder}
				</span>
				{@render caretDownIcon({ class: classes.triggerIcon({ size }) })}
			</button>
		</Field>
	{/snippet}
</Popover>

{#if name}
	<input type="hidden" {name} value={field.value ?? ''} />
{/if}
