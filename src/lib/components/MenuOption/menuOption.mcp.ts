export const menuOptionDescription = `
# MenuOption Component

The MenuOption component is a flexible menu item that can be used in dropdown menus, navigation menus, or context menus. It supports title/description layout, custom content, icons, colors, and various interaction handlers.

## Basic Usage

\`\`\`svelte
<MenuOption>
	{#snippet title()}
		My Menu Item
	{/snippet}
</MenuOption>
\`\`\`

## Props

### Core Props
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact menu item (28px min height)
  - normal: Standard menu item (36px min height)
  - large: Spacious menu item (44px min height)
- **color**: Colors (default: 'primary') - Sets the text color and hover background color
  - Available: primary, secondary, success, warning, danger, info, contrast, surface

### Content Slots
Either use **title/description** OR **children** (mutually exclusive):
- **title**: Snippet - Main text of the menu item
- **description**: Snippet - Secondary descriptive text below the title
- **children**: Snippet - Custom content (replaces title+description)

### Icon/Badge Slots
- **prefix**: Snippet - Icon or badge at the start of the menu item
- **suffix**: Snippet - Icon or badge at the end of the menu item

### Interaction Props
- **onClick**: (event: MouseEvent) => void - Click event handler
- **onEnter**: (event: MouseEvent) => void - Pointer enter event handler
- **onLeave**: (event: MouseEvent) => void - Pointer leave event handler

### Link Props
- **href**: string - If provided, renders as an anchor element
- **target**: string - Link target attribute (e.g., '_blank')
- **rel**: string - Link rel attribute (e.g., 'noopener noreferrer')

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: MenuOptionThemeProps - Custom theme overrides
- **as**: string - Override the automatic element type detection

## Menu Structure

\`\`\`
<MenuOption>
	<Prefix />              <!-- Icon/badge at start -->
	<Content>               <!-- Main content area -->
		<Title />           <!-- Primary text -->
		<Description />     <!-- Secondary text -->
	</Content>
	<Suffix />              <!-- Icon/badge at end -->
</MenuOption>
\`\`\`

## Examples

### Basic Menu Item with Title
\`\`\`svelte
<MenuOption>
	{#snippet title()}
		Settings
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item with Title and Description
\`\`\`svelte
<MenuOption>
	{#snippet title()}
		Account Settings
	{/snippet}
	{#snippet description()}
		Manage your account preferences and security
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item with Prefix Icon
\`\`\`svelte
<script>
	import { Settings } from '$lib/components/Icons/index.svelte.js';
</script>

<MenuOption>
	{#snippet prefix()}
		<Settings />
	{/snippet}
	{#snippet title()}
		Settings
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item with Suffix Icon
\`\`\`svelte
<script>
	import { ChevronRight } from '$lib/components/Icons/index.svelte.js';
</script>

<MenuOption>
	{#snippet title()}
		More Options
	{/snippet}
	{#snippet suffix()}
		<ChevronRight />
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item with Both Icons
\`\`\`svelte
<script>
	import { User, Check } from '$lib/components/Icons/index.svelte.js';
</script>

<MenuOption>
	{#snippet prefix()}
		<User />
	{/snippet}
	{#snippet title()}
		John Doe
	{/snippet}
	{#snippet suffix()}
		<Check class="text-success" />
	{/snippet}
</MenuOption>
\`\`\`

### Different Sizes
\`\`\`svelte
<MenuOption size="small">
	{#snippet title()}Small Menu Item{/snippet}
</MenuOption>

<MenuOption size="normal">
	{#snippet title()}Normal Menu Item{/snippet}
</MenuOption>

<MenuOption size="large">
	{#snippet title()}Large Menu Item{/snippet}
</MenuOption>
\`\`\`

### Different Colors
\`\`\`svelte
<MenuOption color="primary">
	{#snippet title()}Primary{/snippet}
</MenuOption>

<MenuOption color="danger">
	{#snippet title()}Delete{/snippet}
</MenuOption>

<MenuOption color="success">
	{#snippet title()}Approve{/snippet}
</MenuOption>
\`\`\`

### Interactive Menu Item with Click Handler
\`\`\`svelte
<script>
	let count = $state(0);
</script>

<MenuOption onClick={() => count++}>
	{#snippet title()}
		Clicked {count} times
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item with Hover Handlers
\`\`\`svelte
<script>
	let isHovered = $state(false);
</script>

<MenuOption 
	onEnter={() => isHovered = true}
	onLeave={() => isHovered = false}
>
	{#snippet title()}
		{isHovered ? 'Hovering!' : 'Hover over me'}
	{/snippet}
</MenuOption>
\`\`\`

### Menu Item as Link
\`\`\`svelte
<MenuOption href="/settings">
	{#snippet title()}
		Go to Settings
	{/snippet}
</MenuOption>
\`\`\`

### External Link
\`\`\`svelte
<MenuOption 
	href="https://example.com" 
	target="_blank" 
	rel="noopener noreferrer"
>
	{#snippet title()}
		Visit External Site
	{/snippet}
	{#snippet suffix()}
		<ExternalLink />
	{/snippet}
</MenuOption>
\`\`\`

### Custom Content with Children
\`\`\`svelte
<MenuOption>
	{#snippet children()}
		<div class="flex items-center gap-2">
			<img src="/avatar.jpg" alt="User" class="w-8 h-8 rounded-full" />
			<div>
				<div class="font-bold">John Doe</div>
				<div class="text-xs text-contrast/70">john@example.com</div>
			</div>
		</div>
	{/snippet}
</MenuOption>
\`\`\`

### Menu with Multiple Options
\`\`\`svelte
<script>
	import { Settings, User, LogOut, HelpCircle } from '$lib/components/Icons/index.svelte.js';
</script>

<div class="w-64 bg-surface rounded-large border border-surface-muted p-1">
	<MenuOption>
		{#snippet prefix()}<User />{/snippet}
		{#snippet title()}Profile{/snippet}
		{#snippet description()}View and edit your profile{/snippet}
	</MenuOption>
	
	<MenuOption>
		{#snippet prefix()}<Settings />{/snippet}
		{#snippet title()}Settings{/snippet}
		{#snippet description()}Manage your preferences{/snippet}
	</MenuOption>
	
	<MenuOption>
		{#snippet prefix()}<HelpCircle />{/snippet}
		{#snippet title()}Help & Support{/snippet}
	</MenuOption>
	
	<div class="border-t border-surface-muted my-1"></div>
	
	<MenuOption color="danger">
		{#snippet prefix()}<LogOut />{/snippet}
		{#snippet title()}Log Out{/snippet}
	</MenuOption>
</div>
\`\`\`

### With Custom Theme
\`\`\`svelte
<MenuOption 
	theme={{
		menuOption: { base: 'rounded-full' },
		title: { base: 'font-bold' }
	}}
>
	{#snippet title()}
		Custom Styled Menu Item
	{/snippet}
</MenuOption>
\`\`\`

### With Attachments
\`\`\`svelte
<script>
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	
	let loading = $state(false);
	
	async function handleClick() {
		loading = true;
		await fetch('/api/action');
		loading = false;
	}
</script>

<MenuOption 
	onClick={handleClick}
	{@attach spinnerOverlay({ loading })}
>
	{#snippet title()}
		Perform Action
	{/snippet}
</MenuOption>
\`\`\`

### Override Element Type
\`\`\`svelte
<!-- Force render as div even with onClick -->
<MenuOption as="div" onClick={() => console.log('clicked')}>
	{#snippet title()}
		Custom Element Type
	{/snippet}
</MenuOption>
\`\`\`

## Accessibility

- Automatically sets appropriate \`role\` attribute based on element type
  - \`button\` for interactive elements
  - \`link\` for anchor elements
  - \`menuitem\` for non-interactive elements
- Supports keyboard navigation when used as button or link
- Proper semantic HTML structure
- Color contrast meets accessibility standards

## Element Type Detection

The component automatically determines the HTML element to render:
1. If \`as\` prop is provided → uses that element
2. If \`href\` is provided → renders as \`<a>\`
3. If \`onClick\`, \`onEnter\`, or \`onLeave\` is provided → renders as \`<button>\`
4. Otherwise → renders as \`<div>\`

## Notes

- Title and description snippets are mutually exclusive with children snippet
- Hover states automatically apply background color based on the color prop
- Prefix icons are positioned at the start, suffix icons at the end (with ml-auto)
- All color variants include appropriate hover states with muted backgrounds
- Works well within Popover or Dialog components for dropdown menus

## Theme Customization

The MenuOption component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **menuOption**: Main menu option container styles
- **title**: Menu option title text styles
- **description**: Menu option description text styles
- **prefix**: Prefix icon/content styles
- **suffix**: Suffix icon/content styles
- **content**: Content wrapper styles

### Available Variants

**menuOption**:
- base: Base classes applied to all menu options
- Variants:
  - size: 'small' | 'normal' | 'large' - Controls padding, text size, gap, and min-height
  - color: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' - Color scheme and hover states

**title**:
- base: Base classes for title text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**description**:
- base: Base classes for description text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**prefix**:
- base: Base classes for prefix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size
  - align: 'start' | 'center' - Vertical alignment

**suffix**:
- base: Base classes for suffix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size

**content**:
- base: Base classes for content wrapper
- Variants:
  - size: 'small' | 'normal' | 'large' - Gap spacing between title and description

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<MenuOption 
  theme={{
    menuOption: {
      base: 'rounded-lg',
      size: {
        large: 'px-4 py-3 min-h-12'
      }
    },
    title: {
      size: {
        large: 'text-lg font-semibold'
      }
    }
  }}
>
  {#snippet title()}
    Custom Menu Option
  {/snippet}
</MenuOption>
\`\`\`

**Color Customization**:
\`\`\`svelte
<MenuOption 
  color="danger"
  theme={{
    menuOption: {
      color: {
        danger: 'text-red-600 highlight:bg-red-50 highlight:text-red-700'
      }
    }
  }}
>
  {#snippet title()}
    Delete Item
  {/snippet}
</MenuOption>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setMenuOptionTheme } from 'svelai/menu-option';
  
  setMenuOptionTheme({
    menuOption: {
      base: 'rounded-md transition-colors',
      size: {
        normal: 'px-3 py-2'
      }
    },
    prefix: {
      size: {
        normal: 'w-5 h-5'
      }
    }
  });
</script>
\`\`\`
`;
