import { App } from '@modelcontextprotocol/ext-apps';

const statusElement = getElement('status');
const scoreElement = getElement('score');
const checksElement = getElement('checks');
const eventElement = getElement('event');
const actionButtons = [
	getButton('send-message'),
	getButton('call-tool'),
	getButton('update-context'),
	getButton('open-link'),
	getButton('download-file'),
	getButton('send-log'),
	getButton('display-mode'),
	getButton('close-app')
];

statusElement.textContent = 'Connecting';
const app = new App(
	{ name: 'Svelai MCP demo view', version: '1.0.0' },
	{ availableDisplayModes: ['inline', 'fullscreen'] },
	{ strict: true }
);

app.ontoolinputpartial = () => {
	statusElement.textContent = 'Partial input';
};
app.ontoolinput = () => {
	statusElement.textContent = 'Input received';
};
app.ontoolresult = ({ structuredContent, isError }) => {
	renderResult(structuredContent);
	statusElement.textContent = isError ? 'Tool error' : 'Ready';
};
app.ontoolcancelled = ({ reason }) => {
	statusElement.textContent = reason || 'Cancelled';
};
app.onhostcontextchanged = ({ theme }) => {
	if (theme) document.documentElement.style.colorScheme = theme;
	eventElement.textContent = theme ? `Host theme changed to ${theme}` : 'Host context changed';
};
app.onteardown = () => {
	setActionsDisabled(true);
	statusElement.textContent = 'Closed';
	return {};
};

bindAction('send-message', async () => {
	const result = await app.sendMessage({
		role: 'user',
		content: [{ type: 'text', text: 'Review the remaining launch-readiness check.' }]
	});
	if (result.isError) throw new Error('The host rejected the app message.');
	return 'Message accepted by host';
});

bindAction('call-tool', async () => {
	const result = await app.callServerTool({
		name: 'record-demo-action',
		arguments: { action: 'MCP App requested an allowlisted tool.' }
	});
	if (result.isError) throw new Error('The allowlisted app tool returned an error.');
	return 'Allowlisted app tool completed';
});

bindAction('update-context', async () => {
	await app.updateModelContext({
		structuredContent: { launchReadinessView: 'reviewed' }
	});
	return 'Model context updated';
});

bindAction('open-link', async () => {
	const result = await app.openLink({ url: 'https://modelcontextprotocol.io/' });
	if (result.isError) throw new Error('The host rejected the link request.');
	return 'Link request accepted';
});

bindAction('download-file', async () => {
	const result = await app.downloadFile({
		contents: [
			{
				type: 'resource',
				resource: {
					uri: 'ui://svelai/launch-readiness.txt',
					mimeType: 'text/plain',
					text: 'Svelai AI component readiness report'
				}
			}
		]
	});
	if (result.isError) throw new Error('The host rejected the download request.');
	return 'Download request accepted';
});

bindAction('send-log', async () => {
	await app.sendLog({ level: 'info', logger: 'svelai-demo', data: 'Demo log event' });
	return 'Log delivered to host';
});

bindAction('display-mode', async () => {
	const result = await app.requestDisplayMode({ mode: 'fullscreen' });
	return result.mode === 'fullscreen' ? 'Fullscreen accepted' : 'Host kept inline mode';
});

bindAction('close-app', async () => {
	await app.requestTeardown();
	return 'Close requested';
});

void connectApp();

async function connectApp(): Promise<void> {
	try {
		await app.connect();
		const theme = app.getHostContext()?.theme;
		if (theme) document.documentElement.style.colorScheme = theme;
		setActionsDisabled(false);
	} catch (error) {
		statusElement.textContent = getErrorMessage(error);
	}
}

function bindAction(id: string, action: () => Promise<string>): void {
	getButton(id).addEventListener('click', () => {
		void runAction(action);
	});
}

async function runAction(action: () => Promise<string>): Promise<void> {
	setActionsDisabled(true);
	eventElement.textContent = 'Waiting for host';
	try {
		eventElement.textContent = await action();
	} catch (error) {
		eventElement.textContent = getErrorMessage(error);
	} finally {
		setActionsDisabled(false);
	}
}

function setActionsDisabled(disabled: boolean): void {
	for (const button of actionButtons) button.disabled = disabled;
}

function renderResult(value: unknown): void {
	const completed = isRecord(value) && Array.isArray(value.completed) ? value.completed : [];
	const labels = completed.filter((label): label is string => typeof label === 'string');
	const total = isRecord(value) && typeof value.total === 'number' ? value.total : labels.length;
	scoreElement.textContent = `${labels.length} / ${total}`;
	checksElement.replaceChildren(
		...labels.map((label) => {
			const listItem = document.createElement('li');
			listItem.textContent = label;
			return listItem;
		})
	);
}

function getElement(id: string): HTMLElement {
	const element = document.getElementById(id);
	if (!element) throw new Error(`MCP App demo element "${id}" is missing.`);
	return element;
}

function getButton(id: string): HTMLButtonElement {
	const element = getElement(id);
	if (!(element instanceof HTMLButtonElement)) {
		throw new Error(`MCP App demo element "${id}" must be a button.`);
	}
	return element;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getErrorMessage(error: unknown): string {
	return error instanceof Error && error.message ? error.message : 'Unable to initialize.';
}
