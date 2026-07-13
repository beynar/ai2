import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Slot/Slot.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Slot[$.FILENAME] = 'src/lib/components/Slot/Slot.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'render',
	'class',
	'children',
	'style',
	'attrs',
	'as',
	'renderIf',
	'payload'
]);

function Slot($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Slot);

	const slot = $.wrap_snippet(Slot, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		{
			var consequent = ($$anchor) => {
				var text = $.text();

				$.template_effect(() => $.set_text(text, $$props.render));
				$.append($$anchor, text);
			};

			var consequent_1 = ($$anchor) => {
				var fragment_2 = $.comment();
				var node_1 = $.first_child(fragment_2);

				$.add_svelte_meta(() => $.snippet(node_1, () => $$props.render ?? $.noop, () => $$props.payload), 'render', Slot, 31, 2);
				$.append($$anchor, fragment_2);
			};

			$.add_svelte_meta(
				() => $.if(node, ($$render) => {
					if ($.strict_equals(typeof $$props.render, 'string')) $$render(consequent); else if ($$props.render) $$render(consequent_1, 1);
				}),
				'if',
				Slot,
				28,
				1
			);
		}

		$.append($$anchor, fragment);
	});

	let className = $.prop($$props, 'class', 3, ''),
		style = $.prop($$props, 'style', 3, ''),
		attrs = $.prop($$props, 'attrs', 19, () => ({})),
		as = $.prop($$props, 'as', 3, 'div'),
		renderIf = $.prop($$props, 'renderIf', 3, true),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	var $$exports = { ...$.legacy_api() };
	var fragment_3 = $.comment();
	var node_2 = $.first_child(fragment_3);

	{
		var consequent_7 = ($$anchor) => {
			var fragment_4 = $.comment();
			var node_3 = $.first_child(fragment_4);

			{
				var consequent_4 = ($$anchor) => {
					var fragment_5 = $.comment();
					var node_4 = $.first_child(fragment_5);

					{
						var consequent_2 = ($$anchor) => {
							$.add_svelte_meta(() => slot($$anchor), 'render', Slot, 39, 3);
						};

						var consequent_3 = ($$anchor) => {
							var fragment_7 = $.comment();
							var node_5 = $.first_child(fragment_7);

							{
								$.validate_dynamic_element_tag(as);
								$.validate_void_dynamic_element(as);

								$.element(
									node_5,
									as,
									false,
									($$element, $$anchor) => {
										$.attribute_effect($$element, () => ({
											style: style(),
											...attrs(),
											class: className(),
											...attachments
										}));

										$.add_svelte_meta(() => slot($$anchor), 'render', Slot, 42, 4);
									},
									void 0,
									[41, 3]
								);
							}

							$.append($$anchor, fragment_7);
						};

						$.add_svelte_meta(
							() => $.if(node_4, ($$render) => {
								if (!className() && $$props.render) $$render(consequent_2); else if ($$props.render) $$render(consequent_3, 1);
							}),
							'if',
							Slot,
							38,
							2
						);
					}

					$.append($$anchor, fragment_5);
				};

				var consequent_6 = ($$anchor) => {
					var fragment_9 = $.comment();
					var node_6 = $.first_child(fragment_9);

					{
						var consequent_5 = ($$anchor) => {
							var fragment_10 = $.comment();
							var node_7 = $.first_child(fragment_10);

							{
								$.validate_dynamic_element_tag(as);
								$.validate_void_dynamic_element(as);

								$.element(
									node_7,
									as,
									false,
									($$element_1, $$anchor) => {
										$.attribute_effect($$element_1, () => ({
											style: style(),
											...attrs(),
											class: className(),
											...attachments
										}));

										var fragment_11 = $.comment();
										var node_8 = $.first_child(fragment_11);

										$.add_svelte_meta(() => $.snippet(node_8, () => $$props.children), 'render', Slot, 48, 4);
										$.append($$anchor, fragment_11);
									},
									void 0,
									[47, 3]
								);
							}

							$.append($$anchor, fragment_10);
						};

						var alternate = ($$anchor) => {
							var fragment_12 = $.comment();
							var node_9 = $.first_child(fragment_12);

							$.add_svelte_meta(() => $.snippet(node_9, () => $$props.children), 'render', Slot, 51, 3);
							$.append($$anchor, fragment_12);
						};

						$.add_svelte_meta(
							() => $.if(node_6, ($$render) => {
								if (className()) $$render(consequent_5); else $$render(alternate, -1);
							}),
							'if',
							Slot,
							46,
							2
						);
					}

					$.append($$anchor, fragment_9);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if ($$props.render) $$render(consequent_4); else if ($$props.children) $$render(consequent_6, 1);
					}),
					'if',
					Slot,
					37,
					1
				);
			}

			$.append($$anchor, fragment_4);
		};

		$.add_svelte_meta(
			() => $.if(node_2, ($$render) => {
				if (renderIf() || $$props.render) $$render(consequent_7);
			}),
			'if',
			Slot,
			35,
			0
		);
	}

	$.append($$anchor, fragment_3);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Slot = $.hmr(Slot);

	import.meta.hot.acceptExports(["default"],(module) => {
		Slot[$.HMR].update(module.default);
	});
}

