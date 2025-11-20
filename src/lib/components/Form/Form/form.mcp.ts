export const formDescription = `
# Form Component

The Form component provides a comprehensive form system with built-in validation, type-safe inputs, and automatic layout. It manages form state and handles submission.

## Basic Usage

\`\`\`svelte
<script>
	let formValue = $state({});
	
	function handleSubmit(data) {
		console.log('Form submitted:', data);
	}
</script>

<Form 
	inputs={{
		name: { type: 'text', label: 'Name', required: true },
		email: { type: 'email', label: 'Email', required: true },
		age: { type: 'number', label: 'Age' }
	}}
	onSubmit={handleSubmit}
	bind:value={formValue}
/>
\`\`\`

## Props

### Core Props
- **inputs**: FormInputs (required) - Object defining form fields
  - Key: field name
  - Value: field configuration (type + field-specific props)

- **value**: InferFormValue<I> (bindable) - Form values
- **form**: FormState (bindable) - Form state instance

### Event Props
- **onSubmit**: (value: InferFormValue<I>) => void | Promise<void> - Submit handler

### Content Slots
- **children**: Snippet<[form: FormState]> - Custom form content with access to form state
- **header**: Snippet<[form: FormState]> - Form header
- **title**: Snippet<[form: FormState]> - Form title
- **description**: Snippet<[form: FormState]> - Form description
- **footer**: Snippet<[form: FormState]> - Form footer (commonly used for buttons)

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Input Types

### Text Inputs
- **text** - Standard text input
- **email** - Email input with validation
- **url** - URL input with validation
- **password** - Password input with visibility toggle

### Number Input
- **number** - Numeric input with step controls

### Selection Inputs
- **select** - Dropdown selection
- **radio** - Radio button group
- **checkboxes** - Checkbox group

### Toggle Input
- **switch** - Toggle switch

### Date/Time Inputs
- **date** - Date picker
- **datetime** - Date and time picker
- **calendar** - Calendar date picker
- **calendar-range** - Date range picker

### Other Inputs
- **textarea** - Multi-line text input
- **phone** - Phone number input with formatting
- **file** - Single file upload
- **files** - Multiple files upload

## Input Configuration

Each input in the \`inputs\` object supports:
- **type**: Input type (required)
- **label**: Field label
- **description**: Helper text
- **placeholder**: Placeholder text
- **required**: Whether field is required
- **disabled**: Whether field is disabled
- **defaultValue**: Initial value
- **validation**: Custom validation function
- Type-specific props (e.g., min/max for numbers, options for select)

## Examples

### Basic Form
\`\`\`svelte
<script>
	function handleSubmit(data) {
		console.log(data);
	}
</script>

<Form 
	inputs={{
		username: { type: 'text', label: 'Username', required: true },
		email: { type: 'email', label: 'Email', required: true },
		password: { type: 'password', label: 'Password', required: true }
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### With Initial Values
\`\`\`svelte
<script>
	let formValue = $state({
		name: 'John Doe',
		age: 30
	});
</script>

<Form 
	inputs={{
		name: { type: 'text', label: 'Name' },
		age: { type: 'number', label: 'Age' }
	}}
	bind:value={formValue}
	onSubmit={handleSubmit}
/>
\`\`\`

### With Custom Layout
\`\`\`svelte
<Form 
	inputs={{
		firstName: { type: 'text', label: 'First Name', class: 'col-span-1' },
		lastName: { type: 'text', label: 'Last Name', class: 'col-span-1' },
		email: { type: 'email', label: 'Email' },
		phone: { type: 'phone', label: 'Phone' }
	}}
	onSubmit={handleSubmit}
>
	{#snippet footer({ form })}
		<div class="flex gap-2 justify-end col-span-2">
			<Button variant="ghost" type="button">Cancel</Button>
			<Button type="submit" disabled={!form.isValid}>Submit</Button>
		</div>
	{/snippet}
</Form>
\`\`\`

### Select Input
\`\`\`svelte
<Form 
	inputs={{
		country: { 
			type: 'select',
			label: 'Country',
			required: true,
			options: [
				{ value: 'us', label: 'United States' },
				{ value: 'uk', label: 'United Kingdom' },
				{ value: 'ca', label: 'Canada' }
			]
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Radio Buttons
\`\`\`svelte
<Form 
	inputs={{
		plan: {
			type: 'radio',
			label: 'Select Plan',
			required: true,
			options: [
				{ value: 'free', label: 'Free' },
				{ value: 'pro', label: 'Pro' },
				{ value: 'enterprise', label: 'Enterprise' }
			]
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Checkboxes
\`\`\`svelte
<Form 
	inputs={{
		interests: {
			type: 'checkboxes',
			label: 'Interests',
			options: [
				{ value: 'coding', label: 'Coding' },
				{ value: 'design', label: 'Design' },
				{ value: 'marketing', label: 'Marketing' }
			]
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Switch Toggle
\`\`\`svelte
<Form 
	inputs={{
		notifications: {
			type: 'switch',
			label: 'Enable Notifications'
		},
		marketing: {
			type: 'switch',
			label: 'Marketing Emails'
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Date Inputs
\`\`\`svelte
<Form 
	inputs={{
		birthdate: {
			type: 'date',
			label: 'Birth Date',
			required: true
		},
		startDate: {
			type: 'calendar',
			label: 'Start Date'
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### File Upload
\`\`\`svelte
<Form 
	inputs={{
		avatar: {
			type: 'file',
			label: 'Profile Picture',
			accept: 'image/*'
		},
		documents: {
			type: 'files',
			label: 'Documents',
			accept: '.pdf,.doc,.docx'
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Textarea
\`\`\`svelte
<Form 
	inputs={{
		bio: {
			type: 'textarea',
			label: 'Biography',
			placeholder: 'Tell us about yourself...',
			rows: 4
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### With Custom Validation
\`\`\`svelte
<Form 
	inputs={{
		password: {
			type: 'password',
			label: 'Password',
			required: true,
			validation: (value) => {
				if (value.length < 8) return 'Password must be at least 8 characters';
				return null;
			}
		},
		confirmPassword: {
			type: 'password',
			label: 'Confirm Password',
			required: true
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### Accessing Form State
\`\`\`svelte
<script>
	let formState;
</script>

<Form 
	bind:form={formState}
	inputs={{...}}
	onSubmit={handleSubmit}
>
	{#snippet children({ form })}
		<p>Valid: {form.isValid}</p>
		<p>Dirty: {form.isDirty}</p>
		<p>Submitting: {form.isSubmitting}</p>
	{/snippet}
</Form>
\`\`\`

### Complete Registration Form
\`\`\`svelte
<script>
	async function handleSubmit(data) {
		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		return response.json();
	}
</script>

<Form 
	inputs={{
		firstName: { type: 'text', label: 'First Name', required: true, class: 'col-span-1' },
		lastName: { type: 'text', label: 'Last Name', required: true, class: 'col-span-1' },
		email: { type: 'email', label: 'Email', required: true },
		password: { type: 'password', label: 'Password', required: true },
		age: { type: 'number', label: 'Age', min: 18, max: 120 },
		country: {
			type: 'select',
			label: 'Country',
			required: true,
			options: countries
		},
		terms: {
			type: 'switch',
			label: 'I agree to the terms and conditions',
			required: true
		}
	}}
	onSubmit={handleSubmit}
>
	{#snippet header()}
		<h2>Create Account</h2>
		<p>Fill in your details to get started</p>
	{/snippet}
	
	{#snippet footer({ form })}
		<Button type="submit" fullWidth disabled={!form.isValid || form.isSubmitting}>
			{form.isSubmitting ? 'Creating Account...' : 'Create Account'}
		</Button>
	{/snippet}
</Form>
\`\`\`

## Form State API

The form state object provides:
- **isValid**: boolean - All fields pass validation
- **isDirty**: boolean - Form has been modified
- **isSubmitting**: boolean - Form is currently submitting
- **errors**: Record<string, string> - Validation errors per field
- **reset()**: Reset form to initial values
- **submit()**: Programmatically submit form

## Validation

- Required fields are automatically validated
- Type-specific validation (email, URL, etc.)
- Custom validation functions per field
- Real-time validation on blur
- Validation errors displayed inline

## Layout

- Default 2-column grid layout
- Fields span 2 columns by default
- Add \`class: 'col-span-1'\` to a field for single column
- Fully customizable with CSS classes

## Accessibility

- Proper label associations
- ARIA attributes for validation
- Error announcements for screen readers
- Keyboard navigation support
- Focus management

## Notes

- Form values are type-safe based on input configuration
- Async submit handlers are supported
- Form automatically handles loading states
- All form inputs are built on the Field component
- Grid layout makes responsive forms easy

## Theme Customization

The Form component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme. The Form component forwards theme to its child Field components.

### Theme Structure

The theme object contains the following parts:
- **form**: Main form container styles
- **field**: Field component theme (forwarded to all fields)

### Available Variants

**form**:
- base: Base classes for form container

**field**:
- Theme structure matches the Field component theme (see Field component documentation)

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Form 
  inputs={inputs}
  onSubmit={handleSubmit}
  theme={{
    form: {
      base: 'grid grid-cols-2 gap-4'
    }
  }}
/>
\`\`\`

**Custom Form Layout**:
\`\`\`svelte
<Form 
  inputs={inputs}
  onSubmit={handleSubmit}
  theme={{
    form: {
      base: 'flex flex-col gap-6 max-w-2xl mx-auto'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setFormTheme } from 'svelai/form';
  
  setFormTheme({
    form: {
      base: 'grid grid-cols-1 md:grid-cols-2 gap-4'
    }
  });
</script>
\`\`\`
`;
