// This will be a collection of schemas for the form fields

import * as v from 'valibot';
import type { InputType } from './field.js';

const nonEmptyString = v.pipe(v.string(), v.nonEmpty());
const nonEmptyArray = (schema: v.BaseSchema<any, any, any>) =>
	v.pipe(v.array(schema), v.minLength(1));
const emptyStringNull = (schema: v.BaseSchema<any, any, any>) =>
	v.union([
		v.pipe(
			v.literal(''),
			v.transform(() => null)
		),
		schema
	]);

const emptyArrayNull = (schema: v.BaseSchema<any, any, any>) =>
	v.union([
		v.pipe(
			v.strictTuple([]),
			v.transform(() => null)
		),
		schema
	]);

const optional = (schema: v.BaseSchema<any, any, any>) =>
	v.optional(v.nullable(schema, null), null);

type Schemas = Record<InputType, v.BaseSchema<any, any, any>>;
export const schemas: {
	required: Schemas;
	optional: Schemas;
} = {
	required: {
		// Text input types
		text: nonEmptyString,
		password: v.pipe(nonEmptyString, v.minLength(6)),
		email: v.pipe(nonEmptyString, v.email()),
		url: v.pipe(nonEmptyString, v.url()),
		color: nonEmptyString,
		textarea: nonEmptyString,
		phone: nonEmptyString,

		// Number input types
		number: v.number(),
		slider: v.number(),

		// Tag input type
		tag: nonEmptyArray(v.string()),

		// Date input types
		datetime: v.date(),
		date: v.date(),

		// Time input type
		time: v.string(),

		// Boolean input types
		switch: v.boolean(),
		checkbox: v.boolean(),

		// Single option input types
		select: v.string(),
		radio: v.string(),

		// Multiple choice input types
		checkboxes: v.array(v.string()),
		radios: v.array(v.string()),

		// File input types
		file: v.instance(File),
		files: nonEmptyArray(v.instance(File)),
		// Calendar input types
		calendar: v.date(),
		'calendar-range': v.tuple([v.date(), v.date()])
	},
	optional: {
		// Text input types
		text: optional(emptyStringNull(v.string())),
		password: optional(emptyStringNull(v.pipe(v.string(), v.minLength(6)))),
		email: optional(emptyStringNull(v.pipe(v.string(), v.email()))),
		url: optional(emptyStringNull(v.pipe(v.string(), v.url()))),
		color: optional(emptyStringNull(v.string())),
		textarea: optional(emptyStringNull(v.string())),
		phone: optional(emptyStringNull(v.string())),
		// Number input types
		number: optional(v.number()),
		slider: optional(v.number()),

		// Tag input type
		tag: optional(emptyArrayNull(v.array(v.string()))),

		// Date input types
		datetime: optional(v.date()),
		date: optional(v.date()),

		// Time input type
		time: optional(v.string()),

		// Boolean input types
		switch: optional(v.boolean()),
		checkbox: optional(v.boolean()),

		// Single option input types
		select: optional(v.string()),
		radio: optional(v.string()),

		// Multiple choice input types
		checkboxes: optional(emptyArrayNull(v.array(v.string()))),
		radios: optional(emptyArrayNull(v.array(v.string()))),

		// File input types
		file: optional(v.instance(File)),
		files: optional(emptyArrayNull(v.array(v.instance(File)))),
		// Calendar input types
		calendar: optional(v.date()),
		'calendar-range': optional(emptyArrayNull(v.strictTuple([v.date(), v.date()])))
	}
};
