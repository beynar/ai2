import { bench, describe, vi } from 'vitest';

// theme.ts reads Svelte context; feed it a plain map so it runs outside components.
const { ctxThemes } = vi.hoisted(() => ({ ctxThemes: {} as Record<string, unknown> }));
vi.mock('svelte', () => ({
	getContext: (key: string) => ctxThemes[key],
	setContext: (key: string, value: unknown) => {
		ctxThemes[key] = value;
	}
}));

import { cva, cx, compose } from './engine.js';
import { useComponentTheme } from './theme.js';

/* ------------------------------------------------------------------ */
/* Previous implementation (deep merge + rebuilt cva + WeakMap cache), */
/* inlined verbatim from git history for comparison.                   */
/* ------------------------------------------------------------------ */

const mergeThemeObjects = (
	source: Record<string, any> | null | undefined,
	target: Record<string, any>
) => {
	if (!source) return target;
	const result = { ...source };
	const targetKeys = Object.keys(target);
	let i, il, key;
	for (i = 0, il = targetKeys.length; i < il; ++i) {
		key = targetKeys[i];
		if (typeof target[key] === 'string') {
			const sourceValue = source[key];
			result[key] = typeof sourceValue === 'string' ? cx(sourceValue, target[key]) : target[key];
		} else if (typeof target[key] === 'object') {
			result[key] = mergeThemeObjects(source[key] || {}, target[key] || {});
		}
	}
	return result;
};

const buildTheme = (defaultTheme: Record<string, any>, merged: Record<string, any>) => {
	const result = { ...defaultTheme };
	for (const key in merged) {
		const { base = '', ...variants } = merged[key];
		result[key] = compose(defaultTheme[key], cva({ base, variants }));
	}
	return result;
};

const composedCache = new WeakMap<object, WeakMap<object, unknown>>();

const oldUse =
	(defaultTheme: Record<string, any>, ctx: Record<string, any>) =>
	(rawTheme: Record<string, any>) => {
		let byLocal = composedCache.get(ctx);
		if (!byLocal) composedCache.set(ctx, (byLocal = new WeakMap()));
		const hit = byLocal.get(rawTheme);
		if (hit) return hit as Record<string, any>;
		const built = buildTheme(defaultTheme, mergeThemeObjects(ctx, rawTheme));
		byLocal.set(rawTheme, built);
		return built;
	};

/* ------------------------------------------------------------------ */

const makeDefaultTheme = () => ({
	root: cva({
		base: 'inline-flex items-center justify-center rounded-lg border font-medium transition-all',
		variants: {
			size: { small: 'h-7 px-2.5', normal: 'h-8 px-3.5', large: 'h-9 px-4' },
			color: { primary: 'bg-primary', neutral: 'bg-neutral', danger: 'bg-danger' },
			variant: { solid: 'text-color-contrast', outline: 'border-color', ghost: 'bg-color/0' },
			loading: { true: 'pointer-events-none', false: null },
			disabled: { true: 'opacity-50', false: null }
		},
		defaultVariants: { size: 'normal', color: 'neutral', variant: 'solid' }
	}),
	prefix: cva({
		base: 'inline-flex size-4 shrink-0',
		variants: { size: { small: 'size-3.5', normal: 'size-4', large: 'size-5' } }
	}),
	suffix: cva({
		base: 'inline-flex size-4 shrink-0',
		variants: { size: { small: 'size-3.5', normal: 'size-4', large: 'size-5' } }
	})
});

const ctxOverride = {
	root: { base: 'ring-1', size: { small: 'gap-1' }, color: { primary: 'shadow' } },
	prefix: { base: 'opacity-90' }
};
const localOverride = { root: { base: 'tracking-tight', size: { small: 'text-xs' } } };
const props = { size: 'small', color: 'primary', variant: 'solid', loading: false } as const;

const newDefault = makeDefaultTheme();
ctxThemes['benchTheme'] = ctxOverride;
const newUse = useComponentTheme('benchTheme', newDefault);

const oldDefault = makeDefaultTheme();
const oldUseBench = oldUse(oldDefault, ctxOverride);

describe('build themed instance (ctx + fresh local each time)', () => {
	bench('old: merge + rebuild cva (cache miss)', () => {
		oldUseBench({ root: { base: 'tracking-tight', size: { small: 'text-xs' } } });
	});
	bench('new: wrap slots lazily', () => {
		newUse({ root: { base: 'tracking-tight', size: { small: 'text-xs' } } });
	});
});

const oldBuilt = oldUseBench(localOverride) as Record<string, (p?: any) => string>;
const newBuilt = newUse(localOverride);

describe('slot call on a themed instance (per-render cost)', () => {
	bench('old: composed (default cva + override cva + cx)', () => {
		oldBuilt.root(props);
	});
	bench('new: default cva + pick + cx', () => {
		newBuilt.root(props);
	});
});

const plainDefault = makeDefaultTheme();
const plainUse = useComponentTheme('benchPlain', plainDefault);

describe('fast path (no overrides)', () => {
	bench('new: use() + slot call', () => {
		plainUse().root(props);
	});
});
