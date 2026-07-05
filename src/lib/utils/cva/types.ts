/**
 * Type definitions vendored from `cva` (Copyright 2022 Joe Bell, Apache-2.0)
 * and `clsx`. The clsx class types are copied manually because re-importing them
 * (or cnfast's equivalents) triggers the TS2742 "cannot be named" error when
 * this package is built with `declaration: true`.
 */

/* clsx
  ---------------------------------- */

export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| bigint
	| null
	| boolean
	| undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

/* Utils
  ---------------------------------- */

type OmitUndefined<T> = T extends undefined ? never : T;
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;

export type VariantProps<Component extends (...args: any) => any> = Omit<
	OmitUndefined<Parameters<Component>[0]>,
	'class' | 'className'
>;

/* compose
  ---------------------------------- */

export interface Compose {
	<T extends ReturnType<CVA>[]>(
		...components: [...T]
	): (
		props?: (
			| UnionToIntersection<
					{
						[K in keyof T]: VariantProps<T[K]>;
					}[number]
			  >
			| undefined
		) &
			CVAClassProp
	) => string;
}

/* cx
  ---------------------------------- */

export interface CX {
	(...inputs: ClassValue[]): string;
}

/* cva
  ---------------------------------- */

export type CVAConfigBase = { base?: ClassValue };
export type CVAVariantShape = Record<string, Record<string, ClassValue>>;
export type CVAVariantSchema<V extends CVAVariantShape> = {
	[Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
};
export type CVAClassProp =
	| {
			class?: ClassValue;
			className?: never;
	  }
	| {
			class?: never;
			className?: ClassValue;
	  };

export interface CVA {
	<_ extends "cva's generic parameters are restricted to internal use only.", V>(
		config: V extends CVAVariantShape
			? CVAConfigBase & {
					variants?: V;
					compoundVariants?: (V extends CVAVariantShape
						? (
								| CVAVariantSchema<V>
								| {
										[Variant in keyof V]?:
											| StringToBoolean<keyof V[Variant]>
											| StringToBoolean<keyof V[Variant]>[]
											| undefined;
								  }
							) &
								CVAClassProp
						: CVAClassProp)[];
					defaultVariants?: CVAVariantSchema<V>;
				}
			: CVAConfigBase & {
					variants?: never;
					compoundVariants?: never;
					defaultVariants?: never;
				}
	): (
		props?: V extends CVAVariantShape ? CVAVariantSchema<V> & CVAClassProp : CVAClassProp
	) => string;
}
