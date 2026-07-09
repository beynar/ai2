<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import { getStatContext, resolveStatSize, resolveStatTheme } from './stat.context.js';
	import type { StatPartProps } from './stat.props.js';
	import { useStatTheme } from './stat.theme.js';

	let { class: className, size, theme, children, ...attachments }: StatPartProps = $props();

	const context = getStatContext();
	const resolvedSize = $derived(resolveStatSize(size, context));
	const classes = $derived(useStatTheme(resolveStatTheme(theme, context)));
</script>

<div
	data-slot="stat-label"
	data-size={resolvedSize}
	class={classes.label({ size: resolvedSize, className })}
	{...attachments}
>
	<Slot render={children} />
</div>
