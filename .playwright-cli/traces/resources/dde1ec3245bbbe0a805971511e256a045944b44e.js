import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Dialog/DialogBackdrop.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

DialogBackdrop[$.FILENAME] = 'src/lib/components/Dialog/DialogBackdrop.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { useTheme } from "/src/lib/components/Theme/theme.state.svelte.ts";
import { useDialogTheme } from "/src/lib/components/Dialog/dialog.theme.ts";
import { DIALOG_Z_BASE } from "/src/lib/components/Dialog/dialog.state.svelte.ts";
import { fso } from "/src/lib/transitions/transition.ts";
import { portal } from "/src/lib/attachments/portal.ts";
import { useScrollLock } from "/src/lib/utils/useScrollLock.svelte.ts";

var root = $.add_locations($.from_html(`<div class="fixed inset-0" aria-hidden="true"><div></div></div>`), DialogBackdrop[$.FILENAME], [[26, 1, [[27, 2]]]]);

function DialogBackdrop($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, DialogBackdrop);

	const theme = useTheme();
	const classes = $.tag($.derived(useDialogTheme), 'classes');
	const fade = fso();
	const isVisible = $.tag($.derived(() => theme.openDialogs.length > 0), 'isVisible');

	// Swipe-to-dismiss on the top drawer fades the backdrop with the drag; a snap-back
	// or dismissal animates it back via the opacity transition.
	const top = $.tag($.derived(() => theme.openDialogs.at(-1)), 'top');

	const dragOpacity = $.tag($.derived(() => $.get(top) && ($.get(top).dragging || $.get(top).dragProgress > 0) ? 1 - $.get(top).dragProgress : undefined), 'dragOpacity');

	useScrollLock({ isActive: () => theme.openDialogs.length > 0 });

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		var consequent = ($$anchor) => {
			var div = root();
			let styles;
			var div_1 = $.child(div);
			let styles_1;

			$.reset(div);
			$.attach(div, portal);

			$.template_effect(
				($0) => {
					styles = $.set_style(div, '', styles, { 'z-index': DIALOG_Z_BASE - 1 });
					$.set_class(div_1, 1, $0);

					styles_1 = $.set_style(div_1, '', styles_1, {
						opacity: $.get(dragOpacity),
						transition: $.get(top)?.dragging ? 'none' : 'opacity 200ms ease-out'
					});
				},
				[() => $.clsx($.get(classes).backdrop())]
			);

			$.transition(3, div_1, () => fade, () => ({ opacity: 0, duration: 200 }));
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node, ($$render) => {
				if ($.get(isVisible)) $$render(consequent);
			}),
			'if',
			DialogBackdrop,
			25,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	DialogBackdrop = $.hmr(DialogBackdrop);

	import.meta.hot.acceptExports(["default"],(module) => {
		DialogBackdrop[$.HMR].update(module.default);
	});
}

