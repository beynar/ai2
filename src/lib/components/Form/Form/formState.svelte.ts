import { getContext, setContext } from 'svelte';
import type { FieldState } from '../Field/fieldState.svelte.js';
import type {
	FormInputs,
	FormProps,
	FormSubmitHandler,
	InferFormValue,
	MaybePromise
} from './form.js';
import type { MultiStepFormState } from '../MultiStepForm/multiStepFormState.svelte.js';

export class FormState<I extends FormInputs = FormInputs> {
	fields = $state<FieldState<any>[]>([]);
	loading = $state(false);
	hasError = $state(false);
	getValue = () => {
		return this.fields.reduce((acc, field) => {
			Object.assign(acc, {
				[field.name]: field.value
			});
			return acc;
		}, {} as InferFormValue<I>);
	};
	value = $derived.by(this.getValue);

	constructor(private opts: FormProps<I>) {}

	validate = () => {
		let firstErroredNode: HTMLElement | null = null;
		let hasError = false;
		const validations = this.fields.map((field) => {
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
			return validations.reduce((acc, [_, value], index) => {
				const field = this.fields[index];
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
		Object.assign(this.value, {
			[field.name]: field.value
		});
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
