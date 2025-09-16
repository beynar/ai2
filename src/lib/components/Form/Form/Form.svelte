<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { formTheme } from './form.js';
	export const setFormTheme = setComponentTheme<typeof formTheme>('form');
	export const useFormTheme = useComponentTheme('form', formTheme);
</script>

<script lang="ts" generics="I extends FormInputs">
	import TextInput from '../TextInput/TextInput.svelte';
	import NumberInput from '../NumberInput/NumberInput.svelte';
	import type { FormInputs, FormProps, FormSubmitHandler, FormInput } from './form.js';
	import { useForm } from './formState.svelte.js';
	import TextArea from '../TextArea/TextArea.svelte';
	import Select from '../Select/Select.svelte';
	import RadioInput from '../RadioInput/RadioInput.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import CheckBoxesInput from '../CheckboxesInput/CheckBoxesInput.svelte';
	import Switch from '../Switch/Switch.svelte';
	let {
		inputs,
		onSubmit,
		value = $bindable(),
		class: className,
		header,
		headerProps,
		title,
		titleProps,
		description,
		descriptionProps,
		children,
		form = $bindable()
	}: FormProps<I> = $props();

	form = useForm({
		inputs,
		onSubmit,
		value
	});
	const inputsEntries = $derived(Object.entries<FormInput>(inputs));

	const classes = $derived(useFormTheme());
</script>

{#snippet headerSnippet()}
	<Slot render={title} payload={form} props={titleProps} class={classes.formTitle()} />
	<Slot
		render={description}
		payload={form}
		props={descriptionProps}
		class={classes.formDescription()}
	/>
{/snippet}
<div class={classes.form({ className })}>
	<Slot
		render={header ? header : title || description ? headerSnippet : undefined}
		payload={form}
		props={headerProps}
		class={classes.formHeader()}
	/>
	{#each inputsEntries as [name, input]}
		{#if input.type === 'text'}
			<TextInput {...input} {name} />
		{:else if input.type === 'email'}
			<TextInput {...input} {name} />
		{:else if input.type === 'url'}
			<TextInput {...input} {name} />
		{:else if input.type === 'number'}
			<NumberInput {...input} {name} />
		{:else if input.type === 'textarea'}
			<TextArea {...input} {name} />
		{:else if input.type === 'select'}
			<Select {...input} {name} />
		{:else if input.type === 'radio'}
			<RadioInput {...input} {name} />
		{:else if input.type === 'checkboxes'}
			<CheckBoxesInput {...input} {name} />
		{:else if input.type === 'switch'}
			<Switch {...input} {name} />
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
			<RadioInput {...input} {name} />
		{:else if input.type === 'checkboxes'}
			<CheckBoxesInput {...input} {name} />
		{:else}
			<p>Input type not supported</p>
		{/if} -->
	{/each}
	{@render children?.(form)}
</div>
