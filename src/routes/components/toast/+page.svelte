<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { Confirmation, confirmation } from '$lib/components/Confirmation/index.js';
	import { Toaster, toast } from '$lib/components/Toast/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
</script>

<Toaster showCloseIcon />
<Confirmation />

<ComponentCard>
	<Button
		onClick={async () => {
			const { confirmed } = await confirmation({
				title: 'Hello',
				description: 'This is a toast',
				confirm: 'Confirm',
				cancel: 'Cancel'
			});
			[
				'primary'
				// 'secondary',
				// 'danger',
				// 'success',
				// 'warning',
				// 'info',
				// 'contrast',
				// 'surface'
			].forEach((color) => {
				[
					'bottom-center'
					// 'bottom-left',
					// 'bottom-right',
					// 'top-center',
					// 'top-left',
					// 'top-right'
				].forEach((position) => {
					toast[color]({
						title: 'Hello',
						description: 'This is a toast',
						richColors: true,
						duration: 100000,
						position: position,
						onClose: () => {
							console.log('closed');
						}
					});
				});
			});
		}}>Show toast</Button
	>
</ComponentCard>
