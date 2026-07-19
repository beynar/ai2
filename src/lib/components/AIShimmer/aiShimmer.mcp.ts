export const aiShimmerDescription = `
# Shimmer

Animated text powered by svelai's shared Tailwind shimmer utility.

\`\`\`svelte
<script>import { Shimmer } from 'svelai/ai-shimmer';</script>
<Shimmer text="Thinking" duration={2} />
\`\`\`

Use \`children\` for rich inline content, \`duration\` in seconds, and \`spread\` to scale the highlight width. Reduced-motion behavior comes from the global utility.

\`as\` selects the rendered element. \`ref\`, native element attributes, \`class\`, and the semantic \`root\` theme slot are forwarded to that element. Variant classes such as \`shimmer-once\`, \`shimmer-reverse\`, and \`shimmer-none\` compose through \`class\`; the component defines no keyframes of its own.
`;
