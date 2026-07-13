import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/AppShell/AppShell.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

AppShell[$.FILENAME] = 'src/lib/components/AppShell/AppShell.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { PageShell } from "/src/lib/components/PageShell/index.ts?t=1783864665558";
import { Sidebar } from "/src/lib/components/Sidebar/index.ts?t=1783864665558";
import { useAppShellTheme } from "/src/lib/components/AppShell/appShell.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'ref',
	'sidebar',
	'eyebrow',
	'breadcrumbs',
	'breadcrumbsMaxItems',
	'back',
	'title',
	'subtitle',
	'header',
	'headerActions',
	'footer',
	'footerActions',
	'contentPadding',
	'contentWidth',
	'actionOverflow',
	'mobileActionCount',
	'frame',
	'children',
	'class',
	'pageShellTheme',
	'theme'
]);

var root = $.add_locations($.from_html(`<div><!></div>`), AppShell[$.FILENAME], [[35, 0]]);

function AppShell($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, AppShell);

	let ref = $.prop($$props, 'ref', 15),
		sidebar = $.prop($$props, 'sidebar', 19, () => ({})),
		frame = $.prop($$props, 'frame', 3, 'viewport'),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useAppShellTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var div = root();

	$.attribute_effect(
		div,
		($0) => ({
			'data-slot': 'app-shell',
			'data-sidebar-variant': sidebar().variant ?? 'sidebar',
			'data-sidebar-side': sidebar().side ?? 'left',
			class: $0,
			...attachments
		}),
		[() => $.get(classes).root({ className: $$props.class })]
	);

	var node = $.child(div);

	{
		const children = $.wrap_snippet(AppShell, function ($$anchor, sidebarApi = $.noop) {
			$.validate_snippet_args(...arguments);

			const appHeader = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment = $.comment();
				var node_1 = $.first_child(fragment);

				{
					var consequent = ($$anchor) => {
						var fragment_1 = $.comment();
						var node_2 = $.first_child(fragment_1);

						$.add_svelte_meta(() => $.snippet(node_2, () => $$props.header, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 47, 5);
						$.append($$anchor, fragment_1);
					};

					$.add_svelte_meta(
						() => $.if(node_1, ($$render) => {
							if ($$props.header) $$render(consequent);
						}),
						'if',
						AppShell,
						46,
						4
					);
				}

				$.append($$anchor, fragment);
			});

			const appHeaderActions = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment_2 = $.comment();
				var node_3 = $.first_child(fragment_2);

				{
					var consequent_1 = ($$anchor) => {
						var fragment_3 = $.comment();
						var node_4 = $.first_child(fragment_3);

						$.add_svelte_meta(() => $.snippet(node_4, () => $$props.headerActions, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 53, 5);
						$.append($$anchor, fragment_3);
					};

					var d = $.derived(() => $$props.headerActions && !Array.isArray($$props.headerActions));

					$.add_svelte_meta(
						() => $.if(node_3, ($$render) => {
							if ($.get(d)) $$render(consequent_1);
						}),
						'if',
						AppShell,
						52,
						4
					);
				}

				$.append($$anchor, fragment_2);
			});

			const appBack = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment_4 = $.comment();
				var node_5 = $.first_child(fragment_4);

				{
					var consequent_2 = ($$anchor) => {
						var fragment_5 = $.comment();
						var node_6 = $.first_child(fragment_5);

						$.add_svelte_meta(() => $.snippet(node_6, () => $$props.back, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 59, 5);
						$.append($$anchor, fragment_5);
					};

					$.add_svelte_meta(
						() => $.if(node_5, ($$render) => {
							if ($.strict_equals(typeof $$props.back, 'function')) $$render(consequent_2);
						}),
						'if',
						AppShell,
						58,
						4
					);
				}

				$.append($$anchor, fragment_4);
			});

			const appBreadcrumbs = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment_6 = $.comment();
				var node_7 = $.first_child(fragment_6);

				{
					var consequent_3 = ($$anchor) => {
						var fragment_7 = $.comment();
						var node_8 = $.first_child(fragment_7);

						$.add_svelte_meta(() => $.snippet(node_8, () => $$props.breadcrumbs, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 65, 5);
						$.append($$anchor, fragment_7);
					};

					var d_1 = $.derived(() => $$props.breadcrumbs && !Array.isArray($$props.breadcrumbs));

					$.add_svelte_meta(
						() => $.if(node_7, ($$render) => {
							if ($.get(d_1)) $$render(consequent_3);
						}),
						'if',
						AppShell,
						64,
						4
					);
				}

				$.append($$anchor, fragment_6);
			});

			const appFooter = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment_8 = $.comment();
				var node_9 = $.first_child(fragment_8);

				{
					var consequent_4 = ($$anchor) => {
						var fragment_9 = $.comment();
						var node_10 = $.first_child(fragment_9);

						$.add_svelte_meta(() => $.snippet(node_10, () => $$props.footer, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 71, 5);
						$.append($$anchor, fragment_9);
					};

					$.add_svelte_meta(
						() => $.if(node_9, ($$render) => {
							if ($$props.footer) $$render(consequent_4);
						}),
						'if',
						AppShell,
						70,
						4
					);
				}

				$.append($$anchor, fragment_8);
			});

			const appFooterActions = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
				$.validate_snippet_args(...arguments);

				var fragment_10 = $.comment();
				var node_11 = $.first_child(fragment_10);

				{
					var consequent_5 = ($$anchor) => {
						var fragment_11 = $.comment();
						var node_12 = $.first_child(fragment_11);

						$.add_svelte_meta(() => $.snippet(node_12, () => $$props.footerActions, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 77, 5);
						$.append($$anchor, fragment_11);
					};

					var d_2 = $.derived(() => $$props.footerActions && !Array.isArray($$props.footerActions));

					$.add_svelte_meta(
						() => $.if(node_11, ($$render) => {
							if ($.get(d_2)) $$render(consequent_5);
						}),
						'if',
						AppShell,
						76,
						4
					);
				}

				$.append($$anchor, fragment_10);
			});

			var fragment_12 = $.comment();
			var node_13 = $.first_child(fragment_12);

			{
				const children = $.wrap_snippet(AppShell, function ($$anchor, pageShell = $.noop) {
					$.validate_snippet_args(...arguments);

					var fragment_13 = $.comment();
					var node_14 = $.first_child(fragment_13);

					$.add_svelte_meta(() => $.snippet(node_14, () => $$props.children, () => ({ pageShell: pageShell(), sidebar: sidebarApi() })), 'render', AppShell, 115, 5);
					$.append($$anchor, fragment_13);
				});

				let $0 = $.derived(() => Array.isArray($$props.breadcrumbs)
					? $$props.breadcrumbs
					: $$props.breadcrumbs ? appBreadcrumbs : undefined);

				let $1 = $.derived(() => $.strict_equals(typeof $$props.back, 'function') ? appBack : $$props.back);
				let $2 = $.derived(() => $$props.header ? appHeader : undefined);

				let $3 = $.derived(() => Array.isArray($$props.headerActions)
					? $$props.headerActions
					: $$props.headerActions ? appHeaderActions : undefined);

				let $4 = $.derived(() => $$props.footer ? appFooter : undefined);

				let $5 = $.derived(() => Array.isArray($$props.footerActions)
					? $$props.footerActions
					: $$props.footerActions ? appFooterActions : undefined);

				let $6 = $.derived(() => $.get(classes).page({
					variant: sidebar().variant ?? 'sidebar',
					side: sidebar().side ?? 'left'
				}));

				$.add_svelte_meta(
					() => PageShell(node_13, {
						get eyebrow() {
							return $$props.eyebrow;
						},

						get breadcrumbs() {
							return $.get($0);
						},

						get breadcrumbsMaxItems() {
							return $$props.breadcrumbsMaxItems;
						},

						get back() {
							return $.get($1);
						},

						get title() {
							return $$props.title;
						},

						get subtitle() {
							return $$props.subtitle;
						},

						get header() {
							return $.get($2);
						},

						get headerActions() {
							return $.get($3);
						},

						get footer() {
							return $.get($4);
						},

						get footerActions() {
							return $.get($5);
						},

						get contentPadding() {
							return $$props.contentPadding;
						},

						get contentWidth() {
							return $$props.contentWidth;
						},

						get actionOverflow() {
							return $$props.actionOverflow;
						},

						get mobileActionCount() {
							return $$props.mobileActionCount;
						},

						get class() {
							return $.get($6);
						},

						get theme() {
							return $$props.pageShellTheme;
						},
						children,
						$$slots: { default: true }
					}),
					'component',
					AppShell,
					81,
					3,
					{ componentTag: 'PageShell' }
				);
			}

			$.append($$anchor, fragment_12);
		});

		$.add_svelte_meta(
			() => Sidebar(node, $.spread_props(sidebar, {
				get frame() {
					return frame();
				},
				mode: 'layout',
				children,
				$$slots: { default: true }
			})),
			'component',
			AppShell,
			43,
			1,
			{ componentTag: 'Sidebar' }
		);
	}

	$.reset(div);
	$.bind_this(div, ($$value) => ref($$value), () => ref());
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	AppShell = $.hmr(AppShell);

	import.meta.hot.acceptExports(["default"],(module) => {
		AppShell[$.HMR].update(module.default);
	});
}

