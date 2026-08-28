import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/MenuOption/MenuOption.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

MenuOption[$.FILENAME] = 'src/lib/components/MenuOption/MenuOption.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useMenuOptionTheme } from "/src/lib/components/MenuOption/menuOption.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'color',
	'size',
	'class',
	'onClick',
	'onEnter',
	'onLeave',
	'href',
	'target',
	'rel',
	'as',
	'role',
	'highlighted',
	'selected',
	'active',
	'disabled',
	'title',
	'description',
	'children',
	'prefix',
	'suffix',
	'attrs',
	'theme'
]);

var root = $.add_locations($.from_html(`<div><!> <!></div>`), MenuOption[$.FILENAME], [[86, 2]]);
var root_1 = $.add_locations($.from_html(`<!> <!> <!>`, 1), MenuOption[$.FILENAME], []);

function MenuOption($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, MenuOption);

	let color = $.prop($$props, 'color', 3, 'foreground'),
		size = $.prop($$props, 'size', 3, 'normal'),
		className = $.prop($$props, 'class', 3, ''),
		active = $.prop($$props, 'active', 3, false),
		disabled = $.prop($$props, 'disabled', 3, false),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useMenuOptionTheme($$props.theme)), 'classes');

	// Determine element type: custom 'as', link if href, button if interactive, otherwise div
	const elementType = $.tag($.derived(() => $$props.as || ($$props.href ? 'a' : 'button')), 'elementType');

	// Explicit role wins (the listbox family passes 'option'); otherwise derive from the element.
	const resolvedRole = $.tag(
		$.derived(() => $$props.role ?? ($.strict_equals($.get(elementType), 'button')
			? 'button'
			: $.strict_equals($.get(elementType), 'a') ? 'link' : 'menuitem')),
		'resolvedRole'
	);

	// Attributes assembled conditionally so the menu family (which sets data-highlighted
	// imperatively via useNavigation) is never clobbered by a reactive `undefined` binding — the
	// key is simply absent unless a `highlighted` prop is passed (listbox/combobox family).
	const dynamicAttrs = $.tag(
		$.derived(() => ({
			...$.strict_equals($$props.highlighted, undefined, false)
				? { 'data-highlighted': $$props.highlighted ? 'true' : undefined }
				: {},

			...$.strict_equals($$props.selected, undefined, false)
				? {
					'aria-selected': $$props.selected,
					'data-selected': $$props.selected || undefined
				}
				: {},
			...disabled() ? { 'aria-disabled': true } : {},
			...disabled() && $.strict_equals($.get(elementType), 'button') ? { disabled: true } : {},
			...$$props.attrs
		})),
		'dynamicAttrs'
	);

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		$.validate_dynamic_element_tag(() => $.get(elementType));
		$.validate_void_dynamic_element(() => $.get(elementType));

		$.element(
			node,
			() => $.get(elementType),
			false,
			($$element, $$anchor) => {
				$.attribute_effect(
					$$element,
					($0) => ({
						role: $.get(resolvedRole),
						href: $$props.href,
						target: $$props.target,
						rel: $$props.rel,
						'data-color': color(),
						'data-size': size(),
						onclick: disabled() ? undefined : $$props.onClick,
						onpointerenter: $$props.onEnter,
						onpointerleave: $$props.onLeave,
						class: $0,
						...$.get(dynamicAttrs),
						...attachments
					}),
					[
						() => $.get(classes).root({
							color: color(),
							size: size(),
							disabled: disabled(),
							highlighted: $$props.highlighted,
							active: active(),
							className: className()
						})
					]
				);

				var fragment_1 = root_1();
				var node_1 = $.first_child(fragment_1);

				{
					let $0 = $.derived(() => $.get(classes).prefix({
						size: size(),
						align: $$props.title && $$props.description ? 'start' : 'center'
					}));

					$.add_svelte_meta(
						() => Slot(node_1, {
							get render() {
								return $$props.prefix;
							},

							get class() {
								return $.get($0);
							}
						}),
						'component',
						MenuOption,
						78,
						1,
						{ componentTag: 'Slot' }
					);
				}

				var node_2 = $.sibling(node_1, 2);

				{
					var consequent = ($$anchor) => {
						var fragment_2 = $.comment();
						var node_3 = $.first_child(fragment_2);

						$.add_svelte_meta(
							() => Slot(node_3, {
								get render() {
									return $$props.children;
								}
							}),
							'component',
							MenuOption,
							84,
							2,
							{ componentTag: 'Slot' }
						);

						$.append($$anchor, fragment_2);
					};

					var consequent_1 = ($$anchor) => {
						var div = root();
						var node_4 = $.child(div);

						{
							let $0 = $.derived(() => !!$$props.title);
							let $1 = $.derived(() => $.get(classes).title({ size: size() }));

							$.add_svelte_meta(
								() => Slot(node_4, {
									get renderIf() {
										return $.get($0);
									},

									get render() {
										return $$props.title;
									},

									get class() {
										return `${$.get($1) ?? ''} leading-none`;
									}
								}),
								'component',
								MenuOption,
								87,
								3,
								{ componentTag: 'Slot' }
							);
						}

						var node_5 = $.sibling(node_4, 2);

						{
							let $0 = $.derived(() => !!$$props.description);
							let $1 = $.derived(() => $.get(classes).description({ size: size() }));

							$.add_svelte_meta(
								() => Slot(node_5, {
									get renderIf() {
										return $.get($0);
									},

									get render() {
										return $$props.description;
									},

									get class() {
										return $.get($1);
									}
								}),
								'component',
								MenuOption,
								89,
								3,
								{ componentTag: 'Slot' }
							);
						}

						$.reset(div);
						$.template_effect(($0) => $.set_class(div, 1, $0), [() => $.clsx($.get(classes).content({ size: size() }))]);
						$.append($$anchor, div);
					};

					$.add_svelte_meta(
						() => $.if(node_2, ($$render) => {
							if ($$props.children) $$render(consequent); else if ($$props.title || $$props.description) $$render(consequent_1, 1);
						}),
						'if',
						MenuOption,
						83,
						1
					);
				}

				var node_6 = $.sibling(node_2, 2);

				{
					let $0 = $.derived(() => $.get(classes).suffix({ size: size() }));

					$.add_svelte_meta(
						() => Slot(node_6, {
							get render() {
								return $$props.suffix;
							},

							get class() {
								return $.get($0);
							}
						}),
						'component',
						MenuOption,
						93,
						1,
						{ componentTag: 'Slot' }
					);
				}

				$.append($$anchor, fragment_1);
			},
			void 0,
			[56, 0]
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	MenuOption = $.hmr(MenuOption);

	import.meta.hot.acceptExports(["default"],(module) => {
		MenuOption[$.HMR].update(module.default);
	});
}

