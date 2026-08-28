<script lang="ts">
	import { useTheme } from '../Theme/theme.state.svelte.js';
	import { useDialogTheme } from './dialog.theme.js';
	import { DIALOG_Z_BASE } from './dialog.state.svelte.js';
	import { fso } from '$lib/transitions/transition.js';
	import { portal } from '$lib/attachments/portal.js';
	import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';

	const theme = useTheme();
	const classes = $derived(useDialogTheme());
	const fade = fso();

	const isVisible = $derived(theme.openDialogs.length > 0);

	// Swipe-to-dismiss on the top drawer fades the backdrop with the drag; a snap-back
	// or dismissal animates it back via the opacity transition.
	const top = $derived(theme.openDialogs.at(-1));
	const dragOpacity = $derived(
		top && (top.dragging || top.dragProgress > 0) ? 1 - top.dragProgress : undefined
	);

	useScrollLock({ isActive: () => theme.openDialogs.length > 0 });
</script>

{#if isVisible}
	<div {@attach portal()} class="fixed inset-0" style:z-index={DIALOG_Z_BASE - 1} aria-hidden="true">
		<div
			class={classes.backdrop()}
			style:opacity={dragOpacity}
			style:transition={top?.dragging ? 'none' : 'opacity 200ms ease-out'}
			transition:fade={{ opacity: 0, duration: 200 }}
		></div>
	</div>
{/if}
