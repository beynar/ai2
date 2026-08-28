import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/DocPage.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

DocPage[$.FILENAME] = 'src/routes/DocPage.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Tabbar from "/src/lib/components/Tabbar/Tabbar.svelte";
import PropsTable from "/src/routes/PropsTable.svelte";
import StructureSchema from "/src/routes/StructureSchema.svelte?t=1783864636289";
import ThemeSchema from "/src/routes/ThemeSchema.svelte?t=1783864636289";

var root = $.add_locations($.from_html(`<p class="text-foreground/70 mt-2 text-base"> </p>`), DocPage[$.FILENAME], [[36, 3]]);
var root_1 = $.add_locations($.from_html(`<li class="border-background-muted bg-background text-foreground/80 inline-flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-2 text-xs"><svg class="text-primary size-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"></path></svg> </li>`), DocPage[$.FILENAME], [[43, 4, [[46, 5, [[52, 6]]]]]]);
var root_2 = $.add_locations($.from_html(`<ul class="mb-8 flex flex-wrap gap-2"></ul>`), DocPage[$.FILENAME], [[41, 2]]);
var root_3 = $.add_locations($.from_html(`<div class="grid gap-10"><!></div> <!>`, 1), DocPage[$.FILENAME], [[68, 3]]);
var root_4 = $.add_locations($.from_html(`<div class="grid gap-10"><!></div>`), DocPage[$.FILENAME], [[76, 4]]);
var root_5 = $.add_locations($.from_html(`<p class="text-foreground/60 text-sm">No examples yet for this component.</p>`), DocPage[$.FILENAME], [[80, 4]]);
var root_6 = $.add_locations($.from_html(`<div class="grid gap-8"><!> <!></div>`), DocPage[$.FILENAME], [[83, 3]]);
var root_7 = $.add_locations($.from_html(`<p class="text-foreground/60 text-sm">No structural schema for this component.</p>`), DocPage[$.FILENAME], [[88, 3]]);
var root_8 = $.add_locations($.from_html(`<article class="mx-auto w-full max-w-6xl"><header class="mb-6"><h1 class="text-foreground text-3xl font-bold tracking-tight"> </h1> <!></header> <!> <!> <div class="mt-8"><!></div></article>`), DocPage[$.FILENAME], [[32, 0, [[33, 1, [[34, 2]]], [66, 1]]]]);

