<script lang="ts">
	import type { Snippet } from 'svelte';
	import Heading from '$lib/components/Heading/Heading.svelte';
	import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
	import Code from '$lib/components/Code/Code.svelte';

	let {
		children,
		title,
		class: className = '',
		description,
		code,
		language = 'svelte',
		...attachments
	}: {
		children: Snippet;
		description?: string;
		class?: string;
		title?: string;
		/** Source snippet shown under the preview in a "View code" reveal. */
		code?: string;
		/** Highlighting language for `code`. Defaults to svelte. */
		language?: string;
		[key: string]: any;
	} = $props();

	let showCode = $state(false);
</script>

<div {...attachments} class="my-10 grid gap-4">
	{#if title || description}
		<div>
			{#if title}
				<Heading>{title}</Heading>
			{/if}
			{#if description}
				<p class="text-foreground-muted mt-1 text-sm">{description}</p>
			{/if}
		</div>
	{/if}
	<div class="border-background-muted bg-background raised overflow-hidden rounded-xl border">
		<div
			class="dotted-grid relative flex min-h-[400px] w-full items-center justify-center gap-4 p-8 {className}"
		>
			<div class="z-10 mx-auto flex h-full w-full items-center justify-center gap-4">
				{@render children()}
			</div>
		</div>
		{#if code}
			<div class="border-background-muted border-t p-2">
				<Collapsible variant="peek" peekHeight={84} bind:open={showCode} trigger={codeTrigger}>
					<Code
						{code}
						showHeader={false}
						{language}
						showLineNumbers
						class="rounded-lg border-none"
					/>
				</Collapsible>
			</div>
		{/if}
	</div>
</div>

{#snippet codeTrigger()}
	<span class="text-foreground/80 text-sm font-medium">{showCode ? 'Hide code' : 'View code'}</span>
{/snippet}
