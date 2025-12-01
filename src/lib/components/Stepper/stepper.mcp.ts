export const stepperDescription = `
# Stepper Component

The Stepper component provides an animated multi-step content container with smooth transitions between steps. It manages step navigation, height animations, and provides programmatic control through StepperState.

## Basic Usage

\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	let activeStep = $state(0);
	const items = ['Step 1', 'Step 2', 'Step 3'];
</script>

<Stepper {items} bind:activeStep>
	{#snippet step1({ stepper, item, index })}
		<div class="p-4">
			<h2>{item}</h2>
			<p>Content for step {index + 1}</p>
			<button onclick={() => stepper.next()}>Next</button>
		</div>
	{/snippet}
	{#snippet step2({ stepper, item, index })}
		<div class="p-4">
			<h2>{item}</h2>
			<p>Content for step {index + 1}</p>
			<button onclick={() => stepper.previous()}>Previous</button>
			<button onclick={() => stepper.next()}>Next</button>
		</div>
	{/snippet}
	{#snippet step3({ stepper, item, index })}
		<div class="p-4">
			<h2>{item}</h2>
			<p>Content for step {index + 1}</p>
			<button onclick={() => stepper.previous()}>Previous</button>
		</div>
	{/snippet}
</Stepper>
\`\`\`

## Props

### Core Props
- **items**: Array<Item> (required)
  - Array of items to step through
  - Can be any type (strings, objects, etc.)
  - Each item is passed to the step snippet

- **activeStep**: number (default: 0, bindable)
  - The index of the currently active step
  - Can be bound with \`bind:activeStep\`

- **onChange**: (item: Item) => void
  - Callback function called when the active step changes
  - Receives the current item as an argument

### Content Props (Snippets)
- **step**: Snippet<[{ stepper, item, index }]>
  - Default snippet to render for each step panel
  - Use this when you want flexible rendering based on the item data
  - Receives: \`stepper\` (StepperState), \`item\` (Item), \`index\` (number)
  - Allows conditional rendering based on item values
  - Example: Use when you want to render different content based on the item properties

- **step1, step2, step3, ...**: Snippet<[{ stepper, item, index }]>
  - Content snippets for each specific step panel (1-based numbering)
  - Number corresponds to step index (step1 = first step, step2 = second step, etc.)
  - Receives: \`stepper\` (StepperState), \`item\` (Item), \`index\` (number)
  - Use when you want explicit control over each step's content
  - Takes precedence over the \`step\` prop when both are provided

### Animation Props
- **keyFramesOptions**: object (default: { duration: 300, easing: 'ease-in-out', fill: 'both' })
  - duration: Animation duration in milliseconds
  - easing: CSS easing function
  - fill: Animation fill mode ('auto' | 'backwards' | 'both' | 'forwards' | 'none')

### Display Props
- **mode**: 'classic' | 'vertical' (default: 'classic')
  - classic: Standard horizontal step layout
  - vertical: Vertical step layout

### Advanced Props
- **stepper**: StepperState<Item> (bindable)
  - Bindable reference to the stepper state
  - Provides methods: next(), previous(), goTo(index)
  - Allows programmatic control of step navigation
  - Access step heights via \`stepper.stepHeights\`

- **class**: string - Additional CSS classes for the stepper container
- **children**: Snippet<[StepperState<Item>]> - Alternative content rendering

## Structure

The Stepper component follows this DOM structure:
\`\`\`
<Stepper>
  <Container>          <!-- Animated container with dynamic height -->
    <StepContainer>    <!-- Grid container for all steps -->
      <Step />         <!-- Active step panel -->
      <Step />         <!-- Inactive step panels (hidden with inert) -->
      ...
    </StepContainer>
  </Container>
</Stepper>
\`\`\`

## Examples

### Basic Stepper with Individual Steps
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	let activeStep = $state(0);
	const items = ['Account', 'Profile', 'Complete'];
</script>

<Stepper {items} bind:activeStep>
	{#snippet step1({ stepper })}
		<div class="p-4">
			<h2>Account Setup</h2>
			<p>Create your account information.</p>
			<button onclick={() => stepper.next()}>Next</button>
		</div>
	{/snippet}
	{#snippet step2({ stepper })}
		<div class="p-4">
			<h2>Profile Information</h2>
			<p>Fill in your profile details.</p>
			<button onclick={() => stepper.previous()}>Previous</button>
			<button onclick={() => stepper.next()}>Next</button>
		</div>
	{/snippet}
	{#snippet step3({ stepper })}
		<div class="p-4">
			<h2>Complete</h2>
			<p>Review and finish setup.</p>
			<button onclick={() => stepper.previous()}>Previous</button>
		</div>
	{/snippet}
</Stepper>
\`\`\`

### Flexible Rendering with Default Step Snippet
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	let activeStep = $state(0);
	const items = [
		{ title: 'Account', type: 'form' },
		{ title: 'Profile', type: 'form' },
		{ title: 'Review', type: 'summary' }
	];
</script>

<Stepper {items} bind:activeStep>
	{#snippet step({ stepper, item, index })}
		{#if item.type === 'form'}
			<div class="p-6">
				<h3 class="mb-3 text-xl font-semibold">{item.title}</h3>
				<p class="text-contrast/80">
					Form content for {item.title} at step {index + 1}
				</p>
				<button onclick={() => stepper.next()}>Next</button>
			</div>
		{:else if item.type === 'summary'}
			<div class="p-6">
				<h3 class="mb-3 text-xl font-semibold">{item.title}</h3>
				<p class="text-contrast/80">
					Summary content for {item.title} at step {index + 1}
				</p>
				<button onclick={() => stepper.previous()}>Previous</button>
			</div>
		{/if}
	{/snippet}
</Stepper>
\`\`\`

This approach allows you to conditionally render content based on the item properties, making it more flexible when you have dynamic item arrays or want to reuse the same snippet logic across multiple steps.

### Programmatic Navigation
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	import { Button } from '$lib/components/Button';
	import type { StepperState } from '$lib/components/Stepper';
	
	let stepper = $state<StepperState>();
	const items = ['Step 1', 'Step 2', 'Step 3'];
</script>

<Stepper {items} bind:stepper>
	{#snippet step1({ stepper })}
		<div class="p-4">
			<p>First step content</p>
			<Button onclick={() => stepper?.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet step2({ stepper })}
		<div class="p-4">
			<p>Second step content</p>
			<Button onclick={() => stepper?.previous()}>Back</Button>
			<Button onclick={() => stepper?.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet step3({ stepper })}
		<div class="p-4">
			<p>Final step content</p>
			<Button onclick={() => stepper?.previous()}>Back</Button>
			<Button onclick={() => stepper?.goTo(0)}>Start Over</Button>
		</div>
	{/snippet}
</Stepper>
\`\`\`

### With onChange Callback
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	let activeStep = $state(0);
	const items = ['Step 1', 'Step 2', 'Step 3'];
	
	function handleStepChange(item: string) {
		console.log('Switched to step:', item);
		// Perform analytics, data loading, etc.
	}
</script>

<Stepper {items} bind:activeStep onChange={handleStepChange}>
	{#snippet step1({ item })}
		<div>Content for {item}</div>
	{/snippet}
	{#snippet step2({ item })}
		<div>Content for {item}</div>
	{/snippet}
	{#snippet step3({ item })}
		<div>Content for {item}</div>
	{/snippet}
</Stepper>
\`\`\`

### Custom Animation Speed
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	const items = ['Fast', 'Transition'];
	const keyFramesOptions = {
		duration: 150,
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
		fill: 'both'
	};
</script>

<Stepper {items} {keyFramesOptions}>
	{#snippet step1()}
		<div>Quick transition to this content</div>
	{/snippet}
	{#snippet step2()}
		<div>And back again</div>
	{/snippet}
</Stepper>
\`\`\`

### Vertical Mode
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	const items = ['Step 1', 'Step 2', 'Step 3'];
</script>

<Stepper {items} mode="vertical">
	{#snippet step1()}
		<div class="p-4">Vertical step 1 content</div>
	{/snippet}
	{#snippet step2()}
		<div class="p-4">Vertical step 2 content</div>
	{/snippet}
	{#snippet step3()}
		<div class="p-4">Vertical step 3 content</div>
	{/snippet}
</Stepper>
\`\`\`

### Using Stepper Context
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	
	const items = ['Info', 'Actions'];
</script>

<Stepper {items}>
	{#snippet step1({ stepper, index })}
		<div class="p-4">
			<p>Current step: {index}</p>
			<p>Total steps: {stepper.items.length}</p>
		</div>
	{/snippet}
	{#snippet step2({ stepper, index })}
		<div class="p-4">
			<p>Step {index + 1} of {stepper.items.length}</p>
			<button onclick={() => stepper.goTo(0)}>Go to first step</button>
		</div>
	{/snippet}
</Stepper>
\`\`\`

### Complex Content with Forms
\`\`\`svelte
<script>
	import { Stepper } from '$lib/components/Stepper';
	import { TextInput } from '$lib/components/Form/TextInput';
	import { Button } from '$lib/components/Button';
	
	let formData = $state({ name: '', email: '', bio: '' });
	const items = ['Personal', 'Contact', 'About'];
</script>

<Stepper {items}>
	{#snippet step1({ stepper })}
		<div class="p-4 space-y-4">
			<TextInput label="Full Name" bind:value={formData.name} />
			<Button onclick={() => stepper.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet step2({ stepper })}
		<div class="p-4 space-y-4">
			<TextInput label="Email" type="email" bind:value={formData.email} />
			<Button onclick={() => stepper.previous()}>Back</Button>
			<Button onclick={() => stepper.next()}>Next</Button>
		</div>
	{/snippet}
	{#snippet step3({ stepper })}
		<div class="p-4 space-y-4">
			<TextInput label="Bio" bind:value={formData.bio} />
			<Button onclick={() => stepper.previous()}>Back</Button>
			<Button>Save Profile</Button>
		</div>
	{/snippet}
</Stepper>
\`\`\`

## Accessibility

The Stepper component includes accessibility features:

- Sets \`role="tabpanel"\` on each step panel
- Sets \`aria-labelledby\` linking panel to its step identifier
- Uses \`inert\` attribute on inactive panels to prevent interaction
- Manages focus appropriately when switching steps
- Sets \`tabindex\` appropriately (0 for active step, -1 for inactive)

## StepperState API

The StepperState provides programmatic control:

- **next()**: Move to the next step
- **previous()**: Move to the previous step
- **goTo(index)**: Jump to a specific step index
- **items**: Array of items
- **activeStep**: Current active step index
- **stepHeights**: Object mapping step indices to their heights

## Notes

- Step content can be rendered using either:
  - Individual snippet props (\`step1\`, \`step2\`, etc.) for explicit control
  - Default \`step\` snippet prop for flexible, conditional rendering based on item data
- When both \`step\` and numbered snippets (\`step1\`, \`step2\`, etc.) are provided, numbered snippets take precedence
- Snippet numbering is 1-based (first step = step1)
- The \`step\` snippet receives: \`stepper\` (StepperState), \`item\` (Item), \`index\` (number)
- Content panels animate smoothly when switching steps with automatic height transitions
- The container height adjusts automatically based on the active step's content height
- Inactive panels are hidden with \`inert\` attribute for accessibility
- Animation can be customized via \`keyFramesOptions\`
- The component supports both classic and vertical modes
- Step heights are automatically measured and cached for smooth transitions

## Theme Customization

The Stepper component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **stepper**: Main stepper container styles
- **container**: Step container styles
- **step**: Individual step panel styles

### Available Variants

**stepper**:
- base: Base classes for main stepper container
- Variants:
  - mode: 'classic' | 'vertical' - Stepper layout mode

**container**:
- base: Base classes for step container
- Variants:
  - mode: 'classic' | 'vertical' - Container layout based on mode

**step**:
- base: Base classes for step panels
- Variants:
  - mode: 'classic' | 'vertical' - Step layout based on mode

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Stepper 
  items={items}
  theme={{
    stepper: {
      base: 'relative overflow-hidden',
      mode: {
        classic: 'flex flex-col'
      }
    },
    step: {
      base: 'w-full'
    }
  }}
>
  {#snippet step1()}
    Content
  {/snippet}
</Stepper>
\`\`\`

**Vertical Mode Customization**:
\`\`\`svelte
<Stepper 
  items={items}
  mode="vertical"
  theme={{
    stepper: {
      mode: {
        vertical: 'flex-row'
      }
    },
    container: {
      mode: {
        vertical: 'flex-col'
      }
    }
  }}
>
  {#snippet step1()}
    Content
  {/snippet}
</Stepper>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setStepperTheme } from 'svelai/stepper';
  
  setStepperTheme({
    stepper: {
      base: 'relative overflow-hidden transition-all',
      mode: {
        classic: 'flex flex-col'
      }
    },
    step: {
      base: 'w-full'
    }
  });
</script>
\`\`\`
`;
