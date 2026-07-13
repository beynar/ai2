import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarGroup.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarGroup[$.FILENAME] = 'src/lib/components/Sidebar/SidebarGroup.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import SidebarAction from "/src/lib/components/Sidebar/SidebarAction.svelte?t=1783864665558";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import SidebarMenuList from "/src/lib/components/Sidebar/SidebarMenuList.svelte?t=1783864665558";
import SidebarTreeNode from "/src/lib/components/Sidebar/SidebarTreeNode.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<ul data-slot="sidebar-menu" data-sidebar="menu"></ul>`), SidebarGroup[$.FILENAME], [[42, 3]]);
var root_1 = $.add_locations($.from_html(`<div data-slot="sidebar-group-content" data-sidebar="group-content"><!></div>`), SidebarGroup[$.FILENAME], [[36, 1]]);
var root_2 = $.add_locations($.from_html(`<span> </span> <!>`, 1), SidebarGroup[$.FILENAME], [[66, 4]]);
var root_3 = $.add_locations($.from_html(`<span class="sr-only"> </span>`), SidebarGroup[$.FILENAME], [[72, 4]]);
var root_4 = $.add_locations($.from_html(`<div data-slot="sidebar-group-action" data-sidebar="group-action"><!></div>`), SidebarGroup[$.FILENAME], [[76, 3]]);
var root_5 = $.add_locations($.from_html(`<div data-slot="sidebar-group" data-sidebar="group"><button type="button"><!></button> <!> <!></div>`), SidebarGroup[$.FILENAME], [[54, 1, [[59, 2]]]]);
var root_6 = $.add_locations($.from_html(`<div data-slot="sidebar-group-label" data-sidebar="group-label"> </div>`), SidebarGroup[$.FILENAME], [[95, 3]]);
var root_7 = $.add_locations($.from_html(`<div data-slot="sidebar-group-action" data-sidebar="group-action"><!></div>`), SidebarGroup[$.FILENAME], [[100, 3]]);
var root_8 = $.add_locations($.from_html(`<div data-slot="sidebar-group" data-sidebar="group"><!> <!> <!></div>`), SidebarGroup[$.FILENAME], [[89, 1]]);

