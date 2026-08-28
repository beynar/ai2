<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setI18n, setI18nDirection } from './context.svelte.js';
	import { locales, type LocaleCode } from './locales.js';
	import type { Messages } from './en.js';

	let {
		locale = $bindable('en'),
		messages,
		dir,
		manageDocument = true,
		children
	}: {
		/** Active locale, bindable so a language picker can drive it. */
		locale?: LocaleCode;
		/** Extra per-key overrides merged on top of the locale's messages. */
		messages?: Partial<Messages>;
		/** Force a text direction; defaults to the active locale's direction (rtl for Arabic). */
		dir?: 'ltr' | 'rtl';
		/** When true (default), keeps `<html dir>` and `<html lang>` in sync with the locale. */
		manageDocument?: boolean;
		/** App content; every descendant reads the active messages via `useI18n()`. */
		children?: Snippet;
	} = $props();

	// Provide the merged catalog to all descendants. The getter keeps them reactive to `locale`.
	setI18n(() => ({ ...locales[locale].messages, ...messages }));
	setI18nDirection(() => dir ?? locales[locale].dir);

	// Client-only: mirror direction + language onto the document element.
	// Restore the prior values on unmount / when manageDocument turns off, so a page-scoped
	// <I18n> (e.g. a demo) doesn't leave the whole app stuck in its locale after navigating away.
	$effect(() => {
		if (!manageDocument) return;
		const root = document.documentElement;
		const prevDir = root.dir;
		const prevLang = root.lang;
		root.dir = dir ?? locales[locale].dir;
		root.lang = locale;
		return () => {
			root.dir = prevDir;
			root.lang = prevLang;
		};
	});
</script>

{#if children}{@render children()}{/if}
