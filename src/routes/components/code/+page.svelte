<script lang="ts">
	import javascript from 'shiki/langs/javascript.mjs';
	import githubDark from 'shiki/themes/github-dark.mjs';
	import githubLight from 'shiki/themes/github-light.mjs';
	import Code from '$lib/components/Code/Code.svelte';
	import { useTheme } from '$lib/components/Theme/theme.state.svelte.js';

	const theme = useTheme();
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<Code code="console.log('Hello, world!');" />
	</div>
</div>
