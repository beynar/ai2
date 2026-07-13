import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Breadcrumbs/Breadcrumbs.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Breadcrumbs[$.FILENAME] = 'src/lib/components/Breadcrumbs/Breadcrumbs.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useBreadcrumbsTheme } from "/src/lib/components/Breadcrumbs/breadcrumbs.theme.ts";
import { useNavigation } from "/src/lib/utils/useNavigation.svelte.ts";
import { dotsThreeIcon } from "/src/lib/components/Icons/dotsThree.ts";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import { houseIcon } from "/src/lib/components/Icons/house.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'items',
	'item',
	'home',
	'maxItems',
	'showSeparator',
	'separator',
	'ellipsisIcon',
	'ellipsis',
	'class',
	'theme'
]);

var root = $.add_locations($.from_html(`<span class="sr-only">More</span>`), Breadcrumbs[$.FILENAME], [[113, 10]]);
var root_1 = $.add_locations($.from_html(`<button><!></button>`), Breadcrumbs[$.FILENAME], [[95, 8]]);
var root_2 = $.add_locations($.from_html(`<!> <!>`, 1), Breadcrumbs[$.FILENAME], []);
var root_3 = $.add_locations($.from_html(`<li><!></li> <!>`, 1), Breadcrumbs[$.FILENAME], [[83, 3]]);
var root_4 = $.add_locations($.from_html(`<nav><ol class="flex flex-wrap items-center"></ol></nav>`), Breadcrumbs[$.FILENAME], [[75, 0, [[81, 1]]]]);

