<script lang="ts">
	import { chatCircleIcon } from '$lib/components/Icons/chatCircle.js';
	import { highlighterIcon } from '$lib/components/Icons/highlighter.js';
	import { textBIcon } from '$lib/components/Icons/textB.js';
	import { textItalicIcon } from '$lib/components/Icons/textItalic.js';
	import SelectionMenu from '$lib/components/SelectionMenu/SelectionMenu.svelte';
	import type { SelectionMenuSelection } from '$lib/components/SelectionMenu/index.js';
	import type { ToggleMenuItem } from '$lib/components/ToggleMenu/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	function createFormattingItems(): ToggleMenuItem[] {
		return [
			{
				type: 'group',
				ariaLabel: 'Inline formatting',
				items: {
					bold: { prefix: textBIcon, ariaLabel: 'Bold' },
					italic: { prefix: textItalicIcon, ariaLabel: 'Italic' }
				}
			},
			{ type: 'toggle', prefix: highlighterIcon, ariaLabel: 'Highlight selection' },
			{ type: 'toggle', prefix: chatCircleIcon, ariaLabel: 'Comment on selection' }
		];
	}

	let parentItems = $state<ToggleMenuItem[]>(createFormattingItems());
	let selectorItems = $state<ToggleMenuItem[]>(createFormattingItems());
	let currentSelection = $state<SelectionMenuSelection | null>(null);
</script>

<DocPage
	title="Selection Menu"
	subtitle="Floating controls anchored to a text selection inside a known container."
	component="SelectionMenu"
	features={[
		'Parent target by default',
		'Selector or element target override',
		'Virtual Range positioning through Popover',
		'Selection preserved during toolbar interaction',
		'ToggleMenu props passed through directly'
	]}
>
	<ComponentCard
		description="Place the menu beside selectable content and it watches the shared parent automatically."
		code={`<div>
\t<article contenteditable="true">
\t\tSelect any passage in this editor.
\t</article>

\t<SelectionMenu bind:items ariaLabel="Selection tools" />
</div>`}
	>
		<div class="mx-auto grid w-full max-w-2xl gap-4">
			<div
				contenteditable="true"
				role="textbox"
				aria-multiline="true"
				aria-label="Editable release note"
				class="border-background-muted focus:ring-primary min-h-48 rounded-md border p-6 text-left outline-none focus:ring-1"
			>
				<h3 class="mb-3 text-lg font-semibold">Release note</h3>
				<p class="text-foreground-muted leading-7">
					Selection-aware controls should follow the passage being edited without coupling the
					toolbar to a particular editor engine. The editor remains responsible for formatting state
					and commands.
				</p>
			</div>

			<SelectionMenu
				bind:items={parentItems}
				ariaLabel="Selection tools"
				onSelectionChange={(selection) => (currentSelection = selection)}
			/>
			<p class="text-foreground-muted min-h-5 text-center text-xs" aria-live="polite">
				{currentSelection ? `${currentSelection.text.length} characters selected` : ''}
			</p>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Selector Target"
			description="Use a unique selector when the menu cannot sit directly beside its selection container."
			class="!min-h-fit"
			code={`<article id="selection-source">...</article>

<SelectionMenu
\ttarget="#selection-source"
\tbind:items
\tariaLabel="Quote tools"
/>`}
		>
			<div class="mx-auto grid w-full max-w-xl gap-4">
				<blockquote
					id="selection-menu-quote"
					class="border-primary text-foreground-muted border-l-2 py-2 pl-5 text-left leading-7"
				>
					A selection menu knows where a range is. The editor still knows what that range means.
				</blockquote>

				<SelectionMenu
					target="#selection-menu-quote"
					bind:items={selectorItems}
					ariaLabel="Quote tools"
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