function SidebarGroup($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarGroup);

	const groupMenu = $.wrap_snippet(SidebarGroup, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var div = root_1();
		var node_1 = $.child(div);

		{
			var consequent = ($$anchor) => {
				var ul = root();

				$.add_svelte_meta(
					() => $.each(ul, 23, () => $$props.group.tree, (node, index) => node.label + index, ($$anchor, node) => {
						var fragment = $.comment();
						var node_2 = $.first_child(fragment);

						$.add_svelte_meta(
							() => SidebarTreeNode(node_2, {
								get node() {
									return $.get(node);
								},

								get theme() {
									return $$props.theme;
								}
							}),
							'component',
							SidebarGroup,
							44,
							5,
							{ componentTag: 'SidebarTreeNode' }
						);

						$.append($$anchor, fragment);
					}),
					'each',
					SidebarGroup,
					43,
					4
				);

				$.reset(ul);
				$.template_effect(($0) => $.set_class(ul, 1, $0), [() => $.clsx($.get(classes).menu())]);
				$.append($$anchor, ul);
			};

			var alternate = ($$anchor) => {
				var fragment_1 = $.comment();
				var node_3 = $.first_child(fragment_1);

				{
					let $0 = $.derived(() => $$props.group.items ?? []);

					$.add_svelte_meta(
						() => SidebarMenuList(node_3, {
							get items() {
								return $.get($0);
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
						SidebarGroup,
						48,
						3,
						{ componentTag: 'SidebarMenuList' }
					);
				}

				$.append($$anchor, fragment_1);
			};

			$.add_svelte_meta(
				() => $.if(node_1, ($$render) => {
					if ($$props.group.tree) $$render(consequent); else $$render(alternate, -1);
				}),
				'if',
				SidebarGroup,
				41,
				2
			);
		}

		$.reset(div);
		$.template_effect(($0) => $.set_class(div, 1, $0), [() => $.clsx($.get(classes).groupContent())]);
		$.append($$anchor, div);
	});

	let open = $.tag($.state(void 0), 'open');
	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const isOpen = $.tag($.derived(() => $.get(open) ?? $$props.group.defaultOpen ?? true), 'isOpen');
	const hiddenLabel = $.tag($.derived(() => $.strict_equals($$props.api.displayState, 'collapsed') && !$$props.api.isMobile), 'hiddenLabel');
	var $$exports = { ...$.legacy_api() };
	var fragment_2 = $.comment();
	var node_4 = $.first_child(fragment_2);

	{
		var consequent_4 = ($$anchor) => {
			var div_1 = root_5();
			var button = $.child(div_1);
			var node_5 = $.child(button);

			{
				var consequent_1 = ($$anchor) => {
					var fragment_3 = root_2();
					var span = $.first_child(fragment_3);
					var text = $.child(span, true);

					$.reset(span);

					var node_6 = $.sibling(span, 2);

					{
						let $0 = $.derived(() => $.get(isOpen) ? 'rotate-90' : '');

						$.add_svelte_meta(
							() => SidebarIcon(node_6, {
								get icon() {
									return caretRightIcon;
								},

								get class() {
									return `ml-auto size-4 transition-transform ${$.get($0) ?? ''}`;
								}
							}),
							'component',
							SidebarGroup,
							67,
							4,
							{ componentTag: 'SidebarIcon' }
						);
					}

					$.template_effect(() => $.set_text(text, $$props.group.label));
					$.append($$anchor, fragment_3);
				};

				var alternate_1 = ($$anchor) => {
					var span_1 = root_3();
					var text_1 = $.child(span_1, true);

					$.reset(span_1);
					$.template_effect(() => $.set_text(text_1, $$props.group.label));
					$.append($$anchor, span_1);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if (!$.get(hiddenLabel)) $$render(consequent_1); else $$render(alternate_1, -1);
					}),
					'if',
					SidebarGroup,
					65,
					3
				);
			}

			$.reset(button);

			var node_7 = $.sibling(button, 2);

			{
				var consequent_2 = ($$anchor) => {
					var div_2 = root_4();
					var node_8 = $.child(div_2);

					$.add_svelte_meta(
						() => SidebarAction(node_8, {
							get action() {
								return $$props.group.action;
							},

							get api() {
								return $$props.api;
							},

							get theme() {
								return $$props.theme;
							}
						}),
						'component',
						SidebarGroup,
						81,
						4,
						{ componentTag: 'SidebarAction' }
					);

					$.reset(div_2);

					$.template_effect(($0) => $.set_class(div_2, 1, $0), [
						() => $.clsx($.get(classes).groupAction({ className: 'right-10' }))
					]);

					$.append($$anchor, div_2);
				};

				$.add_svelte_meta(
					() => $.if(node_7, ($$render) => {
						if ($$props.group.action) $$render(consequent_2);
					}),
					'if',
					SidebarGroup,
					75,
					2
				);
			}

			var node_9 = $.sibling(node_7, 2);

			{
				var consequent_3 = ($$anchor) => {
					$.add_svelte_meta(() => groupMenu($$anchor), 'render', SidebarGroup, 85, 3);
				};

				$.add_svelte_meta(
					() => $.if(node_9, ($$render) => {
						if ($.get(isOpen)) $$render(consequent_3);
					}),
					'if',
					SidebarGroup,
					84,
					2
				);
			}

			$.reset(div_1);

			$.template_effect(
				($0, $1) => {
					$.set_class(div_1, 1, $0);
					$.set_class(button, 1, $1);
					$.set_attribute(button, 'aria-expanded', $.get(isOpen));
				},
				[
					() => $.clsx($.get(classes).group({ className: $$props.group.class })),
					() => $.clsx($.get(classes).groupLabel({ interactive: true }))
				]
			);

			$.delegated('click', button, function click() {
				return $.set(open, !$.get(isOpen));
			});

			$.append($$anchor, div_1);
		};

		var alternate_2 = ($$anchor) => {
			var div_3 = root_8();
			var node_10 = $.child(div_3);

			{
				var consequent_5 = ($$anchor) => {
					var div_4 = root_6();
					var text_2 = $.child(div_4, true);

					$.reset(div_4);

					$.template_effect(
						($0) => {
							$.set_class(div_4, 1, $0);
							$.set_text(text_2, $$props.group.label);
						},
						[() => $.clsx($.get(classes).groupLabel())]
					);

					$.append($$anchor, div_4);
				};

				$.add_svelte_meta(
					() => $.if(node_10, ($$render) => {
						if ($$props.group.label) $$render(consequent_5);
					}),
					'if',
					SidebarGroup,
					94,
					2
				);
			}

			var node_11 = $.sibling(node_10, 2);

			{
				var consequent_6 = ($$anchor) => {
					var div_5 = root_7();
					var node_12 = $.child(div_5);

					$.add_svelte_meta(
						() => SidebarAction(node_12, {
							get action() {
								return $$props.group.action;
							},

							get api() {
								return $$props.api;
							},

							get theme() {
								return $$props.theme;
							}
						}),
						'component',
						SidebarGroup,
						105,
						4,
						{ componentTag: 'SidebarAction' }
					);

					$.reset(div_5);
					$.template_effect(($0) => $.set_class(div_5, 1, $0), [() => $.clsx($.get(classes).groupAction())]);
					$.append($$anchor, div_5);
				};

				$.add_svelte_meta(
					() => $.if(node_11, ($$render) => {
						if ($$props.group.action) $$render(consequent_6);
					}),
					'if',
					SidebarGroup,
					99,
					2
				);
			}

			var node_13 = $.sibling(node_11, 2);

			$.add_svelte_meta(() => groupMenu(node_13), 'render', SidebarGroup, 108, 2);
			$.reset(div_3);

			$.template_effect(($0) => $.set_class(div_3, 1, $0), [
				() => $.clsx($.get(classes).group({ className: $$props.group.class }))
			]);

			$.append($$anchor, div_3);
		};

		$.add_svelte_meta(
			() => $.if(node_4, ($$render) => {
				if ($$props.group.collapsible) $$render(consequent_4); else $$render(alternate_2, -1);
			}),
			'if',
			SidebarGroup,
			53,
			0
		);
	}

	$.append($$anchor, fragment_2);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarGroup = $.hmr(SidebarGroup);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarGroup[$.HMR].update(module.default);
	});
}

