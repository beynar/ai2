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

## Theme Customization

The Code component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **code**: Main code container styles
- **header**: Optional header section styles
- **footer**: Optional footer section styles
- **container**: Code content container styles
- **pre**: Preformatted text wrapper styles
- **line**: Individual code line styles

### Theme Type Definition

\`\`\`typescript
import type { CodeThemeProps } from 'svelai/code';

// Example theme customization
const customTheme: CodeThemeProps = {
  code: {
    base: 'my-4 w-full overflow-hidden rounded-lg border border-surface-muted flex flex-col'
  },
  header: {
    base: 'flex items-center justify-between bg-surface-muted px-2 py-1 text-contrast-muted text-xs'
  },
  footer: {
    base: 'flex items-center justify-between bg-surface-muted px-2 py-1 text-contrast-muted text-xs'
  },
  container: {
    base: 'h-fit w-full bg-surface p-2 font-mono text-sm'
  },
  pre: {
    base: 'overflow-x-auto font-mono p-0'
  },
  line: {
    base: 'block'
  }
};
\`\`\`

### Available Variants

**code**:
- base: Base classes for the main code container

**header**:
- base: Base classes for header section (when provided)

**footer**:
- base: Base classes for footer section (when provided)

**container**:
- base: Base classes for code content container

**pre**:
- base: Base classes for preformatted wrapper

**line**:
- base: Base classes for individual code lines

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Code 
  language="javascript"
  theme={{
    code: {
      base: 'rounded-xl shadow-lg border-2'
    },
    container: {
      base: 'bg-gray-900 text-gray-100 p-4'
    }
  }}
>
  const example = 'code';
</Code>
\`\`\`

**Custom Header and Footer**:
\`\`\`svelte
<Code 
  language="typescript"
  theme={{
    header: {
      base: 'bg-blue-500 text-white px-4 py-2 font-semibold'
    },
    footer: {
      base: 'bg-gray-800 text-gray-300 px-4 py-1 text-xs'
    },
    container: {
      base: 'bg-gray-900 p-6'
    }
  }}
>
  interface Example { value: string; }
</Code>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setCodeTheme } from 'svelai/code';
  
  setCodeTheme({
    code: {
      base: 'rounded-lg border-2 border-primary/20'
    },
    container: {
      base: 'bg-slate-900 text-slate-100 p-4 font-mono text-sm'
    },
    pre: {
      base: 'overflow-x-auto'
    }
  });
</script>
\`\`\`
`;
