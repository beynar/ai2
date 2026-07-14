import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Chip from './Chip/Chip.svelte';
import Harness from './ConventionNormalizationHarness.test.svelte';
import { fieldTheme } from './Form/Field/field.js';

describe('component convention normalization', () => {
	test('wraps a custom Code.header slot with the header theme class', () => {
		render(Harness, { props: { scenario: 'code-header' } });
		expect(screen.getByText('Code header').closest('.custom-code-header')).toBeInTheDocument();
	});

	test('wraps PageShell title and subtitle snippets with their theme classes', () => {
		render(Harness, { props: { scenario: 'page-shell-title' } });
		expect(screen.getByText('Page title').closest('.custom-page-title')).toBeInTheDocument();
		expect(screen.getByText('Page subtitle').closest('.custom-page-subtitle')).toBeInTheDocument();
	});

	test('wraps Menu header and footer snippets with their theme classes', () => {
		render(Harness, { props: { scenario: 'menu-slots' } });
		expect(screen.getByText('Menu header').closest('.custom-menu-header')).toBeInTheDocument();
		expect(screen.getByText('Menu footer').closest('.custom-menu-footer')).toBeInTheDocument();
	});

	test('Field normal size variants apply the expected classes', () => {
		expect(fieldTheme.header({ size: 'normal' })).toContain('gap-2');
		expect(fieldTheme.label({ size: 'normal' })).toContain('text-sm');
		expect(fieldTheme.inputContainer({ size: 'normal' })).toContain('gap-2');
	});

	test('positioned Chip uses the root theme and exposes its anchor', () => {
		render(Chip, {
			props: {
				children: '7',
				position: 'topRight',
				theme: {
					root: { base: 'canonical-root-class' }
				}
			}
		});

		const chip = screen.getByText('7').closest('[data-chip-position="topRight"]');
		expect(chip).toHaveClass('canonical-root-class', 'absolute');
	});

	test('Chip fires canonical pointer enter and leave handlers', async () => {
		const onEnter = vi.fn();
		const onLeave = vi.fn();
		render(Chip, { props: { children: 'Canonical chip', onEnter, onLeave } });

		const chip = screen.getByText('Canonical chip').closest('button');
		if (!(chip instanceof HTMLElement)) {
			throw new Error('Expected Chip with pointer handlers to render as a button.');
		}
		await fireEvent.pointerEnter(chip);
		await fireEvent.pointerLeave(chip);

		expect(onEnter).toHaveBeenCalledOnce();
		expect(onLeave).toHaveBeenCalledOnce();
	});
});
