<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import Form from '$lib/components/Form/Form/Form.svelte';
	import { PIN_INPUT_ALPHANUMERIC_PATTERN, PinInput } from '$lib/components/Form/PinInput/index.js';

	let code = $state('');
	let completedCode = $state('');
	let maskedCode = $state('');
	let inviteCode = $state('');
	let standaloneCode = $state('');
	let formValue = $state('');

	const digitsOnly = (text: string) => text.replace(/\D/g, '');
	const alphanumericOnly = (text: string) => text.replace(/[^a-zA-Z0-9]/g, '');
	const setCompletedCode = (value: string) => {
		completedCode = value;
	};
	const setFormValue = (value: { otp: string | null }) => {
		formValue = JSON.stringify(value);
	};
</script>

<DocPage
	title="Pin input"
	subtitle="One-time-code input with visible cells and one real form input."
	component="PinInput"
	features={[
		'Native input owns focus and paste',
		'OTP autocomplete',
		'Bindable string value',
		'Form integration'
	]}
>
	<ComponentCard
		description="Digits-only one-time code with paste cleanup."
		code={`<PinInput
	label="Verification code"
	bind:value={code}
	pasteTransformer={digitsOnly}
	onComplete={(value) => verify(value)}
/>`}
		class="!min-h-fit"
	>
		<div class="w-full max-w-md">
			<PinInput
				label="Verification code"
				description="Paste a code with spaces or hyphens; only digits are inserted."
				helper={`Value: ${code || 'empty'}${completedCode ? `, complete: ${completedCode}` : ''}`}
				bind:value={code}
				pasteTransformer={digitsOnly}
				onComplete={setCompletedCode}
			/>
		</div>
	</ComponentCard>

	<ComponentCard
		description="Standalone input centered in its preview."
		code={`<div class="flex min-h-40 w-full items-center justify-center">
	<PinInput bind:value={code} pasteTransformer={digitsOnly} class="w-fit" />
</div>`}
		class="!min-h-fit"
	>
		<div class="flex min-h-40 w-full items-center justify-center">
			<PinInput bind:value={standaloneCode} pasteTransformer={digitsOnly} class="w-fit" />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Small, normal, and large sizes." class="!min-h-fit">
			<div class="grid w-full max-w-xl gap-6">
				<PinInput label="Small" size="small" value="123" pasteTransformer={digitsOnly} />
				<PinInput label="Normal" value="1234" pasteTransformer={digitsOnly} />
				<PinInput label="Large" size="large" value="12345" pasteTransformer={digitsOnly} />
			</div>
		</ComponentCard>

		<ComponentCard description="Masked and alphanumeric variants." class="!min-h-fit">
			<div class="grid w-full max-w-xl gap-6">
				<PinInput label="Masked code" bind:value={maskedCode} mask pasteTransformer={digitsOnly} />
				<PinInput
					label="Invite code"
					length={8}
					inputMode="text"
					pattern={PIN_INPUT_ALPHANUMERIC_PATTERN}
					bind:value={inviteCode}
					pasteTransformer={alphanumericOnly}
					helper={`Value: ${inviteCode || 'empty'}`}
				/>
			</div>
		</ComponentCard>

		<ComponentCard description="Pin input in the generic Form renderer." class="!min-h-fit">
			<div class="grid w-full max-w-md gap-4">
				<Form
					inputs={{
						otp: {
							type: 'pin',
							label: 'Login code',
							required: true,
							length: 6,
							pasteTransformer: digitsOnly
						}
					}}
					onSubmit={setFormValue}
					submitButton={{ children: 'Verify code' }}
				/>
				{#if formValue}
					<p class="text-foreground-muted text-sm">{formValue}</p>
				{/if}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
