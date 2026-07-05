<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { caretDoubleLeftIcon } from '../Icons/caretDoubleLeft.js';
	import { caretDoubleRightIcon } from '../Icons/caretDoubleRight.js';
	import { caretLeftIcon } from '../Icons/caretLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import { dotsThreeIcon } from '../Icons/dotsThree.js';
	import { PaginationState } from './pagination.state.svelte.js';
	import type {
		PaginationControlType,
		PaginationProps,
		PaginationSummaryPayload
	} from './pagination.props.js';
	import { usePaginationTheme } from './pagination.theme.js';

	let {
		ref = $bindable(),
		page = $bindable(1),
		totalPages,
		totalItems,
		pageSize,
		siblingCount = 1,
		boundaryCount = 1,
		showFirstLast = false,
		showPrevNext = true,
		showSummary = false,
		disabled = false,
		color = 'primary',
		size = 'normal',
		variant = 'outline',
		ariaLabel = 'Pagination',
		getHref,
		getItemAriaLabel,
		onPageChange,
		class: className,
		theme,
		first,
		previous,
		next,
		last,
		ellipsis,
		children,
		pageItem,
		summary,
		...attachments
	}: PaginationProps = $props();

	const classes = $derived(usePaginationTheme(theme));
	const pagination = new PaginationState({
		get page() {
			return page;
		},
		set page(value) {
			page = value;
		},
		get totalPages() {
			return totalPages;
		},
		get totalItems() {
			return totalItems;
		},
		get pageSize() {
			return pageSize;
		},
		get siblingCount() {
			return siblingCount;
		},
		get boundaryCount() {
			return boundaryCount;
		},
		get disabled() {
			return disabled;
		},
		get getHref() {
			return getHref;
		},
		get getItemAriaLabel() {
			return getItemAriaLabel;
		},
		get onPageChange() {
			return onPageChange;
		}
	});
	const firstIcon = caretDoubleLeftIcon.withProps({});
	const previousIcon = caretLeftIcon.withProps({});
	const nextIcon = caretRightIcon.withProps({});
	const lastIcon = caretDoubleRightIcon.withProps({});
	const ellipsisIcon = dotsThreeIcon.withProps({});
</script>

{#snippet defaultSummary(payload: PaginationSummaryPayload)}
	{payload.startItem}-{payload.endItem} of {payload.totalItems}
{/snippet}

{#snippet pageControl(pageNumber: number)}
	{@const isActive = pageNumber === pagination.currentPage}
	{@const isDisabled = disabled || !pagination.hasPages}
	<li class={classes.item({ size })}>
		<svelte:element
			this={pagination.controlElement}
			role={pagination.controlElement === 'button' ? 'button' : 'link'}
			type={pagination.controlElement === 'button' ? 'button' : undefined}
			href={pagination.getPageHref(pageNumber, isDisabled)}
			aria-label={pagination.getControlAriaLabel('page', pageNumber, isActive, isDisabled)}
			aria-current={isActive ? 'page' : undefined}
			aria-disabled={isDisabled ? 'true' : undefined}
			disabled={pagination.controlElement === 'button' ? isDisabled : undefined}
			data-active={isActive}
			data-disabled={isDisabled}
			data-page={pageNumber}
			class={classes.control({ size, color, variant, active: isActive, disabled: isDisabled })}
			onclick={(event: MouseEvent) => pagination.handleControlClick(event, pageNumber, isDisabled)}
		>
			{#if pageItem}
				<Slot
					render={pageItem}
					payload={pagination.getPageItemPayload(pageNumber, isActive, isDisabled)}
				/>
			{:else}
				{pageNumber}
			{/if}
		</svelte:element>
	</li>
{/snippet}

{#snippet iconControl(
	type: PaginationControlType,
	targetPage: number,
	isDisabled: boolean,
	icon: NonNullable<PaginationProps['first']>
)}
	<li class={classes.item({ size })}>
		<svelte:element
			this={pagination.controlElement}
			role={pagination.controlElement === 'button' ? 'button' : 'link'}
			type={pagination.controlElement === 'button' ? 'button' : undefined}
			href={pagination.getPageHref(targetPage, isDisabled)}
			aria-label={pagination.getControlAriaLabel(type, targetPage, false, isDisabled)}
			aria-disabled={isDisabled ? 'true' : undefined}
			disabled={pagination.controlElement === 'button' ? isDisabled : undefined}
			data-disabled={isDisabled}
			class={classes.control({
				size,
				color,
				variant,
				active: false,
				disabled: isDisabled,
				control: 'icon'
			})}
			onclick={(event: MouseEvent) => pagination.handleControlClick(event, targetPage, isDisabled)}
		>
			<Slot as="span" render={icon} class={classes.icon({ size })} />
		</svelte:element>
	</li>
{/snippet}

{#if pagination.hasPages}
	<nav
		bind:this={ref}
		aria-label={ariaLabel}
		data-slot="pagination"
		data-color={color}
		data-size={size}
		data-variant={variant}
		class={classes.root({ className })}
		{...attachments}
	>
		{#if children}
			{@render children(pagination)}
		{:else}
			{#if pagination.summary && (showSummary || summary)}
				<Slot
					as="span"
					render={summary ?? defaultSummary}
					class={classes.summary({ size })}
					payload={pagination.summary}
				/>
			{/if}

			<ul class={classes.list({ size })}>
				{#if showFirstLast}
					{@render iconControl('first', 1, pagination.isPreviousDisabled, first ?? firstIcon)}
				{/if}
				{#if showPrevNext}
					{@render iconControl(
						'previous',
						pagination.currentPage - 1,
						pagination.isPreviousDisabled,
						previous ?? previousIcon
					)}
				{/if}

				{#each pagination.items as item (item)}
					{#if typeof item === 'number'}
						{@render pageControl(item)}
					{:else}
						<li class={classes.item({ size })}>
							<span aria-hidden="true" class={classes.ellipsis({ size })}>
								<Slot as="span" render={ellipsis ?? ellipsisIcon} class={classes.icon({ size })} />
							</span>
						</li>
					{/if}
				{/each}

				{#if showPrevNext}
					{@render iconControl(
						'next',
						pagination.currentPage + 1,
						pagination.isNextDisabled,
						next ?? nextIcon
					)}
				{/if}
				{#if showFirstLast}
					{@render iconControl(
						'last',
						pagination.pageCount,
						pagination.isNextDisabled,
						last ?? lastIcon
					)}
				{/if}
			</ul>
		{/if}
	</nav>
{/if}
