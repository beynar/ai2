import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarMenuItem.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarMenuItem[$.FILENAME] = 'src/lib/components/Sidebar/SidebarMenuItem.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import { tooltip } from "/src/lib/components/Tooltip/tooltip.svelte.ts";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import { dotsThreeIcon } from "/src/lib/components/Icons/dotsThree.ts";
import { minusIcon } from "/src/lib/components/Icons/minus.ts";
import { plusIcon } from "/src/lib/components/Icons/plus.ts";
import { useI18n } from "/src/lib/i18n/context.svelte.ts?t=1783864665558";
import { getSidebarMenuPosition } from "/src/lib/components/Sidebar/sidebar-position.ts";
import SidebarAction from "/src/lib/components/Sidebar/SidebarAction.svelte?t=1783864665558";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import SidebarMenuSubItem from "/src/lib/components/Sidebar/SidebarMenuSubItem.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<span> </span>`), SidebarMenuItem[$.FILENAME], [[53, 2]]);
var root_1 = $.add_locations($.from_html(`<span class="sr-only"> </span>`), SidebarMenuItem[$.FILENAME], [[55, 2]]);
var root_2 = $.add_locations($.from_html(`<!> <!>`, 1), SidebarMenuItem[$.FILENAME], []);
var root_3 = $.add_locations($.from_html(`<a data-slot="sidebar-menu-button" data-sidebar="menu-button"><!></a>`), SidebarMenuItem[$.FILENAME], [[74, 2]]);
var root_4 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" data-sidebar="menu-button"><!></button>`), SidebarMenuItem[$.FILENAME], [[90, 2]]);
var root_5 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" data-sidebar="menu-button" aria-haspopup="menu"><!> <!></button>`), SidebarMenuItem[$.FILENAME], [[115, 3]]);
var root_6 = $.add_locations($.from_html(`<ul data-slot="sidebar-menu-sub" data-sidebar="menu-sub"></ul>`), SidebarMenuItem[$.FILENAME], [[144, 2]]);
var root_7 = $.add_locations($.from_html(`<!> <!>`, 1), SidebarMenuItem[$.FILENAME], []);
var root_8 = $.add_locations($.from_html(`<div class="relative"><!> <button type="button"><!></button></div>`), SidebarMenuItem[$.FILENAME], [[164, 3, [[166, 4]]]]);
var root_9 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" data-sidebar="menu-button"><!> <!></button>`), SidebarMenuItem[$.FILENAME], [[180, 3]]);
var root_10 = $.add_locations($.from_html(`<!> <!>`, 1), SidebarMenuItem[$.FILENAME], []);
var root_11 = $.add_locations($.from_html(`<div data-slot="sidebar-menu-badge" data-sidebar="menu-badge"> </div>`), SidebarMenuItem[$.FILENAME], [[210, 2]]);
var root_12 = $.add_locations($.from_html(`<div data-slot="sidebar-menu-action" data-sidebar="menu-action"><!></div>`), SidebarMenuItem[$.FILENAME], [[215, 2]]);
var root_13 = $.add_locations($.from_html(`<li data-slot="sidebar-menu-item" data-sidebar="menu-item"><!> <!> <!></li>`), SidebarMenuItem[$.FILENAME], [[156, 0]]);

