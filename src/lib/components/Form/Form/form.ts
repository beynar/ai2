import type { Snippet } from 'svelte';
import type { FieldValue } from '../Field/field.js';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type { TextInputProps } from '../TextInput/textInput.js';
import type { NumberInputProps } from '../NumberInput/numberInput.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { TextAreaProps } from '../TextArea/textArea.js';
import type { SelectProps } from '../Select/select.js';
import type { RadioInputProps } from '../RadioInput/radioInput.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { CheckBoxesInputProps } from '../CheckboxesInput/checkBoxesInput.def.js';
import type { SwitchInputProps } from '../Switch/switch.js';
import type { FormState as FS } from './formState.svelte.js';
import type { PhoneInputProps } from '../PhoneInput/phoneInput.js';
import type { CalendarInputProps } from '../Calendar/calendarInput.js';
import type { DateInputProps } from '../DateInput/dateInput.js';
import type { FileInputProps } from '../File/fileInput.js';
import type { TimeInputProps } from '../TimeInput/timeInput.def.js';
export type MaybePromise<T> = T | Promise<T>;

export type FormInputs = Record<string, FormInput>;

export type FormInput =
	| ({
			type: 'time';
	  } & TimeInputProps)
	| ({
			type: 'phone';
	  } & PhoneInputProps)
	| ({
			type: 'number';
	  } & NumberInputProps)
	| ({
			type: 'calendar' | 'calendar-range';
	  } & CalendarInputProps<'calendar' | 'calendar-range'>)
	| ({
			type: 'date' | 'datetime';
	  } & DateInputProps)
	| ({
			type: 'text' | 'email' | 'url';
	  } & TextInputProps)
	| ({
			type: 'password';
	  } & TextInputProps)
	| ({
			type: 'number';
	  } & NumberInputProps)
	| ({
			type: 'textarea';
	  } & TextAreaProps)
	| ({
			type: 'select';
	  } & SelectProps)
	| ({
			type: 'radio';
	  } & RadioInputProps)
	| ({
			type: 'checkboxes';
	  } & CheckBoxesInputProps)
	| ({
			type: 'switch';
	  } & SwitchInputProps)
	| ({
			type: 'file';
	  } & FileInputProps<'single'>)
	| ({
			type: 'files';
	  } & FileInputProps<'multiple'>);
// | ({
// 		type: 'switch';
//   } & SwitchInputProps)
// | ({
// 		type: 'textarea';
//   } & TextAreaProps)
// | ({
// 		type: 'select';
//   } & SelectProps<BaseOption>)
// | ({
// 		type: 'color';
//   } & ColorInputProps)
// | ({
// 		type: 'tag';
//   } & TagInputProps)
// | ({
// 		type: 'date' | 'datetime';
//   } & DateInputProps)
// | ({
// 		type: CalendarType;
//   } & CalendarProps<any, CalendarType>)
// | ({
// 		type: 'number';
//   } & NumberInputProps)
// | ({
// 		type: 'file';
//   } & FileInputProps<'file'>)
// | ({
// 		type: 'files';
//   } & FileInputProps<'files'>)
// | ({
// 		type: 'radios';
//   } & RadioInputProps)
// | ({
// 		type: 'checkboxes';
//   } & CheckBoxesInputProps);

type FormState<T extends FormInputs> = {
	[K in keyof T]: T[K] extends FormInput ? FieldState<T[K]['type']> : never;
};

export type InferFormValue<T extends FormInputs> = {
	[K in keyof T]: T[K]['required'] extends true
		? NonNullable<FieldValue<T[K]['type']>>
		: FieldValue<T[K]['type']> | null;
};

export type FormSubmitHandler<T extends FormInputs> = (
	value: InferFormValue<T>
) => MaybePromise<any | void>;

