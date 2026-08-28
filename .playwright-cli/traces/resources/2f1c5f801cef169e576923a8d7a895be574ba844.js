import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/+layout.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

_layout[$.FILENAME] = 'src/routes/+layout.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import "/src/app.css?t=1783864689520";
import { page } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/app/state/index.js?v=1b1d2797";
import { AppShell } from "/src/lib/components/AppShell/index.ts?t=1783864665558";
import { Button } from "/src/lib/components/Button/index.ts";
import Confirmation from "/src/lib/components/Confirmation/Confirmation.svelte";
import { commandIcon } from "/src/lib/components/Icons/command.ts";
import { sidebarSimpleIcon } from "/src/lib/components/Icons/sidebarSimple.ts";
import { NetworkIndicator } from "/src/lib/components/NetworkIndicator/index.ts";
import Theme from "/src/lib/components/Theme/Theme.svelte";
import { getSidebarGroups, headerLinks } from "/src/routes/appNavigation.ts";
import SidebarCommandPalette from "/src/routes/SidebarCommandPalette.svelte";

const headerLink = $.wrap_snippet(_layout, function ($$anchor, $$arg0) {
	$.validate_snippet_args(...arguments);

	let href = () => ($$arg0?.()).href;

	href();

	let text = () => ($$arg0?.()).text;

	text();

	const isActive = $.tag($.derived(() => $.strict_equals(page.route.id, href())), 'isActive');

	$.get(isActive);

	var a = root();
	var text_1 = $.child(a, true);

	$.reset(a);

	$.template_effect(() => {
		$.set_attribute(a, 'href', href());
		$.set_class(a, 1, `rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-background-muted hover:text-foreground ${$.get(isActive) ? 'bg-primary/15 text-primary' : ''}`);
		$.set_text(text_1, text());
	});

	$.append($$anchor, a);
});

var root = $.add_locations($.from_html(`<a> </a>`), _layout[$.FILENAME], [[93, 1]]);

var root_1 = $.add_locations($.from_html(`<div class="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2"><div class="flex min-w-0 flex-wrap items-center gap-1.5"><span class="mr-1 text-xs font-medium text-foreground-muted">Variant</span> <div class="flex flex-wrap items-center gap-1" role="group" aria-label="Sidebar variant"></div></div> <div class="flex min-w-0 flex-wrap items-center gap-1.5"><span class="mr-1 text-xs font-medium text-foreground-muted">State</span> <div class="flex flex-wrap items-center gap-1" role="group" aria-label="Sidebar state"></div></div></div>`), _layout[$.FILENAME], [
	[
		104,
		1,
		[
			[105, 2, [[106, 3], [107, 3]]],
			[120, 2, [[121, 3], [122, 3]]]
		]
	]
]);

var root_2 = $.add_locations($.from_html(`<div class="flex min-h-12 items-center justify-between gap-3 px-3 py-2 sm:px-4"><div class="flex min-w-0 items-center gap-2"><!> <nav aria-label="Primary" class="flex min-w-0 flex-wrap items-center gap-1"></nav></div> <!></div>`), _layout[$.FILENAME], [[149, 4, [[150, 5, [[160, 6]]]]]]);
var root_3 = $.add_locations($.from_html(`<!> <!> <!>`, 1), _layout[$.FILENAME], []);

