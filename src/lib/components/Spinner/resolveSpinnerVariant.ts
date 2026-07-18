import type { SpinnerVariant } from './spinner.props.js';

export const resolveSpinnerVariant = (
	localVariant?: SpinnerVariant,
	themeVariant?: SpinnerVariant
): SpinnerVariant => localVariant ?? themeVariant ?? 'default';
