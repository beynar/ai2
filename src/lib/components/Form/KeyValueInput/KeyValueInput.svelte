<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import type { KeyValueInputProps } from './keyValueInput.props.js';
	import { useKeyValueInputTheme } from './keyValueInput.theme.js';
	import { plusIcon } from '../../Icons/plus.js';
	import { xIcon } from '../../Icons/x.js';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import { untrack } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		size = 'normal',
		keyPlaceholder,
		valuePlaceholder,
		addLabel,
		maxRows,
		i18n,
		theme,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		prefix,
		suffix,
		description,
		...rest
	}: KeyValueInputProps = $props();

	const id = $props.id();

	// Stable per-row uid from an instance counter. The each block is keyed by row.id
	// because keys can be empty or duplicated while typing, and duplicate/empty keys in a
	// keyed each crash Svelte.
	let uid = 0;
	const nextId = () => `${id}-row-${uid++}`;

	// Internal source of truth for the editor. Seeded ONCE from the initial value (untracked).
	let rows = $state<{ id: string; key: string; value: string }[]>(
		untrack(() => (value ?? []).map((pair) => ({ id: nextId(), key: pair.key, value: pair.value })))
	);

	// Output pairs derived from the editor rows.
	const pairs = $derived(rows.map((row) => ({ key: row.key, value: row.value })));

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
		onChange: (v) => {
			onChange?.(v ?? []);
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
		type: 'keyvalue'
	});

	// Sync OUT only: value is an output mirror of the editor rows. Reading value here would loop,
	// so we only assign it. The first flush is skipped so that seeding rows from the initial value
	// does not manufacture a spurious onChange or coerce a `null` value into `[]` on mount; after
	// that, value is only reassigned when the serialized pairs actually differ from what was last
	// emitted. Programmatic replacement of value after mount is intentionally not reconciled back
	// into rows (see mcp doc).
	let seeded = false;
	$effect(() => {
		const next = pairs;
		untrack(() => {
			if (!seeded) {
				seeded = true;
				return;
			}
			value = next;
		});
	});

	const atMaxRows = $derived(maxRows !== undefined && rows.length >= maxRows);

	// Append a fresh empty row. Never mutates the array in place.
	const addRow = () => {
		if (disabled || atMaxRows) return;
		rows = [...rows, { id: nextId(), key: '', value: '' }];
	};

	// Remove a row by id. Never mutates the array in place; early-returns when disabled.
	const removeRow = (rowId: string) => {
		if (disabled) return;
		rows = rows.filter((row) => row.id !== rowId);
	};

	// Enter must not submit an enclosing form. Backspace on a fully empty row removes it.
	const handleKeydown = (event: KeyboardEvent, row: { id: string; key: string; value: string }) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			addRow();
			return;
		}
		if (event.key === 'Backspace' && !row.key && !row.value) {
			event.preventDefault();
			removeRow(row.id);
		}
	};

	const t = $derived(useI18n(i18n));
	const classes = $derived(useKeyValueInputTheme(theme));
</script>

<!-- Rendered as a <fieldset> with id={field.id} so the Field's <label for={field.id}> resolves to
     an element that exists (mirrors TagGroup). There are N key + N value inputs, so a single input
     id could not carry the label; the fieldset groups them and the label names the group. -->
<Field
	as="fieldset"
	attrs={{ id }}
	{field}
	{description}
	{prefix}
	{suffix}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({ class: theme?.inputContainer?.base, size })
		}
	}}
	{...rest}
>
	<ul role="list" class="contents">
		{#each rows as row (row.id)}
			<li
				role="listitem"
				class={classes.row({ size })}
				animate:flip={{ duration: 200 }}
				transition:scale={{ duration: 150, start: 0.8 }}
			>
				<input
					data-1p-ignore
					type="text"
					autocomplete="off"
					bind:value={row.key}
					placeholder={keyPlaceholder ?? t.keyLabel}
					{disabled}
					class={classes.input({ size, disabled })}
					onkeydown={(event) => handleKeydown(event, row)}
				/>
				<input
					data-1p-ignore
					type="text"
					autocomplete="off"
					bind:value={row.value}
					placeholder={valuePlaceholder ?? t.valueLabel}
					{disabled}
					class={classes.input({ size, disabled })}
					onkeydown={(event) => handleKeydown(event, row)}
				/>
				<button
					type="button"
					aria-label={t.remove(row.key || t.keyLabel)}
					{disabled}
					class={classes.removeButton({ size, disabled })}
					onclick={() => removeRow(row.id)}
				>
					{@render xIcon({ size: 16 })}
				</button>
			</li>
		{/each}
	</ul>
	<button
		type="button"
		disabled={disabled || atMaxRows}
		class={classes.addButton({ size, disabled: disabled || atMaxRows })}
		onclick={addRow}
	>
		{@render plusIcon({ size: 16 })}
		{addLabel ?? t.add}
	</button>
</Field>