export type FormProps<I extends FormInputs> = WithSlot<
	{
		inputs: I;
		onSubmit?: FormSubmitHandler<I>;
		value?: InferFormValue<I>;
		children?: Snippet<[form: FS<I>]>;
		// Bindable
		form?: FS<I>;
		class?: string;
		theme?: InferComponentTheme<typeof formTheme>;
	},
	'header' | 'title' | 'description' | 'footer',
	[FS<I>]
>;

const defaultForm = cva({
	// The 'base' property defines the default CSS classes for the form layout:
	// - 'grid': applies CSS grid layout to the form container.
	// - 'gap-4': sets a consistent gap (spacing) of 1rem between grid items.
	// - 'grid-cols-2': creates two columns in the grid.
	// - '[&>div:not(.col-span-2)]:col-span-2': by default, all direct child <div> elements
	//    that do NOT already have the 'col-span-2' class will span both columns (col-span-2).
	//    This ensures that form fields are full-width unless explicitly overridden.
	base: `grid gap-y-4 gap-x-2 grid-cols-2 [&>*:not(.col-span-1)]:col-span-2`,
	variants: {
		size: {
			small: `gap-2`,
			normal: `gap-4`,
			large: `gap-6`
		}
	}
});

const defaultFormHeader = cva({
	base: 'flex flex-col gap-2'
});

const defaultFormTitle = cva({
	base: 'text-lg font-bold text-contrast'
});

const defaultFormDescription = cva({
	base: 'text-base text-contrast-muted'
});

export const formTheme = {
	form: defaultForm,
	formHeader: defaultFormHeader,
	formTitle: defaultFormTitle,
	formDescription: defaultFormDescription
};

