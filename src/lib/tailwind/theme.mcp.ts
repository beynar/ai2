export const themePluginDescription = `
# Theme Tailwind Plugin - Configuration Keys

\`@plugin './lib/tailwind/theme'\`

## Configuration Options

### Theme Identity

#### \`name\`
- **Type**: \`string\`
- **Default**: \`undefined\`
- **Description**: Theme name used for \`data-theme\` attribute switching
- **Example**: \`name: dark;\`

#### \`default\`
- **Type**: \`boolean\`
- **Default**: \`false\`
- **Description**: Set this theme as the default (applies to \`<html>\` without data-theme)
- **Example**: \`default: true;\`

### Color Scheme

#### \`colorscheme\`
- **Type**: \`'light' | 'dark'\`
- **Default**: \`'light'\`
- **Description**: Base color scheme for the theme
- **Example**: \`colorscheme: dark;\`

#### \`prefersDark\`
- **Type**: \`boolean\`
- **Default**: \`false\`
- **Description**: Enable automatic switching based on \`prefers-color-scheme: dark\`
- **Example**: \`prefersDark: true;\`

### Color Adjustments

#### \`luminance\`
- **Type**: \`number\`
- **Range**: \`-100\` to \`100\`
- **Default**: \`0\`
- **Description**: Adjust overall brightness (positive = lighter, negative = darker)
- **Example**: \`luminance: 10;\`

#### \`saturation\`
- **Type**: \`number\`
- **Range**: \`-100\` to \`100\`
- **Default**: \`0\`
- **Description**: Adjust color saturation (positive = more saturated, negative = desaturated)
- **Example**: \`saturation: 15;\`

### Base Colors

#### \`primary\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#6366f1\` (light) / \`#818cf8\` (dark)
- **Description**: Primary brand color
- **Examples**: \`primary: #6366f1;\` or \`primary: indigo;\`

#### \`secondary\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#6366f1\` (light) / \`#818cf8\` (dark)
- **Description**: Secondary brand color
- **Example**: \`secondary: #8b5cf6;\`

#### \`danger\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#ff0000\`
- **Description**: Error/danger state color
- **Example**: \`danger: #ef4444;\`

#### \`success\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#0070f3\`
- **Description**: Success state color
- **Example**: \`success: #22c55e;\`

#### \`warning\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#f5a623\`
- **Description**: Warning state color
- **Example**: \`warning: #f59e0b;\`

#### \`info\`
- **Type**: \`string\` (hex color or Tailwind color name)
- **Default**: \`#50e3c2\`
- **Description**: Info state color
- **Example**: \`info: #3b82f6;\`

#### \`surface\`
- **Type**: \`string\` (hex color)
- **Default**: \`#FFFFFF\` (light) / \`#000000\` (dark)
- **Description**: Seed for the mode-aware surface elevation ladder
- **Example**: \`surface: #ffffff;\`

#### \`neutral\`
- **Type**: \`string\` (hex color)
- **Default**: Derived as the perceptual reverse of \`surface\`
- **Description**: Achromatic semantic color used for text, icons, solid neutral controls, and borders
- **Example**: \`neutral: #0a0a0a;\`

### Surface Elevation Overrides

The surface ladder is separate from semantic color variants:

- \`surface-recessed\`: inset wells and grouped-control tracks
- \`surface-canvas\`: deepest app background
- \`surface\`: ordinary resting surface
- \`surface-raised\`: cards and raised containers
- \`surface-floating\`: popovers, dialogs, and floating overlays

Each value is optional. Missing grades preserve the surface seed's hue and chroma while using
mode-aware OKLCH lightness targets.

### Interaction State Layers

#### \`state-hover-opacity\`
- **Type**: \`number\`
- **Default**: \`0.05\` in light themes; \`0.16\` in dark themes
- **Description**: Opacity of the current-color state layer on hover and \`data-highlighted="true"\`
- **Example**: \`state-hover-opacity: 0.06;\`

#### \`state-pressed-opacity\`
- **Type**: \`number\`
- **Default**: \`0.10\` in light themes; \`0.32\` in dark themes
- **Description**: Opacity of the current-color state layer while an element is pressed
- **Example**: \`state-pressed-opacity: 0.12;\`

Use surface grades for resting elevation, \`.state-layer\` for transient interaction,
focus rings for keyboard focus, and \`*-muted\` or solid colors for persistent semantic states.
The layer uses \`currentColor\`, so a surface with dark content darkens while a surface with light
content lightens. Its direction follows the content contrast instead of a hard-coded palette grade.

### Color Variant Overrides

For each semantic color (primary, secondary, danger, success, warning, info, neutral), you can override specific variants:

#### \`{color}-light\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (+15% lightness)
- **Description**: Light variant of the color
- **Example**: \`primary-light: #a5b4fc;\`

#### \`{color}-lighter\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (+25% lightness)
- **Description**: Lighter variant of the color
- **Example**: \`primary-lighter: #ddd6fe;\`

#### \`{color}-dark\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (-15% lightness)
- **Description**: Dark variant of the color
- **Example**: \`primary-dark: #4338ca;\`

#### \`{color}-muted\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (mixed with \`surface\`)
- **Description**: Muted/subtle variant of the color
- **Example**: \`primary-muted: #e0e7ff;\`

#### \`{color}-contrast\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (black or white for foreground)
- **Description**: Foreground color (text on colored background)
- **Example**: \`primary-contrast: #ffffff;\`

### Design Tokens

#### \`radius\`
- **Type**: \`'normal' | 'small' | 'large' | 'subtile' | 'none' | 'round' | number\`
- **Default**: \`normal\` (1×)
- **Description**: Multiplier applied to the native Tailwind radius scale (\`rounded-sm\` … \`rounded-4xl\` and bare \`rounded\`). One value rounds the whole UI proportionally.
- **Presets** (multiplier):
  - \`none\`: 0×
  - \`subtile\`: 0.5×
  - \`small\`: 0.75×
  - \`normal\`: 1× (native defaults)
  - \`large\`: 1.5×
  - \`round\`: 2.5×
- **Example**: \`radius: large;\` or \`radius: 1.25;\`

#### \`spacing\`
- **Type**: \`'normal' | 'small' | 'large' | number\`
- **Default**: \`0.25\` (rem)
- **Description**: Spacing scale
- **Presets**:
  - \`normal\`: 0.25rem
  - \`small\`: 0.2rem
  - \`large\`: 0.3rem
- **Example**: \`spacing: large;\` or \`spacing: 0.3;\`

#### \`scale\`
- **Type**: \`'minorSecond' | 'majorSecond' | 'minorThird' | 'majorThird' | 'perfectFourth' | 'augmentedFourth'\`
- **Default**: \`'majorThird'\`
- **Description**: Typography scale ratio
- **Ratios**:
  - \`minorSecond\`: 1.067
  - \`majorSecond\`: 1.125
  - \`minorThird\`: 1.2
  - \`majorThird\`: 1.25
  - \`perfectFourth\`: 1.333
  - \`augmentedFourth\`: 1.414
- **Example**: \`scale: perfectFourth;\`

#### \`raised-with-border\`
- **Type**: \`boolean\`
- **Default**: \`false\`
- **Description**: Show borders on raised elements in light mode
- **Example**: \`raised-with-border: true;\`

#### \`spinner\`
- **Type**: \`Spinner\` object
- **Default**: Auto-generated
- **Description**: Custom spinner configuration

## Complete Example

\`\`\`css
@plugin './lib/tailwind/theme' {
  name: custom;
  default: true;
  colorscheme: light;
  prefersDark: false;
  
  luminance: 5;
  saturation: 10;
  
  primary: #6366f1;
  secondary: #8b5cf6;
  danger: #ef4444;
  success: #22c55e;
  warning: #f59e0b;
  info: #3b82f6;
  surface: #fafafa;
  neutral: #121212;
  state-hover-opacity: 0.05;
  state-pressed-opacity: 0.10;
  
  primary-light: #a5b4fc;
  primary-dark: #4338ca;
  
  radius: normal;
  spacing: large;
  scale: majorThird;
  raised-with-border: true;
}
\`\`\`

Apply the interaction model once instead of selecting opposite palette grades per mode:

\`\`\`html
<button class="state-layer bg-primary text-primary-contrast rounded px-3 py-1.5">
  Primary
</button>
\`\`\`
`;
