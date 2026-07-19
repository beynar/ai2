<script lang="ts">
	import ScrollArea from '../ScrollArea/ScrollArea.svelte';
	import Slot from '../Slot/Slot.svelte';
	import type { ScrollAreaThemeProps } from '../ScrollArea/scrollArea.theme.js';
	import { cx } from '../../utils/cva/index.js';
	import type { SuggestionsProps } from './aiSuggestion.props.js';
	import { useAISuggestionTheme } from './aiSuggestion.theme.js';
	import Suggestion from './Suggestion.svelte';

	let {
		ref = $bindable(null),
		viewportRef = $bindable(null),
		listRef = $bindable(null),
		suggestions,
		ariaLabel = 'Prompt suggestions',
		value = $bindable(),
		disabled = false,
		scrollFade = true,
		suggestion,
		onSuggestionClick,
		class: className,
		theme,
		scrollAreaTheme,
		...scrollAreaProps
	}: SuggestionsProps = $props();
	const classes = $derived(useAISuggestionTheme(theme));
	const resolvedScrollAreaTheme = $derived<ScrollAreaThemeProps>({
		...scrollAreaTheme,
		scrollbarX: {
			...scrollAreaTheme?.scrollbarX,
			base: cx('!hidden', scrollAreaTheme?.scrollbarX?.base)
		}
	});

	function select(nextValue: string) {
		if (disabled) return;
		value = nextValue;
		onSuggestionClick?.(nextValue);
	}
</script>

<ScrollArea
	bind:ref
	bind:viewportRef
	{ariaLabel}
	{scrollFade}
	theme={resolvedScrollAreaTheme}
	{...scrollAreaProps}
	data-slot="ai-suggestions"
	data-disabled={disabled ? 'true' : undefined}
	data-value={value}
	aria-disabled={disabled}
	class={classes.root({ className })}
>
	<div bind:this={listRef} data-slot="ai-suggestions-list" class={classes.list()}>
		{#each suggestions as item, index (`${item}:${index}`)}
			{#if suggestion}
				<Slot
					render={suggestion}
					payload={{
						suggestion: item,
						selected: value === item,
						disabled,
						select: () => select(item)
					}}
				/>
			{:else}
				<Suggestion
					suggestion={item}
					selected={value === item}
					{disabled}
					onSelect={select}
					{theme}
				/>
			{/if}
		{/each}
	</div>
</ScrollArea>
