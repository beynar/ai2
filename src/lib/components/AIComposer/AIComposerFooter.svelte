<script lang="ts">
	import Button from '../Button/Button.svelte';
	import { paperPlaneRightIcon } from '../Icons/paperPlaneRight.js';
	import { paperclipIcon } from '../Icons/paperclip.js';
	import { stopIcon } from '../Icons/stop.js';
	import Slot from '../Slot/Slot.svelte';
	import type { Slot as SlotType } from '../Slot/slot.js';
	import type { AIComposerSubmitState } from './aiComposer.props.js';
	import { useAIComposerTheme, type AIComposerThemeProps } from './aiComposer.theme.js';

	let {
		state,
		footer,
		footerStart,
		actions,
		modelSelector,
		fileDropzone,
		attachDisabled,
		disabled,
		isWorking,
		isSubmitting,
		isStopping,
		isEditing,
		queueWhileBusy,
		submitLabel,
		stopLabel,
		attachLabel,
		onAttach,
		onStop,
		theme
	}: {
		state: AIComposerSubmitState;
		footer?: SlotType<AIComposerSubmitState>;
		footerStart?: SlotType<AIComposerSubmitState>;
		actions?: SlotType<AIComposerSubmitState>;
		modelSelector?: SlotType;
		fileDropzone: boolean;
		attachDisabled: boolean;
		disabled: boolean;
		isWorking: boolean;
		isSubmitting: boolean;
		isStopping: boolean;
		isEditing: boolean;
		queueWhileBusy: boolean;
		submitLabel: string;
		stopLabel: string;
		attachLabel: string;
		onAttach: () => void;
		onStop: () => void;
		theme?: AIComposerThemeProps;
	} = $props();

	const classes = $derived(useAIComposerTheme(theme));
</script>

{#if footer}
	<Slot render={footer} payload={state} class={classes.footer()} />
{:else}
	<div data-slot="ai-composer-footer" class={classes.footer()}>
		<div class={classes.actions()}>
			<Slot render={footerStart} payload={state} />
			{#if fileDropzone}
				<Button
					type="button"
					squared
					size="small"
					variant="ghost"
					color="neutral"
					label={attachLabel}
					disabled={attachDisabled}
					onClick={onAttach}
				>
					{@render paperclipIcon({ size: 16 })}
				</Button>
			{/if}
			<Slot render={modelSelector} />
		</div>
		<div class={classes.actions()}>
			<Slot render={actions} payload={state} />
			{#if state.isBusy && !isEditing}
				<Button
					type="button"
					squared
					size="small"
					variant="soft"
					label={stopLabel}
					loading={isStopping}
					disabled={disabled || isWorking}
					onClick={onStop}
				>
					{@render stopIcon({ size: 16 })}
				</Button>
			{:else}
				<Button
					type="submit"
					squared
					size="small"
					label={submitLabel}
					loading={isSubmitting}
					disabled={disabled ||
						isWorking ||
						state.isEmpty ||
						(state.isBusy && !queueWhileBusy && !isEditing)}
				>
					{@render paperPlaneRightIcon({ size: 16 })}
				</Button>
			{/if}
		</div>
	</div>
{/if}
