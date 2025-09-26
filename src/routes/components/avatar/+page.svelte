<script lang="ts">
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import AvatarGroup from '$lib/components/Avatar/AvatarGroup.svelte';

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

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid h-[400px] w-full max-w-[90vw] items-center rounded border"
	>
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
	</div>

	<div>
		<div
			class="border-surface-muted relative grid h-[400px] w-full max-w-[90vw] items-center rounded border"
		>
			<div class="flex items-center justify-center gap-4">
				{#each sizes as size}
					<AvatarGroup
						{size}
						max={4}
						users={Array.from({ length: 11 }).map(() => ({
							avatar: 'https://avatars.githubusercontent.com/rauchg?s=64',
							name: 'Guillermo Rauchg',
							i: 'e'
						}))}
					></AvatarGroup>
				{/each}
			</div>
		</div>
	</div>
</div>
