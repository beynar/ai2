<script lang="ts">
	import Accordion from '../Accordion/Accordion.svelte';
	import Slot from '../Slot/Slot.svelte';
	import Spinner from '../Spinner/Spinner.svelte';
	import type {
		AIToolCall,
		AIToolLabels,
		AIToolRenderPayload,
		AIToolSnippet,
		AIToolStatus
	} from './aiTool.props.js';
	import type { AIToolThemeProps } from './aiTool.theme.js';
	import { useAIToolTheme } from './aiTool.theme.js';
	import {
		createAIToolAccordionTheme,
		type AIToolAccordionScope
	} from './aiToolPrimitiveThemes.js';
	import {
		formatAIToolStatus,
		getAIToolCallValue,
		getAIToolErrorValue,
		getAIToolGroupValue,
		getAIToolOutputValue,
		getAIToolStatusTone,
		hasRenderableAIToolValue,
		isActiveAIToolStatus,
		resolveAIToolStatus
	} from './toolRendering.js';
	import AIToolStatusBadge from './AIToolStatusBadge.svelte';
	import AIToolValueSection from './AIToolValueSection.svelte';

	type ToolAccordionItem = { id: string; tool: AIToolCall; index: number };

	let {
		tools,
		value = $bindable([]),
		multiple = true,
		scope = 'calls',
		labels,
		formatStatus = formatAIToolStatus,
		icon,
		title,
		status,
		content,
		input,
		output,
		error,
		maxDepth,
		maxEntries,
		theme
	}: {
		tools: readonly AIToolCall[];
		value?: string[];
		multiple?: boolean;
		scope?: Extract<AIToolAccordionScope, 'single' | 'calls'>;
		labels: AIToolLabels;
		formatStatus?: (status: AIToolStatus) => string;
		icon?: AIToolSnippet;
		title?: AIToolSnippet;
		status?: AIToolSnippet;
		content?: AIToolSnippet;
		input?: AIToolSnippet;
		output?: AIToolSnippet;
		error?: AIToolSnippet;
		maxDepth: number;
		maxEntries: number;
		theme?: AIToolThemeProps;
	} = $props();

	const items = $derived<ToolAccordionItem[]>(
		tools.map((tool, index) => ({
			id: scope === 'single' ? getAIToolGroupValue([tool]) : getAIToolCallValue(tool, index),
			tool,
			index
		}))
	);
	const classes = $derived(useAIToolTheme(theme));
	const accordionTheme = $derived(createAIToolAccordionTheme(classes, scope));

	function displayName(tool: AIToolCall): string {
		return tool.title ?? tool.name ?? labels.fallbackTitle;
	}
</script>

{#snippet toolTitle(payload: { item: ToolAccordionItem })}
	{@const tool = payload.item.tool}
	{@const renderPayload: AIToolRenderPayload = { tool, index: payload.item.index }}
	{@const currentStatus = resolveAIToolStatus(tool)}
	<div data-slot="ai-tool-call-trigger-content" class={classes.title()}>
		<span
			data-slot="ai-tool-call-status-indicator"
			class={classes.indicator({ tone: getAIToolStatusTone(currentStatus) })}
		>
			{#if icon}
				<Slot render={icon} payload={renderPayload} />
			{:else if isActiveAIToolStatus(currentStatus)}
				<Spinner size="small" decorative class="motion-reduce:[&_*]:animate-none" />
			{:else}
				<span class={classes.indicatorDot()}></span>
			{/if}
		</span>
		{#if title}
			<Slot render={title} payload={renderPayload} />
		{:else}
			<span data-slot="ai-tool-call-title" class={classes.name()}>{displayName(tool)}</span>
		{/if}
		{#if status}
			<Slot render={status} payload={renderPayload} />
		{:else}
			<AIToolStatusBadge status={currentStatus} {formatStatus} {theme} />
		{/if}
	</div>
{/snippet}

{#snippet toolContent(payload: { item: ToolAccordionItem })}
	{@const tool = payload.item.tool}
	{@const index = payload.item.index}
	{@const renderPayload: AIToolRenderPayload = { tool, index }}
	{@const errorValue = getAIToolErrorValue(tool)}
	{@const outputValue = getAIToolOutputValue(tool)}
	{#if content}
		<Slot render={content} payload={renderPayload} />
	{:else}
		<div data-slot="ai-tool-call-panel-content" class={classes.content()}>
			{#if hasRenderableAIToolValue(tool.input)}
				<AIToolValueSection
					{tool}
					{index}
					label={labels.input}
					value={tool.input}
					snippet={input}
					{maxDepth}
					{maxEntries}
					{theme}
				/>
			{/if}

			{#if hasRenderableAIToolValue(errorValue)}
				<AIToolValueSection
					{tool}
					{index}
					label={labels.error}
					value={errorValue}
					snippet={error ?? output}
					tone="error"
					{maxDepth}
					{maxEntries}
					{theme}
				/>
			{:else if hasRenderableAIToolValue(outputValue)}
				<AIToolValueSection
					{tool}
					{index}
					label={labels.output}
					value={outputValue}
					snippet={output}
					{maxDepth}
					{maxEntries}
					{theme}
				/>
			{/if}

			{#if !hasRenderableAIToolValue(tool.input) && !hasRenderableAIToolValue(errorValue) && !hasRenderableAIToolValue(outputValue)}
				<div data-slot="ai-tool-empty" class={classes.empty()}>{labels.empty}</div>
			{/if}
		</div>
	{/if}
{/snippet}

<Accordion
	{items}
	bind:value
	oneAtATime={!multiple}
	title={toolTitle}
	content={toolContent}
	variant={scope === 'single' ? 'outlined' : 'classic'}
	density="small"
	theme={accordionTheme}
/>
