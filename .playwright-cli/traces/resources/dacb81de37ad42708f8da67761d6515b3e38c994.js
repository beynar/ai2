import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/PropsTable.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PropsTable[$.FILENAME] = 'src/routes/PropsTable.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import propsMap from "/@id/__x00__virtual:svelai-props";
import Popover from "/src/lib/components/Popover/Popover.svelte";
import Code from "/src/lib/components/Code/Code.svelte";
import { bracketsCurlyIcon } from "/src/lib/components/Icons/bracketsCurly.ts";
import { currencyDollarIcon } from "/src/lib/components/Icons/currencyDollar.ts";
import { bracketsAngleIcon } from "/src/lib/components/Icons/bracketsAngle.ts";
import { functionIcon } from "/src/lib/components/Icons/function.ts";

var root = $.add_locations($.from_html(`<span class="bg-primary/10 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">Required</span>`), PropsTable[$.FILENAME], [[69, 11]]);
var root_1 = $.add_locations($.from_html(`<button type="button" class="text-primary/90 hover:text-primary decoration-primary/30 hover:decoration-primary/60 cursor-help bg-transparent p-0 text-left font-mono text-[13px] underline decoration-dotted underline-offset-[3px] transition-colors"> </button>`), PropsTable[$.FILENAME], [[87, 12]]);
var root_2 = $.add_locations($.from_html(`<code class="text-primary/90 font-mono text-[13px]"> </code>`), PropsTable[$.FILENAME], [[106, 10]]);
var root_3 = $.add_locations($.from_html(`<code class="text-foreground font-mono text-[12.5px]"> </code>`), PropsTable[$.FILENAME], [[112, 11]]);
var root_4 = $.add_locations($.from_html(`<tr class="border-background-muted/40 hover:bg-background-muted/20 border-t align-top transition-colors"><td class="px-6 py-3.5 whitespace-nowrap"><span class="inline-flex items-center gap-2"><span class="text-foreground font-mono text-[13px] font-medium"> </span> <!></span></td><td class="px-6 py-3.5"><!></td><td class="text-foreground/70 px-6 py-3.5 text-[13px] leading-relaxed"></td></tr>`), PropsTable[$.FILENAME], [[62, 7, [[65, 8, [[66, 9, [[67, 10]]]]], [77, 8], [109, 8]]]]);
var root_5 = $.add_locations($.from_html(`<tbody><tr><th colspan="3" class="text-foreground/45 px-6 pt-5 pb-1.5 text-left text-[10.5px] font-semibold tracking-[0.12em] uppercase"><span class="flex items-center gap-1.5"><!> </span></th></tr><!></tbody>`), PropsTable[$.FILENAME], [[49, 5, [[50, 6, [[51, 7, [[55, 8]]]]]]]]);
var root_6 = $.add_locations($.from_html(`<div class="border-background-muted bg-background mt-12 w-full overflow-hidden rounded-xl border"><div class="overflow-x-auto"><table class="w-full border-collapse text-left"></table></div></div>`), PropsTable[$.FILENAME], [[45, 1, [[46, 2, [[47, 3]]]]]]);
var root_7 = $.add_locations($.from_html(`<p class="text-foreground/70 text-sm">No documented props for <code> </code>.</p>`), PropsTable[$.FILENAME], [[124, 1, [[124, 63]]]]);

