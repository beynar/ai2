<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		children,
		class: className = 'h-12'
	}: {
		label: string;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class="border-neutral-muted bg-surface relative w-full overflow-hidden rounded-lg border {className}"
>
	{@render children()}
	<span class="text-neutral/70 flex h-full items-center px-4 text-sm">{label}</span>
</div>
