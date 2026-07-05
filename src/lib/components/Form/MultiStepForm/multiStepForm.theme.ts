import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultMultiStep = cva({
	base: 'flex flex-col relative p-2'
	// variants: {
	// size: {
	// 	small: 'gap-2',
	// 	normal: 'gap-4',
	// 	large: 'gap-6'
	// }
	// }
});

const defaultMultiStepHeader = cva({
	base: ''
});

const defaultMultiStepFooter = cva({
	base: 'flex justify-between gap-2'
	// variants: {
	// 	size: {
	// 		small: 'gap-2',
	// 		normal: 'gap-4',
	// 		large: 'gap-6'
	// 	}
	// }
});

export const multiStepFormTheme = {
	root: defaultMultiStep,
	multiStepFormHeader: defaultMultiStepHeader,
	multiStepFormFooter: defaultMultiStepFooter
};

export type MultiStepFormTheme = typeof multiStepFormTheme;
export type MultiStepFormThemeProps = InferComponentTheme<MultiStepFormTheme>;
export const setMultiStepFormTheme = setComponentTheme<MultiStepFormTheme>('multiStepForm');
export const useMultiStepFormTheme = useComponentTheme<MultiStepFormTheme>(
	'multiStepForm',
	multiStepFormTheme
);
