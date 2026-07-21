import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';

const defaultRoot = cva({ base: 'inline-grid max-w-full min-w-0 align-top' });
const defaultAccordionRoot = cva({
	base: 'max-w-full gap-1',
	variants: {
		scope: {
			single: 'w-[min(32rem,100%)]',
			group: 'w-fit',
			calls: 'w-full'
		}
	}
});
const defaultAccordionItem = cva({
	base: 'max-w-full',
	variants: {
		scope: {
			single: 'w-full',
			group: 'w-fit',
			calls: 'w-full'
		}
	}
});
const defaultAccordionHeader = cva({ base: 'min-w-0 flex-1' });
const defaultAccordionTrigger = cva({
	base: 'state-layer min-h-8 max-w-full items-center gap-2 rounded-md text-left text-xs text-neutral/65 hover:text-neutral',
	variants: {
		scope: {
			single: 'px-2 py-1.5',
			group: 'w-fit border border-neutral-muted bg-surface-raised/50 px-2.5 py-1.5',
			calls: 'px-2 py-1.5'
		}
	}
});
const defaultAccordionTitle = cva({
	base: 'min-w-0 w-full no-underline group-hover/accordion-trigger:no-underline'
});
const defaultAccordionIcon = cva({ base: 'size-3 text-neutral/50' });
const defaultAccordionContent = cva({
	base: 'min-w-0 pt-0',
	variants: {
		scope: {
			single: 'px-2 pb-2',
			group: 'px-0 pb-1',
			calls: 'px-0 pb-2'
		}
	}
});
const defaultTitle = cva({ base: 'flex min-w-0 flex-1 items-center gap-2 text-xs' });
const defaultIndicator = cva({
	base: 'flex size-5 shrink-0 items-center justify-center rounded-full border',
	variants: {
		tone: {
			active: 'border-info/30 bg-info/10 text-info-muted-readable',
			success: 'border-success/30 bg-success/10 text-success-muted-readable',
			error: 'border-danger/30 bg-danger/10 text-danger-muted-readable',
			cancelled: 'border-neutral/20 bg-neutral-muted text-neutral-muted-readable',
			default: 'border-neutral-muted bg-surface-raised text-neutral/55'
		}
	}
});
const defaultIndicatorDot = cva({ base: 'size-1.5 rounded-full bg-current' });
const defaultGroupIcon = cva({
	base: 'flex size-5 shrink-0 items-center justify-center rounded-md border border-neutral-muted bg-surface text-neutral/55'
});
const defaultName = cva({ base: 'min-w-0 flex-1 truncate font-medium text-neutral/85' });
const defaultStatus = cva({ base: 'shrink-0' });
const defaultContent = cva({ base: 'grid min-w-0 gap-2 pb-1' });
const defaultGroupContent = cva({ base: 'min-w-0 pl-1' });
const defaultSection = cva({
	base: 'grid min-w-0 gap-1.5 rounded-md border bg-surface p-2',
	variants: {
		tone: {
			default: 'border-neutral-muted',
			error: 'border-danger/20 bg-danger/5'
		}
	}
});
const defaultLabel = cva({
	base: 'text-[0.625rem] font-medium tracking-wide uppercase',
	variants: {
		tone: {
			default: 'text-neutral/55',
			error: 'text-danger-readable'
		}
	}
});
const defaultScrollArea = cva({
	base: 'flex max-h-48 min-w-0 flex-col rounded-md',
	variants: {
		tone: {
			default: 'bg-surface-raised/60',
			error: 'bg-danger/5'
		}
	}
});
const defaultScrollViewport = cva({ base: 'max-h-48 w-full' });
const defaultScrollContent = cva({ base: 'min-w-full' });
const defaultScrollScrollbar = cva({ base: '' });
const defaultScrollScrollbarX = cva({ base: '' });
const defaultScrollThumb = cva({
	base: '',
	variants: {
		tone: {
			default: 'bg-neutral-muted',
			error: 'bg-danger/45'
		}
	}
});
const defaultEmpty = cva({ base: 'py-1 text-xs text-neutral/55' });
const defaultTree = cva({ base: 'grid min-w-full gap-1 p-2 text-xs' });
const defaultTreeNode = cva({ base: 'min-w-0' });
const defaultTreeBranch = cva({ base: 'flex min-w-0 items-baseline gap-2' });
const defaultTreeKey = cva({ base: 'min-w-0 truncate text-neutral/60' });
const defaultTreeSummary = cva({ base: 'shrink-0 text-[0.625rem] text-neutral/40' });
const defaultTreeChildren = cva({
	base: 'mt-1 ml-1 grid gap-1 border-l border-neutral-muted pl-3'
});
const defaultTreeLeaf = cva({
	base: 'grid w-max min-w-full grid-cols-[minmax(4rem,8rem)_max-content] items-baseline gap-3'
});
const defaultTreeValue = cva({
	base: 'whitespace-pre font-mono text-[0.6875rem] leading-relaxed',
	variants: {
		kind: {
			string: 'text-neutral',
			number: 'text-neutral tabular-nums',
			boolean: 'text-primary-readable',
			null: 'text-neutral/50 italic',
			undefined: 'text-neutral/50 italic',
			empty: 'text-neutral/50 italic',
			unknown: 'text-neutral'
		},
		tone: {
			default: '',
			error: 'text-danger-readable'
		}
	}
});

export const aiToolTheme = {
	root: defaultRoot,
	accordionRoot: defaultAccordionRoot,
	accordionItem: defaultAccordionItem,
	accordionHeader: defaultAccordionHeader,
	accordionTrigger: defaultAccordionTrigger,
	accordionTitle: defaultAccordionTitle,
	accordionIcon: defaultAccordionIcon,
	accordionContent: defaultAccordionContent,
	title: defaultTitle,
	indicator: defaultIndicator,
	indicatorDot: defaultIndicatorDot,
	groupIcon: defaultGroupIcon,
	name: defaultName,
	status: defaultStatus,
	content: defaultContent,
	groupContent: defaultGroupContent,
	section: defaultSection,
	label: defaultLabel,
	scrollArea: defaultScrollArea,
	scrollViewport: defaultScrollViewport,
	scrollContent: defaultScrollContent,
	scrollScrollbar: defaultScrollScrollbar,
	scrollScrollbarX: defaultScrollScrollbarX,
	scrollThumb: defaultScrollThumb,
	empty: defaultEmpty,
	tree: defaultTree,
	treeNode: defaultTreeNode,
	treeBranch: defaultTreeBranch,
	treeKey: defaultTreeKey,
	treeSummary: defaultTreeSummary,
	treeChildren: defaultTreeChildren,
	treeLeaf: defaultTreeLeaf,
	treeValue: defaultTreeValue
};
export type AIToolTheme = typeof aiToolTheme;
export type AIToolThemeProps = InferComponentTheme<AIToolTheme>;
export const setAIToolTheme = setComponentTheme<AIToolTheme>('aiTool');
export const useAIToolTheme = useComponentTheme<AIToolTheme>('aiTool', aiToolTheme);
