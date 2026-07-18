<script lang="ts" generics="TData">
	import type { Row } from '@tanstack/table-core';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';
	import DateInput from '../Form/DateInput/DateInput.svelte';
	import NumberInput from '../Form/NumberInput/NumberInput.svelte';
	import Select from '../Form/Select/Select.svelte';
	import Switch from '../Form/Switch/Switch.svelte';
	import TextInput from '../Form/TextInput/TextInput.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { DataTableClasses } from './dataTable.theme.js';
	import type { DataTableModel } from './dataTable.model.svelte.js';

	let {
		row,
		columnId,
		model,
		classes,
		density
	}: {
		row: Row<TData>;
		columnId: string;
		model: DataTableModel<TData>;
		classes: DataTableClasses;
		density: 'small' | 'normal' | 'large';
	} = $props();

	const config = $derived(model.getColumnConfig(columnId));
	const editor = $derived(config?.editor);
	const payload = $derived(model.getEditorPayload());

	const focusEditor: Attachment<HTMLElement> = (element) => {
		queueMicrotask(() => {
			const target = element.querySelector<HTMLElement>(
				'input, button, [tabindex]:not([tabindex="-1"])'
			);
			target?.focus();
			if (target instanceof HTMLInputElement && target.type !== 'checkbox') target.select();
		});
	};

	const handleKeydown = async (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			model.cancelEditing();
			return;
		}
		if (event.key === 'Tab') {
			event.preventDefault();
			const committed = await model.commitEditing();
			if (committed) model.moveEditing(row, columnId, event.shiftKey ? -1 : 1);
			return;
		}
		if (editor?.type === 'custom') return;
		if (event.key === 'Enter') {
			event.preventDefault();
			const cell = (event.currentTarget as HTMLElement).closest<HTMLElement>('td');
			if (await model.commitEditing()) cell?.focus();
		}
	};

	const editorKeyboard: Attachment<HTMLElement> = (element) => {
		element.addEventListener('keydown', handleKeydown);
		return () => element.removeEventListener('keydown', handleKeydown);
	};

	const ownsClickTarget = (element: HTMLElement, target: EventTarget | null) => {
		if (!(target instanceof Node)) return false;
		if (element.contains(target)) return true;

		for (const controller of element.querySelectorAll<HTMLElement>('[aria-controls]')) {
			const controlledIds = controller.getAttribute('aria-controls')?.split(/\s+/) ?? [];
			for (const controlledId of controlledIds) {
				if (element.ownerDocument.getElementById(controlledId)?.contains(target)) return true;
			}
		}

		return false;
	};

	const commitOnClickOutside: Attachment<HTMLElement> = (element) =>
		on(element.ownerDocument, 'click', (event) => {
			if (ownsClickTarget(element, event.target)) return;
			void model.commitEditing();
		});

	const commitDate = (value: Date | null) => {
		payload?.setDraft(value);
		void model.commitEditing();
	};

	const errorMessage = $derived.by(() => {
		if (payload?.error instanceof Error) return payload.error.message;
		if (payload?.error) return 'Could not save';
		return '';
	});

	const fieldTheme = $derived({
		input: { base: classes.editorInput() },
		inputContainer: { base: classes.editorInputContainer({ density }) }
	});
</script>

{#if payload && editor && payload.rowId === row.id && payload.columnId === columnId}
	<div
		role="group"
		class={classes.editor()}
		{@attach focusEditor}
		{@attach editorKeyboard}
		{@attach commitOnClickOutside}
	>
		{#if editor.type === 'text'}
			<TextInput
				size="normal"
				class={classes.editorField()}
				theme={fieldTheme}
				placeholder={editor.placeholder}
				disabled={payload.pending}
				value={payload.draft == null ? '' : String(payload.draft)}
				onChange={(value) => payload.setDraft(value ?? '')}
			/>
		{:else if editor.type === 'number'}
			<NumberInput
				size="normal"
				class={classes.editorField()}
				theme={fieldTheme}
				min={editor.min}
				max={editor.max}
				step={editor.step}
				showControls={false}
				disabled={payload.pending}
				value={typeof payload.draft === 'number' ? payload.draft : null}
				onChange={payload.setDraft}
			/>
		{:else if editor.type === 'select'}
			<Select
				size="normal"
				class={classes.editorField()}
				theme={fieldTheme}
				items={[...editor.options]}
				disabled={payload.pending}
				value={payload.draft == null ? null : String(payload.draft)}
				onChange={payload.setDraft}
			/>
		{:else if editor.type === 'date'}
			<DateInput
				size="normal"
				class={classes.editorField()}
				theme={fieldTheme}
				minDate={editor.min}
				maxDate={editor.max}
				disabled={payload.pending}
				value={payload.draft instanceof Date ? payload.draft : null}
				onChange={commitDate}
			/>
		{:else if editor.type === 'switch'}
			<Switch
				size="small"
				class={classes.editorField()}
				theme={{ inputContainer: { base: classes.editorSwitchContainer() } }}
				ariaLabel={`Edit ${columnId}`}
				disabled={payload.pending}
				value={Boolean(payload.draft)}
				onChange={payload.setDraft}
			/>
		{:else}
			<Slot render={editor.render} {payload} />
		{/if}

		{#if errorMessage}
			<div role="alert" class={classes.editorError()}>{errorMessage}</div>
		{/if}
	</div>
{/if}
