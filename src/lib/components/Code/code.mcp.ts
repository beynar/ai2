export const codeDescription = `
# Code Component

The Code component displays formatted code snippets with syntax highlighting support and proper typography for inline or block code.

## Basic Usage

\`\`\`svelte
<Code>const hello = 'world';</Code>
\`\`\`

## Props

### Core Props
- **language**: string - Programming language for syntax highlighting
- **inline**: boolean (default: false) - Renders as inline code instead of block
- **children**: Snippet - Code content to display

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Examples

### Inline Code
\`\`\`svelte
<p>Use the <Code inline>console.log()</Code> function to debug.</p>
\`\`\`

### Block Code
\`\`\`svelte
<Code language="javascript">
const greeting = 'Hello World';
console.log(greeting);
</Code>
\`\`\`

### Multiple Languages
\`\`\`svelte
<Code language="typescript">
interface User {
  name: string;
  age: number;
}
</Code>

<Code language="css">
.button {
  padding: 1rem;
  background: blue;
}
</Code>
\`\`\`

## Notes

- Inline code is rendered as \`<code>\` within text
- Block code is rendered as \`<pre><code>\`
- Preserves whitespace and formatting
- Monospace font is automatically applied
`;
