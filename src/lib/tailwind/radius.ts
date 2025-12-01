export type RadiusSize = 'normal' | 'small' | 'large' | 'subtile' | 'none' | 'round' | number;

const roundedSizes = {
	normal: 0.4,
	small: 0.2,
	large: 0.8,
	subtile: 0.1,
	none: 0,
	round: 1
};
export const radius = (size: RadiusSize = 0.25) => {
	const base = typeof size === 'number' ? size : roundedSizes[size];
	return {
		small: `${base * 0.5}rem`,
		DEFAULT: `${base}rem`,
		large: `${base * 2}rem`
	};
};
