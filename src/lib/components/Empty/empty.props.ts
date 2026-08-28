import type { Sizes } from '$lib/types/index.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { Snippet } from 'svelte';
import type { ButtonProps } from '../Button/index.js';
import type { EmptyThemeProps } from './empty.theme.js';

/** A button rendered in the `actions` row — Button props plus its label as `content`. */
export type EmptyAction = ButtonProps & { content?: string };

export type EmptyMediaVariant = 'default' | 'icon';

export type EmptyMode = 'normal' | 'card';

export type EmptyProps = WithAttachments<
	WithSlot<
		{
			/**
			 * The class name of the empty state. First element that the component outputs in the DOM.
			 */
			class?: string;
			/**
			 * Visual variant of the media slot. `default` renders the media bare, `icon` wraps it in a small muted rounded square.
			 */
			mediaVariant?: EmptyMediaVariant;
			/**
			 * Presentation mode. `normal` is a transparent placeholder (default); `card` renders it on a raised surface.
			 */
			mode?: EmptyMode;
			/**
			 * When true, wraps the empty state in a dashed border.
			 */
			bordered?: boolean;
			/**
			 * Size token scaling paddings, gaps, media, and typography.
			 */
			size?: Sizes;
			/**
			 * Buttons rendered as a centered row below the description. Each entry is Button props plus
			 * `content` for the label. A convenience alternative to the `content` slot.
			 */
			actions?: EmptyAction[];
			/**
			 * Custom content replacing the default media/title/description/content composition when set.
			 */
			children?: Snippet;
			/**
			 * Theme overrides for the empty root and its sub-parts (header, media, title, description, content).
			 */
			theme?: EmptyThemeProps;
		},
		'media' | 'title' | 'description' | 'content' | 'note' | 'footer'
	>
>;
