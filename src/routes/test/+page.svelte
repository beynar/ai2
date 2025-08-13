<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Test from './Test.svelte';

	let name = $state('John');
	let age = $state(20);
</script>

<h1>Parent value</h1>
<div class="flex gap-2">
	<Button
		size="small"
		onClick={() => {
			name = name === 'Jane' ? 'John' : 'Jane';
		}}
	>
		Update name
	</Button>

	<Button
		size="small"
		onClick={() => {
			age++;
		}}
	>
		Update age
	</Button>
</div>
<p>name: {name}</p>
<p>age: {age}</p>

<Test bind:name bind:age />
