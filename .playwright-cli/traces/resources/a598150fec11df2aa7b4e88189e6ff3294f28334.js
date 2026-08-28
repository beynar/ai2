import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/Sidebar.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Sidebar[$.FILENAME] = 'src/lib/components/Sidebar/Sidebar.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { useI18n } from "/src/lib/i18n/context.svelte.ts?t=1783864665558";
import { cx } from "/src/lib/utils/cva/index.ts";
import SidebarDesktopShell from "/src/lib/components/Sidebar/SidebarDesktopShell.svelte";
import SidebarMobileDrawer from "/src/lib/components/Sidebar/SidebarMobileDrawer.svelte";
import SidebarPanel from "/src/lib/components/Sidebar/SidebarPanel.svelte?t=1783864665558";
import { SidebarDisplayStateBridge } from "/src/lib/components/Sidebar/sidebar.display-state.svelte.ts";
import { SidebarResizeState } from "/src/lib/components/Sidebar/sidebar.resize.svelte.ts";
import { SidebarStateController } from "/src/lib/components/Sidebar/sidebar.state.svelte.ts";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'ref',
	'open',
	'onOpenChange',
	'displayState',
	'onDisplayStateChange',
	'side',
	'variant',
	'collapsible',
	'mode',
	'frame',
	'dir',
	'width',
	'widthIcon',
	'widthMobile',
	'resizable',
	'keyboardShortcut',
	'rail',
	'edgeReveal',
	'items',
	'class',
	'collapseIcon',
	'tooltips',
	'headerButton',
	'search',
	'headerMenu',
	'header',
	'content',
	'footerButton',
	'footerMenu',
	'footer',
	'children',
	'banner',
	'theme'
]);

var root = $.add_locations($.from_html(`<div><!></div>`), Sidebar[$.FILENAME], [[155, 1]]);
var root_1 = $.add_locations($.from_html(`<div data-slot="sidebar" data-sidebar="sidebar"><!></div>`), Sidebar[$.FILENAME], [[203, 4]]);
var root_2 = $.add_locations($.from_html(`<div><!> <div><!> <main data-slot="sidebar-main"><!></main></div></div>`), Sidebar[$.FILENAME], [[173, 1, [[189, 2, [[232, 3]]]]]]);

