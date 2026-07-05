const STOPPED_CONTROL_EVENTS = ['pointerdown', 'mousedown', 'touchstart', 'dblclick', 'wheel'];

export function stopMapControlEvent(event: Event): void {
	event.stopPropagation();
}

export function customMapControlEvents(
	node: HTMLElement,
	onclick: (event: MouseEvent) => void
): { update: (nextOnClick: (event: MouseEvent) => void) => void; destroy: () => void } {
	let currentOnClick = onclick;

	function handleClick(event: MouseEvent): void {
		currentOnClick(event);
	}

	for (const eventName of STOPPED_CONTROL_EVENTS) {
		node.addEventListener(eventName, stopMapControlEvent);
	}
	node.addEventListener('click', handleClick);

	return {
		update: (nextOnClick) => {
			currentOnClick = nextOnClick;
		},
		destroy: () => {
			for (const eventName of STOPPED_CONTROL_EVENTS) {
				node.removeEventListener(eventName, stopMapControlEvent);
			}
			node.removeEventListener('click', handleClick);
		}
	};
}
