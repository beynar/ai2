import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { cva } from './engine.js';
import { setComponentTheme, useComponentTheme } from './theme.js';
import Harness from './CvaHarness.test.svelte';

// Runs `fn` inside a live component so getContext/setContext work.
const inComponent = (fn: () => void) => render(Harness, { props: { run: fn } });

const makeTheme = () => ({
	button: cva({
		base: 'rounded',
		variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
		defaultVariants: { size: 'sm' }
	})
});

describe('useComponentTheme', () => {
	it('returns the default theme untouched when there is no context and no theme', () => {
		const defaultTheme = makeTheme();
		let result: ReturnType<typeof defaultTheme.button> | undefined;
		inComponent(() => {
			const use = useComponentTheme('btnDefault', defaultTheme);
			const theme = use();
			expect(theme).toBe(defaultTheme);
			result = theme.button({ size: 'lg' });
		});
		expect(result).toBe('rounded text-lg');
	});

	it('composes a local theme on top of the default (default classes kept)', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			const use = useComponentTheme('btnLocal', defaultTheme);
			const theme = use({ button: { base: 'shadow', size: { sm: 'font-bold' } } });
			result = theme.button({ size: 'sm' });
		});
		expect(result).toBe('rounded text-sm shadow font-bold');
	});

	it('replaces the default theme entirely when override is true', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			const use = useComponentTheme('btnOverride', defaultTheme);
			const theme = use({ override: true, button: { base: 'shadow', size: { sm: 'font-bold' } } });
			result = theme.button({ size: 'sm' });
		});
		expect(result).toBe('shadow font-bold');
		expect(result).not.toContain('rounded');
	});

	it('merges a theme provided through context via setComponentTheme', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			setComponentTheme('btnCtx')({ button: { base: 'ring-1' } });
			const use = useComponentTheme('btnCtx', defaultTheme);
			result = use().button({ size: 'sm' });
		});
		expect(result).toBe('rounded text-sm ring-1');
	});

	it('merges context and local theme, concatenating base classes', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			setComponentTheme('btnBoth')({ button: { base: 'ring-1' } });
			const use = useComponentTheme('btnBoth', defaultTheme);
			result = use({ button: { base: 'shadow' } }).button({ size: 'sm' });
		});
		expect(result).toBe('rounded text-sm ring-1 shadow');
	});

	it('lets a later base override an earlier one on tailwind conflicts', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			const use = useComponentTheme('btnConflict', defaultTheme);
			result = use({ button: { base: 'rounded-lg' } }).button({ size: 'sm' });
		});
		expect(result).toBe('text-sm rounded-lg');
	});

	it('reuses one composed theme for every consumer of the same context theme', () => {
		const defaultTheme = makeTheme();
		const themes: unknown[] = [];
		inComponent(() => {
			setComponentTheme('btnShared')({ button: { base: 'ring-1' } });
			const use = useComponentTheme('btnShared', defaultTheme);
			themes.push(use(), use(), use());
		});
		expect(themes[0]).not.toBe(defaultTheme);
		expect(themes[1]).toBe(themes[0]);
		expect(themes[2]).toBe(themes[0]);
	});

	it('memoises by the original theme argument identity', () => {
		const defaultTheme = makeTheme();
		const localTheme = { button: { base: 'shadow' } };
		let first: unknown, second: unknown;
		inComponent(() => {
			const use = useComponentTheme('btnLocalMemo', defaultTheme);
			first = use(localTheme);
			second = use(localTheme);
		});
		expect(second).toBe(first);
	});

	it('returns the shared default instance on the fast path', () => {
		const defaultTheme = makeTheme();
		let a: unknown, b: unknown;
		inComponent(() => {
			a = useComponentTheme('btnFastA', defaultTheme)();
			b = useComponentTheme('btnFastB', defaultTheme)();
		});
		expect(a).toBe(defaultTheme);
		expect(b).toBe(defaultTheme);
	});

	it('reads a theme from its exact component context', () => {
		const defaultTheme = makeTheme();
		let result: string | undefined;
		inComponent(() => {
			setComponentTheme('text-input')({
				button: { base: 'ring-1' }
			});
			const use = useComponentTheme('text-input', defaultTheme);
			result = use().button({ size: 'sm' });
		});
		expect(result).toBe('rounded text-sm ring-1');
	});
});
