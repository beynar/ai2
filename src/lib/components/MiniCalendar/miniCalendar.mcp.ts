export const miniCalendarDescription = `
# MiniCalendar Component

A compact horizontal date strip showing N consecutive days (default 5) with a previous/next chevron on each side that shifts the visible range by N days. Each day cell stacks a short month label over the day number; the selected day gets an elevated, filled background and today is subtly highlighted.

## Basic Usage

\`\`\`svelte
<MiniCalendar bind:value={date} />
<MiniCalendar days={7} size="large" color="success" />
<MiniCalendar bind:value={date} bind:startDate={from} />
\`\`\`

## Props

### Core Props
- **value**: \`Date | null\` (default: \`null\`, bindable)
  - The selected date. Selection is compared by year/month/day only; picked dates are created at noon to avoid timezone day-boundary issues.
- **startDate**: \`Date\` (default: today, bindable)
  - The first visible day of the strip. The chevrons shift it by \`days\`.
- **days**: \`number\` (default: \`5\`)
  - How many day cells are visible, and the step used when navigating.

### Style Props
- **size**: \`'small' | 'normal' | 'large'\` (default: \`'normal'\`)
  - Cell dimensions, gaps and typography.
- **color**: \`Colors\` (default: \`'primary'\`)
  - Accent color of the selected day and the today highlight.
- **dir**: \`'ltr' | 'rtl'\` (optional)
  - Reading direction override. In \`rtl\` the strip order and chevrons mirror. Inherits the ambient direction when omitted.
- **disabled**: \`boolean\` (default: \`false\`)
  - Disables navigation and day selection entirely (chevrons and day cells).

### Localization
- **locale**: \`string\` (optional)
  - BCP-47 locale for the month labels and full-date aria-labels. Defaults to the active i18n catalog's locale (\`t.locale\`, reactive to runtime locale switches); falls back to English when no catalog is set.
- **i18n**: \`Partial<Messages>\` - Per-instance i18n overrides merged over the global catalog (used for the \`previous\` / \`next\` aria-labels).

### Event Props
- **onValueChange**: \`(date: Date) => void\`
  - Called with the picked date when a day cell is clicked.
- **onStartDateChange**: \`(startDate: Date) => void\`
  - Called with the new start date when the chevrons shift the visible range.

### Content Props (Slots)
- **day**: \`Snippet<[{ date, selected, today, monthLabel, dayNumber }]>\` (optional)
  - Custom day-cell content, replacing the default month-label + day-number stack. Rendered inside each day button.

\`\`\`svelte
<MiniCalendar bind:value={date}>
	{#snippet day({ dayNumber, monthLabel, selected })}
		<span class="text-xs">{monthLabel}</span>
		<span class="text-lg font-bold">{dayNumber}</span>
		{#if selected}<span class="text-[10px]">picked</span>{/if}
	{/snippet}
</MiniCalendar>
\`\`\`

### Advanced Props
- **ref**: \`HTMLElement | null\` (bindable) - Reference to the root container element.
- **class**: \`string\` - Class for the root pill container.
- **theme**: \`MiniCalendarThemeProps\` - Theme overrides.

## Structure

A rounded, bordered pill container (\`root\`) holding a previous \`navButton\`, a \`days\` viewport, and a next \`navButton\`. Inside \`days\`, a \`track\` flex row holds the day-cell buttons (\`day\`); during navigation the outgoing and incoming tracks overlap in the \`days\` grid while they slide. Each day cell stacks a \`dayMonth\` label over a \`dayNumber\`. Flex rows mirror automatically in RTL.

## Accessibility

- Chevrons are \`<button type="button">\` with localized \`previous\` / \`next\` aria-labels.
- Day cells are \`<button type="button">\` with \`aria-pressed\` reflecting selection and a full-date \`aria-label\` via \`toLocaleDateString\`.
- \`disabled\` sets the \`disabled\` attribute on every button.

## Notes
- Dates are handled at noon and compared by year/month/day, so selection is timezone-resistant.
- Navigation is chronological in both directions: previous is always earlier dates, even in RTL.
- Range shifts are a directional push: the old range slides out through the edge the range moved away from while the new range slides in from the side it moved toward (mirrored in RTL). The initial mount does not animate, and \`prefers-reduced-motion\` disables the slide entirely.
- Theme parts: \`root\`, \`navButton\`, \`days\`, \`track\`, \`day\`, \`dayMonth\`, \`dayNumber\` (day variants: \`size\`, \`color\`, \`selected\`, \`today\`, \`disabled\`).
`;
