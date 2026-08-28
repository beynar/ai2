<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import Code from '$lib/components/Code/Code.svelte';
	import Slider from '$lib/components/Form/Slider/Slider.svelte';
	import { Switch } from '$lib/components/Form/Switch/index.js';
	import SegmentedControl from '$lib/components/SegmentedControl/SegmentedControl.svelte';
	import type { TypeScalePreset } from '$lib/components/Theme/theme.designTokens.js';
	import { useRuntimeThemePlayground } from '../runtimeThemePlayground.svelte.js';
	import ColorPalettePicker from './ColorPalettePicker.svelte';
	import { runtimeColorPalettes } from './runtimeColorPalettes.js';
	import TokenPresetPicker from './TokenPresetPicker.svelte';

	const playground = useRuntimeThemePlayground();
	const typeScaleItems = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'default', label: 'Default' },
		{ value: 'comfortable', label: 'Comfortable' },
		{ value: 'large', label: 'Large' }
	] as const satisfies ReadonlyArray<{ value: TypeScalePreset; label: string }>;
	const configuration = $derived(`/* Runtime CSS variables */
--color-primary: ${runtimeColorPalettes[playground.palette].primary};
--color-secondary: ${runtimeColorPalettes[playground.palette].secondary};

/* Theme component prop */
designTokens={{
  light: {
    spacing: ${playground.spacing},
    radius: ${playground.radius},
    typeScale: '${playground.typeScale}',
    raisedWithBorder: ${playground.raisedWithBorder}
  },
  dark: {
    spacing: ${playground.spacing},
    radius: ${playground.radius},
    typeScale: '${playground.typeScale}',
    raisedWithBorder: ${playground.raisedWithBorder}
  }
}}`);

	const formatMultiplier = (value: number) => `${Number(value.toFixed(2))}×`;
</script>

<aside class="raised-md grid content-start gap-6 rounded-xl bg-surface-raised p-5">
	<div class="flex items-center justify-between gap-3">
		<div>
			<h2 class="text-lg font-semibold">Design tokens</h2>
			<p class="text-neutral/60 text-sm">Changes apply to the whole playground immediately.</p>
		</div>
		<Button size="small" variant="outline" onClick={() => playground.reset()}>Reset</Button>
	</div>

	<TokenPresetPicker />
	<ColorPalettePicker />

	<div class="border-neutral-muted grid gap-5 border-t pt-5">
		<Slider
			label="Spacing"
			bind:value={playground.spacing}
			min={0.5}
			max={1.5}
			step={0.05}
			showValue
			formatValue={formatMultiplier}
		/>
		<Slider
			label="Radius"
			bind:value={playground.radius}
			min={0}
			max={2.5}
			step={0.05}
			showValue
			formatValue={formatMultiplier}
		/>
		<div class="grid gap-2">
			<span class="text-sm font-medium">Type scale</span>
			<SegmentedControl
				items={typeScaleItems}
				bind:value={playground.typeScale}
				size="small"
				ariaLabel="Type scale"
				class="w-full"
			/>
		</div>
		<Switch label="Raised borders" bind:value={playground.raisedWithBorder} />
	</div>

	<div class="grid min-w-0 gap-2">
		<span class="text-sm font-medium">Theme configuration</span>
		<Code language="svelte" code={configuration} />
	</div>
</aside>
