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

	// Beyond `visibleToasts`, a toast is faded out — it must also stop being
	// interactive (no pointer events, not focusable) or it invisibly intercepts
	// clicks and tab stops while aria-hidden.
	const hidden = $derived(reversedIndex > toast.toaster.visibleToasts - 1);

	// `prefix: false` explicitly disables the icon; otherwise a custom icon/prefix
	// wins, then a semantic default per color.
	const icon = $derived.by(() => {
		if (toast.opts.prefix === false) return null;
		if (toast.opts.icon) return toast.opts.icon;
		if (toast.opts.prefix) return toast.opts.prefix;
		return toast.opts.color === 'danger'
			? triangleIcon
			: toast.opts.color === 'warning'
				? exclamationMarkIcon
				: toast.opts.color === 'info'
					? infoIcon
					: checkCircleIcon;
	});

	const classes = $derived(useToastTheme(theme));

	const in_out = fso();

	const onPointerEnter = () => {
		const position = toast.opts.position;
		if (toast.toaster.hovering === position) return;
		toast.toaster.hovering = position;
		updateArea();
		toast.toaster.toggleTimers(position, 'pause');
	};
</script>

<li
	data-color={toast.opts.color || 'background'}
	bind:this={toast.element}
	bind:clientHeight={toast.height}
	{...attachments}
	onpointerenter={onPointerEnter}
	ontransitionend={(e) => {
		if (e.propertyName === 'translate' && toast.hovered && index === 0) {
			updateArea();
		}
	}}
	onintroend={updateArea}
	onoutroend={() => {
		// The toaster dialog can only close once the LAST toast has finished its
		// exit animation — checking on intro (as before) never fires with 0 toasts.
		toast.toaster.maybeCloseToaster();
		updateArea();
	}}
	out:in_out={toast.animations.out}
	in:in_out={toast.animations.in}
	aria-live={toast.opts.important ? 'assertive' : 'polite'}
	aria-atomic="true"
	role={toast.opts.important ? 'alert' : 'status'}
	tabIndex={hidden ? -1 : 0}
	aria-hidden={hidden}
	style:opacity={hidden ? 0 : 1}
	style:pointer-events={hidden ? 'none' : undefined}
	class={classes.root({
		richColors: toast.opts.richColors,
		color: toast.opts.color,
		size: toast.opts.size
	})}
	style:scale={toast.stacked ? Math.pow(0.97, reversedIndex).toFixed(4) : '1'}
	style:translate="0px {toast.translateY}px"
	style={toast.actualizedPosition[2]}
	onclick={toast.opts.dismissible && toast.opts.closeOnClick ? toast.remove : null}
>
	{#if toast.opts.showCloseIcon && toast.opts.dismissible}
		<button
			type="button"
			aria-label="Dismiss notification"
			class={classes.closeIcon({ richColors: toast.opts.richColors, color: toast.opts.color })}
			onclick={(e) => {
				e.stopPropagation();
				toast.remove();
			}}
		>
			<Slot render={toast.opts.closeIcon || xIcon} />
		</button>
	{/if}
	{#if icon || toast.loading}
		<div
			class={classes.prefix({
				size: toast.opts.size,
				color: toast.opts.color,
				richColors: toast.opts.richColors
			})}
			{@attach spinnerOverlay({ loading: toast.loading })}
		>
			<Slot render={icon ?? undefined} />
		</div>
	{/if}
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
