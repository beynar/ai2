<script lang="ts">
	import { PopupMenu, type MenuItem } from '$lib/components/PopupMenu/index.js';
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
	import { dotsThreeVerticalIcon } from '$lib/components/Icons/dotsThreeVertical.js';

	let clickCount = $state(0);
	let externalMenuOpen = $state(false);
	let contextMenuOpen = $state(false);
	let contextMenuRef = $state<HTMLElement | null>(null);

	// Basic menu items
	const basicItems: MenuItem[] = [
		{ type: 'option', title: 'New File' },
		{ type: 'option', title: 'Open...' },
		{ type: 'option', title: 'Save' },
		{ type: 'separator' },
		{ type: 'option', title: 'Exit' },
		{
			type: 'submenu',
			title: 'Submenu',
			menu: [
				{ type: 'option', title: 'New File' },
				{ type: 'option', title: 'Open...' },
				{ type: 'option', title: 'Save' },
				{ type: 'separator' },
				{ type: 'option', title: 'Exit' }
			]
		}
	];

	// User profile menu
	const profileItems: MenuItem[] = [
		{
			type: 'option',
			prefix: userIcon,
			title: 'John Doe',
			description: 'john.doe@example.com'
		},
		{ type: 'separator' },
		{ type: 'option', prefix: houseIcon, title: 'Dashboard' },
		{ type: 'option', prefix: userIcon, title: 'Profile' },
		{ type: 'option', prefix: gearIcon, title: 'Settings' },
		{
			type: 'submenu',
			prefix: bellIcon,
			title: 'Notifications',
			suffix: caretRightIcon,
			menu: [
				{ type: 'option', title: 'Email Notifications' },
				{ type: 'option', title: 'Push Notifications' },
				{ type: 'separator' },
				{ type: 'option', title: 'Notification Settings' }
			]
		},
		{ type: 'separator' },
		{ type: 'option', prefix: questionIcon, title: 'Help & Support' },
		{ type: 'separator' },
		{ type: 'option', prefix: signOutIcon, title: 'Log Out', color: 'danger' }
	];

	// Actions menu with buttons
	const actionItems: MenuItem[] = [
		{
			type: 'button',
			children: 'Save Draft',
			variant: 'ghost',
			fullWidth: true,
			onClick: () => alert('Saved as draft')
		},
		{
			type: 'button',
			children: 'Publish',
			variant: 'solid',
			color: 'primary',
			fullWidth: true,
			onClick: () => alert('Published!')
		},
		{ type: 'separator' },
		{
			type: 'button',
			children: 'Delete',
			variant: 'soft',
			color: 'danger',
			fullWidth: true,
			onClick: () => alert('Deleted')
		}
	];

	// Context menu items
	const contextItems: MenuItem[] = [
		{ type: 'option', title: 'Open', onClick: () => alert('Open') },
		{ type: 'option', title: 'Open in New Tab', onClick: () => alert('Open in new tab') },
		{ type: 'separator' },
		{ type: 'option', title: 'Copy Link', onClick: () => alert('Link copied') },
		{ type: 'option', title: 'Share', suffix: caretRightIcon },
		{ type: 'separator' },
		{ type: 'option', prefix: trashIcon, title: 'Delete', color: 'danger' }
	];

	// Interactive items
	const interactiveItems: MenuItem[] = $derived([
		{
			type: 'option',
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

	// Edit menu
	const editItems: MenuItem[] = [
		{ type: 'option', title: 'Undo' },
		{ type: 'option', title: 'Redo' },
		{ type: 'separator' },
		{ type: 'option', title: 'Cut' },
		{ type: 'option', title: 'Copy' },
		{ type: 'option', title: 'Paste' }
	];

	// View menu
	const viewItems: MenuItem[] = [
		{ type: 'option', title: 'Zoom In' },
		{ type: 'option', title: 'Zoom Out' },
		{ type: 'option', title: 'Reset Zoom' },
		{ type: 'separator' },
		{ type: 'option', title: 'Full Screen' }
	];

	// Settings menu with colors
	const settingsItems: MenuItem[] = [
		{ type: 'option', title: 'Account', color: 'primary', prefix: checkIcon },
		{ type: 'option', title: 'Privacy', color: 'success', prefix: lockIcon },
		{ type: 'option', title: 'Notifications', color: 'info', prefix: bellIcon },
		{ type: 'separator' },
		{ type: 'option', title: 'Delete Account', color: 'danger', prefix: trashIcon }
	];

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		contextMenuRef = e.target as HTMLElement;
		contextMenuOpen = true;
	}
</script>

<div class="space-y-8 p-8">
	<h1 class="mb-8 text-4xl font-bold">PopupMenu Component</h1>

	<!-- Basic PopupMenu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Basic Dropdown Menu</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'File', variant: 'outline' }}
				position="bottom-start"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Edit', variant: 'outline' }}
				position="bottom-start"
				menu={{ items: editItems }}
			/>

			<PopupMenu
				trigger={{ content: 'View', variant: 'outline' }}
				position="bottom-start"
				menu={{ items: viewItems }}
			/>
		</div>
	</section>

	<!-- User Profile Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">User Profile Menu</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'John Doe', variant: 'outline', prefix: userIcon }}
				position="bottom-end"
				menu={{ items: profileItems }}
			/>
		</div>
	</section>

	<!-- Actions Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Actions Menu with Buttons</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'Actions', color: 'primary' }}
				position="bottom"
				menu={{ items: actionItems }}
			/>
		</div>
	</section>

	<!-- Different Positions -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Different Positions</h2>
		<div class="flex flex-wrap gap-4">
			<PopupMenu
				trigger={{ content: 'Top', variant: 'soft' }}
				position="top"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Bottom', variant: 'soft' }}
				position="bottom"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Left', variant: 'soft' }}
				position="left"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Right', variant: 'soft' }}
				position="right"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Top Start', variant: 'soft' }}
				position="top-start"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Bottom End', variant: 'soft' }}
				position="bottom-end"
				menu={{ items: basicItems }}
			/>
		</div>
	</section>

	<!-- Interactive Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Interactive Menu</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'Counter Menu', variant: 'outline', color: 'secondary' }}
				position="bottom-start"
				menu={{ items: interactiveItems }}
			/>
		</div>
	</section>

	<!-- Hover Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Hover-Triggered Menu</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'Hover Me', variant: 'ghost' }}
				openOnHover={true}
				openOnClick={false}
				hoverDelay={200}
				closeOnMouseLeave={true}
				menu={{ items: settingsItems }}
			/>
		</div>
	</section>

	<!-- Close on Item Click -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Close on Item Click</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'Closes on Click (default)', variant: 'outline' }}
				position="bottom-start"
				closeOnItemClick={true}
				menu={{ items: interactiveItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Stays Open', variant: 'outline', color: 'secondary' }}
				position="bottom-start"
				closeOnItemClick={false}
				menu={{ items: interactiveItems }}
			/>
		</div>
		<p class="text-contrast/70 mt-2 text-sm">
			The first menu closes when you click an item. The second stays open for multiple interactions.
		</p>
	</section>

	<!-- External Control -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">External Control</h2>
		<div class="flex gap-4">
			<button
				class="border-contrast rounded border px-4 py-2"
				onclick={() => (externalMenuOpen = true)}
			>
				Open Menu Externally
			</button>

			<PopupMenu
				trigger={{ content: 'Controlled Menu', variant: 'outline' }}
				bind:isOpen={externalMenuOpen}
				position="bottom-start"
				menu={{ items: basicItems }}
			/>

			<span class="text-contrast/70 self-center text-sm">
				Menu is {externalMenuOpen ? 'open' : 'closed'}
			</span>
		</div>
	</section>

	<!-- Context Menu -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Context Menu (Right Click)</h2>
		<div
			class="bg-surface-light rounded-large border-surface-muted flex h-48 w-full cursor-context-menu items-center justify-center border"
			oncontextmenu={handleContextMenu}
		>
			<p class="text-contrast/70">Right-click anywhere in this area</p>
		</div>

		<PopupMenu
			trigger={false}
			bind:isOpen={contextMenuOpen}
			ref={contextMenuRef}
			position="bottom-start"
			menu={{ items: contextItems }}
		/>
	</section>

	<!-- Icon Button Menus -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Icon Button Menus</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ prefix: dotsThreeVerticalIcon, variant: 'ghost', squared: true }}
				position="bottom-end"
				menu={{ items: actionItems }}
			/>

			<PopupMenu
				trigger={{ prefix: gearIcon, variant: 'outline', squared: true }}
				position="bottom-end"
				menu={{ items: settingsItems }}
			/>

			<PopupMenu
				trigger={{ prefix: userIcon, variant: 'soft', color: 'primary', squared: true }}
				position="bottom-end"
				menu={{ items: profileItems }}
			/>
		</div>
	</section>

	<!-- Different Button Variants -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Button Variants</h2>
		<div class="flex flex-wrap gap-4">
			<PopupMenu
				trigger={{ content: 'Solid', variant: 'solid', color: 'primary' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Outline', variant: 'outline', color: 'secondary' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Soft', variant: 'soft', color: 'success' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Ghost', variant: 'ghost', color: 'info' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Link', variant: 'link', color: 'contrast' }}
				menu={{ items: basicItems }}
			/>
		</div>
	</section>

	<!-- Custom Theme -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Custom Themed Menu</h2>
		<div class="flex gap-4">
			<PopupMenu
				trigger={{ content: 'Large Gap Menu', variant: 'outline' }}
				position="bottom-start"
				menu={{
					items: basicItems,
					theme: {
						menu: { gap: 'large' }
					}
				}}
			/>
		</div>
	</section>

	<!-- Multiple Sizes -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Button Sizes</h2>
		<div class="flex items-center gap-4">
			<PopupMenu
				trigger={{ content: 'Small', variant: 'outline', size: 'small' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Normal', variant: 'outline', size: 'normal' }}
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Large', variant: 'outline', size: 'large' }}
				menu={{ items: basicItems }}
			/>
		</div>
	</section>

	<!-- Toolbar Example -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Toolbar Example</h2>
		<div class="bg-surface rounded-large border-surface-muted flex gap-1 border p-1">
			<PopupMenu
				trigger={{ content: 'File', variant: 'ghost', size: 'small' }}
				position="bottom-start"
				menu={{ items: basicItems }}
			/>

			<PopupMenu
				trigger={{ content: 'Edit', variant: 'ghost', size: 'small' }}
				position="bottom-start"
				menu={{ items: editItems }}
			/>

			<PopupMenu
				trigger={{ content: 'View', variant: 'ghost', size: 'small' }}
				position="bottom-start"
				menu={{ items: viewItems }}
			/>

			<div class="border-surface-muted mx-1 border-l"></div>

			<PopupMenu
				trigger={{ prefix: userIcon, variant: 'ghost', size: 'small', squared: true }}
				position="bottom-end"
				menu={{ items: profileItems }}
			/>
		</div>
	</section>
</div>
