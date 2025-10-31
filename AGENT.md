# Uy Component Library - Color System & Tailwind Integration

This project uses **uy** as a component and theme library that extends Tailwind CSS with a sophisticated color system and custom utilities.

## Color System Overview

Uy defines a semantic color palette with 8 main color categories, each with 6 shades:

### Semantic Colors

- **primary** - Main brand color (default: indigo)
- **secondary** - Complementary color (automatically generated from primary if not specified)
- **danger** - Error/destructive actions (default: red)
- **success** - Success states (default: green/blue)
- **warning** - Warning states (default: amber)
- **info** - Informational states (default: cyan)
- **surface** - Background/surface colors (adapts to color scheme)
- **contrast** - High contrast text/elements for text displayed on surface backgrounds, provides text color hierarchy

### Color Shades

Each color has 6 variations:

- **DEFAULT** - Base color
- **light** - 10% lighter
- **lighter** - 25% lighter
- **dark** - 10% darker
- **muted** - Heavily mixed with background (90% opacity)
- **fg** - Foreground color that provides readable contrast

## Custom Tailwind Classes

### **Recommended: Direct Semantic Color Classes**

**Use these direct color classes as the primary approach:**

```css
/* Backgrounds */
bg-primary, bg-primary-light, bg-primary-dark, bg-primary-muted, bg-primary-fg
bg-secondary, bg-secondary-light, bg-secondary-dark, bg-secondary-muted, bg-secondary-fg
bg-danger, bg-danger-light, bg-danger-dark, bg-danger-muted, bg-danger-fg
bg-success, bg-success-light, bg-success-dark, bg-success-muted, bg-success-fg
bg-warning, bg-warning-light, bg-warning-dark, bg-warning-muted, bg-warning-fg
bg-info, bg-info-light, bg-info-dark, bg-info-muted, bg-info-fg
bg-surface, bg-surface-light, bg-surface-dark, bg-surface-muted, bg-surface-fg
bg-contrast, bg-contrast-light, bg-contrast-dark, bg-contrast-muted, bg-contrast-fg

/* Text colors - Use contrast colors for text on surface backgrounds */
text-primary, text-primary-light, text-primary-dark, text-primary-muted, text-primary-fg
text-secondary, text-secondary-light, text-secondary-dark, text-secondary-muted, text-secondary-fg
text-danger, text-danger-light, text-danger-dark, text-danger-muted, text-danger-fg
text-success, text-success-light, text-success-dark, text-success-muted, text-success-fg
text-warning, text-warning-light, text-warning-dark, text-warning-muted, text-warning-fg
text-info, text-info-light, text-info-dark, text-info-muted, text-info-fg
text-surface, text-surface-light, text-surface-dark, text-surface-muted, text-surface-fg
text-contrast, text-contrast-light, text-contrast-dark, text-contrast-muted, text-contrast-fg

/* Border colors follow same pattern */
border-primary, border-primary-light, border-primary-dark, border-primary-muted, border-primary-fg
border-secondary, border-secondary-light, border-secondary-dark, border-secondary-muted, border-secondary-fg
border-danger, border-danger-light, border-danger-dark, border-danger-muted, border-danger-fg
border-success, border-success-light, border-success-dark, border-success-muted, border-success-fg
border-warning, border-warning-light, border-warning-dark, border-warning-muted, border-warning-fg
border-info, border-info-light, border-info-dark, border-info-muted, border-info-fg
border-surface, border-surface-light, border-surface-dark, border-surface-muted, border-surface-fg
border-contrast, border-contrast-light, border-contrast-dark, border-surface-muted, border-contrast-fg
```

### **Advanced: Color Utilities with Data Attributes**

**Note: These are for internal use and advanced scenarios. Prefer direct color classes above.**

#### Context-Aware Color Utilities

```css
bg-color          /* Uses --color CSS variable */
bg-color-light    /* Uses --color-light CSS variable */
bg-color-lighter  /* Uses --color-lighter CSS variable */
bg-color-dark     /* Uses --color-dark CSS variable */
bg-color-muted    /* Uses --color-muted CSS variable */
bg-color-fg       /* Uses --color-fg CSS variable */

text-color        /* Uses --color CSS variable */
text-color-light  /* Uses --color-light CSS variable */
text-color-lighter /* Uses --color-lighter CSS variable */
text-color-dark   /* Uses --color-dark CSS variable */
text-color-muted  /* Uses --color-muted CSS variable */
text-color-fg     /* Uses --color-fg CSS variable */

border-color      /* Uses --color CSS variable */
border-color-light /* Uses --color-light CSS variable */
border-color-lighter /* Uses --color-lighter CSS variable */
border-color-dark /* Uses --color-dark CSS variable */
border-color-muted /* Uses --color-muted CSS variable */
border-color-fg   /* Uses --color-fg CSS variable */
```

#### Data Attributes for Color Context

```html
<div data-color="primary">
	<button class="bg-color text-color-fg">Primary Button</button>
</div>

<div data-color="danger">
	<button class="bg-color text-color-fg">Danger Button</button>
</div>

<div data-color="surface">
	<div class="bg-color border-color-lighter">Surface Card</div>
</div>
```

### Special Utilities

#### Raised Effect

```css
raised-sm    /* Small elevation with border and shadow */
raised-md    /* Medium elevation */
raised-lg    /* Large elevation */
raised-none  /* No elevation */
```

#### Layout Utilities

