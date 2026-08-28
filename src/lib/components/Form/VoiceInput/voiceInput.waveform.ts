export function resizeVoiceInputCanvas(
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D
) {
	const rect = canvas.getBoundingClientRect();
	const ownerWindow = canvas.ownerDocument.defaultView;
	const pixelRatio = Math.min(ownerWindow?.devicePixelRatio || 1, 2);
	const width = Math.max(1, Math.round(rect.width * pixelRatio));
	const height = Math.max(1, Math.round(rect.height * pixelRatio));
	if (canvas.width !== width) canvas.width = width;
	if (canvas.height !== height) canvas.height = height;
	context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

export function drawVoiceInputWaveform(
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	samples: number[],
	playbackProgress: number | null
) {
	const { width, height } = canvas.getBoundingClientRect();
	if (width <= 0 || height <= 0) return;

	const styles = getComputedStyle(canvas);
	const baseColor = styles.color;
	const activeColor = styles.getPropertyValue('--color-readable').trim() || baseColor;
	context.clearRect(0, 0, width, height);
	context.lineCap = 'round';

	drawBaseline(context, width, height, baseColor);
	if (samples.length === 0) return;

	const bars = getWaveformBars(samples, width, playbackProgress !== null);
	context.strokeStyle = playbackProgress === null ? baseColor : activeColor;
	context.globalAlpha = playbackProgress === null ? 0.92 : 0.28;
	drawBars(context, bars, height);

	if (playbackProgress !== null && playbackProgress > 0) {
		context.save();
		context.beginPath();
		context.rect(0, 0, width * clamp(playbackProgress, 0, 1), height);
		context.clip();
		context.strokeStyle = activeColor;
		context.globalAlpha = 0.96;
		drawBars(context, bars, height);
		context.restore();
	}

	context.globalAlpha = 1;
}

type WaveformBars = {
	samples: number[];
	barWidth: number;
	step: number;
	startX: number;
};

function getWaveformBars(samples: number[], width: number, isPlayback: boolean): WaveformBars {
	const liveBarWidth = Math.max(2, Math.min(3, width / 180));
	const liveStep = liveBarWidth + 2.5;
	const visibleCount = Math.max(1, Math.floor(width / liveStep));
	const visibleSamples = resampleSamples(samples, visibleCount);

	if (!isPlayback) {
		return {
			samples: visibleSamples,
			barWidth: liveBarWidth,
			step: liveStep,
			startX: width - (visibleSamples.length - 0.5) * liveStep
		};
	}

	const step = width / visibleSamples.length;
	return {
		samples: visibleSamples,
		barWidth: Math.max(1.5, Math.min(3, step * 0.55)),
		step,
		startX: step / 2
	};
}

function resampleSamples(samples: number[], count: number) {
	if (samples.length <= count) return samples;
	return Array.from({ length: count }, (_, index) => {
		const start = Math.floor((index / count) * samples.length);
		const end = Math.max(start + 1, Math.ceil(((index + 1) / count) * samples.length));
		return Math.max(...samples.slice(start, end));
	});
}

function drawBaseline(
	context: CanvasRenderingContext2D,
	width: number,
	height: number,
	color: string
) {
	context.save();
	context.strokeStyle = color;
	context.globalAlpha = 0.32;
	context.lineWidth = 1;
	context.setLineDash([2, 5]);
	context.beginPath();
	context.moveTo(0, height / 2);
	context.lineTo(width, height / 2);
	context.stroke();
	context.restore();
}

function drawBars(
	context: CanvasRenderingContext2D,
	{ samples, barWidth, step, startX }: WaveformBars,
	height: number
) {
	context.lineWidth = barWidth;
	context.setLineDash([]);
	context.beginPath();
	let x = startX;
	for (const sample of samples) {
		const barHeight = Math.max(2, sample * height * 0.82);
		context.moveTo(x, (height - barHeight) / 2);
		context.lineTo(x, (height + barHeight) / 2);
		x += step;
	}
	context.stroke();
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}