function _layout($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, _layout);

	const shellFooter = $.wrap_snippet(_layout, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var div = root_1();
		var div_1 = $.child(div);
		var div_2 = $.sibling($.child(div_1), 2);

		$.add_svelte_meta(
			() => $.each(div_2, 21, () => sidebarVariants, $.index, ($$anchor, variant) => {
				var fragment = $.comment();
				var node = $.first_child(fragment);

				{
					let $0 = $.derived(() => $.strict_equals($.get(sidebarVariant), $.get(variant)) ? 'solid' : 'ghost');

					$.add_svelte_meta(
						() => Button(node, {
							get variant() {
								return $.get($0);
							},
							size: 'small',
							onClick: () => $.set(sidebarVariant, $.get(variant), true),
							children: $.wrap_snippet(_layout, ($$anchor, $$slotProps) => {
								$.next();

								var text_2 = $.text();

								$.template_effect(() => $.set_text(text_2, $.get(variant)));
								$.append($$anchor, text_2);
							}),
							$$slots: { default: true }
						}),
						'component',
						_layout,
						109,
						5,
						{ componentTag: 'Button' }
					);
				}

				$.append($$anchor, fragment);
			}),
			'each',
			_layout,
			108,
			4
		);

		$.reset(div_2);
		$.reset(div_1);

		var div_3 = $.sibling(div_1, 2);
		var div_4 = $.sibling($.child(div_3), 2);

		$.add_svelte_meta(
			() => $.each(div_4, 21, () => sidebarStates, $.index, ($$anchor, state) => {
				var fragment_2 = $.comment();
				var node_1 = $.first_child(fragment_2);

				{
					let $0 = $.derived(() => $.strict_equals($.get(sidebarState), $.get(state)) ? 'solid' : 'ghost');

					$.add_svelte_meta(
						() => Button(node_1, {
							get variant() {
								return $.get($0);
							},
							size: 'small',
							onClick: () => setSidebarState($.get(state)),
							children: $.wrap_snippet(_layout, ($$anchor, $$slotProps) => {
								$.next();

								var text_3 = $.text();

								$.template_effect(() => $.set_text(text_3, $.get(state)));
								$.append($$anchor, text_3);
							}),
							$$slots: { default: true }
						}),
						'component',
						_layout,
						124,
						5,
						{ componentTag: 'Button' }
					);
				}

				$.append($$anchor, fragment_2);
			}),
			'each',
			_layout,
			123,
			4
		);

		$.reset(div_4);
		$.reset(div_3);
		$.reset(div);
		$.append($$anchor, div);
	});

	const sidebarFooter = $.wrap_snippet(_layout, function ($$anchor, api = $.noop) {
		$.validate_snippet_args(...arguments);

		var fragment_4 = $.comment();
		var node_2 = $.first_child(fragment_4);

		{
			let $0 = $.derived(() => $.strict_equals(api().collapsible, 'icon') && $.strict_equals(api().state, 'collapsed') && !api().isMobile);

			$.add_svelte_meta(
				() => SidebarCommandPalette(node_2, {
					get groups() {
						return $.get(sidebarGroups);
					},

					get collapsed() {
						return $.get($0);
					}
				}),
				'component',
				_layout,
				138,
				1,
				{ componentTag: 'SidebarCommandPalette' }
			);
		}

		$.append($$anchor, fragment_4);
	});

	const sidebarVariants = ['sidebar', 'floating', 'inset', 'split'];
	const sidebarStates = ['expanded', 'icon', 'hidden'];
	const isPreviewRoute = $.tag($.derived(() => page.route.id?.startsWith('/previews/') ?? false), 'isPreviewRoute');
	let sidebarDisplayState = $.tag($.state('expanded'), 'sidebarDisplayState');
	let sidebarVariant = $.tag($.state('split'), 'sidebarVariant');
	let sidebarCollapsedDisplayState = $.tag($.state('hidden'), 'sidebarCollapsedDisplayState');
	let sidebarWidth = $.tag($.state('16rem'), 'sidebarWidth');
	const sidebarGroups = $.tag($.derived(() => getSidebarGroups(page.route.id)), 'sidebarGroups');
	const sidebarState = $.tag($.derived(() => $.strict_equals($.get(sidebarDisplayState), 'collapsed') ? 'icon' : $.get(sidebarDisplayState)), 'sidebarState');
	const sidebarCollapsible = $.tag($.derived(() => $.strict_equals($.get(sidebarCollapsedDisplayState), 'hidden') ? 'offcanvas' : 'icon'), 'sidebarCollapsible');

	function setSidebarState(nextState) {
		if ($.strict_equals(nextState, 'expanded')) {
			$.set(sidebarDisplayState, 'expanded');

			return;
		}

		const nextDisplayState = $.strict_equals(nextState, 'icon') ? 'collapsed' : 'hidden';

		$.set(sidebarCollapsedDisplayState, nextDisplayState, true);
		$.set(sidebarDisplayState, nextDisplayState, true);
	}

	function handleSidebarDisplayStateChange(nextDisplayState) {
		$.set(sidebarDisplayState, nextDisplayState, true);

		if ($.strict_equals(nextDisplayState, 'expanded', false)) {
			$.set(sidebarCollapsedDisplayState, nextDisplayState, true);
		}
	}

	const sidebar = $.tag(
		$.derived(() => ({
			displayState: $.get(sidebarDisplayState),
			onDisplayStateChange: handleSidebarDisplayStateChange,
			variant: $.get(sidebarVariant),
			collapsible: $.get(sidebarCollapsible),
			rail: true,
			edgeReveal: true,
			width: $.get(sidebarWidth),
			widthMobile: '18rem',
			resizable: {
				minWidth: '12rem',
				maxWidth: '24rem',
				collapseThreshold: '10.5rem',
				storageKey: 'svelai-docs-sidebar-width',
				onWidthChange: (nextWidth) => {
					$.set(sidebarWidth, nextWidth, true);
				}
			},
			items: $.get(sidebarGroups),
			headerButton: { icon: commandIcon, title: 'Svelai', subtitle: 'Components' },
			footer: sidebarFooter
		})),
		'sidebar'
	);

	var $$exports = { ...$.legacy_api() };
	var fragment_5 = $.comment();
	var node_3 = $.first_child(fragment_5);

	{
		const children = $.wrap_snippet(_layout, function ($$anchor, theme = $.noop) {
			$.validate_snippet_args(...arguments);

			var fragment_6 = $.comment();
			var node_4 = $.first_child(fragment_6);

			{
				var consequent = ($$anchor) => {
					var fragment_7 = $.comment();
					var node_5 = $.first_child(fragment_7);

					$.add_svelte_meta(() => $.snippet(node_5, () => $$props.children), 'render', _layout, 146, 3);
					$.append($$anchor, fragment_7);
				};

				var alternate = ($$anchor) => {
					const shellHeader = $.wrap_snippet(_layout, function ($$anchor, $$arg0) {
						$.validate_snippet_args(...arguments);

						let sidebar = () => ($$arg0?.()).sidebar;

						sidebar();

						var div_5 = root_2();
						var div_6 = $.child(div_5);
						var node_6 = $.child(div_6);

						$.add_svelte_meta(
							() => Button(node_6, {
								get prefix() {
									return sidebarSimpleIcon;
								},
								label: 'Toggle sidebar',
								variant: 'ghost',
								size: 'small',
								squared: true,
								class: 'md:hidden',
								onClick: () => sidebar().toggle()
							}),
							'component',
							_layout,
							151,
							6,
							{ componentTag: 'Button' }
						);

						var nav = $.sibling(node_6, 2);

						$.add_svelte_meta(
							() => $.each(nav, 21, () => headerLinks, $.index, ($$anchor, link) => {
								$.add_svelte_meta(() => headerLink($$anchor, () => $.get(link)), 'render', _layout, 162, 8);
							}),
							'each',
							_layout,
							161,
							7
						);

						$.reset(nav);
						$.reset(div_6);

						var node_7 = $.sibling(div_6, 2);

						$.add_svelte_meta(
							() => Button(node_7, {
								variant: 'outline',
								size: 'small',
								onClick: () => theme().theme = $.strict_equals(theme().resolvedTheme, 'dark') ? 'light' : 'dark',
								children: $.wrap_snippet(_layout, ($$anchor, $$slotProps) => {
									$.next();

									var text_4 = $.text();

									$.template_effect(() => $.set_text(text_4, $.strict_equals(theme().resolvedTheme, 'dark') ? 'Light' : 'Dark'));
									$.append($$anchor, text_4);
								}),
								$$slots: { default: true }
							}),
							'component',
							_layout,
							166,
							5,
							{ componentTag: 'Button' }
						);

						$.reset(div_5);
						$.append($$anchor, div_5);
					});

					var fragment_10 = root_3();
					var node_8 = $.first_child(fragment_10);

					$.add_svelte_meta(() => NetworkIndicator(node_8, { color: 'danger' }), 'component', _layout, 176, 3, { componentTag: 'NetworkIndicator' });

					var node_9 = $.sibling(node_8, 2);

					$.add_svelte_meta(() => Confirmation(node_9, {}), 'component', _layout, 177, 3, { componentTag: 'Confirmation' });

					var node_10 = $.sibling(node_9, 2);

					{
						const children = $.wrap_snippet(_layout, function ($$anchor) {
							$.validate_snippet_args(...arguments);

							var fragment_11 = $.comment();
							var node_11 = $.first_child(fragment_11);

							$.add_svelte_meta(() => $.snippet(node_11, () => $$props.children), 'render', _layout, 186, 5);
							$.append($$anchor, fragment_11);
						});

						$.add_svelte_meta(
							() => AppShell(node_10, {
								get sidebar() {
									return $.get(sidebar);
								},

								get header() {
									return shellHeader;
								},

								get footer() {
									return shellFooter;
								},
								contentPadding: 'large',
								contentWidth: 'wide',
								children,
								$$slots: { default: true }
							}),
							'component',
							_layout,
							178,
							3,
							{ componentTag: 'AppShell' }
						);
					}

					$.append($$anchor, fragment_10);
				};

				$.add_svelte_meta(
					() => $.if(node_4, ($$render) => {
						if ($.get(isPreviewRoute)) $$render(consequent); else $$render(alternate, -1);
					}),
					'if',
					_layout,
					145,
					2
				);
			}

			$.append($$anchor, fragment_6);
		});

		$.add_svelte_meta(() => Theme(node_3, { children, $$slots: { default: true } }), 'component', _layout, 143, 0, { componentTag: 'Theme' });
	}

	$.append($$anchor, fragment_5);

	return $.pop($$exports);
}

