export const radioInputDescription = `
# RadioInput Component

The RadioInput component provides a group of radio buttons for single-selection from multiple options.

## Basic Usage

\`\`\`svelte
<script>
	let selected = $state('');
</script>

<RadioInput 
	label="Choose a plan"
	bind:value={selected}
	options={[
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise' }
	]}
/>
\`\`\`

## Props

Extends all Field component props plus:

### Core Props
- **value**: string (bindable) - Selected value
- **options**: Array<{ value: string, label: string, description?: string, disabled?: boolean }> (required)

### Layout Props
- **orientation**: 'vertical' | 'horizontal' (default: 'vertical')

### Field Props (inherited)
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text for the entire group
- **error**: string - Error message
- **required**: boolean - Mark as required
- **disabled**: boolean - Disable all options
- **size**: 'small' | 'normal' | 'large'

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<RadioGroup orientation="...">
		<Radio>
			<RadioIndicator />
			<RadioLabel />
			<RadioDescription />
		</Radio>
		<Radio>...</Radio>
	</RadioGroup>
	<Error />
</Field>
\`\`\`

## Examples

### Basic Radio Group
\`\`\`svelte
<script>
	let plan = $state('pro');
</script>

<RadioInput 
	label="Select a plan"
	bind:value={plan}
	options={[
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise' }
	]}
/>
\`\`\`

### With Descriptions
\`\`\`svelte
<RadioInput 
	label="Subscription"
	bind:value={subscription}
	options={[
		{ 
			value: 'monthly', 
			label: 'Monthly',
			description: '$10/month, cancel anytime'
		},
		{ 
			value: 'yearly', 
			label: 'Yearly',
			description: '$100/year, save $20'
		}
	]}
/>
\`\`\`

### Horizontal Layout
\`\`\`svelte
<RadioInput 
	label="Gender"
	bind:value={gender}
	orientation="horizontal"
	options={[
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
		{ value: 'other', label: 'Other' }
	]}
/>
\`\`\`

### Required Field
\`\`\`svelte
<RadioInput 
	label="Shipping Method"
	bind:value={shipping}
	required
	options={[
		{ value: 'standard', label: 'Standard (5-7 days)' },
		{ value: 'express', label: 'Express (2-3 days)' },
		{ value: 'overnight', label: 'Overnight' }
	]}
/>
\`\`\`

### With Disabled Options
\`\`\`svelte
<RadioInput 
	label="Seat Selection"
	bind:value={seat}
	options={[
		{ value: 'window', label: 'Window' },
		{ value: 'aisle', label: 'Aisle' },
		{ value: 'middle', label: 'Middle', disabled: true }
	]}
/>
\`\`\`

### All Disabled
\`\`\`svelte
<RadioInput 
	label="Account Type"
	value="premium"
	disabled
	options={[
		{ value: 'free', label: 'Free' },
		{ value: 'premium', label: 'Premium' }
	]}
/>
\`\`\`

### Payment Method Selector
\`\`\`svelte
<script>
	let paymentMethod = $state('card');
</script>

<RadioInput 
	label="Payment Method"
	bind:value={paymentMethod}
	required
	options={[
		{ 
			value: 'card', 
			label: 'Credit/Debit Card',
			description: 'Visa, Mastercard, Amex'
		},
		{ 
			value: 'paypal', 
			label: 'PayPal',
			description: 'Pay with your PayPal account'
		},
		{ 
			value: 'bank', 
			label: 'Bank Transfer',
			description: '2-3 business days processing'
		}
	]}
/>

{#if paymentMethod === 'card'}
	<TextInput label="Card Number" />
	<TextInput label="CVV" />
{:else if paymentMethod === 'paypal'}
	<TextInput type="email" label="PayPal Email" />
{/if}
\`\`\`

### Size Options
\`\`\`svelte
<RadioInput 
	label="T-Shirt Size"
	bind:value={size}
	orientation="horizontal"
	required
	options={[
		{ value: 'xs', label: 'XS' },
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' }
	]}
/>
\`\`\`

### Delivery Options
\`\`\`svelte
<script>
	let delivery = $state('');
	
	const deliveryOptions = [
		{ 
			value: 'pickup', 
			label: 'Store Pickup',
			description: 'Free - Ready in 2 hours'
		},
		{ 
			value: 'standard', 
			label: 'Standard Delivery',
			description: '$5.99 - 5-7 business days'
		},
		{ 
			value: 'express', 
			label: 'Express Delivery',
			description: '$12.99 - 2-3 business days'
		},
		{ 
			value: 'overnight', 
			label: 'Overnight',
			description: '$24.99 - Next day delivery'
		}
	];
</script>

<RadioInput 
	label="Delivery Method"
	bind:value={delivery}
	options={deliveryOptions}
	required
/>
\`\`\`

### Survey Question
\`\`\`svelte
<RadioInput 
	label="How satisfied are you with our service?"
	bind:value={satisfaction}
	required
	options={[
		{ value: '5', label: 'Very Satisfied' },
		{ value: '4', label: 'Satisfied' },
		{ value: '3', label: 'Neutral' },
		{ value: '2', label: 'Dissatisfied' },
		{ value: '1', label: 'Very Dissatisfied' }
	]}
/>
\`\`\`

### Settings Radio Group
\`\`\`svelte
<RadioInput 
	label="Notification Frequency"
	bind:value={frequency}
	description="Choose how often you want to receive notifications"
	options={[
		{ 
			value: 'realtime', 
			label: 'Real-time',
			description: 'Instant notifications'
		},
		{ 
			value: 'hourly', 
			label: 'Hourly',
			description: 'Digest every hour'
		},
		{ 
			value: 'daily', 
			label: 'Daily',
			description: 'Once per day'
		},
		{ 
			value: 'never', 
			label: 'Never',
			description: 'Disable notifications'
		}
	]}
/>
\`\`\`

## Validation

RadioInput automatically validates:
- **required**: A value must be selected

## Keyboard Navigation

- **Arrow keys**: Navigate between options
- **Space**: Select focused option
- **Tab**: Move focus to next element

## Accessibility

- Proper radio group semantics
- ARIA attributes for required state
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Disabled options communicated properly

## Notes

- Only one option can be selected at a time
- Each option can have its own description
- Individual options can be disabled
- Supports both vertical and horizontal layouts
- Works seamlessly with Form component
`;
