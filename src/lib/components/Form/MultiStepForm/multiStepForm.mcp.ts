export const multiStepFormDescription = `
# MultiStepForm Component

MultiStepForm renders an ordered collection of form-step items with a Stepper, optional Meter, per-step validation, and final submission.

## Basic Usage

\`\`\`svelte
<script>
	let value = $state({});

	const items = [
		{
			title: 'Account',
			description: 'Tell us who you are',
			inputs: {
				name: { type: 'text', label: 'Name', required: true },
				email: { type: 'email', label: 'Email', required: true }
			}
		},
		{
			title: 'Preferences',
			inputs: {
				plan: {
					type: 'select',
					label: 'Plan',
					items: [
						{ value: 'free', label: 'Free' },
						{ value: 'pro', label: 'Pro' }
					]
				}
			}
		}
	];
</script>

<MultiStepForm
	{items}
	bind:value
	onSubmitForm={(values) => {
		console.log(values);
	}}
/>
\`\`\`

## Props

- **items**: FormStep[] (required) - Ordered form-step items.
- **value**: object (bindable) - Merged values across every step.
- **showMeter**: boolean - Renders the progress meter when true. Defaults to true.
- **meterColor**: Colors - Color token used by the meter.
- **previousText**: string - Previous button label. Defaults to "Previous".
- **nextText**: string - Next button label. Defaults to "Next".
- **submitText**: string - Final submit button label. Defaults to "Submit".
- **onSubmitForm**: (values) => void | Promise<void> - Called on final submit.
- **onSubmitStep**: (values, step, index) => boolean | void | Promise<boolean | void> - Called before advancing; return false to block.
- **previousButtonProps**: ButtonProps - Props spread onto the previous button.
- **nextButtonProps**: ButtonProps - Props spread onto the next button.
- **submitButtonProps**: ButtonProps - Props spread onto the final submit button.
- **class**: string - Additional CSS classes for the root.
- **theme**: MultiStepFormThemeProps - Theme overrides, with optional nested Form theme.

## FormStep

\`\`\`ts
type FormStep = {
	title?: string;
	description?: string;
	inputs: FormInputs;
};
\`\`\`

## Snippets

- **header**: Custom header content. By default the component renders the meter here.
- **footer**: Custom footer content. By default the component renders previous/next/submit buttons.
- **children**: Receives the MultiStepFormState for custom content below the stepper.

## Examples

### Hide Meter

\`\`\`svelte
<MultiStepForm
	items={steps}
	showMeter={false}
	onSubmitForm={save}
/>
\`\`\`

### Block Step Advance

\`\`\`svelte
<MultiStepForm
	items={steps}
	onSubmitStep={async (values, step, index) => {
		if (index === 0 && !values.email) return false;
	}}
	onSubmitForm={save}
/>
\`\`\`

### Read Form State

\`\`\`svelte
<MultiStepForm items={steps} onSubmitForm={save}>
	{#snippet children(form)}
		<p>Current step: {(form.stepper?.activeStep ?? 0) + 1}</p>
	{/snippet}
</MultiStepForm>
\`\`\`

## Theme

- **root**: Main multi-step form container.
- **multiStepFormHeader**: Header wrapper.
- **multiStepFormFooter**: Footer wrapper.
- **form**: Theme forwarded to the nested Form component.
`;
