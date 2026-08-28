import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Menu/MenuFloating.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

MenuFloating[$.FILENAME] = 'src/lib/components/Menu/MenuFloating.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { onMount, untrack } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { on } from "/node_modules/.vite/deps/svelte_events.js?v=1b1d2797";
import { useI18n } from "/src/lib/i18n/context.svelte.ts?t=1783864665558";
import { useNavigation } from "/src/lib/utils/useNavigation.svelte.ts";
import Button from "/src/lib/components/Button/Button.svelte";
import { arrowLeftIcon } from "/src/lib/components/Icons/arrowLeft.ts";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import MenuOption from "/src/lib/components/MenuOption/MenuOption.svelte";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import { usePopoverContext } from "/src/lib/components/Popover/popover.state.svelte.ts";
import Separator from "/src/lib/components/Separator/Separator.svelte";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useMenuTheme } from "/src/lib/components/Menu/menu.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'items',
	'class',
	'theme',
	'header',
	'footer',
	'focusOnMount'
]);

var root = $.add_locations($.from_html(`<!> <!>`, 1), MenuFloating[$.FILENAME], []);
var root_1 = $.add_locations($.from_html(`<div><!> <!> <!></div>`), MenuFloating[$.FILENAME], [[118, 0]]);

function MenuFloating($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, MenuFloating);

	let className = $.prop($$props, 'class', 3, ''),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const parentPopover = usePopoverContext();
	const classes = $.tag($.derived(() => useMenuTheme($$props.theme)), 'classes');
	const t = $.tag($.derived(useI18n), 't');
	const isInMobileSheet = $.tag($.derived(() => parentPopover?.isMobileSheet ?? false), 'isInMobileSheet');
	const hasParentMenu = $.tag($.derived(() => !!parentPopover?.parent), 'hasParentMenu');
	const showBackControl = $.tag($.derived(() => $.get(isInMobileSheet) && $.get(hasParentMenu)), 'showBackControl');
	const submenuPosition = (breakpoint) => $.strict_equals(breakpoint, 'xs') || $.strict_equals(breakpoint, 'sm') ? 'bottom-start' : 'right-start';
	let submenuPopovers = $.tag_proxy($.proxy({}), 'submenuPopovers');

	// Derived from the popovers' own isOpen (which flips the instant open()/close()
	// is called) — NOT from onOpen/onClose callbacks, which only fire after the
	// intro/outro transitions and would keep the parent nav frozen during the fade.
	const anySubmenuOpen = $.tag($.derived(() => Object.values(submenuPopovers).some((p) => p.isOpen)), 'anySubmenuOpen');

	const navigation = useNavigation({
		enabled: () => {
			if (parentPopover?.hasChildOpen || $.get(anySubmenuOpen)) return false;

			return true;
		},
		orientation: () => 'vertical',
		loop: true,
		id,
		enableHoverFocus: true,
		defaultFocusedIndex: () => navigation.lastFocusedIndex ?? 0,
		preventKeyboardDefault: false
	});

	onMount(() => {
		if ($.strict_equals($$props.focusOnMount, 'container')) {
			navigation.focusContainer();

			return;
		}

		if ($$props.focusOnMount) navigation.focusFirst();
	});

	const closeParentMenu = () => {
		if (!parentPopover) return;

		const trigger = parentPopover.referenceElement;

		parentPopover.close();

		if (trigger instanceof HTMLElement) trigger.focus();
	};

	const goBack = () => {
		closeParentMenu();
	};

	const goUp = () => {
		if (!$.get(hasParentMenu)) return;

		goBack();
	};

	const attachPrevious = (node) => {
		Object.assign(node, { onPrevious: goUp });
	};

	const attachBackControl = (node) => {
		Object.assign(node, { onPrevious: goBack });
	};

	const pointerFrom = (e) => ({ x: e.clientX, y: e.clientY });

	const closeSubmenus = (exceptIndex, pointer) => {
		for (const [key, popover] of Object.entries(submenuPopovers)) {
			const index = Number(key);

			if ($.strict_equals(index, exceptIndex)) continue;

			// Don't close a submenu the pointer is still travelling toward: its safe
			// area (the trigger→panel corridor) has authority during the diagonal
			// transit, so a sibling row you merely cross doesn't slam it shut.
			if (pointer && popover.safeArea.containsPoint(pointer.x, pointer.y)) continue;

			popover.close();
		}
	};

	// The moment every submenu is closed (isOpen, not transition end), hand the
	// hover highlight to the row actually under the mouse — the parent nav was
	// disabled while a submenu was open, so the highlight froze on the trigger.
	let hadSubmenuOpen = false;

	$.user_effect(() => {
		const open = $.get(anySubmenuOpen);

		untrack(() => {
			if (hadSubmenuOpen && !open) navigation.syncPointerFocus();

			hadSubmenuOpen = open;
		});
	});

	var $$exports = { ...$.legacy_api() };
	var div = root_1();

	$.attribute_effect(div, ($0) => ({ class: $0, role: 'menu', ...attachments }), [() => $.get(classes).root({ className: className() })]);

	var node_1 = $.child(div);

	{
		var consequent = ($$anchor) => {
			var fragment = root();
			var node_2 = $.first_child(fragment);

			{
				let $0 = $.derived(() => $$props.theme?.option);

				$.add_svelte_meta(
					() => MenuOption(node_2, {
						role: 'menuitem',
						get title() {
							return $.get(t).back;
						},

						get prefix() {
							return arrowLeftIcon;
						},

						get theme() {
							return $.get($0);
						},
						attrs: { 'data-menu-keep-open': 'true' },
						onClick: () => {
							goBack();
						},
						[$.attachment()]: ($$node) => (navigation.itemReference || $.noop)($$node),
						[$.attachment()]: attachBackControl
					}),
					'component',
					MenuFloating,
					125,
					2,
					{ componentTag: 'MenuOption' }
				);
			}

			var node_3 = $.sibling(node_2, 2);

			{
				let $0 = $.derived(() => $$props.theme?.separator);

				$.add_svelte_meta(
					() => Separator(node_3, {
						get theme() {
							return $.get($0);
						}
					}),
					'component',
					MenuFloating,
					137,
					2,
					{ componentTag: 'Separator' }
				);
			}

			$.append($$anchor, fragment);
		};

		var alternate = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_4 = $.first_child(fragment_1);

			{
				let $0 = $.derived(() => !!$$props.header);
				let $1 = $.derived(() => $.get(classes).header());

				$.add_svelte_meta(
					() => Slot(node_4, {
						get render() {
							return $$props.header;
						},

						get renderIf() {
							return $.get($0);
						},

						get class() {
							return $.get($1);
						}
					}),
					'component',
					MenuFloating,
					139,
					2,
					{ componentTag: 'Slot' }
				);
			}

			$.append($$anchor, fragment_1);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.get(showBackControl)) $$render(consequent); else $$render(alternate, -1);
			}),
			'if',
			MenuFloating,
			124,
			1
		);
	}

	var node_5 = $.sibling(node_1, 2);

	$.add_svelte_meta(
		() => $.each(node_5, 17, () => $$props.items, $.index, ($$anchor, item, index) => {
			var fragment_2 = $.comment();
			var node_6 = $.first_child(fragment_2);

			{
				var consequent_1 = ($$anchor) => {
					var fragment_3 = $.comment();
					var node_7 = $.first_child(fragment_3);

					{
						let $0 = $.derived(() => $$props.theme?.button);

						$.add_svelte_meta(
							() => Button(node_7, $.spread_props({ role: 'menuitem' }, () => $.get(item), {
								get theme() {
									return $.get($0);
								},
								[$.attachment()]: ($$node) => (navigation.itemReference || $.noop)($$node),
								[$.attachment()]: attachPrevious,
								[$.attachment()]: (node) => on(node, 'pointerenter', (e) => closeSubmenus(undefined, pointerFrom(e)))
							})),
							'component',
							MenuFloating,
							144,
							3,
							{ componentTag: 'Button' }
						);
					}

					$.append($$anchor, fragment_3);
				};

				var consequent_2 = ($$anchor) => {
					var fragment_4 = $.comment();
					var node_8 = $.first_child(fragment_4);

					{
						let $0 = $.derived(() => $$props.theme?.option);

						$.add_svelte_meta(
							() => MenuOption(node_8, $.spread_props({ role: 'menuitem' }, () => $.get(item), {
								get theme() {
									return $.get($0);
								},

								onEnter: (event) => {
									$.get(item).onEnter?.(event);
									closeSubmenus(undefined, pointerFrom(event));
								},
								[$.attachment()]: ($$node) => (navigation.itemReference || $.noop)($$node),
								[$.attachment()]: attachPrevious
							})),
							'component',
							MenuFloating,
							154,
							3,
							{ componentTag: 'MenuOption' }
						);
					}

					$.append($$anchor, fragment_4);
				};

				var consequent_3 = ($$anchor) => {
					var fragment_5 = $.comment();
					var node_9 = $.first_child(fragment_5);

					{
						let $0 = $.derived(() => $$props.theme?.separator);

						$.add_svelte_meta(
							() => Separator(node_9, $.spread_props(() => $.get(item), {
								get theme() {
									return $.get($0);
								}
							})),
							'component',
							MenuFloating,
							166,
							3,
							{ componentTag: 'Separator' }
						);
					}

					$.append($$anchor, fragment_5);
				};

				var consequent_4 = ($$anchor) => {
					const submenuItem = $.tag($.derived(() => $.get(item)), 'submenuItem');

					$.get(submenuItem);

					const computed_const = $.tag(
						$.derived(() => {
							const {
								type: _type,
								menu,
								openOnHover = true,
								openOnClick = true,
								hoverDelay = 100,
								closeOnMouseLeave = true,
								debugSafeArea = false,
								popoverClass,
								onClick: itemOnClick,
								onEnter: itemOnEnter,
								suffix,
								attrs,
								...itemProps
							} = $.get(submenuItem);

							return {
								_type,
								menu,
								openOnHover,
								openOnClick,
								hoverDelay,
								closeOnMouseLeave,
								debugSafeArea,
								popoverClass,
								itemOnClick,
								itemOnEnter,
								suffix,
								attrs,
								itemProps
							};
						}),
						'[@const]'
					);

					$.get(computed_const);

					var fragment_6 = $.comment();
					var node_10 = $.first_child(fragment_6);

					{
						const trigger = $.wrap_snippet(MenuFloating, function ($$anchor, popover = $.noop) {
							$.validate_snippet_args(...arguments);

							var fragment_7 = $.comment();
							var node_11 = $.first_child(fragment_7);

							{
								let $0 = $.derived(() => $.get(computed_const).suffix ?? caretRightIcon);
								let $1 = $.derived(() => $$props.theme?.submenu);

								let $2 = $.derived(() => ({
									...$.get(computed_const).attrs,
									'aria-haspopup': 'menu',
									'aria-expanded': popover().isOpen ? 'true' : 'false',
									'data-menu-keep-open': 'true'
								}));

								$.add_svelte_meta(
									() => MenuOption(node_11, $.spread_props({ role: 'menuitem' }, () => $.get(computed_const).itemProps, {
										get suffix() {
											return $.get($0);
										},

										get theme() {
											return $.get($1);
										},

										get active() {
											return popover().isOpen;
										},

										get attrs() {
											return $.get($2);
										},

										onClick: (payload) => {
											$.get(computed_const).itemOnClick?.(payload);
											closeSubmenus(index);
											popover()?.toggle();
										},

										onEnter: (event) => {
											$.get(computed_const).itemOnEnter?.(event);
											closeSubmenus(index, pointerFrom(event));
										},
										[$.attachment()]: ($$node) => (popover().reference || $.noop)($$node),
										[$.attachment()]: ($$node) => (navigation.itemReference || $.noop)($$node),
										[$.attachment()]: (node) => {
											submenuPopovers[index] = popover();

											Object.assign(node, {
												onNext: () => {
													closeSubmenus(index);
													popover().open();
												},
												onPrevious: goUp
											});

											return () => {
												delete submenuPopovers[index];
											};
										}
									})),
									'component',
									MenuFloating,
									203,
									5,
									{ componentTag: 'MenuOption' }
								);
							}

							$.append($$anchor, fragment_7);
						});

						let $0 = $.derived(() => $.get(computed_const).openOnHover && !$.get(isInMobileSheet));

						let $1 = $.derived(() => ({
							items: $.get(computed_const).menu,
							focusOnMount: true,
							submenuMode: 'popover',
							theme: $$props.theme
						}));

						$.add_svelte_meta(
							() => PopupMenu(node_10, {
								position: submenuPosition,
								get openOnHover() {
									return $.get($0);
								},

								get openOnClick() {
									return $.get(computed_const).openOnClick;
								},

								get hoverDelay() {
									return $.get(computed_const).hoverDelay;
								},

								get closeOnMouseLeave() {
									return $.get(computed_const).closeOnMouseLeave;
								},

								get debugSafeArea() {
									return $.get(computed_const).debugSafeArea;
								},
								closeOnEscape: true,
								closeOnItemClick: false,
								mobileSheet: false,
								get class() {
									return $.get(computed_const).popoverClass;
								},

								get menu() {
									return $.get($1);
								},
								trigger,
								$$slots: { trigger: true }
							}),
							'component',
							MenuFloating,
							184,
							3,
							{ componentTag: 'PopupMenu' }
						);
					}

					$.append($$anchor, fragment_6);
				};

				$.add_svelte_meta(
					() => $.if(node_6, ($$render) => {
						if ($.strict_equals($.get(item).type, 'button')) $$render(consequent_1); else if ($.strict_equals($.get(item).type, 'option')) $$render(consequent_2, 1); else if ($.strict_equals($.get(item).type, 'separator')) $$render(consequent_3, 2); else if ($.strict_equals($.get(item).type, 'submenu')) $$render(consequent_4, 3);
					}),
					'if',
					MenuFloating,
					143,
					2
				);
			}

			$.append($$anchor, fragment_2);
		}),
		'each',
		MenuFloating,
		142,
		1
	);

	var node_12 = $.sibling(node_5, 2);

	{
		var consequent_5 = ($$anchor) => {
			var fragment_8 = $.comment();
			var node_13 = $.first_child(fragment_8);

			{
				let $0 = $.derived(() => !!$$props.footer);
				let $1 = $.derived(() => $.get(classes).footer());

				$.add_svelte_meta(
					() => Slot(node_13, {
						get render() {
							return $$props.footer;
						},

						get renderIf() {
							return $.get($0);
						},

						get class() {
							return $.get($1);
						}
					}),
					'component',
					MenuFloating,
					246,
					2,
					{ componentTag: 'Slot' }
				);
			}

			$.append($$anchor, fragment_8);
		};

		$.add_svelte_meta(
			() => $.if(node_12, ($$render) => {
				if (!$.get(showBackControl)) $$render(consequent_5);
			}),
			'if',
			MenuFloating,
			245,
			1
		);
	}

	$.reset(div);
	$.attach(div, () => navigation.containerReference);
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	MenuFloating = $.hmr(MenuFloating);

	import.meta.hot.acceptExports(["default"],(module) => {
		MenuFloating[$.HMR].update(module.default);
	});
}

