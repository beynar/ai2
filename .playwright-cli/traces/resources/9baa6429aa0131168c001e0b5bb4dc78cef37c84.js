import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Stepper/Stepper.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Stepper[$.FILENAME] = 'src/lib/components/Stepper/Stepper.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { untrack } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import BeforeHydratation from "/src/lib/components/Utils/BeforeHydratation.svelte";
import { useStepperTheme } from "/src/lib/components/Stepper/stepper.theme.ts";
import { StepperState } from "/src/lib/components/Stepper/stepper.state.svelte.ts";

var root = $.add_locations($.from_html(`<div><!></div>`), Stepper[$.FILENAME], [[106, 3]]);
var root_1 = $.add_locations($.from_html(`<!> <div><div></div></div>`, 1), Stepper[$.FILENAME], [[81, 0, [[93, 1]]]]);

function Stepper($$anchor, $$props) {
	const id = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, Stepper);

	let items = $.prop($$props, 'items', 19, () => []),
		activeStep = $.prop($$props, 'activeStep', 15, 0),
		bindableStepper = $.prop($$props, 'stepper', 15),
		keyFramesOptions = $.prop($$props, 'keyFramesOptions', 19, () => ({ duration: 300, easing: 'ease-in-out', fill: 'both' })),
		mode = $.prop($$props, 'mode', 3, 'classic'),
		panelRole = $.prop($$props, 'panelRole', 3, 'tabpanel');

	const stepper = new StepperState({
		get activeStep() {
			return activeStep();
		},

		set activeStep(value) {
			activeStep(value);
		},

		get items() {
			return items();
		},

		get onChange() {
			return $$props.onChange;
		},

		get keyFramesOptions() {
			return keyFramesOptions();
		}
	});

	bindableStepper(stepper);

	const classes = $.tag($.derived(useStepperTheme), 'classes');
	const activeHeight = $.tag($.derived(() => stepper.stepHeights[activeStep()]), 'activeHeight');

	$.user_effect(() => {
		const targetStep = activeStep();

		if ($.strict_equals(items().length, 0)) return;

		untrack(() => stepper.syncActiveStep(targetStep));
	});

	const getPanelAriaLabelledby = (item, index) => {
		if ($.strict_equals($$props.panelAriaLabelledby, false)) return undefined;

		if ($.strict_equals(typeof $$props.panelAriaLabelledby, 'function')) {
			return $$props.panelAriaLabelledby({ stepper, item, index });
		}

		if ($.strict_equals(typeof $$props.panelAriaLabelledby, 'string')) return $$props.panelAriaLabelledby;
		if ($.strict_equals(panelRole(), 'tabpanel')) return `stepper-${index}`;

		return undefined;
	};

	var $$exports = { ...$.legacy_api() };
	var fragment = root_1();
	var node = $.first_child(fragment);

	{
		let $0 = $.derived(() => [
			`const setStepperHeight_${id} = () => {	
const container = document.getElementById('stepper-${id}');
if(!container) return;
const firstSlide = container.querySelector('[data-step-active="true"]');
if(!firstSlide) return;		
container.style.height = firstSlide.clientHeight + 'px';			
	};
	setStepperHeight_${id}();
`
		]);

		$.add_svelte_meta(
			() => BeforeHydratation(node, {
				once: true,
				get scripts() {
					return $.get($0);
				}
			}),
			'component',
			Stepper,
			66,
			0,
			{ componentTag: 'BeforeHydratation' }
		);
	}

	var div = $.sibling(node, 2);
	let styles;
	var div_1 = $.child(div);
	let styles_1;

	$.add_svelte_meta(
		() => $.each(div_1, 21, items, $.index, ($$anchor, item, index) => {
			const isActiveStep = $.tag($.derived(() => $.strict_equals(stepper.activeStep, index)), 'isActiveStep');

			$.get(isActiveStep);

			const ariaLabelledby = $.tag($.derived(() => getPanelAriaLabelledby($.get(item), index)), 'ariaLabelledby');

			$.get(ariaLabelledby);

			const panelTabindex = $.tag($.derived(() => $.strict_equals(panelRole(), 'tabpanel') ? $.get(isActiveStep) ? 0 : -1 : undefined), 'panelTabindex');

			$.get(panelTabindex);

			var div_2 = root();

			$.set_attribute(div_2, 'data-step', index);

			let styles_2;
			var node_1 = $.child(div_2);

			$.add_svelte_meta(() => $.snippet(node_1, () => $$props.children ?? $.noop, () => ({ stepper, item: $.get(item), index })), 'render', Stepper, 129, 4);
			$.reset(div_2);

			$.template_effect(
				($0) => {
					$.set_attribute(div_2, 'data-step-active', $.get(isActiveStep));
					$.set_attribute(div_2, 'tabindex', $.get(panelTabindex));
					div_2.inert = !$.get(isActiveStep);
					$.set_attribute(div_2, 'role', panelRole() ?? undefined);
					$.set_attribute(div_2, 'aria-labelledby', $.get(ariaLabelledby));
					$.set_class(div_2, 1, $0);

					styles_2 = $.set_style(div_2, '', styles_2, {
						opacity: $.get(isActiveStep) ? 1 : 0,
						'pointer-events': $.get(isActiveStep) ? 'auto' : 'none',
						'transition-property': 'opacity',
						'transition-duration': `${keyFramesOptions().duration}ms`,
						'transition-timing-function': keyFramesOptions().easing
					});
				},
				[() => $.clsx($.get(classes).step({ mode: mode() }))]
			);

			$.bind_element_size(div_2, 'clientHeight', (value) => {
				if (!stepper?.stepHeights) return;

				stepper.stepHeights[index] = value || 0;
			});

			$.append($$anchor, div_2);
		}),
		'each',
		Stepper,
		101,
		2
	);

	$.reset(div_1);
	$.bind_this(div_1, ($$value) => stepper.stepContainer = $$value, () => stepper?.stepContainer);
	$.reset(div);
	$.attach(div, () => stepper.scroller);

	$.template_effect(
		($0, $1) => {
			$.set_class(div, 1, $0);
			$.set_attribute(div, 'id', `stepper-${id}`);

			styles = $.set_style(div, '', styles, {
				overflow: stepper?.isAnimating ? 'hidden' : 'visible',
				'will-change': 'height',
				height: $.equals($.get(activeHeight), null) ? undefined : `${$.get(activeHeight)}px`,
				'transition-duration': `${keyFramesOptions().duration}ms`
			});

			$.set_class(div_1, 1, $1);

			styles_1 = $.set_style(div_1, '', styles_1, {
				'pointer-events': 'none',
				'grid-template-columns': `repeat(${items().length ?? ''}, 100%)`
			});
		},
		[
			() => $.clsx($.get(classes).root({ mode: mode(), className: $$props.class })),
			() => $.clsx($.get(classes).container({ mode: mode() }))
		]
	);

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Stepper = $.hmr(Stepper);

	import.meta.hot.acceptExports(["default"],(module) => {
		Stepper[$.HMR].update(module.default);
	});
}

