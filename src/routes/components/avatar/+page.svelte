<script lang="ts">
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const sizes = ['small', 'normal', 'large'] as const;
	const user = {
		name: 'Guillermo Rauch',
		avatar: 'https://avatars.githubusercontent.com/rauchg?s=64',
		i: 'e'
	};
	const user2 = {
		name: 'Guillermo Rauch',
		avatar: undefined
	};
</script>

<DocPage
	title="Avatar"
	subtitle="Represents a user or entity with an image, initials, or fallback."
	component="Avatar"
	features={[
		'Image with initials fallback',
		'Configurable delay before reveal',
		'bindable loadingState',
		'Prefix and suffix overlays'
	]}
>
	<ComponentCard
		description="Avatar with image and delay before reveal."
		code={`<Avatar
	delay={1000}
	user={{
		name: 'Guillermo Rauch',
		avatar: 'https://avatars.githubusercontent.com/rauchg?s=64'
	}}
	size="normal"
/>`}
	>
		<Avatar delay={1000} {user} size="normal" />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Sizes with image and initials-only fallback.">
			<div class="flex items-center justify-center gap-4">
				{#each sizes as size}
					<Avatar delay={1000} {user} {size} />
				{/each}
			</div>
			<div class="flex items-center justify-center gap-4">
				{#each sizes as size}
					<Avatar user={user2} {size} />
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
