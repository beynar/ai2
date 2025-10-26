export const checkboxesInputDescription = `
# CheckboxesInput Component

The CheckboxesInput component provides a group of checkboxes for multi-selection from multiple options.

## Basic Usage

\`\`\`svelte
<script>
	let selected = $state([]);
</script>

<CheckboxesInput 
	label="Select interests"
	bind:value={selected}
	options={[
		{ value: 'coding', label: 'Coding' },
		{ value: 'design', label: 'Design' },
		{ value: 'marketing', label: 'Marketing' }
	]}
/>
\`\`\`

## Props

Extends all Field component props plus:

### Core Props
- **value**: Array<string> (bindable) - Array of selected values
- **options**: Array<{ value: string, label: string, description?: string, disabled?: boolean }> (required)

### Layout Props
- **orientation**: 'vertical' | 'horizontal' (default: 'vertical')

### Field Props (inherited)
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text for entire group
- **error**: string - Error message
- **required**: boolean - At least one must be selected
- **disabled**: boolean - Disable all checkboxes
- **size**: 'small' | 'normal' | 'large'

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<CheckboxGroup orientation="...">
		<Checkbox>
			<CheckboxIndicator />
			<CheckboxLabel />
			<CheckboxDescription />
		</Checkbox>
		<Checkbox>...</Checkbox>
	</CheckboxGroup>
	<Error />
</Field>
\`\`\`

## Examples

### Basic Checkbox Group
\`\`\`svelte
<script>
	let interests = $state([]);
</script>

<CheckboxesInput 
	label="Interests"
	bind:value={interests}
	options={[
		{ value: 'sports', label: 'Sports' },
		{ value: 'music', label: 'Music' },
		{ value: 'reading', label: 'Reading' },
		{ value: 'travel', label: 'Travel' }
	]}
/>
\`\`\`

### With Descriptions
\`\`\`svelte
<CheckboxesInput 
	label="Newsletter Preferences"
	bind:value={preferences}
	options={[
		{ 
			value: 'weekly', 
			label: 'Weekly Newsletter',
			description: 'Top stories every Monday'
		},
		{ 
			value: 'daily', 
			label: 'Daily Updates',
			description: 'Breaking news alerts'
		},
		{ 
			value: 'promotions', 
			label: 'Promotions',
			description: 'Special offers and deals'
		}
	]}
/>
\`\`\`

### Horizontal Layout
\`\`\`svelte
<CheckboxesInput 
	label="Days Available"
	bind:value={days}
	orientation="horizontal"
	options={[
		{ value: 'mon', label: 'Mon' },
		{ value: 'tue', label: 'Tue' },
		{ value: 'wed', label: 'Wed' },
		{ value: 'thu', label: 'Thu' },
		{ value: 'fri', label: 'Fri' }
	]}
/>
\`\`\`

### Required (At Least One)
\`\`\`svelte
<CheckboxesInput 
	label="Select Your Skills"
	bind:value={skills}
	required
	description="Select at least one skill"
	options={[
		{ value: 'js', label: 'JavaScript' },
		{ value: 'py', label: 'Python' },
		{ value: 'java', label: 'Java' }
	]}
/>
\`\`\`

### With Disabled Options
\`\`\`svelte
<CheckboxesInput 
	label="Features"
	bind:value={features}
	options={[
		{ value: 'basic', label: 'Basic Features' },
		{ value: 'advanced', label: 'Advanced Features' },
		{ value: 'premium', label: 'Premium Features', disabled: true }
	]}
	description="Premium features require upgrade"
/>
\`\`\`

### All Disabled
\`\`\`svelte
<CheckboxesInput 
	label="Active Modules"
	value={['module1', 'module2']}
	disabled
	options={modules}
/>
\`\`\`

### Permissions Selector
\`\`\`svelte
<script>
	let permissions = $state([]);
</script>

<CheckboxesInput 
	label="User Permissions"
	bind:value={permissions}
	required
	options={[
		{ 
			value: 'read', 
			label: 'Read',
			description: 'View content'
		},
		{ 
			value: 'write', 
			label: 'Write',
			description: 'Create and edit content'
		},
		{ 
			value: 'delete', 
			label: 'Delete',
			description: 'Remove content'
		},
		{ 
			value: 'admin', 
			label: 'Admin',
			description: 'Full system access'
		}
	]}
/>
\`\`\`

### Notification Settings
\`\`\`svelte
<script>
	let notifications = $state(['email']);
</script>

<CheckboxesInput 
	label="Notification Channels"
	bind:value={notifications}
	description="Choose how you want to be notified"
	options={[
		{ 
			value: 'email', 
			label: 'Email',
			description: 'Notifications via email'
		},
		{ 
			value: 'sms', 
			label: 'SMS',
			description: 'Text message alerts'
		},
		{ 
			value: 'push', 
			label: 'Push Notifications',
			description: 'Mobile app notifications'
		},
		{ 
			value: 'slack', 
			label: 'Slack',
			description: 'Slack channel messages'
		}
	]}
/>
\`\`\`

### Features Selection
\`\`\`svelte
<script>
	let selectedFeatures = $state([]);
	
	const features = [
		{ value: 'analytics', label: 'Analytics Dashboard' },
		{ value: 'export', label: 'Data Export' },
		{ value: 'api', label: 'API Access' },
		{ value: 'support', label: 'Priority Support' },
		{ value: 'training', label: 'Custom Training' }
	];
</script>

<CheckboxesInput 
	label="Add-on Features"
	bind:value={selectedFeatures}
	options={features}
/>

<p>Selected: {selectedFeatures.length} features</p>
\`\`\`

### Survey Question
\`\`\`svelte
<CheckboxesInput 
	label="What topics interest you?"
	bind:value={topics}
	required
	description="Select all that apply"
	options={[
		{ value: 'tech', label: 'Technology' },
		{ value: 'business', label: 'Business' },
		{ value: 'health', label: 'Health' },
		{ value: 'science', label: 'Science' },
		{ value: 'entertainment', label: 'Entertainment' }
	]}
/>
\`\`\`

### Product Features
\`\`\`svelte
<script>
	let productFeatures = $state(['wifi', 'bluetooth']);
</script>

<CheckboxesInput 
	label="Device Features"
	bind:value={productFeatures}
	options={[
		{ value: 'wifi', label: 'Wi-Fi', description: '802.11ac' },
		{ value: 'bluetooth', label: 'Bluetooth', description: '5.0' },
		{ value: '5g', label: '5G', description: 'Next-gen connectivity' },
		{ value: 'nfc', label: 'NFC', description: 'Contactless payments' },
		{ value: 'gps', label: 'GPS', description: 'Location services' }
	]}
/>
\`\`\`

### Terms Acceptance
\`\`\`svelte
<script>
	let agreements = $state([]);
	let canSubmit = $derived(
		agreements.includes('terms') && 
		agreements.includes('privacy')
	);
</script>

<CheckboxesInput 
	label="Legal Agreements"
	bind:value={agreements}
	required
	options={[
		{ 
			value: 'terms', 
			label: 'Terms of Service',
			description: 'I have read and agree to the Terms of Service'
		},
		{ 
			value: 'privacy', 
			label: 'Privacy Policy',
			description: 'I have read and agree to the Privacy Policy'
		},
		{ 
			value: 'marketing', 
			label: 'Marketing Communications',
			description: 'I want to receive marketing emails (optional)'
		}
	]}
/>

<Button disabled={!canSubmit}>Submit</Button>
\`\`\`

## Validation

CheckboxesInput validates:
- **required**: At least one checkbox must be selected

## Keyboard Navigation

- **Tab**: Move between checkboxes
- **Space**: Toggle focused checkbox
- **Arrow keys**: Navigate between options

## Accessibility

- Proper checkbox group semantics
- ARIA attributes for required state
- Individual checkboxes are keyboard accessible
- Focus management
- Screen reader friendly
- Checked/unchecked state announced

## Notes

- Multiple options can be selected simultaneously
- Value is always an array
- Each option can have its own description
- Individual checkboxes can be disabled
- Supports vertical and horizontal layouts
- Works seamlessly with Form component
`;