export default MenuFloating;
//# sourceMappingURL=data:application/json;base64,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QUFLOztzQ0FDWCxZQUFZOzs7Ozs7UUFRVCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O2dDQTNEZCxJQUFJLEVBQUMsSUFBSSxFQUFLLFFBQVEsMERBVWpCLElBQUksRUFBQyxJQUFJLEVBQUssUUFBUSw2REFZdEIsSUFBSSxFQUFDLElBQUksRUFBSyxXQUFXLDZEQUV6QixJQUFJLEVBQUMsSUFBSSxFQUFLLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQStFZ0IsT0FBTyxFQUFDLE1BQU07OztXQUE5RCxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQURBLGVBQWU7Ozs7Ozs7OztTQS9IckI7VUFBQSxXQUlTLFVBQVUsQ0FBQyxrQkFBa0I7b0JBSnRDOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTWVudUZsb2F0aW5nLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IFBsYWNlbWVudCB9IGZyb20gJ0BmbG9hdGluZy11aS9kb20nO1xuXHRpbXBvcnQgeyBvbk1vdW50LCB1bnRyYWNrIH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgb24gfSBmcm9tICdzdmVsdGUvZXZlbnRzJztcblx0aW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJyRsaWIvaTE4bi9jb250ZXh0LnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IHVzZU5hdmlnYXRpb24gfSBmcm9tICckbGliL3V0aWxzL3VzZU5hdmlnYXRpb24uc3ZlbHRlLmpzJztcblx0aW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24vQnV0dG9uLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IGFycm93TGVmdEljb24gfSBmcm9tICcuLi9JY29ucy9hcnJvd0xlZnQuanMnO1xuXHRpbXBvcnQgeyBjYXJldFJpZ2h0SWNvbiB9IGZyb20gJy4uL0ljb25zL2NhcmV0UmlnaHQuanMnO1xuXHRpbXBvcnQgTWVudU9wdGlvbiBmcm9tICcuLi9NZW51T3B0aW9uL01lbnVPcHRpb24uc3ZlbHRlJztcblx0aW1wb3J0IFBvcHVwTWVudSBmcm9tICcuLi9Qb3B1cE1lbnUvUG9wdXBNZW51LnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHVzZVBvcG92ZXJDb250ZXh0IH0gZnJvbSAnLi4vUG9wb3Zlci9wb3BvdmVyLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB0eXBlIHsgUG9wb3ZlclN0YXRlIH0gZnJvbSAnLi4vUG9wb3Zlci9wb3BvdmVyLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCBTZXBhcmF0b3IgZnJvbSAnLi4vU2VwYXJhdG9yL1NlcGFyYXRvci5zdmVsdGUnO1xuXHRpbXBvcnQgU2xvdCBmcm9tICcuLi9TbG90L1Nsb3Quc3ZlbHRlJztcblx0aW1wb3J0IHR5cGUgeyBCcmVha3BvaW50IH0gZnJvbSAnLi4vVGhlbWUvdGhlbWUuanMnO1xuXHRpbXBvcnQgdHlwZSB7IE1lbnVQcm9wcyB9IGZyb20gJy4vbWVudS5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZU1lbnVUaGVtZSB9IGZyb20gJy4vbWVudS50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRpdGVtcyxcblx0XHRjbGFzczogY2xhc3NOYW1lID0gJycsXG5cdFx0dGhlbWUsXG5cdFx0aGVhZGVyLFxuXHRcdGZvb3Rlcixcblx0XHRmb2N1c09uTW91bnQsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogTWVudVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgaWQgPSAkcHJvcHMuaWQoKTtcblx0Y29uc3QgcGFyZW50UG9wb3ZlciA9IHVzZVBvcG92ZXJDb250ZXh0KCk7XG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VNZW51VGhlbWUodGhlbWUpKTtcblx0Y29uc3QgdCA9ICRkZXJpdmVkKHVzZUkxOG4oKSk7XG5cdGNvbnN0IGlzSW5Nb2JpbGVTaGVldCA9ICRkZXJpdmVkKHBhcmVudFBvcG92ZXI/LmlzTW9iaWxlU2hlZXQgPz8gZmFsc2UpO1xuXHRjb25zdCBoYXNQYXJlbnRNZW51ID0gJGRlcml2ZWQoISFwYXJlbnRQb3BvdmVyPy5wYXJlbnQpO1xuXHRjb25zdCBzaG93QmFja0NvbnRyb2wgPSAkZGVyaXZlZChpc0luTW9iaWxlU2hlZXQgJiYgaGFzUGFyZW50TWVudSk7XG5cdGNvbnN0IHN1Ym1lbnVQb3NpdGlvbiA9IChicmVha3BvaW50OiBCcmVha3BvaW50KTogUGxhY2VtZW50ID0+XG5cdFx0YnJlYWtwb2ludCA9PT0gJ3hzJyB8fCBicmVha3BvaW50ID09PSAnc20nID8gJ2JvdHRvbS1zdGFydCcgOiAncmlnaHQtc3RhcnQnO1xuXG5cdGxldCBzdWJtZW51UG9wb3ZlcnMgPSAkc3RhdGU8UmVjb3JkPG51bWJlciwgUG9wb3ZlclN0YXRlPj4oe30pO1xuXHQvLyBEZXJpdmVkIGZyb20gdGhlIHBvcG92ZXJzJyBvd24gaXNPcGVuICh3aGljaCBmbGlwcyB0aGUgaW5zdGFudCBvcGVuKCkvY2xvc2UoKVxuXHQvLyBpcyBjYWxsZWQpIOKAlCBOT1QgZnJvbSBvbk9wZW4vb25DbG9zZSBjYWxsYmFja3MsIHdoaWNoIG9ubHkgZmlyZSBhZnRlciB0aGVcblx0Ly8gaW50cm8vb3V0cm8gdHJhbnNpdGlvbnMgYW5kIHdvdWxkIGtlZXAgdGhlIHBhcmVudCBuYXYgZnJvemVuIGR1cmluZyB0aGUgZmFkZS5cblx0Y29uc3QgYW55U3VibWVudU9wZW4gPSAkZGVyaXZlZChPYmplY3QudmFsdWVzKHN1Ym1lbnVQb3BvdmVycykuc29tZSgocCkgPT4gcC5pc09wZW4pKTtcblxuXHRjb25zdCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbih7XG5cdFx0ZW5hYmxlZDogKCkgPT4ge1xuXHRcdFx0aWYgKHBhcmVudFBvcG92ZXI/Lmhhc0NoaWxkT3BlbiB8fCBhbnlTdWJtZW51T3BlbikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHRvcmllbnRhdGlvbjogKCkgPT4gJ3ZlcnRpY2FsJyxcblx0XHRsb29wOiB0cnVlLFxuXHRcdGlkLFxuXHRcdGVuYWJsZUhvdmVyRm9jdXM6IHRydWUsXG5cdFx0ZGVmYXVsdEZvY3VzZWRJbmRleDogKCkgPT4gbmF2aWdhdGlvbi5sYXN0Rm9jdXNlZEluZGV4ID8/IDAsXG5cdFx0cHJldmVudEtleWJvYXJkRGVmYXVsdDogZmFsc2Vcblx0fSk7XG5cblx0b25Nb3VudCgoKSA9PiB7XG5cdFx0aWYgKGZvY3VzT25Nb3VudCA9PT0gJ2NvbnRhaW5lcicpIHtcblx0XHRcdG5hdmlnYXRpb24uZm9jdXNDb250YWluZXIoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGZvY3VzT25Nb3VudCkgbmF2aWdhdGlvbi5mb2N1c0ZpcnN0KCk7XG5cdH0pO1xuXG5cdGNvbnN0IGNsb3NlUGFyZW50TWVudSA9ICgpID0+IHtcblx0XHRpZiAoIXBhcmVudFBvcG92ZXIpIHJldHVybjtcblx0XHRjb25zdCB0cmlnZ2VyID0gcGFyZW50UG9wb3Zlci5yZWZlcmVuY2VFbGVtZW50O1xuXHRcdHBhcmVudFBvcG92ZXIuY2xvc2UoKTtcblx0XHRpZiAodHJpZ2dlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB0cmlnZ2VyLmZvY3VzKCk7XG5cdH07XG5cblx0Y29uc3QgZ29CYWNrID0gKCkgPT4ge1xuXHRcdGNsb3NlUGFyZW50TWVudSgpO1xuXHR9O1xuXG5cdGNvbnN0IGdvVXAgPSAoKSA9PiB7XG5cdFx0aWYgKCFoYXNQYXJlbnRNZW51KSByZXR1cm47XG5cdFx0Z29CYWNrKCk7XG5cdH07XG5cblx0Y29uc3QgYXR0YWNoUHJldmlvdXMgPSAobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcblx0XHRPYmplY3QuYXNzaWduKG5vZGUsIHsgb25QcmV2aW91czogZ29VcCB9KTtcblx0fTtcblxuXHRjb25zdCBhdHRhY2hCYWNrQ29udHJvbCA9IChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuXHRcdE9iamVjdC5hc3NpZ24obm9kZSwgeyBvblByZXZpb3VzOiBnb0JhY2sgfSk7XG5cdH07XG5cblx0Y29uc3QgcG9pbnRlckZyb20gPSAoZTogTW91c2VFdmVudCkgPT4gKHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfSk7XG5cblx0Y29uc3QgY2xvc2VTdWJtZW51cyA9IChleGNlcHRJbmRleD86IG51bWJlciwgcG9pbnRlcj86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xuXHRcdGZvciAoY29uc3QgW2tleSwgcG9wb3Zlcl0gb2YgT2JqZWN0LmVudHJpZXMoc3VibWVudVBvcG92ZXJzKSkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBOdW1iZXIoa2V5KTtcblx0XHRcdGlmIChpbmRleCA9PT0gZXhjZXB0SW5kZXgpIGNvbnRpbnVlO1xuXHRcdFx0Ly8gRG9uJ3QgY2xvc2UgYSBzdWJtZW51IHRoZSBwb2ludGVyIGlzIHN0aWxsIHRyYXZlbGxpbmcgdG93YXJkOiBpdHMgc2FmZVxuXHRcdFx0Ly8gYXJlYSAodGhlIHRyaWdnZXLihpJwYW5lbCBjb3JyaWRvcikgaGFzIGF1dGhvcml0eSBkdXJpbmcgdGhlIGRpYWdvbmFsXG5cdFx0XHQvLyB0cmFuc2l0LCBzbyBhIHNpYmxpbmcgcm93IHlvdSBtZXJlbHkgY3Jvc3MgZG9lc24ndCBzbGFtIGl0IHNodXQuXG5cdFx0XHRpZiAocG9pbnRlciAmJiBwb3BvdmVyLnNhZmVBcmVhLmNvbnRhaW5zUG9pbnQocG9pbnRlci54LCBwb2ludGVyLnkpKSBjb250aW51ZTtcblx0XHRcdHBvcG92ZXIuY2xvc2UoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gVGhlIG1vbWVudCBldmVyeSBzdWJtZW51IGlzIGNsb3NlZCAoaXNPcGVuLCBub3QgdHJhbnNpdGlvbiBlbmQpLCBoYW5kIHRoZVxuXHQvLyBob3ZlciBoaWdobGlnaHQgdG8gdGhlIHJvdyBhY3R1YWxseSB1bmRlciB0aGUgbW91c2Ug4oCUIHRoZSBwYXJlbnQgbmF2IHdhc1xuXHQvLyBkaXNhYmxlZCB3aGlsZSBhIHN1Ym1lbnUgd2FzIG9wZW4sIHNvIHRoZSBoaWdobGlnaHQgZnJvemUgb24gdGhlIHRyaWdnZXIuXG5cdGxldCBoYWRTdWJtZW51T3BlbiA9IGZhbHNlO1xuXHQkZWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCBvcGVuID0gYW55U3VibWVudU9wZW47XG5cdFx0dW50cmFjaygoKSA9PiB7XG5cdFx0XHRpZiAoaGFkU3VibWVudU9wZW4gJiYgIW9wZW4pIG5hdmlnYXRpb24uc3luY1BvaW50ZXJGb2N1cygpO1xuXHRcdFx0aGFkU3VibWVudU9wZW4gPSBvcGVuO1xuXHRcdH0pO1xuXHR9KTtcbjwvc2NyaXB0PlxuXG48ZGl2XG5cdGNsYXNzPXtjbGFzc2VzLnJvb3QoeyBjbGFzc05hbWUgfSl9XG5cdHJvbGU9XCJtZW51XCJcblx0ey4uLmF0dGFjaG1lbnRzfVxuXHR7QGF0dGFjaCBuYXZpZ2F0aW9uLmNvbnRhaW5lclJlZmVyZW5jZX1cbj5cblx0eyNpZiBzaG93QmFja0NvbnRyb2x9XG5cdFx0PE1lbnVPcHRpb25cblx0XHRcdHJvbGU9XCJtZW51aXRlbVwiXG5cdFx0XHR0aXRsZT17dC5iYWNrfVxuXHRcdFx0cHJlZml4PXthcnJvd0xlZnRJY29ufVxuXHRcdFx0dGhlbWU9e3RoZW1lPy5vcHRpb259XG5cdFx0XHRhdHRycz17eyAnZGF0YS1tZW51LWtlZXAtb3Blbic6ICd0cnVlJyB9fVxuXHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRnb0JhY2soKTtcblx0XHRcdH19XG5cdFx0XHR7QGF0dGFjaCBuYXZpZ2F0aW9uLml0ZW1SZWZlcmVuY2V9XG5cdFx0XHR7QGF0dGFjaCBhdHRhY2hCYWNrQ29udHJvbH1cblx0XHQvPlxuXHRcdDxTZXBhcmF0b3IgdGhlbWU9e3RoZW1lPy5zZXBhcmF0b3J9IC8+XG5cdHs6ZWxzZX1cblx0XHQ8U2xvdCByZW5kZXI9e2hlYWRlcn0gcmVuZGVySWY9eyEhaGVhZGVyfSBjbGFzcz17Y2xhc3Nlcy5oZWFkZXIoKX0gLz5cblx0ey9pZn1cblxuXHR7I2VhY2ggaXRlbXMgYXMgaXRlbSwgaW5kZXh9XG5cdFx0eyNpZiBpdGVtLnR5cGUgPT09ICdidXR0b24nfVxuXHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRyb2xlPVwibWVudWl0ZW1cIlxuXHRcdFx0XHR7Li4uaXRlbX1cblx0XHRcdFx0dGhlbWU9e3RoZW1lPy5idXR0b259XG5cdFx0XHRcdHtAYXR0YWNoIG5hdmlnYXRpb24uaXRlbVJlZmVyZW5jZX1cblx0XHRcdFx0e0BhdHRhY2ggYXR0YWNoUHJldmlvdXN9XG5cdFx0XHRcdHtAYXR0YWNoIChub2RlKSA9PlxuXHRcdFx0XHRcdG9uKG5vZGUsICdwb2ludGVyZW50ZXInLCAoZSkgPT4gY2xvc2VTdWJtZW51cyh1bmRlZmluZWQsIHBvaW50ZXJGcm9tKGUpKSl9XG5cdFx0XHQvPlxuXHRcdHs6ZWxzZSBpZiBpdGVtLnR5cGUgPT09ICdvcHRpb24nfVxuXHRcdFx0PE1lbnVPcHRpb25cblx0XHRcdFx0cm9sZT1cIm1lbnVpdGVtXCJcblx0XHRcdFx0ey4uLml0ZW19XG5cdFx0XHRcdHRoZW1lPXt0aGVtZT8ub3B0aW9ufVxuXHRcdFx0XHRvbkVudGVyPXsoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRpdGVtLm9uRW50ZXI/LihldmVudCk7XG5cdFx0XHRcdFx0Y2xvc2VTdWJtZW51cyh1bmRlZmluZWQsIHBvaW50ZXJGcm9tKGV2ZW50KSk7XG5cdFx0XHRcdH19XG5cdFx0XHRcdHtAYXR0YWNoIG5hdmlnYXRpb24uaXRlbVJlZmVyZW5jZX1cblx0XHRcdFx0e0BhdHRhY2ggYXR0YWNoUHJldmlvdXN9XG5cdFx0XHQvPlxuXHRcdHs6ZWxzZSBpZiBpdGVtLnR5cGUgPT09ICdzZXBhcmF0b3InfVxuXHRcdFx0PFNlcGFyYXRvciB7Li4uaXRlbX0gdGhlbWU9e3RoZW1lPy5zZXBhcmF0b3J9IC8+XG5cdFx0ezplbHNlIGlmIGl0ZW0udHlwZSA9PT0gJ3N1Ym1lbnUnfVxuXHRcdFx0e0Bjb25zdCBzdWJtZW51SXRlbSA9IGl0ZW0gYXMgdHlwZW9mIGl0ZW0gJiB7IHBvcG92ZXJDbGFzcz86IHN0cmluZyB9fVxuXHRcdFx0e0Bjb25zdCB7XG5cdFx0XHRcdHR5cGU6IF90eXBlLFxuXHRcdFx0XHRtZW51LFxuXHRcdFx0XHRvcGVuT25Ib3ZlciA9IHRydWUsXG5cdFx0XHRcdG9wZW5PbkNsaWNrID0gdHJ1ZSxcblx0XHRcdFx0aG92ZXJEZWxheSA9IDEwMCxcblx0XHRcdFx0Y2xvc2VPbk1vdXNlTGVhdmUgPSB0cnVlLFxuXHRcdFx0XHRkZWJ1Z1NhZmVBcmVhID0gZmFsc2UsXG5cdFx0XHRcdHBvcG92ZXJDbGFzcyxcblx0XHRcdFx0b25DbGljazogaXRlbU9uQ2xpY2ssXG5cdFx0XHRcdG9uRW50ZXI6IGl0ZW1PbkVudGVyLFxuXHRcdFx0XHRzdWZmaXgsXG5cdFx0XHRcdGF0dHJzLFxuXHRcdFx0XHQuLi5pdGVtUHJvcHNcblx0XHRcdH0gPSBzdWJtZW51SXRlbX1cblx0XHRcdDxQb3B1cE1lbnVcblx0XHRcdFx0cG9zaXRpb249e3N1Ym1lbnVQb3NpdGlvbn1cblx0XHRcdFx0b3Blbk9uSG92ZXI9e29wZW5PbkhvdmVyICYmICFpc0luTW9iaWxlU2hlZXR9XG5cdFx0XHRcdHtvcGVuT25DbGlja31cblx0XHRcdFx0e2hvdmVyRGVsYXl9XG5cdFx0XHRcdHtjbG9zZU9uTW91c2VMZWF2ZX1cblx0XHRcdFx0e2RlYnVnU2FmZUFyZWF9XG5cdFx0XHRcdGNsb3NlT25Fc2NhcGU9e3RydWV9XG5cdFx0XHRcdGNsb3NlT25JdGVtQ2xpY2s9e2ZhbHNlfVxuXHRcdFx0XHRtb2JpbGVTaGVldD17ZmFsc2V9XG5cdFx0XHRcdGNsYXNzPXtwb3BvdmVyQ2xhc3N9XG5cdFx0XHRcdG1lbnU9e3tcblx0XHRcdFx0XHRpdGVtczogbWVudSxcblx0XHRcdFx0XHRmb2N1c09uTW91bnQ6IHRydWUsXG5cdFx0XHRcdFx0c3VibWVudU1vZGU6ICdwb3BvdmVyJyxcblx0XHRcdFx0XHR0aGVtZVxuXHRcdFx0XHR9fVxuXHRcdFx0PlxuXHRcdFx0XHR7I3NuaXBwZXQgdHJpZ2dlcihwb3BvdmVyKX1cblx0XHRcdFx0XHQ8TWVudU9wdGlvblxuXHRcdFx0XHRcdFx0cm9sZT1cIm1lbnVpdGVtXCJcblx0XHRcdFx0XHRcdHsuLi5pdGVtUHJvcHN9XG5cdFx0XHRcdFx0XHRzdWZmaXg9e3N1ZmZpeCA/PyBjYXJldFJpZ2h0SWNvbn1cblx0XHRcdFx0XHRcdHRoZW1lPXt0aGVtZT8uc3VibWVudX1cblx0XHRcdFx0XHRcdGFjdGl2ZT17cG9wb3Zlci5pc09wZW59XG5cdFx0XHRcdFx0XHRhdHRycz17e1xuXHRcdFx0XHRcdFx0XHQuLi5hdHRycyxcblx0XHRcdFx0XHRcdFx0J2FyaWEtaGFzcG9wdXAnOiAnbWVudScsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogcG9wb3Zlci5pc09wZW4gPyAndHJ1ZScgOiAnZmFsc2UnLFxuXHRcdFx0XHRcdFx0XHQnZGF0YS1tZW51LWtlZXAtb3Blbic6ICd0cnVlJ1xuXHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9eyhwYXlsb2FkKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGl0ZW1PbkNsaWNrPy4ocGF5bG9hZCk7XG5cdFx0XHRcdFx0XHRcdGNsb3NlU3VibWVudXMoaW5kZXgpO1xuXHRcdFx0XHRcdFx0XHRwb3BvdmVyPy50b2dnbGUoKTtcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRvbkVudGVyPXsoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdFx0aXRlbU9uRW50ZXI/LihldmVudCk7XG5cdFx0XHRcdFx0XHRcdGNsb3NlU3VibWVudXMoaW5kZXgsIHBvaW50ZXJGcm9tKGV2ZW50KSk7XG5cdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0e0BhdHRhY2ggcG9wb3Zlci5yZWZlcmVuY2V9XG5cdFx0XHRcdFx0XHR7QGF0dGFjaCBuYXZpZ2F0aW9uLml0ZW1SZWZlcmVuY2V9XG5cdFx0XHRcdFx0XHR7QGF0dGFjaCAobm9kZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRzdWJtZW51UG9wb3ZlcnNbaW5kZXhdID0gcG9wb3Zlcjtcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihub2RlLCB7XG5cdFx0XHRcdFx0XHRcdFx0b25OZXh0OiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbG9zZVN1Ym1lbnVzKGluZGV4KTtcblx0XHRcdFx0XHRcdFx0XHRcdHBvcG92ZXIub3BlbigpO1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0b25QcmV2aW91czogZ29VcFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgc3VibWVudVBvcG92ZXJzW2luZGV4XTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0ey9zbmlwcGV0fVxuXHRcdFx0PC9Qb3B1cE1lbnU+XG5cdFx0ey9pZn1cblx0ey9lYWNofVxuXG5cdHsjaWYgIXNob3dCYWNrQ29udHJvbH1cblx0XHQ8U2xvdCByZW5kZXI9e2Zvb3Rlcn0gcmVuZGVySWY9eyEhZm9vdGVyfSBjbGFzcz17Y2xhc3Nlcy5mb290ZXIoKX0gLz5cblx0ey9pZn1cbjwvZGl2PlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9NZW51L01lbnVGbG9hdGluZy5zdmVsdGUifQ==