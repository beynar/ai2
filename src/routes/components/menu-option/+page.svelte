<script lang="ts">
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

<div class="space-y-8 p-8">
	<h1 class="mb-8 text-4xl font-bold">MenuOption Component</h1>

	<!-- Basic Examples -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Basic Menu Items</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 space-y-1 border p-1">
			<MenuOption title="Simple Menu Item" />

			<MenuOption title="With Description" description="This is a helpful description" />
		</div>
	</section>

	<!-- With Icons -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">With Icons</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 space-y-1 border p-1">
			<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />

			<MenuOption prefix={gearIcon} suffix={caretRightIcon} title="Settings" />

			<MenuOption prefix={questionIcon} title="Help & Support" />
		</div>
	</section>

	<!-- Different Sizes -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Sizes</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 space-y-1 border p-1">
			<MenuOption size="small" prefix={userIcon} title="Small Menu Item" />

			<MenuOption size="normal" prefix={userIcon} title="Normal Menu Item" />

			<MenuOption size="large" prefix={userIcon} title="Large Menu Item" />
		</div>
	</section>

	<!-- Different Colors -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Colors</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 space-y-1 border p-1">
			<MenuOption color="primary" title="Primary" />

			<MenuOption color="secondary" title="Secondary" />

			<MenuOption color="success" prefix={checkIcon} title="Approve" />

			<MenuOption color="danger" prefix={signOutIcon} title="Delete" />

			<MenuOption color="info" title="Info" />
		</div>
	</section>

	<!-- Interactive -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Interactive</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 space-y-1 border p-1">
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
	</section>

	<!-- Complete Menu Example -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Complete Menu Example</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-1">
			<MenuOption prefix={userIcon} title="John Doe" description="john@example.com" />

			<div class="border-surface-muted my-1 border-t"></div>

			<MenuOption prefix={userIcon} title="Profile" description="View and edit your profile" />

			<MenuOption prefix={gearIcon} title="Settings" description="Manage your preferences" />

			<MenuOption prefix={questionIcon} title="Help & Support" />

			<div class="border-surface-muted my-1 border-t"></div>

			<MenuOption color="danger" prefix={signOutIcon} title="Log Out" />
		</div>
	</section>
</div>
