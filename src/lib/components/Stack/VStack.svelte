<script lang="ts">
	import StackRoot from './StackRoot.svelte';
	import type { VStackProps } from './vStack.props.js';

	let { ref = $bindable(null), hAlign, vAlign, justify, align, ...props }: VStackProps = $props();

	const mainAlign = $derived(vAlign ?? justify ?? 'start');
	const crossAlign = $derived(hAlign ?? align ?? 'stretch');
</script>

<StackRoot bind:ref direction="vertical" {mainAlign} {crossAlign} {...props} />
