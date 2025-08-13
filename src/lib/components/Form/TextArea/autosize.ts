import { tick } from 'svelte';

type Opts = {
	value?: unknown;
	maxRows?: number;
	maxHeight?: number;
};
export const triggerAutoSizeUpdate = () =>
	tick().then(() => {
		document.dispatchEvent(new CustomEvent('autosize:update'));
	});

export const autosize = (
	textarea: HTMLTextAreaElement,
	{ value, maxHeight, maxRows }: Opts = {}
) => {
	let lines = 0;

	const { boxSizing, paddingTop, paddingBottom, borderTopWidth, borderBottomWidth, lineHeight } =
		getComputedStyle(textarea);
	const heightOffset =
		boxSizing === 'content-box'
			? -(parseFloat(paddingTop) + parseFloat(paddingBottom))
			: parseFloat(borderTopWidth) + parseFloat(borderBottomWidth);

	const update = () => {
		setLines();
		resize();
	};
	const resizeObserver = new ResizeObserver(update);
	resizeObserver.observe(textarea);
	resizeObserver.observe(document.body);

	const setLines = () => {
		const cachedHeight = textarea.style.height;
		textarea.style.height = 'auto';
		lines = Math.ceil(textarea.offsetHeight / parseFloat(lineHeight)) - 1;
		textarea.style.height = cachedHeight;
	};

	const resize = () => {
		const style = getComputedStyle(textarea);
		const currentHeight = Math.round(parseFloat(textarea.style.height));

		const actualHeight =
			style.boxSizing === 'content-box'
				? Math.round(parseFloat(style.height))
				: textarea.offsetHeight;

		if (maxRows && lines > maxRows) {
			textarea.style.overflowY = 'scroll';
			textarea.style.height = actualHeight + 'px';
			return;
		}

		textarea.style.overflowY = actualHeight < currentHeight ? 'scroll' : 'hidden';
		textarea.style.height = '';
		const newHeight = textarea.scrollHeight + heightOffset;
		if (maxHeight && newHeight > maxHeight) {
			textarea.style.overflowY = 'scroll';
			textarea.style.height = maxHeight + 'px';
			return;
		}

		textarea.style.height = `${newHeight}px`;
	};

	update();
	if (!value) {
		textarea.addEventListener('input', update);
		document.addEventListener('autosize:update', update);
	}
	return {
		update() {
			update();
		},
		destroy() {
			resizeObserver?.disconnect();
			textarea.removeEventListener('input', update);
			document.removeEventListener('autosize:update', update);
		}
	};
};
