import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Popover/Popover.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Popover[$.FILENAME] = 'src/lib/components/Popover/Popover.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { usePopoverTheme } from "/src/lib/components/Popover/popover.theme.ts";
import { PopoverState } from "/src/lib/components/Popover/popover.state.svelte.ts";
import Button from "/src/lib/components/Button/Button.svelte";
import Dialog from "/src/lib/components/Dialog/Dialog.svelte";
import { fso } from "/src/lib/transitions/transition.ts";
import { portal } from "/src/lib/attachments/portal.ts";
import { transitionSize } from "/src/lib/attachments/transitionSize.ts";

const emptyCloseButton = $.wrap_snippet(Popover, function ($$anchor) {
	$.validate_snippet_args(...arguments);
});

var root = $.add_locations($.from_html(`<div><!></div>`), Popover[$.FILENAME], [[153, 2]]);
var root_1 = $.add_locations($.from_html(`<dialog><div><!></div></dialog>`), Popover[$.FILENAME], [[158, 1, [[167, 2]]]]);
var root_2 = $.add_locations($.from_html(`<!> <!>`, 1), Popover[$.FILENAME], []);

function Popover($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Popover);

	var $$ownership_validator = $.create_ownership_validator($$props);

	let open = $.prop($$props, 'open', 15, false),
		openOnHover = $.prop($$props, 'openOnHover', 3, false),
		openOnClick = $.prop($$props, 'openOnClick', 3, true),
		hoverDelay = $.prop($$props, 'hoverDelay', 3, 100),
		closeOnEscape = $.prop($$props, 'closeOnEscape', 3, true),
		closeOnClickOutside = $.prop($$props, 'closeOnClickOutside', 3, true),
		closeOnMouseLeave = $.prop($$props, 'closeOnMouseLeave', 3, false),
		debugSafeArea = $.prop($$props, 'debugSafeArea', 3, false),
		directedTransition = $.prop($$props, 'directedTransition', 3, true),
		lockScroll = $.prop($$props, 'lockScroll', 3, true),
		fitTrigger = $.prop($$props, 'fitTrigger', 3, false),
		mobileSheet = $.prop($$props, 'mobileSheet', 3, false),
		mobileSheetSizeTransition = $.prop($$props, 'mobileSheetSizeTransition', 3, true);

	const popover = new PopoverState({
		get id() {
			return $$props.id || id;
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

		get transition() {
			return $$props.transition;
		},

		get directedTransition() {
			return directedTransition();
		},

		get position() {
			return $$props.position;
		},

		get offset() {
			return $$props.offset;
		},

		get externalRef() {
			return $$props.ref;
		},

		get fitTrigger() {
			return fitTrigger();
		},

		get mobileSheet() {
			return mobileSheet();
		},

		get closeOnEscape() {
			return closeOnEscape();
		},

		get lockScroll() {
			return lockScroll();
		},

		get closeOnMouseLeave() {
			return closeOnMouseLeave();
		},

		get debugSafeArea() {
			return debugSafeArea();
		},

		get closeOnClickOutside() {
			return closeOnClickOutside();
		},

		get openOnHover() {
			return openOnHover();
		},

		get hoverDelay() {
			return hoverDelay();
		},

		get openOnClick() {
			return openOnClick();
		},

		get onClose() {
			return $$props.onClose;
		},

		get onOpen() {
			return $$props.onOpen;
		}
	});

	const classes = $.tag($.derived(() => usePopoverTheme($$props.theme)), 'classes');
	const in_out = fso();
	const visible = $.tag($.derived(() => popover.isOpen && (popover.isMobileSheet || popover.referenceElement || popover.externalRef)), 'visible');

	const mobileSheetDialogTheme = $.tag(
		$.derived(() => ({
			content: {
				base: $.get(classes).popover({
					size: popover.computedSize,
					mode: 'mobileSheet',
					className: $$props.class
				})
			},
			closeButton: { base: 'hidden' }
		})),
		'mobileSheetDialogTheme'
	);

	var $$exports = { ...$.legacy_api() };
	var fragment = root_2();
	var node = $.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			{
				let $0 = $.derived(() => closeOnEscape() || closeOnClickOutside());

				$$ownership_validator.binding('open', Dialog, open);

				$.add_svelte_meta(
					() => Dialog(node_1, {
						get id() {
							return popover.id;
						},
						type: 'drawerBottom',
						responsive: false,
						get size() {
							return $$props.size;
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
							return $.get($0);
						},

						get swipeToDismiss() {
							return closeOnClickOutside();
						},
						thumb: false,
						get closeButton() {
							return emptyCloseButton;
						},

						get theme() {
							return $.get(mobileSheetDialogTheme);
						},

						onOpen: () => {
							popover.hasTransitioned = true;
							$$props.onOpen?.(popover);
						},

						onClose: () => {
							popover.hasTransitioned = false;
							$$props.onClose?.(popover);
						},

						get open() {
							return open();
						},

						set open($$value) {
							open($$value);
						},

						children: $.wrap_snippet(Popover, ($$anchor, $$slotProps) => {
							var div = root();
							var node_2 = $.child(div);

							$.add_svelte_meta(() => $.snippet(node_2, () => $$props.children ?? $.noop, () => popover), 'render', Popover, 154, 3);
							$.reset(div);
							$.attach(div, () => transitionSize({ isActive: () => mobileSheetSizeTransition() }));
							$.append($$anchor, div);
						}),
						$$slots: { default: true }
					}),
					'component',
					Popover,
					130,
					1,
					{ componentTag: 'Dialog' }
				);
			}

			$.append($$anchor, fragment_1);
		};

		var consequent_1 = ($$anchor) => {
			var dialog = root_1();

			dialog.open = true;

			var div_1 = $.child(dialog);
			let styles;
			var node_3 = $.child(div_1);

			$.add_svelte_meta(() => $.snippet(node_3, () => $$props.children ?? $.noop, () => popover), 'render', Popover, 188, 3);
			$.reset(div_1);
			$.attach(div_1, () => popover.panel);
			$.reset(dialog);
			$.attach(dialog, portal);
			$.attach(dialog, () => popover.dialog);

			$.template_effect(
				($0, $1) => {
					$.set_attribute(dialog, 'id', popover.id);
					$.set_class(dialog, 1, $0);
					$.set_class(div_1, 1, $1);

					styles = $.set_style(div_1, '', styles, {
						'transform-origin': popover.transformOrigin,
						width: $.equals(popover.triggerWidth, null, false) ? `${popover.triggerWidth}px` : undefined,
						'max-width': $.equals(popover.triggerWidth, null, false) ? `${popover.triggerWidth}px` : undefined
					});
				},
				[
					() => $.clsx($.get(classes).root({ mode: popover.computedMode })),
					() => $.clsx($.get(classes).popover({
						size: popover.computedSize,
						mode: popover.computedMode,
						className: $$props.class
					}))
				]
			);

			$.event('introend', div_1, function introend() {
				popover.hasTransitioned = true;
				$$props.onOpen?.(popover);
			});

			$.event('outrostart', div_1, function outrostart() {
				popover.hasTransitioned = false;
			});

			$.event('outroend', div_1, function outroend() {
				return $$props.onClose?.(popover);
			});

			$.transition(1, div_1, () => in_out, () => popover.computedTransition.in);
			$.transition(2, div_1, () => in_out, () => popover.computedTransition.out);
			$.append($$anchor, dialog);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if (popover.isMobileSheet) $$render(consequent); else if ($.get(visible)) $$render(consequent_1, 1);
			}),
			'if',
			Popover,
			129,
			0
		);
	}

	var node_4 = $.sibling(node, 2);

	{
		var consequent_4 = ($$anchor) => {
			var fragment_2 = $.comment();
			var node_5 = $.first_child(fragment_2);

			{
				var consequent_2 = ($$anchor) => {
					var fragment_3 = $.comment();
					var node_6 = $.first_child(fragment_3);

					$.add_svelte_meta(() => $.snippet(node_6, () => $$props.trigger ?? $.noop, () => popover), 'render', Popover, 194, 2);
					$.append($$anchor, fragment_3);
				};

				var consequent_3 = ($$anchor) => {
					var fragment_4 = $.comment();
					var node_7 = $.first_child(fragment_4);

					$.add_svelte_meta(
						() => Button(node_7, $.spread_props(() => $$props.trigger, {
							onClick: () => openOnClick() && popover.toggle(),
							[$.attachment()]: ($$node) => (popover.reference || $.noop)($$node),
							children: $.wrap_snippet(Popover, ($$anchor, $$slotProps) => {
								$.next();

								var text = $.text();

								$.template_effect(() => $.set_text(text, $$props.trigger.content));
								$.append($$anchor, text);
							}),
							$$slots: { default: true }
						})),
						'component',
						Popover,
						196,
						2,
						{ componentTag: 'Button' }
					);

					$.append($$anchor, fragment_4);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if ($.strict_equals(typeof $$props.trigger, 'function')) $$render(consequent_2); else if ($.strict_equals(typeof $$props.trigger, 'boolean', false)) $$render(consequent_3, 1);
					}),
					'if',
					Popover,
					193,
					1
				);
			}

			$.append($$anchor, fragment_2);
		};

		$.add_svelte_meta(
			() => $.if(node_4, ($$render) => {
				if ($$props.trigger) $$render(consequent_4);
			}),
			'if',
			Popover,
			192,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Popover = $.hmr(Popover);

	import.meta.hot.acceptExports(["default"],(module) => {
		Popover[$.HMR].update(module.default);
	});
}

