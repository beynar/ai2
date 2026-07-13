import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/PageShell/PageShell.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PageShell[$.FILENAME] = 'src/lib/components/PageShell/PageShell.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PageShellFooter from "/src/lib/components/PageShell/PageShellFooter.svelte?t=1783864665558";
import PageShellHeader from "/src/lib/components/PageShell/PageShellHeader.svelte?t=1783864665558";
import { PageShellState } from "/src/lib/components/PageShell/pageShell.state.svelte.ts";
import { usePageShellTheme } from "/src/lib/components/PageShell/pageShell.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'ref',
	'title',
	'subtitle',
	'eyebrow',
	'breadcrumbs',
	'breadcrumbsMaxItems',
	'back',
	'header',
	'headerActions',
	'footer',
	'footerActions',
	'contentPadding',
	'contentWidth',
	'actionOverflow',
	'mobileActionCount',
	'children',
	'class',
	'theme'
]);

var root = $.add_locations($.from_html(`<div><!> <main data-slot="page-shell-content"><div data-slot="page-shell-content-inner"><!></div></main> <!></div>`), PageShell[$.FILENAME], [[87, 0, [[98, 1, [[99, 2]]]]]]);

function PageShell($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PageShell);

	let ref = $.prop($$props, 'ref', 15),
		breadcrumbsMaxItems = $.prop($$props, 'breadcrumbsMaxItems', 3, 4),
		contentPadding = $.prop($$props, 'contentPadding', 3, 'none'),
		contentWidth = $.prop($$props, 'contentWidth', 3, 'full'),
		actionOverflow = $.prop($$props, 'actionOverflow', 3, 'auto'),
		mobileActionCount = $.prop($$props, 'mobileActionCount', 3, 1),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	let isContentScrolled = $.tag($.state(false), 'isContentScrolled');

	function updateContentScroll(event) {
		$.set(isContentScrolled, event.currentTarget.scrollTop > 0);
	}

	const shell = new PageShellState({
		get eyebrow() {
			return $$props.eyebrow;
		},

		get breadcrumbs() {
			return $$props.breadcrumbs;
		},

		get breadcrumbsMaxItems() {
			return breadcrumbsMaxItems();
		},

		get back() {
			return $$props.back;
		},

		get title() {
			return $$props.title;
		},

		get subtitle() {
			return $$props.subtitle;
		},

		get header() {
			return $$props.header;
		},

		get headerActions() {
			return $$props.headerActions;
		},

		get footer() {
			return $$props.footer;
		},

		get footerActions() {
			return $$props.footerActions;
		},

		get contentPadding() {
			return contentPadding();
		},

		get contentWidth() {
			return contentWidth();
		},

		get actionOverflow() {
			return actionOverflow();
		},

		get mobileActionCount() {
			return mobileActionCount();
		},

		get isContentScrolled() {
			return $.get(isContentScrolled);
		}
	});

	const classes = $.tag($.derived(() => usePageShellTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var div = root();

	$.attribute_effect(
		div,
		($0) => ({
			'data-slot': 'page-shell',
			'data-scrolled': $.get(isContentScrolled) ? 'true' : undefined,
			class: $0,
			...attachments
		}),
		[() => $.get(classes).root({ className: $$props.class })]
	);

	var node = $.child(div);

	{
		var consequent = ($$anchor) => {
			var fragment = $.comment();
			var node_1 = $.first_child(fragment);

			$.add_svelte_meta(
				() => PageShellHeader(node_1, {
					get api() {
						return shell.api;
					},

					get theme() {
						return $$props.theme;
					}
				}),
				'component',
				PageShell,
				95,
				2,
				{ componentTag: 'PageShellHeader' }
			);

			$.append($$anchor, fragment);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if (shell.hasHeader) $$render(consequent);
			}),
			'if',
			PageShell,
			94,
			1
		);
	}

	var main = $.sibling(node, 2);
	var div_1 = $.child(main);
	var node_2 = $.child(div_1);

	$.add_svelte_meta(() => $.snippet(node_2, () => $$props.children, () => shell.api), 'render', PageShell, 106, 3);
	$.reset(div_1);
	$.reset(main);

	var node_3 = $.sibling(main, 2);

	{
		var consequent_1 = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_4 = $.first_child(fragment_1);

			$.add_svelte_meta(
				() => PageShellFooter(node_4, {
					get api() {
						return shell.api;
					},

					get theme() {
						return $$props.theme;
					}
				}),
				'component',
				PageShell,
				111,
				2,
				{ componentTag: 'PageShellFooter' }
			);

			$.append($$anchor, fragment_1);
		};

		$.add_svelte_meta(
			() => $.if(node_3, ($$render) => {
				if (shell.hasFooter) $$render(consequent_1);
			}),
			'if',
			PageShell,
			110,
			1
		);
	}

	$.reset(div);
	$.bind_this(div, ($$value) => ref($$value), () => ref());

	$.template_effect(
		($0, $1) => {
			$.set_class(main, 1, $0);
			$.set_class(div_1, 1, $1);
		},
		[
			() => $.clsx($.get(classes).content()),
			() => $.clsx($.get(classes).contentInner({
				padding: shell.api.contentPadding ?? 'none',
				width: shell.api.contentWidth ?? 'full'
			}))
		]
	);

	$.event('scroll', main, updateContentScroll);
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PageShell = $.hmr(PageShell);

	import.meta.hot.acceptExports(["default"],(module) => {
		PageShell[$.HMR].update(module.default);
	});
}

