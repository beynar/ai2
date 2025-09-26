<script lang="ts" generics="const T extends string[]">
	import type { Snippet } from 'svelte';
	import BeforeHydratation from '../Utils/BeforeHydratation.svelte';
	import { type SvelteThemeProps, Theme as SvelteTheme } from 'svelte-themes';
	import { ThemeState } from './theme.state.svelte.js';
	import { escapeForInlineScript, escapeJsString, MEDIA } from './helper.js';
	import Tooltip from '../Tooltip/Tooltip.svelte';

	type SvelaiThemeProps = SvelteThemeProps<T> & {
		children: Snippet<[ThemeState]>;
	};
	let {
		children,
		forcedTheme = undefined,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = 'theme',
		themes,
		defaultTheme = enableSystem ? 'system' : 'light',
		attribute = 'data-theme',
		value = undefined,
		colorScheme
	}: SvelaiThemeProps = $props();

	const validatedDefaultTheme = (() => {
		const defaultThemes = ['light', 'dark'];
		const currentThemes = (themes && themes.length > 0 ? themes : defaultThemes) as string[];
		const finalThemes =
			enableSystem && !currentThemes.includes('system')
				? currentThemes.concat('system')
				: currentThemes;

		// If defaultTheme is not in the themes array, fall back to first theme
		return finalThemes.includes(defaultTheme) ? defaultTheme : finalThemes[0];
	})();
	const theme = new SvelteTheme({
		get forcedTheme() {
			return forcedTheme;
		},
		get themes() {
			const defaultThemes = ['light', 'dark'];
			const currentThemes = (themes && themes.length > 0 ? themes : defaultThemes) as string[];
			if (enableSystem && !currentThemes.includes('system')) {
				return currentThemes.concat('system');
			}
			return currentThemes;
		},
		get enableSystem() {
			return enableSystem;
		},

		get enableColorScheme() {
			return enableColorScheme;
		},
		get colorScheme() {
			return colorScheme;
		},

		get defaultTheme() {
			return validatedDefaultTheme;
		},
		get attribute() {
			return attribute;
		},
		get value() {
			return value;
		},
		get storageKey() {
			return storageKey;
		},
		get disableTransitionOnChange() {
			return disableTransitionOnChange;
		}
	});

	const sveltaiTheme = new ThemeState({}, theme);

	const attrs = !value ? ((themes || []) as string[]) : (Object.values(value || {}) as string[]);

	let themeScript = `<script>
		function svelteTheme(){		
		var d=document.documentElement;
		var x=${escapeForInlineScript(value || {})};
		var y=${escapeForInlineScript(colorScheme || {})};
		var validThemes=${escapeForInlineScript(theme.themes)};		
		var localStorageTheme; try { localStorageTheme = localStorage.getItem('${escapeJsString(storageKey)}'); } catch(e) { localStorageTheme = null; }
		var systemTheme = ${enableSystem ? `window.matchMedia('${MEDIA}').matches ? 'dark' : 'light'` : "'normal'"};
		var isValidTheme = validThemes.indexOf(localStorageTheme) !== -1;	
		var isSystemThemeButDisabled = localStorageTheme === 'system' && ${!enableSystem};
		var currentTheme = isValidTheme ? localStorageTheme : '${escapeJsString(validatedDefaultTheme)}';
		if (isSystemThemeButDisabled) {
			currentTheme = '${escapeJsString(validatedDefaultTheme)}';
			try { localStorage.setItem('${escapeJsString(storageKey)}', currentTheme); } catch(e) {}
		}		
		var isSystemTheme = ${enableSystem ? "currentTheme === 'system'" : 'false'};
		var resolvedTheme = ${forcedTheme ? `'${escapeJsString(forcedTheme)}'` : `isSystemTheme ? systemTheme : currentTheme`};				
		var colorSchemeMode = y[resolvedTheme] || (resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'normal');
		var val = x[resolvedTheme] || resolvedTheme;
		${enableColorScheme ? `d.style.setProperty('color-scheme', colorSchemeMode);` : ''}
		${attribute === 'class' ? `d.classList.remove(${attrs.map((t) => `'${escapeJsString(t)}'`).join(',')})` : ''};
		${attribute === 'class' ? `d.classList.add(val);` : `d.setAttribute('${escapeJsString(attribute)}', val);`};
		};svelteTheme();
		</${'script'}>`;
</script>

<BeforeHydratation
	scripts={[
		/* js */ `
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
	]}
	css={[]}
/>

<svelte:head>
	{@html themeScript}
</svelte:head>

{@render children(sveltaiTheme)}

<Tooltip />
