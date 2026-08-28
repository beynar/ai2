import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Tabbar/Tabbar.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Tabbar[$.FILENAME] = 'src/lib/components/Tabbar/Tabbar.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { useTabbarTheme } from "/src/lib/components/Tabbar/tabbar.theme.ts";
import { useNavigation } from "/src/lib/utils/useNavigation.svelte.ts";
import { untrack } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'items',
	'activeTab',
	'onChange',
	'size',
	'orientation',
	'color',
	'alignment',
	'position',
	'variant',
	'class',
	'theme',
	'fullWidth'
]);

var root = $.add_locations($.from_html(`<div aria-hidden="true"></div>`), Tabbar[$.FILENAME], [[170, 2]]);
var root_1 = $.add_locations($.from_html(`<span aria-hidden="true"></span>`), Tabbar[$.FILENAME], [[213, 4]]);
var root_2 = $.add_locations($.from_html(`<!> <!> <!> <!>`, 1), Tabbar[$.FILENAME], []);
var root_3 = $.add_locations($.from_html(`<div><!> <!></div>`), Tabbar[$.FILENAME], [[160, 0]]);

function Tabbar($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Tabbar);

	let activeTab = $.prop($$props, 'activeTab', 15, 0),
		size = $.prop($$props, 'size', 3, 'normal'),
		orientation = $.prop($$props, 'orientation', 3, 'horizontal'),
		color = $.prop($$props, 'color', 3, 'primary'),
		alignment = $.prop($$props, 'alignment', 3, 'start'),
		position = $.prop($$props, 'position', 3, 'top'),
		variant = $.prop($$props, 'variant', 3, 'underline'),
		className = $.prop($$props, 'class', 3, ''),
		fullWidth = $.prop($$props, 'fullWidth', 3, false),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useTabbarTheme($$props.theme)), 'classes');

	// Normalize tab items to always work with objects
	const normalizedTabs = $.tag(
		$.derived(() => $$props.items.map((tab) => $.strict_equals(typeof tab, 'string')
			? {
				label: tab,
				prefix: undefined,
				suffix: undefined,
				href: undefined,
				disabled: false
			}
			: {
				label: tab.label,
				prefix: tab.prefix,
				suffix: tab.suffix,
				href: tab.href,
				disabled: tab.disabled ?? false,
				target: tab.target,
				rel: tab.rel
			})),
		'normalizedTabs'
	);

	// Navigation hook for keyboard support
	const navigation = useNavigation({
		orientation: () => orientation(),
		loop: true,
		id,
		enableHoverFocus: false,
		onChange: (index) => {
			if ($.strict_equals(index, null, false) && $.strict_equals(index, activeTab(), false)) {
				activeTab(index);
				$$props.onChange?.(index);
			}
		},
		defaultFocusedIndex: () => activeTab()
	});

	function handleTabClick(index, tab) {
		if (!tab.disabled && !tab.href) {
			activeTab(index);
			$$props.onChange?.(index);
			navigation.focusItem(index);
		}
	}

	// --- Active indicator ----------------------------------------------------
	// Two-part strategy so the bar is correct at every stage:
	//  • SSR + pre-hydration: a CSS-only indicator rendered INSIDE the active tab
	//    (`staticIndicator`), positioned purely by layout — no measurement needed.
	//  • After hydration: a single absolutely-positioned element measured onto the
	//    active tab that slides/resizes between tabs. It replaces the static one at
	//    the identical spot, so the handoff is seamless.
	let tabEls = [];

	let indicatorStyle = $.tag($.state(''), 'indicatorStyle');
	let indicatorReady = $.tag($.state(false), 'indicatorReady');

	// Flips true once the measured indicator has been placed on the client; until
	// then the static (SSR) indicator is shown.
	let hydrated = $.tag($.state(false), 'hydrated');

	const placeIndicator = () => {
		const el = tabEls[activeTab()];

		if (!el) return false;

		// offsetLeft/Top are relative to the root (it is `relative`), so this is
		// immune to page scroll and layout shifts above the tabbar.
		const x = el.offsetLeft;

		const y = el.offsetTop;
		const w = el.offsetWidth;
		const h = el.offsetHeight;

		if ($.strict_equals(variant(), 'pill')) {
			$.set(indicatorStyle, `transform:translate(${x}px, ${y}px);width:${w}px;height:${h}px`);
		} else if ($.strict_equals(position(), 'bottom')) {
			$.set(indicatorStyle, `transform:translate(${x}px, ${y}px);width:${w}px;height:2px`);
		} else if ($.strict_equals(position(), 'left')) {
			$.set(indicatorStyle, `transform:translate(${x + w - 2}px, ${y}px);width:2px;height:${h}px`);
		} else if ($.strict_equals(position(), 'right')) {
			$.set(indicatorStyle, `transform:translate(${x}px, ${y}px);width:2px;height:${h}px`);
		} else {
			// 'top' (default): underline along the bottom edge.
			$.set(indicatorStyle, `transform:translate(${x}px, ${y + h - 2}px);width:${w}px;height:2px`);
		}

		return true;
	};

	// Re-place whenever anything that moves or resizes the tabs changes.
	$.user_effect(() => {
		activeTab();
		$$props.items;
		size();
		variant();
		position();
		orientation();
		alignment();
		fullWidth();
		untrack(() => placeIndicator());
	});

	const collectTab = (index) => (node) => {
		return untrack(() => {
			tabEls[index] = node;

			return () => {
				tabEls[index] = undefined;
			};
		});
	};

	const rootAttachment = (node) => {
		return untrack(() => {
			// Container resizes (fullWidth, font load, responsive reflow) move the
			// tabs without changing any reactive prop — re-measure on resize.
			const observer = new ResizeObserver(() => placeIndicator());

			observer.observe(node);

			// Place the measured indicator, then hand off from the static SSR bar in
			// the same update (identical position → no visible jump).
			if (placeIndicator()) $.set(hydrated, true);

			// Enable the slide transition only after the initial position has painted
			// (two frames), so the handoff is instant and only later switches slide.
			let raf = requestAnimationFrame(() => {
				raf = requestAnimationFrame(() => $.set(indicatorReady, true));
			});

			return () => {
				observer.disconnect();
				cancelAnimationFrame(raf);
			};
		});
	};

	var $$exports = { ...$.legacy_api() };
	var div = root_3();

	$.attribute_effect(
		div,
		($0) => ({
			class: $0,
			role: 'tablist',
			'aria-orientation': orientation(),
			...attachments
		}),
		[
			() => $.get(classes).root({
				orientation: orientation(),
				alignment: alignment(),
				size: size(),
				variant: variant(),
				className: className(),
				fullWidth: fullWidth()
			})
		]
	);

	var node_1 = $.child(div);

	{
		var consequent = ($$anchor) => {
			var div_1 = root();

			$.template_effect(
				($0) => {
					$.set_class(div_1, 1, $0);
					$.set_style(div_1, $.get(indicatorStyle));
					$.set_attribute(div_1, 'data-color', color());
					$.set_attribute(div_1, 'data-ready', $.get(indicatorReady) ? 'true' : 'false');
				},
				[
					() => $.clsx($.get(classes).indicator({ variant: variant() }))
				]
			);

			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if ($.get(hydrated)) $$render(consequent);
			}),
			'if',
			Tabbar,
			168,
			1
		);
	}

	var node_2 = $.sibling(node_1, 2);

	$.add_svelte_meta(
		() => $.each(node_2, 17, () => $.get(normalizedTabs), $.index, ($$anchor, tab, index) => {
			const isActive = $.tag($.derived(() => $.strict_equals(activeTab(), index)), 'isActive');

			$.get(isActive);

			const isFocused = $.tag($.derived(() => $.strict_equals(navigation.focusedIndex, index)), 'isFocused');

			$.get(isFocused);

			const elementType = $.tag($.derived(() => $.get(tab).href ? 'a' : 'button'), 'elementType');

			$.get(elementType);

			var fragment = $.comment();
			var node_3 = $.first_child(fragment);

			{
				$.validate_dynamic_element_tag(() => $.get(elementType));
				$.validate_void_dynamic_element(() => $.get(elementType));

				$.element(
					node_3,
					() => $.get(elementType),
					false,
					($$element, $$anchor) => {
						$.attach($$element, () => navigation.itemReference);
						$.attach($$element, () => collectTab(index));

						var event_handler = () => handleTabClick(index, $.get(tab));

						$.attribute_effect(
							$$element,
							($0) => ({
								role: 'tab',
								'aria-disabled': $.get(tab).disabled,
								disabled: $.get(tab).disabled,
								href: $.get(tab).href,
								target: $.get(tab).target,
								tabindex: $.get(isFocused) ? 0 : -1,
								rel: $.get(tab).rel,
								'data-color': color(),
								'data-active': $.get(isActive) ? 'true' : 'false',
								'data-focused': $.get(isFocused) ? 'true' : 'false',
								'data-orientation': orientation(),
								class: $0,
								onclick: event_handler
							}),
							[
								() => $.get(classes).tab({
									size: size(),
									color: color(),
									active: $.get(isActive),
									focused: $.get(isFocused),
									disabled: $.get(tab).disabled,
									orientation: orientation(),
									position: position(),
									variant: variant(),
									fullWidth: fullWidth()
								})
							]
						);

						var fragment_1 = root_2();
						var node_4 = $.first_child(fragment_1);

						{
							var consequent_1 = ($$anchor) => {
								var span = root_1();

								$.template_effect(($0) => $.set_class(span, 1, $0), [
									() => $.clsx($.get(classes).staticIndicator({ variant: variant(), position: position() }))
								]);

								$.append($$anchor, span);
							};

							$.add_svelte_meta(
								() => $.if(node_4, ($$render) => {
									if (!$.get(hydrated) && $.get(isActive)) $$render(consequent_1);
								}),
								'if',
								Tabbar,
								211,
								3
							);
						}

						var node_5 = $.sibling(node_4, 2);

						{
							let $0 = $.derived(() => $.get(classes).prefix({ size: size() }));

							$.add_svelte_meta(
								() => Slot(node_5, {
									get render() {
										return $.get(tab).prefix;
									},

									get class() {
										return $.get($0);
									}
								}),
								'component',
								Tabbar,
								215,
								3,
								{ componentTag: 'Slot' }
							);
						}

						var node_6 = $.sibling(node_5, 2);

						{
							var consequent_2 = ($$anchor) => {
								var text = $.text();

								$.template_effect(() => $.set_text(text, $.get(tab).label));
								$.append($$anchor, text);
							};

							var alternate = ($$anchor) => {
								var fragment_3 = $.comment();
								var node_7 = $.first_child(fragment_3);

								$.add_svelte_meta(
									() => Slot(node_7, {
										get render() {
											return $.get(tab).label;
										}
									}),
									'component',
									Tabbar,
									220,
									4,
									{ componentTag: 'Slot' }
								);

								$.append($$anchor, fragment_3);
							};

							$.add_svelte_meta(
								() => $.if(node_6, ($$render) => {
									if ($.strict_equals(typeof $.get(tab).label, 'string')) $$render(consequent_2); else $$render(alternate, -1);
								}),
								'if',
								Tabbar,
								217,
								3
							);
						}

						var node_8 = $.sibling(node_6, 2);

						{
							let $0 = $.derived(() => $.get(classes).suffix({ size: size() }));

							$.add_svelte_meta(
								() => Slot(node_8, {
									get render() {
										return $.get(tab).suffix;
									},

									get class() {
										return $.get($0);
									}
								}),
								'component',
								Tabbar,
								223,
								3,
								{ componentTag: 'Slot' }
							);
						}

						$.append($$anchor, fragment_1);
					},
					void 0,
					[183, 2]
				);
			}

			$.append($$anchor, fragment);
		}),
		'each',
		Tabbar,
		178,
		1
	);

	$.reset(div);
	$.attach(div, () => navigation.containerReference);
	$.attach(div, () => rootAttachment);
	$.append($$anchor, div);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Tabbar = $.hmr(Tabbar);

	import.meta.hot.acceptExports(["default"],(module) => {
		Tabbar[$.HMR].update(module.default);
	});
}

