import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/PageShell/PageShellActions.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PageShellActions[$.FILENAME] = 'src/lib/components/PageShell/PageShellActions.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Button from "/src/lib/components/Button/Button.svelte";
import { dotsThreeIcon } from "/src/lib/components/Icons/dotsThree.ts";
import PopupMenu from "/src/lib/components/PopupMenu/PopupMenu.svelte?t=1783864665558";
import { usePageShellTheme } from "/src/lib/components/PageShell/pageShell.theme.ts";

var root = $.add_locations($.from_html(`<div></div> <div><!> <!></div>`, 1), PageShellActions[$.FILENAME], [[52, 2], [59, 2]]);

function PageShellActions($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PageShellActions);

	let actionOverflow = $.prop($$props, 'actionOverflow', 3, 'auto'),
		mobileActionCount = $.prop($$props, 'mobileActionCount', 3, 1);

	const classes = $.tag($.derived(() => usePageShellTheme($$props.theme)), 'classes');
	const actionItems = $.tag($.derived(() => Array.isArray($$props.actions) ? $$props.actions : []), 'actionItems');
	const shouldOverflow = $.tag($.derived(() => $.strict_equals(actionOverflow(), 'auto') && $.get(actionItems).length > mobileActionCount()), 'shouldOverflow');

	const mobileActions = $.tag(
		$.derived(() => $.get(shouldOverflow)
			? $.get(actionItems).slice(0, mobileActionCount())
			: $.get(actionItems)),
		'mobileActions'
	);

	const overflowActions = $.tag($.derived(() => $.get(shouldOverflow) ? $.get(actionItems).slice(mobileActionCount()) : []), 'overflowActions');
	const overflowItems = $.tag($.derived(() => $.get(overflowActions).map(toMenuItem)), 'overflowItems');

	function toMenuItem(action) {
		const { content, type: _buttonType, ...buttonProps } = action;

		return {
			...buttonProps,
			type: 'button',
			children: buttonProps.children ?? content ?? action.label
		};
	}

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent_2 = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			{
				var consequent_1 = ($$anchor) => {
					var fragment_2 = root();
					var div = $.first_child(fragment_2);

					$.add_svelte_meta(
						() => $.each(div, 21, () => $$props.actions, $.index, ($$anchor, action) => {
							const computed_const = $.tag(
								$.derived(() => {
									const { content: label, ...buttonProps } = $.get(action);

									return { label, buttonProps };
								}),
								'[@const]'
							);

							$.get(computed_const);

							var fragment_3 = $.comment();
							var node_2 = $.first_child(fragment_3);

							$.add_svelte_meta(
								() => Button(node_2, $.spread_props(() => $.get(computed_const).buttonProps, {
									children: $.wrap_snippet(PageShellActions, ($$anchor, $$slotProps) => {
										$.next();

										var text = $.text();

										$.template_effect(() => $.set_text(text, $.get(computed_const).label));
										$.append($$anchor, text);
									}),
									$$slots: { default: true }
								})),
								'component',
								PageShellActions,
								55,
								4,
								{ componentTag: 'Button' }
							);

							$.append($$anchor, fragment_3);
						}),
						'each',
						PageShellActions,
						53,
						3
					);

					$.reset(div);

					var div_1 = $.sibling(div, 2);
					var node_3 = $.child(div_1);

					$.add_svelte_meta(
						() => $.each(node_3, 17, () => $.get(mobileActions), $.index, ($$anchor, action) => {
							const computed_const_1 = $.tag(
								$.derived(() => {
									const { content: label, ...buttonProps } = $.get(action);

									return { label, buttonProps };
								}),
								'[@const]'
							);

							$.get(computed_const_1);

							var fragment_5 = $.comment();
							var node_4 = $.first_child(fragment_5);

							$.add_svelte_meta(
								() => Button(node_4, $.spread_props(() => $.get(computed_const_1).buttonProps, {
									children: $.wrap_snippet(PageShellActions, ($$anchor, $$slotProps) => {
										$.next();

										var text_1 = $.text();

										$.template_effect(() => $.set_text(text_1, $.get(computed_const_1).label));
										$.append($$anchor, text_1);
									}),
									$$slots: { default: true }
								})),
								'component',
								PageShellActions,
								62,
								4,
								{ componentTag: 'Button' }
							);

							$.append($$anchor, fragment_5);
						}),
						'each',
						PageShellActions,
						60,
						3
					);

					var node_5 = $.sibling(node_3, 2);

					{
						var consequent = ($$anchor) => {
							var fragment_7 = $.comment();
							var node_6 = $.first_child(fragment_7);

							{
								const trigger = $.wrap_snippet(PageShellActions, function ($$anchor, popover = $.noop) {
									$.validate_snippet_args(...arguments);

									var fragment_8 = $.comment();
									var node_7 = $.first_child(fragment_8);

									{
										let $0 = $.derived(() => $.get(classes).overflowTrigger());

										$.add_svelte_meta(
											() => Button(node_7, {
												variant: 'outline',
												squared: true,
												label: 'More actions',
												get prefix() {
													return dotsThreeIcon;
												},

												get class() {
													return $.get($0);
												},
												[$.attachment()]: ($$node) => (popover().reference || $.noop)($$node),
												onClick: () => popover().toggle()
											}),
											'component',
											PageShellActions,
											68,
											6,
											{ componentTag: 'Button' }
										);
									}

									$.append($$anchor, fragment_8);
								});

								let $0 = $.derived(() => ({ items: $.get(overflowItems) }));

								$.add_svelte_meta(
									() => PopupMenu(node_6, {
										get menu() {
											return $.get($0);
										},
										position: 'bottom-end',
										fitTrigger: false,
										trigger,
										$$slots: { trigger: true }
									}),
									'component',
									PageShellActions,
									66,
									4,
									{ componentTag: 'PopupMenu' }
								);
							}

							$.append($$anchor, fragment_7);
						};

						$.add_svelte_meta(
							() => $.if(node_5, ($$render) => {
								if ($.get(overflowItems).length) $$render(consequent);
							}),
							'if',
							PageShellActions,
							65,
							3
						);
					}

					$.reset(div_1);

					$.template_effect(
						($0, $1) => {
							$.set_class(div, 1, $0);
							$.set_class(div_1, 1, $1);
						},
						[
							() => $.clsx($.get(classes).inlineActions()),
							() => $.clsx($.get(classes).mobileActions())
						]
					);

					$.append($$anchor, fragment_2);
				};

				var d = $.derived(() => Array.isArray($$props.actions));

				var alternate = ($$anchor) => {
					var fragment_9 = $.comment();
					var node_8 = $.first_child(fragment_9);

					$.add_svelte_meta(() => $.snippet(node_8, () => $$props.actions, () => $$props.api), 'render', PageShellActions, 82, 2);
					$.append($$anchor, fragment_9);
				};

				$.add_svelte_meta(
					() => $.if(node_1, ($$render) => {
						if ($.get(d)) $$render(consequent_1); else $$render(alternate, -1);
					}),
					'if',
					PageShellActions,
					51,
					1
				);
			}

			$.append($$anchor, fragment_1);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.actions) $$render(consequent_2);
			}),
			'if',
			PageShellActions,
			50,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PageShellActions = $.hmr(PageShellActions);

	import.meta.hot.acceptExports(["default"],(module) => {
		PageShellActions[$.HMR].update(module.default);
	});
}

