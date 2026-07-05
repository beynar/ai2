<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { TextArea } from '$lib/components/Form/TextArea/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let message = $state('');
</script>

<DocPage
	title="Textarea"
	subtitle="Multi-line text entry that can autosize."
	component="TextArea"
	features={[
		'Autoresizes height with content',
		'Bindable value, errors & focus',
		'maxLength character cap',
		'Enter submits via onPressEnter'
	]}
>
	<ComponentCard
		description="A multiline text input"
		code={`<TextArea label="Message" placeholder="Write something..." bind:value={message} />`}
	>
		<div class="w-full max-w-md">
			<TextArea label="Message" placeholder="Write something..." bind:value={message} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="A multiline text input">
			<div class="w-full max-w-md">
				<TextArea label="Message" placeholder="Write something..." bind:value={message} />
			</div>
		</ComponentCard>

		<ComponentCard description="Control the height with rows and cap input with maxLength">
			<div class="w-full max-w-md">
				<TextArea
					label="Bio"
					placeholder="Tell us about yourself"
					rows={6}
					maxLength={200}
					helper="Up to 200 characters"
				/>
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'textarea' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						feedback: {
							type: 'textarea',
							label: 'Feedback',
							placeholder: 'Your feedback',
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
