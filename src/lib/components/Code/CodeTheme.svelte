<!--
	Defines every `--code-token-*` CSS variable consumed by the Shiki syntax theme
	(see `code.syntax-theme.ts`) in terms of our `--color-*` design tokens. Because
	those design tokens already switch per theme, the light block covers both modes
	for hues that read well in both; the dark override block only re-tunes the few
	roles that need a lighter treatment on the dark surface (notably `tag`, whose
	dark `--color-danger` is very dark).

	All selectors are `:global` so the styles reach the `{@html}` Shiki output.
	Mounting this component multiple times is harmless — the declarations are
	idempotent.
-->
<style>
	:global(:root) {
		--code-token-background: var(--color-background);
		--code-token-plain: var(--color-foreground);
		--code-token-comment: var(--color-foreground-muted);
		--code-token-punctuation: color-mix(
			in oklab,
			var(--color-foreground-muted) 65%,
			var(--color-foreground)
		);
		--code-token-keyword: var(--color-primary);
		--code-token-string: var(--color-success);
		--code-token-number: var(--color-warning);
		--code-token-constant: var(--color-warning);
		--code-token-function: var(--color-info);
		--code-token-variable: color-mix(
			in oklab,
			var(--color-foreground) 88%,
			var(--color-info)
		);
		--code-token-property: color-mix(in oklab, var(--color-info) 60%, var(--color-foreground));
		--code-token-tag: var(--color-danger);
		--code-token-regex: var(--color-success);
		--code-token-escape: var(--color-warning);
		--code-token-error: var(--color-danger);
		--code-token-inserted: var(--color-success);
		--code-token-deleted: var(--color-danger);
		--code-token-changed: var(--color-warning);
		--code-token-inserted-background: color-mix(in oklab, var(--color-success) 14%, transparent);
		--code-token-deleted-background: color-mix(in oklab, var(--color-danger) 14%, transparent);
		--code-token-changed-background: color-mix(in oklab, var(--color-warning) 14%, transparent);
	}

	:global(html[data-theme='dark']),
	:global(.dark) {
		/* Dark `--color-danger` (#7f1d1d) is too dark to read as syntax; lift it. */
		--code-token-tag: color-mix(in oklab, var(--color-danger-light) 70%, var(--color-foreground));
		--code-token-deleted: color-mix(
			in oklab,
			var(--color-danger-light) 70%,
			var(--color-foreground)
		);
		--code-token-error: color-mix(in oklab, var(--color-danger-light) 70%, var(--color-foreground));
		/* Keep property distinct from function against the darker surface. */
		--code-token-property: color-mix(in oklab, var(--color-info) 70%, var(--color-foreground));
	}

	/* Shiki output uses inline `style="color:var(--code-token-*)"`, so no per-span
	   rule is needed. Keep the pre transparent so the container background shows. */
	:global([data-slot='code'] pre.shiki) {
		background-color: transparent !important;
		margin: 0;
	}

	/* Smooth the color transition when the theme flips. */
	@media (prefers-reduced-motion: no-preference) {
		:global([data-slot='code'] .shiki span) {
			transition: color 160ms ease;
		}
	}

	/* Line-number gutter — driven by a CSS counter so numbers stay in sync
	   regardless of wrapping. Only active when the highlighter tagged the code
	   with `data-line-numbers`. */
	:global([data-slot='code'] code[data-line-numbers]) {
		counter-reset: code-line;
	}

	:global([data-slot='code'] code[data-line-numbers] [data-line]) {
		counter-increment: code-line;
	}

	:global([data-slot='code'] code[data-line-numbers] [data-line]) {
		display: block;
	}

	/* `sticky; left: 0` pins the gutter to the left edge so it stays visible while a long
	   line scrolls horizontally under it; the background strip masks the code sliding behind. */
	:global([data-slot='code'] code[data-line-numbers] [data-line])::before {
		content: counter(code-line);
		position: sticky;
		left: 0;
		display: inline-block;
		width: 3rem;
		padding-right: 1rem;
		margin-right: 1rem;
		text-align: right;
		color: var(--color-foreground-muted);
		background-color: var(--code-token-background);
		user-select: none;
		-webkit-user-select: none;
	}
</style>
