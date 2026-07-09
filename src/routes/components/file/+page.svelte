<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { FileInput } from '$lib/components/Form/File/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let single = $state<File | null>(null);
	let multiple = $state<File[] | null>(null);
</script>

<DocPage
	title="File"
	subtitle="Upload files via click or drag-and-drop."
	component="FileInput"
	features={[
		'Click or drag-and-drop upload',
		'Single and multiple file modes',
		'MIME type, size and count limits',
		'Bindable File or File[] value',
		'Image preview thumbnails'
	]}
>
	<ComponentCard
		description="Click or drag a single image file"
		code={`<FileInput label="Avatar" mode="single" types={['image/*']} bind:value={single} />`}
	>
		<div class="w-full max-w-md">
			<FileInput label="Avatar" mode="single" types={['image/*']} bind:value={single} />
			{#if single}
				<p class="text-foreground-muted mt-2 text-xs">Selected: {single.name}</p>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Click or drag a single file">
			<div class="w-full max-w-md">
				<FileInput label="Avatar" mode="single" types={['image/*']} bind:value={single} />
				{#if single}
					<p class="text-foreground-muted mt-2 text-xs">Selected: {single.name}</p>
				{/if}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large file inputs."
			code={`<div class="grid w-full max-w-md gap-6">
	<FileInput size="small" label="Small" mode="single" types={['image/*']} />
	<FileInput size="normal" label="Normal" mode="single" types={['image/*']} />
	<FileInput size="large" label="Large" mode="single" types={['image/*']} />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<FileInput size="small" label="Small" mode="single" types={['image/*']} />
				<FileInput size="normal" label="Normal" mode="single" types={['image/*']} />
				<FileInput size="large" label="Large" mode="single" types={['image/*']} />
			</div>
		</ComponentCard>

		<ComponentCard description="Upload up to 3 files with a size limit">
			<div class="w-full max-w-md">
				<FileInput
					label="Attachments"
					mode="multiple"
					maxFiles={3}
					maxSize={5 * 1024 * 1024}
					bind:value={multiple}
				/>
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'file' and 'files' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						avatar: {
							type: 'file',
							label: 'Avatar',
							required: true
						},
						documents: {
							type: 'files',
							label: 'Documents',
							description: 'Upload up to 3 files',
							maxFiles: 3
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