function Sidebar($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Sidebar);

	const panel = $.wrap_snippet(Sidebar, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		$.add_svelte_meta(
			() => SidebarPanel(node, {
				get api() {
					return api;
				},

				get items() {
					return $$props.items;
				},

				get headerButton() {
					return $$props.headerButton;
				},

				get search() {
					return $$props.search;
				},

				get headerMenu() {
					return $$props.headerMenu;
				},

				get header() {
					return $$props.header;
				},

				get content() {
					return $$props.content;
				},

				get footerButton() {
					return $$props.footerButton;
				},

				get footerMenu() {
					return $$props.footerMenu;
				},

				get footer() {
					return $$props.footer;
				},

				get collapseIcon() {
					return collapseIcon();
				},

				get tooltips() {
					return tooltips();
				},

				get theme() {
					return $$props.theme;
				}
			}),
			'component',
			Sidebar,
			138,
			1,
			{ componentTag: 'SidebarPanel' }
		);

		$.append($$anchor, fragment);
	});

	let ref = $.prop($$props, 'ref', 15),
		open = $.prop($$props, 'open', 15, true),
		displayState = $.prop($$props, 'displayState', 15, undefined),
		side = $.prop($$props, 'side', 3, 'left'),
		variant = $.prop($$props, 'variant', 3, 'sidebar'),
		collapsible = $.prop($$props, 'collapsible', 3, 'offcanvas'),
		mode = $.prop($$props, 'mode', 3, 'layout'),
		frame = $.prop($$props, 'frame', 3, 'viewport'),
		width = $.prop($$props, 'width', 15, '16rem'),
		widthIcon = $.prop($$props, 'widthIcon', 3, '3rem'),
		widthMobile = $.prop($$props, 'widthMobile', 3, '18rem'),
		keyboardShortcut = $.prop($$props, 'keyboardShortcut', 3, 'b'),
		rail = $.prop($$props, 'rail', 3, false),
		edgeReveal = $.prop($$props, 'edgeReveal', 3, true),
		collapseIcon = $.prop($$props, 'collapseIcon', 3, 'chevron'),
		tooltips = $.prop($$props, 'tooltips', 3, 'auto'),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	let edgeRevealed = $.tag($.state(false), 'edgeRevealed');

	function setOpen(nextOpen) {
		open(nextOpen);
		$$props.onOpenChange?.(nextOpen);
	}

	function setWidth(nextWidth) {
		width(nextWidth);
	}

	const t = $.tag($.derived(useI18n), 't');
	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');

	const displayStateBridge = new SidebarDisplayStateBridge({
		get open() {
			return open();
		},

		get displayState() {
			return displayState();
		},

		get collapsible() {
			return collapsible();
		},
		setOpen,
		setDisplayStateProp: (nextDisplayState) => {
			displayState(nextDisplayState);
		},

		get onDisplayStateChange() {
			return $$props.onDisplayStateChange;
		}
	});

	const controller = new SidebarStateController({
		get mode() {
			return mode();
		},

		get keyboardShortcut() {
			return keyboardShortcut();
		},

		get displayState() {
			return displayStateBridge.displayState;
		},

		get side() {
			return side();
		},

		get collapsible() {
			return collapsible();
		},
		setDisplayState: displayStateBridge.setDisplayState
	});

	const resize = new SidebarResizeState({
		get width() {
			return width();
		},

		get resizable() {
			return $$props.resizable;
		},

		get side() {
			return side();
		},

		get displayState() {
			return controller.displayState;
		},

		get collapsible() {
			return collapsible();
		},
		setWidth,
		setDisplayState: displayStateBridge.setDisplayState
	});

	const api = controller.api;
	const collapsibleState = $.tag($.derived(() => controller.collapsibleState), 'collapsibleState');
	const panelWidth = $.tag($.derived(() => $.strict_equals(mode(), 'panel') && $.strict_equals(controller.displayState, 'collapsed') ? widthIcon() : width()), 'panelWidth');
	const withBanner = $.tag($.derived(() => !!$$props.banner), 'withBanner');

	const rootClass = $.tag(
		$.derived(() => cx(
			'group/sidebar-wrapper flex w-full bg-background-muted text-foreground',
			$.strict_equals(frame(), 'viewport')
				? 'h-svh min-h-0 overflow-hidden'
				: 'relative h-full min-h-0 overflow-hidden rounded-[inherit]',
			$.get(withBanner) && 'flex-col',
			$$props.class
		)),
		'rootClass'
	);

	const rowClass = $.tag($.derived(() => cx('flex w-full flex-1 min-h-0', !$.get(withBanner) && 'contents')), 'rowClass');

	$.user_effect(() => {
		if (!controller.isMobile) {
			controller.setOpenMobile(false);
		}
	});

	var $$exports = { ...$.legacy_api() };
	var fragment_1 = $.comment();
	var node_1 = $.first_child(fragment_1);

	{
		var consequent = ($$anchor) => {
			var div = root();

			$.attribute_effect(
				div,
				($0) => ({
					'data-slot': 'sidebar',
					'data-sidebar': 'sidebar',
					'data-state': controller.state,
					'data-display-state': controller.displayState,
					'data-collapsible': $.get(collapsibleState),
					'data-variant': variant(),
					'data-side': side(),
					class: $0,
					...attachments,
					[$.STYLE]: {
						'--sidebar-width': $.get(panelWidth),
						'--sidebar-width-icon': widthIcon(),
						'--sidebar-width-mobile': widthMobile()
					}
				}),
				[
					() => cx('group', $.get(classes).panel({
						variant: variant(),
						placement: 'panel',
						className: $$props.class
					}))
				]
			);

			var node_2 = $.child(div);

			$.add_svelte_meta(() => panel(node_2), 'render', Sidebar, 170, 2);
			$.reset(div);
			$.bind_this(div, ($$value) => ref($$value), () => ref());
			$.append($$anchor, div);
		};

		var alternate_1 = ($$anchor) => {
			var div_1 = root_2();

			$.attribute_effect(div_1, () => ({
				'data-slot': 'sidebar-wrapper',
				'data-state': controller.state,
				'data-display-state': controller.displayState,
				'data-collapsible': $.get(collapsibleState),
				'data-variant': variant(),
				'data-side': side(),
				'data-frame': frame(),
				class: $.get(rootClass),
				...attachments,
				[$.STYLE]: {
					'--sidebar-width': width(),
					'--sidebar-width-icon': widthIcon(),
					'--sidebar-width-mobile': widthMobile()
				}
			}));

			var node_3 = $.child(div_1);

			{
				var consequent_1 = ($$anchor) => {
					var fragment_2 = $.comment();
					var node_4 = $.first_child(fragment_2);

					$.add_svelte_meta(() => $.snippet(node_4, () => $$props.banner, () => api), 'render', Sidebar, 188, 14);
					$.append($$anchor, fragment_2);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if ($$props.banner) $$render(consequent_1);
					}),
					'if',
					Sidebar,
					188,
					2
				);
			}

			var div_2 = $.sibling(node_3, 2);
			var node_5 = $.child(div_2);

			{
				var consequent_2 = ($$anchor) => {
					var fragment_3 = $.comment();
					var node_6 = $.first_child(fragment_3);

					{
						let $0 = $.derived(() => `${$.get(t).sidebar} ${$.get(t).navigation}`);

						$.add_svelte_meta(
							() => SidebarMobileDrawer(node_6, {
								get open() {
									return controller.openMobile;
								},
								close: () => controller.setOpenMobile(false),
								get side() {
									return side();
								},

								get widthMobile() {
									return widthMobile();
								},

								get dir() {
									return $$props.dir;
								},

								get label() {
									return $.get($0);
								},

								get theme() {
									return $$props.theme;
								},

								children: $.wrap_snippet(Sidebar, ($$anchor, $$slotProps) => {
									$.add_svelte_meta(() => panel($$anchor), 'render', Sidebar, 200, 5);
								}),
								$$slots: { default: true }
							}),
							'component',
							Sidebar,
							191,
							4,
							{ componentTag: 'SidebarMobileDrawer' }
						);
					}

					$.append($$anchor, fragment_3);
				};

				var consequent_3 = ($$anchor) => {
					var div_3 = root_1();
					var node_7 = $.child(div_3);

					$.add_svelte_meta(() => panel(node_7), 'render', Sidebar, 209, 5);
					$.reset(div_3);

					$.template_effect(
						($0) => {
							$.set_attribute(div_3, 'data-side', side());
							$.set_class(div_3, 1, $0);
						},
						[
							() => $.clsx($.get(classes).panel({ variant: variant(), placement: 'static' }))
						]
					);

					$.append($$anchor, div_3);
				};

				var alternate = ($$anchor) => {
					var fragment_5 = $.comment();
					var node_8 = $.first_child(fragment_5);

					{
						let $0 = $.derived(() => `${$.get(t).toggle} ${$.get(t).sidebar}`);
						let $1 = $.derived(() => `${$.get(t).open} ${$.get(t).sidebar}`);

						$.add_svelte_meta(
							() => SidebarDesktopShell(node_8, {
								get sidebarState() {
									return controller.state;
								},

								get displayState() {
									return controller.displayState;
								},

								get collapsibleState() {
									return $.get(collapsibleState);
								},

								get variant() {
									return variant();
								},

								get side() {
									return side();
								},

								get frame() {
									return frame();
								},

								get rail() {
									return rail();
								},

								get edgeReveal() {
									return edgeReveal();
								},

								get toggleLabel() {
									return $.get($0);
								},

								get openLabel() {
									return $.get($1);
								},

								get toggle() {
									return controller.toggle;
								},
								open: () => controller.setDisplayState('expanded'),
								get resize() {
									return resize;
								},

								get theme() {
									return $$props.theme;
								},

								get edgeRevealed() {
									return $.get(edgeRevealed);
								},

								set edgeRevealed($$value) {
									$.set(edgeRevealed, $$value, true);
								},

								children: $.wrap_snippet(Sidebar, ($$anchor, $$slotProps) => {
									$.add_svelte_meta(() => panel($$anchor), 'render', Sidebar, 229, 5);
								}),
								$$slots: { default: true }
							}),
							'component',
							Sidebar,
							212,
							4,
							{ componentTag: 'SidebarDesktopShell' }
						);
					}

					$.append($$anchor, fragment_5);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if (controller.isMobile) $$render(consequent_2); else if ($.strict_equals(collapsible(), 'none')) $$render(consequent_3, 1); else $$render(alternate, -1);
					}),
					'if',
					Sidebar,
					190,
					3
				);
			}

			var main = $.sibling(node_5, 2);
			var node_9 = $.child(main);

			$.add_svelte_meta(() => $.snippet(node_9, () => $$props.children ?? $.noop, () => api), 'render', Sidebar, 242, 4);
			$.reset(main);
			$.reset(div_2);
			$.reset(div_1);
			$.bind_this(div_1, ($$value) => ref($$value), () => ref());

			$.template_effect(
				($0) => {
					$.set_class(div_2, 1, $.clsx($.get(rowClass)));
					main.inert = controller.isMobile && controller.openMobile ? true : undefined;
					$.set_class(main, 1, $0);
				},
				[
					() => $.clsx($.get(classes).main({
						variant: variant(),
						side: side(),
						displayState: controller.displayState,
						edgeRevealed: $.get(edgeRevealed)
					}))
				]
			);

			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.strict_equals(mode(), 'panel')) $$render(consequent); else $$render(alternate_1, -1);
			}),
			'if',
			Sidebar,
			154,
			0
		);
	}

	$.append($$anchor, fragment_1);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Sidebar = $.hmr(Sidebar);

	import.meta.hot.acceptExports(["default"],(module) => {
		Sidebar[$.HMR].update(module.default);
	});
}

