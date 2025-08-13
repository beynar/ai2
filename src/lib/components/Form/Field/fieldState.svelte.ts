import { createBindableStateClass } from '$lib/utils/state.svelte.js';
import type { FieldValue, InputType } from './field.js';
import * as v from 'valibot';
import { schemas } from './schemas.js';
import { getContext, untrack } from 'svelte';
import type { FormState } from '../Form/formState.svelte.js';

type FieldStateStaticOptions<T extends InputType> = {
	type: T;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	visible?: boolean;
	onValidate?: (value: FieldValue<T>) => string[] | boolean;
	onChange?: (value: FieldValue<T>) => void;
	id: string;
};

type FieldStateBindableOptions<T extends InputType> = {
	value: FieldValue<T>;
	errors: string[] | boolean;
	focused: boolean;
};

export type FieldState<T extends InputType> = ReturnType<typeof createFieldState<T>>;

type Require<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export const createFieldState = <T extends InputType>(
	options: FieldStateBindableOptions<T> & FieldStateStaticOptions<T>
) => {
	class FieldState extends createBindableStateClass<
		FieldStateBindableOptions<T> & FieldStateStaticOptions<T>
	>() {
		declare name: string;
		declare form?: FormState;
		node = $state<HTMLElement | null>(null);
		hasError = $derived(typeof this.errors === 'boolean' ? this.errors : !!this.errors?.length);
		mounted = $state(false);
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
							this.form.updateField(field);
						}
					}
				});
			});
		}

		private checkSchema(value: FieldValue<T>) {
			let schema = schemas[this.required ? 'required' : 'optional'][this.type];
			const result = v.safeParse(schema, value);
			return result;
		}

		get isValid() {
			return this.checkSchema(this.value).success;
		}

		validate = (value = this.value) => {
			const parseResult = this.checkSchema(value);
			this.errors = [];

			if (!parseResult.success && parseResult.issues.length > 0) {
				this.errors = true;
			}

			if (this.onValidate) {
				this.errors = this.onValidate(value as FieldValue<T>) || !!this.errors;
			}

			return [this.hasError, parseResult.output];
		};
	}

	const field = new FieldState(options);
	const formContext = getContext<FormState>('form');
	if (formContext) {
		formContext.addField(field);
		field.form = formContext;
	}
	return field;
};
