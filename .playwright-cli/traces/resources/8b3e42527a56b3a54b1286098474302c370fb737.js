import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/node_modules/.vite/deps/svelte-themes.js?v=1b1d2797");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";
import { At as user_derived, Br as FILENAME, F as user_effect, Pr as noop, Q as first_child, Vr as HMR, _n as setContext, _t as state, a as get, ct as strict_equals, f as untrack, fn as getContext, gn as push, hn as pop, ht as set, on as add_svelte_meta, xn as tag } from "/node_modules/.vite/deps/runtime-CvqZjhGP.js?v=1b1d2797";
import { At as check_target, Gt as onMount, Nt as hmr, a as prop, bt as html, dt as head, jt as legacy_api, qt as snippet } from "/node_modules/.vite/deps/client-DfNCoPF5.js?v=1b1d2797";
import { c as on } from "/node_modules/.vite/deps/events-BMGcVxNO.js?v=1b1d2797";
import { D as append, k as comment } from "/node_modules/.vite/deps/legacy-client-Dq7WBxVc.js?v=1b1d2797";
import { t as MediaQuery } from "/node_modules/.vite/deps/index-client-DXuZVEX9.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_events.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte-themes@2.0.10_svelte@5.56.4_@typescript-eslint+types@8.62.1_/node_modules/svelte-themes/dist/constants.js
var colorSchemes = ["light", "dark"];
var MEDIA = "(prefers-color-scheme: dark)";
//#endregion
//#region node_modules/.pnpm/svelte-themes@2.0.10_svelte@5.56.4_@typescript-eslint+types@8.62.1_/node_modules/svelte-themes/dist/helpers.js
var ANIMATION_DELAY_MS = 1;
var disableAnimation = () => {
	const css = document.createElement("style");
	css.appendChild(document.createTextNode(`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`));
	document.head.appendChild(css);
	return () => {
		(() => window.getComputedStyle(document.body))();
		setTimeout(() => {
			document.head.removeChild(css);
		}, ANIMATION_DELAY_MS);
	};
};
var escapeForInlineScript = (json) => JSON.stringify(json).replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/-->/g, "--\\>").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
var escapeJsString = (s) => String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
//#endregion
//#region node_modules/.pnpm/svelte-themes@2.0.10_svelte@5.56.4_@typescript-eslint+types@8.62.1_/node_modules/svelte-themes/dist/theme.state.svelte.js
var browser = strict_equals(typeof window, "undefined", false);
var Theme = class {
	options;
	#theme = tag(state(), "Theme.#theme");
	colorsScheme = new MediaQuery(MEDIA);
	#systemTheme = tag(user_derived(() => this.colorsScheme.current ? "dark" : "light"), "Theme.systemTheme");
	get systemTheme() {
		return get(this.#systemTheme);
	}
	set systemTheme(value) {
		set(this.#systemTheme, value);
	}
	constructor(options) {
		this.options = options;
		this.getInitialTheme();
		onMount(() => on(window, "storage", this.storageHandler, {}));
		setContext("theme", this);
		user_effect(() => {
			this.resolvedTheme;
			untrack(() => {
				const enable = this.options.disableTransitionOnChange ? disableAnimation() : null;
				this.applyThemeToDOM();
				this.setColorScheme();
				enable?.();
			});
		});
	}
	getInitialTheme() {
		if (!browser) return void 0;
		let theme;
		try {
			theme = localStorage.getItem(this.options.storageKey) || void 0;
		} catch {}
		if (theme && !this.options.themes.includes(theme)) theme = this.options.defaultTheme;
		set(this.#theme, theme || this.options.defaultTheme, true);
	}
	storageHandler = (e) => {
		if (strict_equals(e.key, this.options.storageKey, false)) return;
		const newValue = e.newValue;
		if (strict_equals(newValue, "system") && !this.options.enableSystem) {
			set(this.#theme, this.options.defaultTheme, true);
			this.setThemeStorage(this.options.defaultTheme);
		} else if (newValue && this.options.themes.includes(newValue)) set(this.#theme, newValue, true);
		else this.getInitialTheme();
	};
	validateTheme(newTheme) {
		if (!newTheme || strict_equals(this.options.themes.length, 0)) return;
		if (!this.options.themes.includes(newTheme)) throw new Error(`svelte-themes: Invalid theme "${newTheme}". Currently loaded themes are: [${this.options.themes.join(", ")}]`);
	}
	setColorScheme() {
		if (!this.options.enableColorScheme) {
			document.documentElement.style.removeProperty("color-scheme");
			return;
		}
		if (this.options.enableColorScheme && browser && this.resolvedTheme) {
			const colorScheme = this.options.colorScheme?.[this.resolvedTheme] || colorSchemes.find((c) => strict_equals(c, this.resolvedTheme)) || (strict_equals(this.theme, "system") && this.systemTheme ? this.systemTheme : void 0);
			const root = document.documentElement.style;
			if (colorScheme) root.setProperty("color-scheme", colorScheme);
			else root.removeProperty("color-scheme");
		}
	}
	applyThemeToDOM() {
		if (!browser) return;
		const element = document.documentElement;
		if (strict_equals(this.options.attribute, "class")) {
			const classesToRemove = this.options.themes.flatMap((theme) => [theme, this.options.value?.[theme] || theme]);
			element.classList.remove(...classesToRemove);
			if (this.resolvedTheme) {
				const classValue = this.options.value?.[this.resolvedTheme] || this.resolvedTheme;
				element.classList.add(classValue);
			}
		} else {
			const value = this.options.value?.[this.resolvedTheme] || this.resolvedTheme;
			if (value) element.setAttribute(this.options.attribute, value);
		}
	}
	setThemeStorage(theme) {
		try {
			localStorage.setItem(this.options.storageKey, theme);
			return true;
		} catch {
			return false;
		}
	}
	get theme() {
		return get(this.#theme);
	}
	set theme(theme) {
		if (this.options.forcedTheme) return;
		if (theme) {
			this.validateTheme(theme);
			set(this.#theme, theme, true);
			this.setThemeStorage(theme);
		}
	}
	get themes() {
		return this.options.themes;
	}
	#resolvedTheme = tag(user_derived(() => {
		if (strict_equals(typeof this.options.forcedTheme, "string")) return this.options.forcedTheme;
		if (this.options.enableSystem && this.systemTheme && strict_equals(get(this.#theme), "system")) return this.systemTheme;
		return get(this.#theme);
	}), "Theme.resolvedTheme");
	get resolvedTheme() {
		return get(this.#resolvedTheme);
	}
	set resolvedTheme(value) {
		set(this.#resolvedTheme, value);
	}
};
var useTheme = () => {
	const theme = getContext("theme");
	if (!theme) throw new Error("Theme context not found");
	return theme;
};
//#endregion
//#region node_modules/.pnpm/svelte-themes@2.0.10_svelte@5.56.4_@typescript-eslint+types@8.62.1_/node_modules/svelte-themes/dist/SvelteTheme.svelte
SvelteTheme[FILENAME] = "node_modules/.pnpm/svelte-themes@2.0.10_svelte@5.56.4_@typescript-eslint+types@8.62.1_/node_modules/svelte-themes/dist/SvelteTheme.svelte";
function SvelteTheme($$anchor, $$props) {
	check_target(new.target);
	push($$props, true, SvelteTheme);
	let forcedTheme = prop($$props, "forcedTheme", 3, void 0), disableTransitionOnChange = prop($$props, "disableTransitionOnChange", 3, false), enableSystem = prop($$props, "enableSystem", 3, true), enableColorScheme = prop($$props, "enableColorScheme", 3, true), storageKey = prop($$props, "storageKey", 3, "theme"), defaultTheme = prop($$props, "defaultTheme", 19, () => enableSystem() ? "system" : "light"), attribute = prop($$props, "attribute", 3, "data-theme"), value = prop($$props, "value", 3, void 0), theme = prop($$props, "theme", 15);
	const validatedDefaultTheme = (() => {
		const currentThemes = $$props.themes && $$props.themes.length > 0 ? $$props.themes : ["light", "dark"];
		const finalThemes = enableSystem() && !currentThemes.includes("system") ? currentThemes.concat("system") : currentThemes;
		return finalThemes.includes(defaultTheme()) ? defaultTheme() : finalThemes[0];
	})();
	theme(new Theme({
		get forcedTheme() {
			return forcedTheme();
		},
		get themes() {
			const currentThemes = $$props.themes && $$props.themes.length > 0 ? $$props.themes : ["light", "dark"];
			if (enableSystem() && !currentThemes.includes("system")) return currentThemes.concat("system");
			return currentThemes;
		},
		get enableSystem() {
			return enableSystem();
		},
		get enableColorScheme() {
			return enableColorScheme();
		},
		get colorScheme() {
			return $$props.colorScheme;
		},
		get defaultTheme() {
			return validatedDefaultTheme;
		},
		get attribute() {
			return attribute();
		},
		get value() {
			return value();
		},
		get storageKey() {
			return storageKey();
		},
		get disableTransitionOnChange() {
			return disableTransitionOnChange();
		}
	}));
	const attrs = !value() ? $$props.themes || [] : Object.values(value() || {});
	let themeScript = `<script>
		function svelteTheme(){		
		var d=document.documentElement;
		var x=${escapeForInlineScript(value() || {})};
		var y=${escapeForInlineScript($$props.colorScheme || {})};
		var validThemes=${escapeForInlineScript(theme().themes)};		
		var localStorageTheme; try { localStorageTheme = localStorage.getItem('${escapeJsString(storageKey())}'); } catch(e) { localStorageTheme = null; }
		var systemTheme = ${enableSystem() ? `window.matchMedia('${MEDIA}').matches ? 'dark' : 'light'` : "'normal'"};
		var isValidTheme = validThemes.indexOf(localStorageTheme) !== -1;	
		var isSystemThemeButDisabled = localStorageTheme === 'system' && ${!enableSystem()};
		var currentTheme = isValidTheme ? localStorageTheme : '${escapeJsString(validatedDefaultTheme)}';
		if (isSystemThemeButDisabled) {
			currentTheme = '${escapeJsString(validatedDefaultTheme)}';
			try { localStorage.setItem('${escapeJsString(storageKey())}', currentTheme); } catch(e) {}
		}		
		var isSystemTheme = ${enableSystem() ? "currentTheme === 'system'" : "false"};
		var resolvedTheme = ${forcedTheme() ? `'${escapeJsString(forcedTheme())}'` : `isSystemTheme ? systemTheme : currentTheme`};				
		var colorSchemeMode = y[resolvedTheme] || (resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'normal');
		var val = x[resolvedTheme] || resolvedTheme;
		${enableColorScheme() ? `d.style.setProperty('color-scheme', colorSchemeMode);` : ""}
		${strict_equals(attribute(), "class") ? `d.classList.remove(${attrs.map((t) => `'${escapeJsString(t)}'`).join(",")})` : ""};
		${strict_equals(attribute(), "class") ? `d.classList.add(val);` : `d.setAttribute('${escapeJsString(attribute())}', val);`};
		};svelteTheme();
		<\/script>`;
	var $$exports = { ...legacy_api() };
	var fragment_1 = comment();
	head("17zq36i", ($$anchor) => {
		var fragment = comment();
		html(first_child(fragment), () => themeScript);
		append($$anchor, fragment);
	});
	var node_1 = first_child(fragment_1);
	add_svelte_meta(() => snippet(node_1, () => $$props.children ?? noop, theme), "render", SvelteTheme, 106, 0);
	append($$anchor, fragment_1);
	return pop($$exports);
}
if (import.meta.hot) {
	SvelteTheme = hmr(SvelteTheme);
	import.meta.hot.accept((module) => {
		SvelteTheme[HMR].update(module.default);
	});
}
var SvelteTheme_default = SvelteTheme;
//#endregion
export { SvelteTheme_default as SvelteTheme, Theme, useTheme };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlLXRoZW1lcy5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8ucG5wbS9zdmVsdGUtdGhlbWVzQDIuMC4xMF9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjFfL25vZGVfbW9kdWxlcy9zdmVsdGUtdGhlbWVzL2Rpc3QvY29uc3RhbnRzLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlLXRoZW1lc0AyLjAuMTBfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xXy9ub2RlX21vZHVsZXMvc3ZlbHRlLXRoZW1lcy9kaXN0L2hlbHBlcnMuanMiLCIuLi8uLi8ucG5wbS9zdmVsdGUtdGhlbWVzQDIuMC4xMF9zdmVsdGVANS41Ni40X0B0eXBlc2NyaXB0LWVzbGludCt0eXBlc0A4LjYyLjFfL25vZGVfbW9kdWxlcy9zdmVsdGUtdGhlbWVzL2Rpc3QvdGhlbWUuc3RhdGUuc3ZlbHRlLmpzIiwiLi4vLi4vLnBucG0vc3ZlbHRlLXRoZW1lc0AyLjAuMTBfc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xXy9ub2RlX21vZHVsZXMvc3ZlbHRlLXRoZW1lcy9kaXN0L1N2ZWx0ZVRoZW1lLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29sb3JTY2hlbWVzID0gWydsaWdodCcsICdkYXJrJ107XG5leHBvcnQgY29uc3QgTUVESUEgPSAnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSc7XG4iLCJjb25zdCBBTklNQVRJT05fREVMQVlfTVMgPSAxO1xuZXhwb3J0IGNvbnN0IGRpc2FibGVBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjc3MuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCp7LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy1tb3otdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDstby10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy1tcy10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50O3RyYW5zaXRpb246bm9uZSFpbXBvcnRhbnR9YCkpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAvLyBGb3JjZSB0byByZXN0eWxlXG4gICAgICAgICgoKSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSkoKTtcbiAgICAgICAgLy8gV2FpdCBmb3IgdGhlIG5leHQgdGljayBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGNzcyk7XG4gICAgICAgIH0sIEFOSU1BVElPTl9ERUxBWV9NUyk7XG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgZXNjYXBlRm9ySW5saW5lU2NyaXB0ID0gKGpzb24pID0+IEpTT04uc3RyaW5naWZ5KGpzb24pXG4gICAgLnJlcGxhY2UoLzwvZywgJ1xcXFx1MDAzQycpXG4gICAgLnJlcGxhY2UoLz4vZywgJ1xcXFx1MDAzRScpXG4gICAgLnJlcGxhY2UoLy0tPi9nLCAnLS1cXFxcPicpXG4gICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgJ1xcXFx1MjAyOCcpXG4gICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgJ1xcXFx1MjAyOScpO1xuZXhwb3J0IGNvbnN0IGVzY2FwZUpzU3RyaW5nID0gKHMpID0+IFN0cmluZyhzKVxuICAgIC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpXG4gICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csICdcXFxcdTIwMjgnKVxuICAgIC5yZXBsYWNlKC9cXHUyMDI5L2csICdcXFxcdTIwMjknKTtcbiIsIi8vIFRoaXMgaXMgdG8gYWxsb3cgdGhlIGNsYXNzIHRvIHJlYWN0IHRvIHNvbWUgU3ZlbHRlVGhlbVByb3BzIGNoYW5nZXNcbi8vIElmIHdlIHBhc3MgZ2V0dGVyL3NldHRlciBhcyBvcHRpb25zLCB0aGV5IHdpbGwgYmUgcmVmbGVjdCBvbiB0aGUgY2xhc3MuXG5pbXBvcnQgeyBnZXRDb250ZXh0LCBvbk1vdW50LCBzZXRDb250ZXh0LCB1bnRyYWNrIH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB7fSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGRpc2FibGVBbmltYXRpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuY29uc3QgYnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuaW1wb3J0IHsgY29sb3JTY2hlbWVzLCBNRURJQSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICdzdmVsdGUvcmVhY3Rpdml0eSc7XG5pbXBvcnQgeyBvbiB9IGZyb20gJ3N2ZWx0ZS9ldmVudHMnO1xuZXhwb3J0IGNsYXNzIFRoZW1lIHtcbiAgICBvcHRpb25zO1xuICAgICN0aGVtZSA9ICRzdGF0ZSgpO1xuICAgIGNvbG9yc1NjaGVtZSA9IG5ldyBNZWRpYVF1ZXJ5KE1FRElBKTtcbiAgICBzeXN0ZW1UaGVtZSA9ICRkZXJpdmVkKHRoaXMuY29sb3JzU2NoZW1lLmN1cnJlbnQgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuZ2V0SW5pdGlhbFRoZW1lKCk7XG4gICAgICAgIG9uTW91bnQoKCkgPT4gb24od2luZG93LCAnc3RvcmFnZScsIHRoaXMuc3RvcmFnZUhhbmRsZXIsIHt9KSk7XG4gICAgICAgIHNldENvbnRleHQoJ3RoZW1lJywgdGhpcyk7XG4gICAgICAgICRlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZFRoZW1lO1xuICAgICAgICAgICAgdW50cmFjaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5hYmxlID0gdGhpcy5vcHRpb25zLmRpc2FibGVUcmFuc2l0aW9uT25DaGFuZ2UgPyBkaXNhYmxlQW5pbWF0aW9uKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUaGVtZVRvRE9NKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb2xvclNjaGVtZSgpO1xuICAgICAgICAgICAgICAgIGVuYWJsZT8uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEluaXRpYWxUaGVtZSgpIHtcbiAgICAgICAgaWYgKCFicm93c2VyKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHRoZW1lO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm9wdGlvbnMuc3RvcmFnZUtleSkgfHwgdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIC8vIFVuc3VwcG9ydGVkXG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGUgdGhhdCB0aGUgc3RvcmVkIHRoZW1lIGlzIGluIHRoZSBhbGxvd2VkIHRoZW1lcyBsaXN0XG4gICAgICAgIGlmICh0aGVtZSAmJiAhdGhpcy5vcHRpb25zLnRoZW1lcy5pbmNsdWRlcyh0aGVtZSkpIHtcbiAgICAgICAgICAgIHRoZW1lID0gdGhpcy5vcHRpb25zLmRlZmF1bHRUaGVtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiN0aGVtZSA9IHRoZW1lIHx8IHRoaXMub3B0aW9ucy5kZWZhdWx0VGhlbWU7XG4gICAgfVxuICAgIHN0b3JhZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ICE9PSB0aGlzLm9wdGlvbnMuc3RvcmFnZUtleSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBlLm5ld1ZhbHVlO1xuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVyZSBhbm90aGVyIHRhYiBzZXQgdGhlbWUgdG8gJ3N5c3RlbScgYnV0IGVuYWJsZVN5c3RlbSBpcyBmYWxzZVxuICAgICAgICBpZiAobmV3VmFsdWUgPT09ICdzeXN0ZW0nICYmICF0aGlzLm9wdGlvbnMuZW5hYmxlU3lzdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiN0aGVtZSA9IHRoaXMub3B0aW9ucy5kZWZhdWx0VGhlbWU7XG4gICAgICAgICAgICB0aGlzLnNldFRoZW1lU3RvcmFnZSh0aGlzLm9wdGlvbnMuZGVmYXVsdFRoZW1lKTsgLy8gVXBkYXRlIGxvY2FsU3RvcmFnZSB0byByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSAmJiB0aGlzLm9wdGlvbnMudGhlbWVzLmluY2x1ZGVzKG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gdHJpZ2dlciBzZXQgdHJhcDtcbiAgICAgICAgICAgIHRoaXMuI3RoZW1lID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEluaXRpYWxUaGVtZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YWxpZGF0ZVRoZW1lKG5ld1RoZW1lKSB7XG4gICAgICAgIC8vIFNraXAgdmFsaWRhdGlvbiBpZiB0aGVtZXMgYXJyYXkgaXMgZW1wdHkgKGR1cmluZyBpbml0aWFsaXphdGlvbilcbiAgICAgICAgLy8gb3IgaWYgbmV3VGhlbWUgaXMgdW5kZWZpbmVkXG4gICAgICAgIGlmICghbmV3VGhlbWUgfHwgdGhpcy5vcHRpb25zLnRoZW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy50aGVtZXMuaW5jbHVkZXMobmV3VGhlbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHN2ZWx0ZS10aGVtZXM6IEludmFsaWQgdGhlbWUgXCIke25ld1RoZW1lfVwiLiBDdXJyZW50bHkgbG9hZGVkIHRoZW1lcyBhcmU6IFske3RoaXMub3B0aW9ucy50aGVtZXMuam9pbignLCAnKX1dYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0Q29sb3JTY2hlbWUoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmVuYWJsZUNvbG9yU2NoZW1lKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2NvbG9yLXNjaGVtZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlQ29sb3JTY2hlbWUgJiYgYnJvd3NlciAmJiB0aGlzLnJlc29sdmVkVGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gdGhpcy5vcHRpb25zLmNvbG9yU2NoZW1lPy5bdGhpcy5yZXNvbHZlZFRoZW1lXSB8fFxuICAgICAgICAgICAgICAgIGNvbG9yU2NoZW1lcy5maW5kKChjKSA9PiBjID09PSB0aGlzLnJlc29sdmVkVGhlbWUpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMudGhlbWUgPT09ICdzeXN0ZW0nICYmIHRoaXMuc3lzdGVtVGhlbWUgPyB0aGlzLnN5c3RlbVRoZW1lIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG4gICAgICAgICAgICBpZiAoY29sb3JTY2hlbWUpIHtcbiAgICAgICAgICAgICAgICByb290LnNldFByb3BlcnR5KCdjb2xvci1zY2hlbWUnLCBjb2xvclNjaGVtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGNvbG9yLXNjaGVtZSBwcm9wZXJ0eSBpZiBubyBtYXRjaGluZyBjb2xvciBzY2hlbWUgaXMgZm91bmRcbiAgICAgICAgICAgICAgICByb290LnJlbW92ZVByb3BlcnR5KCdjb2xvci1zY2hlbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBseVRoZW1lVG9ET00oKSB7XG4gICAgICAgIGlmICghYnJvd3NlcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGUgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgcG9zc2libGUgY2xhc3MgdmFsdWVzIChib3RoIG9yaWdpbmFsIHRoZW1lIG5hbWVzIGFuZCBtYXBwZWQgdmFsdWVzKVxuICAgICAgICAgICAgY29uc3QgY2xhc3Nlc1RvUmVtb3ZlID0gdGhpcy5vcHRpb25zLnRoZW1lcy5mbGF0TWFwKCh0aGVtZSkgPT4gW1xuICAgICAgICAgICAgICAgIHRoZW1lLCAvLyBPcmlnaW5hbCB0aGVtZSBuYW1lXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnZhbHVlPy5bdGhlbWVdIHx8IHRoZW1lIC8vIE1hcHBlZCB2YWx1ZSBpZiBleGlzdHNcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1JlbW92ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNvbHZlZFRoZW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgY3VzdG9tIHZhbHVlIGlmIHByb3ZpZGVkLCBzYW1lIGFzIGRhdGEgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzVmFsdWUgPSB0aGlzLm9wdGlvbnMudmFsdWU/Llt0aGlzLnJlc29sdmVkVGhlbWVdIHx8IHRoaXMucmVzb2x2ZWRUaGVtZTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBBcHBseSBjdXN0b20gdmFsdWUgaWYgcHJvdmlkZWRcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5vcHRpb25zLnZhbHVlPy5bdGhpcy5yZXNvbHZlZFRoZW1lXSB8fCB0aGlzLnJlc29sdmVkVGhlbWU7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMuYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0VGhlbWVTdG9yYWdlKHRoZW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm9wdGlvbnMuc3RvcmFnZUtleSwgdGhlbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB0aGVtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3RoZW1lO1xuICAgIH1cbiAgICBzZXQgdGhlbWUodGhlbWUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb3JjZWRUaGVtZSkge1xuICAgICAgICAgICAgLy8gVGhlbWUgaXMgZm9yY2VkLCB3ZSBzaG91bGRuJ3QgYWxsb3cgdXNlciB0byBjaGFuZ2UgdGhlIHRoZW1lXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoZW1lKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlVGhlbWUodGhlbWUpO1xuICAgICAgICAgICAgdGhpcy4jdGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICAgIHRoaXMuc2V0VGhlbWVTdG9yYWdlKHRoZW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdGhlbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRoZW1lcztcbiAgICB9XG4gICAgcmVzb2x2ZWRUaGVtZSA9ICRkZXJpdmVkLmJ5KCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZm9yY2VkVGhlbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZvcmNlZFRoZW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlU3lzdGVtICYmIHRoaXMuc3lzdGVtVGhlbWUgJiYgdGhpcy4jdGhlbWUgPT09ICdzeXN0ZW0nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1UaGVtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4jdGhlbWU7XG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgdXNlVGhlbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBnZXRDb250ZXh0KCd0aGVtZScpO1xuICAgIGlmICghdGhlbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVtZSBjb250ZXh0IG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhlbWU7XG59O1xuIiwiPHNjcmlwdCBsYW5nPVwidHNcIiBnZW5lcmljcz1cImNvbnN0IFQgZXh0ZW5kcyByZWFkb25seSBzdHJpbmdbXVwiPlxuXHRpbXBvcnQgeyBNRURJQSB9IGZyb20gJy4vY29uc3RhbnRzJztcblx0aW1wb3J0IHsgdHlwZSBTdmVsdGVUaGVtZVByb3BzIH0gZnJvbSAnLic7XG5cdGltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi90aGVtZS5zdGF0ZS5zdmVsdGUnO1xuXHRpbXBvcnQgeyBlc2NhcGVGb3JJbmxpbmVTY3JpcHQsIGVzY2FwZUpzU3RyaW5nIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuXHRsZXQge1xuXHRcdGZvcmNlZFRoZW1lID0gdW5kZWZpbmVkLFxuXHRcdGRpc2FibGVUcmFuc2l0aW9uT25DaGFuZ2UgPSBmYWxzZSxcblx0XHRlbmFibGVTeXN0ZW0gPSB0cnVlLFxuXHRcdGVuYWJsZUNvbG9yU2NoZW1lID0gdHJ1ZSxcblx0XHRzdG9yYWdlS2V5ID0gJ3RoZW1lJyxcblx0XHR0aGVtZXMsXG5cdFx0ZGVmYXVsdFRoZW1lID0gZW5hYmxlU3lzdGVtID8gJ3N5c3RlbScgOiAnbGlnaHQnLFxuXHRcdGF0dHJpYnV0ZSA9ICdkYXRhLXRoZW1lJyxcblx0XHR2YWx1ZSA9IHVuZGVmaW5lZCxcblx0XHRjb2xvclNjaGVtZSxcblx0XHRjaGlsZHJlbixcblx0XHR0aGVtZSA9ICRiaW5kYWJsZSgpXG5cdH06IFN2ZWx0ZVRoZW1lUHJvcHM8VD4gPSAkcHJvcHMoKTtcblxuXHQvLyBWYWxpZGF0ZSBkZWZhdWx0VGhlbWUgaXMgaW4gdGhlbWVzIGFycmF5XG5cdGNvbnN0IHZhbGlkYXRlZERlZmF1bHRUaGVtZSA9ICgoKSA9PiB7XG5cdFx0Y29uc3QgZGVmYXVsdFRoZW1lcyA9IFsnbGlnaHQnLCAnZGFyayddO1xuXHRcdGNvbnN0IGN1cnJlbnRUaGVtZXMgPSAodGhlbWVzICYmIHRoZW1lcy5sZW5ndGggPiAwID8gdGhlbWVzIDogZGVmYXVsdFRoZW1lcykgYXMgc3RyaW5nW107XG5cdFx0Y29uc3QgZmluYWxUaGVtZXMgPVxuXHRcdFx0ZW5hYmxlU3lzdGVtICYmICFjdXJyZW50VGhlbWVzLmluY2x1ZGVzKCdzeXN0ZW0nKVxuXHRcdFx0XHQ/IGN1cnJlbnRUaGVtZXMuY29uY2F0KCdzeXN0ZW0nKVxuXHRcdFx0XHQ6IGN1cnJlbnRUaGVtZXM7XG5cblx0XHQvLyBJZiBkZWZhdWx0VGhlbWUgaXMgbm90IGluIHRoZSB0aGVtZXMgYXJyYXksIGZhbGwgYmFjayB0byBmaXJzdCB0aGVtZVxuXHRcdHJldHVybiBmaW5hbFRoZW1lcy5pbmNsdWRlcyhkZWZhdWx0VGhlbWUpID8gZGVmYXVsdFRoZW1lIDogZmluYWxUaGVtZXNbMF07XG5cdH0pKCk7XG5cblx0dGhlbWUgPSBuZXcgVGhlbWUoe1xuXHRcdGdldCBmb3JjZWRUaGVtZSgpIHtcblx0XHRcdHJldHVybiBmb3JjZWRUaGVtZTtcblx0XHR9LFxuXHRcdGdldCB0aGVtZXMoKSB7XG5cdFx0XHRjb25zdCBkZWZhdWx0VGhlbWVzID0gWydsaWdodCcsICdkYXJrJ107XG5cdFx0XHRjb25zdCBjdXJyZW50VGhlbWVzID0gKHRoZW1lcyAmJiB0aGVtZXMubGVuZ3RoID4gMCA/IHRoZW1lcyA6IGRlZmF1bHRUaGVtZXMpIGFzIHN0cmluZ1tdO1xuXHRcdFx0aWYgKGVuYWJsZVN5c3RlbSAmJiAhY3VycmVudFRoZW1lcy5pbmNsdWRlcygnc3lzdGVtJykpIHtcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRUaGVtZXMuY29uY2F0KCdzeXN0ZW0nKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjdXJyZW50VGhlbWVzO1xuXHRcdH0sXG5cdFx0Z2V0IGVuYWJsZVN5c3RlbSgpIHtcblx0XHRcdHJldHVybiBlbmFibGVTeXN0ZW07XG5cdFx0fSxcblxuXHRcdGdldCBlbmFibGVDb2xvclNjaGVtZSgpIHtcblx0XHRcdHJldHVybiBlbmFibGVDb2xvclNjaGVtZTtcblx0XHR9LFxuXHRcdGdldCBjb2xvclNjaGVtZSgpIHtcblx0XHRcdHJldHVybiBjb2xvclNjaGVtZTtcblx0XHR9LFxuXG5cdFx0Z2V0IGRlZmF1bHRUaGVtZSgpIHtcblx0XHRcdHJldHVybiB2YWxpZGF0ZWREZWZhdWx0VGhlbWU7XG5cdFx0fSxcblx0XHRnZXQgYXR0cmlidXRlKCkge1xuXHRcdFx0cmV0dXJuIGF0dHJpYnV0ZTtcblx0XHR9LFxuXHRcdGdldCB2YWx1ZSgpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9LFxuXHRcdGdldCBzdG9yYWdlS2V5KCkge1xuXHRcdFx0cmV0dXJuIHN0b3JhZ2VLZXk7XG5cdFx0fSxcblx0XHRnZXQgZGlzYWJsZVRyYW5zaXRpb25PbkNoYW5nZSgpIHtcblx0XHRcdHJldHVybiBkaXNhYmxlVHJhbnNpdGlvbk9uQ2hhbmdlO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgYXR0cnMgPSAhdmFsdWUgPyB0aGVtZXMgfHwgW10gOiAoT2JqZWN0LnZhbHVlcyh2YWx1ZSB8fCB7fSkgYXMgc3RyaW5nW10pO1xuXHQvLyBFbmNhcHN1bGF0ZSBzY3JpcHQgdGFnIGludG8gc3RyaW5nIHNvIGFzIG5vdCB0byBtZXNzIHdpdGggdGhlIGNvbXBpbGVyXG5cdGxldCB0aGVtZVNjcmlwdCA9IGA8c2NyaXB0PlxuXHRcdGZ1bmN0aW9uIHN2ZWx0ZVRoZW1lKCl7XHRcdFxuXHRcdHZhciBkPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHR2YXIgeD0ke2VzY2FwZUZvcklubGluZVNjcmlwdCh2YWx1ZSB8fCB7fSl9O1xuXHRcdHZhciB5PSR7ZXNjYXBlRm9ySW5saW5lU2NyaXB0KGNvbG9yU2NoZW1lIHx8IHt9KX07XG5cdFx0dmFyIHZhbGlkVGhlbWVzPSR7ZXNjYXBlRm9ySW5saW5lU2NyaXB0KHRoZW1lLnRoZW1lcyl9O1x0XHRcblx0XHR2YXIgbG9jYWxTdG9yYWdlVGhlbWU7IHRyeSB7IGxvY2FsU3RvcmFnZVRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJyR7ZXNjYXBlSnNTdHJpbmcoc3RvcmFnZUtleSl9Jyk7IH0gY2F0Y2goZSkgeyBsb2NhbFN0b3JhZ2VUaGVtZSA9IG51bGw7IH1cblx0XHR2YXIgc3lzdGVtVGhlbWUgPSAke2VuYWJsZVN5c3RlbSA/IGB3aW5kb3cubWF0Y2hNZWRpYSgnJHtNRURJQX0nKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0J2AgOiBcIidub3JtYWwnXCJ9O1xuXHRcdHZhciBpc1ZhbGlkVGhlbWUgPSB2YWxpZFRoZW1lcy5pbmRleE9mKGxvY2FsU3RvcmFnZVRoZW1lKSAhPT0gLTE7XHRcblx0XHR2YXIgaXNTeXN0ZW1UaGVtZUJ1dERpc2FibGVkID0gbG9jYWxTdG9yYWdlVGhlbWUgPT09ICdzeXN0ZW0nICYmICR7IWVuYWJsZVN5c3RlbX07XG5cdFx0dmFyIGN1cnJlbnRUaGVtZSA9IGlzVmFsaWRUaGVtZSA/IGxvY2FsU3RvcmFnZVRoZW1lIDogJyR7ZXNjYXBlSnNTdHJpbmcodmFsaWRhdGVkRGVmYXVsdFRoZW1lKX0nO1xuXHRcdGlmIChpc1N5c3RlbVRoZW1lQnV0RGlzYWJsZWQpIHtcblx0XHRcdGN1cnJlbnRUaGVtZSA9ICcke2VzY2FwZUpzU3RyaW5nKHZhbGlkYXRlZERlZmF1bHRUaGVtZSl9Jztcblx0XHRcdHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCcke2VzY2FwZUpzU3RyaW5nKHN0b3JhZ2VLZXkpfScsIGN1cnJlbnRUaGVtZSk7IH0gY2F0Y2goZSkge31cblx0XHR9XHRcdFxuXHRcdHZhciBpc1N5c3RlbVRoZW1lID0gJHtlbmFibGVTeXN0ZW0gPyBcImN1cnJlbnRUaGVtZSA9PT0gJ3N5c3RlbSdcIiA6ICdmYWxzZSd9O1xuXHRcdHZhciByZXNvbHZlZFRoZW1lID0gJHtmb3JjZWRUaGVtZSA/IGAnJHtlc2NhcGVKc1N0cmluZyhmb3JjZWRUaGVtZSl9J2AgOiBgaXNTeXN0ZW1UaGVtZSA/IHN5c3RlbVRoZW1lIDogY3VycmVudFRoZW1lYH07XHRcdFx0XHRcblx0XHR2YXIgY29sb3JTY2hlbWVNb2RlID0geVtyZXNvbHZlZFRoZW1lXSB8fCAocmVzb2x2ZWRUaGVtZSA9PT0gJ2xpZ2h0JyB8fCByZXNvbHZlZFRoZW1lID09PSAnZGFyaycgPyByZXNvbHZlZFRoZW1lIDogJ25vcm1hbCcpO1xuXHRcdHZhciB2YWwgPSB4W3Jlc29sdmVkVGhlbWVdIHx8IHJlc29sdmVkVGhlbWU7XG5cdFx0JHtlbmFibGVDb2xvclNjaGVtZSA/IGBkLnN0eWxlLnNldFByb3BlcnR5KCdjb2xvci1zY2hlbWUnLCBjb2xvclNjaGVtZU1vZGUpO2AgOiAnJ31cblx0XHQke2F0dHJpYnV0ZSA9PT0gJ2NsYXNzJyA/IGBkLmNsYXNzTGlzdC5yZW1vdmUoJHthdHRycy5tYXAoKHQpID0+IGAnJHtlc2NhcGVKc1N0cmluZyh0KX0nYCkuam9pbignLCcpfSlgIDogJyd9O1xuXHRcdCR7YXR0cmlidXRlID09PSAnY2xhc3MnID8gYGQuY2xhc3NMaXN0LmFkZCh2YWwpO2AgOiBgZC5zZXRBdHRyaWJ1dGUoJyR7ZXNjYXBlSnNTdHJpbmcoYXR0cmlidXRlKX0nLCB2YWwpO2B9O1xuXHRcdH07c3ZlbHRlVGhlbWUoKTtcblx0XHQ8LyR7J3NjcmlwdCd9PmA7XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuXHR7QGh0bWwgdGhlbWVTY3JpcHR9XG48L3N2ZWx0ZTpoZWFkPlxue0ByZW5kZXIgY2hpbGRyZW4/Lih0aGVtZSl9XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDNdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBYSxlQUFlLENBQUMsU0FBUyxNQUFNO0FBQzVDLElBQWEsUUFBUTs7O0FDRHJCLElBQU0scUJBQXFCO0FBQzNCLElBQWEseUJBQXlCO0NBQ2xDLE1BQU0sTUFBTSxTQUFTLGNBQWMsT0FBTztDQUMxQyxJQUFJLFlBQVksU0FBUyxlQUFlLDBKQUEwSixDQUFDO0NBQ25NLFNBQVMsS0FBSyxZQUFZLEdBQUc7Q0FDN0IsYUFBYTtFQUVULE9BQU8sT0FBTyxpQkFBaUIsU0FBUyxJQUFJLEVBQUEsQ0FBRztFQUUvQyxpQkFBaUI7R0FDYixTQUFTLEtBQUssWUFBWSxHQUFHO0VBQ2pDLEdBQUcsa0JBQWtCO0NBQ3pCO0FBQ0o7QUFDQSxJQUFhLHlCQUF5QixTQUFTLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FDOUQsUUFBUSxNQUFNLFNBQVMsQ0FBQyxDQUN4QixRQUFRLE1BQU0sU0FBUyxDQUFDLENBQ3hCLFFBQVEsUUFBUSxPQUFPLENBQUMsQ0FDeEIsUUFBUSxXQUFXLFNBQVMsQ0FBQyxDQUM3QixRQUFRLFdBQVcsU0FBUztBQUNqQyxJQUFhLGtCQUFrQixNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQ3pDLFFBQVEsT0FBTyxNQUFNLENBQUMsQ0FDdEIsUUFBUSxN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