import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarMenuButton.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarMenuButton[$.FILENAME] = 'src/lib/components/Sidebar/SidebarMenuButton.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import { caretDownIcon } from "/src/lib/components/Icons/caretDown.ts";
import { caretUpDownIcon } from "/src/lib/components/Icons/caretUpDown.ts";
import { getSidebarMenuPosition } from "/src/lib/components/Sidebar/sidebar-position.ts";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<img class="size-full object-cover"/>`), SidebarMenuButton[$.FILENAME], [[87, 4]]);
var root_1 = $.add_locations($.from_html(`<div><!></div>`), SidebarMenuButton[$.FILENAME], [[85, 2]]);
var root_2 = $.add_locations($.from_html(`<div><!></div>`), SidebarMenuButton[$.FILENAME], [[98, 2]]);
var root_3 = $.add_locations($.from_html(`<span class="truncate font-medium"> </span>`), SidebarMenuButton[$.FILENAME], [[107, 3]]);
var root_4 = $.add_locations($.from_html(`<span class="truncate text-xs text-foreground/60"> </span>`), SidebarMenuButton[$.FILENAME], [[111, 18]]);
var root_5 = $.add_locations($.from_html(`<div class="flex min-w-0 flex-col gap-0.5 leading-none"><span class="truncate font-medium"> </span> <!></div>`), SidebarMenuButton[$.FILENAME], [[109, 3, [[110, 4]]]]);
var root_6 = $.add_locations($.from_html(`<span class="truncate text-xs text-foreground/60"> </span>`), SidebarMenuButton[$.FILENAME], [[116, 18]]);
var root_7 = $.add_locations($.from_html(`<div class="grid min-w-0 flex-1 text-left text-sm leading-tight"><span class="truncate font-medium"> </span> <!></div>`), SidebarMenuButton[$.FILENAME], [[114, 3, [[115, 4]]]]);
var root_8 = $.add_locations($.from_html(`<span class="sr-only"> </span>`), SidebarMenuButton[$.FILENAME], [[120, 2]]);
var root_9 = $.add_locations($.from_html(`<!> <!> <!>`, 1), SidebarMenuButton[$.FILENAME], []);
var root_10 = $.add_locations($.from_html(`<span class="truncate text-xs text-foreground/60"> </span>`), SidebarMenuButton[$.FILENAME], [[137, 17]]);
var root_11 = $.add_locations($.from_html(`<div class="flex items-center gap-2 px-2 py-1 text-left text-sm"><!> <div class="grid min-w-0 flex-1 leading-tight"><span class="truncate font-medium text-foreground"> </span> <!></div></div>`), SidebarMenuButton[$.FILENAME], [[133, 1, [[135, 2, [[136, 3]]]]]]);
var root_12 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button" aria-haspopup="menu"><!></button>`), SidebarMenuButton[$.FILENAME], [[154, 3]]);
var root_13 = $.add_locations($.from_html(`<a data-slot="sidebar-menu-button"><!></a>`), SidebarMenuButton[$.FILENAME], [[170, 1]]);
var root_14 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-menu-button"><!></button>`), SidebarMenuButton[$.FILENAME], [[179, 1]]);

