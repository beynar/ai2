import { Ht as createSubscriber } from "/node_modules/.vite/deps/runtime-CvqZjhGP.js?v=1b1d2797";
//#region node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/reactive-value.js
/**
* @template T
*/
var ReactiveValue = class {
	#fn;
	#subscribe;
	/**
	*
	* @param {() => T} fn
	* @param {(update: () => void) => void} onsubscribe
	*/
	constructor(fn, onsubscribe) {
		this.#fn = fn;
		this.#subscribe = createSubscriber(onsubscribe);
	}
	get current() {
		this.#subscribe();
		return this.#fn();
	}
};
//#endregion
export { ReactiveValue as t };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtdmFsdWUta0FmZG9DbzUuanMiLCJuYW1lcyI6WyIjZm4iLCIjc3Vic2NyaWJlIl0sInNvdXJjZXMiOlsiLi4vLi4vLnBucG0vc3ZlbHRlQDUuNTYuNF9AdHlwZXNjcmlwdC1lc2xpbnQrdHlwZXNAOC42Mi4xL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3JlYWN0aXZpdHkvcmVhY3RpdmUtdmFsdWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU3Vic2NyaWJlciB9IGZyb20gJy4vY3JlYXRlLXN1YnNjcmliZXIuanMnO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZVZhbHVlIHtcblx0I2ZuO1xuXHQjc3Vic2NyaWJlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0geygpID0+IFR9IGZuXG5cdCAqIEBwYXJhbSB7KHVwZGF0ZTogKCkgPT4gdm9pZCkgPT4gdm9pZH0gb25zdWJzY3JpYmVcblx0ICovXG5cdGNvbnN0cnVjdG9yKGZuLCBvbnN1YnNjcmliZSkge1xuXHRcdHRoaXMuI2ZuID0gZm47XG5cdFx0dGhpcy4jc3Vic2NyaWJlID0gY3JlYXRlU3Vic2NyaWJlcihvbnN1YnNjcmliZSk7XG5cdH1cblxuXHRnZXQgY3VycmVudCgpIHtcblx0XHR0aGlzLiNzdWJzY3JpYmUoKTtcblx0XHRyZXR1cm4gdGhpcy4jZm4oKTtcblx0fVxufVxuIl0sInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsSUFBYSxnQkFBYixNQUEyQjtDQUMxQjtDQUNBOzs7Ozs7Q0FPQSxZQUFZLElBQUksYUFBYTtFQUM1QixLQUFLQSxNQUFNO0VBQ1gsS0FBS0MsYUFBYSxpQkFBaUIsV0FBVztDQUMvQztDQUVBLElBQUksVUFBVTtFQUNiLEtBQUtBLFdBQVc7RUFDaEIsT0FBTyxLQUFLRCxJQUFJO0NBQ2pCO0FBQ0QifQ==