import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte?v=1b1d2797");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Error[$.FILENAME] = 'node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { page } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/app/state/index.js?v=1b1d2797";

var root = $.add_locations($.from_html(`<h1> </h1> <p> </p>`, 1), Error[$.FILENAME], [[7, 0], [8, 0]]);

function Error($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Error);

	var $$exports = { ...$.legacy_api() };
	var fragment = root();
	var h1 = $.first_child(fragment);
	var text = $.child(h1, true);

	$.reset(h1);

	var p = $.sibling(h1, 2);
	var text_1 = $.child(p, true);

	$.reset(p);

	$.template_effect(() => {
		$.set_text(text, page.status);
		$.set_text(text_1, page.error?.message);
	});

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Error = $.hmr(Error);

	import.meta.hot.acceptExports(["default"],(module) => {
		Error[$.HMR].update(module.default);
	});
}

export default Error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0MsT0FBTyxFQUFFLElBQUksUUFBUSxZQUFZOzs7O2tDQURsQyxDQUFDOzs7Ozs7S0FJQSxFQUFFO29CQUFGLEVBQUU7O1NBQUYsRUFBRTs7S0FDRixDQUFDLGFBREQsRUFBRTtzQkFDRixDQUFDOztTQUFELENBQUM7OzttQkFERyxJQUFJLENBQUMsTUFBTTtxQkFDWixJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU87Ozs7OztBQUhmIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJlcnJvci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHN2ZWx0ZTpvcHRpb25zIHJ1bmVzPXt0cnVlfSAvPlxuXG48c2NyaXB0PlxuXHRpbXBvcnQgeyBwYWdlIH0gZnJvbSAnJGFwcC9zdGF0ZSc7XG48L3NjcmlwdD5cblxuPGgxPntwYWdlLnN0YXR1c308L2gxPlxuPHA+e3BhZ2UuZXJyb3I/Lm1lc3NhZ2V9PC9wPlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3ZlbHRlanMra2l0QDIuNjkuMF9Ac3ZlbHRlanMrdml0ZS1wbHVnaW4tc3ZlbHRlQDcuMS4yX3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW5fM2I5MDBkZTBjYTgwMjNlNzRmZmZkNzE2OTQ5ODU5Mzgvbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUvY29tcG9uZW50cy9zdmVsdGUtNS9lcnJvci5zdmVsdGUiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19