export const toggleButtonGroupDescription = `
# ToggleButtonGroup Component

The ToggleButtonGroup component manages a collection of toggle buttons where one or multiple can be selected, ideal for filters, view modes, and multi-select options.

## Basic Usage

\`\`\`svelte
<script>
	let selected = $state('left');
</script>

<ToggleButtonGroup 
	bind:value={selected}
	buttons={[
		{ value: 'left', children: 'Left' },
		{ value: 'center', children: 'Center' },
		{ value: 'right', children: 'Right' }
	]}
/>
\`\`\`

## Props

### Core Props
- **buttons**: Array<ToggleButtonProps> (required) - Array of button configurations
- **value**: any | Array<any> (bindable) - Selected value(s)
- **multiple**: boolean (default: false) - Allow multiple selections

### Shared Button Props
- **size**: 'small' | 'normal' | 'large' - Applied to all buttons
- **color**: Colors - Shared color for all buttons
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' - Shared variant
- **disabled**: boolean - Disables all buttons

### Event Props
- **onChange**: (value: any | Array<any>) => void - Called when selection changes

### Styling Props
- **class**: string - Additional CSS classes for group container
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<ToggleButtonGroup>
	<ToggleButton />
	<ToggleButton />
	<ToggleButton />
</ToggleButtonGroup>
\`\`\`

## Examples

### Single Selection
\`\`\`svelte
<script>
	let alignment = $state('left');
</script>

<ToggleButtonGroup 
	bind:value={alignment}
	buttons={[
		{ value: 'left', children: 'Left' },
		{ value: 'center', children: 'Center' },
		{ value: 'right', children: 'Right' }
	]}
/>
\`\`\`

### Multiple Selection
\`\`\`svelte
<script>
	let formats = $state([]);
</script>

<ToggleButtonGroup 
	bind:value={formats}
	multiple
	buttons={[
		{ value: 'bold', children: 'Bold' },
		{ value: 'italic', children: 'Italic' },
		{ value: 'underline', children: 'Underline' }
	]}
/>
\`\`\`

### With Icons
\`\`\`svelte
<ToggleButtonGroup 
	bind:value={alignment}
	buttons={[
		{ 
			value: 'left',
			prefix: () => '<Icon name="align-left" />'
		},
		{ 
			value: 'center',
			prefix: () => '<Icon name="align-center" />'
		},
		{ 
			value: 'right',
			prefix: () => '<Icon name="align-right" />'
		}
	]}
/>
\`\`\`

### View Mode Selector
\`\`\`svelte
<script>
	let viewMode = $state('grid');
</script>

<ToggleButtonGroup 
	bind:value={viewMode}
	variant="outline"
	buttons={[
		{ 
			value: 'grid',
			prefix: () => '<Icon name="grid" />',
			children: 'Grid'
		},
		{ 
			value: 'list',
			prefix: () => '<Icon name="list" />',
			children: 'List'
		}
	]}
/>
\`\`\`

### Filter Group
\`\`\`svelte
<script>
	let filters = $state(['active']);
</script>

<ToggleButtonGroup 
	bind:value={filters}
	multiple
	variant="soft"
	buttons={[
		{ value: 'active', children: 'Active' },
		{ value: 'pending', children: 'Pending' },
		{ value: 'archived', children: 'Archived' }
	]}
/>
\`\`\`

### Size Selector
\`\`\`svelte
<script>
	let size = $state('M');
</script>

<ToggleButtonGroup 
	bind:value={size}
	size="small"
	buttons={[
		{ value: 'XS', children: 'XS' },
		{ value: 'S', children: 'S' },
		{ value: 'M', children: 'M' },
		{ value: 'L', children: 'L' },
		{ value: 'XL', children: 'XL' }
	]}
/>
\`\`\`

### With Change Handler
\`\`\`svelte
<script>
	function handleChange(value) {
		console.log('Selection changed to:', value);
	}
</script>

<ToggleButtonGroup 
	bind:value={selected}
	onChange={handleChange}
	buttons={[...]}
/>
\`\`\`

### Text Formatting Toolbar
\`\`\`svelte
<script>
	let textFormat = $state([]);
	let textAlign = $state('left');
</script>

<div class="flex gap-2">
	<ToggleButtonGroup 
		bind:value={textFormat}
		multiple
		buttons={[
			{ value: 'bold', prefix: () => '<Icon name="bold" />' },
			{ value: 'italic', prefix: () => '<Icon name="italic" />' },
			{ value: 'underline', prefix: () => '<Icon name="underline" />' }
		]}
	/>
	
	<ToggleButtonGroup 
		bind:value={textAlign}
		buttons={[
			{ value: 'left', prefix: () => '<Icon name="align-left" />' },
			{ value: 'center', prefix: () => '<Icon name="align-center" />' },
			{ value: 'right', prefix: () => '<Icon name="align-right" />' }
		]}
	/>
</div>
\`\`\`

### Disabled Group
\`\`\`svelte
<ToggleButtonGroup 
	disabled
	bind:value={selected}
	buttons={[...]}
/>
\`\`\`

## Selection Behavior

### Single Selection Mode (default)
- Only one button can be selected at a time
- Clicking a selected button does nothing
- Value is a single item

### Multiple Selection Mode
- Multiple buttons can be selected
- Clicking toggles selection
- Value is an array of selected items

## Accessibility

- Keyboard navigation between buttons
- Space/Enter to toggle selection
- ARIA attributes for selection state
- Screen reader announcements

## Notes

- Buttons are visually connected as a group
- Selected state is visually distinct
- Individual button props override group props
- Empty selection is allowed in single mode by setting value to null/undefined

## Theme Customization

The ToggleButtonGroup component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **buttonGroup**: Main button group container styles

### Available Variants

**buttonGroup**:
- base: Base classes for button group container (handles spacing between buttons)

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<ToggleButtonGroup 
  bind:value={value}
  buttons={buttons}
  theme={{
    buttonGroup: {
      base: 'flex items-center gap-2'
    }
  }}
/>
\`\`\`

**Custom Group Styling**:
\`\`\`svelte
<ToggleButtonGroup 
  bind:value={value}
  buttons={buttons}
  theme={{
    buttonGroup: {
      base: 'flex items-center gap-1 p-1 bg-gray-100 rounded-lg'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setToggleButtonGroupTheme } from 'svelai/toggle-button-group';
  
  setToggleButtonGroupTheme({
    buttonGroup: {
      base: 'flex items-center gap-1'
    }
  });
</script>
\`\`\`
`;
