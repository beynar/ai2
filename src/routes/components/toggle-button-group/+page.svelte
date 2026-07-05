<script lang="ts">
	import ToggleButtonGroup from '$lib/components/ToggleButtonGroup/ToggleButtonGroup.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { colors, sizes } from '$lib/utils/tokens.js';
	import { textBIcon } from '$lib/components/Icons/textB.js';
	import { textItalicIcon } from '$lib/components/Icons/textItalic.js';
	import { textUnderlineIcon } from '$lib/components/Icons/textUnderline.js';
	import { textAlignLeftIcon } from '$lib/components/Icons/textAlignLeft.js';
	import { textAlignCenterIcon } from '$lib/components/Icons/textAlignCenter.js';
	import { textAlignRightIcon } from '$lib/components/Icons/textAlignRight.js';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';

	const variants = ['outline', 'soft', 'ghost'] as const;

	let formatting = $state({ bold: true, italic: false, underline: false });
	let alignment = $state({ left: true, center: false, right: false });
</script>

<DocPage
	title="Toggle group"
	subtitle="A set of toggle buttons for single or multiple selection."
	component="ToggleButtonGroup"
	features={[
		'Bindable value map per button key',
		'Joined mode for segmented controls',
		'onChange emits full checked map',
		'Composes ToggleButton primitives'
	]}
>
	<ComponentCard
		code={`<ToggleButtonGroup
	variant="soft"
	color="foreground"
	items={{
		bold: { prefix: textBIcon, checked: true },
		italic: { prefix: textItalicIcon },
		underline: { prefix: textUnderlineIcon }
	}}
/>`}
	>
		<ToggleButtonGroup
			bind:value={formatting}
			variant="soft"
			color="foreground"
			items={{
				bold: { prefix: textBIcon },
				italic: { prefix: textItalicIcon },
				underline: { prefix: textUnderlineIcon }
			}}
		/>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Icon-only toolbar with bound value.">
			<div class="flex flex-col items-center gap-3">
				<div class="flex items-center justify-center gap-6">
					<ToggleButtonGroup
						bind:value={formatting}
						variant="soft"
						color="foreground"
						items={{
							bold: { prefix: textBIcon },
							italic: { prefix: textItalicIcon },
							underline: { prefix: textUnderlineIcon }
						}}
					/>
					<ToggleButtonGroup
						bind:value={alignment}
						variant="outline"
						color="primary"
						items={{
							left: { prefix: textAlignLeftIcon },
							center: { prefix: textAlignCenterIcon },
							right: { prefix: textAlignRightIcon }
						}}
					/>
				</div>
				<code class="text-foreground-muted text-xs">
					{JSON.stringify({ formatting, alignment })}
				</code>
			</div>
		</ComponentCard>

		<ComponentCard description="Outline, soft, and ghost variants.">
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each variants as variant (variant)}
					<ToggleButtonGroup
						{variant}
						color="foreground"
						items={{
							one: { children: 'One', checked: true },
							two: { children: 'Two' },
							three: { children: 'Three' }
						}}
					/>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Eight semantic colors, shown here in the soft variant.">
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each colors as color (color)}
					<ToggleButtonGroup
						{color}
						variant="soft"
						items={{
							one: { children: 'One', checked: true },
							two: { children: 'Two' }
						}}
					/>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Three sizes to match surrounding density.">
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each sizes as size (size)}
					<ToggleButtonGroup
						{size}
						color="foreground"
						items={{
							one: { children: 'One', checked: true },
							two: { children: 'Two' },
							three: { children: 'Three' }
						}}
					/>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Joined (segmented) toggle groups." class="!items-start">
			<div class="grid gap-4">
				{#each variants as variant}
					<div class="flex items-center justify-center gap-4">
						{#each sizes as size}
							<ToggleButtonGroup
								joined
								{variant}
								{size}
								color="primary"
								items={{
									button1: { children: `${variant} - ${size}`, checked: true },
									button2: { children: 'Button 2' },
									button3: { children: 'Button 3', prefix: eyeClosedIcon }
								}}
							/>
						{/each}
					</div>
				{/each}
				<div class="flex items-center justify-center gap-6">
					<ToggleButtonGroup
						joined
						variant="outline"
						color="foreground"
						items={{
							left: { prefix: textAlignLeftIcon },
							center: { prefix: textAlignCenterIcon },
							right: { prefix: textAlignRightIcon }
						}}
					/>
					<ToggleButtonGroup
						joined
						variant="soft"
						color="foreground"
						items={{
							bold: { prefix: textBIcon },
							italic: { prefix: textItalicIcon },
							underline: { prefix: textUnderlineIcon }
						}}
					/>
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Disabled toggle groups.">
			<div class="flex items-center justify-center gap-4">
				{#each variants as variant}
					<ToggleButtonGroup
						{variant}
						color="primary"
						disabled
						items={{
							button1: { children: 'Checked', checked: true },
							button2: { children: 'Unchecked' }
						}}
					/>
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
