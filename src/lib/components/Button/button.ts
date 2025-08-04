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
				ref?: HTMLElement | null;
				href?: string;
				loading?: boolean;
				squared?: boolean;
				color?: Colors;
				variant?: ButtonVariant;
				size?: Sizes;
				fullWidth?: boolean;
				disabled?: boolean;
				onclick?: ((payload: Payload | undefined) => void) | null | undefined;
				onenter?: ((payload: Payload | undefined) => void) | null | undefined;
				onleave?: ((payload: Payload | undefined) => void) | null | undefined;
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
	base: 'rounded cursor-pointer inline-flex whitespace-nowrap items-center justify-center relative transition-all duration-100 ease-in-out transform-origin-center overflow-hidden outline-none text-sm leading-[1.5rem] active:scale-[0.99]',
	variants: {
		size: {
			small: 'px-2.5 text-[10px] leading-4 h-6 gap-1',
			normal: 'px-4 py-2 h-8 gap-2',
			large: 'px-6 py-2.5 text-sm leading-7 h-9 gap-2.5'
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
			solid: 'bg-color text-color-fg hover:bg-color/90 active:bg-color/95',
			outline: 'bg-color/0 border border-color hover:bg-color/10 text-color',
			soft: 'text-color hover:bg-color/30  bg-color-muted',
			ghost: 'text-color hover:bg-color-muted bg-color/0',
			link: 'bg-transparent hover:bg-opacity-60 text-color hover:underline'
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
			class: 'border-surface-lighter text-contrast hover:bg-surface-lighter'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg hover:bg-surface-light'
		}
	]
});

const defaultButtonPrefix = cva({
	base: 'w-6 h-6',
	variants: {
		size: {
			normal: 'w-6 h-6',
			large: 'w-7 h-7',
			small: 'w-4 h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultButtonSuffix = cva({
	base: 'w-6 h-6',
	variants: {
		size: {
			normal: 'w-6 h-6',
			large: 'w-7 h-7',
			small: 'w-4 h-4'
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
