export { default as FloatingWindow } from './FloatingWindow.svelte';
export type {
	FloatingWindowDimensionTuple,
	FloatingWindowDimensions,
	FloatingWindowDockPlacement,
	FloatingWindowDragFrom,
	FloatingWindowPayload,
	FloatingWindowPosition,
	FloatingWindowProps,
	FloatingWindowResizeDirection
} from './floatingWindow.props.js';
export {
	floatingWindowTheme,
	setFloatingWindowTheme,
	useFloatingWindowTheme,
	type FloatingWindowTheme,
	type FloatingWindowThemeProps
} from './floatingWindow.theme.js';
export { floatingWindowDescription } from './floatingWindow.mcp.js';
