import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types.js';
import { createAIMcpSandboxResponse } from '$lib/components/AIMcpApp/sandbox.js';

export const GET: RequestHandler = ({ request, url }) => {
	const allowedHostOrigins = getAllowedHostOrigins(url);
	if (allowedHostOrigins.length === 0) {
		return new Response('MCP_APP_ALLOWED_HOST_ORIGINS is required in production.', { status: 500 });
	}
	return createAIMcpSandboxResponse(request, { allowedHostOrigins });
};

function getAllowedHostOrigins(url: URL): string[] {
	const configuredOrigins = env.MCP_APP_ALLOWED_HOST_ORIGINS?.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);
	if (configuredOrigins?.length) return configuredOrigins;
	if (!dev) return [];
	const port = url.port ? `:${url.port}` : '';
	return [`${url.protocol}//localhost${port}`, `${url.protocol}//127.0.0.1${port}`];
}
