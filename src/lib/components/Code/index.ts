export { default as Code } from './Code.svelte';
export type { CodeProps, CodeHeaderPayload } from './code.props.js';
export {
	codeTheme,
	setCodeTheme,
	useCodeTheme,
	type CodeTheme,
	type CodeThemeProps
} from './code.theme.js';
export { codeToHtml } from './code.highlighter.js';
export {
	resolveLanguage,
	getLanguageLabel,
	bundledCodeLanguagesInfo,
	type CodeLanguageInfo
} from './highlighter/code-languages.js';
