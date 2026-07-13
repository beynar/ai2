import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/ScrollArea/ScrollArea.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

ScrollArea_1[$.FILENAME] = 'src/lib/components/ScrollArea/ScrollArea.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { fade } from "/node_modules/.vite/deps/svelte_transition.js?v=1b1d2797";
import { ScrollArea } from "/src/lib/components/ScrollArea/scrollArea.svelte.ts";
import { useScrollAreaTheme } from "/src/lib/components/ScrollArea/scrollArea.theme.ts";
import { caretUpDownIcon } from "/src/lib/components/Icons/caretUpDown.ts";
import { caretUpIcon } from "/src/lib/components/Icons/caretUp.ts";
import { caretDownIcon } from "/src/lib/components/Icons/caretDown.ts";

var root = $.add_locations($.from_html(`<div role="scrollbar" aria-controls="scroll-area-viewport" aria-valuemin="0"><div data-thumb=""></div></div>`), ScrollArea_1[$.FILENAME], [[73, 2, [[90, 3]]]]);
var root_1 = $.add_locations($.from_html(`<div role="scrollbar" aria-orientation="horizontal" aria-controls="scroll-area-viewport" aria-valuemin="0"><div data-thumb=""></div></div>`), ScrollArea_1[$.FILENAME], [[103, 2, [[120, 3]]]]);
var root_2 = $.add_locations($.from_html(`<div class="absolute top-0 left-0 flex w-full items-center justify-center svelte-15q13al"><!></div>`), ScrollArea_1[$.FILENAME], [[132, 3]]);
var root_3 = $.add_locations($.from_html(`<div class="absolute bottom-0 left-0 flex w-full items-center justify-center svelte-15q13al"><!></div>`), ScrollArea_1[$.FILENAME], [[141, 3]]);
var root_4 = $.add_locations($.from_html(`<!> <!>`, 1), ScrollArea_1[$.FILENAME], []);
var root_5 = $.add_locations($.from_html(`<div data-scroll-area=""><div id="scroll-area-viewport" data-scroll-area-viewport="" role="group" aria-label="Scrollable content"><div class="svelte-15q13al"><!></div></div> <!> <!> <!></div>`), ScrollArea_1[$.FILENAME], [[34, 0, [[45, 1, [[62, 2]]]]]]);