export default Stepper;
//# sourceMappingURL=data:application/json;base64,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QUFNOzs7d0JBQ2xELE9BQU8sRUFBQyxJQUFJLEdBQ2xCOzs7dUJBcEJELHdCQUdFLEtBQUssS0FBSztJQUNWLEVBQUUsR0FBRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU07O0lBQ2pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxDQUFDO0dBQ3hDOztzQkFORDs7Ozs7Ozs7U0FiRjthQUFBLG9CQUNXLE9BQU8sQ0FBQyxhQUFhLGtCQUFyQixPQUFPLEVBQUMsYUFBYTtTQWJqQztVQUFBLFdBQ1MsT0FBTyxDQUFDLFFBQVE7Ozs7ZUFEekI7bUJBQUEsc0JBTWEsRUFBRTs7d0JBTmY7Y0FPZ0IsT0FBTyxFQUFFLFdBQVcsR0FBRyxRQUFRLEdBQUcsU0FBUzs7MkJBRTdDLFlBQVksR0FBSSxJQUFJLElBQUcsU0FBUyxZQUFNLFlBQVk7OEJBQ2xDLGdCQUFnQixHQUFDLFFBQVE7OztlQUV0RDs7MEJBQUE7O3VDQU1xQyxLQUFLLEdBQUMsTUFBTTs7OztzQkFoQjNDLE9BQU8sRUFBQyxJQUFJLEdBQ2xCLElBQUksRUFBSixJQUFJLElBQ0o7c0JBVU8sT0FBTyxFQUFDLFNBQVMsR0FDdkI7Ozs7Ozs7QUFoQ0siLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlN0ZXBwZXIuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCIgZ2VuZXJpY3M9XCJJdGVtXCI+XG5cdGltcG9ydCB7IHVudHJhY2sgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgQmVmb3JlSHlkcmF0YXRpb24gZnJvbSAnLi4vVXRpbHMvQmVmb3JlSHlkcmF0YXRpb24uc3ZlbHRlJztcblx0aW1wb3J0IHsgdHlwZSBTdGVwcGVyUHJvcHMgfSBmcm9tICcuL3N0ZXBwZXIucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VTdGVwcGVyVGhlbWUgfSBmcm9tICcuL3N0ZXBwZXIudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBTdGVwcGVyU3RhdGUgfSBmcm9tICcuL3N0ZXBwZXIuc3RhdGUuc3ZlbHRlLmpzJztcblx0ZXhwb3J0IHR5cGUgeyBTdGVwcGVyU3RhdGUgfTtcblx0bGV0IHtcblx0XHRpdGVtcyA9IFtdLFxuXHRcdGFjdGl2ZVN0ZXAgPSAkYmluZGFibGUoMCksXG5cdFx0c3RlcHBlcjogYmluZGFibGVTdGVwcGVyID0gJGJpbmRhYmxlPFN0ZXBwZXJTdGF0ZTxJdGVtPj4oKSxcblx0XHRjbGFzczogY2xhc3NOYW1lLFxuXHRcdGNoaWxkcmVuLFxuXHRcdG9uQ2hhbmdlLFxuXHRcdGtleUZyYW1lc09wdGlvbnMgPSB7XG5cdFx0XHRkdXJhdGlvbjogMzAwLFxuXHRcdFx0ZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuXHRcdFx0ZmlsbDogJ2JvdGgnXG5cdFx0fSxcblx0XHRtb2RlID0gJ2NsYXNzaWMnLFxuXHRcdHBhbmVsUm9sZSA9ICd0YWJwYW5lbCcsXG5cdFx0cGFuZWxBcmlhTGFiZWxsZWRieVxuXHR9OiBTdGVwcGVyUHJvcHM8SXRlbT4gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXG5cdGNvbnN0IHN0ZXBwZXIgPSBuZXcgU3RlcHBlclN0YXRlKHtcblx0XHRnZXQgYWN0aXZlU3RlcCgpIHtcblx0XHRcdHJldHVybiBhY3RpdmVTdGVwO1xuXHRcdH0sXG5cdFx0c2V0IGFjdGl2ZVN0ZXAodmFsdWUpIHtcblx0XHRcdGFjdGl2ZVN0ZXAgPSB2YWx1ZTtcblx0XHR9LFxuXHRcdGdldCBpdGVtcygpIHtcblx0XHRcdHJldHVybiBpdGVtcztcblx0XHR9LFxuXHRcdGdldCBvbkNoYW5nZSgpIHtcblx0XHRcdHJldHVybiBvbkNoYW5nZTtcblx0XHR9LFxuXHRcdGdldCBrZXlGcmFtZXNPcHRpb25zKCkge1xuXHRcdFx0cmV0dXJuIGtleUZyYW1lc09wdGlvbnM7XG5cdFx0fVxuXHR9KTtcblxuXHRiaW5kYWJsZVN0ZXBwZXIgPSBzdGVwcGVyO1xuXHRjb25zdCBjbGFzc2VzID0gJGRlcml2ZWQodXNlU3RlcHBlclRoZW1lKCkpO1xuXHRjb25zdCBhY3RpdmVIZWlnaHQgPSAkZGVyaXZlZChzdGVwcGVyLnN0ZXBIZWlnaHRzW2FjdGl2ZVN0ZXBdKTtcblxuXHQkZWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCB0YXJnZXRTdGVwID0gYWN0aXZlU3RlcDtcblx0XHRpZiAoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cdFx0dW50cmFjaygoKSA9PiBzdGVwcGVyLnN5bmNBY3RpdmVTdGVwKHRhcmdldFN0ZXApKTtcblx0fSk7XG5cblx0Y29uc3QgZ2V0UGFuZWxBcmlhTGFiZWxsZWRieSA9IChpdGVtOiBJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cdFx0aWYgKHBhbmVsQXJpYUxhYmVsbGVkYnkgPT09IGZhbHNlKSByZXR1cm4gdW5kZWZpbmVkO1xuXHRcdGlmICh0eXBlb2YgcGFuZWxBcmlhTGFiZWxsZWRieSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIHBhbmVsQXJpYUxhYmVsbGVkYnkoeyBzdGVwcGVyLCBpdGVtLCBpbmRleCB9KTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBwYW5lbEFyaWFMYWJlbGxlZGJ5ID09PSAnc3RyaW5nJykgcmV0dXJuIHBhbmVsQXJpYUxhYmVsbGVkYnk7XG5cdFx0aWYgKHBhbmVsUm9sZSA9PT0gJ3RhYnBhbmVsJykgcmV0dXJuIGBzdGVwcGVyLSR7aW5kZXh9YDtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuPC9zY3JpcHQ+XG5cbjxCZWZvcmVIeWRyYXRhdGlvblxuXHRvbmNlXG5cdHNjcmlwdHM9e1tcblx0XHRgY29uc3Qgc2V0U3RlcHBlckhlaWdodF8ke2lkfSA9ICgpID0+IHtcdFxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXBwZXItJHtpZH0nKTtcbmlmKCFjb250YWluZXIpIHJldHVybjtcbmNvbnN0IGZpcnN0U2xpZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc3RlcC1hY3RpdmU9XCJ0cnVlXCJdJyk7XG5pZighZmlyc3RTbGlkZSkgcmV0dXJuO1x0XHRcbmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBmaXJzdFNsaWRlLmNsaWVudEhlaWdodCArICdweCc7XHRcdFx0XG5cdH07XG5cdHNldFN0ZXBwZXJIZWlnaHRfJHtpZH0oKTtcbmBcblx0XX1cbi8+XG5cbjxkaXZcblx0e0BhdHRhY2ggc3RlcHBlci5zY3JvbGxlcn1cblx0Y2xhc3M9e2NsYXNzZXMucm9vdCh7XG5cdFx0bW9kZSxcblx0XHRjbGFzc05hbWVcblx0fSl9XG5cdGlkPVwic3RlcHBlci17aWR9XCJcblx0c3R5bGU6b3ZlcmZsb3c9e3N0ZXBwZXI/LmlzQW5pbWF0aW5nID8gJ2hpZGRlbicgOiAndmlzaWJsZSd9XG5cdHN0eWxlOndpbGwtY2hhbmdlPVwiaGVpZ2h0XCJcblx0c3R5bGU6aGVpZ2h0PXthY3RpdmVIZWlnaHQgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGAke2FjdGl2ZUhlaWdodH1weGB9XG5cdHN0eWxlOnRyYW5zaXRpb24tZHVyYXRpb249e2Ake2tleUZyYW1lc09wdGlvbnMuZHVyYXRpb259bXNgfVxuPlxuXHQ8ZGl2XG5cdFx0YmluZDp0aGlzPXtzdGVwcGVyLnN0ZXBDb250YWluZXJ9XG5cdFx0Y2xhc3M9e2NsYXNzZXMuY29udGFpbmVyKHtcblx0XHRcdG1vZGVcblx0XHR9KX1cblx0XHRzdHlsZTpwb2ludGVyLWV2ZW50cz1cIm5vbmVcIlxuXHRcdHN0eWxlOmdyaWQtdGVtcGxhdGUtY29sdW1ucz1cInJlcGVhdCh7aXRlbXMubGVuZ3RofSwgMTAwJSlcIlxuXHQ+XG5cdFx0eyNlYWNoIGl0ZW1zIGFzIGl0ZW0sIGluZGV4fVxuXHRcdFx0e0Bjb25zdCBpc0FjdGl2ZVN0ZXAgPSBzdGVwcGVyLmFjdGl2ZVN0ZXAgPT09IGluZGV4fVxuXHRcdFx0e0Bjb25zdCBhcmlhTGFiZWxsZWRieSA9IGdldFBhbmVsQXJpYUxhYmVsbGVkYnkoaXRlbSwgaW5kZXgpfVxuXHRcdFx0e0Bjb25zdCBwYW5lbFRhYmluZGV4ID0gcGFuZWxSb2xlID09PSAndGFicGFuZWwnID8gKGlzQWN0aXZlU3RlcCA/IDAgOiAtMSkgOiB1bmRlZmluZWR9XG5cdFx0XHQ8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeV9ub19ub25pbnRlcmFjdGl2ZV90YWJpbmRleCAtIGZvY3VzYWJsZSB0YWJwYW5lbHMgcHJlc2VydmUgU3RlcHBlcidzIGV4aXN0aW5nIGtleWJvYXJkIGJlaGF2aW9yOyBuZXV0cmFsIHBhbmVscyBvbWl0IHRhYmluZGV4LiAtLT5cblx0XHRcdDxkaXZcblx0XHRcdFx0YmluZDpjbGllbnRIZWlnaHQ9e1xuXHRcdFx0XHRcdCgpID0+IHN0ZXBwZXI/LnN0ZXBIZWlnaHRzPy5baW5kZXhdID8/IHVuZGVmaW5lZCxcblx0XHRcdFx0XHQodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdGlmICghc3RlcHBlcj8uc3RlcEhlaWdodHMpIHJldHVybjtcblx0XHRcdFx0XHRcdHN0ZXBwZXIuc3RlcEhlaWdodHNbaW5kZXhdID0gdmFsdWUgfHwgMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YS1zdGVwLWFjdGl2ZT17aXNBY3RpdmVTdGVwfVxuXHRcdFx0XHRkYXRhLXN0ZXA9e2luZGV4fVxuXHRcdFx0XHR0YWJpbmRleD17cGFuZWxUYWJpbmRleH1cblx0XHRcdFx0aW5lcnQ9eyFpc0FjdGl2ZVN0ZXB9XG5cdFx0XHRcdHJvbGU9e3BhbmVsUm9sZSA/PyB1bmRlZmluZWR9XG5cdFx0XHRcdGFyaWEtbGFiZWxsZWRieT17YXJpYUxhYmVsbGVkYnl9XG5cdFx0XHRcdHN0eWxlOm9wYWNpdHk9e2lzQWN0aXZlU3RlcCA/IDEgOiAwfVxuXHRcdFx0XHRzdHlsZTpwb2ludGVyLWV2ZW50cz17aXNBY3RpdmVTdGVwID8gJ2F1dG8nIDogJ25vbmUnfVxuXHRcdFx0XHRzdHlsZTp0cmFuc2l0aW9uLXByb3BlcnR5PVwib3BhY2l0eVwiXG5cdFx0XHRcdHN0eWxlOnRyYW5zaXRpb24tZHVyYXRpb249e2Ake2tleUZyYW1lc09wdGlvbnMuZHVyYXRpb259bXNgfVxuXHRcdFx0XHRzdHlsZTp0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbj17a2V5RnJhbWVzT3B0aW9ucy5lYXNpbmd9XG5cdFx0XHRcdGNsYXNzPXtjbGFzc2VzLnN0ZXAoe1xuXHRcdFx0XHRcdG1vZGVcblx0XHRcdFx0fSl9XG5cdFx0XHQ+XG5cdFx0XHRcdHtAcmVuZGVyIGNoaWxkcmVuPy4oeyBzdGVwcGVyLCBpdGVtLCBpbmRleCB9KX1cblx0XHRcdDwvZGl2PlxuXHRcdHsvZWFjaH1cblx0PC9kaXY+XG48L2Rpdj5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvbGliL2NvbXBvbmVudHMvU3RlcHBlci9TdGVwcGVyLnN2ZWx0ZSJ9