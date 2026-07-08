<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		title = 'Inbox',
		detail = '24 unread',
		class: className = ''
	}: {
		children: Snippet;
		title?: string;
		detail?: string;
		class?: string;
	} = $props();
</script>

<div
	class="border-background-muted bg-background raised relative flex aspect-square size-44 items-center justify-center overflow-visible rounded-2xl border p-5 shadow-sm {className}"
>
	<div
		class="border-background-muted bg-background-lighter/60 flex h-full w-full flex-col justify-between rounded-xl border p-4"
	>
		<div class="space-y-2">
			<div class="bg-foreground/20 h-2.5 w-14 rounded-full"></div>
			<div class="bg-foreground/10 h-2 w-24 rounded-full"></div>
		</div>
		<div>
			<p class="text-foreground text-sm font-semibold">{title}</p>
			<p class="text-foreground/60 mt-0.5 text-xs">{detail}</p>
		</div>
	</div>

	{@render children()}
</div>
