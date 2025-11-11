<script lang="ts">
	import { Menu, type MenuItem } from '$lib/components/Menu/index.js';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { signOutIcon } from '$lib/components/Icons/signOut.js';
	import { questionIcon } from '$lib/components/Icons/question.js';
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import { trashIcon } from '$lib/components/Icons/trash.js';
	import { bellIcon } from '$lib/components/Icons/bell.js';
	import { lockIcon } from '$lib/components/Icons/lock.js';
	import { houseIcon } from '$lib/components/Icons/house.js';

	let clickCount = $state(0);
	let selectedOption = $state('Option 1');

	// Basic menu items
	const basicItems: MenuItem[] = [
		{ type: 'option', title: 'Profile' },
		{ type: 'option', title: 'Settings' },
		{ type: 'separator' },
		{ type: 'option', title: 'Logout', color: 'danger' }
	];

	// Menu with icons
	const iconItems: MenuItem[] = [
		{ type: 'option', prefix: userIcon, title: 'Profile', description: 'View your profile' },
		{ type: 'option', prefix: gearIcon, title: 'Settings', description: 'Manage preferences' },
		{ type: 'option', prefix: bellIcon, title: 'Notifications', suffix: caretRightIcon },
		{ type: 'separator' },
		{ type: 'option', prefix: signOutIcon, title: 'Log Out', color: 'danger' }
	];

	// Button menu
	const buttonItems: MenuItem[] = [
		{ type: 'button', children: 'Save', variant: 'solid', color: 'primary', fullWidth: true },
		{ type: 'button', children: 'Cancel', variant: 'ghost', fullWidth: true },
		{ type: 'separator' },
		{ type: 'button', children: 'Delete', variant: 'soft', color: 'danger', fullWidth: true }
	];

	// Mixed items
	const mixedItems: MenuItem[] = [
		{ type: 'option', prefix: houseIcon, title: 'Dashboard', href: '/' },
		{ type: 'option', prefix: userIcon, title: 'Profile', href: '/profile' },
		{ type: 'separator', children: 'Actions' },
		{
			type: 'button',
			children: 'New Project',
			variant: 'outline',
			color: 'primary',
			fullWidth: true
		},
		{ type: 'button', children: 'Import', variant: 'ghost', fullWidth: true }
	];

	// Different sizes
	const smallItems: MenuItem[] = [
		{ type: 'option', prefix: userIcon, title: 'Small Item', size: 'small' },
		{ type: 'option', prefix: gearIcon, title: 'Small Settings', size: 'small' }
	];

	const normalItems: MenuItem[] = [
		{ type: 'option', prefix: userIcon, title: 'Normal Item', size: 'normal' },
		{ type: 'option', prefix: gearIcon, title: 'Normal Settings', size: 'normal' }
	];

	const largeItems: MenuItem[] = [
		{ type: 'option', prefix: userIcon, title: 'Large Item', size: 'large' },
		{ type: 'option', prefix: gearIcon, title: 'Large Settings', size: 'large' }
	];

	// Different colors
	const colorItems: MenuItem[] = [
		{ type: 'option', title: 'Primary', color: 'primary', prefix: checkIcon },
		{ type: 'option', title: 'Secondary', color: 'secondary', prefix: checkIcon },
		{ type: 'option', title: 'Success', color: 'success', prefix: checkIcon },
		{ type: 'option', title: 'Warning', color: 'warning', prefix: checkIcon },
		{ type: 'option', title: 'Danger', color: 'danger', prefix: checkIcon },
		{ type: 'option', title: 'Info', color: 'info', prefix: checkIcon }
	];

	// Interactive items
	const interactiveItems: MenuItem[] = $derived([
		{
			type: 'option',
			prefix: userIcon,
			title: `Clicked ${clickCount} times`,
			onClick: () => clickCount++
		},
		{ type: 'separator' },
		{
			type: 'button',
			children: 'Reset Counter',
			variant: 'ghost',
			fullWidth: true,
			onClick: () => (clickCount = 0)
		}
	]);

	// Application menu
	const appMenuItems: MenuItem[] = [
		{
			type: 'option',
			prefix: userIcon,
			title: 'John Doe',
			description: 'john.doe@example.com'
		},
		{ type: 'separator' },
		{ type: 'option', prefix: houseIcon, title: 'Dashboard', href: '/' },
		{ type: 'option', prefix: userIcon, title: 'Profile', href: '/profile' },
		{ type: 'option', prefix: gearIcon, title: 'Settings', href: '/settings' },
		{ type: 'option', prefix: bellIcon, title: 'Notifications', suffix: caretRightIcon },
		{ type: 'separator', children: 'Account' },
		{ type: 'option', prefix: lockIcon, title: 'Privacy', description: 'Manage your privacy' },
		{ type: 'option', prefix: questionIcon, title: 'Help & Support' },
		{ type: 'separator' },
		{ type: 'option', prefix: signOutIcon, title: 'Log Out', color: 'danger' }
	];

	// Context menu
	const contextMenuItems: MenuItem[] = [
		{ type: 'option', title: 'Open', onClick: () => alert('Open') },
		{ type: 'option', title: 'Open in New Tab', onClick: () => alert('Open in new tab') },
		{ type: 'separator' },
		{ type: 'option', title: 'Copy Link', onClick: () => alert('Copy link') },
		{ type: 'option', title: 'Share', suffix: caretRightIcon },
		{ type: 'separator' },
		{ type: 'option', prefix: trashIcon, title: 'Delete', color: 'danger' }
	];

	// Custom gap example
	const customGapItems: MenuItem[] = [
		{ type: 'option', title: 'Large Gap Item 1' },
		{ type: 'option', title: 'Large Gap Item 2' },
		{ type: 'option', title: 'Large Gap Item 3' }
	];
