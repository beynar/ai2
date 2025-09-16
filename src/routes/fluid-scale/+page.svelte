<script lang="ts">
	import {
		getTypeScale,
		getTypeScaleFromPreset,
		typeScalePresets
	} from '$lib/tailwind/typeScale.js';

	// Example of custom type scale
	const customScale = getTypeScale({
		baseMinPx: 14,
		baseMaxPx: 20,
		scale: 'perfectFourth'
	});

	const presetScale = getTypeScaleFromPreset('comfortable');
</script>

<div class="space-y-8 p-8">
	<div>
		<h1 class="mb-4 text-2xl font-bold">Fluid Type Scale Demo</h1>
		<p class="mb-8 text-gray-600">
			Resize your browser to see how the text scales fluidly between mobile and desktop sizes.
		</p>
	</div>

	<div>
		<h2 class="mb-4 text-xl font-semibold">Current Scale (default preset)</h2>
		<div class="space-y-2">
			<div class="text-xs">XS: je suis un texte en XS (≥12px)</div>
			<div class="text-s">S: je suis un texte en S (≥12px)</div>
			<div class="text-base">BASE: je suis un texte en BASE (16px-18px)</div>
			<div class="text-md">MD: je suis un texte en MD</div>
			<div class="text-lg">LG: je suis un texte en LG</div>
			<div class="text-xl">XL: je suis un texte en XL</div>
			<div class="text-2xl">2XL: je suis un texte en 2XL</div>
			<div class="text-3xl">3XL: je suis un texte en 3XL</div>
			<div class="text-4xl">4XL: je suis un texte en 4XL</div>
		</div>
	</div>

	<div>
		<h2 class="mb-4 text-xl font-semibold">Available Presets</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each Object.entries(typeScalePresets) as [name, config]}
				<div class="rounded-lg border p-4">
					<h3 class="font-medium capitalize">{name}</h3>
					<p class="text-sm text-gray-600">
						Base: {config.baseMinPx}px - {config.baseMaxPx}px
						<br />Scale: {config.scale}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-4 text-xl font-semibold">Usage Examples</h2>
		<pre class="overflow-x-auto rounded bg-gray-100 p-4 text-sm"><code
				>{`// Simple preset usage
fontSize: getTypeScaleFromPreset('default')

// Custom configuration
fontSize: getTypeScale({
  baseMinPx: 16,    // Base size on mobile
  baseMaxPx: 18,    // Base size on desktop
  scale: 'majorThird'
})

// Override preset
fontSize: getTypeScaleFromPreset('comfortable', {
  baseMinPx: 14,    // Override just the mobile size
  scale: 'perfectFourth'  // Override the scale
})`}</code
			></pre>
	</div>
</div>
