import { tick, untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';

interface CustomEventMap {
	'autosize:update': CustomEvent<void>;
}

declare global {
	interface Document {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
	}
}

type Opts = {
	value?: unknown;
	maxRows?: number;
	maxHeight?: number;
};

export const triggerAutoSizeUpdate = () =>
	tick().then(() => {
		if (typeof document === 'undefined') return;
		document.dispatchEvent(new CustomEvent<void>('autosize:update'));
	});

export const autosize = (getOptions: () => Opts = () => ({})): Attachment<HTMLTextAreaElement> => {
	return (textarea) =>
		untrack(() => {
			let options = getOptions();
			let lines = 0;
			const document = textarea.ownerDocument;

			const {
				boxSizing,
				paddingTop,
				paddingBottom,
				borderTopWidth,
				borderBottomWidth,
				lineHeight
			} = getComputedStyle(textarea);
			const heightOffset =
				boxSizing === 'content-box'
					? -(parseFloat(paddingTop) + parseFloat(paddingBottom))
					: parseFloat(borderTopWidth) + parseFloat(borderBottomWidth);

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

				if (options.maxRows && lines > options.maxRows) {
					textarea.style.overflowY = 'scroll';
					textarea.style.height = `${actualHeight}px`;
					return;
				}

				textarea.style.overflowY = actualHeight < currentHeight ? 'scroll' : 'hidden';
				textarea.style.height = '';
				const newHeight = textarea.scrollHeight + heightOffset;

				if (options.maxHeight && newHeight > options.maxHeight) {
					textarea.style.overflowY = 'scroll';
					textarea.style.height = `${options.maxHeight}px`;
					return;
				}

				textarea.style.height = `${newHeight}px`;
			};

			const update = () => {
				setLines();
				resize();
			};

			const resizeObserver =
				typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
			resizeObserver?.observe(textarea);
			if (document.body) {
				resizeObserver?.observe(document.body);
			}

			const handleInput = () => update();
			textarea.addEventListener('input', handleInput);
			document.addEventListener('autosize:update', update);
			update();

			$effect(() => {
				options = getOptions();
				update();
			});

			return () => {
				resizeObserver?.disconnect();
				textarea.removeEventListener('input', handleInput);
				document.removeEventListener('autosize:update', update);
			};
		});
};
