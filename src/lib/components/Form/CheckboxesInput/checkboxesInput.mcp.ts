export const checkboxesInputDescription = `
# CheckboxesInput Component

The CheckboxesInput component is a multi-selection input that allows users to select multiple options from a list. It provides a visually appealing interface with two display modes and supports custom labels and descriptions.

## Basic Usage

\`\`\`svelte
<script>
	let selectedValues = $state([]);
</script>

<CheckboxesInput 
	label="Select your interests"
	options={[
		{ value: 'coding', label: 'Coding' },
		{ value: 'design', label: 'Design' },
		{ value: 'marketing', label: 'Marketing' }
	]}
	bind:value={selectedValues}
/>
\`\`\`

## Props

### Core Props
- **options**: CheckBoxesOption[] (required) - Array of checkbox options
  - Each option has:
    - value: string (required) - Unique identifier for the option
    - label?: Slot - Display label (can be text or Svelte snippet)
    - description?: Slot - Optional description text

- **value**: string[] (bindable) - Array of selected option values
- **mode**: 'normal' | 'card' (default: 'normal')
  - normal: Simple checkbox list
  - card: Each option displayed as a raised card with selection ring

### Field Props
- **label**: Slot - Field label
- **description**: Slot - Helper text below label
- **required**: boolean (default: false) - Makes field required
- **disabled**: boolean - Disables all checkboxes
- **visible**: boolean - Controls field visibility
- **name**: string - Form field name

### Validation Props
- **errors**: string[] | boolean (bindable) - Validation errors
- **focused**: boolean (bindable) - Focus state
- **onValidate**: (value: string[]) => string[] | boolean - Custom validation function

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides for all checkbox parts

### Slot Props
All Field slot props are available:
- **header**: Snippet - Custom header
- **suffix**: Snippet - Content after input
- **prefix**: Snippet - Content before input
- **actions**: Snippet - Action buttons area
- **helper**: Snippet - Helper text
- **footer**: Snippet - Footer content
- **error**: Snippet - Custom error display
- **errorsContainer**: Snippet - Custom errors container

## Structure

The component renders as a fieldset with the following DOM structure:
\`\`\`
<fieldset>
	<Field wrapper>
		<label> <!-- For each option -->
			<input type="checkbox" hidden />
			<div> <!-- Track (checkbox background) -->
			<div> <!-- Thumb (check mark) -->
			<Slot> <!-- Label -->
			<Slot> <!-- Description -->
		</label>
	</Field>
</fieldset>
\`\`\`

## Examples

### Basic Checkbox List
\`\`\`svelte
<script>
	let interests = $state([]);
</script>

<CheckboxesInput 
	label="Interests"
	options={[
		{ value: 'music', label: 'Music' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'reading', label: 'Reading' },
		{ value: 'travel', label: 'Travel' }
	]}
	bind:value={interests}
/>
\`\`\`

### Card Mode
\`\`\`svelte
<CheckboxesInput 
	label="Select features"
	mode="card"
	options={[
		{ 
			value: 'analytics', 
			label: 'Analytics',
			description: 'Track user behavior and metrics'
		},
		{ 
			value: 'api', 
			label: 'API Access',
			description: 'RESTful API for integrations'
		},
		{ 
			value: 'support', 
			label: 'Priority Support',
			description: '24/7 dedicated support team'
		}
	]}
	bind:value={selectedFeatures}
/>
\`\`\`

### With Descriptions
\`\`\`svelte
<CheckboxesInput 
	label="Communication preferences"
	options={[
		{ 
			value: 'email', 
			label: 'Email notifications',
			description: 'Receive updates via email'
		},
		{ 
			value: 'sms', 
			label: 'SMS alerts',
			description: 'Text messages for urgent items'
		},
		{ 
			value: 'push', 
			label: 'Push notifications',
			description: 'Browser push notifications'
		}
	]}
	bind:value={preferences}
/>
\`\`\`

### With Validation
\`\`\`svelte
<script>
	let skills = $state([]);
	
	function validateSkills(value) {
		if (value.length < 2) {
			return ['Please select at least 2 skills'];
		}
		return false;
	}
</script>

<CheckboxesInput 
	label="Skills"
	required
	options={[
		{ value: 'js', label: 'JavaScript' },
		{ value: 'py', label: 'Python' },
		{ value: 'go', label: 'Go' },
		{ value: 'rust', label: 'Rust' }
	]}
	bind:value={skills}
	onValidate={validateSkills}
/>
\`\`\`

### In a Form
\`\`\`svelte
<script>
	import { Form } from 'svelai/form';
	
	function handleSubmit(data) {
		console.log('Selected interests:', data.interests);
	}
</script>

<Form 
	inputs={{
		interests: {
			type: 'checkboxes',
			label: 'Your interests',
			required: true,
			options: [
				{ value: 'tech', label: 'Technology' },
				{ value: 'science', label: 'Science' },
				{ value: 'art', label: 'Art' },
				{ value: 'business', label: 'Business' }
			]
		}
	}}
	onSubmit={handleSubmit}
/>
\`\`\`

### With Custom Snippets
\`\`\`svelte
<CheckboxesInput 
	label="Select options"
	options={[
		{ value: 'opt1', label: 'Option 1' },
		{ value: 'opt2', label: 'Option 2' }
	]}
	bind:value={selected}
>
	{#snippet description()}
		<p class="text-sm text-muted">Choose all that apply</p>
	{/snippet}
	
	{#snippet helper()}
		<p class="text-xs">Selected: {selected.length}</p>
	{/snippet}
</CheckboxesInput>
\`\`\`

### Pre-selected Values
\`\`\`svelte
<script>
	let selected = $state(['option1', 'option3']);
</script>

<CheckboxesInput 
	label="Preferences"
	options={[
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	]}
	bind:value={selected}
/>
\`\`\`

### Disabled State
\`\`\`svelte
<CheckboxesInput 
	label="Read-only selection"
	disabled
	options={options}
	value={['option1']}
/>
\`\`\`

### Complex Options with Rich Labels
\`\`\`svelte
<script>
	import { Badge } from 'svelai/badge';
	
	let plans = $state([]);
</script>

<CheckboxesInput 
	label="Select add-ons"
	mode="card"
	options={[
		{ 
			value: 'storage',
			label: (props) => {
				return \`Extra Storage <Badge color="primary">+$5/mo</Badge>\`;
			},
			description: '100GB additional cloud storage'
		},
		{ 
			value: 'users',
			label: (props) => {
				return \`Team Members <Badge color="success">+$10/mo</Badge>\`;
			},
			description: 'Add up to 10 team members'
		}
	]}
	bind:value={plans}
/>
\`\`\`

## Validation

- When **required** is true, at least one option must be selected
- Custom validation via **onValidate** prop
- Returns array of error messages or boolean
- Errors are displayed inline below the field
- Validation runs on change and blur

## Modes

### Normal Mode
- Simple checkbox list layout
- Compact design
- Best for shorter lists or secondary choices

### Card Mode
- Each option displayed as a card with elevation
- Selected cards show a contrast ring
- Better visual feedback
- Ideal for feature selection or important choices

## Accessibility

- Uses semantic \`<fieldset>\` and \`<legend>\` elements
- Each checkbox properly associated with its label
- Hidden native checkbox inputs for keyboard navigation
- Supports keyboard interaction (Space/Enter to toggle)
- ARIA attributes for validation states
- Error announcements for screen readers
- Focus management within the group

## Theme Customization

The component supports theming for these parts:
- **checkboxesInput**: Main container
- **checkboxesInputContainer**: Options grid container
- **checkboxesInputItem**: Individual checkbox wrapper
- **checkboxesInputItemTrack**: Checkbox background
- **checkboxesInputItemThumb**: Check mark indicator
- **checkboxesInputItemLabel**: Label text
- **checkboxesInputItemDescription**: Description text
- **checkboxesInputItemIcon**: Icon styling

## Notes

- Value is always an array of strings (selected option values)
- Empty array means no selections
- Options are rendered in a responsive grid (1 column mobile, 2 columns desktop)
- Check icon automatically appears when option is selected
- Native checkbox is hidden but maintained for accessibility
- Works seamlessly with Form component
- Supports Svelte 5 snippets for labels and descriptions
- Each option requires a unique \`value\` property
`;