export default Tabbar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxJQUFJLE1BQU0scUJBQXFCO0FBRXRDLE9BQU8sRUFBRSxjQUFjLFFBQVEsbUJBQW1CO0FBQ2xELE9BQU8sRUFBRSxhQUFhLFFBQVEsb0NBQW9DO0FBRWxFLE9BQU8sRUFBRSxPQUFPLFFBQVEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FOakMsQ0FBQztPQXdCTSxFQUFFOzs7OztDQWhCUixJQUFJLEFBRUgsU0FBUyxvQ0FBYSxDQUFDO0VBRXZCLElBQUksOEJBQUcsUUFBUTtFQUNmLFdBQVcscUNBQUcsWUFBWTtFQUMxQixLQUFLLCtCQUFHLFNBQVM7RUFDakIsU0FBUyxtQ0FBRyxPQUFPO0VBQ25CLFFBQVEsa0NBQUcsS0FBSztFQUNoQixPQUFPLGlDQUFHLFdBQVc7RUFDZCxTQUFTLCtCQUFHLEVBQUU7RUFFckIsU0FBUyxtQ0FBRyxLQUFLO0VBQ2Q7O0NBSUosTUFBTSxPQUFPLHlCQUFZLGNBQWM7OztDQWF2QyxNQUFNLGNBQWM7Z0NBQ2IsR0FBRyxFQUFFLEdBQUcsNEJBQ04sR0FBRyxFQUFLLFFBQU87O0lBQ2pCLEtBQUssRUFBRSxHQUFHO0lBQUUsTUFBTSxFQUFFLFNBQVM7SUFBRSxNQUFNLEVBQUUsU0FBUztJQUFFLElBQUksRUFBRSxTQUFTO0lBQUUsUUFBUSxFQUFFLEtBQUs7OztJQUVwRixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7SUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtJQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7SUFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLO0lBQy9CLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtJQUNsQixHQUFHLEVBQUUsR0FBRyxDQUFDOzs7Ozs7Q0FNZCxNQUFNLFVBQVUsR0FBRyxhQUFhO0VBQy9CLFdBQVcsUUFBUSxXQUFXO0VBQzlCLElBQUksRUFBRSxJQUFJO0VBQ1YsRUFBRTtFQUNGLGdCQUFnQixFQUFFLEtBQUs7RUFDdkIsUUFBUSxHQUFHLEtBQUssS0FBSztHQUNwQixFQUFFLGtCQUFFLEtBQUssRUFBSyxJQUFJLDRCQUFJLEtBQUssRUFBSyxTQUFTLFlBQUU7SUFDMUMsU0FBUyxDQUFHLEtBQUs7dUJBQ04sS0FBSztHQUNqQjtFQUNELENBQUM7RUFDRCxtQkFBbUIsUUFBUTs7O0NBRzVCLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBYSxFQUFFLEdBQWtCLEVBQUU7RUFDMUQsRUFBRSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtHQUMvQixTQUFTLENBQUcsS0FBSztzQkFDTixLQUFLO0dBQ2hCLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSztFQUMzQjtDQUNEOzs7Ozs7Ozs7Q0FTQSxJQUFJLE1BQXNDOztDQUMxQyxJQUFJLGNBQWMsU0FBRyxPQUFNLENBQUMsRUFBRTtDQUM5QixJQUFJLGNBQWMsU0FBRyxPQUFNLENBQUMsS0FBSzs7OztDQUdqQyxJQUFJLFFBQVEsU0FBRyxPQUFNLENBQUMsS0FBSzs7Q0FFM0IsTUFBTSxjQUFjLFNBQWtCO0VBQ3JDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxTQUFTOztFQUMzQixFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLOzs7O0VBR3JCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVOztFQUN2QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUztFQUN0QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVztFQUN4QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWTs7RUFDekIsRUFBRSxrQkFBRSxPQUFPLElBQUssTUFBTSxHQUFFO1NBQ3ZCLGNBQWMseUJBQTBCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDOUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGtCQUFFLFFBQVEsSUFBSyxRQUFRLEdBQUU7U0FDakMsY0FBYyx5QkFBMEIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0VBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxrQkFBRSxRQUFRLElBQUssTUFBTSxHQUFFO1NBQy9CLGNBQWMseUJBQTBCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7RUFDbkYsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLGtCQUFFLFFBQVEsSUFBSyxPQUFPLEdBQUU7U0FDaEMsY0FBYyx5QkFBMEIsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7RUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQzs7U0FFTixjQUFjLHlCQUEwQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztFQUN4RTs7RUFDQSxNQUFNLENBQUMsSUFBSTtDQUNaLENBQUM7OztDQUdELGFBQU8sT0FBTztFQUNiLFNBQVM7O0VBRVQsSUFBSTtFQUNKLE9BQU87RUFDUCxRQUFRO0VBQ1IsV0FBVztFQUNYLFNBQVM7RUFDVCxTQUFTO0VBQ1QsT0FBTyxPQUFPLGNBQWM7Q0FDN0IsQ0FBQzs7Q0FFRCxNQUFNLFVBQVUsSUFBSSxLQUFhLE1BQU0sSUFBaUIsS0FBSztFQUM1RCxNQUFNLENBQUMsT0FBTyxPQUFPO0dBQ3BCLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSTs7R0FDcEIsTUFBTSxPQUFPO0lBQ1osTUFBTSxDQUFDLEtBQUssSUFBSSxTQUFTO0dBQzFCLENBQUM7RUFDRixDQUFDO0NBQ0YsQ0FBQzs7Q0FFRCxNQUFNLGNBQWMsSUFBSSxJQUFpQixLQUFLO0VBQzdDLE1BQU0sQ0FBQyxPQUFPLE9BQU87OztHQUdwQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsY0FBYyxPQUFPLGNBQWM7O0dBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztHQUdyQixFQUFFLEVBQUUsY0FBYyxVQUFJLFFBQVEsRUFBRyxJQUFJOzs7O0dBR3JDLElBQUksR0FBRyxHQUFHLHFCQUFxQixPQUFPO0lBQ3JDLEdBQUcsR0FBRyxxQkFBcUIsYUFBUSxjQUFjLEVBQUcsSUFBSTtHQUN6RCxDQUFDOztHQUNELE1BQU0sT0FBTztJQUNaLFFBQVEsQ0FBQyxVQUFVO0lBQ25CLG9CQUFvQixDQUFDLEdBQUc7R0FDekIsQ0FBQztFQUNGLENBQUM7Q0FDRixDQUFDOzs7S0FHRDs7O0VBQUE7Ozs7dUJBR2tCLFdBQVc7TUFHekIsV0FBVzs7O2VBTFIsT0FBTyxFQUFDLElBQUk7SUFBRyxXQUFXLEVBQVgsV0FBVztJQUFFLFNBQVMsRUFBVCxTQUFTO0lBQUUsSUFBSSxFQUFKLElBQUk7SUFBRSxPQUFPLEVBQVAsT0FBTztJQUFFLFNBQVMsRUFBVCxTQUFTO0lBQUUsU0FBUyxFQUFULFNBQVM7Ozs7O3NCQURqRjs7OztPQVVFOzs7O2lCQUFBO2lCQUFBLGFBRU8sY0FBYztxQkFGckIscUJBR1ksS0FBSztxQkFIakIsMkJBSVksY0FBYyxJQUFHLE1BQU0sR0FBRyxPQUFPOzs7d0JBSHRDLE9BQU8sRUFBQyxTQUFTLEdBQUcsT0FBTyxFQUFQLE9BQU87Ozs7c0JBRGxDOzs7OztjQUZHLFFBQVE7Ozs7Ozs7Ozs7Ozt1Q0FVTixjQUFjLHVCQUFJLEdBQUc7U0FDbkIsUUFBUSx5Q0FBRyxTQUFTLElBQUssS0FBSzs7U0FBOUIsUUFBUTs7U0FDUixTQUFTLHlDQUFHLFVBQVUsQ0FBQyxZQUFZLEVBQUssS0FBSzs7U0FBN0MsU0FBUzs7U0FDVCxXQUFXLCtCQUFHLEdBQUcsRUFBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLFFBQVE7O1NBQXZDLFdBQVc7Ozs7OzsrQ0FHWixXQUFXO2dEQUFYLFdBQVc7Ozs7aUJBQVgsV0FBVzs7O2dDQXdCUixVQUFVLENBQUMsYUFBYTtnQ0FDeEIsVUFBVSxDQUFDLEtBQUs7O2dDQUZWLGNBQWMsQ0FBQyxLQUFLLFFBQUUsR0FBRzs7Ozs7OytCQXJCekIsR0FBRyxFQUFDLFFBQVE7d0JBQ2pCLEdBQUcsRUFBQyxRQUFRO29CQUNoQixHQUFHLEVBQUMsSUFBSTtzQkFDTixHQUFHLEVBQUMsTUFBTTt3QkFDUixTQUFTLElBQUcsQ0FBQyxJQUFJLENBQUM7bUJBQ3ZCLEdBQUcsRUFBQyxHQUFHO3NCQUNBLEtBQUs7NkJBQ0osUUFBUSxJQUFHLE1BQU0sR0FBRyxPQUFPOzhCQUMxQixTQUFTLElBQUcsTUFBTSxHQUFHLE9BQU87NEJBQ3hCLFdBQVc7Ozs7O29CQUN0QixPQUFPLEVBQUMsR0FBRztTQUNqQixJQUFJLEVBQUosSUFBSTtTQUNKLEtBQUssRUFBTCxLQUFLO1NBQ0wsTUFBTSxRQUFFLFFBQVE7U0FDaEIsT0FBTyxRQUFFLFNBQVM7U0FDbEIsUUFBUSxRQUFFLEdBQUcsRUFBQyxRQUFRO1NBQ3RCLFdBQVcsRUFBWCxXQUFXO1NBQ1gsUUFBUSxFQUFSLFFBQVE7U0FDUixPQUFPLEVBQVAsT0FBTztTQUNQOzs7Ozs7Ozs7O1lBUUMsSUFBSTs7OENBQUosSUFBSTs0QkFBUSxPQUFPLEVBQUMsZUFBZSxHQUFHLE9BQU8sRUFBUCxPQUFPLElBQUUsUUFBUSxFQUFSLFFBQVE7OzsyQkFBdkQsSUFBSTs7Ozs7b0JBRkEsUUFBUSxXQUFJLFFBQVE7Ozs7Ozs7Ozs7OztzQ0FJTyxPQUFPLEVBQUMsTUFBTSxHQUFHLElBQUksRUFBSixJQUFJOzs7Y0FBckQsSUFBSTs7dUJBQVMsR0FBRyxFQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1REFHdEIsR0FBRyxFQUFDLEtBQUs7Ozs7Ozs7OztlQUVULElBQUk7O3dCQUFTLEdBQUcsRUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7MENBSFosR0FBRyxFQUFDLEtBQUssRUFBSyxRQUFROzs7Ozs7Ozs7Ozs7c0NBTUQsT0FBTyxFQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUosSUFBSTs7O2NBQXJELElBQUk7O3VCQUFTLEdBQUcsRUFBQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0EvRDFCO1VBQUEsV0FJUyxVQUFVLENBQUMsa0JBQWtCO1VBSnRDLFdBS1MsY0FBYztvQkFMdkI7OztBQUZPIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJUYWJiYXIuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG5cdGltcG9ydCBTbG90IGZyb20gJy4uL1Nsb3QvU2xvdC5zdmVsdGUnO1xuXHRpbXBvcnQgdHlwZSB7IFRhYmJhclByb3BzLCBUYWJJdGVtIH0gZnJvbSAnLi90YWJiYXIucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VUYWJiYXJUaGVtZSB9IGZyb20gJy4vdGFiYmFyLnRoZW1lLmpzJztcblx0aW1wb3J0IHsgdXNlTmF2aWdhdGlvbiB9IGZyb20gJyRsaWIvdXRpbHMvdXNlTmF2aWdhdGlvbi5zdmVsdGUuanMnO1xuXHRpbXBvcnQgdHlwZSB7IFNuaXBwZXQgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyB1bnRyYWNrIH0gZnJvbSAnc3ZlbHRlJztcblxuXHRsZXQge1xuXHRcdGl0ZW1zLFxuXHRcdGFjdGl2ZVRhYiA9ICRiaW5kYWJsZSgwKSxcblx0XHRvbkNoYW5nZSxcblx0XHRzaXplID0gJ25vcm1hbCcsXG5cdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcsXG5cdFx0Y29sb3IgPSAncHJpbWFyeScsXG5cdFx0YWxpZ25tZW50ID0gJ3N0YXJ0Jyxcblx0XHRwb3NpdGlvbiA9ICd0b3AnLFxuXHRcdHZhcmlhbnQgPSAndW5kZXJsaW5lJyxcblx0XHRjbGFzczogY2xhc3NOYW1lID0gJycsXG5cdFx0dGhlbWUsXG5cdFx0ZnVsbFdpZHRoID0gZmFsc2UsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogVGFiYmFyUHJvcHMgPSAkcHJvcHMoKTtcblxuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlVGFiYmFyVGhlbWUodGhlbWUpKTtcblxuXHR0eXBlIE5vcm1hbGl6ZWRUYWIgPSB7XG5cdFx0bGFiZWw6IHN0cmluZyB8IFNuaXBwZXQ7XG5cdFx0cHJlZml4PzogU25pcHBldDtcblx0XHRzdWZmaXg/OiBTbmlwcGV0O1xuXHRcdGhyZWY/OiBzdHJpbmc7XG5cdFx0ZGlzYWJsZWQ6IGJvb2xlYW47XG5cdFx0dGFyZ2V0Pzogc3RyaW5nO1xuXHRcdHJlbD86IHN0cmluZztcblx0fTtcblxuXHQvLyBOb3JtYWxpemUgdGFiIGl0ZW1zIHRvIGFsd2F5cyB3b3JrIHdpdGggb2JqZWN0c1xuXHRjb25zdCBub3JtYWxpemVkVGFicyA9ICRkZXJpdmVkKFxuXHRcdGl0ZW1zLm1hcCgodGFiKTogTm9ybWFsaXplZFRhYiA9PlxuXHRcdFx0dHlwZW9mIHRhYiA9PT0gJ3N0cmluZydcblx0XHRcdFx0PyB7IGxhYmVsOiB0YWIsIHByZWZpeDogdW5kZWZpbmVkLCBzdWZmaXg6IHVuZGVmaW5lZCwgaHJlZjogdW5kZWZpbmVkLCBkaXNhYmxlZDogZmFsc2UgfVxuXHRcdFx0XHQ6IHtcblx0XHRcdFx0XHRcdGxhYmVsOiB0YWIubGFiZWwsXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRhYi5wcmVmaXgsXG5cdFx0XHRcdFx0XHRzdWZmaXg6IHRhYi5zdWZmaXgsXG5cdFx0XHRcdFx0XHRocmVmOiB0YWIuaHJlZixcblx0XHRcdFx0XHRcdGRpc2FibGVkOiB0YWIuZGlzYWJsZWQgPz8gZmFsc2UsXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IHRhYi50YXJnZXQsXG5cdFx0XHRcdFx0XHRyZWw6IHRhYi5yZWxcblx0XHRcdFx0XHR9XG5cdFx0KVxuXHQpO1xuXG5cdC8vIE5hdmlnYXRpb24gaG9vayBmb3Iga2V5Ym9hcmQgc3VwcG9ydFxuXHRjb25zdCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbih7XG5cdFx0b3JpZW50YXRpb246ICgpID0+IG9yaWVudGF0aW9uLFxuXHRcdGxvb3A6IHRydWUsXG5cdFx0aWQsXG5cdFx0ZW5hYmxlSG92ZXJGb2N1czogZmFsc2UsXG5cdFx0b25DaGFuZ2U6IChpbmRleCkgPT4ge1xuXHRcdFx0aWYgKGluZGV4ICE9PSBudWxsICYmIGluZGV4ICE9PSBhY3RpdmVUYWIpIHtcblx0XHRcdFx0YWN0aXZlVGFiID0gaW5kZXg7XG5cdFx0XHRcdG9uQ2hhbmdlPy4oaW5kZXgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVmYXVsdEZvY3VzZWRJbmRleDogKCkgPT4gYWN0aXZlVGFiXG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGluZGV4OiBudW1iZXIsIHRhYjogTm9ybWFsaXplZFRhYikge1xuXHRcdGlmICghdGFiLmRpc2FibGVkICYmICF0YWIuaHJlZikge1xuXHRcdFx0YWN0aXZlVGFiID0gaW5kZXg7XG5cdFx0XHRvbkNoYW5nZT8uKGluZGV4KTtcblx0XHRcdG5hdmlnYXRpb24uZm9jdXNJdGVtKGluZGV4KTtcblx0XHR9XG5cdH1cblxuXHQvLyAtLS0gQWN0aXZlIGluZGljYXRvciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFR3by1wYXJ0IHN0cmF0ZWd5IHNvIHRoZSBiYXIgaXMgY29ycmVjdCBhdCBldmVyeSBzdGFnZTpcblx0Ly8gIOKAoiBTU1IgKyBwcmUtaHlkcmF0aW9uOiBhIENTUy1vbmx5IGluZGljYXRvciByZW5kZXJlZCBJTlNJREUgdGhlIGFjdGl2ZSB0YWJcblx0Ly8gICAgKGBzdGF0aWNJbmRpY2F0b3JgKSwgcG9zaXRpb25lZCBwdXJlbHkgYnkgbGF5b3V0IOKAlCBubyBtZWFzdXJlbWVudCBuZWVkZWQuXG5cdC8vICDigKIgQWZ0ZXIgaHlkcmF0aW9uOiBhIHNpbmdsZSBhYnNvbHV0ZWx5LXBvc2l0aW9uZWQgZWxlbWVudCBtZWFzdXJlZCBvbnRvIHRoZVxuXHQvLyAgICBhY3RpdmUgdGFiIHRoYXQgc2xpZGVzL3Jlc2l6ZXMgYmV0d2VlbiB0YWJzLiBJdCByZXBsYWNlcyB0aGUgc3RhdGljIG9uZSBhdFxuXHQvLyAgICB0aGUgaWRlbnRpY2FsIHNwb3QsIHNvIHRoZSBoYW5kb2ZmIGlzIHNlYW1sZXNzLlxuXHRsZXQgdGFiRWxzOiBBcnJheTxIVE1MRWxlbWVudCB8IHVuZGVmaW5lZD4gPSBbXTtcblx0bGV0IGluZGljYXRvclN0eWxlID0gJHN0YXRlKCcnKTtcblx0bGV0IGluZGljYXRvclJlYWR5ID0gJHN0YXRlKGZhbHNlKTtcblx0Ly8gRmxpcHMgdHJ1ZSBvbmNlIHRoZSBtZWFzdXJlZCBpbmRpY2F0b3IgaGFzIGJlZW4gcGxhY2VkIG9uIHRoZSBjbGllbnQ7IHVudGlsXG5cdC8vIHRoZW4gdGhlIHN0YXRpYyAoU1NSKSBpbmRpY2F0b3IgaXMgc2hvd24uXG5cdGxldCBoeWRyYXRlZCA9ICRzdGF0ZShmYWxzZSk7XG5cblx0Y29uc3QgcGxhY2VJbmRpY2F0b3IgPSAoKTogYm9vbGVhbiA9PiB7XG5cdFx0Y29uc3QgZWwgPSB0YWJFbHNbYWN0aXZlVGFiXTtcblx0XHRpZiAoIWVsKSByZXR1cm4gZmFsc2U7XG5cdFx0Ly8gb2Zmc2V0TGVmdC9Ub3AgYXJlIHJlbGF0aXZlIHRvIHRoZSByb290IChpdCBpcyBgcmVsYXRpdmVgKSwgc28gdGhpcyBpc1xuXHRcdC8vIGltbXVuZSB0byBwYWdlIHNjcm9sbCBhbmQgbGF5b3V0IHNoaWZ0cyBhYm92ZSB0aGUgdGFiYmFyLlxuXHRcdGNvbnN0IHggPSBlbC5vZmZzZXRMZWZ0O1xuXHRcdGNvbnN0IHkgPSBlbC5vZmZzZXRUb3A7XG5cdFx0Y29uc3QgdyA9IGVsLm9mZnNldFdpZHRoO1xuXHRcdGNvbnN0IGggPSBlbC5vZmZzZXRIZWlnaHQ7XG5cdFx0aWYgKHZhcmlhbnQgPT09ICdwaWxsJykge1xuXHRcdFx0aW5kaWNhdG9yU3R5bGUgPSBgdHJhbnNmb3JtOnRyYW5zbGF0ZSgke3h9cHgsICR7eX1weCk7d2lkdGg6JHt3fXB4O2hlaWdodDoke2h9cHhgO1xuXHRcdH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdib3R0b20nKSB7XG5cdFx0XHRpbmRpY2F0b3JTdHlsZSA9IGB0cmFuc2Zvcm06dHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KTt3aWR0aDoke3d9cHg7aGVpZ2h0OjJweGA7XG5cdFx0fSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRpbmRpY2F0b3JTdHlsZSA9IGB0cmFuc2Zvcm06dHJhbnNsYXRlKCR7eCArIHcgLSAyfXB4LCAke3l9cHgpO3dpZHRoOjJweDtoZWlnaHQ6JHtofXB4YDtcblx0XHR9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAncmlnaHQnKSB7XG5cdFx0XHRpbmRpY2F0b3JTdHlsZSA9IGB0cmFuc2Zvcm06dHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KTt3aWR0aDoycHg7aGVpZ2h0OiR7aH1weGA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vICd0b3AnIChkZWZhdWx0KTogdW5kZXJsaW5lIGFsb25nIHRoZSBib3R0b20gZWRnZS5cblx0XHRcdGluZGljYXRvclN0eWxlID0gYHRyYW5zZm9ybTp0cmFuc2xhdGUoJHt4fXB4LCAke3kgKyBoIC0gMn1weCk7d2lkdGg6JHt3fXB4O2hlaWdodDoycHhgO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHQvLyBSZS1wbGFjZSB3aGVuZXZlciBhbnl0aGluZyB0aGF0IG1vdmVzIG9yIHJlc2l6ZXMgdGhlIHRhYnMgY2hhbmdlcy5cblx0JGVmZmVjdCgoKSA9PiB7XG5cdFx0YWN0aXZlVGFiO1xuXHRcdGl0ZW1zO1xuXHRcdHNpemU7XG5cdFx0dmFyaWFudDtcblx0XHRwb3NpdGlvbjtcblx0XHRvcmllbnRhdGlvbjtcblx0XHRhbGlnbm1lbnQ7XG5cdFx0ZnVsbFdpZHRoO1xuXHRcdHVudHJhY2soKCkgPT4gcGxhY2VJbmRpY2F0b3IoKSk7XG5cdH0pO1xuXG5cdGNvbnN0IGNvbGxlY3RUYWIgPSAoaW5kZXg6IG51bWJlcikgPT4gKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG5cdFx0cmV0dXJuIHVudHJhY2soKCkgPT4ge1xuXHRcdFx0dGFiRWxzW2luZGV4XSA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR0YWJFbHNbaW5kZXhdID0gdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCByb290QXR0YWNobWVudCA9IChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuXHRcdHJldHVybiB1bnRyYWNrKCgpID0+IHtcblx0XHRcdC8vIENvbnRhaW5lciByZXNpemVzIChmdWxsV2lkdGgsIGZvbnQgbG9hZCwgcmVzcG9uc2l2ZSByZWZsb3cpIG1vdmUgdGhlXG5cdFx0XHQvLyB0YWJzIHdpdGhvdXQgY2hhbmdpbmcgYW55IHJlYWN0aXZlIHByb3Ag4oCUIHJlLW1lYXN1cmUgb24gcmVzaXplLlxuXHRcdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gcGxhY2VJbmRpY2F0b3IoKSk7XG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKG5vZGUpO1xuXHRcdFx0Ly8gUGxhY2UgdGhlIG1lYXN1cmVkIGluZGljYXRvciwgdGhlbiBoYW5kIG9mZiBmcm9tIHRoZSBzdGF0aWMgU1NSIGJhciBpblxuXHRcdFx0Ly8gdGhlIHNhbWUgdXBkYXRlIChpZGVudGljYWwgcG9zaXRpb24g4oaSIG5vIHZpc2libGUganVtcCkuXG5cdFx0XHRpZiAocGxhY2VJbmRpY2F0b3IoKSkgaHlkcmF0ZWQgPSB0cnVlO1xuXHRcdFx0Ly8gRW5hYmxlIHRoZSBzbGlkZSB0cmFuc2l0aW9uIG9ubHkgYWZ0ZXIgdGhlIGluaXRpYWwgcG9zaXRpb24gaGFzIHBhaW50ZWRcblx0XHRcdC8vICh0d28gZnJhbWVzKSwgc28gdGhlIGhhbmRvZmYgaXMgaW5zdGFudCBhbmQgb25seSBsYXRlciBzd2l0Y2hlcyBzbGlkZS5cblx0XHRcdGxldCByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRyYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gKGluZGljYXRvclJlYWR5ID0gdHJ1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuPC9zY3JpcHQ+XG5cbjxkaXZcblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7IG9yaWVudGF0aW9uLCBhbGlnbm1lbnQsIHNpemUsIHZhcmlhbnQsIGNsYXNzTmFtZSwgZnVsbFdpZHRoIH0pfVxuXHRyb2xlPVwidGFibGlzdFwiXG5cdGFyaWEtb3JpZW50YXRpb249e29yaWVudGF0aW9ufVxuXHR7QGF0dGFjaCBuYXZpZ2F0aW9uLmNvbnRhaW5lclJlZmVyZW5jZX1cblx0e0BhdHRhY2ggcm9vdEF0dGFjaG1lbnR9XG5cdHsuLi5hdHRhY2htZW50c31cbj5cblx0eyNpZiBoeWRyYXRlZH1cblx0XHQ8IS0tIE1lYXN1cmVkLCBhbmltYXRlZCBpbmRpY2F0b3IgKGNsaWVudCBvbmx5KS4gLS0+XG5cdFx0PGRpdlxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuaW5kaWNhdG9yKHsgdmFyaWFudCB9KX1cblx0XHRcdHN0eWxlPXtpbmRpY2F0b3JTdHlsZX1cblx0XHRcdGRhdGEtY29sb3I9e2NvbG9yfVxuXHRcdFx0ZGF0YS1yZWFkeT17aW5kaWNhdG9yUmVhZHkgPyAndHJ1ZScgOiAnZmFsc2UnfVxuXHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHQ+PC9kaXY+XG5cdHsvaWZ9XG5cdHsjZWFjaCBub3JtYWxpemVkVGFicyBhcyB0YWIsIGluZGV4fVxuXHRcdHtAY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVUYWIgPT09IGluZGV4fVxuXHRcdHtAY29uc3QgaXNGb2N1c2VkID0gbmF2aWdhdGlvbi5mb2N1c2VkSW5kZXggPT09IGluZGV4fVxuXHRcdHtAY29uc3QgZWxlbWVudFR5cGUgPSB0YWIuaHJlZiA/ICdhJyA6ICdidXR0b24nfVxuXG5cdFx0PHN2ZWx0ZTplbGVtZW50XG5cdFx0XHR0aGlzPXtlbGVtZW50VHlwZX1cblx0XHRcdHJvbGU9XCJ0YWJcIlxuXHRcdFx0YXJpYS1kaXNhYmxlZD17dGFiLmRpc2FibGVkfVxuXHRcdFx0ZGlzYWJsZWQ9e3RhYi5kaXNhYmxlZH1cblx0XHRcdGhyZWY9e3RhYi5ocmVmfVxuXHRcdFx0dGFyZ2V0PXt0YWIudGFyZ2V0fVxuXHRcdFx0dGFiaW5kZXg9e2lzRm9jdXNlZCA/IDAgOiAtMX1cblx0XHRcdHJlbD17dGFiLnJlbH1cblx0XHRcdGRhdGEtY29sb3I9e2NvbG9yfVxuXHRcdFx0ZGF0YS1hY3RpdmU9e2lzQWN0aXZlID8gJ3RydWUnIDogJ2ZhbHNlJ31cblx0XHRcdGRhdGEtZm9jdXNlZD17aXNGb2N1c2VkID8gJ3RydWUnIDogJ2ZhbHNlJ31cblx0XHRcdGRhdGEtb3JpZW50YXRpb249e29yaWVudGF0aW9ufVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMudGFiKHtcblx0XHRcdFx0c2l6ZSxcblx0XHRcdFx0Y29sb3IsXG5cdFx0XHRcdGFjdGl2ZTogaXNBY3RpdmUsXG5cdFx0XHRcdGZvY3VzZWQ6IGlzRm9jdXNlZCxcblx0XHRcdFx0ZGlzYWJsZWQ6IHRhYi5kaXNhYmxlZCxcblx0XHRcdFx0b3JpZW50YXRpb24sXG5cdFx0XHRcdHBvc2l0aW9uLFxuXHRcdFx0XHR2YXJpYW50LFxuXHRcdFx0XHRmdWxsV2lkdGhcblx0XHRcdH0pfVxuXHRcdFx0b25jbGljaz17KCkgPT4gaGFuZGxlVGFiQ2xpY2soaW5kZXgsIHRhYil9XG5cdFx0XHR7QGF0dGFjaCBuYXZpZ2F0aW9uLml0ZW1SZWZlcmVuY2V9XG5cdFx0XHR7QGF0dGFjaCBjb2xsZWN0VGFiKGluZGV4KX1cblx0XHQ+XG5cdFx0XHR7I2lmICFoeWRyYXRlZCAmJiBpc0FjdGl2ZX1cblx0XHRcdFx0PCEtLSBDU1Mtb25seSBpbmRpY2F0b3IgZm9yIFNTUiAvIHByZS1oeWRyYXRpb24sIHBvc2l0aW9uZWQgYnkgbGF5b3V0LiAtLT5cblx0XHRcdFx0PHNwYW4gY2xhc3M9e2NsYXNzZXMuc3RhdGljSW5kaWNhdG9yKHsgdmFyaWFudCwgcG9zaXRpb24gfSl9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdHsvaWZ9XG5cdFx0XHQ8U2xvdCByZW5kZXI9e3RhYi5wcmVmaXh9IGNsYXNzPXtjbGFzc2VzLnByZWZpeCh7IHNpemUgfSl9IC8+XG5cblx0XHRcdHsjaWYgdHlwZW9mIHRhYi5sYWJlbCA9PT0gJ3N0cmluZyd9XG5cdFx0XHRcdHt0YWIubGFiZWx9XG5cdFx0XHR7OmVsc2V9XG5cdFx0XHRcdDxTbG90IHJlbmRlcj17dGFiLmxhYmVsfSAvPlxuXHRcdFx0ey9pZn1cblxuXHRcdFx0PFNsb3QgcmVuZGVyPXt0YWIuc3VmZml4fSBjbGFzcz17Y2xhc3Nlcy5zdWZmaXgoeyBzaXplIH0pfSAvPlxuXHRcdDwvc3ZlbHRlOmVsZW1lbnQ+XG5cdHsvZWFjaH1cbjwvZGl2PlxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9UYWJiYXIvVGFiYmFyLnN2ZWx0ZSJ9