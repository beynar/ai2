import { bind } from '$lib/utils/state.svelte.js';
// import { useTheme } from '$lib/utils/theme.svelte.js';
import { getContext, onMount, setContext } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import type { DialogProps, DialogType } from './dialog.js';

interface DialogOptions
	extends Pick<DialogProps, 'id' | 'type' | 'size' | 'transition' | 'onClose' | 'onOpen'> {
	isOpen: boolean;
}

const defaultTransition = {
	modal: {
		in: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		}
	},
	fullScreen: {
		in: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		}
	},
	drawerRight: {
		in: {
			x: '100%',
			y: 0,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: '100%',
			y: 0,
			scale: 0.98,
			opacity: 0
		}
	},
	drawerLeft: {
		in: {
			x: '-100%',
			y: 0,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: '-100%',
			y: 0,
			scale: 0.98,
			opacity: 0
		}
	},
	drawerBottom: {
		in: {
			x: 0,
			y: '100%',
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: '100%',
			scale: 0.98,
			opacity: 0
		}
	},
	drawerTop: {
		in: {
			x: 0,
			y: '-100%',
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: '-100%',
			scale: 0.98,
			opacity: 0
		}
	},
	alert: {
		in: {
			x: 0,
			y: -100,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: -100,
			scale: 0.98,
			opacity: 0
		}
	}
} as const;

export interface DialogState extends DialogOptions {}
export class DialogState {
	parent = getContext<DialogState | null>('dialog');
	children = $state<DialogState[]>([]);
	hasTransitioned = $state(false);
	theme = useTheme();
	element: HTMLDialogElement | null = $state(null);

	isLastOpen = $derived.by(() => {
		const openedDialogs = this.theme.dialogs.filter((d) => d.isOpen);
		const openedChildren = this.children.filter((d) => d.isOpen);
		return (
			openedDialogs.length === 1 &&
			openedDialogs.at(0)?.id === this.id &&
			openedChildren.length === 0
		);
	});

	isLastOfStack = $derived(this.parent?.children.at(-1)?.id === this.id);
	computedSize = $derived(this.theme.resolveResponsiveProps(this.size, 'normal'));
	computedType = $derived(this.theme.resolveResponsiveProps(this.type, 'modal'));

	computedTransition = $derived(
		this.theme.resolveTransitionProps(this.transition, defaultTransition[this.computedType])
	);

	addChild = (child: DialogState) => () => {
		this.children.push(child);
		return () => {
			this.children = this.children.filter((d) => d.id !== child.id);
		};
	};

	constructor(options: DialogOptions) {
		bind(this, options);
		setContext('dialog', this);
		onMount(this.theme.addDialog(this));
		this.parent && onMount(this.parent.addChild(this));
	}

	toggle = () => {
		this.isOpen = !this.isOpen;
	};
	open = () => {
		this.isOpen = true;
	};

	close = () => {
		this.isOpen = false;
	};

	attachment = (node: HTMLDialogElement) => {
		return () => {
			node.close();
		};
	};
}

// Use interface merging to add the properties
