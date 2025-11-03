<script lang="ts">
	import { HighlighterManager } from './highlighter.svelte.js';
	import { type ThemedToken } from 'shiki';
	import type { CodeProps } from './code.props.js';
	import { useCodeTheme } from './code.theme.js';
	import Slot from '../Slot/Slot.svelte';
	import bash from 'shiki/langs/bash.mjs';
	import solarizedDark from 'shiki/dist/themes/solarized-dark.mjs';

	const {
		code = "console.log('Hello, world!');",
		footer,
		footerProps,
		header,
		headerProps,
		language,
		shikiTheme = solarizedDark,
		theme,
		class: className,
		...attachments
	}: CodeProps = $props();

	const highlighter = HighlighterManager.create();

	const classes = $derived(useCodeTheme(theme));

	const tokens = $derived(highlighter.highlightCode(code, language, shikiTheme));
</script>

<div class={classes.code({ className })} {...attachments}>
	<Slot class={classes.header()} props={headerProps} render={header}>
		<span>{highlighter.getLanguageName(language!)}</span>
	</Slot>
	<div class={classes.container()}>
		<pre class={classes.pre()}><code>{@render Tokens(tokens)}</code></pre>
	</div>
</div>

{#snippet Tokens(lines: ThemedToken[][])}
	{#each lines as tokens}
		<span class={classes.line()}>
			{#each tokens as token}
				<span style:color={token.color} style:background-color={token.bgColor}>
					{token.content}
				</span>
			{/each}
		</span>
	{/each}
{/snippet}
