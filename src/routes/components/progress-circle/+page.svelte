<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { ProgressCircle } from '$lib/components/ProgressCircle/index.js';
	import { colors } from '$lib/utils/tokens.js';

	let progress = $state(35);
</script>

<DocPage
	title="Progress circle"
	subtitle="Determinate circular progress indicator."
	component="ProgressCircle"
	features={[
		'Animated value changes',
		'Visible track',
		'size tokens or numeric pixel size',
		'Semantic color tokens'
	]}
>
	<ComponentCard
		description="Progress value animates when it changes."
		code={`<ProgressCircle value={35} />
<ProgressCircle value={65} size="large" />
<ProgressCircle value={80} size={56} />`}
		class="!min-h-fit"
	>
		<div class="grid gap-6">
			<div class="flex flex-wrap items-center justify-center gap-8">
				<ProgressCircle value={progress} size="small" label="Small progress" />
				<ProgressCircle value={progress} label="Normal progress" />
				<ProgressCircle value={progress} size="large" label="Large progress" />
				<ProgressCircle value={progress} size={56} label="Numeric progress" />
			</div>
			<div class="flex items-center justify-center gap-2">
				<button
					class="border-background-muted bg-background text-foreground hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm"
					onclick={() => (progress = 20)}
				>
					20
				</button>
				<button
					class="border-background-muted bg-background text-foreground hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm"
					onclick={() => (progress = 65)}
				>
					65
				</button>
				<button
					class="border-background-muted bg-background text-foreground hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm"
					onclick={() => (progress = 90)}
				>
					90
				</button>
			</div>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Semantic color tokens." class="!min-h-fit">
			<div class="flex flex-wrap items-center justify-center gap-6">
				{#each colors as color}
					<ProgressCircle value={65} {color} label={`${color} progress`} />
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
