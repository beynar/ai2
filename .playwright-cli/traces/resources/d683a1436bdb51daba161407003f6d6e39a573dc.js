import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Menu/MenuStacked.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

MenuStacked[$.FILENAME] = 'src/lib/components/Menu/MenuStacked.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { onMount, tick } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { useI18n } from "/src/lib/i18n/context.svelte.ts?t=1783864665558";
import { useNavigation } from "/src/lib/utils/useNavigation.svelte.ts";
import Button from "/src/lib/components/Button/Button.svelte";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import MenuOption from "/src/lib/components/MenuOption/MenuOption.svelte";
import Separator from "/src/lib/components/Separator/Separator.svelte";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import Stepper from "/src/lib/components/Stepper/Stepper.svelte";
import MenuStackedBackHeader from "/src/lib/components/Menu/MenuStackedBackHeader.svelte";
import { useMenuTheme } from "/src/lib/components/Menu/menu.theme.ts";
import { getMenuMaxDepth } from "/src/lib/components/Menu/menuTree.ts";

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

var root = $.add_locations($.from_html(`<!> <!>`, 1), MenuStacked[$.FILENAME], []);
var root_1 = $.add_locations($.from_html(`<div><!> <!> <!></div>`), MenuStacked[$.FILENAME], [[160, 4]]);
var root_2 = $.add_locations($.from_html(`<div><!></div>`), MenuStacked[$.FILENAME], [[136, 0]]);

