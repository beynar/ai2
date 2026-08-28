const MIN_BAR_HEIGHT = 12;
const DEFAULT_BARS = 72;
const MAX_SAMPLES_PER_BAR = 512;

type GenerateWaveformOptions = {
	src: string;
	count?: number;
	crossOrigin?: '' | 'anonymous' | 'use-credentials';
};

type WindowWithWebkitAudioContext = Window &
	typeof globalThis & {
		webkitAudioContext?: typeof AudioContext;
	};

const generatedWaveformCache = new Map<string, Promise<number[]>>();

export function getAudioPlayerWaveformSamples(
	waveform: number[] | undefined,
	count = DEFAULT_BARS,
	seed = ''
) {
	const safeCount = Math.max(8, Math.floor(count));
	if (!waveform || waveform.length === 0) return createFallbackWaveform(safeCount, seed);
	return resampleWaveform(waveform, safeCount);
}

export async function generateAudioPlayerWaveformSamples({
	src,
	count = DEFAULT_BARS,
	crossOrigin
}: GenerateWaveformOptions) {
	const safeCount = Math.max(8, Math.floor(count));
	const cacheKey = `${src}:${safeCount}:${crossOrigin ?? ''}`;
	const cachedWaveform = generatedWaveformCache.get(cacheKey);
	if (cachedWaveform) return [...(await cachedWaveform)];

	const generation = decodeAudioSource(src, safeCount, crossOrigin).catch((error: unknown) => {
		generatedWaveformCache.delete(cacheKey);
		throw error;
	});
	generatedWaveformCache.set(cacheKey, generation);
	return [...(await generation)];
}

export function getAudioPlayerBarHeight(sample: number) {
	return `${Math.round(MIN_BAR_HEIGHT + clamp(sample, 0, 1) * (100 - MIN_BAR_HEIGHT))}%`;
}

export function getAudioPlayerBarFill(index: number, count: number, progressPercentage: number) {
	if (count <= 0) return '0%';
	const segmentStart = (index / count) * 100;
	const segmentEnd = ((index + 1) / count) * 100;
	const segmentProgress = (progressPercentage - segmentStart) / (segmentEnd - segmentStart);
	return `${Math.round(clamp(segmentProgress, 0, 1) * 100)}%`;
}

function resampleWaveform(waveform: number[], count: number) {
	return Array.from({ length: count }, (_, index) => {
		const start = Math.floor((index / count) * waveform.length);
		const end = Math.max(start + 1, Math.ceil(((index + 1) / count) * waveform.length));
		const slice = waveform.slice(start, end);
		return clamp(Math.max(...slice.map((sample) => Math.abs(sample))), 0, 1);
	});
}

async function decodeAudioSource(
	src: string,
	count: number,
	crossOrigin: GenerateWaveformOptions['crossOrigin']
) {
	const AudioContextConstructor =
		window.AudioContext ?? (window as WindowWithWebkitAudioContext).webkitAudioContext;
	if (!AudioContextConstructor)
		throw new Error('Audio waveform generation requires Web Audio API.');

	const response = await fetch(src, {
		credentials: crossOrigin === 'use-credentials' ? 'include' : 'same-origin'
	});
	if (!response.ok) {
		throw new Error(`Audio waveform generation failed with HTTP ${response.status}.`);
	}

	const audioContext = new AudioContextConstructor();
	try {
		const audioBuffer = await audioContext.decodeAudioData(await response.arrayBuffer());
		return getAudioBufferPeaks(audioBuffer, count);
	} finally {
		await audioContext.close();
	}
}

function getAudioBufferPeaks(audioBuffer: AudioBuffer, count: number) {
	const channelData = Array.from({ length: audioBuffer.numberOfChannels }, (_, channel) =>
		audioBuffer.getChannelData(channel)
	);
	const peaks = Array.from({ length: count }, (_, index) => {
		const start = Math.floor((index / count) * audioBuffer.length);
		const end = Math.max(start + 1, Math.ceil(((index + 1) / count) * audioBuffer.length));
		return getPeakForRange(channelData, start, end);
	});
	const maxPeak = Math.max(...peaks);
	if (maxPeak <= 0) return peaks;
	return peaks.map((peak) => clamp(peak / maxPeak, 0, 1));
}

function getPeakForRange(channelData: Float32Array[], start: number, end: number) {
	const step = Math.max(1, Math.floor((end - start) / MAX_SAMPLES_PER_BAR));
	let peak = 0;
	for (let sampleIndex = start; sampleIndex < end; sampleIndex += step) {
		for (const channel of channelData) {
			peak = Math.max(peak, Math.abs(channel[sampleIndex] ?? 0));
		}
	}
	return peak;
}

function createFallbackWaveform(count: number, seed: string) {
	const seedValue = getSeedValue(seed);
	return Array.from({ length: count }, (_, index) => {
		const position = count === 1 ? 0 : index / (count - 1);
		const envelope = 0.34 + Math.sin(position * Math.PI) * 0.58;
		const carrier = Math.sin((index + 1) * ((seedValue % 19) + 7) * 0.37);
		const accent = Math.sin((index + 3) * ((seedValue % 11) + 5) * 0.19);
		return clamp((0.18 + Math.abs(carrier * 0.62 + accent * 0.38) * 0.82) * envelope, 0, 1);
	});
}

function getSeedValue(seed: string) {
	let hash = 2166136261;
	for (let index = 0; index < seed.length; index += 1) {
		hash ^= seed.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return Math.abs(hash);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}
