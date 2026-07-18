import { bind } from '$lib/utils/state.svelte.js';
import { getContext, onMount, setContext } from 'svelte';
import { browser } from '$app/environment';
import { MediaQuery } from 'svelte/reactivity';
import type { DialogState } from '../Dialog/dialog.state.svelte.js';
import type { SpinnerVariant } from '../Spinner/spinner.props.js';
import type { ResponsiveProps, Breakpoint } from './theme.js';
import type { Easing } from '$lib/transitions/easingFunctions.js';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import { on } from 'svelte/events';
import type { FSOParams, FSOProps } from '$lib/transitions/transition.js';
import type { Theme as SvelteTheme } from 'svelte-themes';
import type { PopoverState } from '../Popover/popover.state.svelte.js';
import type { TooltipProps } from '../Tooltip/tooltip.svelte.js';

const events = ['scroll', 'pointerdown', 'keydown', 'keyup'] as const;
type Events = (typeof events)[number];
type EventPayload = {
	[E in Events]: E extends 'pointerdown'
		? PointerEvent
		: E extends 'keydown'
			? KeyboardEvent
			: E extends 'keyup'
				? KeyboardEvent
				: E extends 'scroll'
					? WheelEvent
					: Event;
};
interface ThemeOptions {
	readonly spinnerVariant: SpinnerVariant;
}

export interface ThemeState extends ThemeOptions {}

export class ThemeState {
	tooltip = $state<(TooltipProps & { ref: HTMLElement }) | null>(null);
	lastTooltipClosed = $state<number | null>(null);
	dialogs = $state<DialogState[]>([]);
	dialogSeq = 0;
	openDialogs = $derived(
		this.dialogs.filter((d) => d.isOpen).sort((a, b) => a.openOrder - b.openOrder)
	);
	popovers = $state<PopoverState[]>([]);
	// Tailwind's default breakpoint widths. `min-width` queries so the first that
	// fails tells us the active band. Built only in the browser — MediaQuery calls
	// `window.matchMedia` in its constructor.
	private breakpointQueries = browser
		? {
				sm: new MediaQuery('(min-width: 640px)'),
				md: new MediaQuery('(min-width: 768px)'),
				lg: new MediaQuery('(min-width: 1024px)'),
				xl: new MediaQuery('(min-width: 1280px)')
			}
		: null;
	// Live viewport breakpoint driving every `ResponsiveProps` function. Falls back to
	// `md` during SSR (no viewport to measure), which matches the pre-reactive default.
	currentBreakpoint = $derived.by<Breakpoint>(() => {
		const q = this.breakpointQueries;
		if (!q) return 'md';
		if (q.xl.current) return 'xl';
		if (q.lg.current) return 'lg';
		if (q.md.current) return 'md';
		if (q.sm.current) return 'sm';
		return 'xs';
	});
	// "Mobile" = below Tailwind's `md` (< 768px); used to collapse modals into sheets.
	isMobile = $derived(this.currentBreakpoint === 'xs' || this.currentBreakpoint === 'sm');
	preferReducesMotion = $state(false);
	eventListeners = new SvelteMap<Events, SvelteSet<Function>>();
	private svelteTheme: SvelteTheme;
	transition = $state<{
		easing: Easing;
		duration: number;
	}>({
		easing: 'cubicInOut',
		duration: 200
	});

	get resolvedTheme() {
		return this.svelteTheme.resolvedTheme;
	}

	get theme() {
		return this.svelteTheme.theme;
	}

	set theme(theme: string) {
		this.svelteTheme.theme = theme;
	}

	get themes() {
		return this.svelteTheme.themes;
	}

	get systemTheme() {
		return this.svelteTheme.systemTheme;
	}

	constructor(options: ThemeOptions, svelteTheme: SvelteTheme) {
		this.svelteTheme = svelteTheme;
		bind(this, options);
		setContext('sveltaiTheme', this);
	}

	resolveTransitionProps = (props?: ResponsiveProps<any>, defaultTransition?: FSOProps) => {
		const responsiveTransition = this.resolveResponsiveProps(props);
		const defaultTransitionProps = {
			in:
				defaultTransition && 'in' in defaultTransition && defaultTransition.in
					? defaultTransition.in
					: defaultTransition
						? (defaultTransition as FSOParams)
						: {
								x: 0,
								y: 0,
								scale: 0.98,
								opacity: 0
							},
			out:
				defaultTransition && 'out' in defaultTransition && defaultTransition.out
					? defaultTransition.out
					: defaultTransition
						? (defaultTransition as FSOParams)
						: {
								x: 0,
								y: 0,
								scale: 0.98,
								opacity: 0
							}
		} as {
			in: FSOParams;
			out: FSOParams;
		};
		if (!responsiveTransition) {
			return defaultTransitionProps;
		}
		return {
			in: 'in' in responsiveTransition ? responsiveTransition.in : defaultTransitionProps.in,
			out: 'out' in responsiveTransition ? responsiveTransition.out : defaultTransitionProps.out
		} as {
			in: FSOParams;
			out: FSOParams;
		};
	};

	/**
	 * Normalizes a transition prop into `{ in, out }`. A flat params object is
	 * applied to both directions; the `{ in, out }` form is passed through (each
	 * side optional). `undefined` yields `{ in: undefined, out: undefined }` so
	 * the transition falls back to its own defaults.
	 */
	splitTransition = <T>(props?: T | { in?: T; out?: T }) => {
		const split = props && typeof props === 'object' && ('in' in props || 'out' in props);
		return {
			in: split ? (props as { in?: T }).in : (props as T | undefined),
			out: split ? (props as { out?: T }).out : (props as T | undefined)
		};
	};

	resolveResponsiveProps = <T>(props?: ResponsiveProps<T>, defaultValue?: T): T => {
		return typeof props === 'function'
			? (props as (breakpoint: Breakpoint) => T)(this.currentBreakpoint)
			: props || defaultValue!;
	};

	addDialog = (dialog: DialogState) => () => {
		this.dialogs.push(dialog);
		return () => {
			this.dialogs = this.dialogs.filter((d) => d.id !== dialog.id);
		};
	};
	addPopover = (popover: PopoverState) => () => {
		this.popovers.push(popover);
		return () => {
			this.popovers = this.popovers.filter((d) => d.id !== popover.id);
		};
	};

	private on = <E extends Events>(event: E) => {
		console.log(this.eventListeners);
		if (!this.eventListeners.has(event)) {
			let unSubscribe: () => void;
			const callback = (EventPayload: EventPayload[E]) => {
				if (!this.eventListeners.size) {
					unSubscribe?.();
					return;
				}
				this.eventListeners.get(event)?.forEach((callback) => callback(EventPayload));
			};
			unSubscribe = on(document, event, callback as any);
			this.eventListeners.set(event, new SvelteSet([]));
			console.log(this.eventListeners);
		}
	};

	addEventListener = <E extends Events>(event: E, callback: (event: EventPayload[E]) => void) => {
		this.on(event);
		this.eventListeners.get(event)?.add(callback);
		return () => {
			this.eventListeners.get(event)?.delete(callback);
		};
	};
	addEventListenerOnMount = <E extends Events>(
		event: E,
		callback: (event: EventPayload[E]) => void
	) => {
		onMount(() => {
			return this.addEventListener(event, callback);
		});
	};
}

export const useTheme = () => {
	return getContext('sveltaiTheme') as ThemeState;
};
