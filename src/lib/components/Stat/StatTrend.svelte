<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { getStatContext, resolveStatSize, resolveStatTheme } from './stat.context.js';
	import type { StatTrendProps } from './stat.props.js';
	import { useStatTheme } from './stat.theme.js';

	let {
		class: className,
		size,
		theme,
		trend = 'neutral',
		children,
		...attachments
	}: StatTrendProps = $props();

	const context = getStatContext();
	const resolvedSize = $derived(resolveStatSize(size, context));
	const classes = $derived(useStatTheme(resolveStatTheme(theme, context)));
</script>

<div
	data-slot="stat-trend"
	data-trend={trend}
	data-size={resolvedSize}
	class={classes.trend({ size: resolvedSize, trend, className })}
	{...attachments}
>
	<Slot render={children} />
</div>
