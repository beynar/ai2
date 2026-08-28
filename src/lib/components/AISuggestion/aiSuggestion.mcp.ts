export const aiSuggestionDescription = `
# Suggestion and Suggestions

Prompt suggestions rendered as a horizontal, scroll-faded button row.

- \`Suggestion\` is the theme-aware button primitive, defaults to the soft variant, accepts regular Button size, color, and variant props, and supports both \`onSelect\` and the Svelte Pro-compatible \`onclick\` alias.
- \`Suggestions\` owns horizontal scrolling, optional \`scrollFade\`, bindable \`value\`, disabled state, shared built-in item \`variant\`, and \`onSuggestionClick\`.
- Its \`suggestion\` snippet receives \`{ suggestion, selected, disabled, select }\` for composed item rendering.

\`\`\`svelte
<script>import { Suggestions } from 'svelai/ai-suggestion';</script>
<Suggestions suggestions={['Summarize', 'Explain', 'Compare']} bind:value />
\`\`\`

Use conversation-owned suggestions through \`AIThread\` or \`AIChat\` when they are the empty transcript state. An explicit selection callback takes precedence over the default conversation input update.
`;
