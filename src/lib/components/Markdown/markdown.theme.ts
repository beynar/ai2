import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import type { StreamdownProps } from 'svelte-streamdown';
import type { MarkdownSize } from './markdown.props.js';

// The root wrapper part. Owns the overall type/spacing scale for the rendered
// markdown; the size variant is echoed into `buildStreamdownTheme` so every
// child element scales in sync.
const defaultMarkdownRoot = cva({
	base: 'w-full min-w-0',
	variants: {
		size: {
			small: 'text-sm leading-normal',
			normal: 'text-[0.9375rem] leading-relaxed',
			large: 'text-base leading-relaxed'
		}
	},
	defaultVariants: { size: 'normal' }
});

export const markdownTheme = {
	root: defaultMarkdownRoot
};

export type MarkdownTheme = typeof markdownTheme;
export type MarkdownThemeProps = InferComponentTheme<MarkdownTheme>;
export const setMarkdownTheme = setComponentTheme<MarkdownTheme>('markdown');
export const useMarkdownTheme = useComponentTheme('markdown', markdownTheme);

/**
 * Wrapper classes applied to the svelai `Code` block per size (margin + type
 * scale). The `Markdown` component overrides the streamdown `code` renderer with
 * a svelai `Code` snippet, so these drive the fenced-code-block spacing.
 */
export const markdownCodeSizes: Record<MarkdownSize, string> = {
	small: 'my-2 text-xs',
	normal: 'my-3 text-sm',
	large: 'my-4 text-sm'
};

/**
 * Maps the markdown size scale onto the svelai `Mermaid` component's own size
 * scale (used when the `mermaid` renderer is overridden with a svelai Mermaid).
 */
export const markdownMermaidSizes: Record<MarkdownSize, 'small' | 'normal' | 'large'> = {
	small: 'small',
	normal: 'normal',
	large: 'large'
};

// ---------------------------------------------------------------------------
// Per-size lookup scales used to template the streamdown theme once below.
// ---------------------------------------------------------------------------

type SizeScale = {
	// Heading font sizes h1..h6.
	h1: string;
	h2: string;
	h3: string;
	h4: string;
	h5: string;
	h6: string;
	// Vertical margin applied to headings.
	headingMargin: string;
	// Vertical margin applied to block-level elements (blockquote, table, code…).
	blockMargin: string;
	// List left padding / indentation.
	listIndent: string;
	// Vertical padding on each list item.
	listItemPad: string;
	// Small text scale for codespan, table cells, alert text, sup/sub.
	smallText: string;
	// Blockquote / horizontal-rule spacing.
	ruleMargin: string;
};

const SIZES: Record<MarkdownSize, SizeScale> = {
	small: {
		h1: 'text-xl',
		h2: 'text-lg',
		h3: 'text-base',
		h4: 'text-sm',
		h5: 'text-sm',
		h6: 'text-sm',
		headingMargin: 'mt-4 mb-1.5',
		blockMargin: 'my-2',
		listIndent: 'ml-3',
		listItemPad: 'py-0',
		smallText: 'text-xs',
		ruleMargin: 'my-4'
	},
	normal: {
		h1: 'text-2xl',
		h2: 'text-xl',
		h3: 'text-lg',
		h4: 'text-base',
		h5: 'text-sm',
		h6: 'text-sm',
		headingMargin: 'mt-5 mb-2',
		blockMargin: 'my-3',
		listIndent: 'ml-4',
		listItemPad: 'py-0.5',
		smallText: 'text-sm',
		ruleMargin: 'my-5'
	},
	large: {
		h1: 'text-3xl',
		h2: 'text-2xl',
		h3: 'text-xl',
		h4: 'text-lg',
		h5: 'text-base',
		h6: 'text-base',
		headingMargin: 'mt-6 mb-2.5',
		blockMargin: 'my-4',
		listIndent: 'ml-5',
		listItemPad: 'py-0.5',
		smallText: 'text-sm',
		ruleMargin: 'my-6'
	}
};

/**
 * The full shadcn base theme from `svelte-streamdown`, translated to svelai
 * semantic tokens and scaled to the given markdown `size`. Passed to
 * `<Streamdown theme={...}>`; it deep-merges over the built-in `tailwind` base
 * theme, so any key omitted here still falls back safely.
 */
