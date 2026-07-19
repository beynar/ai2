export const aiToolDescription = `
# AITool

Render one AI tool call or one collapsible group of consecutive calls. Non-empty \`tools\` takes precedence over \`tool\`. Missing statuses are inferred from output and errors, while arbitrary values use circular-safe depth and entry limits.

\`\`\`svelte
<script lang="ts">
  import { AITool, type AIToolCall } from 'svelai/ai-tool';

  const tools: AIToolCall[] = [
    { id: 'search', name: 'search_docs', input: { query: 'Svelte' }, output: { count: 4 } },
    { id: 'read', name: 'read_page', status: 'running', input: { path: '/docs' } }
  ];
  let open = $state(['search']);
</script>

<AITool {tools} bind:value={open} multiple />
\`\`\`

Use \`icon\`, \`title\`, \`status\`, \`input\`, \`output\`, \`error\`, or \`content\` snippets with a \`{ tool, index }\` payload. Default value panels use the existing Svelai ScrollArea and are capped vertically while supporting both scroll axes.
`;
