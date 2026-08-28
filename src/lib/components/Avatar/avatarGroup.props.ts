import type { Snippet } from 'svelte';
import type { WithAttachments, WithoutAttachments } from '$lib/types/props.js';
import type { AvatarThemeProps } from './avatar.theme.js';
import type { AvatarGroupThemeProps } from './avatarGroup.theme.js';
import type { AvatarProps } from './avatar.props.js';

type AvatarUser<I extends object> = Pick<AvatarProps<I>, 'user'>['user'];

export type AvatarGroupProps<I extends object> = WithoutAttachments<
	Omit<AvatarProps<I>, 'user' | 'class' | 'theme'>
> &
	WithAttachments<{
		/**
		 * The class name of the avatar group. First element that the component outputs in the DOM.
		 */
		class?: string;
		/**
		 * Maximum number of avatars to display before showing a remaining count.
		 * By default, all items are displayed.
		 */
		max?: number;
		/** Custom snippet to render each avatar instead of the default Avatar component. */
		avatar?: Snippet<
			[{ user: AvatarUser<I>; index: number; avatarProps: Omit<AvatarProps<I>, 'user'> }]
		>;
		/** Custom snippet to render the overflow count when items exceed max. */
		remainingCount?: Snippet<[{ items: AvatarUser<I>[]; remaining: number }]>;
		/** Items displayed in the group. */
		items: AvatarUser<I>[];
		/** Theme overrides for both the group and its default avatars. */
		theme?: AvatarGroupThemeProps & AvatarThemeProps;
	}>;
