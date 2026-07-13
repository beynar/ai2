import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarTreeNode.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarTreeNode[$.FILENAME] = 'src/lib/components/Sidebar/SidebarTreeNode.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import { fileIcon } from "/src/lib/components/Icons/file.ts";
import { folderIcon } from "/src/lib/components/Icons/folder.ts";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import SidebarTreeNodeComponent from "/src/lib/components/Sidebar/SidebarTreeNode.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<ul data-slot="sidebar-menu-sub" data-sidebar="menu-sub"></ul>`), SidebarTreeNode[$.FILENAME], [[33, 3]]);
var root_1 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" data-sidebar="menu-button"><!> <!> <span> </span></button> <!>`, 1), SidebarTreeNode[$.FILENAME], [[20, 2, [[30, 3]]]]);
var root_2 = $.add_locations($.from_html(`<a data-slot="sidebar-menu-button" data-sidebar="menu-button"><!> <span> </span></a>`), SidebarTreeNode[$.FILENAME], [[40, 2, [[50, 3]]]]);
var root_3 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" data-sidebar="menu-button"><!> <span> </span></button>`), SidebarTreeNode[$.FILENAME], [[53, 2, [[62, 3]]]]);
var root_4 = $.add_locations($.from_html(`<li data-slot="sidebar-menu-item" data-sidebar="menu-item"><!></li>`), SidebarTreeNode[$.FILENAME], [[18, 0]]);

