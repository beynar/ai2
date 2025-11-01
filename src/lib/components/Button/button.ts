import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
export type ButtonPrimitiveProps<Payload extends Record<string, any> | undefined = undefined> =
	WithAttachments<
		WithSlot<
			{
				payload?: Payload;
				label?: string;
				ref?: HTMLElement | null;
				href?: string;
				loading?: boolean;
				squared?: boolean;
				color?: Colors;
				variant?: ButtonVariant;
				size?: Sizes;
				fullWidth?: boolean;
				disabled?: boolean;
				onClick?: ((payload: Payload | undefined) => void) | null | undefined;
				onEnter?: ((payload: Payload | undefined) => void) | null | undefined;
				onLeave?: ((payload: Payload | undefined) => void) | null | undefined;
				/**
				 * The class name of the button. First element that the component outputs in the DOM.
				 */
				class?: string;
				target?: string;
				rel?: string;
				as?: 'string';
				theme?: InferComponentTheme<typeof buttonTheme>;
			},
			'suffix' | 'prefix' | 'children',
			Payload
		>
	>;

export type ButtonProps<Payload extends Record<string, any> | undefined = undefined> = Omit<
	ButtonPrimitiveProps<Payload>,
	'as'
>;

const defaultButton = cva({
	base: 'rounded cursor-pointer inline-flex whitespace-nowrap items-center justify-center relative transition-all duration-100 ease-in-out transform-origin-center overflow-hidden outline-none text-sm leading-[1.5rem]',
	variants: {
		size: {
			small: 'px-2.5 text-sm leading-4 h-6 gap-1',
			normal: 'px-4 py-2 h-8 text-base gap-2',
			large: 'px-6 py-2.5 text-md leading-7 h-9 gap-2.5'
		},
		color: {
			surface: 'bg-surface-dark text-color-fg',
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			danger: 'bg-danger text-danger-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg'
		},
		variant: {
			solid: 'bg-color text-color-fg hover:bg-color/90 active:bg-color/80',
			outline: 'bg-color/0 border border-color hover:bg-color/10 text-color active:bg-color/20',
			soft: 'text-color hover:bg-color/30  bg-color-muted active:bg-color/20',
			ghost: 'text-color hover:bg-color-muted bg-color/0 active:bg-color-muted/70',
			link: 'bg-transparent hover:bg-opacity-60 text-color hover:underline active:bg-color-muted/60'
		},
		loading: {
			true: 'cursor-default pointer-events-none',
			false: null
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed',
			false: null
		},
		squared: {
			true: 'p-1 aspect-square',
			false: null
		},
		fullWidth: {
			true: '!w-full flex-1 max-w-full'
		}
	},
	defaultVariants: {
		color: 'contrast',
		variant: 'solid',
		size: 'normal'
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-muted text-contrast hover:bg-surface-lighter'
		},
		{
			color: 'surface',
			variant: 'solid',
			class: 'active:bg-surface-light'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg hover:bg-surface-light'
		},
		{
			color: 'contrast',
			variant: 'ghost',
			class: 'hover:bg-contrast-muted/20 active:bg-contrast-muted/20'
		},
		{
			color: 'surface',
			variant: 'ghost',
			class: 'active:bg-surface-muted/10 text-surface-muted hover:bg-surface-muted/20'
		},
		{
			color: 'contrast',
			variant: 'link',
			class: 'active:bg-contrast-muted/10 text-contrast'
		},
		{
			color: 'surface',
			variant: 'link',
			class: 'active:bg-surface-muted/10 text-surface-muted'
		}
	]
});

const defaultButtonPrefix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultButtonSuffix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const buttonStructure = `
<Button>
	<Prefix />
	<Children />
	<Suffix />
</Button>
`;

export const buttonTheme = {
	button: defaultButton,
	prefix: defaultButtonPrefix,
	suffix: defaultButtonSuffix
};
