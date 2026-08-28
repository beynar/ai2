<script lang="ts">
	// Test-only harness: runs a callback during component initialisation so that
	// Svelte's getContext/setContext are available to the code under test.
	// Named `*.test.svelte` so the package `files` exclusion keeps it out of the
	// published tarball (it is not collected by the `*.svelte.test.ts` vitest glob).
	let { run }: { run: () => void } = $props();
	run();
</script>
