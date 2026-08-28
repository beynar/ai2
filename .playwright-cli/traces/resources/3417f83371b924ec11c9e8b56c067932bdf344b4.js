import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Menu/MenuStackedBackHeader.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

MenuStackedBackHeader[$.FILENAME] = 'src/lib/components/Menu/MenuStackedBackHeader.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import MenuOption from "/src/lib/components/MenuOption/MenuOption.svelte";
import { arrowLeftIcon } from "/src/lib/components/Icons/arrowLeft.ts";

function MenuStackedBackHeader($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, MenuStackedBackHeader);

	const size = $.tag($.derived(() => $$props.opener?.size ?? 'normal'), 'size');
	const openerTheme = $.tag($.derived(() => $$props.theme?.submenu ?? $$props.theme?.option), 'openerTheme');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		let $0 = $.derived(() => $$props.opener?.color);
		let $1 = $.derived(() => $$props.opener?.title ?? $$props.label);
		let $2 = $.derived(() => $$props.opener?.description);
		let $3 = $.derived(() => ({ 'aria-label': $$props.label, 'data-menu-keep-open': 'true' }));

		$.add_svelte_meta(
			() => MenuOption(node, {
				role: 'menuitem',
				get prefix() {
					return arrowLeftIcon;
				},

				get color() {
					return $.get($0);
				},

				get size() {
					return $.get(size);
				},

				get title() {
					return $.get($1);
				},

				get description() {
					return $.get($2);
				},

				get theme() {
					return $.get(openerTheme);
				},

				get attrs() {
					return $.get($3);
				},

				get onClick() {
					return $$props.onBack;
				},
				[$.attachment()]: ($$node) => ($$props.itemReference || $.noop)($$node),
				[$.attachment()]: ($$node) => ($$props.backReference || $.noop)($$node)
			}),
			'component',
			MenuStackedBackHeader,
			30,
			0,
			{ componentTag: 'MenuOption' }
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	MenuStackedBackHeader = $.hmr(MenuStackedBackHeader);

	import.meta.hot.acceptExports(["default"],(module) => {
		MenuStackedBackHeader[$.HMR].update(module.default);
	});
}

export default MenuStackedBackHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxVQUFVLE1BQU0saUNBQWlDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLFFBQVEsdUJBQXVCOztrREFIdEQsQ0FBQzs7OztDQXlCQSxNQUFNLElBQUkseUNBQW9CLElBQUksSUFBSSxRQUFRO0NBQzlDLE1BQU0sV0FBVyx3Q0FBbUIsT0FBTyxtQkFBVyxNQUFNOzs7Ozs7MkNBTTdDLEtBQUs7MkNBRUwsS0FBSzsyQ0FDQyxXQUFXOzhCQUcvQixZQUFZLGlCQUNaLHFCQUFxQixFQUFFLE1BQUs7OztTQVY3Qjs7O1lBRVEsYUFBYTs7Ozs7Ozs7a0JBRXBCLElBQUk7Ozs7Ozs7Ozs7OztrQkFHRSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFUWCIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTWVudVN0YWNrZWRCYWNrSGVhZGVyLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnQgfSBmcm9tICdzdmVsdGUvYXR0YWNobWVudHMnO1xuXHRpbXBvcnQgTWVudU9wdGlvbiBmcm9tICcuLi9NZW51T3B0aW9uL01lbnVPcHRpb24uc3ZlbHRlJztcblx0aW1wb3J0IHsgYXJyb3dMZWZ0SWNvbiB9IGZyb20gJy4uL0ljb25zL2Fycm93TGVmdC5qcyc7XG5cdGltcG9ydCB0eXBlIHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUucHJvcHMuanMnO1xuXHRpbXBvcnQgdHlwZSB7IE1lbnVUaGVtZVByb3BzIH0gZnJvbSAnLi9tZW51LnRoZW1lLmpzJztcblxuXHR0eXBlIFN1Ym1lbnVJdGVtID0gRXh0cmFjdDxNZW51SXRlbSwgeyB0eXBlOiAnc3VibWVudScgfT47XG5cblx0bGV0IHtcblx0XHRvcGVuZXIsXG5cdFx0bGFiZWwsXG5cdFx0dGhlbWUsXG5cdFx0b25CYWNrLFxuXHRcdGl0ZW1SZWZlcmVuY2UsXG5cdFx0YmFja1JlZmVyZW5jZVxuXHR9OiB7XG5cdFx0b3BlbmVyOiBTdWJtZW51SXRlbSB8IG51bGw7XG5cdFx0bGFiZWw6IHN0cmluZztcblx0XHR0aGVtZT86IE1lbnVUaGVtZVByb3BzO1xuXHRcdG9uQmFjazogKCkgPT4gdm9pZDtcblx0XHRpdGVtUmVmZXJlbmNlOiBBdHRhY2htZW50PEhUTUxFbGVtZW50Pjtcblx0XHRiYWNrUmVmZXJlbmNlOiBBdHRhY2htZW50PEhUTUxFbGVtZW50Pjtcblx0fSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IHNpemUgPSAkZGVyaXZlZChvcGVuZXI/LnNpemUgPz8gJ25vcm1hbCcpO1xuXHRjb25zdCBvcGVuZXJUaGVtZSA9ICRkZXJpdmVkKHRoZW1lPy5zdWJtZW51ID8/IHRoZW1lPy5vcHRpb24pO1xuPC9zY3JpcHQ+XG5cbjxNZW51T3B0aW9uXG5cdHJvbGU9XCJtZW51aXRlbVwiXG5cdHByZWZpeD17YXJyb3dMZWZ0SWNvbn1cblx0Y29sb3I9e29wZW5lcj8uY29sb3J9XG5cdHtzaXplfVxuXHR0aXRsZT17b3BlbmVyPy50aXRsZSA/PyBsYWJlbH1cblx0ZGVzY3JpcHRpb249e29wZW5lcj8uZGVzY3JpcHRpb259XG5cdHRoZW1lPXtvcGVuZXJUaGVtZX1cblx0YXR0cnM9e3tcblx0XHQnYXJpYS1sYWJlbCc6IGxhYmVsLFxuXHRcdCdkYXRhLW1lbnUta2VlcC1vcGVuJzogJ3RydWUnXG5cdH19XG5cdG9uQ2xpY2s9e29uQmFja31cblx0e0BhdHRhY2ggaXRlbVJlZmVyZW5jZX1cblx0e0BhdHRhY2ggYmFja1JlZmVyZW5jZX1cbi8+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL01lbnUvTWVudVN0YWNrZWRCYWNrSGVhZGVyLnN2ZWx0ZSJ9