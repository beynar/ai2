<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import type { TextAreaProps } from './textArea.props.js';
	import { useTextAreaTheme } from './textArea.theme.js';
	import { autosize } from './autosize.svelte.js';

	let {
		value = $bindable(''),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		placeholder = '',
		theme,
		disabled,
		name,
		onValidate,
		visible,
		onChange,
		rows = 3,
		maxLength,
		onPressEnter,
		...rest
	}: TextAreaProps = $props();

	const id = $props.id();

	const field = createFieldState({
		id,
		get value() {
			return value;
		},
		set value(v: string | null) {
			value = v || '';
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
		onChange: (v) => onChange?.(v ?? ''),
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
		type: 'textarea'
	});

	const classes = $derived(useTextAreaTheme(theme));
	const textareaAutosize = autosize(() => ({ value: field.value }));
</script>

<Field
	{field}
	size={rest.size}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({
				class: theme?.inputContainer?.base,
				disabled: field.disabled,
				size: rest.size
			})
		}
	}}
	{...rest}
>
	<textarea
		maxlength={maxLength}
		disabled={field.disabled}
		{rows}
		data-1p-ignore
		{@attach textareaAutosize}
		bind:this={field.node}
		{placeholder}
		bind:value={field.value}
		onkeydown={(e) => {
			if (e.key === 'Enter' && !e.shiftKey && onPressEnter) {
				e.preventDefault();
				onPressEnter?.(field);
			}
		}}
		name={field.name}
		id={field.id}
		required={field.required}
		class={classes.input({ disabled: field.disabled, size: rest.size })}></textarea>
</Field>
