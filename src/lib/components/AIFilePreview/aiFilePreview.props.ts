import type { WithAttachments } from '$lib/types/props.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { AIFilePreviewThemeProps } from './aiFilePreview.theme.js';

export type AIFilePreviewSource =
	| File
	| {
			id?: string | number | bigint;
			name: string;
			size?: number;
			type?: string;
			previewUrl?: string;
	  };

export type AIFilePreviewProps = WithAttachments<
	Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'> & {
		ref?: HTMLDivElement | null;
		file: AIFilePreviewSource;
		name?: string;
		previewUrl?: string;
		status?: 'pending' | 'uploading' | 'uploaded' | 'failed';
		error?: string;
		onRemove?: () => void;
		onRetry?: () => void;
		class?: string;
		theme?: AIFilePreviewThemeProps;
	}
>;
