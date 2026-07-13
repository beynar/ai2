import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarDesktopShell.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarDesktopShell[$.FILENAME] = 'src/lib/components/Sidebar/SidebarDesktopShell.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { getSidebarContainerClass, getSidebarGapClass } from "/src/lib/components/Sidebar/sidebar-layout.ts";
import { useSidebarTheme } from "/src/lib/components/Sidebar/sidebar.theme.ts";

var root = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-rail" data-sidebar="rail"></button>`), SidebarDesktopShell[$.FILENAME], [[140, 2]]);
var root_1 = $.add_locations($.from_html(`<div role="separator" tabindex="0" aria-orientation="vertical" aria-label="Resize sidebar" data-slot="sidebar-resize-handle" data-sidebar="resize-handle"></div>`), SidebarDesktopShell[$.FILENAME], [[154, 2]]);
var root_2 = $.add_locations($.from_html(`<button type="button" data-slot="sidebar-edge-trigger" data-sidebar="edge-trigger"></button>`), SidebarDesktopShell[$.FILENAME], [[177, 2]]);
var root_3 = $.add_locations($.from_html(`<div class="group peer relative hidden text-foreground md:block data-[side=right]:order-last" data-slot="sidebar"><div data-slot="sidebar-spacer"></div> <div data-slot="sidebar-container"><div data-sidebar="sidebar" data-slot="sidebar-panel"><!></div></div> <!> <!> <!></div>`), SidebarDesktopShell[$.FILENAME], [[112, 0, [[123, 1], [124, 1, [[130, 2]]]]]]);

