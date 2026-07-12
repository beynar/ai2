import { untrack } from 'svelte';
import { Maskito, type MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import type { ColorFormat } from './colorPicker.state.svelte.js';

// Hex entry: a fixed leading '#' (auto-inserted) followed by up to 8 hex digits, covering
// #rgb, #rgba, #rrggbb and #rrggbbaa. Typing "f00" yields "#f00".
const hexMask: MaskitoOptions = {
	mask: ['#', ...Array.from({ length: 8 }, () => /[0-9a-f]/i)]
};

// rgb()/hsl() entry: constrain keystrokes to the notation's characters; the color parser
// on commit stays the real validator.
const functionalMask: MaskitoOptions = {
	mask: /^[rgbahsl0-9(),.%\s]*$/i
};

export const colorMaskOptions = (format: ColorFormat): MaskitoOptions =>
	format === 'hex' ? hexMask : functionalMask;

// 0-100 integer mask for the alpha percentage input (values are clamped by Maskito on blur).
const alphaMaskOptions = maskitoNumberOptionsGenerator({ min: 0, max: 100 });

// Attachment masking a color text input for the current format; reads the format through a
// getter BEFORE untrack so the attachment re-runs (destroy + re-mask) when the format changes.
export const colorMask = (opts: { format: () => ColorFormat | undefined }) => {
	return (node: HTMLInputElement) => {
		const format = opts.format() ?? 'hex';
		return untrack(() => {
			const maskito = new Maskito(node, colorMaskOptions(format));
			return () => maskito.destroy();
		});
	};
};

// Attachment masking the alpha percentage input.
export const alphaMask = (node: HTMLInputElement) => {
	return untrack(() => {
		const maskito = new Maskito(node, alphaMaskOptions);
		return () => maskito.destroy();
	});
};
