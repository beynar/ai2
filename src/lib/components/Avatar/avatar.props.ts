import type { Snippet } from 'svelte';
import type { Sizes } from '../../types/index.js';
import type { Slot } from '../Slot/slot.js';
import type { WithAttachments, WithoutAttachments } from '$lib/types/props.js';
import type { AvatarThemeProps, AvatarGroupThemeProps } from './avatar.theme.js';

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
	/**
	 * The class name of the avatar. First element that the component outputs in the DOM.
	 */
	class?: string;
	loadingState?: LoadingState;
	/** Slot overlay positioned at the bottom-left corner of the avatar. */
	prefix?: Slot;
	/** Slot overlay positioned at the bottom-right corner of the avatar. */
	suffix?: Slot;
	/** Theme overrides for avatar, image, prefix, suffix, and initials parts. */
	theme?: AvatarThemeProps;
}>;

type AvatarUser<I extends object> = Pick<AvatarProps<I>, 'user'>['user'];

export type AvatarGroupProps<I extends object> = WithoutAttachments<Omit<AvatarProps<I>, 'user'>> &
	WithAttachments<{
		/**
		 * The class name of the avatar group. First element that the component outputs in the DOM.
		 */
		class?: string;
		/** Maximum number of avatars to display before showing a remaining count. */
		max?: number;
		/** Custom snippet to render each avatar instead of the default Avatar component. */
		avatar?: Snippet<
			[{ user: AvatarUser<I>; index: number; avatarProps: Omit<AvatarProps<I>, 'user'> }]
		>;
		/** Custom snippet to render the overflow count when items exceed max. */
		remainingCount?: Snippet<[{ items: AvatarUser<I>[]; remaining: number }]>;
		/** Items displayed in the group. */
		items: AvatarUser<I>[];
		/** Theme overrides for the group container and overflow count. */
		theme?: AvatarGroupThemeProps;
	}>;
