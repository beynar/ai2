<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Button from '$lib/components/Button/Button.svelte';
	import type { MenuItem } from '$lib/components/Menu/menu.props.js';
	import PopupMenu from '$lib/components/PopupMenu/PopupMenu.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import type {
		EventCalendarItemOperation,
		EventCalendarInteractionsController
	} from './eventCalendar.interactions.svelte.js';
	import type { EventCalendarOccurrence } from './eventCalendar.types.js';

	let {
		occurrence,
		a11y,
		interaction,
		messages,
		density,
		color,
		disabled
	}: {
		occurrence: EventCalendarOccurrence<TItemFields>;
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		interaction: EventCalendarInteractionsController<TItemFields, TResourceFields>;
		messages: Messages;
		density: Density;
		color: Colors;
		disabled: boolean;
	} = $props();

	const actionMenuItems = $derived.by((): MenuItem[] => {
		const items: MenuItem[] = [];
		addAction(items, 'move', messages.eventCalendarMoveAction);
		addAction(items, 'resize-start', messages.eventCalendarResizeStartAction);
		addAction(items, 'resize-end', messages.eventCalendarResizeEndAction);
		if (a11y.mutationOccurrenceKey === occurrence.key) {
			items.push({
				type: 'button',
				variant: 'ghost',
				color: 'neutral',
				size: 'small',
				children: messages.eventCalendarCancelAction,
				onClick: () => a11y.cancelItemMutation()
			});
		}
		return items;
	});

	function addAction(
		items: MenuItem[],
		operation: EventCalendarItemOperation,
		label: string
	): void {
		if (!interaction.canBeginAssistedItem(occurrence, operation, 'single-pointer')) return;
		items.push({
			type: 'button',
			variant: 'ghost',
			color: 'neutral',
			size: 'small',
			children: label,
			onClick: () => a11y.startItemMutation(occurrence, operation, 'single-pointer')
		});
	}
</script>

{#if actionMenuItems.length > 0 && interaction}
	<PopupMenu position="bottom-end" menu={{ items: actionMenuItems, density }}>
		{#snippet trigger(popover)}
			<Button
				type="button"
				squared
				size="small"
				variant="ghost"
				{color}
				label={messages.eventCalendarItemActions(occurrence.item.title)}
				aria-haspopup="menu"
				aria-expanded={popover.isOpen}
				{disabled}
				class="min-h-6 min-w-6 motion-reduce:transition-none"
				onClick={() => popover.toggle()}
				{@attach popover.reference}
			>
				<span aria-hidden="true">•••</span>
			</Button>
		{/snippet}
	</PopupMenu>
{/if}
