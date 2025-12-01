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
- **indicator**: Snippet<Meter & { percentage: number, min: number, max: number }> - Custom indicator rendering

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

### Simple Progress Bar
\`\`\`svelte
<Meter value={{ value: 65 }} />
\`\`\`

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
	{#snippet indicator({ value, percentage, min, max })}
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

## Theme Customization

The Meter component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **meter**: Main meter container styles
- **header**: Header section styles
- **container**: Progress container styles
- **label**: Label text styles
- **helper**: Helper text styles
- **description**: Description text styles
- **progress**: Progress bar element styles
- **track**: Track/background styles
- **indicator**: Value indicator styles
- **legend**: Legend container styles
- **legendItem**: Legend item styles
- **legendIcon**: Legend icon styles
- **legendLabel**: Legend label text styles
- **legendPercentage**: Legend percentage text styles

### Available Variants

**meter**:
- base: Base classes for main container
- Variants:
  - size: 'small' | 'normal' | 'large' - Container gap size

**header**:
- base: Base classes for header section
- Variants:
  - size: 'small' | 'normal' | 'large' - Gap between elements

**container**:
- base: Base classes for progress container
- Variants:
  - first: boolean - First segment styling (rounded left)
  - last: boolean - Last segment styling (rounded right)

**label**:
- base: Base classes for label text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**helper**:
- base: Base classes for helper text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**description**:
- base: Base classes for description text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**progress**:
- base: Base classes for progress bar
- Variants:
  - size: 'small' | 'normal' | 'large' - Bar height

**track**:
- base: Base classes for track/background
- Variants:
  - size: 'small' | 'normal' | 'large' - Track height
  - labelsPosition: 'top' | 'bottom' | 'both' - Margin based on label position

**indicator**:
- base: Base classes for value indicator
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size
  - position: 'top' | 'bottom' - Indicator position

**legend**:
- base: Base classes for legend container
- Variants:
  - size: 'small' | 'normal' | 'large' - Legend size

**legendItem**:
- base: Base classes for legend items
- Variants:
  - size: 'small' | 'normal' | 'large' - Gap between elements

**legendIcon**:
- base: Base classes for legend icons
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size

**legendLabel**:
- base: Base classes for legend labels
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

**legendPercentage**:
- base: Base classes for legend percentages
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Meter 
  value={{ value: 75 }}
  theme={{
    meter: {
      base: 'flex flex-col',
      size: {
        normal: 'gap-2'
      }
    },
    track: {
      base: 'rounded-full bg-gray-200',
      size: {
        normal: 'h-2'
      }
    }
  }}
/>
\`\`\`

**Custom Progress Bar**:
\`\`\`svelte
<Meter 
  value={{ value: 60 }}
  theme={{
    progress: {
      base: 'bg-gradient-to-r from-primary to-secondary',
      size: {
        large: 'h-4'
      }
    },
    track: {
      base: 'bg-gray-100 rounded-full',
      size: {
        large: 'h-4'
      }
    },
    indicator: {
      base: 'text-sm font-semibold',
      position: {
        top: 'bottom-full mb-2'
      }
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setMeterTheme } from 'svelai/meter';
  
  setMeterTheme({
    meter: {
      base: 'flex flex-col',
      size: {
        normal: 'gap-2'
      }
    },
    track: {
      base: 'rounded-full bg-gray-200',
      size: {
        normal: 'h-2'
      }
    },
    progress: {
      base: 'bg-primary rounded-full'
    }
  });
</script>
\`\`\`
`;
