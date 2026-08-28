<script lang="ts">
	import Alert from '$lib/components/Alert/Alert.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { createComponentControls } from '../../componentControls.svelte.js';
	import DocPage from '../../DocPage.svelte';
	import AIMcpAppDemo from './AIMcpAppDemo.svelte';

	const controls = createComponentControls([
		{
			name: 'toolState',
			type: 'segmented',
			label: 'Tool state',
			value: 'complete',
			options: ['complete', 'streaming', 'cancelled', 'error']
		},
		{
			name: 'hostTheme',
			type: 'segmented',
			label: 'Host theme',
			value: 'system',
			options: ['system', 'light', 'dark']
		}
	]);
</script>

<DocPage
	title="AI MCP App"
	subtitle="A secure host bridge for rendering official MCP Apps resources in a separate-origin sandbox."
	component="AIMcpApp"
	features={[
		'Official AppBridge and PostMessageTransport',
		'ui:// resource classification and compatibility metadata',
		'Exact MCP App MIME validation',
		'Separate-origin sandbox enforcement',
		'Default-deny permission and tool policies',
		'Visible loading, error, and closed states',
		'Stable sessions across immutable tool updates'
	]}
>
	<ComponentCard
		{controls}
		description="The in-memory client covers partial, complete, cancelled, and failed tool lifecycles. Use the app actions to exercise message, context, tool, link, download, log, display, and close requests without performing real navigation or downloads."
		class="!min-h-[320px] p-4"
		code={`<script lang="ts">
  import { AIMcpApp } from 'svelai/ai-mcp-app';
${'</' + 'script>'}

<AIMcpApp
  tool={toolCall}
	  host={{
	    client,
	    hostInfo: { name: 'My host', version: '1.0.0' },
	    sandboxUrl: 'https://sandbox.example.com/mcp',
	    permissionPolicy: { allowedPermissions: [] },
	    appToolPolicy: { allowedTools: ['refresh-data'] },
	    onAppToolCall: (params, sourceTool, extra) =>
	      runConversationTool(params, sourceTool, { signal: extra.signal })
	  }}
	aria-label="Interactive MCP App"
/>`}
	>
		<div class="w-full max-w-3xl">
			<AIMcpAppDemo hostTheme={controls.value.hostTheme} toolState={controls.value.toolState} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Tool lifecycle"
			description="Keep the tool id stable while replacing the object. Streaming input remains partial until a non-streaming update supplies the one complete input; result or cancellation is then delivered once."
			class="!min-h-fit"
			language="typescript"
			code={`let tool: AIMcpToolCall = {
  id: 'call-42',
  name: 'search',
  status: 'streaming',
  input: { query: 'svel' },
  _meta: { ui: { resourceUri: 'ui://search/results.html' } }
};

tool = { ...tool, input: { query: 'svelai' } }; // another partial input
tool = { ...tool, status: 'running' }; // complete input, exactly once
tool = { ...tool, status: 'success', result: callToolResult }; // terminal result

// Alternative terminal state for a separate interrupted call:
const cancelledTool: AIMcpToolCall = {
  ...tool,
  id: 'call-43',
  status: 'cancelled',
  result: undefined,
  error: 'Stopped by the user'
};`}
		>
			<p class="max-w-xl text-sm text-neutral/70">
				A result is never sent before complete input. Pending and loading calls wait for input,
				while cancelled calls deliver an explicit reason.
			</p>
		</ComponentCard>

		<ComponentCard
			title="Explicit host capabilities"
			description="Handlers opt capabilities in. Modalities, browser permissions, app-visible tools, and display modes remain host-owned and default to the narrowest behavior."
			class="!min-h-fit"
			language="typescript"
			code={`const host: AIMcpAppHostConfig = {
  client,
  hostInfo: { name: 'My host', version: '1.0.0' },
  sandboxUrl: 'https://sandbox.example.com/mcp',
  permissionPolicy: { allowedPermissions: ['clipboardWrite'] },
  appToolPolicy: { allowedTools: ['refresh-data'] },
  messageModalities: { text: {}, image: {} },
  modelContextModalities: { text: {}, structuredContent: {} },
  hostContext: { availableDisplayModes: ['inline', 'fullscreen'] },
  onMessage: async (params, sourceTool, extra) => {
    await appendAppMessage(params, sourceTool, extra.signal);
    return {};
  },
  onModelContext: (params, sourceTool, extra) =>
    updateAppContext(params, sourceTool, extra.signal),
  onAppToolCall: (params, sourceTool, extra) =>
    runConversationTool(params, sourceTool, { signal: extra.signal }),
  onOpenLink: async ({ url }) => {
    await confirmExternalLink(url);
    return {};
  },
  onDownloadFile: async ({ contents }) => {
    await saveApprovedFiles(contents);
    return {};
  },
  onLog: (params) => recordAppLog(params),
  onDisplayMode: async ({ mode }) => ({ mode: await applyDisplayMode(mode) })
};`}
		>
			<Alert
				variant="soft"
				color="info"
				title="Capabilities follow handlers"
				description="Omit a handler to reject that request. Fullscreen and PiP are advertised only when onDisplayMode exists, and callback results are validated against both host and app capabilities."
			/>
		</ComponentCard>

		<ComponentCard
			title="Sandbox response"
			description="Deploy the helper on a separate origin and provide an explicit host-origin allowlist. Direct navigation and unlisted referrers are rejected."
			class="!min-h-fit"
			code={`import { createAIMcpSandboxResponse } from 'svelai/ai-mcp-app/sandbox';

export function GET({ request }) {
  return createAIMcpSandboxResponse(request, {
    allowedHostOrigins: ['https://app.example.com']
  });
}`}
			language="typescript"
		>
			<Alert
				variant="soft"
				color="warning"
				title="Separate origin required"
				description="AIMcpApp rejects same-origin sandbox URLs. Production docs require PUBLIC_MCP_APP_SANDBOX_URL and MCP_APP_ALLOWED_HOST_ORIGINS."
			/>
		</ComponentCard>

		<ComponentCard
			title="Theme and native attributes"
			description="Root HTML attributes, state snippets, Svelte attachments, and the standard component theme contract are applied to the host container."
			class="!min-h-fit"
			code={`{#snippet loading({ resourceUri })}<LoadingState {resourceUri} />{/snippet}
{#snippet error({ error: appError })}<AppError error={appError} />{/snippet}
{#snippet closed()}<ClosedState />{/snippet}

<AIMcpApp
	  {tool}
	  {host}
	  aria-label="Interactive report"
	  data-conversation-id={conversationId}
	  {loading}
	  {error}
	  {closed}
	  theme={{
	    root: { base: 'rounded-none' },
	    frame: { base: 'bg-neutral-muted' }
  }}
/>`}
		>
			<Alert
				variant="soft"
				color="info"
				title="Policy remains host-owned"
				description="Styling and native attributes do not alter sandbox, permission, or app-tool authorization policy."
			/>
		</ComponentCard>

		<ComponentCard
			title="Thread composition"
			description="AIThread classifies app-bearing tools and passes the explicit host policy to each isolated app surface."
			class="!min-h-fit"
			code={`<AIThread {messages} mcpHost={hostConfig} />`}
		>
			<p class="max-w-xl text-sm text-neutral/70">
				The connected client resolves resources only. App-originated tool calls cross the host
				allowlist and conversation callback instead of automatic client forwarding.
			</p>
		</ComponentCard>
	{/snippet}
</DocPage>
