<script lang="ts">
	import Heading from '$lib/Components/Heading/Heading.svelte';
	import type { Colors } from '$lib/types/theme.js';

	const colorList = {
		primary: {
			colors: [
				'bg-primary',
				'bg-primary-dark',
				'bg-primary-light',
				'bg-primary-lighter',
				'bg-primary-muted',
				'bg-primary-fg'
			]
		},
		secondary: {
			colors: [
				'bg-secondary',
				'bg-secondary-dark',
				'bg-secondary-light',
				'bg-secondary-lighter',
				'bg-secondary-muted',
				'bg-secondary-fg'
			]
		},
		success: {
			colors: [
				'bg-success',
				'bg-success-dark',
				'bg-success-light',
				'bg-success-lighter',
				'bg-success-muted',
				'bg-success-fg'
			]
		},
		danger: {
			colors: [
				'bg-danger',
				'bg-danger-dark',
				'bg-danger-light',
				'bg-danger-lighter',
				'bg-danger-muted',
				'bg-danger-fg'
			]
		},
		warning: {
			colors: [
				'bg-warning',
				'bg-warning-dark',
				'bg-warning-light',
				'bg-warning-lighter',
				'bg-warning-muted',
				'bg-warning-fg'
			]
		},
		info: {
			colors: [
				'bg-info',
				'bg-info-dark',
				'bg-info-light',
				'bg-info-lighter',
				'bg-info-muted',
				'bg-info-fg'
			]
		},
		surface: {
			colors: [
				'bg-surface',
				'bg-surface-dark',
				'bg-surface-light',
				'bg-surface-lighter',
				'bg-surface-muted',
				'bg-surface-fg'
			]
		},
		contrast: {
			text: 'Contrast color is used to contrast text with a surface color. Its primary use is to make text readable on a background or to make an element stand out.',
			colors: [
				'bg-contrast',
				'bg-contrast-dark',
				'bg-contrast-light',
				'bg-contrast-lighter',
				'bg-contrast-muted',
				'bg-contrast-fg'
			]
		}
	} as {
		[key in Colors]: {
			colors: string[];
			text?: string;
		};
	};
</script>

<div class="grid gap-4 p-10">
	{#each Object.entries(colorList) as [c, { colors, text }] (c)}
		<div class="grid gap-2">
			<Heading class="text-contrast">{c}</Heading>
			<p class="text-contrast">
				{text}
			</p>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-6">
				{#each colors as color (color)}
					{@const name = color.split('-')[1]}
					<div class="h-auto rounded-lg">
						<div class={`h-2/3 w-full ${color} raised h-[100px] rounded-lg`}></div>
						<div class="text-contrast p-2 text-center text-sm">
							{color.replace('bg-', '').replace(`${color}-`, '')}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
