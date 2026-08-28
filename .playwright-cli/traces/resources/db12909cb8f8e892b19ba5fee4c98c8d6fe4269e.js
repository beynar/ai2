import { At as user_derived, _t as state, a as get, bn as label, dt as increment, gt as source, ht as set, l as set_active_reaction, n as active_reaction, p as update_version, xn as tag } from "/node_modules/.vite/deps/runtime-CvqZjhGP.js?v=1b1d2797";
import "/node_modules/.vite/deps/esm-env-D6lI19eD.js?v=1b1d2797";
import "/node_modules/.vite/deps/client-DfNCoPF5.js?v=1b1d2797";
import { c as on } from "/node_modules/.vite/deps/events-BMGcVxNO.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_events.js?v=1b1d2797";
import { t as ReactiveValue } from "/node_modules/.vite/deps/reactive-value-kAfdoCo5.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/date.js
/** @import { Source } from '#client' */
var inited$1 = false;
/**
* A reactive version of the built-in [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.
* Reading the date (whether with methods like `date.getTime()` or `date.toString()`, or via things like [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat))
* in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
* will cause it to be re-evaluated when the value of the date changes.
*
* ```svelte
* <script>
* 	import { SvelteDate } from 'svelte/reactivity';
*
* 	const date = new SvelteDate();
*
* 	const formatter = new Intl.DateTimeFormat(undefined, {
* 	  hour: 'numeric',
* 	  minute: 'numeric',
* 	  second: 'numeric'
* 	});
*
* 	$effect(() => {
* 		const interval = setInterval(() => {
* 			date.setTime(Date.now());
* 		}, 1000);
*
* 		return () => {
* 			clearInterval(interval);
* 		};
* 	});
* <\/script>
*
* <p>The time is {formatter.format(date)}</p>
* ```
*/
var SvelteDate = class SvelteDate extends Date {
	#time = /* @__PURE__ */ state(super.getTime());
	/** @type {Map<keyof Date, Source<unknown>>} */
	#deriveds = /* @__PURE__ */ new Map();
	#reaction = active_reaction;
	/** @param {any[]} params */
	constructor(...params) {
		super(...params);
		tag(this.#time, "SvelteDate.#time");
		if (!inited$1) this.#init();
	}
	#init() {
		inited$1 = true;
		var proto = SvelteDate.prototype;
		var date_proto = Date.prototype;
		var methods = Object.getOwnPropertyNames(date_proto);
		for (const method of methods) {
			if (method.startsWith("get") || method.startsWith("to") || method === "valueOf") proto[method] = function(...args) {
				if (args.length > 0) {
					get(this.#time);
					return date_proto[method].apply(this, args);
				}
				var d = this.#deriveds.get(method);
				if (d === void 0) {
					const reaction = active_reaction;
					set_active_reaction(this.#reaction);
					d = /* @__PURE__ */ user_derived(() => {
						get(this.#time);
						return date_proto[method].apply(this, args);
					});
					tag(d, `SvelteDate.${method}()`);
					this.#deriveds.set(method, d);
					set_active_reaction(reaction);
				}
				return get(d);
			};
			if (method.startsWith("set")) proto[method] = function(...args) {
				var result = date_proto[method].apply(this, args);
				set(this.#time, date_proto.getTime.call(this));
				return result;
			};
		}
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/set.js
/** @import { Source } from '#client' */
var read_methods = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
];
var set_like_methods = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
];
var inited = false;
/**
* A reactive version of the built-in [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.
* Reading contents of the set (by iterating, or by reading `set.size` or calling `set.has(...)` as in the [example](https://svelte.dev/playground/53438b51194b4882bcc18cddf9f96f15) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
* will cause it to be re-evaluated as necessary when the set is updated.
*
* Note that values in a reactive set are _not_ made [deeply reactive](https://svelte.dev/docs/svelte/$state#Deep-state).
*
* ```svelte
* <script>
* 	import { SvelteSet } from 'svelte/reactivity';
* 	let monkeys = new SvelteSet();
*
* 	function toggle(monkey) {
* 		if (monkeys.has(monkey)) {
* 			monkeys.delete(monkey);
* 		} else {
* 			monkeys.add(monkey);
* 		}
* 	}
* <\/script>
*
* {#each ['🙈', '🙉', '🙊'] as monkey}
* 	<button onclick={() => toggle(monkey)}>{monkey}</button>
* {/each}
*
* <button onclick={() => monkeys.clear()}>clear</button>
*
* {#if monkeys.has('🙈')}<p>see no evil</p>{/if}
* {#if monkeys.has('🙉')}<p>hear no evil</p>{/if}
* {#if monkeys.has('🙊')}<p>speak no evil</p>{/if}
* ```
*
* @template T
* @extends {Set<T>}
*/
var SvelteSet = class SvelteSet extends Set {
	/** @type {Map<T, Source<boolean>>} */
	#sources = /* @__PURE__ */ new Map();
	#version = /* @__PURE__ */ state(0);
	#size = /* @__PURE__ */ state(0);
	#update_version = update_version || -1;
	/**
	* @param {Iterable<T> | null | undefined} [value]
	*/
	constructor(value) {
		super();
		value = new Set(value);
		tag(this.#version, "SvelteSet version");
		tag(this.#size, "SvelteSet.size");
		if (value) {
			for (var element of value) super.add(element);
			this.#size.v = super.size;
		}
		if (!inited) this.#init();
	}
	/**
	* If the source is being created inside the same reaction as the SvelteSet instance,
	* we use `state` so that it will not be a dependency of the reaction. Otherwise we
	* use `source` so it will be.
	*
	* @template T
	* @param {T} value
	* @returns {Source<T>}
	*/
	#source(value) {
		return update_version === this.#update_version ? /* @__PURE__ */ state(value) : source(value);
	}
	#init() {
		inited = true;
		var proto = SvelteSet.prototype;
		var set_proto = Set.prototype;
		for (const method of read_methods) proto[method] = function(...v) {
			get(this.#version);
			return set_proto[method].apply(this, v);
		};
		for (const method of set_like_methods) proto[method] = function(...v) {
			get(this.#version);
			var set = set_proto[method].apply(this, v);
			return new SvelteSet(set);
		};
	}
	/** @param {T} value */
	has(value) {
		var has = super.has(value);
		var sources = this.#sources;
		var s = sources.get(value);
		if (s === void 0) {
			if (!has) {
				get(this.#version);
				return false;
			}
			s = this.#source(true);
			tag(s, `SvelteSet has(${label(value)})`);
			sources.set(value, s);
		}
		get(s);
		return has;
	}
	/** @param {T} value */
	add(value) {
		if (!super.has(value)) {
			super.add(value);
			set(this.#size, super.size);
			increment(this.#version);
		}
		return this;
	}
	/** @param {T} value */
	delete(value) {
		var deleted = super.delete(value);
		var sources = this.#sources;
		var s = sources.get(value);
		if (s !== void 0) {
			sources.delete(value);
			set(s, false);
		}
		if (deleted) {
			set(this.#size, super.size);
			increment(this.#version);
		}
		return deleted;
	}
	clear() {
		if (super.size === 0) return;
		super.clear();
		var sources = this.#sources;
		for (var s of sources.values()) set(s, false);
		sources.clear();
		set(this.#size, 0);
		increment(this.#version);
	}
	keys() {
		return this.values();
	}
	values() {
		get(this.#version);
		return super.values();
	}
	entries() {
		get(this.#version);
		return super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return get(this.#size);
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/map.js
/** @import { Source } from '#client' */
/**
* A reactive version of the built-in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.
* Reading contents of the map (by iterating, or by reading `map.size` or calling `map.get(...)` or `map.has(...)` as in the [tic-tac-toe example](https://svelte.dev/playground/0b0ff4aa49c9443f9b47fe5203c78293) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
* will cause it to be re-evaluated as necessary when the map is updated.
*
* Note that values in a reactive map are _not_ made [deeply reactive](https://svelte.dev/docs/svelte/$state#Deep-state).
*
* ```svelte
* <script>
* 	import { SvelteMap } from 'svelte/reactivity';
* 	import { result } from './game.js';
*
* 	let board = new SvelteMap();
* 	let player = $state('x');
* 	let winner = $derived(result(board));
*
* 	function reset() {
* 		player = 'x';
* 		board.clear();
* 	}
* <\/script>
*
* <div class="board">
* 	{#each Array(9), i}
* 		<button
* 			disabled={board.has(i) || winner}
* 			onclick={() => {
* 				board.set(i, player);
* 				player = player === 'x' ? 'o' : 'x';
* 			}}
* 		>{board.get(i)}</button>
* 	{/each}
* </div>
*
* {#if winner}
* 	<p>{winner} wins!</p>
* 	<button onclick={reset}>reset</button>
* {:else}
* 	<p>{player} is next</p>
* {/if}
* ```
*
* @template K
* @template V
* @extends {Map<K, V>}
*/
var SvelteMap = class extends Map {
	/** @type {Map<K, Source<number>>} */
	#sources = /* @__PURE__ */ new Map();
	#version = /* @__PURE__ */ state(0);
	#size = /* @__PURE__ */ state(0);
	#update_version = update_version || -1;
	/**
	* @param {Iterable<readonly [K, V]> | null | undefined} [value]
	*/
	constructor(value) {
		super();
		value = new Map(value);
		tag(this.#version, "SvelteMap version");
		tag(this.#size, "SvelteMap.size");
		if (value) {
			for (var [key, v] of value) super.set(key, v);
			this.#size.v = super.size;
		}
	}
	/**
	* If the source is being created inside the same reaction as the SvelteMap instance,
	* we use `state` so that it will not be a dependency of the reaction. Otherwise we
	* use `source` so it will be.
	*
	* @template T
	* @param {T} value
	* @returns {Source<T>}
	*/
	#source(value) {
		return update_version === this.#update_version ? /* @__PURE__ */ state(value) : source(value);
	}
	/** @param {K} key */
	has(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		if (s === void 0) if (super.has(key)) {
			s = this.#source(0);
			tag(s, `SvelteMap get(${label(key)})`);
			sources.set(key, s);
		} else {
			get(this.#version);
			return false;
		}
		get(s);
		return true;
	}
	/**
	* @param {(value: V, key: K, map: Map<K, V>) => void} callbackfn
	* @param {any} [this_arg]
	*/
	forEach(callbackfn, this_arg) {
		this.#read_all();
		super.forEach(callbackfn, this_arg);
	}
	/** @param {K} key */
	get(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		if (s === void 0) if (super.has(key)) {
			s = this.#source(0);
			tag(s, `SvelteMap get(${label(key)})`);
			sources.set(key, s);
		} else {
			get(this.#version);
			return;
		}
		get(s);
		return super.get(key);
	}
	/**
	* @param {K} key
	* @param {V} value
	* */
	set(key, value) {
		var sources = this.#sources;
		var s = sources.get(key);
		var prev_res = super.get(key);
		var res = super.set(key, value);
		var version = this.#version;
		if (s === void 0) {
			s = this.#source(0);
			tag(s, `SvelteMap get(${label(key)})`);
			sources.set(key, s);
			set(this.#size, super.size);
			increment(version);
		} else if (prev_res !== value) {
			increment(s);
			var v_reactions = version.reactions === null ? null : new Set(version.reactions);
			if (v_reactions === null || !s.reactions?.every((r) => v_reactions.has(r))) increment(version);
		}
		return res;
	}
	/** @param {K} key */
	delete(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		var res = super.delete(key);
		if (s !== void 0) {
			sources.delete(key);
			set(s, -1);
		}
		if (res) {
			set(this.#size, super.size);
			increment(this.#version);
		}
		return res;
	}
	clear() {
		if (super.size === 0) return;
		super.clear();
		var sources = this.#sources;
		set(this.#size, 0);
		for (var s of sources.values()) set(s, -1);
		increment(this.#version);
		sources.clear();
	}
	#read_all() {
		get(this.#version);
		var sources = this.#sources;
		if (this.#size.v !== sources.size) {
			for (var key of super.keys()) if (!sources.has(key)) {
				var s = this.#source(0);
				tag(s, `SvelteMap get(${label(key)})`);
				sources.set(key, s);
			}
		}
		for ([, s] of this.#sources) get(s);
	}
	keys() {
		get(this.#version);
		return super.keys();
	}
	values() {
		this.#read_all();
		return super.values();
	}
	entries() {
		this.#read_all();
		return super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		get(this.#size);
		return super.size;
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/url-search-params.js
var REPLACE = Symbol("replace");
/**
* A reactive version of the built-in [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object.
* Reading its contents (by iterating, or by calling `params.get(...)` or `params.getAll(...)` as in the [example](https://svelte.dev/playground/b3926c86c5384bab9f2cf993bc08c1c8) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
* will cause it to be re-evaluated as necessary when the params are updated.
*
* ```svelte
* <script>
* 	import { SvelteURLSearchParams } from 'svelte/reactivity';
*
* 	const params = new SvelteURLSearchParams('message=hello');
*
* 	let key = $state('key');
* 	let value = $state('value');
* <\/script>
*
* <input bind:value={key} />
* <input bind:value={value} />
* <button onclick={() => params.append(key, value)}>append</button>
*
* <p>?{params.toString()}</p>
*
* {#each params as [key, value]}
* 	<p>{key}: {value}</p>
* {/each}
* ```
*/
var SvelteURLSearchParams = class extends URLSearchParams {
	#version = tag(/* @__PURE__ */ state(0), "SvelteURLSearchParams version");
	#url = get_current_url();
	#updating = false;
	#update_url() {
		if (!this.#url || this.#updating) return;
		this.#updating = true;
		const search = this.toString();
		this.#url.search = search && `?${search}`;
		this.#updating = false;
	}
	/**
	* @param {URLSearchParams} params
	* @internal
	*/
	[REPLACE](params) {
		if (this.#updating) return;
		if (params.toString() === super.toString()) return;
		this.#updating = true;
		for (const key of [...super.keys()]) super.delete(key);
		for (const [key, value] of params) super.append(key, value);
		increment(this.#version);
		this.#updating = false;
	}
	/**
	* @param {string} name
	* @param {string} value
	* @returns {void}
	*/
	append(name, value) {
		super.append(name, value);
		this.#update_url();
		increment(this.#version);
	}
	/**
	* @param {string} name
	* @param {string=} value
	* @returns {void}
	*/
	delete(name, value) {
		var has_value = super.has(name, value);
		super.delete(name, value);
		if (has_value) {
			this.#update_url();
			increment(this.#version);
		}
	}
	/**
	* @param {string} name
	* @returns {string|null}
	*/
	get(name) {
		get(this.#version);
		return super.get(name);
	}
	/**
	* @param {string} name
	* @returns {string[]}
	*/
	getAll(name) {
		get(this.#version);
		return super.getAll(name);
	}
	/**
	* @param {string} name
	* @param {string=} value
	* @returns {boolean}
	*/
	has(name, value) {
		get(this.#version);
		return super.has(name, value);
	}
	keys() {
		get(this.#version);
		return super.keys();
	}
	/**
	* @param {(value: string, key: string, parent: URLSearchParams) => void} callback
	* @param {any} [this_arg]
	* @returns {void}
	*/
	forEach(callback, this_arg) {
		get(this.#version);
		super.forEach(callback, this_arg);
	}
	/**
	* @param {string} name
	* @param {string} value
	* @returns {void}
	*/
	set(name, value) {
		var previous = super.getAll(name);
		super.set(name, value);
		var current = super.getAll(name);
		if (previous.length !== current.length || previous.some((value, i) => value !== current[i])) {
			this.#update_url();
			increment(this.#version);
		}
	}
	sort() {
		super.sort();
		this.#update_url();
		increment(this.#version);
	}
	toString() {
		get(this.#version);
		return super.toString();
	}
	values() {
		get(this.#version);
		return super.values();
	}
	entries() {
		get(this.#version);
		return super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		get(this.#version);
		return super.size;
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/url.js
/** @type {SvelteURL | null} */
var current_url = null;
function get_current_url() {
	return current_url;
}
/**
* A reactive version of the built-in [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
* Reading properties of the URL (such as `url.href` or `url.pathname`) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
* will cause it to be re-evaluated as necessary when the URL changes.
*
* The `searchParams` property is an instance of [SvelteURLSearchParams](https://svelte.dev/docs/svelte/svelte-reactivity#SvelteURLSearchParams).
*
* [Example](https://svelte.dev/playground/5a694758901b448c83dc40dc31c71f2a):
*
* ```svelte
* <script>
* 	import { SvelteURL } from 'svelte/reactivity';
*
* 	const url = new SvelteURL('https://example.com/path');
* <\/script>
*
* <!-- changes to these... -->
* <input bind:value={url.protocol} />
* <input bind:value={url.hostname} />
* <input bind:value={url.pathname} />
*
* <hr />
*
* <!-- will update `href` and vice versa -->
* <input bind:value={url.href} size="65" />
* ```
*/
var SvelteURL = class extends URL {
	#protocol = /* @__PURE__ */ state(super.protocol);
	#username = /* @__PURE__ */ state(super.username);
	#password = /* @__PURE__ */ state(super.password);
	#hostname = /* @__PURE__ */ state(super.hostname);
	#port = /* @__PURE__ */ state(super.port);
	#pathname = /* @__PURE__ */ state(super.pathname);
	#hash = /* @__PURE__ */ state(super.hash);
	#search = /* @__PURE__ */ state(super.search);
	#searchParams;
	/**
	* @param {string | URL} url
	* @param {string | URL} [base]
	*/
	constructor(url, base) {
		url = new URL(url, base);
		super(url);
		tag(this.#protocol, "SvelteURL.protocol");
		tag(this.#username, "SvelteURL.username");
		tag(this.#password, "SvelteURL.password");
		tag(this.#hostname, "SvelteURL.hostname");
		tag(this.#port, "SvelteURL.port");
		tag(this.#pathname, "SvelteURL.pathname");
		tag(this.#hash, "SvelteURL.hash");
		tag(this.#search, "SvelteURL.search");
		current_url = this;
		this.#searchParams = new SvelteURLSearchParams(url.searchParams);
		current_url = null;
	}
	get hash() {
		return get(this.#hash);
	}
	set hash(value) {
		super.hash = value;
		set(this.#hash, super.hash);
	}
	get host() {
		get(this.#hostname);
		get(this.#port);
		return super.host;
	}
	set host(value) {
		super.host = value;
		set(this.#hostname, super.hostname);
		set(this.#port, super.port);
	}
	get hostname() {
		return get(this.#hostname);
	}
	set hostname(value) {
		super.hostname = value;
		set(this.#hostname, super.hostname);
	}
	get href() {
		get(this.#protocol);
		get(this.#username);
		get(this.#password);
		get(this.#hostname);
		get(this.#port);
		get(this.#pathname);
		get(this.#hash);
		get(this.#search);
		return super.href;
	}
	set href(value) {
		super.href = value;
		set(this.#protocol, super.protocol);
		set(this.#username, super.username);
		set(this.#password, super.password);
		set(this.#hostname, super.hostname);
		set(this.#port, super.port);
		set(this.#pathname, super.pathname);
		set(this.#hash, super.hash);
		set(this.#search, super.search);
		this.#searchParams[REPLACE](super.searchParams);
	}
	get password() {
		return get(this.#password);
	}
	set password(value) {
		super.password = value;
		set(this.#password, super.password);
	}
	get pathname() {
		return get(this.#pathname);
	}
	set pathname(value) {
		super.pathname = value;
		set(this.#pathname, super.pathname);
	}
	get port() {
		return get(this.#port);
	}
	set port(value) {
		super.port = value;
		set(this.#port, super.port);
	}
	get protocol() {
		return get(this.#protocol);
	}
	set protocol(value) {
		super.protocol = value;
		set(this.#protocol, super.protocol);
	}
	get search() {
		return get(this.#search);
	}
	set search(value) {
		super.search = value;
		set(this.#search, super.search);
		this.#searchParams[REPLACE](super.searchParams);
	}
	get username() {
		return get(this.#username);
	}
	set username(value) {
		super.username = value;
		set(this.#username, super.username);
	}
	get origin() {
		get(this.#protocol);
		get(this.#hostname);
		get(this.#port);
		return super.origin;
	}
	get searchParams() {
		return this.#searchParams;
	}
	toString() {
		return this.href;
	}
	toJSON() {
		return this.href;
	}
};
//#endregion
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/media-query.js
var parenthesis_regex = /\(.+\)/;
var non_parenthesized_keywords = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]);
/**
* Creates a media query and provides a `current` property that reflects whether or not it matches.
*
* Use it carefully — during server-side rendering, there is no way to know what the correct value should be, potentially causing content to change upon hydration.
* If you can use the media query in CSS to achieve the same effect, do that.
*
* ```svelte
* <script>
* 	import { MediaQuery } from 'svelte/reactivity';
*
* 	const large = new MediaQuery('min-width: 800px');
* <\/script>
*
* <h1>{large.current ? 'large screen' : 'small screen'}</h1>
* ```
* @extends {ReactiveValue<boolean>}
* @since 5.7.0
*/
var MediaQuery = class extends ReactiveValue {
	/**
	* @param {string} query A media query string
	* @param {boolean} [fallback] Fallback value for the server
	*/
	constructor(query, fallback) {
		let final_query = parenthesis_regex.test(query) || query.split(/[\s,]+/).some((keyword) => non_parenthesized_keywords.has(keyword.trim())) ? query : `(${query})`;
		const q = window.matchMedia(final_query);
		super(() => q.matches, (update) => on(q, "change", update));
	}
};
//#endregion
export { SvelteSet as a, SvelteMap as i, SvelteURL as n, SvelteDate as o, SvelteURLSearchParams as r, MediaQuery as t };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtY2xpZW50LURYdVpWRVg5LmpzIiwibmFtZXMiOlsiaW5pdGVkIiwiI3RpbWUiLCIjaW5pdCIsIiNkZXJpdmVkcyIsIiNyZWFjdGlvbiIsIiN2ZXJzaW9uIiwiI3NpemUiLCIjaW5pdCIsIiN1cGRhdGVfdmVyc2lvbiIsIiNzb3VyY2VzIiwiI3NvdXJjZSIsIiN2ZXJzaW9uIiwiI3NpemUiLCIjdXBkYXRlX3ZlcnNpb24iLCIjc291cmNlcyIsIiNzb3VyY2UiLCIjcmVhZF9hbGwiLCIjdXJsIiwiI3VwZGF0aW5nIiwiI3ZlcnNpb24iLCIjdXBkYXRlX3VybCIsIiNwcm90b2NvbCIsIiN1c2VybmFtZSIsIiNwYXNzd29yZCIsIiNob3N0bmFtZSIsIiNwb3J0IiwiI3BhdGhuYW1lIiwiI2hhc2giLCIjc2VhcmNoIiwiI3NlYXJjaFBhcmFtcyJdLCJzb3VyY2VzIjpbIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9yZWFjdGl2aXR5L2RhdGUuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcmVhY3Rpdml0eS9zZXQuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcmVhY3Rpdml0eS9tYXAuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjEvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcmVhY3Rpdml0eS91cmwtc2VhcmNoLXBhcmFtcy5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9yZWFjdGl2aXR5L3VybC5qcyIsIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9yZWFjdGl2aXR5L21lZGlhLXF1ZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IGRlcml2ZWQgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvaW5kZXguanMnO1xuaW1wb3J0IHsgc2V0LCBzdGF0ZSB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L2Rldi90cmFjaW5nLmpzJztcbmltcG9ydCB7IGFjdGl2ZV9yZWFjdGlvbiwgZ2V0LCBzZXRfYWN0aXZlX3JlYWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5cbnZhciBpbml0ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBBIHJlYWN0aXZlIHZlcnNpb24gb2YgdGhlIGJ1aWx0LWluIFtgRGF0ZWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGUpIG9iamVjdC5cbiAqIFJlYWRpbmcgdGhlIGRhdGUgKHdoZXRoZXIgd2l0aCBtZXRob2RzIGxpa2UgYGRhdGUuZ2V0VGltZSgpYCBvciBgZGF0ZS50b1N0cmluZygpYCwgb3IgdmlhIHRoaW5ncyBsaWtlIFtgSW50bC5EYXRlVGltZUZvcm1hdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvRGF0ZVRpbWVGb3JtYXQpKVxuICogaW4gYW4gW2VmZmVjdF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QpIG9yIFtkZXJpdmVkXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGRlcml2ZWQpXG4gKiB3aWxsIGNhdXNlIGl0IHRvIGJlIHJlLWV2YWx1YXRlZCB3aGVuIHRoZSB2YWx1ZSBvZiB0aGUgZGF0ZSBjaGFuZ2VzLlxuICpcbiAqIGBgYHN2ZWx0ZVxuICogPHNjcmlwdD5cbiAqIFx0aW1wb3J0IHsgU3ZlbHRlRGF0ZSB9IGZyb20gJ3N2ZWx0ZS9yZWFjdGl2aXR5JztcbiAqXG4gKiBcdGNvbnN0IGRhdGUgPSBuZXcgU3ZlbHRlRGF0ZSgpO1xuICpcbiAqIFx0Y29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodW5kZWZpbmVkLCB7XG4gKiBcdCAgaG91cjogJ251bWVyaWMnLFxuICogXHQgIG1pbnV0ZTogJ251bWVyaWMnLFxuICogXHQgIHNlY29uZDogJ251bWVyaWMnXG4gKiBcdH0pO1xuICpcbiAqIFx0JGVmZmVjdCgoKSA9PiB7XG4gKiBcdFx0Y29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gKiBcdFx0XHRkYXRlLnNldFRpbWUoRGF0ZS5ub3coKSk7XG4gKiBcdFx0fSwgMTAwMCk7XG4gKlxuICogXHRcdHJldHVybiAoKSA9PiB7XG4gKiBcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcbiAqIFx0XHR9O1xuICogXHR9KTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDxwPlRoZSB0aW1lIGlzIHtmb3JtYXR0ZXIuZm9ybWF0KGRhdGUpfTwvcD5cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgU3ZlbHRlRGF0ZSBleHRlbmRzIERhdGUge1xuXHQjdGltZSA9IHN0YXRlKHN1cGVyLmdldFRpbWUoKSk7XG5cblx0LyoqIEB0eXBlIHtNYXA8a2V5b2YgRGF0ZSwgU291cmNlPHVua25vd24+Pn0gKi9cblx0I2Rlcml2ZWRzID0gbmV3IE1hcCgpO1xuXG5cdCNyZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblxuXHQvKiogQHBhcmFtIHthbnlbXX0gcGFyYW1zICovXG5cdGNvbnN0cnVjdG9yKC4uLnBhcmFtcykge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzdXBlciguLi5wYXJhbXMpO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0dGFnKHRoaXMuI3RpbWUsICdTdmVsdGVEYXRlLiN0aW1lJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFpbml0ZWQpIHRoaXMuI2luaXQoKTtcblx0fVxuXG5cdCNpbml0KCkge1xuXHRcdGluaXRlZCA9IHRydWU7XG5cblx0XHR2YXIgcHJvdG8gPSBTdmVsdGVEYXRlLnByb3RvdHlwZTtcblx0XHR2YXIgZGF0ZV9wcm90byA9IERhdGUucHJvdG90eXBlO1xuXG5cdFx0dmFyIG1ldGhvZHMgPSAvKiogQHR5cGUge0FycmF5PGtleW9mIERhdGUgJiBzdHJpbmc+fSAqLyAoXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRlX3Byb3RvKVxuXHRcdCk7XG5cblx0XHRmb3IgKGNvbnN0IG1ldGhvZCBvZiBtZXRob2RzKSB7XG5cdFx0XHRpZiAobWV0aG9kLnN0YXJ0c1dpdGgoJ2dldCcpIHx8IG1ldGhvZC5zdGFydHNXaXRoKCd0bycpIHx8IG1ldGhvZCA9PT0gJ3ZhbHVlT2YnKSB7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0cHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0Ly8gZG9uJ3QgbWVtb2l6ZSBpZiB0aGVyZSBhcmUgYXJndW1lbnRzXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdGlmIChhcmdzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGdldCh0aGlzLiN0aW1lKTtcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdHJldHVybiBkYXRlX3Byb3RvW21ldGhvZF0uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGQgPSB0aGlzLiNkZXJpdmVkcy5nZXQobWV0aG9kKTtcblxuXHRcdFx0XHRcdGlmIChkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdC8vIGxhemlseSBjcmVhdGUgdGhlIGRlcml2ZWQsIGJ1dCBhcyB0aG91Z2ggaXQgd2VyZSBiZWluZ1xuXHRcdFx0XHRcdFx0Ly8gY3JlYXRlZCBhdCB0aGUgc2FtZSB0aW1lIGFzIHRoZSBjbGFzcyBpbnN0YW5jZVxuXHRcdFx0XHRcdFx0Y29uc3QgcmVhY3Rpb24gPSBhY3RpdmVfcmVhY3Rpb247XG5cdFx0XHRcdFx0XHRzZXRfYWN0aXZlX3JlYWN0aW9uKHRoaXMuI3JlYWN0aW9uKTtcblxuXHRcdFx0XHRcdFx0ZCA9IGRlcml2ZWQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRnZXQodGhpcy4jdGltZSk7XG5cdFx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGRhdGVfcHJvdG9bbWV0aG9kXS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0XHRcdHRhZyhkLCBgU3ZlbHRlRGF0ZS4ke21ldGhvZH0oKWApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLiNkZXJpdmVkcy5zZXQobWV0aG9kLCBkKTtcblxuXHRcdFx0XHRcdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihyZWFjdGlvbik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGdldChkKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1ldGhvZC5zdGFydHNXaXRoKCdzZXQnKSkge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdHByb3RvW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gZGF0ZV9wcm90b1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdHNldCh0aGlzLiN0aW1lLCBkYXRlX3Byb3RvLmdldFRpbWUuY2FsbCh0aGlzKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIi8qKiBAaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnI2NsaWVudCcgKi9cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0IHsgc291cmNlLCBzZXQsIHN0YXRlLCBpbmNyZW1lbnQgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvcmVhY3Rpdml0eS9zb3VyY2VzLmpzJztcbmltcG9ydCB7IGxhYmVsLCB0YWcgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvZGV2L3RyYWNpbmcuanMnO1xuaW1wb3J0IHsgZ2V0LCB1cGRhdGVfdmVyc2lvbiB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9ydW50aW1lLmpzJztcblxudmFyIHJlYWRfbWV0aG9kcyA9IFsnZm9yRWFjaCcsICdpc0Rpc2pvaW50RnJvbScsICdpc1N1YnNldE9mJywgJ2lzU3VwZXJzZXRPZiddO1xudmFyIHNldF9saWtlX21ldGhvZHMgPSBbJ2RpZmZlcmVuY2UnLCAnaW50ZXJzZWN0aW9uJywgJ3N5bW1ldHJpY0RpZmZlcmVuY2UnLCAndW5pb24nXTtcblxudmFyIGluaXRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIEEgcmVhY3RpdmUgdmVyc2lvbiBvZiB0aGUgYnVpbHQtaW4gW2BTZXRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXQpIG9iamVjdC5cbiAqIFJlYWRpbmcgY29udGVudHMgb2YgdGhlIHNldCAoYnkgaXRlcmF0aW5nLCBvciBieSByZWFkaW5nIGBzZXQuc2l6ZWAgb3IgY2FsbGluZyBgc2V0LmhhcyguLi4pYCBhcyBpbiB0aGUgW2V4YW1wbGVdKGh0dHBzOi8vc3ZlbHRlLmRldi9wbGF5Z3JvdW5kLzUzNDM4YjUxMTk0YjQ4ODJiY2MxOGNkZGY5Zjk2ZjE1KSBiZWxvdykgaW4gYW4gW2VmZmVjdF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QpIG9yIFtkZXJpdmVkXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGRlcml2ZWQpXG4gKiB3aWxsIGNhdXNlIGl0IHRvIGJlIHJlLWV2YWx1YXRlZCBhcyBuZWNlc3Nhcnkgd2hlbiB0aGUgc2V0IGlzIHVwZGF0ZWQuXG4gKlxuICogTm90ZSB0aGF0IHZhbHVlcyBpbiBhIHJlYWN0aXZlIHNldCBhcmUgX25vdF8gbWFkZSBbZGVlcGx5IHJlYWN0aXZlXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJHN0YXRlI0RlZXAtc3RhdGUpLlxuICpcbiAqIGBgYHN2ZWx0ZVxuICogPHNjcmlwdD5cbiAqIFx0aW1wb3J0IHsgU3ZlbHRlU2V0IH0gZnJvbSAnc3ZlbHRlL3JlYWN0aXZpdHknO1xuICogXHRsZXQgbW9ua2V5cyA9IG5ldyBTdmVsdGVTZXQoKTtcbiAqXG4gKiBcdGZ1bmN0aW9uIHRvZ2dsZShtb25rZXkpIHtcbiAqIFx0XHRpZiAobW9ua2V5cy5oYXMobW9ua2V5KSkge1xuICogXHRcdFx0bW9ua2V5cy5kZWxldGUobW9ua2V5KTtcbiAqIFx0XHR9IGVsc2Uge1xuICogXHRcdFx0bW9ua2V5cy5hZGQobW9ua2V5KTtcbiAqIFx0XHR9XG4gKiBcdH1cbiAqIDwvc2NyaXB0PlxuICpcbiAqIHsjZWFjaCBbJ/CfmYgnLCAn8J+ZiScsICfwn5mKJ10gYXMgbW9ua2V5fVxuICogXHQ8YnV0dG9uIG9uY2xpY2s9eygpID0+IHRvZ2dsZShtb25rZXkpfT57bW9ua2V5fTwvYnV0dG9uPlxuICogey9lYWNofVxuICpcbiAqIDxidXR0b24gb25jbGljaz17KCkgPT4gbW9ua2V5cy5jbGVhcigpfT5jbGVhcjwvYnV0dG9uPlxuICpcbiAqIHsjaWYgbW9ua2V5cy5oYXMoJ/CfmYgnKX08cD5zZWUgbm8gZXZpbDwvcD57L2lmfVxuICogeyNpZiBtb25rZXlzLmhhcygn8J+ZiScpfTxwPmhlYXIgbm8gZXZpbDwvcD57L2lmfVxuICogeyNpZiBtb25rZXlzLmhhcygn8J+ZiicpfTxwPnNwZWFrIG5vIGV2aWw8L3A+ey9pZn1cbiAqIGBgYFxuICpcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAZXh0ZW5kcyB7U2V0PFQ+fVxuICovXG5leHBvcnQgY2xhc3MgU3ZlbHRlU2V0IGV4dGVuZHMgU2V0IHtcblx0LyoqIEB0eXBlIHtNYXA8VCwgU291cmNlPGJvb2xlYW4+Pn0gKi9cblx0I3NvdXJjZXMgPSBuZXcgTWFwKCk7XG5cdCN2ZXJzaW9uID0gc3RhdGUoMCk7XG5cdCNzaXplID0gc3RhdGUoMCk7XG5cdCN1cGRhdGVfdmVyc2lvbiA9IHVwZGF0ZV92ZXJzaW9uIHx8IC0xO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0l0ZXJhYmxlPFQ+IHwgbnVsbCB8IHVuZGVmaW5lZH0gW3ZhbHVlXVxuXHQgKi9cblx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0Ly8gSWYgdGhlIHZhbHVlIGlzIGludmFsaWQgdGhlbiB0aGUgbmF0aXZlIGV4Y2VwdGlvbiB3aWxsIGZpcmUgaGVyZVxuXHRcdFx0dmFsdWUgPSBuZXcgU2V0KHZhbHVlKTtcblxuXHRcdFx0dGFnKHRoaXMuI3ZlcnNpb24sICdTdmVsdGVTZXQgdmVyc2lvbicpO1xuXHRcdFx0dGFnKHRoaXMuI3NpemUsICdTdmVsdGVTZXQuc2l6ZScpO1xuXHRcdH1cblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0Zm9yICh2YXIgZWxlbWVudCBvZiB2YWx1ZSkge1xuXHRcdFx0XHRzdXBlci5hZGQoZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLiNzaXplLnYgPSBzdXBlci5zaXplO1xuXHRcdH1cblxuXHRcdGlmICghaW5pdGVkKSB0aGlzLiNpbml0KCk7XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIHNvdXJjZSBpcyBiZWluZyBjcmVhdGVkIGluc2lkZSB0aGUgc2FtZSByZWFjdGlvbiBhcyB0aGUgU3ZlbHRlU2V0IGluc3RhbmNlLFxuXHQgKiB3ZSB1c2UgYHN0YXRlYCBzbyB0aGF0IGl0IHdpbGwgbm90IGJlIGEgZGVwZW5kZW5jeSBvZiB0aGUgcmVhY3Rpb24uIE90aGVyd2lzZSB3ZVxuXHQgKiB1c2UgYHNvdXJjZWAgc28gaXQgd2lsbCBiZS5cblx0ICpcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHBhcmFtIHtUfSB2YWx1ZVxuXHQgKiBAcmV0dXJucyB7U291cmNlPFQ+fVxuXHQgKi9cblx0I3NvdXJjZSh2YWx1ZSkge1xuXHRcdHJldHVybiB1cGRhdGVfdmVyc2lvbiA9PT0gdGhpcy4jdXBkYXRlX3ZlcnNpb24gPyBzdGF0ZSh2YWx1ZSkgOiBzb3VyY2UodmFsdWUpO1xuXHR9XG5cblx0Ly8gV2UgaW5pdCBhcyBwYXJ0IG9mIHRoZSBmaXJzdCBpbnN0YW5jZSBzbyB0aGF0IHdlIGNhbiB0cmVlc2hha2UgdGhpcyBjbGFzc1xuXHQjaW5pdCgpIHtcblx0XHRpbml0ZWQgPSB0cnVlO1xuXG5cdFx0dmFyIHByb3RvID0gU3ZlbHRlU2V0LnByb3RvdHlwZTtcblx0XHR2YXIgc2V0X3Byb3RvID0gU2V0LnByb3RvdHlwZTtcblxuXHRcdGZvciAoY29uc3QgbWV0aG9kIG9mIHJlYWRfbWV0aG9kcykge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0cHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uICguLi52KSB7XG5cdFx0XHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRyZXR1cm4gc2V0X3Byb3RvW21ldGhvZF0uYXBwbHkodGhpcywgdik7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgbWV0aG9kIG9mIHNldF9saWtlX21ldGhvZHMpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHByb3RvW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4udikge1xuXHRcdFx0XHRnZXQodGhpcy4jdmVyc2lvbik7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0dmFyIHNldCA9IC8qKiBAdHlwZSB7U2V0PFQ+fSAqLyAoc2V0X3Byb3RvW21ldGhvZF0uYXBwbHkodGhpcywgdikpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IFN2ZWx0ZVNldChzZXQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvKiogQHBhcmFtIHtUfSB2YWx1ZSAqL1xuXHRoYXModmFsdWUpIHtcblx0XHR2YXIgaGFzID0gc3VwZXIuaGFzKHZhbHVlKTtcblx0XHR2YXIgc291cmNlcyA9IHRoaXMuI3NvdXJjZXM7XG5cdFx0dmFyIHMgPSBzb3VyY2VzLmdldCh2YWx1ZSk7XG5cblx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAoIWhhcykge1xuXHRcdFx0XHQvLyBJZiB0aGUgdmFsdWUgZG9lc24ndCBleGlzdCwgdHJhY2sgdGhlIHZlcnNpb24gaW4gY2FzZSBpdCdzIGFkZGVkIGxhdGVyXG5cdFx0XHRcdC8vIGJ1dCBkb24ndCBjcmVhdGUgc291cmNlcyB3aWxseS1uaWxseSB0byB0cmFjayBhbGwgcG9zc2libGUgdmFsdWVzXG5cdFx0XHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRzID0gdGhpcy4jc291cmNlKHRydWUpO1xuXG5cdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdHRhZyhzLCBgU3ZlbHRlU2V0IGhhcygke2xhYmVsKHZhbHVlKX0pYCk7XG5cdFx0XHR9XG5cblx0XHRcdHNvdXJjZXMuc2V0KHZhbHVlLCBzKTtcblx0XHR9XG5cblx0XHRnZXQocyk7XG5cdFx0cmV0dXJuIGhhcztcblx0fVxuXG5cdC8qKiBAcGFyYW0ge1R9IHZhbHVlICovXG5cdGFkZCh2YWx1ZSkge1xuXHRcdGlmICghc3VwZXIuaGFzKHZhbHVlKSkge1xuXHRcdFx0c3VwZXIuYWRkKHZhbHVlKTtcblx0XHRcdHNldCh0aGlzLiNzaXplLCBzdXBlci5zaXplKTtcblx0XHRcdGluY3JlbWVudCh0aGlzLiN2ZXJzaW9uKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKiBAcGFyYW0ge1R9IHZhbHVlICovXG5cdGRlbGV0ZSh2YWx1ZSkge1xuXHRcdHZhciBkZWxldGVkID0gc3VwZXIuZGVsZXRlKHZhbHVlKTtcblx0XHR2YXIgc291cmNlcyA9IHRoaXMuI3NvdXJjZXM7XG5cdFx0dmFyIHMgPSBzb3VyY2VzLmdldCh2YWx1ZSk7XG5cblx0XHRpZiAocyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzb3VyY2VzLmRlbGV0ZSh2YWx1ZSk7XG5cdFx0XHRzZXQocywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdGlmIChkZWxldGVkKSB7XG5cdFx0XHRzZXQodGhpcy4jc2l6ZSwgc3VwZXIuc2l6ZSk7XG5cdFx0XHRpbmNyZW1lbnQodGhpcy4jdmVyc2lvbik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlbGV0ZWQ7XG5cdH1cblxuXHRjbGVhcigpIHtcblx0XHRpZiAoc3VwZXIuc2l6ZSA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBDbGVhciBmaXJzdCwgc28gd2UgZ2V0IG5pY2UgY29uc29sZS5sb2cgb3V0cHV0cyB3aXRoICRpbnNwZWN0XG5cdFx0c3VwZXIuY2xlYXIoKTtcblx0XHR2YXIgc291cmNlcyA9IHRoaXMuI3NvdXJjZXM7XG5cblx0XHRmb3IgKHZhciBzIG9mIHNvdXJjZXMudmFsdWVzKCkpIHtcblx0XHRcdHNldChzLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0c291cmNlcy5jbGVhcigpO1xuXHRcdHNldCh0aGlzLiNzaXplLCAwKTtcblx0XHRpbmNyZW1lbnQodGhpcy4jdmVyc2lvbik7XG5cdH1cblxuXHRrZXlzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlcygpO1xuXHR9XG5cblx0dmFsdWVzKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIudmFsdWVzKCk7XG5cdH1cblxuXHRlbnRyaWVzKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIuZW50cmllcygpO1xuXHR9XG5cblx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0cmV0dXJuIHRoaXMua2V5cygpO1xuXHR9XG5cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIGdldCh0aGlzLiNzaXplKTtcblx0fVxufVxuIiwiLyoqIEBpbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcjY2xpZW50JyAqL1xuaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBzZXQsIHNvdXJjZSwgc3RhdGUsIGluY3JlbWVudCB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9yZWFjdGl2aXR5L3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgbGFiZWwsIHRhZyB9IGZyb20gJy4uL2ludGVybmFsL2NsaWVudC9kZXYvdHJhY2luZy5qcyc7XG5pbXBvcnQgeyBnZXQsIHVwZGF0ZV92ZXJzaW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3J1bnRpbWUuanMnO1xuXG4vKipcbiAqIEEgcmVhY3RpdmUgdmVyc2lvbiBvZiB0aGUgYnVpbHQtaW4gW2BNYXBgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXApIG9iamVjdC5cbiAqIFJlYWRpbmcgY29udGVudHMgb2YgdGhlIG1hcCAoYnkgaXRlcmF0aW5nLCBvciBieSByZWFkaW5nIGBtYXAuc2l6ZWAgb3IgY2FsbGluZyBgbWFwLmdldCguLi4pYCBvciBgbWFwLmhhcyguLi4pYCBhcyBpbiB0aGUgW3RpYy10YWMtdG9lIGV4YW1wbGVdKGh0dHBzOi8vc3ZlbHRlLmRldi9wbGF5Z3JvdW5kLzBiMGZmNGFhNDljOTQ0M2Y5YjQ3ZmU1MjAzYzc4MjkzKSBiZWxvdykgaW4gYW4gW2VmZmVjdF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QpIG9yIFtkZXJpdmVkXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGRlcml2ZWQpXG4gKiB3aWxsIGNhdXNlIGl0IHRvIGJlIHJlLWV2YWx1YXRlZCBhcyBuZWNlc3Nhcnkgd2hlbiB0aGUgbWFwIGlzIHVwZGF0ZWQuXG4gKlxuICogTm90ZSB0aGF0IHZhbHVlcyBpbiBhIHJlYWN0aXZlIG1hcCBhcmUgX25vdF8gbWFkZSBbZGVlcGx5IHJlYWN0aXZlXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJHN0YXRlI0RlZXAtc3RhdGUpLlxuICpcbiAqIGBgYHN2ZWx0ZVxuICogPHNjcmlwdD5cbiAqIFx0aW1wb3J0IHsgU3ZlbHRlTWFwIH0gZnJvbSAnc3ZlbHRlL3JlYWN0aXZpdHknO1xuICogXHRpbXBvcnQgeyByZXN1bHQgfSBmcm9tICcuL2dhbWUuanMnO1xuICpcbiAqIFx0bGV0IGJvYXJkID0gbmV3IFN2ZWx0ZU1hcCgpO1xuICogXHRsZXQgcGxheWVyID0gJHN0YXRlKCd4Jyk7XG4gKiBcdGxldCB3aW5uZXIgPSAkZGVyaXZlZChyZXN1bHQoYm9hcmQpKTtcbiAqXG4gKiBcdGZ1bmN0aW9uIHJlc2V0KCkge1xuICogXHRcdHBsYXllciA9ICd4JztcbiAqIFx0XHRib2FyZC5jbGVhcigpO1xuICogXHR9XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8ZGl2IGNsYXNzPVwiYm9hcmRcIj5cbiAqIFx0eyNlYWNoIEFycmF5KDkpLCBpfVxuICogXHRcdDxidXR0b25cbiAqIFx0XHRcdGRpc2FibGVkPXtib2FyZC5oYXMoaSkgfHwgd2lubmVyfVxuICogXHRcdFx0b25jbGljaz17KCkgPT4ge1xuICogXHRcdFx0XHRib2FyZC5zZXQoaSwgcGxheWVyKTtcbiAqIFx0XHRcdFx0cGxheWVyID0gcGxheWVyID09PSAneCcgPyAnbycgOiAneCc7XG4gKiBcdFx0XHR9fVxuICogXHRcdD57Ym9hcmQuZ2V0KGkpfTwvYnV0dG9uPlxuICogXHR7L2VhY2h9XG4gKiA8L2Rpdj5cbiAqXG4gKiB7I2lmIHdpbm5lcn1cbiAqIFx0PHA+e3dpbm5lcn0gd2lucyE8L3A+XG4gKiBcdDxidXR0b24gb25jbGljaz17cmVzZXR9PnJlc2V0PC9idXR0b24+XG4gKiB7OmVsc2V9XG4gKiBcdDxwPntwbGF5ZXJ9IGlzIG5leHQ8L3A+XG4gKiB7L2lmfVxuICogYGBgXG4gKlxuICogQHRlbXBsYXRlIEtcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAZXh0ZW5kcyB7TWFwPEssIFY+fVxuICovXG5leHBvcnQgY2xhc3MgU3ZlbHRlTWFwIGV4dGVuZHMgTWFwIHtcblx0LyoqIEB0eXBlIHtNYXA8SywgU291cmNlPG51bWJlcj4+fSAqL1xuXHQjc291cmNlcyA9IG5ldyBNYXAoKTtcblx0I3ZlcnNpb24gPSBzdGF0ZSgwKTtcblx0I3NpemUgPSBzdGF0ZSgwKTtcblx0I3VwZGF0ZV92ZXJzaW9uID0gdXBkYXRlX3ZlcnNpb24gfHwgLTE7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7SXRlcmFibGU8cmVhZG9ubHkgW0ssIFZdPiB8IG51bGwgfCB1bmRlZmluZWR9IFt2YWx1ZV1cblx0ICovXG5cdGNvbnN0cnVjdG9yKHZhbHVlKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdGlmIChERVYpIHtcblx0XHRcdC8vIElmIHRoZSB2YWx1ZSBpcyBpbnZhbGlkIHRoZW4gdGhlIG5hdGl2ZSBleGNlcHRpb24gd2lsbCBmaXJlIGhlcmVcblx0XHRcdHZhbHVlID0gbmV3IE1hcCh2YWx1ZSk7XG5cblx0XHRcdHRhZyh0aGlzLiN2ZXJzaW9uLCAnU3ZlbHRlTWFwIHZlcnNpb24nKTtcblx0XHRcdHRhZyh0aGlzLiNzaXplLCAnU3ZlbHRlTWFwLnNpemUnKTtcblx0XHR9XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGZvciAodmFyIFtrZXksIHZdIG9mIHZhbHVlKSB7XG5cdFx0XHRcdHN1cGVyLnNldChrZXksIHYpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy4jc2l6ZS52ID0gc3VwZXIuc2l6ZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSWYgdGhlIHNvdXJjZSBpcyBiZWluZyBjcmVhdGVkIGluc2lkZSB0aGUgc2FtZSByZWFjdGlvbiBhcyB0aGUgU3ZlbHRlTWFwIGluc3RhbmNlLFxuXHQgKiB3ZSB1c2UgYHN0YXRlYCBzbyB0aGF0IGl0IHdpbGwgbm90IGJlIGEgZGVwZW5kZW5jeSBvZiB0aGUgcmVhY3Rpb24uIE90aGVyd2lzZSB3ZVxuXHQgKiB1c2UgYHNvdXJjZWAgc28gaXQgd2lsbCBiZS5cblx0ICpcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHBhcmFtIHtUfSB2YWx1ZVxuXHQgKiBAcmV0dXJucyB7U291cmNlPFQ+fVxuXHQgKi9cblx0I3NvdXJjZSh2YWx1ZSkge1xuXHRcdHJldHVybiB1cGRhdGVfdmVyc2lvbiA9PT0gdGhpcy4jdXBkYXRlX3ZlcnNpb24gPyBzdGF0ZSh2YWx1ZSkgOiBzb3VyY2UodmFsdWUpO1xuXHR9XG5cblx0LyoqIEBwYXJhbSB7S30ga2V5ICovXG5cdGhhcyhrZXkpIHtcblx0XHR2YXIgc291cmNlcyA9IHRoaXMuI3NvdXJjZXM7XG5cdFx0dmFyIHMgPSBzb3VyY2VzLmdldChrZXkpO1xuXG5cdFx0aWYgKHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aWYgKHN1cGVyLmhhcyhrZXkpKSB7XG5cdFx0XHRcdHMgPSB0aGlzLiNzb3VyY2UoMCk7XG5cblx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdHRhZyhzLCBgU3ZlbHRlTWFwIGdldCgke2xhYmVsKGtleSl9KWApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c291cmNlcy5zZXQoa2V5LCBzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgdHJhY2sgdGhlIHZlcnNpb24gaW4gY2FzZVxuXHRcdFx0XHQvLyB0aGUgU2V0IGV2ZXIgZ2V0cyB0aGlzIHZhbHVlIGluIHRoZSBmdXR1cmUuXG5cdFx0XHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldChzKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0geyh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE1hcDxLLCBWPikgPT4gdm9pZH0gY2FsbGJhY2tmblxuXHQgKiBAcGFyYW0ge2FueX0gW3RoaXNfYXJnXVxuXHQgKi9cblx0Zm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzX2FyZykge1xuXHRcdHRoaXMuI3JlYWRfYWxsKCk7XG5cdFx0c3VwZXIuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzX2FyZyk7XG5cdH1cblxuXHQvKiogQHBhcmFtIHtLfSBrZXkgKi9cblx0Z2V0KGtleSkge1xuXHRcdHZhciBzb3VyY2VzID0gdGhpcy4jc291cmNlcztcblx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KGtleSk7XG5cblx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAoc3VwZXIuaGFzKGtleSkpIHtcblx0XHRcdFx0cyA9IHRoaXMuI3NvdXJjZSgwKTtcblxuXHRcdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdFx0dGFnKHMsIGBTdmVsdGVNYXAgZ2V0KCR7bGFiZWwoa2V5KX0pYCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzb3VyY2VzLnNldChrZXksIHMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gV2Ugc2hvdWxkIGFsd2F5cyB0cmFjayB0aGUgdmVyc2lvbiBpbiBjYXNlXG5cdFx0XHRcdC8vIHRoZSBTZXQgZXZlciBnZXRzIHRoaXMgdmFsdWUgaW4gdGhlIGZ1dHVyZS5cblx0XHRcdFx0Z2V0KHRoaXMuI3ZlcnNpb24pO1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldChzKTtcblx0XHRyZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtLfSBrZXlcblx0ICogQHBhcmFtIHtWfSB2YWx1ZVxuXHQgKiAqL1xuXHRzZXQoa2V5LCB2YWx1ZSkge1xuXHRcdHZhciBzb3VyY2VzID0gdGhpcy4jc291cmNlcztcblx0XHR2YXIgcyA9IHNvdXJjZXMuZ2V0KGtleSk7XG5cdFx0dmFyIHByZXZfcmVzID0gc3VwZXIuZ2V0KGtleSk7XG5cdFx0dmFyIHJlcyA9IHN1cGVyLnNldChrZXksIHZhbHVlKTtcblx0XHR2YXIgdmVyc2lvbiA9IHRoaXMuI3ZlcnNpb247XG5cblx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzID0gdGhpcy4jc291cmNlKDApO1xuXG5cdFx0XHRpZiAoREVWKSB7XG5cdFx0XHRcdHRhZyhzLCBgU3ZlbHRlTWFwIGdldCgke2xhYmVsKGtleSl9KWApO1xuXHRcdFx0fVxuXG5cdFx0XHRzb3VyY2VzLnNldChrZXksIHMpO1xuXHRcdFx0c2V0KHRoaXMuI3NpemUsIHN1cGVyLnNpemUpO1xuXHRcdFx0aW5jcmVtZW50KHZlcnNpb24pO1xuXHRcdH0gZWxzZSBpZiAocHJldl9yZXMgIT09IHZhbHVlKSB7XG5cdFx0XHRpbmNyZW1lbnQocyk7XG5cblx0XHRcdC8vIGlmIG5vdCBldmVyeSByZWFjdGlvbiBvZiBzIGlzIGEgcmVhY3Rpb24gb2YgdmVyc2lvbiB3ZSBuZWVkIHRvIGFsc28gaW5jbHVkZSB2ZXJzaW9uXG5cdFx0XHR2YXIgdl9yZWFjdGlvbnMgPSB2ZXJzaW9uLnJlYWN0aW9ucyA9PT0gbnVsbCA/IG51bGwgOiBuZXcgU2V0KHZlcnNpb24ucmVhY3Rpb25zKTtcblx0XHRcdHZhciBuZWVkc192ZXJzaW9uX2luY3JlYXNlID1cblx0XHRcdFx0dl9yZWFjdGlvbnMgPT09IG51bGwgfHxcblx0XHRcdFx0IXMucmVhY3Rpb25zPy5ldmVyeSgocikgPT5cblx0XHRcdFx0XHQvKiogQHR5cGUge05vbk51bGxhYmxlPHR5cGVvZiB2X3JlYWN0aW9ucz59ICovICh2X3JlYWN0aW9ucykuaGFzKHIpXG5cdFx0XHRcdCk7XG5cdFx0XHRpZiAobmVlZHNfdmVyc2lvbl9pbmNyZWFzZSkge1xuXHRcdFx0XHRpbmNyZW1lbnQodmVyc2lvbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdC8qKiBAcGFyYW0ge0t9IGtleSAqL1xuXHRkZWxldGUoa2V5KSB7XG5cdFx0dmFyIHNvdXJjZXMgPSB0aGlzLiNzb3VyY2VzO1xuXHRcdHZhciBzID0gc291cmNlcy5nZXQoa2V5KTtcblx0XHR2YXIgcmVzID0gc3VwZXIuZGVsZXRlKGtleSk7XG5cblx0XHRpZiAocyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzb3VyY2VzLmRlbGV0ZShrZXkpO1xuXHRcdFx0c2V0KHMsIC0xKTtcblx0XHR9XG5cblx0XHRpZiAocmVzKSB7XG5cdFx0XHRzZXQodGhpcy4jc2l6ZSwgc3VwZXIuc2l6ZSk7XG5cdFx0XHRpbmNyZW1lbnQodGhpcy4jdmVyc2lvbik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdGNsZWFyKCkge1xuXHRcdGlmIChzdXBlci5zaXplID09PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIENsZWFyIGZpcnN0LCBzbyB3ZSBnZXQgbmljZSBjb25zb2xlLmxvZyBvdXRwdXRzIHdpdGggJGluc3BlY3Rcblx0XHRzdXBlci5jbGVhcigpO1xuXHRcdHZhciBzb3VyY2VzID0gdGhpcy4jc291cmNlcztcblx0XHRzZXQodGhpcy4jc2l6ZSwgMCk7XG5cdFx0Zm9yICh2YXIgcyBvZiBzb3VyY2VzLnZhbHVlcygpKSB7XG5cdFx0XHRzZXQocywgLTEpO1xuXHRcdH1cblx0XHRpbmNyZW1lbnQodGhpcy4jdmVyc2lvbik7XG5cdFx0c291cmNlcy5jbGVhcigpO1xuXHR9XG5cblx0I3JlYWRfYWxsKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblxuXHRcdHZhciBzb3VyY2VzID0gdGhpcy4jc291cmNlcztcblx0XHRpZiAodGhpcy4jc2l6ZS52ICE9PSBzb3VyY2VzLnNpemUpIHtcblx0XHRcdGZvciAodmFyIGtleSBvZiBzdXBlci5rZXlzKCkpIHtcblx0XHRcdFx0aWYgKCFzb3VyY2VzLmhhcyhrZXkpKSB7XG5cdFx0XHRcdFx0dmFyIHMgPSB0aGlzLiNzb3VyY2UoMCk7XG5cdFx0XHRcdFx0aWYgKERFVikge1xuXHRcdFx0XHRcdFx0dGFnKHMsIGBTdmVsdGVNYXAgZ2V0KCR7bGFiZWwoa2V5KX0pYCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c291cmNlcy5zZXQoa2V5LCBzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoWywgc10gb2YgdGhpcy4jc291cmNlcykge1xuXHRcdFx0Z2V0KHMpO1xuXHRcdH1cblx0fVxuXG5cdGtleXMoKSB7XG5cdFx0Z2V0KHRoaXMuI3ZlcnNpb24pO1xuXHRcdHJldHVybiBzdXBlci5rZXlzKCk7XG5cdH1cblxuXHR2YWx1ZXMoKSB7XG5cdFx0dGhpcy4jcmVhZF9hbGwoKTtcblx0XHRyZXR1cm4gc3VwZXIudmFsdWVzKCk7XG5cdH1cblxuXHRlbnRyaWVzKCkge1xuXHRcdHRoaXMuI3JlYWRfYWxsKCk7XG5cdFx0cmV0dXJuIHN1cGVyLmVudHJpZXMoKTtcblx0fVxuXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdHJldHVybiB0aGlzLmVudHJpZXMoKTtcblx0fVxuXG5cdGdldCBzaXplKCkge1xuXHRcdGdldCh0aGlzLiNzaXplKTtcblx0XHRyZXR1cm4gc3VwZXIuc2l6ZTtcblx0fVxufVxuIiwiaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBzdGF0ZSwgaW5jcmVtZW50IH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc291cmNlcy5qcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvZGV2L3RyYWNpbmcuanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgZ2V0X2N1cnJlbnRfdXJsIH0gZnJvbSAnLi91cmwuanMnO1xuXG5leHBvcnQgY29uc3QgUkVQTEFDRSA9IFN5bWJvbCgncmVwbGFjZScpO1xuXG4vKipcbiAqIEEgcmVhY3RpdmUgdmVyc2lvbiBvZiB0aGUgYnVpbHQtaW4gW2BVUkxTZWFyY2hQYXJhbXNgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvVVJMU2VhcmNoUGFyYW1zKSBvYmplY3QuXG4gKiBSZWFkaW5nIGl0cyBjb250ZW50cyAoYnkgaXRlcmF0aW5nLCBvciBieSBjYWxsaW5nIGBwYXJhbXMuZ2V0KC4uLilgIG9yIGBwYXJhbXMuZ2V0QWxsKC4uLilgIGFzIGluIHRoZSBbZXhhbXBsZV0oaHR0cHM6Ly9zdmVsdGUuZGV2L3BsYXlncm91bmQvYjM5MjZjODZjNTM4NGJhYjlmMmNmOTkzYmMwOGMxYzgpIGJlbG93KSBpbiBhbiBbZWZmZWN0XShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGVmZmVjdCkgb3IgW2Rlcml2ZWRdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS8kZGVyaXZlZClcbiAqIHdpbGwgY2F1c2UgaXQgdG8gYmUgcmUtZXZhbHVhdGVkIGFzIG5lY2Vzc2FyeSB3aGVuIHRoZSBwYXJhbXMgYXJlIHVwZGF0ZWQuXG4gKlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0PlxuICogXHRpbXBvcnQgeyBTdmVsdGVVUkxTZWFyY2hQYXJhbXMgfSBmcm9tICdzdmVsdGUvcmVhY3Rpdml0eSc7XG4gKlxuICogXHRjb25zdCBwYXJhbXMgPSBuZXcgU3ZlbHRlVVJMU2VhcmNoUGFyYW1zKCdtZXNzYWdlPWhlbGxvJyk7XG4gKlxuICogXHRsZXQga2V5ID0gJHN0YXRlKCdrZXknKTtcbiAqIFx0bGV0IHZhbHVlID0gJHN0YXRlKCd2YWx1ZScpO1xuICogPC9zY3JpcHQ+XG4gKlxuICogPGlucHV0IGJpbmQ6dmFsdWU9e2tleX0gLz5cbiAqIDxpbnB1dCBiaW5kOnZhbHVlPXt2YWx1ZX0gLz5cbiAqIDxidXR0b24gb25jbGljaz17KCkgPT4gcGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKX0+YXBwZW5kPC9idXR0b24+XG4gKlxuICogPHA+P3twYXJhbXMudG9TdHJpbmcoKX08L3A+XG4gKlxuICogeyNlYWNoIHBhcmFtcyBhcyBba2V5LCB2YWx1ZV19XG4gKiBcdDxwPntrZXl9OiB7dmFsdWV9PC9wPlxuICogey9lYWNofVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBTdmVsdGVVUkxTZWFyY2hQYXJhbXMgZXh0ZW5kcyBVUkxTZWFyY2hQYXJhbXMge1xuXHQjdmVyc2lvbiA9IERFViA/IHRhZyhzdGF0ZSgwKSwgJ1N2ZWx0ZVVSTFNlYXJjaFBhcmFtcyB2ZXJzaW9uJykgOiBzdGF0ZSgwKTtcblx0I3VybCA9IGdldF9jdXJyZW50X3VybCgpO1xuXG5cdCN1cGRhdGluZyA9IGZhbHNlO1xuXG5cdCN1cGRhdGVfdXJsKCkge1xuXHRcdGlmICghdGhpcy4jdXJsIHx8IHRoaXMuI3VwZGF0aW5nKSByZXR1cm47XG5cdFx0dGhpcy4jdXBkYXRpbmcgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc2VhcmNoID0gdGhpcy50b1N0cmluZygpO1xuXHRcdHRoaXMuI3VybC5zZWFyY2ggPSBzZWFyY2ggJiYgYD8ke3NlYXJjaH1gO1xuXG5cdFx0dGhpcy4jdXBkYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1VSTFNlYXJjaFBhcmFtc30gcGFyYW1zXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0W1JFUExBQ0VdKHBhcmFtcykge1xuXHRcdGlmICh0aGlzLiN1cGRhdGluZykgcmV0dXJuO1xuXG5cdFx0Ly8gdGhlIFVSTCBtYXkgaGF2ZSBjaGFuZ2VkIGluIGEgd2F5IHRoYXQgbGVhdmVzIHRoZSBzZWFyY2ggc3RyaW5nIHVudG91Y2hlZCDigJRcblx0XHQvLyBkb24ndCByZWJ1aWxkIHRoZSBwYXJhbXMgb3Igbm90aWZ5IHJlYWRlcnMgaWYgbm90aGluZyBjaGFuZ2VkXG5cdFx0aWYgKHBhcmFtcy50b1N0cmluZygpID09PSBzdXBlci50b1N0cmluZygpKSByZXR1cm47XG5cblx0XHR0aGlzLiN1cGRhdGluZyA9IHRydWU7XG5cblx0XHRmb3IgKGNvbnN0IGtleSBvZiBbLi4uc3VwZXIua2V5cygpXSkge1xuXHRcdFx0c3VwZXIuZGVsZXRlKGtleSk7XG5cdFx0fVxuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgcGFyYW1zKSB7XG5cdFx0XHRzdXBlci5hcHBlbmQoa2V5LCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0aW5jcmVtZW50KHRoaXMuI3ZlcnNpb24pO1xuXHRcdHRoaXMuI3VwZGF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0YXBwZW5kKG5hbWUsIHZhbHVlKSB7XG5cdFx0c3VwZXIuYXBwZW5kKG5hbWUsIHZhbHVlKTtcblx0XHR0aGlzLiN1cGRhdGVfdXJsKCk7XG5cdFx0aW5jcmVtZW50KHRoaXMuI3ZlcnNpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nPX0gdmFsdWVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRkZWxldGUobmFtZSwgdmFsdWUpIHtcblx0XHR2YXIgaGFzX3ZhbHVlID0gc3VwZXIuaGFzKG5hbWUsIHZhbHVlKTtcblx0XHRzdXBlci5kZWxldGUobmFtZSwgdmFsdWUpO1xuXHRcdGlmIChoYXNfdmFsdWUpIHtcblx0XHRcdHRoaXMuI3VwZGF0ZV91cmwoKTtcblx0XHRcdGluY3JlbWVudCh0aGlzLiN2ZXJzaW9uKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcblx0ICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuXHQgKi9cblx0Z2V0KG5hbWUpIHtcblx0XHRnZXQodGhpcy4jdmVyc2lvbik7XG5cdFx0cmV0dXJuIHN1cGVyLmdldChuYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuXHQgKiBAcmV0dXJucyB7c3RyaW5nW119XG5cdCAqL1xuXHRnZXRBbGwobmFtZSkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIuZ2V0QWxsKG5hbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nPX0gdmFsdWVcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRoYXMobmFtZSwgdmFsdWUpIHtcblx0XHRnZXQodGhpcy4jdmVyc2lvbik7XG5cdFx0cmV0dXJuIHN1cGVyLmhhcyhuYW1lLCB2YWx1ZSk7XG5cdH1cblxuXHRrZXlzKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIua2V5cygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7KHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nLCBwYXJlbnQ6IFVSTFNlYXJjaFBhcmFtcykgPT4gdm9pZH0gY2FsbGJhY2tcblx0ICogQHBhcmFtIHthbnl9IFt0aGlzX2FyZ11cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmb3JFYWNoKGNhbGxiYWNrLCB0aGlzX2FyZykge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRzdXBlci5mb3JFYWNoKGNhbGxiYWNrLCB0aGlzX2FyZyk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0c2V0KG5hbWUsIHZhbHVlKSB7XG5cdFx0dmFyIHByZXZpb3VzID0gc3VwZXIuZ2V0QWxsKG5hbWUpO1xuXHRcdHN1cGVyLnNldChuYW1lLCB2YWx1ZSk7XG5cdFx0Ly8gY2FuJ3QgdXNlIGhhcyhuYW1lLCB2YWx1ZSksIGJlY2F1c2UgZm9yIHNvbWV0aGluZyBsaWtlIGh0dHBzOi8vc3ZlbHRlLmRldj9mb289MSZiYXI9MiZmb289M1xuXHRcdC8vIGlmIHlvdSBzZXQgYGZvb2AgdG8gMSwgdGhlbiBmb289MyBnZXRzIGRlbGV0ZWQgd2hpbHN0IGBoYXMoXCJmb29cIiwgXCIxXCIpYCByZXR1cm5zIHRydWVcblx0XHR2YXIgY3VycmVudCA9IHN1cGVyLmdldEFsbChuYW1lKTtcblx0XHRpZiAocHJldmlvdXMubGVuZ3RoICE9PSBjdXJyZW50Lmxlbmd0aCB8fCBwcmV2aW91cy5zb21lKCh2YWx1ZSwgaSkgPT4gdmFsdWUgIT09IGN1cnJlbnRbaV0pKSB7XG5cdFx0XHR0aGlzLiN1cGRhdGVfdXJsKCk7XG5cdFx0XHRpbmNyZW1lbnQodGhpcy4jdmVyc2lvbik7XG5cdFx0fVxuXHR9XG5cblx0c29ydCgpIHtcblx0XHRzdXBlci5zb3J0KCk7XG5cdFx0dGhpcy4jdXBkYXRlX3VybCgpO1xuXHRcdGluY3JlbWVudCh0aGlzLiN2ZXJzaW9uKTtcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIudG9TdHJpbmcoKTtcblx0fVxuXG5cdHZhbHVlcygpIHtcblx0XHRnZXQodGhpcy4jdmVyc2lvbik7XG5cdFx0cmV0dXJuIHN1cGVyLnZhbHVlcygpO1xuXHR9XG5cblx0ZW50cmllcygpIHtcblx0XHRnZXQodGhpcy4jdmVyc2lvbik7XG5cdFx0cmV0dXJuIHN1cGVyLmVudHJpZXMoKTtcblx0fVxuXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdHJldHVybiB0aGlzLmVudHJpZXMoKTtcblx0fVxuXG5cdGdldCBzaXplKCkge1xuXHRcdGdldCh0aGlzLiN2ZXJzaW9uKTtcblx0XHRyZXR1cm4gc3VwZXIuc2l6ZTtcblx0fVxufVxuIiwiaW1wb3J0IHsgREVWIH0gZnJvbSAnZXNtLWVudic7XG5pbXBvcnQgeyBzZXQsIHN0YXRlIH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvc291cmNlcy5qcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvZGV2L3RyYWNpbmcuanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3J1bnRpbWUuanMnO1xuaW1wb3J0IHsgUkVQTEFDRSwgU3ZlbHRlVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAnLi91cmwtc2VhcmNoLXBhcmFtcy5qcyc7XG5cbi8qKiBAdHlwZSB7U3ZlbHRlVVJMIHwgbnVsbH0gKi9cbmxldCBjdXJyZW50X3VybCA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRfY3VycmVudF91cmwoKSB7XG5cdC8vIGlkZWFsbHkgd2UnZCBqdXN0IGV4cG9ydCBgY3VycmVudF91cmxgIGRpcmVjdGx5LCBidXQgaXQgc2VlbXMgVml0ZXN0IGRvZXNuJ3QgcmVzcGVjdCBsaXZlIGJpbmRpbmdzXG5cdHJldHVybiBjdXJyZW50X3VybDtcbn1cblxuLyoqXG4gKiBBIHJlYWN0aXZlIHZlcnNpb24gb2YgdGhlIGJ1aWx0LWluIFtgVVJMYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTCkgb2JqZWN0LlxuICogUmVhZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBVUkwgKHN1Y2ggYXMgYHVybC5ocmVmYCBvciBgdXJsLnBhdGhuYW1lYCkgaW4gYW4gW2VmZmVjdF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLyRlZmZlY3QpIG9yIFtkZXJpdmVkXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUvJGRlcml2ZWQpXG4gKiB3aWxsIGNhdXNlIGl0IHRvIGJlIHJlLWV2YWx1YXRlZCBhcyBuZWNlc3Nhcnkgd2hlbiB0aGUgVVJMIGNoYW5nZXMuXG4gKlxuICogVGhlIGBzZWFyY2hQYXJhbXNgIHByb3BlcnR5IGlzIGFuIGluc3RhbmNlIG9mIFtTdmVsdGVVUkxTZWFyY2hQYXJhbXNdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS9zdmVsdGUtcmVhY3Rpdml0eSNTdmVsdGVVUkxTZWFyY2hQYXJhbXMpLlxuICpcbiAqIFtFeGFtcGxlXShodHRwczovL3N2ZWx0ZS5kZXYvcGxheWdyb3VuZC81YTY5NDc1ODkwMWI0NDhjODNkYzQwZGMzMWM3MWYyYSk6XG4gKlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0PlxuICogXHRpbXBvcnQgeyBTdmVsdGVVUkwgfSBmcm9tICdzdmVsdGUvcmVhY3Rpdml0eSc7XG4gKlxuICogXHRjb25zdCB1cmwgPSBuZXcgU3ZlbHRlVVJMKCdodHRwczovL2V4YW1wbGUuY29tL3BhdGgnKTtcbiAqIDwvc2NyaXB0PlxuICpcbiAqIDwhLS0gY2hhbmdlcyB0byB0aGVzZS4uLiAtLT5cbiAqIDxpbnB1dCBiaW5kOnZhbHVlPXt1cmwucHJvdG9jb2x9IC8+XG4gKiA8aW5wdXQgYmluZDp2YWx1ZT17dXJsLmhvc3RuYW1lfSAvPlxuICogPGlucHV0IGJpbmQ6dmFsdWU9e3VybC5wYXRobmFtZX0gLz5cbiAqXG4gKiA8aHIgLz5cbiAqXG4gKiA8IS0tIHdpbGwgdXBkYXRlIGBocmVmYCBhbmQgdmljZSB2ZXJzYSAtLT5cbiAqIDxpbnB1dCBiaW5kOnZhbHVlPXt1cmwuaHJlZn0gc2l6ZT1cIjY1XCIgLz5cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgU3ZlbHRlVVJMIGV4dGVuZHMgVVJMIHtcblx0I3Byb3RvY29sID0gc3RhdGUoc3VwZXIucHJvdG9jb2wpO1xuXHQjdXNlcm5hbWUgPSBzdGF0ZShzdXBlci51c2VybmFtZSk7XG5cdCNwYXNzd29yZCA9IHN0YXRlKHN1cGVyLnBhc3N3b3JkKTtcblx0I2hvc3RuYW1lID0gc3RhdGUoc3VwZXIuaG9zdG5hbWUpO1xuXHQjcG9ydCA9IHN0YXRlKHN1cGVyLnBvcnQpO1xuXHQjcGF0aG5hbWUgPSBzdGF0ZShzdXBlci5wYXRobmFtZSk7XG5cdCNoYXNoID0gc3RhdGUoc3VwZXIuaGFzaCk7XG5cdCNzZWFyY2ggPSBzdGF0ZShzdXBlci5zZWFyY2gpO1xuXHQjc2VhcmNoUGFyYW1zO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFVSTH0gdXJsXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVVJMfSBbYmFzZV1cblx0ICovXG5cdGNvbnN0cnVjdG9yKHVybCwgYmFzZSkge1xuXHRcdHVybCA9IG5ldyBVUkwodXJsLCBiYXNlKTtcblx0XHRzdXBlcih1cmwpO1xuXG5cdFx0aWYgKERFVikge1xuXHRcdFx0dGFnKHRoaXMuI3Byb3RvY29sLCAnU3ZlbHRlVVJMLnByb3RvY29sJyk7XG5cdFx0XHR0YWcodGhpcy4jdXNlcm5hbWUsICdTdmVsdGVVUkwudXNlcm5hbWUnKTtcblx0XHRcdHRhZyh0aGlzLiNwYXNzd29yZCwgJ1N2ZWx0ZVVSTC5wYXNzd29yZCcpO1xuXHRcdFx0dGFnKHRoaXMuI2hvc3RuYW1lLCAnU3ZlbHRlVVJMLmhvc3RuYW1lJyk7XG5cdFx0XHR0YWcodGhpcy4jcG9ydCwgJ1N2ZWx0ZVVSTC5wb3J0Jyk7XG5cdFx0XHR0YWcodGhpcy4jcGF0aG5hbWUsICdTdmVsdGVVUkwucGF0aG5hbWUnKTtcblx0XHRcdHRhZyh0aGlzLiNoYXNoLCAnU3ZlbHRlVVJMLmhhc2gnKTtcblx0XHRcdHRhZyh0aGlzLiNzZWFyY2gsICdTdmVsdGVVUkwuc2VhcmNoJyk7XG5cdFx0fVxuXG5cdFx0Y3VycmVudF91cmwgPSB0aGlzO1xuXHRcdHRoaXMuI3NlYXJjaFBhcmFtcyA9IG5ldyBTdmVsdGVVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaFBhcmFtcyk7XG5cdFx0Y3VycmVudF91cmwgPSBudWxsO1xuXHR9XG5cblx0Z2V0IGhhc2goKSB7XG5cdFx0cmV0dXJuIGdldCh0aGlzLiNoYXNoKTtcblx0fVxuXG5cdHNldCBoYXNoKHZhbHVlKSB7XG5cdFx0c3VwZXIuaGFzaCA9IHZhbHVlO1xuXHRcdHNldCh0aGlzLiNoYXNoLCBzdXBlci5oYXNoKTtcblx0fVxuXG5cdGdldCBob3N0KCkge1xuXHRcdGdldCh0aGlzLiNob3N0bmFtZSk7XG5cdFx0Z2V0KHRoaXMuI3BvcnQpO1xuXHRcdHJldHVybiBzdXBlci5ob3N0O1xuXHR9XG5cblx0c2V0IGhvc3QodmFsdWUpIHtcblx0XHRzdXBlci5ob3N0ID0gdmFsdWU7XG5cdFx0c2V0KHRoaXMuI2hvc3RuYW1lLCBzdXBlci5ob3N0bmFtZSk7XG5cdFx0c2V0KHRoaXMuI3BvcnQsIHN1cGVyLnBvcnQpO1xuXHR9XG5cblx0Z2V0IGhvc3RuYW1lKCkge1xuXHRcdHJldHVybiBnZXQodGhpcy4jaG9zdG5hbWUpO1xuXHR9XG5cblx0c2V0IGhvc3RuYW1lKHZhbHVlKSB7XG5cdFx0c3VwZXIuaG9zdG5hbWUgPSB2YWx1ZTtcblx0XHRzZXQodGhpcy4jaG9zdG5hbWUsIHN1cGVyLmhvc3RuYW1lKTtcblx0fVxuXG5cdGdldCBocmVmKCkge1xuXHRcdGdldCh0aGlzLiNwcm90b2NvbCk7XG5cdFx0Z2V0KHRoaXMuI3VzZXJuYW1lKTtcblx0XHRnZXQodGhpcy4jcGFzc3dvcmQpO1xuXHRcdGdldCh0aGlzLiNob3N0bmFtZSk7XG5cdFx0Z2V0KHRoaXMuI3BvcnQpO1xuXHRcdGdldCh0aGlzLiNwYXRobmFtZSk7XG5cdFx0Z2V0KHRoaXMuI2hhc2gpO1xuXHRcdGdldCh0aGlzLiNzZWFyY2gpO1xuXHRcdHJldHVybiBzdXBlci5ocmVmO1xuXHR9XG5cblx0c2V0IGhyZWYodmFsdWUpIHtcblx0XHRzdXBlci5ocmVmID0gdmFsdWU7XG5cdFx0c2V0KHRoaXMuI3Byb3RvY29sLCBzdXBlci5wcm90b2NvbCk7XG5cdFx0c2V0KHRoaXMuI3VzZXJuYW1lLCBzdXBlci51c2VybmFtZSk7XG5cdFx0c2V0KHRoaXMuI3Bhc3N3b3JkLCBzdXBlci5wYXNzd29yZCk7XG5cdFx0c2V0KHRoaXMuI2hvc3RuYW1lLCBzdXBlci5ob3N0bmFtZSk7XG5cdFx0c2V0KHRoaXMuI3BvcnQsIHN1cGVyLnBvcnQpO1xuXHRcdHNldCh0aGlzLiNwYXRobmFtZSwgc3VwZXIucGF0aG5hbWUpO1xuXHRcdHNldCh0aGlzLiNoYXNoLCBzdXBlci5oYXNoKTtcblx0XHRzZXQodGhpcy4jc2VhcmNoLCBzdXBlci5zZWFyY2gpO1xuXHRcdHRoaXMuI3NlYXJjaFBhcmFtc1tSRVBMQUNFXShzdXBlci5zZWFyY2hQYXJhbXMpO1xuXHR9XG5cblx0Z2V0IHBhc3N3b3JkKCkge1xuXHRcdHJldHVybiBnZXQodGhpcy4jcGFzc3dvcmQpO1xuXHR9XG5cblx0c2V0IHBhc3N3b3JkKHZhbHVlKSB7XG5cdFx0c3VwZXIucGFzc3dvcmQgPSB2YWx1ZTtcblx0XHRzZXQodGhpcy4jcGFzc3dvcmQsIHN1cGVyLnBhc3N3b3JkKTtcblx0fVxuXG5cdGdldCBwYXRobmFtZSgpIHtcblx0XHRyZXR1cm4gZ2V0KHRoaXMuI3BhdGhuYW1lKTtcblx0fVxuXG5cdHNldCBwYXRobmFtZSh2YWx1ZSkge1xuXHRcdHN1cGVyLnBhdGhuYW1lID0gdmFsdWU7XG5cdFx0c2V0KHRoaXMuI3BhdGhuYW1lLCBzdXBlci5wYXRobmFtZSk7XG5cdH1cblxuXHRnZXQgcG9ydCgpIHtcblx0XHRyZXR1cm4gZ2V0KHRoaXMuI3BvcnQpO1xuXHR9XG5cblx0c2V0IHBvcnQodmFsdWUpIHtcblx0XHRzdXBlci5wb3J0ID0gdmFsdWU7XG5cdFx0c2V0KHRoaXMuI3BvcnQsIHN1cGVyLnBvcnQpO1xuXHR9XG5cblx0Z2V0IHByb3RvY29sKCkge1xuXHRcdHJldHVybiBnZXQodGhpcy4jcHJvdG9jb2wpO1xuXHR9XG5cblx0c2V0IHByb3RvY29sKHZhbHVlKSB7XG5cdFx0c3VwZXIucHJvdG9jb2wgPSB2YWx1ZTtcblx0XHRzZXQodGhpcy4jcHJvdG9jb2wsIHN1cGVyLnByb3RvY29sKTtcblx0fVxuXG5cdGdldCBzZWFyY2goKSB7XG5cdFx0cmV0dXJuIGdldCh0aGlzLiNzZWFyY2gpO1xuXHR9XG5cblx0c2V0IHNlYXJjaCh2YWx1ZSkge1xuXHRcdHN1cGVyLnNlYXJjaCA9IHZhbHVlO1xuXHRcdHNldCh0aGlzLiNzZWFyY2gsIHN1cGVyLnNlYXJjaCk7XG5cdFx0dGhpcy4jc2VhcmNoUGFyYW1zW1JFUExBQ0VdKHN1cGVyLnNlYXJjaFBhcmFtcyk7XG5cdH1cblxuXHRnZXQgdXNlcm5hbWUoKSB7XG5cdFx0cmV0dXJuIGdldCh0aGlzLiN1c2VybmFtZSk7XG5cdH1cblxuXHRzZXQgdXNlcm5hbWUodmFsdWUpIHtcblx0XHRzdXBlci51c2VybmFtZSA9IHZhbHVlO1xuXHRcdHNldCh0aGlzLiN1c2VybmFtZSwgc3VwZXIudXNlcm5hbWUpO1xuXHR9XG5cblx0Z2V0IG9yaWdpbigpIHtcblx0XHRnZXQodGhpcy4jcHJvdG9jb2wpO1xuXHRcdGdldCh0aGlzLiNob3N0bmFtZSk7XG5cdFx0Z2V0KHRoaXMuI3BvcnQpO1xuXHRcdHJldHVybiBzdXBlci5vcmlnaW47XG5cdH1cblxuXHRnZXQgc2VhcmNoUGFyYW1zKCkge1xuXHRcdHJldHVybiB0aGlzLiNzZWFyY2hQYXJhbXM7XG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cbn1cbiIsImltcG9ydCB7IG9uIH0gZnJvbSAnLi4vZXZlbnRzL2luZGV4LmpzJztcbmltcG9ydCB7IFJlYWN0aXZlVmFsdWUgfSBmcm9tICcuL3JlYWN0aXZlLXZhbHVlLmpzJztcblxuY29uc3QgcGFyZW50aGVzaXNfcmVnZXggPSAvXFwoLitcXCkvO1xuXG4vLyB0aGVzZSBrZXl3b3JkcyBhcmUgdmFsaWQgbWVkaWEgcXVlcmllcyBidXQgdGhleSBuZWVkIHRvIGJlIHdpdGhvdXQgcGFyZW50aGVzaXNcbi8vXG4vLyBlZzogbmV3IE1lZGlhUXVlcnkoJ3NjcmVlbicpXG4vL1xuLy8gaG93ZXZlciBiZWNhdXNlIG9mIHRoZSBhdXRvLXBhcmVudGhlc2lzIGxvZ2ljIGluIHRoZSBjb25zdHJ1Y3RvciBzaW5jZSB0aGVyZSdzIG5vIHBhcmVudGhlc2lzXG4vLyBpbiB0aGUgbWVkaWEgcXVlcnkgdGhleSdsbCBiZSBzdXJyb3VuZGVkIGJ5IHBhcmVudGhlc2lzXG4vL1xuLy8gaG93ZXZlciB3ZSBjYW4gY2hlY2sgaWYgdGhlIG1lZGlhIHF1ZXJ5IGlzIG9ubHkgY29tcG9zZWQgb2YgdGhlc2Uga2V5d29yZHNcbi8vIGFuZCBza2lwIHRoZSBhdXRvLXBhcmVudGhlc2lzXG4vL1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9pc3N1ZXMvMTU5MzBcbmNvbnN0IG5vbl9wYXJlbnRoZXNpemVkX2tleXdvcmRzID0gbmV3IFNldChbJ2FsbCcsICdwcmludCcsICdzY3JlZW4nLCAnYW5kJywgJ29yJywgJ25vdCcsICdvbmx5J10pO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtZWRpYSBxdWVyeSBhbmQgcHJvdmlkZXMgYSBgY3VycmVudGAgcHJvcGVydHkgdGhhdCByZWZsZWN0cyB3aGV0aGVyIG9yIG5vdCBpdCBtYXRjaGVzLlxuICpcbiAqIFVzZSBpdCBjYXJlZnVsbHkg4oCUIGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcsIHRoZXJlIGlzIG5vIHdheSB0byBrbm93IHdoYXQgdGhlIGNvcnJlY3QgdmFsdWUgc2hvdWxkIGJlLCBwb3RlbnRpYWxseSBjYXVzaW5nIGNvbnRlbnQgdG8gY2hhbmdlIHVwb24gaHlkcmF0aW9uLlxuICogSWYgeW91IGNhbiB1c2UgdGhlIG1lZGlhIHF1ZXJ5IGluIENTUyB0byBhY2hpZXZlIHRoZSBzYW1lIGVmZmVjdCwgZG8gdGhhdC5cbiAqXG4gKiBgYGBzdmVsdGVcbiAqIDxzY3JpcHQ+XG4gKiBcdGltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICdzdmVsdGUvcmVhY3Rpdml0eSc7XG4gKlxuICogXHRjb25zdCBsYXJnZSA9IG5ldyBNZWRpYVF1ZXJ5KCdtaW4td2lkdGg6IDgwMHB4Jyk7XG4gKiA8L3NjcmlwdD5cbiAqXG4gKiA8aDE+e2xhcmdlLmN1cnJlbnQgPyAnbGFyZ2Ugc2NyZWVuJyA6ICdzbWFsbCBzY3JlZW4nfTwvaDE+XG4gKiBgYGBcbiAqIEBleHRlbmRzIHtSZWFjdGl2ZVZhbHVlPGJvb2xlYW4+fVxuICogQHNpbmNlIDUuNy4wXG4gKi9cbmV4cG9ydCBjbGFzcyBNZWRpYVF1ZXJ5IGV4dGVuZHMgUmVhY3RpdmVWYWx1ZSB7XG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgQSBtZWRpYSBxdWVyeSBzdHJpbmdcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmFsbGJhY2tdIEZhbGxiYWNrIHZhbHVlIGZvciB0aGUgc2VydmVyXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihxdWVyeSwgZmFsbGJhY2spIHtcblx0XHRsZXQgZmluYWxfcXVlcnkgPVxuXHRcdFx0cGFyZW50aGVzaXNfcmVnZXgudGVzdChxdWVyeSkgfHxcblx0XHRcdC8vIHdlIG5lZWQgdG8gdXNlIGBzb21lYCBoZXJlIGJlY2F1c2UgdGVjaG5pY2FsbHkgdGhpcyBgd2luZG93Lm1hdGNoTWVkaWEoJ3JhbmRvbSxzY3JlZW4nKWAgc3RpbGwgcmV0dXJucyB0cnVlXG5cdFx0XHRxdWVyeS5zcGxpdCgvW1xccyxdKy8pLnNvbWUoKGtleXdvcmQpID0+IG5vbl9wYXJlbnRoZXNpemVkX2tleXdvcmRzLmhhcyhrZXl3b3JkLnRyaW0oKSkpXG5cdFx0XHRcdD8gcXVlcnlcblx0XHRcdFx0OiBgKCR7cXVlcnl9KWA7XG5cdFx0Y29uc3QgcSA9IHdpbmRvdy5tYXRjaE1lZGlhKGZpbmFsX3F1ZXJ5KTtcblx0XHRzdXBlcihcblx0XHRcdCgpID0+IHEubWF0Y2hlcyxcblx0XHRcdCh1cGRhdGUpID0+IG9uKHEsICdjaGFuZ2UnLCB1cGRhdGUpXG5cdFx0KTtcblx0fVxufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNV0sIm1h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