function SidebarDesktopShell($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarDesktopShell);

	var $$ownership_validator = $.create_ownership_validator($$props);

	let edgeRevealed = $.prop($$props, 'edgeRevealed', 15, false),
		resize = $.prop($$props, 'resize', 7);

	const classes = $.tag($.derived(() => useSidebarTheme($$props.theme)), 'classes');
	const showEdgeTrigger = $.tag($.derived(() => $$props.edgeReveal && $.strict_equals($$props.displayState, 'hidden')), 'showEdgeTrigger');
	let panelRef = $.tag($.state(null), 'panelRef');
	let resizeHandleRef = $.tag($.state(null), 'resizeHandleRef');
	let edgeTriggerRef = $.tag($.state(null), 'edgeTriggerRef');

	function isPointerInside(element, event) {
		if (!element) return false;

		const bounds = element.getBoundingClientRect();

		return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
	}

	$.user_effect(() => {
		if ($.get(showEdgeTrigger)) return;

		edgeRevealed(false);
	});

	$.user_effect(() => {
		const node = $.get(panelRef);

		$$ownership_validator.mutation('resize', ['resize', 'panelNode'], resize().panelNode = node, 76, 2);

		return () => {
			if ($.strict_equals(resize().panelNode, node)) {
				$$ownership_validator.mutation('resize', ['resize', 'panelNode'], resize().panelNode = null, 79, 4);
			}
		};
	});

	$.user_effect(() => {
		const node = $.get(resizeHandleRef);

		if (!node) return;

		const onPointerDown = (event) => resize().handlePointerdown(event, node);
		const onKeydown = (event) => resize().handleKeydown(event);

		node.addEventListener('pointerdown', onPointerDown);
		node.addEventListener('keydown', onKeydown);

		return () => {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('keydown', onKeydown);
		};
	});

	$.user_effect(() => {
		if (!edgeRevealed()) return;

		const closeWhenPointerLeaves = (event) => {
			if (isPointerInside($.get(panelRef), event)) return;
			if (isPointerInside($.get(edgeTriggerRef), event)) return;

			edgeRevealed(false);
		};

		window.addEventListener('pointermove', closeWhenPointerLeaves);

		return () => window.removeEventListener('pointermove', closeWhenPointerLeaves);
	});

	var $$exports = { ...$.legacy_api() };
	var div = root_3();
	var div_1 = $.child(div);
	var div_2 = $.sibling(div_1, 2);
	var div_3 = $.child(div_2);
	var node_1 = $.child(div_3);

	$.add_svelte_meta(() => $.snippet(node_1, () => $$props.children), 'render', SidebarDesktopShell, 136, 3);
	$.reset(div_3);
	$.reset(div_2);
	$.bind_this(div_2, ($$value) => $.set(panelRef, $$value), () => $.get(panelRef));

	var node_2 = $.sibling(div_2, 2);

	{
		var consequent = ($$anchor) => {
			var button = root();

			$.set_attribute(button, 'tabindex', -1);

			$.template_effect(
				($0) => {
					$.set_attribute(button, 'data-side', $$props.side);
					$.set_attribute(button, 'aria-label', $$props.toggleLabel);
					$.set_attribute(button, 'title', $$props.toggleLabel);
					$.set_class(button, 1, $0);
				},
				[
					() => $.clsx($.get(classes).rail({ variant: $$props.variant, side: $$props.side }))
				]
			);

			$.delegated('click', button, function (...$$args) {
				$.apply(() => $$props.toggle, this, $$args, SidebarDesktopShell, [149, 12]);
			});

			$.append($$anchor, button);
		};

		$.add_svelte_meta(
			() => $.if(node_2, ($$render) => {
				if ($$props.rail) $$render(consequent);
			}),
			'if',
			SidebarDesktopShell,
			139,
			1
		);
	}

	var node_3 = $.sibling(node_2, 2);

	{
		var consequent_1 = ($$anchor) => {
			var div_4 = root_1();

			$.bind_this(div_4, ($$value) => $.set(resizeHandleRef, $$value), () => $.get(resizeHandleRef));

			$.template_effect(
				($0) => {
					$.set_attribute(div_4, 'aria-valuenow', resize().currentWidth);
					$.set_attribute(div_4, 'aria-valuemin', resize().minWidth);
					$.set_attribute(div_4, 'aria-valuemax', resize().maxWidth);
					$.set_attribute(div_4, 'aria-valuetext', `${resize().currentWidth}px`);
					$.set_attribute(div_4, 'data-side', $$props.side);
					$.set_attribute(div_4, 'data-dragging', resize().isDragging ? 'true' : undefined);
					$.set_class(div_4, 1, $0);
				},
				[
					() => $.clsx($.get(classes).resizeHandle({
						variant: $$props.variant,
						side: $$props.side,
						dragging: resize().isDragging,
						disabled: false
					}))
				]
			);

			$.append($$anchor, div_4);
		};

		$.add_svelte_meta(
			() => $.if(node_3, ($$render) => {
				if (resize().enabled) $$render(consequent_1);
			}),
			'if',
			SidebarDesktopShell,
			152,
			1
		);
	}

	var node_4 = $.sibling(node_3, 2);

	{
		var consequent_2 = ($$anchor) => {
			var button_1 = root_2();

			$.set_attribute(button_1, 'tabindex', -1);
			$.bind_this(button_1, ($$value) => $.set(edgeTriggerRef, $$value), () => $.get(edgeTriggerRef));

			$.template_effect(
				($0) => {
					$.set_attribute(button_1, 'data-side', $$props.side);
					$.set_attribute(button_1, 'aria-label', $$props.openLabel);
					$.set_attribute(button_1, 'title', $$props.openLabel);
					$.set_class(button_1, 1, $0);
				},
				[() => $.clsx($.get(classes).edgeTrigger())]
			);

			$.event('pointerenter', button_1, function pointerenter() {
				return edgeRevealed(true);
			});

			$.event('focus', button_1, function focus() {
				return edgeRevealed(true);
			});

			$.delegated('click', button_1, function (...$$args) {
				$.apply(() => $$props.open, this, $$args, SidebarDesktopShell, [189, 12]);
			});

			$.append($$anchor, button_1);
		};

		$.add_svelte_meta(
			() => $.if(node_4, ($$render) => {
				if ($.get(showEdgeTrigger)) $$render(consequent_2);
			}),
			'if',
			SidebarDesktopShell,
			176,
			1
		);
	}

	$.reset(div);

	$.template_effect(
		($0, $1, $2) => {
			$.set_attribute(div, 'data-state', $$props.sidebarState);
			$.set_attribute(div, 'data-display-state', $$props.displayState);
			$.set_attribute(div, 'data-resizing', resize().isResizing ? 'true' : undefined);
			$.set_attribute(div, 'data-edge-revealed', edgeRevealed() ? 'true' : undefined);
			$.set_attribute(div, 'data-collapsible', $$props.collapsibleState);
			$.set_attribute(div, 'data-variant', $$props.variant);
			$.set_attribute(div, 'data-side', $$props.side);
			$.set_class(div_1, 1, $0);
			$.set_attribute(div_2, 'data-side', $$props.side);
			$.set_class(div_2, 1, $1);
			$.set_attribute(div_3, 'data-side', $$props.side);
			$.set_class(div_3, 1, $2);
		},
		[
			() => $.clsx(getSidebarGapClass($$props.variant)),
			() => $.clsx(getSidebarContainerClass($$props.side, $$props.variant, edgeRevealed(), $$props.frame)),
			() => $.clsx($.get(classes).panel({ variant: $$props.variant, placement: 'positioned' }))
		]
	);

	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarDesktopShell = $.hmr(SidebarDesktopShell);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarDesktopShell[$.HMR].update(module.default);
	});
}

