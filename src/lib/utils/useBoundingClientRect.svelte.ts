const defaultRect = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	x: 0,
	y: 0
};
export const useBoundingClientRect = () => {
	let rect = $state<DOMRect>({
		...defaultRect,
		toJSON() {
			return defaultRect;
		}
	});

	return {
		get current() {
			return rect;
		},
		reference: (ref: HTMLElement) => {
			const resizeObserver = new ResizeObserver(() => {
				rect = ref.getBoundingClientRect();
			});
			resizeObserver.observe(ref);
			rect = ref.getBoundingClientRect();
			return () => {
				resizeObserver.disconnect();
			};
		}
	};
};
