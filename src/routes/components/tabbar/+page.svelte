<script lang="ts">
	import Tabbar from '$lib/components/Tabbar/Tabbar.svelte';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { colors, sizes } from '$lib/utils/tokens.js';

	let simpleActiveTab = $state(0);
	let iconActiveTab = $state(0);
	let disabledActiveTab = $state(0);
	let verticalActiveTab = $state(0);
	let alignmentActiveTab = $state(0);

	const simpleTabs = ['Home', 'Profile', 'Settings'];

	const tabsWithIcons = [
		{
			label: 'Home',
			prefix: houseIcon
		},
		{
			label: 'Profile',
			prefix: userIcon
		},
		{
			label: 'Settings',
			prefix: gearIcon
		}
	];

	const tabsWithDisabled = [
		{ label: 'Enabled' },
		{ label: 'Disabled', disabled: true },
		{ label: 'Also Enabled' }
	];

	const linkTabs = [
		{ label: 'Dashboard', href: '#dashboard' },
		{ label: 'Analytics', href: '#analytics' },
		{ label: 'Reports', href: '#reports' }
	];

	function handleTabChange(index: number) {
		console.log('Tab changed to:', index);
	}
</script>

<div class="grid gap-10 p-10">
	<div class="border-info/30 bg-info/5 rounded border p-4">
		<h3 class="text-info mb-2 text-base font-semibold">Keyboard Navigation</h3>
		<p class="text-contrast/80 mb-2 text-sm">
			Try using your keyboard to navigate! Use <kbd
				class="bg-surface-dark rounded px-1.5 py-0.5 text-xs font-semibold">Arrow</kbd
			>
			keys (Left/Right for horizontal, Up/Down for vertical) to move focus,
			<kbd class="bg-surface-dark rounded px-1.5 py-0.5 text-xs font-semibold">Home</kbd>
			/
			<kbd class="bg-surface-dark rounded px-1.5 py-0.5 text-xs font-semibold">End</kbd>
			to jump to first/last tab, and
			<kbd class="bg-surface-dark rounded px-1.5 py-0.5 text-xs font-semibold">Enter</kbd>
			or
			<kbd class="bg-surface-dark rounded px-1.5 py-0.5 text-xs font-semibold">Space</kbd>
			to activate the focused tab.
		</p>
		<p class="text-contrast/70 text-xs">
			Note: Arrow keys move focus (ring indicator), Enter/Space activates the selection.
		</p>
	</div>

	<!-- Simple String Tabs -->
	<div class="grid gap-4">
		<h2 class="text-lg font-bold">Simple String Tabs</h2>
		<div
			class="border-surface-muted relative grid min-h-[100px] w-full max-w-[90vw] items-center gap-4 rounded border p-6"
		>
			<Tabbar tabs={simpleTabs} bind:activeTab={simpleActiveTab} onChange={handleTabChange} />
			<p class="text-contrast/70 text-sm">Active tab: {simpleActiveTab}</p>
		</div>
	</div>
</div>
