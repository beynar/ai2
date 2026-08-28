import { ThemeState, useTheme } from '../Theme/theme.state.svelte.js';
import { Timer } from '$lib/utils/timer.svelte.js';
import { onMount, untrack } from 'svelte';
import type { ResponsiveProps } from '../Theme/theme.js';
import type { Slot } from '../Slot/slot.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import type { Colors, Sizes } from '$lib/types/theme.js';
import type { ButtonProps } from '../Button/index.js';
import { bind } from '$lib/utils/state.svelte.js';
import { defaultToastAnimation, type ToastThemeProps } from './toast.theme.js';

export type ToastPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center'
	// Full screen-width bars pinned flush to the top or bottom edge.
	| 'banner-top'
	| 'banner-bottom';

/**
 * A button rendered inside the toast (full Button props, with its label as
 * `content`). Clicking it runs its `onClick` and then — unless `dismiss: false` —
 * dismisses the toast. Because a manual dismiss fires `onClose` and NOT
 * `onAutoClose`, this is exactly what makes the deferred-commit / Undo pattern
 * work: put the real destructive action in `onAutoClose` (runs only on timeout),
 * and an Undo action here cancels it just by closing the toast early.
 */
export type ToastAction = ButtonProps & {
	/** The button's label. */
	content?: string;
	/** Whether clicking the button dismisses the toast. @default true */
	dismiss?: boolean;
};

type ToastOptions = {
	id: string;
	size?: Sizes;
	closeOnClick?: boolean; // If true, clicking the toast body dismisses it. @default false (use swipe/close-icon instead).
	swipeToDismiss?: boolean; // If true, the toast can be dragged toward its screen edge to dismiss it. @default true
	showCloseIcon?: boolean; // If true, the toast will show a close icon.
	duration?: number | false; // Time in milliseconds that should elapse before automatically closing the toast.
	dismissible?: boolean; // If false, it'll prevent the user from dismissing the toast.
	richColors?: boolean; // If true, the toast will use rich colors.
	prefix?: Slot | false;
	suffix?: Slot;
	actions?: ToastAction[]; // Buttons rendered in the toast (e.g. an "Undo" action).
	closeIcon?: Slot; // The close button that shows inside the toast.
	animation?: FSOProps;
	loading?: boolean; // If true, the toast will show a spinner.
	progress?: boolean; // If true, show a progress bar counting down the remaining duration (only when the toast auto-closes).
	title?: Slot; // Toast's title.
	description?: Slot; // Toast's description, renders underneath the title.
	color: Colors;
	important?: boolean; // Control the sensitivity of the toast for screen readers
	icon?: string; // Icon displayed in front of toast's text, aligned vertically.
	onClose?: (toast: Toast) => void; // Called when the toast is dismissed manually (close button, an action, or toast.remove()). NOT called on timeout.
	onOpen?: (toast: Toast) => void; // Called once the toast has finished entering.
	onAutoClose?: (toast: Toast) => void; // Called when the toast closes on its own after `duration`. Put deferred/committed work (e.g. the real delete of an Undo flow) here — it never fires if the toast is dismissed first.
	position?: ToastPosition;
};

export type ToasterProps = Pick<
	ToastOptions,
	| 'size'
	| 'closeOnClick'
	| 'swipeToDismiss'
	| 'showCloseIcon'
	| 'duration'
	| 'dismissible'
	| 'richColors'
	| 'prefix'
	| 'suffix'
	| 'closeIcon'
	| 'progress'