export const agent = `
# Form Component

The Form component is a dynamic form builder that automatically renders form fields based on a configuration object. It supports multiple input types, validation, and flexible layout options.

## Basic Usage

\`\`\`svelte
<script>
	import { Form } from '$lib';
	
	const inputs = {
		name: {
			type: 'text',
			label: 'Full Name',
			required: true
		},
		email: {
			type: 'email',
			label: 'Email Address',
			required: true
		},
		age: {
			type: 'number',
			label: 'Age',
			min: 18
		}
	};
	
	function handleSubmit(formData) {
		console.log('Form submitted:', formData);
	}
</script>

<Form {inputs} onSubmit={handleSubmit} />
\`\`\`

## Props

### Core Props
- **inputs**: FormInputs (required) - Configuration object defining all form fields
- **onSubmit**: FormSubmitHandler - Function called when form is submitted
- **value**: InferFormValue - Bindable form data object
- **class**: string - Additional CSS classes for the form container

### Header Props (Slots)
- **header**: Snippet - Custom header content slot
- **title**: Snippet - Form title slot
- **description**: Snippet - Form description slot
- **headerProps**: object - Props passed to header slot
- **titleProps**: object - Props passed to title slot
- **descriptionProps**: object - Props passed to description slot

### Advanced Props
- **theme**: ComponentTheme - Custom theme overrides

## Input Types

The Form component supports these input types:

### Text Inputs
- **'text'** - Basic text input
- **'email'** - Email input with validation
- **'url'** - URL input with validation
- **'password'** - Password input (hidden text)

### Numeric Inputs
- **'number'** - Number input with min/max/step controls

### Text Area
- **'textarea'** - Multi-line text input

### Selection Inputs
- **'select'** - Dropdown selection
- **'radio'** - Radio button group
- **'checkboxes'** - Multiple checkbox selection

### Toggle Inputs
- **'switch'** - Boolean toggle switch

## Input Configuration

Each input in the \`inputs\` object can have these common properties:

### Universal Properties
- **type**: string (required) - Input type (see above)
- **label**: string - Display label for the field
- **required**: boolean - Whether field is mandatory
- **disabled**: boolean - Whether field is disabled
- **placeholder**: string - Placeholder text
- **description**: string - Help text for the field

### Type-Specific Properties
Each input type inherits properties from its corresponding component:
- Text inputs: TextInputProps
- Number inputs: NumberInputProps (min, max, step, etc.)
- TextArea: TextAreaProps (rows, etc.)
- Select: SelectProps (options, etc.)
- Radio: RadioInputProps (options, etc.)
- Checkboxes: CheckBoxesInputProps (options, etc.)
- Switch: SwitchInputProps

## Form Structure

\`\`\`
<Form>
	<FormHeader>
		<Title />
		<Description />
	</FormHeader>
	<InputField1 />
	<InputField2 />
	...
</Form>
\`\`\`

## Examples

### Basic Contact Form
\`\`\`svelte
<script>
	const contactInputs = {
		name: {
			type: 'text',
			label: 'Name',
			required: true,
			placeholder: 'Enter your full name'
		},
		email: {
			type: 'email',
			label: 'Email',
			required: true,
			placeholder: 'your@email.com'
		},
		message: {
			type: 'textarea',
			label: 'Message',
			required: true,
			rows: 4,
			placeholder: 'Your message here...'
		}
	};
	
	async function submitContact(data) {
		await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}
</script>

<Form 
	inputs={contactInputs} 
	onSubmit={submitContact}
	title="Contact Us"
	description="Send us a message and we'll get back to you."
/>
\`\`\`

### User Registration Form
\`\`\`svelte
<script>
	const registrationInputs = {
		username: {
			type: 'text',
			label: 'Username',
			required: true,
			minLength: 3
		},
		email: {
			type: 'email',
			label: 'Email',
			required: true
		},
		age: {
			type: 'number',
			label: 'Age',
			min: 13,
			max: 120
		},
		country: {
			type: 'select',
			label: 'Country',
			options: [
				{ value: 'us', label: 'United States' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'uk', label: 'United Kingdom' }
			]
		},
		interests: {
			type: 'checkboxes',
			label: 'Interests',
			options: [
				{ value: 'tech', label: 'Technology' },
				{ value: 'sports', label: 'Sports' },
				{ value: 'music', label: 'Music' }
			]
		},
		newsletter: {
			type: 'switch',
			label: 'Subscribe to newsletter'
		}
	};
</script>

<Form inputs={registrationInputs} onSubmit={handleRegister} />
\`\`\`

### Form with Custom Header
\`\`\`svelte
<script>
	let formData = $state({});
</script>

<Form inputs={myInputs} bind:value={formData}>
	{#snippet header(form)}
		<div class="text-center">
			<h2 class="text-2xl font-bold">Custom Form</h2>
			<p class="text-gray-600">Please fill out all required fields</p>
		</div>
	{/snippet}
</Form>
\`\`\`

### Accessing Form State
\`\`\`svelte
<script>
	let formValue = $state({});
	
	// Watch form changes
	$effect(() => {
		console.log('Form data changed:', formValue);
	});
</script>

<Form inputs={myInputs} bind:value={formValue} />

<!-- Display current form state -->
<pre>{JSON.stringify(formValue, null, 2)}</pre>
\`\`\`

## Layout

The form uses CSS Grid with a 2-column layout by default:
- Most fields span both columns (full width)
- Add \`col-span-1\` class to a field to make it half-width
- Grid gaps and spacing can be customized via theme

## Type Safety

The Form component is fully type-safe:
- Input configuration is typed based on the inputs object
- Form values are automatically inferred from input types
- Required fields are enforced at the type level

## Form Validation

Each input type has its own validation rules:
- Text inputs: minLength, maxLength, pattern
- Number inputs: min, max, step
- Email/URL inputs: built-in format validation
- Required fields: automatic presence validation

## Accessibility

- Automatic label association with form controls
- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Error messaging integration
- Focus management

## Notes

- All field names become keys in the form data object
- Form submission is handled automatically when onSubmit is provided
- Individual field components can be customized via their respective props
- The form automatically handles validation state and error display
`;
