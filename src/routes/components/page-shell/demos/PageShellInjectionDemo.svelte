<script lang="ts">
	import { PageShell } from '$lib/components/PageShell/index.js';
	import PageShellInjectedChildDemo from './PageShellInjectedChildDemo.svelte';
</script>

<div class="h-[420px] w-full overflow-auto rounded-lg border border-background-muted">
	<PageShell title="Fallback page" subtitle="This text is replaced by the child route">
		{#snippet children()}
			<PageShellInjectedChildDemo />
		{/snippet}
	</PageShell>
</div>
