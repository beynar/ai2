import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';

export type PointerDragPayload<Node extends HTMLElement = HTMLElement> = {
	event: PointerEvent;
	node: Node;
	pointerId: number;
	startX: number;
	startY: number;
	x: number;
	y: number;
	deltaX: number;
	deltaY: number;
	hasMoved: boolean;
};

export type PointerDragOptions<Node extends HTMLElement = HTMLElement> = {
	disabled?: () => boolean;
	moveTolerance?: number;
	stopPropagation?: boolean;
	onStart?: (payload: PointerDragPayload<Node>) => boolean | void;
	onMove?: (payload: PointerDragPayload<Node>) => void;
	onEnd?: (payload: PointerDragPayload<Node>) => void;
};

type PointerDragSession<Node extends HTMLElement> = {
	node: Node;
	pointerId: number;
	startX: number;
	startY: number;
	lastEvent: PointerEvent;
	hasMoved: boolean;
};

const DEFAULT_MOVE_TOLERANCE = 2;

export const createPointerDrag = <Node extends HTMLElement = HTMLElement>(
	options: PointerDragOptions<Node>
): Attachment<Node> => {
	let session: PointerDragSession<Node> | null = null;

	const getPayload = (
		event: PointerEvent,
		currentSession: PointerDragSession<Node>
	): PointerDragPayload<Node> => {
		const deltaX = event.clientX - currentSession.startX;
		const deltaY = event.clientY - currentSession.startY;
		const tolerance = options.moveTolerance ?? DEFAULT_MOVE_TOLERANCE;
		currentSession.hasMoved =
			currentSession.hasMoved || Math.abs(deltaX) > tolerance || Math.abs(deltaY) > tolerance;
		currentSession.lastEvent = event;
		return {
			event,
			node: currentSession.node,
			pointerId: currentSession.pointerId,
			startX: currentSession.startX,
			startY: currentSession.startY,
			x: event.clientX,
			y: event.clientY,
			deltaX,
			deltaY,
			hasMoved: currentSession.hasMoved
		};
	};

	const releasePointer = (currentSession: PointerDragSession<Node>) => {
		if (currentSession.node.hasPointerCapture(currentSession.pointerId)) {
			currentSession.node.releasePointerCapture(currentSession.pointerId);
		}
	};

	const end = (event: PointerEvent) => {
		if (!session || event.pointerId !== session.pointerId) return;

		const currentSession = session;
		const payload = getPayload(event, currentSession);
		session = null;
		releasePointer(currentSession);
		options.onEnd?.(payload);
	};

	return (node) => {
		const start = (event: PointerEvent) => {
			if (session || event.button !== 0 || options.disabled?.()) return;

			const nextSession: PointerDragSession<Node> = {
				node,
				pointerId: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				lastEvent: event,
				hasMoved: false
			};
			const payload = getPayload(event, nextSession);
			if (options.onStart?.(payload) === false) return;

			if (options.stopPropagation) event.stopPropagation();
			event.preventDefault();
			node.setPointerCapture(event.pointerId);
			session = nextSession;
		};

		const move = (event: PointerEvent) => {
			if (!session || event.pointerId !== session.pointerId) return;

			event.preventDefault();
			options.onMove?.(getPayload(event, session));
		};

		const cleanup = () => {
			if (session?.node === node) {
				end(session.lastEvent);
			}
		};

		const offPointerDown = on(node, 'pointerdown', start);
		const offPointerMove = on(node, 'pointermove', move);
		const offPointerUp = on(node, 'pointerup', end);
		const offPointerCancel = on(node, 'pointercancel', end);
		const offLostPointerCapture = on(node, 'lostpointercapture', end);

		return () => {
			cleanup();
			offPointerDown();
			offPointerMove();
			offPointerUp();
			offPointerCancel();
			offLostPointerCapture();
		};
	};
};
