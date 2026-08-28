import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

export const defaultStepper = cva({
	base: 'relative w-full max-w-full min-w-0 overflow-hidden transition-[height]',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperContainer = cva({
	base: 'pointer-events-none absolute top-0 left-0 grid min-w-0',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const defaultStepperStep = cva({
	base: 'pointer-events-none h-fit w-full min-w-0 flex-1 opacity-0 transition-opacity focus:outline-none data-[step-active=true]:pointer-events-auto data-[step-active=true]:opacity-100',
	variants: {
		mode: {
			classic: '',
			vertical: ''
		}
	}
});

export const stepperTheme = {
	root: defaultStepper,
	container: defaultStepperContainer,
	step: defaultStepperStep
};

export type StepperTheme = typeof stepperTheme;
export type StepperThemeProps = InferComponentTheme<StepperTheme>;
export const setStepperTheme = setComponentTheme<StepperTheme>('stepper');
export const useStepperTheme = useComponentTheme<StepperTheme>('stepper', stepperTheme);
