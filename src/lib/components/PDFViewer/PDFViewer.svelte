<script lang="ts">
	import { onDestroy, untrack } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import Button from '../Button/Button.svelte';
	import { arrowClockwiseIcon } from '../Icons/arrowClockwise.js';
	import { arrowCounterClockwiseIcon } from '../Icons/arrowCounterClockwise.js';
	import { arrowsDownUpIcon } from '../Icons/arrowsDownUp.js';
	import { arrowsHorizontalIcon } from '../Icons/arrowsHorizontal.js';
	import { arrowsLeftRightIcon } from '../Icons/arrowsLeftRight.js';
	import { caretDownIcon } from '../Icons/caretDown.js';
	import { caretLeftIcon } from '../Icons/caretLeft.js';
	import { caretRightIcon } from '../Icons/caretRight.js';
	import { caretUpIcon } from '../Icons/caretUp.js';
	import { downloadSimpleIcon } from '../Icons/downloadSimple.js';
	import { fileIcon } from '../Icons/file.js';
	import { magnifyingGlassIcon } from '../Icons/magnifyingGlass.js';
	import { magnifyingGlassMinusIcon } from '../Icons/magnifyingGlassMinus.js';
	import { magnifyingGlassPlusIcon } from '../Icons/magnifyingGlassPlus.js';
	import { printerIcon } from '../Icons/printer.js';
	import { scrollIcon } from '../Icons/scroll.js';
	import Popover from '../Popover/Popover.svelte';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';
	import ScrollArea from '../ScrollArea/ScrollArea.svelte';
	import Skeleton from '../Skeleton/Skeleton.svelte';
	import Slot from '../Slot/Slot.svelte';
	import PDFPage from './PDFPage.svelte';
	import type { PDFViewerControl, PDFViewerProps } from './pdfViewer.props.js';
	import { PDFViewerState } from './pdfViewer.state.svelte.js';
	import { usePDFViewerTheme } from './pdfViewer.theme.js';

	let {
		ref = $bindable(null),
		src,
		page = $bindable(1),
		scale = $bindable(1),
		rotation = $bindable(0),
		totalPages = $bindable(0),
		minScale = 0.5,
		maxScale = 3,
		fit = $bindable('width'),
		mode = $bindable('scroll'),
		orientation = $bindable('vertical'),
		pageTransition = true,
		password,
		downloadFileName,
		controls = [
			'navigation',
			'pageInfo',
			'zoom',
			'fit',
			'mode',
			'orientation',
			'rotate',
			'search',
			'download',
			'print'
		],
		toolbarPosition = 'top',
		size = 'normal',
		color = 'neutral',
		onLoad,
		onError,
		onPageChange,
		toolbar,
		error,
		class: className,
		theme,
		...attachments
	}: PDFViewerProps = $props();

	const viewer = new PDFViewerState({
		get src() {
			return src;
		},
		get page() {
			return page;
		},
		set page(value) {
			page = value;
		},
		get scale() {
			return scale;
		},
		set scale(value) {
			scale = value;
		},
		get rotation() {
			return rotation;
		},
		set rotation(value) {
			rotation = value;
		},
		get totalPages() {
			return totalPages;
		},
		set totalPages(value) {
			totalPages = value;
		},
		get fit() {
			return fit;
		},
		set fit(value) {
			fit = value;
		},
		get mode() {
			return mode;
		},
		set mode(value) {
			mode = value;
		},
		get orientation() {
			return orientation;
		},
		set orientation(value) {
			orientation = value;
		},
		get password() {
			return password;
		},
		get minScale() {
			return minScale;
		},
		get maxScale() {
			return maxScale;
		},
		get downloadFileName() {
			return downloadFileName;
		},
		get onLoad() {
			return onLoad;
		},
		get onError() {
			return onError;
		},
		get onPageChange() {
			return onPageChange;
		}
	});

	const classes = $derived(usePDFViewerTheme(theme));
	const pageClasses = $derived({
		page: classes.page,
		canvas: classes.canvas,
		pageError: classes.pageError
	});

	const has = (control: PDFViewerControl) => controls !== false && controls.includes(control);
	const buttonProps = $derived({ variant: 'ghost' as const, color, size, squared: true });

	let query = $state('');
	let searchTimer: ReturnType<typeof setTimeout> | undefined;

	// Place the search popover on the side of the toolbar that faces the document.
	const searchPosition = $derived(
		toolbarPosition === 'left'
			? 'right'
			: toolbarPosition === 'right'
				? 'left'
				: toolbarPosition === 'bottom'
					? 'top'
					: 'bottom'
	);

	// Run the pending search now. Clearing `searchTimer` marks the query as
	// searched, so Enter can tell "edited but not yet searched" from "step matches".
	const runSearch = () => {
		searchTimer = undefined;
		// Read `query` at fire time so it reflects the latest bound value.
		void viewer.search(query);
	};

	const onSearchInput = () => {
		clearTimeout(searchTimer);
		searchTimer = setTimeout(runSearch, 250);
	};

	onDestroy(() => clearTimeout(searchTimer));

	// Reset the search when the popover closes (Escape or toggling the button off),
	// and hand focus back to the trigger so keyboard users aren't dropped on <body>.
	const onSearchClose = (popover: PopoverState) => {
		clearTimeout(searchTimer);
		searchTimer = undefined;
		query = '';
		viewer.clearSearch();
		popover.referenceElement?.focus();
	};

	const onSearchKeydown = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		if (searchTimer) {
			// Edited but not yet searched: run it now rather than stepping stale matches.
			clearTimeout(searchTimer);
			runSearch();
		} else if (e.shiftKey) {
			viewer.previousMatch();
		} else {
			viewer.nextMatch();
		}
	};

	// Ctrl/⌘-wheel and two-finger pinch zoom on the viewer.
	const zoomGestures = (node: HTMLElement) => {
		return untrack(() => {
			const pointers = new Map<number, PointerEvent>();
			let startDist = 0;
			let startScale = 1;

			const onWheel = (e: WheelEvent) => {
				if (!e.ctrlKey && !e.metaKey) return;
				// Capture phase + preventDefault so ctrl/⌘-wheel zooms instead of the
				// viewport's native scroll (plain wheel still scrolls natively).
				e.preventDefault();
				e.stopPropagation();
				viewer.zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
			};
			const dist = () => {
				const [a, b] = [...pointers.values()];
				return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
			};
			const onDown = (e: PointerEvent) => {
				pointers.set(e.pointerId, e);
				if (pointers.size === 2) {
					startDist = dist();
					startScale = viewer.scale;
				}
			};
			const onMove = (e: PointerEvent) => {
				if (!pointers.has(e.pointerId)) return;
				pointers.set(e.pointerId, e);
				if (pointers.size === 2 && startDist) {
					e.preventDefault();
					viewer.setZoom((startScale * dist()) / startDist);
				}
			};
			const onUp = (e: PointerEvent) => {
				pointers.delete(e.pointerId);
				if (pointers.size < 2) startDist = 0;
			};

			node.addEventListener('wheel', onWheel, { passive: false, capture: true });
			node.addEventListener('pointerdown', onDown);
			node.addEventListener('pointermove', onMove);
			node.addEventListener('pointerup', onUp);
			node.addEventListener('pointercancel', onUp);
			return () => {
				node.removeEventListener('wheel', onWheel, { capture: true });
				node.removeEventListener('pointerdown', onDown);
				node.removeEventListener('pointermove', onMove);
				node.removeEventListener('pointerup', onUp);
				node.removeEventListener('pointercancel', onUp);
			};
		});
	};

	const friendlyError = (err: Error) => {
		switch (err.name) {
			case 'PasswordException':
				return 'This document is password-protected.';
			case 'InvalidPDFException':
				return 'This file is not a valid PDF.';
			case 'MissingPDFException':
				return 'The document could not be found.';
			default:
				return 'The document could not be loaded.';
		}
	};

	// Single-mode card-stack slide. Only the page that "moves" animates: on
	// forward navigation the incoming page slides in from the right (on top);
	// on backward navigation the outgoing page slides off to the right,
	// revealing the previous page held static beneath it.
	const slidePage = (
		node: HTMLElement,
		{ direction, role }: { direction: number; role: 'in' | 'out' }
	) => {
		if (!pageTransition || direction === 0) return { duration: 0 };
		const moving = (role === 'in' && direction > 0) || (role === 'out' && direction < 0);
		node.style.zIndex = moving ? '2' : '1';
		return {
			duration: 280,
			easing: cubicOut,
			// `in` runs t 0→1 (slide from right), `out` runs t 1→0 (slide to right).
			css: (t: number) =>
				moving ? `transform: translateX(${(1 - t) * 100}%);` : 'transform: none;'
		};
	};
