export const statDescription = `
# Stat Component

Stat renders a compact metric card with semantic subparts for label, value, indicator, trend, separator, and description. It is adapted from the Dice UI stat card pattern but uses Svelai tokens, theme overrides, slots, and size semantics.

## Basic Usage

\`\`\`svelte
<Stat label="Revenue" value="$45,231" trend="+20.1%" trendDirection="up">
	{#snippet indicator()}
		{@render trendUpIcon()}
	{/snippet}
</Stat>
\`\`\`

## Compound Usage

\`\`\`svelte
<Stat size="large">
	<StatLabel>Total users</StatLabel>
	<StatValue>24,892</StatValue>
	<StatIndicator variant="icon" color="info">
		{@render usersIcon()}
	</StatIndicator>
	<StatSeparator />
	<StatTrend trend="up">+12.4%</StatTrend>
	<StatDescription>Compared with the previous period</StatDescription>
</Stat>
\`\`\`

## Props

### Stat
- **ref**: HTMLElement | null - Bindable reference to the root element.
- **class**: string - Additional classes for the root element.
- **color**: Colors (default: 'background') - Semantic color token for the stat surface.
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' (default: 'solid') - Surface treatment.
- **size**: 'small' | 'normal' | 'large' (default: 'normal') - Controls card padding, spacing, and default child typography.
- **label**: Slot - Convenience label slot rendered as \`StatLabel\`.
- **value**: Slot - Convenience value slot rendered as \`StatValue\`.
- **indicator**: Slot - Convenience indicator slot rendered as \`StatIndicator\`.
- **indicatorVariant**: 'default' | 'icon' | 'badge' | 'action' (default: 'default') - Presentation for the convenience indicator.
- **indicatorColor**: Colors (default: 'foreground') - Semantic color for the convenience indicator.
- **showSeparator**: boolean (default: false) - Adds \`StatSeparator\` between primary and supporting content.
- **trend**: Slot - Convenience trend slot rendered as \`StatTrend\`.
- **trendDirection**: 'up' | 'down' | 'neutral' (default: 'neutral') - Tone for the convenience trend slot.
- **description**: Slot - Convenience description slot rendered as \`StatDescription\`.
- **children**: Slot - Compound content.
- **theme**: StatThemeProps - Theme overrides for root and stat parts.

### StatLabel, StatValue, StatDescription
- **class**: string - Additional classes for the part.
- **size**: 'small' | 'normal' | 'large' - Overrides the parent Stat size for this part.
- **children**: Slot - Part content.
- **theme**: StatThemeProps - Theme overrides.

### StatIndicator
- **variant**: 'default' | 'icon' | 'badge' | 'action' (default: 'default') - Indicator presentation.
- **color**: Colors (default: 'foreground') - Semantic color token.
- **size**: 'small' | 'normal' | 'large' - Overrides the parent Stat size.
- **onClick**: (event: MouseEvent) => void - Renders as a native button when present.
- **type**: HTMLButtonAttributes['type'] (default: 'button') - Button type for clickable indicators.
- **disabled**: boolean - Disables clickable indicators.
- **aria-label**: string - Accessible name for icon-only clickable indicators.
- **children**: Slot - Indicator content.
- **theme**: StatThemeProps - Theme overrides.

### StatTrend
- **trend**: 'up' | 'down' | 'neutral' (default: 'neutral') - Directional tone.
- **size**: 'small' | 'normal' | 'large' - Overrides the parent Stat size.
- **children**: Slot - Trend content.
- **theme**: StatThemeProps - Theme overrides.

### StatSeparator
- **statSize**: 'small' | 'normal' | 'large' - Overrides parent Stat spacing for the separator.
- Includes the Separator component props except its theme prop.

## Structure

\`\`\`
<Stat>
	<StatLabel />
	<StatValue />
	<StatIndicator />
	<StatSeparator />
	<StatTrend />
	<StatDescription />
	<slot />
</Stat>
\`\`\`

## Accessibility

- The root is a non-interactive \`div\`; use surrounding landmarks/headings to provide page structure.
- \`StatIndicator\` renders as a native \`button\` only when \`onClick\` is supplied.
- Icon-only clickable indicators should provide \`aria-label\`.
- \`StatSeparator\` is decorative by default.

## Notes

- Parent \`size\` and \`theme\` cascade to compound subparts through Stat context.
- Trend colors use Svelai semantic tokens: success for up, danger for down, muted current color for neutral.
- Use \`Stat\` convenience slots for compact markup and compound subcomponents when you need precise ordering or per-part overrides.
`;