function SidebarMenuButton($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarMenuButton);

	const media = $.wrap_snippet(SidebarMenuButton, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		{
			var consequent_1 = ($$anchor) => {
				var div = root_1();
				var node_1 = $.child(div);

				{
					var consequent = ($$anchor) => {
						var img = root();

						$.template_effect(() => {
							$.set_attribute(img, 'src', $$props.avatar.src);
							$.set_attribute(img, 'alt', $$props.avatar.alt ?? '');
						});

						$.event('error', img, function error() {
							return $.set(avatarImageFailed, true);
						});

						$.replay_events(img);
						$.append($$anchor, img);
					};

					var alternate = ($$anchor) => {
						var text = $.text();

						$.template_effect(($0) => $.set_text(text, $0), [
							() => $$props.avatar.fallback ?? $$props.title.slice(0, 2).toUpperCase()
						]);

						$.append($$anchor, text);
					};

					$.add_svelte_meta(
						() => $.if(node_1, ($$render) => {
							if ($$props.avatar.src && !$.get(avatarImageFailed)) $$render(consequent); else $$render(alternate, -1);
						}),
						'if',
						SidebarMenuButton,
						86,
						3
					);
				}

				$.reset(div);

				$.template_effect(($0) => $.set_class(div, 1, $0), [
					() => $.clsx($.get(classes).avatar({ className: $$props.mediaClass }))
				]);

				$.append($$anchor, div);
			};

			var consequent_2 = ($$anchor) => {
				var div_1 = root_2();
				var node_2 = $.child(div_1);

				{
					let $0 = $.derived(() => $.get(compact) ? 'size-3' : 'size-4');

					$.add_svelte_meta(
						() => SidebarIcon(node_2, {
							get icon() {
								return $$props.icon;
							},

							get class() {
								return $.get($0);
							}
						}),
						'component',
						SidebarMenuButton,
						99,
						3,
						{ componentTag: 'SidebarIcon' }
					);
				}

				$.reset(div_1);

				$.template_effect(($0) => $.set_class(div_1, 1, $0), [
					() => $.clsx($.get(classes).media({
						size: $.get(compact) ? 'compact' : 'default',
						className: $$props.mediaClass
					}))
				]);

				$.append($$anchor, div_1);
			};

			$.add_svelte_meta(
				() => $.if(node, ($$render) => {
					if ($$props.avatar) $$render(consequent_1); else if ($$props.icon) $$render(consequent_2, 1);
				}),
				'if',
				SidebarMenuButton,
				84,
				1
			);
		}

		$.append($$anchor, fragment);
	});

	const rowText = $.wrap_snippet(SidebarMenuButton, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_2 = $.comment();
		var node_3 = $.first_child(fragment_2);

		{
			var consequent_7 = ($$anchor) => {
				var fragment_3 = $.comment();
				var node_4 = $.first_child(fragment_3);

				{
					var consequent_3 = ($$anchor) => {
						var span = root_3();
						var text_1 = $.child(span, true);

						$.reset(span);
						$.template_effect(() => $.set_text(text_1, $$props.title));
						$.append($$anchor, span);
					};

					var consequent_5 = ($$anchor) => {
						var div_2 = root_5();
						var span_1 = $.child(div_2);
						var text_2 = $.child(span_1, true);

						$.reset(span_1);

						var node_5 = $.sibling(span_1, 2);

						{
							var consequent_4 = ($$anchor) => {
								var span_2 = root_4();
								var text_3 = $.child(span_2, true);

								$.reset(span_2);
								$.template_effect(() => $.set_text(text_3, $$props.subtitle));
								$.append($$anchor, span_2);
							};

							$.add_svelte_meta(
								() => $.if(node_5, ($$render) => {
									if ($$props.subtitle) $$render(consequent_4);
								}),
								'if',
								SidebarMenuButton,
								111,
								4
							);
						}

						$.reset(div_2);
						$.template_effect(() => $.set_text(text_2, $$props.title));
						$.append($$anchor, div_2);
					};

					var alternate_1 = ($$anchor) => {
						var div_3 = root_7();
						var span_3 = $.child(div_3);
						var text_4 = $.child(span_3, true);

						$.reset(span_3);

						var node_6 = $.sibling(span_3, 2);

						{
							var consequent_6 = ($$anchor) => {
								var span_4 = root_6();
								var text_5 = $.child(span_4, true);

								$.reset(span_4);
								$.template_effect(() => $.set_text(text_5, $$props.subtitle));
								$.append($$anchor, span_4);
							};

							$.add_svelte_meta(
								() => $.if(node_6, ($$render) => {
									if ($$props.subtitle) $$render(consequent_6);
								}),
								'if',
								SidebarMenuButton,
								116,
								4
							);
						}

						$.reset(div_3);
						$.template_effect(() => $.set_text(text_4, $$props.title));
						$.append($$anchor, div_3);
					};

					$.add_svelte_meta(
						() => $.if(node_4, ($$render) => {
							if ($.get(compact)) $$render(consequent_3); else if ($.get(brand)) $$render(consequent_5, 1); else $$render(alternate_1, -1);
						}),
						'if',
						SidebarMenuButton,
						106,
						2
					);
				}

				$.append($$anchor, fragment_3);
			};

			var alternate_2 = ($$anchor) => {
				var span_5 = root_8();
				var text_6 = $.child(span_5, true);

				$.reset(span_5);
				$.template_effect(() => $.set_text(text_6, $$props.title));
				$.append($$anchor, span_5);
			};

			$.add_svelte_meta(
				() => $.if(node_3, ($$render) => {
					if (!collapsed()) $$render(consequent_7); else $$render(alternate_2, -1);
				}),
				'if',
				SidebarMenuButton,
				105,
				1
			);
		}

		$.append($$anchor, fragment_2);
	});

	const buttonInner = $.wrap_snippet(SidebarMenuButton, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_4 = root_9();
		var node_7 = $.first_child(fragment_4);

		$.add_svelte_meta(() => media(node_7), 'render', SidebarMenuButton, 125, 1);

		var node_8 = $.sibling(node_7, 2);

		$.add_svelte_meta(() => rowText(node_8), 'render', SidebarMenuButton, 126, 1);

		var node_9 = $.sibling(node_8, 2);

		{
			var consequent_8 = ($$anchor) => {
				var fragment_5 = $.comment();
				var node_10 = $.first_child(fragment_5);

				{
					let $0 = $.derived(() => $.get(compact) ? 'opacity-50' : 'ml-auto size-4');

					$.add_svelte_meta(
						() => SidebarIcon(node_10, {
							get icon() {
								return $.get(resolvedTrailing);
							},

							get class() {
								return $.get($0);
							}
						}),
						'component',
						SidebarMenuButton,
						128,
						2,
						{ componentTag: 'SidebarIcon' }
					);
				}

				$.append($$anchor, fragment_5);
			};

			$.add_svelte_meta(
				() => $.if(node_9, ($$render) => {
					if ($.get(resolvedTrailing) && !collapsed()) $$render(consequent_8);
				}),
				'if',
				SidebarMenuButton,
				127,
				1
			);
		}

		$.append($$anchor, fragment_4);
	});

	const identityRow = $.wrap_snippet(SidebarMenuButton, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var div_4 = root_11();
		var node_11 = $.child(div_4);

		$.add_svelte_meta(() => media(node_11), 'render', SidebarMenuButton, 134, 2);

		var div_5 = $.sibling(node_11, 2);
		var span_6 = $.child(div_5);
		var text_7 = $.child(span_6, true);

		$.reset(span_6);

		var node_12 = $.sibling(span_6, 2);

		{
			var consequent_9 = ($$anchor) => {
				var span_7 = root_10();
				var text_8 = $.child(span_7, true);

				$.reset(span_7);
				$.template_effect(() => $.set_text(text_8, $$props.subtitle));
				$.append($$anchor, span_7);
			};

			$.add_svelte_meta(
				() => $.if(node_12, ($$render) => {
					if ($$props.subtitle) $$render(consequent_9);
				}),
				'if',
				SidebarMenuButton,
				137,
				3
			);
		}

		$.reset(div_5);
		$.reset(div_4);
		$.template_effect(() => $.set_text(text_7, $$props.title));
		$.append($$anchor, div_4);
	});

	let variant = $.prop($$props, 'variant', 3, 'default'),
		menuShowLabel = $.prop($$props, 'menuShowLabel', 3, false),
		isMobile = $.prop($$props, 'isMobile', 3, false),
		defaultAlign = $.prop($$props, 'defaultAlign', 3, 'start'),
		collapsed = $.prop($$props, 'collapsed', 3, false);

	let avatarImageFailed = $.tag($.state(false), 'avatarImageFailed');
	let previousAvatarSrc = $.tag($.state(void 0), 'previousAvatarSrc');
	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const compact = $.tag($.derived(() => $.strict_equals(variant(), 'compact')), 'compact');
	const brand = $.tag($.derived(() => $.strict_equals(variant(), 'brand')), 'brand');

	const resolvedTrailing = $.tag(
		$.derived(() => $.strict_equals($$props.trailing, false)
			? undefined
			: $$props.trailing ?? ($$props.menu
				? $.get(compact) ? caretDownIcon : caretUpDownIcon
				: undefined)),
		'resolvedTrailing'
	);

	const resolvedOpenStyle = $.tag($.derived(() => $$props.openStyle ?? ($$props.avatar ? 'muted' : 'accent')), 'resolvedOpenStyle');

	const openClass = $.tag(
		$.derived(() => $$props.menu && !$.get(compact)
			? $.strict_equals($.get(resolvedOpenStyle), 'muted')
				? 'aria-expanded:bg-background-muted'
				: 'aria-expanded:bg-primary/10 aria-expanded:text-primary'
			: ''),
		'openClass'
	);

	const buttonClass = $.tag(
		$.derived(() => $.get(classes).menuButton({
			size: $.get(compact) ? 'default' : 'lg',
			className: [
				$.get(compact) && 'w-fit px-1.5',
				$.get(openClass),
				$$props.class
			]
		})),
		'buttonClass'
	);

	const menuPosition = $.tag($.derived(() => getSidebarMenuPosition($$props.menuSide ?? ($.get(compact) || $.get(brand) ? 'bottom' : undefined), $$props.menuAlign ?? defaultAlign(), isMobile())), 'menuPosition');

	$.user_effect(() => {
		const avatarSrc = $$props.avatar?.src;

		if ($.strict_equals(avatarSrc, $.get(previousAvatarSrc))) return;

		$.set(previousAvatarSrc, avatarSrc, true);
		$.set(avatarImageFailed, false);
	});

	var $$exports = { ...$.legacy_api() };
	var fragment_6 = $.comment();
	var node_13 = $.first_child(fragment_6);

	{
		var consequent_10 = ($$anchor) => {
			var fragment_7 = $.comment();
			var node_14 = $.first_child(fragment_7);

			{
				const trigger = $.wrap_snippet(SidebarMenuButton, function ($$anchor, popover = $.noop) {
					$.validate_snippet_args(...arguments);

					var button = root_12();
					var node_15 = $.child(button);

					$.add_svelte_meta(() => buttonInner(node_15), 'render', SidebarMenuButton, 165, 4);
					$.reset(button);
					$.attach(button, () => popover().reference);

					$.template_effect(() => {
						$.set_attribute(button, 'data-size', $.get(compact) ? 'default' : 'lg');
						$.set_class(button, 1, $.clsx($.get(buttonClass)));
						$.set_attribute(button, 'aria-expanded', popover().isOpen);
						$.set_attribute(button, 'aria-controls', popover().isOpen ? popover().id : undefined);
					});

					$.delegated('click', button, function click() {
						return popover().toggle();
					});

					$.append($$anchor, button);
				});

				let $0 = $.derived(() => ({
					items: $$props.menu,
					header: menuShowLabel() ? identityRow : undefined,
					theme: $$props.menuIconClass
						? { option: { prefix: { base: $$props.menuIconClass } } }
						: undefined
				}));

				let $1 = $.derived(() => $$props.menuClass ?? 'min-w-56 rounded-lg');
				let $2 = $.derived(() => !$.get(compact));

				$.add_svelte_meta(
					() => PopupMenu(node_14, {
						get menu() {
							return $.get($0);
						},

						get position() {
							return $.get(menuPosition);
						},

						get class() {
							return $.get($1);
						},

						get fitTrigger() {
							return $.get($2);
						},
						trigger,
						$$slots: { trigger: true }
					}),
					'component',
					SidebarMenuButton,
					143,
					1,
					{ componentTag: 'PopupMenu' }
				);
			}

			$.append($$anchor, fragment_7);
		};

		var consequent_11 = ($$anchor) => {
			var a = root_13();
			var node_16 = $.child(a);

			$.add_svelte_meta(() => buttonInner(node_16), 'render', SidebarMenuButton, 176, 2);
			$.reset(a);

			$.template_effect(() => {
				$.set_attribute(a, 'href', $$props.href);
				$.set_attribute(a, 'data-size', $.get(compact) ? 'default' : 'lg');
				$.set_class(a, 1, $.clsx($.get(buttonClass)));
			});

			$.append($$anchor, a);
		};

		var alternate_3 = ($$anchor) => {
			var button_1 = root_14();
			var node_17 = $.child(button_1);

			$.add_svelte_meta(() => buttonInner(node_17), 'render', SidebarMenuButton, 186, 2);
			$.reset(button_1);

			$.template_effect(() => {
				$.set_attribute(button_1, 'data-size', $.get(compact) ? 'default' : 'lg');
				$.set_class(button_1, 1, $.clsx($.get(buttonClass)));
			});

			$.delegated('click', button_1, function (...$$args) {
				$.apply(() => $$props.onClick, this, $$args, SidebarMenuButton, [181, 11]);
			});

			$.append($$anchor, button_1);
		};

		$.add_svelte_meta(
			() => $.if(node_13, ($$render) => {
				if ($$props.menu) $$render(consequent_10); else if ($$props.href) $$render(consequent_11, 1); else $$render(alternate_3, -1);
			}),
			'if',
			SidebarMenuButton,
			142,
			0
		);
	}

	$.append($$anchor, fragment_6);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarMenuButton = $.hmr(SidebarMenuButton);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarMenuButton[$.HMR].update(module.default);
	});
}

