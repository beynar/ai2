import { getContext, setContext } from 'svelte';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type {
	FormInputs,
	FormSubmitHandler,
	FormInput,
	InferFormValue,
	MaybePromise
} from './form.js';
import type { FormProps } from './form.props.js';
import type { MultiStepFormState } from '../MultiStepForm/multiStepFormState.svelte.js';
import { isFieldVisible } from './visibility.js';

export class FormState<I extends FormInputs = FormInputs> {
	fields = $state<FieldState<any>[]>([]);
	loading = $state(false);
	hasError = $state(false);
	private inputs: I;
	private opts: FormProps<I>;

	getValue = () => {
		// First, get raw values from all fields (without visibility filtering)
		const rawValue = this.fields.reduce((acc, field) => {
			Object.assign(acc, {
				[field.name]: field.value
			});
			return acc;
		}, {} as InferFormValue<I>);

		// Then filter based on visibility in a single pass
		return this.fields.reduce((acc, field) => {
			if (this.isFieldVisible(field.name, rawValue)) {
				Object.assign(acc, {
					[field.name]: field.value
				});
			}
			return acc;
		}, {} as InferFormValue<I>);
	};
	value = $derived.by(this.getValue);

	constructor(opts: FormProps<I>) {
		this.opts = opts;
		this.inputs = opts.inputs;
	}

	private isFieldVisible(fieldName: string, formValue?: InferFormValue<I>): boolean {
		const input = this.inputs[fieldName];
		if (!input) return true; // If input config not found, assume visible

		// Check field's own visible property (boolean) first
		const field = this.fields.find((f) => f.name === fieldName);
		if (field && field.visible === false) {
			return false;
		}

		// Then check input config visibility (boolean or function) using shared utility
		const currentValue = formValue ?? this.getRawValue();
		return isFieldVisible(input, currentValue);
	}

	private getRawValue(): InferFormValue<I> {
		return this.fields.reduce((acc, field) => {
			Object.assign(acc, {
				[field.name]: field.value
			});
			return acc;
		}, {} as InferFormValue<I>);
	}

	validate = () => {
		let firstErroredNode: HTMLElement | null = null;
		let hasError = false;
		const rawValue = this.getRawValue();
		// Only validate visible fields
		const visibleFields = this.fields.filter((field) => this.isFieldVisible(field.name, rawValue));
		const validations = visibleFields.map((field) => {
			const [error, value] = field.validate();
			if (error) {
				hasError = true;
				firstErroredNode = field.node;
			}
			return [error, value];
		});

		if (firstErroredNode) {
			(firstErroredNode as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
		}

		if (hasError) {
			return false;
		} else {
			// Only include visible fields in the result (already filtered above)
			return validations.reduce((acc, [_, value], index) => {
				const field = visibleFields[index];
				Object.assign(acc, {
					[field.name]: value
				});
				return acc;
			}, {} as InferFormValue<I>);
		}
	};

	submit = async () => {
		const result = this.validate();
		if (result === false) {
			this.hasError = true;
			return false;
		}
		this.loading = true;
		const submitResult = await this.opts.onSubmit?.(result);
		this.loading = false;
		return submitResult as InferFormValue<I>;
	};

	addField = (field: FieldState<any>) => {
		this.fields.push(field);
	};

	updateField = (field: FieldState<any>) => {
		// No-op: value is now derived from fields, so it updates automatically
		// This method is kept for compatibility but doesn't need to do anything
	};
}
export const useForm = <I extends FormInputs>(opts: FormProps<I>) => {
	const form = new FormState(opts);
	setContext('form', form);

	// If the form is inside a multistep form, we need to return the form from the context.
	const multiStepFormContext = getContext<MultiStepFormState>('multiStepForm');
	if (multiStepFormContext) {
		multiStepFormContext.addForm(form as FormState<FormInputs>);
	}
	return form as FormState<I>;
};
