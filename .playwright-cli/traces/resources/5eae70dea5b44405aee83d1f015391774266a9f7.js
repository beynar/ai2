import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/ThemeSchema.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

ThemeSchema[$.FILENAME] = 'src/routes/ThemeSchema.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import structureMap from "/@id/__x00__virtual:svelai-structure?t=1783864636289";
import CustomizeTheme from "/src/routes/CustomizeTheme.svelte?t=1783864636289";

var root = $.add_locations($.from_html(`<div class="mb-3 flex flex-col gap-1 sm:flex-row sm:gap-3"><span class="text-foreground/40 shrink-0 pt-0.5 font-mono text-[11px] tracking-wide uppercase sm:w-20">base</span> <code class="text-foreground/75 font-mono text-[12.5px] break-words"> </code></div>`), ThemeSchema[$.FILENAME], [[44, 6, [[45, 7], [50, 7]]]]);
var root_1 = $.add_locations($.from_html(`<div class="flex items-baseline gap-2"><span> </span> <code class="text-foreground/70 font-mono text-[12.5px] break-words"> </code></div>`), ThemeSchema[$.FILENAME], [[63, 9, [[64, 10], [75, 10]]]]);
var root_2 = $.add_locations($.from_html(`<div class="mb-3 flex flex-col gap-1 sm:flex-row sm:gap-3"><span class="text-foreground/40 shrink-0 pt-0.5 font-mono text-[11px] tracking-wide uppercase sm:w-20"> </span> <div class="flex min-w-0 flex-col gap-1.5"></div></div>`), ThemeSchema[$.FILENAME], [[55, 6, [[56, 7], [61, 7]]]]);
var root_3 = $.add_locations($.from_html(`<section class="px-6 py-4"><h3 class="text-primary mb-3 font-mono text-[13px]"> </h3> <!> <!></section>`), ThemeSchema[$.FILENAME], [[40, 4, [[41, 5]]]]);

var root_4 = $.add_locations($.from_html(`<div class="border-background-muted bg-background w-full overflow-hidden rounded-xl border"><div class="border-background-muted/60 flex items-center justify-between gap-4 border-b px-6 py-3"><span class="text-foreground/45 text-[10.5px] font-semibold tracking-[0.12em] uppercase">Default theme</span> <div class="flex items-center gap-4"><span class="hidden flex-wrap gap-3 font-mono text-[11px] sm:flex"><span class="text-primary">theme.part</span> <span class="text-success">default</span></span> <!></div></div> <div class="divide-background-muted/60 divide-y"></div></div>`), ThemeSchema[$.FILENAME], [
	[
		22,
		1,
		[
			[23, 2, [[24, 3], [27, 3, [[28, 4, [[29, 5], [30, 5]]]]]]],
			[38, 2]
		]
	]
]);

