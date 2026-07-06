<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { Confirmation, confirmation } from '$lib/components/Confirmation/index.js';
	import { Toaster, toast } from '$lib/components/Toast/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
</script>

<Toaster showCloseIcon position="top-left" />
<Confirmation />

<DocPage
	title="Toast"
	subtitle="Transient notifications for feedback, alerts, and confirmations."
	component="Toast"
	features={[
		'role=status with aria-live announcements',
		'Imperative toast.color() helper API',
		'Stacked layout, hover pauses timers',
		'Six corner and center positions',
		'FSO enter and exit transitions'
	]}
>
	<ComponentCard
		description="Trigger a toast notification from a button click."
		code={`<Button
	onClick={() => {
		toast.primary({
			title: 'Hello',
			description: 'This is a toast'
		});
	}}
>
	Show toast
</Button>`}
	>
		<Button
			onClick={() => {
				toast.primary({
					title: 'Hello',
					description: 'This is a toast'
				});
			}}>Show toast</Button
		>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard>
			<Button
				onClick={async () => {
					return toast.danger({
						title: 'Hello',
						description: 'This is a toast',
						richColors: true,
						duration: 100000,
						onClose: () => {
							console.log('closed');
						}
					});
					const { confirmed } = await confirmation({
						title: 'Hello',
						description: 'This is a toast',
						confirm: 'Confirm',
						cancel: 'Cancel'
					});
					(
						[
							'primary'
							// 'secondary',
							// 'danger',
							// 'success',
							// 'warning',
							// 'info',
							// 'foreground',
							// 'background'
						] as const
					).forEach((color) => {
						(
							[
								'bottom-center'
								// 'bottom-left',
								// 'bottom-right',
								// 'top-center',
								// 'top-left',
								// 'top-right'
							] as const
						).forEach((position) => {
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
	{/snippet}
</DocPage>
