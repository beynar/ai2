import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import { cva } from 'cva';
import type { Snippet } from 'svelte';
import type { FieldState } from './fieldState.svelte.js';
import type { Sizes } from '$lib/types/theme.js';

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
export type MultipleChoiceInputType = 'checkboxes';
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

export type InputProps<T extends InputType> = WithSlot<
	{
		name?: string;
		required?: boolean;
		disabled?: boolean;
		size?: Sizes;
		readonly?: boolean;
		visible?: boolean;
		// schema?: any;
		onValidate?: (value: FieldValue<T>) => string[] | boolean;
		onChange?: (value: FieldValue<T>) => void;
		attrs?: Record<string, string | boolean>;
		class?: string;
		theme?: InferComponentTheme<typeof fieldTheme>;
		value?: FieldValue<T> | null;
		errors?: string[] | boolean;
		focused?: boolean;
	},
	| 'header'
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

export type FieldProps<T extends InputType> = Omit<
	InputProps<T>,
	'type' | 'name' | 'required' | 'disabled' | 'readonly' | 'visible' | 'onValidate' | 'onChange'
> & {
	as?: string;
	children: Snippet;
	field: FieldState<T>;
};

const defaultField = cva({
	base: 'flex flex-col gap-2',
	variants: {
		hasError: {
			true: 'text-danger',
			false: ''
		}
	}
});

const defaultFieldHeader = cva({
	base: 'flex items-center gap-2 relative',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		},
		required: {
			// true: 'before:content-["*"] before:text-danger before:mr-1 before:text-sm  before:font-bold before:absolute before:right-0 before:top-0',
			false: ''
		},
		hasError: {
			true: 'text-danger',
			false: ''
		}
	}
});

const defaultFieldLabel = cva({
	base: 'text-contrast-light text-sm',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		hasError: {
			true: 'text-danger',
			false: ''
		},
		required: {
			true: 'relative before:content-["*"] before:text-danger before:text-sm  before:font-bold before:absolute before:-right-2 before:top-0',
			false: ''
		}
	}
});

const defaultFieldActions = cva({
	base: 'flex items-start gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFieldErrorsContainer = cva({
	base: 'grid gap-1',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFieldError = cva({
	base: 'text-danger text-xs leading-3',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultFieldInputContainer = cva({
	base: 'flex-1 gap-2 flex justify-between w-full items-center',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		},
		hasError: {
			true: '!border-danger !border !ring-danger',
			false: ''
		}
	}
});

const defaultFieldPrefix = cva({
	base: 'flex items-center gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});
const defaultFieldSuffix = cva({
	base: 'flex items-center gap-2',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultFieldFooter = cva({
	base: 'flex items-start gap-2 justify-between',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});
const defaultFieldDescription = cva({
	base: 'text-contrast-muted text-xs leading-3 flex-1',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});
const defaultFieldHelper = cva({
	base: 'text-contrast-muted text-xs leading-3',
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
	header: defaultFieldHeader,
	label: defaultFieldLabel,
	actions: defaultFieldActions,
	errorsContainer: defaultFieldErrorsContainer,
	error: defaultFieldError,
	inputContainer: defaultFieldInputContainer,
	prefix: defaultFieldPrefix,
	suffix: defaultFieldSuffix,
	footer: defaultFieldFooter,
	description: defaultFieldDescription,
	helper: defaultFieldHelper
};
