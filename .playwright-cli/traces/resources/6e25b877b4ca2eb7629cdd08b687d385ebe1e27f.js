import c from "/node_modules/.vite/deps/shiki_langs_c__mjs.js?v=1b1d2797";
import cpp from "/node_modules/.vite/deps/shiki_langs_cpp__mjs.js?v=1b1d2797";
import csharp from "/node_modules/.vite/deps/shiki_langs_csharp__mjs.js?v=1b1d2797";
import css from "/node_modules/.vite/deps/shiki_langs_css__mjs.js?v=1b1d2797";
import docker from "/node_modules/.vite/deps/shiki_langs_docker__mjs.js?v=1b1d2797";
import go from "/node_modules/.vite/deps/shiki_langs_go__mjs.js?v=1b1d2797";
import graphql from "/node_modules/.vite/deps/shiki_langs_graphql__mjs.js?v=1b1d2797";
import html from "/node_modules/.vite/deps/shiki_langs_html__mjs.js?v=1b1d2797";
import java from "/node_modules/.vite/deps/shiki_langs_java__mjs.js?v=1b1d2797";
import javascript from "/node_modules/.vite/deps/shiki_langs_javascript__mjs.js?v=1b1d2797";
import json from "/node_modules/.vite/deps/shiki_langs_json__mjs.js?v=1b1d2797";
import jsx from "/node_modules/.vite/deps/shiki_langs_jsx__mjs.js?v=1b1d2797";
import kotlin from "/node_modules/.vite/deps/shiki_langs_kotlin__mjs.js?v=1b1d2797";
import markdown from "/node_modules/.vite/deps/shiki_langs_markdown__mjs.js?v=1b1d2797";
import php from "/node_modules/.vite/deps/shiki_langs_php__mjs.js?v=1b1d2797";
import python from "/node_modules/.vite/deps/shiki_langs_python__mjs.js?v=1b1d2797";
import ruby from "/node_modules/.vite/deps/shiki_langs_ruby__mjs.js?v=1b1d2797";
import rust from "/node_modules/.vite/deps/shiki_langs_rust__mjs.js?v=1b1d2797";
import shellscript from "/node_modules/.vite/deps/shiki_langs_shellscript__mjs.js?v=1b1d2797";
import sql from "/node_modules/.vite/deps/shiki_langs_sql__mjs.js?v=1b1d2797";
import svelte from "/node_modules/.vite/deps/shiki_langs_svelte__mjs.js?v=1b1d2797";
import swift from "/node_modules/.vite/deps/shiki_langs_swift__mjs.js?v=1b1d2797";
import toml from "/node_modules/.vite/deps/shiki_langs_toml__mjs.js?v=1b1d2797";
import tsx from "/node_modules/.vite/deps/shiki_langs_tsx__mjs.js?v=1b1d2797";
import typescript from "/node_modules/.vite/deps/shiki_langs_typescript__mjs.js?v=1b1d2797";
import vue from "/node_modules/.vite/deps/shiki_langs_vue__mjs.js?v=1b1d2797";
import xml from "/node_modules/.vite/deps/shiki_langs_xml__mjs.js?v=1b1d2797";
import yaml from "/node_modules/.vite/deps/shiki_langs_yaml__mjs.js?v=1b1d2797";
/**
* Curated grammar set bundled with the Code component. Mirrors the svelte-pro
* language set so the same snippets highlight identically across projects.
*/
export const bundledCodeLanguagesInfo = [
	{
		id: "javascript",
		label: "JavaScript",
		aliases: ["js"],
		registrations: javascript
	},
	{
		id: "typescript",
		label: "TypeScript",
		aliases: ["ts"],
		registrations: typescript
	},
	{
		id: "jsx",
		label: "JSX",
		registrations: jsx
	},
	{
		id: "tsx",
		label: "TSX",
		registrations: tsx
	},
	{
		id: "svelte",
		label: "Svelte",
		registrations: svelte
	},
	{
		id: "vue",
		label: "Vue",
		registrations: vue
	},
	{
		id: "html",
		label: "HTML",
		registrations: html
	},
	{
		id: "css",
		label: "CSS",
		registrations: css
	},
	{
		id: "json",
		label: "JSON",
		registrations: json
	},
	{
		id: "markdown",
		label: "Markdown",
		aliases: ["md"],
		registrations: markdown
	},
	{
		id: "yaml",
		label: "YAML",
		aliases: ["yml"],
		registrations: yaml
	},
	{
		id: "toml",
		label: "TOML",
		registrations: toml
	},
	{
		id: "xml",
		label: "XML",
		registrations: xml
	},
	{
		id: "python",
		label: "Python",
		aliases: ["py"],
		registrations: python
	},
	{
		id: "java",
		label: "Java",
		registrations: java
	},
	{
		id: "go",
		label: "Go",
		aliases: ["golang"],
		registrations: go
	},
	{
		id: "rust",
		label: "Rust",
		aliases: ["rs"],
		registrations: rust
	},
	{
		id: "ruby",
		label: "Ruby",
		aliases: ["rb"],
		registrations: ruby
	},
	{
		id: "php",
		label: "PHP",
		registrations: php
	},
	{
		id: "c",
		label: "C",
		registrations: c
	},
	{
		id: "cpp",
		label: "C++",
		aliases: ["c++"],
		registrations: cpp
	},
	{
		id: "csharp",
		label: "C#",
		aliases: ["c#", "cs"],
		registrations: csharp
	},
	{
		id: "swift",
		label: "Swift",
		registrations: swift
	},
	{
		id: "kotlin",
		label: "Kotlin",
		aliases: ["kt", "kts"],
		registrations: kotlin
	},
	{
		id: "sql",
		label: "SQL",
		registrations: sql
	},
	{
		id: "shellscript",
		label: "Shell",
		aliases: [
			"bash",
			"sh",
			"shell",
			"zsh"
		],
		registrations: shellscript
	},
	{
		id: "docker",
		label: "Dockerfile",
		aliases: ["dockerfile"],
		registrations: docker
	},
	{
		id: "graphql",
		label: "GraphQL",
		aliases: ["gql"],
		registrations: graphql
	}
];
/** Flat list of registrations (deduped by grammar name) passed to the highlighter. */
export const bundledCodeLanguages = collectLanguageRegistrations(bundledCodeLanguagesInfo);
/** Ids/aliases understood as plain text (no highlighting). */
const plainTextIds = [
	"text",
	"txt",
	"plain",
	"plaintext"
];
/** Maps an id or alias to its canonical grammar id. */
const canonicalLanguageIds = createCanonicalMap(bundledCodeLanguagesInfo);
/** Maps a canonical grammar id to its display label. */
const languageLabels = new Map(bundledCodeLanguagesInfo.map((lang) => [lang.id, lang.label]));
/**
* Normalizes a language id, resolving aliases and falling back to `'text'`
* for anything the bundled highlighter cannot handle. SSR-safe (pure).
*/
export function resolveLanguage(language) {
	const normalized = language?.trim().toLowerCase();
	if (!normalized || plainTextIds.includes(normalized)) return "text";
	// Return the canonical grammar id — a declared alias (e.g. `golang`) that Shiki itself
	// does not register must still map to a loaded grammar (`go`), or codeToHtml throws.
	return canonicalLanguageIds.get(normalized) ?? "text";
}
/**
* Human-friendly label for a language id (for the header). Falls back to the
* canonical id, then to the raw input, then to `'Text'`.
*/
export function getLanguageLabel(language) {
	const normalized = language?.trim().toLowerCase();
	if (!normalized || plainTextIds.includes(normalized)) return "Text";
	const canonical = canonicalLanguageIds.get(normalized);
	if (canonical) return languageLabels.get(canonical) ?? canonical;
	return language ?? "Text";
}
function collectLanguageRegistrations(languages) {
	const seen = new Set();
	const registrations = [];
	for (const language of languages) {
		for (const registration of language.registrations) {
			if (seen.has(registration.name)) continue;
			seen.add(registration.name);
			registrations.push(registration);
		}
	}
	return registrations;
}
function createCanonicalMap(languages) {
	const map = new Map();
	for (const language of languages) {
		map.set(language.id, language.id);
		for (const alias of language.aliases ?? []) map.set(alias, language.id);
		for (const registration of language.registrations) {
			if (!map.has(registration.name)) map.set(registration.name, language.id);
			for (const alias of registration.aliases ?? []) {
				if (!map.has(alias)) map.set(alias, language.id);
			}
		}
	}
	return map;
}

