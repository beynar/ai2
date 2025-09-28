import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ToggleButtonVariant = 'outline' | 'soft' | 'ghost';
export type ToggleButtonProps = WithAttachments<
	WithSlot<
		{
			ref?: HTMLElement | null;
			color?: Colors;
			variant?: ToggleButtonVariant;
			size?: Sizes;
			disabled?: boolean;
			class?: string;
			theme?: InferComponentTheme<typeof toggleButtonTheme>;
			checked?: boolean;
			onChange?: ((checked: boolean) => void) | null | undefined;
		},
		'prefix' | 'children' | 'suffix',
		{ checked: boolean }
	>
>;

const defaultButton = cva({
	base: 'rounded cursor-pointer inline-flex whitespace-nowrap items-center justify-center relative transition-all duration-100 ease-in-out transform-origin-center overflow-hidden outline-none text-sm leading-[1.5rem]',
	variants: {
		checked: {
			true: '',
			false: null
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed',
			false: null
		},
		color: {
			surface: '',
			primary: '',
			secondary: '',
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		variant: {
			outline: 'bg-color/0 border border-color text-color active:bg-color/20 checked:bg-color/20',
			soft: 'text-color bg-color-muted active:bg-color/30 checked:bg-color/30',
			ghost: 'text-color bg-color/0 active:bg-color/20 checked:bg-color/20'
		},
		squared: {
			true: 'p-1 aspect-square',
			false: null
		},
		size: {
			normal: 'px-4 py-2 h-8 text-base gap-2',
			large: 'px-6 py-2.5 text-md leading-7 h-9 gap-2.5',
			small: 'px-2.5 text-sm leading-4 h-6 gap-1'
		}
	},
	defaultVariants: {
		checked: false
	},
	compoundVariants: [
		{
			variant: 'outline',
			checked: false,
			class: 'hover:bg-color/10'
		},
		{
			variant: 'soft',
			checked: false,
			class: 'hover:bg-color/20'
		},
		{
			variant: 'ghost',
			checked: false,
			class: 'hover:bg-color-muted'
		},
		{
			variant: 'soft',
			color: 'surface',
			checked: false,
			class: '!bg-surface hover:!bg-surface-light text-contrast'
		},
		{
			variant: 'soft',
			color: 'surface',
			checked: true,
			class: '!bg-surface-muted text-contrast'
		},
		{
			variant: 'ghost',
			color: 'surface',
			checked: false,
			class: 'hover:!bg-surface-lighter/20 active:!bg-surface-lighter/30 text-contrast'
		},
		{
			variant: 'ghost',
			color: 'surface',
			checked: true,
			class: '!bg-surface-lighter/30 text-contrast'
		},
		{
			variant: 'outline',
			color: 'surface',
			checked: false,
			class:
				'hover:!bg-surface-lighter/20 active:!bg-surface-lighter/30 border-surface-lighter text-contrast'
		},
		{
			variant: 'outline',
			color: 'surface',
			checked: true,
			class: '!bg-surface-lighter/30 border-surface-lighter text-contrast'
		}
	]
});

const defaultToggleButtonPrefix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		},
		checked: {
			true: '',
			false: ''
		}
	}
});

const defaultToggleButtonSuffix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		},
		checked: {
			true: '',
			false: ''
		}
	}
});

export const toggleButtonTheme = {
	button: defaultButton,
	prefix: defaultToggleButtonPrefix,
	suffix: defaultToggleButtonSuffix
};
