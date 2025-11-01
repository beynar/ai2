<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { textAreaTheme } from '$lib/components/Form/TextArea/textArea.js';
	export const setTextAreaTheme = setComponentTheme<typeof textAreaTheme>('textArea');
	export const useTextAreaTheme = useComponentTheme('textArea', textAreaTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { TextAreaProps } from '$lib/components/Form/TextArea/textArea.js';
	import { autosize } from './autosize.js';

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
		readonly,
		visible,
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
		set value(v: string) {
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
		type: 'text'
	});

	const classes = $derived(useTextAreaTheme(theme));
</script>

<Field
	{field}
	theme={{
		inputContainer: {
			base: classes.inputContainer()
		},
		...(theme || {})
	}}
	{...rest}
>
	<textarea
		maxlength={maxLength}
		disabled={field.disabled}
		readonly={field.readonly}
		{rows}
		data-1p-ignore
		use:autosize={{ value: field.value }}
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
		class={classes.input()}
	></textarea>
</Field>
