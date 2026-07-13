import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/PageShell/PageShellHeader.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

PageShellHeader[$.FILENAME] = 'src/lib/components/PageShell/PageShellHeader.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Button from "/src/lib/components/Button/Button.svelte";
import Breadcrumbs from "/src/lib/components/Breadcrumbs/Breadcrumbs.svelte?t=1783864665558";
import { arrowLeftIcon } from "/src/lib/components/Icons/arrowLeft.ts";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import PageShellActions from "/src/lib/components/PageShell/PageShellActions.svelte?t=1783864665558";
import { usePageShellTheme } from "/src/lib/components/PageShell/pageShell.theme.ts";

var root = $.add_locations($.from_html(`<div data-slot="page-shell-back"><!></div>`), PageShellHeader[$.FILENAME], [[46, 8]]);
var root_1 = $.add_locations($.from_html(`<div data-slot="page-shell-header-meta"><!> <!></div>`), PageShellHeader[$.FILENAME], [[42, 5]]);
var root_2 = $.add_locations($.from_html(`<div data-slot="page-shell-header-actions"><!></div>`), PageShellHeader[$.FILENAME], [[104, 4]]);
var root_3 = $.add_locations($.from_html(`<div><div><!> <!> <!></div> <!></div>`), PageShellHeader[$.FILENAME], [[39, 2, [[40, 3]]]]);
var root_4 = $.add_locations($.from_html(`<header data-slot="page-shell-header"><!></header>`), PageShellHeader[$.FILENAME], [[32, 0]]);

