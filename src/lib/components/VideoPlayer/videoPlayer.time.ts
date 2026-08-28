export function formatVideoPlayerTime(
	seconds: number,
	variant: 'elapsed' | 'remaining' | 'duration' = 'elapsed'
) {
	const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
	const roundedSeconds = Math.floor(safeSeconds);
	const hours = Math.floor(roundedSeconds / 3600);
	const minutes = Math.floor((roundedSeconds % 3600) / 60);
	const remainingSeconds = roundedSeconds % 60;
	const sign = variant === 'remaining' && roundedSeconds > 0 ? '-' : '';

	if (hours > 0) {
		return `${sign}${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
	return `${sign}${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
