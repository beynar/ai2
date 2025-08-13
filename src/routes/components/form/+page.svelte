<script lang="ts">
	import MultiStepForm from '$lib/components/Form/MultiStepForm/MultiStepForm.svelte';
	import type { FormStep } from '$lib/components/Form/MultiStepForm/multiStepForm.js';
	import ComponentCard from '../../ComponentCard.svelte';

	let items = $state(<const>[
		{
			title: 'step 1',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			inputs: {
				name: {
					type: 'text',
					label: 'Name',
					placeholder: 'Name'
				},
				age: {
					type: 'text',
					label: 'Age',
					placeholder: 'Age',
					required: true
				},
				email: {
					type: 'text',
					label: 'Email',
					placeholder: 'Email'
				}
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
			title: 'step 3',
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
	]) satisfies FormStep[];
</script>

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="my-10 grid w-[800px] gap-10">
		<MultiStepForm
			steps={items}
			onSubmit={(values) => {
				console.log(values.name);
			}}
		/>
	</div>
</ComponentCard>
