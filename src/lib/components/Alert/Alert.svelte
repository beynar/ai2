<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { AlertProps } from './alert.props.js';
	import { useAlertTheme } from './alert.theme.js';

	let {
		ref = $bindable(),
		class: className,
		disabled = false,
		color = 'primary',
		variant = 'outline',
		size = 'normal',
		theme,
		prefix,
		title,
		description,
		children,
		...attachments
	}: AlertProps = $props();

	const classes = $derived(useAlertTheme(theme));
	const hasIcon = $derived(!!prefix);
	const hasDescription = $derived(!!description || !!children);
	const hasTitle = $derived(!!title);
</script>

<div
	bind:this={ref}
	role="alert"
	data-color={color}
	data-size={size}
	data-variant={variant}
	class={classes.alert({
		color,
		variant,
		size,
		hasIcon,
		disabled,
		className,
		hasDescription,
		hasTitle
	})}
	{...attachments}
>
	<Slot render={prefix} class={classes.prefix({ size, class: classes.title({ size }) })} />
	<div class={classes.content()}>
		<Slot render={title} class={classes.title({ size })} />
		<Slot render={description} class={classes.description({ size })}>
			<Slot render={children} />
		</Slot>
	</div>
</div>
