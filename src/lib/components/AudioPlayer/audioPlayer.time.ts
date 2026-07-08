export function formatAudioPlayerTime(
	currentTime: number,
	duration: number,
	variant: 'elapsed' | 'remaining' | 'duration' = 'elapsed'
) {
	const safeDuration = Number.isFinite(duration) ? Math.max(0, duration) : 0;
	const safeCurrentTime = Number.isFinite(currentTime)
		? Math.min(safeDuration || currentTime, Math.max(0, currentTime))
		: 0;

	if (variant === 'duration') return formatSeconds(safeDuration);
	if (variant === 'remaining')
		return `-${formatSeconds(Math.max(0, safeDuration - safeCurrentTime))}`;
	return `${formatSeconds(safeCurrentTime)} / ${formatSeconds(safeDuration)}`;
}

function formatSeconds(value: number) {
	const totalSeconds = Math.floor(Math.max(0, value));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
