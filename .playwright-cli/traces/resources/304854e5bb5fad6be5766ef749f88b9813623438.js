import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Collapsible/Collapsible.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Collapsible[$.FILENAME] = 'src/lib/components/Collapsible/Collapsible.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useCollapsibleTheme } from "/src/lib/components/Collapsible/collapsible.theme.ts";
import { slide } from "/node_modules/.vite/deps/svelte_transition.js?v=1b1d2797";
import { caretUpDownIcon } from "/src/lib/components/Icons/caretUpDown.ts";
import { caretDownIcon } from "/src/lib/components/Icons/caretDown.ts";
import { plusIcon } from "/src/lib/components/Icons/plus.ts";
import { minusIcon } from "/src/lib/components/Icons/minus.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'ref',
	'class',
	'open',
	'defaultOpen',
	'disabled',
	'onOpenChange',
	'size',
	'icon',
	'theme',
	'trigger',
	'children',
	'accessible',
	'srOnlyContent',
	'variant',
	'peekHeight'
]);

var root = $.add_locations($.from_html(`<div><!></div>`), Collapsible[$.FILENAME], [[65, 2]]);
var root_1 = $.add_locations($.from_html(`<div><!></div>`), Collapsible[$.FILENAME], [[69, 2]]);
var root_2 = $.add_locations($.from_html(`<div><div class="relative"><div class="overflow-hidden transition-[max-height] duration-300 ease-out"><div class="pb-12"><!></div></div> <div class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3"><button type="button" class="border-background-muted bg-background text-foreground/80 hover:bg-background-light pointer-events-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-55"><!> <!></button></div></div></div>`), Collapsible[$.FILENAME], [[76, 1, [[85, 2, [[86, 3, [[93, 4]]], [97, 3, [[98, 4]]]]]]]]);
var root_3 = $.add_locations($.from_html(`<div><!></div>`), Collapsible[$.FILENAME], [[138, 3]]);
var root_4 = $.add_locations($.from_html(`<div><button type="button"><!> <!></button> <!></div>`), Collapsible[$.FILENAME], [[115, 1, [[123, 2]]]]);

