<script lang="ts">
	import { onDestroy } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Slider from '../Form/Slider/Slider.svelte';
	import { speakerHighIcon } from '../Icons/speakerHigh.js';
	import { speakerLowIcon } from '../Icons/speakerLow.js';
	import { speakerSlashIcon } from '../Icons/speakerSlash.js';
	import Popover from '../Popover/Popover.svelte';
	import type { PopoverState } from '../Popover/popover.state.svelte.js';
	import { tooltip } from '../Tooltip/tooltip.svelte.js';
	import { isMediaEffectivelyMuted } from './mediaVolume.js';
	import type {
		MediaVolumeControlButtonPayload,
		MediaVolumeControlProps,
		MediaVolumeControlTriggerPayload
	} from './mediaVolumeControl.props.js';
	import { useMediaVolumeControlTheme } from './mediaVolumeControl.theme.js';

	let {
		volume,
		muted,
		onVolumeChange,
		onToggleMuted,
		mode = 'popover',
		volumeStep = 0.05,
		disabled = false,
		size = 'normal',
		color = 'primary',
		orientation,
		open = $bindable(false),
		onOpenChange,
		position = 'bottom',
		offset = 8,
		popoverSize,
		mobileSheet = true,
		unmuteOnTrigger = true,
		label = 'Volume',
		mutedIcon = speakerSlashIcon,
		lowVolumeIcon = speakerLowIcon,
		highVolumeIcon = speakerHighIcon,
		lowVolumeThreshold = 0.5,
		class: className,
		popoverClass,
		panelClass,
		sliderClass,
		sliderTheme,
		trigger: triggerSnippet,
		toggleButton: toggleButtonSnippet,
		theme
	}: MediaVolumeControlProps = $props();

	const classes = $derived(useMediaVolumeControlTheme(theme));
	const resolvedOrientation = $derived(
		orientation ?? (mode === 'popover' ? 'vertical' : 'horizontal')
	);
	const isEffectivelyMuted = $derived(isMediaEffectivelyMuted({ volume, muted }));
	const volumePercentage = $derived(isEffectivelyMuted ? 0 : volume * 100);
	const roundedVolume = $derived(Math.round(volume * 100));
	const triggerLabel = $derived(isEffectivelyMuted ? 'Unmute' : `${label} ${roundedVolume}%`);
	const toggleLabel = $derived(isEffectivelyMuted ? 'Unmute' : 'Mute');
	const volumeIcon = $derived(
		isEffectivelyMuted ? mutedIcon : volume < lowVolumeThreshold ? lowVolumeIcon : highVolumeIcon
	);
	const defaultSliderTheme = $derived({
		root: {
			base:
				resolvedOrientation === 'vertical' ? 'w-auto justify-items-center gap-0' : 'w-full gap-0'
		},
		header: {
			base: 'sr-only'
		},
		label: {
			base: 'sr-only'
		},
		inputContainer: {
			base: resolvedOrientation === 'vertical' ? 'w-auto gap-0' : 'w-full gap-0'
		},
		control: {
			base:
				resolvedOrientation === 'vertical' ? 'w-auto flex-col items-center gap-2' : 'w-full gap-2'
		},
		track: {
			base:
				resolvedOrientation === 'vertical'
					? 'h-36 focus-visible:ring-offset-0'
					: 'min-w-0 focus-visible:ring-offset-0'
		},
		valueLabels: {
			base: resolvedOrientation === 'vertical' ? 'mt-1 ml-0 justify-center' : 'ml-1'
		},
		valueLabel: {
			base: 'min-w-14 text-center'
		}
	});
	let lastReportedOpen = false;

	$effect(() => {
		if (disabled) open = false;
	});

	$effect(() => {
		if (mode !== 'popover' || lastReportedOpen === open) return;
		lastReportedOpen = open;
		onOpenChange?.(open);
	});

	onDestroy(() => {
		if (lastReportedOpen) onOpenChange?.(false);
	});

	function handleSliderChange(nextValue: number | number[]) {
		const nextVolume = Array.isArray(nextValue) ? (nextValue[0] ?? 0) : nextValue;
		onVolumeChange(nextVolume / 100);
	}

	function handleTriggerClick(popover: PopoverState) {
		if (unmuteOnTrigger && isEffectivelyMuted) {
			onToggleMuted();
			popover.open();
			return;
		}

		popover.toggle();
	}

	function getTogglePayload(): MediaVolumeControlButtonPayload {
		return {
			label: toggleLabel,
			icon: volumeIcon,
			active: isEffectivelyMuted,
			pressed: isEffectivelyMuted,
			disabled,
			onClick: onToggleMuted
		};
	}

	function getTriggerPayload(popover: PopoverState): MediaVolumeControlTriggerPayload {
		return {
			...getTogglePayload(),
			label: triggerLabel,
			isOpen: popover.isOpen,
			reference: popover.reference,
			ariaHaspopup: 'dialog',
			ariaExpanded: popover.isOpen,
			onClick: () => handleTriggerClick(popover)
		};
	}
