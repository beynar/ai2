import {
	cva,
	setComponentTheme,
	type InferComponentTheme,
	useComponentTheme
} from '$lib/utils/cva/index.js';

const root = cva({
	base: 'relative flex min-w-0 flex-col gap-3',
	variants: {
		fill: {
			true: 'h-full min-h-0',
			false: ''
		}
	},
	defaultVariants: { fill: false }
});
const toolbar = cva({
	base: 'flex min-w-0 flex-wrap items-center justify-between gap-2'
});
const toolbarGroup = cva({ base: 'flex min-w-0 flex-wrap items-center gap-2' });
const search = cva({ base: 'w-full sm:w-64' });
const viewport = cva({
	base: 'relative isolate overflow-hidden rounded border border-background-muted bg-background [container-type:inline-size]',
	variants: {
		fill: {
			true: 'min-h-0 flex-1',
			false: ''
		}
	},
	defaultVariants: { fill: false }
});
const savingIndicator = cva({ base: '!absolute !z-30 !rounded-none' });
const scrollArea = cva({ base: 'h-full' });
const virtualTable = cva({ base: 'grid min-w-full table-fixed text-sm' });
const caption = cva({
	base: 'text-sm text-foreground-muted',
	variants: {
		density: { small: 'mt-3', normal: 'mt-4', large: 'mt-6' }
	},
	defaultVariants: { density: 'normal' }
});
const header = cva({
	base: 'z-20 grid bg-background-light'
});
const headerRow = cva({ base: 'grid border-b border-background-muted bg-background-light' });
const headerCell = cva({
	base: 'group/data-table-header relative flex min-w-0 items-center gap-1 overflow-visible border-background-muted font-medium whitespace-nowrap',
	variants: {
		density: {
			small: 'h-8 px-1.5',
			normal: 'h-10 px-2',
			large: 'h-12 px-3'
		},
		align: {
			start: 'justify-start text-left',
			center: 'justify-center text-center',
			end: 'justify-end text-right'
		},
		pinned: { true: 'z-30 bg-background-light', false: '' }
	},
	defaultVariants: { density: 'normal', align: 'start', pinned: false }
});
const headerContent = cva({
	base: 'flex min-w-0 flex-1 items-center gap-1'
});
const headerButton = cva({
	base: 'flex min-w-0 flex-1 items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&_svg]:size-3.5 [&_svg]:shrink-0'
});
const headerLabel = cva({ base: 'truncate' });
const headerActions = cva({ base: 'ml-auto flex shrink-0 items-center' });
const headerMenuPanel = cva({
	base: 'w-full max-w-none sm:w-72 sm:max-w-[calc(100vw-2rem)]'
});
const headerMenuButton = cva({
	base: 'pointer-events-none opacity-0 group-hover/data-table-header:pointer-events-auto group-hover/data-table-header:opacity-100 group-focus-within/data-table-header:pointer-events-auto group-focus-within/data-table-header:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100',
	variants: {
		active: {
			true: 'pointer-events-auto opacity-100',
			false: ''
		}
	},
	defaultVariants: { active: false }
});
const dragHandle = cva({
	base: 'pointer-events-none absolute -top-1.5 start-1/2 z-30 grid h-4 w-8 -translate-x-1/2 cursor-grab place-items-center text-foreground-muted opacity-0 outline-none transition-[color,opacity] group-hover/data-table-header:pointer-events-auto group-hover/data-table-header:opacity-100 hover:text-foreground focus-visible:pointer-events-auto focus-visible:text-primary focus-visible:opacity-100 active:cursor-grabbing disabled:pointer-events-none'
});
const dragThumb = cva({
	base: 'h-1 w-5 rounded-full bg-current shadow-[0_0_0_1px_var(--color-background)]'
});
const resizeHandle = cva({
	base: 'absolute inset-y-1 end-0 z-40 w-1 cursor-col-resize touch-none rounded-full outline-none hover:bg-primary focus-visible:bg-primary data-[resizing=true]:bg-primary'
});
const body = cva({ base: 'relative z-0 grid' });
const row = cva({
	base: 'state-layer grid min-w-full border-b border-background-muted transition-colors last:border-b-0 data-[selected=true]:bg-primary-muted/40',
	variants: {
		density: { small: 'min-h-8', normal: 'min-h-10', large: 'min-h-12' },
		grouped: { true: 'bg-background-light font-medium', false: '' }
	},
	defaultVariants: { density: 'normal', grouped: false }
});
const cell = cva({
	base: 'relative flex min-w-0 items-center overflow-hidden border-background-muted outline-none',
	variants: {
		density: {
			small: 'min-h-8 px-1.5 py-1',
			normal: 'min-h-10 p-2',
			large: 'min-h-12 p-3'
		},
		align: {
			start: 'justify-start text-left',
			center: 'justify-center text-center',
			end: 'justify-end text-right'
		},
		pinned: { true: 'z-10 bg-background', false: '' },
		focused: {
			true: 'z-20 bg-primary-muted/20 ring-2 ring-inset ring-primary/70',
			false: ''
		},
		editing: { true: 'overflow-visible p-0 ring-1 ring-inset ring-primary', false: '' }
	},
	defaultVariants: {
		density: 'normal',
		align: 'start',
		pinned: false,
		focused: false,
		editing: false
	}
});
const cellContent = cva({ base: 'min-w-0 truncate' });
const selectionCell = cva({ base: 'p-0' });
const selectionCheckboxRoot = cva({ base: 'h-full w-full' });
const selectionCheckboxContainer = cva({ base: '!h-full !w-full' });
const selectionCheckboxControl = cva({
	base: '!h-full !w-full !min-h-0 !rounded-none focus:ring-inset focus:ring-offset-0'
});
const selectionCheckboxIndicator = cva({ base: '!size-4 !rounded-sm' });
const actionsCell = cva({ base: 'p-0 [&>*]:h-full [&>*]:w-full [&>*]:rounded-none' });
const detailRow = cva({
	base: 'grid min-w-full border-b border-background-muted bg-background-light/50'
});
const detailCell = cva({
	base: 'min-w-0 overflow-hidden',
	variants: {
		density: {
			small: 'px-8 py-2',
			normal: 'px-10 py-3',
			large: 'px-12 py-4'
		}
	},
	defaultVariants: { density: 'normal' }
});
const spacer = cva({ base: 'pointer-events-none grid border-0' });
const expander = cva({ base: 'mr-1 shrink-0' });
const groupValue = cva({ base: 'min-w-0 truncate' });
const groupCount = cva({ base: 'ml-1 text-xs font-normal text-foreground-muted' });
const pinnedBoundary = cva({
	base: 'after:pointer-events-none after:absolute after:inset-y-0 after:w-px after:bg-background-muted',
	variants: {
		side: {
			left: 'after:end-0 after:shadow-[2px_0_4px_color-mix(in_oklab,var(--color-foreground)_10%,transparent)] rtl:after:shadow-[-2px_0_4px_color-mix(in_oklab,var(--color-foreground)_10%,transparent)]',
			right:
				'after:start-0 after:shadow-[-2px_0_4px_color-mix(in_oklab,var(--color-foreground)_10%,transparent)] rtl:after:shadow-[2px_0_4px_color-mix(in_oklab,var(--color-foreground)_10%,transparent)]',
			none: 'after:hidden'
		}
	},
	defaultVariants: { side: 'none' }
});
const editor = cva({ base: 'relative grid h-full w-full min-w-0 items-center' });
const editorField = cva({ base: 'w-full min-w-0' });
const editorInput = cva({ base: 'h-auto min-w-0 rounded-none text-sm' });
const editorInputContainer = cva({
	base: 'w-full rounded-none border-0 bg-transparent shadow-none transition-none focus-within:ring-0',
	variants: {
		density: {
			small: 'min-h-8 px-1.5 py-1',
			normal: 'min-h-10 p-2',
			large: 'min-h-12 p-3'
		}
	},
	defaultVariants: { density: 'normal' }
});
const editorSwitchContainer = cva({ base: 'justify-center' });
const editorError = cva({
	base: 'absolute top-full left-0 z-50 mt-1 rounded bg-danger px-2 py-1 text-xs text-danger-contrast shadow'
});
const filterPanel = cva({
	base: 'grid w-full gap-1 p-3',
	variants: {
		separated: {
			true: 'mt-1 border-t border-background-muted',
			false: ''
		}
	},
	defaultVariants: { separated: false }
});
const filterHeader = cva({ base: 'flex items-center justify-between gap-3' });
const filterLabel = cva({ base: 'text-xs font-medium text-foreground-muted' });
const filterFields = cva({ base: 'grid grid-cols-2 gap-2' });
const filterCheckboxGroup = cva({ base: '!gap-1' });
const filterCheckboxContainer = cva({ base: '!gap-1' });
const filterCheckboxItem = cva({ base: '!min-h-8 !py-1 !pl-9' });
const filterCheckboxIndicator = cva({ base: '!top-2 !size-4' });
const stateRow = cva({ base: 'grid min-h-40' });
const stateCell = cva({ base: 'relative grid min-w-0' });
const stateContent = cva({
	base: 'sticky start-0 grid w-[100cqw] place-items-center p-6 text-center'
});
const skeletonList = cva({ base: 'grid w-full max-w-3xl gap-3' });
const skeletonBar = cva({ base: 'h-8 w-full' });
const footer = cva({ base: 'flex flex-wrap items-center justify-between gap-3' });
const summary = cva({ base: 'text-sm text-foreground-muted' });

