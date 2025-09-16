import type { Snippet } from 'svelte';
import type { WithSlot } from '../Slot/slot.js';
import type Slot from '../Slot/Slot.svelte';
import type { DialogState } from './dialog.state.svelte.js';
import type { ResponsiveProps } from '../Theme/theme.js';
import { cva } from '$lib/utils/cva.js';
import type { ButtonProps } from '../Button/button.js';
import type { FSOProps } from '$lib/transitions/transition.js';

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
	},
	'title' | 'description' | 'footer' | 'header' | 'closeButton',
	DialogState
>;

export const defaultDialog = cva({
	base: 'z-[+50] fixed left-0 flex bg-surface-fg/20 right-0 top-0 bottom-0 w-window isolate h-window p-4',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		type: {
			fullScreen: 'justify-center items-center',
			drawerRight: 'justify-end',
			drawerLeft: 'justify-start',
			drawerBottom: 'justify-center items-end',
			drawerTop: 'justify-center items-start',
			modal: 'justify-center items-center',
			alert: 'justify-center'
		}
	}
});

export const defaultDialogContent = cva({
	base: 'z-10 relative px-4 py-2 raised-xl h-fit bg-surface rounded flex flex-col z-50 overflow-auto',
	variants: {
		size: {
			small: 'max-w-sm w-full',
			normal: 'max-w-md w-full',
			large: 'max-w-lg w-full'
		},
		type: {
			fullScreen: 'h-full w-full max-w-full',
			drawerRight: 'rounded-l-none h-full',
			drawerLeft: 'rounded-r-none h-full',
			drawerBottom: 'rounded-b-none max-w-full',
			drawerTop: 'rounded-t-none max-w-full',
			modal: '',
			alert: ''
		}
	}
});

export const defaultDialogHeader = cva({
	base: 'grid gap-1 mb-2 border-b border-surface-lighter py-2',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const defaultDialogFooter = cva({
	base: '',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const defaultDialogCloseButton = cva({
	base: 'ml-auto rounded-full absolute top-0 right-0',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const defaultDialogTitle = cva({
	base: 'text-2xl font-bold text-contrast',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const defaultDialogDescription = cva({
	base: 'text-sm text-contrast-muted',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

export const dialogTheme = {
	dialog: defaultDialog,
	content: defaultDialogContent,
	header: defaultDialogHeader,
	footer: defaultDialogFooter,
	closeButton: defaultDialogCloseButton,
	title: defaultDialogTitle,
	description: defaultDialogDescription
};
