<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Slot from '../Slot/Slot.svelte';
	import { useTheme } from '../Theme/theme.state.svelte.js';
	import { useTooltipTheme } from './tooltip.theme.js';

	const theme = useTheme();
	const id = $props.id();
	const currentTooltip = $derived(theme.tooltip);
	const color = $derived(currentTooltip?.color ?? 'neutral');
	const size = $derived(currentTooltip?.size ?? 'normal');
	const variant = $derived(currentTooltip?.variant ?? 'solid');

	const classes = $derived(useTooltipTheme(currentTooltip?.theme));
</script>

<Popover
	{id}
	open={!!currentTooltip}
	ref={currentTooltip?.ref}
	lockScroll={false}
	position={currentTooltip?.position}
	transition={currentTooltip?.transition}
	closeOnMouseLeave={false}
	offset={currentTooltip?.offset}
	onOpen={currentTooltip?.onOpen}
	onClose={currentTooltip?.onClose}
	class="!w-fit !max-w-fit !bg-transparent !p-0 !shadow-none !ring-0"
>
	<div
		role="tooltip"
		data-color={color}
		data-size={size}
		data-variant={variant}
		class={classes.root({ color, size, variant, className: currentTooltip?.class })}
	>
		<Slot render={currentTooltip?.content} />
	</div>
</Popover>
