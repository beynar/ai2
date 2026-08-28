import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Command/Command.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Command[$.FILENAME] = 'src/lib/components/Command/Command.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { untrack } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { useCommandTheme } from "/src/lib/components/Command/command.theme.ts";
import { CommandState } from "/src/lib/components/Command/command.state.svelte.ts";
import Dialog from "/src/lib/components/Dialog/Dialog.svelte";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import MenuOption from "/src/lib/components/MenuOption/MenuOption.svelte";
import { magnifyingGlassIcon } from "/src/lib/components/Icons/magnifyingGlass.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'items',
	'dialog',
	'open',
	'onOpenChange',
	'shortcut',
	'title',
	'closeOnSelect',
	'search',
	'onSearchChange',
	'placeholder',
	'showInput',
	'shouldFilter',
	'filter',
	'onSelect',
	'onHighlightChange',
	'empty',
	'item',
	'trigger',
	'footer',
	'size',
	'class',
	'theme'
]);

var root = $.add_locations($.from_html(`<span> </span>`), Command[$.FILENAME], [[121, 2]]);
var root_1 = $.add_locations($.from_html(`<div><div><!> <input type="text" role="combobox" aria-autocomplete="list" aria-expanded="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></div></div>`), Command[$.FILENAME], [[154, 3, [[155, 4, [[157, 5]]]]]]);
var root_2 = $.add_locations($.from_html(`<div role="separator"></div>`), Command[$.FILENAME], [[187, 6]]);
var root_3 = $.add_locations($.from_html(`<div aria-hidden="true"> </div>`), Command[$.FILENAME], [[195, 7]]);
var root_4 = $.add_locations($.from_html(`<!> <div role="group"><!> <!></div>`, 1), Command[$.FILENAME], [[189, 5]]);
var root_5 = $.add_locations($.from_html(`<div><!> <div role="listbox" aria-label="Commands"><!></div> <!></div>`), Command[$.FILENAME], [[152, 1, [[181, 2]]]]);

