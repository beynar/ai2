import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Theme/Theme.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Theme[$.FILENAME] = 'src/lib/components/Theme/Theme.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import BeforeHydratation from "/src/lib/components/Utils/BeforeHydratation.svelte";
import { Theme as SvelteTheme } from "/node_modules/.vite/deps/svelte-themes.js?v=1b1d2797";
import { ThemeState } from "/src/lib/components/Theme/theme.state.svelte.ts";
import { escapeForInlineScript, escapeJsString, MEDIA } from "/src/lib/components/Theme/helper.ts";
import Tooltip from "/src/lib/components/Tooltip/Tooltip.svelte";
import DialogBackdrop from "/src/lib/components/Dialog/DialogBackdrop.svelte";

var root = $.add_locations($.from_html(`<!> <!> <!> <!>`, 1), Theme[$.FILENAME], []);

function Theme($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Theme);

	let forcedTheme = $.prop($$props, 'forcedTheme', 3, undefined),
		disableTransitionOnChange = $.prop($$props, 'disableTransitionOnChange', 3, false),
		enableSystem = $.prop($$props, 'enableSystem', 3, true),
		enableColorScheme = $.prop($$props, 'enableColorScheme', 3, true),
		storageKey = $.prop($$props, 'storageKey', 3, 'theme'),
		defaultTheme = $.prop($$props, 'defaultTheme', 19, () => enableSystem() ? 'system' : 'light'),
		attribute = $.prop($$props, 'attribute', 3, 'data-theme'),
		value = $.prop($$props, 'value', 3, undefined);

	const validatedDefaultTheme = (() => {
		const defaultThemes = ['light', 'dark'];
		const currentThemes = $$props.themes && $$props.themes.length > 0 ? $$props.themes : defaultThemes;
		const finalThemes = enableSystem() && !currentThemes.includes('system') ? currentThemes.concat('system') : currentThemes;

		// If defaultTheme is not in the themes array, fall back to first theme
		return finalThemes.includes(defaultTheme()) ? defaultTheme() : finalThemes[0];
	})();

	const theme = new SvelteTheme({
		get forcedTheme() {
			return forcedTheme();
		},

		get themes() {
			const defaultThemes = ['light', 'dark'];
			const currentThemes = $$props.themes && $$props.themes.length > 0 ? $$props.themes : defaultThemes;

			if (enableSystem() && !currentThemes.includes('system')) {
				return currentThemes.concat('system');
			}

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
	});

	const sveltaiTheme = new ThemeState({}, theme);
	const attrs = !value() ? $$props.themes || [] : Object.values(value() || {});

	let themeScript = `<script>
		function svelteTheme(){		
		var d=document.documentElement;
		var x=${escapeForInlineScript(value() || {})};
		var y=${escapeForInlineScript($$props.colorScheme || {})};
		var validThemes=${escapeForInlineScript(theme.themes)};		
		var localStorageTheme; try { localStorageTheme = localStorage.getItem('${escapeJsString(storageKey())}'); } catch(e) { localStorageTheme = null; }
		var systemTheme = ${enableSystem()
		? `window.matchMedia('${MEDIA}').matches ? 'dark' : 'light'`
		: "'normal'"};
		var isValidTheme = validThemes.indexOf(localStorageTheme) !== -1;	
		var isSystemThemeButDisabled = localStorageTheme === 'system' && ${!enableSystem()};
		var currentTheme = isValidTheme ? localStorageTheme : '${escapeJsString(validatedDefaultTheme)}';
		if (isSystemThemeButDisabled) {
			currentTheme = '${escapeJsString(validatedDefaultTheme)}';
			try { localStorage.setItem('${escapeJsString(storageKey())}', currentTheme); } catch(e) {}
		}		
		var isSystemTheme = ${enableSystem() ? "currentTheme === 'system'" : 'false'};
		var resolvedTheme = ${forcedTheme()
		? `'${escapeJsString(forcedTheme())}'`
		: `isSystemTheme ? systemTheme : currentTheme`};				
		var colorSchemeMode = y[resolvedTheme] || (resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'normal');
		var val = x[resolvedTheme] || resolvedTheme;
		${enableColorScheme()
		? `d.style.setProperty('color-scheme', colorSchemeMode);`
		: ''}
		${$.strict_equals(attribute(), 'class')
		? `d.classList.remove(${attrs.map((t) => `'${escapeJsString(t)}'`).join(',')})`
		: ''};
		${$.strict_equals(attribute(), 'class')
		? `d.classList.add(val);`
		: `d.setAttribute('${escapeJsString(attribute())}', val);`};
		};svelteTheme();
		</${'script'}>`;

	var $$exports = { ...$.legacy_api() };
	var fragment_1 = root();

	/* js */
	$.head('171kh83', ($$anchor) => {
		var fragment = $.comment();
		var node = $.first_child(fragment);

		$.html(node, () => themeScript);
		$.append($$anchor, fragment);
	});

	var node_1 = $.first_child(fragment_1);

	$.add_svelte_meta(
		() => BeforeHydratation(node_1, {
			scripts: [
				`
const setWindowDimensions = () => {
		const setWindowHeight = () => {		
			document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');
		};
		const setWindowWidth = () => {
			document.documentElement.style.setProperty('--window-width', window.innerWidth + 'px');
		};
		window.addEventListener('resize', setWindowHeight);
		window.addEventListener('resize', setWindowWidth);
		setWindowHeight();
		setWindowWidth();
	};
	setWindowDimensions();
`
			],
			css: []
		}),
		'component',
		Theme,
		108,
		0,
		{ componentTag: 'BeforeHydratation' }
	);

	var node_2 = $.sibling(node_1, 2);

	$.add_svelte_meta(() => $.snippet(node_2, () => $$props.children, () => sveltaiTheme), 'render', Theme, 133, 0);

	var node_3 = $.sibling(node_2, 2);

	$.add_svelte_meta(() => DialogBackdrop(node_3, {}), 'component', Theme, 135, 0, { componentTag: 'DialogBackdrop' });

	var node_4 = $.sibling(node_3, 2);

	$.add_svelte_meta(() => Tooltip(node_4, {}), 'component', Theme, 136, 0, { componentTag: 'Tooltip' });
	$.append($$anchor, fragment_1);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Theme = $.hmr(Theme);

	import.meta.hot.acceptExports(["default"],(module) => {
		Theme[$.HMR].update(module.default);
	});
}

