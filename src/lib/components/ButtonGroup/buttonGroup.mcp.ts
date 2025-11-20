export const buttonGroupDescription = `
# ButtonGroup Component

The ButtonGroup component displays a collection of related buttons as a cohesive group with shared styling properties.

## Basic Usage

\`\`\`svelte
<ButtonGroup 
	buttons={[
		{ children: 'First' },
		{ children: 'Second' },
		{ children: 'Third' }
	]}
/>
\`\`\`

## Props

### Core Props
- **buttons**: Array<ButtonProps> (required) - Array of button configurations
  - Each button can have all standard Button component props

### Shared Button Props
- **size**: 'small' | 'normal' | 'large' - Applied to all buttons in the group
- **color**: 'surface' | 'primary' | 'secondary' | 'contrast' | 'danger' | 'success' | 'warning' | 'info' - Shared color for all buttons
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' - Shared variant for all buttons
- **disabled**: boolean - Disables all buttons in the group

### Styling Props
- **class**: string - Additional CSS classes for the group container
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<ButtonGroup>
	<Button />
	<Button />
	<Button />
</ButtonGroup>
\`\`\`

## Examples

### Basic Button Group
\`\`\`svelte
<ButtonGroup 
	buttons={[
		{ children: 'Left' },
		{ children: 'Center' },
		{ children: 'Right' }
	]}
/>
\`\`\`

### With Shared Styling
\`\`\`svelte
<ButtonGroup 
	size="large"
	color="primary"
	variant="outline"
	buttons={[
		{ children: 'Option 1' },
		{ children: 'Option 2' },
		{ children: 'Option 3' }
	]}
/>
\`\`\`

### With Icons
\`\`\`svelte
<ButtonGroup 
	buttons={[
		{ 
			prefix: () => '<Icon name="align-left" />',
			children: 'Left' 
		},
		{ 
			prefix: () => '<Icon name="align-center" />',
			children: 'Center' 
		},
		{ 
			prefix: () => '<Icon name="align-right" />',
			children: 'Right' 
		}
	]}
/>
\`\`\`

### With Individual Click Handlers
\`\`\`svelte
<script>
	function handleOption(option) {
		console.log(\`Selected: \${option}\`);
	}
</script>

<ButtonGroup 
	buttons={[
		{ 
			children: 'Save',
			onClick: () => handleOption('save')
		},
		{ 
			children: 'Cancel',
			onClick: () => handleOption('cancel')
		}
	]}
/>
\`\`\`

### Disabled Group
\`\`\`svelte
<ButtonGroup 
	disabled
	buttons={[
		{ children: 'Option 1' },
		{ children: 'Option 2' }
	]}
/>
\`\`\`

### Icon Only Buttons
\`\`\`svelte
<ButtonGroup 
	buttons={[
		{ 
			squared: true,
			prefix: () => '<Icon name="bold" />'
		},
		{ 
			squared: true,
			prefix: () => '<Icon name="italic" />'
		},
		{ 
			squared: true,
			prefix: () => '<Icon name="underline" />'
		}
	]}
/>
\`\`\`

### Mixed Button States
\`\`\`svelte
<ButtonGroup 
	variant="outline"
	buttons={[
		{ children: 'Active', color: 'primary' },
		{ children: 'Default', color: 'surface' },
		{ children: 'Disabled', disabled: true }
	]}
/>
\`\`\`

### Segmented Control
\`\`\`svelte
<script>
	let selected = $state('week');
</script>

<ButtonGroup 
	buttons={[
		{ 
			children: 'Day',
			variant: selected === 'day' ? 'solid' : 'ghost',
			onClick: () => selected = 'day'
		},
		{ 
			children: 'Week',
			variant: selected === 'week' ? 'solid' : 'ghost',
			onClick: () => selected = 'week'
		},
		{ 
			children: 'Month',
			variant: selected === 'month' ? 'solid' : 'ghost',
			onClick: () => selected = 'month'
		}
	]}
/>
\`\`\`

## Styling

ButtonGroup automatically:
- Removes border-radius from middle buttons
- Adjusts borders to prevent double borders
- Creates a cohesive, connected appearance
- Maintains consistent spacing

## Accessibility

- Each button maintains full keyboard accessibility
- Focus styles are preserved
- Disabled state cascades properly
- Screen readers announce each button individually

## Notes

- Individual button props override shared props
- Buttons are rendered in the order provided
- The group container can be styled with the \`class\` prop
- All Button component features are supported for individual buttons

## Theme Customization

The ButtonGroup component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **buttonGroup**: Main button group container styles

### Available Variants

**buttonGroup**:
- base: Base classes for button group container (handles border radius and border connections between buttons)

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<ButtonGroup 
  buttons={buttons}
  theme={{
    buttonGroup: {
      base: 'flex items-center rounded-lg overflow-hidden'
    }
  }}
/>
\`\`\`

**Custom Group Styling**:
\`\`\`svelte
<ButtonGroup 
  buttons={buttons}
  theme={{
    buttonGroup: {
      base: 'flex items-center gap-0 border-2 border-primary rounded-lg overflow-hidden'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setButtonGroupTheme } from 'svelai/button-group';
  
  setButtonGroupTheme({
    buttonGroup: {
      base: 'flex items-center first-child:rounded-r-none last-child:rounded-l-none'
    }
  });
</script>
\`\`\`
`;
