export const stepperDescription = `
# Stepper Component

The Stepper component guides users through a multi-step process, displaying progress and allowing navigation between steps.

## Basic Usage

\`\`\`svelte
<script>
	let currentStep = $state(0);
	let steps = [
		{ label: 'Account', description: 'Create your account' },
		{ label: 'Profile', description: 'Fill your profile' },
		{ label: 'Complete', description: 'Finish setup' }
	];
</script>

<Stepper bind:currentStep {steps} />
\`\`\`

## Props

### Core Props
- **steps**: Array<Step> (required) - Array of step configurations
  - Each step: { label: string, description?: string, icon?: Snippet, status?: 'complete' | 'current' | 'upcoming' }
- **currentStep**: number (bindable) - Index of current active step

### Visual Props
- **orientation**: 'horizontal' | 'vertical' (default: 'horizontal')
- **size**: 'small' | 'normal' | 'large' - Size of step indicators
- **variant**: 'default' | 'simple' | 'circle' - Visual style

### Behavior Props
- **clickable**: boolean (default: true) - Allow clicking steps to navigate
- **onStepClick**: (step: number) => void - Called when step is clicked

### Content Slots
- **step**: Snippet<{ step: Step, index: number }> - Custom step rendering
- **connector**: Snippet - Custom connector between steps

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Stepper>
	<Step>
		<StepIndicator />
		<StepLabel />
		<StepDescription />
	</Step>
	<Connector />
	<Step>...</Step>
</Stepper>
\`\`\`

## Examples

### Basic Stepper
\`\`\`svelte
<script>
	let currentStep = $state(0);
	
	let steps = [
		{ label: 'Step 1' },
		{ label: 'Step 2' },
		{ label: 'Step 3' }
	];
</script>

<Stepper bind:currentStep {steps} />
\`\`\`

### With Descriptions
\`\`\`svelte
<Stepper 
	bind:currentStep
	steps={[
		{ label: 'Personal Info', description: 'Enter your details' },
		{ label: 'Address', description: 'Where do you live?' },
		{ label: 'Review', description: 'Confirm your information' }
	]}
/>
\`\`\`

### Vertical Orientation
\`\`\`svelte
<Stepper 
	orientation="vertical"
	bind:currentStep
	{steps}
/>
\`\`\`

### Different Variants
\`\`\`svelte
<Stepper variant="default" bind:currentStep {steps} />
<Stepper variant="simple" bind:currentStep {steps} />
<Stepper variant="circle" bind:currentStep {steps} />
\`\`\`

### Non-clickable Steps
\`\`\`svelte
<Stepper 
	clickable={false}
	bind:currentStep
	{steps}
/>
\`\`\`

### With Navigation
\`\`\`svelte
<script>
	let currentStep = $state(0);
	let steps = [
		{ label: 'Account' },
		{ label: 'Profile' },
		{ label: 'Complete' }
	];
	
	function next() {
		if (currentStep < steps.length - 1) currentStep++;
	}
	
	function prev() {
		if (currentStep > 0) currentStep--;
	}
</script>

<Stepper bind:currentStep {steps} />

<div class="flex gap-2 mt-4">
	<Button onClick={prev} disabled={currentStep === 0}>
		Previous
	</Button>
	<Button onClick={next} disabled={currentStep === steps.length - 1}>
		Next
	</Button>
</div>
\`\`\`

### With Custom Icons
\`\`\`svelte
<Stepper 
	bind:currentStep
	steps={[
		{ 
			label: 'Account',
			icon: () => '<Icon name="user" />'
		},
		{ 
			label: 'Payment',
			icon: () => '<Icon name="credit-card" />'
		},
		{ 
			label: 'Done',
			icon: () => '<Icon name="check" />'
		}
	]}
/>
\`\`\`

### Form Wizard
\`\`\`svelte
<script>
	let currentStep = $state(0);
	let formData = $state({});
	
	let steps = [
		{ label: 'Basic Info', description: 'Name and email' },
		{ label: 'Preferences', description: 'Your settings' },
		{ label: 'Confirm', description: 'Review and submit' }
	];
	
	function handleSubmit() {
		if (currentStep === steps.length - 1) {
			// Submit form
			console.log('Submitting:', formData);
		} else {
			currentStep++;
		}
	}
</script>

<Stepper bind:currentStep {steps} />

<form onsubmit={handleSubmit}>
	{#if currentStep === 0}
		<TextInput bind:value={formData.name} label="Name" />
		<TextInput bind:value={formData.email} label="Email" />
	{:else if currentStep === 1}
		<Switch bind:checked={formData.notifications} label="Notifications" />
	{:else}
		<div>Review your information...</div>
	{/if}
	
	<Button type="submit">
		{currentStep === steps.length - 1 ? 'Submit' : 'Next'}
	</Button>
</form>
\`\`\`

### With Step Status
\`\`\`svelte
<Stepper 
	currentStep={1}
	steps={[
		{ label: 'Step 1', status: 'complete' },
		{ label: 'Step 2', status: 'current' },
		{ label: 'Step 3', status: 'upcoming' }
	]}
/>
\`\`\`

## Accessibility

- Keyboard navigation between steps
- ARIA labels for screen readers
- Progress indication
- Focus management

## Notes

- Current step is automatically highlighted
- Previous steps can be marked as completed
- Connector lines show progress between steps
- Steps can be made non-interactive
- Supports both horizontal and vertical layouts
`;
