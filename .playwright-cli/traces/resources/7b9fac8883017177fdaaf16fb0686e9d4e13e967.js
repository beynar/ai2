import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/NetworkIndicator/NetworkIndicator.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

NetworkIndicator[$.FILENAME] = 'src/lib/components/NetworkIndicator/NetworkIndicator.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { navigating } from "/node_modules/.pnpm/@sveltejs+kit@2.69.0_@sveltejs+vite-plugin-svelte@7.1.2_svelte@5.56.4_@typescript-eslin_3b900de0ca8023e74fffd71694985938/node_modules/@sveltejs/kit/src/runtime/app/state/index.js?v=1b1d2797";
import { onMount } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";

import {
	finishBarAnimation,
	startBarLoopAnimation,
	startTrailAnimation,
	stopNetworkIndicatorAnimation
} from "/src/lib/components/NetworkIndicator/networkIndicator.animation.ts";

import { useNetworkIndicatorTheme } from "/src/lib/components/NetworkIndicator/networkIndicator.theme.ts";

const dispatchNetworkIndicator = (loading) => {
	if ($.strict_equals(typeof document, 'undefined')) return;

	document.dispatchEvent(new CustomEvent('network:indicator', { detail: loading }));
};

export const showNetworkIndicator = () => {
	dispatchNetworkIndicator(true);
};

export const hideNetworkIndicator = () => {
	dispatchNetworkIndicator(false);
};

export const toggleNetworkIndicator = () => {
	if ($.strict_equals(typeof document, 'undefined')) return;

	const isLoading = $.strict_equals(document.querySelector('.ui-network-indicator')?.getAttribute?.('data-loading'), 'true');

	dispatchNetworkIndicator(!isLoading);
};

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'delay',
	'class',
	'color',
	'size',
	'easing',
	'loading',
	'variant',
	'trailGap',
	'trailDuration',
	'label',
	'ref',
	'theme'
]);

var root_1 = $.add_locations($.from_html(`<span data-slot="network-indicator-segment" aria-hidden="true"></span>`), NetworkIndicator[$.FILENAME], [[189, 3]]);
var root_2 = $.add_locations($.from_html(`<div><!></div>`), NetworkIndicator[$.FILENAME], [[175, 1]]);

