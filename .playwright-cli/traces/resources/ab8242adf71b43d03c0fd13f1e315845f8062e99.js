import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarMobileDrawer.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarMobileDrawer[$.FILENAME] = 'src/lib/components/Sidebar/SidebarMobileDrawer.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { Dialog } from "/src/lib/components/Dialog/index.ts";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<div data-slot="sidebar" data-sidebar="sidebar" data-mobile="true"><!></div>`), SidebarMobileDrawer[$.FILENAME], [[56, 1]]);

function SidebarMobileDrawer($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarMobileDrawer);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const dialogType = $.tag($.derived(() => $.strict_equals($$props.side, 'right') ? 'drawerRight' : 'drawerLeft'), 'dialogType');

	const dialogTheme = {
		override: true,
		content: {
			base: 'relative z-50 flex h-full max-h-full flex-col overflow-hidden rounded-none bg-background p-0 text-foreground shadow-xl will-change-transform transition-transform duration-200 ease-out [&>div]:h-full [&>div]:min-h-0'
		},
		header: { base: 'sr-only' },
		title: { base: 'sr-only' },
		closeButton: { base: 'hidden' }
	};

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	$.add_svelte_meta(
		() => Dialog(node, {
			get open() {
				return $$props.open;
			},

			get onClose() {
				return $$props.close;
			},

			get type() {
				return $.get(dialogType);
			},
			responsive: false,
			thumb: false,
			get title() {
				return $$props.label;
			},
			class: 'md:hidden',
			get theme() {
				return dialogTheme;
			},

			children: $.wrap_snippet(SidebarMobileDrawer, ($$anchor, $$slotProps) => {
				var div = root();
				let styles;
				var node_1 = $.child(div);

				$.add_svelte_meta(() => $.snippet(node_1, () => $$props.children), 'render', SidebarMobileDrawer, 65, 2);
				$.reset(div);

				$.template_effect(
					($0) => {
						$.set_attribute(div, 'data-side', $$props.side);
						$.set_attribute(div, 'dir', $$props.dir);
						$.set_class(div, 1, $0);
						styles = $.set_style(div, '', styles, { '--sidebar-width-mobile': $$props.widthMobile });
						div.dir = div.dir;
					},
					[
						() => $.clsx($.get(classes).mobilePanel({ side: $$props.side }))
					]
				);

				$.append($$anchor, div);
			}),
			$$slots: { default: true }
		}),
		'component',
		SidebarMobileDrawer,
		46,
		0,
		{ componentTag: 'Dialog' }
	);

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarMobileDrawer = $.hmr(SidebarMobileDrawer);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarMobileDrawer[$.HMR].update(module.default);
	});
}

