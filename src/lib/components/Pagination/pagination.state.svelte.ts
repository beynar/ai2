import { bind } from '$lib/utils/state.svelte.js';
import type {
	PaginationControlType,
	PaginationItem,
	PaginationItemAriaLabel,
	PaginationPageItemPayload,
	PaginationSummaryPayload
} from './pagination.props.js';

type PaginationStateOptions = {
	page: number;
	totalPages?: number;
	totalItems?: number;
	pageSize?: number;
	siblingCount: number;
	boundaryCount: number;
	disabled: boolean;
	getHref?: (page: number) => string;
	getItemAriaLabel?: (item: PaginationItemAriaLabel) => string;
	onPageChange?: (page: number) => void;
};

export interface PaginationState extends PaginationStateOptions {}
export class PaginationState {
	pageCount = $derived(getPageCount(this.totalPages, this.totalItems, this.pageSize));
	clampPage = (nextPage: number) => {
		return clampPage(nextPage, this.pageCount);
	};
	currentPage = $derived(this.pageCount === 0 ? 0 : this.clampPage(this.page));
	siblings = $derived(getVisibleCount(this.siblingCount));
	boundaries = $derived(getVisibleCount(this.boundaryCount));
	items = $derived(
		getPaginationItems(this.currentPage, this.pageCount, this.siblings, this.boundaries)
	);
	summary = $derived(
		getPaginationSummary(this.currentPage, this.pageCount, this.totalItems, this.pageSize)
	);
	controlElement: 'a' | 'button' = $derived(this.getHref ? 'a' : 'button');
	hasPages = $derived(this.pageCount > 0);
	isPreviousDisabled = $derived(this.disabled || !this.hasPages || this.currentPage <= 1);
	isNextDisabled = $derived(this.disabled || !this.hasPages || this.currentPage >= this.pageCount);

	constructor(options: PaginationStateOptions) {
		bind(this, options);
	}

	setPage = (nextPage: number) => {
		if (this.disabled || !this.hasPages) return;

		const resolvedPage = this.clampPage(nextPage);
		if (resolvedPage === this.page) return;

		this.page = resolvedPage;
		this.onPageChange?.(resolvedPage);
	};

	first = () => {
		this.setPage(1);
	};

	previous = () => {
		this.setPage(this.currentPage - 1);
	};

	next = () => {
		this.setPage(this.currentPage + 1);
	};

	last = () => {
		this.setPage(this.pageCount);
	};

	handleControlClick = (event: MouseEvent, nextPage: number, isDisabled: boolean) => {
		if (isDisabled || nextPage === this.currentPage || !this.getHref) {
			event.preventDefault();
		}

		if (!isDisabled) {
			this.setPage(nextPage);
		}
	};

	getPageHref = (nextPage: number, isDisabled: boolean) => {
		if (isDisabled || !this.getHref) return undefined;
		return this.getHref(this.clampPage(nextPage));
	};

	getPageItemPayload = (
		pageNumber: number,
		isActive: boolean,
		isDisabled: boolean
	): PaginationPageItemPayload => {
		return {
			page: pageNumber,
			active: isActive,
			disabled: isDisabled,
			totalPages: this.pageCount
		};
	};

	getControlAriaLabel = (
		type: PaginationControlType,
		targetPage: number,
		isActive: boolean,
		isDisabled: boolean
	) => {
		const ariaLabelItem = {
			type,
			page: this.clampPage(targetPage),
			active: isActive,
			disabled: isDisabled,
			totalPages: this.pageCount
		};

		return (this.getItemAriaLabel ?? getDefaultItemAriaLabel)(ariaLabelItem);
	};
}

function getPageCount(
	totalPages: number | undefined,
	totalItems: number | undefined,
	pageSize: number | undefined
) {
	const explicitTotalPages = getNonNegativeInteger(totalPages);
	if (explicitTotalPages !== undefined) return explicitTotalPages;

	const normalizedTotalItems = getNonNegativeInteger(totalItems);
	const normalizedPageSize = getPositiveInteger(pageSize);
	if (normalizedTotalItems === undefined || normalizedPageSize === undefined) return 0;

	return Math.ceil(normalizedTotalItems / normalizedPageSize);
}

