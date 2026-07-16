export type LayoutSpacing = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
export type LayoutSpacingKey = `${LayoutSpacing}`;

const spacingValues = {
	'0': {
		gap: 'gap-0',
		rowGap: 'gap-y-0',
		columnGap: 'gap-x-0',
		paddingInline: 'px-0',
		paddingBlock: 'py-0',
		css: '0px'
	},
	'0.5': {
		gap: 'gap-0.5',
		rowGap: 'gap-y-0.5',
		columnGap: 'gap-x-0.5',
		paddingInline: 'px-0.5',
		paddingBlock: 'py-0.5',
		css: 'var(--ui-spacing-0_5)'
	},
	'1': {
		gap: 'gap-1',
		rowGap: 'gap-y-1',
		columnGap: 'gap-x-1',
		paddingInline: 'px-1',
		paddingBlock: 'py-1',
		css: 'var(--ui-spacing-1)'
	},
	'1.5': {
		gap: 'gap-1.5',
		rowGap: 'gap-y-1.5',
		columnGap: 'gap-x-1.5',
		paddingInline: 'px-1.5',
		paddingBlock: 'py-1.5',
		css: 'var(--ui-spacing-1_5)'
	},
	'2': {
		gap: 'gap-2',
		rowGap: 'gap-y-2',
		columnGap: 'gap-x-2',
		paddingInline: 'px-2',
		paddingBlock: 'py-2',
		css: 'var(--ui-spacing-2)'
	},
	'3': {
		gap: 'gap-3',
		rowGap: 'gap-y-3',
		columnGap: 'gap-x-3',
		paddingInline: 'px-3',
		paddingBlock: 'py-3',
		css: 'var(--ui-spacing-3)'
	},
	'4': {
		gap: 'gap-4',
		rowGap: 'gap-y-4',
		columnGap: 'gap-x-4',
		paddingInline: 'px-4',
		paddingBlock: 'py-4',
		css: 'var(--ui-spacing-4)'
	},
	'5': {
		gap: 'gap-5',
		rowGap: 'gap-y-5',
		columnGap: 'gap-x-5',
		paddingInline: 'px-5',
		paddingBlock: 'py-5',
		css: 'var(--ui-spacing-5)'
	},
	'6': {
		gap: 'gap-6',
		rowGap: 'gap-y-6',
		columnGap: 'gap-x-6',
		paddingInline: 'px-6',
		paddingBlock: 'py-6',
		css: 'var(--ui-spacing-6)'
	},
	'8': {
		gap: 'gap-8',
		rowGap: 'gap-y-8',
		columnGap: 'gap-x-8',
		paddingInline: 'px-8',
		paddingBlock: 'py-8',
		css: 'var(--ui-spacing-8)'
	},
	'10': {
		gap: 'gap-10',
		rowGap: 'gap-y-10',
		columnGap: 'gap-x-10',
		paddingInline: 'px-10',
		paddingBlock: 'py-10',
		css: 'var(--ui-spacing-10)'
	}
} as const satisfies Record<
	LayoutSpacingKey,
	{
		gap: string;
		rowGap: string;
		columnGap: string;
		paddingInline: string;
		paddingBlock: string;
		css: string;
	}
>;

const selectSpacingValues = <Key extends keyof (typeof spacingValues)[LayoutSpacingKey]>(
	key: Key
) =>
	Object.fromEntries(
		Object.entries(spacingValues).map(([spacing, values]) => [spacing, values[key]])
	) as Record<LayoutSpacingKey, (typeof spacingValues)[LayoutSpacingKey][Key]>;

export const layoutGapClasses = selectSpacingValues('gap');
export const layoutRowGapClasses = selectSpacingValues('rowGap');
export const layoutColumnGapClasses = selectSpacingValues('columnGap');
export const layoutPaddingInlineClasses = selectSpacingValues('paddingInline');
export const layoutPaddingBlockClasses = selectSpacingValues('paddingBlock');
export const layoutSpacingCssValues = selectSpacingValues('css');

export const toLayoutSpacingKey = (spacing: LayoutSpacing): LayoutSpacingKey => `${spacing}`;
