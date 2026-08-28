import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Dialog/Dialog.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Dialog[$.FILENAME] = 'src/lib/components/Dialog/Dialog.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { useDialogTheme } from "/src/lib/components/Dialog/dialog.theme.ts";
import { DialogState } from "/src/lib/components/Dialog/dialog.state.svelte.ts";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { xIcon } from "/src/lib/components/Icons/x.ts";
import Button from "/src/lib/components/Button/Button.svelte";
import { fso } from "/src/lib/transitions/transition.ts";
import { portal } from "/src/lib/attachments/portal.ts";

var root = $.add_locations($.from_html(`<div aria-hidden="true" data-drag-handle=""></div>`), Dialog[$.FILENAME], [[144, 6]]);
var root_1 = $.add_locations($.from_html(`<!> <!> <!>`, 1), Dialog[$.FILENAME], []);
var root_2 = $.add_locations($.from_html(`<div role="dialog" aria-modal="true"><div><div><div class="flex flex-col will-change-[opacity] transition-opacity duration-200 ease-out"><!> <!> <!> <!> <!></div></div></div></div>`), Dialog[$.FILENAME], [[103, 1, [[117, 2, [[118, 3, [[139, 4]]]]]]]]);
var root_3 = $.add_locations($.from_html(`<!> <!>`, 1), Dialog[$.FILENAME], []);

