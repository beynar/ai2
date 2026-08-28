import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
import { cva } from "/src/lib/utils/cva/index.ts";
const defaultMenuOption = cva({
	base: "rounded cursor-pointer items-center inline-flex relative w-full text-left outline-none",
	variants: {
		size: {
			small: "px-1.5 py-1 text-xs gap-1.5 min-h-6",
			normal: "px-2 py-1.5 text-sm gap-2 min-h-7",
			large: "px-3 py-2 text-base gap-2.5 min-h-9"
		},
		color: {
			primary: "text-primary highlight:bg-primary-muted highlight:text-primary",
			secondary: "text-secondary highlight:bg-secondary-muted highlight:text-secondary",
			foreground: "text-foreground highlight:bg-background-muted highlight:text-foreground",
			background: "text-foreground highlight:bg-background-muted highlight:text-foreground",
			danger: "text-danger highlight:bg-danger-muted highlight:text-danger",
			success: "text-success highlight:bg-success-muted highlight:text-success",
			warning: "text-warning highlight:bg-warning-muted highlight:text-warning",
			info: "text-info highlight:bg-info-muted highlight:text-info"
		},
		disabled: {
			true: "cursor-not-allowed opacity-50 pointer-events-none",
			false: ""
		},
		// Prop-driven highlight for the virtual-focus listbox family (Command/Select/Combobox):
		// a plain utility that doesn't depend on the `highlight:` attribute variant. Menus leave
		// this unset and use the `highlight:` variant (data-highlighted set imperatively by the hook).
		highlighted: {
			true: "bg-background-muted",
			false: ""
		},
		// Persistent highlight in the item's own color — e.g. a submenu trigger while its submenu is
		// open. Unlike `highlighted`, it tracks the `color` variant via the compoundVariants below.
		active: {
			true: "",
			false: ""
		}
	},
	compoundVariants: [
		{
			active: true,
			color: "primary",
			class: "bg-primary-muted text-primary"
		},
		{
			active: true,
			color: "secondary",
			class: "bg-secondary-muted text-secondary"
		},
		{
			active: true,
			color: "foreground",
			class: "bg-background-muted text-foreground"
		},
		{
			active: true,
			color: "background",
			class: "bg-background-muted text-foreground"
		},
		{
			active: true,
			color: "danger",
			class: "bg-danger-muted text-danger"
		},
		{
			active: true,
			color: "success",
			class: "bg-success-muted text-success"
		},
		{
			active: true,
			color: "warning",
			class: "bg-warning-muted text-warning"
		},
		{
			active: true,
			color: "info",
			class: "bg-info-muted text-info"
		}
	],
	defaultVariants: {
		size: "normal",
		color: "primary",
		disabled: false,
		active: false
	}
});
const defaultMenuOptionTitle = cva({
	base: "font-medium  leading-none",
	variants: { size: {
		small: "text-xs",
		normal: "text-sm",
		large: "text-base"
	} },
	defaultVariants: { size: "normal" }
});
const defaultMenuOptionDescription = cva({
	base: "text-foreground/70  leading-none",
	variants: { size: {
		small: "text-[0.625rem]",
		normal: "text-xs",
		large: "text-sm"
	} },
	defaultVariants: { size: "normal" }
});
const defaultMenuOptionPrefix = cva({
	// Size the icon via the svg selector (icons default to height:1lh, which overflows a fixed box)
	// and center it in a square that tracks the row's text size.
	base: "flex shrink-0 items-center justify-center",
	variants: {
		size: {
			small: "size-3.5 [&_svg]:size-3.5",
			normal: "size-4 [&_svg]:size-4",
			large: "size-5 [&_svg]:size-5"
		},
		align: {
			start: "mb-auto",
			center: "my-auto"
		}
	},
	defaultVariants: { size: "normal" }
});
const defaultMenuOptionSuffix = cva({
	// Sizes any trailing icon via the svg selector rather than fixing the container, so the
	// suffix can also hold text (a Command shortcut hint) or a check indicator.
	base: "ml-auto flex shrink-0 items-center",
	variants: { size: {
		small: "[&_svg]:size-3",
		normal: "[&_svg]:size-4",
		large: "[&_svg]:size-5"
	} },
	defaultVariants: { size: "normal" }
});
const defaultMenuOptionContent = cva({
	base: "flex flex-col flex-1",
	variants: { size: {
		small: "gap-0",
		normal: "gap-0.5",
		large: "gap-1"
	} },
	defaultVariants: { size: "normal" }
});
export const menuOptionTheme = {
	root: defaultMenuOption,
	title: defaultMenuOptionTitle,
	description: defaultMenuOptionDescription,
	prefix: defaultMenuOptionPrefix,
	suffix: defaultMenuOptionSuffix,
	content: defaultMenuOptionContent
};
export const setMenuOptionTheme = setComponentTheme("menuOption");
export const useMenuOptionTheme = useComponentTheme("menuOption", menuOptionTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxtQkFBbUIseUJBQXlCO0FBQ3JELFNBQVMsV0FBcUM7QUFFOUMsTUFBTSxvQkFBb0IsSUFBSTtDQUM3QixNQUFNO0NBQ04sVUFBVTtFQUNULE1BQU07R0FDTCxPQUFPO0dBQ1AsUUFBUTtHQUNSLE9BQU87RUFDUjtFQUNBLE9BQU87R0FDTixTQUFTO0dBQ1QsV0FBVztHQUNYLFlBQVk7R0FDWixZQUFZO0dBQ1osUUFBUTtHQUNSLFNBQVM7R0FDVCxTQUFTO0dBQ1QsTUFBTTtFQUNQO0VBQ0EsVUFBVTtHQUNULE1BQU07R0FDTixPQUFPO0VBQ1I7Ozs7RUFJQSxhQUFhO0dBQ1osTUFBTTtHQUNOLE9BQU87RUFDUjs7O0VBR0EsUUFBUTtHQUNQLE1BQU07R0FDTixPQUFPO0VBQ1I7Q0FDRDtDQUNBLGtCQUFrQjtFQUNqQjtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQVcsT0FBTztFQUFnQztFQUN6RTtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQWEsT0FBTztFQUFvQztFQUMvRTtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQWMsT0FBTztFQUFzQztFQUNsRjtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQWMsT0FBTztFQUFzQztFQUNsRjtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQVUsT0FBTztFQUE4QjtFQUN0RTtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQVcsT0FBTztFQUFnQztFQUN6RTtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQVcsT0FBTztFQUFnQztFQUN6RTtHQUFFLFFBQVE7R0FBTSxPQUFPO0dBQVEsT0FBTztFQUEwQjtDQUNqRTtDQUNBLGlCQUFpQjtFQUNoQixNQUFNO0VBQ04sT0FBTztFQUNQLFVBQVU7RUFDVixRQUFRO0NBQ1Q7QUFDRCxDQUFDO0FBRUQsTUFBTSx5QkFBeUIsSUFBSTtDQUNsQyxNQUFNO0NBQ04sVUFBVSxFQUNULE1BQU07RUFDTCxPQUFPO0VBQ1AsUUFBUTtFQUNSLE9BQU87Q0FDUixFQUNEO0NBQ0EsaUJBQWlCLEVBQ2hCLE1BQU0sU0FDUDtBQUNELENBQUM7QUFFRCxNQUFNLCtCQUErQixJQUFJO0NBQ3hDLE1BQU07Q0FDTixVQUFVLEVBQ1QsTUFBTTtFQUNMLE9BQU87RUFDUCxRQUFRO0VBQ1IsT0FBTztDQUNSLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsTUFBTSxTQUNQO0FBQ0QsQ0FBQztBQUVELE1BQU0sMEJBQTBCLElBQUk7OztDQUduQyxNQUFNO0NBQ04sVUFBVTtFQUNULE1BQU07R0FDTCxPQUFPO0dBQ1AsUUFBUTtHQUNSLE9BQU87RUFDUjtFQUNBLE9BQU87R0FDTixPQUFPO0dBQ1AsUUFBUTtFQUNUO0NBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsTUFBTSxTQUNQO0FBQ0QsQ0FBQztBQUVELE1BQU0sMEJBQTBCLElBQUk7OztDQUduQyxNQUFNO0NBQ04sVUFBVSxFQUNULE1BQU07RUFDTCxPQUFPO0VBQ1AsUUFBUTtFQUNSLE9BQU87Q0FDUixFQUNEO0NBQ0EsaUJBQWlCLEVBQ2hCLE1BQU0sU0FDUDtBQUNELENBQUM7QUFFRCxNQUFNLDJCQUEyQixJQUFJO0NBQ3BDLE1BQU07Q0FDTixVQUFVLEVBQ1QsTUFBTTtFQUNMLE9BQU87RUFDUCxRQUFRO0VBQ1IsT0FBTztDQUNSLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsTUFBTSxTQUNQO0FBQ0QsQ0FBQztBQUVELE9BQU8sTUFBTSxrQkFBa0I7Q0FDOUIsTUFBTTtDQUNOLE9BQU87Q0FDUCxhQUFhO0NBQ2IsUUFBUTtDQUNSLFFBQVE7Q0FDUixTQUFTO0FBQ1Y7QUFJQSxPQUFPLE1BQU0scUJBQXFCLGtCQUFtQyxZQUFZO0FBQ2pGLE9BQU8sTUFBTSxxQkFBcUIsa0JBQW1DLGNBQWMsZUFBZSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJtZW51T3B0aW9uLnRoZW1lLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldENvbXBvbmVudFRoZW1lLCB1c2VDb21wb25lbnRUaGVtZSB9IGZyb20gJyRsaWIvdXRpbHMvY3ZhL2luZGV4LmpzJztcbmltcG9ydCB7IGN2YSwgdHlwZSBJbmZlckNvbXBvbmVudFRoZW1lIH0gZnJvbSAnJGxpYi91dGlscy9jdmEvaW5kZXguanMnO1xuXG5jb25zdCBkZWZhdWx0TWVudU9wdGlvbiA9IGN2YSh7XG5cdGJhc2U6ICdyb3VuZGVkIGN1cnNvci1wb2ludGVyIGl0ZW1zLWNlbnRlciBpbmxpbmUtZmxleCByZWxhdGl2ZSB3LWZ1bGwgdGV4dC1sZWZ0IG91dGxpbmUtbm9uZScsXG5cdHZhcmlhbnRzOiB7XG5cdFx0c2l6ZToge1xuXHRcdFx0c21hbGw6ICdweC0xLjUgcHktMSB0ZXh0LXhzIGdhcC0xLjUgbWluLWgtNicsXG5cdFx0XHRub3JtYWw6ICdweC0yIHB5LTEuNSB0ZXh0LXNtIGdhcC0yIG1pbi1oLTcnLFxuXHRcdFx0bGFyZ2U6ICdweC0zIHB5LTIgdGV4dC1iYXNlIGdhcC0yLjUgbWluLWgtOSdcblx0XHR9LFxuXHRcdGNvbG9yOiB7XG5cdFx0XHRwcmltYXJ5OiAndGV4dC1wcmltYXJ5IGhpZ2hsaWdodDpiZy1wcmltYXJ5LW11dGVkIGhpZ2hsaWdodDp0ZXh0LXByaW1hcnknLFxuXHRcdFx0c2Vjb25kYXJ5OiAndGV4dC1zZWNvbmRhcnkgaGlnaGxpZ2h0OmJnLXNlY29uZGFyeS1tdXRlZCBoaWdobGlnaHQ6dGV4dC1zZWNvbmRhcnknLFxuXHRcdFx0Zm9yZWdyb3VuZDogJ3RleHQtZm9yZWdyb3VuZCBoaWdobGlnaHQ6YmctYmFja2dyb3VuZC1tdXRlZCBoaWdobGlnaHQ6dGV4dC1mb3JlZ3JvdW5kJyxcblx0XHRcdGJhY2tncm91bmQ6ICd0ZXh0LWZvcmVncm91bmQgaGlnaGxpZ2h0OmJnLWJhY2tncm91bmQtbXV0ZWQgaGlnaGxpZ2h0OnRleHQtZm9yZWdyb3VuZCcsXG5cdFx0XHRkYW5nZXI6ICd0ZXh0LWRhbmdlciBoaWdobGlnaHQ6YmctZGFuZ2VyLW11dGVkIGhpZ2hsaWdodDp0ZXh0LWRhbmdlcicsXG5cdFx0XHRzdWNjZXNzOiAndGV4dC1zdWNjZXNzIGhpZ2hsaWdodDpiZy1zdWNjZXNzLW11dGVkIGhpZ2hsaWdodDp0ZXh0LXN1Y2Nlc3MnLFxuXHRcdFx0d2FybmluZzogJ3RleHQtd2FybmluZyBoaWdobGlnaHQ6Ymctd2FybmluZy1tdXRlZCBoaWdobGlnaHQ6dGV4dC13YXJuaW5nJyxcblx0XHRcdGluZm86ICd0ZXh0LWluZm8gaGlnaGxpZ2h0OmJnLWluZm8tbXV0ZWQgaGlnaGxpZ2h0OnRleHQtaW5mbydcblx0XHR9LFxuXHRcdGRpc2FibGVkOiB7XG5cdFx0XHR0cnVlOiAnY3Vyc29yLW5vdC1hbGxvd2VkIG9wYWNpdHktNTAgcG9pbnRlci1ldmVudHMtbm9uZScsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdC8vIFByb3AtZHJpdmVuIGhpZ2hsaWdodCBmb3IgdGhlIHZpcnR1YWwtZm9jdXMgbGlzdGJveCBmYW1pbHkgKENvbW1hbmQvU2VsZWN0L0NvbWJvYm94KTpcblx0XHQvLyBhIHBsYWluIHV0aWxpdHkgdGhhdCBkb2Vzbid0IGRlcGVuZCBvbiB0aGUgYGhpZ2hsaWdodDpgIGF0dHJpYnV0ZSB2YXJpYW50LiBNZW51cyBsZWF2ZVxuXHRcdC8vIHRoaXMgdW5zZXQgYW5kIHVzZSB0aGUgYGhpZ2hsaWdodDpgIHZhcmlhbnQgKGRhdGEtaGlnaGxpZ2h0ZWQgc2V0IGltcGVyYXRpdmVseSBieSB0aGUgaG9vaykuXG5cdFx0aGlnaGxpZ2h0ZWQ6IHtcblx0XHRcdHRydWU6ICdiZy1iYWNrZ3JvdW5kLW11dGVkJyxcblx0XHRcdGZhbHNlOiAnJ1xuXHRcdH0sXG5cdFx0Ly8gUGVyc2lzdGVudCBoaWdobGlnaHQgaW4gdGhlIGl0ZW0ncyBvd24gY29sb3Ig4oCUIGUuZy4gYSBzdWJtZW51IHRyaWdnZXIgd2hpbGUgaXRzIHN1Ym1lbnUgaXNcblx0XHQvLyBvcGVuLiBVbmxpa2UgYGhpZ2hsaWdodGVkYCwgaXQgdHJhY2tzIHRoZSBgY29sb3JgIHZhcmlhbnQgdmlhIHRoZSBjb21wb3VuZFZhcmlhbnRzIGJlbG93LlxuXHRcdGFjdGl2ZToge1xuXHRcdFx0dHJ1ZTogJycsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9XG5cdH0sXG5cdGNvbXBvdW5kVmFyaWFudHM6IFtcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdwcmltYXJ5JywgY2xhc3M6ICdiZy1wcmltYXJ5LW11dGVkIHRleHQtcHJpbWFyeScgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdzZWNvbmRhcnknLCBjbGFzczogJ2JnLXNlY29uZGFyeS1tdXRlZCB0ZXh0LXNlY29uZGFyeScgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdmb3JlZ3JvdW5kJywgY2xhc3M6ICdiZy1iYWNrZ3JvdW5kLW11dGVkIHRleHQtZm9yZWdyb3VuZCcgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdiYWNrZ3JvdW5kJywgY2xhc3M6ICdiZy1iYWNrZ3JvdW5kLW11dGVkIHRleHQtZm9yZWdyb3VuZCcgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdkYW5nZXInLCBjbGFzczogJ2JnLWRhbmdlci1tdXRlZCB0ZXh0LWRhbmdlcicgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdzdWNjZXNzJywgY2xhc3M6ICdiZy1zdWNjZXNzLW11dGVkIHRleHQtc3VjY2VzcycgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICd3YXJuaW5nJywgY2xhc3M6ICdiZy13YXJuaW5nLW11dGVkIHRleHQtd2FybmluZycgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgY29sb3I6ICdpbmZvJywgY2xhc3M6ICdiZy1pbmZvLW11dGVkIHRleHQtaW5mbycgfVxuXHRdLFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRzaXplOiAnbm9ybWFsJyxcblx0XHRjb2xvcjogJ3ByaW1hcnknLFxuXHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRhY3RpdmU6IGZhbHNlXG5cdH1cbn0pO1xuXG5jb25zdCBkZWZhdWx0TWVudU9wdGlvblRpdGxlID0gY3ZhKHtcblx0YmFzZTogJ2ZvbnQtbWVkaXVtICBsZWFkaW5nLW5vbmUnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdHNtYWxsOiAndGV4dC14cycsXG5cdFx0XHRub3JtYWw6ICd0ZXh0LXNtJyxcblx0XHRcdGxhcmdlOiAndGV4dC1iYXNlJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0c2l6ZTogJ25vcm1hbCdcblx0fVxufSk7XG5cbmNvbnN0IGRlZmF1bHRNZW51T3B0aW9uRGVzY3JpcHRpb24gPSBjdmEoe1xuXHRiYXNlOiAndGV4dC1mb3JlZ3JvdW5kLzcwICBsZWFkaW5nLW5vbmUnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdHNtYWxsOiAndGV4dC1bMC42MjVyZW1dJyxcblx0XHRcdG5vcm1hbDogJ3RleHQteHMnLFxuXHRcdFx0bGFyZ2U6ICd0ZXh0LXNtJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0c2l6ZTogJ25vcm1hbCdcblx0fVxufSk7XG5cbmNvbnN0IGRlZmF1bHRNZW51T3B0aW9uUHJlZml4ID0gY3ZhKHtcblx0Ly8gU2l6ZSB0aGUgaWNvbiB2aWEgdGhlIHN2ZyBzZWxlY3RvciAoaWNvbnMgZGVmYXVsdCB0byBoZWlnaHQ6MWxoLCB3aGljaCBvdmVyZmxvd3MgYSBmaXhlZCBib3gpXG5cdC8vIGFuZCBjZW50ZXIgaXQgaW4gYSBzcXVhcmUgdGhhdCB0cmFja3MgdGhlIHJvdydzIHRleHQgc2l6ZS5cblx0YmFzZTogJ2ZsZXggc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyJyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ3NpemUtMy41IFsmX3N2Z106c2l6ZS0zLjUnLFxuXHRcdFx0bm9ybWFsOiAnc2l6ZS00IFsmX3N2Z106c2l6ZS00Jyxcblx0XHRcdGxhcmdlOiAnc2l6ZS01IFsmX3N2Z106c2l6ZS01J1xuXHRcdH0sXG5cdFx0YWxpZ246IHtcblx0XHRcdHN0YXJ0OiAnbWItYXV0bycsXG5cdFx0XHRjZW50ZXI6ICdteS1hdXRvJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0c2l6ZTogJ25vcm1hbCdcblx0fVxufSk7XG5cbmNvbnN0IGRlZmF1bHRNZW51T3B0aW9uU3VmZml4ID0gY3ZhKHtcblx0Ly8gU2l6ZXMgYW55IHRyYWlsaW5nIGljb24gdmlhIHRoZSBzdmcgc2VsZWN0b3IgcmF0aGVyIHRoYW4gZml4aW5nIHRoZSBjb250YWluZXIsIHNvIHRoZVxuXHQvLyBzdWZmaXggY2FuIGFsc28gaG9sZCB0ZXh0IChhIENvbW1hbmQgc2hvcnRjdXQgaGludCkgb3IgYSBjaGVjayBpbmRpY2F0b3IuXG5cdGJhc2U6ICdtbC1hdXRvIGZsZXggc2hyaW5rLTAgaXRlbXMtY2VudGVyJyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ1smX3N2Z106c2l6ZS0zJyxcblx0XHRcdG5vcm1hbDogJ1smX3N2Z106c2l6ZS00Jyxcblx0XHRcdGxhcmdlOiAnWyZfc3ZnXTpzaXplLTUnXG5cdFx0fVxuXHR9LFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRzaXplOiAnbm9ybWFsJ1xuXHR9XG59KTtcblxuY29uc3QgZGVmYXVsdE1lbnVPcHRpb25Db250ZW50ID0gY3ZhKHtcblx0YmFzZTogJ2ZsZXggZmxleC1jb2wgZmxleC0xJyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ2dhcC0wJyxcblx0XHRcdG5vcm1hbDogJ2dhcC0wLjUnLFxuXHRcdFx0bGFyZ2U6ICdnYXAtMSdcblx0XHR9XG5cdH0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdHNpemU6ICdub3JtYWwnXG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbWVudU9wdGlvblRoZW1lID0ge1xuXHRyb290OiBkZWZhdWx0TWVudU9wdGlvbixcblx0dGl0bGU6IGRlZmF1bHRNZW51T3B0aW9uVGl0bGUsXG5cdGRlc2NyaXB0aW9uOiBkZWZhdWx0TWVudU9wdGlvbkRlc2NyaXB0aW9uLFxuXHRwcmVmaXg6IGRlZmF1bHRNZW51T3B0aW9uUHJlZml4LFxuXHRzdWZmaXg6IGRlZmF1bHRNZW51T3B0aW9uU3VmZml4LFxuXHRjb250ZW50OiBkZWZhdWx0TWVudU9wdGlvbkNvbnRlbnRcbn07XG5cbmV4cG9ydCB0eXBlIE1lbnVPcHRpb25UaGVtZSA9IHR5cGVvZiBtZW51T3B0aW9uVGhlbWU7XG5leHBvcnQgdHlwZSBNZW51T3B0aW9uVGhlbWVQcm9wcyA9IEluZmVyQ29tcG9uZW50VGhlbWU8TWVudU9wdGlvblRoZW1lPjtcbmV4cG9ydCBjb25zdCBzZXRNZW51T3B0aW9uVGhlbWUgPSBzZXRDb21wb25lbnRUaGVtZTxNZW51T3B0aW9uVGhlbWU+KCdtZW51T3B0aW9uJyk7XG5leHBvcnQgY29uc3QgdXNlTWVudU9wdGlvblRoZW1lID0gdXNlQ29tcG9uZW50VGhlbWU8TWVudU9wdGlvblRoZW1lPignbWVudU9wdGlvbicsIG1lbnVPcHRpb25UaGVtZSk7XG4iXX0=