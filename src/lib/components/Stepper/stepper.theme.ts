import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

export const defaultStepper = cva({
	base: 'relative overflow-hidden transition-all',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperContainer = cva({
	base: 'grid transition-all w-full',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperStep = cva({
	base: 'h-fit w-full flex-1 focus:outline-none',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const stepperTheme = {
	stepper: defaultStepper,
	container: defaultStepperContainer,
	step: defaultStepperStep
};

export type StepperTheme = typeof stepperTheme;
export type StepperThemeProps = InferComponentTheme<StepperTheme>;
export const setStepperTheme = setComponentTheme<StepperTheme>('stepper');
export const useStepperTheme = useComponentTheme('stepper', stepperTheme);

