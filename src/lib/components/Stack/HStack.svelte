<script lang="ts">
	import StackRoot from './StackRoot.svelte';
	import type { HStackProps } from './hStack.props.js';

	let { ref = $bindable(null), hAlign, vAlign, justify, align, ...props }: HStackProps = $props();

	const mainAlign = $derived(hAlign ?? justify ?? 'start');
	const crossAlign = $derived(vAlign ?? align ?? 'stretch');
</script>

<StackRoot bind:ref direction="horizontal" {mainAlign} {crossAlign} {...props} />
