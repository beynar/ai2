import { setComponentTheme, useComponentTheme } from "/src/lib/utils/cva/index.ts";
import { cva } from "/src/lib/utils/cva/index.ts";
const defaultTabbar = cva({
	// relative: the shared active indicator is positioned against the root.
	base: "relative flex w-full",
	variants: {
		orientation: {
			// Scroll (no visible scrollbar) when the tabs overflow their track.
			horizontal: "flex-row overflow-x-auto scrollbar-none",
			vertical: "flex-col w-fit overflow-y-auto scrollbar-none"
		},
		alignment: {
			start: "justify-start",
			center: "justify-center",
			end: "justify-end"
		},
		size: {
			small: "gap-0.5",
			normal: "gap-1",
			large: "gap-1.5"
		},
		variant: {
			underline: "",
			pill: "w-fit rounded-full bg-background-muted/60 p-1"
		},
		fullWidth: {
			true: "w-full",
			false: ""
		}
	},
	compoundVariants: [(
	// A vertical pill track shouldn't be a stadium — soften to a large radius.
	{
		variant: "pill",
		orientation: "vertical",
		class: "rounded-2xl"
	}), {
		variant: "pill",
		fullWidth: true,
		class: "w-full"
	}],
	defaultVariants: {
		orientation: "horizontal",
		alignment: "start",
		size: "normal",
		variant: "underline"
	}
});
const defaultTab = cva({
	// focus-visible only matches keyboard-driven focus (arrows/Tab), so pointer
	// clicks never show the ring. ring-inset: the scroll container's overflow-y
	// (forced to auto by overflow-x) would otherwise clip an outset ring.
	// whitespace-nowrap + default flex min-width:auto make tabs overflow (and
	// scroll) rather than compress when they don't fit. transition-colors (NOT
	// transition-all) eases only the label colour as the indicator slides — scoped
	// to colour so it never lags a layout/transform change.
	base: "rounded relative cursor-pointer inline-flex items-center justify-center outline-none whitespace-nowrap text-foreground/70 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/45",
	variants: {
		size: {
			small: "px-2 py-1 text-xs gap-1",
			normal: "px-3 py-1 text-sm gap-2 ",
			large: "px-4 py-1 text-base gap-2.5 "
		},
		color: {
			background: "",
			primary: "",
			secondary: "",
			foreground: "",
			danger: "",
			success: "",
			warning: "",
			info: ""
		},
		active: {
			true: "",
			false: ""
		},
		focused: {
			// No background change on focus — it clashes with the sliding indicator
			// (especially the pill). Keyboard focus is still signalled by the text
			// lifting to full contrast.
			true: "text-foreground",
			false: ""
		},
		disabled: {
			true: "opacity-50 cursor-not-allowed pointer-events-none",
			false: ""
		},
		orientation: {
			horizontal: "",
			vertical: "w-full"
		},
		position: {
			top: "",
			bottom: "",
			left: "",
			right: ""
		},
		variant: {
			underline: "",
			pill: "rounded-full"
		},
		fullWidth: {
			true: "w-full",
			false: ""
		}
	},
	defaultVariants: {
		color: "primary",
		size: "normal",
		active: false,
		focused: false,
		disabled: false,
		orientation: "horizontal",
		position: "top",
		variant: "underline"
	},
	compoundVariants: [(
	// The moving indicator (see the `indicator` part) carries the underline/pill
	// visuals. Active-tab text: the underline leaves it on the page surface (full
	// contrast foreground); the pill sits on a `color`-filled surface, so its text
	// flips to that color's contrast tone.
	{
		active: true,
		variant: "underline",
		class: "text-foreground"
	}), {
		active: true,
		variant: "pill",
		class: "text-color-contrast"
	}]
});
// The single shared active indicator. It is measured onto the active tab by the
// component (inline transform/width/height) and slides there; `data-ready`
// enables the transition only after the first placement so mount doesn't animate
// from the origin.
const defaultTabIndicator = cva({
	base: "pointer-events-none absolute left-0 top-0 will-change-transform data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-300 data-[ready=true]:ease-[cubic-bezier(0.4,0,0.2,1)]",
	variants: { variant: {
		underline: "rounded-full bg-color",
		// Colored raised pill (driven by data-color on the indicator). color
		// 'background' gives the neutral segmented-control look.
		pill: "rounded-full bg-color shadow-sm"
	} },
	defaultVariants: { variant: "underline" }
});
// The static (CSS-only) indicator, rendered INSIDE the active tab for SSR and the
// pre-hydration window. It is positioned purely by layout (no JS measurement), so
// it renders at the correct place on the server. Once hydrated, the component
// swaps it for the measured `indicator` above at the identical spot.
const defaultTabStaticIndicator = cva({
	base: "pointer-events-none absolute bg-color",
	variants: {
		variant: {
			underline: "rounded-full",
			pill: "inset-0 -z-10 rounded-full shadow-sm"
		},
		// Only consulted for the underline variant (pill covers the whole tab).
		position: {
			top: "",
			bottom: "",
			left: "",
			right: ""
		}
	},
	compoundVariants: [
		{
			variant: "underline",
			position: "top",
			class: "inset-x-0 bottom-0 h-0.5"
		},
		{
			variant: "underline",
			position: "bottom",
			class: "inset-x-0 top-0 h-0.5"
		},
		{
			variant: "underline",
			position: "left",
			class: "inset-y-0 right-0 w-0.5"
		},
		{
			variant: "underline",
			position: "right",
			class: "inset-y-0 left-0 w-0.5"
		}
	],
	defaultVariants: {
		variant: "underline",
		position: "top"
	}
});
const defaultTabPrefix = cva({
	base: "",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} },
	defaultVariants: { size: "normal" }
});
const defaultTabSuffix = cva({
	base: "",
	variants: { size: {
		small: "",
		normal: "",
		large: ""
	} },
	defaultVariants: { size: "normal" }
});
export const tabbarTheme = {
	root: defaultTabbar,
	tab: defaultTab,
	indicator: defaultTabIndicator,
	staticIndicator: defaultTabStaticIndicator,
	prefix: defaultTabPrefix,
	suffix: defaultTabSuffix
};
export const setTabbarTheme = setComponentTheme("tabbar");
export const useTabbarTheme = useComponentTheme("tabbar", tabbarTheme);

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxtQkFBbUIseUJBQXlCO0FBQ3JELFNBQVMsV0FBcUM7QUFFOUMsTUFBTSxnQkFBZ0IsSUFBSTs7Q0FFekIsTUFBTTtDQUNOLFVBQVU7RUFDVCxhQUFhOztHQUVaLFlBQVk7R0FDWixVQUFVO0VBQ1g7RUFDQSxXQUFXO0dBQ1YsT0FBTztHQUNQLFFBQVE7R0FDUixLQUFLO0VBQ047RUFDQSxNQUFNO0dBQ0wsT0FBTztHQUNQLFFBQVE7R0FDUixPQUFPO0VBQ1I7RUFDQSxTQUFTO0dBQ1IsV0FBVztHQUNYLE1BQU07RUFDUDtFQUNBLFdBQVc7R0FDVixNQUFNO0dBQ04sT0FBTztFQUNSO0NBQ0Q7Q0FDQSxrQkFBa0I7O0NBRWpCO0VBQUUsU0FBUztFQUFRLGFBQWE7RUFBWSxPQUFPO0NBQWMsSUFDakU7RUFBRSxTQUFTO0VBQVEsV0FBVztFQUFNLE9BQU87Q0FBUyxDQUNyRDtDQUNBLGlCQUFpQjtFQUNoQixhQUFhO0VBQ2IsV0FBVztFQUNYLE1BQU07RUFDTixTQUFTO0NBQ1Y7QUFDRCxDQUFDO0FBRUQsTUFBTSxhQUFhLElBQUk7Ozs7Ozs7O0NBUXRCLE1BQU07Q0FDTixVQUFVO0VBQ1QsTUFBTTtHQUNMLE9BQU87R0FDUCxRQUFRO0dBQ1IsT0FBTztFQUNSO0VBQ0EsT0FBTztHQUNOLFlBQVk7R0FDWixTQUFTO0dBQ1QsV0FBVztHQUNYLFlBQVk7R0FDWixRQUFRO0dBQ1IsU0FBUztHQUNULFNBQVM7R0FDVCxNQUFNO0VBQ1A7RUFDQSxRQUFRO0dBQ1AsTUFBTTtHQUNOLE9BQU87RUFDUjtFQUNBLFNBQVM7Ozs7R0FJUixNQUFNO0dBQ04sT0FBTztFQUNSO0VBQ0EsVUFBVTtHQUNULE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQSxhQUFhO0dBQ1osWUFBWTtHQUNaLFVBQVU7RUFDWDtFQUNBLFVBQVU7R0FDVCxLQUFLO0dBQ0wsUUFBUTtHQUNSLE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQSxTQUFTO0dBQ1IsV0FBVztHQUNYLE1BQU07RUFDUDtFQUNBLFdBQVc7R0FDVixNQUFNO0dBQ04sT0FBTztFQUNSO0NBQ0Q7Q0FDQSxpQkFBaUI7RUFDaEIsT0FBTztFQUNQLE1BQU07RUFDTixRQUFRO0VBQ1IsU0FBUztFQUNULFVBQVU7RUFDVixhQUFhO0VBQ2IsVUFBVTtFQUNWLFNBQVM7Q0FDVjtDQUNBLGtCQUFrQjs7Ozs7Q0FLakI7RUFBRSxRQUFRO0VBQU0sU0FBUztFQUFhLE9BQU87Q0FBa0IsSUFDL0Q7RUFBRSxRQUFRO0VBQU0sU0FBUztFQUFRLE9BQU87Q0FBc0IsQ0FDL0Q7QUFDRCxDQUFDOzs7OztBQU1ELE1BQU0sc0JBQXNCLElBQUk7Q0FDL0IsTUFBTTtDQUNOLFVBQVUsRUFDVCxTQUFTO0VBQ1IsV0FBVzs7O0VBR1gsTUFBTTtDQUNQLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsU0FBUyxZQUNWO0FBQ0QsQ0FBQzs7Ozs7QUFNRCxNQUFNLDRCQUE0QixJQUFJO0NBQ3JDLE1BQU07Q0FDTixVQUFVO0VBQ1QsU0FBUztHQUNSLFdBQVc7R0FDWCxNQUFNO0VBQ1A7O0VBRUEsVUFBVTtHQUNULEtBQUs7R0FDTCxRQUFRO0dBQ1IsTUFBTTtHQUNOLE9BQU87RUFDUjtDQUNEO0NBQ0Esa0JBQWtCO0VBQ2pCO0dBQUUsU0FBUztHQUFhLFVBQVU7R0FBTyxPQUFPO0VBQTJCO0VBQzNFO0dBQUUsU0FBUztHQUFhLFVBQVU7R0FBVSxPQUFPO0VBQXdCO0VBQzNFO0dBQUUsU0FBUztHQUFhLFVBQVU7R0FBUSxPQUFPO0VBQTBCO0VBQzNFO0dBQUUsU0FBUztHQUFhLFVBQVU7R0FBUyxPQUFPO0VBQXlCO0NBQzVFO0NBQ0EsaUJBQWlCO0VBQ2hCLFNBQVM7RUFDVCxVQUFVO0NBQ1g7QUFDRCxDQUFDO0FBRUQsTUFBTSxtQkFBbUIsSUFBSTtDQUM1QixNQUFNO0NBQ04sVUFBVSxFQUNULE1BQU07RUFDTCxPQUFPO0VBQ1AsUUFBUTtFQUNSLE9BQU87Q0FDUixFQUNEO0NBQ0EsaUJBQWlCLEVBQ2hCLE1BQU0sU0FDUDtBQUNELENBQUM7QUFFRCxNQUFNLG1CQUFtQixJQUFJO0NBQzVCLE1BQU07Q0FDTixVQUFVLEVBQ1QsTUFBTTtFQUNMLE9BQU87RUFDUCxRQUFRO0VBQ1IsT0FBTztDQUNSLEVBQ0Q7Q0FDQSxpQkFBaUIsRUFDaEIsTUFBTSxTQUNQO0FBQ0QsQ0FBQztBQUVELE9BQU8sTUFBTSxjQUFjO0NBQzFCLE1BQU07Q0FDTixLQUFLO0NBQ0wsV0FBVztDQUNYLGlCQUFpQjtDQUNqQixRQUFRO0NBQ1IsUUFBUTtBQUNUO0FBSUEsT0FBTyxNQUFNLGlCQUFpQixrQkFBK0IsUUFBUTtBQUNyRSxPQUFPLE1BQU0saUJBQWlCLGtCQUErQixVQUFVLFdBQVciLCJuYW1lcyI6W10sInNvdXJjZXMiOlsidGFiYmFyLnRoZW1lLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldENvbXBvbmVudFRoZW1lLCB1c2VDb21wb25lbnRUaGVtZSB9IGZyb20gJyRsaWIvdXRpbHMvY3ZhL2luZGV4LmpzJztcbmltcG9ydCB7IGN2YSwgdHlwZSBJbmZlckNvbXBvbmVudFRoZW1lIH0gZnJvbSAnJGxpYi91dGlscy9jdmEvaW5kZXguanMnO1xuXG5jb25zdCBkZWZhdWx0VGFiYmFyID0gY3ZhKHtcblx0Ly8gcmVsYXRpdmU6IHRoZSBzaGFyZWQgYWN0aXZlIGluZGljYXRvciBpcyBwb3NpdGlvbmVkIGFnYWluc3QgdGhlIHJvb3QuXG5cdGJhc2U6ICdyZWxhdGl2ZSBmbGV4IHctZnVsbCcsXG5cdHZhcmlhbnRzOiB7XG5cdFx0b3JpZW50YXRpb246IHtcblx0XHRcdC8vIFNjcm9sbCAobm8gdmlzaWJsZSBzY3JvbGxiYXIpIHdoZW4gdGhlIHRhYnMgb3ZlcmZsb3cgdGhlaXIgdHJhY2suXG5cdFx0XHRob3Jpem9udGFsOiAnZmxleC1yb3cgb3ZlcmZsb3cteC1hdXRvIHNjcm9sbGJhci1ub25lJyxcblx0XHRcdHZlcnRpY2FsOiAnZmxleC1jb2wgdy1maXQgb3ZlcmZsb3cteS1hdXRvIHNjcm9sbGJhci1ub25lJ1xuXHRcdH0sXG5cdFx0YWxpZ25tZW50OiB7XG5cdFx0XHRzdGFydDogJ2p1c3RpZnktc3RhcnQnLFxuXHRcdFx0Y2VudGVyOiAnanVzdGlmeS1jZW50ZXInLFxuXHRcdFx0ZW5kOiAnanVzdGlmeS1lbmQnXG5cdFx0fSxcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ2dhcC0wLjUnLFxuXHRcdFx0bm9ybWFsOiAnZ2FwLTEnLFxuXHRcdFx0bGFyZ2U6ICdnYXAtMS41J1xuXHRcdH0sXG5cdFx0dmFyaWFudDoge1xuXHRcdFx0dW5kZXJsaW5lOiAnJyxcblx0XHRcdHBpbGw6ICd3LWZpdCByb3VuZGVkLWZ1bGwgYmctYmFja2dyb3VuZC1tdXRlZC82MCBwLTEnXG5cdFx0fSxcblx0XHRmdWxsV2lkdGg6IHtcblx0XHRcdHRydWU6ICd3LWZ1bGwnLFxuXHRcdFx0ZmFsc2U6ICcnXG5cdFx0fVxuXHR9LFxuXHRjb21wb3VuZFZhcmlhbnRzOiBbXG5cdFx0Ly8gQSB2ZXJ0aWNhbCBwaWxsIHRyYWNrIHNob3VsZG4ndCBiZSBhIHN0YWRpdW0g4oCUIHNvZnRlbiB0byBhIGxhcmdlIHJhZGl1cy5cblx0XHR7IHZhcmlhbnQ6ICdwaWxsJywgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcsIGNsYXNzOiAncm91bmRlZC0yeGwnIH0sXG5cdFx0eyB2YXJpYW50OiAncGlsbCcsIGZ1bGxXaWR0aDogdHJ1ZSwgY2xhc3M6ICd3LWZ1bGwnIH1cblx0XSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0b3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcblx0XHRhbGlnbm1lbnQ6ICdzdGFydCcsXG5cdFx0c2l6ZTogJ25vcm1hbCcsXG5cdFx0dmFyaWFudDogJ3VuZGVybGluZSdcblx0fVxufSk7XG5cbmNvbnN0IGRlZmF1bHRUYWIgPSBjdmEoe1xuXHQvLyBmb2N1cy12aXNpYmxlIG9ubHkgbWF0Y2hlcyBrZXlib2FyZC1kcml2ZW4gZm9jdXMgKGFycm93cy9UYWIpLCBzbyBwb2ludGVyXG5cdC8vIGNsaWNrcyBuZXZlciBzaG93IHRoZSByaW5nLiByaW5nLWluc2V0OiB0aGUgc2Nyb2xsIGNvbnRhaW5lcidzIG92ZXJmbG93LXlcblx0Ly8gKGZvcmNlZCB0byBhdXRvIGJ5IG92ZXJmbG93LXgpIHdvdWxkIG90aGVyd2lzZSBjbGlwIGFuIG91dHNldCByaW5nLlxuXHQvLyB3aGl0ZXNwYWNlLW5vd3JhcCArIGRlZmF1bHQgZmxleCBtaW4td2lkdGg6YXV0byBtYWtlIHRhYnMgb3ZlcmZsb3cgKGFuZFxuXHQvLyBzY3JvbGwpIHJhdGhlciB0aGFuIGNvbXByZXNzIHdoZW4gdGhleSBkb24ndCBmaXQuIHRyYW5zaXRpb24tY29sb3JzIChOT1Rcblx0Ly8gdHJhbnNpdGlvbi1hbGwpIGVhc2VzIG9ubHkgdGhlIGxhYmVsIGNvbG91ciBhcyB0aGUgaW5kaWNhdG9yIHNsaWRlcyDigJQgc2NvcGVkXG5cdC8vIHRvIGNvbG91ciBzbyBpdCBuZXZlciBsYWdzIGEgbGF5b3V0L3RyYW5zZm9ybSBjaGFuZ2UuXG5cdGJhc2U6ICdyb3VuZGVkIHJlbGF0aXZlIGN1cnNvci1wb2ludGVyIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdXRsaW5lLW5vbmUgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1mb3JlZ3JvdW5kLzcwIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTE1MCBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctaW5zZXQgZm9jdXMtdmlzaWJsZTpyaW5nLWNvbG9yLzQ1Jyxcblx0dmFyaWFudHM6IHtcblx0XHRzaXplOiB7XG5cdFx0XHRzbWFsbDogJ3B4LTIgcHktMSB0ZXh0LXhzIGdhcC0xJyxcblx0XHRcdG5vcm1hbDogJ3B4LTMgcHktMSB0ZXh0LXNtIGdhcC0yICcsXG5cdFx0XHRsYXJnZTogJ3B4LTQgcHktMSB0ZXh0LWJhc2UgZ2FwLTIuNSAnXG5cdFx0fSxcblx0XHRjb2xvcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJycsXG5cdFx0XHRwcmltYXJ5OiAnJyxcblx0XHRcdHNlY29uZGFyeTogJycsXG5cdFx0XHRmb3JlZ3JvdW5kOiAnJyxcblx0XHRcdGRhbmdlcjogJycsXG5cdFx0XHRzdWNjZXNzOiAnJyxcblx0XHRcdHdhcm5pbmc6ICcnLFxuXHRcdFx0aW5mbzogJydcblx0XHR9LFxuXHRcdGFjdGl2ZToge1xuXHRcdFx0dHJ1ZTogJycsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdGZvY3VzZWQ6IHtcblx0XHRcdC8vIE5vIGJhY2tncm91bmQgY2hhbmdlIG9uIGZvY3VzIOKAlCBpdCBjbGFzaGVzIHdpdGggdGhlIHNsaWRpbmcgaW5kaWNhdG9yXG5cdFx0XHQvLyAoZXNwZWNpYWxseSB0aGUgcGlsbCkuIEtleWJvYXJkIGZvY3VzIGlzIHN0aWxsIHNpZ25hbGxlZCBieSB0aGUgdGV4dFxuXHRcdFx0Ly8gbGlmdGluZyB0byBmdWxsIGNvbnRyYXN0LlxuXHRcdFx0dHJ1ZTogJ3RleHQtZm9yZWdyb3VuZCcsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdGRpc2FibGVkOiB7XG5cdFx0XHR0cnVlOiAnb3BhY2l0eS01MCBjdXJzb3Itbm90LWFsbG93ZWQgcG9pbnRlci1ldmVudHMtbm9uZScsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdG9yaWVudGF0aW9uOiB7XG5cdFx0XHRob3Jpem9udGFsOiAnJyxcblx0XHRcdHZlcnRpY2FsOiAndy1mdWxsJ1xuXHRcdH0sXG5cdFx0cG9zaXRpb246IHtcblx0XHRcdHRvcDogJycsXG5cdFx0XHRib3R0b206ICcnLFxuXHRcdFx0bGVmdDogJycsXG5cdFx0XHRyaWdodDogJydcblx0XHR9LFxuXHRcdHZhcmlhbnQ6IHtcblx0XHRcdHVuZGVybGluZTogJycsXG5cdFx0XHRwaWxsOiAncm91bmRlZC1mdWxsJ1xuXHRcdH0sXG5cdFx0ZnVsbFdpZHRoOiB7XG5cdFx0XHR0cnVlOiAndy1mdWxsJyxcblx0XHRcdGZhbHNlOiAnJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0Y29sb3I6ICdwcmltYXJ5Jyxcblx0XHRzaXplOiAnbm9ybWFsJyxcblx0XHRhY3RpdmU6IGZhbHNlLFxuXHRcdGZvY3VzZWQ6IGZhbHNlLFxuXHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuXHRcdHBvc2l0aW9uOiAndG9wJyxcblx0XHR2YXJpYW50OiAndW5kZXJsaW5lJ1xuXHR9LFxuXHRjb21wb3VuZFZhcmlhbnRzOiBbXG5cdFx0Ly8gVGhlIG1vdmluZyBpbmRpY2F0b3IgKHNlZSB0aGUgYGluZGljYXRvcmAgcGFydCkgY2FycmllcyB0aGUgdW5kZXJsaW5lL3BpbGxcblx0XHQvLyB2aXN1YWxzLiBBY3RpdmUtdGFiIHRleHQ6IHRoZSB1bmRlcmxpbmUgbGVhdmVzIGl0IG9uIHRoZSBwYWdlIHN1cmZhY2UgKGZ1bGxcblx0XHQvLyBjb250cmFzdCBmb3JlZ3JvdW5kKTsgdGhlIHBpbGwgc2l0cyBvbiBhIGBjb2xvcmAtZmlsbGVkIHN1cmZhY2UsIHNvIGl0cyB0ZXh0XG5cdFx0Ly8gZmxpcHMgdG8gdGhhdCBjb2xvcidzIGNvbnRyYXN0IHRvbmUuXG5cdFx0eyBhY3RpdmU6IHRydWUsIHZhcmlhbnQ6ICd1bmRlcmxpbmUnLCBjbGFzczogJ3RleHQtZm9yZWdyb3VuZCcgfSxcblx0XHR7IGFjdGl2ZTogdHJ1ZSwgdmFyaWFudDogJ3BpbGwnLCBjbGFzczogJ3RleHQtY29sb3ItY29udHJhc3QnIH1cblx0XVxufSk7XG5cbi8vIFRoZSBzaW5nbGUgc2hhcmVkIGFjdGl2ZSBpbmRpY2F0b3IuIEl0IGlzIG1lYXN1cmVkIG9udG8gdGhlIGFjdGl2ZSB0YWIgYnkgdGhlXG4vLyBjb21wb25lbnQgKGlubGluZSB0cmFuc2Zvcm0vd2lkdGgvaGVpZ2h0KSBhbmQgc2xpZGVzIHRoZXJlOyBgZGF0YS1yZWFkeWBcbi8vIGVuYWJsZXMgdGhlIHRyYW5zaXRpb24gb25seSBhZnRlciB0aGUgZmlyc3QgcGxhY2VtZW50IHNvIG1vdW50IGRvZXNuJ3QgYW5pbWF0ZVxuLy8gZnJvbSB0aGUgb3JpZ2luLlxuY29uc3QgZGVmYXVsdFRhYkluZGljYXRvciA9IGN2YSh7XG5cdGJhc2U6ICdwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGxlZnQtMCB0b3AtMCB3aWxsLWNoYW5nZS10cmFuc2Zvcm0gZGF0YS1bcmVhZHk9dHJ1ZV06dHJhbnNpdGlvbi1bdHJhbnNmb3JtLHdpZHRoLGhlaWdodF0gZGF0YS1bcmVhZHk9dHJ1ZV06ZHVyYXRpb24tMzAwIGRhdGEtW3JlYWR5PXRydWVdOmVhc2UtW2N1YmljLWJlemllcigwLjQsMCwwLjIsMSldJyxcblx0dmFyaWFudHM6IHtcblx0XHR2YXJpYW50OiB7XG5cdFx0XHR1bmRlcmxpbmU6ICdyb3VuZGVkLWZ1bGwgYmctY29sb3InLFxuXHRcdFx0Ly8gQ29sb3JlZCByYWlzZWQgcGlsbCAoZHJpdmVuIGJ5IGRhdGEtY29sb3Igb24gdGhlIGluZGljYXRvcikuIGNvbG9yXG5cdFx0XHQvLyAnYmFja2dyb3VuZCcgZ2l2ZXMgdGhlIG5ldXRyYWwgc2VnbWVudGVkLWNvbnRyb2wgbG9vay5cblx0XHRcdHBpbGw6ICdyb3VuZGVkLWZ1bGwgYmctY29sb3Igc2hhZG93LXNtJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0dmFyaWFudDogJ3VuZGVybGluZSdcblx0fVxufSk7XG5cbi8vIFRoZSBzdGF0aWMgKENTUy1vbmx5KSBpbmRpY2F0b3IsIHJlbmRlcmVkIElOU0lERSB0aGUgYWN0aXZlIHRhYiBmb3IgU1NSIGFuZCB0aGVcbi8vIHByZS1oeWRyYXRpb24gd2luZG93LiBJdCBpcyBwb3NpdGlvbmVkIHB1cmVseSBieSBsYXlvdXQgKG5vIEpTIG1lYXN1cmVtZW50KSwgc29cbi8vIGl0IHJlbmRlcnMgYXQgdGhlIGNvcnJlY3QgcGxhY2Ugb24gdGhlIHNlcnZlci4gT25jZSBoeWRyYXRlZCwgdGhlIGNvbXBvbmVudFxuLy8gc3dhcHMgaXQgZm9yIHRoZSBtZWFzdXJlZCBgaW5kaWNhdG9yYCBhYm92ZSBhdCB0aGUgaWRlbnRpY2FsIHNwb3QuXG5jb25zdCBkZWZhdWx0VGFiU3RhdGljSW5kaWNhdG9yID0gY3ZhKHtcblx0YmFzZTogJ3BvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgYmctY29sb3InLFxuXHR2YXJpYW50czoge1xuXHRcdHZhcmlhbnQ6IHtcblx0XHRcdHVuZGVybGluZTogJ3JvdW5kZWQtZnVsbCcsXG5cdFx0XHRwaWxsOiAnaW5zZXQtMCAtei0xMCByb3VuZGVkLWZ1bGwgc2hhZG93LXNtJ1xuXHRcdH0sXG5cdFx0Ly8gT25seSBjb25zdWx0ZWQgZm9yIHRoZSB1bmRlcmxpbmUgdmFyaWFudCAocGlsbCBjb3ZlcnMgdGhlIHdob2xlIHRhYikuXG5cdFx0cG9zaXRpb246IHtcblx0XHRcdHRvcDogJycsXG5cdFx0XHRib3R0b206ICcnLFxuXHRcdFx0bGVmdDogJycsXG5cdFx0XHRyaWdodDogJydcblx0XHR9XG5cdH0sXG5cdGNvbXBvdW5kVmFyaWFudHM6IFtcblx0XHR7IHZhcmlhbnQ6ICd1bmRlcmxpbmUnLCBwb3NpdGlvbjogJ3RvcCcsIGNsYXNzOiAnaW5zZXQteC0wIGJvdHRvbS0wIGgtMC41JyB9LFxuXHRcdHsgdmFyaWFudDogJ3VuZGVybGluZScsIHBvc2l0aW9uOiAnYm90dG9tJywgY2xhc3M6ICdpbnNldC14LTAgdG9wLTAgaC0wLjUnIH0sXG5cdFx0eyB2YXJpYW50OiAndW5kZXJsaW5lJywgcG9zaXRpb246ICdsZWZ0JywgY2xhc3M6ICdpbnNldC15LTAgcmlnaHQtMCB3LTAuNScgfSxcblx0XHR7IHZhcmlhbnQ6ICd1bmRlcmxpbmUnLCBwb3NpdGlvbjogJ3JpZ2h0JywgY2xhc3M6ICdpbnNldC15LTAgbGVmdC0wIHctMC41JyB9XG5cdF0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdHZhcmlhbnQ6ICd1bmRlcmxpbmUnLFxuXHRcdHBvc2l0aW9uOiAndG9wJ1xuXHR9XG59KTtcblxuY29uc3QgZGVmYXVsdFRhYlByZWZpeCA9IGN2YSh7XG5cdGJhc2U6ICcnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdHNtYWxsOiAnJyxcblx0XHRcdG5vcm1hbDogJycsXG5cdFx0XHRsYXJnZTogJydcblx0XHR9XG5cdH0sXG5cdGRlZmF1bHRWYXJpYW50czoge1xuXHRcdHNpemU6ICdub3JtYWwnXG5cdH1cbn0pO1xuXG5jb25zdCBkZWZhdWx0VGFiU3VmZml4ID0gY3ZhKHtcblx0YmFzZTogJycsXG5cdHZhcmlhbnRzOiB7XG5cdFx0c2l6ZToge1xuXHRcdFx0c21hbGw6ICcnLFxuXHRcdFx0bm9ybWFsOiAnJyxcblx0XHRcdGxhcmdlOiAnJ1xuXHRcdH1cblx0fSxcblx0ZGVmYXVsdFZhcmlhbnRzOiB7XG5cdFx0c2l6ZTogJ25vcm1hbCdcblx0fVxufSk7XG5cbmV4cG9ydCBjb25zdCB0YWJiYXJUaGVtZSA9IHtcblx0cm9vdDogZGVmYXVsdFRhYmJhcixcblx0dGFiOiBkZWZhdWx0VGFiLFxuXHRpbmRpY2F0b3I6IGRlZmF1bHRUYWJJbmRpY2F0b3IsXG5cdHN0YXRpY0luZGljYXRvcjogZGVmYXVsdFRhYlN0YXRpY0luZGljYXRvcixcblx0cHJlZml4OiBkZWZhdWx0VGFiUHJlZml4LFxuXHRzdWZmaXg6IGRlZmF1bHRUYWJTdWZmaXhcbn07XG5cbmV4cG9ydCB0eXBlIFRhYmJhclRoZW1lID0gdHlwZW9mIHRhYmJhclRoZW1lO1xuZXhwb3J0IHR5cGUgVGFiYmFyVGhlbWVQcm9wcyA9IEluZmVyQ29tcG9uZW50VGhlbWU8VGFiYmFyVGhlbWU+O1xuZXhwb3J0IGNvbnN0IHNldFRhYmJhclRoZW1lID0gc2V0Q29tcG9uZW50VGhlbWU8VGFiYmFyVGhlbWU+KCd0YWJiYXInKTtcbmV4cG9ydCBjb25zdCB1c2VUYWJiYXJUaGVtZSA9IHVzZUNvbXBvbmVudFRoZW1lPFRhYmJhclRoZW1lPigndGFiYmFyJywgdGFiYmFyVGhlbWUpO1xuIl19