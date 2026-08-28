import * as appBridge from '@modelcontextprotocol/ext-apps/app-bridge';

type ProtocolSchema<T> = {
	safeParse(
		value: unknown
	): { success: true; data: T } | { success: false; error: { message: string } };
};

type MessageHandler = NonNullable<appBridge.AppBridge['onmessage']>;
type OpenLinkHandler = NonNullable<appBridge.AppBridge['onopenlink']>;
type DownloadFileHandler = NonNullable<appBridge.AppBridge['ondownloadfile']>;
type ModelContextHandler = NonNullable<appBridge.AppBridge['onupdatemodelcontext']>;
type DisplayModeHandler = NonNullable<appBridge.AppBridge['onrequestdisplaymode']>;
type ToolCallHandler = NonNullable<appBridge.AppBridge['oncalltool']>;
type SandboxResource = Parameters<appBridge.AppBridge['sendSandboxResourceReady']>[0];

export type AIMcpAppHostCapabilities = ConstructorParameters<typeof appBridge.AppBridge>[2];
export type AIMcpAppContentModalities = NonNullable<AIMcpAppHostCapabilities['message']>;
export type AIMcpAppHostContext = NonNullable<
	NonNullable<ConstructorParameters<typeof appBridge.AppBridge>[3]>['hostContext']
>;
export type AIMcpAppResourceCsp = NonNullable<SandboxResource['csp']>;
export type AIMcpAppResourcePermissions = NonNullable<SandboxResource['permissions']>;
export type AIMcpAppRequestExtra = Parameters<MessageHandler>[1];
export type AIMcpAppMessageParams = Parameters<MessageHandler>[0];
export type AIMcpAppMessageResult = Awaited<ReturnType<MessageHandler>>;
export type AIMcpAppOpenLinkParams = Parameters<OpenLinkHandler>[0];
export type AIMcpAppOpenLinkResult = Awaited<ReturnType<OpenLinkHandler>>;
export type AIMcpAppDownloadFileParams = Parameters<DownloadFileHandler>[0];
export type AIMcpAppDownloadFileResult = Awaited<ReturnType<DownloadFileHandler>>;
export type AIMcpAppModelContextParams = Parameters<ModelContextHandler>[0];
export type AIMcpAppDisplayModeParams = Parameters<DisplayModeHandler>[0];
export type AIMcpAppDisplayModeResult = Awaited<ReturnType<DisplayModeHandler>>;
export type AIMcpAppToolCallParams = Parameters<ToolCallHandler>[0];
export type AIMcpAppToolCallResult = Awaited<ReturnType<ToolCallHandler>>;

// ext-apps 1.7.4 emits these runtime exports but loses them through its declaration re-export.
const protocolSchemas = appBridge as typeof appBridge & {
	McpUiResourceCspSchema: ProtocolSchema<AIMcpAppResourceCsp>;
	McpUiResourcePermissionsSchema: ProtocolSchema<AIMcpAppResourcePermissions>;
};

export const aiMcpResourceCspSchema = protocolSchemas.McpUiResourceCspSchema;
export const aiMcpResourcePermissionsSchema = protocolSchemas.McpUiResourcePermissionsSchema;
