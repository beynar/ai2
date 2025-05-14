export type Size = 'normal' | 'small' | 'large' | number;

const roundedSizes = {
	normal: 0.25,
	small: 0.2,
	large: 0.3
};

export const spacing = (size: Size = 0.25) => {
	const base = typeof size === 'number' ? size : roundedSizes[size];
	return {
		DEFAULT: `${base}rem`
	};
};