export const buildStreamdownTheme = (size: MarkdownSize): StreamdownProps['theme'] => {
	const s = SIZES[size];

	return {
		link: {
			base: 'text-primary wrap-anywhere font-medium underline hover:text-primary/80',
			blocked: 'text-foreground-muted'
		},
		h1: {
			base: `${s.headingMargin} ${s.h1} font-semibold text-foreground`
		},
		h2: {
			base: `${s.headingMargin} ${s.h2} font-semibold text-foreground`
		},
		h3: {
			base: `${s.headingMargin} ${s.h3} font-semibold text-foreground`
		},
		h4: {
			base: `${s.headingMargin} ${s.h4} font-semibold text-foreground`
		},
		h5: {
			base: `${s.headingMargin} ${s.h5} font-semibold text-foreground`
		},
		h6: {
			base: `${s.headingMargin} ${s.h6} font-semibold text-foreground`
		},
		paragraph: {
			base: `${s.blockMargin} text-foreground`
		},
		ul: {
			base: `${s.listIndent} list-inside list-disc whitespace-normal text-foreground`
		},
		ol: {
			base: `${s.listIndent} list-inside whitespace-normal text-foreground`
		},
		li: {
			base: s.listItemPad,
			checkbox: ' mr-2'
		},
		code: {
			base: `${s.blockMargin} w-full overflow-hidden rounded-lg border border-background-muted flex flex-col`,
			container: 'relative overflow-visible bg-background-muted p-2 font-mono text-sm',
			header: `flex items-center justify-between bg-background-muted/80 px-2 py-1 text-foreground-muted ${s.smallText}`,
			buttons: 'flex items-center gap-2',
			language: 'ml-1 font-mono lowercase',
			skeleton:
				'block rounded-md font-mono text-transparent bg-background-muted/80 scale-y-90 w-fit animate-pulse whitespace-nowrap',
			pre: 'overflow-x-auto font-mono p-0 bg-background-muted/40',
			line: 'block '
		},
		codespan: {
			base: `bg-background-muted rounded px-1.5 py-0.5 font-mono text-foreground ${s.smallText}`
		},
		image: {
			base: `group relative ${s.blockMargin} mx-auto w-fit block`,
			image: 'max-w-full rounded-lg'
		},
		blockquote: {
			base: `border-foreground-muted/30 text-foreground-muted ${s.blockMargin} border-l-4 pl-4 italic`
		},
		alert: {
			base: `relative ${s.blockMargin} border-l-4 p-4 bg-background-light`,
			title: `${s.smallText} font-semibold flex items-center gap-2 mb-2 capitalize`,
			icon: 'size-5',
			note: '[&>[data-alert-title]]:text-info border-info/40 stroke-info bg-info-muted',
			tip: '[&>[data-alert-title]]:text-success border-success/40 stroke-success bg-success-muted',
			warning:
				'[&>[data-alert-title]]:text-warning border-warning/40 stroke-warning bg-warning-muted',
			caution: '[&>[data-alert-title]]:text-danger border-danger/40 stroke-danger bg-danger-muted',
			important:
				'[&>[data-alert-title]]:text-primary border-primary/40 stroke-primary bg-primary-muted'
		},
		table: {
			base: `overflow-x-auto max-w-full ${s.blockMargin} rounded-lg border border-background-muted`,
			table: 'w-full border-collapse min-w-full'
		},
		thead: {
			base: 'bg-background-muted/80'
		},
		tbody: {
			base: ''
		},
		tfoot: {
			base: 'bg-background-muted/50 border-t border-background-muted'
		},
		tr: {
			base: 'state-layer border-background-muted not-last:border-b transition-colors'
		},
		td: {
			base: `px-4 py-3 ${s.smallText} text-foreground min-w-[200px] max-w-[400px] break-words`
		},
		th: {
			base: `px-4 py-3 ${s.smallText} text-foreground min-w-[200px] max-w-[400px] break-words`
		},
		sup: {
			base: s.smallText
		},
		sub: {
			base: s.smallText
		},
		hr: {
			base: `border-background-muted ${s.ruleMargin}`
		},
		strong: {
			base: 'font-semibold text-foreground'
		},
		mermaid: {
			base: `group relative ${s.blockMargin} h-auto rounded-lg border border-background-muted bg-background-light overflow-hidden items-center min-h-[500px]`,
			icon: 'size-5',
			buttons: 'absolute right-1 top-1 flex h-fit w-fit items-center gap-1'
		},
		math: {
			block: 'text-foreground',
			inline: 'text-foreground'
		},
		br: {
			base: ''
		},
		em: {
			base: 'italic'
		},
		del: {
			base: 'text-foreground-muted'
		},
		footnoteRef: {
			base: `state-layer text-foreground-muted ${s.smallText} rounded-full bg-background-muted cursor-pointer border border-background-muted tabular-nums min-w-5 min-h-5 outline-none focus:ring-1 focus:ring-primary`
		},
		descriptionList: {
			base: `${s.blockMargin} space-y-2`
		},
		descriptionTerm: {
			base: 'font-semibold text-foreground border-l-2 border-background-muted pl-4'
		},
		descriptionDetail: {
			base: 'text-foreground-muted ml-4 leading-relaxed'
		},
		inlineCitation: {
			preview: `state-layer ${s.smallText} text-foreground-muted bg-background-muted rounded-md px-2 py-0.5 cursor-pointer inline-flex border border-background-muted outline-none focus:ring-1 focus:ring-primary`,
			carousel: {
				header: 'flex items-center justify-between',
				stepCounter: 'h-fit text-xs font-semibold text-foreground-muted tabular-nums',
				buttons: 'flex w-fit items-center justify-end gap-2',
				title: 'mb-2 line-clamp-2 font-semibold',
				url: 'flex items-center gap-2 text-sm text-foreground-muted',
				favicon: 'h-4 w-4 rounded'
			},
			list: {
				base: 'grid gap-2',
				item: 'state-layer grid gap-1 rounded-md p-2',
				title: 'line-clamp-1 font-semibold text-sm',
				url: 'flex items-center gap-2 text-xs text-foreground-muted',
				favicon: 'h-3 w-3 rounded'
			}
		},
		components: {
			button:
				'state-layer disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer p-1 text-foreground-muted transition-all hover:text-foreground rounded flex items-center justify-center w-6 h-6',
			popover:
				'min-w-[250px] max-w-md fixed z-[1000] max-h-md overflow-y-auto rounded-lg bg-background border border-background-muted p-2 shadow'
		}
	};
};
