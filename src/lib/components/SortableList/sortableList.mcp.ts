export const sortableListDescription = `
# SortableList Component

A vertical list whose items are reordered by drag and drop, animated by default: the lifted row follows the pointer while a placeholder holds its slot, displaced rows slide into place, and the drop settles smoothly. Built on @dnd-kit-svelte with a keyboard sensor, so sorting also works from the keyboard out of the box. Generic over the item type \`T\`.

## Basic Usage

\`\`\`svelte
<script lang="ts">
	import { SortableList } from 'svelai/sortable-list';
	let items = $state([
		{ id: '1', label: 'Write the brief' },
		{ id: '2', label: 'Design the mockups' },
		{ id: '3', label: 'Ship it' }
	]);
</script>

<SortableList bind:items />
\`\`\`

Items need a stable, unique \`id\` property (primitive items are matched by value).

## Props

### Core Props
- **items**: \`T[]\` (required, bindable)
  - The list items in display order. They are reordered live as the user drags, so bind them to keep your state in sync.
- **handle**: \`boolean | Snippet<[{ item, index, isDragging }]>\` (default: \`false\`)
  - Drag mode and handle content in one prop.
  - \`false\`: the whole row initiates the drag (grab cursor, row text is not selectable).
  - \`true\`: only a grip handle drags; the rest of the row stays selectable and clickable. A default grip icon renders.
  - snippet/string: turns on handle mode and customizes what renders inside the handle.

### Style Props
- **size**: \`'small' | 'normal' | 'large'\` (default: \`'normal'\`)
  - Row padding, gaps and typography.
- **disabled**: \`boolean\` (default: \`false\`)
  - Disables all dragging. Rows still render but cannot be reordered.

### Event Props
- **onReorder**: \`(items: T[], details: { from: number; to: number; item: T }) => void\`
  - Fired once when a drag ends and the order actually changed, with the reordered array and the move details. A cancelled drag (Escape) reverts the live reorder and does not fire this.

### Localization
- **i18n**: \`Partial<Messages>\` - Per-instance i18n overrides merged over the global catalog. Supplies the default handle's aria-label (\`dragToReorder\`).

### Content Props (Slots)
- **item**: \`Snippet<[{ item: T, index: number, isDragging: boolean }]>\` (optional)
  - Row content. When omitted, each row renders a plain label: \`String(item)\` for primitives, otherwise \`item.label ?? item.title ?? item.id\`.

\`\`\`svelte
<SortableList bind:items>
	{#snippet item({ item, isDragging })}
		<div class="flex flex-col">
			<span class="font-medium">{item.title}</span>
			<span class="text-foreground-muted text-sm">{item.description}</span>
		</div>
	{/snippet}
</SortableList>
\`\`\`

- **handle** (via the \`handle\` prop as a snippet): \`Snippet<[{ item, index, isDragging }]>\`
  - Customizes what renders inside the grip handle. The component owns the handle wrapper (with the drag ref, aria-label and grab cursor); the snippet only fills its contents.

\`\`\`svelte
<SortableList bind:items>
	{#snippet handle()}
		<MyGripIcon />
	{/snippet}
</SortableList>
\`\`\`

### Advanced Props
- **ref**: \`HTMLElement | null\` (bindable) - Reference to the root \`<ul>\` element.
- **class**: \`string\` - Class for the root \`<ul>\`.
- **theme**: \`SortableListThemeProps\` - Theme overrides.

## Structure

A \`<ul>\` (\`root\`) holding one \`<li>\` (\`item\`) per entry. In full-row mode the \`<li>\` is the drag activator. In handle mode the \`<li>\` also contains a grip \`<button>\` (\`handle\`) that is the only drag activator, followed by the \`content\` region. The moving row is lifted with the pointer (feedback \`move\`) while the others animate into their new positions.

## Accessibility

- Renders a real \`<ul>\` / \`<li>\` list.
- The library's keyboard sensor makes sorting keyboard-operable: focus the row (or the grip handle in handle mode), press Space/Enter to pick up, arrow keys to move, Space/Enter to drop, Escape to cancel.
- The library manages \`role\`, \`tabindex\`, \`aria-roledescription\`, \`aria-describedby\`, \`aria-pressed\`, \`aria-grabbed\` and \`aria-disabled\` on the drag activator, plus a screen-reader live region. The default grip handle adds a localized \`aria-label\` since it has no visible text.

## Notes
- Reorders are live: \`items\` is replaced with a fresh reordered array on every pointer move, which is what animates the neighbors. Bind \`items\` so your state follows.
- A cancelled drag (Escape) restores the pre-drag order and does not call \`onReorder\`.
- Ids must be stable and unique; using an array index as the id breaks reordering.
- Theme parts: \`root\` (variant: \`size\`), \`item\` (variants: \`size\`, \`handle\`, \`dragging\`, \`disabled\`), \`content\`, \`handle\` (variant: \`size\`).
`;
