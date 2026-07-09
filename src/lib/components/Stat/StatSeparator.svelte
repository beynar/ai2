<script lang="ts">
	import Separator from '../Separator/Separator.svelte';
	import { getStatContext, resolveStatSize, resolveStatTheme } from './stat.context.js';
	import type { StatSeparatorProps } from './stat.props.js';
	import { useStatTheme } from './stat.theme.js';

	let {
		class: className = '',
		statSize,
		theme,
		decorative = true,
		orientation = 'horizontal',
		align = 'center',
		line = true,
		color = 'background',
		size = 1,
		children,
		...attachments
	}: StatSeparatorProps = $props();

	const context = getStatContext();
	const resolvedSize = $derived(resolveStatSize(statSize, context));
	const classes = $derived(useStatTheme(resolveStatTheme(theme, context)));
</script>

<div
	data-slot="stat-separator"
	data-size={resolvedSize}
	class={classes.separator({ size: resolvedSize, className })}
	{...attachments}
>
	<Separator {decorative} {orientation} {align} {line} {color} {size} {children} class="my-0" />
</div>
