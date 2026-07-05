const treeTokenDeclarations = [
	['--trees-bg-override', 'var(--color-background)'],
	['--trees-fg-override', 'var(--color-foreground)'],
	['--trees-fg-muted-override', 'var(--color-foreground-muted)'],
	['--trees-bg-muted-override', 'var(--color-background-muted)'],
	['--trees-accent-override', 'var(--color-primary)'],
	['--trees-search-fg-override', 'var(--color-foreground)'],
	['--trees-search-bg-override', 'var(--color-background-light)'],
	['--trees-border-color-override', 'var(--color-background-muted)'],
	['--trees-selected-fg-override', 'var(--color-foreground)'],
	['--trees-selected-bg-override', 'color-mix(in oklab, var(--color-primary) 18%, transparent)'],
	[
		'--trees-selected-border-color-override',
		'color-mix(in oklab, var(--color-primary) 55%, var(--color-background-muted))'
	],
	['--trees-selected-focused-border-color-override', 'var(--color-primary)'],
	['--trees-focus-ring-color-override', 'var(--color-primary)'],
	['--trees-status-added-override', 'var(--color-success)'],
	['--trees-status-ignored-override', 'var(--color-foreground-muted)'],
	['--trees-status-modified-override', 'var(--color-warning)'],
	['--trees-status-renamed-override', 'var(--color-info)'],
	['--trees-status-untracked-override', 'var(--color-success)'],
	['--trees-status-deleted-override', 'var(--color-danger)']
] as const;

const treeTokenStyle = treeTokenDeclarations
	.map(([property, value]) => `${property}:${value}`)
	.join(';');

export function createTreeStyle(style?: string | null): string {
	return [treeTokenStyle, style]
		.filter((declaration) => declaration != null && declaration.trim().length > 0)
		.join(';');
}
