<script lang="ts">
	import type { HitboxProps } from './hitbox.props.js';
	import { useHitboxTheme } from './hitbox.theme.js';

	let {
		ref = $bindable(),
		size = 'normal',
		class: className,
		theme,
		...attachments
	}: HitboxProps = $props();

	const classes = $derived(useHitboxTheme(theme));
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	data-slot="hitbox"
	data-size={size}
	class={classes.root({ size, className })}
	{...attachments}
></span>
