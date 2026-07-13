import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarMenuSubItem.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarMenuSubItem[$.FILENAME] = 'src/lib/components/Sidebar/SidebarMenuSubItem.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<a data-slot="sidebar-menu-sub-button" data-sidebar="menu-sub-button"><!> <span> </span></a>`), SidebarMenuSubItem[$.FILENAME], [[17, 2, [[30, 3]]]]);
var root_1 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-sub-button" data-sidebar="menu-sub-button"><!> <span> </span></button>`), SidebarMenuSubItem[$.FILENAME], [[33, 2, [[44, 3]]]]);
var root_2 = $.add_locations($.from_html(`<li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" class="group/menu-sub-item relative"><!></li>`), SidebarMenuSubItem[$.FILENAME], [[11, 0]]);

function SidebarMenuSubItem($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarMenuSubItem);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var li = root_2();
	var node = $.child(li);

	{
		var consequent = ($$anchor) => {
			var a = root();
			var node_1 = $.child(a);

			$.add_svelte_meta(
				() => SidebarIcon(node_1, {
					get icon() {
						return $$props.sub.icon;
					}
				}),
				'component',
				SidebarMenuSubItem,
				29,
				3,
				{ componentTag: 'SidebarIcon' }
			);

			var span = $.sibling(node_1, 2);
			var text = $.child(span, true);

			$.reset(span);
			$.reset(a);

			$.template_effect(
				($0) => {
					$.set_attribute(a, 'href', $$props.sub.href);
					$.set_attribute(a, 'data-size', $$props.sub.size ?? 'md');
					$.set_attribute(a, 'data-active', $$props.sub.isActive ? 'true' : undefined);
					$.set_attribute(a, 'aria-current', $$props.sub.isActive ? 'page' : undefined);
					$.set_attribute(a, 'aria-disabled', $$props.sub.disabled || undefined);
					$.set_attribute(a, 'tabindex', $$props.sub.disabled ? -1 : undefined);
					$.set_class(a, 1, $0);
					$.set_text(text, $$props.sub.label);
				},
				[
					() => $.clsx($.get(classes).subButton({ size: $$props.sub.size }))
				]
			);

			$.delegated('click', a, function (...$$args) {
				$.apply(() => $$props.sub.onClick, this, $$args, SidebarMenuSubItem, [27, 12]);
			});

			$.append($$anchor, a);
		};

		var alternate = ($$anchor) => {
			var button = root_1();
			var node_2 = $.child(button);

			$.add_svelte_meta(
				() => SidebarIcon(node_2, {
					get icon() {
						return $$props.sub.icon;
					}
				}),
				'component',
				SidebarMenuSubItem,
				43,
				3,
				{ componentTag: 'SidebarIcon' }
			);

			var span_1 = $.sibling(node_2, 2);
			var text_1 = $.child(span_1, true);

			$.reset(span_1);
			$.reset(button);

			$.template_effect(
				($0) => {
					$.set_attribute(button, 'data-size', $$props.sub.size ?? 'md');
					$.set_attribute(button, 'data-active', $$props.sub.isActive ? 'true' : undefined);
					button.disabled = $$props.sub.disabled || undefined;
					$.set_class(button, 1, $0);
					$.set_text(text_1, $$props.sub.label);
				},
				[
					() => $.clsx($.get(classes).subButton({ size: $$props.sub.size }))
				]
			);

			$.delegated('click', button, function (...$$args) {
				$.apply(() => $$props.sub.onClick, this, $$args, SidebarMenuSubItem, [41, 12]);
			});

			$.append($$anchor, button);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.sub.href) $$render(consequent); else $$render(alternate, -1);
			}),
			'if',
			SidebarMenuSubItem,
			16,
			1
		);
	}

	$.reset(li);
	$.append($$anchor, li);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarMenuSubItem = $.hmr(SidebarMenuSubItem);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarMenuSubItem[$.HMR].update(module.default);
	});
}

