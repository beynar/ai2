<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { bind } from '$lib/utils/state.svelte.js';
	import { useClickOutside } from '$lib/utils/useClickOutside.svelte.js';
	import { untrack } from 'svelte';

	let name = $state('John');
	let age = $state(20);
	let isActive = $state(false);

	const clickOutside = useClickOutside({
		get isActive() {
			return isActive;
		},
		callback: () => {
			console.log('click outside', isActive, age);
		}
	});

	type ClickOutsideHandler2Props = {
		isActive: boolean;
		callback: () => void;
	};

	type onChange = () => any[];

	const onChange = (onChange: onChange) => {
		$effect(() => {
			const value = untrack(() => onChange());
			console.log(value);
		});
	};

	interface ClickOutsideHandler2 extends ClickOutsideHandler2Props {}
	class ClickOutsideHandler2 {
		mounted = $state(false);
		constructor(props: ClickOutsideHandler2Props) {
			bind(this, props);

			$effect(() => {
				if (this.isActive) {
					this.callback();
				}
			});
		}
	}

	onChange(() => {
		console.log('isActive', isActive, age);
		return [isActive];
	});
	let value = $state('');
</script>

<div class="flex flex-col gap-2">
	<h1>Parent value</h1>

	<div class="size-20 bg-red-500" {@attach clickOutside.attachment}>
		<p>click outside</p>
	</div>
	<div class="size-20 bg-blue-500" {@attach clickOutside.attachment}>
		<p>click outside 2</p>
	</div>

	<div class="flex gap-2">
		<Button
			size="small"
			onClick={() => {
				isActive = !isActive;
			}}
		>
			{!isActive ? 'Activate click outside' : 'Deactivate click outside'}
		</Button>
		<Button
			{@attach clickOutside.attachment}
			size="small"
			onClick={() => {
				age++;
			}}
		>
			Update age
		</Button>
		<Button
			{@attach clickOutside.attachment}
			size="small"
			onClick={() => {
				value = 'test';
			}}
		>
			Update value
		</Button>

		<input
			type="text"
			placeholder={value}
			bind:value={
				() => value,
				(newValue) => {
					console.log('value', value);
					value = newValue;
				}
			}
		/>
	</div>
</div>