> & {
	theme?: ToastThemeProps;
	/** Per-instance i18n overrides, merged over the global catalog. */
	i18n?: Partial<import('$lib/i18n/en.js').Messages>;
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
				// addToast always resolves a concrete position.
				const position = toast.opts.position;
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
			return () => {
				// Don't leave a dangling reference if this Toaster unmounts (another
				// mounted Toaster may have already replaced it).
				if (window.toaster === this) window.toaster = undefined as unknown as Toaster;
			};
		});

		// Track duration configuration changes
		$effect(() => {
			const timersAndDurations = this.toasts.map((toast) => {
				return {
					toast,
					position: toast.opts.position,
					duration: toast.opts.duration || 0,
					// Timeout is the ONLY path that fires onAutoClose (the deferred-commit hook).
					callback: () => toast.remove('auto')
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
					} else if (toast.timer && duration <= 0) {
						// duration switched to false/0: the toast became persistent.
						toast.timer.destroy();
						toast.timer = undefined;
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
				position: opts.position || this.currentPosition || 'bottom-right',
				size: opts.size ?? this.size,
				dismissible: opts.dismissible ?? this.dismissible,
				closeOnClick: opts.closeOnClick ?? this.closeOnClick ?? false,
				swipeToDismiss: opts.swipeToDismiss ?? this.swipeToDismiss ?? true,
				duration: opts.duration ?? this.duration,
				richColors: opts.richColors ?? this.richColors,
				showCloseIcon: opts.showCloseIcon ?? this.showCloseIcon ?? true,
				progress: opts.progress ?? this.progress ?? false,
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
		color: 'neutral',
		position: 'bottom-center',
		id: Math.random().toString(36).substring(7)
	});

	// `addToast` always resolves a concrete position before constructing the Toast.
	position = $derived(this.opts.position);

	constructor(
		opts: MakeRequired<ToastOptions, 'position'>,
		public toaster: Toaster,
		public theme: ThemeState
	) {
		this.id = opts.id;
		this.opts = opts;
		// Seed the reactive spinner flag from the initial options; callers can still
		// flip `toast.loading` later (e.g. resolve a pending action to a result).
		this.loading = opts.loading ?? false;
	}

	animations = $derived(
		// @ts-ignore
		this.theme.resolveTransitionProps(
			this.opts.animation,
			// @ts-ignore
			this.toaster?.animation?.[this.opts.position!] || defaultToastAnimation[this.opts.position!]
		)
	);

	// Cache the last in-stack coordinates: once the toast is removed from the array
	// (outro playing), indexOf returns -1 — without the cache the leaving toast would
	// jump to a huge reversedIndex, snap to opacity 0 and skip its exit animation.
	private lastStack = { index: 0, reversedIndex: 0 };

	indexInStack = $derived.by(() => {
		const stack = this.toaster?.toastsPerPositions?.[this.opts.position] ?? [];
		const index = stack.indexOf(this);
		if (index === -1) return this.lastStack;
		return (this.lastStack = { index, reversedIndex: stack.length - (index + 1) });
	});

	hovered = $derived.by(() => this.toaster?.hovering === this.opts.position);
	// Banners stack flat (full height, no perspective scale) — the collapsed
	// perspective look doesn't suit full-width bars.
	stacked = $derived.by(() => {
		const position = this.opts.position;
		if (position === 'banner-top' || position === 'banner-bottom') return false;
		return !this.toaster?.expand && !this.hovered;
	});
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

	// `offset` is the distance from BOTH screen edges; `gap` only spaces toasts
	// between each other (via absolutePosition) — it must not leak into the edge
	// distance, or the offset prop silently stops working vertically.
	actualizedPosition = $derived.by(() => {
		const position = this.opts.position;
		// Banners span the full width, flush to the edge (no offset, no margin).
		if (position === 'banner-top' || position === 'banner-bottom') {
			const verticalPosition = position === 'banner-top' ? 'top' : 'bottom';
			return [verticalPosition, 'center', `${verticalPosition}: 0px; left: 0px; right: 0px;`];
		}
		const [vertical, horizontal] = position.split('-');
		const verticalPosition = vertical === 'top' ? 'top' : 'bottom';
		const horizontalPosition = horizontal === 'left' ? 'left' : 'right';
		const offset = this.toaster?.offset ?? 0;
		if (horizontal === 'center') {
			return [
				verticalPosition,
				horizontalPosition,
				`${verticalPosition}: ${offset}px; left: 0px; right:0px; margin: 0 auto;`
			];
		}
		return [
			verticalPosition,
			horizontalPosition,
			`${verticalPosition}: ${offset}px; ${horizontalPosition}: ${offset}px;`
		];
	});
	translateY = $derived.by(() =>
		this.stacked
			? this.indexInStack.reversedIndex *
				(this.toaster?.perspectiveAmount ?? 0) *
				(this.actualizedPosition[0] === 'top' ? 1 : -1)
			: this.absolutePosition * (this.actualizedPosition[0] === 'top' ? 1 : -1)
	);

	private removed = false;

	// `reason` distinguishes an automatic timeout ('auto' → onAutoClose, the commit
	// hook) from every manual dismissal ('manual' → onClose). Guarded so a stray
	// event object passed as the argument (e.g. onclick={toast.remove}) still counts
	// as manual. Idempotent: an action-button click bubbles to the toast's own
	// closeOnClick handler, so remove() can fire twice — callbacks must run once.
	remove = (reason: 'manual' | 'auto' = 'manual') => {
		if (this.removed) return;
		this.removed = true;
		this.toaster?.removeToast(this);
		this.timer?.destroy();
		if (reason === 'auto') {
			this.opts?.onAutoClose?.(this);
		} else {
			this.opts?.onClose?.(this);
		}
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
					if (typeof window === 'undefined' || !window.toaster) {
						throw new Error(
							'toast() called without a mounted <Toaster />. Add <Toaster /> to your root layout.'
						);
					}
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
