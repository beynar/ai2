<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import MultiStepForm from '$lib/components/Form/MultiStepForm/MultiStepForm.svelte';
	import type { FormStep } from '$lib/components/Form/MultiStepForm/multiStepForm.js';
	import { MultiStepFormState } from '$lib/components/Form/MultiStepForm/multiStepFormState.svelte.js';
	import ComponentCard from '../../ComponentCard.svelte';

	let items = $state<FormStep[]>(<const>[
		{
			title: 'step 1',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				password: {
					type: 'password',
					label: 'Password',
					placeholder: 'Password'
				},
				phone: {
					type: 'phone',
					label: 'Phone',
					placeholder: 'Phone'
				},
				date: {
					type: 'date',
					label: 'Date'
				},
				datetime: {
					type: 'datetime',
					label: 'Datetime'
				},
				calendar: {
					type: 'calendar',
					label: 'Calendar'
				},
				calendarRange: {
					type: 'calendar-range',
					label: 'Calendar Range'
				}
				// name: {
				// 	type: 'text',
				// 	label: 'Name',
				// 	placeholder: 'Name'
				// },
				// age: {
				// 	type: 'number',
				// 	label: 'Age',
				// 	max: 100,
				// 	min: 18,
				// 	step: 10,
				// 	placeholder: 'Age',
				// 	required: true
				// },
				// email: {
				// 	type: 'text',
				// 	label: 'Email',
				// 	placeholder: 'Email'
				// },
				// radiosCard: {
				// 	type: 'select',
				// 	label: 'Radios',
				// 	placeholder: 'Radios',
				// 	options: [
				// 		{
				// 			label: 'Option 1',
				// 			value: 'option1'
				// 		},
				// 		{
				// 			label: 'Option 2',
				// 			value: 'option2'
				// 		}
				// 	]
				// },
				// radiosNormal: {
				// 	type: 'radio',
				// 	label: 'Radios',
				// 	mode: 'normal',
				// 	required: true,
				// 	options: [
				// 		{
				// 			label:
				// 				'Option 1 lore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
				// 			value: 'option1'
				// 		},
				// 		{
				// 			label: 'Option 2',
				// 			value: 'option2'
				// 		},
				// 		{
				// 			label: 'Option 3',
				// 			value: 'option3'
				// 		}
				// 	]
				// },
				// cards: {
				// 	type: 'radio',
				// 	label: 'Radios',
				// 	mode: 'card',
				// 	required: true,
				// 	options: [
				// 		{
				// 			label:
				// 				'Option 1 lore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
				// 			value: 'option1'
				// 		},
				// 		{
				// 			label: 'Option 2',
				// 			value: 'option2'
				// 		},
				// 		{
				// 			label: 'Option 3',
				// 			value: 'option3'
				// 		}
				// 	]
				// },
				// checkboxes: {
				// 	type: 'checkboxes',
				// 	label: 'Radios',
				// 	mode: 'normal',
				// 	required: true,
				// 	options: [
				// 		{
				// 			label:
				// 				'Option 1 lore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
				// 			value: 'option1'
				// 		},
				// 		{
				// 			label: 'Option 2',
				// 			value: 'option2'
				// 		},
				// 		{
				// 			label: 'Option 3',
				// 			value: 'option3'
				// 		}
				// 	]
				// },
				// checkboxesCard: {
				// 	type: 'checkboxes',
				// 	label: 'Radios',
				// 	mode: 'card',
				// 	required: true,
				// 	options: [
				// 		{
				// 			label:
				// 				'Option 1 lore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
				// 			value: 'option1'
				// 		},
				// 		{
				// 			label: 'Option 2',
				// 			value: 'option2'
				// 		},
				// 		{
				// 			label: 'Option 3',
				// 			value: 'option3'
				// 		}
				// 	]
				// }
				// switch: {
				// 	type: 'switch',
				// 	label: 'Switch',
				// 	description: 'Switch description'
				// }
			}
		},
		{
			title: 'step 2',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				site: {
					type: 'text',
					label: 'Site',
					placeholder: 'Site'
				},
				phone: {
					type: 'text',
					label: 'Phone',
					placeholder: 'Phone'
				}
			}
		},
		{
			// title: 'step 3',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				company: {
					type: 'text',
					label: 'Age',
					placeholder: 'Age'
				},
				country: {
					type: 'text',
					label: 'Country',
					placeholder: 'Country'
				},
				address: {
					type: 'text',
					label: 'Address',
					placeholder: 'Address'
				},
				zip: {
					type: 'text',
					label: 'Zip',
					placeholder: 'Zip'
				},
				message: {
					type: 'textarea',
					label: 'Message',
					placeholder: 'Message'
				}
			}
		}
	]);

	let showFooter = $state(false);
</script>

{#snippet footer({ payload: form }: { payload: MultiStepFormState<typeof items> })}
	<div class="raised w-full rounded-lg p-4">
		<Button fullWidth onClick={() => (showFooter = false)}>Submit caca</Button>
	</div>
{/snippet}

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="my-10 grid w-[800px] gap-10">
		<MultiStepForm
			footer={showFooter ? footer : undefined}
			steps={items}
			onSubmitStep={(values, step, index) => {
				console.log(values, step, index);
			}}
			onSubmitForm={(values) => {
				console.log(values);
			}}
		></MultiStepForm>
	</div>
</ComponentCard>

{#if !showFooter}
	<div class="raised w-full rounded-lg p-4">
		<Button fullWidth onClick={() => (showFooter = true)}>Submit caca</Button>
	</div>
{/if}