function Breadcrumbs($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Breadcrumbs);

	let showSeparator = $.prop($$props, 'showSeparator', 3, true),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useBreadcrumbsTheme($$props.theme)), 'classes');
	const navigation = useNavigation({ orientation: 'horizontal', loop: true });

	// Build the items array with ellipsis if needed
	// Returns an array where the first item might be an ellipsis with a menu of hidden items
	const displayItems = $.tag(
		$.derived(() => {
			const homeItem = $$props.home
				? {
					...$$props.home,
					label: $$props.home.label || houseIcon.withProps({ size: 16 })
				}
				: undefined;

			// If no maxItems or items fit within limit, return all items
			if (!$$props.maxItems || $$props.items.length <= $$props.maxItems) {
				return homeItem ? [homeItem].concat($$props.items) : $$props.items;
			}

			// Build ellipsis menu item with all hidden items
			const hiddenItems = $$props.items.slice(0, -$$props.maxItems);

			const visibleItems = $$props.items.slice(-$$props.maxItems);

			// Convert hidden items to menu format
			const menuItems = hiddenItems.map((item) => {
				return {
					type: 'option',
					children: $.strict_equals(typeof item.label, 'string') ? item.label : item.label,
					href: item.href,
					// disabled: item.disabled,
					onClick: item.onClick
				};
			});

			// Create ellipsis item with menu
			const ellipsisItem = {
				label: $$props.ellipsisIcon || dotsThreeIcon.withProps({ size: 16 }),
				menu: menuItems
			};

			return homeItem
				? [homeItem].concat([ellipsisItem, ...visibleItems])
				: [ellipsisItem, ...visibleItems];
		}),
		'displayItems'
	);

	var $$exports = { ...$.legacy_api() };
	var nav = root_4();

	$.attribute_effect(nav, ($0) => ({ 'aria-label': 'Breadcrumbs', class: $0, ...attachments }), [() => $.get(classes).root({ className: $$props.class })]);

	var ol = $.child(nav);

	$.add_svelte_meta(
		() => $.each(ol, 21, () => $.get(displayItems), $.index, ($$anchor, item, i) => {
			var fragment = root_3();
			var li = $.first_child(fragment);
			var node = $.child(li);

			{
				var consequent_1 = ($$anchor) => {
					var fragment_1 = $.comment();
					var node_1 = $.first_child(fragment_1);

					{
						var consequent = ($$anchor) => {
							var fragment_2 = $.comment();
							var node_2 = $.first_child(fragment_2);

							$.add_svelte_meta(() => $.snippet(node_2, () => $$props.ellipsis, () => $.get(item).menu), 'render', Breadcrumbs, 91, 6);
							$.append($$anchor, fragment_2);
						};

						var alternate = ($$anchor) => {
							var fragment_3 = $.comment();
							var node_3 = $.first_child(fragment_3);

							{
								const trigger = $.wrap_snippet(Breadcrumbs, function ($$anchor, popover = $.noop) {
									$.validate_snippet_args(...arguments);

									var button = root_1();
									var node_4 = $.child(button);

									{
										let $0 = $.derived(() => $.get(classes).ellipsis());

										$.add_svelte_meta(
											() => Slot(node_4, {
												as: 'span',
												get render() {
													return $.get(item).label;
												},

												get class() {
													return $.get($0);
												},
												attrs: { role: 'presentation', 'aria-hidden': true },
												children: $.wrap_snippet(Breadcrumbs, ($$anchor, $$slotProps) => {
													var span = root();

													$.append($$anchor, span);
												}),
												$$slots: { default: true }
											}),
											'component',
											Breadcrumbs,
											104,
											9,
											{ componentTag: 'Slot' }
										);
									}

									$.reset(button);
									$.attach(button, () => navigation.itemReference);
									$.attach(button, () => popover().reference);
									$.template_effect(($0) => $.set_class(button, 1, $0), [() => $.clsx($.get(classes).link())]);

									$.delegated('click', button, function click(e) {
										e.preventDefault();
										popover().toggle();
									});

									$.append($$anchor, button);
								});

								let $0 = $.derived(() => ({ items: $.get(item).menu }));

								$.add_svelte_meta(
									() => PopupMenu(node_3, {
										get menu() {
											return $.get($0);
										},
										trigger,
										$$slots: { trigger: true }
									}),
									'component',
									Breadcrumbs,
									93,
									6,
									{ componentTag: 'PopupMenu' }
								);
							}

							$.append($$anchor, fragment_3);
						};

						$.add_svelte_meta(
							() => $.if(node_1, ($$render) => {
								if ($$props.ellipsis) $$render(consequent); else $$render(alternate, -1);
							}),
							'if',
							Breadcrumbs,
							90,
							5
						);
					}

					$.append($$anchor, fragment_1);
				};

				var alternate_2 = ($$anchor) => {
					var fragment_4 = $.comment();
					var node_5 = $.first_child(fragment_4);

					{
						$.validate_dynamic_element_tag(() => $.get(item).active ? 'span' : $.get(item).href ? 'a' : 'button');
						$.validate_void_dynamic_element(() => $.get(item).active ? 'span' : $.get(item).href ? 'a' : 'button');

						$.element(
							node_5,
							() => $.get(item).active ? 'span' : $.get(item).href ? 'a' : 'button',
							false,
							($$element, $$anchor) => {
								$.attach($$element, () => navigation.itemReference);

								$.attribute_effect(
									$$element,
									($0) => ({
										role: $.get(item).active ? 'link' : $.get(item).href ? 'link' : 'button',
										onclick: $.get(item).onClick,
										class: $0,
										href: $.get(item).href,
										'aria-disabled': $.get(item).disabled || $.get(item).active,
										'aria-current': $.get(item).active ? 'page' : undefined,
										'data-disabled': $.get(item).disabled || $.get(item).active
									}),
									[
										() => $.get(classes).link({ disabled: $.get(item).disabled, active: $.get(item).active })
									]
								);

								var fragment_5 = $.comment();
								var node_6 = $.first_child(fragment_5);

								{
									var consequent_2 = ($$anchor) => {
										var fragment_6 = $.comment();
										var node_7 = $.first_child(fragment_6);

										$.add_svelte_meta(() => $.snippet(node_7, () => $$props.item, () => $.get(item)), 'render', Breadcrumbs, 132, 7);
										$.append($$anchor, fragment_6);
									};

									var alternate_1 = ($$anchor) => {
										var fragment_7 = root_2();
										var node_8 = $.first_child(fragment_7);

										{
											var consequent_3 = ($$anchor) => {
												var fragment_8 = $.comment();
												var node_9 = $.first_child(fragment_8);

												{
													let $0 = $.derived(() => $.get(classes).icon({ size: 'normal' }));

													$.add_svelte_meta(
														() => Slot(node_9, {
															get render() {
																return $.get(item).icon;
															},

															get class() {
																return $.get($0);
															}
														}),
														'component',
														Breadcrumbs,
														135,
														8,
														{ componentTag: 'Slot' }
													);
												}

												$.append($$anchor, fragment_8);
											};

											$.add_svelte_meta(
												() => $.if(node_8, ($$render) => {
													if ($.get(item).icon) $$render(consequent_3);
												}),
												'if',
												Breadcrumbs,
												134,
												7
											);
										}

										var node_10 = $.sibling(node_8, 2);

										$.add_svelte_meta(
											() => Slot(node_10, {
												get render() {
													return $.get(item).label;
												}
											}),
											'component',
											Breadcrumbs,
											137,
											7,
											{ componentTag: 'Slot' }
										);

										$.append($$anchor, fragment_7);
									};

									$.add_svelte_meta(
										() => $.if(node_6, ($$render) => {
											if ($$props.item) $$render(consequent_2); else $$render(alternate_1, -1);
										}),
										'if',
										Breadcrumbs,
										131,
										6
									);
								}

								$.append($$anchor, fragment_5);
							},
							void 0,
							[120, 5]
						);
					}

					$.append($$anchor, fragment_4);
				};

				$.add_svelte_meta(
					() => $.if(node, ($$render) => {
						if ($.get(item).menu && $.get(item).menu.length > 0) $$render(consequent_1); else $$render(alternate_2, -1);
					}),
					'if',
					Breadcrumbs,
					89,
					4
				);
			}

			$.reset(li);

			var node_11 = $.sibling(li, 2);

			{
				var consequent_4 = ($$anchor) => {
					var fragment_9 = $.comment();
					var node_12 = $.first_child(fragment_9);

					{
						let $0 = $.derived(() => $$props.separator || caretRightIcon.withProps({ size: 16 }));
						let $1 = $.derived(() => $.get(classes).separator());

						$.add_svelte_meta(
							() => Slot(node_12, {
								as: 'li',
								attrs: { role: 'presentation', 'aria-hidden': true },
								get render() {
									return $.get($0);
								},

								get class() {
									return $.get($1);
								}
							}),
							'component',
							Breadcrumbs,
							143,
							4,
							{ componentTag: 'Slot' }
						);
					}

					$.append($$anchor, fragment_9);
				};

				$.add_svelte_meta(
					() => $.if(node_11, ($$render) => {
						if (i < $.get(displayItems).length - 1 && showSeparator()) $$render(consequent_4);
					}),
					'if',
					Breadcrumbs,
					142,
					3
				);
			}

			$.template_effect(($0) => $.set_class(li, 1, $0), [
				() => $.clsx($.get(classes).item({ disabled: $.get(item).disabled, active: $.get(item).active }))
			]);

			$.append($$anchor, fragment);
		}),
		'each',
		Breadcrumbs,
		82,
		2
	);

	$.reset(ol);
	$.reset(nav);
	$.attach(nav, () => navigation.containerReference);
	$.append($$anchor, nav);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Breadcrumbs = $.hmr(Breadcrumbs);

	import.meta.hot.acceptExports(["default"],(module) => {
		Breadcrumbs[$.HMR].update(module.default);
	});
}

