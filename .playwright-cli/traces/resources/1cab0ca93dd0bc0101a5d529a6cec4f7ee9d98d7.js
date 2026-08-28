import { a as legacy_mode_flag, t as async_mode_flag } from "/node_modules/.vite/deps/flags-Cdo780EX.js?v=1b1d2797";
import { $ as get_first_child, $n as lifecycle_outside_component, A as remove_effect_dom, An as hydrating, Ar as has_own_property, B as without_reactive_context, Bn as each_key_duplicate, Br as FILENAME, C as effect_root, Ct as flushSync, D as managed, Dn as hydrate_next, Dr as get_descriptor, En as safe_not_equal, Et as previous_batch, F as user_effect, Fn as set_hydrating, Fr as object_keys, Ft as run_after_blockers, Gn as invalid_snippet, Gr as NAMESPACE_SVG, H as autofocus, Hn as get_abort_signal_outside_reaction, Hr as HYDRATION_ERROR, I as user_pre_effect, In as skip_nodes, Ir as run, J as create_comment, Jn as props_rest_readonly, Kn as lifecycle_legacy_only, Kr as UNINITIALIZED, L as validate_effect, Ln as bind_invalid_checkbox_value, Lr as run_all, M as resume_effect, Mn as read_hydration_instruction, Mr as is_function, Mt as flatten, N as teardown, Nn as reset, Nr as is_promise, O as move_effect, On as hydrate_node, Or as get_descriptors, Ot as derived, P as template_effect, Pn as set_hydrate_node, Pr as noop, Qn as invalid_snippet_arguments, R as listen, Rn as component_api_changed, Rt as unset_context, S as effect, Sr as array_from, Tn as dynamic_void_element_content, Tt as is_flushing_sync, Un as hydratable_missing_but_required, Ur as NAMESPACE_HTML, Ut as capture_store_binding, V as add_form_reset_listener, Vn as each_key_volatile, Vr as HMR, Wr as NAMESPACE_MATHML, Xn as experimental_async_required, Y as create_element, Yn as rune_outside_svelte, Z as create_text, _ as branch, a as get, an as queue_micro_task, at as should_defer_append, b as destroy_effect, br as STYLE_CACHE, bt as Batch, c as set_active_effect, cr as EFFECT_OFFSCREEN, d as tick, dr as HEAD_EFFECT, er as snippet_without_render_tag, et as get_next_sibling, f as untrack, fr as HMR_ANCHOR, ft as internal_set, g as block, gr as LOADING_ATTR_SYMBOL, gt as source, hr as LEGACY_PROPS, ht as set, i as deep_read_state, ir as CLASS_CACHE, j as render_effect, jr as is_array, jt as capture, k as pause_effect, kr as get_prototype_of, kt as derived_safe_equal, l as set_active_reaction, ln as dev_current_component_function, lr as EFFECT_TRANSPARENT, lt as is, mn as is_runes, mr as IS_XHTML, n as active_reaction, nr as svelte_element_invalid_this_value, o as is_destroying_effect, pt as mutable_source, q as clear_text_content, qn as props_invalid_value, rr as ATTRIBUTES_CACHE, sn as component_context, t as active_effect, tr as store_invalid_shape, un as dev_stack, ur as FORM_RESET_HANDLER, ut as proxy, vn as set_dev_current_component_function, vt as update, wn as snapshot, wr as define_property, x as eager_effect, xn as tag, xt as current_batch, yn as get_error, yr as STATE_SYMBOL, z as listen_to_event_and_reset_event, zn as component_api_invalid_new, zr as ATTACHMENT_KEY } from "/node_modules/.vite/deps/runtime-CvqZjhGP.js?v=1b1d2797";
import "/node_modules/.vite/deps/esm-env-D6lI19eD.js?v=1b1d2797";
import { _ as select_multiple_invalid_value, a as console_log_state, d as hydration_mismatch, f as invalid_raw_snippet_render, g as ownership_invalid_mutation, h as ownership_invalid_binding, i as binding_property_non_reactive, l as hydration_attribute_changed, t as assignment_value_stale, u as hydration_html_changed } from "/node_modules/.vite/deps/warnings-CPnO_FYA.js?v=1b1d2797";
import { a as delegated, i as delegate, r as create_event } from "/node_modules/.vite/deps/events-BMGcVxNO.js?v=1b1d2797";
import { C as is_raw_text_element, D as append, E as sanitize_location, L as create_fragment_from_html, O as assign_nodes, R as create_trusted_html, S as is_capture_event, T as normalize_attribute, b as can_delegate_event, g as set_should_intro, r as createClassComponent, v as should_intro, w as is_void, x as hash } from "/node_modules/.vite/deps/legacy-client-Dq7WBxVc.js?v=1b1d2797";
import { clsx as clsx$1 } from "/node_modules/.vite/deps/svelte_n_clsx.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/hydratable.js
/**
* @template T
* @param {string} key
* @param {() => T} fn
* @returns {T}
*/
function hydratable(key, fn) {
	if (!async_mode_flag) experimental_async_required("hydratable");
	if (hydrating) {
		const store = window.__svelte?.h;
		if (store?.has(key)) return store.get(key);
		hydratable_missing_but_required(key);
	}
	return fn();
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/validate.js
/**
* @param {() => string} tag_fn
* @returns {void}
*/
function validate_void_dynamic_element(tag_fn) {
	const tag = tag_fn();
	if (tag && is_void(tag)) dynamic_void_element_content(tag);
}
/** @param {() => unknown} tag_fn */
function validate_dynamic_element_tag(tag_fn) {
	const tag = tag_fn();
	if (tag && !(typeof tag === "string")) svelte_element_invalid_this_value();
}
/**
* @param {any} store
* @param {string} name
*/
function validate_store(store, name) {
	if (store != null && typeof store.subscribe !== "function") store_invalid_shape(name);
}
/**
* @template {(...args: any[]) => unknown} T
* @param {T} fn
*/
function prevent_snippet_stringification(fn) {
	fn.toString = () => {
		snippet_without_render_tag();
		return "";
	};
	return fn;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/branches.js
/** @import { Effect, TemplateNode } from '#client' */
/**
* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
*/
/**
* @template Key
*/
var BranchManager = class {
	/** @type {TemplateNode} */
	anchor;
	/** @type {Map<Batch, Key>} */
	#batches = /* @__PURE__ */ new Map();
	/**
	* Map of keys to effects that are currently rendered in the DOM.
	* These effects are visible and actively part of the document tree.
	* Example:
	* ```
	* {#if condition}
	* 	foo
	* {:else}
	* 	bar
	* {/if}
	* ```
	* Can result in the entries `true->Effect` and `false->Effect`
	* @type {Map<Key, Effect>}
	*/
	#onscreen = /* @__PURE__ */ new Map();
	/**
	* Similar to #onscreen with respect to the keys, but contains branches that are not yet
	* in the DOM, because their insertion is deferred.
	* @type {Map<Key, Branch>}
	*/
	#offscreen = /* @__PURE__ */ new Map();
	/**
	* Keys of effects that are currently outroing
	* @type {Set<Key>}
	*/
	#outroing = /* @__PURE__ */ new Set();
	/**
	* Whether to pause (i.e. outro) on change, or destroy immediately.
	* This is necessary for `<svelte:element>`
	*/
	#transition = true;
	/**
	* @param {TemplateNode} anchor
	* @param {boolean} transition
	*/
	constructor(anchor, transition = true) {
		this.anchor = anchor;
		this.#transition = transition;
	}
	/**
	* @param {Batch} batch
	*/
	#commit = (batch) => {
		if (!this.#batches.has(batch)) return;
		var key = this.#batches.get(batch);
		var onscreen = this.#onscreen.get(key);
		if (onscreen) {
			resume_effect(onscreen);
			this.#outroing.delete(key);
		} else {
			var offscreen = this.#offscreen.get(key);
			if (offscreen) {
				resume_effect(offscreen.effect);
				this.#onscreen.set(key, offscreen.effect);
				this.#offscreen.delete(key);
				/** @type {any} */ offscreen.fragment.lastChild[HMR_ANCHOR] = this.anchor;
				/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
				this.anchor.before(offscreen.fragment);
				onscreen = offscreen.effect;
			}
		}
		for (const [b, k] of this.#batches) {
			this.#batches.delete(b);
			if (b === batch) break;
			const offscreen = this.#offscreen.get(k);
			if (offscreen) {
				destroy_effect(offscreen.effect);
				this.#offscreen.delete(k);
			}
		}
		for (const [k, effect] of this.#onscreen) {
			if (k === key || this.#outroing.has(k)) continue;
			const on_destroy = () => {
				if (Array.from(this.#batches.values()).includes(k)) {
					var fragment = document.createDocumentFragment();
					move_effect(effect, fragment);
					fragment.append(create_text());
					this.#offscreen.set(k, {
						effect,
						fragment
					});
				} else destroy_effect(effect);
				this.#outroing.delete(k);
				this.#onscreen.delete(k);
			};
			if (this.#transition || !onscreen) {
				this.#outroing.add(k);
				pause_effect(effect, on_destroy, false);
			} else on_destroy();
		}
	};
	/**
	* @param {Batch} batch
	*/
	#discard = (batch) => {
		this.#batches.delete(batch);
		const keys = Array.from(this.#batches.values());
		for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
			destroy_effect(branch.effect);
			this.#offscreen.delete(k);
		}
	};
	/**
	*
	* @param {any} key
	* @param {null | ((target: TemplateNode) => void)} fn
	*/
	ensure(key, fn) {
		var batch = current_batch;
		var defer = should_defer_append();
		if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) if (defer) {
			var fragment = document.createDocumentFragment();
			var target = create_text();
			fragment.append(target);
			this.#offscreen.set(key, {
				effect: branch(() => fn(target)),
				fragment
			});
		} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
		this.#batches.set(batch, key);
		if (defer) {
			for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
			else batch.skip_effect(effect);
			for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
			else batch.skip_effect(branch.effect);
			batch.oncommit(this.#commit);
			batch.ondiscard(this.#discard);
		} else {
			if (hydrating) this.anchor = hydrate_node;
			this.#commit(batch);
		}
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/snippet.js
/** @import { Snippet } from 'svelte' */
/** @import { TemplateNode } from '#client' */
/** @import { Getters } from '#shared' */
/**
* @template {(node: TemplateNode, ...args: any[]) => void} SnippetFn
* @param {TemplateNode} node
* @param {() => SnippetFn | null | undefined} get_snippet
* @param {(() => any)[]} args
* @returns {void}
*/
function snippet(node, get_snippet, ...args) {
	var branches = new BranchManager(node);
	block(() => {
		const snippet = get_snippet() ?? null;
		if (snippet == null) invalid_snippet();
		branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
	}, EFFECT_TRANSPARENT);
}
/**
* In development, wrap the snippet function so that it passes validation, and so that the
* correct component context is set for ownership checks
* @param {any} component
* @param {(node: TemplateNode, ...args: any[]) => void} fn
*/
function wrap_snippet(component, fn) {
	const snippet = (node, ...args) => {
		var previous_component_function = dev_current_component_function;
		set_dev_current_component_function(component);
		try {
			return fn(node, ...args);
		} finally {
			set_dev_current_component_function(previous_component_function);
		}
	};
	prevent_snippet_stringification(snippet);
	return snippet;
}
/**
* Create a snippet programmatically
* @template {unknown[]} Params
* @param {(...params: Getters<Params>) => {
*   render: () => string
*   setup?: (element: Element) => void | (() => void)
* }} fn
* @returns {Snippet<Params>}
*/
function createRawSnippet(fn) {
	return (anchor, ...params) => {
		var snippet = fn(...params);
		/** @type {Element} */
		var element;
		if (hydrating) {
			element = hydrate_node;
			hydrate_next();
		} else {
			element = /* @__PURE__ */ get_first_child(create_fragment_from_html(snippet.render().trim()));
			if (/* @__PURE__ */ get_next_sibling(element) !== null || element.nodeType !== 1) invalid_raw_snippet_render();
			anchor.before(element);
		}
		const result = snippet.setup?.(element);
		assign_nodes(element, element);
		if (typeof result === "function") teardown(result);
	};
}
{
	/**
	* @param {string} rune
	*/
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			/** @type {any} */
			let value;
			Object.defineProperty(globalThis, rune, {
				configurable: true,
				get: () => {
					if (value !== void 0) return value;
					rune_outside_svelte(rune);
				},
				set: (v) => {
					value = v;
				}
			});
		}
	}
	throw_rune_error("$state");
	throw_rune_error("$effect");
	throw_rune_error("$derived");
	throw_rune_error("$inspect");
	throw_rune_error("$props");
	throw_rune_error("$bindable");
}
/**
* Returns an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that aborts when the current [derived](https://svelte.dev/docs/svelte/$derived) or [effect](https://svelte.dev/docs/svelte/$effect) re-runs or is destroyed.
*
* Must be called while a derived or effect is running.
*
* ```svelte
* <script>
* 	import { getAbortSignal } from 'svelte';
*
* 	let { id } = $props();
*
* 	async function getData(id) {
* 		const response = await fetch(`/items/${id}`, {
* 			signal: getAbortSignal()
* 		});
*
* 		return await response.json();
* 	}
*
* 	const data = $derived(await getData(id));
* <\/script>
* ```
*/
function getAbortSignal() {
	if (active_reaction === null) get_abort_signal_outside_reaction();
	return (active_reaction.ac ??= new AbortController()).signal;
}
/**
* `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
* Unlike `$effect`, the provided function only runs once.
*
* It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
* it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
* it will be called when the component is unmounted.
*
* `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
*
* @template T
* @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
* @returns {void}
*/
function onMount(fn) {
	if (component_context === null) lifecycle_outside_component("onMount");
	if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
	else user_effect(() => {
		const cleanup = untrack(fn);
		if (typeof cleanup === "function") return cleanup;
	});
}
/**
* Schedules a callback to run immediately before the component is unmounted.
*
* Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
* only one that runs inside a server-side component.
*
* @param {() => any} fn
* @returns {void}
*/
function onDestroy(fn) {
	if (component_context === null) lifecycle_outside_component("onDestroy");
	onMount(() => () => untrack(fn));
}
/**
* @template [T=any]
* @param {string} type
* @param {T} [detail]
* @param {any}params_0
* @returns {CustomEvent<T>}
*/
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, {
		detail,
		bubbles,
		cancelable
	});
}
/**
* Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs/svelte/legacy-on#Component-events).
* Event dispatchers are functions that can take two arguments: `name` and `detail`.
*
* Component events created with `createEventDispatcher` create a
* [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
* These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
* The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
* property and can contain any type of data.
*
* The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
* ```ts
* const dispatch = createEventDispatcher<{
*  loaded: null; // does not take a detail argument
*  change: string; // takes a detail argument of type string, which is required
*  optional: number | null; // takes an optional detail argument of type number
* }>();
* ```
*
* @deprecated Use callback props and/or the `$host()` rune instead — see [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events)
* @template {Record<string, any>} [EventMap = any]
* @returns {EventDispatcher<EventMap>}
*/
function createEventDispatcher() {
	const active_component_context = component_context;
	if (active_component_context === null) lifecycle_outside_component("createEventDispatcher");
	/**
	* @param [detail]
	* @param [options]
	*/
	return (type, detail, options) => {
		const events = active_component_context.s.$$events?.[type];
		if (events) {
			const callbacks = is_array(events) ? events.slice() : [events];
			const event = create_custom_event(type, detail, options);
			for (const fn of callbacks) fn.call(active_component_context.x, event);
			return !event.defaultPrevented;
		}
		return true;
	};
}
/**
* Schedules a callback to run immediately before the component is updated after any state change.
*
* The first time the callback runs will be before the initial `onMount`.
*
* In runes mode use `$effect.pre` instead.
*
* @deprecated Use [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre) instead
* @param {() => void} fn
* @returns {void}
*/
function beforeUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("beforeUpdate");
	if (component_context.l === null) lifecycle_legacy_only("beforeUpdate");
	init_update_callbacks(component_context).b.push(fn);
}
/**
* Schedules a callback to run immediately after the component has been updated.
*
* The first time the callback runs will be after the initial `onMount`.
*
* In runes mode use `$effect` instead.
*
* @deprecated Use [`$effect`](https://svelte.dev/docs/svelte/$effect) instead
* @param {() => void} fn
* @returns {void}
*/
function afterUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("afterUpdate");
	if (component_context.l === null) lifecycle_legacy_only("afterUpdate");
	init_update_callbacks(component_context).a.push(fn);
}
/**
* Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
* @param {ComponentContext} context
*/
function init_update_callbacks(context) {
	var l = context.l;
	return l.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/attachments/index.js
/** @import { Action, ActionReturn } from '../action/public' */
/** @import { Attachment } from './public' */
/**
* Creates an object key that will be recognised as an attachment when the object is spread onto an element,
* as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
* is generally not needed when building an app.
*
* ```svelte
* <script>
* 	import { createAttachmentKey } from 'svelte/attachments';
*
* 	const props = {
* 		class: 'cool',
* 		onclick: () => alert('clicked'),
* 		[createAttachmentKey()]: (node) => {
* 			node.textContent = 'attached!';
* 		}
* 	};
* <\/script>
*
* <button {...props}>click me</button>
* ```
* @since 5.29
*/
function createAttachmentKey() {
	return Symbol(ATTACHMENT_KEY);
}
/**
* Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
* It's useful if you want to start using attachments on components but you have actions provided by a library.
*
* Note that the second argument, if provided, must be a function that _returns_ the argument to the
* action function, not the argument itself.
*
* ```svelte
* <!-- with an action -->
* <div use:foo={bar}>...</div>
*
* <!-- with an attachment -->
* <div {@attach fromAction(foo, () => bar)}>...</div>
* ```
* @template {EventTarget} E
* @template {unknown} T
* @overload
* @param {Action<E, T> | ((element: E, arg: T) => void | ActionReturn<T>)} action The action function
* @param {() => T} fn A function that returns the argument for the action
* @returns {Attachment<E>}
*/
/**
* Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
* It's useful if you want to start using attachments on components but you have actions provided by a library.
*
* Note that the second argument, if provided, must be a function that _returns_ the argument to the
* action function, not the argument itself.
*
* ```svelte
* <!-- with an action -->
* <div use:foo={bar}>...</div>
*
* <!-- with an attachment -->
* <div {@attach fromAction(foo, () => bar)}>...</div>
* ```
* @template {EventTarget} E
* @overload
* @param {Action<E, void> | ((element: E) => void | ActionReturn<void>)} action The action function
* @returns {Attachment<E>}
*/
/**
* Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior.
* It's useful if you want to start using attachments on components but you have actions provided by a library.
*
* Note that the second argument, if provided, must be a function that _returns_ the argument to the
* action function, not the argument itself.
*
* ```svelte
* <!-- with an action -->
* <div use:foo={bar}>...</div>
*
* <!-- with an attachment -->
* <div {@attach fromAction(foo, () => bar)}>...</div>
* ```
*
* @template {EventTarget} E
* @template {unknown} T
* @param {Action<E, T> | ((element: E, arg: T) => void | ActionReturn<T>)} action The action function
* @param {() => T} fn A function that returns the argument for the action
* @returns {Attachment<E>}
* @since 5.32
*/
function fromAction(action, fn = noop) {
	return (element) => {
		const { update, destroy } = untrack(() => action(element, fn()) ?? {});
		if (update) {
			var ran = false;
			render_effect(() => {
				const arg = fn();
				if (ran) update(arg);
			});
			ran = true;
		}
		if (destroy) teardown(destroy);
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/assign.js
/**
*
* @param {any} a
* @param {any} b
* @param {string} property
* @param {string} location
*/
function compare(a, b, property, location) {
	if (a !== b && typeof b === "object" && STATE_SYMBOL in b) assignment_value_stale(property, sanitize_location(location));
	return a;
}
/**
* @param {any} object
* @param {string} property
* @param {string} operator
* @param {any} rhs
* @param {string} location
*/
function assign(object, property, operator, rhs, location) {
	return compare(operator === "=" ? object[property] = rhs : operator === "&&=" ? object[property] &&= rhs() : operator === "||=" ? object[property] ||= rhs() : operator === "??=" ? object[property] ??= rhs() : null, untrack(() => object[property]), property, location);
}
/**
* @param {any} object
* @param {string} property
* @param {string} operator
* @param {any} rhs
* @param {string} location
*/
async function assign_async(object, property, operator, rhs, location) {
	return compare(operator === "=" ? object[property] = await rhs : operator === "&&=" ? object[property] &&= await rhs() : operator === "||=" ? object[property] ||= await rhs() : operator === "??=" ? object[property] ??= await rhs() : null, untrack(() => object[property]), property, location);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/css.js
/** @type {Map<String, Set<HTMLStyleElement>>} */
var all_styles = /* @__PURE__ */ new Map();
/**
* @param {String} hash
* @param {HTMLStyleElement} style
*/
function register_style(hash, style) {
	var styles = all_styles.get(hash);
	if (!styles) {
		styles = /* @__PURE__ */ new Set();
		all_styles.set(hash, styles);
	}
	styles.add(style);
}
/**
* @param {String} hash
*/
function cleanup_styles(hash) {
	var styles = all_styles.get(hash);
	if (!styles) return;
	for (const style of styles) style.remove();
	all_styles.delete(hash);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/elements.js
/** @import { SourceLocation } from '#client' */
/**
* @param {any} fn
* @param {string} filename
* @param {SourceLocation[]} locations
* @returns {any}
*/
function add_locations(fn, filename, locations) {
	return (...args) => {
		const dom = fn(...args);
		assign_locations(hydrating ? dom : dom.nodeType === 11 ? dom.firstChild : dom, filename, locations);
		return dom;
	};
}
/**
* @param {Element} element
* @param {string} filename
* @param {SourceLocation} location
*/
function assign_location(element, filename, location) {
	element.__svelte_meta = {
		parent: dev_stack,
		loc: {
			file: filename,
			line: location[0],
			column: location[1]
		}
	};
	if (location[2]) assign_locations(element.firstChild, filename, location[2]);
}
/**
* @param {Node | null} node
* @param {string} filename
* @param {SourceLocation[]} locations
*/
function assign_locations(node, filename, locations) {
	var i = 0;
	var depth = 0;
	while (node && i < locations.length) {
		if (hydrating && node.nodeType === 8) {
			var comment = node;
			if (comment.data[0] === "[") depth += 1;
			else if (comment.data[0] === "]") depth -= 1;
		}
		if (depth === 0 && node.nodeType === 1) assign_location(node, filename, locations[i++]);
		node = node.nextSibling;
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/hmr.js
/** @import { Effect, TemplateNode } from '#client' */
/**
* @template {(anchor: Comment, props: any) => any} Component
* @param {Component} fn
*/
function hmr(fn) {
	const current = source(fn);
	/**
	* @param {TemplateNode} initial_anchor
	* @param {any} props
	*/
	function wrapper(initial_anchor, props) {
		let component = {};
		let instance = {};
		/** @type {Effect} */
		let effect;
		let ran = false;
		let anchor = initial_anchor;
		block(() => {
			if (component === (component = get(current))) return;
			if (effect) {
				for (var k in instance) delete instance[k];
				destroy_effect(effect);
			}
			effect = branch(() => {
				anchor = anchor[HMR_ANCHOR] ?? anchor;
				if (ran) set_should_intro(false);
				var result = new.target ? new component(anchor, props) : component(anchor, props);
				if (result) Object.defineProperties(instance, Object.getOwnPropertyDescriptors(result));
				if (ran) set_should_intro(true);
			});
			/** @type {Effect} */ active_effect.nodes = effect.nodes;
		}, EFFECT_TRANSPARENT);
		ran = true;
		if (hydrating) anchor = hydrate_node;
		return instance;
	}
	wrapper[FILENAME] = fn[FILENAME];
	wrapper[HMR] = {
		fn,
		current,
		update: (incoming) => {
			set(wrapper[HMR].current, incoming[HMR].fn);
			incoming[HMR].current = wrapper[HMR].current;
		}
	};
	return wrapper;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/ownership.js
/** @typedef {{ file: string, line: number, column: number }} Location */
/**
* Sets up a validator that
* - traverses the path of a prop to find out if it is allowed to be mutated
* - checks that the binding chain is not interrupted
* @param {Record<string, any>} props
*/
function create_ownership_validator(props) {
	const component = component_context?.function;
	const parent = component_context?.p?.function;
	return {
		/**
		* @param {string} prop
		* @param {any[]} path
		* @param {any} result
		* @param {number} line
		* @param {number} column
		*/
		mutation: (prop, path, result, line, column) => {
			const name = path[0];
			if (is_bound_or_unset(props, name) || !parent) return result;
			/** @type {any} */
			let value = props;
			for (let i = 0; i < path.length - 1; i++) {
				value = value[path[i]];
				if (!value?.[STATE_SYMBOL]) return result;
			}
			ownership_invalid_mutation(name, sanitize_location(`${component[FILENAME]}:${line}:${column}`), prop, parent[FILENAME]);
			return result;
		},
		/**
		* @param {any} key
		* @param {any} child_component
		* @param {() => any} value
		*/
		binding: (key, child_component, value) => {
			if (!is_bound_or_unset(props, key) && parent && value()?.[STATE_SYMBOL]) ownership_invalid_binding(component[FILENAME], key, child_component[FILENAME], parent[FILENAME]);
		}
	};
}
/**
* @param {Record<string, any>} props
* @param {string} prop_name
*/
function is_bound_or_unset(props, prop_name) {
	const is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
	return !!get_descriptor(props, prop_name)?.set || is_entry_props && prop_name in props || !(prop_name in props);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/legacy.js
/** @param {Function & { [FILENAME]: string }} target */
function check_target(target) {
	if (target) component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
}
function legacy_api() {
	const component = component_context?.function;
	/** @param {string} method */
	function error(method) {
		component_api_changed(method, component[FILENAME]);
	}
	return {
		$destroy: () => error("$destroy()"),
		$on: () => error("$on(...)"),
		$set: () => error("$set(...)")
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/inspect.js
/**
* @param {() => any[]} get_value
* @param {Function} inspector
* @param {boolean} show_stack
*/
function inspect(get_value, inspector, show_stack = false) {
	validate_effect("$inspect");
	let initial = true;
	let error = UNINITIALIZED;
	eager_effect(() => {
		error = UNINITIALIZED;
		try {
			var value = get_value();
		} catch (e) {
			error = e;
			return;
		}
		var snap = snapshot(value, true, true);
		untrack(() => {
			if (show_stack) {
				inspector(...snap);
				if (!initial) {
					const stack = get_error("$inspect(...)");
					if (stack) {
						console.groupCollapsed("stack trace");
						console.log(stack);
						console.groupEnd();
					}
				}
			} else inspector(initial ? "init" : "update", ...snap);
		});
		initial = false;
	});
	render_effect(() => {
		try {
			get_value();
		} catch {}
		if (error !== UNINITIALIZED) {
			console.error(error);
			error = UNINITIALIZED;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/async.js
/** @import { Blocker, TemplateNode, Value } from '#client' */
/**
* @param {TemplateNode} node
* @param {Blocker[]} blockers
* @param {Array<() => Promise<any>>} expressions
* @param {(anchor: TemplateNode, ...deriveds: Value[]) => void} fn
*/
function async(node, blockers = [], expressions = [], fn) {
	var was_hydrating = hydrating;
	var end = null;
	if (was_hydrating) {
		hydrate_next();
		end = skip_nodes(false);
		assign_nodes(node, end);
	}
	if (expressions.length === 0 && blockers.every((b) => b.settled)) {
		fn(node);
		if (was_hydrating) set_hydrate_node(end);
		return;
	}
	if (was_hydrating) {
		var previous_hydrate_node = hydrate_node;
		set_hydrate_node(end);
	}
	flatten(blockers, [], expressions, (values) => {
		if (was_hydrating) {
			set_hydrating(true);
			set_hydrate_node(previous_hydrate_node);
		}
		try {
			for (const d of values) get(d);
			fn(node, ...values);
		} finally {
			if (was_hydrating) set_hydrating(false);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/validation.js
/**
* @param {Node} anchor
* @param {...(()=>any)[]} args
*/
function validate_snippet_args(anchor, ...args) {
	if (typeof anchor !== "object" || !(anchor instanceof Node)) invalid_snippet_arguments();
	for (let arg of args) if (typeof arg !== "function") invalid_snippet_arguments();
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/await.js
/** @import { Source, TemplateNode } from '#client' */
var PENDING = 0;
var THEN = 1;
var CATCH = 2;
/** @typedef {typeof PENDING | typeof THEN | typeof CATCH} AwaitState */
/**
* @template V
* @param {TemplateNode} node
* @param {(() => any)} get_input
* @param {null | ((anchor: Node) => void)} pending_fn
* @param {null | ((anchor: Node, value: Source<V>) => void)} then_fn
* @param {null | ((anchor: Node, error: unknown) => void)} catch_fn
* @returns {void}
*/
function await_block(node, get_input, pending_fn, then_fn, catch_fn) {
	if (hydrating) hydrate_next();
	var runes = is_runes();
	var v = UNINITIALIZED;
	var value = runes ? source(v) : /* @__PURE__ */ mutable_source(v, false, false);
	var error = runes ? source(v) : /* @__PURE__ */ mutable_source(v, false, false);
	value.label = "{#await ...} value";
	error.label = "{#await ...} error";
	var branches = new BranchManager(node);
	block(() => {
		var batch = current_batch;
		var input = get_input();
		var destroyed = false;
		/** Whether or not there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
		let mismatch = hydrating && is_promise(input) === (node.data === "[!");
		if (mismatch) {
			set_hydrate_node(skip_nodes());
			set_hydrating(false);
		}
		if (is_promise(input)) {
			var restore = capture();
			var resolved = false;
			/**
			* @param {() => void} fn
			*/
			const resolve = (fn) => {
				if (destroyed) return;
				resolved = true;
				restore(false);
				if (current_batch === batch) batch.deactivate();
				Batch.ensure();
				try {
					fn();
				} finally {
					unset_context(false);
					if (!is_flushing_sync) flushSync();
				}
			};
			input.then((v) => {
				resolve(() => {
					internal_set(value, v);
					branches.ensure(THEN, then_fn && ((target) => then_fn(target, value)));
				});
			}, (e) => {
				resolve(() => {
					internal_set(error, e);
					branches.ensure(CATCH, catch_fn && ((target) => catch_fn(target, error)));
					if (!catch_fn) throw error.v;
				});
			});
			if (hydrating) branches.ensure(PENDING, pending_fn);
			else queue_micro_task(() => {
				if (!resolved) resolve(() => {
					branches.ensure(PENDING, pending_fn);
				});
			});
		} else {
			internal_set(value, input);
			branches.ensure(THEN, then_fn && ((target) => then_fn(target, value)));
		}
		if (mismatch) set_hydrating(true);
		return () => {
			destroyed = true;
		};
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/if.js
/** @import { TemplateNode } from '#client' */
/**
* @param {TemplateNode} node
* @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
* @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
* @returns {void}
*/
function if_block(node, fn, elseif = false) {
	/** @type {TemplateNode | undefined} */
	var marker;
	if (hydrating) {
		marker = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	/**
	* @param {number | false} key
	* @param {null | ((anchor: Node) => void)} fn
	*/
	function update_branch(key, fn) {
		if (hydrating) {
			var data = read_hydration_instruction(marker);
			if (key !== parseInt(data.substring(1))) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(key, fn);
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(key, fn);
	}
	block(() => {
		var has_branch = false;
		fn((fn, key = 0) => {
			has_branch = true;
			update_branch(key, fn);
		});
		if (!has_branch) update_branch(-1, null);
	}, flags);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/key.js
/** @import { TemplateNode } from '#client' */
var NAN = Symbol("NaN");
/**
* @template V
* @param {TemplateNode} node
* @param {() => V} get_key
* @param {(anchor: Node) => TemplateNode | void} render_fn
* @returns {void}
*/
function key(node, get_key, render_fn) {
	if (hydrating) hydrate_next();
	var branches = new BranchManager(node);
	var legacy = !is_runes();
	block(() => {
		var key = get_key();
		if (key !== key) key = NAN;
		if (legacy && key !== null && typeof key === "object") key = {};
		branches.ensure(key, render_fn);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/css-props.js
/**
* @param {HTMLDivElement | SVGGElement} element
* @param {() => Record<string, string>} get_styles
* @returns {void}
*/
function css_props(element, get_styles) {
	if (hydrating) set_hydrate_node(/* @__PURE__ */ get_first_child(element));
	render_effect(() => {
		var styles = get_styles();
		for (var key in styles) {
			var value = styles[key];
			if (value) element.style.setProperty(key, value);
			else element.style.removeProperty(key);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/each.js
/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
/** @import { Batch } from '../../reactivity/batch.js'; */
/**
* @param {any} _
* @param {number} i
*/
function index(_, i) {
	return i;
}
/**
* Pause multiple effects simultaneously, and coordinate their
* subsequent destruction. Used in each blocks
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {null | Node} controlled_anchor
*/
function pause_effects(state, to_destroy, controlled_anchor) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	var length = to_destroy.length;
	/** @type {EachOutroGroup} */
	var group;
	var remaining = to_destroy.length;
	for (var i = 0; i < length; i++) {
		let effect = to_destroy[i];
		pause_effect(effect, () => {
			if (group) {
				group.pending.delete(effect);
				group.done.add(effect);
				if (group.pending.size === 0) {
					var groups = state.outrogroups;
					destroy_effects(state, array_from(group.done));
					groups.delete(group);
					if (groups.size === 0) state.outrogroups = null;
				}
			} else remaining -= 1;
		}, false);
	}
	if (remaining === 0) {
		var fast_path = transitions.length === 0 && controlled_anchor !== null;
		if (fast_path) {
			var anchor = controlled_anchor;
			var parent_node = anchor.parentNode;
			clear_text_content(parent_node);
			parent_node.append(anchor);
			state.items.clear();
		}
		destroy_effects(state, to_destroy, !fast_path);
	} else {
		group = {
			pending: new Set(to_destroy),
			done: /* @__PURE__ */ new Set()
		};
		(state.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
	}
}
/**
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {boolean} remove_dom
*/
function destroy_effects(state, to_destroy, remove_dom = true) {
	/** @type {Set<Effect> | undefined} */
	var preserved_effects;
	if (state.pending.size > 0) {
		preserved_effects = /* @__PURE__ */ new Set();
		for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
			/** @type {EachItem} */
			state.items.get(key).e
		);
	}
	for (var i = 0; i < to_destroy.length; i++) {
		var e = to_destroy[i];
		if (preserved_effects?.has(e)) {
			e.f |= EFFECT_OFFSCREEN;
			move_effect(e, document.createDocumentFragment());
		} else destroy_effect(to_destroy[i], remove_dom);
	}
}
/** @type {TemplateNode} */
var offscreen_anchor;
/**
* @template V
* @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
* @param {number} flags
* @param {() => V[]} get_collection
* @param {(value: V, index: number) => any} get_key
* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
* @param {null | ((anchor: Node) => void)} fallback_fn
* @returns {void}
*/
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	/** @type {Map<any, EachItem>} */
	var items = /* @__PURE__ */ new Map();
	if ((flags & 4) !== 0) {
		var parent_node = node;
		anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
	}
	if (hydrating) hydrate_next();
	/** @type {Effect | null} */
	var fallback = null;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	tag(each_array, "{#each ...}");
	/** @type {V[]} */
	var array;
	/** @type {Map<Batch, Set<any>>} */
	var pending = /* @__PURE__ */ new Map();
	var first_run = true;
	/**
	* @param {Batch} batch
	*/
	function commit(batch) {
		if ((state.effect.f & 16384) !== 0) return;
		state.pending.delete(batch);
		state.fallback = fallback;
		reconcile(state, array, anchor, flags, get_key);
		if (fallback !== null) if (array.length === 0) if ((fallback.f & 33554432) === 0) resume_effect(fallback);
		else {
			fallback.f ^= EFFECT_OFFSCREEN;
			move(fallback, null, anchor);
		}
		else pause_effect(fallback, () => {
			fallback = null;
		});
	}
	/**
	* @param {Batch} batch
	*/
	function discard(batch) {
		state.pending.delete(batch);
	}
	/** @type {EachState} */
	var state = {
		effect: block(() => {
			array = get(each_array);
			var length = array.length;
			/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
			let mismatch = false;
			if (hydrating) {
				if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
					anchor = skip_nodes();
					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}
			var keys = /* @__PURE__ */ new Set();
			var batch = current_batch;
			var defer = should_defer_append();
			for (var index = 0; index < length; index += 1) {
				if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					anchor = hydrate_node;
					mismatch = true;
					set_hydrating(false);
				}
				var value = array[index];
				var key = get_key(value, index);
				var key_again = get_key(value, index);
				if (key !== key_again) each_key_volatile(String(index), String(key), String(key_again));
				var item = first_run ? null : items.get(key);
				if (item) {
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);
					if (defer) batch.unskip_effect(item.e);
				} else {
					item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
					if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
					items.set(key, item);
				}
				keys.add(key);
			}
			if (length === 0 && fallback_fn && !fallback) if (first_run) fallback = branch(() => fallback_fn(anchor));
			else {
				fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
				fallback.f |= EFFECT_OFFSCREEN;
			}
			if (length > keys.size) validate_each_keys(array, get_key);
			if (hydrating && length > 0) set_hydrate_node(skip_nodes());
			if (!first_run) {
				pending.set(batch, keys);
				if (defer) {
					for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
					batch.oncommit(commit);
					batch.ondiscard(discard);
				} else commit(batch);
			}
			if (mismatch) set_hydrating(true);
			get(each_array);
		}),
		flags,
		items,
		pending,
		outrogroups: null,
		fallback
	};
	first_run = false;
	if (hydrating) anchor = hydrate_node;
}
/**
* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
* @param {Effect | null} effect
* @returns {Effect | null}
*/
function skip_to_branch(effect) {
	while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
	return effect;
}
/**
* Add, remove, or reorder items output by an each block as its input changes
* @template V
* @param {EachState} state
* @param {Array<V>} array
* @param {Element | Comment | Text} anchor
* @param {number} flags
* @param {(value: V, index: number) => any} get_key
* @returns {void}
*/
function reconcile(state, array, anchor, flags, get_key) {
	var is_animated = (flags & 8) !== 0;
	var length = array.length;
	var items = state.items;
	var current = skip_to_branch(state.effect.first);
	/** @type {undefined | Set<Effect>} */
	var seen;
	/** @type {Effect | null} */
	var prev = null;
	/** @type {undefined | Set<Effect>} */
	var to_animate;
	/** @type {Effect[]} */
	var matched = [];
	/** @type {Effect[]} */
	var stashed = [];
	/** @type {V} */
	var value;
	/** @type {any} */
	var key;
	/** @type {Effect | undefined} */
	var effect;
	/** @type {number} */
	var i;
	if (is_animated) for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if ((effect.f & 33554432) === 0) {
			effect.nodes?.a?.measure();
			(to_animate ??= /* @__PURE__ */ new Set()).add(effect);
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if (state.outrogroups !== null) for (const group of state.outrogroups) {
			group.pending.delete(effect);
			group.done.delete(effect);
		}
		if ((effect.f & 8192) !== 0) {
			resume_effect(effect);
			if (is_animated) {
				effect.nodes?.a?.unfix();
				(to_animate ??= /* @__PURE__ */ new Set()).delete(effect);
			}
		}
		if ((effect.f & 33554432) !== 0) {
			effect.f ^= EFFECT_OFFSCREEN;
			if (effect === current) move(effect, null, anchor);
			else {
				var next = prev ? prev.next : current;
				if (effect === state.effect.last) state.effect.last = effect.prev;
				if (effect.prev) effect.prev.next = effect.next;
				if (effect.next) effect.next.prev = effect.prev;
				link(state, prev, effect);
				link(state, effect, next);
				move(effect, next, anchor);
				prev = effect;
				matched = [];
				stashed = [];
				current = skip_to_branch(prev.next);
				continue;
			}
		}
		if (effect !== current) {
			if (seen !== void 0 && seen.has(effect)) {
				if (matched.length < stashed.length) {
					var start = stashed[0];
					var j;
					prev = start.prev;
					var a = matched[0];
					var b = matched[matched.length - 1];
					for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
					for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(effect);
					move(effect, current, anchor);
					link(state, effect.prev, effect.next);
					link(state, effect, prev === null ? state.effect.first : prev.next);
					link(state, prev, effect);
					prev = effect;
				}
				continue;
			}
			matched = [];
			stashed = [];
			while (current !== null && current !== effect) {
				(seen ??= /* @__PURE__ */ new Set()).add(current);
				stashed.push(current);
				current = skip_to_branch(current.next);
			}
			if (current === null) continue;
		}
		if ((effect.f & 33554432) === 0) matched.push(effect);
		prev = effect;
		current = skip_to_branch(effect.next);
	}
	if (state.outrogroups !== null) {
		for (const group of state.outrogroups) if (group.pending.size === 0) {
			destroy_effects(state, array_from(group.done));
			state.outrogroups?.delete(group);
		}
		if (state.outrogroups.size === 0) state.outrogroups = null;
	}
	if (current !== null || seen !== void 0) {
		/** @type {Effect[]} */
		var to_destroy = [];
		if (seen !== void 0) {
			for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
		}
		while (current !== null) {
			if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
			current = skip_to_branch(current.next);
		}
		var destroy_length = to_destroy.length;
		if (destroy_length > 0) {
			var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
			}
			pause_effects(state, to_destroy, controlled_anchor);
		}
	}
	if (is_animated) queue_micro_task(() => {
		if (to_animate === void 0) return;
		for (effect of to_animate) effect.nodes?.a?.apply();
	});
}
/**
* @template V
* @param {Map<any, EachItem>} items
* @param {Node} anchor
* @param {V} value
* @param {unknown} key
* @param {number} index
* @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
* @param {number} flags
* @param {() => V[]} get_collection
* @returns {EachItem}
*/
function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
	var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
	var i = (flags & 2) !== 0 ? source(index) : null;
	if (v) v.trace = () => {
		get_collection()[i?.v ?? index];
	};
	return {
		v,
		i,
		e: branch(() => {
			render_fn(anchor, v ?? value, i ?? index, get_collection);
			return () => {
				items.delete(key);
			};
		})
	};
}
/**
* @param {Effect} effect
* @param {Effect | null} next
* @param {Text | Element | Comment} anchor
*/
function move(effect, next, anchor) {
	if (!effect.nodes) return;
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
	while (node !== null) {
		var next_node = /* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		if (node === end) return;
		node = next_node;
	}
}
/**
* @param {EachState} state
* @param {Effect | null} prev
* @param {Effect | null} next
*/
function link(state, prev, next) {
	if (prev === null) state.effect.first = next;
	else prev.next = next;
	if (next === null) state.effect.last = prev;
	else next.prev = prev;
}
/**
* @param {Array<any>} array
* @param {(item: any, index: number) => string} key_fn
* @returns {void}
*/
function validate_each_keys(array, key_fn) {
	const keys = /* @__PURE__ */ new Map();
	const length = array.length;
	for (let i = 0; i < length; i++) {
		const key = key_fn(array[i], i);
		if (keys.has(key)) {
			const a = String(keys.get(key));
			const b = String(i);
			/** @type {string | null} */
			let k = String(key);
			if (k.startsWith("[object ")) k = null;
			each_key_duplicate(a, b, k);
		}
		keys.set(key, i);
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/html.js
/** @import { Effect, TemplateNode } from '#client' */
/** @import {} from 'trusted-types' */
/**
* @param {Element} element
* @param {string | null} server_hash
* @param {string | TrustedHTML} value
*/
function check_hash(element, server_hash, value) {
	if (!server_hash || server_hash === hash(String(value ?? ""))) return;
	let location;
	const loc = element.__svelte_meta?.loc;
	if (loc) location = `near ${loc.file}:${loc.line}:${loc.column}`;
	else if (dev_current_component_function?.[FILENAME]) location = `in ${dev_current_component_function[FILENAME]}`;
	hydration_html_changed(sanitize_location(location));
}
/**
* @param {Element | Text | Comment} node
* @param {() => string | TrustedHTML} get_value
* @param {boolean} [is_controlled]
* @param {boolean} [svg]
* @param {boolean} [mathml]
* @param {boolean} [skip_warning]
* @returns {void}
*/
function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
	var anchor = node;
	/** @type {string | TrustedHTML} */
	var value = "";
	if (is_controlled) {
		var parent_node = node;
		if (hydrating) anchor = set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node));
	}
	template_effect(() => {
		var effect = active_effect;
		if (value === (value = get_value() ?? "")) {
			if (hydrating) hydrate_next();
			return;
		}
		if (is_controlled && !hydrating) {
			effect.nodes = null;
			parent_node.innerHTML = value;
			if (value !== "") assign_nodes(/* @__PURE__ */ get_first_child(parent_node), parent_node.lastChild);
			return;
		}
		if (effect.nodes !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			effect.nodes = null;
		}
		if (value === "") return;
		if (hydrating) {
			var hash = hydrate_node.data;
			/** @type {TemplateNode | null} */
			var next = hydrate_next();
			var last = next;
			while (next !== null && (next.nodeType !== 8 || next.data !== "")) {
				last = next;
				next = /* @__PURE__ */ get_next_sibling(next);
			}
			if (next === null) {
				hydration_mismatch();
				throw HYDRATION_ERROR;
			}
			if (!skip_warning) check_hash(next.parentNode, hash, value);
			assign_nodes(hydrate_node, last);
			anchor = set_hydrate_node(next);
			return;
		}
		var wrapper = create_element(svg ? "svg" : mathml ? "math" : "template", svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0);
		wrapper.innerHTML = value;
		/** @type {DocumentFragment | Element} */
		var node = svg || mathml ? wrapper : 		/** @type {HTMLTemplateElement} */ wrapper.content;
		assign_nodes(/* @__PURE__ */ get_first_child(node), node.lastChild);
		if (svg || mathml) while (/* @__PURE__ */ get_first_child(node)) anchor.before(/* @__PURE__ */ get_first_child(node));
		else anchor.before(node);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/slot.js
/**
* @param {Comment} anchor
* @param {Record<string, any>} $$props
* @param {string} name
* @param {Record<string, unknown>} slot_props
* @param {null | ((anchor: Comment) => void)} fallback_fn
*/
function slot(anchor, $$props, name, slot_props, fallback_fn) {
	if (hydrating) hydrate_next();
	var slot_fn = $$props.$$slots?.[name];
	var is_interop = false;
	if (slot_fn === true) {
		slot_fn = $$props[name === "default" ? "children" : name];
		is_interop = true;
	}
	if (slot_fn === void 0) {
		if (fallback_fn !== null) fallback_fn(anchor);
	} else slot_fn(anchor, is_interop ? () => slot_props : slot_props);
}
/**
* @param {Record<string, any>} props
* @returns {Record<string, boolean>}
*/
function sanitize_slots(props) {
	/** @type {Record<string, boolean>} */
	const sanitized = {};
	if (props.children) sanitized.default = true;
	for (const key in props.$$slots) sanitized[key] = true;
	return sanitized;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
/** @import { TemplateNode, Dom } from '#client' */
/**
* @template P
* @template {(props: P) => void} C
* @param {TemplateNode} node
* @param {() => C} get_component
* @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
* @returns {void}
*/
function component(node, get_component, render_fn) {
	/** @type {TemplateNode | undefined} */
	var hydration_start_node;
	if (hydrating) {
		hydration_start_node = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	block(() => {
		var component = get_component() ?? null;
		if (hydrating) {
			if (read_hydration_instruction(hydration_start_node) === "[" !== (component !== null)) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(component, component && ((target) => render_fn(target, component)));
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(component, component && ((target) => render_fn(target, component)));
	}, EFFECT_TRANSPARENT);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/timing.js
/** @import { Raf } from '#client' */
var now = () => performance.now();
/** @type {Raf} */
var raf = {
	tick: (_) => requestAnimationFrame(_),
	now: () => now(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/loop.js
/** @import { TaskCallback, Task, TaskEntry } from '#client' */
/**
* @returns {void}
*/
function run_tasks() {
	const now = raf.now();
	raf.tasks.forEach((task) => {
		if (!task.c(now)) {
			raf.tasks.delete(task);
			task.f();
		}
	});
	if (raf.tasks.size !== 0) raf.tick(run_tasks);
}
/**
* Creates a new task that runs on each raf frame
* until it returns a falsy value or is aborted
* @param {TaskCallback} callback
* @returns {Task}
*/
function loop(callback) {
	/** @type {TaskEntry} */
	let task;
	if (raf.tasks.size === 0) raf.tick(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			raf.tasks.add(task = {
				c: callback,
				f: fulfill
			});
		}),
		abort() {
			raf.tasks.delete(task);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/transitions.js
/** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */
/**
* @param {Element} element
* @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
* @returns {void}
*/
function dispatch_event(element, type) {
	without_reactive_context(() => {
		element.dispatchEvent(new CustomEvent(type));
	});
}
/**
* Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
* @param {string} style
* @returns {string}
*/
function css_property_to_camelcase(style) {
	if (style === "float") return "cssFloat";
	if (style === "offset") return "cssOffset";
	if (style.startsWith("--")) return style;
	const parts = style.split("-");
	if (parts.length === 1) return parts[0];
	return parts[0] + parts.slice(1).map(
		/** @param {any} word */
		(word) => word[0].toUpperCase() + word.slice(1)
	).join("");
}
/**
* @param {string} css
* @returns {Keyframe}
*/
function css_to_keyframe(css) {
	/** @type {Keyframe} */
	const keyframe = {};
	const parts = css.split(";");
	for (const part of parts) {
		const [property, value] = part.split(":");
		if (!property || value === void 0) break;
		const formatted_property = css_property_to_camelcase(property.trim());
		keyframe[formatted_property] = value.trim();
	}
	return keyframe;
}
/** @param {number} t */
var linear = (t) => t;
/** @type {Effect | null} */
var animation_effect_override = null;
/** @param {Effect | null} v */
function set_animation_effect_override(v) {
	animation_effect_override = v;
}
/**
* Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
* and attaches it to the block, so that moves can be animated following reconciliation.
* @template P
* @param {Element} element
* @param {() => AnimateFn<P | undefined>} get_fn
* @param {(() => P) | null} get_params
*/
function animation(element, get_fn, get_params) {
	var nodes = (animation_effect_override ?? active_effect).nodes;
	/** @type {DOMRect} */
	var from;
	/** @type {DOMRect} */
	var to;
	/** @type {Animation | undefined} */
	var animation;
	/** @type {null | { position: string, width: string, height: string, transform: string }} */
	var original_styles = null;
	nodes.a ??= {
		element,
		measure() {
			from = this.element.getBoundingClientRect();
		},
		apply() {
			animation?.abort();
			to = this.element.getBoundingClientRect();
			if (from.left !== to.left || from.right !== to.right || from.top !== to.top || from.bottom !== to.bottom) {
				const options = get_fn()(this.element, {
					from,
					to
				}, get_params?.());
				animation = animate(this.element, options, void 0, 1, () => {}, () => {
					animation?.abort();
					animation = void 0;
				});
			}
		},
		fix() {
			if (element.getAnimations().length) return;
			var { position, width, height } = getComputedStyle(element);
			if (position !== "absolute" && position !== "fixed") {
				var style = element.style;
				original_styles = {
					position: style.position,
					width: style.width,
					height: style.height,
					transform: style.transform
				};
				style.position = "absolute";
				style.width = width;
				style.height = height;
				var to = element.getBoundingClientRect();
				if (from.left !== to.left || from.top !== to.top) {
					var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
					style.transform = style.transform ? `${style.transform} ${transform}` : transform;
				}
			}
		},
		unfix() {
			if (original_styles) {
				var style = element.style;
				style.position = original_styles.position;
				style.width = original_styles.width;
				style.height = original_styles.height;
				style.transform = original_styles.transform;
			}
		}
	};
	nodes.a.element = element;
}
/**
* Called inside block effects as `$.transition(...)`. This creates a transition manager and
* attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
* use this to create `intro` and `outro` transitions.
* @template P
* @param {number} flags
* @param {HTMLElement} element
* @param {() => TransitionFn<P | undefined>} get_fn
* @param {(() => P) | null} get_params
* @returns {void}
*/
function transition(flags, element, get_fn, get_params) {
	var is_intro = (flags & 1) !== 0;
	var is_outro = (flags & 2) !== 0;
	var is_both = is_intro && is_outro;
	var is_global = (flags & 4) !== 0;
	/** @type {'in' | 'out' | 'both'} */
	var direction = is_both ? "both" : is_intro ? "in" : "out";
	/** @type {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig) | undefined} */
	var current_options;
	var inert = element.inert;
	/**
	* The default overflow style, stashed so we can revert changes during the transition
	* that are necessary to work around a Safari <18 bug
	* TODO 6.0 remove this, if older versions of Safari have died out enough
	*/
	var overflow = element.style.overflow;
	/** @type {Animation | undefined} */
	var intro;
	/** @type {Animation | undefined} */
	var outro;
	function get_options() {
		return without_reactive_context(() => {
			return current_options ??= get_fn()(element, get_params?.() ?? {}, { direction });
		});
	}
	/** @type {TransitionManager} */
	var transition = {
		is_global,
		in() {
			element.inert = inert;
			if (!is_intro) {
				outro?.abort();
				outro?.reset?.();
				return;
			}
			if (!is_outro) intro?.abort();
			intro = animate(element, get_options(), outro, 1, () => {
				dispatch_event(element, "introstart");
			}, () => {
				dispatch_event(element, "introend");
				intro?.abort();
				intro = current_options = void 0;
				element.style.overflow = overflow;
			});
		},
		out(fn) {
			if (!is_outro) {
				fn?.();
				current_options = void 0;
				return;
			}
			element.inert = true;
			outro = animate(element, get_options(), intro, 0, () => {
				dispatch_event(element, "outrostart");
			}, () => {
				dispatch_event(element, "outroend");
				fn?.();
			});
		},
		stop: () => {
			intro?.abort();
			outro?.abort();
		}
	};
	var e = active_effect;
	(e.nodes.t ??= []).push(transition);
	if (is_intro && should_intro) {
		var run = is_global;
		if (!run) {
			var block = e.parent;
			while (block && (block.f & 65536) !== 0) while (block = block.parent) if ((block.f & 16) !== 0) break;
			run = !block || (block.f & 32768) !== 0;
		}
		if (run) effect(() => {
			untrack(() => transition.in());
		});
	}
}
/**
* Animates an element, according to the provided configuration
* @param {Element} element
* @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
* @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
* @param {number} t2 The target `t` value — `1` for intro, `0` for outro
* @param {(() => void)} on_begin Called just before beginning the animation
* @param {(() => void)} on_finish Called after successfully completing the animation
* @returns {Animation}
*/
function animate(element, options, counterpart, t2, on_begin, on_finish) {
	var is_intro = t2 === 1;
	if (is_function(options)) {
		/** @type {Animation} */
		var a;
		var aborted = false;
		queue_micro_task(() => {
			if (aborted) return;
			a = animate(element, options({ direction: is_intro ? "in" : "out" }), counterpart, t2, on_begin, on_finish);
		});
		return {
			abort: () => {
				aborted = true;
				a?.abort();
			},
			deactivate: () => a.deactivate(),
			reset: () => a.reset(),
			t: () => a.t()
		};
	}
	counterpart?.deactivate();
	if (!options?.duration && !options?.delay) {
		on_begin();
		on_finish();
		return {
			abort: noop,
			deactivate: noop,
			reset: noop,
			t: () => t2
		};
	}
	const { delay = 0, css, tick, easing = linear } = options;
	var keyframes = [];
	if (is_intro && counterpart === void 0) {
		if (tick) tick(0, 1);
		if (css) {
			var styles = css_to_keyframe(css(0, 1));
			keyframes.push(styles, styles);
		}
	}
	var get_t = () => 1 - t2;
	var animation = element.animate(keyframes, {
		duration: delay,
		fill: "forwards"
	});
	animation.onfinish = () => {
		animation.cancel();
		on_begin();
		var t1 = counterpart?.t() ?? 1 - t2;
		counterpart?.abort();
		var delta = t2 - t1;
		var duration = options.duration * Math.abs(delta);
		var keyframes = [];
		if (duration > 0) {
			/**
			* Whether or not the CSS includes `overflow: hidden`, in which case we need to
			* add it as an inline style to work around a Safari <18 bug
			* TODO 6.0 remove this, if possible
			*/
			var needs_overflow_hidden = false;
			if (css) {
				var n = Math.ceil(duration / (1e3 / 60));
				for (var i = 0; i <= n; i += 1) {
					var t = t1 + delta * easing(i / n);
					var styles = css_to_keyframe(css(t, 1 - t));
					keyframes.push(styles);
					needs_overflow_hidden ||= styles.overflow === "hidden";
				}
			}
			if (needs_overflow_hidden)
 /** @type {HTMLElement} */ element.style.overflow = "hidden";
			get_t = () => {
				var time = animation.currentTime;
				return t1 + delta * easing(time / duration);
			};
			if (tick) loop(() => {
				if (animation.playState !== "running") return false;
				var t = get_t();
				tick(t, 1 - t);
				return true;
			});
		}
		animation = element.animate(keyframes, {
			duration,
			fill: "forwards"
		});
		animation.onfinish = () => {
			get_t = () => t2;
			tick?.(t2, 1 - t2);
			on_finish();
		};
	};
	return {
		abort: () => {
			if (animation) {
				animation.cancel();
				animation.effect = null;
				animation.onfinish = noop;
			}
		},
		deactivate: () => {
			on_finish = noop;
		},
		reset: () => {
			if (t2 === 0) tick?.(1, 0);
		},
		t: () => get_t()
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/**
* @param {Comment | Element} node
* @param {() => string} get_tag
* @param {boolean} is_svg
* @param {undefined | ((element: Element, anchor: Node | null) => void)} render_fn,
* @param {undefined | (() => string)} get_namespace
* @param {undefined | [number, number]} location
* @returns {void}
*/
function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
	let was_hydrating = hydrating;
	if (hydrating) hydrate_next();
	var filename = location && component_context?.function[FILENAME];
	/** @type {null | Element} */
	var element = null;
	if (hydrating && hydrate_node.nodeType === 1) {
		element = hydrate_node;
		hydrate_next();
	}
	var anchor = hydrating ? hydrate_node : node;
	/**
	* We track this so we can set it when changing the element, allowing any
	* `animate:` directive to bind itself to the correct block
	*/
	var parent_effect = active_effect;
	var branches = new BranchManager(anchor, false);
	block(() => {
		const next_tag = get_tag() || null;
		var ns = get_namespace ? get_namespace() : is_svg || next_tag === "svg" ? NAMESPACE_SVG : void 0;
		if (next_tag === null) {
			branches.ensure(null, null);
			set_should_intro(true);
			return;
		}
		branches.ensure(next_tag, (anchor) => {
			if (next_tag) {
				element = hydrating ? element : create_element(next_tag, ns);
				if (location) element.__svelte_meta = {
					parent: dev_stack,
					loc: {
						file: filename,
						line: location[0],
						column: location[1]
					}
				};
				assign_nodes(element, element);
				if (render_fn) {
					var tmp_comment = null;
					if (hydrating && is_raw_text_element(next_tag)) element.append(tmp_comment = document.createComment(""));
					var child_anchor = hydrating ? /* @__PURE__ */ get_first_child(element) : element.appendChild(create_text());
					if (hydrating) if (child_anchor === null) set_hydrating(false);
					else set_hydrate_node(child_anchor);
					set_animation_effect_override(parent_effect);
					render_fn(element, child_anchor);
					tmp_comment?.remove();
					set_animation_effect_override(null);
				}
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = element;
				anchor.before(element);
			}
			if (hydrating) set_hydrate_node(anchor);
		});
		set_should_intro(true);
		return () => {
			if (next_tag) set_should_intro(false);
		};
	}, EFFECT_TRANSPARENT);
	teardown(() => {
		set_should_intro(true);
	});
	if (was_hydrating) {
		set_hydrating(true);
		set_hydrate_node(anchor);
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
/** @import { TemplateNode } from '#client' */
/**
* @param {string} hash
* @param {(anchor: Node) => void} render_fn
* @returns {void}
*/
function head(hash, render_fn) {
	let previous_hydrate_node = null;
	let was_hydrating = hydrating;
	/** @type {Comment | Text} */
	var anchor;
	if (hydrating) {
		previous_hydrate_node = hydrate_node;
		var head_anchor = /* @__PURE__ */ get_first_child(document.head);
		while (head_anchor !== null && (head_anchor.nodeType !== 8 || head_anchor.data !== hash)) head_anchor = /* @__PURE__ */ get_next_sibling(head_anchor);
		if (head_anchor === null) set_hydrating(false);
		else {
			var start = /* @__PURE__ */ get_next_sibling(head_anchor);
			head_anchor.remove();
			set_hydrate_node(start);
		}
	}
	if (!hydrating) anchor = document.head.appendChild(create_text());
	try {
		block(() => {
			var e = branch(() => render_fn(anchor));
			e.f |= HEAD_EFFECT;
		});
	} finally {
		if (was_hydrating) {
			set_hydrating(true);
			set_hydrate_node(previous_hydrate_node);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/css.js
/**
* @param {Node} anchor
* @param {{ hash: string, code: string }} css
*/
function append_styles$1(anchor, css) {
	effect(() => {
		var root = anchor.getRootNode();
		var target = root.host ? root : 		/** @type {Document} */ root.head ?? root.ownerDocument.head;
		if (!target.querySelector("#" + css.hash)) {
			const style = create_element("style");
			style.id = css.hash;
			style.textContent = css.code;
			target.appendChild(style);
			register_style(css.hash, style);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/actions.js
/** @import { ActionPayload } from '#client' */
/**
* @template P
* @param {Element} dom
* @param {(dom: Element, value?: P) => ActionPayload<P>} action
* @param {() => P} [get_value]
* @returns {void}
*/
function action(dom, action, get_value) {
	effect(() => {
		var payload = untrack(() => action(dom, get_value?.()) || {});
		if (get_value && payload?.update) {
			var inited = false;
			/** @type {P} */
			var prev = {};
			render_effect(() => {
				var value = get_value();
				deep_read_state(value);
				if (inited && safe_not_equal(prev, value)) {
					prev = value;
					/** @type {Function} */ payload.update(value);
				}
			});
			inited = true;
		}
		if (payload?.destroy) return () => payload.destroy();
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/attachments.js
/** @import { Effect } from '#client' */
/**
* @param {Element} node
* @param {() => (node: Element) => void} get_fn
*/
function attach(node, get_fn) {
	/** @type {false | undefined | ((node: Element) => void)} */
	var fn = void 0;
	/** @type {Effect | null} */
	var e;
	managed(() => {
		if (fn !== (fn = get_fn())) {
			if (e) {
				destroy_effect(e);
				e = null;
			}
			if (fn) e = branch(() => {
				effect(() => fn(node));
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/escaping.js
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
/**
* @template V
* @param {V} value
* @param {boolean} [is_attr]
*/
function escape_html(value, is_attr) {
	const str = String(value ?? "");
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = "";
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === "\"" ? "&quot;" : "&lt;");
		last = i + 1;
	}
	return escaped + str.substring(last);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/attributes.js
/**
* `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
* `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
* may be other odd cases that need to be added to this list in future
* @type {Record<string, Map<any, string>>}
*/
var replacements = { translate: /* @__PURE__ */ new Map([[true, "yes"], [false, "no"]]) };
/**
* @template V
* @param {string} name
* @param {V} value
* @param {boolean} [is_boolean]
* @returns {string}
*/
function attr(name, value, is_boolean = false) {
	if (name === "hidden" && value !== "until-found") is_boolean = true;
	if (value == null || !value && is_boolean) return "";
	const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
	return ` ${name}${is_boolean ? `=""` : `="${escape_html(normalized, true)}"`}`;
}
/**
* Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
* TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
* @param  {any} value
*/
function clsx(value) {
	if (typeof value === "object") return clsx$1(value);
	else return value ?? "";
}
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
/**
* @param {any} value
* @param {string | null} [hash]
* @param {Record<string, boolean>} [directives]
* @returns {string | null}
*/
function to_class(value, hash, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash) classname = classname ? classname + " " + hash : hash;
	if (directives) {
		for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
		else if (classname.length) {
			var len = key.length;
			var a = 0;
			while ((a = classname.indexOf(key, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
/**
*
* @param {Record<string,any>} styles
* @param {boolean} important
*/
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== "") css += " " + key + ": " + value + separator;
	}
	return css;
}
/**
* @param {string} name
* @returns {string}
*/
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
/**
* @param {any} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
* @returns {string | null}
*/
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		/** @type {Record<string,any> | undefined} */
		var normal_styles;
		/** @type {Record<string,any> | undefined} */
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/class.js
/**
* @param {Element} dom
* @param {boolean | number} is_html
* @param {string | null} value
* @param {string} [hash]
* @param {Record<string, any>} [prev_classes]
* @param {Record<string, any>} [next_classes]
* @returns {Record<string, boolean> | undefined}
*/
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = dom[CLASS_CACHE];
	if (hydrating || prev !== value || prev === void 0) {
		var next_class_name = to_class(value, hash, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute("class")) if (next_class_name == null) dom.removeAttribute("class");
		else if (is_html) dom.className = next_class_name;
		else dom.setAttribute("class", next_class_name);
		/** @type {any} */ dom[CLASS_CACHE] = value;
	} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
		var is_present = !!next_classes[key];
		if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
	}
	return next_classes;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/style.js
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {Record<string, any>} prev
* @param {Record<string, any>} next
* @param {string} [priority]
*/
function update_styles(dom, prev = {}, next, priority) {
	for (var key in next) {
		var value = next[key];
		if (prev[key] !== value) if (next[key] == null) dom.style.removeProperty(key);
		else dom.style.setProperty(key, value, priority);
	}
}
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {string | null} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
*/
function set_style(dom, value, prev_styles, next_styles) {
	var prev = dom[STYLE_CACHE];
	if (hydrating || prev !== value) {
		var next_style_attr = to_style(value, next_styles);
		if (!hydrating || next_style_attr !== dom.getAttribute("style")) if (next_style_attr == null) dom.removeAttribute("style");
		else dom.style.cssText = next_style_attr;
		/** @type {any} */ dom[STYLE_CACHE] = value;
	} else if (next_styles) if (Array.isArray(next_styles)) {
		update_styles(dom, prev_styles?.[0], next_styles[0]);
		update_styles(dom, prev_styles?.[1], next_styles[1], "important");
	} else update_styles(dom, prev_styles, next_styles);
	return next_styles;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
/**
* Selects the correct option(s) (depending on whether this is a multiple select)
* @template V
* @param {HTMLSelectElement} select
* @param {V} value
* @param {boolean} mounting
*/
function select_option(select, value, mounting = false) {
	if (select.multiple) {
		if (value == void 0) return;
		if (!is_array(value)) return select_multiple_invalid_value();
		for (var option of select.options) option.selected = value.includes(get_option_value(option));
		return;
	}
	for (option of select.options) if (is(get_option_value(option), value)) {
		option.selected = true;
		return;
	}
	if (!mounting || value !== void 0) select.selectedIndex = -1;
}
/**
* Selects the correct option(s) if `value` is given,
* and then sets up a mutation observer to sync the
* current selection to the dom when it changes. Such
* changes could for example occur when options are
* inside an `#each` block.
* @param {HTMLSelectElement} select
*/
function init_select(select) {
	var observer = new MutationObserver(() => {
		select_option(select, select.__value);
	});
	observer.observe(select, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["value"]
	});
	teardown(() => {
		observer.disconnect();
	});
}
/**
* @param {HTMLSelectElement} select
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_select_value(select, get, set = get) {
	var batches = /* @__PURE__ */ new WeakSet();
	var mounting = true;
	listen_to_event_and_reset_event(select, "change", (is_reset) => {
		var query = is_reset ? "[selected]" : ":checked";
		/** @type {unknown} */
		var value;
		if (select.multiple) value = [].map.call(select.querySelectorAll(query), get_option_value);
		else {
			/** @type {HTMLOptionElement | null} */
			var selected_option = select.querySelector(query) ?? select.querySelector("option:not([disabled])");
			value = selected_option && get_option_value(selected_option);
		}
		set(value);
		select.__value = value;
		if (current_batch !== null) batches.add(current_batch);
	});
	effect(() => {
		var value = get();
		if (select === document.activeElement) {
			var batch = async_mode_flag ? previous_batch : current_batch;
			if (batches.has(batch)) return;
		}
		select_option(select, value, mounting);
		if (mounting && value === void 0) {
			/** @type {HTMLOptionElement | null} */
			var selected_option = select.querySelector(":checked");
			if (selected_option !== null) {
				value = get_option_value(selected_option);
				set(value);
			}
		}
		select.__value = value;
		mounting = false;
	});
	init_select(select);
}
/** @param {HTMLOptionElement} option */
function get_option_value(option) {
	if ("__value" in option) return option.__value;
	else return option.value;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/attributes.js
/** @import { Blocker, Effect } from '#client' */
var CLASS = Symbol("class");
var STYLE = Symbol("style");
var IS_CUSTOM_ELEMENT = Symbol("is custom element");
var IS_HTML = Symbol("is html");
var LINK_TAG = IS_XHTML ? "link" : "LINK";
var INPUT_TAG = IS_XHTML ? "input" : "INPUT";
var OPTION_TAG = IS_XHTML ? "option" : "OPTION";
var SELECT_TAG = IS_XHTML ? "select" : "SELECT";
var PROGRESS_TAG = IS_XHTML ? "progress" : "PROGRESS";
/**
* The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
* to remove it upon hydration to avoid a bug when someone resets the form value.
* @param {HTMLInputElement} input
* @returns {void}
*/
function remove_input_defaults(input) {
	if (!hydrating) return;
	var already_removed = false;
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;
		if (input.hasAttribute("value")) {
			var value = input.value;
			set_attribute(input, "value", null);
			input.value = value;
		}
		if (input.hasAttribute("checked")) {
			var checked = input.checked;
			set_attribute(input, "checked", null);
			input.checked = checked;
		}
	};
	/** @type {any} */ input[FORM_RESET_HANDLER] = remove_defaults;
	queue_micro_task(remove_defaults);
	add_form_reset_listener();
}
/**
* @param {Element} element
* @param {any} value
*/
function set_value(element, value) {
	var attributes = get_attributes(element);
	if (attributes.value === (attributes.value = value ?? void 0) || element.value === value && (value !== 0 || element.nodeName !== PROGRESS_TAG)) return;
	element.value = value ?? "";
}
/**
* @param {Element} element
* @param {boolean} checked
*/
function set_checked(element, checked) {
	var attributes = get_attributes(element);
	if (attributes.checked === (attributes.checked = checked ?? void 0)) return;
	element.checked = checked;
}
/**
* Sets the `selected` attribute on an `option` element.
* Not set through the property because that doesn't reflect to the DOM,
* which means it wouldn't be taken into account when a form is reset.
* @param {HTMLOptionElement} element
* @param {boolean} selected
*/
function set_selected(element, selected) {
	if (selected) {
		if (!element.hasAttribute("selected")) element.setAttribute("selected", "");
	} else element.removeAttribute("selected");
}
/**
* Applies the default checked property without influencing the current checked property.
* @param {HTMLInputElement} element
* @param {boolean} checked
*/
function set_default_checked(element, checked) {
	const existing_value = element.checked;
	element.defaultChecked = checked;
	element.checked = existing_value;
}
/**
* Applies the default value property without influencing the current value property.
* @param {HTMLInputElement | HTMLTextAreaElement} element
* @param {string} value
*/
function set_default_value(element, value) {
	const existing_value = element.value;
	element.defaultValue = value;
	element.value = existing_value;
}
/**
* @param {Element} element
* @param {string} attribute
* @param {string | null} value
* @param {boolean} [skip_warning]
*/
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = get_attributes(element);
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
			if (!skip_warning) check_src_in_dev_hydration(element, attribute, value ?? "");
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
	if (value == null) element.removeAttribute(attribute);
	else if (typeof value !== "string" && get_setters(element).includes(attribute)) element[attribute] = value;
	else element.setAttribute(attribute, value);
}
/**
* @param {Element} dom
* @param {string} attribute
* @param {string} value
*/
function set_xlink_attribute(dom, attribute, value) {
	dom.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
}
/**
* @param {HTMLElement} node
* @param {string} prop
* @param {any} value
*/
function set_custom_element_data(node, prop, value) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	let was_hydrating = hydrating;
	if (hydrating) set_hydrating(false);
	set_active_reaction(null);
	set_active_effect(null);
	try {
		if (prop !== "style" && (setters_cache.has(node.getAttribute("is") || node.nodeName) || !customElements || customElements.get(node.getAttribute("is") || node.nodeName.toLowerCase()) ? get_setters(node).includes(prop) : value && typeof value === "object")) node[prop] = value;
		else set_attribute(node, prop, value == null ? value : String(value));
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
		if (was_hydrating) set_hydrating(true);
	}
}
/**
* Spreads attributes onto a DOM element, taking into account the currently set attributes
* @param {Element & ElementCSSInlineStyle} element
* @param {Record<string | symbol, any> | undefined} prev
* @param {Record<string | symbol, any>} next New attributes - this function mutates this object
* @param {string} [css_hash]
* @param {boolean} [should_remove_defaults]
* @param {boolean} [skip_warning]
* @returns {Record<string, any>}
*/
function set_attributes(element, prev, next, css_hash, should_remove_defaults = false, skip_warning = false) {
	if (hydrating && should_remove_defaults && element.nodeName === INPUT_TAG) {
		var input = element;
		if (!((input.type === "checkbox" ? "defaultChecked" : "defaultValue") in next)) remove_input_defaults(input);
	}
	var attributes = get_attributes(element);
	var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
	var preserve_attribute_case = !attributes[IS_HTML];
	let is_hydrating_custom_element = hydrating && is_custom_element;
	if (is_hydrating_custom_element) set_hydrating(false);
	var current = prev || {};
	var is_option_element = element.nodeName === OPTION_TAG;
	for (var key in prev) if (!(key in next)) next[key] = null;
	if (next.class) next.class = clsx(next.class);
	else if (css_hash || next[CLASS]) next.class = null;
	if (next[STYLE]) next.style ??= null;
	var setters = get_setters(element);
	if (element.nodeName === INPUT_TAG && "type" in next && ("value" in next || "__value" in next)) {
		var type = next.type;
		if (type !== current.type || type === void 0 && element.hasAttribute("type")) {
			current.type = type;
			set_attribute(element, "type", type, skip_warning);
		}
	}
	for (const key in next) {
		let value = next[key];
		if (is_option_element && key === "value" && value == null) {
			element.value = element.__value = "";
			current[key] = value;
			continue;
		}
		if (key === "class") {
			set_class(element, element.namespaceURI === "http://www.w3.org/1999/xhtml", value, css_hash, prev?.[CLASS], next[CLASS]);
			current[key] = value;
			current[CLASS] = next[CLASS];
			continue;
		}
		if (key === "style") {
			set_style(element, value, prev?.[STYLE], next[STYLE]);
			current[key] = value;
			current[STYLE] = next[STYLE];
			continue;
		}
		var prev_value = current[key];
		if (value === prev_value && !(value === void 0 && element.hasAttribute(key))) continue;
		current[key] = value;
		var prefix = key[0] + key[1];
		if (prefix === "$$") continue;
		if (prefix === "on") {
			/** @type {{ capture?: true }} */
			const opts = {};
			const event_handle_key = "$$" + key;
			let event_name = key.slice(2);
			var is_delegated = can_delegate_event(event_name);
			if (is_capture_event(event_name)) {
				event_name = event_name.slice(0, -7);
				opts.capture = true;
			}
			if (!is_delegated && prev_value) {
				if (value != null) continue;
				element.removeEventListener(event_name, current[event_handle_key], opts);
				current[event_handle_key] = null;
			}
			if (is_delegated) {
				delegated(event_name, element, value);
				delegate([event_name]);
			} else if (value != null) {
				/**
				* @this {any}
				* @param {Event} evt
				*/
				function handle(evt) {
					current[key].call(this, evt);
				}
				current[event_handle_key] = create_event(event_name, element, handle, opts);
			}
		} else if (key === "style") set_attribute(element, key, value);
		else if (key === "autofocus") autofocus(element, Boolean(value));
		else if (!is_custom_element && (key === "__value" || key === "value" && value != null)) element.value = element.__value = value;
		else if (key === "selected" && is_option_element) set_selected(element, value);
		else {
			var name = key;
			if (!preserve_attribute_case) name = normalize_attribute(name);
			var is_default = name === "defaultValue" || name === "defaultChecked";
			if (value == null && !is_custom_element && !is_default) {
				attributes[key] = null;
				if (name === "value" || name === "checked") {
					let input = element;
					const use_default = prev === void 0;
					if (name === "value") {
						let previous = input.defaultValue;
						input.removeAttribute(name);
						input.defaultValue = previous;
						input.value = input.__value = use_default ? previous : null;
					} else {
						let previous = input.defaultChecked;
						input.removeAttribute(name);
						input.defaultChecked = previous;
						input.checked = use_default ? previous : false;
					}
				} else element.removeAttribute(key);
			} else if (is_default || setters.includes(name) && (is_custom_element || typeof value !== "string")) {
				element[name] = value;
				if (name in attributes) attributes[name] = UNINITIALIZED;
			} else if (typeof value !== "function") set_attribute(element, name, value, skip_warning);
		}
	}
	if (is_hydrating_custom_element) set_hydrating(true);
	return current;
}
/**
* @param {Element & ElementCSSInlineStyle} element
* @param {(...expressions: any) => Record<string | symbol, any>} fn
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {Blocker[]} blockers
* @param {string} [css_hash]
* @param {boolean} [should_remove_defaults]
* @param {boolean} [skip_warning]
*/
function attribute_effect(element, fn, sync = [], async = [], blockers = [], css_hash, should_remove_defaults = false, skip_warning = false) {
	flatten(blockers, sync, async, (values) => {
		/** @type {Record<string | symbol, any> | undefined} */
		var prev = void 0;
		/** @type {Record<symbol, Effect>} */
		var effects = {};
		var is_select = element.nodeName === SELECT_TAG;
		var inited = false;
		managed(() => {
			var next = fn(...values.map(get));
			/** @type {Record<string | symbol, any>} */
			var current = set_attributes(element, prev, next, css_hash, should_remove_defaults, skip_warning);
			if (inited && is_select && "value" in next) select_option(element, next.value);
			for (let symbol of Object.getOwnPropertySymbols(effects)) if (!next[symbol]) destroy_effect(effects[symbol]);
			for (let symbol of Object.getOwnPropertySymbols(next)) {
				var n = next[symbol];
				if (symbol.description === "@attach" && (!prev || n !== prev[symbol])) {
					if (effects[symbol]) destroy_effect(effects[symbol]);
					effects[symbol] = branch(() => attach(element, () => n));
				}
				current[symbol] = n;
			}
			prev = current;
		});
		if (is_select) {
			var select = element;
			effect(() => {
				select_option(
					select,
					/** @type {Record<string | symbol, any>} */
					prev.value,
					true
				);
				init_select(select);
			});
		}
		inited = true;
	});
}
/**
*
* @param {Element} element
*/
function get_attributes(element) {
	return element[ATTRIBUTES_CACHE] ??= {
		[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
		[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
	};
}
/** @type {Map<string, string[]>} */
var setters_cache = /* @__PURE__ */ new Map();
/** @param {Element} element */
function get_setters(element) {
	var cache_key = element.getAttribute("is") || element.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, setters = []);
	var descriptors;
	var proto = element;
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.push(key);
		proto = get_prototype_of(proto);
	}
	return setters;
}
/**
* @param {any} element
* @param {string} attribute
* @param {string} value
*/
function check_src_in_dev_hydration(element, attribute, value) {
	if (attribute === "srcset" && srcset_url_equal(element, value)) return;
	if (src_url_equal(element.getAttribute(attribute) ?? "", value)) return;
	hydration_attribute_changed(attribute, element.outerHTML.replace(element.innerHTML, element.innerHTML && "..."), String(value));
}
/**
* @param {string} element_src
* @param {string} url
* @returns {boolean}
*/
function src_url_equal(element_src, url) {
	if (element_src === url) return true;
	return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}
/** @param {string} srcset */
function split_srcset(srcset) {
	return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
}
/**
* @param {HTMLSourceElement | HTMLImageElement} element
* @param {string} srcset
* @returns {boolean}
*/
function srcset_url_equal(element, srcset) {
	var element_urls = split_srcset(element.srcset);
	var urls = split_srcset(srcset);
	return urls.length === element_urls.length && urls.every(([url, width], i) => width === element_urls[i][1] && (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0])));
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/customizable-select.js
/** @type {boolean | null} */
var supported = null;
/**
* Checks if the browser supports rich HTML content inside `<option>` elements.
* Modern browsers preserve HTML elements inside options, while older browsers
* strip them during parsing, leaving only text content.
* @returns {boolean}
*/
function is_supported() {
	if (supported === null) {
		var select = create_element("select");
		select.innerHTML = create_trusted_html("<option><span>t</span></option>");
		supported = select.firstChild?.firstChild?.nodeType === 1;
	}
	return supported;
}
/**
*
* @param {HTMLElement} element
* @param {(new_element: HTMLElement) => void} update_element
*/
function selectedcontent(element, update_element) {
	if (!is_supported()) return;
	attach(element, () => () => {
		const select = element.closest("select");
		if (!select) return;
		const observer = new MutationObserver((entries) => {
			var selected = false;
			for (const entry of entries) {
				if (entry.target === element) return;
				selected ||= !!entry.target.parentElement?.closest("option")?.selected;
			}
			if (selected) {
				element.replaceWith(element = element.cloneNode(true));
				update_element(element);
			}
		});
		observer.observe(select, {
			childList: true,
			characterData: true,
			subtree: true
		});
		return () => {
			observer.disconnect();
		};
	});
}
/**
* Handles rich HTML content inside `<option>`, `<optgroup>`, or `<select>` elements with browser-specific branching.
* Modern browsers preserve HTML inside options, while older browsers strip it to text only.
*
* @param {HTMLOptionElement | HTMLOptGroupElement | HTMLSelectElement} element The element to process
* @param {() => void} rich_fn Function to process rich HTML content (modern browsers)
*/
function customizable_select(element, rich_fn) {
	var was_hydrating = hydrating;
	if (!is_supported()) {
		set_hydrating(false);
		element.textContent = "";
		element.append(create_comment(""));
	}
	try {
		rich_fn();
	} finally {
		if (was_hydrating) if (hydrating) reset(element);
		else {
			set_hydrating(true);
			set_hydrate_node(element);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/document.js
/**
* @param {(activeElement: Element | null) => void} update
* @returns {void}
*/
function bind_active_element(update) {
	listen(document, ["focusin", "focusout"], (event) => {
		if (event && event.type === "focusout" && event.relatedTarget) return;
		update(document.activeElement);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
/** @import { Batch } from '../../../reactivity/batch.js' */
/**
* @param {HTMLInputElement} input
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_value(input, get, set = get) {
	var batches = /* @__PURE__ */ new WeakSet();
	listen_to_event_and_reset_event(input, "input", async (is_reset) => {
		if (input.type === "checkbox") bind_invalid_checkbox_value();
		/** @type {any} */
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set(value);
		if (current_batch !== null) batches.add(current_batch);
		await tick();
		if (value !== (value = get())) {
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var length = input.value.length;
			input.value = value ?? "";
			if (end !== null) {
				var new_length = input.value.length;
				if (start === end && end === length && new_length > length) {
					input.selectionStart = new_length;
					input.selectionEnd = new_length;
				} else {
					input.selectionStart = start;
					input.selectionEnd = Math.min(end, new_length);
				}
			}
		}
	});
	if (hydrating && input.defaultValue !== input.value || untrack(get) == null && input.value) {
		set(is_numberlike_input(input) ? to_number(input.value) : input.value);
		if (current_batch !== null) batches.add(current_batch);
	}
	render_effect(() => {
		if (input.type === "checkbox") bind_invalid_checkbox_value();
		var value = get();
		if (input === document.activeElement) {
			var batch = async_mode_flag ? previous_batch : current_batch;
			if (batches.has(batch)) return;
		}
		if (is_numberlike_input(input) && value === to_number(input.value)) return;
		if (input.type === "date" && !value && !input.value) return;
		if (value !== input.value) input.value = value ?? "";
	});
}
/** @type {Set<HTMLInputElement[]>} */
var pending = /* @__PURE__ */ new Set();
/**
* @param {HTMLInputElement[]} inputs
* @param {null | [number]} group_index
* @param {HTMLInputElement} input
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_group(inputs, group_index, input, get, set = get) {
	var is_checkbox = input.getAttribute("type") === "checkbox";
	var binding_group = inputs;
	let hydration_mismatch = false;
	if (group_index !== null) for (var index of group_index) binding_group = binding_group[index] ??= [];
	binding_group.push(input);
	listen_to_event_and_reset_event(input, "change", () => {
		var value = input.__value;
		if (is_checkbox) value = get_binding_group_value(binding_group, value, input.checked);
		set(value);
	}, () => set(is_checkbox ? [] : null));
	render_effect(() => {
		var value = get();
		if (hydrating && input.defaultChecked !== input.checked) {
			hydration_mismatch = true;
			return;
		}
		if (is_checkbox) {
			value = value || [];
			input.checked = value.includes(input.__value);
		} else input.checked = is(input.__value, value);
	});
	teardown(() => {
		var index = binding_group.indexOf(input);
		if (index !== -1) binding_group.splice(index, 1);
	});
	if (!pending.has(binding_group)) {
		pending.add(binding_group);
		queue_micro_task(() => {
			binding_group.sort((a, b) => a.compareDocumentPosition(b) === 4 ? -1 : 1);
			pending.delete(binding_group);
		});
	}
	queue_micro_task(() => {
		if (hydration_mismatch) {
			var value;
			if (is_checkbox) value = get_binding_group_value(binding_group, value, input.checked);
			else value = binding_group.find((input) => input.checked)?.__value;
			set(value);
		}
	});
}
/**
* @param {HTMLInputElement} input
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_checked(input, get, set = get) {
	listen_to_event_and_reset_event(input, "change", (is_reset) => {
		set(is_reset ? input.defaultChecked : input.checked);
	});
	if (hydrating && input.defaultChecked !== input.checked || untrack(get) == null) set(input.checked);
	render_effect(() => {
		var value = get();
		input.checked = Boolean(value);
	});
}
/**
* @template V
* @param {Array<HTMLInputElement>} group
* @param {V} __value
* @param {boolean} checked
* @returns {V[]}
*/
function get_binding_group_value(group, __value, checked) {
	/** @type {Set<V>} */
	var value = /* @__PURE__ */ new Set();
	for (var i = 0; i < group.length; i += 1) if (group[i].checked) value.add(group[i].__value);
	if (!checked) value.delete(__value);
	return Array.from(value);
}
/**
* @param {HTMLInputElement} input
*/
function is_numberlike_input(input) {
	var type = input.type;
	return type === "number" || type === "range";
}
/**
* @param {string} value
*/
function to_number(value) {
	return value === "" ? null : +value;
}
/**
* @param {HTMLInputElement} input
* @param {() => FileList | null} get
* @param {(value: FileList | null) => void} set
*/
function bind_files(input, get, set = get) {
	listen_to_event_and_reset_event(input, "change", () => {
		set(input.files);
	});
	if (hydrating && input.files) set(input.files);
	render_effect(() => {
		input.files = get();
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/media.js
/** @param {TimeRanges} ranges */
function time_ranges_to_array(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) array.push({
		start: ranges.start(i),
		end: ranges.end(i)
	});
	return array;
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {() => number | undefined} get
* @param {(value: number) => void} set
* @returns {void}
*/
function bind_current_time(media, get, set = get) {
	/** @type {number} */
	var raf_id;
	/** @type {number} */
	var value;
	var callback = () => {
		cancelAnimationFrame(raf_id);
		if (!media.paused) raf_id = requestAnimationFrame(callback);
		var next_value = media.currentTime;
		if (value !== next_value) set(value = next_value);
	};
	raf_id = requestAnimationFrame(callback);
	media.addEventListener("timeupdate", callback);
	render_effect(() => {
		var next_value = Number(get());
		if (value !== next_value && !isNaN(next_value)) media.currentTime = value = next_value;
	});
	teardown(() => {
		cancelAnimationFrame(raf_id);
		media.removeEventListener("timeupdate", callback);
	});
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(array: Array<{ start: number; end: number }>) => void} set
*/
function bind_buffered(media, set) {
	/** @type {{ start: number; end: number; }[]} */
	var current;
	listen(media, [
		"loadedmetadata",
		"progress",
		"timeupdate",
		"seeking"
	], () => {
		var ranges = media.buffered;
		if (!current || current.length !== ranges.length || current.some((range, i) => ranges.start(i) !== range.start || ranges.end(i) !== range.end)) {
			current = time_ranges_to_array(ranges);
			set(current);
		}
	});
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(array: Array<{ start: number; end: number }>) => void} set
*/
function bind_seekable(media, set) {
	listen(media, ["loadedmetadata"], () => set(time_ranges_to_array(media.seekable)));
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(array: Array<{ start: number; end: number }>) => void} set
*/
function bind_played(media, set) {
	listen(media, ["timeupdate"], () => set(time_ranges_to_array(media.played)));
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(seeking: boolean) => void} set
*/
function bind_seeking(media, set) {
	listen(media, ["seeking", "seeked"], () => set(media.seeking));
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(seeking: boolean) => void} set
*/
function bind_ended(media, set) {
	listen(media, ["timeupdate", "ended"], () => set(media.ended));
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {(ready_state: number) => void} set
*/
function bind_ready_state(media, set) {
	listen(media, [
		"loadedmetadata",
		"loadeddata",
		"canplay",
		"canplaythrough",
		"playing",
		"waiting",
		"emptied"
	], () => set(media.readyState));
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {() => number | undefined} get
* @param {(playback_rate: number) => void} set
*/
function bind_playback_rate(media, get, set = get) {
	effect(() => {
		var value = Number(get());
		if (value !== media.playbackRate && !isNaN(value)) media.playbackRate = value;
	});
	effect(() => {
		listen(media, ["ratechange"], () => {
			set(media.playbackRate);
		});
	});
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {() => boolean | undefined} get
* @param {(paused: boolean) => void} set
*/
function bind_paused(media, get, set = get) {
	var paused = get();
	var update = () => {
		if (paused !== media.paused) set(paused = media.paused);
	};
	listen(media, [
		"play",
		"pause",
		"canplay"
	], update, paused == null);
	effect(() => {
		if ((paused = !!get()) !== media.paused) if (paused) media.pause();
		else media.play().catch((error) => {
			set(paused = true);
			throw error;
		});
	});
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {() => number | undefined} get
* @param {(volume: number) => void} set
*/
function bind_volume(media, get, set = get) {
	var callback = () => {
		set(media.volume);
	};
	if (get() == null) callback();
	listen(media, ["volumechange"], callback, false);
	render_effect(() => {
		var value = Number(get());
		if (value !== media.volume && !isNaN(value)) media.volume = value;
	});
}
/**
* @param {HTMLVideoElement | HTMLAudioElement} media
* @param {() => boolean | undefined} get
* @param {(muted: boolean) => void} set
*/
function bind_muted(media, get, set = get) {
	var callback = () => {
		set(media.muted);
	};
	if (get() == null) callback();
	listen(media, ["volumechange"], callback, false);
	render_effect(() => {
		var value = !!get();
		if (media.muted !== value) media.muted = value;
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/navigator.js
/**
* @param {(online: boolean) => void} update
* @returns {void}
*/
function bind_online(update) {
	listen(window, ["online", "offline"], () => {
		update(navigator.onLine);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/props.js
/**
* Makes an `export`ed (non-prop) variable available on the `$$props` object
* so that consumers can do `bind:x` on the component.
* @template V
* @param {Record<string, unknown>} props
* @param {string} prop
* @param {V} value
* @returns {void}
*/
function bind_prop(props, prop, value) {
	var desc = get_descriptor(props, prop);
	if (desc && desc.set) {
		props[prop] = value;
		teardown(() => {
			props[prop] = null;
		});
	}
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/size.js
/**
* We create one listener for all elements
* @see {@link https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ Explanation}
*/
var ResizeObserverSingleton = class ResizeObserverSingleton {
	/** */
	#listeners = /* @__PURE__ */ new WeakMap();
	/** @type {ResizeObserver | undefined} */
	#observer;
	/** @type {ResizeObserverOptions} */
	#options;
	/** @static */
	static entries = /* @__PURE__ */ new WeakMap();
	/** @param {ResizeObserverOptions} options */
	constructor(options) {
		this.#options = options;
	}
	/**
	* @param {Element} element
	* @param {(entry: ResizeObserverEntry) => any} listener
	*/
	observe(element, listener) {
		var listeners = this.#listeners.get(element) || /* @__PURE__ */ new Set();
		listeners.add(listener);
		this.#listeners.set(element, listeners);
		this.#getObserver().observe(element, this.#options);
		return () => {
			var listeners = this.#listeners.get(element);
			listeners.delete(listener);
			if (listeners.size === 0) {
				this.#listeners.delete(element);
				/** @type {ResizeObserver} */ this.#observer.unobserve(element);
			}
		};
	}
	#getObserver() {
		return this.#observer ?? (this.#observer = new ResizeObserver(
			/** @param {any} entries */
			(entries) => {
				for (var entry of entries) {
					ResizeObserverSingleton.entries.set(entry.target, entry);
					for (var listener of this.#listeners.get(entry.target) || []) listener(entry);
				}
			}
		));
	}
};
var resize_observer_content_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: "content-box" });
var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: "border-box" });
var resize_observer_device_pixel_content_box = /* @__PURE__ */ new ResizeObserverSingleton({ box: "device-pixel-content-box" });
/**
* @param {Element} element
* @param {'contentRect' | 'contentBoxSize' | 'borderBoxSize' | 'devicePixelContentBoxSize'} type
* @param {(entry: keyof ResizeObserverEntry) => void} set
*/
function bind_resize_observer(element, type, set) {
	teardown((type === "contentRect" || type === "contentBoxSize" ? resize_observer_content_box : type === "borderBoxSize" ? resize_observer_border_box : resize_observer_device_pixel_content_box).observe(
		element,
		/** @param {any} entry */
		(entry) => set(entry[type])
	));
}
/**
* @param {HTMLElement} element
* @param {'clientWidth' | 'clientHeight' | 'offsetWidth' | 'offsetHeight'} type
* @param {(size: number) => void} set
*/
function bind_element_size(element, type, set) {
	var unsub = resize_observer_border_box.observe(element, () => set(element[type]));
	effect(() => {
		untrack(() => set(element[type]));
		return unsub;
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
/** @import { ComponentContext, Effect } from '#client' */
/**
* @param {any} bound_value
* @param {Element} element_or_component
* @returns {boolean}
*/
function is_bound_this(bound_value, element_or_component) {
	return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
/**
* @param {any} element_or_component
* @param {(value: unknown, ...parts: unknown[]) => void} update
* @param {(...parts: unknown[]) => unknown} get_value
* @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
* 										returns all the parts of the each block context that are used in the expression
* @returns {void}
*/
function bind_this(element_or_component = {}, update, get_value, get_parts) {
	var component_effect = component_context.r;
	var parent = active_effect;
	effect(() => {
		/** @type {unknown[]} */
		var old_parts;
		/** @type {unknown[]} */
		var parts;
		render_effect(() => {
			old_parts = parts;
			parts = get_parts?.() || [];
			untrack(() => {
				if (!is_bound_this(get_value(...parts), element_or_component)) {
					update(element_or_component, ...parts);
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
				}
			});
		});
		return () => {
			let p = parent;
			while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
			const teardown = () => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
			};
			const original_teardown = p.teardown;
			p.teardown = () => {
				teardown();
				original_teardown?.();
			};
		};
	});
	return element_or_component;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
/**
* @param {'innerHTML' | 'textContent' | 'innerText'} property
* @param {HTMLElement} element
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_content_editable(property, element, get, set = get) {
	element.addEventListener("input", () => {
		set(element[property]);
	});
	render_effect(() => {
		var value = get();
		if (element[property] !== value) if (value == null) {
			var non_null_value = element[property];
			set(non_null_value);
		} else element[property] = value + "";
	});
}
/**
* @param {string} property
* @param {string} event_name
* @param {Element} element
* @param {(value: unknown) => void} set
* @param {() => unknown} [get]
* @returns {void}
*/
function bind_property(property, event_name, element, set, get) {
	var handler = () => {
		set(element[property]);
	};
	element.addEventListener(event_name, handler);
	if (get) render_effect(() => {
		element[property] = get();
	});
	else handler();
	if (element === document.body || element === window || element === document) teardown(() => {
		element.removeEventListener(event_name, handler);
	});
}
/**
* @param {HTMLElement} element
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_focused(element, set) {
	listen(element, ["focus", "blur"], () => {
		set(element === document.activeElement);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
/**
* @param {'x' | 'y'} type
* @param {() => number} get
* @param {(value: number) => void} set
* @returns {void}
*/
function bind_window_scroll(type, get, set = get) {
	var is_scrolling_x = type === "x";
	var target_handler = () => without_reactive_context(() => {
		scrolling = true;
		clearTimeout(timeout);
		timeout = setTimeout(clear, 100);
		set(window[is_scrolling_x ? "scrollX" : "scrollY"]);
	});
	addEventListener("scroll", target_handler, { passive: true });
	var scrolling = false;
	/** @type {ReturnType<typeof setTimeout>} */
	var timeout;
	var clear = () => {
		scrolling = false;
	};
	var first = true;
	render_effect(() => {
		var latest_value = get();
		if (first) first = false;
		else if (!scrolling && latest_value != null) {
			scrolling = true;
			clearTimeout(timeout);
			if (is_scrolling_x) scrollTo(latest_value, window.scrollY);
			else scrollTo(window.scrollX, latest_value);
			timeout = setTimeout(clear, 100);
		}
	});
	effect(target_handler);
	teardown(() => {
		removeEventListener("scroll", target_handler);
	});
}
/**
* @param {'innerWidth' | 'innerHeight' | 'outerWidth' | 'outerHeight'} type
* @param {(size: number) => void} set
*/
function bind_window_size(type, set) {
	listen(window, ["resize"], () => without_reactive_context(() => set(window[type])));
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
/** @import { ComponentContextLegacy } from '#client' */
/**
* Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
* @param {boolean} [immutable]
*/
function init(immutable = false) {
	const context = component_context;
	const callbacks = context.l.u;
	if (!callbacks) return;
	let props = () => deep_read_state(context.s);
	if (immutable) {
		let version = 0;
		let prev = {};
		const d = /* @__PURE__ */ derived(() => {
			let changed = false;
			const props = context.s;
			for (const key in props) if (props[key] !== prev[key]) {
				prev[key] = props[key];
				changed = true;
			}
			if (changed) version++;
			return version;
		});
		props = () => get(d);
	}
	if (callbacks.b.length) user_pre_effect(() => {
		observe_all(context, props);
		run_all(callbacks.b);
	});
	user_effect(() => {
		const fns = untrack(() => callbacks.m.map(run));
		return () => {
			for (const fn of fns) if (typeof fn === "function") fn();
		};
	});
	if (callbacks.a.length) user_effect(() => {
		observe_all(context, props);
		run_all(callbacks.a);
	});
}
/**
* Invoke the getter of all signals associated with a component
* so they can be registered to the effect this function is called in.
* @param {ComponentContextLegacy} context
* @param {(() => void)} props
*/
function observe_all(context, props) {
	if (context.l.s) for (const signal of context.l.s) get(signal);
	props();
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/legacy/misc.js
/**
* Under some circumstances, imports may be reactive in legacy mode. In that case,
* they should be using `reactive_import` as part of the transformation
* @param {() => any} fn
*/
function reactive_import(fn) {
	var s = source(0);
	return function() {
		if (arguments.length === 1) {
			set(s, get(s) + 1);
			return arguments[0];
		} else {
			get(s);
			return fn();
		}
	};
}
/**
* @this {any}
* @param {Record<string, unknown>} $$props
* @param {Event} event
* @returns {void}
*/
function bubble_event($$props, event) {
	var events = $$props.$$events?.[event.type];
	for (var fn of is_array(events) ? events.slice() : events == null ? [] : [events]) fn.call(this, event);
}
/**
* Used to simulate `$on` on a component instance when `compatibility.componentApi === 4`
* @param {Record<string, any>} $$props
* @param {string} event_name
* @param {Function} event_callback
*/
function add_legacy_event_listener($$props, event_name, event_callback) {
	$$props.$$events ||= {};
	$$props.$$events[event_name] ||= [];
	$$props.$$events[event_name].push(event_callback);
}
/**
* Used to simulate `$set` on a component instance when `compatibility.componentApi === 4`.
* Needs component accessors so that it can call the setter of the prop. Therefore doesn't
* work for updating props in `$$props` or `$$restProps`.
* @this {Record<string, any>}
* @param {Record<string, any>} $$new_props
*/
function update_legacy_props($$new_props) {
	for (var key in $$new_props) if (key in this) this[key] = $$new_props[key];
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/props.js
/** @import { Derived, Effect, Source } from './types.js' */
/**
* @param {((value?: number) => number)} fn
* @param {1 | -1} [d]
* @returns {number}
*/
function update_prop(fn, d = 1) {
	const value = fn();
	fn(value + d);
	return value;
}
/**
* @param {((value?: number) => number)} fn
* @param {1 | -1} [d]
* @returns {number}
*/
function update_pre_prop(fn, d = 1) {
	const value = fn() + d;
	fn(value);
	return value;
}
/**
* The proxy handler for rest props (i.e. `const { x, ...rest } = $props()`).
* Is passed the full `$$props` object and excludes the named props.
* @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Set<string | symbol>, name?: string }>}}
*/
var rest_props_handler = {
	get(target, key) {
		if (target.exclude.has(key)) return;
		return target.props[key];
	},
	set(target, key) {
		props_rest_readonly(`${target.name}.${String(key)}`);
		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.has(key)) return;
		if (key in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key]
		};
	},
	has(target, key) {
		if (target.exclude.has(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.has(key));
	}
};
/**
* @param {Record<string, unknown>} props
* @param {Set<string>} exclude
* @param {string} [name]
* @returns {Record<string, unknown>}
*/
/*#__NO_SIDE_EFFECTS__*/
function rest_props(props, exclude, name) {
	return new Proxy({
		props,
		exclude,
		name,
		other: {},
		to_proxy: []
	}, rest_props_handler);
}
/**
* The proxy handler for legacy $$restProps and $$props
* @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, special: Record<string | symbol, (v?: unknown) => unknown>, version: Source<number>, parent_effect: Effect }>}}
*/
var legacy_rest_props_handler = {
	get(target, key) {
		if (target.exclude.includes(key)) return;
		get(target.version);
		return key in target.special ? target.special[key]() : target.props[key];
	},
	set(target, key, value) {
		if (!(key in target.special)) {
			var previous_effect = active_effect;
			try {
				set_active_effect(target.parent_effect);
				/** @type {Record<string, (v?: unknown) => unknown>} */
				target.special[key] = prop({ get [key]() {
					return target.props[key];
				} }, key, 4);
			} finally {
				set_active_effect(previous_effect);
			}
		}
		target.special[key](value);
		update(target.version);
		return true;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.includes(key)) return;
		if (key in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key]
		};
	},
	deleteProperty(target, key) {
		if (target.exclude.includes(key)) return true;
		target.exclude.push(key);
		update(target.version);
		return true;
	},
	has(target, key) {
		if (target.exclude.includes(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
	}
};
/**
* @param {Record<string, unknown>} props
* @param {string[]} exclude
* @returns {Record<string, unknown>}
*/
function legacy_rest_props(props, exclude) {
	return new Proxy({
		props,
		exclude,
		special: {},
		version: source(0),
		parent_effect: active_effect
	}, legacy_rest_props_handler);
}
/**
* The proxy handler for spread props. Handles the incoming array of props
* that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
* them so that the whole thing is passed to the component as the `$$props` argument.
* @type {ProxyHandler<{ props: Array<Record<string | symbol, unknown> | (() => Record<string | symbol, unknown>)> }>}}
*/
var spread_props_handler = {
	get(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key in p) return p[key];
		}
	},
	set(target, key, value) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			const desc = get_descriptor(p, key);
			if (desc && desc.set) {
				desc.set(value);
				return true;
			}
		}
		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key in p) {
				const descriptor = get_descriptor(p, key);
				if (descriptor && !descriptor.configurable) descriptor.configurable = true;
				return descriptor;
			}
		}
	},
	has(target, key) {
		if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (p != null && key in p) return true;
		}
		return false;
	},
	ownKeys(target) {
		/** @type {Array<string | symbol>} */
		const keys = [];
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (!p) continue;
			for (const key in p) if (!keys.includes(key)) keys.push(key);
			for (const key of Object.getOwnPropertySymbols(p)) if (!keys.includes(key)) keys.push(key);
		}
		return keys;
	}
};
/**
* @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
* @returns {any}
*/
function spread_props(...props) {
	return new Proxy({ props }, spread_props_handler);
}
/**
* This function is responsible for synchronizing a possibly bound prop with the inner component state.
* It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
* @template V
* @param {Record<string, unknown>} props
* @param {string} key
* @param {number} flags
* @param {V | (() => V)} [fallback]
* @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
*/
function prop(props, key, flags, fallback) {
	var runes = !legacy_mode_flag || (flags & 2) !== 0;
	var bindable = (flags & 8) !== 0;
	var lazy = (flags & 16) !== 0;
	var fallback_value = fallback;
	var fallback_dirty = true;
	var fallback_signal = void 0;
	var get_fallback = () => {
		if (lazy && runes) {
			fallback_signal ??= /* @__PURE__ */ derived(fallback);
			return get(fallback_signal);
		}
		if (fallback_dirty) {
			fallback_dirty = false;
			fallback_value = lazy ? untrack(fallback) : fallback;
		}
		return fallback_value;
	};
	/** @type {((v: V) => void) | undefined} */
	let setter;
	if (bindable) {
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
	}
	/** @type {V} */
	var initial_value;
	var is_store_sub = false;
	if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
	else initial_value = props[key];
	if (initial_value === void 0 && fallback !== void 0) {
		initial_value = get_fallback();
		if (setter) {
			if (runes) props_invalid_value(key);
			setter(initial_value);
		}
	}
	/** @type {() => V} */
	var getter;
	if (runes) getter = () => {
		var value = props[key];
		if (value === void 0) return get_fallback();
		fallback_dirty = true;
		return value;
	};
	else getter = () => {
		var value = props[key];
		if (value !== void 0) fallback_value = void 0;
		return value === void 0 ? fallback_value : value;
	};
	if (runes && (flags & 4) === 0) return getter;
	if (setter) {
		var legacy_parent = props.$$legacy;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
				return value;
			}
			return getter();
		});
	}
	var overridden = false;
	var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});
	d.label = key;
	if (bindable) get(d);
	var parent_effect = active_effect;
	return (function(value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
			set(d, new_value);
			overridden = true;
			if (fallback_value !== void 0) fallback_value = new_value;
			return value;
		}
		if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
		return get(d);
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/validate.js
/** @import { Blocker } from '#client' */
/**
* @param {string} binding
* @param {Blocker[]} blockers
* @param {() => Record<string, any>} get_object
* @param {() => string} get_property
* @param {number} line
* @param {number} column
*/
function validate_binding(binding, blockers, get_object, get_property, line, column) {
	run_after_blockers(blockers, () => {
		var warned = false;
		var filename = dev_current_component_function?.[FILENAME];
		render_effect(() => {
			if (warned) return;
			var [object, is_store_sub] = capture_store_binding(get_object);
			if (is_store_sub) return;
			var property = get_property();
			var ran = false;
			var effect = render_effect(() => {
				if (ran) return;
				object[property];
			});
			ran = true;
			if (effect.deps === null) {
				binding_property_non_reactive(binding, `${filename}:${line}:${column}`);
				warned = true;
			}
		});
	});
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/custom-element.js
/**
* @typedef {Object} CustomElementPropDefinition
* @property {string} [attribute]
* @property {boolean} [reflect]
* @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
*/
/** @type {any} */
var SvelteElement;
if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
	/** The Svelte component constructor */
	$$ctor;
	/** Slots */
	$$s;
	/** @type {any} The Svelte component instance */
	$$c;
	/** Whether or not the custom element is connected */
	$$cn = false;
	/** @type {Record<string, any>} Component props data */
	$$d = {};
	/** `true` if currently in the process of reflecting component props back to attributes */
	$$r = false;
	/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
	$$p_d = {};
	/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
	$$l = {};
	/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
	$$l_u = /* @__PURE__ */ new Map();
	/** @type {any} The managed render effect for reflecting attributes */
	$$me;
	/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
	$$shadowRoot = null;
	/**
	* @param {*} $$componentCtor
	* @param {*} $$slots
	* @param {ShadowRootInit | undefined} shadow_root_init
	*/
	constructor($$componentCtor, $$slots, shadow_root_init) {
		super();
		this.$$ctor = $$componentCtor;
		this.$$s = $$slots;
		if (shadow_root_init) this.$$shadowRoot = this.attachShadow(shadow_root_init);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	addEventListener(type, listener, options) {
		this.$$l[type] = this.$$l[type] || [];
		this.$$l[type].push(listener);
		if (this.$$c) {
			const unsub = this.$$c.$on(type, listener);
			this.$$l_u.set(listener, unsub);
		}
		super.addEventListener(type, listener, options);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	removeEventListener(type, listener, options) {
		super.removeEventListener(type, listener, options);
		if (this.$$c) {
			const unsub = this.$$l_u.get(listener);
			if (unsub) {
				unsub();
				this.$$l_u.delete(listener);
			}
		}
	}
	async connectedCallback() {
		this.$$cn = true;
		if (!this.$$c) {
			await Promise.resolve();
			if (!this.$$cn || this.$$c) return;
			/** @param {string} name */
			function create_slot(name) {
				/**
				* @param {Element} anchor
				*/
				return (anchor) => {
					const slot = create_element("slot");
					if (name !== "default") slot.name = name;
					append(anchor, slot);
				};
			}
			/** @type {Record<string, any>} */
			const $$slots = {};
			const existing_slots = get_custom_elements_slots(this);
			for (const name of this.$$s) if (name in existing_slots) if (name === "default" && !this.$$d.children) {
				this.$$d.children = create_slot(name);
				$$slots.default = true;
			} else $$slots[name] = create_slot(name);
			for (const attribute of this.attributes) {
				const name = this.$$g_p(attribute.name);
				if (!(name in this.$$d)) this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
			}
			for (const key in this.$$p_d) if (!(key in this.$$d) && this[key] !== void 0) {
				this.$$d[key] = this[key];
				delete this[key];
			}
			this.$$c = createClassComponent({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots,
					$$host: this
				}
			});
			this.$$me = effect_root(() => {
				render_effect(() => {
					this.$$r = true;
					for (const key of object_keys(this.$$c)) {
						if (!this.$$p_d[key]?.reflect) continue;
						this.$$d[key] = this.$$c[key];
						const attribute_value = get_custom_element_value(key, this.$$d[key], this.$$p_d, "toAttribute");
						if (attribute_value == null) this.removeAttribute(this.$$p_d[key].attribute || key);
						else this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
					}
					this.$$r = false;
				});
			});
			for (const type in this.$$l) for (const listener of this.$$l[type]) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			this.$$l = {};
		}
	}
	/**
	* @param {string} attr
	* @param {string} _oldValue
	* @param {string} newValue
	*/
	attributeChangedCallback(attr, _oldValue, newValue) {
		if (this.$$r) return;
		attr = this.$$g_p(attr);
		this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
		this.$$c?.$set({ [attr]: this.$$d[attr] });
	}
	disconnectedCallback() {
		this.$$cn = false;
		Promise.resolve().then(() => {
			if (!this.$$cn && this.$$c) {
				this.$$c.$destroy();
				this.$$me();
				this.$$c = void 0;
			}
		});
	}
	/**
	* @param {string} attribute_name
	*/
	$$g_p(attribute_name) {
		return object_keys(this.$$p_d).find((key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name) || attribute_name;
	}
};
/**
* @param {string} prop
* @param {any} value
* @param {Record<string, CustomElementPropDefinition>} props_definition
* @param {'toAttribute' | 'toProp'} [transform]
*/
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
	if (!transform || !props_definition[prop]) return value;
	else if (transform === "toAttribute") switch (type) {
		case "Object":
		case "Array": return value == null ? null : JSON.stringify(value);
		case "Boolean": return value ? "" : null;
		case "Number": return value == null ? null : value;
		default: return value;
	}
	else switch (type) {
		case "Object":
		case "Array": return value && JSON.parse(value);
		case "Boolean": return value;
		case "Number": return value != null ? +value : value;
		default: return value;
	}
}
/**
* @param {HTMLElement} element
*/
function get_custom_elements_slots(element) {
	/** @type {Record<string, true>} */
	const result = {};
	element.childNodes.forEach((node) => {
		result[node.slot || "default"] = true;
	});
	return result;
}
/**
* @internal
*
* Turn a Svelte component into a custom element.
* @param {any} Component  A Svelte component function
* @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
* @param {string[]} slots  The slots to create
* @param {string[]} exports  Explicitly exported values, other than props
* @param {ShadowRootInit | undefined} shadow_root_init  Options passed to shadow DOM constructor
* @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
*/
function create_custom_element(Component, props_definition, slots, exports, shadow_root_init, extend) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, shadow_root_init);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return object_keys(props_definition).map((key) => (props_definition[key].attribute || key).toLowerCase());
		}
	};
	object_keys(props_definition).forEach((prop) => {
		define_property(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				var component = this.$$c;
				if (component) if (get_descriptor(component, prop)?.get) component[prop] = value;
				else component.$set({ [prop]: value });
			}
		});
	});
	exports.forEach((property) => {
		define_property(Class.prototype, property, { get() {
			return this.$$c?.[property];
		} });
	});
	if (extend) Class = extend(Class);
	Component.element = Class;
	return Class;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dev/console-log.js
/**
* @param {string} method
* @param  {...any} objects
*/
function log_if_contains_state(method, ...objects) {
	untrack(() => {
		try {
			let has_state = false;
			const transformed = [];
			for (const obj of objects) if (obj && typeof obj === "object" && STATE_SYMBOL in obj) {
				transformed.push(snapshot(obj, true));
				has_state = true;
			} else transformed.push(obj);
			if (has_state) {
				console_log_state(method);
				console.log("%c[snapshot]", "color: grey", ...transformed);
			}
		} catch {}
	});
	return objects;
}
//#endregion
export { set_value as $, hydratable as $t, bind_playback_rate as A, check_target as At, bind_active_element as B, afterUpdate as Bt, bind_prop as C, css_props as Ct, bind_ended as D, validate_snippet_args as Dt, bind_current_time as E, await_block as Et, bind_volume as F, cleanup_styles as Ft, attribute_effect as G, onMount as Gt, selectedcontent as H, createEventDispatcher as Ht, bind_checked as I, assign as It, set_checked as J, wrap_snippet as Jt, remove_input_defaults as K, createRawSnippet as Kt, bind_files as L, assign_async as Lt, bind_ready_state as M, create_ownership_validator as Mt, bind_seekable as N, hmr as Nt, bind_muted as O, async as Ot, bind_seeking as P, add_locations as Pt, set_selected as Q, validate_void_dynamic_element as Qt, bind_group as R, createAttachmentKey as Rt, bind_resize_observer as S, index as St, bind_buffered as T, if_block as Tt, CLASS as U, getAbortSignal as Ut, customizable_select as V, beforeUpdate as Vt, STYLE as W, onDestroy as Wt, set_default_checked as X, validate_dynamic_element_tag as Xt, set_custom_element_data as Y, prevent_snippet_stringification as Yt, set_default_value as Z, validate_store as Zt, bind_content_editable as _, component as _t, prop as a, set_class as at, bind_this as b, html as bt, update_pre_prop as c, attach as ct, bubble_event as d, head as dt, set_xlink_attribute as et, reactive_import as f, element as ft, bind_window_size as g, raf as gt, bind_window_scroll as h, loop as ht, legacy_rest_props as i, set_style as it, bind_played as j, legacy_api as jt, bind_paused as k, inspect as kt, update_prop as l, action as lt, init as m, transition as mt, create_custom_element as n, init_select as nt, rest_props as o, attr as ot, update_legacy_props as p, animation as pt, set_attribute as q, snippet as qt, validate_binding as r, select_option as rt, spread_props as s, clsx as st, log_if_contains_state as t, bind_select_value as tt, add_legacy_event_listener as u, append_styles$1 as ut, bind_focused as v, sanitize_slots as vt, bind_online as w, key as wt, bind_element_size as x, each as xt, bind_property as y, slot as yt, bind_value as z, fromAction as zt };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LURmTkNvUEY1LmpzIiwibmFtZXMiOlsiI3RyYW5zaXRpb24iLCIjYmF0Y2hlcyIsIiNvbnNjcmVlbiIsIiNvdXRyb2luZyIsIiNvZmZzY3JlZW4iLCIjY29tbWl0IiwiI2Rpc2NhcmQiLCJhcHBlbmRfc3R5bGVzIiwiX2Nsc3giLCJ3LnNlbGVjdF9tdWx0aXBsZV9pbnZhbGlkX3ZhbHVlIiwiI29wdGlvbnMiLCIjbGlzdGVuZXJzIiwiI2dldE9ic2VydmVyIiwiI29ic2VydmVyIl0sInNvdXJjZXMiOlsiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9oeWRyYXRhYmxlLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL3NoYXJlZC92YWxpZGF0ZS5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9icmFuY2hlcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9zbmlwcGV0LmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2luZGV4LWNsaWVudC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9hdHRhY2htZW50cy9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZGV2L2Fzc2lnbi5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZGV2L2Nzcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZGV2L2VsZW1lbnRzLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kZXYvaG1yLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kZXYvb3duZXJzaGlwLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kZXYvbGVnYWN5LmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kZXYvaW5zcGVjdC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9hc3luYy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZGV2L3ZhbGlkYXRpb24uanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvYXdhaXQuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3MvaWYuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3Mva2V5LmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vYmxvY2tzL2Nzcy1wcm9wcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9lYWNoLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vYmxvY2tzL2h0bWwuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9ibG9ja3Mvc2xvdC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9zdmVsdGUtY29tcG9uZW50LmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC90aW1pbmcuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2xvb3AuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy90cmFuc2l0aW9ucy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9zdmVsdGUtZWxlbWVudC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Jsb2Nrcy9zdmVsdGUtaGVhZC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2Nzcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2FjdGlvbnMuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9hdHRhY2htZW50cy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9lc2NhcGluZy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9zaGFyZWQvYXR0cmlidXRlcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2NsYXNzLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvc3R5bGUuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy9zZWxlY3QuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9hdHRyaWJ1dGVzLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvY3VzdG9taXphYmxlLXNlbGVjdC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL2RvY3VtZW50LmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvYmluZGluZ3MvaW5wdXQuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy9tZWRpYS5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL25hdmlnYXRvci5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL3Byb3BzLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvYmluZGluZ3Mvc2l6ZS5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9pbnRlcm5hbC9jbGllbnQvZG9tL2VsZW1lbnRzL2JpbmRpbmdzL3RoaXMuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy91bml2ZXJzYWwuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9lbGVtZW50cy9iaW5kaW5ncy93aW5kb3cuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2RvbS9sZWdhY3kvbGlmZWN5Y2xlLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vbGVnYWN5L21pc2MuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvcHJvcHMuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L3ZhbGlkYXRlLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL2ludGVybmFsL2NsaWVudC9kb20vZWxlbWVudHMvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvaW50ZXJuYWwvY2xpZW50L2Rldi9jb25zb2xlLWxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcgfSBmcm9tICcuLi9mbGFncy9pbmRleC5qcyc7XG5pbXBvcnQgeyBoeWRyYXRpbmcgfSBmcm9tICcuL2RvbS9oeWRyYXRpb24uanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuL3dhcm5pbmdzLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7KCkgPT4gVH0gZm5cbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0YWJsZShrZXksIGZuKSB7XG5cdGlmICghYXN5bmNfbW9kZV9mbGFnKSB7XG5cdFx0ZS5leHBlcmltZW50YWxfYXN5bmNfcmVxdWlyZWQoJ2h5ZHJhdGFibGUnKTtcblx0fVxuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRjb25zdCBzdG9yZSA9IHdpbmRvdy5fX3N2ZWx0ZT8uaDtcblxuXHRcdGlmIChzdG9yZT8uaGFzKGtleSkpIHtcblx0XHRcdHJldHVybiAvKiogQHR5cGUge1R9ICovIChzdG9yZS5nZXQoa2V5KSk7XG5cdFx0fVxuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0ZS5oeWRyYXRhYmxlX21pc3NpbmdfYnV0X3JlcXVpcmVkKGtleSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHcuaHlkcmF0YWJsZV9taXNzaW5nX2J1dF9leHBlY3RlZChrZXkpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmbigpO1xufVxuIiwiaW1wb3J0IHsgaXNfdm9pZCB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQgKiBhcyBlIGZyb20gJy4vZXJyb3JzLmpzJztcblxuZXhwb3J0IHsgaW52YWxpZF9kZWZhdWx0X3NuaXBwZXQgfSBmcm9tICcuL2Vycm9ycy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiBzdHJpbmd9IHRhZ19mblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV92b2lkX2R5bmFtaWNfZWxlbWVudCh0YWdfZm4pIHtcblx0Y29uc3QgdGFnID0gdGFnX2ZuKCk7XG5cdGlmICh0YWcgJiYgaXNfdm9pZCh0YWcpKSB7XG5cdFx0dy5keW5hbWljX3ZvaWRfZWxlbWVudF9jb250ZW50KHRhZyk7XG5cdH1cbn1cblxuLyoqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gdGFnX2ZuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfZHluYW1pY19lbGVtZW50X3RhZyh0YWdfZm4pIHtcblx0Y29uc3QgdGFnID0gdGFnX2ZuKCk7XG5cdGNvbnN0IGlzX3N0cmluZyA9IHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnO1xuXHRpZiAodGFnICYmICFpc19zdHJpbmcpIHtcblx0XHRlLnN2ZWx0ZV9lbGVtZW50X2ludmFsaWRfdGhpc192YWx1ZSgpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IHN0b3JlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcblx0aWYgKHN0b3JlICE9IG51bGwgJiYgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdGUuc3RvcmVfaW52YWxpZF9zaGFwZShuYW1lKTtcblx0fVxufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB1bmtub3dufSBUXG4gKiBAcGFyYW0ge1R9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50X3NuaXBwZXRfc3RyaW5naWZpY2F0aW9uKGZuKSB7XG5cdGZuLnRvU3RyaW5nID0gKCkgPT4ge1xuXHRcdGUuc25pcHBldF93aXRob3V0X3JlbmRlcl90YWcoKTtcblx0XHRyZXR1cm4gJyc7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgQmF0Y2gsIGN1cnJlbnRfYmF0Y2ggfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7XG5cdGJyYW5jaCxcblx0ZGVzdHJveV9lZmZlY3QsXG5cdG1vdmVfZWZmZWN0LFxuXHRwYXVzZV9lZmZlY3QsXG5cdHJlc3VtZV9lZmZlY3Rcbn0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IEhNUl9BTkNIT1IgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaHlkcmF0ZV9ub2RlLCBoeWRyYXRpbmcgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgY3JlYXRlX3RleHQsIHNob3VsZF9kZWZlcl9hcHBlbmQgfSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7IGVmZmVjdDogRWZmZWN0LCBmcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCB9fSBCcmFuY2hcbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBLZXlcbiAqL1xuZXhwb3J0IGNsYXNzIEJyYW5jaE1hbmFnZXIge1xuXHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi9cblx0YW5jaG9yO1xuXG5cdC8qKiBAdHlwZSB7TWFwPEJhdGNoLCBLZXk+fSAqL1xuXHQjYmF0Y2hlcyA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogTWFwIG9mIGtleXMgdG8gZWZmZWN0cyB0aGF0IGFyZSBjdXJyZW50bHkgcmVuZGVyZWQgaW4gdGhlIERPTS5cblx0ICogVGhlc2UgZWZmZWN0cyBhcmUgdmlzaWJsZSBhbmQgYWN0aXZlbHkgcGFydCBvZiB0aGUgZG9jdW1lbnQgdHJlZS5cblx0ICogRXhhbXBsZTpcblx0ICogYGBgXG5cdCAqIHsjaWYgY29uZGl0aW9ufVxuXHQgKiBcdGZvb1xuXHQgKiB7OmVsc2V9XG5cdCAqIFx0YmFyXG5cdCAqIHsvaWZ9XG5cdCAqIGBgYFxuXHQgKiBDYW4gcmVzdWx0IGluIHRoZSBlbnRyaWVzIGB0cnVlLT5FZmZlY3RgIGFuZCBgZmFsc2UtPkVmZmVjdGBcblx0ICogQHR5cGUge01hcDxLZXksIEVmZmVjdD59XG5cdCAqL1xuXHQjb25zY3JlZW4gPSBuZXcgTWFwKCk7XG5cblx0LyoqXG5cdCAqIFNpbWlsYXIgdG8gI29uc2NyZWVuIHdpdGggcmVzcGVjdCB0byB0aGUga2V5cywgYnV0IGNvbnRhaW5zIGJyYW5jaGVzIHRoYXQgYXJlIG5vdCB5ZXRcblx0ICogaW4gdGhlIERPTSwgYmVjYXVzZSB0aGVpciBpbnNlcnRpb24gaXMgZGVmZXJyZWQuXG5cdCAqIEB0eXBlIHtNYXA8S2V5LCBCcmFuY2g+fVxuXHQgKi9cblx0I29mZnNjcmVlbiA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogS2V5cyBvZiBlZmZlY3RzIHRoYXQgYXJlIGN1cnJlbnRseSBvdXRyb2luZ1xuXHQgKiBAdHlwZSB7U2V0PEtleT59XG5cdCAqL1xuXHQjb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdG8gcGF1c2UgKGkuZS4gb3V0cm8pIG9uIGNoYW5nZSwgb3IgZGVzdHJveSBpbW1lZGlhdGVseS5cblx0ICogVGhpcyBpcyBuZWNlc3NhcnkgZm9yIGA8c3ZlbHRlOmVsZW1lbnQ+YFxuXHQgKi9cblx0I3RyYW5zaXRpb24gPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gYW5jaG9yXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJhbnNpdGlvblxuXHQgKi9cblx0Y29uc3RydWN0b3IoYW5jaG9yLCB0cmFuc2l0aW9uID0gdHJ1ZSkge1xuXHRcdHRoaXMuYW5jaG9yID0gYW5jaG9yO1xuXHRcdHRoaXMuI3RyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7QmF0Y2h9IGJhdGNoXG5cdCAqL1xuXHQjY29tbWl0ID0gKGJhdGNoKSA9PiB7XG5cdFx0Ly8gaWYgdGhpcyBiYXRjaCB3YXMgbWFkZSBvYnNvbGV0ZSwgYmFpbFxuXHRcdGlmICghdGhpcy4jYmF0Y2hlcy5oYXMoYmF0Y2gpKSByZXR1cm47XG5cblx0XHR2YXIga2V5ID0gLyoqIEB0eXBlIHtLZXl9ICovICh0aGlzLiNiYXRjaGVzLmdldChiYXRjaCkpO1xuXG5cdFx0dmFyIG9uc2NyZWVuID0gdGhpcy4jb25zY3JlZW4uZ2V0KGtleSk7XG5cblx0XHRpZiAob25zY3JlZW4pIHtcblx0XHRcdC8vIGVmZmVjdCBpcyBhbHJlYWR5IGluIHRoZSBET00g4oCUIGFib3J0IGFueSBjdXJyZW50IG91dHJvXG5cdFx0XHRyZXN1bWVfZWZmZWN0KG9uc2NyZWVuKTtcblx0XHRcdHRoaXMuI291dHJvaW5nLmRlbGV0ZShrZXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBlZmZlY3QgaXMgY3VycmVudGx5IG9mZnNjcmVlbi4gcHV0IGl0IGluIHRoZSBET01cblx0XHRcdHZhciBvZmZzY3JlZW4gPSB0aGlzLiNvZmZzY3JlZW4uZ2V0KGtleSk7XG5cblx0XHRcdGlmIChvZmZzY3JlZW4pIHtcblx0XHRcdFx0Ly8gZWZmZWN0IGNvdWxkIGhhdmUgYmVlbiBvdXRybydlZCBiZWZvcmUgdGhyb3VnaCBhIHByaW9yIGJhdGNoIOKAlCByZXN1bWUgaWYgbmVjZXNzYXJ5XG5cdFx0XHRcdHJlc3VtZV9lZmZlY3Qob2Zmc2NyZWVuLmVmZmVjdCk7XG5cdFx0XHRcdHRoaXMuI29uc2NyZWVuLnNldChrZXksIG9mZnNjcmVlbi5lZmZlY3QpO1xuXHRcdFx0XHR0aGlzLiNvZmZzY3JlZW4uZGVsZXRlKGtleSk7XG5cblx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdC8vIFRlbGwgaG1yLmpzIGFib3V0IHRoZSBhbmNob3IgaXQgc2hvdWxkIHVzZSBmb3IgdXBkYXRlcyxcblx0XHRcdFx0XHQvLyBzaW5jZSB0aGUgaW5pdGlhbCBvbmUgd2lsbCBiZSByZW1vdmVkXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHthbnl9ICovIChvZmZzY3JlZW4uZnJhZ21lbnQubGFzdENoaWxkKVtITVJfQU5DSE9SXSA9IHRoaXMuYW5jaG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIHRoZSBhbmNob3IuLi5cblx0XHRcdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChvZmZzY3JlZW4uZnJhZ21lbnQubGFzdENoaWxkKS5yZW1vdmUoKTtcblxuXHRcdFx0XHQvLyAuLi5hbmQgYXBwZW5kIHRoZSBmcmFnbWVudFxuXHRcdFx0XHR0aGlzLmFuY2hvci5iZWZvcmUob2Zmc2NyZWVuLmZyYWdtZW50KTtcblx0XHRcdFx0b25zY3JlZW4gPSBvZmZzY3JlZW4uZWZmZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgW2IsIGtdIG9mIHRoaXMuI2JhdGNoZXMpIHtcblx0XHRcdHRoaXMuI2JhdGNoZXMuZGVsZXRlKGIpO1xuXG5cdFx0XHRpZiAoYiA9PT0gYmF0Y2gpIHtcblx0XHRcdFx0Ly8ga2VlcCB2YWx1ZXMgZm9yIG5ld2VyIGJhdGNoZXNcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IG9mZnNjcmVlbiA9IHRoaXMuI29mZnNjcmVlbi5nZXQoayk7XG5cblx0XHRcdGlmIChvZmZzY3JlZW4pIHtcblx0XHRcdFx0Ly8gZm9yIG9sZGVyIGJhdGNoZXMsIGRlc3Ryb3kgb2Zmc2NyZWVuIGVmZmVjdHNcblx0XHRcdFx0Ly8gYXMgdGhleSB3aWxsIG5ldmVyIGJlIGNvbW1pdHRlZFxuXHRcdFx0XHRkZXN0cm95X2VmZmVjdChvZmZzY3JlZW4uZWZmZWN0KTtcblx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBvdXRyby9kZXN0cm95IGFsbCBvbnNjcmVlbiBlZmZlY3RzLi4uXG5cdFx0Zm9yIChjb25zdCBbaywgZWZmZWN0XSBvZiB0aGlzLiNvbnNjcmVlbikge1xuXHRcdFx0Ly8gLi4uZXhjZXB0IHRoZSBvbmUgdGhhdCB3YXMganVzdCBjb21taXR0ZWRcblx0XHRcdC8vICAgIG9yIHRob3NlIHRoYXQgYXJlIGFscmVhZHkgb3V0cm9pbmcgKGVsc2UgdGhlIHRyYW5zaXRpb24gaXMgYWJvcnRlZCBhbmQgdGhlIGVmZmVjdCBkZXN0cm95ZWQgcmlnaHQgYXdheSlcblx0XHRcdGlmIChrID09PSBrZXkgfHwgdGhpcy4jb3V0cm9pbmcuaGFzKGspKSBjb250aW51ZTtcblxuXHRcdFx0Y29uc3Qgb25fZGVzdHJveSA9ICgpID0+IHtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IEFycmF5LmZyb20odGhpcy4jYmF0Y2hlcy52YWx1ZXMoKSk7XG5cblx0XHRcdFx0aWYgKGtleXMuaW5jbHVkZXMoaykpIHtcblx0XHRcdFx0XHQvLyBrZWVwIHRoZSBlZmZlY3Qgb2Zmc2NyZWVuLCBhcyBhbm90aGVyIGJhdGNoIHdpbGwgbmVlZCBpdFxuXHRcdFx0XHRcdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHRtb3ZlX2VmZmVjdChlZmZlY3QsIGZyYWdtZW50KTtcblxuXHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZChjcmVhdGVfdGV4dCgpKTsgLy8gVE9ETyBjYW4gd2UgYXZvaWQgdGhpcz9cblxuXHRcdFx0XHRcdHRoaXMuI29mZnNjcmVlbi5zZXQoaywgeyBlZmZlY3QsIGZyYWdtZW50IH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlc3Ryb3lfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLiNvdXRyb2luZy5kZWxldGUoayk7XG5cdFx0XHRcdHRoaXMuI29uc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH07XG5cblx0XHRcdGlmICh0aGlzLiN0cmFuc2l0aW9uIHx8ICFvbnNjcmVlbikge1xuXHRcdFx0XHR0aGlzLiNvdXRyb2luZy5hZGQoayk7XG5cdFx0XHRcdHBhdXNlX2VmZmVjdChlZmZlY3QsIG9uX2Rlc3Ryb3ksIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9uX2Rlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7QmF0Y2h9IGJhdGNoXG5cdCAqL1xuXHQjZGlzY2FyZCA9IChiYXRjaCkgPT4ge1xuXHRcdHRoaXMuI2JhdGNoZXMuZGVsZXRlKGJhdGNoKTtcblxuXHRcdGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKHRoaXMuI2JhdGNoZXMudmFsdWVzKCkpO1xuXG5cdFx0Zm9yIChjb25zdCBbaywgYnJhbmNoXSBvZiB0aGlzLiNvZmZzY3JlZW4pIHtcblx0XHRcdGlmICgha2V5cy5pbmNsdWRlcyhrKSkge1xuXHRcdFx0XHRkZXN0cm95X2VmZmVjdChicmFuY2guZWZmZWN0KTtcblx0XHRcdFx0dGhpcy4jb2Zmc2NyZWVuLmRlbGV0ZShrKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB7YW55fSBrZXlcblx0ICogQHBhcmFtIHtudWxsIHwgKCh0YXJnZXQ6IFRlbXBsYXRlTm9kZSkgPT4gdm9pZCl9IGZuXG5cdCAqL1xuXHRlbnN1cmUoa2V5LCBmbikge1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0XHR2YXIgZGVmZXIgPSBzaG91bGRfZGVmZXJfYXBwZW5kKCk7XG5cblx0XHRpZiAoZm4gJiYgIXRoaXMuI29uc2NyZWVuLmhhcyhrZXkpICYmICF0aGlzLiNvZmZzY3JlZW4uaGFzKGtleSkpIHtcblx0XHRcdGlmIChkZWZlcikge1xuXHRcdFx0XHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBjcmVhdGVfdGV4dCgpO1xuXG5cdFx0XHRcdGZyYWdtZW50LmFwcGVuZCh0YXJnZXQpO1xuXG5cdFx0XHRcdHRoaXMuI29mZnNjcmVlbi5zZXQoa2V5LCB7XG5cdFx0XHRcdFx0ZWZmZWN0OiBicmFuY2goKCkgPT4gZm4odGFyZ2V0KSksXG5cdFx0XHRcdFx0ZnJhZ21lbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLiNvbnNjcmVlbi5zZXQoXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGJyYW5jaCgoKSA9PiBmbih0aGlzLmFuY2hvcikpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy4jYmF0Y2hlcy5zZXQoYmF0Y2gsIGtleSk7XG5cblx0XHRpZiAoZGVmZXIpIHtcblx0XHRcdGZvciAoY29uc3QgW2ssIGVmZmVjdF0gb2YgdGhpcy4jb25zY3JlZW4pIHtcblx0XHRcdFx0aWYgKGsgPT09IGtleSkge1xuXHRcdFx0XHRcdGJhdGNoLnVuc2tpcF9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiYXRjaC5za2lwX2VmZmVjdChlZmZlY3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3QgW2ssIGJyYW5jaF0gb2YgdGhpcy4jb2Zmc2NyZWVuKSB7XG5cdFx0XHRcdGlmIChrID09PSBrZXkpIHtcblx0XHRcdFx0XHRiYXRjaC51bnNraXBfZWZmZWN0KGJyYW5jaC5lZmZlY3QpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJhdGNoLnNraXBfZWZmZWN0KGJyYW5jaC5lZmZlY3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGJhdGNoLm9uY29tbWl0KHRoaXMuI2NvbW1pdCk7XG5cdFx0XHRiYXRjaC5vbmRpc2NhcmQodGhpcy4jZGlzY2FyZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0dGhpcy5hbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuI2NvbW1pdChiYXRjaCk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IFNuaXBwZXQgfSBmcm9tICdzdmVsdGUnICovXG4vKiogQGltcG9ydCB7IFRlbXBsYXRlTm9kZSB9IGZyb20gJyNjbGllbnQnICovXG4vKiogQGltcG9ydCB7IEdldHRlcnMgfSBmcm9tICcjc2hhcmVkJyAqL1xuaW1wb3J0IHsgRUZGRUNUX1RSQU5TUEFSRU5ULCBFTEVNRU5UX05PREUgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBibG9jaywgdGVhcmRvd24gfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHtcblx0ZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uLFxuXHRzZXRfZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uXG59IGZyb20gJy4uLy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgaHlkcmF0ZV9uZXh0LCBoeWRyYXRlX25vZGUsIGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZnJhZ21lbnRfZnJvbV9odG1sIH0gZnJvbSAnLi4vcmVjb25jaWxlci5qcyc7XG5pbXBvcnQgeyBhc3NpZ25fbm9kZXMgfSBmcm9tICcuLi90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uLy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgZ2V0X2ZpcnN0X2NoaWxkLCBnZXRfbmV4dF9zaWJsaW5nIH0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgeyBwcmV2ZW50X3NuaXBwZXRfc3RyaW5naWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRlLmpzJztcbmltcG9ydCB7IEJyYW5jaE1hbmFnZXIgfSBmcm9tICcuL2JyYW5jaGVzLmpzJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgeyhub2RlOiBUZW1wbGF0ZU5vZGUsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBTbmlwcGV0Rm5cbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0geygpID0+IFNuaXBwZXRGbiB8IG51bGwgfCB1bmRlZmluZWR9IGdldF9zbmlwcGV0XG4gKiBAcGFyYW0geygoKSA9PiBhbnkpW119IGFyZ3NcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc25pcHBldChub2RlLCBnZXRfc25pcHBldCwgLi4uYXJncykge1xuXHR2YXIgYnJhbmNoZXMgPSBuZXcgQnJhbmNoTWFuYWdlcihub2RlKTtcblxuXHRibG9jaygoKSA9PiB7XG5cdFx0Y29uc3Qgc25pcHBldCA9IGdldF9zbmlwcGV0KCkgPz8gbnVsbDtcblxuXHRcdGlmIChERVYgJiYgc25pcHBldCA9PSBudWxsKSB7XG5cdFx0XHRlLmludmFsaWRfc25pcHBldCgpO1xuXHRcdH1cblxuXHRcdGJyYW5jaGVzLmVuc3VyZShzbmlwcGV0LCBzbmlwcGV0ICYmICgoYW5jaG9yKSA9PiBzbmlwcGV0KGFuY2hvciwgLi4uYXJncykpKTtcblx0fSwgRUZGRUNUX1RSQU5TUEFSRU5UKTtcbn1cblxuLyoqXG4gKiBJbiBkZXZlbG9wbWVudCwgd3JhcCB0aGUgc25pcHBldCBmdW5jdGlvbiBzbyB0aGF0IGl0IHBhc3NlcyB2YWxpZGF0aW9uLCBhbmQgc28gdGhhdCB0aGVcbiAqIGNvcnJlY3QgY29tcG9uZW50IGNvbnRleHQgaXMgc2V0IGZvciBvd25lcnNoaXAgY2hlY2tzXG4gKiBAcGFyYW0ge2FueX0gY29tcG9uZW50XG4gKiBAcGFyYW0geyhub2RlOiBUZW1wbGF0ZU5vZGUsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcF9zbmlwcGV0KGNvbXBvbmVudCwgZm4pIHtcblx0Y29uc3Qgc25pcHBldCA9ICgvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gbm9kZSwgLyoqIEB0eXBlIHthbnlbXX0gKi8gLi4uYXJncykgPT4ge1xuXHRcdHZhciBwcmV2aW91c19jb21wb25lbnRfZnVuY3Rpb24gPSBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb247XG5cdFx0c2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbihjb21wb25lbnQpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBmbihub2RlLCAuLi5hcmdzKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0c2V0X2Rldl9jdXJyZW50X2NvbXBvbmVudF9mdW5jdGlvbihwcmV2aW91c19jb21wb25lbnRfZnVuY3Rpb24pO1xuXHRcdH1cblx0fTtcblxuXHRwcmV2ZW50X3NuaXBwZXRfc3RyaW5naWZpY2F0aW9uKHNuaXBwZXQpO1xuXG5cdHJldHVybiBzbmlwcGV0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHNuaXBwZXQgcHJvZ3JhbW1hdGljYWxseVxuICogQHRlbXBsYXRlIHt1bmtub3duW119IFBhcmFtc1xuICogQHBhcmFtIHsoLi4ucGFyYW1zOiBHZXR0ZXJzPFBhcmFtcz4pID0+IHtcbiAqICAgcmVuZGVyOiAoKSA9PiBzdHJpbmdcbiAqICAgc2V0dXA/OiAoZWxlbWVudDogRWxlbWVudCkgPT4gdm9pZCB8ICgoKSA9PiB2b2lkKVxuICogfX0gZm5cbiAqIEByZXR1cm5zIHtTbmlwcGV0PFBhcmFtcz59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSYXdTbmlwcGV0KGZuKSB7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3IgdGhlIHR5cGVzIGFyZSBhIGxpZVxuXHRyZXR1cm4gKC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyBhbmNob3IsIC8qKiBAdHlwZSB7R2V0dGVyczxQYXJhbXM+fSAqLyAuLi5wYXJhbXMpID0+IHtcblx0XHR2YXIgc25pcHBldCA9IGZuKC4uLnBhcmFtcyk7XG5cblx0XHQvKiogQHR5cGUge0VsZW1lbnR9ICovXG5cdFx0dmFyIGVsZW1lbnQ7XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRlbGVtZW50ID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoaHlkcmF0ZV9ub2RlKTtcblx0XHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaHRtbCA9IHNuaXBwZXQucmVuZGVyKCkudHJpbSgpO1xuXHRcdFx0dmFyIGZyYWdtZW50ID0gY3JlYXRlX2ZyYWdtZW50X2Zyb21faHRtbChodG1sKTtcblx0XHRcdGVsZW1lbnQgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChnZXRfZmlyc3RfY2hpbGQoZnJhZ21lbnQpKTtcblxuXHRcdFx0aWYgKERFViAmJiAoZ2V0X25leHRfc2libGluZyhlbGVtZW50KSAhPT0gbnVsbCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpKSB7XG5cdFx0XHRcdHcuaW52YWxpZF9yYXdfc25pcHBldF9yZW5kZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0YW5jaG9yLmJlZm9yZShlbGVtZW50KTtcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHQgPSBzbmlwcGV0LnNldHVwPy4oZWxlbWVudCk7XG5cdFx0YXNzaWduX25vZGVzKGVsZW1lbnQsIGVsZW1lbnQpO1xuXG5cdFx0aWYgKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRlYXJkb3duKHJlc3VsdCk7XG5cdFx0fVxuXHR9O1xufVxuIiwiLyoqIEBpbXBvcnQgeyBDb21wb25lbnRDb250ZXh0LCBDb21wb25lbnRDb250ZXh0TGVnYWN5IH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi9pbmRleC5qcycgKi9cbi8qKiBAaW1wb3J0IHsgTm90RnVuY3Rpb24gfSBmcm9tICcuL2ludGVybmFsL3R5cGVzLmpzJyAqL1xuaW1wb3J0IHsgYWN0aXZlX3JlYWN0aW9uLCB1bnRyYWNrIH0gZnJvbSAnLi9pbnRlcm5hbC9jbGllbnQvcnVudGltZS5qcyc7XG5pbXBvcnQgeyBpc19hcnJheSB9IGZyb20gJy4vaW50ZXJuYWwvc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IHVzZXJfZWZmZWN0IH0gZnJvbSAnLi9pbnRlcm5hbC9jbGllbnQvaW5kZXguanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9lcnJvcnMuanMnO1xuaW1wb3J0IHsgbGVnYWN5X21vZGVfZmxhZyB9IGZyb20gJy4vaW50ZXJuYWwvZmxhZ3MvaW5kZXguanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQgfSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9jb250ZXh0LmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG5pZiAoREVWKSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcnVuZVxuXHQgKi9cblx0ZnVuY3Rpb24gdGhyb3dfcnVuZV9lcnJvcihydW5lKSB7XG5cdFx0aWYgKCEocnVuZSBpbiBnbG9iYWxUaGlzKSkge1xuXHRcdFx0Ly8gVE9ETyBpZiBwZW9wbGUgc3RhcnQgYWRqdXN0aW5nIHRoZSBcInRoaXMgY2FuIGNvbnRhaW4gcnVuZXNcIiBjb25maWcgdGhyb3VnaCB2LXAtcyBtb3JlLCBhZGp1c3QgdGhpcyBtZXNzYWdlXG5cdFx0XHQvKiogQHR5cGUge2FueX0gKi9cblx0XHRcdGxldCB2YWx1ZTsgLy8gbGV0J3MgaG9wZSBub29uZSBtb2RpZmllcyB0aGlzIGdsb2JhbCwgYnV0IGJlbHRzIGFuZCBicmFjZXNcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWxUaGlzLCBydW5lLCB7XG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGdldHRlci1yZXR1cm5cblx0XHRcdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlLnJ1bmVfb3V0c2lkZV9zdmVsdGUocnVuZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldDogKHYpID0+IHtcblx0XHRcdFx0XHR2YWx1ZSA9IHY7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHRocm93X3J1bmVfZXJyb3IoJyRzdGF0ZScpO1xuXHR0aHJvd19ydW5lX2Vycm9yKCckZWZmZWN0Jyk7XG5cdHRocm93X3J1bmVfZXJyb3IoJyRkZXJpdmVkJyk7XG5cdHRocm93X3J1bmVfZXJyb3IoJyRpbnNwZWN0Jyk7XG5cdHRocm93X3J1bmVfZXJyb3IoJyRwcm9wcycpO1xuXHR0aHJvd19ydW5lX2Vycm9yKCckYmluZGFibGUnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIFtgQWJvcnRTaWduYWxgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQWJvcnRTaWduYWwpIHRoYXQgYWJvcnRzIHdoZW4gdGhlIGN1cnJlbnQgW2Rlcml2ZWRdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS8kZGVyaXZlZCkgb3IgW2VmZmVjdF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QpIHJlLXJ1bnMgb3IgaXMgZGVzdHJveWVkLlxuICpcbiAqIE11c3QgYmUgY2FsbGVkIHdoaWxlIGEgZGVyaXZlZCBvciBlZmZlY3QgaXMgcnVubmluZy5cbiAqXG4gKiBgYGBzdmVsdGVcbiAqIDxzY3JpcHQ+XG4gKiBcdGltcG9ydCB7IGdldEFib3J0U2lnbmFsIH0gZnJvbSAnc3ZlbHRlJztcbiAqXG4gKiBcdGxldCB7IGlkIH0gPSAkcHJvcHMoKTtcbiAqXG4gKiBcdGFzeW5jIGZ1bmN0aW9uIGdldERhdGEoaWQpIHtcbiAqIFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvaXRlbXMvJHtpZH1gLCB7XG4gKiBcdFx0XHRzaWduYWw6IGdldEFib3J0U2lnbmFsKClcbiAqIFx0XHR9KTtcbiAqXG4gKiBcdFx0cmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAqIFx0fVxuICpcbiAqIFx0Y29uc3QgZGF0YSA9ICRkZXJpdmVkKGF3YWl0IGdldERhdGEoaWQpKTtcbiAqIDwvc2NyaXB0PlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBYm9ydFNpZ25hbCgpIHtcblx0aWYgKGFjdGl2ZV9yZWFjdGlvbiA9PT0gbnVsbCkge1xuXHRcdGUuZ2V0X2Fib3J0X3NpZ25hbF9vdXRzaWRlX3JlYWN0aW9uKCk7XG5cdH1cblxuXHRyZXR1cm4gKGFjdGl2ZV9yZWFjdGlvbi5hYyA/Pz0gbmV3IEFib3J0Q29udHJvbGxlcigpKS5zaWduYWw7XG59XG5cbi8qKlxuICogYG9uTW91bnRgLCBsaWtlIFtgJGVmZmVjdGBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS8kZWZmZWN0KSwgc2NoZWR1bGVzIGEgZnVuY3Rpb24gdG8gcnVuIGFzIHNvb24gYXMgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIHRvIHRoZSBET00uXG4gKiBVbmxpa2UgYCRlZmZlY3RgLCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25seSBydW5zIG9uY2UuXG4gKlxuICogSXQgbXVzdCBiZSBjYWxsZWQgZHVyaW5nIHRoZSBjb21wb25lbnQncyBpbml0aWFsaXNhdGlvbiAoYnV0IGRvZXNuJ3QgbmVlZCB0byBsaXZlIF9pbnNpZGVfIHRoZSBjb21wb25lbnQ7XG4gKiBpdCBjYW4gYmUgY2FsbGVkIGZyb20gYW4gZXh0ZXJuYWwgbW9kdWxlKS4gSWYgYSBmdW5jdGlvbiBpcyByZXR1cm5lZCBfc3luY2hyb25vdXNseV8gZnJvbSBgb25Nb3VudGAsXG4gKiBpdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICpcbiAqIGBvbk1vdW50YCBmdW5jdGlvbnMgZG8gbm90IHJ1biBkdXJpbmcgW3NlcnZlci1zaWRlIHJlbmRlcmluZ10oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlL3N2ZWx0ZS1zZXJ2ZXIjcmVuZGVyKS5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHsoKSA9PiBOb3RGdW5jdGlvbjxUPiB8IFByb21pc2U8Tm90RnVuY3Rpb248VD4+IHwgKCgpID0+IGFueSl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcblx0aWYgKGNvbXBvbmVudF9jb250ZXh0ID09PSBudWxsKSB7XG5cdFx0ZS5saWZlY3ljbGVfb3V0c2lkZV9jb21wb25lbnQoJ29uTW91bnQnKTtcblx0fVxuXG5cdGlmIChsZWdhY3lfbW9kZV9mbGFnICYmIGNvbXBvbmVudF9jb250ZXh0LmwgIT09IG51bGwpIHtcblx0XHRpbml0X3VwZGF0ZV9jYWxsYmFja3MoY29tcG9uZW50X2NvbnRleHQpLm0ucHVzaChmbik7XG5cdH0gZWxzZSB7XG5cdFx0dXNlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2xlYW51cCA9IHVudHJhY2soZm4pO1xuXHRcdFx0aWYgKHR5cGVvZiBjbGVhbnVwID09PSAnZnVuY3Rpb24nKSByZXR1cm4gLyoqIEB0eXBlIHsoKSA9PiB2b2lkfSAqLyAoY2xlYW51cCk7XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBjYWxsYmFjayB0byBydW4gaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICpcbiAqIE91dCBvZiBgb25Nb3VudGAsIGBiZWZvcmVVcGRhdGVgLCBgYWZ0ZXJVcGRhdGVgIGFuZCBgb25EZXN0cm95YCwgdGhpcyBpcyB0aGVcbiAqIG9ubHkgb25lIHRoYXQgcnVucyBpbnNpZGUgYSBzZXJ2ZXItc2lkZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuXHRpZiAoY29tcG9uZW50X2NvbnRleHQgPT09IG51bGwpIHtcblx0XHRlLmxpZmVjeWNsZV9vdXRzaWRlX2NvbXBvbmVudCgnb25EZXN0cm95Jyk7XG5cdH1cblxuXHRvbk1vdW50KCgpID0+ICgpID0+IHVudHJhY2soZm4pKTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgW1Q9YW55XVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7VH0gW2RldGFpbF1cbiAqIEBwYXJhbSB7YW55fXBhcmFtc18wXG4gKiBAcmV0dXJucyB7Q3VzdG9tRXZlbnQ8VD59XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZV9jdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsLCB7IGJ1YmJsZXMgPSBmYWxzZSwgY2FuY2VsYWJsZSA9IGZhbHNlIH0gPSB7fSkge1xuXHRyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsLCBidWJibGVzLCBjYW5jZWxhYmxlIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gZXZlbnQgZGlzcGF0Y2hlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BhdGNoIFtjb21wb25lbnQgZXZlbnRzXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvbGVnYWN5LW9uI0NvbXBvbmVudC1ldmVudHMpLlxuICogRXZlbnQgZGlzcGF0Y2hlcnMgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiB0YWtlIHR3byBhcmd1bWVudHM6IGBuYW1lYCBhbmQgYGRldGFpbGAuXG4gKlxuICogQ29tcG9uZW50IGV2ZW50cyBjcmVhdGVkIHdpdGggYGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcmAgY3JlYXRlIGFcbiAqIFtDdXN0b21FdmVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50KS5cbiAqIFRoZXNlIGV2ZW50cyBkbyBub3QgW2J1YmJsZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9MZWFybi9KYXZhU2NyaXB0L0J1aWxkaW5nX2Jsb2Nrcy9FdmVudHMjRXZlbnRfYnViYmxpbmdfYW5kX2NhcHR1cmUpLlxuICogVGhlIGBkZXRhaWxgIGFyZ3VtZW50IGNvcnJlc3BvbmRzIHRvIHRoZSBbQ3VzdG9tRXZlbnQuZGV0YWlsXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvZGV0YWlsKVxuICogcHJvcGVydHkgYW5kIGNhbiBjb250YWluIGFueSB0eXBlIG9mIGRhdGEuXG4gKlxuICogVGhlIGV2ZW50IGRpc3BhdGNoZXIgY2FuIGJlIHR5cGVkIHRvIG5hcnJvdyB0aGUgYWxsb3dlZCBldmVudCBuYW1lcyBhbmQgdGhlIHR5cGUgb2YgdGhlIGBkZXRhaWxgIGFyZ3VtZW50OlxuICogYGBgdHNcbiAqIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyPHtcbiAqICBsb2FkZWQ6IG51bGw7IC8vIGRvZXMgbm90IHRha2UgYSBkZXRhaWwgYXJndW1lbnRcbiAqICBjaGFuZ2U6IHN0cmluZzsgLy8gdGFrZXMgYSBkZXRhaWwgYXJndW1lbnQgb2YgdHlwZSBzdHJpbmcsIHdoaWNoIGlzIHJlcXVpcmVkXG4gKiAgb3B0aW9uYWw6IG51bWJlciB8IG51bGw7IC8vIHRha2VzIGFuIG9wdGlvbmFsIGRldGFpbCBhcmd1bWVudCBvZiB0eXBlIG51bWJlclxuICogfT4oKTtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBjYWxsYmFjayBwcm9wcyBhbmQvb3IgdGhlIGAkaG9zdCgpYCBydW5lIGluc3RlYWQg4oCUIHNlZSBbbWlncmF0aW9uIGd1aWRlXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvdjUtbWlncmF0aW9uLWd1aWRlI0V2ZW50LWNoYW5nZXMtQ29tcG9uZW50LWV2ZW50cylcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gW0V2ZW50TWFwID0gYW55XVxuICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcjxFdmVudE1hcD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG5cdGNvbnN0IGFjdGl2ZV9jb21wb25lbnRfY29udGV4dCA9IGNvbXBvbmVudF9jb250ZXh0O1xuXHRpZiAoYWN0aXZlX2NvbXBvbmVudF9jb250ZXh0ID09PSBudWxsKSB7XG5cdFx0ZS5saWZlY3ljbGVfb3V0c2lkZV9jb21wb25lbnQoJ2NyZWF0ZUV2ZW50RGlzcGF0Y2hlcicpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBbZGV0YWlsXVxuXHQgKiBAcGFyYW0gW29wdGlvbnNdXG5cdCAqL1xuXHRyZXR1cm4gKHR5cGUsIGRldGFpbCwgb3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGV2ZW50cyA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgRnVuY3Rpb24gfCBGdW5jdGlvbltdPn0gKi8gKFxuXHRcdFx0YWN0aXZlX2NvbXBvbmVudF9jb250ZXh0LnMuJCRldmVudHNcblx0XHQpPy5bLyoqIEB0eXBlIHtzdHJpbmd9ICovICh0eXBlKV07XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCBjYWxsYmFja3MgPSBpc19hcnJheShldmVudHMpID8gZXZlbnRzLnNsaWNlKCkgOiBbZXZlbnRzXTtcblx0XHRcdC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcblx0XHRcdC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cblx0XHRcdGNvbnN0IGV2ZW50ID0gY3JlYXRlX2N1c3RvbV9ldmVudCgvKiogQHR5cGUge3N0cmluZ30gKi8gKHR5cGUpLCBkZXRhaWwsIG9wdGlvbnMpO1xuXHRcdFx0Zm9yIChjb25zdCBmbiBvZiBjYWxsYmFja3MpIHtcblx0XHRcdFx0Zm4uY2FsbChhY3RpdmVfY29tcG9uZW50X2NvbnRleHQueCwgZXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG4vLyBUT0RPIG1hcmsgYmVmb3JlVXBkYXRlIGFuZCBhZnRlclVwZGF0ZSBhcyBkZXByZWNhdGVkIGluIFN2ZWx0ZSA2XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gcnVuIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIHVwZGF0ZWQgYWZ0ZXIgYW55IHN0YXRlIGNoYW5nZS5cbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgcnVucyB3aWxsIGJlIGJlZm9yZSB0aGUgaW5pdGlhbCBgb25Nb3VudGAuXG4gKlxuICogSW4gcnVuZXMgbW9kZSB1c2UgYCRlZmZlY3QucHJlYCBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBbYCRlZmZlY3QucHJlYF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QjJGVmZmVjdC5wcmUpIGluc3RlYWRcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG5cdGlmIChjb21wb25lbnRfY29udGV4dCA9PT0gbnVsbCkge1xuXHRcdGUubGlmZWN5Y2xlX291dHNpZGVfY29tcG9uZW50KCdiZWZvcmVVcGRhdGUnKTtcblx0fVxuXG5cdGlmIChjb21wb25lbnRfY29udGV4dC5sID09PSBudWxsKSB7XG5cdFx0ZS5saWZlY3ljbGVfbGVnYWN5X29ubHkoJ2JlZm9yZVVwZGF0ZScpO1xuXHR9XG5cblx0aW5pdF91cGRhdGVfY2FsbGJhY2tzKGNvbXBvbmVudF9jb250ZXh0KS5iLnB1c2goZm4pO1xufVxuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHJ1biBpbW1lZGlhdGVseSBhZnRlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHVwZGF0ZWQuXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIHJ1bnMgd2lsbCBiZSBhZnRlciB0aGUgaW5pdGlhbCBgb25Nb3VudGAuXG4gKlxuICogSW4gcnVuZXMgbW9kZSB1c2UgYCRlZmZlY3RgIGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWQgVXNlIFtgJGVmZmVjdGBdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS8kZWZmZWN0KSBpbnN0ZWFkXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG5cdGlmIChjb21wb25lbnRfY29udGV4dCA9PT0gbnVsbCkge1xuXHRcdGUubGlmZWN5Y2xlX291dHNpZGVfY29tcG9uZW50KCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudF9jb250ZXh0LmwgPT09IG51bGwpIHtcblx0XHRlLmxpZmVjeWNsZV9sZWdhY3lfb25seSgnYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdGluaXRfdXBkYXRlX2NhbGxiYWNrcyhjb21wb25lbnRfY29udGV4dCkuYS5wdXNoKGZuKTtcbn1cblxuLyoqXG4gKiBMZWdhY3ktbW9kZTogSW5pdCBjYWxsYmFja3Mgb2JqZWN0IGZvciBvbk1vdW50L2JlZm9yZVVwZGF0ZS9hZnRlclVwZGF0ZVxuICogQHBhcmFtIHtDb21wb25lbnRDb250ZXh0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGluaXRfdXBkYXRlX2NhbGxiYWNrcyhjb250ZXh0KSB7XG5cdHZhciBsID0gLyoqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0TGVnYWN5fSAqLyAoY29udGV4dCkubDtcblx0cmV0dXJuIChsLnUgPz89IHsgYTogW10sIGI6IFtdLCBtOiBbXSB9KTtcbn1cblxuZXhwb3J0IHsgZmx1c2hTeW5jLCBmb3JrIH0gZnJvbSAnLi9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5leHBvcnQge1xuXHRjcmVhdGVDb250ZXh0LFxuXHRnZXRDb250ZXh0LFxuXHRnZXRBbGxDb250ZXh0cyxcblx0aGFzQ29udGV4dCxcblx0c2V0Q29udGV4dFxufSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9jb250ZXh0LmpzJztcbmV4cG9ydCB7IGh5ZHJhdGFibGUgfSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9oeWRyYXRhYmxlLmpzJztcbmV4cG9ydCB7IGh5ZHJhdGUsIG1vdW50LCB1bm1vdW50IH0gZnJvbSAnLi9pbnRlcm5hbC9jbGllbnQvcmVuZGVyLmpzJztcbmV4cG9ydCB7IHRpY2ssIHVudHJhY2ssIHNldHRsZWQgfSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9ydW50aW1lLmpzJztcbmV4cG9ydCB7IGNyZWF0ZVJhd1NuaXBwZXQgfSBmcm9tICcuL2ludGVybmFsL2NsaWVudC9kb20vYmxvY2tzL3NuaXBwZXQuanMnO1xuIiwiLyoqIEBpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJldHVybiB9IGZyb20gJy4uL2FjdGlvbi9wdWJsaWMnICovXG4vKiogQGltcG9ydCB7IEF0dGFjaG1lbnQgfSBmcm9tICcuL3B1YmxpYycgKi9cbmltcG9ydCB7IG5vb3AsIHJlbmRlcl9lZmZlY3QgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwvY2xpZW50JztcbmltcG9ydCB7IEFUVEFDSE1FTlRfS0VZIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHVudHJhY2sgfSBmcm9tICcuLi9pbmRleC1jbGllbnQuanMnO1xuaW1wb3J0IHsgdGVhcmRvd24gfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBrZXkgdGhhdCB3aWxsIGJlIHJlY29nbmlzZWQgYXMgYW4gYXR0YWNobWVudCB3aGVuIHRoZSBvYmplY3QgaXMgc3ByZWFkIG9udG8gYW4gZWxlbWVudCxcbiAqIGFzIGEgcHJvZ3JhbW1hdGljIGFsdGVybmF0aXZlIHRvIHVzaW5nIGB7QGF0dGFjaCAuLi59YC4gVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBsaWJyYXJ5IGF1dGhvcnMsIHRob3VnaFxuICogaXMgZ2VuZXJhbGx5IG5vdCBuZWVkZWQgd2hlbiBidWlsZGluZyBhbiBhcHAuXG4gKlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0PlxuICogXHRpbXBvcnQgeyBjcmVhdGVBdHRhY2htZW50S2V5IH0gZnJvbSAnc3ZlbHRlL2F0dGFjaG1lbnRzJztcbiAqXG4gKiBcdGNvbnN0IHByb3BzID0ge1xuICogXHRcdGNsYXNzOiAnY29vbCcsXG4gKiBcdFx0b25jbGljazogKCkgPT4gYWxlcnQoJ2NsaWNrZWQnKSxcbiAqIFx0XHRbY3JlYXRlQXR0YWNobWVudEtleSgpXTogKG5vZGUpID0+IHtcbiAqIFx0XHRcdG5vZGUudGV4dENvbnRlbnQgPSAnYXR0YWNoZWQhJztcbiAqIFx0XHR9XG4gKiBcdH07XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8YnV0dG9uIHsuLi5wcm9wc30+Y2xpY2sgbWU8L2J1dHRvbj5cbiAqIGBgYFxuICogQHNpbmNlIDUuMjlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF0dGFjaG1lbnRLZXkoKSB7XG5cdHJldHVybiBTeW1ib2woQVRUQUNITUVOVF9LRVkpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIFthY3Rpb25dKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS91c2UpIGludG8gYW4gW2F0dGFjaG1lbnRdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9AYXR0YWNoKSBrZWVwaW5nIHRoZSBzYW1lIGJlaGF2aW9yLlxuICogSXQncyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gc3RhcnQgdXNpbmcgYXR0YWNobWVudHMgb24gY29tcG9uZW50cyBidXQgeW91IGhhdmUgYWN0aW9ucyBwcm92aWRlZCBieSBhIGxpYnJhcnkuXG4gKlxuICogTm90ZSB0aGF0IHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgZnVuY3Rpb24gdGhhdCBfcmV0dXJuc18gdGhlIGFyZ3VtZW50IHRvIHRoZVxuICogYWN0aW9uIGZ1bmN0aW9uLCBub3QgdGhlIGFyZ3VtZW50IGl0c2VsZi5cbiAqXG4gKiBgYGBzdmVsdGVcbiAqIDwhLS0gd2l0aCBhbiBhY3Rpb24gLS0+XG4gKiA8ZGl2IHVzZTpmb289e2Jhcn0+Li4uPC9kaXY+XG4gKlxuICogPCEtLSB3aXRoIGFuIGF0dGFjaG1lbnQgLS0+XG4gKiA8ZGl2IHtAYXR0YWNoIGZyb21BY3Rpb24oZm9vLCAoKSA9PiBiYXIpfT4uLi48L2Rpdj5cbiAqIGBgYFxuICogQHRlbXBsYXRlIHtFdmVudFRhcmdldH0gRVxuICogQHRlbXBsYXRlIHt1bmtub3dufSBUXG4gKiBAb3ZlcmxvYWRcbiAqIEBwYXJhbSB7QWN0aW9uPEUsIFQ+IHwgKChlbGVtZW50OiBFLCBhcmc6IFQpID0+IHZvaWQgfCBBY3Rpb25SZXR1cm48VD4pfSBhY3Rpb24gVGhlIGFjdGlvbiBmdW5jdGlvblxuICogQHBhcmFtIHsoKSA9PiBUfSBmbiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYXJndW1lbnQgZm9yIHRoZSBhY3Rpb25cbiAqIEByZXR1cm5zIHtBdHRhY2htZW50PEU+fVxuICovXG4vKipcbiAqIENvbnZlcnRzIGFuIFthY3Rpb25dKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS91c2UpIGludG8gYW4gW2F0dGFjaG1lbnRdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9AYXR0YWNoKSBrZWVwaW5nIHRoZSBzYW1lIGJlaGF2aW9yLlxuICogSXQncyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gc3RhcnQgdXNpbmcgYXR0YWNobWVudHMgb24gY29tcG9uZW50cyBidXQgeW91IGhhdmUgYWN0aW9ucyBwcm92aWRlZCBieSBhIGxpYnJhcnkuXG4gKlxuICogTm90ZSB0aGF0IHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgZnVuY3Rpb24gdGhhdCBfcmV0dXJuc18gdGhlIGFyZ3VtZW50IHRvIHRoZVxuICogYWN0aW9uIGZ1bmN0aW9uLCBub3QgdGhlIGFyZ3VtZW50IGl0c2VsZi5cbiAqXG4gKiBgYGBzdmVsdGVcbiAqIDwhLS0gd2l0aCBhbiBhY3Rpb24gLS0+XG4gKiA8ZGl2IHVzZTpmb289e2Jhcn0+Li4uPC9kaXY+XG4gKlxuICogPCEtLSB3aXRoIGFuIGF0dGFjaG1lbnQgLS0+XG4gKiA8ZGl2IHtAYXR0YWNoIGZyb21BY3Rpb24oZm9vLCAoKSA9PiBiYXIpfT4uLi48L2Rpdj5cbiAqIGBgYFxuICogQHRlbXBsYXRlIHtFdmVudFRhcmdldH0gRVxuICogQG92ZXJsb2FkXG4gKiBAcGFyYW0ge0FjdGlvbjxFLCB2b2lkPiB8ICgoZWxlbWVudDogRSkgPT4gdm9pZCB8IEFjdGlvblJldHVybjx2b2lkPil9IGFjdGlvbiBUaGUgYWN0aW9uIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QXR0YWNobWVudDxFPn1cbiAqL1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBbYWN0aW9uXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvdXNlKSBpbnRvIGFuIFthdHRhY2htZW50XShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvQGF0dGFjaCkga2VlcGluZyB0aGUgc2FtZSBiZWhhdmlvci5cbiAqIEl0J3MgdXNlZnVsIGlmIHlvdSB3YW50IHRvIHN0YXJ0IHVzaW5nIGF0dGFjaG1lbnRzIG9uIGNvbXBvbmVudHMgYnV0IHlvdSBoYXZlIGFjdGlvbnMgcHJvdmlkZWQgYnkgYSBsaWJyYXJ5LlxuICpcbiAqIE5vdGUgdGhhdCB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIGZ1bmN0aW9uIHRoYXQgX3JldHVybnNfIHRoZSBhcmd1bWVudCB0byB0aGVcbiAqIGFjdGlvbiBmdW5jdGlvbiwgbm90IHRoZSBhcmd1bWVudCBpdHNlbGYuXG4gKlxuICogYGBgc3ZlbHRlXG4gKiA8IS0tIHdpdGggYW4gYWN0aW9uIC0tPlxuICogPGRpdiB1c2U6Zm9vPXtiYXJ9Pi4uLjwvZGl2PlxuICpcbiAqIDwhLS0gd2l0aCBhbiBhdHRhY2htZW50IC0tPlxuICogPGRpdiB7QGF0dGFjaCBmcm9tQWN0aW9uKGZvbywgKCkgPT4gYmFyKX0+Li4uPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAdGVtcGxhdGUge0V2ZW50VGFyZ2V0fSBFXG4gKiBAdGVtcGxhdGUge3Vua25vd259IFRcbiAqIEBwYXJhbSB7QWN0aW9uPEUsIFQ+IHwgKChlbGVtZW50OiBFLCBhcmc6IFQpID0+IHZvaWQgfCBBY3Rpb25SZXR1cm48VD4pfSBhY3Rpb24gVGhlIGFjdGlvbiBmdW5jdGlvblxuICogQHBhcmFtIHsoKSA9PiBUfSBmbiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYXJndW1lbnQgZm9yIHRoZSBhY3Rpb25cbiAqIEByZXR1cm5zIHtBdHRhY2htZW50PEU+fVxuICogQHNpbmNlIDUuMzJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21BY3Rpb24oYWN0aW9uLCBmbiA9IC8qKiBAdHlwZSB7KCkgPT4gVH0gKi8gKG5vb3ApKSB7XG5cdHJldHVybiAoZWxlbWVudCkgPT4ge1xuXHRcdGNvbnN0IHsgdXBkYXRlLCBkZXN0cm95IH0gPSB1bnRyYWNrKCgpID0+IGFjdGlvbihlbGVtZW50LCBmbigpKSA/PyB7fSk7XG5cblx0XHRpZiAodXBkYXRlKSB7XG5cdFx0XHR2YXIgcmFuID0gZmFsc2U7XG5cdFx0XHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHRcdFx0Y29uc3QgYXJnID0gZm4oKTtcblx0XHRcdFx0aWYgKHJhbikgdXBkYXRlKGFyZyk7XG5cdFx0XHR9KTtcblx0XHRcdHJhbiA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGRlc3Ryb3kpIHtcblx0XHRcdHRlYXJkb3duKGRlc3Ryb3kpO1xuXHRcdH1cblx0fTtcbn1cbiIsImltcG9ydCB7IFNUQVRFX1NZTUJPTCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IHNhbml0aXplX2xvY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHsgdW50cmFjayB9IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi93YXJuaW5ncy5qcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7YW55fSBhXG4gKiBAcGFyYW0ge2FueX0gYlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZShhLCBiLCBwcm9wZXJ0eSwgbG9jYXRpb24pIHtcblx0aWYgKGEgIT09IGIgJiYgdHlwZW9mIGIgPT09ICdvYmplY3QnICYmIFNUQVRFX1NZTUJPTCBpbiBiKSB7XG5cdFx0dy5hc3NpZ25tZW50X3ZhbHVlX3N0YWxlKHByb3BlcnR5LCAvKiogQHR5cGUge3N0cmluZ30gKi8gKHNhbml0aXplX2xvY2F0aW9uKGxvY2F0aW9uKSkpO1xuXHR9XG5cblx0cmV0dXJuIGE7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge3N0cmluZ30gb3BlcmF0b3JcbiAqIEBwYXJhbSB7YW55fSByaHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKG9iamVjdCwgcHJvcGVydHksIG9wZXJhdG9yLCByaHMsIGxvY2F0aW9uKSB7XG5cdHJldHVybiBjb21wYXJlKFxuXHRcdG9wZXJhdG9yID09PSAnPSdcblx0XHRcdD8gKG9iamVjdFtwcm9wZXJ0eV0gPSByaHMpXG5cdFx0XHQ6IG9wZXJhdG9yID09PSAnJiY9J1xuXHRcdFx0XHQ/IChvYmplY3RbcHJvcGVydHldICYmPSByaHMoKSlcblx0XHRcdFx0OiBvcGVyYXRvciA9PT0gJ3x8PSdcblx0XHRcdFx0XHQ/IChvYmplY3RbcHJvcGVydHldIHx8PSByaHMoKSlcblx0XHRcdFx0XHQ6IG9wZXJhdG9yID09PSAnPz89J1xuXHRcdFx0XHRcdFx0PyAob2JqZWN0W3Byb3BlcnR5XSA/Pz0gcmhzKCkpXG5cdFx0XHRcdFx0XHQ6IG51bGwsXG5cdFx0dW50cmFjaygoKSA9PiBvYmplY3RbcHJvcGVydHldKSxcblx0XHRwcm9wZXJ0eSxcblx0XHRsb2NhdGlvblxuXHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdG9yXG4gKiBAcGFyYW0ge2FueX0gcmhzXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFzc2lnbl9hc3luYyhvYmplY3QsIHByb3BlcnR5LCBvcGVyYXRvciwgcmhzLCBsb2NhdGlvbikge1xuXHRyZXR1cm4gY29tcGFyZShcblx0XHRvcGVyYXRvciA9PT0gJz0nXG5cdFx0XHQ/IChvYmplY3RbcHJvcGVydHldID0gYXdhaXQgcmhzKVxuXHRcdFx0OiBvcGVyYXRvciA9PT0gJyYmPSdcblx0XHRcdFx0PyAob2JqZWN0W3Byb3BlcnR5XSAmJj0gYXdhaXQgcmhzKCkpXG5cdFx0XHRcdDogb3BlcmF0b3IgPT09ICd8fD0nXG5cdFx0XHRcdFx0PyAob2JqZWN0W3Byb3BlcnR5XSB8fD0gYXdhaXQgcmhzKCkpXG5cdFx0XHRcdFx0OiBvcGVyYXRvciA9PT0gJz8/PSdcblx0XHRcdFx0XHRcdD8gKG9iamVjdFtwcm9wZXJ0eV0gPz89IGF3YWl0IHJocygpKVxuXHRcdFx0XHRcdFx0OiBudWxsLFxuXHRcdHVudHJhY2soKCkgPT4gb2JqZWN0W3Byb3BlcnR5XSksXG5cdFx0cHJvcGVydHksXG5cdFx0bG9jYXRpb25cblx0KTtcbn1cbiIsIi8qKiBAdHlwZSB7TWFwPFN0cmluZywgU2V0PEhUTUxTdHlsZUVsZW1lbnQ+Pn0gKi9cbnZhciBhbGxfc3R5bGVzID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBoYXNoXG4gKiBAcGFyYW0ge0hUTUxTdHlsZUVsZW1lbnR9IHN0eWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlcl9zdHlsZShoYXNoLCBzdHlsZSkge1xuXHR2YXIgc3R5bGVzID0gYWxsX3N0eWxlcy5nZXQoaGFzaCk7XG5cblx0aWYgKCFzdHlsZXMpIHtcblx0XHRzdHlsZXMgPSBuZXcgU2V0KCk7XG5cdFx0YWxsX3N0eWxlcy5zZXQoaGFzaCwgc3R5bGVzKTtcblx0fVxuXG5cdHN0eWxlcy5hZGQoc3R5bGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBoYXNoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbnVwX3N0eWxlcyhoYXNoKSB7XG5cdHZhciBzdHlsZXMgPSBhbGxfc3R5bGVzLmdldChoYXNoKTtcblx0aWYgKCFzdHlsZXMpIHJldHVybjtcblxuXHRmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuXHRcdHN0eWxlLnJlbW92ZSgpO1xuXHR9XG5cblx0YWxsX3N0eWxlcy5kZWxldGUoaGFzaCk7XG59XG4iLCIvKiogQGltcG9ydCB7IFNvdXJjZUxvY2F0aW9uIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IENPTU1FTlRfTk9ERSwgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSwgRUxFTUVOVF9OT0RFIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgSFlEUkFUSU9OX0VORCwgSFlEUkFUSU9OX1NUQVJUIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2RvbS9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgZGV2X3N0YWNrIH0gZnJvbSAnLi4vY29udGV4dC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IGZuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U291cmNlTG9jYXRpb25bXX0gbG9jYXRpb25zXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX2xvY2F0aW9ucyhmbiwgZmlsZW5hbWUsIGxvY2F0aW9ucykge1xuXHRyZXR1cm4gKC8qKiBAdHlwZSB7YW55W119ICovIC4uLmFyZ3MpID0+IHtcblx0XHRjb25zdCBkb20gPSBmbiguLi5hcmdzKTtcblxuXHRcdHZhciBub2RlID0gaHlkcmF0aW5nID8gZG9tIDogZG9tLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID8gZG9tLmZpcnN0Q2hpbGQgOiBkb207XG5cdFx0YXNzaWduX2xvY2F0aW9ucyhub2RlLCBmaWxlbmFtZSwgbG9jYXRpb25zKTtcblxuXHRcdHJldHVybiBkb207XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U291cmNlTG9jYXRpb259IGxvY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbl9sb2NhdGlvbihlbGVtZW50LCBmaWxlbmFtZSwgbG9jYXRpb24pIHtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG5cdFx0cGFyZW50OiBkZXZfc3RhY2ssXG5cdFx0bG9jOiB7IGZpbGU6IGZpbGVuYW1lLCBsaW5lOiBsb2NhdGlvblswXSwgY29sdW1uOiBsb2NhdGlvblsxXSB9XG5cdH07XG5cblx0aWYgKGxvY2F0aW9uWzJdKSB7XG5cdFx0YXNzaWduX2xvY2F0aW9ucyhlbGVtZW50LmZpcnN0Q2hpbGQsIGZpbGVuYW1lLCBsb2NhdGlvblsyXSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGUgfCBudWxsfSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U291cmNlTG9jYXRpb25bXX0gbG9jYXRpb25zXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbl9sb2NhdGlvbnMobm9kZSwgZmlsZW5hbWUsIGxvY2F0aW9ucykge1xuXHR2YXIgaSA9IDA7XG5cdHZhciBkZXB0aCA9IDA7XG5cblx0d2hpbGUgKG5vZGUgJiYgaSA8IGxvY2F0aW9ucy5sZW5ndGgpIHtcblx0XHRpZiAoaHlkcmF0aW5nICYmIG5vZGUubm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkge1xuXHRcdFx0dmFyIGNvbW1lbnQgPSAvKiogQHR5cGUge0NvbW1lbnR9ICovIChub2RlKTtcblx0XHRcdGlmIChjb21tZW50LmRhdGFbMF0gPT09IEhZRFJBVElPTl9TVEFSVCkgZGVwdGggKz0gMTtcblx0XHRcdGVsc2UgaWYgKGNvbW1lbnQuZGF0YVswXSA9PT0gSFlEUkFUSU9OX0VORCkgZGVwdGggLT0gMTtcblx0XHR9XG5cblx0XHRpZiAoZGVwdGggPT09IDAgJiYgbm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRhc3NpZ25fbG9jYXRpb24oLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAobm9kZSksIGZpbGVuYW1lLCBsb2NhdGlvbnNbaSsrXSk7XG5cdFx0fVxuXG5cdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0LCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgRklMRU5BTUUsIEhNUiB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBFRkZFQ1RfVFJBTlNQQVJFTlQsIEhNUl9BTkNIT1IgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBoeWRyYXRlX25vZGUsIGh5ZHJhdGluZyB9IGZyb20gJy4uL2RvbS9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgYmxvY2ssIGJyYW5jaCwgZGVzdHJveV9lZmZlY3QgfSBmcm9tICcuLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgc2V0LCBzb3VyY2UgfSBmcm9tICcuLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgc2V0X3Nob3VsZF9pbnRybyB9IGZyb20gJy4uL3JlbmRlci5qcyc7XG5pbXBvcnQgeyBhY3RpdmVfZWZmZWN0LCBnZXQgfSBmcm9tICcuLi9ydW50aW1lLmpzJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgeyhhbmNob3I6IENvbW1lbnQsIHByb3BzOiBhbnkpID0+IGFueX0gQ29tcG9uZW50XG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhtcihmbikge1xuXHRjb25zdCBjdXJyZW50ID0gc291cmNlKGZuKTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IGluaXRpYWxfYW5jaG9yXG5cdCAqIEBwYXJhbSB7YW55fSBwcm9wc1xuXHQgKi9cblx0ZnVuY3Rpb24gd3JhcHBlcihpbml0aWFsX2FuY2hvciwgcHJvcHMpIHtcblx0XHRsZXQgY29tcG9uZW50ID0ge307XG5cdFx0bGV0IGluc3RhbmNlID0ge307XG5cblx0XHQvKiogQHR5cGUge0VmZmVjdH0gKi9cblx0XHRsZXQgZWZmZWN0O1xuXG5cdFx0bGV0IHJhbiA9IGZhbHNlO1xuXHRcdGxldCBhbmNob3IgPSBpbml0aWFsX2FuY2hvcjtcblxuXHRcdGJsb2NrKCgpID0+IHtcblx0XHRcdGlmIChjb21wb25lbnQgPT09IChjb21wb25lbnQgPSBnZXQoY3VycmVudCkpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVmZmVjdCkge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGZvciAodmFyIGsgaW4gaW5zdGFuY2UpIGRlbGV0ZSBpbnN0YW5jZVtrXTtcblx0XHRcdFx0ZGVzdHJveV9lZmZlY3QoZWZmZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0ZWZmZWN0ID0gYnJhbmNoKCgpID0+IHtcblx0XHRcdFx0YW5jaG9yID0gLyoqIEB0eXBlIHthbnl9ICovIChhbmNob3IpW0hNUl9BTkNIT1JdID8/IGFuY2hvcjtcblxuXHRcdFx0XHQvLyB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW52YWxpZGF0ZWQsIHJlcGxhY2UgaXQgd2l0aG91dCB0cmFuc2l0aW9uc1xuXHRcdFx0XHRpZiAocmFuKSBzZXRfc2hvdWxkX2ludHJvKGZhbHNlKTtcblxuXHRcdFx0XHQvLyBwcmVzZXJ2ZSBnZXR0ZXJzL3NldHRlcnNcblx0XHRcdFx0dmFyIHJlc3VsdCA9XG5cdFx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0XHRcdG5ldy50YXJnZXQgPyBuZXcgY29tcG9uZW50KGFuY2hvciwgcHJvcHMpIDogY29tcG9uZW50KGFuY2hvciwgcHJvcHMpO1xuXHRcdFx0XHQvLyBhIGNvbXBvbmVudCBpcyBub3QgZ3VhcmFudGVlZCB0byByZXR1cm4gc29tZXRoaW5nIGFuZCB3ZSBjYW4ndCBpbnZva2UgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyBvbiB1bmRlZmluZWRcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGluc3RhbmNlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhyZXN1bHQpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyYW4pIHNldF9zaG91bGRfaW50cm8odHJ1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gRm9yd2FyZCB0aGUgbm9kZXMgZnJvbSB0aGUgaW5uZXIgZWZmZWN0IHRvIHRoZSBvdXRlciBhY3RpdmUgZWZmZWN0IHdoaWNoIHdvdWxkXG5cdFx0XHQvLyBnZXQgdGhlbSBpZiB0aGUgSE1SIHdyYXBwZXIgd2Fzbid0IHRoZXJlLiBEbyB0aGlzIGluc2lkZSB0aGUgYmxvY2sgbm90IG91dHNpZGVcblx0XHRcdC8vIHNvIHRoYXQgSE1SIHVwZGF0ZXMgdG8gdGhlIGNvbXBvbmVudCB3aWxsIGFsc28gdXBkYXRlIHRoZSBub2RlcyBvbiB0aGUgYWN0aXZlIGVmZmVjdC5cblx0XHRcdC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCkubm9kZXMgPSBlZmZlY3Qubm9kZXM7XG5cdFx0fSwgRUZGRUNUX1RSQU5TUEFSRU5UKTtcblxuXHRcdHJhbiA9IHRydWU7XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRhbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xuXHR9XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHR3cmFwcGVyW0ZJTEVOQU1FXSA9IGZuW0ZJTEVOQU1FXTtcblxuXHQvLyBAdHMtaWdub3JlXG5cdHdyYXBwZXJbSE1SXSA9IHtcblx0XHRmbixcblx0XHRjdXJyZW50LFxuXHRcdHVwZGF0ZTogKC8qKiBAdHlwZSB7YW55fSAqLyBpbmNvbWluZykgPT4ge1xuXHRcdFx0Ly8gVGhpcyBsb2dpYyBlbnN1cmVzIHRoYXQgdGhlIGZpcnN0IHZlcnNpb24gb2YgdGhlIGNvbXBvbmVudCBpcyB0aGUgb25lXG5cdFx0XHQvLyB3aG9zZSB1cGRhdGUgZnVuY3Rpb24gYW5kIHRoZXJlZm9yZSBibG9jayBlZmZlY3QgaXMgcHJlc2VydmVkIGFjcm9zcyB1cGRhdGVzLlxuXHRcdFx0Ly8gSWYgd2UgZG9uJ3QgZG8gdGhpcyBkYW5jZSBhbmQgaW5zdGVhZCBqdXN0IHVzZSBgaW5jb21pbmdgIGFzIHRoZSBuZXcgY29tcG9uZW50XG5cdFx0XHQvLyBhbmQgdGhlbiB1cGRhdGUsIHdlJ2xsIGNyZWF0ZSBhbiBldmVyLWdyb3dpbmcgc3RhY2sgb2YgYmxvY2sgZWZmZWN0cy5cblxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgb3JpZ2luYWwgYmxvY2sgZWZmZWN0XG5cdFx0XHRzZXQod3JhcHBlcltITVJdLmN1cnJlbnQsIGluY29taW5nW0hNUl0uZm4pO1xuXG5cdFx0XHQvLyBSZXBsYWNlIHRoZSBpbmNvbWluZyBzb3VyY2Ugd2l0aCB0aGUgb3JpZ2luYWwgb25lXG5cdFx0XHRpbmNvbWluZ1tITVJdLmN1cnJlbnQgPSB3cmFwcGVyW0hNUl0uY3VycmVudDtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHdyYXBwZXI7XG59XG4iLCIvKiogQHR5cGVkZWYge3sgZmlsZTogc3RyaW5nLCBsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyIH19IExvY2F0aW9uICovXG5cbmltcG9ydCB7IGdldF9kZXNjcmlwdG9yIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IExFR0FDWV9QUk9QUywgU1RBVEVfU1lNQk9MIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgRklMRU5BTUUgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0LmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHsgc2FuaXRpemVfbG9jYXRpb24gfSBmcm9tICcuLi8uLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogU2V0cyB1cCBhIHZhbGlkYXRvciB0aGF0XG4gKiAtIHRyYXZlcnNlcyB0aGUgcGF0aCBvZiBhIHByb3AgdG8gZmluZCBvdXQgaWYgaXQgaXMgYWxsb3dlZCB0byBiZSBtdXRhdGVkXG4gKiAtIGNoZWNrcyB0aGF0IHRoZSBiaW5kaW5nIGNoYWluIGlzIG5vdCBpbnRlcnJ1cHRlZFxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBwcm9wc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX293bmVyc2hpcF92YWxpZGF0b3IocHJvcHMpIHtcblx0Y29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50X2NvbnRleHQ/LmZ1bmN0aW9uO1xuXHRjb25zdCBwYXJlbnQgPSBjb21wb25lbnRfY29udGV4dD8ucD8uZnVuY3Rpb247XG5cblx0cmV0dXJuIHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuXHRcdCAqIEBwYXJhbSB7YW55W119IHBhdGhcblx0XHQgKiBAcGFyYW0ge2FueX0gcmVzdWx0XG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxpbmVcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uXG5cdFx0ICovXG5cdFx0bXV0YXRpb246IChwcm9wLCBwYXRoLCByZXN1bHQsIGxpbmUsIGNvbHVtbikgPT4ge1xuXHRcdFx0Y29uc3QgbmFtZSA9IHBhdGhbMF07XG5cdFx0XHRpZiAoaXNfYm91bmRfb3JfdW5zZXQocHJvcHMsIG5hbWUpIHx8ICFwYXJlbnQpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblxuXHRcdFx0LyoqIEB0eXBlIHthbnl9ICovXG5cdFx0XHRsZXQgdmFsdWUgPSBwcm9wcztcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhdGhbaV1dO1xuXHRcdFx0XHRpZiAoIXZhbHVlPy5bU1RBVEVfU1lNQk9MXSkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBzYW5pdGl6ZV9sb2NhdGlvbihgJHtjb21wb25lbnRbRklMRU5BTUVdfToke2xpbmV9OiR7Y29sdW1ufWApO1xuXG5cdFx0XHR3Lm93bmVyc2hpcF9pbnZhbGlkX211dGF0aW9uKG5hbWUsIGxvY2F0aW9uLCBwcm9wLCBwYXJlbnRbRklMRU5BTUVdKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSB7YW55fSBrZXlcblx0XHQgKiBAcGFyYW0ge2FueX0gY2hpbGRfY29tcG9uZW50XG5cdFx0ICogQHBhcmFtIHsoKSA9PiBhbnl9IHZhbHVlXG5cdFx0ICovXG5cdFx0YmluZGluZzogKGtleSwgY2hpbGRfY29tcG9uZW50LCB2YWx1ZSkgPT4ge1xuXHRcdFx0aWYgKCFpc19ib3VuZF9vcl91bnNldChwcm9wcywga2V5KSAmJiBwYXJlbnQgJiYgdmFsdWUoKT8uW1NUQVRFX1NZTUJPTF0pIHtcblx0XHRcdFx0dy5vd25lcnNoaXBfaW52YWxpZF9iaW5kaW5nKFxuXHRcdFx0XHRcdGNvbXBvbmVudFtGSUxFTkFNRV0sXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGNoaWxkX2NvbXBvbmVudFtGSUxFTkFNRV0sXG5cdFx0XHRcdFx0cGFyZW50W0ZJTEVOQU1FXVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcF9uYW1lXG4gKi9cbmZ1bmN0aW9uIGlzX2JvdW5kX29yX3Vuc2V0KHByb3BzLCBwcm9wX25hbWUpIHtcblx0Ly8gQ2FuIGJlIHRoZSBjYXNlIHdoZW4gc29tZW9uZSBkb2VzIGBtb3VudChDb21wb25lbnQsIHByb3BzKWAgd2l0aCBgbGV0IHByb3BzID0gJHN0YXRlKHsuLi59KWBcblx0Ly8gb3IgYGNyZWF0ZUNsYXNzQ29tcG9uZW50KENvbXBvbmVudCwgcHJvcHMpYFxuXHRjb25zdCBpc19lbnRyeV9wcm9wcyA9IFNUQVRFX1NZTUJPTCBpbiBwcm9wcyB8fCBMRUdBQ1lfUFJPUFMgaW4gcHJvcHM7XG5cdHJldHVybiAoXG5cdFx0ISFnZXRfZGVzY3JpcHRvcihwcm9wcywgcHJvcF9uYW1lKT8uc2V0IHx8XG5cdFx0KGlzX2VudHJ5X3Byb3BzICYmIHByb3BfbmFtZSBpbiBwcm9wcykgfHxcblx0XHQhKHByb3BfbmFtZSBpbiBwcm9wcylcblx0KTtcbn1cbiIsImltcG9ydCAqIGFzIGUgZnJvbSAnLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IGNvbXBvbmVudF9jb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBGSUxFTkFNRSB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5cbi8qKiBAcGFyYW0ge0Z1bmN0aW9uICYgeyBbRklMRU5BTUVdOiBzdHJpbmcgfX0gdGFyZ2V0ICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfdGFyZ2V0KHRhcmdldCkge1xuXHRpZiAodGFyZ2V0KSB7XG5cdFx0ZS5jb21wb25lbnRfYXBpX2ludmFsaWRfbmV3KHRhcmdldFtGSUxFTkFNRV0gPz8gJ2EgY29tcG9uZW50JywgdGFyZ2V0Lm5hbWUpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWdhY3lfYXBpKCkge1xuXHRjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnRfY29udGV4dD8uZnVuY3Rpb247XG5cblx0LyoqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgKi9cblx0ZnVuY3Rpb24gZXJyb3IobWV0aG9kKSB7XG5cdFx0ZS5jb21wb25lbnRfYXBpX2NoYW5nZWQobWV0aG9kLCBjb21wb25lbnRbRklMRU5BTUVdKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0JGRlc3Ryb3k6ICgpID0+IGVycm9yKCckZGVzdHJveSgpJyksXG5cdFx0JG9uOiAoKSA9PiBlcnJvcignJG9uKC4uLiknKSxcblx0XHQkc2V0OiAoKSA9PiBlcnJvcignJHNldCguLi4pJylcblx0fTtcbn1cbiIsImltcG9ydCB7IFVOSU5JVElBTElaRUQgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgc25hcHNob3QgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2xvbmUuanMnO1xuaW1wb3J0IHsgZWFnZXJfZWZmZWN0LCByZW5kZXJfZWZmZWN0LCB2YWxpZGF0ZV9lZmZlY3QgfSBmcm9tICcuLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgdW50cmFjayB9IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgZ2V0X2Vycm9yIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Rldi5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiBhbnlbXX0gZ2V0X3ZhbHVlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpbnNwZWN0b3JcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd19zdGFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdChnZXRfdmFsdWUsIGluc3BlY3Rvciwgc2hvd19zdGFjayA9IGZhbHNlKSB7XG5cdHZhbGlkYXRlX2VmZmVjdCgnJGluc3BlY3QnKTtcblxuXHRsZXQgaW5pdGlhbCA9IHRydWU7XG5cdGxldCBlcnJvciA9IC8qKiBAdHlwZSB7YW55fSAqLyAoVU5JTklUSUFMSVpFRCk7XG5cblx0Ly8gSW5zcGVjdCBlZmZlY3RzIHJ1bnMgc3luY2hyb25vdXNseSBzbyB0aGF0IHdlIGNhbiBjYXB0dXJlIHVzZWZ1bFxuXHQvLyBzdGFjayB0cmFjZXMuIEFzIGEgY29uc2VxdWVuY2UsIHJlYWRpbmcgdGhlIHZhbHVlIG1pZ2h0IHJlc3VsdFxuXHQvLyBpbiBhbiBlcnJvciAoYW4gYCRpbnNwZWN0KG9iamVjdC5wcm9wZXJ0eSlgIHdpbGwgcnVuIGJlZm9yZSB0aGVcblx0Ly8gYHsjaWYgb2JqZWN0fS4uLnsvaWZ9YCB0aGF0IGNvbnRhaW5zIGl0KVxuXHRlYWdlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGVycm9yID0gVU5JTklUSUFMSVpFRDtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBnZXRfdmFsdWUoKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRlcnJvciA9IGU7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIHNuYXAgPSBzbmFwc2hvdCh2YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0dW50cmFjaygoKSA9PiB7XG5cdFx0XHRpZiAoc2hvd19zdGFjaykge1xuXHRcdFx0XHRpbnNwZWN0b3IoLi4uc25hcCk7XG5cblx0XHRcdFx0aWYgKCFpbml0aWFsKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc3RhY2sgPSBnZXRfZXJyb3IoJyRpbnNwZWN0KC4uLiknKTtcblx0XHRcdFx0XHRpZiAoc3RhY2spIHtcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRcdFx0XHRjb25zb2xlLmdyb3VwQ29sbGFwc2VkKCdzdGFjayB0cmFjZScpO1xuXHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHN0YWNrKTtcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnNwZWN0b3IoaW5pdGlhbCA/ICdpbml0JyA6ICd1cGRhdGUnLCAuLi5zbmFwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGluaXRpYWwgPSBmYWxzZTtcblx0fSk7XG5cblx0Ly8gSWYgYW4gZXJyb3Igb2NjdXJzLCB3ZSBzdG9yZSBpdCAoYWxvbmcgd2l0aCBpdHMgc3RhY2sgdHJhY2UpLlxuXHQvLyBJZiB0aGUgcmVuZGVyIGVmZmVjdCBzdWJzZXF1ZW50bHkgcnVucywgd2UgbG9nIHRoZSBlcnJvcixcblx0Ly8gYnV0IGlmIGl0IGRvZXNuJ3QgcnVuIGl0J3MgYmVjYXVzZSB0aGUgYCRpbnNwZWN0YCB3YXNcblx0Ly8gZGVzdHJveWVkLCBtZWFuaW5nIHdlIGRvbid0IG5lZWQgdG8gYm90aGVyXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBjYWxsIGBnZXRfdmFsdWVgIHNvIHRoYXQgdGhpcyBydW5zIGFsb25nc2lkZSB0aGUgaW5zcGVjdCBlZmZlY3Rcblx0XHRcdGdldF92YWx1ZSgpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gaWdub3JlXG5cdFx0fVxuXG5cdFx0aWYgKGVycm9yICE9PSBVTklOSVRJQUxJWkVEKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRlcnJvciA9IFVOSU5JVElBTElaRUQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmxvY2tlciwgVGVtcGxhdGVOb2RlLCBWYWx1ZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBmbGF0dGVuIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9hc3luYy5qcyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7XG5cdGh5ZHJhdGVfbmV4dCxcblx0aHlkcmF0ZV9ub2RlLFxuXHRoeWRyYXRpbmcsXG5cdHNldF9oeWRyYXRlX25vZGUsXG5cdHNldF9oeWRyYXRpbmcsXG5cdHNraXBfbm9kZXNcbn0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGFzc2lnbl9ub2RlcyB9IGZyb20gJy4uL3RlbXBsYXRlLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICogQHBhcmFtIHtCbG9ja2VyW119IGJsb2NrZXJzXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IFByb21pc2U8YW55Pj59IGV4cHJlc3Npb25zXG4gKiBAcGFyYW0geyhhbmNob3I6IFRlbXBsYXRlTm9kZSwgLi4uZGVyaXZlZHM6IFZhbHVlW10pID0+IHZvaWR9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3luYyhub2RlLCBibG9ja2VycyA9IFtdLCBleHByZXNzaW9ucyA9IFtdLCBmbikge1xuXHR2YXIgd2FzX2h5ZHJhdGluZyA9IGh5ZHJhdGluZztcblx0dmFyIGVuZCA9IG51bGw7XG5cblx0aWYgKHdhc19oeWRyYXRpbmcpIHtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0XHRlbmQgPSBza2lwX25vZGVzKGZhbHNlKTtcblx0XHRhc3NpZ25fbm9kZXMobm9kZSwgZW5kKTsgLy8gTmVjZXNzYXJ5IGlmIHRoaXMgd3JhcHMgdGhlIHNvbGUgY2hpbGQgb2YgYSBibG9jaywgZWxzZSBlbmQgbWFya2VyIGNhbiBiZSB3cm9uZ1xuXHR9XG5cblx0aWYgKGV4cHJlc3Npb25zLmxlbmd0aCA9PT0gMCAmJiBibG9ja2Vycy5ldmVyeSgoYikgPT4gYi5zZXR0bGVkKSkge1xuXHRcdGZuKG5vZGUpO1xuXG5cdFx0Ly8gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBpdCBpcyBub3QgZ3VhcmFudGVlZCB0aGF0IHRoZSByZW5kZXIgZnVuY3Rpb24gd2lsbFxuXHRcdC8vIGFkdmFuY2UgdGhlIGh5ZHJhdGlvbiBub2RlIHRvICQuYXN5bmMncyBlbmQgbWFya2VyOiBpdCBtYXkgc3RvcCBhdCBhbiBpbm5lclxuXHRcdC8vIGJsb2NrJ3MgZW5kIG1hcmtlciAoaW4gY2FzZSBvZiBhbiBpbm5lciBpZiBibG9jayBmb3IgZXhhbXBsZSksIGJ1dCBpdCBhbHNvIG1heVxuXHRcdC8vIHN0b3AgYXQgdGhlIGNvcnJlY3QgJC5hc3luYyBlbmQgbWFya2VyIChpbiBjYXNlIG9mIGNvbXBvbmVudCBjaGlsZCkgLSBoZW5jZVxuXHRcdC8vIHdlIGNhbid0IGp1c3QgdXNlIGh5ZHJhdGVfbmV4dCgpXG5cdFx0Ly8gVE9ETyB0aGlzIGZlZWxzIGluZGljYXRpdmUgb2YgYSBidWcgZWxzZXdoZXJlOyBpZGVhbGx5IHdlIHdvdWxkbid0IG5lZWRcblx0XHQvLyB0byBkb3VibGUtdHJhdmVyc2UgaW4gdGhlIGFscmVhZHktcmVzb2x2ZWQgY2FzZVxuXHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKGVuZCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHdhc19oeWRyYXRpbmcpIHtcblx0XHR2YXIgcHJldmlvdXNfaHlkcmF0ZV9ub2RlID0gaHlkcmF0ZV9ub2RlO1xuXHRcdHNldF9oeWRyYXRlX25vZGUoZW5kKTtcblx0fVxuXG5cdGZsYXR0ZW4oYmxvY2tlcnMsIFtdLCBleHByZXNzaW9ucywgKHZhbHVlcykgPT4ge1xuXHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShwcmV2aW91c19oeWRyYXRlX25vZGUpO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBnZXQgdmFsdWVzIGVhZ2VybHkgdG8gYXZvaWQgY3JlYXRpbmcgYmxvY2tzIGlmIHRoZXkgcmVqZWN0XG5cdFx0XHRmb3IgKGNvbnN0IGQgb2YgdmFsdWVzKSBnZXQoZCk7XG5cblx0XHRcdGZuKG5vZGUsIC4uLnZhbHVlcyk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG4iLCJpbXBvcnQgKiBhcyBlIGZyb20gJy4uL2Vycm9ycy5qcyc7XG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gYW5jaG9yXG4gKiBAcGFyYW0gey4uLigoKT0+YW55KVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9zbmlwcGV0X2FyZ3MoYW5jaG9yLCAuLi5hcmdzKSB7XG5cdGlmICh0eXBlb2YgYW5jaG9yICE9PSAnb2JqZWN0JyB8fCAhKGFuY2hvciBpbnN0YW5jZW9mIE5vZGUpKSB7XG5cdFx0ZS5pbnZhbGlkX3NuaXBwZXRfYXJndW1lbnRzKCk7XG5cdH1cblxuXHRmb3IgKGxldCBhcmcgb2YgYXJncykge1xuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRlLmludmFsaWRfc25pcHBldF9hcmd1bWVudHMoKTtcblx0XHR9XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgU291cmNlLCBUZW1wbGF0ZU5vZGUgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgaXNfcHJvbWlzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBibG9jayB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBpbnRlcm5hbF9zZXQsIG11dGFibGVfc291cmNlLCBzb3VyY2UgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHtcblx0aHlkcmF0ZV9uZXh0LFxuXHRoeWRyYXRpbmcsXG5cdHNraXBfbm9kZXMsXG5cdHNldF9oeWRyYXRlX25vZGUsXG5cdHNldF9oeWRyYXRpbmcsXG5cdGh5ZHJhdGVfbm9kZVxufSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgSFlEUkFUSU9OX1NUQVJUX0VMU0UsIFVOSU5JVElBTElaRUQgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaXNfcnVuZXMgfSBmcm9tICcuLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IEJhdGNoLCBjdXJyZW50X2JhdGNoLCBmbHVzaFN5bmMsIGlzX2ZsdXNoaW5nX3N5bmMgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7IEJyYW5jaE1hbmFnZXIgfSBmcm9tICcuL2JyYW5jaGVzLmpzJztcbmltcG9ydCB7IGNhcHR1cmUsIHVuc2V0X2NvbnRleHQgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2FzeW5jLmpzJztcbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuXG5jb25zdCBQRU5ESU5HID0gMDtcbmNvbnN0IFRIRU4gPSAxO1xuY29uc3QgQ0FUQ0ggPSAyO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBQRU5ESU5HIHwgdHlwZW9mIFRIRU4gfCB0eXBlb2YgQ0FUQ0h9IEF3YWl0U3RhdGUgKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7KCgpID0+IGFueSl9IGdldF9pbnB1dFxuICogQHBhcmFtIHtudWxsIHwgKChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSBwZW5kaW5nX2ZuXG4gKiBAcGFyYW0ge251bGwgfCAoKGFuY2hvcjogTm9kZSwgdmFsdWU6IFNvdXJjZTxWPikgPT4gdm9pZCl9IHRoZW5fZm5cbiAqIEBwYXJhbSB7bnVsbCB8ICgoYW5jaG9yOiBOb2RlLCBlcnJvcjogdW5rbm93bikgPT4gdm9pZCl9IGNhdGNoX2ZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF3YWl0X2Jsb2NrKG5vZGUsIGdldF9pbnB1dCwgcGVuZGluZ19mbiwgdGhlbl9mbiwgY2F0Y2hfZm4pIHtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0dmFyIHJ1bmVzID0gaXNfcnVuZXMoKTtcblxuXHR2YXIgdiA9IC8qKiBAdHlwZSB7Vn0gKi8gKFVOSU5JVElBTElaRUQpO1xuXHR2YXIgdmFsdWUgPSBydW5lcyA/IHNvdXJjZSh2KSA6IG11dGFibGVfc291cmNlKHYsIGZhbHNlLCBmYWxzZSk7XG5cdHZhciBlcnJvciA9IHJ1bmVzID8gc291cmNlKHYpIDogbXV0YWJsZV9zb3VyY2UodiwgZmFsc2UsIGZhbHNlKTtcblxuXHRpZiAoREVWKSB7XG5cdFx0dmFsdWUubGFiZWwgPSAneyNhd2FpdCAuLi59IHZhbHVlJztcblx0XHRlcnJvci5sYWJlbCA9ICd7I2F3YWl0IC4uLn0gZXJyb3InO1xuXHR9XG5cblx0dmFyIGJyYW5jaGVzID0gbmV3IEJyYW5jaE1hbmFnZXIobm9kZSk7XG5cblx0YmxvY2soKCkgPT4ge1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0XHR2YXIgaW5wdXQgPSBnZXRfaW5wdXQoKTtcblxuXHRcdHZhciBkZXN0cm95ZWQgPSBmYWxzZTtcblxuXHRcdC8qKiBXaGV0aGVyIG9yIG5vdCB0aGVyZSB3YXMgYSBoeWRyYXRpb24gbWlzbWF0Y2guIE5lZWRzIHRvIGJlIGEgYGxldGAgb3IgZWxzZSBpdCBpc24ndCB0cmVlc2hha2VuIG91dCAqL1xuXHRcdC8vIEB0cy1pZ25vcmUgY29lcmNpbmcgYG5vZGVgIHRvIGEgYENvbW1lbnRgIGNhdXNlcyBUeXBlU2NyaXB0IGFuZCBQcmV0dGllciB0byBmaWdodFxuXHRcdGxldCBtaXNtYXRjaCA9IGh5ZHJhdGluZyAmJiBpc19wcm9taXNlKGlucHV0KSA9PT0gKG5vZGUuZGF0YSA9PT0gSFlEUkFUSU9OX1NUQVJUX0VMU0UpO1xuXG5cdFx0aWYgKG1pc21hdGNoKSB7XG5cdFx0XHQvLyBIeWRyYXRpb24gbWlzbWF0Y2g6IHJlbW92ZSBldmVyeXRoaW5nIGluc2lkZSB0aGUgYW5jaG9yIGFuZCBzdGFydCBmcmVzaFxuXHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShza2lwX25vZGVzKCkpO1xuXHRcdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzX3Byb21pc2UoaW5wdXQpKSB7XG5cdFx0XHR2YXIgcmVzdG9yZSA9IGNhcHR1cmUoKTtcblx0XHRcdHZhciByZXNvbHZlZCA9IGZhbHNlO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gZm5cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgcmVzb2x2ZSA9IChmbikgPT4ge1xuXHRcdFx0XHRpZiAoZGVzdHJveWVkKSByZXR1cm47XG5cblx0XHRcdFx0cmVzb2x2ZWQgPSB0cnVlO1xuXHRcdFx0XHQvLyBXZSBkb24ndCB3YW50IHRvIHJlc3RvcmUgdGhlIHByZXZpb3VzIGJhdGNoIGhlcmU7IHsjYXdhaXR9IGJsb2NrcyBkb24ndCBmb2xsb3cgdGhlIGFzeW5jIGxvZ2ljXG5cdFx0XHRcdC8vIHdlIGhhdmUgZWxzZXdoZXJlLCBpbnN0ZWFkIHBlbmRpbmcvcmVzb2x2ZS9mYWlsIHN0YXRlcyBhcmUgZWFjaCB0aGVpciBvd24gYmF0Y2ggc28gdG8gc3BlYWsuXG5cdFx0XHRcdHJlc3RvcmUoZmFsc2UpO1xuXHRcdFx0XHQvLyAuLi5idXQgaXQgbWlnaHQgc3RpbGwgYmUgc2V0IGhlcmUuIFRoYXQgbWVhbnMgYSBgc2F2ZSguLi4pYCBoYXMgcmVzdG9yZWQgaXQg4oCUIGJ1dCB0aGF0IGJhdGNoIHdpbGxcblx0XHRcdFx0Ly8gbGlrZWx5IGFscmVhZHkgaGF2ZSBiZWVuIGNvbW1pdHRlZCBieSB0aGUgdGltZSBpdCByZXNvbHZlcywgYW5kIHRoaXMgcmVzb2x2ZSBzaG91bGQgYmUgcHJvY2Vzc2VkXG5cdFx0XHRcdC8vIGluIGEgc2VwYXJhdGUgYmF0Y2guIFdlJ3JlIG5vdCB1c2luZyBiYXRjaC5kZWFjdGl2YXRlKCkvYWN0aXZhdGUoKSBhYm92ZSBiZWNhdXNlIGdldF9pbnB1dCgpXG5cdFx0XHRcdC8vIGNvdWxkIHdyaXRlIHRvIHNvdXJjZXMsIHdoaWNoIHdvdWxkIHRoZW4gaW5jb3JyZWN0bHkgY3JlYXRlIGEgbmV3IGJhdGNoIG9yIGNvdWxkIG1lc3Mgd2l0aFxuXHRcdFx0XHQvLyBhc3luY19kZXJpdmVkIGV4cGVjdGluZyBhIGN1cnJlbnRfYmF0Y2ggdG8gZXhpc3QuXG5cdFx0XHRcdGlmIChjdXJyZW50X2JhdGNoID09PSBiYXRjaCkge1xuXHRcdFx0XHRcdGJhdGNoLmRlYWN0aXZhdGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIGJhdGNoLCBzaW5jZSB0aGUgYnJhbmNoIG1hbmFnZXIgZXhwZWN0cyBvbmUgdG8gZXhpc3Rcblx0XHRcdFx0QmF0Y2guZW5zdXJlKCk7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRmbigpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdHVuc2V0X2NvbnRleHQoZmFsc2UpO1xuXG5cdFx0XHRcdFx0Ly8gd2l0aG91dCB0aGlzLCB0aGUgRE9NIGRvZXMgbm90IHVwZGF0ZSB1bnRpbCB0d28gdGlja3MgYWZ0ZXIgdGhlIHByb21pc2Vcblx0XHRcdFx0XHQvLyByZXNvbHZlcywgd2hpY2ggaXMgdW5leHBlY3RlZCBiZWhhdmlvdXIgKGFuZCBzb21ld2hhdCBpcmtzb21lIHRvIHRlc3QpXG5cdFx0XHRcdFx0aWYgKCFpc19mbHVzaGluZ19zeW5jKSBmbHVzaFN5bmMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0aW5wdXQudGhlbihcblx0XHRcdFx0KHYpID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKCgpID0+IHtcblx0XHRcdFx0XHRcdGludGVybmFsX3NldCh2YWx1ZSwgdik7XG5cdFx0XHRcdFx0XHRicmFuY2hlcy5lbnN1cmUoVEhFTiwgdGhlbl9mbiAmJiAoKHRhcmdldCkgPT4gdGhlbl9mbih0YXJnZXQsIHZhbHVlKSkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQoZSkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0aW50ZXJuYWxfc2V0KGVycm9yLCBlKTtcblx0XHRcdFx0XHRcdGJyYW5jaGVzLmVuc3VyZShDQVRDSCwgY2F0Y2hfZm4gJiYgKCh0YXJnZXQpID0+IGNhdGNoX2ZuKHRhcmdldCwgZXJyb3IpKSk7XG5cblx0XHRcdFx0XHRcdGlmICghY2F0Y2hfZm4pIHtcblx0XHRcdFx0XHRcdFx0Ly8gUmV0aHJvdyB0aGUgZXJyb3IgaWYgbm8gY2F0Y2ggYmxvY2sgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdHRocm93IGVycm9yLnY7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cblx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0YnJhbmNoZXMuZW5zdXJlKFBFTkRJTkcsIHBlbmRpbmdfZm4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gV2FpdCBhIG1pY3JvdGFzayBiZWZvcmUgY2hlY2tpbmcgaWYgd2Ugc2hvdWxkIHNob3cgdGhlIHBlbmRpbmcgc3RhdGUgYXNcblx0XHRcdFx0Ly8gdGhlIHByb21pc2UgbWlnaHQgaGF2ZSByZXNvbHZlZCBieSB0aGVuXG5cdFx0XHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0XHRcdGlmICghcmVzb2x2ZWQpIHtcblx0XHRcdFx0XHRcdHJlc29sdmUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRicmFuY2hlcy5lbnN1cmUoUEVORElORywgcGVuZGluZ19mbik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnRlcm5hbF9zZXQodmFsdWUsIGlucHV0KTtcblx0XHRcdGJyYW5jaGVzLmVuc3VyZShUSEVOLCB0aGVuX2ZuICYmICgodGFyZ2V0KSA9PiB0aGVuX2ZuKHRhcmdldCwgdmFsdWUpKSk7XG5cdFx0fVxuXG5cdFx0aWYgKG1pc21hdGNoKSB7XG5cdFx0XHQvLyBjb250aW51ZSBpbiBoeWRyYXRpb24gbW9kZVxuXHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0ZGVzdHJveWVkID0gdHJ1ZTtcblx0XHR9O1xuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IEVGRkVDVF9UUkFOU1BBUkVOVCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7XG5cdGh5ZHJhdGVfbmV4dCxcblx0aHlkcmF0aW5nLFxuXHRyZWFkX2h5ZHJhdGlvbl9pbnN0cnVjdGlvbixcblx0c2tpcF9ub2Rlcyxcblx0c2V0X2h5ZHJhdGVfbm9kZSxcblx0c2V0X2h5ZHJhdGluZyxcblx0aHlkcmF0ZV9ub2RlXG59IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBibG9jayB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBCcmFuY2hNYW5hZ2VyIH0gZnJvbSAnLi9icmFuY2hlcy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7KGJyYW5jaDogKGZuOiAoYW5jaG9yOiBOb2RlKSA9PiB2b2lkLCBrZXk/OiBudW1iZXIgfCBmYWxzZSkgPT4gdm9pZCkgPT4gdm9pZH0gZm5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Vsc2VpZl0gVHJ1ZSBpZiB0aGlzIGlzIGFuIGB7OmVsc2UgaWYgLi4ufWAgYmxvY2sgcmF0aGVyIHRoYW4gYW4gYHsjaWYgLi4ufWAsIGFzIHRoYXQgYWZmZWN0cyB3aGljaCB0cmFuc2l0aW9ucyBhcmUgY29uc2lkZXJlZCAnbG9jYWwnXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlmX2Jsb2NrKG5vZGUsIGZuLCBlbHNlaWYgPSBmYWxzZSkge1xuXHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IHVuZGVmaW5lZH0gKi9cblx0dmFyIG1hcmtlcjtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdG1hcmtlciA9IGh5ZHJhdGVfbm9kZTtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0fVxuXG5cdHZhciBicmFuY2hlcyA9IG5ldyBCcmFuY2hNYW5hZ2VyKG5vZGUpO1xuXHR2YXIgZmxhZ3MgPSBlbHNlaWYgPyBFRkZFQ1RfVFJBTlNQQVJFTlQgOiAwO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge251bWJlciB8IGZhbHNlfSBrZXlcblx0ICogQHBhcmFtIHtudWxsIHwgKChhbmNob3I6IE5vZGUpID0+IHZvaWQpfSBmblxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlX2JyYW5jaChrZXksIGZuKSB7XG5cdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0dmFyIGRhdGEgPSByZWFkX2h5ZHJhdGlvbl9pbnN0cnVjdGlvbigvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKG1hcmtlcikpO1xuXG5cdFx0XHQvLyBcIltuXCIgPSBicmFuY2ggbiwgXCJbLTFcIiA9IGVsc2Vcblx0XHRcdGlmIChrZXkgIT09IHBhcnNlSW50KGRhdGEuc3Vic3RyaW5nKDEpKSkge1xuXHRcdFx0XHQvLyBIeWRyYXRpb24gbWlzbWF0Y2g6IHJlbW92ZSBldmVyeXRoaW5nIGluc2lkZSB0aGUgYW5jaG9yIGFuZCBzdGFydCBmcmVzaC5cblx0XHRcdFx0Ly8gVGhpcyBjb3VsZCBoYXBwZW4gd2l0aCBgeyNpZiBicm93c2VyfS4uLnsvaWZ9YCwgZm9yIGV4YW1wbGVcblx0XHRcdFx0dmFyIGFuY2hvciA9IHNraXBfbm9kZXMoKTtcblxuXHRcdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKGFuY2hvcik7XG5cdFx0XHRcdGJyYW5jaGVzLmFuY2hvciA9IGFuY2hvcjtcblxuXHRcdFx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0XHRcdFx0YnJhbmNoZXMuZW5zdXJlKGtleSwgZm4pO1xuXHRcdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRicmFuY2hlcy5lbnN1cmUoa2V5LCBmbik7XG5cdH1cblxuXHRibG9jaygoKSA9PiB7XG5cdFx0dmFyIGhhc19icmFuY2ggPSBmYWxzZTtcblxuXHRcdGZuKChmbiwga2V5ID0gMCkgPT4ge1xuXHRcdFx0aGFzX2JyYW5jaCA9IHRydWU7XG5cdFx0XHR1cGRhdGVfYnJhbmNoKGtleSwgZm4pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCFoYXNfYnJhbmNoKSB7XG5cdFx0XHR1cGRhdGVfYnJhbmNoKC0xLCBudWxsKTtcblx0XHR9XG5cdH0sIGZsYWdzKTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGlzX3J1bmVzIH0gZnJvbSAnLi4vLi4vY29udGV4dC5qcyc7XG5pbXBvcnQgeyBibG9jayB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBoeWRyYXRlX25leHQsIGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBCcmFuY2hNYW5hZ2VyIH0gZnJvbSAnLi9icmFuY2hlcy5qcyc7XG5cbmNvbnN0IE5BTiA9IFN5bWJvbCgnTmFOJyk7XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0geygpID0+IFZ9IGdldF9rZXlcbiAqIEBwYXJhbSB7KGFuY2hvcjogTm9kZSkgPT4gVGVtcGxhdGVOb2RlIHwgdm9pZH0gcmVuZGVyX2ZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGtleShub2RlLCBnZXRfa2V5LCByZW5kZXJfZm4pIHtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0dmFyIGJyYW5jaGVzID0gbmV3IEJyYW5jaE1hbmFnZXIobm9kZSk7XG5cblx0dmFyIGxlZ2FjeSA9ICFpc19ydW5lcygpO1xuXG5cdGJsb2NrKCgpID0+IHtcblx0XHR2YXIga2V5ID0gZ2V0X2tleSgpO1xuXG5cdFx0Ly8gTmFOICE9PSBOYU4sIGhlbmNlIHdlIGRvIHRoaXMgd29ya2Fyb3VuZCB0byBub3QgdHJpZ2dlciByZW1vdW50cyB1bm5lY2Vzc2FyaWx5XG5cdFx0aWYgKGtleSAhPT0ga2V5KSB7XG5cdFx0XHRrZXkgPSAvKiogQHR5cGUge2FueX0gKi8gKE5BTik7XG5cdFx0fVxuXG5cdFx0Ly8ga2V5IGJsb2NrcyBpbiBTdmVsdGUgPDUgaGFkIHN0dXBpZCBzZW1hbnRpY3Ncblx0XHRpZiAobGVnYWN5ICYmIGtleSAhPT0gbnVsbCAmJiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0a2V5ID0gLyoqIEB0eXBlIHtWfSAqLyAoe30pO1xuXHRcdH1cblxuXHRcdGJyYW5jaGVzLmVuc3VyZShrZXksIHJlbmRlcl9mbik7XG5cdH0pO1xufVxuIiwiaW1wb3J0IHsgcmVuZGVyX2VmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBoeWRyYXRpbmcsIHNldF9oeWRyYXRlX25vZGUgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgZ2V0X2ZpcnN0X2NoaWxkIH0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudCB8IFNWR0dFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0geygpID0+IFJlY29yZDxzdHJpbmcsIHN0cmluZz59IGdldF9zdHlsZXNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3NzX3Byb3BzKGVsZW1lbnQsIGdldF9zdHlsZXMpIHtcblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdHNldF9oeWRyYXRlX25vZGUoZ2V0X2ZpcnN0X2NoaWxkKGVsZW1lbnQpKTtcblx0fVxuXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdHZhciBzdHlsZXMgPSBnZXRfc3R5bGVzKCk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGVzKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBzdHlsZXNba2V5XTtcblxuXHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWFjaEl0ZW0sIEVhY2hPdXRyb0dyb3VwLCBFYWNoU3RhdGUsIEVmZmVjdCwgRWZmZWN0Tm9kZXMsIE1heWJlU291cmNlLCBTb3VyY2UsIFRlbXBsYXRlTm9kZSwgVHJhbnNpdGlvbk1hbmFnZXIsIFZhbHVlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJzsgKi9cbmltcG9ydCB7XG5cdEVBQ0hfSU5ERVhfUkVBQ1RJVkUsXG5cdEVBQ0hfSVNfQU5JTUFURUQsXG5cdEVBQ0hfSVNfQ09OVFJPTExFRCxcblx0RUFDSF9JVEVNX0lNTVVUQUJMRSxcblx0RUFDSF9JVEVNX1JFQUNUSVZFLFxuXHRIWURSQVRJT05fRU5ELFxuXHRIWURSQVRJT05fU1RBUlRfRUxTRVxufSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHtcblx0aHlkcmF0ZV9uZXh0LFxuXHRoeWRyYXRlX25vZGUsXG5cdGh5ZHJhdGluZyxcblx0cmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24sXG5cdHNraXBfbm9kZXMsXG5cdHNldF9oeWRyYXRlX25vZGUsXG5cdHNldF9oeWRyYXRpbmdcbn0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7XG5cdGNsZWFyX3RleHRfY29udGVudCxcblx0Y3JlYXRlX3RleHQsXG5cdGdldF9maXJzdF9jaGlsZCxcblx0Z2V0X25leHRfc2libGluZyxcblx0c2hvdWxkX2RlZmVyX2FwcGVuZFxufSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7XG5cdGJsb2NrLFxuXHRicmFuY2gsXG5cdGRlc3Ryb3lfZWZmZWN0LFxuXHRtb3ZlX2VmZmVjdCxcblx0cGF1c2VfZWZmZWN0LFxuXHRyZXN1bWVfZWZmZWN0XG59IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBzb3VyY2UsIG11dGFibGVfc291cmNlLCBpbnRlcm5hbF9zZXQgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgYXJyYXlfZnJvbSwgaXNfYXJyYXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0IHsgQlJBTkNIX0VGRkVDVCwgQ09NTUVOVF9OT0RFLCBERVNUUk9ZRUQsIEVGRkVDVF9PRkZTQ1JFRU4sIElORVJUIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBERVYgfSBmcm9tICdlc20tZW52JztcbmltcG9ydCB7IGRlcml2ZWRfc2FmZV9lcXVhbCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZGVyaXZlZHMuanMnO1xuaW1wb3J0IHsgY3VycmVudF9iYXRjaCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvYmF0Y2guanMnO1xuaW1wb3J0ICogYXMgZSBmcm9tICcuLi8uLi9lcnJvcnMuanMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAnLi4vLi4vZGV2L3RyYWNpbmcuanMnO1xuXG4vLyBXaGVuIG1ha2luZyBzdWJzdGFudGl2ZSBjaGFuZ2VzIHRvIHRoaXMgZmlsZSwgdmFsaWRhdGUgdGhlbSB3aXRoIHRoZSBlYWNoIGJsb2NrIHN0cmVzcyB0ZXN0OlxuLy8gaHR0cHM6Ly9zdmVsdGUuZGV2L3BsYXlncm91bmQvMTk3MmIyY2Y0NjU2NDQ3NmFkOGM4YzY0MDViMjNiN2Jcbi8vIFRoaXMgdGVzdCBhbHNvIGV4aXN0cyBpbiB0aGlzIHJlcG8sIGFzIGBwYWNrYWdlcy9zdmVsdGUvdGVzdHMvbWFudWFsL2VhY2gtc3RyZXNzLXRlc3RgXG5cbi8qKlxuICogQHBhcmFtIHthbnl9IF9cbiAqIEBwYXJhbSB7bnVtYmVyfSBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleChfLCBpKSB7XG5cdHJldHVybiBpO1xufVxuXG4vKipcbiAqIFBhdXNlIG11bHRpcGxlIGVmZmVjdHMgc2ltdWx0YW5lb3VzbHksIGFuZCBjb29yZGluYXRlIHRoZWlyXG4gKiBzdWJzZXF1ZW50IGRlc3RydWN0aW9uLiBVc2VkIGluIGVhY2ggYmxvY2tzXG4gKiBAcGFyYW0ge0VhY2hTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7RWZmZWN0W119IHRvX2Rlc3Ryb3lcbiAqIEBwYXJhbSB7bnVsbCB8IE5vZGV9IGNvbnRyb2xsZWRfYW5jaG9yXG4gKi9cbmZ1bmN0aW9uIHBhdXNlX2VmZmVjdHMoc3RhdGUsIHRvX2Rlc3Ryb3ksIGNvbnRyb2xsZWRfYW5jaG9yKSB7XG5cdC8qKiBAdHlwZSB7VHJhbnNpdGlvbk1hbmFnZXJbXX0gKi9cblx0dmFyIHRyYW5zaXRpb25zID0gW107XG5cdHZhciBsZW5ndGggPSB0b19kZXN0cm95Lmxlbmd0aDtcblxuXHQvKiogQHR5cGUge0VhY2hPdXRyb0dyb3VwfSAqL1xuXHR2YXIgZ3JvdXA7XG5cdHZhciByZW1haW5pbmcgPSB0b19kZXN0cm95Lmxlbmd0aDtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGVmZmVjdCA9IHRvX2Rlc3Ryb3lbaV07XG5cblx0XHRwYXVzZV9lZmZlY3QoXG5cdFx0XHRlZmZlY3QsXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdGlmIChncm91cCkge1xuXHRcdFx0XHRcdGdyb3VwLnBlbmRpbmcuZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHRcdFx0Z3JvdXAuZG9uZS5hZGQoZWZmZWN0KTtcblxuXHRcdFx0XHRcdGlmIChncm91cC5wZW5kaW5nLnNpemUgPT09IDApIHtcblx0XHRcdFx0XHRcdHZhciBncm91cHMgPSAvKiogQHR5cGUge1NldDxFYWNoT3V0cm9Hcm91cD59ICovIChzdGF0ZS5vdXRyb2dyb3Vwcyk7XG5cblx0XHRcdFx0XHRcdGRlc3Ryb3lfZWZmZWN0cyhzdGF0ZSwgYXJyYXlfZnJvbShncm91cC5kb25lKSk7XG5cdFx0XHRcdFx0XHRncm91cHMuZGVsZXRlKGdyb3VwKTtcblxuXHRcdFx0XHRcdFx0aWYgKGdyb3Vwcy5zaXplID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdHN0YXRlLm91dHJvZ3JvdXBzID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVtYWluaW5nIC09IDE7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmYWxzZVxuXHRcdCk7XG5cdH1cblxuXHRpZiAocmVtYWluaW5nID09PSAwKSB7XG5cdFx0Ly8gSWYgd2UncmUgaW4gYSBjb250cm9sbGVkIGVhY2ggYmxvY2sgKGkuZS4gdGhlIGJsb2NrIGlzIHRoZSBvbmx5IGNoaWxkIG9mIGFuXG5cdFx0Ly8gZWxlbWVudCksIGFuZCB3ZSBhcmUgcmVtb3ZpbmcgYWxsIGl0ZW1zLCBfYW5kXyB0aGVyZSBhcmUgbm8gb3V0IHRyYW5zaXRpb25zLFxuXHRcdC8vIHdlIGNhbiB1c2UgdGhlIGZhc3QgcGF0aCDigJQgZW1wdHlpbmcgdGhlIGVsZW1lbnQgYW5kIHJlcGxhY2luZyB0aGUgYW5jaG9yXG5cdFx0dmFyIGZhc3RfcGF0aCA9IHRyYW5zaXRpb25zLmxlbmd0aCA9PT0gMCAmJiBjb250cm9sbGVkX2FuY2hvciAhPT0gbnVsbDtcblxuXHRcdGlmIChmYXN0X3BhdGgpIHtcblx0XHRcdHZhciBhbmNob3IgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChjb250cm9sbGVkX2FuY2hvcik7XG5cdFx0XHR2YXIgcGFyZW50X25vZGUgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChhbmNob3IucGFyZW50Tm9kZSk7XG5cblx0XHRcdGNsZWFyX3RleHRfY29udGVudChwYXJlbnRfbm9kZSk7XG5cdFx0XHRwYXJlbnRfbm9kZS5hcHBlbmQoYW5jaG9yKTtcblxuXHRcdFx0c3RhdGUuaXRlbXMuY2xlYXIoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95X2VmZmVjdHMoc3RhdGUsIHRvX2Rlc3Ryb3ksICFmYXN0X3BhdGgpO1xuXHR9IGVsc2Uge1xuXHRcdGdyb3VwID0ge1xuXHRcdFx0cGVuZGluZzogbmV3IFNldCh0b19kZXN0cm95KSxcblx0XHRcdGRvbmU6IG5ldyBTZXQoKVxuXHRcdH07XG5cblx0XHQoc3RhdGUub3V0cm9ncm91cHMgPz89IG5ldyBTZXQoKSkuYWRkKGdyb3VwKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWFjaFN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtFZmZlY3RbXX0gdG9fZGVzdHJveVxuICogQHBhcmFtIHtib29sZWFufSByZW1vdmVfZG9tXG4gKi9cbmZ1bmN0aW9uIGRlc3Ryb3lfZWZmZWN0cyhzdGF0ZSwgdG9fZGVzdHJveSwgcmVtb3ZlX2RvbSA9IHRydWUpIHtcblx0LyoqIEB0eXBlIHtTZXQ8RWZmZWN0PiB8IHVuZGVmaW5lZH0gKi9cblx0dmFyIHByZXNlcnZlZF9lZmZlY3RzO1xuXG5cdC8vIFRoZSBsb29wLWluLWEtbG9vcCBpc24ndCBpZGVhbCwgYnV0IHdlIHNob3VsZCBvbmx5IGhpdCB0aGlzIGluIHJlbGF0aXZlbHkgcmFyZSBjYXNlc1xuXHRpZiAoc3RhdGUucGVuZGluZy5zaXplID4gMCkge1xuXHRcdHByZXNlcnZlZF9lZmZlY3RzID0gbmV3IFNldCgpO1xuXG5cdFx0Zm9yIChjb25zdCBrZXlzIG9mIHN0YXRlLnBlbmRpbmcudmFsdWVzKCkpIHtcblx0XHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0cHJlc2VydmVkX2VmZmVjdHMuYWRkKC8qKiBAdHlwZSB7RWFjaEl0ZW19ICovIChzdGF0ZS5pdGVtcy5nZXQoa2V5KSkuZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b19kZXN0cm95Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGUgPSB0b19kZXN0cm95W2ldO1xuXG5cdFx0aWYgKHByZXNlcnZlZF9lZmZlY3RzPy5oYXMoZSkpIHtcblx0XHRcdGUuZiB8PSBFRkZFQ1RfT0ZGU0NSRUVOO1xuXG5cdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdG1vdmVfZWZmZWN0KGUsIGZyYWdtZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdHJveV9lZmZlY3QodG9fZGVzdHJveVtpXSwgcmVtb3ZlX2RvbSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqL1xudmFyIG9mZnNjcmVlbl9hbmNob3I7XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7RWxlbWVudCB8IENvbW1lbnR9IG5vZGUgVGhlIG5leHQgc2libGluZyBub2RlLCBvciB0aGUgcGFyZW50IG5vZGUgaWYgdGhpcyBpcyBhICdjb250cm9sbGVkJyBibG9ja1xuICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzXG4gKiBAcGFyYW0geygpID0+IFZbXX0gZ2V0X2NvbGxlY3Rpb25cbiAqIEBwYXJhbSB7KHZhbHVlOiBWLCBpbmRleDogbnVtYmVyKSA9PiBhbnl9IGdldF9rZXlcbiAqIEBwYXJhbSB7KGFuY2hvcjogTm9kZSwgaXRlbTogTWF5YmVTb3VyY2U8Vj4sIGluZGV4OiBNYXliZVNvdXJjZTxudW1iZXI+KSA9PiB2b2lkfSByZW5kZXJfZm5cbiAqIEBwYXJhbSB7bnVsbCB8ICgoYW5jaG9yOiBOb2RlKSA9PiB2b2lkKX0gZmFsbGJhY2tfZm5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFjaChub2RlLCBmbGFncywgZ2V0X2NvbGxlY3Rpb24sIGdldF9rZXksIHJlbmRlcl9mbiwgZmFsbGJhY2tfZm4gPSBudWxsKSB7XG5cdHZhciBhbmNob3IgPSBub2RlO1xuXG5cdC8qKiBAdHlwZSB7TWFwPGFueSwgRWFjaEl0ZW0+fSAqL1xuXHR2YXIgaXRlbXMgPSBuZXcgTWFwKCk7XG5cblx0dmFyIGlzX2NvbnRyb2xsZWQgPSAoZmxhZ3MgJiBFQUNIX0lTX0NPTlRST0xMRUQpICE9PSAwO1xuXG5cdGlmIChpc19jb250cm9sbGVkKSB7XG5cdFx0dmFyIHBhcmVudF9ub2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAobm9kZSk7XG5cblx0XHRhbmNob3IgPSBoeWRyYXRpbmdcblx0XHRcdD8gc2V0X2h5ZHJhdGVfbm9kZShnZXRfZmlyc3RfY2hpbGQocGFyZW50X25vZGUpKVxuXHRcdFx0OiBwYXJlbnRfbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVfdGV4dCgpKTtcblx0fVxuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0fVxuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi9cblx0dmFyIGZhbGxiYWNrID0gbnVsbDtcblxuXHQvLyBUT0RPOiBpZGVhbGx5IHdlIGNvdWxkIHVzZSBkZXJpdmVkIGZvciBydW5lcyBtb2RlIGJ1dCBiZWNhdXNlIG9mIHRoZSBhYmlsaXR5XG5cdC8vIHRvIHVzZSBhIHN0b3JlIHdoaWNoIGNhbiBiZSBtdXRhdGVkLCB3ZSBjYW4ndCBkbyB0aGF0IGhlcmUgYXMgbXV0YXRpbmcgYSBzdG9yZVxuXHQvLyB3aWxsIHN0aWxsIHJlc3VsdCBpbiB0aGUgY29sbGVjdGlvbiBhcnJheSBiZWluZyB0aGUgc2FtZSBmcm9tIHRoZSBzdG9yZVxuXHR2YXIgZWFjaF9hcnJheSA9IGRlcml2ZWRfc2FmZV9lcXVhbCgoKSA9PiB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBnZXRfY29sbGVjdGlvbigpO1xuXG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7VltdfSAqLyAoXG5cdFx0XHRpc19hcnJheShjb2xsZWN0aW9uKSA/IGNvbGxlY3Rpb24gOiBjb2xsZWN0aW9uID09IG51bGwgPyBbXSA6IGFycmF5X2Zyb20oY29sbGVjdGlvbilcblx0XHQpO1xuXHR9KTtcblxuXHRpZiAoREVWKSB7XG5cdFx0dGFnKGVhY2hfYXJyYXksICd7I2VhY2ggLi4ufScpO1xuXHR9XG5cblx0LyoqIEB0eXBlIHtWW119ICovXG5cdHZhciBhcnJheTtcblxuXHQvKiogQHR5cGUge01hcDxCYXRjaCwgU2V0PGFueT4+fSAqL1xuXHR2YXIgcGVuZGluZyA9IG5ldyBNYXAoKTtcblxuXHR2YXIgZmlyc3RfcnVuID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtCYXRjaH0gYmF0Y2hcblx0ICovXG5cdGZ1bmN0aW9uIGNvbW1pdChiYXRjaCkge1xuXHRcdGlmICgoc3RhdGUuZWZmZWN0LmYgJiBERVNUUk9ZRUQpICE9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0c3RhdGUucGVuZGluZy5kZWxldGUoYmF0Y2gpO1xuXG5cdFx0c3RhdGUuZmFsbGJhY2sgPSBmYWxsYmFjaztcblx0XHRyZWNvbmNpbGUoc3RhdGUsIGFycmF5LCBhbmNob3IsIGZsYWdzLCBnZXRfa2V5KTtcblxuXHRcdGlmIChmYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRpZiAoKGZhbGxiYWNrLmYgJiBFRkZFQ1RfT0ZGU0NSRUVOKSA9PT0gMCkge1xuXHRcdFx0XHRcdHJlc3VtZV9lZmZlY3QoZmFsbGJhY2spO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZhbGxiYWNrLmYgXj0gRUZGRUNUX09GRlNDUkVFTjtcblx0XHRcdFx0XHRtb3ZlKGZhbGxiYWNrLCBudWxsLCBhbmNob3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwYXVzZV9lZmZlY3QoZmFsbGJhY2ssICgpID0+IHtcblx0XHRcdFx0XHQvLyBUT0RPIG9ubHkgbnVsbCBvdXQgaWYgbm8gcGVuZGluZyBiYXRjaCBuZWVkcyBpdCxcblx0XHRcdFx0XHQvLyBvdGhlcndpc2UgcmUtYWRkIGBmYWxsYmFjay5mcmFnbWVudGAgYW5kIG1vdmUgdGhlXG5cdFx0XHRcdFx0Ly8gZWZmZWN0IGludG8gaXRcblx0XHRcdFx0XHRmYWxsYmFjayA9IG51bGw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0JhdGNofSBiYXRjaFxuXHQgKi9cblx0ZnVuY3Rpb24gZGlzY2FyZChiYXRjaCkge1xuXHRcdHN0YXRlLnBlbmRpbmcuZGVsZXRlKGJhdGNoKTtcblx0fVxuXG5cdHZhciBlZmZlY3QgPSBibG9jaygoKSA9PiB7XG5cdFx0YXJyYXkgPSAvKiogQHR5cGUge1ZbXX0gKi8gKGdldChlYWNoX2FycmF5KSk7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdC8qKiBgdHJ1ZWAgaWYgdGhlcmUgd2FzIGEgaHlkcmF0aW9uIG1pc21hdGNoLiBOZWVkcyB0byBiZSBhIGBsZXRgIG9yIGVsc2UgaXQgaXNuJ3QgdHJlZXNoYWtlbiBvdXQgKi9cblx0XHRsZXQgbWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdHZhciBpc19lbHNlID0gcmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24oYW5jaG9yKSA9PT0gSFlEUkFUSU9OX1NUQVJUX0VMU0U7XG5cblx0XHRcdGlmIChpc19lbHNlICE9PSAobGVuZ3RoID09PSAwKSkge1xuXHRcdFx0XHQvLyBoeWRyYXRpb24gbWlzbWF0Y2gg4oCUIHJlbW92ZSB0aGUgc2VydmVyLXJlbmRlcmVkIERPTSBhbmQgc3RhcnQgb3ZlclxuXHRcdFx0XHRhbmNob3IgPSBza2lwX25vZGVzKCk7XG5cblx0XHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShhbmNob3IpO1xuXHRcdFx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0XHRcdFx0bWlzbWF0Y2ggPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBrZXlzID0gbmV3IFNldCgpO1xuXHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChjdXJyZW50X2JhdGNoKTtcblx0XHR2YXIgZGVmZXIgPSBzaG91bGRfZGVmZXJfYXBwZW5kKCk7XG5cblx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGh5ZHJhdGluZyAmJlxuXHRcdFx0XHRoeWRyYXRlX25vZGUubm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSAmJlxuXHRcdFx0XHQvKiogQHR5cGUge0NvbW1lbnR9ICovIChoeWRyYXRlX25vZGUpLmRhdGEgPT09IEhZRFJBVElPTl9FTkRcblx0XHRcdCkge1xuXHRcdFx0XHQvLyBUaGUgc2VydmVyIHJlbmRlcmVkIGZld2VyIGl0ZW1zIHRoYW4gZXhwZWN0ZWQsXG5cdFx0XHRcdC8vIHNvIGJyZWFrIG91dCBhbmQgY29udGludWUgYXBwZW5kaW5nIG5vbi1oeWRyYXRlZCBpdGVtc1xuXHRcdFx0XHRhbmNob3IgPSAvKiogQHR5cGUge0NvbW1lbnR9ICovIChoeWRyYXRlX25vZGUpO1xuXHRcdFx0XHRtaXNtYXRjaCA9IHRydWU7XG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cdFx0XHR2YXIga2V5ID0gZ2V0X2tleSh2YWx1ZSwgaW5kZXgpO1xuXG5cdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdC8vIENoZWNrIHRoYXQgdGhlIGtleSBmdW5jdGlvbiBpcyBpZGVtcG90ZW50IChyZXR1cm5zIHRoZSBzYW1lIHZhbHVlIHdoZW4gY2FsbGVkIHR3aWNlKVxuXHRcdFx0XHR2YXIga2V5X2FnYWluID0gZ2V0X2tleSh2YWx1ZSwgaW5kZXgpO1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBrZXlfYWdhaW4pIHtcblx0XHRcdFx0XHRlLmVhY2hfa2V5X3ZvbGF0aWxlKFN0cmluZyhpbmRleCksIFN0cmluZyhrZXkpLCBTdHJpbmcoa2V5X2FnYWluKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIGl0ZW0gPSBmaXJzdF9ydW4gPyBudWxsIDogaXRlbXMuZ2V0KGtleSk7XG5cblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdC8vIHVwZGF0ZSBiZWZvcmUgcmVjb25jaWxpYXRpb24sIHRvIHRyaWdnZXIgYW55IGFzeW5jIHVwZGF0ZXNcblx0XHRcdFx0aWYgKGl0ZW0udikgaW50ZXJuYWxfc2V0KGl0ZW0udiwgdmFsdWUpO1xuXHRcdFx0XHRpZiAoaXRlbS5pKSBpbnRlcm5hbF9zZXQoaXRlbS5pLCBpbmRleCk7XG5cblx0XHRcdFx0aWYgKGRlZmVyKSB7XG5cdFx0XHRcdFx0YmF0Y2gudW5za2lwX2VmZmVjdChpdGVtLmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpdGVtID0gY3JlYXRlX2l0ZW0oXG5cdFx0XHRcdFx0aXRlbXMsXG5cdFx0XHRcdFx0Zmlyc3RfcnVuID8gYW5jaG9yIDogKG9mZnNjcmVlbl9hbmNob3IgPz89IGNyZWF0ZV90ZXh0KCkpLFxuXHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdGtleSxcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHRyZW5kZXJfZm4sXG5cdFx0XHRcdFx0ZmxhZ3MsXG5cdFx0XHRcdFx0Z2V0X2NvbGxlY3Rpb25cblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoIWZpcnN0X3J1bikge1xuXHRcdFx0XHRcdGl0ZW0uZS5mIHw9IEVGRkVDVF9PRkZTQ1JFRU47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpdGVtcy5zZXQoa2V5LCBpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0a2V5cy5hZGQoa2V5KTtcblx0XHR9XG5cblx0XHRpZiAobGVuZ3RoID09PSAwICYmIGZhbGxiYWNrX2ZuICYmICFmYWxsYmFjaykge1xuXHRcdFx0aWYgKGZpcnN0X3J1bikge1xuXHRcdFx0XHRmYWxsYmFjayA9IGJyYW5jaCgoKSA9PiBmYWxsYmFja19mbihhbmNob3IpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZhbGxiYWNrID0gYnJhbmNoKCgpID0+IGZhbGxiYWNrX2ZuKChvZmZzY3JlZW5fYW5jaG9yID8/PSBjcmVhdGVfdGV4dCgpKSkpO1xuXHRcdFx0XHRmYWxsYmFjay5mIHw9IEVGRkVDVF9PRkZTQ1JFRU47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGxlbmd0aCA+IGtleXMuc2l6ZSkge1xuXHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHR2YWxpZGF0ZV9lYWNoX2tleXMoYXJyYXksIGdldF9rZXkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gaW4gcHJvZCwgdGhlIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gaXNuJ3QgcHJpbnRlZCwgc28gZG9uJ3QgYm90aGVyIGNvbXB1dGluZyBpdFxuXHRcdFx0XHRlLmVhY2hfa2V5X2R1cGxpY2F0ZSgnJywgJycsICcnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZW1vdmUgZXhjZXNzIG5vZGVzXG5cdFx0aWYgKGh5ZHJhdGluZyAmJiBsZW5ndGggPiAwKSB7XG5cdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKHNraXBfbm9kZXMoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKCFmaXJzdF9ydW4pIHtcblx0XHRcdHBlbmRpbmcuc2V0KGJhdGNoLCBrZXlzKTtcblxuXHRcdFx0aWYgKGRlZmVyKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgW2tleSwgaXRlbV0gb2YgaXRlbXMpIHtcblx0XHRcdFx0XHRpZiAoIWtleXMuaGFzKGtleSkpIHtcblx0XHRcdFx0XHRcdGJhdGNoLnNraXBfZWZmZWN0KGl0ZW0uZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmF0Y2gub25jb21taXQoY29tbWl0KTtcblx0XHRcdFx0YmF0Y2gub25kaXNjYXJkKGRpc2NhcmQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29tbWl0KGJhdGNoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobWlzbWF0Y2gpIHtcblx0XHRcdC8vIGNvbnRpbnVlIGluIGh5ZHJhdGlvbiBtb2RlXG5cdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gd2UgbW91bnQgdGhlIGVhY2ggYmxvY2sgZm9yIHRoZSBmaXJzdCB0aW1lLCB0aGUgY29sbGVjdGlvbiB3b24ndCBiZVxuXHRcdC8vIGNvbm5lY3RlZCB0byB0aGlzIGVmZmVjdCBhcyB0aGUgZWZmZWN0IGhhc24ndCBmaW5pc2hlZCBydW5uaW5nIHlldCBhbmQgaXRzIGRlcHNcblx0XHQvLyB3b24ndCBiZSBhc3NpZ25lZC4gSG93ZXZlciwgaXQncyBwb3NzaWJsZSB0aGF0IHdoZW4gcmVjb25jaWxpbmcgdGhlIGVhY2ggYmxvY2tcblx0XHQvLyB0aGF0IGEgbXV0YXRpb24gb2NjdXJyZWQgYW5kIGl0J3MgbWFkZSB0aGUgY29sbGVjdGlvbiBNQVlCRV9ESVJUWSwgc28gcmVhZGluZyB0aGVcblx0XHQvLyBjb2xsZWN0aW9uIGFnYWluIGNhbiBwcm92aWRlIGNvbnNpc3RlbmN5IHRvIHRoZSByZWFjdGl2ZSBncmFwaCBhZ2FpbiBhcyB0aGUgZGVyaXZlZHNcblx0XHQvLyB3aWxsIG5vdyBiZSBgQ0xFQU5gLlxuXHRcdGdldChlYWNoX2FycmF5KTtcblx0fSk7XG5cblx0LyoqIEB0eXBlIHtFYWNoU3RhdGV9ICovXG5cdHZhciBzdGF0ZSA9IHsgZWZmZWN0LCBmbGFncywgaXRlbXMsIHBlbmRpbmcsIG91dHJvZ3JvdXBzOiBudWxsLCBmYWxsYmFjayB9O1xuXG5cdGZpcnN0X3J1biA9IGZhbHNlO1xuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRhbmNob3IgPSBoeWRyYXRlX25vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBTa2lwIHBhc3QgYW55IG5vbi1icmFuY2ggZWZmZWN0cyAod2hpY2ggY291bGQgYmUgY3JlYXRlZCB3aXRoIGBjcmVhdGVTdWJzY3JpYmVyYCwgZm9yIGV4YW1wbGUpIHRvIGZpbmQgdGhlIG5leHQgYnJhbmNoIGVmZmVjdFxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBlZmZlY3RcbiAqIEByZXR1cm5zIHtFZmZlY3QgfCBudWxsfVxuICovXG5mdW5jdGlvbiBza2lwX3RvX2JyYW5jaChlZmZlY3QpIHtcblx0d2hpbGUgKGVmZmVjdCAhPT0gbnVsbCAmJiAoZWZmZWN0LmYgJiBCUkFOQ0hfRUZGRUNUKSA9PT0gMCkge1xuXHRcdGVmZmVjdCA9IGVmZmVjdC5uZXh0O1xuXHR9XG5cdHJldHVybiBlZmZlY3Q7XG59XG5cbi8qKlxuICogQWRkLCByZW1vdmUsIG9yIHJlb3JkZXIgaXRlbXMgb3V0cHV0IGJ5IGFuIGVhY2ggYmxvY2sgYXMgaXRzIGlucHV0IGNoYW5nZXNcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge0VhY2hTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7QXJyYXk8Vj59IGFycmF5XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBDb21tZW50IHwgVGV4dH0gYW5jaG9yXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7KHZhbHVlOiBWLCBpbmRleDogbnVtYmVyKSA9PiBhbnl9IGdldF9rZXlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZWNvbmNpbGUoc3RhdGUsIGFycmF5LCBhbmNob3IsIGZsYWdzLCBnZXRfa2V5KSB7XG5cdHZhciBpc19hbmltYXRlZCA9IChmbGFncyAmIEVBQ0hfSVNfQU5JTUFURUQpICE9PSAwO1xuXG5cdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdHZhciBpdGVtcyA9IHN0YXRlLml0ZW1zO1xuXHR2YXIgY3VycmVudCA9IHNraXBfdG9fYnJhbmNoKHN0YXRlLmVmZmVjdC5maXJzdCk7XG5cblx0LyoqIEB0eXBlIHt1bmRlZmluZWQgfCBTZXQ8RWZmZWN0Pn0gKi9cblx0dmFyIHNlZW47XG5cblx0LyoqIEB0eXBlIHtFZmZlY3QgfCBudWxsfSAqL1xuXHR2YXIgcHJldiA9IG51bGw7XG5cblx0LyoqIEB0eXBlIHt1bmRlZmluZWQgfCBTZXQ8RWZmZWN0Pn0gKi9cblx0dmFyIHRvX2FuaW1hdGU7XG5cblx0LyoqIEB0eXBlIHtFZmZlY3RbXX0gKi9cblx0dmFyIG1hdGNoZWQgPSBbXTtcblxuXHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHR2YXIgc3Rhc2hlZCA9IFtdO1xuXG5cdC8qKiBAdHlwZSB7Vn0gKi9cblx0dmFyIHZhbHVlO1xuXG5cdC8qKiBAdHlwZSB7YW55fSAqL1xuXHR2YXIga2V5O1xuXG5cdC8qKiBAdHlwZSB7RWZmZWN0IHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgZWZmZWN0O1xuXG5cdC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuXHR2YXIgaTtcblxuXHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHZhbHVlID0gYXJyYXlbaV07XG5cdFx0XHRrZXkgPSBnZXRfa2V5KHZhbHVlLCBpKTtcblx0XHRcdGVmZmVjdCA9IC8qKiBAdHlwZSB7RWFjaEl0ZW19ICovIChpdGVtcy5nZXQoa2V5KSkuZTtcblxuXHRcdFx0Ly8gb2Zmc2NyZWVuID09IGNvbWluZyBpbiBub3csIG5vIGFuaW1hdGlvbiBpbiB0aGF0IGNhc2UsXG5cdFx0XHQvLyBlbHNlIHRoaXMgd291bGQgaGFwcGVuIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzE3MTgxXG5cdFx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDApIHtcblx0XHRcdFx0ZWZmZWN0Lm5vZGVzPy5hPy5tZWFzdXJlKCk7XG5cdFx0XHRcdCh0b19hbmltYXRlID8/PSBuZXcgU2V0KCkpLmFkZChlZmZlY3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhbHVlID0gYXJyYXlbaV07XG5cdFx0a2V5ID0gZ2V0X2tleSh2YWx1ZSwgaSk7XG5cblx0XHRlZmZlY3QgPSAvKiogQHR5cGUge0VhY2hJdGVtfSAqLyAoaXRlbXMuZ2V0KGtleSkpLmU7XG5cblx0XHRpZiAoc3RhdGUub3V0cm9ncm91cHMgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgZ3JvdXAgb2Ygc3RhdGUub3V0cm9ncm91cHMpIHtcblx0XHRcdFx0Z3JvdXAucGVuZGluZy5kZWxldGUoZWZmZWN0KTtcblx0XHRcdFx0Z3JvdXAuZG9uZS5kZWxldGUoZWZmZWN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgSU5FUlQpICE9PSAwKSB7XG5cdFx0XHRyZXN1bWVfZWZmZWN0KGVmZmVjdCk7XG5cdFx0XHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRcdFx0ZWZmZWN0Lm5vZGVzPy5hPy51bmZpeCgpO1xuXHRcdFx0XHQodG9fYW5pbWF0ZSA/Pz0gbmV3IFNldCgpKS5kZWxldGUoZWZmZWN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgIT09IDApIHtcblx0XHRcdGVmZmVjdC5mIF49IEVGRkVDVF9PRkZTQ1JFRU47XG5cblx0XHRcdGlmIChlZmZlY3QgPT09IGN1cnJlbnQpIHtcblx0XHRcdFx0bW92ZShlZmZlY3QsIG51bGwsIGFuY2hvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgbmV4dCA9IHByZXYgPyBwcmV2Lm5leHQgOiBjdXJyZW50O1xuXG5cdFx0XHRcdGlmIChlZmZlY3QgPT09IHN0YXRlLmVmZmVjdC5sYXN0KSB7XG5cdFx0XHRcdFx0c3RhdGUuZWZmZWN0Lmxhc3QgPSBlZmZlY3QucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlZmZlY3QucHJldikgZWZmZWN0LnByZXYubmV4dCA9IGVmZmVjdC5uZXh0O1xuXHRcdFx0XHRpZiAoZWZmZWN0Lm5leHQpIGVmZmVjdC5uZXh0LnByZXYgPSBlZmZlY3QucHJldjtcblx0XHRcdFx0bGluayhzdGF0ZSwgcHJldiwgZWZmZWN0KTtcblx0XHRcdFx0bGluayhzdGF0ZSwgZWZmZWN0LCBuZXh0KTtcblxuXHRcdFx0XHRtb3ZlKGVmZmVjdCwgbmV4dCwgYW5jaG9yKTtcblx0XHRcdFx0cHJldiA9IGVmZmVjdDtcblxuXHRcdFx0XHRtYXRjaGVkID0gW107XG5cdFx0XHRcdHN0YXNoZWQgPSBbXTtcblxuXHRcdFx0XHRjdXJyZW50ID0gc2tpcF90b19icmFuY2gocHJldi5uZXh0KTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGVmZmVjdCAhPT0gY3VycmVudCkge1xuXHRcdFx0aWYgKHNlZW4gIT09IHVuZGVmaW5lZCAmJiBzZWVuLmhhcyhlZmZlY3QpKSB7XG5cdFx0XHRcdGlmIChtYXRjaGVkLmxlbmd0aCA8IHN0YXNoZWQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Ly8gbW9yZSBlZmZpY2llbnQgdG8gbW92ZSBsYXRlciBpdGVtcyB0byB0aGUgZnJvbnRcblx0XHRcdFx0XHR2YXIgc3RhcnQgPSBzdGFzaGVkWzBdO1xuXHRcdFx0XHRcdHZhciBqO1xuXG5cdFx0XHRcdFx0cHJldiA9IHN0YXJ0LnByZXY7XG5cblx0XHRcdFx0XHR2YXIgYSA9IG1hdGNoZWRbMF07XG5cdFx0XHRcdFx0dmFyIGIgPSBtYXRjaGVkW21hdGNoZWQubGVuZ3RoIC0gMV07XG5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbWF0Y2hlZC5sZW5ndGg7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0bW92ZShtYXRjaGVkW2pdLCBzdGFydCwgYW5jaG9yKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgc3Rhc2hlZC5sZW5ndGg7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0c2Vlbi5kZWxldGUoc3Rhc2hlZFtqXSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGluayhzdGF0ZSwgYS5wcmV2LCBiLm5leHQpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIHByZXYsIGEpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIGIsIHN0YXJ0KTtcblxuXHRcdFx0XHRcdGN1cnJlbnQgPSBzdGFydDtcblx0XHRcdFx0XHRwcmV2ID0gYjtcblx0XHRcdFx0XHRpIC09IDE7XG5cblx0XHRcdFx0XHRtYXRjaGVkID0gW107XG5cdFx0XHRcdFx0c3Rhc2hlZCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIG1vcmUgZWZmaWNpZW50IHRvIG1vdmUgZWFybGllciBpdGVtcyB0byB0aGUgYmFja1xuXHRcdFx0XHRcdHNlZW4uZGVsZXRlKGVmZmVjdCk7XG5cdFx0XHRcdFx0bW92ZShlZmZlY3QsIGN1cnJlbnQsIGFuY2hvcik7XG5cblx0XHRcdFx0XHRsaW5rKHN0YXRlLCBlZmZlY3QucHJldiwgZWZmZWN0Lm5leHQpO1xuXHRcdFx0XHRcdGxpbmsoc3RhdGUsIGVmZmVjdCwgcHJldiA9PT0gbnVsbCA/IHN0YXRlLmVmZmVjdC5maXJzdCA6IHByZXYubmV4dCk7XG5cdFx0XHRcdFx0bGluayhzdGF0ZSwgcHJldiwgZWZmZWN0KTtcblxuXHRcdFx0XHRcdHByZXYgPSBlZmZlY3Q7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0bWF0Y2hlZCA9IFtdO1xuXHRcdFx0c3Rhc2hlZCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoY3VycmVudCAhPT0gbnVsbCAmJiBjdXJyZW50ICE9PSBlZmZlY3QpIHtcblx0XHRcdFx0KHNlZW4gPz89IG5ldyBTZXQoKSkuYWRkKGN1cnJlbnQpO1xuXHRcdFx0XHRzdGFzaGVkLnB1c2goY3VycmVudCk7XG5cdFx0XHRcdGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChjdXJyZW50Lm5leHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY3VycmVudCA9PT0gbnVsbCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKGVmZmVjdC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDApIHtcblx0XHRcdG1hdGNoZWQucHVzaChlZmZlY3QpO1xuXHRcdH1cblxuXHRcdHByZXYgPSBlZmZlY3Q7XG5cdFx0Y3VycmVudCA9IHNraXBfdG9fYnJhbmNoKGVmZmVjdC5uZXh0KTtcblx0fVxuXG5cdGlmIChzdGF0ZS5vdXRyb2dyb3VwcyAhPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgZ3JvdXAgb2Ygc3RhdGUub3V0cm9ncm91cHMpIHtcblx0XHRcdGlmIChncm91cC5wZW5kaW5nLnNpemUgPT09IDApIHtcblx0XHRcdFx0ZGVzdHJveV9lZmZlY3RzKHN0YXRlLCBhcnJheV9mcm9tKGdyb3VwLmRvbmUpKTtcblx0XHRcdFx0c3RhdGUub3V0cm9ncm91cHM/LmRlbGV0ZShncm91cCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlLm91dHJvZ3JvdXBzLnNpemUgPT09IDApIHtcblx0XHRcdHN0YXRlLm91dHJvZ3JvdXBzID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRpZiAoY3VycmVudCAhPT0gbnVsbCB8fCBzZWVuICE9PSB1bmRlZmluZWQpIHtcblx0XHQvKiogQHR5cGUge0VmZmVjdFtdfSAqL1xuXHRcdHZhciB0b19kZXN0cm95ID0gW107XG5cblx0XHRpZiAoc2VlbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRmb3IgKGVmZmVjdCBvZiBzZWVuKSB7XG5cdFx0XHRcdGlmICgoZWZmZWN0LmYgJiBJTkVSVCkgPT09IDApIHtcblx0XHRcdFx0XHR0b19kZXN0cm95LnB1c2goZWZmZWN0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG5cdFx0XHQvLyBJZiB0aGUgZWFjaCBibG9jayBpc24ndCBpbmVydCwgdGhlbiBpbmVydCBlZmZlY3RzIGFyZSBjdXJyZW50bHkgb3V0cm9pbmcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkXG5cdFx0XHRpZiAoKGN1cnJlbnQuZiAmIElORVJUKSA9PT0gMCAmJiBjdXJyZW50ICE9PSBzdGF0ZS5mYWxsYmFjaykge1xuXHRcdFx0XHR0b19kZXN0cm95LnB1c2goY3VycmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnQgPSBza2lwX3RvX2JyYW5jaChjdXJyZW50Lm5leHQpO1xuXHRcdH1cblxuXHRcdHZhciBkZXN0cm95X2xlbmd0aCA9IHRvX2Rlc3Ryb3kubGVuZ3RoO1xuXG5cdFx0aWYgKGRlc3Ryb3lfbGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGNvbnRyb2xsZWRfYW5jaG9yID0gKGZsYWdzICYgRUFDSF9JU19DT05UUk9MTEVEKSAhPT0gMCAmJiBsZW5ndGggPT09IDAgPyBhbmNob3IgOiBudWxsO1xuXG5cdFx0XHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGRlc3Ryb3lfbGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHR0b19kZXN0cm95W2ldLm5vZGVzPy5hPy5tZWFzdXJlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZGVzdHJveV9sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdHRvX2Rlc3Ryb3lbaV0ubm9kZXM/LmE/LmZpeCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHBhdXNlX2VmZmVjdHMoc3RhdGUsIHRvX2Rlc3Ryb3ksIGNvbnRyb2xsZWRfYW5jaG9yKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoaXNfYW5pbWF0ZWQpIHtcblx0XHRxdWV1ZV9taWNyb190YXNrKCgpID0+IHtcblx0XHRcdGlmICh0b19hbmltYXRlID09PSB1bmRlZmluZWQpIHJldHVybjtcblx0XHRcdGZvciAoZWZmZWN0IG9mIHRvX2FuaW1hdGUpIHtcblx0XHRcdFx0ZWZmZWN0Lm5vZGVzPy5hPy5hcHBseSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7TWFwPGFueSwgRWFjaEl0ZW0+fSBpdGVtc1xuICogQHBhcmFtIHtOb2RlfSBhbmNob3JcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7dW5rbm93bn0ga2V5XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7KGFuY2hvcjogTm9kZSwgaXRlbTogViB8IFNvdXJjZTxWPiwgaW5kZXg6IG51bWJlciB8IFZhbHVlPG51bWJlcj4sIGNvbGxlY3Rpb246ICgpID0+IFZbXSkgPT4gdm9pZH0gcmVuZGVyX2ZuXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7KCkgPT4gVltdfSBnZXRfY29sbGVjdGlvblxuICogQHJldHVybnMge0VhY2hJdGVtfVxuICovXG5mdW5jdGlvbiBjcmVhdGVfaXRlbShpdGVtcywgYW5jaG9yLCB2YWx1ZSwga2V5LCBpbmRleCwgcmVuZGVyX2ZuLCBmbGFncywgZ2V0X2NvbGxlY3Rpb24pIHtcblx0dmFyIHYgPVxuXHRcdChmbGFncyAmIEVBQ0hfSVRFTV9SRUFDVElWRSkgIT09IDBcblx0XHRcdD8gKGZsYWdzICYgRUFDSF9JVEVNX0lNTVVUQUJMRSkgPT09IDBcblx0XHRcdFx0PyBtdXRhYmxlX3NvdXJjZSh2YWx1ZSwgZmFsc2UsIGZhbHNlKVxuXHRcdFx0XHQ6IHNvdXJjZSh2YWx1ZSlcblx0XHRcdDogbnVsbDtcblxuXHR2YXIgaSA9IChmbGFncyAmIEVBQ0hfSU5ERVhfUkVBQ1RJVkUpICE9PSAwID8gc291cmNlKGluZGV4KSA6IG51bGw7XG5cblx0aWYgKERFViAmJiB2KSB7XG5cdFx0Ly8gRm9yIHRyYWNpbmcgcHVycG9zZXMsIHdlIG5lZWQgdG8gbGluayB0aGUgc291cmNlIHNpZ25hbCB3ZSBjcmVhdGUgd2l0aCB0aGVcblx0XHQvLyBjb2xsZWN0aW9uICsgaW5kZXggc28gdGhhdCB0cmFjaW5nIHdvcmtzIGFzIGludGVuZGVkXG5cdFx0di50cmFjZSA9ICgpID0+IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0XHRnZXRfY29sbGVjdGlvbigpW2k/LnYgPz8gaW5kZXhdO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHYsXG5cdFx0aSxcblx0XHRlOiBicmFuY2goKCkgPT4ge1xuXHRcdFx0cmVuZGVyX2ZuKGFuY2hvciwgdiA/PyB2YWx1ZSwgaSA/PyBpbmRleCwgZ2V0X2NvbGxlY3Rpb24pO1xuXG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRpdGVtcy5kZWxldGUoa2V5KTtcblx0XHRcdH07XG5cdFx0fSlcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VmZmVjdH0gZWZmZWN0XG4gKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IG5leHRcbiAqIEBwYXJhbSB7VGV4dCB8IEVsZW1lbnQgfCBDb21tZW50fSBhbmNob3JcbiAqL1xuZnVuY3Rpb24gbW92ZShlZmZlY3QsIG5leHQsIGFuY2hvcikge1xuXHRpZiAoIWVmZmVjdC5ub2RlcykgcmV0dXJuO1xuXG5cdHZhciBub2RlID0gZWZmZWN0Lm5vZGVzLnN0YXJ0O1xuXHR2YXIgZW5kID0gZWZmZWN0Lm5vZGVzLmVuZDtcblxuXHR2YXIgZGVzdCA9XG5cdFx0bmV4dCAmJiAobmV4dC5mICYgRUZGRUNUX09GRlNDUkVFTikgPT09IDBcblx0XHRcdD8gLyoqIEB0eXBlIHtFZmZlY3ROb2Rlc30gKi8gKG5leHQubm9kZXMpLnN0YXJ0XG5cdFx0XHQ6IGFuY2hvcjtcblxuXHR3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuXHRcdHZhciBuZXh0X25vZGUgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9uZXh0X3NpYmxpbmcobm9kZSkpO1xuXHRcdGRlc3QuYmVmb3JlKG5vZGUpO1xuXG5cdFx0aWYgKG5vZGUgPT09IGVuZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5vZGUgPSBuZXh0X25vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VhY2hTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7RWZmZWN0IHwgbnVsbH0gcHJldlxuICogQHBhcmFtIHtFZmZlY3QgfCBudWxsfSBuZXh0XG4gKi9cbmZ1bmN0aW9uIGxpbmsoc3RhdGUsIHByZXYsIG5leHQpIHtcblx0aWYgKHByZXYgPT09IG51bGwpIHtcblx0XHRzdGF0ZS5lZmZlY3QuZmlyc3QgPSBuZXh0O1xuXHR9IGVsc2Uge1xuXHRcdHByZXYubmV4dCA9IG5leHQ7XG5cdH1cblxuXHRpZiAobmV4dCA9PT0gbnVsbCkge1xuXHRcdHN0YXRlLmVmZmVjdC5sYXN0ID0gcHJldjtcblx0fSBlbHNlIHtcblx0XHRuZXh0LnByZXYgPSBwcmV2O1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnJheVxuICogQHBhcmFtIHsoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiBzdHJpbmd9IGtleV9mblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfa2V5cyhhcnJheSwga2V5X2ZuKSB7XG5cdGNvbnN0IGtleXMgPSBuZXcgTWFwKCk7XG5cdGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5X2ZuKGFycmF5W2ldLCBpKTtcblxuXHRcdGlmIChrZXlzLmhhcyhrZXkpKSB7XG5cdFx0XHRjb25zdCBhID0gU3RyaW5nKGtleXMuZ2V0KGtleSkpO1xuXHRcdFx0Y29uc3QgYiA9IFN0cmluZyhpKTtcblxuXHRcdFx0LyoqIEB0eXBlIHtzdHJpbmcgfCBudWxsfSAqL1xuXHRcdFx0bGV0IGsgPSBTdHJpbmcoa2V5KTtcblx0XHRcdGlmIChrLnN0YXJ0c1dpdGgoJ1tvYmplY3QgJykpIGsgPSBudWxsO1xuXG5cdFx0XHRlLmVhY2hfa2V5X2R1cGxpY2F0ZShhLCBiLCBrKTtcblx0XHR9XG5cblx0XHRrZXlzLnNldChrZXksIGkpO1xuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IEVmZmVjdCwgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbi8qKiBAaW1wb3J0IHt9IGZyb20gJ3RydXN0ZWQtdHlwZXMnICovXG5pbXBvcnQge1xuXHRGSUxFTkFNRSxcblx0SFlEUkFUSU9OX0VSUk9SLFxuXHROQU1FU1BBQ0VfU1ZHLFxuXHROQU1FU1BBQ0VfTUFUSE1MXG59IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyByZW1vdmVfZWZmZWN0X2RvbSwgdGVtcGxhdGVfZWZmZWN0IH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGVfbmV4dCwgaHlkcmF0ZV9ub2RlLCBoeWRyYXRpbmcsIHNldF9oeWRyYXRlX25vZGUgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuXG5pbXBvcnQgeyBhc3NpZ25fbm9kZXMgfSBmcm9tICcuLi90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4uLy4uL3dhcm5pbmdzLmpzJztcbmltcG9ydCB7IGhhc2gsIHNhbml0aXplX2xvY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb24gfSBmcm9tICcuLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGNyZWF0ZV9lbGVtZW50LCBnZXRfZmlyc3RfY2hpbGQsIGdldF9uZXh0X3NpYmxpbmcgfSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9lZmZlY3QgfSBmcm9tICcuLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IENPTU1FTlRfTk9ERSB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gc2VydmVyX2hhc2hcbiAqIEBwYXJhbSB7c3RyaW5nIHwgVHJ1c3RlZEhUTUx9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrX2hhc2goZWxlbWVudCwgc2VydmVyX2hhc2gsIHZhbHVlKSB7XG5cdGlmICghc2VydmVyX2hhc2ggfHwgc2VydmVyX2hhc2ggPT09IGhhc2goU3RyaW5nKHZhbHVlID8/ICcnKSkpIHJldHVybjtcblxuXHRsZXQgbG9jYXRpb247XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRjb25zdCBsb2MgPSBlbGVtZW50Ll9fc3ZlbHRlX21ldGE/LmxvYztcblx0aWYgKGxvYykge1xuXHRcdGxvY2F0aW9uID0gYG5lYXIgJHtsb2MuZmlsZX06JHtsb2MubGluZX06JHtsb2MuY29sdW1ufWA7XG5cdH0gZWxzZSBpZiAoZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uPy5bRklMRU5BTUVdKSB7XG5cdFx0bG9jYXRpb24gPSBgaW4gJHtkZXZfY3VycmVudF9jb21wb25lbnRfZnVuY3Rpb25bRklMRU5BTUVdfWA7XG5cdH1cblxuXHR3Lmh5ZHJhdGlvbl9odG1sX2NoYW5nZWQoc2FuaXRpemVfbG9jYXRpb24obG9jYXRpb24pKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBUZXh0IHwgQ29tbWVudH0gbm9kZVxuICogQHBhcmFtIHsoKSA9PiBzdHJpbmcgfCBUcnVzdGVkSFRNTH0gZ2V0X3ZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc19jb250cm9sbGVkXVxuICogQHBhcmFtIHtib29sZWFufSBbc3ZnXVxuICogQHBhcmFtIHtib29sZWFufSBbbWF0aG1sXVxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF93YXJuaW5nXVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBodG1sKFxuXHRub2RlLFxuXHRnZXRfdmFsdWUsXG5cdGlzX2NvbnRyb2xsZWQgPSBmYWxzZSxcblx0c3ZnID0gZmFsc2UsXG5cdG1hdGhtbCA9IGZhbHNlLFxuXHRza2lwX3dhcm5pbmcgPSBmYWxzZVxuKSB7XG5cdHZhciBhbmNob3IgPSBub2RlO1xuXG5cdC8qKiBAdHlwZSB7c3RyaW5nIHwgVHJ1c3RlZEhUTUx9ICovXG5cdHZhciB2YWx1ZSA9ICcnO1xuXG5cdGlmIChpc19jb250cm9sbGVkKSB7XG5cdFx0dmFyIHBhcmVudF9ub2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAobm9kZSk7XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRhbmNob3IgPSBzZXRfaHlkcmF0ZV9ub2RlKGdldF9maXJzdF9jaGlsZChwYXJlbnRfbm9kZSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlbXBsYXRlX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIGVmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0XHRpZiAodmFsdWUgPT09ICh2YWx1ZSA9IGdldF92YWx1ZSgpID8/ICcnKSkge1xuXHRcdFx0aWYgKGh5ZHJhdGluZykgaHlkcmF0ZV9uZXh0KCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGlzX2NvbnRyb2xsZWQgJiYgIWh5ZHJhdGluZykge1xuXHRcdFx0Ly8gV2hlbiBAaHRtbCBpcyB0aGUgb25seSBjaGlsZCwgdXNlIGlubmVySFRNTCBkaXJlY3RseS5cblx0XHRcdC8vIFRoaXMgYWxzbyBoYW5kbGVzIGNvbnRlbnRlZGl0YWJsZSwgd2hlcmUgdGhlIHVzZXIgbWF5IGRlbGV0ZSB0aGUgYW5jaG9yIGNvbW1lbnQuXG5cdFx0XHRlZmZlY3Qubm9kZXMgPSBudWxsO1xuXHRcdFx0cGFyZW50X25vZGUuaW5uZXJIVE1MID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovICh2YWx1ZSk7XG5cblx0XHRcdGlmICh2YWx1ZSAhPT0gJycpIHtcblx0XHRcdFx0YXNzaWduX25vZGVzKFxuXHRcdFx0XHRcdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKHBhcmVudF9ub2RlKSksXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChwYXJlbnRfbm9kZS5sYXN0Q2hpbGQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZWZmZWN0Lm5vZGVzICE9PSBudWxsKSB7XG5cdFx0XHRyZW1vdmVfZWZmZWN0X2RvbShlZmZlY3Qubm9kZXMuc3RhcnQsIC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZWZmZWN0Lm5vZGVzLmVuZCkpO1xuXHRcdFx0ZWZmZWN0Lm5vZGVzID0gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodmFsdWUgPT09ICcnKSByZXR1cm47XG5cblx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHQvLyBXZSdyZSBkZWxpYmVyYXRlbHkgbm90IHRyeWluZyB0byByZXBhaXIgbWlzbWF0Y2hlcyBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50LFxuXHRcdFx0Ly8gYXMgaXQncyBjb3N0bHkgYW5kIGVycm9yLXByb25lIChhbmQgaXQncyBhbiBlZGdlIGNhc2UgdG8gaGF2ZSBhIG1pc21hdGNoIGFueXdheSlcblx0XHRcdHZhciBoYXNoID0gLyoqIEB0eXBlIHtDb21tZW50fSAqLyAoaHlkcmF0ZV9ub2RlKS5kYXRhO1xuXG5cdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZSB8IG51bGx9ICovXG5cdFx0XHR2YXIgbmV4dCA9IGh5ZHJhdGVfbmV4dCgpO1xuXHRcdFx0dmFyIGxhc3QgPSBuZXh0O1xuXG5cdFx0XHR3aGlsZSAoXG5cdFx0XHRcdG5leHQgIT09IG51bGwgJiZcblx0XHRcdFx0KG5leHQubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSB8fCAvKiogQHR5cGUge0NvbW1lbnR9ICovIChuZXh0KS5kYXRhICE9PSAnJylcblx0XHRcdCkge1xuXHRcdFx0XHRsYXN0ID0gbmV4dDtcblx0XHRcdFx0bmV4dCA9IGdldF9uZXh0X3NpYmxpbmcobmV4dCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXh0ID09PSBudWxsKSB7XG5cdFx0XHRcdHcuaHlkcmF0aW9uX21pc21hdGNoKCk7XG5cdFx0XHRcdHRocm93IEhZRFJBVElPTl9FUlJPUjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKERFViAmJiAhc2tpcF93YXJuaW5nKSB7XG5cdFx0XHRcdGNoZWNrX2hhc2goLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAobmV4dC5wYXJlbnROb2RlKSwgaGFzaCwgdmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRhc3NpZ25fbm9kZXMoaHlkcmF0ZV9ub2RlLCBsYXN0KTtcblx0XHRcdGFuY2hvciA9IHNldF9oeWRyYXRlX25vZGUobmV4dCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRG9uJ3QgdXNlIGNyZWF0ZV9mcmFnbWVudF93aXRoX3NjcmlwdF9mcm9tX2h0bWwgaGVyZSBiZWNhdXNlIHRoYXQgd291bGQgbWVhbiBzY3JpcHQgdGFncyBhcmUgZXhlY3V0ZWQuXG5cdFx0Ly8gQGh0bWwgaXMgYmFzaWNhbGx5IGAuaW5uZXJIVE1MID0gLi4uYCBhbmQgdGhhdCBkb2Vzbid0IGV4ZWN1dGUgc2NyaXB0cyBlaXRoZXIgZHVlIHRvIHNlY3VyaXR5IHJlYXNvbnMuXG5cdFx0Ly8gVXNlIGEgPHRlbXBsYXRlPiwgPHN2Zz4sIG9yIDxtYXRoPiB3cmFwcGVyIGRlcGVuZGluZyBvbiBjb250ZXh0LiBJZiB2YWx1ZSBpcyBhIFRydXN0ZWRIVE1MIG9iamVjdCxcblx0XHQvLyBpdCB3aWxsIGJlIGFzc2lnbmVkIGRpcmVjdGx5IHRvIGlubmVySFRNTCB3aXRob3V0IGNvZXJjaW9uIOKAlCB0aGlzIGFsbG93cyB7QGh0bWwgcG9saWN5LmNyZWF0ZUhUTUwoLi4uKX0gdG8gd29yay5cblx0XHR2YXIgbnMgPSBzdmcgPyBOQU1FU1BBQ0VfU1ZHIDogbWF0aG1sID8gTkFNRVNQQUNFX01BVEhNTCA6IHVuZGVmaW5lZDtcblx0XHR2YXIgd3JhcHBlciA9IC8qKiBAdHlwZSB7SFRNTFRlbXBsYXRlRWxlbWVudCB8IFNWR0VsZW1lbnQgfCBNYXRoTUxFbGVtZW50fSAqLyAoXG5cdFx0XHRjcmVhdGVfZWxlbWVudChzdmcgPyAnc3ZnJyA6IG1hdGhtbCA/ICdtYXRoJyA6ICd0ZW1wbGF0ZScsIG5zKVxuXHRcdCk7XG5cdFx0d3JhcHBlci5pbm5lckhUTUwgPSAvKiogQHR5cGUge2FueX0gKi8gKHZhbHVlKTtcblxuXHRcdC8qKiBAdHlwZSB7RG9jdW1lbnRGcmFnbWVudCB8IEVsZW1lbnR9ICovXG5cdFx0dmFyIG5vZGUgPSBzdmcgfHwgbWF0aG1sID8gd3JhcHBlciA6IC8qKiBAdHlwZSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gKi8gKHdyYXBwZXIpLmNvbnRlbnQ7XG5cblx0XHRhc3NpZ25fbm9kZXMoXG5cdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9maXJzdF9jaGlsZChub2RlKSksXG5cdFx0XHQvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKG5vZGUubGFzdENoaWxkKVxuXHRcdCk7XG5cblx0XHRpZiAoc3ZnIHx8IG1hdGhtbCkge1xuXHRcdFx0d2hpbGUgKGdldF9maXJzdF9jaGlsZChub2RlKSkge1xuXHRcdFx0XHRhbmNob3IuYmVmb3JlKC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoZ2V0X2ZpcnN0X2NoaWxkKG5vZGUpKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFuY2hvci5iZWZvcmUobm9kZSk7XG5cdFx0fVxuXHR9KTtcbn1cbiIsImltcG9ydCB7IGh5ZHJhdGVfbmV4dCwgaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0NvbW1lbnR9IGFuY2hvclxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAkJHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gc2xvdF9wcm9wc1xuICogQHBhcmFtIHtudWxsIHwgKChhbmNob3I6IENvbW1lbnQpID0+IHZvaWQpfSBmYWxsYmFja19mblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2xvdChhbmNob3IsICQkcHJvcHMsIG5hbWUsIHNsb3RfcHJvcHMsIGZhbGxiYWNrX2ZuKSB7XG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRoeWRyYXRlX25leHQoKTtcblx0fVxuXG5cdHZhciBzbG90X2ZuID0gJCRwcm9wcy4kJHNsb3RzPy5bbmFtZV07XG5cdC8vIEludGVyb3A6IENhbiB1c2Ugc25pcHBldHMgdG8gZmlsbCBzbG90c1xuXHR2YXIgaXNfaW50ZXJvcCA9IGZhbHNlO1xuXHRpZiAoc2xvdF9mbiA9PT0gdHJ1ZSkge1xuXHRcdHNsb3RfZm4gPSAkJHByb3BzW25hbWUgPT09ICdkZWZhdWx0JyA/ICdjaGlsZHJlbicgOiBuYW1lXTtcblx0XHRpc19pbnRlcm9wID0gdHJ1ZTtcblx0fVxuXG5cdGlmIChzbG90X2ZuID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZmFsbGJhY2tfZm4gIT09IG51bGwpIHtcblx0XHRcdGZhbGxiYWNrX2ZuKGFuY2hvcik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHNsb3RfZm4oYW5jaG9yLCBpc19pbnRlcm9wID8gKCkgPT4gc2xvdF9wcm9wcyA6IHNsb3RfcHJvcHMpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBwcm9wc1xuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIGJvb2xlYW4+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVfc2xvdHMocHJvcHMpIHtcblx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBib29sZWFuPn0gKi9cblx0Y29uc3Qgc2FuaXRpemVkID0ge307XG5cdGlmIChwcm9wcy5jaGlsZHJlbikgc2FuaXRpemVkLmRlZmF1bHQgPSB0cnVlO1xuXHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wcy4kJHNsb3RzKSB7XG5cdFx0c2FuaXRpemVkW2tleV0gPSB0cnVlO1xuXHR9XG5cdHJldHVybiBzYW5pdGl6ZWQ7XG59XG4iLCIvKiogQGltcG9ydCB7IFRlbXBsYXRlTm9kZSwgRG9tIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IEVGRkVDVF9UUkFOU1BBUkVOVCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IGJsb2NrIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7XG5cdGh5ZHJhdGVfbmV4dCxcblx0aHlkcmF0ZV9ub2RlLFxuXHRoeWRyYXRpbmcsXG5cdHJlYWRfaHlkcmF0aW9uX2luc3RydWN0aW9uLFxuXHRzZXRfaHlkcmF0ZV9ub2RlLFxuXHRzZXRfaHlkcmF0aW5nLFxuXHRza2lwX25vZGVzXG59IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBCcmFuY2hNYW5hZ2VyIH0gZnJvbSAnLi9icmFuY2hlcy5qcyc7XG5pbXBvcnQgeyBIWURSQVRJT05fU1RBUlQsIEhZRFJBVElPTl9TVEFSVF9FTFNFIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgUFxuICogQHRlbXBsYXRlIHsocHJvcHM6IFApID0+IHZvaWR9IENcbiAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gKiBAcGFyYW0geygpID0+IEN9IGdldF9jb21wb25lbnRcbiAqIEBwYXJhbSB7KGFuY2hvcjogVGVtcGxhdGVOb2RlLCBjb21wb25lbnQ6IEMpID0+IERvbSB8IHZvaWR9IHJlbmRlcl9mblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnQobm9kZSwgZ2V0X2NvbXBvbmVudCwgcmVuZGVyX2ZuKSB7XG5cdC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlIHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgaHlkcmF0aW9uX3N0YXJ0X25vZGU7XG5cblx0aWYgKGh5ZHJhdGluZykge1xuXHRcdGh5ZHJhdGlvbl9zdGFydF9ub2RlID0gaHlkcmF0ZV9ub2RlO1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0dmFyIGJyYW5jaGVzID0gbmV3IEJyYW5jaE1hbmFnZXIobm9kZSk7XG5cblx0YmxvY2soKCkgPT4ge1xuXHRcdHZhciBjb21wb25lbnQgPSBnZXRfY29tcG9uZW50KCkgPz8gbnVsbDtcblxuXHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdHZhciBkYXRhID0gcmVhZF9oeWRyYXRpb25faW5zdHJ1Y3Rpb24oLyoqIEB0eXBlIHtUZW1wbGF0ZU5vZGV9ICovIChoeWRyYXRpb25fc3RhcnRfbm9kZSkpO1xuXG5cdFx0XHR2YXIgc2VydmVyX2hhZF9jb21wb25lbnQgPSBkYXRhID09PSBIWURSQVRJT05fU1RBUlQ7XG5cdFx0XHR2YXIgY2xpZW50X2hhc19jb21wb25lbnQgPSBjb21wb25lbnQgIT09IG51bGw7XG5cblx0XHRcdGlmIChzZXJ2ZXJfaGFkX2NvbXBvbmVudCAhPT0gY2xpZW50X2hhc19jb21wb25lbnQpIHtcblx0XHRcdFx0Ly8gSHlkcmF0aW9uIG1pc21hdGNoOiBza2lwIHRoZSBzZXJ2ZXItcmVuZGVyZWQgbm9kZXMgYW5kIHJlbmRlciBmcmVzaFxuXHRcdFx0XHR2YXIgYW5jaG9yID0gc2tpcF9ub2RlcygpO1xuXG5cdFx0XHRcdHNldF9oeWRyYXRlX25vZGUoYW5jaG9yKTtcblx0XHRcdFx0YnJhbmNoZXMuYW5jaG9yID0gYW5jaG9yO1xuXG5cdFx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdFx0XHRicmFuY2hlcy5lbnN1cmUoY29tcG9uZW50LCBjb21wb25lbnQgJiYgKCh0YXJnZXQpID0+IHJlbmRlcl9mbih0YXJnZXQsIGNvbXBvbmVudCkpKTtcblx0XHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YnJhbmNoZXMuZW5zdXJlKGNvbXBvbmVudCwgY29tcG9uZW50ICYmICgodGFyZ2V0KSA9PiByZW5kZXJfZm4odGFyZ2V0LCBjb21wb25lbnQpKSk7XG5cdH0sIEVGRkVDVF9UUkFOU1BBUkVOVCk7XG59XG4iLCIvKiogQGltcG9ydCB7IFJhZiB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLmpzJztcblxuaW1wb3J0IHsgQlJPV1NFUiB9IGZyb20gJ2VzbS1lbnYnO1xuXG5jb25zdCBub3cgPSBCUk9XU0VSID8gKCkgPT4gcGVyZm9ybWFuY2Uubm93KCkgOiAoKSA9PiBEYXRlLm5vdygpO1xuXG4vKiogQHR5cGUge1JhZn0gKi9cbmV4cG9ydCBjb25zdCByYWYgPSB7XG5cdC8vIGRvbid0IGFjY2VzcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZWFnZXJseSBvdXRzaWRlIG1ldGhvZFxuXHQvLyB0aGlzIGFsbG93cyBiYXNpYyB0ZXN0aW5nIG9mIHVzZXIgY29kZSB3aXRob3V0IEpTRE9NXG5cdC8vIGJ1bmRlciB3aWxsIGV2YWwgYW5kIHJlbW92ZSB0ZXJuYXJ5IHdoZW4gdGhlIHVzZXIncyBhcHAgaXMgYnVpbHRcblx0dGljazogLyoqIEBwYXJhbSB7YW55fSBfICovIChfKSA9PiAoQlJPV1NFUiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IG5vb3ApKF8pLFxuXHRub3c6ICgpID0+IG5vdygpLFxuXHR0YXNrczogbmV3IFNldCgpXG59O1xuIiwiLyoqIEBpbXBvcnQgeyBUYXNrQ2FsbGJhY2ssIFRhc2ssIFRhc2tFbnRyeSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL3RpbWluZy5qcyc7XG5cbi8vIFRPRE8gbW92ZSB0aGlzIGludG8gdGltaW5nLmpzIHdoZXJlIGl0IHByb2JhYmx5IGJlbG9uZ3NcblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcnVuX3Rhc2tzKCkge1xuXHQvLyB1c2UgYHJhZi5ub3coKWAgaW5zdGVhZCBvZiB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgY2FsbGJhY2sgYXJndW1lbnQsIGJlY2F1c2Vcblx0Ly8gb3RoZXJ3aXNlIHRoaW5ncyBjYW4gZ2V0IHdvbmt5IGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvcHVsbC8xNDU0MVxuXHRjb25zdCBub3cgPSByYWYubm93KCk7XG5cblx0cmFmLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcblx0XHRpZiAoIXRhc2suYyhub3cpKSB7XG5cdFx0XHRyYWYudGFza3MuZGVsZXRlKHRhc2spO1xuXHRcdFx0dGFzay5mKCk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAocmFmLnRhc2tzLnNpemUgIT09IDApIHtcblx0XHRyYWYudGljayhydW5fdGFza3MpO1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqIEBwYXJhbSB7VGFza0NhbGxiYWNrfSBjYWxsYmFja1xuICogQHJldHVybnMge1Rhc2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb29wKGNhbGxiYWNrKSB7XG5cdC8qKiBAdHlwZSB7VGFza0VudHJ5fSAqL1xuXHRsZXQgdGFzaztcblxuXHRpZiAocmFmLnRhc2tzLnNpemUgPT09IDApIHtcblx0XHRyYWYudGljayhydW5fdGFza3MpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRwcm9taXNlOiBuZXcgUHJvbWlzZSgoZnVsZmlsbCkgPT4ge1xuXHRcdFx0cmFmLnRhc2tzLmFkZCgodGFzayA9IHsgYzogY2FsbGJhY2ssIGY6IGZ1bGZpbGwgfSkpO1xuXHRcdH0pLFxuXHRcdGFib3J0KCkge1xuXHRcdFx0cmFmLnRhc2tzLmRlbGV0ZSh0YXNrKTtcblx0XHR9XG5cdH07XG59XG4iLCIvKiogQGltcG9ydCB7IEFuaW1hdGVGbiwgQW5pbWF0aW9uLCBBbmltYXRpb25Db25maWcsIEVhY2hJdGVtLCBFZmZlY3QsIEVmZmVjdE5vZGVzLCBUcmFuc2l0aW9uRm4sIFRyYW5zaXRpb25NYW5hZ2VyIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IG5vb3AsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBhY3RpdmVfZWZmZWN0LCB1bnRyYWNrIH0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBsb29wIH0gZnJvbSAnLi4vLi4vbG9vcC5qcyc7XG5pbXBvcnQgeyBzaG91bGRfaW50cm8gfSBmcm9tICcuLi8uLi9yZW5kZXIuanMnO1xuaW1wb3J0IHsgVFJBTlNJVElPTl9HTE9CQUwsIFRSQU5TSVRJT05fSU4sIFRSQU5TSVRJT05fT1VUIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IEJMT0NLX0VGRkVDVCwgUkVBQ1RJT05fUkFOLCBFRkZFQ1RfVFJBTlNQQVJFTlQgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vdGFzay5qcyc7XG5pbXBvcnQgeyB3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQgfSBmcm9tICcuL2JpbmRpbmdzL3NoYXJlZC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0geydpbnRyb3N0YXJ0JyB8ICdpbnRyb2VuZCcgfCAnb3V0cm9zdGFydCcgfCAnb3V0cm9lbmQnfSB0eXBlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gZGlzcGF0Y2hfZXZlbnQoZWxlbWVudCwgdHlwZSkge1xuXHR3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQoKCkgPT4ge1xuXHRcdGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodHlwZSkpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHByb3BlcnR5IHRvIHRoZSBjYW1lbC1jYXNlIGZvcm1hdCBleHBlY3RlZCBieSBFbGVtZW50LmFuaW1hdGUoKSwgS2V5ZnJhbWVFZmZlY3QoKSwgYW5kIEtleWZyYW1lRWZmZWN0LnNldEtleWZyYW1lcygpLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjc3NfcHJvcGVydHlfdG9fY2FtZWxjYXNlKHN0eWxlKSB7XG5cdC8vIGluIGNvbXBsaWFuY2Ugd2l0aCBzcGVjXG5cdGlmIChzdHlsZSA9PT0gJ2Zsb2F0JykgcmV0dXJuICdjc3NGbG9hdCc7XG5cdGlmIChzdHlsZSA9PT0gJ29mZnNldCcpIHJldHVybiAnY3NzT2Zmc2V0JztcblxuXHQvLyBkbyBub3QgcmVuYW1lIGN1c3RvbSBAcHJvcGVydGllc1xuXHRpZiAoc3R5bGUuc3RhcnRzV2l0aCgnLS0nKSkgcmV0dXJuIHN0eWxlO1xuXG5cdGNvbnN0IHBhcnRzID0gc3R5bGUuc3BsaXQoJy0nKTtcblx0aWYgKHBhcnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBhcnRzWzBdO1xuXHRyZXR1cm4gKFxuXHRcdHBhcnRzWzBdICtcblx0XHRwYXJ0c1xuXHRcdFx0LnNsaWNlKDEpXG5cdFx0XHQubWFwKC8qKiBAcGFyYW0ge2FueX0gd29yZCAqLyAod29yZCkgPT4gd29yZFswXS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKSlcblx0XHRcdC5qb2luKCcnKVxuXHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcbiAqIEByZXR1cm5zIHtLZXlmcmFtZX1cbiAqL1xuZnVuY3Rpb24gY3NzX3RvX2tleWZyYW1lKGNzcykge1xuXHQvKiogQHR5cGUge0tleWZyYW1lfSAqL1xuXHRjb25zdCBrZXlmcmFtZSA9IHt9O1xuXHRjb25zdCBwYXJ0cyA9IGNzcy5zcGxpdCgnOycpO1xuXHRmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcblx0XHRjb25zdCBbcHJvcGVydHksIHZhbHVlXSA9IHBhcnQuc3BsaXQoJzonKTtcblx0XHRpZiAoIXByb3BlcnR5IHx8IHZhbHVlID09PSB1bmRlZmluZWQpIGJyZWFrO1xuXG5cdFx0Y29uc3QgZm9ybWF0dGVkX3Byb3BlcnR5ID0gY3NzX3Byb3BlcnR5X3RvX2NhbWVsY2FzZShwcm9wZXJ0eS50cmltKCkpO1xuXHRcdGtleWZyYW1lW2Zvcm1hdHRlZF9wcm9wZXJ0eV0gPSB2YWx1ZS50cmltKCk7XG5cdH1cblx0cmV0dXJuIGtleWZyYW1lO1xufVxuXG4vKiogQHBhcmFtIHtudW1iZXJ9IHQgKi9cbmNvbnN0IGxpbmVhciA9ICh0KSA9PiB0O1xuXG4vKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5sZXQgYW5pbWF0aW9uX2VmZmVjdF9vdmVycmlkZSA9IG51bGw7XG5cbi8qKiBAcGFyYW0ge0VmZmVjdCB8IG51bGx9IHYgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYW5pbWF0aW9uX2VmZmVjdF9vdmVycmlkZSh2KSB7XG5cdGFuaW1hdGlvbl9lZmZlY3Rfb3ZlcnJpZGUgPSB2O1xufVxuXG4vKipcbiAqIENhbGxlZCBpbnNpZGUga2V5ZWQgYHsjZWFjaCAuLi59YCBibG9ja3MgKGFzIGAkLmFuaW1hdGlvbiguLi4pYCkuIFRoaXMgY3JlYXRlcyBhbiBhbmltYXRpb24gbWFuYWdlclxuICogYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBibG9jaywgc28gdGhhdCBtb3ZlcyBjYW4gYmUgYW5pbWF0ZWQgZm9sbG93aW5nIHJlY29uY2lsaWF0aW9uLlxuICogQHRlbXBsYXRlIFBcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHsoKSA9PiBBbmltYXRlRm48UCB8IHVuZGVmaW5lZD59IGdldF9mblxuICogQHBhcmFtIHsoKCkgPT4gUCkgfCBudWxsfSBnZXRfcGFyYW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRpb24oZWxlbWVudCwgZ2V0X2ZuLCBnZXRfcGFyYW1zKSB7XG5cdHZhciBlZmZlY3QgPSBhbmltYXRpb25fZWZmZWN0X292ZXJyaWRlID8/IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cdHZhciBub2RlcyA9IC8qKiBAdHlwZSB7RWZmZWN0Tm9kZXN9ICovIChlZmZlY3Qubm9kZXMpO1xuXG5cdC8qKiBAdHlwZSB7RE9NUmVjdH0gKi9cblx0dmFyIGZyb207XG5cblx0LyoqIEB0eXBlIHtET01SZWN0fSAqL1xuXHR2YXIgdG87XG5cblx0LyoqIEB0eXBlIHtBbmltYXRpb24gfCB1bmRlZmluZWR9ICovXG5cdHZhciBhbmltYXRpb247XG5cblx0LyoqIEB0eXBlIHtudWxsIHwgeyBwb3NpdGlvbjogc3RyaW5nLCB3aWR0aDogc3RyaW5nLCBoZWlnaHQ6IHN0cmluZywgdHJhbnNmb3JtOiBzdHJpbmcgfX0gKi9cblx0dmFyIG9yaWdpbmFsX3N0eWxlcyA9IG51bGw7XG5cblx0bm9kZXMuYSA/Pz0ge1xuXHRcdGVsZW1lbnQsXG5cdFx0bWVhc3VyZSgpIHtcblx0XHRcdGZyb20gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0fSxcblx0XHRhcHBseSgpIHtcblx0XHRcdGFuaW1hdGlvbj8uYWJvcnQoKTtcblxuXHRcdFx0dG8gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0ZnJvbS5sZWZ0ICE9PSB0by5sZWZ0IHx8XG5cdFx0XHRcdGZyb20ucmlnaHQgIT09IHRvLnJpZ2h0IHx8XG5cdFx0XHRcdGZyb20udG9wICE9PSB0by50b3AgfHxcblx0XHRcdFx0ZnJvbS5ib3R0b20gIT09IHRvLmJvdHRvbVxuXHRcdFx0KSB7XG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSBnZXRfZm4oKSh0aGlzLmVsZW1lbnQsIHsgZnJvbSwgdG8gfSwgZ2V0X3BhcmFtcz8uKCkpO1xuXG5cdFx0XHRcdGFuaW1hdGlvbiA9IGFuaW1hdGUoXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LFxuXHRcdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdDEsXG5cdFx0XHRcdFx0KCkgPT4ge30sXG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0YW5pbWF0aW9uPy5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0YW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGZpeCgpIHtcblx0XHRcdC8vIElmIGFuIGFuaW1hdGlvbiBpcyBhbHJlYWR5IHJ1bm5pbmcsIHRyYW5zZm9ybWluZyB0aGUgZWxlbWVudCBpcyBsaWtlbHkgdG8gZmFpbCxcblx0XHRcdC8vIGJlY2F1c2UgdGhlIHN0eWxlcyBhcHBsaWVkIGJ5IHRoZSBhbmltYXRpb24gdGFrZSBwcmVjZWRlbmNlLiBJbiB0aGUgY2FzZSBvZiBjcm9zc2ZhZGUsXG5cdFx0XHQvLyB0aGF0IG1lYW5zIHRoZSBgdHJhbnNsYXRlKC4uLilgIG9mIHRoZSBjcm9zc2ZhZGUgdHJhbnNpdGlvbiBvdmVycnVsZXMgdGhlIGB0cmFuc2xhdGUoLi4uKWBcblx0XHRcdC8vIHdlIHdvdWxkIGFwcGx5IGJlbG93LCBsZWFkaW5nIHRvIHRoZSBlbGVtZW50IGp1bXBpbmcgc29tZXdoZXJlIHRvIHRoZSB0b3AgbGVmdC5cblx0XHRcdGlmIChlbGVtZW50LmdldEFuaW1hdGlvbnMoKS5sZW5ndGgpIHJldHVybjtcblxuXHRcdFx0Ly8gSXQncyBpbXBvcnRhbnQgdG8gZGVzdHJ1Y3R1cmUgdGhlc2UgdG8gZ2V0IGZpeGVkIHZhbHVlcyAtIHRoZSBvYmplY3QgaXRzZWxmIGhhcyBnZXR0ZXJzLFxuXHRcdFx0Ly8gYW5kIGNoYW5naW5nIHRoZSBzdHlsZSB0byAnYWJzb2x1dGUnIGNhbiBmb3IgZXhhbXBsZSBpbmZsdWVuY2UgdGhlIHdpZHRoLlxuXHRcdFx0dmFyIHsgcG9zaXRpb24sIHdpZHRoLCBoZWlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cblx0XHRcdGlmIChwb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBwb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuXHRcdFx0XHR2YXIgc3R5bGUgPSAvKiogQHR5cGUge0hUTUxFbGVtZW50IHwgU1ZHRWxlbWVudH0gKi8gKGVsZW1lbnQpLnN0eWxlO1xuXG5cdFx0XHRcdG9yaWdpbmFsX3N0eWxlcyA9IHtcblx0XHRcdFx0XHRwb3NpdGlvbjogc3R5bGUucG9zaXRpb24sXG5cdFx0XHRcdFx0d2lkdGg6IHN0eWxlLndpZHRoLFxuXHRcdFx0XHRcdGhlaWdodDogc3R5bGUuaGVpZ2h0LFxuXHRcdFx0XHRcdHRyYW5zZm9ybTogc3R5bGUudHJhbnNmb3JtXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0XHRzdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XHRcdHZhciB0byA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0aWYgKGZyb20ubGVmdCAhPT0gdG8ubGVmdCB8fCBmcm9tLnRvcCAhPT0gdG8udG9wKSB7XG5cdFx0XHRcdFx0dmFyIHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtmcm9tLmxlZnQgLSB0by5sZWZ0fXB4LCAke2Zyb20udG9wIC0gdG8udG9wfXB4KWA7XG5cdFx0XHRcdFx0c3R5bGUudHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID8gYCR7c3R5bGUudHJhbnNmb3JtfSAke3RyYW5zZm9ybX1gIDogdHJhbnNmb3JtO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1bmZpeCgpIHtcblx0XHRcdGlmIChvcmlnaW5hbF9zdHlsZXMpIHtcblx0XHRcdFx0dmFyIHN0eWxlID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnR9ICovIChlbGVtZW50KS5zdHlsZTtcblxuXHRcdFx0XHRzdHlsZS5wb3NpdGlvbiA9IG9yaWdpbmFsX3N0eWxlcy5wb3NpdGlvbjtcblx0XHRcdFx0c3R5bGUud2lkdGggPSBvcmlnaW5hbF9zdHlsZXMud2lkdGg7XG5cdFx0XHRcdHN0eWxlLmhlaWdodCA9IG9yaWdpbmFsX3N0eWxlcy5oZWlnaHQ7XG5cdFx0XHRcdHN0eWxlLnRyYW5zZm9ybSA9IG9yaWdpbmFsX3N0eWxlcy50cmFuc2Zvcm07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8vIGluIHRoZSBjYXNlIG9mIGEgYDxzdmVsdGU6ZWxlbWVudD5gLCBpdCdzIHBvc3NpYmxlIGZvciBgJC5hbmltYXRpb24oLi4uKWAgdG8gYmUgY2FsbGVkXG5cdC8vIHdoZW4gYW4gYW5pbWF0aW9uIG1hbmFnZXIgYWxyZWFkeSBleGlzdHMsIGlmIHRoZSB0YWcgY2hhbmdlcy4gaW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvXG5cdC8vIHN3YXAgb3V0IHRoZSBlbGVtZW50IHJhdGhlciB0aGFuIGNyZWF0aW5nIGEgbmV3IG1hbmFnZXIsIGluIGNhc2UgaXQgaGFwcGVuZWQgYXQgdGhlIHNhbWVcblx0Ly8gbW9tZW50IGFzIGEgcmVjb25jaWxpYXRpb25cblx0bm9kZXMuYS5lbGVtZW50ID0gZWxlbWVudDtcbn1cblxuLyoqXG4gKiBDYWxsZWQgaW5zaWRlIGJsb2NrIGVmZmVjdHMgYXMgYCQudHJhbnNpdGlvbiguLi4pYC4gVGhpcyBjcmVhdGVzIGEgdHJhbnNpdGlvbiBtYW5hZ2VyIGFuZFxuICogYXR0YWNoZXMgaXQgdG8gdGhlIGN1cnJlbnQgZWZmZWN0IOKAlCBsYXRlciwgaW5zaWRlIGBwYXVzZV9lZmZlY3RgIGFuZCBgcmVzdW1lX2VmZmVjdGAsIHdlXG4gKiB1c2UgdGhpcyB0byBjcmVhdGUgYGludHJvYCBhbmQgYG91dHJvYCB0cmFuc2l0aW9ucy5cbiAqIEB0ZW1wbGF0ZSBQXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7KCkgPT4gVHJhbnNpdGlvbkZuPFAgfCB1bmRlZmluZWQ+fSBnZXRfZm5cbiAqIEBwYXJhbSB7KCgpID0+IFApIHwgbnVsbH0gZ2V0X3BhcmFtc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2l0aW9uKGZsYWdzLCBlbGVtZW50LCBnZXRfZm4sIGdldF9wYXJhbXMpIHtcblx0dmFyIGlzX2ludHJvID0gKGZsYWdzICYgVFJBTlNJVElPTl9JTikgIT09IDA7XG5cdHZhciBpc19vdXRybyA9IChmbGFncyAmIFRSQU5TSVRJT05fT1VUKSAhPT0gMDtcblx0dmFyIGlzX2JvdGggPSBpc19pbnRybyAmJiBpc19vdXRybztcblx0dmFyIGlzX2dsb2JhbCA9IChmbGFncyAmIFRSQU5TSVRJT05fR0xPQkFMKSAhPT0gMDtcblxuXHQvKiogQHR5cGUgeydpbicgfCAnb3V0JyB8ICdib3RoJ30gKi9cblx0dmFyIGRpcmVjdGlvbiA9IGlzX2JvdGggPyAnYm90aCcgOiBpc19pbnRybyA/ICdpbicgOiAnb3V0JztcblxuXHQvKiogQHR5cGUge0FuaW1hdGlvbkNvbmZpZyB8ICgob3B0czogeyBkaXJlY3Rpb246ICdpbicgfCAnb3V0JyB9KSA9PiBBbmltYXRpb25Db25maWcpIHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgY3VycmVudF9vcHRpb25zO1xuXG5cdHZhciBpbmVydCA9IGVsZW1lbnQuaW5lcnQ7XG5cblx0LyoqXG5cdCAqIFRoZSBkZWZhdWx0IG92ZXJmbG93IHN0eWxlLCBzdGFzaGVkIHNvIHdlIGNhbiByZXZlcnQgY2hhbmdlcyBkdXJpbmcgdGhlIHRyYW5zaXRpb25cblx0ICogdGhhdCBhcmUgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgU2FmYXJpIDwxOCBidWdcblx0ICogVE9ETyA2LjAgcmVtb3ZlIHRoaXMsIGlmIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBoYXZlIGRpZWQgb3V0IGVub3VnaFxuXHQgKi9cblx0dmFyIG92ZXJmbG93ID0gZWxlbWVudC5zdHlsZS5vdmVyZmxvdztcblxuXHQvKiogQHR5cGUge0FuaW1hdGlvbiB8IHVuZGVmaW5lZH0gKi9cblx0dmFyIGludHJvO1xuXG5cdC8qKiBAdHlwZSB7QW5pbWF0aW9uIHwgdW5kZWZpbmVkfSAqL1xuXHR2YXIgb3V0cm87XG5cblx0ZnVuY3Rpb24gZ2V0X29wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dCgoKSA9PiB7XG5cdFx0XHQvLyBJZiBhIHRyYW5zaXRpb24gaXMgc3RpbGwgb25nb2luZywgd2UgdXNlIHRoZSBleGlzdGluZyBvcHRpb25zIHJhdGhlciB0aGFuIGdlbmVyYXRpbmdcblx0XHRcdC8vIG5ldyBvbmVzLiBUaGlzIGVuc3VyZXMgdGhhdCByZXZlcnNpYmxlIHRyYW5zaXRpb25zIHJldmVyc2Ugc21vb3RobHksIHJhdGhlciB0aGFuXG5cdFx0XHQvLyBqdW1waW5nIHRvIGEgbmV3IHNwb3QgYmVjYXVzZSAoZm9yIGV4YW1wbGUpIGEgZGlmZmVyZW50IGBkdXJhdGlvbmAgd2FzIHVzZWRcblx0XHRcdHJldHVybiAoY3VycmVudF9vcHRpb25zID8/PSBnZXRfZm4oKShlbGVtZW50LCBnZXRfcGFyYW1zPy4oKSA/PyAvKiogQHR5cGUge1B9ICovICh7fSksIHtcblx0XHRcdFx0ZGlyZWN0aW9uXG5cdFx0XHR9KSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKiogQHR5cGUge1RyYW5zaXRpb25NYW5hZ2VyfSAqL1xuXHR2YXIgdHJhbnNpdGlvbiA9IHtcblx0XHRpc19nbG9iYWwsXG5cdFx0aW4oKSB7XG5cdFx0XHRlbGVtZW50LmluZXJ0ID0gaW5lcnQ7XG5cblx0XHRcdGlmICghaXNfaW50cm8pIHtcblx0XHRcdFx0b3V0cm8/LmFib3J0KCk7XG5cdFx0XHRcdG91dHJvPy5yZXNldD8uKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc19vdXRybykge1xuXHRcdFx0XHQvLyBpZiB3ZSBpbnRybyB0aGVuIG91dHJvIHRoZW4gaW50cm8gYWdhaW4sIHdlIHdhbnQgdG8gYWJvcnQgdGhlIGZpcnN0IGludHJvLFxuXHRcdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJpZGlyZWN0aW9uYWwgdHJhbnNpdGlvblxuXHRcdFx0XHRpbnRybz8uYWJvcnQoKTtcblx0XHRcdH1cblxuXHRcdFx0aW50cm8gPSBhbmltYXRlKFxuXHRcdFx0XHRlbGVtZW50LFxuXHRcdFx0XHRnZXRfb3B0aW9ucygpLFxuXHRcdFx0XHRvdXRybyxcblx0XHRcdFx0MSxcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGRpc3BhdGNoX2V2ZW50KGVsZW1lbnQsICdpbnRyb3N0YXJ0Jyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRkaXNwYXRjaF9ldmVudChlbGVtZW50LCAnaW50cm9lbmQnKTtcblxuXHRcdFx0XHRcdC8vIEVuc3VyZSB3ZSBjYW5jZWwgdGhlIGFuaW1hdGlvbiB0byBwcmV2ZW50IGxlYWtpbmdcblx0XHRcdFx0XHRpbnRybz8uYWJvcnQoKTtcblx0XHRcdFx0XHRpbnRybyA9IGN1cnJlbnRfb3B0aW9ucyA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBvdmVyZmxvdztcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdG91dChmbikge1xuXHRcdFx0aWYgKCFpc19vdXRybykge1xuXHRcdFx0XHRmbj8uKCk7XG5cdFx0XHRcdGN1cnJlbnRfb3B0aW9ucyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtZW50LmluZXJ0ID0gdHJ1ZTtcblxuXHRcdFx0b3V0cm8gPSBhbmltYXRlKFxuXHRcdFx0XHRlbGVtZW50LFxuXHRcdFx0XHRnZXRfb3B0aW9ucygpLFxuXHRcdFx0XHRpbnRybyxcblx0XHRcdFx0MCxcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdGRpc3BhdGNoX2V2ZW50KGVsZW1lbnQsICdvdXRyb3N0YXJ0Jyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRkaXNwYXRjaF9ldmVudChlbGVtZW50LCAnb3V0cm9lbmQnKTtcblx0XHRcdFx0XHRmbj8uKCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHRzdG9wOiAoKSA9PiB7XG5cdFx0XHRpbnRybz8uYWJvcnQoKTtcblx0XHRcdG91dHJvPy5hYm9ydCgpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZSA9IC8qKiBAdHlwZSB7RWZmZWN0ICYgeyBub2RlczogRWZmZWN0Tm9kZXMgfX0gKi8gKGFjdGl2ZV9lZmZlY3QpO1xuXG5cdChlLm5vZGVzLnQgPz89IFtdKS5wdXNoKHRyYW5zaXRpb24pO1xuXG5cdC8vIGlmIHRoaXMgaXMgYSBsb2NhbCB0cmFuc2l0aW9uLCB3ZSBvbmx5IHdhbnQgdG8gcnVuIGl0IGlmIHRoZSBwYXJlbnQgKGJyYW5jaCkgZWZmZWN0J3Ncblx0Ly8gcGFyZW50IChibG9jaykgZWZmZWN0IGlzIHdoZXJlIHRoZSBzdGF0ZSBjaGFuZ2UgaGFwcGVuZWQuIHdlIGNhbiBkZXRlcm1pbmUgdGhhdCBieVxuXHQvLyBsb29raW5nIGF0IHdoZXRoZXIgdGhlIGJsb2NrIGVmZmVjdCBpcyBjdXJyZW50bHkgaW5pdGlhbGl6aW5nXG5cdGlmIChpc19pbnRybyAmJiBzaG91bGRfaW50cm8pIHtcblx0XHR2YXIgcnVuID0gaXNfZ2xvYmFsO1xuXG5cdFx0aWYgKCFydW4pIHtcblx0XHRcdHZhciBibG9jayA9IC8qKiBAdHlwZSB7RWZmZWN0IHwgbnVsbH0gKi8gKGUucGFyZW50KTtcblxuXHRcdFx0Ly8gc2tpcCBvdmVyIHRyYW5zcGFyZW50IGJsb2NrcyAoZS5nLiBzbmlwcGV0cywgZWxzZS1pZiBibG9ja3MpXG5cdFx0XHR3aGlsZSAoYmxvY2sgJiYgKGJsb2NrLmYgJiBFRkZFQ1RfVFJBTlNQQVJFTlQpICE9PSAwKSB7XG5cdFx0XHRcdHdoaWxlICgoYmxvY2sgPSBibG9jay5wYXJlbnQpKSB7XG5cdFx0XHRcdFx0aWYgKChibG9jay5mICYgQkxPQ0tfRUZGRUNUKSAhPT0gMCkgYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cnVuID0gIWJsb2NrIHx8IChibG9jay5mICYgUkVBQ1RJT05fUkFOKSAhPT0gMDtcblx0XHR9XG5cblx0XHRpZiAocnVuKSB7XG5cdFx0XHRlZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHR1bnRyYWNrKCgpID0+IHRyYW5zaXRpb24uaW4oKSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBbmltYXRlcyBhbiBlbGVtZW50LCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtBbmltYXRpb25Db25maWcgfCAoKG9wdHM6IHsgZGlyZWN0aW9uOiAnaW4nIHwgJ291dCcgfSkgPT4gQW5pbWF0aW9uQ29uZmlnKX0gb3B0aW9uc1xuICogQHBhcmFtIHtBbmltYXRpb24gfCB1bmRlZmluZWR9IGNvdW50ZXJwYXJ0IFRoZSBjb3JyZXNwb25kaW5nIGludHJvL291dHJvIHRvIHRoaXMgb3V0cm8vaW50cm9cbiAqIEBwYXJhbSB7bnVtYmVyfSB0MiBUaGUgdGFyZ2V0IGB0YCB2YWx1ZSDigJQgYDFgIGZvciBpbnRybywgYDBgIGZvciBvdXRyb1xuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IG9uX2JlZ2luIENhbGxlZCBqdXN0IGJlZm9yZSBiZWdpbm5pbmcgdGhlIGFuaW1hdGlvblxuICogQHBhcmFtIHsoKCkgPT4gdm9pZCl9IG9uX2ZpbmlzaCBDYWxsZWQgYWZ0ZXIgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRpbmcgdGhlIGFuaW1hdGlvblxuICogQHJldHVybnMge0FuaW1hdGlvbn1cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShlbGVtZW50LCBvcHRpb25zLCBjb3VudGVycGFydCwgdDIsIG9uX2JlZ2luLCBvbl9maW5pc2gpIHtcblx0dmFyIGlzX2ludHJvID0gdDIgPT09IDE7XG5cblx0aWYgKGlzX2Z1bmN0aW9uKG9wdGlvbnMpKSB7XG5cdFx0Ly8gSW4gdGhlIGNhc2Ugb2YgYSBkZWZlcnJlZCB0cmFuc2l0aW9uIChzdWNoIGFzIGBjcm9zc2ZhZGVgKSwgYG9wdGlvbmAgd2lsbCBiZVxuXHRcdC8vIGEgZnVuY3Rpb24gcmF0aGVyIHRoYW4gYW4gYEFuaW1hdGlvbkNvbmZpZ2AuIFdlIG5lZWQgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uXG5cdFx0Ly8gb25jZSB0aGUgRE9NIGhhcyBiZWVuIHVwZGF0ZWQuLi5cblx0XHQvKiogQHR5cGUge0FuaW1hdGlvbn0gKi9cblx0XHR2YXIgYTtcblx0XHR2YXIgYWJvcnRlZCA9IGZhbHNlO1xuXG5cdFx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0XHRpZiAoYWJvcnRlZCkgcmV0dXJuO1xuXHRcdFx0dmFyIG8gPSBvcHRpb25zKHsgZGlyZWN0aW9uOiBpc19pbnRybyA/ICdpbicgOiAnb3V0JyB9KTtcblx0XHRcdGEgPSBhbmltYXRlKGVsZW1lbnQsIG8sIGNvdW50ZXJwYXJ0LCB0Miwgb25fYmVnaW4sIG9uX2ZpbmlzaCk7XG5cdFx0fSk7XG5cblx0XHQvLyAuLi5idXQgd2Ugd2FudCB0byBkbyBzbyB3aXRob3V0IHVzaW5nIGBhc3luY2AvYGF3YWl0YCBldmVyeXdoZXJlLCBzb1xuXHRcdC8vIHdlIHJldHVybiBhIGZhY2FkZSB0aGF0IGFsbG93cyBldmVyeXRoaW5nIHRvIHJlbWFpbiBzeW5jaHJvbm91c1xuXHRcdHJldHVybiB7XG5cdFx0XHRhYm9ydDogKCkgPT4ge1xuXHRcdFx0XHRhYm9ydGVkID0gdHJ1ZTtcblx0XHRcdFx0YT8uYWJvcnQoKTtcblx0XHRcdH0sXG5cdFx0XHRkZWFjdGl2YXRlOiAoKSA9PiBhLmRlYWN0aXZhdGUoKSxcblx0XHRcdHJlc2V0OiAoKSA9PiBhLnJlc2V0KCksXG5cdFx0XHR0OiAoKSA9PiBhLnQoKVxuXHRcdH07XG5cdH1cblxuXHRjb3VudGVycGFydD8uZGVhY3RpdmF0ZSgpO1xuXG5cdGlmICghb3B0aW9ucz8uZHVyYXRpb24gJiYgIW9wdGlvbnM/LmRlbGF5KSB7XG5cdFx0b25fYmVnaW4oKTtcblx0XHRvbl9maW5pc2goKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRhYm9ydDogbm9vcCxcblx0XHRcdGRlYWN0aXZhdGU6IG5vb3AsXG5cdFx0XHRyZXNldDogbm9vcCxcblx0XHRcdHQ6ICgpID0+IHQyXG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IHsgZGVsYXkgPSAwLCBjc3MsIHRpY2ssIGVhc2luZyA9IGxpbmVhciB9ID0gb3B0aW9ucztcblxuXHR2YXIga2V5ZnJhbWVzID0gW107XG5cblx0aWYgKGlzX2ludHJvICYmIGNvdW50ZXJwYXJ0ID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAodGljaykge1xuXHRcdFx0dGljaygwLCAxKTsgLy8gVE9ETyBwdXQgaW4gbmVzdGVkIGVmZmVjdCwgdG8gYXZvaWQgaW50ZXJsZWF2ZWQgcmVhZHMvd3JpdGVzP1xuXHRcdH1cblxuXHRcdGlmIChjc3MpIHtcblx0XHRcdHZhciBzdHlsZXMgPSBjc3NfdG9fa2V5ZnJhbWUoY3NzKDAsIDEpKTtcblx0XHRcdGtleWZyYW1lcy5wdXNoKHN0eWxlcywgc3R5bGVzKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgZ2V0X3QgPSAoKSA9PiAxIC0gdDI7XG5cblx0Ly8gY3JlYXRlIGEgZHVtbXkgYW5pbWF0aW9uIHRoYXQgbGFzdHMgYXMgbG9uZyBhcyB0aGUgZGVsYXkgKGJ1dCB3aXRoIHdoYXRldmVyIGRldnRvb2xzXG5cdC8vIG11bHRpcGxpZXIgaXMgaW4gZWZmZWN0KS4gaW4gdGhlIGNvbW1vbiBjYXNlIHRoYXQgaXQgaXMgYDBgLCB3ZSBrZWVwIGl0IGFueXdheSBzbyB0aGF0XG5cdC8vIHRoZSBDU1Mga2V5ZnJhbWVzIGFyZW4ndCBjcmVhdGVkIHVudGlsIHRoZSBET00gaXMgdXBkYXRlZFxuXHQvL1xuXHQvLyBmaWxsIGZvcndhcmRzIHRvIHByZXZlbnQgdGhlIGVsZW1lbnQgZnJvbSByZW5kZXJpbmcgd2l0aG91dCBzdHlsZXMgYXBwbGllZFxuXHQvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9pc3N1ZXMvMTQ3MzJcblx0dmFyIGFuaW1hdGlvbiA9IGVsZW1lbnQuYW5pbWF0ZShrZXlmcmFtZXMsIHsgZHVyYXRpb246IGRlbGF5LCBmaWxsOiAnZm9yd2FyZHMnIH0pO1xuXG5cdGFuaW1hdGlvbi5vbmZpbmlzaCA9ICgpID0+IHtcblx0XHQvLyByZW1vdmUgZHVtbXkgYW5pbWF0aW9uIGZyb20gdGhlIHN0YWNrIHRvIHByZXZlbnQgY29uZmxpY3Qgd2l0aCBtYWluIGFuaW1hdGlvblxuXHRcdGFuaW1hdGlvbi5jYW5jZWwoKTtcblxuXHRcdG9uX2JlZ2luKCk7XG5cblx0XHQvLyBmb3IgYmlkaXJlY3Rpb25hbCB0cmFuc2l0aW9ucywgd2Ugc3RhcnQgZnJvbSB0aGUgY3VycmVudCBwb3NpdGlvbixcblx0XHQvLyByYXRoZXIgdGhhbiBkb2luZyBhIGZ1bGwgaW50cm8vb3V0cm9cblx0XHR2YXIgdDEgPSBjb3VudGVycGFydD8udCgpID8/IDEgLSB0Mjtcblx0XHRjb3VudGVycGFydD8uYWJvcnQoKTtcblxuXHRcdHZhciBkZWx0YSA9IHQyIC0gdDE7XG5cdFx0dmFyIGR1cmF0aW9uID0gLyoqIEB0eXBlIHtudW1iZXJ9ICovIChvcHRpb25zLmR1cmF0aW9uKSAqIE1hdGguYWJzKGRlbHRhKTtcblx0XHR2YXIga2V5ZnJhbWVzID0gW107XG5cblx0XHRpZiAoZHVyYXRpb24gPiAwKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBDU1MgaW5jbHVkZXMgYG92ZXJmbG93OiBoaWRkZW5gLCBpbiB3aGljaCBjYXNlIHdlIG5lZWQgdG9cblx0XHRcdCAqIGFkZCBpdCBhcyBhbiBpbmxpbmUgc3R5bGUgdG8gd29yayBhcm91bmQgYSBTYWZhcmkgPDE4IGJ1Z1xuXHRcdFx0ICogVE9ETyA2LjAgcmVtb3ZlIHRoaXMsIGlmIHBvc3NpYmxlXG5cdFx0XHQgKi9cblx0XHRcdHZhciBuZWVkc19vdmVyZmxvd19oaWRkZW4gPSBmYWxzZTtcblxuXHRcdFx0aWYgKGNzcykge1xuXHRcdFx0XHR2YXIgbiA9IE1hdGguY2VpbChkdXJhdGlvbiAvICgxMDAwIC8gNjApKTsgLy8gYG5gIG11c3QgYmUgYW4gaW50ZWdlciwgb3Igd2UgcmlzayBtaXNzaW5nIHRoZSBgdDJgIHZhbHVlXG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSArPSAxKSB7XG5cdFx0XHRcdFx0dmFyIHQgPSB0MSArIGRlbHRhICogZWFzaW5nKGkgLyBuKTtcblx0XHRcdFx0XHR2YXIgc3R5bGVzID0gY3NzX3RvX2tleWZyYW1lKGNzcyh0LCAxIC0gdCkpO1xuXHRcdFx0XHRcdGtleWZyYW1lcy5wdXNoKHN0eWxlcyk7XG5cblx0XHRcdFx0XHRuZWVkc19vdmVyZmxvd19oaWRkZW4gfHw9IHN0eWxlcy5vdmVyZmxvdyA9PT0gJ2hpZGRlbic7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG5lZWRzX292ZXJmbG93X2hpZGRlbikge1xuXHRcdFx0XHQvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAoZWxlbWVudCkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHRcdH1cblxuXHRcdFx0Z2V0X3QgPSAoKSA9PiB7XG5cdFx0XHRcdHZhciB0aW1lID0gLyoqIEB0eXBlIHtudW1iZXJ9ICovIChcblx0XHRcdFx0XHQvKiogQHR5cGUge2dsb2JhbFRoaXMuQW5pbWF0aW9ufSAqLyAoYW5pbWF0aW9uKS5jdXJyZW50VGltZVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHJldHVybiB0MSArIGRlbHRhICogZWFzaW5nKHRpbWUgLyBkdXJhdGlvbik7XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAodGljaykge1xuXHRcdFx0XHRsb29wKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoYW5pbWF0aW9uLnBsYXlTdGF0ZSAhPT0gJ3J1bm5pbmcnKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0XHR2YXIgdCA9IGdldF90KCk7XG5cdFx0XHRcdFx0dGljayh0LCAxIC0gdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YW5pbWF0aW9uID0gZWxlbWVudC5hbmltYXRlKGtleWZyYW1lcywgeyBkdXJhdGlvbiwgZmlsbDogJ2ZvcndhcmRzJyB9KTtcblxuXHRcdGFuaW1hdGlvbi5vbmZpbmlzaCA9ICgpID0+IHtcblx0XHRcdGdldF90ID0gKCkgPT4gdDI7XG5cdFx0XHR0aWNrPy4odDIsIDEgLSB0Mik7XG5cdFx0XHRvbl9maW5pc2goKTtcblx0XHR9O1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0YWJvcnQ6ICgpID0+IHtcblx0XHRcdGlmIChhbmltYXRpb24pIHtcblx0XHRcdFx0YW5pbWF0aW9uLmNhbmNlbCgpO1xuXHRcdFx0XHQvLyBUaGlzIHByZXZlbnRzIG1lbW9yeSBsZWFrcyBpbiBDaHJvbWl1bVxuXHRcdFx0XHRhbmltYXRpb24uZWZmZWN0ID0gbnVsbDtcblx0XHRcdFx0Ly8gVGhpcyBwcmV2ZW50cyBvbmZpbmlzaCB0byBiZSBsYXVuY2hlZCBhZnRlciBjYW5jZWwoKSxcblx0XHRcdFx0Ly8gd2hpY2ggY2FuIGhhcHBlbiBpbiBzb21lIHJhcmUgY2FzZXNcblx0XHRcdFx0Ly8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzEzNjgxXG5cdFx0XHRcdGFuaW1hdGlvbi5vbmZpbmlzaCA9IG5vb3A7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkZWFjdGl2YXRlOiAoKSA9PiB7XG5cdFx0XHRvbl9maW5pc2ggPSBub29wO1xuXHRcdH0sXG5cdFx0cmVzZXQ6ICgpID0+IHtcblx0XHRcdGlmICh0MiA9PT0gMCkge1xuXHRcdFx0XHR0aWNrPy4oMSwgMCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0OiAoKSA9PiBnZXRfdCgpXG5cdH07XG59XG4iLCIvKiogQGltcG9ydCB7IEVmZmVjdCwgRWZmZWN0Tm9kZXMsIFRlbXBsYXRlTm9kZSB9IGZyb20gJyNjbGllbnQnICovXG5pbXBvcnQgeyBGSUxFTkFNRSwgTkFNRVNQQUNFX1NWRyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQge1xuXHRoeWRyYXRlX25leHQsXG5cdGh5ZHJhdGVfbm9kZSxcblx0aHlkcmF0aW5nLFxuXHRzZXRfaHlkcmF0ZV9ub2RlLFxuXHRzZXRfaHlkcmF0aW5nXG59IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZWxlbWVudCwgY3JlYXRlX3RleHQsIGdldF9maXJzdF9jaGlsZCB9IGZyb20gJy4uL29wZXJhdGlvbnMuanMnO1xuaW1wb3J0IHsgYmxvY2ssIHRlYXJkb3duIH0gZnJvbSAnLi4vLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IHNldF9zaG91bGRfaW50cm8gfSBmcm9tICcuLi8uLi9yZW5kZXIuanMnO1xuaW1wb3J0IHsgYWN0aXZlX2VmZmVjdCB9IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQsIGRldl9zdGFjayB9IGZyb20gJy4uLy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBFRkZFQ1RfVFJBTlNQQVJFTlQsIEVMRU1FTlRfTk9ERSB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IGFzc2lnbl9ub2RlcyB9IGZyb20gJy4uL3RlbXBsYXRlLmpzJztcbmltcG9ydCB7IGlzX3Jhd190ZXh0X2VsZW1lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgeyBCcmFuY2hNYW5hZ2VyIH0gZnJvbSAnLi9icmFuY2hlcy5qcyc7XG5pbXBvcnQgeyBzZXRfYW5pbWF0aW9uX2VmZmVjdF9vdmVycmlkZSB9IGZyb20gJy4uL2VsZW1lbnRzL3RyYW5zaXRpb25zLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0NvbW1lbnQgfCBFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0geygpID0+IHN0cmluZ30gZ2V0X3RhZ1xuICogQHBhcmFtIHtib29sZWFufSBpc19zdmdcbiAqIEBwYXJhbSB7dW5kZWZpbmVkIHwgKChlbGVtZW50OiBFbGVtZW50LCBhbmNob3I6IE5vZGUgfCBudWxsKSA9PiB2b2lkKX0gcmVuZGVyX2ZuLFxuICogQHBhcmFtIHt1bmRlZmluZWQgfCAoKCkgPT4gc3RyaW5nKX0gZ2V0X25hbWVzcGFjZVxuICogQHBhcmFtIHt1bmRlZmluZWQgfCBbbnVtYmVyLCBudW1iZXJdfSBsb2NhdGlvblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50KG5vZGUsIGdldF90YWcsIGlzX3N2ZywgcmVuZGVyX2ZuLCBnZXRfbmFtZXNwYWNlLCBsb2NhdGlvbikge1xuXHRsZXQgd2FzX2h5ZHJhdGluZyA9IGh5ZHJhdGluZztcblxuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0aHlkcmF0ZV9uZXh0KCk7XG5cdH1cblxuXHR2YXIgZmlsZW5hbWUgPSBERVYgJiYgbG9jYXRpb24gJiYgY29tcG9uZW50X2NvbnRleHQ/LmZ1bmN0aW9uW0ZJTEVOQU1FXTtcblxuXHQvKiogQHR5cGUge251bGwgfCBFbGVtZW50fSAqL1xuXHR2YXIgZWxlbWVudCA9IG51bGw7XG5cblx0aWYgKGh5ZHJhdGluZyAmJiBoeWRyYXRlX25vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuXHRcdGVsZW1lbnQgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChoeWRyYXRlX25vZGUpO1xuXHRcdGh5ZHJhdGVfbmV4dCgpO1xuXHR9XG5cblx0dmFyIGFuY2hvciA9IC8qKiBAdHlwZSB7VGVtcGxhdGVOb2RlfSAqLyAoaHlkcmF0aW5nID8gaHlkcmF0ZV9ub2RlIDogbm9kZSk7XG5cblx0LyoqXG5cdCAqIFdlIHRyYWNrIHRoaXMgc28gd2UgY2FuIHNldCBpdCB3aGVuIGNoYW5naW5nIHRoZSBlbGVtZW50LCBhbGxvd2luZyBhbnlcblx0ICogYGFuaW1hdGU6YCBkaXJlY3RpdmUgdG8gYmluZCBpdHNlbGYgdG8gdGhlIGNvcnJlY3QgYmxvY2tcblx0ICovXG5cdHZhciBwYXJlbnRfZWZmZWN0ID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHR2YXIgYnJhbmNoZXMgPSBuZXcgQnJhbmNoTWFuYWdlcihhbmNob3IsIGZhbHNlKTtcblxuXHRibG9jaygoKSA9PiB7XG5cdFx0Y29uc3QgbmV4dF90YWcgPSBnZXRfdGFnKCkgfHwgbnVsbDtcblx0XHR2YXIgbnMgPSBnZXRfbmFtZXNwYWNlXG5cdFx0XHQ/IGdldF9uYW1lc3BhY2UoKVxuXHRcdFx0OiBpc19zdmcgfHwgbmV4dF90YWcgPT09ICdzdmcnXG5cdFx0XHRcdD8gTkFNRVNQQUNFX1NWR1xuXHRcdFx0XHQ6IHVuZGVmaW5lZDtcblxuXHRcdGlmIChuZXh0X3RhZyA9PT0gbnVsbCkge1xuXHRcdFx0YnJhbmNoZXMuZW5zdXJlKG51bGwsIG51bGwpO1xuXHRcdFx0c2V0X3Nob3VsZF9pbnRybyh0cnVlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRicmFuY2hlcy5lbnN1cmUobmV4dF90YWcsIChhbmNob3IpID0+IHtcblx0XHRcdGlmIChuZXh0X3RhZykge1xuXHRcdFx0XHRlbGVtZW50ID0gaHlkcmF0aW5nID8gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZWxlbWVudCkgOiBjcmVhdGVfZWxlbWVudChuZXh0X3RhZywgbnMpO1xuXG5cdFx0XHRcdGlmIChERVYgJiYgbG9jYXRpb24pIHtcblx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRcdFx0ZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuXHRcdFx0XHRcdFx0cGFyZW50OiBkZXZfc3RhY2ssXG5cdFx0XHRcdFx0XHRsb2M6IHtcblx0XHRcdFx0XHRcdFx0ZmlsZTogZmlsZW5hbWUsXG5cdFx0XHRcdFx0XHRcdGxpbmU6IGxvY2F0aW9uWzBdLFxuXHRcdFx0XHRcdFx0XHRjb2x1bW46IGxvY2F0aW9uWzFdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFzc2lnbl9ub2RlcyhlbGVtZW50LCBlbGVtZW50KTtcblxuXHRcdFx0XHRpZiAocmVuZGVyX2ZuKSB7XG5cdFx0XHRcdFx0dmFyIHRtcF9jb21tZW50ID0gbnVsbDtcblxuXHRcdFx0XHRcdGlmIChoeWRyYXRpbmcgJiYgaXNfcmF3X3RleHRfZWxlbWVudChuZXh0X3RhZykpIHtcblx0XHRcdFx0XHRcdC8vIHByZXZlbnQgaHlkcmF0aW9uIGdsaXRjaGVzIChjb2RlIGp1c3QgYmVsb3cgZXhwZWN0cyBhbiBhbmNob3IpXG5cdFx0XHRcdFx0XHRlbGVtZW50LmFwcGVuZCgodG1wX2NvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKSkpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIElmIGh5ZHJhdGluZywgdXNlIHRoZSBleGlzdGluZyBzc3IgY29tbWVudCBhcyB0aGUgYW5jaG9yIHNvIHRoYXQgdGhlXG5cdFx0XHRcdFx0Ly8gaW5uZXIgb3BlbiBhbmQgY2xvc2UgbWV0aG9kcyBjYW4gcGljayB1cCB0aGUgZXhpc3Rpbmcgbm9kZXMgY29ycmVjdGx5XG5cdFx0XHRcdFx0dmFyIGNoaWxkX2FuY2hvciA9IGh5ZHJhdGluZ1xuXHRcdFx0XHRcdFx0PyBnZXRfZmlyc3RfY2hpbGQoZWxlbWVudClcblx0XHRcdFx0XHRcdDogZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVfdGV4dCgpKTtcblxuXHRcdFx0XHRcdGlmIChoeWRyYXRpbmcpIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZF9hbmNob3IgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKGNoaWxkX2FuY2hvcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2V0X2FuaW1hdGlvbl9lZmZlY3Rfb3ZlcnJpZGUocGFyZW50X2VmZmVjdCk7XG5cblx0XHRcdFx0XHQvLyBgY2hpbGRfYW5jaG9yYCBpcyB1bmRlZmluZWQgaWYgdGhpcyBpcyBhIHZvaWQgZWxlbWVudCwgYnV0IHdlIHN0aWxsXG5cdFx0XHRcdFx0Ly8gbmVlZCB0byBjYWxsIGByZW5kZXJfZm5gIGluIG9yZGVyIHRvIHJ1biBhY3Rpb25zIGV0Yy4gSWYgdGhlIGVsZW1lbnRcblx0XHRcdFx0XHQvLyBjb250YWlucyBjaGlsZHJlbiwgaXQncyBhIHVzZXIgZXJyb3IgKHdoaWNoIGlzIHdhcm5lZCBvbiBlbHNld2hlcmUpXG5cdFx0XHRcdFx0Ly8gYW5kIHRoZSBET00gd2lsbCBiZSBzaWxlbnRseSBkaXNjYXJkZWRcblx0XHRcdFx0XHRyZW5kZXJfZm4oZWxlbWVudCwgY2hpbGRfYW5jaG9yKTtcblx0XHRcdFx0XHR0bXBfY29tbWVudD8ucmVtb3ZlKCk7XG5cdFx0XHRcdFx0c2V0X2FuaW1hdGlvbl9lZmZlY3Rfb3ZlcnJpZGUobnVsbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB3ZSBkbyB0aGlzIGFmdGVyIGNhbGxpbmcgYHJlbmRlcl9mbmAgc28gdGhhdCBjaGlsZCBlZmZlY3RzIGRvbid0IG92ZXJyaWRlIGBub2Rlcy5lbmRgXG5cdFx0XHRcdC8qKiBAdHlwZSB7RWZmZWN0ICYgeyBub2RlczogRWZmZWN0Tm9kZXMgfX0gKi8gKGFjdGl2ZV9lZmZlY3QpLm5vZGVzLmVuZCA9IGVsZW1lbnQ7XG5cblx0XHRcdFx0YW5jaG9yLmJlZm9yZShlbGVtZW50KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGh5ZHJhdGluZykge1xuXHRcdFx0XHRzZXRfaHlkcmF0ZV9ub2RlKGFuY2hvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyByZXZlcnQgdG8gdGhlIGRlZmF1bHQgc3RhdGUgYWZ0ZXIgdGhlIGVmZmVjdCBoYXMgYmVlbiBjcmVhdGVkXG5cdFx0c2V0X3Nob3VsZF9pbnRybyh0cnVlKTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRpZiAobmV4dF90YWcpIHtcblx0XHRcdFx0Ly8gaWYgd2UncmUgaW4gdGhpcyBjYWxsYmFjayBiZWNhdXNlIHdlJ3JlIHJlLXJ1bm5pbmcgdGhlIGVmZmVjdCxcblx0XHRcdFx0Ly8gZGlzYWJsZSBpbnRyb3MgKHVubGVzcyBubyBlbGVtZW50IGlzIGN1cnJlbnRseSBkaXNwbGF5ZWQpXG5cdFx0XHRcdHNldF9zaG91bGRfaW50cm8oZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0sIEVGRkVDVF9UUkFOU1BBUkVOVCk7XG5cblx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdHNldF9zaG91bGRfaW50cm8odHJ1ZSk7XG5cdH0pO1xuXG5cdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0XHRzZXRfaHlkcmF0ZV9ub2RlKGFuY2hvcik7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgVGVtcGxhdGVOb2RlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGh5ZHJhdGVfbm9kZSwgaHlkcmF0aW5nLCBzZXRfaHlkcmF0ZV9ub2RlLCBzZXRfaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGNyZWF0ZV90ZXh0LCBnZXRfZmlyc3RfY2hpbGQsIGdldF9uZXh0X3NpYmxpbmcgfSBmcm9tICcuLi9vcGVyYXRpb25zLmpzJztcbmltcG9ydCB7IGJsb2NrLCBicmFuY2ggfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgQ09NTUVOVF9OT0RFLCBIRUFEX0VGRkVDVCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICogQHBhcmFtIHsoYW5jaG9yOiBOb2RlKSA9PiB2b2lkfSByZW5kZXJfZm5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhZChoYXNoLCByZW5kZXJfZm4pIHtcblx0Ly8gVGhlIGhlYWQgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciB0aGUgZmlyc3QgaHlkcmF0aW9uIHBhc3MgYW5kIHNzciBjb21tZW50IG5vZGVzIG1heSBzdGlsbCBiZSBwcmVzZW50LFxuXHQvLyB0aGVyZWZvcmUgd2UgbmVlZCB0byBza2lwIHRoYXQgd2hlbiB3ZSBkZXRlY3QgdGhhdCB3ZSdyZSBub3QgaW4gaHlkcmF0aW9uIG1vZGUuXG5cdGxldCBwcmV2aW91c19oeWRyYXRlX25vZGUgPSBudWxsO1xuXHRsZXQgd2FzX2h5ZHJhdGluZyA9IGh5ZHJhdGluZztcblxuXHQvKiogQHR5cGUge0NvbW1lbnQgfCBUZXh0fSAqL1xuXHR2YXIgYW5jaG9yO1xuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRwcmV2aW91c19oeWRyYXRlX25vZGUgPSBoeWRyYXRlX25vZGU7XG5cblx0XHR2YXIgaGVhZF9hbmNob3IgPSBnZXRfZmlyc3RfY2hpbGQoZG9jdW1lbnQuaGVhZCk7XG5cblx0XHQvLyBUaGVyZSBtaWdodCBiZSBtdWx0aXBsZSBoZWFkIGJsb2NrcyBpbiBvdXIgYXBwLCBhbmQgdGhleSBjb3VsZCBoYXZlIGJlZW5cblx0XHQvLyByZW5kZXJlZCBpbiBhbiBhcmJpdHJhcnkgb3JkZXIg4oCUIGZpbmQgb25lIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBjb21wb25lbnRcblx0XHR3aGlsZSAoXG5cdFx0XHRoZWFkX2FuY2hvciAhPT0gbnVsbCAmJlxuXHRcdFx0KGhlYWRfYW5jaG9yLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUgfHwgLyoqIEB0eXBlIHtDb21tZW50fSAqLyAoaGVhZF9hbmNob3IpLmRhdGEgIT09IGhhc2gpXG5cdFx0KSB7XG5cdFx0XHRoZWFkX2FuY2hvciA9IGdldF9uZXh0X3NpYmxpbmcoaGVhZF9hbmNob3IpO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGNhbid0IGZpbmQgYW4gb3BlbmluZyBoeWRyYXRpb24gbWFya2VyLCBza2lwIGh5ZHJhdGlvbiAodGhpcyBjYW4gaGFwcGVuXG5cdFx0Ly8gaWYgYSBmcmFtZXdvcmsgcmVuZGVyZWQgYm9keSBidXQgbm90IGhlYWQgY29udGVudClcblx0XHRpZiAoaGVhZF9hbmNob3IgPT09IG51bGwpIHtcblx0XHRcdHNldF9oeWRyYXRpbmcoZmFsc2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgc3RhcnQgPSAvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKGdldF9uZXh0X3NpYmxpbmcoaGVhZF9hbmNob3IpKTtcblx0XHRcdGhlYWRfYW5jaG9yLnJlbW92ZSgpOyAvLyBpbiBjYXNlIHRoaXMgY29tcG9uZW50IGlzIHJlcGVhdGVkXG5cblx0XHRcdHNldF9oeWRyYXRlX25vZGUoc3RhcnQpO1xuXHRcdH1cblx0fVxuXG5cdGlmICghaHlkcmF0aW5nKSB7XG5cdFx0YW5jaG9yID0gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjcmVhdGVfdGV4dCgpKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0YmxvY2soKCkgPT4ge1xuXHRcdFx0dmFyIGUgPSBicmFuY2goKCkgPT4gcmVuZGVyX2ZuKGFuY2hvcikpO1xuXHRcdFx0ZS5mIHw9IEhFQURfRUZGRUNUO1xuXHRcdH0pO1xuXHR9IGZpbmFsbHkge1xuXHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRzZXRfaHlkcmF0aW5nKHRydWUpO1xuXHRcdFx0c2V0X2h5ZHJhdGVfbm9kZSgvKiogQHR5cGUge1RlbXBsYXRlTm9kZX0gKi8gKHByZXZpb3VzX2h5ZHJhdGVfbm9kZSkpO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyByZWdpc3Rlcl9zdHlsZSB9IGZyb20gJy4uL2Rldi9jc3MuanMnO1xuaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnLi4vcmVhY3Rpdml0eS9lZmZlY3RzLmpzJztcbmltcG9ydCB7IGNyZWF0ZV9lbGVtZW50IH0gZnJvbSAnLi9vcGVyYXRpb25zLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IGFuY2hvclxuICogQHBhcmFtIHt7IGhhc2g6IHN0cmluZywgY29kZTogc3RyaW5nIH19IGNzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyhhbmNob3IsIGNzcykge1xuXHQvLyBVc2UgYHF1ZXVlX21pY3JvX3Rhc2tgIHRvIGVuc3VyZSBgYW5jaG9yYCBpcyBpbiB0aGUgRE9NLCBvdGhlcndpc2UgZ2V0Um9vdE5vZGUoKSB3aWxsIHlpZWxkIHdyb25nIHJlc3VsdHNcblx0ZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgcm9vdCA9IGFuY2hvci5nZXRSb290Tm9kZSgpO1xuXG5cdFx0dmFyIHRhcmdldCA9IC8qKiBAdHlwZSB7U2hhZG93Um9vdH0gKi8gKHJvb3QpLmhvc3Rcblx0XHRcdD8gLyoqIEB0eXBlIHtTaGFkb3dSb290fSAqLyAocm9vdClcblx0XHRcdDogLyoqIEB0eXBlIHtEb2N1bWVudH0gKi8gKHJvb3QpLmhlYWQgPz8gLyoqIEB0eXBlIHtEb2N1bWVudH0gKi8gKHJvb3Qub3duZXJEb2N1bWVudCkuaGVhZDtcblxuXHRcdC8vIEFsd2F5cyBxdWVyeWluZyB0aGUgRE9NIGlzIHJvdWdobHkgdGhlIHNhbWUgcGVyZiBhcyBhZGRpdGlvbmFsbHkgY2hlY2tpbmcgZm9yIHByZXNlbmNlIGluIGEgbWFwIGZpcnN0IGFzc3VtaW5nXG5cdFx0Ly8gdGhhdCB5b3UnbGwgZ2V0IGNhY2hlIGhpdHMgaGFsZiBvZiB0aGUgdGltZSwgc28gd2UganVzdCBhbHdheXMgcXVlcnkgdGhlIGRvbSBmb3Igc2ltcGxpY2l0eSBhbmQgY29kZSBzYXZpbmdzLlxuXHRcdGlmICghdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY3NzLmhhc2gpKSB7XG5cdFx0XHRjb25zdCBzdHlsZSA9IGNyZWF0ZV9lbGVtZW50KCdzdHlsZScpO1xuXHRcdFx0c3R5bGUuaWQgPSBjc3MuaGFzaDtcblx0XHRcdHN0eWxlLnRleHRDb250ZW50ID0gY3NzLmNvZGU7XG5cblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cblx0XHRcdGlmIChERVYpIHtcblx0XHRcdFx0cmVnaXN0ZXJfc3R5bGUoY3NzLmhhc2gsIHN0eWxlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBBY3Rpb25QYXlsb2FkIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGVmZmVjdCwgcmVuZGVyX2VmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBzYWZlX25vdF9lcXVhbCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZXF1YWxpdHkuanMnO1xuaW1wb3J0IHsgZGVlcF9yZWFkX3N0YXRlLCB1bnRyYWNrIH0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5cbi8qKlxuICogQHRlbXBsYXRlIFBcbiAqIEBwYXJhbSB7RWxlbWVudH0gZG9tXG4gKiBAcGFyYW0geyhkb206IEVsZW1lbnQsIHZhbHVlPzogUCkgPT4gQWN0aW9uUGF5bG9hZDxQPn0gYWN0aW9uXG4gKiBAcGFyYW0geygpID0+IFB9IFtnZXRfdmFsdWVdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihkb20sIGFjdGlvbiwgZ2V0X3ZhbHVlKSB7XG5cdGVmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHBheWxvYWQgPSB1bnRyYWNrKCgpID0+IGFjdGlvbihkb20sIGdldF92YWx1ZT8uKCkpIHx8IHt9KTtcblxuXHRcdGlmIChnZXRfdmFsdWUgJiYgcGF5bG9hZD8udXBkYXRlKSB7XG5cdFx0XHR2YXIgaW5pdGVkID0gZmFsc2U7XG5cdFx0XHQvKiogQHR5cGUge1B9ICovXG5cdFx0XHR2YXIgcHJldiA9IC8qKiBAdHlwZSB7YW55fSAqLyAoe30pOyAvLyBpbml0aWFsaXplIHdpdGggc29tZXRoaW5nIHNvIGl0J3MgbmV2ZXIgZXF1YWwgb24gZmlyc3QgcnVuXG5cblx0XHRcdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBnZXRfdmFsdWUoKTtcblxuXHRcdFx0XHQvLyBBY3Rpb24ncyB1cGRhdGUgbWV0aG9kIGlzIGNvYXJzZS1ncmFpbmVkLCBpLmUuIHdoZW4gYW55dGhpbmcgaW4gdGhlIHBhc3NlZCB2YWx1ZSBjaGFuZ2VzLCB1cGRhdGUuXG5cdFx0XHRcdC8vIFRoaXMgd29ya3MgaW4gbGVnYWN5IG1vZGUgYmVjYXVzZSBvZiBtdXRhYmxlX3NvdXJjZSBiZWluZyB1cGRhdGVkIGFzIGEgd2hvbGUsIGJ1dCB3aGVuIHVzaW5nICRzdGF0ZVxuXHRcdFx0XHQvLyB0b2dldGhlciB3aXRoIGFjdGlvbnMgYW5kIG11dGF0aW9uLCBpdCB3b3VsZG4ndCBub3RpY2UgdGhlIGNoYW5nZSB3aXRob3V0IGEgZGVlcCByZWFkLlxuXHRcdFx0XHRkZWVwX3JlYWRfc3RhdGUodmFsdWUpO1xuXG5cdFx0XHRcdGlmIChpbml0ZWQgJiYgc2FmZV9ub3RfZXF1YWwocHJldiwgdmFsdWUpKSB7XG5cdFx0XHRcdFx0cHJldiA9IHZhbHVlO1xuXHRcdFx0XHRcdC8qKiBAdHlwZSB7RnVuY3Rpb259ICovIChwYXlsb2FkLnVwZGF0ZSkodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aW5pdGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAocGF5bG9hZD8uZGVzdHJveSkge1xuXHRcdFx0cmV0dXJuICgpID0+IC8qKiBAdHlwZSB7RnVuY3Rpb259ICovIChwYXlsb2FkLmRlc3Ryb3kpKCk7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKiBAaW1wb3J0IHsgRWZmZWN0IH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGJyYW5jaCwgZWZmZWN0LCBkZXN0cm95X2VmZmVjdCwgbWFuYWdlZCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5cbi8vIFRPRE8gaW4gNi4wIG9yIDcuMCwgd2hlbiB3ZSByZW1vdmUgbGVnYWN5IG1vZGUsIHdlIGNhbiBzaW1wbGlmeSB0aGlzIGJ5XG4vLyBnZXR0aW5nIHJpZCBvZiB0aGUgYmxvY2svYnJhbmNoIHN0dWZmIGFuZCBqdXN0IGxldHRpbmcgdGhlIGVmZmVjdCByaXAuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9wdWxsLzE1OTYyXG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0geygpID0+IChub2RlOiBFbGVtZW50KSA9PiB2b2lkfSBnZXRfZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaChub2RlLCBnZXRfZm4pIHtcblx0LyoqIEB0eXBlIHtmYWxzZSB8IHVuZGVmaW5lZCB8ICgobm9kZTogRWxlbWVudCkgPT4gdm9pZCl9ICovXG5cdHZhciBmbiA9IHVuZGVmaW5lZDtcblxuXHQvKiogQHR5cGUge0VmZmVjdCB8IG51bGx9ICovXG5cdHZhciBlO1xuXG5cdG1hbmFnZWQoKCkgPT4ge1xuXHRcdGlmIChmbiAhPT0gKGZuID0gZ2V0X2ZuKCkpKSB7XG5cdFx0XHRpZiAoZSkge1xuXHRcdFx0XHRkZXN0cm95X2VmZmVjdChlKTtcblx0XHRcdFx0ZSA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmbikge1xuXHRcdFx0XHRlID0gYnJhbmNoKCgpID0+IHtcblx0XHRcdFx0XHRlZmZlY3QoKCkgPT4gLyoqIEB0eXBlIHsobm9kZTogRWxlbWVudCkgPT4gdm9pZH0gKi8gKGZuKShub2RlKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG4iLCJjb25zdCBBVFRSX1JFR0VYID0gL1smXCI8XS9nO1xuY29uc3QgQ09OVEVOVF9SRUdFWCA9IC9bJjxdL2c7XG5cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzX2F0dHJdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVfaHRtbCh2YWx1ZSwgaXNfYXR0cikge1xuXHRjb25zdCBzdHIgPSBTdHJpbmcodmFsdWUgPz8gJycpO1xuXG5cdGNvbnN0IHBhdHRlcm4gPSBpc19hdHRyID8gQVRUUl9SRUdFWCA6IENPTlRFTlRfUkVHRVg7XG5cdHBhdHRlcm4ubGFzdEluZGV4ID0gMDtcblxuXHRsZXQgZXNjYXBlZCA9ICcnO1xuXHRsZXQgbGFzdCA9IDA7XG5cblx0d2hpbGUgKHBhdHRlcm4udGVzdChzdHIpKSB7XG5cdFx0Y29uc3QgaSA9IHBhdHRlcm4ubGFzdEluZGV4IC0gMTtcblx0XHRjb25zdCBjaCA9IHN0cltpXTtcblx0XHRlc2NhcGVkICs9IHN0ci5zdWJzdHJpbmcobGFzdCwgaSkgKyAoY2ggPT09ICcmJyA/ICcmYW1wOycgOiBjaCA9PT0gJ1wiJyA/ICcmcXVvdDsnIDogJyZsdDsnKTtcblx0XHRsYXN0ID0gaSArIDE7XG5cdH1cblxuXHRyZXR1cm4gZXNjYXBlZCArIHN0ci5zdWJzdHJpbmcobGFzdCk7XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVfaHRtbCB9IGZyb20gJy4uLy4uL2VzY2FwaW5nLmpzJztcbmltcG9ydCB7IGNsc3ggYXMgX2Nsc3ggfSBmcm9tICdjbHN4JztcbmltcG9ydCB7IGhhc19vd25fcHJvcGVydHkgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLyoqXG4gKiBgPGRpdiB0cmFuc2xhdGU9e2ZhbHNlfT5gIHNob3VsZCBiZSByZW5kZXJlZCBhcyBgPGRpdiB0cmFuc2xhdGU9XCJub1wiPmAgYW5kIF9ub3RfXG4gKiBgPGRpdiB0cmFuc2xhdGU9XCJmYWxzZVwiPmAsIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gYDxkaXYgdHJhbnNsYXRlPVwieWVzXCI+YC4gVGhlcmVcbiAqIG1heSBiZSBvdGhlciBvZGQgY2FzZXMgdGhhdCBuZWVkIHRvIGJlIGFkZGVkIHRvIHRoaXMgbGlzdCBpbiBmdXR1cmVcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBNYXA8YW55LCBzdHJpbmc+Pn1cbiAqL1xuY29uc3QgcmVwbGFjZW1lbnRzID0ge1xuXHR0cmFuc2xhdGU6IG5ldyBNYXAoW1xuXHRcdFt0cnVlLCAneWVzJ10sXG5cdFx0W2ZhbHNlLCAnbm8nXVxuXHRdKVxufTtcblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzX2Jvb2xlYW5dXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cihuYW1lLCB2YWx1ZSwgaXNfYm9vbGVhbiA9IGZhbHNlKSB7XG5cdC8vIGF0dHJpYnV0ZSBoaWRkZW4gZm9yIHZhbHVlcyBvdGhlciB0aGFuIFwidW50aWwtZm91bmRcIiBiZWhhdmVzIGxpa2UgYSBib29sZWFuIGF0dHJpYnV0ZVxuXHRpZiAobmFtZSA9PT0gJ2hpZGRlbicgJiYgdmFsdWUgIT09ICd1bnRpbC1mb3VuZCcpIHtcblx0XHRpc19ib29sZWFuID0gdHJ1ZTtcblx0fVxuXHRpZiAodmFsdWUgPT0gbnVsbCB8fCAoIXZhbHVlICYmIGlzX2Jvb2xlYW4pKSByZXR1cm4gJyc7XG5cdGNvbnN0IG5vcm1hbGl6ZWQgPVxuXHRcdChoYXNfb3duX3Byb3BlcnR5LmNhbGwocmVwbGFjZW1lbnRzLCBuYW1lKSAmJiByZXBsYWNlbWVudHNbbmFtZV0uZ2V0KHZhbHVlKSkgfHwgdmFsdWU7XG5cdGNvbnN0IGFzc2lnbm1lbnQgPSBpc19ib29sZWFuID8gYD1cIlwiYCA6IGA9XCIke2VzY2FwZV9odG1sKG5vcm1hbGl6ZWQsIHRydWUpfVwiYDtcblx0cmV0dXJuIGAgJHtuYW1lfSR7YXNzaWdubWVudH1gO1xufVxuXG4vKipcbiAqIFNtYWxsIHdyYXBwZXIgYXJvdW5kIGNsc3ggdG8gcHJlc2VydmUgU3ZlbHRlJ3MgKHdlaXJkKSBoYW5kbGluZyBvZiBmYWxzeSB2YWx1ZXMuXG4gKiBUT0RPIFN2ZWx0ZSA2IHJldmlzaXQgdGhpcywgYW5kIGxpa2VseSB0dXJuIGFsbCBmYWxzeSB2YWx1ZXMgaW50byB0aGUgZW1wdHkgc3RyaW5nICh3aGF0IGNsc3ggYWxzbyBkb2VzKVxuICogQHBhcmFtICB7YW55fSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xzeCh2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBfY2xzeCh2YWx1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHZhbHVlID8/ICcnO1xuXHR9XG59XG5cbmNvbnN0IHdoaXRlc3BhY2UgPSBbLi4uJyBcXHRcXG5cXHJcXGZcXHUwMGEwXFx1MDAwYlxcdWZlZmYnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gW2hhc2hdXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGJvb2xlYW4+fSBbZGlyZWN0aXZlc11cbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9fY2xhc3ModmFsdWUsIGhhc2gsIGRpcmVjdGl2ZXMpIHtcblx0dmFyIGNsYXNzbmFtZSA9IHZhbHVlID09IG51bGwgPyAnJyA6ICcnICsgdmFsdWU7XG5cblx0aWYgKGhhc2gpIHtcblx0XHRjbGFzc25hbWUgPSBjbGFzc25hbWUgPyBjbGFzc25hbWUgKyAnICcgKyBoYXNoIDogaGFzaDtcblx0fVxuXG5cdGlmIChkaXJlY3RpdmVzKSB7XG5cdFx0Zm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGRpcmVjdGl2ZXMpKSB7XG5cdFx0XHRpZiAoZGlyZWN0aXZlc1trZXldKSB7XG5cdFx0XHRcdGNsYXNzbmFtZSA9IGNsYXNzbmFtZSA/IGNsYXNzbmFtZSArICcgJyArIGtleSA6IGtleTtcblx0XHRcdH0gZWxzZSBpZiAoY2xhc3NuYW1lLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgbGVuID0ga2V5Lmxlbmd0aDtcblx0XHRcdFx0dmFyIGEgPSAwO1xuXG5cdFx0XHRcdHdoaWxlICgoYSA9IGNsYXNzbmFtZS5pbmRleE9mKGtleSwgYSkpID49IDApIHtcblx0XHRcdFx0XHR2YXIgYiA9IGEgKyBsZW47XG5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQoYSA9PT0gMCB8fCB3aGl0ZXNwYWNlLmluY2x1ZGVzKGNsYXNzbmFtZVthIC0gMV0pKSAmJlxuXHRcdFx0XHRcdFx0KGIgPT09IGNsYXNzbmFtZS5sZW5ndGggfHwgd2hpdGVzcGFjZS5pbmNsdWRlcyhjbGFzc25hbWVbYl0pKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y2xhc3NuYW1lID0gKGEgPT09IDAgPyAnJyA6IGNsYXNzbmFtZS5zdWJzdHJpbmcoMCwgYSkpICsgY2xhc3NuYW1lLnN1YnN0cmluZyhiICsgMSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGEgPSBiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjbGFzc25hbWUgPT09ICcnID8gbnVsbCA6IGNsYXNzbmFtZTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLGFueT59IHN0eWxlc1xuICogQHBhcmFtIHtib29sZWFufSBpbXBvcnRhbnRcbiAqL1xuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyhzdHlsZXMsIGltcG9ydGFudCA9IGZhbHNlKSB7XG5cdHZhciBzZXBhcmF0b3IgPSBpbXBvcnRhbnQgPyAnICFpbXBvcnRhbnQ7JyA6ICc7Jztcblx0dmFyIGNzcyA9ICcnO1xuXG5cdGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhzdHlsZXMpKSB7XG5cdFx0dmFyIHZhbHVlID0gc3R5bGVzW2tleV07XG5cdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09ICcnKSB7XG5cdFx0XHRjc3MgKz0gJyAnICsga2V5ICsgJzogJyArIHZhbHVlICsgc2VwYXJhdG9yO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjc3M7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRvX2Nzc19uYW1lKG5hbWUpIHtcblx0aWYgKG5hbWVbMF0gIT09ICctJyB8fCBuYW1lWzFdICE9PSAnLScpIHtcblx0XHRyZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cdHJldHVybiBuYW1lO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgW1JlY29yZDxzdHJpbmcsIGFueT4sIFJlY29yZDxzdHJpbmcsIGFueT5dfSBbc3R5bGVzXVxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b19zdHlsZSh2YWx1ZSwgc3R5bGVzKSB7XG5cdGlmIChzdHlsZXMpIHtcblx0XHR2YXIgbmV3X3N0eWxlID0gJyc7XG5cblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsYW55PiB8IHVuZGVmaW5lZH0gKi9cblx0XHR2YXIgbm9ybWFsX3N0eWxlcztcblxuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyxhbnk+IHwgdW5kZWZpbmVkfSAqL1xuXHRcdHZhciBpbXBvcnRhbnRfc3R5bGVzO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuXHRcdFx0bm9ybWFsX3N0eWxlcyA9IHN0eWxlc1swXTtcblx0XHRcdGltcG9ydGFudF9zdHlsZXMgPSBzdHlsZXNbMV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vcm1hbF9zdHlsZXMgPSBzdHlsZXM7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcblx0XHRcdFx0LnJlcGxhY2VBbGwoL1xccypcXC9cXCouKj9cXCpcXC9cXHMqL2csICcnKVxuXHRcdFx0XHQudHJpbSgpO1xuXG5cdFx0XHQvKiogQHR5cGUge2Jvb2xlYW4gfCAnXCInIHwgXCInXCJ9ICovXG5cdFx0XHR2YXIgaW5fc3RyID0gZmFsc2U7XG5cdFx0XHR2YXIgaW5fYXBvID0gMDtcblx0XHRcdHZhciBpbl9jb21tZW50ID0gZmFsc2U7XG5cblx0XHRcdHZhciByZXNlcnZlZF9uYW1lcyA9IFtdO1xuXG5cdFx0XHRpZiAobm9ybWFsX3N0eWxlcykge1xuXHRcdFx0XHRyZXNlcnZlZF9uYW1lcy5wdXNoKC4uLk9iamVjdC5rZXlzKG5vcm1hbF9zdHlsZXMpLm1hcCh0b19jc3NfbmFtZSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGltcG9ydGFudF9zdHlsZXMpIHtcblx0XHRcdFx0cmVzZXJ2ZWRfbmFtZXMucHVzaCguLi5PYmplY3Qua2V5cyhpbXBvcnRhbnRfc3R5bGVzKS5tYXAodG9fY3NzX25hbWUpKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0X2luZGV4ID0gMDtcblx0XHRcdHZhciBuYW1lX2luZGV4ID0gLTE7XG5cblx0XHRcdGNvbnN0IGxlbiA9IHZhbHVlLmxlbmd0aDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0dmFyIGMgPSB2YWx1ZVtpXTtcblxuXHRcdFx0XHRpZiAoaW5fY29tbWVudCkge1xuXHRcdFx0XHRcdGlmIChjID09PSAnLycgJiYgdmFsdWVbaSAtIDFdID09PSAnKicpIHtcblx0XHRcdFx0XHRcdGluX2NvbW1lbnQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoaW5fc3RyKSB7XG5cdFx0XHRcdFx0aWYgKGluX3N0ciA9PT0gYykge1xuXHRcdFx0XHRcdFx0aW5fc3RyID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcvJyAmJiB2YWx1ZVtpICsgMV0gPT09ICcqJykge1xuXHRcdFx0XHRcdGluX2NvbW1lbnQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICdcIicgfHwgYyA9PT0gXCInXCIpIHtcblx0XHRcdFx0XHRpbl9zdHIgPSBjO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcoJykge1xuXHRcdFx0XHRcdGluX2FwbysrO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGMgPT09ICcpJykge1xuXHRcdFx0XHRcdGluX2Fwby0tO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFpbl9jb21tZW50ICYmIGluX3N0ciA9PT0gZmFsc2UgJiYgaW5fYXBvID09PSAwKSB7XG5cdFx0XHRcdFx0aWYgKGMgPT09ICc6JyAmJiBuYW1lX2luZGV4ID09PSAtMSkge1xuXHRcdFx0XHRcdFx0bmFtZV9pbmRleCA9IGk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjID09PSAnOycgfHwgaSA9PT0gbGVuIC0gMSkge1xuXHRcdFx0XHRcdFx0aWYgKG5hbWVfaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBuYW1lID0gdG9fY3NzX25hbWUodmFsdWUuc3Vic3RyaW5nKHN0YXJ0X2luZGV4LCBuYW1lX2luZGV4KS50cmltKCkpO1xuXG5cdFx0XHRcdFx0XHRcdGlmICghcmVzZXJ2ZWRfbmFtZXMuaW5jbHVkZXMobmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoYyAhPT0gJzsnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gdmFsdWUuc3Vic3RyaW5nKHN0YXJ0X2luZGV4LCBpKS50cmltKCk7XG5cdFx0XHRcdFx0XHRcdFx0bmV3X3N0eWxlICs9ICcgJyArIHByb3BlcnR5ICsgJzsnO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0X2luZGV4ID0gaSArIDE7XG5cdFx0XHRcdFx0XHRuYW1lX2luZGV4ID0gLTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG5vcm1hbF9zdHlsZXMpIHtcblx0XHRcdG5ld19zdHlsZSArPSBhcHBlbmRfc3R5bGVzKG5vcm1hbF9zdHlsZXMpO1xuXHRcdH1cblxuXHRcdGlmIChpbXBvcnRhbnRfc3R5bGVzKSB7XG5cdFx0XHRuZXdfc3R5bGUgKz0gYXBwZW5kX3N0eWxlcyhpbXBvcnRhbnRfc3R5bGVzLCB0cnVlKTtcblx0XHR9XG5cblx0XHRuZXdfc3R5bGUgPSBuZXdfc3R5bGUudHJpbSgpO1xuXHRcdHJldHVybiBuZXdfc3R5bGUgPT09ICcnID8gbnVsbCA6IG5ld19zdHlsZTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZSA9PSBudWxsID8gbnVsbCA6IFN0cmluZyh2YWx1ZSk7XG59XG4iLCJpbXBvcnQgeyB0b19jbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9hdHRyaWJ1dGVzLmpzJztcbmltcG9ydCB7IENMQVNTX0NBQ0hFIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGh5ZHJhdGluZyB9IGZyb20gJy4uL2h5ZHJhdGlvbi5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBkb21cbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG51bWJlcn0gaXNfaHRtbFxuICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtoYXNoXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbcHJldl9jbGFzc2VzXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbbmV4dF9jbGFzc2VzXVxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIGJvb2xlYW4+IHwgdW5kZWZpbmVkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2NsYXNzKGRvbSwgaXNfaHRtbCwgdmFsdWUsIGhhc2gsIHByZXZfY2xhc3NlcywgbmV4dF9jbGFzc2VzKSB7XG5cdHZhciBwcmV2ID0gLyoqIEB0eXBlIHthbnl9ICovIChkb20pW0NMQVNTX0NBQ0hFXTtcblxuXHRpZiAoXG5cdFx0aHlkcmF0aW5nIHx8XG5cdFx0cHJldiAhPT0gdmFsdWUgfHxcblx0XHRwcmV2ID09PSB1bmRlZmluZWQgLy8gZm9yIGVkZ2UgY2FzZSBvZiBgY2xhc3M9e3VuZGVmaW5lZH1gXG5cdCkge1xuXHRcdHZhciBuZXh0X2NsYXNzX25hbWUgPSB0b19jbGFzcyh2YWx1ZSwgaGFzaCwgbmV4dF9jbGFzc2VzKTtcblxuXHRcdGlmICghaHlkcmF0aW5nIHx8IG5leHRfY2xhc3NfbmFtZSAhPT0gZG9tLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSkge1xuXHRcdFx0Ly8gUmVtb3ZpbmcgdGhlIGF0dHJpYnV0ZSB3aGVuIHRoZSB2YWx1ZSBpcyBvbmx5IGFuIGVtcHR5IHN0cmluZyBjYXVzZXNcblx0XHRcdC8vIHBlcmZvcm1hbmNlIGlzc3VlcyB2cyBzaW1wbHkgbWFraW5nIHRoZSBjbGFzc05hbWUgYW4gZW1wdHkgc3RyaW5nLiBTb1xuXHRcdFx0Ly8gd2Ugc2hvdWxkIG9ubHkgcmVtb3ZlIHRoZSBjbGFzcyBpZiB0aGUgdmFsdWUgaXMgbnVsbGlzaFxuXHRcdFx0Ly8gYW5kIHRoZXJlIG5vIGhhc2gvZGlyZWN0aXZlcyA6XG5cdFx0XHRpZiAobmV4dF9jbGFzc19uYW1lID09IG51bGwpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcblx0XHRcdH0gZWxzZSBpZiAoaXNfaHRtbCkge1xuXHRcdFx0XHRkb20uY2xhc3NOYW1lID0gbmV4dF9jbGFzc19uYW1lO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBuZXh0X2NsYXNzX25hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiBAdHlwZSB7YW55fSAqLyAoZG9tKVtDTEFTU19DQUNIRV0gPSB2YWx1ZTtcblx0fSBlbHNlIGlmIChuZXh0X2NsYXNzZXMgJiYgcHJldl9jbGFzc2VzICE9PSBuZXh0X2NsYXNzZXMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gbmV4dF9jbGFzc2VzKSB7XG5cdFx0XHR2YXIgaXNfcHJlc2VudCA9ICEhbmV4dF9jbGFzc2VzW2tleV07XG5cblx0XHRcdGlmIChwcmV2X2NsYXNzZXMgPT0gbnVsbCB8fCBpc19wcmVzZW50ICE9PSAhIXByZXZfY2xhc3Nlc1trZXldKSB7XG5cdFx0XHRcdGRvbS5jbGFzc0xpc3QudG9nZ2xlKGtleSwgaXNfcHJlc2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5leHRfY2xhc3Nlcztcbn1cbiIsImltcG9ydCB7IHRvX3N0eWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2F0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IHsgU1RZTEVfQ0FDSEUgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQgJiBFbGVtZW50Q1NTSW5saW5lU3R5bGV9IGRvbVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBwcmV2XG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IG5leHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJpb3JpdHldXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZV9zdHlsZXMoZG9tLCBwcmV2ID0ge30sIG5leHQsIHByaW9yaXR5KSB7XG5cdGZvciAodmFyIGtleSBpbiBuZXh0KSB7XG5cdFx0dmFyIHZhbHVlID0gbmV4dFtrZXldO1xuXG5cdFx0aWYgKHByZXZba2V5XSAhPT0gdmFsdWUpIHtcblx0XHRcdGlmIChuZXh0W2tleV0gPT0gbnVsbCkge1xuXHRcdFx0XHRkb20uc3R5bGUucmVtb3ZlUHJvcGVydHkoa2V5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBwcmlvcml0eSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBkb21cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdmFsdWVcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYW55PiB8IFtSZWNvcmQ8c3RyaW5nLCBhbnk+LCBSZWNvcmQ8c3RyaW5nLCBhbnk+XX0gW3ByZXZfc3R5bGVzXVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgW1JlY29yZDxzdHJpbmcsIGFueT4sIFJlY29yZDxzdHJpbmcsIGFueT5dfSBbbmV4dF9zdHlsZXNdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc3R5bGUoZG9tLCB2YWx1ZSwgcHJldl9zdHlsZXMsIG5leHRfc3R5bGVzKSB7XG5cdHZhciBwcmV2ID0gLyoqIEB0eXBlIHthbnl9ICovIChkb20pW1NUWUxFX0NBQ0hFXTtcblxuXHRpZiAoaHlkcmF0aW5nIHx8IHByZXYgIT09IHZhbHVlKSB7XG5cdFx0dmFyIG5leHRfc3R5bGVfYXR0ciA9IHRvX3N0eWxlKHZhbHVlLCBuZXh0X3N0eWxlcyk7XG5cblx0XHRpZiAoIWh5ZHJhdGluZyB8fCBuZXh0X3N0eWxlX2F0dHIgIT09IGRvbS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcblx0XHRcdGlmIChuZXh0X3N0eWxlX2F0dHIgPT0gbnVsbCkge1xuXHRcdFx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tLnN0eWxlLmNzc1RleHQgPSBuZXh0X3N0eWxlX2F0dHI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqIEB0eXBlIHthbnl9ICovIChkb20pW1NUWUxFX0NBQ0hFXSA9IHZhbHVlO1xuXHR9IGVsc2UgaWYgKG5leHRfc3R5bGVzKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobmV4dF9zdHlsZXMpKSB7XG5cdFx0XHR1cGRhdGVfc3R5bGVzKGRvbSwgcHJldl9zdHlsZXM/LlswXSwgbmV4dF9zdHlsZXNbMF0pO1xuXHRcdFx0dXBkYXRlX3N0eWxlcyhkb20sIHByZXZfc3R5bGVzPy5bMV0sIG5leHRfc3R5bGVzWzFdLCAnaW1wb3J0YW50Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHVwZGF0ZV9zdHlsZXMoZG9tLCBwcmV2X3N0eWxlcywgbmV4dF9zdHlsZXMpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXh0X3N0eWxlcztcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudCB9IGZyb20gJy4vc2hhcmVkLmpzJztcbmltcG9ydCB7IGlzIH0gZnJvbSAnLi4vLi4vLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgaXNfYXJyYXkgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi8uLi8uLi93YXJuaW5ncy5qcyc7XG5pbXBvcnQgeyBCYXRjaCwgY3VycmVudF9iYXRjaCwgcHJldmlvdXNfYmF0Y2ggfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2JhdGNoLmpzJztcbmltcG9ydCB7IGFzeW5jX21vZGVfZmxhZyB9IGZyb20gJy4uLy4uLy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBjb3JyZWN0IG9wdGlvbihzKSAoZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhpcyBpcyBhIG11bHRpcGxlIHNlbGVjdClcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge0hUTUxTZWxlY3RFbGVtZW50fSBzZWxlY3RcbiAqIEBwYXJhbSB7Vn0gdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91bnRpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSwgbW91bnRpbmcgPSBmYWxzZSkge1xuXHRpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG5cdFx0Ly8gSWYgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQsIGtlZXAgdGhlIHNlbGVjdGlvbiBhcyBpc1xuXHRcdGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiBub3QgYW4gYXJyYXksIHdhcm4gYW5kIGtlZXAgdGhlIHNlbGVjdGlvbiBhcyBpc1xuXHRcdGlmICghaXNfYXJyYXkodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdy5zZWxlY3RfbXVsdGlwbGVfaW52YWxpZF92YWx1ZSgpO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgdXBkYXRlIHRoZSBzZWxlY3Rpb25cblx0XHRmb3IgKHZhciBvcHRpb24gb2Ygc2VsZWN0Lm9wdGlvbnMpIHtcblx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluY2x1ZGVzKGdldF9vcHRpb25fdmFsdWUob3B0aW9uKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yIChvcHRpb24gb2Ygc2VsZWN0Lm9wdGlvbnMpIHtcblx0XHR2YXIgb3B0aW9uX3ZhbHVlID0gZ2V0X29wdGlvbl92YWx1ZShvcHRpb24pO1xuXHRcdGlmIChpcyhvcHRpb25fdmFsdWUsIHZhbHVlKSkge1xuXHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRpZiAoIW1vdW50aW5nIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IC0xOyAvLyBubyBvcHRpb24gc2hvdWxkIGJlIHNlbGVjdGVkXG5cdH1cbn1cblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBjb3JyZWN0IG9wdGlvbihzKSBpZiBgdmFsdWVgIGlzIGdpdmVuLFxuICogYW5kIHRoZW4gc2V0cyB1cCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIHN5bmMgdGhlXG4gKiBjdXJyZW50IHNlbGVjdGlvbiB0byB0aGUgZG9tIHdoZW4gaXQgY2hhbmdlcy4gU3VjaFxuICogY2hhbmdlcyBjb3VsZCBmb3IgZXhhbXBsZSBvY2N1ciB3aGVuIG9wdGlvbnMgYXJlXG4gKiBpbnNpZGUgYW4gYCNlYWNoYCBibG9jay5cbiAqIEBwYXJhbSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9zZWxlY3Qoc2VsZWN0KSB7XG5cdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0c2VsZWN0X29wdGlvbihzZWxlY3QsIHNlbGVjdC5fX3ZhbHVlKTtcblx0XHQvLyBEZWxpYmVyYXRlbHkgZG9uJ3QgdXBkYXRlIHRoZSBwb3RlbnRpYWwgYmluZGluZyB2YWx1ZSxcblx0XHQvLyB0aGUgbW9kZWwgc2hvdWxkIGJlIHByZXNlcnZlZCB1bmxlc3MgZXhwbGljaXRseSBjaGFuZ2VkXG5cdH0pO1xuXG5cdG9ic2VydmVyLm9ic2VydmUoc2VsZWN0LCB7XG5cdFx0Ly8gTGlzdGVuIHRvIG9wdGlvbiBlbGVtZW50IGNoYW5nZXNcblx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0c3VidHJlZTogdHJ1ZSwgLy8gYmVjYXVzZSBvZiA8b3B0Z3JvdXA+XG5cdFx0Ly8gTGlzdGVuIHRvIG9wdGlvbiBlbGVtZW50IHZhbHVlIGF0dHJpYnV0ZSBjaGFuZ2VzXG5cdFx0Ly8gKGRvZXNuJ3QgZ2V0IG5vdGlmaWVkIG9mIHNlbGVjdCB2YWx1ZSBjaGFuZ2VzLFxuXHRcdC8vIGJlY2F1c2UgdGhhdCBwcm9wZXJ0eSBpcyBub3QgcmVmbGVjdGVkIGFzIGFuIGF0dHJpYnV0ZSlcblx0XHRhdHRyaWJ1dGVzOiB0cnVlLFxuXHRcdGF0dHJpYnV0ZUZpbHRlcjogWyd2YWx1ZSddXG5cdH0pO1xuXG5cdHRlYXJkb3duKCgpID0+IHtcblx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdFxuICogQHBhcmFtIHsoKSA9PiB1bmtub3dufSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9zZWxlY3RfdmFsdWUoc2VsZWN0LCBnZXQsIHNldCA9IGdldCkge1xuXHR2YXIgYmF0Y2hlcyA9IG5ldyBXZWFrU2V0KCk7XG5cdHZhciBtb3VudGluZyA9IHRydWU7XG5cblx0bGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudChzZWxlY3QsICdjaGFuZ2UnLCAoaXNfcmVzZXQpID0+IHtcblx0XHR2YXIgcXVlcnkgPSBpc19yZXNldCA/ICdbc2VsZWN0ZWRdJyA6ICc6Y2hlY2tlZCc7XG5cdFx0LyoqIEB0eXBlIHt1bmtub3dufSAqL1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmIChzZWxlY3QubXVsdGlwbGUpIHtcblx0XHRcdHZhbHVlID0gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpLCBnZXRfb3B0aW9uX3ZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0LyoqIEB0eXBlIHtIVE1MT3B0aW9uRWxlbWVudCB8IG51bGx9ICovXG5cdFx0XHR2YXIgc2VsZWN0ZWRfb3B0aW9uID1cblx0XHRcdFx0c2VsZWN0LnF1ZXJ5U2VsZWN0b3IocXVlcnkpID8/XG5cdFx0XHRcdC8vIHdpbGwgZmFsbCBiYWNrIHRvIGZpcnN0IG5vbi1kaXNhYmxlZCBvcHRpb24gaWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkXG5cdFx0XHRcdHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdvcHRpb246bm90KFtkaXNhYmxlZF0pJyk7XG5cdFx0XHR2YWx1ZSA9IHNlbGVjdGVkX29wdGlvbiAmJiBnZXRfb3B0aW9uX3ZhbHVlKHNlbGVjdGVkX29wdGlvbik7XG5cdFx0fVxuXG5cdFx0c2V0KHZhbHVlKTtcblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzZWxlY3QuX192YWx1ZSA9IHZhbHVlO1xuXG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdGJhdGNoZXMuYWRkKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTmVlZHMgdG8gYmUgYW4gZWZmZWN0LCBub3QgYSByZW5kZXJfZWZmZWN0LCBzbyB0aGF0IGluIGNhc2Ugb2YgZWFjaCBsb29wcyB0aGUgbG9naWMgcnVucyBhZnRlciB0aGUgZWFjaCBibG9jayBoYXMgdXBkYXRlZFxuXHRlZmZlY3QoKCkgPT4ge1xuXHRcdHZhciB2YWx1ZSA9IGdldCgpO1xuXG5cdFx0aWYgKHNlbGVjdCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuXHRcdFx0Ly8gSW4gc3luYyBtb2RlIHJlbmRlciBlZmZlY3RzIGFyZSBleGVjdXRlZCBkdXJpbmcgdHJlZSB0cmF2ZXJzYWwgLT4gbmVlZHMgY3VycmVudF9iYXRjaFxuXHRcdFx0Ly8gSW4gYXN5bmMgbW9kZSByZW5kZXIgZWZmZWN0cyBhcmUgZmx1c2hlZCBvbmNlIGJhdGNoIHJlc29sdmVkLCBhdCB3aGljaCBwb2ludCBjdXJyZW50X2JhdGNoIGlzIG51bGwgLT4gbmVlZHMgcHJldmlvdXNfYmF0Y2hcblx0XHRcdHZhciBiYXRjaCA9IC8qKiBAdHlwZSB7QmF0Y2h9ICovIChhc3luY19tb2RlX2ZsYWcgPyBwcmV2aW91c19iYXRjaCA6IGN1cnJlbnRfYmF0Y2gpO1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgdGhlIDxzZWxlY3Q+IGlmIGl0IGlzIGZvY3VzZWQuIFdlIGNhbiBnZXQgaGVyZSBpZiwgZm9yIGV4YW1wbGUsXG5cdFx0XHQvLyBhbiB1cGRhdGUgaXMgZGVmZXJyZWQgYmVjYXVzZSBvZiBhc3luYyB3b3JrIGRlcGVuZGluZyBvbiB0aGUgc2VsZWN0OlxuXHRcdFx0Ly9cblx0XHRcdC8vIDxzZWxlY3QgYmluZDp2YWx1ZT17c2VsZWN0ZWR9Pi4uLjwvc2VsZWN0PlxuXHRcdFx0Ly8gPHA+e2F3YWl0IGZpbmQoc2VsZWN0ZWQpfTwvcD5cblx0XHRcdGlmIChiYXRjaGVzLmhhcyhiYXRjaCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSwgbW91bnRpbmcpO1xuXG5cdFx0Ly8gTW91bnRpbmcgYW5kIHZhbHVlIHVuZGVmaW5lZCAtPiB0YWtlIHNlbGVjdGlvbiBmcm9tIGRvbVxuXHRcdGlmIChtb3VudGluZyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvKiogQHR5cGUge0hUTUxPcHRpb25FbGVtZW50IHwgbnVsbH0gKi9cblx0XHRcdHZhciBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcblx0XHRcdGlmIChzZWxlY3RlZF9vcHRpb24gIT09IG51bGwpIHtcblx0XHRcdFx0dmFsdWUgPSBnZXRfb3B0aW9uX3ZhbHVlKHNlbGVjdGVkX29wdGlvbik7XG5cdFx0XHRcdHNldCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHNlbGVjdC5fX3ZhbHVlID0gdmFsdWU7XG5cdFx0bW91bnRpbmcgPSBmYWxzZTtcblx0fSk7XG5cblx0aW5pdF9zZWxlY3Qoc2VsZWN0KTtcbn1cblxuLyoqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IG9wdGlvbiAqL1xuZnVuY3Rpb24gZ2V0X29wdGlvbl92YWx1ZShvcHRpb24pIHtcblx0Ly8gX192YWx1ZSBvbmx5IGV4aXN0cyBpZiB0aGUgPG9wdGlvbj4gaGFzIGEgdmFsdWUgYXR0cmlidXRlXG5cdGlmICgnX192YWx1ZScgaW4gb3B0aW9uKSB7XG5cdFx0cmV0dXJuIG9wdGlvbi5fX3ZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcHRpb24udmFsdWU7XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgQmxvY2tlciwgRWZmZWN0IH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgaHlkcmF0aW5nLCBzZXRfaHlkcmF0aW5nIH0gZnJvbSAnLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IGdldF9kZXNjcmlwdG9ycywgZ2V0X3Byb3RvdHlwZV9vZiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZXZlbnQsIGRlbGVnYXRlLCBkZWxlZ2F0ZWQsIGV2ZW50LCBldmVudF9zeW1ib2wgfSBmcm9tICcuL2V2ZW50cy5qcyc7XG5pbXBvcnQgeyBhZGRfZm9ybV9yZXNldF9saXN0ZW5lciwgYXV0b2ZvY3VzIH0gZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi4vLi4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHtcblx0QVRUUklCVVRFU19DQUNIRSxcblx0Rk9STV9SRVNFVF9IQU5ETEVSLFxuXHRJU19YSFRNTCxcblx0TE9BRElOR19BVFRSX1NZTUJPTFxufSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBxdWV1ZV9taWNyb190YXNrIH0gZnJvbSAnLi4vdGFzay5qcyc7XG5pbXBvcnQgeyBpc19jYXB0dXJlX2V2ZW50LCBjYW5fZGVsZWdhdGVfZXZlbnQsIG5vcm1hbGl6ZV9hdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRhY3RpdmVfcmVhY3Rpb24sXG5cdGdldCxcblx0c2V0X2FjdGl2ZV9lZmZlY3QsXG5cdHNldF9hY3RpdmVfcmVhY3Rpb25cbn0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBhdHRhY2ggfSBmcm9tICcuL2F0dGFjaG1lbnRzLmpzJztcbmltcG9ydCB7IGNsc3ggfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYXR0cmlidXRlcy5qcyc7XG5pbXBvcnQgeyBzZXRfY2xhc3MgfSBmcm9tICcuL2NsYXNzLmpzJztcbmltcG9ydCB7IHNldF9zdHlsZSB9IGZyb20gJy4vc3R5bGUuanMnO1xuaW1wb3J0IHsgQVRUQUNITUVOVF9LRVksIE5BTUVTUEFDRV9IVE1MLCBVTklOSVRJQUxJWkVEIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGJyYW5jaCwgZGVzdHJveV9lZmZlY3QsIGVmZmVjdCwgbWFuYWdlZCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBpbml0X3NlbGVjdCwgc2VsZWN0X29wdGlvbiB9IGZyb20gJy4vYmluZGluZ3Mvc2VsZWN0LmpzJztcbmltcG9ydCB7IGZsYXR0ZW4gfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L2FzeW5jLmpzJztcblxuZXhwb3J0IGNvbnN0IENMQVNTID0gU3ltYm9sKCdjbGFzcycpO1xuZXhwb3J0IGNvbnN0IFNUWUxFID0gU3ltYm9sKCdzdHlsZScpO1xuXG5jb25zdCBJU19DVVNUT01fRUxFTUVOVCA9IFN5bWJvbCgnaXMgY3VzdG9tIGVsZW1lbnQnKTtcbmNvbnN0IElTX0hUTUwgPSBTeW1ib2woJ2lzIGh0bWwnKTtcblxuY29uc3QgTElOS19UQUcgPSBJU19YSFRNTCA/ICdsaW5rJyA6ICdMSU5LJztcbmNvbnN0IElOUFVUX1RBRyA9IElTX1hIVE1MID8gJ2lucHV0JyA6ICdJTlBVVCc7XG5jb25zdCBPUFRJT05fVEFHID0gSVNfWEhUTUwgPyAnb3B0aW9uJyA6ICdPUFRJT04nO1xuY29uc3QgU0VMRUNUX1RBRyA9IElTX1hIVE1MID8gJ3NlbGVjdCcgOiAnU0VMRUNUJztcbmNvbnN0IFBST0dSRVNTX1RBRyA9IElTX1hIVE1MID8gJ3Byb2dyZXNzJyA6ICdQUk9HUkVTUyc7XG5cbi8qKlxuICogVGhlIHZhbHVlL2NoZWNrZWQgYXR0cmlidXRlIGluIHRoZSB0ZW1wbGF0ZSBhY3R1YWxseSBjb3JyZXNwb25kcyB0byB0aGUgZGVmYXVsdFZhbHVlIHByb3BlcnR5LCBzbyB3ZSBuZWVkXG4gKiB0byByZW1vdmUgaXQgdXBvbiBoeWRyYXRpb24gdG8gYXZvaWQgYSBidWcgd2hlbiBzb21lb25lIHJlc2V0cyB0aGUgZm9ybSB2YWx1ZS5cbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX2lucHV0X2RlZmF1bHRzKGlucHV0KSB7XG5cdGlmICghaHlkcmF0aW5nKSByZXR1cm47XG5cblx0dmFyIGFscmVhZHlfcmVtb3ZlZCA9IGZhbHNlO1xuXG5cdC8vIFdlIHRyeSBhbmQgcmVtb3ZlIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgbGF0ZXIsIHJhdGhlciB0aGFuIHN5bmMgZHVyaW5nIGh5ZHJhdGlvbi5cblx0Ly8gRG9pbmcgaXQgc3luYyBkdXJpbmcgaHlkcmF0aW9uIGhhcyBhIG5lZ2F0aXZlIGltcGFjdCBvbiBwZXJmb3JtYW5jZSwgYnV0IGRlZmVycmluZyB0aGVcblx0Ly8gd29yayBpbiBhbiBpZGxlIHRhc2sgYWxsZXZpYXRlcyB0aGlzIGdyZWF0bHkuIElmIGEgZm9ybSByZXNldCBldmVudCBjb21lcyBpbiBiZWZvcmVcblx0Ly8gdGhlIGlkbGUgY2FsbGJhY2ssIHRoZW4gd2UgZW5zdXJlIHRoZSBpbnB1dCBkZWZhdWx0cyBhcmUgY2xlYXJlZCBqdXN0IGJlZm9yZS5cblx0dmFyIHJlbW92ZV9kZWZhdWx0cyA9ICgpID0+IHtcblx0XHRpZiAoYWxyZWFkeV9yZW1vdmVkKSByZXR1cm47XG5cdFx0YWxyZWFkeV9yZW1vdmVkID0gdHJ1ZTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlcyBidXQgcHJlc2VydmUgdGhlIHZhbHVlc1xuXHRcdGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcblx0XHRcdHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuXHRcdFx0c2V0X2F0dHJpYnV0ZShpbnB1dCwgJ3ZhbHVlJywgbnVsbCk7XG5cdFx0XHRpbnB1dC52YWx1ZSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuXHRcdFx0dmFyIGNoZWNrZWQgPSBpbnB1dC5jaGVja2VkO1xuXHRcdFx0c2V0X2F0dHJpYnV0ZShpbnB1dCwgJ2NoZWNrZWQnLCBudWxsKTtcblx0XHRcdGlucHV0LmNoZWNrZWQgPSBjaGVja2VkO1xuXHRcdH1cblx0fTtcblxuXHQvKiogQHR5cGUge2FueX0gKi8gKGlucHV0KVtGT1JNX1JFU0VUX0hBTkRMRVJdID0gcmVtb3ZlX2RlZmF1bHRzO1xuXHRxdWV1ZV9taWNyb190YXNrKHJlbW92ZV9kZWZhdWx0cyk7XG5cdGFkZF9mb3JtX3Jlc2V0X2xpc3RlbmVyKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF92YWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuXHR2YXIgYXR0cmlidXRlcyA9IGdldF9hdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdGlmIChcblx0XHRhdHRyaWJ1dGVzLnZhbHVlID09PVxuXHRcdFx0KGF0dHJpYnV0ZXMudmFsdWUgPVxuXHRcdFx0XHQvLyB0cmVhdCBudWxsIGFuZCB1bmRlZmluZWQgdGhlIHNhbWUgZm9yIHRoZSBpbml0aWFsIHZhbHVlXG5cdFx0XHRcdHZhbHVlID8/IHVuZGVmaW5lZCkgfHxcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0Ly8gYHByb2dyZXNzYCBlbGVtZW50cyBhbHdheXMgbmVlZCB0aGVpciB2YWx1ZSBzZXQgd2hlbiBpdCdzIGAwYFxuXHRcdChlbGVtZW50LnZhbHVlID09PSB2YWx1ZSAmJiAodmFsdWUgIT09IDAgfHwgZWxlbWVudC5ub2RlTmFtZSAhPT0gUFJPR1JFU1NfVEFHKSlcblx0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRlbGVtZW50LnZhbHVlID0gdmFsdWUgPz8gJyc7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jaGVja2VkKGVsZW1lbnQsIGNoZWNrZWQpIHtcblx0dmFyIGF0dHJpYnV0ZXMgPSBnZXRfYXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRpZiAoXG5cdFx0YXR0cmlidXRlcy5jaGVja2VkID09PVxuXHRcdChhdHRyaWJ1dGVzLmNoZWNrZWQgPVxuXHRcdFx0Ly8gdHJlYXQgbnVsbCBhbmQgdW5kZWZpbmVkIHRoZSBzYW1lIGZvciB0aGUgaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Y2hlY2tlZCA/PyB1bmRlZmluZWQpXG5cdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0ZWxlbWVudC5jaGVja2VkID0gY2hlY2tlZDtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBgc2VsZWN0ZWRgIGF0dHJpYnV0ZSBvbiBhbiBgb3B0aW9uYCBlbGVtZW50LlxuICogTm90IHNldCB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBiZWNhdXNlIHRoYXQgZG9lc24ndCByZWZsZWN0IHRvIHRoZSBET00sXG4gKiB3aGljaCBtZWFucyBpdCB3b3VsZG4ndCBiZSB0YWtlbiBpbnRvIGFjY291bnQgd2hlbiBhIGZvcm0gaXMgcmVzZXQuXG4gKiBAcGFyYW0ge0hUTUxPcHRpb25FbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc2VsZWN0ZWQoZWxlbWVudCwgc2VsZWN0ZWQpIHtcblx0aWYgKHNlbGVjdGVkKSB7XG5cdFx0Ly8gVGhlIHNlbGVjdGVkIG9wdGlvbiBjb3VsZCd2ZSBjaGFuZ2VkIHZpYSB1c2VyIHNlbGVjdGlvbiwgYW5kXG5cdFx0Ly8gc2V0dGluZyB0aGUgdmFsdWUgd2l0aG91dCB0aGlzIGNoZWNrIHdvdWxkIHNldCBpdCBiYWNrLlxuXHRcdGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG5cdH1cbn1cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBkZWZhdWx0IGNoZWNrZWQgcHJvcGVydHkgd2l0aG91dCBpbmZsdWVuY2luZyB0aGUgY3VycmVudCBjaGVja2VkIHByb3BlcnR5LlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kZWZhdWx0X2NoZWNrZWQoZWxlbWVudCwgY2hlY2tlZCkge1xuXHRjb25zdCBleGlzdGluZ192YWx1ZSA9IGVsZW1lbnQuY2hlY2tlZDtcblx0ZWxlbWVudC5kZWZhdWx0Q2hlY2tlZCA9IGNoZWNrZWQ7XG5cdGVsZW1lbnQuY2hlY2tlZCA9IGV4aXN0aW5nX3ZhbHVlO1xufVxuXG4vKipcbiAqIEFwcGxpZXMgdGhlIGRlZmF1bHQgdmFsdWUgcHJvcGVydHkgd2l0aG91dCBpbmZsdWVuY2luZyB0aGUgY3VycmVudCB2YWx1ZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2RlZmF1bHRfdmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcblx0Y29uc3QgZXhpc3RpbmdfdmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuXHRlbGVtZW50LmRlZmF1bHRWYWx1ZSA9IHZhbHVlO1xuXHRlbGVtZW50LnZhbHVlID0gZXhpc3RpbmdfdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtza2lwX3dhcm5pbmddXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUsIHNraXBfd2FybmluZykge1xuXHR2YXIgYXR0cmlidXRlcyA9IGdldF9hdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdGlmIChoeWRyYXRpbmcpIHtcblx0XHRhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuXG5cdFx0aWYgKFxuXHRcdFx0YXR0cmlidXRlID09PSAnc3JjJyB8fFxuXHRcdFx0YXR0cmlidXRlID09PSAnc3Jjc2V0JyB8fFxuXHRcdFx0KGF0dHJpYnV0ZSA9PT0gJ2hyZWYnICYmIGVsZW1lbnQubm9kZU5hbWUgPT09IExJTktfVEFHKVxuXHRcdCkge1xuXHRcdFx0aWYgKCFza2lwX3dhcm5pbmcpIHtcblx0XHRcdFx0Y2hlY2tfc3JjX2luX2Rldl9oeWRyYXRpb24oZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSA/PyAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHdlIHJlc2V0IHRoZXNlIGF0dHJpYnV0ZXMsIHRoZXkgd291bGQgcmVzdWx0IGluIGFub3RoZXIgbmV0d29yayByZXF1ZXN0LCB3aGljaCB3ZSB3YW50IHRvIGF2b2lkLlxuXHRcdFx0Ly8gV2UgYXNzdW1lIHRoZXkgYXJlIHRoZSBzYW1lIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIgYXMgY2hlY2tpbmcgaWYgdGhleSBhcmUgZXF1YWwgaXMgZXhwZW5zaXZlXG5cdFx0XHQvLyAod2UgY2FuJ3QganVzdCBjb21wYXJlIHRoZSBzdHJpbmdzIGFzIHRoZXkgY2FuIGJlIGRpZmZlcmVudCBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyIGJ1dCByZXN1bHQgaW4gdGhlXG5cdFx0XHQvLyBzYW1lIHVybCwgc28gd2Ugd291bGQgbmVlZCB0byBjcmVhdGUgaGlkZGVuIGFuY2hvciBlbGVtZW50cyB0byBjb21wYXJlIHRoZW0pXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0aWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9PT0gKGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlKSkgcmV0dXJuO1xuXG5cdGlmIChhdHRyaWJ1dGUgPT09ICdsb2FkaW5nJykge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRlbGVtZW50W0xPQURJTkdfQVRUUl9TWU1CT0xdID0gdmFsdWU7XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiBnZXRfc2V0dGVycyhlbGVtZW50KS5pbmNsdWRlcyhhdHRyaWJ1dGUpKSB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGVsZW1lbnRbYXR0cmlidXRlXSA9IHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBkb21cbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3hsaW5rX2F0dHJpYnV0ZShkb20sIGF0dHJpYnV0ZSwgdmFsdWUpIHtcblx0ZG9tLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEobm9kZSwgcHJvcCwgdmFsdWUpIHtcblx0Ly8gV2UgbmVlZCB0byBlbnN1cmUgdGhhdCBzZXR0aW5nIGN1c3RvbSBlbGVtZW50IHByb3BzLCB3aGljaCBjYW5cblx0Ly8gaW52b2tlIGxpZmVjeWNsZSBtZXRob2RzIG9uIG90aGVyIGN1c3RvbSBlbGVtZW50cywgZG9lcyBub3QgYWxzb1xuXHQvLyBhc3NvY2lhdGUgdGhvc2UgbGlmZWN5Y2xlIG1ldGhvZHMgd2l0aCB0aGUgY3VycmVudCBhY3RpdmUgcmVhY3Rpb25cblx0Ly8gb3IgZWZmZWN0XG5cdHZhciBwcmV2aW91c19yZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cblx0Ly8gSWYgd2UncmUgaHlkcmF0aW5nIGJ1dCB0aGUgY3VzdG9tIGVsZW1lbnQgaXMgZnJvbSBTdmVsdGUsIGFuZCBpdCBhbHJlYWR5IHNjYWZmb2xkZWQsXG5cdC8vIHRoZW4gaXQgbWlnaHQgcnVuIGJsb2NrIGxvZ2ljIGluIGh5ZHJhdGlvbiBtb2RlLCB3aGljaCB3ZSBoYXZlIHRvIHByZXZlbnQuXG5cdGxldCB3YXNfaHlkcmF0aW5nID0gaHlkcmF0aW5nO1xuXHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0c2V0X2h5ZHJhdGluZyhmYWxzZSk7XG5cdH1cblxuXHRzZXRfYWN0aXZlX3JlYWN0aW9uKG51bGwpO1xuXHRzZXRfYWN0aXZlX2VmZmVjdChudWxsKTtcblxuXHR0cnkge1xuXHRcdGlmIChcblx0XHRcdC8vIGBzdHlsZWAgc2hvdWxkIHVzZSBgc2V0X2F0dHJpYnV0ZWAgcmF0aGVyIHRoYW4gdGhlIHNldHRlclxuXHRcdFx0cHJvcCAhPT0gJ3N0eWxlJyAmJlxuXHRcdFx0Ly8gRG9uJ3QgY29tcHV0ZSBzZXR0ZXJzIGZvciBjdXN0b20gZWxlbWVudHMgd2hpbGUgdGhleSBhcmVuJ3QgcmVnaXN0ZXJlZCB5ZXQsXG5cdFx0XHQvLyBiZWNhdXNlIGR1cmluZyB0aGVpciB1cGdyYWRlL2luc3RhbnRpYXRpb24gdGhleSBtaWdodCBhZGQgbW9yZSBzZXR0ZXJzLlxuXHRcdFx0Ly8gSW5zdGVhZCwgZmFsbCBiYWNrIHRvIGEgc2ltcGxlIFwiYW4gb2JqZWN0LCB0aGVuIHNldCBhcyBwcm9wZXJ0eVwiIGhldXJpc3RpYy5cblx0XHRcdChzZXR0ZXJzX2NhY2hlLmhhcyhub2RlLmdldEF0dHJpYnV0ZSgnaXMnKSB8fCBub2RlLm5vZGVOYW1lKSB8fFxuXHRcdFx0Ly8gY3VzdG9tRWxlbWVudHMgbWF5IG5vdCBiZSBhdmFpbGFibGUgaW4gYnJvd3NlciBleHRlbnNpb24gY29udGV4dHNcblx0XHRcdCFjdXN0b21FbGVtZW50cyB8fFxuXHRcdFx0Y3VzdG9tRWxlbWVudHMuZ2V0KG5vZGUuZ2V0QXR0cmlidXRlKCdpcycpIHx8IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0PyBnZXRfc2V0dGVycyhub2RlKS5pbmNsdWRlcyhwcm9wKVxuXHRcdFx0XHQ6IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpXG5cdFx0KSB7XG5cdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRub2RlW3Byb3BdID0gdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFdlIGRpZCBnZXR0ZXJzIGV0YyBjaGVja3MgYWxyZWFkeSwgc3RyaW5naWZ5IGJlZm9yZSBwYXNzaW5nIHRvIHNldF9hdHRyaWJ1dGVcblx0XHRcdC8vIHRvIGVuc3VyZSBpdCBkb2Vzbid0IGludm9rZSB0aGUgc2FtZSBsb2dpYyBhZ2FpbiwgYW5kIHBvdGVudGlhbGx5IHBvcHVsYXRpbmdcblx0XHRcdC8vIHRoZSBzZXR0ZXJzIGNhY2hlIHRvbyBlYXJseS5cblx0XHRcdHNldF9hdHRyaWJ1dGUobm9kZSwgcHJvcCwgdmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogU3RyaW5nKHZhbHVlKSk7XG5cdFx0fVxuXHR9IGZpbmFsbHkge1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocHJldmlvdXNfcmVhY3Rpb24pO1xuXHRcdHNldF9hY3RpdmVfZWZmZWN0KHByZXZpb3VzX2VmZmVjdCk7XG5cdFx0aWYgKHdhc19oeWRyYXRpbmcpIHtcblx0XHRcdHNldF9oeWRyYXRpbmcodHJ1ZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU3ByZWFkcyBhdHRyaWJ1dGVzIG9udG8gYSBET00gZWxlbWVudCwgdGFraW5nIGludG8gYWNjb3VudCB0aGUgY3VycmVudGx5IHNldCBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0VsZW1lbnQgJiBFbGVtZW50Q1NTSW5saW5lU3R5bGV9IGVsZW1lbnRcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55PiB8IHVuZGVmaW5lZH0gcHJldlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+fSBuZXh0IE5ldyBhdHRyaWJ1dGVzIC0gdGhpcyBmdW5jdGlvbiBtdXRhdGVzIHRoaXMgb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gW2Nzc19oYXNoXVxuICogQHBhcmFtIHtib29sZWFufSBbc2hvdWxkX3JlbW92ZV9kZWZhdWx0c11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBfd2FybmluZ11cbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fVxuICovXG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhcblx0ZWxlbWVudCxcblx0cHJldixcblx0bmV4dCxcblx0Y3NzX2hhc2gsXG5cdHNob3VsZF9yZW1vdmVfZGVmYXVsdHMgPSBmYWxzZSxcblx0c2tpcF93YXJuaW5nID0gZmFsc2Vcbikge1xuXHRpZiAoaHlkcmF0aW5nICYmIHNob3VsZF9yZW1vdmVfZGVmYXVsdHMgJiYgZWxlbWVudC5ub2RlTmFtZSA9PT0gSU5QVVRfVEFHKSB7XG5cdFx0dmFyIGlucHV0ID0gLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqLyAoZWxlbWVudCk7XG5cdFx0dmFyIGF0dHJpYnV0ZSA9IGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgPyAnZGVmYXVsdENoZWNrZWQnIDogJ2RlZmF1bHRWYWx1ZSc7XG5cblx0XHRpZiAoIShhdHRyaWJ1dGUgaW4gbmV4dCkpIHtcblx0XHRcdHJlbW92ZV9pbnB1dF9kZWZhdWx0cyhpbnB1dCk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIGF0dHJpYnV0ZXMgPSBnZXRfYXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHR2YXIgaXNfY3VzdG9tX2VsZW1lbnQgPSBhdHRyaWJ1dGVzW0lTX0NVU1RPTV9FTEVNRU5UXTtcblx0dmFyIHByZXNlcnZlX2F0dHJpYnV0ZV9jYXNlID0gIWF0dHJpYnV0ZXNbSVNfSFRNTF07XG5cblx0Ly8gSWYgd2UncmUgaHlkcmF0aW5nIGJ1dCB0aGUgY3VzdG9tIGVsZW1lbnQgaXMgZnJvbSBTdmVsdGUsIGFuZCBpdCBhbHJlYWR5IHNjYWZmb2xkZWQsXG5cdC8vIHRoZW4gaXQgbWlnaHQgcnVuIGJsb2NrIGxvZ2ljIGluIGh5ZHJhdGlvbiBtb2RlLCB3aGljaCB3ZSBoYXZlIHRvIHByZXZlbnQuXG5cdGxldCBpc19oeWRyYXRpbmdfY3VzdG9tX2VsZW1lbnQgPSBoeWRyYXRpbmcgJiYgaXNfY3VzdG9tX2VsZW1lbnQ7XG5cdGlmIChpc19oeWRyYXRpbmdfY3VzdG9tX2VsZW1lbnQpIHtcblx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0fVxuXG5cdHZhciBjdXJyZW50ID0gcHJldiB8fCB7fTtcblx0dmFyIGlzX29wdGlvbl9lbGVtZW50ID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gT1BUSU9OX1RBRztcblxuXHRmb3IgKHZhciBrZXkgaW4gcHJldikge1xuXHRcdGlmICghKGtleSBpbiBuZXh0KSkge1xuXHRcdFx0bmV4dFtrZXldID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRpZiAobmV4dC5jbGFzcykge1xuXHRcdG5leHQuY2xhc3MgPSBjbHN4KG5leHQuY2xhc3MpO1xuXHR9IGVsc2UgaWYgKGNzc19oYXNoIHx8IG5leHRbQ0xBU1NdKSB7XG5cdFx0bmV4dC5jbGFzcyA9IG51bGw7IC8qIGZvcmNlIGNhbGwgdG8gc2V0X2NsYXNzKCkgKi9cblx0fVxuXG5cdGlmIChuZXh0W1NUWUxFXSkge1xuXHRcdG5leHQuc3R5bGUgPz89IG51bGw7IC8qIGZvcmNlIGNhbGwgdG8gc2V0X3N0eWxlKCkgKi9cblx0fVxuXG5cdHZhciBzZXR0ZXJzID0gZ2V0X3NldHRlcnMoZWxlbWVudCk7XG5cblx0aWYgKGVsZW1lbnQubm9kZU5hbWUgPT09IElOUFVUX1RBRyAmJiAndHlwZScgaW4gbmV4dCAmJiAoJ3ZhbHVlJyBpbiBuZXh0IHx8ICdfX3ZhbHVlJyBpbiBuZXh0KSkge1xuXHRcdHZhciB0eXBlID0gbmV4dC50eXBlO1xuXG5cdFx0aWYgKHR5cGUgIT09IGN1cnJlbnQudHlwZSB8fCAodHlwZSA9PT0gdW5kZWZpbmVkICYmIGVsZW1lbnQuaGFzQXR0cmlidXRlKCd0eXBlJykpKSB7XG5cdFx0XHRjdXJyZW50LnR5cGUgPSB0eXBlO1xuXHRcdFx0c2V0X2F0dHJpYnV0ZShlbGVtZW50LCAndHlwZScsIHR5cGUsIHNraXBfd2FybmluZyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gc2luY2Uga2V5IGlzIGNhcHR1cmVkIHdlIHVzZSBjb25zdFxuXHRmb3IgKGNvbnN0IGtleSBpbiBuZXh0KSB7XG5cdFx0Ly8gbGV0IGluc3RlYWQgb2YgdmFyIGJlY2F1c2UgcmVmZXJlbmNlZCBpbiBhIGNsb3N1cmVcblx0XHRsZXQgdmFsdWUgPSBuZXh0W2tleV07XG5cblx0XHQvLyBVcCBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0byBkbyB0aGlzIGZvciB0aGUgaW5pdGlhbCB2YWx1ZSwgdG9vLCBldmVuIGlmIGl0J3MgdW5kZWZpbmVkLFxuXHRcdC8vIGFuZCB0aGlzIHdvdWxkbid0IGJlIHJlYWNoZWQgaW4gY2FzZSBvZiB1bmRlZmluZWQgYmVjYXVzZSBvZiB0aGUgZXF1YWxpdHkgY2hlY2sgYmVsb3dcblx0XHRpZiAoaXNfb3B0aW9uX2VsZW1lbnQgJiYga2V5ID09PSAndmFsdWUnICYmIHZhbHVlID09IG51bGwpIHtcblx0XHRcdC8vIFRoZSA8b3B0aW9uPiBlbGVtZW50IGlzIGEgc3BlY2lhbCBjYXNlIGJlY2F1c2UgcmVtb3ZpbmcgdGhlIHZhbHVlIGF0dHJpYnV0ZSBtZWFuc1xuXHRcdFx0Ly8gdGhlIHZhbHVlIGlzIHNldCB0byB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBvcHRpb24gZWxlbWVudCwgYW5kIHNldHRpbmcgdGhlIHZhbHVlXG5cdFx0XHQvLyB0byBudWxsIG9yIHVuZGVmaW5lZCBtZWFucyB0aGUgdmFsdWUgaXMgc2V0IHRvIHRoZSBzdHJpbmcgXCJudWxsXCIgb3IgXCJ1bmRlZmluZWRcIi5cblx0XHRcdC8vIFRvIGFsaWduIHdpdGggaG93IHdlIGhhbmRsZSB0aGlzIGNhc2UgaW4gbm9uLXNwcmVhZC1zY2VuYXJpb3MsIHRoaXMgbG9naWMgaXMgbmVlZGVkLlxuXHRcdFx0Ly8gVGhlcmUncyBhIHN1cGVyLWVkZ2UtY2FzZSBidWcgaGVyZSB0aGF0IGlzIGxlZnQgaW4gaW4gZmF2b3Igb2Ygc21hbGxlciBjb2RlIHNpemU6XG5cdFx0XHQvLyBCZWNhdXNlIG9mIHRoZSBcInNldCBtaXNzaW5nIHByb3BzIHRvIG51bGxcIiBsb2dpYyBhYm92ZSwgd2UgY2FuJ3QgZGlmZmVyZW50aWF0ZVxuXHRcdFx0Ly8gYmV0d2VlbiBhIG1pc3NpbmcgdmFsdWUgYW5kIGFuIGV4cGxpY2l0bHkgc2V0IHZhbHVlIG9mIG51bGwgb3IgdW5kZWZpbmVkLiBUaGF0IG1lYW5zXG5cdFx0XHQvLyB0aGF0IG9uY2Ugc2V0LCB0aGUgdmFsdWUgYXR0cmlidXRlIG9mIGFuIDxvcHRpb24+IGVsZW1lbnQgY2FuJ3QgYmUgcmVtb3ZlZC4gVGhpcyBpc1xuXHRcdFx0Ly8gYSB2ZXJ5IHJhcmUgZWRnZSBjYXNlLCBhbmQgcmVtb3ZpbmcgdGhlIGF0dHJpYnV0ZSBhbHRvZ2V0aGVyIGlzbid0IHBvc3NpYmxlIGVpdGhlclxuXHRcdFx0Ly8gZm9yIHRoZSA8b3B0aW9uIHZhbHVlPXt1bmRlZmluZWR9PiBjYXNlLCBzbyB3ZSdyZSBub3QgbG9zaW5nIGFueSBmdW5jdGlvbmFsaXR5IGhlcmUuXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRlbGVtZW50LnZhbHVlID0gZWxlbWVudC5fX3ZhbHVlID0gJyc7XG5cdFx0XHRjdXJyZW50W2tleV0gPSB2YWx1ZTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgPT09ICdjbGFzcycpIHtcblx0XHRcdHZhciBpc19odG1sID0gZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcblx0XHRcdHNldF9jbGFzcyhlbGVtZW50LCBpc19odG1sLCB2YWx1ZSwgY3NzX2hhc2gsIHByZXY/LltDTEFTU10sIG5leHRbQ0xBU1NdKTtcblx0XHRcdGN1cnJlbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y3VycmVudFtDTEFTU10gPSBuZXh0W0NMQVNTXTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgPT09ICdzdHlsZScpIHtcblx0XHRcdHNldF9zdHlsZShlbGVtZW50LCB2YWx1ZSwgcHJldj8uW1NUWUxFXSwgbmV4dFtTVFlMRV0pO1xuXHRcdFx0Y3VycmVudFtrZXldID0gdmFsdWU7XG5cdFx0XHRjdXJyZW50W1NUWUxFXSA9IG5leHRbU1RZTEVdO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHByZXZfdmFsdWUgPSBjdXJyZW50W2tleV07XG5cblx0XHQvLyBTa2lwIGlmIHZhbHVlIGlzIHVuY2hhbmdlZCwgdW5sZXNzIGl0J3MgYHVuZGVmaW5lZGAgYW5kIHRoZSBlbGVtZW50IHN0aWxsIGhhcyB0aGUgYXR0cmlidXRlXG5cdFx0aWYgKHZhbHVlID09PSBwcmV2X3ZhbHVlICYmICEodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShrZXkpKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y3VycmVudFtrZXldID0gdmFsdWU7XG5cblx0XHR2YXIgcHJlZml4ID0ga2V5WzBdICsga2V5WzFdOyAvLyB0aGlzIGlzIGZhc3RlciB0aGFuIGtleS5zbGljZSgwLCAyKVxuXHRcdGlmIChwcmVmaXggPT09ICckJCcpIGNvbnRpbnVlO1xuXG5cdFx0aWYgKHByZWZpeCA9PT0gJ29uJykge1xuXHRcdFx0LyoqIEB0eXBlIHt7IGNhcHR1cmU/OiB0cnVlIH19ICovXG5cdFx0XHRjb25zdCBvcHRzID0ge307XG5cdFx0XHRjb25zdCBldmVudF9oYW5kbGVfa2V5ID0gJyQkJyArIGtleTtcblx0XHRcdGxldCBldmVudF9uYW1lID0ga2V5LnNsaWNlKDIpO1xuXHRcdFx0dmFyIGlzX2RlbGVnYXRlZCA9IGNhbl9kZWxlZ2F0ZV9ldmVudChldmVudF9uYW1lKTtcblxuXHRcdFx0aWYgKGlzX2NhcHR1cmVfZXZlbnQoZXZlbnRfbmFtZSkpIHtcblx0XHRcdFx0ZXZlbnRfbmFtZSA9IGV2ZW50X25hbWUuc2xpY2UoMCwgLTcpO1xuXHRcdFx0XHRvcHRzLmNhcHR1cmUgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzX2RlbGVnYXRlZCAmJiBwcmV2X3ZhbHVlKSB7XG5cdFx0XHRcdC8vIExpc3RlbmluZyB0byBzYW1lIGV2ZW50IGJ1dCBkaWZmZXJlbnQgaGFuZGxlciAtPiBvdXIgaGFuZGxlIGZ1bmN0aW9uIGJlbG93IHRha2VzIGNhcmUgb2YgdGhpc1xuXHRcdFx0XHQvLyBJZiB3ZSB3ZXJlIHRvIHJlbW92ZSBhbmQgYWRkIGxpc3RlbmVycyBpbiB0aGlzIGNhc2UsIGl0IGNvdWxkIGhhcHBlbiB0aGF0IHRoZSBldmVudCBpcyBcInN3YWxsb3dlZFwiXG5cdFx0XHRcdC8vICh0aGUgYnJvd3NlciBzZWVtcyB0byBub3Qga25vdyB5ZXQgdGhhdCBhIG5ldyBvbmUgZXhpc3RzIG5vdykgYW5kIGRvZXNuJ3QgcmVhY2ggdGhlIGhhbmRsZXJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9pc3N1ZXMvMTE5MDNcblx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudF9uYW1lLCBjdXJyZW50W2V2ZW50X2hhbmRsZV9rZXldLCBvcHRzKTtcblx0XHRcdFx0Y3VycmVudFtldmVudF9oYW5kbGVfa2V5XSA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc19kZWxlZ2F0ZWQpIHtcblx0XHRcdFx0ZGVsZWdhdGVkKGV2ZW50X25hbWUsIGVsZW1lbnQsIHZhbHVlKTtcblx0XHRcdFx0ZGVsZWdhdGUoW2V2ZW50X25hbWVdKTtcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogQHRoaXMge2FueX1cblx0XHRcdFx0ICogQHBhcmFtIHtFdmVudH0gZXZ0XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRmdW5jdGlvbiBoYW5kbGUoZXZ0KSB7XG5cdFx0XHRcdFx0Y3VycmVudFtrZXldLmNhbGwodGhpcywgZXZ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnJlbnRbZXZlbnRfaGFuZGxlX2tleV0gPSBjcmVhdGVfZXZlbnQoZXZlbnRfbmFtZSwgZWxlbWVudCwgaGFuZGxlLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuXHRcdFx0Ly8gYXZvaWQgdXNpbmcgdGhlIHNldHRlclxuXHRcdFx0c2V0X2F0dHJpYnV0ZShlbGVtZW50LCBrZXksIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ2F1dG9mb2N1cycpIHtcblx0XHRcdGF1dG9mb2N1cygvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAoZWxlbWVudCksIEJvb2xlYW4odmFsdWUpKTtcblx0XHR9IGVsc2UgaWYgKCFpc19jdXN0b21fZWxlbWVudCAmJiAoa2V5ID09PSAnX192YWx1ZScgfHwgKGtleSA9PT0gJ3ZhbHVlJyAmJiB2YWx1ZSAhPSBudWxsKSkpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmUgV2UncmUgbm90IHJ1bm5pbmcgdGhpcyBmb3IgY3VzdG9tIGVsZW1lbnRzIGJlY2F1c2UgX192YWx1ZSBpcyBhY3R1YWxseVxuXHRcdFx0Ly8gaG93IExpdCBzdG9yZXMgdGhlIGN1cnJlbnQgdmFsdWUgb24gdGhlIGVsZW1lbnQsIGFuZCBtZXNzaW5nIHdpdGggdGhhdCB3b3VsZCBicmVhayB0aGluZ3MuXG5cdFx0XHRlbGVtZW50LnZhbHVlID0gZWxlbWVudC5fX3ZhbHVlID0gdmFsdWU7XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09ICdzZWxlY3RlZCcgJiYgaXNfb3B0aW9uX2VsZW1lbnQpIHtcblx0XHRcdHNldF9zZWxlY3RlZCgvKiogQHR5cGUge0hUTUxPcHRpb25FbGVtZW50fSAqLyAoZWxlbWVudCksIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG5hbWUgPSBrZXk7XG5cdFx0XHRpZiAoIXByZXNlcnZlX2F0dHJpYnV0ZV9jYXNlKSB7XG5cdFx0XHRcdG5hbWUgPSBub3JtYWxpemVfYXR0cmlidXRlKG5hbWUpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXNfZGVmYXVsdCA9IG5hbWUgPT09ICdkZWZhdWx0VmFsdWUnIHx8IG5hbWUgPT09ICdkZWZhdWx0Q2hlY2tlZCc7XG5cblx0XHRcdGlmICh2YWx1ZSA9PSBudWxsICYmICFpc19jdXN0b21fZWxlbWVudCAmJiAhaXNfZGVmYXVsdCkge1xuXHRcdFx0XHRhdHRyaWJ1dGVzW2tleV0gPSBudWxsO1xuXG5cdFx0XHRcdGlmIChuYW1lID09PSAndmFsdWUnIHx8IG5hbWUgPT09ICdjaGVja2VkJykge1xuXHRcdFx0XHRcdC8vIHJlbW92aW5nIHZhbHVlL2NoZWNrZWQgYWxzbyByZW1vdmVzIGRlZmF1bHRWYWx1ZS9kZWZhdWx0Q2hlY2tlZCDigJQgcHJlc2VydmVcblx0XHRcdFx0XHRsZXQgaW5wdXQgPSAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovIChlbGVtZW50KTtcblx0XHRcdFx0XHRjb25zdCB1c2VfZGVmYXVsdCA9IHByZXYgPT09IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRpZiAobmFtZSA9PT0gJ3ZhbHVlJykge1xuXHRcdFx0XHRcdFx0bGV0IHByZXZpb3VzID0gaW5wdXQuZGVmYXVsdFZhbHVlO1xuXHRcdFx0XHRcdFx0aW5wdXQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdFx0XHRcdFx0aW5wdXQuZGVmYXVsdFZhbHVlID0gcHJldmlvdXM7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGlucHV0Ll9fdmFsdWUgPSB1c2VfZGVmYXVsdCA/IHByZXZpb3VzIDogbnVsbDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IHByZXZpb3VzID0gaW5wdXQuZGVmYXVsdENoZWNrZWQ7XG5cdFx0XHRcdFx0XHRpbnB1dC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0XHRcdFx0XHRpbnB1dC5kZWZhdWx0Q2hlY2tlZCA9IHByZXZpb3VzO1xuXHRcdFx0XHRcdFx0aW5wdXQuY2hlY2tlZCA9IHVzZV9kZWZhdWx0ID8gcHJldmlvdXMgOiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0aXNfZGVmYXVsdCB8fFxuXHRcdFx0XHQoc2V0dGVycy5pbmNsdWRlcyhuYW1lKSAmJiAoaXNfY3VzdG9tX2VsZW1lbnQgfHwgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykpXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRlbGVtZW50W25hbWVdID0gdmFsdWU7XG5cdFx0XHRcdC8vIHJlbW92ZSBpdCBmcm9tIGF0dHJpYnV0ZXMncyBjYWNoZVxuXHRcdFx0XHRpZiAobmFtZSBpbiBhdHRyaWJ1dGVzKSBhdHRyaWJ1dGVzW25hbWVdID0gVU5JTklUSUFMSVpFRDtcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHNldF9hdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUsIHNraXBfd2FybmluZyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGlzX2h5ZHJhdGluZ19jdXN0b21fZWxlbWVudCkge1xuXHRcdHNldF9oeWRyYXRpbmcodHJ1ZSk7XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQgJiBFbGVtZW50Q1NTSW5saW5lU3R5bGV9IGVsZW1lbnRcbiAqIEBwYXJhbSB7KC4uLmV4cHJlc3Npb25zOiBhbnkpID0+IFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT59IGZuXG4gKiBAcGFyYW0ge0FycmF5PCgpID0+IGFueT59IHN5bmNcbiAqIEBwYXJhbSB7QXJyYXk8KCkgPT4gUHJvbWlzZTxhbnk+Pn0gYXN5bmNcbiAqIEBwYXJhbSB7QmxvY2tlcltdfSBibG9ja2Vyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtjc3NfaGFzaF1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Nob3VsZF9yZW1vdmVfZGVmYXVsdHNdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtza2lwX3dhcm5pbmddXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVfZWZmZWN0KFxuXHRlbGVtZW50LFxuXHRmbixcblx0c3luYyA9IFtdLFxuXHRhc3luYyA9IFtdLFxuXHRibG9ja2VycyA9IFtdLFxuXHRjc3NfaGFzaCxcblx0c2hvdWxkX3JlbW92ZV9kZWZhdWx0cyA9IGZhbHNlLFxuXHRza2lwX3dhcm5pbmcgPSBmYWxzZVxuKSB7XG5cdGZsYXR0ZW4oYmxvY2tlcnMsIHN5bmMsIGFzeW5jLCAodmFsdWVzKSA9PiB7XG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nIHwgc3ltYm9sLCBhbnk+IHwgdW5kZWZpbmVkfSAqL1xuXHRcdHZhciBwcmV2ID0gdW5kZWZpbmVkO1xuXG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3ltYm9sLCBFZmZlY3Q+fSAqL1xuXHRcdHZhciBlZmZlY3RzID0ge307XG5cblx0XHR2YXIgaXNfc2VsZWN0ID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gU0VMRUNUX1RBRztcblx0XHR2YXIgaW5pdGVkID0gZmFsc2U7XG5cblx0XHRtYW5hZ2VkKCgpID0+IHtcblx0XHRcdHZhciBuZXh0ID0gZm4oLi4udmFsdWVzLm1hcChnZXQpKTtcblx0XHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgYW55Pn0gKi9cblx0XHRcdHZhciBjdXJyZW50ID0gc2V0X2F0dHJpYnV0ZXMoXG5cdFx0XHRcdGVsZW1lbnQsXG5cdFx0XHRcdHByZXYsXG5cdFx0XHRcdG5leHQsXG5cdFx0XHRcdGNzc19oYXNoLFxuXHRcdFx0XHRzaG91bGRfcmVtb3ZlX2RlZmF1bHRzLFxuXHRcdFx0XHRza2lwX3dhcm5pbmdcblx0XHRcdCk7XG5cblx0XHRcdGlmIChpbml0ZWQgJiYgaXNfc2VsZWN0ICYmICd2YWx1ZScgaW4gbmV4dCkge1xuXHRcdFx0XHRzZWxlY3Rfb3B0aW9uKC8qKiBAdHlwZSB7SFRNTFNlbGVjdEVsZW1lbnR9ICovIChlbGVtZW50KSwgbmV4dC52YWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IHN5bWJvbCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGVmZmVjdHMpKSB7XG5cdFx0XHRcdGlmICghbmV4dFtzeW1ib2xdKSBkZXN0cm95X2VmZmVjdChlZmZlY3RzW3N5bWJvbF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBzeW1ib2wgb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhuZXh0KSkge1xuXHRcdFx0XHR2YXIgbiA9IG5leHRbc3ltYm9sXTtcblxuXHRcdFx0XHRpZiAoc3ltYm9sLmRlc2NyaXB0aW9uID09PSBBVFRBQ0hNRU5UX0tFWSAmJiAoIXByZXYgfHwgbiAhPT0gcHJldltzeW1ib2xdKSkge1xuXHRcdFx0XHRcdGlmIChlZmZlY3RzW3N5bWJvbF0pIGRlc3Ryb3lfZWZmZWN0KGVmZmVjdHNbc3ltYm9sXSk7XG5cdFx0XHRcdFx0ZWZmZWN0c1tzeW1ib2xdID0gYnJhbmNoKCgpID0+IGF0dGFjaChlbGVtZW50LCAoKSA9PiBuKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyZW50W3N5bWJvbF0gPSBuO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmV2ID0gY3VycmVudDtcblx0XHR9KTtcblxuXHRcdGlmIChpc19zZWxlY3QpIHtcblx0XHRcdHZhciBzZWxlY3QgPSAvKiogQHR5cGUge0hUTUxTZWxlY3RFbGVtZW50fSAqLyAoZWxlbWVudCk7XG5cblx0XHRcdGVmZmVjdCgoKSA9PiB7XG5cdFx0XHRcdHNlbGVjdF9vcHRpb24oc2VsZWN0LCAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcgfCBzeW1ib2wsIGFueT59ICovIChwcmV2KS52YWx1ZSwgdHJ1ZSk7XG5cdFx0XHRcdGluaXRfc2VsZWN0KHNlbGVjdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpbml0ZWQgPSB0cnVlO1xuXHR9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldF9hdHRyaWJ1dGVzKGVsZW1lbnQpIHtcblx0cmV0dXJuIC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj59ICoqLyAoXG5cdFx0LyoqIEB0eXBlIHthbnl9ICovIChlbGVtZW50KVtBVFRSSUJVVEVTX0NBQ0hFXSA/Pz0ge1xuXHRcdFx0W0lTX0NVU1RPTV9FTEVNRU5UXTogZWxlbWVudC5ub2RlTmFtZS5pbmNsdWRlcygnLScpLFxuXHRcdFx0W0lTX0hUTUxdOiBlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gTkFNRVNQQUNFX0hUTUxcblx0XHR9XG5cdCk7XG59XG5cbi8qKiBAdHlwZSB7TWFwPHN0cmluZywgc3RyaW5nW10+fSAqL1xudmFyIHNldHRlcnNfY2FjaGUgPSBuZXcgTWFwKCk7XG5cbi8qKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgKi9cbmZ1bmN0aW9uIGdldF9zZXR0ZXJzKGVsZW1lbnQpIHtcblx0dmFyIGNhY2hlX2tleSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpcycpIHx8IGVsZW1lbnQubm9kZU5hbWU7XG5cdHZhciBzZXR0ZXJzID0gc2V0dGVyc19jYWNoZS5nZXQoY2FjaGVfa2V5KTtcblx0aWYgKHNldHRlcnMpIHJldHVybiBzZXR0ZXJzO1xuXHRzZXR0ZXJzX2NhY2hlLnNldChjYWNoZV9rZXksIChzZXR0ZXJzID0gW10pKTtcblxuXHR2YXIgZGVzY3JpcHRvcnM7XG5cdHZhciBwcm90byA9IGVsZW1lbnQ7IC8vIEluIHRoZSBjYXNlIG9mIGN1c3RvbSBlbGVtZW50cyB0aGVyZSBtaWdodCBiZSBzZXR0ZXJzIG9uIHRoZSBpbnN0YW5jZVxuXHR2YXIgZWxlbWVudF9wcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuXG5cdC8vIFN0b3AgYXQgRWxlbWVudCwgZnJvbSB0aGVyZSBvbiB0aGVyZSdzIG9ubHkgdW5uZWNlc3NhcnkgKGFuZCBkYW5nZXJvdXMsIGxpa2UgaW5uZXJIVE1MKSBzZXR0ZXJzIHdlJ3JlIG5vdCBpbnRlcmVzdGVkIGluXG5cdC8vIERvIG5vdCB1c2UgY29uc3RydWN0b3IubmFtZSBoZXJlIGFzIHRoYXQncyB1bnJlbGlhYmxlIGluIHNvbWUgYnJvd3NlciBlbnZpcm9ubWVudHNcblx0d2hpbGUgKGVsZW1lbnRfcHJvdG8gIT09IHByb3RvKSB7XG5cdFx0ZGVzY3JpcHRvcnMgPSBnZXRfZGVzY3JpcHRvcnMocHJvdG8pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGRlc2NyaXB0b3JzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0uc2V0ICYmXG5cdFx0XHRcdC8vIGJldHRlciBzYWZlIHRoYW4gc29ycnksIHdlIGRvbid0IHdhbnQgc3ByZWFkIGF0dHJpYnV0ZXMgdG8gbWVzcyB3aXRoIEhUTUwgY29udGVudFxuXHRcdFx0XHRrZXkgIT09ICdpbm5lckhUTUwnICYmXG5cdFx0XHRcdGtleSAhPT0gJ3RleHRDb250ZW50JyAmJlxuXHRcdFx0XHRrZXkgIT09ICdpbm5lclRleHQnXG5cdFx0XHQpIHtcblx0XHRcdFx0c2V0dGVycy5wdXNoKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHJvdG8gPSBnZXRfcHJvdG90eXBlX29mKHByb3RvKTtcblx0fVxuXG5cdHJldHVybiBzZXR0ZXJzO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gY2hlY2tfc3JjX2luX2Rldl9oeWRyYXRpb24oZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xuXHRpZiAoIURFVikgcmV0dXJuO1xuXHRpZiAoYXR0cmlidXRlID09PSAnc3Jjc2V0JyAmJiBzcmNzZXRfdXJsX2VxdWFsKGVsZW1lbnQsIHZhbHVlKSkgcmV0dXJuO1xuXHRpZiAoc3JjX3VybF9lcXVhbChlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpID8/ICcnLCB2YWx1ZSkpIHJldHVybjtcblxuXHR3Lmh5ZHJhdGlvbl9hdHRyaWJ1dGVfY2hhbmdlZChcblx0XHRhdHRyaWJ1dGUsXG5cdFx0ZWxlbWVudC5vdXRlckhUTUwucmVwbGFjZShlbGVtZW50LmlubmVySFRNTCwgZWxlbWVudC5pbm5lckhUTUwgJiYgJy4uLicpLFxuXHRcdFN0cmluZyh2YWx1ZSlcblx0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudF9zcmNcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzcmNfdXJsX2VxdWFsKGVsZW1lbnRfc3JjLCB1cmwpIHtcblx0aWYgKGVsZW1lbnRfc3JjID09PSB1cmwpIHJldHVybiB0cnVlO1xuXHRyZXR1cm4gbmV3IFVSTChlbGVtZW50X3NyYywgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZiA9PT0gbmV3IFVSTCh1cmwsIGRvY3VtZW50LmJhc2VVUkkpLmhyZWY7XG59XG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gc3Jjc2V0ICovXG5mdW5jdGlvbiBzcGxpdF9zcmNzZXQoc3Jjc2V0KSB7XG5cdHJldHVybiBzcmNzZXQuc3BsaXQoJywnKS5tYXAoKHNyYykgPT4gc3JjLnRyaW0oKS5zcGxpdCgnICcpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MU291cmNlRWxlbWVudCB8IEhUTUxJbWFnZUVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNzZXRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzcmNzZXRfdXJsX2VxdWFsKGVsZW1lbnQsIHNyY3NldCkge1xuXHR2YXIgZWxlbWVudF91cmxzID0gc3BsaXRfc3Jjc2V0KGVsZW1lbnQuc3Jjc2V0KTtcblx0dmFyIHVybHMgPSBzcGxpdF9zcmNzZXQoc3Jjc2V0KTtcblxuXHRyZXR1cm4gKFxuXHRcdHVybHMubGVuZ3RoID09PSBlbGVtZW50X3VybHMubGVuZ3RoICYmXG5cdFx0dXJscy5ldmVyeShcblx0XHRcdChbdXJsLCB3aWR0aF0sIGkpID0+XG5cdFx0XHRcdHdpZHRoID09PSBlbGVtZW50X3VybHNbaV1bMV0gJiZcblx0XHRcdFx0Ly8gV2UgbmVlZCB0byB0ZXN0IGJvdGggd2F5cyBiZWNhdXNlIFZpdGUgd2lsbCBjcmVhdGUgYW4gYSBmdWxsIFVSTCB3aXRoXG5cdFx0XHRcdC8vIGBuZXcgVVJMKGFzc2V0LCBpbXBvcnQubWV0YS51cmwpLmhyZWZgIGZvciB0aGUgY2xpZW50IHdoZW4gYGJhc2U6ICcuLydgLCBhbmQgdGhlXG5cdFx0XHRcdC8vIHJlbGF0aXZlIFVSTHMgaW5zaWRlIHNyY3NldCBhcmUgbm90IGF1dG9tYXRpY2FsbHkgcmVzb2x2ZWQgdG8gYWJzb2x1dGUgVVJMcyBieVxuXHRcdFx0XHQvLyBicm93c2VycyAoaW4gY29udHJhc3QgdG8gaW1nLnNyYykuIFRoaXMgbWVhbnMgYm90aCBTU1IgYW5kIERPTSBjb2RlIGNvdWxkXG5cdFx0XHRcdC8vIGNvbnRhaW4gcmVsYXRpdmUgb3IgYWJzb2x1dGUgVVJMcy5cblx0XHRcdFx0KHNyY191cmxfZXF1YWwoZWxlbWVudF91cmxzW2ldWzBdLCB1cmwpIHx8IHNyY191cmxfZXF1YWwodXJsLCBlbGVtZW50X3VybHNbaV1bMF0pKVxuXHRcdClcblx0KTtcbn1cbiIsImltcG9ydCB7IGh5ZHJhdGluZywgcmVzZXQsIHNldF9oeWRyYXRlX25vZGUsIHNldF9oeWRyYXRpbmcgfSBmcm9tICcuLi9oeWRyYXRpb24uanMnO1xuaW1wb3J0IHsgY3JlYXRlX2NvbW1lbnQsIGNyZWF0ZV9lbGVtZW50IH0gZnJvbSAnLi4vb3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfdHJ1c3RlZF9odG1sIH0gZnJvbSAnLi4vcmVjb25jaWxlci5qcyc7XG5pbXBvcnQgeyBhdHRhY2ggfSBmcm9tICcuL2F0dGFjaG1lbnRzLmpzJztcblxuLyoqIEB0eXBlIHtib29sZWFuIHwgbnVsbH0gKi9cbmxldCBzdXBwb3J0ZWQgPSBudWxsO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyByaWNoIEhUTUwgY29udGVudCBpbnNpZGUgYDxvcHRpb24+YCBlbGVtZW50cy5cbiAqIE1vZGVybiBicm93c2VycyBwcmVzZXJ2ZSBIVE1MIGVsZW1lbnRzIGluc2lkZSBvcHRpb25zLCB3aGlsZSBvbGRlciBicm93c2Vyc1xuICogc3RyaXAgdGhlbSBkdXJpbmcgcGFyc2luZywgbGVhdmluZyBvbmx5IHRleHQgY29udGVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc19zdXBwb3J0ZWQoKSB7XG5cdGlmIChzdXBwb3J0ZWQgPT09IG51bGwpIHtcblx0XHR2YXIgc2VsZWN0ID0gY3JlYXRlX2VsZW1lbnQoJ3NlbGVjdCcpO1xuXHRcdHNlbGVjdC5pbm5lckhUTUwgPSBjcmVhdGVfdHJ1c3RlZF9odG1sKCc8b3B0aW9uPjxzcGFuPnQ8L3NwYW4+PC9vcHRpb24+Jyk7XG5cdFx0c3VwcG9ydGVkID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoc2VsZWN0LmZpcnN0Q2hpbGQpPy5maXJzdENoaWxkPy5ub2RlVHlwZSA9PT0gMTtcblx0fVxuXG5cdHJldHVybiBzdXBwb3J0ZWQ7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7KG5ld19lbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZH0gdXBkYXRlX2VsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdGVkY29udGVudChlbGVtZW50LCB1cGRhdGVfZWxlbWVudCkge1xuXHQvLyBpZiBpdCdzIG5vdCBzdXBwb3J0ZWQgbm8gbmVlZCBmb3Igc3BlY2lhbCBsb2dpY1xuXHRpZiAoIWlzX3N1cHBvcnRlZCgpKSByZXR1cm47XG5cblx0Ly8gd2UgdXNlIHRoZSBhdHRhY2ggZnVuY3Rpb24gZGlyZWN0bHkganVzdCB0byBtYWtlIHN1cmUgaXMgZXhlY3V0ZWQgd2hlbiBpcyBtb3VudGVkIHRvIHRoZSBkb21cblx0YXR0YWNoKGVsZW1lbnQsICgpID0+ICgpID0+IHtcblx0XHRjb25zdCBzZWxlY3QgPSBlbGVtZW50LmNsb3Nlc3QoJ3NlbGVjdCcpO1xuXHRcdGlmICghc2VsZWN0KSByZXR1cm47XG5cblx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG5cdFx0XHR2YXIgc2VsZWN0ZWQgPSBmYWxzZTtcblxuXHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG5cdFx0XHRcdGlmIChlbnRyeS50YXJnZXQgPT09IGVsZW1lbnQpIHtcblx0XHRcdFx0XHQvLyB0aGUgYDxzZWxlY3RlZGNvbnRlbnQ+YCBhbHJlYWR5IGNoYW5nZWQsIG5vIG5lZWQgdG8gcmVwbGFjZSBpdFxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIHRoZSBjaGFuZ2VzIGRvZXNuJ3QgaW5jbHVkZSB0aGUgc2VsZWN0ZWQgYDxvcHRpb24+YCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG5cdFx0XHRcdHNlbGVjdGVkIHx8PSAhIWVudHJ5LnRhcmdldC5wYXJlbnRFbGVtZW50Py5jbG9zZXN0KCdvcHRpb24nKT8uc2VsZWN0ZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWxlY3RlZCkge1xuXHRcdFx0XHQvLyByZXBsYWNlIHRoZSBgPHNlbGVjdGVkY29udGVudD5gIHdpdGggYSBjbG9uZVxuXHRcdFx0XHRlbGVtZW50LnJlcGxhY2VXaXRoKChlbGVtZW50ID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpKSkpO1xuXHRcdFx0XHR1cGRhdGVfZWxlbWVudChlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdG9ic2VydmVyLm9ic2VydmUoc2VsZWN0LCB7XG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXG5cdFx0XHRjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuXHRcdFx0c3VidHJlZTogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHR9O1xuXHR9KTtcbn1cblxuLyoqXG4gKiBIYW5kbGVzIHJpY2ggSFRNTCBjb250ZW50IGluc2lkZSBgPG9wdGlvbj5gLCBgPG9wdGdyb3VwPmAsIG9yIGA8c2VsZWN0PmAgZWxlbWVudHMgd2l0aCBicm93c2VyLXNwZWNpZmljIGJyYW5jaGluZy5cbiAqIE1vZGVybiBicm93c2VycyBwcmVzZXJ2ZSBIVE1MIGluc2lkZSBvcHRpb25zLCB3aGlsZSBvbGRlciBicm93c2VycyBzdHJpcCBpdCB0byB0ZXh0IG9ubHkuXG4gKlxuICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudCB8IEhUTUxPcHRHcm91cEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBwcm9jZXNzXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IHJpY2hfZm4gRnVuY3Rpb24gdG8gcHJvY2VzcyByaWNoIEhUTUwgY29udGVudCAobW9kZXJuIGJyb3dzZXJzKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3VzdG9taXphYmxlX3NlbGVjdChlbGVtZW50LCByaWNoX2ZuKSB7XG5cdHZhciB3YXNfaHlkcmF0aW5nID0gaHlkcmF0aW5nO1xuXG5cdGlmICghaXNfc3VwcG9ydGVkKCkpIHtcblx0XHRzZXRfaHlkcmF0aW5nKGZhbHNlKTtcblx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG5cdFx0ZWxlbWVudC5hcHBlbmQoY3JlYXRlX2NvbW1lbnQoJycpKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0cmljaF9mbigpO1xuXHR9IGZpbmFsbHkge1xuXHRcdGlmICh3YXNfaHlkcmF0aW5nKSB7XG5cdFx0XHRpZiAoaHlkcmF0aW5nKSB7XG5cdFx0XHRcdHJlc2V0KGVsZW1lbnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0X2h5ZHJhdGluZyh0cnVlKTtcblx0XHRcdFx0c2V0X2h5ZHJhdGVfbm9kZShlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7IGxpc3RlbiB9IGZyb20gJy4vc2hhcmVkLmpzJztcblxuLyoqXG4gKiBAcGFyYW0geyhhY3RpdmVFbGVtZW50OiBFbGVtZW50IHwgbnVsbCkgPT4gdm9pZH0gdXBkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfYWN0aXZlX2VsZW1lbnQodXBkYXRlKSB7XG5cdGxpc3Rlbihkb2N1bWVudCwgWydmb2N1c2luJywgJ2ZvY3Vzb3V0J10sIChldmVudCkgPT4ge1xuXHRcdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSAnZm9jdXNvdXQnICYmIC8qKiBAdHlwZSB7Rm9jdXNFdmVudH0gKi8gKGV2ZW50KS5yZWxhdGVkVGFyZ2V0KSB7XG5cdFx0XHQvLyBUaGUgdGVzdHMgc3RpbGwgcGFzcyBpZiB3ZSByZW1vdmUgdGhpcywgYmVjYXVzZSBvZiBKU0RPTSBsaW1pdGF0aW9ucywgYnV0IGl0IGlzIG5lY2Vzc2FyeVxuXHRcdFx0Ly8gdG8gYXZvaWQgdGVtcG9yYXJpbHkgcmVzZXR0aW5nIHRvIGBkb2N1bWVudC5ib2R5YFxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHVwZGF0ZShkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblx0fSk7XG59XG4iLCIvKiogQGltcG9ydCB7IEJhdGNoIH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcycgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgcmVuZGVyX2VmZmVjdCwgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudCB9IGZyb20gJy4vc2hhcmVkLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vLi4vLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IGlzIH0gZnJvbSAnLi4vLi4vLi4vcHJveHkuanMnO1xuaW1wb3J0IHsgcXVldWVfbWljcm9fdGFzayB9IGZyb20gJy4uLy4uL3Rhc2suanMnO1xuaW1wb3J0IHsgaHlkcmF0aW5nIH0gZnJvbSAnLi4vLi4vaHlkcmF0aW9uLmpzJztcbmltcG9ydCB7IHRpY2ssIHVudHJhY2sgfSBmcm9tICcuLi8uLi8uLi9ydW50aW1lLmpzJztcbmltcG9ydCB7IGN1cnJlbnRfYmF0Y2gsIHByZXZpb3VzX2JhdGNoIH0gZnJvbSAnLi4vLi4vLi4vcmVhY3Rpdml0eS9iYXRjaC5qcyc7XG5pbXBvcnQgeyBhc3luY19tb2RlX2ZsYWcgfSBmcm9tICcuLi8uLi8uLi8uLi9mbGFncy9pbmRleC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICogQHBhcmFtIHsoKSA9PiB1bmtub3dufSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF92YWx1ZShpbnB1dCwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0dmFyIGJhdGNoZXMgPSBuZXcgV2Vha1NldCgpO1xuXG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoaW5wdXQsICdpbnB1dCcsIGFzeW5jIChpc19yZXNldCkgPT4ge1xuXHRcdGlmIChERVYgJiYgaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuXHRcdFx0Ly8gVE9ETyBzaG91bGQgdGhpcyBoYXBwZW4gaW4gcHJvZCB0b28/XG5cdFx0XHRlLmJpbmRfaW52YWxpZF9jaGVja2JveF92YWx1ZSgpO1xuXHRcdH1cblxuXHRcdC8qKiBAdHlwZSB7YW55fSAqL1xuXHRcdHZhciB2YWx1ZSA9IGlzX3Jlc2V0ID8gaW5wdXQuZGVmYXVsdFZhbHVlIDogaW5wdXQudmFsdWU7XG5cdFx0dmFsdWUgPSBpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSA/IHRvX251bWJlcih2YWx1ZSkgOiB2YWx1ZTtcblx0XHRzZXQodmFsdWUpO1xuXG5cdFx0aWYgKGN1cnJlbnRfYmF0Y2ggIT09IG51bGwpIHtcblx0XHRcdGJhdGNoZXMuYWRkKGN1cnJlbnRfYmF0Y2gpO1xuXHRcdH1cblxuXHRcdC8vIEJlY2F1c2UgYHsjZWFjaCAuLi59YCBibG9ja3Mgd29yayBieSB1cGRhdGluZyBzb3VyY2VzIGluc2lkZSB0aGUgZmx1c2gsXG5cdFx0Ly8gd2UgbmVlZCB0byB3YWl0IGEgdGljayBiZWZvcmUgY2hlY2tpbmcgdG8gc2VlIGlmIHdlIHNob3VsZCBmb3JjaWJseVxuXHRcdC8vIHVwZGF0ZSB0aGUgaW5wdXQgYW5kIHJlc2V0IHRoZSBzZWxlY3Rpb24gc3RhdGVcblx0XHRhd2FpdCB0aWNrKCk7XG5cblx0XHQvLyBSZXNwZWN0IGFueSB2YWxpZGF0aW9uIGluIGFjY2Vzc29yc1xuXHRcdGlmICh2YWx1ZSAhPT0gKHZhbHVlID0gZ2V0KCkpKSB7XG5cdFx0XHR2YXIgc3RhcnQgPSBpbnB1dC5zZWxlY3Rpb25TdGFydDtcblx0XHRcdHZhciBlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQ7XG5cdFx0XHR2YXIgbGVuZ3RoID0gaW5wdXQudmFsdWUubGVuZ3RoO1xuXG5cdFx0XHQvLyB0aGUgdmFsdWUgaXMgY29lcmNlZCBvbiBhc3NpZ25tZW50XG5cdFx0XHRpbnB1dC52YWx1ZSA9IHZhbHVlID8/ICcnO1xuXG5cdFx0XHQvLyBSZXN0b3JlIHNlbGVjdGlvblxuXHRcdFx0aWYgKGVuZCAhPT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV3X2xlbmd0aCA9IGlucHV0LnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0Ly8gSWYgY3Vyc29yIHdhcyBhdCBlbmQgYW5kIG5ldyBpbnB1dCBpcyBsb25nZXIsIG1vdmUgY3Vyc29yIHRvIG5ldyBlbmRcblx0XHRcdFx0aWYgKHN0YXJ0ID09PSBlbmQgJiYgZW5kID09PSBsZW5ndGggJiYgbmV3X2xlbmd0aCA+IGxlbmd0aCkge1xuXHRcdFx0XHRcdGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gbmV3X2xlbmd0aDtcblx0XHRcdFx0XHRpbnB1dC5zZWxlY3Rpb25FbmQgPSBuZXdfbGVuZ3RoO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdFx0aW5wdXQuc2VsZWN0aW9uRW5kID0gTWF0aC5taW4oZW5kLCBuZXdfbGVuZ3RoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0aWYgKFxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCxcblx0XHQvLyB0aGVuIHVzZSB0aGUgdXBkYXRlZCB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbnN0ZWFkLlxuXHRcdChoeWRyYXRpbmcgJiYgaW5wdXQuZGVmYXVsdFZhbHVlICE9PSBpbnB1dC52YWx1ZSkgfHxcblx0XHQvLyBJZiBkZWZhdWx0VmFsdWUgaXMgc2V0LCB0aGVuIHZhbHVlID09IGRlZmF1bHRWYWx1ZVxuXHRcdC8vIFRPRE8gU3ZlbHRlIDY6IHJlbW92ZSBpbnB1dC52YWx1ZSBjaGVjayBhbmQgc2V0IHRvIGVtcHR5IHN0cmluZz9cblx0XHQodW50cmFjayhnZXQpID09IG51bGwgJiYgaW5wdXQudmFsdWUpXG5cdCkge1xuXHRcdHNldChpc19udW1iZXJsaWtlX2lucHV0KGlucHV0KSA/IHRvX251bWJlcihpbnB1dC52YWx1ZSkgOiBpbnB1dC52YWx1ZSk7XG5cblx0XHRpZiAoY3VycmVudF9iYXRjaCAhPT0gbnVsbCkge1xuXHRcdFx0YmF0Y2hlcy5hZGQoY3VycmVudF9iYXRjaCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKERFViAmJiBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG5cdFx0XHQvLyBUT0RPIHNob3VsZCB0aGlzIGhhcHBlbiBpbiBwcm9kIHRvbz9cblx0XHRcdGUuYmluZF9pbnZhbGlkX2NoZWNrYm94X3ZhbHVlKCk7XG5cdFx0fVxuXG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cblx0XHRpZiAoaW5wdXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdC8vIEluIHN5bmMgbW9kZSByZW5kZXIgZWZmZWN0cyBhcmUgZXhlY3V0ZWQgZHVyaW5nIHRyZWUgdHJhdmVyc2FsIC0+IG5lZWRzIGN1cnJlbnRfYmF0Y2hcblx0XHRcdC8vIEluIGFzeW5jIG1vZGUgcmVuZGVyIGVmZmVjdHMgYXJlIGZsdXNoZWQgb25jZSBiYXRjaCByZXNvbHZlZCwgYXQgd2hpY2ggcG9pbnQgY3VycmVudF9iYXRjaCBpcyBudWxsIC0+IG5lZWRzIHByZXZpb3VzX2JhdGNoXG5cdFx0XHR2YXIgYmF0Y2ggPSAvKiogQHR5cGUge0JhdGNofSAqLyAoYXN5bmNfbW9kZV9mbGFnID8gcHJldmlvdXNfYmF0Y2ggOiBjdXJyZW50X2JhdGNoKTtcblxuXHRcdFx0Ly8gTmV2ZXIgcmV3cml0ZSB0aGUgY29udGVudHMgb2YgYSBmb2N1c2VkIGlucHV0LiBXZSBjYW4gZ2V0IGhlcmUgaWYsIGZvciBleGFtcGxlLFxuXHRcdFx0Ly8gYW4gdXBkYXRlIGlzIGRlZmVycmVkIGJlY2F1c2Ugb2YgYXN5bmMgd29yayBkZXBlbmRpbmcgb24gdGhlIGlucHV0OlxuXHRcdFx0Ly9cblx0XHRcdC8vIDxpbnB1dCBiaW5kOnZhbHVlPXtxdWVyeX0+XG5cdFx0XHQvLyA8cD57YXdhaXQgZmluZChxdWVyeSl9PC9wPlxuXHRcdFx0aWYgKGJhdGNoZXMuaGFzKGJhdGNoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzX251bWJlcmxpa2VfaW5wdXQoaW5wdXQpICYmIHZhbHVlID09PSB0b19udW1iZXIoaW5wdXQudmFsdWUpKSB7XG5cdFx0XHQvLyBoYW5kbGVzIDAgdnMgMDAgY2FzZSAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzk5NTkpXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGlucHV0LnR5cGUgPT09ICdkYXRlJyAmJiAhdmFsdWUgJiYgIWlucHV0LnZhbHVlKSB7XG5cdFx0XHQvLyBIYW5kbGVzIHRoZSBjYXNlIHdoZXJlIGEgdGVtcG9yYXJpbHkgaW52YWxpZCBkYXRlIGlzIHNldCAod2hpbGUgdHlwaW5nLCBmb3IgZXhhbXBsZSB3aXRoIGEgbGVhZGluZyAwIGZvciB0aGUgZGF5KVxuXHRcdFx0Ly8gYW5kIHByZXZlbnRzIHRoaXMgc3RhdGUgZnJvbSBjbGVhcmluZyB0aGUgb3RoZXIgcGFydHMgb2YgdGhlIGRhdGUgaW5wdXQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy83ODk3KVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGRvbid0IHNldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGlmIGl0J3MgdGhlIHNhbWUgdG8gYWxsb3dcblx0XHQvLyBtaW5sZW5ndGggdG8gd29yayBwcm9wZXJseVxuXHRcdGlmICh2YWx1ZSAhPT0gaW5wdXQudmFsdWUpIHtcblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgdGhlIHZhbHVlIGlzIGNvZXJjZWQgb24gYXNzaWdubWVudFxuXHRcdFx0aW5wdXQudmFsdWUgPSB2YWx1ZSA/PyAnJztcblx0XHR9XG5cdH0pO1xufVxuXG4vKiogQHR5cGUge1NldDxIVE1MSW5wdXRFbGVtZW50W10+fSAqL1xuY29uc3QgcGVuZGluZyA9IG5ldyBTZXQoKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnRbXX0gaW5wdXRzXG4gKiBAcGFyYW0ge251bGwgfCBbbnVtYmVyXX0gZ3JvdXBfaW5kZXhcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gZ2V0XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93bikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfZ3JvdXAoaW5wdXRzLCBncm91cF9pbmRleCwgaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdHZhciBpc19jaGVja2JveCA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xuXHR2YXIgYmluZGluZ19ncm91cCA9IGlucHV0cztcblxuXHQvLyBuZWVkcyB0byBiZSBsZXQgb3IgcmVsYXRlZCBjb2RlIGlzbid0IHRyZWVzaGFrZW4gb3V0IGlmIGl0J3MgYWx3YXlzIGZhbHNlXG5cdGxldCBoeWRyYXRpb25fbWlzbWF0Y2ggPSBmYWxzZTtcblxuXHRpZiAoZ3JvdXBfaW5kZXggIT09IG51bGwpIHtcblx0XHRmb3IgKHZhciBpbmRleCBvZiBncm91cF9pbmRleCkge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0YmluZGluZ19ncm91cCA9IGJpbmRpbmdfZ3JvdXBbaW5kZXhdID8/PSBbXTtcblx0XHR9XG5cdH1cblxuXHRiaW5kaW5nX2dyb3VwLnB1c2goaW5wdXQpO1xuXG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoXG5cdFx0aW5wdXQsXG5cdFx0J2NoYW5nZScsXG5cdFx0KCkgPT4ge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0dmFyIHZhbHVlID0gaW5wdXQuX192YWx1ZTtcblxuXHRcdFx0aWYgKGlzX2NoZWNrYm94KSB7XG5cdFx0XHRcdHZhbHVlID0gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoYmluZGluZ19ncm91cCwgdmFsdWUsIGlucHV0LmNoZWNrZWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRzZXQodmFsdWUpO1xuXHRcdH0sXG5cdFx0Ly8gVE9ETyBiZXR0ZXIgZGVmYXVsdCB2YWx1ZSBoYW5kbGluZ1xuXHRcdCgpID0+IHNldChpc19jaGVja2JveCA/IFtdIDogbnVsbClcblx0KTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBnZXQoKTtcblxuXHRcdC8vIElmIHdlIGFyZSBoeWRyYXRpbmcgYW5kIHRoZSB2YWx1ZSBoYXMgc2luY2UgY2hhbmdlZCwgdGhlbiB1c2UgdGhlIHVwZGF0ZSB2YWx1ZVxuXHRcdC8vIGZyb20gdGhlIGlucHV0IGluc3RlYWQuXG5cdFx0aWYgKGh5ZHJhdGluZyAmJiBpbnB1dC5kZWZhdWx0Q2hlY2tlZCAhPT0gaW5wdXQuY2hlY2tlZCkge1xuXHRcdFx0aHlkcmF0aW9uX21pc21hdGNoID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoaXNfY2hlY2tib3gpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUgfHwgW107XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRpbnB1dC5jaGVja2VkID0gdmFsdWUuaW5jbHVkZXMoaW5wdXQuX192YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGlucHV0LmNoZWNrZWQgPSBpcyhpbnB1dC5fX3ZhbHVlLCB2YWx1ZSk7XG5cdFx0fVxuXHR9KTtcblxuXHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0dmFyIGluZGV4ID0gYmluZGluZ19ncm91cC5pbmRleE9mKGlucHV0KTtcblxuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdGJpbmRpbmdfZ3JvdXAuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmICghcGVuZGluZy5oYXMoYmluZGluZ19ncm91cCkpIHtcblx0XHRwZW5kaW5nLmFkZChiaW5kaW5nX2dyb3VwKTtcblxuXHRcdHF1ZXVlX21pY3JvX3Rhc2soKCkgPT4ge1xuXHRcdFx0Ly8gbmVjZXNzYXJ5IHRvIG1haW50YWluIGJpbmRpbmcgZ3JvdXAgb3JkZXIgaW4gYWxsIGluc2VydGlvbiBzY2VuYXJpb3Ncblx0XHRcdGJpbmRpbmdfZ3JvdXAuc29ydCgoYSwgYikgPT4gKGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYikgPT09IDQgPyAtMSA6IDEpKTtcblx0XHRcdHBlbmRpbmcuZGVsZXRlKGJpbmRpbmdfZ3JvdXApO1xuXHRcdH0pO1xuXHR9XG5cblx0cXVldWVfbWljcm9fdGFzaygoKSA9PiB7XG5cdFx0aWYgKGh5ZHJhdGlvbl9taXNtYXRjaCkge1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHRpZiAoaXNfY2hlY2tib3gpIHtcblx0XHRcdFx0dmFsdWUgPSBnZXRfYmluZGluZ19ncm91cF92YWx1ZShiaW5kaW5nX2dyb3VwLCB2YWx1ZSwgaW5wdXQuY2hlY2tlZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgaHlkcmF0aW9uX2lucHV0ID0gYmluZGluZ19ncm91cC5maW5kKChpbnB1dCkgPT4gaW5wdXQuY2hlY2tlZCk7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0dmFsdWUgPSBoeWRyYXRpb25faW5wdXQ/Ll9fdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHNldCh2YWx1ZSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKiBAcGFyYW0geygpID0+IHVua25vd259IGdldFxuICogQHBhcmFtIHsodmFsdWU6IHVua25vd24pID0+IHZvaWR9IHNldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2NoZWNrZWQoaW5wdXQsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdGxpc3Rlbl90b19ldmVudF9hbmRfcmVzZXRfZXZlbnQoaW5wdXQsICdjaGFuZ2UnLCAoaXNfcmVzZXQpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBpc19yZXNldCA/IGlucHV0LmRlZmF1bHRDaGVja2VkIDogaW5wdXQuY2hlY2tlZDtcblx0XHRzZXQodmFsdWUpO1xuXHR9KTtcblxuXHRpZiAoXG5cdFx0Ly8gSWYgd2UgYXJlIGh5ZHJhdGluZyBhbmQgdGhlIHZhbHVlIGhhcyBzaW5jZSBjaGFuZ2VkLFxuXHRcdC8vIHRoZW4gdXNlIHRoZSB1cGRhdGUgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW5zdGVhZC5cblx0XHQoaHlkcmF0aW5nICYmIGlucHV0LmRlZmF1bHRDaGVja2VkICE9PSBpbnB1dC5jaGVja2VkKSB8fFxuXHRcdC8vIElmIGRlZmF1bHRDaGVja2VkIGlzIHNldCwgdGhlbiBjaGVja2VkID09IGRlZmF1bHRDaGVja2VkXG5cdFx0dW50cmFjayhnZXQpID09IG51bGxcblx0KSB7XG5cdFx0c2V0KGlucHV0LmNoZWNrZWQpO1xuXHR9XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cdFx0aW5wdXQuY2hlY2tlZCA9IEJvb2xlYW4odmFsdWUpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtBcnJheTxIVE1MSW5wdXRFbGVtZW50Pn0gZ3JvdXBcbiAqIEBwYXJhbSB7Vn0gX192YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkXG4gKiBAcmV0dXJucyB7VltdfVxuICovXG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuXHQvKiogQHR5cGUge1NldDxWPn0gKi9cblx0dmFyIHZhbHVlID0gbmV3IFNldCgpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoZ3JvdXBbaV0uY2hlY2tlZCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0dmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdGlmICghY2hlY2tlZCkge1xuXHRcdHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcblx0fVxuXG5cdHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlzX251bWJlcmxpa2VfaW5wdXQoaW5wdXQpIHtcblx0dmFyIHR5cGUgPSBpbnB1dC50eXBlO1xuXHRyZXR1cm4gdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ3JhbmdlJztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqIEBwYXJhbSB7KCkgPT4gRmlsZUxpc3QgfCBudWxsfSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiBGaWxlTGlzdCB8IG51bGwpID0+IHZvaWR9IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9maWxlcyhpbnB1dCwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0bGlzdGVuX3RvX2V2ZW50X2FuZF9yZXNldF9ldmVudChpbnB1dCwgJ2NoYW5nZScsICgpID0+IHtcblx0XHRzZXQoaW5wdXQuZmlsZXMpO1xuXHR9KTtcblxuXHRpZiAoXG5cdFx0Ly8gSWYgd2UgYXJlIGh5ZHJhdGluZyBhbmQgdGhlIHZhbHVlIGhhcyBzaW5jZSBjaGFuZ2VkLFxuXHRcdC8vIHRoZW4gdXNlIHRoZSB1cGRhdGVkIHZhbHVlIGZyb20gdGhlIGlucHV0IGluc3RlYWQuXG5cdFx0aHlkcmF0aW5nICYmXG5cdFx0aW5wdXQuZmlsZXNcblx0KSB7XG5cdFx0c2V0KGlucHV0LmZpbGVzKTtcblx0fVxuXG5cdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdGlucHV0LmZpbGVzID0gZ2V0KCk7XG5cdH0pO1xufVxuIiwiaW1wb3J0IHsgcmVuZGVyX2VmZmVjdCwgZWZmZWN0LCB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICcuL3NoYXJlZC5qcyc7XG5cbi8qKiBAcGFyYW0ge1RpbWVSYW5nZXN9IHJhbmdlcyAqL1xuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG5cdHZhciBhcnJheSA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0YXJyYXkucHVzaCh7IHN0YXJ0OiByYW5nZXMuc3RhcnQoaSksIGVuZDogcmFuZ2VzLmVuZChpKSB9KTtcblx0fVxuXG5cdHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50fSBtZWRpYVxuICogQHBhcmFtIHsoKSA9PiBudW1iZXIgfCB1bmRlZmluZWR9IGdldFxuICogQHBhcmFtIHsodmFsdWU6IG51bWJlcikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfY3VycmVudF90aW1lKG1lZGlhLCBnZXQsIHNldCA9IGdldCkge1xuXHQvKiogQHR5cGUge251bWJlcn0gKi9cblx0dmFyIHJhZl9pZDtcblx0LyoqIEB0eXBlIHtudW1iZXJ9ICovXG5cdHZhciB2YWx1ZTtcblxuXHQvLyBJZGVhbGx5LCBsaXN0ZW5pbmcgdG8gdGltZXVwZGF0ZSB3b3VsZCBiZSBlbm91Z2gsIGJ1dCBpdCBmaXJlcyB0b28gaW5mcmVxdWVudGx5IGZvciB0aGUgY3VycmVudFRpbWVcblx0Ly8gYmluZGluZywgd2hpY2ggaXMgd2h5IHdlIHVzZSBhIHJhZiBsb29wLCB0b28uIFdlIGFkZGl0aW9uYWxseSBzdGlsbCBsaXN0ZW4gdG8gdGltZXVwZGF0ZSBiZWNhdXNlXG5cdC8vIHRoZSB1c2VyIGNvdWxkIGJlIHNjcnViYmluZyB0aHJvdWdoIHRoZSB2aWRlbyB1c2luZyB0aGUgbmF0aXZlIGNvbnRyb2xzIHdoZW4gdGhlIG1lZGlhIGlzIHBhdXNlZC5cblx0dmFyIGNhbGxiYWNrID0gKCkgPT4ge1xuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZl9pZCk7XG5cblx0XHRpZiAoIW1lZGlhLnBhdXNlZCkge1xuXHRcdFx0cmFmX2lkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcblx0XHR9XG5cblx0XHR2YXIgbmV4dF92YWx1ZSA9IG1lZGlhLmN1cnJlbnRUaW1lO1xuXHRcdGlmICh2YWx1ZSAhPT0gbmV4dF92YWx1ZSkge1xuXHRcdFx0c2V0KCh2YWx1ZSA9IG5leHRfdmFsdWUpKTtcblx0XHR9XG5cdH07XG5cblx0cmFmX2lkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcblx0bWVkaWEuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIGNhbGxiYWNrKTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgbmV4dF92YWx1ZSA9IE51bWJlcihnZXQoKSk7XG5cblx0XHRpZiAodmFsdWUgIT09IG5leHRfdmFsdWUgJiYgIWlzTmFOKC8qKiBAdHlwZSB7YW55fSAqLyAobmV4dF92YWx1ZSkpKSB7XG5cdFx0XHRtZWRpYS5jdXJyZW50VGltZSA9IHZhbHVlID0gbmV4dF92YWx1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdHRlYXJkb3duKCgpID0+IHtcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZShyYWZfaWQpO1xuXHRcdG1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBjYWxsYmFjayk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnR9IG1lZGlhXG4gKiBAcGFyYW0geyhhcnJheTogQXJyYXk8eyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9PikgPT4gdm9pZH0gc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX2J1ZmZlcmVkKG1lZGlhLCBzZXQpIHtcblx0LyoqIEB0eXBlIHt7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyOyB9W119ICovXG5cdHZhciBjdXJyZW50O1xuXG5cdC8vIGBidWZmZXJlZGAgY2FuIHVwZGF0ZSB3aXRob3V0IGVtaXR0aW5nIGFueSBldmVudCwgc28gd2UgY2hlY2sgaXQgb24gdmFyaW91cyBldmVudHMuXG5cdC8vIEJ5IHNwZWNzLCBgYnVmZmVyZWRgIGFsd2F5cyByZXR1cm5zIGEgbmV3IG9iamVjdCwgc28gd2UgaGF2ZSB0byBjb21wYXJlIGRlZXBseS5cblx0bGlzdGVuKG1lZGlhLCBbJ2xvYWRlZG1ldGFkYXRhJywgJ3Byb2dyZXNzJywgJ3RpbWV1cGRhdGUnLCAnc2Vla2luZyddLCAoKSA9PiB7XG5cdFx0dmFyIHJhbmdlcyA9IG1lZGlhLmJ1ZmZlcmVkO1xuXG5cdFx0aWYgKFxuXHRcdFx0IWN1cnJlbnQgfHxcblx0XHRcdGN1cnJlbnQubGVuZ3RoICE9PSByYW5nZXMubGVuZ3RoIHx8XG5cdFx0XHRjdXJyZW50LnNvbWUoKHJhbmdlLCBpKSA9PiByYW5nZXMuc3RhcnQoaSkgIT09IHJhbmdlLnN0YXJ0IHx8IHJhbmdlcy5lbmQoaSkgIT09IHJhbmdlLmVuZClcblx0XHQpIHtcblx0XHRcdGN1cnJlbnQgPSB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpO1xuXHRcdFx0c2V0KGN1cnJlbnQpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudH0gbWVkaWFcbiAqIEBwYXJhbSB7KGFycmF5OiBBcnJheTx7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyIH0+KSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfc2Vla2FibGUobWVkaWEsIHNldCkge1xuXHRsaXN0ZW4obWVkaWEsIFsnbG9hZGVkbWV0YWRhdGEnXSwgKCkgPT4gc2V0KHRpbWVfcmFuZ2VzX3RvX2FycmF5KG1lZGlhLnNlZWthYmxlKSkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnR9IG1lZGlhXG4gKiBAcGFyYW0geyhhcnJheTogQXJyYXk8eyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9PikgPT4gdm9pZH0gc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3BsYXllZChtZWRpYSwgc2V0KSB7XG5cdGxpc3RlbihtZWRpYSwgWyd0aW1ldXBkYXRlJ10sICgpID0+IHNldCh0aW1lX3Jhbmdlc190b19hcnJheShtZWRpYS5wbGF5ZWQpKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudH0gbWVkaWFcbiAqIEBwYXJhbSB7KHNlZWtpbmc6IGJvb2xlYW4pID0+IHZvaWR9IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9zZWVraW5nKG1lZGlhLCBzZXQpIHtcblx0bGlzdGVuKG1lZGlhLCBbJ3NlZWtpbmcnLCAnc2Vla2VkJ10sICgpID0+IHNldChtZWRpYS5zZWVraW5nKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MVmlkZW9FbGVtZW50IHwgSFRNTEF1ZGlvRWxlbWVudH0gbWVkaWFcbiAqIEBwYXJhbSB7KHNlZWtpbmc6IGJvb2xlYW4pID0+IHZvaWR9IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9lbmRlZChtZWRpYSwgc2V0KSB7XG5cdGxpc3RlbihtZWRpYSwgWyd0aW1ldXBkYXRlJywgJ2VuZGVkJ10sICgpID0+IHNldChtZWRpYS5lbmRlZCkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnR9IG1lZGlhXG4gKiBAcGFyYW0geyhyZWFkeV9zdGF0ZTogbnVtYmVyKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfcmVhZHlfc3RhdGUobWVkaWEsIHNldCkge1xuXHRsaXN0ZW4oXG5cdFx0bWVkaWEsXG5cdFx0Wydsb2FkZWRtZXRhZGF0YScsICdsb2FkZWRkYXRhJywgJ2NhbnBsYXknLCAnY2FucGxheXRocm91Z2gnLCAncGxheWluZycsICd3YWl0aW5nJywgJ2VtcHRpZWQnXSxcblx0XHQoKSA9PiBzZXQobWVkaWEucmVhZHlTdGF0ZSlcblx0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50fSBtZWRpYVxuICogQHBhcmFtIHsoKSA9PiBudW1iZXIgfCB1bmRlZmluZWR9IGdldFxuICogQHBhcmFtIHsocGxheWJhY2tfcmF0ZTogbnVtYmVyKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfcGxheWJhY2tfcmF0ZShtZWRpYSwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0Ly8gTmVlZHMgdG8gaGFwcGVuIGFmdGVyIGVsZW1lbnQgaXMgaW5zZXJ0ZWQgaW50byB0aGUgZG9tICh3aGljaCBpcyBndWFyYW50ZWVkIGJ5IHVzaW5nIGVmZmVjdCksXG5cdC8vIGVsc2UgcGxheWJhY2sgd2lsbCBiZSBzZXQgYmFjayB0byAxIGJ5IHRoZSBicm93c2VyXG5cdGVmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gTnVtYmVyKGdldCgpKTtcblxuXHRcdGlmICh2YWx1ZSAhPT0gbWVkaWEucGxheWJhY2tSYXRlICYmICFpc05hTih2YWx1ZSkpIHtcblx0XHRcdG1lZGlhLnBsYXliYWNrUmF0ZSA9IHZhbHVlO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gU3RhcnQgbGlzdGVuaW5nIHRvIHJhdGVjaGFuZ2UgZXZlbnRzIGFmdGVyIHRoZSBlbGVtZW50IGlzIGluc2VydGVkIGludG8gdGhlIGRvbSxcblx0Ly8gZWxzZSBwbGF5YmFjayB3aWxsIGJlIHNldCB0byAxIGJ5IHRoZSBicm93c2VyXG5cdGVmZmVjdCgoKSA9PiB7XG5cdFx0bGlzdGVuKG1lZGlhLCBbJ3JhdGVjaGFuZ2UnXSwgKCkgPT4ge1xuXHRcdFx0c2V0KG1lZGlhLnBsYXliYWNrUmF0ZSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnR9IG1lZGlhXG4gKiBAcGFyYW0geygpID0+IGJvb2xlYW4gfCB1bmRlZmluZWR9IGdldFxuICogQHBhcmFtIHsocGF1c2VkOiBib29sZWFuKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfcGF1c2VkKG1lZGlhLCBnZXQsIHNldCA9IGdldCkge1xuXHR2YXIgcGF1c2VkID0gZ2V0KCk7XG5cblx0dmFyIHVwZGF0ZSA9ICgpID0+IHtcblx0XHRpZiAocGF1c2VkICE9PSBtZWRpYS5wYXVzZWQpIHtcblx0XHRcdHNldCgocGF1c2VkID0gbWVkaWEucGF1c2VkKSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIElmIHNvbWVvbmUgc3dpdGNoZXMgdGhlIHNyYyB3aGlsZSBtZWRpYSBpcyBwbGF5aW5nLCB0aGUgcGxheWVyIHdpbGwgcGF1c2UuXG5cdC8vIExpc3RlbiB0byB0aGUgY2FucGxheSBldmVudCB0byBnZXQgbm90aWZpZWQgb2YgdGhpcyBzaXR1YXRpb24uXG5cdGxpc3RlbihtZWRpYSwgWydwbGF5JywgJ3BhdXNlJywgJ2NhbnBsYXknXSwgdXBkYXRlLCBwYXVzZWQgPT0gbnVsbCk7XG5cblx0Ly8gTmVlZHMgdG8gYmUgYW4gZWZmZWN0IHRvIGVuc3VyZSBtZWRpYSBlbGVtZW50IGlzIG1vdW50ZWQ6IGVsc2UsIGlmIHBhdXNlZCBpcyBgZmFsc2VgIChpLmUuIHNob3VsZCBwbGF5IHJpZ2h0IGF3YXkpXG5cdC8vIGEgXCJUaGUgcGxheSgpIHJlcXVlc3Qgd2FzIGludGVycnVwdGVkIGJ5IGEgbmV3IGxvYWQgcmVxdWVzdFwiIGVycm9yIHdvdWxkIGJlIHRocm93biBiZWNhdXNlIHRoZSByZXNvdXJjZSBpc24ndCBsb2FkZWQgeWV0LlxuXHRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmICgocGF1c2VkID0gISFnZXQoKSkgIT09IG1lZGlhLnBhdXNlZCkge1xuXHRcdFx0aWYgKHBhdXNlZCkge1xuXHRcdFx0XHRtZWRpYS5wYXVzZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWVkaWEucGxheSgpLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHNldCgocGF1c2VkID0gdHJ1ZSkpO1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFZpZGVvRWxlbWVudCB8IEhUTUxBdWRpb0VsZW1lbnR9IG1lZGlhXG4gKiBAcGFyYW0geygpID0+IG51bWJlciB8IHVuZGVmaW5lZH0gZ2V0XG4gKiBAcGFyYW0geyh2b2x1bWU6IG51bWJlcikgPT4gdm9pZH0gc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3ZvbHVtZShtZWRpYSwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0dmFyIGNhbGxiYWNrID0gKCkgPT4ge1xuXHRcdHNldChtZWRpYS52b2x1bWUpO1xuXHR9O1xuXG5cdGlmIChnZXQoKSA9PSBudWxsKSB7XG5cdFx0Y2FsbGJhY2soKTtcblx0fVxuXG5cdGxpc3RlbihtZWRpYSwgWyd2b2x1bWVjaGFuZ2UnXSwgY2FsbGJhY2ssIGZhbHNlKTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgdmFsdWUgPSBOdW1iZXIoZ2V0KCkpO1xuXG5cdFx0aWYgKHZhbHVlICE9PSBtZWRpYS52b2x1bWUgJiYgIWlzTmFOKHZhbHVlKSkge1xuXHRcdFx0bWVkaWEudm9sdW1lID0gdmFsdWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxWaWRlb0VsZW1lbnQgfCBIVE1MQXVkaW9FbGVtZW50fSBtZWRpYVxuICogQHBhcmFtIHsoKSA9PiBib29sZWFuIHwgdW5kZWZpbmVkfSBnZXRcbiAqIEBwYXJhbSB7KG11dGVkOiBib29sZWFuKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfbXV0ZWQobWVkaWEsIGdldCwgc2V0ID0gZ2V0KSB7XG5cdHZhciBjYWxsYmFjayA9ICgpID0+IHtcblx0XHRzZXQobWVkaWEubXV0ZWQpO1xuXHR9O1xuXG5cdGlmIChnZXQoKSA9PSBudWxsKSB7XG5cdFx0Y2FsbGJhY2soKTtcblx0fVxuXG5cdGxpc3RlbihtZWRpYSwgWyd2b2x1bWVjaGFuZ2UnXSwgY2FsbGJhY2ssIGZhbHNlKTtcblxuXHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHR2YXIgdmFsdWUgPSAhIWdldCgpO1xuXG5cdFx0aWYgKG1lZGlhLm11dGVkICE9PSB2YWx1ZSkgbWVkaWEubXV0ZWQgPSB2YWx1ZTtcblx0fSk7XG59XG4iLCJpbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICcuL3NoYXJlZC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsob25saW5lOiBib29sZWFuKSA9PiB2b2lkfSB1cGRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9vbmxpbmUodXBkYXRlKSB7XG5cdGxpc3Rlbih3aW5kb3csIFsnb25saW5lJywgJ29mZmxpbmUnXSwgKCkgPT4ge1xuXHRcdHVwZGF0ZShuYXZpZ2F0b3Iub25MaW5lKTtcblx0fSk7XG59XG4iLCJpbXBvcnQgeyB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBnZXRfZGVzY3JpcHRvciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5cbi8qKlxuICogTWFrZXMgYW4gYGV4cG9ydGBlZCAobm9uLXByb3ApIHZhcmlhYmxlIGF2YWlsYWJsZSBvbiB0aGUgYCQkcHJvcHNgIG9iamVjdFxuICogc28gdGhhdCBjb25zdW1lcnMgY2FuIGRvIGBiaW5kOnhgIG9uIHRoZSBjb21wb25lbnQuXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge1Z9IHZhbHVlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfcHJvcChwcm9wcywgcHJvcCwgdmFsdWUpIHtcblx0dmFyIGRlc2MgPSBnZXRfZGVzY3JpcHRvcihwcm9wcywgcHJvcCk7XG5cblx0aWYgKGRlc2MgJiYgZGVzYy5zZXQpIHtcblx0XHRwcm9wc1twcm9wXSA9IHZhbHVlO1xuXHRcdHRlYXJkb3duKCgpID0+IHtcblx0XHRcdHByb3BzW3Byb3BdID0gbnVsbDtcblx0XHR9KTtcblx0fVxufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyB1bnRyYWNrIH0gZnJvbSAnLi4vLi4vLi4vcnVudGltZS5qcyc7XG5cbi8qKlxuICogV2UgY3JlYXRlIG9uZSBsaXN0ZW5lciBmb3IgYWxsIGVsZW1lbnRzXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2EvY2hyb21pdW0ub3JnL2cvYmxpbmstZGV2L2MvejZpZW5PTlViNUEvbS9GNS1WY1VadEJBQUogRXhwbGFuYXRpb259XG4gKi9cbmNsYXNzIFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uIHtcblx0LyoqICovXG5cdCNsaXN0ZW5lcnMgPSBuZXcgV2Vha01hcCgpO1xuXG5cdC8qKiBAdHlwZSB7UmVzaXplT2JzZXJ2ZXIgfCB1bmRlZmluZWR9ICovXG5cdCNvYnNlcnZlcjtcblxuXHQvKiogQHR5cGUge1Jlc2l6ZU9ic2VydmVyT3B0aW9uc30gKi9cblx0I29wdGlvbnM7XG5cblx0LyoqIEBzdGF0aWMgKi9cblx0c3RhdGljIGVudHJpZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5cdC8qKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyT3B0aW9uc30gb3B0aW9ucyAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy4jb3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7KGVudHJ5OiBSZXNpemVPYnNlcnZlckVudHJ5KSA9PiBhbnl9IGxpc3RlbmVyXG5cdCAqL1xuXHRvYnNlcnZlKGVsZW1lbnQsIGxpc3RlbmVyKSB7XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuI2xpc3RlbmVycy5nZXQoZWxlbWVudCkgfHwgbmV3IFNldCgpO1xuXHRcdGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuXG5cdFx0dGhpcy4jbGlzdGVuZXJzLnNldChlbGVtZW50LCBsaXN0ZW5lcnMpO1xuXHRcdHRoaXMuI2dldE9ic2VydmVyKCkub2JzZXJ2ZShlbGVtZW50LCB0aGlzLiNvcHRpb25zKTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy4jbGlzdGVuZXJzLmdldChlbGVtZW50KTtcblx0XHRcdGxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuXG5cdFx0XHRpZiAobGlzdGVuZXJzLnNpemUgPT09IDApIHtcblx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmRlbGV0ZShlbGVtZW50KTtcblx0XHRcdFx0LyoqIEB0eXBlIHtSZXNpemVPYnNlcnZlcn0gKi8gKHRoaXMuI29ic2VydmVyKS51bm9ic2VydmUoZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdCNnZXRPYnNlcnZlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy4jb2JzZXJ2ZXIgPz9cblx0XHRcdCh0aGlzLiNvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihcblx0XHRcdFx0LyoqIEBwYXJhbSB7YW55fSBlbnRyaWVzICovIChlbnRyaWVzKSA9PiB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgZW50cnkgb2YgZW50cmllcykge1xuXHRcdFx0XHRcdFx0UmVzaXplT2JzZXJ2ZXJTaW5nbGV0b24uZW50cmllcy5zZXQoZW50cnkudGFyZ2V0LCBlbnRyeSk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBsaXN0ZW5lciBvZiB0aGlzLiNsaXN0ZW5lcnMuZ2V0KGVudHJ5LnRhcmdldCkgfHwgW10pIHtcblx0XHRcdFx0XHRcdFx0bGlzdGVuZXIoZW50cnkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KSlcblx0XHQpO1xuXHR9XG59XG5cbnZhciByZXNpemVfb2JzZXJ2ZXJfY29udGVudF9ib3ggPSAvKiBAX19QVVJFX18gKi8gbmV3IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uKHtcblx0Ym94OiAnY29udGVudC1ib3gnXG59KTtcblxudmFyIHJlc2l6ZV9vYnNlcnZlcl9ib3JkZXJfYm94ID0gLyogQF9fUFVSRV9fICovIG5ldyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbih7XG5cdGJveDogJ2JvcmRlci1ib3gnXG59KTtcblxudmFyIHJlc2l6ZV9vYnNlcnZlcl9kZXZpY2VfcGl4ZWxfY29udGVudF9ib3ggPSAvKiBAX19QVVJFX18gKi8gbmV3IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uKHtcblx0Ym94OiAnZGV2aWNlLXBpeGVsLWNvbnRlbnQtYm94J1xufSk7XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0geydjb250ZW50UmVjdCcgfCAnY29udGVudEJveFNpemUnIHwgJ2JvcmRlckJveFNpemUnIHwgJ2RldmljZVBpeGVsQ29udGVudEJveFNpemUnfSB0eXBlXG4gKiBAcGFyYW0geyhlbnRyeToga2V5b2YgUmVzaXplT2JzZXJ2ZXJFbnRyeSkgPT4gdm9pZH0gc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3Jlc2l6ZV9vYnNlcnZlcihlbGVtZW50LCB0eXBlLCBzZXQpIHtcblx0dmFyIG9ic2VydmVyID1cblx0XHR0eXBlID09PSAnY29udGVudFJlY3QnIHx8IHR5cGUgPT09ICdjb250ZW50Qm94U2l6ZSdcblx0XHRcdD8gcmVzaXplX29ic2VydmVyX2NvbnRlbnRfYm94XG5cdFx0XHQ6IHR5cGUgPT09ICdib3JkZXJCb3hTaXplJ1xuXHRcdFx0XHQ/IHJlc2l6ZV9vYnNlcnZlcl9ib3JkZXJfYm94XG5cdFx0XHRcdDogcmVzaXplX29ic2VydmVyX2RldmljZV9waXhlbF9jb250ZW50X2JveDtcblxuXHR2YXIgdW5zdWIgPSBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIC8qKiBAcGFyYW0ge2FueX0gZW50cnkgKi8gKGVudHJ5KSA9PiBzZXQoZW50cnlbdHlwZV0pKTtcblx0dGVhcmRvd24odW5zdWIpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7J2NsaWVudFdpZHRoJyB8ICdjbGllbnRIZWlnaHQnIHwgJ29mZnNldFdpZHRoJyB8ICdvZmZzZXRIZWlnaHQnfSB0eXBlXG4gKiBAcGFyYW0geyhzaXplOiBudW1iZXIpID0+IHZvaWR9IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9lbGVtZW50X3NpemUoZWxlbWVudCwgdHlwZSwgc2V0KSB7XG5cdHZhciB1bnN1YiA9IHJlc2l6ZV9vYnNlcnZlcl9ib3JkZXJfYm94Lm9ic2VydmUoZWxlbWVudCwgKCkgPT4gc2V0KGVsZW1lbnRbdHlwZV0pKTtcblxuXHRlZmZlY3QoKCkgPT4ge1xuXHRcdC8vIFRoZSB1cGRhdGUgY291bGQgY29udGFpbiByZWFkcyB3aGljaCBzaG91bGQgYmUgaWdub3JlZFxuXHRcdHVudHJhY2soKCkgPT4gc2V0KGVsZW1lbnRbdHlwZV0pKTtcblx0XHRyZXR1cm4gdW5zdWI7XG5cdH0pO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBDb21wb25lbnRDb250ZXh0LCBFZmZlY3QgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVTVFJPWUlORywgU1RBVEVfU1lNQk9MIH0gZnJvbSAnI2NsaWVudC9jb25zdGFudHMnO1xuaW1wb3J0IHsgY29tcG9uZW50X2NvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IGVmZmVjdCwgcmVuZGVyX2VmZmVjdCB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBhY3RpdmVfZWZmZWN0LCB1bnRyYWNrIH0gZnJvbSAnLi4vLi4vLi4vcnVudGltZS5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IGJvdW5kX3ZhbHVlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRfb3JfY29tcG9uZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNfYm91bmRfdGhpcyhib3VuZF92YWx1ZSwgZWxlbWVudF9vcl9jb21wb25lbnQpIHtcblx0cmV0dXJuIChcblx0XHRib3VuZF92YWx1ZSA9PT0gZWxlbWVudF9vcl9jb21wb25lbnQgfHwgYm91bmRfdmFsdWU/LltTVEFURV9TWU1CT0xdID09PSBlbGVtZW50X29yX2NvbXBvbmVudFxuXHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBlbGVtZW50X29yX2NvbXBvbmVudFxuICogQHBhcmFtIHsodmFsdWU6IHVua25vd24sIC4uLnBhcnRzOiB1bmtub3duW10pID0+IHZvaWR9IHVwZGF0ZVxuICogQHBhcmFtIHsoLi4ucGFydHM6IHVua25vd25bXSkgPT4gdW5rbm93bn0gZ2V0X3ZhbHVlXG4gKiBAcGFyYW0geygpID0+IHVua25vd25bXX0gW2dldF9wYXJ0c10gU2V0IGlmIHRoZSB0aGlzIGJpbmRpbmcgaXMgdXNlZCBpbnNpZGUgYW4gZWFjaCBibG9jayxcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJucyBhbGwgdGhlIHBhcnRzIG9mIHRoZSBlYWNoIGJsb2NrIGNvbnRleHQgdGhhdCBhcmUgdXNlZCBpbiB0aGUgZXhwcmVzc2lvblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3RoaXMoZWxlbWVudF9vcl9jb21wb25lbnQgPSB7fSwgdXBkYXRlLCBnZXRfdmFsdWUsIGdldF9wYXJ0cykge1xuXHR2YXIgY29tcG9uZW50X2VmZmVjdCA9IC8qKiBAdHlwZSB7Q29tcG9uZW50Q29udGV4dH0gKi8gKGNvbXBvbmVudF9jb250ZXh0KS5yO1xuXHR2YXIgcGFyZW50ID0gLyoqIEB0eXBlIHtFZmZlY3R9ICovIChhY3RpdmVfZWZmZWN0KTtcblxuXHRlZmZlY3QoKCkgPT4ge1xuXHRcdC8qKiBAdHlwZSB7dW5rbm93bltdfSAqL1xuXHRcdHZhciBvbGRfcGFydHM7XG5cblx0XHQvKiogQHR5cGUge3Vua25vd25bXX0gKi9cblx0XHR2YXIgcGFydHM7XG5cblx0XHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHRcdG9sZF9wYXJ0cyA9IHBhcnRzO1xuXHRcdFx0Ly8gV2Ugb25seSB0cmFjayBjaGFuZ2VzIHRvIHRoZSBwYXJ0cywgbm90IHRoZSB2YWx1ZSBpdHNlbGYgdG8gYXZvaWQgdW5uZWNlc3NhcnkgcmVydW5zLlxuXHRcdFx0cGFydHMgPSBnZXRfcGFydHM/LigpIHx8IFtdO1xuXG5cdFx0XHR1bnRyYWNrKCgpID0+IHtcblx0XHRcdFx0aWYgKCFpc19ib3VuZF90aGlzKGdldF92YWx1ZSguLi5wYXJ0cyksIGVsZW1lbnRfb3JfY29tcG9uZW50KSkge1xuXHRcdFx0XHRcdHVwZGF0ZShlbGVtZW50X29yX2NvbXBvbmVudCwgLi4ucGFydHMpO1xuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYW4gZWZmZWN0IHJlcnVuIChjYXVzZTogZWFjaCBibG9jayBjb250ZXh0IGNoYW5nZXMpLCB0aGVuIG51bGxpZnkgdGhlIGJpbmRpbmcgYXRcblx0XHRcdFx0XHQvLyB0aGUgcHJldmlvdXMgcG9zaXRpb24gaWYgaXQgaXNuJ3QgYWxyZWFkeSB0YWtlbiBvdmVyIGJ5IGEgZGlmZmVyZW50IGVmZmVjdC5cblx0XHRcdFx0XHRpZiAob2xkX3BhcnRzICYmIGlzX2JvdW5kX3RoaXMoZ2V0X3ZhbHVlKC4uLm9sZF9wYXJ0cyksIGVsZW1lbnRfb3JfY29tcG9uZW50KSkge1xuXHRcdFx0XHRcdFx0dXBkYXRlKG51bGwsIC4uLm9sZF9wYXJ0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHQvLyBXaGVuIHRoZSBiaW5kOnRoaXMgZWZmZWN0IGlzIGRlc3Ryb3llZCwgd2UgZ28gdXAgdGhlIGVmZmVjdCBwYXJlbnQgY2hhaW4gdW50aWwgd2UgZmluZCB0aGUgbGFzdCBwYXJlbnQgZWZmZWN0IHRoYXQgaXMgZGVzdHJveWVkLFxuXHRcdFx0Ly8gb3IgdGhlIGVmZmVjdCBjb250YWluaW5nIHRoZSBjb21wb25lbnQgYmluZDp0aGlzIGlzIGluICh3aGljaGV2ZXIgY29tZXMgZmlyc3QpLiBUaGF0IHdheSB3ZSBjYW4gdGltZSB0aGUgbnVsbGluZyBvZiB0aGUgYmluZGluZ1xuXHRcdFx0Ly8gYXMgY2xvc2UgdG8gdXNlci9kZXZlbG9wZXIgZXhwZWN0YXRpb24gYXMgcG9zc2libGUuXG5cdFx0XHQvLyBUT0RPIFN2ZWx0ZSA2OiBEZWNpZGUgaWYgd2Ugd2FudCB0byBrZWVwIHRoaXMgbG9naWMgb3IganVzdCBhbHdheXMgbnVsbCB0aGUgYmluZGluZyBpbiB0aGUgY29tcG9uZW50IGVmZmVjdCdzIHRlYXJkb3duXG5cdFx0XHQvLyAod2hpY2ggd291bGQgYmUgc2ltcGxlciwgYnV0IGxlc3MgaW50dWl0aXZlIGluIHNvbWUgY2FzZXMsIGFuZCBicmVha3MgdGhlIGBvbmRlc3Ryb3ktYmVmb3JlLWNsZWFudXBgIHRlc3QpXG5cdFx0XHRsZXQgcCA9IHBhcmVudDtcblx0XHRcdHdoaWxlIChwICE9PSBjb21wb25lbnRfZWZmZWN0ICYmIHAucGFyZW50ICE9PSBudWxsICYmIHAucGFyZW50LmYgJiBERVNUUk9ZSU5HKSB7XG5cdFx0XHRcdHAgPSBwLnBhcmVudDtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHRlYXJkb3duID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAocGFydHMgJiYgaXNfYm91bmRfdGhpcyhnZXRfdmFsdWUoLi4ucGFydHMpLCBlbGVtZW50X29yX2NvbXBvbmVudCkpIHtcblx0XHRcdFx0XHR1cGRhdGUobnVsbCwgLi4ucGFydHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3Qgb3JpZ2luYWxfdGVhcmRvd24gPSBwLnRlYXJkb3duO1xuXHRcdFx0cC50ZWFyZG93biA9ICgpID0+IHtcblx0XHRcdFx0dGVhcmRvd24oKTtcblx0XHRcdFx0b3JpZ2luYWxfdGVhcmRvd24/LigpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9KTtcblxuXHRyZXR1cm4gZWxlbWVudF9vcl9jb21wb25lbnQ7XG59XG4iLCJpbXBvcnQgeyByZW5kZXJfZWZmZWN0LCB0ZWFyZG93biB9IGZyb20gJy4uLy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICcuL3NoYXJlZC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsnaW5uZXJIVE1MJyB8ICd0ZXh0Q29udGVudCcgfCAnaW5uZXJUZXh0J30gcHJvcGVydHlcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gZ2V0XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93bikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfY29udGVudF9lZGl0YWJsZShwcm9wZXJ0eSwgZWxlbWVudCwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0c2V0KGVsZW1lbnRbcHJvcGVydHldKTtcblx0fSk7XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIHZhbHVlID0gZ2V0KCk7XG5cblx0XHRpZiAoZWxlbWVudFtwcm9wZXJ0eV0gIT09IHZhbHVlKSB7XG5cdFx0XHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHZhciBub25fbnVsbF92YWx1ZSA9IGVsZW1lbnRbcHJvcGVydHldO1xuXHRcdFx0XHRzZXQobm9uX251bGxfdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRlbGVtZW50W3Byb3BlcnR5XSA9IHZhbHVlICsgJyc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9uYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7KHZhbHVlOiB1bmtub3duKSA9PiB2b2lkfSBzZXRcbiAqIEBwYXJhbSB7KCkgPT4gdW5rbm93bn0gW2dldF1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZF9wcm9wZXJ0eShwcm9wZXJ0eSwgZXZlbnRfbmFtZSwgZWxlbWVudCwgc2V0LCBnZXQpIHtcblx0dmFyIGhhbmRsZXIgPSAoKSA9PiB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHNldChlbGVtZW50W3Byb3BlcnR5XSk7XG5cdH07XG5cblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50X25hbWUsIGhhbmRsZXIpO1xuXG5cdGlmIChnZXQpIHtcblx0XHRyZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGVsZW1lbnRbcHJvcGVydHldID0gZ2V0KCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0aGFuZGxlcigpO1xuXHR9XG5cblx0Ly8gQHRzLWlnbm9yZVxuXHRpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSB8fCBlbGVtZW50ID09PSB3aW5kb3cgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcblx0XHR0ZWFyZG93bigoKSA9PiB7XG5cdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRfbmFtZSwgaGFuZGxlcik7XG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0geyh2YWx1ZTogdW5rbm93bikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfZm9jdXNlZChlbGVtZW50LCBzZXQpIHtcblx0bGlzdGVuKGVsZW1lbnQsIFsnZm9jdXMnLCAnYmx1ciddLCAoKSA9PiB7XG5cdFx0c2V0KGVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXHR9KTtcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgcmVuZGVyX2VmZmVjdCwgdGVhcmRvd24gfSBmcm9tICcuLi8uLi8uLi9yZWFjdGl2aXR5L2VmZmVjdHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuLCB3aXRob3V0X3JlYWN0aXZlX2NvbnRleHQgfSBmcm9tICcuL3NoYXJlZC5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsneCcgfCAneSd9IHR5cGVcbiAqIEBwYXJhbSB7KCkgPT4gbnVtYmVyfSBnZXRcbiAqIEBwYXJhbSB7KHZhbHVlOiBudW1iZXIpID0+IHZvaWR9IHNldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kX3dpbmRvd19zY3JvbGwodHlwZSwgZ2V0LCBzZXQgPSBnZXQpIHtcblx0dmFyIGlzX3Njcm9sbGluZ194ID0gdHlwZSA9PT0gJ3gnO1xuXG5cdHZhciB0YXJnZXRfaGFuZGxlciA9ICgpID0+XG5cdFx0d2l0aG91dF9yZWFjdGl2ZV9jb250ZXh0KCgpID0+IHtcblx0XHRcdHNjcm9sbGluZyA9IHRydWU7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhciwgMTAwKTsgLy8gVE9ETyB1c2Ugc2Nyb2xsZW5kIGV2ZW50IGlmIHN1cHBvcnRlZCAob3Igd2hlbiBzdXBwb3J0ZWQgZXZlcnl3aGVyZT8pXG5cblx0XHRcdHNldCh3aW5kb3dbaXNfc2Nyb2xsaW5nX3ggPyAnc2Nyb2xsWCcgOiAnc2Nyb2xsWSddKTtcblx0XHR9KTtcblxuXHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0YXJnZXRfaGFuZGxlciwge1xuXHRcdHBhc3NpdmU6IHRydWVcblx0fSk7XG5cblx0dmFyIHNjcm9sbGluZyA9IGZhbHNlO1xuXG5cdC8qKiBAdHlwZSB7UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD59ICovXG5cdHZhciB0aW1lb3V0O1xuXHR2YXIgY2xlYXIgPSAoKSA9PiB7XG5cdFx0c2Nyb2xsaW5nID0gZmFsc2U7XG5cdH07XG5cdHZhciBmaXJzdCA9IHRydWU7XG5cblx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0dmFyIGxhdGVzdF92YWx1ZSA9IGdldCgpO1xuXHRcdC8vIERvbid0IHNjcm9sbCB0byB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgYWNjZXNzaWJpbGl0eSByZWFzb25zXG5cdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoIXNjcm9sbGluZyAmJiBsYXRlc3RfdmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0c2Nyb2xsaW5nID0gdHJ1ZTtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdGlmIChpc19zY3JvbGxpbmdfeCkge1xuXHRcdFx0XHRzY3JvbGxUbyhsYXRlc3RfdmFsdWUsIHdpbmRvdy5zY3JvbGxZKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjcm9sbFRvKHdpbmRvdy5zY3JvbGxYLCBsYXRlc3RfdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoY2xlYXIsIDEwMCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBCcm93c2VycyBkb24ndCBmaXJlIHRoZSBzY3JvbGwgZXZlbnQgZm9yIHRoZSBpbml0aWFsIHNjcm9sbCBwb3NpdGlvbiB3aGVuIHNjcm9sbCBzdHlsZSBpc24ndCBzZXQgdG8gc21vb3RoXG5cdGVmZmVjdCh0YXJnZXRfaGFuZGxlcik7XG5cblx0dGVhcmRvd24oKCkgPT4ge1xuXHRcdHJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRhcmdldF9oYW5kbGVyKTtcblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsnaW5uZXJXaWR0aCcgfCAnaW5uZXJIZWlnaHQnIHwgJ291dGVyV2lkdGgnIHwgJ291dGVySGVpZ2h0J30gdHlwZVxuICogQHBhcmFtIHsoc2l6ZTogbnVtYmVyKSA9PiB2b2lkfSBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRfd2luZG93X3NpemUodHlwZSwgc2V0KSB7XG5cdGxpc3Rlbih3aW5kb3csIFsncmVzaXplJ10sICgpID0+IHdpdGhvdXRfcmVhY3RpdmVfY29udGV4dCgoKSA9PiBzZXQod2luZG93W3R5cGVdKSkpO1xufVxuIiwiLyoqIEBpbXBvcnQgeyBDb21wb25lbnRDb250ZXh0TGVnYWN5IH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IHJ1biwgcnVuX2FsbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBjb21wb25lbnRfY29udGV4dCB9IGZyb20gJy4uLy4uL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgZGVyaXZlZCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZGVyaXZlZHMuanMnO1xuaW1wb3J0IHsgdXNlcl9wcmVfZWZmZWN0LCB1c2VyX2VmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBkZWVwX3JlYWRfc3RhdGUsIGdldCwgdW50cmFjayB9IGZyb20gJy4uLy4uL3J1bnRpbWUuanMnO1xuXG4vKipcbiAqIExlZ2FjeS1tb2RlIG9ubHk6IENhbGwgYG9uTW91bnRgIGNhbGxiYWNrcyBhbmQgc2V0IHVwIGBiZWZvcmVVcGRhdGVgL2BhZnRlclVwZGF0ZWAgZWZmZWN0c1xuICogQHBhcmFtIHtib29sZWFufSBbaW1tdXRhYmxlXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdChpbW11dGFibGUgPSBmYWxzZSkge1xuXHRjb25zdCBjb250ZXh0ID0gLyoqIEB0eXBlIHtDb21wb25lbnRDb250ZXh0TGVnYWN5fSAqLyAoY29tcG9uZW50X2NvbnRleHQpO1xuXG5cdGNvbnN0IGNhbGxiYWNrcyA9IGNvbnRleHQubC51O1xuXHRpZiAoIWNhbGxiYWNrcykgcmV0dXJuO1xuXG5cdGxldCBwcm9wcyA9ICgpID0+IGRlZXBfcmVhZF9zdGF0ZShjb250ZXh0LnMpO1xuXG5cdGlmIChpbW11dGFibGUpIHtcblx0XHRsZXQgdmVyc2lvbiA9IDA7XG5cdFx0bGV0IHByZXYgPSAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIGFueT59ICovICh7fSk7XG5cblx0XHQvLyBJbiBsZWdhY3kgaW1tdXRhYmxlIG1vZGUsIGJlZm9yZS9hZnRlclVwZGF0ZSBvbmx5IGZpcmUgaWYgdGhlIG9iamVjdCBpZGVudGl0eSBvZiBhIHByb3AgY2hhbmdlc1xuXHRcdGNvbnN0IGQgPSBkZXJpdmVkKCgpID0+IHtcblx0XHRcdGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwcm9wcyA9IGNvbnRleHQucztcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG5cdFx0XHRcdGlmIChwcm9wc1trZXldICE9PSBwcmV2W2tleV0pIHtcblx0XHRcdFx0XHRwcmV2W2tleV0gPSBwcm9wc1trZXldO1xuXHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hhbmdlZCkgdmVyc2lvbisrO1xuXHRcdFx0cmV0dXJuIHZlcnNpb247XG5cdFx0fSk7XG5cblx0XHRwcm9wcyA9ICgpID0+IGdldChkKTtcblx0fVxuXG5cdC8vIGJlZm9yZVVwZGF0ZVxuXHRpZiAoY2FsbGJhY2tzLmIubGVuZ3RoKSB7XG5cdFx0dXNlcl9wcmVfZWZmZWN0KCgpID0+IHtcblx0XHRcdG9ic2VydmVfYWxsKGNvbnRleHQsIHByb3BzKTtcblx0XHRcdHJ1bl9hbGwoY2FsbGJhY2tzLmIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gb25Nb3VudCAobXVzdCBydW4gYmVmb3JlIGFmdGVyVXBkYXRlKVxuXHR1c2VyX2VmZmVjdCgoKSA9PiB7XG5cdFx0Y29uc3QgZm5zID0gdW50cmFjaygoKSA9PiBjYWxsYmFja3MubS5tYXAocnVuKSk7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGZvciAoY29uc3QgZm4gb2YgZm5zKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRmbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gYWZ0ZXJVcGRhdGVcblx0aWYgKGNhbGxiYWNrcy5hLmxlbmd0aCkge1xuXHRcdHVzZXJfZWZmZWN0KCgpID0+IHtcblx0XHRcdG9ic2VydmVfYWxsKGNvbnRleHQsIHByb3BzKTtcblx0XHRcdHJ1bl9hbGwoY2FsbGJhY2tzLmEpO1xuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogSW52b2tlIHRoZSBnZXR0ZXIgb2YgYWxsIHNpZ25hbHMgYXNzb2NpYXRlZCB3aXRoIGEgY29tcG9uZW50XG4gKiBzbyB0aGV5IGNhbiBiZSByZWdpc3RlcmVkIHRvIHRoZSBlZmZlY3QgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4uXG4gKiBAcGFyYW0ge0NvbXBvbmVudENvbnRleHRMZWdhY3l9IGNvbnRleHRcbiAqIEBwYXJhbSB7KCgpID0+IHZvaWQpfSBwcm9wc1xuICovXG5mdW5jdGlvbiBvYnNlcnZlX2FsbChjb250ZXh0LCBwcm9wcykge1xuXHRpZiAoY29udGV4dC5sLnMpIHtcblx0XHRmb3IgKGNvbnN0IHNpZ25hbCBvZiBjb250ZXh0LmwucykgZ2V0KHNpZ25hbCk7XG5cdH1cblxuXHRwcm9wcygpO1xufVxuIiwiaW1wb3J0IHsgc2V0LCBzb3VyY2UgfSBmcm9tICcuLi8uLi9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vcnVudGltZS5qcyc7XG5pbXBvcnQgeyBpc19hcnJheSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5cbi8qKlxuICogVW5kZXIgc29tZSBjaXJjdW1zdGFuY2VzLCBpbXBvcnRzIG1heSBiZSByZWFjdGl2ZSBpbiBsZWdhY3kgbW9kZS4gSW4gdGhhdCBjYXNlLFxuICogdGhleSBzaG91bGQgYmUgdXNpbmcgYHJlYWN0aXZlX2ltcG9ydGAgYXMgcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb25cbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhY3RpdmVfaW1wb3J0KGZuKSB7XG5cdHZhciBzID0gc291cmNlKDApO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHNldChzLCBnZXQocykgKyAxKTtcblx0XHRcdHJldHVybiBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldChzKTtcblx0XHRcdHJldHVybiBmbigpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAdGhpcyB7YW55fVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gJCRwcm9wc1xuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnViYmxlX2V2ZW50KCQkcHJvcHMsIGV2ZW50KSB7XG5cdHZhciBldmVudHMgPSAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIEZ1bmN0aW9uW10gfCBGdW5jdGlvbj59ICovICgkJHByb3BzLiQkZXZlbnRzKT8uW1xuXHRcdGV2ZW50LnR5cGVcblx0XTtcblxuXHR2YXIgY2FsbGJhY2tzID0gaXNfYXJyYXkoZXZlbnRzKSA/IGV2ZW50cy5zbGljZSgpIDogZXZlbnRzID09IG51bGwgPyBbXSA6IFtldmVudHNdO1xuXG5cdGZvciAodmFyIGZuIG9mIGNhbGxiYWNrcykge1xuXHRcdC8vIFByZXNlcnZlIFwidGhpc1wiIGNvbnRleHRcblx0XHRmbi5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fVxufVxuXG4vKipcbiAqIFVzZWQgdG8gc2ltdWxhdGUgYCRvbmAgb24gYSBjb21wb25lbnQgaW5zdGFuY2Ugd2hlbiBgY29tcGF0aWJpbGl0eS5jb21wb25lbnRBcGkgPT09IDRgXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59ICQkcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudF9uYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudF9jYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX2xlZ2FjeV9ldmVudF9saXN0ZW5lcigkJHByb3BzLCBldmVudF9uYW1lLCBldmVudF9jYWxsYmFjaykge1xuXHQkJHByb3BzLiQkZXZlbnRzIHx8PSB7fTtcblx0JCRwcm9wcy4kJGV2ZW50c1tldmVudF9uYW1lXSB8fD0gW107XG5cdCQkcHJvcHMuJCRldmVudHNbZXZlbnRfbmFtZV0ucHVzaChldmVudF9jYWxsYmFjayk7XG59XG5cbi8qKlxuICogVXNlZCB0byBzaW11bGF0ZSBgJHNldGAgb24gYSBjb21wb25lbnQgaW5zdGFuY2Ugd2hlbiBgY29tcGF0aWJpbGl0eS5jb21wb25lbnRBcGkgPT09IDRgLlxuICogTmVlZHMgY29tcG9uZW50IGFjY2Vzc29ycyBzbyB0aGF0IGl0IGNhbiBjYWxsIHRoZSBzZXR0ZXIgb2YgdGhlIHByb3AuIFRoZXJlZm9yZSBkb2Vzbid0XG4gKiB3b3JrIGZvciB1cGRhdGluZyBwcm9wcyBpbiBgJCRwcm9wc2Agb3IgYCQkcmVzdFByb3BzYC5cbiAqIEB0aGlzIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAkJG5ld19wcm9wc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX2xlZ2FjeV9wcm9wcygkJG5ld19wcm9wcykge1xuXHRmb3IgKHZhciBrZXkgaW4gJCRuZXdfcHJvcHMpIHtcblx0XHRpZiAoa2V5IGluIHRoaXMpIHtcblx0XHRcdHRoaXNba2V5XSA9ICQkbmV3X3Byb3BzW2tleV07XG5cdFx0fVxuXHR9XG59XG4iLCIvKiogQGltcG9ydCB7IERlcml2ZWQsIEVmZmVjdCwgU291cmNlIH0gZnJvbSAnLi90eXBlcy5qcycgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHtcblx0UFJPUFNfSVNfQklOREFCTEUsXG5cdFBST1BTX0lTX0lNTVVUQUJMRSxcblx0UFJPUFNfSVNfTEFaWV9JTklUSUFMLFxuXHRQUk9QU19JU19SVU5FUyxcblx0UFJPUFNfSVNfVVBEQVRFRFxufSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgZ2V0X2Rlc2NyaXB0b3IsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzLmpzJztcbmltcG9ydCB7IHNldCwgc291cmNlLCB1cGRhdGUgfSBmcm9tICcuL3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgZGVyaXZlZCwgZGVyaXZlZF9zYWZlX2VxdWFsIH0gZnJvbSAnLi9kZXJpdmVkcy5qcyc7XG5pbXBvcnQge1xuXHRhY3RpdmVfZWZmZWN0LFxuXHRnZXQsXG5cdGlzX2Rlc3Ryb3lpbmdfZWZmZWN0LFxuXHRzZXRfYWN0aXZlX2VmZmVjdCxcblx0dW50cmFja1xufSBmcm9tICcuLi9ydW50aW1lLmpzJztcbmltcG9ydCAqIGFzIGUgZnJvbSAnLi4vZXJyb3JzLmpzJztcbmltcG9ydCB7IERFU1RST1lFRCwgTEVHQUNZX1BST1BTLCBTVEFURV9TWU1CT0wgfSBmcm9tICcjY2xpZW50L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBwcm94eSB9IGZyb20gJy4uL3Byb3h5LmpzJztcbmltcG9ydCB7IGNhcHR1cmVfc3RvcmVfYmluZGluZyB9IGZyb20gJy4vc3RvcmUuanMnO1xuaW1wb3J0IHsgbGVnYWN5X21vZGVfZmxhZyB9IGZyb20gJy4uLy4uL2ZsYWdzL2luZGV4LmpzJztcbmltcG9ydCB7IGVmZmVjdCwgcmVuZGVyX2VmZmVjdCB9IGZyb20gJy4vZWZmZWN0cy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHsoKHZhbHVlPzogbnVtYmVyKSA9PiBudW1iZXIpfSBmblxuICogQHBhcmFtIHsxIHwgLTF9IFtkXVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9wcm9wKGZuLCBkID0gMSkge1xuXHRjb25zdCB2YWx1ZSA9IGZuKCk7XG5cdGZuKHZhbHVlICsgZCk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygodmFsdWU/OiBudW1iZXIpID0+IG51bWJlcil9IGZuXG4gKiBAcGFyYW0gezEgfCAtMX0gW2RdXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3ByZV9wcm9wKGZuLCBkID0gMSkge1xuXHRjb25zdCB2YWx1ZSA9IGZuKCkgKyBkO1xuXHRmbih2YWx1ZSk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBUaGUgcHJveHkgaGFuZGxlciBmb3IgcmVzdCBwcm9wcyAoaS5lLiBgY29uc3QgeyB4LCAuLi5yZXN0IH0gPSAkcHJvcHMoKWApLlxuICogSXMgcGFzc2VkIHRoZSBmdWxsIGAkJHByb3BzYCBvYmplY3QgYW5kIGV4Y2x1ZGVzIHRoZSBuYW1lZCBwcm9wcy5cbiAqIEB0eXBlIHtQcm94eUhhbmRsZXI8eyBwcm9wczogUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4sIGV4Y2x1ZGU6IFNldDxzdHJpbmcgfCBzeW1ib2w+LCBuYW1lPzogc3RyaW5nIH0+fX1cbiAqL1xuY29uc3QgcmVzdF9wcm9wc19oYW5kbGVyID0ge1xuXHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaGFzKGtleSkpIHJldHVybjtcblx0XHRyZXR1cm4gdGFyZ2V0LnByb3BzW2tleV07XG5cdH0sXG5cdHNldCh0YXJnZXQsIGtleSkge1xuXHRcdGlmIChERVYpIHtcblx0XHRcdC8vIFRPRE8gc2hvdWxkIHRoaXMgaGFwcGVuIGluIHByb2QgdG9vP1xuXHRcdFx0ZS5wcm9wc19yZXN0X3JlYWRvbmx5KGAke3RhcmdldC5uYW1lfS4ke1N0cmluZyhrZXkpfWApO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmhhcyhrZXkpKSByZXR1cm47XG5cdFx0aWYgKGtleSBpbiB0YXJnZXQucHJvcHMpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHRhcmdldC5wcm9wc1trZXldXG5cdFx0XHR9O1xuXHRcdH1cblx0fSxcblx0aGFzKHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmhhcyhrZXkpKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIGtleSBpbiB0YXJnZXQucHJvcHM7XG5cdH0sXG5cdG93bktleXModGFyZ2V0KSB7XG5cdFx0cmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQucHJvcHMpLmZpbHRlcigoa2V5KSA9PiAhdGFyZ2V0LmV4Y2x1ZGUuaGFzKGtleSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59IHByb3BzXG4gKiBAcGFyYW0ge1NldDxzdHJpbmc+fSBleGNsdWRlXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59XG4gKi9cbi8qI19fTk9fU0lERV9FRkZFQ1RTX18qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc3RfcHJvcHMocHJvcHMsIGV4Y2x1ZGUsIG5hbWUpIHtcblx0cmV0dXJuIG5ldyBQcm94eShcblx0XHRERVYgPyB7IHByb3BzLCBleGNsdWRlLCBuYW1lLCBvdGhlcjoge30sIHRvX3Byb3h5OiBbXSB9IDogeyBwcm9wcywgZXhjbHVkZSB9LFxuXHRcdHJlc3RfcHJvcHNfaGFuZGxlclxuXHQpO1xufVxuXG4vKipcbiAqIFRoZSBwcm94eSBoYW5kbGVyIGZvciBsZWdhY3kgJCRyZXN0UHJvcHMgYW5kICQkcHJvcHNcbiAqIEB0eXBlIHtQcm94eUhhbmRsZXI8eyBwcm9wczogUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4sIGV4Y2x1ZGU6IEFycmF5PHN0cmluZyB8IHN5bWJvbD4sIHNwZWNpYWw6IFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsICh2PzogdW5rbm93bikgPT4gdW5rbm93bj4sIHZlcnNpb246IFNvdXJjZTxudW1iZXI+LCBwYXJlbnRfZWZmZWN0OiBFZmZlY3QgfT59fVxuICovXG5jb25zdCBsZWdhY3lfcmVzdF9wcm9wc19oYW5kbGVyID0ge1xuXHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRpZiAodGFyZ2V0LmV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuXHRcdGdldCh0YXJnZXQudmVyc2lvbik7XG5cdFx0cmV0dXJuIGtleSBpbiB0YXJnZXQuc3BlY2lhbCA/IHRhcmdldC5zcGVjaWFsW2tleV0oKSA6IHRhcmdldC5wcm9wc1trZXldO1xuXHR9LFxuXHRzZXQodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG5cdFx0aWYgKCEoa2V5IGluIHRhcmdldC5zcGVjaWFsKSkge1xuXHRcdFx0dmFyIHByZXZpb3VzX2VmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHNldF9hY3RpdmVfZWZmZWN0KHRhcmdldC5wYXJlbnRfZWZmZWN0KTtcblxuXHRcdFx0XHQvLyBIYW5kbGUgcHJvcHMgdGhhdCBjYW4gdGVtcG9yYXJpbHkgZ2V0IG91dCBvZiBzeW5jIHdpdGggdGhlIHBhcmVudFxuXHRcdFx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsICh2PzogdW5rbm93bikgPT4gdW5rbm93bj59ICovXG5cdFx0XHRcdHRhcmdldC5zcGVjaWFsW2tleV0gPSBwcm9wKFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGdldCBba2V5XSgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRhcmdldC5wcm9wc1trZXldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtzdHJpbmd9ICovIChrZXkpLFxuXHRcdFx0XHRcdFBST1BTX0lTX1VQREFURURcblx0XHRcdFx0KTtcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdHNldF9hY3RpdmVfZWZmZWN0KHByZXZpb3VzX2VmZmVjdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGFyZ2V0LnNwZWNpYWxba2V5XSh2YWx1ZSk7XG5cdFx0dXBkYXRlKHRhcmdldC52ZXJzaW9uKTsgLy8gJCRwcm9wcyBpcyBjb2Fyc2UtZ3JhaW5lZDogd2hlbiAkJHByb3BzLnggaXMgdXBkYXRlZCwgdXNhZ2VzIG9mICQkcHJvcHMueSBldGMgYXJlIGFsc28gcmVydW5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpIHJldHVybjtcblx0XHRpZiAoa2V5IGluIHRhcmdldC5wcm9wcykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHR2YWx1ZTogdGFyZ2V0LnByb3BzW2tleV1cblx0XHRcdH07XG5cdFx0fVxuXHR9LFxuXHRkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuXHRcdC8vIFN2ZWx0ZSA0IGFsbG93ZWQgZm9yIGRlbGV0aW9ucyBvbiAkJHJlc3RQcm9wc1xuXHRcdGlmICh0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKSByZXR1cm4gdHJ1ZTtcblx0XHR0YXJnZXQuZXhjbHVkZS5wdXNoKGtleSk7XG5cdFx0dXBkYXRlKHRhcmdldC52ZXJzaW9uKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0aGFzKHRhcmdldCwga2V5KSB7XG5cdFx0aWYgKHRhcmdldC5leGNsdWRlLmluY2x1ZGVzKGtleSkpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4ga2V5IGluIHRhcmdldC5wcm9wcztcblx0fSxcblx0b3duS2V5cyh0YXJnZXQpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldC5wcm9wcykuZmlsdGVyKChrZXkpID0+ICF0YXJnZXQuZXhjbHVkZS5pbmNsdWRlcyhrZXkpKTtcblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZVxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHVua25vd24+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVnYWN5X3Jlc3RfcHJvcHMocHJvcHMsIGV4Y2x1ZGUpIHtcblx0cmV0dXJuIG5ldyBQcm94eShcblx0XHR7XG5cdFx0XHRwcm9wcyxcblx0XHRcdGV4Y2x1ZGUsXG5cdFx0XHRzcGVjaWFsOiB7fSxcblx0XHRcdHZlcnNpb246IHNvdXJjZSgwKSxcblx0XHRcdC8vIFRPRE8gdGhpcyBpcyBvbmx5IG5lY2Vzc2FyeSBiZWNhdXNlIHdlIG5lZWQgdG8gdHJhY2sgY29tcG9uZW50XG5cdFx0XHQvLyBkZXN0cnVjdGlvbiBpbnNpZGUgYHByb3BgLCBiZWNhdXNlIG9mIGBiaW5kOnRoaXNgLCBidXQgaXRcblx0XHRcdC8vIHNlZW1zIGxpa2VseSB0aGF0IHdlIGNhbiBzaW1wbGlmeSBgYmluZDp0aGlzYCBpbnN0ZWFkXG5cdFx0XHRwYXJlbnRfZWZmZWN0OiAvKiogQHR5cGUge0VmZmVjdH0gKi8gKGFjdGl2ZV9lZmZlY3QpXG5cdFx0fSxcblx0XHRsZWdhY3lfcmVzdF9wcm9wc19oYW5kbGVyXG5cdCk7XG59XG5cbi8qKlxuICogVGhlIHByb3h5IGhhbmRsZXIgZm9yIHNwcmVhZCBwcm9wcy4gSGFuZGxlcyB0aGUgaW5jb21pbmcgYXJyYXkgb2YgcHJvcHNcbiAqIHRoYXQgbG9va3MgbGlrZSBgKCkgPT4geyBkeW5hbWljOiBwcm9wcyB9LCB7IHN0YXRpYzogcHJvcCB9LCAuLmAgYW5kIHdyYXBzXG4gKiB0aGVtIHNvIHRoYXQgdGhlIHdob2xlIHRoaW5nIGlzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50IGFzIHRoZSBgJCRwcm9wc2AgYXJndW1lbnQuXG4gKiBAdHlwZSB7UHJveHlIYW5kbGVyPHsgcHJvcHM6IEFycmF5PFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+IHwgKCgpID0+IFJlY29yZDxzdHJpbmcgfCBzeW1ib2wsIHVua25vd24+KT4gfT59fVxuICovXG5jb25zdCBzcHJlYWRfcHJvcHNfaGFuZGxlciA9IHtcblx0Z2V0KHRhcmdldCwga2V5KSB7XG5cdFx0bGV0IGkgPSB0YXJnZXQucHJvcHMubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGxldCBwID0gdGFyZ2V0LnByb3BzW2ldO1xuXHRcdFx0aWYgKGlzX2Z1bmN0aW9uKHApKSBwID0gcCgpO1xuXHRcdFx0aWYgKHR5cGVvZiBwID09PSAnb2JqZWN0JyAmJiBwICE9PSBudWxsICYmIGtleSBpbiBwKSByZXR1cm4gcFtrZXldO1xuXHRcdH1cblx0fSxcblx0c2V0KHRhcmdldCwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCBpID0gdGFyZ2V0LnByb3BzLmxlbmd0aDtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRsZXQgcCA9IHRhcmdldC5wcm9wc1tpXTtcblx0XHRcdGlmIChpc19mdW5jdGlvbihwKSkgcCA9IHAoKTtcblx0XHRcdGNvbnN0IGRlc2MgPSBnZXRfZGVzY3JpcHRvcihwLCBrZXkpO1xuXHRcdFx0aWYgKGRlc2MgJiYgZGVzYy5zZXQpIHtcblx0XHRcdFx0ZGVzYy5zZXQodmFsdWUpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIHtcblx0XHRsZXQgaSA9IHRhcmdldC5wcm9wcy5sZW5ndGg7XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0bGV0IHAgPSB0YXJnZXQucHJvcHNbaV07XG5cdFx0XHRpZiAoaXNfZnVuY3Rpb24ocCkpIHAgPSBwKCk7XG5cdFx0XHRpZiAodHlwZW9mIHAgPT09ICdvYmplY3QnICYmIHAgIT09IG51bGwgJiYga2V5IGluIHApIHtcblx0XHRcdFx0Y29uc3QgZGVzY3JpcHRvciA9IGdldF9kZXNjcmlwdG9yKHAsIGtleSk7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0XHRcdC8vIFByZXZlbnQgYSBcIk5vbi1jb25maWd1cmFiaWxpdHkgUmVwb3J0IEVycm9yXCI6IFRoZSB0YXJnZXQgaXMgYW4gYXJyYXksIGl0IGRvZXNcblx0XHRcdFx0XHQvLyBub3QgYWN0dWFsbHkgY29udGFpbiB0aGlzIHByb3BlcnR5LiBJZiBpdCBpcyBub3cgZGVzY3JpYmVkIGFzIG5vbi1jb25maWd1cmFibGUsXG5cdFx0XHRcdFx0Ly8gdGhlIHByb3h5IHRocm93cyBhIHZhbGlkYXRpb24gZXJyb3IuIFNldHRpbmcgaXQgdG8gdHJ1ZSBhdm9pZHMgdGhhdC5cblx0XHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGRlc2NyaXB0b3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoYXModGFyZ2V0LCBrZXkpIHtcblx0XHQvLyBUbyBwcmV2ZW50IGEgZmFsc2UgcG9zaXRpdmUgYGlzX2VudHJ5X3Byb3BzYCBpbiB0aGUgYHByb3BgIGZ1bmN0aW9uXG5cdFx0aWYgKGtleSA9PT0gU1RBVEVfU1lNQk9MIHx8IGtleSA9PT0gTEVHQUNZX1BST1BTKSByZXR1cm4gZmFsc2U7XG5cblx0XHRmb3IgKGxldCBwIG9mIHRhcmdldC5wcm9wcykge1xuXHRcdFx0aWYgKGlzX2Z1bmN0aW9uKHApKSBwID0gcCgpO1xuXHRcdFx0aWYgKHAgIT0gbnVsbCAmJiBrZXkgaW4gcCkgcmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRvd25LZXlzKHRhcmdldCkge1xuXHRcdC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nIHwgc3ltYm9sPn0gKi9cblx0XHRjb25zdCBrZXlzID0gW107XG5cblx0XHRmb3IgKGxldCBwIG9mIHRhcmdldC5wcm9wcykge1xuXHRcdFx0aWYgKGlzX2Z1bmN0aW9uKHApKSBwID0gcCgpO1xuXHRcdFx0aWYgKCFwKSBjb250aW51ZTtcblxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcCkge1xuXHRcdFx0XHRpZiAoIWtleXMuaW5jbHVkZXMoa2V5KSkga2V5cy5wdXNoKGtleSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocCkpIHtcblx0XHRcdFx0aWYgKCFrZXlzLmluY2x1ZGVzKGtleSkpIGtleXMucHVzaChrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBrZXlzO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCAoKCkgPT4gUmVjb3JkPHN0cmluZywgdW5rbm93bj4pPn0gcHJvcHNcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHJlYWRfcHJvcHMoLi4ucHJvcHMpIHtcblx0cmV0dXJuIG5ldyBQcm94eSh7IHByb3BzIH0sIHNwcmVhZF9wcm9wc19oYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIGZvciBzeW5jaHJvbml6aW5nIGEgcG9zc2libHkgYm91bmQgcHJvcCB3aXRoIHRoZSBpbm5lciBjb21wb25lbnQgc3RhdGUuXG4gKiBJdCBpcyB1c2VkIHdoZW5ldmVyIHRoZSBjb21waWxlciBzZWVzIHRoYXQgdGhlIGNvbXBvbmVudCB3cml0ZXMgdG8gdGhlIHByb3AsIG9yIHdoZW4gaXQgaGFzIGEgZGVmYXVsdCBwcm9wX3ZhbHVlLlxuICogQHRlbXBsYXRlIFZcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgdW5rbm93bj59IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcbiAqIEBwYXJhbSB7ViB8ICgoKSA9PiBWKX0gW2ZhbGxiYWNrXVxuICogQHJldHVybnMgeygoKSA9PiBWIHwgKChhcmc6IFYpID0+IFYpIHwgKChhcmc6IFYsIG11dGF0aW9uOiBib29sZWFuKSA9PiBWKSl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wKHByb3BzLCBrZXksIGZsYWdzLCBmYWxsYmFjaykge1xuXHR2YXIgcnVuZXMgPSAhbGVnYWN5X21vZGVfZmxhZyB8fCAoZmxhZ3MgJiBQUk9QU19JU19SVU5FUykgIT09IDA7XG5cdHZhciBiaW5kYWJsZSA9IChmbGFncyAmIFBST1BTX0lTX0JJTkRBQkxFKSAhPT0gMDtcblx0dmFyIGxhenkgPSAoZmxhZ3MgJiBQUk9QU19JU19MQVpZX0lOSVRJQUwpICE9PSAwO1xuXG5cdHZhciBmYWxsYmFja192YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKGZhbGxiYWNrKTtcblx0dmFyIGZhbGxiYWNrX2RpcnR5ID0gdHJ1ZTtcblx0dmFyIGZhbGxiYWNrX3NpZ25hbCA9IC8qKiBAdHlwZSB7RGVyaXZlZDxWPiB8IHVuZGVmaW5lZH0gKi8gKHVuZGVmaW5lZCk7XG5cblx0dmFyIGdldF9mYWxsYmFjayA9ICgpID0+IHtcblx0XHRpZiAobGF6eSAmJiBydW5lcykge1xuXHRcdFx0ZmFsbGJhY2tfc2lnbmFsID8/PSBkZXJpdmVkKC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKGZhbGxiYWNrKSk7XG5cdFx0XHRyZXR1cm4gZ2V0KGZhbGxiYWNrX3NpZ25hbCk7XG5cdFx0fVxuXG5cdFx0aWYgKGZhbGxiYWNrX2RpcnR5KSB7XG5cdFx0XHRmYWxsYmFja19kaXJ0eSA9IGZhbHNlO1xuXG5cdFx0XHRmYWxsYmFja192YWx1ZSA9IGxhenlcblx0XHRcdFx0PyB1bnRyYWNrKC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKGZhbGxiYWNrKSlcblx0XHRcdFx0OiAvKiogQHR5cGUge1Z9ICovIChmYWxsYmFjayk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbGxiYWNrX3ZhbHVlO1xuXHR9O1xuXG5cdC8qKiBAdHlwZSB7KCh2OiBWKSA9PiB2b2lkKSB8IHVuZGVmaW5lZH0gKi9cblx0bGV0IHNldHRlcjtcblxuXHRpZiAoYmluZGFibGUpIHtcblx0XHQvLyBDYW4gYmUgdGhlIGNhc2Ugd2hlbiBzb21lb25lIGRvZXMgYG1vdW50KENvbXBvbmVudCwgcHJvcHMpYCB3aXRoIGBsZXQgcHJvcHMgPSAkc3RhdGUoey4uLn0pYFxuXHRcdC8vIG9yIGBjcmVhdGVDbGFzc0NvbXBvbmVudChDb21wb25lbnQsIHByb3BzKWBcblx0XHR2YXIgaXNfZW50cnlfcHJvcHMgPSBTVEFURV9TWU1CT0wgaW4gcHJvcHMgfHwgTEVHQUNZX1BST1BTIGluIHByb3BzO1xuXG5cdFx0c2V0dGVyID1cblx0XHRcdGdldF9kZXNjcmlwdG9yKHByb3BzLCBrZXkpPy5zZXQgPz9cblx0XHRcdChpc19lbnRyeV9wcm9wcyAmJiBrZXkgaW4gcHJvcHMgPyAodikgPT4gKHByb3BzW2tleV0gPSB2KSA6IHVuZGVmaW5lZCk7XG5cdH1cblxuXHQvKiogQHR5cGUge1Z9ICovXG5cdHZhciBpbml0aWFsX3ZhbHVlO1xuXHR2YXIgaXNfc3RvcmVfc3ViID0gZmFsc2U7XG5cblx0aWYgKGJpbmRhYmxlKSB7XG5cdFx0W2luaXRpYWxfdmFsdWUsIGlzX3N0b3JlX3N1Yl0gPSBjYXB0dXJlX3N0b3JlX2JpbmRpbmcoKCkgPT4gLyoqIEB0eXBlIHtWfSAqLyAocHJvcHNba2V5XSkpO1xuXHR9IGVsc2Uge1xuXHRcdGluaXRpYWxfdmFsdWUgPSAvKiogQHR5cGUge1Z9ICovIChwcm9wc1trZXldKTtcblx0fVxuXG5cdGlmIChpbml0aWFsX3ZhbHVlID09PSB1bmRlZmluZWQgJiYgZmFsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdGluaXRpYWxfdmFsdWUgPSBnZXRfZmFsbGJhY2soKTtcblxuXHRcdGlmIChzZXR0ZXIpIHtcblx0XHRcdGlmIChydW5lcykgZS5wcm9wc19pbnZhbGlkX3ZhbHVlKGtleSk7XG5cdFx0XHRzZXR0ZXIoaW5pdGlhbF92YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIEB0eXBlIHsoKSA9PiBWfSAqL1xuXHR2YXIgZ2V0dGVyO1xuXG5cdGlmIChydW5lcykge1xuXHRcdGdldHRlciA9ICgpID0+IHtcblx0XHRcdHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKHByb3BzW2tleV0pO1xuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBnZXRfZmFsbGJhY2soKTtcblx0XHRcdGZhbGxiYWNrX2RpcnR5ID0gdHJ1ZTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGdldHRlciA9ICgpID0+IHtcblx0XHRcdHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7Vn0gKi8gKHByb3BzW2tleV0pO1xuXG5cdFx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyBpbiBsZWdhY3kgbW9kZSwgd2UgZG9uJ3QgcmV2ZXJ0IHRvIHRoZSBmYWxsYmFjayB2YWx1ZVxuXHRcdFx0XHQvLyBpZiB0aGUgcHJvcCBnb2VzIGZyb20gZGVmaW5lZCB0byB1bmRlZmluZWQuIFRoZSBlYXNpZXN0XG5cdFx0XHRcdC8vIHdheSB0byBtb2RlbCB0aGlzIGlzIHRvIG1ha2UgdGhlIGZhbGxiYWNrIHVuZGVmaW5lZFxuXHRcdFx0XHQvLyBhcyBzb29uIGFzIHRoZSBwcm9wIGhhcyBhIHZhbHVlXG5cdFx0XHRcdGZhbGxiYWNrX3ZhbHVlID0gLyoqIEB0eXBlIHtWfSAqLyAodW5kZWZpbmVkKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyBmYWxsYmFja192YWx1ZSA6IHZhbHVlO1xuXHRcdH07XG5cdH1cblxuXHQvLyBwcm9wIGlzIG5ldmVyIHdyaXR0ZW4gdG8g4oCUIHdlIG9ubHkgbmVlZCBhIGdldHRlclxuXHRpZiAocnVuZXMgJiYgKGZsYWdzICYgUFJPUFNfSVNfVVBEQVRFRCkgPT09IDApIHtcblx0XHRyZXR1cm4gZ2V0dGVyO1xuXHR9XG5cblx0Ly8gcHJvcCBpcyB3cml0dGVuIHRvLCBidXQgdGhlIHBhcmVudCBjb21wb25lbnQgaGFkIGBiaW5kOmZvb2Agd2hpY2hcblx0Ly8gbWVhbnMgd2UgY2FuIGp1c3QgY2FsbCBgJCRwcm9wcy5mb28gPSB2YWx1ZWAgZGlyZWN0bHlcblx0aWYgKHNldHRlcikge1xuXHRcdHZhciBsZWdhY3lfcGFyZW50ID0gcHJvcHMuJCRsZWdhY3k7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKFxuXHRcdFx0ZnVuY3Rpb24gKC8qKiBAdHlwZSB7Vn0gKi8gdmFsdWUsIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gbXV0YXRpb24pIHtcblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gV2UgZG9uJ3Qgd2FudCB0byBub3RpZnkgaWYgdGhlIHZhbHVlIHdhcyBtdXRhdGVkIGFuZCB0aGUgcGFyZW50IGlzIGluIHJ1bmVzIG1vZGUuXG5cdFx0XHRcdFx0Ly8gSW4gdGhhdCBjYXNlIHRoZSBzdGF0ZSBwcm94eSAoaWYgaXQgZXhpc3RzKSBzaG91bGQgdGFrZSBjYXJlIG9mIHRoZSBub3RpZmljYXRpb24uXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHBhcmVudCBpcyBub3QgaW4gcnVuZXMgbW9kZSwgd2UgbmVlZCB0byBub3RpZnkgb24gbXV0YXRpb24sIHRvbywgdGhhdCB0aGUgcHJvcFxuXHRcdFx0XHRcdC8vIGhhcyBjaGFuZ2VkIGJlY2F1c2UgdGhlIHBhcmVudCB3aWxsIG5vdCBiZSBhYmxlIHRvIGRldGVjdCB0aGUgY2hhbmdlIG90aGVyd2lzZS5cblx0XHRcdFx0XHRpZiAoIXJ1bmVzIHx8ICFtdXRhdGlvbiB8fCBsZWdhY3lfcGFyZW50IHx8IGlzX3N0b3JlX3N1Yikge1xuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtGdW5jdGlvbn0gKi8gKHNldHRlcikobXV0YXRpb24gPyBnZXR0ZXIoKSA6IHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZ2V0dGVyKCk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8vIEVpdGhlciBwcm9wIGlzIHdyaXR0ZW4gdG8sIGJ1dCB0aGVyZSdzIG5vIGJpbmRpbmcsIHdoaWNoIG1lYW5zIHdlXG5cdC8vIGNyZWF0ZSBhIGRlcml2ZWQgdGhhdCB3ZSBjYW4gd3JpdGUgdG8gbG9jYWxseS5cblx0Ly8gT3Igd2UgYXJlIGluIGxlZ2FjeSBtb2RlIHdoZXJlIHdlIGFsd2F5cyBjcmVhdGUgYSBkZXJpdmVkIHRvIHJlcGxpY2F0ZSB0aGF0XG5cdC8vIFN2ZWx0ZSA0IGRpZCBub3QgdHJpZ2dlciB1cGRhdGVzIHdoZW4gYSBwcmltaXRpdmUgdmFsdWUgd2FzIHVwZGF0ZWQgdG8gdGhlIHNhbWUgdmFsdWUuXG5cdHZhciBvdmVycmlkZGVuID0gZmFsc2U7XG5cblx0dmFyIGQgPSAoKGZsYWdzICYgUFJPUFNfSVNfSU1NVVRBQkxFKSAhPT0gMCA/IGRlcml2ZWQgOiBkZXJpdmVkX3NhZmVfZXF1YWwpKCgpID0+IHtcblx0XHRvdmVycmlkZGVuID0gZmFsc2U7XG5cdFx0cmV0dXJuIGdldHRlcigpO1xuXHR9KTtcblxuXHRpZiAoREVWKSB7XG5cdFx0ZC5sYWJlbCA9IGtleTtcblx0fVxuXG5cdC8vIENhcHR1cmUgdGhlIGluaXRpYWwgdmFsdWUgaWYgaXQncyBiaW5kYWJsZVxuXHRpZiAoYmluZGFibGUpIGdldChkKTtcblxuXHR2YXIgcGFyZW50X2VmZmVjdCA9IC8qKiBAdHlwZSB7RWZmZWN0fSAqLyAoYWN0aXZlX2VmZmVjdCk7XG5cblx0cmV0dXJuIC8qKiBAdHlwZSB7KCkgPT4gVn0gKi8gKFxuXHRcdGZ1bmN0aW9uICgvKiogQHR5cGUge2FueX0gKi8gdmFsdWUsIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gbXV0YXRpb24pIHtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBuZXdfdmFsdWUgPSBtdXRhdGlvbiA/IGdldChkKSA6IHJ1bmVzICYmIGJpbmRhYmxlID8gcHJveHkodmFsdWUpIDogdmFsdWU7XG5cblx0XHRcdFx0c2V0KGQsIG5ld192YWx1ZSk7XG5cdFx0XHRcdG92ZXJyaWRkZW4gPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChmYWxsYmFja192YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZmFsbGJhY2tfdmFsdWUgPSBuZXdfdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNwZWNpYWwgY2FzZSDigJQgYXZvaWQgcmVjYWxjdWxhdGluZyB0aGUgZGVyaXZlZCBpZiB3ZSdyZSBpbiBhXG5cdFx0XHQvLyB0ZWFyZG93biBmdW5jdGlvbiBhbmQgdGhlIHByb3Agd2FzIG92ZXJyaWRkZW4gbG9jYWxseSwgb3IgdGhlXG5cdFx0XHQvLyBjb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkIChwZW9wbGUgY291bGQgYWNjZXNzIHByb3BzIGluIGEgdGltZW91dClcblx0XHRcdGlmICgoaXNfZGVzdHJveWluZ19lZmZlY3QgJiYgb3ZlcnJpZGRlbikgfHwgKHBhcmVudF9lZmZlY3QuZiAmIERFU1RST1lFRCkgIT09IDApIHtcblx0XHRcdFx0cmV0dXJuIGQudjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGdldChkKTtcblx0XHR9XG5cdCk7XG59XG4iLCIvKiogQGltcG9ydCB7IEJsb2NrZXIgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uIH0gZnJvbSAnLi9jb250ZXh0LmpzJztcbmltcG9ydCB7IEZJTEVOQU1FIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHJlbmRlcl9lZmZlY3QgfSBmcm9tICcuL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgKiBhcyB3IGZyb20gJy4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHsgY2FwdHVyZV9zdG9yZV9iaW5kaW5nIH0gZnJvbSAnLi9yZWFjdGl2aXR5L3N0b3JlLmpzJztcbmltcG9ydCB7IHJ1bl9hZnRlcl9ibG9ja2VycyB9IGZyb20gJy4vcmVhY3Rpdml0eS9hc3luYy5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGJpbmRpbmdcbiAqIEBwYXJhbSB7QmxvY2tlcltdfSBibG9ja2Vyc1xuICogQHBhcmFtIHsoKSA9PiBSZWNvcmQ8c3RyaW5nLCBhbnk+fSBnZXRfb2JqZWN0XG4gKiBAcGFyYW0geygpID0+IHN0cmluZ30gZ2V0X3Byb3BlcnR5XG4gKiBAcGFyYW0ge251bWJlcn0gbGluZVxuICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfYmluZGluZyhiaW5kaW5nLCBibG9ja2VycywgZ2V0X29iamVjdCwgZ2V0X3Byb3BlcnR5LCBsaW5lLCBjb2x1bW4pIHtcblx0cnVuX2FmdGVyX2Jsb2NrZXJzKGJsb2NrZXJzLCAoKSA9PiB7XG5cdFx0dmFyIHdhcm5lZCA9IGZhbHNlO1xuXG5cdFx0dmFyIGZpbGVuYW1lID0gZGV2X2N1cnJlbnRfY29tcG9uZW50X2Z1bmN0aW9uPy5bRklMRU5BTUVdO1xuXG5cdFx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRpZiAod2FybmVkKSByZXR1cm47XG5cblx0XHRcdHZhciBbb2JqZWN0LCBpc19zdG9yZV9zdWJdID0gY2FwdHVyZV9zdG9yZV9iaW5kaW5nKGdldF9vYmplY3QpO1xuXG5cdFx0XHRpZiAoaXNfc3RvcmVfc3ViKSByZXR1cm47XG5cblx0XHRcdHZhciBwcm9wZXJ0eSA9IGdldF9wcm9wZXJ0eSgpO1xuXG5cdFx0XHR2YXIgcmFuID0gZmFsc2U7XG5cblx0XHRcdC8vIGJ5IG1ha2luZyB0aGUgKHBvc3NpYmx5IGZhbHNlLCBidXQgaXQgd291bGQgYmUgYW4gZXh0cmVtZSBlZGdlIGNhc2UpIGFzc3VtcHRpb25cblx0XHRcdC8vIHRoYXQgYSBnZXR0ZXIgaGFzIGEgY29ycmVzcG9uZGluZyBzZXR0ZXIsIHdlIGNhbiBkZXRlcm1pbmUgaWYgYSBwcm9wZXJ0eSBpc1xuXHRcdFx0Ly8gcmVhY3RpdmUgYnkgc2VlaW5nIGlmIHRoaXMgZWZmZWN0IGhhcyBkZXBlbmRlbmNpZXNcblx0XHRcdHZhciBlZmZlY3QgPSByZW5kZXJfZWZmZWN0KCgpID0+IHtcblx0XHRcdFx0aWYgKHJhbikgcmV0dXJuO1xuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0XHRcdG9iamVjdFtwcm9wZXJ0eV07XG5cdFx0XHR9KTtcblxuXHRcdFx0cmFuID0gdHJ1ZTtcblxuXHRcdFx0aWYgKGVmZmVjdC5kZXBzID09PSBudWxsKSB7XG5cdFx0XHRcdHZhciBsb2NhdGlvbiA9IGAke2ZpbGVuYW1lfToke2xpbmV9OiR7Y29sdW1ufWA7XG5cdFx0XHRcdHcuYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmUoYmluZGluZywgbG9jYXRpb24pO1xuXG5cdFx0XHRcdHdhcm5lZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ2xhc3NDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9sZWdhY3kvbGVnYWN5LWNsaWVudC5qcyc7XG5pbXBvcnQgeyBlZmZlY3Rfcm9vdCwgcmVuZGVyX2VmZmVjdCB9IGZyb20gJy4uLy4uL3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBhcHBlbmQgfSBmcm9tICcuLi90ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgeyBkZWZpbmVfcHJvcGVydHksIGdldF9kZXNjcmlwdG9yLCBvYmplY3Rfa2V5cyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVfZWxlbWVudCB9IGZyb20gJy4uL29wZXJhdGlvbnMuanMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEN1c3RvbUVsZW1lbnRQcm9wRGVmaW5pdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IFthdHRyaWJ1dGVdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtyZWZsZWN0XVxuICogQHByb3BlcnR5IHsnU3RyaW5nJ3wnQm9vbGVhbid8J051bWJlcid8J0FycmF5J3wnT2JqZWN0J30gW3R5cGVdXG4gKi9cblxuLyoqIEB0eXBlIHthbnl9ICovXG5sZXQgU3ZlbHRlRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRTdmVsdGVFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdFx0LyoqIFRoZSBTdmVsdGUgY29tcG9uZW50IGNvbnN0cnVjdG9yICovXG5cdFx0JCRjdG9yO1xuXHRcdC8qKiBTbG90cyAqL1xuXHRcdCQkcztcblx0XHQvKiogQHR5cGUge2FueX0gVGhlIFN2ZWx0ZSBjb21wb25lbnQgaW5zdGFuY2UgKi9cblx0XHQkJGM7XG5cdFx0LyoqIFdoZXRoZXIgb3Igbm90IHRoZSBjdXN0b20gZWxlbWVudCBpcyBjb25uZWN0ZWQgKi9cblx0XHQkJGNuID0gZmFsc2U7XG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBDb21wb25lbnQgcHJvcHMgZGF0YSAqL1xuXHRcdCQkZCA9IHt9O1xuXHRcdC8qKiBgdHJ1ZWAgaWYgY3VycmVudGx5IGluIHRoZSBwcm9jZXNzIG9mIHJlZmxlY3RpbmcgY29tcG9uZW50IHByb3BzIGJhY2sgdG8gYXR0cmlidXRlcyAqL1xuXHRcdCQkciA9IGZhbHNlO1xuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgQ3VzdG9tRWxlbWVudFByb3BEZWZpbml0aW9uPn0gUHJvcHMgZGVmaW5pdGlvbiAobmFtZSwgcmVmbGVjdGVkLCB0eXBlIGV0YykgKi9cblx0XHQkJHBfZCA9IHt9O1xuXHRcdC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdFtdPn0gRXZlbnQgbGlzdGVuZXJzICovXG5cdFx0JCRsID0ge307XG5cdFx0LyoqIEB0eXBlIHtNYXA8RXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCwgRnVuY3Rpb24+fSBFdmVudCBsaXN0ZW5lciB1bnN1YnNjcmliZSBmdW5jdGlvbnMgKi9cblx0XHQkJGxfdSA9IG5ldyBNYXAoKTtcblx0XHQvKiogQHR5cGUge2FueX0gVGhlIG1hbmFnZWQgcmVuZGVyIGVmZmVjdCBmb3IgcmVmbGVjdGluZyBhdHRyaWJ1dGVzICovXG5cdFx0JCRtZTtcblx0XHQvKiogQHR5cGUge1NoYWRvd1Jvb3QgfCBudWxsfSBUaGUgU2hhZG93Um9vdCBvZiB0aGUgY3VzdG9tIGVsZW1lbnQgKi9cblx0XHQkJHNoYWRvd1Jvb3QgPSBudWxsO1xuXG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHsqfSAkJGNvbXBvbmVudEN0b3Jcblx0XHQgKiBAcGFyYW0geyp9ICQkc2xvdHNcblx0XHQgKiBAcGFyYW0ge1NoYWRvd1Jvb3RJbml0IHwgdW5kZWZpbmVkfSBzaGFkb3dfcm9vdF9pbml0XG5cdFx0ICovXG5cdFx0Y29uc3RydWN0b3IoJCRjb21wb25lbnRDdG9yLCAkJHNsb3RzLCBzaGFkb3dfcm9vdF9pbml0KSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy4kJGN0b3IgPSAkJGNvbXBvbmVudEN0b3I7XG5cdFx0XHR0aGlzLiQkcyA9ICQkc2xvdHM7XG5cblx0XHRcdGlmIChzaGFkb3dfcm9vdF9pbml0KSB7XG5cdFx0XHRcdC8vIFdlIG5lZWQgdG8gc3RvcmUgdGhlIHJlZmVyZW5jZSB0byBzaGFkb3cgcm9vdCwgYmVjYXVzZSBgY2xvc2VkYCBzaGFkb3cgcm9vdCBjYW5ub3QgYmVcblx0XHRcdFx0Ly8gYWNjZXNzZWQgd2l0aCBgdGhpcy5zaGFkb3dSb290YC5cblx0XHRcdFx0dGhpcy4kJHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyhzaGFkb3dfcm9vdF9pbml0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuXHRcdCAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdH0gbGlzdGVuZXJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdXG5cdFx0ICovXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuXHRcdFx0Ly8gV2UgY2FuJ3QgZGV0ZXJtaW5lIHVwZnJvbnQgaWYgdGhlIGV2ZW50IGlzIGEgY3VzdG9tIGV2ZW50IG9yIG5vdCwgc28gd2UgaGF2ZSB0b1xuXHRcdFx0Ly8gbGlzdGVuIHRvIGJvdGguIElmIHNvbWVvbmUgdXNlcyBhIGN1c3RvbSBldmVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgYSByZWd1bGFyXG5cdFx0XHQvLyBicm93c2VyIGV2ZW50LCB0aGlzIGZpcmVzIHR3aWNlIC0gd2UgY2FuJ3QgYXZvaWQgdGhhdC5cblx0XHRcdHRoaXMuJCRsW3R5cGVdID0gdGhpcy4kJGxbdHlwZV0gfHwgW107XG5cdFx0XHR0aGlzLiQkbFt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0XHRcdGlmICh0aGlzLiQkYykge1xuXHRcdFx0XHRjb25zdCB1bnN1YiA9IHRoaXMuJCRjLiRvbih0eXBlLCBsaXN0ZW5lcik7XG5cdFx0XHRcdHRoaXMuJCRsX3Uuc2V0KGxpc3RlbmVyLCB1bnN1Yik7XG5cdFx0XHR9XG5cdFx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuXHRcdCAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdH0gbGlzdGVuZXJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdXG5cdFx0ICovXG5cdFx0cmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuXHRcdFx0c3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy4kJGMpIHtcblx0XHRcdFx0Y29uc3QgdW5zdWIgPSB0aGlzLiQkbF91LmdldChsaXN0ZW5lcik7XG5cdFx0XHRcdGlmICh1bnN1Yikge1xuXHRcdFx0XHRcdHVuc3ViKCk7XG5cdFx0XHRcdFx0dGhpcy4kJGxfdS5kZWxldGUobGlzdGVuZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXN5bmMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLiQkY24gPSB0cnVlO1xuXHRcdFx0aWYgKCF0aGlzLiQkYykge1xuXHRcdFx0XHQvLyBXZSB3YWl0IG9uZSB0aWNrIHRvIGxldCBwb3NzaWJsZSBjaGlsZCBzbG90IGVsZW1lbnRzIGJlIGNyZWF0ZWQvbW91bnRlZFxuXHRcdFx0XHRhd2FpdCBQcm9taXNlLnJlc29sdmUoKTtcblx0XHRcdFx0aWYgKCF0aGlzLiQkY24gfHwgdGhpcy4kJGMpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqIEBwYXJhbSB7c3RyaW5nfSBuYW1lICovXG5cdFx0XHRcdGZ1bmN0aW9uIGNyZWF0ZV9zbG90KG5hbWUpIHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGFuY2hvclxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJldHVybiAoYW5jaG9yKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzbG90ID0gY3JlYXRlX2VsZW1lbnQoJ3Nsb3QnKTtcblx0XHRcdFx0XHRcdGlmIChuYW1lICE9PSAnZGVmYXVsdCcpIHNsb3QubmFtZSA9IG5hbWU7XG5cblx0XHRcdFx0XHRcdGFwcGVuZChhbmNob3IsIHNsb3QpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqL1xuXHRcdFx0XHRjb25zdCAkJHNsb3RzID0ge307XG5cdFx0XHRcdGNvbnN0IGV4aXN0aW5nX3Nsb3RzID0gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyh0aGlzKTtcblx0XHRcdFx0Zm9yIChjb25zdCBuYW1lIG9mIHRoaXMuJCRzKSB7XG5cdFx0XHRcdFx0aWYgKG5hbWUgaW4gZXhpc3Rpbmdfc2xvdHMpIHtcblx0XHRcdFx0XHRcdGlmIChuYW1lID09PSAnZGVmYXVsdCcgJiYgIXRoaXMuJCRkLmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuJCRkLmNoaWxkcmVuID0gY3JlYXRlX3Nsb3QobmFtZSk7XG5cdFx0XHRcdFx0XHRcdCQkc2xvdHMuZGVmYXVsdCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkJHNsb3RzW25hbWVdID0gY3JlYXRlX3Nsb3QobmFtZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAoY29uc3QgYXR0cmlidXRlIG9mIHRoaXMuYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdC8vIHRoaXMuJCRkYXRhIHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGlzLmF0dHJpYnV0ZXNcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gdGhpcy4kJGdfcChhdHRyaWJ1dGUubmFtZSk7XG5cdFx0XHRcdFx0aWYgKCEobmFtZSBpbiB0aGlzLiQkZCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuJCRkW25hbWVdID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKG5hbWUsIGF0dHJpYnV0ZS52YWx1ZSwgdGhpcy4kJHBfZCwgJ3RvUHJvcCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBQb3J0IG92ZXIgcHJvcHMgdGhhdCB3ZXJlIHNldCBwcm9ncmFtbWF0aWNhbGx5IGJlZm9yZSBjZSB3YXMgaW5pdGlhbGl6ZWRcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJHBfZCkge1xuXHRcdFx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdFx0XHRpZiAoIShrZXkgaW4gdGhpcy4kJGQpICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRcdFx0XHR0aGlzLiQkZFtrZXldID0gdGhpc1trZXldOyAvLyBkb24ndCB0cmFuc2Zvcm0sIHRoZXNlIHdlcmUgc2V0IHRocm91Z2ggSmF2YVNjcmlwdFxuXHRcdFx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXNba2V5XTsgLy8gcmVtb3ZlIHRoZSBwcm9wZXJ0eSB0aGF0IHNoYWRvd3MgdGhlIGdldHRlci9zZXR0ZXJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy4kJGMgPSBjcmVhdGVDbGFzc0NvbXBvbmVudCh7XG5cdFx0XHRcdFx0Y29tcG9uZW50OiB0aGlzLiQkY3Rvcixcblx0XHRcdFx0XHR0YXJnZXQ6IHRoaXMuJCRzaGFkb3dSb290IHx8IHRoaXMsXG5cdFx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRcdC4uLnRoaXMuJCRkLFxuXHRcdFx0XHRcdFx0JCRzbG90cyxcblx0XHRcdFx0XHRcdCQkaG9zdDogdGhpc1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gUmVmbGVjdCBjb21wb25lbnQgcHJvcHMgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHR0aGlzLiQkbWUgPSBlZmZlY3Rfcm9vdCgoKSA9PiB7XG5cdFx0XHRcdFx0cmVuZGVyX2VmZmVjdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLiQkciA9IHRydWU7XG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBvYmplY3Rfa2V5cyh0aGlzLiQkYykpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLiQkcF9kW2tleV0/LnJlZmxlY3QpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHR0aGlzLiQkZFtrZXldID0gdGhpcy4kJGNba2V5XTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYXR0cmlidXRlX3ZhbHVlID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKFxuXHRcdFx0XHRcdFx0XHRcdGtleSxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLiQkZFtrZXldLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuJCRwX2QsXG5cdFx0XHRcdFx0XHRcdFx0J3RvQXR0cmlidXRlJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYXR0cmlidXRlX3ZhbHVlID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLiQkcF9kW2tleV0uYXR0cmlidXRlIHx8IGtleSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUodGhpcy4kJHBfZFtrZXldLmF0dHJpYnV0ZSB8fCBrZXksIGF0dHJpYnV0ZV92YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuJCRyID0gZmFsc2U7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgdHlwZSBpbiB0aGlzLiQkbCkge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy4kJGxbdHlwZV0pIHtcblx0XHRcdFx0XHRcdGNvbnN0IHVuc3ViID0gdGhpcy4kJGMuJG9uKHR5cGUsIGxpc3RlbmVyKTtcblx0XHRcdFx0XHRcdHRoaXMuJCRsX3Uuc2V0KGxpc3RlbmVyLCB1bnN1Yik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuJCRsID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gV2UgZG9uJ3QgbmVlZCB0aGlzIHdoZW4gd29ya2luZyB3aXRoaW4gU3ZlbHRlIGNvZGUsIGJ1dCBmb3IgY29tcGF0aWJpbGl0eSBvZiBwZW9wbGUgdXNpbmcgdGhpcyBvdXRzaWRlIG9mIFN2ZWx0ZVxuXHRcdC8vIGFuZCBzZXR0aW5nIGF0dHJpYnV0ZXMgdGhyb3VnaCBzZXRBdHRyaWJ1dGUgZXRjLCB0aGlzIGlzIGhlbHBmdWxcblxuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IF9vbGRWYWx1ZVxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuZXdWYWx1ZVxuXHRcdCAqL1xuXHRcdGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy4kJHIpIHJldHVybjtcblx0XHRcdGF0dHIgPSB0aGlzLiQkZ19wKGF0dHIpO1xuXHRcdFx0dGhpcy4kJGRbYXR0cl0gPSBnZXRfY3VzdG9tX2VsZW1lbnRfdmFsdWUoYXR0ciwgbmV3VmFsdWUsIHRoaXMuJCRwX2QsICd0b1Byb3AnKTtcblx0XHRcdHRoaXMuJCRjPy4kc2V0KHsgW2F0dHJdOiB0aGlzLiQkZFthdHRyXSB9KTtcblx0XHR9XG5cblx0XHRkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuJCRjbiA9IGZhbHNlO1xuXHRcdFx0Ly8gSW4gYSBtaWNyb3Rhc2ssIGJlY2F1c2UgdGhpcyBjb3VsZCBiZSBhIG1vdmUgd2l0aGluIHRoZSBET01cblx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRpZiAoIXRoaXMuJCRjbiAmJiB0aGlzLiQkYykge1xuXHRcdFx0XHRcdHRoaXMuJCRjLiRkZXN0cm95KCk7XG5cdFx0XHRcdFx0dGhpcy4kJG1lKCk7XG5cdFx0XHRcdFx0dGhpcy4kJGMgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVfbmFtZVxuXHRcdCAqL1xuXHRcdCQkZ19wKGF0dHJpYnV0ZV9uYW1lKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRvYmplY3Rfa2V5cyh0aGlzLiQkcF9kKS5maW5kKFxuXHRcdFx0XHRcdChrZXkpID0+XG5cdFx0XHRcdFx0XHR0aGlzLiQkcF9kW2tleV0uYXR0cmlidXRlID09PSBhdHRyaWJ1dGVfbmFtZSB8fFxuXHRcdFx0XHRcdFx0KCF0aGlzLiQkcF9kW2tleV0uYXR0cmlidXRlICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSBhdHRyaWJ1dGVfbmFtZSlcblx0XHRcdFx0KSB8fCBhdHRyaWJ1dGVfbmFtZVxuXHRcdFx0KTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBDdXN0b21FbGVtZW50UHJvcERlZmluaXRpb24+fSBwcm9wc19kZWZpbml0aW9uXG4gKiBAcGFyYW0geyd0b0F0dHJpYnV0ZScgfCAndG9Qcm9wJ30gW3RyYW5zZm9ybV1cbiAqL1xuZnVuY3Rpb24gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKHByb3AsIHZhbHVlLCBwcm9wc19kZWZpbml0aW9uLCB0cmFuc2Zvcm0pIHtcblx0Y29uc3QgdHlwZSA9IHByb3BzX2RlZmluaXRpb25bcHJvcF0/LnR5cGU7XG5cdHZhbHVlID0gdHlwZSA9PT0gJ0Jvb2xlYW4nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nID8gdmFsdWUgIT0gbnVsbCA6IHZhbHVlO1xuXHRpZiAoIXRyYW5zZm9ybSB8fCAhcHJvcHNfZGVmaW5pdGlvbltwcm9wXSkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fSBlbHNlIGlmICh0cmFuc2Zvcm0gPT09ICd0b0F0dHJpYnV0ZScpIHtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gbnVsbCA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdGNhc2UgJ0Jvb2xlYW4nOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPyAnJyA6IG51bGw7XG5cdFx0XHRjYXNlICdOdW1iZXInOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IG51bGwgOiB2YWx1ZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgJiYgSlNPTi5wYXJzZSh2YWx1ZSk7XG5cdFx0XHRjYXNlICdCb29sZWFuJzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlOyAvLyBjb252ZXJzaW9uIGFscmVhZHkgaGFuZGxlZCBhYm92ZVxuXHRcdFx0Y2FzZSAnTnVtYmVyJzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlICE9IG51bGwgPyArdmFsdWUgOiB2YWx1ZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMoZWxlbWVudCkge1xuXHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIHRydWU+fSAqL1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0ZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcblx0XHRyZXN1bHRbLyoqIEB0eXBlIHtFbGVtZW50fSBub2RlICovIChub2RlKS5zbG90IHx8ICdkZWZhdWx0J10gPSB0cnVlO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqXG4gKiBUdXJuIGEgU3ZlbHRlIGNvbXBvbmVudCBpbnRvIGEgY3VzdG9tIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gQ29tcG9uZW50ICBBIFN2ZWx0ZSBjb21wb25lbnQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgQ3VzdG9tRWxlbWVudFByb3BEZWZpbml0aW9uPn0gcHJvcHNfZGVmaW5pdGlvbiAgVGhlIHByb3BzIHRvIG9ic2VydmVcbiAqIEBwYXJhbSB7c3RyaW5nW119IHNsb3RzICBUaGUgc2xvdHMgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBleHBvcnRzICBFeHBsaWNpdGx5IGV4cG9ydGVkIHZhbHVlcywgb3RoZXIgdGhhbiBwcm9wc1xuICogQHBhcmFtIHtTaGFkb3dSb290SW5pdCB8IHVuZGVmaW5lZH0gc2hhZG93X3Jvb3RfaW5pdCAgT3B0aW9ucyBwYXNzZWQgdG8gc2hhZG93IERPTSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHsoY2U6IG5ldyAoKSA9PiBIVE1MRWxlbWVudCkgPT4gbmV3ICgpID0+IEhUTUxFbGVtZW50fSBbZXh0ZW5kXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX2N1c3RvbV9lbGVtZW50KFxuXHRDb21wb25lbnQsXG5cdHByb3BzX2RlZmluaXRpb24sXG5cdHNsb3RzLFxuXHRleHBvcnRzLFxuXHRzaGFkb3dfcm9vdF9pbml0LFxuXHRleHRlbmRcbikge1xuXHRsZXQgQ2xhc3MgPSBjbGFzcyBleHRlbmRzIFN2ZWx0ZUVsZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0c3VwZXIoQ29tcG9uZW50LCBzbG90cywgc2hhZG93X3Jvb3RfaW5pdCk7XG5cdFx0XHR0aGlzLiQkcF9kID0gcHJvcHNfZGVmaW5pdGlvbjtcblx0XHR9XG5cdFx0c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG5cdFx0XHRyZXR1cm4gb2JqZWN0X2tleXMocHJvcHNfZGVmaW5pdGlvbikubWFwKChrZXkpID0+XG5cdFx0XHRcdChwcm9wc19kZWZpbml0aW9uW2tleV0uYXR0cmlidXRlIHx8IGtleSkudG9Mb3dlckNhc2UoKVxuXHRcdFx0KTtcblx0XHR9XG5cdH07XG5cdG9iamVjdF9rZXlzKHByb3BzX2RlZmluaXRpb24pLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRkZWZpbmVfcHJvcGVydHkoQ2xhc3MucHJvdG90eXBlLCBwcm9wLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLiQkYyAmJiBwcm9wIGluIHRoaXMuJCRjID8gdGhpcy4kJGNbcHJvcF0gOiB0aGlzLiQkZFtwcm9wXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQodmFsdWUpIHtcblx0XHRcdFx0dmFsdWUgPSBnZXRfY3VzdG9tX2VsZW1lbnRfdmFsdWUocHJvcCwgdmFsdWUsIHByb3BzX2RlZmluaXRpb24pO1xuXHRcdFx0XHR0aGlzLiQkZFtwcm9wXSA9IHZhbHVlO1xuXHRcdFx0XHR2YXIgY29tcG9uZW50ID0gdGhpcy4kJGM7XG5cblx0XHRcdFx0aWYgKGNvbXBvbmVudCkge1xuXHRcdFx0XHRcdC8vIC8vIElmIHRoZSBpbnN0YW5jZSBoYXMgYW4gYWNjZXNzb3IsIHVzZSB0aGF0IGluc3RlYWRcblx0XHRcdFx0XHR2YXIgc2V0dGVyID0gZ2V0X2Rlc2NyaXB0b3IoY29tcG9uZW50LCBwcm9wKT8uZ2V0O1xuXG5cdFx0XHRcdFx0aWYgKHNldHRlcikge1xuXHRcdFx0XHRcdFx0Y29tcG9uZW50W3Byb3BdID0gdmFsdWU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudC4kc2V0KHsgW3Byb3BdOiB2YWx1ZSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdGV4cG9ydHMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcblx0XHRkZWZpbmVfcHJvcGVydHkoQ2xhc3MucHJvdG90eXBlLCBwcm9wZXJ0eSwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy4kJGM/Lltwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXHRpZiAoZXh0ZW5kKSB7XG5cdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciAtIGFzc2lnbmluZyBoZXJlIGlzIGZpbmVcblx0XHRDbGFzcyA9IGV4dGVuZChDbGFzcyk7XG5cdH1cblx0Q29tcG9uZW50LmVsZW1lbnQgPSAvKiogQHR5cGUge2FueX0gKi8gQ2xhc3M7XG5cdHJldHVybiBDbGFzcztcbn1cbiIsImltcG9ydCB7IFNUQVRFX1NZTUJPTCB9IGZyb20gJyNjbGllbnQvY29uc3RhbnRzJztcbmltcG9ydCB7IHNuYXBzaG90IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Nsb25lLmpzJztcbmltcG9ydCAqIGFzIHcgZnJvbSAnLi4vd2FybmluZ3MuanMnO1xuaW1wb3J0IHsgdW50cmFjayB9IGZyb20gJy4uL3J1bnRpbWUuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSAgey4uLmFueX0gb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nX2lmX2NvbnRhaW5zX3N0YXRlKG1ldGhvZCwgLi4ub2JqZWN0cykge1xuXHR1bnRyYWNrKCgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0bGV0IGhhc19zdGF0ZSA9IGZhbHNlO1xuXHRcdFx0Y29uc3QgdHJhbnNmb3JtZWQgPSBbXTtcblxuXHRcdFx0Zm9yIChjb25zdCBvYmogb2Ygb2JqZWN0cykge1xuXHRcdFx0XHRpZiAob2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIFNUQVRFX1NZTUJPTCBpbiBvYmopIHtcblx0XHRcdFx0XHR0cmFuc2Zvcm1lZC5wdXNoKHNuYXBzaG90KG9iaiwgdHJ1ZSkpO1xuXHRcdFx0XHRcdGhhc19zdGF0ZSA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dHJhbnNmb3JtZWQucHVzaChvYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChoYXNfc3RhdGUpIHtcblx0XHRcdFx0dy5jb25zb2xlX2xvZ19zdGF0ZShtZXRob2QpO1xuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRcdGNvbnNvbGUubG9nKCclY1tzbmFwc2hvdF0nLCAnY29sb3I6IGdyZXknLCAuLi50cmFuc2Zvcm1lZCk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHQvLyBFcnJvcnMgY2FuIG9jY3VyIHdoZW4gdHJ5aW5nIHRvIHNuYXBzaG90IG9iamVjdHMgd2l0aCBnZXR0ZXJzIHRoYXQgdGhyb3cgb3Igbm9uLWVudW1lcmFibGUgcHJvcGVydGllcy5cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBvYmplY3RzO1xufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBWUEsU0FBZ0IsV0FBVyxLQUFLLElBQUk7Q0FDbkMsSUFBSSxDQUFDLGlCQUNKLDRCQUE4QixZQUFZO0NBRzNDLElBQUksV0FBVztFQUNkLE1BQU0sUUFBUSxPQUFPLFVBQVU7RUFFL0IsSUFBSSxPQUFPLElBQUksR0FBRyxHQUNqQixPQUF5QixNQUFNLElBQUksR0FBRztFQUl0QyxnQ0FBa0MsR0FBRztDQUl2QztDQUVBLE9BQU8sR0FBRztBQUNYOzs7Ozs7O0FDdEJBLFNBQWdCLDhCQUE4QixRQUFRO0NBQ3JELE1BQU0sTUFBTSxPQUFPO0NBQ25CLElBQUksT0FBTyxRQUFRLEdBQUcsR0FDckIsNkJBQStCLEdBQUc7QUFFcEM7O0FBR0EsU0FBZ0IsNkJBQTZCLFFBQVE7Q0FDcEQsTUFBTSxNQUFNLE9BQU87Q0FFbkIsSUFBSSxPQUFPLEVBRE8sT0FBTyxRQUFRLFdBRWhDLGtDQUFvQztBQUV0Qzs7Ozs7QUFNQSxTQUFnQixlQUFlLE9BQU8sTUFBTTtDQUMzQyxJQUFJLFNBQVMsUUFBUSxPQUFPLE1BQU0sY0FBYyxZQUMvQyxvQkFBc0IsSUFBSTtBQUU1Qjs7Ozs7QUFNQSxTQUFnQixnQ0FBZ0MsSUFBSTtDQUNuRCxHQUFHLGlCQUFpQjtFQUNuQiwyQkFBNkI7RUFDN0IsT0FBTztDQUNSO0NBQ0EsT0FBTztBQUNSOzs7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