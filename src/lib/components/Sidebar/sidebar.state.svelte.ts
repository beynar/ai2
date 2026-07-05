import { MediaQuery } from 'svelte/reactivity';
import type {
	SidebarApi,
	SidebarCollapsible,
	SidebarDisplayState,
	SidebarSide,
	SidebarState
} from './sidebar.props.js';

type SidebarStateOptions = {
	readonly bare: boolean;
	readonly keyboardShortcut: string | false;
	readonly open: boolean;
	readonly side: SidebarSide;
	readonly collapsible: SidebarCollapsible;
	setOpen: (open: boolean) => void;
};

function isEditableTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	const tagName = target.tagName.toLowerCase();

	return (
		target.isContentEditable ||
		tagName === 'input' ||
		tagName === 'textarea' ||
		tagName === 'select' ||
		!!target.closest('[contenteditable="true"]')
	);
}

export class SidebarStateController {
	private mobileQuery = new MediaQuery('(max-width: 767px)');
	openMobile = $state(false);
	api: SidebarApi;

	constructor(private options: SidebarStateOptions) {
		const controller = this;
		this.api = {
			get open() {
				return controller.open;
			},
			get state() {
				return controller.state;
			},
			get displayState() {
				return controller.displayState;
			},
			get isMobile() {
				return controller.isMobile;
			},
			get openMobile() {
				return controller.openMobile;
			},
			get collapsible() {
				return controller.collapsible;
			},
			get side() {
				return controller.side;
			},
			toggle: () => controller.toggle(),
			setOpen: (open) => controller.setOpen(open),
			setOpenMobile: (open) => controller.setOpenMobile(open)
		};

		$effect(() => {
			const shortcut = this.options.keyboardShortcut;
			if (this.options.bare || shortcut === false) return;

			const onKeydown = (event: KeyboardEvent) => {
				if (event.defaultPrevented || isEditableTarget(event.target)) return;
				if (event.key.toLowerCase() !== shortcut.toLowerCase()) return;
				if (!event.metaKey && !event.ctrlKey) return;

				event.preventDefault();
				this.toggle();
			};

			window.addEventListener('keydown', onKeydown);
			return () => window.removeEventListener('keydown', onKeydown);
		});
	}

	get open(): boolean {
		return this.options.open;
	}

	get state(): SidebarState {
		return this.open ? 'expanded' : 'collapsed';
	}

	get displayState(): SidebarDisplayState {
		if (this.open || this.collapsible === 'none') return 'expanded';
		return this.collapsible === 'offcanvas' ? 'hidden' : 'collapsed';
	}

	get isMobile(): boolean {
		return this.mobileQuery.current;
	}

	get side(): SidebarSide {
		return this.options.side;
	}

	get collapsible(): SidebarCollapsible {
		return this.options.collapsible;
	}

	setOpen = (open: boolean) => {
		this.options.setOpen(open);
	};

	setOpenMobile = (open: boolean) => {
		this.openMobile = open;
	};

	toggle = () => {
		if (this.isMobile) {
			this.openMobile = !this.openMobile;
			return;
		}
		this.setOpen(!this.open);
	};
}
