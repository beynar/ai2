<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { MultiStepForm, type FormStep } from '$lib/components/Form/MultiStepForm/index.js';

	const steps: FormStep[] = [
		{
			title: 'Account',
			description: 'Tell us who you are',
			inputs: {
				name: { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
				email: { type: 'email', label: 'Email', placeholder: 'you@example.com', required: true }
			}
		},
		{
			title: 'Security',
			description: 'Secure your account',
			inputs: {
				password: {
					type: 'password',
					label: 'Password',
					placeholder: 'Choose a password',
					required: true
				},
				twoFactor: {
					type: 'switch',
					label: 'Enable two-factor authentication',
					description: 'Recommended for extra security'
				}
			}
		},
		{
			title: 'Preferences',
			description: 'Customize your experience',
			inputs: {
				plan: {
					type: 'select',
					label: 'Plan',
					placeholder: 'Choose a plan',
					required: true,
					items: [
						{ value: 'free', label: 'Free' },
						{ value: 'pro', label: 'Pro' },
						{ value: 'team', label: 'Team' }
					]
				},
				newsletter: {
					type: 'switch',
					label: 'Subscribe to newsletter',
					description: 'Receive product updates'
				}
			}
		}
	];
</script>

<DocPage
	title="Multi-step form"
	subtitle="Splits a long form into sequential, validated steps."
	component="MultiStepForm"
	features={[
		'Stepper with progress meter',
		'Validates current step before advancing',
		'Previous, next and submit buttons',
		'Bindable accumulated form value',
		'Optional showMeter toggle'
	]}
>
	<ComponentCard
		description="A wizard with a progress meter and per-step validation"
		class="!items-start"
		code={`<MultiStepForm
	items={[
		{
			title: 'Account',
			description: 'Tell us who you are',
			inputs: {
				name: { type: 'text', label: 'Name', placeholder: 'Your name', required: true },
				email: { type: 'email', label: 'Email', placeholder: 'you@example.com', required: true }
			}
		},
		{
			title: 'Security',
			description: 'Secure your account',
			inputs: {
				password: {
					type: 'password',
					label: 'Password',
					placeholder: 'Choose a password',
					required: true
				},
				twoFactor: {
					type: 'switch',
					label: 'Enable two-factor authentication',
					description: 'Recommended for extra security'
				}
			}
		},
		{
			title: 'Preferences',
			description: 'Customize your experience',
			inputs: {
				plan: {
					type: 'select',
					label: 'Plan',
					placeholder: 'Choose a plan',
					required: true,
					items: [
						{ value: 'free', label: 'Free' },
						{ value: 'pro', label: 'Pro' },
						{ value: 'team', label: 'Team' }
					]
				},
				newsletter: {
					type: 'switch',
					label: 'Subscribe to newsletter',
					description: 'Receive product updates'
				}
			}
		}
	]}
	onSubmitForm={(values) => {
		console.log('Form submitted:', values);
	}}
/>`}
	>
		<div class="w-full max-w-lg">
			<MultiStepForm
				items={steps}
				onSubmitForm={(values) => {
					console.log('Form submitted:', values);
				}}
			/>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="A wizard with a progress meter and per-step validation"
			class="!items-start"
		>
			<div class="w-full max-w-lg">
				<MultiStepForm
					items={steps}
					onSubmitForm={(values) => {
						console.log('Form submitted:', values);
					}}
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Hide the progress meter with showMeter={false}"
			class="!items-start"
		>
			<div class="w-full max-w-lg">
				<MultiStepForm
					items={steps}
					showMeter={false}
					onSubmitForm={(values) => {
						console.log('Form submitted:', values);
					}}
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