function PageShellHeader($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, PageShellHeader);

	const classes = $.tag($.derived(() => usePageShellTheme($$props.theme)), 'classes');

	function isBackSnippet(back) {
		return $.strict_equals(typeof back, 'function');
	}

	function asBackAction(back) {
		return back;
	}

	var $$exports = { ...$.legacy_api() };
	var header = root_4();
	var node = $.child(header);

	{
		var consequent = ($$anchor) => {
			var fragment = $.comment();
			var node_1 = $.first_child(fragment);

			$.add_svelte_meta(() => $.snippet(node_1, () => $$props.api.header, () => $$props.api), 'render', PageShellHeader, 37, 2);
			$.append($$anchor, fragment);
		};

		var alternate_2 = ($$anchor) => {
			var div = root_3();
			var div_1 = $.child(div);
			var node_2 = $.child(div_1);

			{
				var consequent_6 = ($$anchor) => {
					var div_2 = root_1();
					var node_3 = $.child(div_2);

					{
						var consequent_2 = ($$anchor) => {
							const back = $.tag($.derived(() => $$props.api.back), 'back');

							$.get(back);

							var fragment_1 = $.comment();
							var node_4 = $.first_child(fragment_1);

							{
								var consequent_1 = ($$anchor) => {
									var div_3 = root();
									var node_5 = $.child(div_3);

									$.add_svelte_meta(() => $.snippet(node_5, () => $.get(back), () => $$props.api), 'render', PageShellHeader, 47, 9);
									$.reset(div_3);
									$.template_effect(($0) => $.set_class(div_3, 1, $0), [() => $.clsx($.get(classes).back())]);
									$.append($$anchor, div_3);
								};

								var d = $.derived(() => isBackSnippet($.get(back)));

								var alternate = ($$anchor) => {
									const computed_const = $.tag(
										$.derived(() => {
											const {
												content: backLabel = 'Back',
												label,
												prefix = arrowLeftIcon,
												variant = 'ghost',
												size = 'small',
												squared = true,
												class: buttonClass,
												...buttonProps
											} = asBackAction($.get(back));

											return {
												backLabel,
												label,
												prefix,
												variant,
												size,
												squared,
												buttonClass,
												buttonProps
											};
										}),
										'[@const]'
									);

									$.get(computed_const);

									var fragment_2 = $.comment();
									var node_6 = $.first_child(fragment_2);

									{
										let $0 = $.derived(() => $.get(classes).back({ className: $.get(computed_const).buttonClass }));
										let $1 = $.derived(() => $.get(computed_const).label ?? $.get(computed_const).backLabel);

										$.add_svelte_meta(
											() => Button(node_6, $.spread_props(() => $.get(computed_const).buttonProps, {
												get prefix() {
													return $.get(computed_const).prefix;
												},

												get variant() {
													return $.get(computed_const).variant;
												},

												get size() {
													return $.get(computed_const).size;
												},

												get squared() {
													return $.get(computed_const).squared;
												},

												get class() {
													return $.get($0);
												},

												get label() {
													return $.get($1);
												}
											})),
											'component',
											PageShellHeader,
											60,
											8,
											{ componentTag: 'Button' }
										);
									}

									$.append($$anchor, fragment_2);
								};

								$.add_svelte_meta(
									() => $.if(node_4, ($$render) => {
										if ($.get(d)) $$render(consequent_1); else $$render(alternate, -1);
									}),
									'if',
									PageShellHeader,
									45,
									7
								);
							}

							$.append($$anchor, fragment_1);
						};

						$.add_svelte_meta(
							() => $.if(node_3, ($$render) => {
								if ($$props.api.back) $$render(consequent_2);
							}),
							'if',
							PageShellHeader,
							43,
							6
						);
					}

					var node_7 = $.sibling(node_3, 2);

					{
						var consequent_4 = ($$anchor) => {
							var fragment_3 = $.comment();
							var node_8 = $.first_child(fragment_3);

							{
								var consequent_3 = ($$anchor) => {
									var fragment_4 = $.comment();
									var node_9 = $.first_child(fragment_4);

									{
										let $0 = $.derived(() => $$props.api.breadcrumbsMaxItems ?? 4);
										let $1 = $.derived(() => $.get(classes).breadcrumbs());

										$.add_svelte_meta(
											() => Breadcrumbs(node_9, {
												get items() {
													return $$props.api.breadcrumbs;
												},

												get maxItems() {
													return $.get($0);
												},

												get class() {
													return $.get($1);
												}
											}),
											'component',
											PageShellHeader,
											74,
											8,
											{ componentTag: 'Breadcrumbs' }
										);
									}

									$.append($$anchor, fragment_4);
								};

								var d_1 = $.derived(() => Array.isArray($$props.api.breadcrumbs));

								var alternate_1 = ($$anchor) => {
									var fragment_5 = $.comment();
									var node_10 = $.first_child(fragment_5);

									$.add_svelte_meta(() => $.snippet(node_10, () => $$props.api.breadcrumbs, () => $$props.api), 'render', PageShellHeader, 80, 8);
									$.append($$anchor, fragment_5);
								};

								$.add_svelte_meta(
									() => $.if(node_8, ($$render) => {
										if ($.get(d_1)) $$render(consequent_3); else $$render(alternate_1, -1);
									}),
									'if',
									PageShellHeader,
									73,
									7
								);
							}

							$.append($$anchor, fragment_3);
						};

						var consequent_5 = ($$anchor) => {
							var fragment_6 = $.comment();
							var node_11 = $.first_child(fragment_6);

							{
								let $0 = $.derived(() => $.get(classes).eyebrow());

								$.add_svelte_meta(
									() => Slot(node_11, {
										get render() {
											return $$props.api.eyebrow;
										},

										get payload() {
											return $$props.api;
										},

										get class() {
											return $.get($0);
										}
									}),
									'component',
									PageShellHeader,
									83,
									7,
									{ componentTag: 'Slot' }
								);
							}

							$.append($$anchor, fragment_6);
						};

						$.add_svelte_meta(
							() => $.if(node_7, ($$render) => {
								if ($$props.api.breadcrumbs) $$render(consequent_4); else if ($$props.api.eyebrow) $$render(consequent_5, 1);
							}),
							'if',
							PageShellHeader,
							72,
							6
						);
					}

					$.reset(div_2);
					$.template_effect(($0) => $.set_class(div_2, 1, $0), [() => $.clsx($.get(classes).meta())]);
					$.append($$anchor, div_2);
				};

				$.add_svelte_meta(
					() => $.if(node_2, ($$render) => {
						if ($$props.api.back || $$props.api.breadcrumbs || $$props.api.eyebrow) $$render(consequent_6);
					}),
					'if',
					PageShellHeader,
					41,
					4
				);
			}

			var node_12 = $.sibling(node_2, 2);

			{
				let $0 = $.derived(() => !!$$props.api.title);
				let $1 = $.derived(() => $.get(classes).title());

				$.add_svelte_meta(
					() => Slot(node_12, {
						as: 'h1',
						get render() {
							return $$props.api.title;
						},

						get renderIf() {
							return $.get($0);
						},

						get payload() {
							return $$props.api;
						},

						get class() {
							return $.get($1);
						}
					}),
					'component',
					PageShellHeader,
					88,
					4,
					{ componentTag: 'Slot' }
				);
			}

			var node_13 = $.sibling(node_12, 2);

			{
				let $0 = $.derived(() => !!$$props.api.subtitle);
				let $1 = $.derived(() => $.get(classes).subtitle());

				$.add_svelte_meta(
					() => Slot(node_13, {
						as: 'p',
						get render() {
							return $$props.api.subtitle;
						},

						get renderIf() {
							return $.get($0);
						},

						get payload() {
							return $$props.api;
						},

						get class() {
							return $.get($1);
						}
					}),
					'component',
					PageShellHeader,
					95,
					4,
					{ componentTag: 'Slot' }
				);
			}

			$.reset(div_1);

			var node_14 = $.sibling(div_1, 2);

			{
				var consequent_7 = ($$anchor) => {
					var div_4 = root_2();
					var node_15 = $.child(div_4);

					{
						let $0 = $.derived(() => $$props.api.actionOverflow ?? 'auto');
						let $1 = $.derived(() => $$props.api.mobileActionCount ?? 1);

						$.add_svelte_meta(
							() => PageShellActions(node_15, {
								get api() {
									return $$props.api;
								},

								get actions() {
									return $$props.api.headerActions;
								},

								get actionOverflow() {
									return $.get($0);
								},

								get mobileActionCount() {
									return $.get($1);
								},

								get theme() {
									return $$props.theme;
								}
							}),
							'component',
							PageShellHeader,
							105,
							5,
							{ componentTag: 'PageShellActions' }
						);
					}

					$.reset(div_4);
					$.template_effect(($0) => $.set_class(div_4, 1, $0), [() => $.clsx($.get(classes).actions())]);
					$.append($$anchor, div_4);
				};

				$.add_svelte_meta(
					() => $.if(node_14, ($$render) => {
						if ($$props.api.headerActions) $$render(consequent_7);
					}),
					'if',
					PageShellHeader,
					103,
					3
				);
			}

			$.reset(div);

			$.template_effect(
				($0, $1) => {
					$.set_class(div, 1, $0);
					$.set_class(div_1, 1, $1);
				},
				[
					() => $.clsx($.get(classes).headerInner()),
					() => $.clsx($.get(classes).titleStack())
				]
			);

			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($$props.api.header) $$render(consequent); else $$render(alternate_2, -1);
			}),
			'if',
			PageShellHeader,
			36,
			1
		);
	}

	$.reset(header);

	$.template_effect(($0) => $.set_class(header, 1, $0), [
		() => $.clsx($.get(classes).header({
			scrolled: $$props.api.isContentScrolled,
			className: $$props.class
		}))
	]);

	$.append($$anchor, header);

	return $.pop($$exports);
}

