import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultAvatar = cva({
	base: 'relative items-center border border-surface-muted text-contrast aspect-ratio-1 rounded-full',
	variants: {
		size: {
			normal: 'size-8',
			small: 'size-6',
			large: 'size-10'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarImage = cva({
	base: 'rounded-full absolute top-0 left-0 z-0 object-cover w-full max-w-full h-full max-h-full',
	variants: {
		size: {
			normal: '',
			small: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarPrefix = cva({
	base: 'absolute bottom-[-0.25rem] rounded-full border border-surface-muted p-[0.25rem] bg-surface size-4 left-[-0.25rem] aspect-square',
	variants: {
		size: {
			normal: 'size-4 right-[-0.3rem] bottom-[-0.2rem]',
			small: 'size-5 right-[-0.25rem] bottom-[-0.25rem]',
			large: 'size-5 left-[-0.4rem] bottom-[-0.4rem]'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarSuffix = cva({
	base: 'absolute  rounded-full border border-surface-muted p-[0.25rem] bg-surface aspect-square',
	variants: {
		size: {
			normal: 'size-4 right-[-0.3rem] bottom-[-0.3rem]',
			small: 'size-3.5 left-[-0.25rem] bottom-[-0.25rem]',
			large: 'size-3.5 right-[-0.4rem] bottom-[-0.4rem]'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarInitials = cva({
	base: 'absolute bg-surface-lighter bottom-0 w-full h-full text-center left-0 rounded-full flex items-center justify-center uppercase font-bold text-sm',
	variants: {
		size: {
			normal: 'text-sm',
			small: 'text-xs',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarGroup = cva({
	base: 'flex gap-[-0.25rem] items-center isolate ml-[0.3rem]',
	variants: {
		size: {
			normal: '[&>[data-avatar]]:ml-[-0.45rem]',
			small: '[&>[data-avatar]]:ml-[-0.4rem]',
			large: '[&>[data-avatar]]:ml-[-0.5rem]'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAvatarGroupCount = cva({
	base: 'bg-surface-lighter border-surface-muted text-contrast text-center rounded-full flex items-center justify-center uppercase font-bold  ml-[-0.75rem] z-[+1]',
	variants: {
		size: {
			normal: 'size-8 text-sm',
			small: 'size-6 text-xs',
			large: 'size-10 text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const avatarTheme = {
	avatar: defaultAvatar,
	avatarImage: defaultAvatarImage,
	avatarPrefix: defaultAvatarPrefix,
	avatarSuffix: defaultAvatarSuffix,
	avatarInitials: defaultAvatarInitials
};

export const avatarGroupTheme = {
	avatarGroup: defaultAvatarGroup,
	avatarGroupCount: defaultAvatarGroupCount
};

export type AvatarTheme = typeof avatarTheme;
export type AvatarThemeProps = InferComponentTheme<AvatarTheme>;
export const setAvatarTheme = setComponentTheme<AvatarTheme>('avatar');
export const useAvatarTheme = useComponentTheme('avatar', avatarTheme);

export type AvatarGroupTheme = typeof avatarGroupTheme;
export type AvatarGroupThemeProps = InferComponentTheme<AvatarGroupTheme>;
export const setAvatarGroupTheme = setComponentTheme<AvatarGroupTheme>('avatarGroup');
export const useAvatarGroupTheme = useComponentTheme('avatarGroup', avatarGroupTheme);

