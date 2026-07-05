<script lang="ts">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { SidebarIcon } from './sidebar.props.js';

	let { icon, class: className }: { icon?: SidebarIcon; class?: string } = $props();
</script>

{#if typeof icon === 'string'}
	<span class={className}>{icon}</span>
{:else if icon}
	<Slot render={icon} class={className} />
{/if}