function ThemeSchema($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, ThemeSchema);

	const setter = $.tag($.derived(() => structureMap[$$props.component]?.setter), 'setter');

	// Only parts carrying a resolvable cva definition are worth showing.
	const parts = $.tag($.derived(() => (structureMap[$$props.component]?.parts ?? []).filter((part) => part.base || part.variants && part.variants.length)), 'parts');

	function isDefault(part, variant, value) {
		return $.strict_equals(part.defaultVariants?.[variant], value);
	}

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent_2 = ($$anchor) => {
			var div = root_4();
			var div_1 = $.child(div);
			var div_2 = $.sibling($.child(div_1), 2);
			var node_1 = $.sibling($.child(div_2), 2);

			{
				var consequent = ($$anchor) => {
					var fragment_1 = $.comment();
					var node_2 = $.first_child(fragment_1);

					$.add_svelte_meta(
						() => CustomizeTheme(node_2, {
							get component() {
								return $$props.component;
							}
						}),
						'component',
						ThemeSchema,
						33,
						5,
						{ componentTag: 'CustomizeTheme' }
					);

					$.append($$anchor, fragment_1);
				};

				$.add_svelte_meta(
					() => $.if(node_1, ($$render) => {
						if ($.get(setter)) $$render(consequent);
					}),
					'if',
					ThemeSchema,
					32,
					4
				);
			}

			$.reset(div_2);
			$.reset(div_1);

			var div_3 = $.sibling(div_1, 2);

			$.add_svelte_meta(
				() => $.each(div_3, 21, () => $.get(parts), (part) => part.name, ($$anchor, part) => {
					var section = root_3();
					var h3 = $.child(section);
					var text = $.child(h3);

					$.reset(h3);

					var node_3 = $.sibling(h3, 2);

					{
						var consequent_1 = ($$anchor) => {
							var div_4 = root();
							var code = $.sibling($.child(div_4), 2);
							var text_1 = $.child(code, true);

							$.reset(code);
							$.reset(div_4);
							$.template_effect(() => $.set_text(text_1, $.get(part).base));
							$.append($$anchor, div_4);
						};

						$.add_svelte_meta(
							() => $.if(node_3, ($$render) => {
								if ($.get(part).base) $$render(consequent_1);
							}),
							'if',
							ThemeSchema,
							43,
							5
						);
					}

					var node_4 = $.sibling(node_3, 2);

					$.add_svelte_meta(
						() => $.each(node_4, 17, () => $.get(part).variants ?? [], (variant) => variant.name, ($$anchor, variant) => {
							var div_5 = root_2();
							var span = $.child(div_5);
							var text_2 = $.child(span, true);

							$.reset(span);

							var div_6 = $.sibling(span, 2);

							$.add_svelte_meta(
								() => $.each(div_6, 21, () => $.get(variant).options, (option) => option.value, ($$anchor, option) => {
									var div_7 = root_1();
									var span_1 = $.child(div_7);
									var text_3 = $.child(span_1, true);

									$.reset(span_1);

									var code_1 = $.sibling(span_1, 2);
									var text_4 = $.child(code_1, true);

									$.reset(code_1);
									$.reset(div_7);

									$.template_effect(
										($0) => {
											$.set_class(span_1, 1, `shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px] ${$0 ?? ''}`);
											$.set_text(text_3, $.get(option).value);
											$.set_text(text_4, $.get(option).classes);
										},
										[
											() => isDefault($.get(part), $.get(variant).name, $.get(option).value)
												? 'bg-success/15 text-success'
												: 'bg-background-lighter text-foreground/70'
										]
									);

									$.append($$anchor, div_7);
								}),
								'each',
								ThemeSchema,
								62,
								8
							);

							$.reset(div_6);
							$.reset(div_5);
							$.template_effect(() => $.set_text(text_2, $.get(variant).name));
							$.append($$anchor, div_5);
						}),
						'each',
						ThemeSchema,
						54,
						5
					);

					$.reset(section);
					$.template_effect(() => $.set_text(text, `theme.${$.get(part).name ?? ''}`));
					$.append($$anchor, section);
				}),
				'each',
				ThemeSchema,
				39,
				3
			);

			$.reset(div_3);
			$.reset(div);
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.get(parts).length) $$render(consequent_2);
			}),
			'if',
			ThemeSchema,
			21,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	ThemeSchema = $.hmr(ThemeSchema);

	import.meta.hot.acceptExports(["default"],(module) => {
		ThemeSchema[$.HMR].update(module.default);
	});
}

