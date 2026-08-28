import { getContext, onDestroy, setContext } from 'svelte';
import type {
	PageShellApi,
	PageShellActions,
	PageShellBack,
	PageShellBreadcrumbs,
	PageShellConfig,
	PageShellRegion,
	PageShellTextRegion
} from './pageShell.props.js';

const PAGE_SHELL_CONTEXT = Symbol('page-shell');

type PageShellStateOptions = Readonly<PageShellConfig> & {
	readonly isContentScrolled?: boolean;
};

export class PageShellState {
	private overrides = $state<PageShellConfig[]>([]);

	readonly api: PageShellApi;

	constructor(private options: PageShellStateOptions) {
		const shell = this;

		this.api = {
			get title() {
				return shell.current.title;
			},
			get subtitle() {
				return shell.current.subtitle;
			},
			get header() {
				return shell.current.header;
			},
			get headerActions() {
				return shell.current.headerActions;
			},
			get footer() {
				return shell.current.footer;
			},
			get footerActions() {
				return shell.current.footerActions;
			},
			get eyebrow() {
				return shell.current.eyebrow;
			},
			get breadcrumbs() {
				return shell.current.breadcrumbs;
			},
			get breadcrumbsMaxItems() {
				return shell.current.breadcrumbsMaxItems;
			},
			get back() {
				return shell.current.back;
			},
			get contentPadding() {
				return shell.current.contentPadding;
			},
			get contentWidth() {
				return shell.current.contentWidth;
			},
			get actionOverflow() {
				return shell.current.actionOverflow;
			},
			get mobileActionCount() {
				return shell.current.mobileActionCount;
			},
			get isContentScrolled() {
				return shell.options.isContentScrolled ?? false;
			},
			get hasHeader() {
				return shell.hasHeader;
			},
			get hasFooter() {
				return shell.hasFooter;
			},
			set: shell.set,
			setEyebrow: shell.setEyebrow,
			setBreadcrumbs: shell.setBreadcrumbs,
			setBack: shell.setBack,
			setTitle: shell.setTitle,
			setSubtitle: shell.setSubtitle,
			setHeader: shell.setHeader,
			setHeaderActions: shell.setHeaderActions,
			setFooter: shell.setFooter,
			setFooterActions: shell.setFooterActions,
			reset: shell.reset
		};

		setContext(PAGE_SHELL_CONTEXT, this);
	}

	get current(): PageShellConfig {
		return Object.assign(
			{
				eyebrow: this.options.eyebrow,
				breadcrumbs: this.options.breadcrumbs,
				breadcrumbsMaxItems: this.options.breadcrumbsMaxItems,
				back: this.options.back,
				title: this.options.title,
				subtitle: this.options.subtitle,
				header: this.options.header,
				headerActions: this.options.headerActions,
				footer: this.options.footer,
				footerActions: this.options.footerActions,
				contentPadding: this.options.contentPadding,
				contentWidth: this.options.contentWidth,
				actionOverflow: this.options.actionOverflow,
				mobileActionCount: this.options.mobileActionCount
			},
			...this.overrides
		);
	}

	get hasHeader() {
		const current = this.current;
		return Boolean(
			current.header ||
			current.back ||
			current.breadcrumbs ||
			current.eyebrow ||
			current.title ||
			current.subtitle ||
			current.headerActions
		);
	}

	get hasFooter() {
		const current = this.current;
		return Boolean(current.footer || current.footerActions);
	}

	set = (config: PageShellConfig) => {
		this.overrides = [...this.overrides, config];
		let isActive = true;

		return () => {
			if (!isActive) return;
			isActive = false;
			this.overrides = this.overrides.filter((override) => override !== config);
		};
	};

	setEyebrow = (eyebrow?: PageShellTextRegion) => this.set({ eyebrow });
	setBreadcrumbs = (breadcrumbs?: PageShellBreadcrumbs) => this.set({ breadcrumbs });
	setBack = (back?: PageShellBack) => this.set({ back });
	setTitle = (title?: PageShellTextRegion) => this.set({ title });
	setSubtitle = (subtitle?: PageShellTextRegion) => this.set({ subtitle });
	setHeader = (header?: PageShellRegion) => this.set({ header });
	setHeaderActions = (headerActions?: PageShellActions) => this.set({ headerActions });
	setFooter = (footer?: PageShellRegion) => this.set({ footer });
	setFooterActions = (footerActions?: PageShellActions) => this.set({ footerActions });

	reset = () => {
		this.overrides = [];
	};
}

export function usePageShell() {
	const shell = getContext<PageShellState | undefined>(PAGE_SHELL_CONTEXT);
	if (!shell) {
		throw new Error('usePageShell must be called inside a PageShell.');
	}
	return shell.api;
}

export function setPageShell(config: PageShellConfig) {
	const shell = usePageShell();
	onDestroy(shell.set(config));
	return shell;
}