function SidebarMenuItem($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarMenuItem);

	const entryContent = $.wrap_snippet(SidebarMenuItem, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = root_2();
		var node = $.first_child(fragment);

		$.add_svelte_meta(
			() => SidebarIcon(node, {
				get icon() {
					return $$props.item.icon;
				}
			}),
			'component',
			SidebarMenuItem,
			51,
			1,
			{ componentTag: 'SidebarIcon' }
		);

		var node_1 = $.sibling(node, 2);

		{
			var consequent = ($$anchor) => {
				var span = root();
				var text = $.child(span, true);

				$.reset(span);
				$.template_effect(() => $.set_text(text, $$props.item.label));
				$.append($$anchor, span);
			};

			var alternate = ($$anchor) => {
				var span_1 = root_1();
				var text_1 = $.child(span_1, true);

				$.reset(span_1);
				$.template_effect(() => $.set_text(text_1, $$props.item.label));
				$.append($$anchor, span_1);
			};

			$.add_svelte_meta(
				() => $.if(node_1, ($$render) => {
					if (!$.get(isIconCollapsed)) $$render(consequent); else $$render(alternate, -1);
				}),
				'if',
				SidebarMenuItem,
				52,
				1
			);
		}

		$.append($$anchor, fragment);
	});

	const indicator = $.wrap_snippet(SidebarMenuItem, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_1 = $.comment();
		var node_2 = $.first_child(fragment_1);

		{
			var consequent_2 = ($$anchor) => {
				var fragment_2 = $.comment();
				var node_3 = $.first_child(fragment_2);

				{
					var consequent_1 = ($$anchor) => {
						var fragment_3 = $.comment();
						var node_4 = $.first_child(fragment_3);

						{
							let $0 = $.derived(() => $.get(isOpen) ? minusIcon : plusIcon);

							$.add_svelte_meta(
								() => SidebarIcon(node_4, {
									get icon() {
										return $.get($0);
									},
									class: 'ml-auto size-4'
								}),
								'component',
								SidebarMenuItem,
								62,
								3,
								{ componentTag: 'SidebarIcon' }
							);
						}

						$.append($$anchor, fragment_3);
					};

					var alternate_1 = ($$anchor) => {
						var fragment_4 = $.comment();
						var node_5 = $.first_child(fragment_4);

						{
							let $0 = $.derived(() => $.get(isOpen) ? 'rotate-90' : '');

							$.add_svelte_meta(
								() => SidebarIcon(node_5, {
									get icon() {
										return caretRightIcon;
									},

									get class() {
										return `ml-auto size-4 transition-transform ${$.get($0) ?? ''}`;
									}
								}),
								'component',
								SidebarMenuItem,
								64,
								3,
								{ componentTag: 'SidebarIcon' }
							);
						}

						$.append($$anchor, fragment_4);
					};

					$.add_svelte_meta(
						() => $.if(node_3, ($$render) => {
							if ($.strict_equals($$props.collapseIcon, 'plus-minus')) $$render(consequent_1); else $$render(alternate_1, -1);
						}),
						'if',
						SidebarMenuItem,
						61,
						2
					);
				}

				$.append($$anchor, fragment_2);
			};

			$.add_svelte_meta(
				() => $.if(node_2, ($$render) => {
					if (!$.get(isIconCollapsed)) $$render(consequent_2);
				}),
				'if',
				SidebarMenuItem,
				60,
				1
			);
		}

		$.append($$anchor, fragment_1);
	});

	const leafButton = $.wrap_snippet(SidebarMenuItem, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_5 = $.comment();
		var node_6 = $.first_child(fragment_5);

		{
			var consequent_3 = ($$anchor) => {
				var a = root_3();
				var node_7 = $.child(a);

				$.add_svelte_meta(() => entryContent(node_7), 'render', SidebarMenuItem, 87, 3);
				$.reset(a);

				$.attach(a, () => $.get(tooltipContent)
					? tooltip({ content: $.get(tooltipContent), position: 'right' })
					: undefined);

				$.template_effect(
					($0) => {
						$.set_attribute(a, 'href', $$props.item.href);
						$.set_attribute(a, 'data-size', $$props.item.size ?? 'default');
						$.set_attribute(a, 'data-active', $$props.item.isActive ? 'true' : undefined);
						$.set_attribute(a, 'aria-current', $$props.item.isActive ? 'page' : undefined);
						$.set_attribute(a, 'aria-disabled', $$props.item.disabled || undefined);
						$.set_attribute(a, 'tabindex', $$props.item.disabled ? -1 : undefined);
						$.set_class(a, 1, $0);
					},
					[
						() => $.clsx($.get(classes).menuButton({
							variant: $$props.item.variant,
							size: $$props.item.size,
							className: $$props.item.class
						}))
					]
				);

				$.delegated('click', a, function (...$$args) {
					$.apply(() => $$props.item.onClick, this, $$args, SidebarMenuItem, [85, 12]);
				});

				$.append($$anchor, a);
			};

			var alternate_2 = ($$anchor) => {
				var button = root_4();
				var node_8 = $.child(button);

				$.add_svelte_meta(() => entryContent(node_8), 'render', SidebarMenuItem, 102, 3);
				$.reset(button);

				$.attach(button, () => $.get(tooltipContent)
					? tooltip({ content: $.get(tooltipContent), position: 'right' })
					: undefined);

				$.template_effect(
					($0) => {
						$.set_attribute(button, 'data-size', $$props.item.size ?? 'default');
						$.set_attribute(button, 'data-active', $$props.item.isActive ? 'true' : undefined);
						$.set_attribute(button, 'aria-current', $$props.item.isActive ? 'page' : undefined);
						button.disabled = $$props.item.disabled || undefined;
						$.set_class(button, 1, $0);
					},
					[
						() => $.clsx($.get(classes).menuButton({
							variant: $$props.item.variant,
							size: $$props.item.size,
							className: $$props.item.class
						}))
					]
				);

				$.delegated('click', button, function (...$$args) {
					$.apply(() => $$props.item.onClick, this, $$args, SidebarMenuItem, [100, 12]);
				});

				$.append($$anchor, button);
			};

			$.add_svelte_meta(
				() => $.if(node_6, ($$render) => {
					if ($$props.item.href) $$render(consequent_3); else $$render(alternate_2, -1);
				}),
				'if',
				SidebarMenuItem,
				73,
				1
			);
		}

		$.append($$anchor, fragment_5);
	});

	const dropdownButton = $.wrap_snippet(SidebarMenuItem, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_6 = $.comment();
		var node_9 = $.first_child(fragment_6);

		{
			const trigger = $.wrap_snippet(SidebarMenuItem, function ($$anchor, popover = $.noop) {
				$.validate_snippet_args(...arguments);

				var button_1 = root_5();
				var node_10 = $.child(button_1);

				$.add_svelte_meta(() => entryContent(node_10), 'render', SidebarMenuItem, 135, 4);

				var node_11 = $.sibling(node_10, 2);

				{
					var consequent_4 = ($$anchor) => {
						var fragment_7 = $.comment();
						var node_12 = $.first_child(fragment_7);

						$.add_svelte_meta(
							() => SidebarIcon(node_12, {
								get icon() {
									return dotsThreeIcon;
								},
								class: 'ml-auto size-4'
							}),
							'component',
							SidebarMenuItem,
							136,
							26,
							{ componentTag: 'SidebarIcon' }
						);

						$.append($$anchor, fragment_7);
					};

					$.add_svelte_meta(
						() => $.if(node_11, ($$render) => {
							if (!$.get(isIconCollapsed)) $$render(consequent_4);
						}),
						'if',
						SidebarMenuItem,
						136,
						4
					);
				}

				$.reset(button_1);

				$.attach(button_1, () => $.get(tooltipContent)
					? tooltip({ content: $.get(tooltipContent), position: 'right' })
					: undefined);

				$.attach(button_1, () => popover().reference);

				$.template_effect(
					($0) => {
						$.set_attribute(button_1, 'data-size', $$props.item.size ?? 'default');
						button_1.disabled = $$props.item.disabled || undefined;
						$.set_class(button_1, 1, $0);
						$.set_attribute(button_1, 'aria-expanded', popover().isOpen);
						$.set_attribute(button_1, 'aria-controls', popover().isOpen ? popover().id : undefined);
					},
					[
						() => $.clsx($.get(classes).menuButton({
							variant: $$props.item.variant,
							size: $$props.item.size,
							className: ['aria-expanded:bg-background-muted', $$props.item.class]
						}))
					]
				);

				$.delegated('click', button_1, function click() {
					return popover().toggle();
				});

				$.append($$anchor, button_1);
			});

			let $0 = $.derived(() => ({ items: $$props.item.menu ?? [] }));
			let $1 = $.derived(() => getSidebarMenuPosition($$props.item.menuSide, $$props.item.menuAlign, $$props.api.isMobile));

			$.add_svelte_meta(
				() => PopupMenu(node_9, {
					get menu() {
						return $.get($0);
					},

					get position() {
						return $.get($1);
					},

					get class() {
						return $$props.item.menuClass;
					},
					fitTrigger: true,
					trigger,
					$$slots: { trigger: true }
				}),
				'component',
				SidebarMenuItem,
				108,
				1,
				{ componentTag: 'PopupMenu' }
			);
		}

		$.append($$anchor, fragment_6);
	});

	const submenu = $.wrap_snippet(SidebarMenuItem, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_8 = $.comment();
		var node_13 = $.first_child(fragment_8);

		{
			var consequent_5 = ($$anchor) => {
				var ul = root_6();

				$.add_svelte_meta(
					() => $.each(ul, 23, () => $$props.item.items ?? [], (sub, index) => sub.label + index, ($$anchor, sub) => {
						var fragment_9 = $.comment();
						var node_14 = $.first_child(fragment_9);

						$.add_svelte_meta(
							() => SidebarMenuSubItem(node_14, {
								get sub() {
									return $.get(sub);
								},

								get theme() {
									return $$props.theme;
								}
							}),
							'component',
							SidebarMenuItem,
							150,
							4,
							{ componentTag: 'SidebarMenuSubItem' }
						);

						$.append($$anchor, fragment_9);
					}),
					'each',
					SidebarMenuItem,
					149,
					3
				);

				$.reset(ul);

				$.template_effect(($0) => $.set_class(ul, 1, $0), [
					() => $.clsx($.get(classes).subMenu({ className: $$props.item.subClass }))
				]);

				$.append($$anchor, ul);
			};

			$.add_svelte_meta(
				() => $.if(node_13, ($$render) => {
					if (!$.get(isIconCollapsed)) $$render(consequent_5);
				}),
				'if',
				SidebarMenuItem,
				143,
				1
			);
		}

		$.append($$anchor, fragment_8);
	});

	let open = $.tag($.state(void 0), 'open');
	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const t = $.tag($.derived(useI18n), 't');
	const isOpen = $.tag($.derived(() => $.get(open) ?? $$props.item.defaultOpen ?? false), 'isOpen');
	const isIconCollapsed = $.tag($.derived(() => $.strict_equals($$props.api.displayState, 'collapsed') && !$$props.api.isMobile), 'isIconCollapsed');
	const showTooltip = $.tag($.derived(() => ($.strict_equals($$props.tooltips, 'always') || $.get(isIconCollapsed)) && !$$props.api.isMobile), 'showTooltip');

	const tooltipContent = $.tag(
		$.derived(() => $.get(showTooltip)
			? $$props.item.tooltip ?? $$props.item.label
			: undefined),
		'tooltipContent'
	);

	const hasSubmenu = $.tag($.derived(() => !!$$props.item.items?.length), 'hasSubmenu');

	function toggleSubmenu() {
		if ($$props.item.disabled) return;

		$.set(open, !$.get(isOpen));
	}

	var $$exports = { ...$.legacy_api() };
	var li = root_13();
	var node_15 = $.child(li);

	{
		var consequent_6 = ($$anchor) => {
			$.add_svelte_meta(() => dropdownButton($$anchor), 'render', SidebarMenuItem, 158, 2);
		};

		var consequent_7 = ($$anchor) => {
			var fragment_11 = root_7();
			var node_16 = $.first_child(fragment_11);

			$.add_svelte_meta(() => leafButton(node_16), 'render', SidebarMenuItem, 160, 2);

			var node_17 = $.sibling(node_16, 2);

			$.add_svelte_meta(() => submenu(node_17), 'render', SidebarMenuItem, 161, 2);
			$.append($$anchor, fragment_11);
		};

		var consequent_10 = ($$anchor) => {
			var fragment_12 = root_10();
			var node_18 = $.first_child(fragment_12);

			{
				var consequent_8 = ($$anchor) => {
					var div = root_8();
					var node_19 = $.child(div);

					$.add_svelte_meta(() => leafButton(node_19), 'render', SidebarMenuItem, 165, 4);

					var button_2 = $.sibling(node_19, 2);
					var node_20 = $.child(button_2);

					$.add_svelte_meta(
						() => SidebarIcon(node_20, {
							get icon() {
								return caretRightIcon;
							}
						}),
						'component',
						SidebarMenuItem,
						176,
						5,
						{ componentTag: 'SidebarIcon' }
					);

					$.reset(button_2);
					$.reset(div);

					$.template_effect(
						($0) => {
							$.set_class(button_2, 1, $0);
							$.set_attribute(button_2, 'data-open', $.get(isOpen) ? 'true' : undefined);
							$.set_attribute(button_2, 'aria-label', `${$.get(t).toggle} ${$.get(t).submenu}`);
							$.set_attribute(button_2, 'aria-expanded', $.get(isOpen));
						},
						[
							() => $.clsx($.get(classes).menuAction({
								className: 'left-1 right-auto bg-background-muted data-[open=true]:rotate-90'
							}))
						]
					);

					$.delegated('click', button_2, toggleSubmenu);
					$.append($$anchor, div);
				};

				var alternate_3 = ($$anchor) => {
					var button_3 = root_9();
					var node_21 = $.child(button_3);

					$.add_svelte_meta(() => entryContent(node_21), 'render', SidebarMenuItem, 198, 4);

					var node_22 = $.sibling(node_21, 2);

					$.add_svelte_meta(() => indicator(node_22), 'render', SidebarMenuItem, 199, 4);
					$.reset(button_3);

					$.attach(button_3, () => $.get(tooltipContent)
						? tooltip({ content: $.get(tooltipContent), position: 'right' })
						: undefined);

					$.template_effect(
						($0) => {
							$.set_attribute(button_3, 'data-size', $$props.item.size ?? 'default');
							$.set_attribute(button_3, 'data-active', $$props.item.isActive ? 'true' : undefined);
							button_3.disabled = $$props.item.disabled || undefined;
							$.set_class(button_3, 1, $0);
							$.set_attribute(button_3, 'aria-expanded', $.get(isOpen));
						},
						[
							() => $.clsx($.get(classes).menuButton({
								variant: $$props.item.variant,
								size: $$props.item.size,
								className: $$props.item.class
							}))
						]
					);

					$.delegated('click', button_3, toggleSubmenu);
					$.append($$anchor, button_3);
				};

				$.add_svelte_meta(
					() => $.if(node_18, ($$render) => {
						if ($$props.item.href) $$render(consequent_8); else $$render(alternate_3, -1);
					}),
					'if',
					SidebarMenuItem,
					163,
					2
				);
			}

			var node_23 = $.sibling(node_18, 2);

			{
				var consequent_9 = ($$anchor) => {
					$.add_svelte_meta(() => submenu($$anchor), 'render', SidebarMenuItem, 203, 3);
				};

				$.add_svelte_meta(
					() => $.if(node_23, ($$render) => {
						if ($.get(isOpen)) $$render(consequent_9);
					}),
					'if',
					SidebarMenuItem,
					202,
					2
				);
			}

			$.append($$anchor, fragment_12);
		};

		var alternate_4 = ($$anchor) => {
			$.add_svelte_meta(() => leafButton($$anchor), 'render', SidebarMenuItem, 206, 2);
		};

		$.add_svelte_meta(
			() => $.if(node_15, ($$render) => {
				if ($$props.item.menu) $$render(consequent_6); else if ($.get(hasSubmenu) && $.strict_equals($$props.item.collapsible, false)) $$render(consequent_7, 1); else if ($.get(hasSubmenu)) $$render(consequent_10, 2); else $$render(alternate_4, -1);
			}),
			'if',
			SidebarMenuItem,
			157,
			1
		);
	}

	var node_24 = $.sibling(node_15, 2);

	{
		var consequent_11 = ($$anchor) => {
			var div_1 = root_11();
			var text_2 = $.child(div_1, true);

			$.reset(div_1);

			$.template_effect(
				($0) => {
					$.set_class(div_1, 1, $0);
					$.set_text(text_2, $$props.item.badge);
				},
				[() => $.clsx($.get(classes).badge())]
			);

			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node_24, ($$render) => {
				if ($.equals($$props.item.badge, null, false) && !$.get(isIconCollapsed)) $$render(consequent_11);
			}),
			'if',
			SidebarMenuItem,
			209,
			1
		);
	}

	var node_25 = $.sibling(node_24, 2);

	{
		var consequent_12 = ($$anchor) => {
			var div_2 = root_12();
			var node_26 = $.child(div_2);

			$.add_svelte_meta(
				() => SidebarAction(node_26, {
					get action() {
						return $$props.item.action;
					},

					get api() {
						return $$props.api;
					},

					get theme() {
						return $$props.theme;
					}
				}),
				'component',
				SidebarMenuItem,
				216,
				3,
				{ componentTag: 'SidebarAction' }
			);

			$.reset(div_2);
			$.template_effect(($0) => $.set_class(div_2, 1, $0), [() => $.clsx($.get(classes).menuAction())]);
			$.append($$anchor, div_2);
		};

		$.add_svelte_meta(
			() => $.if(node_25, ($$render) => {
				if ($$props.item.action) $$render(consequent_12);
			}),
			'if',
			SidebarMenuItem,
			214,
			1
		);
	}

	$.reset(li);
	$.template_effect(($0) => $.set_class(li, 1, $0), [() => $.clsx($.get(classes).menuItem())]);
	$.append($$anchor, li);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarMenuItem = $.hmr(SidebarMenuItem);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarMenuItem[$.HMR].update(module.default);
	});
}

