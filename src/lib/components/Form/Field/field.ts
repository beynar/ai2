import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import { cva } from 'cva';

export type TextInputType =
	| 'text'
	| 'password'
	| 'email'
	| 'url'
	| 'color'
	| 'textarea'
	| 'color'
	| 'phone';
export type NumberInputType = 'number' | 'slider';
export type TagInputType = 'tag';
export type DateInputType = 'datetime' | 'date';
export type TimeInputType = 'time';
export type BooleanInputType = 'switch' | 'checkbox';
export type SingleOptionInputType = 'select' | 'radio';
export type MultipleChoiceInputType = 'checkboxes' | 'radios';
export type FileInputType = 'file' | 'files';
export type CalendarInputType = 'calendar' | 'calendar-range';

export type InputType =
	| FileInputType
	| DateInputType
	| NumberInputType
	| TimeInputType
	| TextInputType
	| BooleanInputType
	| MultipleChoiceInputType
	| TagInputType
	| SingleOptionInputType
	| CalendarInputType;

export type FieldValue<T extends InputType> = T extends 'file'
	? File
	: T extends 'files'
		? File[]
		: T extends DateInputType
			? Date
			: T extends NumberInputType
				? number
				: T extends TimeInputType
					? string
					: T extends TextInputType
						? string
						: T extends BooleanInputType
							? boolean
							: T extends MultipleChoiceInputType
								? string[]
								: T extends TagInputType
									? string[]
									: T extends SingleOptionInputType
										? string
										: T extends 'calendar'
											? Date
											: T extends 'calendar-range'
												? [Date, Date]
												: never;

export type BaseFieldProps<T extends InputType> = WithSlot<
	{
		id?: string;
		attrs?: Record<string, string | boolean>;
		type: T;
		as?: string;
		name: string;
		label: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		visible?: boolean;
		class?: string;
		errors?: string[] | boolean;
		schema?: any;
		validate?: (value: FieldValue<T>) => string[] | boolean;
		onchange?: (value: FieldValue<T>) => void;
		theme?: InferComponentTheme<typeof fieldTheme>;
	},
	| 'label'
	| 'suffix'
	| 'prefix'
	| 'actions'
	| 'description'
	| 'helper'
	| 'footer'
	| 'header'
	| 'error'
	| 'errorsContainer'
>;

const defaultField = cva({
	base: 'flex flex-col gap-2'
});

const defaultFieldHeader = cva({
	base: 'flex items-center gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFieldLabel = cva({
	base: 'text-sm font-medium',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFieldActions = cva({
	base: 'flex items-center gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFieldErrorsContainer = cva({
	base: 'text-sm text-red-500',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFieldError = cva({
	base: 'text-sm text-danger',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFieldInputContainer = cva({
	base: 'flex items-center gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFieldPrefix = cva({});
const defaultFieldSuffix = cva({});

const defaultFieldFooter = cva({
	base: 'flex items-center gap-2'
});
const defaultFieldDescription = cva({
	base: 'text-sm text-contrast-secondary',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});
const defaultFieldHelper = cva({
	base: 'text-sm text-contrast-secondary',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

export const fieldStructure = `
<Field>
	<Header>
		<Label />
		<Actions />
	</Header>
	<InputContainer>
		<Prefix />
		<Input />
		<Suffix />
	</InputContainer>
	<Footer>
		<Description />
		<Helper />
	</Footer>
    <ErrorsContainer>
        <Error />
    </ErrorsContainer>
</Field>
`;

export const llmDescription = `
The field component is a versatile wrapper component for form inputs.
You won't need to use this component directly, but it's a good idea to know about it.
The field component is used to wrap form inputs and provide a consistent look and feel.
It's also used to provide a consistent way to handle errors and validation.

The field component is composed of the following parts:
- Header
- InputContainer
- Footer
- ErrorsContainer
- Error
- Description
- Helper

To customize the field component, you can use the following snippets:

- header: it is the wrapper for the label and actions.
- label: it is the label for the field.
- actions: it is the actions for the field.
- inputContainer: it is the wrapper for the input, prefix and suffix.
- footer: it is the wrapper for the description and helper.
- errorsContainer: it is the wrapper for the error.
- error: it is the error for the field.
- description: it is the description for the field.
- helper: it is the helper for the field.

These snippets will receive the fieldState as argument.

`;

export const fieldTheme = {
	field: defaultField,
	fieldHeader: defaultFieldHeader,
	fieldLabel: defaultFieldLabel,
	fieldActions: defaultFieldActions,
	fieldErrorsContainer: defaultFieldErrorsContainer,
	fieldError: defaultFieldError,
	fieldInputContainer: defaultFieldInputContainer,
	fieldPrefix: defaultFieldPrefix,
	fieldSuffix: defaultFieldSuffix,
	fieldFooter: defaultFieldFooter,
	fieldDescription: defaultFieldDescription,
	fieldHelper: defaultFieldHelper
};
