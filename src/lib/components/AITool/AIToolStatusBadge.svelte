<script lang="ts">
	import Chip from '../Chip/Chip.svelte';
	import Spinner from '../Spinner/Spinner.svelte';
	import type { AIToolStatus } from './aiTool.props.js';
	import type { AIToolThemeProps } from './aiTool.theme.js';
	import { useAIToolTheme } from './aiTool.theme.js';
	import {
		getAIToolStatusColor,
		isActiveAIToolStatus,
		formatAIToolStatus
	} from './toolRendering.js';

	let {
		status,
		formatStatus = formatAIToolStatus,
		theme
	}: {
		status: AIToolStatus;
		formatStatus?: (status: AIToolStatus) => string;
		theme?: AIToolThemeProps;
	} = $props();

	const classes = $derived(useAIToolTheme(theme));
</script>

<span data-slot="ai-tool-status" data-status={status} class={classes.status()}>
	<Chip size="small" variant="soft" color={getAIToolStatusColor(status)}>
		{#if isActiveAIToolStatus(status)}<Spinner
				size="small"
				decorative
				class="motion-reduce:[&_*]:animate-none"
			/>{/if}
		{formatStatus(status)}
	</Chip>
</span>
