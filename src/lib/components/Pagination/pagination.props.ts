import type { Snippet } from 'svelte';
import type { Colors, Sizes } from '$lib/types/index.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { PaginationThemeProps } from './pagination.theme.js';
import type { PaginationState } from './pagination.state.svelte.js';

export type PaginationVariant = 'solid' | 'outline' | 'soft' | 'ghost';

export type PaginationGap = `ellipsis-${number}-${number}`;

export type PaginationItem = number | PaginationGap;

export type PaginationControlType = 'first' | 'previous' | 'page' | 'next' | 'last';

export type PaginationItemAriaLabel = {
	/**
	 * Control being labelled.
	 */
	type: PaginationControlType;
	/**
	 * Target page for the control.
	 */
	page: number;
	/**
	 * Whether the control represents the current page.
	 */
	active: boolean;
	/**
	 * Whether the control is disabled.
	 */
	disabled: boolean;
	/**
	 * Total page count after deriving from totalItems/pageSize when needed.
	 */
	totalPages: number;
};

export type PaginationPageItemPayload = {
	/**
	 * Page number rendered by this item.
	 */
	page: number;
	/**
	 * Whether this page is the current page.
	 */
	active: boolean;
	/**
	 * Whether pagination is disabled.
	 */
	disabled: boolean;
	/**
	 * Total page count after deriving from totalItems/pageSize when needed.
	 */
	totalPages: number;
};

export type PaginationSummaryPayload = {
	/**
	 * Current page, one-based.
	 */
	page: number;
	/**
	 * Total page count.
	 */
	totalPages: number;
	/**
	 * Total item count.
	 */
	totalItems: number;
	/**
	 * Number of items represented by each page.
	 */
	pageSize: number;
	/**
	 * First visible item number on the current page.
	 */
	startItem: number;
	/**
	 * Last visible item number on the current page.
	 */
	endItem: number;
};

type PaginationTotalPagesProps = {
	/**
	 * Total page count. Values below 1 render no pagination.
	 */
	totalPages: number;
	/**
	 * Total item count used by the summary slot.
	 */
	totalItems?: number;
	/**
	 * Items per page used by the summary slot.
	 */
	pageSize?: number;
};

type PaginationTotalItemsProps = {
	/**
	 * Total page count. When omitted, totalItems/pageSize derive it.
	 */
	totalPages?: number;
	/**
	 * Total item count used to derive totalPages and summary ranges.
	 */
	totalItems: number;
	/**
	 * Items per page used to derive totalPages and summary ranges.
	 */
	pageSize: number;
};

type PaginationBaseProps = {
	/**
	 * Bindable reference to the root navigation element.
	 */
	ref?: HTMLElement | null;
	/**
	 * The class name of the pagination. First element that the component outputs in the DOM.
	 */
	class?: string;
	/**
	 * Current page, one-based. Bind this prop to keep parent state in sync.
	 */
	page?: number;
	/**
	 * Number of pages shown on each side of the current page.
	 */
	siblingCount?: number;
	/**
	 * Number of pages always shown at the start and end.
	 */
	boundaryCount?: number;
	/**
	 * Shows first and last controls.
	 */
	showFirstLast?: boolean;
	/**
	 * Shows previous and next controls.
	 */
	showPrevNext?: boolean;
	/**
	 * Renders the summary slot, or a default item range when totalItems/pageSize are set.
	 */
	showSummary?: boolean;
	/**
	 * Disables every pagination control.
	 */
	disabled?: boolean;
	/**
	 * Theme color token used by active and hover states.
	 */
	color?: Colors;
	/**
	 * Size token controlling control dimensions and text size.
	 */
	size?: Sizes;
	/**
	 * Visual style for controls.
	 */
	variant?: PaginationVariant;
	/**
	 * Accessible label for the pagination navigation landmark.
	 */
	ariaLabel?: string;
	/**
	 * Returns an href for a page. When omitted, controls render as buttons.
	 */
	getHref?: (page: number) => string;
	/**
	 * Returns localized aria labels for first/previous/page/next/last controls.
	 */
	getItemAriaLabel?: (item: PaginationItemAriaLabel) => string;
	/**
	 * Called after an enabled control selects a different page.
	 */
	onPageChange?: (page: number) => void;
	/**
	 * Theme overrides for pagination parts.
	 */
	theme?: PaginationThemeProps;
	/**
	 * First-page control content.
	 */
	first?: Slot;
	/**
	 * Previous-page control content.
	 */
	previous?: Slot;
	/**
	 * Next-page control content.
	 */
	next?: Slot;
	/**
	 * Last-page control content.
	 */
	last?: Slot;
	/**
	 * Gap indicator content.
	 */
	ellipsis?: Slot;
	/**
	 * Full custom renderer. Receives the pagination state instance.
	 */
	children?: Snippet<[PaginationState]>;
	/**
	 * Page item content. Receives page, active, disabled, and totalPages.
	 */
	pageItem?: Slot<PaginationPageItemPayload>;
	/**
	 * Summary content. Receives page, totalPages, totalItems, pageSize, startItem, and endItem.
	 */
	summary?: Slot<PaginationSummaryPayload>;
};

export type PaginationProps = WithAttachments<
	PaginationBaseProps & (PaginationTotalPagesProps | PaginationTotalItemsProps)
>;
