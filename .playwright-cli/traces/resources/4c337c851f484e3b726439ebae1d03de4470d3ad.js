import { $t as derived, C as effect_root, Ht as createSubscriber, c as set_active_effect, en as get, j as render_effect, l as set_active_reaction, n as active_reaction, nn as readonly, rn as writable, t as active_effect, tn as readable, w as effect_tracking } from "/node_modules/.vite/deps/runtime-CvqZjhGP.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/store/index-client.js
/** @import { Readable, Writable } from './public.js' */
/**
* @template V
* @overload
* @param {() => V} get
* @param {(v: V) => void} set
* @returns {Writable<V>}
*/
/**
* @template V
* @overload
* @param {() => V} get
* @returns {Readable<V>}
*/
/**
* Create a store from a function that returns state, and (to make a writable store), an
* optional second function that sets state.
*
* ```ts
* import { toStore } from 'svelte/store';
*
* let count = $state(0);
*
* const store = toStore(() => count, (v) => (count = v));
* ```
* @template V
* @param {() => V} get
* @param {(v: V) => void} [set]
* @returns {Writable<V> | Readable<V>}
*/
function toStore(get, set) {
	var effect = active_effect;
	var reaction = active_reaction;
	var init_value = get();
	const store = writable(init_value, (set) => {
		var ran = init_value !== get();
		var teardown;
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(reaction);
		set_active_effect(effect);
		try {
			teardown = effect_root(() => {
				render_effect(() => {
					const value = get();
					if (ran) set(value);
				});
			});
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
		ran = true;
		return teardown;
	});
	if (set) return {
		set,
		update: (fn) => set(fn(get())),
		subscribe: store.subscribe
	};
	return { subscribe: store.subscribe };
}
/**
* @template V
* @overload
* @param {Writable<V>} store
* @returns {{ current: V }}
*/
/**
* @template V
* @overload
* @param {Readable<V>} store
* @returns {{ readonly current: V }}
*/
/**
* Convert a store to an object with a reactive `current` property. If `store`
* is a readable store, `current` will be a readonly property.
*
* ```ts
* import { fromStore, get, writable } from 'svelte/store';
*
* const store = writable(0);
*
* const count = fromStore(store);
*
* count.current; // 0;
* store.set(1);
* count.current; // 1
*
* count.current += 1;
* get(store); // 2
* ```
* @template V
* @param {Writable<V> | Readable<V>} store
*/
function fromStore(store) {
	let value = void 0;
	const subscribe = createSubscriber((update) => {
		let ran = false;
		const unsubscribe = store.subscribe((v) => {
			value = v;
			if (ran) update();
		});
		ran = true;
		return unsubscribe;
	});
	function current() {
		if (effect_tracking()) {
			subscribe();
			return value;
		}
		return get(store);
	}
	if ("set" in store) return {
		get current() {
			return current();
		},
		set current(v) {
			store.set(v);
		}
	};
	return { get current() {
		return current();
	} };
}
//#endregion
export { derived, fromStore, get, readable, readonly, toStore, writable };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlX3N0b3JlLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy5wbnBtL3N2ZWx0ZUA1LjU2LjRfQHR5cGVzY3JpcHQtZXNsaW50K3R5cGVzQDguNjIuMS9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9zdG9yZS9pbmRleC1jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBpbXBvcnQgeyBSZWFkYWJsZSwgV3JpdGFibGUgfSBmcm9tICcuL3B1YmxpYy5qcycgKi9cbmltcG9ydCB7XG5cdGVmZmVjdF9yb290LFxuXHRlZmZlY3RfdHJhY2tpbmcsXG5cdHJlbmRlcl9lZmZlY3Rcbn0gZnJvbSAnLi4vaW50ZXJuYWwvY2xpZW50L3JlYWN0aXZpdHkvZWZmZWN0cy5qcyc7XG5pbXBvcnQgeyBnZXQsIHdyaXRhYmxlIH0gZnJvbSAnLi9zaGFyZWQvaW5kZXguanMnO1xuaW1wb3J0IHsgY3JlYXRlU3Vic2NyaWJlciB9IGZyb20gJy4uL3JlYWN0aXZpdHkvY3JlYXRlLXN1YnNjcmliZXIuanMnO1xuaW1wb3J0IHtcblx0YWN0aXZlX2VmZmVjdCxcblx0YWN0aXZlX3JlYWN0aW9uLFxuXHRzZXRfYWN0aXZlX2VmZmVjdCxcblx0c2V0X2FjdGl2ZV9yZWFjdGlvblxufSBmcm9tICcuLi9pbnRlcm5hbC9jbGllbnQvcnVudGltZS5qcyc7XG5cbmV4cG9ydCB7IGRlcml2ZWQsIGdldCwgcmVhZGFibGUsIHJlYWRvbmx5LCB3cml0YWJsZSB9IGZyb20gJy4vc2hhcmVkL2luZGV4LmpzJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgVlxuICogQG92ZXJsb2FkXG4gKiBAcGFyYW0geygpID0+IFZ9IGdldFxuICogQHBhcmFtIHsodjogVikgPT4gdm9pZH0gc2V0XG4gKiBAcmV0dXJucyB7V3JpdGFibGU8Vj59XG4gKi9cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBvdmVybG9hZFxuICogQHBhcmFtIHsoKSA9PiBWfSBnZXRcbiAqIEByZXR1cm5zIHtSZWFkYWJsZTxWPn1cbiAqL1xuLyoqXG4gKiBDcmVhdGUgYSBzdG9yZSBmcm9tIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHN0YXRlLCBhbmQgKHRvIG1ha2UgYSB3cml0YWJsZSBzdG9yZSksIGFuXG4gKiBvcHRpb25hbCBzZWNvbmQgZnVuY3Rpb24gdGhhdCBzZXRzIHN0YXRlLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyB0b1N0b3JlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbiAqXG4gKiBsZXQgY291bnQgPSAkc3RhdGUoMCk7XG4gKlxuICogY29uc3Qgc3RvcmUgPSB0b1N0b3JlKCgpID0+IGNvdW50LCAodikgPT4gKGNvdW50ID0gdikpO1xuICogYGBgXG4gKiBAdGVtcGxhdGUgVlxuICogQHBhcmFtIHsoKSA9PiBWfSBnZXRcbiAqIEBwYXJhbSB7KHY6IFYpID0+IHZvaWR9IFtzZXRdXG4gKiBAcmV0dXJucyB7V3JpdGFibGU8Vj4gfCBSZWFkYWJsZTxWPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3RvcmUoZ2V0LCBzZXQpIHtcblx0dmFyIGVmZmVjdCA9IGFjdGl2ZV9lZmZlY3Q7XG5cdHZhciByZWFjdGlvbiA9IGFjdGl2ZV9yZWFjdGlvbjtcblx0dmFyIGluaXRfdmFsdWUgPSBnZXQoKTtcblxuXHRjb25zdCBzdG9yZSA9IHdyaXRhYmxlKGluaXRfdmFsdWUsIChzZXQpID0+IHtcblx0XHQvLyBJZiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQgYmVmb3JlIHdlIGNhbGwgc3Vic2NyaWJlLCB0aGVuXG5cdFx0Ly8gd2UgbmVlZCB0byB0cmVhdCB0aGUgdmFsdWUgYXMgYWxyZWFkeSBoYXZpbmcgcnVuXG5cdFx0dmFyIHJhbiA9IGluaXRfdmFsdWUgIT09IGdldCgpO1xuXG5cdFx0Ly8gVE9ETyBkbyB3ZSBuZWVkIGEgZGlmZmVyZW50IGltcGxlbWVudGF0aW9uIG9uIHRoZSBzZXJ2ZXI/XG5cdFx0dmFyIHRlYXJkb3duO1xuXHRcdC8vIEFwcGx5IHRoZSByZWFjdGlvbiBhbmQgZWZmZWN0IGF0IHRoZSB0aW1lIG9mIHRvU3RvcmUgYmVpbmcgY2FsbGVkXG5cdFx0dmFyIHByZXZpb3VzX3JlYWN0aW9uID0gYWN0aXZlX3JlYWN0aW9uO1xuXHRcdHZhciBwcmV2aW91c19lZmZlY3QgPSBhY3RpdmVfZWZmZWN0O1xuXHRcdHNldF9hY3RpdmVfcmVhY3Rpb24ocmVhY3Rpb24pO1xuXHRcdHNldF9hY3RpdmVfZWZmZWN0KGVmZmVjdCk7XG5cblx0XHR0cnkge1xuXHRcdFx0dGVhcmRvd24gPSBlZmZlY3Rfcm9vdCgoKSA9PiB7XG5cdFx0XHRcdHJlbmRlcl9lZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gZ2V0KCk7XG5cdFx0XHRcdFx0aWYgKHJhbikgc2V0KHZhbHVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0c2V0X2FjdGl2ZV9yZWFjdGlvbihwcmV2aW91c19yZWFjdGlvbik7XG5cdFx0XHRzZXRfYWN0aXZlX2VmZmVjdChwcmV2aW91c19lZmZlY3QpO1xuXHRcdH1cblxuXHRcdHJhbiA9IHRydWU7XG5cblx0XHRyZXR1cm4gdGVhcmRvd247XG5cdH0pO1xuXG5cdGlmIChzZXQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2V0LFxuXHRcdFx0dXBkYXRlOiAoZm4pID0+IHNldChmbihnZXQoKSkpLFxuXHRcdFx0c3Vic2NyaWJlOiBzdG9yZS5zdWJzY3JpYmVcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdWJzY3JpYmU6IHN0b3JlLnN1YnNjcmliZVxuXHR9O1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAb3ZlcmxvYWRcbiAqIEBwYXJhbSB7V3JpdGFibGU8Vj59IHN0b3JlXG4gKiBAcmV0dXJucyB7eyBjdXJyZW50OiBWIH19XG4gKi9cbi8qKlxuICogQHRlbXBsYXRlIFZcbiAqIEBvdmVybG9hZFxuICogQHBhcmFtIHtSZWFkYWJsZTxWPn0gc3RvcmVcbiAqIEByZXR1cm5zIHt7IHJlYWRvbmx5IGN1cnJlbnQ6IFYgfX1cbiAqL1xuLyoqXG4gKiBDb252ZXJ0IGEgc3RvcmUgdG8gYW4gb2JqZWN0IHdpdGggYSByZWFjdGl2ZSBgY3VycmVudGAgcHJvcGVydHkuIElmIGBzdG9yZWBcbiAqIGlzIGEgcmVhZGFibGUgc3RvcmUsIGBjdXJyZW50YCB3aWxsIGJlIGEgcmVhZG9ubHkgcHJvcGVydHkuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGZyb21TdG9yZSwgZ2V0LCB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG4gKlxuICogY29uc3Qgc3RvcmUgPSB3cml0YWJsZSgwKTtcbiAqXG4gKiBjb25zdCBjb3VudCA9IGZyb21TdG9yZShzdG9yZSk7XG4gKlxuICogY291bnQuY3VycmVudDsgLy8gMDtcbiAqIHN0b3JlLnNldCgxKTtcbiAqIGNvdW50LmN1cnJlbnQ7IC8vIDFcbiAqXG4gKiBjb3VudC5jdXJyZW50ICs9IDE7XG4gKiBnZXQoc3RvcmUpOyAvLyAyXG4gKiBgYGBcbiAqIEB0ZW1wbGF0ZSBWXG4gKiBAcGFyYW0ge1dyaXRhYmxlPFY+IHwgUmVhZGFibGU8Vj59IHN0b3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RvcmUoc3RvcmUpIHtcblx0bGV0IHZhbHVlID0gLyoqIEB0eXBlIHtWfSAqLyAodW5kZWZpbmVkKTtcblxuXHRjb25zdCBzdWJzY3JpYmUgPSBjcmVhdGVTdWJzY3JpYmVyKCh1cGRhdGUpID0+IHtcblx0XHRsZXQgcmFuID0gZmFsc2U7XG5cblx0XHRjb25zdCB1bnN1YnNjcmliZSA9IHN0b3JlLnN1YnNjcmliZSgodikgPT4ge1xuXHRcdFx0dmFsdWUgPSB2O1xuXHRcdFx0aWYgKHJhbikgdXBkYXRlKCk7XG5cdFx0fSk7XG5cblx0XHRyYW4gPSB0cnVlO1xuXG5cdFx0cmV0dXJuIHVuc3Vic2NyaWJlO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBjdXJyZW50KCkge1xuXHRcdGlmIChlZmZlY3RfdHJhY2tpbmcoKSkge1xuXHRcdFx0c3Vic2NyaWJlKCk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGdldChzdG9yZSk7XG5cdH1cblxuXHRpZiAoJ3NldCcgaW4gc3RvcmUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Z2V0IGN1cnJlbnQoKSB7XG5cdFx0XHRcdHJldHVybiBjdXJyZW50KCk7XG5cdFx0XHR9LFxuXHRcdFx0c2V0IGN1cnJlbnQodikge1xuXHRcdFx0XHRzdG9yZS5zZXQodik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Z2V0IGN1cnJlbnQoKSB7XG5cdFx0XHRyZXR1cm4gY3VycmVudCgpO1xuXHRcdH1cblx0fTtcbn1cbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThDQSxTQUFnQixRQUFRLEtBQUssS0FBSztDQUNqQyxJQUFJLFNBQVM7Q0FDYixJQUFJLFdBQVc7Q0FDZixJQUFJLGFBQWEsSUFBSTtDQUVyQixNQUFNLFFBQVEsU0FBUyxhQUFhLFFBQVE7RUFHM0MsSUFBSSxNQUFNLGVBQWUsSUFBSTtFQUc3QixJQUFJO0VBRUosSUFBSSxvQkFBb0I7RUFDeEIsSUFBSSxrQkFBa0I7RUFDdEIsb0JBQW9CLFFBQVE7RUFDNUIsa0JBQWtCLE1BQU07RUFFeEIsSUFBSTtHQUNILFdBQVcsa0JBQWtCO0lBQzVCLG9CQUFvQjtLQUNuQixNQUFNLFFBQVEsSUFBSTtLQUNsQixJQUFJLEtBQUssSUFBSSxLQUFLO0lBQ25CLENBQUM7R0FDRixDQUFDO0VBQ0YsVUFBVTtHQUNULG9CQUFvQixpQkFBaUI7R0FDckMsa0JBQWtCLGVBQWU7RUFDbEM7RUFFQSxNQUFNO0VBRU4sT0FBTztDQUNSLENBQUM7Q0FFRCxJQUFJLEtBQ0gsT0FBTztFQUNOO0VBQ0EsU0FBUyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztFQUM3QixXQUFXLE1BQU07Q0FDbEI7Q0FHRCxPQUFPLEVBQ04sV0FBVyxNQUFNLFVBQ2xCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0EsU0FBZ0IsVUFBVSxPQUFPO0NBQ2hDLElBQUksUUFBMEIsS0FBQTtDQUU5QixNQUFNLFlBQVksa0JBQWtCLFdBQVc7RUFDOUMsSUFBSSxNQUFNO0VBRVYsTUFBTSxjQUFjLE1BQU0sV0FBVyxNQUFNO0dBQzFDLFFBQVE7R0FDUixJQUFJLEtBQUssT0FBTztFQUNqQixDQUFDO0VBRUQsTUFBTTtFQUVOLE9BQU87Q0FDUixDQUFDO0NBRUQsU0FBUyxVQUFVO0VBQ2xCLElBQUksZ0JBQWdCLEdBQUc7R0FDdEIsVUFBVTtHQUNWLE9BQU87RUFDUjtFQUVBLE9BQU8sSUFBSSxLQUFLO0NBQ2pCO0NBRUEsSUFBSSxTQUFTLE9BQ1osT0FBTztFQUNOLElBQUksVUFBVTtHQUNiLE9BQU8sUUFBUTtFQUNoQjtFQUNBLElBQUksUUFBUSxHQUFHO0dBQ2QsTUFBTSxJQUFJLENBQUM7RUFDWjtDQUNEO0NBR0QsT0FBTyxFQUNOLElBQUksVUFBVTtFQUNiLE9BQU8sUUFBUTtDQUNoQixFQUNEO0FBQ0QifQ==