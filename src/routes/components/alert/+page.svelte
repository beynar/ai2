<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import { checkCircleIcon } from '$lib/components/Icons/checkCircle.js';
	import { xCircleIcon } from '$lib/components/Icons/xCircle.js';
	import { infoIcon } from '$lib/components/Icons/info.js';
	import { triangleIcon } from '$lib/components/Icons/triangle.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
</script>

<div class="grid gap-10">
	<!-- Basic Alert -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Basic Alert</h2>
		<div class="grid gap-4">
			<Alert>
				{#snippet title()}
					Heads up!
				{/snippet}
				{#snippet description()}
					This is a basic alert message.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Alert with Icon -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert with Icon</h2>
		<div class="grid gap-4">
			<Alert color="info">
				{#snippet prefix()}
					{@render infoIcon()}
				{/snippet}
				{#snippet title()}
					Information
				{/snippet}
				{#snippet description()}
					This alert includes an icon.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Success Alert -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Success Alert</h2>
		<div class="grid gap-4">
			<Alert color="success">
				{#snippet prefix()}
					{@render checkCircleIcon()}
				{/snippet}
				{#snippet title()}
					Success!
				{/snippet}
				{#snippet description()}
					Your changes have been saved successfully.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Warning Alert -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Warning Alert</h2>
		<div class="grid gap-4">
			<Alert color="warning">
				{#snippet prefix()}
					{@render triangleIcon()}
				{/snippet}
				{#snippet title()}
					Warning
				{/snippet}
				{#snippet description()}
					Please review your input before proceeding.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Danger Alert -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Danger Alert</h2>
		<div class="grid gap-4">
			<Alert color="danger">
				{#snippet prefix()}
					{@render xCircleIcon()}
				{/snippet}
				{#snippet title()}
					Error
				{/snippet}
				{#snippet description()}
					Something went wrong. Please try again.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Alert Variants -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert Variants</h2>
		<div class="grid gap-4">
			{#each variants as variant}
				<Alert {variant} color="primary">
					{#snippet prefix()}
						{@render infoIcon()}
					{/snippet}
					{#snippet title()}
						{variant} Alert
					{/snippet}
					{#snippet description()}
						This is a {variant} variant alert.
					{/snippet}
				</Alert>
			{/each}
		</div>
	</div>

	<!-- Alert Sizes -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert Sizes</h2>
		<div class="grid gap-4">
			{#each sizes as size}
				<Alert {size} color="info">
					{#snippet prefix()}
						{@render infoIcon()}
					{/snippet}
					{#snippet title()}
						{size} Alert
					{/snippet}
					{#snippet description()}
						This is a {size} size alert.
					{/snippet}
				</Alert>
			{/each}
		</div>
	</div>

	<!-- Alert Colors -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert Colors</h2>
		<div class="grid gap-4">
			{#each colors as color}
				<Alert {color}>
					{#snippet prefix()}
						{@render infoIcon()}
					{/snippet}
					{#snippet title()}
						{color} Alert
					{/snippet}
					{#snippet description()}
						This is a {color} colored alert.
					{/snippet}
				</Alert>
			{/each}
		</div>
	</div>

	<!-- Alert with Children Only -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert with Children Only</h2>
		<div class="grid gap-4">
			<Alert color="info">
				{#snippet children()}
					Simple alert message without title or description slots.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Alert without Icon -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert without Icon</h2>
		<div class="grid gap-4">
			<Alert color="surface" variant="soft">
				{#snippet title()}
					No Icon Alert
				{/snippet}
				{#snippet description()}
					The grid layout automatically adjusts when no icon is provided.
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Alert with Title Only -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Alert with Title Only</h2>
		<div class="grid gap-4">
			<Alert color="primary">
				{#snippet prefix()}
					{@render infoIcon()}
				{/snippet}
				{#snippet title()}
					Alert Title Only
				{/snippet}
			</Alert>
		</div>
	</div>

	<!-- Disabled Alert -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Disabled Alert</h2>
		<div class="grid gap-4">
			<Alert disabled={true} color="info">
				{#snippet prefix()}
					{@render infoIcon()}
				{/snippet}
				{#snippet title()}
					Disabled Alert
				{/snippet}
				{#snippet description()}
					This alert is disabled and non-interactive.
				{/snippet}
			</Alert>
		</div>
	</div>
</div>
