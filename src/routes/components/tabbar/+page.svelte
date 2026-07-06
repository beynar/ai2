<script lang="ts">
	import Tabbar from '$lib/components/Tabbar/Tabbar.svelte';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { colors, sizes } from '$lib/utils/tokens.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let simpleActiveTab = $state(0);
	let iconActiveTab = $state(0);
	let disabledActiveTab = $state(0);
	let verticalActiveTab = $state(0);
	let alignmentActiveTab = $state(0);
	let pillActiveTab = $state(2);
	let pillVerticalActiveTab = $state(0);
	let variableActiveTab = $state(0);

	const simpleTabs = ['Home', 'Profile', 'Settings'];
	const pillTabs = ['Overview', 'Analytics', 'Reports'];
	// Deliberately uneven label lengths: the indicator must resize as it slides.
	const variableTabs = ['All', 'In progress', 'Done', 'Archived & deleted'];

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

<DocPage
	title="Tabbar"
	subtitle="Horizontal navigation between related views."
	component="Tabbar"
	features={[
		'tablist/tab roles with arrow keys',
		'Home, End, Enter, Space navigation',
		'bind:activeTab selection state',
		'Link tabs or button tabs'
	]}
>
	<ComponentCard
		class="max-w-md"
		code={`<Tabbar
	items={['Home', 'Profile', 'Settings']}
	bind:activeTab={activeTab}
	onChange={(index) => console.log('Tab changed to:', index)}
/>`}
	>
		<Tabbar items={simpleTabs} bind:activeTab={simpleActiveTab} onChange={handleTabChange} />
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Use Arrow keys (Left/Right for horizontal, Up/Down for vertical) to move focus; Home/End jump to first/last tab; Enter or Space activates the focused tab."
			class="max-w-md"
		>
			<Tabbar items={simpleTabs} bind:activeTab={simpleActiveTab} onChange={handleTabChange} />
			<p class="text-foreground/70 text-sm">Active tab: {simpleActiveTab}</p>
		</ComponentCard>

		<ComponentCard description="Full-width tab bar." class="max-w-md">
			<Tabbar
				fullWidth
				items={simpleTabs}
				bind:activeTab={simpleActiveTab}
				onChange={handleTabChange}
			/>
			<p class="text-foreground/70 text-sm">Active tab: {simpleActiveTab}</p>
		</ComponentCard>

		<ComponentCard
			title="Pill variant"
			description="A rounded track where the active tab is a raised pill. The pill slides and resizes between tabs with the same animation as the underline indicator."
			class="max-w-md"
		>
			<Tabbar variant="pill" items={pillTabs} bind:activeTab={pillActiveTab} />
		</ComponentCard>

		<ComponentCard
			title="Variable tab widths"
			description="The indicator measures the active tab, so it adapts to uneven label lengths — in both variants."
			class="max-w-md"
		>
			<Tabbar items={variableTabs} bind:activeTab={variableActiveTab} />
			<Tabbar variant="pill" items={variableTabs} bind:activeTab={variableActiveTab} />
		</ComponentCard>

		<ComponentCard
			title="Vertical pill"
			description="The pill variant works on the vertical orientation too — the indicator slides along the column."
			class="max-w-md"
		>
			<Tabbar
				variant="pill"
				orientation="vertical"
				items={pillTabs}
				bind:activeTab={pillVerticalActiveTab}
			/>
		</ComponentCard>
	{/snippet}
</DocPage>
