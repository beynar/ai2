<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import ColorPicker from './ColorPicker.svelte';
	import type { ColorPickerInputProps } from './colorPicker.props.js';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		theme,
		format,
		size,
		i18n,
		...rest
	}: ColorPickerInputProps = $props();

	const id = $props.id();

	const field = createFieldState<'color'>({
		id,
		get value() {
			return value;
		},
		set value(v: string | null | undefined) {
			value = v ?? null;
		},
		get errors() {
			return errors;
		},
		set errors(v: string[] | boolean) {
			errors = v;
		},
		get focused() {
			return focused;
		},
		set focused(v: boolean) {
			focused = v;
		},
		onChange: (v) => {
			onChange?.(v);
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
		get type() {
			return 'color' as const;
		}
	});
</script>

<Field as="fieldset" {field} {size} theme={theme?.field} {...rest}>
	<!-- display:contents wrapper: zero layout impact, catches bubbled focus so
	     bind:focused works like on the text inputs. -->
	<div
		class="contents"
		onfocusin={() => (field.focused = true)}
		onfocusout={(e) => {
			if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) {
				field.focused = false;
			}
		}}
	>
		<ColorPicker
			value={field.value ?? undefined}
			onChange={(v) => {
				field.value = v;
			}}
			{format}
			{size}
			{i18n}
			disabled={field.disabled}
			theme={theme?.picker}
		/>
	</div>
</Field>
