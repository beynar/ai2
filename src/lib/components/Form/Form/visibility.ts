import type { FormInput, InferFormValue, FormInputs } from './form.js';

/**
 * Evaluates whether a form field should be visible based on its visibility configuration.
 * 
 * @param input - The form input configuration
 * @param formValue - The current form values (used for dynamic visibility functions)
 * @returns `true` if the field should be visible, `false` otherwise
 * 
 * @example
 * ```ts
 * // Static visibility
 * isFieldVisible({ type: 'text', visible: true }, formValue) // true
 * isFieldVisible({ type: 'text', visible: false }, formValue) // false
 * 
 * // Dynamic visibility
 * isFieldVisible(
 *   { type: 'text', visible: (value) => value.showField === true },
 *   { showField: true }
 * ) // true
 * ```
 */
export function isFieldVisible<I extends FormInputs>(
	input: FormInput,
	formValue: InferFormValue<I>
): boolean {
	if (input.visible === undefined) {
		return true; // Default to visible if not specified
	}
	
	if (typeof input.visible === 'boolean') {
		return input.visible;
	}
	
	if (typeof input.visible === 'function') {
		return input.visible(formValue);
	}
	
	return true; // Fallback to visible
}

/**
 * Prepares input props by removing function-based visibility.
 * Only boolean visibility is passed to individual input components.
 * 
 * @param input - The form input configuration
 * @returns Input props without function-based visibility
 */
export function prepareInputProps(input: FormInput) {
	const { visible, ...rest } = input;
	// Only include visible if it's a boolean, not a function
	return typeof visible === 'boolean' ? { ...rest, visible } : rest;
}


