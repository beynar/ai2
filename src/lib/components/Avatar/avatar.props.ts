import type { Sizes } from '../../types/index.js';
import type { Slot } from '../Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AvatarThemeProps } from './avatar.theme.js';

type LoadingState = 'waiting' | 'loading' | 'errored' | 'success';

export type AvatarProps<I> = WithAttachments<{
	/**
	 * The size of the avatar.
	 * @default 'normal'
	 */
	size?: Sizes;
	/**
	 * The user object. If no avatar is provided, the initials will be shown.
	 * @example
	 * ```ts
	 * { name: 'John Doe', avatar: 'https://example.com/avatar.png' }
	 * ```
	 */
	user: { name: string; avatar?: string } & I;
	/**
	 * The delay in milliseconds before the avatar is shown.
	 * @default 0
	 */
	delay?: number;
	/**
	 * The loading state of the avatar. Can be bind to a state in order to show a loading spinner or simply react to the loading state
	 * @default 'waiting'
	 */
	loadingState?: LoadingState;
	/**
	 * The class name of the avatar. First element that the component outputs in the DOM.
	 */
	class?: string;
	/** Slot overlay positioned at the bottom-left corner of the avatar. */
	prefix?: Slot;
	/** Slot overlay positioned at the bottom-right corner of the avatar. */
	suffix?: Slot;
	/** Theme overrides for avatar, image, prefix, suffix, and initials parts. */
	theme?: AvatarThemeProps;
}>;
