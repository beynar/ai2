<script lang="ts">
	import Form from '$lib/components/Form/Form/Form.svelte';
	import TextInput from '$lib/components/Form/TextInput/TextInput.svelte';
</script>

<div class="grid gap-10">
	<div
		class="border-surface-lighter relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<div class="flex items-center justify-center gap-4">
			<Form
				inputs={{
					name: {
						type: 'text',
						label: 'name',
						required: true,
						class: 'col-span-1'
					},
					email: {
						type: 'email',
						label: 'email',
						required: true,
						class: 'col-span-1'
					},
					password: {
						type: 'password',
						label: 'password',
						required: true
					},
					textarea: {
						type: 'textarea',
						label: 'textarea',
						required: true
					},
					select: {
						type: 'select',
						label: 'select',
						required: true,
						options: [
							{ value: '1', label: '1' },
							{ value: '2', label: '2' }
						]
					}
				}}
				onSubmit={() => {
					console.log('submit');
				}}
			/>
			<TextInput label="Text Input" helper="Helper" errors={['Error']} />
		</div>
	</div>
</div>
