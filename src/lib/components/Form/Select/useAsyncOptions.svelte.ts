import type { MaybePromise } from '@sveltejs/kit';
import { untrack } from 'svelte';
import type { BaseOption } from '../field.js';

export const useAsyncOptions = <T extends BaseOption>(opts: {
	options: T[] | ((searchValue?: string) => MaybePromise<T[]>);
	searchValue?: string;
	value?: string | null;
	searchable?: boolean | 'async';
	shouldFilter?: boolean;
}) => {
	let loading = $state(typeof opts.options === 'function' ? true : false);
	let options = $state<T[]>(typeof opts.options === 'function' ? [] : opts.options);
	let filteredOptions = $state<T[]>(typeof opts.options === 'function' ? [] : opts.options);
	const findValue = () => {
		return options.find((option) => option.value === opts.value) || null;
	};
	let value = $state<BaseOption | null>(findValue());
	const loadOptions = (promise: Promise<T[]>) => {
		promise.then((result) => {
			loading = false;
			options = result;

			value = findValue();
		});
	};
	if (typeof opts.options === 'function') {
		const maybePromise = opts.options(opts.searchValue);
		loading = true;
		if (maybePromise instanceof Promise) {
			loadOptions(maybePromise);
		} else {
			loading = false;
			options = maybePromise;
			value = findValue();
		}
	}
	const filterOptions = (searchValue?: string) => {
		const defaultFilter = (searchValue: string) => {
			filteredOptions = options.filter((option) =>
				option.label.toLowerCase().includes(searchValue.toLowerCase())
			);
		};
		if (searchValue === '') {
			filteredOptions = options;
		} else {
			if (searchValue && opts.searchable) {
				const asyncSearch = opts.searchable === 'async';
				if (typeof opts.options === 'function') {
					if (asyncSearch) {
						const maybePromise = opts.options(searchValue);
						if (maybePromise instanceof Promise) {
							loading = true;
							maybePromise.then((result) => {
								filteredOptions = result;
								loading = false;
							});
						} else {
							filteredOptions = maybePromise;
						}
					} else {
						defaultFilter(searchValue);
					}
				} else {
					defaultFilter(searchValue);
				}
			}
		}
	};

	$effect(() => {
		const currentValue = opts.value;
		untrack(() => {
			if (currentValue && currentValue !== value?.value) {
				value = findValue();
			}
		});
	});
	$effect(() => {
		if (opts.shouldFilter) {
			filterOptions(opts.searchValue);
		}
	});

	const getDisplayedValue = () => {
		if (typeof value === 'string') {
			return (
				options.concat(filteredOptions).find((option) => option.value === value?.value)?.label ||
				value
			);
		}
		if (value && 'label' in value) {
			return value.label;
		}
		return null;
	};

	const displayedValue = $derived.by(getDisplayedValue);

	return {
		get options() {
			return options;
		},
		get value() {
			return value;
		},
		get displayedValue() {
			return displayedValue;
		},
		set value(newValue) {
			value = newValue;
		},
		get loading() {
			return loading;
		},
		get filteredOptions() {
			return opts.shouldFilter ? filteredOptions : options;
		}
	};
};
