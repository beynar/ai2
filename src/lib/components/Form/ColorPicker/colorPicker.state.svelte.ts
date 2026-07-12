import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { addAlphaToHex, isValidColor, parseCSS, rgb2hex, rgb2hsl } from 'colorizr';
import { createPointerDrag, type PointerDragPayload } from '$lib/utils/pointerDrag.js';
import { createBindableStateClass } from '$lib/utils/state.svelte.js';

/** The text representation used by the color input; the canonical bound value stays hex regardless. */
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

type Rgb = { r: number; g: number; b: number };
type Hsva = { h: number; s: number; v: number; a: number };

type ColorPickerStateOptions = {
	value?: string;
	format?: ColorFormat;
	disabled?: boolean;
	onChange?: (value: string) => void;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const clampHue = (value: number) => Math.min(360, Math.max(0, value));
const round = (value: number, decimals: number) => {
	const factor = 10 ** decimals;
	return Math.round(value * factor) / factor;
};

// HSV → RGB (0–255). colorizr covers hex/rgb/hsl/oklab/oklch but not HSV, so the square's
// hue/saturation/value math is done here to keep hue & saturation when a color is desaturated.
const hsvToRgb = (h: number, s: number, v: number): Rgb => {
	const hp = ((((h % 360) + 360) % 360) / 60);
	const c = v * s;
	const x = c * (1 - Math.abs((hp % 2) - 1));
	let r = 0;
	let g = 0;
	let b = 0;
	if (hp < 1) [r, g, b] = [c, x, 0];
	else if (hp < 2) [r, g, b] = [x, c, 0];
	else if (hp < 3) [r, g, b] = [0, c, x];
	else if (hp < 4) [r, g, b] = [0, x, c];
	else if (hp < 5) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];
	const m = v - c;
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255)
	};
};

