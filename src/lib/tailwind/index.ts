import plugin from 'tailwindcss/plugin';
import { colors, variants } from './colors.js';
import type { ThemeOptions } from './theme.js';
import { getSpinner } from './spinnner.js';
const dataColors = colors.reduce((acc, color) => {
	acc[`[data-color="${color}"]`] = variants.reduce(
		(acc, variant) => {
			const v = variant.toLowerCase();
			Object.assign(acc, {
				[`--color-${v}`]: `var(--color-${color}-${v})`
			});
			return acc;
		},
		{
			'--color': `var(--color-${color})`
		} as any
	);
	return acc;
}, {} as any);

export default plugin.withOptions<ThemeOptions>(
	(options) => {
		return ({ addBase, addComponents, matchUtilities, addUtilities, theme, addVariant }) => {
			addBase({
				...dataColors
			});

			const parseUtility =
				(attribute: string) =>
				(value: string, { modifier }: { modifier: string | null }) => {
					if (modifier) {
						const suffixPattern = /(-light|-lighter|-dark|-muted|-fg)/;
						const match = value.match(suffixPattern);
						const suffix = match?.[1] || '';
						return {
							[`${attribute}`]: `color-mix(in oklab, var(--color${suffix}) ${modifier}%, transparent)`
						};
					} else {
						return {
							[`${attribute}`]: `var(--color${value})`
						};
					}
				};

			matchUtilities(
				{
					'text-color': parseUtility('color'),
					'bg-color': parseUtility('background-color'),
					'ring-color': parseUtility('--tw-ring-color'),
					'ring-offset-color': parseUtility('--tw-ring-offset-color'),
					'border-color': parseUtility('border-color'),
					'border-top-color': parseUtility('border-top-color'),
					'border-right-color': parseUtility('border-right-color'),
					'border-bottom-color': parseUtility('border-bottom-color'),
					'border-left-color': parseUtility('border-left-color'),
					'border-s-color': parseUtility('border-inline-start-color'),
					'border-e-color': parseUtility('border-inline-end-color'),
					'shadow-color': parseUtility('--tw-shadow-color')
				},
				{
					values: {
						DEFAULT: '',
						light: '-light',
						lighter: '-lighter',
						dark: '-dark',
						muted: '-muted',
						fg: '-fg'
					},
					type: 'color',
					modifiers: 'any'
				}
			);

			// DYNAMIC WINDOW UTILITIES
			addUtilities({
				'.h-window': {
					height: 'var(--window-height)'
				},
				'.w-window': {
					width: 'var(--window-width)'
				}
			});

			// RAISED UTILITY
			addBase({
				'[data-color-scheme="dark"]': {
					'--dark-raised-border': '1px solid var(--current-border, var(--color-surface-muted))',
					'--dark-raised-shadow': 'none'
				},
				'[data-color-scheme="light"]': {
					// '--light-raised-border': 'var(--current-border, var(--color-surface-lighter))'
					'--light-raised-border':
						options?.['raised-with-border'] !== false
							? '1px solid var(--current-border, var(--color-surface-muted))'
							: '0px'
				},
				':has([data-badge])': {
					position: 'relative'
				}
			});

			addComponents({
				'.ui-spinner': getSpinner(options).style
			});

			addVariant('checked', ['&:checked', "&[data-checked='true']"]);
			addVariant('not-checked', ['&:not(:checked)', "&[data-checked='false']"]);
			addVariant('child', '& > *');
			addVariant('first-child', '& > *:first-child');
			addVariant('last-child', '& > *:last-child');
			addVariant('not-first-child', '& > *:not(:first-child)');
			addVariant('not-last-child', '& > *:not(:last-child)');
			addVariant('not-first-not-last-child', '& > *:not(:first-child):not(:last-child)');

			matchUtilities(
				{
					raised: (value) => {
						if (value !== 'none') {
							const valueWithoutRgb = value.replace(/rgb\((.*?)\)/g, 'var(--tw-shadow-color)');
							return {
								border: 'var(--light-raised-border)',
								// border:
								// 	'1px solid var(--light-raised-border, var(--current-border, var(--color-surface-lighter)))',
								'--tw-shadow': value as string,
								'--tw-shadow-colored': valueWithoutRgb as string,
								// 'box-shadow': `var(--dark-raised-shadow, var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow))`,
								'box-shadow':
									'var(--dark-raised-shadow, var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow))'
							};
						} else {
							return {
								'box-shadow': 'none',
								'--tw-shadow': 'none',
								'--tw-shadow-colored': 'none',
								border: '0px'
							};
						}
					}
				},
				{
					values: theme('boxShadow')
				}
			);
		};
	},
	(options) => ({
		theme: {
			extend: {
				keyframes: {
					...getSpinner(options).keyframes
				}
			}
		}
	})
);
