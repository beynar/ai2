<script lang="ts">
	import Dialog from '../Dialog/Dialog.svelte';
	import Button from '../Button/Button.svelte';
	import type { ConfirmationDetail, ConfirmationState } from './confirmation.state.svelte.js';
	import { onMount, tick } from 'svelte';
	let confirmations = $state<ConfirmationState[]>([]);

	const onConfirmation = (event: CustomEvent<ConfirmationDetail>) => {
		if (event.detail) {
			const confirmationDetail = event.detail;
			const confirmationState = Object.assign(confirmationDetail, {
				isOpen: false,
				loading: false
			}) satisfies ConfirmationState;
			confirmations.push(confirmationState);
			tick().then(() => {
				confirmations.forEach((a) => {
					if (a.id === confirmationState.id) {
						a.isOpen = true;
					}
				});
			});
		}
	};

	onMount(() => {
		document.addEventListener('confirmation', onConfirmation);
		return () => {
			document.removeEventListener('confirmation', onConfirmation);
		};
	});

	const actionConfirmation = (confirmation: ConfirmationState, continued: boolean) => async () => {
		let result;
		if (continued) {
			const res = confirmation.onConfirm?.();
			confirmation.loading = !!res && res instanceof Promise;
			result = continued && res ? await res : undefined;
		}
		confirmation.loading = false;
		confirmation.isOpen = false;
		document.dispatchEvent(
			new CustomEvent('confirmation_received', {
				detail: { id: confirmation.id, continued, result }
			})
		);
	};
</script>

{#each confirmations as confirmation}
	<Dialog
		type="alert"
		onClose={() => {
			confirmations = confirmations.filter((a) => a.id !== confirmation.id);
		}}
		closable={false}
		closeOnClickOutside={false}
		closeOnEscape={false}
		bind:isOpen={confirmation.isOpen}
		title={confirmation.title}
		description={confirmation.description}
	>
		{#snippet footer()}
			<div class="flex justify-end gap-2 p-2">
				{#if typeof confirmation.cancel === 'object'}
					<Button
						disabled={confirmation.loading}
						color="surface"
						{...confirmation.cancel}
						onClick={actionConfirmation(confirmation, false)}
					>
						{confirmation.cancel.text}
					</Button>
				{:else}
					<Button
						disabled={confirmation.loading}
						color="surface"
						onClick={actionConfirmation(confirmation, false)}
					>
						{confirmation.cancel}
					</Button>
				{/if}

				{#if typeof confirmation.confirm === 'object'}
					<Button
						loading={confirmation.loading}
						{...confirmation.confirm}
						onClick={actionConfirmation(confirmation, true)}
					>
						{confirmation.confirm.text}
					</Button>
				{:else}
					<Button loading={confirmation.loading} onClick={actionConfirmation(confirmation, true)}>
						{confirmation.confirm}
					</Button>
				{/if}
			</div>
		{/snippet}
	</Dialog>
{/each}
