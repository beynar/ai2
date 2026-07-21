<script lang="ts" generics="TMessage extends AIThreadItem = AIThreadItem">
	import type { VirtualItem } from '@tanstack/svelte-virtual';
	import type { Attachment } from 'svelte/attachments';
	import Alert from '../Alert/Alert.svelte';
	import type { AIConversationState } from '../AIConversation/aiConversation.state.svelte.js';
	import Empty from '../Empty/Empty.svelte';
	import AIMessage from '../AIMessage/AIMessage.svelte';
	import type { AIMessageActionState } from '../AIMessageActions/aiMessageActions.props.js';
	import AIMcpApp from '../AIMcpApp/AIMcpApp.svelte';
	import AISuggestions from '../AISuggestion/Suggestions.svelte';
	import Slot from '../Slot/Slot.svelte';
	import AITool from '../AITool/AITool.svelte';
	import AIThreadMarker from './AIThreadMarker.svelte';
	import type { AIThreadItem, AIThreadProps, AIThreadRole } from './aiThread.props.js';
	import { useAIThreadTheme } from './aiThread.theme.js';
	import type { AIThreadRenderItem } from './threadRenderItems.js';

	type MessageRenderItem<TMessage extends AIThreadItem> = Extract<
		AIThreadRenderItem<TMessage>,
		{ kind: 'message' }
	>;

	type Props<TMessage extends AIThreadItem> = Pick<
		AIThreadProps<TMessage>,
		| 'suggestions'
		| 'onSuggestionClick'
		| 'density'
		| 'messageSize'
		| 'messageVariant'
		| 'empty'
		| 'message'
		| 'messageActions'
		| 'messageActionsVisibility'
		| 'messageCopyable'
		| 'messageEditable'
		| 'messageRetryable'
		| 'onMessageCopy'
		| 'onMessageEdit'
		| 'onMessageRetry'
		| 'tool'
		| 'toolIcon'
		| 'toolTitle'
		| 'toolContent'
		| 'toolInput'
		| 'toolOutput'
		| 'toolError'
		| 'toolStatus'
		| 'marker'
		| 'markerIcon'
		| 'markerContent'
		| 'app'
		| 'onRetry'
		| 'mcpHost'
		| 'theme'
	> & {
		renderItems: readonly AIThreadRenderItem<TMessage>[];
		virtualItems: readonly VirtualItem[];
		totalSize: number;
		measureItem: Attachment<HTMLElement>;
		conversation: AIConversationState<TMessage> | null;
	};

	let {
		renderItems,
		virtualItems,
		totalSize,
		measureItem,
		conversation,
		suggestions = [],
		onSuggestionClick,
		density = 'normal',
		messageSize = 'normal',
		messageVariant = 'bubble',
		empty,
		message: messageSlot,
		messageActions,
		messageActionsVisibility,
		messageCopyable,
		messageEditable,
		messageRetryable,
		onMessageCopy,
		onMessageEdit,
		onMessageRetry,
		tool: toolSlot,
		toolIcon,
		toolTitle,
		toolContent,
		toolInput,
		toolOutput,
		toolError,
		toolStatus,
		marker: markerSlot,
		markerIcon,
		markerContent,
		app: appSlot,
		onRetry,
		mcpHost,
		theme
	}: Props<TMessage> = $props();

	const classes = $derived(useAIThreadTheme(theme));

	function messageRole(message: TMessage): AIThreadRole {
		return message.role ?? 'assistant';
	}

	function previousMessage(index: number): MessageRenderItem<TMessage> | undefined {
		for (let previousIndex = index - 1; previousIndex >= 0; previousIndex -= 1) {
			const item = renderItems[previousIndex];
			if (item?.kind === 'message') return item;
		}
		return undefined;
	}

	function messageName(item: MessageRenderItem<TMessage>, index: number): string | undefined {
		if (!item.message.name) return undefined;
		const previous = previousMessage(index);
		if (
			previous &&
			messageRole(previous.message) === messageRole(item.message) &&
			previous.message.name === item.message.name
		) {
			return undefined;
		}
		return item.message.name;
	}

	function actionsVisibility(item: MessageRenderItem<TMessage>, index: number) {
		if (messageActionsVisibility) return messageActionsVisibility;
		const role = messageRole(item.message);
		if (role !== 'user' && role !== 'assistant') return 'hover';
		for (let nextIndex = renderItems.length - 1; nextIndex > index; nextIndex -= 1) {
			const next = renderItems[nextIndex];
			if (next?.kind === 'message' && messageRole(next.message) === role) return 'hover';
		}
		return 'always';
	}

	async function handleLegacyRetry(state: AIMessageActionState<TMessage>): Promise<void> {
		if (!onRetry || !state.message || state.index === undefined) return;
		await onRetry(state.message, state.index);
	}
</script>

{#snippet suggestionContent()}
	<AISuggestions {suggestions} {onSuggestionClick} class="mx-auto max-w-full" />
{/snippet}

{#if renderItems.length === 0}
	{#if empty}
		<Slot render={empty} />
	{:else}
		<Empty
			class="min-h-48"
			title="Start a conversation"
			description="Messages will appear here."
			content={suggestions.length > 0 ? suggestionContent : undefined}
		/>
	{/if}
{:else}
	<div class={classes.list()} style:height={`${totalSize}px`}>
		{#each virtualItems as virtualItem (virtualItem.key)}
			{@const item = renderItems[virtualItem.index]}
			{#if item}
				<div
					data-slot="ai-thread-item"
					data-index={virtualItem.index}
					data-kind={item.kind}
					class={classes.item({ density })}
					style:transform={`translateY(${virtualItem.start}px)`}
					{@attach measureItem}
				>
					{#if item.kind === 'message'}
						{#if messageSlot}
							<Slot
								render={messageSlot}
								payload={{ message: item.message, index: item.messageIndex }}
							/>
						{:else}
							<AIMessage
								message={item.message}
								index={item.messageIndex}
								size={messageSize}
								variant={messageVariant}
								name={messageName(item, virtualItem.index)}
								content={item.content ?? item.message.content ?? ''}
								{conversation}
								actions={messageActions}
								actionVisibility={actionsVisibility(item, virtualItem.index)}
								copyAction={messageCopyable}
								editAction={messageEditable}
								retryAction={messageRetryable}
								onCopy={onMessageCopy}
								onEdit={onMessageEdit}
								onRetry={onMessageRetry ?? (onRetry ? handleLegacyRetry : undefined)}
							/>
						{/if}
					{:else if item.kind === 'marker'}
						<AIThreadMarker {item} marker={markerSlot} {markerIcon} {markerContent} />
					{:else if item.kind === 'tool-group'}
						{#if toolSlot}
							<Slot
								render={toolSlot}
								payload={{
									tools: item.tools,
									message: item.message,
									index: item.messageIndex
								}}
							/>
						{:else}
							<AITool
								tools={item.tools}
								icon={toolIcon}
								title={toolTitle}
								content={toolContent}
								input={toolInput}
								output={toolOutput}
								error={toolError}
								status={toolStatus}
							/>
						{/if}
					{:else if appSlot}
						<Slot
							render={appSlot}
							payload={{
								tool: item.tool,
								message: item.message,
								index: item.messageIndex
							}}
						/>
					{:else if mcpHost}
						<AIMcpApp tool={item.tool} host={mcpHost} />
					{:else}
						<Alert color="danger" variant="soft" description="MCP App host is not configured." />
					{/if}
				</div>
			{/if}
		{/each}
	</div>
{/if}
