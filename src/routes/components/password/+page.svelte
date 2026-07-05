<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { PasswordInput } from '$lib/components/Form/PasswordInput/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let password = $state('');
</script>

<DocPage
	title="Password"
	subtitle="Password entry with a visibility toggle and strength cues."
	component="PasswordInput"
	features={[
		'Show/hide toggle on prefix',
		'Bindable value, errors & focused',
		'Field validation via onValidate',
		'data-1p-ignore for autofill'
	]}
>
	<ComponentCard
		description="A masked password input with visibility toggle"
		code={`<PasswordInput
	label="Password"
	placeholder="Enter your password"
	bind:value={password}
/>`}
	>
		<div class="w-full max-w-md">
			<PasswordInput label="Password" placeholder="Enter your password" bind:value={password} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="A masked password input with visibility toggle"
		>
			<div class="w-full max-w-md">
				<PasswordInput label="Password" placeholder="Enter your password" bind:value={password} />
			</div>
		</ComponentCard>

		<ComponentCard
			description="Guide the user with requirements"
		>
			<div class="w-full max-w-md">
				<PasswordInput
					label="New password"
					placeholder="Choose a strong password"
					helper="At least 8 characters"
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Using type: 'password' inside a Form"
		>
			<div class="w-full max-w-md">
				<Form
					inputs={{
						password: {
							type: 'password',
							label: 'Password',
							placeholder: 'Enter your password',
							required: true
						}
					}}
					onSubmit={(data) => {
						console.log('Form submitted:', data);
					}}
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