export default PageShell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU8sZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPLEVBQUUsY0FBYyxRQUFRLDZCQUE2QjtBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLFFBQVEsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQUx6RCxDQUFDOzs7O0NBT0EsSUFBSSxBQUNILEdBQUc7RUFLSCxtQkFBbUIsNkNBQUcsQ0FBQztFQU12QixjQUFjLHdDQUFHLE1BQU07RUFDdkIsWUFBWSxzQ0FBRyxNQUFNO0VBQ3JCLGNBQWMsd0NBQUcsTUFBTTtFQUN2QixpQkFBaUIsMkNBQUcsQ0FBQztFQUlsQjs7Q0FHSixJQUFJLGlCQUFpQixTQUFHLE9BQU0sQ0FBQyxLQUFLOztDQUVwQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBNkMsRUFBRTtRQUMzRSxpQkFBaUIsRUFBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDO0NBQ3REOztDQUVBLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjO0VBQy9CLElBQUksT0FBTyxHQUFHO0dBQ2IsTUFBTTtFQUNQLENBQUM7O0VBQ0QsSUFBSSxXQUFXLEdBQUc7R0FDakIsTUFBTTtFQUNQLENBQUM7O0VBQ0QsSUFBSSxtQkFBbUIsR0FBRztHQUN6QixNQUFNLENBQUMsbUJBQW1CO0VBQzNCLENBQUM7O0VBQ0QsSUFBSSxJQUFJLEdBQUc7R0FDVixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLEtBQUssR0FBRztHQUNYLE1BQU07RUFDUCxDQUFDOztFQUNELElBQUksUUFBUSxHQUFHO0dBQ2QsTUFBTTtFQUNQLENBQUM7O0VBQ0QsSUFBSSxNQUFNLEdBQUc7R0FDWixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLGFBQWEsR0FBRztHQUNuQixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLE1BQU0sR0FBRztHQUNaLE1BQU07RUFDUCxDQUFDOztFQUNELElBQUksYUFBYSxHQUFHO0dBQ25CLE1BQU07RUFDUCxDQUFDOztFQUNELElBQUksY0FBYyxHQUFHO0dBQ3BCLE1BQU0sQ0FBQyxjQUFjO0VBQ3RCLENBQUM7O0VBQ0QsSUFBSSxZQUFZLEdBQUc7R0FDbEIsTUFBTSxDQUFDLFlBQVk7RUFDcEIsQ0FBQzs7RUFDRCxJQUFJLGNBQWMsR0FBRztHQUNwQixNQUFNLENBQUMsY0FBYztFQUN0QixDQUFDOztFQUNELElBQUksaUJBQWlCLEdBQUc7R0FDdkIsTUFBTSxDQUFDLGlCQUFpQjtFQUN6QixDQUFDOztFQUNELElBQUksaUJBQWlCLEdBQUc7R0FDdkIsTUFBTSxPQUFDLGlCQUFpQjtFQUN6Qjs7O0NBR0QsTUFBTSxPQUFPLHlCQUFZLGlCQUFpQjs7S0FHMUM7OztFQUFBOzs7MEJBR2UsaUJBQWlCLElBQUcsTUFBTSxHQUFHLFNBQVM7O01BRWpELFdBQVc7O2VBRFIsT0FBTyxFQUFDLElBQUksR0FBRyxTQUFTOzs7b0JBSi9COzs7Ozs7OztVQVFFLGVBQWU7O2FBQU0sS0FBSyxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFEM0IsS0FBSyxDQUFDLFNBQVM7Ozs7Ozs7OztLQUluQixJQUFJO0tBQ0gsZ0JBREQsSUFBSTtzQkFDSDs7eUVBT2tCLEtBQUssQ0FBQyxHQUFHO1NBUDNCO1NBREQsSUFBSTs7d0JBQUosSUFBSTs7Ozs7Ozs7VUFhSCxlQUFlOzthQUFNLEtBQUssQ0FBQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRDNCLEtBQUssQ0FBQyxTQUFTOzs7Ozs7Ozs7U0F2QnBCO2FBQUEsa0JBQ1csR0FBRyxpQkFBSCxHQUFHOzs7O2VBVWIsSUFBSTtlQUNIOzs7c0JBRDBDLE9BQU8sRUFBQyxPQUFPO3NCQUdsRCxPQUFPLEVBQUMsWUFBWTtJQUMxQixPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksTUFBTTtJQUMzQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksTUFBSzs7Ozs7bUJBTHhDLElBQUksRUFBb0UsbUJBQW1CO29CQVg1Rjs7O0FBRk8iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlBhZ2VTaGVsbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHR5cGUgeyBQYWdlU2hlbGxQcm9wcyB9IGZyb20gJy4vcGFnZVNoZWxsLnByb3BzLmpzJztcblx0aW1wb3J0IFBhZ2VTaGVsbEZvb3RlciBmcm9tICcuL1BhZ2VTaGVsbEZvb3Rlci5zdmVsdGUnO1xuXHRpbXBvcnQgUGFnZVNoZWxsSGVhZGVyIGZyb20gJy4vUGFnZVNoZWxsSGVhZGVyLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IFBhZ2VTaGVsbFN0YXRlIH0gZnJvbSAnLi9wYWdlU2hlbGwuc3RhdGUuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgdXNlUGFnZVNoZWxsVGhlbWUgfSBmcm9tICcuL3BhZ2VTaGVsbC50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRyZWYgPSAkYmluZGFibGUoKSxcblx0XHR0aXRsZSxcblx0XHRzdWJ0aXRsZSxcblx0XHRleWVicm93LFxuXHRcdGJyZWFkY3J1bWJzLFxuXHRcdGJyZWFkY3J1bWJzTWF4SXRlbXMgPSA0LFxuXHRcdGJhY2ssXG5cdFx0aGVhZGVyLFxuXHRcdGhlYWRlckFjdGlvbnMsXG5cdFx0Zm9vdGVyLFxuXHRcdGZvb3RlckFjdGlvbnMsXG5cdFx0Y29udGVudFBhZGRpbmcgPSAnbm9uZScsXG5cdFx0Y29udGVudFdpZHRoID0gJ2Z1bGwnLFxuXHRcdGFjdGlvbk92ZXJmbG93ID0gJ2F1dG8nLFxuXHRcdG1vYmlsZUFjdGlvbkNvdW50ID0gMSxcblx0XHRjaGlsZHJlbixcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IFBhZ2VTaGVsbFByb3BzID0gJHByb3BzKCk7XG5cblx0bGV0IGlzQ29udGVudFNjcm9sbGVkID0gJHN0YXRlKGZhbHNlKTtcblxuXHRmdW5jdGlvbiB1cGRhdGVDb250ZW50U2Nyb2xsKGV2ZW50OiBFdmVudCAmIHsgY3VycmVudFRhcmdldDogSFRNTEVsZW1lbnQgfSkge1xuXHRcdGlzQ29udGVudFNjcm9sbGVkID0gZXZlbnQuY3VycmVudFRhcmdldC5zY3JvbGxUb3AgPiAwO1xuXHR9XG5cblx0Y29uc3Qgc2hlbGwgPSBuZXcgUGFnZVNoZWxsU3RhdGUoe1xuXHRcdGdldCBleWVicm93KCkge1xuXHRcdFx0cmV0dXJuIGV5ZWJyb3c7XG5cdFx0fSxcblx0XHRnZXQgYnJlYWRjcnVtYnMoKSB7XG5cdFx0XHRyZXR1cm4gYnJlYWRjcnVtYnM7XG5cdFx0fSxcblx0XHRnZXQgYnJlYWRjcnVtYnNNYXhJdGVtcygpIHtcblx0XHRcdHJldHVybiBicmVhZGNydW1ic01heEl0ZW1zO1xuXHRcdH0sXG5cdFx0Z2V0IGJhY2soKSB7XG5cdFx0XHRyZXR1cm4gYmFjaztcblx0XHR9LFxuXHRcdGdldCB0aXRsZSgpIHtcblx0XHRcdHJldHVybiB0aXRsZTtcblx0XHR9LFxuXHRcdGdldCBzdWJ0aXRsZSgpIHtcblx0XHRcdHJldHVybiBzdWJ0aXRsZTtcblx0XHR9LFxuXHRcdGdldCBoZWFkZXIoKSB7XG5cdFx0XHRyZXR1cm4gaGVhZGVyO1xuXHRcdH0sXG5cdFx0Z2V0IGhlYWRlckFjdGlvbnMoKSB7XG5cdFx0XHRyZXR1cm4gaGVhZGVyQWN0aW9ucztcblx0XHR9LFxuXHRcdGdldCBmb290ZXIoKSB7XG5cdFx0XHRyZXR1cm4gZm9vdGVyO1xuXHRcdH0sXG5cdFx0Z2V0IGZvb3RlckFjdGlvbnMoKSB7XG5cdFx0XHRyZXR1cm4gZm9vdGVyQWN0aW9ucztcblx0XHR9LFxuXHRcdGdldCBjb250ZW50UGFkZGluZygpIHtcblx0XHRcdHJldHVybiBjb250ZW50UGFkZGluZztcblx0XHR9LFxuXHRcdGdldCBjb250ZW50V2lkdGgoKSB7XG5cdFx0XHRyZXR1cm4gY29udGVudFdpZHRoO1xuXHRcdH0sXG5cdFx0Z2V0IGFjdGlvbk92ZXJmbG93KCkge1xuXHRcdFx0cmV0dXJuIGFjdGlvbk92ZXJmbG93O1xuXHRcdH0sXG5cdFx0Z2V0IG1vYmlsZUFjdGlvbkNvdW50KCkge1xuXHRcdFx0cmV0dXJuIG1vYmlsZUFjdGlvbkNvdW50O1xuXHRcdH0sXG5cdFx0Z2V0IGlzQ29udGVudFNjcm9sbGVkKCkge1xuXHRcdFx0cmV0dXJuIGlzQ29udGVudFNjcm9sbGVkO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZVBhZ2VTaGVsbFRoZW1lKHRoZW1lKSk7XG48L3NjcmlwdD5cblxuPGRpdlxuXHRiaW5kOnRoaXM9e3JlZn1cblx0ZGF0YS1zbG90PVwicGFnZS1zaGVsbFwiXG5cdGRhdGEtc2Nyb2xsZWQ9e2lzQ29udGVudFNjcm9sbGVkID8gJ3RydWUnIDogdW5kZWZpbmVkfVxuXHRjbGFzcz17Y2xhc3Nlcy5yb290KHsgY2xhc3NOYW1lIH0pfVxuXHR7Li4uYXR0YWNobWVudHN9XG4+XG5cdHsjaWYgc2hlbGwuaGFzSGVhZGVyfVxuXHRcdDxQYWdlU2hlbGxIZWFkZXIgYXBpPXtzaGVsbC5hcGl9IHt0aGVtZX0gLz5cblx0ey9pZn1cblxuXHQ8bWFpbiBkYXRhLXNsb3Q9XCJwYWdlLXNoZWxsLWNvbnRlbnRcIiBjbGFzcz17Y2xhc3Nlcy5jb250ZW50KCl9IG9uc2Nyb2xsPXt1cGRhdGVDb250ZW50U2Nyb2xsfT5cblx0XHQ8ZGl2XG5cdFx0XHRkYXRhLXNsb3Q9XCJwYWdlLXNoZWxsLWNvbnRlbnQtaW5uZXJcIlxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuY29udGVudElubmVyKHtcblx0XHRcdFx0cGFkZGluZzogc2hlbGwuYXBpLmNvbnRlbnRQYWRkaW5nID8/ICdub25lJyxcblx0XHRcdFx0d2lkdGg6IHNoZWxsLmFwaS5jb250ZW50V2lkdGggPz8gJ2Z1bGwnXG5cdFx0XHR9KX1cblx0XHQ+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbihzaGVsbC5hcGkpfVxuXHRcdDwvZGl2PlxuXHQ8L21haW4+XG5cblx0eyNpZiBzaGVsbC5oYXNGb290ZXJ9XG5cdFx0PFBhZ2VTaGVsbEZvb3RlciBhcGk9e3NoZWxsLmFwaX0ge3RoZW1lfSAvPlxuXHR7L2lmfVxuPC9kaXY+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1BhZ2VTaGVsbC9QYWdlU2hlbGwuc3ZlbHRlIn0=