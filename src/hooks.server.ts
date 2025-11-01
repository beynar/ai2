import type { HandleServerError } from '@sveltejs/kit';
import { mcpHandler, resource, tool, prompt } from 'svelte-mcp/mcp';
import * as valibot from 'valibot';
import * as z from 'zod/v4';
import { accordionDescription } from '$lib/components/Accordion/accordion.mcp.js';
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

const components = {
	Accordion: accordionDescription,
	Avatar: avatarDescription,
	Badge: badgeDescription,
	Button: buttonDescription,
	ButtonGroup: buttonGroupDescription,
	Chip: chipDescription,
	Code: codeDescription,
	Dialog: dialogDescription,
	Calendar: calendarDescription,
	DateInput: dateInputDescription,
	FileInput: fileInputDescription,
	Form: formDescription,
	MultiStepForm: multiStepFormDescription,
	NumberInput: numberInputDescription,
	PasswordInput: passwordInputDescription,
	PhoneInput: phoneInputDescription,
	RadioInput: radioInputDescription,
	CheckBoxesInput: checkboxesInputDescription,
	Select: selectDescription,
	Switch: switchDescription,
	TextArea: textAreaDescription,
	TextInput: textInputDescription,
	Combobox: comboboxDescription,
	Heading: headingDescription,
	Meter: meterDescription,
	Popover: popoverDescription,
	ScrollArea: scrollAreaDescription,
	Slot: slotDescription,
	Stepper: stepperDescription,
	Theme: themeDescription,
	ToggleButton: toggleButtonDescription,
	ToggleButtonGroup: toggleButtonGroupDescription,
	Tooltip: tooltipDescription,
	Confirmation: confirmationDescription,
	Toast: toastDescription,
	icons: iconsDescription
};

const handler = mcpHandler({
	tools: {
		components: tool(`
			svelai  is a component library for sveltekit. It provides a set of components that can be used to build web applications with a focus on configuration over markup.
			Use this tool to get the documentation for a specific component.
			You will have to know that most of the components should be imported like this svelai/[ComponentName]
			When avaiable in props 
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
