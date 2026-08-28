import type { LanguageRegistration } from 'shiki';
import c from 'shiki/langs/c.mjs';
import cpp from 'shiki/langs/cpp.mjs';
import csharp from 'shiki/langs/csharp.mjs';
import css from 'shiki/langs/css.mjs';
import docker from 'shiki/langs/docker.mjs';
import go from 'shiki/langs/go.mjs';
import graphql from 'shiki/langs/graphql.mjs';
import html from 'shiki/langs/html.mjs';
import java from 'shiki/langs/java.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import json from 'shiki/langs/json.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import kotlin from 'shiki/langs/kotlin.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import php from 'shiki/langs/php.mjs';
import python from 'shiki/langs/python.mjs';
import ruby from 'shiki/langs/ruby.mjs';
import rust from 'shiki/langs/rust.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import sql from 'shiki/langs/sql.mjs';
import svelte from 'shiki/langs/svelte.mjs';
import swift from 'shiki/langs/swift.mjs';
import toml from 'shiki/langs/toml.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import vue from 'shiki/langs/vue.mjs';
import xml from 'shiki/langs/xml.mjs';
import yaml from 'shiki/langs/yaml.mjs';

export type CodeLanguageInfo = {
	/** Canonical grammar id used by Shiki and surfaced as the default header label. */
	id: string;
	/** Human-friendly display name shown in the header when no `title` is provided. */
	label: string;
	/** Extra ids that resolve to this grammar (e.g. `js` -> `javascript`). */
	aliases?: readonly string[];
	/** Shiki grammar registrations (a grammar may embed several sub-grammars). */
	registrations: LanguageRegistration[];
};

/**
 * Curated grammar set bundled with the Code component. Mirrors the svelte-pro
 * language set so the same snippets highlight identically across projects.
 */
export const bundledCodeLanguagesInfo = [
	{ id: 'javascript', label: 'JavaScript', aliases: ['js'], registrations: javascript },
	{ id: 'typescript', label: 'TypeScript', aliases: ['ts'], registrations: typescript },
	{ id: 'jsx', label: 'JSX', registrations: jsx },
	{ id: 'tsx', label: 'TSX', registrations: tsx },
	{ id: 'svelte', label: 'Svelte', registrations: svelte },
	{ id: 'vue', label: 'Vue', registrations: vue },
	{ id: 'html', label: 'HTML', registrations: html },
	{ id: 'css', label: 'CSS', registrations: css },
	{ id: 'json', label: 'JSON', registrations: json },
	{ id: 'markdown', label: 'Markdown', aliases: ['md'], registrations: markdown },
	{ id: 'yaml', label: 'YAML', aliases: ['yml'], registrations: yaml },
	{ id: 'toml', label: 'TOML', registrations: toml },
	{ id: 'xml', label: 'XML', registrations: xml },
	{ id: 'python', label: 'Python', aliases: ['py'], registrations: python },
	{ id: 'java', label: 'Java', registrations: java },
	{ id: 'go', label: 'Go', aliases: ['golang'], registrations: go },
	{ id: 'rust', label: 'Rust', aliases: ['rs'], registrations: rust },
	{ id: 'ruby', label: 'Ruby', aliases: ['rb'], registrations: ruby },
	{ id: 'php', label: 'PHP', registrations: php },
	{ id: 'c', label: 'C', registrations: c },
	{ id: 'cpp', label: 'C++', aliases: ['c++'], registrations: cpp },
	{ id: 'csharp', label: 'C#', aliases: ['c#', 'cs'], registrations: csharp },
	{ id: 'swift', label: 'Swift', registrations: swift },
	{ id: 'kotlin', label: 'Kotlin', aliases: ['kt', 'kts'], registrations: kotlin },
	{ id: 'sql', label: 'SQL', registrations: sql },
	{
		id: 'shellscript',
		label: 'Shell',
		aliases: ['bash', 'sh', 'shell', 'zsh'],
		registrations: shellscript
	},
	{ id: 'docker', label: 'Dockerfile', aliases: ['dockerfile'], registrations: docker },
	{ id: 'graphql', label: 'GraphQL', aliases: ['gql'], registrations: graphql }
] satisfies CodeLanguageInfo[];

/** Flat list of registrations (deduped by grammar name) passed to the highlighter. */
export const bundledCodeLanguages = collectLanguageRegistrations(bundledCodeLanguagesInfo);

/** Ids/aliases understood as plain text (no highlighting). */
const plainTextIds = ['text', 'txt', 'plain', 'plaintext'] as const;

/** Maps an id or alias to its canonical grammar id. */
const canonicalLanguageIds = createCanonicalMap(bundledCodeLanguagesInfo);

/** Maps a canonical grammar id to its display label. */
const languageLabels = new Map(bundledCodeLanguagesInfo.map((lang) => [lang.id, lang.label]));

/**
 * Normalizes a language id, resolving aliases and falling back to `'text'`
 * for anything the bundled highlighter cannot handle. SSR-safe (pure).
 */
export function resolveLanguage(language: string | undefined): string {
	const normalized = language?.trim().toLowerCase();
	if (!normalized || (plainTextIds as readonly string[]).includes(normalized)) return 'text';
	// Return the canonical grammar id — a declared alias (e.g. `golang`) that Shiki itself
	// does not register must still map to a loaded grammar (`go`), or codeToHtml throws.
	return canonicalLanguageIds.get(normalized) ?? 'text';
}

/**
 * Human-friendly label for a language id (for the header). Falls back to the
 * canonical id, then to the raw input, then to `'Text'`.
 */
export function getLanguageLabel(language: string | undefined): string {
	const normalized = language?.trim().toLowerCase();
	if (!normalized || (plainTextIds as readonly string[]).includes(normalized)) return 'Text';
	const canonical = canonicalLanguageIds.get(normalized);
	if (canonical) return languageLabels.get(canonical) ?? canonical;
	return language ?? 'Text';
}

function collectLanguageRegistrations(languages: readonly CodeLanguageInfo[]) {
	const seen = new Set<string>();
	const registrations: LanguageRegistration[] = [];
	for (const language of languages) {
		for (const registration of language.registrations) {
			if (seen.has(registration.name)) continue;
			seen.add(registration.name);
			registrations.push(registration);
		}
	}
	return registrations;
}

function createCanonicalMap(languages: readonly CodeLanguageInfo[]) {
	const map = new Map<string, string>();
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
