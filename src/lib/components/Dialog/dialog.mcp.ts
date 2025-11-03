export const dialogDescription = `
# Dialog Component

The Dialog component (also known as Modal) displays content in a layer above the page, blocking interaction with the rest of the application until dismissed.

## Basic Usage

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	import { Button } from 'svelai/button';
		
</script>
// By default Dialog comes with a button that trigger them, no need to define a callback and a $state
<Dialog title="Dialog Title">
	Dialog content goes here
</Dialog>
\`\`\`

## Props

### Core Props
- **isOpen**: boolean (bindable) - Controls dialog visibility
- **id**: string - Unique identifier for the dialog
- **type**: 'fullScreen' | 'drawerRight' | 'drawerLeft' | 'drawerBottom' | 'alert' | 'modal' (default: 'modal')
  - fullScreen: Full screen dialog overlay
  - drawerRight: Drawer sliding in from the right
  - drawerLeft: Drawer sliding in from the left
  - drawerBottom: Drawer sliding in from the bottom
  - alert: Alert-style dialog
  - modal: Standard modal dialog

### Layout Props
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact dialog size
  - normal: Standard dialog size
  - large: Larger dialog size

### Event Props
- **onClose**: (dialog: DialogState) => void - Called when dialog closes, receives dialog state
- **onOpen**: (dialog: DialogState) => void - Called when dialog opens, receives dialog state

### Slot Props
- **title**: string | Snippet<[DialogState]> - Dialog title
- **description**: string | Snippet<[DialogState]> - Dialog description
- **children**: Snippet<[DialogState]> - Main dialog content
- **header**: Snippet<[DialogState]> - Custom header content
- **footer**: Snippet<[DialogState]> - Custom footer content
- **trigger**: Snippet<[DialogState]> | (ButtonProps & { content?: string }) - Custom trigger button
- **closeButton**: Snippet<[DialogState]> - Custom close button
- **headerProps**: object - Props for header slot
- **footerProps**: object - Props for footer slot
- **titleProps**: object - Props for title slot
- **descriptionProps**: object - Props for description slot
- **closeButtonProps**: object - Props for close button slot

### Behavior Props
- **closeOnEscape**: boolean (default: true) - Close when Escape key is pressed
- **closeOnClickOutside**: boolean (default: true) - Close when clicking outside dialog
- **closable**: boolean (default: true) - Whether dialog can be closed

### Visual Props
- **transition**: TransitionConfig - Custom transition animation

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<DialogOverlay>
	<DialogContent>
		<DialogHeader>
			<Title />
			<Description />
			<CloseButton />
		</DialogHeader>
		<DialogBody>
			<Children />
		</DialogBody>
		<DialogFooter />
	</DialogContent>
</DialogOverlay>
\`\`\`

## Examples

### More Examples

### A with a custom trigger 
\`\`\`svelte

<script>
	import { Dialog } from 'svelai/dialog';
	import { Button } from 'svelai/button';
	
	let isOpen = $state(false);
</script>


<Dialog bind:isOpen title="Welcome">
	<p>This is a basic dialog.</p>
	
	{#snippet trigger(dialog)}
		<Button onClick={() => dialog.open()}>Open</Button>
	{/snippet}
</Dialog>
\`\`\`

### A with a custom as button props 
\`\`\`svelte

<script>
	import { Dialog } from 'svelai/dialog';
	import { Button } from 'svelai/button';
	
	let isOpen = $state(false);
</script>


<Dialog bind:isOpen title="Welcome"
trigger={{
content:"Click me",
color:"secondary",
size:"small"
}}
>
	<p>This is a basic dialog.</p>	
</Dialog>
\`\`\`

### With Description

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	
</script>

<Dialog 	
	title="Confirm Action"
	description="Are you sure you want to continue?"
>
	<p>This action cannot be undone.</p>
</Dialog>
\`\`\`

### Different Sizes

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	
	let isOpen = $state(false);
</script>

\`\`\`

### Advanced Example

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	import { Button } from 'svelai/button';
	
	let isOpen = $state(false);
	
	function handleConfirm() {
		console.log('Confirmed!');
		isOpen = false;
	}
</script>

<Dialog bind:isOpen title="Confirm">
	Are you sure?
	
	{#snippet footer()}
		<div class="flex gap-2 justify-end">
			<Button variant="ghost" onClick={() => isOpen = false}>
				Cancel
			</Button>
			<Button color="danger" onClick={handleConfirm}>
				Confirm
			</Button>
		</div>
	{/snippet}
</Dialog>
\`\`\`

### Drawer Types

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	
	
</script>

<!-- Right drawer -->
<Dialog type="drawerRight" title="Side Drawer">
	This slides in from the right
</Dialog>

<!-- Left drawer -->
<Dialog type="drawerLeft" title="Left Drawer">
	This slides in from the left
</Dialog>

<!-- Bottom drawer -->
<Dialog type="drawerBottom" title="Bottom Drawer">
	This slides in from the bottom
</Dialog>

<!-- Full screen -->
<Dialog type="fullScreen" title="Full Screen">
	Full screen dialog content
</Dialog>
\`\`\`

### Custom Header

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	import { Icon } from 'svelai/icons';
</script>

<Dialog bind:isOpen>
	{#snippet header()}
		<div class="flex items-center gap-2">
			<Icon name="warning" />
			<h2>Warning</h2>
		</div>
	{/snippet}
	
	This is important!
</Dialog>
\`\`\`


### With Lifecycle Hooks

\`\`\`svelte
<script>
	import { Dialog } from 'svelai/dialog';
	
	let isOpen = $state(false);
</script>

<Dialog 
	bind:isOpen
	title="Lifecycle"
	onOpen={(dialog) => console.log('Dialog opened', dialog)}
	onClose={(dialog) => console.log('Dialog closed', dialog)}
>
	Watch the console
</Dialog>
\`\`\`

## State Management

The Dialog component uses a \`DialogState\` instance that is passed to all slot snippets. This state object provides:

- **isOpen**: boolean - Current open state
- **id**: string - Dialog identifier
- **type**: DialogType - Current dialog type
- **size**: Size - Current dialog size
- **open()**: () => void - Method to open the dialog
- **close()**: () => void - Method to close the dialog

## Accessibility

- Focus is trapped within the dialog when open
- Escape key closes the dialog (when enabled)
- Body scroll is locked when dialog is open
- Proper ARIA attributes for screen readers
- Focus returns to trigger element on close

## Notes

- Multiple dialogs can be stacked
- Last opened dialog receives focus
- Background overlay prevents interaction with page
- Scroll locking prevents background scroll
- Transitions are customizable
`;
