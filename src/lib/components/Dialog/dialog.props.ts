import type { Snippet } from 'svelte';
import type { WithSlot } from '../Slot/slot.js';
import type Slot from '../Slot/Slot.svelte';
import type { DialogState } from './dialog.state.svelte.js';
import type { ResponsiveProps } from '../Theme/theme.js';
import type { ButtonProps } from '../Button/index.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import type { DialogThemeProps } from './dialog.theme.js';

export type DialogType =
	| 'fullScreen'
	| 'drawerRight'
	| 'drawerLeft'
	| 'drawerBottom'
	| 'drawerTop'
	| 'alert'
	| 'modal';

export type DialogProps = WithSlot<
	{
		id?: string;
		type?: ResponsiveProps<DialogType>;
		isOpen?: boolean;
		onClose?: (dialog: DialogState) => void;
		onOpen?: (dialog: DialogState) => void;
		size?: ResponsiveProps<'small' | 'normal' | 'large'>;
		transition?: ResponsiveProps<FSOProps>;
		children?: Snippet<[DialogState]>;
		trigger?: Snippet<[DialogState]> | (ButtonProps & { content?: string });
		closable?: boolean;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		class?: string;
		theme?: DialogThemeProps;
	},
	'title' | 'description' | 'footer' | 'header' | 'closeButton',
	DialogState
>;