</script>

{#snippet defaultTrigger(context: MediaVolumeControlTriggerPayload)}
	<Button
		squared
		variant="ghost"
		color={context.active ? color : 'background'}
		{size}
		label={context.label}
		disabled={context.disabled}
		aria-haspopup={context.ariaHaspopup}
		aria-expanded={context.ariaExpanded}
		data-active={context.active ? 'true' : undefined}
		aria-pressed={context.pressed}
		prefix={context.icon}
		onClick={context.onClick}
		{@attach context.reference}
		{@attach tooltip({ content: context.label, position: 'top', size: 'small' })}
	/>
{/snippet}

{#snippet defaultToggleButton(context: MediaVolumeControlButtonPayload)}
	<Button
		squared
		variant="ghost"
		color={context.active ? color : 'background'}
		{size}
		label={context.label}
		disabled={context.disabled}
		data-active={context.active ? 'true' : undefined}
		aria-pressed={context.pressed}
		prefix={context.icon}
		onClick={context.onClick}
		{@attach tooltip({ content: context.label, position: 'top', size: 'small' })}
	/>
{/snippet}

{#snippet panel()}
	<div
		data-slot="media-volume-panel"
		class={classes.panel({ orientation: resolvedOrientation, className: panelClass })}
	>
		{#if toggleButtonSnippet}
			{@render toggleButtonSnippet(getTogglePayload())}
		{:else}
			{@render defaultToggleButton(getTogglePayload())}
		{/if}

		<div
			data-slot="media-volume-slider"
			class={classes.slider({ orientation: resolvedOrientation, className: sliderClass })}
		>
			<Slider
				{label}
				value={volumePercentage}
				min={0}
				max={100}
				step={Math.max(1, volumeStep * 100)}
				orientation={resolvedOrientation}
				{disabled}
				showValue
				formatValue={(nextValue) => `${Math.round(nextValue)}%`}
				thumbLabels={[label]}
				{color}
				variant="thick"
				{size}
				theme={sliderTheme ?? defaultSliderTheme}
				onChange={handleSliderChange}
			/>
		</div>
	</div>
{/snippet}

<div data-slot="media-volume-control" class={classes.root({ mode, className })}>
	{#if mode === 'popover'}
		<Popover
			bind:open
			{position}
			{offset}
			size={popoverSize}
			lockScroll={false}
			closeOnClickOutside
			closeOnEscape
			{mobileSheet}
			class={classes.popoverPanel({ className: popoverClass })}
		>
			{#snippet trigger(popover)}
				{#if triggerSnippet}
					{@render triggerSnippet(getTriggerPayload(popover))}
				{:else}
					{@render defaultTrigger(getTriggerPayload(popover))}
				{/if}
			{/snippet}

			{#snippet children()}
				{@render panel()}
			{/snippet}
		</Popover>
	{:else}
		{@render panel()}
	{/if}
</div>
