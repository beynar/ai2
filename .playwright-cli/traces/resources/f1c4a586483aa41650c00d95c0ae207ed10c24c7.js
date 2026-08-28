import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Utils/BeforeHydratation.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

BeforeHydratation[$.FILENAME] = 'src/lib/components/Utils/BeforeHydratation.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";

var root = $.add_locations($.from_html(`<!> <!>`, 1), BeforeHydratation[$.FILENAME], []);

function BeforeHydratation($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, BeforeHydratation);

	let once = $.prop($$props, 'once', 3, false),
		scripts = $.prop($$props, 'scripts', 19, () => []),
		css = $.prop($$props, 'css', 19, () => []);

	var $$exports = { ...$.legacy_api() };

	$.head('h7z4q6', ($$anchor) => {
		var fragment = root();
		var node = $.first_child(fragment);

		$.html(node, () => `<s${'cript'} id="${id}">
		document.addEventListener('DOMContentLoaded', () => {
        	${scripts().map((script) => {
			return `${script}`;
		}).join('\n')}
	${once() ? `document.getElementById('${id}').remove();` : ''}
		})
						// if readyState is complete, execute the scripts directly
	if(document.readyState === 'complete') {
		${scripts().map((script) => {
			return `${script}`;
		}).join('\n')}
	${once() ? `document.getElementById('${id}').remove();` : ''}
	}
	
	</s${'cript'}>`);

		var node_1 = $.sibling(node, 2);

		$.html(node_1, () => `<s${'tyle'}>
            ${css().join('\n\n')}
        </s${'tyle'}>`);

		$.append($$anchor, fragment);
	});

	return $.pop($$exports);
}

if (import.meta.hot) {
	BeforeHydratation = $.hmr(BeforeHydratation);

	import.meta.hot.acceptExports(["default"],(module) => {
		BeforeHydratation[$.HMR].update(module.default);
	});
}

export default BeforeHydratation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzhDQUFBLENBQUM7T0FZTSxFQUFFOzs7OztDQVZSLElBQUksQUFDSCxJQUFJLDhCQUFHLEtBQUs7RUFDWixPQUFPO0VBQ1AsR0FBRzs7OztDQVVKLE1BQVc7Ozs7MEJBQ1UsT0FBTyxRQUFRLEVBQUU7O1dBRTVCLFVBQ0osR0FBRyxFQUFFLE1BQU0sS0FBSztHQUNoQixNQUFNLElBQUksTUFBTTtFQUNqQixDQUFDLEVBQ0EsSUFBSSxDQUFDLElBQUk7R0FDYixJQUFJLGlDQUErQixFQUFFLGlCQUFpQixFQUFFOzs7O0lBSXZELFVBQ0EsR0FBRyxFQUFFLE1BQU0sS0FBSztHQUNoQixNQUFNLElBQUksTUFBTTtFQUNqQixDQUFDLEVBQ0EsSUFBSSxDQUFDLElBQUk7R0FDVixJQUFJLGlDQUErQixFQUFFLGlCQUFpQixFQUFFOzs7TUFHckQsT0FBTzs7Ozs0QkFDQSxNQUFNO2NBQ0wsR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNO2FBQ2hCLE1BQU07Ozs7OztBQXpCWCIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQmVmb3JlSHlkcmF0YXRpb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdHR5cGUgRXhlY3V0ZSA9IHN0cmluZ1tdO1xuXHRsZXQge1xuXHRcdG9uY2UgPSBmYWxzZSxcblx0XHRzY3JpcHRzID0gW10sXG5cdFx0Y3NzID0gW11cblx0fToge1xuXHRcdG9uY2U/OiBib29sZWFuO1xuXHRcdHNjcmlwdHM/OiBzdHJpbmdbXTtcblx0XHRjc3M/OiBzdHJpbmdbXTtcblx0fSA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGlkID0gJHByb3BzLmlkKCk7XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuXHR7QGh0bWwgLypodG1sKi8gYDxzJHsnY3JpcHQnfSBpZD1cIiR7aWR9XCI+XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgXHQke3NjcmlwdHNcblx0XHRcdFx0XHRcdC5tYXAoKHNjcmlwdCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYCR7c2NyaXB0fWA7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpfVxuXHQke29uY2UgPyBgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyR7aWR9JykucmVtb3ZlKCk7YCA6ICcnfVxuXHRcdH0pXG5cdFx0XHRcdFx0XHQvLyBpZiByZWFkeVN0YXRlIGlzIGNvbXBsZXRlLCBleGVjdXRlIHRoZSBzY3JpcHRzIGRpcmVjdGx5XG5cdGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcblx0XHQke3NjcmlwdHNcblx0XHRcdC5tYXAoKHNjcmlwdCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYCR7c2NyaXB0fWA7XG5cdFx0XHR9KVxuXHRcdFx0LmpvaW4oJ1xcbicpfVxuXHQke29uY2UgPyBgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyR7aWR9JykucmVtb3ZlKCk7YCA6ICcnfVxuXHR9XG5cdFxuXHQ8L3MkeydjcmlwdCd9PmB9XG5cdHtAaHRtbCBgPHMkeyd0eWxlJ30+XG4gICAgICAgICAgICAke2Nzcy5qb2luKCdcXG5cXG4nKX1cbiAgICAgICAgPC9zJHsndHlsZSd9PmB9XG48L3N2ZWx0ZTpoZWFkPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9VdGlscy9CZWZvcmVIeWRyYXRhdGlvbi5zdmVsdGUifQ==