```css
flex-full    /* flex: 0 0 100% */
h-window     /* height: var(--window-height) */
w-window     /* width: var(--window-width) */
```

#### Direct Child Variant

```css
dc:; /* Targets direct children (& > *) */
```

## Usage Examples

### Primary Component Styling

### Surface/Background with Contrast Text

```html
<div class="bg-surface min-h-screen">
	<div class="bg-surface-light p-6 rounded-lg raised-md border border-surface-muted">
		<!-- Use contrast colors for text hierarchy on surface backgrounds -->
		<h1 class="text-contrast font-bold text-2xl">Main Heading</h1>
		<h2 class="text-contrast-dark font-semibold text-lg">Subheading</h2>
		<p class="text-contrast-muted">Body text with reduced contrast</p>
		<small class="text-contrast-lighter">Secondary information</small>
	</div>
</div>
```

## Best Practices

1. **Use direct semantic color classes**: Prefer `bg-primary`, `text-danger`, etc. as the primary approach
2. **Use contrast colors for text hierarchy**: On surface backgrounds, use `text-contrast` and its shades for proper text hierarchy
3. **Leverage automatic contrast**: The `fg` shade provides automatic readable contrast (e.g., `text-primary-fg` on `bg-primary`)
4. **Surface for backgrounds**: Use `bg-surface` for main layout backgrounds and `text-contrast` for text content
5. **Data attributes for advanced cases**: Only use `data-color` attributes and context-aware classes (`bg-color`, `text-color`) for internal library use or complex dynamic scenarios
6. **Color shades for states**: Use `muted` for subtle backgrounds, `light`/`lighter` for borders, `dark` for emphasis

# Button Component

The Button component is a flexible and customizable button element that supports various variants, sizes, colors, and interactive states.

## Basic Usage

\`\`\`svelte
<Button>Click me</Button>
<Button variant="outline">Outline Button</Button>
<Button color="primary" size="large">Large Primary Button</Button>
\`\`\`

## Props

### Core Props

- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' (default: 'solid')

  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Muted color background
  - ghost: Transparent background, shows background on hover
  - link: Text-only styling with underline on hover

- **color**: 'surface' | 'primary' | 'secondary' | 'contrast' | 'danger' | 'success' | 'warning' | 'info' (default: 'contrast')

  - Determines the color scheme of the button

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: 24px height, smaller padding and text
  - normal: 32px height, standard padding
  - large: 36px height, larger padding and text

### Layout Props

- **fullWidth**: boolean (default: false) - Makes button take full width of container
- **squared**: boolean - Makes button square (aspect-ratio 1:1), auto-determined if only prefix/suffix is provided
- **disabled**: boolean (default: false) - Disables button interaction
- **loading**: boolean (default: false) - Shows loading state and disables interaction

### Link Props

- **href**: string - Makes button render as anchor tag
- **target**: string - Link target (e.g., "\_blank")
- **rel**: string - Link relationship

### Event Props

- **onClick**: (payload?: Payload) => void - Click event handler
- **onEnter**: (payload?: Payload) => void - Pointer enter event handler
- **onLeave**: (payload?: Payload) => void - Pointer leave event handler

### Content Props (Slots)

- **children**: Snippet - Main button content
- **prefix**: Snippet - Content before main text (typically icons)
- **suffix**: Snippet - Content after main text (typically icons)
- **prefixProps**: object - Props passed to prefix slot
- **suffixProps**: object - Props passed to suffix slot
- **childrenProps**: object - Props passed to children slot

### Advanced Props

- **payload**: any - Data passed to event handlers and slots
- **ref**: HTMLElement - Reference to the button element
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

The button follows this DOM structure:
\`\`\`
<Button>
<Prefix /> <!-- Optional prefix content -->
<Children /> <!-- Main button content -->
<Suffix /> <!-- Optional suffix content -->
</Button>
\`\`\`

## Examples

### Basic Buttons

\`\`\`svelte
<Button>Default Button</Button>
<Button variant="outline" color="primary">Primary Outline</Button>
<Button variant="soft" color="danger">Soft Danger</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
\`\`\`

### With Icons

\`\`\`svelte
<Button>
{#snippet prefix()}
<Icon name="plus" />
{/snippet}
Add Item
</Button>

<Button squared>
	{#snippet prefix()}
		<Icon name="settings" />
	{/snippet}
</Button>
\`\`\`

### Interactive States

\`\`\`svelte
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width Button</Button>
\`\`\`

### As Link

\`\`\`svelte
<Button href="/dashboard" target="_blank">Go to Dashboard</Button>
\`\`\`

### With Event Handlers

\`\`\`svelte

<script>
	let payload = { id: 123 };
	
	function handleClick(data) {
		console.log('Clicked with payload:', data);
	}
</script>

<Button {payload} onClick={handleClick}>
Click with Payload
</Button>
\`\`\`

### Custom Styling

\`\`\`svelte
<Button class="shadow-lg border-2" color="primary" variant="outline">
Custom Styled
</Button>
\`\`\`

## Accessibility

- Automatically sets appropriate ARIA roles (button/link)
- Supports keyboard navigation
- Disabled state prevents interaction
- Loading state provides visual feedback

## Notes

- When \`href\` is provided, renders as \`<a>\` tag, otherwise \`<button>\`
- \`squared\` is automatically determined when only prefix or suffix is provided without children
- All event handlers respect disabled state
- Icon sizing is automatically adjusted based on button size


# Svelte MCP Server
You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools of the svelte-mcp-server:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.