export default Breadcrumbs;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7O1VBSC9DLENBQUMsU0FBRyxZQUFZLEVBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxhQUFhOzs7Ozs7Ozs7eUNBM0RoRDt1QkFDTyxPQUFPLEVBQUMsSUFBSSxHQUNsQixRQUFRLFFBQUUsSUFBSSxFQUFDLFFBQVEsRUFDdkIsTUFBTSxRQUFFLElBQUksRUFBQzs7Ozs7Ozs7Ozs7U0FMaEIsRUFBRTtTQU5IO1VBQUEsV0FHUyxVQUFVLENBQUMsa0JBQWtCO29CQUh0Qzs7O0FBRk8iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkJyZWFkY3J1bWJzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIGdlbmVyaWNzPVwiY29uc3QgSXRlbXMgZXh0ZW5kcyBCcmVhZGNydW1iSXRlbVtdID0gQnJlYWRjcnVtYkl0ZW1bXVwiPlxuXHRpbXBvcnQgUG9wdXBNZW51IGZyb20gJy4uL1BvcHVwTWVudS9Qb3B1cE1lbnUuc3ZlbHRlJztcblx0aW1wb3J0IFNsb3QgZnJvbSAnLi4vU2xvdC9TbG90LnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgQnJlYWRjcnVtYnNQcm9wcywgQnJlYWRjcnVtYkl0ZW0gfSBmcm9tICcuL2JyZWFkY3J1bWJzLnByb3BzLmpzJztcblx0aW1wb3J0IHsgdXNlQnJlYWRjcnVtYnNUaGVtZSB9IGZyb20gJy4vYnJlYWRjcnVtYnMudGhlbWUuanMnO1xuXHRpbXBvcnQgeyB1c2VOYXZpZ2F0aW9uIH0gZnJvbSAnJGxpYi91dGlscy91c2VOYXZpZ2F0aW9uLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IGRvdHNUaHJlZUljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvZG90c1RocmVlLmpzJztcblx0aW1wb3J0IHsgY2FyZXRSaWdodEljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvY2FyZXRSaWdodC5qcyc7XG5cdGltcG9ydCB7IGhvdXNlSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9ob3VzZS5qcyc7XG5cdGltcG9ydCB0eXBlIHsgTWVudUl0ZW0gfSBmcm9tICcuLi9NZW51L2luZGV4LmpzJztcblxuXHRsZXQge1xuXHRcdGl0ZW1zLFxuXHRcdGl0ZW06IGl0ZW1TbG90LFxuXHRcdGhvbWUsXG5cdFx0bWF4SXRlbXMsXG5cdFx0c2hvd1NlcGFyYXRvciA9IHRydWUsXG5cdFx0c2VwYXJhdG9yLFxuXHRcdGVsbGlwc2lzSWNvbixcblx0XHRlbGxpcHNpcyxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IEJyZWFkY3J1bWJzUHJvcHM8SXRlbXM+ID0gJHByb3BzKCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZUJyZWFkY3J1bWJzVGhlbWUodGhlbWUpKTtcblxuXHRjb25zdCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbih7XG5cdFx0b3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcblx0XHRsb29wOiB0cnVlXG5cdH0pO1xuXG5cdC8vIEJ1aWxkIHRoZSBpdGVtcyBhcnJheSB3aXRoIGVsbGlwc2lzIGlmIG5lZWRlZFxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IHdoZXJlIHRoZSBmaXJzdCBpdGVtIG1pZ2h0IGJlIGFuIGVsbGlwc2lzIHdpdGggYSBtZW51IG9mIGhpZGRlbiBpdGVtc1xuXHRjb25zdCBkaXNwbGF5SXRlbXMgPSAkZGVyaXZlZC5ieSgoKTogQnJlYWRjcnVtYkl0ZW1bXSA9PiB7XG5cdFx0Y29uc3QgaG9tZUl0ZW06IEl0ZW1zW251bWJlcl0gfCB1bmRlZmluZWQgPSBob21lXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHQuLi5ob21lLFxuXHRcdFx0XHRcdGxhYmVsOiBob21lLmxhYmVsIHx8IGhvdXNlSWNvbi53aXRoUHJvcHMoeyBzaXplOiAxNiB9KVxuXHRcdFx0XHR9XG5cdFx0XHQ6IHVuZGVmaW5lZDtcblxuXHRcdC8vIElmIG5vIG1heEl0ZW1zIG9yIGl0ZW1zIGZpdCB3aXRoaW4gbGltaXQsIHJldHVybiBhbGwgaXRlbXNcblx0XHRpZiAoIW1heEl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA8PSBtYXhJdGVtcykge1xuXHRcdFx0cmV0dXJuIGhvbWVJdGVtID8gW2hvbWVJdGVtXS5jb25jYXQoaXRlbXMpIDogaXRlbXM7XG5cdFx0fVxuXG5cdFx0Ly8gQnVpbGQgZWxsaXBzaXMgbWVudSBpdGVtIHdpdGggYWxsIGhpZGRlbiBpdGVtc1xuXHRcdGNvbnN0IGhpZGRlbkl0ZW1zID0gaXRlbXMuc2xpY2UoMCwgLW1heEl0ZW1zKTtcblx0XHRjb25zdCB2aXNpYmxlSXRlbXMgPSBpdGVtcy5zbGljZSgtbWF4SXRlbXMpO1xuXG5cdFx0Ly8gQ29udmVydCBoaWRkZW4gaXRlbXMgdG8gbWVudSBmb3JtYXRcblx0XHRjb25zdCBtZW51SXRlbXMgPSBoaWRkZW5JdGVtcy5tYXAoKGl0ZW0pID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6ICdvcHRpb24nIGFzIGNvbnN0LFxuXHRcdFx0XHRjaGlsZHJlbjogdHlwZW9mIGl0ZW0ubGFiZWwgPT09ICdzdHJpbmcnID8gaXRlbS5sYWJlbCA6IGl0ZW0ubGFiZWwsXG5cdFx0XHRcdGhyZWY6IGl0ZW0uaHJlZixcblx0XHRcdFx0Ly8gZGlzYWJsZWQ6IGl0ZW0uZGlzYWJsZWQsXG5cdFx0XHRcdG9uQ2xpY2s6IGl0ZW0ub25DbGlja1xuXHRcdFx0fSBzYXRpc2ZpZXMgTWVudUl0ZW07XG5cdFx0fSk7XG5cblx0XHQvLyBDcmVhdGUgZWxsaXBzaXMgaXRlbSB3aXRoIG1lbnVcblx0XHRjb25zdCBlbGxpcHNpc0l0ZW06IEJyZWFkY3J1bWJJdGVtID0ge1xuXHRcdFx0bGFiZWw6IGVsbGlwc2lzSWNvbiB8fCBkb3RzVGhyZWVJY29uLndpdGhQcm9wcyh7IHNpemU6IDE2IH0pLFxuXHRcdFx0bWVudTogbWVudUl0ZW1zXG5cdFx0fTtcblxuXHRcdHJldHVybiBob21lSXRlbVxuXHRcdFx0PyBbaG9tZUl0ZW1dLmNvbmNhdChbZWxsaXBzaXNJdGVtLCAuLi52aXNpYmxlSXRlbXNdKVxuXHRcdFx0OiBbZWxsaXBzaXNJdGVtLCAuLi52aXNpYmxlSXRlbXNdO1xuXHR9KTtcbjwvc2NyaXB0PlxuXG48bmF2XG5cdGFyaWEtbGFiZWw9XCJCcmVhZGNydW1ic1wiXG5cdGNsYXNzPXtjbGFzc2VzLnJvb3QoeyBjbGFzc05hbWUgfSl9XG5cdHtAYXR0YWNoIG5hdmlnYXRpb24uY29udGFpbmVyUmVmZXJlbmNlfVxuXHR7Li4uYXR0YWNobWVudHN9XG4+XG5cdDxvbCBjbGFzcz1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlclwiPlxuXHRcdHsjZWFjaCBkaXNwbGF5SXRlbXMgYXMgaXRlbSwgaX1cblx0XHRcdDxsaVxuXHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5pdGVtKHtcblx0XHRcdFx0XHRkaXNhYmxlZDogaXRlbS5kaXNhYmxlZCxcblx0XHRcdFx0XHRhY3RpdmU6IGl0ZW0uYWN0aXZlXG5cdFx0XHRcdH0pfVxuXHRcdFx0PlxuXHRcdFx0XHR7I2lmIGl0ZW0ubWVudSAmJiBpdGVtLm1lbnUubGVuZ3RoID4gMH1cblx0XHRcdFx0XHR7I2lmIGVsbGlwc2lzfVxuXHRcdFx0XHRcdFx0e0ByZW5kZXIgZWxsaXBzaXMoaXRlbS5tZW51KX1cblx0XHRcdFx0XHR7OmVsc2V9XG5cdFx0XHRcdFx0XHQ8UG9wdXBNZW51IG1lbnU9e3sgaXRlbXM6IGl0ZW0ubWVudSB9fT5cblx0XHRcdFx0XHRcdFx0eyNzbmlwcGV0IHRyaWdnZXIocG9wb3Zlcil9XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMubGluaygpfVxuXHRcdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggbmF2aWdhdGlvbi5pdGVtUmVmZXJlbmNlfVxuXHRcdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggcG9wb3Zlci5yZWZlcmVuY2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRvbmNsaWNrPXsoZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBvcG92ZXIudG9nZ2xlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxTbG90XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzPVwic3BhblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlbmRlcj17aXRlbS5sYWJlbH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuZWxsaXBzaXMoKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cnM9e3tcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlOiAncHJlc2VudGF0aW9uJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYXJpYS1oaWRkZW4nOiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XG5cdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwic3Itb25seVwiPk1vcmU8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L1Nsb3Q+XG5cdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdHsvc25pcHBldH1cblx0XHRcdFx0XHRcdDwvUG9wdXBNZW51PlxuXHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0XHQ8c3ZlbHRlOmVsZW1lbnRcblx0XHRcdFx0XHRcdHRoaXM9e2l0ZW0uYWN0aXZlID8gJ3NwYW4nIDogaXRlbS5ocmVmID8gJ2EnIDogJ2J1dHRvbid9XG5cdFx0XHRcdFx0XHRyb2xlPXtpdGVtLmFjdGl2ZSA/ICdsaW5rJyA6IGl0ZW0uaHJlZiA/ICdsaW5rJyA6ICdidXR0b24nfVxuXHRcdFx0XHRcdFx0b25jbGljaz17aXRlbS5vbkNsaWNrfVxuXHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMubGluayh7IGRpc2FibGVkOiBpdGVtLmRpc2FibGVkLCBhY3RpdmU6IGl0ZW0uYWN0aXZlIH0pfVxuXHRcdFx0XHRcdFx0aHJlZj17aXRlbS5ocmVmfVxuXHRcdFx0XHRcdFx0YXJpYS1kaXNhYmxlZD17aXRlbS5kaXNhYmxlZCB8fCBpdGVtLmFjdGl2ZX1cblx0XHRcdFx0XHRcdGFyaWEtY3VycmVudD17aXRlbS5hY3RpdmUgPyAncGFnZScgOiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0XHRkYXRhLWRpc2FibGVkPXtpdGVtLmRpc2FibGVkIHx8IGl0ZW0uYWN0aXZlfVxuXHRcdFx0XHRcdFx0e0BhdHRhY2ggbmF2aWdhdGlvbi5pdGVtUmVmZXJlbmNlfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHsjaWYgaXRlbVNsb3R9XG5cdFx0XHRcdFx0XHRcdHtAcmVuZGVyIGl0ZW1TbG90KGl0ZW0pfVxuXHRcdFx0XHRcdFx0ezplbHNlfVxuXHRcdFx0XHRcdFx0XHR7I2lmIGl0ZW0uaWNvbn1cblx0XHRcdFx0XHRcdFx0XHQ8U2xvdCByZW5kZXI9e2l0ZW0uaWNvbn0gY2xhc3M9e2NsYXNzZXMuaWNvbih7IHNpemU6ICdub3JtYWwnIH0pfSAvPlxuXHRcdFx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdFx0XHQ8U2xvdCByZW5kZXI9e2l0ZW0ubGFiZWx9IC8+XG5cdFx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdDwvc3ZlbHRlOmVsZW1lbnQ+XG5cdFx0XHRcdHsvaWZ9XG5cdFx0XHQ8L2xpPlxuXHRcdFx0eyNpZiBpIDwgZGlzcGxheUl0ZW1zLmxlbmd0aCAtIDEgJiYgc2hvd1NlcGFyYXRvcn1cblx0XHRcdFx0PFNsb3Rcblx0XHRcdFx0XHRhcz1cImxpXCJcblx0XHRcdFx0XHRhdHRycz17eyByb2xlOiAncHJlc2VudGF0aW9uJywgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9fVxuXHRcdFx0XHRcdHJlbmRlcj17c2VwYXJhdG9yIHx8IGNhcmV0UmlnaHRJY29uLndpdGhQcm9wcyh7IHNpemU6IDE2IH0pfVxuXHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnNlcGFyYXRvcigpfVxuXHRcdFx0XHQvPlxuXHRcdFx0ey9pZn1cblx0XHR7L2VhY2h9XG5cdDwvb2w+XG48L25hdj5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuc3ZlbHRlIn0=