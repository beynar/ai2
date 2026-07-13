import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/PopupMenu/PopupMenu.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PopupMenu[$.FILENAME] = 'src/lib/components/PopupMenu/PopupMenu.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Popover from "/src/lib/components/Popover/Popover.svelte";
import Menu from "/src/lib/components/Menu/Menu.svelte?t=1783864665558";
import { on } from "/node_modules/.vite/deps/svelte_events.js?v=1b1d2797";
import { hasSubmenuItems } from "/src/lib/components/Menu/menuTree.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'menu',
	'closeOnItemClick',
	'open',
	'closeOnEscape',
	'mobileSheet',
	'mobileSheetSizeTransition',
	'class'
]);

function PopupMenu($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PopupMenu);

	var $$ownership_validator = $.create_ownership_validator($$props);

	let closeOnItemClick = $.prop($$props, 'closeOnItemClick', 3, true),
		open = $.prop($$props, 'open', 15, false),
		closeOnEscape = $.prop($$props, 'closeOnEscape', 3, true),
		popoverProps = $.rest_props($$props, rest_excludes, 'popoverProps');

	// A menu-appropriate min-width so short-label menus (e.g. context menus) don't collapse to their
	// content. Overridable — a consumer `class` wins via tailwind-merge.
	const panelClass = $.tag($.derived(() => ['min-w-44', $$props.class].filter(Boolean).join(' ')), 'panelClass');

	const menuSubmenuMode = $.tag($.derived(() => $$props.menu.submenuMode ?? 'auto'), 'menuSubmenuMode');
	const usesStackedSubmenus = $.tag($.derived(() => hasSubmenuItems($$props.menu.items) && ($.strict_equals($.get(menuSubmenuMode), 'stack') || $.strict_equals($.get(menuSubmenuMode), 'auto') && !!$$props.mobileSheet)), 'usesStackedSubmenus');
	const resolvedMobileSheetSizeTransition = $.tag($.derived(() => $.get(usesStackedSubmenus) ? false : $$props.mobileSheetSizeTransition), 'resolvedMobileSheetSizeTransition');

	const closeOnClick = (popover) => (node) => {
		if (closeOnItemClick()) {
			return on(node, 'click', (e) => {
				const path = e.composedPath();
				const buttonOrLink = path.find((node) => node instanceof HTMLButtonElement || node instanceof HTMLAnchorElement);
				const shouldKeepOpen = path.some((node) => node instanceof HTMLElement && $.strict_equals(node.getAttribute('data-menu-keep-open'), 'true'));

				if (buttonOrLink && !shouldKeepOpen) {
					popover?.close();
				}
			});
		}
	};

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node_1 = $.first_child(fragment);

	{
		const children = $.wrap_snippet(PopupMenu, function ($$anchor, popover = $.noop) {
			$.validate_snippet_args(...arguments);

			var fragment_1 = $.comment();
			var node_2 = $.first_child(fragment_1);

			$.add_svelte_meta(
				() => Menu(node_2, $.spread_props({ focusOnMount: 'container' }, () => $$props.menu, {
					[$.attachment()]: ($$node) => (closeOnClick(popover()) || $.noop)($$node)
				})),
				'component',
				PopupMenu,
				62,
				2,
				{ componentTag: 'Menu' }
			);

			$.append($$anchor, fragment_1);
		});

		$$ownership_validator.binding('open', Popover, open);

		$.add_svelte_meta(
			() => Popover(node_1, $.spread_props(
				{
					size: 'small',
					get closeOnEscape() {
						return closeOnEscape();
					},

					get mobileSheet() {
						return $$props.mobileSheet;
					},

					get mobileSheetSizeTransition() {
						return $.get(resolvedMobileSheetSizeTransition);
					},

					get class() {
						return $.get(panelClass);
					}
				},
				() => popoverProps,
				{
					get open() {
						return open();
					},

					set open($$value) {
						open($$value);
					},
					children,
					$$slots: { default: true }
				}
			)),
			'component',
			PopupMenu,
			52,
			0,
			{ componentTag: 'Popover' }
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PopupMenu = $.hmr(PopupMenu);

	import.meta.hot.acceptExports(["default"],(module) => {
		PopupMenu[$.HMR].update(module.default);
	});
}

export default PopupMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxPQUFPLE1BQU0sMkJBQTJCO0FBQy9DLE9BQU8sSUFBSSxNQUFNLHFCQUFxQjtBQUV0QyxPQUFPLEVBQUUsRUFBRSxRQUFRLGVBQWU7QUFFbEMsT0FBTyxFQUFFLGVBQWUsUUFBUSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7OztzQ0FOdEQsQ0FBQzs7Ozs7O0NBUUEsSUFBSSxBQUVILGdCQUFnQiwwQ0FBRyxJQUFJO0VBQ3ZCLElBQUksK0JBQWEsS0FBSztFQUN0QixhQUFhLHVDQUFHLElBQUk7RUFJakI7Ozs7Q0FLSixNQUFNLFVBQVUsMEJBQWEsVUFBVSxpQkFBYSxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHOztDQUM1RSxNQUFNLGVBQWUsc0NBQWlCLFdBQVcsSUFBSSxNQUFNO0NBQzNELE1BQU0sbUJBQW1CLHlCQUN4QixlQUFlLGNBQU0sS0FBSyw0QkFDeEIsZUFBZSxHQUFLLE9BQU8sMkJBQUssZUFBZSxHQUFLLE1BQU07Q0FFN0QsTUFBTSxpQ0FBaUMsK0JBQ3RDLG1CQUFtQixJQUFHLEtBQUs7O0NBRzVCLE1BQU0sWUFBWSxJQUFJLE9BQXFCLE1BQU0sSUFBaUIsS0FBSztFQUN0RSxFQUFFLEVBQUUsZ0JBQWdCLElBQUU7R0FDckIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsS0FBSztJQUMvQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWTtJQUMzQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUM1QixJQUFJLEtBQUssSUFBSSxZQUFZLGlCQUFpQixJQUFJLElBQUksWUFBWTtJQUVoRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUM5QixJQUFJLEtBQ0osSUFBSSxZQUFZLFdBQVcsb0JBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBTSxNQUFLOztJQUduRixFQUFFLEVBQUUsWUFBWSxLQUFLLGNBQWMsRUFBRTtLQUNwQyxPQUFPLEVBQUUsS0FBSztJQUNmO0dBQ0QsQ0FBQztFQUNGO0NBQ0QsQ0FBQzs7Ozs7OztRQVlTLFFBQVEsaURBQUMsT0FBTzs7Ozs7OztVQUN4QixJQUFJO29DQUE2QyxZQUFZLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O1NBVnZFOzs7O2FBR0MsYUFBYTs7Ozs7Ozs7bUJBRWEsaUNBQWlDOzs7O21CQUNyRCxVQUFVOzs7VUFDYixZQUFZOztTQU5oQixJQUFLOzs7O1NBQUwsSUFBSzs7O0tBUUssUUFBUTs7Ozs7Ozs7Ozs7Ozs7O0FBWFgiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlBvcHVwTWVudS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFBvcG92ZXIgZnJvbSAnLi4vUG9wb3Zlci9Qb3BvdmVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBNZW51IGZyb20gJy4uL01lbnUvTWVudS5zdmVsdGUnO1xuXHRpbXBvcnQgdHlwZSB7IFBvcHVwTWVudVByb3BzIH0gZnJvbSAnLi9wb3B1cE1lbnUucHJvcHMuanMnO1xuXHRpbXBvcnQgeyBvbiB9IGZyb20gJ3N2ZWx0ZS9ldmVudHMnO1xuXHRpbXBvcnQgdHlwZSB7IFBvcG92ZXJTdGF0ZSB9IGZyb20gJy4uL1BvcG92ZXIvcG9wb3Zlci5zdGF0ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgeyBoYXNTdWJtZW51SXRlbXMgfSBmcm9tICcuLi9NZW51L21lbnVUcmVlLmpzJztcblxuXHRsZXQge1xuXHRcdG1lbnUsXG5cdFx0Y2xvc2VPbkl0ZW1DbGljayA9IHRydWUsXG5cdFx0b3BlbiA9ICRiaW5kYWJsZShmYWxzZSksXG5cdFx0Y2xvc2VPbkVzY2FwZSA9IHRydWUsXG5cdFx0bW9iaWxlU2hlZXQsXG5cdFx0bW9iaWxlU2hlZXRTaXplVHJhbnNpdGlvbixcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdC4uLnBvcG92ZXJQcm9wc1xuXHR9OiBQb3B1cE1lbnVQcm9wcyA9ICRwcm9wcygpO1xuXG5cdC8vIEEgbWVudS1hcHByb3ByaWF0ZSBtaW4td2lkdGggc28gc2hvcnQtbGFiZWwgbWVudXMgKGUuZy4gY29udGV4dCBtZW51cykgZG9uJ3QgY29sbGFwc2UgdG8gdGhlaXJcblx0Ly8gY29udGVudC4gT3ZlcnJpZGFibGUg4oCUIGEgY29uc3VtZXIgYGNsYXNzYCB3aW5zIHZpYSB0YWlsd2luZC1tZXJnZS5cblx0Y29uc3QgcGFuZWxDbGFzcyA9ICRkZXJpdmVkKFsnbWluLXctNDQnLCBjbGFzc05hbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJykpO1xuXHRjb25zdCBtZW51U3VibWVudU1vZGUgPSAkZGVyaXZlZChtZW51LnN1Ym1lbnVNb2RlID8/ICdhdXRvJyk7XG5cdGNvbnN0IHVzZXNTdGFja2VkU3VibWVudXMgPSAkZGVyaXZlZChcblx0XHRoYXNTdWJtZW51SXRlbXMobWVudS5pdGVtcykgJiZcblx0XHRcdChtZW51U3VibWVudU1vZGUgPT09ICdzdGFjaycgfHwgKG1lbnVTdWJtZW51TW9kZSA9PT0gJ2F1dG8nICYmICEhbW9iaWxlU2hlZXQpKVxuXHQpO1xuXHRjb25zdCByZXNvbHZlZE1vYmlsZVNoZWV0U2l6ZVRyYW5zaXRpb24gPSAkZGVyaXZlZChcblx0XHR1c2VzU3RhY2tlZFN1Ym1lbnVzID8gZmFsc2UgOiBtb2JpbGVTaGVldFNpemVUcmFuc2l0aW9uXG5cdCk7XG5cblx0Y29uc3QgY2xvc2VPbkNsaWNrID0gKHBvcG92ZXI6IFBvcG92ZXJTdGF0ZSkgPT4gKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGNsb3NlT25JdGVtQ2xpY2spIHtcblx0XHRcdHJldHVybiBvbihub2RlLCAnY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBwYXRoID0gZS5jb21wb3NlZFBhdGgoKTtcblx0XHRcdFx0Y29uc3QgYnV0dG9uT3JMaW5rID0gcGF0aC5maW5kKFxuXHRcdFx0XHRcdChub2RlKSA9PiBub2RlIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50XG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbnN0IHNob3VsZEtlZXBPcGVuID0gcGF0aC5zb21lKFxuXHRcdFx0XHRcdChub2RlKSA9PlxuXHRcdFx0XHRcdFx0bm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lbnUta2VlcC1vcGVuJykgPT09ICd0cnVlJ1xuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChidXR0b25PckxpbmsgJiYgIXNob3VsZEtlZXBPcGVuKSB7XG5cdFx0XHRcdFx0cG9wb3Zlcj8uY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuPC9zY3JpcHQ+XG5cbjxQb3BvdmVyXG5cdGJpbmQ6b3BlblxuXHRzaXplPVwic21hbGxcIlxuXHR7Y2xvc2VPbkVzY2FwZX1cblx0e21vYmlsZVNoZWV0fVxuXHRtb2JpbGVTaGVldFNpemVUcmFuc2l0aW9uPXtyZXNvbHZlZE1vYmlsZVNoZWV0U2l6ZVRyYW5zaXRpb259XG5cdGNsYXNzPXtwYW5lbENsYXNzfVxuXHR7Li4ucG9wb3ZlclByb3BzfVxuPlxuXHR7I3NuaXBwZXQgY2hpbGRyZW4ocG9wb3Zlcil9XG5cdFx0PE1lbnUgZm9jdXNPbk1vdW50PVwiY29udGFpbmVyXCIgey4uLm1lbnV9IHtAYXR0YWNoIGNsb3NlT25DbGljayhwb3BvdmVyKX0gLz5cblx0ey9zbmlwcGV0fVxuPC9Qb3BvdmVyPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9Qb3B1cE1lbnUvUG9wdXBNZW51LnN2ZWx0ZSJ9