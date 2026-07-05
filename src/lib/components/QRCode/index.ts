export { default as QRCode } from './QRCode.svelte';
export type {
	QRCodeProps,
	ErrorCorrectionLevel,
	BackgroundSettings,
	GradientSettings,
	GradientSettingsStop,
	GradientSettingsType,
	DataModulesSettings,
	DataModulesStyle,
	FinderPatternOuterSettings,
	FinderPatternOuterStyle,
	FinderPatternInnerSettings,
	FinderPatternInnerStyle,
	ImageSettings,
	DownloadOptions,
	DownloadFileFormat
} from './qrCode.props.js';
export {
	qrCodeTheme,
	setQRCodeTheme,
	useQRCodeTheme,
	type QRCodeTheme,
	type QRCodeThemeProps
} from './qrCode.theme.js';