export default Slot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUFBLENBQUM7Ozs7T0EwQlMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUNVLFFBQVE7Ozs7Ozs7Ozs7OztDQXZCL0IsSUFBSSxBQUVJLFNBQVMsK0JBQUcsRUFBRTtFQUVyQixLQUFLLCtCQUFHLEVBQUU7RUFDVixLQUFLO0VBQ0wsRUFBRSw0QkFBRyxLQUFLO0VBQ1YsUUFBUSxrQ0FBRyxJQUFJO0VBRVo7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkF5Qk8sSUFBSTs7Ozs7Ozs7dUNBRVMsRUFBRTt3Q0FBRixFQUFFOzs7O1NBQUYsRUFBRTs7OztrQkFBRyxLQUFLO2NBQU0sS0FBSztrQkFBUyxTQUFTO2NBQU0sV0FBVzs7O2tDQUNwRSxJQUFJOzs7Ozs7Ozs7Ozs7YUFKVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQVNRLEVBQUU7d0NBQUYsRUFBRTs7OztTQUFGLEVBQUU7Ozs7a0JBQUcsS0FBSztjQUFNLEtBQUs7a0JBQVMsU0FBUztjQUFNLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUQxRSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBWFgsUUFBUTs7Ozs7Ozs7Ozs7O0FBVkwiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNsb3Quc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCIgZ2VuZXJpY3M9XCJQYXlsb2FkIGV4dGVuZHMgYW55fHVuZGVmaW5lZCA9IHVuZGVmaW5lZFwiPlxuXHRpbXBvcnQgeyB0eXBlIFNsb3QgfSBmcm9tICcuL3Nsb3QuanMnO1xuXHRpbXBvcnQgdHlwZSB7IFNuaXBwZXQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgdHlwZSB7IFdpdGhBdHRhY2htZW50cyB9IGZyb20gJyRsaWIvdHlwZXMvcHJvcHMuanMnO1xuXHRsZXQge1xuXHRcdHJlbmRlcixcblx0XHRjbGFzczogY2xhc3NOYW1lID0gJycsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0c3R5bGUgPSAnJyxcblx0XHRhdHRycyA9IHt9LFxuXHRcdGFzID0gJ2RpdicsXG5cdFx0cmVuZGVySWYgPSB0cnVlLFxuXHRcdHBheWxvYWQsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogV2l0aEF0dGFjaG1lbnRzPHtcblx0XHRjbGFzcz86IHN0cmluZztcblx0XHRhcz86IHN0cmluZztcblx0XHRhdHRycz86IFJlY29yZDxzdHJpbmcsIGFueT47XG5cdFx0Y2hpbGRyZW4/OiBTbmlwcGV0PFtdPjtcblx0XHRzdHlsZT86IHN0cmluZztcblx0XHRyZW5kZXI/OiBTbG90PFBheWxvYWQ+O1xuXHRcdHJlbmRlcklmPzogYm9vbGVhbjtcblx0XHRwYXlsb2FkPzogUGF5bG9hZDtcblx0fT4gPSAkcHJvcHMoKTtcbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgc2xvdCgpfVxuXHR7I2lmIHR5cGVvZiByZW5kZXIgPT09ICdzdHJpbmcnfVxuXHRcdHtyZW5kZXJ9XG5cdHs6ZWxzZSBpZiByZW5kZXJ9XG5cdFx0e0ByZW5kZXIgcmVuZGVyPy4ocGF5bG9hZCl9XG5cdHsvaWZ9XG57L3NuaXBwZXR9XG5cbnsjaWYgcmVuZGVySWYgfHwgcmVuZGVyfVxuXHQ8IS0tIElmIG5vIGNsYXNzIGlzIHBhc3MsIHdlIGFzc3VtZSB0aGF0IHdlIGRvbid0IHdhbnQgdG8gd3JhcCBpdCBpbnNpZGUgYSBkaXYgLS0+XG5cdHsjaWYgcmVuZGVyfVxuXHRcdHsjaWYgIWNsYXNzTmFtZSAmJiByZW5kZXJ9XG5cdFx0XHR7QHJlbmRlciBzbG90KCl9XG5cdFx0ezplbHNlIGlmIHJlbmRlcn1cblx0XHRcdDxzdmVsdGU6ZWxlbWVudCB0aGlzPXthc30ge3N0eWxlfSB7Li4uYXR0cnN9IGNsYXNzPXtjbGFzc05hbWV9IHsuLi5hdHRhY2htZW50c30+XG5cdFx0XHRcdHtAcmVuZGVyIHNsb3QoKX1cblx0XHRcdDwvc3ZlbHRlOmVsZW1lbnQ+XG5cdFx0ey9pZn1cblx0ezplbHNlIGlmIGNoaWxkcmVufVxuXHRcdHsjaWYgY2xhc3NOYW1lfVxuXHRcdFx0PHN2ZWx0ZTplbGVtZW50IHRoaXM9e2FzfSB7c3R5bGV9IHsuLi5hdHRyc30gY2xhc3M9e2NsYXNzTmFtZX0gey4uLmF0dGFjaG1lbnRzfT5cblx0XHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4oKX1cblx0XHRcdDwvc3ZlbHRlOmVsZW1lbnQ+XG5cdFx0ezplbHNlfVxuXHRcdFx0e0ByZW5kZXIgY2hpbGRyZW4oKX1cblx0XHR7L2lmfVxuXHR7L2lmfVxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2xvdC9TbG90LnN2ZWx0ZSJ9