import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Tooltip/Tooltip.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Tooltip[$.FILENAME] = 'src/lib/components/Tooltip/Tooltip.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Popover from "/src/lib/components/Popover/Popover.svelte";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useTheme } from "/src/lib/components/Theme/theme.state.svelte.ts";
import { useTooltipTheme } from "/src/lib/components/Tooltip/tooltip.theme.ts";

function Tooltip($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Tooltip);

	const theme = useTheme();
	const currentTooltip = $.tag($.derived(() => theme.tooltip), 'currentTooltip');
	const classes = $.tag($.derived(useTooltipTheme), 'classes');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		let $0 = $.derived(() => !!$.get(currentTooltip));
		let $1 = $.derived(() => $.get(currentTooltip)?.ref);
		let $2 = $.derived(() => $.get(currentTooltip)?.size);
		let $3 = $.derived(() => $.get(currentTooltip)?.position);
		let $4 = $.derived(() => $.get(currentTooltip)?.transition);
		let $5 = $.derived(() => $.get(currentTooltip)?.offset);

		let $6 = $.derived(() => $.get(classes).root({
			size: $.get(currentTooltip)?.size || 'normal',
			color: $.get(currentTooltip)?.color || 'background',
			className: $.get(currentTooltip)?.class
		}));

		$.add_svelte_meta(
			() => Popover(node, {
				get id() {
					return id;
				},

				get open() {
					return $.get($0);
				},

				get ref() {
					return $.get($1);
				},

				get size() {
					return $.get($2);
				},
				lockScroll: false,
				get position() {
					return $.get($3);
				},

				get transition() {
					return $.get($4);
				},
				closeOnMouseLeave: false,
				get offset() {
					return $.get($5);
				},

				get class() {
					return $.get($6);
				},

				children: $.wrap_snippet(Tooltip, ($$anchor, $$slotProps) => {
					var fragment_1 = $.comment();
					var node_1 = $.first_child(fragment_1);

					{
						let $0 = $.derived(() => $.get(currentTooltip)?.content);

						$.add_svelte_meta(
							() => Slot(node_1, {
								get render() {
									return $.get($0);
								}
							}),
							'component',
							Tooltip,
							30,
							1,
							{ componentTag: 'Slot' }
						);
					}

					$.append($$anchor, fragment_1);
				}),
				$$slots: { default: true }
			}),
			'component',
			Tooltip,
			14,
			0,
			{ componentTag: 'Popover' }
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Tooltip = $.hmr(Tooltip);

	import.meta.hot.acceptExports(["default"],(module) => {
		Tooltip[$.HMR].update(module.default);
	});
}

export default Tooltip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxPQUFPLE1BQU0sMkJBQTJCO0FBQy9DLE9BQU8sSUFBSSxNQUFNLHFCQUFxQjtBQUN0QyxPQUFPLEVBQUUsUUFBUSxRQUFRLGdDQUFnQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxRQUFRLG9CQUFvQjs7b0NBSnJELENBQUM7T0FPTSxFQUFFOzs7OztDQURSLE1BQU0sS0FBSyxHQUFHLFFBQVE7Q0FFdEIsTUFBTSxjQUFjLHlCQUFZLEtBQUssQ0FBQyxPQUFPO0NBRTdDLE1BQU0sT0FBTyxtQkFBWSxlQUFlOzs7Ozs7bUNBS2hDLGNBQWM7aUNBQ2pCLGNBQWMsR0FBRSxHQUFHO2lDQUNsQixjQUFjLEdBQUUsSUFBSTtpQ0FFaEIsY0FBYyxHQUFFLFFBQVE7aUNBQ3RCLGNBQWMsR0FBRSxVQUFVO2lDQUU5QixjQUFjLEdBQUUsTUFBTTs7aUNBQ3ZCLE9BQU8sRUFBQyxJQUFJO0dBQ2xCLElBQUksUUFBRSxjQUFjLEdBQUUsSUFBSSxJQUFJLFFBQVE7R0FDdEMsS0FBSyxRQUFFLGNBQWMsR0FBRSxLQUFLLElBQUksWUFBWTtHQUM1QyxTQUFTLFFBQUUsY0FBYyxHQUFFOzs7O1NBYjVCOztZQUNDLEVBQUU7Ozs7Ozs7Ozs7Ozs7O2dCQUlTLEtBQUs7Ozs7Ozs7O3VCQUdFLEtBQUs7Ozs7Ozs7Ozs7Ozs7O3FDQVFWLGNBQWMsR0FBRSxPQUFPOzs7YUFBcEMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWxCRSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVG9vbHRpcC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFBvcG92ZXIgZnJvbSAnLi4vUG9wb3Zlci9Qb3BvdmVyLnN2ZWx0ZSc7XG5cdGltcG9ydCBTbG90IGZyb20gJy4uL1Nsb3QvU2xvdC5zdmVsdGUnO1xuXHRpbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJy4uL1RoZW1lL3RoZW1lLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IHVzZVRvb2x0aXBUaGVtZSB9IGZyb20gJy4vdG9vbHRpcC50aGVtZS5qcyc7XG5cblx0Y29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXHRjb25zdCBjdXJyZW50VG9vbHRpcCA9ICRkZXJpdmVkKHRoZW1lLnRvb2x0aXApO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VUb29sdGlwVGhlbWUoKSk7XG48L3NjcmlwdD5cblxuPFBvcG92ZXJcblx0e2lkfVxuXHRvcGVuPXshIWN1cnJlbnRUb29sdGlwfVxuXHRyZWY9e2N1cnJlbnRUb29sdGlwPy5yZWZ9XG5cdHNpemU9e2N1cnJlbnRUb29sdGlwPy5zaXplfVxuXHRsb2NrU2Nyb2xsPXtmYWxzZX1cblx0cG9zaXRpb249e2N1cnJlbnRUb29sdGlwPy5wb3NpdGlvbn1cblx0dHJhbnNpdGlvbj17Y3VycmVudFRvb2x0aXA/LnRyYW5zaXRpb259XG5cdGNsb3NlT25Nb3VzZUxlYXZlPXtmYWxzZX1cblx0b2Zmc2V0PXtjdXJyZW50VG9vbHRpcD8ub2Zmc2V0fVxuXHRjbGFzcz17Y2xhc3Nlcy5yb290KHtcblx0XHRzaXplOiBjdXJyZW50VG9vbHRpcD8uc2l6ZSB8fCAnbm9ybWFsJyxcblx0XHRjb2xvcjogY3VycmVudFRvb2x0aXA/LmNvbG9yIHx8ICdiYWNrZ3JvdW5kJyxcblx0XHRjbGFzc05hbWU6IGN1cnJlbnRUb29sdGlwPy5jbGFzc1xuXHR9KX1cbj5cblx0PFNsb3QgcmVuZGVyPXtjdXJyZW50VG9vbHRpcD8uY29udGVudH0gLz5cbjwvUG9wb3Zlcj5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvVG9vbHRpcC9Ub29sdGlwLnN2ZWx0ZSJ9