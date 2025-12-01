import type { HandleServerError } from '@sveltejs/kit';
import { mcpHandler, resource, tool, prompt } from 'svelte-mcp/mcp';

import * as z from 'zod/v4';
import { accordionDescription } from '$lib/components/Accordion/accordion.mcp.js';
import { alertDescription } from '$lib/components/Alert/alert.mcp.js';
import { aspectRatioDescription } from '$lib/components/AspectRatio/aspectRatio.mcp.js';
import { avatarDescription } from '$lib/components/Avatar/avatar.mcp.js';
import { badgeDescription } from '$lib/components/Badge/badge.mcp.js';
import { buttonDescription } from '$lib/components/Button/button.mcp.js';
import { buttonGroupDescription } from '$lib/components/ButtonGroup/buttonGroup.mcp.js';
import { chipDescription } from '$lib/components/Chip/chip.mcp.js';
import { codeDescription } from '$lib/components/Code/code.mcp.js';
import { dialogDescription } from '$lib/components/Dialog/dialog.mcp.js';
import { calendarDescription } from '$lib/components/Form/Calendar/calendar.mcp.js';
import { dateInputDescription } from '$lib/components/Form/DateInput/dateInput.mcp.js';
import { fileInputDescription } from '$lib/components/Form/File/fileInput.mcp.js';
import { formDescription } from '$lib/components/Form/Form/form.mcp.js';
import { multiStepFormDescription } from '$lib/components/Form/MultiStepForm/multiStepForm.mcp.js';
import { numberInputDescription } from '$lib/components/Form/NumberInput/numberInput.mcp.js';
import { passwordInputDescription } from '$lib/components/Form/PasswordInput/passwordInput.mcp.js';
import { phoneInputDescription } from '$lib/components/Form/PhoneInput/phoneInput.mcp.js';
import { radioInputDescription } from '$lib/components/Form/RadioInput/radioInput.mcp.js';
import { selectDescription } from '$lib/components/Form/Select/select.mcp.js';
import { switchDescription } from '$lib/components/Form/Switch/switch.mcp.js';
import { textAreaDescription } from '$lib/components/Form/TextArea/textArea.mcp.js';
import { textInputDescription } from '$lib/components/Form/TextInput/textInput.mcp.js';
import { comboboxDescription } from '$lib/components/Form/Combobox/combobox.mcp.js';
import { headingDescription } from '$lib/components/Heading/heading.mcp.js';
import { meterDescription } from '$lib/components/Meter/meter.mcp.js';
import { popoverDescription } from '$lib/components/Popover/popover.mcp.js';
import { scrollAreaDescription } from '$lib/components/ScrollArea/scrollArea.mcp.js';
import { slotDescription } from '$lib/components/Slot/slot.mcp.js';
import { stepperDescription } from '$lib/components/Stepper/stepper.mcp.js';
import { themeDescription } from '$lib/components/Theme/theme.mcp.js';
import { toggleButtonDescription } from '$lib/components/ToggleButton/toggleButton.mcp.js';
import { toggleButtonGroupDescription } from '$lib/components/ToggleButtonGroup/toggleButtonGroup.mcp.js';
import { tooltipDescription } from '$lib/components/Tooltip/tooltip.mcp.js';
import { sequence } from '@sveltejs/kit/hooks';
import { checkboxesInputDescription } from '$lib/components/Form/CheckboxesInput/checkboxesInput.mcp.js';
import { iconsDescription } from '$lib/components/Icons/icons.mcp.js';
import { confirmationDescription } from '$lib/components/Confirmation/confirmation.mcp.js';
import { toastDescription } from '$lib/components/Toast/toast.mcp.js';
import { carouselDescription } from '$lib/components/Carousel/carousel.mcp.js';
import { menuDescription } from '$lib/components/Menu/menu.mcp.js';
import { popupMenuDescription } from '$lib/components/PopupMenu/popupMenu.mcp.js';
import { menuOptionDescription } from '$lib/components/MenuOption/menuOption.mcp.js';
import { separatorDescription } from '$lib/components/Separator/separator.mcp.js';
import { breadcrumbsDescription } from '$lib/components/Breadcrumbs/breadcrumbs.mcp.js';
import { cardDescription } from '$lib/components/Card/card.mcp.js';
import { tableDescription } from '$lib/components/Table/table.mcp.js';
import { marqueeDescription } from '$lib/components/Marquee/marquee.mcp.js';
import { skeletonDescription } from '$lib/components/Skeleton/skeleton.mcp.js';
import { tabsDescription } from '$lib/components/Tabs/tabs.mcp.js';
import { tabbarDescription } from '$lib/components/Tabbar/tabbar.mcp.js';
import { networkIndicatorDescription } from '$lib/components/NetworkIndicator/networkIndicator.mcp.js';
import { timeInputDescription } from '$lib/components/Form/TimeInput/timeInput.mcp.js';
// import { fieldDescription } from '$lib/components/Form/Field/field.mcp.js';
import { collapsibleDescription } from '$lib/components/Collapsible/collapsible.mcp.js';

