<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Combobox from '$lib/components/Form/Combobox/Combobox.svelte';
	import { Form } from '$lib/components/Form/Form/index.js';
	import type { FormStep } from '$lib/components/Form/MultiStepForm/multiStepForm.props.js';
	import { MultiStepFormState } from '$lib/components/Form/MultiStepForm/multiStepFormState.svelte.js';
	import Switch from '$lib/components/Form/Switch/Switch.svelte';
	import ComponentCard from '../../ComponentCard.svelte';

	let items = $state<FormStep[]>(<const>[
		{
			title: 'step 1',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				time: {
					type: 'time',
					label: 'Time',

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
	let dynamicFormValue = $state<any>({});

	let defaultValue = $state<string | null>(null);
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

<ComponentCard title="Dynamic Field Visibility Example" class="flex !items-start">
	<div class="my-10 grid w-[800px] gap-10">
		<Combobox
			placeholder="Select an option"
			options={[
				{ label: 'Option 1', value: 'option1' },
				{ label: 'Option 2', value: 'option2' }
			]}
			onChange={(value, option) => {
				console.log('value', value, option);
			}}
		></Combobox>

		<Switch
			label="Switch"
			description="Switch description"
			onChange={(value) => {
				console.log('value', value);
			}}
		/>
		<Form
			bind:value={dynamicFormValue}
			inputs={{
				phone: {
					type: 'phone',
					label: 'Phone',
					placeholder: 'Phone',
					required: true
				}
			}}
			onSubmit={(values) => {
				console.log('Form submitted:', values);
			}}
		/>
		<Form
			bind:value={dynamicFormValue}
			inputs={{
				textInput: {
					type: 'text',
					label: 'Text Input',
					placeholder: 'Text Input',
					required: true
				},
				userType: {
					type: 'select',
					label: 'Account Type',
					placeholder: 'Select account type',
					options: [
						{ label: 'Personal', value: 'personal' },
						{ label: 'Business', value: 'business' }
					],
					required: true
				},
				userType2: {
					type: 'radio',
					label: 'Account Type',
					placeholder: 'Select account type',
					options: [
						{ label: 'Personal', value: 'personal' },
						{ label: 'Business', value: 'business' }
					],
					required: true
				},
				userType3: {
					type: 'radio',
					mode: 'card',
					label: 'Account Type',
					placeholder: 'Select account type',
					options: [
						{ label: 'Personal', value: 'personal' },
						{ label: 'Business', value: 'business' }
					],
					required: true
				},
				userType4: {
					type: 'checkboxes',
					label: 'Account Type',
					placeholder: 'Select account type',
					options: [
						{ label: 'Personal', value: 'personal' },
						{ label: 'Business', value: 'business' }
					],
					required: true
				},
				userType5: {
					type: 'checkboxes',
					mode: 'card',
					label: 'Account Type',
					placeholder: 'Select account type',
					options: [
						{ label: 'Personal', value: 'personal' },
						{ label: 'Business', value: 'business' }
					],
					required: true
				},
				// Static visibility: always hidden
				hiddenField: {
					type: 'text',
					label: 'This field is always hidden',
					placeholder: 'Hidden field',
					visible: false
				},
				// Dynamic visibility: show only when userType is 'business'
				companyName: {
					type: 'text',
					label: 'Company Name',
					placeholder: 'Enter company name',
					visible: (value) => value.userType === 'business',
					required: true
				},
				// Dynamic visibility: show only when userType is 'personal'
				age: {
					type: 'number',
					label: 'Age',
					placeholder: 'Enter your age',
					min: 18,
					max: 120,
					visible: (value) => value.userType === 'personal'
				},
				newsletter: {
					type: 'switch',
					label: 'Subscribe to Newsletter',
					description: 'Receive updates and promotions'
				},
				// Dynamic visibility: show only when newsletter is true
				emailPreference: {
					type: 'select',
					label: 'Email Preference',
					placeholder: 'Select frequency',
					options: [
						{ label: 'Daily', value: 'daily' },
						{ label: 'Weekly', value: 'weekly' },
						{ label: 'Monthly', value: 'monthly' }
					],
					visible: (value) => value.newsletter === true
				},
				// Dynamic visibility: show when userType is 'business' AND newsletter is true
				businessNewsletter: {
					type: 'text',
					label: 'Business Newsletter Email',
					placeholder: 'business@example.com',
					visible: (value) => value.userType === 'business' && value.newsletter === true
				},
				// Static visibility: always visible
				email: {
					type: 'email',
					label: 'Email Address',
					placeholder: 'your@email.com',
					required: true,
					visible: true
				}
			}}
			onSubmit={(values) => {
				console.log('Form submitted:', values);
			}}
		/>
	</div>
</ComponentCard>

{#if !showFooter}
	<div class="raised w-full rounded-lg p-4">
		<Button fullWidth onClick={() => (showFooter = true)}>Submit caca</Button>
	</div>
{/if}
