import { bind } from '$lib/utils/state.svelte.js';
import { getContext, onMount, setContext } from 'svelte';
import type { DialogState } from '../Dialog/dialog.state.svelte.js';
import type { ResponsiveProps, Breakpoint } from './theme.js';
import type { Easing } from '$lib/transitions/easingFunctions.js';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import { on } from 'svelte/events';
import type { FSOParams, FSOProps } from '$lib/transitions/transition.js';
import type { Theme as SvelteTheme } from 'svelte-themes';
import type { PopoverState } from '../Popover/popover.state.svelte.js';
import type { TooltipProps } from '../Tooltip/tooltip.svelte.js';
import type { HighlighterManager } from '../Code/highlighter.svelte.js';

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
interface ThemeOptions {}

export interface ThemeState extends ThemeOptions {}

export class ThemeState {
	highlighter?: HighlighterManager;
	tooltip = $state<(TooltipProps & { ref: HTMLElement }) | null>(null);
	lastTooltipClosed = $state<number | null>(null);
	dialogs = $state<DialogState[]>([]);
	popovers = $state<PopoverState[]>([]);
	currentBreakpoint = $state<Breakpoint>('md');
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
