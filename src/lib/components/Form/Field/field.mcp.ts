export const fieldDescription = `
# Field Component

The Field component is the foundation for all form inputs, providing consistent layout, labeling, validation, and error handling.

## Basic Usage

Field is typically not used directly but extended by specific input components (TextInput, Select, etc.). However, it can be used for custom inputs:

\`\`\`svelte
<Field label="Custom Input" error={errorMessage}>
	<!-- Your custom input here -->
	<input type="text" bind:value={value} />
</Field>
\`\`\`

## Props

### Core Props
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text displayed below input
- **error**: string - Error message (when present, field shows error state)
- **name**: string - Field name for forms

### State Props
- **required**: boolean (default: false) - Marks field as required
- **disabled**: boolean (default: false) - Disables field interaction
- **readonly**: boolean (default: false) - Makes field read-only

### Visual Props
- **size**: 'small' | 'normal' | 'large' - Field size
- **fullWidth**: boolean - Makes field take full width

### Content Slots
- **children**: Snippet - Field content (the input)
- **prefix**: Snippet - Content before input
- **suffix**: Snippet - Content after input
- **label**: Snippet - Custom label rendering
- **description**: Snippet - Custom description rendering
- **error**: Snippet - Custom error rendering

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<InputContainer>
		<Prefix />
		<Input />
		<Suffix />
	</InputContainer>
	<Error />
</Field>
\`\`\`

## Examples

### Basic Field
\`\`\`svelte
<Field label="Username">
	<input type="text" bind:value={username} />
</Field>
\`\`\`

### With Description
\`\`\`svelte
<Field 
	label="Display Name"
	description="This is how others will see you"
>
	<input type="text" bind:value={displayName} />
</Field>
\`\`\`

### Required Field
\`\`\`svelte
<Field label="Email" required>
	<input type="email" bind:value={email} />
</Field>
\`\`\`

### With Error
\`\`\`svelte
<Field label="Password" error="Password must be at least 8 characters">
	<input type="password" bind:value={password} />
</Field>
\`\`\`

### Disabled Field
\`\`\`svelte
<Field label="Account ID" disabled>
	<input type="text" value={accountId} disabled />
</Field>
\`\`\`

### With Prefix and Suffix
\`\`\`svelte
<Field label="Website">
	{#snippet prefix()}
		<span>https://</span>
	{/snippet}
	
	<input type="text" bind:value={domain} />
	
	{#snippet suffix()}
		<Icon name="external-link" />
	{/snippet}
</Field>
\`\`\`

### Custom Label
\`\`\`svelte
<Field>
	{#snippet label()}
		<div class="flex items-center gap-2">
			<span>API Key</span>
			<Badge size="small">Pro</Badge>
		</div>
	{/snippet}
	
	<input type="text" bind:value={apiKey} />
</Field>
\`\`\`

### Full Width
\`\`\`svelte
<Field label="Bio" fullWidth>
	<textarea bind:value={bio} rows="4" />
</Field>
\`\`\`

## Used By

Field is extended by all form input components:
- TextInput
- NumberInput
- Select
- TextArea
- Switch
- RadioInput
- CheckboxesInput
- PasswordInput
- PhoneInput
- DateInput
- FileInput

## Validation Display

Field automatically styles itself based on validation state:
- **Normal**: Default appearance
- **Error**: Red border, error message displayed
- **Required**: Asterisk (*) shown next to label
- **Disabled**: Muted appearance, interaction disabled

## Accessibility

- Proper label/input association via htmlFor
- Error messages use aria-describedby
- Required fields marked with aria-required
- Disabled state communicated via aria-disabled
- Description text associated with input

## Notes

- Provides consistent spacing and layout
- Handles focus states automatically
- Error messages replace description when present
- Prefix/suffix slots don't interfere with input focus
- All form components build on top of Field
`;