export default SidebarGroup;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0MsT0FBTyxFQUFFLGNBQWMsUUFBUSxxQ0FBcUM7QUFDcEUsT0FBTyxhQUFhLE1BQU0sd0JBQXdCO0FBQ2xELE9BQU8sV0FBVyxNQUFNLHNCQUFzQjtBQUM5QyxPQUFPLGVBQWUsTUFBTSwwQkFBMEI7QUFDdEQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs7Ozs7Ozs7O3lDQVo3RSxDQUFDOzs7O09Ba0NTLFNBQVM7OztNQUNqQjt1QkFBQTs7OztRQU1FLEVBQUU7OztrQkFBRixFQUFFLDBCQUNXLElBQUksR0FBSSxJQUFJLFlBQVMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQS9CLElBQUk7Ozs7O2FBQ3ZCLGVBQWU7O3NCQUFFLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFGdkIsRUFBRTswQ0FBRixFQUFFLDhCQUFxRCxPQUFPLEVBQUMsSUFBSTt1QkFBbkUsRUFBRTs7Ozs7Ozs7NENBTTJCLEtBQUs7OztZQUFsQyxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQVBOLElBQUk7Ozs7Ozs7OztVQUxmO3dDQUFBLGlDQUdPLE9BQU8sRUFBQyxZQUFZO3FCQUgzQjs7O0NBUEQsSUFBSSxJQUFJLFNBQUcsT0FBTTtDQUNqQixNQUFNLE9BQU8seUJBQVksZUFBZTtDQUN4QyxNQUFNLE1BQU0sK0JBQVksSUFBSSxtQkFBVSxXQUFXLElBQUksSUFBSTtDQUN6RCxNQUFNLFdBQVcscURBQWdCLFlBQVksRUFBSyxXQUFXLGtCQUFTLFFBQVE7Ozs7Ozs7T0FzQjdFO09BS0MsaUJBTEQ7d0JBS0M7Ozs7O1NBT0UsSUFBSTt3QkFBSixJQUFJOzthQUFKLElBQUk7OzRCQUFKLElBQUk7OztxQ0FHd0MsTUFBTSxJQUFHLFdBQVcsR0FBRyxFQUFFOzs7YUFGckU7O2dCQUNNLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs0REFGUixLQUFLOzs7OztTQU1qQixNQUFJOzBCQUFKLE1BQUk7O2FBQUosTUFBSTs4REFBd0IsS0FBSzt3QkFBakMsTUFBSTs7Ozs7aUJBUEEsV0FBVzs7Ozs7Ozs7O1dBTmpCOzswQkFBQTs7OztTQWlCQzswQkFBQTs7O1lBS0MsYUFBYTs7NkJBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBTG5DOzsyQ0FBQTt5QkFHTyxPQUFPLEVBQUMsV0FBVyxHQUFHLFNBQVMsRUFBRSxVQUFVOzs7d0JBSGxEOzs7Ozt3QkFEUyxNQUFNOzs7Ozs7Ozs7Ozs7OzZCQVVQLFNBQVM7Ozs7O2dCQURkLE1BQU07Ozs7Ozs7OztXQTlCWDs7OztpQkFBQTtpQkFLQztxQkFBQSwrQkFHZSxNQUFNOzs7d0JBTGYsT0FBTyxFQUFDLEtBQUssR0FBRyxTQUFTLGdCQUFRLEtBQUs7d0JBSXJDLE9BQU8sRUFBQyxVQUFVLEdBQUcsV0FBVyxFQUFFLElBQUk7Ozs7d0JBRjdDO2lCQUlnQixJQUFJLFNBQUksTUFBTTs7O3NCQVQvQjs7OztPQW1DQTt5QkFBQTs7OztTQU1FLEtBQUc7MEJBQUgsS0FBRzs7YUFBSCxLQUFHOzs7O21CQUFILEtBQUc7d0NBQ0ksS0FBSzs7MEJBRDBELE9BQU8sRUFBQyxVQUFVOzs7d0JBQXhGLEtBQUc7Ozs7O3dCQURNLEtBQUs7Ozs7Ozs7Ozs7Ozs7U0FNZDsyQkFBQTs7O1lBS0MsYUFBYTs7NkJBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBTG5DOzJDQUFBLG1DQUdPLE9BQU8sRUFBQyxXQUFXO3dCQUgxQjs7Ozs7d0JBRFMsTUFBTTs7Ozs7Ozs7Ozs7MkJBU1IsU0FBUztXQW5CbEI7O3lDQUFBO3VCQUdPLE9BQU8sRUFBQyxLQUFLLEdBQUcsU0FBUyxnQkFBUSxLQUFLOzs7c0JBSDdDOzs7OztzQkFwQ1MsV0FBVzs7Ozs7Ozs7Ozs7O0FBcEJkIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJTaWRlYmFyR3JvdXAuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB0eXBlIHtcblx0XHRTaWRlYmFyQXBpLFxuXHRcdFNpZGViYXJDb2xsYXBzZUljb24sXG5cdFx0U2lkZWJhckdyb3VwLFxuXHRcdFNpZGViYXJUb29sdGlwTW9kZVxuXHR9IGZyb20gJy4vc2lkZWJhci5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IGNhcmV0UmlnaHRJY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL2NhcmV0UmlnaHQuanMnO1xuXHRpbXBvcnQgU2lkZWJhckFjdGlvbiBmcm9tICcuL1NpZGViYXJBY3Rpb24uc3ZlbHRlJztcblx0aW1wb3J0IFNpZGViYXJJY29uIGZyb20gJy4vU2lkZWJhckljb24uc3ZlbHRlJztcblx0aW1wb3J0IFNpZGViYXJNZW51TGlzdCBmcm9tICcuL1NpZGViYXJNZW51TGlzdC5zdmVsdGUnO1xuXHRpbXBvcnQgU2lkZWJhclRyZWVOb2RlIGZyb20gJy4vU2lkZWJhclRyZWVOb2RlLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRncm91cCxcblx0XHRhcGksXG5cdFx0Y29sbGFwc2VJY29uLFxuXHRcdHRvb2x0aXBzLFxuXHRcdHRoZW1lXG5cdH06IHtcblx0XHRncm91cDogU2lkZWJhckdyb3VwO1xuXHRcdGFwaTogU2lkZWJhckFwaTtcblx0XHRjb2xsYXBzZUljb246IFNpZGViYXJDb2xsYXBzZUljb247XG5cdFx0dG9vbHRpcHM6IFNpZGViYXJUb29sdGlwTW9kZTtcblx0XHR0aGVtZT86IFNpZGViYXJUaGVtZVByb3BzO1xuXHR9ID0gJHByb3BzKCk7XG5cblx0bGV0IG9wZW4gPSAkc3RhdGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD4oKTtcblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZVNpZGViYXJUaGVtZSh0aGVtZSkpO1xuXHRjb25zdCBpc09wZW4gPSAkZGVyaXZlZChvcGVuID8/IGdyb3VwLmRlZmF1bHRPcGVuID8/IHRydWUpO1xuXHRjb25zdCBoaWRkZW5MYWJlbCA9ICRkZXJpdmVkKGFwaS5kaXNwbGF5U3RhdGUgPT09ICdjb2xsYXBzZWQnICYmICFhcGkuaXNNb2JpbGUpO1xuPC9zY3JpcHQ+XG5cbnsjc25pcHBldCBncm91cE1lbnUoKX1cblx0PGRpdlxuXHRcdGRhdGEtc2xvdD1cInNpZGViYXItZ3JvdXAtY29udGVudFwiXG5cdFx0ZGF0YS1zaWRlYmFyPVwiZ3JvdXAtY29udGVudFwiXG5cdFx0Y2xhc3M9e2NsYXNzZXMuZ3JvdXBDb250ZW50KCl9XG5cdD5cblx0XHR7I2lmIGdyb3VwLnRyZWV9XG5cdFx0XHQ8dWwgZGF0YS1zbG90PVwic2lkZWJhci1tZW51XCIgZGF0YS1zaWRlYmFyPVwibWVudVwiIGNsYXNzPXtjbGFzc2VzLm1lbnUoKX0+XG5cdFx0XHRcdHsjZWFjaCBncm91cC50cmVlIGFzIG5vZGUsIGluZGV4IChub2RlLmxhYmVsICsgaW5kZXgpfVxuXHRcdFx0XHRcdDxTaWRlYmFyVHJlZU5vZGUge25vZGV9IHt0aGVtZX0gLz5cblx0XHRcdFx0ey9lYWNofVxuXHRcdFx0PC91bD5cblx0XHR7OmVsc2V9XG5cdFx0XHQ8U2lkZWJhck1lbnVMaXN0IGl0ZW1zPXtncm91cC5pdGVtcyA/PyBbXX0ge2FwaX0ge2NvbGxhcHNlSWNvbn0ge3Rvb2x0aXBzfSB7dGhlbWV9IC8+XG5cdFx0ey9pZn1cblx0PC9kaXY+XG57L3NuaXBwZXR9XG5cbnsjaWYgZ3JvdXAuY29sbGFwc2libGV9XG5cdDxkaXZcblx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLWdyb3VwXCJcblx0XHRkYXRhLXNpZGViYXI9XCJncm91cFwiXG5cdFx0Y2xhc3M9e2NsYXNzZXMuZ3JvdXAoeyBjbGFzc05hbWU6IGdyb3VwLmNsYXNzIH0pfVxuXHQ+XG5cdFx0PGJ1dHRvblxuXHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRjbGFzcz17Y2xhc3Nlcy5ncm91cExhYmVsKHsgaW50ZXJhY3RpdmU6IHRydWUgfSl9XG5cdFx0XHRhcmlhLWV4cGFuZGVkPXtpc09wZW59XG5cdFx0XHRvbmNsaWNrPXsoKSA9PiAob3BlbiA9ICFpc09wZW4pfVxuXHRcdD5cblx0XHRcdHsjaWYgIWhpZGRlbkxhYmVsfVxuXHRcdFx0XHQ8c3Bhbj57Z3JvdXAubGFiZWx9PC9zcGFuPlxuXHRcdFx0XHQ8U2lkZWJhckljb25cblx0XHRcdFx0XHRpY29uPXtjYXJldFJpZ2h0SWNvbn1cblx0XHRcdFx0XHRjbGFzcz1cIm1sLWF1dG8gc2l6ZS00IHRyYW5zaXRpb24tdHJhbnNmb3JtIHtpc09wZW4gPyAncm90YXRlLTkwJyA6ICcnfVwiXG5cdFx0XHRcdC8+XG5cdFx0XHR7OmVsc2V9XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwic3Itb25seVwiPntncm91cC5sYWJlbH08L3NwYW4+XG5cdFx0XHR7L2lmfVxuXHRcdDwvYnV0dG9uPlxuXHRcdHsjaWYgZ3JvdXAuYWN0aW9ufVxuXHRcdFx0PGRpdlxuXHRcdFx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLWdyb3VwLWFjdGlvblwiXG5cdFx0XHRcdGRhdGEtc2lkZWJhcj1cImdyb3VwLWFjdGlvblwiXG5cdFx0XHRcdGNsYXNzPXtjbGFzc2VzLmdyb3VwQWN0aW9uKHsgY2xhc3NOYW1lOiAncmlnaHQtMTAnIH0pfVxuXHRcdFx0PlxuXHRcdFx0XHQ8U2lkZWJhckFjdGlvbiBhY3Rpb249e2dyb3VwLmFjdGlvbn0ge2FwaX0ge3RoZW1lfSAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0ey9pZn1cblx0XHR7I2lmIGlzT3Blbn1cblx0XHRcdHtAcmVuZGVyIGdyb3VwTWVudSgpfVxuXHRcdHsvaWZ9XG5cdDwvZGl2PlxuezplbHNlfVxuXHQ8ZGl2XG5cdFx0ZGF0YS1zbG90PVwic2lkZWJhci1ncm91cFwiXG5cdFx0ZGF0YS1zaWRlYmFyPVwiZ3JvdXBcIlxuXHRcdGNsYXNzPXtjbGFzc2VzLmdyb3VwKHsgY2xhc3NOYW1lOiBncm91cC5jbGFzcyB9KX1cblx0PlxuXHRcdHsjaWYgZ3JvdXAubGFiZWx9XG5cdFx0XHQ8ZGl2IGRhdGEtc2xvdD1cInNpZGViYXItZ3JvdXAtbGFiZWxcIiBkYXRhLXNpZGViYXI9XCJncm91cC1sYWJlbFwiIGNsYXNzPXtjbGFzc2VzLmdyb3VwTGFiZWwoKX0+XG5cdFx0XHRcdHtncm91cC5sYWJlbH1cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cdFx0eyNpZiBncm91cC5hY3Rpb259XG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItZ3JvdXAtYWN0aW9uXCJcblx0XHRcdFx0ZGF0YS1zaWRlYmFyPVwiZ3JvdXAtYWN0aW9uXCJcblx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuZ3JvdXBBY3Rpb24oKX1cblx0XHRcdD5cblx0XHRcdFx0PFNpZGViYXJBY3Rpb24gYWN0aW9uPXtncm91cC5hY3Rpb259IHthcGl9IHt0aGVtZX0gLz5cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cdFx0e0ByZW5kZXIgZ3JvdXBNZW51KCl9XG5cdDwvZGl2Plxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFyR3JvdXAuc3ZlbHRlIn0=