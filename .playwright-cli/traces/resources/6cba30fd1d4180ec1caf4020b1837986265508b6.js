import { injectQuery as __vite__injectQuery } from "/@vite/client";import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/client.js?v=1b1d2797");/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
import { BROWSER, DEV } from "/node_modules/.vite/deps/esm-env.js?v=1b1d2797";
import * as svelte from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { HttpError, Redirect, SvelteKitError } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/exports/internal/index.js?v=1b1d2797";
const { onMount, tick } = svelte;
// Svelte 4 and under don't have `untrack`, so we have to fallback if `untrack` is not exported
const untrack = svelte.untrack ?? ((value) => value());
import {
	decode_params,
	decode_pathname,
	strip_hash,
	make_trackable,
	normalize_path
} from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/utils/url.js?v=1b1d2797";
import { dev_fetch, initial_fetch, lock_fetch, subsequent_fetch, unlock_fetch } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/fetcher.js?v=1b1d2797";
import { parse, parse_server_route } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/parse.js?v=1b1d2797";
import * as storage from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/session-storage.js?v=1b1d2797";
import {
	find_anchor,
	resolve_url,
	get_link_info,
	get_router_options,
	is_external_url,
	origin,
	scroll_state,
	notifiable_store,
	create_updated_store,
	load_css
} from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/utils.js?v=1b1d2797";
import { base } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/app/paths/index.js?v=1b1d2797";
import * as devalue from "/node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/index.js?v=1b1d2797";
import {
	HISTORY_INDEX,
	NAVIGATION_INDEX,
	PRELOAD_PRIORITIES,
	SCROLL_KEY,
	STATES_KEY,
	SNAPSHOT_KEY,
	PAGE_URL_KEY
} from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/constants.js?v=1b1d2797";
import { validate_page_exports } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/utils/exports.js?v=1b1d2797";
import { noop } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/utils/functions.js?v=1b1d2797";
import { compact } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/utils/array.js?v=1b1d2797";
import {
	INVALIDATED_PARAM,
	TRAILING_SLASH_PARAM,
	create_remote_key,
	validate_depends,
	validate_load_response
} from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/shared.js?v=1b1d2797";
import { get_message, get_status } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/utils/error.js?v=1b1d2797";
import { writable } from "/node_modules/.vite/deps/svelte_store.js?v=1b1d2797";
import { page, update, navigating } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/state.svelte.js?v=1b1d2797";
import { add_data_suffix, add_resolution_suffix } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/pathname.js?v=1b1d2797";
import { noop_span } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/telemetry/noop.js?v=1b1d2797";
import { read_ndjson } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/client/ndjson.js?v=1b1d2797";

export { load_css };
const ICON_REL_ATTRIBUTES = new Set(['icon', 'shortcut icon', 'apple-touch-icon']);

let errored = false;
/**
 * Set via transformError, reset and read at the end of navigate.
 * Necessary because a navigation might succeed loading but during rendering
 * an error occurs, at which point the navigation result needs to be overridden with the error result.
 * TODO this is all very hacky, rethink for SvelteKit 3 where we can assume Svelte 5 and do an overhaul of client.js
 * @type {{ error: App.Error, status: number } | null}
 */
let rendering_error = null;

// We track the scroll position associated with each history entry in sessionStorage,
// rather than on history.state itself, because when navigation is driven by
// popstate it's too late to update the scroll position associated with the
// state we're navigating from
/**
 * history index -> { x, y }
 * @type {Record<number, { x: number; y: number }>}
 */
const scroll_positions = storage.get(SCROLL_KEY) ?? {};

/**
 * navigation index -> any
 * @type {Record<string, any[]>}
 */
const snapshots = storage.get(SNAPSHOT_KEY) ?? {};

if (DEV && BROWSER) {
	let warned = false;

	const warn = () => {
		if (warned) return;

		// Rather than saving a pointer to the original history methods, which would prevent monkeypatching by other libs,
		// inspect the stack trace to see if we're being called from within SvelteKit.
		let stack = new Error().stack?.split('\n');
		if (!stack) return;
		if (!stack[0].includes('https:') && !stack[0].includes('http:')) stack = stack.slice(1); // Chrome includes the error message in the stack

		// skip over `warn` and the place where `warn` was called
		const frame = stack[2];

		// ignore calls that happen inside dependencies, including SvelteKit.
		// `frame` can be falsy if we came from an anonymous function
		if (frame?.includes('node_modules')) return;

		warned = true;

		console.warn(
			"Avoid using `history.pushState(...)` and `history.replaceState(...)` as these will conflict with SvelteKit's router. Use the `pushState` and `replaceState` imports from `$app/navigation` instead."
		);
	};

	const push_state = history.pushState;
	history.pushState = (...args) => {
		warn();
		return push_state.apply(history, args);
	};

	const replace_state = history.replaceState;
	history.replaceState = (...args) => {
		warn();
		return replace_state.apply(history, args);
	};
}

export const stores = {
	url: /* @__PURE__ */ notifiable_store({}),
	page: /* @__PURE__ */ notifiable_store({}),
	navigating: /* @__PURE__ */ writable(
		/** @type {import('@sveltejs/kit').Navigation | null} */ (null)
	),
	updated: /* @__PURE__ */ create_updated_store()
};

/** @param {number} index */
function update_scroll_positions(index) {
	scroll_positions[index] = scroll_state();
}

/**
 * @param {number} current_history_index
 * @param {number} current_navigation_index
 */
function clear_onward_history(current_history_index, current_navigation_index) {
	// if we navigated back, then pushed a new state, we can
	// release memory by pruning the scroll/snapshot lookup
	let i = current_history_index + 1;
	while (scroll_positions[i]) {
		delete scroll_positions[i];
		i += 1;
	}

	i = current_navigation_index + 1;
	while (snapshots[i]) {
		delete snapshots[i];
		i += 1;
	}
}

/**
 * Loads `href` the old-fashioned way, with a full page reload.
 * Returns a `Promise` that never resolves (to prevent any
 * subsequent work, e.g. history manipulation, from happening)
 * @param {URL} url
 * @param {boolean} [replace] if `true`, will replace the current `history` entry rather than creating a new one with `pushState`
 * @returns {Promise<any>} a promise that never resolves
 */
function native_navigation(url, replace = false) {
	if (replace) {
		location.replace(url.href);
	} else {
		location.href = url.href;
	}
	return new Promise(noop);
}

/**
 * Checks whether a service worker is registered, and if it is,
 * tries to update it.
 */
async function update_service_worker() {
	if ('serviceWorker' in navigator) {
		const registration = await navigator.serviceWorker.getRegistration(base || '/');
		if (registration) {
			await registration.update();
		}
	}
}

/** @type {import('types').CSRRoute[]} All routes of the app. Only available when kit.router.resolution=client */
let routes;
/** @type {import('types').CSRPageNodeLoader} */
let default_layout_loader;
/** @type {import('types').CSRPageNodeLoader} */
let default_error_loader;
/** @type {HTMLElement} */
let container;
/** @type {HTMLElement} */
let target;

/** @type {import('./types.js').SvelteKitApp} */
export let app;

/**
 * Data that was serialized during SSR for queries/forms/commands, stored as
 * `{ v }` (value) or `{ e }` (error) nodes so that failed states survive hydration.
 * Entries are deleted as they are consumed (when the corresponding resource is created).
 * @type {Record<string, RemoteFunctionDataNode>}
 */
export const query_responses = {};

/**
 * Data that was serialized during SSR for prerender functions, stored as
 * `{ v }` (value) or `{ e }` (error) nodes.
 * This persists across client-side navigations.
 * @type {Record<string, RemoteFunctionDataNode>}
 */
export const prerender_responses = {};

/** @type {Array<((url: URL) => boolean)>} */
const invalidated = [];

/**
 * An array of the `+layout.svelte` and `+page.svelte` component instances
 * that currently live on the page — used for capturing and restoring snapshots.
 * It's updated/manipulated through `bind:this` in `Root.svelte`.
 * @type {import('svelte').SvelteComponent[]}
 */
const components = [];

/** @type {{id: string, token: {}, promise: Promise<import('./types.js').NavigationResult>, fork: Promise<import('svelte').Fork | null> | null} | null} */
let load_cache = null;

function discard_load_cache() {
	void load_cache?.fork?.then((f) => f?.discard());
	load_cache = null;
	current_a = { element: undefined, href: undefined };
}

/**
 * @type {Map<string, Promise<URL>>}
 * Cache for client-side rerouting, since it could contain async calls which we want to
 * avoid running multiple times which would slow down navigations (e.g. else preloading
 * wouldn't help because on navigation it would be called again). Since `reroute` should be
 * a pure function (i.e. always return the same) value it's safe to cache across navigations.
 * The server reroute calls don't need to be cached because they are called using `import(...)`
 * which is cached per the JS spec.
 */
const reroute_cache = new Map();

/**
 * Note on before_navigate_callbacks, on_navigate_callbacks and after_navigate_callbacks:
 * do not re-assign as some closures keep references to these Sets
 */
/** @type {Set<(navigation: import('@sveltejs/kit').BeforeNavigate) => void>} */
const before_navigate_callbacks = new Set();

/** @type {Set<(navigation: import('@sveltejs/kit').OnNavigate) => import('types').MaybePromise<(() => void) | void>>} */
const on_navigate_callbacks = new Set();

/** @type {Set<(navigation: import('@sveltejs/kit').AfterNavigate) => void>} */
const after_navigate_callbacks = new Set();

/** @type {import('./types.js').NavigationState & { nav: import('@sveltejs/kit').NavigationEvent }} */
let current = {
	branch: [],
	error: null,
	// @ts-ignore - we need the initial value to be null
	url: null,
	// @ts-ignore - we need the initial value to be null
	nav: null
};

/** this being true means we SSR'd */
let hydrated = false;
let started = false;
let autoscroll = true;
let updating = false;
let is_navigating = false;
let hash_navigating = false;
/** True as soon as there happened one client-side navigation (excluding the SvelteKit-initialized initial one when in SPA mode) */
let has_navigated = false;

let force_invalidation = false;

/** @type {import('svelte').SvelteComponent} */
let root;

/** @type {number} keeping track of the history index in order to prevent popstate navigation events if needed */
let current_history_index;

/** @type {number} */
let current_navigation_index;

/** @type {{}} */
let token;

/**
 * A set of tokens which are associated to current preloads.
 * If a preload becomes a real navigation, it's removed from the set.
 * If a preload token is in the set and the preload errors, the error
 * handling logic (for example reloading) is skipped.
 */
/** @type {Set<{}>} */
const preload_tokens = new Set();

/** @type {Promise<void> | null} */
export let pending_invalidate;

/**
 * @type {Map<string, Map<string, CacheEntry<Query<any>>>>}
 * A map of query id -> payload -> query internals for all active queries.
 */
export const query_map = new Map();

/**
 * @type {Map<string, Map<string, CacheEntry<LiveQuery<any>>>>}
 * A map of id -> payload -> live query internals for all active queries.
 */
export const live_query_map = new Map();

/**
 * @param {import('./types.js').SvelteKitApp} _app
 * @param {HTMLElement} _target
 * @param {Parameters<typeof _hydrate>[1]} [hydrate]
 */
export async function start(_app, _target, hydrate) {
	if (DEV && _target === document.body) {
		console.warn(
			'Placing %sveltekit.body% directly inside <body> is not recommended, as your app may break for users who have certain browser extensions installed.\n\nConsider wrapping it in an element:\n\n<div style="display: contents">\n  %sveltekit.body%\n</div>'
		);
	}

	if (__SVELTEKIT_PAYLOAD__.data) {
		const { q = {}, p = {}, l = {}, f = {} } = __SVELTEKIT_PAYLOAD__.data;

		// store the whole nodes — error records seed the corresponding
		// resources in a failed state when they are created during hydration
		for (const k in q) query_responses[k] = q[k];
		for (const k in l) query_responses[k] = l[k];
		for (const k in f) query_responses[k] = f[k];
		for (const k in p) prerender_responses[k] = p[k];
	}

	// detect basic auth credentials in the current URL
	// https://github.com/sveltejs/kit/pull/11179
	// if so, refresh the page without credentials
	if (document.URL !== location.href) {
		// eslint-disable-next-line no-self-assign
		location.href = location.href;
	}

	app = _app;

	await _app.hooks.init?.();

	routes = __SVELTEKIT_CLIENT_ROUTING__ ? parse(_app) : [];
	container = __SVELTEKIT_EMBEDDED__ ? _target : document.documentElement;
	target = _target;

	// we import the root layout/error nodes eagerly, so that
	// connectivity errors after initialisation don't nuke the app
	default_layout_loader = _app.nodes[0];
	default_error_loader = _app.nodes[1];
	void default_layout_loader();
	void default_error_loader();

	current_history_index = history.state?.[HISTORY_INDEX];
	current_navigation_index = history.state?.[NAVIGATION_INDEX];

	if (!current_history_index) {
		// we use Date.now() as an offset so that cross-document navigations
		// within the app don't result in data loss
		current_history_index = current_navigation_index = Date.now();

		// create initial history entry, so we can return here
		history.replaceState(
			{
				...history.state,
				[HISTORY_INDEX]: current_history_index,
				[NAVIGATION_INDEX]: current_navigation_index
			},
			''
		);
	}

	// if we reload the page, or Cmd-Shift-T back to it,
	// recover scroll position
	const scroll = scroll_positions[current_history_index];
	function restore_scroll() {
		if (scroll) {
			history.scrollRestoration = 'manual';
			scrollTo(scroll.x, scroll.y);
		}
	}

	if (hydrate) {
		restore_scroll();

		await _hydrate(target, hydrate);
	} else {
		await navigate({
			type: 'enter',
			url: resolve_url(app.hash ? decode_hash(new URL(location.href)) : location.href),
			replace_state: true
		});

		restore_scroll();
	}

	_start_router();
}

async function _invalidate(include_load_functions = true, reset_page_state = true) {
	// Accept all invalidations as they come, don't swallow any while another invalidation
	// is running because subsequent invalidations may make earlier ones outdated,
	// but batch multiple synchronous invalidations.
	await (pending_invalidate ||= Promise.resolve());
	if (!pending_invalidate) return;
	pending_invalidate = null;

	const nav_token = (token = {});
	const intent = await get_navigation_intent(current.url, true);

	// Clear preload, it might be affected by the invalidation.
	// Also solves an edge case where a preload is triggered, the navigation for it
	// was then triggered and is still running while the invalidation kicks in,
	// at which point the invalidation should take over and "win".
	discard_load_cache();

	// Rerun queries
	/** @type {Map<string, Promise<void>>} */
	const live_query_reconnects = new Map();
	if (force_invalidation) {
		for (const entries of query_map.values()) {
			for (const { resource } of entries.values()) {
				void resource.refresh();
			}
		}

		for (const [query_id, entries] of live_query_map) {
			for (const [payload, { resource }] of entries) {
				const key = create_remote_key(query_id, payload);
				const promise = resource.reconnect();
				promise.catch(noop);
				live_query_reconnects.set(key, promise);
			}
		}
	}

	if (include_load_functions) {
		const prev_state = page.state;
		const navigation_result = intent && (await load_route(intent));
		if (!navigation_result || nav_token !== token) return;

		if (navigation_result.type === 'redirect') {
			return _goto(
				new URL(navigation_result.location, current.url).href,
				{ replaceState: true },
				1,
				nav_token
			);
		}

		// This is a bit hacky but allows us not having to pass that boolean around, making things harder to reason about
		if (!reset_page_state) {
			navigation_result.props.page.state = prev_state;
		}
		update(navigation_result.props.page);
		current = { ...navigation_result.state, nav: current.nav };
		reset_invalidation();
		root.$set(navigation_result.props);
	} else {
		reset_invalidation();
	}

	// only wait for promises that are connected to queries that still exist
	/** @type {Promise<any>[]} */
	const promises = [];
	for (const entries of query_map.values()) {
		for (const { resource } of entries.values()) {
			promises.push(resource);
		}
	}
	for (const [query_id, entries] of live_query_map) {
		for (const payload of entries.keys()) {
			const key = create_remote_key(query_id, payload);
			const promise = live_query_reconnects.get(key);
			if (promise) {
				promises.push(promise);
			}
		}
	}

	// Don't use allSettled yet because it's too new
	await Promise.all(promises).catch(noop);
}

function reset_invalidation() {
	invalidated.length = 0;
	force_invalidation = false;
}

/** @param {number} index */
function capture_snapshot(index) {
	if (components.some((c) => c?.snapshot)) {
		snapshots[index] = components.map((c) => c?.snapshot?.capture());
	}
}

/** @param {number} index */
function restore_snapshot(index) {
	snapshots[index]?.forEach((value, i) => {
		components[i]?.snapshot?.restore(value);
	});
}

function persist_state() {
	update_scroll_positions(current_history_index);
	storage.set(SCROLL_KEY, scroll_positions);

	capture_snapshot(current_navigation_index);
	storage.set(SNAPSHOT_KEY, snapshots);
}

/**
 * @param {string | URL} url
 * @param {{ replaceState?: boolean; noScroll?: boolean; keepFocus?: boolean; invalidateAll?: boolean; invalidate?: Array<string | URL | ((url: URL) => boolean)>; state?: Record<string, any> }} options
 * @param {number} redirect_count
 * @param {{}} [nav_token]
 * @returns {Promise<void>}
 */
export async function _goto(url, options, redirect_count, nav_token) {
	/** @type {Set<string>} */
	let query_keys;
	/** @type {Set<string>} */
	let live_query_keys;

	// Clear preload cache when invalidateAll is true to ensure fresh data
	// after form submissions or explicit invalidations
	if (options.invalidateAll) {
		discard_load_cache();
	}

	await navigate({
		type: 'goto',
		url: resolve_url(url),
		keepfocus: options.keepFocus,
		noscroll: options.noScroll,
		replace_state: options.replaceState,
		state: options.state,
		redirect_count,
		nav_token,
		accept: () => {
			if (options.invalidateAll) {
				force_invalidation = true;
				query_keys = new Set();
				for (const [id, entries] of query_map) {
					for (const [payload, entry] of entries) {
						// don't refresh yet, as some queries will be unrendered,
						// but clear caches so that newly rendered queries
						// don't use stale data. TODO same for `live_query_map`
						entry.resource?.reset();
						query_keys.add(create_remote_key(id, payload));
					}
				}
				live_query_keys = new Set();
				for (const [id, entries] of live_query_map) {
					for (const payload of entries.keys()) {
						live_query_keys.add(create_remote_key(id, payload));
					}
				}
			}

			if (options.invalidate) {
				options.invalidate.forEach(push_invalidated);
			}
		}
	});

	if (options.invalidateAll) {
		// TODO the ticks shouldn't be necessary, something inside Svelte itself is buggy
		// when a query in a layout that still exists after page change is refreshed earlier than this
		void svelte
			.tick()
			.then(svelte.tick)
			.then(() => {
				for (const [id, entries] of query_map) {
					for (const [payload, { resource }] of entries) {
						if (query_keys?.has(create_remote_key(id, payload))) {
							void resource.start();
						}
					}
				}
				for (const [id, entries] of live_query_map) {
					for (const [payload, { resource }] of entries) {
						if (live_query_keys?.has(create_remote_key(id, payload))) {
							void resource.reconnect();
						}
					}
				}
			});
	}
}

/** @param {import('./types.js').NavigationIntent} intent */
async function _preload_data(intent) {
	// Reuse the existing pending preload if it's for the same navigation.
	// Prevents an edge case where same preload is triggered multiple times,
	// then a later one is becoming the real navigation and the preload tokens
	// get out of sync.
	if (intent.id !== load_cache?.id) {
		discard_load_cache();

		const preload = {};
		preload_tokens.add(preload);
		load_cache = {
			id: intent.id,
			token: preload,
			promise: load_route({ ...intent, preload }).then((result) => {
				preload_tokens.delete(preload);
				if (result.type === 'loaded' && result.state.error) {
					// Don't cache errors, because they might be transient
					discard_load_cache();
				}
				return result;
			}),
			fork: null
		};

		if (__SVELTEKIT_FORK_PRELOADS__ && svelte.fork) {
			const lc = load_cache;

			lc.fork = lc.promise.then((result) => {
				// if load_cache was discarded before load_cache.promise could
				// resolve, bail rather than creating an orphan fork
				if (lc === load_cache && result.type === 'loaded') {
					try {
						return svelte.fork(() => {
							root.$set(result.props);
							update(result.props.page);
						});
					} catch {
						// if it errors, it's because the experimental flag isn't enabled in Svelte
					}
				}

				return null;
			});
		}
	}

	return load_cache.promise;
}

/**
 * @param {URL} url
 * @returns {Promise<void>}
 */
async function _preload_code(url) {
	const route = (await get_navigation_intent(url, false))?.route;

	if (route) {
		await Promise.all(
			/** @type {[has_server_load: boolean, node_loader: import('types').CSRPageNodeLoader][]} */ (
				[...route.layouts, route.leaf].filter(Boolean)
			).map((load) => load[1]())
		);
	}
}

/**
 * @param {import('./types.js').NavigationFinished} result
 * @param {HTMLElement} target
 * @param {boolean} hydrate
 */
async function initialize(result, target, hydrate) {
	if (__SVELTEKIT_DEV__ && result.state.error && document.querySelector('vite-error-overlay'))
		return;

	/** @type {import('@sveltejs/kit').NavigationEvent} */
	const nav = {
		params: current.params,
		route: { id: current.route?.id ?? null },
		url: new URL(location.href)
	};

	current = {
		...result.state,
		nav
	};

	// Removes the style node we used to avoid FOUC during development
	if (__SVELTEKIT_DEV__) {
		const style = document.querySelector('style[data-sveltekit]');
		if (style) style.remove();
	}

	update(/** @type {import('@sveltejs/kit').Page} */ (result.props.page));

	root = new app.root({
		target,
		props: { ...result.props, stores, components },
		hydrate,
		// @ts-ignore Svelte 5 specific: asynchronously instantiate the component, i.e. don't call flushSync
		sync: false,
		// @ts-ignore Svelte 5 specific: transformError allows to transform errors before they are passed to boundaries
		transformError: __SVELTEKIT_EXPERIMENTAL_USE_TRANSFORM_ERROR__
			? /** @param {unknown} e */ async (e) => {
					const error = await handle_error(e, current.nav);
					rendering_error = { error, status: get_status(e) };
					page.error = error;
					page.status = rendering_error.status;
					return error;
				}
			: undefined
	});

	// Wait for a microtask in case svelte experimental async is enabled,
	// which causes component script blocks to run asynchronously
	void (await Promise.resolve());

	if (hydrate) {
		/** @type {import('@sveltejs/kit').AfterNavigate} */
		const navigation = {
			from: null,
			to: {
				...nav,
				scroll: scroll_positions[current_history_index] ?? scroll_state()
			},
			willUnload: false,
			type: 'enter',
			complete: Promise.resolve()
		};

		after_navigate_callbacks.forEach((fn) => fn(navigation));
	}

	restore_snapshot(current_navigation_index);

	started = true;
}

/**
 *
 * @param {{
 *   url: URL;
 *   params: Record<string, string>;
 *   branch: Array<import('./types.js').BranchNode | undefined>;
 *   errors?: Array<import('types').CSRPageNodeLoader | undefined>;
 *   status: number;
 *   error: App.Error | null;
 *   route: import('types').CSRRoute | null;
 *   form?: Record<string, any> | null;
 * }} opts
 */
async function get_navigation_result_from_branch({
	url,
	params,
	branch,
	errors,
	status,
	error,
	route,
	form
}) {
	/** @type {import('types').TrailingSlash} */
	let slash = 'never';

	// if `paths.base === '/a/b/c`, then the root route is always `/a/b/c/`, regardless of
	// the `trailingSlash` route option, so that relative paths to JS and CSS work
	if (base && (url.pathname === base || url.pathname === base + '/')) {
		slash = 'always';
	} else {
		for (const node of branch) {
			if (node?.slash !== undefined) slash = node.slash;
		}
	}

	url.pathname = normalize_path(url.pathname, slash);
	// eslint-disable-next-line no-self-assign
	url.search = url.search; // turn `/?` into `/`

	/** @type {import('./types.js').NavigationFinished} */
	const result = {
		type: 'loaded',
		state: {
			url,
			params,
			branch,
			error,
			route
		},
		props: {
			// @ts-ignore Somehow it's getting SvelteComponent and SvelteComponentDev mixed up
			constructors: compact(branch).map((branch_node) => branch_node.node.component),
			page: clone_page(page)
		}
	};

	if (errors && __SVELTEKIT_EXPERIMENTAL_USE_TRANSFORM_ERROR__) {
		let last_idx = -1;
		result.props.errors = await Promise.all(
			// eslint-disable-next-line @typescript-eslint/await-thenable
			branch
				.map((b, i) => {
					if (i === 0) return undefined; // root layout wraps root error component, not the other way around
					if (!b) return null;

					i--;
					// Find the closest error component up to the previous branch
					while (i > last_idx + 1 && !errors[i]) i -= 1;
					last_idx = i;
					return errors[i]?.()
						.then((e) => e.component)
						.catch(() => undefined);
				})
				// filter out indexes where there was no branch, but keep indexes where there was a branch but no error component
				.filter((e) => e !== null)
		);
	}

	if (error && __SVELTEKIT_EXPERIMENTAL_USE_TRANSFORM_ERROR__) {
		result.props.error = error;
	}

	if (form !== undefined) {
		result.props.form = form;
	}

	let data = {};
	let data_changed = !page;

	let p = 0;

	for (let i = 0; i < Math.max(branch.length, current.branch.length); i += 1) {
		const node = branch[i];
		const prev = current.branch[i];

		if (node?.data !== prev?.data) data_changed = true;
		if (!node) continue;

		data = { ...data, ...node.data };

		// Only set props if the node actually updated. This prevents needless rerenders.
		if (data_changed) {
			result.props[`data_${p}`] = data;
		}

		p += 1;
	}

	const page_changed =
		!current.url ||
		url.href !== current.url.href ||
		current.error !== error ||
		(form !== undefined && form !== page.form) ||
		data_changed;

	if (page_changed) {
		result.props.page = {
			error,
			params,
			route: {
				id: route?.id ?? null
			},
			state: {},
			status,
			url: new URL(url),
			form: form ?? null,
			// The whole page store is updated, but this way the object reference stays the same
			data: data_changed ? data : page.data
		};
	}

	return result;
}

/**
 * Call the universal load function of the given node, if it exists.
 *
 * @param {{
 *   loader: import('types').CSRPageNodeLoader;
 * 	 parent: () => Promise<Record<string, any>>;
 *   url: URL;
 *   params: Record<string, string>;
 *   route: { id: string | null };
 * 	 server_data_node: import('./types.js').DataNode | null;
 * }} options
 * @returns {Promise<import('./types.js').BranchNode>}
 */
async function load_node({ loader, parent, url, params, route, server_data_node }) {
	/** @type {Record<string, any> | null} */
	let data = null;

	let is_tracking = true;

	/** @type {import('types').Uses} */
	const uses = {
		dependencies: new Set(),
		params: new Set(),
		parent: false,
		route: false,
		url: false,
		search_params: new Set()
	};

	const node = await loader();

	if (DEV) {
		validate_page_exports(node.universal);

		if (node.universal && app.hash) {
			const options = Object.keys(node.universal).filter((o) => o !== 'load');

			if (options.length > 0) {
				throw new Error(
					`Page options are ignored when \`router.type === 'hash'\` (${route.id} has ${options
						.filter((o) => o !== 'load')
						.map((o) => `'${o}'`)
						.join(', ')})`
				);
			}
		}
	}

	if (__SVELTEKIT_HAS_UNIVERSAL_LOAD__ && node.universal?.load) {
		/** @param {string[]} deps */
		function depends(...deps) {
			for (const dep of deps) {
				if (DEV) validate_depends(/** @type {string} */ (route.id), dep);

				const { href } = new URL(dep, url);
				uses.dependencies.add(href);
			}
		}

		/** @type {import('@sveltejs/kit').LoadEvent} */
		const load_input = {
			tracing: { enabled: false, root: noop_span, current: noop_span },
			route: new Proxy(route, {
				get: (target, key) => {
					if (is_tracking) {
						uses.route = true;
					}
					return target[/** @type {'id'} */ (key)];
				}
			}),
			params: new Proxy(params, {
				get: (target, key) => {
					if (is_tracking) {
						uses.params.add(/** @type {string} */ (key));
					}
					return target[/** @type {string} */ (key)];
				}
			}),
			data: server_data_node?.data ?? null,
			url: make_trackable(
				url,
				() => {
					if (is_tracking) {
						uses.url = true;
					}
				},
				(param) => {
					if (is_tracking) {
						uses.search_params.add(param);
					}
				},
				app.hash
			),
			async fetch(resource, init) {
				if (resource instanceof Request) {
					// we're not allowed to modify the received `Request` object, so in order
					// to fixup relative urls we create a new equivalent `init` object instead
					init = {
						// the request body must be consumed in memory until browsers
						// implement streaming request bodies and/or the body getter
						body:
							resource.method === 'GET' || resource.method === 'HEAD'
								? undefined
								: await resource.blob(),
						cache: resource.cache,
						credentials: resource.credentials,
						// the server sets headers to `undefined` if there are no headers but
						// the client defaults to an empty Headers object in the Request object.
						// To keep the two values in sync, we explicitly set the headers to `undefined`.
						// Also, not sure why, but sometimes 0 is evaluated as truthy so we need to
						// explicitly compare the headers length to a number here
						headers: [...resource.headers].length > 0 ? resource?.headers : undefined,
						integrity: resource.integrity,
						keepalive: resource.keepalive,
						method: resource.method,
						mode: resource.mode,
						redirect: resource.redirect,
						referrer: resource.referrer,
						referrerPolicy: resource.referrerPolicy,
						signal: resource.signal,
						...init
					};
				}

				const { resolved, promise } = resolve_fetch_url(resource, init, url);

				if (is_tracking) {
					depends(resolved.href);
				}

				return promise;
			},
			setHeaders: noop,
			depends,
			parent() {
				if (is_tracking) {
					uses.parent = true;
				}
				return parent();
			},
			untrack(fn) {
				is_tracking = false;
				try {
					return fn();
				} finally {
					is_tracking = true;
				}
			}
		};

		if (DEV) {
			try {
				lock_fetch();
				data = (await node.universal.load.call(null, load_input)) ?? null;
				validate_load_response(data, `related to route '${route.id}'`);
			} finally {
				unlock_fetch();
			}
		} else {
			data = (await node.universal.load.call(null, load_input)) ?? null;
		}
	}

	return {
		node,
		loader,
		server: server_data_node,
		universal: node.universal?.load ? { type: 'data', data, uses } : null,
		data: data ?? server_data_node?.data ?? null,
		slash: node.universal?.trailingSlash ?? server_data_node?.slash
	};
}

/**
 * @param {Request | string | URL} input
 * @param {RequestInit | undefined} init
 * @param {URL} url
 */
function resolve_fetch_url(input, init, url) {
	let requested = input instanceof Request ? input.url : input;

	// we must fixup relative urls so they are resolved from the target page
	const resolved = new URL(requested, url);

	// match ssr serialized data url, which is important to find cached responses
	if (resolved.origin === url.origin) {
		requested = resolved.href.slice(url.origin.length);
	}

	// prerendered pages may be served from any origin, so `initial_fetch` urls shouldn't be resolved
	const promise = started
		? subsequent_fetch(requested, resolved.href, init)
		: initial_fetch(requested, init);

	return { resolved, promise };
}

/**
 * @param {boolean} parent_changed
 * @param {boolean} route_changed
 * @param {boolean} url_changed
 * @param {Set<string>} search_params_changed
 * @param {import('types').Uses | undefined} uses
 * @param {Record<string, string>} params
 */
function has_changed(
	parent_changed,
	route_changed,
	url_changed,
	search_params_changed,
	uses,
	params
) {
	if (force_invalidation) return true;

	if (!uses) return false;

	if (uses.parent && parent_changed) return true;
	if (uses.route && route_changed) return true;
	if (uses.url && url_changed) return true;

	for (const tracked_params of uses.search_params) {
		if (search_params_changed.has(tracked_params)) return true;
	}

	for (const param of uses.params) {
		if (params[param] !== current.params[param]) return true;
	}

	for (const href of uses.dependencies) {
		if (invalidated.some((fn) => fn(new URL(href)))) return true;
	}

	return false;
}

/**
 * @param {import('types').ServerDataNode | import('types').ServerDataSkippedNode | null} node
 * @param {import('./types.js').DataNode | null} [previous]
 * @returns {import('./types.js').DataNode | null}
 */
function create_data_node(node, previous) {
	if (node?.type === 'data') return node;
	if (node?.type === 'skip') return previous ?? null;
	return null;
}

/**
 * @param {URL | null} old_url
 * @param {URL} new_url
 */
function diff_search_params(old_url, new_url) {
	if (!old_url) return new Set(new_url.searchParams.keys());

	const changed = new Set([...old_url.searchParams.keys(), ...new_url.searchParams.keys()]);

	for (const key of changed) {
		const old_values = old_url.searchParams.getAll(key);
		const new_values = new_url.searchParams.getAll(key);

		if (
			old_values.every((value) => new_values.includes(value)) &&
			new_values.every((value) => old_values.includes(value))
		) {
			changed.delete(key);
		}
	}

	return changed;
}

/**
 * @param {Omit<import('./types.js').NavigationFinished['state'], 'branch'> & { error: App.Error }} opts
 * @returns {import('./types.js').NavigationFinished}
 */
function preload_error({ error, url, route, params }) {
	return {
		type: 'loaded',
		state: {
			error,
			url,
			route,
			params,
			branch: []
		},
		props: {
			page: clone_page(page),
			constructors: []
		}
	};
}

/**
 * @overload
 * @param {import('./types.js').NavigationIntent} intent
 * @returns {Promise<import('./types.js').NavigationResult | undefined>}
 */
/**
 * @overload
 * @param {import('./types.js').NavigationIntent & { preload: {} }} intent
 * @returns {Promise<import('./types.js').NavigationResult>}
 */
/**
 * @param {import('./types.js').NavigationIntent & { preload?: {} }} intent
 * @returns {Promise<import('./types.js').NavigationResult | undefined>}
 */
async function load_route({ id, invalidating, url, params, route, preload }) {
	if (load_cache?.id === id) {
		// the preload becomes the real navigation
		preload_tokens.delete(load_cache.token);
		return load_cache.promise;
	}

	const { errors, layouts, leaf } = route;

	const loaders = [...layouts, leaf];

	// preload modules to avoid waterfall, but handle rejections
	// so they don't get reported to Sentry et al (we don't need
	// to act on the failures at this point)
	errors.forEach((loader) => loader?.().catch(noop));
	loaders.forEach((loader) => loader?.[1]().catch(noop));

	/** @type {import('types').ServerNodesResponse | import('types').ServerRedirectNode | null} */
	let server_data = null;
	const url_changed = current.url ? id !== get_page_key(current.url) : false;
	const route_changed = current.route ? route.id !== current.route.id : false;
	const search_params_changed = diff_search_params(current.url, url);

	let parent_invalid = false;

	if (__SVELTEKIT_HAS_SERVER_LOAD__) {
		const invalid_server_nodes = loaders.map((loader, i) => {
			const previous = current.branch[i];

			const invalid =
				!!loader?.[0] &&
				(previous?.loader !== loader[1] ||
					has_changed(
						parent_invalid,
						route_changed,
						url_changed,
						search_params_changed,
						previous.server?.uses,
						params
					));

			if (invalid) {
				// For the next one
				parent_invalid = true;
			}

			return invalid;
		});

		if (invalid_server_nodes.some(Boolean)) {
			try {
				server_data = await load_data(url, invalid_server_nodes);
			} catch (error) {
				const handled_error = await handle_error(error, { url, params, route: { id } });

				if (preload && preload_tokens.has(preload)) {
					return preload_error({ error: handled_error, url, params, route });
				}

				return load_root_error_page({
					status: get_status(error),
					error: handled_error,
					url,
					route
				});
			}

			if (server_data.type === 'redirect') {
				return server_data;
			}
		}
	}

	const server_data_nodes = server_data?.nodes;

	let parent_changed = false;

	const branch_promises = loaders.map(async (loader, i) => {
		if (!loader) return;

		/** @type {import('./types.js').BranchNode | undefined} */
		const previous = current.branch[i];

		const server_data_node = server_data_nodes?.[i];

		// reuse data from previous load if it's still valid
		const valid =
			(!server_data_node || server_data_node.type === 'skip') &&
			loader[1] === previous?.loader &&
			!has_changed(
				parent_changed,
				route_changed,
				url_changed,
				search_params_changed,
				previous.universal?.uses,
				params
			);
		if (valid) return previous;

		parent_changed = true;

		if (server_data_node?.type === 'error') {
			// rethrow and catch below
			throw server_data_node;
		}

		return load_node({
			loader: loader[1],
			url,
			params,
			route,
			parent: async () => {
				const data = {};
				for (let j = 0; j < i; j += 1) {
					Object.assign(data, (await branch_promises[j])?.data);
				}
				return data;
			},
			server_data_node: create_data_node(
				// server_data_node is undefined if it wasn't reloaded from the server;
				// and if current loader uses server data, we want to reuse previous data.
				server_data_node === undefined && loader[0] ? { type: 'skip' } : (server_data_node ?? null),
				loader[0] ? previous?.server : undefined
			)
		});
	});

	// if we don't do this, rejections will be unhandled
	for (const p of branch_promises) p.catch(noop);

	/** @type {Array<import('./types.js').BranchNode | undefined>} */
	const branch = [];

	for (let i = 0; i < loaders.length; i += 1) {
		if (loaders[i]) {
			try {
				branch.push(await branch_promises[i]);
			} catch (err) {
				if (err instanceof Redirect) {
					return {
						type: 'redirect',
						location: err.location
					};
				}

				if (preload && preload_tokens.has(preload)) {
					return preload_error({
						error: await handle_error(err, { params, url, route: { id: route.id } }),
						url,
						params,
						route
					});
				}

				let status = get_status(err);
				/** @type {App.Error} */
				let error;

				if (server_data_nodes?.includes(/** @type {import('types').ServerErrorNode} */ (err))) {
					// this is the server error rethrown above, reconstruct but don't invoke
					// the client error handler; it should've already been handled on the server
					status = /** @type {import('types').ServerErrorNode} */ (err).status ?? status;
					error = /** @type {import('types').ServerErrorNode} */ (err).error;
				} else if (err instanceof HttpError) {
					error = err.body;
				} else {
					// Referenced node could have been removed due to redeploy, check
					const updated = await stores.updated.check();
					if (updated) {
						// Before reloading, try to update the service worker if it exists
						await update_service_worker();
						return await native_navigation(url);
					}

					error = await handle_error(err, { params, url, route: { id: route.id } });
				}

				const error_load = await load_nearest_error_page(i, branch, errors);
				if (error_load) {
					return get_navigation_result_from_branch({
						url,
						params,
						branch: branch.slice(0, error_load.idx).concat(error_load.node),
						errors,
						status,
						error,
						route
					});
				} else {
					return await server_fallback(url, { id: route.id }, error, status);
				}
			}
		} else {
			// push an empty slot so we can rewind past gaps to the
			// layout that corresponds with an +error.svelte page
			branch.push(undefined);
		}
	}

	return get_navigation_result_from_branch({
		url,
		params,
		branch,
		errors,
		status: 200,
		error: null,
		route,
		// Reset `form` on navigation, but not invalidation
		form: invalidating ? undefined : null
	});
}

/**
 * @param {number} i Start index to backtrack from
 * @param {Array<import('./types.js').BranchNode | undefined>} branch Branch to backtrack
 * @param {Array<import('types').CSRPageNodeLoader | undefined>} errors All error pages for this branch
 * @returns {Promise<{idx: number; node: import('./types.js').BranchNode} | undefined>}
 */
async function load_nearest_error_page(i, branch, errors) {
	while (i--) {
		if (errors[i]) {
			let j = i;
			while (!branch[j]) j -= 1;
			try {
				return {
					idx: j + 1,
					node: {
						node: await /** @type {import('types').CSRPageNodeLoader } */ (errors[i])(),
						loader: /** @type {import('types').CSRPageNodeLoader } */ (errors[i]),
						data: {},
						server: null,
						universal: null
					}
				};
			} catch {
				continue;
			}
		}
	}
}

/**
 * @param {{
 *   status: number;
 *   error: App.Error;
 *   url: URL;
 *   route: { id: string | null }
 * }} opts
 * @returns {Promise<import('./types.js').NavigationFinished | undefined>} returns `undefined` in case of a redirect
 */
async function load_root_error_page({ status, error, url, route }) {
	/** @type {Record<string, string>} */
	const params = {}; // error page does not have params

	/** @type {import('types').ServerDataNode | null} */
	let server_data_node = null;

	if (__SVELTEKIT_HAS_SERVER_LOAD__) {
		const default_layout_has_server_load = app.server_loads[0] === 0;

		if (default_layout_has_server_load) {
			// TODO post-https://github.com/sveltejs/kit/discussions/6124 we can use
			// existing root layout data
			try {
				const server_data = await load_data(url, [true]);

				if (
					server_data.type !== 'data' ||
					(server_data.nodes[0] && server_data.nodes[0].type !== 'data')
				) {
					throw 0;
				}

				server_data_node = server_data.nodes[0] ?? null;
			} catch (e) {
				// at this point we have no choice but to fall back to the server, if it wouldn't
				// bring us right back here, turning this into an endless loop.
				// if __data.json returned 404, the route doesn't exist — don't reload or we loop
				if (
					!(e instanceof HttpError && e.status === 404) &&
					(url.origin !== origin || url.pathname !== location.pathname || hydrated)
				) {
					return await native_navigation(url);
				}
			}
		}
	}

	try {
		const root_layout = await load_node({
			loader: default_layout_loader,
			url,
			params,
			route,
			parent: () => Promise.resolve({}),
			server_data_node: create_data_node(server_data_node)
		});

		/** @type {import('./types.js').BranchNode} */
		const root_error = {
			node: await default_error_loader(),
			loader: default_error_loader,
			universal: null,
			server: null,
			data: null
		};

		return get_navigation_result_from_branch({
			url,
			params,
			branch: [root_layout, root_error],
			status,
			error,
			errors: [],
			route: null
		});
	} catch (error) {
		// client-side navigation if the root layout loader throws a redirect while
		// rendering the default error page
		if (error instanceof Redirect) {
			await _goto(new URL(error.location, location.href), {}, 0);
			return;
		}

		// otherwise, render the static error page
		const error_template = await app.get_error_template();
		const handled = await handle_error(error, { url, params, route });
		const message = String(handled?.message ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		const html = error_template({ status, message });
		const parsed = new DOMParser().parseFromString(html, 'text/html');
		document.documentElement.replaceChild(document.adoptNode(parsed.head), document.head);
		document.documentElement.replaceChild(document.adoptNode(parsed.body), document.body);

		throw error;
	}
}

/**
 * Resolve the relative rerouted URL for a client-side navigation
 * @param {URL} url
 * @returns {Promise<URL | undefined>}
 */
async function get_rerouted_url(url) {
	const href = url.href;

	if (reroute_cache.has(href)) {
		return reroute_cache.get(href);
	}

	let rerouted;

	try {
		const promise = (async () => {
			// reroute could alter the given URL, so we pass a copy
			let rerouted =
				(await app.hooks.reroute({
					url: new URL(url),
					fetch: async (input, init) => {
						return resolve_fetch_url(input, init, url).promise;
					}
				})) ?? url;

			if (typeof rerouted === 'string') {
				const tmp = new URL(url); // do not mutate the incoming URL

				if (app.hash) {
					tmp.hash = rerouted;
				} else {
					tmp.pathname = rerouted;
				}

				rerouted = tmp;
			}

			return rerouted;
		})();

		reroute_cache.set(href, promise);
		rerouted = await promise;
	} catch (e) {
		reroute_cache.delete(href);
		if (DEV) {
			// in development, print the error...
			console.error(e);

			// ...and pause execution, since otherwise we will immediately reload the page
			debugger; // eslint-disable-line
		}

		// fall back to native navigation
		return;
	}

	return rerouted;
}

/**
 * Resolve the full info (which route, params, etc.) for a client-side navigation from the URL,
 * taking the reroute hook into account. If this isn't a client-side-navigation (or the URL is undefined),
 * returns undefined.
 * @param {URL | undefined} url
 * @param {boolean} invalidating
 * @returns {Promise<import('./types.js').NavigationIntent | undefined>}
 */
export async function get_navigation_intent(url, invalidating) {
	if (!url) return;
	if (is_external_url(url, base, app.hash)) return;

	if (__SVELTEKIT_CLIENT_ROUTING__) {
		const rerouted = await get_rerouted_url(url);
		if (!rerouted) return;

		const path = get_url_path(rerouted);

		for (const route of routes) {
			const params = route.exec(path);

			if (params) {
				return {
					id: get_page_key(url),
					invalidating,
					route,
					params: decode_params(params),
					url
				};
			}
		}
	} else {
		/** @type {{ route?: import('types').CSRRouteServer, params: Record<string, string>}} */
		const { route, params } = await import(
			/* @vite-ignore */
			__vite__injectQuery(add_resolution_suffix(url.pathname), 'import')
		);

		if (!route) return;

		return {
			id: get_page_key(url),
			invalidating,
			route: parse_server_route(route, app.nodes),
			params,
			url
		};
	}
}

/** @param {URL} url */
function get_url_path(url) {
	return (
		decode_pathname(
			app.hash ? url.hash.replace(/^#/, '').replace(/[?#].+/, '') : url.pathname.slice(base.length)
		) || '/'
	);
}

/** @param {URL} url */
function get_page_key(url) {
	return (app.hash ? url.hash.replace(/^#/, '') : url.pathname) + url.search;
}

/**
 * @param {{
 *   url: URL;
 *   type: import('@sveltejs/kit').Navigation["type"];
 *   intent?: import('./types.js').NavigationIntent;
 *   delta?: number;
 *   event?: PopStateEvent | MouseEvent;
 *   scroll?: { x: number, y: number };
 * }} opts
 */
function _before_navigate({ url, type, intent, delta, event, scroll }) {
	let should_block = false;

	const nav = create_navigation(current, intent, url, type, scroll ?? null);

	if (delta !== undefined) {
		nav.navigation.delta = delta;
	}

	if (event !== undefined) {
		// @ts-ignore
		nav.navigation.event = event;
	}

	const cancellable = {
		...nav.navigation,
		cancel: () => {
			should_block = true;
			nav.reject(new Error('navigation cancelled'));
		}
	};

	if (!is_navigating) {
		// Don't run the event during redirects
		before_navigate_callbacks.forEach((fn) => fn(cancellable));
	}

	return should_block ? null : nav;
}

/**
 * @param {{
 *   type: import('@sveltejs/kit').NavigationType;
 *   url: URL;
 *   popped?: {
 *     state: Record<string, any>;
 *     scroll: { x: number, y: number };
 *     delta: number;
 *   };
 *   keepfocus?: boolean;
 *   noscroll?: boolean;
 *   replace_state?: boolean;
 *   state?: Record<string, any>;
 *   redirect_count?: number;
 *   nav_token?: {};
 *   accept?: () => void;
 *   block?: () => void;
 *   event?: Event
 * }} opts
 * @returns {Promise<void>}
 */
async function navigate({
	type,
	url,
	popped,
	keepfocus,
	noscroll,
	replace_state,
	state = {},
	redirect_count = 0,
	nav_token = {},
	accept = noop,
	block = noop,
	event
}) {
	const prev_token = token;
	token = nav_token;

	const intent = await get_navigation_intent(url, false);
	const nav =
		type === 'enter'
			? create_navigation(current, intent, url, type)
			: _before_navigate({
					url,
					type,
					delta: popped?.delta,
					intent,
					scroll: popped?.scroll,
					// @ts-ignore
					event
				});

	if (!nav) {
		block();
		if (token === nav_token) token = prev_token;
		return;
	}

	// store this before calling `accept()`, which may change the index
	const previous_history_index = current_history_index;
	const previous_navigation_index = current_navigation_index;

	accept();

	is_navigating = true;

	if (started && nav.navigation.type !== 'enter') {
		stores.navigating.set((navigating.current = nav.navigation));
	}

	let navigation_result = intent && (await load_route(intent));

	if (!navigation_result) {
		if (is_external_url(url, base, app.hash)) {
			if (DEV && app.hash) {
				// Special case for hash mode during DEV: If someone accidentally forgets to use a hash for the link,
				// they would end up here in an endless loop. Fall back to error page in that case
				navigation_result = await server_fallback(
					url,
					{ id: null },
					await handle_error(
						new SvelteKitError(
							404,
							'Not Found',
							`Not found: ${url.pathname} (did you forget the hash?)`
						),
						{
							url,
							params: {},
							route: { id: null }
						}
					),
					404,
					replace_state
				);
			} else {
				return await native_navigation(url, replace_state);
			}
		} else {
			navigation_result = await server_fallback(
				url,
				{ id: null },
				await handle_error(new SvelteKitError(404, 'Not Found', `Not found: ${url.pathname}`), {
					url,
					params: {},
					route: { id: null }
				}),
				404,
				replace_state
			);
		}
	}

	// if this is an internal navigation intent, use the normalized
	// URL for the rest of the function
	url = intent?.url || url;

	// abort if user navigated during update
	if (token !== nav_token) {
		nav.reject(new Error('navigation aborted'));
		return;
	}

	if (!navigation_result) return;

	if (navigation_result.type === 'redirect') {
		// whatwg fetch spec https://fetch.spec.whatwg.org/#http-redirect-fetch says to error after 20 redirects
		if (redirect_count < 20) {
			await navigate({
				type,
				url: new URL(navigation_result.location, url),
				popped,
				keepfocus,
				noscroll,
				replace_state,
				state,
				redirect_count: redirect_count + 1,
				nav_token
			});

			nav.fulfil(undefined);
			return;
		}

		navigation_result = await load_root_error_page({
			status: 500,
			error: await handle_error(new Error('Redirect loop'), {
				url,
				params: {},
				route: { id: null }
			}),
			url,
			route: { id: null }
		});

		if (!navigation_result) return;
	} else if (/** @type {number} */ (navigation_result.props.page.status) >= 400) {
		const updated = await stores.updated.check();
		if (updated) {
			// Before reloading, try to update the service worker if it exists
			await update_service_worker();
			return await native_navigation(url, replace_state);
		}
	}

	// reset invalidation only after a finished navigation. If there are redirects or
	// additional invalidations, they should get the same invalidation treatment
	reset_invalidation();

	updating = true;

	update_scroll_positions(previous_history_index);
	capture_snapshot(previous_navigation_index);

	// ensure the url pathname matches the page's trailing slash option
	if (navigation_result.props.page.url.pathname !== url.pathname) {
		url.pathname = navigation_result.props.page.url.pathname;
	}

	state = popped ? popped.state : state;

	if (!popped) {
		// this is a new navigation, rather than a popstate
		const change = replace_state ? 0 : 1;

		const entry = {
			[HISTORY_INDEX]: (current_history_index += change),
			[NAVIGATION_INDEX]: (current_navigation_index += change),
			[STATES_KEY]: state
		};

		const fn = replace_state ? history.replaceState : history.pushState;
		fn.call(history, entry, '', url);

		if (!replace_state) {
			clear_onward_history(current_history_index, current_navigation_index);
		}
	}

	// also compare ids to avoid using wrong fork (e.g. a new one could've been added while navigating)
	const load_cache_fork = intent && load_cache?.id === intent.id ? load_cache.fork : null;
	// reset preload synchronously after the history state has been set to avoid race conditions
	if (load_cache?.fork && !load_cache_fork) {
		// discard fork of different route
		discard_load_cache();
	} else {
		load_cache = null;
		current_a = { element: undefined, href: undefined };
	}

	navigation_result.props.page.state = state;

	/**
	 * @type {Promise<void> | undefined}
	 */
	let commit_promise;
	if (started) {
		const after_navigate = (
			await Promise.all(
				// eslint-disable-next-line @typescript-eslint/await-thenable -- we need to await because they can be asynchronous
				Array.from(on_navigate_callbacks, (fn) =>
					fn(/** @type {import('@sveltejs/kit').OnNavigate} */ (nav.navigation))
				)
			)
		).filter(/** @returns {value is () => void} */ (value) => typeof value === 'function');

		if (after_navigate.length > 0) {
			function cleanup() {
				after_navigate.forEach((fn) => {
					after_navigate_callbacks.delete(fn);
				});
			}

			after_navigate.push(cleanup);

			after_navigate.forEach((fn) => {
				after_navigate_callbacks.add(fn);
			});
		}

		// Type-casts are save because we know this resolved a proper SvelteKit route
		const target = /** @type {import('@sveltejs/kit').NavigationTarget} */ (nav.navigation.to);
		current = {
			...navigation_result.state,
			nav: {
				params: /** @type {Record<string, any>} */ (target.params),
				route: target.route,
				url: target.url
			}
		};

		// reset url before updating page store
		if (navigation_result.props.page) {
			navigation_result.props.page.url = url;
		}

		// Remove focus before updating the component tree, so that blur/focusout
		// handlers fire while the old component's data is still valid (#14575)
		if (
			!keepfocus &&
			document.activeElement instanceof HTMLElement &&
			document.activeElement !== document.body
		) {
			document.activeElement.blur();
		}

		const fork = load_cache_fork && (await load_cache_fork);

		if (fork) {
			commit_promise = fork.commit();
		} else {
			rendering_error = null; // TODO this can break with forks, rethink for SvelteKit 3 where we can assume Svelte 5
			root.$set(navigation_result.props);
			// Check for sync rendering error
			if (rendering_error) {
				Object.assign(navigation_result.props.page, rendering_error);
			}
			update(navigation_result.props.page);

			commit_promise = svelte.settled?.();
		}

		has_navigated = true;
	} else {
		await initialize(navigation_result, target, false);
	}

	const { activeElement } = document;

	await commit_promise;

	// TODO 3.0 remote — the double tick is probably necessary because
	// of some store shenanigans. `settled()` and `f.commit()`
	// should resolve after DOM updates in newer versions
	await svelte.tick();
	await svelte.tick();

	if (token !== nav_token) {
		// a new navigation happened while we were waiting for the DOM to update, so abort
		nav.reject(new Error('navigation aborted'));
		return;
	}

	// Check for async rendering error
	if (navigation_result.props.page && rendering_error) {
		Object.assign(navigation_result.props.page, rendering_error);
	}

	// we reset scroll before dealing with focus, to avoid a flash of unscrolled content
	/** @type {Element | null | ''} */
	let deep_linked = null;

	if (autoscroll) {
		const scroll = popped ? popped.scroll : noscroll ? scroll_state() : null;
		if (scroll) {
			scrollTo(scroll.x, scroll.y);
		} else if ((deep_linked = url.hash && document.getElementById(get_id(url)))) {
			// Here we use `scrollIntoView` on the element instead of `scrollTo`
			// because it natively supports the `scroll-margin` and `scroll-behavior`
			// CSS properties.
			deep_linked.scrollIntoView();
		} else {
			scrollTo(0, 0);
		}
	}

	const changed_focus =
		// reset focus only if any manual focus management didn't override it
		document.activeElement !== activeElement &&
		// also refocus when activeElement is body already because the
		// focus event might not have been fired on it yet
		document.activeElement !== document.body;

	if (!keepfocus && !changed_focus) {
		// We don't need to manually restore the scroll position if we're navigating
		// to a fragment identifier. It is automatically done for us when we set the
		// sequential navigation starting point with `location.replace`
		reset_focus(url, !deep_linked);
	}

	autoscroll = true;

	is_navigating = false;

	nav.fulfil(undefined);

	// Update to.scroll to the actual scroll position after navigation completed
	if (nav.navigation.to) {
		nav.navigation.to.scroll = scroll_state();
	}

	after_navigate_callbacks.forEach((fn) =>
		fn(/** @type {import('@sveltejs/kit').AfterNavigate} */ (nav.navigation))
	);

	if (type === 'popstate') {
		restore_snapshot(current_navigation_index);
	}

	stores.navigating.set((navigating.current = null));

	updating = false;
}

/**
 * Does a full page reload if it wouldn't result in an endless loop in the SPA case
 * @param {URL} url
 * @param {{ id: string | null }} route
 * @param {App.Error} error
 * @param {number} status
 * @param {boolean} [replace_state]
 * @returns {Promise<import('./types.js').NavigationFinished | undefined>}
 */
async function server_fallback(url, route, error, status, replace_state) {
	if (url.origin === origin && url.pathname === location.pathname && !hydrated) {
		// We would reload the same page we're currently on, which isn't hydrated,
		// which means no SSR, which means we would end up in an endless loop
		return await load_root_error_page({
			status,
			error,
			url,
			route
		});
	}

	if (DEV && status !== 404) {
		console.error(
			'An error occurred while loading the page. This will cause a full page reload. (This message will only appear during development.)'
		);

		debugger; // eslint-disable-line
	}

	return await native_navigation(url, replace_state);
}

if (import.meta.hot) {
	import.meta.hot.on('vite:beforeUpdate', () => {
		if (current.error) location.reload();
	});
}

/** @typedef {(typeof PRELOAD_PRIORITIES)['hover'] | (typeof PRELOAD_PRIORITIES)['tap']} PreloadDataPriority */

/**
 * The anchor element whose href is being preloaded. It is reset after navigation
 * or changes when a different anchor element is being preloaded.
 * @type {{ element: Element | SVGAElement | undefined; href: string | SVGAnimatedString | undefined }}
 */
let current_a = { element: undefined, href: undefined };

function setup_preload() {
	/** @type {NodeJS.Timeout} */
	let mousemove_timeout;
	/** @type {PreloadDataPriority} */
	let current_priority;

	container.addEventListener('mousemove', (event) => {
		const target = /** @type {Element} */ (event.target);

		clearTimeout(mousemove_timeout);
		mousemove_timeout = setTimeout(() => {
			void preload(target, PRELOAD_PRIORITIES.hover);
		}, 20);
	});

	/** @param {Event} event */
	function tap(event) {
		if (event.defaultPrevented) return;
		void preload(/** @type {Element} */ (event.composedPath()[0]), PRELOAD_PRIORITIES.tap);
	}

	container.addEventListener('mousedown', tap);
	container.addEventListener('touchstart', tap, { passive: true });

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					void _preload_code(new URL(/** @type {HTMLAnchorElement} */ (entry.target).href));
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0 }
	);

	/**
	 * @param {Element} element
	 * @param {PreloadDataPriority} priority
	 */
	async function preload(element, priority) {
		const a = find_anchor(element, container);

		// we don't want to preload data again if the user has already hovered/tapped
		const interacted =
			a === current_a.element && a?.href === current_a.href && priority >= current_priority;
		if (!a || interacted) return;

		const { url, external, download } = get_link_info(a, base, app.hash);
		if (external || download) return;

		const options = get_router_options(a);

		// we don't want to preload data for a page we're already on
		const same_url = url && get_page_key(current.url) === get_page_key(url);
		if (options.reload || same_url) return;

		if (priority <= options.preload_data) {
			current_a = { element: a, href: a.href };
			// we don't want to preload data again on tap if we've already preloaded it on hover
			current_priority = PRELOAD_PRIORITIES.tap;

			const intent = await get_navigation_intent(url, false);
			if (!intent) return;

			if (DEV) {
				void _preload_data(intent).then((result) => {
					if (result.type === 'loaded' && result.state.error) {
						console.warn(
							`Preloading data for ${intent.url.pathname} failed with the following error: ${result.state.error.message}\n` +
								'If this error is transient, you can ignore it. Otherwise, consider disabling preloading for this route. ' +
								'This route was preloaded due to a data-sveltekit-preload-data attribute. ' +
								'See https://svelte.dev/docs/kit/link-options for more info'
						);
					}
				});
			} else {
				void _preload_data(intent);
			}
		} else if (priority <= options.preload_code) {
			current_a = { element: a, href: a.href };
			current_priority = priority;
			void _preload_code(/** @type {URL} */ (url));
		}
	}

	function after_navigate() {
		observer.disconnect();

		for (const a of container.querySelectorAll('a')) {
			const { url, external, download } = get_link_info(a, base, app.hash);
			if (external || download) continue;

			const options = get_router_options(a);
			if (options.reload) continue;

			if (options.preload_code === PRELOAD_PRIORITIES.viewport) {
				observer.observe(a);
			}

			if (options.preload_code === PRELOAD_PRIORITIES.eager) {
				void _preload_code(/** @type {URL} */ (url));
			}
		}
	}

	after_navigate_callbacks.add(after_navigate);
	after_navigate();
}

/**
 * @param {unknown} error
 * @param {import('@sveltejs/kit').NavigationEvent} event
 * @returns {import('types').MaybePromise<App.Error>}
 */
function handle_error(error, event) {
	if (error instanceof HttpError) {
		return error.body;
	}

	if (DEV) {
		errored = true;
		console.warn('The next HMR update will cause the page to reload');
	}

	const status = get_status(error);
	const message = get_message(error);

	return (
		app.hooks.handleError({ error, event, status, message }) ?? /** @type {any} */ ({ message })
	);
}

/**
 * @template {Function} T
 * @param {Set<T>} callbacks
 * @param {T} callback
 */
function add_navigation_callback(callbacks, callback) {
	onMount(() => {
		callbacks.add(callback);

		return () => {
			callbacks.delete(callback);
		};
	});
}

/**
 * A lifecycle function that runs the supplied `callback` when the current component mounts, and also whenever we navigate to a URL.
 *
 * `afterNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
 * @param {(navigation: import('@sveltejs/kit').AfterNavigate) => void} callback
 * @returns {void}
 */
export function afterNavigate(callback) {
	add_navigation_callback(after_navigate_callbacks, callback);
}

/**
 * A navigation interceptor that triggers before we navigate to a URL, whether by clicking a link, calling `goto(...)`, or using the browser back/forward controls.
 *
 * Calling `cancel()` will prevent the navigation from completing. If `navigation.type === 'leave'` — meaning the user is navigating away from the app (or closing the tab) — calling `cancel` will trigger the native browser unload confirmation dialog. In this case, the navigation may or may not be cancelled depending on the user's response.
 *
 * When a navigation isn't to a SvelteKit-owned route (and therefore controlled by SvelteKit's client-side router), `navigation.to.route.id` will be `null`.
 *
 * If the navigation will (if not cancelled) cause the document to unload — in other words `'leave'` navigations and `'link'` navigations where `navigation.to.route === null` — `navigation.willUnload` is `true`.
 *
 * `beforeNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
 * @param {(navigation: import('@sveltejs/kit').BeforeNavigate) => void} callback
 * @returns {void}
 */
export function beforeNavigate(callback) {
	add_navigation_callback(before_navigate_callbacks, callback);
}

/**
 * A lifecycle function that runs the supplied `callback` immediately before we navigate to a new URL except during full-page navigations.
 *
 * If you return a `Promise`, SvelteKit will wait for it to resolve before completing the navigation. This allows you to — for example — use `document.startViewTransition`. Avoid promises that are slow to resolve, since navigation will appear stalled to the user.
 *
 * If a function (or a `Promise` that resolves to a function) is returned from the callback, it will be called once the DOM has updated.
 *
 * `onNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
 * @param {(navigation: import('@sveltejs/kit').OnNavigate) => import('types').MaybePromise<(() => void) | void>} callback
 * @returns {void}
 */
export function onNavigate(callback) {
	add_navigation_callback(on_navigate_callbacks, callback);
}

/**
 * If called when the page is being updated following a navigation (in `onMount` or `afterNavigate` or an action, for example), this disables SvelteKit's built-in scroll handling.
 * This is generally discouraged, since it breaks user expectations.
 * @returns {void}
 */
export function disableScrollHandling() {
	if (!BROWSER) {
		throw new Error('Cannot call disableScrollHandling() on the server');
	}

	if (DEV && started && !updating) {
		throw new Error('Can only disable scroll handling during navigation');
	}

	if (updating || !started) {
		autoscroll = false;
	}
}

/**
 * Allows you to navigate programmatically to a given route, with options such as keeping the current element focused.
 * Returns a Promise that resolves when SvelteKit navigates (or fails to navigate, in which case the promise rejects) to the specified `url`.
 *
 * For external URLs, use `window.location = url` instead of calling `goto(url)`.
 *
 * @param {string | URL} url Where to navigate to. Note that if you've set [`config.kit.paths.base`](https://svelte.dev/docs/kit/configuration#paths) and the URL is root-relative, you need to prepend the base path if you want to navigate within the app.
 * @param {Object} [opts] Options related to the navigation
 * @param {boolean} [opts.replaceState] If `true`, will replace the current `history` entry rather than creating a new one with `pushState`
 * @param {boolean} [opts.noScroll] If `true`, the browser will maintain its scroll position rather than scrolling to the top of the page after navigation
 * @param {boolean} [opts.keepFocus] If `true`, the currently focused element will retain focus after navigation. Otherwise, focus will be reset to the body
 * @param {boolean} [opts.invalidateAll] If `true`, all `load` functions of the page will be rerun. See https://svelte.dev/docs/kit/load#rerunning-load-functions for more info on invalidation.
 * @param {Array<string | URL | ((url: URL) => boolean)>} [opts.invalidate] Causes any load functions to re-run if they depend on one of the urls
 * @param {App.PageState} [opts.state] An optional object that will be available as `page.state`
 * @returns {Promise<void>}
 */
export function goto(url, opts = {}) {
	if (!BROWSER) {
		throw new Error('Cannot call goto(...) on the server');
	}

	url = new URL(resolve_url(url));

	if (url.origin !== origin) {
		return Promise.reject(
			new Error(
				DEV
					? `Cannot use \`goto\` with an external URL. Use \`window.location = "${url}"\` instead`
					: 'goto: invalid URL'
			)
		);
	}

	return _goto(url, opts, 0);
}

/**
 * Causes any `load` functions belonging to the currently active page to re-run if they depend on the `url` in question, via `fetch` or `depends`. Returns a `Promise` that resolves when the page is subsequently updated.
 *
 * If the argument is given as a `string` or `URL`, it must resolve to the same URL that was passed to `fetch` or `depends` (including query parameters).
 * To create a custom identifier, use a string beginning with `[a-z]+:` (e.g. `custom:state`) — this is a valid URL.
 *
 * The `function` argument can be used define a custom predicate. It receives the full `URL` and causes `load` to rerun if `true` is returned.
 * This can be useful if you want to invalidate based on a pattern instead of a exact match.
 *
 * ```ts
 * // Example: Match '/path' regardless of the query parameters
 * import { invalidate } from '$app/navigation';
 *
 * invalidate((url) => url.pathname === '/path');
 * ```
 * @param {string | URL | ((url: URL) => boolean)} resource The invalidated URL
 * @returns {Promise<void>}
 */
export function invalidate(resource) {
	if (!BROWSER) {
		throw new Error('Cannot call invalidate(...) on the server');
	}

	push_invalidated(resource);

	return _invalidate();
}

/**
 * @param {string | URL | ((url: URL) => boolean)} resource The invalidated URL
 */
function push_invalidated(resource) {
	if (typeof resource === 'function') {
		invalidated.push(resource);
	} else {
		const { href } = new URL(resource, location.href);
		invalidated.push((url) => url.href === href);
	}
}

/**
 * Causes all `load` and `query` functions belonging to the currently active page to re-run. Returns a `Promise` that resolves when the page is subsequently updated.
 * @returns {Promise<void>}
 */
export function invalidateAll() {
	if (!BROWSER) {
		throw new Error('Cannot call invalidateAll() on the server');
	}

	force_invalidation = true;
	return _invalidate();
}

/**
 * Causes all currently active remote functions to refresh, and all `load` functions belonging to the currently active page to re-run (unless disabled via the option argument).
 * Returns a `Promise` that resolves when the page is subsequently updated.
 * @param {{ includeLoadFunctions?: boolean }} [options]
 * @returns {Promise<void>}
 */
export function refreshAll({ includeLoadFunctions = true } = {}) {
	if (!BROWSER) {
		throw new Error('Cannot call refreshAll() on the server');
	}

	force_invalidation = true;
	return _invalidate(includeLoadFunctions, false);
}

/**
 * Programmatically preloads the given page, which means
 *  1. ensuring that the code for the page is loaded, and
 *  2. calling the page's load function with the appropriate options.
 *
 * This is the same behaviour that SvelteKit triggers when the user taps or mouses over an `<a>` element with `data-sveltekit-preload-data`.
 * If the next navigation is to `href`, the values returned from load will be used, making navigation instantaneous.
 * Returns a Promise that resolves with the result of running the new route's `load` functions once the preload is complete.
 *
 * @param {string} href Page to preload
 * @returns {Promise<{ type: 'loaded'; status: number; data: Record<string, any> } | { type: 'redirect'; location: string }>}
 */
export async function preloadData(href) {
	if (!BROWSER) {
		throw new Error('Cannot call preloadData(...) on the server');
	}

	const url = resolve_url(href);
	const intent = await get_navigation_intent(url, false);

	if (!intent) {
		throw new Error(`Attempted to preload a URL that does not belong to this app: ${url}`);
	}

	const result = await _preload_data(intent);
	if (result.type === 'redirect') {
		return {
			type: result.type,
			location: result.location
		};
	}

	const { status, data } = result.props.page ?? page;
	return { type: result.type, status, data };
}

/**
 * Programmatically imports the code for routes that haven't yet been fetched.
 * Typically, you might call this to speed up subsequent navigation.
 *
 * You can specify routes by any matching pathname such as `/about` (to match `src/routes/about/+page.svelte`) or `/blog/*` (to match `src/routes/blog/[slug]/+page.svelte`).
 *
 * Unlike `preloadData`, this won't call `load` functions.
 * Returns a Promise that resolves when the modules have been imported.
 *
 * @param {string} pathname
 * @returns {Promise<void>}
 */
export async function preloadCode(pathname) {
	if (!BROWSER) {
		throw new Error('Cannot call preloadCode(...) on the server');
	}

	// `current.url` is null until the first navigation/hydration completes, so fall back
	// to `location` to support calling `preloadCode` during initial page load (#13297)
	const url = new URL(pathname, current.url ?? location.href);

	if (DEV) {
		if (!pathname.startsWith('/')) {
			throw new Error(
				'argument passed to preloadCode must be a pathname (i.e. "/about" rather than "http://example.com/about"'
			);
		}

		if (!pathname.startsWith(base)) {
			throw new Error(
				`pathname passed to preloadCode must start with \`paths.base\` (i.e. "${base}${pathname}" rather than "${pathname}")`
			);
		}

		if (__SVELTEKIT_CLIENT_ROUTING__) {
			const rerouted = await get_rerouted_url(url);
			if (!rerouted || !routes.find((route) => route.exec(get_url_path(rerouted)))) {
				throw new Error(`'${pathname}' did not match any routes`);
			}
		}
	}

	return _preload_code(url);
}

/**
 * Programmatically create a new history entry with the given `page.state`. To use the current URL, you can pass `''` as the first argument. Used for [shallow routing](https://svelte.dev/docs/kit/shallow-routing).
 *
 * @param {string | URL} url
 * @param {App.PageState} state
 * @returns {void}
 */
export function pushState(url, state) {
	if (!BROWSER) {
		throw new Error('Cannot call pushState(...) on the server');
	}

	if (DEV) {
		if (!started) {
			throw new Error('Cannot call pushState(...) before router is initialized');
		}

		try {
			// use `devalue.stringify` as a convenient way to ensure we exclude values that can't be properly rehydrated, such as custom class instances
			devalue.stringify(state);
		} catch (error) {
			// @ts-expect-error
			throw new Error(`Could not serialize state${error.path}`, { cause: error });
		}
	}

	update_scroll_positions(current_history_index);

	const opts = {
		[HISTORY_INDEX]: (current_history_index += 1),
		[NAVIGATION_INDEX]: current_navigation_index,
		[PAGE_URL_KEY]: page.url.href,
		[STATES_KEY]: state
	};

	history.pushState(opts, '', resolve_url(url));
	has_navigated = true;

	page.state = state;
	root.$set({
		// we need to assign a new page object so that subscribers are correctly notified
		page: untrack(() => clone_page(page))
	});

	clear_onward_history(current_history_index, current_navigation_index);
}

/**
 * Programmatically replace the current history entry with the given `page.state`. To use the current URL, you can pass `''` as the first argument. Used for [shallow routing](https://svelte.dev/docs/kit/shallow-routing).
 *
 * @param {string | URL} url
 * @param {App.PageState} state
 * @returns {void}
 */
export function replaceState(url, state) {
	if (!BROWSER) {
		throw new Error('Cannot call replaceState(...) on the server');
	}

	if (DEV) {
		if (!started) {
			throw new Error('Cannot call replaceState(...) before router is initialized');
		}

		try {
			// use `devalue.stringify` as a convenient way to ensure we exclude values that can't be properly rehydrated, such as custom class instances
			devalue.stringify(state);
		} catch (error) {
			// @ts-expect-error
			throw new Error(`Could not serialize state${error.path}`, { cause: error });
		}
	}

	const opts = {
		[HISTORY_INDEX]: current_history_index,
		[NAVIGATION_INDEX]: current_navigation_index,
		[PAGE_URL_KEY]: page.url.href,
		[STATES_KEY]: state
	};

	history.replaceState(opts, '', resolve_url(url));

	page.state = state;
	root.$set({
		page: untrack(() => clone_page(page))
	});
}

/**
 * This action updates the `form` property of the current page with the given data and updates `page.status`.
 * In case of an error, it redirects to the nearest error page.
 * @template {Record<string, unknown> | undefined} Success
 * @template {Record<string, unknown> | undefined} Failure
 * @param {import('@sveltejs/kit').ActionResult<Success, Failure>} result
 * @returns {Promise<void>}
 */
export async function applyAction(result) {
	if (!BROWSER) {
		throw new Error('Cannot call applyAction(...) on the server');
	}

	if (result.type === 'error') {
		await set_nearest_error_page(result.error, result.status);
	} else if (result.type === 'redirect') {
		await _goto(result.location, { invalidateAll: true }, 0);
	} else {
		page.form = result.data;
		page.status = result.status;

		/** @type {Record<string, any>} */
		root.$set({
			// this brings Svelte's view of the world in line with SvelteKit's
			// after use:enhance reset the form....
			form: null,
			page: clone_page(page)
		});

		// ...so that setting the `form` prop takes effect and isn't ignored
		await tick();
		root.$set({ form: result.data });

		if (result.type === 'success') {
			reset_focus(page.url);
		}
	}
}

/**
 * @param {App.Error} error
 * @param {number} status
 */
export async function set_nearest_error_page(error, status = 500) {
	const url = new URL(location.href);

	const { branch, route } = current;
	if (!route) return;

	const error_load = await load_nearest_error_page(current.branch.length, branch, route.errors);
	if (error_load) {
		const navigation_result = await get_navigation_result_from_branch({
			url,
			params: current.params,
			branch: branch.slice(0, error_load.idx).concat(error_load.node),
			status,
			error,
			// do not set errors, we haven't changed the page so the previous ones are still current
			route
		});

		current = { ...navigation_result.state, nav: current.nav };

		root.$set(navigation_result.props);
		update(navigation_result.props.page);

		void tick().then(() => reset_focus(current.url));
	}
}

function _start_router() {
	history.scrollRestoration = 'manual';

	// Adopted from Nuxt.js
	// Reset scrollRestoration to auto when leaving page, allowing page reload
	// and back-navigation from other pages to use the browser to restore the
	// scrolling position.
	addEventListener('beforeunload', (e) => {
		let should_block = false;

		persist_state();

		if (!is_navigating) {
			const nav = create_navigation(current, undefined, null, 'leave');

			// If we're navigating, beforeNavigate was already called. If we end up in here during navigation,
			// it's due to an external or full-page-reload link, for which we don't want to call the hook again.
			/** @type {import('@sveltejs/kit').BeforeNavigate} */
			const navigation = {
				...nav.navigation,
				cancel: () => {
					should_block = true;
					nav.reject(new Error('navigation cancelled'));
				}
			};

			before_navigate_callbacks.forEach((fn) => fn(navigation));
		}

		if (should_block) {
			e.preventDefault();
			e.returnValue = '';
		} else {
			history.scrollRestoration = 'auto';
		}
	});

	addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') {
			persist_state();
		}
	});

	// @ts-expect-error this isn't supported everywhere yet
	if (!navigator.connection?.saveData) {
		setup_preload();
	}

	/** @param {MouseEvent} event */
	container.addEventListener('click', async (event) => {
		// Adapted from https://github.com/visionmedia/page.js
		// MIT license https://github.com/visionmedia/page.js#license
		if (event.button || event.which !== 1) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		if (event.defaultPrevented) return;

		const a = find_anchor(/** @type {Element} */ (event.composedPath()[0]), container);
		if (!a) return;

		const { url, external, target, download } = get_link_info(a, base, app.hash);
		if (!url) return;

		// bail out before `beforeNavigate` if link opens in a different tab
		if (target === '_parent' || target === '_top') {
			if (window.parent !== window) return;
		} else if (target && target !== '_self') {
			return;
		}

		const options = get_router_options(a);
		const is_svg_a_element = a instanceof SVGAElement;

		// Ignore URL protocols that differ to the current one and are not http(s) (e.g. `mailto:`, `tel:`, `myapp:`, etc.)
		// This may be wrong when the protocol is x: and the link goes to y:.. which should be treated as an external
		// navigation, but it's not clear how to handle that case and it's not likely to come up in practice.
		// MEMO: Without this condition, firefox will open mailer twice.
		// See:
		// - https://github.com/sveltejs/kit/issues/4045
		// - https://github.com/sveltejs/kit/issues/5725
		// - https://github.com/sveltejs/kit/issues/6496
		if (
			!is_svg_a_element &&
			url.protocol !== location.protocol &&
			!(url.protocol === 'https:' || url.protocol === 'http:')
		)
			return;

		if (download) return;

		const [nonhash, hash] = (app.hash ? url.hash.replace(/^#/, '') : url.href).split('#');
		const same_pathname = nonhash === strip_hash(location);

		// Ignore the following but fire beforeNavigate
		if (external || (options.reload && (!same_pathname || !hash))) {
			if (_before_navigate({ url, type: 'link', event })) {
				// set `navigating` to `true` to prevent `beforeNavigate` callbacks
				// being called when the page unloads
				is_navigating = true;
			} else {
				event.preventDefault();
			}

			return;
		}

		// Check if new url only differs by hash and use the browser default behavior in that case
		// This will ensure the `hashchange` event is fired
		// Removing the hash does a full page navigation in the browser, so make sure a hash is present
		if (hash !== undefined && same_pathname) {
			// If we are trying to navigate to the same hash, we should only
			// attempt to scroll to that element and avoid any history changes.
			// Otherwise, this can cause Firefox to incorrectly assign a null
			// history state value without any signal that we can detect.
			const [, current_hash] = current.url.href.split('#');
			if (current_hash === hash) {
				event.preventDefault();

				// We're already on /# and click on a link that goes to /#, or we're on
				// /#top and click on a link that goes to /#top. In those cases just go to
				// the top of the page, and avoid a history change.
				if (hash === '' || (hash === 'top' && a.ownerDocument.getElementById('top') === null)) {
					scrollTo({ top: 0 });
				} else {
					const element = a.ownerDocument.getElementById(decodeURIComponent(hash));
					if (element) {
						element.scrollIntoView();
						element.focus();
					}
				}

				return;
			}
			// set this flag to distinguish between navigations triggered by
			// clicking a hash link and those triggered by popstate
			hash_navigating = true;

			update_scroll_positions(current_history_index);

			update_url(url);

			if (!options.replace_state) return;

			// hashchange event shouldn't occur if the router is replacing state.
			hash_navigating = false;
		}

		event.preventDefault();

		// allow the browser to repaint before navigating —
		// this prevents INP scores being penalised
		await new Promise((fulfil) => {
			requestAnimationFrame(() => {
				setTimeout(fulfil, 0);
			});

			setTimeout(fulfil, 100); // fallback for edge case where rAF doesn't fire because e.g. tab was backgrounded
		});

		await navigate({
			type: 'link',
			url,
			keepfocus: options.keepfocus,
			noscroll: options.noscroll,
			replace_state: options.replace_state ?? url.href === location.href,
			event
		});
	});

	container.addEventListener('submit', (event) => {
		if (event.defaultPrevented) return;

		const form = /** @type {HTMLFormElement} */ (
			HTMLFormElement.prototype.cloneNode.call(event.target)
		);

		const submitter = /** @type {HTMLButtonElement | HTMLInputElement | null} */ (event.submitter);

		const target = submitter?.formTarget || form.target;

		if (target === '_blank') return;

		const method = submitter?.formMethod || form.method;

		if (method !== 'get') return;

		// It is impossible to use form actions with hash router, so we just ignore handling them here
		const url = new URL(
			(submitter?.hasAttribute('formaction') && submitter?.formAction) || form.action
		);

		if (is_external_url(url, base, false)) return;

		const event_form = /** @type {HTMLFormElement} */ (event.target);

		const options = get_router_options(event_form);
		if (options.reload) return;

		event.preventDefault();
		event.stopPropagation();

		const data = new FormData(event_form, submitter);

		// @ts-expect-error `URLSearchParams(fd)` is kosher, but typescript doesn't know that
		url.search = new URLSearchParams(data).toString();

		void navigate({
			type: 'form',
			url,
			keepfocus: options.keepfocus,
			noscroll: options.noscroll,
			replace_state: options.replace_state ?? url.href === location.href,
			event
		});
	});

	addEventListener('popstate', async (event) => {
		if (resetting_focus) return;

		if (event.state?.[HISTORY_INDEX]) {
			const history_index = event.state[HISTORY_INDEX];
			token = {};

			// if a popstate-driven navigation is cancelled, we need to counteract it
			// with history.go, which means we end up back here, hence this check
			if (history_index === current_history_index) return;

			const scroll = scroll_positions[history_index];
			const state = event.state[STATES_KEY] ?? {};
			const url = new URL(event.state[PAGE_URL_KEY] ?? location.href);
			const navigation_index = event.state[NAVIGATION_INDEX];
			const is_hash_change = current.url ? strip_hash(location) === strip_hash(current.url) : false;
			const shallow =
				navigation_index === current_navigation_index && (has_navigated || is_hash_change);

			if (shallow) {
				// We don't need to navigate, we just need to update scroll and/or state.
				// This happens with hash links and `pushState`/`replaceState`. The
				// exception is if we haven't navigated yet, since we could have
				// got here after a modal navigation then a reload
				if (state !== page.state) {
					page.state = state;
				}

				update_url(url);

				scroll_positions[current_history_index] = scroll_state();
				if (scroll) scrollTo(scroll.x, scroll.y);

				current_history_index = history_index;
				return;
			}

			const delta = history_index - current_history_index;

			await navigate({
				type: 'popstate',
				url,
				popped: {
					state,
					scroll,
					delta
				},
				accept: () => {
					current_history_index = history_index;
					current_navigation_index = navigation_index;
				},
				block: () => {
					history.go(-delta);
				},
				nav_token: token,
				event
			});
		} else {
			// since popstate event is also emitted when an anchor referencing the same
			// document is clicked, we have to check that the router isn't already handling
			// the navigation. otherwise we would be updating the page store twice.
			if (!hash_navigating) {
				const url = new URL(location.href);
				update_url(url);

				// if the user edits the hash via the browser URL bar, trigger a full-page
				// reload to align with pathname router behavior
				if (app.hash) {
					location.reload();
				}
			}
		}
	});

	addEventListener('hashchange', () => {
		// if the hashchange happened as a result of clicking on a link,
		// we need to update history, otherwise we have to leave it alone
		if (hash_navigating) {
			hash_navigating = false;
			history.replaceState(
				{
					...history.state,
					[HISTORY_INDEX]: ++current_history_index,
					[NAVIGATION_INDEX]: current_navigation_index
				},
				'',
				location.href
			);
		}
	});

	// fix link[rel=icon], because browsers will occasionally try to load relative
	// URLs after a pushState/replaceState, resulting in a 404 — see
	// https://github.com/sveltejs/kit/issues/3748#issuecomment-1125980897
	for (const link of document.querySelectorAll('link')) {
		if (ICON_REL_ATTRIBUTES.has(link.rel)) {
			link.href = link.href; // eslint-disable-line
		}
	}

	addEventListener('pageshow', (event) => {
		// If the user navigates to another site and then uses the back button and
		// bfcache hits, we need to set navigating to null, the site doesn't know
		// the navigation away from it was successful.
		// Info about bfcache here: https://web.dev/bfcache
		if (event.persisted) {
			stores.navigating.set((navigating.current = null));
		}
	});

	/**
	 * @param {URL} url
	 */
	function update_url(url) {
		current.url = page.url = url;
		stores.page.set(clone_page(page));
		stores.page.notify();
	}
}

/**
 * @param {HTMLElement} target
 * @param {import('./types.js').HydrateOptions} opts
 * @returns {Promise<void>}
 */
async function _hydrate(
	target,
	{ status = 200, error, node_ids, params, route, server_route, data: server_data_nodes, form }
) {
	hydrated = true;

	const url = new URL(location.href);

	/** @type {import('types').CSRRoute | undefined} */
	let parsed_route;

	if (__SVELTEKIT_CLIENT_ROUTING__) {
		if (!__SVELTEKIT_EMBEDDED__) {
			// See https://github.com/sveltejs/kit/pull/4935#issuecomment-1328093358 for one motivation
			// of determining the params on the client side.
			({ params = {}, route = { id: null } } = (await get_navigation_intent(url, false)) || {});
		}

		parsed_route = routes.find(({ id }) => id === route.id);
	} else {
		// undefined in case of 404
		if (server_route) {
			parsed_route = route = parse_server_route(server_route, app.nodes);
		} else {
			route = { id: null };
			params = {};
		}
	}

	/** @type {import('./types.js').NavigationFinished | undefined} */
	let result;
	let hydrate = true;

	try {
		const branch_promises = node_ids.map(async (n, i) => {
			const server_data_node = server_data_nodes[i];
			// Type isn't completely accurate, we still need to deserialize uses
			if (server_data_node?.uses) {
				server_data_node.uses = deserialize_uses(server_data_node.uses);
			}

			return load_node({
				loader: app.nodes[n],
				url,
				params,
				route,
				parent: async () => {
					const data = {};
					for (let j = 0; j < i; j += 1) {
						Object.assign(data, (await branch_promises[j]).data);
					}
					return data;
				},
				server_data_node: create_data_node(server_data_node)
			});
		});

		/** @type {Array<import('./types.js').BranchNode | undefined>} */
		const branch = await Promise.all(branch_promises);

		// server-side will have compacted the branch, reinstate empty slots
		// so that error boundaries can be lined up correctly
		if (parsed_route) {
			const layouts = parsed_route.layouts;
			for (let i = 0; i < layouts.length; i++) {
				if (!layouts[i]) {
					branch.splice(i, 0, undefined);
				}
			}
		}

		result = await get_navigation_result_from_branch({
			url,
			params,
			branch,
			status,
			error,
			errors: parsed_route?.errors, // TODO load earlier?
			form,
			route: parsed_route ?? null
		});
	} catch (error) {
		if (error instanceof Redirect) {
			// this is a real edge case — `load` would need to return
			// a redirect but only in the browser
			return await native_navigation(new URL(error.location, location.href));
		}

		result = await load_root_error_page({
			status: get_status(error),
			error: await handle_error(error, { url, params, route }),
			url,
			route
		});

		target.textContent = '';
		hydrate = false;
	}

	// Exit early when we encounter a redirect while loading the root error page.
	// In this case, `initialize` will be called later on
	if (!result) return;

	if (result.props.page) {
		result.props.page.state = {};
	}

	await initialize(result, target, hydrate);
}

/**
 * @param {URL} url
 * @param {boolean[]} invalid
 * @returns {Promise<import('types').ServerNodesResponse | import('types').ServerRedirectNode>}
 */
async function load_data(url, invalid) {
	const data_url = new URL(url);
	data_url.pathname = add_data_suffix(url.pathname);
	if (url.pathname.endsWith('/')) {
		data_url.searchParams.append(TRAILING_SLASH_PARAM, '1');
	}
	if (DEV && url.searchParams.has(INVALIDATED_PARAM)) {
		throw new Error(`Cannot used reserved query parameter "${INVALIDATED_PARAM}"`);
	}
	data_url.searchParams.append(INVALIDATED_PARAM, invalid.map((i) => (i ? '1' : '0')).join(''));

	// use window.fetch directly to allow using a 3rd party-patched fetch implementation
	const fetcher = DEV ? dev_fetch : window.fetch;
	const res = await fetcher(data_url.href, {});

	if (!res.ok) {
		// error message is a JSON-stringified string which devalue can't handle at the top level
		// turn it into a HttpError to not call handleError on the client again (was already handled on the server)
		// if `__data.json` doesn't exist or the server has an internal error,
		// avoid parsing the HTML error page as a JSON
		/** @type {string | undefined} */
		let message;
		if (res.headers.get('content-type')?.includes('application/json')) {
			message = await res.json();
		} else if (res.status === 404) {
			message = 'Not Found';
		} else if (res.status === 500) {
			message = 'Internal Error';
		}
		throw new HttpError(res.status, message);
	}

	return new Promise((resolve, reject) => {
		process_stream(resolve, res).catch(reject);
	});

	// TODO edge case handling necessary? stream() read fails?
}

/**
 * @param {(value: ServerNodesResponse | ServerRedirectNode) => void} resolve
 * @param {Response} res
 * @returns {Promise<void>}
 */
async function process_stream(resolve, res) {
	const reader = /** @type {ReadableStream<Uint8Array>} */ (res.body).getReader();

	/**
	 * Map of deferred promises that will be resolved by a subsequent chunk of data
	 * @type {Map<string, import('types').Deferred>}
	 */
	const deferreds = new Map();

	/**
	 * @param {any} data
	 */
	function deserialize(data) {
		return devalue.unflatten(data, {
			...app.decoders,
			Promise: (id) => {
				return new Promise((fulfil, reject) => {
					deferreds.set(id, { fulfil, reject });
				});
			}
		});
	}

	for await (const node of read_ndjson(reader)) {
		if (node.type === 'redirect') {
			return resolve(node);
		}

		if (node.type === 'data') {
			// This is the first (and possibly only, if no pending promises) chunk
			node.nodes?.forEach((/** @type {any} */ node) => {
				if (node?.type === 'data') {
					node.uses = deserialize_uses(node.uses);
					node.data = deserialize(node.data);
				}
			});

			resolve(node);
		} else if (node.type === 'chunk') {
			// This is a subsequent chunk containing deferred data
			const { id, data, error } = node;
			const deferred = /** @type {import('types').Deferred} */ (deferreds.get(id));
			deferreds.delete(id);

			if (error) {
				deferred.reject(deserialize(error));
			} else {
				deferred.fulfil(deserialize(data));
			}
		}
	}
}

/**
 * @param {any} uses
 * @return {import('types').Uses}
 */
function deserialize_uses(uses) {
	return {
		dependencies: new Set(uses?.dependencies ?? []),
		params: new Set(uses?.params ?? []),
		parent: !!uses?.parent,
		route: !!uses?.route,
		url: !!uses?.url,
		search_params: new Set(uses?.search_params ?? [])
	};
}

/**
 * This flag is used to avoid client-side navigation when we're only using
 * `location.replace()` to set focus.
 */
let resetting_focus = false;

/**
 * @param {URL} url
 * @param {boolean} [scroll]
 */
function reset_focus(url, scroll = true) {
	const autofocus = document.querySelector('[autofocus]');
	if (autofocus) {
		// @ts-ignore
		autofocus.focus();
	} else {
		// Reset page selection and focus

		// Mimic the browsers' behaviour and set the sequential focus navigation
		// starting point to the fragment identifier.
		const id = get_id(url);
		if (id && document.getElementById(id)) {
			const { x, y } = scroll_state();

			// `element.focus()` doesn't work on Safari and Firefox Ubuntu so we need
			// to use this hack with `location.replace()` instead.
			setTimeout(() => {
				const history_state = history.state;

				resetting_focus = true;
				location.replace(new URL(`#${id}`, location.href));

				// Firefox has a bug that sets the history state to `null` so we need to
				// restore it after. See https://bugzilla.mozilla.org/show_bug.cgi?id=1199924
				// This is also needed to restore the original hash if we're using hash routing
				history.replaceState(history_state, '', url);

				// If scroll management has already happened earlier, we need to restore
				// the scroll position after setting the sequential focus navigation starting point
				if (scroll) scrollTo(x, y);
				resetting_focus = false;
			});
		} else {
			// If the ID doesn't exist, we try to mimic browsers' behaviour as closely
			// as possible by targeting the first scrollable region. Unfortunately, it's
			// not a perfect match — e.g. shift-tabbing won't immediately cycle up from
			// the end of the page on Chromium
			// See https://html.spec.whatwg.org/multipage/interaction.html#get-the-focusable-area
			const root = document.body;
			const tabindex = root.getAttribute('tabindex');

			root.tabIndex = -1;
			// TODO: remove this when we switch to TypeScript 6
			// @ts-ignore options.focusVisible is only typed in TypeScript 6
			// See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
			root.focus({ preventScroll: true, focusVisible: false });

			// restore `tabindex` as to prevent `root` from stealing input from elements
			if (tabindex !== null) {
				root.setAttribute('tabindex', tabindex);
			} else {
				root.removeAttribute('tabindex');
			}
		}

		// capture current selection, so we can compare the state after
		// snapshot restoration and afterNavigate callbacks have run
		const selection = getSelection();

		if (selection && selection.type !== 'None') {
			/** @type {Range[]} */
			const ranges = [];

			for (let i = 0; i < selection.rangeCount; i += 1) {
				ranges.push(selection.getRangeAt(i));
			}

			setTimeout(() => {
				if (selection.rangeCount !== ranges.length) return;

				for (let i = 0; i < selection.rangeCount; i += 1) {
					const a = ranges[i];
					const b = selection.getRangeAt(i);

					// we need to do a deep comparison rather than just `a !== b` because
					// Safari behaves differently to other browsers
					if (
						a.commonAncestorContainer !== b.commonAncestorContainer ||
						a.startContainer !== b.startContainer ||
						a.endContainer !== b.endContainer ||
						a.startOffset !== b.startOffset ||
						a.endOffset !== b.endOffset
					) {
						return;
					}
				}

				// if the selection hasn't changed (as a result of an element being (auto)focused,
				// or a programmatic selection, we reset everything as part of the navigation)
				// fixes https://github.com/sveltejs/kit/issues/8439
				selection.removeAllRanges();
			});
		}
	}
}

/**
 * @template {import('@sveltejs/kit').NavigationType} T
 * @param {import('./types.js').NavigationState} current
 * @param {import('./types.js').NavigationIntent | undefined} intent
 * @param {URL | null} url
 * @param {T} type
 * @param {{ x: number, y: number } | null} [target_scroll] The scroll position for the target (for popstate navigations)
 */
function create_navigation(current, intent, url, type, target_scroll = null) {
	/** @type {(value: any) => void} */
	let fulfil;

	/** @type {(error: any) => void} */
	let reject;

	const complete = new Promise((f, r) => {
		fulfil = f;
		reject = r;
	});

	// Handle any errors off-chain so that it doesn't show up as an unhandled rejection
	complete.catch(noop);

	/** @type {(import('@sveltejs/kit').Navigation | import('@sveltejs/kit').AfterNavigate) & { type: T }} */
	const navigation = /** @type {any} */ ({
		from: {
			params: current.params,
			route: { id: current.route?.id ?? null },
			url: current.url,
			scroll: scroll_state()
		},
		to: url && {
			params: intent?.params ?? null,
			route: { id: intent?.route?.id ?? null },
			url,
			scroll: target_scroll
		},
		willUnload: !intent,
		type,
		complete
	});

	return {
		navigation,
		// @ts-expect-error
		fulfil,
		// @ts-expect-error
		reject
	};
}

/**
 * TODO: remove this in 3.0 when the page store is also removed
 *
 * We need to assign a new page object so that subscribers are correctly notified.
 * However, spreading `{ ...page }` returns an empty object so we manually
 * assign to each property instead.
 *
 * @param {import('@sveltejs/kit').Page} page
 */
function clone_page(page) {
	return {
		data: page.data,
		error: page.error,
		form: page.form,
		params: page.params,
		route: page.route,
		state: page.state,
		status: page.status,
		url: page.url
	};
}

/**
 * @param {URL} url
 * @returns {URL}
 */
function decode_hash(url) {
	const new_url = new URL(url);
	// Safari, for some reason, does change # to %23, when entered through the address bar
	new_url.hash = decodeURIComponent(url.hash);
	return new_url;
}

/**
 * @param {URL} url
 * @returns {string}
 */
function get_id(url) {
	let id;

	if (app.hash) {
		const [, , second] = url.hash.split('#', 3);
		id = second ?? '';
	} else {
		id = url.hash.slice(1);
	}

	return decodeURIComponent(id);
}

if (DEV) {
	// Nasty hack to silence harmless warnings the user can do nothing about
	const console_warn = console.warn;
	console.warn = function warn(...args) {
		if (
			args.length === 1 &&
			/<(Layout|Page|Error)(_[\w$]+)?> was created (with unknown|without expected) prop '(data|form)'/.test(
				args[0]
			)
		) {
			return;
		}
		console_warn(...args);
	};

	if (import.meta.hot) {
		import.meta.hot.on('vite:beforeUpdate', () => {
			if (errored) {
				location.reload();
			}
		});
	}
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcz92PTFiMWQyNzk3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdFF1ZXJ5IGFzIF9fdml0ZV9faW5qZWN0UXVlcnkgfSBmcm9tIFwiL0B2aXRlL2NsaWVudFwiO2ltcG9ydCB7IGNyZWF0ZUhvdENvbnRleHQgYXMgX192aXRlX19jcmVhdGVIb3RDb250ZXh0IH0gZnJvbSBcIi9Adml0ZS9jbGllbnRcIjtpbXBvcnQubWV0YS5ob3QgPSBfX3ZpdGVfX2NyZWF0ZUhvdENvbnRleHQoXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvcnVudGltZS9jbGllbnQvY2xpZW50LmpzP3Y9MWIxZDI3OTdcIik7LyoqIEBpbXBvcnQgeyBSZW1vdGVGdW5jdGlvbkRhdGFOb2RlLCBTZXJ2ZXJOb2Rlc1Jlc3BvbnNlLCBTZXJ2ZXJSZWRpcmVjdE5vZGUgfSBmcm9tICd0eXBlcycgKi9cbi8qKiBAaW1wb3J0IHsgQ2FjaGVFbnRyeSB9IGZyb20gJy4vcmVtb3RlLWZ1bmN0aW9ucy9jYWNoZS5zdmVsdGUuanMnICovXG4vKiogQGltcG9ydCB7IFF1ZXJ5IH0gZnJvbSAnLi9yZW1vdGUtZnVuY3Rpb25zL3F1ZXJ5L2luc3RhbmNlLnN2ZWx0ZS5qcycgKi9cbi8qKiBAaW1wb3J0IHsgTGl2ZVF1ZXJ5IH0gZnJvbSAnLi9yZW1vdGUtZnVuY3Rpb25zL3F1ZXJ5LWxpdmUvaW5zdGFuY2Uuc3ZlbHRlLmpzJyAqL1xuaW1wb3J0IHsgQlJPV1NFUiwgREVWIH0gZnJvbSBcIi9ub2RlX21vZHVsZXMvLnZpdGUvZGVwcy9lc20tZW52LmpzP3Y9MWIxZDI3OTdcIjtcbmltcG9ydCAqIGFzIHN2ZWx0ZSBmcm9tIFwiL25vZGVfbW9kdWxlcy8udml0ZS9kZXBzL3N2ZWx0ZS5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBIdHRwRXJyb3IsIFJlZGlyZWN0LCBTdmVsdGVLaXRFcnJvciB9IGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvZXhwb3J0cy9pbnRlcm5hbC9pbmRleC5qcz92PTFiMWQyNzk3XCI7XG5jb25zdCB7IG9uTW91bnQsIHRpY2sgfSA9IHN2ZWx0ZTtcbi8vIFN2ZWx0ZSA0IGFuZCB1bmRlciBkb24ndCBoYXZlIGB1bnRyYWNrYCwgc28gd2UgaGF2ZSB0byBmYWxsYmFjayBpZiBgdW50cmFja2AgaXMgbm90IGV4cG9ydGVkXG5jb25zdCB1bnRyYWNrID0gc3ZlbHRlLnVudHJhY2sgPz8gKCh2YWx1ZSkgPT4gdmFsdWUoKSk7XG5pbXBvcnQge1xuXHRkZWNvZGVfcGFyYW1zLFxuXHRkZWNvZGVfcGF0aG5hbWUsXG5cdHN0cmlwX2hhc2gsXG5cdG1ha2VfdHJhY2thYmxlLFxuXHRub3JtYWxpemVfcGF0aFxufSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3V0aWxzL3VybC5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBkZXZfZmV0Y2gsIGluaXRpYWxfZmV0Y2gsIGxvY2tfZmV0Y2gsIHN1YnNlcXVlbnRfZmV0Y2gsIHVubG9ja19mZXRjaCB9IGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvcnVudGltZS9jbGllbnQvZmV0Y2hlci5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBwYXJzZSwgcGFyc2Vfc2VydmVyX3JvdXRlIH0gZnJvbSBcIi9ub2RlX21vZHVsZXMvLnBucG0vQHN2ZWx0ZWpzK2tpdEAyLjY5LjBfQHN2ZWx0ZWpzK3ZpdGUtcGx1Z2luLXN2ZWx0ZUA3LjEuMl9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGluXzNiOTAwZGUwY2E4MDIzZTc0ZmZmZDcxNjk0OTg1OTM4L25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMva2l0L3NyYy9ydW50aW1lL2NsaWVudC9wYXJzZS5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvcnVudGltZS9jbGllbnQvc2Vzc2lvbi1zdG9yYWdlLmpzP3Y9MWIxZDI3OTdcIjtcbmltcG9ydCB7XG5cdGZpbmRfYW5jaG9yLFxuXHRyZXNvbHZlX3VybCxcblx0Z2V0X2xpbmtfaW5mbyxcblx0Z2V0X3JvdXRlcl9vcHRpb25zLFxuXHRpc19leHRlcm5hbF91cmwsXG5cdG9yaWdpbixcblx0c2Nyb2xsX3N0YXRlLFxuXHRub3RpZmlhYmxlX3N0b3JlLFxuXHRjcmVhdGVfdXBkYXRlZF9zdG9yZSxcblx0bG9hZF9jc3Ncbn0gZnJvbSBcIi9ub2RlX21vZHVsZXMvLnBucG0vQHN2ZWx0ZWpzK2tpdEAyLjY5LjBfQHN2ZWx0ZWpzK3ZpdGUtcGx1Z2luLXN2ZWx0ZUA3LjEuMl9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGluXzNiOTAwZGUwY2E4MDIzZTc0ZmZmZDcxNjk0OTg1OTM4L25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMva2l0L3NyYy9ydW50aW1lL2NsaWVudC91dGlscy5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBiYXNlIH0gZnJvbSBcIi9ub2RlX21vZHVsZXMvLnBucG0vQHN2ZWx0ZWpzK2tpdEAyLjY5LjBfQHN2ZWx0ZWpzK3ZpdGUtcGx1Z2luLXN2ZWx0ZUA3LjEuMl9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGluXzNiOTAwZGUwY2E4MDIzZTc0ZmZmZDcxNjk0OTg1OTM4L25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMva2l0L3NyYy9ydW50aW1lL2FwcC9wYXRocy9pbmRleC5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgKiBhcyBkZXZhbHVlIGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL2RldmFsdWVANS44LjEvbm9kZV9tb2R1bGVzL2RldmFsdWUvaW5kZXguanM/dj0xYjFkMjc5N1wiO1xuaW1wb3J0IHtcblx0SElTVE9SWV9JTkRFWCxcblx0TkFWSUdBVElPTl9JTkRFWCxcblx0UFJFTE9BRF9QUklPUklUSUVTLFxuXHRTQ1JPTExfS0VZLFxuXHRTVEFURVNfS0VZLFxuXHRTTkFQU0hPVF9LRVksXG5cdFBBR0VfVVJMX0tFWVxufSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUvY2xpZW50L2NvbnN0YW50cy5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyB2YWxpZGF0ZV9wYWdlX2V4cG9ydHMgfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3V0aWxzL2V4cG9ydHMuanM/dj0xYjFkMjc5N1wiO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvdXRpbHMvZnVuY3Rpb25zLmpzP3Y9MWIxZDI3OTdcIjtcbmltcG9ydCB7IGNvbXBhY3QgfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3V0aWxzL2FycmF5LmpzP3Y9MWIxZDI3OTdcIjtcbmltcG9ydCB7XG5cdElOVkFMSURBVEVEX1BBUkFNLFxuXHRUUkFJTElOR19TTEFTSF9QQVJBTSxcblx0Y3JlYXRlX3JlbW90ZV9rZXksXG5cdHZhbGlkYXRlX2RlcGVuZHMsXG5cdHZhbGlkYXRlX2xvYWRfcmVzcG9uc2Vcbn0gZnJvbSBcIi9ub2RlX21vZHVsZXMvLnBucG0vQHN2ZWx0ZWpzK2tpdEAyLjY5LjBfQHN2ZWx0ZWpzK3ZpdGUtcGx1Z2luLXN2ZWx0ZUA3LjEuMl9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGluXzNiOTAwZGUwY2E4MDIzZTc0ZmZmZDcxNjk0OTg1OTM4L25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMva2l0L3NyYy9ydW50aW1lL3NoYXJlZC5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBnZXRfbWVzc2FnZSwgZ2V0X3N0YXR1cyB9IGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvdXRpbHMvZXJyb3IuanM/dj0xYjFkMjc5N1wiO1xuaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8udml0ZS9kZXBzL3N2ZWx0ZV9zdG9yZS5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBwYWdlLCB1cGRhdGUsIG5hdmlnYXRpbmcgfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUvY2xpZW50L3N0YXRlLnN2ZWx0ZS5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBhZGRfZGF0YV9zdWZmaXgsIGFkZF9yZXNvbHV0aW9uX3N1ZmZpeCB9IGZyb20gXCIvbm9kZV9tb2R1bGVzLy5wbnBtL0BzdmVsdGVqcytraXRAMi42OS4wX0BzdmVsdGVqcyt2aXRlLXBsdWdpbi1zdmVsdGVANy4xLjJfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbl8zYjkwMGRlMGNhODAyM2U3NGZmZmQ3MTY5NDk4NTkzOC9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvcnVudGltZS9wYXRobmFtZS5qcz92PTFiMWQyNzk3XCI7XG5pbXBvcnQgeyBub29wX3NwYW4gfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUvdGVsZW1ldHJ5L25vb3AuanM/dj0xYjFkMjc5N1wiO1xuaW1wb3J0IHsgcmVhZF9uZGpzb24gfSBmcm9tIFwiL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUvY2xpZW50L25kanNvbi5qcz92PTFiMWQyNzk3XCI7XG5cbmV4cG9ydCB7IGxvYWRfY3NzIH07XG5jb25zdCBJQ09OX1JFTF9BVFRSSUJVVEVTID0gbmV3IFNldChbJ2ljb24nLCAnc2hvcnRjdXQgaWNvbicsICdhcHBsZS10b3VjaC1pY29uJ10pO1xuXG5sZXQgZXJyb3JlZCA9IGZhbHNlO1xuLyoqXG4gKiBTZXQgdmlhIHRyYW5zZm9ybUVycm9yLCByZXNldCBhbmQgcmVhZCBhdCB0aGUgZW5kIG9mIG5hdmlnYXRlLlxuICogTmVjZXNzYXJ5IGJlY2F1c2UgYSBuYXZpZ2F0aW9uIG1pZ2h0IHN1Y2NlZWQgbG9hZGluZyBidXQgZHVyaW5nIHJlbmRlcmluZ1xuICogYW4gZXJyb3Igb2NjdXJzLCBhdCB3aGljaCBwb2ludCB0aGUgbmF2aWdhdGlvbiByZXN1bHQgbmVlZHMgdG8gYmUgb3ZlcnJpZGRlbiB3aXRoIHRoZSBlcnJvciByZXN1bHQuXG4gKiBUT0RPIHRoaXMgaXMgYWxsIHZlcnkgaGFja3ksIHJldGhpbmsgZm9yIFN2ZWx0ZUtpdCAzIHdoZXJlIHdlIGNhbiBhc3N1bWUgU3ZlbHRlIDUgYW5kIGRvIGFuIG92ZXJoYXVsIG9mIGNsaWVudC5qc1xuICogQHR5cGUge3sgZXJyb3I6IEFwcC5FcnJvciwgc3RhdHVzOiBudW1iZXIgfSB8IG51bGx9XG4gKi9cbmxldCByZW5kZXJpbmdfZXJyb3IgPSBudWxsO1xuXG4vLyBXZSB0cmFjayB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGhpc3RvcnkgZW50cnkgaW4gc2Vzc2lvblN0b3JhZ2UsXG4vLyByYXRoZXIgdGhhbiBvbiBoaXN0b3J5LnN0YXRlIGl0c2VsZiwgYmVjYXVzZSB3aGVuIG5hdmlnYXRpb24gaXMgZHJpdmVuIGJ5XG4vLyBwb3BzdGF0ZSBpdCdzIHRvbyBsYXRlIHRvIHVwZGF0ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGVcbi8vIHN0YXRlIHdlJ3JlIG5hdmlnYXRpbmcgZnJvbVxuLyoqXG4gKiBoaXN0b3J5IGluZGV4IC0+IHsgeCwgeSB9XG4gKiBAdHlwZSB7UmVjb3JkPG51bWJlciwgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9Pn1cbiAqL1xuY29uc3Qgc2Nyb2xsX3Bvc2l0aW9ucyA9IHN0b3JhZ2UuZ2V0KFNDUk9MTF9LRVkpID8/IHt9O1xuXG4vKipcbiAqIG5hdmlnYXRpb24gaW5kZXggLT4gYW55XG4gKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55W10+fVxuICovXG5jb25zdCBzbmFwc2hvdHMgPSBzdG9yYWdlLmdldChTTkFQU0hPVF9LRVkpID8/IHt9O1xuXG5pZiAoREVWICYmIEJST1dTRVIpIHtcblx0bGV0IHdhcm5lZCA9IGZhbHNlO1xuXG5cdGNvbnN0IHdhcm4gPSAoKSA9PiB7XG5cdFx0aWYgKHdhcm5lZCkgcmV0dXJuO1xuXG5cdFx0Ly8gUmF0aGVyIHRoYW4gc2F2aW5nIGEgcG9pbnRlciB0byB0aGUgb3JpZ2luYWwgaGlzdG9yeSBtZXRob2RzLCB3aGljaCB3b3VsZCBwcmV2ZW50IG1vbmtleXBhdGNoaW5nIGJ5IG90aGVyIGxpYnMsXG5cdFx0Ly8gaW5zcGVjdCB0aGUgc3RhY2sgdHJhY2UgdG8gc2VlIGlmIHdlJ3JlIGJlaW5nIGNhbGxlZCBmcm9tIHdpdGhpbiBTdmVsdGVLaXQuXG5cdFx0bGV0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KCdcXG4nKTtcblx0XHRpZiAoIXN0YWNrKSByZXR1cm47XG5cdFx0aWYgKCFzdGFja1swXS5pbmNsdWRlcygnaHR0cHM6JykgJiYgIXN0YWNrWzBdLmluY2x1ZGVzKCdodHRwOicpKSBzdGFjayA9IHN0YWNrLnNsaWNlKDEpOyAvLyBDaHJvbWUgaW5jbHVkZXMgdGhlIGVycm9yIG1lc3NhZ2UgaW4gdGhlIHN0YWNrXG5cblx0XHQvLyBza2lwIG92ZXIgYHdhcm5gIGFuZCB0aGUgcGxhY2Ugd2hlcmUgYHdhcm5gIHdhcyBjYWxsZWRcblx0XHRjb25zdCBmcmFtZSA9IHN0YWNrWzJdO1xuXG5cdFx0Ly8gaWdub3JlIGNhbGxzIHRoYXQgaGFwcGVuIGluc2lkZSBkZXBlbmRlbmNpZXMsIGluY2x1ZGluZyBTdmVsdGVLaXQuXG5cdFx0Ly8gYGZyYW1lYCBjYW4gYmUgZmFsc3kgaWYgd2UgY2FtZSBmcm9tIGFuIGFub255bW91cyBmdW5jdGlvblxuXHRcdGlmIChmcmFtZT8uaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSByZXR1cm47XG5cblx0XHR3YXJuZWQgPSB0cnVlO1xuXG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJBdm9pZCB1c2luZyBgaGlzdG9yeS5wdXNoU3RhdGUoLi4uKWAgYW5kIGBoaXN0b3J5LnJlcGxhY2VTdGF0ZSguLi4pYCBhcyB0aGVzZSB3aWxsIGNvbmZsaWN0IHdpdGggU3ZlbHRlS2l0J3Mgcm91dGVyLiBVc2UgdGhlIGBwdXNoU3RhdGVgIGFuZCBgcmVwbGFjZVN0YXRlYCBpbXBvcnRzIGZyb20gYCRhcHAvbmF2aWdhdGlvbmAgaW5zdGVhZC5cIlxuXHRcdCk7XG5cdH07XG5cblx0Y29uc3QgcHVzaF9zdGF0ZSA9IGhpc3RvcnkucHVzaFN0YXRlO1xuXHRoaXN0b3J5LnB1c2hTdGF0ZSA9ICguLi5hcmdzKSA9PiB7XG5cdFx0d2FybigpO1xuXHRcdHJldHVybiBwdXNoX3N0YXRlLmFwcGx5KGhpc3RvcnksIGFyZ3MpO1xuXHR9O1xuXG5cdGNvbnN0IHJlcGxhY2Vfc3RhdGUgPSBoaXN0b3J5LnJlcGxhY2VTdGF0ZTtcblx0aGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoLi4uYXJncykgPT4ge1xuXHRcdHdhcm4oKTtcblx0XHRyZXR1cm4gcmVwbGFjZV9zdGF0ZS5hcHBseShoaXN0b3J5LCBhcmdzKTtcblx0fTtcbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlcyA9IHtcblx0dXJsOiAvKiBAX19QVVJFX18gKi8gbm90aWZpYWJsZV9zdG9yZSh7fSksXG5cdHBhZ2U6IC8qIEBfX1BVUkVfXyAqLyBub3RpZmlhYmxlX3N0b3JlKHt9KSxcblx0bmF2aWdhdGluZzogLyogQF9fUFVSRV9fICovIHdyaXRhYmxlKFxuXHRcdC8qKiBAdHlwZSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvbiB8IG51bGx9ICovIChudWxsKVxuXHQpLFxuXHR1cGRhdGVkOiAvKiBAX19QVVJFX18gKi8gY3JlYXRlX3VwZGF0ZWRfc3RvcmUoKVxufTtcblxuLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuZnVuY3Rpb24gdXBkYXRlX3Njcm9sbF9wb3NpdGlvbnMoaW5kZXgpIHtcblx0c2Nyb2xsX3Bvc2l0aW9uc1tpbmRleF0gPSBzY3JvbGxfc3RhdGUoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudF9oaXN0b3J5X2luZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudF9uYXZpZ2F0aW9uX2luZGV4XG4gKi9cbmZ1bmN0aW9uIGNsZWFyX29ud2FyZF9oaXN0b3J5KGN1cnJlbnRfaGlzdG9yeV9pbmRleCwgY3VycmVudF9uYXZpZ2F0aW9uX2luZGV4KSB7XG5cdC8vIGlmIHdlIG5hdmlnYXRlZCBiYWNrLCB0aGVuIHB1c2hlZCBhIG5ldyBzdGF0ZSwgd2UgY2FuXG5cdC8vIHJlbGVhc2UgbWVtb3J5IGJ5IHBydW5pbmcgdGhlIHNjcm9sbC9zbmFwc2hvdCBsb29rdXBcblx0bGV0IGkgPSBjdXJyZW50X2hpc3RvcnlfaW5kZXggKyAxO1xuXHR3aGlsZSAoc2Nyb2xsX3Bvc2l0aW9uc1tpXSkge1xuXHRcdGRlbGV0ZSBzY3JvbGxfcG9zaXRpb25zW2ldO1xuXHRcdGkgKz0gMTtcblx0fVxuXG5cdGkgPSBjdXJyZW50X25hdmlnYXRpb25faW5kZXggKyAxO1xuXHR3aGlsZSAoc25hcHNob3RzW2ldKSB7XG5cdFx0ZGVsZXRlIHNuYXBzaG90c1tpXTtcblx0XHRpICs9IDE7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkcyBgaHJlZmAgdGhlIG9sZC1mYXNoaW9uZWQgd2F5LCB3aXRoIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqIFJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCBuZXZlciByZXNvbHZlcyAodG8gcHJldmVudCBhbnlcbiAqIHN1YnNlcXVlbnQgd29yaywgZS5nLiBoaXN0b3J5IG1hbmlwdWxhdGlvbiwgZnJvbSBoYXBwZW5pbmcpXG4gKiBAcGFyYW0ge1VSTH0gdXJsXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXBsYWNlXSBpZiBgdHJ1ZWAsIHdpbGwgcmVwbGFjZSB0aGUgY3VycmVudCBgaGlzdG9yeWAgZW50cnkgcmF0aGVyIHRoYW4gY3JlYXRpbmcgYSBuZXcgb25lIHdpdGggYHB1c2hTdGF0ZWBcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IGEgcHJvbWlzZSB0aGF0IG5ldmVyIHJlc29sdmVzXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZV9uYXZpZ2F0aW9uKHVybCwgcmVwbGFjZSA9IGZhbHNlKSB7XG5cdGlmIChyZXBsYWNlKSB7XG5cdFx0bG9jYXRpb24ucmVwbGFjZSh1cmwuaHJlZik7XG5cdH0gZWxzZSB7XG5cdFx0bG9jYXRpb24uaHJlZiA9IHVybC5ocmVmO1xuXHR9XG5cdHJldHVybiBuZXcgUHJvbWlzZShub29wKTtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIHNlcnZpY2Ugd29ya2VyIGlzIHJlZ2lzdGVyZWQsIGFuZCBpZiBpdCBpcyxcbiAqIHRyaWVzIHRvIHVwZGF0ZSBpdC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlX3NlcnZpY2Vfd29ya2VyKCkge1xuXHRpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXHRcdGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmdldFJlZ2lzdHJhdGlvbihiYXNlIHx8ICcvJyk7XG5cdFx0aWYgKHJlZ2lzdHJhdGlvbikge1xuXHRcdFx0YXdhaXQgcmVnaXN0cmF0aW9uLnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxufVxuXG4vKiogQHR5cGUge2ltcG9ydCgndHlwZXMnKS5DU1JSb3V0ZVtdfSBBbGwgcm91dGVzIG9mIHRoZSBhcHAuIE9ubHkgYXZhaWxhYmxlIHdoZW4ga2l0LnJvdXRlci5yZXNvbHV0aW9uPWNsaWVudCAqL1xubGV0IHJvdXRlcztcbi8qKiBAdHlwZSB7aW1wb3J0KCd0eXBlcycpLkNTUlBhZ2VOb2RlTG9hZGVyfSAqL1xubGV0IGRlZmF1bHRfbGF5b3V0X2xvYWRlcjtcbi8qKiBAdHlwZSB7aW1wb3J0KCd0eXBlcycpLkNTUlBhZ2VOb2RlTG9hZGVyfSAqL1xubGV0IGRlZmF1bHRfZXJyb3JfbG9hZGVyO1xuLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbmxldCBjb250YWluZXI7XG4vKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xubGV0IHRhcmdldDtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5TdmVsdGVLaXRBcHB9ICovXG5leHBvcnQgbGV0IGFwcDtcblxuLyoqXG4gKiBEYXRhIHRoYXQgd2FzIHNlcmlhbGl6ZWQgZHVyaW5nIFNTUiBmb3IgcXVlcmllcy9mb3Jtcy9jb21tYW5kcywgc3RvcmVkIGFzXG4gKiBgeyB2IH1gICh2YWx1ZSkgb3IgYHsgZSB9YCAoZXJyb3IpIG5vZGVzIHNvIHRoYXQgZmFpbGVkIHN0YXRlcyBzdXJ2aXZlIGh5ZHJhdGlvbi5cbiAqIEVudHJpZXMgYXJlIGRlbGV0ZWQgYXMgdGhleSBhcmUgY29uc3VtZWQgKHdoZW4gdGhlIGNvcnJlc3BvbmRpbmcgcmVzb3VyY2UgaXMgY3JlYXRlZCkuXG4gKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgUmVtb3RlRnVuY3Rpb25EYXRhTm9kZT59XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeV9yZXNwb25zZXMgPSB7fTtcblxuLyoqXG4gKiBEYXRhIHRoYXQgd2FzIHNlcmlhbGl6ZWQgZHVyaW5nIFNTUiBmb3IgcHJlcmVuZGVyIGZ1bmN0aW9ucywgc3RvcmVkIGFzXG4gKiBgeyB2IH1gICh2YWx1ZSkgb3IgYHsgZSB9YCAoZXJyb3IpIG5vZGVzLlxuICogVGhpcyBwZXJzaXN0cyBhY3Jvc3MgY2xpZW50LXNpZGUgbmF2aWdhdGlvbnMuXG4gKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgUmVtb3RlRnVuY3Rpb25EYXRhTm9kZT59XG4gKi9cbmV4cG9ydCBjb25zdCBwcmVyZW5kZXJfcmVzcG9uc2VzID0ge307XG5cbi8qKiBAdHlwZSB7QXJyYXk8KCh1cmw6IFVSTCkgPT4gYm9vbGVhbik+fSAqL1xuY29uc3QgaW52YWxpZGF0ZWQgPSBbXTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB0aGUgYCtsYXlvdXQuc3ZlbHRlYCBhbmQgYCtwYWdlLnN2ZWx0ZWAgY29tcG9uZW50IGluc3RhbmNlc1xuICogdGhhdCBjdXJyZW50bHkgbGl2ZSBvbiB0aGUgcGFnZSDigJQgdXNlZCBmb3IgY2FwdHVyaW5nIGFuZCByZXN0b3Jpbmcgc25hcHNob3RzLlxuICogSXQncyB1cGRhdGVkL21hbmlwdWxhdGVkIHRocm91Z2ggYGJpbmQ6dGhpc2AgaW4gYFJvb3Quc3ZlbHRlYC5cbiAqIEB0eXBlIHtpbXBvcnQoJ3N2ZWx0ZScpLlN2ZWx0ZUNvbXBvbmVudFtdfVxuICovXG5jb25zdCBjb21wb25lbnRzID0gW107XG5cbi8qKiBAdHlwZSB7e2lkOiBzdHJpbmcsIHRva2VuOiB7fSwgcHJvbWlzZTogUHJvbWlzZTxpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uUmVzdWx0PiwgZm9yazogUHJvbWlzZTxpbXBvcnQoJ3N2ZWx0ZScpLkZvcmsgfCBudWxsPiB8IG51bGx9IHwgbnVsbH0gKi9cbmxldCBsb2FkX2NhY2hlID0gbnVsbDtcblxuZnVuY3Rpb24gZGlzY2FyZF9sb2FkX2NhY2hlKCkge1xuXHR2b2lkIGxvYWRfY2FjaGU/LmZvcms/LnRoZW4oKGYpID0+IGY/LmRpc2NhcmQoKSk7XG5cdGxvYWRfY2FjaGUgPSBudWxsO1xuXHRjdXJyZW50X2EgPSB7IGVsZW1lbnQ6IHVuZGVmaW5lZCwgaHJlZjogdW5kZWZpbmVkIH07XG59XG5cbi8qKlxuICogQHR5cGUge01hcDxzdHJpbmcsIFByb21pc2U8VVJMPj59XG4gKiBDYWNoZSBmb3IgY2xpZW50LXNpZGUgcmVyb3V0aW5nLCBzaW5jZSBpdCBjb3VsZCBjb250YWluIGFzeW5jIGNhbGxzIHdoaWNoIHdlIHdhbnQgdG9cbiAqIGF2b2lkIHJ1bm5pbmcgbXVsdGlwbGUgdGltZXMgd2hpY2ggd291bGQgc2xvdyBkb3duIG5hdmlnYXRpb25zIChlLmcuIGVsc2UgcHJlbG9hZGluZ1xuICogd291bGRuJ3QgaGVscCBiZWNhdXNlIG9uIG5hdmlnYXRpb24gaXQgd291bGQgYmUgY2FsbGVkIGFnYWluKS4gU2luY2UgYHJlcm91dGVgIHNob3VsZCBiZVxuICogYSBwdXJlIGZ1bmN0aW9uIChpLmUuIGFsd2F5cyByZXR1cm4gdGhlIHNhbWUpIHZhbHVlIGl0J3Mgc2FmZSB0byBjYWNoZSBhY3Jvc3MgbmF2aWdhdGlvbnMuXG4gKiBUaGUgc2VydmVyIHJlcm91dGUgY2FsbHMgZG9uJ3QgbmVlZCB0byBiZSBjYWNoZWQgYmVjYXVzZSB0aGV5IGFyZSBjYWxsZWQgdXNpbmcgYGltcG9ydCguLi4pYFxuICogd2hpY2ggaXMgY2FjaGVkIHBlciB0aGUgSlMgc3BlYy5cbiAqL1xuY29uc3QgcmVyb3V0ZV9jYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBOb3RlIG9uIGJlZm9yZV9uYXZpZ2F0ZV9jYWxsYmFja3MsIG9uX25hdmlnYXRlX2NhbGxiYWNrcyBhbmQgYWZ0ZXJfbmF2aWdhdGVfY2FsbGJhY2tzOlxuICogZG8gbm90IHJlLWFzc2lnbiBhcyBzb21lIGNsb3N1cmVzIGtlZXAgcmVmZXJlbmNlcyB0byB0aGVzZSBTZXRzXG4gKi9cbi8qKiBAdHlwZSB7U2V0PChuYXZpZ2F0aW9uOiBpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5CZWZvcmVOYXZpZ2F0ZSkgPT4gdm9pZD59ICovXG5jb25zdCBiZWZvcmVfbmF2aWdhdGVfY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuXG4vKiogQHR5cGUge1NldDwobmF2aWdhdGlvbjogaW1wb3J0KCdAc3ZlbHRlanMva2l0JykuT25OYXZpZ2F0ZSkgPT4gaW1wb3J0KCd0eXBlcycpLk1heWJlUHJvbWlzZTwoKCkgPT4gdm9pZCkgfCB2b2lkPj59ICovXG5jb25zdCBvbl9uYXZpZ2F0ZV9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5cbi8qKiBAdHlwZSB7U2V0PChuYXZpZ2F0aW9uOiBpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5BZnRlck5hdmlnYXRlKSA9PiB2b2lkPn0gKi9cbmNvbnN0IGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uU3RhdGUgJiB7IG5hdjogaW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvbkV2ZW50IH19ICovXG5sZXQgY3VycmVudCA9IHtcblx0YnJhbmNoOiBbXSxcblx0ZXJyb3I6IG51bGwsXG5cdC8vIEB0cy1pZ25vcmUgLSB3ZSBuZWVkIHRoZSBpbml0aWFsIHZhbHVlIHRvIGJlIG51bGxcblx0dXJsOiBudWxsLFxuXHQvLyBAdHMtaWdub3JlIC0gd2UgbmVlZCB0aGUgaW5pdGlhbCB2YWx1ZSB0byBiZSBudWxsXG5cdG5hdjogbnVsbFxufTtcblxuLyoqIHRoaXMgYmVpbmcgdHJ1ZSBtZWFucyB3ZSBTU1InZCAqL1xubGV0IGh5ZHJhdGVkID0gZmFsc2U7XG5sZXQgc3RhcnRlZCA9IGZhbHNlO1xubGV0IGF1dG9zY3JvbGwgPSB0cnVlO1xubGV0IHVwZGF0aW5nID0gZmFsc2U7XG5sZXQgaXNfbmF2aWdhdGluZyA9IGZhbHNlO1xubGV0IGhhc2hfbmF2aWdhdGluZyA9IGZhbHNlO1xuLyoqIFRydWUgYXMgc29vbiBhcyB0aGVyZSBoYXBwZW5lZCBvbmUgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiAoZXhjbHVkaW5nIHRoZSBTdmVsdGVLaXQtaW5pdGlhbGl6ZWQgaW5pdGlhbCBvbmUgd2hlbiBpbiBTUEEgbW9kZSkgKi9cbmxldCBoYXNfbmF2aWdhdGVkID0gZmFsc2U7XG5cbmxldCBmb3JjZV9pbnZhbGlkYXRpb24gPSBmYWxzZTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3N2ZWx0ZScpLlN2ZWx0ZUNvbXBvbmVudH0gKi9cbmxldCByb290O1xuXG4vKiogQHR5cGUge251bWJlcn0ga2VlcGluZyB0cmFjayBvZiB0aGUgaGlzdG9yeSBpbmRleCBpbiBvcmRlciB0byBwcmV2ZW50IHBvcHN0YXRlIG5hdmlnYXRpb24gZXZlbnRzIGlmIG5lZWRlZCAqL1xubGV0IGN1cnJlbnRfaGlzdG9yeV9pbmRleDtcblxuLyoqIEB0eXBlIHtudW1iZXJ9ICovXG5sZXQgY3VycmVudF9uYXZpZ2F0aW9uX2luZGV4O1xuXG4vKiogQHR5cGUge3t9fSAqL1xubGV0IHRva2VuO1xuXG4vKipcbiAqIEEgc2V0IG9mIHRva2VucyB3aGljaCBhcmUgYXNzb2NpYXRlZCB0byBjdXJyZW50IHByZWxvYWRzLlxuICogSWYgYSBwcmVsb2FkIGJlY29tZXMgYSByZWFsIG5hdmlnYXRpb24sIGl0J3MgcmVtb3ZlZCBmcm9tIHRoZSBzZXQuXG4gKiBJZiBhIHByZWxvYWQgdG9rZW4gaXMgaW4gdGhlIHNldCBhbmQgdGhlIHByZWxvYWQgZXJyb3JzLCB0aGUgZXJyb3JcbiAqIGhhbmRsaW5nIGxvZ2ljIChmb3IgZXhhbXBsZSByZWxvYWRpbmcpIGlzIHNraXBwZWQuXG4gKi9cbi8qKiBAdHlwZSB7U2V0PHt9Pn0gKi9cbmNvbnN0IHByZWxvYWRfdG9rZW5zID0gbmV3IFNldCgpO1xuXG4vKiogQHR5cGUge1Byb21pc2U8dm9pZD4gfCBudWxsfSAqL1xuZXhwb3J0IGxldCBwZW5kaW5nX2ludmFsaWRhdGU7XG5cbi8qKlxuICogQHR5cGUge01hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIENhY2hlRW50cnk8UXVlcnk8YW55Pj4+Pn1cbiAqIEEgbWFwIG9mIHF1ZXJ5IGlkIC0+IHBheWxvYWQgLT4gcXVlcnkgaW50ZXJuYWxzIGZvciBhbGwgYWN0aXZlIHF1ZXJpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeV9tYXAgPSBuZXcgTWFwKCk7XG5cbi8qKlxuICogQHR5cGUge01hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIENhY2hlRW50cnk8TGl2ZVF1ZXJ5PGFueT4+Pj59XG4gKiBBIG1hcCBvZiBpZCAtPiBwYXlsb2FkIC0+IGxpdmUgcXVlcnkgaW50ZXJuYWxzIGZvciBhbGwgYWN0aXZlIHF1ZXJpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBsaXZlX3F1ZXJ5X21hcCA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90eXBlcy5qcycpLlN2ZWx0ZUtpdEFwcH0gX2FwcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gX3RhcmdldFxuICogQHBhcmFtIHtQYXJhbWV0ZXJzPHR5cGVvZiBfaHlkcmF0ZT5bMV19IFtoeWRyYXRlXVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnQoX2FwcCwgX3RhcmdldCwgaHlkcmF0ZSkge1xuXHRpZiAoREVWICYmIF90YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHQnUGxhY2luZyAlc3ZlbHRla2l0LmJvZHklIGRpcmVjdGx5IGluc2lkZSA8Ym9keT4gaXMgbm90IHJlY29tbWVuZGVkLCBhcyB5b3VyIGFwcCBtYXkgYnJlYWsgZm9yIHVzZXJzIHdobyBoYXZlIGNlcnRhaW4gYnJvd3NlciBleHRlbnNpb25zIGluc3RhbGxlZC5cXG5cXG5Db25zaWRlciB3cmFwcGluZyBpdCBpbiBhbiBlbGVtZW50OlxcblxcbjxkaXYgc3R5bGU9XCJkaXNwbGF5OiBjb250ZW50c1wiPlxcbiAgJXN2ZWx0ZWtpdC5ib2R5JVxcbjwvZGl2Pidcblx0XHQpO1xuXHR9XG5cblx0aWYgKF9fU1ZFTFRFS0lUX1BBWUxPQURfXy5kYXRhKSB7XG5cdFx0Y29uc3QgeyBxID0ge30sIHAgPSB7fSwgbCA9IHt9LCBmID0ge30gfSA9IF9fU1ZFTFRFS0lUX1BBWUxPQURfXy5kYXRhO1xuXG5cdFx0Ly8gc3RvcmUgdGhlIHdob2xlIG5vZGVzIOKAlCBlcnJvciByZWNvcmRzIHNlZWQgdGhlIGNvcnJlc3BvbmRpbmdcblx0XHQvLyByZXNvdXJjZXMgaW4gYSBmYWlsZWQgc3RhdGUgd2hlbiB0aGV5IGFyZSBjcmVhdGVkIGR1cmluZyBoeWRyYXRpb25cblx0XHRmb3IgKGNvbnN0IGsgaW4gcSkgcXVlcnlfcmVzcG9uc2VzW2tdID0gcVtrXTtcblx0XHRmb3IgKGNvbnN0IGsgaW4gbCkgcXVlcnlfcmVzcG9uc2VzW2tdID0gbFtrXTtcblx0XHRmb3IgKGNvbnN0IGsgaW4gZikgcXVlcnlfcmVzcG9uc2VzW2tdID0gZltrXTtcblx0XHRmb3IgKGNvbnN0IGsgaW4gcCkgcHJlcmVuZGVyX3Jlc3BvbnNlc1trXSA9IHBba107XG5cdH1cblxuXHQvLyBkZXRlY3QgYmFzaWMgYXV0aCBjcmVkZW50aWFscyBpbiB0aGUgY3VycmVudCBVUkxcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL2tpdC9wdWxsLzExMTc5XG5cdC8vIGlmIHNvLCByZWZyZXNoIHRoZSBwYWdlIHdpdGhvdXQgY3JlZGVudGlhbHNcblx0aWYgKGRvY3VtZW50LlVSTCAhPT0gbG9jYXRpb24uaHJlZikge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWFzc2lnblxuXHRcdGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuXHR9XG5cblx0YXBwID0gX2FwcDtcblxuXHRhd2FpdCBfYXBwLmhvb2tzLmluaXQ/LigpO1xuXG5cdHJvdXRlcyA9IF9fU1ZFTFRFS0lUX0NMSUVOVF9ST1VUSU5HX18gPyBwYXJzZShfYXBwKSA6IFtdO1xuXHRjb250YWluZXIgPSBfX1NWRUxURUtJVF9FTUJFRERFRF9fID8gX3RhcmdldCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0dGFyZ2V0ID0gX3RhcmdldDtcblxuXHQvLyB3ZSBpbXBvcnQgdGhlIHJvb3QgbGF5b3V0L2Vycm9yIG5vZGVzIGVhZ2VybHksIHNvIHRoYXRcblx0Ly8gY29ubmVjdGl2aXR5IGVycm9ycyBhZnRlciBpbml0aWFsaXNhdGlvbiBkb24ndCBudWtlIHRoZSBhcHBcblx0ZGVmYXVsdF9sYXlvdXRfbG9hZGVyID0gX2FwcC5ub2Rlc1swXTtcblx0ZGVmYXVsdF9lcnJvcl9sb2FkZXIgPSBfYXBwLm5vZGVzWzFdO1xuXHR2b2lkIGRlZmF1bHRfbGF5b3V0X2xvYWRlcigpO1xuXHR2b2lkIGRlZmF1bHRfZXJyb3JfbG9hZGVyKCk7XG5cblx0Y3VycmVudF9oaXN0b3J5X2luZGV4ID0gaGlzdG9yeS5zdGF0ZT8uW0hJU1RPUllfSU5ERVhdO1xuXHRjdXJyZW50X25hdmlnYXRpb25faW5kZXggPSBoaXN0b3J5LnN0YXRlPy5bTkFWSUdBVElPTl9JTkRFWF07XG5cblx0aWYgKCFjdXJyZW50X2hpc3RvcnlfaW5kZXgpIHtcblx0XHQvLyB3ZSB1c2UgRGF0ZS5ub3coKSBhcyBhbiBvZmZzZXQgc28gdGhhdCBjcm9zcy1kb2N1bWVudCBuYXZpZ2F0aW9uc1xuXHRcdC8vIHdpdGhpbiB0aGUgYXBwIGRvbid0IHJlc3VsdCBpbiBkYXRhIGxvc3Ncblx0XHRjdXJyZW50X2hpc3RvcnlfaW5kZXggPSBjdXJyZW50X25hdmlnYXRpb25faW5kZXggPSBEYXRlLm5vdygpO1xuXG5cdFx0Ly8gY3JlYXRlIGluaXRpYWwgaGlzdG9yeSBlbnRyeSwgc28gd2UgY2FuIHJldHVybiBoZXJlXG5cdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoXG5cdFx0XHR7XG5cdFx0XHRcdC4uLmhpc3Rvcnkuc3RhdGUsXG5cdFx0XHRcdFtISVNUT1JZX0lOREVYXTogY3VycmVudF9oaXN0b3J5X2luZGV4LFxuXHRcdFx0XHRbTkFWSUdBVElPTl9JTkRFWF06IGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleFxuXHRcdFx0fSxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdC8vIGlmIHdlIHJlbG9hZCB0aGUgcGFnZSwgb3IgQ21kLVNoaWZ0LVQgYmFjayB0byBpdCxcblx0Ly8gcmVjb3ZlciBzY3JvbGwgcG9zaXRpb25cblx0Y29uc3Qgc2Nyb2xsID0gc2Nyb2xsX3Bvc2l0aW9uc1tjdXJyZW50X2hpc3RvcnlfaW5kZXhdO1xuXHRmdW5jdGlvbiByZXN0b3JlX3Njcm9sbCgpIHtcblx0XHRpZiAoc2Nyb2xsKSB7XG5cdFx0XHRoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG5cdFx0XHRzY3JvbGxUbyhzY3JvbGwueCwgc2Nyb2xsLnkpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChoeWRyYXRlKSB7XG5cdFx0cmVzdG9yZV9zY3JvbGwoKTtcblxuXHRcdGF3YWl0IF9oeWRyYXRlKHRhcmdldCwgaHlkcmF0ZSk7XG5cdH0gZWxzZSB7XG5cdFx0YXdhaXQgbmF2aWdhdGUoe1xuXHRcdFx0dHlwZTogJ2VudGVyJyxcblx0XHRcdHVybDogcmVzb2x2ZV91cmwoYXBwLmhhc2ggPyBkZWNvZGVfaGFzaChuZXcgVVJMKGxvY2F0aW9uLmhyZWYpKSA6IGxvY2F0aW9uLmhyZWYpLFxuXHRcdFx0cmVwbGFjZV9zdGF0ZTogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0cmVzdG9yZV9zY3JvbGwoKTtcblx0fVxuXG5cdF9zdGFydF9yb3V0ZXIoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2ludmFsaWRhdGUoaW5jbHVkZV9sb2FkX2Z1bmN0aW9ucyA9IHRydWUsIHJlc2V0X3BhZ2Vfc3RhdGUgPSB0cnVlKSB7XG5cdC8vIEFjY2VwdCBhbGwgaW52YWxpZGF0aW9ucyBhcyB0aGV5IGNvbWUsIGRvbid0IHN3YWxsb3cgYW55IHdoaWxlIGFub3RoZXIgaW52YWxpZGF0aW9uXG5cdC8vIGlzIHJ1bm5pbmcgYmVjYXVzZSBzdWJzZXF1ZW50IGludmFsaWRhdGlvbnMgbWF5IG1ha2UgZWFybGllciBvbmVzIG91dGRhdGVkLFxuXHQvLyBidXQgYmF0Y2ggbXVsdGlwbGUgc3luY2hyb25vdXMgaW52YWxpZGF0aW9ucy5cblx0YXdhaXQgKHBlbmRpbmdfaW52YWxpZGF0ZSB8fD0gUHJvbWlzZS5yZXNvbHZlKCkpO1xuXHRpZiAoIXBlbmRpbmdfaW52YWxpZGF0ZSkgcmV0dXJuO1xuXHRwZW5kaW5nX2ludmFsaWRhdGUgPSBudWxsO1xuXG5cdGNvbnN0IG5hdl90b2tlbiA9ICh0b2tlbiA9IHt9KTtcblx0Y29uc3QgaW50ZW50ID0gYXdhaXQgZ2V0X25hdmlnYXRpb25faW50ZW50KGN1cnJlbnQudXJsLCB0cnVlKTtcblxuXHQvLyBDbGVhciBwcmVsb2FkLCBpdCBtaWdodCBiZSBhZmZlY3RlZCBieSB0aGUgaW52YWxpZGF0aW9uLlxuXHQvLyBBbHNvIHNvbHZlcyBhbiBlZGdlIGNhc2Ugd2hlcmUgYSBwcmVsb2FkIGlzIHRyaWdnZXJlZCwgdGhlIG5hdmlnYXRpb24gZm9yIGl0XG5cdC8vIHdhcyB0aGVuIHRyaWdnZXJlZCBhbmQgaXMgc3RpbGwgcnVubmluZyB3aGlsZSB0aGUgaW52YWxpZGF0aW9uIGtpY2tzIGluLFxuXHQvLyBhdCB3aGljaCBwb2ludCB0aGUgaW52YWxpZGF0aW9uIHNob3VsZCB0YWtlIG92ZXIgYW5kIFwid2luXCIuXG5cdGRpc2NhcmRfbG9hZF9jYWNoZSgpO1xuXG5cdC8vIFJlcnVuIHF1ZXJpZXNcblx0LyoqIEB0eXBlIHtNYXA8c3RyaW5nLCBQcm9taXNlPHZvaWQ+Pn0gKi9cblx0Y29uc3QgbGl2ZV9xdWVyeV9yZWNvbm5lY3RzID0gbmV3IE1hcCgpO1xuXHRpZiAoZm9yY2VfaW52YWxpZGF0aW9uKSB7XG5cdFx0Zm9yIChjb25zdCBlbnRyaWVzIG9mIHF1ZXJ5X21hcC52YWx1ZXMoKSkge1xuXHRcdFx0Zm9yIChjb25zdCB7IHJlc291cmNlIH0gb2YgZW50cmllcy52YWx1ZXMoKSkge1xuXHRcdFx0XHR2b2lkIHJlc291cmNlLnJlZnJlc2goKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IFtxdWVyeV9pZCwgZW50cmllc10gb2YgbGl2ZV9xdWVyeV9tYXApIHtcblx0XHRcdGZvciAoY29uc3QgW3BheWxvYWQsIHsgcmVzb3VyY2UgfV0gb2YgZW50cmllcykge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBjcmVhdGVfcmVtb3RlX2tleShxdWVyeV9pZCwgcGF5bG9hZCk7XG5cdFx0XHRcdGNvbnN0IHByb21pc2UgPSByZXNvdXJjZS5yZWNvbm5lY3QoKTtcblx0XHRcdFx0cHJvbWlzZS5jYXRjaChub29wKTtcblx0XHRcdFx0bGl2ZV9xdWVyeV9yZWNvbm5lY3RzLnNldChrZXksIHByb21pc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChpbmNsdWRlX2xvYWRfZnVuY3Rpb25zKSB7XG5cdFx0Y29uc3QgcHJldl9zdGF0ZSA9IHBhZ2Uuc3RhdGU7XG5cdFx0Y29uc3QgbmF2aWdhdGlvbl9yZXN1bHQgPSBpbnRlbnQgJiYgKGF3YWl0IGxvYWRfcm91dGUoaW50ZW50KSk7XG5cdFx0aWYgKCFuYXZpZ2F0aW9uX3Jlc3VsdCB8fCBuYXZfdG9rZW4gIT09IHRva2VuKSByZXR1cm47XG5cblx0XHRpZiAobmF2aWdhdGlvbl9yZXN1bHQudHlwZSA9PT0gJ3JlZGlyZWN0Jykge1xuXHRcdFx0cmV0dXJuIF9nb3RvKFxuXHRcdFx0XHRuZXcgVVJMKG5hdmlnYXRpb25fcmVzdWx0LmxvY2F0aW9uLCBjdXJyZW50LnVybCkuaHJlZixcblx0XHRcdFx0eyByZXBsYWNlU3RhdGU6IHRydWUgfSxcblx0XHRcdFx0MSxcblx0XHRcdFx0bmF2X3Rva2VuXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8vIFRoaXMgaXMgYSBiaXQgaGFja3kgYnV0IGFsbG93cyB1cyBub3QgaGF2aW5nIHRvIHBhc3MgdGhhdCBib29sZWFuIGFyb3VuZCwgbWFraW5nIHRoaW5ncyBoYXJkZXIgdG8gcmVhc29uIGFib3V0XG5cdFx0aWYgKCFyZXNldF9wYWdlX3N0YXRlKSB7XG5cdFx0XHRuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcy5wYWdlLnN0YXRlID0gcHJldl9zdGF0ZTtcblx0XHR9XG5cdFx0dXBkYXRlKG5hdmlnYXRpb25fcmVzdWx0LnByb3BzLnBhZ2UpO1xuXHRcdGN1cnJlbnQgPSB7IC4uLm5hdmlnYXRpb25fcmVzdWx0LnN0YXRlLCBuYXY6IGN1cnJlbnQubmF2IH07XG5cdFx0cmVzZXRfaW52YWxpZGF0aW9uKCk7XG5cdFx0cm9vdC4kc2V0KG5hdmlnYXRpb25fcmVzdWx0LnByb3BzKTtcblx0fSBlbHNlIHtcblx0XHRyZXNldF9pbnZhbGlkYXRpb24oKTtcblx0fVxuXG5cdC8vIG9ubHkgd2FpdCBmb3IgcHJvbWlzZXMgdGhhdCBhcmUgY29ubmVjdGVkIHRvIHF1ZXJpZXMgdGhhdCBzdGlsbCBleGlzdFxuXHQvKiogQHR5cGUge1Byb21pc2U8YW55PltdfSAqL1xuXHRjb25zdCBwcm9taXNlcyA9IFtdO1xuXHRmb3IgKGNvbnN0IGVudHJpZXMgb2YgcXVlcnlfbWFwLnZhbHVlcygpKSB7XG5cdFx0Zm9yIChjb25zdCB7IHJlc291cmNlIH0gb2YgZW50cmllcy52YWx1ZXMoKSkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChyZXNvdXJjZSk7XG5cdFx0fVxuXHR9XG5cdGZvciAoY29uc3QgW3F1ZXJ5X2lkLCBlbnRyaWVzXSBvZiBsaXZlX3F1ZXJ5X21hcCkge1xuXHRcdGZvciAoY29uc3QgcGF5bG9hZCBvZiBlbnRyaWVzLmtleXMoKSkge1xuXHRcdFx0Y29uc3Qga2V5ID0gY3JlYXRlX3JlbW90ZV9rZXkocXVlcnlfaWQsIHBheWxvYWQpO1xuXHRcdFx0Y29uc3QgcHJvbWlzZSA9IGxpdmVfcXVlcnlfcmVjb25uZWN0cy5nZXQoa2V5KTtcblx0XHRcdGlmIChwcm9taXNlKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gRG9uJ3QgdXNlIGFsbFNldHRsZWQgeWV0IGJlY2F1c2UgaXQncyB0b28gbmV3XG5cdGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKS5jYXRjaChub29wKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRfaW52YWxpZGF0aW9uKCkge1xuXHRpbnZhbGlkYXRlZC5sZW5ndGggPSAwO1xuXHRmb3JjZV9pbnZhbGlkYXRpb24gPSBmYWxzZTtcbn1cblxuLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuZnVuY3Rpb24gY2FwdHVyZV9zbmFwc2hvdChpbmRleCkge1xuXHRpZiAoY29tcG9uZW50cy5zb21lKChjKSA9PiBjPy5zbmFwc2hvdCkpIHtcblx0XHRzbmFwc2hvdHNbaW5kZXhdID0gY29tcG9uZW50cy5tYXAoKGMpID0+IGM/LnNuYXBzaG90Py5jYXB0dXJlKCkpO1xuXHR9XG59XG5cbi8qKiBAcGFyYW0ge251bWJlcn0gaW5kZXggKi9cbmZ1bmN0aW9uIHJlc3RvcmVfc25hcHNob3QoaW5kZXgpIHtcblx0c25hcHNob3RzW2luZGV4XT8uZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcblx0XHRjb21wb25lbnRzW2ldPy5zbmFwc2hvdD8ucmVzdG9yZSh2YWx1ZSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBwZXJzaXN0X3N0YXRlKCkge1xuXHR1cGRhdGVfc2Nyb2xsX3Bvc2l0aW9ucyhjdXJyZW50X2hpc3RvcnlfaW5kZXgpO1xuXHRzdG9yYWdlLnNldChTQ1JPTExfS0VZLCBzY3JvbGxfcG9zaXRpb25zKTtcblxuXHRjYXB0dXJlX3NuYXBzaG90KGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleCk7XG5cdHN0b3JhZ2Uuc2V0KFNOQVBTSE9UX0tFWSwgc25hcHNob3RzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZyB8IFVSTH0gdXJsXG4gKiBAcGFyYW0ge3sgcmVwbGFjZVN0YXRlPzogYm9vbGVhbjsgbm9TY3JvbGw/OiBib29sZWFuOyBrZWVwRm9jdXM/OiBib29sZWFuOyBpbnZhbGlkYXRlQWxsPzogYm9vbGVhbjsgaW52YWxpZGF0ZT86IEFycmF5PHN0cmluZyB8IFVSTCB8ICgodXJsOiBVUkwpID0+IGJvb2xlYW4pPjsgc3RhdGU/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH19IG9wdGlvbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSByZWRpcmVjdF9jb3VudFxuICogQHBhcmFtIHt7fX0gW25hdl90b2tlbl1cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gX2dvdG8odXJsLCBvcHRpb25zLCByZWRpcmVjdF9jb3VudCwgbmF2X3Rva2VuKSB7XG5cdC8qKiBAdHlwZSB7U2V0PHN0cmluZz59ICovXG5cdGxldCBxdWVyeV9rZXlzO1xuXHQvKiogQHR5cGUge1NldDxzdHJpbmc+fSAqL1xuXHRsZXQgbGl2ZV9xdWVyeV9rZXlzO1xuXG5cdC8vIENsZWFyIHByZWxvYWQgY2FjaGUgd2hlbiBpbnZhbGlkYXRlQWxsIGlzIHRydWUgdG8gZW5zdXJlIGZyZXNoIGRhdGFcblx0Ly8gYWZ0ZXIgZm9ybSBzdWJtaXNzaW9ucyBvciBleHBsaWNpdCBpbnZhbGlkYXRpb25zXG5cdGlmIChvcHRpb25zLmludmFsaWRhdGVBbGwpIHtcblx0XHRkaXNjYXJkX2xvYWRfY2FjaGUoKTtcblx0fVxuXG5cdGF3YWl0IG5hdmlnYXRlKHtcblx0XHR0eXBlOiAnZ290bycsXG5cdFx0dXJsOiByZXNvbHZlX3VybCh1cmwpLFxuXHRcdGtlZXBmb2N1czogb3B0aW9ucy5rZWVwRm9jdXMsXG5cdFx0bm9zY3JvbGw6IG9wdGlvbnMubm9TY3JvbGwsXG5cdFx0cmVwbGFjZV9zdGF0ZTogb3B0aW9ucy5yZXBsYWNlU3RhdGUsXG5cdFx0c3RhdGU6IG9wdGlvbnMuc3RhdGUsXG5cdFx0cmVkaXJlY3RfY291bnQsXG5cdFx0bmF2X3Rva2VuLFxuXHRcdGFjY2VwdDogKCkgPT4ge1xuXHRcdFx0aWYgKG9wdGlvbnMuaW52YWxpZGF0ZUFsbCkge1xuXHRcdFx0XHRmb3JjZV9pbnZhbGlkYXRpb24gPSB0cnVlO1xuXHRcdFx0XHRxdWVyeV9rZXlzID0gbmV3IFNldCgpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgcXVlcnlfbWFwKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBbcGF5bG9hZCwgZW50cnldIG9mIGVudHJpZXMpIHtcblx0XHRcdFx0XHRcdC8vIGRvbid0IHJlZnJlc2ggeWV0LCBhcyBzb21lIHF1ZXJpZXMgd2lsbCBiZSB1bnJlbmRlcmVkLFxuXHRcdFx0XHRcdFx0Ly8gYnV0IGNsZWFyIGNhY2hlcyBzbyB0aGF0IG5ld2x5IHJlbmRlcmVkIHF1ZXJpZXNcblx0XHRcdFx0XHRcdC8vIGRvbid0IHVzZSBzdGFsZSBkYXRhLiBUT0RPIHNhbWUgZm9yIGBsaXZlX3F1ZXJ5X21hcGBcblx0XHRcdFx0XHRcdGVudHJ5LnJlc291cmNlPy5yZXNldCgpO1xuXHRcdFx0XHRcdFx0cXVlcnlfa2V5cy5hZGQoY3JlYXRlX3JlbW90ZV9rZXkoaWQsIHBheWxvYWQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0bGl2ZV9xdWVyeV9rZXlzID0gbmV3IFNldCgpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgbGl2ZV9xdWVyeV9tYXApIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBheWxvYWQgb2YgZW50cmllcy5rZXlzKCkpIHtcblx0XHRcdFx0XHRcdGxpdmVfcXVlcnlfa2V5cy5hZGQoY3JlYXRlX3JlbW90ZV9rZXkoaWQsIHBheWxvYWQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuaW52YWxpZGF0ZSkge1xuXHRcdFx0XHRvcHRpb25zLmludmFsaWRhdGUuZm9yRWFjaChwdXNoX2ludmFsaWRhdGVkKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdGlmIChvcHRpb25zLmludmFsaWRhdGVBbGwpIHtcblx0XHQvLyBUT0RPIHRoZSB0aWNrcyBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5LCBzb21ldGhpbmcgaW5zaWRlIFN2ZWx0ZSBpdHNlbGYgaXMgYnVnZ3lcblx0XHQvLyB3aGVuIGEgcXVlcnkgaW4gYSBsYXlvdXQgdGhhdCBzdGlsbCBleGlzdHMgYWZ0ZXIgcGFnZSBjaGFuZ2UgaXMgcmVmcmVzaGVkIGVhcmxpZXIgdGhhbiB0aGlzXG5cdFx0dm9pZCBzdmVsdGVcblx0XHRcdC50aWNrKClcblx0XHRcdC50aGVuKHN2ZWx0ZS50aWNrKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgcXVlcnlfbWFwKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBbcGF5bG9hZCwgeyByZXNvdXJjZSB9XSBvZiBlbnRyaWVzKSB7XG5cdFx0XHRcdFx0XHRpZiAocXVlcnlfa2V5cz8uaGFzKGNyZWF0ZV9yZW1vdGVfa2V5KGlkLCBwYXlsb2FkKSkpIHtcblx0XHRcdFx0XHRcdFx0dm9pZCByZXNvdXJjZS5zdGFydCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgbGl2ZV9xdWVyeV9tYXApIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IFtwYXlsb2FkLCB7IHJlc291cmNlIH1dIG9mIGVudHJpZXMpIHtcblx0XHRcdFx0XHRcdGlmIChsaXZlX3F1ZXJ5X2tleXM/LmhhcyhjcmVhdGVfcmVtb3RlX2tleShpZCwgcGF5bG9hZCkpKSB7XG5cdFx0XHRcdFx0XHRcdHZvaWQgcmVzb3VyY2UucmVjb25uZWN0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxufVxuXG4vKiogQHBhcmFtIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uSW50ZW50fSBpbnRlbnQgKi9cbmFzeW5jIGZ1bmN0aW9uIF9wcmVsb2FkX2RhdGEoaW50ZW50KSB7XG5cdC8vIFJldXNlIHRoZSBleGlzdGluZyBwZW5kaW5nIHByZWxvYWQgaWYgaXQncyBmb3IgdGhlIHNhbWUgbmF2aWdhdGlvbi5cblx0Ly8gUHJldmVudHMgYW4gZWRnZSBjYXNlIHdoZXJlIHNhbWUgcHJlbG9hZCBpcyB0cmlnZ2VyZWQgbXVsdGlwbGUgdGltZXMsXG5cdC8vIHRoZW4gYSBsYXRlciBvbmUgaXMgYmVjb21pbmcgdGhlIHJlYWwgbmF2aWdhdGlvbiBhbmQgdGhlIHByZWxvYWQgdG9rZW5zXG5cdC8vIGdldCBvdXQgb2Ygc3luYy5cblx0aWYgKGludGVudC5pZCAhPT0gbG9hZF9jYWNoZT8uaWQpIHtcblx0XHRkaXNjYXJkX2xvYWRfY2FjaGUoKTtcblxuXHRcdGNvbnN0IHByZWxvYWQgPSB7fTtcblx0XHRwcmVsb2FkX3Rva2Vucy5hZGQocHJlbG9hZCk7XG5cdFx0bG9hZF9jYWNoZSA9IHtcblx0XHRcdGlkOiBpbnRlbnQuaWQsXG5cdFx0XHR0b2tlbjogcHJlbG9hZCxcblx0XHRcdHByb21pc2U6IGxvYWRfcm91dGUoeyAuLi5pbnRlbnQsIHByZWxvYWQgfSkudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdHByZWxvYWRfdG9rZW5zLmRlbGV0ZShwcmVsb2FkKTtcblx0XHRcdFx0aWYgKHJlc3VsdC50eXBlID09PSAnbG9hZGVkJyAmJiByZXN1bHQuc3RhdGUuZXJyb3IpIHtcblx0XHRcdFx0XHQvLyBEb24ndCBjYWNoZSBlcnJvcnMsIGJlY2F1c2UgdGhleSBtaWdodCBiZSB0cmFuc2llbnRcblx0XHRcdFx0XHRkaXNjYXJkX2xvYWRfY2FjaGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSksXG5cdFx0XHRmb3JrOiBudWxsXG5cdFx0fTtcblxuXHRcdGlmIChfX1NWRUxURUtJVF9GT1JLX1BSRUxPQURTX18gJiYgc3ZlbHRlLmZvcmspIHtcblx0XHRcdGNvbnN0IGxjID0gbG9hZF9jYWNoZTtcblxuXHRcdFx0bGMuZm9yayA9IGxjLnByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdC8vIGlmIGxvYWRfY2FjaGUgd2FzIGRpc2NhcmRlZCBiZWZvcmUgbG9hZF9jYWNoZS5wcm9taXNlIGNvdWxkXG5cdFx0XHRcdC8vIHJlc29sdmUsIGJhaWwgcmF0aGVyIHRoYW4gY3JlYXRpbmcgYW4gb3JwaGFuIGZvcmtcblx0XHRcdFx0aWYgKGxjID09PSBsb2FkX2NhY2hlICYmIHJlc3VsdC50eXBlID09PSAnbG9hZGVkJykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ZlbHRlLmZvcmsoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyb290LiRzZXQocmVzdWx0LnByb3BzKTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlKHJlc3VsdC5wcm9wcy5wYWdlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdFx0Ly8gaWYgaXQgZXJyb3JzLCBpdCdzIGJlY2F1c2UgdGhlIGV4cGVyaW1lbnRhbCBmbGFnIGlzbid0IGVuYWJsZWQgaW4gU3ZlbHRlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbG9hZF9jYWNoZS5wcm9taXNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VVJMfSB1cmxcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5hc3luYyBmdW5jdGlvbiBfcHJlbG9hZF9jb2RlKHVybCkge1xuXHRjb25zdCByb3V0ZSA9IChhd2FpdCBnZXRfbmF2aWdhdGlvbl9pbnRlbnQodXJsLCBmYWxzZSkpPy5yb3V0ZTtcblxuXHRpZiAocm91dGUpIHtcblx0XHRhd2FpdCBQcm9taXNlLmFsbChcblx0XHRcdC8qKiBAdHlwZSB7W2hhc19zZXJ2ZXJfbG9hZDogYm9vbGVhbiwgbm9kZV9sb2FkZXI6IGltcG9ydCgndHlwZXMnKS5DU1JQYWdlTm9kZUxvYWRlcl1bXX0gKi8gKFxuXHRcdFx0XHRbLi4ucm91dGUubGF5b3V0cywgcm91dGUubGVhZl0uZmlsdGVyKEJvb2xlYW4pXG5cdFx0XHQpLm1hcCgobG9hZCkgPT4gbG9hZFsxXSgpKVxuXHRcdCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25GaW5pc2hlZH0gcmVzdWx0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaHlkcmF0ZVxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKHJlc3VsdCwgdGFyZ2V0LCBoeWRyYXRlKSB7XG5cdGlmIChfX1NWRUxURUtJVF9ERVZfXyAmJiByZXN1bHQuc3RhdGUuZXJyb3IgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcigndml0ZS1lcnJvci1vdmVybGF5JykpXG5cdFx0cmV0dXJuO1xuXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvbkV2ZW50fSAqL1xuXHRjb25zdCBuYXYgPSB7XG5cdFx0cGFyYW1zOiBjdXJyZW50LnBhcmFtcyxcblx0XHRyb3V0ZTogeyBpZDogY3VycmVudC5yb3V0ZT8uaWQgPz8gbnVsbCB9LFxuXHRcdHVybDogbmV3IFVSTChsb2NhdGlvbi5ocmVmKVxuXHR9O1xuXG5cdGN1cnJlbnQgPSB7XG5cdFx0Li4ucmVzdWx0LnN0YXRlLFxuXHRcdG5hdlxuXHR9O1xuXG5cdC8vIFJlbW92ZXMgdGhlIHN0eWxlIG5vZGUgd2UgdXNlZCB0byBhdm9pZCBGT1VDIGR1cmluZyBkZXZlbG9wbWVudFxuXHRpZiAoX19TVkVMVEVLSVRfREVWX18pIHtcblx0XHRjb25zdCBzdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtc3ZlbHRla2l0XScpO1xuXHRcdGlmIChzdHlsZSkgc3R5bGUucmVtb3ZlKCk7XG5cdH1cblxuXHR1cGRhdGUoLyoqIEB0eXBlIHtpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5QYWdlfSAqLyAocmVzdWx0LnByb3BzLnBhZ2UpKTtcblxuXHRyb290ID0gbmV3IGFwcC5yb290KHtcblx0XHR0YXJnZXQsXG5cdFx0cHJvcHM6IHsgLi4ucmVzdWx0LnByb3BzLCBzdG9yZXMsIGNvbXBvbmVudHMgfSxcblx0XHRoeWRyYXRlLFxuXHRcdC8vIEB0cy1pZ25vcmUgU3ZlbHRlIDUgc3BlY2lmaWM6IGFzeW5jaHJvbm91c2x5IGluc3RhbnRpYXRlIHRoZSBjb21wb25lbnQsIGkuZS4gZG9uJ3QgY2FsbCBmbHVzaFN5bmNcblx0XHRzeW5jOiBmYWxzZSxcblx0XHQvLyBAdHMtaWdub3JlIFN2ZWx0ZSA1IHNwZWNpZmljOiB0cmFuc2Zvcm1FcnJvciBhbGxvd3MgdG8gdHJhbnNmb3JtIGVycm9ycyBiZWZvcmUgdGhleSBhcmUgcGFzc2VkIHRvIGJvdW5kYXJpZXNcblx0XHR0cmFuc2Zvcm1FcnJvcjogX19TVkVMVEVLSVRfRVhQRVJJTUVOVEFMX1VTRV9UUkFOU0ZPUk1fRVJST1JfX1xuXHRcdFx0PyAvKiogQHBhcmFtIHt1bmtub3dufSBlICovIGFzeW5jIChlKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3IgPSBhd2FpdCBoYW5kbGVfZXJyb3IoZSwgY3VycmVudC5uYXYpO1xuXHRcdFx0XHRcdHJlbmRlcmluZ19lcnJvciA9IHsgZXJyb3IsIHN0YXR1czogZ2V0X3N0YXR1cyhlKSB9O1xuXHRcdFx0XHRcdHBhZ2UuZXJyb3IgPSBlcnJvcjtcblx0XHRcdFx0XHRwYWdlLnN0YXR1cyA9IHJlbmRlcmluZ19lcnJvci5zdGF0dXM7XG5cdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHQ6IHVuZGVmaW5lZFxuXHR9KTtcblxuXHQvLyBXYWl0IGZvciBhIG1pY3JvdGFzayBpbiBjYXNlIHN2ZWx0ZSBleHBlcmltZW50YWwgYXN5bmMgaXMgZW5hYmxlZCxcblx0Ly8gd2hpY2ggY2F1c2VzIGNvbXBvbmVudCBzY3JpcHQgYmxvY2tzIHRvIHJ1biBhc3luY2hyb25vdXNseVxuXHR2b2lkIChhd2FpdCBQcm9taXNlLnJlc29sdmUoKSk7XG5cblx0aWYgKGh5ZHJhdGUpIHtcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnQHN2ZWx0ZWpzL2tpdCcpLkFmdGVyTmF2aWdhdGV9ICovXG5cdFx0Y29uc3QgbmF2aWdhdGlvbiA9IHtcblx0XHRcdGZyb206IG51bGwsXG5cdFx0XHR0bzoge1xuXHRcdFx0XHQuLi5uYXYsXG5cdFx0XHRcdHNjcm9sbDogc2Nyb2xsX3Bvc2l0aW9uc1tjdXJyZW50X2hpc3RvcnlfaW5kZXhdID8/IHNjcm9sbF9zdGF0ZSgpXG5cdFx0XHR9LFxuXHRcdFx0d2lsbFVubG9hZDogZmFsc2UsXG5cdFx0XHR0eXBlOiAnZW50ZXInLFxuXHRcdFx0Y29tcGxldGU6IFByb21pc2UucmVzb2x2ZSgpXG5cdFx0fTtcblxuXHRcdGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcy5mb3JFYWNoKChmbikgPT4gZm4obmF2aWdhdGlvbikpO1xuXHR9XG5cblx0cmVzdG9yZV9zbmFwc2hvdChjdXJyZW50X25hdmlnYXRpb25faW5kZXgpO1xuXG5cdHN0YXJ0ZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3tcbiAqICAgdXJsOiBVUkw7XG4gKiAgIHBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAqICAgYnJhbmNoOiBBcnJheTxpbXBvcnQoJy4vdHlwZXMuanMnKS5CcmFuY2hOb2RlIHwgdW5kZWZpbmVkPjtcbiAqICAgZXJyb3JzPzogQXJyYXk8aW1wb3J0KCd0eXBlcycpLkNTUlBhZ2VOb2RlTG9hZGVyIHwgdW5kZWZpbmVkPjtcbiAqICAgc3RhdHVzOiBudW1iZXI7XG4gKiAgIGVycm9yOiBBcHAuRXJyb3IgfCBudWxsO1xuICogICByb3V0ZTogaW1wb3J0KCd0eXBlcycpLkNTUlJvdXRlIHwgbnVsbDtcbiAqICAgZm9ybT86IFJlY29yZDxzdHJpbmcsIGFueT4gfCBudWxsO1xuICogfX0gb3B0c1xuICovXG5hc3luYyBmdW5jdGlvbiBnZXRfbmF2aWdhdGlvbl9yZXN1bHRfZnJvbV9icmFuY2goe1xuXHR1cmwsXG5cdHBhcmFtcyxcblx0YnJhbmNoLFxuXHRlcnJvcnMsXG5cdHN0YXR1cyxcblx0ZXJyb3IsXG5cdHJvdXRlLFxuXHRmb3JtXG59KSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCd0eXBlcycpLlRyYWlsaW5nU2xhc2h9ICovXG5cdGxldCBzbGFzaCA9ICduZXZlcic7XG5cblx0Ly8gaWYgYHBhdGhzLmJhc2UgPT09ICcvYS9iL2NgLCB0aGVuIHRoZSByb290IHJvdXRlIGlzIGFsd2F5cyBgL2EvYi9jL2AsIHJlZ2FyZGxlc3Mgb2Zcblx0Ly8gdGhlIGB0cmFpbGluZ1NsYXNoYCByb3V0ZSBvcHRpb24sIHNvIHRoYXQgcmVsYXRpdmUgcGF0aHMgdG8gSlMgYW5kIENTUyB3b3JrXG5cdGlmIChiYXNlICYmICh1cmwucGF0aG5hbWUgPT09IGJhc2UgfHwgdXJsLnBhdGhuYW1lID09PSBiYXNlICsgJy8nKSkge1xuXHRcdHNsYXNoID0gJ2Fsd2F5cyc7XG5cdH0gZWxzZSB7XG5cdFx0Zm9yIChjb25zdCBub2RlIG9mIGJyYW5jaCkge1xuXHRcdFx0aWYgKG5vZGU/LnNsYXNoICE9PSB1bmRlZmluZWQpIHNsYXNoID0gbm9kZS5zbGFzaDtcblx0XHR9XG5cdH1cblxuXHR1cmwucGF0aG5hbWUgPSBub3JtYWxpemVfcGF0aCh1cmwucGF0aG5hbWUsIHNsYXNoKTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtYXNzaWduXG5cdHVybC5zZWFyY2ggPSB1cmwuc2VhcmNoOyAvLyB0dXJuIGAvP2AgaW50byBgL2BcblxuXHQvKiogQHR5cGUge2ltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25GaW5pc2hlZH0gKi9cblx0Y29uc3QgcmVzdWx0ID0ge1xuXHRcdHR5cGU6ICdsb2FkZWQnLFxuXHRcdHN0YXRlOiB7XG5cdFx0XHR1cmwsXG5cdFx0XHRwYXJhbXMsXG5cdFx0XHRicmFuY2gsXG5cdFx0XHRlcnJvcixcblx0XHRcdHJvdXRlXG5cdFx0fSxcblx0XHRwcm9wczoge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBTb21laG93IGl0J3MgZ2V0dGluZyBTdmVsdGVDb21wb25lbnQgYW5kIFN2ZWx0ZUNvbXBvbmVudERldiBtaXhlZCB1cFxuXHRcdFx0Y29uc3RydWN0b3JzOiBjb21wYWN0KGJyYW5jaCkubWFwKChicmFuY2hfbm9kZSkgPT4gYnJhbmNoX25vZGUubm9kZS5jb21wb25lbnQpLFxuXHRcdFx0cGFnZTogY2xvbmVfcGFnZShwYWdlKVxuXHRcdH1cblx0fTtcblxuXHRpZiAoZXJyb3JzICYmIF9fU1ZFTFRFS0lUX0VYUEVSSU1FTlRBTF9VU0VfVFJBTlNGT1JNX0VSUk9SX18pIHtcblx0XHRsZXQgbGFzdF9pZHggPSAtMTtcblx0XHRyZXN1bHQucHJvcHMuZXJyb3JzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2F3YWl0LXRoZW5hYmxlXG5cdFx0XHRicmFuY2hcblx0XHRcdFx0Lm1hcCgoYiwgaSkgPT4ge1xuXHRcdFx0XHRcdGlmIChpID09PSAwKSByZXR1cm4gdW5kZWZpbmVkOyAvLyByb290IGxheW91dCB3cmFwcyByb290IGVycm9yIGNvbXBvbmVudCwgbm90IHRoZSBvdGhlciB3YXkgYXJvdW5kXG5cdFx0XHRcdFx0aWYgKCFiKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHQvLyBGaW5kIHRoZSBjbG9zZXN0IGVycm9yIGNvbXBvbmVudCB1cCB0byB0aGUgcHJldmlvdXMgYnJhbmNoXG5cdFx0XHRcdFx0d2hpbGUgKGkgPiBsYXN0X2lkeCArIDEgJiYgIWVycm9yc1tpXSkgaSAtPSAxO1xuXHRcdFx0XHRcdGxhc3RfaWR4ID0gaTtcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3JzW2ldPy4oKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGUpID0+IGUuY29tcG9uZW50KVxuXHRcdFx0XHRcdFx0LmNhdGNoKCgpID0+IHVuZGVmaW5lZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC8vIGZpbHRlciBvdXQgaW5kZXhlcyB3aGVyZSB0aGVyZSB3YXMgbm8gYnJhbmNoLCBidXQga2VlcCBpbmRleGVzIHdoZXJlIHRoZXJlIHdhcyBhIGJyYW5jaCBidXQgbm8gZXJyb3IgY29tcG9uZW50XG5cdFx0XHRcdC5maWx0ZXIoKGUpID0+IGUgIT09IG51bGwpXG5cdFx0KTtcblx0fVxuXG5cdGlmIChlcnJvciAmJiBfX1NWRUxURUtJVF9FWFBFUklNRU5UQUxfVVNFX1RSQU5TRk9STV9FUlJPUl9fKSB7XG5cdFx0cmVzdWx0LnByb3BzLmVycm9yID0gZXJyb3I7XG5cdH1cblxuXHRpZiAoZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmVzdWx0LnByb3BzLmZvcm0gPSBmb3JtO1xuXHR9XG5cblx0bGV0IGRhdGEgPSB7fTtcblx0bGV0IGRhdGFfY2hhbmdlZCA9ICFwYWdlO1xuXG5cdGxldCBwID0gMDtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWF4KGJyYW5jaC5sZW5ndGgsIGN1cnJlbnQuYnJhbmNoLmxlbmd0aCk7IGkgKz0gMSkge1xuXHRcdGNvbnN0IG5vZGUgPSBicmFuY2hbaV07XG5cdFx0Y29uc3QgcHJldiA9IGN1cnJlbnQuYnJhbmNoW2ldO1xuXG5cdFx0aWYgKG5vZGU/LmRhdGEgIT09IHByZXY/LmRhdGEpIGRhdGFfY2hhbmdlZCA9IHRydWU7XG5cdFx0aWYgKCFub2RlKSBjb250aW51ZTtcblxuXHRcdGRhdGEgPSB7IC4uLmRhdGEsIC4uLm5vZGUuZGF0YSB9O1xuXG5cdFx0Ly8gT25seSBzZXQgcHJvcHMgaWYgdGhlIG5vZGUgYWN0dWFsbHkgdXBkYXRlZC4gVGhpcyBwcmV2ZW50cyBuZWVkbGVzcyByZXJlbmRlcnMuXG5cdFx0aWYgKGRhdGFfY2hhbmdlZCkge1xuXHRcdFx0cmVzdWx0LnByb3BzW2BkYXRhXyR7cH1gXSA9IGRhdGE7XG5cdFx0fVxuXG5cdFx0cCArPSAxO1xuXHR9XG5cblx0Y29uc3QgcGFnZV9jaGFuZ2VkID1cblx0XHQhY3VycmVudC51cmwgfHxcblx0XHR1cmwuaHJlZiAhPT0gY3VycmVudC51cmwuaHJlZiB8fFxuXHRcdGN1cnJlbnQuZXJyb3IgIT09IGVycm9yIHx8XG5cdFx0KGZvcm0gIT09IHVuZGVmaW5lZCAmJiBmb3JtICE9PSBwYWdlLmZvcm0pIHx8XG5cdFx0ZGF0YV9jaGFuZ2VkO1xuXG5cdGlmIChwYWdlX2NoYW5nZWQpIHtcblx0XHRyZXN1bHQucHJvcHMucGFnZSA9IHtcblx0XHRcdGVycm9yLFxuXHRcdFx0cGFyYW1zLFxuXHRcdFx0cm91dGU6IHtcblx0XHRcdFx0aWQ6IHJvdXRlPy5pZCA/PyBudWxsXG5cdFx0XHR9LFxuXHRcdFx0c3RhdGU6IHt9LFxuXHRcdFx0c3RhdHVzLFxuXHRcdFx0dXJsOiBuZXcgVVJMKHVybCksXG5cdFx0XHRmb3JtOiBmb3JtID8/IG51bGwsXG5cdFx0XHQvLyBUaGUgd2hvbGUgcGFnZSBzdG9yZSBpcyB1cGRhdGVkLCBidXQgdGhpcyB3YXkgdGhlIG9iamVjdCByZWZlcmVuY2Ugc3RheXMgdGhlIHNhbWVcblx0XHRcdGRhdGE6IGRhdGFfY2hhbmdlZCA/IGRhdGEgOiBwYWdlLmRhdGFcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYWxsIHRoZSB1bml2ZXJzYWwgbG9hZCBmdW5jdGlvbiBvZiB0aGUgZ2l2ZW4gbm9kZSwgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7e1xuICogICBsb2FkZXI6IGltcG9ydCgndHlwZXMnKS5DU1JQYWdlTm9kZUxvYWRlcjtcbiAqIFx0IHBhcmVudDogKCkgPT4gUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBhbnk+PjtcbiAqICAgdXJsOiBVUkw7XG4gKiAgIHBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAqICAgcm91dGU6IHsgaWQ6IHN0cmluZyB8IG51bGwgfTtcbiAqIFx0IHNlcnZlcl9kYXRhX25vZGU6IGltcG9ydCgnLi90eXBlcy5qcycpLkRhdGFOb2RlIHwgbnVsbDtcbiAqIH19IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydCgnLi90eXBlcy5qcycpLkJyYW5jaE5vZGU+fVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkX25vZGUoeyBsb2FkZXIsIHBhcmVudCwgdXJsLCBwYXJhbXMsIHJvdXRlLCBzZXJ2ZXJfZGF0YV9ub2RlIH0pIHtcblx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbH0gKi9cblx0bGV0IGRhdGEgPSBudWxsO1xuXG5cdGxldCBpc190cmFja2luZyA9IHRydWU7XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuVXNlc30gKi9cblx0Y29uc3QgdXNlcyA9IHtcblx0XHRkZXBlbmRlbmNpZXM6IG5ldyBTZXQoKSxcblx0XHRwYXJhbXM6IG5ldyBTZXQoKSxcblx0XHRwYXJlbnQ6IGZhbHNlLFxuXHRcdHJvdXRlOiBmYWxzZSxcblx0XHR1cmw6IGZhbHNlLFxuXHRcdHNlYXJjaF9wYXJhbXM6IG5ldyBTZXQoKVxuXHR9O1xuXG5cdGNvbnN0IG5vZGUgPSBhd2FpdCBsb2FkZXIoKTtcblxuXHRpZiAoREVWKSB7XG5cdFx0dmFsaWRhdGVfcGFnZV9leHBvcnRzKG5vZGUudW5pdmVyc2FsKTtcblxuXHRcdGlmIChub2RlLnVuaXZlcnNhbCAmJiBhcHAuaGFzaCkge1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKG5vZGUudW5pdmVyc2FsKS5maWx0ZXIoKG8pID0+IG8gIT09ICdsb2FkJyk7XG5cblx0XHRcdGlmIChvcHRpb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdGBQYWdlIG9wdGlvbnMgYXJlIGlnbm9yZWQgd2hlbiBcXGByb3V0ZXIudHlwZSA9PT0gJ2hhc2gnXFxgICgke3JvdXRlLmlkfSBoYXMgJHtvcHRpb25zXG5cdFx0XHRcdFx0XHQuZmlsdGVyKChvKSA9PiBvICE9PSAnbG9hZCcpXG5cdFx0XHRcdFx0XHQubWFwKChvKSA9PiBgJyR7b30nYClcblx0XHRcdFx0XHRcdC5qb2luKCcsICcpfSlgXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKF9fU1ZFTFRFS0lUX0hBU19VTklWRVJTQUxfTE9BRF9fICYmIG5vZGUudW5pdmVyc2FsPy5sb2FkKSB7XG5cdFx0LyoqIEBwYXJhbSB7c3RyaW5nW119IGRlcHMgKi9cblx0XHRmdW5jdGlvbiBkZXBlbmRzKC4uLmRlcHMpIHtcblx0XHRcdGZvciAoY29uc3QgZGVwIG9mIGRlcHMpIHtcblx0XHRcdFx0aWYgKERFVikgdmFsaWRhdGVfZGVwZW5kcygvKiogQHR5cGUge3N0cmluZ30gKi8gKHJvdXRlLmlkKSwgZGVwKTtcblxuXHRcdFx0XHRjb25zdCB7IGhyZWYgfSA9IG5ldyBVUkwoZGVwLCB1cmwpO1xuXHRcdFx0XHR1c2VzLmRlcGVuZGVuY2llcy5hZGQoaHJlZik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5Mb2FkRXZlbnR9ICovXG5cdFx0Y29uc3QgbG9hZF9pbnB1dCA9IHtcblx0XHRcdHRyYWNpbmc6IHsgZW5hYmxlZDogZmFsc2UsIHJvb3Q6IG5vb3Bfc3BhbiwgY3VycmVudDogbm9vcF9zcGFuIH0sXG5cdFx0XHRyb3V0ZTogbmV3IFByb3h5KHJvdXRlLCB7XG5cdFx0XHRcdGdldDogKHRhcmdldCwga2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGlzX3RyYWNraW5nKSB7XG5cdFx0XHRcdFx0XHR1c2VzLnJvdXRlID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFsvKiogQHR5cGUgeydpZCd9ICovIChrZXkpXTtcblx0XHRcdFx0fVxuXHRcdFx0fSksXG5cdFx0XHRwYXJhbXM6IG5ldyBQcm94eShwYXJhbXMsIHtcblx0XHRcdFx0Z2V0OiAodGFyZ2V0LCBrZXkpID0+IHtcblx0XHRcdFx0XHRpZiAoaXNfdHJhY2tpbmcpIHtcblx0XHRcdFx0XHRcdHVzZXMucGFyYW1zLmFkZCgvKiogQHR5cGUge3N0cmluZ30gKi8gKGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0Wy8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoa2V5KV07XG5cdFx0XHRcdH1cblx0XHRcdH0pLFxuXHRcdFx0ZGF0YTogc2VydmVyX2RhdGFfbm9kZT8uZGF0YSA/PyBudWxsLFxuXHRcdFx0dXJsOiBtYWtlX3RyYWNrYWJsZShcblx0XHRcdFx0dXJsLFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGlzX3RyYWNraW5nKSB7XG5cdFx0XHRcdFx0XHR1c2VzLnVybCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQocGFyYW0pID0+IHtcblx0XHRcdFx0XHRpZiAoaXNfdHJhY2tpbmcpIHtcblx0XHRcdFx0XHRcdHVzZXMuc2VhcmNoX3BhcmFtcy5hZGQocGFyYW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwLmhhc2hcblx0XHRcdCksXG5cdFx0XHRhc3luYyBmZXRjaChyZXNvdXJjZSwgaW5pdCkge1xuXHRcdFx0XHRpZiAocmVzb3VyY2UgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG5cdFx0XHRcdFx0Ly8gd2UncmUgbm90IGFsbG93ZWQgdG8gbW9kaWZ5IHRoZSByZWNlaXZlZCBgUmVxdWVzdGAgb2JqZWN0LCBzbyBpbiBvcmRlclxuXHRcdFx0XHRcdC8vIHRvIGZpeHVwIHJlbGF0aXZlIHVybHMgd2UgY3JlYXRlIGEgbmV3IGVxdWl2YWxlbnQgYGluaXRgIG9iamVjdCBpbnN0ZWFkXG5cdFx0XHRcdFx0aW5pdCA9IHtcblx0XHRcdFx0XHRcdC8vIHRoZSByZXF1ZXN0IGJvZHkgbXVzdCBiZSBjb25zdW1lZCBpbiBtZW1vcnkgdW50aWwgYnJvd3NlcnNcblx0XHRcdFx0XHRcdC8vIGltcGxlbWVudCBzdHJlYW1pbmcgcmVxdWVzdCBib2RpZXMgYW5kL29yIHRoZSBib2R5IGdldHRlclxuXHRcdFx0XHRcdFx0Ym9keTpcblx0XHRcdFx0XHRcdFx0cmVzb3VyY2UubWV0aG9kID09PSAnR0VUJyB8fCByZXNvdXJjZS5tZXRob2QgPT09ICdIRUFEJ1xuXHRcdFx0XHRcdFx0XHRcdD8gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdFx0OiBhd2FpdCByZXNvdXJjZS5ibG9iKCksXG5cdFx0XHRcdFx0XHRjYWNoZTogcmVzb3VyY2UuY2FjaGUsXG5cdFx0XHRcdFx0XHRjcmVkZW50aWFsczogcmVzb3VyY2UuY3JlZGVudGlhbHMsXG5cdFx0XHRcdFx0XHQvLyB0aGUgc2VydmVyIHNldHMgaGVhZGVycyB0byBgdW5kZWZpbmVkYCBpZiB0aGVyZSBhcmUgbm8gaGVhZGVycyBidXRcblx0XHRcdFx0XHRcdC8vIHRoZSBjbGllbnQgZGVmYXVsdHMgdG8gYW4gZW1wdHkgSGVhZGVycyBvYmplY3QgaW4gdGhlIFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Ly8gVG8ga2VlcCB0aGUgdHdvIHZhbHVlcyBpbiBzeW5jLCB3ZSBleHBsaWNpdGx5IHNldCB0aGUgaGVhZGVycyB0byBgdW5kZWZpbmVkYC5cblx0XHRcdFx0XHRcdC8vIEFsc28sIG5vdCBzdXJlIHdoeSwgYnV0IHNvbWV0aW1lcyAwIGlzIGV2YWx1YXRlZCBhcyB0cnV0aHkgc28gd2UgbmVlZCB0b1xuXHRcdFx0XHRcdFx0Ly8gZXhwbGljaXRseSBjb21wYXJlIHRoZSBoZWFkZXJzIGxlbmd0aCB0byBhIG51bWJlciBoZXJlXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiBbLi4ucmVzb3VyY2UuaGVhZGVyc10ubGVuZ3RoID4gMCA/IHJlc291cmNlPy5oZWFkZXJzIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0aW50ZWdyaXR5OiByZXNvdXJjZS5pbnRlZ3JpdHksXG5cdFx0XHRcdFx0XHRrZWVwYWxpdmU6IHJlc291cmNlLmtlZXBhbGl2ZSxcblx0XHRcdFx0XHRcdG1ldGhvZDogcmVzb3VyY2UubWV0aG9kLFxuXHRcdFx0XHRcdFx0bW9kZTogcmVzb3VyY2UubW9kZSxcblx0XHRcdFx0XHRcdHJlZGlyZWN0OiByZXNvdXJjZS5yZWRpcmVjdCxcblx0XHRcdFx0XHRcdHJlZmVycmVyOiByZXNvdXJjZS5yZWZlcnJlcixcblx0XHRcdFx0XHRcdHJlZmVycmVyUG9saWN5OiByZXNvdXJjZS5yZWZlcnJlclBvbGljeSxcblx0XHRcdFx0XHRcdHNpZ25hbDogcmVzb3VyY2Uuc2lnbmFsLFxuXHRcdFx0XHRcdFx0Li4uaW5pdFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB7IHJlc29sdmVkLCBwcm9taXNlIH0gPSByZXNvbHZlX2ZldGNoX3VybChyZXNvdXJjZSwgaW5pdCwgdXJsKTtcblxuXHRcdFx0XHRpZiAoaXNfdHJhY2tpbmcpIHtcblx0XHRcdFx0XHRkZXBlbmRzKHJlc29sdmVkLmhyZWYpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0XHR9LFxuXHRcdFx0c2V0SGVhZGVyczogbm9vcCxcblx0XHRcdGRlcGVuZHMsXG5cdFx0XHRwYXJlbnQoKSB7XG5cdFx0XHRcdGlmIChpc190cmFja2luZykge1xuXHRcdFx0XHRcdHVzZXMucGFyZW50ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcGFyZW50KCk7XG5cdFx0XHR9LFxuXHRcdFx0dW50cmFjayhmbikge1xuXHRcdFx0XHRpc190cmFja2luZyA9IGZhbHNlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBmbigpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdGlzX3RyYWNraW5nID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpZiAoREVWKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRsb2NrX2ZldGNoKCk7XG5cdFx0XHRcdGRhdGEgPSAoYXdhaXQgbm9kZS51bml2ZXJzYWwubG9hZC5jYWxsKG51bGwsIGxvYWRfaW5wdXQpKSA/PyBudWxsO1xuXHRcdFx0XHR2YWxpZGF0ZV9sb2FkX3Jlc3BvbnNlKGRhdGEsIGByZWxhdGVkIHRvIHJvdXRlICcke3JvdXRlLmlkfSdgKTtcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdHVubG9ja19mZXRjaCgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gKGF3YWl0IG5vZGUudW5pdmVyc2FsLmxvYWQuY2FsbChudWxsLCBsb2FkX2lucHV0KSkgPz8gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG5vZGUsXG5cdFx0bG9hZGVyLFxuXHRcdHNlcnZlcjogc2VydmVyX2RhdGFfbm9kZSxcblx0XHR1bml2ZXJzYWw6IG5vZGUudW5pdmVyc2FsPy5sb2FkID8geyB0eXBlOiAnZGF0YScsIGRhdGEsIHVzZXMgfSA6IG51bGwsXG5cdFx0ZGF0YTogZGF0YSA/PyBzZXJ2ZXJfZGF0YV9ub2RlPy5kYXRhID8/IG51bGwsXG5cdFx0c2xhc2g6IG5vZGUudW5pdmVyc2FsPy50cmFpbGluZ1NsYXNoID8/IHNlcnZlcl9kYXRhX25vZGU/LnNsYXNoXG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZXF1ZXN0IHwgc3RyaW5nIHwgVVJMfSBpbnB1dFxuICogQHBhcmFtIHtSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZH0gaW5pdFxuICogQHBhcmFtIHtVUkx9IHVybFxuICovXG5mdW5jdGlvbiByZXNvbHZlX2ZldGNoX3VybChpbnB1dCwgaW5pdCwgdXJsKSB7XG5cdGxldCByZXF1ZXN0ZWQgPSBpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QgPyBpbnB1dC51cmwgOiBpbnB1dDtcblxuXHQvLyB3ZSBtdXN0IGZpeHVwIHJlbGF0aXZlIHVybHMgc28gdGhleSBhcmUgcmVzb2x2ZWQgZnJvbSB0aGUgdGFyZ2V0IHBhZ2Vcblx0Y29uc3QgcmVzb2x2ZWQgPSBuZXcgVVJMKHJlcXVlc3RlZCwgdXJsKTtcblxuXHQvLyBtYXRjaCBzc3Igc2VyaWFsaXplZCBkYXRhIHVybCwgd2hpY2ggaXMgaW1wb3J0YW50IHRvIGZpbmQgY2FjaGVkIHJlc3BvbnNlc1xuXHRpZiAocmVzb2x2ZWQub3JpZ2luID09PSB1cmwub3JpZ2luKSB7XG5cdFx0cmVxdWVzdGVkID0gcmVzb2x2ZWQuaHJlZi5zbGljZSh1cmwub3JpZ2luLmxlbmd0aCk7XG5cdH1cblxuXHQvLyBwcmVyZW5kZXJlZCBwYWdlcyBtYXkgYmUgc2VydmVkIGZyb20gYW55IG9yaWdpbiwgc28gYGluaXRpYWxfZmV0Y2hgIHVybHMgc2hvdWxkbid0IGJlIHJlc29sdmVkXG5cdGNvbnN0IHByb21pc2UgPSBzdGFydGVkXG5cdFx0PyBzdWJzZXF1ZW50X2ZldGNoKHJlcXVlc3RlZCwgcmVzb2x2ZWQuaHJlZiwgaW5pdClcblx0XHQ6IGluaXRpYWxfZmV0Y2gocmVxdWVzdGVkLCBpbml0KTtcblxuXHRyZXR1cm4geyByZXNvbHZlZCwgcHJvbWlzZSB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50X2NoYW5nZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcm91dGVfY2hhbmdlZFxuICogQHBhcmFtIHtib29sZWFufSB1cmxfY2hhbmdlZFxuICogQHBhcmFtIHtTZXQ8c3RyaW5nPn0gc2VhcmNoX3BhcmFtc19jaGFuZ2VkXG4gKiBAcGFyYW0ge2ltcG9ydCgndHlwZXMnKS5Vc2VzIHwgdW5kZWZpbmVkfSB1c2VzXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IHBhcmFtc1xuICovXG5mdW5jdGlvbiBoYXNfY2hhbmdlZChcblx0cGFyZW50X2NoYW5nZWQsXG5cdHJvdXRlX2NoYW5nZWQsXG5cdHVybF9jaGFuZ2VkLFxuXHRzZWFyY2hfcGFyYW1zX2NoYW5nZWQsXG5cdHVzZXMsXG5cdHBhcmFtc1xuKSB7XG5cdGlmIChmb3JjZV9pbnZhbGlkYXRpb24pIHJldHVybiB0cnVlO1xuXG5cdGlmICghdXNlcykgcmV0dXJuIGZhbHNlO1xuXG5cdGlmICh1c2VzLnBhcmVudCAmJiBwYXJlbnRfY2hhbmdlZCkgcmV0dXJuIHRydWU7XG5cdGlmICh1c2VzLnJvdXRlICYmIHJvdXRlX2NoYW5nZWQpIHJldHVybiB0cnVlO1xuXHRpZiAodXNlcy51cmwgJiYgdXJsX2NoYW5nZWQpIHJldHVybiB0cnVlO1xuXG5cdGZvciAoY29uc3QgdHJhY2tlZF9wYXJhbXMgb2YgdXNlcy5zZWFyY2hfcGFyYW1zKSB7XG5cdFx0aWYgKHNlYXJjaF9wYXJhbXNfY2hhbmdlZC5oYXModHJhY2tlZF9wYXJhbXMpKSByZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGZvciAoY29uc3QgcGFyYW0gb2YgdXNlcy5wYXJhbXMpIHtcblx0XHRpZiAocGFyYW1zW3BhcmFtXSAhPT0gY3VycmVudC5wYXJhbXNbcGFyYW1dKSByZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGZvciAoY29uc3QgaHJlZiBvZiB1c2VzLmRlcGVuZGVuY2llcykge1xuXHRcdGlmIChpbnZhbGlkYXRlZC5zb21lKChmbikgPT4gZm4obmV3IFVSTChocmVmKSkpKSByZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgndHlwZXMnKS5TZXJ2ZXJEYXRhTm9kZSB8IGltcG9ydCgndHlwZXMnKS5TZXJ2ZXJEYXRhU2tpcHBlZE5vZGUgfCBudWxsfSBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90eXBlcy5qcycpLkRhdGFOb2RlIHwgbnVsbH0gW3ByZXZpb3VzXVxuICogQHJldHVybnMge2ltcG9ydCgnLi90eXBlcy5qcycpLkRhdGFOb2RlIHwgbnVsbH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlX2RhdGFfbm9kZShub2RlLCBwcmV2aW91cykge1xuXHRpZiAobm9kZT8udHlwZSA9PT0gJ2RhdGEnKSByZXR1cm4gbm9kZTtcblx0aWYgKG5vZGU/LnR5cGUgPT09ICdza2lwJykgcmV0dXJuIHByZXZpb3VzID8/IG51bGw7XG5cdHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VVJMIHwgbnVsbH0gb2xkX3VybFxuICogQHBhcmFtIHtVUkx9IG5ld191cmxcbiAqL1xuZnVuY3Rpb24gZGlmZl9zZWFyY2hfcGFyYW1zKG9sZF91cmwsIG5ld191cmwpIHtcblx0aWYgKCFvbGRfdXJsKSByZXR1cm4gbmV3IFNldChuZXdfdXJsLnNlYXJjaFBhcmFtcy5rZXlzKCkpO1xuXG5cdGNvbnN0IGNoYW5nZWQgPSBuZXcgU2V0KFsuLi5vbGRfdXJsLnNlYXJjaFBhcmFtcy5rZXlzKCksIC4uLm5ld191cmwuc2VhcmNoUGFyYW1zLmtleXMoKV0pO1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIGNoYW5nZWQpIHtcblx0XHRjb25zdCBvbGRfdmFsdWVzID0gb2xkX3VybC5zZWFyY2hQYXJhbXMuZ2V0QWxsKGtleSk7XG5cdFx0Y29uc3QgbmV3X3ZhbHVlcyA9IG5ld191cmwuc2VhcmNoUGFyYW1zLmdldEFsbChrZXkpO1xuXG5cdFx0aWYgKFxuXHRcdFx0b2xkX3ZhbHVlcy5ldmVyeSgodmFsdWUpID0+IG5ld192YWx1ZXMuaW5jbHVkZXModmFsdWUpKSAmJlxuXHRcdFx0bmV3X3ZhbHVlcy5ldmVyeSgodmFsdWUpID0+IG9sZF92YWx1ZXMuaW5jbHVkZXModmFsdWUpKVxuXHRcdCkge1xuXHRcdFx0Y2hhbmdlZC5kZWxldGUoa2V5KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY2hhbmdlZDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge09taXQ8aW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvbkZpbmlzaGVkWydzdGF0ZSddLCAnYnJhbmNoJz4gJiB7IGVycm9yOiBBcHAuRXJyb3IgfX0gb3B0c1xuICogQHJldHVybnMge2ltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25GaW5pc2hlZH1cbiAqL1xuZnVuY3Rpb24gcHJlbG9hZF9lcnJvcih7IGVycm9yLCB1cmwsIHJvdXRlLCBwYXJhbXMgfSkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdsb2FkZWQnLFxuXHRcdHN0YXRlOiB7XG5cdFx0XHRlcnJvcixcblx0XHRcdHVybCxcblx0XHRcdHJvdXRlLFxuXHRcdFx0cGFyYW1zLFxuXHRcdFx0YnJhbmNoOiBbXVxuXHRcdH0sXG5cdFx0cHJvcHM6IHtcblx0XHRcdHBhZ2U6IGNsb25lX3BhZ2UocGFnZSksXG5cdFx0XHRjb25zdHJ1Y3RvcnM6IFtdXG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEBvdmVybG9hZFxuICogQHBhcmFtIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uSW50ZW50fSBpbnRlbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25SZXN1bHQgfCB1bmRlZmluZWQ+fVxuICovXG4vKipcbiAqIEBvdmVybG9hZFxuICogQHBhcmFtIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uSW50ZW50ICYgeyBwcmVsb2FkOiB7fSB9fSBpbnRlbnRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25SZXN1bHQ+fVxuICovXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvbkludGVudCAmIHsgcHJlbG9hZD86IHt9IH19IGludGVudFxuICogQHJldHVybnMge1Byb21pc2U8aW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvblJlc3VsdCB8IHVuZGVmaW5lZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxvYWRfcm91dGUoeyBpZCwgaW52YWxpZGF0aW5nLCB1cmwsIHBhcmFtcywgcm91dGUsIHByZWxvYWQgfSkge1xuXHRpZiAobG9hZF9jYWNoZT8uaWQgPT09IGlkKSB7XG5cdFx0Ly8gdGhlIHByZWxvYWQgYmVjb21lcyB0aGUgcmVhbCBuYXZpZ2F0aW9uXG5cdFx0cHJlbG9hZF90b2tlbnMuZGVsZXRlKGxvYWRfY2FjaGUudG9rZW4pO1xuXHRcdHJldHVybiBsb2FkX2NhY2hlLnByb21pc2U7XG5cdH1cblxuXHRjb25zdCB7IGVycm9ycywgbGF5b3V0cywgbGVhZiB9ID0gcm91dGU7XG5cblx0Y29uc3QgbG9hZGVycyA9IFsuLi5sYXlvdXRzLCBsZWFmXTtcblxuXHQvLyBwcmVsb2FkIG1vZHVsZXMgdG8gYXZvaWQgd2F0ZXJmYWxsLCBidXQgaGFuZGxlIHJlamVjdGlvbnNcblx0Ly8gc28gdGhleSBkb24ndCBnZXQgcmVwb3J0ZWQgdG8gU2VudHJ5IGV0IGFsICh3ZSBkb24ndCBuZWVkXG5cdC8vIHRvIGFjdCBvbiB0aGUgZmFpbHVyZXMgYXQgdGhpcyBwb2ludClcblx0ZXJyb3JzLmZvckVhY2goKGxvYWRlcikgPT4gbG9hZGVyPy4oKS5jYXRjaChub29wKSk7XG5cdGxvYWRlcnMuZm9yRWFjaCgobG9hZGVyKSA9PiBsb2FkZXI/LlsxXSgpLmNhdGNoKG5vb3ApKTtcblxuXHQvKiogQHR5cGUge2ltcG9ydCgndHlwZXMnKS5TZXJ2ZXJOb2Rlc1Jlc3BvbnNlIHwgaW1wb3J0KCd0eXBlcycpLlNlcnZlclJlZGlyZWN0Tm9kZSB8IG51bGx9ICovXG5cdGxldCBzZXJ2ZXJfZGF0YSA9IG51bGw7XG5cdGNvbnN0IHVybF9jaGFuZ2VkID0gY3VycmVudC51cmwgPyBpZCAhPT0gZ2V0X3BhZ2Vfa2V5KGN1cnJlbnQudXJsKSA6IGZhbHNlO1xuXHRjb25zdCByb3V0ZV9jaGFuZ2VkID0gY3VycmVudC5yb3V0ZSA/IHJvdXRlLmlkICE9PSBjdXJyZW50LnJvdXRlLmlkIDogZmFsc2U7XG5cdGNvbnN0IHNlYXJjaF9wYXJhbXNfY2hhbmdlZCA9IGRpZmZfc2VhcmNoX3BhcmFtcyhjdXJyZW50LnVybCwgdXJsKTtcblxuXHRsZXQgcGFyZW50X2ludmFsaWQgPSBmYWxzZTtcblxuXHRpZiAoX19TVkVMVEVLSVRfSEFTX1NFUlZFUl9MT0FEX18pIHtcblx0XHRjb25zdCBpbnZhbGlkX3NlcnZlcl9ub2RlcyA9IGxvYWRlcnMubWFwKChsb2FkZXIsIGkpID0+IHtcblx0XHRcdGNvbnN0IHByZXZpb3VzID0gY3VycmVudC5icmFuY2hbaV07XG5cblx0XHRcdGNvbnN0IGludmFsaWQgPVxuXHRcdFx0XHQhIWxvYWRlcj8uWzBdICYmXG5cdFx0XHRcdChwcmV2aW91cz8ubG9hZGVyICE9PSBsb2FkZXJbMV0gfHxcblx0XHRcdFx0XHRoYXNfY2hhbmdlZChcblx0XHRcdFx0XHRcdHBhcmVudF9pbnZhbGlkLFxuXHRcdFx0XHRcdFx0cm91dGVfY2hhbmdlZCxcblx0XHRcdFx0XHRcdHVybF9jaGFuZ2VkLFxuXHRcdFx0XHRcdFx0c2VhcmNoX3BhcmFtc19jaGFuZ2VkLFxuXHRcdFx0XHRcdFx0cHJldmlvdXMuc2VydmVyPy51c2VzLFxuXHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0KSk7XG5cblx0XHRcdGlmIChpbnZhbGlkKSB7XG5cdFx0XHRcdC8vIEZvciB0aGUgbmV4dCBvbmVcblx0XHRcdFx0cGFyZW50X2ludmFsaWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaW52YWxpZDtcblx0XHR9KTtcblxuXHRcdGlmIChpbnZhbGlkX3NlcnZlcl9ub2Rlcy5zb21lKEJvb2xlYW4pKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXJ2ZXJfZGF0YSA9IGF3YWl0IGxvYWRfZGF0YSh1cmwsIGludmFsaWRfc2VydmVyX25vZGVzKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZWRfZXJyb3IgPSBhd2FpdCBoYW5kbGVfZXJyb3IoZXJyb3IsIHsgdXJsLCBwYXJhbXMsIHJvdXRlOiB7IGlkIH0gfSk7XG5cblx0XHRcdFx0aWYgKHByZWxvYWQgJiYgcHJlbG9hZF90b2tlbnMuaGFzKHByZWxvYWQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByZWxvYWRfZXJyb3IoeyBlcnJvcjogaGFuZGxlZF9lcnJvciwgdXJsLCBwYXJhbXMsIHJvdXRlIH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxvYWRfcm9vdF9lcnJvcl9wYWdlKHtcblx0XHRcdFx0XHRzdGF0dXM6IGdldF9zdGF0dXMoZXJyb3IpLFxuXHRcdFx0XHRcdGVycm9yOiBoYW5kbGVkX2Vycm9yLFxuXHRcdFx0XHRcdHVybCxcblx0XHRcdFx0XHRyb3V0ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlcnZlcl9kYXRhLnR5cGUgPT09ICdyZWRpcmVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIHNlcnZlcl9kYXRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHNlcnZlcl9kYXRhX25vZGVzID0gc2VydmVyX2RhdGE/Lm5vZGVzO1xuXG5cdGxldCBwYXJlbnRfY2hhbmdlZCA9IGZhbHNlO1xuXG5cdGNvbnN0IGJyYW5jaF9wcm9taXNlcyA9IGxvYWRlcnMubWFwKGFzeW5jIChsb2FkZXIsIGkpID0+IHtcblx0XHRpZiAoIWxvYWRlcikgcmV0dXJuO1xuXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5CcmFuY2hOb2RlIHwgdW5kZWZpbmVkfSAqL1xuXHRcdGNvbnN0IHByZXZpb3VzID0gY3VycmVudC5icmFuY2hbaV07XG5cblx0XHRjb25zdCBzZXJ2ZXJfZGF0YV9ub2RlID0gc2VydmVyX2RhdGFfbm9kZXM/LltpXTtcblxuXHRcdC8vIHJldXNlIGRhdGEgZnJvbSBwcmV2aW91cyBsb2FkIGlmIGl0J3Mgc3RpbGwgdmFsaWRcblx0XHRjb25zdCB2YWxpZCA9XG5cdFx0XHQoIXNlcnZlcl9kYXRhX25vZGUgfHwgc2VydmVyX2RhdGFfbm9kZS50eXBlID09PSAnc2tpcCcpICYmXG5cdFx0XHRsb2FkZXJbMV0gPT09IHByZXZpb3VzPy5sb2FkZXIgJiZcblx0XHRcdCFoYXNfY2hhbmdlZChcblx0XHRcdFx0cGFyZW50X2NoYW5nZWQsXG5cdFx0XHRcdHJvdXRlX2NoYW5nZWQsXG5cdFx0XHRcdHVybF9jaGFuZ2VkLFxuXHRcdFx0XHRzZWFyY2hfcGFyYW1zX2NoYW5nZWQsXG5cdFx0XHRcdHByZXZpb3VzLnVuaXZlcnNhbD8udXNlcyxcblx0XHRcdFx0cGFyYW1zXG5cdFx0XHQpO1xuXHRcdGlmICh2YWxpZCkgcmV0dXJuIHByZXZpb3VzO1xuXG5cdFx0cGFyZW50X2NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0aWYgKHNlcnZlcl9kYXRhX25vZGU/LnR5cGUgPT09ICdlcnJvcicpIHtcblx0XHRcdC8vIHJldGhyb3cgYW5kIGNhdGNoIGJlbG93XG5cdFx0XHR0aHJvdyBzZXJ2ZXJfZGF0YV9ub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBsb2FkX25vZGUoe1xuXHRcdFx0bG9hZGVyOiBsb2FkZXJbMV0sXG5cdFx0XHR1cmwsXG5cdFx0XHRwYXJhbXMsXG5cdFx0XHRyb3V0ZSxcblx0XHRcdHBhcmVudDogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0ge307XG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgaTsgaiArPSAxKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihkYXRhLCAoYXdhaXQgYnJhbmNoX3Byb21pc2VzW2pdKT8uZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9LFxuXHRcdFx0c2VydmVyX2RhdGFfbm9kZTogY3JlYXRlX2RhdGFfbm9kZShcblx0XHRcdFx0Ly8gc2VydmVyX2RhdGFfbm9kZSBpcyB1bmRlZmluZWQgaWYgaXQgd2Fzbid0IHJlbG9hZGVkIGZyb20gdGhlIHNlcnZlcjtcblx0XHRcdFx0Ly8gYW5kIGlmIGN1cnJlbnQgbG9hZGVyIHVzZXMgc2VydmVyIGRhdGEsIHdlIHdhbnQgdG8gcmV1c2UgcHJldmlvdXMgZGF0YS5cblx0XHRcdFx0c2VydmVyX2RhdGFfbm9kZSA9PT0gdW5kZWZpbmVkICYmIGxvYWRlclswXSA/IHsgdHlwZTogJ3NraXAnIH0gOiAoc2VydmVyX2RhdGFfbm9kZSA/PyBudWxsKSxcblx0XHRcdFx0bG9hZGVyWzBdID8gcHJldmlvdXM/LnNlcnZlciA6IHVuZGVmaW5lZFxuXHRcdFx0KVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBpZiB3ZSBkb24ndCBkbyB0aGlzLCByZWplY3Rpb25zIHdpbGwgYmUgdW5oYW5kbGVkXG5cdGZvciAoY29uc3QgcCBvZiBicmFuY2hfcHJvbWlzZXMpIHAuY2F0Y2gobm9vcCk7XG5cblx0LyoqIEB0eXBlIHtBcnJheTxpbXBvcnQoJy4vdHlwZXMuanMnKS5CcmFuY2hOb2RlIHwgdW5kZWZpbmVkPn0gKi9cblx0Y29uc3QgYnJhbmNoID0gW107XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsb2FkZXJzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGxvYWRlcnNbaV0pIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGJyYW5jaC5wdXNoKGF3YWl0IGJyYW5jaF9wcm9taXNlc1tpXSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0aWYgKGVyciBpbnN0YW5jZW9mIFJlZGlyZWN0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdyZWRpcmVjdCcsXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjogZXJyLmxvY2F0aW9uXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChwcmVsb2FkICYmIHByZWxvYWRfdG9rZW5zLmhhcyhwcmVsb2FkKSkge1xuXHRcdFx0XHRcdHJldHVybiBwcmVsb2FkX2Vycm9yKHtcblx0XHRcdFx0XHRcdGVycm9yOiBhd2FpdCBoYW5kbGVfZXJyb3IoZXJyLCB7IHBhcmFtcywgdXJsLCByb3V0ZTogeyBpZDogcm91dGUuaWQgfSB9KSxcblx0XHRcdFx0XHRcdHVybCxcblx0XHRcdFx0XHRcdHBhcmFtcyxcblx0XHRcdFx0XHRcdHJvdXRlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc3RhdHVzID0gZ2V0X3N0YXR1cyhlcnIpO1xuXHRcdFx0XHQvKiogQHR5cGUge0FwcC5FcnJvcn0gKi9cblx0XHRcdFx0bGV0IGVycm9yO1xuXG5cdFx0XHRcdGlmIChzZXJ2ZXJfZGF0YV9ub2Rlcz8uaW5jbHVkZXMoLyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuU2VydmVyRXJyb3JOb2RlfSAqLyAoZXJyKSkpIHtcblx0XHRcdFx0XHQvLyB0aGlzIGlzIHRoZSBzZXJ2ZXIgZXJyb3IgcmV0aHJvd24gYWJvdmUsIHJlY29uc3RydWN0IGJ1dCBkb24ndCBpbnZva2Vcblx0XHRcdFx0XHQvLyB0aGUgY2xpZW50IGVycm9yIGhhbmRsZXI7IGl0IHNob3VsZCd2ZSBhbHJlYWR5IGJlZW4gaGFuZGxlZCBvbiB0aGUgc2VydmVyXG5cdFx0XHRcdFx0c3RhdHVzID0gLyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuU2VydmVyRXJyb3JOb2RlfSAqLyAoZXJyKS5zdGF0dXMgPz8gc3RhdHVzO1xuXHRcdFx0XHRcdGVycm9yID0gLyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuU2VydmVyRXJyb3JOb2RlfSAqLyAoZXJyKS5lcnJvcjtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcblx0XHRcdFx0XHRlcnJvciA9IGVyci5ib2R5O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIFJlZmVyZW5jZWQgbm9kZSBjb3VsZCBoYXZlIGJlZW4gcmVtb3ZlZCBkdWUgdG8gcmVkZXBsb3ksIGNoZWNrXG5cdFx0XHRcdFx0Y29uc3QgdXBkYXRlZCA9IGF3YWl0IHN0b3Jlcy51cGRhdGVkLmNoZWNrKCk7XG5cdFx0XHRcdFx0aWYgKHVwZGF0ZWQpIHtcblx0XHRcdFx0XHRcdC8vIEJlZm9yZSByZWxvYWRpbmcsIHRyeSB0byB1cGRhdGUgdGhlIHNlcnZpY2Ugd29ya2VyIGlmIGl0IGV4aXN0c1xuXHRcdFx0XHRcdFx0YXdhaXQgdXBkYXRlX3NlcnZpY2Vfd29ya2VyKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYXdhaXQgbmF0aXZlX25hdmlnYXRpb24odXJsKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlcnJvciA9IGF3YWl0IGhhbmRsZV9lcnJvcihlcnIsIHsgcGFyYW1zLCB1cmwsIHJvdXRlOiB7IGlkOiByb3V0ZS5pZCB9IH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgZXJyb3JfbG9hZCA9IGF3YWl0IGxvYWRfbmVhcmVzdF9lcnJvcl9wYWdlKGksIGJyYW5jaCwgZXJyb3JzKTtcblx0XHRcdFx0aWYgKGVycm9yX2xvYWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0X25hdmlnYXRpb25fcmVzdWx0X2Zyb21fYnJhbmNoKHtcblx0XHRcdFx0XHRcdHVybCxcblx0XHRcdFx0XHRcdHBhcmFtcyxcblx0XHRcdFx0XHRcdGJyYW5jaDogYnJhbmNoLnNsaWNlKDAsIGVycm9yX2xvYWQuaWR4KS5jb25jYXQoZXJyb3JfbG9hZC5ub2RlKSxcblx0XHRcdFx0XHRcdGVycm9ycyxcblx0XHRcdFx0XHRcdHN0YXR1cyxcblx0XHRcdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRcdFx0cm91dGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gYXdhaXQgc2VydmVyX2ZhbGxiYWNrKHVybCwgeyBpZDogcm91dGUuaWQgfSwgZXJyb3IsIHN0YXR1cyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcHVzaCBhbiBlbXB0eSBzbG90IHNvIHdlIGNhbiByZXdpbmQgcGFzdCBnYXBzIHRvIHRoZVxuXHRcdFx0Ly8gbGF5b3V0IHRoYXQgY29ycmVzcG9uZHMgd2l0aCBhbiArZXJyb3Iuc3ZlbHRlIHBhZ2Vcblx0XHRcdGJyYW5jaC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdldF9uYXZpZ2F0aW9uX3Jlc3VsdF9mcm9tX2JyYW5jaCh7XG5cdFx0dXJsLFxuXHRcdHBhcmFtcyxcblx0XHRicmFuY2gsXG5cdFx0ZXJyb3JzLFxuXHRcdHN0YXR1czogMjAwLFxuXHRcdGVycm9yOiBudWxsLFxuXHRcdHJvdXRlLFxuXHRcdC8vIFJlc2V0IGBmb3JtYCBvbiBuYXZpZ2F0aW9uLCBidXQgbm90IGludmFsaWRhdGlvblxuXHRcdGZvcm06IGludmFsaWRhdGluZyA/IHVuZGVmaW5lZCA6IG51bGxcblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGkgU3RhcnQgaW5kZXggdG8gYmFja3RyYWNrIGZyb21cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuL3R5cGVzLmpzJykuQnJhbmNoTm9kZSB8IHVuZGVmaW5lZD59IGJyYW5jaCBCcmFuY2ggdG8gYmFja3RyYWNrXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgndHlwZXMnKS5DU1JQYWdlTm9kZUxvYWRlciB8IHVuZGVmaW5lZD59IGVycm9ycyBBbGwgZXJyb3IgcGFnZXMgZm9yIHRoaXMgYnJhbmNoXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7aWR4OiBudW1iZXI7IG5vZGU6IGltcG9ydCgnLi90eXBlcy5qcycpLkJyYW5jaE5vZGV9IHwgdW5kZWZpbmVkPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZF9uZWFyZXN0X2Vycm9yX3BhZ2UoaSwgYnJhbmNoLCBlcnJvcnMpIHtcblx0d2hpbGUgKGktLSkge1xuXHRcdGlmIChlcnJvcnNbaV0pIHtcblx0XHRcdGxldCBqID0gaTtcblx0XHRcdHdoaWxlICghYnJhbmNoW2pdKSBqIC09IDE7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGlkeDogaiArIDEsXG5cdFx0XHRcdFx0bm9kZToge1xuXHRcdFx0XHRcdFx0bm9kZTogYXdhaXQgLyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuQ1NSUGFnZU5vZGVMb2FkZXIgfSAqLyAoZXJyb3JzW2ldKSgpLFxuXHRcdFx0XHRcdFx0bG9hZGVyOiAvKiogQHR5cGUge2ltcG9ydCgndHlwZXMnKS5DU1JQYWdlTm9kZUxvYWRlciB9ICovIChlcnJvcnNbaV0pLFxuXHRcdFx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdFx0XHRzZXJ2ZXI6IG51bGwsXG5cdFx0XHRcdFx0XHR1bml2ZXJzYWw6IG51bGxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHt7XG4gKiAgIHN0YXR1czogbnVtYmVyO1xuICogICBlcnJvcjogQXBwLkVycm9yO1xuICogICB1cmw6IFVSTDtcbiAqICAgcm91dGU6IHsgaWQ6IHN0cmluZyB8IG51bGwgfVxuICogfX0gb3B0c1xuICogQHJldHVybnMge1Byb21pc2U8aW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvbkZpbmlzaGVkIHwgdW5kZWZpbmVkPn0gcmV0dXJucyBgdW5kZWZpbmVkYCBpbiBjYXNlIG9mIGEgcmVkaXJlY3RcbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZF9yb290X2Vycm9yX3BhZ2UoeyBzdGF0dXMsIGVycm9yLCB1cmwsIHJvdXRlIH0pIHtcblx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSAqL1xuXHRjb25zdCBwYXJhbXMgPSB7fTsgLy8gZXJyb3IgcGFnZSBkb2VzIG5vdCBoYXZlIHBhcmFtc1xuXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCd0eXBlcycpLlNlcnZlckRhdGFOb2RlIHwgbnVsbH0gKi9cblx0bGV0IHNlcnZlcl9kYXRhX25vZGUgPSBudWxsO1xuXG5cdGlmIChfX1NWRUxURUtJVF9IQVNfU0VSVkVSX0xPQURfXykge1xuXHRcdGNvbnN0IGRlZmF1bHRfbGF5b3V0X2hhc19zZXJ2ZXJfbG9hZCA9IGFwcC5zZXJ2ZXJfbG9hZHNbMF0gPT09IDA7XG5cblx0XHRpZiAoZGVmYXVsdF9sYXlvdXRfaGFzX3NlcnZlcl9sb2FkKSB7XG5cdFx0XHQvLyBUT0RPIHBvc3QtaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL2tpdC9kaXNjdXNzaW9ucy82MTI0IHdlIGNhbiB1c2Vcblx0XHRcdC8vIGV4aXN0aW5nIHJvb3QgbGF5b3V0IGRhdGFcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHNlcnZlcl9kYXRhID0gYXdhaXQgbG9hZF9kYXRhKHVybCwgW3RydWVdKTtcblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0c2VydmVyX2RhdGEudHlwZSAhPT0gJ2RhdGEnIHx8XG5cdFx0XHRcdFx0KHNlcnZlcl9kYXRhLm5vZGVzWzBdICYmIHNlcnZlcl9kYXRhLm5vZGVzWzBdLnR5cGUgIT09ICdkYXRhJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0dGhyb3cgMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlcnZlcl9kYXRhX25vZGUgPSBzZXJ2ZXJfZGF0YS5ub2Rlc1swXSA/PyBudWxsO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBhdCB0aGlzIHBvaW50IHdlIGhhdmUgbm8gY2hvaWNlIGJ1dCB0byBmYWxsIGJhY2sgdG8gdGhlIHNlcnZlciwgaWYgaXQgd291bGRuJ3Rcblx0XHRcdFx0Ly8gYnJpbmcgdXMgcmlnaHQgYmFjayBoZXJlLCB0dXJuaW5nIHRoaXMgaW50byBhbiBlbmRsZXNzIGxvb3AuXG5cdFx0XHRcdC8vIGlmIF9fZGF0YS5qc29uIHJldHVybmVkIDQwNCwgdGhlIHJvdXRlIGRvZXNuJ3QgZXhpc3Qg4oCUIGRvbid0IHJlbG9hZCBvciB3ZSBsb29wXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQhKGUgaW5zdGFuY2VvZiBIdHRwRXJyb3IgJiYgZS5zdGF0dXMgPT09IDQwNCkgJiZcblx0XHRcdFx0XHQodXJsLm9yaWdpbiAhPT0gb3JpZ2luIHx8IHVybC5wYXRobmFtZSAhPT0gbG9jYXRpb24ucGF0aG5hbWUgfHwgaHlkcmF0ZWQpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiBhd2FpdCBuYXRpdmVfbmF2aWdhdGlvbih1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dHJ5IHtcblx0XHRjb25zdCByb290X2xheW91dCA9IGF3YWl0IGxvYWRfbm9kZSh7XG5cdFx0XHRsb2FkZXI6IGRlZmF1bHRfbGF5b3V0X2xvYWRlcixcblx0XHRcdHVybCxcblx0XHRcdHBhcmFtcyxcblx0XHRcdHJvdXRlLFxuXHRcdFx0cGFyZW50OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoe30pLFxuXHRcdFx0c2VydmVyX2RhdGFfbm9kZTogY3JlYXRlX2RhdGFfbm9kZShzZXJ2ZXJfZGF0YV9ub2RlKVxuXHRcdH0pO1xuXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5CcmFuY2hOb2RlfSAqL1xuXHRcdGNvbnN0IHJvb3RfZXJyb3IgPSB7XG5cdFx0XHRub2RlOiBhd2FpdCBkZWZhdWx0X2Vycm9yX2xvYWRlcigpLFxuXHRcdFx0bG9hZGVyOiBkZWZhdWx0X2Vycm9yX2xvYWRlcixcblx0XHRcdHVuaXZlcnNhbDogbnVsbCxcblx0XHRcdHNlcnZlcjogbnVsbCxcblx0XHRcdGRhdGE6IG51bGxcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGdldF9uYXZpZ2F0aW9uX3Jlc3VsdF9mcm9tX2JyYW5jaCh7XG5cdFx0XHR1cmwsXG5cdFx0XHRwYXJhbXMsXG5cdFx0XHRicmFuY2g6IFtyb290X2xheW91dCwgcm9vdF9lcnJvcl0sXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRlcnJvcixcblx0XHRcdGVycm9yczogW10sXG5cdFx0XHRyb3V0ZTogbnVsbFxuXHRcdH0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIGNsaWVudC1zaWRlIG5hdmlnYXRpb24gaWYgdGhlIHJvb3QgbGF5b3V0IGxvYWRlciB0aHJvd3MgYSByZWRpcmVjdCB3aGlsZVxuXHRcdC8vIHJlbmRlcmluZyB0aGUgZGVmYXVsdCBlcnJvciBwYWdlXG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgUmVkaXJlY3QpIHtcblx0XHRcdGF3YWl0IF9nb3RvKG5ldyBVUkwoZXJyb3IubG9jYXRpb24sIGxvY2F0aW9uLmhyZWYpLCB7fSwgMCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gb3RoZXJ3aXNlLCByZW5kZXIgdGhlIHN0YXRpYyBlcnJvciBwYWdlXG5cdFx0Y29uc3QgZXJyb3JfdGVtcGxhdGUgPSBhd2FpdCBhcHAuZ2V0X2Vycm9yX3RlbXBsYXRlKCk7XG5cdFx0Y29uc3QgaGFuZGxlZCA9IGF3YWl0IGhhbmRsZV9lcnJvcihlcnJvciwgeyB1cmwsIHBhcmFtcywgcm91dGUgfSk7XG5cdFx0Y29uc3QgbWVzc2FnZSA9IFN0cmluZyhoYW5kbGVkPy5tZXNzYWdlID8/ICcnKVxuXHRcdFx0LnJlcGxhY2UoLyYvZywgJyZhbXA7Jylcblx0XHRcdC5yZXBsYWNlKC88L2csICcmbHQ7Jylcblx0XHRcdC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG5cdFx0Y29uc3QgaHRtbCA9IGVycm9yX3RlbXBsYXRlKHsgc3RhdHVzLCBtZXNzYWdlIH0pO1xuXHRcdGNvbnN0IHBhcnNlZCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpO1xuXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZG9jdW1lbnQuYWRvcHROb2RlKHBhcnNlZC5oZWFkKSwgZG9jdW1lbnQuaGVhZCk7XG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcGxhY2VDaGlsZChkb2N1bWVudC5hZG9wdE5vZGUocGFyc2VkLmJvZHkpLCBkb2N1bWVudC5ib2R5KTtcblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbi8qKlxuICogUmVzb2x2ZSB0aGUgcmVsYXRpdmUgcmVyb3V0ZWQgVVJMIGZvciBhIGNsaWVudC1zaWRlIG5hdmlnYXRpb25cbiAqIEBwYXJhbSB7VVJMfSB1cmxcbiAqIEByZXR1cm5zIHtQcm9taXNlPFVSTCB8IHVuZGVmaW5lZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldF9yZXJvdXRlZF91cmwodXJsKSB7XG5cdGNvbnN0IGhyZWYgPSB1cmwuaHJlZjtcblxuXHRpZiAocmVyb3V0ZV9jYWNoZS5oYXMoaHJlZikpIHtcblx0XHRyZXR1cm4gcmVyb3V0ZV9jYWNoZS5nZXQoaHJlZik7XG5cdH1cblxuXHRsZXQgcmVyb3V0ZWQ7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBwcm9taXNlID0gKGFzeW5jICgpID0+IHtcblx0XHRcdC8vIHJlcm91dGUgY291bGQgYWx0ZXIgdGhlIGdpdmVuIFVSTCwgc28gd2UgcGFzcyBhIGNvcHlcblx0XHRcdGxldCByZXJvdXRlZCA9XG5cdFx0XHRcdChhd2FpdCBhcHAuaG9va3MucmVyb3V0ZSh7XG5cdFx0XHRcdFx0dXJsOiBuZXcgVVJMKHVybCksXG5cdFx0XHRcdFx0ZmV0Y2g6IGFzeW5jIChpbnB1dCwgaW5pdCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmVfZmV0Y2hfdXJsKGlucHV0LCBpbml0LCB1cmwpLnByb21pc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSkgPz8gdXJsO1xuXG5cdFx0XHRpZiAodHlwZW9mIHJlcm91dGVkID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRjb25zdCB0bXAgPSBuZXcgVVJMKHVybCk7IC8vIGRvIG5vdCBtdXRhdGUgdGhlIGluY29taW5nIFVSTFxuXG5cdFx0XHRcdGlmIChhcHAuaGFzaCkge1xuXHRcdFx0XHRcdHRtcC5oYXNoID0gcmVyb3V0ZWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dG1wLnBhdGhuYW1lID0gcmVyb3V0ZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXJvdXRlZCA9IHRtcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlcm91dGVkO1xuXHRcdH0pKCk7XG5cblx0XHRyZXJvdXRlX2NhY2hlLnNldChocmVmLCBwcm9taXNlKTtcblx0XHRyZXJvdXRlZCA9IGF3YWl0IHByb21pc2U7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXJvdXRlX2NhY2hlLmRlbGV0ZShocmVmKTtcblx0XHRpZiAoREVWKSB7XG5cdFx0XHQvLyBpbiBkZXZlbG9wbWVudCwgcHJpbnQgdGhlIGVycm9yLi4uXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXG5cdFx0XHQvLyAuLi5hbmQgcGF1c2UgZXhlY3V0aW9uLCBzaW5jZSBvdGhlcndpc2Ugd2Ugd2lsbCBpbW1lZGlhdGVseSByZWxvYWQgdGhlIHBhZ2Vcblx0XHRcdGRlYnVnZ2VyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0fVxuXG5cdFx0Ly8gZmFsbCBiYWNrIHRvIG5hdGl2ZSBuYXZpZ2F0aW9uXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cmV0dXJuIHJlcm91dGVkO1xufVxuXG4vKipcbiAqIFJlc29sdmUgdGhlIGZ1bGwgaW5mbyAod2hpY2ggcm91dGUsIHBhcmFtcywgZXRjLikgZm9yIGEgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBmcm9tIHRoZSBVUkwsXG4gKiB0YWtpbmcgdGhlIHJlcm91dGUgaG9vayBpbnRvIGFjY291bnQuIElmIHRoaXMgaXNuJ3QgYSBjbGllbnQtc2lkZS1uYXZpZ2F0aW9uIChvciB0aGUgVVJMIGlzIHVuZGVmaW5lZCksXG4gKiByZXR1cm5zIHVuZGVmaW5lZC5cbiAqIEBwYXJhbSB7VVJMIHwgdW5kZWZpbmVkfSB1cmxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW52YWxpZGF0aW5nXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uSW50ZW50IHwgdW5kZWZpbmVkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldF9uYXZpZ2F0aW9uX2ludGVudCh1cmwsIGludmFsaWRhdGluZykge1xuXHRpZiAoIXVybCkgcmV0dXJuO1xuXHRpZiAoaXNfZXh0ZXJuYWxfdXJsKHVybCwgYmFzZSwgYXBwLmhhc2gpKSByZXR1cm47XG5cblx0aWYgKF9fU1ZFTFRFS0lUX0NMSUVOVF9ST1VUSU5HX18pIHtcblx0XHRjb25zdCByZXJvdXRlZCA9IGF3YWl0IGdldF9yZXJvdXRlZF91cmwodXJsKTtcblx0XHRpZiAoIXJlcm91dGVkKSByZXR1cm47XG5cblx0XHRjb25zdCBwYXRoID0gZ2V0X3VybF9wYXRoKHJlcm91dGVkKTtcblxuXHRcdGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XG5cdFx0XHRjb25zdCBwYXJhbXMgPSByb3V0ZS5leGVjKHBhdGgpO1xuXG5cdFx0XHRpZiAocGFyYW1zKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0aWQ6IGdldF9wYWdlX2tleSh1cmwpLFxuXHRcdFx0XHRcdGludmFsaWRhdGluZyxcblx0XHRcdFx0XHRyb3V0ZSxcblx0XHRcdFx0XHRwYXJhbXM6IGRlY29kZV9wYXJhbXMocGFyYW1zKSxcblx0XHRcdFx0XHR1cmxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0LyoqIEB0eXBlIHt7IHJvdXRlPzogaW1wb3J0KCd0eXBlcycpLkNTUlJvdXRlU2VydmVyLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz59fSAqL1xuXHRcdGNvbnN0IHsgcm91dGUsIHBhcmFtcyB9ID0gYXdhaXQgaW1wb3J0KFxuXHRcdFx0LyogQHZpdGUtaWdub3JlICovXG5cdFx0XHRfX3ZpdGVfX2luamVjdFF1ZXJ5KGFkZF9yZXNvbHV0aW9uX3N1ZmZpeCh1cmwucGF0aG5hbWUpLCAnaW1wb3J0Jylcblx0XHQpO1xuXG5cdFx0aWYgKCFyb3V0ZSkgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGlkOiBnZXRfcGFnZV9rZXkodXJsKSxcblx0XHRcdGludmFsaWRhdGluZyxcblx0XHRcdHJvdXRlOiBwYXJzZV9zZXJ2ZXJfcm91dGUocm91dGUsIGFwcC5ub2RlcyksXG5cdFx0XHRwYXJhbXMsXG5cdFx0XHR1cmxcblx0XHR9O1xuXHR9XG59XG5cbi8qKiBAcGFyYW0ge1VSTH0gdXJsICovXG5mdW5jdGlvbiBnZXRfdXJsX3BhdGgodXJsKSB7XG5cdHJldHVybiAoXG5cdFx0ZGVjb2RlX3BhdGhuYW1lKFxuXHRcdFx0YXBwLmhhc2ggPyB1cmwuaGFzaC5yZXBsYWNlKC9eIy8sICcnKS5yZXBsYWNlKC9bPyNdLisvLCAnJykgOiB1cmwucGF0aG5hbWUuc2xpY2UoYmFzZS5sZW5ndGgpXG5cdFx0KSB8fCAnLydcblx0KTtcbn1cblxuLyoqIEBwYXJhbSB7VVJMfSB1cmwgKi9cbmZ1bmN0aW9uIGdldF9wYWdlX2tleSh1cmwpIHtcblx0cmV0dXJuIChhcHAuaGFzaCA/IHVybC5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogdXJsLnBhdGhuYW1lKSArIHVybC5zZWFyY2g7XG59XG5cbi8qKlxuICogQHBhcmFtIHt7XG4gKiAgIHVybDogVVJMO1xuICogICB0eXBlOiBpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5OYXZpZ2F0aW9uW1widHlwZVwiXTtcbiAqICAgaW50ZW50PzogaW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvbkludGVudDtcbiAqICAgZGVsdGE/OiBudW1iZXI7XG4gKiAgIGV2ZW50PzogUG9wU3RhdGVFdmVudCB8IE1vdXNlRXZlbnQ7XG4gKiAgIHNjcm9sbD86IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcbiAqIH19IG9wdHNcbiAqL1xuZnVuY3Rpb24gX2JlZm9yZV9uYXZpZ2F0ZSh7IHVybCwgdHlwZSwgaW50ZW50LCBkZWx0YSwgZXZlbnQsIHNjcm9sbCB9KSB7XG5cdGxldCBzaG91bGRfYmxvY2sgPSBmYWxzZTtcblxuXHRjb25zdCBuYXYgPSBjcmVhdGVfbmF2aWdhdGlvbihjdXJyZW50LCBpbnRlbnQsIHVybCwgdHlwZSwgc2Nyb2xsID8/IG51bGwpO1xuXG5cdGlmIChkZWx0YSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0bmF2Lm5hdmlnYXRpb24uZGVsdGEgPSBkZWx0YTtcblx0fVxuXG5cdGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdG5hdi5uYXZpZ2F0aW9uLmV2ZW50ID0gZXZlbnQ7XG5cdH1cblxuXHRjb25zdCBjYW5jZWxsYWJsZSA9IHtcblx0XHQuLi5uYXYubmF2aWdhdGlvbixcblx0XHRjYW5jZWw6ICgpID0+IHtcblx0XHRcdHNob3VsZF9ibG9jayA9IHRydWU7XG5cdFx0XHRuYXYucmVqZWN0KG5ldyBFcnJvcignbmF2aWdhdGlvbiBjYW5jZWxsZWQnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICghaXNfbmF2aWdhdGluZykge1xuXHRcdC8vIERvbid0IHJ1biB0aGUgZXZlbnQgZHVyaW5nIHJlZGlyZWN0c1xuXHRcdGJlZm9yZV9uYXZpZ2F0ZV9jYWxsYmFja3MuZm9yRWFjaCgoZm4pID0+IGZuKGNhbmNlbGxhYmxlKSk7XG5cdH1cblxuXHRyZXR1cm4gc2hvdWxkX2Jsb2NrID8gbnVsbCA6IG5hdjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3tcbiAqICAgdHlwZTogaW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvblR5cGU7XG4gKiAgIHVybDogVVJMO1xuICogICBwb3BwZWQ/OiB7XG4gKiAgICAgc3RhdGU6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gKiAgICAgc2Nyb2xsOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG4gKiAgICAgZGVsdGE6IG51bWJlcjtcbiAqICAgfTtcbiAqICAga2VlcGZvY3VzPzogYm9vbGVhbjtcbiAqICAgbm9zY3JvbGw/OiBib29sZWFuO1xuICogICByZXBsYWNlX3N0YXRlPzogYm9vbGVhbjtcbiAqICAgc3RhdGU/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICogICByZWRpcmVjdF9jb3VudD86IG51bWJlcjtcbiAqICAgbmF2X3Rva2VuPzoge307XG4gKiAgIGFjY2VwdD86ICgpID0+IHZvaWQ7XG4gKiAgIGJsb2NrPzogKCkgPT4gdm9pZDtcbiAqICAgZXZlbnQ/OiBFdmVudFxuICogfX0gb3B0c1xuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRlKHtcblx0dHlwZSxcblx0dXJsLFxuXHRwb3BwZWQsXG5cdGtlZXBmb2N1cyxcblx0bm9zY3JvbGwsXG5cdHJlcGxhY2Vfc3RhdGUsXG5cdHN0YXRlID0ge30sXG5cdHJlZGlyZWN0X2NvdW50ID0gMCxcblx0bmF2X3Rva2VuID0ge30sXG5cdGFjY2VwdCA9IG5vb3AsXG5cdGJsb2NrID0gbm9vcCxcblx0ZXZlbnRcbn0pIHtcblx0Y29uc3QgcHJldl90b2tlbiA9IHRva2VuO1xuXHR0b2tlbiA9IG5hdl90b2tlbjtcblxuXHRjb25zdCBpbnRlbnQgPSBhd2FpdCBnZXRfbmF2aWdhdGlvbl9pbnRlbnQodXJsLCBmYWxzZSk7XG5cdGNvbnN0IG5hdiA9XG5cdFx0dHlwZSA9PT0gJ2VudGVyJ1xuXHRcdFx0PyBjcmVhdGVfbmF2aWdhdGlvbihjdXJyZW50LCBpbnRlbnQsIHVybCwgdHlwZSlcblx0XHRcdDogX2JlZm9yZV9uYXZpZ2F0ZSh7XG5cdFx0XHRcdFx0dXJsLFxuXHRcdFx0XHRcdHR5cGUsXG5cdFx0XHRcdFx0ZGVsdGE6IHBvcHBlZD8uZGVsdGEsXG5cdFx0XHRcdFx0aW50ZW50LFxuXHRcdFx0XHRcdHNjcm9sbDogcG9wcGVkPy5zY3JvbGwsXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdGV2ZW50XG5cdFx0XHRcdH0pO1xuXG5cdGlmICghbmF2KSB7XG5cdFx0YmxvY2soKTtcblx0XHRpZiAodG9rZW4gPT09IG5hdl90b2tlbikgdG9rZW4gPSBwcmV2X3Rva2VuO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIHN0b3JlIHRoaXMgYmVmb3JlIGNhbGxpbmcgYGFjY2VwdCgpYCwgd2hpY2ggbWF5IGNoYW5nZSB0aGUgaW5kZXhcblx0Y29uc3QgcHJldmlvdXNfaGlzdG9yeV9pbmRleCA9IGN1cnJlbnRfaGlzdG9yeV9pbmRleDtcblx0Y29uc3QgcHJldmlvdXNfbmF2aWdhdGlvbl9pbmRleCA9IGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleDtcblxuXHRhY2NlcHQoKTtcblxuXHRpc19uYXZpZ2F0aW5nID0gdHJ1ZTtcblxuXHRpZiAoc3RhcnRlZCAmJiBuYXYubmF2aWdhdGlvbi50eXBlICE9PSAnZW50ZXInKSB7XG5cdFx0c3RvcmVzLm5hdmlnYXRpbmcuc2V0KChuYXZpZ2F0aW5nLmN1cnJlbnQgPSBuYXYubmF2aWdhdGlvbikpO1xuXHR9XG5cblx0bGV0IG5hdmlnYXRpb25fcmVzdWx0ID0gaW50ZW50ICYmIChhd2FpdCBsb2FkX3JvdXRlKGludGVudCkpO1xuXG5cdGlmICghbmF2aWdhdGlvbl9yZXN1bHQpIHtcblx0XHRpZiAoaXNfZXh0ZXJuYWxfdXJsKHVybCwgYmFzZSwgYXBwLmhhc2gpKSB7XG5cdFx0XHRpZiAoREVWICYmIGFwcC5oYXNoKSB7XG5cdFx0XHRcdC8vIFNwZWNpYWwgY2FzZSBmb3IgaGFzaCBtb2RlIGR1cmluZyBERVY6IElmIHNvbWVvbmUgYWNjaWRlbnRhbGx5IGZvcmdldHMgdG8gdXNlIGEgaGFzaCBmb3IgdGhlIGxpbmssXG5cdFx0XHRcdC8vIHRoZXkgd291bGQgZW5kIHVwIGhlcmUgaW4gYW4gZW5kbGVzcyBsb29wLiBGYWxsIGJhY2sgdG8gZXJyb3IgcGFnZSBpbiB0aGF0IGNhc2Vcblx0XHRcdFx0bmF2aWdhdGlvbl9yZXN1bHQgPSBhd2FpdCBzZXJ2ZXJfZmFsbGJhY2soXG5cdFx0XHRcdFx0dXJsLFxuXHRcdFx0XHRcdHsgaWQ6IG51bGwgfSxcblx0XHRcdFx0XHRhd2FpdCBoYW5kbGVfZXJyb3IoXG5cdFx0XHRcdFx0XHRuZXcgU3ZlbHRlS2l0RXJyb3IoXG5cdFx0XHRcdFx0XHRcdDQwNCxcblx0XHRcdFx0XHRcdFx0J05vdCBGb3VuZCcsXG5cdFx0XHRcdFx0XHRcdGBOb3QgZm91bmQ6ICR7dXJsLnBhdGhuYW1lfSAoZGlkIHlvdSBmb3JnZXQgdGhlIGhhc2g/KWBcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHVybCxcblx0XHRcdFx0XHRcdFx0cGFyYW1zOiB7fSxcblx0XHRcdFx0XHRcdFx0cm91dGU6IHsgaWQ6IG51bGwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0NDA0LFxuXHRcdFx0XHRcdHJlcGxhY2Vfc3RhdGVcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBhd2FpdCBuYXRpdmVfbmF2aWdhdGlvbih1cmwsIHJlcGxhY2Vfc3RhdGUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuYXZpZ2F0aW9uX3Jlc3VsdCA9IGF3YWl0IHNlcnZlcl9mYWxsYmFjayhcblx0XHRcdFx0dXJsLFxuXHRcdFx0XHR7IGlkOiBudWxsIH0sXG5cdFx0XHRcdGF3YWl0IGhhbmRsZV9lcnJvcihuZXcgU3ZlbHRlS2l0RXJyb3IoNDA0LCAnTm90IEZvdW5kJywgYE5vdCBmb3VuZDogJHt1cmwucGF0aG5hbWV9YCksIHtcblx0XHRcdFx0XHR1cmwsXG5cdFx0XHRcdFx0cGFyYW1zOiB7fSxcblx0XHRcdFx0XHRyb3V0ZTogeyBpZDogbnVsbCB9XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHQ0MDQsXG5cdFx0XHRcdHJlcGxhY2Vfc3RhdGVcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaWYgdGhpcyBpcyBhbiBpbnRlcm5hbCBuYXZpZ2F0aW9uIGludGVudCwgdXNlIHRoZSBub3JtYWxpemVkXG5cdC8vIFVSTCBmb3IgdGhlIHJlc3Qgb2YgdGhlIGZ1bmN0aW9uXG5cdHVybCA9IGludGVudD8udXJsIHx8IHVybDtcblxuXHQvLyBhYm9ydCBpZiB1c2VyIG5hdmlnYXRlZCBkdXJpbmcgdXBkYXRlXG5cdGlmICh0b2tlbiAhPT0gbmF2X3Rva2VuKSB7XG5cdFx0bmF2LnJlamVjdChuZXcgRXJyb3IoJ25hdmlnYXRpb24gYWJvcnRlZCcpKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoIW5hdmlnYXRpb25fcmVzdWx0KSByZXR1cm47XG5cblx0aWYgKG5hdmlnYXRpb25fcmVzdWx0LnR5cGUgPT09ICdyZWRpcmVjdCcpIHtcblx0XHQvLyB3aGF0d2cgZmV0Y2ggc3BlYyBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jaHR0cC1yZWRpcmVjdC1mZXRjaCBzYXlzIHRvIGVycm9yIGFmdGVyIDIwIHJlZGlyZWN0c1xuXHRcdGlmIChyZWRpcmVjdF9jb3VudCA8IDIwKSB7XG5cdFx0XHRhd2FpdCBuYXZpZ2F0ZSh7XG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHVybDogbmV3IFVSTChuYXZpZ2F0aW9uX3Jlc3VsdC5sb2NhdGlvbiwgdXJsKSxcblx0XHRcdFx0cG9wcGVkLFxuXHRcdFx0XHRrZWVwZm9jdXMsXG5cdFx0XHRcdG5vc2Nyb2xsLFxuXHRcdFx0XHRyZXBsYWNlX3N0YXRlLFxuXHRcdFx0XHRzdGF0ZSxcblx0XHRcdFx0cmVkaXJlY3RfY291bnQ6IHJlZGlyZWN0X2NvdW50ICsgMSxcblx0XHRcdFx0bmF2X3Rva2VuXG5cdFx0XHR9KTtcblxuXHRcdFx0bmF2LmZ1bGZpbCh1bmRlZmluZWQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5hdmlnYXRpb25fcmVzdWx0ID0gYXdhaXQgbG9hZF9yb290X2Vycm9yX3BhZ2Uoe1xuXHRcdFx0c3RhdHVzOiA1MDAsXG5cdFx0XHRlcnJvcjogYXdhaXQgaGFuZGxlX2Vycm9yKG5ldyBFcnJvcignUmVkaXJlY3QgbG9vcCcpLCB7XG5cdFx0XHRcdHVybCxcblx0XHRcdFx0cGFyYW1zOiB7fSxcblx0XHRcdFx0cm91dGU6IHsgaWQ6IG51bGwgfVxuXHRcdFx0fSksXG5cdFx0XHR1cmwsXG5cdFx0XHRyb3V0ZTogeyBpZDogbnVsbCB9XG5cdFx0fSk7XG5cblx0XHRpZiAoIW5hdmlnYXRpb25fcmVzdWx0KSByZXR1cm47XG5cdH0gZWxzZSBpZiAoLyoqIEB0eXBlIHtudW1iZXJ9ICovIChuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcy5wYWdlLnN0YXR1cykgPj0gNDAwKSB7XG5cdFx0Y29uc3QgdXBkYXRlZCA9IGF3YWl0IHN0b3Jlcy51cGRhdGVkLmNoZWNrKCk7XG5cdFx0aWYgKHVwZGF0ZWQpIHtcblx0XHRcdC8vIEJlZm9yZSByZWxvYWRpbmcsIHRyeSB0byB1cGRhdGUgdGhlIHNlcnZpY2Ugd29ya2VyIGlmIGl0IGV4aXN0c1xuXHRcdFx0YXdhaXQgdXBkYXRlX3NlcnZpY2Vfd29ya2VyKCk7XG5cdFx0XHRyZXR1cm4gYXdhaXQgbmF0aXZlX25hdmlnYXRpb24odXJsLCByZXBsYWNlX3N0YXRlKTtcblx0XHR9XG5cdH1cblxuXHQvLyByZXNldCBpbnZhbGlkYXRpb24gb25seSBhZnRlciBhIGZpbmlzaGVkIG5hdmlnYXRpb24uIElmIHRoZXJlIGFyZSByZWRpcmVjdHMgb3Jcblx0Ly8gYWRkaXRpb25hbCBpbnZhbGlkYXRpb25zLCB0aGV5IHNob3VsZCBnZXQgdGhlIHNhbWUgaW52YWxpZGF0aW9uIHRyZWF0bWVudFxuXHRyZXNldF9pbnZhbGlkYXRpb24oKTtcblxuXHR1cGRhdGluZyA9IHRydWU7XG5cblx0dXBkYXRlX3Njcm9sbF9wb3NpdGlvbnMocHJldmlvdXNfaGlzdG9yeV9pbmRleCk7XG5cdGNhcHR1cmVfc25hcHNob3QocHJldmlvdXNfbmF2aWdhdGlvbl9pbmRleCk7XG5cblx0Ly8gZW5zdXJlIHRoZSB1cmwgcGF0aG5hbWUgbWF0Y2hlcyB0aGUgcGFnZSdzIHRyYWlsaW5nIHNsYXNoIG9wdGlvblxuXHRpZiAobmF2aWdhdGlvbl9yZXN1bHQucHJvcHMucGFnZS51cmwucGF0aG5hbWUgIT09IHVybC5wYXRobmFtZSkge1xuXHRcdHVybC5wYXRobmFtZSA9IG5hdmlnYXRpb25fcmVzdWx0LnByb3BzLnBhZ2UudXJsLnBhdGhuYW1lO1xuXHR9XG5cblx0c3RhdGUgPSBwb3BwZWQgPyBwb3BwZWQuc3RhdGUgOiBzdGF0ZTtcblxuXHRpZiAoIXBvcHBlZCkge1xuXHRcdC8vIHRoaXMgaXMgYSBuZXcgbmF2aWdhdGlvbiwgcmF0aGVyIHRoYW4gYSBwb3BzdGF0ZVxuXHRcdGNvbnN0IGNoYW5nZSA9IHJlcGxhY2Vfc3RhdGUgPyAwIDogMTtcblxuXHRcdGNvbnN0IGVudHJ5ID0ge1xuXHRcdFx0W0hJU1RPUllfSU5ERVhdOiAoY3VycmVudF9oaXN0b3J5X2luZGV4ICs9IGNoYW5nZSksXG5cdFx0XHRbTkFWSUdBVElPTl9JTkRFWF06IChjdXJyZW50X25hdmlnYXRpb25faW5kZXggKz0gY2hhbmdlKSxcblx0XHRcdFtTVEFURVNfS0VZXTogc3RhdGVcblx0XHR9O1xuXG5cdFx0Y29uc3QgZm4gPSByZXBsYWNlX3N0YXRlID8gaGlzdG9yeS5yZXBsYWNlU3RhdGUgOiBoaXN0b3J5LnB1c2hTdGF0ZTtcblx0XHRmbi5jYWxsKGhpc3RvcnksIGVudHJ5LCAnJywgdXJsKTtcblxuXHRcdGlmICghcmVwbGFjZV9zdGF0ZSkge1xuXHRcdFx0Y2xlYXJfb253YXJkX2hpc3RvcnkoY3VycmVudF9oaXN0b3J5X2luZGV4LCBjdXJyZW50X25hdmlnYXRpb25faW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGFsc28gY29tcGFyZSBpZHMgdG8gYXZvaWQgdXNpbmcgd3JvbmcgZm9yayAoZS5nLiBhIG5ldyBvbmUgY291bGQndmUgYmVlbiBhZGRlZCB3aGlsZSBuYXZpZ2F0aW5nKVxuXHRjb25zdCBsb2FkX2NhY2hlX2ZvcmsgPSBpbnRlbnQgJiYgbG9hZF9jYWNoZT8uaWQgPT09IGludGVudC5pZCA/IGxvYWRfY2FjaGUuZm9yayA6IG51bGw7XG5cdC8vIHJlc2V0IHByZWxvYWQgc3luY2hyb25vdXNseSBhZnRlciB0aGUgaGlzdG9yeSBzdGF0ZSBoYXMgYmVlbiBzZXQgdG8gYXZvaWQgcmFjZSBjb25kaXRpb25zXG5cdGlmIChsb2FkX2NhY2hlPy5mb3JrICYmICFsb2FkX2NhY2hlX2ZvcmspIHtcblx0XHQvLyBkaXNjYXJkIGZvcmsgb2YgZGlmZmVyZW50IHJvdXRlXG5cdFx0ZGlzY2FyZF9sb2FkX2NhY2hlKCk7XG5cdH0gZWxzZSB7XG5cdFx0bG9hZF9jYWNoZSA9IG51bGw7XG5cdFx0Y3VycmVudF9hID0geyBlbGVtZW50OiB1bmRlZmluZWQsIGhyZWY6IHVuZGVmaW5lZCB9O1xuXHR9XG5cblx0bmF2aWdhdGlvbl9yZXN1bHQucHJvcHMucGFnZS5zdGF0ZSA9IHN0YXRlO1xuXG5cdC8qKlxuXHQgKiBAdHlwZSB7UHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZH1cblx0ICovXG5cdGxldCBjb21taXRfcHJvbWlzZTtcblx0aWYgKHN0YXJ0ZWQpIHtcblx0XHRjb25zdCBhZnRlcl9uYXZpZ2F0ZSA9IChcblx0XHRcdGF3YWl0IFByb21pc2UuYWxsKFxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2F3YWl0LXRoZW5hYmxlIC0tIHdlIG5lZWQgdG8gYXdhaXQgYmVjYXVzZSB0aGV5IGNhbiBiZSBhc3luY2hyb25vdXNcblx0XHRcdFx0QXJyYXkuZnJvbShvbl9uYXZpZ2F0ZV9jYWxsYmFja3MsIChmbikgPT5cblx0XHRcdFx0XHRmbigvKiogQHR5cGUge2ltcG9ydCgnQHN2ZWx0ZWpzL2tpdCcpLk9uTmF2aWdhdGV9ICovIChuYXYubmF2aWdhdGlvbikpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpLmZpbHRlcigvKiogQHJldHVybnMge3ZhbHVlIGlzICgpID0+IHZvaWR9ICovICh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKTtcblxuXHRcdGlmIChhZnRlcl9uYXZpZ2F0ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRmdW5jdGlvbiBjbGVhbnVwKCkge1xuXHRcdFx0XHRhZnRlcl9uYXZpZ2F0ZS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcy5kZWxldGUoZm4pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0YWZ0ZXJfbmF2aWdhdGUucHVzaChjbGVhbnVwKTtcblxuXHRcdFx0YWZ0ZXJfbmF2aWdhdGUuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0YWZ0ZXJfbmF2aWdhdGVfY2FsbGJhY2tzLmFkZChmbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBUeXBlLWNhc3RzIGFyZSBzYXZlIGJlY2F1c2Ugd2Uga25vdyB0aGlzIHJlc29sdmVkIGEgcHJvcGVyIFN2ZWx0ZUtpdCByb3V0ZVxuXHRcdGNvbnN0IHRhcmdldCA9IC8qKiBAdHlwZSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvblRhcmdldH0gKi8gKG5hdi5uYXZpZ2F0aW9uLnRvKTtcblx0XHRjdXJyZW50ID0ge1xuXHRcdFx0Li4ubmF2aWdhdGlvbl9yZXN1bHQuc3RhdGUsXG5cdFx0XHRuYXY6IHtcblx0XHRcdFx0cGFyYW1zOiAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIGFueT59ICovICh0YXJnZXQucGFyYW1zKSxcblx0XHRcdFx0cm91dGU6IHRhcmdldC5yb3V0ZSxcblx0XHRcdFx0dXJsOiB0YXJnZXQudXJsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHJlc2V0IHVybCBiZWZvcmUgdXBkYXRpbmcgcGFnZSBzdG9yZVxuXHRcdGlmIChuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcy5wYWdlKSB7XG5cdFx0XHRuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcy5wYWdlLnVybCA9IHVybDtcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZm9jdXMgYmVmb3JlIHVwZGF0aW5nIHRoZSBjb21wb25lbnQgdHJlZSwgc28gdGhhdCBibHVyL2ZvY3Vzb3V0XG5cdFx0Ly8gaGFuZGxlcnMgZmlyZSB3aGlsZSB0aGUgb2xkIGNvbXBvbmVudCdzIGRhdGEgaXMgc3RpbGwgdmFsaWQgKCMxNDU3NSlcblx0XHRpZiAoXG5cdFx0XHQha2VlcGZvY3VzICYmXG5cdFx0XHRkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHlcblx0XHQpIHtcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZvcmsgPSBsb2FkX2NhY2hlX2ZvcmsgJiYgKGF3YWl0IGxvYWRfY2FjaGVfZm9yayk7XG5cblx0XHRpZiAoZm9yaykge1xuXHRcdFx0Y29tbWl0X3Byb21pc2UgPSBmb3JrLmNvbW1pdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW5kZXJpbmdfZXJyb3IgPSBudWxsOyAvLyBUT0RPIHRoaXMgY2FuIGJyZWFrIHdpdGggZm9ya3MsIHJldGhpbmsgZm9yIFN2ZWx0ZUtpdCAzIHdoZXJlIHdlIGNhbiBhc3N1bWUgU3ZlbHRlIDVcblx0XHRcdHJvb3QuJHNldChuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcyk7XG5cdFx0XHQvLyBDaGVjayBmb3Igc3luYyByZW5kZXJpbmcgZXJyb3Jcblx0XHRcdGlmIChyZW5kZXJpbmdfZXJyb3IpIHtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihuYXZpZ2F0aW9uX3Jlc3VsdC5wcm9wcy5wYWdlLCByZW5kZXJpbmdfZXJyb3IpO1xuXHRcdFx0fVxuXHRcdFx0dXBkYXRlKG5hdmlnYXRpb25fcmVzdWx0LnByb3BzLnBhZ2UpO1xuXG5cdFx0XHRjb21taXRfcHJvbWlzZSA9IHN2ZWx0ZS5zZXR0bGVkPy4oKTtcblx0XHR9XG5cblx0XHRoYXNfbmF2aWdhdGVkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHRhd2FpdCBpbml0aWFsaXplKG5hdmlnYXRpb25fcmVzdWx0LCB0YXJnZXQsIGZhbHNlKTtcblx0fVxuXG5cdGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZG9jdW1lbnQ7XG5cblx0YXdhaXQgY29tbWl0X3Byb21pc2U7XG5cblx0Ly8gVE9ETyAzLjAgcmVtb3RlIOKAlCB0aGUgZG91YmxlIHRpY2sgaXMgcHJvYmFibHkgbmVjZXNzYXJ5IGJlY2F1c2Vcblx0Ly8gb2Ygc29tZSBzdG9yZSBzaGVuYW5pZ2Fucy4gYHNldHRsZWQoKWAgYW5kIGBmLmNvbW1pdCgpYFxuXHQvLyBzaG91bGQgcmVzb2x2ZSBhZnRlciBET00gdXBkYXRlcyBpbiBuZXdlciB2ZXJzaW9uc1xuXHRhd2FpdCBzdmVsdGUudGljaygpO1xuXHRhd2FpdCBzdmVsdGUudGljaygpO1xuXG5cdGlmICh0b2tlbiAhPT0gbmF2X3Rva2VuKSB7XG5cdFx0Ly8gYSBuZXcgbmF2aWdhdGlvbiBoYXBwZW5lZCB3aGlsZSB3ZSB3ZXJlIHdhaXRpbmcgZm9yIHRoZSBET00gdG8gdXBkYXRlLCBzbyBhYm9ydFxuXHRcdG5hdi5yZWplY3QobmV3IEVycm9yKCduYXZpZ2F0aW9uIGFib3J0ZWQnKSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIGFzeW5jIHJlbmRlcmluZyBlcnJvclxuXHRpZiAobmF2aWdhdGlvbl9yZXN1bHQucHJvcHMucGFnZSAmJiByZW5kZXJpbmdfZXJyb3IpIHtcblx0XHRPYmplY3QuYXNzaWduKG5hdmlnYXRpb25fcmVzdWx0LnByb3BzLnBhZ2UsIHJlbmRlcmluZ19lcnJvcik7XG5cdH1cblxuXHQvLyB3ZSByZXNldCBzY3JvbGwgYmVmb3JlIGRlYWxpbmcgd2l0aCBmb2N1cywgdG8gYXZvaWQgYSBmbGFzaCBvZiB1bnNjcm9sbGVkIGNvbnRlbnRcblx0LyoqIEB0eXBlIHtFbGVtZW50IHwgbnVsbCB8ICcnfSAqL1xuXHRsZXQgZGVlcF9saW5rZWQgPSBudWxsO1xuXG5cdGlmIChhdXRvc2Nyb2xsKSB7XG5cdFx0Y29uc3Qgc2Nyb2xsID0gcG9wcGVkID8gcG9wcGVkLnNjcm9sbCA6IG5vc2Nyb2xsID8gc2Nyb2xsX3N0YXRlKCkgOiBudWxsO1xuXHRcdGlmIChzY3JvbGwpIHtcblx0XHRcdHNjcm9sbFRvKHNjcm9sbC54LCBzY3JvbGwueSk7XG5cdFx0fSBlbHNlIGlmICgoZGVlcF9saW5rZWQgPSB1cmwuaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRfaWQodXJsKSkpKSB7XG5cdFx0XHQvLyBIZXJlIHdlIHVzZSBgc2Nyb2xsSW50b1ZpZXdgIG9uIHRoZSBlbGVtZW50IGluc3RlYWQgb2YgYHNjcm9sbFRvYFxuXHRcdFx0Ly8gYmVjYXVzZSBpdCBuYXRpdmVseSBzdXBwb3J0cyB0aGUgYHNjcm9sbC1tYXJnaW5gIGFuZCBgc2Nyb2xsLWJlaGF2aW9yYFxuXHRcdFx0Ly8gQ1NTIHByb3BlcnRpZXMuXG5cdFx0XHRkZWVwX2xpbmtlZC5zY3JvbGxJbnRvVmlldygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzY3JvbGxUbygwLCAwKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBjaGFuZ2VkX2ZvY3VzID1cblx0XHQvLyByZXNldCBmb2N1cyBvbmx5IGlmIGFueSBtYW51YWwgZm9jdXMgbWFuYWdlbWVudCBkaWRuJ3Qgb3ZlcnJpZGUgaXRcblx0XHRkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBhY3RpdmVFbGVtZW50ICYmXG5cdFx0Ly8gYWxzbyByZWZvY3VzIHdoZW4gYWN0aXZlRWxlbWVudCBpcyBib2R5IGFscmVhZHkgYmVjYXVzZSB0aGVcblx0XHQvLyBmb2N1cyBldmVudCBtaWdodCBub3QgaGF2ZSBiZWVuIGZpcmVkIG9uIGl0IHlldFxuXHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHk7XG5cblx0aWYgKCFrZWVwZm9jdXMgJiYgIWNoYW5nZWRfZm9jdXMpIHtcblx0XHQvLyBXZSBkb24ndCBuZWVkIHRvIG1hbnVhbGx5IHJlc3RvcmUgdGhlIHNjcm9sbCBwb3NpdGlvbiBpZiB3ZSdyZSBuYXZpZ2F0aW5nXG5cdFx0Ly8gdG8gYSBmcmFnbWVudCBpZGVudGlmaWVyLiBJdCBpcyBhdXRvbWF0aWNhbGx5IGRvbmUgZm9yIHVzIHdoZW4gd2Ugc2V0IHRoZVxuXHRcdC8vIHNlcXVlbnRpYWwgbmF2aWdhdGlvbiBzdGFydGluZyBwb2ludCB3aXRoIGBsb2NhdGlvbi5yZXBsYWNlYFxuXHRcdHJlc2V0X2ZvY3VzKHVybCwgIWRlZXBfbGlua2VkKTtcblx0fVxuXG5cdGF1dG9zY3JvbGwgPSB0cnVlO1xuXG5cdGlzX25hdmlnYXRpbmcgPSBmYWxzZTtcblxuXHRuYXYuZnVsZmlsKHVuZGVmaW5lZCk7XG5cblx0Ly8gVXBkYXRlIHRvLnNjcm9sbCB0byB0aGUgYWN0dWFsIHNjcm9sbCBwb3NpdGlvbiBhZnRlciBuYXZpZ2F0aW9uIGNvbXBsZXRlZFxuXHRpZiAobmF2Lm5hdmlnYXRpb24udG8pIHtcblx0XHRuYXYubmF2aWdhdGlvbi50by5zY3JvbGwgPSBzY3JvbGxfc3RhdGUoKTtcblx0fVxuXG5cdGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcy5mb3JFYWNoKChmbikgPT5cblx0XHRmbigvKiogQHR5cGUge2ltcG9ydCgnQHN2ZWx0ZWpzL2tpdCcpLkFmdGVyTmF2aWdhdGV9ICovIChuYXYubmF2aWdhdGlvbikpXG5cdCk7XG5cblx0aWYgKHR5cGUgPT09ICdwb3BzdGF0ZScpIHtcblx0XHRyZXN0b3JlX3NuYXBzaG90KGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleCk7XG5cdH1cblxuXHRzdG9yZXMubmF2aWdhdGluZy5zZXQoKG5hdmlnYXRpbmcuY3VycmVudCA9IG51bGwpKTtcblxuXHR1cGRhdGluZyA9IGZhbHNlO1xufVxuXG4vKipcbiAqIERvZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGlmIGl0IHdvdWxkbid0IHJlc3VsdCBpbiBhbiBlbmRsZXNzIGxvb3AgaW4gdGhlIFNQQSBjYXNlXG4gKiBAcGFyYW0ge1VSTH0gdXJsXG4gKiBAcGFyYW0ge3sgaWQ6IHN0cmluZyB8IG51bGwgfX0gcm91dGVcbiAqIEBwYXJhbSB7QXBwLkVycm9yfSBlcnJvclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1xuICogQHBhcmFtIHtib29sZWFufSBbcmVwbGFjZV9zdGF0ZV1cbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydCgnLi90eXBlcy5qcycpLk5hdmlnYXRpb25GaW5pc2hlZCB8IHVuZGVmaW5lZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNlcnZlcl9mYWxsYmFjayh1cmwsIHJvdXRlLCBlcnJvciwgc3RhdHVzLCByZXBsYWNlX3N0YXRlKSB7XG5cdGlmICh1cmwub3JpZ2luID09PSBvcmlnaW4gJiYgdXJsLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZSAmJiAhaHlkcmF0ZWQpIHtcblx0XHQvLyBXZSB3b3VsZCByZWxvYWQgdGhlIHNhbWUgcGFnZSB3ZSdyZSBjdXJyZW50bHkgb24sIHdoaWNoIGlzbid0IGh5ZHJhdGVkLFxuXHRcdC8vIHdoaWNoIG1lYW5zIG5vIFNTUiwgd2hpY2ggbWVhbnMgd2Ugd291bGQgZW5kIHVwIGluIGFuIGVuZGxlc3MgbG9vcFxuXHRcdHJldHVybiBhd2FpdCBsb2FkX3Jvb3RfZXJyb3JfcGFnZSh7XG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRlcnJvcixcblx0XHRcdHVybCxcblx0XHRcdHJvdXRlXG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoREVWICYmIHN0YXR1cyAhPT0gNDA0KSB7XG5cdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBsb2FkaW5nIHRoZSBwYWdlLiBUaGlzIHdpbGwgY2F1c2UgYSBmdWxsIHBhZ2UgcmVsb2FkLiAoVGhpcyBtZXNzYWdlIHdpbGwgb25seSBhcHBlYXIgZHVyaW5nIGRldmVsb3BtZW50LiknXG5cdFx0KTtcblxuXHRcdGRlYnVnZ2VyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdH1cblxuXHRyZXR1cm4gYXdhaXQgbmF0aXZlX25hdmlnYXRpb24odXJsLCByZXBsYWNlX3N0YXRlKTtcbn1cblxuaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuXHRpbXBvcnQubWV0YS5ob3Qub24oJ3ZpdGU6YmVmb3JlVXBkYXRlJywgKCkgPT4ge1xuXHRcdGlmIChjdXJyZW50LmVycm9yKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0fSk7XG59XG5cbi8qKiBAdHlwZWRlZiB7KHR5cGVvZiBQUkVMT0FEX1BSSU9SSVRJRVMpWydob3ZlciddIHwgKHR5cGVvZiBQUkVMT0FEX1BSSU9SSVRJRVMpWyd0YXAnXX0gUHJlbG9hZERhdGFQcmlvcml0eSAqL1xuXG4vKipcbiAqIFRoZSBhbmNob3IgZWxlbWVudCB3aG9zZSBocmVmIGlzIGJlaW5nIHByZWxvYWRlZC4gSXQgaXMgcmVzZXQgYWZ0ZXIgbmF2aWdhdGlvblxuICogb3IgY2hhbmdlcyB3aGVuIGEgZGlmZmVyZW50IGFuY2hvciBlbGVtZW50IGlzIGJlaW5nIHByZWxvYWRlZC5cbiAqIEB0eXBlIHt7IGVsZW1lbnQ6IEVsZW1lbnQgfCBTVkdBRWxlbWVudCB8IHVuZGVmaW5lZDsgaHJlZjogc3RyaW5nIHwgU1ZHQW5pbWF0ZWRTdHJpbmcgfCB1bmRlZmluZWQgfX1cbiAqL1xubGV0IGN1cnJlbnRfYSA9IHsgZWxlbWVudDogdW5kZWZpbmVkLCBocmVmOiB1bmRlZmluZWQgfTtcblxuZnVuY3Rpb24gc2V0dXBfcHJlbG9hZCgpIHtcblx0LyoqIEB0eXBlIHtOb2RlSlMuVGltZW91dH0gKi9cblx0bGV0IG1vdXNlbW92ZV90aW1lb3V0O1xuXHQvKiogQHR5cGUge1ByZWxvYWREYXRhUHJpb3JpdHl9ICovXG5cdGxldCBjdXJyZW50X3ByaW9yaXR5O1xuXG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcblx0XHRjb25zdCB0YXJnZXQgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChldmVudC50YXJnZXQpO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KG1vdXNlbW92ZV90aW1lb3V0KTtcblx0XHRtb3VzZW1vdmVfdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dm9pZCBwcmVsb2FkKHRhcmdldCwgUFJFTE9BRF9QUklPUklUSUVTLmhvdmVyKTtcblx0XHR9LCAyMCk7XG5cdH0pO1xuXG5cdC8qKiBAcGFyYW0ge0V2ZW50fSBldmVudCAqL1xuXHRmdW5jdGlvbiB0YXAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXHRcdHZvaWQgcHJlbG9hZCgvKiogQHR5cGUge0VsZW1lbnR9ICovIChldmVudC5jb21wb3NlZFBhdGgoKVswXSksIFBSRUxPQURfUFJJT1JJVElFUy50YXApO1xuXHR9XG5cblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRhcCk7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGFwLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cblx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG5cdFx0KGVudHJpZXMpID0+IHtcblx0XHRcdGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuXHRcdFx0XHRpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcblx0XHRcdFx0XHR2b2lkIF9wcmVsb2FkX2NvZGUobmV3IFVSTCgvKiogQHR5cGUge0hUTUxBbmNob3JFbGVtZW50fSAqLyAoZW50cnkudGFyZ2V0KS5ocmVmKSk7XG5cdFx0XHRcdFx0b2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdHsgdGhyZXNob2xkOiAwIH1cblx0KTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7UHJlbG9hZERhdGFQcmlvcml0eX0gcHJpb3JpdHlcblx0ICovXG5cdGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoZWxlbWVudCwgcHJpb3JpdHkpIHtcblx0XHRjb25zdCBhID0gZmluZF9hbmNob3IoZWxlbWVudCwgY29udGFpbmVyKTtcblxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gcHJlbG9hZCBkYXRhIGFnYWluIGlmIHRoZSB1c2VyIGhhcyBhbHJlYWR5IGhvdmVyZWQvdGFwcGVkXG5cdFx0Y29uc3QgaW50ZXJhY3RlZCA9XG5cdFx0XHRhID09PSBjdXJyZW50X2EuZWxlbWVudCAmJiBhPy5ocmVmID09PSBjdXJyZW50X2EuaHJlZiAmJiBwcmlvcml0eSA+PSBjdXJyZW50X3ByaW9yaXR5O1xuXHRcdGlmICghYSB8fCBpbnRlcmFjdGVkKSByZXR1cm47XG5cblx0XHRjb25zdCB7IHVybCwgZXh0ZXJuYWwsIGRvd25sb2FkIH0gPSBnZXRfbGlua19pbmZvKGEsIGJhc2UsIGFwcC5oYXNoKTtcblx0XHRpZiAoZXh0ZXJuYWwgfHwgZG93bmxvYWQpIHJldHVybjtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSBnZXRfcm91dGVyX29wdGlvbnMoYSk7XG5cblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIHByZWxvYWQgZGF0YSBmb3IgYSBwYWdlIHdlJ3JlIGFscmVhZHkgb25cblx0XHRjb25zdCBzYW1lX3VybCA9IHVybCAmJiBnZXRfcGFnZV9rZXkoY3VycmVudC51cmwpID09PSBnZXRfcGFnZV9rZXkodXJsKTtcblx0XHRpZiAob3B0aW9ucy5yZWxvYWQgfHwgc2FtZV91cmwpIHJldHVybjtcblxuXHRcdGlmIChwcmlvcml0eSA8PSBvcHRpb25zLnByZWxvYWRfZGF0YSkge1xuXHRcdFx0Y3VycmVudF9hID0geyBlbGVtZW50OiBhLCBocmVmOiBhLmhyZWYgfTtcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gcHJlbG9hZCBkYXRhIGFnYWluIG9uIHRhcCBpZiB3ZSd2ZSBhbHJlYWR5IHByZWxvYWRlZCBpdCBvbiBob3ZlclxuXHRcdFx0Y3VycmVudF9wcmlvcml0eSA9IFBSRUxPQURfUFJJT1JJVElFUy50YXA7XG5cblx0XHRcdGNvbnN0IGludGVudCA9IGF3YWl0IGdldF9uYXZpZ2F0aW9uX2ludGVudCh1cmwsIGZhbHNlKTtcblx0XHRcdGlmICghaW50ZW50KSByZXR1cm47XG5cblx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0dm9pZCBfcHJlbG9hZF9kYXRhKGludGVudCkudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC50eXBlID09PSAnbG9hZGVkJyAmJiByZXN1bHQuc3RhdGUuZXJyb3IpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdFx0YFByZWxvYWRpbmcgZGF0YSBmb3IgJHtpbnRlbnQudXJsLnBhdGhuYW1lfSBmYWlsZWQgd2l0aCB0aGUgZm9sbG93aW5nIGVycm9yOiAke3Jlc3VsdC5zdGF0ZS5lcnJvci5tZXNzYWdlfVxcbmAgK1xuXHRcdFx0XHRcdFx0XHRcdCdJZiB0aGlzIGVycm9yIGlzIHRyYW5zaWVudCwgeW91IGNhbiBpZ25vcmUgaXQuIE90aGVyd2lzZSwgY29uc2lkZXIgZGlzYWJsaW5nIHByZWxvYWRpbmcgZm9yIHRoaXMgcm91dGUuICcgK1xuXHRcdFx0XHRcdFx0XHRcdCdUaGlzIHJvdXRlIHdhcyBwcmVsb2FkZWQgZHVlIHRvIGEgZGF0YS1zdmVsdGVraXQtcHJlbG9hZC1kYXRhIGF0dHJpYnV0ZS4gJyArXG5cdFx0XHRcdFx0XHRcdFx0J1NlZSBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9raXQvbGluay1vcHRpb25zIGZvciBtb3JlIGluZm8nXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2b2lkIF9wcmVsb2FkX2RhdGEoaW50ZW50KTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHByaW9yaXR5IDw9IG9wdGlvbnMucHJlbG9hZF9jb2RlKSB7XG5cdFx0XHRjdXJyZW50X2EgPSB7IGVsZW1lbnQ6IGEsIGhyZWY6IGEuaHJlZiB9O1xuXHRcdFx0Y3VycmVudF9wcmlvcml0eSA9IHByaW9yaXR5O1xuXHRcdFx0dm9pZCBfcHJlbG9hZF9jb2RlKC8qKiBAdHlwZSB7VVJMfSAqLyAodXJsKSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gYWZ0ZXJfbmF2aWdhdGUoKSB7XG5cdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuXG5cdFx0Zm9yIChjb25zdCBhIG9mIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdhJykpIHtcblx0XHRcdGNvbnN0IHsgdXJsLCBleHRlcm5hbCwgZG93bmxvYWQgfSA9IGdldF9saW5rX2luZm8oYSwgYmFzZSwgYXBwLmhhc2gpO1xuXHRcdFx0aWYgKGV4dGVybmFsIHx8IGRvd25sb2FkKSBjb250aW51ZTtcblxuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGdldF9yb3V0ZXJfb3B0aW9ucyhhKTtcblx0XHRcdGlmIChvcHRpb25zLnJlbG9hZCkgY29udGludWU7XG5cblx0XHRcdGlmIChvcHRpb25zLnByZWxvYWRfY29kZSA9PT0gUFJFTE9BRF9QUklPUklUSUVTLnZpZXdwb3J0KSB7XG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLnByZWxvYWRfY29kZSA9PT0gUFJFTE9BRF9QUklPUklUSUVTLmVhZ2VyKSB7XG5cdFx0XHRcdHZvaWQgX3ByZWxvYWRfY29kZSgvKiogQHR5cGUge1VSTH0gKi8gKHVybCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcy5hZGQoYWZ0ZXJfbmF2aWdhdGUpO1xuXHRhZnRlcl9uYXZpZ2F0ZSgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7dW5rbm93bn0gZXJyb3JcbiAqIEBwYXJhbSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvbkV2ZW50fSBldmVudFxuICogQHJldHVybnMge2ltcG9ydCgndHlwZXMnKS5NYXliZVByb21pc2U8QXBwLkVycm9yPn1cbiAqL1xuZnVuY3Rpb24gaGFuZGxlX2Vycm9yKGVycm9yLCBldmVudCkge1xuXHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyb3IuYm9keTtcblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHRlcnJvcmVkID0gdHJ1ZTtcblx0XHRjb25zb2xlLndhcm4oJ1RoZSBuZXh0IEhNUiB1cGRhdGUgd2lsbCBjYXVzZSB0aGUgcGFnZSB0byByZWxvYWQnKTtcblx0fVxuXG5cdGNvbnN0IHN0YXR1cyA9IGdldF9zdGF0dXMoZXJyb3IpO1xuXHRjb25zdCBtZXNzYWdlID0gZ2V0X21lc3NhZ2UoZXJyb3IpO1xuXG5cdHJldHVybiAoXG5cdFx0YXBwLmhvb2tzLmhhbmRsZUVycm9yKHsgZXJyb3IsIGV2ZW50LCBzdGF0dXMsIG1lc3NhZ2UgfSkgPz8gLyoqIEB0eXBlIHthbnl9ICovICh7IG1lc3NhZ2UgfSlcblx0KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge0Z1bmN0aW9ufSBUXG4gKiBAcGFyYW0ge1NldDxUPn0gY2FsbGJhY2tzXG4gKiBAcGFyYW0ge1R9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGFkZF9uYXZpZ2F0aW9uX2NhbGxiYWNrKGNhbGxiYWNrcywgY2FsbGJhY2spIHtcblx0b25Nb3VudCgoKSA9PiB7XG5cdFx0Y2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG5cblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0Y2FsbGJhY2tzLmRlbGV0ZShjYWxsYmFjayk7XG5cdFx0fTtcblx0fSk7XG59XG5cbi8qKlxuICogQSBsaWZlY3ljbGUgZnVuY3Rpb24gdGhhdCBydW5zIHRoZSBzdXBwbGllZCBgY2FsbGJhY2tgIHdoZW4gdGhlIGN1cnJlbnQgY29tcG9uZW50IG1vdW50cywgYW5kIGFsc28gd2hlbmV2ZXIgd2UgbmF2aWdhdGUgdG8gYSBVUkwuXG4gKlxuICogYGFmdGVyTmF2aWdhdGVgIG11c3QgYmUgY2FsbGVkIGR1cmluZyBhIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gSXQgcmVtYWlucyBhY3RpdmUgYXMgbG9uZyBhcyB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gKiBAcGFyYW0geyhuYXZpZ2F0aW9uOiBpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5BZnRlck5hdmlnYXRlKSA9PiB2b2lkfSBjYWxsYmFja1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZnRlck5hdmlnYXRlKGNhbGxiYWNrKSB7XG5cdGFkZF9uYXZpZ2F0aW9uX2NhbGxiYWNrKGFmdGVyX25hdmlnYXRlX2NhbGxiYWNrcywgY2FsbGJhY2spO1xufVxuXG4vKipcbiAqIEEgbmF2aWdhdGlvbiBpbnRlcmNlcHRvciB0aGF0IHRyaWdnZXJzIGJlZm9yZSB3ZSBuYXZpZ2F0ZSB0byBhIFVSTCwgd2hldGhlciBieSBjbGlja2luZyBhIGxpbmssIGNhbGxpbmcgYGdvdG8oLi4uKWAsIG9yIHVzaW5nIHRoZSBicm93c2VyIGJhY2svZm9yd2FyZCBjb250cm9scy5cbiAqXG4gKiBDYWxsaW5nIGBjYW5jZWwoKWAgd2lsbCBwcmV2ZW50IHRoZSBuYXZpZ2F0aW9uIGZyb20gY29tcGxldGluZy4gSWYgYG5hdmlnYXRpb24udHlwZSA9PT0gJ2xlYXZlJ2Ag4oCUIG1lYW5pbmcgdGhlIHVzZXIgaXMgbmF2aWdhdGluZyBhd2F5IGZyb20gdGhlIGFwcCAob3IgY2xvc2luZyB0aGUgdGFiKSDigJQgY2FsbGluZyBgY2FuY2VsYCB3aWxsIHRyaWdnZXIgdGhlIG5hdGl2ZSBicm93c2VyIHVubG9hZCBjb25maXJtYXRpb24gZGlhbG9nLiBJbiB0aGlzIGNhc2UsIHRoZSBuYXZpZ2F0aW9uIG1heSBvciBtYXkgbm90IGJlIGNhbmNlbGxlZCBkZXBlbmRpbmcgb24gdGhlIHVzZXIncyByZXNwb25zZS5cbiAqXG4gKiBXaGVuIGEgbmF2aWdhdGlvbiBpc24ndCB0byBhIFN2ZWx0ZUtpdC1vd25lZCByb3V0ZSAoYW5kIHRoZXJlZm9yZSBjb250cm9sbGVkIGJ5IFN2ZWx0ZUtpdCdzIGNsaWVudC1zaWRlIHJvdXRlciksIGBuYXZpZ2F0aW9uLnRvLnJvdXRlLmlkYCB3aWxsIGJlIGBudWxsYC5cbiAqXG4gKiBJZiB0aGUgbmF2aWdhdGlvbiB3aWxsIChpZiBub3QgY2FuY2VsbGVkKSBjYXVzZSB0aGUgZG9jdW1lbnQgdG8gdW5sb2FkIOKAlCBpbiBvdGhlciB3b3JkcyBgJ2xlYXZlJ2AgbmF2aWdhdGlvbnMgYW5kIGAnbGluaydgIG5hdmlnYXRpb25zIHdoZXJlIGBuYXZpZ2F0aW9uLnRvLnJvdXRlID09PSBudWxsYCDigJQgYG5hdmlnYXRpb24ud2lsbFVubG9hZGAgaXMgYHRydWVgLlxuICpcbiAqIGBiZWZvcmVOYXZpZ2F0ZWAgbXVzdCBiZSBjYWxsZWQgZHVyaW5nIGEgY29tcG9uZW50IGluaXRpYWxpemF0aW9uLiBJdCByZW1haW5zIGFjdGl2ZSBhcyBsb25nIGFzIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAqIEBwYXJhbSB7KG5hdmlnYXRpb246IGltcG9ydCgnQHN2ZWx0ZWpzL2tpdCcpLkJlZm9yZU5hdmlnYXRlKSA9PiB2b2lkfSBjYWxsYmFja1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVOYXZpZ2F0ZShjYWxsYmFjaykge1xuXHRhZGRfbmF2aWdhdGlvbl9jYWxsYmFjayhiZWZvcmVfbmF2aWdhdGVfY2FsbGJhY2tzLCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogQSBsaWZlY3ljbGUgZnVuY3Rpb24gdGhhdCBydW5zIHRoZSBzdXBwbGllZCBgY2FsbGJhY2tgIGltbWVkaWF0ZWx5IGJlZm9yZSB3ZSBuYXZpZ2F0ZSB0byBhIG5ldyBVUkwgZXhjZXB0IGR1cmluZyBmdWxsLXBhZ2UgbmF2aWdhdGlvbnMuXG4gKlxuICogSWYgeW91IHJldHVybiBhIGBQcm9taXNlYCwgU3ZlbHRlS2l0IHdpbGwgd2FpdCBmb3IgaXQgdG8gcmVzb2x2ZSBiZWZvcmUgY29tcGxldGluZyB0aGUgbmF2aWdhdGlvbi4gVGhpcyBhbGxvd3MgeW91IHRvIOKAlCBmb3IgZXhhbXBsZSDigJQgdXNlIGBkb2N1bWVudC5zdGFydFZpZXdUcmFuc2l0aW9uYC4gQXZvaWQgcHJvbWlzZXMgdGhhdCBhcmUgc2xvdyB0byByZXNvbHZlLCBzaW5jZSBuYXZpZ2F0aW9uIHdpbGwgYXBwZWFyIHN0YWxsZWQgdG8gdGhlIHVzZXIuXG4gKlxuICogSWYgYSBmdW5jdGlvbiAob3IgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB0byBhIGZ1bmN0aW9uKSBpcyByZXR1cm5lZCBmcm9tIHRoZSBjYWxsYmFjaywgaXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgRE9NIGhhcyB1cGRhdGVkLlxuICpcbiAqIGBvbk5hdmlnYXRlYCBtdXN0IGJlIGNhbGxlZCBkdXJpbmcgYSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24uIEl0IHJlbWFpbnMgYWN0aXZlIGFzIGxvbmcgYXMgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICogQHBhcmFtIHsobmF2aWdhdGlvbjogaW1wb3J0KCdAc3ZlbHRlanMva2l0JykuT25OYXZpZ2F0ZSkgPT4gaW1wb3J0KCd0eXBlcycpLk1heWJlUHJvbWlzZTwoKCkgPT4gdm9pZCkgfCB2b2lkPn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZShjYWxsYmFjaykge1xuXHRhZGRfbmF2aWdhdGlvbl9jYWxsYmFjayhvbl9uYXZpZ2F0ZV9jYWxsYmFja3MsIGNhbGxiYWNrKTtcbn1cblxuLyoqXG4gKiBJZiBjYWxsZWQgd2hlbiB0aGUgcGFnZSBpcyBiZWluZyB1cGRhdGVkIGZvbGxvd2luZyBhIG5hdmlnYXRpb24gKGluIGBvbk1vdW50YCBvciBgYWZ0ZXJOYXZpZ2F0ZWAgb3IgYW4gYWN0aW9uLCBmb3IgZXhhbXBsZSksIHRoaXMgZGlzYWJsZXMgU3ZlbHRlS2l0J3MgYnVpbHQtaW4gc2Nyb2xsIGhhbmRsaW5nLlxuICogVGhpcyBpcyBnZW5lcmFsbHkgZGlzY291cmFnZWQsIHNpbmNlIGl0IGJyZWFrcyB1c2VyIGV4cGVjdGF0aW9ucy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVNjcm9sbEhhbmRsaW5nKCkge1xuXHRpZiAoIUJST1dTRVIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIGRpc2FibGVTY3JvbGxIYW5kbGluZygpIG9uIHRoZSBzZXJ2ZXInKTtcblx0fVxuXG5cdGlmIChERVYgJiYgc3RhcnRlZCAmJiAhdXBkYXRpbmcpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBvbmx5IGRpc2FibGUgc2Nyb2xsIGhhbmRsaW5nIGR1cmluZyBuYXZpZ2F0aW9uJyk7XG5cdH1cblxuXHRpZiAodXBkYXRpbmcgfHwgIXN0YXJ0ZWQpIHtcblx0XHRhdXRvc2Nyb2xsID0gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIG5hdmlnYXRlIHByb2dyYW1tYXRpY2FsbHkgdG8gYSBnaXZlbiByb3V0ZSwgd2l0aCBvcHRpb25zIHN1Y2ggYXMga2VlcGluZyB0aGUgY3VycmVudCBlbGVtZW50IGZvY3VzZWQuXG4gKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gU3ZlbHRlS2l0IG5hdmlnYXRlcyAob3IgZmFpbHMgdG8gbmF2aWdhdGUsIGluIHdoaWNoIGNhc2UgdGhlIHByb21pc2UgcmVqZWN0cykgdG8gdGhlIHNwZWNpZmllZCBgdXJsYC5cbiAqXG4gKiBGb3IgZXh0ZXJuYWwgVVJMcywgdXNlIGB3aW5kb3cubG9jYXRpb24gPSB1cmxgIGluc3RlYWQgb2YgY2FsbGluZyBgZ290byh1cmwpYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IFVSTH0gdXJsIFdoZXJlIHRvIG5hdmlnYXRlIHRvLiBOb3RlIHRoYXQgaWYgeW91J3ZlIHNldCBbYGNvbmZpZy5raXQucGF0aHMuYmFzZWBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL2tpdC9jb25maWd1cmF0aW9uI3BhdGhzKSBhbmQgdGhlIFVSTCBpcyByb290LXJlbGF0aXZlLCB5b3UgbmVlZCB0byBwcmVwZW5kIHRoZSBiYXNlIHBhdGggaWYgeW91IHdhbnQgdG8gbmF2aWdhdGUgd2l0aGluIHRoZSBhcHAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIE9wdGlvbnMgcmVsYXRlZCB0byB0aGUgbmF2aWdhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5yZXBsYWNlU3RhdGVdIElmIGB0cnVlYCwgd2lsbCByZXBsYWNlIHRoZSBjdXJyZW50IGBoaXN0b3J5YCBlbnRyeSByYXRoZXIgdGhhbiBjcmVhdGluZyBhIG5ldyBvbmUgd2l0aCBgcHVzaFN0YXRlYFxuICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ub1Njcm9sbF0gSWYgYHRydWVgLCB0aGUgYnJvd3NlciB3aWxsIG1haW50YWluIGl0cyBzY3JvbGwgcG9zaXRpb24gcmF0aGVyIHRoYW4gc2Nyb2xsaW5nIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgYWZ0ZXIgbmF2aWdhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5rZWVwRm9jdXNdIElmIGB0cnVlYCwgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgd2lsbCByZXRhaW4gZm9jdXMgYWZ0ZXIgbmF2aWdhdGlvbi4gT3RoZXJ3aXNlLCBmb2N1cyB3aWxsIGJlIHJlc2V0IHRvIHRoZSBib2R5XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmludmFsaWRhdGVBbGxdIElmIGB0cnVlYCwgYWxsIGBsb2FkYCBmdW5jdGlvbnMgb2YgdGhlIHBhZ2Ugd2lsbCBiZSByZXJ1bi4gU2VlIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL2tpdC9sb2FkI3JlcnVubmluZy1sb2FkLWZ1bmN0aW9ucyBmb3IgbW9yZSBpbmZvIG9uIGludmFsaWRhdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nIHwgVVJMIHwgKCh1cmw6IFVSTCkgPT4gYm9vbGVhbik+fSBbb3B0cy5pbnZhbGlkYXRlXSBDYXVzZXMgYW55IGxvYWQgZnVuY3Rpb25zIHRvIHJlLXJ1biBpZiB0aGV5IGRlcGVuZCBvbiBvbmUgb2YgdGhlIHVybHNcbiAqIEBwYXJhbSB7QXBwLlBhZ2VTdGF0ZX0gW29wdHMuc3RhdGVdIEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IHdpbGwgYmUgYXZhaWxhYmxlIGFzIGBwYWdlLnN0YXRlYFxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnb3RvKHVybCwgb3B0cyA9IHt9KSB7XG5cdGlmICghQlJPV1NFUikge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgZ290byguLi4pIG9uIHRoZSBzZXJ2ZXInKTtcblx0fVxuXG5cdHVybCA9IG5ldyBVUkwocmVzb2x2ZV91cmwodXJsKSk7XG5cblx0aWYgKHVybC5vcmlnaW4gIT09IG9yaWdpbikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcblx0XHRcdG5ldyBFcnJvcihcblx0XHRcdFx0REVWXG5cdFx0XHRcdFx0PyBgQ2Fubm90IHVzZSBcXGBnb3RvXFxgIHdpdGggYW4gZXh0ZXJuYWwgVVJMLiBVc2UgXFxgd2luZG93LmxvY2F0aW9uID0gXCIke3VybH1cIlxcYCBpbnN0ZWFkYFxuXHRcdFx0XHRcdDogJ2dvdG86IGludmFsaWQgVVJMJ1xuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gX2dvdG8odXJsLCBvcHRzLCAwKTtcbn1cblxuLyoqXG4gKiBDYXVzZXMgYW55IGBsb2FkYCBmdW5jdGlvbnMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIHBhZ2UgdG8gcmUtcnVuIGlmIHRoZXkgZGVwZW5kIG9uIHRoZSBgdXJsYCBpbiBxdWVzdGlvbiwgdmlhIGBmZXRjaGAgb3IgYGRlcGVuZHNgLiBSZXR1cm5zIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcGFnZSBpcyBzdWJzZXF1ZW50bHkgdXBkYXRlZC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgZ2l2ZW4gYXMgYSBgc3RyaW5nYCBvciBgVVJMYCwgaXQgbXVzdCByZXNvbHZlIHRvIHRoZSBzYW1lIFVSTCB0aGF0IHdhcyBwYXNzZWQgdG8gYGZldGNoYCBvciBgZGVwZW5kc2AgKGluY2x1ZGluZyBxdWVyeSBwYXJhbWV0ZXJzKS5cbiAqIFRvIGNyZWF0ZSBhIGN1c3RvbSBpZGVudGlmaWVyLCB1c2UgYSBzdHJpbmcgYmVnaW5uaW5nIHdpdGggYFthLXpdKzpgIChlLmcuIGBjdXN0b206c3RhdGVgKSDigJQgdGhpcyBpcyBhIHZhbGlkIFVSTC5cbiAqXG4gKiBUaGUgYGZ1bmN0aW9uYCBhcmd1bWVudCBjYW4gYmUgdXNlZCBkZWZpbmUgYSBjdXN0b20gcHJlZGljYXRlLiBJdCByZWNlaXZlcyB0aGUgZnVsbCBgVVJMYCBhbmQgY2F1c2VzIGBsb2FkYCB0byByZXJ1biBpZiBgdHJ1ZWAgaXMgcmV0dXJuZWQuXG4gKiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgeW91IHdhbnQgdG8gaW52YWxpZGF0ZSBiYXNlZCBvbiBhIHBhdHRlcm4gaW5zdGVhZCBvZiBhIGV4YWN0IG1hdGNoLlxuICpcbiAqIGBgYHRzXG4gKiAvLyBFeGFtcGxlOiBNYXRjaCAnL3BhdGgnIHJlZ2FyZGxlc3Mgb2YgdGhlIHF1ZXJ5IHBhcmFtZXRlcnNcbiAqIGltcG9ydCB7IGludmFsaWRhdGUgfSBmcm9tICckYXBwL25hdmlnYXRpb24nO1xuICpcbiAqIGludmFsaWRhdGUoKHVybCkgPT4gdXJsLnBhdGhuYW1lID09PSAnL3BhdGgnKTtcbiAqIGBgYFxuICogQHBhcmFtIHtzdHJpbmcgfCBVUkwgfCAoKHVybDogVVJMKSA9PiBib29sZWFuKX0gcmVzb3VyY2UgVGhlIGludmFsaWRhdGVkIFVSTFxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkYXRlKHJlc291cmNlKSB7XG5cdGlmICghQlJPV1NFUikge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgaW52YWxpZGF0ZSguLi4pIG9uIHRoZSBzZXJ2ZXInKTtcblx0fVxuXG5cdHB1c2hfaW52YWxpZGF0ZWQocmVzb3VyY2UpO1xuXG5cdHJldHVybiBfaW52YWxpZGF0ZSgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nIHwgVVJMIHwgKCh1cmw6IFVSTCkgPT4gYm9vbGVhbil9IHJlc291cmNlIFRoZSBpbnZhbGlkYXRlZCBVUkxcbiAqL1xuZnVuY3Rpb24gcHVzaF9pbnZhbGlkYXRlZChyZXNvdXJjZSkge1xuXHRpZiAodHlwZW9mIHJlc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aW52YWxpZGF0ZWQucHVzaChyZXNvdXJjZSk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgeyBocmVmIH0gPSBuZXcgVVJMKHJlc291cmNlLCBsb2NhdGlvbi5ocmVmKTtcblx0XHRpbnZhbGlkYXRlZC5wdXNoKCh1cmwpID0+IHVybC5ocmVmID09PSBocmVmKTtcblx0fVxufVxuXG4vKipcbiAqIENhdXNlcyBhbGwgYGxvYWRgIGFuZCBgcXVlcnlgIGZ1bmN0aW9ucyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnRseSBhY3RpdmUgcGFnZSB0byByZS1ydW4uIFJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwYWdlIGlzIHN1YnNlcXVlbnRseSB1cGRhdGVkLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkYXRlQWxsKCkge1xuXHRpZiAoIUJST1dTRVIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIGludmFsaWRhdGVBbGwoKSBvbiB0aGUgc2VydmVyJyk7XG5cdH1cblxuXHRmb3JjZV9pbnZhbGlkYXRpb24gPSB0cnVlO1xuXHRyZXR1cm4gX2ludmFsaWRhdGUoKTtcbn1cblxuLyoqXG4gKiBDYXVzZXMgYWxsIGN1cnJlbnRseSBhY3RpdmUgcmVtb3RlIGZ1bmN0aW9ucyB0byByZWZyZXNoLCBhbmQgYWxsIGBsb2FkYCBmdW5jdGlvbnMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIHBhZ2UgdG8gcmUtcnVuICh1bmxlc3MgZGlzYWJsZWQgdmlhIHRoZSBvcHRpb24gYXJndW1lbnQpLlxuICogUmV0dXJucyBhIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHBhZ2UgaXMgc3Vic2VxdWVudGx5IHVwZGF0ZWQuXG4gKiBAcGFyYW0ge3sgaW5jbHVkZUxvYWRGdW5jdGlvbnM/OiBib29sZWFuIH19IFtvcHRpb25zXVxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQWxsKHsgaW5jbHVkZUxvYWRGdW5jdGlvbnMgPSB0cnVlIH0gPSB7fSkge1xuXHRpZiAoIUJST1dTRVIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHJlZnJlc2hBbGwoKSBvbiB0aGUgc2VydmVyJyk7XG5cdH1cblxuXHRmb3JjZV9pbnZhbGlkYXRpb24gPSB0cnVlO1xuXHRyZXR1cm4gX2ludmFsaWRhdGUoaW5jbHVkZUxvYWRGdW5jdGlvbnMsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBQcm9ncmFtbWF0aWNhbGx5IHByZWxvYWRzIHRoZSBnaXZlbiBwYWdlLCB3aGljaCBtZWFuc1xuICogIDEuIGVuc3VyaW5nIHRoYXQgdGhlIGNvZGUgZm9yIHRoZSBwYWdlIGlzIGxvYWRlZCwgYW5kXG4gKiAgMi4gY2FsbGluZyB0aGUgcGFnZSdzIGxvYWQgZnVuY3Rpb24gd2l0aCB0aGUgYXBwcm9wcmlhdGUgb3B0aW9ucy5cbiAqXG4gKiBUaGlzIGlzIHRoZSBzYW1lIGJlaGF2aW91ciB0aGF0IFN2ZWx0ZUtpdCB0cmlnZ2VycyB3aGVuIHRoZSB1c2VyIHRhcHMgb3IgbW91c2VzIG92ZXIgYW4gYDxhPmAgZWxlbWVudCB3aXRoIGBkYXRhLXN2ZWx0ZWtpdC1wcmVsb2FkLWRhdGFgLlxuICogSWYgdGhlIG5leHQgbmF2aWdhdGlvbiBpcyB0byBgaHJlZmAsIHRoZSB2YWx1ZXMgcmV0dXJuZWQgZnJvbSBsb2FkIHdpbGwgYmUgdXNlZCwgbWFraW5nIG5hdmlnYXRpb24gaW5zdGFudGFuZW91cy5cbiAqIFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzdWx0IG9mIHJ1bm5pbmcgdGhlIG5ldyByb3V0ZSdzIGBsb2FkYCBmdW5jdGlvbnMgb25jZSB0aGUgcHJlbG9hZCBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZiBQYWdlIHRvIHByZWxvYWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPHsgdHlwZTogJ2xvYWRlZCc7IHN0YXR1czogbnVtYmVyOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0gfCB7IHR5cGU6ICdyZWRpcmVjdCc7IGxvY2F0aW9uOiBzdHJpbmcgfT59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkRGF0YShocmVmKSB7XG5cdGlmICghQlJPV1NFUikge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgcHJlbG9hZERhdGEoLi4uKSBvbiB0aGUgc2VydmVyJyk7XG5cdH1cblxuXHRjb25zdCB1cmwgPSByZXNvbHZlX3VybChocmVmKTtcblx0Y29uc3QgaW50ZW50ID0gYXdhaXQgZ2V0X25hdmlnYXRpb25faW50ZW50KHVybCwgZmFsc2UpO1xuXG5cdGlmICghaW50ZW50KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0ZWQgdG8gcHJlbG9hZCBhIFVSTCB0aGF0IGRvZXMgbm90IGJlbG9uZyB0byB0aGlzIGFwcDogJHt1cmx9YCk7XG5cdH1cblxuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBfcHJlbG9hZF9kYXRhKGludGVudCk7XG5cdGlmIChyZXN1bHQudHlwZSA9PT0gJ3JlZGlyZWN0Jykge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiByZXN1bHQudHlwZSxcblx0XHRcdGxvY2F0aW9uOiByZXN1bHQubG9jYXRpb25cblx0XHR9O1xuXHR9XG5cblx0Y29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHJlc3VsdC5wcm9wcy5wYWdlID8/IHBhZ2U7XG5cdHJldHVybiB7IHR5cGU6IHJlc3VsdC50eXBlLCBzdGF0dXMsIGRhdGEgfTtcbn1cblxuLyoqXG4gKiBQcm9ncmFtbWF0aWNhbGx5IGltcG9ydHMgdGhlIGNvZGUgZm9yIHJvdXRlcyB0aGF0IGhhdmVuJ3QgeWV0IGJlZW4gZmV0Y2hlZC5cbiAqIFR5cGljYWxseSwgeW91IG1pZ2h0IGNhbGwgdGhpcyB0byBzcGVlZCB1cCBzdWJzZXF1ZW50IG5hdmlnYXRpb24uXG4gKlxuICogWW91IGNhbiBzcGVjaWZ5IHJvdXRlcyBieSBhbnkgbWF0Y2hpbmcgcGF0aG5hbWUgc3VjaCBhcyBgL2Fib3V0YCAodG8gbWF0Y2ggYHNyYy9yb3V0ZXMvYWJvdXQvK3BhZ2Uuc3ZlbHRlYCkgb3IgYC9ibG9nLypgICh0byBtYXRjaCBgc3JjL3JvdXRlcy9ibG9nL1tzbHVnXS8rcGFnZS5zdmVsdGVgKS5cbiAqXG4gKiBVbmxpa2UgYHByZWxvYWREYXRhYCwgdGhpcyB3b24ndCBjYWxsIGBsb2FkYCBmdW5jdGlvbnMuXG4gKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1vZHVsZXMgaGF2ZSBiZWVuIGltcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZVxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkQ29kZShwYXRobmFtZSkge1xuXHRpZiAoIUJST1dTRVIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHByZWxvYWRDb2RlKC4uLikgb24gdGhlIHNlcnZlcicpO1xuXHR9XG5cblx0Ly8gYGN1cnJlbnQudXJsYCBpcyBudWxsIHVudGlsIHRoZSBmaXJzdCBuYXZpZ2F0aW9uL2h5ZHJhdGlvbiBjb21wbGV0ZXMsIHNvIGZhbGwgYmFja1xuXHQvLyB0byBgbG9jYXRpb25gIHRvIHN1cHBvcnQgY2FsbGluZyBgcHJlbG9hZENvZGVgIGR1cmluZyBpbml0aWFsIHBhZ2UgbG9hZCAoIzEzMjk3KVxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGhuYW1lLCBjdXJyZW50LnVybCA/PyBsb2NhdGlvbi5ocmVmKTtcblxuXHRpZiAoREVWKSB7XG5cdFx0aWYgKCFwYXRobmFtZS5zdGFydHNXaXRoKCcvJykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0J2FyZ3VtZW50IHBhc3NlZCB0byBwcmVsb2FkQ29kZSBtdXN0IGJlIGEgcGF0aG5hbWUgKGkuZS4gXCIvYWJvdXRcIiByYXRoZXIgdGhhbiBcImh0dHA6Ly9leGFtcGxlLmNvbS9hYm91dFwiJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIXBhdGhuYW1lLnN0YXJ0c1dpdGgoYmFzZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YHBhdGhuYW1lIHBhc3NlZCB0byBwcmVsb2FkQ29kZSBtdXN0IHN0YXJ0IHdpdGggXFxgcGF0aHMuYmFzZVxcYCAoaS5lLiBcIiR7YmFzZX0ke3BhdGhuYW1lfVwiIHJhdGhlciB0aGFuIFwiJHtwYXRobmFtZX1cIilgXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChfX1NWRUxURUtJVF9DTElFTlRfUk9VVElOR19fKSB7XG5cdFx0XHRjb25zdCByZXJvdXRlZCA9IGF3YWl0IGdldF9yZXJvdXRlZF91cmwodXJsKTtcblx0XHRcdGlmICghcmVyb3V0ZWQgfHwgIXJvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUuZXhlYyhnZXRfdXJsX3BhdGgocmVyb3V0ZWQpKSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGAnJHtwYXRobmFtZX0nIGRpZCBub3QgbWF0Y2ggYW55IHJvdXRlc2ApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfcHJlbG9hZF9jb2RlKHVybCk7XG59XG5cbi8qKlxuICogUHJvZ3JhbW1hdGljYWxseSBjcmVhdGUgYSBuZXcgaGlzdG9yeSBlbnRyeSB3aXRoIHRoZSBnaXZlbiBgcGFnZS5zdGF0ZWAuIFRvIHVzZSB0aGUgY3VycmVudCBVUkwsIHlvdSBjYW4gcGFzcyBgJydgIGFzIHRoZSBmaXJzdCBhcmd1bWVudC4gVXNlZCBmb3IgW3NoYWxsb3cgcm91dGluZ10oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mva2l0L3NoYWxsb3ctcm91dGluZykuXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBVUkx9IHVybFxuICogQHBhcmFtIHtBcHAuUGFnZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdXNoU3RhdGUodXJsLCBzdGF0ZSkge1xuXHRpZiAoIUJST1dTRVIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHB1c2hTdGF0ZSguLi4pIG9uIHRoZSBzZXJ2ZXInKTtcblx0fVxuXG5cdGlmIChERVYpIHtcblx0XHRpZiAoIXN0YXJ0ZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgcHVzaFN0YXRlKC4uLikgYmVmb3JlIHJvdXRlciBpcyBpbml0aWFsaXplZCcpO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQvLyB1c2UgYGRldmFsdWUuc3RyaW5naWZ5YCBhcyBhIGNvbnZlbmllbnQgd2F5IHRvIGVuc3VyZSB3ZSBleGNsdWRlIHZhbHVlcyB0aGF0IGNhbid0IGJlIHByb3Blcmx5IHJlaHlkcmF0ZWQsIHN1Y2ggYXMgY3VzdG9tIGNsYXNzIGluc3RhbmNlc1xuXHRcdFx0ZGV2YWx1ZS5zdHJpbmdpZnkoc3RhdGUpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBzZXJpYWxpemUgc3RhdGUke2Vycm9yLnBhdGh9YCwgeyBjYXVzZTogZXJyb3IgfSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlX3Njcm9sbF9wb3NpdGlvbnMoY3VycmVudF9oaXN0b3J5X2luZGV4KTtcblxuXHRjb25zdCBvcHRzID0ge1xuXHRcdFtISVNUT1JZX0lOREVYXTogKGN1cnJlbnRfaGlzdG9yeV9pbmRleCArPSAxKSxcblx0XHRbTkFWSUdBVElPTl9JTkRFWF06IGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleCxcblx0XHRbUEFHRV9VUkxfS0VZXTogcGFnZS51cmwuaHJlZixcblx0XHRbU1RBVEVTX0tFWV06IHN0YXRlXG5cdH07XG5cblx0aGlzdG9yeS5wdXNoU3RhdGUob3B0cywgJycsIHJlc29sdmVfdXJsKHVybCkpO1xuXHRoYXNfbmF2aWdhdGVkID0gdHJ1ZTtcblxuXHRwYWdlLnN0YXRlID0gc3RhdGU7XG5cdHJvb3QuJHNldCh7XG5cdFx0Ly8gd2UgbmVlZCB0byBhc3NpZ24gYSBuZXcgcGFnZSBvYmplY3Qgc28gdGhhdCBzdWJzY3JpYmVycyBhcmUgY29ycmVjdGx5IG5vdGlmaWVkXG5cdFx0cGFnZTogdW50cmFjaygoKSA9PiBjbG9uZV9wYWdlKHBhZ2UpKVxuXHR9KTtcblxuXHRjbGVhcl9vbndhcmRfaGlzdG9yeShjdXJyZW50X2hpc3RvcnlfaW5kZXgsIGN1cnJlbnRfbmF2aWdhdGlvbl9pbmRleCk7XG59XG5cbi8qKlxuICogUHJvZ3JhbW1hdGljYWxseSByZXBsYWNlIHRoZSBjdXJyZW50IGhpc3RvcnkgZW50cnkgd2l0aCB0aGUgZ2l2ZW4gYHBhZ2Uuc3RhdGVgLiBUbyB1c2UgdGhlIGN1cnJlbnQgVVJMLCB5b3UgY2FuIHBhc3MgYCcnYCBhcyB0aGUgZmlyc3QgYXJndW1lbnQuIFVzZWQgZm9yIFtzaGFsbG93IHJvdXRpbmddKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL2tpdC9zaGFsbG93LXJvdXRpbmcpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgVVJMfSB1cmxcbiAqIEBwYXJhbSB7QXBwLlBhZ2VTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHVybCwgc3RhdGUpIHtcblx0aWYgKCFCUk9XU0VSKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCByZXBsYWNlU3RhdGUoLi4uKSBvbiB0aGUgc2VydmVyJyk7XG5cdH1cblxuXHRpZiAoREVWKSB7XG5cdFx0aWYgKCFzdGFydGVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHJlcGxhY2VTdGF0ZSguLi4pIGJlZm9yZSByb3V0ZXIgaXMgaW5pdGlhbGl6ZWQnKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gdXNlIGBkZXZhbHVlLnN0cmluZ2lmeWAgYXMgYSBjb252ZW5pZW50IHdheSB0byBlbnN1cmUgd2UgZXhjbHVkZSB2YWx1ZXMgdGhhdCBjYW4ndCBiZSBwcm9wZXJseSByZWh5ZHJhdGVkLCBzdWNoIGFzIGN1c3RvbSBjbGFzcyBpbnN0YW5jZXNcblx0XHRcdGRldmFsdWUuc3RyaW5naWZ5KHN0YXRlKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3Qgc2VyaWFsaXplIHN0YXRlJHtlcnJvci5wYXRofWAsIHsgY2F1c2U6IGVycm9yIH0pO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IG9wdHMgPSB7XG5cdFx0W0hJU1RPUllfSU5ERVhdOiBjdXJyZW50X2hpc3RvcnlfaW5kZXgsXG5cdFx0W05BVklHQVRJT05fSU5ERVhdOiBjdXJyZW50X25hdmlnYXRpb25faW5kZXgsXG5cdFx0W1BBR0VfVVJMX0tFWV06IHBhZ2UudXJsLmhyZWYsXG5cdFx0W1NUQVRFU19LRVldOiBzdGF0ZVxuXHR9O1xuXG5cdGhpc3RvcnkucmVwbGFjZVN0YXRlKG9wdHMsICcnLCByZXNvbHZlX3VybCh1cmwpKTtcblxuXHRwYWdlLnN0YXRlID0gc3RhdGU7XG5cdHJvb3QuJHNldCh7XG5cdFx0cGFnZTogdW50cmFjaygoKSA9PiBjbG9uZV9wYWdlKHBhZ2UpKVxuXHR9KTtcbn1cblxuLyoqXG4gKiBUaGlzIGFjdGlvbiB1cGRhdGVzIHRoZSBgZm9ybWAgcHJvcGVydHkgb2YgdGhlIGN1cnJlbnQgcGFnZSB3aXRoIHRoZSBnaXZlbiBkYXRhIGFuZCB1cGRhdGVzIGBwYWdlLnN0YXR1c2AuXG4gKiBJbiBjYXNlIG9mIGFuIGVycm9yLCBpdCByZWRpcmVjdHMgdG8gdGhlIG5lYXJlc3QgZXJyb3IgcGFnZS5cbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWR9IFN1Y2Nlc3NcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWR9IEZhaWx1cmVcbiAqIEBwYXJhbSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuQWN0aW9uUmVzdWx0PFN1Y2Nlc3MsIEZhaWx1cmU+fSByZXN1bHRcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwbHlBY3Rpb24ocmVzdWx0KSB7XG5cdGlmICghQlJPV1NFUikge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgYXBwbHlBY3Rpb24oLi4uKSBvbiB0aGUgc2VydmVyJyk7XG5cdH1cblxuXHRpZiAocmVzdWx0LnR5cGUgPT09ICdlcnJvcicpIHtcblx0XHRhd2FpdCBzZXRfbmVhcmVzdF9lcnJvcl9wYWdlKHJlc3VsdC5lcnJvciwgcmVzdWx0LnN0YXR1cyk7XG5cdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09ICdyZWRpcmVjdCcpIHtcblx0XHRhd2FpdCBfZ290byhyZXN1bHQubG9jYXRpb24sIHsgaW52YWxpZGF0ZUFsbDogdHJ1ZSB9LCAwKTtcblx0fSBlbHNlIHtcblx0XHRwYWdlLmZvcm0gPSByZXN1bHQuZGF0YTtcblx0XHRwYWdlLnN0YXR1cyA9IHJlc3VsdC5zdGF0dXM7XG5cblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIGFueT59ICovXG5cdFx0cm9vdC4kc2V0KHtcblx0XHRcdC8vIHRoaXMgYnJpbmdzIFN2ZWx0ZSdzIHZpZXcgb2YgdGhlIHdvcmxkIGluIGxpbmUgd2l0aCBTdmVsdGVLaXQnc1xuXHRcdFx0Ly8gYWZ0ZXIgdXNlOmVuaGFuY2UgcmVzZXQgdGhlIGZvcm0uLi4uXG5cdFx0XHRmb3JtOiBudWxsLFxuXHRcdFx0cGFnZTogY2xvbmVfcGFnZShwYWdlKVxuXHRcdH0pO1xuXG5cdFx0Ly8gLi4uc28gdGhhdCBzZXR0aW5nIHRoZSBgZm9ybWAgcHJvcCB0YWtlcyBlZmZlY3QgYW5kIGlzbid0IGlnbm9yZWRcblx0XHRhd2FpdCB0aWNrKCk7XG5cdFx0cm9vdC4kc2V0KHsgZm9ybTogcmVzdWx0LmRhdGEgfSk7XG5cblx0XHRpZiAocmVzdWx0LnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0cmVzZXRfZm9jdXMocGFnZS51cmwpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXBwLkVycm9yfSBlcnJvclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0X25lYXJlc3RfZXJyb3JfcGFnZShlcnJvciwgc3RhdHVzID0gNTAwKSB7XG5cdGNvbnN0IHVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cblx0Y29uc3QgeyBicmFuY2gsIHJvdXRlIH0gPSBjdXJyZW50O1xuXHRpZiAoIXJvdXRlKSByZXR1cm47XG5cblx0Y29uc3QgZXJyb3JfbG9hZCA9IGF3YWl0IGxvYWRfbmVhcmVzdF9lcnJvcl9wYWdlKGN1cnJlbnQuYnJhbmNoLmxlbmd0aCwgYnJhbmNoLCByb3V0ZS5lcnJvcnMpO1xuXHRpZiAoZXJyb3JfbG9hZCkge1xuXHRcdGNvbnN0IG5hdmlnYXRpb25fcmVzdWx0ID0gYXdhaXQgZ2V0X25hdmlnYXRpb25fcmVzdWx0X2Zyb21fYnJhbmNoKHtcblx0XHRcdHVybCxcblx0XHRcdHBhcmFtczogY3VycmVudC5wYXJhbXMsXG5cdFx0XHRicmFuY2g6IGJyYW5jaC5zbGljZSgwLCBlcnJvcl9sb2FkLmlkeCkuY29uY2F0KGVycm9yX2xvYWQubm9kZSksXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRlcnJvcixcblx0XHRcdC8vIGRvIG5vdCBzZXQgZXJyb3JzLCB3ZSBoYXZlbid0IGNoYW5nZWQgdGhlIHBhZ2Ugc28gdGhlIHByZXZpb3VzIG9uZXMgYXJlIHN0aWxsIGN1cnJlbnRcblx0XHRcdHJvdXRlXG5cdFx0fSk7XG5cblx0XHRjdXJyZW50ID0geyAuLi5uYXZpZ2F0aW9uX3Jlc3VsdC5zdGF0ZSwgbmF2OiBjdXJyZW50Lm5hdiB9O1xuXG5cdFx0cm9vdC4kc2V0KG5hdmlnYXRpb25fcmVzdWx0LnByb3BzKTtcblx0XHR1cGRhdGUobmF2aWdhdGlvbl9yZXN1bHQucHJvcHMucGFnZSk7XG5cblx0XHR2b2lkIHRpY2soKS50aGVuKCgpID0+IHJlc2V0X2ZvY3VzKGN1cnJlbnQudXJsKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gX3N0YXJ0X3JvdXRlcigpIHtcblx0aGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xuXG5cdC8vIEFkb3B0ZWQgZnJvbSBOdXh0LmpzXG5cdC8vIFJlc2V0IHNjcm9sbFJlc3RvcmF0aW9uIHRvIGF1dG8gd2hlbiBsZWF2aW5nIHBhZ2UsIGFsbG93aW5nIHBhZ2UgcmVsb2FkXG5cdC8vIGFuZCBiYWNrLW5hdmlnYXRpb24gZnJvbSBvdGhlciBwYWdlcyB0byB1c2UgdGhlIGJyb3dzZXIgdG8gcmVzdG9yZSB0aGVcblx0Ly8gc2Nyb2xsaW5nIHBvc2l0aW9uLlxuXHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoZSkgPT4ge1xuXHRcdGxldCBzaG91bGRfYmxvY2sgPSBmYWxzZTtcblxuXHRcdHBlcnNpc3Rfc3RhdGUoKTtcblxuXHRcdGlmICghaXNfbmF2aWdhdGluZykge1xuXHRcdFx0Y29uc3QgbmF2ID0gY3JlYXRlX25hdmlnYXRpb24oY3VycmVudCwgdW5kZWZpbmVkLCBudWxsLCAnbGVhdmUnKTtcblxuXHRcdFx0Ly8gSWYgd2UncmUgbmF2aWdhdGluZywgYmVmb3JlTmF2aWdhdGUgd2FzIGFscmVhZHkgY2FsbGVkLiBJZiB3ZSBlbmQgdXAgaW4gaGVyZSBkdXJpbmcgbmF2aWdhdGlvbixcblx0XHRcdC8vIGl0J3MgZHVlIHRvIGFuIGV4dGVybmFsIG9yIGZ1bGwtcGFnZS1yZWxvYWQgbGluaywgZm9yIHdoaWNoIHdlIGRvbid0IHdhbnQgdG8gY2FsbCB0aGUgaG9vayBhZ2Fpbi5cblx0XHRcdC8qKiBAdHlwZSB7aW1wb3J0KCdAc3ZlbHRlanMva2l0JykuQmVmb3JlTmF2aWdhdGV9ICovXG5cdFx0XHRjb25zdCBuYXZpZ2F0aW9uID0ge1xuXHRcdFx0XHQuLi5uYXYubmF2aWdhdGlvbixcblx0XHRcdFx0Y2FuY2VsOiAoKSA9PiB7XG5cdFx0XHRcdFx0c2hvdWxkX2Jsb2NrID0gdHJ1ZTtcblx0XHRcdFx0XHRuYXYucmVqZWN0KG5ldyBFcnJvcignbmF2aWdhdGlvbiBjYW5jZWxsZWQnKSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGJlZm9yZV9uYXZpZ2F0ZV9jYWxsYmFja3MuZm9yRWFjaCgoZm4pID0+IGZuKG5hdmlnYXRpb24pKTtcblx0XHR9XG5cblx0XHRpZiAoc2hvdWxkX2Jsb2NrKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnJldHVyblZhbHVlID0gJyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnYXV0byc7XG5cdFx0fVxuXHR9KTtcblxuXHRhZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xuXHRcdGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG5cdFx0XHRwZXJzaXN0X3N0YXRlKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBAdHMtZXhwZWN0LWVycm9yIHRoaXMgaXNuJ3Qgc3VwcG9ydGVkIGV2ZXJ5d2hlcmUgeWV0XG5cdGlmICghbmF2aWdhdG9yLmNvbm5lY3Rpb24/LnNhdmVEYXRhKSB7XG5cdFx0c2V0dXBfcHJlbG9hZCgpO1xuXHR9XG5cblx0LyoqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgKi9cblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XG5cdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzXG5cdFx0Ly8gTUlUIGxpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3Zpc2lvbm1lZGlhL3BhZ2UuanMjbGljZW5zZVxuXHRcdGlmIChldmVudC5idXR0b24gfHwgZXZlbnQud2hpY2ggIT09IDEpIHJldHVybjtcblx0XHRpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSkgcmV0dXJuO1xuXHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cblx0XHRjb25zdCBhID0gZmluZF9hbmNob3IoLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZXZlbnQuY29tcG9zZWRQYXRoKClbMF0pLCBjb250YWluZXIpO1xuXHRcdGlmICghYSkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgeyB1cmwsIGV4dGVybmFsLCB0YXJnZXQsIGRvd25sb2FkIH0gPSBnZXRfbGlua19pbmZvKGEsIGJhc2UsIGFwcC5oYXNoKTtcblx0XHRpZiAoIXVybCkgcmV0dXJuO1xuXG5cdFx0Ly8gYmFpbCBvdXQgYmVmb3JlIGBiZWZvcmVOYXZpZ2F0ZWAgaWYgbGluayBvcGVucyBpbiBhIGRpZmZlcmVudCB0YWJcblx0XHRpZiAodGFyZ2V0ID09PSAnX3BhcmVudCcgfHwgdGFyZ2V0ID09PSAnX3RvcCcpIHtcblx0XHRcdGlmICh3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cpIHJldHVybjtcblx0XHR9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBvcHRpb25zID0gZ2V0X3JvdXRlcl9vcHRpb25zKGEpO1xuXHRcdGNvbnN0IGlzX3N2Z19hX2VsZW1lbnQgPSBhIGluc3RhbmNlb2YgU1ZHQUVsZW1lbnQ7XG5cblx0XHQvLyBJZ25vcmUgVVJMIHByb3RvY29scyB0aGF0IGRpZmZlciB0byB0aGUgY3VycmVudCBvbmUgYW5kIGFyZSBub3QgaHR0cChzKSAoZS5nLiBgbWFpbHRvOmAsIGB0ZWw6YCwgYG15YXBwOmAsIGV0Yy4pXG5cdFx0Ly8gVGhpcyBtYXkgYmUgd3Jvbmcgd2hlbiB0aGUgcHJvdG9jb2wgaXMgeDogYW5kIHRoZSBsaW5rIGdvZXMgdG8geTouLiB3aGljaCBzaG91bGQgYmUgdHJlYXRlZCBhcyBhbiBleHRlcm5hbFxuXHRcdC8vIG5hdmlnYXRpb24sIGJ1dCBpdCdzIG5vdCBjbGVhciBob3cgdG8gaGFuZGxlIHRoYXQgY2FzZSBhbmQgaXQncyBub3QgbGlrZWx5IHRvIGNvbWUgdXAgaW4gcHJhY3RpY2UuXG5cdFx0Ly8gTUVNTzogV2l0aG91dCB0aGlzIGNvbmRpdGlvbiwgZmlyZWZveCB3aWxsIG9wZW4gbWFpbGVyIHR3aWNlLlxuXHRcdC8vIFNlZTpcblx0XHQvLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9raXQvaXNzdWVzLzQwNDVcblx0XHQvLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9raXQvaXNzdWVzLzU3MjVcblx0XHQvLyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9raXQvaXNzdWVzLzY0OTZcblx0XHRpZiAoXG5cdFx0XHQhaXNfc3ZnX2FfZWxlbWVudCAmJlxuXHRcdFx0dXJsLnByb3RvY29sICE9PSBsb2NhdGlvbi5wcm90b2NvbCAmJlxuXHRcdFx0ISh1cmwucHJvdG9jb2wgPT09ICdodHRwczonIHx8IHVybC5wcm90b2NvbCA9PT0gJ2h0dHA6Jylcblx0XHQpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAoZG93bmxvYWQpIHJldHVybjtcblxuXHRcdGNvbnN0IFtub25oYXNoLCBoYXNoXSA9IChhcHAuaGFzaCA/IHVybC5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogdXJsLmhyZWYpLnNwbGl0KCcjJyk7XG5cdFx0Y29uc3Qgc2FtZV9wYXRobmFtZSA9IG5vbmhhc2ggPT09IHN0cmlwX2hhc2gobG9jYXRpb24pO1xuXG5cdFx0Ly8gSWdub3JlIHRoZSBmb2xsb3dpbmcgYnV0IGZpcmUgYmVmb3JlTmF2aWdhdGVcblx0XHRpZiAoZXh0ZXJuYWwgfHwgKG9wdGlvbnMucmVsb2FkICYmICghc2FtZV9wYXRobmFtZSB8fCAhaGFzaCkpKSB7XG5cdFx0XHRpZiAoX2JlZm9yZV9uYXZpZ2F0ZSh7IHVybCwgdHlwZTogJ2xpbmsnLCBldmVudCB9KSkge1xuXHRcdFx0XHQvLyBzZXQgYG5hdmlnYXRpbmdgIHRvIGB0cnVlYCB0byBwcmV2ZW50IGBiZWZvcmVOYXZpZ2F0ZWAgY2FsbGJhY2tzXG5cdFx0XHRcdC8vIGJlaW5nIGNhbGxlZCB3aGVuIHRoZSBwYWdlIHVubG9hZHNcblx0XHRcdFx0aXNfbmF2aWdhdGluZyA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaWYgbmV3IHVybCBvbmx5IGRpZmZlcnMgYnkgaGFzaCBhbmQgdXNlIHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3IgaW4gdGhhdCBjYXNlXG5cdFx0Ly8gVGhpcyB3aWxsIGVuc3VyZSB0aGUgYGhhc2hjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkXG5cdFx0Ly8gUmVtb3ZpbmcgdGhlIGhhc2ggZG9lcyBhIGZ1bGwgcGFnZSBuYXZpZ2F0aW9uIGluIHRoZSBicm93c2VyLCBzbyBtYWtlIHN1cmUgYSBoYXNoIGlzIHByZXNlbnRcblx0XHRpZiAoaGFzaCAhPT0gdW5kZWZpbmVkICYmIHNhbWVfcGF0aG5hbWUpIHtcblx0XHRcdC8vIElmIHdlIGFyZSB0cnlpbmcgdG8gbmF2aWdhdGUgdG8gdGhlIHNhbWUgaGFzaCwgd2Ugc2hvdWxkIG9ubHlcblx0XHRcdC8vIGF0dGVtcHQgdG8gc2Nyb2xsIHRvIHRoYXQgZWxlbWVudCBhbmQgYXZvaWQgYW55IGhpc3RvcnkgY2hhbmdlcy5cblx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBjYW4gY2F1c2UgRmlyZWZveCB0byBpbmNvcnJlY3RseSBhc3NpZ24gYSBudWxsXG5cdFx0XHQvLyBoaXN0b3J5IHN0YXRlIHZhbHVlIHdpdGhvdXQgYW55IHNpZ25hbCB0aGF0IHdlIGNhbiBkZXRlY3QuXG5cdFx0XHRjb25zdCBbLCBjdXJyZW50X2hhc2hdID0gY3VycmVudC51cmwuaHJlZi5zcGxpdCgnIycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaGFzaCA9PT0gaGFzaCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdC8vIFdlJ3JlIGFscmVhZHkgb24gLyMgYW5kIGNsaWNrIG9uIGEgbGluayB0aGF0IGdvZXMgdG8gLyMsIG9yIHdlJ3JlIG9uXG5cdFx0XHRcdC8vIC8jdG9wIGFuZCBjbGljayBvbiBhIGxpbmsgdGhhdCBnb2VzIHRvIC8jdG9wLiBJbiB0aG9zZSBjYXNlcyBqdXN0IGdvIHRvXG5cdFx0XHRcdC8vIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIGFuZCBhdm9pZCBhIGhpc3RvcnkgY2hhbmdlLlxuXHRcdFx0XHRpZiAoaGFzaCA9PT0gJycgfHwgKGhhc2ggPT09ICd0b3AnICYmIGEub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wJykgPT09IG51bGwpKSB7XG5cdFx0XHRcdFx0c2Nyb2xsVG8oeyB0b3A6IDAgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGEub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWNvZGVVUklDb21wb25lbnQoaGFzaCkpO1xuXHRcdFx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRlbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XG5cdFx0XHRcdFx0XHRlbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gc2V0IHRoaXMgZmxhZyB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIG5hdmlnYXRpb25zIHRyaWdnZXJlZCBieVxuXHRcdFx0Ly8gY2xpY2tpbmcgYSBoYXNoIGxpbmsgYW5kIHRob3NlIHRyaWdnZXJlZCBieSBwb3BzdGF0ZVxuXHRcdFx0aGFzaF9uYXZpZ2F0aW5nID0gdHJ1ZTtcblxuXHRcdFx0dXBkYXRlX3Njcm9sbF9wb3NpdGlvbnMoY3VycmVudF9oaXN0b3J5X2luZGV4KTtcblxuXHRcdFx0dXBkYXRlX3VybCh1cmwpO1xuXG5cdFx0XHRpZiAoIW9wdGlvbnMucmVwbGFjZV9zdGF0ZSkgcmV0dXJuO1xuXG5cdFx0XHQvLyBoYXNoY2hhbmdlIGV2ZW50IHNob3VsZG4ndCBvY2N1ciBpZiB0aGUgcm91dGVyIGlzIHJlcGxhY2luZyBzdGF0ZS5cblx0XHRcdGhhc2hfbmF2aWdhdGluZyA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvLyBhbGxvdyB0aGUgYnJvd3NlciB0byByZXBhaW50IGJlZm9yZSBuYXZpZ2F0aW5nIOKAlFxuXHRcdC8vIHRoaXMgcHJldmVudHMgSU5QIHNjb3JlcyBiZWluZyBwZW5hbGlzZWRcblx0XHRhd2FpdCBuZXcgUHJvbWlzZSgoZnVsZmlsKSA9PiB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bGZpbCwgMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0c2V0VGltZW91dChmdWxmaWwsIDEwMCk7IC8vIGZhbGxiYWNrIGZvciBlZGdlIGNhc2Ugd2hlcmUgckFGIGRvZXNuJ3QgZmlyZSBiZWNhdXNlIGUuZy4gdGFiIHdhcyBiYWNrZ3JvdW5kZWRcblx0XHR9KTtcblxuXHRcdGF3YWl0IG5hdmlnYXRlKHtcblx0XHRcdHR5cGU6ICdsaW5rJyxcblx0XHRcdHVybCxcblx0XHRcdGtlZXBmb2N1czogb3B0aW9ucy5rZWVwZm9jdXMsXG5cdFx0XHRub3Njcm9sbDogb3B0aW9ucy5ub3Njcm9sbCxcblx0XHRcdHJlcGxhY2Vfc3RhdGU6IG9wdGlvbnMucmVwbGFjZV9zdGF0ZSA/PyB1cmwuaHJlZiA9PT0gbG9jYXRpb24uaHJlZixcblx0XHRcdGV2ZW50XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcblx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgZm9ybSA9IC8qKiBAdHlwZSB7SFRNTEZvcm1FbGVtZW50fSAqLyAoXG5cdFx0XHRIVE1MRm9ybUVsZW1lbnQucHJvdG90eXBlLmNsb25lTm9kZS5jYWxsKGV2ZW50LnRhcmdldClcblx0XHQpO1xuXG5cdFx0Y29uc3Qgc3VibWl0dGVyID0gLyoqIEB0eXBlIHtIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsfSAqLyAoZXZlbnQuc3VibWl0dGVyKTtcblxuXHRcdGNvbnN0IHRhcmdldCA9IHN1Ym1pdHRlcj8uZm9ybVRhcmdldCB8fCBmb3JtLnRhcmdldDtcblxuXHRcdGlmICh0YXJnZXQgPT09ICdfYmxhbmsnKSByZXR1cm47XG5cblx0XHRjb25zdCBtZXRob2QgPSBzdWJtaXR0ZXI/LmZvcm1NZXRob2QgfHwgZm9ybS5tZXRob2Q7XG5cblx0XHRpZiAobWV0aG9kICE9PSAnZ2V0JykgcmV0dXJuO1xuXG5cdFx0Ly8gSXQgaXMgaW1wb3NzaWJsZSB0byB1c2UgZm9ybSBhY3Rpb25zIHdpdGggaGFzaCByb3V0ZXIsIHNvIHdlIGp1c3QgaWdub3JlIGhhbmRsaW5nIHRoZW0gaGVyZVxuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoXG5cdFx0XHQoc3VibWl0dGVyPy5oYXNBdHRyaWJ1dGUoJ2Zvcm1hY3Rpb24nKSAmJiBzdWJtaXR0ZXI/LmZvcm1BY3Rpb24pIHx8IGZvcm0uYWN0aW9uXG5cdFx0KTtcblxuXHRcdGlmIChpc19leHRlcm5hbF91cmwodXJsLCBiYXNlLCBmYWxzZSkpIHJldHVybjtcblxuXHRcdGNvbnN0IGV2ZW50X2Zvcm0gPSAvKiogQHR5cGUge0hUTUxGb3JtRWxlbWVudH0gKi8gKGV2ZW50LnRhcmdldCk7XG5cblx0XHRjb25zdCBvcHRpb25zID0gZ2V0X3JvdXRlcl9vcHRpb25zKGV2ZW50X2Zvcm0pO1xuXHRcdGlmIChvcHRpb25zLnJlbG9hZCkgcmV0dXJuO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnRfZm9ybSwgc3VibWl0dGVyKTtcblxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgYFVSTFNlYXJjaFBhcmFtcyhmZClgIGlzIGtvc2hlciwgYnV0IHR5cGVzY3JpcHQgZG9lc24ndCBrbm93IHRoYXRcblx0XHR1cmwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhkYXRhKS50b1N0cmluZygpO1xuXG5cdFx0dm9pZCBuYXZpZ2F0ZSh7XG5cdFx0XHR0eXBlOiAnZm9ybScsXG5cdFx0XHR1cmwsXG5cdFx0XHRrZWVwZm9jdXM6IG9wdGlvbnMua2VlcGZvY3VzLFxuXHRcdFx0bm9zY3JvbGw6IG9wdGlvbnMubm9zY3JvbGwsXG5cdFx0XHRyZXBsYWNlX3N0YXRlOiBvcHRpb25zLnJlcGxhY2Vfc3RhdGUgPz8gdXJsLmhyZWYgPT09IGxvY2F0aW9uLmhyZWYsXG5cdFx0XHRldmVudFxuXHRcdH0pO1xuXHR9KTtcblxuXHRhZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGFzeW5jIChldmVudCkgPT4ge1xuXHRcdGlmIChyZXNldHRpbmdfZm9jdXMpIHJldHVybjtcblxuXHRcdGlmIChldmVudC5zdGF0ZT8uW0hJU1RPUllfSU5ERVhdKSB7XG5cdFx0XHRjb25zdCBoaXN0b3J5X2luZGV4ID0gZXZlbnQuc3RhdGVbSElTVE9SWV9JTkRFWF07XG5cdFx0XHR0b2tlbiA9IHt9O1xuXG5cdFx0XHQvLyBpZiBhIHBvcHN0YXRlLWRyaXZlbiBuYXZpZ2F0aW9uIGlzIGNhbmNlbGxlZCwgd2UgbmVlZCB0byBjb3VudGVyYWN0IGl0XG5cdFx0XHQvLyB3aXRoIGhpc3RvcnkuZ28sIHdoaWNoIG1lYW5zIHdlIGVuZCB1cCBiYWNrIGhlcmUsIGhlbmNlIHRoaXMgY2hlY2tcblx0XHRcdGlmIChoaXN0b3J5X2luZGV4ID09PSBjdXJyZW50X2hpc3RvcnlfaW5kZXgpIHJldHVybjtcblxuXHRcdFx0Y29uc3Qgc2Nyb2xsID0gc2Nyb2xsX3Bvc2l0aW9uc1toaXN0b3J5X2luZGV4XTtcblx0XHRcdGNvbnN0IHN0YXRlID0gZXZlbnQuc3RhdGVbU1RBVEVTX0tFWV0gPz8ge307XG5cdFx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGV2ZW50LnN0YXRlW1BBR0VfVVJMX0tFWV0gPz8gbG9jYXRpb24uaHJlZik7XG5cdFx0XHRjb25zdCBuYXZpZ2F0aW9uX2luZGV4ID0gZXZlbnQuc3RhdGVbTkFWSUdBVElPTl9JTkRFWF07XG5cdFx0XHRjb25zdCBpc19oYXNoX2NoYW5nZSA9IGN1cnJlbnQudXJsID8gc3RyaXBfaGFzaChsb2NhdGlvbikgPT09IHN0cmlwX2hhc2goY3VycmVudC51cmwpIDogZmFsc2U7XG5cdFx0XHRjb25zdCBzaGFsbG93ID1cblx0XHRcdFx0bmF2aWdhdGlvbl9pbmRleCA9PT0gY3VycmVudF9uYXZpZ2F0aW9uX2luZGV4ICYmIChoYXNfbmF2aWdhdGVkIHx8IGlzX2hhc2hfY2hhbmdlKTtcblxuXHRcdFx0aWYgKHNoYWxsb3cpIHtcblx0XHRcdFx0Ly8gV2UgZG9uJ3QgbmVlZCB0byBuYXZpZ2F0ZSwgd2UganVzdCBuZWVkIHRvIHVwZGF0ZSBzY3JvbGwgYW5kL29yIHN0YXRlLlxuXHRcdFx0XHQvLyBUaGlzIGhhcHBlbnMgd2l0aCBoYXNoIGxpbmtzIGFuZCBgcHVzaFN0YXRlYC9gcmVwbGFjZVN0YXRlYC4gVGhlXG5cdFx0XHRcdC8vIGV4Y2VwdGlvbiBpcyBpZiB3ZSBoYXZlbid0IG5hdmlnYXRlZCB5ZXQsIHNpbmNlIHdlIGNvdWxkIGhhdmVcblx0XHRcdFx0Ly8gZ290IGhlcmUgYWZ0ZXIgYSBtb2RhbCBuYXZpZ2F0aW9uIHRoZW4gYSByZWxvYWRcblx0XHRcdFx0aWYgKHN0YXRlICE9PSBwYWdlLnN0YXRlKSB7XG5cdFx0XHRcdFx0cGFnZS5zdGF0ZSA9IHN0YXRlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dXBkYXRlX3VybCh1cmwpO1xuXG5cdFx0XHRcdHNjcm9sbF9wb3NpdGlvbnNbY3VycmVudF9oaXN0b3J5X2luZGV4XSA9IHNjcm9sbF9zdGF0ZSgpO1xuXHRcdFx0XHRpZiAoc2Nyb2xsKSBzY3JvbGxUbyhzY3JvbGwueCwgc2Nyb2xsLnkpO1xuXG5cdFx0XHRcdGN1cnJlbnRfaGlzdG9yeV9pbmRleCA9IGhpc3RvcnlfaW5kZXg7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZGVsdGEgPSBoaXN0b3J5X2luZGV4IC0gY3VycmVudF9oaXN0b3J5X2luZGV4O1xuXG5cdFx0XHRhd2FpdCBuYXZpZ2F0ZSh7XG5cdFx0XHRcdHR5cGU6ICdwb3BzdGF0ZScsXG5cdFx0XHRcdHVybCxcblx0XHRcdFx0cG9wcGVkOiB7XG5cdFx0XHRcdFx0c3RhdGUsXG5cdFx0XHRcdFx0c2Nyb2xsLFxuXHRcdFx0XHRcdGRlbHRhXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFjY2VwdDogKCkgPT4ge1xuXHRcdFx0XHRcdGN1cnJlbnRfaGlzdG9yeV9pbmRleCA9IGhpc3RvcnlfaW5kZXg7XG5cdFx0XHRcdFx0Y3VycmVudF9uYXZpZ2F0aW9uX2luZGV4ID0gbmF2aWdhdGlvbl9pbmRleDtcblx0XHRcdFx0fSxcblx0XHRcdFx0YmxvY2s6ICgpID0+IHtcblx0XHRcdFx0XHRoaXN0b3J5LmdvKC1kZWx0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5hdl90b2tlbjogdG9rZW4sXG5cdFx0XHRcdGV2ZW50XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gc2luY2UgcG9wc3RhdGUgZXZlbnQgaXMgYWxzbyBlbWl0dGVkIHdoZW4gYW4gYW5jaG9yIHJlZmVyZW5jaW5nIHRoZSBzYW1lXG5cdFx0XHQvLyBkb2N1bWVudCBpcyBjbGlja2VkLCB3ZSBoYXZlIHRvIGNoZWNrIHRoYXQgdGhlIHJvdXRlciBpc24ndCBhbHJlYWR5IGhhbmRsaW5nXG5cdFx0XHQvLyB0aGUgbmF2aWdhdGlvbi4gb3RoZXJ3aXNlIHdlIHdvdWxkIGJlIHVwZGF0aW5nIHRoZSBwYWdlIHN0b3JlIHR3aWNlLlxuXHRcdFx0aWYgKCFoYXNoX25hdmlnYXRpbmcpIHtcblx0XHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRcdFx0dXBkYXRlX3VybCh1cmwpO1xuXG5cdFx0XHRcdC8vIGlmIHRoZSB1c2VyIGVkaXRzIHRoZSBoYXNoIHZpYSB0aGUgYnJvd3NlciBVUkwgYmFyLCB0cmlnZ2VyIGEgZnVsbC1wYWdlXG5cdFx0XHRcdC8vIHJlbG9hZCB0byBhbGlnbiB3aXRoIHBhdGhuYW1lIHJvdXRlciBiZWhhdmlvclxuXHRcdFx0XHRpZiAoYXBwLmhhc2gpIHtcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcblx0XHQvLyBpZiB0aGUgaGFzaGNoYW5nZSBoYXBwZW5lZCBhcyBhIHJlc3VsdCBvZiBjbGlja2luZyBvbiBhIGxpbmssXG5cdFx0Ly8gd2UgbmVlZCB0byB1cGRhdGUgaGlzdG9yeSwgb3RoZXJ3aXNlIHdlIGhhdmUgdG8gbGVhdmUgaXQgYWxvbmVcblx0XHRpZiAoaGFzaF9uYXZpZ2F0aW5nKSB7XG5cdFx0XHRoYXNoX25hdmlnYXRpbmcgPSBmYWxzZTtcblx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Li4uaGlzdG9yeS5zdGF0ZSxcblx0XHRcdFx0XHRbSElTVE9SWV9JTkRFWF06ICsrY3VycmVudF9oaXN0b3J5X2luZGV4LFxuXHRcdFx0XHRcdFtOQVZJR0FUSU9OX0lOREVYXTogY3VycmVudF9uYXZpZ2F0aW9uX2luZGV4XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCcnLFxuXHRcdFx0XHRsb2NhdGlvbi5ocmVmXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gZml4IGxpbmtbcmVsPWljb25dLCBiZWNhdXNlIGJyb3dzZXJzIHdpbGwgb2NjYXNpb25hbGx5IHRyeSB0byBsb2FkIHJlbGF0aXZlXG5cdC8vIFVSTHMgYWZ0ZXIgYSBwdXNoU3RhdGUvcmVwbGFjZVN0YXRlLCByZXN1bHRpbmcgaW4gYSA0MDQg4oCUIHNlZVxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMva2l0L2lzc3Vlcy8zNzQ4I2lzc3VlY29tbWVudC0xMTI1OTgwODk3XG5cdGZvciAoY29uc3QgbGluayBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJykpIHtcblx0XHRpZiAoSUNPTl9SRUxfQVRUUklCVVRFUy5oYXMobGluay5yZWwpKSB7XG5cdFx0XHRsaW5rLmhyZWYgPSBsaW5rLmhyZWY7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR9XG5cdH1cblxuXHRhZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIChldmVudCkgPT4ge1xuXHRcdC8vIElmIHRoZSB1c2VyIG5hdmlnYXRlcyB0byBhbm90aGVyIHNpdGUgYW5kIHRoZW4gdXNlcyB0aGUgYmFjayBidXR0b24gYW5kXG5cdFx0Ly8gYmZjYWNoZSBoaXRzLCB3ZSBuZWVkIHRvIHNldCBuYXZpZ2F0aW5nIHRvIG51bGwsIHRoZSBzaXRlIGRvZXNuJ3Qga25vd1xuXHRcdC8vIHRoZSBuYXZpZ2F0aW9uIGF3YXkgZnJvbSBpdCB3YXMgc3VjY2Vzc2Z1bC5cblx0XHQvLyBJbmZvIGFib3V0IGJmY2FjaGUgaGVyZTogaHR0cHM6Ly93ZWIuZGV2L2JmY2FjaGVcblx0XHRpZiAoZXZlbnQucGVyc2lzdGVkKSB7XG5cdFx0XHRzdG9yZXMubmF2aWdhdGluZy5zZXQoKG5hdmlnYXRpbmcuY3VycmVudCA9IG51bGwpKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1VSTH0gdXJsXG5cdCAqL1xuXHRmdW5jdGlvbiB1cGRhdGVfdXJsKHVybCkge1xuXHRcdGN1cnJlbnQudXJsID0gcGFnZS51cmwgPSB1cmw7XG5cdFx0c3RvcmVzLnBhZ2Uuc2V0KGNsb25lX3BhZ2UocGFnZSkpO1xuXHRcdHN0b3Jlcy5wYWdlLm5vdGlmeSgpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90eXBlcy5qcycpLkh5ZHJhdGVPcHRpb25zfSBvcHRzXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gX2h5ZHJhdGUoXG5cdHRhcmdldCxcblx0eyBzdGF0dXMgPSAyMDAsIGVycm9yLCBub2RlX2lkcywgcGFyYW1zLCByb3V0ZSwgc2VydmVyX3JvdXRlLCBkYXRhOiBzZXJ2ZXJfZGF0YV9ub2RlcywgZm9ybSB9XG4pIHtcblx0aHlkcmF0ZWQgPSB0cnVlO1xuXG5cdGNvbnN0IHVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJ3R5cGVzJykuQ1NSUm91dGUgfCB1bmRlZmluZWR9ICovXG5cdGxldCBwYXJzZWRfcm91dGU7XG5cblx0aWYgKF9fU1ZFTFRFS0lUX0NMSUVOVF9ST1VUSU5HX18pIHtcblx0XHRpZiAoIV9fU1ZFTFRFS0lUX0VNQkVEREVEX18pIHtcblx0XHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMva2l0L3B1bGwvNDkzNSNpc3N1ZWNvbW1lbnQtMTMyODA5MzM1OCBmb3Igb25lIG1vdGl2YXRpb25cblx0XHRcdC8vIG9mIGRldGVybWluaW5nIHRoZSBwYXJhbXMgb24gdGhlIGNsaWVudCBzaWRlLlxuXHRcdFx0KHsgcGFyYW1zID0ge30sIHJvdXRlID0geyBpZDogbnVsbCB9IH0gPSAoYXdhaXQgZ2V0X25hdmlnYXRpb25faW50ZW50KHVybCwgZmFsc2UpKSB8fCB7fSk7XG5cdFx0fVxuXG5cdFx0cGFyc2VkX3JvdXRlID0gcm91dGVzLmZpbmQoKHsgaWQgfSkgPT4gaWQgPT09IHJvdXRlLmlkKTtcblx0fSBlbHNlIHtcblx0XHQvLyB1bmRlZmluZWQgaW4gY2FzZSBvZiA0MDRcblx0XHRpZiAoc2VydmVyX3JvdXRlKSB7XG5cdFx0XHRwYXJzZWRfcm91dGUgPSByb3V0ZSA9IHBhcnNlX3NlcnZlcl9yb3V0ZShzZXJ2ZXJfcm91dGUsIGFwcC5ub2Rlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvdXRlID0geyBpZDogbnVsbCB9O1xuXHRcdFx0cGFyYW1zID0ge307XG5cdFx0fVxuXHR9XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uRmluaXNoZWQgfCB1bmRlZmluZWR9ICovXG5cdGxldCByZXN1bHQ7XG5cdGxldCBoeWRyYXRlID0gdHJ1ZTtcblxuXHR0cnkge1xuXHRcdGNvbnN0IGJyYW5jaF9wcm9taXNlcyA9IG5vZGVfaWRzLm1hcChhc3luYyAobiwgaSkgPT4ge1xuXHRcdFx0Y29uc3Qgc2VydmVyX2RhdGFfbm9kZSA9IHNlcnZlcl9kYXRhX25vZGVzW2ldO1xuXHRcdFx0Ly8gVHlwZSBpc24ndCBjb21wbGV0ZWx5IGFjY3VyYXRlLCB3ZSBzdGlsbCBuZWVkIHRvIGRlc2VyaWFsaXplIHVzZXNcblx0XHRcdGlmIChzZXJ2ZXJfZGF0YV9ub2RlPy51c2VzKSB7XG5cdFx0XHRcdHNlcnZlcl9kYXRhX25vZGUudXNlcyA9IGRlc2VyaWFsaXplX3VzZXMoc2VydmVyX2RhdGFfbm9kZS51c2VzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxvYWRfbm9kZSh7XG5cdFx0XHRcdGxvYWRlcjogYXBwLm5vZGVzW25dLFxuXHRcdFx0XHR1cmwsXG5cdFx0XHRcdHBhcmFtcyxcblx0XHRcdFx0cm91dGUsXG5cdFx0XHRcdHBhcmVudDogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGRhdGEgPSB7fTtcblx0XHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGk7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihkYXRhLCAoYXdhaXQgYnJhbmNoX3Byb21pc2VzW2pdKS5kYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlcnZlcl9kYXRhX25vZGU6IGNyZWF0ZV9kYXRhX25vZGUoc2VydmVyX2RhdGFfbm9kZSlcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyoqIEB0eXBlIHtBcnJheTxpbXBvcnQoJy4vdHlwZXMuanMnKS5CcmFuY2hOb2RlIHwgdW5kZWZpbmVkPn0gKi9cblx0XHRjb25zdCBicmFuY2ggPSBhd2FpdCBQcm9taXNlLmFsbChicmFuY2hfcHJvbWlzZXMpO1xuXG5cdFx0Ly8gc2VydmVyLXNpZGUgd2lsbCBoYXZlIGNvbXBhY3RlZCB0aGUgYnJhbmNoLCByZWluc3RhdGUgZW1wdHkgc2xvdHNcblx0XHQvLyBzbyB0aGF0IGVycm9yIGJvdW5kYXJpZXMgY2FuIGJlIGxpbmVkIHVwIGNvcnJlY3RseVxuXHRcdGlmIChwYXJzZWRfcm91dGUpIHtcblx0XHRcdGNvbnN0IGxheW91dHMgPSBwYXJzZWRfcm91dGUubGF5b3V0cztcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoIWxheW91dHNbaV0pIHtcblx0XHRcdFx0XHRicmFuY2guc3BsaWNlKGksIDAsIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXN1bHQgPSBhd2FpdCBnZXRfbmF2aWdhdGlvbl9yZXN1bHRfZnJvbV9icmFuY2goe1xuXHRcdFx0dXJsLFxuXHRcdFx0cGFyYW1zLFxuXHRcdFx0YnJhbmNoLFxuXHRcdFx0c3RhdHVzLFxuXHRcdFx0ZXJyb3IsXG5cdFx0XHRlcnJvcnM6IHBhcnNlZF9yb3V0ZT8uZXJyb3JzLCAvLyBUT0RPIGxvYWQgZWFybGllcj9cblx0XHRcdGZvcm0sXG5cdFx0XHRyb3V0ZTogcGFyc2VkX3JvdXRlID8/IG51bGxcblx0XHR9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZWRpcmVjdCkge1xuXHRcdFx0Ly8gdGhpcyBpcyBhIHJlYWwgZWRnZSBjYXNlIOKAlCBgbG9hZGAgd291bGQgbmVlZCB0byByZXR1cm5cblx0XHRcdC8vIGEgcmVkaXJlY3QgYnV0IG9ubHkgaW4gdGhlIGJyb3dzZXJcblx0XHRcdHJldHVybiBhd2FpdCBuYXRpdmVfbmF2aWdhdGlvbihuZXcgVVJMKGVycm9yLmxvY2F0aW9uLCBsb2NhdGlvbi5ocmVmKSk7XG5cdFx0fVxuXG5cdFx0cmVzdWx0ID0gYXdhaXQgbG9hZF9yb290X2Vycm9yX3BhZ2Uoe1xuXHRcdFx0c3RhdHVzOiBnZXRfc3RhdHVzKGVycm9yKSxcblx0XHRcdGVycm9yOiBhd2FpdCBoYW5kbGVfZXJyb3IoZXJyb3IsIHsgdXJsLCBwYXJhbXMsIHJvdXRlIH0pLFxuXHRcdFx0dXJsLFxuXHRcdFx0cm91dGVcblx0XHR9KTtcblxuXHRcdHRhcmdldC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdGh5ZHJhdGUgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEV4aXQgZWFybHkgd2hlbiB3ZSBlbmNvdW50ZXIgYSByZWRpcmVjdCB3aGlsZSBsb2FkaW5nIHRoZSByb290IGVycm9yIHBhZ2UuXG5cdC8vIEluIHRoaXMgY2FzZSwgYGluaXRpYWxpemVgIHdpbGwgYmUgY2FsbGVkIGxhdGVyIG9uXG5cdGlmICghcmVzdWx0KSByZXR1cm47XG5cblx0aWYgKHJlc3VsdC5wcm9wcy5wYWdlKSB7XG5cdFx0cmVzdWx0LnByb3BzLnBhZ2Uuc3RhdGUgPSB7fTtcblx0fVxuXG5cdGF3YWl0IGluaXRpYWxpemUocmVzdWx0LCB0YXJnZXQsIGh5ZHJhdGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VVJMfSB1cmxcbiAqIEBwYXJhbSB7Ym9vbGVhbltdfSBpbnZhbGlkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxpbXBvcnQoJ3R5cGVzJykuU2VydmVyTm9kZXNSZXNwb25zZSB8IGltcG9ydCgndHlwZXMnKS5TZXJ2ZXJSZWRpcmVjdE5vZGU+fVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkX2RhdGEodXJsLCBpbnZhbGlkKSB7XG5cdGNvbnN0IGRhdGFfdXJsID0gbmV3IFVSTCh1cmwpO1xuXHRkYXRhX3VybC5wYXRobmFtZSA9IGFkZF9kYXRhX3N1ZmZpeCh1cmwucGF0aG5hbWUpO1xuXHRpZiAodXJsLnBhdGhuYW1lLmVuZHNXaXRoKCcvJykpIHtcblx0XHRkYXRhX3VybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFRSQUlMSU5HX1NMQVNIX1BBUkFNLCAnMScpO1xuXHR9XG5cdGlmIChERVYgJiYgdXJsLnNlYXJjaFBhcmFtcy5oYXMoSU5WQUxJREFURURfUEFSQU0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdXNlZCByZXNlcnZlZCBxdWVyeSBwYXJhbWV0ZXIgXCIke0lOVkFMSURBVEVEX1BBUkFNfVwiYCk7XG5cdH1cblx0ZGF0YV91cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChJTlZBTElEQVRFRF9QQVJBTSwgaW52YWxpZC5tYXAoKGkpID0+IChpID8gJzEnIDogJzAnKSkuam9pbignJykpO1xuXG5cdC8vIHVzZSB3aW5kb3cuZmV0Y2ggZGlyZWN0bHkgdG8gYWxsb3cgdXNpbmcgYSAzcmQgcGFydHktcGF0Y2hlZCBmZXRjaCBpbXBsZW1lbnRhdGlvblxuXHRjb25zdCBmZXRjaGVyID0gREVWID8gZGV2X2ZldGNoIDogd2luZG93LmZldGNoO1xuXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaGVyKGRhdGFfdXJsLmhyZWYsIHt9KTtcblxuXHRpZiAoIXJlcy5vaykge1xuXHRcdC8vIGVycm9yIG1lc3NhZ2UgaXMgYSBKU09OLXN0cmluZ2lmaWVkIHN0cmluZyB3aGljaCBkZXZhbHVlIGNhbid0IGhhbmRsZSBhdCB0aGUgdG9wIGxldmVsXG5cdFx0Ly8gdHVybiBpdCBpbnRvIGEgSHR0cEVycm9yIHRvIG5vdCBjYWxsIGhhbmRsZUVycm9yIG9uIHRoZSBjbGllbnQgYWdhaW4gKHdhcyBhbHJlYWR5IGhhbmRsZWQgb24gdGhlIHNlcnZlcilcblx0XHQvLyBpZiBgX19kYXRhLmpzb25gIGRvZXNuJ3QgZXhpc3Qgb3IgdGhlIHNlcnZlciBoYXMgYW4gaW50ZXJuYWwgZXJyb3IsXG5cdFx0Ly8gYXZvaWQgcGFyc2luZyB0aGUgSFRNTCBlcnJvciBwYWdlIGFzIGEgSlNPTlxuXHRcdC8qKiBAdHlwZSB7c3RyaW5nIHwgdW5kZWZpbmVkfSAqL1xuXHRcdGxldCBtZXNzYWdlO1xuXHRcdGlmIChyZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpKSB7XG5cdFx0XHRtZXNzYWdlID0gYXdhaXQgcmVzLmpzb24oKTtcblx0XHR9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT09IDQwNCkge1xuXHRcdFx0bWVzc2FnZSA9ICdOb3QgRm91bmQnO1xuXHRcdH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PT0gNTAwKSB7XG5cdFx0XHRtZXNzYWdlID0gJ0ludGVybmFsIEVycm9yJztcblx0XHR9XG5cdFx0dGhyb3cgbmV3IEh0dHBFcnJvcihyZXMuc3RhdHVzLCBtZXNzYWdlKTtcblx0fVxuXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0cHJvY2Vzc19zdHJlYW0ocmVzb2x2ZSwgcmVzKS5jYXRjaChyZWplY3QpO1xuXHR9KTtcblxuXHQvLyBUT0RPIGVkZ2UgY2FzZSBoYW5kbGluZyBuZWNlc3Nhcnk/IHN0cmVhbSgpIHJlYWQgZmFpbHM/XG59XG5cbi8qKlxuICogQHBhcmFtIHsodmFsdWU6IFNlcnZlck5vZGVzUmVzcG9uc2UgfCBTZXJ2ZXJSZWRpcmVjdE5vZGUpID0+IHZvaWR9IHJlc29sdmVcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3Nfc3RyZWFtKHJlc29sdmUsIHJlcykge1xuXHRjb25zdCByZWFkZXIgPSAvKiogQHR5cGUge1JlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+fSAqLyAocmVzLmJvZHkpLmdldFJlYWRlcigpO1xuXG5cdC8qKlxuXHQgKiBNYXAgb2YgZGVmZXJyZWQgcHJvbWlzZXMgdGhhdCB3aWxsIGJlIHJlc29sdmVkIGJ5IGEgc3Vic2VxdWVudCBjaHVuayBvZiBkYXRhXG5cdCAqIEB0eXBlIHtNYXA8c3RyaW5nLCBpbXBvcnQoJ3R5cGVzJykuRGVmZXJyZWQ+fVxuXHQgKi9cblx0Y29uc3QgZGVmZXJyZWRzID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge2FueX0gZGF0YVxuXHQgKi9cblx0ZnVuY3Rpb24gZGVzZXJpYWxpemUoZGF0YSkge1xuXHRcdHJldHVybiBkZXZhbHVlLnVuZmxhdHRlbihkYXRhLCB7XG5cdFx0XHQuLi5hcHAuZGVjb2RlcnMsXG5cdFx0XHRQcm9taXNlOiAoaWQpID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWwsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdGRlZmVycmVkcy5zZXQoaWQsIHsgZnVsZmlsLCByZWplY3QgfSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Zm9yIGF3YWl0IChjb25zdCBub2RlIG9mIHJlYWRfbmRqc29uKHJlYWRlcikpIHtcblx0XHRpZiAobm9kZS50eXBlID09PSAncmVkaXJlY3QnKSB7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShub2RlKTtcblx0XHR9XG5cblx0XHRpZiAobm9kZS50eXBlID09PSAnZGF0YScpIHtcblx0XHRcdC8vIFRoaXMgaXMgdGhlIGZpcnN0IChhbmQgcG9zc2libHkgb25seSwgaWYgbm8gcGVuZGluZyBwcm9taXNlcykgY2h1bmtcblx0XHRcdG5vZGUubm9kZXM/LmZvckVhY2goKC8qKiBAdHlwZSB7YW55fSAqLyBub2RlKSA9PiB7XG5cdFx0XHRcdGlmIChub2RlPy50eXBlID09PSAnZGF0YScpIHtcblx0XHRcdFx0XHRub2RlLnVzZXMgPSBkZXNlcmlhbGl6ZV91c2VzKG5vZGUudXNlcyk7XG5cdFx0XHRcdFx0bm9kZS5kYXRhID0gZGVzZXJpYWxpemUobm9kZS5kYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJlc29sdmUobm9kZSk7XG5cdFx0fSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdjaHVuaycpIHtcblx0XHRcdC8vIFRoaXMgaXMgYSBzdWJzZXF1ZW50IGNodW5rIGNvbnRhaW5pbmcgZGVmZXJyZWQgZGF0YVxuXHRcdFx0Y29uc3QgeyBpZCwgZGF0YSwgZXJyb3IgfSA9IG5vZGU7XG5cdFx0XHRjb25zdCBkZWZlcnJlZCA9IC8qKiBAdHlwZSB7aW1wb3J0KCd0eXBlcycpLkRlZmVycmVkfSAqLyAoZGVmZXJyZWRzLmdldChpZCkpO1xuXHRcdFx0ZGVmZXJyZWRzLmRlbGV0ZShpZCk7XG5cblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZGVzZXJpYWxpemUoZXJyb3IpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLmZ1bGZpbChkZXNlcmlhbGl6ZShkYXRhKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IHVzZXNcbiAqIEByZXR1cm4ge2ltcG9ydCgndHlwZXMnKS5Vc2VzfVxuICovXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZV91c2VzKHVzZXMpIHtcblx0cmV0dXJuIHtcblx0XHRkZXBlbmRlbmNpZXM6IG5ldyBTZXQodXNlcz8uZGVwZW5kZW5jaWVzID8/IFtdKSxcblx0XHRwYXJhbXM6IG5ldyBTZXQodXNlcz8ucGFyYW1zID8/IFtdKSxcblx0XHRwYXJlbnQ6ICEhdXNlcz8ucGFyZW50LFxuXHRcdHJvdXRlOiAhIXVzZXM/LnJvdXRlLFxuXHRcdHVybDogISF1c2VzPy51cmwsXG5cdFx0c2VhcmNoX3BhcmFtczogbmV3IFNldCh1c2VzPy5zZWFyY2hfcGFyYW1zID8/IFtdKVxuXHR9O1xufVxuXG4vKipcbiAqIFRoaXMgZmxhZyBpcyB1c2VkIHRvIGF2b2lkIGNsaWVudC1zaWRlIG5hdmlnYXRpb24gd2hlbiB3ZSdyZSBvbmx5IHVzaW5nXG4gKiBgbG9jYXRpb24ucmVwbGFjZSgpYCB0byBzZXQgZm9jdXMuXG4gKi9cbmxldCByZXNldHRpbmdfZm9jdXMgPSBmYWxzZTtcblxuLyoqXG4gKiBAcGFyYW0ge1VSTH0gdXJsXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzY3JvbGxdXG4gKi9cbmZ1bmN0aW9uIHJlc2V0X2ZvY3VzKHVybCwgc2Nyb2xsID0gdHJ1ZSkge1xuXHRjb25zdCBhdXRvZm9jdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXScpO1xuXHRpZiAoYXV0b2ZvY3VzKSB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGF1dG9mb2N1cy5mb2N1cygpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFJlc2V0IHBhZ2Ugc2VsZWN0aW9uIGFuZCBmb2N1c1xuXG5cdFx0Ly8gTWltaWMgdGhlIGJyb3dzZXJzJyBiZWhhdmlvdXIgYW5kIHNldCB0aGUgc2VxdWVudGlhbCBmb2N1cyBuYXZpZ2F0aW9uXG5cdFx0Ly8gc3RhcnRpbmcgcG9pbnQgdG8gdGhlIGZyYWdtZW50IGlkZW50aWZpZXIuXG5cdFx0Y29uc3QgaWQgPSBnZXRfaWQodXJsKTtcblx0XHRpZiAoaWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7XG5cdFx0XHRjb25zdCB7IHgsIHkgfSA9IHNjcm9sbF9zdGF0ZSgpO1xuXG5cdFx0XHQvLyBgZWxlbWVudC5mb2N1cygpYCBkb2Vzbid0IHdvcmsgb24gU2FmYXJpIGFuZCBGaXJlZm94IFVidW50dSBzbyB3ZSBuZWVkXG5cdFx0XHQvLyB0byB1c2UgdGhpcyBoYWNrIHdpdGggYGxvY2F0aW9uLnJlcGxhY2UoKWAgaW5zdGVhZC5cblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBoaXN0b3J5X3N0YXRlID0gaGlzdG9yeS5zdGF0ZTtcblxuXHRcdFx0XHRyZXNldHRpbmdfZm9jdXMgPSB0cnVlO1xuXHRcdFx0XHRsb2NhdGlvbi5yZXBsYWNlKG5ldyBVUkwoYCMke2lkfWAsIGxvY2F0aW9uLmhyZWYpKTtcblxuXHRcdFx0XHQvLyBGaXJlZm94IGhhcyBhIGJ1ZyB0aGF0IHNldHMgdGhlIGhpc3Rvcnkgc3RhdGUgdG8gYG51bGxgIHNvIHdlIG5lZWQgdG9cblx0XHRcdFx0Ly8gcmVzdG9yZSBpdCBhZnRlci4gU2VlIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTExOTk5MjRcblx0XHRcdFx0Ly8gVGhpcyBpcyBhbHNvIG5lZWRlZCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCBoYXNoIGlmIHdlJ3JlIHVzaW5nIGhhc2ggcm91dGluZ1xuXHRcdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShoaXN0b3J5X3N0YXRlLCAnJywgdXJsKTtcblxuXHRcdFx0XHQvLyBJZiBzY3JvbGwgbWFuYWdlbWVudCBoYXMgYWxyZWFkeSBoYXBwZW5lZCBlYXJsaWVyLCB3ZSBuZWVkIHRvIHJlc3RvcmVcblx0XHRcdFx0Ly8gdGhlIHNjcm9sbCBwb3NpdGlvbiBhZnRlciBzZXR0aW5nIHRoZSBzZXF1ZW50aWFsIGZvY3VzIG5hdmlnYXRpb24gc3RhcnRpbmcgcG9pbnRcblx0XHRcdFx0aWYgKHNjcm9sbCkgc2Nyb2xsVG8oeCwgeSk7XG5cdFx0XHRcdHJlc2V0dGluZ19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIHRoZSBJRCBkb2Vzbid0IGV4aXN0LCB3ZSB0cnkgdG8gbWltaWMgYnJvd3NlcnMnIGJlaGF2aW91ciBhcyBjbG9zZWx5XG5cdFx0XHQvLyBhcyBwb3NzaWJsZSBieSB0YXJnZXRpbmcgdGhlIGZpcnN0IHNjcm9sbGFibGUgcmVnaW9uLiBVbmZvcnR1bmF0ZWx5LCBpdCdzXG5cdFx0XHQvLyBub3QgYSBwZXJmZWN0IG1hdGNoIOKAlCBlLmcuIHNoaWZ0LXRhYmJpbmcgd29uJ3QgaW1tZWRpYXRlbHkgY3ljbGUgdXAgZnJvbVxuXHRcdFx0Ly8gdGhlIGVuZCBvZiB0aGUgcGFnZSBvbiBDaHJvbWl1bVxuXHRcdFx0Ly8gU2VlIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2ludGVyYWN0aW9uLmh0bWwjZ2V0LXRoZS1mb2N1c2FibGUtYXJlYVxuXHRcdFx0Y29uc3Qgcm9vdCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XHRjb25zdCB0YWJpbmRleCA9IHJvb3QuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG5cdFx0XHRyb290LnRhYkluZGV4ID0gLTE7XG5cdFx0XHQvLyBUT0RPOiByZW1vdmUgdGhpcyB3aGVuIHdlIHN3aXRjaCB0byBUeXBlU2NyaXB0IDZcblx0XHRcdC8vIEB0cy1pZ25vcmUgb3B0aW9ucy5mb2N1c1Zpc2libGUgaXMgb25seSB0eXBlZCBpbiBUeXBlU2NyaXB0IDZcblx0XHRcdC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQvZm9jdXMjYnJvd3Nlcl9jb21wYXRpYmlsaXR5XG5cdFx0XHRyb290LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSwgZm9jdXNWaXNpYmxlOiBmYWxzZSB9KTtcblxuXHRcdFx0Ly8gcmVzdG9yZSBgdGFiaW5kZXhgIGFzIHRvIHByZXZlbnQgYHJvb3RgIGZyb20gc3RlYWxpbmcgaW5wdXQgZnJvbSBlbGVtZW50c1xuXHRcdFx0aWYgKHRhYmluZGV4ICE9PSBudWxsKSB7XG5cdFx0XHRcdHJvb3Quc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHRhYmluZGV4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJvb3QucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGNhcHR1cmUgY3VycmVudCBzZWxlY3Rpb24sIHNvIHdlIGNhbiBjb21wYXJlIHRoZSBzdGF0ZSBhZnRlclxuXHRcdC8vIHNuYXBzaG90IHJlc3RvcmF0aW9uIGFuZCBhZnRlck5hdmlnYXRlIGNhbGxiYWNrcyBoYXZlIHJ1blxuXHRcdGNvbnN0IHNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbigpO1xuXG5cdFx0aWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24udHlwZSAhPT0gJ05vbmUnKSB7XG5cdFx0XHQvKiogQHR5cGUge1JhbmdlW119ICovXG5cdFx0XHRjb25zdCByYW5nZXMgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSArPSAxKSB7XG5cdFx0XHRcdHJhbmdlcy5wdXNoKHNlbGVjdGlvbi5nZXRSYW5nZUF0KGkpKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCAhPT0gcmFuZ2VzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uLnJhbmdlQ291bnQ7IGkgKz0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGEgPSByYW5nZXNbaV07XG5cdFx0XHRcdFx0Y29uc3QgYiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KGkpO1xuXG5cdFx0XHRcdFx0Ly8gd2UgbmVlZCB0byBkbyBhIGRlZXAgY29tcGFyaXNvbiByYXRoZXIgdGhhbiBqdXN0IGBhICE9PSBiYCBiZWNhdXNlXG5cdFx0XHRcdFx0Ly8gU2FmYXJpIGJlaGF2ZXMgZGlmZmVyZW50bHkgdG8gb3RoZXIgYnJvd3NlcnNcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRhLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICE9PSBiLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIHx8XG5cdFx0XHRcdFx0XHRhLnN0YXJ0Q29udGFpbmVyICE9PSBiLnN0YXJ0Q29udGFpbmVyIHx8XG5cdFx0XHRcdFx0XHRhLmVuZENvbnRhaW5lciAhPT0gYi5lbmRDb250YWluZXIgfHxcblx0XHRcdFx0XHRcdGEuc3RhcnRPZmZzZXQgIT09IGIuc3RhcnRPZmZzZXQgfHxcblx0XHRcdFx0XHRcdGEuZW5kT2Zmc2V0ICE9PSBiLmVuZE9mZnNldFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIHRoZSBzZWxlY3Rpb24gaGFzbid0IGNoYW5nZWQgKGFzIGEgcmVzdWx0IG9mIGFuIGVsZW1lbnQgYmVpbmcgKGF1dG8pZm9jdXNlZCxcblx0XHRcdFx0Ly8gb3IgYSBwcm9ncmFtbWF0aWMgc2VsZWN0aW9uLCB3ZSByZXNldCBldmVyeXRoaW5nIGFzIHBhcnQgb2YgdGhlIG5hdmlnYXRpb24pXG5cdFx0XHRcdC8vIGZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9raXQvaXNzdWVzLzg0Mzlcblx0XHRcdFx0c2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5OYXZpZ2F0aW9uVHlwZX0gVFxuICogQHBhcmFtIHtpbXBvcnQoJy4vdHlwZXMuanMnKS5OYXZpZ2F0aW9uU3RhdGV9IGN1cnJlbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3R5cGVzLmpzJykuTmF2aWdhdGlvbkludGVudCB8IHVuZGVmaW5lZH0gaW50ZW50XG4gKiBAcGFyYW0ge1VSTCB8IG51bGx9IHVybFxuICogQHBhcmFtIHtUfSB0eXBlXG4gKiBAcGFyYW0ge3sgeDogbnVtYmVyLCB5OiBudW1iZXIgfSB8IG51bGx9IFt0YXJnZXRfc2Nyb2xsXSBUaGUgc2Nyb2xsIHBvc2l0aW9uIGZvciB0aGUgdGFyZ2V0IChmb3IgcG9wc3RhdGUgbmF2aWdhdGlvbnMpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZV9uYXZpZ2F0aW9uKGN1cnJlbnQsIGludGVudCwgdXJsLCB0eXBlLCB0YXJnZXRfc2Nyb2xsID0gbnVsbCkge1xuXHQvKiogQHR5cGUgeyh2YWx1ZTogYW55KSA9PiB2b2lkfSAqL1xuXHRsZXQgZnVsZmlsO1xuXG5cdC8qKiBAdHlwZSB7KGVycm9yOiBhbnkpID0+IHZvaWR9ICovXG5cdGxldCByZWplY3Q7XG5cblx0Y29uc3QgY29tcGxldGUgPSBuZXcgUHJvbWlzZSgoZiwgcikgPT4ge1xuXHRcdGZ1bGZpbCA9IGY7XG5cdFx0cmVqZWN0ID0gcjtcblx0fSk7XG5cblx0Ly8gSGFuZGxlIGFueSBlcnJvcnMgb2ZmLWNoYWluIHNvIHRoYXQgaXQgZG9lc24ndCBzaG93IHVwIGFzIGFuIHVuaGFuZGxlZCByZWplY3Rpb25cblx0Y29tcGxldGUuY2F0Y2gobm9vcCk7XG5cblx0LyoqIEB0eXBlIHsoaW1wb3J0KCdAc3ZlbHRlanMva2l0JykuTmF2aWdhdGlvbiB8IGltcG9ydCgnQHN2ZWx0ZWpzL2tpdCcpLkFmdGVyTmF2aWdhdGUpICYgeyB0eXBlOiBUIH19ICovXG5cdGNvbnN0IG5hdmlnYXRpb24gPSAvKiogQHR5cGUge2FueX0gKi8gKHtcblx0XHRmcm9tOiB7XG5cdFx0XHRwYXJhbXM6IGN1cnJlbnQucGFyYW1zLFxuXHRcdFx0cm91dGU6IHsgaWQ6IGN1cnJlbnQucm91dGU/LmlkID8/IG51bGwgfSxcblx0XHRcdHVybDogY3VycmVudC51cmwsXG5cdFx0XHRzY3JvbGw6IHNjcm9sbF9zdGF0ZSgpXG5cdFx0fSxcblx0XHR0bzogdXJsICYmIHtcblx0XHRcdHBhcmFtczogaW50ZW50Py5wYXJhbXMgPz8gbnVsbCxcblx0XHRcdHJvdXRlOiB7IGlkOiBpbnRlbnQ/LnJvdXRlPy5pZCA/PyBudWxsIH0sXG5cdFx0XHR1cmwsXG5cdFx0XHRzY3JvbGw6IHRhcmdldF9zY3JvbGxcblx0XHR9LFxuXHRcdHdpbGxVbmxvYWQ6ICFpbnRlbnQsXG5cdFx0dHlwZSxcblx0XHRjb21wbGV0ZVxuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdG5hdmlnYXRpb24sXG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdGZ1bGZpbCxcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0cmVqZWN0XG5cdH07XG59XG5cbi8qKlxuICogVE9ETzogcmVtb3ZlIHRoaXMgaW4gMy4wIHdoZW4gdGhlIHBhZ2Ugc3RvcmUgaXMgYWxzbyByZW1vdmVkXG4gKlxuICogV2UgbmVlZCB0byBhc3NpZ24gYSBuZXcgcGFnZSBvYmplY3Qgc28gdGhhdCBzdWJzY3JpYmVycyBhcmUgY29ycmVjdGx5IG5vdGlmaWVkLlxuICogSG93ZXZlciwgc3ByZWFkaW5nIGB7IC4uLnBhZ2UgfWAgcmV0dXJucyBhbiBlbXB0eSBvYmplY3Qgc28gd2UgbWFudWFsbHlcbiAqIGFzc2lnbiB0byBlYWNoIHByb3BlcnR5IGluc3RlYWQuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJ0BzdmVsdGVqcy9raXQnKS5QYWdlfSBwYWdlXG4gKi9cbmZ1bmN0aW9uIGNsb25lX3BhZ2UocGFnZSkge1xuXHRyZXR1cm4ge1xuXHRcdGRhdGE6IHBhZ2UuZGF0YSxcblx0XHRlcnJvcjogcGFnZS5lcnJvcixcblx0XHRmb3JtOiBwYWdlLmZvcm0sXG5cdFx0cGFyYW1zOiBwYWdlLnBhcmFtcyxcblx0XHRyb3V0ZTogcGFnZS5yb3V0ZSxcblx0XHRzdGF0ZTogcGFnZS5zdGF0ZSxcblx0XHRzdGF0dXM6IHBhZ2Uuc3RhdHVzLFxuXHRcdHVybDogcGFnZS51cmxcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1VSTH0gdXJsXG4gKiBAcmV0dXJucyB7VVJMfVxuICovXG5mdW5jdGlvbiBkZWNvZGVfaGFzaCh1cmwpIHtcblx0Y29uc3QgbmV3X3VybCA9IG5ldyBVUkwodXJsKTtcblx0Ly8gU2FmYXJpLCBmb3Igc29tZSByZWFzb24sIGRvZXMgY2hhbmdlICMgdG8gJTIzLCB3aGVuIGVudGVyZWQgdGhyb3VnaCB0aGUgYWRkcmVzcyBiYXJcblx0bmV3X3VybC5oYXNoID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybC5oYXNoKTtcblx0cmV0dXJuIG5ld191cmw7XG59XG5cbi8qKlxuICogQHBhcmFtIHtVUkx9IHVybFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0X2lkKHVybCkge1xuXHRsZXQgaWQ7XG5cblx0aWYgKGFwcC5oYXNoKSB7XG5cdFx0Y29uc3QgWywgLCBzZWNvbmRdID0gdXJsLmhhc2guc3BsaXQoJyMnLCAzKTtcblx0XHRpZCA9IHNlY29uZCA/PyAnJztcblx0fSBlbHNlIHtcblx0XHRpZCA9IHVybC5oYXNoLnNsaWNlKDEpO1xuXHR9XG5cblx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpZCk7XG59XG5cbmlmIChERVYpIHtcblx0Ly8gTmFzdHkgaGFjayB0byBzaWxlbmNlIGhhcm1sZXNzIHdhcm5pbmdzIHRoZSB1c2VyIGNhbiBkbyBub3RoaW5nIGFib3V0XG5cdGNvbnN0IGNvbnNvbGVfd2FybiA9IGNvbnNvbGUud2Fybjtcblx0Y29uc29sZS53YXJuID0gZnVuY3Rpb24gd2FybiguLi5hcmdzKSB7XG5cdFx0aWYgKFxuXHRcdFx0YXJncy5sZW5ndGggPT09IDEgJiZcblx0XHRcdC88KExheW91dHxQYWdlfEVycm9yKShfW1xcdyRdKyk/PiB3YXMgY3JlYXRlZCAod2l0aCB1bmtub3dufHdpdGhvdXQgZXhwZWN0ZWQpIHByb3AgJyhkYXRhfGZvcm0pJy8udGVzdChcblx0XHRcdFx0YXJnc1swXVxuXHRcdFx0KVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zb2xlX3dhcm4oLi4uYXJncyk7XG5cdH07XG5cblx0aWYgKGltcG9ydC5tZXRhLmhvdCkge1xuXHRcdGltcG9ydC5tZXRhLmhvdC5vbigndml0ZTpiZWZvcmVVcGRhdGUnLCAoKSA9PiB7XG5cdFx0XHRpZiAoZXJyb3JlZCkge1xuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzVlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25GLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUM3RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDdFEsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ2hDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ3ZGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdEQsTUFBTSxDQUFDO0FBQ1AsQ0FBQyxhQUFhO0FBQ2QsQ0FBQyxlQUFlO0FBQ2hCLENBQUMsVUFBVTtBQUNYLENBQUMsY0FBYztBQUNmLENBQUM7QUFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUM1TSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUN2UyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFB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LEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzNOLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDL08sTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDaE8sTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDL04sTUFBTSxDQUFDO0FBQ1AsQ0FBQyxpQkFBaUI7QUFDbEIsQ0FBQyxvQkFBb0I7QUFDckIsQ0FBQyxpQkFBaUI7QUFDbEIsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQztBQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ2pOLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQy9PLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzlFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQ0FBc0MsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDaFEsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNuUSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDNU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztBQUU3TyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25CLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVsRixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ25CLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVE7QUFDaEUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtBQUNyRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNsSCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUNyRCxDQUFDLENBQUM7QUFDRixHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJOztBQUUxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWM7QUFDcEYsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQzFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDO0FBQ0YsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEQsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLOztBQUVuQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNOztBQUVwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUNuSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7QUFDL0UsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTtBQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs7QUFFdkksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDckQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBRXhCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTO0FBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7QUFFN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTs7QUFFZixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3ZNLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDckMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDeEMsQ0FBQyxDQUFDOztBQUVGLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVk7QUFDM0MsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ2hFLENBQUMsQ0FBQztBQUNGLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUM7QUFDL0MsQ0FBQzs7QUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFDRixRQUFRLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9FLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDOztBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDO0FBQ0Q7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDOUQsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUztBQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTO0FBQ2hJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ2hELENBQUMsQ0FBQztBQUNGLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pELENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNSLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSTtBQUMxQixDQUFDO0FBQ0QsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDekI7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUM5RCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3JCLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFDRixDQUFDO0FBQ0Q7O0FBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoSCxHQUFHLENBQUMsTUFBTTtBQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUMvQyxHQUFHLENBQUMscUJBQXFCO0FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUMvQyxHQUFHLENBQUMsb0JBQW9CO0FBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLEdBQUcsQ0FBQyxTQUFTO0FBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDekIsR0FBRyxDQUFDLE1BQU07O0FBRVYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRzs7QUFFZCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDMUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDbkYsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDeEYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsc0JBQXNCLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFakMsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7QUFDM0MsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXO0FBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0FBQ2hELENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV0QixDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUztBQUMvRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDaEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6SixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJOztBQUVyQixRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDbEIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwRDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ3JGLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3RSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDekYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVc7QUFDNUYsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2xDLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFL0IsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyx3QkFBd0I7QUFDeEYsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0UsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNkLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJO0FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNqRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7QUFDVixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ2pELENBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixDQUFDOztBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUNwQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ25CLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDckIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUNwQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ3pCLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUs7O0FBRXpCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsS0FBSzs7QUFFOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM5QyxHQUFHLENBQUMsSUFBSTs7QUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoSCxHQUFHLENBQUMscUJBQXFCOztBQUV6QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwQixHQUFHLENBQUMsd0JBQXdCOztBQUU1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxLQUFLOztBQUVULENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDM0QsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ3BFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPO0FBQ3BELENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xD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QUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUM1UCxDQUFDLENBQUMsQ0FBQztBQUNILENBQUM7O0FBRUQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsSUFBSTs7QUFFdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDOUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlD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QyxHQUFHLENBQUMsWUFBWTtBQUMzRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO0FBQzlFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDOUQsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENB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QyxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVO0FBQzlELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjO0FBQzVELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDOUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUM1RixDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNEOztBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRCxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxN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QztBQUN6QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztBQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxD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QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDckYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUMzRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFB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QyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJOztBQUV4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDNUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMs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QUNoQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLFlBQVk7O0FBRWQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDUixDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ1QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDVixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUNULENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxD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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7QUFFcEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDdkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYztBQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3hFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQzdELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVc7QUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDeEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQzdFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3JGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQy9FLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDM0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUztBQUMvRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUztBQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUztBQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTTtBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTtBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTtBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYztBQUM3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTTtBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFD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QUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLOztBQUU3RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3JFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7O0FBRXpDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JFLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNwRCxDQUFDOztBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxD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Q0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO0FBQzlELENBQUM7O0FBRUQsQ0FBQyxNQUFNLENBQUMsS0FBSztBQUNiOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFGLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRO0FBQzFELENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUNqRCxDQUFDLENBQUM7QUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDdkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ25ELENBQUMsTUFBTSxDQUFDLElBQUk7QUFDWjs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixRQUFRLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFMUQsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTFGLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOztBQUVyRCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBQ0YsQ0FBQzs7QUFFRCxDQUFDLE1BQU0sQ0FBQyxPQUFPO0FBQ2Y7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO0FBQ3BELENBQUMsQ0FBQztBQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDLE1BQU0sQ0FBQztBQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ1IsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDUixDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ1QsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUM7QUFDRixDQUFDLENBQUMs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Q0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDL0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzVDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7O0FBRS9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWxCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FB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QUFDM0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUNuRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7QUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUk7QUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRUwsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVKLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN2RSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztBQUNyRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3ZFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUN6QixDQUFDLENBQUM7QUFDRixDQUFDOztBQUVELENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxHQUFHO0FBQ0wsQ0FBQyxDQUFDLE1BQU07QUFDUixDQUFDLENBQUMsTUFBTTtBQUNSLENBQUMsQ0FBQyxNQUFNO0FBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUc7QUFDYixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSTtBQUNiLENBQUMsQ0FBQyxLQUFLO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNoRixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ2pHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDdEYsQ0FBQyxDQUFDO0FBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxRCxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSTtBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO0FBQ1osQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUM7QUFDRixDQUFDO0FBQ0Q7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNO0FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSztBQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVHLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztBQUVoRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNwRCxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSTs7QUFFNUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVsRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFcEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDbEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVKLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUNuRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDbEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNqRixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFD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QUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7QUFFNUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFSixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUNsQixDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFTixDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBRW5CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQzdFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDL0IsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDekIsQ0FBQyxDQUFDLE1BQU07QUFDUixDQUFDOztBQUVELENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDaEI7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDOUYsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUN6RyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN2RSxDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTtBQUNqQixDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNOztBQUVqRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7QUFDOUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTTs7QUFFdkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7O0FBRXJDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFbEMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxD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QUMsQ0FBQyxDQUFDLEdBQUc7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYztBQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7QUFDVixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO0FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMs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QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUM5QyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDL0UsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxNQUFNO0FBQ1IsQ0FBQzs7QUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUM5QixDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMs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LENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtBQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRO0FBQzlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDO0FBQ0YsQ0FBQzs7QUFFRCxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXZCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN2RSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUTs7QUFFckMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFROztBQUUvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBQ0YsQ0FBQzs7QUFFRCxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDN0MsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNqQjs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDcEQsQ0FBQyxDQUFDO0FBQ0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUNuQixDQUFDOztBQUVELENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ2hCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQzs7QUFFRCxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7QUFDakMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDOztBQUVuQyxDQUFDLE1BQU0sQ0FBQztBQUNSLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3RixDQUFDLENBQUM7QUFDRjs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNGLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7QUFFekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUc7QUFDbkksQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTztBQUMxSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7QUFDakIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUM1RDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbEssQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRO0FBQ3BWLENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNKLENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNsTixDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPO0FBQzNILENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtBQUNqQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzdEOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7QUFDekksQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSTtBQUN0USxDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU87QUFDdkksQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTztBQUN2SCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xILENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtBQUNqQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3pEOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ2xMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQ25FLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtBQUNqQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLENBQUM7O0FBRUQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkUsQ0FBQzs7QUFFRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDcEIsQ0FBQztBQUNEOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU87QUFDckgsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDNUksQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQzVQLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTO0FBQzFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ2hKLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ3hKLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZO0FBQy9MLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDN0ksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO0FBQy9GLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUMxQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQzs7QUFFRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDdkIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUs7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0FBQzVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQzs7QUFFRCxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTztBQUMxTixDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUN4SixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHO0FBQ25ILENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVE7QUFDN0ksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQzNGLENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDL0MsQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlELENBQUM7O0FBRUQsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7O0FBRTNCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JCOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQzVFLENBQUMsQ0FBQztBQUNGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNSLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNuRCxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUNEOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxD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R0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPO0FBQ3BFLENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUMzSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYTtBQUNuSCxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRO0FBQzNILENBQUM7QUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVILENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvRCxDQUFDOztBQUVELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUM5QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7O0FBRXZELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEYsQ0FBQzs7QUFFRCxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO0FBQzNDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDcEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQzs7QUFFRCxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUNuRCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDOztBQUVBLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQzdFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVTtBQUNuRSxDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUssQ0FBQztBQUNELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUztBQUN6RCxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtBQUN0RSxDQUFDO0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9ELENBQUM7O0FBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztBQUNsRixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ25GLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7O0FBRTVELENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FB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QUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7QUFDakIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0QsQ0FBQzs7QUFFRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0UsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFB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QUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9ELENBQUM7O0FBRUQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDM0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSTtBQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU07O0FBRTdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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SyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQy9DLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtBQUM5RSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTTs7QUFFcEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3BGLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07O0FBRWhCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQzlFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07O0FBRWxCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ25FLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTTtBQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDVCxDQUFDLENBQUM7O0FBRUYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVc7O0FBRW5ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3BILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3ZHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUTtBQUN0RyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztBQUNqRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzlDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxNQUFNOztBQUVULENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNOztBQUV0QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxD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QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87QUFDckUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQy9ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRTFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN6RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM1RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTtBQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRUosQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ1YsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQ2pFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJOztBQUV6QixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQzs7QUFFakQsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzs7QUFFbEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTTs7QUFFckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUs7QUFDdkUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQzFCLENBQUMsQ0FBQzs7QUFFRixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUV4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRUwsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ2xHLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRUosQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxHQUFHO0FBQ04sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVM7QUFDL0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDN0IsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7QUFDckUsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU07O0FBRXBDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQ3hELENBQUMsQ0FBQyxDQUFDOztBQUVILENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7O0FBRWhHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07O0FBRXJELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTs7QUFFakMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7QUFFckQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNOztBQUU5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDNUYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDNUUsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU07O0FBRS9DLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUMxQixDQUFDLENBQUM7QUFDRixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVE7QUFDdkIsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3RixDQUFDLENBQUM7QUFDRixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSTs7QUFFaEIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7O0FBRW5DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUMsR0FBRyxDQUFDLFlBQVk7O0FBRWpCLENBQUMsRUFBRSxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSTtBQUNsRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUYsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNGLENBQUM7O0FBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsR0FBRyxDQUFDLE1BQU07QUFDWCxD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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdkUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7QUFDL0MsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUN0RixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQzVHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSztBQUN2RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU87QUFDYixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUMsQ0FBQzs7QUFFRCxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDMUQ7O0FBRUEsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVoRixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFNUIsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQzs7QUFFRCxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN2QixDQUFDLENBQUM7O0FBRUYsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVMLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQ25DLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFF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QUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87QUFDeEQsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUs7O0FBRXZDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztBQUMxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDMUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7QUFFaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNyRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUNsRixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQzFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUNwRixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWpELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDN0UsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7QUFFM0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDdkUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzVELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztBQUMzRCxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWxDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVwQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNOztBQUV0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7O0FBRXRDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRUosQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQ3JGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVU7QUFDakYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUNGLENBQUM7QUFDRDs7QUFFQSxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVztBQUN4SCxDQUFDLENBQUM7QUFDRixRQUFRLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxHQUFHLENBQUMsTUFBTTs7QUFFWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxHQUFHLENBQUMsTUFBTTs7QUFFWCxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDM0UsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7QUFFckIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FB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