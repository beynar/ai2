<script lang="ts">
	import { Sidebar, type SidebarGroup } from '$lib/components/Sidebar/index.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { trayIcon } from '$lib/components/Icons/tray.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Home', href: '#home', icon: houseIcon, isActive: true },
				{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 7 },
				{ label: 'Customers', href: '#customers', icon: usersIcon },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];
</script>

<div class="h-[420px] w-full max-w-sm">
	<Sidebar
		mode="panel"
		variant="floating"
		width="18rem"
		{items}
		headerButton={{
			icon: commandIcon,
			title: 'Panel mode',
			subtitle: 'Navigation only'
		}}
	/>
</div>
