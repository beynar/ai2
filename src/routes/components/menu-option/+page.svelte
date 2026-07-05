<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { MenuOption } from '$lib/components/MenuOption/index.js';
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { signOutIcon } from '$lib/components/Icons/signOut.js';
	import { questionIcon } from '$lib/components/Icons/question.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';

	let clickCount = $state(0);
	let isHovered = $state(false);
</script>

<DocPage
	title="Menu option"
	subtitle="An individual selectable item within a menu."
	component="MenuOption"
	features={[
		'Auto button, link, or menuitem role',
		'aria-disabled and aria-selected support',
		'data-highlighted for keyboard focus',
		'Prefix, suffix, title, description slots'
	]}
>
	<ComponentCard
		description="Single item with icon, title, and description."
		code={`<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />`}
	>
		<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
			<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Basic menu items with optional description.">
			<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
				<MenuOption title="Simple Menu Item" />

				<MenuOption title="With Description" description="This is a helpful description" />
			</div>
		</ComponentCard>

		<ComponentCard description="Prefix and suffix icon slots.">
			<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
				<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />

				<MenuOption prefix={gearIcon} suffix={caretRightIcon} title="Settings" />

				<MenuOption prefix={questionIcon} title="Help & Support" />
			</div>
		</ComponentCard>

		<ComponentCard description="Small, normal, and large sizes.">
			<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
				<MenuOption size="small" prefix={userIcon} title="Small Menu Item" />

				<MenuOption size="normal" prefix={userIcon} title="Normal Menu Item" />

				<MenuOption size="large" prefix={userIcon} title="Large Menu Item" />
			</div>
		</ComponentCard>

		<ComponentCard description="Semantic color variants.">
			<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
				<MenuOption color="primary" title="Primary" />

				<MenuOption color="secondary" title="Secondary" />

				<MenuOption color="success" prefix={checkIcon} title="Approve" />

				<MenuOption color="danger" prefix={signOutIcon} title="Delete" />

				<MenuOption color="info" title="Info" />
			</div>
		</ComponentCard>

		<ComponentCard description="Click, hover, and link interactions.">
			<div class="bg-background rounded-xl border-background-muted w-64 space-y-1 border p-1">
				<MenuOption onClick={() => clickCount++} title="Clicked {clickCount} times" />

				<MenuOption
					onEnter={() => (isHovered = true)}
					onLeave={() => (isHovered = false)}
					title={isHovered ? 'Hovering!' : 'Hover over me'}
				/>

				<MenuOption
					href="/components/button"
					suffix={caretRightIcon}
					title="Go to Button Component"
				/>
			</div>
		</ComponentCard>

		<ComponentCard description="Complete menu with dividers and a danger action.">
			<div class="bg-background rounded-xl border-background-muted w-72 border p-1">
				<MenuOption prefix={userIcon} title="John Doe" description="john@example.com" />

				<div class="border-background-muted my-1 border-t"></div>

				<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />

				<MenuOption prefix={gearIcon} title="Settings" description="Manage your preferences" />

				<MenuOption prefix={questionIcon} title="Help & Support" />

				<div class="border-background-muted my-1 border-t"></div>

				<MenuOption color="danger" prefix={signOutIcon} title="Log Out" />
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
