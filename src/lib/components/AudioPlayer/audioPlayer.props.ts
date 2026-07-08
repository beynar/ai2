import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Sizes } from '$lib/types/theme.js';
import type { AudioPlayerThemeProps } from './audioPlayer.theme.js';

export type AudioPlayerPreload = 'none' | 'metadata' | 'auto';
export type AudioPlayerCrossOrigin = 'anonymous' | 'use-credentials' | '';
export type AudioPlayerStateMode = 'idle' | 'loading' | 'ready' | 'error';
export type AudioPlayerWaveformVariant = 'centered' | 'histogram';
export type AudioPlayerControl =
	'play' | 'seekBackward' | 'seekForward' | 'time' | 'volume' | 'loop' | 'download';
export type AudioPlayerTimeVariant = 'elapsed' | 'remaining' | 'duration';

export const AUDIO_PLAYER_DEFAULT_CONTROLS: AudioPlayerControl[] = [
	'play',
	'seekBackward',
	'seekForward',
	'time',
	'volume',
	'loop',
	'download'
];

export type AudioPlayerSource = {
	src: string;
	type?: string;
};

export type AudioPlayerSnapshot = {
	currentTime: number;
	duration: number;
	buffered: number;
	volume: number;
	muted: boolean;
	paused: boolean;
	ended: boolean;
	loop: boolean;
};

export type AudioPlayerError = MediaError | Error;

export type AudioPlayerProps = WithAttachments<{
	/** Single audio source URL. Use sources for multiple encodings. */
	src?: string;
	/** MIME type for src when a single source is provided. */
	srcType?: string;
	/** Multiple source candidates rendered as source children. */
	sources?: AudioPlayerSource[];
	/** Track title displayed in the player chrome. */
	title?: string;
	/** Secondary artist/author label. */
	artist?: string;
	/** Optional artwork URL displayed beside the controls. */
	artwork?: string;
	/** Explicit accessible label; falls back to title. */
	label?: string;
	/** Native audio preload behavior. */
	preload?: AudioPlayerPreload;
	/** Native crossorigin value for remote media. */
	crossOrigin?: AudioPlayerCrossOrigin;
	/** Starts playback automatically when allowed by the browser. */
	autoplay?: boolean;
	/** Custom controls to render. */
	controls?: AudioPlayerControl[];
	/** Waveform samples from 0 to 1. When omitted, a deterministic fallback is generated. */
	waveform?: number[];
	/** Visual waveform shape. */
	waveformVariant?: AudioPlayerWaveformVariant;
	/** Number of waveform bars rendered when samples are generated or resampled. */
	waveformBars?: number;
	/** Time display variant. */
	timeVariant?: AudioPlayerTimeVariant;
	/** Download href. true uses src, string uses the provided URL, false hides the action. */
	download?: boolean | string;
	/** Disables custom interactions and keyboard shortcuts. */
	disabled?: boolean;
	/** Visual size token for chrome and waveform. */
	size?: Sizes;
	/** Root classes. */
	class?: string;
	/** Bindable audio element reference. */
	ref?: HTMLAudioElement | null;
	/** Bindable root element reference. */
	rootRef?: HTMLDivElement | null;
	/** Bindable current playback time in seconds. */
	currentTime?: number;
	/** Bindable media duration in seconds. */
	duration?: number;
	/** Bindable buffered end time in seconds. */
	buffered?: number;
	/** Bindable volume from 0 to 1. */
	volume?: number;
	/** Bindable muted state. */
	muted?: boolean;
	/** Bindable paused state. */
	paused?: boolean;
	/** Bindable ended state. */
	ended?: boolean;
	/** Bindable loop state. */
	loop?: boolean;
	/** Bindable media or interaction error. */
	error?: AudioPlayerError | null;
	/** Enables player-level keyboard shortcuts. */
	keyboardShortcuts?: boolean;
	/** Seconds moved by seek forward/backward shortcuts and controls. */
	seekStep?: number;
	/** Volume delta used by keyboard shortcuts and controls. */
	volumeStep?: number;
	/** Custom content rendered inside the audio element, after generated sources. */
	children?: Slot;
	/** Called when the media starts playback. */
	onPlay?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when the media pauses. */
	onPause?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when playback ends. */
	onEnded?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when currentTime changes. */
	onTimeUpdate?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when duration changes. */
	onDurationChange?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when volume or muted state changes. */
	onVolumeChange?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when loop changes through the component API. */
	onLoopChange?: (snapshot: AudioPlayerSnapshot) => void;
	/** Called when native media or custom interaction errors occur. */
	onError?: (error: AudioPlayerError, snapshot: AudioPlayerSnapshot) => void;
	/** Per-instance theme overrides. */
	theme?: AudioPlayerThemeProps;
}>;
