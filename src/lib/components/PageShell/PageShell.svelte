<script lang="ts">
	import type { PageShellProps } from './pageShell.props.js';
	import PageShellFooter from './PageShellFooter.svelte';
	import PageShellHeader from './PageShellHeader.svelte';
	import { PageShellState } from './pageShell.state.svelte.js';
	import { usePageShellTheme } from './pageShell.theme.js';

	let {
		ref = $bindable(),
		title,
		subtitle,
		eyebrow,
		breadcrumbs,
		breadcrumbsMaxItems = 4,
		back,
		header,
		headerActions,
		footer,
		footerActions,
		contentPadding = 'none',
		contentWidth = 'full',
		actionOverflow = 'auto',
		mobileActionCount = 1,
		children,
		class: className,
		theme,
		...attachments
	}: PageShellProps = $props();

	let isContentScrolled = $state(false);

	function updateContentScroll(event: Event & { currentTarget: HTMLElement }) {
		isContentScrolled = event.currentTarget.scrollTop > 0;
	}

	const shell = new PageShellState({
		get eyebrow() {
			return eyebrow;
		},
		get breadcrumbs() {
			return breadcrumbs;
		},
		get breadcrumbsMaxItems() {
			return breadcrumbsMaxItems;
		},
		get back() {
			return back;
		},
		get title() {
			return title;
		},
		get subtitle() {
			return subtitle;
		},
		get header() {
			return header;
		},
		get headerActions() {
			return headerActions;
		},
		get footer() {
			return footer;
		},
		get footerActions() {
			return footerActions;
		},
		get contentPadding() {
			return contentPadding;
		},
		get contentWidth() {
			return contentWidth;
		},
		get actionOverflow() {
			return actionOverflow;
		},
		get mobileActionCount() {
			return mobileActionCount;
		},
		get isContentScrolled() {
			return isContentScrolled;
		}
	});

	const classes = $derived(usePageShellTheme(theme));
</script>

<div
	bind:this={ref}
	data-slot="page-shell"
	data-scrolled={isContentScrolled ? 'true' : undefined}
	class={classes.root({ className })}
	{...attachments}
>
	{#if shell.hasHeader}
		<PageShellHeader api={shell.api} {theme} />
	{/if}

	<main data-slot="page-shell-content" class={classes.content()} onscroll={updateContentScroll}>
		<div
			data-slot="page-shell-content-inner"
			class={classes.contentInner({
				padding: shell.api.contentPadding ?? 'none',
				width: shell.api.contentWidth ?? 'full'
			})}
		>
			{@render children(shell.api)}
		</div>
	</main>

	{#if shell.hasFooter}
		<PageShellFooter api={shell.api} {theme} />
	{/if}
</div>
