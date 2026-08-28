<script lang="ts" generics="Item extends TabItem = TabItem">
	import { Tabbar } from '$lib/components/Tabbar/index.js';
	import { Stepper } from '$lib/components/Stepper/index.js';
	import type { TabItem } from '$lib/components/Tabbar/tabbar.props.js';
	import { StepperState } from '../Stepper/stepper.state.svelte.js';
	import type { TabsProps } from './tabs.props.js';
	import { useTabsTheme } from './tabs.theme.js';

	let {
		items,
		activeTab = $bindable(0),
		onChange,
		placement = 'top',
		class: className = '',
		theme,
		stepper = $bindable<StepperState<Item>>(),
		keyFramesOptions = {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'both'
		},
		tabbarSize,
		tabbarOrientation,
		tabbarColor,
		tabbarAlignment,
		tabbarClass,
		tabbarTheme,
		tabbarFullWidth,
		children: panel
	}: TabsProps<Item> = $props();

	const classes = $derived(useTabsTheme(theme));

	// Auto-set tabbar orientation based on placement if not explicitly provided
	const effectiveTabbarOrientation = $derived(
		tabbarOrientation ?? (placement === 'left' || placement === 'right' ? 'vertical' : 'horizontal')
	);

	function handleTabChange(index: number) {
		stepper?.goTo(index);
		onChange?.(index);
	}
</script>

<div class={classes.root({ placement, className })}>
	<Tabbar
		fullWidth={tabbarFullWidth}
		onChange={handleTabChange}
		{items}
		bind:activeTab
		size={tabbarSize}
		orientation={effectiveTabbarOrientation}
		color={tabbarColor}
		alignment={tabbarAlignment}
		position={placement}
		class={tabbarClass}
		theme={tabbarTheme}
	/>
	<Stepper
		class={classes.content({ placement })}
		bind:stepper
		{items}
		bind:activeStep={activeTab}
		{keyFramesOptions}
	>
		{#snippet children(payload)}
			{@render panel?.(payload)}
		{/snippet}
	</Stepper>
</div>
