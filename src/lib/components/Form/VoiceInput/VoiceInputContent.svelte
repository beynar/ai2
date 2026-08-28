<script lang="ts">
	import type { Sizes } from '$lib/types/theme.js';
	import type { VoiceInputVariant } from './voiceInput.props.js';
	import type { VoiceInputState } from './voiceInput.state.svelte.js';
	import { clampVoiceInputTime, formatVoiceInputDuration } from './voiceInput.time.js';
	import type { VoiceInputThemeProps, useVoiceInputTheme } from './voiceInput.theme.js';

	type VoiceInputClasses = ReturnType<typeof useVoiceInputTheme>;

	let {
		id,
		size,
		variant,
		expanded,
		hasPlayback,
		disabled,
		duration,
		seekLabel,
		recorder,
		classes,
		theme,
		onFocusChange
	}: {
		id: string;
		size: Sizes;
		variant: VoiceInputVariant;
		expanded: boolean;
		hasPlayback: boolean;
		disabled: boolean;
		duration: number;
		seekLabel: string;
		recorder: VoiceInputState;
		classes: VoiceInputClasses;
		theme?: VoiceInputThemeProps;
		onFocusChange: (focused: boolean) => void;
	} = $props();

	const playbackMax = $derived(Math.max(0, recorder.playbackDuration || duration));
	const playbackPosition = $derived(clampVoiceInputTime(recorder.playbackCurrentTime, playbackMax));
	const playbackPositionText = $derived(
		`${formatVoiceInputDuration(playbackPosition)} / ${formatVoiceInputDuration(playbackMax)}`
	);
	const timerText = $derived(
		hasPlayback ? playbackPositionText : formatVoiceInputDuration(duration)
	);

	function handlePlaybackSeek(event: Event) {
		const input = event.currentTarget;
		if (!(input instanceof HTMLInputElement)) return;
		recorder.seekPlayback(Number(input.value));
	}
</script>

{#if variant !== 'compact' || recorder.errorMessage}
	<div
		class={classes.content({
			size,
			variant,
			expanded,
			class: theme?.content?.base
		})}
	>
		{#if variant !== 'compact'}
			<div
				data-slot="voice-input-waveform"
				class={classes.waveformContainer({
					size,
					interactive: hasPlayback,
					hidden: !!recorder.errorMessage,
					class: theme?.waveformContainer?.base
				})}
			>
				<canvas
					aria-hidden="true"
					class={classes.waveform({
						size,
						recording: recorder.isRecording,
						hidden: !!recorder.errorMessage,
						class: theme?.waveform?.base
					})}
					{@attach recorder.waveform}
				></canvas>
				{#if hasPlayback}
					<input
						id={`${id}-seek`}
						data-slot="voice-input-waveform-input"
						class={classes.waveformInput({ class: theme?.waveformInput?.base })}
						type="range"
						aria-label={seekLabel}
						aria-valuetext={playbackPositionText}
						min={0}
						max={playbackMax}
						step={0.1}
						value={playbackPosition}
						disabled={disabled || playbackMax <= 0}
						oninput={handlePlaybackSeek}
						onchange={handlePlaybackSeek}
						onfocus={() => onFocusChange(true)}
						onblur={() => onFocusChange(false)}
					/>
				{/if}
			</div>
		{/if}
		{#if recorder.errorMessage}
			<span role="alert" class={classes.error({ size, class: theme?.error?.base })}>
				{recorder.errorMessage}
			</span>
		{/if}
		{#if variant !== 'compact'}
			<span
				aria-hidden="true"
				class={classes.timer({ size, playback: hasPlayback, class: theme?.timer?.base })}
			>
				{timerText}
			</span>
		{/if}
	</div>
{/if}
