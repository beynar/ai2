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
`;
