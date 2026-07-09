export const imageZoomDescription = `
# ImageZoom

ImageZoom renders an accessible image trigger that opens the image into a full-viewport zoom layer.
It follows the interaction model of Kibo's React image-zoom wrapper over react-medium-image-zoom:
thumbnail trigger, controlled or uncontrolled open state, Escape/backdrop dismissal, and a blurred
modal backdrop.

## Usage

\`\`\`svelte
<script>
	import { ImageZoom } from 'svelai/image-zoom';
</script>

<ImageZoom
	src="/photos/desk-thumb.jpg"
	zoomSrc="/photos/desk.jpg"
	alt="Desk setup with a laptop and notebook"
/>
\`\`\`

## Props

- **src**: string - Thumbnail image source.
- **alt**: string - Required accessible image text.
- **zoomSrc**: string - Full-size image source. Defaults to \`src\`.
- **open**: boolean (bindable, default: false) - Controls the zoom layer.
- **disabled**: boolean (default: false) - Prevents opening.
- **width / height / srcset / sizes / loading / decoding** - Forwarded to the thumbnail image.
- **zoomMargin**: number (default: 32) - Minimum viewport margin around the zoomed image.
- **transitionDuration**: number (default: 240) - Zoom animation duration in milliseconds. Respects reduced-motion preferences.
- **closeOnClickOutside**: boolean (default: true) - Closes from the backdrop.
- **closeOnEscape**: boolean (default: true) - Closes on Escape.
- **lockScroll**: boolean (default: true) - Locks page scroll while open.
- **buttonLabel**: string (default: "Zoom image") - Accessible trigger label.
- **closeLabel**: string (default: "Close image zoom") - Accessible close/backdrop label.
- **class**: string - Additional root classes.
- **theme**: ImageZoomThemeProps - Per-instance theme overrides.
- **onOpenChange**: (open, payload) => void - Fired when user interaction requests a new open state.
- **onOpen**: (payload) => void - Fired after the open animation starts.
- **onClose**: (payload) => void - Fired after the close animation completes.

## Slots

- **children**: custom thumbnail content. Receives \`ImageZoomPayload\`.
- **caption**: caption rendered over the zoom layer. Receives \`ImageZoomPayload\`.

## Accessibility

- The thumbnail trigger is a native \`button type="button"\`.
- The zoom layer uses \`role="dialog"\` and \`aria-modal="true"\`.
- Escape closes the dialog by default.
- Focus moves to the close button after opening and returns to the trigger after closing.
- Reduced motion disables the zoom transition.

## Examples

### Controlled

\`\`\`svelte
<script>
	let open = false;
</script>

<ImageZoom bind:open src="/image.jpg" alt="Product detail" />
\`\`\`

### High-resolution zoom source

\`\`\`svelte
<ImageZoom
	src="/image-640.jpg"
	zoomSrc="/image-2400.jpg"
	alt="Architectural detail"
/>
\`\`\`

### Caption

\`\`\`svelte
<ImageZoom src="/image.jpg" alt="Mountain ridge">
	{#snippet caption()}
		<span>Shot in the late afternoon.</span>
	{/snippet}
</ImageZoom>
\`\`\`
`;