if (import.meta.hot) {
	PageShellHeader = $.hmr(PageShellHeader);

	import.meta.hot.acceptExports(["default"],(module) => {
		PageShellHeader[$.HMR].update(module.default);
	});
}

export default PageShellHeader;
//# sourceMappingURL=data:application/json;base64,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S0FBRzsyQ0FBSCxLQUFHLDhCQUE4QyxPQUFPLEVBQUMsT0FBTzt3QkFBaEUsS0FBRzs7Ozs7c0JBREksYUFBYTs7Ozs7Ozs7O1dBaEV0QixHQUFHOzs7O2lCQUFILEdBQUc7aUJBQ0YsS0FBRzs7O3dCQURPLE9BQU8sRUFBQyxXQUFXO3dCQUNsQixPQUFPLEVBQUMsVUFBVTs7OztzQkFEOUIsR0FBRzs7Ozs7b0JBSEksTUFBTTs7Ozs7Ozs7O1NBSmY7O3VDQUFBO3FCQUVPLE9BQU8sRUFBQyxNQUFNO0dBQUcsUUFBUSxjQUFNLGlCQUFpQjtHQUFFLFNBQVM7Ozs7b0JBRmxFOzs7QUFGTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiUGFnZVNoZWxsSGVhZGVyLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgQnV0dG9uIGZyb20gJyRsaWIvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLnN2ZWx0ZSc7XG5cdGltcG9ydCBCcmVhZGNydW1icyBmcm9tICckbGliL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuc3ZlbHRlJztcblx0aW1wb3J0IHsgYXJyb3dMZWZ0SWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9hcnJvd0xlZnQuanMnO1xuXHRpbXBvcnQgU2xvdCBmcm9tICckbGliL2NvbXBvbmVudHMvU2xvdC9TbG90LnN2ZWx0ZSc7XG5cdGltcG9ydCBQYWdlU2hlbGxBY3Rpb25zIGZyb20gJy4vUGFnZVNoZWxsQWN0aW9ucy5zdmVsdGUnO1xuXHRpbXBvcnQgdHlwZSB7XG5cdFx0UGFnZVNoZWxsQWN0aW9uLFxuXHRcdFBhZ2VTaGVsbEFwaSxcblx0XHRQYWdlU2hlbGxCYWNrLFxuXHRcdFBhZ2VTaGVsbFJlZ2lvblxuXHR9IGZyb20gJy4vcGFnZVNoZWxsLnByb3BzLmpzJztcblx0aW1wb3J0IHsgdXNlUGFnZVNoZWxsVGhlbWUsIHR5cGUgUGFnZVNoZWxsVGhlbWVQcm9wcyB9IGZyb20gJy4vcGFnZVNoZWxsLnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdGFwaSxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdHRoZW1lXG5cdH06IHsgYXBpOiBQYWdlU2hlbGxBcGk7IGNsYXNzPzogc3RyaW5nOyB0aGVtZT86IFBhZ2VTaGVsbFRoZW1lUHJvcHMgfSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VQYWdlU2hlbGxUaGVtZSh0aGVtZSkpO1xuXG5cdGZ1bmN0aW9uIGlzQmFja1NuaXBwZXQoYmFjazogUGFnZVNoZWxsQmFjayk6IGJhY2sgaXMgUGFnZVNoZWxsUmVnaW9uIHtcblx0XHRyZXR1cm4gdHlwZW9mIGJhY2sgPT09ICdmdW5jdGlvbic7XG5cdH1cblxuXHRmdW5jdGlvbiBhc0JhY2tBY3Rpb24oYmFjazogUGFnZVNoZWxsQmFjayk6IFBhZ2VTaGVsbEFjdGlvbiB7XG5cdFx0cmV0dXJuIGJhY2sgYXMgUGFnZVNoZWxsQWN0aW9uO1xuXHR9XG48L3NjcmlwdD5cblxuPGhlYWRlclxuXHRkYXRhLXNsb3Q9XCJwYWdlLXNoZWxsLWhlYWRlclwiXG5cdGNsYXNzPXtjbGFzc2VzLmhlYWRlcih7IHNjcm9sbGVkOiBhcGkuaXNDb250ZW50U2Nyb2xsZWQsIGNsYXNzTmFtZSB9KX1cbj5cblx0eyNpZiBhcGkuaGVhZGVyfVxuXHRcdHtAcmVuZGVyIGFwaS5oZWFkZXIoYXBpKX1cblx0ezplbHNlfVxuXHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMuaGVhZGVySW5uZXIoKX0+XG5cdFx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLnRpdGxlU3RhY2soKX0+XG5cdFx0XHRcdHsjaWYgYXBpLmJhY2sgfHwgYXBpLmJyZWFkY3J1bWJzIHx8IGFwaS5leWVicm93fVxuXHRcdFx0XHRcdDxkaXYgZGF0YS1zbG90PVwicGFnZS1zaGVsbC1oZWFkZXItbWV0YVwiIGNsYXNzPXtjbGFzc2VzLm1ldGEoKX0+XG5cdFx0XHRcdFx0XHR7I2lmIGFwaS5iYWNrfVxuXHRcdFx0XHRcdFx0XHR7QGNvbnN0IGJhY2sgPSBhcGkuYmFja31cblx0XHRcdFx0XHRcdFx0eyNpZiBpc0JhY2tTbmlwcGV0KGJhY2spfVxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgZGF0YS1zbG90PVwicGFnZS1zaGVsbC1iYWNrXCIgY2xhc3M9e2NsYXNzZXMuYmFjaygpfT5cblx0XHRcdFx0XHRcdFx0XHRcdHtAcmVuZGVyIGJhY2soYXBpKX1cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0ezplbHNlfVxuXHRcdFx0XHRcdFx0XHRcdHtAY29uc3Qge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGVudDogYmFja0xhYmVsID0gJ0JhY2snLFxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWwsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmVmaXggPSBhcnJvd0xlZnRJY29uLFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyaWFudCA9ICdnaG9zdCcsXG5cdFx0XHRcdFx0XHRcdFx0XHRzaXplID0gJ3NtYWxsJyxcblx0XHRcdFx0XHRcdFx0XHRcdHNxdWFyZWQgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M6IGJ1dHRvbkNsYXNzLFxuXHRcdFx0XHRcdFx0XHRcdFx0Li4uYnV0dG9uUHJvcHNcblx0XHRcdFx0XHRcdFx0XHR9ID0gYXNCYWNrQWN0aW9uKGJhY2spfVxuXHRcdFx0XHRcdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRcdFx0XHRcdHsuLi5idXR0b25Qcm9wc31cblx0XHRcdFx0XHRcdFx0XHRcdHtwcmVmaXh9XG5cdFx0XHRcdFx0XHRcdFx0XHR7dmFyaWFudH1cblx0XHRcdFx0XHRcdFx0XHRcdHtzaXplfVxuXHRcdFx0XHRcdFx0XHRcdFx0e3NxdWFyZWR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5iYWNrKHsgY2xhc3NOYW1lOiBidXR0b25DbGFzcyB9KX1cblx0XHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtsYWJlbCA/PyBiYWNrTGFiZWx9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0XHRcdHsvaWZ9XG5cblx0XHRcdFx0XHRcdHsjaWYgYXBpLmJyZWFkY3J1bWJzfVxuXHRcdFx0XHRcdFx0XHR7I2lmIEFycmF5LmlzQXJyYXkoYXBpLmJyZWFkY3J1bWJzKX1cblx0XHRcdFx0XHRcdFx0XHQ8QnJlYWRjcnVtYnNcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1zPXthcGkuYnJlYWRjcnVtYnN9XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXhJdGVtcz17YXBpLmJyZWFkY3J1bWJzTWF4SXRlbXMgPz8gNH1cblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLmJyZWFkY3J1bWJzKCl9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0ezplbHNlfVxuXHRcdFx0XHRcdFx0XHRcdHtAcmVuZGVyIGFwaS5icmVhZGNydW1icyhhcGkpfVxuXHRcdFx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHRcdFx0ezplbHNlIGlmIGFwaS5leWVicm93fVxuXHRcdFx0XHRcdFx0XHQ8U2xvdCByZW5kZXI9e2FwaS5leWVicm93fSBwYXlsb2FkPXthcGl9IGNsYXNzPXtjbGFzc2VzLmV5ZWJyb3coKX0gLz5cblx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHsvaWZ9XG5cblx0XHRcdFx0PFNsb3Rcblx0XHRcdFx0XHRhcz1cImgxXCJcblx0XHRcdFx0XHRyZW5kZXI9e2FwaS50aXRsZX1cblx0XHRcdFx0XHRyZW5kZXJJZj17ISFhcGkudGl0bGV9XG5cdFx0XHRcdFx0cGF5bG9hZD17YXBpfVxuXHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnRpdGxlKCl9XG5cdFx0XHRcdC8+XG5cdFx0XHRcdDxTbG90XG5cdFx0XHRcdFx0YXM9XCJwXCJcblx0XHRcdFx0XHRyZW5kZXI9e2FwaS5zdWJ0aXRsZX1cblx0XHRcdFx0XHRyZW5kZXJJZj17ISFhcGkuc3VidGl0bGV9XG5cdFx0XHRcdFx0cGF5bG9hZD17YXBpfVxuXHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnN1YnRpdGxlKCl9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdHsjaWYgYXBpLmhlYWRlckFjdGlvbnN9XG5cdFx0XHRcdDxkaXYgZGF0YS1zbG90PVwicGFnZS1zaGVsbC1oZWFkZXItYWN0aW9uc1wiIGNsYXNzPXtjbGFzc2VzLmFjdGlvbnMoKX0+XG5cdFx0XHRcdFx0PFBhZ2VTaGVsbEFjdGlvbnNcblx0XHRcdFx0XHRcdHthcGl9XG5cdFx0XHRcdFx0XHRhY3Rpb25zPXthcGkuaGVhZGVyQWN0aW9uc31cblx0XHRcdFx0XHRcdGFjdGlvbk92ZXJmbG93PXthcGkuYWN0aW9uT3ZlcmZsb3cgPz8gJ2F1dG8nfVxuXHRcdFx0XHRcdFx0bW9iaWxlQWN0aW9uQ291bnQ9e2FwaS5tb2JpbGVBY3Rpb25Db3VudCA/PyAxfVxuXHRcdFx0XHRcdFx0e3RoZW1lfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0ey9pZn1cblx0XHQ8L2Rpdj5cblx0ey9pZn1cbjwvaGVhZGVyPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9QYWdlU2hlbGwvUGFnZVNoZWxsSGVhZGVyLnN2ZWx0ZSJ9