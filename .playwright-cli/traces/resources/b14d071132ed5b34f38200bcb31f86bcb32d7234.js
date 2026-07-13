import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Heading/Heading.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Heading[$.FILENAME] = 'src/lib/components/Heading/Heading.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { heading } from "/src/lib/components/Heading/heading.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'class',
	'underline',
	'size',
	'children',
	'as',
	'weight',
	'trim',
	'balanced',
	'align',
	'muted'
]);

function Heading($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Heading);

	let className = $.prop($$props, 'class', 3, ''),
		underline = $.prop($$props, 'underline', 3, false),
		size = $.prop($$props, 'size', 3, 'h2'),
		weight = $.prop($$props, 'weight', 3, 'normal'),
		trim = $.prop($$props, 'trim', 3, 'both'),
		balanced = $.prop($$props, 'balanced', 3, true),
		align = $.prop($$props, 'align', 3, 'left'),
		muted = $.prop($$props, 'muted', 3, false),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		$.validate_dynamic_element_tag(() => $$props.as || size() || 'h2');
		$.validate_void_dynamic_element(() => $$props.as || size() || 'h2');

		$.element(
			node,
			() => $$props.as || size() || 'h2',
			false,
			($$element, $$anchor) => {
				$.attribute_effect($$element, () => ({
					'data-level': size(),
					'data-underline': underline(),
					'data-balanced': balanced(),
					'data-trim': trim(),
					'data-muted': muted(),
					'data-align': align(),
					'data-weight': weight(),
					class: `${className()}`,
					...attachments
				}));

				var fragment_1 = $.comment();
				var node_1 = $.first_child(fragment_1);

				{
					var consequent = ($$anchor) => {
						var fragment_2 = $.comment();
						var node_2 = $.first_child(fragment_2);

						$.add_svelte_meta(() => $.snippet(node_2, () => $$props.children), 'render', Heading, 32, 2);
						$.append($$anchor, fragment_2);
					};

					$.add_svelte_meta(
						() => $.if(node_1, ($$render) => {
							if ($$props.children) $$render(consequent);
						}),
						'if',
						Heading,
						31,
						1
					);
				}

				$.append($$anchor, fragment_1);
			},
			void 0,
			[19, 0]
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Heading = $.hmr(Heading);

	import.meta.hot.acceptExports(["default"],(module) => {
		Heading[$.HMR].update(module.default);
	});
}

export default Heading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxFQUFFLE9BQU8sUUFBUSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FGN0MsQ0FBQzs7OztDQUdBLElBQUksQUFDSSxTQUFTLCtCQUFHLEVBQUU7RUFDckIsU0FBUyxtQ0FBRyxLQUFLO0VBQ2pCLElBQUksOEJBQUcsSUFBSTtFQUdYLE1BQU0sZ0NBQUcsUUFBUTtFQUNqQixJQUFJLDhCQUFHLE1BQU07RUFDYixRQUFRLGtDQUFHLElBQUk7RUFDZixLQUFLLCtCQUFHLE1BQU07RUFDZCxLQUFLLCtCQUFHLEtBQUs7RUFDVjs7Ozs7OztxREFLUSxJQUFJLE1BQUksSUFBSTtzREFBWixJQUFJLE1BQUksSUFBSTs7Ozt1QkFBWixJQUFJLE1BQUksSUFBSTs7OzttQkFDWixJQUFJO3VCQUNBLFNBQVM7c0JBQ1YsUUFBUTtrQkFDWixJQUFJO21CQUNILEtBQUs7bUJBQ0wsS0FBSztvQkFDSixNQUFNO2VBQ1QsU0FBUztRQUNmLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVpSIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIZWFkaW5nLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IEhlYWRpbmdQcm9wcyB9IGZyb20gJy4vaGVhZGluZy5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IGhlYWRpbmcgfSBmcm9tICcuL2hlYWRpbmcudGhlbWUuanMnO1xuXHRsZXQge1xuXHRcdGNsYXNzOiBjbGFzc05hbWUgPSAnJyxcblx0XHR1bmRlcmxpbmUgPSBmYWxzZSxcblx0XHRzaXplID0gJ2gyJyxcblx0XHRjaGlsZHJlbixcblx0XHRhcyxcblx0XHR3ZWlnaHQgPSAnbm9ybWFsJyxcblx0XHR0cmltID0gJ2JvdGgnLFxuXHRcdGJhbGFuY2VkID0gdHJ1ZSxcblx0XHRhbGlnbiA9ICdsZWZ0Jyxcblx0XHRtdXRlZCA9IGZhbHNlLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IEhlYWRpbmdQcm9wcyA9ICRwcm9wcygpO1xuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6ZWxlbWVudFxuXHR0aGlzPXthcyB8fCBzaXplIHx8ICdoMid9XG5cdGRhdGEtbGV2ZWw9e3NpemV9XG5cdGRhdGEtdW5kZXJsaW5lPXt1bmRlcmxpbmV9XG5cdGRhdGEtYmFsYW5jZWQ9e2JhbGFuY2VkfVxuXHRkYXRhLXRyaW09e3RyaW19XG5cdGRhdGEtbXV0ZWQ9e211dGVkfVxuXHRkYXRhLWFsaWduPXthbGlnbn1cblx0ZGF0YS13ZWlnaHQ9e3dlaWdodH1cblx0Y2xhc3M9e2Ake2NsYXNzTmFtZX1gfVxuXHR7Li4uYXR0YWNobWVudHN9XG4+XG5cdHsjaWYgY2hpbGRyZW59XG5cdFx0e0ByZW5kZXIgY2hpbGRyZW4oKX1cblx0ey9pZn1cbjwvc3ZlbHRlOmVsZW1lbnQ+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0hlYWRpbmcvSGVhZGluZy5zdmVsdGUifQ==