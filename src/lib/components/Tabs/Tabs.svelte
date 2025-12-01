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
		tabbarFullWidth,
		tab: defaultTabSnippet,

		...snippets
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
</script>

<div class={classes.tabs({ placement, className })}>
	<Tabbar
		fullWidth={tabbarFullWidth}
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
	<Stepper
		step={defaultTabSnippet}
		class={classes.content({ placement })}
		bind:stepper
		items={tabs}
		bind:activeStep={activeTab}
		{keyFramesOptions}
		{...stepperSteps}
	/>
</div>
