import type { WithSlot } from '$lib/components/Slot/slot.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';
import type { Snippet } from 'svelte';
import type { FieldState } from './field.state.svelte.js';
import type { Sizes } from '$lib/types/theme.js';

export type KeyValuePair = { key: string; value: string };

export type TextInputType = 'text' | 'password' | 'email' | 'url' | 'textarea' | 'phone';
export type RichTextInputType = 'rich-text';
export type NumberInputType = 'number' | 'slider';
export type RatingInputType = 'rating';
export type SliderRangeInputType = 'slider-range';
export type TagInputType = 'tag';
export type TagGroupInputType = 'tag-group';
export type KeyValueInputType = 'keyvalue';
export type PinInputType = 'pin';
export type DateInputType = 'datetime' | 'date';
export type TimeInputType = 'time';
export type BooleanInputType = 'switch' | 'checkbox';
export type SingleOptionInputType = 'select' | 'radio' | 'combobox';
export type MultipleChoiceInputType = 'checkboxes';
export type FileInputType = 'file' | 'files';
export type CalendarInputType = 'calendar' | 'calendar-range';
export type ColorInputType = 'color';

export type InputType =
	| FileInputType
	| SliderRangeInputType
	| DateInputType
	| ColorInputType
	| NumberInputType
	| RatingInputType
	| TimeInputType
	| TextInputType
	| RichTextInputType
	| BooleanInputType
	| MultipleChoiceInputType
	| TagInputType
	| TagGroupInputType
	| KeyValueInputType
	| PinInputType
	| SingleOptionInputType
	| CalendarInputType;

export type FieldValue<T extends InputType> = T extends 'file'
	? File
	: T extends 'files'
		? File[]
		: T extends DateInputType
			? Date
			: T extends SliderRangeInputType
				? number[]
				: T extends NumberInputType
					? number
					: T extends RatingInputType
						? number
						: T extends TimeInputType
							? number
							: T extends TextInputType
								? string
								: T extends RichTextInputType
									? string
									: T extends PinInputType
										? string
										: T extends BooleanInputType
											? boolean
											: T extends MultipleChoiceInputType
												? string[]
												: T extends TagInputType
													? string[]
													: T extends TagGroupInputType
														? string | string[] | null
														: T extends KeyValueInputType
															? KeyValuePair[]
															: T extends SingleOptionInputType
																? string
																: T extends 'calendar'
																	? Date
																	: T extends 'calendar-range'
																		? [Date | null, Date | null]
																		: T extends ColorInputType
																			? string
																			: never;

export type InputProps<T extends InputType> = WithSlot<
	{
		/** Form field name, used as the key when the input is part of a Form. */
		name?: string;
		/** Marks the field as required for validation and shows the required indicator. */
		required?: boolean;
		/** Disables the input, preventing interaction and focus. */
		disabled?: boolean;
		/** Visual size of the field (label, spacing, and control). */
		size?: Sizes;
		/** Whether the field is rendered; when false the field is hidden from the form. */
		visible?: boolean;
		// schema?: any;
		/** Validates the current value, returning error messages (or false) when invalid. */
		onValidate?: (value: FieldValue<T>) => string[] | boolean;
		/** Called whenever the field value changes. */
		onChange?: (value: FieldValue<T>) => void;
		/** Extra HTML attributes spread onto the underlying input element. */
		attrs?: Record<string, string | boolean>;
		/** CSS classes applied to the field's root element. */
		class?: string;
		/** Theme overrides for the field's structural parts (label, input, error, ...). */
		theme?: FieldThemeProps;
		/** The field's value, bindable with `bind:value`. */
		value?: FieldValue<T> | null;
		/** Validation errors to display; `true` marks the field as errored without a message. */
		errors?: string[] | boolean;
		/** Whether the field currently holds focus, bindable with `bind:focused`. */
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
	| 'error'
	| 'errorsContainer'
>;

export type FieldProps<T extends InputType> = Omit<
	InputProps<T>,
	'type' | 'name' | 'required' | 'disabled' | 'visible' | 'onValidate' | 'onChange'
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
	base: 'text-foreground-light text-sm',
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
			true: '!ring-2 ring-offset-2 rounded !ring-danger',
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

const defaultFieldActionButton = cva({
	base: 'h-auto min-h-0 self-stretch rounded-none border-0 bg-clip-border !px-0 active:translate-y-0',
	variants: {
		size: {
			small: '-my-1.5 min-w-8',
			normal: '-my-2 min-w-9',
			large: '-my-2.5 min-w-10'
		},
		edge: {
			start: '-ml-3 mr-1',
			end: 'ml-1 -mr-3',
			none: 'mx-0'
		},
		active: {
			true: 'text-primary',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		edge: 'end',
		active: false
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
	base: 'text-foreground-muted text-xs leading-3 flex-1',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});
const defaultFieldHelper = cva({
	base: 'text-foreground-muted text-xs leading-3',
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
	root: defaultField,
	header: defaultFieldHeader,
	label: defaultFieldLabel,
	actions: defaultFieldActions,
	errorsContainer: defaultFieldErrorsContainer,
	error: defaultFieldError,
	inputContainer: defaultFieldInputContainer,
	prefix: defaultFieldPrefix,
	suffix: defaultFieldSuffix,
	actionButton: defaultFieldActionButton,
	footer: defaultFieldFooter,
	description: defaultFieldDescription,
	helper: defaultFieldHelper
};

export type FieldTheme = typeof fieldTheme;
export type FieldThemeProps = InferComponentTheme<FieldTheme>;
