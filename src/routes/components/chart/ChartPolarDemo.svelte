<script lang="ts">
	import { Chart } from 'svelai/chart';

	type Capability = {
		name: string;
		score: number;
	};

	const capabilities: readonly Capability[] = [
		{ name: 'Research', score: 82 },
		{ name: 'Design', score: 74 },
		{ name: 'Delivery', score: 91 },
		{ name: 'Quality', score: 78 },
		{ name: 'Operations', score: 68 }
	];

	const marks = [
		{
			type: 'polar',
			angle: 'name',
			radius: 'score',
			domain: [0, 100],
			area: true,
			line: true,
			points: true,
			color: 'secondary'
		}
	] as const;
</script>

<Chart
	data={capabilities}
	{marks}
	ariaLabel="Product capability profile"
	ariaDescription="A radar chart compares five product capabilities on a zero to one hundred scale."
	initialDimensions={{ width: 720, height: 480 }}
	class="w-full"
/>