function SidebarTreeNode($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarTreeNode);

	let open = $.tag($.state(void 0), 'open');
	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const isOpen = $.tag($.derived(() => $.get(open) ?? $$props.node.defaultOpen ?? false), 'isOpen');
	const hasChildren = $.tag($.derived(() => !!$$props.node.children?.length), 'hasChildren');
	var $$exports = { ...$.legacy_api() };
	var li = root_4();
	var node_1 = $.child(li);

	{
		var consequent_1 = ($$anchor) => {
			var fragment = root_1();
			var button = $.first_child(fragment);
			var node_2 = $.child(button);

			{
				let $0 = $.derived(() => $.get(isOpen) ? 'rotate-90' : '');

				$.add_svelte_meta(
					() => SidebarIcon(node_2, {
						get icon() {
							return caretRightIcon;
						},

						get class() {
							return `transition-transform ${$.get($0) ?? ''}`;
						}
					}),
					'component',
					SidebarTreeNode,
					28,
					3,
					{ componentTag: 'SidebarIcon' }
				);
			}

			var node_3 = $.sibling(node_2, 2);

			{
				let $0 = $.derived(() => $$props.node.icon ?? folderIcon);

				$.add_svelte_meta(
					() => SidebarIcon(node_3, {
						get icon() {
							return $.get($0);
						}
					}),
					'component',
					SidebarTreeNode,
					29,
					3,
					{ componentTag: 'SidebarIcon' }
				);
			}

			var span = $.sibling(node_3, 2);
			var text = $.child(span, true);

			$.reset(span);
			$.reset(button);

			var node_4 = $.sibling(button, 2);

			{
				var consequent = ($$anchor) => {
					var ul = root();

					$.add_svelte_meta(
						() => $.each(ul, 23, () => $$props.node.children ?? [], (child, index) => child.label + index, ($$anchor, child) => {
							var fragment_1 = $.comment();
							var node_5 = $.first_child(fragment_1);

							$.add_svelte_meta(
								() => SidebarTreeNodeComponent(node_5, {
									get node() {
										return $.get(child);
									},

									get theme() {
										return $$props.theme;
									}
								}),
								'component',
								SidebarTreeNode,
								35,
								5,
								{ componentTag: 'SidebarTreeNodeComponent' }
							);

							$.append($$anchor, fragment_1);
						}),
						'each',
						SidebarTreeNode,
						34,
						4
					);

					$.reset(ul);
					$.template_effect(($0) => $.set_class(ul, 1, $0), [() => $.clsx($.get(classes).subMenu())]);
					$.append($$anchor, ul);
				};

				$.add_svelte_meta(
					() => $.if(node_4, ($$render) => {
						if ($.get(isOpen)) $$render(consequent);
					}),
					'if',
					SidebarTreeNode,
					32,
					2
				);
			}

			$.template_effect(
				($0) => {
					$.set_class(button, 1, $0);
					$.set_attribute(button, 'aria-expanded', $.get(isOpen));
					$.set_text(text, $$props.node.label);
				},
				[() => $.clsx($.get(classes).menuButton())]
			);

			$.delegated('click', button, function click() {
				return $.set(open, !$.get(isOpen));
			});

			$.append($$anchor, fragment);
		};

		var consequent_2 = ($$anchor) => {
			var a = root_2();
			var node_6 = $.child(a);

			{
				let $0 = $.derived(() => $$props.node.icon ?? fileIcon);

				$.add_svelte_meta(
					() => SidebarIcon(node_6, {
						get icon() {
							return $.get($0);
						}
					}),
					'component',
					SidebarTreeNode,
					49,
					3,
					{ componentTag: 'SidebarIcon' }
				);
			}

			var span_1 = $.sibling(node_6, 2);
			var text_1 = $.child(span_1, true);

			$.reset(span_1);
			$.reset(a);

			$.template_effect(
				($0) => {
					$.set_attribute(a, 'href', $$props.node.href);
					$.set_attribute(a, 'data-active', $$props.node.isActive ? 'true' : undefined);
					$.set_attribute(a, 'aria-current', $$props.node.isActive ? 'page' : undefined);
					$.set_class(a, 1, $0);
					$.set_text(text_1, $$props.node.label);
				},
				[() => $.clsx($.get(classes).menuButton())]
			);

			$.delegated('click', a, function (...$$args) {
				$.apply(() => $$props.node.onClick, this, $$args, SidebarTreeNode, [47, 12]);
			});

			$.append($$anchor, a);
		};

		var alternate = ($$anchor) => {
			var button_1 = root_3();
			var node_7 = $.child(button_1);

			{
				let $0 = $.derived(() => $$props.node.icon ?? fileIcon);

				$.add_svelte_meta(
					() => SidebarIcon(node_7, {
						get icon() {
							return $.get($0);
						}
					}),
					'component',
					SidebarTreeNode,
					61,
					3,
					{ componentTag: 'SidebarIcon' }
				);
			}

			var span_2 = $.sibling(node_7, 2);
			var text_2 = $.child(span_2, true);

			$.reset(span_2);
			$.reset(button_1);

			$.template_effect(
				($0) => {
					$.set_attribute(button_1, 'data-active', $$props.node.isActive ? 'true' : undefined);
					$.set_class(button_1, 1, $0);
					$.set_text(text_2, $$props.node.label);
				},
				[() => $.clsx($.get(classes).menuButton())]
			);

			$.delegated('click', button_1, function (...$$args) {
				$.apply(() => $$props.node.onClick, this, $$args, SidebarTreeNode, [59, 12]);
			});

			$.append($$anchor, button_1);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.get(hasChildren)) $$render(consequent_1); else if ($$props.node.href) $$render(consequent_2, 1); else $$render(alternate, -1);
			}),
			'if',
			SidebarTreeNode,
			19,
			1
		);
	}

	$.reset(li);
	$.template_effect(($0) => $.set_class(li, 1, $0), [() => $.clsx($.get(classes).menuItem())]);
	$.append($$anchor, li);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarTreeNode = $.hmr(SidebarTreeNode);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarTreeNode[$.HMR].update(module.default);
	});
}