function DocPage($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, DocPage);

	/** Component key for the props table + structure schema (e.g. "Button"). */
	/** 2-6 highlights: accessibility, underlying library, ergonomics. */
	/** Usage tab: a simple demo of the component. */
	/** Examples tab: every meaningful variation. */
	const tabs = ['Usage', 'Examples', 'Structure'];

	let activeTab = $.tag($.state(0), 'activeTab');
	var $$exports = { ...$.legacy_api() };
	var article = root_8();
	var header = $.child(article);
	var h1 = $.child(header);
	var text = $.child(h1, true);

	$.reset(h1);

	var node = $.sibling(h1, 2);

	{
		var consequent = ($$anchor) => {
			var p = root();
			var text_1 = $.child(p, true);

			$.reset(p);
			$.template_effect(() => $.set_text(text_1, $$props.subtitle));
			$.append($$anchor, p);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.subtitle) $$render(consequent);
			}),
			'if',
			DocPage,
			35,
			2
		);
	}

	$.reset(header);

	var node_1 = $.sibling(header, 2);

	{
		var consequent_1 = ($$anchor) => {
			var ul = root_2();

			$.add_svelte_meta(
				() => $.each(ul, 20, () => $$props.features, (feature) => feature, ($$anchor, feature) => {
					var li = root_1();
					var text_2 = $.sibling($.child(li));

					$.reset(li);
					$.template_effect(() => $.set_text(text_2, ` ${feature ?? ''}`));
					$.append($$anchor, li);
				}),
				'each',
				DocPage,
				42,
				3
			);

			$.reset(ul);
			$.append($$anchor, ul);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($$props.features && $$props.features.length) $$render(consequent_1);
			}),
			'if',
			DocPage,
			40,
			1
		);
	}

	var node_2 = $.sibling(node_1, 2);

	$.add_svelte_meta(
		() => Tabbar(node_2, {
			get items() {
				return tabs;
			},

			get activeTab() {
				return $.get(activeTab);
			},

			set activeTab($$value) {
				$.set(activeTab, $$value, true);
			}
		}),
		'component',
		DocPage,
		64,
		1,
		{ componentTag: 'Tabbar' }
	);

	var div = $.sibling(node_2, 2);
	var node_3 = $.child(div);

	{
		var consequent_3 = ($$anchor) => {
			var fragment = root_3();
			var div_1 = $.first_child(fragment);
			var node_4 = $.child(div_1);

			$.add_svelte_meta(() => $.snippet(node_4, () => $$props.children), 'render', DocPage, 69, 4);
			$.reset(div_1);

			var node_5 = $.sibling(div_1, 2);

			{
				var consequent_2 = ($$anchor) => {
					var fragment_1 = $.comment();
					var node_6 = $.first_child(fragment_1);

					$.add_svelte_meta(
						() => PropsTable(node_6, {
							get component() {
								return $$props.component;
							}
						}),
						'component',
						DocPage,
						72,
						4,
						{ componentTag: 'PropsTable' }
					);

					$.append($$anchor, fragment_1);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if ($$props.component) $$render(consequent_2);
					}),
					'if',
					DocPage,
					71,
					3
				);
			}

			$.append($$anchor, fragment);
		};

		var consequent_5 = ($$anchor) => {
			var fragment_2 = $.comment();
			var node_7 = $.first_child(fragment_2);

			{
				var consequent_4 = ($$anchor) => {
					var div_2 = root_4();
					var node_8 = $.child(div_2);

					$.add_svelte_meta(() => $.snippet(node_8, () => $$props.examples), 'render', DocPage, 77, 5);
					$.reset(div_2);
					$.append($$anchor, div_2);
				};

				var alternate = ($$anchor) => {
					var p_1 = root_5();

					$.append($$anchor, p_1);
				};

				$.add_svelte_meta(
					() => $.if(node_7, ($$render) => {
						if ($$props.examples) $$render(consequent_4); else $$render(alternate, -1);
					}),
					'if',
					DocPage,
					75,
					3
				);
			}

			$.append($$anchor, fragment_2);
		};

		var consequent_6 = ($$anchor) => {
			var div_3 = root_6();
			var node_9 = $.child(div_3);

			$.add_svelte_meta(
				() => StructureSchema(node_9, {
					get component() {
						return $$props.component;
					}
				}),
				'component',
				DocPage,
				84,
				4,
				{ componentTag: 'StructureSchema' }
			);

			var node_10 = $.sibling(node_9, 2);

			$.add_svelte_meta(
				() => ThemeSchema(node_10, {
					get component() {
						return $$props.component;
					}
				}),
				'component',
				DocPage,
				85,
				4,
				{ componentTag: 'ThemeSchema' }
			);

			$.reset(div_3);
			$.append($$anchor, div_3);
		};

		var alternate_1 = ($$anchor) => {
			var p_2 = root_7();

			$.append($$anchor, p_2);
		};

		$.add_svelte_meta(
			() => $.if(node_3, ($$render) => {
				if ($.strict_equals($.get(activeTab), 0)) $$render(consequent_3); else if ($.strict_equals($.get(activeTab), 1)) $$render(consequent_5, 1); else if ($$props.component) $$render(consequent_6, 2); else $$render(alternate_1, -1);
			}),
			'if',
			DocPage,
			67,
			2
		);
	}

	$.reset(div);
	$.reset(article);
	$.template_effect(() => $.set_text(text, $$props.title));
	$.append($$anchor, article);

	return $.pop($$exports);
}

if (import.meta.hot) {
	DocPage = $.hmr(DocPage);

	import.meta.hot.acceptExports(["default"],(module) => {
		DocPage[$.HMR].update(module.default);
	});
}

