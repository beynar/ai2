<script lang="ts">
	import AIFilePreview from '../AIFilePreview/AIFilePreview.svelte';
	import ScrollArea from '../ScrollArea/ScrollArea.svelte';
	import type { AIComposerAttachment } from './aiComposer.props.js';
	import { useAIComposerTheme, type AIComposerThemeProps } from './aiComposer.theme.js';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { MediaQuery } from 'svelte/reactivity';

	let {
		files,
		attachments,
		disabled = false,
		canRetry = false,
		onRemove,
		onRetry,
		theme
	}: {
		files: File[];
		attachments: AIComposerAttachment[];
		disabled?: boolean;
		canRetry?: boolean;
		onRemove: (file: File) => void;
		onRetry: (attachmentId: string) => void;
		theme?: AIComposerThemeProps;
	} = $props();

	const classes = $derived(useAIComposerTheme(theme));
	const prefersReducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const flipDuration = $derived(prefersReducedMotion.current ? 0 : 180);

	function getAttachment(file: File): AIComposerAttachment | undefined {
		const key = getFileKey(file);
		return attachments.find((attachment) => getFileKey(attachment.file) === key);
	}

	function getFileKey(file: Pick<File, 'name' | 'size' | 'type' | 'lastModified'>): string {
		return `${file.name}:${file.size}:${file.type}:${file.lastModified}`;
	}
</script>

{#if files.length > 0}
	<ScrollArea scrollFade class="max-w-full" ariaLabel="Attached files">
		<div data-slot="ai-composer-files" role="list" class={classes.files()}>
			{#each files as file (getFileKey(file))}
				{@const attachment = getAttachment(file)}
				<div role="listitem" animate:flip={{ duration: flipDuration, easing: quintOut }}>
					<AIFilePreview
						{file}
						class={classes.file()}
						name={attachment?.name}
						previewUrl={attachment?.previewUrl ?? attachment?.remoteUrl}
						status={attachment?.status}
						error={attachment?.error}
						onRemove={disabled ? undefined : () => onRemove(file)}
						onRetry={attachment?.status === 'failed' && canRetry && !disabled
							? () => onRetry(attachment.id)
							: undefined}
					/>
				</div>
			{/each}
		</div>
	</ScrollArea>
{/if}
