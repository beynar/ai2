import type { AccordionThemeProps } from '../Accordion/accordion.theme.js';
import type { ScrollAreaThemeProps } from '../ScrollArea/scrollArea.theme.js';
import type { AIToolTheme } from './aiTool.theme.js';

export type AIToolAccordionScope = 'single' | 'group' | 'calls';
export type AIToolValueTone = 'default' | 'error';

export function createAIToolAccordionTheme(
	classes: AIToolTheme,
	scope: AIToolAccordionScope
): AccordionThemeProps {
	return {
		root: { base: classes.accordionRoot({ scope }) },
		item: { base: classes.accordionItem({ scope }) },
		header: { base: classes.accordionHeader() },
		trigger: { base: classes.accordionTrigger({ scope }) },
		title: { base: classes.accordionTitle() },
		icon: { base: classes.accordionIcon() },
		content: { base: classes.accordionContent({ scope }) }
	};
}

export function createAIToolScrollAreaTheme(
	classes: AIToolTheme,
	tone: AIToolValueTone
): ScrollAreaThemeProps {
	return {
		root: { base: classes.scrollArea({ tone }) },
		viewport: { base: classes.scrollViewport() },
		content: { base: classes.scrollContent() },
		scrollbar: { base: classes.scrollScrollbar() },
		scrollbarX: { base: classes.scrollScrollbarX() },
		scrollbarThumb: { base: classes.scrollThumb({ tone }) }
	};
}