function NetworkIndicator($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, NetworkIndicator);

	let delay = $.prop($$props, 'delay', 3, 300),
		className = $.prop($$props, 'class', 3, ''),
		color = $.prop($$props, 'color', 3, 'foreground'),
		size = $.prop($$props, 'size', 3, 3),
		easing = $.prop($$props, 'easing', 3, 'cubicInOut'),
		loading = $.prop($$props, 'loading', 3, false),
		variant = $.prop($$props, 'variant', 3, 'bar'),
		trailGap = $.prop($$props, 'trailGap', 3, 0),
		trailDuration = $.prop($$props, 'trailDuration', 3, 650),
		label = $.prop($$props, 'label', 3, 'Loading'),
		ref = $.prop($$props, 'ref', 15),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const animationState = { node: null };
	let root = $.tag($.state(null), 'root');
	let show = $.tag($.state(false), 'show');
	let shouldRender = $.tag($.state(false), 'shouldRender');
	const classes = $.tag($.derived(() => useNetworkIndicatorTheme($$props.theme)), 'classes');
	const isActive = $.tag($.derived(() => !!(navigating.from || $.get(show) || loading())), 'isActive');
	const isTrailVariant = $.tag($.derived(() => $.strict_equals(variant(), 'trail') || $.strict_equals(variant(), 'trail-bounce')), 'isTrailVariant');

	$.user_effect(() => {
		ref($.get(root));
	});

	$.user_effect(() => {
		if ($.get(isActive)) {
			$.set(shouldRender, true);
		}
	});

	$.user_effect(() => {
		const node = $.get(root);

		if (!node || !$.get(shouldRender)) return;

		const signature = $.get(isTrailVariant)
			? `${variant()}:${trailDuration()}:${trailGap()}`
			: `bar:${delay()}:${easing()}`;

		if ($.get(isTrailVariant)) {
			const trailMode = $.strict_equals(variant(), 'trail-bounce') ? 'trail-bounce' : 'trail';

			if (!$.get(isActive)) {
				stopNetworkIndicatorAnimation(animationState);
				$.set(shouldRender, false);

				return;
			}

			if ($.strict_equals(animationState.mode, trailMode, false) || $.strict_equals(animationState.node, node, false) || $.strict_equals(animationState.signature, signature, false)) {
				stopNetworkIndicatorAnimation(animationState);

				animationState.stop = startTrailAnimation(animationState, node, {
					trailDuration: trailDuration(),
					trailGap: trailGap(),
					shouldBounce: $.strict_equals(trailMode, 'trail-bounce')
				});

				animationState.mode = trailMode;
				animationState.node = node;
				animationState.signature = signature;
			}

			return;
		}

		if ($.get(isActive)) {
			if ($.strict_equals(animationState.mode, 'bar-loop', false) || $.strict_equals(animationState.node, node, false) || $.strict_equals(animationState.signature, signature, false)) {
				stopNetworkIndicatorAnimation(animationState);
				animationState.stop = startBarLoopAnimation(animationState, node, { delay: delay(), easing: easing() });
				animationState.mode = 'bar-loop';
				animationState.node = node;
				animationState.signature = signature;
			}

			return;
		}

		if ($.strict_equals(animationState.mode, 'bar-finish', false)) {
			animationState.stop = finishBarAnimation(animationState, node, {
				delay: delay(),
				easing: easing(),
				onFinish: () => {
					$.set(shouldRender, false);
				}
			});

			animationState.mode = 'bar-finish';
			animationState.node = node;
			animationState.signature = undefined;
		}
	});

	const onNetworkIndicator = ({ detail }) => {
		if (detail) {
			$.set(show, true);
		} else {
			$.set(show, false);
		}
	};

	onMount(() => {
		document.addEventListener('network:indicator', onNetworkIndicator);

		return () => {
			document.removeEventListener('network:indicator', onNetworkIndicator);
			stopNetworkIndicatorAnimation(animationState);
		};
	});

	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node_1 = $.first_child(fragment);

	{
		var consequent_1 = ($$anchor) => {
			var div = root_2();

			$.attribute_effect(
				div,
				($0) => ({
					'data-slot': 'network-indicator',
					'data-color': color(),
					'data-loading': $.get(isActive),
					role: 'progressbar',
					'aria-label': label(),
					class: $0,
					...attachments,
					[$.STYLE]: {
						height: `${size() ?? ''}px`,
						opacity: !$.get(isTrailVariant) ? '0' : undefined,
						transform: !$.get(isTrailVariant) ? 'scaleX(0)' : undefined
					}
				}),
				[
					() => $.get(classes).root({ color: color(), variant: variant(), className: className() })
				],
				void 0,
				void 0,
				'svelte-14lmngj'
			);

			var node_2 = $.child(div);

			{
				var consequent = ($$anchor) => {
					var span = root_1();

					$.template_effect(($0) => $.set_class(span, 1, $0, 'svelte-14lmngj'), [() => $.clsx($.get(classes).segment({ color: color() }))]);
					$.append($$anchor, span);
				};

				$.add_svelte_meta(
					() => $.if(node_2, ($$render) => {
						if ($.get(isTrailVariant)) $$render(consequent);
					}),
					'if',
					NetworkIndicator,
					188,
					2
				);
			}

			$.reset(div);
			$.bind_this(div, ($$value) => $.set(root, $$value), () => $.get(root));
			$.append($$anchor, div);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.get(shouldRender)) $$render(consequent_1);
			}),
			'if',
			NetworkIndicator,
			174,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	NetworkIndicator = $.hmr(NetworkIndicator);

	import.meta.hot.acceptExports(["default"],(module) => {
		$.cleanup_styles('svelte-14lmngj');
		NetworkIndicator[$.HMR].update(module.default);
	});
}

export default NetworkIndicator;
import "/src/lib/components/NetworkIndicator/NetworkIndicator.svelte?svelte&type=style&lang.css";

