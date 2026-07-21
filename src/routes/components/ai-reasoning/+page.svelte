<script lang="ts">
	import Reasoning from '$lib/components/AIReasoning/Reasoning.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { createComponentControls } from '../../componentControls.svelte.js';
	import DocPage from '../../DocPage.svelte';

	const content =
		'I should compare the requested behavior with the existing state contract, then preserve the smallest compatible public surface.';
	const thinkingMessages = ['Planning', 'Checking constraints', 'Preparing response'];
	const reasoningLabels = {
		thinking: 'Working',
		thoughtForFewSeconds: 'Completed quickly',
		duration: (seconds: number) => 'Completed in ' + seconds + 's'
	};
	const mainCode = `<script lang="ts">
  import { Reasoning } from 'svelai/ai-reasoning';

  let isStreaming = $state(true);
  const thinkingMessages = ['Planning', 'Checking constraints', 'Preparing response'];
${'</' + 'script>'}

<Reasoning {content} {isStreaming} {thinkingMessages} />`;
	const exampleOptions = [
		{ value: 'duration', label: 'Duration' },
		{ value: 'opt-out', label: 'Auto-open off' },
		{ value: 'controlled', label: 'Controlled' },
		{ value: 'custom', label: 'Custom slots' },
		{ value: 'labels', label: 'Labels' }
	] as const;
	const examples = {
		duration: {
			title: 'Known duration',
			description: 'Completed traces accept an explicit duration in seconds.',
			code: `<Reasoning {content} duration={8} defaultOpen />`
		},
		'opt-out': {
			title: 'Auto-open opt-out',
			description: 'defaultOpen=false keeps a streaming trace closed until the user opens it.',
			code: `<Reasoning {content} isStreaming defaultOpen={false} />`
		},
		controlled: {
			title: 'Controlled state',
			description: 'Bind open and observe user toggles through onOpenChange.',
			code: `<Reasoning {content} duration={8} bind:open onOpenChange={handleOpenChange} />`
		},
		custom: {
			title: 'Custom trigger and body',
			description: 'The custom trigger replaces the default row and receives the current message.',
			code: `<Reasoning isStreaming thinkingMessages={['Planning', 'Checking constraints']}>
  {#snippet trigger({ message, open })}
    <span>{message} · {open ? 'Hide' : 'Show'}</span>
  {/snippet}
  {#snippet children({ message })}
    <p>Current step: {message}</p>
  {/snippet}
</Reasoning>`
		},
		labels: {
			title: 'Custom labels',
			description:
				'Override the default streaming, unknown-duration, and duration-dependent copy together.',
			code: `<Reasoning
  {content}
  duration={8}
  defaultOpen
  labels={{
    thinking: 'Working',
    thoughtForFewSeconds: 'Completed quickly',
    duration: (seconds) => 'Completed in ' + seconds + 's'
  }}
/>`
		}
	} as const;

	const controls = createComponentControls([
		{
			name: 'mode',
			type: 'segmented',
			label: 'State',
			value: 'streaming',
			options: ['streaming', 'completed']
		}
	]);
	const exampleControls = createComponentControls([
		{
			name: 'example',
			type: 'segmented',
			label: 'Variant',
			value: 'duration',
			options: exampleOptions
		},
		{
			name: 'controlledMode',
			type: 'segmented',
			label: 'Open',
			value: 'open',
			options: ['open', 'closed'],
			visible: (value) => value.example === 'controlled'
		}
	]);
	let controlledOpen = $derived(exampleControls.value.controlledMode === 'open');
	const isStreaming = $derived(controls.value.mode === 'streaming');
	const selectedExample = $derived(examples[exampleControls.value.example]);

	function handleControlledOpenChange(nextOpen: boolean) {
		controlledOpen = nextOpen;
		exampleControls.value.controlledMode = nextOpen ? 'open' : 'closed';
	}
</script>

<DocPage
	title="AI Reasoning"
	subtitle="Streaming-aware collapsible reasoning with elapsed duration and cycling progress labels."
	component="Reasoning"
	features={[
		'Optional Markdown or custom content',
		'Seconds-based controlled or measured duration',
		'Per-stream auto-open and one-time completion close',
		'Controlled and bindable open state',
		'Cycling supplied SpinnerText labels',
		'Overridable status and duration labels',
		'Custom trigger with live state payload'
	]}
>
	<ComponentCard
		{controls}
		description="Switch to completed to measure the stream and exercise the 1000ms delayed close."
		class="!min-h-[280px]"
		code={mainCode}
	>
		<Reasoning {content} {isStreaming} {thinkingMessages} class="w-full max-w-2xl" />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			controls={exampleControls}
			title={selectedExample.title}
			description={selectedExample.description}
			class="!min-h-[260px]"
			code={selectedExample.code}
		>
			{#if exampleControls.value.example === 'duration'}
				<Reasoning {content} duration={8} defaultOpen class="w-full max-w-2xl" />
			{:else if exampleControls.value.example === 'opt-out'}
				<Reasoning {content} isStreaming defaultOpen={false} class="w-full max-w-2xl" />
			{:else if exampleControls.value.example === 'controlled'}
				<Reasoning
					{content}
					duration={8}
					bind:open={controlledOpen}
					onOpenChange={handleControlledOpenChange}
					class="w-full max-w-2xl"
				/>
			{:else if exampleControls.value.example === 'custom'}
				<Reasoning
					isStreaming
					thinkingMessages={['Planning', 'Checking constraints']}
					class="w-full max-w-2xl"
				>
					{#snippet trigger({ message, open })}
						<span class="flex w-full items-center justify-between gap-3 font-medium">
							<span>{message}</span>
							<span class="text-neutral/50 text-xs">{open ? 'Hide' : 'Show'}</span>
						</span>
					{/snippet}
					{#snippet children({ message })}
						<p class="text-sm leading-6">Current step: {message}</p>
					{/snippet}
				</Reasoning>
			{:else}
				<Reasoning
					{content}
					duration={8}
					defaultOpen
					labels={reasoningLabels}
					class="w-full max-w-2xl"
				/>
			{/if}
		</ComponentCard>
	{/snippet}
</DocPage>
