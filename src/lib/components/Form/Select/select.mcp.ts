export const selectDescription = `
# Select Component

The Select component provides a dropdown selection field with support for static and async options.

## Basic Usage

\`\`\`svelte
<Select 
	label="Country"
	bind:value={country}
	options={[
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'ca', label: 'Canada' }
	]}
/>
\`\`\`

## Props

Extends all Field component props plus:

### Core Props
- **value**: string (bindable) - Selected value
- **options**: Array<{ value: string, label: string }> - Available options
- **placeholder**: string - Placeholder when no selection

### Field Props (inherited)
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text
- **error**: string - Error message
- **required**: boolean - Mark as required
- **disabled**: boolean - Disable selection
- **size**: 'small' | 'normal' | 'large' - Select size

### Content Slots
- **prefix**: Snippet - Content before select
- **suffix**: Snippet - Content after select

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<SelectContainer>
		<Prefix />
		<Select>
			<Option />
			<Option />
		</Select>
		<Suffix />
	</SelectContainer>
	<Error />
</Field>
\`\`\`

## Examples

### Basic Select
\`\`\`svelte
<script>
	let country = $state('');
</script>

<Select 
	label="Country"
	bind:value={country}
	options={[
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'ca', label: 'Canada' }
	]}
/>
\`\`\`

### With Placeholder
\`\`\`svelte
<Select 
	label="Select a plan"
	placeholder="Choose your plan"
	bind:value={plan}
	options={planOptions}
/>
\`\`\`

### Required Select
\`\`\`svelte
<Select 
	label="Country"
	required
	bind:value={country}
	options={countries}
/>
\`\`\`

### With Description
\`\`\`svelte
<Select 
	label="Theme"
	description="Choose your preferred color scheme"
	bind:value={theme}
	options={[
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'auto', label: 'Auto' }
	]}
/>
\`\`\`

### Disabled Select
\`\`\`svelte
<Select 
	label="Region"
	disabled
	value="us-west"
	options={regions}
/>
\`\`\`

### With Prefix Icon
\`\`\`svelte
<Select label="Currency" bind:value={currency} options={currencies}>
	{#snippet prefix()}
		<Icon name="dollar-sign" />
	{/snippet}
</Select>
\`\`\`

### Category Selector
\`\`\`svelte
<script>
	let category = $state('');
	
	const categories = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'books', label: 'Books' },
		{ value: 'home', label: 'Home & Garden' },
		{ value: 'sports', label: 'Sports' }
	];
</script>

<Select 
	label="Category"
	placeholder="Select a category"
	bind:value={category}
	options={categories}
	required
/>
\`\`\`

### Async Options
\`\`\`svelte
<script>
	let options = $state([]);
	
	$effect(() => {
		fetch('/api/countries')
			.then(r => r.json())
			.then(data => options = data);
	});
</script>

<Select 
	label="Country"
	bind:value={country}
	options={options}
/>
\`\`\`

### Dependent Selects
\`\`\`svelte
<script>
	let country = $state('');
	let state = $state('');
	
	const statesByCountry = {
		us: [
			{ value: 'ca', label: 'California' },
			{ value: 'ny', label: 'New York' }
		],
		uk: [
			{ value: 'england', label: 'England' },
			{ value: 'scotland', label: 'Scotland' }
		]
	};
	
	$effect(() => {
		if (country) state = '';
	});
</script>

<Select 
	label="Country"
	bind:value={country}
	options={countryOptions}
/>

{#if country}
	<Select 
		label="State/Province"
		bind:value={state}
		options={statesByCountry[country] || []}
	/>
{/if}
\`\`\`

### Settings Form
\`\`\`svelte
<script>
	let settings = $state({
		language: 'en',
		timezone: 'utc',
		theme: 'auto'
	});
</script>

<form>
	<Select 
		label="Language"
		bind:value={settings.language}
		options={[
			{ value: 'en', label: 'English' },
			{ value: 'es', label: 'Spanish' },
			{ value: 'fr', label: 'French' }
		]}
	/>
	
	<Select 
		label="Timezone"
		bind:value={settings.timezone}
		options={timezones}
	/>
	
	<Select 
		label="Theme"
		bind:value={settings.theme}
		options={[
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' },
			{ value: 'auto', label: 'Auto' }
		]}
	/>
	
	<Button type="submit">Save Settings</Button>
</form>
\`\`\`

## Validation

Select automatically validates:
- **required**: A value must be selected

## Accessibility

- Proper label association
- ARIA attributes for required state
- Keyboard navigation (arrow keys, Enter, Escape)
- Focus states clearly visible
- Selected value announced to screen readers

## Notes

- Extends the Field component
- Native HTML select for best accessibility
- Options can be loaded asynchronously
- Empty string or null for no selection
- Suffix typically shows dropdown indicator

## Theme Customization

The Select component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **input**: Select element styles
- **inputContainer**: Select container wrapper styles

### Available Variants

**input**:
- base: Base classes applied to the select element
- Variants:
  - size: 'small' | 'medium' | 'large' - Text size
  - disabled: boolean - Disabled state styling

**inputContainer**:
- base: Base classes for the select container (handles focus states, borders, padding)
- Variants:
  - size: 'small' | 'medium' | 'large' - Size-based styling
  - disabled: boolean - Disabled state styling

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Select 
  label="Choose Option"
  bind:value={value}
  options={options}
  theme={{
    inputContainer: {
      base: 'border-2 rounded-lg',
      size: {
        medium: 'px-4 py-2'
      }
    },
    input: {
      size: {
        medium: 'text-base'
      }
    }
  }}
/>
\`\`\`

**Focus State Customization**:
\`\`\`svelte
<Select 
  label="Styled Select"
  bind:value={value}
  options={options}
  theme={{
    inputContainer: {
      base: 'focus-within:ring-2 focus-within:ring-primary focus-within:border-primary'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setSelectTheme } from 'svelai/select';
  
  setSelectTheme({
    inputContainer: {
      base: 'rounded-lg border-2 transition-all',
      size: {
        medium: 'px-4 py-2'
      }
    },
    input: {
      base: 'appearance-none bg-transparent'
    }
  });
</script>
\`\`\`
`;
