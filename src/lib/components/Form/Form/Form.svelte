<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { formTheme } from './form.js';
	export const setFormTheme = setComponentTheme<typeof formTheme>('form');
	export const useFormTheme = useComponentTheme('form', formTheme);
</script>

<script lang="ts" generics="I extends FormInputs, S extends FormSubmitHandler<I>">
	import TextInput from '../TextInput/TextInput.svelte';
	import type { FormInputs, FormProps, FormSubmitHandler, FormInput } from './form.js';
	import { useForm } from './formState.svelte.js';
	import TextArea from '../TextArea/TextArea.svelte';
	import Select from '../Select/Select.svelte';
	let {
		inputs,
		onSubmit,
		value = $bindable(),
		children,
		class: className
	}: FormProps<I, S> = $props();

	useForm({
		inputs,
		onSubmit,
		value
	});
	const inputsEntries = $derived(Object.entries<FormInput>(inputs));

	const classes = $derived(useFormTheme());
</script>

<div class={classes.form({ className })}>
	{#each inputsEntries as [name, input]}
		{#if input.type === 'text'}
			<TextInput {...input} {name} />
		{:else if input.type === 'email'}
			<TextInput {...input} {name} />
		{:else if input.type === 'url'}
			<TextInput {...input} {name} />
		{:else if input.type === 'textarea'}
			<TextArea {...input} {name} />
		{:else if input.type === 'select'}
			<Select {...input} {name} />
		{:else}
			<p>Input type not supported: {input.type}</p>
		{/if}
		<!-- {#if input.type === 'switch'}
			<Switch {...input} {name} />
		{:else if input.type === 'email' || input.type === 'text'}
			<TextInput {...input} {name} />
		{:else if input.type === 'textarea'}
			<TextAreaInput {...input} {name} />
		{:else if input.type === 'select'}
			<Select {...input} {name} />
		{:else if input.type === 'number'}
			<NumberInput {...input} {name} />
		{:else if input.type === 'color'}
			<ColorInput {...input} {name} />
		{:else if input.type === 'tag'}
			<TagInput {...input} {name} />
		{:else if input.type === 'date' || input.type === 'datetime'}
			<DateInput {...input} {name} />
		{:else if input.type === 'calendar' || input.type === 'calendar-range'}
			<CalendarInput {...input} {name} />
		{:else if input.type === 'radios'}
			<RadiosInput {...input} {name} />
		{:else if input.type === 'checkboxes'}
			<CheckBoxesInput {...input} {name} />
		{:else}
			<p>Input type not supported</p>
		{/if} -->
	{/each}
	<!-- {@render children?.(form)} -->
</div>
