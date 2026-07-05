import type { HighlighterCore, ShikiTransformer } from 'shiki';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { bundledCodeLanguages, resolveLanguage } from './highlighter/code-languages.js';
import { CODE_SYNTAX_THEME_NAME, getCodeSyntaxTheme } from './code.syntax-theme.js';

/**
 * Singleton synchronous highlighter. Constructed at module load with the
 * JavaScript regex engine (`forgiving: true`), the bundled grammar set, and the
 * CSS-variable syntax theme. Fully SSR-safe: no top-level await, no browser-only
 * APIs — the same highlighter runs on the server and the client.
 */
let highlighter: HighlighterCore | undefined;

function getHighlighter(): HighlighterCore {
	highlighter ??= createHighlighterCoreSync({
		engine: createJavaScriptRegexEngine({ forgiving: true }),
		themes: [getCodeSyntaxTheme()],
		langs: bundledCodeLanguages
	});
	return highlighter;
}

export type HighlightOptions = {
	/**
	 * When true, tags `<code>` with `data-line-numbers` and each line with
	 * `data-line` so the CSS gutter (in `CodeTheme.svelte`) can render numbers.
	 */
	lineNumbers?: boolean;
	/**
	 * When true, long lines soft-wrap instead of scrolling horizontally.
	 */
	wrap?: boolean;
};

// Applied to the Shiki `<pre>`. Scrolling is owned by the wrapping ScrollArea (see Code.svelte),
// so the pre itself does not scroll: when not wrapping it takes its natural (max-content) width
// so the ScrollArea sees the horizontal overflow; when wrapping it fills and soft-wraps.
// `has-[[data-line-numbers]]:px-0` lets the gutter sit flush against the edge.
const preClass = (wrap: boolean) =>
	[
		'px-4 py-3.5 outline-none has-[[data-line-numbers]]:px-0',
		wrap ? 'w-full whitespace-pre-wrap break-words' : 'w-max'
	].join(' ');

function transformers(lineNumbers: boolean, wrap: boolean): ShikiTransformer[] {
	const PRE_CLASS = preClass(wrap);
	return [
		{
			pre(node) {
				const existing = node.properties['class'];
				node.properties['class'] =
					typeof existing === 'string' && existing.length > 0
						? `${existing} ${PRE_CLASS}`
						: PRE_CLASS;
				// The ScrollArea is the focusable scroll region; drop Shiki's tabindex so the
				// pre isn't a second, dead tab stop.
				delete node.properties['tabindex'];
			},
			...(lineNumbers
				? {
						code(node) {
							node.properties['data-line-numbers'] = '';
							// Shiki separates line <span>s with literal "\n" text nodes. Once the
							// gutter makes each line `display: block`, those preserved newlines
							// would double the line spacing — drop them; the block breaks suffice.
							node.children = node.children.filter(
								(child) => !(child.type === 'text' && child.value === '\n')
							);
						},
						line(node) {
							node.properties['data-line'] = '';
						}
					}
				: {})
		}
	];
}

/**
 * Highlights `code` to a `<pre><code>…</code></pre>` HTML string using the
 * singleton highlighter. `language` is normalized/aliased via `resolveLanguage`
 * (falls back to `text`). Colors come out as `var(--code-token-*)` references,
 * so the result adapts to light/dark once `CodeTheme.svelte` is mounted.
 */
export function codeToHtml(
	code: string,
	options: { language?: string } & HighlightOptions = {}
): string {
	const { language, lineNumbers = false, wrap = false } = options;
	return getHighlighter().codeToHtml(code, {
		lang: resolveLanguage(language),
		theme: CODE_SYNTAX_THEME_NAME,
		transformers: transformers(lineNumbers, wrap)
	});
}