export default DialogBackdrop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxFQUFFLFFBQVEsUUFBUSxnQ0FBZ0M7QUFDekQsT0FBTyxFQUFFLGNBQWMsUUFBUSxtQkFBbUI7QUFDbEQsT0FBTyxFQUFFLGFBQWEsUUFBUSwwQkFBMEI7QUFDeEQsT0FBTyxFQUFFLEdBQUcsUUFBUSxnQ0FBZ0M7QUFDcEQsT0FBTyxFQUFFLE1BQU0sUUFBUSw0QkFBNEI7QUFDbkQsT0FBTyxFQUFFLGFBQWEsUUFBUSxvQ0FBb0M7Ozs7MkNBTm5FLENBQUM7Ozs7Q0FRQSxNQUFNLEtBQUssR0FBRyxRQUFRO0NBQ3RCLE1BQU0sT0FBTyxtQkFBWSxjQUFjO0NBQ3ZDLE1BQU0sSUFBSSxHQUFHLEdBQUc7Q0FFaEIsTUFBTSxTQUFTLHlCQUFZLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7Ozs7Q0FJdkQsTUFBTSxHQUFHLHlCQUFZLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUM7O0NBQzVDLE1BQU0sV0FBVywrQkFDaEIsR0FBRyxZQUFLLEdBQUcsRUFBQyxRQUFRLFVBQUksR0FBRyxFQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFHLEdBQUcsRUFBQyxZQUFZLEdBQUc7O0NBR3hFLGFBQWEsR0FBRyxRQUFRLFFBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7Ozs7T0FJM0QsR0FBRzs7T0FDRixnQkFERCxHQUFHOzs7V0FBSCxHQUFHO1lBQUgsR0FBRyxFQUFVLE1BQU07Ozs7MEJBQW5CLEdBQUcsMkJBQXlELGFBQWEsR0FBRyxDQUFDO2lCQUM1RTs7NEJBQUE7cUJBRWUsV0FBVzt3QkFDUixHQUFHLEdBQUUsUUFBUSxHQUFHLE1BQU0sR0FBRyx3QkFBd0I7Ozt3QkFGNUQsT0FBTyxFQUFDLFFBQVE7OzttQkFEdkIsNEJBSW1CLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUc7c0JBTDdDLEdBQUc7Ozs7O2NBREEsU0FBUzs7Ozs7Ozs7Ozs7O0FBRk4iLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkRpYWxvZ0JhY2tkcm9wLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJy4uL1RoZW1lL3RoZW1lLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IHVzZURpYWxvZ1RoZW1lIH0gZnJvbSAnLi9kaWFsb2cudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBESUFMT0dfWl9CQVNFIH0gZnJvbSAnLi9kaWFsb2cuc3RhdGUuc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgZnNvIH0gZnJvbSAnJGxpYi90cmFuc2l0aW9ucy90cmFuc2l0aW9uLmpzJztcblx0aW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAnJGxpYi9hdHRhY2htZW50cy9wb3J0YWwuanMnO1xuXHRpbXBvcnQgeyB1c2VTY3JvbGxMb2NrIH0gZnJvbSAnJGxpYi91dGlscy91c2VTY3JvbGxMb2NrLnN2ZWx0ZS5qcyc7XG5cblx0Y29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlRGlhbG9nVGhlbWUoKSk7XG5cdGNvbnN0IGZhZGUgPSBmc28oKTtcblxuXHRjb25zdCBpc1Zpc2libGUgPSAkZGVyaXZlZCh0aGVtZS5vcGVuRGlhbG9ncy5sZW5ndGggPiAwKTtcblxuXHQvLyBTd2lwZS10by1kaXNtaXNzIG9uIHRoZSB0b3AgZHJhd2VyIGZhZGVzIHRoZSBiYWNrZHJvcCB3aXRoIHRoZSBkcmFnOyBhIHNuYXAtYmFja1xuXHQvLyBvciBkaXNtaXNzYWwgYW5pbWF0ZXMgaXQgYmFjayB2aWEgdGhlIG9wYWNpdHkgdHJhbnNpdGlvbi5cblx0Y29uc3QgdG9wID0gJGRlcml2ZWQodGhlbWUub3BlbkRpYWxvZ3MuYXQoLTEpKTtcblx0Y29uc3QgZHJhZ09wYWNpdHkgPSAkZGVyaXZlZChcblx0XHR0b3AgJiYgKHRvcC5kcmFnZ2luZyB8fCB0b3AuZHJhZ1Byb2dyZXNzID4gMCkgPyAxIC0gdG9wLmRyYWdQcm9ncmVzcyA6IHVuZGVmaW5lZFxuXHQpO1xuXG5cdHVzZVNjcm9sbExvY2soeyBpc0FjdGl2ZTogKCkgPT4gdGhlbWUub3BlbkRpYWxvZ3MubGVuZ3RoID4gMCB9KTtcbjwvc2NyaXB0PlxuXG57I2lmIGlzVmlzaWJsZX1cblx0PGRpdiB7QGF0dGFjaCBwb3J0YWwoKX0gY2xhc3M9XCJmaXhlZCBpbnNldC0wXCIgc3R5bGU6ei1pbmRleD17RElBTE9HX1pfQkFTRSAtIDF9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdDxkaXZcblx0XHRcdGNsYXNzPXtjbGFzc2VzLmJhY2tkcm9wKCl9XG5cdFx0XHRzdHlsZTpvcGFjaXR5PXtkcmFnT3BhY2l0eX1cblx0XHRcdHN0eWxlOnRyYW5zaXRpb249e3RvcD8uZHJhZ2dpbmcgPyAnbm9uZScgOiAnb3BhY2l0eSAyMDBtcyBlYXNlLW91dCd9XG5cdFx0XHR0cmFuc2l0aW9uOmZhZGU9e3sgb3BhY2l0eTogMCwgZHVyYXRpb246IDIwMCB9fVxuXHRcdD48L2Rpdj5cblx0PC9kaXY+XG57L2lmfVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9EaWFsb2cvRGlhbG9nQmFja2Ryb3Auc3ZlbHRlIn0=