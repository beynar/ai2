export const tabsDescription = `
# Tabs Component

The Tabs component combines a Tabbar for navigation with a Stepper for animated content panels. It provides a complete tabbed interface with smooth transitions between tab content.

## Basic Usage

\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Home', 'Profile', 'Settings'];
</script>

<Tabs {tabs}>
	{#snippet tab1()}
		<div>Home content</div>
	{/snippet}
	{#snippet tab2()}
		<div>Profile content</div>
	{/snippet}
	{#snippet tab3()}
		<div>Settings content</div>
	{/snippet}
</Tabs>
\`\`\`

## Props

### Core Props
- **tabs**: Array<string | TabItem> (required)
  - Array of tab items. Each item can be:
    - A simple string (e.g., "Home")
    - A TabItem object with: { label, prefix?, suffix?, href?, disabled?, target?, rel? }
  - Inherited from Tabbar component

- **activeTab**: number (default: 0, bindable)
  - The index of the currently active tab
  - Can be bound with \`bind:activeTab\`

- **onChange**: (index: number) => void
  - Callback function called when the active tab changes
  - Receives the new tab index as an argument

- **placement**: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
  - Controls where the tabbar appears relative to the content
  - Automatically sets tabbar orientation (horizontal for top/bottom, vertical for left/right)

### Content Props (Snippets)
- **tab**: Snippet<[{ stepper, item, index }]>
  - Default snippet to render for each tab panel
  - Use this when you want flexible rendering based on the tab item data
  - Receives: \`stepper\` (StepperState), \`item\` (TabItem), \`index\` (number)
  - Allows conditional rendering based on item values
  - Example: Use when you want to render different content based on the tab label or item properties

- **tab1, tab2, tab3, ...**: Snippet<[{ stepper, item, index }]>
  - Content snippets for each specific tab panel (1-based numbering)
  - Number corresponds to tab index (tab1 = first tab, tab2 = second tab, etc.)
  - Receives: \`stepper\` (StepperState), \`item\` (TabItem), \`index\` (number)
  - Use when you want explicit control over each tab's content
  - Takes precedence over the \`tab\` prop when both are provided

### Animation Props
- **keyFramesOptions**: object (default: { duration: 300, easing: 'ease-in-out', fill: 'both' })
  - duration: Animation duration in milliseconds
  - easing: CSS easing function
  - fill: Animation fill mode

### Tabbar Styling Props
- **tabbarSize**: 'small' | 'normal' | 'large' (default: 'normal')
  - The size of the tabs in the tabbar

- **tabbarOrientation**: 'horizontal' | 'vertical' (default: 'horizontal')
  - The orientation of the tabbar

- **tabbarColor**: Colors (default: 'primary')
  - The color scheme of the tabs
  - Available: primary, secondary, success, warning, danger, info, contrast, surface

- **tabbarAlignment**: 'start' | 'center' | 'end' (default: 'start')
  - The alignment of the tabs within the container

- **tabbarFullWidth**: boolean (default: false)
  - Whether the tabbar should be full width
  - When true, the tabbar and individual tabs will expand to fill the available width

- **tabbarClass**: string
  - Additional CSS classes for the tabbar container

- **tabbarTheme**: TabbarThemeProps
  - Custom theme overrides for the tabbar

### Advanced Props
- **stepper**: StepperState (bindable)
  - Bindable reference to the stepper state
  - Provides methods: next(), previous(), goTo(index)
  - Allows programmatic control of tab navigation

- **class**: string - Additional CSS classes for the tabs container
- **theme**: TabsThemeProps - Custom theme overrides for the tabs wrapper

## Structure

The Tabs component follows this DOM structure:
\`\`\`
<Tabs>
  <Tabbar>           <!-- Navigation tabs -->
    <Tab />
    <Tab />
    ...
  </Tabbar>
  <Content>          <!-- Content area -->
    <Stepper>        <!-- Animated panel container -->
      <Panel />      <!-- Active panel content -->
    </Stepper>
  </Content>
</Tabs>
\`\`\`

## Examples

### Simple Tabs with Content
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	let activeTab = $state(0);
	const tabs = ['Overview', 'Details', 'Settings'];
</script>

<Tabs {tabs} bind:activeTab>
	{#snippet tab1()}
		<div class="p-4">
			<h2>Overview</h2>
			<p>This is the overview section.</p>
		</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4">
			<h2>Details</h2>
			<p>Here are the detailed information.</p>
		</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4">
			<h2>Settings</h2>
			<p>Configure your preferences here.</p>
		</div>
	{/snippet}
</Tabs>
\`\`\`

### Flexible Rendering with Default Tab Snippet
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	let activeTab = $state(0);
	const tabs = ['Overview', 'Details', 'Settings'];
</script>

<Tabs {tabs} bind:activeTab>
	{#snippet tab({ index, item, stepper })}
		{#if item === 'Overview'}
			<div class="p-6">
				<h3 class="mb-3 text-xl font-semibold">{item}</h3>
				<p class="text-contrast/80">
					Content for Overview tab at index {index}
				</p>
			</div>
		{:else if item === 'Details'}
			<div class="p-6">
				<h3 class="mb-3 text-xl font-semibold">{item}</h3>
				<p class="text-contrast/80">
					Content for Details tab at index {index}
				</p>
			</div>
		{:else if item === 'Settings'}
			<div class="p-6">
				<h3 class="mb-3 text-xl font-semibold">{item}</h3>
				<p class="text-contrast/80">
					Content for Settings tab at index {index}
				</p>
			</div>
		{/if}
	{/snippet}
</Tabs>
\`\`\`

This approach allows you to conditionally render content based on the tab item value, making it more flexible when you have dynamic tab arrays or want to reuse the same snippet logic across multiple tabs.

### Tabs with Icons
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	import { homeIcon, userIcon, gearIcon } from '$lib/components/Icons';
	
	const tabs = [
		{ label: 'Home', prefix: homeIcon },
		{ label: 'Profile', prefix: userIcon },
		{ label: 'Settings', prefix: gearIcon }
	];
</script>

<Tabs {tabs}>
	{#snippet tab1()}
		<div>Home dashboard content</div>
	{/snippet}
	{#snippet tab2()}
		<div>User profile information</div>
	{/snippet}
	{#snippet tab3()}
		<div>Application settings</div>
	{/snippet}
</Tabs>
\`\`\`

### Programmatic Navigation
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	import { Button } from '$lib/components/Button';
	import type { StepperState } from '$lib/components/Stepper';
	
	let stepper = $state<StepperState>();
	const tabs = ['Step 1', 'Step 2', 'Step 3'];
</script>

<Tabs {tabs} bind:stepper>
	{#snippet tab1()}
		<div class="p-4">
			<p>First step content</p>
			<Button onclick={() => stepper?.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4">
			<p>Second step content</p>
			<Button onclick={() => stepper?.previous()}>Back</Button>
			<Button onclick={() => stepper?.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4">
			<p>Final step content</p>
			<Button onclick={() => stepper?.previous()}>Back</Button>
			<Button onclick={() => stepper?.goTo(0)}>Start Over</Button>
		</div>
	{/snippet}
</Tabs>
\`\`\`

### With onChange Callback
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	let activeTab = $state(0);
	const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
	
	function handleTabChange(index: number) {
		console.log('Switched to tab:', index);
		// Perform analytics, data loading, etc.
	}
</script>

<Tabs {tabs} bind:activeTab onChange={handleTabChange}>
	{#snippet tab1()}
		<div>Content 1</div>
	{/snippet}
	{#snippet tab2()}
		<div>Content 2</div>
	{/snippet}
	{#snippet tab3()}
		<div>Content 3</div>
	{/snippet}
</Tabs>
\`\`\`

### Custom Tabbar Styling
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Small', 'Tabs'];
</script>

<Tabs 
	{tabs}
	tabbarSize="small"
	tabbarColor="secondary"
	tabbarAlignment="center"
>
	{#snippet tab1()}
		<div>First tab content</div>
	{/snippet}
	{#snippet tab2()}
		<div>Second tab content</div>
	{/snippet}
</Tabs>
\`\`\`

### Full Width Tabbar
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
</script>

<!-- Full width tabbar where tabs expand to fill available space -->
<Tabs {tabs} tabbarFullWidth>
	{#snippet tab1()}
		<div>First tab content</div>
	{/snippet}
	{#snippet tab2()}
		<div>Second tab content</div>
	{/snippet}
	{#snippet tab3()}
		<div>Third tab content</div>
	{/snippet}
</Tabs>
\`\`\`

### Tab Placement
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Section A', 'Section B', 'Section C'];
</script>

<!-- Tabs on the left (sidebar style) -->
<Tabs {tabs} placement="left">
	{#snippet tab1()}
		<div class="p-4">Section A content</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4">Section B content</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4">Section C content</div>
	{/snippet}
</Tabs>

<!-- Tabs on the right -->
<Tabs {tabs} placement="right">
	{#snippet tab1()}
		<div class="p-4">Section A content</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4">Section B content</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4">Section C content</div>
	{/snippet}
</Tabs>

<!-- Tabs at the bottom -->
<Tabs {tabs} placement="bottom">
	{#snippet tab1()}
		<div class="p-4">Section A content</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4">Section B content</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4">Section C content</div>
	{/snippet}
</Tabs>
\`\`\`

### With Disabled Tabs
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = [
		{ label: 'Available' },
		{ label: 'Locked', disabled: true },
		{ label: 'Available' }
	];
</script>

<Tabs {tabs}>
	{#snippet tab1()}
		<div>This tab is accessible</div>
	{/snippet}
	{#snippet tab2()}
		<div>This content is locked</div>
	{/snippet}
	{#snippet tab3()}
		<div>This tab is also accessible</div>
	{/snippet}
</Tabs>
\`\`\`

### Custom Animation Speed
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Fast', 'Transition'];
	const keyFramesOptions = {
		duration: 150,
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
		fill: 'both'
	};
</script>

<Tabs {tabs} {keyFramesOptions}>
	{#snippet tab1()}
		<div>Quick transition to this content</div>
	{/snippet}
	{#snippet tab2()}
		<div>And back again</div>
	{/snippet}
</Tabs>
\`\`\`

### Using Stepper Context
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Info', 'Actions'];
</script>

<Tabs {tabs}>
	{#snippet tab1({ stepper, index })}
		<div class="p-4">
			<p>Current tab: {index}</p>
			<p>Total tabs: {stepper.items.length}</p>
		</div>
	{/snippet}
	{#snippet tab2({ stepper, index })}
		<div class="p-4">
			<p>Tab {index + 1} of {stepper.items.length}</p>
			<button onclick={() => stepper.goTo(0)}>Go to first tab</button>
		</div>
	{/snippet}
</Tabs>
\`\`\`

### Complex Content with Forms
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	import { TextInput } from '$lib/components/Form/TextInput';
	import { Button } from '$lib/components/Button';
	
	let formData = $state({ name: '', email: '', bio: '' });
	const tabs = ['Personal', 'Contact', 'About'];
</script>

<Tabs {tabs}>
	{#snippet tab1()}
		<div class="p-4 space-y-4">
			<TextInput label="Full Name" bind:value={formData.name} />
		</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-4 space-y-4">
			<TextInput label="Email" type="email" bind:value={formData.email} />
		</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-4 space-y-4">
			<TextInput label="Bio" bind:value={formData.bio} />
			<Button>Save Profile</Button>
		</div>
	{/snippet}
</Tabs>
\`\`\`

### Large Size Tabs
\`\`\`svelte
<script>
	import { Tabs } from '$lib/components/Tabs';
	
	const tabs = ['Dashboard', 'Analytics', 'Reports'];
	const tabbarProps = {
		size: 'large',
		color: 'primary'
	};
</script>

<Tabs {tabs} {tabbarProps}>
	{#snippet tab1()}
		<div class="p-6">Dashboard overview</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-6">Analytics data</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-6">Generated reports</div>
	{/snippet}
</Tabs>
\`\`\`

## Accessibility

The Tabs component inherits accessibility features from both Tabbar and Stepper:

### From Tabbar
- Sets \`role="tablist"\` on the tab container
- Sets \`role="tab"\` on each tab button
- Implements roving tabindex pattern
- Full keyboard navigation (Arrow keys, Home, End)
- Sets \`aria-disabled="true"\` on disabled tabs

### From Stepper
- Sets \`role="tabpanel"\` on each content panel
- Sets \`aria-labelledby\` linking panel to its tab
- Uses \`inert\` attribute on inactive panels
- Manages focus appropriately when switching tabs

### Keyboard Navigation
- **Arrow Left/Right** (horizontal): Navigate between tabs
- **Arrow Up/Down** (vertical): Navigate between tabs
- **Enter/Space**: Activate focused tab
- **Home**: Jump to first tab
- **End**: Jump to last tab

## Notes

- Tab content can be rendered using either:
  - Individual snippet props (\`tab1\`, \`tab2\`, etc.) for explicit control
  - Default \`tab\` snippet prop for flexible, conditional rendering based on item data
- When both \`tab\` and numbered snippets (\`tab1\`, \`tab2\`, etc.) are provided, numbered snippets take precedence
- Snippet numbering is 1-based (first tab = tab1)
- The \`tab\` snippet receives: \`stepper\` (StepperState), \`item\` (TabItem), \`index\` (number)
- Content panels animate smoothly when switching tabs
- The \`stepper\` binding provides programmatic control
- Inactive panels are hidden with \`inert\` attribute for accessibility
- All Tabbar props can be passed directly with \`tabbar*\` prefix (e.g., \`tabbarSize\`, \`tabbarColor\`)
- The \`placement\` prop automatically sets tabbar orientation (vertical for left/right, horizontal for top/bottom)
- You can override the automatic orientation by explicitly setting \`tabbarOrientation\`
- Animation can be customized via \`keyFramesOptions\`
- The component is fully responsive and works with all color schemes

## Theme Customization

The Tabs component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **tabs**: Main tabs container styles
- **content**: Tab content panel styles

### Available Variants

**tabs**:
- base: Base classes for main tabs container
- Variants:
  - placement: 'top' | 'bottom' | 'left' | 'right' - Tab placement direction

**content**:
- base: Base classes for content panel
- Variants:
  - placement: 'top' | 'bottom' | 'left' | 'right' - Content positioning based on placement

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Tabs 
  tabs={tabs}
  theme={{
    tabs: {
      placement: {
        top: 'border-b-2 border-gray-200'
      }
    },
    content: {
      base: 'p-4'
    }
  }}
>
  {#snippet tab1()}
    Content
  {/snippet}
</Tabs>
\`\`\`

**Vertical Placement Customization**:
\`\`\`svelte
<Tabs 
  tabs={tabs}
  placement="left"
  theme={{
    tabs: {
      placement: {
        left: 'border-r-2 border-gray-200'
      }
    },
    content: {
      placement: {
        left: 'ml-4'
      }
    }
  }}
>
  {#snippet tab1()}
    Content
  {/snippet}
</Tabs>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setTabsTheme } from 'svelai/tabs';
  
  setTabsTheme({
    tabs: {
      base: 'w-full',
      placement: {
        top: 'flex-col'
      }
    },
    content: {
      base: 'w-full'
    }
  });
</script>
\`\`\`
`;