function MenuStacked($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, MenuStacked);

	let className = $.prop($$props, 'class', 3, ''),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useMenuTheme($$props.theme)), 'classes');
	const t = $.tag($.derived(useI18n), 't');
	const maxDepth = $.tag($.derived(() => getMenuMaxDepth($$props.items)), 'maxDepth');
	const panels = $.tag($.derived(() => Array.from({ length: $.get(maxDepth) + 1 }, (_, depth) => depth)), 'panels');
	let path = $.tag($.state($.proxy([])), 'path');
	const activeStep = $.tag($.derived(() => $.get(path).length), 'activeStep');

	const navigation = useNavigation({
		orientation: () => 'vertical',
		loop: true,
		id,
		enableHoverFocus: true,
		defaultFocusedIndex: () => navigation.lastFocusedIndex ?? 0,
		preventKeyboardDefault: false
	});

	$.user_effect(() => {
		if ($.get(path).length <= $.get(maxDepth)) return;

		$.set(path, $.get(path).slice(0, $.get(maxDepth)), true);
	});

	onMount(() => {
		if ($.strict_equals($$props.focusOnMount, 'container')) {
			navigation.focusContainer();

			return;
		}

		if ($$props.focusOnMount) navigation.focusFirst();
	});

	const getPanelItems = (depth) => {
		if ($.strict_equals(depth, 0)) return $$props.items;

		return $.get(path)[depth - 1]?.item.menu ?? [];
	};

	const getPanelEntry = (depth) => $.get(path)[depth - 1] ?? null;
	const isDisabledMenuItem = (menuItem) => $.strict_equals(menuItem.type, 'separator', false) && $.strict_equals(menuItem.disabled, true);

	const getNavigationIndex = (panelItems, itemIndex, hasBackControl) => {
		let navigationIndex = hasBackControl ? 1 : 0;

		for (let index = 0; index < itemIndex; index += 1) {
			if ($.strict_equals(panelItems[index]?.type, 'separator', false)) navigationIndex += 1;
		}

		return navigationIndex;
	};

	const getFirstEnabledChildNavigationIndex = (panelItems) => {
		let navigationIndex = 1;

		for (const menuItem of panelItems) {
			if ($.strict_equals(menuItem.type, 'separator')) continue;
			if (!isDisabledMenuItem(menuItem)) return navigationIndex;

			navigationIndex += 1;
		}

		return 0;
	};

	const openSubmenu = async (depth, itemIndex, item) => {
		const panelItems = getPanelItems(depth);
		const parentNavigationIndex = getNavigationIndex(panelItems, itemIndex, depth > 0);

		$.set(
			path,
			[
				...$.get(path).slice(0, depth),
				{ item, parentNavigationIndex }
			],
			true
		);

		(await $.track_reactivity_loss(tick()))();
		navigation.focusItem(getFirstEnabledChildNavigationIndex(item.menu));
	};

	const closeSubmenu = async () => {
		const currentEntry = $.get(path).at(-1);

		if (!currentEntry) return;

		$.set(path, $.get(path).slice(0, -1), true);
		(await $.track_reactivity_loss(tick()))();
		navigation.focusItem(currentEntry.parentNavigationIndex);
	};

	const getBackControlLabel = (entry) => {
		const title = entry?.item.title;

		return $.strict_equals(typeof title, 'string') ? `${$.get(t).back}: ${title}` : $.get(t).back;
	};

	const attachItemReference = (isActivePanel) => (node) => {
		if (!isActivePanel) return;

		return navigation.itemReference(node);
	};

	const attachPrevious = (node) => {
		Object.assign(node, {
			onPrevious: () => {
				void closeSubmenu();
			}
		});
	};

	var $$exports = { ...$.legacy_api() };
	var div = root_2();

	$.attribute_effect(div, ($0) => ({ class: $0, role: 'menu', ...attachments }), [() => $.get(classes).root({ className: className() })]);

	var node_1 = $.child(div);

	{
		const children = $.wrap_snippet(MenuStacked, function ($$anchor, $$arg0) {
			$.validate_snippet_args(...arguments);

			let depth = () => ($$arg0?.()).item;

			depth();

			const isActivePanel = $.tag($.derived(() => $.strict_equals(depth(), $.get(activeStep))), 'isActivePanel');

			$.get(isActivePanel);

			const panelItems = $.tag($.derived(() => getPanelItems(depth())), 'panelItems');

			$.get(panelItems);

			const panelEntry = $.tag($.derived(() => getPanelEntry(depth())), 'panelEntry');

			$.get(panelEntry);

			const hasBackControl = $.tag($.derived(() => depth() > 0), 'hasBackControl');

			$.get(hasBackControl);

			var fragment = $.comment();
			var node_2 = $.first_child(fragment);

			{
				var consequent_6 = ($$anchor) => {
					var div_1 = root_1();
					var node_3 = $.child(div_1);

					{
						var consequent = ($$anchor) => {
							var fragment_1 = root();
							var node_4 = $.first_child(fragment_1);

							{
								let $0 = $.derived(() => $.get(panelEntry)?.item ?? null);
								let $1 = $.derived(() => getBackControlLabel($.get(panelEntry)));
								let $2 = $.derived(() => attachItemReference($.get(isActivePanel)));

								$.add_svelte_meta(
									() => MenuStackedBackHeader(node_4, {
										get opener() {
											return $.get($0);
										},

										get label() {
											return $.get($1);
										},

										get theme() {
											return $$props.theme;
										},

										onBack: () => {
											void closeSubmenu();
										},

										get itemReference() {
											return $.get($2);
										},
										backReference: attachPrevious
									}),
									'component',
									MenuStacked,
									162,
									6,
									{ componentTag: 'MenuStackedBackHeader' }
								);
							}

							var node_5 = $.sibling(node_4, 2);

							{
								let $0 = $.derived(() => $$props.theme?.separator);

								$.add_svelte_meta(
									() => Separator(node_5, {
										get theme() {
											return $.get($0);
										}
									}),
									'component',
									MenuStacked,
									172,
									6,
									{ componentTag: 'Separator' }
								);
							}

							$.append($$anchor, fragment_1);
						};

						var alternate = ($$anchor) => {
							var fragment_2 = $.comment();
							var node_6 = $.first_child(fragment_2);

							{
								let $0 = $.derived(() => !!$$props.header);
								let $1 = $.derived(() => $.get(classes).header());

								$.add_svelte_meta(
									() => Slot(node_6, {
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
									MenuStacked,
									174,
									6,
									{ componentTag: 'Slot' }
								);
							}

							$.append($$anchor, fragment_2);
						};

						$.add_svelte_meta(
							() => $.if(node_3, ($$render) => {
								if ($.get(hasBackControl)) $$render(consequent); else $$render(alternate, -1);
							}),
							'if',
							MenuStacked,
							161,
							5
						);
					}

					var node_7 = $.sibling(node_3, 2);

					$.add_svelte_meta(
						() => $.each(node_7, 17, () => $.get(panelItems), $.index, ($$anchor, item, index) => {
							var fragment_3 = $.comment();
							var node_8 = $.first_child(fragment_3);

							{
								var consequent_1 = ($$anchor) => {
									var fragment_4 = $.comment();
									var node_9 = $.first_child(fragment_4);

									{
										let $0 = $.derived(() => $$props.theme?.button);

										$.add_svelte_meta(
											() => Button(node_9, $.spread_props({ role: 'menuitem' }, () => $.get(item), {
												get theme() {
													return $.get($0);
												},
												[$.attachment()]: ($$node) => (attachItemReference($.get(isActivePanel)) || $.noop)($$node),
												[$.attachment()]: attachPrevious
											})),
											'component',
											MenuStacked,
											179,
											7,
											{ componentTag: 'Button' }
										);
									}

									$.append($$anchor, fragment_4);
								};

								var consequent_2 = ($$anchor) => {
									var fragment_5 = $.comment();
									var node_10 = $.first_child(fragment_5);

									{
										let $0 = $.derived(() => $$props.theme?.option);

										$.add_svelte_meta(
											() => MenuOption(node_10, $.spread_props({ role: 'menuitem' }, () => $.get(item), {
												get theme() {
													return $.get($0);
												},
												[$.attachment()]: ($$node) => (attachItemReference($.get(isActivePanel)) || $.noop)($$node),
												[$.attachment()]: attachPrevious
											})),
											'component',
											MenuStacked,
											187,
											7,
											{ componentTag: 'MenuOption' }
										);
									}

									$.append($$anchor, fragment_5);
								};

								var consequent_3 = ($$anchor) => {
									var fragment_6 = $.comment();
									var node_11 = $.first_child(fragment_6);

									{
										let $0 = $.derived(() => $$props.theme?.separator);

										$.add_svelte_meta(
											() => Separator(node_11, $.spread_props(() => $.get(item), {
												get theme() {
													return $.get($0);
												}
											})),
											'component',
											MenuStacked,
											195,
											7,
											{ componentTag: 'Separator' }
										);
									}

									$.append($$anchor, fragment_6);
								};

								var consequent_4 = ($$anchor) => {
									const submenuItem = $.tag($.derived(() => $.get(item)), 'submenuItem');

									$.get(submenuItem);

									const computed_const = $.tag(
										$.derived(() => {
											const {
												type: _type,
												menu: _menu,
												openOnHover: _openOnHover,
												openOnClick = true,
												hoverDelay: _hoverDelay,
												closeOnMouseLeave: _closeOnMouseLeave,
												popoverClass: _popoverClass,
												onClick: itemOnClick,
												suffix,
												attrs,
												...itemProps
											} = $.get(submenuItem);

											return {
												_type,
												_menu,
												_openOnHover,
												openOnClick,
												_hoverDelay,
												_closeOnMouseLeave,
												_popoverClass,
												itemOnClick,
												suffix,
												attrs,
												itemProps
											};
										}),
										'[@const]'
									);

									$.get(computed_const);

									var fragment_7 = $.comment();
									var node_12 = $.first_child(fragment_7);

									{
										let $0 = $.derived(() => $.get(computed_const).suffix ?? caretRightIcon);
										let $1 = $.derived(() => $$props.theme?.submenu);

										let $2 = $.derived(() => ({
											...$.get(computed_const).attrs,
											'aria-haspopup': 'menu',
											'aria-expanded': 'false',
											'data-menu-keep-open': 'true'
										}));

										$.add_svelte_meta(
											() => MenuOption(node_12, $.spread_props({ role: 'menuitem' }, () => $.get(computed_const).itemProps, {
												get suffix() {
													return $.get($0);
												},

												get theme() {
													return $.get($1);
												},

												get attrs() {
													return $.get($2);
												},

												onClick: (payload) => {
													$.get(computed_const).itemOnClick?.(payload);

													if ($.get(computed_const).openOnClick) void openSubmenu(depth(), index, $.get(item));
												},
												[$.attachment()]: ($$node) => (attachItemReference($.get(isActivePanel)) || $.noop)($$node),
												[$.attachment()]: (node) => {
													Object.assign(node, {
														onNext: () => {
															void openSubmenu(depth(), index, $.get(item));
														},

														onPrevious: () => {
															void closeSubmenu();
														}
													});
												}
											})),
											'component',
											MenuStacked,
											211,
											7,
											{ componentTag: 'MenuOption' }
										);
									}

									$.append($$anchor, fragment_7);
								};

								$.add_svelte_meta(
									() => $.if(node_8, ($$render) => {
										if ($.strict_equals($.get(item).type, 'button')) $$render(consequent_1); else if ($.strict_equals($.get(item).type, 'option')) $$render(consequent_2, 1); else if ($.strict_equals($.get(item).type, 'separator')) $$render(consequent_3, 2); else if ($.strict_equals($.get(item).type, 'submenu')) $$render(consequent_4, 3);
									}),
									'if',
									MenuStacked,
									178,
									6
								);
							}

							$.append($$anchor, fragment_3);
						}),
						'each',
						MenuStacked,
						177,
						5
					);

					var node_13 = $.sibling(node_7, 2);

					{
						var consequent_5 = ($$anchor) => {
							var fragment_8 = $.comment();
							var node_14 = $.first_child(fragment_8);

							{
								let $0 = $.derived(() => !!$$props.footer);
								let $1 = $.derived(() => $.get(classes).footer());

								$.add_svelte_meta(
									() => Slot(node_14, {
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
									MenuStacked,
									242,
									6,
									{ componentTag: 'Slot' }
								);
							}

							$.append($$anchor, fragment_8);
						};

						$.add_svelte_meta(
							() => $.if(node_13, ($$render) => {
								if (!$.get(hasBackControl)) $$render(consequent_5);
							}),
							'if',
							MenuStacked,
							241,
							5
						);
					}

					$.reset(div_1);
					$.template_effect(($0) => $.set_class(div_1, 1, $0), [() => $.clsx($.get(classes).root({}))]);
					$.append($$anchor, div_1);
				};

				$.add_svelte_meta(
					() => $.if(node_2, ($$render) => {
						if (depth() <= $.get(activeStep)) $$render(consequent_6);
					}),
					'if',
					MenuStacked,
					159,
					3
				);
			}

			$.append($$anchor, fragment);
		});

		$.add_svelte_meta(
			() => Stepper(node_1, {
				get items() {
					return $.get(panels);
				},

				get activeStep() {
					return $.get(activeStep);
				},
				panelRole: null,
				panelAriaLabelledby: false,
				keyFramesOptions: {
					duration: 240,
					easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
					fill: 'both'
				},
				children,
				$$slots: { default: true }
			}),
			'component',
			MenuStacked,
			142,
			1,
			{ componentTag: 'Stepper' }
		);
	}

	$.reset(div);
	$.attach(div, () => navigation.containerReference);
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	MenuStacked = $.hmr(MenuStacked);

	import.meta.hot.acceptExports(["default"],(module) => {
		MenuStacked[$.HMR].update(module.default);
	});
}

export default MenuStacked;
//# sourceMappingURL=data:application/json;base64,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TSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2NBQ2pCLE1BQU0sUUFBUTtvQkFDUixXQUFXLENBQUMsS0FBSyxJQUFFLEtBQUssUUFBRSxJQUFJO2NBQ3BDLENBQUM7O2NBQ0QsVUFBVSxRQUFRO29CQUNaLFlBQVk7Y0FDbEI7O1lBRUYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O29DQTFERSxJQUFJLEVBQUMsSUFBSSxFQUFLLFFBQVEsMERBUWpCLElBQUksRUFBQyxJQUFJLEVBQUssUUFBUSw2REFRdEIsSUFBSSxFQUFDLElBQUksRUFBSyxXQUFXLDZEQUV6QixJQUFJLEVBQUMsSUFBSSxFQUFLLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQThDZ0IsT0FBTyxFQUFDLE1BQU07OztlQUE5RCxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFEQSxjQUFjOzs7Ozs7Ozs7YUFqRnBCLEtBQUc7MkNBQUgsS0FBRyw4QkFBUSxPQUFPLEVBQUMsSUFBSTt3QkFBdkIsS0FBRzs7Ozs7VUFEQSxLQUFLLFlBQUksVUFBVTs7Ozs7Ozs7Ozs7OztTQWpCekI7O2tCQUNPLE1BQU07Ozs7a0JBQ1osVUFBVTs7ZUFDQSxJQUFJO3lCQUNNLEtBQUs7O0tBRXpCLFFBQVEsRUFBRSxHQUFHO0tBQ2IsTUFBTSxFQUFFLGdDQUFnQztLQUN4QyxJQUFJLEVBQUUsTUFBSzs7SUFHRixRQUFROzs7Ozs7Ozs7OztTQWpCbkI7VUFBQSxXQUlTLFVBQVUsQ0FBQyxrQkFBa0I7b0JBSnRDOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTWVudVN0YWNrZWQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IG9uTW91bnQsIHRpY2sgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnJGxpYi9pMThuL2NvbnRleHQuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgdXNlTmF2aWdhdGlvbiB9IGZyb20gJyRsaWIvdXRpbHMvdXNlTmF2aWdhdGlvbi5zdmVsdGUuanMnO1xuXHRpbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbi9CdXR0b24uc3ZlbHRlJztcblx0aW1wb3J0IHsgY2FyZXRSaWdodEljb24gfSBmcm9tICcuLi9JY29ucy9jYXJldFJpZ2h0LmpzJztcblx0aW1wb3J0IE1lbnVPcHRpb24gZnJvbSAnLi4vTWVudU9wdGlvbi9NZW51T3B0aW9uLnN2ZWx0ZSc7XG5cdGltcG9ydCBTZXBhcmF0b3IgZnJvbSAnLi4vU2VwYXJhdG9yL1NlcGFyYXRvci5zdmVsdGUnO1xuXHRpbXBvcnQgU2xvdCBmcm9tICcuLi9TbG90L1Nsb3Quc3ZlbHRlJztcblx0aW1wb3J0IFN0ZXBwZXIgZnJvbSAnLi4vU3RlcHBlci9TdGVwcGVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBNZW51U3RhY2tlZEJhY2tIZWFkZXIgZnJvbSAnLi9NZW51U3RhY2tlZEJhY2tIZWFkZXIuc3ZlbHRlJztcblx0aW1wb3J0IHR5cGUgeyBNZW51SXRlbSwgTWVudVByb3BzIH0gZnJvbSAnLi9tZW51LnByb3BzLmpzJztcblx0aW1wb3J0IHsgdXNlTWVudVRoZW1lIH0gZnJvbSAnLi9tZW51LnRoZW1lLmpzJztcblx0aW1wb3J0IHsgZ2V0TWVudU1heERlcHRoIH0gZnJvbSAnLi9tZW51VHJlZS5qcyc7XG5cblx0dHlwZSBTdWJtZW51SXRlbSA9IEV4dHJhY3Q8TWVudUl0ZW0sIHsgdHlwZTogJ3N1Ym1lbnUnIH0+O1xuXHR0eXBlIE1lbnVQYXRoRW50cnkgPSB7XG5cdFx0aXRlbTogU3VibWVudUl0ZW07XG5cdFx0cGFyZW50TmF2aWdhdGlvbkluZGV4OiBudW1iZXI7XG5cdH07XG5cblx0bGV0IHtcblx0XHRpdGVtcyxcblx0XHRjbGFzczogY2xhc3NOYW1lID0gJycsXG5cdFx0dGhlbWUsXG5cdFx0aGVhZGVyLFxuXHRcdGZvb3Rlcixcblx0XHRmb2N1c09uTW91bnQsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogTWVudVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgaWQgPSAkcHJvcHMuaWQoKTtcblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZU1lbnVUaGVtZSh0aGVtZSkpO1xuXHRjb25zdCB0ID0gJGRlcml2ZWQodXNlSTE4bigpKTtcblx0Y29uc3QgbWF4RGVwdGggPSAkZGVyaXZlZChnZXRNZW51TWF4RGVwdGgoaXRlbXMpKTtcblx0Y29uc3QgcGFuZWxzID0gJGRlcml2ZWQoQXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4RGVwdGggKyAxIH0sIChfLCBkZXB0aCkgPT4gZGVwdGgpKTtcblxuXHRsZXQgcGF0aCA9ICRzdGF0ZTxNZW51UGF0aEVudHJ5W10+KFtdKTtcblx0Y29uc3QgYWN0aXZlU3RlcCA9ICRkZXJpdmVkKHBhdGgubGVuZ3RoKTtcblxuXHRjb25zdCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbih7XG5cdFx0b3JpZW50YXRpb246ICgpID0+ICd2ZXJ0aWNhbCcsXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRpZCxcblx0XHRlbmFibGVIb3ZlckZvY3VzOiB0cnVlLFxuXHRcdGRlZmF1bHRGb2N1c2VkSW5kZXg6ICgpID0+IG5hdmlnYXRpb24ubGFzdEZvY3VzZWRJbmRleCA/PyAwLFxuXHRcdHByZXZlbnRLZXlib2FyZERlZmF1bHQ6IGZhbHNlXG5cdH0pO1xuXG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChwYXRoLmxlbmd0aCA8PSBtYXhEZXB0aCkgcmV0dXJuO1xuXHRcdHBhdGggPSBwYXRoLnNsaWNlKDAsIG1heERlcHRoKTtcblx0fSk7XG5cblx0b25Nb3VudCgoKSA9PiB7XG5cdFx0aWYgKGZvY3VzT25Nb3VudCA9PT0gJ2NvbnRhaW5lcicpIHtcblx0XHRcdG5hdmlnYXRpb24uZm9jdXNDb250YWluZXIoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGZvY3VzT25Nb3VudCkgbmF2aWdhdGlvbi5mb2N1c0ZpcnN0KCk7XG5cdH0pO1xuXG5cdGNvbnN0IGdldFBhbmVsSXRlbXMgPSAoZGVwdGg6IG51bWJlcik6IE1lbnVJdGVtW10gPT4ge1xuXHRcdGlmIChkZXB0aCA9PT0gMCkgcmV0dXJuIGl0ZW1zO1xuXHRcdHJldHVybiBwYXRoW2RlcHRoIC0gMV0/Lml0ZW0ubWVudSA/PyBbXTtcblx0fTtcblxuXHRjb25zdCBnZXRQYW5lbEVudHJ5ID0gKGRlcHRoOiBudW1iZXIpID0+IHBhdGhbZGVwdGggLSAxXSA/PyBudWxsO1xuXG5cdGNvbnN0IGlzRGlzYWJsZWRNZW51SXRlbSA9IChtZW51SXRlbTogTWVudUl0ZW0pID0+XG5cdFx0bWVudUl0ZW0udHlwZSAhPT0gJ3NlcGFyYXRvcicgJiYgbWVudUl0ZW0uZGlzYWJsZWQgPT09IHRydWU7XG5cblx0Y29uc3QgZ2V0TmF2aWdhdGlvbkluZGV4ID0gKFxuXHRcdHBhbmVsSXRlbXM6IE1lbnVJdGVtW10sXG5cdFx0aXRlbUluZGV4OiBudW1iZXIsXG5cdFx0aGFzQmFja0NvbnRyb2w6IGJvb2xlYW5cblx0KSA9PiB7XG5cdFx0bGV0IG5hdmlnYXRpb25JbmRleCA9IGhhc0JhY2tDb250cm9sID8gMSA6IDA7XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGl0ZW1JbmRleDsgaW5kZXggKz0gMSkge1xuXHRcdFx0aWYgKHBhbmVsSXRlbXNbaW5kZXhdPy50eXBlICE9PSAnc2VwYXJhdG9yJykgbmF2aWdhdGlvbkluZGV4ICs9IDE7XG5cdFx0fVxuXHRcdHJldHVybiBuYXZpZ2F0aW9uSW5kZXg7XG5cdH07XG5cblx0Y29uc3QgZ2V0Rmlyc3RFbmFibGVkQ2hpbGROYXZpZ2F0aW9uSW5kZXggPSAocGFuZWxJdGVtczogTWVudUl0ZW1bXSkgPT4ge1xuXHRcdGxldCBuYXZpZ2F0aW9uSW5kZXggPSAxO1xuXHRcdGZvciAoY29uc3QgbWVudUl0ZW0gb2YgcGFuZWxJdGVtcykge1xuXHRcdFx0aWYgKG1lbnVJdGVtLnR5cGUgPT09ICdzZXBhcmF0b3InKSBjb250aW51ZTtcblx0XHRcdGlmICghaXNEaXNhYmxlZE1lbnVJdGVtKG1lbnVJdGVtKSkgcmV0dXJuIG5hdmlnYXRpb25JbmRleDtcblx0XHRcdG5hdmlnYXRpb25JbmRleCArPSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fTtcblxuXHRjb25zdCBvcGVuU3VibWVudSA9IGFzeW5jIChkZXB0aDogbnVtYmVyLCBpdGVtSW5kZXg6IG51bWJlciwgaXRlbTogU3VibWVudUl0ZW0pID0+IHtcblx0XHRjb25zdCBwYW5lbEl0ZW1zID0gZ2V0UGFuZWxJdGVtcyhkZXB0aCk7XG5cdFx0Y29uc3QgcGFyZW50TmF2aWdhdGlvbkluZGV4ID0gZ2V0TmF2aWdhdGlvbkluZGV4KHBhbmVsSXRlbXMsIGl0ZW1JbmRleCwgZGVwdGggPiAwKTtcblx0XHRwYXRoID0gW1xuXHRcdFx0Li4ucGF0aC5zbGljZSgwLCBkZXB0aCksXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdHBhcmVudE5hdmlnYXRpb25JbmRleFxuXHRcdFx0fVxuXHRcdF07XG5cdFx0YXdhaXQgdGljaygpO1xuXHRcdG5hdmlnYXRpb24uZm9jdXNJdGVtKGdldEZpcnN0RW5hYmxlZENoaWxkTmF2aWdhdGlvbkluZGV4KGl0ZW0ubWVudSkpO1xuXHR9O1xuXG5cdGNvbnN0IGNsb3NlU3VibWVudSA9IGFzeW5jICgpID0+IHtcblx0XHRjb25zdCBjdXJyZW50RW50cnkgPSBwYXRoLmF0KC0xKTtcblx0XHRpZiAoIWN1cnJlbnRFbnRyeSkgcmV0dXJuO1xuXHRcdHBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKTtcblx0XHRhd2FpdCB0aWNrKCk7XG5cdFx0bmF2aWdhdGlvbi5mb2N1c0l0ZW0oY3VycmVudEVudHJ5LnBhcmVudE5hdmlnYXRpb25JbmRleCk7XG5cdH07XG5cblx0Y29uc3QgZ2V0QmFja0NvbnRyb2xMYWJlbCA9IChlbnRyeTogTWVudVBhdGhFbnRyeSB8IG51bGwpID0+IHtcblx0XHRjb25zdCB0aXRsZSA9IGVudHJ5Py5pdGVtLnRpdGxlO1xuXHRcdHJldHVybiB0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnID8gYCR7dC5iYWNrfTogJHt0aXRsZX1gIDogdC5iYWNrO1xuXHR9O1xuXG5cdGNvbnN0IGF0dGFjaEl0ZW1SZWZlcmVuY2UgPSAoaXNBY3RpdmVQYW5lbDogYm9vbGVhbikgPT4gKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0aWYgKCFpc0FjdGl2ZVBhbmVsKSByZXR1cm47XG5cdFx0cmV0dXJuIG5hdmlnYXRpb24uaXRlbVJlZmVyZW5jZShub2RlKTtcblx0fTtcblxuXHRjb25zdCBhdHRhY2hQcmV2aW91cyA9IChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuXHRcdE9iamVjdC5hc3NpZ24obm9kZSwge1xuXHRcdFx0b25QcmV2aW91czogKCkgPT4ge1xuXHRcdFx0XHR2b2lkIGNsb3NlU3VibWVudSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuPC9zY3JpcHQ+XG5cbjxkaXZcblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IGNsYXNzTmFtZSB9KX1cblx0cm9sZT1cIm1lbnVcIlxuXHR7Li4uYXR0YWNobWVudHN9XG5cdHtAYXR0YWNoIG5hdmlnYXRpb24uY29udGFpbmVyUmVmZXJlbmNlfVxuPlxuXHQ8U3RlcHBlclxuXHRcdGl0ZW1zPXtwYW5lbHN9XG5cdFx0e2FjdGl2ZVN0ZXB9XG5cdFx0cGFuZWxSb2xlPXtudWxsfVxuXHRcdHBhbmVsQXJpYUxhYmVsbGVkYnk9e2ZhbHNlfVxuXHRcdGtleUZyYW1lc09wdGlvbnM9e3tcblx0XHRcdGR1cmF0aW9uOiAyNDAsXG5cdFx0XHRlYXNpbmc6ICdjdWJpYy1iZXppZXIoMC4yMiwgMSwgMC4zNiwgMSknLFxuXHRcdFx0ZmlsbDogJ2JvdGgnXG5cdFx0fX1cblx0PlxuXHRcdHsjc25pcHBldCBjaGlsZHJlbih7IGl0ZW06IGRlcHRoIH0pfVxuXHRcdFx0e0Bjb25zdCBpc0FjdGl2ZVBhbmVsID0gZGVwdGggPT09IGFjdGl2ZVN0ZXB9XG5cdFx0XHR7QGNvbnN0IHBhbmVsSXRlbXMgPSBnZXRQYW5lbEl0ZW1zKGRlcHRoKX1cblx0XHRcdHtAY29uc3QgcGFuZWxFbnRyeSA9IGdldFBhbmVsRW50cnkoZGVwdGgpfVxuXHRcdFx0e0Bjb25zdCBoYXNCYWNrQ29udHJvbCA9IGRlcHRoID4gMH1cblxuXHRcdFx0eyNpZiBkZXB0aCA8PSBhY3RpdmVTdGVwfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLnJvb3Qoe30pfT5cblx0XHRcdFx0XHR7I2lmIGhhc0JhY2tDb250cm9sfVxuXHRcdFx0XHRcdFx0PE1lbnVTdGFja2VkQmFja0hlYWRlclxuXHRcdFx0XHRcdFx0XHRvcGVuZXI9e3BhbmVsRW50cnk/Lml0ZW0gPz8gbnVsbH1cblx0XHRcdFx0XHRcdFx0bGFiZWw9e2dldEJhY2tDb250cm9sTGFiZWwocGFuZWxFbnRyeSl9XG5cdFx0XHRcdFx0XHRcdHt0aGVtZX1cblx0XHRcdFx0XHRcdFx0b25CYWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dm9pZCBjbG9zZVN1Ym1lbnUoKTtcblx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0aXRlbVJlZmVyZW5jZT17YXR0YWNoSXRlbVJlZmVyZW5jZShpc0FjdGl2ZVBhbmVsKX1cblx0XHRcdFx0XHRcdFx0YmFja1JlZmVyZW5jZT17YXR0YWNoUHJldmlvdXN9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PFNlcGFyYXRvciB0aGVtZT17dGhlbWU/LnNlcGFyYXRvcn0gLz5cblx0XHRcdFx0XHR7OmVsc2V9XG5cdFx0XHRcdFx0XHQ8U2xvdCByZW5kZXI9e2hlYWRlcn0gcmVuZGVySWY9eyEhaGVhZGVyfSBjbGFzcz17Y2xhc3Nlcy5oZWFkZXIoKX0gLz5cblx0XHRcdFx0XHR7L2lmfVxuXG5cdFx0XHRcdFx0eyNlYWNoIHBhbmVsSXRlbXMgYXMgaXRlbSwgaW5kZXh9XG5cdFx0XHRcdFx0XHR7I2lmIGl0ZW0udHlwZSA9PT0gJ2J1dHRvbid9XG5cdFx0XHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdFx0XHRyb2xlPVwibWVudWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdHsuLi5pdGVtfVxuXHRcdFx0XHRcdFx0XHRcdHRoZW1lPXt0aGVtZT8uYnV0dG9ufVxuXHRcdFx0XHRcdFx0XHRcdHtAYXR0YWNoIGF0dGFjaEl0ZW1SZWZlcmVuY2UoaXNBY3RpdmVQYW5lbCl9XG5cdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggYXR0YWNoUHJldmlvdXN9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHR7OmVsc2UgaWYgaXRlbS50eXBlID09PSAnb3B0aW9uJ31cblx0XHRcdFx0XHRcdFx0PE1lbnVPcHRpb25cblx0XHRcdFx0XHRcdFx0XHRyb2xlPVwibWVudWl0ZW1cIlxuXHRcdFx0XHRcdFx0XHRcdHsuLi5pdGVtfVxuXHRcdFx0XHRcdFx0XHRcdHRoZW1lPXt0aGVtZT8ub3B0aW9ufVxuXHRcdFx0XHRcdFx0XHRcdHtAYXR0YWNoIGF0dGFjaEl0ZW1SZWZlcmVuY2UoaXNBY3RpdmVQYW5lbCl9XG5cdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggYXR0YWNoUHJldmlvdXN9XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHR7OmVsc2UgaWYgaXRlbS50eXBlID09PSAnc2VwYXJhdG9yJ31cblx0XHRcdFx0XHRcdFx0PFNlcGFyYXRvciB7Li4uaXRlbX0gdGhlbWU9e3RoZW1lPy5zZXBhcmF0b3J9IC8+XG5cdFx0XHRcdFx0XHR7OmVsc2UgaWYgaXRlbS50eXBlID09PSAnc3VibWVudSd9XG5cdFx0XHRcdFx0XHRcdHtAY29uc3Qgc3VibWVudUl0ZW0gPSBpdGVtIGFzIHR5cGVvZiBpdGVtICYgeyBwb3BvdmVyQ2xhc3M/OiBzdHJpbmcgfX1cblx0XHRcdFx0XHRcdFx0e0Bjb25zdCB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogX3R5cGUsXG5cdFx0XHRcdFx0XHRcdFx0bWVudTogX21lbnUsXG5cdFx0XHRcdFx0XHRcdFx0b3Blbk9uSG92ZXI6IF9vcGVuT25Ib3Zlcixcblx0XHRcdFx0XHRcdFx0XHRvcGVuT25DbGljayA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0aG92ZXJEZWxheTogX2hvdmVyRGVsYXksXG5cdFx0XHRcdFx0XHRcdFx0Y2xvc2VPbk1vdXNlTGVhdmU6IF9jbG9zZU9uTW91c2VMZWF2ZSxcblx0XHRcdFx0XHRcdFx0XHRwb3BvdmVyQ2xhc3M6IF9wb3BvdmVyQ2xhc3MsXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljazogaXRlbU9uQ2xpY2ssXG5cdFx0XHRcdFx0XHRcdFx0c3VmZml4LFxuXHRcdFx0XHRcdFx0XHRcdGF0dHJzLFxuXHRcdFx0XHRcdFx0XHRcdC4uLml0ZW1Qcm9wc1xuXHRcdFx0XHRcdFx0XHR9ID0gc3VibWVudUl0ZW19XG5cdFx0XHRcdFx0XHRcdDxNZW51T3B0aW9uXG5cdFx0XHRcdFx0XHRcdFx0cm9sZT1cIm1lbnVpdGVtXCJcblx0XHRcdFx0XHRcdFx0XHR7Li4uaXRlbVByb3BzfVxuXHRcdFx0XHRcdFx0XHRcdHN1ZmZpeD17c3VmZml4ID8/IGNhcmV0UmlnaHRJY29ufVxuXHRcdFx0XHRcdFx0XHRcdHRoZW1lPXt0aGVtZT8uc3VibWVudX1cblx0XHRcdFx0XHRcdFx0XHRhdHRycz17e1xuXHRcdFx0XHRcdFx0XHRcdFx0Li4uYXR0cnMsXG5cdFx0XHRcdFx0XHRcdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICdtZW51Jyxcblx0XHRcdFx0XHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcblx0XHRcdFx0XHRcdFx0XHRcdCdkYXRhLW1lbnUta2VlcC1vcGVuJzogJ3RydWUnXG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsocGF5bG9hZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbU9uQ2xpY2s/LihwYXlsb2FkKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcGVuT25DbGljaykgdm9pZCBvcGVuU3VibWVudShkZXB0aCwgaW5kZXgsIGl0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggYXR0YWNoSXRlbVJlZmVyZW5jZShpc0FjdGl2ZVBhbmVsKX1cblx0XHRcdFx0XHRcdFx0XHR7QGF0dGFjaCAobm9kZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihub2RlLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uTmV4dDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZvaWQgb3BlblN1Ym1lbnUoZGVwdGgsIGluZGV4LCBpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25QcmV2aW91czogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZvaWQgY2xvc2VTdWJtZW51KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdHsvZWFjaH1cblxuXHRcdFx0XHRcdHsjaWYgIWhhc0JhY2tDb250cm9sfVxuXHRcdFx0XHRcdFx0PFNsb3QgcmVuZGVyPXtmb290ZXJ9IHJlbmRlcklmPXshIWZvb3Rlcn0gY2xhc3M9e2NsYXNzZXMuZm9vdGVyKCl9IC8+XG5cdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR7L2lmfVxuXHRcdHsvc25pcHBldH1cblx0PC9TdGVwcGVyPlxuPC9kaXY+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL01lbnUvTWVudVN0YWNrZWQuc3ZlbHRlIn0=