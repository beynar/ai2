import type { WithAttachments } from '$lib/types/props.js';
import type { WithSlot } from '../Slot/slot.js';
import type { AnyLanguage, AnyTheme } from './highlighter.svelte.js';
import type { CodeThemeProps } from './code.theme.js';

export type CodeProps = WithSlot<
	WithAttachments<{
		class?: string;
		theme?: CodeThemeProps;
		language?: AnyLanguage;
		shikiTheme?: AnyTheme;
		code?: string;
	}>,
	'header' | 'footer'
>;

