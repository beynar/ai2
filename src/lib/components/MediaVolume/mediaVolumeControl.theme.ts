import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultMediaVolumeControlRoot = cva({
	base: 'flex min-w-0 shrink-0 items-center',
	variants: {
		mode: {
			popover: '',
			inline: 'w-full'
		}
	},
	defaultVariants: {
		mode: 'popover'
	}
});

const defaultMediaVolumeControlPopoverPanel = cva({
	base: 'p-1.5 pb-2.5'
});

const defaultMediaVolumeControlPanel = cva({
	base: 'flex min-w-0 items-center gap-2 p-1',
	variants: {
		orientation: {
			horizontal: 'w-full',
			vertical: 'w-auto flex-col justify-center gap-1.5 px-0 pt-0.5 pb-0'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

const defaultMediaVolumeControlSlider = cva({
	base: 'flex min-w-0 shrink-0 items-center justify-center',
	variants: {
		orientation: {
			horizontal: 'w-full',
			vertical: 'h-auto'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export const mediaVolumeControlTheme = {
	root: defaultMediaVolumeControlRoot,
	popoverPanel: defaultMediaVolumeControlPopoverPanel,
	panel: defaultMediaVolumeControlPanel,
	slider: defaultMediaVolumeControlSlider
};

export type MediaVolumeControlTheme = typeof mediaVolumeControlTheme;
export type MediaVolumeControlThemeProps = InferComponentTheme<MediaVolumeControlTheme>;
export const setMediaVolumeControlTheme =
	setComponentTheme<MediaVolumeControlTheme>('mediaVolumeControl');
export const useMediaVolumeControlTheme = useComponentTheme(
	'mediaVolumeControl',
	mediaVolumeControlTheme
);
