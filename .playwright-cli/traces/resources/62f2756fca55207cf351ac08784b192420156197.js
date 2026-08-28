import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/PageShell/PageShellFooter.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PageShellFooter[$.FILENAME] = 'src/lib/components/PageShell/PageShellFooter.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import PageShellActions from "/src/lib/components/PageShell/PageShellActions.svelte?t=1783864665558";
import { usePageShellTheme } from "/src/lib/components/PageShell/pageShell.theme.ts";

var root = $.add_locations($.from_html(`<div><!></div>`), PageShellFooter[$.FILENAME], [[21, 3]]);
var root_1 = $.add_locations($.from_html(`<div data-slot="page-shell-footer-actions"><!></div>`), PageShellFooter[$.FILENAME], [[27, 3]]);
var root_2 = $.add_locations($.from_html(`<footer data-slot="page-shell-footer"><div><!> <!></div></footer>`), PageShellFooter[$.FILENAME], [[15, 0, [[19, 1]]]]);

function PageShellFooter($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PageShellFooter);

	const classes = $.tag($.derived(() => usePageShellTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var footer = root_2();
	var div = $.child(footer);
	var node = $.child(div);

	{
		var consequent = ($$anchor) => {
			var div_1 = root();
			var node_1 = $.child(div_1);

			$.add_svelte_meta(() => $.snippet(node_1, () => $$props.api.footer, () => $$props.api), 'render', PageShellFooter, 22, 4);
			$.reset(div_1);
			$.template_effect(($0) => $.set_class(div_1, 1, $0), [() => $.clsx($.get(classes).footerContent())]);
			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.api.footer) $$render(consequent);
			}),
			'if',
			PageShellFooter,
			20,
			2
		);
	}

	var node_2 = $.sibling(node, 2);

	{
		var consequent_1 = ($$anchor) => {
			var div_2 = root_1();
			var node_3 = $.child(div_2);

			{
				let $0 = $.derived(() => $$props.api.actionOverflow ?? 'auto');
				let $1 = $.derived(() => $$props.api.mobileActionCount ?? 1);

				$.add_svelte_meta(
					() => PageShellActions(node_3, {
						get api() {
							return $$props.api;
						},

						get actions() {
							return $$props.api.footerActions;
						},

						get actionOverflow() {
							return $.get($0);
						},

						get mobileActionCount() {
							return $.get($1);
						},

						get theme() {
							return $$props.theme;
						}
					}),
					'component',
					PageShellFooter,
					28,
					4,
					{ componentTag: 'PageShellActions' }
				);
			}

			$.reset(div_2);
			$.template_effect(($0) => $.set_class(div_2, 1, $0), [() => $.clsx($.get(classes).actions())]);
			$.append($$anchor, div_2);
		};

		$.add_svelte_meta(
			() => $.if(node_2, ($$render) => {
				if ($$props.api.footerActions) $$render(consequent_1);
			}),
			'if',
			PageShellFooter,
			26,
			2
		);
	}

	$.reset(div);
	$.reset(footer);

	$.template_effect(
		($0, $1) => {
			$.set_class(footer, 1, $0);
			$.set_class(div, 1, $1);
		},
		[
			() => $.clsx($.get(classes).footer({
				scrolled: $$props.api.isContentScrolled,
				className: $$props.class
			})),
			() => $.clsx($.get(classes).footerInner())
		]
	);

	$.append($$anchor, footer);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PageShellFooter = $.hmr(PageShellFooter);

	import.meta.hot.acceptExports(["default"],(module) => {
		PageShellFooter[$.HMR].update(module.default);
	});
}

