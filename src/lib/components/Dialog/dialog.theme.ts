import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

export const defaultDialog = cva({
	base: 'z-[+50] fixed py-4 left-0 flex bg-surface-fg/20 right-0 top-0 bottom-0 w-window isolate h-window p-4',
	variants: {
		size: {
			small: 'max-w-screen max-h-screen',
			normal: 'max-w-screen max-h-screen',
			large: 'max-w-screen max-h-screen'
		},
		type: {
			fullScreen: 'justify-center items-center',
			drawerRight: 'justify-end',
			drawerLeft: 'justify-start',
			drawerBottom: 'justify-center items-end',
			drawerTop: 'justify-center items-start',
			modal: 'justify-center',
			alert: 'justify-center'
		}
	}
});

export const defaultDialogContent = cva({
	base: 'z-10 relative px-4 py-2 raised-xl h-fit bg-surface rounded flex flex-col z-50 overflow-auto',
	variants: {
		size: {
			small: 'max-w-md w-full',
			normal: 'max-w-xl w-full',
			large: 'max-w-3xl w-full'
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
	base: 'grid gap-1 mb-2 border-b border-surface-muted py-2',
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
	base: 'text-lg font-semibold text-contrast',
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

export type DialogTheme = typeof dialogTheme;
export type DialogThemeProps = InferComponentTheme<DialogTheme>;
export const setDialogTheme = setComponentTheme<DialogTheme>('dialog');
export const useDialogTheme = useComponentTheme('dialog', dialogTheme);
