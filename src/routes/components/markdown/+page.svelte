<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { onDestroy } from 'svelte';

	// Rich document: headings, emphasis, links, lists, task list, blockquote,
	// a GitHub alert, a table and inline code. No code fences here, so a plain
	// template literal is fine.
	const doc = `# Release notes

A quick tour of **bold**, _italic_, and a [link](https://example.com).

## What's new

- Streaming-friendly rendering
- Themed with svelai tokens
- Adapts to light and dark

### Checklist

- [x] Parse incomplete markdown safely
- [x] Render code with the Code component
- [ ] Ship it

> Blockquotes keep their styling and spacing.

> [!NOTE]
> GitHub alerts map to svelai info/success/primary/warning/danger callouts.

| Feature   | Status  |
| --------- | ------- |
| Headings  | Done    |
| Tables    | Done    |
| Alerts    | Done    |

Use \`Markdown\` inline like any other component.`;

	// Code & Mermaid: array-of-lines join avoids all fence-escaping pain.
	const codeAndMermaid = [
		'## Code and diagrams',
		'',
		'A TypeScript fence renders through svelai `Code` (with a copy button):',
		'',
		'```ts',
		'function greet(name: string): string {',
		'\treturn `Hello, ${name}!`;',
		'}',
		'',
		'console.log(greet("world"));',
		'```',
		'',
		'A `mermaid` fence renders through svelai `Mermaid` (pan, zoom, theme tokens):',
		'',
		'```mermaid',
		'graph TD',
		'    A[Prompt] --> B[LLM]',
		'    B --> C{Tool call?}',
		'    C -->|Yes| D[Run tool]',
		'    D --> B',
		'    C -->|No| E[Answer]',
		'```'
	].join('\n');

	// Sizes: the same markdown rendered at the selected scale (code fence included
	// so the Code block scaling is visible too).
	const sizeSample = [
		'# Heading',
		'',
		'Body copy with **bold**, _italic_, and `inline code`.',
		'',
		'- First item',
		'- Second item',
		'',
		'```ts',
		"const scale: MarkdownSize = 'normal';",
		'```'
	].join('\n');

	let mdSize = $state<'small' | 'normal' | 'large'>('normal');

	// Streaming: heading + list + code fence + mermaid fence, so incomplete
	// markdown handling is visible as chunks arrive.
	const streamTarget = [
		'# Streaming answer',
		'',
		'Rendering markdown as it arrives:',
		'',
		'- Handles partial syntax',
		'- No flashing errors',
		'',
		'```ts',
		'const total = items.reduce((a, b) => a + b, 0);',
		'```',
		'',
		'```mermaid',
		'graph LR',
		'    A[Chunk] --> B[Render]',
		'    B --> C[Repeat]',
		'```'
	].join('\n');

	let streamed = $state(streamTarget);
	let streaming = $state(false);
	let streamTimer: ReturnType<typeof setInterval> | undefined;
	const startStream = () => {
		clearInterval(streamTimer);
		streaming = true;
		streamed = '';
		let i = 0;
		streamTimer = setInterval(() => {
			i += 4;
			streamed = streamTarget.slice(0, i);
			if (i >= streamTarget.length) {
				clearInterval(streamTimer);
				streaming = false;
			}
		}, 30);
	};
	onDestroy(() => clearInterval(streamTimer));
</script>

{#snippet segmented(current: string, options: string[], onSelect: (value: string) => void)}
	<div class="flex gap-1">
		{#each options as option (option)}
			<Button
				size="small"
				variant={current === option ? 'solid' : 'ghost'}
				color="foreground"
				onClick={() => onSelect(option)}
			>
				{option}
			</Button>
		{/each}
	</div>
{/snippet}

<DocPage
	title="Markdown"
	subtitle="Render Markdown as themed HTML, built for streaming LLM output. Wraps the svelte-streamdown renderer, restyled with svelai design tokens, with code fences going through svelai's Code component and mermaid fences through svelai's Mermaid. Incomplete/streaming markdown is handled gracefully, and three size scales tune it for chat, prose, or long-form documents."
	component="Markdown"
	features={[
		'Wraps svelte-streamdown, themed with svelai tokens',
		'Code fences render via svelai Code (copy button)',
		'Mermaid fences render via svelai Mermaid (pan/zoom)',
		'Streaming-friendly: partial markdown never crashes',
		'small / normal / large type and spacing scales',
		'Adapts to light and dark automatically'
	]}
>
	<ComponentCard
		description="Headings, emphasis, links, lists, task lists, blockquotes, a GitHub alert, a table and inline code — all styled from svelai tokens."
		class="!min-h-fit !items-stretch !justify-start"
		code={`<Markdown content={doc} />`}
	>
		<div class="w-full max-w-3xl">
			<Markdown content={doc} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Headings, emphasis, links, lists, task lists, blockquotes, a GitHub alert, a table and inline code — all styled from svelai tokens."
			class="!min-h-fit !items-stretch !justify-start"
		>
			<div class="w-full max-w-3xl">
				<Markdown content={doc} />
			</div>
		</ComponentCard>

		<ComponentCard
			description="Fenced code renders through svelai's Code component (syntax highlighting + copy button), and a mermaid fence renders through svelai's Mermaid (pan, zoom, and design-token theming)."
			class="!min-h-fit !items-stretch !justify-start"
		>
			<div class="w-full max-w-3xl">
				<Markdown content={codeAndMermaid} />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Switch the size prop live. small for chat messages, normal for general use, large for long-form documents — type, spacing and embedded code blocks all rescale."
			class="!min-h-fit !items-stretch !justify-start"
		>
			<div class="grid w-full max-w-3xl gap-4">
				{@render segmented(mdSize, ['small', 'normal', 'large'], (v) => (mdSize = v as typeof mdSize))}
				<Markdown content={sizeSample} size={mdSize} />
			</div>
		</ComponentCard>

		<ComponentCard
			description="Replay a token-by-token stream. The markdown re-renders as chunks arrive — partial headings, an unterminated code fence and an incomplete mermaid diagram are all handled gracefully instead of flashing errors."
			class="!min-h-fit !items-stretch !justify-start"
		>
			<div class="grid w-full max-w-3xl gap-4">
				<div>
					<Button label="Stream markdown" onClick={startStream} loading={streaming} size="small">
						Stream
					</Button>
				</div>
				<Markdown content={streamed} size="small" />
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
