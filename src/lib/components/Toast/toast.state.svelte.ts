import { ThemeState, useTheme } from '../Theme/theme.state.svelte.js';
import { Timer } from '$lib/utils/timer.svelte.js';
import { onMount, untrack } from 'svelte';
import type { ResponsiveProps } from '../Theme/theme.js';
import type { Slot } from '../Slot/slot.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import type { Colors, Sizes } from '$lib/types/theme.js';
import { bind } from '$lib/utils/state.svelte.js';
import { defaultToastAnimation, type ToastThemeProps } from './toast.theme.js';

export type ToastPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center';

type ToastOptions = {
	id: string;
	size?: Sizes;
	closeOnClick?: boolean; // If true, the toast will close when clicked.
	showCloseIcon?: boolean; // If true, the toast will show a close icon.
	duration?: number | false; // Time in milliseconds that should elapse before automatically closing the toast.
	dismissible?: boolean; // If false, it'll prevent the user from dismissing the toast.
	richColors?: boolean; // If true, the toast will use rich colors.
	prefix?: Slot | false;
	suffix?: Slot;
	closeIcon?: Slot; // The close button that shows inside the toast.
	animation?: FSOProps;
	loading?: boolean; // If true, the toast will show a spinner.
	title?: Slot; // Toast's description, renders underneath the title.
	description?: Slot; // Toast's description, renders underneath the title.
	color: Colors;
	important?: boolean; // Control the sensitivity of the toast for screen readers
	icon?: string; // Icon displayed in front of toast's text, aligned vertically.
	onClose?: (toast: Toast) => void; // Function that gets called when either the close button is clicked, or the toast is swiped.
	onOpen?: (toast: Toast) => void; // Function that gets called when either the close button is clicked, or the toast is swiped.
	onAutoClose?: (toast: Toast) => void; // Function that gets called when the toast disappears automatically after its timeout (duration prop).
	position?: ToastPosition;
};

export type ToasterProps = Pick<
	ToastOptions,
	| 'size'
	| 'closeOnClick'
	| 'showCloseIcon'
	| 'duration'
	| 'dismissible'
	| 'richColors'
	| 'prefix'
	| 'suffix'
	| 'closeIcon'
> & {
	theme?: ToastThemeProps;
	collapseHorizontalAxis?: ResponsiveProps<boolean>; // If true, the toast will collapse horizontally. Specially useful on mobile.
	expand?: boolean; // If true, the toast will expand by default;
	visibleToasts?: number; // If true, the toast will be visible by default;
	gap?: number; // Gap between toasts
	offset?: number; // Offset from the edge of the screen
	direction?: 'ltr' | 'rtl'; // Direction of the toast
	position?: ResponsiveProps<ToastPosition>;
	animation?: Partial<Record<ToastPosition, FSOProps>>;
	perspectiveAmount?: number; // A number between 0 and 100 that controls the perspective amount of the toast stack.
	// hotkey?: string; // Hotkey to show/hide the toast TODO: implement
};

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type ToasterOptions = Omit<
	MakeRequired<
		ToasterProps,
		| 'collapseHorizontalAxis'
		| 'expand'
		| 'visibleToasts'
		| 'gap'
		| 'offset'
		| 'direction'
		| 'position'
		| 'perspectiveAmount'
	>,
	'theme'
>;
export interface Toaster extends ToasterOptions {}

export class Toaster {
	toasts = $state<Toast[]>([]);
	element = $state<HTMLElement>();
	hovering = $state<ToastPosition | null>(null);
	polygon = $state<[number, number, number, number]>([0, 0, 0, 0]);
	position = $state<ToastPosition>('bottom-center');
	isOpen = $state(false);
	theme = useTheme();

	currentPosition = $derived(
		typeof this.position === 'string'
			? this.position
			: this.theme.resolveResponsiveProps(this.position, 'bottom-right')
	);

	toastsPerPositions = $derived(
		this.toasts.reduce(
			(acc, toast) => {
				const position = toast.opts?.position || 'bottom-center';
				if (!(position in acc)) {
					Object.assign(acc, {
						[position]: []
					});
				}
				acc[position as ToastPosition].push(toast);
				return acc;
			},
			{} as Record<ToastPosition, Toast[]>
		)
	);

	shouldCollapseHorizontally = $derived.by(() =>
		typeof this.collapseHorizontalAxis === 'boolean'
			? this.collapseHorizontalAxis
			: this.theme.resolveResponsiveProps(this.collapseHorizontalAxis, true)
	);

	constructor(opts: ToasterProps) {
		bind(this, opts);
		onMount(() => {
			window.toaster = this;
		});

		// Track duration configuration changes
		$effect(() => {
			const timersAndDurations = this.toasts.map((toast) => {
				return {
					toast,
					position: toast.opts.position,
					duration: toast.opts.duration || 0,
					callback: toast.remove
				};
			});
			untrack(() => {
				timersAndDurations.forEach(({ toast, position, duration, callback }) => {
					if (!toast.timer && duration > 0) {
						toast.timer = new Timer(callback, duration);
						if (this.hovering === position) {
							toast.timer.pause();
						}
					} else if (duration !== toast.timer?.delay && duration > 0 && toast.timer) {
						toast.timer.update(duration);
					}
				});
			});
		});
	}

