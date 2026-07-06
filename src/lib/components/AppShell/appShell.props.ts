import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type {
	PageShellActionOverflow,
	PageShellAction,
	PageShellApi,
	PageShellContentPadding,
	PageShellContentWidth,
	PageShellMobileActionCount,
	PageShellTextRegion
} from '$lib/components/PageShell/index.js';
import type { BreadcrumbItem } from '$lib/components/Breadcrumbs/index.js';
import type { PageShellThemeProps } from '$lib/components/PageShell/pageShell.theme.js';
import type { SidebarApi, SidebarFrame, SidebarProps } from '$lib/components/Sidebar/index.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AppShellThemeProps } from './appShell.theme.js';

export type AppShellSidebarProps = Omit<SidebarProps, 'children' | 'mode' | 'frame'>;

export type AppShellApi = {
	/** Page shell API for title, header, footer, and scoped overrides. */
	pageShell: PageShellApi;
	/** Sidebar API for responsive open state and toggle control. */
	sidebar: SidebarApi;
};

export type AppShellRegion = Snippet<[AppShellApi]>;
export type AppShellActions = AppShellRegion | PageShellAction[];
export type AppShellBack = AppShellRegion | PageShellAction;
export type AppShellBreadcrumbs = AppShellRegion | BreadcrumbItem[];

export type AppShellConfig = {
	/** Small metadata above the PageShell title. Ignored when breadcrumbs are provided. */
	eyebrow?: PageShellTextRegion;
	/** Breadcrumb items or a custom breadcrumb snippet rendered above the PageShell title. */
	breadcrumbs?: AppShellBreadcrumbs;
	/** Maximum breadcrumb items before collapsing into an overflow menu. */
	breadcrumbsMaxItems?: number;
	/** Back affordance rendered before breadcrumbs or eyebrow. */
	back?: AppShellBack;
	/** Default PageShell title. */
	title?: PageShellTextRegion;
	/** Default PageShell subtitle. */
	subtitle?: PageShellTextRegion;
	/** Custom PageShell header with access to both shell APIs. */
	header?: AppShellRegion;
	/** Default PageShell header actions with access to both shell APIs. */
	headerActions?: AppShellActions;
	/** Sticky PageShell footer with access to both shell APIs. */
	footer?: AppShellRegion;
	/** Sticky PageShell footer actions. */
	footerActions?: AppShellActions;
	/** Padding applied to the PageShell content inner wrapper. */
	contentPadding?: PageShellContentPadding;
	/** Width preset applied to the PageShell content inner wrapper. */
	contentWidth?: PageShellContentWidth;
	/** Responsive overflow behavior for action arrays. */
	actionOverflow?: PageShellActionOverflow;
	/** Number of action-array buttons to keep inline on mobile when overflow is auto. */
	mobileActionCount?: PageShellMobileActionCount;
	/** Use viewport sizing/fixed positioning or contained sizing/absolute positioning. */
	frame?: SidebarFrame;
};

type AppShellRootAttributes = Partial<
	Pick<
		HTMLAttributes<HTMLDivElement>,
		'id' | 'role' | 'style' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
	>
> & {
	[dataAttribute: `data-${string}`]: string | number | boolean | null | undefined;
};

export type AppShellProps = WithAttachments<
	AppShellRootAttributes &
		AppShellConfig & {
			/** Bindable reference to the root app shell wrapper. */
			ref?: HTMLElement | null;
			/** Sidebar props, minus children because AppShell owns the inset composition. */
			sidebar?: AppShellSidebarProps;
			/** Main page content. Receives both PageShell and Sidebar APIs. */
			children: Snippet<[AppShellApi]>;
			/** Classes applied to the root app shell wrapper. */
			class?: string;
			/** Per-instance PageShell theme overrides. */
			pageShellTheme?: PageShellThemeProps;
			/** Per-instance AppShell theme overrides. */
			theme?: AppShellThemeProps;
		}
>;
