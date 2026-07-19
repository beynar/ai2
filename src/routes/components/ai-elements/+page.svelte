<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import ComponentSegmentedControl from '../../ComponentSegmentedControl.svelte';
	import DocPage from '../../DocPage.svelte';
	import AIElementsDemo from './AIElementsDemo.svelte';
	import AIMcpAppDemo from '../ai-mcp-app/AIMcpAppDemo.svelte';

	type Surface = 'chat' | 'mcp';
	let surface = $state<Surface>('chat');
</script>

<DocPage
	title="AI Elements"
	subtitle="Composable conversation, transcript, composer, tool, reasoning, question, and MCP App surfaces for Svelte."
	features={[
		'Transport-free scoped conversation state',
		'Virtualized transcripts and streamed output',
		'Rich composer tokens, files, steering, and queueing',
		'Grouped tools and interactive user questions',
		'Model and context controls',
		'Secure official MCP Apps bridge'
	]}
>
	<ComponentSegmentedControl
		label="Surface"
		options={[
			{ value: 'chat', label: 'Chat' },
			{ value: 'mcp', label: 'MCP app' }
		] satisfies readonly { value: Surface; label: string }[]}
		bind:value={surface}
	/>

	{#if surface === 'chat'}
		<ComponentCard
			description="The opinionated surface composes the same primitives that remain available independently. Submit a message, queue another while streaming, select a suggestion, or open the question flow."
			class="!min-h-0 p-3 sm:p-6"
			code={`<script lang="ts">
  import { AIChat } from 'svelai/ai-chat';
${'</' + 'script>'}

<AIChat
  bind:messages
  {models}
  {suggestions}
  {contextUsage}
  onSubmit={sendMessage}
/>`}
		>
			<AIElementsDemo />
		</ComponentCard>
	{:else}
		<ComponentCard
			title="Live MCP App"
			description="A connected in-memory MCP client/server pair serves this resource to the same production host bridge used by AIThread."
			class="!min-h-[300px] p-4"
			code={`<AIThread {messages} mcpHost={hostConfig} />`}
		>
			<div class="w-full max-w-3xl"><AIMcpAppDemo /></div>
		</ComponentCard>
	{/if}

	{#snippet examples()}
		<ComponentCard
			title="Manual composition"
			description="Use the provider, transcript, and composer independently when thread virtualization or regional layout needs direct control."
			class="!min-h-fit"
			code={`<script lang="ts">
  import { AIConversation } from 'svelai/ai-conversation';
  import { AIThread } from 'svelai/ai-thread';
  import { AIComposer } from 'svelai/ai-composer';
${'</' + 'script>'}

<AIConversation bind:messages onSubmit={sendMessage}>
  <AIThread showToc />
  <AIComposer commands={commands} queueWhileBusy />
</AIConversation>`}
		>
			<div class="max-w-xl text-sm text-foreground/70">
				AIConversation owns state, AIThread owns transcript behavior, and AIComposer owns input.
				AIChat is the assembled product surface, not a second implementation.
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
