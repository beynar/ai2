<script lang="ts" generics="I extends FormInputs">
	import TextInput from '../TextInput/TextInput.svelte';
	import NumberInput from '../NumberInput/NumberInput.svelte';
	import type { FormInputs, FormSubmitHandler, FormInput, InferFormValue } from './form.js';
	import type { FormProps } from './form.props.js';
	import { useFormTheme } from './form.theme.js';
	import { useForm } from './formState.svelte.js';
	import { isFieldVisible, prepareInputProps } from './visibility.js';
	import TextArea from '../TextArea/TextArea.svelte';
	import Select from '../Select/Select.svelte';
	import Combobox from '../Combobox/Combobox.svelte';
	import RadioInput from '../RadioInput/RadioInput.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import CheckBoxesInput from '../CheckboxesInput/CheckBoxesInput.svelte';
	import Switch from '../Switch/Switch.svelte';
	import PasswordInput from '../PasswordInput/Password.svelte';
	import PhoneInput from '../PhoneInput/PhoneInput.svelte';
	import CalendarInput from '../Calendar/CalendarInput.svelte';
	import DateInput from '../DateInput/DateInput.svelte';
	import FileInput from '../File/FileInput.svelte';
	import TimeInput from '../TimeInput/TimeInput.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	let {
		inputs,
		onSubmit,
		value = $bindable(),
		class: className,
		header,
		title,
		description,
		children,
		form = $bindable(),
		submitButton
	}: FormProps<I> = $props();

	form = useForm({
		inputs,
		onSubmit,
		value
	});
	const inputsEntries = $derived(Object.entries<FormInput>(inputs));

	// Filter visible fields reactively
	const visibleInputsEntries = $derived(
		inputsEntries.filter(([name, input]) => isFieldVisible(input, form.value))
	);

	const classes = $derived(useFormTheme());
</script>

{#snippet headerSnippet()}
	<Slot render={title} class={classes.formTitle()} />
	<Slot
		render={description}
		class={classes.formDescription()}
	/>
{/snippet}
<div class={classes.form({ className })}>
	<Slot
		render={header ? header : title || description ? headerSnippet : undefined}
		class={classes.formHeader()}
	/>
	{#each visibleInputsEntries as [name, input]}
		{@const inputProps = prepareInputProps(input)}
		{#if input.type === 'text'}
			<TextInput {...inputProps as any} {name} />
		{:else if input.type === 'email'}
			<TextInput {...inputProps as any} {name} />
		{:else if input.type === 'url'}
			<TextInput {...inputProps as any} {name} />
		{:else if input.type === 'number'}
			<NumberInput {...inputProps as any} {name} />
		{:else if input.type === 'textarea'}
			<TextArea {...inputProps as any} {name} />
		{:else if input.type === 'select'}
			<Select {...inputProps as any} {name} />
		{:else if input.type === 'combobox'}
			<Combobox {...inputProps as any} {name} />
		{:else if input.type === 'radio'}
			<RadioInput {...inputProps as any} {name} />
		{:else if input.type === 'checkboxes'}
			<CheckBoxesInput {...inputProps as any} {name} />
		{:else if input.type === 'switch'}
			<Switch {...inputProps as any} {name} />
		{:else if input.type === 'password'}
			<PasswordInput {...inputProps as any} {name} />
		{:else if input.type === 'phone'}
			<PhoneInput {...inputProps as any} {name} />
		{:else if input.type === 'calendar' || input.type === 'calendar-range'}
			<CalendarInput {...inputProps as any} {name} />
		{:else if input.type === 'date' || input.type === 'datetime'}
			<DateInput {...inputProps as any} {name} />
		{:else if input.type === 'file'}
			<FileInput {...inputProps as any} {name} mode="single" />
		{:else if input.type === 'files'}
			<FileInput {...inputProps as any} {name} mode="multiple" />
		{:else if input.type === 'time'}
			<TimeInput {...inputProps as any} {name} />
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
	{#if submitButton}
		<Button onClick={() => form.submit()} {...submitButton} />
	{/if}
</div>