export default Popover;
//# sourceMappingURL=data:application/json;base64,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Uzs0QkFDbEUsT0FBTyxDQUFDLFlBQVksRUFBSSxJQUFJLGNBQU0sT0FBTyxDQUFDLFlBQVksT0FBTyxTQUFTOzs7O3dCQWJqRixPQUFPLEVBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxPQUFPLENBQUMsWUFBWTt3QkFNeEMsT0FBTyxFQUFDLE9BQU87TUFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxZQUFZO01BQzFCLElBQUksRUFBRSxPQUFPLENBQUMsWUFBWTtNQUMxQjs7Ozs7dUJBTEQsMkJBWWtCO0lBQ2pCLE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSTtxQkFDckIsT0FBTztHQUNqQixDQUFDOzt5QkFmRCw2QkFnQm9CO0lBQ25CLE9BQU8sQ0FBQyxlQUFlLEdBQUcsS0FBSztHQUNoQyxDQUFDOzt1QkFsQkQ7NkJBbUI0QixPQUFPOzs7bUJBbkJuQywyQkFVVyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTttQkFWeEMsMkJBV1ksT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUc7c0JBcEIzQzs7Ozs7UUE3QkcsT0FBTyxDQUFDLGFBQWEsdUNBNEJoQixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0ZBcUNJLE9BQU87Ozs7Ozs7OztZQUV6QjtzQkFFZSxXQUFXLE1BQUksT0FBTyxDQUFDLE1BQU07c0NBQ25DLE9BQU8sQ0FBQyxTQUFTOzs7Ozs7aUVBRWpCLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7O2tEQVJNLFVBQVUsNEVBRUwsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF0RS9CIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJQb3BvdmVyLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgdHlwZSB7IFBvcG92ZXJQcm9wcyB9IGZyb20gJy4vcG9wb3Zlci5wcm9wcy5qcyc7XG5cdGltcG9ydCB7IHVzZVBvcG92ZXJUaGVtZSB9IGZyb20gJy4vcG9wb3Zlci50aGVtZS5qcyc7XG5cdGltcG9ydCB7IFBvcG92ZXJTdGF0ZSB9IGZyb20gJy4vcG9wb3Zlci5zdGF0ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgQnV0dG9uIGZyb20gJy4uL0J1dHRvbi9CdXR0b24uc3ZlbHRlJztcblx0aW1wb3J0IERpYWxvZyBmcm9tICcuLi9EaWFsb2cvRGlhbG9nLnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgRGlhbG9nVGhlbWVQcm9wcyB9IGZyb20gJy4uL0RpYWxvZy9kaWFsb2cudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBmc28gfSBmcm9tICckbGliL3RyYW5zaXRpb25zL3RyYW5zaXRpb24uanMnO1xuXHRpbXBvcnQgeyBwb3J0YWwgfSBmcm9tICckbGliL2F0dGFjaG1lbnRzL3BvcnRhbC5qcyc7XG5cdGltcG9ydCB7IHRyYW5zaXRpb25TaXplIH0gZnJvbSAnJGxpYi9hdHRhY2htZW50cy90cmFuc2l0aW9uU2l6ZS5qcyc7XG5cblx0bGV0IHtcblx0XHRpZDogY3VzdG9tSWQsXG5cdFx0cG9zaXRpb24sXG5cdFx0cmVmLFxuXHRcdG9uQ2xvc2UsXG5cdFx0b25PcGVuLFxuXHRcdHNpemUsXG5cdFx0b2Zmc2V0LFxuXHRcdHRyYW5zaXRpb24sXG5cdFx0Y2hpbGRyZW4sXG5cdFx0b3BlbiA9ICRiaW5kYWJsZShmYWxzZSksXG5cdFx0b3Blbk9uSG92ZXIgPSBmYWxzZSxcblx0XHRvcGVuT25DbGljayA9IHRydWUsXG5cdFx0aG92ZXJEZWxheSA9IDEwMCxcblx0XHRjbG9zZU9uRXNjYXBlID0gdHJ1ZSxcblx0XHRjbG9zZU9uQ2xpY2tPdXRzaWRlID0gdHJ1ZSxcblx0XHRjbG9zZU9uTW91c2VMZWF2ZSA9IGZhbHNlLFxuXHRcdGRlYnVnU2FmZUFyZWEgPSBmYWxzZSxcblx0XHRkaXJlY3RlZFRyYW5zaXRpb24gPSB0cnVlLFxuXHRcdGxvY2tTY3JvbGwgPSB0cnVlLFxuXHRcdGZpdFRyaWdnZXIgPSBmYWxzZSxcblx0XHRtb2JpbGVTaGVldCA9IGZhbHNlLFxuXHRcdG1vYmlsZVNoZWV0U2l6ZVRyYW5zaXRpb24gPSB0cnVlLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0dHJpZ2dlcixcblx0XHR0aGVtZVxuXHR9OiBQb3BvdmVyUHJvcHMgPSAkcHJvcHMoKTtcblxuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXHRjb25zdCBwb3BvdmVyID0gbmV3IFBvcG92ZXJTdGF0ZSh7XG5cdFx0Z2V0IGlkKCkge1xuXHRcdFx0cmV0dXJuIGN1c3RvbUlkIHx8IGlkO1xuXHRcdH0sXG5cdFx0Z2V0IGlzT3BlbigpIHtcblx0XHRcdHJldHVybiBvcGVuO1xuXHRcdH0sXG5cdFx0c2V0IGlzT3Blbih2YWx1ZSkge1xuXHRcdFx0b3BlbiA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0Z2V0IHNpemUoKSB7XG5cdFx0XHRyZXR1cm4gc2l6ZTtcblx0XHR9LFxuXHRcdGdldCB0cmFuc2l0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRyYW5zaXRpb247XG5cdFx0fSxcblx0XHRnZXQgZGlyZWN0ZWRUcmFuc2l0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpcmVjdGVkVHJhbnNpdGlvbjtcblx0XHR9LFxuXHRcdGdldCBwb3NpdGlvbigpIHtcblx0XHRcdHJldHVybiBwb3NpdGlvbjtcblx0XHR9LFxuXHRcdGdldCBvZmZzZXQoKSB7XG5cdFx0XHRyZXR1cm4gb2Zmc2V0O1xuXHRcdH0sXG5cdFx0Z2V0IGV4dGVybmFsUmVmKCkge1xuXHRcdFx0cmV0dXJuIHJlZjtcblx0XHR9LFxuXHRcdGdldCBmaXRUcmlnZ2VyKCkge1xuXHRcdFx0cmV0dXJuIGZpdFRyaWdnZXI7XG5cdFx0fSxcblx0XHRnZXQgbW9iaWxlU2hlZXQoKSB7XG5cdFx0XHRyZXR1cm4gbW9iaWxlU2hlZXQ7XG5cdFx0fSxcblx0XHRnZXQgY2xvc2VPbkVzY2FwZSgpIHtcblx0XHRcdHJldHVybiBjbG9zZU9uRXNjYXBlO1xuXHRcdH0sXG5cdFx0Z2V0IGxvY2tTY3JvbGwoKSB7XG5cdFx0XHRyZXR1cm4gbG9ja1Njcm9sbDtcblx0XHR9LFxuXHRcdGdldCBjbG9zZU9uTW91c2VMZWF2ZSgpIHtcblx0XHRcdHJldHVybiBjbG9zZU9uTW91c2VMZWF2ZTtcblx0XHR9LFxuXHRcdGdldCBkZWJ1Z1NhZmVBcmVhKCkge1xuXHRcdFx0cmV0dXJuIGRlYnVnU2FmZUFyZWE7XG5cdFx0fSxcblx0XHRnZXQgY2xvc2VPbkNsaWNrT3V0c2lkZSgpIHtcblx0XHRcdHJldHVybiBjbG9zZU9uQ2xpY2tPdXRzaWRlO1xuXHRcdH0sXG5cdFx0Z2V0IG9wZW5PbkhvdmVyKCkge1xuXHRcdFx0cmV0dXJuIG9wZW5PbkhvdmVyO1xuXHRcdH0sXG5cdFx0Z2V0IGhvdmVyRGVsYXkoKSB7XG5cdFx0XHRyZXR1cm4gaG92ZXJEZWxheTtcblx0XHR9LFxuXHRcdGdldCBvcGVuT25DbGljaygpIHtcblx0XHRcdHJldHVybiBvcGVuT25DbGljaztcblx0XHR9LFxuXHRcdGdldCBvbkNsb3NlKCkge1xuXHRcdFx0cmV0dXJuIG9uQ2xvc2U7XG5cdFx0fSxcblx0XHRnZXQgb25PcGVuKCkge1xuXHRcdFx0cmV0dXJuIG9uT3Blbjtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VQb3BvdmVyVGhlbWUodGhlbWUpKTtcblxuXHRjb25zdCBpbl9vdXQgPSBmc28oKTtcblxuXHRjb25zdCB2aXNpYmxlID0gJGRlcml2ZWQoXG5cdFx0cG9wb3Zlci5pc09wZW4gJiYgKHBvcG92ZXIuaXNNb2JpbGVTaGVldCB8fCBwb3BvdmVyLnJlZmVyZW5jZUVsZW1lbnQgfHwgcG9wb3Zlci5leHRlcm5hbFJlZilcblx0KTtcblxuXHRjb25zdCBtb2JpbGVTaGVldERpYWxvZ1RoZW1lID0gJGRlcml2ZWQoe1xuXHRcdGNvbnRlbnQ6IHtcblx0XHRcdGJhc2U6IGNsYXNzZXMucG9wb3Zlcih7XG5cdFx0XHRcdHNpemU6IHBvcG92ZXIuY29tcHV0ZWRTaXplLFxuXHRcdFx0XHRtb2RlOiAnbW9iaWxlU2hlZXQnLFxuXHRcdFx0XHRjbGFzc05hbWVcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRjbG9zZUJ1dHRvbjogeyBiYXNlOiAnaGlkZGVuJyB9XG5cdH0gc2F0aXNmaWVzIERpYWxvZ1RoZW1lUHJvcHMpO1xuPC9zY3JpcHQ+XG5cbnsjc25pcHBldCBlbXB0eUNsb3NlQnV0dG9uKCl9ey9zbmlwcGV0fVxuXG57I2lmIHBvcG92ZXIuaXNNb2JpbGVTaGVldH1cblx0PERpYWxvZ1xuXHRcdGlkPXtwb3BvdmVyLmlkfVxuXHRcdGJpbmQ6b3BlblxuXHRcdHR5cGU9XCJkcmF3ZXJCb3R0b21cIlxuXHRcdHJlc3BvbnNpdmU9e2ZhbHNlfVxuXHRcdHtzaXplfVxuXHRcdHt0cmFuc2l0aW9ufVxuXHRcdHtjbG9zZU9uRXNjYXBlfVxuXHRcdHtjbG9zZU9uQ2xpY2tPdXRzaWRlfVxuXHRcdGNsb3NhYmxlPXtjbG9zZU9uRXNjYXBlIHx8IGNsb3NlT25DbGlja091dHNpZGV9XG5cdFx0c3dpcGVUb0Rpc21pc3M9e2Nsb3NlT25DbGlja091dHNpZGV9XG5cdFx0dGh1bWI9e2ZhbHNlfVxuXHRcdGNsb3NlQnV0dG9uPXtlbXB0eUNsb3NlQnV0dG9ufVxuXHRcdHRoZW1lPXttb2JpbGVTaGVldERpYWxvZ1RoZW1lfVxuXHRcdG9uT3Blbj17KCkgPT4ge1xuXHRcdFx0cG9wb3Zlci5oYXNUcmFuc2l0aW9uZWQgPSB0cnVlO1xuXHRcdFx0b25PcGVuPy4ocG9wb3Zlcik7XG5cdFx0fX1cblx0XHRvbkNsb3NlPXsoKSA9PiB7XG5cdFx0XHRwb3BvdmVyLmhhc1RyYW5zaXRpb25lZCA9IGZhbHNlO1xuXHRcdFx0b25DbG9zZT8uKHBvcG92ZXIpO1xuXHRcdH19XG5cdD5cblx0XHQ8ZGl2IHtAYXR0YWNoIHRyYW5zaXRpb25TaXplKHsgaXNBY3RpdmU6ICgpID0+IG1vYmlsZVNoZWV0U2l6ZVRyYW5zaXRpb24gfSl9PlxuXHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4/Lihwb3BvdmVyKX1cblx0XHQ8L2Rpdj5cblx0PC9EaWFsb2c+XG57OmVsc2UgaWYgdmlzaWJsZX1cblx0PGRpYWxvZ1xuXHRcdHtAYXR0YWNoIHBvcnRhbCgpfVxuXHRcdHtAYXR0YWNoIHBvcG92ZXIuZGlhbG9nfVxuXHRcdG9wZW49e3RydWV9XG5cdFx0aWQ9e3BvcG92ZXIuaWR9XG5cdFx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IG1vZGU6IHBvcG92ZXIuY29tcHV0ZWRNb2RlIH0pfVxuXHQ+XG5cdFx0PCEtLSBUaGUgcGFuZWwgaXMgYSBjaGlsZCBvZiB0aGUgcG9ydGFsZWQgd3JhcHBlciwgc28gaXQgaXMgbmV2ZXIgcmUtcGFyZW50ZWQgbWlkLXRyYW5zaXRpb25cblx0XHQgICAgICh3aGljaCB3b3VsZCBicmVhayB0aGUgaW50cm8pLiBJdCBjYXJyaWVzIHRoZSB2aXN1YWxzLCB0cmFuc2Zvcm0tb3JpZ2luLCBhbmQgYW5pbWF0aW9uLiAtLT5cblx0XHQ8ZGl2XG5cdFx0XHR7QGF0dGFjaCBwb3BvdmVyLnBhbmVsfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMucG9wb3Zlcih7XG5cdFx0XHRcdHNpemU6IHBvcG92ZXIuY29tcHV0ZWRTaXplLFxuXHRcdFx0XHRtb2RlOiBwb3BvdmVyLmNvbXB1dGVkTW9kZSxcblx0XHRcdFx0Y2xhc3NOYW1lXG5cdFx0XHR9KX1cblx0XHRcdHN0eWxlOnRyYW5zZm9ybS1vcmlnaW49e3BvcG92ZXIudHJhbnNmb3JtT3JpZ2lufVxuXHRcdFx0c3R5bGU6d2lkdGg9e3BvcG92ZXIudHJpZ2dlcldpZHRoICE9IG51bGwgPyBgJHtwb3BvdmVyLnRyaWdnZXJXaWR0aH1weGAgOiB1bmRlZmluZWR9XG5cdFx0XHRzdHlsZTptYXgtd2lkdGg9e3BvcG92ZXIudHJpZ2dlcldpZHRoICE9IG51bGwgPyBgJHtwb3BvdmVyLnRyaWdnZXJXaWR0aH1weGAgOiB1bmRlZmluZWR9XG5cdFx0XHRpbjppbl9vdXQ9e3BvcG92ZXIuY29tcHV0ZWRUcmFuc2l0aW9uLmlufVxuXHRcdFx0b3V0OmluX291dD17cG9wb3Zlci5jb21wdXRlZFRyYW5zaXRpb24ub3V0fVxuXHRcdFx0b25pbnRyb2VuZD17KCkgPT4ge1xuXHRcdFx0XHRwb3BvdmVyLmhhc1RyYW5zaXRpb25lZCA9IHRydWU7XG5cdFx0XHRcdG9uT3Blbj8uKHBvcG92ZXIpO1xuXHRcdFx0fX1cblx0XHRcdG9ub3V0cm9zdGFydD17KCkgPT4ge1xuXHRcdFx0XHRwb3BvdmVyLmhhc1RyYW5zaXRpb25lZCA9IGZhbHNlO1xuXHRcdFx0fX1cblx0XHRcdG9ub3V0cm9lbmQ9eygpID0+IG9uQ2xvc2U/Lihwb3BvdmVyKX1cblx0XHQ+XG5cdFx0XHR7QHJlbmRlciBjaGlsZHJlbj8uKHBvcG92ZXIpfVxuXHRcdDwvZGl2PlxuXHQ8L2RpYWxvZz5cbnsvaWZ9XG57I2lmIHRyaWdnZXJ9XG5cdHsjaWYgdHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbid9XG5cdFx0e0ByZW5kZXIgdHJpZ2dlcj8uKHBvcG92ZXIpfVxuXHR7OmVsc2UgaWYgdHlwZW9mIHRyaWdnZXIgIT09ICdib29sZWFuJ31cblx0XHQ8QnV0dG9uXG5cdFx0XHR7Li4udHJpZ2dlcn1cblx0XHRcdG9uQ2xpY2s9eygpID0+IG9wZW5PbkNsaWNrICYmIHBvcG92ZXIudG9nZ2xlKCl9XG5cdFx0XHR7QGF0dGFjaCBwb3BvdmVyLnJlZmVyZW5jZX1cblx0XHQ+XG5cdFx0XHR7dHJpZ2dlci5jb250ZW50fVxuXHRcdDwvQnV0dG9uPlxuXHR7L2lmfVxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvUG9wb3Zlci9Qb3BvdmVyLnN2ZWx0ZSJ9