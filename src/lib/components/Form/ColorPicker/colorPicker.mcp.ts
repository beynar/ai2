export const colorPickerDescription = `
# ColorPicker Component

A standalone color picker panel (a faithful clone of the kibo-ui color picker). It is a
self-contained rounded panel — a saturation/value square, a hue slider, an alpha slider, an
eyedropper button, and a format select with a color text input and an alpha percentage input.
It is the display/interaction panel that a form field can later wrap.

## Basic Usage

\`\`\`svelte
<script>
	import { ColorPicker } from 'svelai';
	let color = $state('#6366f1');
</script>

<ColorPicker bind:value={color} />
<ColorPicker bind:value={color} format="rgb" size="large" />
<ColorPicker value="#22c55e80" onChange={(hex) => console.log(hex)} />
<ColorPicker value="#000000" disabled />
\`\`\`

## Props

### Core Props
- **value**: \`string\` (bindable, default: \`'#000000'\`)
  - The selected color. The canonical output is always hex: \`#rrggbb\`, or \`#rrggbbaa\` when alpha < 1.
  - Any parseable CSS color is accepted programmatically (named colors, \`rgb()\`, \`rgba()\`, \`hsl()\`, \`hsla()\`, \`#rgb\`, \`#rrggbb\`, \`#rrggbbaa\`).
  - Hue and saturation are preserved internally, so dragging a color to black/white or typing a gray never loses the chosen hue.
- **format**: \`'hex' | 'rgb' | 'hsl'\` (bindable, default: \`'hex'\`)
  - Controls the text representation shown in the input. The bound \`value\` stays hex regardless of this.

### Style Props
- **size**: \`'small' | 'normal' | 'large'\` (default: \`'normal'\`)
  - Scales the panel width, slider heights, thumb sizes and text sizes.
- **disabled**: \`boolean\` (default: \`false\`) - Disables every control and dims the panel.

### Event Props
- **onChange**: \`(value: string) => void\`
  - Fires on every committed change, including continuously while dragging. Receives the canonical hex string.

### Advanced Props
- **class**: \`string\` - Extra classes merged onto the root panel.
- **theme**: \`ColorPickerThemeProps\` - Theme overrides for the panel parts.
- **i18n**: \`Partial<Messages>\` - Per-instance i18n overrides merged over the global catalog.

## Structure

A rounded \`root\` panel containing, top to bottom:
1. The \`area\` — a saturation/value square with a solid hue backdrop and two gradient overlays
   (\`areaSaturation\` white→transparent left-to-right, \`areaValue\` transparent→black top-to-bottom),
   plus a draggable circular \`areaThumb\`.
2. A \`controls\` row — a square \`eyedropperButton\` and a \`sliders\` column with a rainbow
   \`hueTrack\` (0–360) and a checkerboard \`alphaTrack\` (the \`alphaGradient\` overlays a pure-CSS
   checkerboard), each with a white \`sliderThumb\`.
3. An \`inputs\` row — a native \`select\` (hex/rgb/hsl), the color \`input\`, and an \`alphaField\`
   wrapping the \`alphaInput\` (0–100) and its \`alphaSuffix\` (\`%\`).

## Interaction

- The square and both sliders support click-to-jump and continuous pointer drag.
- The color text input is masked (Maskito) for the selected format — hex auto-inserts the leading \`#\`
  and accepts up to 8 hex digits; rgb/hsl constrain keystrokes to their notation — and commits on
  Enter or blur; an incomplete entry reverts.
- The alpha input is masked to 0–100 and commits on change; the format select only changes the text representation.
- The eyedropper uses the native \`window.EyeDropper\` API and is disabled where unsupported (SSR-safe).

## Accessibility

- The area thumb and both slider thumbs are focusable \`role="slider"\` elements with
  \`aria-valuemin\`/\`aria-valuemax\`/\`aria-valuenow\` and localized \`aria-label\`s.
- Keyboard: on the square, Left/Right adjust saturation and Up/Down adjust value; on the sliders,
  arrow keys step (Shift for a larger step) and Home/End jump to min/max.
- The eyedropper, color input, format select and alpha input all carry localized aria-labels.

## Notes
- Canonical \`value\` is hex; use \`format\` only to change the input's text representation.
- Theme parts: \`root\`, \`area\`, \`areaSaturation\`, \`areaValue\`, \`areaThumb\`, \`controls\`,
  \`eyedropperButton\`, \`sliders\`, \`hueTrack\`, \`alphaTrack\`, \`alphaGradient\`, \`sliderThumb\`,
  \`inputs\`, \`select\`, \`input\`, \`alphaField\`, \`alphaInput\`, \`alphaSuffix\` (each with a \`size\` variant).
`;
