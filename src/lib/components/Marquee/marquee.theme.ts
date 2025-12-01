import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultMarquee = cva({
	base: 'group flex overflow-hidden relative',
	variants: {
		direction: {
			left: 'flex-row',
			up: 'flex-col'
		},
		size: {
			small: 'gap-2',
			normal: 'gap-4',
			large: 'gap-6'
		}
	},
	defaultVariants: {
		direction: 'left',
		size: 'normal'
	}
});

const defaultInner = cva({
	base: 'flex shrink-0 justify-around [--gap:1rem] whitespace-nowrap',
	variants: {
		direction: {
			left: 'flex-row animate-marquee-left',
			up: 'flex-col animate-marquee-up'
		},
		size: {
			small: 'gap-2',
			normal: 'gap-4',
			large: 'gap-6'
		},
		pauseOnHover: {
			true: 'group-hover:[animation-play-state:paused]',
			false: ''
		},
		reverse: {
			true: '[direction:reverse]',
			false: ''
		}
	},
	defaultVariants: {
		direction: 'left',
		size: 'normal',
		pauseOnHover: false,
		reverse: false
	}
});

export const marqueeTheme = {
	marquee: defaultMarquee,
	inner: defaultInner
};

export type MarqueeTheme = typeof marqueeTheme;
export type MarqueeThemeProps = InferComponentTheme<MarqueeTheme>;
export const setMarqueeTheme = setComponentTheme<MarqueeTheme>('marquee');
export const useMarqueeTheme = useComponentTheme('marquee', marqueeTheme);
