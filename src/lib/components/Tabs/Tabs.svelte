<script lang="ts" generics="Item = any">
	import { Tabbar } from '$lib/components/Tabbar/index.js';
	import { Stepper } from '$lib/components/Stepper/index.js';
	import { StepperState } from '../Stepper/stepperState.svelte.js';
	import type { TabsProps } from './tabs.props.js';
	import { useTabsTheme } from './tabs.theme.js';

	let {
		tabs,
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
		...snippets
	}: TabsProps<Item> = $props();

	const classes = $derived(useTabsTheme(theme));

	// Auto-set tabbar orientation based on placement if not explicitly provided
	const effectiveTabbarOrientation = $derived(
		tabbarOrientation ?? (placement === 'left' || placement === 'right' ? 'vertical' : 'horizontal')
	);

	// Extract snippet props (tab1, tab2, etc.) and map to stepper steps (step1, step2, etc.)
	const stepperSteps = $derived(
		tabs.reduce(
			(acc, _tab, index) => {
				const tabKey = `tab${index + 1}` as const;
				const stepKey = `step${index + 1}` as const;
				if (snippets[tabKey]) {
					Object.assign(acc, {
						[stepKey]: snippets[tabKey]
					});
				}
				return acc;
			},
			{} as Record<string, any>
		)
	);

	function handleTabChange(index: number) {
		stepper?.goTo(index);
		onChange?.(index);
	}
</script>

<div class={classes.tabs({ placement, className })}>
	<Tabbar
		onChange={handleTabChange}
		{tabs}
		bind:activeTab
		size={tabbarSize}
		orientation={effectiveTabbarOrientation}
		color={tabbarColor}
		alignment={tabbarAlignment}
		position={placement}
		class={tabbarClass}
		theme={tabbarTheme}
	/>
	<div class={classes.content({ placement })}>
		<Stepper
			bind:stepper
			items={tabs}
			bind:activeStep={activeTab}
			{keyFramesOptions}
			{...stepperSteps}
		/>
	</div>
</div>
