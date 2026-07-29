import type { AskOptions, AskResult } from './ask.props.js';
import type { FormInputs } from '../Form/form.js';

export type AskRequest = {
	id: string;
	options: AskOptions<FormInputs>;
	resolve: (result: AskResult<FormInputs>) => void;
	reject: (reason: unknown) => void;
};

type AskHost = (request: AskRequest) => void;

let activeHost: AskHost | undefined;
let requestSequence = 0;

export function registerAskHost(host: AskHost): () => void {
	if (activeHost) {
		throw new Error('Only one <Ask /> host can be mounted at a time.');
	}

	activeHost = host;
	return () => {
		if (activeHost === host) activeHost = undefined;
	};
}

export function ask<const I extends FormInputs>(options: AskOptions<I>): Promise<AskResult<I>> {
	if (typeof document === 'undefined') {
		return Promise.reject(new Error('ask() cannot run during server rendering.'));
	}
	const host = activeHost;
	if (!host) {
		return Promise.reject(new Error('ask() requires one mounted <Ask /> host.'));
	}

	return new Promise((resolve, reject) => {
		// The mounted host erases the input generic while rendering. These callbacks restore the
		// concrete type inferred by the public ask() call without changing the runtime value.
		const request: AskRequest = {
			id: `ask-${++requestSequence}`,
			options: options as unknown as AskOptions<FormInputs>,
			resolve: (result) => resolve(result as AskResult<I>),
			reject
		};
		host(request);
	});
}
