import { describe, it, expect } from 'vitest';
import { cva, cx, compose } from './engine.js';

describe('cx', () => {
	it('joins truthy class values and drops falsy ones', () => {
		expect(cx('a', null, undefined, false, 0, '', 'b')).toBe('a b');
	});

	it('flattens arrays and objects like clsx', () => {
		expect(cx(['a', ['b', null], 'c'])).toBe('a b c');
		expect(cx({ a: true, b: false, c: 1 })).toBe('a c');
	});

	it('resolves tailwind conflicts, last one wins', () => {
		expect(cx('px-2', 'px-4')).toBe('px-4');
		expect(cx('bg-red-500 text-sm', 'bg-blue-500')).toBe('text-sm bg-blue-500');
	});

	it('preserves custom design-system classes and opacity modifiers', () => {
		expect(cx('bg-surface-canvas', 'bg-surface-raised')).toBe('bg-surface-raised');
		expect(cx('bg-color/90', 'bg-color/80')).toBe('bg-color/80');
	});
});

describe('cva', () => {
	it('returns only the base when no variants are configured', () => {
		const button = cva({ base: 'rounded px-2' });
		expect(button()).toBe('rounded px-2');
	});

	it('applies base + selected variant', () => {
		const button = cva({
			base: 'rounded',
			variants: { size: { sm: 'text-sm', lg: 'text-lg' } }
		});
		expect(button({ size: 'sm' })).toBe('rounded text-sm');
		expect(button({ size: 'lg' })).toBe('rounded text-lg');
	});

	it('falls back to defaultVariants when a prop is omitted or undefined', () => {
		const button = cva({
			base: 'rounded',
			variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
			defaultVariants: { size: 'lg' }
		});
		expect(button()).toBe('rounded text-lg');
		expect(button({ size: undefined })).toBe('rounded text-lg');
		expect(button({ size: 'sm' })).toBe('rounded text-sm');
	});

	it('supports boolean variants via stringified keys', () => {
		const button = cva({
			base: 'btn',
			variants: {
				disabled: { true: 'opacity-50', false: null },
				loading: { true: 'pointer-events-none' }
			},
			defaultVariants: { disabled: false }
		});
		expect(button()).toBe('btn');
		expect(button({ disabled: true })).toBe('btn opacity-50');
		expect(button({ loading: true })).toBe('btn pointer-events-none');
	});

	it('applies compoundVariants only when every selector matches', () => {
		const button = cva({
			base: 'btn',
			variants: {
				color: { neutral: 'bg-surface', primary: 'bg-primary' },
				variant: { solid: 'font-bold', outline: 'border' }
			},
			compoundVariants: [{ color: 'neutral', variant: 'outline', class: 'border-surface' }]
		});
		expect(button({ color: 'neutral', variant: 'outline' })).toBe(
			'btn bg-surface border border-surface'
		);
		expect(button({ color: 'primary', variant: 'outline' })).toBe('btn bg-primary border');
	});

	it('matches compoundVariants declared with array selectors', () => {
		const button = cva({
			base: 'btn',
			variants: {
				color: { neutral: 'bg-surface', primary: 'bg-primary', danger: 'bg-danger' }
			},
			compoundVariants: [{ color: ['neutral', 'danger'], class: 'ring-1' }]
		});
		expect(button({ color: 'neutral' })).toBe('btn bg-surface ring-1');
		expect(button({ color: 'danger' })).toBe('btn bg-danger ring-1');
		expect(button({ color: 'primary' })).toBe('btn bg-primary');
	});

	it('matches compoundVariants against defaultVariants when the prop is omitted', () => {
		const button = cva({
			base: 'btn',
			variants: { color: { neutral: 'bg-surface', primary: 'bg-primary' } },
			defaultVariants: { color: 'neutral' },
			compoundVariants: [{ color: 'neutral', class: 'ring-1' }]
		});
		expect(button()).toBe('btn bg-surface ring-1');
	});

	it('appends the class prop last and lets it win tailwind conflicts', () => {
		const button = cva({
			base: 'px-2',
			variants: { size: { sm: 'text-sm', lg: 'text-lg' } }
		});
		expect(button({ size: 'sm', class: 'px-8' })).toBe('text-sm px-8');
	});

	it('accepts className as an alias for class', () => {
		const button = cva({ base: 'px-2' });
		expect(button({ className: 'px-8' })).toBe('px-8');
	});
});

describe('compose', () => {
	it('merges the output of several cva components', () => {
		const root = cva({ base: 'flex', variants: { size: { sm: 'gap-1', lg: 'gap-4' } } });
		const skin = cva({ base: 'rounded', variants: { tone: { muted: 'opacity-70' } } });
		const combined = compose(root, skin);
		expect(combined({ size: 'lg', tone: 'muted' })).toBe('flex gap-4 rounded opacity-70');
	});

	it('does not leak class/className into the composed components and appends it last', () => {
		const a = cva({ base: 'px-2' });
		const b = cva({ base: 'py-2' });
		expect(compose(a, b)({ class: 'px-8' })).toBe('py-2 px-8');
	});
});
