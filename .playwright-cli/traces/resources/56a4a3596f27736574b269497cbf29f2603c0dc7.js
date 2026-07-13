import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/StructureSchema.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

StructureSchema[$.FILENAME] = 'src/routes/StructureSchema.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import structureMap from "/@id/__x00__virtual:svelai-structure?t=1783864636289";

var root = $.add_locations($.from_html(`<div class="flex flex-col gap-2"></div>`), StructureSchema[$.FILENAME], [[56, 1]]);
var root_1 = $.add_locations($.from_html(`<span class="opacity-80"> </span>`), StructureSchema[$.FILENAME], [[70, 29]]);
var root_2 = $.add_locations($.from_html(`<div class="mt-2 border-danger relative rounded-lg border border-dashed px-3 pt-5 pb-3"><span class="bg-danger-muted text-danger absolute top-0 left-3 -translate-y-1/2 rounded px-1.5 py-0.5 font-mono text-[11px]"><span class="font-semibold tracking-wide uppercase"> </span><!></span> <!></div>`), StructureSchema[$.FILENAME], [[65, 2, [[66, 3, [[69, 4]]]]]]);
var root_3 = $.add_locations($.from_html(`<span> </span>`), StructureSchema[$.FILENAME], [[81, 36]]);
var root_4 = $.add_locations($.from_html(`<div class="mt-2"><!></div>`), StructureSchema[$.FILENAME], [[84, 4]]);
var root_5 = $.add_locations($.from_html(`<div><div class="font-mono text-[13px] whitespace-nowrap"></div> <!></div>`), StructureSchema[$.FILENAME], [[75, 2, [[80, 3]]]]);

var root_6 = $.add_locations($.from_html(`<div class="border-background-muted bg-background w-full overflow-hidden rounded-xl border"><div class="border-background-muted/60 flex items-center justify-between border-b px-6 py-3"><span class="text-foreground/45 text-[10.5px] font-semibold tracking-[0.12em] uppercase">Structure</span> <span class="flex flex-wrap gap-3 font-mono text-[11px]"><span class="text-warning">slot</span> <span class="text-primary">theme.part</span> <span class="text-danger">each / if</span></span></div> <div class="overflow-x-auto p-4"><!></div></div>`), StructureSchema[$.FILENAME], [
	[
		93,
		1,
		[
			[94, 2, [[95, 3], [98, 3, [[99, 4], [100, 4], [101, 4]]]]],
			[104, 2]
		]
	]
]);

var root_7 = $.add_locations($.from_html(`<p class="text-foreground/70 text-sm">No structural schema for <code> </code>.</p>`), StructureSchema[$.FILENAME], [[109, 1, [[109, 64]]]]);

