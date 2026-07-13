import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
import { cva } from "/src/lib/utils/cva/index.ts";
export const defaultDialog = cva({
	base: "fixed inset-0",
	variants: { scroll: {
		inner: "overflow-hidden",
		outer: "overflow-y-auto"
	} },
	defaultVariants: { scroll: "inner" }
});
export const defaultDialogAlign = cva({
	base: "flex p-6",
	variants: {
		type: {
			fullScreen: "justify-center items-center",
			drawerRight: "justify-end",
			drawerLeft: "justify-start",
			drawerBottom: "justify-center items-end",
			drawerTop: "justify-center items-start",
			modal: "justify-center items-center",
			alert: "justify-center items-center"
		},
		// `inner` needs a definite height so the card's `max-h-full` actually caps;
		// `outer` grows past the viewport so the positioner scrolls.
		scroll: {
			inner: "h-full",
			outer: "min-h-full"
		}
	},
	defaultVariants: { scroll: "inner" }
});
export const defaultDialogBackdrop = cva({ base: "fixed inset-0 bg-background/40 backdrop-blur-xs" });
export const defaultDialogContent = cva({
	base: "z-10 relative px-4 py-2 raised-xl h-fit bg-background rounded flex flex-col z-50 will-change-transform transition-transform duration-200 ease-out",
	variants: {
		size: {
			small: "max-w-md w-full",
			normal: "max-w-xl w-full",
			large: "max-w-3xl w-full"
		},
		type: {
			fullScreen: "h-full w-full max-w-full origin-center",
			drawerRight: "rounded-l-none h-full origin-right",
			drawerLeft: "rounded-r-none h-full origin-left",
			drawerBottom: "rounded-b-none max-w-full origin-bottom",
			drawerTop: "rounded-t-none max-w-full origin-top",
			modal: "origin-center",
			alert: "origin-center"
		},
		// `inner`: the card itself is the scroll container (capped by `max-h-full`).
		// `outer`: the card grows freely and the positioner scrolls — so it must NOT
		// be a scroll container, or `overscroll-none` traps the wheel over the card.
		scroll: {
			inner: "max-h-full overflow-auto overscroll-none",
			outer: ""
		}
	},
	defaultVariants: { scroll: "inner" }
});
// Drag thumb for swipe-dismissable drawers: in-flow bar on the inner edge for
// vertical drawers, edge-anchored vertical bar for horizontal ones.
export const defaultDialogThumb = cva({
	// Absolute so the bar overlays the panel edge instead of taking flow space (the header
	// sits flush at the top). The ::before oversizes the hitbox around the 6px bar (~38px
	// touch target); pointer events on it target the thumb, so drags there count as handle drags.
	base: "absolute z-10 touch-none rounded-full bg-background-muted before:absolute before:-inset-4 before:content-['']",
	variants: { type: {
		fullScreen: "hidden",
		drawerRight: "left-1.5 top-1/2 -translate-y-1/2 h-12 w-1.5",
		drawerLeft: "right-1.5 top-1/2 -translate-y-1/2 h-12 w-1.5",
		drawerBottom: "left-1/2 -translate-x-1/2 top-1.5 h-1.5 w-12",
		drawerTop: "left-1/2 -translate-x-1/2 bottom-1.5 h-1.5 w-12",
		modal: "hidden",
		alert: "hidden"
	} }
});
export const defaultDialogHeader = cva({
	base: "grid gap-1 mb-2 border-b border-background-muted py-2",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} }
});
export const defaultDialogFooter = cva({
	base: "",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} }
});
export const defaultDialogCloseButton = cva({
	base: "ml-auto rounded-full absolute top-1 right-1 p-1",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} }
});
export const defaultDialogTitle = cva({
	base: "text-lg font-semibold text-foreground",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} }
});
export const defaultDialogDescription = cva({
	base: "text-sm text-foreground-muted",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} }
});
export const dialogTheme = {
	root: defaultDialog,
	align: defaultDialogAlign,
	backdrop: defaultDialogBackdrop,
	content: defaultDialogContent,
	thumb: defaultDialogThumb,
	header: defaultDialogHeader,
	footer: defaultDialogFooter,
	closeButton: defaultDialogCloseButton,
	title: defaultDialogTitle,
	description: defaultDialogDescription
};
export const setDialogTheme = setComponentTheme("dialog");
export const useDialogTheme = useComponentTheme("dialog", dialogTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxtQkFBbUIseUJBQXlCO0FBQ3JELFNBQVMsV0FBcUM7QUFFOUMsT0FBTyxNQUFNLGdCQUFnQixJQUFJO0NBQ2hDLE1BQU07Q0FDTixVQUFVLEVBQ1QsUUFBUTtFQUNQLE9BQU87RUFDUCxPQUFPO0NBQ1IsRUFDRDtDQUNBLGlCQUFpQixFQUNoQixRQUFRLFFBQ1Q7QUFDRCxDQUFDO0FBRUQsT0FBTyxNQUFNLHFCQUFxQixJQUFJO0NBQ3JDLE1BQU07Q0FDTixVQUFVO0VBQ1QsTUFBTTtHQUNMLFlBQVk7R0FDWixhQUFhO0dBQ2IsWUFBWTtHQUNaLGNBQWM7R0FDZCxXQUFXO0dBQ1gsT0FBTztHQUNQLE9BQU87RUFDUjs7O0VBR0EsUUFBUTtHQUNQLE9BQU87R0FDUCxPQUFPO0VBQ1I7Q0FDRDtDQUNBLGlCQUFpQixFQUNoQixRQUFRLFFBQ1Q7QUFDRCxDQUFDO0FBRUQsT0FBTyxNQUFNLHdCQUF3QixJQUFJLEVBQ3hDLE1BQU0sa0RBQ1AsQ0FBQztBQUVELE9BQU8sTUFBTSx1QkFBdUIsSUFBSTtDQUN2QyxNQUFNO0NBQ04sVUFBVTtFQUNULE1BQU07R0FDTCxPQUFPO0dBQ1AsUUFBUTtHQUNSLE9BQU87RUFDUjtFQUNBLE1BQU07R0FDTCxZQUFZO0dBQ1osYUFBYTtHQUNiLFlBQVk7R0FDWixjQUFjO0dBQ2QsV0FBVztHQUNYLE9BQU87R0FDUCxPQUFPO0VBQ1I7Ozs7RUFJQSxRQUFRO0dBQ1AsT0FBTztHQUNQLE9BQU87RUFDUjtDQUNEO0NBQ0EsaUJBQWlCLEVBQ2hCLFFBQVEsUUFDVDtBQUNELENBQUM7OztBQUlELE9BQU8sTUFBTSxxQkFBcUIsSUFBSTs7OztDQUlyQyxNQUFNO0NBQ04sVUFBVSxFQUNULE1BQU07RUFDTCxZQUFZO0VBQ1osYUFBYTtFQUNiLFlBQVk7RUFDWixjQUFjO0VBQ2QsV0FBVztFQUNYLE9BQU87RUFDUCxPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sc0JBQXNCLElBQUk7Q0FDdEMsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sc0JBQXNCLElBQUk7Q0FDdEMsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sMkJBQTJCLElBQUk7Q0FDM0MsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0scUJBQXFCLElBQUk7Q0FDckMsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sMkJBQTJCLElBQUk7Q0FDM0MsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsT0FBTztFQUNQLFFBQVE7RUFDUixPQUFPO0NBQ1IsRUFDRDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sY0FBYztDQUMxQixNQUFNO0NBQ04sT0FBTztDQUNQLFVBQVU7Q0FDVixTQUFTO0NBQ1QsT0FBTztDQUNQLFFBQVE7Q0FDUixRQUFRO0NBQ1IsYUFBYTtDQUNiLE9BQU87Q0FDUCxhQUFhO0FBQ2Q7QUFJQSxPQUFPLE1BQU0saUJBQWlCLGtCQUErQixRQUFRO0FBQ3JFLE9BQU8sTUFBTSxpQkFBaUIsa0JBQStCLFVBQVUsV0FBVyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJkaWFsb2cudGhlbWUudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0Q29tcG9uZW50VGhlbWUsIHVzZUNvbXBvbmVudFRoZW1lIH0gZnJvbSAnJGxpYi91dGlscy9jdmEvaW5kZXguanMnO1xuaW1wb3J0IHsgY3ZhLCB0eXBlIEluZmVyQ29tcG9uZW50VGhlbWUgfSBmcm9tICckbGliL3V0aWxzL2N2YS9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nID0gY3ZhKHtcblx0YmFzZTogJ2ZpeGVkIGluc2V0LTAnLFxuXHR2YXJpYW50czoge1xuXHRcdHNjcm9sbDoge1xuXHRcdFx0aW5uZXI6ICdvdmVyZmxvdy1oaWRkZW4nLFxuXHRcdFx0b3V0ZXI6ICdvdmVyZmxvdy15LWF1dG8nXG5cdFx0fVxuXHR9LFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRzY3JvbGw6ICdpbm5lcidcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nQWxpZ24gPSBjdmEoe1xuXHRiYXNlOiAnZmxleCBwLTYnLFxuXHR2YXJpYW50czoge1xuXHRcdHR5cGU6IHtcblx0XHRcdGZ1bGxTY3JlZW46ICdqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInLFxuXHRcdFx0ZHJhd2VyUmlnaHQ6ICdqdXN0aWZ5LWVuZCcsXG5cdFx0XHRkcmF3ZXJMZWZ0OiAnanVzdGlmeS1zdGFydCcsXG5cdFx0XHRkcmF3ZXJCb3R0b206ICdqdXN0aWZ5LWNlbnRlciBpdGVtcy1lbmQnLFxuXHRcdFx0ZHJhd2VyVG9wOiAnanVzdGlmeS1jZW50ZXIgaXRlbXMtc3RhcnQnLFxuXHRcdFx0bW9kYWw6ICdqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInLFxuXHRcdFx0YWxlcnQ6ICdqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInXG5cdFx0fSxcblx0XHQvLyBgaW5uZXJgIG5lZWRzIGEgZGVmaW5pdGUgaGVpZ2h0IHNvIHRoZSBjYXJkJ3MgYG1heC1oLWZ1bGxgIGFjdHVhbGx5IGNhcHM7XG5cdFx0Ly8gYG91dGVyYCBncm93cyBwYXN0IHRoZSB2aWV3cG9ydCBzbyB0aGUgcG9zaXRpb25lciBzY3JvbGxzLlxuXHRcdHNjcm9sbDoge1xuXHRcdFx0aW5uZXI6ICdoLWZ1bGwnLFxuXHRcdFx0b3V0ZXI6ICdtaW4taC1mdWxsJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0c2Nyb2xsOiAnaW5uZXInXG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdERpYWxvZ0JhY2tkcm9wID0gY3ZhKHtcblx0YmFzZTogJ2ZpeGVkIGluc2V0LTAgYmctYmFja2dyb3VuZC80MCBiYWNrZHJvcC1ibHVyLXhzJ1xufSk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nQ29udGVudCA9IGN2YSh7XG5cdGJhc2U6ICd6LTEwIHJlbGF0aXZlIHB4LTQgcHktMiByYWlzZWQteGwgaC1maXQgYmctYmFja2dyb3VuZCByb3VuZGVkIGZsZXggZmxleC1jb2wgei01MCB3aWxsLWNoYW5nZS10cmFuc2Zvcm0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwIGVhc2Utb3V0Jyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ21heC13LW1kIHctZnVsbCcsXG5cdFx0XHRub3JtYWw6ICdtYXgtdy14bCB3LWZ1bGwnLFxuXHRcdFx0bGFyZ2U6ICdtYXgtdy0zeGwgdy1mdWxsJ1xuXHRcdH0sXG5cdFx0dHlwZToge1xuXHRcdFx0ZnVsbFNjcmVlbjogJ2gtZnVsbCB3LWZ1bGwgbWF4LXctZnVsbCBvcmlnaW4tY2VudGVyJyxcblx0XHRcdGRyYXdlclJpZ2h0OiAncm91bmRlZC1sLW5vbmUgaC1mdWxsIG9yaWdpbi1yaWdodCcsXG5cdFx0XHRkcmF3ZXJMZWZ0OiAncm91bmRlZC1yLW5vbmUgaC1mdWxsIG9yaWdpbi1sZWZ0Jyxcblx0XHRcdGRyYXdlckJvdHRvbTogJ3JvdW5kZWQtYi1ub25lIG1heC13LWZ1bGwgb3JpZ2luLWJvdHRvbScsXG5cdFx0XHRkcmF3ZXJUb3A6ICdyb3VuZGVkLXQtbm9uZSBtYXgtdy1mdWxsIG9yaWdpbi10b3AnLFxuXHRcdFx0bW9kYWw6ICdvcmlnaW4tY2VudGVyJyxcblx0XHRcdGFsZXJ0OiAnb3JpZ2luLWNlbnRlcidcblx0XHR9LFxuXHRcdC8vIGBpbm5lcmA6IHRoZSBjYXJkIGl0c2VsZiBpcyB0aGUgc2Nyb2xsIGNvbnRhaW5lciAoY2FwcGVkIGJ5IGBtYXgtaC1mdWxsYCkuXG5cdFx0Ly8gYG91dGVyYDogdGhlIGNhcmQgZ3Jvd3MgZnJlZWx5IGFuZCB0aGUgcG9zaXRpb25lciBzY3JvbGxzIOKAlCBzbyBpdCBtdXN0IE5PVFxuXHRcdC8vIGJlIGEgc2Nyb2xsIGNvbnRhaW5lciwgb3IgYG92ZXJzY3JvbGwtbm9uZWAgdHJhcHMgdGhlIHdoZWVsIG92ZXIgdGhlIGNhcmQuXG5cdFx0c2Nyb2xsOiB7XG5cdFx0XHRpbm5lcjogJ21heC1oLWZ1bGwgb3ZlcmZsb3ctYXV0byBvdmVyc2Nyb2xsLW5vbmUnLFxuXHRcdFx0b3V0ZXI6ICcnXG5cdFx0fVxuXHR9LFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRzY3JvbGw6ICdpbm5lcidcblx0fVxufSk7XG5cbi8vIERyYWcgdGh1bWIgZm9yIHN3aXBlLWRpc21pc3NhYmxlIGRyYXdlcnM6IGluLWZsb3cgYmFyIG9uIHRoZSBpbm5lciBlZGdlIGZvclxuLy8gdmVydGljYWwgZHJhd2VycywgZWRnZS1hbmNob3JlZCB2ZXJ0aWNhbCBiYXIgZm9yIGhvcml6b250YWwgb25lcy5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nVGh1bWIgPSBjdmEoe1xuXHQvLyBBYnNvbHV0ZSBzbyB0aGUgYmFyIG92ZXJsYXlzIHRoZSBwYW5lbCBlZGdlIGluc3RlYWQgb2YgdGFraW5nIGZsb3cgc3BhY2UgKHRoZSBoZWFkZXJcblx0Ly8gc2l0cyBmbHVzaCBhdCB0aGUgdG9wKS4gVGhlIDo6YmVmb3JlIG92ZXJzaXplcyB0aGUgaGl0Ym94IGFyb3VuZCB0aGUgNnB4IGJhciAofjM4cHhcblx0Ly8gdG91Y2ggdGFyZ2V0KTsgcG9pbnRlciBldmVudHMgb24gaXQgdGFyZ2V0IHRoZSB0aHVtYiwgc28gZHJhZ3MgdGhlcmUgY291bnQgYXMgaGFuZGxlIGRyYWdzLlxuXHRiYXNlOiBcImFic29sdXRlIHotMTAgdG91Y2gtbm9uZSByb3VuZGVkLWZ1bGwgYmctYmFja2dyb3VuZC1tdXRlZCBiZWZvcmU6YWJzb2x1dGUgYmVmb3JlOi1pbnNldC00IGJlZm9yZTpjb250ZW50LVsnJ11cIixcblx0dmFyaWFudHM6IHtcblx0XHR0eXBlOiB7XG5cdFx0XHRmdWxsU2NyZWVuOiAnaGlkZGVuJyxcblx0XHRcdGRyYXdlclJpZ2h0OiAnbGVmdC0xLjUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIGgtMTIgdy0xLjUnLFxuXHRcdFx0ZHJhd2VyTGVmdDogJ3JpZ2h0LTEuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgaC0xMiB3LTEuNScsXG5cdFx0XHRkcmF3ZXJCb3R0b206ICdsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHRvcC0xLjUgaC0xLjUgdy0xMicsXG5cdFx0XHRkcmF3ZXJUb3A6ICdsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGJvdHRvbS0xLjUgaC0xLjUgdy0xMicsXG5cdFx0XHRtb2RhbDogJ2hpZGRlbicsXG5cdFx0XHRhbGVydDogJ2hpZGRlbidcblx0XHR9XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdERpYWxvZ0hlYWRlciA9IGN2YSh7XG5cdGJhc2U6ICdncmlkIGdhcC0xIG1iLTIgYm9yZGVyLWIgYm9yZGVyLWJhY2tncm91bmQtbXV0ZWQgcHktMicsXG5cdHZhcmlhbnRzOiB7XG5cdFx0c2l6ZToge1xuXHRcdFx0c21hbGw6ICcnLFxuXHRcdFx0bm9ybWFsOiAnJyxcblx0XHRcdGxhcmdlOiAnJ1xuXHRcdH1cblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nRm9vdGVyID0gY3ZhKHtcblx0YmFzZTogJycsXG5cdHZhcmlhbnRzOiB7XG5cdFx0c2l6ZToge1xuXHRcdFx0c21hbGw6ICcnLFxuXHRcdFx0bm9ybWFsOiAnJyxcblx0XHRcdGxhcmdlOiAnJ1xuXHRcdH1cblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0RGlhbG9nQ2xvc2VCdXR0b24gPSBjdmEoe1xuXHRiYXNlOiAnbWwtYXV0byByb3VuZGVkLWZ1bGwgYWJzb2x1dGUgdG9wLTEgcmlnaHQtMSBwLTEnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdHNtYWxsOiAnJyxcblx0XHRcdG5vcm1hbDogJycsXG5cdFx0XHRsYXJnZTogJydcblx0XHR9XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdERpYWxvZ1RpdGxlID0gY3ZhKHtcblx0YmFzZTogJ3RleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LWZvcmVncm91bmQnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdHNtYWxsOiAnJyxcblx0XHRcdG5vcm1hbDogJycsXG5cdFx0XHRsYXJnZTogJydcblx0XHR9XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdERpYWxvZ0Rlc2NyaXB0aW9uID0gY3ZhKHtcblx0YmFzZTogJ3RleHQtc20gdGV4dC1mb3JlZ3JvdW5kLW11dGVkJyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJycsXG5cdFx0XHRub3JtYWw6ICcnLFxuXHRcdFx0bGFyZ2U6ICcnXG5cdFx0fVxuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IGRpYWxvZ1RoZW1lID0ge1xuXHRyb290OiBkZWZhdWx0RGlhbG9nLFxuXHRhbGlnbjogZGVmYXVsdERpYWxvZ0FsaWduLFxuXHRiYWNrZHJvcDogZGVmYXVsdERpYWxvZ0JhY2tkcm9wLFxuXHRjb250ZW50OiBkZWZhdWx0RGlhbG9nQ29udGVudCxcblx0dGh1bWI6IGRlZmF1bHREaWFsb2dUaHVtYixcblx0aGVhZGVyOiBkZWZhdWx0RGlhbG9nSGVhZGVyLFxuXHRmb290ZXI6IGRlZmF1bHREaWFsb2dGb290ZXIsXG5cdGNsb3NlQnV0dG9uOiBkZWZhdWx0RGlhbG9nQ2xvc2VCdXR0b24sXG5cdHRpdGxlOiBkZWZhdWx0RGlhbG9nVGl0bGUsXG5cdGRlc2NyaXB0aW9uOiBkZWZhdWx0RGlhbG9nRGVzY3JpcHRpb25cbn07XG5cbmV4cG9ydCB0eXBlIERpYWxvZ1RoZW1lID0gdHlwZW9mIGRpYWxvZ1RoZW1lO1xuZXhwb3J0IHR5cGUgRGlhbG9nVGhlbWVQcm9wcyA9IEluZmVyQ29tcG9uZW50VGhlbWU8RGlhbG9nVGhlbWU+O1xuZXhwb3J0IGNvbnN0IHNldERpYWxvZ1RoZW1lID0gc2V0Q29tcG9uZW50VGhlbWU8RGlhbG9nVGhlbWU+KCdkaWFsb2cnKTtcbmV4cG9ydCBjb25zdCB1c2VEaWFsb2dUaGVtZSA9IHVzZUNvbXBvbmVudFRoZW1lPERpYWxvZ1RoZW1lPignZGlhbG9nJywgZGlhbG9nVGhlbWUpO1xuIl19