export default SidebarDesktopShell;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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OztvQkF0QnpEOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2lkZWJhckRlc2t0b3BTaGVsbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHR5cGUgeyBTbmlwcGV0IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHtcblx0XHR0eXBlIFNpZGViYXJDb2xsYXBzaWJsZSxcblx0XHR0eXBlIFNpZGViYXJEaXNwbGF5U3RhdGUsXG5cdFx0dHlwZSBTaWRlYmFyRnJhbWUsXG5cdFx0dHlwZSBTaWRlYmFyU2lkZSxcblx0XHR0eXBlIFNpZGViYXJTdGF0ZSxcblx0XHR0eXBlIFNpZGViYXJWYXJpYW50XG5cdH0gZnJvbSAnLi9zaWRlYmFyLnByb3BzLmpzJztcblx0aW1wb3J0IHsgZ2V0U2lkZWJhckNvbnRhaW5lckNsYXNzLCBnZXRTaWRlYmFyR2FwQ2xhc3MgfSBmcm9tICcuL3NpZGViYXItbGF5b3V0LmpzJztcblx0aW1wb3J0IHR5cGUgeyBTaWRlYmFyUmVzaXplU3RhdGUgfSBmcm9tICcuL3NpZGViYXIucmVzaXplLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IHVzZVNpZGViYXJUaGVtZSwgdHlwZSBTaWRlYmFyVGhlbWVQcm9wcyB9IGZyb20gJy4vc2lkZWJhci50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRzaWRlYmFyU3RhdGUsXG5cdFx0ZGlzcGxheVN0YXRlLFxuXHRcdGNvbGxhcHNpYmxlU3RhdGUsXG5cdFx0dmFyaWFudCxcblx0XHRzaWRlLFxuXHRcdGZyYW1lLFxuXHRcdHJhaWwsXG5cdFx0ZWRnZVJldmVhbCxcblx0XHR0b2dnbGVMYWJlbCxcblx0XHRvcGVuTGFiZWwsXG5cdFx0dG9nZ2xlLFxuXHRcdG9wZW4sXG5cdFx0ZWRnZVJldmVhbGVkID0gJGJpbmRhYmxlKGZhbHNlKSxcblx0XHRyZXNpemUsXG5cdFx0dGhlbWUsXG5cdFx0Y2hpbGRyZW5cblx0fToge1xuXHRcdHNpZGViYXJTdGF0ZTogU2lkZWJhclN0YXRlO1xuXHRcdGRpc3BsYXlTdGF0ZTogU2lkZWJhckRpc3BsYXlTdGF0ZTtcblx0XHRjb2xsYXBzaWJsZVN0YXRlOiBTaWRlYmFyQ29sbGFwc2libGUgfCAnJztcblx0XHR2YXJpYW50OiBTaWRlYmFyVmFyaWFudDtcblx0XHRzaWRlOiBTaWRlYmFyU2lkZTtcblx0XHRmcmFtZTogU2lkZWJhckZyYW1lO1xuXHRcdHJhaWw6IGJvb2xlYW47XG5cdFx0ZWRnZVJldmVhbDogYm9vbGVhbjtcblx0XHR0b2dnbGVMYWJlbDogc3RyaW5nO1xuXHRcdG9wZW5MYWJlbDogc3RyaW5nO1xuXHRcdHRvZ2dsZTogKCkgPT4gdm9pZDtcblx0XHRvcGVuOiAoKSA9PiB2b2lkO1xuXHRcdGVkZ2VSZXZlYWxlZD86IGJvb2xlYW47XG5cdFx0cmVzaXplOiBTaWRlYmFyUmVzaXplU3RhdGU7XG5cdFx0dGhlbWU/OiBTaWRlYmFyVGhlbWVQcm9wcztcblx0XHRjaGlsZHJlbjogU25pcHBldDtcblx0fSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VTaWRlYmFyVGhlbWUodGhlbWUpKTtcblx0Y29uc3Qgc2hvd0VkZ2VUcmlnZ2VyID0gJGRlcml2ZWQoZWRnZVJldmVhbCAmJiBkaXNwbGF5U3RhdGUgPT09ICdoaWRkZW4nKTtcblxuXHRsZXQgcGFuZWxSZWY6IEhUTUxFbGVtZW50IHwgbnVsbCA9ICRzdGF0ZShudWxsKTtcblx0bGV0IHJlc2l6ZUhhbmRsZVJlZjogSFRNTEVsZW1lbnQgfCBudWxsID0gJHN0YXRlKG51bGwpO1xuXHRsZXQgZWRnZVRyaWdnZXJSZWY6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9ICRzdGF0ZShudWxsKTtcblxuXHRmdW5jdGlvbiBpc1BvaW50ZXJJbnNpZGUoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsLCBldmVudDogUG9pbnRlckV2ZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50KSByZXR1cm4gZmFsc2U7XG5cdFx0Y29uc3QgYm91bmRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZXZlbnQuY2xpZW50WCA+PSBib3VuZHMubGVmdCAmJlxuXHRcdFx0ZXZlbnQuY2xpZW50WCA8PSBib3VuZHMucmlnaHQgJiZcblx0XHRcdGV2ZW50LmNsaWVudFkgPj0gYm91bmRzLnRvcCAmJlxuXHRcdFx0ZXZlbnQuY2xpZW50WSA8PSBib3VuZHMuYm90dG9tXG5cdFx0KTtcblx0fVxuXG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChzaG93RWRnZVRyaWdnZXIpIHJldHVybjtcblx0XHRlZGdlUmV2ZWFsZWQgPSBmYWxzZTtcblx0fSk7XG5cblx0JGVmZmVjdCgoKSA9PiB7XG5cdFx0Y29uc3Qgbm9kZSA9IHBhbmVsUmVmO1xuXHRcdHJlc2l6ZS5wYW5lbE5vZGUgPSBub2RlO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRpZiAocmVzaXplLnBhbmVsTm9kZSA9PT0gbm9kZSkge1xuXHRcdFx0XHRyZXNpemUucGFuZWxOb2RlID0gbnVsbDtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHQkZWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCBub2RlID0gcmVzaXplSGFuZGxlUmVmO1xuXHRcdGlmICghbm9kZSkgcmV0dXJuO1xuXG5cdFx0Y29uc3Qgb25Qb2ludGVyRG93biA9IChldmVudDogUG9pbnRlckV2ZW50KSA9PiByZXNpemUuaGFuZGxlUG9pbnRlcmRvd24oZXZlbnQsIG5vZGUpO1xuXHRcdGNvbnN0IG9uS2V5ZG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gcmVzaXplLmhhbmRsZUtleWRvd24oZXZlbnQpO1xuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duKTtcblx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93bik7XG5cdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuXHRcdH07XG5cdH0pO1xuXG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmICghZWRnZVJldmVhbGVkKSByZXR1cm47XG5cblx0XHRjb25zdCBjbG9zZVdoZW5Qb2ludGVyTGVhdmVzID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcblx0XHRcdGlmIChpc1BvaW50ZXJJbnNpZGUocGFuZWxSZWYsIGV2ZW50KSkgcmV0dXJuO1xuXHRcdFx0aWYgKGlzUG9pbnRlckluc2lkZShlZGdlVHJpZ2dlclJlZiwgZXZlbnQpKSByZXR1cm47XG5cdFx0XHRlZGdlUmV2ZWFsZWQgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgY2xvc2VXaGVuUG9pbnRlckxlYXZlcyk7XG5cdFx0cmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIGNsb3NlV2hlblBvaW50ZXJMZWF2ZXMpO1xuXHR9KTtcbjwvc2NyaXB0PlxuXG48ZGl2XG5cdGNsYXNzPVwiZ3JvdXAgcGVlciByZWxhdGl2ZSBoaWRkZW4gdGV4dC1mb3JlZ3JvdW5kIG1kOmJsb2NrIGRhdGEtW3NpZGU9cmlnaHRdOm9yZGVyLWxhc3RcIlxuXHRkYXRhLXNsb3Q9XCJzaWRlYmFyXCJcblx0ZGF0YS1zdGF0ZT17c2lkZWJhclN0YXRlfVxuXHRkYXRhLWRpc3BsYXktc3RhdGU9e2Rpc3BsYXlTdGF0ZX1cblx0ZGF0YS1yZXNpemluZz17cmVzaXplLmlzUmVzaXppbmcgPyAndHJ1ZScgOiB1bmRlZmluZWR9XG5cdGRhdGEtZWRnZS1yZXZlYWxlZD17ZWRnZVJldmVhbGVkID8gJ3RydWUnIDogdW5kZWZpbmVkfVxuXHRkYXRhLWNvbGxhcHNpYmxlPXtjb2xsYXBzaWJsZVN0YXRlfVxuXHRkYXRhLXZhcmlhbnQ9e3ZhcmlhbnR9XG5cdGRhdGEtc2lkZT17c2lkZX1cbj5cblx0PGRpdiBkYXRhLXNsb3Q9XCJzaWRlYmFyLXNwYWNlclwiIGNsYXNzPXtnZXRTaWRlYmFyR2FwQ2xhc3ModmFyaWFudCl9PjwvZGl2PlxuXHQ8ZGl2XG5cdFx0YmluZDp0aGlzPXtwYW5lbFJlZn1cblx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLWNvbnRhaW5lclwiXG5cdFx0ZGF0YS1zaWRlPXtzaWRlfVxuXHRcdGNsYXNzPXtnZXRTaWRlYmFyQ29udGFpbmVyQ2xhc3Moc2lkZSwgdmFyaWFudCwgZWRnZVJldmVhbGVkLCBmcmFtZSl9XG5cdD5cblx0XHQ8ZGl2XG5cdFx0XHRkYXRhLXNpZGViYXI9XCJzaWRlYmFyXCJcblx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItcGFuZWxcIlxuXHRcdFx0ZGF0YS1zaWRlPXtzaWRlfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMucGFuZWwoeyB2YXJpYW50LCBwbGFjZW1lbnQ6ICdwb3NpdGlvbmVkJyB9KX1cblx0XHQ+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbigpfVxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cblx0eyNpZiByYWlsfVxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0ZGF0YS1zbG90PVwic2lkZWJhci1yYWlsXCJcblx0XHRcdGRhdGEtc2lkZWJhcj1cInJhaWxcIlxuXHRcdFx0ZGF0YS1zaWRlPXtzaWRlfVxuXHRcdFx0YXJpYS1sYWJlbD17dG9nZ2xlTGFiZWx9XG5cdFx0XHR0YWJpbmRleD17LTF9XG5cdFx0XHR0aXRsZT17dG9nZ2xlTGFiZWx9XG5cdFx0XHRjbGFzcz17Y2xhc3Nlcy5yYWlsKHsgdmFyaWFudCwgc2lkZSB9KX1cblx0XHRcdG9uY2xpY2s9e3RvZ2dsZX1cblx0XHQ+PC9idXR0b24+XG5cdHsvaWZ9XG5cdHsjaWYgcmVzaXplLmVuYWJsZWR9XG5cdFx0PCEtLSBzdmVsdGUtaWdub3JlIGExMXlfbm9fbm9uaW50ZXJhY3RpdmVfdGFiaW5kZXgsIGExMXlfbm9fbm9uaW50ZXJhY3RpdmVfZWxlbWVudF9pbnRlcmFjdGlvbnMgLS0+XG5cdFx0PGRpdlxuXHRcdFx0YmluZDp0aGlzPXtyZXNpemVIYW5kbGVSZWZ9XG5cdFx0XHRyb2xlPVwic2VwYXJhdG9yXCJcblx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRhcmlhLW9yaWVudGF0aW9uPVwidmVydGljYWxcIlxuXHRcdFx0YXJpYS12YWx1ZW5vdz17cmVzaXplLmN1cnJlbnRXaWR0aH1cblx0XHRcdGFyaWEtdmFsdWVtaW49e3Jlc2l6ZS5taW5XaWR0aH1cblx0XHRcdGFyaWEtdmFsdWVtYXg9e3Jlc2l6ZS5tYXhXaWR0aH1cblx0XHRcdGFyaWEtdmFsdWV0ZXh0PXtgJHtyZXNpemUuY3VycmVudFdpZHRofXB4YH1cblx0XHRcdGFyaWEtbGFiZWw9XCJSZXNpemUgc2lkZWJhclwiXG5cdFx0XHRkYXRhLXNsb3Q9XCJzaWRlYmFyLXJlc2l6ZS1oYW5kbGVcIlxuXHRcdFx0ZGF0YS1zaWRlYmFyPVwicmVzaXplLWhhbmRsZVwiXG5cdFx0XHRkYXRhLXNpZGU9e3NpZGV9XG5cdFx0XHRkYXRhLWRyYWdnaW5nPXtyZXNpemUuaXNEcmFnZ2luZyA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLnJlc2l6ZUhhbmRsZSh7XG5cdFx0XHRcdHZhcmlhbnQsXG5cdFx0XHRcdHNpZGUsXG5cdFx0XHRcdGRyYWdnaW5nOiByZXNpemUuaXNEcmFnZ2luZyxcblx0XHRcdFx0ZGlzYWJsZWQ6IGZhbHNlXG5cdFx0XHR9KX1cblx0XHQ+PC9kaXY+XG5cdHsvaWZ9XG5cdHsjaWYgc2hvd0VkZ2VUcmlnZ2VyfVxuXHRcdDxidXR0b25cblx0XHRcdGJpbmQ6dGhpcz17ZWRnZVRyaWdnZXJSZWZ9XG5cdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdGRhdGEtc2xvdD1cInNpZGViYXItZWRnZS10cmlnZ2VyXCJcblx0XHRcdGRhdGEtc2lkZWJhcj1cImVkZ2UtdHJpZ2dlclwiXG5cdFx0XHRkYXRhLXNpZGU9e3NpZGV9XG5cdFx0XHRhcmlhLWxhYmVsPXtvcGVuTGFiZWx9XG5cdFx0XHR0YWJpbmRleD17LTF9XG5cdFx0XHR0aXRsZT17b3BlbkxhYmVsfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuZWRnZVRyaWdnZXIoKX1cblx0XHRcdG9ucG9pbnRlcmVudGVyPXsoKSA9PiAoZWRnZVJldmVhbGVkID0gdHJ1ZSl9XG5cdFx0XHRvbmZvY3VzPXsoKSA9PiAoZWRnZVJldmVhbGVkID0gdHJ1ZSl9XG5cdFx0XHRvbmNsaWNrPXtvcGVufVxuXHRcdD48L2J1dHRvbj5cblx0ey9pZn1cbjwvZGl2PlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9TaWRlYmFyL1NpZGViYXJEZXNrdG9wU2hlbGwuc3ZlbHRlIn0=