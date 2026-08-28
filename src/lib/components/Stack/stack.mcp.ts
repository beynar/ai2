export const stackDescription = `
# Stack

Stack arranges arbitrary content along one flex axis. Use the \`orientation\` prop to switch
between horizontal and vertical layout, and \`align\` / \`justify\` for cross-axis and main-axis
alignment.

## Import

\`\`\`svelte
<script lang="ts">
  import { Stack } from 'svelai/stack';
</script>
\`\`\`

## Usage

\`\`\`svelte
<Stack gap={4} padding={4}>
  <h2>Account</h2>
  <Stack orientation="horizontal" align="center" gap={2} wrap="wrap">
    <span>Profile</span>
    <span>Security</span>
  </Stack>
</Stack>
\`\`\`

## Props

- \`orientation\`: \`'horizontal' | 'vertical'\` — flex direction (default: \`'vertical'\`).
- \`align\`: cross-axis alignment — \`start | center | end | stretch\` (default: \`'stretch'\`).
- \`justify\`: main-axis alignment — \`start | center | end | between | around | evenly\` (default: \`'start'\`).
- \`gap\`, \`padding\`, \`paddingInline\`, \`paddingBlock\` use the numeric Svelai spacing scale.
- \`paddingInline\` and \`paddingBlock\` override \`padding\` on their axis.
- \`width\`, \`height\`, \`maxWidth\`, and \`minHeight\` accept CSS strings or pixel numbers.
- \`wrap\` accepts \`nowrap | wrap | wrap-reverse\`.
- \`isScrollable\` enables native \`overflow: auto\`.
- \`as\` changes the semantic HTML element without changing layout behavior.

Stack forwards common semantic HTML attributes and Svelte attachments to the root element.
`;
