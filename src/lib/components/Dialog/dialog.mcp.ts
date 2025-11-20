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
- **header**: Snippet - Custom header content
- **footer**: Snippet - Custom footer content
- **trigger**: Snippet | (ButtonProps & { content?: string }) - Custom trigger button
- **closeButton**: Snippet - Custom close button

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

## Theme Customization

The Dialog component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **dialog**: Dialog overlay/backdrop styles
- **content**: Dialog content container styles
- **header**: Dialog header section styles
- **footer**: Dialog footer section styles
- **closeButton**: Close button styles
- **title**: Dialog title text styles
- **description**: Dialog description text styles

### Theme Type Definition

\`\`\`typescript
import type { DialogThemeProps } from 'svelai/dialog';

// Example theme customization
const customTheme: DialogThemeProps = {
  dialog: {
    base: 'z-[+50] fixed py-4 left-0 flex bg-surface-fg/20',
    size: {
      small: 'max-w-screen max-h-screen',
      normal: 'max-w-screen max-h-screen',
      large: 'max-w-screen max-h-screen'
    },
    type: {
      fullScreen: 'justify-center items-center',
      drawerRight: 'justify-end',
      drawerLeft: 'justify-start',
      drawerBottom: 'justify-center items-end',
      drawerTop: 'justify-center items-start',
      modal: 'justify-center',
      alert: 'justify-center'
    }
  },
  content: {
    size: {
      small: 'max-w-md w-full',
      normal: 'max-w-xl w-full',
      large: 'max-w-3xl w-full'
    },
    type: {
      fullScreen: 'h-full w-full max-w-full',
      drawerRight: 'rounded-l-none h-full',
      modal: ''
    }
  },
  header: {
    size: {
      small: '',
      normal: '',
      large: ''
    }
  },
  title: {
    size: {
      small: '',
      normal: '',
      large: ''
    }
  },
  description: {
    size: {
      small: '',
      normal: '',
      large: ''
    }
  }
};
\`\`\`

### Available Variants

**dialog**:
- base: Base classes for dialog overlay/backdrop
- Variants:
  - size: 'small' | 'normal' | 'large' - Size constraints
  - type: 'fullScreen' | 'drawerRight' | 'drawerLeft' | 'drawerBottom' | 'drawerTop' | 'modal' | 'alert' - Dialog type/layout

**content**:
- base: Base classes for dialog content container
- Variants:
  - size: 'small' | 'normal' | 'large' - Content max-width
  - type: 'fullScreen' | 'drawerRight' | 'drawerLeft' | 'drawerBottom' | 'drawerTop' | 'modal' | 'alert' - Content styling based on type

**header**:
- base: Base classes for header section
- Variants:
  - size: 'small' | 'normal' | 'large' - Size-based styling

**footer**:
- base: Base classes for footer section
- Variants:
  - size: 'small' | 'normal' | 'large' - Size-based styling

**closeButton**:
- base: Base classes for close button
- Variants:
  - size: 'small' | 'normal' | 'large' - Size-based styling

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
<Dialog 
  title="Custom Dialog"
  theme={{
    content: {
      base: 'rounded-2xl shadow-2xl',
      size: {
        normal: 'max-w-2xl'
      }
    },
    header: {
      base: 'border-b-2 border-primary'
    }
  }}
>
  Custom styled dialog content
</Dialog>
\`\`\`

**Drawer Type Customization**:
\`\`\`svelte
<Dialog 
  type="drawerRight"
  theme={{
    dialog: {
      type: {
        drawerRight: 'justify-end bg-black/50'
      }
    },
    content: {
      type: {
        drawerRight: 'rounded-l-xl shadow-xl'
      }
    }
  }}
>
  Custom drawer styling
</Dialog>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setDialogTheme } from 'svelai/dialog';
  
  setDialogTheme({
    dialog: {
      base: 'backdrop-blur-sm'
    },
    content: {
      base: 'shadow-2xl border-2',
      size: {
        normal: 'max-w-2xl'
      }
    },
    title: {
      base: 'text-2xl font-bold'
    }
  });
</script>
\`\`\`
`;