function Collapsible($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Collapsible);

	const // Internal state management
	// Peek variant: content is always mounted, clipped to `peekHeight` and faded
	// when closed. `contentHeight` (measured) drives a smooth max-height animation.
	// If controlled, update the bound value
	triggerIcon = $.wrap_snippet(Collapsible, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		{
			var consequent = ($$anchor) => {
				var fragment_1 = $.comment();
				var node_1 = $.first_child(fragment_1);

				{
					let $0 = $.derived(() => $.get(classes).icon({ size: size() }));
					let $1 = $.derived(() => ({ open: $.get(isOpen) }));

					$.add_svelte_meta(
						() => Slot(node_1, {
							get render() {
								return icon();
							},

							get class() {
								return $.get($0);
							},

							get payload() {
								return $.get($1);
							}
						}),
						'component',
						Collapsible,
						63,
						2,
						{ componentTag: 'Slot' }
					);
				}

				$.append($$anchor, fragment_1);
			};

			var consequent_1 = ($$anchor) => {
				var div = root();
				let styles;
				var node_2 = $.child(div);

				$.add_svelte_meta(() => $.snippet(node_2, () => $.strict_equals($.get(collapsibleState), 'open') ? plusIcon : minusIcon, () => ({ size: 16 })), 'render', Collapsible, 66, 3);
				$.reset(div);

				$.template_effect(
					($0) => {
						$.set_class(div, 1, $0);
						styles = $.set_style(div, '', styles, { transform: `rotate(${$.get(isOpen) ? '180' : '0'}deg)` });
					},
					[() => $.clsx($.get(classes).icon({ size: size() }))]
				);

				$.append($$anchor, div);
			};

			var consequent_2 = ($$anchor) => {
				var div_1 = root_1();
				let styles_1;
				var node_3 = $.child(div_1);

				$.add_svelte_meta(() => caretDownIcon(node_3, () => ({ size: 16 })), 'render', Collapsible, 70, 3);
				$.reset(div_1);

				$.template_effect(
					($0) => {
						$.set_class(div_1, 1, $0);
						styles_1 = $.set_style(div_1, '', styles_1, { transform: `rotate(${$.get(isOpen) ? '180' : '0'}deg)` });
					},
					[() => $.clsx($.get(classes).icon({ size: size() }))]
				);

				$.append($$anchor, div_1);
			};

			$.add_svelte_meta(
				() => $.if(node, ($$render) => {
					if ($.strict_equals(typeof icon(), 'function')) $$render(consequent); else if ($.strict_equals(icon(), 'math')) $$render(consequent_1, 1); else if ($.strict_equals(icon(), 'caret') || $.strict_equals(icon(), 'chevron')) $$render(consequent_2, 2);
				}),
				'if',
				Collapsible,
				62,
				1
			);
		}

		$.append($$anchor, fragment);
	});

	let ref = $.prop($$props, 'ref', 15),
		open = $.prop($$props, 'open', 15, undefined),
		defaultOpen = $.prop($$props, 'defaultOpen', 3, false),
		disabled = $.prop($$props, 'disabled', 3, false),
		size = $.prop($$props, 'size', 3, 'normal'),
		icon = $.prop($$props, 'icon', 3, 'caret'),
		variant = $.prop($$props, 'variant', 3, 'default'),
		peekHeight = $.prop($$props, 'peekHeight', 3, 80),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	let internalOpen = $.tag($.state($.proxy(defaultOpen())), 'internalOpen');
	const isOpen = $.tag($.derived(() => $.strict_equals(open(), undefined, false) ? open() : $.get(internalOpen)), 'isOpen');
	const contentId = $.tag($.derived(() => `${id}-content`), 'contentId');
	let contentHeight = $.tag($.state(0), 'contentHeight');
	const peekHeightCss = $.tag($.derived(() => $.strict_equals(typeof peekHeight(), 'number') ? `${peekHeight()}px` : peekHeight()), 'peekHeightCss');
	const maskGradient = 'linear-gradient(to bottom, rgb(0 0 0) 35%, transparent 100%)';

	const handleToggle = () => {
		if (disabled()) return;

		const newOpen = !$.get(isOpen);

		if ($.strict_equals(open(), undefined)) {
			$.set(internalOpen, newOpen);
		} else {
			// If controlled, update the bound value
			open(newOpen);
		}

		$$props.onOpenChange?.(newOpen);
	};

	const classes = $.tag($.derived(() => useCollapsibleTheme($$props.theme)), 'classes');
	const collapsibleState = $.tag($.derived(() => $.get(isOpen) ? 'open' : 'closed'), 'collapsibleState');
	var $$exports = { ...$.legacy_api() };
	var fragment_2 = $.comment();
	var node_4 = $.first_child(fragment_2);

	{
		var consequent_3 = ($$anchor) => {
			var div_2 = root_2();

			$.attribute_effect(
				div_2,
				($0) => ({
					'data-state': $.get(collapsibleState),
					'data-disabled': disabled() ? '' : undefined,
					'data-size': size(),
					'data-variant': 'peek',
					class: $0,
					...attachments
				}),
				[
					() => $.get(classes).root({ size: size(), className: $$props.class })
				]
			);

			var div_3 = $.child(div_2);
			var div_4 = $.child(div_3);
			let styles_2;
			var div_5 = $.child(div_4);
			var node_5 = $.child(div_5);

			{
				let $0 = $.derived(() => ({ open: $.get(isOpen) }));

				$.add_svelte_meta(
					() => Slot(node_5, {
						get payload() {
							return $.get($0);
						},

						get render() {
							return $$props.children;
						}
					}),
					'component',
					Collapsible,
					94,
					5,
					{ componentTag: 'Slot' }
				);
			}

			$.reset(div_5);
			$.reset(div_4);

			var div_6 = $.sibling(div_4, 2);
			var button = $.child(div_6);
			var node_6 = $.child(button);

			$.add_svelte_meta(
				() => Slot(node_6, {
					get render() {
						return $$props.trigger;
					}
				}),
				'component',
				Collapsible,
				108,
				5,
				{ componentTag: 'Slot' }
			);

			var node_7 = $.sibling(node_6, 2);

			$.add_svelte_meta(() => triggerIcon(node_7), 'render', Collapsible, 109, 5);
			$.reset(button);
			$.reset(div_6);
			$.reset(div_3);
			$.reset(div_2);
			$.bind_this(div_2, ($$value) => ref($$value), () => ref());

			$.template_effect(() => {
				$.set_attribute(div_4, 'id', $.get(contentId));

				styles_2 = $.set_style(div_4, '', styles_2, {
					'max-height': $.get(isOpen) ? `${$.get(contentHeight)}px` : $.get(peekHeightCss),
					'-webkit-mask-image': $.get(isOpen) ? undefined : maskGradient,
					'mask-image': $.get(isOpen) ? undefined : maskGradient
				});

				$.set_attribute(button, 'aria-expanded', $.get(isOpen));
				$.set_attribute(button, 'aria-controls', $.get(contentId));
				$.set_attribute(button, 'data-state', $.get(collapsibleState));
				$.set_attribute(button, 'data-disabled', disabled() ? '' : undefined);
				button.disabled = disabled();
			});

			$.bind_element_size(div_5, 'clientHeight', function set($$value) {
				$.set(contentHeight, $$value);
			});

			$.delegated('click', button, handleToggle);
			$.append($$anchor, div_2);
		};

		var alternate = ($$anchor) => {
			var div_7 = root_4();

			$.attribute_effect(
				div_7,
				($0) => ({
					'data-state': $.get(collapsibleState),
					'data-disabled': disabled() ? '' : undefined,
					'data-size': size(),
					class: $0,
					...attachments
				}),
				[
					() => $.get(classes).root({ size: size(), className: $$props.class })
				]
			);

			var button_1 = $.child(div_7);
			var node_8 = $.child(button_1);

			$.add_svelte_meta(
				() => Slot(node_8, {
					get render() {
						return $$props.trigger;
					}
				}),
				'component',
				Collapsible,
				133,
				3,
				{ componentTag: 'Slot' }
			);

			var node_9 = $.sibling(node_8, 2);

			$.add_svelte_meta(() => triggerIcon(node_9), 'render', Collapsible, 134, 3);
			$.reset(button_1);

			var node_10 = $.sibling(button_1, 2);

			{
				var consequent_4 = ($$anchor) => {
					var div_8 = root_3();
					var node_11 = $.child(div_8);

					{
						let $0 = $.derived(() => ({ open: $.get(isOpen) }));

						$.add_svelte_meta(
							() => Slot(node_11, {
								get payload() {
									return $.get($0);
								},

								get render() {
									return $$props.children;
								}
							}),
							'component',
							Collapsible,
							145,
							4,
							{ componentTag: 'Slot' }
						);
					}

					$.reset(div_8);

					$.template_effect(
						($0) => {
							$.set_attribute(div_8, 'id', $.get(contentId));
							$.set_attribute(div_8, 'data-state', $.get(collapsibleState));
							$.set_attribute(div_8, 'data-disabled', disabled() ? '' : undefined);
							$.set_class(div_8, 1, $0);
						},
						[() => $.clsx($.get(classes).content({ size: size() }))]
					);

					$.transition(3, div_8, () => slide, () => ({ duration: 200 }));
					$.append($$anchor, div_8);
				};

				var consequent_5 = ($$anchor) => {
					var fragment_3 = $.comment();
					var node_12 = $.first_child(fragment_3);

					{
						let $0 = $.derived(() => $$props.srOnlyContent || $$props.children);

						$.add_svelte_meta(
							() => Slot(node_12, {
								get render() {
									return $.get($0);
								}
							}),
							'component',
							Collapsible,
							148,
							3,
							{ componentTag: 'Slot' }
						);
					}

					$.append($$anchor, fragment_3);
				};

				$.add_svelte_meta(
					() => $.if(node_10, ($$render) => {
						if ($.get(isOpen)) $$render(consequent_4); else if ($$props.accessible || $$props.srOnlyContent) $$render(consequent_5, 1);
					}),
					'if',
					Collapsible,
					137,
					2
				);
			}

			$.reset(div_7);
			$.bind_this(div_7, ($$value) => ref($$value), () => ref());

			$.template_effect(
				($0) => {
					$.set_attribute(button_1, 'aria-expanded', $.get(isOpen));
					$.set_attribute(button_1, 'aria-controls', $.get(contentId));
					$.set_attribute(button_1, 'data-state', $.get(collapsibleState));
					$.set_attribute(button_1, 'data-disabled', disabled() ? '' : undefined);
					button_1.disabled = disabled();
					$.set_class(button_1, 1, $0);
				},
				[
					() => $.clsx($.get(classes).trigger({ size: size(), disabled: disabled() }))
				]
			);

			$.delegated('click', button_1, handleToggle);
			$.append($$anchor, div_7);
		};

		$.add_svelte_meta(
			() => $.if(node_4, ($$render) => {
				if ($.strict_equals(variant(), 'peek')) $$render(consequent_3); else $$render(alternate, -1);
			}),
			'if',
			Collapsible,
			75,
			0
		);
	}

	$.append($$anchor, fragment_2);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Collapsible = $.hmr(Collapsible);

	import.meta.hot.acceptExports(["default"],(module) => {
		Collapsible[$.HMR].update(module.default);
	});
}

