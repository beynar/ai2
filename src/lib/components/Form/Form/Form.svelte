<script lang="ts" generics="I extends FormInputs">
	import { getContext } from 'svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { useCardTheme } from '$lib/components/Card/card.theme.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { cx } from '$lib/utils/cva/index.js';
	import type { FormInputs, FormInput, FormRenderableInput } from './form.js';
	import FormActions from './FormActions.svelte';
	import FormInputRenderer from './FormInputRenderer.svelte';
	import type { FormProps } from './form.props.js';
	import { useFormTheme } from './form.theme.js';
	import { useForm } from './form.state.svelte.js';
	import { formCardSurfaceContextKey, type FormCardSurfaceContext } from './form.context.js';
	let {
		inputs,
		onSubmit,
		value = $bindable(),
		class: className,
		header,
		title,
		description,
		children,
		footer,
		form = $bindable(),
		size = 'normal',
		density = 'normal',
		variant = 'plain',
		layout = 'vertical',
		actions,
		submitButton,
		theme
	}: FormProps<I> = $props();

	const formState = useForm({
		get inputs() {
			return inputs;
		},
		get onSubmit() {
			return onSubmit;
		},
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		}
	});
	if (form !== formState) form = formState;
	const inputsEntries = $derived(Object.entries<FormInput>(inputs));
	const visibleInputsEntries = $derived(
		inputsEntries.filter(([, input]) =>
			input.type === 'group' ? formState.isGroupVisible(input) : formState.isFieldVisible(input)
		)
	);
	const labelPosition = $derived(layout === 'horizontal' ? 'left' : undefined);
	const hasSectionBorders = $derived(variant !== 'plain');
	const cardSurfaceContext = getContext<FormCardSurfaceContext>(formCardSurfaceContextKey);
	const hasCardSurface = $derived(variant === 'card' && !cardSurfaceContext?.isOwned);
	const cardTextVariant = $derived(hasCardSurface ? 'solid' : 'ghost');

	const classes = $derived(useFormTheme(theme));
	const cardClasses = $derived(useCardTheme());
	const submitButtonState = $derived.by(() => {
		if (!submitButton) return null;
		const { onClick, loading, disabled, size: buttonSize, ...props } = submitButton;
		return { onClick, loading, disabled, size: buttonSize, props };
	});
</script>

{#snippet headerSnippet()}
	<Slot
		render={title}
		payload={form}
		class={cx(
			cardClasses.title({ size, variant: cardTextVariant }),
			classes.formTitle({ size, variant })
		)}
	/>
	<Slot
		render={description}
		payload={formState}
		class={cx(
			cardClasses.description({ size, variant: cardTextVariant }),
			classes.formDescription({ size, variant })
		)}
	/>
{/snippet}
{#snippet inputSnippet(name: string, input: FormRenderableInput, itemClass?: string)}
	{#if input.type === 'action'}
		<FormActions
			actions={input.actions}
			form={formState}
			{size}
			label={input.label}
			description={input.description}
			labelPosition={input.labelPosition ?? labelPosition}
			class={classes.formActions({
				density,
				alignment: (input.labelPosition ?? labelPosition) === 'left' ? 'end' : 'start'
			})}
			containerClass={classes.formAction({
				className: [input.class, itemClass].filter(Boolean).join(' ')
			})}
		/>
	{:else if input.type === 'custom'}
		<Slot
			render={input.snippet}
			payload={formState}
			class={classes.formCustom({
				className: [input.class, itemClass].filter(Boolean).join(' ')
			})}
		/>
	{:else}
		<FormInputRenderer {name} {input} {size} {density} {labelPosition} {itemClass} />
	{/if}
{/snippet}
<div
	role="form"
	{@attach formState.keyboardNavigation}
	data-size={size}
	data-density={density}
	data-variant={variant}
	data-color={hasCardSurface ? 'neutral' : undefined}
	data-layout={layout}
	class={cx(
		hasCardSurface
			? cardClasses.root({
					color: 'neutral',
					variant: 'solid',
					size,
					density,
					clickable: false,
					disabled: false
				})
			: undefined,
		classes.root({ density, variant, layout, className })
	)}
>
	<Slot
		render={header ? header : title || description ? headerSnippet : undefined}
		payload={formState}
		class={cx(
			cardClasses.header({
				density,
				hasAction: false,
				hasBorder: hasSectionBorders,
				variant: cardTextVariant
			}),
			classes.formHeader({ density, variant })
		)}
	/>
	{#each visibleInputsEntries as [name, input], index (name)}
		{@const itemClass =
			variant !== 'plain' && index > 0 ? classes.formItem({ density, variant }) : undefined}
		{#if input.type === 'group'}
			<fieldset
				class={classes.formGroup({
					density,
					className: [input.class, itemClass].filter(Boolean).join(' ')
				})}
			>
				<Slot as="legend" render={input.label} class={classes.formGroupLabel({ size })} />
				<Slot as="p" render={input.description} class={classes.formGroupDescription({ size })} />
				<div
					class={classes.formGroupFields({
						density,
						layout,
						columns: layout === 'horizontal' ? 1 : (input.columns ?? 2)
					})}
				>
					{#each Object.entries<FormRenderableInput>(input.inputs) as [childName, childInput] (childName)}
						{#if formState.isFieldVisible(childInput, input)}
							{@render inputSnippet(childName, childInput)}
						{/if}
					{/each}
				</div>
			</fieldset>
		{:else}
			{@render inputSnippet(name, input, itemClass)}
		{/if}
	{/each}
	{@render children?.(formState)}
	{#if footer || actions?.length || submitButtonState}
		<div
			class={cx(
				cardClasses.footer({ density, hasBorder: hasSectionBorders }),
				classes.formFooter({ density, variant })
			)}
		>
			<Slot render={footer} payload={formState} />
			{#if actions?.length || submitButtonState}
				<FormActions
					actions={actions ?? []}
					form={formState}
					{size}
					class={classes.formActions({ density })}
				>
					{#if submitButtonState}
						<Button
							{...submitButtonState.props}
							size={submitButtonState.size ?? size}
							loading={formState.loading || submitButtonState.loading}
							disabled={formState.loading || submitButtonState.disabled}
							onClick={(payload) => {
								const submission = formState.submit();
								submitButtonState.onClick?.(payload);
								return submission;
							}}
						/>
					{/if}
				</FormActions>
			{/if}
		</div>
	{/if}
</div>
