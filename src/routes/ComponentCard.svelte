<script lang="ts">
	// import Pattern from '$lib/Components/Patterns/Pattern.svelte';

	let {
		children,
		title = 'title',
		class: className = '',
		description,
		...attachments
	}: {
		children: Snippet;
		description?: string;
		class?: string;
		title?: string;
		[key: string]: any;
	} = $props();
	// import Heading from '$lib/Components/Typography/Heading.svelte';
	// import Text from '$lib/Components/Typography/Text.svelte';
	import type { Snippet } from 'svelte';
</script>

<div {...attachments} class="grid gap-10">
	<!-- <div>
		<Heading>{title}</Heading>
		{#if description}
			<Text>{description}</Text>
		{/if}
	</div> -->
	<div
		class="border-surface-muted relative flex min-h-[400px] w-full max-w-[90vw] items-center justify-center gap-4 rounded border {className}"
	>
		<!-- <Pattern
			size={10}
			opacity={0.5}
			patternOpacity={0.05}
			maskIntensity={100}
			type="grids"
			color="contrast"
		/> -->
		<div class="z-10 mx-auto flex h-full w-full max-w-full items-center justify-center gap-4">
			{@render children()}
		</div>
	</div>

	<!-- <div class="grid grid-cols-4">
		<div class="grid col-span-3">
			<Features
				features={[
					'Full keyboard navigation.',
					'Supports horizontal/vertical orientation.',
					'Support single and multiple pressed buttons.',
					'Can be controlled or uncontrolled.'
				]}
			/>
		</div>
		<div>
			<Links source={'https://uy.dev'} />
		</div>
	</div> -->
</div>
