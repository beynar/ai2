<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { Select } from '$lib/components/Form/Select/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	import type { SelectItems } from '$lib/components/Form/Select/index.js';

	const roles = [
		{ value: 'admin', label: 'Administrator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer', disabled: true },
		{ value: 'guest', label: 'Guest' }
	];

	const timezones: SelectItems = [
		{
			label: 'Europe',
			items: [
				{ value: 'paris', label: 'Paris (CET)' },
				{ value: 'london', label: 'London (GMT)' },
				{ value: 'berlin', label: 'Berlin (CET)' }
			]
		},
		{
			label: 'America',
			items: [
				{ value: 'nyc', label: 'New York (EST)' },
				{ value: 'la', label: 'Los Angeles (PST)' },
				{ value: 'sao-paulo', label: 'São Paulo (BRT)', disabled: true }
			]
		},
		{
			label: 'Asia',
			items: [
				{ value: 'tokyo', label: 'Tokyo (JST)' },
				{ value: 'singapore', label: 'Singapore (SGT)' }
			]
		}
	];

	let value = $state<string | null>(null);
	let timezone = $state<string | null>(null);
</script>

<DocPage
	title="Select"
	subtitle="A dropdown for choosing one option from a list."
	component="Select"
	features={[
		'role=combobox + listbox ARIA pattern',
		'Arrow keys, Enter, Escape navigation',
		'Grouped options with separators',
		'Bindable value with field validation',
		'Virtual focus stays on trigger'
	]}
>
	<ComponentCard
		description="Pick a role for a team member"
		code={`<Select
	label="Role"
	description="Controls what this member can see and do"
	placeholder="Select a role"
	items={[
		{ value: 'admin', label: 'Administrator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer', disabled: true },
		{ value: 'guest', label: 'Guest' }
	]}
	bind:value
/>`}
	>
		<div class="w-full max-w-md">
			<Select
				label="Role"
				description="Controls what this member can see and do"
				placeholder="Select a role"
				items={roles}
				bind:value
			/>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="A single-choice select with a placeholder and a disabled option (Viewer)"
		>
			<div class="w-full max-w-md">
				<Select label="Role" placeholder="Select a role" items={roles} bind:value />
				{#if value}
					<p class="text-foreground-muted mt-2 text-xs">Selected: {value}</p>
				{/if}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Flat options and labelled groups can be mixed; separators render between groups"
		>
			<div class="w-full max-w-md">
				<Select
					label="Timezone"
					placeholder="Select a timezone"
					items={timezones}
					bind:value={timezone}
				/>
				{#if timezone}
					<p class="text-foreground-muted mt-2 text-xs">Selected: {timezone}</p>
				{/if}
			</div>
		</ComponentCard>

		<ComponentCard description="Bare options mixed with a group, separators disabled">
			<div class="w-full max-w-md">
				<Select
					label="Assignee"
					placeholder="Pick an assignee"
					separators={false}
					items={[
						{ value: 'me', label: 'Assign to me' },
						{ value: 'unassigned', label: 'Unassigned' },
						{
							label: 'Team',
							items: [
								{ value: 'ada', label: 'Ada Lovelace' },
								{ value: 'grace', label: 'Grace Hopper' }
							]
						}
					]}
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large selects."
			code={`<div class="grid w-full max-w-md gap-6">
	<Select size="small" label="Small" placeholder="Select a role" items={roles} />
	<Select size="normal" label="Normal" placeholder="Select a role" items={roles} />
	<Select size="large" label="Large" placeholder="Select a role" items={roles} />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<Select size="small" label="Small" placeholder="Select a role" items={roles} />
				<Select size="normal" label="Normal" placeholder="Select a role" items={roles} />
				<Select size="large" label="Large" placeholder="Select a role" items={roles} />
			</div>
		</ComponentCard>

		<ComponentCard description="A default value and a disabled state">
			<div class="grid w-full max-w-md gap-6">
				<Select label="Role" items={roles} value="editor" />
				<Select label="Role" placeholder="Unavailable" items={roles} disabled />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'select' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						role: {
							type: 'select',
							label: 'Role',
							placeholder: 'Select a role',
							required: true,
							items: roles
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
