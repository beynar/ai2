import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Sidebar/SidebarIcon.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarIcon[$.FILENAME] = 'src/lib/components/Sidebar/SidebarIcon.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";

var root = $.add_locations($.from_html(`<span> </span>`), SidebarIcon[$.FILENAME], [[9, 1]]);

function SidebarIcon($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarIcon);

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var span = root();
			var text = $.child(span, true);

			$.reset(span);

			$.template_effect(() => {
				$.set_class(span, 1, $.clsx($$props.class));
				$.set_text(text, $$props.icon);
			});

			$.append($$anchor, span);
		};

		var consequent_1 = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			$.add_svelte_meta(
				() => Slot(node_1, {
					get render() {
						return $$props.icon;
					},

					get class() {
						return $$props.class;
					}
				}),
				'component',
				SidebarIcon,
				11,
				1,
				{ componentTag: 'Slot' }
			);

			$.append($$anchor, fragment_1);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.strict_equals(typeof $$props.icon, 'string')) $$render(consequent); else if ($$props.icon) $$render(consequent_1, 1);
			}),
			'if',
			SidebarIcon,
			8,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarIcon = $.hmr(SidebarIcon);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarIcon[$.HMR].update(module.default);
	});
}

export default SidebarIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxJQUFJLE1BQU0sa0NBQWtDOzs7O3dDQURwRCxDQUFDOzs7Ozs7Ozs7O09BUUMsSUFBSTtzQkFBSixJQUFJOztXQUFKLElBQUk7OztnQkFBSixJQUFJOzs7O3NCQUFKLElBQUk7Ozs7Ozs7O1VBRUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZDQUhlLFFBQVE7Ozs7Ozs7Ozs7OztBQUZyQiIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiU2lkZWJhckljb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBTbG90IGZyb20gJyRsaWIvY29tcG9uZW50cy9TbG90L1Nsb3Quc3ZlbHRlJztcblx0aW1wb3J0IHR5cGUgeyBTaWRlYmFySWNvbiB9IGZyb20gJy4vc2lkZWJhci5wcm9wcy5qcyc7XG5cblx0bGV0IHsgaWNvbiwgY2xhc3M6IGNsYXNzTmFtZSB9OiB7IGljb24/OiBTaWRlYmFySWNvbjsgY2xhc3M/OiBzdHJpbmcgfSA9ICRwcm9wcygpO1xuPC9zY3JpcHQ+XG5cbnsjaWYgdHlwZW9mIGljb24gPT09ICdzdHJpbmcnfVxuXHQ8c3BhbiBjbGFzcz17Y2xhc3NOYW1lfT57aWNvbn08L3NwYW4+XG57OmVsc2UgaWYgaWNvbn1cblx0PFNsb3QgcmVuZGVyPXtpY29ufSBjbGFzcz17Y2xhc3NOYW1lfSAvPlxuey9pZn1cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU2lkZWJhci9TaWRlYmFySWNvbi5zdmVsdGUifQ==