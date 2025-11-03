export const popoverDescription = `
# Popover Component

The Popover component displays floating content positioned relative to a trigger element. It's ideal for tooltips, dropdown menus, and contextual information.

## Basic Usage

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
		
</script>
// By default Popover comes with a button that triggers them, no need to define a callback and a $state
<Popover trigger={{ content: "Toggle Popover" }}>
	Popover content here
</Popover>
\`\`\`

## Props

### Core Props
- **isOpen**: boolean (bindable) - Controls popover visibility (optional when using trigger prop)
- **ref**: HTMLElement | null - Reference element to position popover against (optional when using trigger prop)
- **id**: string - Unique identifier

### Layout Props
- **position**: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' (default: 'bottom')
  - Determines where popover appears relative to trigger
- **offset**: number - Distance in pixels from the reference element
- **fitTrigger**: boolean (default: false) - Whether popover should match the width of the trigger element

### Event Props
- **onClose**: (popover: PopoverState) => void - Called when popover closes, receives popover state
- **onOpen**: (popover: PopoverState) => void - Called when popover opens, receives popover state

### Slot Props
- **children**: Snippet<[PopoverState]> - Popover content
- **trigger**: Snippet<[PopoverState]> | (ButtonProps & { content?: string }) | false - Trigger element
  - Pass a snippet function for custom trigger: \`{#snippet trigger(popover)}...</snippet>\`
  - Pass button props object for default button: \`trigger={{ content: "Click Me", color: "primary" }}\`
  - Pass \`false\` to disable trigger (use with external ref)

### Interaction Props
- **openOnHover**: boolean (default: false) - Open on mouse hover
- **openOnClick**: boolean (default: true) - Open on click
- **hoverDelay**: number (default: 100) - Delay in ms before opening on hover
- **closeOnEscape**: boolean (default: true) - Close on Escape key
- **closeOnClickOutside**: boolean (default: true) - Close when clicking outside
- **closeOnMouseLeave**: boolean (default: false) - Close when mouse leaves

### Visual Props
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact popover size
  - normal: Standard popover size
  - large: Larger popover size
- **transition**: TransitionConfig - Custom transition animation
- **directedTransition**: boolean (default: true) - Transition direction follows position

### Behavior Props
- **lockScroll**: boolean (default: true) - Lock body scroll when open

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<PopoverTrigger>
	<Trigger />
</PopoverTrigger>

<PopoverContent>
	<Children />
</PopoverContent>
\`\`\`

## Examples

### More Examples

### With a custom trigger snippet
\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
	import { Button } from 'svelai/button';
</script>

<Popover>
	{#snippet trigger(popover)}
		<Button onClick={() => popover.open()}>Open</Button>
	{/snippet}
	
	<p>This is a popover!</p>
</Popover>
\`\`\`

### With button props
\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{
		content: "Click Me",
		color: "secondary",
		size: "small"
	}}
>
	<p>This is a popover!</p>
</Popover>
\`\`\`

### Different Positions

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<!-- Top -->
<Popover position="top" trigger={{ content: "Top" }}>
	Top popover
</Popover>

<!-- Bottom -->
<Popover position="bottom" trigger={{ content: "Bottom" }}>
	Bottom popover
</Popover>

<!-- Left -->
<Popover position="left" trigger={{ content: "Left" }}>
	Left popover
</Popover>

<!-- Right -->
<Popover position="right" trigger={{ content: "Right" }}>
	Right popover
</Popover>
\`\`\`

### Advanced Example

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
	import { Button } from 'svelai/button';
</script>

<Popover position="bottom-start" trigger={{ content: "Menu" }}>
	<div class="flex flex-col gap-1">
		<Button variant="ghost" fullWidth>Profile</Button>
		<Button variant="ghost" fullWidth>Settings</Button>
		<Button variant="ghost" fullWidth>Logout</Button>
	</div>
</Popover>
\`\`\`

### Open on Hover

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{ content: "Hover Me" }}
	openOnHover
	openOnClick={false}
	hoverDelay={200}
>
	Hover content
</Popover>
\`\`\`

### With Custom Offset

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{ content: "Trigger" }}
	position="bottom"
	offset={20}
>
	20px away from trigger
</Popover>
\`\`\`

### Fit Trigger Width

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{ content: "Click Me" }}
	fitTrigger
>
	Popover matches trigger width
</Popover>
\`\`\`

### Different Sizes

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<!-- Small -->
<Popover size="small" trigger={{ content: "Small" }}>
	Small popover
</Popover>

<!-- Large -->
<Popover size="large" trigger={{ content: "Large" }}>
	Large popover with more content
</Popover>
\`\`\`

### Close on Mouse Leave

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{ content: "Hover Me" }}
	openOnHover
	closeOnMouseLeave
>
	Closes when you move mouse away
</Popover>
\`\`\`

### With Lifecycle Hooks

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
</script>

<Popover 
	trigger={{ content: "Trigger" }}
	onOpen={(popover) => console.log('Popover opened', popover)}
	onClose={(popover) => console.log('Popover closed', popover)}
>
	Watch the console
</Popover>
\`\`\`

### User Card Popover with External Ref

\`\`\`svelte
<script>
	import { Popover } from 'svelai/popover';
	import { Button } from 'svelai/button';
	import { Avatar } from 'svelai/avatar';
	
	let avatarRef;
	let isOpen = $state(false);
	let user = { name: 'John Doe', email: 'john@example.com' };
</script>

<Avatar bind:ref={avatarRef} user={user} onClick={() => isOpen = !isOpen} />

<Popover bind:isOpen ref={avatarRef} position="bottom">
	<div class="p-4">
		<h3>{user.name}</h3>
		<p>{user.email}</p>
		<Button fullWidth>View Profile</Button>
	</div>
</Popover>
\`\`\`

## State Management

The Popover component uses a \`PopoverState\` instance that is passed to all slot snippets. This state object provides:

- **isOpen**: boolean - Current open state
- **id**: string - Popover identifier
- **size**: Size - Current popover size
- **position**: Placement - Current popover position
- **offset**: number - Current offset value
- **open()**: () => void - Method to open the popover
- **close()**: () => void - Method to close the popover

## Accessibility

- Focus trap when open
- Escape key to close
- Click outside to close
- Proper ARIA attributes
- Keyboard navigation support

## Notes

- Popover is positioned using floating-ui
- Automatically adjusts position to stay in viewport
- Multiple popovers can be stacked
- Scroll locking prevents background scroll (when enabled)
- Transitions animate based on position direction
`;
