<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { switchInputTheme } from '$lib/components/Form/Switch/switch.js';
	export const setSwitchInputTheme = setComponentTheme<typeof switchInputTheme>('switchInput');
	export const useSwitchInputTheme = useComponentTheme('switchInput', switchInputTheme);
</script>

<script lang="ts">
	import Field, { useFieldTheme } from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { SwitchInputProps } from '$lib/components/Form/Switch/switch.js';
	import Slot from '$lib/components/Slot/Slot.svelte';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		readonly,
		visible,
		size = 'normal',
		label,
		labelProps,
		...rest
	}: SwitchInputProps = $props();

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
		onChange: (v) => {
			// console.log('onChange', v);
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		required,
		name,
		onValidate,
		readonly,
		visible,
		type: 'switch'
	});

	const classes = $derived(useSwitchInputTheme(theme));
	const fieldClasses = $derived(useFieldTheme(theme));
	const onclick = () => {
		if (disabled || readonly) return;
		value = !value;
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (disabled || readonly) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			value = !value;
		}
	};
</script>

<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({ size, class: theme?.inputContainer?.base })
		}
	}}
	{...rest}
>
	<div
		bind:this={field.node}
		data-checked={!!value}
		aria-checked={!!value}
		role="switch"
		tabindex="0"
		class={classes.toggle({ checked: !!value, size, disabled })}
		{onclick}
		onkeydown={onKeydown}
	>
		<span class={classes.thumb({ checked: !!value, size })} data-checked={!!value}></span>
	</div>
	{#snippet suffix()}
		<Slot
			as="label"
			attrs={{
				for: field.id
			}}
			render={label}
			props={labelProps}
			class={fieldClasses.label()}
		/>
	{/snippet}
</Field>
