import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarPanel.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarPanel[$.FILENAME] = 'src/lib/components/Sidebar/SidebarPanel.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { magnifyingGlassIcon } from "/src/lib/components/Icons/magnifyingGlass.ts";
import { useI18n } from "/src/lib/i18n/context.svelte.ts?t=1783864665558";
import SidebarGroupComponent from "/src/lib/components/Sidebar/SidebarGroup.svelte?t=1783864665558";
import SidebarIcon from "/src/lib/components/Sidebar/SidebarIcon.svelte";
import SidebarMenuButton from "/src/lib/components/Sidebar/SidebarMenuButton.svelte?t=1783864665558";
import SidebarMenuList from "/src/lib/components/Sidebar/SidebarMenuList.svelte?t=1783864665558";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<form data-slot="sidebar-search" class="relative px-2"><input/> <!></form>`), SidebarPanel[$.FILENAME], [[66, 3, [[71, 4]]]]);
var root_1 = $.add_locations($.from_html(`<div data-slot="sidebar-header" data-sidebar="header"><!> <!> <!> <!></div>`), SidebarPanel[$.FILENAME], [[55, 1]]);
var root_2 = $.add_locations($.from_html(`<div data-slot="sidebar-separator" data-sidebar="separator"></div>`), SidebarPanel[$.FILENAME], [[96, 4]]);
var root_3 = $.add_locations($.from_html(`<!> <!>`, 1), SidebarPanel[$.FILENAME], []);
var root_4 = $.add_locations($.from_html(`<div data-slot="sidebar-footer" data-sidebar="footer"><!> <!> <!></div>`), SidebarPanel[$.FILENAME], [[108, 1]]);
var root_5 = $.add_locations($.from_html(`<!> <div data-slot="sidebar-nav" data-sidebar="nav"><!></div> <!>`, 1), SidebarPanel[$.FILENAME], [[90, 0]]);

function SidebarPanel($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarPanel);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const t = $.tag($.derived(useI18n), 't');
	const collapsed = $.tag($.derived(() => $.strict_equals($$props.api.displayState, 'collapsed') && !$$props.api.isMobile), 'collapsed');
	var $$exports = { ...$.legacy_api() };
	var fragment = root_5();
	var node = $.first_child(fragment);

	{
		var consequent_4 = ($$anchor) => {
			var div = root_1();
			var node_1 = $.child(div);

			{
				var consequent = ($$anchor) => {
					var fragment_1 = $.comment();
					var node_2 = $.first_child(fragment_1);

					$.add_svelte_meta(
						() => SidebarMenuButton(node_2, $.spread_props(() => $$props.headerButton, {
							get isMobile() {
								return $$props.api.isMobile;
							},
							defaultAlign: 'start',
							get collapsed() {
								return $.get(collapsed);
							},

							get theme() {
								return $$props.theme;
							}
						})),
						'component',
						SidebarPanel,
						57,
						3,
						{ componentTag: 'SidebarMenuButton' }
					);

					$.append($$anchor, fragment_1);
				};

				$.add_svelte_meta(
					() => $.if(node_1, ($$render) => {
						if ($$props.headerButton) $$render(consequent);
					}),
					'if',
					SidebarPanel,
					56,
					2
				);
			}

			var node_3 = $.sibling(node_1, 2);

			{
				var consequent_1 = ($$anchor) => {
					var form = root();
					var input = $.child(form);

					$.remove_input_defaults(input);

					var node_4 = $.sibling(input, 2);

					{
						let $0 = $.derived(() => $.get(classes).searchIcon());

						$.add_svelte_meta(
							() => SidebarIcon(node_4, {
								get icon() {
									return magnifyingGlassIcon;
								},

								get class() {
									return $.get($0);
								}
							}),
							'component',
							SidebarPanel,
							78,
							4,
							{ componentTag: 'SidebarIcon' }
						);
					}

					$.reset(form);

					$.template_effect(
						($0) => {
							$.set_attribute(input, 'placeholder', $$props.search.placeholder);
							$.set_attribute(input, 'aria-label', $$props.search.label ?? $.get(t).search);
							$.set_value(input, $$props.search.value);
							$.set_class(input, 1, $0);
						},
						[
							() => $.clsx($.get(classes).search({ className: $$props.search.class }))
						]
					);

					$.event('submit', form, function submit(event) {
						return event.preventDefault();
					});

					$.delegated('input', input, function (...$$args) {
						$.apply(() => $$props.search.onInput, this, $$args, SidebarPanel, [75, 14]);
					});

					$.append($$anchor, form);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if ($$props.search && !$.get(collapsed)) $$render(consequent_1);
					}),
					'if',
					SidebarPanel,
					65,
					2
				);
			}

			var node_5 = $.sibling(node_3, 2);

			{
				var consequent_2 = ($$anchor) => {
					var fragment_2 = $.comment();
					var node_6 = $.first_child(fragment_2);

					$.add_svelte_meta(
						() => SidebarMenuList(node_6, {
							get items() {
								return $$props.headerMenu;
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
						SidebarPanel,
						82,
						3,
						{ componentTag: 'SidebarMenuList' }
					);

					$.append($$anchor, fragment_2);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if ($$props.headerMenu) $$render(consequent_2);
					}),
					'if',
					SidebarPanel,
					81,
					2
				);
			}

			var node_7 = $.sibling(node_5, 2);

			{
				var consequent_3 = ($$anchor) => {
					var fragment_3 = $.comment();
					var node_8 = $.first_child(fragment_3);

					$.add_svelte_meta(() => $.snippet(node_8, () => $$props.header, () => $$props.api), 'render', SidebarPanel, 85, 3);
					$.append($$anchor, fragment_3);
				};

				$.add_svelte_meta(
					() => $.if(node_7, ($$render) => {
						if ($$props.header) $$render(consequent_3);
					}),
					'if',
					SidebarPanel,
					84,
					2
				);
			}

			$.reset(div);
			$.template_effect(($0) => $.set_class(div, 1, $0), [() => $.clsx($.get(classes).header())]);
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.headerButton || $$props.search || $$props.headerMenu || $$props.header) $$render(consequent_4);
			}),
			'if',
			SidebarPanel,
			54,
			0
		);
	}

	var div_1 = $.sibling(node, 2);
	var node_9 = $.child(div_1);

	{
		var consequent_5 = ($$anchor) => {
			var fragment_4 = $.comment();
			var node_10 = $.first_child(fragment_4);

			$.add_svelte_meta(() => $.snippet(node_10, () => $$props.content, () => $$props.api), 'render', SidebarPanel, 92, 2);
			$.append($$anchor, fragment_4);
		};

		var consequent_7 = ($$anchor) => {
			var fragment_5 = $.comment();
			var node_11 = $.first_child(fragment_5);

			$.add_svelte_meta(
				() => $.each(node_11, 19, () => $$props.items, (group, index) => group.label ?? `group-${index}`, ($$anchor, group, index) => {
					var fragment_6 = root_3();
					var node_12 = $.first_child(fragment_6);

					{
						var consequent_6 = ($$anchor) => {
							var div_2 = root_2();

							$.template_effect(($0) => $.set_class(div_2, 1, $0), [() => $.clsx($.get(classes).separator())]);
							$.append($$anchor, div_2);
						};

						$.add_svelte_meta(
							() => $.if(node_12, ($$render) => {
								if ($.get(group).separator && $.get(index) > 0) $$render(consequent_6);
							}),
							'if',
							SidebarPanel,
							95,
							3
						);
					}

					var node_13 = $.sibling(node_12, 2);

					$.add_svelte_meta(
						() => SidebarGroupComponent(node_13, {
							get group() {
								return $.get(group);
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
						SidebarPanel,
						102,
						3,
						{ componentTag: 'SidebarGroupComponent' }
					);

					$.append($$anchor, fragment_6);
				}),
				'each',
				SidebarPanel,
				94,
				2
			);

			$.append($$anchor, fragment_5);
		};

		$.add_svelte_meta(
			() => $.if(node_9, ($$render) => {
				if ($$props.content) $$render(consequent_5); else if ($$props.items) $$render(consequent_7, 1);
			}),
			'if',
			SidebarPanel,
			91,
			1
		);
	}

	$.reset(div_1);

	var node_14 = $.sibling(div_1, 2);

	{
		var consequent_11 = ($$anchor) => {
			var div_3 = root_4();
			var node_15 = $.child(div_3);

			{
				var consequent_8 = ($$anchor) => {
					var fragment_7 = $.comment();
					var node_16 = $.first_child(fragment_7);

					$.add_svelte_meta(
						() => SidebarMenuButton(node_16, $.spread_props(() => $$props.footerButton, {
							get isMobile() {
								return $$props.api.isMobile;
							},
							defaultAlign: 'end',
							get collapsed() {
								return $.get(collapsed);
							},

							get theme() {
								return $$props.theme;
							}
						})),
						'component',
						SidebarPanel,
						110,
						3,
						{ componentTag: 'SidebarMenuButton' }
					);

					$.append($$anchor, fragment_7);
				};

				$.add_svelte_meta(
					() => $.if(node_15, ($$render) => {
						if ($$props.footerButton) $$render(consequent_8);
					}),
					'if',
					SidebarPanel,
					109,
					2
				);
			}

			var node_17 = $.sibling(node_15, 2);

			{
				var consequent_9 = ($$anchor) => {
					var fragment_8 = $.comment();
					var node_18 = $.first_child(fragment_8);

					$.add_svelte_meta(
						() => SidebarMenuList(node_18, {
							get items() {
								return $$props.footerMenu;
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
						SidebarPanel,
						119,
						3,
						{ componentTag: 'SidebarMenuList' }
					);

					$.append($$anchor, fragment_8);
				};

				$.add_svelte_meta(
					() => $.if(node_17, ($$render) => {
						if ($$props.footerMenu) $$render(consequent_9);
					}),
					'if',
					SidebarPanel,
					118,
					2
				);
			}

			var node_19 = $.sibling(node_17, 2);

			{
				var consequent_10 = ($$anchor) => {
					var fragment_9 = $.comment();
					var node_20 = $.first_child(fragment_9);

					$.add_svelte_meta(() => $.snippet(node_20, () => $$props.footer, () => $$props.api), 'render', SidebarPanel, 122, 3);
					$.append($$anchor, fragment_9);
				};

				$.add_svelte_meta(
					() => $.if(node_19, ($$render) => {
						if ($$props.footer) $$render(consequent_10);
					}),
					'if',
					SidebarPanel,
					121,
					2
				);
			}

			$.reset(div_3);
			$.template_effect(($0) => $.set_class(div_3, 1, $0), [() => $.clsx($.get(classes).footer())]);
			$.append($$anchor, div_3);
		};

		$.add_svelte_meta(
			() => $.if(node_14, ($$render) => {
				if ($$props.footerButton || $$props.footerMenu || $$props.footer) $$render(consequent_11);
			}),
			'if',
			SidebarPanel,
			107,
			0
		);
	}

	$.template_effect(($0) => $.set_class(div_1, 1, $0), [() => $.clsx($.get(classes).nav())]);
	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarPanel = $.hmr(SidebarPanel);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarPanel[$.HMR].update(module.default);
	});
}

export default SidebarPanel;

$.delegate(['input']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLG1CQUFtQixRQUFRLDBDQUEwQztBQUM5RSxPQUFPLEVBQUUsT0FBTyxRQUFRLDZCQUE2QjtBQVVyRCxPQUFPLHFCQUFxQixNQUFNLHVCQUF1QjtBQUN6RCxPQUFPLFdBQVcsTUFBTSxzQkFBc0I7QUFDOUMsT0FBTyxpQkFBaUIsTUFBTSw0QkFBNEI7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU8sRUFBRSxlQUFlLFFBQWdDLG9CQUFvQjs7Ozs7Ozs7O3lDQWhCN0UsQ0FBQzs7OztDQWdEQSxNQUFNLE9BQU8seUJBQVksZUFBZTtDQUN4QyxNQUFNLENBQUMsbUJBQVksT0FBTztDQUMxQixNQUFNLFNBQVMscURBQWdCLFlBQVksRUFBSyxXQUFXLGtCQUFTLFFBQVE7Ozs7Ozs7T0FJM0UsR0FBRzt3QkFBSCxHQUFHOzs7Ozs7OztZQUVEOzsyQkFFYyxRQUFROzs7O3FCQUVyQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUtWO1NBS0MsZ0JBTEQ7OzZCQUtDOzs0QkFBQTs7O3FDQU84QyxPQUFPLEVBQUMsVUFBVTs7O2FBQWhFLFdBQVc7O2dCQUFPLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7O2FBWnRDOzs7O3VCQUtDLHFDQUNvQixXQUFXO3VCQUQvQixvQ0FFbUIsS0FBSyxVQUFJLENBQUMsRUFBQyxNQUFNO21CQUZwQyxzQkFHYyxLQUFLO21CQUhuQjs7OzBCQUtPLE9BQU8sRUFBQyxNQUFNLEdBQUcsU0FBUyxpQkFBUyxLQUFLOzs7O3VCQVZoRCxzQkFHVyxLQUFLO2FBQUssS0FBSyxDQUFDLGNBQWM7OzswQkFFeEM7bUNBSWdCLE9BQU87Ozt3QkFUeEI7Ozs7O21DQURjLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJ2QixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBM0JqQixHQUFHO3lDQUFILEdBQUcsOEJBQXlELE9BQU8sRUFBQyxNQUFNO3NCQUExRSxHQUFHOzs7Ozs7Ozs7Ozs7OztLQW1DSixLQUFHO3NCQUFILEtBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7b0RBSWMsS0FBSyxZQUFTLEtBQUssQ0FBQyxLQUFLLGFBQWEsS0FBSyxlQUEzQyxLQUFLOzs7Ozs7V0FFbEI7OzZDQUFBLG1DQUdPLE9BQU8sRUFBQyxTQUFTOzBCQUh4Qjs7Ozs7a0JBREcsS0FBSyxFQUFDLFNBQVMsVUFBSSxLQUFLLElBQUcsQ0FBQzs7Ozs7Ozs7Ozs7O1lBT2hDLHFCQUFxQjs7cUJBQUUsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBWi9CLEtBQUc7O3lCQUFILEtBQUc7Ozs7T0FrQkYsS0FBRzt5QkFBSCxLQUFHOzs7Ozs7OztZQUVEOzsyQkFFYyxRQUFROzs7O3FCQUVyQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLVixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBWGpCLEtBQUc7eUNBQUgsS0FBRyw4QkFBeUQsT0FBTyxFQUFDLE1BQU07c0JBQTFFLEtBQUc7Ozs7Ozs7Ozs7Ozs7O3VDQWxCSixLQUFHLDhCQUFtRCxPQUFPLEVBQUMsR0FBRzs7OztBQXRDMUQiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXJQYW5lbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgbWFnbmlmeWluZ0dsYXNzSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9tYWduaWZ5aW5nR2xhc3MuanMnO1xuXHRpbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnJGxpYi9pMThuL2NvbnRleHQuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHR5cGUge1xuXHRcdFNpZGViYXJBcGksXG5cdFx0U2lkZWJhckNvbGxhcHNlSWNvbixcblx0XHRTaWRlYmFyR3JvdXAsXG5cdFx0U2lkZWJhck1lbnVCdXR0b25JdGVtLFxuXHRcdFNpZGViYXJNZW51RW50cnksXG5cdFx0U2lkZWJhclNlYXJjaCxcblx0XHRTaWRlYmFyVG9vbHRpcE1vZGVcblx0fSBmcm9tICcuL3NpZGViYXIucHJvcHMuanMnO1xuXHRpbXBvcnQgU2lkZWJhckdyb3VwQ29tcG9uZW50IGZyb20gJy4vU2lkZWJhckdyb3VwLnN2ZWx0ZSc7XG5cdGltcG9ydCBTaWRlYmFySWNvbiBmcm9tICcuL1NpZGViYXJJY29uLnN2ZWx0ZSc7XG5cdGltcG9ydCBTaWRlYmFyTWVudUJ1dHRvbiBmcm9tICcuL1NpZGViYXJNZW51QnV0dG9uLnN2ZWx0ZSc7XG5cdGltcG9ydCBTaWRlYmFyTWVudUxpc3QgZnJvbSAnLi9TaWRlYmFyTWVudUxpc3Quc3ZlbHRlJztcblx0aW1wb3J0IHsgdXNlU2lkZWJhclRoZW1lLCB0eXBlIFNpZGViYXJUaGVtZVByb3BzIH0gZnJvbSAnLi9zaWRlYmFyLnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdGFwaSxcblx0XHRpdGVtcyxcblx0XHRoZWFkZXJCdXR0b24sXG5cdFx0c2VhcmNoLFxuXHRcdGhlYWRlck1lbnUsXG5cdFx0aGVhZGVyLFxuXHRcdGNvbnRlbnQsXG5cdFx0Zm9vdGVyQnV0dG9uLFxuXHRcdGZvb3Rlck1lbnUsXG5cdFx0Zm9vdGVyLFxuXHRcdGNvbGxhcHNlSWNvbixcblx0XHR0b29sdGlwcyxcblx0XHR0aGVtZVxuXHR9OiB7XG5cdFx0YXBpOiBTaWRlYmFyQXBpO1xuXHRcdGl0ZW1zPzogU2lkZWJhckdyb3VwW107XG5cdFx0aGVhZGVyQnV0dG9uPzogU2lkZWJhck1lbnVCdXR0b25JdGVtO1xuXHRcdHNlYXJjaD86IFNpZGViYXJTZWFyY2g7XG5cdFx0aGVhZGVyTWVudT86IFNpZGViYXJNZW51RW50cnlbXTtcblx0XHRoZWFkZXI/OiBpbXBvcnQoJ3N2ZWx0ZScpLlNuaXBwZXQ8W1NpZGViYXJBcGldPjtcblx0XHRjb250ZW50PzogaW1wb3J0KCdzdmVsdGUnKS5TbmlwcGV0PFtTaWRlYmFyQXBpXT47XG5cdFx0Zm9vdGVyQnV0dG9uPzogU2lkZWJhck1lbnVCdXR0b25JdGVtO1xuXHRcdGZvb3Rlck1lbnU/OiBTaWRlYmFyTWVudUVudHJ5W107XG5cdFx0Zm9vdGVyPzogaW1wb3J0KCdzdmVsdGUnKS5TbmlwcGV0PFtTaWRlYmFyQXBpXT47XG5cdFx0Y29sbGFwc2VJY29uOiBTaWRlYmFyQ29sbGFwc2VJY29uO1xuXHRcdHRvb2x0aXBzOiBTaWRlYmFyVG9vbHRpcE1vZGU7XG5cdFx0dGhlbWU/OiBTaWRlYmFyVGhlbWVQcm9wcztcblx0fSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VTaWRlYmFyVGhlbWUodGhlbWUpKTtcblx0Y29uc3QgdCA9ICRkZXJpdmVkKHVzZUkxOG4oKSk7XG5cdGNvbnN0IGNvbGxhcHNlZCA9ICRkZXJpdmVkKGFwaS5kaXNwbGF5U3RhdGUgPT09ICdjb2xsYXBzZWQnICYmICFhcGkuaXNNb2JpbGUpO1xuPC9zY3JpcHQ+XG5cbnsjaWYgaGVhZGVyQnV0dG9uIHx8IHNlYXJjaCB8fCBoZWFkZXJNZW51IHx8IGhlYWRlcn1cblx0PGRpdiBkYXRhLXNsb3Q9XCJzaWRlYmFyLWhlYWRlclwiIGRhdGEtc2lkZWJhcj1cImhlYWRlclwiIGNsYXNzPXtjbGFzc2VzLmhlYWRlcigpfT5cblx0XHR7I2lmIGhlYWRlckJ1dHRvbn1cblx0XHRcdDxTaWRlYmFyTWVudUJ1dHRvblxuXHRcdFx0XHR7Li4uaGVhZGVyQnV0dG9ufVxuXHRcdFx0XHRpc01vYmlsZT17YXBpLmlzTW9iaWxlfVxuXHRcdFx0XHRkZWZhdWx0QWxpZ249XCJzdGFydFwiXG5cdFx0XHRcdHtjb2xsYXBzZWR9XG5cdFx0XHRcdHt0aGVtZX1cblx0XHRcdC8+XG5cdFx0ey9pZn1cblx0XHR7I2lmIHNlYXJjaCAmJiAhY29sbGFwc2VkfVxuXHRcdFx0PGZvcm1cblx0XHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1zZWFyY2hcIlxuXHRcdFx0XHRjbGFzcz1cInJlbGF0aXZlIHB4LTJcIlxuXHRcdFx0XHRvbnN1Ym1pdD17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuXHRcdFx0PlxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj17c2VhcmNoLnBsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9e3NlYXJjaC5sYWJlbCA/PyB0LnNlYXJjaH1cblx0XHRcdFx0XHR2YWx1ZT17c2VhcmNoLnZhbHVlfVxuXHRcdFx0XHRcdG9uaW5wdXQ9e3NlYXJjaC5vbklucHV0fVxuXHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnNlYXJjaCh7IGNsYXNzTmFtZTogc2VhcmNoLmNsYXNzIH0pfVxuXHRcdFx0XHQvPlxuXHRcdFx0XHQ8U2lkZWJhckljb24gaWNvbj17bWFnbmlmeWluZ0dsYXNzSWNvbn0gY2xhc3M9e2NsYXNzZXMuc2VhcmNoSWNvbigpfSAvPlxuXHRcdFx0PC9mb3JtPlxuXHRcdHsvaWZ9XG5cdFx0eyNpZiBoZWFkZXJNZW51fVxuXHRcdFx0PFNpZGViYXJNZW51TGlzdCBpdGVtcz17aGVhZGVyTWVudX0ge2FwaX0ge2NvbGxhcHNlSWNvbn0ge3Rvb2x0aXBzfSB7dGhlbWV9IC8+XG5cdFx0ey9pZn1cblx0XHR7I2lmIGhlYWRlcn1cblx0XHRcdHtAcmVuZGVyIGhlYWRlcihhcGkpfVxuXHRcdHsvaWZ9XG5cdDwvZGl2Plxuey9pZn1cblxuPGRpdiBkYXRhLXNsb3Q9XCJzaWRlYmFyLW5hdlwiIGRhdGEtc2lkZWJhcj1cIm5hdlwiIGNsYXNzPXtjbGFzc2VzLm5hdigpfT5cblx0eyNpZiBjb250ZW50fVxuXHRcdHtAcmVuZGVyIGNvbnRlbnQoYXBpKX1cblx0ezplbHNlIGlmIGl0ZW1zfVxuXHRcdHsjZWFjaCBpdGVtcyBhcyBncm91cCwgaW5kZXggKGdyb3VwLmxhYmVsID8/IGBncm91cC0ke2luZGV4fWApfVxuXHRcdFx0eyNpZiBncm91cC5zZXBhcmF0b3IgJiYgaW5kZXggPiAwfVxuXHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1zZXBhcmF0b3JcIlxuXHRcdFx0XHRcdGRhdGEtc2lkZWJhcj1cInNlcGFyYXRvclwiXG5cdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuc2VwYXJhdG9yKCl9XG5cdFx0XHRcdD48L2Rpdj5cblx0XHRcdHsvaWZ9XG5cdFx0XHQ8U2lkZWJhckdyb3VwQ29tcG9uZW50IHtncm91cH0ge2FwaX0ge2NvbGxhcHNlSWNvbn0ge3Rvb2x0aXBzfSB7dGhlbWV9IC8+XG5cdFx0ey9lYWNofVxuXHR7L2lmfVxuPC9kaXY+XG5cbnsjaWYgZm9vdGVyQnV0dG9uIHx8IGZvb3Rlck1lbnUgfHwgZm9vdGVyfVxuXHQ8ZGl2IGRhdGEtc2xvdD1cInNpZGViYXItZm9vdGVyXCIgZGF0YS1zaWRlYmFyPVwiZm9vdGVyXCIgY2xhc3M9e2NsYXNzZXMuZm9vdGVyKCl9PlxuXHRcdHsjaWYgZm9vdGVyQnV0dG9ufVxuXHRcdFx0PFNpZGViYXJNZW51QnV0dG9uXG5cdFx0XHRcdHsuLi5mb290ZXJCdXR0b259XG5cdFx0XHRcdGlzTW9iaWxlPXthcGkuaXNNb2JpbGV9XG5cdFx0XHRcdGRlZmF1bHRBbGlnbj1cImVuZFwiXG5cdFx0XHRcdHtjb2xsYXBzZWR9XG5cdFx0XHRcdHt0aGVtZX1cblx0XHRcdC8+XG5cdFx0ey9pZn1cblx0XHR7I2lmIGZvb3Rlck1lbnV9XG5cdFx0XHQ8U2lkZWJhck1lbnVMaXN0IGl0ZW1zPXtmb290ZXJNZW51fSB7YXBpfSB7Y29sbGFwc2VJY29ufSB7dG9vbHRpcHN9IHt0aGVtZX0gLz5cblx0XHR7L2lmfVxuXHRcdHsjaWYgZm9vdGVyfVxuXHRcdFx0e0ByZW5kZXIgZm9vdGVyKGFwaSl9XG5cdFx0ey9pZn1cblx0PC9kaXY+XG57L2lmfVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9TaWRlYmFyL1NpZGViYXJQYW5lbC5zdmVsdGUifQ==