type ResizeObserverOptions = {
	isActive: boolean;
	callback: (entry: ResizeObserverEntry) => void;
};

export const useResizeObserver = (props: ResizeObserverOptions) => {
	let observer: ResizeObserver | null = null;
	return {
		get attachment() {
			return props.isActive
				? (node: HTMLElement) => {
						if (!observer) {
							observer = new ResizeObserver(([entry]) => {
								props.callback(entry);
							});
						}
						observer.observe(node);

						return () => {
							observer?.unobserve(node);
							observer = null;
						};
					}
				: null;
		}
	};
};
