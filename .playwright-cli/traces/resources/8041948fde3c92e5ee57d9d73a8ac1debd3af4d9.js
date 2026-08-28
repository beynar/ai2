import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/.svelte-kit/generated/root.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Root[$.FILENAME] = '.svelte-kit/generated/root.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { setContext, onMount, tick } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { browser } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/app/env/index.js?v=1b1d2797";

var root = $.add_locations($.from_html(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`), Root[$.FILENAME], [[64, 1]]);
var root_1 = $.add_locations($.from_html(`<!> <!>`, 1), Root[$.FILENAME], []);

function Root($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Root);

	var $$ownership_validator = $.create_ownership_validator($$props);
	const __svelte_plugin_font_inline = "<style data-svelte-plugin-font>@font-face {\n  font-family: \"Fira Mono\";\n  src: url(\"https://fonts.gstatic.com/s/firamono/v16/N0bX2SlFPv1weGeLZDtgJv7Ss9XZYQ.woff2\") format(\"woff2\");\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: \"Fira Mono fallback\";\n  src: local(\"Courier New\");\n  size-adjust: 99.9837%;\n  ascent-override: 93.5152%;\n  descent-override: 26.5043%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Fira Mono fallback\";\n  src: local(\"Roboto Mono\");\n  size-adjust: 99.9837%;\n  ascent-override: 93.5152%;\n  descent-override: 26.5043%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Fira Mono fallback\";\n  src: local(\"Noto Sans Mono\");\n  size-adjust: 100%;\n  ascent-override: 93.5%;\n  descent-override: 26.5%;\n  line-gap-override: 0%;\n}\n\n\n@font-face {\n  font-family: \"Noto Sans\";\n  src: url(\"https://fonts.gstatic.com/s/notosans/v42/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5a7du3mhPy0.woff2\") format(\"woff2\");\n  font-weight: 100 900;\n  font-style: normal;\n  font-display: swap;\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: \"Noto Sans fallback\";\n  src: local(\"BlinkMacSystemFont\");\n  size-adjust: 113.8045%;\n  ascent-override: 93.9331%;\n  descent-override: 25.7459%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Noto Sans fallback\";\n  src: local(\"Segoe UI\");\n  size-adjust: 106.911%;\n  ascent-override: 99.9897%;\n  descent-override: 27.406%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Noto Sans fallback\";\n  src: local(\"Helvetica Neue\");\n  size-adjust: 105.3333%;\n  ascent-override: 101.4873%;\n  descent-override: 27.8165%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Noto Sans fallback\";\n  src: local(\"Arial\");\n  size-adjust: 106.3255%;\n  ascent-override: 100.5403%;\n  descent-override: 27.5569%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Noto Sans fallback\";\n  src: local(\"Noto Sans\");\n  size-adjust: 100%;\n  ascent-override: 106.9%;\n  descent-override: 29.3%;\n  line-gap-override: 0%;\n}\n\n\n@font-face {\n  font-family: \"Playfair Display\";\n  src: url(\"https://fonts.gstatic.com/s/playfairdisplay/v40/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2\") format(\"woff2\");\n  font-weight: 400 900;\n  font-style: normal;\n  font-display: swap;\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n@font-face {\n  font-family: \"Playfair Display fallback\";\n  src: local(\"Times New Roman\");\n  size-adjust: 111.2615%;\n  ascent-override: 97.2483%;\n  descent-override: 22.5595%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Playfair Display fallback\";\n  src: local(\"Georgia\");\n  size-adjust: 101.3906%;\n  ascent-override: 106.716%;\n  descent-override: 24.7558%;\n  line-gap-override: 0%;\n}\n\n@font-face {\n  font-family: \"Playfair Display fallback\";\n  src: local(\"Noto Serif\");\n  size-adjust: 93.9709%;\n  ascent-override: 115.142%;\n  descent-override: 26.7104%;\n  line-gap-override: 0%;\n}\n\n\n/* Per-font CSS variables. --font-<family> is always set (rewritten\n   font-family usages reference it). The category var (--font-sans/serif/\n   mono) is also set by default for Tailwind; set `cssVariable` to override. */\n:root {\n  --font-fira-mono: \"Fira Mono\", \"Fira Mono fallback\", \"Courier New\", \"Roboto Mono\", \"Noto Sans Mono\";\n  --font-mono: \"Fira Mono\", \"Fira Mono fallback\", \"Courier New\", \"Roboto Mono\", \"Noto Sans Mono\";\n  --font-noto-sans: \"Noto Sans\", \"Noto Sans fallback\", BlinkMacSystemFont, \"Segoe UI\", \"Helvetica Neue\", Arial, \"Noto Sans\";\n  --font-sans: \"Noto Sans\", \"Noto Sans fallback\", BlinkMacSystemFont, \"Segoe UI\", \"Helvetica Neue\", Arial, \"Noto Sans\";\n  --font-playfair-display: \"Playfair Display\", \"Playfair Display fallback\", \"Times New Roman\", Georgia, \"Noto Serif\";\n  --font-serif: \"Playfair Display\", \"Playfair Display fallback\", \"Times New Roman\", Georgia, \"Noto Serif\";\n}\n *{}</style>";

	// stores
	let components = $.prop($$props, 'components', 23, () => []),
		data_0 = $.prop($$props, 'data_0', 3, null),
		data_1 = $.prop($$props, 'data_1', 3, null);

	if (!browser) {
		// svelte-ignore state_referenced_locally
		setContext('__svelte__', $$props.stores);
	}

	if (browser) {
		$.user_pre_effect(() => $$props.stores.page.set($$props.page));
	} else {
		// svelte-ignore state_referenced_locally
		$$props.stores.page.set($$props.page);
	}

	$.user_effect(() => {
		$$props.stores;
		$$props.page;
		$$props.constructors;
		components();
		$$props.form;
		data_0();
		data_1();
		$$props.stores.page.notify();
	});

	let mounted = $.tag($.state(false), 'mounted');
	let navigated = $.tag($.state(false), 'navigated');
	let title = $.tag($.state(null), 'title');

	onMount(() => {
		const unsubscribe = $$props.stores.page.subscribe(() => {
			if ($.get(mounted)) {
				$.set(navigated, true);

				tick().then(() => {
					$.set(title, document.title || 'untitled page', true);
				});
			}
		});

		$.set(mounted, true);

		return unsubscribe;
	});

	const Pyramid_1 = $.tag($.derived(() => $$props.constructors[1]), 'Pyramid_1');
	var $$exports = { ...$.legacy_api() };
	var fragment_1 = root_1();

	$.head('ys5m6n', ($$anchor) => {
		var fragment = $.comment();
		var node = $.first_child(fragment);

		$.html(node, () => __svelte_plugin_font_inline);
		$.append($$anchor, fragment);
	});

	var node_1 = $.first_child(fragment_1);

	{
		var consequent = ($$anchor) => {
			const Pyramid_0 = $.tag($.derived(() => $$props.constructors[0]), 'Pyramid_0');

			$.get(Pyramid_0);

			var fragment_2 = $.comment();
			var node_2 = $.first_child(fragment_2);

			$.add_svelte_meta(
				() => $.component(node_2, () => $.get(Pyramid_0), ($$anchor, Pyramid_0_1) => {
					$.bind_this(
						Pyramid_0_1($$anchor, {
							get data() {
								return data_0();
							},

							get form() {
								return $$props.form;
							},

							get params() {
								return $$props.page.params;
							},

							children: $.wrap_snippet(Root, ($$anchor, $$slotProps) => {
								var fragment_3 = $.comment();
								var node_3 = $.first_child(fragment_3);

								$.add_svelte_meta(
									() => $.component(node_3, () => $.get(Pyramid_1), ($$anchor, Pyramid_1_1) => {
										$.bind_this(
											Pyramid_1_1($$anchor, {
												get data() {
													return data_1();
												},

												get form() {
													return $$props.form;
												},

												get params() {
													return $$props.page.params;
												}
											}),
											($$value) => $$ownership_validator.mutation('components', ['components', 1], components()[1] = $$value, 53, 32),
											() => components()?.[1]
										);
									}),
									'component',
									Root,
									53,
									10,
									{ componentTag: 'Pyramid_1' }
								);

								$.append($$anchor, fragment_3);
							}),
							$$slots: { default: true }
						}),
						($$value) => $$ownership_validator.mutation('components', ['components', 0], components()[0] = $$value, 51, 29),
						() => components()?.[0]
					);
				}),
				'component',
				Root,
				51,
				7,
				{ componentTag: 'Pyramid_0' }
			);

			$.append($$anchor, fragment_2);
		};

		var alternate = ($$anchor) => {
			const Pyramid_0 = $.tag($.derived(() => $$props.constructors[0]), 'Pyramid_0');

			$.get(Pyramid_0);

			var fragment_4 = $.comment();
			var node_4 = $.first_child(fragment_4);

			$.add_svelte_meta(
				() => $.component(node_4, () => $.get(Pyramid_0), ($$anchor, Pyramid_0_2) => {
					$.bind_this(
						Pyramid_0_2($$anchor, {
							get data() {
								return data_0();
							},

							get form() {
								return $$props.form;
							},

							get params() {
								return $$props.page.params;
							}
						}),
						($$value) => $$ownership_validator.mutation('components', ['components', 0], components()[0] = $$value, 59, 23),
						() => components()?.[0]
					);
				}),
				'component',
				Root,
				59,
				1,
				{ componentTag: 'Pyramid_0' }
			);

			$.append($$anchor, fragment_4);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($$props.constructors[1]) $$render(consequent); else $$render(alternate, -1);
			}),
			'if',
			Root,
			48,
			0
		);
	}

	var node_5 = $.sibling(node_1, 2);

	{
		var consequent_2 = ($$anchor) => {
			var div = root();
			var node_6 = $.child(div);

			{
				var consequent_1 = ($$anchor) => {
					var text = $.text();

					$.template_effect(() => $.set_text(text, $.get(title)));
					$.append($$anchor, text);
				};

				$.add_svelte_meta(
					() => $.if(node_6, ($$render) => {
						if ($.get(navigated)) $$render(consequent_1);
					}),
					'if',
					Root,
					65,
					2
				);
			}

			$.reset(div);
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node_5, ($$render) => {
				if ($.get(mounted)) $$render(consequent_2);
			}),
			'if',
			Root,
			63,
			0
		);
	}

	$.append($$anchor, fragment_1);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Root = $.hmr(Root);

	import.meta.hot.acceptExports(["default"],(module) => {
		Root[$.HMR].update(module.default);
	});
}

export default Root;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxRQUFRLFFBQVE7QUFDbEQsT0FBTyxFQUFFLE9BQU8sUUFBUSxVQUFVOzs7OztpQ0FIbkMsQ0FBQzs7Ozs7Q0FDQSxNQUFNLDJCQUEyQixHQUFHLHkrSUFBcStJOzs7Q0FLemdKLElBQUksQUFBOEIsVUFBVTtFQUFhLE1BQU0sZ0NBQUcsSUFBSTtFQUFFLE1BQU0sZ0NBQUcsSUFBSTs7Q0FFckYsRUFBRSxHQUFHLE9BQU8sRUFBRTs7RUFFYixVQUFVLENBQUMsWUFBWTtDQUN4Qjs7Q0FFQSxFQUFFLEVBQUUsT0FBTyxFQUFFO0VBQ1osaUJBQVcsc0JBQWMsSUFBSSxDQUFDLEdBQUc7Q0FDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7aUJBRUMsSUFBSSxDQUFDLEdBQUc7Q0FDaEI7O0NBQ0EsYUFBTyxPQUFPOzs7O0VBQ1ksVUFBVTs7RUFBTSxNQUFNO0VBQUMsTUFBTTtpQkFDL0MsSUFBSSxDQUFDLE1BQU07Q0FDbkIsQ0FBQzs7Q0FFRCxJQUFJLE9BQU8sU0FBRyxPQUFNLENBQUMsS0FBSztDQUMxQixJQUFJLFNBQVMsU0FBRyxPQUFNLENBQUMsS0FBSztDQUM1QixJQUFJLEtBQUssU0FBRyxPQUFNLENBQUMsSUFBSTs7Q0FFdkIsT0FBTyxPQUFPO0VBQ2IsTUFBTSxXQUFXLGtCQUFVLElBQUksQ0FBQyxTQUFTLE9BQU87R0FDL0MsRUFBRSxRQUFFLE9BQU8sR0FBRTtVQUNaLFNBQVMsRUFBRyxJQUFJOztJQUNoQixJQUFJLEdBQUcsSUFBSSxPQUFPO1dBQ2pCLEtBQUssRUFBRyxRQUFRLENBQUMsS0FBSyxJQUFJLGVBQWU7SUFDMUMsQ0FBQztHQUNGO0VBQ0QsQ0FBQzs7UUFFRCxPQUFPLEVBQUcsSUFBSTs7RUFDZCxNQUFNLENBQUMsV0FBVztDQUNuQixDQUFDOztDQUVELE1BQU0sU0FBUyw4Q0FBdUIsQ0FBQzs7OztDQXlCdkMsTUFBVzs7OztxQkFDTCwyQkFBMkI7Ozs7Ozs7O1NBdEJ6QixTQUFTLDhDQUFnQixDQUFDOztTQUExQixTQUFTOzs7Ozs7OztNQUVWLFdBQVM7O2VBQWlDLE1BQU07Ozs7Ozs7OzRCQUFzQixNQUFNOzs7Ozs7Ozs7O1dBRXpFLFdBQVM7O29CQUFpQyxNQUFNOzs7Ozs7OztpQ0FBc0IsTUFBTTs7O29GQUE1QyxDQUFDLEdBQVosVUFBVSxHQUFDLENBQUM7aUJBQVosVUFBVSxLQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OytFQUZKLENBQUMsR0FBWixVQUFVLEdBQUMsQ0FBQztZQUFaLFVBQVUsS0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztTQU1oQyxTQUFTLDhDQUFnQixDQUFDOztTQUExQixTQUFTOzs7Ozs7OztNQUVoQixXQUFTOztlQUFpQyxNQUFNOzs7Ozs7Ozs0QkFBc0IsTUFBTTs7OytFQUE1QyxDQUFDLEdBQVosVUFBVSxHQUFDLENBQUM7WUFBWixVQUFVLEtBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OzZCQVhqQixDQUFDOzs7Ozs7Ozs7Ozs7O09BZ0JqQixHQUFHO3dCQUFILEdBQUc7Ozs7OztvREFFRCxLQUFLOzs7Ozs7Z0JBREYsU0FBUzs7Ozs7Ozs7O1dBRGQsR0FBRztzQkFBSCxHQUFHOzs7OztjQURBLE9BQU87Ozs7Ozs7Ozs7OztBQWpCSiIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsicm9vdC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPCEtLSBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IEBzdmVsdGVqcy9raXQg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzdmVsdGU6b3B0aW9ucyBydW5lcz17dHJ1ZX0gLz5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQsIG9uTW91bnQsIHRpY2sgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBicm93c2VyIH0gZnJvbSAnJGFwcC9lbnYnO1xuXG5cdC8vIHN0b3Jlc1xuXHRsZXQgeyBzdG9yZXMsIHBhZ2UsIGNvbnN0cnVjdG9ycywgY29tcG9uZW50cyA9IFtdLCBmb3JtLCBkYXRhXzAgPSBudWxsLCBkYXRhXzEgPSBudWxsIH0gPSAkcHJvcHMoKTtcblxuXHRpZiAoIWJyb3dzZXIpIHtcblx0XHQvLyBzdmVsdGUtaWdub3JlIHN0YXRlX3JlZmVyZW5jZWRfbG9jYWxseVxuXHRcdHNldENvbnRleHQoJ19fc3ZlbHRlX18nLCBzdG9yZXMpO1xuXHR9XG5cblx0aWYgKGJyb3dzZXIpIHtcblx0XHQkZWZmZWN0LnByZSgoKSA9PiBzdG9yZXMucGFnZS5zZXQocGFnZSkpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIHN2ZWx0ZS1pZ25vcmUgc3RhdGVfcmVmZXJlbmNlZF9sb2NhbGx5XG5cdFx0c3RvcmVzLnBhZ2Uuc2V0KHBhZ2UpO1xuXHR9XG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdHN0b3JlcztwYWdlO2NvbnN0cnVjdG9ycztjb21wb25lbnRzO2Zvcm07ZGF0YV8wO2RhdGFfMTtcblx0XHRzdG9yZXMucGFnZS5ub3RpZnkoKTtcblx0fSk7XG5cblx0bGV0IG1vdW50ZWQgPSAkc3RhdGUoZmFsc2UpO1xuXHRsZXQgbmF2aWdhdGVkID0gJHN0YXRlKGZhbHNlKTtcblx0bGV0IHRpdGxlID0gJHN0YXRlKG51bGwpO1xuXG5cdG9uTW91bnQoKCkgPT4ge1xuXHRcdGNvbnN0IHVuc3Vic2NyaWJlID0gc3RvcmVzLnBhZ2Uuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGlmIChtb3VudGVkKSB7XG5cdFx0XHRcdG5hdmlnYXRlZCA9IHRydWU7XG5cdFx0XHRcdHRpY2soKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aXRsZSA9IGRvY3VtZW50LnRpdGxlIHx8ICd1bnRpdGxlZCBwYWdlJztcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRtb3VudGVkID0gdHJ1ZTtcblx0XHRyZXR1cm4gdW5zdWJzY3JpYmU7XG5cdH0pO1xuXG5cdGNvbnN0IFB5cmFtaWRfMT0kZGVyaXZlZChjb25zdHJ1Y3RvcnNbMV0pXG48L3NjcmlwdD5cblxueyNpZiBjb25zdHJ1Y3RvcnNbMV19XG5cdHtAY29uc3QgUHlyYW1pZF8wID0gY29uc3RydWN0b3JzWzBdfVxuXHRcdFx0XHRcdFx0XHQ8IS0tIHN2ZWx0ZS1pZ25vcmUgYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmUgLS0+XG5cdFx0XHRcdFx0XHRcdDxQeXJhbWlkXzAgYmluZDp0aGlzPXtjb21wb25lbnRzWzBdfSBkYXRhPXtkYXRhXzB9IHtmb3JtfSBwYXJhbXM9e3BhZ2UucGFyYW1zfT5cblx0XHRcdFx0XHRcdFx0XHQ8IS0tIHN2ZWx0ZS1pZ25vcmUgYmluZGluZ19wcm9wZXJ0eV9ub25fcmVhY3RpdmUgLS0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxQeXJhbWlkXzEgYmluZDp0aGlzPXtjb21wb25lbnRzWzFdfSBkYXRhPXtkYXRhXzF9IHtmb3JtfSBwYXJhbXM9e3BhZ2UucGFyYW1zfSAvPlxuXHRcdFx0XHRcdFx0XHQ8L1B5cmFtaWRfMD5cblxuezplbHNlfVxuXHR7QGNvbnN0IFB5cmFtaWRfMCA9IGNvbnN0cnVjdG9yc1swXX1cblx0PCEtLSBzdmVsdGUtaWdub3JlIGJpbmRpbmdfcHJvcGVydHlfbm9uX3JlYWN0aXZlIC0tPlxuXHQ8UHlyYW1pZF8wIGJpbmQ6dGhpcz17Y29tcG9uZW50c1swXX0gZGF0YT17ZGF0YV8wfSB7Zm9ybX0gcGFyYW1zPXtwYWdlLnBhcmFtc30gLz5cblxuey9pZn1cblxueyNpZiBtb3VudGVkfVxuXHQ8ZGl2IGlkPVwic3ZlbHRlLWFubm91bmNlclwiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyB0b3A6IDA7IGNsaXA6IHJlY3QoMCAwIDAgMCk7IGNsaXAtcGF0aDogaW5zZXQoNTAlKTsgb3ZlcmZsb3c6IGhpZGRlbjsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgd2lkdGg6IDFweDsgaGVpZ2h0OiAxcHhcIj5cblx0XHR7I2lmIG5hdmlnYXRlZH1cblx0XHRcdHt0aXRsZX1cblx0XHR7L2lmfVxuXHQ8L2Rpdj5cbnsvaWZ9Il0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyLy5zdmVsdGUta2l0L2dlbmVyYXRlZC9yb290LnN2ZWx0ZSIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=