export default PageShellFooter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFFeEQsT0FBTyxFQUFFLGlCQUFpQixRQUFrQyxzQkFBc0I7Ozs7Ozs0Q0FIbkYsQ0FBQzs7OztDQVdBLE1BQU0sT0FBTyx5QkFBWSxpQkFBaUI7O0tBRzFDO0tBSUMsR0FBRyxXQUpKO29CQUlDLEdBQUc7Ozs7T0FFRCxLQUFHO3dCQUFILEtBQUc7OytEQUNVLE1BQU07V0FEbkIsS0FBRzt5Q0FBSCxLQUFHLDhCQUFRLE9BQU8sRUFBQyxhQUFhO3NCQUFoQyxLQUFHOzs7OztvQkFESSxNQUFNOzs7Ozs7Ozs7Ozs7O09BT2IsS0FBRzt3QkFBSCxLQUFHOzs7eUNBSWtCLGNBQWMsSUFBSSxNQUFNO3lDQUNyQixpQkFBaUIsSUFBSSxDQUFDOzs7V0FKN0M7Ozs7OzswQkFFYSxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQUgzQixLQUFHO3lDQUFILEtBQUcsOEJBQThDLE9BQU8sRUFBQyxPQUFPO3NCQUFoRSxLQUFHOzs7OztvQkFESSxhQUFhOzs7Ozs7Ozs7U0FQdEIsR0FBRztTQUpKOzs7O2VBQUE7ZUFJQyxHQUFHOzs7c0JBRkcsT0FBTyxFQUFDLE1BQU07SUFBRyxRQUFRLGNBQU0saUJBQWlCO0lBQUUsU0FBUzs7c0JBRXRELE9BQU8sRUFBQyxXQUFXOzs7O29CQUovQjs7O0FBRk8iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlBhZ2VTaGVsbEZvb3Rlci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFBhZ2VTaGVsbEFjdGlvbnMgZnJvbSAnLi9QYWdlU2hlbGxBY3Rpb25zLnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgUGFnZVNoZWxsQXBpIH0gZnJvbSAnLi9wYWdlU2hlbGwucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VQYWdlU2hlbGxUaGVtZSwgdHlwZSBQYWdlU2hlbGxUaGVtZVByb3BzIH0gZnJvbSAnLi9wYWdlU2hlbGwudGhlbWUuanMnO1xuXG5cdGxldCB7XG5cdFx0YXBpLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0dGhlbWVcblx0fTogeyBhcGk6IFBhZ2VTaGVsbEFwaTsgY2xhc3M/OiBzdHJpbmc7IHRoZW1lPzogUGFnZVNoZWxsVGhlbWVQcm9wcyB9ID0gJHByb3BzKCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZVBhZ2VTaGVsbFRoZW1lKHRoZW1lKSk7XG48L3NjcmlwdD5cblxuPGZvb3RlclxuXHRkYXRhLXNsb3Q9XCJwYWdlLXNoZWxsLWZvb3RlclwiXG5cdGNsYXNzPXtjbGFzc2VzLmZvb3Rlcih7IHNjcm9sbGVkOiBhcGkuaXNDb250ZW50U2Nyb2xsZWQsIGNsYXNzTmFtZSB9KX1cbj5cblx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5mb290ZXJJbm5lcigpfT5cblx0XHR7I2lmIGFwaS5mb290ZXJ9XG5cdFx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLmZvb3RlckNvbnRlbnQoKX0+XG5cdFx0XHRcdHtAcmVuZGVyIGFwaS5mb290ZXIoYXBpKX1cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cblx0XHR7I2lmIGFwaS5mb290ZXJBY3Rpb25zfVxuXHRcdFx0PGRpdiBkYXRhLXNsb3Q9XCJwYWdlLXNoZWxsLWZvb3Rlci1hY3Rpb25zXCIgY2xhc3M9e2NsYXNzZXMuYWN0aW9ucygpfT5cblx0XHRcdFx0PFBhZ2VTaGVsbEFjdGlvbnNcblx0XHRcdFx0XHR7YXBpfVxuXHRcdFx0XHRcdGFjdGlvbnM9e2FwaS5mb290ZXJBY3Rpb25zfVxuXHRcdFx0XHRcdGFjdGlvbk92ZXJmbG93PXthcGkuYWN0aW9uT3ZlcmZsb3cgPz8gJ2F1dG8nfVxuXHRcdFx0XHRcdG1vYmlsZUFjdGlvbkNvdW50PXthcGkubW9iaWxlQWN0aW9uQ291bnQgPz8gMX1cblx0XHRcdFx0XHR7dGhlbWV9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHR7L2lmfVxuXHQ8L2Rpdj5cbjwvZm9vdGVyPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9QYWdlU2hlbGwvUGFnZVNoZWxsRm9vdGVyLnN2ZWx0ZSJ9