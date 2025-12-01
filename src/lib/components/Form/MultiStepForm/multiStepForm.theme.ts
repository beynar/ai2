import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva.js';

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
	multiStepForm: defaultMultiStep,
	multiStepFormFooter: defaultMultiStepFooter
};

export type MultiStepFormTheme = typeof multiStepFormTheme;
export type MultiStepFormThemeProps = InferComponentTheme<MultiStepFormTheme>;
export const setMultiStepFormTheme = setComponentTheme<MultiStepFormTheme>('multiStepForm');
export const useMultiStepFormTheme = useComponentTheme('multiStepForm', multiStepFormTheme);
