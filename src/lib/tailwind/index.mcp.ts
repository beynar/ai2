export const tailwindPluginDescription = `
# Main Tailwind Plugin - Configuration Keys

\`@plugin './lib/tailwind/index'\`

## Configuration Options

### \`raised-with-border\`
- **Type**: \`boolean\`
- **Default**: \`false\`
- **Description**: Controls whether raised elements show a border in light mode. Dark mode always shows border regardless of this setting.

**Example:**
\`\`\`css
@plugin './lib/tailwind/index' {
  raised-with-border: true;
}
\`\`\`

### \`spinner\`
- **Type**: \`Spinner\` object
- **Default**: Auto-generated
- **Description**: Custom spinner configuration for the \`.ui-spinner\` class

## Shared utilities

### \`.state-layer\`
- Composites \`--color-overlay-hover\` on hover and \`data-highlighted="true"\`
- Composites \`--color-overlay-pressed\` on \`:active\`
- Does not activate for disabled, \`data-disabled\`, or \`aria-disabled="true"\` elements
- Theme plugin defaults derive both variables from the generated foreground color
`;
