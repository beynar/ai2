import {
	cva,
	setComponentTheme,
	type InferComponentTheme,
	useComponentTheme
} from '$lib/utils/cva/index.js';

const ganttChartVariants = {
	density: { small: '', normal: '', large: '' },
	color: {
		primary: '',
		secondary: '',
		danger: '',
		success: '',
		warning: '',
		info: '',
		neutral: ''
	},
	selected: { true: 'ring-2 ring-color/60', false: '' },
	disabled: { true: 'cursor-not-allowed opacity-60', false: '' },
	invalid: { true: 'cursor-not-allowed', false: '' },
	critical: { true: '', false: '' },
	readOnly: { true: '', false: '' },
	today: { true: '', false: '' },
	nonWorking: { true: '', false: '' },
	overAllocated: { true: '', false: '' }
} as const;

const defaultVariants = {
	density: 'normal',
	color: 'primary',
	selected: false,
	disabled: false,
	invalid: false,
	critical: false,
	readOnly: false,
	today: false,
	nonWorking: false,
	overAllocated: false
} as const;

function createGanttChartPart(base: string) {
	return cva({ base, variants: ganttChartVariants, defaultVariants });
}

const root = createGanttChartPart(
	'relative isolate flex min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-muted/80 bg-surface text-neutral [container-type:inline-size] [--gantt-row-height:2.25rem] [--gantt-header-height:3.5rem] [--gantt-grid-width:22rem] [--gantt-task-height:1.25rem] [--gantt-task-color:var(--color)] motion-reduce:scroll-auto motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transition-none forced-colors:border-[CanvasText]'
);
const header = createGanttChartPart(
	'flex min-w-0 shrink-0 flex-wrap items-center gap-2 border-b border-neutral-muted bg-surface-raised px-3 py-2'
);
const navigation = createGanttChartPart('flex min-w-0 items-center gap-2');
const title = createGanttChartPart(
	'min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-neutral'
);
const zoomControl = createGanttChartPart('flex min-w-0 items-center gap-1');
const actions = createGanttChartPart('ms-auto flex min-w-0 items-center gap-1.5');
const content = createGanttChartPart('relative min-h-0 min-w-0 flex-1');
const splitShell = createGanttChartPart('flex h-full min-h-0 min-w-0');
const gridPane = createGanttChartPart(
	'relative min-h-0 min-w-0 overflow-x-clip overflow-y-visible bg-surface'
);
const splitter = createGanttChartPart(
	'bg-neutral-muted/80 outline-none focus-visible:ring-2 focus-visible:ring-color/60'
);
const timelinePane = createGanttChartPart(
	'relative h-full min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-visible bg-surface'
);
const viewport = createGanttChartPart('relative h-full min-h-0 min-w-0 overflow-auto');
const gridHeader = createGanttChartPart(
	'relative flex h-[var(--gantt-header-height)] border-b border-neutral-muted bg-surface-raised/95 backdrop-blur'
);
const columnHeader = createGanttChartPart(
	'flex min-w-0 items-center border-e border-neutral-muted/70 px-2 text-xs font-semibold text-neutral/75 outline-none'
);
const rows = createGanttChartPart('relative min-w-full');
const row = createGanttChartPart(
	'absolute inset-x-0 flex h-[var(--gantt-row-height)] border-b border-neutral-muted/55 outline-none'
);
const treeCell = createGanttChartPart(
	'flex min-w-0 items-center border-e border-neutral-muted/55 px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60'
);
const expander = createGanttChartPart(
	'grid size-6 shrink-0 place-items-center rounded outline-none hover:bg-neutral-muted/50 focus-visible:ring-2 focus-visible:ring-color/60'
);
const timeHeader = createGanttChartPart(
	'relative h-[var(--gantt-header-height)] border-b border-neutral-muted bg-surface-raised/95 backdrop-blur'
);
const timeHeaderUpper = createGanttChartPart(
	'absolute top-0 flex h-1/2 items-center justify-center truncate border-e border-b border-neutral-muted/70 px-1 text-xs font-semibold text-neutral/75'
);
const timeHeaderLower = createGanttChartPart(
	'absolute bottom-0 flex h-1/2 items-center justify-center truncate border-e border-neutral-muted/70 px-1 text-[0.6875rem] text-neutral/65'
);
const timelineRows = createGanttChartPart('relative min-w-full overflow-x-clip');
const timelineRow = createGanttChartPart(
	'pointer-events-none absolute inset-x-0 h-[var(--gantt-row-height)] border-b border-neutral-muted/55'
);
const gridLine = createGanttChartPart(
	'pointer-events-none absolute top-0 border-e border-neutral-muted/45'
);
const taskLayer = createGanttChartPart('pointer-events-none absolute inset-0 z-10');
const task = createGanttChartPart(
	'group/task pointer-events-auto absolute flex h-[var(--gantt-task-height)] min-w-0 items-center rounded border border-[color-mix(in_oklab,var(--gantt-task-color)_40%,transparent)] bg-[color-mix(in_oklab,var(--gantt-task-color)_18%,var(--color-surface))] text-neutral shadow-sm outline-none data-[continues-before]:rounded-s-none data-[continues-after]:rounded-e-none focus-visible:ring-2 focus-visible:ring-color/60 forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] forced-colors:focus-visible:outline-2'
);
const summaryTask = createGanttChartPart(
	'group/task pointer-events-auto absolute h-2 border-t-2 border-[var(--gantt-task-color)] before:absolute before:start-0 before:top-0 before:h-2 before:border-s-2 before:border-[var(--gantt-task-color)] after:absolute after:end-0 after:top-0 after:h-2 after:border-e-2 after:border-[var(--gantt-task-color)] outline-none focus-visible:ring-2 focus-visible:ring-color/60 forced-colors:border-[CanvasText]'
);
const milestone = createGanttChartPart(
	'group/task pointer-events-auto absolute size-4 rotate-45 border border-[color-mix(in_oklab,var(--gantt-task-color)_55%,transparent)] bg-[var(--gantt-task-color)] outline-none focus-visible:ring-2 focus-visible:ring-color/60 forced-colors:border-[CanvasText] forced-colors:bg-[CanvasText]'
);
const segment = createGanttChartPart('absolute inset-y-0 rounded bg-inherit');
const progress = createGanttChartPart(
	'pointer-events-none absolute inset-y-0 start-0 rounded-s bg-[color-mix(in_oklab,var(--gantt-task-color)_55%,transparent)]'
);
const progressHandle = createGanttChartPart(
	'pointer-events-auto absolute z-30 grid size-6 -translate-x-1/2 -translate-y-1/2 touch-none place-items-center rounded-full outline-none opacity-0 transition-opacity group-hover/gantt-task:opacity-100 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-color'
);
const resizeHandle = createGanttChartPart(
	'pointer-events-auto absolute z-30 grid size-6 -translate-x-1/2 -translate-y-1/2 touch-none place-items-center rounded outline-none opacity-0 transition-opacity group-hover/gantt-task:opacity-100 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-color'
);
const dependencyHandle = createGanttChartPart(
	'absolute top-1/2 z-20 grid size-6 -translate-y-1/2 place-items-center rounded-full outline-none opacity-0 group-hover/task:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-color'
);
const taskLabel = createGanttChartPart(
	'pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-neutral/85'
);
const expectedProgress = createGanttChartPart(
	'pointer-events-none absolute inset-y-0 start-0 border-e border-dashed border-neutral/70 bg-neutral/8'
);
const baseline = createGanttChartPart(
	'pointer-events-none absolute h-1 rounded-full bg-neutral/40'
);
const deadline = createGanttChartPart(
	'pointer-events-none absolute size-3 -translate-x-1/2 rotate-45 border border-danger bg-danger/20'
);
const constraint = createGanttChartPart(
	'pointer-events-none absolute size-3 -translate-x-1/2 rounded-full border border-warning bg-warning/20'
);
const connectorLayer = createGanttChartPart(
	'pointer-events-none absolute inset-0 overflow-visible'
);
const connector = createGanttChartPart(
	'fill-none stroke-neutral/45 stroke-[1.5] forced-colors:stroke-[CanvasText]'
);
const connectorHitTarget = createGanttChartPart(
	'fill-none stroke-transparent stroke-[12] outline-none focus-visible:stroke-color/20'
);
const todayIndicator = createGanttChartPart(
	'pointer-events-none absolute top-0 z-20 w-px bg-danger forced-colors:bg-[Highlight]'
);
const projectLine = createGanttChartPart(
	'pointer-events-none absolute top-0 z-10 w-px border-s border-dashed border-neutral/45'
);
const nonWorkingTime = createGanttChartPart(
	'pointer-events-none absolute top-0 bg-surface-recessed/65 forced-colors:bg-[CanvasText] forced-colors:opacity-10'
);
const holiday = createGanttChartPart('pointer-events-none absolute top-0 bg-warning/8');
const dragPreview = createGanttChartPart(
	'pointer-events-none absolute z-40 overflow-hidden rounded border border-dashed border-[var(--gantt-task-color)] bg-[color-mix(in_oklab,var(--gantt-task-color)_12%,var(--color-surface))] text-xs shadow-md'
);
const rangeSelection = createGanttChartPart(
	'pointer-events-none absolute z-40 border border-dashed border-color bg-color/10'
);
const workloadPanel = createGanttChartPart(
	'relative shrink-0 border-t border-neutral-muted bg-surface'
);
const workloadCell = createGanttChartPart(
	'absolute border-e border-neutral-muted/55 text-[0.6875rem] tabular-nums'
);
const overAllocation = createGanttChartPart('bg-danger/12 text-danger');
const loading = createGanttChartPart(
	'absolute inset-0 z-50 grid place-items-center bg-surface/75 backdrop-blur-[1px]'
);
const empty = createGanttChartPart(
	'absolute inset-0 grid place-items-center p-6 text-center text-sm text-neutral/65'
);
const liveRegion = createGanttChartPart('sr-only');

