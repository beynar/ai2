<script lang="ts">
	import AIComposer from '$lib/components/AIComposer/AIComposer.svelte';
	import AIConversation from '$lib/components/AIConversation/AIConversation.svelte';
	import type {
		AIComposerQueuedMessage,
		AIComposerSubmitDetail
	} from '$lib/components/AIComposer/aiComposer.props.js';
	import Switch from '$lib/components/Form/Switch/Switch.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { createComponentControls } from '../../componentControls.svelte.js';
	import DocPage from '../../DocPage.svelte';

	const commands = {
		items: [
			{
				id: 'summarize',
				label: 'Summarize',
				description: 'Summarize selected context.',
				prompt: 'Summarize the selected context and retain decisions and risks.'
			},
			{
				id: 'rewrite',
				label: 'Rewrite',
				description: 'Rewrite with a clearer structure.',
				prompt: 'Rewrite the request with a clearer structure.'
			}
		]
	};
	const mentions = {
		items: [{ id: 'team', label: 'Platform team', description: 'Mention the platform team.' }]
	};
	const references = {
		items: [{ id: 'brief', label: 'brief.md', description: 'Launch brief', path: 'docs/brief.md' }]
	};
	const skills = {
		items: [{ id: 'review', label: 'Review', description: 'Review for omissions.' }]
	};
	let submitted = $state<AIComposerSubmitDetail>();
	let isStreaming = $state(true);
	let queuedMessages = $state<AIComposerQueuedMessage[]>([]);
	const controls = createComponentControls([
		{
			name: 'mode',
			type: 'segmented',
			label: 'State',
			value: 'idle',
			options: ['idle', 'streaming', 'disabled']
		},
		{
			name: 'toolbar',
			type: 'segmented',
			label: 'Toolbar',
			value: 'hover',
			options: ['hover', 'fixed', 'both', 'none']
		}
	]);
</script>

<DocPage
	title="AI Composer"
	subtitle="A Markdown composer with typed tokens, validated files, steering, sortable queueing, and submit/stop lifecycle."
	component="AIComposer"
	features={[
		'Existing RichTextInput editor',
		'Commands, mentions, references, and skills',
		'Paste, drop, and file chooser acceptance',
		'Explicit attachment upload states',
		'Sortable queued messages',
		'Imperative insertion and focus methods'
	]}
>
	<ComponentCard
		{controls}
		description="Type /, @, or $ to insert tokens. The submit detail includes Markdown, model input, token ids, files, and attachment states."
		class="!min-h-[360px] p-4"
		code={`<script lang="ts">
  import { AIComposer } from 'svelai/ai-composer';
${'</' + 'script>'}

<AIComposer
  {commands}
  {mentions}
  {references}
	  {skills}
	  fileDropzone
	  accept={['image/*', '.pdf']}
	  toolbar="hover"
	  submitShortcut="enter"
	  onSubmit={sendMessage}
/>`}
	>
		<div class="grid w-full max-w-3xl gap-4">
			<AIComposer
				{commands}
				{mentions}
				{references}
				{skills}
				fileDropzone
				accept={['image/*', '.pdf']}
				toolbar={controls.value.toolbar}
				submitShortcut="enter"
				busy={controls.value.mode === 'streaming'}
				disabled={controls.value.mode === 'disabled'}
				onStop={() => {
					controls.value.mode = 'idle';
				}}
				onSubmit={(detail) => {
					submitted = detail;
				}}
			/>
			{#if submitted}
				<pre
					class="max-h-28 overflow-auto rounded border border-background-muted p-3 text-xs">{JSON.stringify(
						{ modelInput: submitted.modelInput, tokens: submitted.tokens },
						null,
						2
					)}</pre>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Footer composition"
			description="footerStart and actions receive the current submit state while the composer retains its attach, stop, and submit controls."
			class="!min-h-[260px] p-4"
			code={`<AIComposer fileDropzone>
  {#snippet footerStart({ files })}
    <span>{files.length} files</span>
  {/snippet}
  {#snippet actions({ isBusy })}
    <span>{isBusy ? 'Streaming' : 'Ready'}</span>
  {/snippet}
</AIComposer>`}
		>
			<AIComposer fileDropzone class="w-full max-w-3xl">
				{#snippet footerStart({ files })}
					<span class="text-foreground/60 text-xs">{files.length} files</span>
				{/snippet}
				{#snippet actions({ isBusy })}
					<span class="text-foreground/60 text-xs">{isBusy ? 'Streaming' : 'Ready'}</span>
				{/snippet}
			</AIComposer>
		</ComponentCard>

		<ComponentCard
			title="Conversation queue"
			description="When the provider is busy, queueWhileBusy stores sortable messages instead of dispatching them immediately."
			class="!min-h-[300px] p-4"
			code={`<AIConversation bind:isStreaming>
	  <AIComposer
	    bind:queuedMessages
	    queueWhileBusy
	    submitShortcut="enter"
	  />
</AIConversation>`}
		>
			<div class="grid w-full max-w-3xl gap-3">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<Switch size="small" label="Conversation streaming" bind:value={isStreaming} />
					<span class="text-foreground/60 text-xs">
						{queuedMessages.length} queued
					</span>
				</div>
				<AIConversation bind:isStreaming>
					<AIComposer bind:queuedMessages queueWhileBusy submitShortcut="enter" />
				</AIConversation>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Visible submission failures"
			description="Rejected submit callbacks stay in the composer as an actionable error without clearing the draft."
			class="!min-h-[260px] p-4"
			code={`<AIComposer
  value="Keep this draft"
  onSubmit={async () => {
    throw new Error('The model endpoint is unavailable.');
  }}
/>`}
		>
			<AIComposer
				value="Keep this draft"
				class="w-full max-w-3xl"
				onSubmit={async () => {
					throw new Error('The model endpoint is unavailable.');
				}}
			/>
		</ComponentCard>
	{/snippet}
</DocPage>
