export const carouselDescription = `
# Carousel Component

The Carousel component displays a scrollable collection of items with navigation controls and dot indicators. It features responsive layouts, touch/drag support, and accessible navigation.

## Basic Usage

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<Carousel>
	{#each items as item}
		<div>
			{item.content}
		</div>
	{/each}
</Carousel>
\`\`\`

## Props

### Layout Props
- **layout**: ResponsiveProperty (default: { default: 1 })
  - Number of items visible at each breakpoint
  - Example: \`{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }\`
  - Breakpoints: \`xs\` (< 640px), \`sm\` (≥ 640px), \`md\` (≥ 768px), \`lg\` (≥ 1024px), \`xl\` (≥ 1280px)

- **gaps**: ResponsiveProperty (default: { default: 20 })
  - Gap in pixels between items at each breakpoint
  - Example: \`{ default: 20, md: 30, lg: 40 }\`

- **partialDelta**: ResponsiveProperty (default: { default: 0 })
  - Pixels to show from the next item (preview effect)
  - Example: \`{ default: 30 }\` shows 30px of the next item

### Navigation Props
- **navigationButton**: object | Snippet<[CarouselState, NavigationButton, 'prev' | 'next']>
  - Object with styling: \`{ color: 'primary', size: 'md' }\`
  - Custom snippet for full control
  - Available colors: \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\`, \`surface\`, \`contrast\`
  - Available sizes: \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`default\`

- **dots**: object | Snippet<[CarouselState, Dot[]]>
  - Object with styling: \`{ color: 'primary', size: 'md' }\`
  - Custom snippet for full control
  - Available colors: \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\`, \`surface\`, \`contrast\`
  - Available sizes: \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`default\`

### Behavior Props
- **dragFree**: boolean (default: false)
  - If true, allows free dragging without snap points
  - If false, snaps to item positions

### Slot Props
- **children**: Snippet<[CarouselState]> (required)
  - Carousel items content
  - Receives CarouselState for advanced control

### Styling Props
- **class**: string - Additional CSS classes for container
- **theme**: CarouselThemeProps - Custom theme overrides

## Examples

### Basic Carousel

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
	
	const items = [
		{ id: 1, title: 'Slide 1', image: '/image1.jpg' },
		{ id: 2, title: 'Slide 2', image: '/image2.jpg' },
		{ id: 3, title: 'Slide 3', image: '/image3.jpg' }
	];
</script>

<Carousel 
	navigationButton={{ color: 'primary', size: 'md' }}
	dots={{ color: 'primary', size: 'md' }}
>
	{#each items as item}
		<div class="rounded-lg bg-surface p-6">
			<img src={item.image} alt={item.title} />
			<h3>{item.title}</h3>
		</div>
	{/each}
</Carousel>
\`\`\`

### Responsive Layout

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<Carousel 
	layout={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
	gaps={{ default: 16, lg: 24 }}
	navigationButton={{ color: 'primary' }}
	dots={{ color: 'primary' }}
>
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>
\`\`\`

### With Preview (Partial Delta)

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<Carousel 
	layout={{ default: 1 }}
	partialDelta={{ default: 50 }}
	navigationButton={{ color: 'primary' }}
	dots={{ color: 'primary' }}
>
	{#each items as item}
		<div class="h-96 rounded-lg bg-primary p-8">
			{item.content}
		</div>
	{/each}
</Carousel>
\`\`\`

### Free Drag Mode

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<Carousel 
	dragFree
	layout={{ default: 3 }}
	gaps={{ default: 16 }}
	navigationButton={{ color: 'contrast' }}
>
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>
\`\`\`

### Custom Navigation Buttons

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
	import { Button } from 'svelai/button';
</script>

<Carousel dots={{ color: 'primary' }}>
	{#snippet navigationButton(carousel, a11y, direction)}
		<Button 
			{...a11y}
			color="secondary"
			variant="solid"
			onClick={() => direction === 'prev' ? carousel.prev() : carousel.next()}
		>
			{direction === 'prev' ? '← Previous' : 'Next →'}
		</Button>
	{/snippet}
	
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>
\`\`\`

### Custom Dots

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<Carousel navigationButton={{ color: 'primary' }}>
	{#snippet dots(carousel, dotItems)}
		<div class="flex gap-2 justify-center mt-4">
			{#each dotItems as dot, i}
				<button
					{...dot.attributes}
					class="h-3 w-3 rounded-full transition-all"
					class:bg-primary={dot.active}
					class:bg-contrast-muted={!dot.active}
					class:scale-125={dot.active}
				>
					<span class="sr-only">Slide {i + 1}</span>
				</button>
			{/each}
		</div>
	{/snippet}
	
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>
\`\`\`

### Programmatic Control

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
	import { Button } from 'svelai/button';
</script>

<Carousel 
	navigationButton={{ color: 'primary' }}
	dots={{ color: 'primary' }}
>
	{#snippet children(carousel)}
		{#each items as item}
			<div>{item.content}</div>
		{/each}
		
		<!-- External controls -->
		<div class="mt-4 flex gap-2">
			<Button onClick={() => carousel.prev()}>Previous</Button>
			<Button onClick={() => carousel.next()}>Next</Button>
			<Button onClick={() => carousel.moveToSlide({ node: carousel.sortedSlides[0]?.node })}>
				First Slide
			</Button>
		</div>
	{/snippet}
</Carousel>
\`\`\`

### Different Colors

\`\`\`svelte
<script>
	import { Carousel } from 'svelai/carousel';
</script>

<!-- Primary theme -->
<Carousel 
	navigationButton={{ color: 'primary', size: 'md' }}
	dots={{ color: 'primary' }}
>
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>

<!-- Secondary theme -->
<Carousel 
	navigationButton={{ color: 'secondary', size: 'lg' }}
	dots={{ color: 'secondary' }}
>
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>

<!-- Danger theme -->
<Carousel 
	navigationButton={{ color: 'danger', size: 'sm' }}
	dots={{ color: 'danger' }}
>
	{#each items as item}
		<div>{item.content}</div>
	{/each}
</Carousel>
\`\`\`

## CarouselState API

The \`CarouselState\` instance passed to the children snippet provides:

### Properties
- **currentSlide**: Slide | undefined - Currently visible slide
- **lastSlideInView**: Slide | undefined - Last visible slide in viewport
- **canScrollNext**: boolean - Whether can scroll to next
- **canScrollPrev**: boolean - Whether can scroll to previous
- **sortedSlides**: Slide[] - Array of all slides
- **dots**: Dot[] - Array of dot indicators with active state
- **breakpoint**: Sizes - Current responsive breakpoint
- **resolvedLayout**: number - Number of items visible at current breakpoint
- **resolvedGaps**: number - Gap size at current breakpoint

### Methods
- **next(count?: number)**: void - Move to next slide(s)
- **prev(count?: number)**: void - Move to previous slide(s)
- **moveToSlide(slide: { node: HTMLElement })**: void - Jump to specific slide

### Button Attributes
- **nextButton**: object - Attributes for next button (disabled, aria-*, onclick)
- **prevButton**: object - Attributes for previous button (disabled, aria-*, onclick)

## Responsive Breakpoints

The Carousel uses a mobile-first responsive system:

- **xs**: < 640px (mobile)
- **sm**: ≥ 640px (tablet)
- **md**: ≥ 768px (tablet landscape)
- **lg**: ≥ 1024px (desktop)
- **xl**: ≥ 1280px (large desktop)

All responsive properties support these breakpoints plus \`default\` as a fallback.

## Accessibility

- ARIA attributes on all interactive elements
- Keyboard navigation support
- Screen reader announcements for slide changes
- Focus management
- Proper roles and labels
- Touch and mouse drag support

## Notes

- Carousel automatically handles responsive layouts
- Drag to scroll on touch devices
- Snap to items by default (disable with \`dragFree\`)
- Navigation buttons disable when at start/end
- Dots indicate current position
- Smooth scroll behavior
- Items are lazily measured for optimal performance
- Supports any content (images, cards, videos, etc.)

## Theme Customization

The Carousel component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **container**: Main carousel container styles
- **slider**: Scrollable slider container styles
- **navigationButton**: Previous/next navigation button styles
- **dots**: Dots container styles
- **dot**: Individual dot indicator styles

### Available Variants

**container**:
- base: Base classes for main container

**slider**:
- base: Base classes for scrollable slider

**navigationButton**:
- base: Base classes for navigation buttons
- Variants:
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default' - Button size
  - color: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' - Button color
  - disabled: boolean - Disabled state styling
  - direction: 'previous' | 'next' - Button position

**dots**:
- base: Base classes for dots container
- Variants:
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default' - Gap between dots
  - position: 'top' | 'bottom' | 'left' | 'right' - Dots position

**dot**:
- base: Base classes for individual dots
- Variants:
  - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default' - Dot size
  - color: Color variants
  - active: boolean - Active dot styling

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Carousel 
  items={items}
  theme={{
    container: {
      base: 'relative'
    },
    navigationButton: {
      size: {
        md: 'w-10 h-10'
      },
      color: {
        primary: 'bg-primary text-white'
      }
    }
  }}
>
  {#snippet children()}
    {#each items as item}
      <div>{item.content}</div>
    {/each}
  {/snippet}
</Carousel>
\`\`\`

**Custom Dot Styling**:
\`\`\`svelte
<Carousel 
  items={items}
  theme={{
    dot: {
      base: 'rounded-full transition-all',
      size: {
        md: 'h-2 w-2'
      },
      active: {
        true: 'bg-primary scale-125',
        false: 'bg-gray-300'
      }
    },
    dots: {
      position: {
        bottom: 'bottom-4'
      }
    }
  }}
>
  {#snippet children()}
    {#each items as item}
      <div>{item.content}</div>
    {/each}
  {/snippet}
</Carousel>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setCarouselTheme } from 'svelai/carousel';
  
  setCarouselTheme({
    container: {
      base: 'relative overflow-hidden'
    },
    navigationButton: {
      base: 'rounded-full bg-white shadow-lg',
      size: {
        default: 'w-8 h-8'
      }
    },
    dot: {
      base: 'rounded-full transition-all',
      active: {
        true: 'bg-primary'
      }
    }
  });
</script>
\`\`\`
`;