export const ganttChartTheme = {
	root,
	header,
	navigation,
	title,
	zoomControl,
	actions,
	content,
	splitShell,
	gridPane,
	splitter,
	timelinePane,
	viewport,
	gridHeader,
	columnHeader,
	rows,
	row,
	treeCell,
	expander,
	timeHeader,
	timeHeaderUpper,
	timeHeaderLower,
	timelineRows,
	timelineRow,
	gridLine,
	taskLayer,
	task,
	summaryTask,
	milestone,
	segment,
	progress,
	progressHandle,
	resizeHandle,
	dependencyHandle,
	taskLabel,
	expectedProgress,
	baseline,
	deadline,
	constraint,
	connectorLayer,
	connector,
	connectorHitTarget,
	todayIndicator,
	projectLine,
	nonWorkingTime,
	holiday,
	dragPreview,
	rangeSelection,
	workloadPanel,
	workloadCell,
	overAllocation,
	loading,
	empty,
	liveRegion
};

export type GanttChartTheme = typeof ganttChartTheme;
export type GanttChartThemeProps = InferComponentTheme<GanttChartTheme>;
export const setGanttChartTheme = setComponentTheme<GanttChartTheme>('ganttChart');
export const useGanttChartTheme = useComponentTheme<GanttChartTheme>('ganttChart', ganttChartTheme);
export type GanttChartClasses = ReturnType<typeof useGanttChartTheme>;
