<script lang="ts">
	import { useSafeArea } from '$lib/utils/safeArea.svelte.js';
	import { Toaster, type ToasterProps } from './toast.state.svelte.js';
	import Toast from './Toast.svelte';
	import { defaultToastAnimation, useToastTheme } from './toast.theme.js';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	let {
		theme,
		collapseHorizontalAxis = (breakpoint) => (breakpoint === 'sm' ? true : false),
		expand = false,
		visibleToasts = 4,
		gap = 10,
		offset = 20,
		direction,
		position = 'bottom-center',
		perspectiveAmount = 15,
		size,
		closeOnClick = false,
		swipeToDismiss = true,
		showCloseIcon = true,
		duration = 4000,
		dismissible = true,
		richColors = false,
		progress = false,
		prefix,
		suffix,
		closeIcon,
		animation = defaultToastAnimation
	}: ToasterProps = $props();

	const t = $derived(useI18n());

	const toaster = new Toaster({
		get collapseHorizontalAxis() {
			return collapseHorizontalAxis;
		},
		get expand() {
			return expand;
		},
		get visibleToasts() {
			return visibleToasts;
		},
		get gap() {
			return gap;
		},
		get offset() {
			return offset;
		},
		get direction() {
			return direction;
		},
		get position() {
			return position;
		},
		get perspectiveAmount() {
			return perspectiveAmount;
		},
		get size() {
			return size;
		},
		get closeOnClick() {
			return closeOnClick;
		},
		get swipeToDismiss() {
			return swipeToDismiss;
		},
		get showCloseIcon() {
			return showCloseIcon;
		},
		get duration() {
			return duration;
		},
		get dismissible() {
			return dismissible;
		},
		get richColors() {
			return richColors;
		},
		get progress() {
			return progress;
		},
		get prefix() {
			return prefix;
		},
		get suffix() {
			return suffix;
		},
		get closeIcon() {
			return closeIcon;
		},
		get animation() {
			return animation;
		}
	});

	const setPolygon = useSafeArea({
		isActive: () => !!toaster.hovering,
		offset: 30,
		callback: () => {
			toaster.hovering && toaster.toggleTimers(toaster.hovering, 'resume');
			toaster.hovering = null;
		}
	});

	const classes = $derived(useToastTheme(theme));
</script>

<dialog
	bind:this={toaster.element}
	tabIndex={-1}
	open={toaster.isOpen}
	aria-label={t.notifications}
	class={classes.toaster()}
	data-hovering={toaster.hovering}
>
	{#each toaster.toasts as toast (toast.id)}
		<Toast
			updateArea={() => setPolygon.updateAreas()}
			{@attach setPolygon.reference}
			{theme}
			{toast}
		/>
	{/each}
</dialog>
