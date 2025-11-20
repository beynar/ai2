<script lang="ts">
	import type { MarqueeProps } from './marquee.props.js';
	import { useMarqueeTheme } from './marquee.theme.js';

	let {
		direction = 'left',
		children,
		innerClass = '',
		reverse = false,
		speed = 'fast',
		pauseOnHover = true,
		fade = true,
		numberOfCopies = 2,
		class: className = '',
		size = 'normal',
		theme,
		...attachments
	}: MarqueeProps = $props();

	const classes = $derived(useMarqueeTheme(theme));

	const animationDuration = $derived.by(() => {
		if (speed === 'fast') return '20s';
		if (speed === 'normal') return '40s';
		if (speed === 'slow') return '80s';
		return `${speed}s`;
	});

	const maskImage = $derived.by(() => {
		if (!fade) return 'none';
		const gradientDirection = direction === 'left' ? 'to right' : 'to bottom';
		return `linear-gradient(${gradientDirection}, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`;
	});
</script>

<div
	role="presentation"
	class={classes.marquee({ direction, size, class: className })}
	style="--animation-duration: {animationDuration}; --gap: {size === 'small'
		? '0.5rem'
		: size === 'large'
			? '1.5rem'
			: '1rem'}; mask-image: {maskImage}; -webkit-mask-image: {maskImage};"
	{...attachments}
>
	{#each Array(numberOfCopies).fill(0) as _, i (i)}
		<div
			class={classes.inner({
				direction,
				size,
				pauseOnHover,
				reverse,
				class: innerClass
			})}
		>
			{#if typeof children === 'function'}
				{@render children({})}
			{:else if children}
				{children}
			{/if}
		</div>
	{/each}
</div>

<style>
	@keyframes marquee-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marquee-up {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}

	:global(.animate-marquee-left) {
		animation: marquee-left var(--animation-duration, 20s) linear infinite;
	}

	:global(.animate-marquee-up) {
		animation: marquee-up var(--animation-duration, 20s) linear infinite;
	}
</style>
