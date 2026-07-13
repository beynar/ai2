import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Button/Button.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Button[$.FILENAME] = 'src/lib/components/Button/Button.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { spinnerOverlay } from "/src/lib/attachments/spinnerOverlay.svelte.ts";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useButtonTheme } from "/src/lib/components/Button/button.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'as',
	'payload',
	'loading',
	'onClick',
	'onEnter',
	'onLeave',
	'href',
	'squared',
	'class',
	'color',
	'prefix',
	'suffix',
	'children',
	'variant',
	'type',
	'size',
	'ref',
	'fullWidth',
	'disabled',
	'theme',
	'rel',
	'target',
	'download',
	'label',
	'role',
	'aria-haspopup',
	'aria-expanded',
	'aria-controls',
	'aria-selected',
	'aria-pressed',
	'data-active'
]);

var root = $.add_locations($.from_html(`<!> <!> <!>`, 1), Button[$.FILENAME], []);

function Button($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Button);

	let loading = $.prop($$props, 'loading', 3, false),
		onClick = $.prop($$props, 'onClick', 3, null),
		onEnter = $.prop($$props, 'onEnter', 3, null),
		onLeave = $.prop($$props, 'onLeave', 3, null),
		color = $.prop($$props, 'color', 3, 'primary'),
		variant = $.prop($$props, 'variant', 3, 'solid'),
		size = $.prop($$props, 'size', 3, 'normal'),
		ref = $.prop($$props, 'ref', 15),
		fullWidth = $.prop($$props, 'fullWidth', 3, false),
		disabled = $.prop($$props, 'disabled', 3, false),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const isSquared = $.tag($.derived(() => $$props.squared ?? !!(!$$props.children && $$props.prefix && !$$props.suffix || !$$props.children && !$$props.prefix && $$props.suffix)), 'isSquared');
	const classes = $.tag($.derived(() => useButtonTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		$.validate_dynamic_element_tag(() => $$props.as || $$props.href ? 'a' : 'button');
		$.validate_void_dynamic_element(() => $$props.as || $$props.href ? 'a' : 'button');

		$.element(
			node,
			() => $$props.as || $$props.href ? 'a' : 'button',
			false,
			($$element, $$anchor) => {
				$.bind_this($$element, ($$value) => ref($$value), () => ref());
				$.attach($$element, () => spinnerOverlay({ loading: loading() }));

				$.attribute_effect(
					$$element,
					($0) => ({
						'aria-label': $$props.label,
						'aria-haspopup': $$props['aria-haspopup'],
						'aria-expanded': $$props['aria-expanded'],
						'aria-controls': $$props['aria-controls'],
						'aria-selected': $$props['aria-selected'],
						'aria-pressed': $$props['aria-pressed'],
						role: $$props.role ?? ($$props.as || $$props.href ? 'link' : 'button'),
						href: $$props.href,
						rel: $$props.rel,
						target: $$props.target,
						download: $$props.download,
						type: $$props.type,
						'data-active': $$props['data-active'],
						'data-color': color(),
						disabled: disabled(),
						class: $0,
						onclick: onClick() && (() => {
							if (!disabled()) {
								onClick()($$props.payload);
							}
						}),

						onpointerenter: onEnter() && (() => {
							if (!disabled()) {
								onEnter()($$props.payload);
							}
						}),

						onpointerleave: onLeave() && (() => {
							if (!disabled()) {
								onLeave()($$props.payload);
							}
						}),
						...attachments
					}),
					[
						() => $.get(classes).root({
							color: color(),
							squared: $.get(isSquared),
							variant: variant(),
							size: size(),
							loading: loading(),
							disabled: disabled(),
							className: $$props.class,
							fullWidth: fullWidth()
						})
					]
				);

				var fragment_1 = root();
				var node_1 = $.first_child(fragment_1);

				{
					let $0 = $.derived(() => $.get(classes).prefix({ size: size() }));

					$.add_svelte_meta(
						() => Slot(node_1, {
							get render() {
								return $$props.prefix;
							},
							as: 'span',
							get class() {
								return $.get($0);
							}
						}),
						'component',
						Button,
						98,
						1,
						{ componentTag: 'Slot' }
					);
				}

				var node_2 = $.sibling(node_1, 2);

				$.add_svelte_meta(
					() => Slot(node_2, {
						get render() {
							return $$props.children;
						}
					}),
					'component',
					Button,
					99,
					1,
					{ componentTag: 'Slot' }
				);

				var node_3 = $.sibling(node_2, 2);

				{
					let $0 = $.derived(() => $.get(classes).suffix({ size: size() }));

					$.add_svelte_meta(
						() => Slot(node_3, {
							get render() {
								return $$props.suffix;
							},
							as: 'span',
							get class() {
								return $.get($0);
							}
						}),
						'component',
						Button,
						100,
						1,
						{ componentTag: 'Slot' }
					);
				}

				$.append($$anchor, fragment_1);
			},
			void 0,
			[49, 0]
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Button = $.hmr(Button);

	import.meta.hot.acceptExports(["default"],(module) => {
		Button[$.HMR].update(module.default);
	});
}

export default Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLGNBQWMsUUFBUSwyQ0FBMkM7QUFDMUUsT0FBTyxJQUFJLE1BQU0scUJBQXFCO0FBRXRDLE9BQU8sRUFBRSxjQUFjLFFBQVEsbUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FKbkQsQ0FBQzs7OztDQU1BLElBQUksQUFHSCxPQUFPLGlDQUFHLEtBQUs7RUFDZixPQUFPLGlDQUFHLElBQUk7RUFDZCxPQUFPLGlDQUFHLElBQUk7RUFDZCxPQUFPLGlDQUFHLElBQUk7RUFJZCxLQUFLLCtCQUFHLFNBQVM7RUFJakIsT0FBTyxpQ0FBRyxPQUFPO0VBRWpCLElBQUksOEJBQUcsUUFBUTtFQUNmLEdBQUc7RUFDSCxTQUFTLG1DQUFHLEtBQUs7RUFDakIsUUFBUSxrQ0FBRyxLQUFLO0VBYWI7O0NBR0osTUFBTSxTQUFTO0NBSWYsTUFBTSxPQUFPLHlCQUFZLGNBQWM7Ozs7OztvRUFJcEIsR0FBRyxHQUFHLFFBQVE7cUVBQWQsR0FBRyxHQUFHLFFBQVE7Ozs7c0NBQWQsR0FBRyxHQUFHLFFBQVE7Ozt3Q0FhdEIsR0FBRyxpQkFBSCxHQUFHOzhCQWNMLGNBQWMsR0FBRyxPQUFPLEVBQVAsT0FBTzs7Ozs7Ozs7Ozs7MERBcEJMLE1BQU0sR0FBRyxRQUFROzs7Ozs7O29CQVFqQyxLQUFLO2dCQUNoQixRQUFROztlQVlBLE9BQU8sYUFDUjtPQUNOLEVBQUUsR0FBRyxRQUFRLElBQUU7UUFDZCxPQUFPO09BQ1I7TUFDRCxDQUFDOztzQkFDYyxPQUFPLGFBQ2Y7T0FDTixFQUFFLEdBQUcsUUFBUSxJQUFFO1FBQ2QsT0FBTztPQUNSO01BQ0QsQ0FBQzs7c0JBQ2MsT0FBTyxhQUNmO09BQ04sRUFBRSxHQUFHLFFBQVEsSUFBRTtRQUNkLE9BQU87T0FDUjtNQUNELENBQUM7U0FDRSxXQUFXOzs7a0JBN0JSLE9BQU8sRUFBQyxJQUFJO09BQ2xCLEtBQUssRUFBTCxLQUFLO09BQ0wsT0FBTyxRQUFFLFNBQVM7T0FDbEIsT0FBTyxFQUFQLE9BQU87T0FDUCxJQUFJLEVBQUosSUFBSTtPQUNKLE9BQU8sRUFBUCxPQUFPO09BQ1AsUUFBUSxFQUFSLFFBQVE7T0FDUixTQUFTO09BQ1Q7Ozs7Ozs7OztvQ0F1QnNDLE9BQU8sRUFBQyxNQUFNLEdBQUcsSUFBSSxFQUFKLElBQUk7OztZQUEzRCxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQUNKLElBQUk7Ozs7Ozs7Ozs7Ozs7OztvQ0FDa0MsT0FBTyxFQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUosSUFBSTs7O1lBQTNELElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXJERSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQnV0dG9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyBzcGlubmVyT3ZlcmxheSB9IGZyb20gJyRsaWIvYXR0YWNobWVudHMvc3Bpbm5lck92ZXJsYXkuc3ZlbHRlLmpzJztcblx0aW1wb3J0IFNsb3QgZnJvbSAnLi4vU2xvdC9TbG90LnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgQnV0dG9uUHJpbWl0aXZlUHJvcHMgfSBmcm9tICcuL2J1dHRvbi5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZUJ1dHRvblRoZW1lIH0gZnJvbSAnLi9idXR0b24udGhlbWUuanMnO1xuXG5cdGxldCB7XG5cdFx0YXMsXG5cdFx0cGF5bG9hZCxcblx0XHRsb2FkaW5nID0gZmFsc2UsXG5cdFx0b25DbGljayA9IG51bGwsXG5cdFx0b25FbnRlciA9IG51bGwsXG5cdFx0b25MZWF2ZSA9IG51bGwsXG5cdFx0aHJlZixcblx0XHRzcXVhcmVkLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0Y29sb3IgPSAncHJpbWFyeScsXG5cdFx0cHJlZml4LFxuXHRcdHN1ZmZpeCxcblx0XHRjaGlsZHJlbixcblx0XHR2YXJpYW50ID0gJ3NvbGlkJyxcblx0XHR0eXBlLFxuXHRcdHNpemUgPSAnbm9ybWFsJyxcblx0XHRyZWYgPSAkYmluZGFibGUoKSxcblx0XHRmdWxsV2lkdGggPSBmYWxzZSxcblx0XHRkaXNhYmxlZCA9IGZhbHNlLFxuXHRcdHRoZW1lLFxuXHRcdHJlbCxcblx0XHR0YXJnZXQsXG5cdFx0ZG93bmxvYWQsXG5cdFx0bGFiZWwsXG5cdFx0cm9sZSxcblx0XHQnYXJpYS1oYXNwb3B1cCc6IGFyaWFIYXNwb3B1cCxcblx0XHQnYXJpYS1leHBhbmRlZCc6IGFyaWFFeHBhbmRlZCxcblx0XHQnYXJpYS1jb250cm9scyc6IGFyaWFDb250cm9scyxcblx0XHQnYXJpYS1zZWxlY3RlZCc6IGFyaWFTZWxlY3RlZCxcblx0XHQnYXJpYS1wcmVzc2VkJzogYXJpYVByZXNzZWQsXG5cdFx0J2RhdGEtYWN0aXZlJzogZGF0YUFjdGl2ZSxcblx0XHQuLi5hdHRhY2htZW50c1xuXHR9OiBCdXR0b25QcmltaXRpdmVQcm9wcyA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGlzU3F1YXJlZCA9ICRkZXJpdmVkKFxuXHRcdHNxdWFyZWQgPz8gISEoKCFjaGlsZHJlbiAmJiBwcmVmaXggJiYgIXN1ZmZpeCkgfHwgKCFjaGlsZHJlbiAmJiAhcHJlZml4ICYmIHN1ZmZpeCkpXG5cdCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZUJ1dHRvblRoZW1lKHRoZW1lKSk7XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTplbGVtZW50XG5cdHRoaXM9e2FzIHx8IGhyZWYgPyAnYScgOiAnYnV0dG9uJ31cblx0YXJpYS1sYWJlbD17bGFiZWx9XG5cdGFyaWEtaGFzcG9wdXA9e2FyaWFIYXNwb3B1cH1cblx0YXJpYS1leHBhbmRlZD17YXJpYUV4cGFuZGVkfVxuXHRhcmlhLWNvbnRyb2xzPXthcmlhQ29udHJvbHN9XG5cdGFyaWEtc2VsZWN0ZWQ9e2FyaWFTZWxlY3RlZH1cblx0YXJpYS1wcmVzc2VkPXthcmlhUHJlc3NlZH1cblx0cm9sZT17cm9sZSA/PyAoYXMgfHwgaHJlZiA/ICdsaW5rJyA6ICdidXR0b24nKX1cblx0e2hyZWZ9XG5cdHtyZWx9XG5cdHt0YXJnZXR9XG5cdHtkb3dubG9hZH1cblx0e3R5cGV9XG5cdGJpbmQ6dGhpcz17cmVmfVxuXHRkYXRhLWFjdGl2ZT17ZGF0YUFjdGl2ZX1cblx0ZGF0YS1jb2xvcj17Y29sb3J9XG5cdHtkaXNhYmxlZH1cblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7XG5cdFx0Y29sb3IsXG5cdFx0c3F1YXJlZDogaXNTcXVhcmVkLFxuXHRcdHZhcmlhbnQsXG5cdFx0c2l6ZSxcblx0XHRsb2FkaW5nLFxuXHRcdGRpc2FibGVkLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRmdWxsV2lkdGhcblx0fSl9XG5cdHtAYXR0YWNoIHNwaW5uZXJPdmVybGF5KHsgbG9hZGluZyB9KX1cblx0b25jbGljaz17b25DbGljayAmJlxuXHRcdCgoKSA9PiB7XG5cdFx0XHRpZiAoIWRpc2FibGVkKSB7XG5cdFx0XHRcdG9uQ2xpY2socGF5bG9hZCk7XG5cdFx0XHR9XG5cdFx0fSl9XG5cdG9ucG9pbnRlcmVudGVyPXtvbkVudGVyICYmXG5cdFx0KCgpID0+IHtcblx0XHRcdGlmICghZGlzYWJsZWQpIHtcblx0XHRcdFx0b25FbnRlcihwYXlsb2FkKTtcblx0XHRcdH1cblx0XHR9KX1cblx0b25wb2ludGVybGVhdmU9e29uTGVhdmUgJiZcblx0XHQoKCkgPT4ge1xuXHRcdFx0aWYgKCFkaXNhYmxlZCkge1xuXHRcdFx0XHRvbkxlYXZlKHBheWxvYWQpO1xuXHRcdFx0fVxuXHRcdH0pfVxuXHR7Li4uYXR0YWNobWVudHN9XG4+XG5cdDxTbG90IHJlbmRlcj17cHJlZml4fSBhcz1cInNwYW5cIiBjbGFzcz17Y2xhc3Nlcy5wcmVmaXgoeyBzaXplIH0pfSAvPlxuXHQ8U2xvdCByZW5kZXI9e2NoaWxkcmVufSAvPlxuXHQ8U2xvdCByZW5kZXI9e3N1ZmZpeH0gYXM9XCJzcGFuXCIgY2xhc3M9e2NsYXNzZXMuc3VmZml4KHsgc2l6ZSB9KX0gLz5cbjwvc3ZlbHRlOmVsZW1lbnQ+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uc3ZlbHRlIn0=