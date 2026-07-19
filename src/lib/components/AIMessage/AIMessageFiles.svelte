<script lang="ts">
	import AIFilePreview from '../AIFilePreview/AIFilePreview.svelte';
	import type { AIFilePreviewThemeProps } from '../AIFilePreview/aiFilePreview.theme.js';
	import ScrollArea from '../ScrollArea/ScrollArea.svelte';
	import type { AIFileSource } from '../AIThread/aiThread.props.js';

	const MESSAGE_FILE_THEME = {
		root: {
			base: 'min-h-8 min-w-0 max-w-60 gap-1.5 rounded-md bg-background/90 px-1.5 py-1 text-foreground shadow-xs'
		},
		preview: { base: 'size-6 rounded-sm' },
		fallback: {
			base: 'size-6 rounded-sm bg-background text-foreground/55 [&_svg]:size-3.5'
		},
		content: { base: 'flex min-w-0 items-center gap-1.5' },
		name: { base: 'text-xs font-normal' },
		meta: { base: 'shrink-0 gap-0 text-[0.68rem] text-foreground/55' },
		error: { base: 'hidden' }
	} satisfies AIFilePreviewThemeProps;

	let {
		files = [],
		align = 'start',
		class: className
	}: {
		files?: readonly AIFileSource[];
		align?: 'start' | 'center' | 'end';
		class?: string;
	} = $props();

	function isNativeFile(file: AIFileSource): file is File {
		return typeof File !== 'undefined' && file instanceof File;
	}

	function fileKey(file: AIFileSource, index: number): File | string | number | bigint {
		if (isNativeFile(file)) return file;
		return file.id ?? `${file.name}:${file.size ?? 'unknown'}:${index}`;
	}

	function resolveAlignmentClass(value: 'start' | 'center' | 'end'): string {
		if (value === 'center') return 'self-center';
		if (value === 'end') return 'self-end';
		return '';
	}

	const alignmentClass = $derived(resolveAlignmentClass(align));
</script>

{#if files.length > 0}
	<div
		data-slot="ai-message-files"
		data-align={align}
		class="max-w-full min-w-0 {alignmentClass} {className ?? ''}"
	>
		<ScrollArea scrollFade ariaLabel="Message files" class="w-full max-w-full">
			<div
				data-slot="ai-message-file-list"
				role="list"
				class="flex w-max max-w-full flex-nowrap gap-1.5 {align === 'end' ? 'ml-auto' : ''}"
			>
				{#each files as file, index (fileKey(file, index))}
					<div data-slot="ai-message-file" role="listitem" class="shrink-0">
						<AIFilePreview {file} theme={MESSAGE_FILE_THEME} />
					</div>
				{/each}
			</div>
		</ScrollArea>
	</div>
{/if}
