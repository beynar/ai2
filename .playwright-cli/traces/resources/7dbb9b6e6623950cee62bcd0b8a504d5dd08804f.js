import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/CustomizeTheme.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

CustomizeTheme[$.FILENAME] = 'src/routes/CustomizeTheme.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Button from "/src/lib/components/Button/Button.svelte";
import Code from "/src/lib/components/Code/Code.svelte";
import Dialog from "/src/lib/components/Dialog/Dialog.svelte";
import { buildThemeSnippet } from "/src/routes/themeSnippet.ts?t=1783864636289";

var root = $.add_locations($.from_html(`<div class="flex flex-col gap-4"><div class="border-background-muted inline-flex w-fit gap-1 self-start rounded-lg border p-1"><!> <!></div> <!></div>`), CustomizeTheme[$.FILENAME], [[20, 1, [[21, 2]]]]);

function CustomizeTheme($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, CustomizeTheme);

	let mode = $.tag($.state('default'), 'mode');
	const snippet = $.tag($.derived(() => buildThemeSnippet($$props.component, $.get(mode))), 'snippet');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	$.add_svelte_meta(
		() => Dialog(node, {
			type: 'modal',
			size: 'large',
			get title() {
				return `Customize the ${$$props.component ?? ''} theme`;
			},

			get description() {
				return `Copy a ready-to-use override for the set${$$props.component ?? ''}Theme method. Full ships the current default classes; empty gives a blank scaffold to fill in.`;
			},

			trigger: {
				content: 'Customize',
				variant: 'outline',
				color: 'foreground',
				size: 'small'
			},

			children: $.wrap_snippet(CustomizeTheme, ($$anchor, $$slotProps) => {
				var div = root();
				var div_1 = $.child(div);
				var node_1 = $.child(div_1);

				{
					let $0 = $.derived(() => $.strict_equals($.get(mode), 'default') ? 'solid' : 'ghost');

					$.add_svelte_meta(
						() => Button(node_1, {
							size: 'small',
							get variant() {
								return $.get($0);
							},
							color: 'foreground',
							onClick: () => $.set(mode, 'default'),
							children: $.wrap_snippet(CustomizeTheme, ($$anchor, $$slotProps) => {
								$.next();

								var text = $.text('Full default');

								$.append($$anchor, text);
							}),
							$$slots: { default: true }
						}),
						'component',
						CustomizeTheme,
						22,
						3,
						{ componentTag: 'Button' }
					);
				}

				var node_2 = $.sibling(node_1, 2);

				{
					let $0 = $.derived(() => $.strict_equals($.get(mode), 'empty') ? 'solid' : 'ghost');

					$.add_svelte_meta(
						() => Button(node_2, {
							size: 'small',
							get variant() {
								return $.get($0);
							},
							color: 'foreground',
							onClick: () => $.set(mode, 'empty'),
							children: $.wrap_snippet(CustomizeTheme, ($$anchor, $$slotProps) => {
								$.next();

								var text_1 = $.text('Empty scaffold');

								$.append($$anchor, text_1);
							}),
							$$slots: { default: true }
						}),
						'component',
						CustomizeTheme,
						30,
						3,
						{ componentTag: 'Button' }
					);
				}

				$.reset(div_1);

				var node_3 = $.sibling(div_1, 2);

				$.add_svelte_meta(
					() => Code(node_3, {
						language: 'typescript',
						get code() {
							return $.get(snippet);
						},
						maxHeight: 440,
						showLineNumbers: true
					}),
					'component',
					CustomizeTheme,
					40,
					2,
					{ componentTag: 'Code' }
				);

				$.reset(div);
				$.append($$anchor, div);
			}),
			$$slots: { default: true }
		}),
		'component',
		CustomizeTheme,
		13,
		0,
		{ componentTag: 'Dialog' }
	);

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	CustomizeTheme = $.hmr(CustomizeTheme);

	import.meta.hot.acceptExports(["default"],(module) => {
		CustomizeTheme[$.HMR].update(module.default);
	});
}