export default SidebarMobileDrawer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxFQUFFLE1BQU0sUUFBK0IsaUNBQWlDO0FBRS9FLE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7OztnREFKN0UsQ0FBQzs7OztDQTBCQSxNQUFNLE9BQU8seUJBQVksZUFBZTtDQUN4QyxNQUFNLFVBQVUsdURBQXFCLE9BQU8sSUFBRyxhQUFhLEdBQUcsWUFBWTs7Q0FDM0UsTUFBTSxXQUFXO0VBQ2hCLFFBQVEsRUFBRSxJQUFJO0VBQ2QsT0FBTztHQUNOLElBQUksRUFBRSx3TkFBdU47O0VBRTlOLE1BQU0sSUFDTCxJQUFJLEVBQUUsU0FBUTtFQUVmLEtBQUssSUFDSixJQUFJLEVBQUUsU0FBUTtFQUVmLFdBQVcsSUFDVixJQUFJLEVBQUUsUUFBTzs7Ozs7Ozs7UUFLZjs7Ozs7Ozs7OztpQkFHTSxVQUFVOztlQUNKLEtBQUs7VUFDVixLQUFLOzs7Ozs7V0FHTCxXQUFXOzs7O1FBRWpCOzt5QkFBQTs7O1lBQUE7Ozs7c0JBQUE7c0JBQUE7a0JBQUE7MkJBQUE7TUFBQTs7O3lCQU9PLE9BQU8sRUFBQyxXQUFXLEdBQUcsSUFBSTs7Ozt1QkFQakM7Ozs7Ozs7Ozs7Ozs7O0FBWk0iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXJNb2JpbGVEcmF3ZXIuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB0eXBlIHsgU25pcHBldCB9IGZyb20gJ3N2ZWx0ZSc7XG5cdGltcG9ydCB7IERpYWxvZywgdHlwZSBEaWFsb2dUaGVtZVByb3BzIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0RpYWxvZy9pbmRleC5qcyc7XG5cdGltcG9ydCB0eXBlIHsgU2lkZWJhclNpZGUgfSBmcm9tICcuL3NpZGViYXIucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VTaWRlYmFyVGhlbWUsIHR5cGUgU2lkZWJhclRoZW1lUHJvcHMgfSBmcm9tICcuL3NpZGViYXIudGhlbWUuanMnO1xuXG5cdGxldCB7XG5cdFx0b3Blbixcblx0XHRjbG9zZSxcblx0XHRzaWRlLFxuXHRcdHdpZHRoTW9iaWxlLFxuXHRcdGRpcixcblx0XHRsYWJlbCxcblx0XHR0aGVtZSxcblx0XHRjaGlsZHJlblxuXHR9OiB7XG5cdFx0b3BlbjogYm9vbGVhbjtcblx0XHRjbG9zZTogKCkgPT4gdm9pZDtcblx0XHRzaWRlOiBTaWRlYmFyU2lkZTtcblx0XHR3aWR0aE1vYmlsZTogc3RyaW5nO1xuXHRcdGRpcj86ICdsdHInIHwgJ3J0bCc7XG5cdFx0bGFiZWw6IHN0cmluZztcblx0XHR0aGVtZT86IFNpZGViYXJUaGVtZVByb3BzO1xuXHRcdGNoaWxkcmVuOiBTbmlwcGV0O1xuXHR9ID0gJHByb3BzKCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZVNpZGViYXJUaGVtZSh0aGVtZSkpO1xuXHRjb25zdCBkaWFsb2dUeXBlID0gJGRlcml2ZWQoc2lkZSA9PT0gJ3JpZ2h0JyA/ICdkcmF3ZXJSaWdodCcgOiAnZHJhd2VyTGVmdCcpO1xuXHRjb25zdCBkaWFsb2dUaGVtZSA9IHtcblx0XHRvdmVycmlkZTogdHJ1ZSxcblx0XHRjb250ZW50OiB7XG5cdFx0XHRiYXNlOiAncmVsYXRpdmUgei01MCBmbGV4IGgtZnVsbCBtYXgtaC1mdWxsIGZsZXgtY29sIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLW5vbmUgYmctYmFja2dyb3VuZCBwLTAgdGV4dC1mb3JlZ3JvdW5kIHNoYWRvdy14bCB3aWxsLWNoYW5nZS10cmFuc2Zvcm0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwIGVhc2Utb3V0IFsmPmRpdl06aC1mdWxsIFsmPmRpdl06bWluLWgtMCdcblx0XHR9LFxuXHRcdGhlYWRlcjoge1xuXHRcdFx0YmFzZTogJ3NyLW9ubHknXG5cdFx0fSxcblx0XHR0aXRsZToge1xuXHRcdFx0YmFzZTogJ3NyLW9ubHknXG5cdFx0fSxcblx0XHRjbG9zZUJ1dHRvbjoge1xuXHRcdFx0YmFzZTogJ2hpZGRlbidcblx0XHR9XG5cdH0gc2F0aXNmaWVzIERpYWxvZ1RoZW1lUHJvcHM7XG48L3NjcmlwdD5cblxuPERpYWxvZ1xuXHR7b3Blbn1cblx0b25DbG9zZT17Y2xvc2V9XG5cdHR5cGU9e2RpYWxvZ1R5cGV9XG5cdHJlc3BvbnNpdmU9e2ZhbHNlfVxuXHR0aHVtYj17ZmFsc2V9XG5cdHRpdGxlPXtsYWJlbH1cblx0Y2xhc3M9XCJtZDpoaWRkZW5cIlxuXHR0aGVtZT17ZGlhbG9nVGhlbWV9XG4+XG5cdDxkaXZcblx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyXCJcblx0XHRkYXRhLXNpZGViYXI9XCJzaWRlYmFyXCJcblx0XHRkYXRhLW1vYmlsZT1cInRydWVcIlxuXHRcdGRhdGEtc2lkZT17c2lkZX1cblx0XHRzdHlsZTotLXNpZGViYXItd2lkdGgtbW9iaWxlPXt3aWR0aE1vYmlsZX1cblx0XHR7ZGlyfVxuXHRcdGNsYXNzPXtjbGFzc2VzLm1vYmlsZVBhbmVsKHsgc2lkZSB9KX1cblx0PlxuXHRcdHtAcmVuZGVyIGNoaWxkcmVuKCl9XG5cdDwvZGl2PlxuPC9EaWFsb2c+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1NpZGViYXIvU2lkZWJhck1vYmlsZURyYXdlci5zdmVsdGUifQ==