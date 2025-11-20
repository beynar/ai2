<script lang="ts">
	import Skeleton from '$lib/components/Skeleton/Skeleton.svelte';
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<div class="grid w-full gap-8">
			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Basic Skeleton</h2>
				<Skeleton />
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Color Variants</h2>
				<div class="space-y-2">
					<Skeleton color="primary" class="h-4 w-full" />
					<Skeleton color="secondary" class="h-4 w-full" />
					<Skeleton color="danger" class="h-4 w-full" />
					<Skeleton color="success" class="h-4 w-full" />
					<Skeleton color="warning" class="h-4 w-full" />
					<Skeleton color="info" class="h-4 w-full" />
					<Skeleton color="contrast" class="h-4 w-full" />
					<Skeleton color="surface" class="h-4 w-full" />
				</div>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Custom Size</h2>
				<Skeleton class="h-12 w-full" />
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Text Line Skeletons</h2>
				<div class="space-y-2">
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-5/6" />
					<Skeleton class="h-4 w-4/6" />
				</div>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Circular Skeleton (for avatars)</h2>
				<Skeleton class="h-12 w-12 rounded-full" />
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Card Skeleton</h2>
				<div class="space-y-4">
					<Skeleton class="h-48 w-full rounded-lg" />
					<div class="space-y-2">
						<Skeleton class="h-4 w-full" />
						<Skeleton class="h-4 w-3/4" />
					</div>
				</div>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Table Row Skeleton</h2>
				<div class="flex gap-4">
					<Skeleton class="h-10 w-10 rounded" />
					<Skeleton class="h-10 flex-1" />
					<Skeleton class="h-10 w-24" />
				</div>
			</div>

			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Multiple Skeletons</h2>
				<div class="space-y-4">
					{#each { length: 3 } as _}
						<Skeleton class="h-20 w-full" />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