function PropsTable($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PropsTable);

	const docs = $.tag($.derived(() => propsMap[$$props.component]), 'docs');

	const sectionOrder = [
		{
			category: 'prop',
			label: 'Props',
			icon: bracketsCurlyIcon,
			color: 'primary'
		},

		{
			category: 'binding',
			label: 'Bindable props',
			icon: currencyDollarIcon,
			color: 'success'
		},

		{
			category: 'slot',
			label: 'Slots',
			icon: bracketsAngleIcon,
			color: 'warning'
		},

		{
			category: 'event',
			label: 'Callbacks',
			icon: functionIcon,
			color: 'info'
		}
	];

	const sections = $.tag(
		$.derived(() => sectionOrder.map(({ category, label, icon, color }) => ({
			label,
			icon,
			color,
			props: $.get(docs)?.props.filter((prop) => $.strict_equals(prop.category, category)) ?? []
		})).filter((section) => section.props.length > 0)),
		'sections'
	);

	// Split a description into plain and `inline code` segments so backticks render as code.
	const describe = (text) => text.split(/(`[^`]+`)/).map((part) => ({
		code: part.startsWith('`') && part.endsWith('`'),
		value: part.startsWith('`') && part.endsWith('`') ? part.slice(1, -1) : part
	}));

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent_3 = ($$anchor) => {
			var div = root_6();
			var div_1 = $.child(div);
			var table = $.child(div_1);

			$.add_svelte_meta(
				() => $.each(table, 21, () => $.get(sections), (section) => section.label, ($$anchor, section) => {
					var tbody = root_5();
					var tr = $.child(tbody);
					var th = $.child(tr);
					var span = $.child(th);
					var node_1 = $.child(span);

					$.add_svelte_meta(() => $.snippet(node_1, () => $.get(section).icon, () => ({ size: 13, color: $.get(section).color })), 'render', PropsTable, 56, 9);

					var text_1 = $.sibling(node_1);

					$.reset(span);
					$.reset(th);
					$.reset(tr);

					var node_2 = $.sibling(tr);

					$.add_svelte_meta(
						() => $.each(node_2, 17, () => $.get(section).props, (prop) => prop.name, ($$anchor, prop) => {
							var tr_1 = root_4();
							var td = $.child(tr_1);
							var span_1 = $.child(td);
							var span_2 = $.child(span_1);
							var text_2 = $.child(span_2, true);

							$.reset(span_2);

							var node_3 = $.sibling(span_2, 2);

							{
								var consequent = ($$anchor) => {
									var span_3 = root();

									$.append($$anchor, span_3);
								};

								$.add_svelte_meta(
									() => $.if(node_3, ($$render) => {
										if (!$.get(prop).optional) $$render(consequent);
									}),
									'if',
									PropsTable,
									68,
									10
								);
							}

							$.reset(span_1);
							$.reset(td);

							var td_1 = $.sibling(td);
							var node_4 = $.child(td_1);

							{
								var consequent_1 = ($$anchor) => {
									var fragment_1 = $.comment();
									var node_5 = $.first_child(fragment_1);

									{
										const trigger = $.wrap_snippet(PropsTable, function ($$anchor, popover = $.noop) {
											$.validate_snippet_args(...arguments);

											var button = root_1();
											var text_3 = $.child(button, true);

											$.reset(button);
											$.attach(button, () => popover().reference);
											$.template_effect(() => $.set_text(text_3, $.get(prop).value));

											$.delegated('click', button, function click() {
												return popover().toggle();
											});

											$.append($$anchor, button);
										});

										$.add_svelte_meta(
											() => Popover(node_5, {
												openOnHover: true,
												openOnClick: true,
												hoverDelay: 150,
												position: 'bottom',
												closeOnMouseLeave: true,
												trigger,
												children: $.wrap_snippet(PropsTable, ($$anchor, $$slotProps) => {
													var fragment_2 = $.comment();
													var node_6 = $.first_child(fragment_2);

													$.add_svelte_meta(
														() => Code(node_6, {
															language: 'typescript',
															get code() {
																return $.get(prop).type;
															},
															showHeader: false,
															copyable: false,
															maxHeight: 320,
															class: 'max-w-md'
														}),
														'component',
														PropsTable,
														96,
														11,
														{ componentTag: 'Code' }
													);

													$.append($$anchor, fragment_2);
												}),
												$$slots: { trigger: true, default: true }
											}),
											'component',
											PropsTable,
											79,
											10,
											{ componentTag: 'Popover' }
										);
									}

									$.append($$anchor, fragment_1);
								};

								var alternate = ($$anchor) => {
									var code = root_2();
									var text_4 = $.child(code, true);

									$.reset(code);
									$.template_effect(() => $.set_text(text_4, $.get(prop).value));
									$.append($$anchor, code);
								};

								$.add_svelte_meta(
									() => $.if(node_4, ($$render) => {
										if ($.get(prop).type) $$render(consequent_1); else $$render(alternate, -1);
									}),
									'if',
									PropsTable,
									78,
									9
								);
							}

							$.reset(td_1);

							var td_2 = $.sibling(td_1);

							$.add_svelte_meta(
								() => $.each(td_2, 21, () => describe($.get(prop).description), $.index, ($$anchor, part) => {
									var fragment_3 = $.comment();
									var node_7 = $.first_child(fragment_3);

									{
										var consequent_2 = ($$anchor) => {
											var code_1 = root_3();
											var text_5 = $.child(code_1, true);

											$.reset(code_1);
											$.template_effect(() => $.set_text(text_5, $.get(part).value));
											$.append($$anchor, code_1);
										};

										var alternate_1 = ($$anchor) => {
											var text_6 = $.text();

											$.template_effect(() => $.set_text(text_6, $.get(part).value));
											$.append($$anchor, text_6);
										};

										$.add_svelte_meta(
											() => $.if(node_7, ($$render) => {
												if ($.get(part).code) $$render(consequent_2); else $$render(alternate_1, -1);
											}),
											'if',
											PropsTable,
											111,
											10
										);
									}

									$.append($$anchor, fragment_3);
								}),
								'each',
								PropsTable,
								110,
								9
							);

							$.reset(td_2);
							$.reset(tr_1);
							$.template_effect(() => $.set_text(text_2, $.get(prop).name));
							$.append($$anchor, tr_1);
						}),
						'each',
						PropsTable,
						61,
						6
					);

					$.reset(tbody);
					$.template_effect(() => $.set_text(text_1, ` ${$.get(section).label ?? ''}`));
					$.append($$anchor, tbody);
				}),
				'each',
				PropsTable,
				48,
				4
			);

			$.reset(table);
			$.reset(div_1);
			$.reset(div);
			$.append($$anchor, div);
		};

		var alternate_2 = ($$anchor) => {
			var p = root_7();
			var code_2 = $.sibling($.child(p));
			var text_7 = $.child(code_2, true);

			$.reset(code_2);
			$.next();
			$.reset(p);
			$.template_effect(() => $.set_text(text_7, $$props.component));
			$.append($$anchor, p);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.get(docs)) $$render(consequent_3); else $$render(alternate_2, -1);
			}),
			'if',
			PropsTable,
			44,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PropsTable = $.hmr(PropsTable);

	import.meta.hot.acceptExports(["default"],(module) => {
		PropsTable[$.HMR].update(module.default);
	});
}

export default PropsTable;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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QUEsY0FFUyxPQUFPLEdBQUMsU0FBUzs0REFJekIsSUFBSSxFQUFDLEtBQUs7O2dDQU5YO21CQUdlLE9BQU8sR0FBQyxNQUFNOzs7OEJBSDdCOzs7O2lCQVJGOzs7d0JBR1ksR0FBRzs7O1lBSUwsT0FBTzs7Ozs7O29CQVVoQjs7OzZCQUVLLElBQUksRUFBQyxJQUFJOzsyQkFDSCxLQUFLO3lCQUNQLEtBQUs7MEJBQ0osR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFLZCxJQUFJOzhCQUFKLElBQUk7O2lCQUFKLElBQUk7MERBQWdELElBQUksRUFBQyxLQUFLOzRCQUE5RCxJQUFJOzs7OztvQkE1QkQsSUFBSSxFQUFDLElBQUk7Ozs7Ozs7OztlQURkLElBQUU7O1dBZ0NGLElBQUUsYUFoQ0YsSUFBRTs7O3FCQWdDRixJQUFFLFlBQ0ssUUFBUSxPQUFDLElBQUksRUFBQyxXQUFXLHVCQUFLLElBQUk7Ozs7OztlQUV0QyxNQUFJO2dDQUFKLE1BQUk7O21CQUFKLE1BQUk7NERBQWtELElBQUksRUFBQyxLQUFLOzhCQUFoRSxNQUFJOzs7Ozs7NERBQ0UsSUFBSSxFQUFDLEtBQUs7Ozs7OztzQkFGYixJQUFJLEVBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFGZixJQUFFO2VBL0NIO3dEQUttRSxJQUFJLEVBQUMsSUFBSTswQkFMNUU7Ozs7Ozs7O2FBYkYsS0FBSzswREFRRCxPQUFPLEVBQUMsS0FBSzt3QkFSakIsS0FBSzs7Ozs7Ozs7V0FGUCxLQUFLO1dBRE4sS0FBRztXQURKLEdBQUc7c0JBQUgsR0FBRzs7OztPQStFSCxDQUFDO09BQTZELE1BQUkscUJBQWxFLENBQUM7d0JBQTZELE1BQUk7O1dBQUosTUFBSTs7V0FBbEUsQ0FBQzs7c0JBQUQsQ0FBQzs7Ozs7Y0FoRkUsSUFBSTs7Ozs7Ozs7Ozs7O0FBRkQiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlByb3BzVGFibGUuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBwcm9wc01hcCBmcm9tICd2aXJ0dWFsOnN2ZWxhaS1wcm9wcyc7XG5cdGltcG9ydCB0eXBlIHsgUHJvcENhdGVnb3J5LCBQcm9wRG9jIH0gZnJvbSAnLi4vLi4vdG9vbGluZy9wcm9wcy1kb2NzL3R5cGVzJztcblx0aW1wb3J0IFBvcG92ZXIgZnJvbSAnJGxpYi9jb21wb25lbnRzL1BvcG92ZXIvUG9wb3Zlci5zdmVsdGUnO1xuXHRpbXBvcnQgQ29kZSBmcm9tICckbGliL2NvbXBvbmVudHMvQ29kZS9Db2RlLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IGJyYWNrZXRzQ3VybHlJY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL2JyYWNrZXRzQ3VybHkuanMnO1xuXHRpbXBvcnQgeyBjdXJyZW5jeURvbGxhckljb24gfSBmcm9tICckbGliL2NvbXBvbmVudHMvSWNvbnMvY3VycmVuY3lEb2xsYXIuanMnO1xuXHRpbXBvcnQgeyBicmFja2V0c0FuZ2xlSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9icmFja2V0c0FuZ2xlLmpzJztcblx0aW1wb3J0IHsgZnVuY3Rpb25JY29uIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0ljb25zL2Z1bmN0aW9uLmpzJztcblx0aW1wb3J0IHR5cGUgeyBDb2xvcnMgfSBmcm9tICckbGliL3R5cGVzL3RoZW1lLmpzJztcblxuXHRsZXQgeyBjb21wb25lbnQgfTogeyBjb21wb25lbnQ6IHN0cmluZyB9ID0gJHByb3BzKCk7XG5cblx0Y29uc3QgZG9jcyA9ICRkZXJpdmVkKHByb3BzTWFwW2NvbXBvbmVudF0pO1xuXG5cdHR5cGUgU2VjdGlvbkljb24gPSB0eXBlb2YgYnJhY2tldHNDdXJseUljb247XG5cdGNvbnN0IHNlY3Rpb25PcmRlcjogeyBjYXRlZ29yeTogUHJvcENhdGVnb3J5OyBsYWJlbDogc3RyaW5nOyBpY29uOiBTZWN0aW9uSWNvbjsgY29sb3I6IENvbG9ycyB9W10gPVxuXHRcdFtcblx0XHRcdHsgY2F0ZWdvcnk6ICdwcm9wJywgbGFiZWw6ICdQcm9wcycsIGljb246IGJyYWNrZXRzQ3VybHlJY29uLCBjb2xvcjogJ3ByaW1hcnknIH0sXG5cdFx0XHR7IGNhdGVnb3J5OiAnYmluZGluZycsIGxhYmVsOiAnQmluZGFibGUgcHJvcHMnLCBpY29uOiBjdXJyZW5jeURvbGxhckljb24sIGNvbG9yOiAnc3VjY2VzcycgfSxcblx0XHRcdHsgY2F0ZWdvcnk6ICdzbG90JywgbGFiZWw6ICdTbG90cycsIGljb246IGJyYWNrZXRzQW5nbGVJY29uLCBjb2xvcjogJ3dhcm5pbmcnIH0sXG5cdFx0XHR7IGNhdGVnb3J5OiAnZXZlbnQnLCBsYWJlbDogJ0NhbGxiYWNrcycsIGljb246IGZ1bmN0aW9uSWNvbiwgY29sb3I6ICdpbmZvJyB9XG5cdFx0XTtcblxuXHRjb25zdCBzZWN0aW9ucyA9ICRkZXJpdmVkKFxuXHRcdHNlY3Rpb25PcmRlclxuXHRcdFx0Lm1hcCgoeyBjYXRlZ29yeSwgbGFiZWwsIGljb24sIGNvbG9yIH0pID0+ICh7XG5cdFx0XHRcdGxhYmVsLFxuXHRcdFx0XHRpY29uLFxuXHRcdFx0XHRjb2xvcixcblx0XHRcdFx0cHJvcHM6IGRvY3M/LnByb3BzLmZpbHRlcigocHJvcDogUHJvcERvYykgPT4gcHJvcC5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpID8/IFtdXG5cdFx0XHR9KSlcblx0XHRcdC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24ucHJvcHMubGVuZ3RoID4gMClcblx0KTtcblxuXHQvLyBTcGxpdCBhIGRlc2NyaXB0aW9uIGludG8gcGxhaW4gYW5kIGBpbmxpbmUgY29kZWAgc2VnbWVudHMgc28gYmFja3RpY2tzIHJlbmRlciBhcyBjb2RlLlxuXHRjb25zdCBkZXNjcmliZSA9ICh0ZXh0OiBzdHJpbmcpID0+XG5cdFx0dGV4dC5zcGxpdCgvKGBbXmBdK2ApLykubWFwKChwYXJ0KSA9PiAoe1xuXHRcdFx0Y29kZTogcGFydC5zdGFydHNXaXRoKCdgJykgJiYgcGFydC5lbmRzV2l0aCgnYCcpLFxuXHRcdFx0dmFsdWU6IHBhcnQuc3RhcnRzV2l0aCgnYCcpICYmIHBhcnQuZW5kc1dpdGgoJ2AnKSA/IHBhcnQuc2xpY2UoMSwgLTEpIDogcGFydFxuXHRcdH0pKTtcbjwvc2NyaXB0PlxuXG57I2lmIGRvY3N9XG5cdDxkaXYgY2xhc3M9XCJib3JkZXItYmFja2dyb3VuZC1tdXRlZCBiZy1iYWNrZ3JvdW5kIG10LTEyIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC14bCBib3JkZXJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwib3ZlcmZsb3cteC1hdXRvXCI+XG5cdFx0XHQ8dGFibGUgY2xhc3M9XCJ3LWZ1bGwgYm9yZGVyLWNvbGxhcHNlIHRleHQtbGVmdFwiPlxuXHRcdFx0XHR7I2VhY2ggc2VjdGlvbnMgYXMgc2VjdGlvbiAoc2VjdGlvbi5sYWJlbCl9XG5cdFx0XHRcdFx0PHRib2R5PlxuXHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGhcblx0XHRcdFx0XHRcdFx0XHRjb2xzcGFuPVwiM1wiXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0ZXh0LWZvcmVncm91bmQvNDUgcHgtNiBwdC01IHBiLTEuNSB0ZXh0LWxlZnQgdGV4dC1bMTAuNXB4XSBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjEyZW1dIHVwcGVyY2FzZVwiXG5cdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdHtAcmVuZGVyIHNlY3Rpb24uaWNvbih7IHNpemU6IDEzLCBjb2xvcjogc2VjdGlvbi5jb2xvciB9KX1cblx0XHRcdFx0XHRcdFx0XHRcdHtzZWN0aW9uLmxhYmVsfVxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHR7I2VhY2ggc2VjdGlvbi5wcm9wcyBhcyBwcm9wIChwcm9wLm5hbWUpfVxuXHRcdFx0XHRcdFx0XHQ8dHJcblx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImJvcmRlci1iYWNrZ3JvdW5kLW11dGVkLzQwIGhvdmVyOmJnLWJhY2tncm91bmQtbXV0ZWQvMjAgYm9yZGVyLXQgYWxpZ24tdG9wIHRyYW5zaXRpb24tY29sb3JzXCJcblx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInB4LTYgcHktMy41IHdoaXRlc3BhY2Utbm93cmFwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtZm9yZWdyb3VuZCBmb250LW1vbm8gdGV4dC1bMTNweF0gZm9udC1tZWRpdW1cIj57cHJvcC5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0eyNpZiAhcHJvcC5vcHRpb25hbH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeSByb3VuZGVkLWZ1bGwgcHgtMS41IHB5LTAuNSB0ZXh0LVsxMHB4XSBmb250LW1lZGl1bSB0cmFja2luZy13aWRlIHVwcGVyY2FzZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UmVxdWlyZWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJweC02IHB5LTMuNVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0eyNpZiBwcm9wLnR5cGV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxQb3BvdmVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3Blbk9uSG92ZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcGVuT25DbGlja1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhvdmVyRGVsYXk9ezE1MH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbj1cImJvdHRvbVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xvc2VPbk1vdXNlTGVhdmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsjc25pcHBldCB0cmlnZ2VyKHBvcG92ZXIpfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e0BhdHRhY2ggcG9wb3Zlci5yZWZlcmVuY2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uY2xpY2s9eygpID0+IHBvcG92ZXIudG9nZ2xlKCl9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidGV4dC1wcmltYXJ5LzkwIGhvdmVyOnRleHQtcHJpbWFyeSBkZWNvcmF0aW9uLXByaW1hcnkvMzAgaG92ZXI6ZGVjb3JhdGlvbi1wcmltYXJ5LzYwIGN1cnNvci1oZWxwIGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LWxlZnQgZm9udC1tb25vIHRleHQtWzEzcHhdIHVuZGVybGluZSBkZWNvcmF0aW9uLWRvdHRlZCB1bmRlcmxpbmUtb2Zmc2V0LVszcHhdIHRyYW5zaXRpb24tY29sb3JzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e3Byb3AudmFsdWV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7L3NuaXBwZXR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PENvZGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYW5ndWFnZT1cInR5cGVzY3JpcHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvZGU9e3Byb3AudHlwZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzaG93SGVhZGVyPXtmYWxzZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb3B5YWJsZT17ZmFsc2V9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4SGVpZ2h0PXszMjB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJtYXgtdy1tZFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvUG9wb3Zlcj5cblx0XHRcdFx0XHRcdFx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGNvZGUgY2xhc3M9XCJ0ZXh0LXByaW1hcnkvOTAgZm9udC1tb25vIHRleHQtWzEzcHhdXCI+e3Byb3AudmFsdWV9PC9jb2RlPlxuXHRcdFx0XHRcdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC83MCBweC02IHB5LTMuNSB0ZXh0LVsxM3B4XSBsZWFkaW5nLXJlbGF4ZWRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdHsjZWFjaCBkZXNjcmliZShwcm9wLmRlc2NyaXB0aW9uKSBhcyBwYXJ0LCBpIChpKX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0eyNpZiBwYXJ0LmNvZGV9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGNvZGUgY2xhc3M9XCJ0ZXh0LWZvcmVncm91bmQgZm9udC1tb25vIHRleHQtWzEyLjVweF1cIj57cGFydC52YWx1ZX08L2NvZGU+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHs6ZWxzZX17cGFydC52YWx1ZX17L2lmfVxuXHRcdFx0XHRcdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHRcdFx0XHRcdDwvdGQ+XG5cdFx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHR7L2VhY2h9XG5cdFx0XHRcdFx0PC90Ym9keT5cblx0XHRcdFx0ey9lYWNofVxuXHRcdFx0PC90YWJsZT5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG57OmVsc2V9XG5cdDxwIGNsYXNzPVwidGV4dC1mb3JlZ3JvdW5kLzcwIHRleHQtc21cIj5ObyBkb2N1bWVudGVkIHByb3BzIGZvciA8Y29kZT57Y29tcG9uZW50fTwvY29kZT4uPC9wPlxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvcm91dGVzL1Byb3BzVGFibGUuc3ZlbHRlIn0=