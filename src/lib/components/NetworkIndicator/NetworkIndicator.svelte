<script lang="ts" module>
	interface CustomEventMap {
		'network:indicator': CustomEvent<boolean>;
	}
	declare global {
		interface Document {
			addEventListener<K extends keyof CustomEventMap>(
				type: K,
				listener: (this: Document, ev: CustomEventMap[K]) => void
			): void;
			dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
			removeEventListener<K extends keyof CustomEventMap>(
				type: K,
				listener: (this: Document, ev: CustomEventMap[K]) => void
			): void;
		}
	}

	export const toggleNetworkIndicator = () => {
		const isLoading =
			document.querySelector('.ui-network-indicator')?.getAttribute?.('data-loading') === 'true';

		document.dispatchEvent(
			new CustomEvent('network:indicator', {
				detail: !isLoading
			})
		);
	};
</script>

<script lang="ts">
	import { navigating } from '$app/state';
	import { onMount, untrack } from 'svelte';
	import type { NetworkIndicatorProps } from './networkIndicator.props.js';
	import { useNetworkIndicatorTheme } from './networkIndicator.theme.js';
	import { easingBezierStrings } from '$lib/transitions/easingFunctions.js';
	import { fade } from 'svelte/transition';

	let {
		delay = 300,
		class: className = '',
		color = 'contrast',
		size = 3,
		easing = 'cubicInOut',
		theme,
		...attachments
	}: NetworkIndicatorProps = $props();

	const classes = $derived(useNetworkIndicatorTheme(theme));

	let animation = $state<Animation>();
	let show = $state<boolean>(false);

	const animate = (node: HTMLDivElement) => {
		return untrack(() => {
			let transform = Math.random() * 0.35;
			node!.style.transform = `scaleX(0)`;
			animation?.cancel();
			const animate = () => {
				animation = node.animate(
					{
						opacity: 1,
						transform: `scaleX(${transform})`
					},
					{
						duration: delay,
						easing: easingBezierStrings[easing],
						fill: 'both'
					}
				);
				animation.onfinish = () => {
					if (transform > 1) {
						transform = 0.02;
					} else {
						transform = transform + Math.random() * 0.15;
					}
					animate();
				};
			};
			animate();

			return () => {
				animation?.cancel();
				animation = undefined;
				node!.style.transform = `scaleX(0)`;
			};
		});
	};

	const onNetworkIndicator = ({ detail }: CustomEvent<boolean>) => {
		if (detail) {
			show = true;
		} else {
			show = false;
		}
	};

	onMount(() => {
		document.addEventListener('network:indicator', onNetworkIndicator);
		return () => {
			document.removeEventListener('network:indicator', onNetworkIndicator);
		};
	});
</script>

{#if navigating.from || show}
	<div
		{@attach animate}
		transition:fade={{ duration: delay }}
		data-color={color}
		data-loading={!!animation}
		class={classes.networkIndicator({ color, className })}
		style:height="{size}px"
		{...attachments}
	></div>
{/if}