function ScrollArea_1($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, ScrollArea_1);

	let className = $.prop($$props, 'class', 3, ''),
		delay = $.prop($$props, 'delay', 3, 0),
		type = $.prop($$props, 'type', 3, 'hover'),
		scrollOnEdges = $.prop($$props, 'scrollOnEdges', 3, false);

	const scrollArea = new ScrollArea({
		get type() {
			return type();
		},

		get delay() {
			return delay();
		},

		get scrollOnEdges() {
			return scrollOnEdges();
		}
	});

	const classes = $.tag($.derived(() => useScrollAreaTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var div = root_5();

	$.set_style(div, '', {}, { position: 'relative' });

	var div_1 = $.child(div);

	$.set_style(div_1, '', {}, {
		position: 'relative',
		overflow: 'scroll',
		width: '100%',
		height: '100%'
	});

	var div_2 = $.child(div_1);

	$.set_style(div_2, '', {}, { 'min-width': '100%', display: 'table', position: 'relative' });

	var node = $.child(div_2);

	$.add_svelte_meta(() => $.snippet(node, () => $$props.children ?? $.noop), 'render', ScrollArea_1, 68, 3);
	$.reset(div_2);
	$.attach(div_2, () => scrollArea.contentAttachment);
	$.reset(div_1);
	$.attach(div_1, () => scrollArea.viewportAttachment);

	var node_1 = $.sibling(div_1, 2);

	{
		var consequent = ($$anchor) => {
			var div_3 = root();
			let styles;
			var div_4 = $.child(div_3);
			let styles_1;

			$.attach(div_4, () => scrollArea.dragY.reference);
			$.attach(div_4, () => scrollArea.thumbRect.reference);
			$.reset(div_3);
			$.validate_binding('bind:this={scrollArea.scrollbarYElement}', [], () => scrollArea, () => 'scrollbarYElement', 75, 3);
			$.bind_this(div_3, ($$value) => scrollArea.scrollbarYElement = $$value, () => scrollArea?.scrollbarYElement);
			$.attach(div_3, () => scrollArea.trackAttachment);
			$.attach(div_3, () => scrollArea.trackRect.reference);

			$.template_effect(
				($0, $1) => {
					$.set_class(div_3, 1, $0, 'svelte-15q13al');

					styles = $.set_style(div_3, 'bottom: 0px', styles, {
						display: 'flex',
						'user-select': 'none',
						opacity: scrollArea.visible ? 1 : 0,
						transition: 'opacity 0.2s ease'
					});

					$.set_attribute(div_3, 'aria-valuenow', scrollArea.scrollY);
					$.set_attribute(div_3, 'aria-valuemax', scrollArea.maxScrollY);
					$.set_class(div_4, 1, $1, 'svelte-15q13al');

					styles_1 = $.set_style(div_4, '', styles_1, {
						height: scrollArea.thumbYSize + 'px',
						width: '100%',
						transform: `translateY(${scrollArea.thumbYPosition}px)`
					});
				},
				[
					() => $.clsx($.get(classes).scrollbar()),
					() => $.clsx($.get(classes).scrollbarThumb())
				]
			);

			$.transition(3, div_3, () => fade, () => ({ duration: 200 }));
			$.append($$anchor, div_3);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.strict_equals(type(), 'hover') && scrollArea.visible && scrollArea.hoover.isHovered || scrollArea.isDraggingY || $.strict_equals(type(), 'always') && scrollArea.visible || $.strict_equals(type(), 'auto') && scrollArea.visible || $.strict_equals(type(), 'scroll') && scrollArea.isScrolling) $$render(consequent);
			}),
			'if',
			ScrollArea_1,
			72,
			1
		);
	}

	var node_2 = $.sibling(node_1, 2);

	{
		var consequent_1 = ($$anchor) => {
			var div_5 = root_1();
			let styles_2;
			var div_6 = $.child(div_5);
			let styles_3;

			$.attach(div_6, () => scrollArea.dragX.reference);
			$.reset(div_5);
			$.validate_binding('bind:this={scrollArea.scrollbarXElement}', [], () => scrollArea, () => 'scrollbarXElement', 105, 3);
			$.bind_this(div_5, ($$value) => scrollArea.scrollbarXElement = $$value, () => scrollArea?.scrollbarXElement);
			$.attach(div_5, () => scrollArea.trackAttachmentX);

			$.template_effect(
				($0, $1) => {
					$.set_class(div_5, 1, $0, 'svelte-15q13al');

					styles_2 = $.set_style(div_5, 'right: 0px', styles_2, {
						display: 'flex',
						'user-select': 'none',
						opacity: scrollArea.visibleX ? 1 : 0,
						transition: 'opacity 0.2s ease'
					});

					$.set_attribute(div_5, 'aria-valuenow', scrollArea.scrollX);
					$.set_attribute(div_5, 'aria-valuemax', scrollArea.maxScrollX);
					$.set_class(div_6, 1, $1, 'svelte-15q13al');

					styles_3 = $.set_style(div_6, '', styles_3, {
						width: scrollArea.thumbXSize + 'px',
						height: '100%',
						transform: `translateX(${scrollArea.thumbXPosition}px)`
					});
				},
				[
					() => $.clsx($.get(classes).scrollbarX()),
					() => $.clsx($.get(classes).scrollbarThumb())
				]
			);

			$.transition(3, div_5, () => fade, () => ({ duration: 200 }));
			$.append($$anchor, div_5);
		};

		$.add_svelte_meta(
			() => $.if(node_2, ($$render) => {
				if ($.strict_equals(type(), 'hover') && scrollArea.visibleX && scrollArea.hoover.isHovered || scrollArea.isDraggingX || $.strict_equals(type(), 'always') && scrollArea.visibleX || $.strict_equals(type(), 'auto') && scrollArea.visibleX || $.strict_equals(type(), 'scroll') && scrollArea.isScrolling) $$render(consequent_1);
			}),
			'if',
			ScrollArea_1,
			102,
			1
		);
	}

	var node_3 = $.sibling(node_2, 2);

	{
		var consequent_4 = ($$anchor) => {
			var fragment = root_4();
			var node_4 = $.first_child(fragment);

			{
				var consequent_2 = ($$anchor) => {
					var div_7 = root_2();

					$.set_style(div_7, '', {}, { 'pointer-events': 'none' });

					var node_5 = $.child(div_7);

					$.add_svelte_meta(() => caretUpIcon(node_5, () => ({ size: 10 })), 'render', ScrollArea_1, 136, 4);
					$.reset(div_7);
					$.append($$anchor, div_7);
				};

				$.add_svelte_meta(
					() => $.if(node_4, ($$render) => {
						if (scrollArea.canScrollUp) $$render(consequent_2);
					}),
					'if',
					ScrollArea_1,
					131,
					2
				);
			}

			var node_6 = $.sibling(node_4, 2);

			{
				var consequent_3 = ($$anchor) => {
					var div_8 = root_3();

					$.set_style(div_8, '', {}, { 'pointer-events': 'none' });

					var node_7 = $.child(div_8);

					$.add_svelte_meta(() => caretDownIcon(node_7, () => ({ size: 10 })), 'render', ScrollArea_1, 145, 4);
					$.reset(div_8);
					$.append($$anchor, div_8);
				};

				$.add_svelte_meta(
					() => $.if(node_6, ($$render) => {
						if (scrollArea.canScrollDown) $$render(consequent_3);
					}),
					'if',
					ScrollArea_1,
					140,
					2
				);
			}

			$.append($$anchor, fragment);
		};

		$.add_svelte_meta(
			() => $.if(node_3, ($$render) => {
				if (scrollArea.scrollOnEdgesAttachment) $$render(consequent_4);
			}),
			'if',
			ScrollArea_1,
			130,
			1
		);
	}

	$.reset(div);
	$.attach(div, () => scrollArea.hoover.reference);
	$.attach(div, () => scrollArea.scrollOnEdgesAttachment);

	$.template_effect(
		($0, $1) => {
			$.set_class(div, 1, $0, 'svelte-15q13al');
			$.set_class(div_1, 1, $1, 'svelte-15q13al');
			$.set_attribute(div_1, 'tabindex', scrollArea.viewportTabindex);
		},
		[
			() => $.clsx($.get(classes).root({ className: className() })),
			() => $.clsx($.get(classes).viewport())
		]
	);

	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	ScrollArea_1 = $.hmr(ScrollArea_1);

	import.meta.hot.acceptExports(["default"],(module) => {
		$.cleanup_styles('svelte-15q13al');
		ScrollArea_1[$.HMR].update(module.default);
	});
}

