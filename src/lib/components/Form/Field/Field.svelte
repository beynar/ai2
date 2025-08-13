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
		errorsContainerProps,
		description,
		helper,
		actions,
		error,
		suffix,
		suffixProps,
		labelProps,
		label,
		prefix,
		prefixProps,
		helperProps,
		errorProps,
		actionsProps,
		descriptionProps,
		footer,
		footerProps,
		header,
		headerProps,
		size,
		theme,
		field
	}: FieldProps<Type> = $props();

	const classes = $derived(useFieldTheme(theme));
</script>

<div class={classes.field({ className })} bind:this={field.node}>
	{#if label || actions || header}
		<Slot
			render={header}
			payload={field}
			class={classes.header({ size, required: field.required })}
			props={headerProps}
		>
			<Slot
				as="label"
				attrs={{ for: field.id }}
				class={classes.label({ size })}
				render={label}
				props={labelProps}
			/>
			<Slot
				class={classes.actions({ size })}
				render={actions}
				payload={field}
				props={actionsProps}
			/>
		</Slot>
	{/if}
	<div class={classes.inputContainer({ size })}>
		<Slot render={prefix} props={prefixProps} payload={field} class={classes.prefix({ size })} />
		{@render children()}
		<Slot render={suffix} props={suffixProps} payload={field} class={classes.suffix({ size })} />
	</div>
	{#if description || helper || footer}
		<Slot render={footer} payload={field} class={classes.footer({ size })} props={footerProps}>
			<Slot
				class={classes.description({ size })}
				render={description}
				payload={field}
				props={descriptionProps}
			/>
			<Slot class={classes.helper({ size })} render={helper} props={helperProps} />
		</Slot>
	{/if}
	{#if field.hasError && Array.isArray(field.errors)}
		<Slot
			render={errorsContainer}
			payload={field}
			class={classes.errorsContainer({ size })}
			props={errorsContainerProps}
		>
			{#each field.errors as err}
				<Slot render={error} class={classes.error({ size })} payload={field} props={errorProps}>
					{err}
				</Slot>
			{/each}
		</Slot>
	{/if}
</div>
