import { getContext, setContext } from 'svelte';
import { en, type Messages } from './en.js';

const I18N_KEY = 'svelaiI18n';

/**
 * A global i18n override: either a (partial) message object, or a getter returning one.
 * Use the getter form when the active locale can change at runtime so consumers stay reactive.
 */
export type I18nInput = Partial<Messages> | (() => Partial<Messages>);

/**
 * Set the app-wide message overrides, once, in the layout (alongside the theme).
 * Pass a whole locale object to switch language, or a partial to tweak individual strings.
 * Pass a getter (`() => currentLocale`) to switch locales reactively at runtime.
 */
export const setI18n = (messages: I18nInput) => setContext(I18N_KEY, messages);

const getI18nContext = () => getContext<I18nInput | undefined>(I18N_KEY);

/**
 * Resolve the active messages for a component. Merge order (lowest to highest priority):
 * English defaults -> global context (setI18n) -> per-instance `local` override.
 * Call inside `$derived(useI18n(i18n))` so it reacts to a runtime locale change.
 */
export const useI18n = (local?: Partial<Messages>): Messages => {
	const ctx = getI18nContext();
	const global = typeof ctx === 'function' ? ctx() : ctx;
	if (!global && !local) return en;
	return { ...en, ...global, ...local };
};
