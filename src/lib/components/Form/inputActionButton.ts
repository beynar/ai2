import type { Sizes } from '$lib/types/theme.js';

type InputActionButtonSide = 'left' | 'right';

const buttonSizeClass: Record<Sizes, string> = {
	small: '!size-8',
	normal: '!size-9',
	large: '!size-10'
};

const buttonOffsetClass: Record<Sizes, string> = {
	small: '-my-1.5',
	normal: '-my-2',
	large: '-my-2.5'
};

const buttonEdgeClass: Record<InputActionButtonSide, string> = {
	left: '-ml-3',
	right: '-mr-3'
};

const getSize = (size?: Sizes) => size ?? 'normal';

export const getInputActionButtonSizeClass = (size?: Sizes) => buttonSizeClass[getSize(size)];

export const getInputActionButtonGroupClass = (
	size?: Sizes,
	side: InputActionButtonSide = 'right'
) =>
	`flex shrink-0 items-center gap-0.5 ${buttonOffsetClass[getSize(size)]} ${buttonEdgeClass[side]}`;

export const getInputActionButtonClass = (size?: Sizes, side: InputActionButtonSide = 'right') =>
	`${getInputActionButtonSizeClass(size)} ${buttonOffsetClass[getSize(size)]} ${buttonEdgeClass[side]}`;
