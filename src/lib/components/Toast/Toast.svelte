<script lang="ts">
	import { spinnerOverlay } from '$lib/attachments/spinnerOverlay.svelte.js';
	import Slot from '../Slot/Slot.svelte';
	import type { Toast } from './toast.state.svelte.js';
	import { triangleIcon } from '$lib/components/Icons/triangle.js';
	import { exclamationMarkIcon } from '$lib/components/Icons/exclamationMark.js';
	import { infoIcon } from '$lib/components/Icons/info.js';
	import { xIcon } from '$lib/components/Icons/x.js';
	import { checkCircleIcon } from '$lib/components/Icons/checkCircle.js';
	import { fso } from '$lib/transitions/transition.js';
	import { useToastTheme, type ToastThemeProps } from './toast.theme.js';
	import type { WithAttachments } from '$lib/types/props.js';

	let {
		toast,
		theme,
		updateArea,
		...attachments
	}: WithAttachments<{ updateArea: () => void; toast: Toast; theme?: ToastThemeProps }> = $props();

	const { reversedIndex, index } = $derived(toast.indexInStack);

	const getIcon = () => {
		if (toast.opts.icon) {
			return toast.opts.icon;
		}
		if (toast.opts.prefix) {
			return toast.opts.prefix;
		}
		return toast.opts.icon
			? toast.opts.icon
			: toast.opts.color === 'danger'
				? triangleIcon
				: toast.opts.color === 'warning'
					? exclamationMarkIcon
					: toast.opts.color === 'info'
						? infoIcon
						: checkCircleIcon;
	};

	const classes = $derived(useToastTheme(theme));

	const in_out = fso();

	const onPointerEnter = () => () => {
		const position = toast.opts.position;
		if (toast.toaster.hovering === position) return;
		toast.toaster.hovering = position;
		updateArea();
		toast.toaster.toggleTimers(position, 'pause');
	};
</script>

<!-- {@const animationIn = customAnimation?.in || animation?.[position]?.in || animation?.in || {}}
		{@const animationOut =
			customAnimation?.out || animation?.[position]?.out || animation?.out || {}} -->

<li
	data-color={toast.opts.color || 'surface'}
	bind:this={toast.element}
	bind:clientHeight={toast.height}
	{...attachments}
	onpointerenter={toast.hovered ? null : onPointerEnter()}
	ontransitionend={(e) => {
		if (e.propertyName === 'translate' && toast.hovered && index === 0) {
			updateArea();
		}
	}}
	onintroend={() => {
		toast.toaster.maybeCloseToaster();
		updateArea();
	}}
	out:in_out={toast.animations.out}
	in:in_out={toast.animations.in}
	aria-live={toast.opts.important ? 'assertive' : 'polite'}
	aria-atomic="true"
	role="status"
	tabIndex={0}
	aria-hidden={reversedIndex > toast.toaster.visibleToasts - 1}
	style:opacity={reversedIndex > toast.toaster.visibleToasts - 1 ? 0 : 1}
	class={classes.toast({
		richColors: toast.opts.richColors,
		color: toast.opts.color,
		size: toast.opts.size
	})}
	style:scale={toast.stacked ? `calc(pow(0.97, -1 * ${-reversedIndex}))` : `1`}
	style:translate="0px {toast.translateY}px"
	style={toast.actualizedPosition[2]}
	onclick={toast.opts.dismissible
		? toast.opts.closeOnClick
			? toast.remove
			: !toast.opts.showCloseIcon
				? toast.remove
				: null
		: null}
>
	{#if toast.opts.showCloseIcon && toast.opts.dismissible}
		<button style="display:contents" onclick={toast.remove}>
			<Slot
				render={toast.opts.closeIcon || xIcon}
				class={classes.closeIcon({ richColors: toast.opts.richColors, color: toast.opts.color })}
			/>
		</button>
	{/if}
	<div
		class={classes.prefix({
			size: toast.opts.size,
			color: toast.opts.color,
			richColors: toast.opts.richColors
		})}
		{@attach spinnerOverlay({ loading: toast.loading })}
	>
		<Slot render={getIcon()} />
	</div>
	<div
		class={classes.content({
			size: toast.opts.size,
			color: toast.opts.color,
			richColors: toast.opts.richColors
		})}
	>
		<Slot
			class={classes.title({
				size: toast.opts.size,
				color: toast.opts.color,
				richColors: toast.opts.richColors
			})}
			render={toast.opts.title}
		/>
		<Slot
			class={classes.description({
				size: toast.opts.size,
				color: toast.opts.color,
				richColors: toast.opts.richColors
			})}
			render={toast.opts.description}
		/>
	</div>
	<Slot
		render={toast.opts.suffix}
		class={classes.suffix({
			size: toast.opts.size,
			color: toast.opts.color,
			richColors: toast.opts.richColors
		})}
	/>
</li>
