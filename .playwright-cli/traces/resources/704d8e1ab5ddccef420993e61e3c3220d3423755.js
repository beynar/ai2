import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Code/CodeTheme.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_legacy.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

CodeTheme[$.FILENAME] = 'src/lib/components/Code/CodeTheme.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";

function CodeTheme($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, false, CodeTheme);

	var $$exports = { ...$.legacy_api() };

	return $.pop($$exports);
}

if (import.meta.hot) {
	CodeTheme = $.hmr(CodeTheme);

	import.meta.hot.acceptExports(["default"],(module) => {
		$.cleanup_styles('svelte-1m26b0g');
		CodeTheme[$.HMR].update(module.default);
	});
}

export default CodeTheme;
import "/src/lib/components/Code/CodeTheme.svelte?svelte&type=style&lang.css";
