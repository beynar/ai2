<script lang="ts">
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import AvatarGroup from '$lib/components/Avatar/AvatarGroup.svelte';
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
		'AvatarGroup with max overflow count'
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

		<ComponentCard description="AvatarGroup stacks avatars with +N overflow count.">
			<div class="flex items-center justify-center gap-4">
				{#each sizes as size}
					<AvatarGroup
						{size}
						max={4}
						items={Array.from({ length: 11 }).map(() => ({
							avatar: 'https://avatars.githubusercontent.com/rauchg?s=64',
							name: 'Guillermo Rauchg',
							i: 'e'
						}))}
					></AvatarGroup>
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
