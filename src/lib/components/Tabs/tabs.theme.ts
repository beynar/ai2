import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultTabs = cva({
	base: 'flex w-full',
	variants: {
		placement: {
			top: 'flex-col',
			bottom: 'flex-col-reverse',
			left: 'flex-row',
			right: 'flex-row-reverse'
		}
	},
	defaultVariants: {
		placement: 'top'
	}
});

const defaultTabsContent = cva({
	base: 'w-full  flex-full',
	variants: {
		placement: {
			top: 'w-full',
			bottom: 'w-full',
			left: 'h-full',
			right: 'h-full'
		}
	},
	defaultVariants: {
		placement: 'top'
	}
});

export const tabsTheme = {
	tabs: defaultTabs,
	content: defaultTabsContent
};

export type TabsTheme = typeof tabsTheme;
export type TabsThemeProps = InferComponentTheme<TabsTheme>;
export const setTabsTheme = setComponentTheme<TabsTheme>('tabs');
export const useTabsTheme = useComponentTheme('tabs', tabsTheme);
