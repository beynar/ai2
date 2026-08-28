import { fromAction, type Attachment } from 'svelte/attachments';

const STOPPED_CONTROL_EVENTS = ['pointerdown', 'mousedown', 'touchstart', 'dblclick', 'wheel'];

export function stopMapControlEvent(event: Event): void {
	event.stopPropagation();
}

function attachCustomMapControlEvents(
	node: HTMLElement,
	onclick: (event: MouseEvent) => void
): {
	update: (nextOnclick: (event: MouseEvent) => void) => void;
	destroy: () => void;
} {
	let currentOnclick = onclick;

	function handleClick(event: MouseEvent): void {
		currentOnclick(event);
	}

	for (const eventName of STOPPED_CONTROL_EVENTS) {
		node.addEventListener(eventName, stopMapControlEvent);
	}
	node.addEventListener('click', handleClick);

	return {
		update: (nextOnclick) => {
			currentOnclick = nextOnclick;
		},
		destroy: () => {
			for (const eventName of STOPPED_CONTROL_EVENTS) {
				node.removeEventListener(eventName, stopMapControlEvent);
			}
			node.removeEventListener('click', handleClick);
		}
	};
}

export function customMapControlEvents(
	onclick: (event: MouseEvent) => void
): Attachment<HTMLElement> {
	return fromAction(attachCustomMapControlEvents, () => onclick);
}
