import type { Attachment } from 'svelte/attachments';

type RowPosition = {
	node: HTMLElement;
	left: number;
	top: number;
};

const duration = 200;
const easing = 'cubic-bezier(0.33, 1, 0.68, 1)';

const measureRows = (body: HTMLElement) => {
	const positions = new Map<string, RowPosition>();
	for (const node of body.querySelectorAll<HTMLElement>('[data-row-id]')) {
		const rowId = node.dataset.rowId;
		if (!rowId) continue;
		const rect = node.getBoundingClientRect();
		positions.set(rowId, { node, left: rect.left, top: rect.top });
	}
	return positions;
};

const findScrollParent = (node: HTMLElement) => {
	let current = node.parentElement;
	while (current) {
		const style = getComputedStyle(current);
		if (/(auto|scroll)/.test(`${style.overflowX}${style.overflowY}`)) return current;
		current = current.parentElement;
	}
	return null;
};

export const dataTableRowFlip =
	(isEnabled: () => boolean): Attachment<HTMLElement> =>
	(body) => {
		let positions = measureRows(body);
		let frame: number | null = null;
		const animations = new Set<Animation>();

		const cancelAnimations = () => {
			for (const animation of animations) animation.cancel();
			animations.clear();
		};

		const reset = () => {
			if (frame !== null) cancelAnimationFrame(frame);
			frame = null;
			cancelAnimations();
			positions = measureRows(body);
		};

		const animate = () => {
			frame = null;
			const nextPositions = measureRows(body);
			if (!isEnabled()) {
				positions = nextPositions;
				return;
			}

			for (const [rowId, next] of nextPositions) {
				const previous = positions.get(rowId);
				if (!previous) continue;
				const x = previous.left - next.left;
				const y = previous.top - next.top;
				if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5) continue;

				const animation = next.node.animate(
					[{ transform: `translate(${x}px, ${y}px)` }, { transform: 'translate(0, 0)' }],
					{ duration, easing }
				);
				animations.add(animation);
				animation.onfinish = () => animations.delete(animation);
				animation.oncancel = () => animations.delete(animation);
			}

			positions = nextPositions;
		};

		const schedule = () => {
			if (frame !== null) cancelAnimationFrame(frame);
			frame = requestAnimationFrame(animate);
		};

		const observer = new MutationObserver(schedule);
		observer.observe(body, {
			attributes: true,
			attributeFilter: ['data-row-id'],
			childList: true,
			subtree: true
		});
		const scrollParent = findScrollParent(body);
		scrollParent?.addEventListener('scroll', reset, { passive: true });
		window.addEventListener('resize', reset);

		return () => {
			observer.disconnect();
			scrollParent?.removeEventListener('scroll', reset);
			window.removeEventListener('resize', reset);
			reset();
		};
	};