function StructureSchema($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, StructureSchema);

	const // Cycle container fills by nesting depth so the box hierarchy reads at a glance.
	children = $.wrap_snippet(StructureSchema, function ($$anchor, boxes = $.noop, depth = $.noop) {
		$.validate_snippet_args(...arguments);

		var div = root();

		$.add_svelte_meta(
			() => $.each(div, 21, boxes, $.index, ($$anchor, child) => {
				$.add_svelte_meta(() => row($$anchor, () => $.get(child), depth), 'render', StructureSchema, 58, 3);
			}),
			'each',
			StructureSchema,
			57,
			2
		);

		$.reset(div);
		$.append($$anchor, div);
	});

	const row = $.wrap_snippet(StructureSchema, function ($$anchor, box = $.noop, depth = $.noop) {
		$.validate_snippet_args(...arguments);

		var fragment_1 = $.comment();
		var node_1 = $.first_child(fragment_1);

		{
			var consequent_1 = ($$anchor) => {
				var div_1 = root_2();
				var span_1 = $.child(div_1);
				var span_2 = $.child(span_1);
				var text = $.child(span_2, true);

				$.reset(span_2);

				var node_2 = $.sibling(span_2);

				{
					var consequent = ($$anchor) => {
						var span_3 = root_1();
						var text_1 = $.child(span_3, true);

						$.reset(span_3);
						$.template_effect(() => $.set_text(text_1, box().control.label));
						$.append($$anchor, span_3);
					};

					$.add_svelte_meta(
						() => $.if(node_2, ($$render) => {
							if (box().control?.label) $$render(consequent);
						}),
						'if',
						StructureSchema,
						70,
						5
					);
				}

				$.reset(span_1);

				var node_3 = $.sibling(span_1, 2);

				$.add_svelte_meta(() => children(node_3, () => box().children, () => depth() + 1), 'render', StructureSchema, 72, 3);
				$.reset(div_1);
				$.template_effect(() => $.set_text(text, box().control?.keyword + ' '));
				$.append($$anchor, div_1);
			};

			var alternate = ($$anchor) => {
				var div_2 = root_5();
				var div_3 = $.child(div_2);

				$.add_svelte_meta(
					() => $.each(div_3, 21, () => box().spans, $.index, ($$anchor, span) => {
						var span_4 = root_3();
						var text_2 = $.child(span_4, true);

						$.reset(span_4);

						$.template_effect(() => {
							$.set_class(span_4, 1, $.clsx($.get(span).cls));
							$.set_text(text_2, $.get(span).t);
						});

						$.append($$anchor, span_4);
					}),
					'each',
					StructureSchema,
					81,
					4
				);

				$.reset(div_3);

				var node_4 = $.sibling(div_3, 2);

				{
					var consequent_2 = ($$anchor) => {
						var div_4 = root_4();
						var node_5 = $.child(div_4);

						$.add_svelte_meta(() => children(node_5, () => box().children, () => depth() + 1), 'render', StructureSchema, 85, 5);
						$.reset(div_4);
						$.append($$anchor, div_4);
					};

					$.add_svelte_meta(
						() => $.if(node_4, ($$render) => {
							if (box().children.length) $$render(consequent_2);
						}),
						'if',
						StructureSchema,
						83,
						3
					);
				}

				$.reset(div_2);

				$.template_effect(() => $.set_class(div_2, 1, `rounded-lg border px-3 py-2 ${$.strict_equals(box().kind, 'slot')
					? 'border-warning/50 bg-warning/10 border-dashed'
					: `border-background-muted ${DEPTH_BG[depth() % DEPTH_BG.length]}`}`));

				$.append($$anchor, div_2);
			};

			$.add_svelte_meta(
				() => $.if(node_1, ($$render) => {
					if ($.strict_equals(box().kind, 'control')) $$render(consequent_1); else $$render(alternate, -1);
				}),
				'if',
				StructureSchema,
				64,
				1
			);
		}

		$.append($$anchor, fragment_1);
	});

	const structure = $.tag($.derived(() => structureMap[$$props.component]), 'structure');

	function toBox(node) {
		const box = {
			kind: node.kind,
			tag: node.tag,
			themePart: node.themePart,
			slot: node.slot,
			control: node.control,
			defaultValue: node.defaultValue,
			children: (node.children ?? []).map(toBox),
			spans: []
		};

		box.spans = spansOf(box);

		return box;
	}

	function spansOf(box) {
		const spans = [];

		if ($.strict_equals(box.kind, 'slot')) {
			spans.push({
				t: box.slot?.name ?? box.slot?.source ?? 'slot',
				cls: 'text-warning'
			});

			if (box.slot?.payload) spans.push({ t: ` ${box.slot.payload}`, cls: 'text-foreground/50' });
		} else {
			const nameCls = $.strict_equals(box.kind, 'component') ? 'text-foreground' : 'text-foreground/70';

			spans.push({ t: `<${box.tag}>`, cls: nameCls });
		}

		if (box.themePart) spans.push({ t: ` theme.${box.themePart}`, cls: 'text-primary' });

		if (box.defaultValue) spans.push({
			t: ` default: ${box.defaultValue}`,
			cls: 'text-foreground/40 italic'
		});

		return spans;
	}

	// Cycle container fills by nesting depth so the box hierarchy reads at a glance.
	const DEPTH_BG = ['bg-background', 'bg-background', 'bg-background'];

	const roots = $.tag($.derived(() => ($.get(structure)?.tree ?? []).map(toBox)), 'roots');
	var $$exports = { ...$.legacy_api() };
	var fragment_2 = $.comment();
	var node_6 = $.first_child(fragment_2);

	{
		var consequent_3 = ($$anchor) => {
			var div_5 = root_6();
			var div_6 = $.sibling($.child(div_5), 2);
			var node_7 = $.child(div_6);

			$.add_svelte_meta(() => children(node_7, () => $.get(roots), () => 0), 'render', StructureSchema, 105, 3);
			$.reset(div_6);
			$.reset(div_5);
			$.append($$anchor, div_5);
		};

		var alternate_1 = ($$anchor) => {
			var p = root_7();
			var code = $.sibling($.child(p));
			var text_3 = $.child(code, true);

			$.reset(code);
			$.next();
			$.reset(p);
			$.template_effect(() => $.set_text(text_3, $$props.component));
			$.append($$anchor, p);
		};

		$.add_svelte_meta(
			() => $.if(node_6, ($$render) => {
				if ($.get(structure)) $$render(consequent_3); else $$render(alternate_1, -1);
			}),
			'if',
			StructureSchema,
			92,
			0
		);
	}

	$.append($$anchor, fragment_2);

	return $.pop($$exports);
}

