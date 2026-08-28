import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
import { cva } from "/src/lib/utils/cva/index.ts";
const defaultButton = cva({
	base: "group/button inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap relative overflow-hidden cursor-pointer rounded-lg border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all duration-100 ease-in-out focus-visible:ring-2 focus-visible:ring-color/50 active:translate-y-px [&_svg:not([class*=size-])]:size-4",
	variants: {
		size: {
			small: "h-7 px-2.5 gap-1.5 text-xs",
			normal: "h-8 px-3.5 gap-2 text-sm",
			large: "h-9 px-4 gap-2 text-sm"
		},
		color: {
			background: "bg-background-dark text-color-contrast",
			primary: "bg-primary text-primary-contrast",
			secondary: "bg-secondary text-secondary-contrast",
			foreground: "bg-foreground text-foreground-contrast",
			danger: "bg-danger text-danger-contrast",
			success: "bg-success text-success-contrast",
			warning: "bg-warning text-warning-contrast",
			info: "bg-info text-info-contrast"
		},
		variant: {
			solid: "bg-color text-color-contrast hover:bg-color/90 active:bg-color/80",
			outline: "bg-color/0 border border-color hover:bg-color/10 text-color-readable active:bg-color/20",
			soft: "text-color-muted-readable hover:bg-color/30  bg-color-muted active:bg-color/20",
			ghost: "text-color-readable hover:bg-color-muted bg-color/0 active:bg-color-muted/70",
			link: "bg-transparent hover:bg-opacity-60 text-color-readable hover:underline active:bg-color-muted/60"
		},
		loading: {
			true: "cursor-default pointer-events-none",
			false: null
		},
		disabled: {
			true: "opacity-50 cursor-not-allowed pointer-events-none",
			false: null
		},
		squared: {
			true: "aspect-square !px-0",
			false: null
		},
		fullWidth: { true: "w-full max-w-full" }
	},
	defaultVariants: {
		color: "foreground",
		variant: "solid",
		size: "normal"
	},
	compoundVariants: [
		{
			color: "background",
			variant: "outline",
			class: "border-background-muted text-foreground hover:bg-background-lighter"
		},
		{
			color: "background",
			variant: "solid",
			class: "active:bg-background-light"
		},
		{
			color: "background",
			variant: "soft",
			class: "bg-background-lighter text-color-contrast hover:bg-background-light"
		},
		{
			color: "foreground",
			variant: "ghost",
			class: "hover:bg-foreground-muted/20 active:bg-foreground-muted/20"
		},
		{
			color: "background",
			variant: "ghost",
			class: "active:bg-background-muted/10 hover:bg-background-muted/20"
		},
		{
			color: "foreground",
			variant: "link",
			class: "active:bg-foreground-muted/10 text-foreground"
		},
		{
			color: "background",
			variant: "link",
			class: "active:bg-background-muted/10"
		}
	]
});
const defaultButtonPrefix = cva({
	base: "inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full",
	variants: { size: {
		normal: "size-4",
		large: "size-5",
		small: "size-3.5"
	} },
	defaultVariants: { size: "normal" }
});
const defaultButtonSuffix = cva({
	base: "inline-flex size-4 shrink-0 items-center justify-center overflow-hidden leading-none [&_svg:not([class*=size-])]:!size-full",
	variants: { size: {
		normal: "size-4",
		large: "size-5",
		small: "size-3.5"
	} },
	defaultVariants: { size: "normal" }
});
export const buttonTheme = {
	root: defaultButton,
	prefix: defaultButtonPrefix,
	suffix: defaultButtonSuffix
};
export const setButtonTheme = setComponentTheme("button");
export const useButtonTheme = useComponentTheme("button", buttonTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxtQkFBbUIseUJBQXlCO0FBQ3JELFNBQVMsV0FBcUM7QUFFOUMsTUFBTSxnQkFBZ0IsSUFBSTtDQUN6QixNQUFNO0NBQ04sVUFBVTtFQUNULE1BQU07R0FDTCxPQUFPO0dBQ1AsUUFBUTtHQUNSLE9BQU87RUFDUjtFQUNBLE9BQU87R0FDTixZQUFZO0dBQ1osU0FBUztHQUNULFdBQVc7R0FDWCxZQUFZO0dBQ1osUUFBUTtHQUNSLFNBQVM7R0FDVCxTQUFTO0dBQ1QsTUFBTTtFQUNQO0VBQ0EsU0FBUztHQUNSLE9BQU87R0FDUCxTQUNDO0dBQ0QsTUFBTTtHQUNOLE9BQU87R0FDUCxNQUFNO0VBQ1A7RUFDQSxTQUFTO0dBQ1IsTUFBTTtHQUNOLE9BQU87RUFDUjtFQUNBLFVBQVU7R0FDVCxNQUFNO0dBQ04sT0FBTztFQUNSO0VBQ0EsU0FBUztHQUNSLE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQSxXQUFXLEVBQ1YsTUFBTSxvQkFDUDtDQUNEO0NBQ0EsaUJBQWlCO0VBQ2hCLE9BQU87RUFDUCxTQUFTO0VBQ1QsTUFBTTtDQUNQO0NBQ0Esa0JBQWtCO0VBQ2pCO0dBQ0MsT0FBTztHQUNQLFNBQVM7R0FDVCxPQUFPO0VBQ1I7RUFDQTtHQUNDLE9BQU87R0FDUCxTQUFTO0dBQ1QsT0FBTztFQUNSO0VBQ0E7R0FDQyxPQUFPO0dBQ1AsU0FBUztHQUNULE9BQU87RUFDUjtFQUNBO0dBQ0MsT0FBTztHQUNQLFNBQVM7R0FDVCxPQUFPO0VBQ1I7RUFDQTtHQUNDLE9BQU87R0FDUCxTQUFTO0dBQ1QsT0FBTztFQUNSO0VBQ0E7R0FDQyxPQUFPO0dBQ1AsU0FBUztHQUNULE9BQU87RUFDUjtFQUNBO0dBQ0MsT0FBTztHQUNQLFNBQVM7R0FDVCxPQUFPO0VBQ1I7Q0FDRDtBQUNELENBQUM7QUFFRCxNQUFNLHNCQUFzQixJQUFJO0NBQy9CLE1BQU07Q0FDTixVQUFVLEVBQ1QsTUFBTTtFQUNMLFFBQVE7RUFDUixPQUFPO0VBQ1AsT0FBTztDQUNSLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsTUFBTSxTQUNQO0FBQ0QsQ0FBQztBQUVELE1BQU0sc0JBQXNCLElBQUk7Q0FDL0IsTUFBTTtDQUNOLFVBQVUsRUFDVCxNQUFNO0VBQ0wsUUFBUTtFQUNSLE9BQU87RUFDUCxPQUFPO0NBQ1IsRUFDRDtDQUNBLGlCQUFpQixFQUNoQixNQUFNLFNBQ1A7QUFDRCxDQUFDO0FBRUQsT0FBTyxNQUFNLGNBQWM7Q0FDMUIsTUFBTTtDQUNOLFFBQVE7Q0FDUixRQUFRO0FBQ1Q7QUFJQSxPQUFPLE1BQU0saUJBQWlCLGtCQUErQixRQUFRO0FBQ3JFLE9BQU8sTUFBTSxpQkFBaUIsa0JBQStCLFVBQVUsV0FBVyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJidXR0b24udGhlbWUudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0Q29tcG9uZW50VGhlbWUsIHVzZUNvbXBvbmVudFRoZW1lIH0gZnJvbSAnJGxpYi91dGlscy9jdmEvaW5kZXguanMnO1xuaW1wb3J0IHsgY3ZhLCB0eXBlIEluZmVyQ29tcG9uZW50VGhlbWUgfSBmcm9tICckbGliL3V0aWxzL2N2YS9pbmRleC5qcyc7XG5cbmNvbnN0IGRlZmF1bHRCdXR0b24gPSBjdmEoe1xuXHRiYXNlOiAnZ3JvdXAvYnV0dG9uIGlubGluZS1mbGV4IHNocmluay0wIHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLWNsaXAtcGFkZGluZyBmb250LW1lZGl1bSB0ZXh0LXNtIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xMDAgZWFzZS1pbi1vdXQgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLWNvbG9yLzUwIGFjdGl2ZTp0cmFuc2xhdGUteS1weCBbJl9zdmc6bm90KFtjbGFzcyo9c2l6ZS1dKV06c2l6ZS00Jyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ2gtNyBweC0yLjUgZ2FwLTEuNSB0ZXh0LXhzJyxcblx0XHRcdG5vcm1hbDogJ2gtOCBweC0zLjUgZ2FwLTIgdGV4dC1zbScsXG5cdFx0XHRsYXJnZTogJ2gtOSBweC00IGdhcC0yIHRleHQtc20nXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJ2JnLWJhY2tncm91bmQtZGFyayB0ZXh0LWNvbG9yLWNvbnRyYXN0Jyxcblx0XHRcdHByaW1hcnk6ICdiZy1wcmltYXJ5IHRleHQtcHJpbWFyeS1jb250cmFzdCcsXG5cdFx0XHRzZWNvbmRhcnk6ICdiZy1zZWNvbmRhcnkgdGV4dC1zZWNvbmRhcnktY29udHJhc3QnLFxuXHRcdFx0Zm9yZWdyb3VuZDogJ2JnLWZvcmVncm91bmQgdGV4dC1mb3JlZ3JvdW5kLWNvbnRyYXN0Jyxcblx0XHRcdGRhbmdlcjogJ2JnLWRhbmdlciB0ZXh0LWRhbmdlci1jb250cmFzdCcsXG5cdFx0XHRzdWNjZXNzOiAnYmctc3VjY2VzcyB0ZXh0LXN1Y2Nlc3MtY29udHJhc3QnLFxuXHRcdFx0d2FybmluZzogJ2JnLXdhcm5pbmcgdGV4dC13YXJuaW5nLWNvbnRyYXN0Jyxcblx0XHRcdGluZm86ICdiZy1pbmZvIHRleHQtaW5mby1jb250cmFzdCdcblx0XHR9LFxuXHRcdHZhcmlhbnQ6IHtcblx0XHRcdHNvbGlkOiAnYmctY29sb3IgdGV4dC1jb2xvci1jb250cmFzdCBob3ZlcjpiZy1jb2xvci85MCBhY3RpdmU6YmctY29sb3IvODAnLFxuXHRcdFx0b3V0bGluZTpcblx0XHRcdFx0J2JnLWNvbG9yLzAgYm9yZGVyIGJvcmRlci1jb2xvciBob3ZlcjpiZy1jb2xvci8xMCB0ZXh0LWNvbG9yLXJlYWRhYmxlIGFjdGl2ZTpiZy1jb2xvci8yMCcsXG5cdFx0XHRzb2Z0OiAndGV4dC1jb2xvci1tdXRlZC1yZWFkYWJsZSBob3ZlcjpiZy1jb2xvci8zMCAgYmctY29sb3ItbXV0ZWQgYWN0aXZlOmJnLWNvbG9yLzIwJyxcblx0XHRcdGdob3N0OiAndGV4dC1jb2xvci1yZWFkYWJsZSBob3ZlcjpiZy1jb2xvci1tdXRlZCBiZy1jb2xvci8wIGFjdGl2ZTpiZy1jb2xvci1tdXRlZC83MCcsXG5cdFx0XHRsaW5rOiAnYmctdHJhbnNwYXJlbnQgaG92ZXI6Ymctb3BhY2l0eS02MCB0ZXh0LWNvbG9yLXJlYWRhYmxlIGhvdmVyOnVuZGVybGluZSBhY3RpdmU6YmctY29sb3ItbXV0ZWQvNjAnXG5cdFx0fSxcblx0XHRsb2FkaW5nOiB7XG5cdFx0XHR0cnVlOiAnY3Vyc29yLWRlZmF1bHQgcG9pbnRlci1ldmVudHMtbm9uZScsXG5cdFx0XHRmYWxzZTogbnVsbFxuXHRcdH0sXG5cdFx0ZGlzYWJsZWQ6IHtcblx0XHRcdHRydWU6ICdvcGFjaXR5LTUwIGN1cnNvci1ub3QtYWxsb3dlZCBwb2ludGVyLWV2ZW50cy1ub25lJyxcblx0XHRcdGZhbHNlOiBudWxsXG5cdFx0fSxcblx0XHRzcXVhcmVkOiB7XG5cdFx0XHR0cnVlOiAnYXNwZWN0LXNxdWFyZSAhcHgtMCcsXG5cdFx0XHRmYWxzZTogbnVsbFxuXHRcdH0sXG5cdFx0ZnVsbFdpZHRoOiB7XG5cdFx0XHR0cnVlOiAndy1mdWxsIG1heC13LWZ1bGwnXG5cdFx0fVxuXHR9LFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRjb2xvcjogJ2ZvcmVncm91bmQnLFxuXHRcdHZhcmlhbnQ6ICdzb2xpZCcsXG5cdFx0c2l6ZTogJ25vcm1hbCdcblx0fSxcblx0Y29tcG91bmRWYXJpYW50czogW1xuXHRcdHtcblx0XHRcdGNvbG9yOiAnYmFja2dyb3VuZCcsXG5cdFx0XHR2YXJpYW50OiAnb3V0bGluZScsXG5cdFx0XHRjbGFzczogJ2JvcmRlci1iYWNrZ3JvdW5kLW11dGVkIHRleHQtZm9yZWdyb3VuZCBob3ZlcjpiZy1iYWNrZ3JvdW5kLWxpZ2h0ZXInXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb2xvcjogJ2JhY2tncm91bmQnLFxuXHRcdFx0dmFyaWFudDogJ3NvbGlkJyxcblx0XHRcdGNsYXNzOiAnYWN0aXZlOmJnLWJhY2tncm91bmQtbGlnaHQnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb2xvcjogJ2JhY2tncm91bmQnLFxuXHRcdFx0dmFyaWFudDogJ3NvZnQnLFxuXHRcdFx0Y2xhc3M6ICdiZy1iYWNrZ3JvdW5kLWxpZ2h0ZXIgdGV4dC1jb2xvci1jb250cmFzdCBob3ZlcjpiZy1iYWNrZ3JvdW5kLWxpZ2h0J1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Y29sb3I6ICdmb3JlZ3JvdW5kJyxcblx0XHRcdHZhcmlhbnQ6ICdnaG9zdCcsXG5cdFx0XHRjbGFzczogJ2hvdmVyOmJnLWZvcmVncm91bmQtbXV0ZWQvMjAgYWN0aXZlOmJnLWZvcmVncm91bmQtbXV0ZWQvMjAnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb2xvcjogJ2JhY2tncm91bmQnLFxuXHRcdFx0dmFyaWFudDogJ2dob3N0Jyxcblx0XHRcdGNsYXNzOiAnYWN0aXZlOmJnLWJhY2tncm91bmQtbXV0ZWQvMTAgaG92ZXI6YmctYmFja2dyb3VuZC1tdXRlZC8yMCdcblx0XHR9LFxuXHRcdHtcblx0XHRcdGNvbG9yOiAnZm9yZWdyb3VuZCcsXG5cdFx0XHR2YXJpYW50OiAnbGluaycsXG5cdFx0XHRjbGFzczogJ2FjdGl2ZTpiZy1mb3JlZ3JvdW5kLW11dGVkLzEwIHRleHQtZm9yZWdyb3VuZCdcblx0XHR9LFxuXHRcdHtcblx0XHRcdGNvbG9yOiAnYmFja2dyb3VuZCcsXG5cdFx0XHR2YXJpYW50OiAnbGluaycsXG5cdFx0XHRjbGFzczogJ2FjdGl2ZTpiZy1iYWNrZ3JvdW5kLW11dGVkLzEwJ1xuXHRcdH1cblx0XVxufSk7XG5cbmNvbnN0IGRlZmF1bHRCdXR0b25QcmVmaXggPSBjdmEoe1xuXHRiYXNlOiAnaW5saW5lLWZsZXggc2l6ZS00IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gbGVhZGluZy1ub25lIFsmX3N2Zzpub3QoW2NsYXNzKj1zaXplLV0pXTohc2l6ZS1mdWxsJyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRub3JtYWw6ICdzaXplLTQnLFxuXHRcdFx0bGFyZ2U6ICdzaXplLTUnLFxuXHRcdFx0c21hbGw6ICdzaXplLTMuNSdcblx0XHR9XG5cdH0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdHNpemU6ICdub3JtYWwnXG5cdH1cbn0pO1xuXG5jb25zdCBkZWZhdWx0QnV0dG9uU3VmZml4ID0gY3ZhKHtcblx0YmFzZTogJ2lubGluZS1mbGV4IHNpemUtNCBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuIGxlYWRpbmctbm9uZSBbJl9zdmc6bm90KFtjbGFzcyo9c2l6ZS1dKV06IXNpemUtZnVsbCcsXG5cdHZhcmlhbnRzOiB7XG5cdFx0c2l6ZToge1xuXHRcdFx0bm9ybWFsOiAnc2l6ZS00Jyxcblx0XHRcdGxhcmdlOiAnc2l6ZS01Jyxcblx0XHRcdHNtYWxsOiAnc2l6ZS0zLjUnXG5cdFx0fVxuXHR9LFxuXHRkZWZhdWx0VmFyaWFudHM6IHtcblx0XHRzaXplOiAnbm9ybWFsJ1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IGJ1dHRvblRoZW1lID0ge1xuXHRyb290OiBkZWZhdWx0QnV0dG9uLFxuXHRwcmVmaXg6IGRlZmF1bHRCdXR0b25QcmVmaXgsXG5cdHN1ZmZpeDogZGVmYXVsdEJ1dHRvblN1ZmZpeFxufTtcblxuZXhwb3J0IHR5cGUgQnV0dG9uVGhlbWUgPSB0eXBlb2YgYnV0dG9uVGhlbWU7XG5leHBvcnQgdHlwZSBCdXR0b25UaGVtZVByb3BzID0gSW5mZXJDb21wb25lbnRUaGVtZTxCdXR0b25UaGVtZT47XG5leHBvcnQgY29uc3Qgc2V0QnV0dG9uVGhlbWUgPSBzZXRDb21wb25lbnRUaGVtZTxCdXR0b25UaGVtZT4oJ2J1dHRvbicpO1xuZXhwb3J0IGNvbnN0IHVzZUJ1dHRvblRoZW1lID0gdXNlQ29tcG9uZW50VGhlbWU8QnV0dG9uVGhlbWU+KCdidXR0b24nLCBidXR0b25UaGVtZSk7XG4iXX0=