export default SidebarMenuItem;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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QUFVO1FBQ3hCLE9BQU8sZUFBTyxPQUFPO1FBQ3JCLElBQUksZUFBTyxJQUFJO1FBQ2YsU0FBUyxlQUFPOzs7OzswQkFWakIsVUFnQlMsYUFBYTt3QkFoQnRCOzs7Ozt1QkFqQlEsSUFBSTs7Ozs7Ozs7Ozs7Ozs2QkF3Q0osT0FBTzs7Ozs7Z0JBRFosTUFBTTs7Ozs7Ozs7Ozs7OzsyQkFJRixVQUFVOzs7OztxQkFqRFYsSUFBSSx5Q0FFSixVQUFVLGtDQUFTLFdBQVcsRUFBSyxLQUFLLDZDQUd4QyxVQUFVOzs7Ozs7Ozs7Ozs7O09BZ0RsQixLQUFHO3dCQUFILEtBQUc7O1dBQUgsS0FBRzs7OztpQkFBSCxLQUFHO3FDQUNHLEtBQUs7O3dCQUR5RCxPQUFPLEVBQUMsS0FBSzs7O3NCQUFqRixLQUFHOzs7Ozs4QkFESyxLQUFLLEVBQUksSUFBSSxtQkFBSyxlQUFlOzs7Ozs7Ozs7Ozs7O09BTXpDLEtBQUc7eUJBQUgsS0FBRzs7O1VBQ0YsYUFBYTs7MEJBQWMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBRGxDLEtBQUc7eUNBQUgsS0FBRyw4QkFBbUUsT0FBTyxFQUFDLFVBQVU7c0JBQXhGLEtBQUc7Ozs7O3FCQURLLE1BQU07Ozs7Ozs7OztTQTFEaEIsRUFBRTt1Q0FBRixFQUFFLDhCQUErRCxPQUFPLEVBQUMsUUFBUTtvQkFBakYsRUFBRTs7O0FBNUdLIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJTaWRlYmFyTWVudUl0ZW0uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBQb3B1cE1lbnUgZnJvbSAnJGxpYi9jb21wb25lbnRzL1BvcHVwTWVudS9Qb3B1cE1lbnUuc3ZlbHRlJztcblx0aW1wb3J0IHsgdG9vbHRpcCB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9Ub29sdGlwL3Rvb2x0aXAuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgY2FyZXRSaWdodEljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvY2FyZXRSaWdodC5qcyc7XG5cdGltcG9ydCB7IGRvdHNUaHJlZUljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvZG90c1RocmVlLmpzJztcblx0aW1wb3J0IHsgbWludXNJY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL21pbnVzLmpzJztcblx0aW1wb3J0IHsgcGx1c0ljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvcGx1cy5qcyc7XG5cdGltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICckbGliL2kxOG4vY29udGV4dC5zdmVsdGUuanMnO1xuXHRpbXBvcnQgdHlwZSB7XG5cdFx0U2lkZWJhckFwaSxcblx0XHRTaWRlYmFyQ29sbGFwc2VJY29uLFxuXHRcdFNpZGViYXJNZW51RW50cnksXG5cdFx0U2lkZWJhclRvb2x0aXBNb2RlXG5cdH0gZnJvbSAnLi9zaWRlYmFyLnByb3BzLmpzJztcblx0aW1wb3J0IHsgZ2V0U2lkZWJhck1lbnVQb3NpdGlvbiB9IGZyb20gJy4vc2lkZWJhci1wb3NpdGlvbi5qcyc7XG5cdGltcG9ydCBTaWRlYmFyQWN0aW9uIGZyb20gJy4vU2lkZWJhckFjdGlvbi5zdmVsdGUnO1xuXHRpbXBvcnQgU2lkZWJhckljb24gZnJvbSAnLi9TaWRlYmFySWNvbi5zdmVsdGUnO1xuXHRpbXBvcnQgU2lkZWJhck1lbnVTdWJJdGVtIGZyb20gJy4vU2lkZWJhck1lbnVTdWJJdGVtLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRpdGVtLFxuXHRcdGFwaSxcblx0XHRjb2xsYXBzZUljb24sXG5cdFx0dG9vbHRpcHMsXG5cdFx0dGhlbWVcblx0fToge1xuXHRcdGl0ZW06IFNpZGViYXJNZW51RW50cnk7XG5cdFx0YXBpOiBTaWRlYmFyQXBpO1xuXHRcdGNvbGxhcHNlSWNvbjogU2lkZWJhckNvbGxhcHNlSWNvbjtcblx0XHR0b29sdGlwczogU2lkZWJhclRvb2x0aXBNb2RlO1xuXHRcdHRoZW1lPzogU2lkZWJhclRoZW1lUHJvcHM7XG5cdH0gPSAkcHJvcHMoKTtcblxuXHRsZXQgb3BlbiA9ICRzdGF0ZTxib29sZWFuIHwgdW5kZWZpbmVkPigpO1xuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2lkZWJhclRoZW1lKHRoZW1lKSk7XG5cdGNvbnN0IHQgPSAkZGVyaXZlZCh1c2VJMThuKCkpO1xuXHRjb25zdCBpc09wZW4gPSAkZGVyaXZlZChvcGVuID8/IGl0ZW0uZGVmYXVsdE9wZW4gPz8gZmFsc2UpO1xuXHRjb25zdCBpc0ljb25Db2xsYXBzZWQgPSAkZGVyaXZlZChhcGkuZGlzcGxheVN0YXRlID09PSAnY29sbGFwc2VkJyAmJiAhYXBpLmlzTW9iaWxlKTtcblx0Y29uc3Qgc2hvd1Rvb2x0aXAgPSAkZGVyaXZlZCgodG9vbHRpcHMgPT09ICdhbHdheXMnIHx8IGlzSWNvbkNvbGxhcHNlZCkgJiYgIWFwaS5pc01vYmlsZSk7XG5cdGNvbnN0IHRvb2x0aXBDb250ZW50ID0gJGRlcml2ZWQoc2hvd1Rvb2x0aXAgPyAoaXRlbS50b29sdGlwID8/IGl0ZW0ubGFiZWwpIDogdW5kZWZpbmVkKTtcblx0Y29uc3QgaGFzU3VibWVudSA9ICRkZXJpdmVkKCEhaXRlbS5pdGVtcz8ubGVuZ3RoKTtcblxuXHRmdW5jdGlvbiB0b2dnbGVTdWJtZW51KCkge1xuXHRcdGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XG5cdFx0b3BlbiA9ICFpc09wZW47XG5cdH1cbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgZW50cnlDb250ZW50KCl9XG5cdDxTaWRlYmFySWNvbiBpY29uPXtpdGVtLmljb259IC8+XG5cdHsjaWYgIWlzSWNvbkNvbGxhcHNlZH1cblx0XHQ8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG5cdHs6ZWxzZX1cblx0XHQ8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj57aXRlbS5sYWJlbH08L3NwYW4+XG5cdHsvaWZ9XG57L3NuaXBwZXR9XG5cbnsjc25pcHBldCBpbmRpY2F0b3IoKX1cblx0eyNpZiAhaXNJY29uQ29sbGFwc2VkfVxuXHRcdHsjaWYgY29sbGFwc2VJY29uID09PSAncGx1cy1taW51cyd9XG5cdFx0XHQ8U2lkZWJhckljb24gaWNvbj17aXNPcGVuID8gbWludXNJY29uIDogcGx1c0ljb259IGNsYXNzPVwibWwtYXV0byBzaXplLTRcIiAvPlxuXHRcdHs6ZWxzZX1cblx0XHRcdDxTaWRlYmFySWNvblxuXHRcdFx0XHRpY29uPXtjYXJldFJpZ2h0SWNvbn1cblx0XHRcdFx0Y2xhc3M9XCJtbC1hdXRvIHNpemUtNCB0cmFuc2l0aW9uLXRyYW5zZm9ybSB7aXNPcGVuID8gJ3JvdGF0ZS05MCcgOiAnJ31cIlxuXHRcdFx0Lz5cblx0XHR7L2lmfVxuXHR7L2lmfVxuey9zbmlwcGV0fVxuXG57I3NuaXBwZXQgbGVhZkJ1dHRvbigpfVxuXHR7I2lmIGl0ZW0uaHJlZn1cblx0XHQ8YVxuXHRcdFx0aHJlZj17aXRlbS5ocmVmfVxuXHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpZGViYXI9XCJtZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpemU9e2l0ZW0uc2l6ZSA/PyAnZGVmYXVsdCd9XG5cdFx0XHRkYXRhLWFjdGl2ZT17aXRlbS5pc0FjdGl2ZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGFyaWEtY3VycmVudD17aXRlbS5pc0FjdGl2ZSA/ICdwYWdlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGFyaWEtZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWQgfHwgdW5kZWZpbmVkfVxuXHRcdFx0dGFiaW5kZXg9e2l0ZW0uZGlzYWJsZWQgPyAtMSA6IHVuZGVmaW5lZH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLm1lbnVCdXR0b24oeyB2YXJpYW50OiBpdGVtLnZhcmlhbnQsIHNpemU6IGl0ZW0uc2l6ZSwgY2xhc3NOYW1lOiBpdGVtLmNsYXNzIH0pfVxuXHRcdFx0e0BhdHRhY2ggdG9vbHRpcENvbnRlbnQgPyB0b29sdGlwKHsgY29udGVudDogdG9vbHRpcENvbnRlbnQsIHBvc2l0aW9uOiAncmlnaHQnIH0pIDogdW5kZWZpbmVkfVxuXHRcdFx0b25jbGljaz17aXRlbS5vbkNsaWNrfVxuXHRcdD5cblx0XHRcdHtAcmVuZGVyIGVudHJ5Q29udGVudCgpfVxuXHRcdDwvYT5cblx0ezplbHNlfVxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpZGViYXI9XCJtZW51LWJ1dHRvblwiXG5cdFx0XHRkYXRhLXNpemU9e2l0ZW0uc2l6ZSA/PyAnZGVmYXVsdCd9XG5cdFx0XHRkYXRhLWFjdGl2ZT17aXRlbS5pc0FjdGl2ZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGFyaWEtY3VycmVudD17aXRlbS5pc0FjdGl2ZSA/ICdwYWdlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGRpc2FibGVkPXtpdGVtLmRpc2FibGVkIHx8IHVuZGVmaW5lZH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLm1lbnVCdXR0b24oeyB2YXJpYW50OiBpdGVtLnZhcmlhbnQsIHNpemU6IGl0ZW0uc2l6ZSwgY2xhc3NOYW1lOiBpdGVtLmNsYXNzIH0pfVxuXHRcdFx0e0BhdHRhY2ggdG9vbHRpcENvbnRlbnQgPyB0b29sdGlwKHsgY29udGVudDogdG9vbHRpcENvbnRlbnQsIHBvc2l0aW9uOiAncmlnaHQnIH0pIDogdW5kZWZpbmVkfVxuXHRcdFx0b25jbGljaz17aXRlbS5vbkNsaWNrfVxuXHRcdD5cblx0XHRcdHtAcmVuZGVyIGVudHJ5Q29udGVudCgpfVxuXHRcdDwvYnV0dG9uPlxuXHR7L2lmfVxuey9zbmlwcGV0fVxuXG57I3NuaXBwZXQgZHJvcGRvd25CdXR0b24oKX1cblx0PFBvcHVwTWVudVxuXHRcdG1lbnU9e3sgaXRlbXM6IGl0ZW0ubWVudSA/PyBbXSB9fVxuXHRcdHBvc2l0aW9uPXtnZXRTaWRlYmFyTWVudVBvc2l0aW9uKGl0ZW0ubWVudVNpZGUsIGl0ZW0ubWVudUFsaWduLCBhcGkuaXNNb2JpbGUpfVxuXHRcdGNsYXNzPXtpdGVtLm1lbnVDbGFzc31cblx0XHRmaXRUcmlnZ2VyXG5cdD5cblx0XHR7I3NuaXBwZXQgdHJpZ2dlcihwb3BvdmVyKX1cblx0XHRcdDxidXR0b25cblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1idXR0b25cIlxuXHRcdFx0XHRkYXRhLXNpZGViYXI9XCJtZW51LWJ1dHRvblwiXG5cdFx0XHRcdGRhdGEtc2l6ZT17aXRlbS5zaXplID8/ICdkZWZhdWx0J31cblx0XHRcdFx0ZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWQgfHwgdW5kZWZpbmVkfVxuXHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5tZW51QnV0dG9uKHtcblx0XHRcdFx0XHR2YXJpYW50OiBpdGVtLnZhcmlhbnQsXG5cdFx0XHRcdFx0c2l6ZTogaXRlbS5zaXplLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogWydhcmlhLWV4cGFuZGVkOmJnLWJhY2tncm91bmQtbXV0ZWQnLCBpdGVtLmNsYXNzXVxuXHRcdFx0XHR9KX1cblx0XHRcdFx0YXJpYS1leHBhbmRlZD17cG9wb3Zlci5pc09wZW59XG5cdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJtZW51XCJcblx0XHRcdFx0YXJpYS1jb250cm9scz17cG9wb3Zlci5pc09wZW4gPyBwb3BvdmVyLmlkIDogdW5kZWZpbmVkfVxuXHRcdFx0XHR7QGF0dGFjaCB0b29sdGlwQ29udGVudFxuXHRcdFx0XHRcdD8gdG9vbHRpcCh7IGNvbnRlbnQ6IHRvb2x0aXBDb250ZW50LCBwb3NpdGlvbjogJ3JpZ2h0JyB9KVxuXHRcdFx0XHRcdDogdW5kZWZpbmVkfVxuXHRcdFx0XHR7QGF0dGFjaCBwb3BvdmVyLnJlZmVyZW5jZX1cblx0XHRcdFx0b25jbGljaz17KCkgPT4gcG9wb3Zlci50b2dnbGUoKX1cblx0XHRcdD5cblx0XHRcdFx0e0ByZW5kZXIgZW50cnlDb250ZW50KCl9XG5cdFx0XHRcdHsjaWYgIWlzSWNvbkNvbGxhcHNlZH08U2lkZWJhckljb24gaWNvbj17ZG90c1RocmVlSWNvbn0gY2xhc3M9XCJtbC1hdXRvIHNpemUtNFwiIC8+ey9pZn1cblx0XHRcdDwvYnV0dG9uPlxuXHRcdHsvc25pcHBldH1cblx0PC9Qb3B1cE1lbnU+XG57L3NuaXBwZXR9XG5cbnsjc25pcHBldCBzdWJtZW51KCl9XG5cdHsjaWYgIWlzSWNvbkNvbGxhcHNlZH1cblx0XHQ8dWxcblx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1zdWJcIlxuXHRcdFx0ZGF0YS1zaWRlYmFyPVwibWVudS1zdWJcIlxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuc3ViTWVudSh7IGNsYXNzTmFtZTogaXRlbS5zdWJDbGFzcyB9KX1cblx0XHQ+XG5cdFx0XHR7I2VhY2ggaXRlbS5pdGVtcyA/PyBbXSBhcyBzdWIsIGluZGV4IChzdWIubGFiZWwgKyBpbmRleCl9XG5cdFx0XHRcdDxTaWRlYmFyTWVudVN1Ykl0ZW0ge3N1Yn0ge3RoZW1lfSAvPlxuXHRcdFx0ey9lYWNofVxuXHRcdDwvdWw+XG5cdHsvaWZ9XG57L3NuaXBwZXR9XG5cbjxsaSBkYXRhLXNsb3Q9XCJzaWRlYmFyLW1lbnUtaXRlbVwiIGRhdGEtc2lkZWJhcj1cIm1lbnUtaXRlbVwiIGNsYXNzPXtjbGFzc2VzLm1lbnVJdGVtKCl9PlxuXHR7I2lmIGl0ZW0ubWVudX1cblx0XHR7QHJlbmRlciBkcm9wZG93bkJ1dHRvbigpfVxuXHR7OmVsc2UgaWYgaGFzU3VibWVudSAmJiBpdGVtLmNvbGxhcHNpYmxlID09PSBmYWxzZX1cblx0XHR7QHJlbmRlciBsZWFmQnV0dG9uKCl9XG5cdFx0e0ByZW5kZXIgc3VibWVudSgpfVxuXHR7OmVsc2UgaWYgaGFzU3VibWVudX1cblx0XHR7I2lmIGl0ZW0uaHJlZn1cblx0XHRcdDxkaXYgY2xhc3M9XCJyZWxhdGl2ZVwiPlxuXHRcdFx0XHR7QHJlbmRlciBsZWFmQnV0dG9uKCl9XG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5tZW51QWN0aW9uKHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQtMSByaWdodC1hdXRvIGJnLWJhY2tncm91bmQtbXV0ZWQgZGF0YS1bb3Blbj10cnVlXTpyb3RhdGUtOTAnXG5cdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0ZGF0YS1vcGVuPXtpc09wZW4gPyAndHJ1ZScgOiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0YXJpYS1sYWJlbD17YCR7dC50b2dnbGV9ICR7dC5zdWJtZW51fWB9XG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxuXHRcdFx0XHRcdG9uY2xpY2s9e3RvZ2dsZVN1Ym1lbnV9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8U2lkZWJhckljb24gaWNvbj17Y2FyZXRSaWdodEljb259IC8+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0ezplbHNlfVxuXHRcdFx0PGJ1dHRvblxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWJ1dHRvblwiXG5cdFx0XHRcdGRhdGEtc2lkZWJhcj1cIm1lbnUtYnV0dG9uXCJcblx0XHRcdFx0ZGF0YS1zaXplPXtpdGVtLnNpemUgPz8gJ2RlZmF1bHQnfVxuXHRcdFx0XHRkYXRhLWFjdGl2ZT17aXRlbS5pc0FjdGl2ZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdFx0ZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWQgfHwgdW5kZWZpbmVkfVxuXHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5tZW51QnV0dG9uKHtcblx0XHRcdFx0XHR2YXJpYW50OiBpdGVtLnZhcmlhbnQsXG5cdFx0XHRcdFx0c2l6ZTogaXRlbS5zaXplLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogaXRlbS5jbGFzc1xuXHRcdFx0XHR9KX1cblx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxuXHRcdFx0XHR7QGF0dGFjaCB0b29sdGlwQ29udGVudFxuXHRcdFx0XHRcdD8gdG9vbHRpcCh7IGNvbnRlbnQ6IHRvb2x0aXBDb250ZW50LCBwb3NpdGlvbjogJ3JpZ2h0JyB9KVxuXHRcdFx0XHRcdDogdW5kZWZpbmVkfVxuXHRcdFx0XHRvbmNsaWNrPXt0b2dnbGVTdWJtZW51fVxuXHRcdFx0PlxuXHRcdFx0XHR7QHJlbmRlciBlbnRyeUNvbnRlbnQoKX1cblx0XHRcdFx0e0ByZW5kZXIgaW5kaWNhdG9yKCl9XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHR7L2lmfVxuXHRcdHsjaWYgaXNPcGVufVxuXHRcdFx0e0ByZW5kZXIgc3VibWVudSgpfVxuXHRcdHsvaWZ9XG5cdHs6ZWxzZX1cblx0XHR7QHJlbmRlciBsZWFmQnV0dG9uKCl9XG5cdHsvaWZ9XG5cblx0eyNpZiBpdGVtLmJhZGdlICE9IG51bGwgJiYgIWlzSWNvbkNvbGxhcHNlZH1cblx0XHQ8ZGl2IGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1iYWRnZVwiIGRhdGEtc2lkZWJhcj1cIm1lbnUtYmFkZ2VcIiBjbGFzcz17Y2xhc3Nlcy5iYWRnZSgpfT5cblx0XHRcdHtpdGVtLmJhZGdlfVxuXHRcdDwvZGl2PlxuXHR7L2lmfVxuXHR7I2lmIGl0ZW0uYWN0aW9ufVxuXHRcdDxkaXYgZGF0YS1zbG90PVwic2lkZWJhci1tZW51LWFjdGlvblwiIGRhdGEtc2lkZWJhcj1cIm1lbnUtYWN0aW9uXCIgY2xhc3M9e2NsYXNzZXMubWVudUFjdGlvbigpfT5cblx0XHRcdDxTaWRlYmFyQWN0aW9uIGFjdGlvbj17aXRlbS5hY3Rpb259IHthcGl9IHt0aGVtZX0gLz5cblx0XHQ8L2Rpdj5cblx0ey9pZn1cbjwvbGk+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1NpZGViYXIvU2lkZWJhck1lbnVJdGVtLnN2ZWx0ZSJ9