export default Collapsible;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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QUFHLFNBQVM7bUJBSHhDOzswQkFJTyxPQUFPLEVBQUMsT0FBTyxHQUFHLElBQUksRUFBSixJQUFJOzs7cUJBSjdCLDZCQUtvQixRQUFRLEVBQUUsR0FBRzt3QkFMakM7Ozs7Ozs7Ozs7O2FBVUEsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQVhELE1BQU07Ozs7Ozs7OztXQXRCWDtlQUFBLG9CQUNXLEdBQUcsaUJBQUgsR0FBRzs7OztxQkFPYixpQ0FFZSxNQUFNO3FCQUZyQixpQ0FHZSxTQUFTO3FCQUh4Qiw4QkFJWSxnQkFBZ0I7cUJBSjVCLDJCQUtlLFFBQVEsS0FBRyxFQUFFLEdBQUcsU0FBUztLQUx4QyxvQkFNQyxRQUFRO2lCQU5UOzs7d0JBT08sT0FBTyxFQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUosSUFBSSxJQUFFLFFBQVEsRUFBUixRQUFROzs7O3dCQVB2QyxVQVFTLFlBQVk7c0JBaEJ0Qjs7Ozs7d0JBeENHLE9BQU8sSUFBSyxNQUFNOzs7Ozs7Ozs7Ozs7QUFoQmYiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkNvbGxhcHNpYmxlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgU2xvdCBmcm9tICcuLi9TbG90L1Nsb3Quc3ZlbHRlJztcblx0aW1wb3J0IHR5cGUgeyBDb2xsYXBzaWJsZVByb3BzIH0gZnJvbSAnLi9jb2xsYXBzaWJsZS5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZUNvbGxhcHNpYmxlVGhlbWUgfSBmcm9tICcuL2NvbGxhcHNpYmxlLnRoZW1lLmpzJztcblx0aW1wb3J0IHsgc2xpZGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cdGltcG9ydCB7IGNhcmV0VXBEb3duSWNvbiB9IGZyb20gJy4uL0ljb25zL2NhcmV0VXBEb3duLmpzJztcblx0aW1wb3J0IHsgY2FyZXREb3duSWNvbiB9IGZyb20gJy4uL0ljb25zL2NhcmV0RG93bi5qcyc7XG5cdGltcG9ydCB7IHBsdXNJY29uIH0gZnJvbSAnLi4vSWNvbnMvcGx1cy5qcyc7XG5cdGltcG9ydCB7IG1pbnVzSWNvbiB9IGZyb20gJy4uL0ljb25zL21pbnVzLmpzJztcblxuXHRsZXQge1xuXHRcdHJlZiA9ICRiaW5kYWJsZSgpLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0b3BlbiA9ICRiaW5kYWJsZSh1bmRlZmluZWQpLFxuXHRcdGRlZmF1bHRPcGVuID0gZmFsc2UsXG5cdFx0ZGlzYWJsZWQgPSBmYWxzZSxcblx0XHRvbk9wZW5DaGFuZ2UsXG5cdFx0c2l6ZSA9ICdub3JtYWwnLFxuXHRcdGljb24gPSAnY2FyZXQnLFxuXHRcdHRoZW1lLFxuXHRcdHRyaWdnZXIsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0YWNjZXNzaWJsZSxcblx0XHRzck9ubHlDb250ZW50LFxuXHRcdHZhcmlhbnQgPSAnZGVmYXVsdCcsXG5cdFx0cGVla0hlaWdodCA9IDgwLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IENvbGxhcHNpYmxlUHJvcHMgPSAkcHJvcHMoKTtcblxuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXG5cdC8vIEludGVybmFsIHN0YXRlIG1hbmFnZW1lbnRcblx0bGV0IGludGVybmFsT3BlbiA9ICRzdGF0ZShkZWZhdWx0T3Blbik7XG5cdGNvbnN0IGlzT3BlbiA9ICRkZXJpdmVkKG9wZW4gIT09IHVuZGVmaW5lZCA/IG9wZW4gOiBpbnRlcm5hbE9wZW4pO1xuXG5cdGNvbnN0IGNvbnRlbnRJZCA9ICRkZXJpdmVkKGAke2lkfS1jb250ZW50YCk7XG5cblx0Ly8gUGVlayB2YXJpYW50OiBjb250ZW50IGlzIGFsd2F5cyBtb3VudGVkLCBjbGlwcGVkIHRvIGBwZWVrSGVpZ2h0YCBhbmQgZmFkZWRcblx0Ly8gd2hlbiBjbG9zZWQuIGBjb250ZW50SGVpZ2h0YCAobWVhc3VyZWQpIGRyaXZlcyBhIHNtb290aCBtYXgtaGVpZ2h0IGFuaW1hdGlvbi5cblx0bGV0IGNvbnRlbnRIZWlnaHQgPSAkc3RhdGUoMCk7XG5cdGNvbnN0IHBlZWtIZWlnaHRDc3MgPSAkZGVyaXZlZCh0eXBlb2YgcGVla0hlaWdodCA9PT0gJ251bWJlcicgPyBgJHtwZWVrSGVpZ2h0fXB4YCA6IHBlZWtIZWlnaHQpO1xuXHRjb25zdCBtYXNrR3JhZGllbnQgPSAnbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiKDAgMCAwKSAzNSUsIHRyYW5zcGFyZW50IDEwMCUpJztcblxuXHRjb25zdCBoYW5kbGVUb2dnbGUgPSAoKSA9PiB7XG5cdFx0aWYgKGRpc2FibGVkKSByZXR1cm47XG5cdFx0Y29uc3QgbmV3T3BlbiA9ICFpc09wZW47XG5cdFx0aWYgKG9wZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aW50ZXJuYWxPcGVuID0gbmV3T3Blbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgY29udHJvbGxlZCwgdXBkYXRlIHRoZSBib3VuZCB2YWx1ZVxuXHRcdFx0b3BlbiA9IG5ld09wZW47XG5cdFx0fVxuXHRcdG9uT3BlbkNoYW5nZT8uKG5ld09wZW4pO1xuXHR9O1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VDb2xsYXBzaWJsZVRoZW1lKHRoZW1lKSk7XG5cblx0Y29uc3QgY29sbGFwc2libGVTdGF0ZSA9ICRkZXJpdmVkKGlzT3BlbiA/ICdvcGVuJyA6ICdjbG9zZWQnKTtcbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgdHJpZ2dlckljb24oKX1cblx0eyNpZiB0eXBlb2YgaWNvbiA9PT0gJ2Z1bmN0aW9uJ31cblx0XHQ8U2xvdCByZW5kZXI9e2ljb259IGNsYXNzPXtjbGFzc2VzLmljb24oeyBzaXplIH0pfSBwYXlsb2FkPXt7IG9wZW46IGlzT3BlbiB9fSAvPlxuXHR7OmVsc2UgaWYgaWNvbiA9PT0gJ21hdGgnfVxuXHRcdDxkaXYgc3R5bGU6dHJhbnNmb3JtPVwicm90YXRlKHtpc09wZW4gPyAnMTgwJyA6ICcwJ31kZWcpXCIgY2xhc3M9e2NsYXNzZXMuaWNvbih7IHNpemUgfSl9PlxuXHRcdFx0e0ByZW5kZXIgKGNvbGxhcHNpYmxlU3RhdGUgPT09ICdvcGVuJyA/IHBsdXNJY29uIDogbWludXNJY29uKSh7IHNpemU6IDE2IH0pfVxuXHRcdDwvZGl2PlxuXHR7OmVsc2UgaWYgaWNvbiA9PT0gJ2NhcmV0JyB8fCBpY29uID09PSAnY2hldnJvbid9XG5cdFx0PGRpdiBzdHlsZTp0cmFuc2Zvcm09XCJyb3RhdGUoe2lzT3BlbiA/ICcxODAnIDogJzAnfWRlZylcIiBjbGFzcz17Y2xhc3Nlcy5pY29uKHsgc2l6ZSB9KX0+XG5cdFx0XHR7QHJlbmRlciBjYXJldERvd25JY29uKHsgc2l6ZTogMTYgfSl9XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG57L3NuaXBwZXR9XG5cbnsjaWYgdmFyaWFudCA9PT0gJ3BlZWsnfVxuXHQ8ZGl2XG5cdFx0YmluZDp0aGlzPXtyZWZ9XG5cdFx0ZGF0YS1zdGF0ZT17Y29sbGFwc2libGVTdGF0ZX1cblx0XHRkYXRhLWRpc2FibGVkPXtkaXNhYmxlZCA/ICcnIDogdW5kZWZpbmVkfVxuXHRcdGRhdGEtc2l6ZT17c2l6ZX1cblx0XHRkYXRhLXZhcmlhbnQ9XCJwZWVrXCJcblx0XHRjbGFzcz17Y2xhc3Nlcy5yb290KHsgc2l6ZSwgY2xhc3NOYW1lIH0pfVxuXHRcdHsuLi5hdHRhY2htZW50c31cblx0PlxuXHRcdDxkaXYgY2xhc3M9XCJyZWxhdGl2ZVwiPlxuXHRcdFx0PGRpdlxuXHRcdFx0XHRpZD17Y29udGVudElkfVxuXHRcdFx0XHRjbGFzcz1cIm92ZXJmbG93LWhpZGRlbiB0cmFuc2l0aW9uLVttYXgtaGVpZ2h0XSBkdXJhdGlvbi0zMDAgZWFzZS1vdXRcIlxuXHRcdFx0XHRzdHlsZTptYXgtaGVpZ2h0PXtpc09wZW4gPyBgJHtjb250ZW50SGVpZ2h0fXB4YCA6IHBlZWtIZWlnaHRDc3N9XG5cdFx0XHRcdHN0eWxlOi13ZWJraXQtbWFzay1pbWFnZT17aXNPcGVuID8gdW5kZWZpbmVkIDogbWFza0dyYWRpZW50fVxuXHRcdFx0XHRzdHlsZTptYXNrLWltYWdlPXtpc09wZW4gPyB1bmRlZmluZWQgOiBtYXNrR3JhZGllbnR9XG5cdFx0XHQ+XG5cdFx0XHRcdDxkaXYgYmluZDpjbGllbnRIZWlnaHQ9e2NvbnRlbnRIZWlnaHR9IGNsYXNzPVwicGItMTJcIj5cblx0XHRcdFx0XHQ8U2xvdCBwYXlsb2FkPXt7IG9wZW46IGlzT3BlbiB9fSByZW5kZXI9e2NoaWxkcmVufSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteC0wIGJvdHRvbS0wIGZsZXgganVzdGlmeS1jZW50ZXIgcGItM1wiPlxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxuXHRcdFx0XHRcdGFyaWEtY29udHJvbHM9e2NvbnRlbnRJZH1cblx0XHRcdFx0XHRkYXRhLXN0YXRlPXtjb2xsYXBzaWJsZVN0YXRlfVxuXHRcdFx0XHRcdGRhdGEtZGlzYWJsZWQ9e2Rpc2FibGVkID8gJycgOiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0e2Rpc2FibGVkfVxuXHRcdFx0XHRcdGNsYXNzPVwiYm9yZGVyLWJhY2tncm91bmQtbXV0ZWQgYmctYmFja2dyb3VuZCB0ZXh0LWZvcmVncm91bmQvODAgaG92ZXI6YmctYmFja2dyb3VuZC1saWdodCBwb2ludGVyLWV2ZW50cy1hdXRvIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHJvdW5kZWQtZnVsbCBib3JkZXIgcHgtMyBweS0xIHRleHQtc20gZm9udC1tZWRpdW0gc2hhZG93LXNtIHRyYW5zaXRpb24gZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGRpc2FibGVkOm9wYWNpdHktNTVcIlxuXHRcdFx0XHRcdG9uY2xpY2s9e2hhbmRsZVRvZ2dsZX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxTbG90IHJlbmRlcj17dHJpZ2dlcn0gLz5cblx0XHRcdFx0XHR7QHJlbmRlciB0cmlnZ2VySWNvbigpfVxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbns6ZWxzZX1cblx0PGRpdlxuXHRcdGJpbmQ6dGhpcz17cmVmfVxuXHRcdGRhdGEtc3RhdGU9e2NvbGxhcHNpYmxlU3RhdGV9XG5cdFx0ZGF0YS1kaXNhYmxlZD17ZGlzYWJsZWQgPyAnJyA6IHVuZGVmaW5lZH1cblx0XHRkYXRhLXNpemU9e3NpemV9XG5cdFx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IHNpemUsIGNsYXNzTmFtZSB9KX1cblx0XHR7Li4uYXR0YWNobWVudHN9XG5cdD5cblx0XHQ8YnV0dG9uXG5cdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cblx0XHRcdGFyaWEtY29udHJvbHM9e2NvbnRlbnRJZH1cblx0XHRcdGRhdGEtc3RhdGU9e2NvbGxhcHNpYmxlU3RhdGV9XG5cdFx0XHRkYXRhLWRpc2FibGVkPXtkaXNhYmxlZCA/ICcnIDogdW5kZWZpbmVkfVxuXHRcdFx0e2Rpc2FibGVkfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMudHJpZ2dlcih7IHNpemUsIGRpc2FibGVkIH0pfVxuXHRcdFx0b25jbGljaz17aGFuZGxlVG9nZ2xlfVxuXHRcdD5cblx0XHRcdDxTbG90IHJlbmRlcj17dHJpZ2dlcn0gLz5cblx0XHRcdHtAcmVuZGVyIHRyaWdnZXJJY29uKCl9XG5cdFx0PC9idXR0b24+XG5cblx0XHR7I2lmIGlzT3Blbn1cblx0XHRcdDxkaXZcblx0XHRcdFx0aWQ9e2NvbnRlbnRJZH1cblx0XHRcdFx0ZGF0YS1zdGF0ZT17Y29sbGFwc2libGVTdGF0ZX1cblx0XHRcdFx0ZGF0YS1kaXNhYmxlZD17ZGlzYWJsZWQgPyAnJyA6IHVuZGVmaW5lZH1cblx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuY29udGVudCh7IHNpemUgfSl9XG5cdFx0XHRcdHRyYW5zaXRpb246c2xpZGU9e3sgZHVyYXRpb246IDIwMCB9fVxuXHRcdFx0PlxuXHRcdFx0XHQ8U2xvdCBwYXlsb2FkPXt7IG9wZW46IGlzT3BlbiB9fSByZW5kZXI9e2NoaWxkcmVufSAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0ezplbHNlIGlmIGFjY2Vzc2libGUgfHwgc3JPbmx5Q29udGVudH1cblx0XHRcdDxTbG90IHJlbmRlcj17c3JPbmx5Q29udGVudCB8fCBjaGlsZHJlbn0gLz5cblx0XHR7L2lmfVxuXHQ8L2Rpdj5cbnsvaWZ9XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0NvbGxhcHNpYmxlL0NvbGxhcHNpYmxlLnN2ZWx0ZSJ9