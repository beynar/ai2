import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { FieldValue, InputType } from './field.js';
import * as v from 'valibot';
import { schemas } from './schemas.js';
import { getContext, onDestroy, untrack } from 'svelte';
import type { FormState } from '../Form/form.state.svelte.js';

export type FieldValidationResult = string | string[] | boolean | null | undefined;

type FieldStateStaticOptions<T extends InputType> = {
	type: T;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	visible?: boolean;
	onValidate?: (value: FieldValue<T>) => FieldValidationResult;
	onChange?: (value: FieldValue<T>) => void;
	id: string;
};

type FieldStateBindableOptions<T extends InputType> = {
	value?: FieldValue<T> | null;
	errors: string[] | boolean;
	focused: boolean;
};

export type FieldState<T extends InputType> = ReturnType<typeof createFieldState<T>>;

const normalizeErrors = (validation: FieldValidationResult): string[] => {
	if (!validation) return [];
	if (validation === true) return ['Invalid value'];
	return Array.isArray(validation) ? validation : [validation];
};

export const createFieldState = <T extends InputType>(
	options: FieldStateBindableOptions<T> & FieldStateStaticOptions<T>
) => {
	class FieldState extends createBindableStateClass<
		FieldStateBindableOptions<T> & FieldStateStaticOptions<T>
	>() {
		declare name: string;
		declare form?: FormState;
		node = $state<HTMLElement | null>(null);
		rootNode = $state<HTMLElement | null>(null);
		labelId = `${options.id}-label`;
		errorId = `${options.id}-errors`;
		errorMessages = $derived(normalizeErrors(this.errors));
		hasError = $derived(this.errorMessages.length > 0);
		private mounted = false;
		constructor(options: FieldStateBindableOptions<T> & FieldStateStaticOptions<T>) {
			super(options);
			if (!this.name) {
				this.name = `${this.type}-input-${this.id}`;
			}
			$effect(() => {
				const newValue = this.value;
				untrack(() => {
					if (!this.mounted) {
						this.mounted = true;
					} else {
						if (this.hasError) {
							this.validate(newValue);
						}
						this.onChange?.(newValue as FieldValue<T>);
						if (this.form) {
							this.form.updateFieldValue(field);
						}
					}
				});
			});
		}

		checkSchema(value?: FieldValue<T> | null) {
			const schema = schemas[this.required ? 'required' : 'optional'][this.type];
			return v.safeParse(schema, value);
		}

		get isValid() {
			return this.checkSchema(this.value).success;
		}

		validate = (value = this.value) => {
			const parseResult = this.checkSchema(value);
			this.errors = [];

			if (!parseResult.success && parseResult.issues.length > 0) {
				this.errors = parseResult.issues.map((issue) => issue.message);
				return [true, parseResult.output] as const;
			}

			// We should only call onValidate if the value is not null or undefined and not an empty string when the field is not required
			const shouldCallOnValidate =
				this.required || (value !== null && value !== undefined && value !== '');
			if (this.onValidate && shouldCallOnValidate) {
				this.errors = normalizeErrors(this.onValidate(value as FieldValue<T>));
			}

			return [this.hasError, parseResult.output] as const;
		};
	}

	const field = new FieldState(options);
	const formContext = getContext<FormState>('form');
	if (formContext) {
		field.form = formContext;
		onDestroy(formContext.registerField(field));
	}
	return field;
};
