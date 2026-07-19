<script lang="ts">
	import Heading from '$lib/components/Heading/Heading.svelte';
	import type { Colors } from '$lib/types/theme.js';

	const colorList = {
		primary: {
			colors: [
				'bg-primary',
				'bg-primary-dark',
				'bg-primary-light',
				'bg-primary-lighter',
				'bg-primary-muted',
				'bg-primary-contrast'
			]
		},
		secondary: {
			colors: [
				'bg-secondary',
				'bg-secondary-dark',
				'bg-secondary-light',
				'bg-secondary-lighter',
				'bg-secondary-muted',
				'bg-secondary-contrast'
			]
		},
		success: {
			colors: [
				'bg-success',
				'bg-success-dark',
				'bg-success-light',
				'bg-success-lighter',
				'bg-success-muted',
				'bg-success-contrast'
			]
		},
		danger: {
			colors: [
				'bg-danger',
				'bg-danger-dark',
				'bg-danger-light',
				'bg-danger-lighter',
				'bg-danger-muted',
				'bg-danger-contrast'
			]
		},
		warning: {
			colors: [
				'bg-warning',
				'bg-warning-dark',
				'bg-warning-light',
				'bg-warning-lighter',
				'bg-warning-muted',
				'bg-warning-contrast'
			]
		},
		info: {
			colors: [
				'bg-info',
				'bg-info-dark',
				'bg-info-light',
				'bg-info-lighter',
				'bg-info-muted',
				'bg-info-contrast'
			]
		},
		background: {
			colors: [
				'bg-background',
				'bg-background-dark',
				'bg-background-light',
				'bg-background-lighter',
				'bg-background-muted',
				'bg-background-contrast'
			]
		},
		foreground: {
			text: 'Foreground color is the default text color used on top of a background color. Its primary use is to make text readable on a background or to make an element stand out.',
			colors: [
				'bg-foreground',
				'bg-foreground-dark',
				'bg-foreground-light',
				'bg-foreground-lighter',
				'bg-foreground-muted',
				'bg-foreground-contrast'
			]
		}
	} as {
		[key in Colors]: {
			colors: string[];
			text?: string;
		};
	};

	const surfaceInteractionRows = [
		{ name: 'background-dark', background: 'bg-background-dark', foreground: 'text-foreground' },
		{ name: 'background', background: 'bg-background', foreground: 'text-foreground' },
		{ name: 'background-light', background: 'bg-background-light', foreground: 'text-foreground' },
		{
			name: 'background-lighter',
			background: 'bg-background-lighter',
			foreground: 'text-foreground'
		}
	] as const;

	const semanticInteractionRows = [
		{ name: 'primary', background: 'bg-primary', foreground: 'text-primary-contrast' },
		{ name: 'secondary', background: 'bg-secondary', foreground: 'text-secondary-contrast' },
		{ name: 'success', background: 'bg-success', foreground: 'text-success-contrast' },
		{ name: 'danger', background: 'bg-danger', foreground: 'text-danger-contrast' },
		{ name: 'warning', background: 'bg-warning', foreground: 'text-warning-contrast' },
		{ name: 'info', background: 'bg-info', foreground: 'text-info-contrast' },
		{ name: 'foreground', background: 'bg-foreground', foreground: 'text-foreground-contrast' }
	] as const;
</script>

{#snippet interactionCell(
	background: string,
	foreground: string,
	label: string,
	overlay?: 'hover' | 'pressed'
)}
	<div
		class={`${background} ${foreground} raised relative isolate flex h-16 items-center justify-center overflow-hidden rounded-lg text-sm font-medium`}
	>
		{#if overlay}
			<span
				class="pointer-events-none absolute inset-0 {overlay === 'hover'
					? 'bg-[var(--color-overlay-hover)]'
					: 'bg-[var(--color-overlay-pressed)]'}"
			></span>
		{/if}
		<span class="relative">{label}</span>
	</div>
{/snippet}

<div class="grid gap-4 p-10">
	{#each Object.entries(colorList) as [c, { colors, text }] (c)}
		<div class="grid gap-2">
			<Heading class="text-foreground">{c}</Heading>
			<p class="text-foreground">
				{text}
			</p>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-6">
				{#each colors as color (color)}
					{@const name = color.split('-')[1]}
					<div class="h-auto rounded-lg">
						<div class={`w-full ${color} raised h-[100px] rounded-lg`}></div>
						<div class="text-foreground p-2 text-center text-sm">
							{color.replace('bg-', '').replace(`${color}-`, '')}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div class="mt-6 grid gap-3">
		<Heading class="text-foreground">Elevation and interaction</Heading>
		<p class="max-w-3xl text-sm text-foreground-muted">
			Background grades define resting elevation. Hover and pressed composite the global state
			layers over that same resting color.
		</p>
		<div class="grid grid-cols-[minmax(9rem,1fr)_repeat(3,minmax(6rem,1fr))] gap-2 text-sm">
			<div></div>
			<div class="p-2 text-center text-foreground-muted">Rest</div>
			<div class="p-2 text-center text-foreground-muted">Hover</div>
			<div class="p-2 text-center text-foreground-muted">Pressed</div>
			{#each surfaceInteractionRows as row (row.name)}
				<div class="flex items-center font-medium text-foreground">{row.name}</div>
				{@render interactionCell(row.background, row.foreground, 'Rest')}
				{@render interactionCell(row.background, row.foreground, 'Hover', 'hover')}
				{@render interactionCell(row.background, row.foreground, 'Pressed', 'pressed')}
			{/each}
		</div>
	</div>

	<div class="mt-6 grid gap-3">
		<Heading class="text-foreground">Semantic interaction</Heading>
		<div class="grid grid-cols-[minmax(9rem,1fr)_repeat(3,minmax(6rem,1fr))] gap-2 text-sm">
			<div></div>
			<div class="p-2 text-center text-foreground-muted">Rest</div>
			<div class="p-2 text-center text-foreground-muted">Hover</div>
			<div class="p-2 text-center text-foreground-muted">Pressed</div>
			{#each semanticInteractionRows as row (row.name)}
				<div class="flex items-center font-medium text-foreground">{row.name}</div>
				{@render interactionCell(row.background, row.foreground, 'Rest')}
				{@render interactionCell(row.background, row.foreground, 'Hover', 'hover')}
				{@render interactionCell(row.background, row.foreground, 'Pressed', 'pressed')}
			{/each}
		</div>
	</div>

	<div class="grid gap-2">
		{#each colorList.background.colors as bgColor (bgColor)}
			<Heading class="text-foreground">Foreground on background {bgColor}</Heading>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-6">
				{#each colorList.foreground.colors as color (color)}
					<div class="h-auto rounded-lg">
						<div
							class={`${bgColor} text-${color.replace('bg-', '').replace(`${color}-`, '')} raised  flex h-[100px] w-full items-center justify-center rounded-lg`}
						>
							foreground-{color.replace('bg-', '').replace(`${color}-`, '')}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
