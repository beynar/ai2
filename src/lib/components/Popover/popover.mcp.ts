export const popoverDescription = `
# Popover Component

The Popover component displays floating content positioned relative to a trigger element. It's ideal for tooltips, dropdown menus, and contextual information.

## Basic Usage

\`\`\`svelte
<script>
	let isOpen = $state(false);
	let buttonRef;
</script>

<Button bind:ref={buttonRef} onClick={() => isOpen = !isOpen}>
	Toggle Popover
</Button>

<Popover bind:isOpen ref={buttonRef}>
	Popover content here
</Popover>
\`\`\`

## Props

### Core Props
- **isOpen**: boolean (bindable) - Controls popover visibility
- **ref**: HTMLElement - Reference element to position popover against
- **id**: string - Unique identifier

### Positioning Props
- **position**: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  - Determines where popover appears relative to trigger
- **offset**: number - Distance in pixels from the reference element

### Interaction Props
- **openOnHover**: boolean (default: false) - Open on mouse hover
- **openOnClick**: boolean (default: true) - Open on click
- **hoverDelay**: number (default: 100) - Delay in ms before opening on hover
- **closeOnEscape**: boolean (default: true) - Close on Escape key
- **closeOnClickOutside**: boolean (default: true) - Close when clicking outside
- **closeOnMouseLeave**: boolean (default: false) - Close when mouse leaves

### Visual Props
- **size**: 'small' | 'normal' | 'large' - Popover size
- **transition**: TransitionConfig - Custom transition animation
- **directedTransition**: boolean (default: true) - Transition direction follows position

### Behavior Props
- **lockScroll**: boolean (default: true) - Lock body scroll when open

### Event Props
- **onClose**: () => void - Called when popover closes
- **onOpen**: () => void - Called when popover opens

### Content Props
- **children**: Snippet - Popover content
- **trigger**: Snippet - Custom trigger element

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

### Basic Popover
\`\`\`svelte
<script>
	let isOpen = $state(false);
	let triggerRef;
</script>

<Button bind:ref={triggerRef} onClick={() => isOpen = !isOpen}>
	Click Me
</Button>

<Popover bind:isOpen ref={triggerRef}>
	<p>This is a popover!</p>
</Popover>
\`\`\`

### Different Positions
\`\`\`svelte
<Popover position="top" bind:isOpen ref={triggerRef}>
	Top popover
</Popover>

<Popover position="bottom" bind:isOpen ref={triggerRef}>
	Bottom popover
</Popover>

<Popover position="left" bind:isOpen ref={triggerRef}>
	Left popover
</Popover>

<Popover position="right" bind:isOpen ref={triggerRef}>
	Right popover
</Popover>
\`\`\`

### Open on Hover
\`\`\`svelte
<Button bind:ref={triggerRef}>
	Hover Me
</Button>

<Popover 
	bind:isOpen 
	ref={triggerRef}
	openOnHover
	openOnClick={false}
	hoverDelay={200}
>
	Hover content
</Popover>
\`\`\`

### Dropdown Menu
\`\`\`svelte
<script>
	let isOpen = $state(false);
	let menuRef;
</script>

<Button bind:ref={menuRef} onClick={() => isOpen = !isOpen}>
	Menu
</Button>

<Popover bind:isOpen ref={menuRef} position="bottom-start">
	<div class="flex flex-col gap-1">
		<Button variant="ghost" fullWidth>Profile</Button>
		<Button variant="ghost" fullWidth>Settings</Button>
		<Button variant="ghost" fullWidth>Logout</Button>
	</div>
</Popover>
\`\`\`

### Context Menu
\`\`\`svelte
<script>
	let isOpen = $state(false);
	let contextRef;
	
	function handleContextMenu(e) {
		e.preventDefault();
		contextRef = e.target;
		isOpen = true;
	}
</script>

<div oncontextmenu={handleContextMenu}>
	Right click me
</div>

<Popover bind:isOpen ref={contextRef} position="bottom-start">
	<div class="menu">
		<button>Copy</button>
		<button>Paste</button>
		<button>Delete</button>
	</div>
</Popover>
\`\`\`

### With Custom Offset
\`\`\`svelte
<Popover 
	bind:isOpen 
	ref={triggerRef}
	position="bottom"
	offset={20}
>
	20px away from trigger
</Popover>
\`\`\`

### Different Sizes
\`\`\`svelte
<Popover size="small" bind:isOpen ref={triggerRef}>
	Small popover
</Popover>

<Popover size="large" bind:isOpen ref={triggerRef}>
	Large popover with more content
</Popover>
\`\`\`

### Close on Mouse Leave
\`\`\`svelte
<Popover 
	bind:isOpen 
	ref={triggerRef}
	openOnHover
	closeOnMouseLeave
>
	Closes when you move mouse away
</Popover>
\`\`\`

### With Lifecycle Hooks
\`\`\`svelte
<Popover 
	bind:isOpen 
	ref={triggerRef}
	onOpen={() => console.log('Popover opened')}
	onClose={() => console.log('Popover closed')}
>
	Content
</Popover>
\`\`\`

### User Card Popover
\`\`\`svelte
<script>
	let isOpen = $state(false);
	let avatarRef;
</script>

<Avatar bind:ref={avatarRef} user={user} />

<Popover bind:isOpen ref={avatarRef} position="bottom">
	<div class="p-4">
		<h3>{user.name}</h3>
		<p>{user.email}</p>
		<Button fullWidth>View Profile</Button>
	</div>
</Popover>
\`\`\`

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
