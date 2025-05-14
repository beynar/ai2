import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log(error);
	return {
		message: 'Whoops!'
	};
};
