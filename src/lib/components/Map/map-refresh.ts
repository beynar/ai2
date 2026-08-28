import type { MapLibreMap } from './maplibre-types.js';

type LiveMapMovementEvents = {
	onMove: () => void;
	onDrag: () => void;
	onZoom: () => void;
	onMoveEnd: () => void;
	onZoomEnd: () => void;
};

export function createLiveMapRefresh(callback: () => void, delay = 40) {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let lastRefreshAt = 0;
	let shouldRefreshAgain = false;

	function cancel(): void {
		if (!timeout) return;
		clearTimeout(timeout);
		timeout = null;
		shouldRefreshAgain = false;
	}

	function run(): void {
		timeout = null;
		lastRefreshAt = Date.now();
		callback();

		if (!shouldRefreshAgain) return;
		shouldRefreshAgain = false;
		schedule();
	}

	function schedule(): void {
		if (timeout) {
			shouldRefreshAgain = true;
			return;
		}

		const wait = Math.max(0, delay - (Date.now() - lastRefreshAt));
		timeout = setTimeout(run, wait);
	}

	return {
		schedule,
		flush: () => {
			cancel();
			run();
		},
		cancel
	};
}

type LiveMapRefresh = ReturnType<typeof createLiveMapRefresh>;

export function bindLiveMapMovementEvents(
	map: MapLibreMap,
	events: LiveMapMovementEvents
): () => void {
	map.on('move', events.onMove);
	map.on('drag', events.onDrag);
	map.on('zoom', events.onZoom);
	map.on('moveend', events.onMoveEnd);
	map.on('zoomend', events.onZoomEnd);

	return () => {
		map.off('move', events.onMove);
		map.off('drag', events.onDrag);
		map.off('zoom', events.onZoom);
		map.off('moveend', events.onMoveEnd);
		map.off('zoomend', events.onZoomEnd);
	};
}

export function bindLiveMapRefreshEvents(
	map: MapLibreMap,
	liveRefresh: LiveMapRefresh
): () => void {
	let isBound = true;
	let hasQueuedIdleFlush = false;

	function flushAndQueueIdleFlush(): void {
		liveRefresh.flush();

		if (hasQueuedIdleFlush) return;
		hasQueuedIdleFlush = true;
		map.once('idle', () => {
			hasQueuedIdleFlush = false;
			if (isBound) liveRefresh.flush();
		});
	}

	const unbindMovementEvents = bindLiveMapMovementEvents(map, {
		onMove: liveRefresh.schedule,
		onDrag: liveRefresh.schedule,
		onZoom: liveRefresh.schedule,
		onMoveEnd: flushAndQueueIdleFlush,
		onZoomEnd: flushAndQueueIdleFlush
	});

	return () => {
		isBound = false;
		unbindMovementEvents();
		liveRefresh.cancel();
	};
}
