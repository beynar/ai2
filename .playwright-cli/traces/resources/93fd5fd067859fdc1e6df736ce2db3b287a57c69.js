import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarAction.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarAction[$.FILENAME] = 'src/lib/components/Sidebar/SidebarAction.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import { dotsThreeIcon } from "/src/lib/components/Icons/dotsThree.ts";
import { getSidebarMenuPosition } from "/src/lib/components/Sidebar/sidebar-position.ts";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<button type="button" aria-haspopup="menu"><!> <span class="sr-only"> </span></button>`), SidebarAction[$.FILENAME], [[36, 3, [[47, 4]]]]);
var root_1 = $.add_locations($.from_html(`<button type="button"><!> <span class="sr-only"> </span></button>`), SidebarAction[$.FILENAME], [[52, 1, [[59, 2]]]]);

function SidebarAction($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarAction);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const actionLabel = $.tag($.derived(() => $.strict_equals(typeof $$props.action, 'function') ? undefined : $$props.action.label ?? 'More'), 'actionLabel');
	const actionIcon = $.tag($.derived(() => $.strict_equals(typeof $$props.action, 'function') ? undefined : $$props.action.icon ?? dotsThreeIcon), 'actionIcon');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			$.add_svelte_meta(() => $.snippet(node_1, () => $$props.action, () => $$props.api), 'render', SidebarAction, 27, 1);
			$.append($$anchor, fragment_1);
		};

		var consequent_1 = ($$anchor) => {
			var fragment_2 = $.comment();
			var node_2 = $.first_child(fragment_2);

			{
				const trigger = $.wrap_snippet(SidebarAction, function ($$anchor, popover = $.noop) {
					$.validate_snippet_args(...arguments);

					var button = root();
					var node_3 = $.child(button);

					$.add_svelte_meta(
						() => SidebarIcon(node_3, {
							get icon() {
								return $.get(actionIcon);
							}
						}),
						'component',
						SidebarAction,
						46,
						4,
						{ componentTag: 'SidebarIcon' }
					);

					var span = $.sibling(node_3, 2);
					var text = $.child(span, true);

					$.reset(span);
					$.reset(button);
					$.attach(button, () => popover().reference);

					$.template_effect(
						($0) => {
							$.set_class(button, 1, $0);
							$.set_attribute(button, 'aria-label', $.get(actionLabel));
							$.set_attribute(button, 'aria-expanded', popover().isOpen);
							$.set_attribute(button, 'aria-controls', popover().isOpen ? popover().id : undefined);
							$.set_text(text, $.get(actionLabel));
						},
						[() => $.clsx($.get(classes).actionTrigger())]
					);

					$.delegated('click', button, function click() {
						return popover().toggle();
					});

					$.append($$anchor, button);
				});

				let $0 = $.derived(() => ({ items: $$props.action.menu }));
				let $1 = $.derived(() => getSidebarMenuPosition($$props.action.menuSide, $$props.action.menuAlign, $$props.api.isMobile));

				$.add_svelte_meta(
					() => PopupMenu(node_2, {
						get menu() {
							return $.get($0);
						},

						get position() {
							return $.get($1);
						},

						get class() {
							return $$props.action.menuClass;
						},
						fitTrigger: false,
						trigger,
						$$slots: { trigger: true }
					}),
					'component',
					SidebarAction,
					29,
					1,
					{ componentTag: 'PopupMenu' }
				);
			}

			$.append($$anchor, fragment_2);
		};

		var alternate = ($$anchor) => {
			var button_1 = root_1();
			var node_4 = $.child(button_1);

			$.add_svelte_meta(
				() => SidebarIcon(node_4, {
					get icon() {
						return $.get(actionIcon);
					}
				}),
				'component',
				SidebarAction,
				58,
				2,
				{ componentTag: 'SidebarIcon' }
			);

			var span_1 = $.sibling(node_4, 2);
			var text_1 = $.child(span_1, true);

			$.reset(span_1);
			$.reset(button_1);

			$.template_effect(
				($0) => {
					$.set_class(button_1, 1, $0);
					$.set_attribute(button_1, 'aria-label', $.get(actionLabel));
					$.set_text(text_1, $.get(actionLabel));
				},
				[() => $.clsx($.get(classes).actionTrigger())]
			);

			$.delegated('click', button_1, function (...$$args) {
				$.apply(() => $$props.action.onClick, this, $$args, SidebarAction, [56, 11]);
			});

			$.append($$anchor, button_1);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.strict_equals(typeof $$props.action, 'function')) $$render(consequent); else if ($$props.action.menu) $$render(consequent_1, 1); else $$render(alternate, -1);
			}),
			'if',
			SidebarAction,
			26,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarAction = $.hmr(SidebarAction);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarAction[$.HMR].update(module.default);
	});
}

export default SidebarAction;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxTQUFTLE1BQU0sNENBQTRDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLFFBQVEsb0NBQW9DO0FBRWxFLE9BQU8sRUFBRSxzQkFBc0IsUUFBUSx1QkFBdUI7QUFDOUQsT0FBTyxXQUFXLE1BQU0sc0JBQXNCO0FBQzlDLE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs7MENBTjdFLENBQUM7Ozs7Q0FrQkEsTUFBTSxPQUFPLHlCQUFZLGVBQWU7Q0FDeEMsTUFBTSxXQUFXLGdFQUE4QixVQUFVLElBQUcsU0FBUyxrQkFBVyxLQUFLLElBQUksTUFBTTtDQUMvRixNQUFNLFVBQVUsZ0VBQ0csVUFBVSxJQUFHLFNBQVMsa0JBQVcsSUFBSSxJQUFJLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFhOUQsT0FBTyxxREFBQyxPQUFPOzs7U0FDdkI7MEJBQUE7OztZQVVDLFdBQVc7O3FCQUFPLFVBQVU7Ozs7Ozs7Ozs7U0FDNUIsSUFBSTt3QkFBSixJQUFJOzthQUFKLElBQUk7YUFYTDtjQUFBLGNBT1MsT0FBTyxHQUFDLFNBQVM7Ozs7bUJBUDFCO3VCQUFBLDRCQUdZLFdBQVc7dUJBSHZCLHlCQUllLE9BQU8sR0FBQyxNQUFNO3VCQUo3Qix5QkFNZSxPQUFPLEdBQUMsTUFBTSxHQUFHLE9BQU8sR0FBQyxFQUFFLEdBQUcsU0FBUzs4QkFLL0IsV0FBVzs7MEJBVDNCLE9BQU8sRUFBQyxhQUFhOzs7MEJBRjVCO2FBUWUsT0FBTyxHQUFDLE1BQU07Ozt3QkFSN0I7OztnQ0FOTSxLQUFLLGlCQUFTLElBQUk7NkJBQ2hCLHNCQUFzQixnQkFBUSxRQUFRLGlCQUFTLFNBQVMsY0FBTSxRQUFROzs7V0FGaEY7Ozs7Ozs7Ozs7NkJBR2MsU0FBUzs7a0JBQ1gsS0FBSztNQUVQLE9BQU87Ozs7Ozs7Ozs7Ozs7OztPQWlCakI7d0JBQUE7OztVQU1DLFdBQVc7O21CQUFPLFVBQVU7Ozs7Ozs7Ozs7T0FDNUIsTUFBSTt3QkFBSixNQUFJOztXQUFKLE1BQUk7V0FQTDs7OztpQkFBQTtxQkFBQSw4QkFHWSxXQUFXOzhCQUlBLFdBQVc7O3dCQUwzQixPQUFPLEVBQUMsYUFBYTs7O3dCQUY1QjtpQ0FJZ0IsT0FBTzs7O3NCQUp2Qjs7Ozs7K0NBMUJxQixVQUFVLGlEQUVoQixJQUFJOzs7Ozs7Ozs7Ozs7QUFKYiIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2lkZWJhckFjdGlvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFBvcHVwTWVudSBmcm9tICckbGliL2NvbXBvbmVudHMvUG9wdXBNZW51L1BvcHVwTWVudS5zdmVsdGUnO1xuXHRpbXBvcnQgeyBkb3RzVGhyZWVJY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL2RvdHNUaHJlZS5qcyc7XG5cdGltcG9ydCB0eXBlIHsgU2lkZWJhckFwaSwgU2lkZWJhck1lbnVBY3Rpb25EZXNjcmlwdG9yIH0gZnJvbSAnLi9zaWRlYmFyLnByb3BzLmpzJztcblx0aW1wb3J0IHsgZ2V0U2lkZWJhck1lbnVQb3NpdGlvbiB9IGZyb20gJy4vc2lkZWJhci1wb3NpdGlvbi5qcyc7XG5cdGltcG9ydCBTaWRlYmFySWNvbiBmcm9tICcuL1NpZGViYXJJY29uLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRhY3Rpb24sXG5cdFx0YXBpLFxuXHRcdHRoZW1lXG5cdH06IHtcblx0XHRhY3Rpb246IFNpZGViYXJNZW51QWN0aW9uRGVzY3JpcHRvciB8IGltcG9ydCgnc3ZlbHRlJykuU25pcHBldDxbU2lkZWJhckFwaV0+O1xuXHRcdGFwaTogU2lkZWJhckFwaTtcblx0XHR0aGVtZT86IFNpZGViYXJUaGVtZVByb3BzO1xuXHR9ID0gJHByb3BzKCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZVNpZGViYXJUaGVtZSh0aGVtZSkpO1xuXHRjb25zdCBhY3Rpb25MYWJlbCA9ICRkZXJpdmVkKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicgPyB1bmRlZmluZWQgOiAoYWN0aW9uLmxhYmVsID8/ICdNb3JlJykpO1xuXHRjb25zdCBhY3Rpb25JY29uID0gJGRlcml2ZWQoXG5cdFx0dHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IHVuZGVmaW5lZCA6IChhY3Rpb24uaWNvbiA/PyBkb3RzVGhyZWVJY29uKVxuXHQpO1xuPC9zY3JpcHQ+XG5cbnsjaWYgdHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJ31cblx0e0ByZW5kZXIgYWN0aW9uKGFwaSl9XG57OmVsc2UgaWYgYWN0aW9uLm1lbnV9XG5cdDxQb3B1cE1lbnVcblx0XHRtZW51PXt7IGl0ZW1zOiBhY3Rpb24ubWVudSB9fVxuXHRcdHBvc2l0aW9uPXtnZXRTaWRlYmFyTWVudVBvc2l0aW9uKGFjdGlvbi5tZW51U2lkZSwgYWN0aW9uLm1lbnVBbGlnbiwgYXBpLmlzTW9iaWxlKX1cblx0XHRjbGFzcz17YWN0aW9uLm1lbnVDbGFzc31cblx0XHRmaXRUcmlnZ2VyPXtmYWxzZX1cblx0PlxuXHRcdHsjc25pcHBldCB0cmlnZ2VyKHBvcG92ZXIpfVxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuYWN0aW9uVHJpZ2dlcigpfVxuXHRcdFx0XHRhcmlhLWxhYmVsPXthY3Rpb25MYWJlbH1cblx0XHRcdFx0YXJpYS1leHBhbmRlZD17cG9wb3Zlci5pc09wZW59XG5cdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJtZW51XCJcblx0XHRcdFx0YXJpYS1jb250cm9scz17cG9wb3Zlci5pc09wZW4gPyBwb3BvdmVyLmlkIDogdW5kZWZpbmVkfVxuXHRcdFx0XHR7QGF0dGFjaCBwb3BvdmVyLnJlZmVyZW5jZX1cblx0XHRcdFx0b25jbGljaz17KCkgPT4gcG9wb3Zlci50b2dnbGUoKX1cblx0XHRcdD5cblx0XHRcdFx0PFNpZGViYXJJY29uIGljb249e2FjdGlvbkljb259IC8+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwic3Itb25seVwiPnthY3Rpb25MYWJlbH08L3NwYW4+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHR7L3NuaXBwZXR9XG5cdDwvUG9wdXBNZW51PlxuezplbHNlfVxuXHQ8YnV0dG9uXG5cdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0Y2xhc3M9e2NsYXNzZXMuYWN0aW9uVHJpZ2dlcigpfVxuXHRcdGFyaWEtbGFiZWw9e2FjdGlvbkxhYmVsfVxuXHRcdG9uY2xpY2s9e2FjdGlvbi5vbkNsaWNrfVxuXHQ+XG5cdFx0PFNpZGViYXJJY29uIGljb249e2FjdGlvbkljb259IC8+XG5cdFx0PHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+e2FjdGlvbkxhYmVsfTwvc3Bhbj5cblx0PC9idXR0b24+XG57L2lmfVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9TaWRlYmFyL1NpZGViYXJBY3Rpb24uc3ZlbHRlIn0=