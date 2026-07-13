import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
import { cva } from "/src/lib/utils/cva/index.ts";
const defaultSeparator = cva({
	base: "relative flex items-center text-foreground/70 text-xs",
	variants: {
		orientation: {
			horizontal: "w-full my-2",
			vertical: "h-full mx-2 flex-col"
		},
		align: {
			start: "",
			center: "",
			end: ""
		},
		line: {
			true: "",
			false: ""
		},
		color: {
			primary: "before:border-primary after:border-primary",
			secondary: "before:border-secondary after:border-secondary",
			foreground: "before:border-foreground after:border-foreground",
			background: "before:border-background-muted after:border-background-muted",
			danger: "before:border-danger after:border-danger",
			success: "before:border-success after:border-success",
			warning: "before:border-warning after:border-warning",
			info: "before:border-info after:border-info"
		}
	},
	compoundVariants: [
		(
		// Line rendering per orientation
		{
			orientation: "horizontal",
			line: true,
			class: "before:border-t before:[border-top-width:var(--separator-border-width,1px)] after:border-t after:[border-top-width:var(--separator-border-width,1px)]"
		}),
		{
			orientation: "vertical",
			line: true,
			class: "before:border-l before:[border-width:var(--separator-border-width,1px)] after:border-l after:[border-width:var(--separator-border-width,1px)]"
		},
		(
		// Alignment (horizontal): which side grows to fill, plus the gap around the label
		{
			orientation: "horizontal",
			align: "center",
			class: "before:flex-1 after:flex-1 [&:has(*)]:before:mr-2 [&:has(*)]:after:ml-2"
		}),
		{
			orientation: "horizontal",
			align: "start",
			class: "after:flex-1 [&:has(*)]:after:ml-2"
		},
		{
			orientation: "horizontal",
			align: "end",
			class: "before:flex-1 [&:has(*)]:before:mr-2"
		},
		(
		// Alignment (vertical)
		{
			orientation: "vertical",
			align: "center",
			class: "before:flex-1 after:flex-1 [&:has(*)]:before:mb-2 [&:has(*)]:after:mt-2"
		}),
		{
			orientation: "vertical",
			align: "start",
			class: "after:flex-1 [&:has(*)]:after:mt-2"
		},
		{
			orientation: "vertical",
			align: "end",
			class: "before:flex-1 [&:has(*)]:before:mb-2"
		}
	],
	defaultVariants: {
		orientation: "horizontal",
		align: "center",
		line: true,
		color: "background"
	}
});
const defaultSeparatorLabel = cva({
	base: "whitespace-nowrap text-[0.75rem] leading-tight flex-shrink-0",
	variants: { orientation: {
		horizontal: "",
		vertical: ""
	} },
	defaultVariants: { orientation: "horizontal" }
});
export const separatorTheme = {
	root: defaultSeparator,
	label: defaultSeparatorLabel
};
export const setSeparatorTheme = setComponentTheme("separator");
export const useSeparatorTheme = useComponentTheme("separator", separatorTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxtQkFBbUIseUJBQXlCO0FBQ3JELFNBQVMsV0FBcUM7QUFFOUMsTUFBTSxtQkFBbUIsSUFBSTtDQUM1QixNQUFNO0NBQ04sVUFBVTtFQUNULGFBQWE7R0FDWixZQUFZO0dBQ1osVUFBVTtFQUNYO0VBQ0EsT0FBTztHQUNOLE9BQU87R0FDUCxRQUFRO0dBQ1IsS0FBSztFQUNOO0VBQ0EsTUFBTTtHQUNMLE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQSxPQUFPO0dBQ04sU0FBUztHQUNULFdBQVc7R0FDWCxZQUFZO0dBQ1osWUFBWTtHQUNaLFFBQVE7R0FDUixTQUFTO0dBQ1QsU0FBUztHQUNULE1BQU07RUFDUDtDQUNEO0NBQ0Esa0JBQWtCOzs7RUFFakI7R0FDQyxhQUFhO0dBQ2IsTUFBTTtHQUNOLE9BQ0M7RUFDRjtFQUNBO0dBQ0MsYUFBYTtHQUNiLE1BQU07R0FDTixPQUNDO0VBQ0Y7OztFQUVBO0dBQ0MsYUFBYTtHQUNiLE9BQU87R0FDUCxPQUFPO0VBQ1I7RUFDQTtHQUFFLGFBQWE7R0FBYyxPQUFPO0dBQVMsT0FBTztFQUFxQztFQUN6RjtHQUFFLGFBQWE7R0FBYyxPQUFPO0dBQU8sT0FBTztFQUF1Qzs7O0VBRXpGO0dBQ0MsYUFBYTtHQUNiLE9BQU87R0FDUCxPQUFPO0VBQ1I7RUFDQTtHQUFFLGFBQWE7R0FBWSxPQUFPO0dBQVMsT0FBTztFQUFxQztFQUN2RjtHQUFFLGFBQWE7R0FBWSxPQUFPO0dBQU8sT0FBTztFQUF1QztDQUN4RjtDQUNBLGlCQUFpQjtFQUNoQixhQUFhO0VBQ2IsT0FBTztFQUNQLE1BQU07RUFDTixPQUFPO0NBQ1I7QUFDRCxDQUFDO0FBRUQsTUFBTSx3QkFBd0IsSUFBSTtDQUNqQyxNQUFNO0NBQ04sVUFBVSxFQUNULGFBQWE7RUFDWixZQUFZO0VBQ1osVUFBVTtDQUNYLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsYUFBYSxhQUNkO0FBQ0QsQ0FBQztBQUVELE9BQU8sTUFBTSxpQkFBaUI7Q0FDN0IsTUFBTTtDQUNOLE9BQU87QUFDUjtBQUlBLE9BQU8sTUFBTSxvQkFBb0Isa0JBQWtDLFdBQVc7QUFDOUUsT0FBTyxNQUFNLG9CQUFvQixrQkFBa0MsYUFBYSxjQUFjIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbInNlcGFyYXRvci50aGVtZS50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXRDb21wb25lbnRUaGVtZSwgdXNlQ29tcG9uZW50VGhlbWUgfSBmcm9tICckbGliL3V0aWxzL2N2YS9pbmRleC5qcyc7XG5pbXBvcnQgeyBjdmEsIHR5cGUgSW5mZXJDb21wb25lbnRUaGVtZSB9IGZyb20gJyRsaWIvdXRpbHMvY3ZhL2luZGV4LmpzJztcblxuY29uc3QgZGVmYXVsdFNlcGFyYXRvciA9IGN2YSh7XG5cdGJhc2U6ICdyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWZvcmVncm91bmQvNzAgdGV4dC14cycsXG5cdHZhcmlhbnRzOiB7XG5cdFx0b3JpZW50YXRpb246IHtcblx0XHRcdGhvcml6b250YWw6ICd3LWZ1bGwgbXktMicsXG5cdFx0XHR2ZXJ0aWNhbDogJ2gtZnVsbCBteC0yIGZsZXgtY29sJ1xuXHRcdH0sXG5cdFx0YWxpZ246IHtcblx0XHRcdHN0YXJ0OiAnJyxcblx0XHRcdGNlbnRlcjogJycsXG5cdFx0XHRlbmQ6ICcnXG5cdFx0fSxcblx0XHRsaW5lOiB7XG5cdFx0XHR0cnVlOiAnJyxcblx0XHRcdGZhbHNlOiAnJ1xuXHRcdH0sXG5cdFx0Y29sb3I6IHtcblx0XHRcdHByaW1hcnk6ICdiZWZvcmU6Ym9yZGVyLXByaW1hcnkgYWZ0ZXI6Ym9yZGVyLXByaW1hcnknLFxuXHRcdFx0c2Vjb25kYXJ5OiAnYmVmb3JlOmJvcmRlci1zZWNvbmRhcnkgYWZ0ZXI6Ym9yZGVyLXNlY29uZGFyeScsXG5cdFx0XHRmb3JlZ3JvdW5kOiAnYmVmb3JlOmJvcmRlci1mb3JlZ3JvdW5kIGFmdGVyOmJvcmRlci1mb3JlZ3JvdW5kJyxcblx0XHRcdGJhY2tncm91bmQ6ICdiZWZvcmU6Ym9yZGVyLWJhY2tncm91bmQtbXV0ZWQgYWZ0ZXI6Ym9yZGVyLWJhY2tncm91bmQtbXV0ZWQnLFxuXHRcdFx0ZGFuZ2VyOiAnYmVmb3JlOmJvcmRlci1kYW5nZXIgYWZ0ZXI6Ym9yZGVyLWRhbmdlcicsXG5cdFx0XHRzdWNjZXNzOiAnYmVmb3JlOmJvcmRlci1zdWNjZXNzIGFmdGVyOmJvcmRlci1zdWNjZXNzJyxcblx0XHRcdHdhcm5pbmc6ICdiZWZvcmU6Ym9yZGVyLXdhcm5pbmcgYWZ0ZXI6Ym9yZGVyLXdhcm5pbmcnLFxuXHRcdFx0aW5mbzogJ2JlZm9yZTpib3JkZXItaW5mbyBhZnRlcjpib3JkZXItaW5mbydcblx0XHR9XG5cdH0sXG5cdGNvbXBvdW5kVmFyaWFudHM6IFtcblx0XHQvLyBMaW5lIHJlbmRlcmluZyBwZXIgb3JpZW50YXRpb25cblx0XHR7XG5cdFx0XHRvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdFx0bGluZTogdHJ1ZSxcblx0XHRcdGNsYXNzOlxuXHRcdFx0XHQnYmVmb3JlOmJvcmRlci10IGJlZm9yZTpbYm9yZGVyLXRvcC13aWR0aDp2YXIoLS1zZXBhcmF0b3ItYm9yZGVyLXdpZHRoLDFweCldIGFmdGVyOmJvcmRlci10IGFmdGVyOltib3JkZXItdG9wLXdpZHRoOnZhcigtLXNlcGFyYXRvci1ib3JkZXItd2lkdGgsMXB4KV0nXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcblx0XHRcdGxpbmU6IHRydWUsXG5cdFx0XHRjbGFzczpcblx0XHRcdFx0J2JlZm9yZTpib3JkZXItbCBiZWZvcmU6W2JvcmRlci13aWR0aDp2YXIoLS1zZXBhcmF0b3ItYm9yZGVyLXdpZHRoLDFweCldIGFmdGVyOmJvcmRlci1sIGFmdGVyOltib3JkZXItd2lkdGg6dmFyKC0tc2VwYXJhdG9yLWJvcmRlci13aWR0aCwxcHgpXSdcblx0XHR9LFxuXHRcdC8vIEFsaWdubWVudCAoaG9yaXpvbnRhbCk6IHdoaWNoIHNpZGUgZ3Jvd3MgdG8gZmlsbCwgcGx1cyB0aGUgZ2FwIGFyb3VuZCB0aGUgbGFiZWxcblx0XHR7XG5cdFx0XHRvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdFx0YWxpZ246ICdjZW50ZXInLFxuXHRcdFx0Y2xhc3M6ICdiZWZvcmU6ZmxleC0xIGFmdGVyOmZsZXgtMSBbJjpoYXMoKildOmJlZm9yZTptci0yIFsmOmhhcygqKV06YWZ0ZXI6bWwtMidcblx0XHR9LFxuXHRcdHsgb3JpZW50YXRpb246ICdob3Jpem9udGFsJywgYWxpZ246ICdzdGFydCcsIGNsYXNzOiAnYWZ0ZXI6ZmxleC0xIFsmOmhhcygqKV06YWZ0ZXI6bWwtMicgfSxcblx0XHR7IG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsIGFsaWduOiAnZW5kJywgY2xhc3M6ICdiZWZvcmU6ZmxleC0xIFsmOmhhcygqKV06YmVmb3JlOm1yLTInIH0sXG5cdFx0Ly8gQWxpZ25tZW50ICh2ZXJ0aWNhbClcblx0XHR7XG5cdFx0XHRvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcblx0XHRcdGFsaWduOiAnY2VudGVyJyxcblx0XHRcdGNsYXNzOiAnYmVmb3JlOmZsZXgtMSBhZnRlcjpmbGV4LTEgWyY6aGFzKCopXTpiZWZvcmU6bWItMiBbJjpoYXMoKildOmFmdGVyOm10LTInXG5cdFx0fSxcblx0XHR7IG9yaWVudGF0aW9uOiAndmVydGljYWwnLCBhbGlnbjogJ3N0YXJ0JywgY2xhc3M6ICdhZnRlcjpmbGV4LTEgWyY6aGFzKCopXTphZnRlcjptdC0yJyB9LFxuXHRcdHsgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsIGFsaWduOiAnZW5kJywgY2xhc3M6ICdiZWZvcmU6ZmxleC0xIFsmOmhhcygqKV06YmVmb3JlOm1iLTInIH1cblx0XSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0b3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcblx0XHRhbGlnbjogJ2NlbnRlcicsXG5cdFx0bGluZTogdHJ1ZSxcblx0XHRjb2xvcjogJ2JhY2tncm91bmQnXG5cdH1cbn0pO1xuXG5jb25zdCBkZWZhdWx0U2VwYXJhdG9yTGFiZWwgPSBjdmEoe1xuXHRiYXNlOiAnd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1bMC43NXJlbV0gbGVhZGluZy10aWdodCBmbGV4LXNocmluay0wJyxcblx0dmFyaWFudHM6IHtcblx0XHRvcmllbnRhdGlvbjoge1xuXHRcdFx0aG9yaXpvbnRhbDogJycsXG5cdFx0XHR2ZXJ0aWNhbDogJydcblx0XHR9XG5cdH0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCdcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0b3JUaGVtZSA9IHtcblx0cm9vdDogZGVmYXVsdFNlcGFyYXRvcixcblx0bGFiZWw6IGRlZmF1bHRTZXBhcmF0b3JMYWJlbFxufTtcblxuZXhwb3J0IHR5cGUgU2VwYXJhdG9yVGhlbWUgPSB0eXBlb2Ygc2VwYXJhdG9yVGhlbWU7XG5leHBvcnQgdHlwZSBTZXBhcmF0b3JUaGVtZVByb3BzID0gSW5mZXJDb21wb25lbnRUaGVtZTxTZXBhcmF0b3JUaGVtZT47XG5leHBvcnQgY29uc3Qgc2V0U2VwYXJhdG9yVGhlbWUgPSBzZXRDb21wb25lbnRUaGVtZTxTZXBhcmF0b3JUaGVtZT4oJ3NlcGFyYXRvcicpO1xuZXhwb3J0IGNvbnN0IHVzZVNlcGFyYXRvclRoZW1lID0gdXNlQ29tcG9uZW50VGhlbWU8U2VwYXJhdG9yVGhlbWU+KCdzZXBhcmF0b3InLCBzZXBhcmF0b3JUaGVtZSk7XG4iXX0=