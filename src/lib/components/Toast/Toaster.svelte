<script lang="ts">
	import { useSafeArea } from '$lib/utils/safeArea.svelte.js';
	import { Toaster, type ToasterProps } from './toast.state.svelte.js';
	import Toast from './Toast.svelte';
	import { defaultToastAnimation } from './toast.theme.js';
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
		closeOnClick = true,
		showCloseIcon = true,
		duration = 4000,
		dismissible = true,
		richColors = false,
		prefix,
		suffix,
		closeIcon,
		animation = defaultToastAnimation
	}: ToasterProps = $props();

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
</script>

<dialog
	bind:this={toaster.element}
	tabIndex={-1}
	open={toaster.isOpen}
	aria-label="Notifications"
	style="width: 100%; height: 100%; margin:0px; position: fixed; inset: 0px; overflow: hidden; z-index: 9999; background: transparent;pointer-events: none; left: 0px; top: 0px; right: 0px; bottom: 0px;"
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