export default MenuOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxJQUFJLE1BQU0scUJBQXFCO0FBRXRDLE9BQU8sRUFBRSxrQkFBa0IsUUFBUSx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FIM0QsQ0FBQzs7OztDQUtBLElBQUksQUFDSCxLQUFLLCtCQUFHLFlBQVk7RUFDcEIsSUFBSSw4QkFBRyxRQUFRO0VBQ1IsU0FBUywrQkFBRyxFQUFFO0VBV3JCLE1BQU0sZ0NBQUcsS0FBSztFQUNkLFFBQVEsa0NBQUcsS0FBSztFQVFiOztDQUdKLE1BQU0sT0FBTyx5QkFBWSxrQkFBa0I7OztDQUczQyxNQUFNLFdBQVcsdURBQTBCLEdBQUcsR0FBRyxRQUFROzs7Q0FHekQsTUFBTSxZQUFZO3lEQUNSLFdBQVcsR0FBSyxRQUFRO0tBQUcsUUFBUTsyQkFBRyxXQUFXLEdBQUssR0FBRyxJQUFHLE1BQU0sR0FBRyxVQUFVOzs7Ozs7O0NBTXpGLE1BQU0sWUFBaUM7OzJDQUNsQixTQUFTO1FBQUssa0JBQWtCLHdCQUFnQixNQUFNLEdBQUcsU0FBUzs7O3dDQUNyRTs7S0FDWixlQUFlO0tBQVksZUFBZSxzQkFBYyxTQUFTOzs7TUFFbEUsUUFBUSxPQUFLLGVBQWUsRUFBRSxJQUFJO01BQ2xDLFFBQVEsNEJBQUksV0FBVyxHQUFLLFFBQVEsTUFBSyxRQUFRLEVBQUUsSUFBSTs7Ozs7Ozs7Ozs7NkNBTXRELFdBQVc7OENBQVgsV0FBVzs7OztlQUFYLFdBQVc7Ozs7OztrQkFDWCxZQUFZOzs7O29CQUlOLEtBQUs7bUJBQ04sSUFBSTtlQUNOLFFBQVEsS0FBRyxTQUFTOzs7O2VBV3pCLFlBQVk7U0FDWixXQUFXOzs7a0JBVFIsT0FBTyxFQUFDLElBQUk7T0FDbEIsS0FBSyxFQUFMLEtBQUs7T0FDTCxJQUFJLEVBQUosSUFBSTtPQUNKLFFBQVEsRUFBUixRQUFRO09BQ1IsV0FBVztPQUNYLE1BQU0sRUFBTixNQUFNO09BQ047Ozs7Ozs7OztvQ0FPTyxPQUFPLEVBQUMsTUFBTTtNQUFHLElBQUksRUFBSixJQUFJO01BQUUsS0FBSyx5Q0FBeUIsT0FBTyxHQUFHLFFBQVE7Ozs7WUFGOUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFNQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O1VBRUosR0FBRzsyQkFBSCxHQUFHOzs7O3NDQUM2QyxPQUFPLEVBQUMsS0FBSyxHQUFHLElBQUksRUFBSixJQUFJOzs7Y0FBbkUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FFc0QsT0FBTyxFQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUosSUFBSTs7O2NBQXBGLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQUhMLEdBQUc7NENBQUgsR0FBRyw4QkFBUSxPQUFPLEVBQUMsT0FBTyxHQUFHLElBQUksRUFBSixJQUFJO3lCQUFqQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztvQ0FPd0IsT0FBTyxFQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUosSUFBSTs7O1lBQWpELElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXZDRSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTWVudU9wdGlvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFNsb3QgZnJvbSAnLi4vU2xvdC9TbG90LnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgTWVudU9wdGlvblByb3BzIH0gZnJvbSAnLi9tZW51T3B0aW9uLnByb3BzLmpzJztcblx0aW1wb3J0IHsgdXNlTWVudU9wdGlvblRoZW1lIH0gZnJvbSAnLi9tZW51T3B0aW9uLnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdGNvbG9yID0gJ2ZvcmVncm91bmQnLFxuXHRcdHNpemUgPSAnbm9ybWFsJyxcblx0XHRjbGFzczogY2xhc3NOYW1lID0gJycsXG5cdFx0b25DbGljayxcblx0XHRvbkVudGVyLFxuXHRcdG9uTGVhdmUsXG5cdFx0aHJlZixcblx0XHR0YXJnZXQsXG5cdFx0cmVsLFxuXHRcdGFzLFxuXHRcdHJvbGUsXG5cdFx0aGlnaGxpZ2h0ZWQsXG5cdFx0c2VsZWN0ZWQsXG5cdFx0YWN0aXZlID0gZmFsc2UsXG5cdFx0ZGlzYWJsZWQgPSBmYWxzZSxcblx0XHR0aXRsZSxcblx0XHRkZXNjcmlwdGlvbixcblx0XHRjaGlsZHJlbixcblx0XHRwcmVmaXgsXG5cdFx0c3VmZml4LFxuXHRcdGF0dHJzLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IE1lbnVPcHRpb25Qcm9wcyA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VNZW51T3B0aW9uVGhlbWUodGhlbWUpKTtcblxuXHQvLyBEZXRlcm1pbmUgZWxlbWVudCB0eXBlOiBjdXN0b20gJ2FzJywgbGluayBpZiBocmVmLCBidXR0b24gaWYgaW50ZXJhY3RpdmUsIG90aGVyd2lzZSBkaXZcblx0Y29uc3QgZWxlbWVudFR5cGUgPSAkZGVyaXZlZChhcyB8fCAoaHJlZiA/ICdhJyA6ICdidXR0b24nKSk7XG5cblx0Ly8gRXhwbGljaXQgcm9sZSB3aW5zICh0aGUgbGlzdGJveCBmYW1pbHkgcGFzc2VzICdvcHRpb24nKTsgb3RoZXJ3aXNlIGRlcml2ZSBmcm9tIHRoZSBlbGVtZW50LlxuXHRjb25zdCByZXNvbHZlZFJvbGUgPSAkZGVyaXZlZChcblx0XHRyb2xlID8/IChlbGVtZW50VHlwZSA9PT0gJ2J1dHRvbicgPyAnYnV0dG9uJyA6IGVsZW1lbnRUeXBlID09PSAnYScgPyAnbGluaycgOiAnbWVudWl0ZW0nKVxuXHQpO1xuXG5cdC8vIEF0dHJpYnV0ZXMgYXNzZW1ibGVkIGNvbmRpdGlvbmFsbHkgc28gdGhlIG1lbnUgZmFtaWx5ICh3aGljaCBzZXRzIGRhdGEtaGlnaGxpZ2h0ZWRcblx0Ly8gaW1wZXJhdGl2ZWx5IHZpYSB1c2VOYXZpZ2F0aW9uKSBpcyBuZXZlciBjbG9iYmVyZWQgYnkgYSByZWFjdGl2ZSBgdW5kZWZpbmVkYCBiaW5kaW5nIOKAlCB0aGVcblx0Ly8ga2V5IGlzIHNpbXBseSBhYnNlbnQgdW5sZXNzIGEgYGhpZ2hsaWdodGVkYCBwcm9wIGlzIHBhc3NlZCAobGlzdGJveC9jb21ib2JveCBmYW1pbHkpLlxuXHRjb25zdCBkeW5hbWljQXR0cnM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSAkZGVyaXZlZCh7XG5cdFx0Li4uKGhpZ2hsaWdodGVkICE9PSB1bmRlZmluZWQgPyB7ICdkYXRhLWhpZ2hsaWdodGVkJzogaGlnaGxpZ2h0ZWQgPyAndHJ1ZScgOiB1bmRlZmluZWQgfSA6IHt9KSxcblx0XHQuLi4oc2VsZWN0ZWQgIT09IHVuZGVmaW5lZFxuXHRcdFx0PyB7ICdhcmlhLXNlbGVjdGVkJzogc2VsZWN0ZWQsICdkYXRhLXNlbGVjdGVkJzogc2VsZWN0ZWQgfHwgdW5kZWZpbmVkIH1cblx0XHRcdDoge30pLFxuXHRcdC4uLihkaXNhYmxlZCA/IHsgJ2FyaWEtZGlzYWJsZWQnOiB0cnVlIH0gOiB7fSksXG5cdFx0Li4uKGRpc2FibGVkICYmIGVsZW1lbnRUeXBlID09PSAnYnV0dG9uJyA/IHsgZGlzYWJsZWQ6IHRydWUgfSA6IHt9KSxcblx0XHQuLi5hdHRyc1xuXHR9KTtcbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmVsZW1lbnRcblx0dGhpcz17ZWxlbWVudFR5cGV9XG5cdHJvbGU9e3Jlc29sdmVkUm9sZX1cblx0e2hyZWZ9XG5cdHt0YXJnZXR9XG5cdHtyZWx9XG5cdGRhdGEtY29sb3I9e2NvbG9yfVxuXHRkYXRhLXNpemU9e3NpemV9XG5cdG9uY2xpY2s9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogb25DbGlja31cblx0b25wb2ludGVyZW50ZXI9e29uRW50ZXJ9XG5cdG9ucG9pbnRlcmxlYXZlPXtvbkxlYXZlfVxuXHRjbGFzcz17Y2xhc3Nlcy5yb290KHtcblx0XHRjb2xvcixcblx0XHRzaXplLFxuXHRcdGRpc2FibGVkLFxuXHRcdGhpZ2hsaWdodGVkLFxuXHRcdGFjdGl2ZSxcblx0XHRjbGFzc05hbWVcblx0fSl9XG5cdHsuLi5keW5hbWljQXR0cnN9XG5cdHsuLi5hdHRhY2htZW50c31cbj5cblx0PFNsb3Rcblx0XHRyZW5kZXI9e3ByZWZpeH1cblx0XHRjbGFzcz17Y2xhc3Nlcy5wcmVmaXgoeyBzaXplLCBhbGlnbjogdGl0bGUgJiYgZGVzY3JpcHRpb24gPyAnc3RhcnQnIDogJ2NlbnRlcicgfSl9XG5cdC8+XG5cblx0eyNpZiBjaGlsZHJlbn1cblx0XHQ8U2xvdCByZW5kZXI9e2NoaWxkcmVufSAvPlxuXHR7OmVsc2UgaWYgdGl0bGUgfHwgZGVzY3JpcHRpb259XG5cdFx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5jb250ZW50KHsgc2l6ZSB9KX0+XG5cdFx0XHQ8U2xvdCByZW5kZXJJZj17ISF0aXRsZX0gcmVuZGVyPXt0aXRsZX0gY2xhc3M9XCJ7Y2xhc3Nlcy50aXRsZSh7IHNpemUgfSl9IGxlYWRpbmctbm9uZVwiIC8+XG5cblx0XHRcdDxTbG90IHJlbmRlcklmPXshIWRlc2NyaXB0aW9ufSByZW5kZXI9e2Rlc2NyaXB0aW9ufSBjbGFzcz17Y2xhc3Nlcy5kZXNjcmlwdGlvbih7IHNpemUgfSl9IC8+XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG5cblx0PFNsb3QgcmVuZGVyPXtzdWZmaXh9IGNsYXNzPXtjbGFzc2VzLnN1ZmZpeCh7IHNpemUgfSl9IC8+XG48L3N2ZWx0ZTplbGVtZW50PlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9NZW51T3B0aW9uL01lbnVPcHRpb24uc3ZlbHRlIn0=