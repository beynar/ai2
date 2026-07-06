<script lang="ts">
	import { Streamdown } from 'svelte-streamdown';
	import Code from '../Code/Code.svelte';
	import Mermaid from '../Mermaid/Mermaid.svelte';
	import type { MarkdownProps } from './markdown.props.js';
	import {
		buildStreamdownTheme,
		markdownCodeSizes,
		markdownMermaidSizes,
		useMarkdownTheme
	} from './markdown.theme.js';

	// `MarkdownProps` is `WithAttachments`, so attachments also arrive in `...rest`.
	// Spreading `rest` onto `<Streamdown>` forwards both extra Streamdown props and
	// those attachments through in one go, which is acceptable here.
	let { content, size = 'normal', class: className, theme, ...rest }: MarkdownProps = $props();

	const classes = $derived(useMarkdownTheme(theme));
	const streamdownTheme = $derived(buildStreamdownTheme(size));

	// The `token` carried by the code/mermaid override snippets is a marked
	// `Tokens.Code`; we only need its raw source and language string here.
	type CodePayload = { token: { text: string; lang?: string } };
</script>

<div class={classes.root({ size, className })}>
	<Streamdown {content} theme={streamdownTheme} {...rest}>
		<!-- Streamdown routes ```mermaid fences through the `code` snippet too (its
		     mermaid branch consults snippets.code), so the mermaid case must be
		     handled here rather than relying solely on a `mermaid` snippet. -->
		{#snippet code(payload: CodePayload)}
			{#if payload.token.lang === 'mermaid'}
				<Mermaid
					chart={payload.token.text}
					errorForgiving
					size={markdownMermaidSizes[size]}
					class={markdownCodeSizes[size].split(' ')[0]}
				/>
			{:else}
				<Code
					code={payload.token.text}
					language={payload.token.lang || 'text'}
					class={markdownCodeSizes[size]}
				/>
			{/if}
		{/snippet}
	</Streamdown>
</div>
