<script module lang="ts">
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { tooltipTheme } from './tooltip.js';
	export const setTooltipTheme = setComponentTheme<typeof tooltipTheme>('tooltip');
	export const useTooltipTheme = useComponentTheme('tooltip', tooltipTheme);
</script>

<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Slot from '../Slot/Slot.svelte';
	import { useTheme } from '../Theme/theme.state.svelte.js';
	const theme = useTheme();
	const id = $props.id();
	const currentTooltip = $derived(theme.tooltip);

	const classes = $derived(useTooltipTheme());
</script>

<Popover
	{id}
	isOpen={!!currentTooltip}
	ref={currentTooltip?.ref}
	size={currentTooltip?.size}
	lockScroll={false}
	position={currentTooltip?.position}
	transition={currentTooltip?.transition}
	closeOnMouseLeave={false}
	offset={currentTooltip?.offset}
	class={classes.tooltip({
		size: currentTooltip?.size || 'normal',
		color: currentTooltip?.color || 'surface',
		className: currentTooltip?.class
	})}
>
	<Slot render={currentTooltip?.content} />
</Popover>
