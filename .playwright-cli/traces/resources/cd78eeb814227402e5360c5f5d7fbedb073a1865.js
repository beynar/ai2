import { cva } from "/src/lib/utils/cva/index.ts";
import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
const defaultRoot = cva({ base: "min-h-svh w-full bg-background-dark text-foreground" });
const defaultPage = cva({
	base: "h-full min-h-0 overflow-hidden",
	variants: {
		variant: {
			sidebar: "bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]",
			floating: "bg-background-dark [--page-shell-chrome:var(--color-background-dark)] [--page-shell-surface:var(--color-background-dark)]",
			inset: "bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]",
			split: "bg-background [--page-shell-chrome:var(--color-background)] [--page-shell-surface:var(--color-background)]"
		},
		side: {
			left: "",
			right: ""
		}
	},
	compoundVariants: [
		{
			variant: "inset",
			side: "left",
			class: "md:my-2 md:mr-2 md:ml-0 md:rounded-xl md:border md:border-background-dark md:shadow-sm"
		},
		{
			variant: "inset",
			side: "right",
			class: "md:my-2 md:mr-0 md:ml-2 md:rounded-xl md:border md:border-background-dark md:shadow-sm"
		},
		{
			variant: "split",
			side: "left",
			class: "md:rounded-l-xl md:border-y md:border-r md:border-background-dark md:shadow-sm"
		},
		{
			variant: "split",
			side: "right",
			class: "md:rounded-r-xl md:border-y md:border-l md:border-background-dark md:shadow-sm"
		}
	],
	defaultVariants: {
		variant: "sidebar",
		side: "left"
	}
});
export const appShellTheme = {
	root: defaultRoot,
	page: defaultPage
};
export const setAppShellTheme = setComponentTheme("app-shell");
export const useAppShellTheme = useComponentTheme("app-shell", appShellTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxXQUFxQztBQUM5QyxTQUFTLG1CQUFtQix5QkFBeUI7QUFFckQsTUFBTSxjQUFjLElBQUksRUFDdkIsTUFBTSxzREFDUCxDQUFDO0FBRUQsTUFBTSxjQUFjLElBQUk7Q0FDdkIsTUFBTTtDQUNOLFVBQVU7RUFDVCxTQUFTO0dBQ1IsU0FDQztHQUNELFVBQ0M7R0FDRCxPQUNDO0dBQ0QsT0FDQztFQUNGO0VBQ0EsTUFBTTtHQUNMLE1BQU07R0FDTixPQUFPO0VBQ1I7Q0FDRDtDQUNBLGtCQUFrQjtFQUNqQjtHQUNDLFNBQVM7R0FDVCxNQUFNO0dBQ04sT0FDQztFQUNGO0VBQ0E7R0FDQyxTQUFTO0dBQ1QsTUFBTTtHQUNOLE9BQ0M7RUFDRjtFQUNBO0dBQ0MsU0FBUztHQUNULE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQTtHQUNDLFNBQVM7R0FDVCxNQUFNO0dBQ04sT0FBTztFQUNSO0NBQ0Q7Q0FDQSxpQkFBaUI7RUFDaEIsU0FBUztFQUNULE1BQU07Q0FDUDtBQUNELENBQUM7QUFFRCxPQUFPLE1BQU0sZ0JBQWdCO0NBQzVCLE1BQU07Q0FDTixNQUFNO0FBQ1A7QUFJQSxPQUFPLE1BQU0sbUJBQW1CLGtCQUFpQyxXQUFXO0FBQzVFLE9BQU8sTUFBTSxtQkFBbUIsa0JBQWlDLGFBQWEsYUFBYSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJhcHBTaGVsbC50aGVtZS50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdmEsIHR5cGUgSW5mZXJDb21wb25lbnRUaGVtZSB9IGZyb20gJyRsaWIvdXRpbHMvY3ZhL2luZGV4LmpzJztcbmltcG9ydCB7IHNldENvbXBvbmVudFRoZW1lLCB1c2VDb21wb25lbnRUaGVtZSB9IGZyb20gJyRsaWIvdXRpbHMvY3ZhL2luZGV4LmpzJztcblxuY29uc3QgZGVmYXVsdFJvb3QgPSBjdmEoe1xuXHRiYXNlOiAnbWluLWgtc3ZoIHctZnVsbCBiZy1iYWNrZ3JvdW5kLWRhcmsgdGV4dC1mb3JlZ3JvdW5kJ1xufSk7XG5cbmNvbnN0IGRlZmF1bHRQYWdlID0gY3ZhKHtcblx0YmFzZTogJ2gtZnVsbCBtaW4taC0wIG92ZXJmbG93LWhpZGRlbicsXG5cdHZhcmlhbnRzOiB7XG5cdFx0dmFyaWFudDoge1xuXHRcdFx0c2lkZWJhcjpcblx0XHRcdFx0J2JnLWJhY2tncm91bmQgWy0tcGFnZS1zaGVsbC1jaHJvbWU6dmFyKC0tY29sb3ItYmFja2dyb3VuZCldIFstLXBhZ2Utc2hlbGwtc3VyZmFjZTp2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKV0nLFxuXHRcdFx0ZmxvYXRpbmc6XG5cdFx0XHRcdCdiZy1iYWNrZ3JvdW5kLWRhcmsgWy0tcGFnZS1zaGVsbC1jaHJvbWU6dmFyKC0tY29sb3ItYmFja2dyb3VuZC1kYXJrKV0gWy0tcGFnZS1zaGVsbC1zdXJmYWNlOnZhcigtLWNvbG9yLWJhY2tncm91bmQtZGFyayldJyxcblx0XHRcdGluc2V0OlxuXHRcdFx0XHQnYmctYmFja2dyb3VuZCBbLS1wYWdlLXNoZWxsLWNocm9tZTp2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKV0gWy0tcGFnZS1zaGVsbC1zdXJmYWNlOnZhcigtLWNvbG9yLWJhY2tncm91bmQpXScsXG5cdFx0XHRzcGxpdDpcblx0XHRcdFx0J2JnLWJhY2tncm91bmQgWy0tcGFnZS1zaGVsbC1jaHJvbWU6dmFyKC0tY29sb3ItYmFja2dyb3VuZCldIFstLXBhZ2Utc2hlbGwtc3VyZmFjZTp2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKV0nXG5cdFx0fSxcblx0XHRzaWRlOiB7XG5cdFx0XHRsZWZ0OiAnJyxcblx0XHRcdHJpZ2h0OiAnJ1xuXHRcdH1cblx0fSxcblx0Y29tcG91bmRWYXJpYW50czogW1xuXHRcdHtcblx0XHRcdHZhcmlhbnQ6ICdpbnNldCcsXG5cdFx0XHRzaWRlOiAnbGVmdCcsXG5cdFx0XHRjbGFzczpcblx0XHRcdFx0J21kOm15LTIgbWQ6bXItMiBtZDptbC0wIG1kOnJvdW5kZWQteGwgbWQ6Ym9yZGVyIG1kOmJvcmRlci1iYWNrZ3JvdW5kLWRhcmsgbWQ6c2hhZG93LXNtJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dmFyaWFudDogJ2luc2V0Jyxcblx0XHRcdHNpZGU6ICdyaWdodCcsXG5cdFx0XHRjbGFzczpcblx0XHRcdFx0J21kOm15LTIgbWQ6bXItMCBtZDptbC0yIG1kOnJvdW5kZWQteGwgbWQ6Ym9yZGVyIG1kOmJvcmRlci1iYWNrZ3JvdW5kLWRhcmsgbWQ6c2hhZG93LXNtJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dmFyaWFudDogJ3NwbGl0Jyxcblx0XHRcdHNpZGU6ICdsZWZ0Jyxcblx0XHRcdGNsYXNzOiAnbWQ6cm91bmRlZC1sLXhsIG1kOmJvcmRlci15IG1kOmJvcmRlci1yIG1kOmJvcmRlci1iYWNrZ3JvdW5kLWRhcmsgbWQ6c2hhZG93LXNtJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dmFyaWFudDogJ3NwbGl0Jyxcblx0XHRcdHNpZGU6ICdyaWdodCcsXG5cdFx0XHRjbGFzczogJ21kOnJvdW5kZWQtci14bCBtZDpib3JkZXIteSBtZDpib3JkZXItbCBtZDpib3JkZXItYmFja2dyb3VuZC1kYXJrIG1kOnNoYWRvdy1zbSdcblx0XHR9XG5cdF0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdHZhcmlhbnQ6ICdzaWRlYmFyJyxcblx0XHRzaWRlOiAnbGVmdCdcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBhcHBTaGVsbFRoZW1lID0ge1xuXHRyb290OiBkZWZhdWx0Um9vdCxcblx0cGFnZTogZGVmYXVsdFBhZ2Vcbn07XG5cbmV4cG9ydCB0eXBlIEFwcFNoZWxsVGhlbWUgPSB0eXBlb2YgYXBwU2hlbGxUaGVtZTtcbmV4cG9ydCB0eXBlIEFwcFNoZWxsVGhlbWVQcm9wcyA9IEluZmVyQ29tcG9uZW50VGhlbWU8QXBwU2hlbGxUaGVtZT47XG5leHBvcnQgY29uc3Qgc2V0QXBwU2hlbGxUaGVtZSA9IHNldENvbXBvbmVudFRoZW1lPEFwcFNoZWxsVGhlbWU+KCdhcHAtc2hlbGwnKTtcbmV4cG9ydCBjb25zdCB1c2VBcHBTaGVsbFRoZW1lID0gdXNlQ29tcG9uZW50VGhlbWU8QXBwU2hlbGxUaGVtZT4oJ2FwcC1zaGVsbCcsIGFwcFNoZWxsVGhlbWUpO1xuIl19