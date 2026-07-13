import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/ComponentCard.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

ComponentCard[$.FILENAME] = 'src/routes/ComponentCard.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Heading from "/src/lib/components/Heading/Heading.svelte";
import Collapsible from "/src/lib/components/Collapsible/Collapsible.svelte";
import Code from "/src/lib/components/Code/Code.svelte";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'children',
	'title',
	'class',
	'description',
	'code',
	'language'
]);

var root = $.add_locations($.from_html(`<span class="text-foreground/80 text-sm font-medium"> </span>`), ComponentCard[$.FILENAME], [[66, 1]]);
var root_1 = $.add_locations($.from_html(`<p class="text-foreground-muted mt-1 text-sm"> </p>`), ComponentCard[$.FILENAME], [[37, 4]]);
var root_2 = $.add_locations($.from_html(`<div><!> <!></div>`), ComponentCard[$.FILENAME], [[32, 2]]);
var root_3 = $.add_locations($.from_html(`<div class="border-background-muted border-t p-2"><!></div>`), ComponentCard[$.FILENAME], [[50, 3]]);
var root_4 = $.add_locations($.from_html(`<div><!> <div class="border-background-muted bg-background raised overflow-hidden rounded-xl border"><div><div class="z-10 mx-auto flex h-full w-full items-center justify-center gap-4"><!></div></div> <!></div></div>`), ComponentCard[$.FILENAME], [[30, 0, [[41, 1, [[42, 2, [[45, 3]]]]]]]]);

function ComponentCard($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, ComponentCard);

	const /** Source snippet shown under the preview in a "View code" reveal. */
	/** Highlighting language for `code`. Defaults to svelte. */
	codeTrigger = $.wrap_snippet(ComponentCard, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var span = root();
		var text = $.child(span, true);

		$.reset(span);
		$.template_effect(() => $.set_text(text, $.get(showCode) ? 'Hide code' : 'View code'));
		$.append($$anchor, span);
	});

	let className = $.prop($$props, 'class', 3, ''),
		language = $.prop($$props, 'language', 3, 'svelte'),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	let showCode = $.tag($.state(false), 'showCode');
	var $$exports = { ...$.legacy_api() };
	var div = root_4();

	$.attribute_effect(div, () => ({ ...attachments, class: 'my-10 grid gap-4' }));

	var node = $.child(div);

	{
		var consequent_2 = ($$anchor) => {
			var div_1 = root_2();
			var node_1 = $.child(div_1);

			{
				var consequent = ($$anchor) => {
					var fragment = $.comment();
					var node_2 = $.first_child(fragment);

					$.add_svelte_meta(
						() => Heading(node_2, {
							children: $.wrap_snippet(ComponentCard, ($$anchor, $$slotProps) => {
								$.next();

								var text_1 = $.text();

								$.template_effect(() => $.set_text(text_1, $$props.title));
								$.append($$anchor, text_1);
							}),
							$$slots: { default: true }
						}),
						'component',
						ComponentCard,
						34,
						4,
						{ componentTag: 'Heading' }
					);

					$.append($$anchor, fragment);
				};

				$.add_svelte_meta(
					() => $.if(node_1, ($$render) => {
						if ($$props.title) $$render(consequent);
					}),
					'if',
					ComponentCard,
					33,
					3
				);
			}

			var node_3 = $.sibling(node_1, 2);

			{
				var consequent_1 = ($$anchor) => {
					var p = root_1();
					var text_2 = $.child(p, true);

					$.reset(p);
					$.template_effect(() => $.set_text(text_2, $$props.description));
					$.append($$anchor, p);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if ($$props.description) $$render(consequent_1);
					}),
					'if',
					ComponentCard,
					36,
					3
				);
			}

			$.reset(div_1);
			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.title || $$props.description) $$render(consequent_2);
			}),
			'if',
			ComponentCard,
			31,
			1
		);
	}

	var div_2 = $.sibling(node, 2);
	var div_3 = $.child(div_2);
	var div_4 = $.child(div_3);
	var node_4 = $.child(div_4);

	$.add_svelte_meta(() => $.snippet(node_4, () => $$props.children), 'render', ComponentCard, 46, 4);
	$.reset(div_4);
	$.reset(div_3);

	var node_5 = $.sibling(div_3, 2);

	{
		var consequent_3 = ($$anchor) => {
			var div_5 = root_3();
			var node_6 = $.child(div_5);

			$.add_svelte_meta(
				() => Collapsible(node_6, {
					variant: 'peek',
					peekHeight: 84,
					get trigger() {
						return codeTrigger;
					},

					get open() {
						return $.get(showCode);
					},

					set open($$value) {
						$.set(showCode, $$value, true);
					},

					children: $.wrap_snippet(ComponentCard, ($$anchor, $$slotProps) => {
						var fragment_2 = $.comment();
						var node_7 = $.first_child(fragment_2);

						$.add_svelte_meta(
							() => Code(node_7, {
								get code() {
									return $$props.code;
								},
								showHeader: false,
								get language() {
									return language();
								},
								showLineNumbers: true,
								class: 'rounded-lg border-none'
							}),
							'component',
							ComponentCard,
							52,
							5,
							{ componentTag: 'Code' }
						);

						$.append($$anchor, fragment_2);
					}),
					$$slots: { default: true }
				}),
				'component',
				ComponentCard,
				51,
				4,
				{ componentTag: 'Collapsible' }
			);

			$.reset(div_5);
			$.append($$anchor, div_5);
		};

		$.add_svelte_meta(
			() => $.if(node_5, ($$render) => {
				if ($$props.code) $$render(consequent_3);
			}),
			'if',
			ComponentCard,
			49,
			2
		);
	}

	$.reset(div_2);
	$.reset(div);
	$.template_effect(() => $.set_class(div_3, 1, `dotted-grid relative flex min-h-[400px] w-full items-center justify-center gap-4 p-8 ${className() ?? ''}`));
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	ComponentCard = $.hmr(ComponentCard);

	import.meta.hot.acceptExports(["default"],(module) => {
		ComponentCard[$.HMR].update(module.default);
	});
}

