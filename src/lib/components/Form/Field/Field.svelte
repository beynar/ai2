<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { fieldTheme } from './field.js';
	export const setFieldTheme = setComponentTheme<typeof fieldTheme>('field');
	export const useFieldTheme = useComponentTheme('field', fieldTheme);
</script>

<script lang="ts">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { InputType, FieldProps } from './field.js';
	type Type = $$Generic<InputType>;

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
		theme,
		field,
		as = 'div',
		attrs,
		...attachments
	}: FieldProps<Type> = $props();

	const classes = $derived(useFieldTheme(theme));
</script>

<svelte:element
	this={as}
	id={field.id}
	class={classes.field({ className, hasError: field.hasError })}
	bind:this={field.node}
	{...attrs}
	{...attachments}
>
	{#if label || actions || header}
		<Slot
			render={header}
			class={classes.header({ size, required: field.required, hasError: field.hasError })}
		>
			<Slot
				as="label"
				attrs={{ for: field.id }}
				class={classes.label({ size, hasError: field.hasError, required: field.required })}
				render={label}
			/>
			<Slot
				class={classes.actions({ size })}
				render={actions}
			/>
		</Slot>
	{/if}
	<div class={classes.inputContainer({ size, hasError: field.hasError })}>
		<Slot render={prefix} class={classes.prefix({ size })} />
		{@render children()}
		<Slot render={suffix} class={classes.suffix({ size })} />
	</div>
	{#if description || helper || footer}
		<Slot render={footer} class={classes.footer({ size })}>
			<Slot
				class={classes.description({ size })}
				render={description}
			/>
			<Slot class={classes.helper({ size })} render={helper} />
		</Slot>
	{/if}
	{#if field.hasError && Array.isArray(field.errors)}
		<Slot
			render={errorsContainer}
			class={classes.errorsContainer({ size })}
		>
			{#each field.errors as err}
				<Slot render={error} class={classes.error({ size })}>
					{err}
				</Slot>
			{/each}
		</Slot>
	{/if}
</svelte:element>
