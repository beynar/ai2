<script lang="ts">
	import Meter from '$lib/components/Meter/Meter.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';

	let value = $state(20);
	let value2 = $state(20);

	$effect(() => {
		return;
		const interval = setInterval(() => {
			if (value < 100) {
				value = value + 10;
			} else {
				value = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="grid gap-10">
	<div
		class="border-surface-lighter relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<div class="grid gap-4">
			<Meter
				size="small"
				value={{ value }}
				steps={[
					{ label: 'danger', start: 0, end: 25, color: 'danger' },
					{ label: 'warning', start: 25, end: 50, color: 'warning' },
					{ label: 'success', start: 50, end: 75, color: 'success' },
					{ label: 'info', start: 75, end: 100, color: 'info' }
				]}
			></Meter>
		</div>
	</div>
</div>