export default DocPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxNQUFNLE1BQU0sc0NBQXNDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLHFCQUFxQjtBQUM1QyxPQUFPLGVBQWUsTUFBTSwwQkFBMEI7QUFDdEQsT0FBTyxXQUFXLE1BQU0sc0JBQXNCOzs7Ozs7Ozs7Ozs7b0NBTC9DLENBQUM7Ozs7Ozs7O0NBMkJBLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVzs7Q0FDOUMsSUFBSSxTQUFTLFNBQUcsT0FBTSxDQUFDLENBQUM7O0tBR3hCLE9BQU87S0FDTixNQUFNLFdBRFAsT0FBTztLQUVMLEVBQUUsV0FESCxNQUFNO29CQUNMLEVBQUU7O1NBQUYsRUFBRTs7c0JBQUYsRUFBRTs7OztPQUVELENBQUM7d0JBQUQsQ0FBQzs7V0FBRCxDQUFDOztzQkFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztTQUhILE1BQU07O3dCQUFOLE1BQU07Ozs7T0FRTCxFQUFFOzs7aUJBQUYsRUFBRSwrQkFDaUIsT0FBTyxLQUFFLE9BQU8sYUFBaEIsT0FBTztTQUN4QjtvQ0FBQTs7YUFBQTtvREFlQyxPQUFPO3dCQWZSOzs7Ozs7OztXQUZGLEVBQUU7c0JBQUYsRUFBRTs7Ozs7NkNBRHNCLE1BQU07Ozs7Ozs7Ozs7OztRQXdCL0IsTUFBTTs7V0FBUSxJQUFJOzs7T0FBRSxTQUFjOzs7O09BQWQsU0FBYzs7Ozs7Ozs7Ozs7S0FFbEMsR0FBRztzQkFBSCxHQUFHOzs7OztPQUVELEtBQUc7d0JBQUgsS0FBRzs7O1dBQUgsS0FBRzs7MEJBQUgsS0FBRzs7Ozs7Ozs7WUFJRixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUlWLEtBQUc7MEJBQUgsS0FBRzs7O2FBQUgsS0FBRzt3QkFBSCxLQUFHOzs7O1NBSUgsR0FBQzs7d0JBQUQsR0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BR0YsS0FBRzt3QkFBSCxLQUFHOzs7VUFDRixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7VUFDZixXQUFXOzs7Ozs7Ozs7Ozs7V0FGWixLQUFHO3NCQUFILEtBQUc7Ozs7T0FLSCxHQUFDOztzQkFBRCxHQUFDOzs7Ozs4QkFyQkUsU0FBUyxHQUFLLENBQUMsMERBT1YsU0FBUyxHQUFLLENBQUM7Ozs7Ozs7OztTQVJ6QixHQUFHO1NBbENKLE9BQU87O29CQUFQLE9BQU87OztBQUZBIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEb2NQYWdlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IFNuaXBwZXQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgVGFiYmFyIGZyb20gJyRsaWIvY29tcG9uZW50cy9UYWJiYXIvVGFiYmFyLnN2ZWx0ZSc7XG5cdGltcG9ydCBQcm9wc1RhYmxlIGZyb20gJy4vUHJvcHNUYWJsZS5zdmVsdGUnO1xuXHRpbXBvcnQgU3RydWN0dXJlU2NoZW1hIGZyb20gJy4vU3RydWN0dXJlU2NoZW1hLnN2ZWx0ZSc7XG5cdGltcG9ydCBUaGVtZVNjaGVtYSBmcm9tICcuL1RoZW1lU2NoZW1hLnN2ZWx0ZSc7XG5cblx0bGV0IHtcblx0XHR0aXRsZSxcblx0XHRzdWJ0aXRsZSxcblx0XHRjb21wb25lbnQsXG5cdFx0ZmVhdHVyZXMsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0ZXhhbXBsZXNcblx0fToge1xuXHRcdHRpdGxlOiBzdHJpbmc7XG5cdFx0c3VidGl0bGU/OiBzdHJpbmc7XG5cdFx0LyoqIENvbXBvbmVudCBrZXkgZm9yIHRoZSBwcm9wcyB0YWJsZSArIHN0cnVjdHVyZSBzY2hlbWEgKGUuZy4gXCJCdXR0b25cIikuICovXG5cdFx0Y29tcG9uZW50Pzogc3RyaW5nO1xuXHRcdC8qKiAyLTYgaGlnaGxpZ2h0czogYWNjZXNzaWJpbGl0eSwgdW5kZXJseWluZyBsaWJyYXJ5LCBlcmdvbm9taWNzLiAqL1xuXHRcdGZlYXR1cmVzPzogc3RyaW5nW107XG5cdFx0LyoqIFVzYWdlIHRhYjogYSBzaW1wbGUgZGVtbyBvZiB0aGUgY29tcG9uZW50LiAqL1xuXHRcdGNoaWxkcmVuOiBTbmlwcGV0O1xuXHRcdC8qKiBFeGFtcGxlcyB0YWI6IGV2ZXJ5IG1lYW5pbmdmdWwgdmFyaWF0aW9uLiAqL1xuXHRcdGV4YW1wbGVzPzogU25pcHBldDtcblx0fSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IHRhYnMgPSBbJ1VzYWdlJywgJ0V4YW1wbGVzJywgJ1N0cnVjdHVyZSddO1xuXHRsZXQgYWN0aXZlVGFiID0gJHN0YXRlKDApO1xuPC9zY3JpcHQ+XG5cbjxhcnRpY2xlIGNsYXNzPVwibXgtYXV0byB3LWZ1bGwgbWF4LXctNnhsXCI+XG5cdDxoZWFkZXIgY2xhc3M9XCJtYi02XCI+XG5cdFx0PGgxIGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kIHRleHQtM3hsIGZvbnQtYm9sZCB0cmFja2luZy10aWdodFwiPnt0aXRsZX08L2gxPlxuXHRcdHsjaWYgc3VidGl0bGV9XG5cdFx0XHQ8cCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC83MCBtdC0yIHRleHQtYmFzZVwiPntzdWJ0aXRsZX08L3A+XG5cdFx0ey9pZn1cblx0PC9oZWFkZXI+XG5cblx0eyNpZiBmZWF0dXJlcyAmJiBmZWF0dXJlcy5sZW5ndGh9XG5cdFx0PHVsIGNsYXNzPVwibWItOCBmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuXHRcdFx0eyNlYWNoIGZlYXR1cmVzIGFzIGZlYXR1cmUgKGZlYXR1cmUpfVxuXHRcdFx0XHQ8bGlcblx0XHRcdFx0XHRjbGFzcz1cImJvcmRlci1iYWNrZ3JvdW5kLW11dGVkIGJnLWJhY2tncm91bmQgdGV4dC1mb3JlZ3JvdW5kLzgwIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHJvdW5kZWQtZnVsbCBib3JkZXIgcHktMSBwci0zIHBsLTIgdGV4dC14c1wiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8c3ZnXG5cdFx0XHRcdFx0XHRjbGFzcz1cInRleHQtcHJpbWFyeSBzaXplLTMuNSBzaHJpbmstMFwiXG5cdFx0XHRcdFx0XHR2aWV3Qm94PVwiMCAwIDIwIDIwXCJcblx0XHRcdFx0XHRcdGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuXHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8cGF0aFxuXHRcdFx0XHRcdFx0XHRmaWxsLXJ1bGU9XCJldmVub2RkXCJcblx0XHRcdFx0XHRcdFx0ZD1cIk0xNi43IDUuM2ExIDEgMCAwIDEgMCAxLjRsLTcuNSA3LjVhMSAxIDAgMCAxLTEuNCAwTDMuMyA5LjdhMSAxIDAgMCAxIDEuNC0xLjRsMy44IDMuOCA2LjgtNi44YTEgMSAwIDAgMSAxLjQgMFpcIlxuXHRcdFx0XHRcdFx0XHRjbGlwLXJ1bGU9XCJldmVub2RkXCJcblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0e2ZlYXR1cmV9XG5cdFx0XHRcdDwvbGk+XG5cdFx0XHR7L2VhY2h9XG5cdFx0PC91bD5cblx0ey9pZn1cblxuXHQ8VGFiYmFyIGl0ZW1zPXt0YWJzfSBiaW5kOmFjdGl2ZVRhYiAvPlxuXG5cdDxkaXYgY2xhc3M9XCJtdC04XCI+XG5cdFx0eyNpZiBhY3RpdmVUYWIgPT09IDB9XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JpZCBnYXAtMTBcIj5cblx0XHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4oKX1cblx0XHRcdDwvZGl2PlxuXHRcdFx0eyNpZiBjb21wb25lbnR9XG5cdFx0XHRcdDxQcm9wc1RhYmxlIHtjb21wb25lbnR9IC8+XG5cdFx0XHR7L2lmfVxuXHRcdHs6ZWxzZSBpZiBhY3RpdmVUYWIgPT09IDF9XG5cdFx0XHR7I2lmIGV4YW1wbGVzfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JpZCBnYXAtMTBcIj5cblx0XHRcdFx0XHR7QHJlbmRlciBleGFtcGxlcygpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0PHAgY2xhc3M9XCJ0ZXh0LWZvcmVncm91bmQvNjAgdGV4dC1zbVwiPk5vIGV4YW1wbGVzIHlldCBmb3IgdGhpcyBjb21wb25lbnQuPC9wPlxuXHRcdFx0ey9pZn1cblx0XHR7OmVsc2UgaWYgY29tcG9uZW50fVxuXHRcdFx0PGRpdiBjbGFzcz1cImdyaWQgZ2FwLThcIj5cblx0XHRcdFx0PFN0cnVjdHVyZVNjaGVtYSB7Y29tcG9uZW50fSAvPlxuXHRcdFx0XHQ8VGhlbWVTY2hlbWEge2NvbXBvbmVudH0gLz5cblx0XHRcdDwvZGl2PlxuXHRcdHs6ZWxzZX1cblx0XHRcdDxwIGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzYwIHRleHQtc21cIj5ObyBzdHJ1Y3R1cmFsIHNjaGVtYSBmb3IgdGhpcyBjb21wb25lbnQuPC9wPlxuXHRcdHsvaWZ9XG5cdDwvZGl2PlxuPC9hcnRpY2xlPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9yb3V0ZXMvRG9jUGFnZS5zdmVsdGUifQ==