	maybeCloseToaster = () => {
		if (this.toasts.length === 0) {
			this.isOpen = false;
		}
	};

	addToast = (opts: ToastOptions) => {
		const toast = new Toast(
			{
				...opts,
				position: opts.position || 'bottom-right',
				dismissible: opts.dismissible ?? this.dismissible,
				closeOnClick: opts.closeOnClick ?? this.closeOnClick,
				duration: opts.duration ?? this.duration,
				richColors: opts.richColors ?? this.richColors,
				showCloseIcon: opts.showCloseIcon ?? this.showCloseIcon ?? true,
				id: opts.id || Math.random().toString(36).substring(7)
			},
			this,
			this.theme
		);
		this.toasts.push(toast);
		this.isOpen = true;
		return toast;
	};

	removeToast = (toast: Toast) => {
		this.toasts = this.toasts.filter((t) => t.id !== toast.id);
	};

	toggleTimers = (position: ToastPosition, mode: 'pause' | 'resume') => {
		this.toasts.forEach((toast) => {
			if (toast.opts.position === position) {
				toast.timer?.[mode]?.();
			}
		});
	};
}

export class Toast {
	id: string;
	element = $state<HTMLElement>();
	height = $state(0);
	loading = $state(false);
	timer = $state<Timer | undefined>(undefined);
	index = $state(0);
	opts = $state<MakeRequired<ToastOptions, 'position'>>({
		color: 'contrast',
		position: 'bottom-center',
		id: Math.random().toString(36).substring(7)
	});

	// @ts-ignore
	position = $derived(this.opts.position || this.toaster.position);

	constructor(
		opts: MakeRequired<ToastOptions, 'position'>,
		public toaster: Toaster,
		public theme: ThemeState
	) {
		this.id = opts.id;
		this.opts = opts;
	}

	animations = $derived(
		// @ts-ignore
		this.theme.resolveTransitionProps(
			this.opts.animation,
			// @ts-ignore
			this.toaster?.animation?.[this.opts.position!] || defaultToastAnimation[this.opts.position!]
		)
	);

	indexInStack = $derived.by(() => {
		const index =
			this.toaster?.toastsPerPositions?.[
				this.opts?.position || ('bottom-center' as ToastPosition)
			]?.indexOf(this);
		const reversedIndex =
			this.toaster?.toastsPerPositions?.[this.opts.position || ('bottom-center' as ToastPosition)]
				.length - (index ?? 0 + 1);

		return { index, reversedIndex };
	});

	hovered = $derived.by(() => this.toaster?.hovering === this.opts.position);
	stacked = $derived.by(() => !this.toaster?.expand && !this.hovered);
	absolutePosition = $derived.by(() =>
		(this.toaster?.toastsPerPositions?.[this.position] || [])
			.toReversed()
			.reduce((acc, toast, i) => {
				if (i < this.indexInStack.reversedIndex) {
					return (acc += toast.height + (this.toaster?.gap ?? 0));
				}
				return acc;
			}, 0)
	);

	actualizedPosition = $derived.by(() => {
		const [vertical, horizontal] = (this.opts?.position || 'bottom-center').split('-');
		const verticalPosition = vertical === 'top' ? 'top' : 'bottom';
		const horizontalPosition = horizontal === 'left' ? 'left' : 'right';
		if (horizontal === 'center') {
			return [
				verticalPosition,
				horizontalPosition,
				`${verticalPosition}: 0px; left: 0px; right:0px; margin: 0 auto;`
			];
		}
		return [
			verticalPosition,
			horizontalPosition,
			`${verticalPosition}: 0px; ${horizontalPosition}: ${this.toaster?.offset ?? 0}px;`
		];
	});
	translateY = $derived.by(() =>
		this.stacked
			? (this.indexInStack.reversedIndex * (this.toaster?.perspectiveAmount ?? 0) +
					(this.toaster?.gap ?? 0)) *
				(this.actualizedPosition[0] === 'top' ? 1 : -1)
			: (this.absolutePosition + (this.toaster?.gap ?? 0)) *
				(this.actualizedPosition[0] === 'top' ? 1 : -1)
	);

	remove = () => {
		this.toaster?.removeToast(this);
		this.opts?.onClose?.(this);
		this.timer?.destroy();
	};
}

interface CustomEventMap {
	toast: CustomEvent<ToastOptions>;
	toast_created: CustomEvent<Toast>;
}
declare global {
	interface Window {
		toaster: Toaster;
	}
	interface Document {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
	}
}
type ToastCreator = {
	[key in Colors]: (t: Omit<Partial<ToastOptions>, 'color' | 'id'> & { id?: string }) => Toast;
};

export const toast = new Proxy(
	{},
	{
		get(_obj, key) {
			if (typeof key === 'string') {
				return (payload: any) => {
					const toast = window.toaster.addToast({
						color: key as Colors,
						...payload
					});
					return toast;
				};
			}
		}
	}
) as ToastCreator;
