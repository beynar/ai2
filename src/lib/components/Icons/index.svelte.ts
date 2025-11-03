import type { Colors } from '$lib/types/theme.js';
import { createRawSnippet } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

type IconProps = {
	size: number | string;
	mirrored?: boolean;
	color?: Colors | string; // primary, secondary, danger, success, warning, info, surface, contrast, or a hex color
} & SVGAttributes<SVGSVGElement>;

const attributesToString = (attributes: SVGAttributes<SVGSVGElement>) => {
	let result = '';
	for (const key in attributes) {
		if (attributes.hasOwnProperty(key)) {
			const value = attributes[key as keyof SVGAttributes<SVGSVGElement>];
			const isObject = typeof value === 'object';
			if (!isObject && value !== undefined) {
				result += `${key}="${value}" `;
			}
		}
	}
	return result.trim();
};

const sizeWithUnit = (size: number | string) => {
	if (typeof size === 'number') {
		return `${size}px`;
	}
	return size;
};

const colorSet = new Set<Colors>([
	'primary',
	'secondary',
	'danger',
	'success',
	'warning',
	'info',
	'surface',
	'contrast'
]);
const isColor = (color: string): color is Colors => colorSet.has(color as Colors);
export const icon = (...paths: string[]) =>
	createRawSnippet<[IconProps] | []>((...args) => {
		return {
			render() {
				const { size = '1lh', mirrored, color = 'currentColor', ...attributes } = args[0]?.() || {};
				return `<svg class="aspect-square" fill="${isColor(color) ? `var(--color-${color})` : color}" ${attributesToString(attributes)} ${mirrored ? 'transform="scale(-1, 1)"' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="${sizeWithUnit(size)}">
          ${paths.map((path, i) => `<path d="${path}" ${paths.length === 2 && i === 0 ? "opacity='0.2'" : ''} />`).join('')}
        </svg>`;
			},
			setup: (node) => {
				$effect(() => {
					const { size = '1lh', mirrored, color, ...attributes } = args[0]?.() || {};
					Object.assign(node.attributes, attributes);
					if (color) {
						if (isColor(color)) {
							node.setAttribute('fill', `var(--colo-${color})`);
						} else {
							node.setAttribute('fill', color);
						}
					}
					node.setAttribute('transform', mirrored ? 'scale(-1, 1)' : '');
					node.setAttribute('height', `${sizeWithUnit(size)}`);
				});
			}
		};
	});
