export const dialogDescription = `
# Dialog Component

The Dialog component (also known as Modal) displays content in a layer above the page, blocking interaction with the rest of the application until dismissed.

## Basic Usage

\`\`\`svelte
<script>
	let isOpen = $state(false);
</script>

<Button onClick={() => isOpen = true}>Open Dialog</Button>

<Dialog bind:isOpen title="Dialog Title">
	Dialog content goes here
</Dialog>
\`\`\`

## Props

### Core Props
- **isOpen**: boolean (bindable) - Controls dialog visibility
- **id**: string - Unique identifier for the dialog
- **type**: 'modal' | 'drawer' - Dialog presentation style

### Content Props
- **title**: string | Snippet - Dialog title
- **description**: string | Snippet - Dialog description
- **children**: Snippet - Main dialog content

### Header/Footer Slots
- **header**: Snippet - Custom header content
- **footer**: Snippet - Custom footer content
- **trigger**: Snippet - Custom trigger button
- **closeButton**: Snippet - Custom close button
- **headerProps**: object - Props for header slot
- **footerProps**: object - Props for footer slot
- **titleProps**: object - Props for title slot
- **descriptionProps**: object - Props for description slot
- **closeButtonProps**: object - Props for close button slot

### Behavior Props
- **closeOnEscape**: boolean (default: true) - Close when Escape key is pressed
- **closeOnClickOutside**: boolean (default: true) - Close when clicking outside dialog
- **closable**: boolean (default: true) - Whether dialog can be closed

### Event Props
- **onClose**: () => void - Called when dialog closes
- **onOpen**: () => void - Called when dialog opens

### Visual Props
- **size**: 'small' | 'normal' | 'large' | 'full' - Dialog size
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

### Basic Dialog
\`\`\`svelte
<script>
	let isOpen = $state(false);
</script>

<Button onClick={() => isOpen = true}>Open</Button>

<Dialog bind:isOpen title="Welcome">
	<p>This is a basic dialog.</p>
</Dialog>
\`\`\`

### With Description
\`\`\`svelte
<Dialog 
	bind:isOpen 
	title="Confirm Action"
	description="Are you sure you want to continue?"
>
	<p>This action cannot be undone.</p>
</Dialog>
\`\`\`

### Different Sizes
\`\`\`svelte
<Dialog bind:isOpen size="small" title="Small">
	Small dialog content
</Dialog>

<Dialog bind:isOpen size="large" title="Large">
	Large dialog content
</Dialog>

<Dialog bind:isOpen size="full" title="Full Screen">
	Full screen dialog
</Dialog>
\`\`\`

### With Footer Actions
\`\`\`svelte
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

### Custom Header
\`\`\`svelte
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

### Non-closable Dialog
\`\`\`svelte
<Dialog 
	bind:isOpen 
	closable={false}
	closeOnEscape={false}
	closeOnClickOutside={false}
	title="Processing"
>
	<p>Please wait...</p>
	<Spinner />
</Dialog>
\`\`\`

### With Custom Close Button
\`\`\`svelte
<Dialog bind:isOpen title="Custom Close">
	Dialog content
	
	{#snippet closeButton()}
		<Button variant="ghost" squared>
			<Icon name="x" />
		</Button>
	{/snippet}
</Dialog>
\`\`\`

### Form Dialog
\`\`\`svelte
<script>
	let isOpen = $state(false);
	let name = $state('');
	
	function handleSubmit() {
		console.log('Submitted:', name);
		isOpen = false;
	}
</script>

<Dialog bind:isOpen title="Enter Name">
	<form onsubmit={handleSubmit}>
		<TextInput bind:value={name} label="Name" />
		
		{#snippet footer()}
			<Button type="submit">Submit</Button>
		{/snippet}
	</form>
</Dialog>
\`\`\`

### With Lifecycle Hooks
\`\`\`svelte
<Dialog 
	bind:isOpen
	title="Lifecycle"
	onOpen={() => console.log('Dialog opened')}
	onClose={() => console.log('Dialog closed')}
>
	Watch the console
</Dialog>
\`\`\`

### Drawer Type
\`\`\`svelte
<Dialog 
	bind:isOpen
	type="drawer"
	title="Side Drawer"
>
	This slides in from the side
</Dialog>
\`\`\`

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
