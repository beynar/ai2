import "/node_modules/.vite/deps/esm-env-D6lI19eD.js?v=1b1d2797";
import { x as transition_slide_display } from "/node_modules/.vite/deps/warnings-CPnO_FYA.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/transition/index.js
/** @import { BlurParams, CrossfadeParams, DrawParams, FadeParams, FlyParams, ScaleParams, SlideParams, TransitionConfig } from './public' */
/** @param {number} x */
var linear = (x) => x;
/** @param {number} t */
function cubic_out(t) {
	const f = t - 1;
	return f * f * f + 1;
}
/**
* @param {number} t
* @returns {number}
*/
function cubic_in_out(t) {
	return t < .5 ? 4 * t * t * t : .5 * Math.pow(2 * t - 2, 3) + 1;
}
/** @param {number | string} value
* @returns {[number, string]}
*/
function split_css_unit(value) {
	const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || "px"] : [value, "px"];
}
/**
* Animates a `blur` filter alongside an element's opacity.
*
* @param {Element} node
* @param {BlurParams} [params]
* @returns {TransitionConfig}
*/
function blur(node, { delay = 0, duration = 400, easing = cubic_in_out, amount = 5, opacity = 0 } = {}) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const f = style.filter === "none" ? "" : style.filter;
	const od = target_opacity * (1 - opacity);
	const [value, unit] = split_css_unit(amount);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `opacity: ${target_opacity - od * u}; filter: ${f} blur(${u * value}${unit});`
	};
}
/**
* Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
*
* @param {Element} node
* @param {FadeParams} [params]
* @returns {TransitionConfig}
*/
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
	const o = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * o}`
	};
}
/**
* Animates the x and y positions and the opacity of an element. `in` transitions animate from the provided values, passed as parameters to the element's default values. `out` transitions animate from the element's default values to the provided values.
*
* @param {Element} node
* @param {FlyParams} [params]
* @returns {TransitionConfig}
*/
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === "none" ? "" : style.transform;
	const od = target_opacity * (1 - opacity);
	const [x_value, x_unit] = split_css_unit(x);
	const [y_value, y_unit] = split_css_unit(y);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
	};
}
var slide_warning = false;
/**
* Slides an element in and out.
*
* @param {Element} node
* @param {SlideParams} [params]
* @returns {TransitionConfig}
*/
function slide(node, { delay = 0, duration = 400, easing = cubic_out, axis = "y" } = {}) {
	const style = getComputedStyle(node);
	if (!slide_warning && /(contents|inline|table)/.test(style.display)) {
		slide_warning = true;
		Promise.resolve().then(() => slide_warning = false);
		transition_slide_display(style.display);
	}
	const opacity = +style.opacity;
	const primary_property = axis === "y" ? "height" : "width";
	const primary_property_value = parseFloat(style[primary_property]);
	const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
	const capitalized_secondary_properties = secondary_properties.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`);
	const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
	const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
	const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
	const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
	const border_width_start_value = parseFloat(style[`border${capitalized_secondary_properties[0]}Width`]);
	const border_width_end_value = parseFloat(style[`border${capitalized_secondary_properties[1]}Width`]);
	return {
		delay,
		duration,
		easing,
		css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;min-${primary_property}: 0`
	};
}
/**
* Animates the opacity and scale of an element. `in` transitions animate from the provided values, passed as parameters, to an element's current (default) values. `out` transitions animate from an element's default values to the provided values.
*
* @param {Element} node
* @param {ScaleParams} [params]
* @returns {TransitionConfig}
*/
function scale(node, { delay = 0, duration = 400, easing = cubic_out, start = 0, opacity = 0 } = {}) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === "none" ? "" : style.transform;
	const sd = 1 - start;
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
	};
}
/**
* Animates the stroke of an SVG element, like a snake in a tube. `in` transitions begin with the path invisible and draw the path to the screen over time. `out` transitions start in a visible state and gradually erase the path. `draw` only works with elements that have a `getTotalLength` method, like `<path>` and `<polyline>`.
*
* @param {SVGElement & { getTotalLength(): number }} node
* @param {DrawParams} [params]
* @returns {TransitionConfig}
*/
function draw(node, { delay = 0, speed, duration, easing = cubic_in_out } = {}) {
	let len = node.getTotalLength();
	const style = getComputedStyle(node);
	if (style.strokeLinecap !== "butt") len += parseInt(style.strokeWidth);
	if (duration === void 0) if (speed === void 0) duration = 800;
	else duration = len / speed;
	else if (typeof duration === "function") duration = duration(len);
	return {
		delay,
		duration,
		easing,
		css: (_, u) => `
			stroke-dasharray: ${len};
			stroke-dashoffset: ${u * len};
		`
	};
}
/**
* @template T
* @template S
* @param {T} tar
* @param {S} src
* @returns {T & S}
*/
function assign(tar, src) {
	for (const k in src) tar[k] = src[k];
	return tar;
}
/**
* The `crossfade` function creates a pair of [transitions](https://svelte.dev/docs/svelte/transition) called `send` and `receive`. When an element is 'sent', it looks for a corresponding element being 'received', and generates a transition that transforms the element to its counterpart's position and fades it out. When an element is 'received', the reverse happens. If there is no counterpart, the `fallback` transition is used.
*
* @param {CrossfadeParams & {
* 	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig;
* }} params
* @returns {[(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig, (node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig]}
*/
function crossfade({ fallback, ...defaults }) {
	/** @type {Map<any, Element>} */
	const to_receive = /* @__PURE__ */ new Map();
	/** @type {Map<any, Element>} */
	const to_send = /* @__PURE__ */ new Map();
	/**
	* @param {Element} from_node
	* @param {Element} node
	* @param {CrossfadeParams} params
	* @returns {TransitionConfig}
	*/
	function crossfade(from_node, node, params) {
		const { delay = 0, duration = (d) => Math.sqrt(d) * 30, easing = cubic_out } = assign(assign({}, defaults), params);
		const from = from_node.getBoundingClientRect();
		const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
		const dw = from.width / to.width;
		const dh = from.height / to.height;
		const d = Math.sqrt(dx * dx + dy * dy);
		const style = getComputedStyle(node);
		const transform = style.transform === "none" ? "" : style.transform;
		const opacity = +style.opacity;
		return {
			delay,
			duration: typeof duration === "function" ? duration(d) : duration,
			easing,
			css: (t, u) => `
			   opacity: ${t * opacity};
			   transform-origin: top left;
			   transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
		   `
		};
	}
	/**
	* @param {Map<any, Element>} items
	* @param {Map<any, Element>} counterparts
	* @param {boolean} intro
	* @returns {(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig}
	*/
	function transition(items, counterparts, intro) {
		return (node, params) => {
			items.set(params.key, node);
			return () => {
				if (counterparts.has(params.key)) {
					const other_node = counterparts.get(params.key);
					counterparts.delete(params.key);
					return crossfade(other_node, node, params);
				}
				items.delete(params.key);
				return fallback && fallback(node, params, intro);
			};
		};
	}
	return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
//#endregion
export { blur, crossfade, draw, fade, fly, scale, slide };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlX3RyYW5zaXRpb24uanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3RyYW5zaXRpb24vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBpbXBvcnQgeyBCbHVyUGFyYW1zLCBDcm9zc2ZhZGVQYXJhbXMsIERyYXdQYXJhbXMsIEZhZGVQYXJhbXMsIEZseVBhcmFtcywgU2NhbGVQYXJhbXMsIFNsaWRlUGFyYW1zLCBUcmFuc2l0aW9uQ29uZmlnIH0gZnJvbSAnLi9wdWJsaWMnICovXG5cbmltcG9ydCB7IERFViB9IGZyb20gJ2VzbS1lbnYnO1xuaW1wb3J0ICogYXMgdyBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvd2FybmluZ3MuanMnO1xuXG4vKiogQHBhcmFtIHtudW1iZXJ9IHggKi9cbmNvbnN0IGxpbmVhciA9ICh4KSA9PiB4O1xuXG4vKiogQHBhcmFtIHtudW1iZXJ9IHQgKi9cbmZ1bmN0aW9uIGN1YmljX291dCh0KSB7XG5cdGNvbnN0IGYgPSB0IC0gMS4wO1xuXHRyZXR1cm4gZiAqIGYgKiBmICsgMS4wO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBjdWJpY19pbl9vdXQodCkge1xuXHRyZXR1cm4gdCA8IDAuNSA/IDQuMCAqIHQgKiB0ICogdCA6IDAuNSAqIE1hdGgucG93KDIuMCAqIHQgLSAyLjAsIDMuMCkgKyAxLjA7XG59XG5cbi8qKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBzdHJpbmddfVxuICovXG5mdW5jdGlvbiBzcGxpdF9jc3NfdW5pdCh2YWx1ZSkge1xuXHRjb25zdCBzcGxpdCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2goL15cXHMqKC0/W1xcZC5dKykoW15cXHNdKilcXHMqJC8pO1xuXHRyZXR1cm4gc3BsaXQgPyBbcGFyc2VGbG9hdChzcGxpdFsxXSksIHNwbGl0WzJdIHx8ICdweCddIDogWy8qKiBAdHlwZSB7bnVtYmVyfSAqLyAodmFsdWUpLCAncHgnXTtcbn1cblxuLyoqXG4gKiBBbmltYXRlcyBhIGBibHVyYCBmaWx0ZXIgYWxvbmdzaWRlIGFuIGVsZW1lbnQncyBvcGFjaXR5LlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtCbHVyUGFyYW1zfSBbcGFyYW1zXVxuICogQHJldHVybnMge1RyYW5zaXRpb25Db25maWd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibHVyKFxuXHRub2RlLFxuXHR7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljX2luX291dCwgYW1vdW50ID0gNSwgb3BhY2l0eSA9IDAgfSA9IHt9XG4pIHtcblx0Y29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXHRjb25zdCB0YXJnZXRfb3BhY2l0eSA9ICtzdHlsZS5vcGFjaXR5O1xuXHRjb25zdCBmID0gc3R5bGUuZmlsdGVyID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLmZpbHRlcjtcblx0Y29uc3Qgb2QgPSB0YXJnZXRfb3BhY2l0eSAqICgxIC0gb3BhY2l0eSk7XG5cdGNvbnN0IFt2YWx1ZSwgdW5pdF0gPSBzcGxpdF9jc3NfdW5pdChhbW91bnQpO1xuXHRyZXR1cm4ge1xuXHRcdGRlbGF5LFxuXHRcdGR1cmF0aW9uLFxuXHRcdGVhc2luZyxcblx0XHRjc3M6IChfdCwgdSkgPT4gYG9wYWNpdHk6ICR7dGFyZ2V0X29wYWNpdHkgLSBvZCAqIHV9OyBmaWx0ZXI6ICR7Zn0gYmx1cigke3UgKiB2YWx1ZX0ke3VuaXR9KTtgXG5cdH07XG59XG5cbi8qKlxuICogQW5pbWF0ZXMgdGhlIG9wYWNpdHkgb2YgYW4gZWxlbWVudCBmcm9tIDAgdG8gdGhlIGN1cnJlbnQgb3BhY2l0eSBmb3IgYGluYCB0cmFuc2l0aW9ucyBhbmQgZnJvbSB0aGUgY3VycmVudCBvcGFjaXR5IHRvIDAgZm9yIGBvdXRgIHRyYW5zaXRpb25zLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtGYWRlUGFyYW1zfSBbcGFyYW1zXVxuICogQHJldHVybnMge1RyYW5zaXRpb25Db25maWd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWRlKG5vZGUsIHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDQwMCwgZWFzaW5nID0gbGluZWFyIH0gPSB7fSkge1xuXHRjb25zdCBvID0gK2dldENvbXB1dGVkU3R5bGUobm9kZSkub3BhY2l0eTtcblx0cmV0dXJuIHtcblx0XHRkZWxheSxcblx0XHRkdXJhdGlvbixcblx0XHRlYXNpbmcsXG5cdFx0Y3NzOiAodCkgPT4gYG9wYWNpdHk6ICR7dCAqIG99YFxuXHR9O1xufVxuXG4vKipcbiAqIEFuaW1hdGVzIHRoZSB4IGFuZCB5IHBvc2l0aW9ucyBhbmQgdGhlIG9wYWNpdHkgb2YgYW4gZWxlbWVudC4gYGluYCB0cmFuc2l0aW9ucyBhbmltYXRlIGZyb20gdGhlIHByb3ZpZGVkIHZhbHVlcywgcGFzc2VkIGFzIHBhcmFtZXRlcnMgdG8gdGhlIGVsZW1lbnQncyBkZWZhdWx0IHZhbHVlcy4gYG91dGAgdHJhbnNpdGlvbnMgYW5pbWF0ZSBmcm9tIHRoZSBlbGVtZW50J3MgZGVmYXVsdCB2YWx1ZXMgdG8gdGhlIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7Rmx5UGFyYW1zfSBbcGFyYW1zXVxuICogQHJldHVybnMge1RyYW5zaXRpb25Db25maWd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHkoXG5cdG5vZGUsXG5cdHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDQwMCwgZWFzaW5nID0gY3ViaWNfb3V0LCB4ID0gMCwgeSA9IDAsIG9wYWNpdHkgPSAwIH0gPSB7fVxuKSB7XG5cdGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblx0Y29uc3QgdGFyZ2V0X29wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcblx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcblx0Y29uc3Qgb2QgPSB0YXJnZXRfb3BhY2l0eSAqICgxIC0gb3BhY2l0eSk7XG5cdGNvbnN0IFt4X3ZhbHVlLCB4X3VuaXRdID0gc3BsaXRfY3NzX3VuaXQoeCk7XG5cdGNvbnN0IFt5X3ZhbHVlLCB5X3VuaXRdID0gc3BsaXRfY3NzX3VuaXQoeSk7XG5cdHJldHVybiB7XG5cdFx0ZGVsYXksXG5cdFx0ZHVyYXRpb24sXG5cdFx0ZWFzaW5nLFxuXHRcdGNzczogKHQsIHUpID0+IGBcblx0XHRcdHRyYW5zZm9ybTogJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgkeygxIC0gdCkgKiB4X3ZhbHVlfSR7eF91bml0fSwgJHsoMSAtIHQpICogeV92YWx1ZX0ke3lfdW5pdH0pO1xuXHRcdFx0b3BhY2l0eTogJHt0YXJnZXRfb3BhY2l0eSAtIG9kICogdX1gXG5cdH07XG59XG5cbnZhciBzbGlkZV93YXJuaW5nID0gZmFsc2U7XG5cbi8qKlxuICogU2xpZGVzIGFuIGVsZW1lbnQgaW4gYW5kIG91dC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7U2xpZGVQYXJhbXN9IFtwYXJhbXNdXG4gKiBAcmV0dXJucyB7VHJhbnNpdGlvbkNvbmZpZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNsaWRlKG5vZGUsIHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDQwMCwgZWFzaW5nID0gY3ViaWNfb3V0LCBheGlzID0gJ3knIH0gPSB7fSkge1xuXHRjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cblx0aWYgKERFViAmJiAhc2xpZGVfd2FybmluZyAmJiAvKGNvbnRlbnRzfGlubGluZXx0YWJsZSkvLnRlc3Qoc3R5bGUuZGlzcGxheSkpIHtcblx0XHRzbGlkZV93YXJuaW5nID0gdHJ1ZTtcblx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IChzbGlkZV93YXJuaW5nID0gZmFsc2UpKTtcblx0XHR3LnRyYW5zaXRpb25fc2xpZGVfZGlzcGxheShzdHlsZS5kaXNwbGF5KTtcblx0fVxuXG5cdGNvbnN0IG9wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcblx0Y29uc3QgcHJpbWFyeV9wcm9wZXJ0eSA9IGF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblx0Y29uc3QgcHJpbWFyeV9wcm9wZXJ0eV92YWx1ZSA9IHBhcnNlRmxvYXQoc3R5bGVbcHJpbWFyeV9wcm9wZXJ0eV0pO1xuXHRjb25zdCBzZWNvbmRhcnlfcHJvcGVydGllcyA9IGF4aXMgPT09ICd5JyA/IFsndG9wJywgJ2JvdHRvbSddIDogWydsZWZ0JywgJ3JpZ2h0J107XG5cdGNvbnN0IGNhcGl0YWxpemVkX3NlY29uZGFyeV9wcm9wZXJ0aWVzID0gc2Vjb25kYXJ5X3Byb3BlcnRpZXMubWFwKFxuXHRcdChlKSA9PiAvKiogQHR5cGUgeydMZWZ0JyB8ICdSaWdodCcgfCAnVG9wJyB8ICdCb3R0b20nfSAqLyAoYCR7ZVswXS50b1VwcGVyQ2FzZSgpfSR7ZS5zbGljZSgxKX1gKVxuXHQpO1xuXHRjb25zdCBwYWRkaW5nX3N0YXJ0X3ZhbHVlID0gcGFyc2VGbG9hdChzdHlsZVtgcGFkZGluZyR7Y2FwaXRhbGl6ZWRfc2Vjb25kYXJ5X3Byb3BlcnRpZXNbMF19YF0pO1xuXHRjb25zdCBwYWRkaW5nX2VuZF92YWx1ZSA9IHBhcnNlRmxvYXQoc3R5bGVbYHBhZGRpbmcke2NhcGl0YWxpemVkX3NlY29uZGFyeV9wcm9wZXJ0aWVzWzFdfWBdKTtcblx0Y29uc3QgbWFyZ2luX3N0YXJ0X3ZhbHVlID0gcGFyc2VGbG9hdChzdHlsZVtgbWFyZ2luJHtjYXBpdGFsaXplZF9zZWNvbmRhcnlfcHJvcGVydGllc1swXX1gXSk7XG5cdGNvbnN0IG1hcmdpbl9lbmRfdmFsdWUgPSBwYXJzZUZsb2F0KHN0eWxlW2BtYXJnaW4ke2NhcGl0YWxpemVkX3NlY29uZGFyeV9wcm9wZXJ0aWVzWzFdfWBdKTtcblx0Y29uc3QgYm9yZGVyX3dpZHRoX3N0YXJ0X3ZhbHVlID0gcGFyc2VGbG9hdChcblx0XHRzdHlsZVtgYm9yZGVyJHtjYXBpdGFsaXplZF9zZWNvbmRhcnlfcHJvcGVydGllc1swXX1XaWR0aGBdXG5cdCk7XG5cdGNvbnN0IGJvcmRlcl93aWR0aF9lbmRfdmFsdWUgPSBwYXJzZUZsb2F0KFxuXHRcdHN0eWxlW2Bib3JkZXIke2NhcGl0YWxpemVkX3NlY29uZGFyeV9wcm9wZXJ0aWVzWzFdfVdpZHRoYF1cblx0KTtcblx0cmV0dXJuIHtcblx0XHRkZWxheSxcblx0XHRkdXJhdGlvbixcblx0XHRlYXNpbmcsXG5cdFx0Y3NzOiAodCkgPT5cblx0XHRcdCdvdmVyZmxvdzogaGlkZGVuOycgK1xuXHRcdFx0YG9wYWNpdHk6ICR7TWF0aC5taW4odCAqIDIwLCAxKSAqIG9wYWNpdHl9O2AgK1xuXHRcdFx0YCR7cHJpbWFyeV9wcm9wZXJ0eX06ICR7dCAqIHByaW1hcnlfcHJvcGVydHlfdmFsdWV9cHg7YCArXG5cdFx0XHRgcGFkZGluZy0ke3NlY29uZGFyeV9wcm9wZXJ0aWVzWzBdfTogJHt0ICogcGFkZGluZ19zdGFydF92YWx1ZX1weDtgICtcblx0XHRcdGBwYWRkaW5nLSR7c2Vjb25kYXJ5X3Byb3BlcnRpZXNbMV19OiAke3QgKiBwYWRkaW5nX2VuZF92YWx1ZX1weDtgICtcblx0XHRcdGBtYXJnaW4tJHtzZWNvbmRhcnlfcHJvcGVydGllc1swXX06ICR7dCAqIG1hcmdpbl9zdGFydF92YWx1ZX1weDtgICtcblx0XHRcdGBtYXJnaW4tJHtzZWNvbmRhcnlfcHJvcGVydGllc1sxXX06ICR7dCAqIG1hcmdpbl9lbmRfdmFsdWV9cHg7YCArXG5cdFx0XHRgYm9yZGVyLSR7c2Vjb25kYXJ5X3Byb3BlcnRpZXNbMF19LXdpZHRoOiAke3QgKiBib3JkZXJfd2lkdGhfc3RhcnRfdmFsdWV9cHg7YCArXG5cdFx0XHRgYm9yZGVyLSR7c2Vjb25kYXJ5X3Byb3BlcnRpZXNbMV19LXdpZHRoOiAke3QgKiBib3JkZXJfd2lkdGhfZW5kX3ZhbHVlfXB4O2AgK1xuXHRcdFx0YG1pbi0ke3ByaW1hcnlfcHJvcGVydHl9OiAwYFxuXHR9O1xufVxuXG4vKipcbiAqIEFuaW1hdGVzIHRoZSBvcGFjaXR5IGFuZCBzY2FsZSBvZiBhbiBlbGVtZW50LiBgaW5gIHRyYW5zaXRpb25zIGFuaW1hdGUgZnJvbSB0aGUgcHJvdmlkZWQgdmFsdWVzLCBwYXNzZWQgYXMgcGFyYW1ldGVycywgdG8gYW4gZWxlbWVudCdzIGN1cnJlbnQgKGRlZmF1bHQpIHZhbHVlcy4gYG91dGAgdHJhbnNpdGlvbnMgYW5pbWF0ZSBmcm9tIGFuIGVsZW1lbnQncyBkZWZhdWx0IHZhbHVlcyB0byB0aGUgcHJvdmlkZWQgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtTY2FsZVBhcmFtc30gW3BhcmFtc11cbiAqIEByZXR1cm5zIHtUcmFuc2l0aW9uQ29uZmlnfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUoXG5cdG5vZGUsXG5cdHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDQwMCwgZWFzaW5nID0gY3ViaWNfb3V0LCBzdGFydCA9IDAsIG9wYWNpdHkgPSAwIH0gPSB7fVxuKSB7XG5cdGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblx0Y29uc3QgdGFyZ2V0X29wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcblx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcblx0Y29uc3Qgc2QgPSAxIC0gc3RhcnQ7XG5cdGNvbnN0IG9kID0gdGFyZ2V0X29wYWNpdHkgKiAoMSAtIG9wYWNpdHkpO1xuXHRyZXR1cm4ge1xuXHRcdGRlbGF5LFxuXHRcdGR1cmF0aW9uLFxuXHRcdGVhc2luZyxcblx0XHRjc3M6IChfdCwgdSkgPT4gYFxuXHRcdFx0dHJhbnNmb3JtOiAke3RyYW5zZm9ybX0gc2NhbGUoJHsxIC0gc2QgKiB1fSk7XG5cdFx0XHRvcGFjaXR5OiAke3RhcmdldF9vcGFjaXR5IC0gb2QgKiB1fVxuXHRcdGBcblx0fTtcbn1cblxuLyoqXG4gKiBBbmltYXRlcyB0aGUgc3Ryb2tlIG9mIGFuIFNWRyBlbGVtZW50LCBsaWtlIGEgc25ha2UgaW4gYSB0dWJlLiBgaW5gIHRyYW5zaXRpb25zIGJlZ2luIHdpdGggdGhlIHBhdGggaW52aXNpYmxlIGFuZCBkcmF3IHRoZSBwYXRoIHRvIHRoZSBzY3JlZW4gb3ZlciB0aW1lLiBgb3V0YCB0cmFuc2l0aW9ucyBzdGFydCBpbiBhIHZpc2libGUgc3RhdGUgYW5kIGdyYWR1YWxseSBlcmFzZSB0aGUgcGF0aC4gYGRyYXdgIG9ubHkgd29ya3Mgd2l0aCBlbGVtZW50cyB0aGF0IGhhdmUgYSBgZ2V0VG90YWxMZW5ndGhgIG1ldGhvZCwgbGlrZSBgPHBhdGg+YCBhbmQgYDxwb2x5bGluZT5gLlxuICpcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudCAmIHsgZ2V0VG90YWxMZW5ndGgoKTogbnVtYmVyIH19IG5vZGVcbiAqIEBwYXJhbSB7RHJhd1BhcmFtc30gW3BhcmFtc11cbiAqIEByZXR1cm5zIHtUcmFuc2l0aW9uQ29uZmlnfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhdyhub2RlLCB7IGRlbGF5ID0gMCwgc3BlZWQsIGR1cmF0aW9uLCBlYXNpbmcgPSBjdWJpY19pbl9vdXQgfSA9IHt9KSB7XG5cdGxldCBsZW4gPSBub2RlLmdldFRvdGFsTGVuZ3RoKCk7XG5cdGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblx0aWYgKHN0eWxlLnN0cm9rZUxpbmVjYXAgIT09ICdidXR0Jykge1xuXHRcdGxlbiArPSBwYXJzZUludChzdHlsZS5zdHJva2VXaWR0aCk7XG5cdH1cblx0aWYgKGR1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoc3BlZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZHVyYXRpb24gPSA4MDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGR1cmF0aW9uID0gbGVuIC8gc3BlZWQ7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGR1cmF0aW9uID0gZHVyYXRpb24obGVuKTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGRlbGF5LFxuXHRcdGR1cmF0aW9uLFxuXHRcdGVhc2luZyxcblx0XHRjc3M6IChfLCB1KSA9PiBgXG5cdFx0XHRzdHJva2UtZGFzaGFycmF5OiAke2xlbn07XG5cdFx0XHRzdHJva2UtZGFzaG9mZnNldDogJHt1ICogbGVufTtcblx0XHRgXG5cdH07XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBTXG4gKiBAcGFyYW0ge1R9IHRhclxuICogQHBhcmFtIHtTfSBzcmNcbiAqIEByZXR1cm5zIHtUICYgU31cbiAqL1xuZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG5cdC8vIEB0cy1pZ25vcmVcblx0Zm9yIChjb25zdCBrIGluIHNyYykgdGFyW2tdID0gc3JjW2tdO1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUICYgU30gKi8gKHRhcik7XG59XG5cbi8qKlxuICogVGhlIGBjcm9zc2ZhZGVgIGZ1bmN0aW9uIGNyZWF0ZXMgYSBwYWlyIG9mIFt0cmFuc2l0aW9uc10oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlL3RyYW5zaXRpb24pIGNhbGxlZCBgc2VuZGAgYW5kIGByZWNlaXZlYC4gV2hlbiBhbiBlbGVtZW50IGlzICdzZW50JywgaXQgbG9va3MgZm9yIGEgY29ycmVzcG9uZGluZyBlbGVtZW50IGJlaW5nICdyZWNlaXZlZCcsIGFuZCBnZW5lcmF0ZXMgYSB0cmFuc2l0aW9uIHRoYXQgdHJhbnNmb3JtcyB0aGUgZWxlbWVudCB0byBpdHMgY291bnRlcnBhcnQncyBwb3NpdGlvbiBhbmQgZmFkZXMgaXQgb3V0LiBXaGVuIGFuIGVsZW1lbnQgaXMgJ3JlY2VpdmVkJywgdGhlIHJldmVyc2UgaGFwcGVucy4gSWYgdGhlcmUgaXMgbm8gY291bnRlcnBhcnQsIHRoZSBgZmFsbGJhY2tgIHRyYW5zaXRpb24gaXMgdXNlZC5cbiAqXG4gKiBAcGFyYW0ge0Nyb3NzZmFkZVBhcmFtcyAmIHtcbiAqIFx0ZmFsbGJhY2s/OiAobm9kZTogRWxlbWVudCwgcGFyYW1zOiBDcm9zc2ZhZGVQYXJhbXMsIGludHJvOiBib29sZWFuKSA9PiBUcmFuc2l0aW9uQ29uZmlnO1xuICogfX0gcGFyYW1zXG4gKiBAcmV0dXJucyB7Wyhub2RlOiBhbnksIHBhcmFtczogQ3Jvc3NmYWRlUGFyYW1zICYgeyBrZXk6IGFueTsgfSkgPT4gKCkgPT4gVHJhbnNpdGlvbkNvbmZpZywgKG5vZGU6IGFueSwgcGFyYW1zOiBDcm9zc2ZhZGVQYXJhbXMgJiB7IGtleTogYW55OyB9KSA9PiAoKSA9PiBUcmFuc2l0aW9uQ29uZmlnXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzZmFkZSh7IGZhbGxiYWNrLCAuLi5kZWZhdWx0cyB9KSB7XG5cdC8qKiBAdHlwZSB7TWFwPGFueSwgRWxlbWVudD59ICovXG5cdGNvbnN0IHRvX3JlY2VpdmUgPSBuZXcgTWFwKCk7XG5cdC8qKiBAdHlwZSB7TWFwPGFueSwgRWxlbWVudD59ICovXG5cdGNvbnN0IHRvX3NlbmQgPSBuZXcgTWFwKCk7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZnJvbV9ub2RlXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuXHQgKiBAcGFyYW0ge0Nyb3NzZmFkZVBhcmFtc30gcGFyYW1zXG5cdCAqIEByZXR1cm5zIHtUcmFuc2l0aW9uQ29uZmlnfVxuXHQgKi9cblx0ZnVuY3Rpb24gY3Jvc3NmYWRlKGZyb21fbm9kZSwgbm9kZSwgcGFyYW1zKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZGVsYXkgPSAwLFxuXHRcdFx0ZHVyYXRpb24gPSAvKiogQHBhcmFtIHtudW1iZXJ9IGQgKi8gKGQpID0+IE1hdGguc3FydChkKSAqIDMwLFxuXHRcdFx0ZWFzaW5nID0gY3ViaWNfb3V0XG5cdFx0fSA9IGFzc2lnbihhc3NpZ24oe30sIGRlZmF1bHRzKSwgcGFyYW1zKTtcblx0XHRjb25zdCBmcm9tID0gZnJvbV9ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRjb25zdCBkeCA9IGZyb20ubGVmdCAtIHRvLmxlZnQ7XG5cdFx0Y29uc3QgZHkgPSBmcm9tLnRvcCAtIHRvLnRvcDtcblx0XHRjb25zdCBkdyA9IGZyb20ud2lkdGggLyB0by53aWR0aDtcblx0XHRjb25zdCBkaCA9IGZyb20uaGVpZ2h0IC8gdG8uaGVpZ2h0O1xuXHRcdGNvbnN0IGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXHRcdGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblx0XHRjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuXHRcdGNvbnN0IG9wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGVsYXksXG5cdFx0XHRkdXJhdGlvbjogdHlwZW9mIGR1cmF0aW9uID09PSAnZnVuY3Rpb24nID8gZHVyYXRpb24oZCkgOiBkdXJhdGlvbixcblx0XHRcdGVhc2luZyxcblx0XHRcdGNzczogKHQsIHUpID0+IGBcblx0XHRcdCAgIG9wYWNpdHk6ICR7dCAqIG9wYWNpdHl9O1xuXHRcdFx0ICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XG5cdFx0XHQgICB0cmFuc2Zvcm06ICR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHt1ICogZHh9cHgsJHt1ICogZHl9cHgpIHNjYWxlKCR7dCArICgxIC0gdCkgKiBkd30sICR7XG5cdFx0XHRcdFx0XHR0ICsgKDEgLSB0KSAqIGRoXG5cdFx0XHRcdFx0fSk7XG5cdFx0ICAgYFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtNYXA8YW55LCBFbGVtZW50Pn0gaXRlbXNcblx0ICogQHBhcmFtIHtNYXA8YW55LCBFbGVtZW50Pn0gY291bnRlcnBhcnRzXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaW50cm9cblx0ICogQHJldHVybnMgeyhub2RlOiBhbnksIHBhcmFtczogQ3Jvc3NmYWRlUGFyYW1zICYgeyBrZXk6IGFueTsgfSkgPT4gKCkgPT4gVHJhbnNpdGlvbkNvbmZpZ31cblx0ICovXG5cdGZ1bmN0aW9uIHRyYW5zaXRpb24oaXRlbXMsIGNvdW50ZXJwYXJ0cywgaW50cm8pIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRPRE8gaW1wcm92ZSB0eXBpbmdzIChhcmUgdGhlIHB1YmxpYyB0eXBlcyB3cm9uZz8pXG5cdFx0cmV0dXJuIChub2RlLCBwYXJhbXMpID0+IHtcblx0XHRcdGl0ZW1zLnNldChwYXJhbXMua2V5LCBub2RlKTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdGlmIChjb3VudGVycGFydHMuaGFzKHBhcmFtcy5rZXkpKSB7XG5cdFx0XHRcdFx0Y29uc3Qgb3RoZXJfbm9kZSA9IGNvdW50ZXJwYXJ0cy5nZXQocGFyYW1zLmtleSk7XG5cdFx0XHRcdFx0Y291bnRlcnBhcnRzLmRlbGV0ZShwYXJhbXMua2V5KTtcblx0XHRcdFx0XHRyZXR1cm4gY3Jvc3NmYWRlKC8qKiBAdHlwZSB7RWxlbWVudH0gKi8gKG90aGVyX25vZGUpLCBub2RlLCBwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGlmIHRoZSBub2RlIGlzIGRpc2FwcGVhcmluZyBhbHRvZ2V0aGVyXG5cdFx0XHRcdC8vIChpLmUuIHdhc24ndCBjbGFpbWVkIGJ5IHRoZSBvdGhlciBsaXN0KVxuXHRcdFx0XHQvLyB0aGVuIHdlIG5lZWQgdG8gc3VwcGx5IGFuIG91dHJvXG5cdFx0XHRcdGl0ZW1zLmRlbGV0ZShwYXJhbXMua2V5KTtcblx0XHRcdFx0cmV0dXJuIGZhbGxiYWNrICYmIGZhbGxiYWNrKG5vZGUsIHBhcmFtcywgaW50cm8pO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cdHJldHVybiBbdHJhbnNpdGlvbih0b19zZW5kLCB0b19yZWNlaXZlLCBmYWxzZSksIHRyYW5zaXRpb24odG9fcmVjZWl2ZSwgdG9fc2VuZCwgdHJ1ZSldO1xufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsSUFBTSxVQUFVLE1BQU07O0FBR3RCLFNBQVMsVUFBVSxHQUFHO0NBQ3JCLE1BQU0sSUFBSSxJQUFJO0NBQ2QsT0FBTyxJQUFJLElBQUksSUFBSTtBQUNwQjs7Ozs7QUFNQSxTQUFTLGFBQWEsR0FBRztDQUN4QixPQUFPLElBQUksS0FBTSxJQUFNLElBQUksSUFBSSxJQUFJLEtBQU0sS0FBSyxJQUFJLElBQU0sSUFBSSxHQUFLLENBQUcsSUFBSTtBQUN6RTs7OztBQUtBLFNBQVMsZUFBZSxPQUFPO0NBQzlCLE1BQU0sUUFBUSxPQUFPLFVBQVUsWUFBWSxNQUFNLE1BQU0sNEJBQTRCO0NBQ25GLE9BQU8sUUFBUSxDQUFDLFdBQVcsTUFBTSxFQUFFLEdBQUcsTUFBTSxNQUFNLElBQUksSUFBSSxDQUF3QixPQUFRLElBQUk7QUFDL0Y7Ozs7Ozs7O0FBU0EsU0FBZ0IsS0FDZixNQUNBLEVBQUUsUUFBUSxHQUFHLFdBQVcsS0FBSyxTQUFTLGNBQWMsU0FBUyxHQUFHLFVBQVUsTUFBTSxDQUFDLEdBQ2hGO0NBQ0QsTUFBTSxRQUFRLGlCQUFpQixJQUFJO0NBQ25DLE1BQU0saUJBQWlCLENBQUMsTUFBTTtDQUM5QixNQUFNLElBQUksTUFBTSxXQUFXLFNBQVMsS0FBSyxNQUFNO0NBQy9DLE1BQU0sS0FBSyxrQkFBa0IsSUFBSTtDQUNqQyxNQUFNLENBQUMsT0FBTyxRQUFRLGVBQWUsTUFBTTtDQUMzQyxPQUFPO0VBQ047RUFDQTtFQUNBO0VBQ0EsTUFBTSxJQUFJLE1BQU0sWUFBWSxp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