function Command($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Command);

	var $$ownership_validator = $.create_ownership_validator($$props);

	const // Dialog mode reuses the Dialog component as a bare panel: strip its padding, hide the header
	// visually (it still carries the accessible title) and the close button (Escape still closes,
	// since `closable` also gates Escape), and match the palette's radius.
	// Dialog mode: the content mounts on each open and the Dialog does no focus management of
	// its own, so grab focus for the search input once the mount settles ({@attach} on the input).
	// setTimeout, not requestAnimationFrame — rAF never fires in hidden/backgrounded tabs.
	/**
	 * The full command state machine, for externally driven palettes (`bind:this`):
	 * `commandState.move(delta)`, `commandState.selectHighlighted()`, `commandState.highlighted`,
	 * `commandState.open()`, ...
	 */
	optionRow = $.wrap_snippet(Command, function ($$anchor, it = $.noop) {
		$.validate_snippet_args(...arguments);

		const shortcut = $.wrap_snippet(Command, function ($$anchor) {
			$.validate_snippet_args(...arguments);

			var span = root();
			var text = $.child(span, true);

			$.reset(span);

			$.template_effect(
				($0) => {
					$.set_class(span, 1, $0);
					$.set_text(text, it().shortcut);
				},
				[
					() => $.clsx($.get(classes).shortcut({ size: size(), highlighted: $.get(highlighted) }))
				]
			);

			$.append($$anchor, span);
		});

		const customRow = $.wrap_snippet(Command, function ($$anchor) {
			$.validate_snippet_args(...arguments);

			var fragment = $.comment();
			var node_1 = $.first_child(fragment);

			$.add_svelte_meta(() => $.snippet(node_1, () => $$props.item ?? $.noop, it), 'render', Command, 124, 2);
			$.append($$anchor, fragment);
		});

		const highlighted = $.tag($.derived(() => $.strict_equals(command.highlighted, it().value)), 'highlighted');

		$.get(highlighted);

		var fragment_1 = $.comment();
		var node_2 = $.first_child(fragment_1);

		{
			let $0 = $.derived(() => it().href ? 'a' : 'div');
			let $1 = $.derived(() => $$props.item ? undefined : it().label);
			let $2 = $.derived(() => $$props.item ? undefined : it().icon);
			let $3 = $.derived(() => $$props.item || !it().shortcut ? undefined : shortcut);
			let $4 = $.derived(() => $$props.item ? customRow : undefined);
			let $5 = $.derived(() => !!it().disabled);

			let $6 = $.derived(() => ({
				id: command.optionId(it().value),
				'data-value': it().value,
				tabindex: -1,
				onpointermove: () => {
					if (!it().disabled) command.setHighlighted(it().value);
				}
			}));

			$.add_svelte_meta(
				() => MenuOption(node_2, {
					get as() {
						return $.get($0);
					},
					role: 'option',
					get href() {
						return it().href;
					},

					get size() {
						return size();
					},

					get title() {
						return $.get($1);
					},

					get prefix() {
						return $.get($2);
					},

					get suffix() {
						return $.get($3);
					},

					get children() {
						return $.get($4);
					},

					get highlighted() {
						return $.get(highlighted);
					},

					get selected() {
						return $.get(highlighted);
					},

					get disabled() {
						return $.get($5);
					},

					get class() {
						return it().class;
					},
					onClick: () => command.select(it()),
					get attrs() {
						return $.get($6);
					}
				}),
				'component',
				Command,
				126,
				1,
				{ componentTag: 'MenuOption' }
			);
		}

		$.append($$anchor, fragment_1);
	});

	const commandBox = $.wrap_snippet(Command, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var div = root_5();

		$.attribute_effect(div, ($0) => ({ class: $0, ...attachments }), [
			() => $.get(classes).root({ size: size(), className: $$props.class })
		]);

		var node_3 = $.child(div);

		{
			var consequent = ($$anchor) => {
				var div_1 = root_1();
				var div_2 = $.child(div_1);
				var node_4 = $.child(div_2);

				{
					let $0 = $.derived(() => ({ class: $.get(classes).inputIcon({ size: size() }) }));

					$.add_svelte_meta(() => magnifyingGlassIcon(node_4, () => $.get($0)), 'render', Command, 156, 5);
				}

				var input = $.sibling(node_4, 2);

				$.remove_input_defaults(input);
				$.attach(input, () => focusInput);
				$.reset(div_2);
				$.reset(div_1);

				$.template_effect(
					($0, $1, $2, $3) => {
						$.set_class(div_1, 1, $0);
						$.set_class(div_2, 1, $1);
						$.set_class(input, 1, $2);
						$.set_attribute(input, 'aria-controls', command.listId);
						$.set_attribute(input, 'aria-activedescendant', $3);
						$.set_attribute(input, 'placeholder', placeholder());
						$.set_value(input, search());
					},
					[
						() => $.clsx($.get(classes).inputWrapper({ size: size() })),
						() => $.clsx($.get(classes).inputGroup({ size: size() })),
						() => $.clsx($.get(classes).input({ size: size() })),
						() => $.strict_equals(command.highlighted, undefined, false) ? command.optionId(command.highlighted) : undefined
					]
				);

				$.delegated('input', input, function input_1(event) {
					return command.setSearch(event.currentTarget.value);
				});

				$.delegated('keydown', input, function (...$$args) {
					$.apply(() => command.onKeydown, this, $$args, Command, [175, 17]);
				});

				$.append($$anchor, div_1);
			};

			$.add_svelte_meta(
				() => $.if(node_3, ($$render) => {
					if (showInput()) $$render(consequent);
				}),
				'if',
				Command,
				153,
				2
			);
		}

		var div_3 = $.sibling(node_3, 2);
		var node_5 = $.child(div_3);

		{
			var consequent_1 = ($$anchor) => {
				var fragment_2 = $.comment();
				var node_6 = $.first_child(fragment_2);

				{
					let $0 = $.derived(() => $.get(classes).empty({ size: size() }));

					$.add_svelte_meta(
						() => Slot(node_6, {
							get render() {
								return empty();
							},

							get class() {
								return $.get($0);
							},

							get payload() {
								return slotPayload;
							}
						}),
						'component',
						Command,
						183,
						4,
						{ componentTag: 'Slot' }
					);
				}

				$.append($$anchor, fragment_2);
			};

			var alternate = ($$anchor) => {
				var fragment_3 = $.comment();
				var node_7 = $.first_child(fragment_3);

				$.add_svelte_meta(
					() => $.each(node_7, 17, () => command.visibleGroups, $.index, ($$anchor, group, groupIndex) => {
						var fragment_4 = root_4();
						var node_8 = $.first_child(fragment_4);

						{
							var consequent_2 = ($$anchor) => {
								var div_4 = root_2();

								$.template_effect(($0) => $.set_class(div_4, 1, $0), [() => $.clsx($.get(classes).separator({ size: size() }))]);
								$.append($$anchor, div_4);
							};

							$.add_svelte_meta(
								() => $.if(node_8, ($$render) => {
									if (groupIndex > 0) $$render(consequent_2);
								}),
								'if',
								Command,
								186,
								5
							);
						}

						var div_5 = $.sibling(node_8, 2);
						var node_9 = $.child(div_5);

						{
							var consequent_3 = ($$anchor) => {
								var div_6 = root_3();
								var text_1 = $.child(div_6, true);

								$.reset(div_6);

								$.template_effect(
									($0) => {
										$.set_class(div_6, 1, $0);
										$.set_text(text_1, $.get(group).heading);
									},
									[() => $.clsx($.get(classes).groupHeading({ size: size() }))]
								);

								$.append($$anchor, div_6);
							};

							$.add_svelte_meta(
								() => $.if(node_9, ($$render) => {
									if ($.get(group).heading) $$render(consequent_3);
								}),
								'if',
								Command,
								194,
								6
							);
						}

						var node_10 = $.sibling(node_9, 2);

						$.add_svelte_meta(
							() => $.each(node_10, 17, () => $.get(group).items, (it) => it.value, ($$anchor, it) => {
								$.add_svelte_meta(() => optionRow($$anchor, () => $.get(it)), 'render', Command, 200, 7);
							}),
							'each',
							Command,
							199,
							6
						);

						$.reset(div_5);

						$.template_effect(
							($0) => {
								$.set_attribute(div_5, 'aria-label', $.get(group).heading);
								$.set_class(div_5, 1, $0);
							},
							[
								() => $.clsx($.get(classes).group({ size: size(), class: $.get(group).class }))
							]
						);

						$.append($$anchor, fragment_4);
					}),
					'each',
					Command,
					185,
					4
				);

				$.append($$anchor, fragment_3);
			};

			$.add_svelte_meta(
				() => $.if(node_5, ($$render) => {
					if (command.isEmpty) $$render(consequent_1); else $$render(alternate, -1);
				}),
				'if',
				Command,
				182,
				3
			);
		}

		$.reset(div_3);

		var node_11 = $.sibling(div_3, 2);

		{
			let $0 = $.derived(() => $.get(classes).footer({ size: size() }));

			$.add_svelte_meta(
				() => Slot(node_11, {
					get render() {
						return $$props.footer;
					},

					get class() {
						return $.get($0);
					},

					get payload() {
						return slotPayload;
					}
				}),
				'component',
				Command,
				207,
				2,
				{ componentTag: 'Slot' }
			);
		}

		$.reset(div);

		$.template_effect(
			($0) => {
				$.set_attribute(div_3, 'id', command.listId);
				$.set_class(div_3, 1, $0);
			},
			[() => $.clsx($.get(classes).list({ size: size() }))]
		);

		$.append($$anchor, div);
	});

	const dialogTrigger = $.wrap_snippet(Command, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment_6 = $.comment();
		var node_12 = $.first_child(fragment_6);

		{
			let $0 = $.derived(() => $.get(classes).trigger());

			$.add_svelte_meta(
				() => Slot(node_12, {
					as: 'span',
					get render() {
						return $$props.trigger;
					},

					get payload() {
						return slotPayload;
					},

					get class() {
						return $.get($0);
					},
					[$.attachment()]: ($$node) => (command.trigger || $.noop)($$node)
				}),
				'component',
				Command,
				212,
				1,
				{ componentTag: 'Slot' }
			);
		}

		$.append($$anchor, fragment_6);
	});

	let dialog = $.prop($$props, 'dialog', 3, false),
		open = $.prop($$props, 'open', 15, false),
		shortcut = $.prop($$props, 'shortcut', 3, false),
		title = $.prop($$props, 'title', 3, 'Command palette'),
		closeOnSelect = $.prop($$props, 'closeOnSelect', 3, true),
		search = $.prop($$props, 'search', 15, ''),
		placeholder = $.prop($$props, 'placeholder', 3, 'Type a command or search...'),
		showInput = $.prop($$props, 'showInput', 3, true),
		shouldFilter = $.prop($$props, 'shouldFilter', 3, true),
		empty = $.prop($$props, 'empty', 3, 'No results found.'),
		size = $.prop($$props, 'size', 3, 'normal'),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const command = new CommandState({
		id,
		get items() {
			return $$props.items;
		},

		get dialog() {
			return dialog();
		},

		get isOpen() {
			return open();
		},

		set isOpen(value) {
			open(value);
		},

		get search() {
			return search();
		},

		set search(value) {
			search(value);
		},

		get shortcut() {
			return shortcut();
		},

		get closeOnSelect() {
			return closeOnSelect();
		},

		get shouldFilter() {
			return shouldFilter();
		},

		get filter() {
			return $$props.filter;
		},

		get onOpenChange() {
			return $$props.onOpenChange;
		},

		get onSearchChange() {
			return $$props.onSearchChange;
		},

		get onSelect() {
			return $$props.onSelect;
		},

		get onHighlightChange() {
			return $$props.onHighlightChange;
		}
	});

	// Dialog mode reuses the Dialog component as a bare panel: strip its padding, hide the header
	// visually (it still carries the accessible title) and the close button (Escape still closes,
	// since `closable` also gates Escape), and match the palette's radius.
	const dialogTheme = {
		content: { base: 'rounded-xl p-0 overflow-hidden' },
		header: { base: 'sr-only' },
		closeButton: { base: 'hidden' }
	};

	const classes = $.tag($.derived(() => useCommandTheme($$props.theme)), 'classes');
	const slotPayload = { open: () => command.open(), close: () => command.close() };

	// Dialog mode: the content mounts on each open and the Dialog does no focus management of
	// its own, so grab focus for the search input once the mount settles ({@attach} on the input).
	// setTimeout, not requestAnimationFrame — rAF never fires in hidden/backgrounded tabs.
	const focusInput = (node) => {
		return untrack(() => {
			if (!dialog()) return;

			const timeout = setTimeout(() => node.focus(), 0);

			return () => clearTimeout(timeout);
		});
	};

	/**
	 * The full command state machine, for externally driven palettes (`bind:this`):
	 * `commandState.move(delta)`, `commandState.selectHighlighted()`, `commandState.highlighted`,
	 * `commandState.open()`, ...
	 */
	const commandState = command;

	var $$exports = {
		...$.legacy_api(),
		get commandState() {
			return commandState;
		}
	};

	var fragment_7 = $.comment();
	var node_13 = $.first_child(fragment_7);

	{
		var consequent_4 = ($$anchor) => {
			var fragment_8 = $.comment();
			var node_14 = $.first_child(fragment_8);

			{
				let $0 = $.derived(() => $$props.trigger ? dialogTrigger : undefined);

				$$ownership_validator.binding('open', Dialog, open);

				$.add_svelte_meta(
					() => Dialog(node_14, {
						type: 'modal',
						get title() {
							return title();
						},

						get theme() {
							return dialogTheme;
						},

						get trigger() {
							return $.get($0);
						},

						get open() {
							return open();
						},

						set open($$value) {
							open($$value);
						},

						children: $.wrap_snippet(Command, ($$anchor, $$slotProps) => {
							$.add_svelte_meta(() => commandBox($$anchor), 'render', Command, 229, 2);
						}),
						$$slots: { default: true }
					}),
					'component',
					Command,
					222,
					1,
					{ componentTag: 'Dialog' }
				);
			}

			$.append($$anchor, fragment_8);
		};

		var alternate_1 = ($$anchor) => {
			$.add_svelte_meta(() => commandBox($$anchor), 'render', Command, 232, 1);
		};

		$.add_svelte_meta(
			() => $.if(node_13, ($$render) => {
				if (dialog()) $$render(consequent_4); else $$render(alternate_1, -1);
			}),
			'if',
			Command,
			221,
			0
		);
	}

	$.append($$anchor, fragment_7);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Command = $.hmr(Command);

	import.meta.hot.acceptExports(["default"],(module) => {
		Command[$.HMR].update(module.default);
	});
}

