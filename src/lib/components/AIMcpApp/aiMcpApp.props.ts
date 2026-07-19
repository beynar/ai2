import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type {
	CallToolResult,
	Implementation,
	LoggingMessageNotification
} from '@modelcontextprotocol/sdk/types.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { AIToolCall } from '../AITool/aiTool.props.js';
import type {
	AIMcpAppDisplayModeParams,
	AIMcpAppDisplayModeResult,
	AIMcpAppContentModalities,
	AIMcpAppDownloadFileParams,
	AIMcpAppDownloadFileResult,
	AIMcpAppHostContext,
	AIMcpAppMessageParams,
	AIMcpAppMessageResult,
	AIMcpAppModelContextParams,
	AIMcpAppOpenLinkParams,
	AIMcpAppOpenLinkResult,
	AIMcpAppRequestExtra,
	AIMcpAppResourceCsp,
	AIMcpAppResourcePermissions,
	AIMcpAppToolCallParams,
	AIMcpAppToolCallResult
} from './aiMcpProtocol.js';
import type { AIMcpAppThemeProps } from './aiMcpApp.theme.js';

export type AIMcpToolCall = Omit<AIToolCall, 'input' | 'result'> & {
	name: string;
	input?: Record<string, unknown>;
	result?: CallToolResult;
};

export type AIMcpAppResource = {
	uri: string;
	html: string;
	csp?: AIMcpAppResourceCsp;
	permissions?: AIMcpAppResourcePermissions;
	domain?: string;
	prefersBorder?: boolean;
};

export type AIMcpAppPermission = 'camera' | 'microphone' | 'geolocation' | 'clipboardWrite';

export type AIMcpAppPermissionPolicy = {
	/** Resource permissions the host is willing to delegate. Omitted permissions are denied. */
	allowedPermissions: readonly AIMcpAppPermission[];
};

export type AIMcpAppToolPolicy = {
	/** Server tool names the app may request through `onAppToolCall`. */
	allowedTools: readonly string[];
};

export type AIMcpAppStatus =
	'loading-resource' | 'loading-sandbox' | 'initializing' | 'ready' | 'error' | 'closed';

export type AIMcpAppState = {
	status: AIMcpAppStatus;
	resourceUri?: string;
	error?: unknown;
	resource?: AIMcpAppResource;
};

export type AIMcpAppHostConfig = {
	/** Connected MCP client used to resolve UI resources. */
	client: Client;
	/** Host name and version advertised during app initialization. */
	hostInfo: Implementation;
	/** Cross-origin sandbox relay URL used for every resource. */
	sandboxUrl?: string | URL;
	/** Resolves a cross-origin sandbox relay URL. Required when resource metadata declares `domain`. */
	resolveSandboxUrl?: (
		resource: AIMcpAppResource,
		tool: AIMcpToolCall,
		signal: AbortSignal
	) => string | URL | Promise<string | URL>;
	/** Overrides the default `resources/read` UI resource resolver. */
	resolveResource?: (
		uri: string,
		client: Client,
		tool: AIMcpToolCall,
		signal: AbortSignal
	) => AIMcpAppResource | Promise<AIMcpAppResource>;
	/** Explicit browser-permission policy. Resource requests are denied when this is omitted. */
	permissionPolicy?: AIMcpAppPermissionPolicy;
	/** Explicit app-visible server-tool allowlist. Tool calls are disabled when this is omitted. */
	appToolPolicy?: AIMcpAppToolPolicy;
	/** Initial host context sent to the app bridge. */
	hostContext?: AIMcpAppHostContext;
	/** Content modalities accepted by `onMessage`. Defaults to text only. */
	messageModalities?: AIMcpAppContentModalities;
	/** Content modalities accepted by `onModelContext`. Defaults to text only. */
	modelContextModalities?: AIMcpAppContentModalities;
	/** Handles app-originated conversation messages. */
	onMessage?: (
		params: AIMcpAppMessageParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => AIMcpAppMessageResult | Promise<AIMcpAppMessageResult>;
	/** Handles app-originated model-context updates. */
	onModelContext?: (
		params: AIMcpAppModelContextParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => void | Promise<void>;
	/** Handles an allowlisted app-originated server-tool call through conversation-scoped state. */
	onAppToolCall?: (
		params: AIMcpAppToolCallParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => AIMcpAppToolCallResult | Promise<AIMcpAppToolCallResult>;
	/** Handles app-originated external-link requests. */
	onOpenLink?: (
		params: AIMcpAppOpenLinkParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => AIMcpAppOpenLinkResult | Promise<AIMcpAppOpenLinkResult>;
	/** Handles app-originated file download requests. */
	onDownloadFile?: (
		params: AIMcpAppDownloadFileParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => AIMcpAppDownloadFileResult | Promise<AIMcpAppDownloadFileResult>;
	/** Receives app logging notifications. */
	onLog?: (params: LoggingMessageNotification['params'], tool: AIMcpToolCall) => void;
	/** Handles requests to change the app display mode. */
	onDisplayMode?: (
		params: AIMcpAppDisplayModeParams,
		tool: AIMcpToolCall,
		extra: AIMcpAppRequestExtra
	) => AIMcpAppDisplayModeResult | Promise<AIMcpAppDisplayModeResult>;
	/** Called when resource loading or bridge initialization fails. */
	onError?: (error: unknown, tool: AIMcpToolCall) => void;
	/** Called after the app bridge closes. */
	onClosed?: (tool: AIMcpToolCall) => void;
};

type AIMcpAppRootAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

export type AIMcpAppProps = WithAttachments<
	AIMcpAppRootAttributes & {
		/** Bindable reference to the app container. */
		ref?: HTMLDivElement | null;
		/** Bindable reference to the sandbox iframe. */
		iframeRef?: HTMLIFrameElement | null;
		/** MCP tool call containing app metadata, input, and result. */
		tool: AIMcpToolCall;
		/** Connected host, sandbox, resource, and request handlers. */
		host: AIMcpAppHostConfig;
		/** Minimum accepted iframe height in pixels. */
		minHeight?: number;
		/** Maximum accepted iframe height in pixels. */
		maxHeight?: number;
		/** Maximum bridge initialization time in milliseconds. */
		initializationTimeout?: number;
		/** Renders additional content after the ready app frame. */
		children?: Slot<AIMcpAppState>;
		/** Replaces the visible resource and sandbox loading state. */
		loading?: Slot<AIMcpAppState>;
		/** Replaces the visible resource or bridge failure state. */
		error?: Slot<AIMcpAppState>;
		/** Replaces the visible closed state. */
		closed?: Slot<AIMcpAppState>;
		/** Class applied to the app container. */
		class?: string;
		/** Theme overrides for the app container, iframe, and states. */
		theme?: AIMcpAppThemeProps;
	}
>;
