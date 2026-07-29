<script lang="ts" generics="State">
	import Button from '$lib/components/Button/Button.svelte';
	import type { ButtonProps } from '$lib/components/Button/index.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Slot as SlotValue } from '$lib/components/Slot/slot.js';
	import type { Snippet } from 'svelte';
	import type { Sizes } from '$lib/types/theme.js';
	import { cx } from '$lib/utils/cva/index.js';
	import { useFieldTheme } from '../Field/Field.svelte';
	import type { FieldLabelPosition } from '../Field/field.js';
	import type { MaybePromise } from './form.js';

	type Action = Omit<ButtonProps, 'onClick' | 'payload'> & {
		onClick?: (form: State) => MaybePromise<unknown>;
	};

	let {
		actions,
		form,
		size,
		class: className,
		containerClass,
		label,
		description,
		labelPosition = 'top',
		children
	}: {
		actions: Action[];
		form: State & { loading: boolean };
		size: Sizes;
		class: string;
		containerClass?: string;
		label?: SlotValue;
		description?: SlotValue;
		labelPosition?: FieldLabelPosition;
		children?: Snippet;
	} = $props();

	const fieldClasses = $derived(useFieldTheme());
	const resolvedLabelPosition = $derived(label || description ? labelPosition : 'top');
	const actionStates = $derived(
		actions.map(({ onClick, loading, disabled, size: actionSize, ...props }) => ({
			onClick,
			loading,
			disabled,
			size: actionSize,
			props
		}))
	);
</script>

{#snippet buttons()}
	{#each actionStates as actionState, index (index)}
		<Button
			{...actionState.props}
			size={actionState.size ?? size}
			loading={form.loading || actionState.loading}
			disabled={form.loading || actionState.disabled}
			onClick={() => actionState.onClick?.(form)}
		/>
	{/each}
	{@render children?.()}
{/snippet}

{#if label || description}
	<div
		data-label-position={resolvedLabelPosition}
		class={cx(
			fieldClasses.root({
				className: containerClass,
				hasError: false,
				labelPosition: resolvedLabelPosition
			}),
			resolvedLabelPosition === 'left' && 'md:flex md:items-start md:gap-x-6'
		)}
	>
		{#if label || description}
			<div
				class={cx(
					fieldClasses.header({
						size,
						required: false,
						hasError: false,
						labelPosition: resolvedLabelPosition
					}),
					'grid items-start gap-1',
					resolvedLabelPosition === 'left' && 'md:min-w-0 md:flex-1'
				)}
			>
				{#if label}
					<Slot
						class={fieldClasses.label({ size, hasError: false, required: false })}
						render={label}
					/>
				{/if}
				{#if description}
					<Slot class={fieldClasses.description({ size })} render={description} />
				{/if}
			</div>
		{/if}
		<div
			class={cx(
				fieldClasses.inputContainer({
					size,
					hasError: false,
					labelPosition: resolvedLabelPosition
				}),
				resolvedLabelPosition === 'left' && 'md:w-auto md:flex-none md:shrink-0'
			)}
		>
			<div class={cx(className, resolvedLabelPosition === 'left' && 'md:w-auto md:flex-nowrap')}>
				{@render buttons()}
			</div>
		</div>
	</div>
{:else}
	<div class={[containerClass, className].filter(Boolean).join(' ')}>{@render buttons()}</div>
{/if}
