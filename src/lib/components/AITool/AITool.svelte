<script lang="ts">
	import Accordion from '../Accordion/Accordion.svelte';
	import { wrenchIcon } from '../Icons/wrench.js';
	import type { AIToolCall, AIToolLabels, AIToolProps } from './aiTool.props.js';
	import { useAIToolTheme } from './aiTool.theme.js';
	import { createAIToolAccordionTheme } from './aiToolPrimitiveThemes.js';
	import {
		formatAIToolStatus,
		getAIToolGroupValue,
		resolveAIToolGroupStatus
	} from './toolRendering.js';
	import AIToolCallList from './AIToolCallList.svelte';
	import AIToolStatusBadge from './AIToolStatusBadge.svelte';

	type ToolGroupAccordionItem = { id: string; tools: readonly AIToolCall[] };

	let {
		ref = $bindable(null),
		tool,
		tools = [],
		value = $bindable([]),
		multiple = true,
		maxDepth = 8,
		maxEntries = 80,
		labels,
		formatStatus = formatAIToolStatus,
		icon,
		title,
		status,
		content,
		input,
		output,
		error,
		class: className,
		theme,
		...rootAttributes
	}: AIToolProps = $props();

	let nestedValue = $state<string[]>([]);
	const resolvedTools = $derived(tools.length > 0 ? [...tools] : tool ? [tool] : []);
	const singleTool = $derived(resolvedTools.length === 1 ? resolvedTools[0] : undefined);
	const groupItems = $derived<ToolGroupAccordionItem[]>(
		resolvedTools.length > 1
			? [{ id: getAIToolGroupValue(resolvedTools), tools: resolvedTools }]
			: []
	);
	const resolvedLabels = $derived<AIToolLabels>({
		fallbackTitle: labels?.fallbackTitle ?? 'Tool call',
		group: labels?.group ?? ((count) => `${count} tool calls`),
		input: labels?.input ?? 'Input',
		output: labels?.output ?? 'Output',
		error: labels?.error ?? 'Error',
		empty: labels?.empty ?? 'No input or output yet.'
	});
	const classes = $derived(useAIToolTheme(theme));
	const groupAccordionTheme = $derived(createAIToolAccordionTheme(classes, 'group'));
</script>

{#snippet groupTitle(payload: { item: ToolGroupAccordionItem })}
	{@const currentStatus = resolveAIToolGroupStatus(payload.item.tools)}
	<div data-slot="ai-tool-group-trigger-content" class={classes.title()}>
		<span data-slot="ai-tool-group-icon" class={classes.groupIcon()}>
			{@render wrenchIcon({ size: 14 })}
		</span>
		<span data-slot="ai-tool-group-title" class={classes.name()}>
			{resolvedLabels.group(payload.item.tools.length)}
		</span>
		<AIToolStatusBadge status={currentStatus} {formatStatus} {theme} />
	</div>
{/snippet}

{#snippet groupContent(payload: { item: ToolGroupAccordionItem })}
	<div data-slot="ai-tool-group-panel-content" class={classes.groupContent()}>
		<AIToolCallList
			tools={payload.item.tools}
			bind:value={nestedValue}
			{multiple}
			labels={resolvedLabels}
			{formatStatus}
			{icon}
			{title}
			{status}
			{content}
			{input}
			{output}
			{error}
			{maxDepth}
			{maxEntries}
			{theme}
		/>
	</div>
{/snippet}

{#if singleTool}
	<div {...rootAttributes} bind:this={ref} data-slot="ai-tool" class={classes.root({ className })}>
		<AIToolCallList
			tools={[singleTool]}
			bind:value
			{multiple}
			scope="single"
			labels={resolvedLabels}
			{formatStatus}
			{icon}
			{title}
			{status}
			{content}
			{input}
			{output}
			{error}
			{maxDepth}
			{maxEntries}
			{theme}
		/>
	</div>
{:else if groupItems.length > 0}
	<div {...rootAttributes} bind:this={ref} data-slot="ai-tool" class={classes.root({ className })}>
		<Accordion
			items={groupItems}
			bind:value
			oneAtATime={!multiple}
			title={groupTitle}
			content={groupContent}
			variant="classic"
			density="small"
			theme={groupAccordionTheme}
		/>
	</div>
{/if}
