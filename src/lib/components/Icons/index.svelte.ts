import { createRawSnippet } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

type IconProps = {
	size: number;
	mirrored?: boolean;
	color?: string;
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

export const icon = (...paths: string[]) =>
	createRawSnippet<[IconProps] | []>((...args) => {
		return {
			render() {
				const { size = 24, mirrored, color = 'currentColor', ...attributes } = args[0]?.() || {};
				return `<svg class="ui-icon" fill="${color}" ${attributesToString(attributes)} ${mirrored ? 'transform="scale(-1, 1)"' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="${sizeWithUnit(size)}" height="${sizeWithUnit(size)}">
          ${paths.map((path, i) => `<path d="${path}" ${paths.length === 2 && i === 0 ? "opacity='0.2'" : ''} />`).join('')}
        </svg>`;
			},
			setup: (node) => {
				$effect(() => {
					const { size = 24, mirrored, color, ...attributes } = args[0]?.() || {};
					Object.assign(node.attributes, attributes);
					color && node.setAttribute('fill', color);
					node.setAttribute('transform', mirrored ? 'scale(-1, 1)' : '');
					node.setAttribute('width', `${sizeWithUnit(size)}`);
					node.setAttribute('height', `${sizeWithUnit(size)}`);
				});
			}
		};
	});
