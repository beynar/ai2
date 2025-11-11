type ScrollLockOptions = {
	isActive: () => boolean;
	scroller?: HTMLElement;
};
export const useScrollLock = (opts: ScrollLockOptions) => {
	let locked = false;
	let previousPaddingRight = 0;
	const lock = (shouldLock: boolean) => {
		locked = shouldLock;
		const scroller = opts.scroller || document.body;
		const scrollBarWidth = window.innerWidth - document.body.clientWidth;

		if (!scroller) return;
		if (shouldLock) {
			if (scrollBarWidth) {
				previousPaddingRight = parseInt(scroller.style.paddingRight || '0');
				scroller.style.paddingRight = `${scrollBarWidth}px`;
			}
			scroller.style.overflow = 'hidden';
		} else {
			scroller.style.overflow = 'auto';
			scroller.style.paddingRight = `${previousPaddingRight}px`;
		}
	};

	$effect(() => {
		if (opts.isActive() && !locked) {
			lock(true);
		} else if (locked) {
			lock(false);
		}
	});
};