const components = {
	accordion: accordionDescription,
	alert: alertDescription,
	'aspect-ratio': aspectRatioDescription,
	avatar: avatarDescription,
	badge: badgeDescription,
	button: buttonDescription,
	'button-group': buttonGroupDescription,
	chip: chipDescription,
	code: codeDescription,
	dialog: dialogDescription,
	calendar: calendarDescription,
	'date-input': dateInputDescription,
	'file-input': fileInputDescription,
	form: formDescription,
	'multi-step-form': multiStepFormDescription,
	'number-input': numberInputDescription,
	'password-input': passwordInputDescription,
	'phone-input': phoneInputDescription,
	'radio-input': radioInputDescription,
	'checkboxes-input': checkboxesInputDescription,
	select: selectDescription,
	switch: switchDescription,
	'text-area': textAreaDescription,
	'text-input': textInputDescription,
	combobox: comboboxDescription,
	heading: headingDescription,
	meter: meterDescription,
	popover: popoverDescription,
	'scroll-area': scrollAreaDescription,
	slot: slotDescription,
	stepper: stepperDescription,
	theme: themeDescription,
	'toggle-button': toggleButtonDescription,
	'toggle-button-group': toggleButtonGroupDescription,
	tooltip: tooltipDescription,
	confirmation: confirmationDescription,
	toast: toastDescription,
	icons: iconsDescription,
	carousel: carouselDescription,
	menu: menuDescription,
	'popup-menu': popupMenuDescription,
	'menu-option': menuOptionDescription,
	separator: separatorDescription,
	breadcrumbs: breadcrumbsDescription,
	card: cardDescription,
	table: tableDescription,
	marquee: marqueeDescription,
	skeleton: skeletonDescription,
	tabs: tabsDescription,
	tabbar: tabbarDescription,
	'network-indicator': networkIndicatorDescription,
	'time-input': timeInputDescription,
	// field: fieldDescription,
	collapsible: collapsibleDescription
};

const handler = mcpHandler({
	tools: {
		components: tool(`
			svelai  is a component library for sveltekit. It provides a set of components that can be used to build web applications with a focus on configuration over markup.
			Use this tool to get the documentation for a specific component.
			You will have to know that most of the components should be imported like this: 
			import { ComponentName } from 'svelai/component-name' 
			(using kebab-case for the package name, e.g., svelai/dialog and using PascalCase for the component name, e.g., Dialog)
			
			When available in props 
			- most of the components are using the following color props : primary, secondary, success, warning, danger, info, surface, contrast.
			- most of the components are using the following size props : small, medium, large.
			- most of the components are using the following variant props : solid, outline, soft, ghost, link.
			- most of the component can receive prefix and suffix props to add icons or other content with a svelte 5 snippet.
			- for composability, most component allow passing custom snippets to replace the default rendering if necessary.

			The theme is declared globally so you should'nt have to style the components manually.
			If you have to use the theme props of the component to add classname manually on the part of the component you want to style.
			`)
			.input(
				z.object({
					componentName: z.enum(Object.keys(components) as [string, ...string[]])
				})
			)
			.output(z.object({ documentation: z.string() }))

			.handle(async ({ input }) => {
				const component = components[input.componentName as keyof typeof components];
				return { documentation: component };
			})
	},
	name: 'svelai-mcp',
	version: '1.0.0'
});

export const handle = sequence(async ({ event, resolve }) => {
	return resolve(event);
}, handler.handle);

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	if (status !== 404) {
		console.log(error);
	} else {
		console.log('error', status);
	}

	return {
		message: 'Whoops!'
	};
};