export default SidebarMenuSubItem;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxXQUFXLE1BQU0sc0JBQXNCO0FBQzlDLE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs7OytDQUg3RSxDQUFDOzs7O0NBT0EsTUFBTSxPQUFPLHlCQUFZLGVBQWU7O0tBR3hDO29CQUFBOzs7O09BTUU7d0JBQUE7OztVQVlDLFdBQVc7O3lCQUFXLElBQUk7Ozs7Ozs7Ozs7T0FDMUIsSUFBSTtzQkFBSixJQUFJOztXQUFKLElBQUk7V0FiTDs7OztxQkFBQSx1QkFDVSxJQUFJO3FCQURkLDRCQUllLElBQUksSUFBSSxJQUFJO3FCQUozQiw4QkFLaUIsUUFBUSxHQUFHLE1BQU0sR0FBRyxTQUFTO3FCQUw5QywrQkFNa0IsUUFBUSxHQUFHLE1BQU0sR0FBRyxTQUFTO3FCQU4vQyxnQ0FPbUIsUUFBUSxJQUFJLFNBQVM7cUJBUHhDLDJCQVFjLFFBQVEsSUFBSSxDQUFDLEdBQUcsU0FBUztpQkFSdkM7a0NBYVcsS0FBSzs7O3dCQUpULE9BQU8sRUFBQyxTQUFTLEdBQUcsSUFBSSxjQUFNLElBQUk7Ozs7d0JBVHpDOzhCQVVhLE9BQU87OztzQkFWcEI7Ozs7T0FnQkE7d0JBQUE7OztVQVVDLFdBQVc7O3lCQUFXLElBQUk7Ozs7Ozs7Ozs7T0FDMUIsTUFBSTt3QkFBSixNQUFJOztXQUFKLE1BQUk7V0FYTDs7OztxQkFBQSxpQ0FJZSxJQUFJLElBQUksSUFBSTtxQkFKM0IsbUNBS2lCLFFBQVEsR0FBRyxNQUFNLEdBQUcsU0FBUztLQUw5Qyw4QkFNYyxRQUFRLElBQUksU0FBUztpQkFObkM7b0NBV1csS0FBSzs7O3dCQUpULE9BQU8sRUFBQyxTQUFTLEdBQUcsSUFBSSxjQUFNLElBQUk7Ozs7d0JBUHpDOzhCQVFhLE9BQU87OztzQkFScEI7Ozs7O29CQWpCTyxJQUFJOzs7Ozs7Ozs7U0FMYjtvQkFBQTs7O0FBRk8iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXJNZW51U3ViSXRlbS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHR5cGUgeyBTaWRlYmFyTWVudVN1YkVudHJ5IH0gZnJvbSAnLi9zaWRlYmFyLnByb3BzLmpzJztcblx0aW1wb3J0IFNpZGViYXJJY29uIGZyb20gJy4vU2lkZWJhckljb24uc3ZlbHRlJztcblx0aW1wb3J0IHsgdXNlU2lkZWJhclRoZW1lLCB0eXBlIFNpZGViYXJUaGVtZVByb3BzIH0gZnJvbSAnLi9zaWRlYmFyLnRoZW1lLmpzJztcblxuXHRsZXQgeyBzdWIsIHRoZW1lIH06IHsgc3ViOiBTaWRlYmFyTWVudVN1YkVudHJ5OyB0aGVtZT86IFNpZGViYXJUaGVtZVByb3BzIH0gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2lkZWJhclRoZW1lKHRoZW1lKSk7XG48L3NjcmlwdD5cblxuPGxpXG5cdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1zdWItaXRlbVwiXG5cdGRhdGEtc2lkZWJhcj1cIm1lbnUtc3ViLWl0ZW1cIlxuXHRjbGFzcz1cImdyb3VwL21lbnUtc3ViLWl0ZW0gcmVsYXRpdmVcIlxuPlxuXHR7I2lmIHN1Yi5ocmVmfVxuXHRcdDxhXG5cdFx0XHRocmVmPXtzdWIuaHJlZn1cblx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1zdWItYnV0dG9uXCJcblx0XHRcdGRhdGEtc2lkZWJhcj1cIm1lbnUtc3ViLWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpemU9e3N1Yi5zaXplID8/ICdtZCd9XG5cdFx0XHRkYXRhLWFjdGl2ZT17c3ViLmlzQWN0aXZlID8gJ3RydWUnIDogdW5kZWZpbmVkfVxuXHRcdFx0YXJpYS1jdXJyZW50PXtzdWIuaXNBY3RpdmUgPyAncGFnZScgOiB1bmRlZmluZWR9XG5cdFx0XHRhcmlhLWRpc2FibGVkPXtzdWIuZGlzYWJsZWQgfHwgdW5kZWZpbmVkfVxuXHRcdFx0dGFiaW5kZXg9e3N1Yi5kaXNhYmxlZCA/IC0xIDogdW5kZWZpbmVkfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuc3ViQnV0dG9uKHsgc2l6ZTogc3ViLnNpemUgfSl9XG5cdFx0XHRvbmNsaWNrPXtzdWIub25DbGlja31cblx0XHQ+XG5cdFx0XHQ8U2lkZWJhckljb24gaWNvbj17c3ViLmljb259IC8+XG5cdFx0XHQ8c3Bhbj57c3ViLmxhYmVsfTwvc3Bhbj5cblx0XHQ8L2E+XG5cdHs6ZWxzZX1cblx0XHQ8YnV0dG9uXG5cdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1zdWItYnV0dG9uXCJcblx0XHRcdGRhdGEtc2lkZWJhcj1cIm1lbnUtc3ViLWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpemU9e3N1Yi5zaXplID8/ICdtZCd9XG5cdFx0XHRkYXRhLWFjdGl2ZT17c3ViLmlzQWN0aXZlID8gJ3RydWUnIDogdW5kZWZpbmVkfVxuXHRcdFx0ZGlzYWJsZWQ9e3N1Yi5kaXNhYmxlZCB8fCB1bmRlZmluZWR9XG5cdFx0XHRjbGFzcz17Y2xhc3Nlcy5zdWJCdXR0b24oeyBzaXplOiBzdWIuc2l6ZSB9KX1cblx0XHRcdG9uY2xpY2s9e3N1Yi5vbkNsaWNrfVxuXHRcdD5cblx0XHRcdDxTaWRlYmFySWNvbiBpY29uPXtzdWIuaWNvbn0gLz5cblx0XHRcdDxzcGFuPntzdWIubGFiZWx9PC9zcGFuPlxuXHRcdDwvYnV0dG9uPlxuXHR7L2lmfVxuPC9saT5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFyTWVudVN1Ykl0ZW0uc3ZlbHRlIn0=