export default ScrollArea_1;
import "/src/lib/components/ScrollArea/ScrollArea.svelte?svelte&type=style&lang.css";

//# sourceMappingURL=data:application/json;base64,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LFVBQVU7d0JBZ0JqQixPQUFPLEVBQUMsY0FBYzs7OzttQkFuQjlCLDRCQUNtQixRQUFRLEVBQUUsR0FBRztzQkFEaEM7Ozs7O3dCQURJLElBQUksSUFBSyxPQUFPLEtBQUksVUFBVSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSyxVQUFVLENBQUMsV0FBVyxvQkFBSyxJQUFJLElBQUssUUFBUSxLQUFJLFVBQVUsQ0FBQyxRQUFRLG9CQUFNLElBQUksSUFBSyxNQUFNLEtBQUksVUFBVSxDQUFDLFFBQVEsb0JBQU0sSUFBSSxJQUFLLFFBQVEsS0FBSSxVQUFVLENBQUMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBOEI5Tzs7aUJBQUE7OzBCQUFBOzs2QkFJUyxXQUFXLGtCQUFHLElBQUksRUFBRSxFQUFFO2FBSi9CO3dCQUFBOzs7OztVQURHLFVBQVUsQ0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7O1NBVXpCOztpQkFBQTs7MEJBQUE7OzZCQUlTLGFBQWEsa0JBQUcsSUFBSSxFQUFFLEVBQUU7YUFKakM7d0JBQUE7Ozs7O1VBREcsVUFBVSxDQUFDLGFBQWE7Ozs7Ozs7Ozs7Ozs7O1FBVnpCLFVBQVUsQ0FBQyx1QkFBdUI7Ozs7Ozs7OztTQWhHdkM7VUFBQSxXQUlTLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUztVQUpwQyxXQUtTLFVBQVUsQ0FBQyx1QkFBdUI7Ozs7ZUFMM0M7ZUFXQzttQkFBQSxtQkFJVSxVQUFVLENBQUMsZ0JBQWdCOzs7c0JBYi9CLE9BQU8sRUFBQyxJQUFJLEdBQUcsU0FBUyxFQUFULFNBQVM7c0JBWXZCLE9BQU8sRUFBQyxRQUFROzs7O29CQWR4Qjs7O0FBRk8iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNjcm9sbEFyZWEuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB7IGZhZGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cdGltcG9ydCB7IFNjcm9sbEFyZWEgfSBmcm9tICcuL3Njcm9sbEFyZWEuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHR5cGUgeyBTY3JvbGxBcmVhUHJvcHMgfSBmcm9tICcuL3Njcm9sbEFyZWEucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VTY3JvbGxBcmVhVGhlbWUgfSBmcm9tICcuL3Njcm9sbEFyZWEudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBjYXJldFVwRG93bkljb24gfSBmcm9tICcuLi9JY29ucy9jYXJldFVwRG93bi5qcyc7XG5cdGltcG9ydCB7IGNhcmV0VXBJY29uIH0gZnJvbSAnLi4vSWNvbnMvY2FyZXRVcC5qcyc7XG5cdGltcG9ydCB7IGNhcmV0RG93bkljb24gfSBmcm9tICcuLi9JY29ucy9jYXJldERvd24uanMnO1xuXG5cdGxldCB7XG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSA9ICcnLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGRlbGF5ID0gMCxcblx0XHR0eXBlID0gJ2hvdmVyJyxcblx0XHRzY3JvbGxPbkVkZ2VzID0gZmFsc2UsXG5cdFx0dGhlbWVcblx0fTogU2Nyb2xsQXJlYVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3Qgc2Nyb2xsQXJlYSA9IG5ldyBTY3JvbGxBcmVhKHtcblx0XHRnZXQgdHlwZSgpIHtcblx0XHRcdHJldHVybiB0eXBlO1xuXHRcdH0sXG5cdFx0Z2V0IGRlbGF5KCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5O1xuXHRcdH0sXG5cdFx0Z2V0IHNjcm9sbE9uRWRnZXMoKSB7XG5cdFx0XHRyZXR1cm4gc2Nyb2xsT25FZGdlcztcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VTY3JvbGxBcmVhVGhlbWUodGhlbWUpKTtcbjwvc2NyaXB0PlxuXG48ZGl2XG5cdGRhdGEtc2Nyb2xsLWFyZWFcblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IGNsYXNzTmFtZSB9KX1cblx0c3R5bGU6cG9zaXRpb249XCJyZWxhdGl2ZVwiXG5cdHtAYXR0YWNoIHNjcm9sbEFyZWEuaG9vdmVyLnJlZmVyZW5jZX1cblx0e0BhdHRhY2ggc2Nyb2xsQXJlYS5zY3JvbGxPbkVkZ2VzQXR0YWNobWVudH1cbj5cblx0PCEtLSBUaGUgdmlld3BvcnQgaXMgdGhlIG5hdGl2ZSBzY3JvbGwgY29udGFpbmVyIGFuZCB0aGUga2V5Ym9hcmQgc2Nyb2xsIHJlZ2lvbjogZm9jdXNhYmxlXG5cdCAgICAgb25seSB3aGVuIGl0IG92ZXJmbG93cyAoV0NBRyBTQ1IzNCBzY3JvbGxhYmxlLXJlZ2lvbiBwYXR0ZXJuKSwgc28gaXQgbmV2ZXIgYmVjb21lcyBhXG5cdCAgICAgZGVhZCB0YWIgc3RvcC4gLS0+XG5cdDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5X25vX25vbmludGVyYWN0aXZlX3RhYmluZGV4IC0tPlxuXHQ8ZGl2XG5cdFx0aWQ9XCJzY3JvbGwtYXJlYS12aWV3cG9ydFwiXG5cdFx0ZGF0YS1zY3JvbGwtYXJlYS12aWV3cG9ydFxuXHRcdGNsYXNzPXtjbGFzc2VzLnZpZXdwb3J0KCl9XG5cdFx0dGFiaW5kZXg9e3Njcm9sbEFyZWEudmlld3BvcnRUYWJpbmRleH1cblx0XHRyb2xlPVwiZ3JvdXBcIlxuXHRcdGFyaWEtbGFiZWw9XCJTY3JvbGxhYmxlIGNvbnRlbnRcIlxuXHRcdHtAYXR0YWNoIHNjcm9sbEFyZWEudmlld3BvcnRBdHRhY2htZW50fVxuXHRcdHN0eWxlOnBvc2l0aW9uPVwicmVsYXRpdmVcIlxuXHRcdHN0eWxlOm92ZXJmbG93PVwic2Nyb2xsXCJcblx0XHRzdHlsZTp3aWR0aD1cIjEwMCVcIlxuXHRcdHN0eWxlOmhlaWdodD1cIjEwMCVcIlxuXHQ+XG5cdFx0PCEtLSBkaXNwbGF5OnRhYmxlICsgbWluLXdpZHRoOjEwMCUgc2hyaW5rLXdyYXBzIHRvIHRoZSB0cnVlIGNvbnRlbnQgd2lkdGggKHNvIGEgd2lkZXIgY2hpbGRcblx0XHQgICAgIGxpa2UgQ29kZSdzIHctbWF4IDxwcmU+IG1ha2VzIHRoaXMgYm94IHdpZGVyIOKGkiByZWFsIGhvcml6b250YWwgb3ZlcmZsb3cpIHdoaWxlIGZpbGxpbmdcblx0XHQgICAgIHRoZSB2aWV3cG9ydCBmb3IgbmFycm93IGNvbnRlbnQuIEl0cyBib3JkZXItYm94IHRyYWNrcyBjb250ZW50IHdpZHRoLCBzbyB0aGUgY29udGVudFxuXHRcdCAgICAgUmVzaXplT2JzZXJ2ZXIgZmlyZXMgb24gaG9yaXpvbnRhbCBjb250ZW50IGNoYW5nZXMgYW5kIGtlZXBzIG1heFNjcm9sbFggZnJlc2guIC0tPlxuXHRcdDxkaXZcblx0XHRcdHtAYXR0YWNoIHNjcm9sbEFyZWEuY29udGVudEF0dGFjaG1lbnR9XG5cdFx0XHRzdHlsZTptaW4td2lkdGg9XCIxMDAlXCJcblx0XHRcdHN0eWxlOmRpc3BsYXk9XCJ0YWJsZVwiXG5cdFx0XHRzdHlsZTpwb3NpdGlvbj1cInJlbGF0aXZlXCJcblx0XHQ+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbj8uKCl9XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuXG5cdHsjaWYgKHR5cGUgPT09ICdob3ZlcicgJiYgc2Nyb2xsQXJlYS52aXNpYmxlICYmIHNjcm9sbEFyZWEuaG9vdmVyLmlzSG92ZXJlZCkgfHwgc2Nyb2xsQXJlYS5pc0RyYWdnaW5nWSB8fCAodHlwZSA9PT0gJ2Fsd2F5cycgJiYgc2Nyb2xsQXJlYS52aXNpYmxlKSB8fCAodHlwZSA9PT0gJ2F1dG8nICYmIHNjcm9sbEFyZWEudmlzaWJsZSkgfHwgKHR5cGUgPT09ICdzY3JvbGwnICYmIHNjcm9sbEFyZWEuaXNTY3JvbGxpbmcpfVxuXHRcdDxkaXZcblx0XHRcdHRyYW5zaXRpb246ZmFkZT17eyBkdXJhdGlvbjogMjAwIH19XG5cdFx0XHRiaW5kOnRoaXM9e3Njcm9sbEFyZWEuc2Nyb2xsYmFyWUVsZW1lbnR9XG5cdFx0XHRjbGFzcz17Y2xhc3Nlcy5zY3JvbGxiYXIoKX1cblx0XHRcdHN0eWxlPVwiYm90dG9tOiAwcHhcIlxuXHRcdFx0c3R5bGU6ZGlzcGxheT1cImZsZXhcIlxuXHRcdFx0c3R5bGU6dXNlci1zZWxlY3Q9XCJub25lXCJcblx0XHRcdHN0eWxlOm9wYWNpdHk9e3Njcm9sbEFyZWEudmlzaWJsZSA/IDEgOiAwfVxuXHRcdFx0c3R5bGU6dHJhbnNpdGlvbj1cIm9wYWNpdHkgMC4ycyBlYXNlXCJcblx0XHRcdHJvbGU9XCJzY3JvbGxiYXJcIlxuXHRcdFx0YXJpYS1jb250cm9scz1cInNjcm9sbC1hcmVhLXZpZXdwb3J0XCJcblx0XHRcdGFyaWEtdmFsdWVub3c9e3Njcm9sbEFyZWEuc2Nyb2xsWX1cblx0XHRcdGFyaWEtdmFsdWVtaW49XCIwXCJcblx0XHRcdGFyaWEtdmFsdWVtYXg9e3Njcm9sbEFyZWEubWF4U2Nyb2xsWX1cblx0XHRcdHtAYXR0YWNoIHNjcm9sbEFyZWEudHJhY2tBdHRhY2htZW50fVxuXHRcdFx0e0BhdHRhY2ggc2Nyb2xsQXJlYS50cmFja1JlY3QucmVmZXJlbmNlfVxuXHRcdD5cblx0XHRcdDxkaXZcblx0XHRcdFx0ZGF0YS10aHVtYlxuXHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5zY3JvbGxiYXJUaHVtYigpfVxuXHRcdFx0XHRzdHlsZTpoZWlnaHQ9e3Njcm9sbEFyZWEudGh1bWJZU2l6ZSArICdweCd9XG5cdFx0XHRcdHN0eWxlOndpZHRoPVwiMTAwJVwiXG5cdFx0XHRcdHN0eWxlOnRyYW5zZm9ybT17YHRyYW5zbGF0ZVkoJHtzY3JvbGxBcmVhLnRodW1iWVBvc2l0aW9ufXB4KWB9XG5cdFx0XHRcdHtAYXR0YWNoIHNjcm9sbEFyZWEuZHJhZ1kucmVmZXJlbmNlfVxuXHRcdFx0XHR7QGF0dGFjaCBzY3JvbGxBcmVhLnRodW1iUmVjdC5yZWZlcmVuY2V9XG5cdFx0XHQ+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG5cblx0eyNpZiAodHlwZSA9PT0gJ2hvdmVyJyAmJiBzY3JvbGxBcmVhLnZpc2libGVYICYmIHNjcm9sbEFyZWEuaG9vdmVyLmlzSG92ZXJlZCkgfHwgc2Nyb2xsQXJlYS5pc0RyYWdnaW5nWCB8fCAodHlwZSA9PT0gJ2Fsd2F5cycgJiYgc2Nyb2xsQXJlYS52aXNpYmxlWCkgfHwgKHR5cGUgPT09ICdhdXRvJyAmJiBzY3JvbGxBcmVhLnZpc2libGVYKSB8fCAodHlwZSA9PT0gJ3Njcm9sbCcgJiYgc2Nyb2xsQXJlYS5pc1Njcm9sbGluZyl9XG5cdFx0PGRpdlxuXHRcdFx0dHJhbnNpdGlvbjpmYWRlPXt7IGR1cmF0aW9uOiAyMDAgfX1cblx0XHRcdGJpbmQ6dGhpcz17c2Nyb2xsQXJlYS5zY3JvbGxiYXJYRWxlbWVudH1cblx0XHRcdGNsYXNzPXtjbGFzc2VzLnNjcm9sbGJhclgoKX1cblx0XHRcdHN0eWxlPVwicmlnaHQ6IDBweFwiXG5cdFx0XHRzdHlsZTpkaXNwbGF5PVwiZmxleFwiXG5cdFx0XHRzdHlsZTp1c2VyLXNlbGVjdD1cIm5vbmVcIlxuXHRcdFx0c3R5bGU6b3BhY2l0eT17c2Nyb2xsQXJlYS52aXNpYmxlWCA/IDEgOiAwfVxuXHRcdFx0c3R5bGU6dHJhbnNpdGlvbj1cIm9wYWNpdHkgMC4ycyBlYXNlXCJcblx0XHRcdHJvbGU9XCJzY3JvbGxiYXJcIlxuXHRcdFx0YXJpYS1vcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuXHRcdFx0YXJpYS1jb250cm9scz1cInNjcm9sbC1hcmVhLXZpZXdwb3J0XCJcblx0XHRcdGFyaWEtdmFsdWVub3c9e3Njcm9sbEFyZWEuc2Nyb2xsWH1cblx0XHRcdGFyaWEtdmFsdWVtaW49XCIwXCJcblx0XHRcdGFyaWEtdmFsdWVtYXg9e3Njcm9sbEFyZWEubWF4U2Nyb2xsWH1cblx0XHRcdHtAYXR0YWNoIHNjcm9sbEFyZWEudHJhY2tBdHRhY2htZW50WH1cblx0XHQ+XG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdGRhdGEtdGh1bWJcblx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuc2Nyb2xsYmFyVGh1bWIoKX1cblx0XHRcdFx0c3R5bGU6d2lkdGg9e3Njcm9sbEFyZWEudGh1bWJYU2l6ZSArICdweCd9XG5cdFx0XHRcdHN0eWxlOmhlaWdodD1cIjEwMCVcIlxuXHRcdFx0XHRzdHlsZTp0cmFuc2Zvcm09e2B0cmFuc2xhdGVYKCR7c2Nyb2xsQXJlYS50aHVtYlhQb3NpdGlvbn1weClgfVxuXHRcdFx0XHR7QGF0dGFjaCBzY3JvbGxBcmVhLmRyYWdYLnJlZmVyZW5jZX1cblx0XHRcdD48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0ey9pZn1cblx0eyNpZiBzY3JvbGxBcmVhLnNjcm9sbE9uRWRnZXNBdHRhY2htZW50fVxuXHRcdHsjaWYgc2Nyb2xsQXJlYS5jYW5TY3JvbGxVcH1cblx0XHRcdDxkaXZcblx0XHRcdFx0Y2xhc3M9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcblx0XHRcdFx0c3R5bGU6cG9pbnRlci1ldmVudHM9XCJub25lXCJcblx0XHRcdD5cblx0XHRcdFx0e0ByZW5kZXIgY2FyZXRVcEljb24oeyBzaXplOiAxMCB9KX1cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cblx0XHR7I2lmIHNjcm9sbEFyZWEuY2FuU2Nyb2xsRG93bn1cblx0XHRcdDxkaXZcblx0XHRcdFx0Y2xhc3M9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcblx0XHRcdFx0c3R5bGU6cG9pbnRlci1ldmVudHM9XCJub25lXCJcblx0XHRcdD5cblx0XHRcdFx0e0ByZW5kZXIgY2FyZXREb3duSWNvbih7IHNpemU6IDEwIH0pfVxuXHRcdFx0PC9kaXY+XG5cdFx0ey9pZn1cblx0ey9pZn1cbjwvZGl2PlxuXG48c3R5bGU+XG5cdC8qIEhpZGUgbmF0aXZlIHNjcm9sbGJhcnMgY3Jvc3MtYnJvd3NlcjsgY3VzdG9tIHRodW1icyBvdmVybGF5IHRoZSByZWFsIHNjcm9sbCBjb250YWluZXIuXG5cdCAgIEZpcmVmb3gvc3RhbmRhcmQgKyBvbGQgRWRnZSBhcmUgYWxzbyBzZXQgaW5saW5lIGluIHZpZXdwb3J0QXR0YWNobWVudCBhcyBhIGJhY2tzdG9wLiAqL1xuXHRbZGF0YS1zY3JvbGwtYXJlYS12aWV3cG9ydF0ge1xuXHRcdHNjcm9sbGJhci13aWR0aDogbm9uZTsgLyogRmlyZWZveCArIHN0YW5kYXJkICovXG5cdFx0LW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAvKiBvbGQgRWRnZS9JRSAqL1xuXHR9XG5cblx0W2RhdGEtc2Nyb2xsLWFyZWEtdmlld3BvcnRdOjotd2Via2l0LXNjcm9sbGJhciB7XG5cdFx0ZGlzcGxheTogbm9uZTsgLyogQ2hyb21lL1NhZmFyaSAqL1xuXHR9XG5cblx0W2RhdGEtc2Nyb2xsLWFyZWEtdmlld3BvcnRdOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuPC9zdHlsZT5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2Nyb2xsQXJlYS9TY3JvbGxBcmVhLnN2ZWx0ZSJ9