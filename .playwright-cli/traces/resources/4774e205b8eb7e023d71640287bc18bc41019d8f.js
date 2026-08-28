import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Separator/Separator.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Separator[$.FILENAME] = 'src/lib/components/Separator/Separator.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useSeparatorTheme } from "/src/lib/components/Separator/separator.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'children',
	'decorative',
	'class',
	'orientation',
	'align',
	'line',
	'color',
	'size',
	'theme'
]);

var root = $.add_locations($.from_html(`<div><!></div>`), Separator[$.FILENAME], [[22, 0]]);

function Separator($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Separator);

	let decorative = $.prop($$props, 'decorative', 3, false),
		className = $.prop($$props, 'class', 3, ''),
		orientation = $.prop($$props, 'orientation', 3, 'horizontal'),
		align = $.prop($$props, 'align', 3, 'center'),
		line = $.prop($$props, 'line', 3, true),
		color = $.prop($$props, 'color', 3, 'background'),
		size = $.prop($$props, 'size', 3, 1),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useSeparatorTheme($$props.theme)), 'classes');
	var $$exports = { ...$.legacy_api() };
	var div = root();

	$.attribute_effect(
		div,
		($0) => ({
			class: $0,
			'data-orientation': orientation(),
			'data-color': color(),
			'aria-orientation': orientation(),
			role: decorative() ? 'none' : 'separator',
			style: `--separator-border-width: ${size() ?? ''}px`,
			...attachments
		}),
		[
			() => $.get(classes).root({
				orientation: orientation(),
				color: color(),
				align: align(),
				line: line(),
				className: className()
			})
		]
	);

	var node = $.child(div);

	{
		var consequent = ($$anchor) => {
			var fragment = $.comment();
			var node_1 = $.first_child(fragment);

			{
				let $0 = $.derived(() => $.get(classes).label({ orientation: orientation() }));

				$.add_svelte_meta(
					() => Slot(node_1, {
						get render() {
							return $$props.children;
						},

						get class() {
							return $.get($0);
						}
					}),
					'component',
					Separator,
					32,
					2,
					{ componentTag: 'Slot' }
				);
			}

			$.append($$anchor, fragment);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.children) $$render(consequent);
			}),
			'if',
			Separator,
			31,
			1
		);
	}

	$.reset(div);
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Separator = $.hmr(Separator);

	import.meta.hot.acceptExports(["default"],(module) => {
		Separator[$.HMR].update(module.default);
	});
}

export default Separator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxJQUFJLE1BQU0scUJBQXFCO0FBRXRDLE9BQU8sRUFBRSxpQkFBaUIsUUFBUSxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBSHpELENBQUM7Ozs7Q0FLQSxJQUFJLEFBRUgsVUFBVSxvQ0FBRyxLQUFLO0VBQ1gsU0FBUywrQkFBRyxFQUFFO0VBQ3JCLFdBQVcscUNBQUcsWUFBWTtFQUMxQixLQUFLLCtCQUFHLFFBQVE7RUFDaEIsSUFBSSw4QkFBRyxJQUFJO0VBQ1gsS0FBSywrQkFBRyxZQUFZO0VBQ3BCLElBQUksOEJBQUcsQ0FBQztFQUVMOztDQUdKLE1BQU0sT0FBTyx5QkFBWSxpQkFBaUI7O0tBRzFDOzs7RUFBQTs7O3VCQUVrQixXQUFXO2lCQUNqQixLQUFLO3VCQUNDLFdBQVc7U0FDdkIsVUFBVSxLQUFHLE1BQU0sR0FBRyxXQUFXO3VDQUNMLElBQUk7TUFDbEMsV0FBVzs7O2VBTlIsT0FBTyxFQUFDLElBQUk7SUFBRyxXQUFXLEVBQVgsV0FBVztJQUFFLEtBQUssRUFBTCxLQUFLO0lBQUUsS0FBSyxFQUFMLEtBQUs7SUFBRSxJQUFJLEVBQUosSUFBSTtJQUFFLFNBQVMsRUFBVCxTQUFTOzs7OztvQkFEaEU7Ozs7Ozs7O21DQVVnQyxPQUFPLEVBQUMsS0FBSyxHQUFHLFdBQVcsRUFBWCxXQUFXOzs7V0FBekQsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQVZOO29CQUFBOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2VwYXJhdG9yLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgU2xvdCBmcm9tICcuLi9TbG90L1Nsb3Quc3ZlbHRlJztcblx0aW1wb3J0IHR5cGUgeyBTZXBhcmF0b3JQcm9wcyB9IGZyb20gJy4vc2VwYXJhdG9yLnByb3BzLmpzJztcblx0aW1wb3J0IHsgdXNlU2VwYXJhdG9yVGhlbWUgfSBmcm9tICcuL3NlcGFyYXRvci50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRjaGlsZHJlbixcblx0XHRkZWNvcmF0aXZlID0gZmFsc2UsXG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSA9ICcnLFxuXHRcdG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnLFxuXHRcdGFsaWduID0gJ2NlbnRlcicsXG5cdFx0bGluZSA9IHRydWUsXG5cdFx0Y29sb3IgPSAnYmFja2dyb3VuZCcsXG5cdFx0c2l6ZSA9IDEsXG5cdFx0dGhlbWUsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogU2VwYXJhdG9yUHJvcHMgPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU2VwYXJhdG9yVGhlbWUodGhlbWUpKTtcbjwvc2NyaXB0PlxuXG48ZGl2XG5cdGNsYXNzPXtjbGFzc2VzLnJvb3QoeyBvcmllbnRhdGlvbiwgY29sb3IsIGFsaWduLCBsaW5lLCBjbGFzc05hbWUgfSl9XG5cdGRhdGEtb3JpZW50YXRpb249e29yaWVudGF0aW9ufVxuXHRkYXRhLWNvbG9yPXtjb2xvcn1cblx0YXJpYS1vcmllbnRhdGlvbj17b3JpZW50YXRpb259XG5cdHJvbGU9e2RlY29yYXRpdmUgPyAnbm9uZScgOiAnc2VwYXJhdG9yJ31cblx0c3R5bGU9XCItLXNlcGFyYXRvci1ib3JkZXItd2lkdGg6IHtzaXplfXB4XCJcblx0ey4uLmF0dGFjaG1lbnRzfVxuPlxuXHR7I2lmIGNoaWxkcmVufVxuXHRcdDxTbG90IHJlbmRlcj17Y2hpbGRyZW59IGNsYXNzPXtjbGFzc2VzLmxhYmVsKHsgb3JpZW50YXRpb24gfSl9IC8+XG5cdHsvaWZ9XG48L2Rpdj5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2VwYXJhdG9yL1NlcGFyYXRvci5zdmVsdGUifQ==