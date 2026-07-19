import type {
	AIThreadAskUserQuestion,
	AIThreadAskUserQuestionState,
	AIThreadAskUserQuestionStateChange,
	AIThreadItem,
	AIThreadMessageKey
} from '../AIThread/aiThread.props.js';
import type { AIToolCall } from '../AITool/aiTool.props.js';

export type AIConversationToolTarget =
	| { id: AIThreadMessageKey }
	| { index: number }
	| { where: (tool: AIToolCall, index: number) => boolean };
export type AIConversationToolUpdate =
	AIToolCall | ((tool: AIToolCall, index: number) => AIToolCall);
export type AIConversationToolUpdateResult<TMessage extends AIThreadItem = AIThreadItem> = {
	message: TMessage;
	tool: AIToolCall;
	previousTool: AIToolCall;
	toolIndex: number;
};
export type AIConversationToolUpdateChange<TMessage extends AIThreadItem = AIThreadItem> =
	AIConversationToolUpdateResult<TMessage> & { previousMessage: TMessage; messageIndex: number };

export function updateAIConversationMessageTool<TMessage extends AIThreadItem>(
	message: TMessage,
	target: AIConversationToolTarget,
	update: AIConversationToolUpdate
): AIConversationToolUpdateResult<TMessage> {
	const tools = getMessageTools(message);
	if (!tools.length)
		throw new Error('Cannot update an AI conversation tool because the message has no tools.');
	const toolIndex = findToolIndex(tools, target);
	const previousTool = tools[toolIndex];
	if (!previousTool)
		throw new Error(`Cannot update missing AI conversation tool at index ${toolIndex}.`);
	const tool = typeof update === 'function' ? update(previousTool, toolIndex) : update;
	let nextMessage: AIThreadItem;
	if (message.tools?.length)
		nextMessage = {
			...message,
			tools: message.tools.map((current, index) => (index === toolIndex ? tool : current))
		};
	else if (message.tool) nextMessage = { ...message, tool };
	else if (message.parts?.some((part) => part.type === 'tool')) {
		let currentToolIndex = 0;
		nextMessage = {
			...message,
			parts: message.parts.map((part) => {
				if (part.type !== 'tool') return part;
				const shouldReplace = currentToolIndex === toolIndex;
				currentToolIndex += 1;
				return shouldReplace ? { ...part, tool } : part;
			})
		};
	} else
		nextMessage = {
			...message,
			name: tool.name ?? message.name,
			toolName: tool.name ?? message.toolName,
			status: tool.status,
			input: tool.input,
			output: tool.output,
			error: tool.error
		};
	return { message: nextMessage as TMessage, tool, previousTool, toolIndex };
}

export function createAskUserQuestionToolMutation<TMessage extends AIThreadItem>(
	messages: TMessage[],
	request: AIThreadAskUserQuestion<TMessage>,
	state: Exclude<AIThreadAskUserQuestionState, 'pending'>,
	detail?: AIThreadAskUserQuestionStateChange<TMessage>['detail']
) {
	const messageIndex =
		request.message.id === undefined
			? request.messageIndex
			: messages.findIndex((message) => message.id === request.message.id);
	if (messageIndex < 0 || messageIndex >= messages.length) {
		throw new Error(
			`Cannot resolve ask-user-question request "${request.key}" because its transcript message is missing.`
		);
	}
	const toolTarget = getQuestionToolTarget(request);
	return {
		messageTarget: { index: messageIndex },
		toolTarget,
		update: (tool: AIToolCall): AIToolCall => ({
			...tool,
			status: state === 'completed' ? 'success' : 'cancelled',
			output: {
				...recordOutput(tool.output),
				state,
				...(detail ? { answers: detail.answers, values: detail.values } : {})
			}
		})
	};
}

function getMessageTools(message: AIThreadItem): AIToolCall[] {
	if (message.tools?.length) return [...message.tools];
	if (message.tool) return [message.tool];
	const partTools = message.parts?.flatMap((part) =>
		part.type === 'tool' && part.tool ? [part.tool] : []
	);
	if (partTools?.length) return partTools;
	return messageAsTool(message);
}

function getQuestionToolTarget<TMessage extends AIThreadItem>(
	request: AIThreadAskUserQuestion<TMessage>
): AIConversationToolTarget {
	if (request.toolIndex !== undefined) return { index: request.toolIndex };
	if (request.tool.id !== undefined) return { id: request.tool.id };
	throw new Error(
		`Cannot resolve ask-user-question request "${request.key}" because its tool target is missing.`
	);
}

function findToolIndex(tools: AIToolCall[], target: AIConversationToolTarget): number {
	if ('index' in target) {
		if (!Number.isInteger(target.index) || target.index < 0 || target.index >= tools.length)
			throw new Error(`AI conversation tool index ${target.index} is out of range.`);
		return target.index;
	}
	const matches = tools
		.map((tool, index) => ({ tool, index }))
		.filter(({ tool, index }) =>
			'id' in target ? tool.id === target.id : target.where(tool, index)
		);
	if (matches.length > 1) throw new Error('AI conversation tool target matched multiple tools.');
	const [match] = matches;
	if (!match) throw new Error('Cannot find AI conversation tool for the provided target.');
	return match.index;
}

function messageAsTool(message: AIThreadItem): AIToolCall[] {
	if (
		message.role !== 'tool' &&
		message.type !== 'tool' &&
		!message.toolName &&
		!message.name &&
		message.status === undefined &&
		message.input === undefined &&
		message.output === undefined &&
		message.error === undefined
	)
		return [];
	return [
		{
			id: message.id,
			name: message.toolName ?? message.name,
			status: message.status,
			input: message.input,
			output: message.output,
			error: message.error
		}
	];
}

function recordOutput(value: unknown): Record<string, unknown> {
	if (isRecord(value)) return value;
	return value === undefined ? {} : { value };
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