if (import.meta.hot) {
	_layout = $.hmr(_layout);

	import.meta.hot.acceptExports(["default"],(module) => {
		_layout[$.HMR].update(module.default);
	});
}

export default _layout;
//# sourceMappingURL=data:application/json;base64,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OzJCQUNGLEtBQUc7OzthQUNGOztnQkFDUSxpQkFBaUI7Ozs7Ozs7dUJBTVYsT0FBTyxHQUFDLE1BQU07Ozs7Ozs7OztVQUU3QixHQUFHOzs7b0JBQUgsR0FBRyxZQUNJLFdBQVcsc0JBQUksSUFBSTtnQ0FDaEIsVUFBVSx1QkFBQyxJQUFJOzs7Ozs7OztjQUZ6QixHQUFHO2NBVkosS0FBRzs7NkJBQUgsS0FBRzs7O2FBZ0JIOzs7dUJBR2dCLEtBQUssR0FBQyxLQUFLLG1CQUFHLEtBQUssR0FBQyxhQUFhLEVBQUssTUFBTSxJQUFHLE9BQU8sR0FBRyxNQUFNOzs7Ozs7b0VBRTlFLEtBQUssR0FBQyxhQUFhLEVBQUssTUFBTSxJQUFHLE9BQU8sR0FBRyxNQUFNOzs7Ozs7Ozs7Ozs7Y0F0Qm5ELEtBQUc7eUJBQUgsS0FBRzs7Ozs7OzZCQTJCSixnQkFBZ0I7Ozs7NkJBQ2hCLFlBQVk7Ozs7O1lBUUYsUUFBUTs7Ozs7Ozs7Ozs7YUFQbEI7O3NCQUNDLE9BQU87Ozs7Z0JBQ0EsV0FBVzs7OztnQkFDWCxXQUFXOzs7O1FBSVQsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztnQkF4Q2YsY0FBYzs7Ozs7Ozs7Ozs7OzBCQUZwQixLQUFLLFdBQ0ssUUFBUTs7Ozs7O0FBdkRYIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyIrbGF5b3V0LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgJy4uL2FwcC5jc3MnO1xuXHRpbXBvcnQgeyBwYWdlIH0gZnJvbSAnJGFwcC9zdGF0ZSc7XG5cdGltcG9ydCB7XG5cdFx0QXBwU2hlbGwsXG5cdFx0dHlwZSBBcHBTaGVsbEFwaSxcblx0XHR0eXBlIEFwcFNoZWxsU2lkZWJhclByb3BzXG5cdH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0FwcFNoZWxsL2luZGV4LmpzJztcblx0aW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0J1dHRvbi9pbmRleC5qcyc7XG5cdGltcG9ydCBDb25maXJtYXRpb24gZnJvbSAnJGxpYi9jb21wb25lbnRzL0NvbmZpcm1hdGlvbi9Db25maXJtYXRpb24uc3ZlbHRlJztcblx0aW1wb3J0IHsgY29tbWFuZEljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvY29tbWFuZC5qcyc7XG5cdGltcG9ydCB7IHNpZGViYXJTaW1wbGVJY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL3NpZGViYXJTaW1wbGUuanMnO1xuXHRpbXBvcnQgeyBOZXR3b3JrSW5kaWNhdG9yIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL05ldHdvcmtJbmRpY2F0b3IvaW5kZXguanMnO1xuXHRpbXBvcnQgdHlwZSB7XG5cdFx0U2lkZWJhckFwaSxcblx0XHRTaWRlYmFyQ29sbGFwc2libGUsXG5cdFx0U2lkZWJhckRpc3BsYXlTdGF0ZSxcblx0XHRTaWRlYmFyVmFyaWFudFxuXHR9IGZyb20gJyRsaWIvY29tcG9uZW50cy9TaWRlYmFyL2luZGV4LmpzJztcblx0aW1wb3J0IFRoZW1lIGZyb20gJyRsaWIvY29tcG9uZW50cy9UaGVtZS9UaGVtZS5zdmVsdGUnO1xuXHRpbXBvcnQgdHlwZSB7IFRoZW1lU3RhdGUgfSBmcm9tICckbGliL2NvbXBvbmVudHMvVGhlbWUvdGhlbWUuc3RhdGUuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgZ2V0U2lkZWJhckdyb3VwcywgaGVhZGVyTGlua3MgfSBmcm9tICcuL2FwcE5hdmlnYXRpb24uanMnO1xuXHRpbXBvcnQgU2lkZWJhckNvbW1hbmRQYWxldHRlIGZyb20gJy4vU2lkZWJhckNvbW1hbmRQYWxldHRlLnN2ZWx0ZSc7XG5cblx0Y29uc3QgeyBjaGlsZHJlbjogY2hpbGRyZW5TbmlwcGV0IH0gPSAkcHJvcHMoKTtcblxuXHR0eXBlIFNpZGViYXJGb290ZXJTdGF0ZSA9ICdleHBhbmRlZCcgfCAnaWNvbicgfCAnaGlkZGVuJztcblxuXHRjb25zdCBzaWRlYmFyVmFyaWFudHM6IFNpZGViYXJWYXJpYW50W10gPSBbJ3NpZGViYXInLCAnZmxvYXRpbmcnLCAnaW5zZXQnLCAnc3BsaXQnXTtcblx0Y29uc3Qgc2lkZWJhclN0YXRlczogU2lkZWJhckZvb3RlclN0YXRlW10gPSBbJ2V4cGFuZGVkJywgJ2ljb24nLCAnaGlkZGVuJ107XG5cdGNvbnN0IGlzUHJldmlld1JvdXRlID0gJGRlcml2ZWQocGFnZS5yb3V0ZS5pZD8uc3RhcnRzV2l0aCgnL3ByZXZpZXdzLycpID8/IGZhbHNlKTtcblx0bGV0IHNpZGViYXJEaXNwbGF5U3RhdGUgPSAkc3RhdGU8U2lkZWJhckRpc3BsYXlTdGF0ZT4oJ2V4cGFuZGVkJyk7XG5cdGxldCBzaWRlYmFyVmFyaWFudCA9ICRzdGF0ZTxTaWRlYmFyVmFyaWFudD4oJ3NwbGl0Jyk7XG5cdGxldCBzaWRlYmFyQ29sbGFwc2VkRGlzcGxheVN0YXRlID0gJHN0YXRlPEV4Y2x1ZGU8U2lkZWJhckRpc3BsYXlTdGF0ZSwgJ2V4cGFuZGVkJz4+KCdoaWRkZW4nKTtcblx0bGV0IHNpZGViYXJXaWR0aCA9ICRzdGF0ZSgnMTZyZW0nKTtcblxuXHRjb25zdCBzaWRlYmFyR3JvdXBzID0gJGRlcml2ZWQoZ2V0U2lkZWJhckdyb3VwcyhwYWdlLnJvdXRlLmlkKSk7XG5cdGNvbnN0IHNpZGViYXJTdGF0ZSA9ICRkZXJpdmVkPFNpZGViYXJGb290ZXJTdGF0ZT4oXG5cdFx0c2lkZWJhckRpc3BsYXlTdGF0ZSA9PT0gJ2NvbGxhcHNlZCcgPyAnaWNvbicgOiBzaWRlYmFyRGlzcGxheVN0YXRlXG5cdCk7XG5cdGNvbnN0IHNpZGViYXJDb2xsYXBzaWJsZSA9ICRkZXJpdmVkPFNpZGViYXJDb2xsYXBzaWJsZT4oXG5cdFx0c2lkZWJhckNvbGxhcHNlZERpc3BsYXlTdGF0ZSA9PT0gJ2hpZGRlbicgPyAnb2ZmY2FudmFzJyA6ICdpY29uJ1xuXHQpO1xuXG5cdGZ1bmN0aW9uIHNldFNpZGViYXJTdGF0ZShuZXh0U3RhdGU6IFNpZGViYXJGb290ZXJTdGF0ZSkge1xuXHRcdGlmIChuZXh0U3RhdGUgPT09ICdleHBhbmRlZCcpIHtcblx0XHRcdHNpZGViYXJEaXNwbGF5U3RhdGUgPSAnZXhwYW5kZWQnO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5leHREaXNwbGF5U3RhdGUgPSBuZXh0U3RhdGUgPT09ICdpY29uJyA/ICdjb2xsYXBzZWQnIDogJ2hpZGRlbic7XG5cdFx0c2lkZWJhckNvbGxhcHNlZERpc3BsYXlTdGF0ZSA9IG5leHREaXNwbGF5U3RhdGU7XG5cdFx0c2lkZWJhckRpc3BsYXlTdGF0ZSA9IG5leHREaXNwbGF5U3RhdGU7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVTaWRlYmFyRGlzcGxheVN0YXRlQ2hhbmdlKG5leHREaXNwbGF5U3RhdGU6IFNpZGViYXJEaXNwbGF5U3RhdGUpIHtcblx0XHRzaWRlYmFyRGlzcGxheVN0YXRlID0gbmV4dERpc3BsYXlTdGF0ZTtcblx0XHRpZiAobmV4dERpc3BsYXlTdGF0ZSAhPT0gJ2V4cGFuZGVkJykge1xuXHRcdFx0c2lkZWJhckNvbGxhcHNlZERpc3BsYXlTdGF0ZSA9IG5leHREaXNwbGF5U3RhdGU7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3Qgc2lkZWJhciA9ICRkZXJpdmVkPEFwcFNoZWxsU2lkZWJhclByb3BzPih7XG5cdFx0ZGlzcGxheVN0YXRlOiBzaWRlYmFyRGlzcGxheVN0YXRlLFxuXHRcdG9uRGlzcGxheVN0YXRlQ2hhbmdlOiBoYW5kbGVTaWRlYmFyRGlzcGxheVN0YXRlQ2hhbmdlLFxuXHRcdHZhcmlhbnQ6IHNpZGViYXJWYXJpYW50LFxuXHRcdGNvbGxhcHNpYmxlOiBzaWRlYmFyQ29sbGFwc2libGUsXG5cdFx0cmFpbDogdHJ1ZSxcblx0XHRlZGdlUmV2ZWFsOiB0cnVlLFxuXHRcdHdpZHRoOiBzaWRlYmFyV2lkdGgsXG5cdFx0d2lkdGhNb2JpbGU6ICcxOHJlbScsXG5cdFx0cmVzaXphYmxlOiB7XG5cdFx0XHRtaW5XaWR0aDogJzEycmVtJyxcblx0XHRcdG1heFdpZHRoOiAnMjRyZW0nLFxuXHRcdFx0Y29sbGFwc2VUaHJlc2hvbGQ6ICcxMC41cmVtJyxcblx0XHRcdHN0b3JhZ2VLZXk6ICdzdmVsYWktZG9jcy1zaWRlYmFyLXdpZHRoJyxcblx0XHRcdG9uV2lkdGhDaGFuZ2U6IChuZXh0V2lkdGgpID0+IHtcblx0XHRcdFx0c2lkZWJhcldpZHRoID0gbmV4dFdpZHRoO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aXRlbXM6IHNpZGViYXJHcm91cHMsXG5cdFx0aGVhZGVyQnV0dG9uOiB7XG5cdFx0XHRpY29uOiBjb21tYW5kSWNvbixcblx0XHRcdHRpdGxlOiAnU3ZlbGFpJyxcblx0XHRcdHN1YnRpdGxlOiAnQ29tcG9uZW50cydcblx0XHR9LFxuXHRcdGZvb3Rlcjogc2lkZWJhckZvb3RlclxuXHR9KTtcbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgaGVhZGVyTGluayh7IGhyZWYsIHRleHQgfTogeyBocmVmOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9KX1cblx0e0Bjb25zdCBpc0FjdGl2ZSA9IHBhZ2Uucm91dGUuaWQgPT09IGhyZWZ9XG5cdDxhXG5cdFx0e2hyZWZ9XG5cdFx0Y2xhc3M9XCJyb3VuZGVkLW1kIHB4LTIgcHktMSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZm9yZWdyb3VuZCB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1iYWNrZ3JvdW5kLW11dGVkIGhvdmVyOnRleHQtZm9yZWdyb3VuZCB7aXNBY3RpdmVcblx0XHRcdD8gJ2JnLXByaW1hcnkvMTUgdGV4dC1wcmltYXJ5J1xuXHRcdFx0OiAnJ31cIlxuXHQ+XG5cdFx0e3RleHR9XG5cdDwvYT5cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IHNoZWxsRm9vdGVyKCl9XG5cdDxkaXYgY2xhc3M9XCJmbGV4IG1pbi13LTAgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAteC00IGdhcC15LTJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBtaW4tdy0wIGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJtci0xIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1mb3JlZ3JvdW5kLW11dGVkXCI+VmFyaWFudDwvc3Bhbj5cblx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiU2lkZWJhciB2YXJpYW50XCI+XG5cdFx0XHRcdHsjZWFjaCBzaWRlYmFyVmFyaWFudHMgYXMgdmFyaWFudH1cblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHR2YXJpYW50PXtzaWRlYmFyVmFyaWFudCA9PT0gdmFyaWFudCA/ICdzb2xpZCcgOiAnZ2hvc3QnfVxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IChzaWRlYmFyVmFyaWFudCA9IHZhcmlhbnQpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHt2YXJpYW50fVxuXHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHR7L2VhY2h9XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblxuXHRcdDxkaXYgY2xhc3M9XCJmbGV4IG1pbi13LTAgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cIm1yLTEgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWZvcmVncm91bmQtbXV0ZWRcIj5TdGF0ZTwvc3Bhbj5cblx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiU2lkZWJhciBzdGF0ZVwiPlxuXHRcdFx0XHR7I2VhY2ggc2lkZWJhclN0YXRlcyBhcyBzdGF0ZX1cblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHR2YXJpYW50PXtzaWRlYmFyU3RhdGUgPT09IHN0YXRlID8gJ3NvbGlkJyA6ICdnaG9zdCd9XG5cdFx0XHRcdFx0XHRzaXplPVwic21hbGxcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4gc2V0U2lkZWJhclN0YXRlKHN0YXRlKX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7c3RhdGV9XG5cdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdHsvZWFjaH1cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IHNpZGViYXJGb290ZXIoYXBpOiBTaWRlYmFyQXBpKX1cblx0PFNpZGViYXJDb21tYW5kUGFsZXR0ZVxuXHRcdGdyb3Vwcz17c2lkZWJhckdyb3Vwc31cblx0XHRjb2xsYXBzZWQ9e2FwaS5jb2xsYXBzaWJsZSA9PT0gJ2ljb24nICYmIGFwaS5zdGF0ZSA9PT0gJ2NvbGxhcHNlZCcgJiYgIWFwaS5pc01vYmlsZX1cblx0Lz5cbnsvc25pcHBldH1cbjxUaGVtZT5cblx0eyNzbmlwcGV0IGNoaWxkcmVuKHRoZW1lOiBUaGVtZVN0YXRlKX1cblx0XHR7I2lmIGlzUHJldmlld1JvdXRlfVxuXHRcdFx0e0ByZW5kZXIgY2hpbGRyZW5TbmlwcGV0KCl9XG5cdFx0ezplbHNlfVxuXHRcdFx0eyNzbmlwcGV0IHNoZWxsSGVhZGVyKHsgc2lkZWJhciB9OiBBcHBTaGVsbEFwaSl9XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4IG1pbi1oLTEyIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcHgtMyBweS0yIHNtOnB4LTRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuXHRcdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0XHRwcmVmaXg9e3NpZGViYXJTaW1wbGVJY29ufVxuXHRcdFx0XHRcdFx0XHRsYWJlbD1cIlRvZ2dsZSBzaWRlYmFyXCJcblx0XHRcdFx0XHRcdFx0dmFyaWFudD1cImdob3N0XCJcblx0XHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0XHRcdFx0c3F1YXJlZFxuXHRcdFx0XHRcdFx0XHRjbGFzcz1cIm1kOmhpZGRlblwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHNpZGViYXIudG9nZ2xlKCl9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PG5hdiBhcmlhLWxhYmVsPVwiUHJpbWFyeVwiIGNsYXNzPVwiZmxleCBtaW4tdy0wIGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cblx0XHRcdFx0XHRcdFx0eyNlYWNoIGhlYWRlckxpbmtzIGFzIGxpbmt9XG5cdFx0XHRcdFx0XHRcdFx0e0ByZW5kZXIgaGVhZGVyTGluayhsaW5rKX1cblx0XHRcdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHRcdFx0PC9uYXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0dmFyaWFudD1cIm91dGxpbmVcIlxuXHRcdFx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+ICh0aGVtZS50aGVtZSA9IHRoZW1lLnJlc29sdmVkVGhlbWUgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyaycpfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHt0aGVtZS5yZXNvbHZlZFRoZW1lID09PSAnZGFyaycgPyAnTGlnaHQnIDogJ0RhcmsnfVxuXHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdHsvc25pcHBldH1cblxuXHRcdFx0PE5ldHdvcmtJbmRpY2F0b3IgY29sb3I9XCJkYW5nZXJcIiAvPlxuXHRcdFx0PENvbmZpcm1hdGlvbiAvPlxuXHRcdFx0PEFwcFNoZWxsXG5cdFx0XHRcdHtzaWRlYmFyfVxuXHRcdFx0XHRoZWFkZXI9e3NoZWxsSGVhZGVyfVxuXHRcdFx0XHRmb290ZXI9e3NoZWxsRm9vdGVyfVxuXHRcdFx0XHRjb250ZW50UGFkZGluZz1cImxhcmdlXCJcblx0XHRcdFx0Y29udGVudFdpZHRoPVwid2lkZVwiXG5cdFx0XHQ+XG5cdFx0XHRcdHsjc25pcHBldCBjaGlsZHJlbigpfVxuXHRcdFx0XHRcdHtAcmVuZGVyIGNoaWxkcmVuU25pcHBldCgpfVxuXHRcdFx0XHR7L3NuaXBwZXR9XG5cdFx0XHQ8L0FwcFNoZWxsPlxuXHRcdHsvaWZ9XG5cdHsvc25pcHBldH1cbjwvVGhlbWU+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL3JvdXRlcy8rbGF5b3V0LnN2ZWx0ZSJ9