<script lang="ts">
	import type { Slot } from '$lib/components/Slot/slot.js';
	import type { Sizes } from '$lib/types/theme.js';
	import SlotComponent from '../Slot/Slot.svelte';
	import type { VideoPlayerOverlayPayload } from './videoPlayer.props.js';
	import type { VideoPlayerState } from './videoPlayer.state.svelte.js';
	import type { useVideoPlayerTheme } from './videoPlayer.theme.js';

	type VideoPlayerClasses = ReturnType<typeof useVideoPlayerTheme>;

	let {
		state,
		classes,
		size,
		hasSource,
		overlay,
		loading,
		errorContent,
		empty
	}: {
		state: VideoPlayerState;
		classes: VideoPlayerClasses;
		size: Sizes;
		hasSource: boolean;
		overlay?: Slot<VideoPlayerOverlayPayload>;
		loading?: Slot<VideoPlayerOverlayPayload>;
		errorContent?: Slot<VideoPlayerOverlayPayload>;
		empty?: Slot<VideoPlayerOverlayPayload>;
	} = $props();

	const overlayPayload: VideoPlayerOverlayPayload = $derived({
		state: state.state,
		error: state.error
	});
</script>

{#if overlay}
	<SlotComponent
		render={overlay}
		payload={overlayPayload}
		class={classes.overlay({ visible: true })}
	/>
{/if}

{#if !hasSource}
	<SlotComponent render={empty} payload={overlayPayload} class={classes.overlay({ visible: true })}>
		<div class={classes.panel({ size, tone: 'empty' })}>No video source.</div>
	</SlotComponent>
{:else if state.error}
	<SlotComponent
		render={errorContent}
		payload={overlayPayload}
		class={classes.overlay({ visible: true })}
	>
		<div class={classes.panel({ size, tone: 'error' })}>{state.errorMessage}</div>
	</SlotComponent>
{:else if state.isLoading}
	<SlotComponent
		render={loading}
		payload={overlayPayload}
		class={classes.overlay({ visible: true })}
	>
		<div class={classes.panel({ size, tone: 'loading' })}>Loading video...</div>
	</SlotComponent>
{/if}