export default Sidebar;
//# sourceMappingURL=data:application/json;base64,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LFVBQVUsQ0FBQyxNQUFNOztvQkFDYixVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVU7O2dCQUNoRCxNQUFNOzs7Ozs7O1lBRVAsWUFBSzs7OztZQUFMLFlBQUs7Ozs7O2lDQUVJLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdkNYLFVBQVUsQ0FBQyxRQUFRLG1EQVlkLFdBQVcsSUFBSyxNQUFNOzs7Ozs7Ozs7T0E4Qi9CO3dCQUFBOztxRkFVb0IsR0FBRztXQVZ2QjtXQTNDRCxLQUFHO1dBaEJKO2VBQUEsb0JBQ1csR0FBRyxpQkFBSCxHQUFHOzs7O2lCQWViLEtBQUcsa0JBQVEsUUFBUTtLQTJDbEIsYUFFTyxVQUFVLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLFNBQVM7aUJBRnRFOzs7d0JBR08sT0FBTyxFQUFDLElBQUk7TUFDbEIsT0FBTyxFQUFQLE9BQU87TUFDUCxJQUFJLEVBQUosSUFBSTtNQUNKLFlBQVksRUFBRSxVQUFVLENBQUMsWUFBWTtNQUNyQzs7Ozs7c0JBbEVIOzs7Ozt3QkFuQkcsSUFBSSxJQUFLLE9BQU87Ozs7Ozs7Ozs7OztBQW5CYiIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2lkZWJhci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJyRsaWIvaTE4bi9jb250ZXh0LnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IGN4IH0gZnJvbSAnJGxpYi91dGlscy9jdmEvaW5kZXguanMnO1xuXHRpbXBvcnQgdHlwZSB7IFNpZGViYXJEaXNwbGF5U3RhdGUsIFNpZGViYXJQcm9wcyB9IGZyb20gJy4vc2lkZWJhci5wcm9wcy5qcyc7XG5cdGltcG9ydCBTaWRlYmFyRGVza3RvcFNoZWxsIGZyb20gJy4vU2lkZWJhckRlc2t0b3BTaGVsbC5zdmVsdGUnO1xuXHRpbXBvcnQgU2lkZWJhck1vYmlsZURyYXdlciBmcm9tICcuL1NpZGViYXJNb2JpbGVEcmF3ZXIuc3ZlbHRlJztcblx0aW1wb3J0IFNpZGViYXJQYW5lbCBmcm9tICcuL1NpZGViYXJQYW5lbC5zdmVsdGUnO1xuXHRpbXBvcnQgeyBTaWRlYmFyRGlzcGxheVN0YXRlQnJpZGdlIH0gZnJvbSAnLi9zaWRlYmFyLmRpc3BsYXktc3RhdGUuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgU2lkZWJhclJlc2l6ZVN0YXRlIH0gZnJvbSAnLi9zaWRlYmFyLnJlc2l6ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgeyBTaWRlYmFyU3RhdGVDb250cm9sbGVyIH0gZnJvbSAnLi9zaWRlYmFyLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cdGxldCB7XG5cdFx0cmVmID0gJGJpbmRhYmxlKCksXG5cdFx0b3BlbiA9ICRiaW5kYWJsZSh0cnVlKSxcblx0XHRvbk9wZW5DaGFuZ2UsXG5cdFx0ZGlzcGxheVN0YXRlID0gJGJpbmRhYmxlPFNpZGViYXJEaXNwbGF5U3RhdGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCksXG5cdFx0b25EaXNwbGF5U3RhdGVDaGFuZ2UsXG5cdFx0c2lkZSA9ICdsZWZ0Jyxcblx0XHR2YXJpYW50ID0gJ3NpZGViYXInLFxuXHRcdGNvbGxhcHNpYmxlID0gJ29mZmNhbnZhcycsXG5cdFx0bW9kZSA9ICdsYXlvdXQnLFxuXHRcdGZyYW1lID0gJ3ZpZXdwb3J0Jyxcblx0XHRkaXIsXG5cdFx0d2lkdGggPSAkYmluZGFibGUoJzE2cmVtJyksXG5cdFx0d2lkdGhJY29uID0gJzNyZW0nLFxuXHRcdHdpZHRoTW9iaWxlID0gJzE4cmVtJyxcblx0XHRyZXNpemFibGUsXG5cdFx0a2V5Ym9hcmRTaG9ydGN1dCA9ICdiJyxcblx0XHRyYWlsID0gZmFsc2UsXG5cdFx0ZWRnZVJldmVhbCA9IHRydWUsXG5cdFx0aXRlbXMsXG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSxcblx0XHRjb2xsYXBzZUljb24gPSAnY2hldnJvbicsXG5cdFx0dG9vbHRpcHMgPSAnYXV0bycsXG5cdFx0aGVhZGVyQnV0dG9uLFxuXHRcdHNlYXJjaCxcblx0XHRoZWFkZXJNZW51LFxuXHRcdGhlYWRlcixcblx0XHRjb250ZW50LFxuXHRcdGZvb3RlckJ1dHRvbixcblx0XHRmb290ZXJNZW51LFxuXHRcdGZvb3Rlcixcblx0XHRjaGlsZHJlbixcblx0XHRiYW5uZXIsXG5cdFx0dGhlbWUsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogU2lkZWJhclByb3BzID0gJHByb3BzKCk7XG5cdGxldCBlZGdlUmV2ZWFsZWQgPSAkc3RhdGUoZmFsc2UpO1xuXHRmdW5jdGlvbiBzZXRPcGVuKG5leHRPcGVuOiBib29sZWFuKSB7XG5cdFx0b3BlbiA9IG5leHRPcGVuO1xuXHRcdG9uT3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcblx0fVxuXHRmdW5jdGlvbiBzZXRXaWR0aChuZXh0V2lkdGg6IHN0cmluZykge1xuXHRcdHdpZHRoID0gbmV4dFdpZHRoO1xuXHR9XG5cdGNvbnN0IHQgPSAkZGVyaXZlZCh1c2VJMThuKCkpO1xuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2lkZWJhclRoZW1lKHRoZW1lKSk7XG5cdGNvbnN0IGRpc3BsYXlTdGF0ZUJyaWRnZSA9IG5ldyBTaWRlYmFyRGlzcGxheVN0YXRlQnJpZGdlKHtcblx0XHRnZXQgb3BlbigpIHtcblx0XHRcdHJldHVybiBvcGVuO1xuXHRcdH0sXG5cdFx0Z2V0IGRpc3BsYXlTdGF0ZSgpIHtcblx0XHRcdHJldHVybiBkaXNwbGF5U3RhdGU7XG5cdFx0fSxcblx0XHRnZXQgY29sbGFwc2libGUoKSB7XG5cdFx0XHRyZXR1cm4gY29sbGFwc2libGU7XG5cdFx0fSxcblx0XHRzZXRPcGVuLFxuXHRcdHNldERpc3BsYXlTdGF0ZVByb3A6IChuZXh0RGlzcGxheVN0YXRlKSA9PiB7XG5cdFx0XHRkaXNwbGF5U3RhdGUgPSBuZXh0RGlzcGxheVN0YXRlO1xuXHRcdH0sXG5cdFx0Z2V0IG9uRGlzcGxheVN0YXRlQ2hhbmdlKCkge1xuXHRcdFx0cmV0dXJuIG9uRGlzcGxheVN0YXRlQ2hhbmdlO1xuXHRcdH1cblx0fSk7XG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgU2lkZWJhclN0YXRlQ29udHJvbGxlcih7XG5cdFx0Z2V0IG1vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbW9kZTtcblx0XHR9LFxuXHRcdGdldCBrZXlib2FyZFNob3J0Y3V0KCkge1xuXHRcdFx0cmV0dXJuIGtleWJvYXJkU2hvcnRjdXQ7XG5cdFx0fSxcblx0XHRnZXQgZGlzcGxheVN0YXRlKCkge1xuXHRcdFx0cmV0dXJuIGRpc3BsYXlTdGF0ZUJyaWRnZS5kaXNwbGF5U3RhdGU7XG5cdFx0fSxcblx0XHRnZXQgc2lkZSgpIHtcblx0XHRcdHJldHVybiBzaWRlO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbGxhcHNpYmxlKCkge1xuXHRcdFx0cmV0dXJuIGNvbGxhcHNpYmxlO1xuXHRcdH0sXG5cdFx0c2V0RGlzcGxheVN0YXRlOiBkaXNwbGF5U3RhdGVCcmlkZ2Uuc2V0RGlzcGxheVN0YXRlXG5cdH0pO1xuXHRjb25zdCByZXNpemUgPSBuZXcgU2lkZWJhclJlc2l6ZVN0YXRlKHtcblx0XHRnZXQgd2lkdGgoKSB7XG5cdFx0XHRyZXR1cm4gd2lkdGg7XG5cdFx0fSxcblx0XHRnZXQgcmVzaXphYmxlKCkge1xuXHRcdFx0cmV0dXJuIHJlc2l6YWJsZTtcblx0XHR9LFxuXHRcdGdldCBzaWRlKCkge1xuXHRcdFx0cmV0dXJuIHNpZGU7XG5cdFx0fSxcblx0XHRnZXQgZGlzcGxheVN0YXRlKCkge1xuXHRcdFx0cmV0dXJuIGNvbnRyb2xsZXIuZGlzcGxheVN0YXRlO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbGxhcHNpYmxlKCkge1xuXHRcdFx0cmV0dXJuIGNvbGxhcHNpYmxlO1xuXHRcdH0sXG5cdFx0c2V0V2lkdGgsXG5cdFx0c2V0RGlzcGxheVN0YXRlOiBkaXNwbGF5U3RhdGVCcmlkZ2Uuc2V0RGlzcGxheVN0YXRlXG5cdH0pO1xuXHRjb25zdCBhcGkgPSBjb250cm9sbGVyLmFwaTtcblx0Y29uc3QgY29sbGFwc2libGVTdGF0ZSA9ICRkZXJpdmVkKGNvbnRyb2xsZXIuY29sbGFwc2libGVTdGF0ZSk7XG5cdGNvbnN0IHBhbmVsV2lkdGggPSAkZGVyaXZlZChcblx0XHRtb2RlID09PSAncGFuZWwnICYmIGNvbnRyb2xsZXIuZGlzcGxheVN0YXRlID09PSAnY29sbGFwc2VkJyA/IHdpZHRoSWNvbiA6IHdpZHRoXG5cdCk7XG5cdGNvbnN0IHdpdGhCYW5uZXIgPSAkZGVyaXZlZCghIWJhbm5lcik7XG5cdGNvbnN0IHJvb3RDbGFzcyA9ICRkZXJpdmVkKFxuXHRcdGN4KFxuXHRcdFx0J2dyb3VwL3NpZGViYXItd3JhcHBlciBmbGV4IHctZnVsbCBiZy1iYWNrZ3JvdW5kLW11dGVkIHRleHQtZm9yZWdyb3VuZCcsXG5cdFx0XHRmcmFtZSA9PT0gJ3ZpZXdwb3J0J1xuXHRcdFx0XHQ/ICdoLXN2aCBtaW4taC0wIG92ZXJmbG93LWhpZGRlbidcblx0XHRcdFx0OiAncmVsYXRpdmUgaC1mdWxsIG1pbi1oLTAgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtW2luaGVyaXRdJyxcblx0XHRcdHdpdGhCYW5uZXIgJiYgJ2ZsZXgtY29sJyxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdClcblx0KTtcblx0Y29uc3Qgcm93Q2xhc3MgPSAkZGVyaXZlZChjeCgnZmxleCB3LWZ1bGwgZmxleC0xIG1pbi1oLTAnLCAhd2l0aEJhbm5lciAmJiAnY29udGVudHMnKSk7XG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmICghY29udHJvbGxlci5pc01vYmlsZSkge1xuXHRcdFx0Y29udHJvbGxlci5zZXRPcGVuTW9iaWxlKGZhbHNlKTtcblx0XHR9XG5cdH0pO1xuPC9zY3JpcHQ+XG5cbnsjc25pcHBldCBwYW5lbCgpfVxuXHQ8U2lkZWJhclBhbmVsXG5cdFx0e2FwaX1cblx0XHR7aXRlbXN9XG5cdFx0e2hlYWRlckJ1dHRvbn1cblx0XHR7c2VhcmNofVxuXHRcdHtoZWFkZXJNZW51fVxuXHRcdHtoZWFkZXJ9XG5cdFx0e2NvbnRlbnR9XG5cdFx0e2Zvb3RlckJ1dHRvbn1cblx0XHR7Zm9vdGVyTWVudX1cblx0XHR7Zm9vdGVyfVxuXHRcdHtjb2xsYXBzZUljb259XG5cdFx0e3Rvb2x0aXBzfVxuXHRcdHt0aGVtZX1cblx0Lz5cbnsvc25pcHBldH1cbnsjaWYgbW9kZSA9PT0gJ3BhbmVsJ31cblx0PGRpdlxuXHRcdGJpbmQ6dGhpcz17cmVmfVxuXHRcdGRhdGEtc2xvdD1cInNpZGViYXJcIlxuXHRcdGRhdGEtc2lkZWJhcj1cInNpZGViYXJcIlxuXHRcdGRhdGEtc3RhdGU9e2NvbnRyb2xsZXIuc3RhdGV9XG5cdFx0ZGF0YS1kaXNwbGF5LXN0YXRlPXtjb250cm9sbGVyLmRpc3BsYXlTdGF0ZX1cblx0XHRkYXRhLWNvbGxhcHNpYmxlPXtjb2xsYXBzaWJsZVN0YXRlfVxuXHRcdGRhdGEtdmFyaWFudD17dmFyaWFudH1cblx0XHRkYXRhLXNpZGU9e3NpZGV9XG5cdFx0c3R5bGU6LS1zaWRlYmFyLXdpZHRoPXtwYW5lbFdpZHRofVxuXHRcdHN0eWxlOi0tc2lkZWJhci13aWR0aC1pY29uPXt3aWR0aEljb259XG5cdFx0c3R5bGU6LS1zaWRlYmFyLXdpZHRoLW1vYmlsZT17d2lkdGhNb2JpbGV9XG5cdFx0Y2xhc3M9e2N4KCdncm91cCcsIGNsYXNzZXMucGFuZWwoeyB2YXJpYW50LCBwbGFjZW1lbnQ6ICdwYW5lbCcsIGNsYXNzTmFtZSB9KSl9XG5cdFx0ey4uLmF0dGFjaG1lbnRzfVxuXHQ+XG5cdFx0e0ByZW5kZXIgcGFuZWwoKX1cblx0PC9kaXY+XG57OmVsc2V9XG5cdDxkaXZcblx0XHRiaW5kOnRoaXM9e3JlZn1cblx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLXdyYXBwZXJcIlxuXHRcdGRhdGEtc3RhdGU9e2NvbnRyb2xsZXIuc3RhdGV9XG5cdFx0ZGF0YS1kaXNwbGF5LXN0YXRlPXtjb250cm9sbGVyLmRpc3BsYXlTdGF0ZX1cblx0XHRkYXRhLWNvbGxhcHNpYmxlPXtjb2xsYXBzaWJsZVN0YXRlfVxuXHRcdGRhdGEtdmFyaWFudD17dmFyaWFudH1cblx0XHRkYXRhLXNpZGU9e3NpZGV9XG5cdFx0ZGF0YS1mcmFtZT17ZnJhbWV9XG5cdFx0c3R5bGU6LS1zaWRlYmFyLXdpZHRoPXt3aWR0aH1cblx0XHRzdHlsZTotLXNpZGViYXItd2lkdGgtaWNvbj17d2lkdGhJY29ufVxuXHRcdHN0eWxlOi0tc2lkZWJhci13aWR0aC1tb2JpbGU9e3dpZHRoTW9iaWxlfVxuXHRcdGNsYXNzPXtyb290Q2xhc3N9XG5cdFx0ey4uLmF0dGFjaG1lbnRzfVxuXHQ+XG5cdFx0eyNpZiBiYW5uZXJ9e0ByZW5kZXIgYmFubmVyKGFwaSl9ey9pZn1cblx0XHQ8ZGl2IGNsYXNzPXtyb3dDbGFzc30+XG5cdFx0XHR7I2lmIGNvbnRyb2xsZXIuaXNNb2JpbGV9XG5cdFx0XHRcdDxTaWRlYmFyTW9iaWxlRHJhd2VyXG5cdFx0XHRcdFx0b3Blbj17Y29udHJvbGxlci5vcGVuTW9iaWxlfVxuXHRcdFx0XHRcdGNsb3NlPXsoKSA9PiBjb250cm9sbGVyLnNldE9wZW5Nb2JpbGUoZmFsc2UpfVxuXHRcdFx0XHRcdHtzaWRlfVxuXHRcdFx0XHRcdHt3aWR0aE1vYmlsZX1cblx0XHRcdFx0XHR7ZGlyfVxuXHRcdFx0XHRcdGxhYmVsPXtgJHt0LnNpZGViYXJ9ICR7dC5uYXZpZ2F0aW9ufWB9XG5cdFx0XHRcdFx0e3RoZW1lfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e0ByZW5kZXIgcGFuZWwoKX1cblx0XHRcdFx0PC9TaWRlYmFyTW9iaWxlRHJhd2VyPlxuXHRcdFx0ezplbHNlIGlmIGNvbGxhcHNpYmxlID09PSAnbm9uZSd9XG5cdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyXCJcblx0XHRcdFx0XHRkYXRhLXNpZGViYXI9XCJzaWRlYmFyXCJcblx0XHRcdFx0XHRkYXRhLXNpZGU9e3NpZGV9XG5cdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMucGFuZWwoeyB2YXJpYW50LCBwbGFjZW1lbnQ6ICdzdGF0aWMnIH0pfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e0ByZW5kZXIgcGFuZWwoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR7OmVsc2V9XG5cdFx0XHRcdDxTaWRlYmFyRGVza3RvcFNoZWxsXG5cdFx0XHRcdFx0c2lkZWJhclN0YXRlPXtjb250cm9sbGVyLnN0YXRlfVxuXHRcdFx0XHRcdGRpc3BsYXlTdGF0ZT17Y29udHJvbGxlci5kaXNwbGF5U3RhdGV9XG5cdFx0XHRcdFx0e2NvbGxhcHNpYmxlU3RhdGV9XG5cdFx0XHRcdFx0e3ZhcmlhbnR9XG5cdFx0XHRcdFx0e3NpZGV9XG5cdFx0XHRcdFx0e2ZyYW1lfVxuXHRcdFx0XHRcdHtyYWlsfVxuXHRcdFx0XHRcdHtlZGdlUmV2ZWFsfVxuXHRcdFx0XHRcdHRvZ2dsZUxhYmVsPXtgJHt0LnRvZ2dsZX0gJHt0LnNpZGViYXJ9YH1cblx0XHRcdFx0XHRvcGVuTGFiZWw9e2Ake3Qub3Blbn0gJHt0LnNpZGViYXJ9YH1cblx0XHRcdFx0XHR0b2dnbGU9e2NvbnRyb2xsZXIudG9nZ2xlfVxuXHRcdFx0XHRcdG9wZW49eygpID0+IGNvbnRyb2xsZXIuc2V0RGlzcGxheVN0YXRlKCdleHBhbmRlZCcpfVxuXHRcdFx0XHRcdHtyZXNpemV9XG5cdFx0XHRcdFx0e3RoZW1lfVxuXHRcdFx0XHRcdGJpbmQ6ZWRnZVJldmVhbGVkXG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7QHJlbmRlciBwYW5lbCgpfVxuXHRcdFx0XHQ8L1NpZGViYXJEZXNrdG9wU2hlbGw+XG5cdFx0XHR7L2lmfVxuXHRcdFx0PG1haW5cblx0XHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1tYWluXCJcblx0XHRcdFx0aW5lcnQ9e2NvbnRyb2xsZXIuaXNNb2JpbGUgJiYgY29udHJvbGxlci5vcGVuTW9iaWxlID8gdHJ1ZSA6IHVuZGVmaW5lZH1cblx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMubWFpbih7XG5cdFx0XHRcdFx0dmFyaWFudCxcblx0XHRcdFx0XHRzaWRlLFxuXHRcdFx0XHRcdGRpc3BsYXlTdGF0ZTogY29udHJvbGxlci5kaXNwbGF5U3RhdGUsXG5cdFx0XHRcdFx0ZWRnZVJldmVhbGVkXG5cdFx0XHRcdH0pfVxuXHRcdFx0PlxuXHRcdFx0XHR7QHJlbmRlciBjaGlsZHJlbj8uKGFwaSl9XG5cdFx0XHQ8L21haW4+XG5cdFx0PC9kaXY+XG5cdDwvZGl2Plxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFyLnN2ZWx0ZSJ9