export default ThemeSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxZQUFZLE1BQU0sMEJBQTBCO0FBRW5ELE9BQU8sY0FBYyxNQUFNLHlCQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQUhyRCxDQUFDOzs7O0NBT0EsTUFBTSxNQUFNLHlCQUFZLFlBQVkscUJBQWEsTUFBTTs7O0NBRXZELE1BQU0sS0FBSywwQkFDVCxZQUFZLHFCQUFhLEtBQUssUUFBUSxNQUFNLEVBQzNDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFLLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNOztDQUkvRCxRQUFRLENBQUMsU0FBUyxDQUFDLElBQWUsRUFBRSxPQUFlLEVBQUUsS0FBYSxFQUFXO0VBQzVFLE1BQU0saUJBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQU0sS0FBSztDQUNqRDs7Ozs7Ozs7T0FJQyxHQUFHO09BQ0YsS0FBRyxXQURKLEdBQUc7T0FLRCxLQUFHLHFCQUpKLEtBQUc7a0NBSUYsS0FBRzs7Ozs7Ozs7WUFNRCxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7OztnQkFEWCxNQUFNOzs7Ozs7Ozs7V0FMWCxLQUFHO1dBSkosS0FBRzs7T0FlSCxLQUFHLGFBZkgsS0FBRzs7O2lCQWVILEtBQUcsa0JBQ0ksS0FBSyxJQUFJLElBQUksS0FBRSxJQUFJLENBQUMsSUFBSSxhQUFmLElBQUk7U0FDbEIsT0FBTztTQUNOLEVBQUUsV0FESCxPQUFPO3dCQUNOLEVBQUU7O2FBQUYsRUFBRTs7NEJBQUYsRUFBRTs7OztXQUdELEtBQUc7V0FNRixJQUFJLHFCQU5MLEtBQUc7NEJBTUYsSUFBSTs7ZUFBSixJQUFJO2VBTkwsS0FBRzt3REFNbUUsSUFBSSxFQUFDLElBQUk7MEJBTi9FLEtBQUc7Ozs7O2tCQURBLElBQUksRUFBQyxJQUFJOzs7Ozs7Ozs7Ozs7MkNBV1AsSUFBSSxFQUFDLFFBQVEsU0FBVSxPQUFPLEtBQUUsT0FBTyxDQUFDLElBQUksYUFBckIsT0FBTztXQUNuQyxLQUFHO1dBQ0YsZUFERCxLQUFHOzRCQUNGOztlQUFBOztXQUtBLEtBQUcsYUFMSDs7O3FCQUtBLEtBQUcsa0JBQ0ksT0FBTyxFQUFDLE9BQU8sR0FBSSxNQUFNLEtBQUUsTUFBTSxDQUFDLEtBQUssYUFBcEIsTUFBTTthQUM5QixLQUFHO2FBQ0YsaUJBREQsS0FBRzs4QkFDRjs7aUJBQUE7O2FBV0EsTUFBSSxhQVhKOzhCQVdBLE1BQUk7O2lCQUFKLE1BQUk7aUJBWkwsS0FBRzs7Ozt1QkFDRjtvQ0FTQyxNQUFNLEVBQUMsS0FBSztvQ0FHWCxNQUFNLEVBQUMsT0FBTzs7O2lCQVg2QyxTQUFTLE9BQ3JFLElBQUksU0FDSixPQUFPLEVBQUMsSUFBSSxRQUNaLE1BQU0sRUFBQztjQUVMLDRCQUEyQjtjQUMzQiwwQ0FBMEM7Ozs7NEJBUjlDLEtBQUc7Ozs7Ozs7O2VBRkwsS0FBRztlQU5KLEtBQUc7d0RBSUQsT0FBTyxFQUFDLElBQUk7MEJBSmQsS0FBRzs7Ozs7Ozs7YUFmTCxPQUFPOzZEQUNvRCxJQUFJLEVBQUMsSUFBSTt3QkFEcEUsT0FBTzs7Ozs7Ozs7V0FGVCxLQUFHO1dBaEJKLEdBQUc7c0JBQUgsR0FBRzs7Ozs7Y0FEQSxLQUFLLEVBQUMsTUFBTTs7Ozs7Ozs7Ozs7O0FBRlQiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlRoZW1lU2NoZW1hLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgc3RydWN0dXJlTWFwIGZyb20gJ3ZpcnR1YWw6c3ZlbGFpLXN0cnVjdHVyZSc7XG5cdGltcG9ydCB0eXBlIHsgVGhlbWVQYXJ0IH0gZnJvbSAnLi4vLi4vdG9vbGluZy9zdHJ1Y3R1cmUtZG9jcy90eXBlcyc7XG5cdGltcG9ydCBDdXN0b21pemVUaGVtZSBmcm9tICcuL0N1c3RvbWl6ZVRoZW1lLnN2ZWx0ZSc7XG5cblx0bGV0IHsgY29tcG9uZW50IH06IHsgY29tcG9uZW50OiBzdHJpbmcgfSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IHNldHRlciA9ICRkZXJpdmVkKHN0cnVjdHVyZU1hcFtjb21wb25lbnRdPy5zZXR0ZXIpO1xuXHQvLyBPbmx5IHBhcnRzIGNhcnJ5aW5nIGEgcmVzb2x2YWJsZSBjdmEgZGVmaW5pdGlvbiBhcmUgd29ydGggc2hvd2luZy5cblx0Y29uc3QgcGFydHMgPSAkZGVyaXZlZChcblx0XHQoc3RydWN0dXJlTWFwW2NvbXBvbmVudF0/LnBhcnRzID8/IFtdKS5maWx0ZXIoXG5cdFx0XHQocGFydCkgPT4gcGFydC5iYXNlIHx8IChwYXJ0LnZhcmlhbnRzICYmIHBhcnQudmFyaWFudHMubGVuZ3RoKVxuXHRcdClcblx0KTtcblxuXHRmdW5jdGlvbiBpc0RlZmF1bHQocGFydDogVGhlbWVQYXJ0LCB2YXJpYW50OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gcGFydC5kZWZhdWx0VmFyaWFudHM/Llt2YXJpYW50XSA9PT0gdmFsdWU7XG5cdH1cbjwvc2NyaXB0PlxuXG57I2lmIHBhcnRzLmxlbmd0aH1cblx0PGRpdiBjbGFzcz1cImJvcmRlci1iYWNrZ3JvdW5kLW11dGVkIGJnLWJhY2tncm91bmQgdy1mdWxsIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLXhsIGJvcmRlclwiPlxuXHRcdDxkaXYgY2xhc3M9XCJib3JkZXItYmFja2dyb3VuZC1tdXRlZC82MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgYm9yZGVyLWIgcHgtNiBweS0zXCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC80NSB0ZXh0LVsxMC41cHhdIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMTJlbV0gdXBwZXJjYXNlXCI+XG5cdFx0XHRcdERlZmF1bHQgdGhlbWVcblx0XHRcdDwvc3Bhbj5cblx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImhpZGRlbiBmbGV4LXdyYXAgZ2FwLTMgZm9udC1tb25vIHRleHQtWzExcHhdIHNtOmZsZXhcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtcHJpbWFyeVwiPnRoZW1lLnBhcnQ8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0ZXh0LXN1Y2Nlc3NcIj5kZWZhdWx0PC9zcGFuPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdHsjaWYgc2V0dGVyfVxuXHRcdFx0XHRcdDxDdXN0b21pemVUaGVtZSB7Y29tcG9uZW50fSAvPlxuXHRcdFx0XHR7L2lmfVxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cblx0XHQ8ZGl2IGNsYXNzPVwiZGl2aWRlLWJhY2tncm91bmQtbXV0ZWQvNjAgZGl2aWRlLXlcIj5cblx0XHRcdHsjZWFjaCBwYXJ0cyBhcyBwYXJ0IChwYXJ0Lm5hbWUpfVxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cInB4LTYgcHktNFwiPlxuXHRcdFx0XHRcdDxoMyBjbGFzcz1cInRleHQtcHJpbWFyeSBtYi0zIGZvbnQtbW9ubyB0ZXh0LVsxM3B4XVwiPnRoZW1lLntwYXJ0Lm5hbWV9PC9oMz5cblxuXHRcdFx0XHRcdHsjaWYgcGFydC5iYXNlfVxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1iLTMgZmxleCBmbGV4LWNvbCBnYXAtMSBzbTpmbGV4LXJvdyBzbTpnYXAtM1wiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzQwIHNocmluay0wIHB0LTAuNSBmb250LW1vbm8gdGV4dC1bMTFweF0gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2Ugc206dy0yMFwiXG5cdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRiYXNlXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PGNvZGUgY2xhc3M9XCJ0ZXh0LWZvcmVncm91bmQvNzUgZm9udC1tb25vIHRleHQtWzEyLjVweF0gYnJlYWstd29yZHNcIj57cGFydC5iYXNlfTwvY29kZT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdHsvaWZ9XG5cblx0XHRcdFx0XHR7I2VhY2ggcGFydC52YXJpYW50cyA/PyBbXSBhcyB2YXJpYW50ICh2YXJpYW50Lm5hbWUpfVxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1iLTMgZmxleCBmbGV4LWNvbCBnYXAtMSBzbTpmbGV4LXJvdyBzbTpnYXAtM1wiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzQwIHNocmluay0wIHB0LTAuNSBmb250LW1vbm8gdGV4dC1bMTFweF0gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2Ugc206dy0yMFwiXG5cdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHR7dmFyaWFudC5uYW1lfVxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4IG1pbi13LTAgZmxleC1jb2wgZ2FwLTEuNVwiPlxuXHRcdFx0XHRcdFx0XHRcdHsjZWFjaCB2YXJpYW50Lm9wdGlvbnMgYXMgb3B0aW9uIChvcHRpb24udmFsdWUpfVxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXggaXRlbXMtYmFzZWxpbmUgZ2FwLTJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInNocmluay0wIHJvdW5kZWQgcHgtMS41IHB5LTAuNSBmb250LW1vbm8gdGV4dC1bMTFweF0ge2lzRGVmYXVsdChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBhcnQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXJpYW50Lm5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb24udmFsdWVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ/ICdiZy1zdWNjZXNzLzE1IHRleHQtc3VjY2Vzcydcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogJ2JnLWJhY2tncm91bmQtbGlnaHRlciB0ZXh0LWZvcmVncm91bmQvNzAnfVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7b3B0aW9uLnZhbHVlfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxjb2RlIGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzcwIGZvbnQtbW9ubyB0ZXh0LVsxMi41cHhdIGJyZWFrLXdvcmRzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+e29wdGlvbi5jbGFzc2VzfTwvY29kZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHR7L2VhY2h9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHR7L2VhY2h9XG5cdFx0PC9kaXY+XG5cdDwvZGl2Plxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvcm91dGVzL1RoZW1lU2NoZW1hLnN2ZWx0ZSJ9