export default AppShell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLFNBQVMsUUFBMkIsb0NBQW9DO0FBQ2pGLE9BQU8sRUFBRSxPQUFPLFFBQVEsa0NBQWtDO0FBRTFELE9BQU8sRUFBRSxnQkFBZ0IsUUFBUSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBSnZELENBQUM7Ozs7Q0FNQSxJQUFJLEFBQ0gsR0FBRztFQUNILE9BQU87RUFlUCxLQUFLLCtCQUFHLFVBQVU7RUFLZjs7Q0FHSixNQUFNLE9BQU8seUJBQVksZ0JBQWdCOztLQUd6Qzs7O0VBQUE7OzsyQkFHc0IsT0FBTyxHQUFDLE9BQU8sSUFBSSxTQUFTO3dCQUMvQixPQUFPLEdBQUMsSUFBSSxJQUFJLE1BQU07O01BRXJDLFdBQVc7O2VBRFIsT0FBTyxFQUFDLElBQUksR0FBRyxTQUFTOzs7b0JBTC9COzs7UUFTVyxRQUFRLGdEQUFDLFVBQVU7OztTQUNsQixTQUFTLGdEQUFDLFNBQXVCOzs7Ozs7Ozs7OzsrRUFFdkIsU0FBUyxFQUFULFNBQVMsSUFBRSxPQUFPLEVBQUUsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBSXhDLGdCQUFnQixnREFBQyxTQUF1Qjs7Ozs7Ozs7Ozs7c0ZBRXZCLFNBQVMsRUFBVCxTQUFTLElBQUUsT0FBTyxFQUFFLFVBQVU7Ozs7dURBRGpDLEtBQUssQ0FBQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O1NBSzNCLE9BQU8sZ0RBQUMsU0FBdUI7Ozs7Ozs7Ozs7OzZFQUV2QixTQUFTLEVBQVQsU0FBUyxJQUFFLE9BQU8sRUFBRSxVQUFVOzs7Ozs7Z0RBRDFCLFVBQVU7Ozs7Ozs7Ozs7OztTQUt0QixjQUFjLGdEQUFDLFNBQXVCOzs7Ozs7Ozs7OztvRkFFdkIsU0FBUyxFQUFULFNBQVMsSUFBRSxPQUFPLEVBQUUsVUFBVTs7Ozt1REFEakMsS0FBSyxDQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7U0FLekIsU0FBUyxnREFBQyxTQUF1Qjs7Ozs7Ozs7Ozs7Z0ZBRXZCLFNBQVMsRUFBVCxTQUFTLElBQUUsT0FBTyxFQUFFLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUl4QyxnQkFBZ0IsZ0RBQUMsU0FBdUI7Ozs7Ozs7Ozs7O3VGQUV2QixTQUFTLEVBQVQsU0FBUyxJQUFFLE9BQU8sRUFBRSxVQUFVOzs7O3lEQURqQyxLQUFLLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFzQzFCLFFBQVEsZ0RBQUMsU0FBUzs7Ozs7O2lGQUNKLFNBQVMsRUFBVCxTQUFTLElBQUUsT0FBTyxFQUFFLFVBQVU7Ozs7NkJBaEN6QyxLQUFLLENBQUMsT0FBTzs7NkJBR3RCLGlCQUNBLFNBQVM7O2tFQUVTLFVBQVUsSUFBRyxPQUFPOzhDQUd6QixTQUFTLEdBQUcsU0FBUzs7NkJBQ3ZCLEtBQUssQ0FBQyxPQUFPOzsrQkFHeEIsbUJBQ0EsU0FBUzs7OENBQ0ksU0FBUyxHQUFHLFNBQVM7OzZCQUN2QixLQUFLLENBQUMsT0FBTzs7K0JBR3hCLG1CQUNBLFNBQVM7O21DQUtOLE9BQU8sRUFBQyxJQUFJO0tBQ2xCLE9BQU8sRUFBRSxPQUFPLEdBQUMsT0FBTyxJQUFJLFNBQVM7S0FDckMsSUFBSSxFQUFFLE9BQU8sR0FBQyxJQUFJLElBQUksTUFBSzs7OztXQTdCNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFpQ1UsUUFBUTs7Ozs7Ozs7Ozs7Ozs7O1NBdkVwQixPQUFPLHNCQUFLLE9BQU87O1lBQUcsS0FBSzs7O0lBQ2pCLFFBQVE7Ozs7Ozs7Ozs7O1NBVG5CO2FBQUEsa0JBQ1csR0FBRyxpQkFBSCxHQUFHO29CQURkOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXBwU2hlbGwuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IFBhZ2VTaGVsbCwgdHlwZSBQYWdlU2hlbGxBcGkgfSBmcm9tICckbGliL2NvbXBvbmVudHMvUGFnZVNoZWxsL2luZGV4LmpzJztcblx0aW1wb3J0IHsgU2lkZWJhciB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9TaWRlYmFyL2luZGV4LmpzJztcblx0aW1wb3J0IHR5cGUgeyBBcHBTaGVsbFByb3BzIH0gZnJvbSAnLi9hcHBTaGVsbC5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZUFwcFNoZWxsVGhlbWUgfSBmcm9tICcuL2FwcFNoZWxsLnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdHJlZiA9ICRiaW5kYWJsZSgpLFxuXHRcdHNpZGViYXIgPSB7fSxcblx0XHRleWVicm93LFxuXHRcdGJyZWFkY3J1bWJzLFxuXHRcdGJyZWFkY3J1bWJzTWF4SXRlbXMsXG5cdFx0YmFjayxcblx0XHR0aXRsZSxcblx0XHRzdWJ0aXRsZSxcblx0XHRoZWFkZXIsXG5cdFx0aGVhZGVyQWN0aW9ucyxcblx0XHRmb290ZXIsXG5cdFx0Zm9vdGVyQWN0aW9ucyxcblx0XHRjb250ZW50UGFkZGluZyxcblx0XHRjb250ZW50V2lkdGgsXG5cdFx0YWN0aW9uT3ZlcmZsb3csXG5cdFx0bW9iaWxlQWN0aW9uQ291bnQsXG5cdFx0ZnJhbWUgPSAndmlld3BvcnQnLFxuXHRcdGNoaWxkcmVuOiBwYWdlQ29udGVudCxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdHBhZ2VTaGVsbFRoZW1lLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IEFwcFNoZWxsUHJvcHMgPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlQXBwU2hlbGxUaGVtZSh0aGVtZSkpO1xuPC9zY3JpcHQ+XG5cbjxkaXZcblx0YmluZDp0aGlzPXtyZWZ9XG5cdGRhdGEtc2xvdD1cImFwcC1zaGVsbFwiXG5cdGRhdGEtc2lkZWJhci12YXJpYW50PXtzaWRlYmFyLnZhcmlhbnQgPz8gJ3NpZGViYXInfVxuXHRkYXRhLXNpZGViYXItc2lkZT17c2lkZWJhci5zaWRlID8/ICdsZWZ0J31cblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IGNsYXNzTmFtZSB9KX1cblx0ey4uLmF0dGFjaG1lbnRzfVxuPlxuXHQ8U2lkZWJhciB7Li4uc2lkZWJhcn0ge2ZyYW1lfSBtb2RlPVwibGF5b3V0XCI+XG5cdFx0eyNzbmlwcGV0IGNoaWxkcmVuKHNpZGViYXJBcGkpfVxuXHRcdFx0eyNzbmlwcGV0IGFwcEhlYWRlcihwYWdlU2hlbGw6IFBhZ2VTaGVsbEFwaSl9XG5cdFx0XHRcdHsjaWYgaGVhZGVyfVxuXHRcdFx0XHRcdHtAcmVuZGVyIGhlYWRlcih7IHBhZ2VTaGVsbCwgc2lkZWJhcjogc2lkZWJhckFwaSB9KX1cblx0XHRcdFx0ey9pZn1cblx0XHRcdHsvc25pcHBldH1cblxuXHRcdFx0eyNzbmlwcGV0IGFwcEhlYWRlckFjdGlvbnMocGFnZVNoZWxsOiBQYWdlU2hlbGxBcGkpfVxuXHRcdFx0XHR7I2lmIGhlYWRlckFjdGlvbnMgJiYgIUFycmF5LmlzQXJyYXkoaGVhZGVyQWN0aW9ucyl9XG5cdFx0XHRcdFx0e0ByZW5kZXIgaGVhZGVyQWN0aW9ucyh7IHBhZ2VTaGVsbCwgc2lkZWJhcjogc2lkZWJhckFwaSB9KX1cblx0XHRcdFx0ey9pZn1cblx0XHRcdHsvc25pcHBldH1cblxuXHRcdFx0eyNzbmlwcGV0IGFwcEJhY2socGFnZVNoZWxsOiBQYWdlU2hlbGxBcGkpfVxuXHRcdFx0XHR7I2lmIHR5cGVvZiBiYWNrID09PSAnZnVuY3Rpb24nfVxuXHRcdFx0XHRcdHtAcmVuZGVyIGJhY2soeyBwYWdlU2hlbGwsIHNpZGViYXI6IHNpZGViYXJBcGkgfSl9XG5cdFx0XHRcdHsvaWZ9XG5cdFx0XHR7L3NuaXBwZXR9XG5cblx0XHRcdHsjc25pcHBldCBhcHBCcmVhZGNydW1icyhwYWdlU2hlbGw6IFBhZ2VTaGVsbEFwaSl9XG5cdFx0XHRcdHsjaWYgYnJlYWRjcnVtYnMgJiYgIUFycmF5LmlzQXJyYXkoYnJlYWRjcnVtYnMpfVxuXHRcdFx0XHRcdHtAcmVuZGVyIGJyZWFkY3J1bWJzKHsgcGFnZVNoZWxsLCBzaWRlYmFyOiBzaWRlYmFyQXBpIH0pfVxuXHRcdFx0XHR7L2lmfVxuXHRcdFx0ey9zbmlwcGV0fVxuXG5cdFx0XHR7I3NuaXBwZXQgYXBwRm9vdGVyKHBhZ2VTaGVsbDogUGFnZVNoZWxsQXBpKX1cblx0XHRcdFx0eyNpZiBmb290ZXJ9XG5cdFx0XHRcdFx0e0ByZW5kZXIgZm9vdGVyKHsgcGFnZVNoZWxsLCBzaWRlYmFyOiBzaWRlYmFyQXBpIH0pfVxuXHRcdFx0XHR7L2lmfVxuXHRcdFx0ey9zbmlwcGV0fVxuXG5cdFx0XHR7I3NuaXBwZXQgYXBwRm9vdGVyQWN0aW9ucyhwYWdlU2hlbGw6IFBhZ2VTaGVsbEFwaSl9XG5cdFx0XHRcdHsjaWYgZm9vdGVyQWN0aW9ucyAmJiAhQXJyYXkuaXNBcnJheShmb290ZXJBY3Rpb25zKX1cblx0XHRcdFx0XHR7QHJlbmRlciBmb290ZXJBY3Rpb25zKHsgcGFnZVNoZWxsLCBzaWRlYmFyOiBzaWRlYmFyQXBpIH0pfVxuXHRcdFx0XHR7L2lmfVxuXHRcdFx0ey9zbmlwcGV0fVxuXG5cdFx0XHQ8UGFnZVNoZWxsXG5cdFx0XHRcdHtleWVicm93fVxuXHRcdFx0XHRicmVhZGNydW1icz17QXJyYXkuaXNBcnJheShicmVhZGNydW1icylcblx0XHRcdFx0XHQ/IGJyZWFkY3J1bWJzXG5cdFx0XHRcdFx0OiBicmVhZGNydW1ic1xuXHRcdFx0XHRcdFx0PyBhcHBCcmVhZGNydW1ic1xuXHRcdFx0XHRcdFx0OiB1bmRlZmluZWR9XG5cdFx0XHRcdHticmVhZGNydW1ic01heEl0ZW1zfVxuXHRcdFx0XHRiYWNrPXt0eXBlb2YgYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IGFwcEJhY2sgOiBiYWNrfVxuXHRcdFx0XHR7dGl0bGV9XG5cdFx0XHRcdHtzdWJ0aXRsZX1cblx0XHRcdFx0aGVhZGVyPXtoZWFkZXIgPyBhcHBIZWFkZXIgOiB1bmRlZmluZWR9XG5cdFx0XHRcdGhlYWRlckFjdGlvbnM9e0FycmF5LmlzQXJyYXkoaGVhZGVyQWN0aW9ucylcblx0XHRcdFx0XHQ/IGhlYWRlckFjdGlvbnNcblx0XHRcdFx0XHQ6IGhlYWRlckFjdGlvbnNcblx0XHRcdFx0XHRcdD8gYXBwSGVhZGVyQWN0aW9uc1xuXHRcdFx0XHRcdFx0OiB1bmRlZmluZWR9XG5cdFx0XHRcdGZvb3Rlcj17Zm9vdGVyID8gYXBwRm9vdGVyIDogdW5kZWZpbmVkfVxuXHRcdFx0XHRmb290ZXJBY3Rpb25zPXtBcnJheS5pc0FycmF5KGZvb3RlckFjdGlvbnMpXG5cdFx0XHRcdFx0PyBmb290ZXJBY3Rpb25zXG5cdFx0XHRcdFx0OiBmb290ZXJBY3Rpb25zXG5cdFx0XHRcdFx0XHQ/IGFwcEZvb3RlckFjdGlvbnNcblx0XHRcdFx0XHRcdDogdW5kZWZpbmVkfVxuXHRcdFx0XHR7Y29udGVudFBhZGRpbmd9XG5cdFx0XHRcdHtjb250ZW50V2lkdGh9XG5cdFx0XHRcdHthY3Rpb25PdmVyZmxvd31cblx0XHRcdFx0e21vYmlsZUFjdGlvbkNvdW50fVxuXHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5wYWdlKHtcblx0XHRcdFx0XHR2YXJpYW50OiBzaWRlYmFyLnZhcmlhbnQgPz8gJ3NpZGViYXInLFxuXHRcdFx0XHRcdHNpZGU6IHNpZGViYXIuc2lkZSA/PyAnbGVmdCdcblx0XHRcdFx0fSl9XG5cdFx0XHRcdHRoZW1lPXtwYWdlU2hlbGxUaGVtZX1cblx0XHRcdD5cblx0XHRcdFx0eyNzbmlwcGV0IGNoaWxkcmVuKHBhZ2VTaGVsbCl9XG5cdFx0XHRcdFx0e0ByZW5kZXIgcGFnZUNvbnRlbnQoeyBwYWdlU2hlbGwsIHNpZGViYXI6IHNpZGViYXJBcGkgfSl9XG5cdFx0XHRcdHsvc25pcHBldH1cblx0XHRcdDwvUGFnZVNoZWxsPlxuXHRcdHsvc25pcHBldH1cblx0PC9TaWRlYmFyPlxuPC9kaXY+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0FwcFNoZWxsL0FwcFNoZWxsLnN2ZWx0ZSJ9