function Dialog($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Dialog);

	const CLOSE_BUTTON = $.wrap_snippet(Dialog, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		{
			let $0 = $.derived(() => $.get(classes).closeButton({ size: dialog.computedSize }));

			$.add_svelte_meta(
				() => Slot(node, {
					get class() {
						return $.get($0);
					},

					get render() {
						return $$props.closeButton;
					},

					children: $.wrap_snippet(Dialog, ($$anchor, $$slotProps) => {
						var fragment_1 = $.comment();
						var node_1 = $.first_child(fragment_1);

						{
							let $0 = $.derived(() => $.get(classes).closeButton({ size: dialog.computedSize }));

							$.add_svelte_meta(
								() => Button(node_1, {
									squared: true,
									get class() {
										return $.get($0);
									},
									size: 'small',
									variant: 'ghost',
									onClick: () => dialog.close(),
									children: $.wrap_snippet(Dialog, ($$anchor, $$slotProps) => {
										$.add_svelte_meta(() => xIcon($$anchor, () => ({ size: 20 })), 'render', Dialog, 97, 3);
									}),
									$$slots: { default: true }
								}),
								'component',
								Dialog,
								90,
								2,
								{ componentTag: 'Button' }
							);
						}

						$.append($$anchor, fragment_1);
					}),
					$$slots: { default: true }
				}),
				'component',
				Dialog,
				89,
				1,
				{ componentTag: 'Slot' }
			);
		}

		$.append($$anchor, fragment);
	});

	let open = $.prop($$props, 'open', 15, false),
		closeOnEscape = $.prop($$props, 'closeOnEscape', 3, true),
		closeOnClickOutside = $.prop($$props, 'closeOnClickOutside', 3, true),
		closable = $.prop($$props, 'closable', 3, true),
		thumb = $.prop($$props, 'thumb', 3, true);

	const dialog = new DialogState({
		id: $$props.id || id,
		get type() {
			return $$props.type;
		},

		get responsive() {
			return $$props.responsive;
		},

		get isOpen() {
			return open();
		},

		set isOpen(value) {
			open(value);
		},

		get size() {
			return $$props.size;
		},

		get scroll() {
			return $$props.scroll;
		},

		get transition() {
			return $$props.transition;
		},

		get closeOnEscape() {
			return closeOnEscape();
		},

		get closeOnClickOutside() {
			return closeOnClickOutside();
		},

		get closable() {
			return closable();
		},

		get swipeToDismiss() {
			return $$props.swipeToDismiss;
		},

		get swipeFrom() {
			return $$props.swipeFrom;
		},
		onClose: $$props.onClose,
		onOpen: $$props.onOpen
	});

	const classes = $.tag($.derived(() => useDialogTheme($$props.theme)), 'classes');
	const hasHeader = $.tag($.derived(() => !!($$props.title || $$props.description)), 'hasHeader');
	const in_out = fso();
	var $$exports = { ...$.legacy_api() };
	var fragment_3 = root_3();
	var node_2 = $.first_child(fragment_3);

	{
		var consequent_3 = ($$anchor) => {
			var div = root_2();
			let styles;
			var div_1 = $.child(div);
			var div_2 = $.child(div_1);
			let styles_1;
			var div_3 = $.child(div_2);
			let styles_2;
			var node_3 = $.child(div_3);

			{
				var consequent = ($$anchor) => {
					var div_4 = root();

					$.template_effect(($0) => $.set_class(div_4, 1, $0), [
						() => $.clsx($.get(classes).thumb({ type: dialog.computedType }))
					]);

					$.append($$anchor, div_4);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if (thumb() && dialog.swipeEnabled) $$render(consequent);
					}),
					'if',
					Dialog,
					143,
					5
				);
			}

			var node_4 = $.sibling(node_3, 2);

			{
				let $0 = $.derived(() => dialog.swipeEnabled ? { 'data-drag-handle': true } : undefined);

				let $1 = $.derived(() => $.get(classes).header({
					size: dialog.computedSize,
					className: dialog.swipeEnabled ? 'touch-none' : undefined
				}));

				$.add_svelte_meta(
					() => Slot(node_4, {
						as: 'header',
						get render() {
							return $$props.header;
						},

						get attrs() {
							return $.get($0);
						},

						get class() {
							return $.get($1);
						},

						get renderIf() {
							return $.get(hasHeader);
						},

						children: $.wrap_snippet(Dialog, ($$anchor, $$slotProps) => {
							var fragment_4 = root_1();
							var node_5 = $.first_child(fragment_4);

							{
								let $0 = $.derived(() => ({ id: `${dialog.id}-label` }));
								let $1 = $.derived(() => $.get(classes).title({ size: dialog.computedSize }));

								$.add_svelte_meta(
									() => Slot(node_5, {
										get attrs() {
											return $.get($0);
										},

										get class() {
											return $.get($1);
										},

										get render() {
											return $$props.title;
										}
									}),
									'component',
									Dialog,
									162,
									6,
									{ componentTag: 'Slot' }
								);
							}

							var node_6 = $.sibling(node_5, 2);

							{
								let $0 = $.derived(() => $.get(classes).description({ size: dialog.computedSize }));

								$.add_svelte_meta(
									() => Slot(node_6, {
										get class() {
											return $.get($0);
										},

										get render() {
											return $$props.description;
										}
									}),
									'component',
									Dialog,
									167,
									6,
									{ componentTag: 'Slot' }
								);
							}

							var node_7 = $.sibling(node_6, 2);

							{
								var consequent_1 = ($$anchor) => {
									$.add_svelte_meta(() => CLOSE_BUTTON($$anchor), 'render', Dialog, 169, 7);
								};

								$.add_svelte_meta(
									() => $.if(node_7, ($$render) => {
										if (closable()) $$render(consequent_1);
									}),
									'if',
									Dialog,
									168,
									6
								);
							}

							$.append($$anchor, fragment_4);
						}),
						$$slots: { default: true }
					}),
					'component',
					Dialog,
					150,
					5,
					{ componentTag: 'Slot' }
				);
			}

			var node_8 = $.sibling(node_4, 2);

			{
				var consequent_2 = ($$anchor) => {
					$.add_svelte_meta(() => CLOSE_BUTTON($$anchor), 'render', Dialog, 173, 6);
				};

				$.add_svelte_meta(
					() => $.if(node_8, ($$render) => {
						if (!$.get(hasHeader)) $$render(consequent_2);
					}),
					'if',
					Dialog,
					172,
					5
				);
			}

			var node_9 = $.sibling(node_8, 2);

			$.add_svelte_meta(() => $.snippet(node_9, () => $$props.children ?? $.noop, () => dialog), 'render', Dialog, 175, 5);

			var node_10 = $.sibling(node_9, 2);

			{
				let $0 = $.derived(() => $.get(classes).footer({ size: dialog.computedSize }));

				$.add_svelte_meta(
					() => Slot(node_10, {
						get render() {
							return $$props.footer;
						},

						get class() {
							return $.get($0);
						}
					}),
					'component',
					Dialog,
					176,
					5,
					{ componentTag: 'Slot' }
				);
			}

			$.reset(div_3);
			$.reset(div_2);
			$.attach(div_2, () => dialog.contentAttachment);
			$.reset(div_1);
			$.reset(div);
			$.attach(div, portal);

			$.template_effect(
				($0, $1, $2) => {
					$.set_attribute(div, 'id', dialog.id);
					$.set_attribute(div, 'aria-labelledby', $$props.title ? `${dialog.id}-label` : undefined);
					$.set_class(div, 1, $0);
					$.set_attribute(div, 'data-type', dialog.type);
					$.set_attribute(div, 'data-size', $$props.size);
					styles = $.set_style(div, '', styles, { 'z-index': dialog.zIndex });
					$.set_class(div_1, 1, $1);
					$.set_attribute(div_2, 'data-type', dialog.type);
					$.set_class(div_2, 1, $2);

					styles_1 = $.set_style(div_2, '', styles_1, {
						transform: dialog.contentTransform,
						transition: dialog.dragging ? 'none' : undefined
					});

					styles_2 = $.set_style(div_3, '', styles_2, { opacity: dialog.stackOpacity });
				},
				[
					() => $.clsx($.get(classes).root({ scroll: dialog.computedScroll, className: $$props.class })),
					() => $.clsx($.get(classes).align({ type: dialog.computedType, scroll: dialog.computedScroll })),
					() => $.clsx($.get(classes).content({
						size: dialog.computedSize,
						type: dialog.computedType,
						scroll: dialog.computedScroll
					}))
				]
			);

			$.event('introend', div_2, function introend() {
				dialog.hasTransitioned = true;
				$$props.onOpen?.(dialog);
			});

			$.event('outrostart', div_2, function outrostart() {
				dialog.hasTransitioned = false;
			});

			$.event('outroend', div_2, function outroend() {
				return $$props.onClose?.(dialog);
			});

			$.transition(1, div_2, () => in_out, () => dialog.computedTransition.in);
			$.transition(2, div_2, () => in_out, () => dialog.computedTransition.out);
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node_2, ($$render) => {
				if (dialog.isOpen) $$render(consequent_3);
			}),
			'if',
			Dialog,
			102,
			0
		);
	}

	var node_11 = $.sibling(node_2, 2);

	{
		var consequent_5 = ($$anchor) => {
			var fragment_7 = $.comment();
			var node_12 = $.first_child(fragment_7);

			{
				var consequent_4 = ($$anchor) => {
					var fragment_8 = $.comment();
					var node_13 = $.first_child(fragment_8);

					$.add_svelte_meta(() => $.snippet(node_13, () => $$props.trigger ?? $.noop, () => dialog), 'render', Dialog, 184, 2);
					$.append($$anchor, fragment_8);
				};

				var alternate = ($$anchor) => {
					var fragment_9 = $.comment();
					var node_14 = $.first_child(fragment_9);

					$.add_svelte_meta(
						() => Button(node_14, $.spread_props(() => $$props.trigger, {
							onClick: () => dialog.open(),
							children: $.wrap_snippet(Dialog, ($$anchor, $$slotProps) => {
								$.next();

								var text = $.text();

								$.template_effect(() => $.set_text(text, $$props.trigger.content));
								$.append($$anchor, text);
							}),
							$$slots: { default: true }
						})),
						'component',
						Dialog,
						186,
						2,
						{ componentTag: 'Button' }
					);

					$.append($$anchor, fragment_9);
				};

				$.add_svelte_meta(
					() => $.if(node_12, ($$render) => {
						if ($.strict_equals(typeof $$props.trigger, 'function')) $$render(consequent_4); else $$render(alternate, -1);
					}),
					'if',
					Dialog,
					183,
					1
				);
			}

			$.append($$anchor, fragment_7);
		};

		$.add_svelte_meta(
			() => $.if(node_11, ($$render) => {
				if ($$props.trigger) $$render(consequent_5);
			}),
			'if',
			Dialog,
			182,
			0
		);
	}

	$.append($$anchor, fragment_3);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Dialog = $.hmr(Dialog);

	import.meta.hot.acceptExports(["default"],(module) => {
		Dialog[$.HMR].update(module.default);
	});
}