export default Command;

$.delegate(['input', 'keydown']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLE9BQU8sUUFBUSxRQUFRO0FBRWhDLE9BQU8sRUFBRSxlQUFlLFFBQVEsb0JBQW9CO0FBQ3BELE9BQU8sRUFBRSxZQUFZLFFBQVEsMkJBQTJCO0FBRXhELE9BQU8sTUFBTSxNQUFNLHlCQUF5QjtBQUM1QyxPQUFPLElBQUksTUFBTSxxQkFBcUI7QUFDdEMsT0FBTyxVQUFVLE1BQU0saUNBQWlDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsUUFBUSw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBVGxFLENBQUM7T0FxQ00sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0ZDLFNBQVMsK0NBQUMsRUFBc0I7OztRQUUvQixRQUFROzs7T0FDaEIsSUFBSTtzQkFBSixJQUFJOztXQUFKLElBQUk7Ozs7aUJBQUosSUFBSTtzQkFBa0QsRUFBRSxHQUFDLFFBQVE7Ozt3QkFBckQsT0FBTyxFQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUosSUFBSSxJQUFFLFdBQVcsUUFBWCxXQUFXOzs7O3NCQUFoRCxJQUFJOzs7UUFFSSxTQUFTOzs7Ozs7MkVBQ0YsRUFBRTs7OztRQUxYLFdBQVcseUNBQUcsT0FBTyxDQUFDLFdBQVcsRUFBSyxFQUFFLEdBQUMsS0FBSzs7UUFBOUMsV0FBVzs7Ozs7OzRCQVFkLEVBQUUsR0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUs7MkNBSVgsU0FBUyxHQUFHLEVBQUUsR0FBQyxLQUFLOzJDQUNuQixTQUFTLEdBQUcsRUFBRSxHQUFDLElBQUk7NkNBQ2pCLEVBQUUsR0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLFFBQVE7MkNBQ2xDLFNBQVMsR0FBRyxTQUFTOzhCQUcxQixFQUFFLEdBQUMsUUFBUTs7O0lBSXRCLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBQyxLQUFLO0lBQzdCLFlBQVksRUFBRSxFQUFFLEdBQUMsS0FBSztJQUN0QixRQUFRLEdBQUcsQ0FBQztJQUNaLGFBQWEsUUFBUTtLQUNwQixFQUFFLEdBQUcsRUFBRSxHQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBQyxLQUFLO0lBQ2xEOzs7O1VBcEJEOzs7Ozs7YUFHTSxFQUFFLEdBQUMsSUFBSTs7OzthQUNaLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUtKLFdBQVc7Ozs7bUJBQ0YsV0FBVzs7Ozs7Ozs7YUFFZCxFQUFFLEdBQUMsS0FBSzs7b0JBQ0EsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O09BWXhCLFVBQVU7OztNQUNsQixHQUFHOztxQkFBSCxHQUFHLDJCQUErQyxXQUFXO2VBQWxELE9BQU8sRUFBQyxJQUFJLEdBQUcsSUFBSSxFQUFKLElBQUksSUFBRSxTQUFTOzs7dUJBQXpDLEdBQUc7Ozs7UUFFRCxLQUFHO1FBQ0YsS0FBRyxXQURKLEtBQUc7eUJBQ0YsS0FBRzs7O2lDQUM0QixLQUFLLFFBQUUsT0FBTyxFQUFDLFNBQVMsR0FBRyxJQUFJLEVBQUosSUFBSTs7NkJBQXJELG1CQUFtQjs7O1FBQzNCOzs0QkFBQTthQUFBLGFBQ1MsVUFBVTtZQUhwQixLQUFHO1lBREosS0FBRzs7OztrQkFBSCxLQUFHO2tCQUNGLEtBQUc7a0JBRUY7c0JBQUEsd0JBT2UsT0FBTyxDQUFDLE1BQU07c0JBUDdCO3NCQUFBLHNCQWVDLFdBQVc7a0JBZlosT0FnQk8sTUFBTTs7O3lCQW5CSixPQUFPLEVBQUMsWUFBWSxHQUFHLElBQUksRUFBSixJQUFJO3lCQUMxQixPQUFPLEVBQUMsVUFBVSxHQUFHLElBQUksRUFBSixJQUFJO3lCQUk1QixPQUFPLEVBQUMsS0FBSyxHQUFHLElBQUksRUFBSixJQUFJOzRCQU1KLE9BQU8sQ0FBQyxXQUFXLEVBQUssb0JBQzVDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFDcEMsU0FBUzs7Ozt5QkFWWix3QkFpQlUsS0FBSztZQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLOzs7MkJBakIvRDttQkFrQlcsT0FBTyxDQUFDLFNBQVM7Ozt1QkFyQjlCLEtBQUc7Ozs7O1NBREEsU0FBUzs7Ozs7Ozs7O01BNEJiLEtBQUc7dUJBQUgsS0FBRzs7Ozs7Ozs7b0NBRTBCLE9BQU8sRUFBQyxLQUFLLEdBQUcsSUFBSSxFQUFKLElBQUk7OztZQUEvQyxJQUFJOztlQUFTLEtBQUs7Ozs7Ozs7O2VBQTJDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBRWxFLE9BQU8sQ0FBQyxhQUFhLHNCQUFJLEtBQUs7Ozs7OztZQUVsQyxLQUFHOzs4Q0FBSCxLQUFHLDhCQUF5QixPQUFPLEVBQUMsU0FBUyxHQUFHLElBQUksRUFBSixJQUFJOzJCQUFwRCxLQUFHOzs7OzthQURBLFVBQVUsR0FBRyxDQUFDOzs7Ozs7Ozs7VUFHbEI7MkJBQUE7Ozs7WUFNRSxLQUFHOzZCQUFILEtBQUc7O2dCQUFILEtBQUc7Ozs7c0JBQUgsS0FBRzttQ0FDRixLQUFLLEVBQUMsT0FBTzs7NkJBRGdCLE9BQU8sRUFBQyxZQUFZLEdBQUcsSUFBSSxFQUFKLElBQUk7OzsyQkFBekQsS0FBRzs7Ozs7bUJBREEsS0FBSyxFQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs2Q0FLWCxLQUFLLEVBQUMsS0FBSyxHQUFJLEVBQUUsS0FBRSxFQUFFLENBQUMsS0FBSyxhQUFaLEVBQUU7Z0NBQ2QsU0FBUyx1QkFBQyxFQUFFOzs7Ozs7OztjQVh0Qjs7Ozt3QkFBQSwyQkFFWSxLQUFLLEVBQUMsT0FBTztvQkFGekI7OzsyQkFHTyxPQUFPLEVBQUMsS0FBSyxHQUFHLElBQUksRUFBSixJQUFJLElBQUUsS0FBSyxRQUFFLEtBQUssRUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7OztTQVY3QyxPQUFPLENBQUMsT0FBTzs7Ozs7Ozs7O1VBRHBCLEtBQUc7OzBCQUFILEtBQUc7OztrQ0EwQnlCLE9BQU8sRUFBQyxNQUFNLEdBQUcsSUFBSSxFQUFKLElBQUk7OztVQUFqRCxJQUFJOzs7Ozs7Ozs7O2FBQTJELFdBQVc7Ozs7Ozs7Ozs7O1VBdkQzRSxHQUFHOzs7O29CQTZCRixLQUFHLFFBQUssT0FBTyxDQUFDLE1BQU07Z0JBQXRCLEtBQUc7O3VCQUFpRSxPQUFPLEVBQUMsSUFBSSxHQUFHLElBQUksRUFBSixJQUFJOzs7cUJBN0J4RixHQUFHOzs7T0EyREssYUFBYTs7Ozs7OztrQ0FLZCxPQUFPLEVBQUMsT0FBTzs7O1VBSnRCOzs7Ozs7O2FBR1MsV0FBVzs7Ozs7O29DQUVYLE9BQU8sQ0FBQyxPQUFPOzs7Ozs7Ozs7Ozs7O0NBN016QixJQUFJLEFBRUgsTUFBTSxnQ0FBRyxLQUFLO0VBQ2QsSUFBSSwrQkFBYSxLQUFLO0VBRXRCLFFBQVEsa0NBQUcsS0FBSztFQUNoQixLQUFLLCtCQUFHLGlCQUFpQjtFQUN6QixhQUFhLHVDQUFHLElBQUk7RUFDcEIsTUFBTSxpQ0FBYSxFQUFFO0VBRXJCLFdBQVcscUNBQUcsNkJBQTZCO0VBQzNDLFNBQVMsbUNBQUcsSUFBSTtFQUNoQixZQUFZLHNDQUFHLElBQUk7RUFJbkIsS0FBSywrQkFBRyxtQkFBbUI7RUFJM0IsSUFBSSw4QkFBRyxRQUFRO0VBR1o7O0NBS0osTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVk7RUFDL0IsRUFBRTtFQUNGLElBQUksS0FBSyxHQUFHO0dBQ1gsTUFBTTtFQUNQLENBQUM7O0VBQ0QsSUFBSSxNQUFNLEdBQUc7R0FDWixNQUFNLENBQUMsTUFBTTtFQUNkLENBQUM7O0VBQ0QsSUFBSSxNQUFNLEdBQUc7R0FDWixNQUFNLENBQUMsSUFBSTtFQUNaLENBQUM7O0VBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO0dBQ2pCLElBQUksQ0FBRyxLQUFLO0VBQ2IsQ0FBQzs7RUFDRCxJQUFJLE1BQU0sR0FBRztHQUNaLE1BQU0sQ0FBQyxNQUFNO0VBQ2QsQ0FBQzs7RUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7R0FDakIsTUFBTSxDQUFHLEtBQUs7RUFDZixDQUFDOztFQUNELElBQUksUUFBUSxHQUFHO0dBQ2QsTUFBTSxDQUFDLFFBQVE7RUFDaEIsQ0FBQzs7RUFDRCxJQUFJLGFBQWEsR0FBRztHQUNuQixNQUFNLENBQUMsYUFBYTtFQUNyQixDQUFDOztFQUNELElBQUksWUFBWSxHQUFHO0dBQ2xCLE1BQU0sQ0FBQyxZQUFZO0VBQ3BCLENBQUM7O0VBQ0QsSUFBSSxNQUFNLEdBQUc7R0FDWixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLFlBQVksR0FBRztHQUNsQixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLGNBQWMsR0FBRztHQUNwQixNQUFNO0VBQ1AsQ0FBQzs7RUFDRCxJQUFJLFFBQVEsR0FBRztHQUNkLE1BQU07RUFDUCxDQUFDOztFQUNELElBQUksaUJBQWlCLEdBQUc7R0FDdkIsTUFBTTtFQUNQOzs7Ozs7Q0FNRCxNQUFNLFdBQVc7RUFDaEIsT0FBTyxJQUFJLElBQUksRUFBRSxnQ0FBZ0M7RUFDakQsTUFBTSxJQUFJLElBQUksRUFBRSxTQUFTO0VBQ3pCLFdBQVcsSUFBSSxJQUFJLEVBQUUsUUFBUTs7O0NBRzlCLE1BQU0sT0FBTyx5QkFBWSxlQUFlO0NBRXhDLE1BQU0sV0FBVyxLQUFLLElBQUksUUFBUSxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssUUFBUSxPQUFPLENBQUMsS0FBSzs7Ozs7Q0FLNUUsTUFBTSxVQUFVLElBQUksSUFBaUIsS0FBSztFQUN6QyxNQUFNLENBQUMsT0FBTyxPQUFPO0dBQ3BCLEVBQUUsR0FBRyxNQUFNLElBQUUsTUFBTTs7R0FDbkIsTUFBTSxPQUFPLEdBQUcsVUFBVSxPQUFRLElBQUksQ0FBc0IsS0FBSyxJQUFJLENBQUM7O0dBQ3RFLE1BQU0sT0FBTyxZQUFZLENBQUMsT0FBTztFQUNsQyxDQUFDO0NBQ0YsQ0FBQzs7Ozs7OztDQU9NLE1BQU0sWUFBaUMsR0FBRyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NBZ0hwQyxhQUFhLEdBQUcsU0FBUzs7Ozs7V0FMNUM7OztjQUdDLEtBQUs7Ozs7Y0FDQyxXQUFXOzs7Ozs7O1VBSGxCLElBQUs7Ozs7VUFBTCxJQUFLOzs7OzsrQkFNSSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUdYLFVBQVU7Ozs7O1FBWGYsTUFBTTs7Ozs7Ozs7Ozs7O0FBekdIIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJDb21tYW5kLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIGdlbmVyaWNzPVwiVmFsdWUgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmdcIj5cblx0aW1wb3J0IHsgdW50cmFjayB9IGZyb20gJ3N2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgQ29tbWFuZEl0ZW0sIENvbW1hbmRQcm9wcyB9IGZyb20gJy4vY29tbWFuZC5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZUNvbW1hbmRUaGVtZSB9IGZyb20gJy4vY29tbWFuZC50aGVtZS5qcyc7XG5cdGltcG9ydCB7IENvbW1hbmRTdGF0ZSB9IGZyb20gJy4vY29tbWFuZC5zdGF0ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgdHlwZSB7IERpYWxvZ1RoZW1lUHJvcHMgfSBmcm9tICcuLi9EaWFsb2cvZGlhbG9nLnRoZW1lLmpzJztcblx0aW1wb3J0IERpYWxvZyBmcm9tICcuLi9EaWFsb2cvRGlhbG9nLnN2ZWx0ZSc7XG5cdGltcG9ydCBTbG90IGZyb20gJy4uL1Nsb3QvU2xvdC5zdmVsdGUnO1xuXHRpbXBvcnQgTWVudU9wdGlvbiBmcm9tICcuLi9NZW51T3B0aW9uL01lbnVPcHRpb24uc3ZlbHRlJztcblx0aW1wb3J0IHsgbWFnbmlmeWluZ0dsYXNzSWNvbiB9IGZyb20gJy4uL0ljb25zL21hZ25pZnlpbmdHbGFzcy5qcyc7XG5cblx0bGV0IHtcblx0XHRpdGVtcyxcblx0XHRkaWFsb2cgPSBmYWxzZSxcblx0XHRvcGVuID0gJGJpbmRhYmxlKGZhbHNlKSxcblx0XHRvbk9wZW5DaGFuZ2UsXG5cdFx0c2hvcnRjdXQgPSBmYWxzZSxcblx0XHR0aXRsZSA9ICdDb21tYW5kIHBhbGV0dGUnLFxuXHRcdGNsb3NlT25TZWxlY3QgPSB0cnVlLFxuXHRcdHNlYXJjaCA9ICRiaW5kYWJsZSgnJyksXG5cdFx0b25TZWFyY2hDaGFuZ2UsXG5cdFx0cGxhY2Vob2xkZXIgPSAnVHlwZSBhIGNvbW1hbmQgb3Igc2VhcmNoLi4uJyxcblx0XHRzaG93SW5wdXQgPSB0cnVlLFxuXHRcdHNob3VsZEZpbHRlciA9IHRydWUsXG5cdFx0ZmlsdGVyLFxuXHRcdG9uU2VsZWN0LFxuXHRcdG9uSGlnaGxpZ2h0Q2hhbmdlLFxuXHRcdGVtcHR5ID0gJ05vIHJlc3VsdHMgZm91bmQuJyxcblx0XHRpdGVtLFxuXHRcdHRyaWdnZXIsXG5cdFx0Zm9vdGVyLFxuXHRcdHNpemUgPSAnbm9ybWFsJyxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IENvbW1hbmRQcm9wczxWYWx1ZT4gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXG5cdGNvbnN0IGNvbW1hbmQgPSBuZXcgQ29tbWFuZFN0YXRlPFZhbHVlPih7XG5cdFx0aWQsXG5cdFx0Z2V0IGl0ZW1zKCkge1xuXHRcdFx0cmV0dXJuIGl0ZW1zO1xuXHRcdH0sXG5cdFx0Z2V0IGRpYWxvZygpIHtcblx0XHRcdHJldHVybiBkaWFsb2c7XG5cdFx0fSxcblx0XHRnZXQgaXNPcGVuKCkge1xuXHRcdFx0cmV0dXJuIG9wZW47XG5cdFx0fSxcblx0XHRzZXQgaXNPcGVuKHZhbHVlKSB7XG5cdFx0XHRvcGVuID0gdmFsdWU7XG5cdFx0fSxcblx0XHRnZXQgc2VhcmNoKCkge1xuXHRcdFx0cmV0dXJuIHNlYXJjaDtcblx0XHR9LFxuXHRcdHNldCBzZWFyY2godmFsdWUpIHtcblx0XHRcdHNlYXJjaCA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0Z2V0IHNob3J0Y3V0KCkge1xuXHRcdFx0cmV0dXJuIHNob3J0Y3V0O1xuXHRcdH0sXG5cdFx0Z2V0IGNsb3NlT25TZWxlY3QoKSB7XG5cdFx0XHRyZXR1cm4gY2xvc2VPblNlbGVjdDtcblx0XHR9LFxuXHRcdGdldCBzaG91bGRGaWx0ZXIoKSB7XG5cdFx0XHRyZXR1cm4gc2hvdWxkRmlsdGVyO1xuXHRcdH0sXG5cdFx0Z2V0IGZpbHRlcigpIHtcblx0XHRcdHJldHVybiBmaWx0ZXI7XG5cdFx0fSxcblx0XHRnZXQgb25PcGVuQ2hhbmdlKCkge1xuXHRcdFx0cmV0dXJuIG9uT3BlbkNoYW5nZTtcblx0XHR9LFxuXHRcdGdldCBvblNlYXJjaENoYW5nZSgpIHtcblx0XHRcdHJldHVybiBvblNlYXJjaENoYW5nZTtcblx0XHR9LFxuXHRcdGdldCBvblNlbGVjdCgpIHtcblx0XHRcdHJldHVybiBvblNlbGVjdDtcblx0XHR9LFxuXHRcdGdldCBvbkhpZ2hsaWdodENoYW5nZSgpIHtcblx0XHRcdHJldHVybiBvbkhpZ2hsaWdodENoYW5nZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIERpYWxvZyBtb2RlIHJldXNlcyB0aGUgRGlhbG9nIGNvbXBvbmVudCBhcyBhIGJhcmUgcGFuZWw6IHN0cmlwIGl0cyBwYWRkaW5nLCBoaWRlIHRoZSBoZWFkZXJcblx0Ly8gdmlzdWFsbHkgKGl0IHN0aWxsIGNhcnJpZXMgdGhlIGFjY2Vzc2libGUgdGl0bGUpIGFuZCB0aGUgY2xvc2UgYnV0dG9uIChFc2NhcGUgc3RpbGwgY2xvc2VzLFxuXHQvLyBzaW5jZSBgY2xvc2FibGVgIGFsc28gZ2F0ZXMgRXNjYXBlKSwgYW5kIG1hdGNoIHRoZSBwYWxldHRlJ3MgcmFkaXVzLlxuXHRjb25zdCBkaWFsb2dUaGVtZSA9IHtcblx0XHRjb250ZW50OiB7IGJhc2U6ICdyb3VuZGVkLXhsIHAtMCBvdmVyZmxvdy1oaWRkZW4nIH0sXG5cdFx0aGVhZGVyOiB7IGJhc2U6ICdzci1vbmx5JyB9LFxuXHRcdGNsb3NlQnV0dG9uOiB7IGJhc2U6ICdoaWRkZW4nIH1cblx0fSBzYXRpc2ZpZXMgRGlhbG9nVGhlbWVQcm9wcztcblxuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlQ29tbWFuZFRoZW1lKHRoZW1lKSk7XG5cblx0Y29uc3Qgc2xvdFBheWxvYWQgPSB7IG9wZW46ICgpID0+IGNvbW1hbmQub3BlbigpLCBjbG9zZTogKCkgPT4gY29tbWFuZC5jbG9zZSgpIH07XG5cblx0Ly8gRGlhbG9nIG1vZGU6IHRoZSBjb250ZW50IG1vdW50cyBvbiBlYWNoIG9wZW4gYW5kIHRoZSBEaWFsb2cgZG9lcyBubyBmb2N1cyBtYW5hZ2VtZW50IG9mXG5cdC8vIGl0cyBvd24sIHNvIGdyYWIgZm9jdXMgZm9yIHRoZSBzZWFyY2ggaW5wdXQgb25jZSB0aGUgbW91bnQgc2V0dGxlcyAoe0BhdHRhY2h9IG9uIHRoZSBpbnB1dCkuXG5cdC8vIHNldFRpbWVvdXQsIG5vdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg4oCUIHJBRiBuZXZlciBmaXJlcyBpbiBoaWRkZW4vYmFja2dyb3VuZGVkIHRhYnMuXG5cdGNvbnN0IGZvY3VzSW5wdXQgPSAobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcblx0XHRyZXR1cm4gdW50cmFjaygoKSA9PiB7XG5cdFx0XHRpZiAoIWRpYWxvZykgcmV0dXJuO1xuXHRcdFx0Y29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gKG5vZGUgYXMgSFRNTElucHV0RWxlbWVudCkuZm9jdXMoKSwgMCk7XG5cdFx0XHRyZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBUaGUgZnVsbCBjb21tYW5kIHN0YXRlIG1hY2hpbmUsIGZvciBleHRlcm5hbGx5IGRyaXZlbiBwYWxldHRlcyAoYGJpbmQ6dGhpc2ApOlxuXHQgKiBgY29tbWFuZFN0YXRlLm1vdmUoZGVsdGEpYCwgYGNvbW1hbmRTdGF0ZS5zZWxlY3RIaWdobGlnaHRlZCgpYCwgYGNvbW1hbmRTdGF0ZS5oaWdobGlnaHRlZGAsXG5cdCAqIGBjb21tYW5kU3RhdGUub3BlbigpYCwgLi4uXG5cdCAqL1xuXHRleHBvcnQgY29uc3QgY29tbWFuZFN0YXRlOiBDb21tYW5kU3RhdGU8VmFsdWU+ID0gY29tbWFuZDtcbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgb3B0aW9uUm93KGl0OiBDb21tYW5kSXRlbTxWYWx1ZT4pfVxuXHR7QGNvbnN0IGhpZ2hsaWdodGVkID0gY29tbWFuZC5oaWdobGlnaHRlZCA9PT0gaXQudmFsdWV9XG5cdHsjc25pcHBldCBzaG9ydGN1dCgpfVxuXHRcdDxzcGFuIGNsYXNzPXtjbGFzc2VzLnNob3J0Y3V0KHsgc2l6ZSwgaGlnaGxpZ2h0ZWQgfSl9PntpdC5zaG9ydGN1dH08L3NwYW4+XG5cdHsvc25pcHBldH1cblx0eyNzbmlwcGV0IGN1c3RvbVJvdygpfVxuXHRcdHtAcmVuZGVyIGl0ZW0/LihpdCl9XG5cdHsvc25pcHBldH1cblx0PE1lbnVPcHRpb25cblx0XHRhcz17aXQuaHJlZiA/ICdhJyA6ICdkaXYnfVxuXHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdGhyZWY9e2l0LmhyZWZ9XG5cdFx0e3NpemV9XG5cdFx0dGl0bGU9e2l0ZW0gPyB1bmRlZmluZWQgOiBpdC5sYWJlbH1cblx0XHRwcmVmaXg9e2l0ZW0gPyB1bmRlZmluZWQgOiBpdC5pY29ufVxuXHRcdHN1ZmZpeD17aXRlbSB8fCAhaXQuc2hvcnRjdXQgPyB1bmRlZmluZWQgOiBzaG9ydGN1dH1cblx0XHRjaGlsZHJlbj17aXRlbSA/IGN1c3RvbVJvdyA6IHVuZGVmaW5lZH1cblx0XHR7aGlnaGxpZ2h0ZWR9XG5cdFx0c2VsZWN0ZWQ9e2hpZ2hsaWdodGVkfVxuXHRcdGRpc2FibGVkPXshIWl0LmRpc2FibGVkfVxuXHRcdGNsYXNzPXtpdC5jbGFzc31cblx0XHRvbkNsaWNrPXsoKSA9PiBjb21tYW5kLnNlbGVjdChpdCl9XG5cdFx0YXR0cnM9e3tcblx0XHRcdGlkOiBjb21tYW5kLm9wdGlvbklkKGl0LnZhbHVlKSxcblx0XHRcdCdkYXRhLXZhbHVlJzogaXQudmFsdWUsXG5cdFx0XHR0YWJpbmRleDogLTEsXG5cdFx0XHRvbnBvaW50ZXJtb3ZlOiAoKSA9PiB7XG5cdFx0XHRcdGlmICghaXQuZGlzYWJsZWQpIGNvbW1hbmQuc2V0SGlnaGxpZ2h0ZWQoaXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH19XG5cdC8+XG57L3NuaXBwZXR9XG5cbnsjc25pcHBldCBjb21tYW5kQm94KCl9XG5cdDxkaXYgY2xhc3M9e2NsYXNzZXMucm9vdCh7IHNpemUsIGNsYXNzTmFtZSB9KX0gey4uLmF0dGFjaG1lbnRzfT5cblx0XHR7I2lmIHNob3dJbnB1dH1cblx0XHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMuaW5wdXRXcmFwcGVyKHsgc2l6ZSB9KX0+XG5cdFx0XHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMuaW5wdXRHcm91cCh7IHNpemUgfSl9PlxuXHRcdFx0XHRcdHtAcmVuZGVyIG1hZ25pZnlpbmdHbGFzc0ljb24oeyBjbGFzczogY2xhc3Nlcy5pbnB1dEljb24oeyBzaXplIH0pIH0pfVxuXHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0e0BhdHRhY2ggZm9jdXNJbnB1dH1cblx0XHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLmlucHV0KHsgc2l6ZSB9KX1cblx0XHRcdFx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRcdFx0XHRcdHJvbGU9XCJjb21ib2JveFwiXG5cdFx0XHRcdFx0XHRhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuXHRcdFx0XHRcdFx0YXJpYS1leHBhbmRlZD1cInRydWVcIlxuXHRcdFx0XHRcdFx0YXJpYS1jb250cm9scz17Y29tbWFuZC5saXN0SWR9XG5cdFx0XHRcdFx0XHRhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2NvbW1hbmQuaGlnaGxpZ2h0ZWQgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQ/IGNvbW1hbmQub3B0aW9uSWQoY29tbWFuZC5oaWdobGlnaHRlZClcblx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0XHRhdXRvY29tcGxldGU9XCJvZmZcIlxuXHRcdFx0XHRcdFx0YXV0b2NvcnJlY3Q9XCJvZmZcIlxuXHRcdFx0XHRcdFx0YXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuXHRcdFx0XHRcdFx0c3BlbGxjaGVjaz1cImZhbHNlXCJcblx0XHRcdFx0XHRcdHtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHRcdHZhbHVlPXtzZWFyY2h9XG5cdFx0XHRcdFx0XHRvbmlucHV0PXsoZXZlbnQpID0+IGNvbW1hbmQuc2V0U2VhcmNoKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuXHRcdFx0XHRcdFx0b25rZXlkb3duPXtjb21tYW5kLm9uS2V5ZG93bn1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cblx0XHQ8ZGl2IGlkPXtjb21tYW5kLmxpc3RJZH0gcm9sZT1cImxpc3Rib3hcIiBhcmlhLWxhYmVsPVwiQ29tbWFuZHNcIiBjbGFzcz17Y2xhc3Nlcy5saXN0KHsgc2l6ZSB9KX0+XG5cdFx0XHR7I2lmIGNvbW1hbmQuaXNFbXB0eX1cblx0XHRcdFx0PFNsb3QgcmVuZGVyPXtlbXB0eX0gY2xhc3M9e2NsYXNzZXMuZW1wdHkoeyBzaXplIH0pfSBwYXlsb2FkPXtzbG90UGF5bG9hZH0gLz5cblx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0eyNlYWNoIGNvbW1hbmQudmlzaWJsZUdyb3VwcyBhcyBncm91cCwgZ3JvdXBJbmRleCAoZ3JvdXBJbmRleCl9XG5cdFx0XHRcdFx0eyNpZiBncm91cEluZGV4ID4gMH1cblx0XHRcdFx0XHRcdDxkaXYgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzPXtjbGFzc2VzLnNlcGFyYXRvcih7IHNpemUgfSl9PjwvZGl2PlxuXHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0cm9sZT1cImdyb3VwXCJcblx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9e2dyb3VwLmhlYWRpbmd9XG5cdFx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5ncm91cCh7IHNpemUsIGNsYXNzOiBncm91cC5jbGFzcyB9KX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7I2lmIGdyb3VwLmhlYWRpbmd9XG5cdFx0XHRcdFx0XHRcdDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3M9e2NsYXNzZXMuZ3JvdXBIZWFkaW5nKHsgc2l6ZSB9KX0+XG5cdFx0XHRcdFx0XHRcdFx0e2dyb3VwLmhlYWRpbmd9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0XHRcdHsjZWFjaCBncm91cC5pdGVtcyBhcyBpdCAoaXQudmFsdWUpfVxuXHRcdFx0XHRcdFx0XHR7QHJlbmRlciBvcHRpb25Sb3coaXQpfVxuXHRcdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7L2VhY2h9XG5cdFx0XHR7L2lmfVxuXHRcdDwvZGl2PlxuXG5cdFx0PFNsb3QgcmVuZGVyPXtmb290ZXJ9IGNsYXNzPXtjbGFzc2VzLmZvb3Rlcih7IHNpemUgfSl9IHBheWxvYWQ9e3Nsb3RQYXlsb2FkfSAvPlxuXHQ8L2Rpdj5cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IGRpYWxvZ1RyaWdnZXIoKX1cblx0PFNsb3Rcblx0XHRhcz1cInNwYW5cIlxuXHRcdHJlbmRlcj17dHJpZ2dlcn1cblx0XHRwYXlsb2FkPXtzbG90UGF5bG9hZH1cblx0XHRjbGFzcz17Y2xhc3Nlcy50cmlnZ2VyKCl9XG5cdFx0e0BhdHRhY2ggY29tbWFuZC50cmlnZ2VyfVxuXHQvPlxuey9zbmlwcGV0fVxuXG57I2lmIGRpYWxvZ31cblx0PERpYWxvZ1xuXHRcdGJpbmQ6b3BlblxuXHRcdHR5cGU9XCJtb2RhbFwiXG5cdFx0e3RpdGxlfVxuXHRcdHRoZW1lPXtkaWFsb2dUaGVtZX1cblx0XHR0cmlnZ2VyPXt0cmlnZ2VyID8gZGlhbG9nVHJpZ2dlciA6IHVuZGVmaW5lZH1cblx0PlxuXHRcdHtAcmVuZGVyIGNvbW1hbmRCb3goKX1cblx0PC9EaWFsb2c+XG57OmVsc2V9XG5cdHtAcmVuZGVyIGNvbW1hbmRCb3goKX1cbnsvaWZ9XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0NvbW1hbmQvQ29tbWFuZC5zdmVsdGUifQ==