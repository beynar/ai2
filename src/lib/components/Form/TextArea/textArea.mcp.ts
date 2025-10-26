export const textAreaDescription = `
# TextArea Component

The TextArea component provides a multi-line text input field with optional auto-resize, character counting, and validation.

## Basic Usage

\`\`\`svelte
<script>
	let message = $state('');
</script>

<TextArea label="Message" bind:value={message} />
\`\`\`

## Props

Extends all Field component props plus:

### Core Props
- **value**: string (bindable) - Textarea value
- **placeholder**: string - Placeholder text
- **rows**: number (default: 3) - Number of visible text rows

### Behavior Props
- **resize**: 'none' | 'vertical' | 'horizontal' | 'both' (default: 'vertical')
- **autoResize**: boolean (default: false) - Automatically adjust height to content
- **maxLength**: number - Maximum character count

### Field Props (inherited)
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text
- **error**: string - Error message
- **required**: boolean - Mark as required
- **disabled**: boolean - Disable input
- **size**: 'small' | 'normal' | 'large' - Input size

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<InputContainer>
		<TextArea />
	</InputContainer>
	<CharacterCount />
	<Error />
</Field>
\`\`\`

## Examples

### Basic TextArea
\`\`\`svelte
<script>
	let bio = $state('');
</script>

<TextArea 
	label="Biography"
	bind:value={bio}
	rows={4}
/>
\`\`\`

### With Placeholder
\`\`\`svelte
<TextArea 
	label="Comments"
	placeholder="Enter your comments here..."
	bind:value={comments}
/>
\`\`\`

### With Max Length
\`\`\`svelte
<TextArea 
	label="Tweet"
	bind:value={tweet}
	maxLength={280}
	description="Maximum 280 characters"
/>
\`\`\`

### Auto-resize
\`\`\`svelte
<TextArea 
	label="Notes"
	bind:value={notes}
	autoResize
	placeholder="Type as much as you need..."
/>
\`\`\`

### Required Field
\`\`\`svelte
<TextArea 
	label="Feedback"
	bind:value={feedback}
	required
	rows={5}
/>
\`\`\`

### Disabled State
\`\`\`svelte
<TextArea 
	label="Read Only"
	value="This content cannot be edited"
	disabled
/>
\`\`\`

### No Resize
\`\`\`svelte
<TextArea 
	label="Fixed Size"
	bind:value={content}
	resize="none"
	rows={6}
/>
\`\`\`

### Contact Form
\`\`\`svelte
<script>
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	
	function handleSubmit() {
		console.log('Submitted:', formData);
	}
</script>

<form onsubmit={handleSubmit}>
	<TextInput 
		label="Name"
		bind:value={formData.name}
		required
	/>
	
	<TextInput 
		type="email"
		label="Email"
		bind:value={formData.email}
		required
	/>
	
	<TextArea 
		label="Message"
		bind:value={formData.message}
		rows={6}
		required
		placeholder="How can we help you?"
	/>
	
	<Button type="submit">Send Message</Button>
</form>
\`\`\`

### Product Description
\`\`\`svelte
<TextArea 
	label="Product Description"
	bind:value={description}
	rows={8}
	maxLength={500}
	description="Provide a detailed description of your product"
/>
\`\`\`

### Code Input
\`\`\`svelte
<TextArea 
	label="CSS Styles"
	bind:value={css}
	rows={10}
	class="font-mono"
	resize="both"
	placeholder=".button { ... }"
/>
\`\`\`

### Review Form
\`\`\`svelte
<script>
	let review = $state('');
	let rating = $state(5);
</script>

<div>
	<NumberInput 
		label="Rating"
		bind:value={rating}
		min={1}
		max={5}
	/>
	
	<TextArea 
		label="Review"
		bind:value={review}
		rows={6}
		maxLength={1000}
		required
		placeholder="Share your experience..."
	/>
</div>
\`\`\`

### Support Ticket
\`\`\`svelte
<TextArea 
	label="Issue Description"
	bind:value={issue}
	rows={8}
	required
	description="Please provide as much detail as possible"
	placeholder="Describe the issue you're experiencing..."
/>
\`\`\`

## Character Count

When \`maxLength\` is set, a character counter is automatically displayed:
- Shows current/max characters
- Updates in real-time
- Visual warning when approaching limit

## Validation

TextArea automatically validates:
- **required**: Non-empty value
- **maxLength**: Value doesn't exceed maximum

## Accessibility

- Proper label association
- ARIA attributes for max length
- Character count announced to screen readers
- Resize controls are keyboard accessible
- Error states properly communicated

## Notes

- Supports multi-line text input
- Can auto-resize to fit content
- Character counting for length limits
- Resize handle can be controlled
- Works in forms with validation
- Maintains scroll position during typing
`;