// RGB (0–255) → HSV.
const rgbToHsv = (rInput: number, gInput: number, bInput: number): { h: number; s: number; v: number } => {
	const r = rInput / 255;
	const g = gInput / 255;
	const b = bInput / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	let h = 0;
	if (delta !== 0) {
		if (max === r) h = ((g - b) / delta) % 6;
		else if (max === g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	const s = max === 0 ? 0 : delta / max;
	return { h, s, v: max };
};

export class ColorPickerState extends createBindableStateClass<ColorPickerStateOptions>() {
	declare value?: string;
	declare format?: ColorFormat;
	declare disabled?: boolean;
	declare onChange?: (value: string) => void;

	// HSVA is the source of truth for the UI so hue/saturation survive a black/white/desaturated color.
	h = $state(0);
	s = $state(1);
	v = $state(1);
	a = $state(1);

	private mounted = false;
	// The last hex this component emitted; external writes equal to it are skipped to avoid re-parsing.
	private lastEmitted: string | undefined = undefined;

	private areaDrag = createPointerDrag({
		disabled: () => !!this.disabled,
		onStart: (payload) => this.setSaturationValueFromPointer(payload),
		onMove: (payload) => this.setSaturationValueFromPointer(payload)
	});
	private hueDrag = createPointerDrag({
		disabled: () => !!this.disabled,
		onStart: (payload) => this.setHueFromPointer(payload),
		onMove: (payload) => this.setHueFromPointer(payload)
	});
	private alphaDrag = createPointerDrag({
		disabled: () => !!this.disabled,
		onStart: (payload) => this.setAlphaFromPointer(payload),
		onMove: (payload) => this.setAlphaFromPointer(payload)
	});

	rgb = $derived<Rgb>(hsvToRgb(this.h, this.s, this.v));
	// The current color at full opacity; used for the alpha gradient end-stop and format conversions.
	solidColor = $derived(rgb2hex([this.rgb.r, this.rgb.g, this.rgb.b]));
	// Canonical output: '#rrggbb', or '#rrggbbaa' when alpha < 1.
	hex = $derived(this.a < 1 ? addAlphaToHex(this.solidColor, this.a) : this.solidColor);
	private hslParts = $derived.by(() => {
		const { h, s, l } = rgb2hsl([this.rgb.r, this.rgb.g, this.rgb.b]);
		return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
	});
	// The color rendered as text in the currently selected format.
	formatted = $derived.by(() => {
		const format = this.format ?? 'hex';
		if (format === 'rgb') {
			const { r, g, b } = this.rgb;
			return this.a < 1 ? `rgba(${r}, ${g}, ${b}, ${round(this.a, 2)})` : `rgb(${r}, ${g}, ${b})`;
		}
		if (format === 'hsl') {
			const { h, s, l } = this.hslParts;
			return this.a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${round(this.a, 2)})` : `hsl(${h}, ${s}%, ${l}%)`;
		}
		return this.hex;
	});
	alphaPercent = $derived(Math.round(this.a * 100));
	// Solid hue backdrop for the saturation/value square.
	hueColor = $derived(`hsl(${Math.round(this.h)}, 100%, 50%)`);

	areaThumbLeft = $derived(this.s * 100);
	areaThumbTop = $derived((1 - this.v) * 100);
	hueThumbLeft = $derived((this.h / 360) * 100);
	alphaThumbLeft = $derived(this.a * 100);

	constructor(options: ColorPickerStateOptions) {
		super(options);

		// Sync external `value` writes into HSVA (skipping our own emissions), then guard the loop.
		$effect(() => {
			const incoming = this.value;
			untrack(() => {
				if (!this.mounted) {
					this.mounted = true;
					if (incoming) {
						const parsed = this.parse(incoming);
						if (parsed) this.applyParsed(parsed);
					}
					this.lastEmitted = incoming;
					return;
				}
				if (incoming === this.lastEmitted) return;
				const parsed = this.parse(incoming ?? '');
				if (parsed) this.applyParsed(parsed);
				this.lastEmitted = incoming;
			});
		});
	}

	// Attachments the component spreads onto the square and slider tracks (click-to-jump + drag).
	area: Attachment<HTMLElement> = (node) => this.areaDrag(node);
	hueSlider: Attachment<HTMLElement> = (node) => this.hueDrag(node);
	alphaSlider: Attachment<HTMLElement> = (node) => this.alphaDrag(node);

	// Parse any CSS color string into HSVA; returns null when it is not a valid/parseable color.
	private parse(input: string): Hsva | null {
		const trimmed = typeof input === 'string' ? input.trim() : '';
		if (!trimmed || !isValidColor(trimmed)) return null;
		let rgb: Rgb & { alpha?: number };
		try {
			rgb = parseCSS(trimmed, 'rgb');
		} catch {
			return null;
		}
		const a = typeof rgb.alpha === 'number' ? clamp01(rgb.alpha) : 1;
		const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
		return { h, s, v, a };
	}

	// Apply a parsed color, preserving hue when achromatic and hue+saturation when black.
	private applyParsed(parsed: Hsva) {
		if (parsed.v === 0) {
			this.v = 0;
			this.a = parsed.a;
			return;
		}
		if (parsed.s !== 0) this.h = parsed.h;
		this.s = parsed.s;
		this.v = parsed.v;
		this.a = parsed.a;
	}

	// Push the current HSVA out as hex: records it, writes the bound value, fires onChange.
	private emit() {
		const hex = this.hex;
		this.lastEmitted = hex;
		this.value = hex;
		this.onChange?.(hex);
	}

	private setSaturationValueFromPointer(payload: PointerDragPayload) {
		const rect = payload.node.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return;
		this.s = clamp01((payload.x - rect.left) / rect.width);
		this.v = clamp01(1 - (payload.y - rect.top) / rect.height);
		this.emit();
	}

	private setHueFromPointer(payload: PointerDragPayload) {
		const rect = payload.node.getBoundingClientRect();
		if (rect.width <= 0) return;
		this.h = clamp01((payload.x - rect.left) / rect.width) * 360;
		this.emit();
	}

	private setAlphaFromPointer(payload: PointerDragPayload) {
		const rect = payload.node.getBoundingClientRect();
		if (rect.width <= 0) return;
		this.a = clamp01((payload.x - rect.left) / rect.width);
		this.emit();
	}

	// Try to commit a typed/pasted/eyedropped CSS color. Returns false when unparseable (caller reverts).
	commitText = (input: string): boolean => {
		if (this.disabled) return false;
		const parsed = this.parse(input);
		if (!parsed) return false;
		this.applyParsed(parsed);
		this.emit();
		return true;
	};

	setAlphaPercent = (percent: number) => {
		if (this.disabled) return;
		this.a = clamp01(percent / 100);
		this.emit();
	};

	onAreaKeydown = (event: KeyboardEvent) => {
		if (this.disabled) return;
		const step = event.shiftKey ? 0.1 : 0.01;
		let handled = true;
		switch (event.key) {
			case 'ArrowRight':
				this.s = clamp01(this.s + step);
				break;
			case 'ArrowLeft':
				this.s = clamp01(this.s - step);
				break;
			case 'ArrowUp':
				this.v = clamp01(this.v + step);
				break;
			case 'ArrowDown':
				this.v = clamp01(this.v - step);
				break;
			case 'Home':
				this.s = 0;
				break;
			case 'End':
				this.s = 1;
				break;
			default:
				handled = false;
		}
		if (handled) {
			event.preventDefault();
			this.emit();
		}
	};

	onHueKeydown = (event: KeyboardEvent) => {
		if (this.disabled) return;
		const step = event.shiftKey ? 10 : 1;
		let next = this.h;
		let handled = true;
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				next = this.h + step;
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				next = this.h - step;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = 360;
				break;
			default:
				handled = false;
		}
		if (handled) {
			event.preventDefault();
			this.h = clampHue(next);
			this.emit();
		}
	};

	onAlphaKeydown = (event: KeyboardEvent) => {
		if (this.disabled) return;
		const step = event.shiftKey ? 0.1 : 0.01;
		let next = this.a;
		let handled = true;
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				next = this.a + step;
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				next = this.a - step;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = 1;
				break;
			default:
				handled = false;
		}
		if (handled) {
			event.preventDefault();
			this.a = clamp01(next);
			this.emit();
		}
	};
}
