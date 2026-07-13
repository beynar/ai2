import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Menu/Menu.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Menu[$.FILENAME] = 'src/lib/components/Menu/Menu.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { usePopoverContext } from "/src/lib/components/Popover/popover.state.svelte.ts";
import MenuFloating from "/src/lib/components/Menu/MenuFloating.svelte?t=1783864665558";
import MenuStacked from "/src/lib/components/Menu/MenuStacked.svelte?t=1783864665558";

var rest_excludes = new Set(['$$slots', '$$events', '$$legacy', 'submenuMode']);

function Menu($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Menu);

	let submenuMode = $.prop($$props, 'submenuMode', 3, 'auto'),
		menuProps = $.rest_props($$props, rest_excludes, 'menuProps');

	const parentPopover = usePopoverContext();

	const resolvedSubmenuMode = $.tag(
		$.derived(() => $.strict_equals(submenuMode(), 'auto')
			? parentPopover?.isMobileSheet ? 'stack' : 'popover'
			: submenuMode()),
		'resolvedSubmenuMode'
	);

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			$.add_svelte_meta(() => MenuStacked(node_1, $.spread_props(() => menuProps)), 'component', Menu, 16, 1, { componentTag: 'MenuStacked' });
			$.append($$anchor, fragment_1);
		};

		var alternate = ($$anchor) => {
			var fragment_2 = $.comment();
			var node_2 = $.first_child(fragment_2);

			$.add_svelte_meta(() => MenuFloating(node_2, $.spread_props(() => menuProps)), 'component', Menu, 18, 1, { componentTag: 'MenuFloating' });
			$.append($$anchor, fragment_2);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.strict_equals($.get(resolvedSubmenuMode), 'stack')) $$render(consequent); else $$render(alternate, -1);
			}),
			'if',
			Menu,
			15,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Menu = $.hmr(Menu);

	import.meta.hot.acceptExports(["default"],(module) => {
		Menu[$.HMR].update(module.default);
	});
}

export default Menu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLGlCQUFpQixRQUFRLG9DQUFvQztBQUN0RSxPQUFPLFlBQVksTUFBTSx1QkFBdUI7QUFDaEQsT0FBTyxXQUFXLE1BQU0sc0JBQXNCOzs7O2lDQUgvQyxDQUFDOzs7O0NBTUEsSUFBSSxBQUFFLFdBQVcscUNBQUcsTUFBTTtFQUFLLFNBQVM7O0NBRXhDLE1BQU0sYUFBYSxHQUFHLGlCQUFpQjs7Q0FDdkMsTUFBTSxtQkFBbUI7a0NBQ3hCLFdBQVcsSUFBSyxNQUFNO0tBQUksYUFBYSxFQUFFLGFBQWEsR0FBRyxPQUFPLEdBQUcsU0FBUztLQUFJOzs7Ozs7Ozs7Ozs7OzJCQUtoRixXQUFXLDhCQUFLLFNBQVM7Ozs7Ozs7OzJCQUV6QixZQUFZLDhCQUFLLFNBQVM7Ozs7Ozs4QkFIdkIsbUJBQW1CLEdBQUssT0FBTzs7Ozs7Ozs7Ozs7O0FBRjVCIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJNZW51LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyB1c2VQb3BvdmVyQ29udGV4dCB9IGZyb20gJy4uL1BvcG92ZXIvcG9wb3Zlci5zdGF0ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgTWVudUZsb2F0aW5nIGZyb20gJy4vTWVudUZsb2F0aW5nLnN2ZWx0ZSc7XG5cdGltcG9ydCBNZW51U3RhY2tlZCBmcm9tICcuL01lbnVTdGFja2VkLnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgTWVudVByb3BzIH0gZnJvbSAnLi9tZW51LnByb3BzLmpzJztcblxuXHRsZXQgeyBzdWJtZW51TW9kZSA9ICdhdXRvJywgLi4ubWVudVByb3BzIH06IE1lbnVQcm9wcyA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IHBhcmVudFBvcG92ZXIgPSB1c2VQb3BvdmVyQ29udGV4dCgpO1xuXHRjb25zdCByZXNvbHZlZFN1Ym1lbnVNb2RlID0gJGRlcml2ZWQoXG5cdFx0c3VibWVudU1vZGUgPT09ICdhdXRvJyA/IChwYXJlbnRQb3BvdmVyPy5pc01vYmlsZVNoZWV0ID8gJ3N0YWNrJyA6ICdwb3BvdmVyJykgOiBzdWJtZW51TW9kZVxuXHQpO1xuPC9zY3JpcHQ+XG5cbnsjaWYgcmVzb2x2ZWRTdWJtZW51TW9kZSA9PT0gJ3N0YWNrJ31cblx0PE1lbnVTdGFja2VkIHsuLi5tZW51UHJvcHN9IC8+XG57OmVsc2V9XG5cdDxNZW51RmxvYXRpbmcgey4uLm1lbnVQcm9wc30gLz5cbnsvaWZ9XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL01lbnUvTWVudS5zdmVsdGUifQ==