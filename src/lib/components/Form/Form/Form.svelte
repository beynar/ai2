<script lang="ts" generics="I extends FormInputs">
	import TextInput from '../TextInput/TextInput.svelte';
	import NumberInput from '../NumberInput/NumberInput.svelte';
	import RatingInput from '../RatingInput/RatingInput.svelte';
	import Slider from '../Slider/Slider.svelte';
	import type { SliderProps } from '../Slider/slider.props.js';
	import type { FormInputs, FormSubmitHandler, FormInput, InferFormValue } from './form.js';
	import type { FormProps } from './form.props.js';
	import { useFormTheme } from './form.theme.js';
	import { useForm } from './form.state.svelte.js';
	import { isFieldVisible, prepareInputProps } from './visibility.js';
	import TextArea from '../TextArea/TextArea.svelte';
	import Select from '../Select/Select.svelte';
	import Combobox from '../Combobox/Combobox.svelte';
	import RadioInput from '../RadioInput/RadioInput.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import CheckboxesInput from '../CheckboxesInput/CheckboxesInput.svelte';
	import Switch from '../Switch/Switch.svelte';
	import PasswordInput from '../PasswordInput/Password.svelte';
	import PhoneInput from '../PhoneInput/PhoneInput.svelte';
	import CalendarInput from '../Calendar/CalendarInput.svelte';
	import DateInput from '../DateInput/DateInput.svelte';
	import FileInput from '../File/FileInput.svelte';
	import TagGroup from '../TagGroup/TagGroup.svelte';
	import TagsInput from '../TagsInput/TagsInput.svelte';
	import KeyValueInput from '../KeyValueInput/KeyValueInput.svelte';
	import PinInput from '../PinInput/PinInput.svelte';
	import Checkbox from '../Checkbox/Checkbox.svelte';
	import TimeInput from '../TimeInput/TimeInput.svelte';
	import RichTextInput from '../../RichTextInput/RichTextInput.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import type { TagsInputProps } from '../TagsInput/tagsInput.props.js';
	import type { KeyValueInputProps } from '../KeyValueInput/keyValueInput.props.js';
	import type { PinInputProps } from '../PinInput/pinInput.props.js';
	import type { CheckboxProps } from '../Checkbox/checkbox.props.js';
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
	const inputsEntries = $derived(Object.entries<FormInput>(inputs));

	// Filter visible fields reactively
	const visibleInputsEntries = $derived(
		inputsEntries.filter(([name, input]) => isFieldVisible(input, form.value))
	);

	const classes = $derived(useFormTheme());
</script>

{#snippet headerSnippet()}
	<Slot render={title} class={classes.formTitle()} />
	<Slot render={description} class={classes.formDescription()} />
{/snippet}
<div class={classes.root({ className })}>
	<Slot
		render={header ? header : title || description ? headerSnippet : undefined}
		class={classes.formHeader()}
	/>
	{#each visibleInputsEntries as [name, input]}
		{@const inputProps = prepareInputProps(input)}
		{#if input.type === 'text'}
			<TextInput {...inputProps as any} type={input.type} {name} />
		{:else if input.type === 'email'}
			<TextInput {...inputProps as any} type={input.type} {name} />
		{:else if input.type === 'url'}
			<TextInput {...inputProps as any} type={input.type} {name} />
		{:else if input.type === 'number'}
			<NumberInput {...inputProps as any} {name} />
		{:else if input.type === 'rating'}
			<RatingInput {...inputProps as any} {name} />
		{:else if input.type === 'slider'}
			<Slider {...inputProps as SliderProps} {name} />
		{:else if input.type === 'slider-range'}
			<Slider {...inputProps as SliderProps} {name} mode="range" />
		{:else if input.type === 'textarea'}
			<TextArea {...inputProps as any} {name} />
		{:else if input.type === 'rich-text'}
			<RichTextInput {...inputProps as any} {name} />
		{:else if input.type === 'select'}
			<Select {...inputProps as any} {name} />
		{:else if input.type === 'combobox'}
			<Combobox {...inputProps as any} {name} />
		{:else if input.type === 'radio'}
			<RadioInput {...inputProps as any} {name} />
		{:else if input.type === 'checkboxes'}
			<CheckboxesInput {...inputProps as any} {name} />
		{:else if input.type === 'checkbox'}
			<Checkbox {...inputProps as CheckboxProps} {name} />
		{:else if input.type === 'switch'}
			<Switch {...inputProps as any} {name} />
		{:else if input.type === 'password'}
			<PasswordInput {...inputProps as any} {name} />
		{:else if input.type === 'phone'}
			<PhoneInput {...inputProps as any} {name} />
		{:else if input.type === 'calendar' || input.type === 'calendar-range'}
			<CalendarInput {...inputProps as any} type={input.type} {name} />
		{:else if input.type === 'date' || input.type === 'datetime'}
			<DateInput {...inputProps as any} type={input.type} {name} />
		{:else if input.type === 'file'}
			<FileInput {...inputProps as any} {name} mode="single" />
		{:else if input.type === 'files'}
			<FileInput {...inputProps as any} {name} mode="multiple" />
		{:else if input.type === 'tag-group'}
			<TagGroup {...inputProps as any} {name} />
		{:else if input.type === 'tag'}
			<TagsInput {...inputProps as TagsInputProps} {name} />
		{:else if input.type === 'keyvalue'}
			<KeyValueInput {...inputProps as KeyValueInputProps} {name} />
		{:else if input.type === 'pin'}
			<PinInput {...inputProps as PinInputProps} {name} />
		{:else if input.type === 'time'}
			<TimeInput {...inputProps as any} {name} />
		{:else}
			<p>Input type not supported: {input.type}</p>
		{/if}
	{/each}
	{@render children?.(form)}
	{#if submitButton}
		<Button onClick={() => form.submit()} {...submitButton} />
	{/if}
</div>
