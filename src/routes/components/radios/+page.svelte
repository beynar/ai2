<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import RadioInput from '$lib/components/Form/RadioInput/RadioInput.svelte';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let selectedOptions = $state(['option1']);
	let cardSelectedOptions = $state(['card1']);

	const normalOptions = [
		{ value: 'option1', label: 'Option 1', description: 'This is the first option' },
		{ value: 'option2', label: 'Option 2', description: 'This is the second option' },
		{ value: 'option3', label: 'Option 3', description: 'This is the third option' }
	];

	const cardOptions = [
		{ value: 'card1', label: 'Card Option 1', description: 'This is a card style option' },
		{ value: 'card2', label: 'Card Option 2', description: 'Another card style option' },
		{ value: 'card3', label: 'Card Option 3', description: 'Yet another card style option' }
	];
</script>

<div class="grid gap-10">
	<ComponentCard title="Radios Input - Normal Mode" class="flex !items-start">
		<div class="w-full max-w-md">
			<RadioInput
				bind:value={selectedOptions}
				options={normalOptions}
				mode="normal"
				name="normal-radios"
				label="Choose your option"
				required
			/>
			<div class="text-contrast-muted mt-4 text-sm">
				Selected: {selectedOptions.join(', ')}
			</div>
		</div>
	</ComponentCard>

	<ComponentCard title="Radios Input - Card Mode" class="flex !items-start">
		<div class="w-full max-w-md">
			<RadioInput
				bind:value={cardSelectedOptions}
				options={cardOptions}
				mode="card"
				name="card-radios"
				label="Choose your card option"
				required
			/>
			<div class="text-contrast-muted mt-4 text-sm">
				Selected: {cardSelectedOptions.join(', ')}
			</div>
		</div>
	</ComponentCard>

	<ComponentCard title="Radios Input - Form Integration" class="flex !items-start">
		<div class="w-full max-w-md">
			<Form
				inputs={{
					preference: {
						type: 'radios',
						label: 'Your preference',
						required: true,
						mode: 'normal',
						options: [
							{
								value: 'email',
								label: 'Email notifications',
								description: 'Receive updates via email'
							},
							{ value: 'sms', label: 'SMS notifications', description: 'Receive updates via SMS' },
							{ value: 'none', label: 'No notifications', description: "Don't receive any updates" }
						]
					},
					style: {
						type: 'radios',
						label: 'Interface style',
						required: true,
						mode: 'card',
						options: [
							{ value: 'light', label: 'Light theme', description: 'Clean and bright interface' },
							{ value: 'dark', label: 'Dark theme', description: 'Easy on the eyes' },
							{ value: 'auto', label: 'Auto theme', description: 'Follows system preference' }
						]
					}
				}}
				onSubmit={(data) => {
					console.log('Form submitted:', data);
				}}
			/>
		</div>
	</ComponentCard>
</div>
