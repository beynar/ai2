export const alertDescription = `
# Alert Component

The Alert component displays important messages and notifications to users. It supports icons, titles, descriptions, and multiple color variants to convey different types of information (success, warning, error, info).

## Basic Usage

\`\`\`svelte
<Alert>
	{#snippet title()}
		Alert Title
	{/snippet}
	{#snippet description()}
		This is an important message for the user.
	{/snippet}
</Alert>
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' (default: 'surface')
  - Determines the color scheme of the alert
  - danger: For error messages
  - success: For success messages
  - warning: For warning messages
  - info: For informational messages

- **variant**: 'solid' | 'outline' | 'soft' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Muted color background

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Reduced padding and smaller text
  - normal: Standard padding and text size
  - large: Increased padding and larger text

### Layout Props
- **disabled**: boolean (default: false)
  - Disables interactions and applies opacity styling

### Content Props (Slots)
- **prefix**: Snippet - Icon or content before the alert text (typically an icon)
  - When provided, the grid layout automatically adjusts to accommodate the icon
  - Suggested icons by color:
    - danger: AlertCircle or X icon
    - warning: AlertTriangle icon
    - success: CheckCircle icon
    - info: Info icon
    - default: Info icon
- **title**: Snippet - Alert title text (bold, appears first)
- **description**: Snippet - Alert description text (muted, appears below title)
- **children**: Snippet - Default content (rendered inside description section if description is not provided)

### Styling Props
- **class**: string - Additional CSS classes for the alert container
- **ref**: HTMLElement | null - Reference to the alert element
- **theme**: AlertThemeProps - Custom theme overrides

## Structure

The Alert component uses a CSS Grid layout that automatically adapts based on icon presence:

\`\`\`
<Alert>
	<!-- Icon (optional) -->
	{#snippet prefix()}
		<Icon name="alert-circle" />
	{/snippet}
	
	<!-- Title (optional) -->
	{#snippet title()}
		Alert Title
	{/snippet}
	
	<!-- Description or children -->
	{#snippet description()}
		Alert description text
	{/snippet}
	
	<!-- Or use children -->
	{#snippet children()}
		Alert content
	{/snippet}
</Alert>
\`\`\`

The grid layout:
- When icon is present: \`grid-cols-[calc(var(--spacing)*4)_1fr]\` with gap-x-3
- When no icon: \`grid-cols-[0_1fr]\`
- Icon uses col-start-1, title/description use col-start-2

## Examples

### Basic Alert
\`\`\`svelte
<Alert>
	{#snippet title()}
		Heads up!
	{/snippet}
	{#snippet description()}
		This is a basic alert message.
	{/snippet}
</Alert>
\`\`\`

### Alert with Icon
\`\`\`svelte
<Alert color="info">
	{#snippet prefix()}
		<Icon name="info" />
	{/snippet}
	{#snippet title()}
		Information
	{/snippet}
	{#snippet description()}
		This alert includes an icon.
	{/snippet}
</Alert>
\`\`\`

### Success Alert
\`\`\`svelte
<Alert color="success">
	{#snippet prefix()}
		<Icon name="check-circle" />
	{/snippet}
	{#snippet title()}
		Success!
	{/snippet}
	{#snippet description()}
		Your changes have been saved successfully.
	{/snippet}
</Alert>
\`\`\`

### Warning Alert
\`\`\`svelte
<Alert color="warning" variant="outline">
	{#snippet prefix()}
		<Icon name="alert-triangle" />
	{/snippet}
	{#snippet title()}
		Warning
	{/snippet}
	{#snippet description()}
		Please review your input before proceeding.
	{/snippet}
</Alert>
\`\`\`

### Danger Alert
\`\`\`svelte
<Alert color="danger">
	{#snippet prefix()}
		<Icon name="alert-circle" />
	{/snippet}
	{#snippet title()}
		Error
	{/snippet}
	{#snippet description()}
		Something went wrong. Please try again.
	{/snippet}
</Alert>
\`\`\`

### Alert Variants
\`\`\`svelte
<!-- Solid (default) -->
<Alert variant="solid" color="primary">
	{#snippet title()}
		Solid Alert
	{/snippet}
	{#snippet description()}
		Filled background with color
	{/snippet}
</Alert>

<!-- Outline -->
<Alert variant="outline" color="primary">
	{#snippet title()}
		Outline Alert
	{/snippet}
	{#snippet description()}
		Transparent background with border
	{/snippet}
</Alert>

<!-- Soft -->
<Alert variant="soft" color="primary">
	{#snippet title()}
		Soft Alert
	{/snippet}
	{#snippet description()}
		Muted background
	{/snippet}
</Alert>
\`\`\`

### Alert Sizes
\`\`\`svelte
<Alert size="small" color="info">
	{#snippet title()}
		Small Alert
	{/snippet}
	{#snippet description()}
		Compact size
	{/snippet}
</Alert>

<Alert size="normal" color="info">
	{#snippet title()}
		Normal Alert
	{/snippet}
	{#snippet description()}
		Standard size (default)
	{/snippet}
</Alert>

<Alert size="large" color="info">
	{#snippet title()}
		Large Alert
	{/snippet}
	{#snippet description()}
		Larger padding and text
	{/snippet}
</Alert>
\`\`\`

### Alert with Children Only
\`\`\`svelte
<Alert color="info">
	{#snippet children()}
		Simple alert message without title or description slots.
	{/snippet}
</Alert>
\`\`\`

### Alert without Icon
\`\`\`svelte
<Alert color="surface" variant="soft">
	{#snippet title()}
		No Icon Alert
	{/snippet}
	{#snippet description()}
		The grid layout automatically adjusts when no icon is provided.
	{/snippet}
</Alert>
\`\`\`

### Disabled Alert
\`\`\`svelte
<Alert disabled={true} color="info">
	{#snippet title()}
		Disabled Alert
	{/snippet}
	{#snippet description()}
		This alert is disabled and non-interactive.
	{/snippet}
</Alert>
\`\`\`

## Accessibility

- The alert container has \`role="alert"\` attribute for screen readers
- Icons inherit text color via \`text-current\` for proper contrast
- Description text uses muted foreground color for visual hierarchy
- The component uses semantic HTML structure with data attributes for styling hooks

## Notes

- The grid layout automatically adjusts based on icon presence (hasIcon variant)
- Icons are sized based on the alert size (small: size-3, normal: size-4, large: size-5)
- Title and description stack vertically in the second column
- When description is not provided, children slot content is rendered in its place
- The component supports all standard colors from the design system
- Compound variants handle special color+variant combinations (e.g., danger+soft for muted error styling)

## Theme Customization

The Alert component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **alert**: Main alert container styles
- **prefix**: Icon/prefix content styles
- **content**: Content wrapper styles
- **title**: Alert title text styles
- **description**: Alert description text styles

### Theme Type Definition

\`\`\`typescript
import type { AlertThemeProps } from 'svelai/alert';

// Example theme customization
const customTheme: AlertThemeProps = {
  alert: {
    base: 'custom-base-classes',
    hasIcon: {
      true: '',
      false: ''
    },
    color: {
      primary: 'bg-primary text-primary-fg border-primary',
      danger: 'bg-danger text-danger-fg border-danger'
    },
    variant: {
      solid: 'bg-color text-color-fg border-color',
      outline: 'bg-transparent border-color text-color',
      soft: 'bg-color-muted text-color border-transparent'
    },
    size: {
      small: 'px-3 py-2 text-xs',
      normal: 'px-4 py-3 text-sm',
      large: 'px-5 py-4 text-base'
    },
    disabled: {
      true: 'opacity-55 cursor-not-allowed',
      false: null
    },
    hasDescription: {
      true: '',
      false: ''
    },
    hasTitle: {
      true: '',
      false: ''
    }
  },
  prefix: {
    size: {
      small: '[&>svg]:size-4',
      normal: '[&>svg]:size-5',
      large: '[&>svg]:size-6'
    }
  },
  title: {
    size: {
      small: 'text-sm',
      normal: 'text-base',
      large: 'text-md'
    }
  },
  description: {
    size: {
      small: 'text-xs',
      normal: 'text-sm',
      large: 'text-base'
    }
  }
};
\`\`\`

### Available Variants

**alert**:
- base: Base classes applied to all alerts
- Variants:
  - hasIcon: boolean - Grid layout adjustment when icon is present
  - color: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' - Color scheme
  - variant: 'solid' | 'outline' | 'soft' - Visual style variant
  - size: 'small' | 'normal' | 'large' - Controls padding and text size
  - disabled: boolean - Disabled state styling
  - hasDescription: boolean - Layout adjustment when description is present
  - hasTitle: boolean - Layout adjustment when title is present

**prefix**:
- base: Base classes for icon/prefix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size based on alert size

**content**:
- base: Base classes for content wrapper (flex container)

**title**:
- base: Base classes for title text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**description**:
- base: Base classes for description text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Alert 
  theme={{
    alert: {
      base: 'rounded-xl shadow-lg',
      variant: {
        solid: 'border-2'
      }
    },
    title: {
      size: {
        large: 'text-xl font-bold'
      }
    }
  }}
>
  {#snippet title()}
    Custom Styled Alert
  {/snippet}
</Alert>
\`\`\`

**Color and Variant Customization**:
\`\`\`svelte
<Alert 
  color="danger"
  variant="soft"
  theme={{
    alert: {
      variant: {
        soft: 'bg-red-50 border-red-200 text-red-800'
      }
    },
    prefix: {
      size: {
        normal: '[&>svg]:size-6 text-red-600'
      }
    }
  }}
>
  {#snippet prefix()}
    <Icon name="alert-circle" />
  {/snippet}
  {#snippet title()}
    Error Alert
  {/snippet}
</Alert>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setAlertTheme } from 'svelai/alert';
  
  setAlertTheme({
    alert: {
      base: 'rounded-lg transition-all',
      variant: {
        solid: 'shadow-md',
        outline: 'border-2',
        soft: 'bg-opacity-20'
      }
    },
    prefix: {
      size: {
        normal: '[&>svg]:size-6'
      }
    }
  });
</script>
\`\`\`
`;