if (import.meta.hot) {
	StructureSchema = $.hmr(StructureSchema);

	import.meta.hot.acceptExports(["default"],(module) => {
		StructureSchema[$.HMR].update(module.default);
	});
}

export default StructureSchema;
//# sourceMappingURL=data:application/json;base64,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QyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsRUFBRSxvQkFBb0I7RUFDekYsQ0FBQyxDQUFDLElBQUksQ0FBQztHQUNOLE1BQU0sT0FBTyxtQkFBRyxHQUFHLENBQUMsSUFBSSxFQUFLLFdBQVcsSUFBRyxpQkFBaUIsR0FBRyxvQkFBb0I7O0dBQ25GLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLE9BQU87RUFDN0M7O0VBQ0EsRUFBRSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUUsY0FBYzs7RUFDakYsRUFBRSxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQ25CLEtBQUssQ0FBQyxJQUFJO0dBQUcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxZQUFZO0dBQUksR0FBRyxFQUFFLDJCQUEyQjs7O0VBQ2xGLE1BQU0sQ0FBQyxLQUFLO0NBQ2I7OztDQUdBLE1BQU0sUUFBUSxJQUFJLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZTs7Q0FFbkUsTUFBTSxLQUFLLGdDQUFhLFNBQVMsR0FBRSxJQUFJLFFBQVEsR0FBRyxDQUFDLEtBQUs7Ozs7Ozs7T0F5Q3ZELEtBQUc7T0FXRixLQUFHLHFCQVhKLEtBQUc7d0JBV0YsS0FBRzs7MkJBQ00sUUFBUSxxQkFBQyxLQUFLLFNBQUUsQ0FBQztXQUQxQixLQUFHO1dBWEosS0FBRztzQkFBSCxLQUFHOzs7O09BZ0JILENBQUM7T0FBOEQsSUFBSSxxQkFBbkUsQ0FBQzt3QkFBOEQsSUFBSTs7V0FBSixJQUFJOztXQUFuRSxDQUFDOztzQkFBRCxDQUFDOzs7OztjQWpCRSxTQUFTOzs7Ozs7Ozs7Ozs7QUF2Q04iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlN0cnVjdHVyZVNjaGVtYS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHN0cnVjdHVyZU1hcCBmcm9tICd2aXJ0dWFsOnN2ZWxhaS1zdHJ1Y3R1cmUnO1xuXHRpbXBvcnQgdHlwZSB7IFN0cnVjdHVyZU5vZGUgfSBmcm9tICcuLi8uLi90b29saW5nL3N0cnVjdHVyZS1kb2NzL3R5cGVzJztcblxuXHRsZXQgeyBjb21wb25lbnQgfTogeyBjb21wb25lbnQ6IHN0cmluZyB9ID0gJHByb3BzKCk7XG5cdGNvbnN0IHN0cnVjdHVyZSA9ICRkZXJpdmVkKHN0cnVjdHVyZU1hcFtjb21wb25lbnRdKTtcblxuXHR0eXBlIEJveCA9IHtcblx0XHRraW5kOiBTdHJ1Y3R1cmVOb2RlWydraW5kJ107XG5cdFx0dGFnPzogc3RyaW5nO1xuXHRcdHRoZW1lUGFydD86IHN0cmluZztcblx0XHRzbG90PzogU3RydWN0dXJlTm9kZVsnc2xvdCddO1xuXHRcdGNvbnRyb2w/OiBTdHJ1Y3R1cmVOb2RlWydjb250cm9sJ107XG5cdFx0ZGVmYXVsdFZhbHVlPzogc3RyaW5nO1xuXHRcdGNoaWxkcmVuOiBCb3hbXTtcblx0XHRzcGFuczogeyB0OiBzdHJpbmc7IGNsczogc3RyaW5nIH1bXTtcblx0fTtcblxuXHRmdW5jdGlvbiB0b0JveChub2RlOiBTdHJ1Y3R1cmVOb2RlKTogQm94IHtcblx0XHRjb25zdCBib3g6IEJveCA9IHtcblx0XHRcdGtpbmQ6IG5vZGUua2luZCxcblx0XHRcdHRhZzogbm9kZS50YWcsXG5cdFx0XHR0aGVtZVBhcnQ6IG5vZGUudGhlbWVQYXJ0LFxuXHRcdFx0c2xvdDogbm9kZS5zbG90LFxuXHRcdFx0Y29udHJvbDogbm9kZS5jb250cm9sLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBub2RlLmRlZmF1bHRWYWx1ZSxcblx0XHRcdGNoaWxkcmVuOiAobm9kZS5jaGlsZHJlbiA/PyBbXSkubWFwKHRvQm94KSxcblx0XHRcdHNwYW5zOiBbXVxuXHRcdH07XG5cdFx0Ym94LnNwYW5zID0gc3BhbnNPZihib3gpO1xuXHRcdHJldHVybiBib3g7XG5cdH1cblxuXHRmdW5jdGlvbiBzcGFuc09mKGJveDogQm94KTogeyB0OiBzdHJpbmc7IGNsczogc3RyaW5nIH1bXSB7XG5cdFx0Y29uc3Qgc3BhbnM6IHsgdDogc3RyaW5nOyBjbHM6IHN0cmluZyB9W10gPSBbXTtcblx0XHRpZiAoYm94LmtpbmQgPT09ICdzbG90Jykge1xuXHRcdFx0c3BhbnMucHVzaCh7IHQ6IGJveC5zbG90Py5uYW1lID8/IGJveC5zbG90Py5zb3VyY2UgPz8gJ3Nsb3QnLCBjbHM6ICd0ZXh0LXdhcm5pbmcnIH0pO1xuXHRcdFx0aWYgKGJveC5zbG90Py5wYXlsb2FkKSBzcGFucy5wdXNoKHsgdDogYCAke2JveC5zbG90LnBheWxvYWR9YCwgY2xzOiAndGV4dC1mb3JlZ3JvdW5kLzUwJyB9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgbmFtZUNscyA9IGJveC5raW5kID09PSAnY29tcG9uZW50JyA/ICd0ZXh0LWZvcmVncm91bmQnIDogJ3RleHQtZm9yZWdyb3VuZC83MCc7XG5cdFx0XHRzcGFucy5wdXNoKHsgdDogYDwke2JveC50YWd9PmAsIGNsczogbmFtZUNscyB9KTtcblx0XHR9XG5cdFx0aWYgKGJveC50aGVtZVBhcnQpIHNwYW5zLnB1c2goeyB0OiBgIHRoZW1lLiR7Ym94LnRoZW1lUGFydH1gLCBjbHM6ICd0ZXh0LXByaW1hcnknIH0pO1xuXHRcdGlmIChib3guZGVmYXVsdFZhbHVlKVxuXHRcdFx0c3BhbnMucHVzaCh7IHQ6IGAgZGVmYXVsdDogJHtib3guZGVmYXVsdFZhbHVlfWAsIGNsczogJ3RleHQtZm9yZWdyb3VuZC80MCBpdGFsaWMnIH0pO1xuXHRcdHJldHVybiBzcGFucztcblx0fVxuXG5cdC8vIEN5Y2xlIGNvbnRhaW5lciBmaWxscyBieSBuZXN0aW5nIGRlcHRoIHNvIHRoZSBib3ggaGllcmFyY2h5IHJlYWRzIGF0IGEgZ2xhbmNlLlxuXHRjb25zdCBERVBUSF9CRyA9IFsnYmctYmFja2dyb3VuZCcsICdiZy1iYWNrZ3JvdW5kJywgJ2JnLWJhY2tncm91bmQnXTtcblxuXHRjb25zdCByb290cyA9ICRkZXJpdmVkKChzdHJ1Y3R1cmU/LnRyZWUgPz8gW10pLm1hcCh0b0JveCkpO1xuPC9zY3JpcHQ+XG5cbnsjc25pcHBldCBjaGlsZHJlbihib3hlczogQm94W10sIGRlcHRoOiBudW1iZXIpfVxuXHQ8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuXHRcdHsjZWFjaCBib3hlcyBhcyBjaGlsZCwgaSAoaSl9XG5cdFx0XHR7QHJlbmRlciByb3coY2hpbGQsIGRlcHRoKX1cblx0XHR7L2VhY2h9XG5cdDwvZGl2Plxuey9zbmlwcGV0fVxuXG57I3NuaXBwZXQgcm93KGJveDogQm94LCBkZXB0aDogbnVtYmVyKX1cblx0eyNpZiBib3gua2luZCA9PT0gJ2NvbnRyb2wnfVxuXHRcdDxkaXYgY2xhc3M9XCJtdC0yIGJvcmRlci1kYW5nZXIgcmVsYXRpdmUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWRhc2hlZCBweC0zIHB0LTUgcGItM1wiPlxuXHRcdFx0PHNwYW5cblx0XHRcdFx0Y2xhc3M9XCJiZy1kYW5nZXItbXV0ZWQgdGV4dC1kYW5nZXIgYWJzb2x1dGUgdG9wLTAgbGVmdC0zIC10cmFuc2xhdGUteS0xLzIgcm91bmRlZCBweC0xLjUgcHktMC41IGZvbnQtbW9ubyB0ZXh0LVsxMXB4XVwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlIHVwcGVyY2FzZVwiPntib3guY29udHJvbD8ua2V5d29yZCArICcgJ308L3NwYW5cblx0XHRcdFx0PnsjaWYgYm94LmNvbnRyb2w/LmxhYmVsfTxzcGFuIGNsYXNzPVwib3BhY2l0eS04MFwiPiB7Ym94LmNvbnRyb2wubGFiZWx9PC9zcGFuPnsvaWZ9XG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbihib3guY2hpbGRyZW4sIGRlcHRoICsgMSl9XG5cdFx0PC9kaXY+XG5cdHs6ZWxzZX1cblx0XHQ8ZGl2XG5cdFx0XHRjbGFzcz1cInJvdW5kZWQtbGcgYm9yZGVyIHB4LTMgcHktMiB7Ym94LmtpbmQgPT09ICdzbG90J1xuXHRcdFx0XHQ/ICdib3JkZXItd2FybmluZy81MCBiZy13YXJuaW5nLzEwIGJvcmRlci1kYXNoZWQnXG5cdFx0XHRcdDogYGJvcmRlci1iYWNrZ3JvdW5kLW11dGVkICR7REVQVEhfQkdbZGVwdGggJSBERVBUSF9CRy5sZW5ndGhdfWB9XCJcblx0XHQ+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZm9udC1tb25vIHRleHQtWzEzcHhdIHdoaXRlc3BhY2Utbm93cmFwXCI+XG5cdFx0XHRcdHsjZWFjaCBib3guc3BhbnMgYXMgc3BhbiwgaSAoaSl9PHNwYW4gY2xhc3M9e3NwYW4uY2xzfT57c3Bhbi50fTwvc3Bhbj57L2VhY2h9XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdHsjaWYgYm94LmNoaWxkcmVuLmxlbmd0aH1cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm10LTJcIj5cblx0XHRcdFx0XHR7QHJlbmRlciBjaGlsZHJlbihib3guY2hpbGRyZW4sIGRlcHRoICsgMSl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0ey9pZn1cblx0XHQ8L2Rpdj5cblx0ey9pZn1cbnsvc25pcHBldH1cblxueyNpZiBzdHJ1Y3R1cmV9XG5cdDxkaXYgY2xhc3M9XCJib3JkZXItYmFja2dyb3VuZC1tdXRlZCBiZy1iYWNrZ3JvdW5kIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC14bCBib3JkZXJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYm9yZGVyLWJhY2tncm91bmQtbXV0ZWQvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIHB4LTYgcHktM1wiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJ0ZXh0LWZvcmVncm91bmQvNDUgdGV4dC1bMTAuNXB4XSBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjEyZW1dIHVwcGVyY2FzZVwiPlxuXHRcdFx0XHRTdHJ1Y3R1cmVcblx0XHRcdDwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTMgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidGV4dC13YXJuaW5nXCI+c2xvdDwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj50aGVtZS5wYXJ0PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCI+ZWFjaCAvIGlmPC9zcGFuPlxuXHRcdFx0PC9zcGFuPlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJvdmVyZmxvdy14LWF1dG8gcC00XCI+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbihyb290cywgMCl9XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuezplbHNlfVxuXHQ8cCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC83MCB0ZXh0LXNtXCI+Tm8gc3RydWN0dXJhbCBzY2hlbWEgZm9yIDxjb2RlPntjb21wb25lbnR9PC9jb2RlPi48L3A+XG57L2lmfVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9yb3V0ZXMvU3RydWN0dXJlU2NoZW1hLnN2ZWx0ZSJ9