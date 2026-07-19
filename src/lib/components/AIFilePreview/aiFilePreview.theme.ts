import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';

export const aiFilePreviewTheme = {
	root: cva({
		base: 'group relative flex min-w-36 max-w-72 items-center gap-2 overflow-hidden rounded-md border border-background-muted bg-background-light p-2',
		variants: {
			status: {
				pending: '',
				uploading: 'border-primary/40',
				uploaded: 'border-success/40',
				failed: 'border-danger/40 bg-danger-muted/30'
			}
		}
	}),
	preview: cva({ base: 'size-10 shrink-0 rounded object-cover' }),
	fallback: cva({
		base: 'grid size-10 shrink-0 place-items-center rounded bg-background-muted text-foreground/60'
	}),
	content: cva({ base: 'grid min-w-0 flex-1 gap-0.5' }),
	name: cva({ base: 'truncate text-xs font-medium' }),
	meta: cva({ base: 'flex items-center gap-1 text-xs text-foreground/60' }),
	error: cva({ base: 'truncate text-xs text-danger' })
};

export type AIFilePreviewTheme = typeof aiFilePreviewTheme;
export type AIFilePreviewThemeProps = InferComponentTheme<AIFilePreviewTheme>;
export const setAIFilePreviewTheme = setComponentTheme<AIFilePreviewTheme>('aiFilePreview');
export const useAIFilePreviewTheme = useComponentTheme<AIFilePreviewTheme>(
	'aiFilePreview',
	aiFilePreviewTheme
);