//# sourceMappingURL=data:application/json;base64,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UyxHQUFHLFNBQVM7RUFDckM7Q0FDRCxDQUFDOztDQUVELE1BQU0sa0JBQWtCLE1BQU0sTUFBTSxPQUE2QjtFQUNoRSxFQUFFLEVBQUUsTUFBTSxFQUFFO1NBQ1gsSUFBSSxFQUFHLElBQUk7RUFDWixDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ04sSUFBSSxFQUFHLEtBQUs7RUFDYjtDQUNELENBQUM7O0NBRUQsT0FBTyxPQUFPO0VBQ2IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLGtCQUFrQjs7RUFDakUsTUFBTSxPQUFPO0dBQ1osUUFBUSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLGtCQUFrQjtHQUNwRSw2QkFBNkIsQ0FBQyxjQUFjO0VBQzdDLENBQUM7Q0FDRixDQUFDOzs7Ozs7OztPQUlBOzs7SUFBQTs7O21CQUdZLEtBQUs7MkJBQ0gsUUFBUTs7bUJBRVYsS0FBSzs7UUFLYixXQUFXOztpQkFIQSxJQUFJO3NCQUNILGNBQWMsSUFBRyxHQUFHLEdBQUcsU0FBUzt3QkFDOUIsY0FBYyxJQUFHLFdBQVcsR0FBRyxTQUFTOzs7O2lCQUhuRCxPQUFPLEVBQUMsSUFBSSxHQUFHLEtBQUssRUFBTCxLQUFLLElBQUUsT0FBTyxFQUFQLE9BQU8sSUFBRSxTQUFTLEVBQVQsU0FBUzs7Ozs7Ozt3QkFQL0M7Ozs7U0FjRTs7MkNBQUEsb0RBR08sT0FBTyxFQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUwsS0FBSzt3QkFIOUI7Ozs7O2dCQURHLGNBQWM7Ozs7Ozs7OztXQWJuQjtlQUFBLHdCQUNXLElBQUksd0JBQUosSUFBSTtzQkFEZjs7Ozs7Y0FERyxZQUFZOzs7Ozs7Ozs7Ozs7QUFGVCIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTmV0d29ya0luZGljYXRvci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIiBtb2R1bGU+XG5cdGludGVyZmFjZSBDdXN0b21FdmVudE1hcCB7XG5cdFx0J25ldHdvcms6aW5kaWNhdG9yJzogQ3VzdG9tRXZlbnQ8Ym9vbGVhbj47XG5cdH1cblx0ZGVjbGFyZSBnbG9iYWwge1xuXHRcdGludGVyZmFjZSBEb2N1bWVudCB7XG5cdFx0XHRhZGRFdmVudExpc3RlbmVyPEsgZXh0ZW5kcyBrZXlvZiBDdXN0b21FdmVudE1hcD4oXG5cdFx0XHRcdHR5cGU6IEssXG5cdFx0XHRcdGxpc3RlbmVyOiAodGhpczogRG9jdW1lbnQsIGV2OiBDdXN0b21FdmVudE1hcFtLXSkgPT4gdm9pZFxuXHRcdFx0KTogdm9pZDtcblx0XHRcdGRpc3BhdGNoRXZlbnQ8SyBleHRlbmRzIGtleW9mIEN1c3RvbUV2ZW50TWFwPihldjogQ3VzdG9tRXZlbnRNYXBbS10pOiB2b2lkO1xuXHRcdFx0cmVtb3ZlRXZlbnRMaXN0ZW5lcjxLIGV4dGVuZHMga2V5b2YgQ3VzdG9tRXZlbnRNYXA+KFxuXHRcdFx0XHR0eXBlOiBLLFxuXHRcdFx0XHRsaXN0ZW5lcjogKHRoaXM6IERvY3VtZW50LCBldjogQ3VzdG9tRXZlbnRNYXBbS10pID0+IHZvaWRcblx0XHRcdCk6IHZvaWQ7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgZGlzcGF0Y2hOZXR3b3JrSW5kaWNhdG9yID0gKGxvYWRpbmc6IGJvb2xlYW4pID0+IHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcblx0XHRcdG5ldyBDdXN0b21FdmVudCgnbmV0d29yazppbmRpY2F0b3InLCB7XG5cdFx0XHRcdGRldGFpbDogbG9hZGluZ1xuXHRcdFx0fSlcblx0XHQpO1xuXHR9O1xuXG5cdGV4cG9ydCBjb25zdCBzaG93TmV0d29ya0luZGljYXRvciA9ICgpID0+IHtcblx0XHRkaXNwYXRjaE5ldHdvcmtJbmRpY2F0b3IodHJ1ZSk7XG5cdH07XG5cblx0ZXhwb3J0IGNvbnN0IGhpZGVOZXR3b3JrSW5kaWNhdG9yID0gKCkgPT4ge1xuXHRcdGRpc3BhdGNoTmV0d29ya0luZGljYXRvcihmYWxzZSk7XG5cdH07XG5cblx0ZXhwb3J0IGNvbnN0IHRvZ2dsZU5ldHdvcmtJbmRpY2F0b3IgPSAoKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuXHRcdGNvbnN0IGlzTG9hZGluZyA9XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWktbmV0d29yay1pbmRpY2F0b3InKT8uZ2V0QXR0cmlidXRlPy4oJ2RhdGEtbG9hZGluZycpID09PSAndHJ1ZSc7XG5cblx0XHRkaXNwYXRjaE5ldHdvcmtJbmRpY2F0b3IoIWlzTG9hZGluZyk7XG5cdH07XG48L3NjcmlwdD5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHsgbmF2aWdhdGluZyB9IGZyb20gJyRhcHAvc3RhdGUnO1xuXHRpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHtcblx0XHRmaW5pc2hCYXJBbmltYXRpb24sXG5cdFx0c3RhcnRCYXJMb29wQW5pbWF0aW9uLFxuXHRcdHN0YXJ0VHJhaWxBbmltYXRpb24sXG5cdFx0c3RvcE5ldHdvcmtJbmRpY2F0b3JBbmltYXRpb24sXG5cdFx0dHlwZSBOZXR3b3JrSW5kaWNhdG9yQW5pbWF0aW9uU3RhdGVcblx0fSBmcm9tICcuL25ldHdvcmtJbmRpY2F0b3IuYW5pbWF0aW9uLmpzJztcblx0aW1wb3J0IHR5cGUgeyBOZXR3b3JrSW5kaWNhdG9yUHJvcHMgfSBmcm9tICcuL25ldHdvcmtJbmRpY2F0b3IucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VOZXR3b3JrSW5kaWNhdG9yVGhlbWUgfSBmcm9tICcuL25ldHdvcmtJbmRpY2F0b3IudGhlbWUuanMnO1xuXG5cdGxldCB7XG5cdFx0ZGVsYXkgPSAzMDAsXG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSA9ICcnLFxuXHRcdGNvbG9yID0gJ2ZvcmVncm91bmQnLFxuXHRcdHNpemUgPSAzLFxuXHRcdGVhc2luZyA9ICdjdWJpY0luT3V0Jyxcblx0XHRsb2FkaW5nID0gZmFsc2UsXG5cdFx0dmFyaWFudCA9ICdiYXInLFxuXHRcdHRyYWlsR2FwID0gMCxcblx0XHR0cmFpbER1cmF0aW9uID0gNjUwLFxuXHRcdGxhYmVsID0gJ0xvYWRpbmcnLFxuXHRcdHJlZiA9ICRiaW5kYWJsZSgpLFxuXHRcdHRoZW1lLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IE5ldHdvcmtJbmRpY2F0b3JQcm9wcyA9ICRwcm9wcygpO1xuXG5cdGNvbnN0IGFuaW1hdGlvblN0YXRlOiBOZXR3b3JrSW5kaWNhdG9yQW5pbWF0aW9uU3RhdGUgPSB7XG5cdFx0bm9kZTogbnVsbFxuXHR9O1xuXHRsZXQgcm9vdCA9ICRzdGF0ZTxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXHRsZXQgc2hvdyA9ICRzdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cdGxldCBzaG91bGRSZW5kZXIgPSAkc3RhdGUoZmFsc2UpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VOZXR3b3JrSW5kaWNhdG9yVGhlbWUodGhlbWUpKTtcblx0Y29uc3QgaXNBY3RpdmUgPSAkZGVyaXZlZCghIShuYXZpZ2F0aW5nLmZyb20gfHwgc2hvdyB8fCBsb2FkaW5nKSk7XG5cdGNvbnN0IGlzVHJhaWxWYXJpYW50ID0gJGRlcml2ZWQodmFyaWFudCA9PT0gJ3RyYWlsJyB8fCB2YXJpYW50ID09PSAndHJhaWwtYm91bmNlJyk7XG5cblx0JGVmZmVjdCgoKSA9PiB7XG5cdFx0cmVmID0gcm9vdDtcblx0fSk7XG5cblx0JGVmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKGlzQWN0aXZlKSB7XG5cdFx0XHRzaG91bGRSZW5kZXIgPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0JGVmZmVjdCgoKSA9PiB7XG5cdFx0Y29uc3Qgbm9kZSA9IHJvb3Q7XG5cdFx0aWYgKCFub2RlIHx8ICFzaG91bGRSZW5kZXIpIHJldHVybjtcblx0XHRjb25zdCBzaWduYXR1cmUgPSBpc1RyYWlsVmFyaWFudFxuXHRcdFx0PyBgJHt2YXJpYW50fToke3RyYWlsRHVyYXRpb259OiR7dHJhaWxHYXB9YFxuXHRcdFx0OiBgYmFyOiR7ZGVsYXl9OiR7ZWFzaW5nfWA7XG5cblx0XHRpZiAoaXNUcmFpbFZhcmlhbnQpIHtcblx0XHRcdGNvbnN0IHRyYWlsTW9kZSA9IHZhcmlhbnQgPT09ICd0cmFpbC1ib3VuY2UnID8gJ3RyYWlsLWJvdW5jZScgOiAndHJhaWwnO1xuXG5cdFx0XHRpZiAoIWlzQWN0aXZlKSB7XG5cdFx0XHRcdHN0b3BOZXR3b3JrSW5kaWNhdG9yQW5pbWF0aW9uKGFuaW1hdGlvblN0YXRlKTtcblx0XHRcdFx0c2hvdWxkUmVuZGVyID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChcblx0XHRcdFx0YW5pbWF0aW9uU3RhdGUubW9kZSAhPT0gdHJhaWxNb2RlIHx8XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLm5vZGUgIT09IG5vZGUgfHxcblx0XHRcdFx0YW5pbWF0aW9uU3RhdGUuc2lnbmF0dXJlICE9PSBzaWduYXR1cmVcblx0XHRcdCkge1xuXHRcdFx0XHRzdG9wTmV0d29ya0luZGljYXRvckFuaW1hdGlvbihhbmltYXRpb25TdGF0ZSk7XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLnN0b3AgPSBzdGFydFRyYWlsQW5pbWF0aW9uKGFuaW1hdGlvblN0YXRlLCBub2RlLCB7XG5cdFx0XHRcdFx0dHJhaWxEdXJhdGlvbixcblx0XHRcdFx0XHR0cmFpbEdhcCxcblx0XHRcdFx0XHRzaG91bGRCb3VuY2U6IHRyYWlsTW9kZSA9PT0gJ3RyYWlsLWJvdW5jZSdcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLm1vZGUgPSB0cmFpbE1vZGU7XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLm5vZGUgPSBub2RlO1xuXHRcdFx0XHRhbmltYXRpb25TdGF0ZS5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRhbmltYXRpb25TdGF0ZS5tb2RlICE9PSAnYmFyLWxvb3AnIHx8XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLm5vZGUgIT09IG5vZGUgfHxcblx0XHRcdFx0YW5pbWF0aW9uU3RhdGUuc2lnbmF0dXJlICE9PSBzaWduYXR1cmVcblx0XHRcdCkge1xuXHRcdFx0XHRzdG9wTmV0d29ya0luZGljYXRvckFuaW1hdGlvbihhbmltYXRpb25TdGF0ZSk7XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLnN0b3AgPSBzdGFydEJhckxvb3BBbmltYXRpb24oYW5pbWF0aW9uU3RhdGUsIG5vZGUsIHsgZGVsYXksIGVhc2luZyB9KTtcblx0XHRcdFx0YW5pbWF0aW9uU3RhdGUubW9kZSA9ICdiYXItbG9vcCc7XG5cdFx0XHRcdGFuaW1hdGlvblN0YXRlLm5vZGUgPSBub2RlO1xuXHRcdFx0XHRhbmltYXRpb25TdGF0ZS5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChhbmltYXRpb25TdGF0ZS5tb2RlICE9PSAnYmFyLWZpbmlzaCcpIHtcblx0XHRcdGFuaW1hdGlvblN0YXRlLnN0b3AgPSBmaW5pc2hCYXJBbmltYXRpb24oYW5pbWF0aW9uU3RhdGUsIG5vZGUsIHtcblx0XHRcdFx0ZGVsYXksXG5cdFx0XHRcdGVhc2luZyxcblx0XHRcdFx0b25GaW5pc2g6ICgpID0+IHtcblx0XHRcdFx0XHRzaG91bGRSZW5kZXIgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRhbmltYXRpb25TdGF0ZS5tb2RlID0gJ2Jhci1maW5pc2gnO1xuXHRcdFx0YW5pbWF0aW9uU3RhdGUubm9kZSA9IG5vZGU7XG5cdFx0XHRhbmltYXRpb25TdGF0ZS5zaWduYXR1cmUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCBvbk5ldHdvcmtJbmRpY2F0b3IgPSAoeyBkZXRhaWwgfTogQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pID0+IHtcblx0XHRpZiAoZGV0YWlsKSB7XG5cdFx0XHRzaG93ID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2hvdyA9IGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRvbk1vdW50KCgpID0+IHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCduZXR3b3JrOmluZGljYXRvcicsIG9uTmV0d29ya0luZGljYXRvcik7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ25ldHdvcms6aW5kaWNhdG9yJywgb25OZXR3b3JrSW5kaWNhdG9yKTtcblx0XHRcdHN0b3BOZXR3b3JrSW5kaWNhdG9yQW5pbWF0aW9uKGFuaW1hdGlvblN0YXRlKTtcblx0XHR9O1xuXHR9KTtcbjwvc2NyaXB0PlxuXG57I2lmIHNob3VsZFJlbmRlcn1cblx0PGRpdlxuXHRcdGJpbmQ6dGhpcz17cm9vdH1cblx0XHRkYXRhLXNsb3Q9XCJuZXR3b3JrLWluZGljYXRvclwiXG5cdFx0ZGF0YS1jb2xvcj17Y29sb3J9XG5cdFx0ZGF0YS1sb2FkaW5nPXtpc0FjdGl2ZX1cblx0XHRyb2xlPVwicHJvZ3Jlc3NiYXJcIlxuXHRcdGFyaWEtbGFiZWw9e2xhYmVsfVxuXHRcdGNsYXNzPXtjbGFzc2VzLnJvb3QoeyBjb2xvciwgdmFyaWFudCwgY2xhc3NOYW1lIH0pfVxuXHRcdHN0eWxlOmhlaWdodD1cIntzaXplfXB4XCJcblx0XHRzdHlsZTpvcGFjaXR5PXshaXNUcmFpbFZhcmlhbnQgPyAnMCcgOiB1bmRlZmluZWR9XG5cdFx0c3R5bGU6dHJhbnNmb3JtPXshaXNUcmFpbFZhcmlhbnQgPyAnc2NhbGVYKDApJyA6IHVuZGVmaW5lZH1cblx0XHR7Li4uYXR0YWNobWVudHN9XG5cdD5cblx0XHR7I2lmIGlzVHJhaWxWYXJpYW50fVxuXHRcdFx0PHNwYW5cblx0XHRcdFx0ZGF0YS1zbG90PVwibmV0d29yay1pbmRpY2F0b3Itc2VnbWVudFwiXG5cdFx0XHRcdGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG5cdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnNlZ21lbnQoeyBjb2xvciB9KX1cblx0XHRcdD48L3NwYW4+XG5cdFx0ey9pZn1cblx0PC9kaXY+XG57L2lmfVxuXG48c3R5bGU+XG5cdFtkYXRhLXNsb3Q9J25ldHdvcmstaW5kaWNhdG9yLXNlZ21lbnQnXSB7XG5cdFx0bGVmdDogMDtcblx0XHR3aWR0aDogMzYlO1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0d2lsbC1jaGFuZ2U6IGxlZnQsIG9wYWNpdHk7XG5cdH1cbjwvc3R5bGU+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL05ldHdvcmtJbmRpY2F0b3IvTmV0d29ya0luZGljYXRvci5zdmVsdGUifQ==