export default CustomizeTheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxNQUFNLE1BQU0sc0NBQXNDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLGtDQUFrQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0M7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixRQUErQixtQkFBbUI7Ozs7MkNBSjdFLENBQUM7Ozs7Q0FRQSxJQUFJLElBQUksU0FBRyxPQUFNLENBQW1CLFNBQVM7Q0FDN0MsTUFBTSxPQUFPLHlCQUFZLGlCQUFpQiwwQkFBWSxJQUFJOzs7Ozs7UUFHMUQ7Ozs7Ozs7Ozs7OztJQUtXLE9BQU8sRUFBRSxXQUFXO0lBQUUsT0FBTyxFQUFFLFNBQVM7SUFBRSxLQUFLLEVBQUUsWUFBWTtJQUFFLElBQUksRUFBRSxPQUFPOzs7O1FBRXRGLEdBQUc7UUFDRixLQUFHLFdBREosR0FBRzt5QkFDRixLQUFHOzs7b0RBR08sSUFBSSxHQUFLLFNBQVMsSUFBRyxPQUFPLEdBQUcsT0FBTzs7O1lBRi9DOzs7Ozs7NEJBSWdCLElBQUksRUFBRyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0RBTXZCLElBQUksR0FBSyxPQUFPLElBQUcsT0FBTyxHQUFHLE9BQU87OztZQUY3Qzs7Ozs7OzRCQUlnQixJQUFJLEVBQUcsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBYi9CLEtBQUc7OzJCQUFILEtBQUc7OztXQW1CSCxJQUFJOzs7b0JBQTZCLE9BQU87O2lCQUFhLEdBQUc7Ozs7Ozs7Ozs7WUFwQnpELEdBQUc7dUJBQUgsR0FBRzs7Ozs7Ozs7Ozs7Ozs7QUFURyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ3VzdG9taXplVGhlbWUuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBCdXR0b24gZnJvbSAnJGxpYi9jb21wb25lbnRzL0J1dHRvbi9CdXR0b24uc3ZlbHRlJztcblx0aW1wb3J0IENvZGUgZnJvbSAnJGxpYi9jb21wb25lbnRzL0NvZGUvQ29kZS5zdmVsdGUnO1xuXHRpbXBvcnQgRGlhbG9nIGZyb20gJyRsaWIvY29tcG9uZW50cy9EaWFsb2cvRGlhbG9nLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IGJ1aWxkVGhlbWVTbmlwcGV0LCB0eXBlIFRoZW1lU25pcHBldE1vZGUgfSBmcm9tICcuL3RoZW1lU25pcHBldC5qcyc7XG5cblx0bGV0IHsgY29tcG9uZW50IH06IHsgY29tcG9uZW50OiBzdHJpbmcgfSA9ICRwcm9wcygpO1xuXG5cdGxldCBtb2RlID0gJHN0YXRlPFRoZW1lU25pcHBldE1vZGU+KCdkZWZhdWx0Jyk7XG5cdGNvbnN0IHNuaXBwZXQgPSAkZGVyaXZlZChidWlsZFRoZW1lU25pcHBldChjb21wb25lbnQsIG1vZGUpKTtcbjwvc2NyaXB0PlxuXG48RGlhbG9nXG5cdHR5cGU9XCJtb2RhbFwiXG5cdHNpemU9XCJsYXJnZVwiXG5cdHRpdGxlPVwiQ3VzdG9taXplIHRoZSB7Y29tcG9uZW50fSB0aGVtZVwiXG5cdGRlc2NyaXB0aW9uPVwiQ29weSBhIHJlYWR5LXRvLXVzZSBvdmVycmlkZSBmb3IgdGhlIHNldHtjb21wb25lbnR9VGhlbWUgbWV0aG9kLiBGdWxsIHNoaXBzIHRoZSBjdXJyZW50IGRlZmF1bHQgY2xhc3NlczsgZW1wdHkgZ2l2ZXMgYSBibGFuayBzY2FmZm9sZCB0byBmaWxsIGluLlwiXG5cdHRyaWdnZXI9e3sgY29udGVudDogJ0N1c3RvbWl6ZScsIHZhcmlhbnQ6ICdvdXRsaW5lJywgY29sb3I6ICdmb3JlZ3JvdW5kJywgc2l6ZTogJ3NtYWxsJyB9fVxuPlxuXHQ8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuXHRcdDxkaXYgY2xhc3M9XCJib3JkZXItYmFja2dyb3VuZC1tdXRlZCBpbmxpbmUtZmxleCB3LWZpdCBnYXAtMSBzZWxmLXN0YXJ0IHJvdW5kZWQtbGcgYm9yZGVyIHAtMVwiPlxuXHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRzaXplPVwic21hbGxcIlxuXHRcdFx0XHR2YXJpYW50PXttb2RlID09PSAnZGVmYXVsdCcgPyAnc29saWQnIDogJ2dob3N0J31cblx0XHRcdFx0Y29sb3I9XCJmb3JlZ3JvdW5kXCJcblx0XHRcdFx0b25DbGljaz17KCkgPT4gKG1vZGUgPSAnZGVmYXVsdCcpfVxuXHRcdFx0PlxuXHRcdFx0XHRGdWxsIGRlZmF1bHRcblx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRzaXplPVwic21hbGxcIlxuXHRcdFx0XHR2YXJpYW50PXttb2RlID09PSAnZW1wdHknID8gJ3NvbGlkJyA6ICdnaG9zdCd9XG5cdFx0XHRcdGNvbG9yPVwiZm9yZWdyb3VuZFwiXG5cdFx0XHRcdG9uQ2xpY2s9eygpID0+IChtb2RlID0gJ2VtcHR5Jyl9XG5cdFx0XHQ+XG5cdFx0XHRcdEVtcHR5IHNjYWZmb2xkXG5cdFx0XHQ8L0J1dHRvbj5cblx0XHQ8L2Rpdj5cblxuXHRcdDxDb2RlIGxhbmd1YWdlPVwidHlwZXNjcmlwdFwiIGNvZGU9e3NuaXBwZXR9IG1heEhlaWdodD17NDQwfSBzaG93TGluZU51bWJlcnMgLz5cblx0PC9kaXY+XG48L0RpYWxvZz5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvcm91dGVzL0N1c3RvbWl6ZVRoZW1lLnN2ZWx0ZSJ9