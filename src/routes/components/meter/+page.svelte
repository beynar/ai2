<script lang="ts">
	import Meter from '$lib/components/Meter/Meter.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { appWindowIcon } from '$lib/components/Icons/appWindow.js';
	import { fileTextIcon } from '$lib/components/Icons/fileText.js';
	import { filmStripIcon } from '$lib/components/Icons/filmStrip.js';

	let value1 = $state(65);
	let value2 = $state(30);
	let value3 = $state(85);
	let animatedValue = $state(0);

	// Animated meter that cycles through values
	$effect(() => {
		const interval = setInterval(() => {
			if (animatedValue < 100) {
				animatedValue = animatedValue + 5;
			} else {
				animatedValue = 0;
			}
		}, 500);

		return () => clearInterval(interval);
	});
</script>

<div class="grid gap-10 p-10">
	<h1 class="text-3xl font-bold">Meter Component Examples</h1>

	<!-- Example 0: Simple Progress Bars with Different Sizes -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">0. Progress Bars - Different Sizes</h2>
		<div class="grid gap-6">
			<Meter value={{ value: 60 }} size="small" showIndicatorAs={undefined} />
			<Meter value={{ value: 60 }} size="normal" showIndicatorAs={undefined} />
			<Meter value={{ value: 60 }} size="large" showIndicatorAs={undefined} />
		</div>
	</div>

	<!-- Example 1: Simple Meter with Percentage -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">1. Simple Meter with Percentage</h2>
		<Meter value={{ value: value1 }} label="Progress" helper="65% complete" />
	</div>

	<!-- Example 2: Meter with Value Display -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">2. Meter with Value Display</h2>
		<Meter
			value={{ value: value2 }}
			showIndicatorAs="value"
			label="Score"
			description="Current score out of 100"
		/>
	</div>

	<!-- Example 3: Meter with Steps/Ranges -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">3. Meter with Colored Steps</h2>
		<Meter
			value={{ value: value3 }}
			label="Performance Level"
			helper="Excellent!"
			steps={[
				{ label: 'Poor', start: 0, end: 25, color: 'danger' },
				{ label: 'Fair', start: 25, end: 50, color: 'warning' },
				{ label: 'Good', start: 50, end: 75, color: 'success' },
				{ label: 'Excellent', start: 75, end: 100, color: 'info' }
			]}
		/>
	</div>

	<!-- Example 4: Multiple Meters (Stacked) -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">4. Multiple Stacked Meters</h2>
		<Meter
			value={[
				{ value: 40, color: 'info' },
				{ value: 30, color: 'success' },
				{ value: 20, color: 'warning' }
			]}
			label="Resource Usage"
			helper="Total: 90%"
		/>
	</div>

	<!-- Example 5: Meter with Legend -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">5. Meter with Legend</h2>
		<Meter
			value={[
				{ value: 19, color: 'info', label: 'System', icon: gearIcon },
				{ value: 6, color: 'danger', label: 'Apps', icon: appWindowIcon },
				{ value: 9, color: 'warning', label: 'Documents', icon: fileTextIcon },
				{
					value: 33,
					color: 'success',
					label: 'Multimedia',
					icon: filmStripIcon,
					position: 'bottom'
				}
			]}
			showLegend={true}
			label="Storage Usage"
			helper="Total: 67%"
		/>
	</div>

	<!-- Example 6: Animated Meter -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">6. Animated Meter</h2>
		<Meter
			value={{ value: animatedValue, color: 'info' }}
			label="Loading Progress"
			helper="Watch it animate!"
			stiffness={0.1}
			damping={0.8}
		/>
	</div>

	<!-- Example 7: Small Size Meter -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">7. Small Size Meter</h2>
		<Meter
			size="small"
			value={{ value: 45, color: 'success' }}
			label="Storage Used"
			helper="45GB of 100GB"
		/>
	</div>

	<!-- Example 8: Meter without Indicator -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">8. Meter without Indicator</h2>
		<Meter
			value={{ value: 75, color: 'warning' }}
			showIndicatorAs={undefined}
			label="Battery Level"
			description="Indicator text hidden"
		/>
	</div>

	<!-- Example 9: Meter with Different Colors -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">9. Different Colors</h2>
		<div class="grid gap-4">
			<Meter value={{ value: 60, color: 'danger' }} label="Danger" size="small" />
			<Meter value={{ value: 70, color: 'warning' }} label="Warning" size="small" />
			<Meter value={{ value: 80, color: 'success' }} label="Success" size="small" />
			<Meter value={{ value: 90, color: 'info' }} label="Info" size="small" />
		</div>
	</div>

	<!-- Example 10: Custom Range (0-1000) -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">10. Custom Range (0-1000)</h2>
		<Meter
			value={{ value: 750 }}
			min={0}
			max={1000}
			showIndicatorAs="value"
			label="Custom Scale"
			helper="750 points"
		/>
	</div>

	<!-- Example 11: Full Example with All Features -->
	<div class="border-surface-muted grid gap-4 rounded border p-6">
		<h2 class="text-xl font-semibold">11. Complete Example</h2>
		<Meter
			size="small"
			showLegend
			value={[
				{ value: 25, color: 'danger', position: 'top' },
				{ value: 35, color: 'success', position: 'top' }
			]}
			label="System Resources"
			helper="CPU & Memory Usage"
			description="Combined usage should stay below 80% Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
			steps={[
				{ label: 'Safe', start: 0, end: 60, color: 'success', position: 'bottom' },
				{ label: 'Caution', start: 60, end: 80, color: 'warning', position: 'bottom' },
				{ label: 'Critical', start: 80, end: 100, color: 'danger', position: 'bottom' }
			]}
			stiffness={0.15}
			soft={0.2}
		/>
		<Separator />
		<Meter
			showLegend
			value={[
				{ value: 25, color: 'danger', position: 'top' },
				{ value: 35, color: 'success', position: 'top' }
			]}
			label="System Resources"
			helper="CPU & Memory Usage"
			description="Combined usage should stay below 80 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.%"
			steps={[
				{ label: 'Safe', start: 0, end: 60, color: 'success', position: 'bottom' },
				{ label: 'Caution', start: 60, end: 80, color: 'warning', position: 'bottom' },
				{ label: 'Critical', start: 80, end: 100, color: 'danger', position: 'bottom' }
			]}
			stiffness={0.15}
			soft={0.2}
		/>
		<Separator />
		<Meter
			showLegend
			size="large"
			value={[
				{ value: 25, color: 'danger', position: 'top' },
				{ value: 35, color: 'success', position: 'top' }
			]}
			label="System Resources"
			helper="CPU & Memory Usage"
			description="Combined usage should stay below 80% Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
			steps={[
				{ label: 'Safe', start: 0, end: 60, color: 'success', position: 'bottom' },
				{ label: 'Caution', start: 60, end: 80, color: 'warning', position: 'bottom' },
				{ label: 'Critical', start: 80, end: 100, color: 'danger', position: 'bottom' }
			]}
			stiffness={0.15}
			soft={0.2}
		/>
	</div>
</div>