//# sourceMappingURL=data:application/json;base64,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LElBQUksYUFBYSxJQUFJO0dBQzFCLGNBQWMsS0FBSyxZQUFZO0VBQ2hDO0NBQ0Q7Q0FDQSxPQUFPO0FBQ1I7QUFFQSxTQUFTLG1CQUFtQixXQUF3QztDQUNuRSxNQUFNLE1BQU0sSUFBSSxJQUFvQjtDQUNwQyxLQUFLLE1BQU0sWUFBWSxXQUFXO0VBQ2pDLElBQUksSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO0VBQ2hDLEtBQUssTUFBTSxTQUFTLFNBQVMsV0FBVyxDQUFDLEdBQUcsSUFBSSxJQUFJLE9BQU8sU0FBUyxFQUFFO0VBQ3RFLEtBQUssTUFBTSxnQkFBZ0IsU0FBUyxlQUFlO0dBQ2xELElBQUksQ0FBQyxJQUFJLElBQUksYUFBYSxJQUFJLEdBQUcsSUFBSSxJQUFJLGFBQWEsTUFBTSxTQUFTLEVBQUU7R0FDdkUsS0FBSyxNQUFNLFNBQVMsYUFBYSxXQUFXLENBQUMsR0FBRztJQUMvQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksT0FBTyxTQUFTLEVBQUU7R0FDaEQ7RUFDRDtDQUNEO0NBQ0EsT0FBTztBQUNSIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImNvZGUtbGFuZ3VhZ2VzLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTGFuZ3VhZ2VSZWdpc3RyYXRpb24gfSBmcm9tICdzaGlraSc7XG5pbXBvcnQgYyBmcm9tICdzaGlraS9sYW5ncy9jLm1qcyc7XG5pbXBvcnQgY3BwIGZyb20gJ3NoaWtpL2xhbmdzL2NwcC5tanMnO1xuaW1wb3J0IGNzaGFycCBmcm9tICdzaGlraS9sYW5ncy9jc2hhcnAubWpzJztcbmltcG9ydCBjc3MgZnJvbSAnc2hpa2kvbGFuZ3MvY3NzLm1qcyc7XG5pbXBvcnQgZG9ja2VyIGZyb20gJ3NoaWtpL2xhbmdzL2RvY2tlci5tanMnO1xuaW1wb3J0IGdvIGZyb20gJ3NoaWtpL2xhbmdzL2dvLm1qcyc7XG5pbXBvcnQgZ3JhcGhxbCBmcm9tICdzaGlraS9sYW5ncy9ncmFwaHFsLm1qcyc7XG5pbXBvcnQgaHRtbCBmcm9tICdzaGlraS9sYW5ncy9odG1sLm1qcyc7XG5pbXBvcnQgamF2YSBmcm9tICdzaGlraS9sYW5ncy9qYXZhLm1qcyc7XG5pbXBvcnQgamF2YXNjcmlwdCBmcm9tICdzaGlraS9sYW5ncy9qYXZhc2NyaXB0Lm1qcyc7XG5pbXBvcnQganNvbiBmcm9tICdzaGlraS9sYW5ncy9qc29uLm1qcyc7XG5pbXBvcnQganN4IGZyb20gJ3NoaWtpL2xhbmdzL2pzeC5tanMnO1xuaW1wb3J0IGtvdGxpbiBmcm9tICdzaGlraS9sYW5ncy9rb3RsaW4ubWpzJztcbmltcG9ydCBtYXJrZG93biBmcm9tICdzaGlraS9sYW5ncy9tYXJrZG93bi5tanMnO1xuaW1wb3J0IHBocCBmcm9tICdzaGlraS9sYW5ncy9waHAubWpzJztcbmltcG9ydCBweXRob24gZnJvbSAnc2hpa2kvbGFuZ3MvcHl0aG9uLm1qcyc7XG5pbXBvcnQgcnVieSBmcm9tICdzaGlraS9sYW5ncy9ydWJ5Lm1qcyc7XG5pbXBvcnQgcnVzdCBmcm9tICdzaGlraS9sYW5ncy9ydXN0Lm1qcyc7XG5pbXBvcnQgc2hlbGxzY3JpcHQgZnJvbSAnc2hpa2kvbGFuZ3Mvc2hlbGxzY3JpcHQubWpzJztcbmltcG9ydCBzcWwgZnJvbSAnc2hpa2kvbGFuZ3Mvc3FsLm1qcyc7XG5pbXBvcnQgc3ZlbHRlIGZyb20gJ3NoaWtpL2xhbmdzL3N2ZWx0ZS5tanMnO1xuaW1wb3J0IHN3aWZ0IGZyb20gJ3NoaWtpL2xhbmdzL3N3aWZ0Lm1qcyc7XG5pbXBvcnQgdG9tbCBmcm9tICdzaGlraS9sYW5ncy90b21sLm1qcyc7XG5pbXBvcnQgdHN4IGZyb20gJ3NoaWtpL2xhbmdzL3RzeC5tanMnO1xuaW1wb3J0IHR5cGVzY3JpcHQgZnJvbSAnc2hpa2kvbGFuZ3MvdHlwZXNjcmlwdC5tanMnO1xuaW1wb3J0IHZ1ZSBmcm9tICdzaGlraS9sYW5ncy92dWUubWpzJztcbmltcG9ydCB4bWwgZnJvbSAnc2hpa2kvbGFuZ3MveG1sLm1qcyc7XG5pbXBvcnQgeWFtbCBmcm9tICdzaGlraS9sYW5ncy95YW1sLm1qcyc7XG5cbmV4cG9ydCB0eXBlIENvZGVMYW5ndWFnZUluZm8gPSB7XG5cdC8qKiBDYW5vbmljYWwgZ3JhbW1hciBpZCB1c2VkIGJ5IFNoaWtpIGFuZCBzdXJmYWNlZCBhcyB0aGUgZGVmYXVsdCBoZWFkZXIgbGFiZWwuICovXG5cdGlkOiBzdHJpbmc7XG5cdC8qKiBIdW1hbi1mcmllbmRseSBkaXNwbGF5IG5hbWUgc2hvd24gaW4gdGhlIGhlYWRlciB3aGVuIG5vIGB0aXRsZWAgaXMgcHJvdmlkZWQuICovXG5cdGxhYmVsOiBzdHJpbmc7XG5cdC8qKiBFeHRyYSBpZHMgdGhhdCByZXNvbHZlIHRvIHRoaXMgZ3JhbW1hciAoZS5nLiBganNgIC0+IGBqYXZhc2NyaXB0YCkuICovXG5cdGFsaWFzZXM/OiByZWFkb25seSBzdHJpbmdbXTtcblx0LyoqIFNoaWtpIGdyYW1tYXIgcmVnaXN0cmF0aW9ucyAoYSBncmFtbWFyIG1heSBlbWJlZCBzZXZlcmFsIHN1Yi1ncmFtbWFycykuICovXG5cdHJlZ2lzdHJhdGlvbnM6IExhbmd1YWdlUmVnaXN0cmF0aW9uW107XG59O1xuXG4vKipcbiAqIEN1cmF0ZWQgZ3JhbW1hciBzZXQgYnVuZGxlZCB3aXRoIHRoZSBDb2RlIGNvbXBvbmVudC4gTWlycm9ycyB0aGUgc3ZlbHRlLXByb1xuICogbGFuZ3VhZ2Ugc2V0IHNvIHRoZSBzYW1lIHNuaXBwZXRzIGhpZ2hsaWdodCBpZGVudGljYWxseSBhY3Jvc3MgcHJvamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBidW5kbGVkQ29kZUxhbmd1YWdlc0luZm8gPSBbXG5cdHsgaWQ6ICdqYXZhc2NyaXB0JywgbGFiZWw6ICdKYXZhU2NyaXB0JywgYWxpYXNlczogWydqcyddLCByZWdpc3RyYXRpb25zOiBqYXZhc2NyaXB0IH0sXG5cdHsgaWQ6ICd0eXBlc2NyaXB0JywgbGFiZWw6ICdUeXBlU2NyaXB0JywgYWxpYXNlczogWyd0cyddLCByZWdpc3RyYXRpb25zOiB0eXBlc2NyaXB0IH0sXG5cdHsgaWQ6ICdqc3gnLCBsYWJlbDogJ0pTWCcsIHJlZ2lzdHJhdGlvbnM6IGpzeCB9LFxuXHR7IGlkOiAndHN4JywgbGFiZWw6ICdUU1gnLCByZWdpc3RyYXRpb25zOiB0c3ggfSxcblx0eyBpZDogJ3N2ZWx0ZScsIGxhYmVsOiAnU3ZlbHRlJywgcmVnaXN0cmF0aW9uczogc3ZlbHRlIH0sXG5cdHsgaWQ6ICd2dWUnLCBsYWJlbDogJ1Z1ZScsIHJlZ2lzdHJhdGlvbnM6IHZ1ZSB9LFxuXHR7IGlkOiAnaHRtbCcsIGxhYmVsOiAnSFRNTCcsIHJlZ2lzdHJhdGlvbnM6IGh0bWwgfSxcblx0eyBpZDogJ2NzcycsIGxhYmVsOiAnQ1NTJywgcmVnaXN0cmF0aW9uczogY3NzIH0sXG5cdHsgaWQ6ICdqc29uJywgbGFiZWw6ICdKU09OJywgcmVnaXN0cmF0aW9uczoganNvbiB9LFxuXHR7IGlkOiAnbWFya2Rvd24nLCBsYWJlbDogJ01hcmtkb3duJywgYWxpYXNlczogWydtZCddLCByZWdpc3RyYXRpb25zOiBtYXJrZG93biB9LFxuXHR7IGlkOiAneWFtbCcsIGxhYmVsOiAnWUFNTCcsIGFsaWFzZXM6IFsneW1sJ10sIHJlZ2lzdHJhdGlvbnM6IHlhbWwgfSxcblx0eyBpZDogJ3RvbWwnLCBsYWJlbDogJ1RPTUwnLCByZWdpc3RyYXRpb25zOiB0b21sIH0sXG5cdHsgaWQ6ICd4bWwnLCBsYWJlbDogJ1hNTCcsIHJlZ2lzdHJhdGlvbnM6IHhtbCB9LFxuXHR7IGlkOiAncHl0aG9uJywgbGFiZWw6ICdQeXRob24nLCBhbGlhc2VzOiBbJ3B5J10sIHJlZ2lzdHJhdGlvbnM6IHB5dGhvbiB9LFxuXHR7IGlkOiAnamF2YScsIGxhYmVsOiAnSmF2YScsIHJlZ2lzdHJhdGlvbnM6IGphdmEgfSxcblx0eyBpZDogJ2dvJywgbGFiZWw6ICdHbycsIGFsaWFzZXM6IFsnZ29sYW5nJ10sIHJlZ2lzdHJhdGlvbnM6IGdvIH0sXG5cdHsgaWQ6ICdydXN0JywgbGFiZWw6ICdSdXN0JywgYWxpYXNlczogWydycyddLCByZWdpc3RyYXRpb25zOiBydXN0IH0sXG5cdHsgaWQ6ICdydWJ5JywgbGFiZWw6ICdSdWJ5JywgYWxpYXNlczogWydyYiddLCByZWdpc3RyYXRpb25zOiBydWJ5IH0sXG5cdHsgaWQ6ICdwaHAnLCBsYWJlbDogJ1BIUCcsIHJlZ2lzdHJhdGlvbnM6IHBocCB9LFxuXHR7IGlkOiAnYycsIGxhYmVsOiAnQycsIHJlZ2lzdHJhdGlvbnM6IGMgfSxcblx0eyBpZDogJ2NwcCcsIGxhYmVsOiAnQysrJywgYWxpYXNlczogWydjKysnXSwgcmVnaXN0cmF0aW9uczogY3BwIH0sXG5cdHsgaWQ6ICdjc2hhcnAnLCBsYWJlbDogJ0MjJywgYWxpYXNlczogWydjIycsICdjcyddLCByZWdpc3RyYXRpb25zOiBjc2hhcnAgfSxcblx0eyBpZDogJ3N3aWZ0JywgbGFiZWw6ICdTd2lmdCcsIHJlZ2lzdHJhdGlvbnM6IHN3aWZ0IH0sXG5cdHsgaWQ6ICdrb3RsaW4nLCBsYWJlbDogJ0tvdGxpbicsIGFsaWFzZXM6IFsna3QnLCAna3RzJ10sIHJlZ2lzdHJhdGlvbnM6IGtvdGxpbiB9LFxuXHR7IGlkOiAnc3FsJywgbGFiZWw6ICdTUUwnLCByZWdpc3RyYXRpb25zOiBzcWwgfSxcblx0e1xuXHRcdGlkOiAnc2hlbGxzY3JpcHQnLFxuXHRcdGxhYmVsOiAnU2hlbGwnLFxuXHRcdGFsaWFzZXM6IFsnYmFzaCcsICdzaCcsICdzaGVsbCcsICd6c2gnXSxcblx0XHRyZWdpc3RyYXRpb25zOiBzaGVsbHNjcmlwdFxuXHR9LFxuXHR7IGlkOiAnZG9ja2VyJywgbGFiZWw6ICdEb2NrZXJmaWxlJywgYWxpYXNlczogWydkb2NrZXJmaWxlJ10sIHJlZ2lzdHJhdGlvbnM6IGRvY2tlciB9LFxuXHR7IGlkOiAnZ3JhcGhxbCcsIGxhYmVsOiAnR3JhcGhRTCcsIGFsaWFzZXM6IFsnZ3FsJ10sIHJlZ2lzdHJhdGlvbnM6IGdyYXBocWwgfVxuXSBzYXRpc2ZpZXMgQ29kZUxhbmd1YWdlSW5mb1tdO1xuXG4vKiogRmxhdCBsaXN0IG9mIHJlZ2lzdHJhdGlvbnMgKGRlZHVwZWQgYnkgZ3JhbW1hciBuYW1lKSBwYXNzZWQgdG8gdGhlIGhpZ2hsaWdodGVyLiAqL1xuZXhwb3J0IGNvbnN0IGJ1bmRsZWRDb2RlTGFuZ3VhZ2VzID0gY29sbGVjdExhbmd1YWdlUmVnaXN0cmF0aW9ucyhidW5kbGVkQ29kZUxhbmd1YWdlc0luZm8pO1xuXG4vKiogSWRzL2FsaWFzZXMgdW5kZXJzdG9vZCBhcyBwbGFpbiB0ZXh0IChubyBoaWdobGlnaHRpbmcpLiAqL1xuY29uc3QgcGxhaW5UZXh0SWRzID0gWyd0ZXh0JywgJ3R4dCcsICdwbGFpbicsICdwbGFpbnRleHQnXSBhcyBjb25zdDtcblxuLyoqIE1hcHMgYW4gaWQgb3IgYWxpYXMgdG8gaXRzIGNhbm9uaWNhbCBncmFtbWFyIGlkLiAqL1xuY29uc3QgY2Fub25pY2FsTGFuZ3VhZ2VJZHMgPSBjcmVhdGVDYW5vbmljYWxNYXAoYnVuZGxlZENvZGVMYW5ndWFnZXNJbmZvKTtcblxuLyoqIE1hcHMgYSBjYW5vbmljYWwgZ3JhbW1hciBpZCB0byBpdHMgZGlzcGxheSBsYWJlbC4gKi9cbmNvbnN0IGxhbmd1YWdlTGFiZWxzID0gbmV3IE1hcChidW5kbGVkQ29kZUxhbmd1YWdlc0luZm8ubWFwKChsYW5nKSA9PiBbbGFuZy5pZCwgbGFuZy5sYWJlbF0pKTtcblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgbGFuZ3VhZ2UgaWQsIHJlc29sdmluZyBhbGlhc2VzIGFuZCBmYWxsaW5nIGJhY2sgdG8gYCd0ZXh0J2BcbiAqIGZvciBhbnl0aGluZyB0aGUgYnVuZGxlZCBoaWdobGlnaHRlciBjYW5ub3QgaGFuZGxlLiBTU1Itc2FmZSAocHVyZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG5cdGNvbnN0IG5vcm1hbGl6ZWQgPSBsYW5ndWFnZT8udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cdGlmICghbm9ybWFsaXplZCB8fCAocGxhaW5UZXh0SWRzIGFzIHJlYWRvbmx5IHN0cmluZ1tdKS5pbmNsdWRlcyhub3JtYWxpemVkKSkgcmV0dXJuICd0ZXh0Jztcblx0Ly8gUmV0dXJuIHRoZSBjYW5vbmljYWwgZ3JhbW1hciBpZCDigJQgYSBkZWNsYXJlZCBhbGlhcyAoZS5nLiBgZ29sYW5nYCkgdGhhdCBTaGlraSBpdHNlbGZcblx0Ly8gZG9lcyBub3QgcmVnaXN0ZXIgbXVzdCBzdGlsbCBtYXAgdG8gYSBsb2FkZWQgZ3JhbW1hciAoYGdvYCksIG9yIGNvZGVUb0h0bWwgdGhyb3dzLlxuXHRyZXR1cm4gY2Fub25pY2FsTGFuZ3VhZ2VJZHMuZ2V0KG5vcm1hbGl6ZWQpID8/ICd0ZXh0Jztcbn1cblxuLyoqXG4gKiBIdW1hbi1mcmllbmRseSBsYWJlbCBmb3IgYSBsYW5ndWFnZSBpZCAoZm9yIHRoZSBoZWFkZXIpLiBGYWxscyBiYWNrIHRvIHRoZVxuICogY2Fub25pY2FsIGlkLCB0aGVuIHRvIHRoZSByYXcgaW5wdXQsIHRoZW4gdG8gYCdUZXh0J2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYW5ndWFnZUxhYmVsKGxhbmd1YWdlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuXHRjb25zdCBub3JtYWxpemVkID0gbGFuZ3VhZ2U/LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRpZiAoIW5vcm1hbGl6ZWQgfHwgKHBsYWluVGV4dElkcyBhcyByZWFkb25seSBzdHJpbmdbXSkuaW5jbHVkZXMobm9ybWFsaXplZCkpIHJldHVybiAnVGV4dCc7XG5cdGNvbnN0IGNhbm9uaWNhbCA9IGNhbm9uaWNhbExhbmd1YWdlSWRzLmdldChub3JtYWxpemVkKTtcblx0aWYgKGNhbm9uaWNhbCkgcmV0dXJuIGxhbmd1YWdlTGFiZWxzLmdldChjYW5vbmljYWwpID8/IGNhbm9uaWNhbDtcblx0cmV0dXJuIGxhbmd1YWdlID8/ICdUZXh0Jztcbn1cblxuZnVuY3Rpb24gY29sbGVjdExhbmd1YWdlUmVnaXN0cmF0aW9ucyhsYW5ndWFnZXM6IHJlYWRvbmx5IENvZGVMYW5ndWFnZUluZm9bXSkge1xuXHRjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cdGNvbnN0IHJlZ2lzdHJhdGlvbnM6IExhbmd1YWdlUmVnaXN0cmF0aW9uW10gPSBbXTtcblx0Zm9yIChjb25zdCBsYW5ndWFnZSBvZiBsYW5ndWFnZXMpIHtcblx0XHRmb3IgKGNvbnN0IHJlZ2lzdHJhdGlvbiBvZiBsYW5ndWFnZS5yZWdpc3RyYXRpb25zKSB7XG5cdFx0XHRpZiAoc2Vlbi5oYXMocmVnaXN0cmF0aW9uLm5hbWUpKSBjb250aW51ZTtcblx0XHRcdHNlZW4uYWRkKHJlZ2lzdHJhdGlvbi5uYW1lKTtcblx0XHRcdHJlZ2lzdHJhdGlvbnMucHVzaChyZWdpc3RyYXRpb24pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVnaXN0cmF0aW9ucztcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2Fub25pY2FsTWFwKGxhbmd1YWdlczogcmVhZG9ubHkgQ29kZUxhbmd1YWdlSW5mb1tdKSB7XG5cdGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cdGZvciAoY29uc3QgbGFuZ3VhZ2Ugb2YgbGFuZ3VhZ2VzKSB7XG5cdFx0bWFwLnNldChsYW5ndWFnZS5pZCwgbGFuZ3VhZ2UuaWQpO1xuXHRcdGZvciAoY29uc3QgYWxpYXMgb2YgbGFuZ3VhZ2UuYWxpYXNlcyA/PyBbXSkgbWFwLnNldChhbGlhcywgbGFuZ3VhZ2UuaWQpO1xuXHRcdGZvciAoY29uc3QgcmVnaXN0cmF0aW9uIG9mIGxhbmd1YWdlLnJlZ2lzdHJhdGlvbnMpIHtcblx0XHRcdGlmICghbWFwLmhhcyhyZWdpc3RyYXRpb24ubmFtZSkpIG1hcC5zZXQocmVnaXN0cmF0aW9uLm5hbWUsIGxhbmd1YWdlLmlkKTtcblx0XHRcdGZvciAoY29uc3QgYWxpYXMgb2YgcmVnaXN0cmF0aW9uLmFsaWFzZXMgPz8gW10pIHtcblx0XHRcdFx0aWYgKCFtYXAuaGFzKGFsaWFzKSkgbWFwLnNldChhbGlhcywgbGFuZ3VhZ2UuaWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFwO1xufVxuIl19