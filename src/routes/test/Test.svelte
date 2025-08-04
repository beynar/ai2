<script lang="ts" module>
	import { watch } from 'runed';
	import Button from '$lib/components/Button/Button.svelte';
	import { watchIcon } from '$lib/components/Icons/watch.js';
	import { untrack } from 'svelte';

	const linked = (a: () => any, b: () => any) => {
		$effect(() => {
			const newValue = b();
			untrack(() => {
				let oldValue = a();
				if (newValue !== oldValue) {
					console.log('newValue', newValue);
					oldValue = newValue;
				}
			});
		});
	};

	class BindableStateClass<P extends Record<string, any>> {
		props: P;

		constructor(props: P) {
			this.props = props;
			Object.entries(props).forEach(([key, value]) => {
				Object.defineProperty(this, key, {
					get: () => this.props[key as keyof P],
					set: (newValue) => {
						console.log('set', key, newValue);
						this.props[key as keyof P] = newValue;
					}
				});
			});
		}
	}

	// Type helper to create a properly typed bindable state class
	type TypedBindableStateClass<P extends Record<string, any>> = new (
		props: P
	) => BindableStateClass<P> & P;

	const createBindableStateClass = <P extends Record<string, any>>() => {
		return class extends BindableStateClass<P> {
			constructor(props: P) {
				super(props);
			}
		} as TypedBindableStateClass<P>;
	};

	class Test extends createBindableStateClass<{ name: string; age: number }>() {
		constructor(props: { name: string; age: number }) {
			super(props);
		}
	}
</script>

<script lang="ts">
	let {
		name = $bindable(),
		age = $bindable()
	}: {
		name: string;
		age: number;
	} = $props();

	const test = new Test({
		get name() {
			return name;
		},
		set name(value: string) {
			name = value;
		},
		get age() {
			console.log('set age');
			return age;
		},
		set age(value: number) {
			age = value;
		}
	});

	console.log(test);
</script>

<div>
	<h1>Component value</h1>
	<div class="flex gap-2">
		<Button
			size="small"
			onclick={() => {
				test.name = test.name === 'Jane' ? 'John' : 'Jane';
			}}
		>
			Update component name
		</Button>

		<Button
			size="small"
			onclick={() => {
				test.age++;
			}}
		>
			Update component age
		</Button>
	</div>
	<p>name: {test.name}</p>
	<p>age: {test.age}</p>
</div>
