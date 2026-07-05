<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	import Slot from '../Slot/Slot.svelte';
	import { useTheme } from '../Theme/theme.state.svelte.js';
	import { useTooltipTheme } from './tooltip.theme.js';

	const theme = useTheme();
	const id = $props.id();
	const currentTooltip = $derived(theme.tooltip);

	const classes = $derived(useTooltipTheme());
</script>

<Popover
	{id}
	open={!!currentTooltip}
	ref={currentTooltip?.ref}
	size={currentTooltip?.size}
	lockScroll={false}
	position={currentTooltip?.position}
	transition={currentTooltip?.transition}
	closeOnMouseLeave={false}
	offset={currentTooltip?.offset}
	class={classes.root({
		size: currentTooltip?.size || 'normal',
		color: currentTooltip?.color || 'background',
		className: currentTooltip?.class
	})}
>
	<Slot render={currentTooltip?.content} />
</Popover>
