import type {
	FloatingWindowDimensions,
	FloatingWindowPosition,
	FloatingWindowResizeDirection
} from './floatingWindow.props.js';
import type { FloatingWindowState } from './floatingWindow.state.svelte.js';

export const FLOATING_WINDOW_VIEWPORT_GAP = 8;
export const FLOATING_WINDOW_DEFAULT_MIN_WIDTH = 280;
export const FLOATING_WINDOW_DEFAULT_MIN_HEIGHT = 160;

const RESIZE_AXES: Record<
	FloatingWindowResizeDirection,
	{ horizontal: -1 | 0 | 1; vertical: -1 | 0 | 1 }
> = {
	north: { horizontal: 0, vertical: -1 },
	northEast: { horizontal: 1, vertical: -1 },
	east: { horizontal: 1, vertical: 0 },
	southEast: { horizontal: 1, vertical: 1 },
	south: { horizontal: 0, vertical: 1 },
	southWest: { horizontal: -1, vertical: 1 },
	west: { horizontal: -1, vertical: 0 },
	northWest: { horizontal: -1, vertical: -1 }
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const samePosition = (a: FloatingWindowPosition | undefined, b: FloatingWindowPosition) =>
	a?.x === b.x && a.y === b.y;

const sameDimensions = (a: FloatingWindowDimensions, b: FloatingWindowDimensions) =>
	a.width === b.width && a.height === b.height;

export class FloatingWindowGeometry {
	constructor(private readonly windowState: FloatingWindowState) {}

	sync(dimensions: FloatingWindowDimensions, position: FloatingWindowPosition | undefined) {
		if (this.windowState.viewportWidth <= 0 || this.windowState.viewportHeight <= 0) return;
		const limits = this.getDimensionLimits();
		const nextDimensions = {
			width: Math.round(clamp(dimensions.width, limits.minWidth, limits.maxWidth)),
			height: Math.round(clamp(dimensions.height, limits.minHeight, limits.maxHeight))
		};
		const nextPosition = this.clampPosition(
			position ?? {
				x: (this.windowState.viewportWidth - nextDimensions.width) / 2,
				y: (this.windowState.viewportHeight - nextDimensions.height) / 2
			},
			nextDimensions
		);

		if (!sameDimensions(this.windowState.dimensions, nextDimensions)) {
			this.windowState.dimensions = nextDimensions;
		}
		if (!samePosition(this.windowState.position, nextPosition)) {
			this.windowState.position = nextPosition;
		}
	}

	move(position: FloatingWindowPosition) {
		this.windowState.position = this.clampPosition(position);
	}

	resize(
		startPosition: FloatingWindowPosition,
		startDimensions: FloatingWindowDimensions,
		direction: FloatingWindowResizeDirection,
		deltaX: number,
		deltaY: number
	) {
		const limits = this.getDimensionLimits();
		const axes = RESIZE_AXES[direction];
		const growsEast = axes.horizontal === 1;
		const growsWest = axes.horizontal === -1;
		const growsSouth = axes.vertical === 1;
		const growsNorth = axes.vertical === -1;
		let width = startDimensions.width;
		let height = startDimensions.height;

		if (growsEast) {
			width = clamp(
				startDimensions.width + deltaX,
				limits.minWidth,
				Math.min(
					limits.maxWidth,
					this.windowState.viewportWidth - FLOATING_WINDOW_VIEWPORT_GAP - startPosition.x
				)
			);
		} else if (growsWest) {
			width = clamp(
				startDimensions.width - deltaX,
				limits.minWidth,
				Math.min(
					limits.maxWidth,
					startPosition.x + startDimensions.width - FLOATING_WINDOW_VIEWPORT_GAP
				)
			);
		}

		if (growsSouth) {
			height = clamp(
				startDimensions.height + deltaY,
				limits.minHeight,
				Math.min(
					limits.maxHeight,
					this.windowState.viewportHeight - FLOATING_WINDOW_VIEWPORT_GAP - startPosition.y
				)
			);
		} else if (growsNorth) {
			height = clamp(
				startDimensions.height - deltaY,
				limits.minHeight,
				Math.min(
					limits.maxHeight,
					startPosition.y + startDimensions.height - FLOATING_WINDOW_VIEWPORT_GAP
				)
			);
		}

		const nextDimensions = { width: Math.round(width), height: Math.round(height) };
		const nextPosition = {
			x: growsWest
				? startPosition.x + startDimensions.width - nextDimensions.width
				: startPosition.x,
			y: growsNorth
				? startPosition.y + startDimensions.height - nextDimensions.height
				: startPosition.y
		};
		this.windowState.dimensions = nextDimensions;
		this.windowState.position = this.clampPosition(nextPosition, nextDimensions);
	}

	private clampPosition(
		position: FloatingWindowPosition,
		dimensions: FloatingWindowDimensions = this.windowState.dimensions
	): FloatingWindowPosition {
		return {
			x: Math.round(
				clamp(
					position.x,
					FLOATING_WINDOW_VIEWPORT_GAP,
					Math.max(
						FLOATING_WINDOW_VIEWPORT_GAP,
						this.windowState.viewportWidth - dimensions.width - FLOATING_WINDOW_VIEWPORT_GAP
					)
				)
			),
			y: Math.round(
				clamp(
					position.y,
					FLOATING_WINDOW_VIEWPORT_GAP,
					Math.max(
						FLOATING_WINDOW_VIEWPORT_GAP,
						this.windowState.viewportHeight - dimensions.height - FLOATING_WINDOW_VIEWPORT_GAP
					)
				)
			)
		};
	}

	private getDimensionLimits() {
		const viewportMaxWidth = Math.max(
			0,
			this.windowState.viewportWidth - FLOATING_WINDOW_VIEWPORT_GAP * 2
		);
		const viewportMaxHeight = Math.max(
			0,
			this.windowState.viewportHeight - FLOATING_WINDOW_VIEWPORT_GAP * 2
		);
		const maxWidth = Math.min(this.windowState.dimensions.max?.[0] ?? Infinity, viewportMaxWidth);
		const maxHeight = Math.min(this.windowState.dimensions.max?.[1] ?? Infinity, viewportMaxHeight);
		return {
			minWidth: Math.min(
				this.windowState.dimensions.min?.[0] ?? FLOATING_WINDOW_DEFAULT_MIN_WIDTH,
				maxWidth
			),
			minHeight: Math.min(
				this.windowState.dimensions.min?.[1] ?? FLOATING_WINDOW_DEFAULT_MIN_HEIGHT,
				maxHeight
			),
			maxWidth,
			maxHeight
		};
	}
}