export default SidebarMenuButton;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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MEJBUHREO2FBU2UsT0FBTyxHQUFDLE1BQU07Ozt3QkFUN0I7Ozs7S0FURCxLQUFLO0tBQ0wsTUFBTSxFQUFFLGFBQWEsS0FBRyxXQUFXLEdBQUcsU0FBUztLQUMvQyxLQUFLO1VBQW9CLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSTtRQUF3Qjs7O2tEQUd0RCxxQkFBcUI7b0NBQzVCLE9BQU87OztXQVJwQjs7Ozs7O29CQU1VLFlBQVk7Ozs7Ozs7Ozs7TUFJWixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7T0FpQmpCO3lCQUFBOzsyQkFNUyxXQUFXO1dBTnBCOzs7b0JBQUE7b0JBQUEsc0JBR1csT0FBTyxJQUFHLFNBQVMsR0FBRyxJQUFJO2dCQUhyQyxtQkFJTyxXQUFXOzs7c0JBSmxCOzs7O09BU0E7eUJBQUE7OzJCQU9TLFdBQVc7V0FQcEI7OztvQkFBQSw2QkFJVyxPQUFPLElBQUcsU0FBUyxHQUFHLElBQUk7Z0JBSnJDLDBCQUtPLFdBQVc7Ozt3QkFMbEI7Ozs7c0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbEdNIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJTaWRlYmFyTWVudUJ1dHRvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFBvcHVwTWVudSBmcm9tICckbGliL2NvbXBvbmVudHMvUG9wdXBNZW51L1BvcHVwTWVudS5zdmVsdGUnO1xuXHRpbXBvcnQgeyBjYXJldERvd25JY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL2NhcmV0RG93bi5qcyc7XG5cdGltcG9ydCB7IGNhcmV0VXBEb3duSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9jYXJldFVwRG93bi5qcyc7XG5cdGltcG9ydCB0eXBlIHsgU2lkZWJhck1lbnVCdXR0b25JdGVtIH0gZnJvbSAnLi9zaWRlYmFyLnByb3BzLmpzJztcblx0aW1wb3J0IHsgZ2V0U2lkZWJhck1lbnVQb3NpdGlvbiB9IGZyb20gJy4vc2lkZWJhci1wb3NpdGlvbi5qcyc7XG5cdGltcG9ydCBTaWRlYmFySWNvbiBmcm9tICcuL1NpZGViYXJJY29uLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0dHlwZSBQcm9wcyA9IFNpZGViYXJNZW51QnV0dG9uSXRlbSAmIHtcblx0XHRpc01vYmlsZT86IGJvb2xlYW47XG5cdFx0ZGVmYXVsdEFsaWduPzogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCc7XG5cdFx0Y29sbGFwc2VkPzogYm9vbGVhbjtcblx0XHR0aGVtZT86IFNpZGViYXJUaGVtZVByb3BzO1xuXHR9O1xuXG5cdGxldCB7XG5cdFx0aWNvbixcblx0XHRhdmF0YXIsXG5cdFx0dmFyaWFudCA9ICdkZWZhdWx0Jyxcblx0XHR0aXRsZSxcblx0XHRzdWJ0aXRsZSxcblx0XHR0cmFpbGluZyxcblx0XHRocmVmLFxuXHRcdG9uQ2xpY2ssXG5cdFx0bWVudSxcblx0XHRtZW51U2lkZSxcblx0XHRtZW51QWxpZ24sXG5cdFx0bWVudUNsYXNzLFxuXHRcdG1lbnVJY29uQ2xhc3MsXG5cdFx0bWVudVNob3dMYWJlbCA9IGZhbHNlLFxuXHRcdG9wZW5TdHlsZSxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdG1lZGlhQ2xhc3MsXG5cdFx0aXNNb2JpbGUgPSBmYWxzZSxcblx0XHRkZWZhdWx0QWxpZ24gPSAnc3RhcnQnLFxuXHRcdGNvbGxhcHNlZCA9IGZhbHNlLFxuXHRcdHRoZW1lXG5cdH06IFByb3BzID0gJHByb3BzKCk7XG5cblx0bGV0IGF2YXRhckltYWdlRmFpbGVkID0gJHN0YXRlKGZhbHNlKTtcblx0bGV0IHByZXZpb3VzQXZhdGFyU3JjID0gJHN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2lkZWJhclRoZW1lKHRoZW1lKSk7XG5cdGNvbnN0IGNvbXBhY3QgPSAkZGVyaXZlZCh2YXJpYW50ID09PSAnY29tcGFjdCcpO1xuXHRjb25zdCBicmFuZCA9ICRkZXJpdmVkKHZhcmlhbnQgPT09ICdicmFuZCcpO1xuXHRjb25zdCByZXNvbHZlZFRyYWlsaW5nID0gJGRlcml2ZWQoXG5cdFx0dHJhaWxpbmcgPT09IGZhbHNlXG5cdFx0XHQ/IHVuZGVmaW5lZFxuXHRcdFx0OiAodHJhaWxpbmcgPz8gKG1lbnUgPyAoY29tcGFjdCA/IGNhcmV0RG93bkljb24gOiBjYXJldFVwRG93bkljb24pIDogdW5kZWZpbmVkKSlcblx0KTtcblx0Y29uc3QgcmVzb2x2ZWRPcGVuU3R5bGUgPSAkZGVyaXZlZChvcGVuU3R5bGUgPz8gKGF2YXRhciA/ICdtdXRlZCcgOiAnYWNjZW50JykpO1xuXHRjb25zdCBvcGVuQ2xhc3MgPSAkZGVyaXZlZChcblx0XHRtZW51ICYmICFjb21wYWN0XG5cdFx0XHQ/IHJlc29sdmVkT3BlblN0eWxlID09PSAnbXV0ZWQnXG5cdFx0XHRcdD8gJ2FyaWEtZXhwYW5kZWQ6YmctYmFja2dyb3VuZC1tdXRlZCdcblx0XHRcdFx0OiAnYXJpYS1leHBhbmRlZDpiZy1wcmltYXJ5LzEwIGFyaWEtZXhwYW5kZWQ6dGV4dC1wcmltYXJ5J1xuXHRcdFx0OiAnJ1xuXHQpO1xuXHRjb25zdCBidXR0b25DbGFzcyA9ICRkZXJpdmVkKFxuXHRcdGNsYXNzZXMubWVudUJ1dHRvbih7XG5cdFx0XHRzaXplOiBjb21wYWN0ID8gJ2RlZmF1bHQnIDogJ2xnJyxcblx0XHRcdGNsYXNzTmFtZTogW2NvbXBhY3QgJiYgJ3ctZml0IHB4LTEuNScsIG9wZW5DbGFzcywgY2xhc3NOYW1lXVxuXHRcdH0pXG5cdCk7XG5cdGNvbnN0IG1lbnVQb3NpdGlvbiA9ICRkZXJpdmVkKFxuXHRcdGdldFNpZGViYXJNZW51UG9zaXRpb24oXG5cdFx0XHRtZW51U2lkZSA/PyAoY29tcGFjdCB8fCBicmFuZCA/ICdib3R0b20nIDogdW5kZWZpbmVkKSxcblx0XHRcdG1lbnVBbGlnbiA/PyBkZWZhdWx0QWxpZ24sXG5cdFx0XHRpc01vYmlsZVxuXHRcdClcblx0KTtcblxuXHQkZWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCBhdmF0YXJTcmMgPSBhdmF0YXI/LnNyYztcblx0XHRpZiAoYXZhdGFyU3JjID09PSBwcmV2aW91c0F2YXRhclNyYykgcmV0dXJuO1xuXG5cdFx0cHJldmlvdXNBdmF0YXJTcmMgPSBhdmF0YXJTcmM7XG5cdFx0YXZhdGFySW1hZ2VGYWlsZWQgPSBmYWxzZTtcblx0fSk7XG48L3NjcmlwdD5cblxueyNzbmlwcGV0IG1lZGlhKCl9XG5cdHsjaWYgYXZhdGFyfVxuXHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMuYXZhdGFyKHsgY2xhc3NOYW1lOiBtZWRpYUNsYXNzIH0pfT5cblx0XHRcdHsjaWYgYXZhdGFyLnNyYyAmJiAhYXZhdGFySW1hZ2VGYWlsZWR9XG5cdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRzcmM9e2F2YXRhci5zcmN9XG5cdFx0XHRcdFx0YWx0PXthdmF0YXIuYWx0ID8/ICcnfVxuXHRcdFx0XHRcdGNsYXNzPVwic2l6ZS1mdWxsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdFx0b25lcnJvcj17KCkgPT4gKGF2YXRhckltYWdlRmFpbGVkID0gdHJ1ZSl9XG5cdFx0XHRcdC8+XG5cdFx0XHR7OmVsc2V9XG5cdFx0XHRcdHthdmF0YXIuZmFsbGJhY2sgPz8gdGl0bGUuc2xpY2UoMCwgMikudG9VcHBlckNhc2UoKX1cblx0XHRcdHsvaWZ9XG5cdFx0PC9kaXY+XG5cdHs6ZWxzZSBpZiBpY29ufVxuXHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMubWVkaWEoeyBzaXplOiBjb21wYWN0ID8gJ2NvbXBhY3QnIDogJ2RlZmF1bHQnLCBjbGFzc05hbWU6IG1lZGlhQ2xhc3MgfSl9PlxuXHRcdFx0PFNpZGViYXJJY29uIHtpY29ufSBjbGFzcz17Y29tcGFjdCA/ICdzaXplLTMnIDogJ3NpemUtNCd9IC8+XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG57L3NuaXBwZXR9XG5cbnsjc25pcHBldCByb3dUZXh0KCl9XG5cdHsjaWYgIWNvbGxhcHNlZH1cblx0XHR7I2lmIGNvbXBhY3R9XG5cdFx0XHQ8c3BhbiBjbGFzcz1cInRydW5jYXRlIGZvbnQtbWVkaXVtXCI+e3RpdGxlfTwvc3Bhbj5cblx0XHR7OmVsc2UgaWYgYnJhbmR9XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBtaW4tdy0wIGZsZXgtY29sIGdhcC0wLjUgbGVhZGluZy1ub25lXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidHJ1bmNhdGUgZm9udC1tZWRpdW1cIj57dGl0bGV9PC9zcGFuPlxuXHRcdFx0XHR7I2lmIHN1YnRpdGxlfTxzcGFuIGNsYXNzPVwidHJ1bmNhdGUgdGV4dC14cyB0ZXh0LWZvcmVncm91bmQvNjBcIj57c3VidGl0bGV9PC9zcGFuPnsvaWZ9XG5cdFx0XHQ8L2Rpdj5cblx0XHR7OmVsc2V9XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JpZCBtaW4tdy0wIGZsZXgtMSB0ZXh0LWxlZnQgdGV4dC1zbSBsZWFkaW5nLXRpZ2h0XCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidHJ1bmNhdGUgZm9udC1tZWRpdW1cIj57dGl0bGV9PC9zcGFuPlxuXHRcdFx0XHR7I2lmIHN1YnRpdGxlfTxzcGFuIGNsYXNzPVwidHJ1bmNhdGUgdGV4dC14cyB0ZXh0LWZvcmVncm91bmQvNjBcIj57c3VidGl0bGV9PC9zcGFuPnsvaWZ9XG5cdFx0XHQ8L2Rpdj5cblx0XHR7L2lmfVxuXHR7OmVsc2V9XG5cdFx0PHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+e3RpdGxlfTwvc3Bhbj5cblx0ey9pZn1cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IGJ1dHRvbklubmVyKCl9XG5cdHtAcmVuZGVyIG1lZGlhKCl9XG5cdHtAcmVuZGVyIHJvd1RleHQoKX1cblx0eyNpZiByZXNvbHZlZFRyYWlsaW5nICYmICFjb2xsYXBzZWR9XG5cdFx0PFNpZGViYXJJY29uIGljb249e3Jlc29sdmVkVHJhaWxpbmd9IGNsYXNzPXtjb21wYWN0ID8gJ29wYWNpdHktNTAnIDogJ21sLWF1dG8gc2l6ZS00J30gLz5cblx0ey9pZn1cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IGlkZW50aXR5Um93KCl9XG5cdDxkaXYgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0yIHB5LTEgdGV4dC1sZWZ0IHRleHQtc21cIj5cblx0XHR7QHJlbmRlciBtZWRpYSgpfVxuXHRcdDxkaXYgY2xhc3M9XCJncmlkIG1pbi13LTAgZmxleC0xIGxlYWRpbmctdGlnaHRcIj5cblx0XHRcdDxzcGFuIGNsYXNzPVwidHJ1bmNhdGUgZm9udC1tZWRpdW0gdGV4dC1mb3JlZ3JvdW5kXCI+e3RpdGxlfTwvc3Bhbj5cblx0XHRcdHsjaWYgc3VidGl0bGV9PHNwYW4gY2xhc3M9XCJ0cnVuY2F0ZSB0ZXh0LXhzIHRleHQtZm9yZWdyb3VuZC82MFwiPntzdWJ0aXRsZX08L3NwYW4+ey9pZn1cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG57L3NuaXBwZXR9XG5cbnsjaWYgbWVudX1cblx0PFBvcHVwTWVudVxuXHRcdG1lbnU9e3tcblx0XHRcdGl0ZW1zOiBtZW51LFxuXHRcdFx0aGVhZGVyOiBtZW51U2hvd0xhYmVsID8gaWRlbnRpdHlSb3cgOiB1bmRlZmluZWQsXG5cdFx0XHR0aGVtZTogbWVudUljb25DbGFzcyA/IHsgb3B0aW9uOiB7IHByZWZpeDogeyBiYXNlOiBtZW51SWNvbkNsYXNzIH0gfSB9IDogdW5kZWZpbmVkXG5cdFx0fX1cblx0XHRwb3NpdGlvbj17bWVudVBvc2l0aW9ufVxuXHRcdGNsYXNzPXttZW51Q2xhc3MgPz8gJ21pbi13LTU2IHJvdW5kZWQtbGcnfVxuXHRcdGZpdFRyaWdnZXI9eyFjb21wYWN0fVxuXHQ+XG5cdFx0eyNzbmlwcGV0IHRyaWdnZXIocG9wb3Zlcil9XG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLW1lbnUtYnV0dG9uXCJcblx0XHRcdFx0ZGF0YS1zaXplPXtjb21wYWN0ID8gJ2RlZmF1bHQnIDogJ2xnJ31cblx0XHRcdFx0Y2xhc3M9e2J1dHRvbkNsYXNzfVxuXHRcdFx0XHRhcmlhLWV4cGFuZGVkPXtwb3BvdmVyLmlzT3Blbn1cblx0XHRcdFx0YXJpYS1oYXNwb3B1cD1cIm1lbnVcIlxuXHRcdFx0XHRhcmlhLWNvbnRyb2xzPXtwb3BvdmVyLmlzT3BlbiA/IHBvcG92ZXIuaWQgOiB1bmRlZmluZWR9XG5cdFx0XHRcdHtAYXR0YWNoIHBvcG92ZXIucmVmZXJlbmNlfVxuXHRcdFx0XHRvbmNsaWNrPXsoKSA9PiBwb3BvdmVyLnRvZ2dsZSgpfVxuXHRcdFx0PlxuXHRcdFx0XHR7QHJlbmRlciBidXR0b25Jbm5lcigpfVxuXHRcdFx0PC9idXR0b24+XG5cdFx0ey9zbmlwcGV0fVxuXHQ8L1BvcHVwTWVudT5cbns6ZWxzZSBpZiBocmVmfVxuXHQ8YVxuXHRcdHtocmVmfVxuXHRcdGRhdGEtc2xvdD1cInNpZGViYXItbWVudS1idXR0b25cIlxuXHRcdGRhdGEtc2l6ZT17Y29tcGFjdCA/ICdkZWZhdWx0JyA6ICdsZyd9XG5cdFx0Y2xhc3M9e2J1dHRvbkNsYXNzfVxuXHQ+XG5cdFx0e0ByZW5kZXIgYnV0dG9uSW5uZXIoKX1cblx0PC9hPlxuezplbHNlfVxuXHQ8YnV0dG9uXG5cdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0b25jbGljaz17b25DbGlja31cblx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLW1lbnUtYnV0dG9uXCJcblx0XHRkYXRhLXNpemU9e2NvbXBhY3QgPyAnZGVmYXVsdCcgOiAnbGcnfVxuXHRcdGNsYXNzPXtidXR0b25DbGFzc31cblx0PlxuXHRcdHtAcmVuZGVyIGJ1dHRvbklubmVyKCl9XG5cdDwvYnV0dG9uPlxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFyTWVudUJ1dHRvbi5zdmVsdGUifQ==