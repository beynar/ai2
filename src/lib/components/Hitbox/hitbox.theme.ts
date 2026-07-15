import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultHitbox = cva({
	base: 'absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 touch-manipulation rounded-[inherit]',
	variants: {
		size: {
			small: 'size-5',
			normal: 'size-6',
			large: 'size-7'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const hitboxTheme = {
	root: defaultHitbox
};

export type HitboxTheme = typeof hitboxTheme;
export type HitboxThemeProps = InferComponentTheme<HitboxTheme>;
export const setHitboxTheme = setComponentTheme<HitboxTheme>('hitbox');
export const useHitboxTheme = useComponentTheme<HitboxTheme>('hitbox', hitboxTheme);
