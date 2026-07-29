<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
	import { fieldTheme, type FieldTheme } from './field.js';

	export const setFieldTheme = setComponentTheme<FieldTheme>('field');
	export const useFieldTheme = useComponentTheme<FieldTheme>('field', fieldTheme);
</script>

<script lang="ts" generics="Type extends InputType">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { InputType, FieldProps } from './field.js';

	let {
		class: className = '',
		children,
		errorsContainer,
		description,
		helper,
		actions,
		error,
		suffix,
		label,
		prefix,
		footer,
		header,
		size,
		labelPosition = 'top',
		theme,
		field,
		as = 'div',
		labelFor = field.id,
		attrs,
		...attachments
	}: FieldProps<Type> = $props();

	const classes = $derived(useFieldTheme(theme));
	const resolvedLabelPosition = $derived(
		label || actions || header ? labelPosition : ('top' as const)
	);

	$effect(() => {
		const control = field.node ?? field.rootNode;
		if (!control) return;

		const initialInvalid = control.getAttribute('aria-invalid');
		const initialDescribedBy = control.getAttribute('aria-describedby');
		const initialLabelledBy = control.getAttribute('aria-labelledby');
		const currentDescribedByIds =
			control.getAttribute('aria-describedby')?.split(/\s+/).filter(Boolean) ?? [];
		let describedByIds = currentDescribedByIds.filter((id) => id !== field.errorId);
		if (field.hasError) {
			control.setAttribute('aria-invalid', 'true');
			describedByIds = [...describedByIds, field.errorId];
		}

		if (describedByIds.length === 0) control.removeAttribute('aria-describedby');
		else control.setAttribute('aria-describedby', describedByIds.join(' '));

		const currentLabelledByIds =
			control.getAttribute('aria-labelledby')?.split(/\s+/).filter(Boolean) ?? [];
		let labelledByIds = currentLabelledByIds.filter((id) => id !== field.labelId);
		if (label && labelFor === false && as !== 'fieldset') {
			labelledByIds = [...labelledByIds, field.labelId];
		}

		if (labelledByIds.length === 0) control.removeAttribute('aria-labelledby');
		else control.setAttribute('aria-labelledby', labelledByIds.join(' '));

		return () => {
			if (initialInvalid === null) control.removeAttribute('aria-invalid');
			else control.setAttribute('aria-invalid', initialInvalid);
			if (initialDescribedBy === null) control.removeAttribute('aria-describedby');
			else control.setAttribute('aria-describedby', initialDescribedBy);
			if (initialLabelledBy === null) control.removeAttribute('aria-labelledby');
			else control.setAttribute('aria-labelledby', initialLabelledBy);
		};
	});
</script>

<!-- Suffixed id: the bare field.id belongs to the control element, so <label for={field.id}>
     resolves to it — a duplicate id here (first in tree order) would steal the label linkage. -->
<svelte:element
	this={as}
	data-label-position={resolvedLabelPosition}
	class={classes.root({
		className,
		hasError: field.hasError,
		labelPosition: resolvedLabelPosition
	})}
	bind:this={field.rootNode}
	{...attrs}
	id="{field.id}-field"
	{...attachments}
>
	{#if label || actions || header}
		{#if as === 'fieldset'}
			<Slot
				as="legend"
				render={header}
				attrs={{ id: field.labelId }}
				class={classes.header({
					size,
					required: field.required,
					hasError: field.hasError,
					labelPosition: resolvedLabelPosition
				})}
			>
				<Slot
					as="span"
					class={classes.label({ size, hasError: field.hasError, required: field.required })}
					render={label}
				/>
				<Slot class={classes.actions({ size })} render={actions} />
			</Slot>
		{:else}
			<Slot
				render={header}
				class={classes.header({
					size,
					required: field.required,
					hasError: field.hasError,
					labelPosition: resolvedLabelPosition
				})}
			>
				<Slot
					as={labelFor === false ? 'span' : 'label'}
					attrs={labelFor === false ? { id: field.labelId } : { id: field.labelId, for: labelFor }}
					class={classes.label({ size, hasError: field.hasError, required: field.required })}
					render={label}
				/>
				<Slot class={classes.actions({ size })} render={actions} />
			</Slot>
		{/if}
	{/if}
	<div
		class={classes.inputContainer({
			size,
			hasError: field.hasError,
			labelPosition: resolvedLabelPosition
		})}
	>
		<Slot render={prefix} class={classes.prefix({ size })} />
		{@render children()}
		<Slot render={suffix} class={classes.suffix({ size })} />
	</div>
	{#if description || helper || footer}
		<Slot render={footer} class={classes.footer({ size, labelPosition: resolvedLabelPosition })}>
			<Slot class={classes.description({ size })} render={description} />
			<Slot class={classes.helper({ size })} render={helper} />
		</Slot>
	{/if}
	{#if field.hasError}
		<Slot
			render={errorsContainer}
			class={classes.errorsContainer({ size, labelPosition: resolvedLabelPosition })}
			attrs={{ id: field.errorId, role: 'alert', 'aria-live': 'polite' }}
		>
			{#each field.errorMessages as err, index (index)}
				<Slot render={error} class={classes.error({ size })}>
					{err}
				</Slot>
			{/each}
		</Slot>
	{/if}
</svelte:element>