function getPaginationItems(
	activePage: number,
	pageCount: number,
	activeSiblingCount: number,
	activeBoundaryCount: number
): PaginationItem[] {
	if (pageCount <= 0) return [];

	const visiblePages = new Set<number>();
	for (
		let pageNumber = 1;
		pageNumber <= Math.min(activeBoundaryCount, pageCount);
		pageNumber += 1
	) {
		visiblePages.add(pageNumber);
	}
	for (
		let pageNumber = Math.max(pageCount - activeBoundaryCount + 1, 1);
		pageNumber <= pageCount;
		pageNumber += 1
	) {
		visiblePages.add(pageNumber);
	}
	for (
		let pageNumber = Math.max(activePage - activeSiblingCount, 1);
		pageNumber <= Math.min(activePage + activeSiblingCount, pageCount);
		pageNumber += 1
	) {
		visiblePages.add(pageNumber);
	}
	if (activePage <= activeBoundaryCount + 1 && activeBoundaryCount < pageCount) {
		visiblePages.add(activeBoundaryCount + 1);
	}
	if (activePage >= pageCount - activeBoundaryCount && activeBoundaryCount < pageCount) {
		visiblePages.add(pageCount - activeBoundaryCount);
	}

	const sortedPages = [...visiblePages].sort((left, right) => left - right);
	const items: PaginationItem[] = [];
	let previousPage = 0;

	for (const pageNumber of sortedPages) {
		if (previousPage > 0 && pageNumber - previousPage === 2) {
			items.push(previousPage + 1);
		} else if (previousPage > 0 && pageNumber - previousPage > 2) {
			items.push(`ellipsis-${previousPage}-${pageNumber}`);
		}

		items.push(pageNumber);
		previousPage = pageNumber;
	}

	return items;
}

function clampPage(nextPage: number, pageCount: number) {
	const normalizedPage = Number.isFinite(nextPage) ? Math.trunc(nextPage) : 1;
	return Math.min(Math.max(1, normalizedPage), pageCount);
}

function getPaginationSummary(
	page: number,
	totalPages: number,
	totalItems: number | undefined,
	pageSize: number | undefined
): PaginationSummaryPayload | undefined {
	const normalizedTotalItems = getNonNegativeInteger(totalItems);
	const normalizedPageSize = getPositiveInteger(pageSize);
	if (
		normalizedTotalItems === undefined ||
		normalizedPageSize === undefined ||
		normalizedTotalItems === 0
	) {
		return undefined;
	}

	const startItem = (page - 1) * normalizedPageSize + 1;
	const endItem = Math.min(page * normalizedPageSize, normalizedTotalItems);

	return {
		page,
		totalPages,
		totalItems: normalizedTotalItems,
		pageSize: normalizedPageSize,
		startItem,
		endItem
	};
}

function getDefaultItemAriaLabel(item: PaginationItemAriaLabel) {
	if (item.type === 'page') {
		return item.active ? `Page ${item.page}, current page` : `Go to page ${item.page}`;
	}

	const labelByType: Record<Exclude<PaginationItemAriaLabel['type'], 'page'>, string> = {
		first: 'Go to first page',
		previous: 'Go to previous page',
		next: 'Go to next page',
		last: 'Go to last page'
	};

	return labelByType[item.type];
}

function getNonNegativeInteger(value: number | undefined) {
	if (value === undefined || !Number.isFinite(value)) return undefined;
	return Math.max(0, Math.trunc(value));
}

function getPositiveInteger(value: number | undefined) {
	if (value === undefined || !Number.isFinite(value)) return undefined;
	const normalized = Math.trunc(value);
	return normalized > 0 ? normalized : undefined;
}

function getVisibleCount(value: number) {
	if (!Number.isFinite(value)) return 0;
	return Math.max(0, Math.trunc(value));
}
