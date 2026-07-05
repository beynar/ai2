import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultQRCode = cva({
	base: 'block aspect-square',
	variants: {
		size: {
			small: 'size-24',
			normal: 'size-32',
			large: 'size-48'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info',
			foreground: 'text-foreground',
			background: 'text-background'
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'foreground'
	}
});

export const qrCodeTheme = {
	root: defaultQRCode
};

export type QRCodeTheme = typeof qrCodeTheme;
export type QRCodeThemeProps = InferComponentTheme<QRCodeTheme>;
export const setQRCodeTheme = setComponentTheme<QRCodeTheme>('qrCode');
export const useQRCodeTheme = useComponentTheme<QRCodeTheme>('qrCode', qrCodeTheme);