export default Dialog;
//# sourceMappingURL=data:application/json;base64,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QixNQUFNLEVBQUUsTUFBTSxDQUFDOzs7Ozt1QkFsQmhCLDJCQU9rQjtJQUNqQixNQUFNLENBQUMsZUFBZSxHQUFHLElBQUk7cUJBQ3BCLE1BQU07R0FDaEIsQ0FBQzs7eUJBVkQsNkJBV29CO0lBQ25CLE1BQU0sQ0FBQyxlQUFlLEdBQUcsS0FBSztHQUMvQixDQUFDOzt1QkFiRDs2QkFjNEIsTUFBTTs7O21CQWRsQywyQkFLVyxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRTttQkFMdkMsMkJBTVksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUc7c0JBckIzQzs7Ozs7UUFERyxNQUFNLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VGQWtGRyxNQUFNOzs7Ozs7Ozs7WUFFeEIsTUFBTTtzQkFBNkIsTUFBTSxDQUFDLElBQUk7Ozs7OztpRUFBYSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OztrREFINUMsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFqRzNCIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJEaWFsb2cuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCB0eXBlIHsgRGlhbG9nUHJvcHMgfSBmcm9tICcuL2RpYWxvZy5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZURpYWxvZ1RoZW1lIH0gZnJvbSAnLi9kaWFsb2cudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBEaWFsb2dTdGF0ZSB9IGZyb20gJy4vZGlhbG9nLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCBTbG90IGZyb20gJy4uL1Nsb3QvU2xvdC5zdmVsdGUnO1xuXHRpbXBvcnQgeyB4SWNvbiB9IGZyb20gJy4uL0ljb25zL3guanMnO1xuXHRpbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbi9CdXR0b24uc3ZlbHRlJztcblx0aW1wb3J0IHsgZnNvIH0gZnJvbSAnJGxpYi90cmFuc2l0aW9ucy90cmFuc2l0aW9uLmpzJztcblx0aW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAnJGxpYi9hdHRhY2htZW50cy9wb3J0YWwuanMnO1xuXG5cdGxldCB7XG5cdFx0aWQ6IGN1c3RvbUlkLFxuXHRcdHR5cGUsXG5cdFx0cmVzcG9uc2l2ZSxcblx0XHRvcGVuID0gJGJpbmRhYmxlKGZhbHNlKSxcblx0XHRvbkNsb3NlLFxuXHRcdG9uT3Blbixcblx0XHRzaXplLFxuXHRcdHNjcm9sbCxcblx0XHR0cmFuc2l0aW9uLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGNsb3NlT25Fc2NhcGUgPSB0cnVlLFxuXHRcdGNsb3NlT25DbGlja091dHNpZGUgPSB0cnVlLFxuXHRcdGNsb3NhYmxlID0gdHJ1ZSxcblx0XHRzd2lwZVRvRGlzbWlzcyxcblx0XHRzd2lwZUZyb20sXG5cdFx0dGh1bWIgPSB0cnVlLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0aGVhZGVyLFxuXHRcdGZvb3Rlcixcblx0XHR0aXRsZSxcblx0XHRkZXNjcmlwdGlvbixcblx0XHRjbG9zZUJ1dHRvbixcblx0XHR0cmlnZ2VyLFxuXHRcdHRoZW1lXG5cdH06IERpYWxvZ1Byb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgaWQgPSAkcHJvcHMuaWQoKTtcblx0Y29uc3QgZGlhbG9nID0gbmV3IERpYWxvZ1N0YXRlKHtcblx0XHRpZDogY3VzdG9tSWQgfHwgaWQsXG5cdFx0Z2V0IHR5cGUoKSB7XG5cdFx0XHRyZXR1cm4gdHlwZTtcblx0XHR9LFxuXHRcdGdldCByZXNwb25zaXZlKCkge1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNpdmU7XG5cdFx0fSxcblx0XHRnZXQgaXNPcGVuKCkge1xuXHRcdFx0cmV0dXJuIG9wZW47XG5cdFx0fSxcblx0XHRzZXQgaXNPcGVuKHZhbHVlKSB7XG5cdFx0XHRvcGVuID0gdmFsdWU7XG5cdFx0fSxcblx0XHRnZXQgc2l6ZSgpIHtcblx0XHRcdHJldHVybiBzaXplO1xuXHRcdH0sXG5cdFx0Z2V0IHNjcm9sbCgpIHtcblx0XHRcdHJldHVybiBzY3JvbGw7XG5cdFx0fSxcblx0XHRnZXQgdHJhbnNpdGlvbigpIHtcblx0XHRcdHJldHVybiB0cmFuc2l0aW9uO1xuXHRcdH0sXG5cdFx0Z2V0IGNsb3NlT25Fc2NhcGUoKSB7XG5cdFx0XHRyZXR1cm4gY2xvc2VPbkVzY2FwZTtcblx0XHR9LFxuXHRcdGdldCBjbG9zZU9uQ2xpY2tPdXRzaWRlKCkge1xuXHRcdFx0cmV0dXJuIGNsb3NlT25DbGlja091dHNpZGU7XG5cdFx0fSxcblx0XHRnZXQgY2xvc2FibGUoKSB7XG5cdFx0XHRyZXR1cm4gY2xvc2FibGU7XG5cdFx0fSxcblx0XHRnZXQgc3dpcGVUb0Rpc21pc3MoKSB7XG5cdFx0XHRyZXR1cm4gc3dpcGVUb0Rpc21pc3M7XG5cdFx0fSxcblx0XHRnZXQgc3dpcGVGcm9tKCkge1xuXHRcdFx0cmV0dXJuIHN3aXBlRnJvbTtcblx0XHR9LFxuXHRcdG9uQ2xvc2UsXG5cdFx0b25PcGVuXG5cdH0pO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VEaWFsb2dUaGVtZSh0aGVtZSkpO1xuXG5cdGNvbnN0IGhhc0hlYWRlciA9ICRkZXJpdmVkKCEhKHRpdGxlIHx8IGRlc2NyaXB0aW9uKSk7XG5cblx0Y29uc3QgaW5fb3V0ID0gZnNvKCk7XG48L3NjcmlwdD5cblxueyNzbmlwcGV0IENMT1NFX0JVVFRPTigpfVxuXHQ8U2xvdCBjbGFzcz17Y2xhc3Nlcy5jbG9zZUJ1dHRvbih7IHNpemU6IGRpYWxvZy5jb21wdXRlZFNpemUgfSl9IHJlbmRlcj17Y2xvc2VCdXR0b259PlxuXHRcdDxCdXR0b25cblx0XHRcdHNxdWFyZWRcblx0XHRcdGNsYXNzPXtjbGFzc2VzLmNsb3NlQnV0dG9uKHsgc2l6ZTogZGlhbG9nLmNvbXB1dGVkU2l6ZSB9KX1cblx0XHRcdHNpemU9XCJzbWFsbFwiXG5cdFx0XHR2YXJpYW50PVwiZ2hvc3RcIlxuXHRcdFx0b25DbGljaz17KCkgPT4gZGlhbG9nLmNsb3NlKCl9XG5cdFx0PlxuXHRcdFx0e0ByZW5kZXIgeEljb24oeyBzaXplOiAyMCB9KX1cblx0XHQ8L0J1dHRvbj5cblx0PC9TbG90Plxuey9zbmlwcGV0fVxuXG57I2lmIGRpYWxvZy5pc09wZW59XG5cdDxkaXZcblx0XHR7QGF0dGFjaCBwb3J0YWwoKX1cblx0XHRpZD17ZGlhbG9nLmlkfVxuXHRcdHJvbGU9XCJkaWFsb2dcIlxuXHRcdGFyaWEtbW9kYWw9XCJ0cnVlXCJcblx0XHRhcmlhLWxhYmVsbGVkYnk9e3RpdGxlID8gYCR7ZGlhbG9nLmlkfS1sYWJlbGAgOiB1bmRlZmluZWR9XG5cdFx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7XG5cdFx0XHRzY3JvbGw6IGRpYWxvZy5jb21wdXRlZFNjcm9sbCxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdH0pfVxuXHRcdGRhdGEtdHlwZT17ZGlhbG9nLnR5cGV9XG5cdFx0ZGF0YS1zaXplPXtzaXplfVxuXHRcdHN0eWxlOnotaW5kZXg9e2RpYWxvZy56SW5kZXh9XG5cdD5cblx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLmFsaWduKHsgdHlwZTogZGlhbG9nLmNvbXB1dGVkVHlwZSwgc2Nyb2xsOiBkaWFsb2cuY29tcHV0ZWRTY3JvbGwgfSl9PlxuXHRcdFx0PGRpdlxuXHRcdFx0XHR7QGF0dGFjaCBkaWFsb2cuY29udGVudEF0dGFjaG1lbnR9XG5cdFx0XHRcdGRhdGEtdHlwZT17ZGlhbG9nLnR5cGV9XG5cdFx0XHRcdHN0eWxlOnRyYW5zZm9ybT17ZGlhbG9nLmNvbnRlbnRUcmFuc2Zvcm19XG5cdFx0XHRcdHN0eWxlOnRyYW5zaXRpb249e2RpYWxvZy5kcmFnZ2luZyA/ICdub25lJyA6IHVuZGVmaW5lZH1cblx0XHRcdFx0aW46aW5fb3V0PXtkaWFsb2cuY29tcHV0ZWRUcmFuc2l0aW9uLmlufVxuXHRcdFx0XHRvdXQ6aW5fb3V0PXtkaWFsb2cuY29tcHV0ZWRUcmFuc2l0aW9uLm91dH1cblx0XHRcdFx0b25pbnRyb2VuZD17KCkgPT4ge1xuXHRcdFx0XHRcdGRpYWxvZy5oYXNUcmFuc2l0aW9uZWQgPSB0cnVlO1xuXHRcdFx0XHRcdG9uT3Blbj8uKGRpYWxvZyk7XG5cdFx0XHRcdH19XG5cdFx0XHRcdG9ub3V0cm9zdGFydD17KCkgPT4ge1xuXHRcdFx0XHRcdGRpYWxvZy5oYXNUcmFuc2l0aW9uZWQgPSBmYWxzZTtcblx0XHRcdFx0fX1cblx0XHRcdFx0b25vdXRyb2VuZD17KCkgPT4gb25DbG9zZT8uKGRpYWxvZyl9XG5cdFx0XHRcdGNsYXNzPXtjbGFzc2VzLmNvbnRlbnQoe1xuXHRcdFx0XHRcdHNpemU6IGRpYWxvZy5jb21wdXRlZFNpemUsXG5cdFx0XHRcdFx0dHlwZTogZGlhbG9nLmNvbXB1dGVkVHlwZSxcblx0XHRcdFx0XHRzY3JvbGw6IGRpYWxvZy5jb21wdXRlZFNjcm9sbFxuXHRcdFx0XHR9KX1cblx0XHRcdD5cblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdGNsYXNzPVwiZmxleCBmbGV4LWNvbCB3aWxsLWNoYW5nZS1bb3BhY2l0eV0gdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTIwMCBlYXNlLW91dFwiXG5cdFx0XHRcdFx0c3R5bGU6b3BhY2l0eT17ZGlhbG9nLnN0YWNrT3BhY2l0eX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHsjaWYgdGh1bWIgJiYgZGlhbG9nLnN3aXBlRW5hYmxlZH1cblx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0ZGF0YS1kcmFnLWhhbmRsZVxuXHRcdFx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy50aHVtYih7IHR5cGU6IGRpYWxvZy5jb21wdXRlZFR5cGUgfSl9XG5cdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0XHQ8U2xvdFxuXHRcdFx0XHRcdFx0YXM9XCJoZWFkZXJcIlxuXHRcdFx0XHRcdFx0cmVuZGVyPXtoZWFkZXJ9XG5cdFx0XHRcdFx0XHRhdHRycz17ZGlhbG9nLnN3aXBlRW5hYmxlZCA/IHsgJ2RhdGEtZHJhZy1oYW5kbGUnOiB0cnVlIH0gOiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5oZWFkZXIoe1xuXHRcdFx0XHRcdFx0XHRzaXplOiBkaWFsb2cuY29tcHV0ZWRTaXplLFxuXHRcdFx0XHRcdFx0XHQvLyBUaGUgaGVhZGVyIGRvdWJsZXMgYXMgdGhlIGRyYWcgaGFuZGxlIG9uIHRvdWNoLCB3aGVyZSBhIHNjcm9sbGFibGUgYm9keVxuXHRcdFx0XHRcdFx0XHQvLyB3b3VsZCBvdGhlcndpc2UgbGV0IHRoZSBicm93c2VyIGNsYWltIHRoZSBwYW4gYmVmb3JlIHdlIGNhbi5cblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBkaWFsb2cuc3dpcGVFbmFibGVkID8gJ3RvdWNoLW5vbmUnIDogdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHRcdHJlbmRlcklmPXtoYXNIZWFkZXJ9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PFNsb3Rcblx0XHRcdFx0XHRcdFx0YXR0cnM9e3sgaWQ6IGAke2RpYWxvZy5pZH0tbGFiZWxgIH19XG5cdFx0XHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnRpdGxlKHsgc2l6ZTogZGlhbG9nLmNvbXB1dGVkU2l6ZSB9KX1cblx0XHRcdFx0XHRcdFx0cmVuZGVyPXt0aXRsZX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8U2xvdCBjbGFzcz17Y2xhc3Nlcy5kZXNjcmlwdGlvbih7IHNpemU6IGRpYWxvZy5jb21wdXRlZFNpemUgfSl9IHJlbmRlcj17ZGVzY3JpcHRpb259IC8+XG5cdFx0XHRcdFx0XHR7I2lmIGNsb3NhYmxlfVxuXHRcdFx0XHRcdFx0XHR7QHJlbmRlciBDTE9TRV9CVVRUT04oKX1cblx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0PC9TbG90PlxuXHRcdFx0XHRcdHsjaWYgIWhhc0hlYWRlcn1cblx0XHRcdFx0XHRcdHtAcmVuZGVyIENMT1NFX0JVVFRPTigpfVxuXHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4/LihkaWFsb2cpfVxuXHRcdFx0XHRcdDxTbG90IHJlbmRlcj17Zm9vdGVyfSBjbGFzcz17Y2xhc3Nlcy5mb290ZXIoeyBzaXplOiBkaWFsb2cuY29tcHV0ZWRTaXplIH0pfSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbnsvaWZ9XG57I2lmIHRyaWdnZXJ9XG5cdHsjaWYgdHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbid9XG5cdFx0e0ByZW5kZXIgdHJpZ2dlcj8uKGRpYWxvZyl9XG5cdHs6ZWxzZX1cblx0XHQ8QnV0dG9uIHsuLi50cmlnZ2VyfSBvbkNsaWNrPXsoKSA9PiBkaWFsb2cub3BlbigpfT57dHJpZ2dlci5jb250ZW50fTwvQnV0dG9uPlxuXHR7L2lmfVxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvRGlhbG9nL0RpYWxvZy5zdmVsdGUifQ==