<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import MultiStepForm from '$lib/components/Form/MultiStepForm/MultiStepForm.svelte';
	import type { FormStep } from '$lib/components/Form/MultiStepForm/multiStepForm.js';
	import { MultiStepFormState } from '$lib/components/Form/MultiStepForm/multiStepFormState.svelte.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import CheckBoxesInput from '$lib/components/Form/CheckboxesInput/CheckBoxesInput.svelte';
	import TimeInput from '$lib/components/Form/TimeInput/TimeInput.svelte';
	import { Form } from '$lib/index.js';

	let items = $state<FormStep[]>(<const>[
		{
			title: 'step 1',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				time: {
					type: 'time',
					label: 'Time',
					value: 1439,
					format: 'HH:MM',
					placeholder: 'HH:MM'
				},
				checkboxes: {
					type: 'checkboxes',
					label: 'CheckBoxes',
					mode: 'card',
					options: [
						{ label: 'Option 1', value: 'option1' },
						{ label: 'Option 2', value: 'option2' }
					]
				},
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
				switch: {
					type: 'switch',
					label: 'Switch',
					description: 'Switch description'
				},
				date: {
					type: 'date',
					label: 'Date',
					format: 'dd/mm/yyyy',
					placeholder: 'jj/mm/aaaa'
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
				},
				file: {
					type: 'file',
					label: 'File'
				},
				files: {
					type: 'files',
					label: 'Files',
					description: 'Upload multiple files',
					maxFiles: 3
				},
				select: {
					placeholder: 'Select an option',
					type: 'select',
					label: 'Select',
					description: 'Select an option',
					options: [
						{
							label: 'Option 1',
							value: 'option1'
						},
						{
							label: 'Option 2',
							value: 'option2'
						}
					]
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

	let value = $state<any>(1439);
	let formValue = $state<any>({});
</script>

{#snippet footer({ payload: form }: { payload: MultiStepFormState<typeof items> })}
	<div class="raised w-full rounded-lg p-4">
		<Button fullWidth onClick={() => (showFooter = false)}>Submit caca</Button>
	</div>
{/snippet}

<div class="m-2 flex flex-col gap-4 p-10">
	<!-- <TimeInput
		as="minuteSinceMidnight"
		value={1439}
		label="Time"
		format="HH:MM"
		placeholder="HH:MM"
	/> -->
	{value}
</div>

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="my-10 grid w-[800px] gap-10">
		{JSON.stringify(formValue)}
		<Form
			value={{
				time: 1439
			}}
			inputs={{
				time: {
					type: 'time',
					label: 'Time',
					value: 1439,
					format: 'HH:MM',
					as: 'minuteSinceMidnight',
					placeholder: 'HH:MM'
				}
			}}
		/>
		stp
		<CheckBoxesInput
			label="CheckBoxes"
			mode="card"
			options={[
				{ label: 'Option 1', value: 'option1' },
				{ label: 'Option 2', value: 'option2' }
			]}
		/>
		<!-- <MultiStepForm
			footer={showFooter ? footer : undefined}
			steps={items}
			onSubmitStep={(values, step, index) => {
				console.log(values, step, index);
			}}
			onSubmitForm={(values) => {
				console.log(values);
			}}
		></MultiStepForm> -->
	</div>
</ComponentCard>

{#if !showFooter}
	<div class="raised w-full rounded-lg p-4">
		<Button fullWidth onClick={() => (showFooter = true)}>Submit caca</Button>
	</div>
{/if}
