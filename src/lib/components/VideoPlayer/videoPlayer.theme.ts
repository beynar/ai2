import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultVideoPlayerRoot = cva({
	base: 'group/video-player relative isolate w-full min-w-0 overflow-hidden rounded-lg border border-background-muted bg-black text-white outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-60',
			false: ''
		},
		fullscreen: {
			fullscreen: 'h-full w-full rounded-none border-0',
			windowed: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false,
		fullscreen: 'windowed'
	}
});

const defaultVideoPlayerAspectRatio = cva({
	base: 'w-full bg-black',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerFrame = cva({
	base: 'relative min-h-40 w-full bg-black',
	variants: {
		ratio: {
			auto: '',
			fixed: 'absolute inset-0 min-h-0',
			fullscreen: 'h-full min-h-0'
		}
	},
	defaultVariants: {
		ratio: 'auto'
	}
});

const defaultVideoPlayerMedia = cva({
	base: 'block h-full w-full bg-black object-contain',
	variants: {
		disabled: {
			true: 'pointer-events-none',
			false: ''
		}
	},
	defaultVariants: {
		disabled: false
	}
});

const defaultVideoPlayerOverlay = cva({
	base: 'pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4',
	variants: {
		visible: {
			true: '',
			false: 'hidden'
		}
	},
	defaultVariants: {
		visible: true
	}
});

const defaultVideoPlayerPanel = cva({
	base: 'rounded-lg border border-white/15 bg-black/70 px-3 py-2 text-center text-white shadow-lg backdrop-blur',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		tone: {
			loading: '',
			error: 'border-danger/60 text-danger-lighter',
			empty: 'text-white/75'
		}
	},
	defaultVariants: {
		size: 'normal',
		tone: 'loading'
	}
});

const defaultVideoPlayerControls = cva({
	base: 'absolute inset-0 z-20 text-white transition-opacity duration-150',
	variants: {
		visible: {
			true: 'opacity-100',
			false: 'pointer-events-none opacity-0'
		},
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		visible: true,
		size: 'normal'
	}
});

const defaultVideoPlayerControlsBackdrop = cva({
	base: 'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/85 via-black/45 to-transparent md:h-32'
});

const defaultVideoPlayerControlsBar = cva({
	base: 'absolute inset-x-0 bottom-0 z-20 grid gap-2',
	variants: {
		size: {
			small: 'gap-1.5 p-1 md:p-2',
			normal: 'gap-2 p-1 md:p-2 lg:p-3',
			large: 'gap-2.5 p-2 md:p-3 lg:p-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerControlRow = cva({
	base: 'grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 md:flex md:flex-nowrap',
	variants: {
		size: {
			small: 'gap-1 md:gap-1',
			normal: 'gap-1.5 md:gap-1 lg:gap-1.5',
			large: 'gap-2 md:gap-1.5 lg:gap-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerControlStart = cva({
	base: 'order-1 flex min-w-0 items-center justify-start md:order-2',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerControlCenter = cva({
	base: 'order-2 flex shrink-0 items-center justify-center gap-1 md:order-1 md:justify-start',
	variants: {
		size: {
			small: 'gap-0.5 md:gap-1',
			normal: 'gap-1 md:gap-1 lg:gap-1.5',
			large: 'gap-1.5 md:gap-1.5 lg:gap-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerControlEnd = cva({
	base: 'order-3 flex min-w-0 items-center justify-end gap-0.5 md:ml-auto',
	variants: {
		size: {
			small: 'gap-0.5 md:gap-1',
			normal: 'gap-0.5 md:gap-1 lg:gap-1.5',
			large: 'gap-1 md:gap-1.5 lg:gap-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerControlButton = cva({
	base: '!border-white/10 !text-white hover:!bg-white/15 active:!bg-white/20 data-[active=true]:!bg-white/20',
	variants: {
		size: {
			small: '!size-6 !min-w-6 md:!size-7 md:!min-w-7',
			normal: '!size-6 !min-w-6 md:!size-7 md:!min-w-7 lg:!size-8 lg:!min-w-8',
			large: '!size-7 !min-w-7 md:!size-8 md:!min-w-8 lg:!size-9 lg:!min-w-9'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerSlider = cva({
	base: 'relative flex w-full min-w-0 flex-1 items-center gap-2 py-1.5',
	variants: {
		size: {
			small: 'py-1',
			normal: 'py-1.5',
			large: 'py-2'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-60',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultVideoPlayerTimelineTrack = cva({
	base: 'group relative h-11 w-full min-w-0 touch-none rounded-full outline-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-white/60 has-[input:focus-visible]:ring-offset-0',
	variants: {
		disabled: {
			true: 'cursor-not-allowed opacity-60',
			false: 'cursor-pointer'
		}
	},
	defaultVariants: {
		disabled: false
	}
});

const defaultVideoPlayerTimelineRail = cva({
	base: 'absolute inset-x-0 bottom-0 h-1.5 overflow-hidden rounded-full bg-white/25'
});

const defaultVideoPlayerTimelineBuffered = cva({
	base: 'absolute inset-y-0 left-0 rounded-full bg-white/35'
});

const defaultVideoPlayerTimelineRange = cva({
	base: 'absolute inset-y-0 left-0 rounded-full bg-primary'
});

const defaultVideoPlayerTimelineThumb = cva({
	base: 'pointer-events-none absolute bottom-[-3px] z-10 size-3 -translate-x-1/2 rounded-full bg-white shadow transition-transform group-focus-within:scale-110'
});

const defaultVideoPlayerTimelineInput = cva({
	base: 'absolute inset-x-0 top-1/2 z-20 m-0 h-11 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent opacity-0 focus:outline-none disabled:cursor-not-allowed'
});

const defaultVideoPlayerTime = cva({
	base: 'min-w-fit tabular-nums text-white/85 max-[360px]:hidden',
	variants: {
		size: {
			small: 'text-[10px] md:text-[11px]',
			normal: 'text-[10px] md:text-[11px] lg:text-xs',
			large: 'text-[11px] md:text-xs lg:text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultVideoPlayerMenu = cva({
	base: 'grid gap-1'
});

const defaultVideoPlayerPopoverPanel = cva({
	base: 'border-white/10 bg-black/90 text-white shadow-xl backdrop-blur'
});

const defaultVideoPlayerVolumePanel = cva({
	base: 'flex w-full min-w-0 items-center gap-2 p-1'
});

export const videoPlayerTheme = {
	root: defaultVideoPlayerRoot,
	aspectRatio: defaultVideoPlayerAspectRatio,
	frame: defaultVideoPlayerFrame,
	media: defaultVideoPlayerMedia,
	overlay: defaultVideoPlayerOverlay,
	panel: defaultVideoPlayerPanel,
	controls: defaultVideoPlayerControls,
	controlsBackdrop: defaultVideoPlayerControlsBackdrop,
	controlsBar: defaultVideoPlayerControlsBar,
	controlRow: defaultVideoPlayerControlRow,
	controlStart: defaultVideoPlayerControlStart,
	controlCenter: defaultVideoPlayerControlCenter,
	controlEnd: defaultVideoPlayerControlEnd,
	controlButton: defaultVideoPlayerControlButton,
	slider: defaultVideoPlayerSlider,
	timelineTrack: defaultVideoPlayerTimelineTrack,
	timelineRail: defaultVideoPlayerTimelineRail,
	timelineBuffered: defaultVideoPlayerTimelineBuffered,
	timelineRange: defaultVideoPlayerTimelineRange,
	timelineThumb: defaultVideoPlayerTimelineThumb,
	timelineInput: defaultVideoPlayerTimelineInput,
	time: defaultVideoPlayerTime,
	menu: defaultVideoPlayerMenu,
	popoverPanel: defaultVideoPlayerPopoverPanel,
	volumePanel: defaultVideoPlayerVolumePanel
};

export type VideoPlayerTheme = typeof videoPlayerTheme;
export type VideoPlayerThemeProps = InferComponentTheme<VideoPlayerTheme>;
export const setVideoPlayerTheme = setComponentTheme<VideoPlayerTheme>('videoPlayer');
export const useVideoPlayerTheme = useComponentTheme('videoPlayer', videoPlayerTheme);
