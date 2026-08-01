<script lang="ts">
	import { setContext, type Snippet } from 'svelte';
	import { formCardSurfaceContextKey, type FormCardSurfaceContext } from './form.context.js';

	let { isOwned, children }: { isOwned: boolean; children: Snippet } = $props();

	setContext<FormCardSurfaceContext>(formCardSurfaceContextKey, {
		get isOwned() {
			return isOwned;
		}
	});
</script>

{@render children()}
