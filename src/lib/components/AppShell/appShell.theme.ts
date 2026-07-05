import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultRoot = cva({
	base: 'min-h-svh w-full bg-background text-foreground'
});

const defaultSidebar = cva({
	base: 'min-h-svh'
});

export const appShellTheme = {
	root: defaultRoot,
	sidebar: defaultSidebar
};

export type AppShellTheme = typeof appShellTheme;
export type AppShellThemeProps = InferComponentTheme<AppShellTheme>;
export const setAppShellTheme = setComponentTheme<AppShellTheme>('app-shell');
export const useAppShellTheme = useComponentTheme<AppShellTheme>('app-shell', appShellTheme);
