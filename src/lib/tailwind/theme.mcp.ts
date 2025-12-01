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
- **Default**: \`#FAFAFA\` (light) / \`#121212\` (dark)
- **Description**: Background surface color
- **Example**: \`surface: #ffffff;\`

#### \`contrast\`
- **Type**: \`string\` (hex color)
- **Default**: \`#121212\` (light) / \`#FAFAFA\` (dark)
- **Description**: High contrast text/foreground color
- **Example**: \`contrast: #0a0a0a;\`

### Color Variant Overrides

For each base color (primary, secondary, danger, success, warning, info, surface, contrast), you can override specific variants:

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
- **Default**: Auto-generated (mixed with surface)
- **Description**: Muted/subtle variant of the color
- **Example**: \`primary-muted: #e0e7ff;\`

#### \`{color}-fg\`
- **Type**: \`string\` (hex color)
- **Default**: Auto-generated (black or white for contrast)
- **Description**: Foreground color (text on colored background)
- **Example**: \`primary-fg: #ffffff;\`

### Design Tokens

#### \`radius\`
- **Type**: \`'normal' | 'small' | 'large' | 'subtile' | 'none' | 'round' | number\`
- **Default**: \`0.25\` (rem)
- **Description**: Border radius scale
- **Presets**:
  - \`normal\`: 0.25rem
  - \`small\`: 0.125rem
  - \`large\`: 0.5rem
  - \`subtile\`: 0.09rem
  - \`none\`: 0
  - \`round\`: 1rem
- **Example**: \`radius: large;\` or \`radius: 0.5;\`

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
  
  primary-light: #a5b4fc;
  primary-dark: #4338ca;
  
  radius: normal;
  spacing: large;
  scale: majorThird;
  raised-with-border: true;
}
\`\`\`
`;
