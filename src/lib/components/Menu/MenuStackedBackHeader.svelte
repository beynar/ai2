<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import MenuOption from '../MenuOption/MenuOption.svelte';
	import Slot from '../Slot/Slot.svelte';
	import { arrowLeftIcon } from '../Icons/arrowLeft.js';
	import type { MenuItem } from './menu.props.js';
	import type { MenuThemeProps } from './menu.theme.js';

	type SubmenuItem = Extract<MenuItem, { type: 'submenu' }>;

	let {
		opener,
		label,
		theme,
		onBack,
		itemReference,
		backReference
	}: {
		opener: SubmenuItem | null;
		label: string;
		theme?: MenuThemeProps;
		onBack: () => void;
		itemReference: Attachment<HTMLElement>;
		backReference: Attachment<HTMLElement>;
	} = $props();
</script>

<MenuOption
	role="menuitem"
	prefix={arrowLeftIcon}
	theme={theme?.option}
	class="px-3 py-2"
	attrs={{
		'aria-label': label,
		'data-menu-keep-open': 'true'
	}}
	onClick={onBack}
	{@attach itemReference}
	{@attach backReference}
>
	<div class="flex min-w-0 flex-1 items-center gap-2">
		<Slot
			render={opener?.prefix}
			renderIf={!!opener?.prefix}
			class="text-foreground-muted flex size-4 shrink-0 items-center justify-center [&_svg]:size-4"
		/>
		<div class="flex min-w-0 flex-1 flex-col gap-0.5">
			<Slot
				render={opener?.title ?? label}
				class="text-foreground truncate text-sm leading-none font-medium"
			/>
			<Slot
				render={opener?.description}
				renderIf={!!opener?.description}
				class="text-foreground/70 truncate text-xs leading-none"
			/>
		</div>
	</div>
</MenuOption>
