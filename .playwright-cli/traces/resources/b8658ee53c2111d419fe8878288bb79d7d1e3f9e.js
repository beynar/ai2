import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarMenuList.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarMenuList[$.FILENAME] = 'src/lib/components/Sidebar/SidebarMenuList.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import SidebarMenuItem from "/src/lib/components/Sidebar/SidebarMenuItem.svelte?t=1783864665558";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<ul data-slot="sidebar-menu" data-sidebar="menu"></ul>`), SidebarMenuList[$.FILENAME], [[28, 0]]);

function SidebarMenuList($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarMenuList);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var ul = root();

	$.add_svelte_meta(
		() => $.each(ul, 23, () => $$props.items, (item, index) => item.label + index, ($$anchor, item) => {
			var fragment = $.comment();
			var node = $.first_child(fragment);

			$.add_svelte_meta(
				() => SidebarMenuItem(node, {
					get item() {
						return $.get(item);
					},

					get api() {
						return $$props.api;
					},

					get collapseIcon() {
						return $$props.collapseIcon;
					},

					get tooltips() {
						return $$props.tooltips;
					},

					get theme() {
						return $$props.theme;
					}
				}),
				'component',
				SidebarMenuList,
				30,
				2,
				{ componentTag: 'SidebarMenuItem' }
			);

			$.append($$anchor, fragment);
		}),
		'each',
		SidebarMenuList,
		29,
		1
	);

	$.reset(ul);
	$.template_effect(($0) => $.set_class(ul, 1, $0), [() => $.clsx($.get(classes).menu())]);
	$.append($$anchor, ul);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarMenuList = $.hmr(SidebarMenuList);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarMenuList[$.HMR].update(module.default);
	});
}

export default SidebarMenuList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0MsT0FBTyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs0Q0FSN0UsQ0FBQzs7OztDQXdCQSxNQUFNLE9BQU8seUJBQVksZUFBZTs7S0FHeEMsRUFBRTs7O2VBQUYsRUFBRSw0QkFDYyxJQUFJLFlBQVMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQS9CLElBQUk7Ozs7O1VBQ2xCLGVBQWU7O21CQUFFLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FGdkIsRUFBRTt1Q0FBRixFQUFFLDhCQUFxRCxPQUFPLEVBQUMsSUFBSTtvQkFBbkUsRUFBRTs7O0FBRksiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXJNZW51TGlzdC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHR5cGUge1xuXHRcdFNpZGViYXJBcGksXG5cdFx0U2lkZWJhckNvbGxhcHNlSWNvbixcblx0XHRTaWRlYmFyTWVudUVudHJ5LFxuXHRcdFNpZGViYXJUb29sdGlwTW9kZVxuXHR9IGZyb20gJy4vc2lkZWJhci5wcm9wcy5qcyc7XG5cdGltcG9ydCBTaWRlYmFyTWVudUl0ZW0gZnJvbSAnLi9TaWRlYmFyTWVudUl0ZW0uc3ZlbHRlJztcblx0aW1wb3J0IHsgdXNlU2lkZWJhclRoZW1lLCB0eXBlIFNpZGViYXJUaGVtZVByb3BzIH0gZnJvbSAnLi9zaWRlYmFyLnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdGl0ZW1zLFxuXHRcdGFwaSxcblx0XHRjb2xsYXBzZUljb24sXG5cdFx0dG9vbHRpcHMsXG5cdFx0dGhlbWVcblx0fToge1xuXHRcdGl0ZW1zOiBTaWRlYmFyTWVudUVudHJ5W107XG5cdFx0YXBpOiBTaWRlYmFyQXBpO1xuXHRcdGNvbGxhcHNlSWNvbjogU2lkZWJhckNvbGxhcHNlSWNvbjtcblx0XHR0b29sdGlwczogU2lkZWJhclRvb2x0aXBNb2RlO1xuXHRcdHRoZW1lPzogU2lkZWJhclRoZW1lUHJvcHM7XG5cdH0gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2lkZWJhclRoZW1lKHRoZW1lKSk7XG48L3NjcmlwdD5cblxuPHVsIGRhdGEtc2xvdD1cInNpZGViYXItbWVudVwiIGRhdGEtc2lkZWJhcj1cIm1lbnVcIiBjbGFzcz17Y2xhc3Nlcy5tZW51KCl9PlxuXHR7I2VhY2ggaXRlbXMgYXMgaXRlbSwgaW5kZXggKGl0ZW0ubGFiZWwgKyBpbmRleCl9XG5cdFx0PFNpZGViYXJNZW51SXRlbSB7aXRlbX0ge2FwaX0ge2NvbGxhcHNlSWNvbn0ge3Rvb2x0aXBzfSB7dGhlbWV9IC8+XG5cdHsvZWFjaH1cbjwvdWw+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1NpZGViYXIvU2lkZWJhck1lbnVMaXN0LnN2ZWx0ZSJ9