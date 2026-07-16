export const stackDescription = `
# HStack and VStack

HStack and VStack arrange arbitrary content along one flex axis. They share spacing, wrapping,
sizing, scrolling, and theming behavior while exposing axis-aware alignment props.

## Import

\`\`\`svelte
<script lang="ts">
  import { HStack, VStack } from 'svelai/stack';
</script>
\`\`\`

## Usage

\`\`\`svelte
<VStack gap={4} padding={4}>
  <h2>Account</h2>
  <HStack gap={2} align="center" wrap="wrap">
    <span>Profile</span>
    <span>Security</span>
  </HStack>
</VStack>
\`\`\`

## Alignment

- HStack: \`hAlign\` is the main axis and \`vAlign\` is the cross axis.
- VStack: \`vAlign\` is the main axis and \`hAlign\` is the cross axis.
- \`justify\` aliases the main axis and \`align\` aliases the cross axis.
- Explicit \`hAlign\` / \`vAlign\` values take precedence over their aliases.

Main-axis values: \`start | center | end | between | around | evenly\`.
Cross-axis values: \`start | center | end | stretch\`.

## Layout props

- \`gap\`, \`padding\`, \`paddingInline\`, and \`paddingBlock\` use the numeric Svelai spacing scale.
- \`paddingInline\` and \`paddingBlock\` override \`padding\` on their axis.
- \`width\`, \`height\`, \`maxWidth\`, and \`minHeight\` accept CSS strings or pixel numbers.
- \`wrap\` accepts \`nowrap | wrap | wrap-reverse\`.
- \`isScrollable\` enables native \`overflow: auto\`.
- \`as\` changes the semantic HTML element without changing layout behavior.

Both components forward common semantic HTML attributes and Svelte attachments to the root element.
`;
