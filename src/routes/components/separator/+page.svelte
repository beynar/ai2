<script lang="ts">
	import { Separator } from '$lib/components/Separator/index.js';
	import { MenuOption } from '$lib/components/MenuOption/index.js';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { signOutIcon } from '$lib/components/Icons/signOut.js';
</script>

<div class="space-y-8 p-8">
	<h1 class="mb-8 text-4xl font-bold">Separator Component</h1>

	<!-- Basic Examples -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Basic Separators</h2>
		<div class="space-y-4">
			<div>
				<p>Content above</p>
				<Separator />
				<p>Content below</p>
			</div>
		</div>
	</section>

	<!-- With Labels -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">With Labels</h2>
		<div class="space-y-6">
			<div>
				<p>Sign in with email</p>
				<Separator children="OR" />
				<p>Sign in with Google</p>
			</div>

			<div>
				<p>Section A</p>
				<Separator>CONTINUE</Separator>
				<p>Section B</p>
			</div>
		</div>
	</section>

	<!-- Different Colors -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Colors</h2>
		<div class="space-y-4">
			<div>
				<p class="text-contrast/70 mb-2 text-sm">Surface (default)</p>
				<Separator color="surface" />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Primary</p>
				<Separator color="primary" />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Secondary</p>
				<Separator color="secondary" />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Success</p>
				<Separator color="success" />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Danger</p>
				<Separator color="danger" />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">With Label</p>
				<Separator color="primary" children="Primary Section" />
			</div>
		</div>
	</section>

	<!-- Different Sizes -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Sizes</h2>
		<div class="space-y-4">
			<div>
				<p class="text-contrast/70 mb-2 text-sm">Size 1 (default)</p>
				<Separator size={1} />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Size 2</p>
				<Separator size={2} />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Size 4</p>
				<Separator size={4} />
			</div>

			<div>
				<p class="text-contrast/70 mb-2 text-sm">Size 4 with Color</p>
				<Separator size={4} color="primary" />
			</div>
		</div>
	</section>

	<!-- Vertical Separators -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Vertical Orientation</h2>
		<div class="space-y-6">
			<div class="flex h-24 items-center gap-4">
				<div class="flex-1 text-center">Left Content</div>
				<Separator orientation="vertical" />
				<div class="flex-1 text-center">Right Content</div>
			</div>

			<div class="flex h-32 items-center gap-4">
				<div class="flex-1 text-center">Section A</div>
				<Separator orientation="vertical" color="primary" size={2} />
				<div class="flex-1 text-center">Section B</div>
				<Separator orientation="vertical" color="primary" size={2} />
				<div class="flex-1 text-center">Section C</div>
			</div>
		</div>
	</section>

	<!-- In Menu Context -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">In Menu Context</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-1">
			<MenuOption prefix={userIcon} title="Profile" description="View your profile" />
			<MenuOption prefix={gearIcon} title="Settings" description="Manage preferences" />

			<Separator class="my-1" />

			<MenuOption color="danger" prefix={signOutIcon} title="Log Out" />
		</div>
	</section>

	<!-- Complex Example -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Complex Layout</h2>
		<div class="max-w-2xl space-y-4">
			<section>
				<h3 class="text-xl font-semibold">Personal Information</h3>
				<p class="text-contrast/70">Manage your personal details</p>
			</section>

			<Separator color="primary" size={2} children="Account Settings" />

			<section>
				<h3 class="text-xl font-semibold">Security</h3>
				<p class="text-contrast/70">Password and authentication settings</p>
			</section>

			<Separator color="secondary" children="Preferences" />

			<section>
				<h3 class="text-xl font-semibold">Notifications</h3>
				<p class="text-contrast/70">Manage your notification preferences</p>
			</section>
		</div>
	</section>
</div>
