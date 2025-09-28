import {
	type BundledLanguage,
	type BundledTheme,
	type HighlighterGeneric,
	type LanguageRegistration,
	type ThemeRegistration,
	type ThemedToken,
	bundledLanguages
} from 'shiki';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import { useTheme } from '../Theme/theme.state.svelte.js';
import { createHighlighterCoreSync } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { MaybeArray } from 'shiki/types';

export type AnyLanguage = MaybeArray<LanguageRegistration>;
export type AnyTheme = ThemeRegistration;

export type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

export class HighlighterManager {
	highlighter = createHighlighterCoreSync({
		themes: [],
		langs: [],
		engine: createJavaScriptRegexEngine({ forgiving: true })
	});

	private async loadTheme(theme: AnyTheme): Promise<void> {}

	private async loadLanguage(language: AnyLanguage): Promise<void> {}

	getLanguageName = (language?: AnyLanguage): string => {
		if (!language) {
			return 'text';
		}
		if (Array.isArray(language)) {
			return language.find(({ name }) => name !== 'none')?.name ?? '';
		} else {
			return language.name;
		}
	};

	private getThemeName = (theme: AnyTheme): string => {
		return theme.name!;
	};

	load(theme: AnyTheme, language: AnyLanguage): void {
		this.highlighter.loadThemeSync(theme);
		this.highlighter.loadLanguageSync(language);
	}

	/**
	 * Highlights code synchronously. Must call isReady() first.
	 */
	highlightCode(code: string, language?: AnyLanguage, theme: AnyTheme): ThemedToken[][] {
		const themeName = this.getThemeName(theme);
		const languageName = language ? this.getLanguageName(language) : 'text';

		if (!this.highlighter.getLoadedThemes().includes(themeName)) {
			this.highlighter.loadThemeSync(theme);
		}
		if (!this.highlighter.getLoadedLanguages().includes(languageName) && language) {
			this.highlighter.loadLanguageSync(language);
		}
		try {
			const tokens = this.highlighter.codeToTokensBase(code, {
				lang: languageName,
				theme: this.getThemeName(theme)
			});
			return tokens;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	static create(preloadedThemes: BundledTheme[] = []): HighlighterManager {
		const theme = useTheme();
		if (theme && theme.highlighter) {
			const previousHighlighter = theme.highlighter as HighlighterManager;

			return previousHighlighter;
		}

		const highlighter = new HighlighterManager();
		theme.highlighter = highlighter;
		return highlighter;
	}
}
