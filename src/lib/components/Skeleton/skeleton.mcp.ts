export const skeletonDescription = `
# Skeleton Component

The Skeleton component is a loading placeholder element that displays a pulsing animation to indicate that content is being loaded. It provides a visual feedback mechanism while data is being fetched or processed.

## Basic Usage

\`\`\`svelte
<Skeleton />
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'contrast' | 'surface' (default: 'contrast')
  - Determines the color scheme of the skeleton
  - contrast: High contrast color (default)
  - primary, secondary, danger, success, warning, info: Semantic colors
  - surface: Muted surface color

### Styling Props
- **class**: string - Additional CSS classes for the skeleton container
- **theme**: ComponentTheme - Custom theme overrides

### Content Props
- **children**: Snippet - Optional content to display inside the skeleton

## Structure

\`\`\`
<Skeleton>
	<Children />    <!-- Optional content -->
</Skeleton>
\`\`\`

## Examples

### Basic Skeleton
\`\`\`svelte
<Skeleton />
\`\`\`

### Skeleton with Different Colors
\`\`\`svelte
<div class="space-y-2">
	<Skeleton color="primary" class="h-4 w-full" />
	<Skeleton color="danger" class="h-4 w-full" />
	<Skeleton color="success" class="h-4 w-full" />
	<Skeleton color="warning" class="h-4 w-full" />
	<Skeleton color="info" class="h-4 w-full" />
</div>
\`\`\`

### Skeleton with Custom Size
\`\`\`svelte
<Skeleton class="h-12 w-full" />
\`\`\`

### Skeleton with Custom Width
\`\`\`svelte
<Skeleton class="h-4 w-3/4" />
\`\`\`

### Circular Skeleton (for avatars)
\`\`\`svelte
<Skeleton class="h-12 w-12 rounded-full" />
\`\`\`

### Text Line Skeletons
\`\`\`svelte
<div class="space-y-2">
	<Skeleton class="h-4 w-full" />
	<Skeleton class="h-4 w-5/6" />
	<Skeleton class="h-4 w-4/6" />
</div>
\`\`\`

### Card Skeleton
\`\`\`svelte
<div class="space-y-4">
	<Skeleton class="h-48 w-full rounded-lg" />
	<div class="space-y-2">
		<Skeleton class="h-4 w-full" />
		<Skeleton class="h-4 w-3/4" />
	</div>
</div>
\`\`\`

### Table Row Skeleton
\`\`\`svelte
<div class="flex gap-4">
	<Skeleton class="h-10 w-10 rounded" />
	<Skeleton class="h-10 flex-1" />
	<Skeleton class="h-10 w-24" />
</div>
\`\`\`

## Styling

The skeleton uses \`animate-pulse\` for the pulsing animation and supports color variants. You can customize the appearance by:

1. Using the \`color\` prop to change the background color (default: 'contrast')
2. Adding custom classes via the \`class\` prop
3. Overriding the theme via the \`theme\` prop
4. Using Tailwind utility classes for size, shape, and spacing

## Common Patterns

### Loading State Pattern
\`\`\`svelte
{#if loading}
	<Skeleton class="h-64 w-full" />
{:else}
	<Content />
{/if}
\`\`\`

### Multiple Skeletons
\`\`\`svelte
<div class="space-y-4">
	{#each { length: 3 } as _}
		<Skeleton class="h-20 w-full" />
	{/each}
</div>
\`\`\`

## Accessibility

- Skeletons are purely visual loading indicators
- Consider adding \`aria-label="Loading"\` or \`aria-busy="true"\` for screen readers
- Ensure skeletons match the approximate size and shape of the content being loaded
- Replace skeletons with actual content as soon as data is available

## Notes

- The skeleton uses CSS animation (\`animate-pulse\`) which is provided by Tailwind CSS
- The default color is 'contrast' which provides high visibility
- Color variants use the theme's color system and adapt to your theme configuration
- Skeletons should be replaced with actual content once loading is complete
- Consider using skeletons that match the layout of the content being loaded for better UX
- Use semantic colors (danger, success, warning) when the skeleton represents specific states

## Theme Customization

The Skeleton component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **skeleton**: Main skeleton element styles

### Available Variants

**skeleton**:
- base: Base classes for skeleton element (includes animation)
- Variants:
  - color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'contrast' | 'surface' - Background color

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Skeleton 
  theme={{
    skeleton: {
      base: 'rounded-lg',
      color: {
        primary: 'bg-primary/30'
      }
    }
  }}
/>
\`\`\`

**Custom Animation**:
\`\`\`svelte
<Skeleton 
  theme={{
    skeleton: {
      base: 'animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200',
      color: {
        contrast: 'bg-gray-200'
      }
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setSkeletonTheme } from 'svelai/skeleton';
  
  setSkeletonTheme({
    skeleton: {
      base: 'animate-pulse rounded-md',
      color: {
        contrast: 'bg-gray-200/50',
        primary: 'bg-primary/20'
      }
    }
  });
</script>
\`\`\`
`;

