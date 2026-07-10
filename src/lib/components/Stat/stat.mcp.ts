export const statDescription = `
# Stat Component

Stat renders a compact metric card with semantic regions for label, value, indicator, trend, separator, and description. It is adapted from the Dice UI stat card pattern but uses Svelai tokens, theme overrides, props, named snippets, and size semantics.

## Basic Usage

\`\`\`svelte
<Stat label="Revenue" value="$45,231" trend="+20.1%" trendDirection="up">
	{#snippet indicator()}
		{@render trendUpIcon()}
	{/snippet}
</Stat>
\`\`\`

## Snippet Usage

\`\`\`svelte
<Stat
	size="large"
	label="Total users"
	value="24,892"
	indicatorVariant="icon"
	indicatorColor="info"
	trendDirection="up"
	description="Compared with the previous period"
	showSeparator
>
	{#snippet indicator()}
		{@render usersIcon()}
	{/snippet}
	{#snippet trend()}
		+12.4%
	{/snippet}
</Stat>
\`\`\`

## Props

### Core Props
- **ref**: HTMLElement | null - Bindable reference to the root element.
- **class**: string - Additional classes for the root element.
- **color**: Colors (default: 'background') - Semantic color token for the stat surface.
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' (default: 'solid') - Surface treatment.
- **size**: 'small' | 'normal' | 'large' (default: 'normal') - Controls padding, spacing, and typography.
- **theme**: StatThemeProps - Theme overrides for root and stat parts.

### Content Props
- **label**: Slot - Label content.
- **value**: Slot - Primary metric content.
- **indicator**: Slot - Indicator content rendered in the top-right region.
- **trend**: Slot - Trend content.
- **description**: Slot - Supporting description content.
- **children**: Slot - Additional custom content rendered after the named regions.
- **showSeparator**: boolean (default: false) - Renders a decorative separator before trend/description content.

### Indicator Props
- **indicatorVariant**: 'default' | 'icon' | 'badge' | 'action' (default: 'default') - Indicator presentation.
- **indicatorColor**: Colors (default: 'foreground') - Semantic color for the indicator.
- **onIndicatorClick**: (event: MouseEvent) => void - Renders the indicator as a native button.
- **indicatorLabel**: string - Accessible label for icon-only clickable indicators.
- **indicatorType**: HTMLButtonAttributes['type'] (default: 'button') - Button type used for clickable indicators.
- **indicatorDisabled**: boolean - Disabled state used for clickable indicators.

### Trend Props
- **trendDirection**: 'up' | 'down' | 'neutral' (default: 'neutral') - Tone for the trend region.

## Structure

\`\`\`
<Stat>
	<label slot />
	<value slot />
	<indicator slot />
	<separator />
	<trend slot />
	<description slot />
	<children slot />
</Stat>
\`\`\`

## Accessibility

- The root is a non-interactive \`div\`; use surrounding landmarks/headings to provide page structure.
- The indicator renders as a native \`button\` only when \`onIndicatorClick\` is supplied.
- Icon-only clickable indicators should provide \`indicatorLabel\`.
- The separator is decorative.

## Notes

- \`Stat\` is the only public component; compose through props and named snippets.
- Trend colors use Svelai semantic tokens: success for up, danger for down, muted current color for neutral.
- Use string props for compact markup and named snippets when a region needs icon or richer content.
`;
