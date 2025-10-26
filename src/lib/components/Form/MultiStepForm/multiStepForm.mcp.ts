export const multiStepFormDescription = `
# MultiStepForm Component

The MultiStepForm component breaks complex forms into manageable steps with progress tracking, navigation controls, and validation per step.

## Basic Usage

\`\`\`svelte
<script>
	let formData = $state({});
	
	const steps = [
		{
			title: 'Personal Info',
			inputs: {
				name: { type: 'text', label: 'Name', required: true },
				email: { type: 'email', label: 'Email', required: true }
			}
		},
		{
			title: 'Address',
			inputs: {
				street: { type: 'text', label: 'Street', required: true },
				city: { type: 'text', label: 'City', required: true }
			}
		},
		{
			title: 'Review',
			inputs: {}
		}
	];
</script>

<MultiStepForm 
	{steps}
	bind:value={formData}
	onSubmit={handleSubmit}
/>
\`\`\`

## Props

### Core Props
- **steps**: Array<Step> (required) - Array of form steps
  - Each step: { title: string, description?: string, inputs: FormInputs }
- **value**: object (bindable) - Form data across all steps
- **currentStep**: number (bindable) - Active step index

### Behavior Props
- **validateOnStepChange**: boolean (default: true) - Validate when changing steps
- **allowStepSkipping**: boolean (default: false) - Allow jumping to any step

### Event Props
- **onSubmit**: (data: object) => void | Promise<void> - Final submission handler
- **onStepChange**: (step: number) => void - Called when step changes
- **onStepValidate**: (step: number, isValid: boolean) => void - Called after validation

### Content Slots
- **header**: Snippet - Custom header
- **footer**: Snippet<{ currentStep, totalSteps, next, prev, submit }> - Custom navigation
- **step**: Snippet<{ step, index, data }> - Custom step rendering

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<MultiStepForm>
	<Header>
		<Stepper />
	</Header>
	<StepContent>
		<Form inputs={currentStepInputs} />
	</StepContent>
	<Footer>
		<PrevButton />
		<NextButton />
		<SubmitButton />
	</Footer>
</MultiStepForm>
\`\`\`

## Examples

### Basic Multi-Step Form
\`\`\`svelte
<script>
	let formData = $state({});
	
	function handleSubmit(data) {
		console.log('Submitted:', data);
	}
</script>

<MultiStepForm 
	steps={[
		{
			title: 'Account',
			inputs: {
				username: { type: 'text', label: 'Username', required: true },
				email: { type: 'email', label: 'Email', required: true },
				password: { type: 'password', label: 'Password', required: true }
			}
		},
		{
			title: 'Profile',
			inputs: {
				firstName: { type: 'text', label: 'First Name', required: true },
				lastName: { type: 'text', label: 'Last Name', required: true },
				bio: { type: 'textarea', label: 'Bio' }
			}
		},
		{
			title: 'Complete',
			inputs: {
				newsletter: { type: 'switch', label: 'Subscribe to newsletter' }
			}
		}
	]}
	bind:value={formData}
	onSubmit={handleSubmit}
/>
\`\`\`

### With Step Descriptions
\`\`\`svelte
<MultiStepForm 
	steps={[
		{
			title: 'Basic Information',
			description: 'Tell us about yourself',
			inputs: { /* ... */ }
		},
		{
			title: 'Contact Details',
			description: 'How can we reach you?',
			inputs: { /* ... */ }
		}
	]}
	bind:value={formData}
	onSubmit={handleSubmit}
/>
\`\`\`

### Allow Step Skipping
\`\`\`svelte
<MultiStepForm 
	steps={steps}
	bind:value={formData}
	allowStepSkipping
	onSubmit={handleSubmit}
/>
\`\`\`

### Registration Form
\`\`\`svelte
<script>
	let registrationData = $state({});
	
	async function handleRegistration(data) {
		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		return response.json();
	}
</script>

<MultiStepForm 
	steps={[
		{
			title: 'Account Setup',
			description: 'Create your account',
			inputs: {
				email: { type: 'email', label: 'Email', required: true },
				password: { type: 'password', label: 'Password', required: true },
				confirmPassword: { type: 'password', label: 'Confirm Password', required: true }
			}
		},
		{
			title: 'Personal Details',
			description: 'Tell us about yourself',
			inputs: {
				firstName: { type: 'text', label: 'First Name', required: true },
				lastName: { type: 'text', label: 'Last Name', required: true },
				dateOfBirth: { type: 'date', label: 'Date of Birth', required: true }
			}
		},
		{
			title: 'Contact Information',
			description: 'Where can we reach you?',
			inputs: {
				phone: { type: 'phone', label: 'Phone Number', required: true },
				address: { type: 'text', label: 'Street Address' },
				city: { type: 'text', label: 'City' },
				country: { 
					type: 'select', 
					label: 'Country', 
					required: true,
					options: countries
				}
			}
		},
		{
			title: 'Preferences',
			description: 'Customize your experience',
			inputs: {
				newsletter: { type: 'switch', label: 'Email Newsletter' },
				notifications: { type: 'switch', label: 'Push Notifications' },
				language: { 
					type: 'select', 
					label: 'Preferred Language',
					options: languages
				}
			}
		}
	]}
	bind:value={registrationData}
	onSubmit={handleRegistration}
/>
\`\`\`

### Checkout Process
\`\`\`svelte
<script>
	let checkoutData = $state({});
</script>

<MultiStepForm 
	steps={[
		{
			title: 'Shipping',
			inputs: {
				fullName: { type: 'text', label: 'Full Name', required: true },
				address: { type: 'text', label: 'Address', required: true },
				city: { type: 'text', label: 'City', required: true },
				zipCode: { type: 'text', label: 'ZIP Code', required: true }
			}
		},
		{
			title: 'Payment',
			inputs: {
				cardNumber: { type: 'text', label: 'Card Number', required: true },
				expiry: { type: 'text', label: 'Expiry (MM/YY)', required: true },
				cvv: { type: 'text', label: 'CVV', required: true }
			}
		},
		{
			title: 'Review',
			inputs: {}
		}
	]}
	bind:value={checkoutData}
	onSubmit={handleCheckout}
>
	{#snippet step({ step, index, data })}
		{#if index === 2}
			<!-- Custom review step -->
			<div class="review">
				<h3>Review Your Order</h3>
				<dl>
					<dt>Shipping To:</dt>
					<dd>{data.fullName}</dd>
					<dd>{data.address}, {data.city} {data.zipCode}</dd>
				</dl>
			</div>
		{/if}
	{/snippet}
</MultiStepForm>
\`\`\`

### Job Application
\`\`\`svelte
<MultiStepForm 
	steps={[
		{
			title: 'Personal Info',
			inputs: {
				fullName: { type: 'text', label: 'Full Name', required: true },
				email: { type: 'email', label: 'Email', required: true },
				phone: { type: 'phone', label: 'Phone' }
			}
		},
		{
			title: 'Experience',
			inputs: {
				currentRole: { type: 'text', label: 'Current Role', required: true },
				yearsExperience: { type: 'number', label: 'Years of Experience', required: true },
				skills: { 
					type: 'checkboxes', 
					label: 'Skills',
					options: skillOptions
				}
			}
		},
		{
			title: 'Documents',
			inputs: {
				resume: { type: 'file', label: 'Resume', accept: '.pdf,.doc', required: true },
				coverLetter: { type: 'file', label: 'Cover Letter', accept: '.pdf' }
			}
		}
	]}
	bind:value={applicationData}
	onSubmit={submitApplication}
/>
\`\`\`

### With Custom Navigation
\`\`\`svelte
<MultiStepForm 
	steps={steps}
	bind:value={formData}
	onSubmit={handleSubmit}
>
	{#snippet footer({ currentStep, totalSteps, next, prev, submit })}
		<div class="custom-nav">
			{#if currentStep > 0}
				<Button variant="ghost" onClick={prev}>
					← Back
				</Button>
			{/if}
			
			{#if currentStep < totalSteps - 1}
				<Button onClick={next}>
					Continue →
				</Button>
			{:else}
				<Button color="primary" onClick={submit}>
					Complete
				</Button>
			{/if}
		</div>
	{/snippet}
</MultiStepForm>
\`\`\`

### With Progress Tracking
\`\`\`svelte
<script>
	let currentStep = $state(0);
	let completedSteps = $state(new Set());
	
	function handleStepChange(step) {
		if (step > currentStep) {
			completedSteps.add(currentStep);
		}
	}
</script>

<MultiStepForm 
	steps={steps}
	bind:currentStep
	onStepChange={handleStepChange}
	onSubmit={handleSubmit}
/>

<p>Progress: {completedSteps.size} of {steps.length} steps completed</p>
\`\`\`

## Step Navigation

- **Next**: Validates current step, then moves forward
- **Previous**: Moves back without validation
- **Submit**: Final step submits entire form
- Progress indicator shows current position

## Validation

- Each step validates independently
- Cannot proceed to next step if current step is invalid
- All steps must be valid for final submission
- Validation runs on step change (configurable)

## Form Data

- All step data is collected in single object
- Data persists across steps
- Can pre-populate with initial values
- Final submission receives complete data

## Accessibility

- Stepper indicates progress
- Keyboard navigation (Tab, Enter)
- ARIA labels for steps and navigation
- Focus management between steps
- Screen reader announcements

## Notes

- Breaks long forms into manageable sections
- Visual progress tracking with stepper
- Validates per-step or on final submit
- Data persists across navigation
- Customizable navigation and rendering
- Integrates with Form component per step
`;
