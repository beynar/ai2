export const meterDescription = `
# Meter Component

The Meter component visualizes a measurement or progress along a known scale, with support for multiple values, steps, labels, and animations.

## Basic Usage

\`\`\`svelte
<Meter value={{ value: 75, label: 'Progress' }} />
\`\`\`

## Props

### Core Props
- **value**: Meter<T> | Array<Meter<T>> (required) - Single value or array of values to display
  - Each meter object: { value: number, label?: string, color?: Colors, position?: 'top' | 'bottom', data?: T }

- **min**: number (default: 0) - Minimum value
- **max**: number (default: 100) - Maximum value
- **size**: 'small' | 'normal' | 'large' - Visual size of the meter

### Display Props
- **showIndicatorAs**: 'value' | 'percentage' - How to display the indicator label

### Steps
- **steps**: Array<Step<S>> - Predefined steps/milestones on the meter
  - Each step: { start: number, end?: number, label: Slot, color: Colors, position?: 'top' | 'bottom', class?: string, labelClass?: string, data?: S }

### Content Slots
- **label**: Snippet - Custom label
- **description**: Snippet - Description text
- **helper**: Snippet - Helper text
- **header**: Snippet - Custom header
- **indicator**: Snippet<Meter & { percentage: number }> - Custom indicator rendering

### Animation Props
- **stiffness**: number - Spring animation stiffness
- **damping**: number - Spring animation damping
- **soft**: number - Softness of animation
- **precision**: number - Precision of animated values

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Meter>
	<Header>
		<Label />
		<Description />
	</Header>
	<Track>
		<Progress />
		<Indicator />
		<Steps />
	</Track>
	<Helper />
</Meter>
\`\`\`

## Examples

### Basic Meter
\`\`\`svelte
<Meter value={{ value: 60, label: 'Completion' }} />
\`\`\`

### With Label and Description
\`\`\`svelte
<Meter 
	value={{ value: 75 }}
>
	{#snippet label()}
		<span>Progress</span>
	{/snippet}
	{#snippet description()}
		<span>75% complete</span>
	{/snippet}
</Meter>
\`\`\`

### Different Colors
\`\`\`svelte
<Meter value={{ value: 30, color: 'danger', label: 'Low' }} />
<Meter value={{ value: 60, color: 'warning', label: 'Medium' }} />
<Meter value={{ value: 90, color: 'success', label: 'High' }} />
\`\`\`

### Multiple Values (Stacked)
\`\`\`svelte
<Meter 
	value={[
		{ value: 40, color: 'primary', label: 'Used' },
		{ value: 30, color: 'secondary', label: 'Reserved' }
	]}
	max={100}
/>
\`\`\`

### With Steps
\`\`\`svelte
<Meter 
	value={{ value: 65 }}
	steps={[
		{ start: 0, end: 25, label: 'Low', color: 'danger' },
		{ start: 25, end: 75, label: 'Medium', color: 'warning' },
		{ start: 75, end: 100, label: 'High', color: 'success' }
	]}
/>
\`\`\`

### Show as Percentage
\`\`\`svelte
<Meter 
	value={{ value: 45 }}
	showIndicatorAs="percentage"
/>
\`\`\`

### Different Sizes
\`\`\`svelte
<Meter size="small" value={{ value: 50 }} />
<Meter size="normal" value={{ value: 50 }} />
<Meter size="large" value={{ value: 50 }} />
\`\`\`

### Custom Range
\`\`\`svelte
<Meter 
	min={0}
	max={1000}
	value={{ value: 350, label: 'Score' }}
/>
\`\`\`

### Storage Usage Example
\`\`\`svelte
<script>
	let storage = {
		used: 45,
		cached: 20,
		available: 35
	};
</script>

<Meter 
	value={[
		{ value: storage.used, color: 'primary', label: 'Used' },
		{ value: storage.cached, color: 'info', label: 'Cached' }
	]}
	max={100}
>
	{#snippet header()}
		<div class="flex justify-between">
			<span>Storage</span>
			<span>{storage.used + storage.cached}GB / 100GB</span>
		</div>
	{/snippet}
	{#snippet helper()}
		{storage.available}GB available
	{/snippet}
</Meter>
\`\`\`

### Task Progress
\`\`\`svelte
<script>
	let tasks = {
		completed: 12,
		total: 20
	};
	let progress = (tasks.completed / tasks.total) * 100;
</script>

<Meter 
	value={{ value: progress, color: 'success' }}
>
	{#snippet label()}
		Task Progress
	{/snippet}
	{#snippet description()}
		{tasks.completed} of {tasks.total} tasks completed
	{/snippet}
</Meter>
\`\`\`

### With Custom Indicator
\`\`\`svelte
<Meter value={{ value: 75 }}>
	{#snippet indicator({ value, percentage })}
		<div class="custom-indicator">
			{value}/{max} ({percentage.toFixed(1)}%)
		</div>
	{/snippet}
</Meter>
\`\`\`

### Skill Level Meter
\`\`\`svelte
<Meter 
	value={{ value: 85, color: 'info' }}
	steps={[
		{ start: 0, end: 30, label: 'Beginner', color: 'danger', position: 'bottom' },
		{ start: 30, end: 70, label: 'Intermediate', color: 'warning', position: 'bottom' },
		{ start: 70, end: 100, label: 'Expert', color: 'success', position: 'bottom' }
	]}
>
	{#snippet label()}
		JavaScript Proficiency
	{/snippet}
</Meter>
\`\`\`

## Accessibility

- Uses semantic HTML meter/progress elements
- Labels provide context for screen readers
- ARIA attributes for current value and range
- Visual indicators have text alternatives

## Notes

- Values are animated with spring physics for smooth transitions
- Multiple values stack horizontally
- Steps provide visual milestones and labels
- Indicator position can be top or bottom
- Progress bar fills from left to right
- Colors can be set per value or inherited
`;
