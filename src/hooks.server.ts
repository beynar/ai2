import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	if (status !== 404) {
		console.log(error);
	} else {
		console.log('error', status);
	}

	return {
		message: 'Whoops!'
	};
};
