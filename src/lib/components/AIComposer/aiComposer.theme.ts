import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';
const defaultRoot = cva({
	base: 'relative grid min-w-0 grid-cols-[minmax(0,1fr)] gap-1 rounded-lg border border-background-muted bg-background p-1.5 transition-colors focus-within:ring-2 focus-within:ring-primary/30',
	variants: {
		dragState: {
			idle: '',
			potential: 'border-primary bg-primary/5',
			valid: 'border-primary bg-primary/5',
			invalid: 'border-danger bg-danger/5'
		}
	}
});
const defaultDropzone = cva({
	base: 'pointer-events-none absolute inset-1 z-20 flex items-center justify-center gap-2 rounded-md border border-dashed bg-background/95 px-3 text-center text-sm font-medium shadow-sm',
	variants: {
		state: {
			idle: '',
			potential: 'border-primary text-primary',
			valid: 'border-primary text-primary',
			invalid: 'border-danger text-danger'
		}
	}
});
const defaultDropzoneIcon = cva({ base: 'shrink-0' });
const defaultHeader = cva({ base: 'min-w-0' });
const defaultFiles = cva({ base: 'flex w-max min-w-full gap-2 py-1' });
const defaultBody = cva({ base: 'min-w-0' });
const defaultEditor = cva({
	base: 'py-1',
	variants: {
		autoresize: {
			true: 'min-h-10',
			false: 'h-24 min-h-24'
		}
	}
});
const defaultToolbar = cva({ base: 'min-w-0' });
const defaultFile = cva({ base: 'shrink-0' });
const defaultError = cva({ base: 'min-w-0' });
const defaultFooter = cva({ base: 'flex min-w-0 items-center justify-between gap-2' });
const defaultActions = cva({ base: 'flex items-center gap-1' });
const defaultQueue = cva({ base: 'grid gap-1 border-b border-background-muted pb-2' });
const defaultQueueEditing = cva({
	base: 'flex min-w-0 items-center justify-between gap-2 rounded bg-background-muted/50 px-2 py-1 text-sm text-foreground/75'
});
const defaultQueueList = cva({ base: 'grid gap-1' });
const defaultQueueItem = cva({ base: 'flex min-w-0 flex-1 items-center gap-2' });
const defaultQueueText = cva({ base: 'min-w-0 flex-1 truncate text-sm text-foreground/75' });
export const aiComposerTheme = {
	root: defaultRoot,
	dropzone: defaultDropzone,
	dropzoneIcon: defaultDropzoneIcon,
	header: defaultHeader,
	files: defaultFiles,
	body: defaultBody,
	editor: defaultEditor,
	toolbar: defaultToolbar,
	file: defaultFile,
	error: defaultError,
	footer: defaultFooter,
	actions: defaultActions,
	queue: defaultQueue,
	queueEditing: defaultQueueEditing,
	queueList: defaultQueueList,
	queueItem: defaultQueueItem,
	queueText: defaultQueueText
};
export type AIComposerTheme = typeof aiComposerTheme;
export type AIComposerThemeProps = InferComponentTheme<AIComposerTheme>;
export const setAIComposerTheme = setComponentTheme<AIComposerTheme>('aiComposer');
export const useAIComposerTheme = useComponentTheme<AIComposerTheme>('aiComposer', aiComposerTheme);
