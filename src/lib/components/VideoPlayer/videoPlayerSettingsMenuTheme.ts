import type { MenuOptionThemeProps } from '../MenuOption/menuOption.theme.js';
import type { SeparatorThemeProps } from '../Separator/separator.theme.js';

export const videoPlayerSettingsMenuOptionTheme = {
	root: {
		base: 'text-white/85 highlight:bg-white/10 highlight:text-white',
		active: {
			true: 'bg-white/10 text-white'
		},
		disabled: {
			true: 'text-white/35 opacity-100 pointer-events-none'
		}
	},
	prefix: {
		base: 'text-white/65'
	},
	suffix: {
		base: 'text-white/65'
	}
} satisfies MenuOptionThemeProps;

export const videoPlayerSettingsMenuSeparatorTheme = {
	root: {
		base: 'my-1 before:!border-white/[0.08] after:!border-white/[0.08]'
	}
} satisfies SeparatorThemeProps;