export default ComponentCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUMsT0FBTyxPQUFPLE1BQU0sd0NBQXdDO0FBQzVELE9BQU8sV0FBVyxNQUFNLGdEQUFnRDtBQUN4RSxPQUFPLElBQUksTUFBTSxrQ0FBa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBDQUpwRCxDQUFDOzs7Ozs7Q0FnRVMsV0FBVzs7O01BQ25CLElBQUk7cUJBQUosSUFBSTs7VUFBSixJQUFJO2lEQUFpRCxRQUFRLElBQUcsV0FBVyxHQUFHLFdBQVc7cUJBQXpGLElBQUk7OztDQTNETCxJQUFJLEFBR0ksU0FBUywrQkFBRyxFQUFFO0VBR3JCLFFBQVEsa0NBQUcsUUFBUTtFQUNoQjs7Q0FhSixJQUFJLFFBQVEsU0FBRyxPQUFNLENBQUMsS0FBSzs7S0FHM0IsR0FBRzs7b0JBQUgsR0FBRyxjQUFLLFdBQVc7O29CQUFuQixHQUFHOzs7O09BRUQsS0FBRzt3QkFBSCxLQUFHOzs7Ozs7OztZQUVELE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdQLENBQUM7MEJBQUQsQ0FBQzs7YUFBRCxDQUFDOzt3QkFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztXQUxILEtBQUc7c0JBQUgsS0FBRzs7Ozs7Ozs7Ozs7Ozs7S0FTSixLQUFHO0tBQ0YsZ0JBREQsS0FBRztLQUlELEtBQUcsV0FISjtzQkFHQyxLQUFHOzs7U0FBSCxLQUFHO1NBSEo7O3dCQUFBOzs7O09BUUMsS0FBRzt3QkFBSCxLQUFHOzs7VUFDRixXQUFXOztpQkFBNEIsRUFBRTs7YUFBZ0MsV0FBVzs7O1NBQXpDLElBQVM7bUJBQUUsUUFBUTs7O1NBQW5CLElBQVM7WUFBRSxRQUFROzs7Ozs7OzthQUM3RDs7OztvQkFFWSxLQUFLOztnQkFDaEIsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FMWCxLQUFHO3NCQUFILEtBQUc7Ozs7Ozs7Ozs7Ozs7O1NBVEwsS0FBRztTQVhKLEdBQUc7cUNBWUQsa0dBQzZGLFNBQVM7b0JBYnhHLEdBQUc7OztBQUZJIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJDb21wb25lbnRDYXJkLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IFNuaXBwZXQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgSGVhZGluZyBmcm9tICckbGliL2NvbXBvbmVudHMvSGVhZGluZy9IZWFkaW5nLnN2ZWx0ZSc7XG5cdGltcG9ydCBDb2xsYXBzaWJsZSBmcm9tICckbGliL2NvbXBvbmVudHMvQ29sbGFwc2libGUvQ29sbGFwc2libGUuc3ZlbHRlJztcblx0aW1wb3J0IENvZGUgZnJvbSAnJGxpYi9jb21wb25lbnRzL0NvZGUvQ29kZS5zdmVsdGUnO1xuXG5cdGxldCB7XG5cdFx0Y2hpbGRyZW4sXG5cdFx0dGl0bGUsXG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSA9ICcnLFxuXHRcdGRlc2NyaXB0aW9uLFxuXHRcdGNvZGUsXG5cdFx0bGFuZ3VhZ2UgPSAnc3ZlbHRlJyxcblx0XHQuLi5hdHRhY2htZW50c1xuXHR9OiB7XG5cdFx0Y2hpbGRyZW46IFNuaXBwZXQ7XG5cdFx0ZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cdFx0Y2xhc3M/OiBzdHJpbmc7XG5cdFx0dGl0bGU/OiBzdHJpbmc7XG5cdFx0LyoqIFNvdXJjZSBzbmlwcGV0IHNob3duIHVuZGVyIHRoZSBwcmV2aWV3IGluIGEgXCJWaWV3IGNvZGVcIiByZXZlYWwuICovXG5cdFx0Y29kZT86IHN0cmluZztcblx0XHQvKiogSGlnaGxpZ2h0aW5nIGxhbmd1YWdlIGZvciBgY29kZWAuIERlZmF1bHRzIHRvIHN2ZWx0ZS4gKi9cblx0XHRsYW5ndWFnZT86IHN0cmluZztcblx0XHRba2V5OiBzdHJpbmddOiBhbnk7XG5cdH0gPSAkcHJvcHMoKTtcblxuXHRsZXQgc2hvd0NvZGUgPSAkc3RhdGUoZmFsc2UpO1xuPC9zY3JpcHQ+XG5cbjxkaXYgey4uLmF0dGFjaG1lbnRzfSBjbGFzcz1cIm15LTEwIGdyaWQgZ2FwLTRcIj5cblx0eyNpZiB0aXRsZSB8fCBkZXNjcmlwdGlvbn1cblx0XHQ8ZGl2PlxuXHRcdFx0eyNpZiB0aXRsZX1cblx0XHRcdFx0PEhlYWRpbmc+e3RpdGxlfTwvSGVhZGluZz5cblx0XHRcdHsvaWZ9XG5cdFx0XHR7I2lmIGRlc2NyaXB0aW9ufVxuXHRcdFx0XHQ8cCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC1tdXRlZCBtdC0xIHRleHQtc21cIj57ZGVzY3JpcHRpb259PC9wPlxuXHRcdFx0ey9pZn1cblx0XHQ8L2Rpdj5cblx0ey9pZn1cblx0PGRpdiBjbGFzcz1cImJvcmRlci1iYWNrZ3JvdW5kLW11dGVkIGJnLWJhY2tncm91bmQgcmFpc2VkIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLXhsIGJvcmRlclwiPlxuXHRcdDxkaXZcblx0XHRcdGNsYXNzPVwiZG90dGVkLWdyaWQgcmVsYXRpdmUgZmxleCBtaW4taC1bNDAwcHhdIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTQgcC04IHtjbGFzc05hbWV9XCJcblx0XHQ+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiei0xMCBteC1hdXRvIGZsZXggaC1mdWxsIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTRcIj5cblx0XHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4oKX1cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdHsjaWYgY29kZX1cblx0XHRcdDxkaXYgY2xhc3M9XCJib3JkZXItYmFja2dyb3VuZC1tdXRlZCBib3JkZXItdCBwLTJcIj5cblx0XHRcdFx0PENvbGxhcHNpYmxlIHZhcmlhbnQ9XCJwZWVrXCIgcGVla0hlaWdodD17ODR9IGJpbmQ6b3Blbj17c2hvd0NvZGV9IHRyaWdnZXI9e2NvZGVUcmlnZ2VyfT5cblx0XHRcdFx0XHQ8Q29kZVxuXHRcdFx0XHRcdFx0e2NvZGV9XG5cdFx0XHRcdFx0XHRzaG93SGVhZGVyPXtmYWxzZX1cblx0XHRcdFx0XHRcdHtsYW5ndWFnZX1cblx0XHRcdFx0XHRcdHNob3dMaW5lTnVtYmVyc1xuXHRcdFx0XHRcdFx0Y2xhc3M9XCJyb3VuZGVkLWxnIGJvcmRlci1ub25lXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L0NvbGxhcHNpYmxlPlxuXHRcdFx0PC9kaXY+XG5cdFx0ey9pZn1cblx0PC9kaXY+XG48L2Rpdj5cblxueyNzbmlwcGV0IGNvZGVUcmlnZ2VyKCl9XG5cdDxzcGFuIGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzgwIHRleHQtc20gZm9udC1tZWRpdW1cIj57c2hvd0NvZGUgPyAnSGlkZSBjb2RlJyA6ICdWaWV3IGNvZGUnfTwvc3Bhbj5cbnsvc25pcHBldH1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvcm91dGVzL0NvbXBvbmVudENhcmQuc3ZlbHRlIn0=