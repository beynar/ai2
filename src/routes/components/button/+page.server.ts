export const load = async () => {
	const wait = new Promise((resolve) => {
		setTimeout(() => {
			resolve('Hello, world!');
		}, 1000);
	});

	await wait;

	return {
		message: 'Hello, world!'
	};
};
