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
- Composites \`currentColor\` at \`--state-hover-opacity\` on hover and \`data-highlighted="true"\`
- Composites \`currentColor\` at \`--state-pressed-opacity\` on \`:active\`
- Does not activate for disabled, \`data-disabled\`, or \`aria-disabled="true"\` elements
- Theme plugin defaults the opacities to 5% and 10% in light themes, and 16% and 32% in dark themes
`;
