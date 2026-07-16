export function formatVoiceInputDuration(duration: number) {
	const totalSeconds = Math.max(0, Math.floor(duration));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function clampVoiceInputTime(value: number, max: number) {
	return Math.min(Math.max(0, max), Math.max(0, value));
}

export function normalizeVoiceInputDuration(duration: number | undefined) {
	if (duration === undefined || !Number.isFinite(duration)) return null;
	return Math.max(0, duration);
}

export function formatVoiceInputDurationRequirement(duration: number) {
	return `${duration} ${duration === 1 ? 'second' : 'seconds'}`;
}
