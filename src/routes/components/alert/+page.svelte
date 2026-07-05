<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { checkCircleIcon } from '$lib/components/Icons/checkCircle.js';
	import { xCircleIcon } from '$lib/components/Icons/xCircle.js';
	import { infoIcon } from '$lib/components/Icons/info.js';
	import { triangleIcon } from '$lib/components/Icons/triangle.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
</script>

<DocPage
	title="Alert"
	subtitle="Contextual banners that communicate status, warnings, or important messages."
	component="Alert"
	features={[
		'role=alert for live regions',
		'prefix, title, description, children slots',
		'color, variant, and size tokens',
		'Layout adapts when icon is omitted'
	]}
>
	<ComponentCard
		description="A basic alert with title and description slots."
		code={`<Alert>
	{#snippet title()}
		Heads up!
	{/snippet}
	{#snippet description()}
		This is a basic alert message.
	{/snippet}
</Alert>`}
	>
		<Alert>
			{#snippet title()}
				Heads up!
			{/snippet}
			{#snippet description()}
				This is a basic alert message.
			{/snippet}
		</Alert>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Basic alert with title and description.">
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
		</ComponentCard>

		<ComponentCard description="Alert with icon via the prefix slot.">
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
		</ComponentCard>

		<ComponentCard description="Success alert.">
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
		</ComponentCard>

		<ComponentCard description="Warning alert.">
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
		</ComponentCard>

		<ComponentCard description="Danger alert.">
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
		</ComponentCard>

		<ComponentCard description="Alert variants.">
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
		</ComponentCard>

		<ComponentCard description="Alert sizes.">
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
		</ComponentCard>

		<ComponentCard description="Alert colors.">
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
		</ComponentCard>

		<ComponentCard description="Alert with children slot only.">
			<div class="grid gap-4">
				<Alert color="info">
					{#snippet children()}
						Simple alert message without title or description slots.
					{/snippet}
				</Alert>
			</div>
		</ComponentCard>

		<ComponentCard description="Alert without icon — grid layout adjusts automatically.">
			<div class="grid gap-4">
				<Alert color="background" variant="soft">
					{#snippet title()}
						No Icon Alert
					{/snippet}
					{#snippet description()}
						The grid layout automatically adjusts when no icon is provided.
					{/snippet}
				</Alert>
			</div>
		</ComponentCard>

		<ComponentCard description="Alert with title only.">
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
		</ComponentCard>

		<ComponentCard description="Disabled alert.">
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
		</ComponentCard>
	{/snippet}
</DocPage>