export const dataTableTheme = {
	root,
	toolbar,
	toolbarGroup,
	search,
	viewport,
	savingIndicator,
	scrollArea,
	virtualTable,
	caption,
	header,
	headerRow,
	headerCell,
	headerContent,
	headerButton,
	headerLabel,
	headerActions,
	headerMenuPanel,
	headerMenuButton,
	dragHandle,
	dragThumb,
	resizeHandle,
	body,
	row,
	cell,
	cellContent,
	selectionCell,
	selectionCheckboxRoot,
	selectionCheckboxContainer,
	selectionCheckboxControl,
	selectionCheckboxIndicator,
	actionsCell,
	detailRow,
	detailCell,
	spacer,
	expander,
	groupValue,
	groupCount,
	pinnedBoundary,
	editor,
	editorField,
	editorInput,
	editorInputContainer,
	editorSwitchContainer,
	editorError,
	filterPanel,
	filterHeader,
	filterLabel,
	filterFields,
	filterCheckboxGroup,
	filterCheckboxContainer,
	filterCheckboxItem,
	filterCheckboxIndicator,
	stateRow,
	stateCell,
	stateContent,
	skeletonList,
	skeletonBar,
	footer,
	summary
};

export type DataTableTheme = typeof dataTableTheme;
export type DataTableThemeProps = InferComponentTheme<DataTableTheme>;
export const setDataTableTheme = setComponentTheme<DataTableTheme>('data-table');
export const useDataTableTheme = useComponentTheme<DataTableTheme>('data-table', dataTableTheme);
export type DataTableClasses = ReturnType<typeof useDataTableTheme>;
