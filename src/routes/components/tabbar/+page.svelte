<script lang="ts">
	import Tabbar from '$lib/components/Tabbar/Tabbar.svelte';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let simpleActiveTab = $state(0);
	let iconActiveTab = $state(0);
	let disabledActiveTab = $state(0);
	let pillActiveTab = $state(2);
	let pillColorTab = $state(1);
	let pillVerticalActiveTab = $state(0);
	let variableActiveTab = $state(0);
	let scrollableActiveTab = $state(0);

	const simpleTabs = ['Home', 'Profile', 'Settings'];
	const pillTabs = ['Overview', 'Analytics', 'Reports'];
	// Deliberately uneven label lengths: the indicator must resize as it slides.
	const variableTabs = ['All', 'In progress', 'Done', 'Archived & deleted'];
	// More tabs than fit — the bar scrolls horizontally with no visible scrollbar.
	const manyTabs = [
		'Overview',
		'Analytics',
		'Reports',
		'Audience',
		'Behaviour',
		'Conversions',
		'Attribution',
		'Realtime',
		'Settings'
	];
	// The pill respects the color prop; 'background' gives the neutral look.
	const pillColors = ['background', 'primary', 'success', 'danger'] as const;

	const tabsWithIcons = [
		{ label: 'Home', prefix: houseIcon },
		{ label: 'Profile', prefix: userIcon },
		{ label: 'Settings', prefix: gearIcon }
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
	subtitle="Horizontal navigation between related views. An animated indicator (underline or pill) slides between tabs, is correct during SSR, and respects the color prop."
	component="Tabbar"
	features={[
		'Sliding underline / pill indicator',
		'Correct on SSR, animates after hydration',
		'tablist/tab roles with arrow keys',
		'bind:activeTab selection state'
	]}
>
	<ComponentCard
		code={`<Tabbar
	items={['Home', 'Profile', 'Settings']}
	bind:activeTab={activeTab}
	onChange={(index) => console.log('Tab changed to:', index)}
/>`}
	>
		<div class="flex flex-col items-center">
			<Tabbar class="w-fit" items={simpleTabs} bind:activeTab={simpleActiveTab} onChange={handleTabChange} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Use Arrow keys (Left/Right for horizontal, Up/Down for vertical) to move focus; Home/End jump to first/last tab; Enter or Space activates the focused tab."
		>
			<div class="flex flex-col items-center gap-3">
				<Tabbar class="w-fit" items={simpleTabs} bind:activeTab={simpleActiveTab} onChange={handleTabChange} />
				<p class="text-foreground/70 text-sm">Active tab: {simpleActiveTab}</p>
			</div>
		</ComponentCard>

		<ComponentCard title="With icons" description="Tabs accept prefix/suffix snippets, typically icons.">
			<div class="flex flex-col items-center">
				<Tabbar class="w-fit" items={tabsWithIcons} bind:activeTab={iconActiveTab} />
			</div>
		</ComponentCard>

		<ComponentCard title="Disabled tabs" description="Individual tabs can be disabled.">
			<div class="flex flex-col items-center">
				<Tabbar class="w-fit" items={tabsWithDisabled} bind:activeTab={disabledActiveTab} />
			</div>
		</ComponentCard>

		<ComponentCard title="Link tabs" description="Provide href to render tabs as links.">
			<div class="flex flex-col items-center">
				<Tabbar class="w-fit" items={linkTabs} />
			</div>
		</ComponentCard>

		<ComponentCard description="Full-width tab bar.">
			<div class="flex w-full flex-col items-center gap-3">
				<Tabbar
					fullWidth
					items={simpleTabs}
					bind:activeTab={simpleActiveTab}
					onChange={handleTabChange}
				/>
				<p class="text-foreground/70 text-sm">Active tab: {simpleActiveTab}</p>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Pill variant"
			description="A rounded track where the active tab is a raised pill. The pill slides and resizes between tabs with the same animation as the underline indicator."
		>
			<div class="flex flex-col items-center">
				<Tabbar variant="pill" items={pillTabs} bind:activeTab={pillActiveTab} />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Pill colors"
			description="The pill respects the color prop — the active pill fills with the color and its label flips to that color's contrast tone. Use color='background' for the neutral segmented-control look."
		>
			<div class="flex flex-col items-center gap-3">
				{#each pillColors as c (c)}
					<Tabbar variant="pill" color={c} items={pillTabs} bind:activeTab={pillColorTab} />
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			title="Variable tab widths"
			description="The indicator measures the active tab, so it adapts to uneven label lengths — in both variants."
		>
			<div class="flex flex-col items-center gap-3">
				<Tabbar class="w-fit" items={variableTabs} bind:activeTab={variableActiveTab} />
				<Tabbar variant="pill" items={variableTabs} bind:activeTab={variableActiveTab} />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Scrollable overflow"
			description="When the tabs don't fit, the bar scrolls horizontally with no visible scrollbar — in both variants."
		>
			<div class="flex w-full max-w-sm flex-col items-center gap-3">
				<Tabbar class="w-full" items={manyTabs} bind:activeTab={scrollableActiveTab} />
				<Tabbar variant="pill" class="w-full" items={manyTabs} bind:activeTab={scrollableActiveTab} />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Vertical pill"
			description="The pill variant works on the vertical orientation too — the indicator slides along the column."
		>
			<div class="flex flex-col items-center">
				<Tabbar
					variant="pill"
					orientation="vertical"
					items={pillTabs}
					bind:activeTab={pillVerticalActiveTab}
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
