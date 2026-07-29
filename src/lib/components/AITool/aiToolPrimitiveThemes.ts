import type { AccordionThemeProps } from '../Accordion/accordion.theme.js';
import type { ScrollAreaThemeProps } from '../ScrollArea/scrollArea.theme.js';
import type { AIToolToggleIcon } from './aiTool.props.js';
import type { AIToolVariant } from './aiTool.props.js';
import type { AIToolTheme } from './aiTool.theme.js';
import type { AIToolStatusTone } from './toolRendering.js';

export type AIToolAccordionScope = 'single' | 'group' | 'calls';
export type AIToolValueTone = 'default' | 'error';

export function createAIToolAccordionTheme(
	classes: AIToolTheme,
	{
		scope,
		variant,
		tone,
		toggleIcon
	}: {
		scope: AIToolAccordionScope;
		variant?: AIToolVariant;
		tone?: AIToolStatusTone;
		toggleIcon?: AIToolToggleIcon;
	}
): AccordionThemeProps {
	return {
		root: { base: classes.accordionRoot({ scope }) },
		item: { base: classes.accordionItem({ scope, variant }) },
		header: { base: classes.accordionHeader() },
		trigger: { base: classes.accordionTrigger({ scope, variant, tone, toggleIcon }) },
		title: { base: classes.accordionTitle() },
		icon: { base: classes.accordionIcon() },
		iconWrapper: { base: classes.accordionIconWrapper() },
		content: { base: classes.accordionContent({ scope, variant }) }
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