</script>

<div
	bind:this={ref}
	class={classes.root({ size, position: toolbarPosition, className })}
	{...attachments}
>
	{#if controls !== false && controls.length}
		<Slot
			render={toolbar}
			payload={viewer}
			class={classes.toolbar({ size, position: toolbarPosition })}
		>
			{#if has('navigation')}
				<Button
					{...buttonProps}
					label="Previous page"
					disabled={!viewer.canGoPrevious}
					onClick={viewer.previous}
					prefix={caretLeftIcon}
				/>
				<Button
					{...buttonProps}
					label="Next page"
					disabled={!viewer.canGoNext}
					onClick={viewer.next}
					prefix={caretRightIcon}
				/>
			{/if}
			{#if has('pageInfo')}
				<span class={classes.pageInfo({ size })} aria-live="polite"
					>{viewer.page} / {viewer.totalPages}</span
				>
			{/if}
			{#if has('zoom')}
				<Button
					{...buttonProps}
					label="Zoom out"
					disabled={!viewer.canZoomOut}
					onClick={viewer.zoomOut}
					prefix={magnifyingGlassMinusIcon}
				/>
				<Button
					{...buttonProps}
					label="Zoom in"
					disabled={!viewer.canZoomIn}
					onClick={viewer.zoomIn}
					prefix={magnifyingGlassPlusIcon}
				/>
			{/if}
			{#if has('fit')}
				<Button
					{...buttonProps}
					variant={viewer.fit === 'width' ? 'soft' : 'ghost'}
					label="Fit to width"
					onClick={() => viewer.setFit(viewer.fit === 'width' ? null : 'width')}
					prefix={arrowsHorizontalIcon}
				/>
			{/if}
			{#if has('mode')}
				<Button
					{...buttonProps}
					label={viewer.mode === 'scroll' ? 'Switch to single page' : 'Switch to continuous scroll'}
					onClick={viewer.toggleMode}
					prefix={viewer.mode === 'scroll' ? scrollIcon : fileIcon}
				/>
			{/if}
			{#if has('orientation')}
				<Button
					{...buttonProps}
					label={viewer.orientation === 'vertical'
						? 'Switch to horizontal layout'
						: 'Switch to vertical layout'}
					onClick={viewer.toggleOrientation}
					prefix={viewer.orientation === 'vertical' ? arrowsDownUpIcon : arrowsLeftRightIcon}
				/>
			{/if}
			{#if has('rotate')}
				<Button
					{...buttonProps}
					label="Rotate counterclockwise"
					onClick={() => viewer.rotate(-90)}
					prefix={arrowCounterClockwiseIcon}
				/>
				<Button
					{...buttonProps}
					label="Rotate clockwise"
					onClick={() => viewer.rotate(90)}
					prefix={arrowClockwiseIcon}
				/>
			{/if}
			{#if has('search')}
				<Popover
					position={searchPosition}
					lockScroll={false}
					closeOnClickOutside={false}
					onClose={onSearchClose}
					class={classes.search()}
				>
					{#snippet trigger(popover)}
						<Button
							{...buttonProps}
							label="Search"
							onClick={popover.toggle}
							prefix={magnifyingGlassIcon}
							{@attach popover.reference}
							{@attach (node) => {
								// Expose disclosure state to assistive tech (Button doesn't type aria-*).
								node.setAttribute('aria-expanded', String(popover.isOpen));
								if (popover.id) node.setAttribute('aria-controls', popover.id);
							}}
						/>
					{/snippet}
					<!-- svelte-ignore a11y_autofocus -->
					<input
						class={classes.searchInput({ size })}
						type="search"
						placeholder="Search…"
						aria-label="Search document"
						autofocus
						bind:value={query}
						oninput={onSearchInput}
						onkeydown={onSearchKeydown}
					/>
					<span class={classes.searchCount()}>
						{viewer.matches.length
							? `${viewer.activeMatch + 1} / ${viewer.matches.length}`
							: query
								? '0 / 0'
								: ''}
					</span>
					<Button
						{...buttonProps}
						label="Previous match"
						disabled={!viewer.matches.length}
						onClick={viewer.previousMatch}
						prefix={caretUpIcon}
					/>
					<Button
						{...buttonProps}
						label="Next match"
						disabled={!viewer.matches.length}
						onClick={viewer.nextMatch}
						prefix={caretDownIcon}
					/>
				</Popover>
			{/if}
			{#if has('download')}
				<Button
					{...buttonProps}
					label="Download"
					disabled={!viewer.doc}
					onClick={() => viewer.download()}
					prefix={downloadSimpleIcon}
				/>
			{/if}
			{#if has('print')}
				<Button
					{...buttonProps}
					label="Print"
					disabled={!viewer.doc}
					onClick={() => viewer.print()}
					prefix={printerIcon}
				/>
			{/if}
		</Slot>
	{/if}

	<div class={classes.viewer()} aria-busy={viewer.loading} {@attach zoomGestures}>
		{#if viewer.error}
			<Slot
				render={error}
				payload={viewer}
				class={classes.error()}
				attrs={{ role: 'alert', 'aria-live': 'assertive' }}
			>
				{friendlyError(viewer.error)}
			</Slot>
		{:else if viewer.mode === 'single'}
			<div class={classes.single()} {@attach viewer.attach}>
				{#if viewer.totalPages}
					{#key viewer.page}
						<div
							class={classes.singlePage()}
							in:slidePage={{ direction: viewer.direction, role: 'in' }}
							out:slidePage={{ direction: viewer.direction, role: 'out' }}
						>
							<PDFPage {viewer} pageNumber={viewer.page} classes={pageClasses} />
						</div>
					{/key}
				{/if}
			</div>
		{:else if viewer.orientation === 'horizontal'}
			<div class={classes.scroller()}>
				<div class={classes.pages({ orientation: 'horizontal' })} {@attach viewer.attach}>
					{#each Array(viewer.totalPages) as _, i (i)}
						<PDFPage {viewer} pageNumber={i + 1} classes={pageClasses} />
					{/each}
				</div>
			</div>
		{:else}
			<ScrollArea type="hover" class="h-full">
				<div class={classes.pages({ orientation: 'vertical' })} {@attach viewer.attach}>
					{#each Array(viewer.totalPages) as _, i (i)}
						<PDFPage {viewer} pageNumber={i + 1} classes={pageClasses} />
					{/each}
				</div>
			</ScrollArea>
		{/if}
		{#if viewer.loading}
			<Skeleton class={classes.skeleton()} />
		{/if}
	</div>
</div>
