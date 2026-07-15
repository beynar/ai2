<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Switch } from '$lib/components/Form/Switch/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let enabled = $state(false);
</script>

<DocPage
	title="Switch"
	subtitle="A toggle for switching a single setting on or off."
	component="Switch"
	features={[
		'role=switch with aria-checked',
		'Enter & Space keyboard toggle',
		'bind:value, errors, and focused',
		'Hidden checkbox for form submit'
	]}
>
	<ComponentCard
		description="A boolean toggle with a label and description"
		code={`<Switch
	label="Notifications"
	description="Receive updates by email"
	bind:value={enabled}
/>`}
	>
		<div class="w-full max-w-md">
			<Switch label="Notifications" description="Receive updates by email" bind:value={enabled} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="A boolean toggle with a label and description">
			<div class="w-full max-w-md">
				<Switch label="Notifications" description="Receive updates by email" bind:value={enabled} />
				<p class="text-foreground-muted mt-2 text-xs">Value: {enabled}</p>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large switch sizes."
			code={`<div class="grid w-full max-w-md gap-6">
	<Switch size="small" label="Small" description="Compact switch" value={true} />
	<Switch size="normal" label="Normal" description="Default switch" value={true} />
	<Switch size="large" label="Large" description="Roomier switch" value={true} />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<Switch size="small" label="Small" description="Compact switch" value={true} />
				<Switch size="normal" label="Normal" description="Default switch" value={true} />
				<Switch size="large" label="Large" description="Roomier switch" value={true} />
			</div>
		</ComponentCard>

		<ComponentCard description="An enabled default and a disabled state">
			<div class="grid w-full max-w-md gap-6">
				<Switch label="Dark mode" value={true} />
				<Switch label="Beta features" description="Coming soon" disabled />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'switch' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						newsletter: {
							type: 'switch',
							label: 'Subscribe to newsletter',
							description: 'Receive updates and promotions'
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
