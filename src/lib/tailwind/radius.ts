export type RadiusSize = 'normal' | 'small' | 'large' | 'subtile' | 'none' | 'round' | number;

const roundedSizes = {
	normal: 0.25,
	small: 0.125,
	large: 0.5,
	subtile: 0.09,
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