export default SidebarTreeNode;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLGNBQWMsUUFBUSxxQ0FBcUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsUUFBUSwrQkFBK0I7QUFDeEQsT0FBTyxFQUFFLFVBQVUsUUFBUSxpQ0FBaUM7QUFFNUQsT0FBTyxXQUFXLE1BQU0sc0JBQXNCO0FBQzlDLE9BQU8sd0JBQXdCLE1BQU0sMEJBQTBCO0FBQy9ELE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs7Ozs7NENBUDdFLENBQUM7Ozs7Q0FXQSxJQUFJLElBQUksU0FBRyxPQUFNO0NBQ2pCLE1BQU0sT0FBTyx5QkFBWSxlQUFlO0NBQ3hDLE1BQU0sTUFBTSwrQkFBWSxJQUFJLGtCQUFTLFdBQVcsSUFBSSxLQUFLO0NBQ3pELE1BQU0sV0FBVyx3Q0FBbUIsUUFBUSxFQUFFLE1BQU07O0tBR3BELEVBQUU7c0JBQUYsRUFBRTs7Ozs7T0FFQTt3QkFBQTs7O21DQVFnRSxNQUFNLElBQUcsV0FBVyxHQUFHLEVBQUU7OztXQUF4RixXQUFXOztjQUFPLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FDVCxJQUFJLElBQUksVUFBVTs7O1dBQXpDLFdBQVc7Ozs7Ozs7Ozs7Ozs7T0FDWCxJQUFJO3NCQUFKLElBQUk7O1dBQUosSUFBSTtXQVZMOzswQkFBQTs7OztTQWFDLEVBQUU7OzttQkFBRixFQUFFLHlCQUNVLFFBQVEsU0FBVSxLQUFLLFlBQVMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQWpDLEtBQUs7Ozs7O2NBQ2pDLHdCQUF3Qjs7dUJBQU8sS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQUZ0QyxFQUFFOzJDQUFGLEVBQUUsOEJBQTZELE9BQU8sRUFBQyxPQUFPO3dCQUE5RSxFQUFFOzs7OztnQkFEQyxNQUFNOzs7Ozs7Ozs7OztpQkFaVjtxQkFBQSwrQkFLZSxNQUFNO21DQUtULEtBQUs7O3dCQU5WLE9BQU8sRUFBQyxVQUFVOzs7d0JBSnpCO2lCQU1nQixJQUFJLFNBQUksTUFBTTs7Ozs7OztPQWM5Qjt3QkFBQTs7OzBDQVN3QixJQUFJLElBQUksUUFBUTs7O1dBQXZDLFdBQVc7Ozs7Ozs7Ozs7Ozs7T0FDWCxNQUFJO3dCQUFKLE1BQUk7O1dBQUosTUFBSTtXQVZMOzs7O3FCQUFBLHdCQUNXLElBQUk7cUJBRGYsK0JBSWtCLFFBQVEsR0FBRyxNQUFNLEdBQUcsU0FBUztxQkFKL0MsZ0NBS21CLFFBQVEsR0FBRyxNQUFNLEdBQUcsU0FBUztpQkFMaEQ7cUNBVVksS0FBSzs7d0JBSlYsT0FBTyxFQUFDLFVBQVU7Ozt3QkFOekI7K0JBT2MsT0FBTzs7O3NCQVByQjs7OztPQWFBO3dCQUFBOzs7MENBUXdCLElBQUksSUFBSSxRQUFROzs7V0FBdkMsV0FBVzs7Ozs7Ozs7Ozs7OztPQUNYLE1BQUk7d0JBQUosTUFBSTs7V0FBSixNQUFJO1dBVEw7Ozs7cUJBQUEsc0NBSWtCLFFBQVEsR0FBRyxNQUFNLEdBQUcsU0FBUztpQkFKL0M7cUNBU1ksS0FBSzs7d0JBSlYsT0FBTyxFQUFDLFVBQVU7Ozt3QkFMekI7K0JBTWMsT0FBTzs7O3NCQU5yQjs7Ozs7Y0FsQ0csV0FBVyxpREFvQkQsSUFBSTs7Ozs7Ozs7O1NBckJuQixFQUFFO3VDQUFGLEVBQUUsOEJBQStELE9BQU8sRUFBQyxRQUFRO29CQUFqRixFQUFFOzs7QUFGSyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2lkZWJhclRyZWVOb2RlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBjYXJldFJpZ2h0SWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9jYXJldFJpZ2h0LmpzJztcblx0aW1wb3J0IHsgZmlsZUljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvZmlsZS5qcyc7XG5cdGltcG9ydCB7IGZvbGRlckljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvZm9sZGVyLmpzJztcblx0aW1wb3J0IHR5cGUgeyBTaWRlYmFyVHJlZU5vZGUgfSBmcm9tICcuL3NpZGViYXIucHJvcHMuanMnO1xuXHRpbXBvcnQgU2lkZWJhckljb24gZnJvbSAnLi9TaWRlYmFySWNvbi5zdmVsdGUnO1xuXHRpbXBvcnQgU2lkZWJhclRyZWVOb2RlQ29tcG9uZW50IGZyb20gJy4vU2lkZWJhclRyZWVOb2RlLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0bGV0IHsgbm9kZSwgdGhlbWUgfTogeyBub2RlOiBTaWRlYmFyVHJlZU5vZGU7IHRoZW1lPzogU2lkZWJhclRoZW1lUHJvcHMgfSA9ICRwcm9wcygpO1xuXG5cdGxldCBvcGVuID0gJHN0YXRlPGJvb2xlYW4gfCB1bmRlZmluZWQ+KCk7XG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VTaWRlYmFyVGhlbWUodGhlbWUpKTtcblx0Y29uc3QgaXNPcGVuID0gJGRlcml2ZWQob3BlbiA/PyBub2RlLmRlZmF1bHRPcGVuID8/IGZhbHNlKTtcblx0Y29uc3QgaGFzQ2hpbGRyZW4gPSAkZGVyaXZlZCghIW5vZGUuY2hpbGRyZW4/Lmxlbmd0aCk7XG48L3NjcmlwdD5cblxuPGxpIGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1pdGVtXCIgZGF0YS1zaWRlYmFyPVwibWVudS1pdGVtXCIgY2xhc3M9e2NsYXNzZXMubWVudUl0ZW0oKX0+XG5cdHsjaWYgaGFzQ2hpbGRyZW59XG5cdFx0PGJ1dHRvblxuXHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLW1lbnUtYnV0dG9uXCJcblx0XHRcdGRhdGEtc2lkZWJhcj1cIm1lbnUtYnV0dG9uXCJcblx0XHRcdGNsYXNzPXtjbGFzc2VzLm1lbnVCdXR0b24oKX1cblx0XHRcdGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cblx0XHRcdG9uY2xpY2s9eygpID0+IChvcGVuID0gIWlzT3Blbil9XG5cdFx0PlxuXHRcdFx0PFNpZGViYXJJY29uIGljb249e2NhcmV0UmlnaHRJY29ufSBjbGFzcz1cInRyYW5zaXRpb24tdHJhbnNmb3JtIHtpc09wZW4gPyAncm90YXRlLTkwJyA6ICcnfVwiIC8+XG5cdFx0XHQ8U2lkZWJhckljb24gaWNvbj17bm9kZS5pY29uID8/IGZvbGRlckljb259IC8+XG5cdFx0XHQ8c3Bhbj57bm9kZS5sYWJlbH08L3NwYW4+XG5cdFx0PC9idXR0b24+XG5cdFx0eyNpZiBpc09wZW59XG5cdFx0XHQ8dWwgZGF0YS1zbG90PVwic2lkZWJhci1tZW51LXN1YlwiIGRhdGEtc2lkZWJhcj1cIm1lbnUtc3ViXCIgY2xhc3M9e2NsYXNzZXMuc3ViTWVudSgpfT5cblx0XHRcdFx0eyNlYWNoIG5vZGUuY2hpbGRyZW4gPz8gW10gYXMgY2hpbGQsIGluZGV4IChjaGlsZC5sYWJlbCArIGluZGV4KX1cblx0XHRcdFx0XHQ8U2lkZWJhclRyZWVOb2RlQ29tcG9uZW50IG5vZGU9e2NoaWxkfSB7dGhlbWV9IC8+XG5cdFx0XHRcdHsvZWFjaH1cblx0XHRcdDwvdWw+XG5cdFx0ey9pZn1cblx0ezplbHNlIGlmIG5vZGUuaHJlZn1cblx0XHQ8YVxuXHRcdFx0aHJlZj17bm9kZS5ocmVmfVxuXHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpZGViYXI9XCJtZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLWFjdGl2ZT17bm9kZS5pc0FjdGl2ZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGFyaWEtY3VycmVudD17bm9kZS5pc0FjdGl2ZSA/ICdwYWdlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLm1lbnVCdXR0b24oKX1cblx0XHRcdG9uY2xpY2s9e25vZGUub25DbGlja31cblx0XHQ+XG5cdFx0XHQ8U2lkZWJhckljb24gaWNvbj17bm9kZS5pY29uID8/IGZpbGVJY29ufSAvPlxuXHRcdFx0PHNwYW4+e25vZGUubGFiZWx9PC9zcGFuPlxuXHRcdDwvYT5cblx0ezplbHNlfVxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpZGViYXI9XCJtZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLWFjdGl2ZT17bm9kZS5pc0FjdGl2ZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLm1lbnVCdXR0b24oKX1cblx0XHRcdG9uY2xpY2s9e25vZGUub25DbGlja31cblx0XHQ+XG5cdFx0XHQ8U2lkZWJhckljb24gaWNvbj17bm9kZS5pY29uID8/IGZpbGVJY29ufSAvPlxuXHRcdFx0PHNwYW4+e25vZGUubGFiZWx9PC9zcGFuPlxuXHRcdDwvYnV0dG9uPlxuXHR7L2lmfVxuPC9saT5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFyVHJlZU5vZGUuc3ZlbHRlIn0=