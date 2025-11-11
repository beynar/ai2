export const tabbarDescription = `
# Tabbar Component

The Tabbar component is a flexible navigation component that displays a list of tabs with support for active state management, custom styling, icons, and links.

## Basic Usage

\`\`\`svelte
<script>
	let activeTab = $state(0);
</script>

<Tabbar tabs={['Home', 'Profile', 'Settings']} bind:activeTab />
\`\`\`

## Props

### Core Props
- **tabs**: Array<string | TabItem> (required)
  - Array of tab items. Each item can be:
    - A simple string (e.g., "Home")
    - A TabItem object with: { label, prefix?, suffix?, href?, disabled?, target?, rel? }
  
- **activeTab**: number (default: 0, bindable)
  - The index of the currently active tab
  - Can be bound with \`bind:activeTab\`

- **onChange**: (index: number) => void
  - Callback function called when the active tab changes
  - Receives the new tab index as an argument

### Styling Props
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact size with smaller padding and text
  - normal: Standard size
  - large: Larger size with more padding

- **orientation**: 'horizontal' | 'vertical' (default: 'horizontal')
  - horizontal: Tabs arranged in a row
  - vertical: Tabs arranged in a column

- **color**: 'surface' | 'primary' | 'secondary' | 'contrast' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
  - Determines the color scheme of the active tab

- **alignment**: 'start' | 'center' | 'end' (default: 'start')
  - start: Tabs aligned to the start of the container
  - center: Tabs centered in the container
  - end: Tabs aligned to the end of the container

### Advanced Props
- **class**: string - Additional CSS classes for the tabbar container
- **theme**: TabbarThemeProps - Custom theme overrides

## TabItem Structure

When using object format for tabs:

\`\`\`typescript
type TabItem = {
  label: string | Snippet;      // Tab label (required)
  prefix?: Snippet;              // Icon or content before label
  suffix?: Snippet;              // Icon or content after label
  href?: string;                 // URL for navigation tabs
  disabled?: boolean;            // Disable the tab
  target?: string;               // Link target (e.g., "_blank")
  rel?: string;                  // Link relationship
}
\`\`\`

## Structure

The tabbar follows this DOM structure:
\`\`\`
<Tabbar>
	<Tab>
		<TabContent>      <!-- Optional wrapper when prefix/suffix exist -->
			<Prefix />      <!-- Optional prefix content -->
			<Label />       <!-- Tab label -->
			<Suffix />      <!-- Optional suffix content -->
		</TabContent>
	</Tab>
	<!-- More tabs... -->
</Tabbar>
\`\`\`

## Examples

### Simple String Tabs
\`\`\`svelte
<script>
	let activeTab = $state(0);
</script>

<Tabbar 
	tabs={['Home', 'About', 'Contact']} 
	bind:activeTab 
	color="primary"
/>
\`\`\`

### Tabs with Icons
\`\`\`svelte
<script>
	import { homeIcon, userIcon, settingsIcon } from './icons';
	
	let activeTab = $state(0);
	
	const tabs = [
		{
			label: 'Home',
			prefix: homeIcon
		},
		{
			label: 'Profile',
			prefix: userIcon
		},
		{
			label: 'Settings',
			prefix: settingsIcon
		}
	];
</script>

<Tabbar {tabs} bind:activeTab />
\`\`\`

### Navigation Tabs (with links)
\`\`\`svelte
<script>
	const tabs = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Analytics', href: '/analytics' },
		{ label: 'Reports', href: '/reports' }
	];
</script>

<Tabbar {tabs} />
\`\`\`

### Tabs with Disabled State
\`\`\`svelte
<script>
	let activeTab = $state(0);
	
	const tabs = [
		{ label: 'Enabled Tab' },
		{ label: 'Disabled Tab', disabled: true },
		{ label: 'Another Tab' }
	];
</script>

<Tabbar {tabs} bind:activeTab />
\`\`\`

### Vertical Orientation
\`\`\`svelte
<script>
	let activeTab = $state(0);
</script>

<Tabbar 
	tabs={['First', 'Second', 'Third']} 
	bind:activeTab 
	orientation="vertical"
/>
\`\`\`

### Different Alignments
\`\`\`svelte
<script>
	let activeTab = $state(0);
</script>

<!-- Centered tabs -->
<Tabbar tabs={['One', 'Two', 'Three']} bind:activeTab alignment="center" />

<!-- Right-aligned tabs -->
<Tabbar tabs={['One', 'Two', 'Three']} bind:activeTab alignment="end" />
\`\`\`

### With onChange Callback
\`\`\`svelte
<script>
	let activeTab = $state(0);
	
	function handleTabChange(index: number) {
		console.log('Active tab changed to:', index);
		// Perform additional actions
	}
</script>

<Tabbar 
	tabs={['Tab 1', 'Tab 2', 'Tab 3']} 
	bind:activeTab 
	onChange={handleTabChange}
/>
\`\`\`

### Different Sizes and Colors
\`\`\`svelte
<script>
	let activeTab = $state(0);
</script>

<!-- Small size with secondary color -->
<Tabbar 
	tabs={['Small', 'Tabs']} 
	bind:activeTab 
	size="small"
	color="secondary"
/>

<!-- Large size with success color -->
<Tabbar 
	tabs={['Large', 'Tabs']} 
	bind:activeTab 
	size="large"
	color="success"
/>
\`\`\`

### Complex Tabs with Badges
\`\`\`svelte
<script>
	import Badge from '../Badge/Badge.svelte';
	
	let activeTab = $state(0);
	
	const tabs = [
		{ label: 'Inbox' },
		{
			label: 'Messages',
			suffix: () => ({
				{#snippet()}
					<Badge color="danger" size="small">5</Badge>
				{/snippet}
			})
		},
		{ label: 'Sent' }
	];
</script>

<Tabbar {tabs} bind:activeTab />
\`\`\`

### External Links
\`\`\`svelte
<script>
	const tabs = [
		{ label: 'Internal', href: '/dashboard' },
		{ label: 'External', href: 'https://example.com', target: '_blank', rel: 'noopener' }
	];
</script>

<Tabbar {tabs} />
\`\`\`

## Accessibility

The Tabbar component follows WAI-ARIA best practices for tablist patterns:

### ARIA Attributes
- Sets \`role="tablist"\` on the container
- Sets \`role="tab"\` on each tab button
- Sets \`aria-selected="true"\` on the active tab, \`"false"\` on others
- Sets \`aria-disabled="true"\` on disabled tabs
- Sets \`aria-activedescendant\` on the container to reference the active tab
- Implements roving tabindex pattern (active tab has \`tabindex="0"\`, others have \`tabindex="-1"\`)

### Keyboard Navigation
Full keyboard support following WAI-ARIA best practices:

**Horizontal Orientation:**
- **Arrow Left**: Move focus to previous tab
- **Arrow Right**: Move focus to next tab
- **Home**: Move focus to first tab
- **End**: Move focus to last tab
- **Enter/Space**: Activate the focused tab

**Vertical Orientation:**
- **Arrow Up**: Move focus to previous tab
- **Arrow Down**: Move focus to next tab
- **Home**: Move focus to first tab
- **End**: Move focus to last tab
- **Enter/Space**: Activate the focused tab

**Behavior:**
- Arrow keys move keyboard **focus** (visual indicator with ring)
- Enter/Space keys **activate** the focused tab (changes selection)
- Focus automatically wraps around (loops from last to first and vice versa)
- Disabled tabs are automatically skipped during navigation
- Focused tab automatically scrolls into view (smooth scroll)
- All navigation keys are prevented from scrolling the page
- Focus ring color matches the tab's color scheme

**Visual States:**
- **Active tab**: Colored text, background, and bottom/left border
- **Focused tab**: Ring outline in theme color (keyboard navigation)
- **Inactive tab**: Neutral gray text with subtle hover effect

## Notes

- When \`href\` is provided in a tab, it renders as an \`<a>\` tag, otherwise as a \`<button>\`
- Disabled tabs cannot be clicked and do not trigger \`onChange\`
- Active tab index is zero-based (first tab = 0)
- The \`activeTab\` prop is bindable for two-way data binding
- Tabs with \`href\` will not update \`activeTab\` on click (they navigate instead)
- Icon/content sizing is automatically adjusted based on tab size
- The component is fully responsive and works with all color schemes
`;

