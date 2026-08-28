export type MediaVolumeSnapshot = {
	volume: number;
	muted: boolean;
};

export type MediaVolumeToggleOptions = MediaVolumeSnapshot & {
	volumeStep: number;
};

const lastAudibleVolumes = new WeakMap<HTMLMediaElement, number>();

export function clampMediaVolume(volume: number) {
	return Math.min(1, Math.max(0, volume));
}

export function isMediaEffectivelyMuted({ volume, muted }: MediaVolumeSnapshot) {
	return muted || volume === 0;
}

function rememberAudibleVolume(mediaElement: HTMLMediaElement) {
	if (mediaElement.volume > 0)
		lastAudibleVolumes.set(mediaElement, clampMediaVolume(mediaElement.volume));
}

function getRestoredVolume(mediaElement: HTMLMediaElement, volumeStep: number) {
	return clampMediaVolume((lastAudibleVolumes.get(mediaElement) ?? volumeStep) || 1);
}

function syncMediaVolume(mediaElement: HTMLMediaElement, { volume, muted }: MediaVolumeSnapshot) {
	const nextVolume = clampMediaVolume(volume);
	if (mediaElement.volume !== nextVolume) mediaElement.volume = nextVolume;
	if (mediaElement.muted !== muted) mediaElement.muted = muted;
	rememberAudibleVolume(mediaElement);
}

function setMediaVolume(mediaElement: HTMLMediaElement, volume: number) {
	mediaElement.volume = clampMediaVolume(volume);
	rememberAudibleVolume(mediaElement);
	if (mediaElement.volume > 0 && mediaElement.muted) mediaElement.muted = false;
}

function setMediaMuted(mediaElement: HTMLMediaElement, muted: boolean, volumeStep: number) {
	rememberAudibleVolume(mediaElement);
	if (!muted && mediaElement.volume === 0)
		mediaElement.volume = getRestoredVolume(mediaElement, volumeStep);
	mediaElement.muted = muted;
}

function toggleMediaMuted(mediaElement: HTMLMediaElement, options: MediaVolumeToggleOptions) {
	setMediaMuted(mediaElement, !isMediaEffectivelyMuted(options), options.volumeStep);
}

export const mediaVolume = {
	clamp: clampMediaVolume,
	isEffectivelyMuted: isMediaEffectivelyMuted,
	rememberAudibleVolume,
	sync: syncMediaVolume,
	setVolume: setMediaVolume,
	setMuted: setMediaMuted,
	toggleMuted: toggleMediaMuted
} as const;