export default PageShellActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxNQUFNLE1BQU0sc0NBQXNDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLFFBQVEsb0NBQW9DO0FBQ2xFLE9BQU8sU0FBUyxNQUFNLDRDQUE0QztBQVNsRSxPQUFPLEVBQUUsaUJBQWlCLFFBQWtDLHNCQUFzQjs7Ozs2Q0FabkYsQ0FBQzs7OztDQWNBLElBQUksQUFHSCxjQUFjLHdDQUFHLE1BQU07RUFDdkIsaUJBQWlCLDJDQUFHLENBQUM7O0NBVXRCLE1BQU0sT0FBTyx5QkFBWSxpQkFBaUI7Q0FDMUMsTUFBTSxXQUFXLHlCQUFZLEtBQUssQ0FBQyxPQUFPO0NBQzFDLE1BQU0sY0FBYyx5Q0FDbkIsY0FBYyxJQUFLLE1BQU0sV0FBSSxXQUFXLEVBQUMsTUFBTSxHQUFHOztDQUVuRCxNQUFNLGFBQWE7d0JBQ2xCLGNBQWM7V0FBRyxXQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxpQkFBaUI7V0FBSTs7OztDQUU1RCxNQUFNLGVBQWUsK0JBQVksY0FBYyxVQUFHLFdBQVcsRUFBQyxLQUFLLENBQUMsaUJBQWlCO0NBQ3JGLE1BQU0sYUFBYSwrQkFBWSxlQUFlLEVBQUMsR0FBRyxDQUFDLFVBQVU7O0NBRTdELFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBdUIsRUFBWTtFQUN0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEtBQUssV0FBVyxLQUFLLE1BQU07O0VBQzdELE1BQU07TUFDRixXQUFXO0dBQ2QsSUFBSSxFQUFFLFFBQVE7R0FDZCxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDOztDQUV0RDs7Ozs7Ozs7Ozs7Ozs7U0FLRSxHQUFHOzs7bUJBQUgsR0FBRyxpREFDZSxNQUFNOzs7aUJBQ2IsT0FBUSxFQUFDLEtBQU0sS0FBSSxXQUFZLFdBQUksTUFBTTs7a0JBQWhDLEtBQU0sRUFBSSxXQUFZOzs7Ozs7Ozs7OztjQUN4QyxNQUFNLG9EQUFLLFdBQVc7Ozs7Ozt5RUFBRyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQUhoQyxHQUFHOztTQU9ILEtBQUcsYUFQSCxHQUFHOzBCQU9ILEtBQUc7OzsyQ0FDSSxhQUFhLHVCQUFJLE1BQU07OztpQkFDbkIsT0FBUSxFQUFDLEtBQU0sS0FBSSxXQUFZLFdBQUksTUFBTTs7a0JBQWhDLEtBQU0sRUFBSSxXQUFZOzs7Ozs7Ozs7OztjQUN4QyxNQUFNLHNEQUFLLFdBQVc7Ozs7Ozs2RUFBRyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBS3BCLE9BQU8sd0RBQUMsT0FBTzs7Ozs7Ozt5Q0FNaEIsT0FBTyxFQUFDLGVBQWU7OztpQkFMOUI7Ozs7O29CQUlRLGFBQWE7Ozs7OzsyQ0FFWixPQUFPLEdBQUMsU0FBUzsyQkFDWCxPQUFPLEdBQUMsTUFBTTs7Ozs7Ozs7Ozs7OztvQ0FUYixLQUFLLFFBQUUsYUFBYTs7O2VBQXRDLFNBQVM7Ozs7O3NCQUFtRSxLQUFLO1VBQ3ZFLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7a0JBRmQsYUFBYSxFQUFDLE1BQU07Ozs7Ozs7OzthQU56QixLQUFHOzs7O21CQVBILEdBQUc7bUJBT0gsS0FBRzs7OzBCQVBRLE9BQU8sRUFBQyxhQUFhOzBCQU9yQixPQUFPLEVBQUMsYUFBYTs7Ozs7Ozs0QkFSN0IsS0FBSyxDQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSFgiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlBhZ2VTaGVsbEFjdGlvbnMuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBCdXR0b24gZnJvbSAnJGxpYi9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uc3ZlbHRlJztcblx0aW1wb3J0IHsgZG90c1RocmVlSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9kb3RzVGhyZWUuanMnO1xuXHRpbXBvcnQgUG9wdXBNZW51IGZyb20gJyRsaWIvY29tcG9uZW50cy9Qb3B1cE1lbnUvUG9wdXBNZW51LnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgTWVudUl0ZW0gfSBmcm9tICckbGliL2NvbXBvbmVudHMvTWVudS9pbmRleC5qcyc7XG5cdGltcG9ydCB0eXBlIHtcblx0XHRQYWdlU2hlbGxBY3Rpb24sXG5cdFx0UGFnZVNoZWxsQWN0aW9uT3ZlcmZsb3csXG5cdFx0UGFnZVNoZWxsQWN0aW9ucyxcblx0XHRQYWdlU2hlbGxBcGksXG5cdFx0UGFnZVNoZWxsTW9iaWxlQWN0aW9uQ291bnRcblx0fSBmcm9tICcuL3BhZ2VTaGVsbC5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZVBhZ2VTaGVsbFRoZW1lLCB0eXBlIFBhZ2VTaGVsbFRoZW1lUHJvcHMgfSBmcm9tICcuL3BhZ2VTaGVsbC50aGVtZS5qcyc7XG5cblx0bGV0IHtcblx0XHRhcGksXG5cdFx0YWN0aW9ucyxcblx0XHRhY3Rpb25PdmVyZmxvdyA9ICdhdXRvJyxcblx0XHRtb2JpbGVBY3Rpb25Db3VudCA9IDEsXG5cdFx0dGhlbWVcblx0fToge1xuXHRcdGFwaTogUGFnZVNoZWxsQXBpO1xuXHRcdGFjdGlvbnM/OiBQYWdlU2hlbGxBY3Rpb25zO1xuXHRcdGFjdGlvbk92ZXJmbG93PzogUGFnZVNoZWxsQWN0aW9uT3ZlcmZsb3c7XG5cdFx0bW9iaWxlQWN0aW9uQ291bnQ/OiBQYWdlU2hlbGxNb2JpbGVBY3Rpb25Db3VudDtcblx0XHR0aGVtZT86IFBhZ2VTaGVsbFRoZW1lUHJvcHM7XG5cdH0gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlUGFnZVNoZWxsVGhlbWUodGhlbWUpKTtcblx0Y29uc3QgYWN0aW9uSXRlbXMgPSAkZGVyaXZlZChBcnJheS5pc0FycmF5KGFjdGlvbnMpID8gYWN0aW9ucyA6IFtdKTtcblx0Y29uc3Qgc2hvdWxkT3ZlcmZsb3cgPSAkZGVyaXZlZChcblx0XHRhY3Rpb25PdmVyZmxvdyA9PT0gJ2F1dG8nICYmIGFjdGlvbkl0ZW1zLmxlbmd0aCA+IG1vYmlsZUFjdGlvbkNvdW50XG5cdCk7XG5cdGNvbnN0IG1vYmlsZUFjdGlvbnMgPSAkZGVyaXZlZChcblx0XHRzaG91bGRPdmVyZmxvdyA/IGFjdGlvbkl0ZW1zLnNsaWNlKDAsIG1vYmlsZUFjdGlvbkNvdW50KSA6IGFjdGlvbkl0ZW1zXG5cdCk7XG5cdGNvbnN0IG92ZXJmbG93QWN0aW9ucyA9ICRkZXJpdmVkKHNob3VsZE92ZXJmbG93ID8gYWN0aW9uSXRlbXMuc2xpY2UobW9iaWxlQWN0aW9uQ291bnQpIDogW10pO1xuXHRjb25zdCBvdmVyZmxvd0l0ZW1zID0gJGRlcml2ZWQob3ZlcmZsb3dBY3Rpb25zLm1hcCh0b01lbnVJdGVtKSk7XG5cblx0ZnVuY3Rpb24gdG9NZW51SXRlbShhY3Rpb246IFBhZ2VTaGVsbEFjdGlvbik6IE1lbnVJdGVtIHtcblx0XHRjb25zdCB7IGNvbnRlbnQsIHR5cGU6IF9idXR0b25UeXBlLCAuLi5idXR0b25Qcm9wcyB9ID0gYWN0aW9uO1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5idXR0b25Qcm9wcyxcblx0XHRcdHR5cGU6ICdidXR0b24nLFxuXHRcdFx0Y2hpbGRyZW46IGJ1dHRvblByb3BzLmNoaWxkcmVuID8/IGNvbnRlbnQgPz8gYWN0aW9uLmxhYmVsXG5cdFx0fTtcblx0fVxuPC9zY3JpcHQ+XG5cbnsjaWYgYWN0aW9uc31cblx0eyNpZiBBcnJheS5pc0FycmF5KGFjdGlvbnMpfVxuXHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMuaW5saW5lQWN0aW9ucygpfT5cblx0XHRcdHsjZWFjaCBhY3Rpb25zIGFzIGFjdGlvbiwgaW5kZXggKGluZGV4KX1cblx0XHRcdFx0e0Bjb25zdCB7IGNvbnRlbnQ6IGxhYmVsLCAuLi5idXR0b25Qcm9wcyB9ID0gYWN0aW9ufVxuXHRcdFx0XHQ8QnV0dG9uIHsuLi5idXR0b25Qcm9wc30+e2xhYmVsfTwvQnV0dG9uPlxuXHRcdFx0ey9lYWNofVxuXHRcdDwvZGl2PlxuXG5cdFx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5tb2JpbGVBY3Rpb25zKCl9PlxuXHRcdFx0eyNlYWNoIG1vYmlsZUFjdGlvbnMgYXMgYWN0aW9uLCBpbmRleCAoaW5kZXgpfVxuXHRcdFx0XHR7QGNvbnN0IHsgY29udGVudDogbGFiZWwsIC4uLmJ1dHRvblByb3BzIH0gPSBhY3Rpb259XG5cdFx0XHRcdDxCdXR0b24gey4uLmJ1dHRvblByb3BzfT57bGFiZWx9PC9CdXR0b24+XG5cdFx0XHR7L2VhY2h9XG5cblx0XHRcdHsjaWYgb3ZlcmZsb3dJdGVtcy5sZW5ndGh9XG5cdFx0XHRcdDxQb3B1cE1lbnUgbWVudT17eyBpdGVtczogb3ZlcmZsb3dJdGVtcyB9fSBwb3NpdGlvbj1cImJvdHRvbS1lbmRcIiBmaXRUcmlnZ2VyPXtmYWxzZX0+XG5cdFx0XHRcdFx0eyNzbmlwcGV0IHRyaWdnZXIocG9wb3Zlcil9XG5cdFx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRcdHZhcmlhbnQ9XCJvdXRsaW5lXCJcblx0XHRcdFx0XHRcdFx0c3F1YXJlZFxuXHRcdFx0XHRcdFx0XHRsYWJlbD1cIk1vcmUgYWN0aW9uc1wiXG5cdFx0XHRcdFx0XHRcdHByZWZpeD17ZG90c1RocmVlSWNvbn1cblx0XHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMub3ZlcmZsb3dUcmlnZ2VyKCl9XG5cdFx0XHRcdFx0XHRcdHtAYXR0YWNoIHBvcG92ZXIucmVmZXJlbmNlfVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiBwb3BvdmVyLnRvZ2dsZSgpfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7L3NuaXBwZXR9XG5cdFx0XHRcdDwvUG9wdXBNZW51PlxuXHRcdFx0ey9pZn1cblx0XHQ8L2Rpdj5cblx0ezplbHNlfVxuXHRcdHtAcmVuZGVyIGFjdGlvbnMoYXBpKX1cblx0ey9pZn1cbnsvaWZ9XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL1BhZ2VTaGVsbC9QYWdlU2hlbGxBY3Rpb25zLnN2ZWx0ZSJ9