</script>

<div class="space-y-8 p-8">
	<h1 class="mb-8 text-4xl font-bold">Menu Component</h1>

	<!-- Basic Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Basic Menu</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={basicItems} />
		</div>
	</section>

	<!-- Menu with Icons and Descriptions -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">With Icons & Descriptions</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-2">
			<Menu items={iconItems} />
		</div>
	</section>

	<!-- Button Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Button Menu</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={buttonItems} />
		</div>
	</section>

	<!-- Mixed Items -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Mixed Items</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-2">
			<Menu items={mixedItems} />
		</div>
	</section>

	<!-- Different Sizes -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Sizes</h2>
		<div class="flex gap-4">
			<div class="flex-1">
				<h3 class="text-contrast/70 mb-2 text-sm">Small</h3>
				<div class="bg-surface rounded-large border-surface-muted border p-2">
					<Menu items={smallItems} />
				</div>
			</div>
			<div class="flex-1">
				<h3 class="text-contrast/70 mb-2 text-sm">Normal</h3>
				<div class="bg-surface rounded-large border-surface-muted border p-2">
					<Menu items={normalItems} />
				</div>
			</div>
			<div class="flex-1">
				<h3 class="text-contrast/70 mb-2 text-sm">Large</h3>
				<div class="bg-surface rounded-large border-surface-muted border p-2">
					<Menu items={largeItems} />
				</div>
			</div>
		</div>
	</section>

	<!-- Different Colors -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Colors</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={colorItems} />
		</div>
	</section>

	<!-- Interactive Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Interactive</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={interactiveItems} />
		</div>
	</section>

	<!-- Complete Application Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Application Menu</h2>
		<div class="bg-surface rounded-large border-surface-muted w-80 border p-2">
			<Menu items={appMenuItems} />
		</div>
	</section>

	<!-- Context Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Context Menu</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={contextMenuItems} />
		</div>
	</section>

	<!-- Custom Gap -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Custom Gap (Large)</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={customGapItems} class="gap-2" />
		</div>
	</section>

	<!-- Multiple Menus Side by Side -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Multiple Menus</h2>
		<div class="flex gap-4">
			<div class="bg-surface rounded-large border-surface-muted flex-1 border p-2">
				<h3 class="mb-2 px-2 text-sm font-semibold">File Menu</h3>
				<Menu
					items={[
						{ type: 'option', title: 'New File' },
						{ type: 'option', title: 'Open...' },
						{ type: 'option', title: 'Save' },
						{ type: 'separator' },
						{ type: 'option', title: 'Exit' }
					]}
				/>
			</div>
			<div class="bg-surface rounded-large border-surface-muted flex-1 border p-2">
				<h3 class="mb-2 px-2 text-sm font-semibold">Edit Menu</h3>
				<Menu
					items={[
						{ type: 'option', title: 'Undo' },
						{ type: 'option', title: 'Redo' },
						{ type: 'separator' },
						{ type: 'option', title: 'Cut' },
						{ type: 'option', title: 'Copy' },
						{ type: 'option', title: 'Paste' }
					]}
				/>
			</div>
			<div class="bg-surface rounded-large border-surface-muted flex-1 border p-2">
				<h3 class="mb-2 px-2 text-sm font-semibold">View Menu</h3>
				<Menu
					items={[
						{ type: 'option', title: 'Zoom In' },
						{ type: 'option', title: 'Zoom Out' },
						{ type: 'separator' },
						{ type: 'option', title: 'Full Screen' }
					]}
				/>
			</div>
		</div>
	</section>

	<!-- Submenu Examples -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Submenus</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu
				items={[
					{ type: 'option', prefix: houseIcon, title: 'Dashboard' },
					{ type: 'option', prefix: userIcon, title: 'Profile' },
					{
						type: 'submenu',
						prefix: gearIcon,
						title: 'Settings',
						menu: [
							{ type: 'option', title: 'General' },
							{ type: 'option', title: 'Privacy' },
							{ type: 'option', title: 'Security' },
							{ type: 'separator' },
							{ type: 'option', title: 'Advanced' }
						]
					},
					{ type: 'separator' },
					{ type: 'option', prefix: signOutIcon, title: 'Log Out', color: 'danger' }
				]}
			/>
		</div>
	</section>

	<!-- Nested Submenus -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Nested Submenus</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu
				items={[
					{ type: 'option', title: 'New File' },
					{ type: 'option', title: 'Open...' },
					{
						type: 'submenu',
						title: 'Recent Files',
						menu: [
							{ type: 'option', title: 'document.txt' },
							{ type: 'option', title: 'project.js' },
							{
								type: 'submenu',
								title: 'More',
								menu: [
									{ type: 'option', title: 'file1.txt' },
									{ type: 'option', title: 'file2.txt' },
									{ type: 'option', title: 'file3.txt' }
								]
							}
						]
					},
					{ type: 'separator' },
					{ type: 'option', title: 'Save' },
					{ type: 'option', title: 'Save As...' }
				]}
			/>
		</div>
	</section>

	<!-- Submenu with Different Triggers -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Submenu Trigger Options</h2>
		<div class="flex gap-4">
			<div class="flex-1">
				<h3 class="text-contrast/70 mb-2 text-sm">Hover Only (default)</h3>
				<div class="bg-surface rounded-large border-surface-muted border p-2">
					<Menu
						items={[
							{ type: 'option', title: 'Option 1' },
							{
								type: 'submenu',
								title: 'Hover Me',
								openOnHover: true,
								openOnClick: false,
								menu: [
									{ type: 'option', title: 'Sub 1' },
									{ type: 'option', title: 'Sub 2' }
								]
							}
						]}
					/>
				</div>
			</div>
			<div class="flex-1">
				<h3 class="text-contrast/70 mb-2 text-sm">Click Only</h3>
				<div class="bg-surface rounded-large border-surface-muted border p-2">
					<Menu
						items={[
							{ type: 'option', title: 'Option 1' },
							{
								type: 'submenu',
								title: 'Click Me',
								openOnHover: false,
								openOnClick: true,
								menu: [
									{ type: 'option', title: 'Sub 1' },
									{ type: 'option', title: 'Sub 2' }
								]
							}
						]}
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Mixed Menu with All Types -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Mixed Menu (All Types)</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-2">
			<Menu
				items={[
					{ type: 'option', prefix: userIcon, title: 'John Doe', description: 'john@example.com' },
					{ type: 'separator' },
					{ type: 'option', prefix: houseIcon, title: 'Dashboard' },
					{
						type: 'submenu',
						prefix: gearIcon,
						title: 'Settings',
						description: 'Configure your account',
						menu: [
							{ type: 'option', title: 'General' },
							{ type: 'option', title: 'Privacy' },
							{ type: 'option', prefix: lockIcon, title: 'Security' }
						]
					},
					{
						type: 'submenu',
						prefix: bellIcon,
						title: 'Notifications',
						menu: [
							{ type: 'option', title: 'Email Notifications' },
							{ type: 'option', title: 'Push Notifications' },
							{ type: 'separator' },
							{ type: 'option', title: 'Notification Settings' }
						]
					},
					{ type: 'separator', children: 'Actions' },
					{ type: 'button', children: 'New Project', variant: 'outline', fullWidth: true },
					{ type: 'separator' },
					{ type: 'option', prefix: signOutIcon, title: 'Log Out', color: 'danger' }
				]}
			/>
		</div>
	</section>

	<!-- Menu with Header -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Menu with Header</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-2">
			<Menu items={iconItems}>
				{#snippet header()}
					<div class="border-surface-muted mb-2 border-b pb-2">
						<div class="px-2">
							<h3 class="text-sm font-semibold">User Menu</h3>
							<p class="text-contrast/70 text-xs">Manage your account</p>
						</div>
					</div>
				{/snippet}
			</Menu>
		</div>
	</section>

	<!-- Menu with Footer -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Menu with Footer</h2>
		<div class="bg-surface rounded-large border-surface-muted w-64 border p-2">
			<Menu items={basicItems}>
				{#snippet footer()}
					<div class="border-surface-muted mt-2 border-t pt-2">
						<div class="text-contrast/60 px-2 text-xs">Version 1.0.0</div>
					</div>
				{/snippet}
			</Menu>
		</div>
	</section>

	<!-- Menu with Header and Footer -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Menu with Header & Footer</h2>
		<div class="bg-surface rounded-large border-surface-muted w-72 border p-2">
			<Menu items={iconItems}>
				{#snippet header()}
					<div class="border-surface-muted mb-2 border-b pb-2">
						<div class="flex items-center gap-2 px-2">
							<div class="bg-primary text-primary-fg flex h-10 w-10 items-center justify-center rounded-full">
								JD
							</div>
							<div>
								<div class="text-sm font-semibold">John Doe</div>
								<div class="text-contrast/70 text-xs">john@example.com</div>
							</div>
						</div>
					</div>
				{/snippet}
				{#snippet footer()}
					<div class="border-surface-muted mt-2 border-t pt-2">
						<div class="text-contrast/60 px-2 text-center text-xs">
							<a href="/privacy" class="hover:text-contrast hover:underline">Privacy</a>
							·
							<a href="/terms" class="hover:text-contrast hover:underline">Terms</a>
						</div>
					</div>
				{/snippet}
			</Menu>
		</div>
	</section>

	<!-- Minimal Example -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Minimal Menu</h2>
		<div class="bg-surface rounded-large border-surface-muted w-48 border p-2">
			<Menu
				items={[
					{ type: 'option', title: 'Item 1' },
					{ type: 'option', title: 'Item 2' },
					{ type: 'option', title: 'Item 3' }
				]}
			/>
		</div>
	</section>
</div>