export default Theme;
//# sourceMappingURL=data:application/json;base64,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RSxjQUFjLENBQUMscUJBQXFCO2lDQUN4QixjQUFjLENBQUMsVUFBVTs7d0JBRWxDLFlBQVksS0FBRywyQkFBMkIsR0FBRyxPQUFPO3dCQUNwRCxXQUFXO1FBQU8sY0FBYyxDQUFDLFdBQVc7Ozs7SUFHaEUsaUJBQWlCOztJQUE2RCxFQUFFO29CQUNoRixTQUFTLElBQUssT0FBTzswQkFBeUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsY0FBYyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRztJQUFPLEVBQUU7b0JBQzFHLFNBQVMsSUFBSyxPQUFPOzt1QkFBZ0QsY0FBYyxDQUFDLFNBQVM7O01BRTNGLFFBQVE7Ozs7OztDQXdCYixNQUFXOzs7O3FCQUNKLFdBQVc7Ozs7Ozs7UUF0QmxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5RUF5QmlCLFlBQVk7Ozs7eUJBRTdCLGNBQWM7Ozs7eUJBQ2QsT0FBTzs7OztBQTlCQSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVGhlbWUuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCIgZ2VuZXJpY3M9XCJjb25zdCBUIGV4dGVuZHMgc3RyaW5nW11cIj5cblx0aW1wb3J0IHR5cGUgeyBTbmlwcGV0IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IEJlZm9yZUh5ZHJhdGF0aW9uIGZyb20gJy4uL1V0aWxzL0JlZm9yZUh5ZHJhdGF0aW9uLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHR5cGUgU3ZlbHRlVGhlbWVQcm9wcywgVGhlbWUgYXMgU3ZlbHRlVGhlbWUgfSBmcm9tICdzdmVsdGUtdGhlbWVzJztcblx0aW1wb3J0IHsgVGhlbWVTdGF0ZSB9IGZyb20gJy4vdGhlbWUuc3RhdGUuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgZXNjYXBlRm9ySW5saW5lU2NyaXB0LCBlc2NhcGVKc1N0cmluZywgTUVESUEgfSBmcm9tICcuL2hlbHBlci5qcyc7XG5cdGltcG9ydCBUb29sdGlwIGZyb20gJy4uL1Rvb2x0aXAvVG9vbHRpcC5zdmVsdGUnO1xuXHRpbXBvcnQgRGlhbG9nQmFja2Ryb3AgZnJvbSAnLi4vRGlhbG9nL0RpYWxvZ0JhY2tkcm9wLnN2ZWx0ZSc7XG5cblx0dHlwZSBTdmVsYWlUaGVtZVByb3BzID0gU3ZlbHRlVGhlbWVQcm9wczxUPiAmIHtcblx0XHRjaGlsZHJlbjogU25pcHBldDxbVGhlbWVTdGF0ZV0+O1xuXHR9O1xuXHRsZXQge1xuXHRcdGNoaWxkcmVuLFxuXHRcdGZvcmNlZFRoZW1lID0gdW5kZWZpbmVkLFxuXHRcdGRpc2FibGVUcmFuc2l0aW9uT25DaGFuZ2UgPSBmYWxzZSxcblx0XHRlbmFibGVTeXN0ZW0gPSB0cnVlLFxuXHRcdGVuYWJsZUNvbG9yU2NoZW1lID0gdHJ1ZSxcblx0XHRzdG9yYWdlS2V5ID0gJ3RoZW1lJyxcblx0XHR0aGVtZXMsXG5cdFx0ZGVmYXVsdFRoZW1lID0gZW5hYmxlU3lzdGVtID8gJ3N5c3RlbScgOiAnbGlnaHQnLFxuXHRcdGF0dHJpYnV0ZSA9ICdkYXRhLXRoZW1lJyxcblx0XHR2YWx1ZSA9IHVuZGVmaW5lZCxcblx0XHRjb2xvclNjaGVtZVxuXHR9OiBTdmVsYWlUaGVtZVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgdmFsaWRhdGVkRGVmYXVsdFRoZW1lID0gKCgpID0+IHtcblx0XHRjb25zdCBkZWZhdWx0VGhlbWVzID0gWydsaWdodCcsICdkYXJrJ107XG5cdFx0Y29uc3QgY3VycmVudFRoZW1lcyA9ICh0aGVtZXMgJiYgdGhlbWVzLmxlbmd0aCA+IDAgPyB0aGVtZXMgOiBkZWZhdWx0VGhlbWVzKSBhcyBzdHJpbmdbXTtcblx0XHRjb25zdCBmaW5hbFRoZW1lcyA9XG5cdFx0XHRlbmFibGVTeXN0ZW0gJiYgIWN1cnJlbnRUaGVtZXMuaW5jbHVkZXMoJ3N5c3RlbScpXG5cdFx0XHRcdD8gY3VycmVudFRoZW1lcy5jb25jYXQoJ3N5c3RlbScpXG5cdFx0XHRcdDogY3VycmVudFRoZW1lcztcblxuXHRcdC8vIElmIGRlZmF1bHRUaGVtZSBpcyBub3QgaW4gdGhlIHRoZW1lcyBhcnJheSwgZmFsbCBiYWNrIHRvIGZpcnN0IHRoZW1lXG5cdFx0cmV0dXJuIGZpbmFsVGhlbWVzLmluY2x1ZGVzKGRlZmF1bHRUaGVtZSkgPyBkZWZhdWx0VGhlbWUgOiBmaW5hbFRoZW1lc1swXTtcblx0fSkoKTtcblx0Y29uc3QgdGhlbWUgPSBuZXcgU3ZlbHRlVGhlbWUoe1xuXHRcdGdldCBmb3JjZWRUaGVtZSgpIHtcblx0XHRcdHJldHVybiBmb3JjZWRUaGVtZTtcblx0XHR9LFxuXHRcdGdldCB0aGVtZXMoKSB7XG5cdFx0XHRjb25zdCBkZWZhdWx0VGhlbWVzID0gWydsaWdodCcsICdkYXJrJ107XG5cdFx0XHRjb25zdCBjdXJyZW50VGhlbWVzID0gKHRoZW1lcyAmJiB0aGVtZXMubGVuZ3RoID4gMCA/IHRoZW1lcyA6IGRlZmF1bHRUaGVtZXMpIGFzIHN0cmluZ1tdO1xuXHRcdFx0aWYgKGVuYWJsZVN5c3RlbSAmJiAhY3VycmVudFRoZW1lcy5pbmNsdWRlcygnc3lzdGVtJykpIHtcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRUaGVtZXMuY29uY2F0KCdzeXN0ZW0nKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjdXJyZW50VGhlbWVzO1xuXHRcdH0sXG5cdFx0Z2V0IGVuYWJsZVN5c3RlbSgpIHtcblx0XHRcdHJldHVybiBlbmFibGVTeXN0ZW07XG5cdFx0fSxcblxuXHRcdGdldCBlbmFibGVDb2xvclNjaGVtZSgpIHtcblx0XHRcdHJldHVybiBlbmFibGVDb2xvclNjaGVtZTtcblx0XHR9LFxuXHRcdGdldCBjb2xvclNjaGVtZSgpIHtcblx0XHRcdHJldHVybiBjb2xvclNjaGVtZTtcblx0XHR9LFxuXG5cdFx0Z2V0IGRlZmF1bHRUaGVtZSgpIHtcblx0XHRcdHJldHVybiB2YWxpZGF0ZWREZWZhdWx0VGhlbWU7XG5cdFx0fSxcblx0XHRnZXQgYXR0cmlidXRlKCkge1xuXHRcdFx0cmV0dXJuIGF0dHJpYnV0ZTtcblx0XHR9LFxuXHRcdGdldCB2YWx1ZSgpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9LFxuXHRcdGdldCBzdG9yYWdlS2V5KCkge1xuXHRcdFx0cmV0dXJuIHN0b3JhZ2VLZXk7XG5cdFx0fSxcblx0XHRnZXQgZGlzYWJsZVRyYW5zaXRpb25PbkNoYW5nZSgpIHtcblx0XHRcdHJldHVybiBkaXNhYmxlVHJhbnNpdGlvbk9uQ2hhbmdlO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3Qgc3ZlbHRhaVRoZW1lID0gbmV3IFRoZW1lU3RhdGUoe30sIHRoZW1lKTtcblxuXHRjb25zdCBhdHRycyA9ICF2YWx1ZSA/ICgodGhlbWVzIHx8IFtdKSBhcyBzdHJpbmdbXSkgOiAoT2JqZWN0LnZhbHVlcyh2YWx1ZSB8fCB7fSkgYXMgc3RyaW5nW10pO1xuXG5cdGxldCB0aGVtZVNjcmlwdCA9IGA8c2NyaXB0PlxuXHRcdGZ1bmN0aW9uIHN2ZWx0ZVRoZW1lKCl7XHRcdFxuXHRcdHZhciBkPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHR2YXIgeD0ke2VzY2FwZUZvcklubGluZVNjcmlwdCh2YWx1ZSB8fCB7fSl9O1xuXHRcdHZhciB5PSR7ZXNjYXBlRm9ySW5saW5lU2NyaXB0KGNvbG9yU2NoZW1lIHx8IHt9KX07XG5cdFx0dmFyIHZhbGlkVGhlbWVzPSR7ZXNjYXBlRm9ySW5saW5lU2NyaXB0KHRoZW1lLnRoZW1lcyl9O1x0XHRcblx0XHR2YXIgbG9jYWxTdG9yYWdlVGhlbWU7IHRyeSB7IGxvY2FsU3RvcmFnZVRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJyR7ZXNjYXBlSnNTdHJpbmcoc3RvcmFnZUtleSl9Jyk7IH0gY2F0Y2goZSkgeyBsb2NhbFN0b3JhZ2VUaGVtZSA9IG51bGw7IH1cblx0XHR2YXIgc3lzdGVtVGhlbWUgPSAke2VuYWJsZVN5c3RlbSA/IGB3aW5kb3cubWF0Y2hNZWRpYSgnJHtNRURJQX0nKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0J2AgOiBcIidub3JtYWwnXCJ9O1xuXHRcdHZhciBpc1ZhbGlkVGhlbWUgPSB2YWxpZFRoZW1lcy5pbmRleE9mKGxvY2FsU3RvcmFnZVRoZW1lKSAhPT0gLTE7XHRcblx0XHR2YXIgaXNTeXN0ZW1UaGVtZUJ1dERpc2FibGVkID0gbG9jYWxTdG9yYWdlVGhlbWUgPT09ICdzeXN0ZW0nICYmICR7IWVuYWJsZVN5c3RlbX07XG5cdFx0dmFyIGN1cnJlbnRUaGVtZSA9IGlzVmFsaWRUaGVtZSA/IGxvY2FsU3RvcmFnZVRoZW1lIDogJyR7ZXNjYXBlSnNTdHJpbmcodmFsaWRhdGVkRGVmYXVsdFRoZW1lKX0nO1xuXHRcdGlmIChpc1N5c3RlbVRoZW1lQnV0RGlzYWJsZWQpIHtcblx0XHRcdGN1cnJlbnRUaGVtZSA9ICcke2VzY2FwZUpzU3RyaW5nKHZhbGlkYXRlZERlZmF1bHRUaGVtZSl9Jztcblx0XHRcdHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCcke2VzY2FwZUpzU3RyaW5nKHN0b3JhZ2VLZXkpfScsIGN1cnJlbnRUaGVtZSk7IH0gY2F0Y2goZSkge31cblx0XHR9XHRcdFxuXHRcdHZhciBpc1N5c3RlbVRoZW1lID0gJHtlbmFibGVTeXN0ZW0gPyBcImN1cnJlbnRUaGVtZSA9PT0gJ3N5c3RlbSdcIiA6ICdmYWxzZSd9O1xuXHRcdHZhciByZXNvbHZlZFRoZW1lID0gJHtmb3JjZWRUaGVtZSA/IGAnJHtlc2NhcGVKc1N0cmluZyhmb3JjZWRUaGVtZSl9J2AgOiBgaXNTeXN0ZW1UaGVtZSA/IHN5c3RlbVRoZW1lIDogY3VycmVudFRoZW1lYH07XHRcdFx0XHRcblx0XHR2YXIgY29sb3JTY2hlbWVNb2RlID0geVtyZXNvbHZlZFRoZW1lXSB8fCAocmVzb2x2ZWRUaGVtZSA9PT0gJ2xpZ2h0JyB8fCByZXNvbHZlZFRoZW1lID09PSAnZGFyaycgPyByZXNvbHZlZFRoZW1lIDogJ25vcm1hbCcpO1xuXHRcdHZhciB2YWwgPSB4W3Jlc29sdmVkVGhlbWVdIHx8IHJlc29sdmVkVGhlbWU7XG5cdFx0JHtlbmFibGVDb2xvclNjaGVtZSA/IGBkLnN0eWxlLnNldFByb3BlcnR5KCdjb2xvci1zY2hlbWUnLCBjb2xvclNjaGVtZU1vZGUpO2AgOiAnJ31cblx0XHQke2F0dHJpYnV0ZSA9PT0gJ2NsYXNzJyA/IGBkLmNsYXNzTGlzdC5yZW1vdmUoJHthdHRycy5tYXAoKHQpID0+IGAnJHtlc2NhcGVKc1N0cmluZyh0KX0nYCkuam9pbignLCcpfSlgIDogJyd9O1xuXHRcdCR7YXR0cmlidXRlID09PSAnY2xhc3MnID8gYGQuY2xhc3NMaXN0LmFkZCh2YWwpO2AgOiBgZC5zZXRBdHRyaWJ1dGUoJyR7ZXNjYXBlSnNTdHJpbmcoYXR0cmlidXRlKX0nLCB2YWwpO2B9O1xuXHRcdH07c3ZlbHRlVGhlbWUoKTtcblx0XHQ8LyR7J3NjcmlwdCd9PmA7XG48L3NjcmlwdD5cblxuPEJlZm9yZUh5ZHJhdGF0aW9uXG5cdHNjcmlwdHM9e1tcblx0XHQvKiBqcyAqLyBgXG5jb25zdCBzZXRXaW5kb3dEaW1lbnNpb25zID0gKCkgPT4ge1xuXHRcdGNvbnN0IHNldFdpbmRvd0hlaWdodCA9ICgpID0+IHtcdFx0XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCArICdweCcpO1xuXHRcdH07XG5cdFx0Y29uc3Qgc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LXdpZHRoJywgd2luZG93LmlubmVyV2lkdGggKyAncHgnKTtcblx0XHR9O1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRXaW5kb3dIZWlnaHQpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRXaW5kb3dXaWR0aCk7XG5cdFx0c2V0V2luZG93SGVpZ2h0KCk7XG5cdFx0c2V0V2luZG93V2lkdGgoKTtcblx0fTtcblx0c2V0V2luZG93RGltZW5zaW9ucygpO1xuYFxuXHRdfVxuXHRjc3M9e1tdfVxuLz5cblxuPHN2ZWx0ZTpoZWFkPlxuXHR7QGh0bWwgdGhlbWVTY3JpcHR9XG48L3N2ZWx0ZTpoZWFkPlxuXG57QHJlbmRlciBjaGlsZHJlbihzdmVsdGFpVGhlbWUpfVxuXG48RGlhbG9nQmFja2Ryb3AgLz5cbjxUb29sdGlwIC8+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1RoZW1lL1RoZW1lLnN2ZWx0ZSJ9