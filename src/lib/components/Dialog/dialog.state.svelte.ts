import { bind } from '$lib/utils/state.svelte.js';
// import { useTheme } from '$lib/utils/theme.svelte.js';
import { getContext, onMount, setContext, untrack } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import type { DialogProps, DialogType } from './dialog.props.js';
import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';
import { useClickOutside } from '$lib/utils/useClickOutside.svelte.js';
import { useFocusTrap } from '$lib/utils/useFocusTrap.svelte.js';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
interface DialogOptions
	extends MakeRequired<
		Pick<
			DialogProps,
			| 'id'
			| 'type'
			| 'size'
			| 'transition'
			| 'onClose'
			| 'onOpen'
			| 'closeOnEscape'
			| 'closeOnClickOutside'
			| 'closable'
		>,
		'closeOnEscape' | 'closeOnClickOutside' | 'closable'
	> {
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

	// Hook instances
	clickOutside = useClickOutside({
		isActive: () => {
			if (!this.closeOnClickOutside || this.children.some((d) => d.isOpen)) {
				return false;
			}
			return this.isOpen && this.hasTransitioned;
		},
		callback: () => this.close()
	});

	focusTrap = useFocusTrap({
		isActive: () => {
			return false;
			return this.isOpen && (this.isLastOfStack || this.isLastOpen);
		}
	});

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

		// Initialize hooks that don't return references
		useKeyDown({
			isActive: () => this.isOpen,
			onWindow: () => true,
			keys: ['Escape'],
			callback: (e) => {
				if (this.isOpen) {
					e.preventDefault();
				}
				if (
					this.closeOnEscape &&
					this.closable &&
					this.isOpen &&
					(this.isLastOfStack || this.isLastOpen)
				) {
					this.close();
				}
			}
		});

		useScrollLock({
			isActive: () =>
				!this.parent && this.isOpen && this.theme.dialogs.filter((d) => d.isOpen).length === 1
		});
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

	contentAttachment = (node: HTMLElement) => {
		return untrack(() => {
			// Gather all cleanup callbacks
			const cleanups: Array<(() => void) | void> = [];

			// Attach focusTrap
			const focusTrapCleanup = this.focusTrap.attachment?.(node);
			if (focusTrapCleanup) cleanups.push(focusTrapCleanup);

			// Attach clickOutside
			console.log(this.clickOutside.reference);
			const clickOutsideCleanup = this.clickOutside.reference?.(node);
			if (clickOutsideCleanup) cleanups.push(clickOutsideCleanup);

			// Return combined cleanup function
			return () => {
				cleanups.forEach((cleanup) => cleanup?.());
			};
		});
	};
}

// Use interface merging to add the properties
