import { on } from 'svelte/events';
import type { Attachment } from 'svelte/attachments';
import type { SliderState } from './slider.state.svelte.js';

type SliderDragEngineOptions = {
	getSlider: () => SliderState;
	isDisabled: () => boolean;
	isRangeDragEnabled: () => boolean;
	onThumbFocus: (index: number) => void;
	onThumbBlur: () => void;
};

export class SliderDragEngine {
	private trackNode: HTMLElement | null = null;
	private captureNode: HTMLElement | null = null;
	private thumbAttachments = new Map<number, Attachment<HTMLButtonElement>>();

	constructor(private options: SliderDragEngineOptions) {}

	track: Attachment<HTMLElement> = (node) => {
		this.trackNode = node;
		const offPointerDown = on(node, 'pointerdown', this.onTrackPointerDown);
		const offPointerMove = on(node, 'pointermove', this.onPointerMove);
		const offPointerUp = on(node, 'pointerup', this.onPointerEnd);
		const offPointerCancel = on(node, 'pointercancel', this.onPointerEnd);

		return () => {
			offPointerDown();
			offPointerMove();
			offPointerUp();
			offPointerCancel();
			this.trackNode = null;
			this.captureNode = null;
			this.slider.endDrag();
		};
	};

	range: Attachment<HTMLElement> = (node) => {
		const offPointerDown = on(node, 'pointerdown', (event) => this.onRangePointerDown(event, node));
		return () => {
			offPointerDown();
		};
	};

	thumb(index: number) {
		const cachedAttachment = this.thumbAttachments.get(index);
		if (cachedAttachment) return cachedAttachment;

		const attachment: Attachment<HTMLButtonElement> = (node) => {
			const offFocus = on(node, 'focus', () => this.options.onThumbFocus(index));
			const offBlur = on(node, 'blur', this.onThumbBlur);
			const offPointerDown = on(node, 'pointerdown', (event) =>
				this.onThumbPointerDown(event, index, node)
			);
			const offKeyDown = on(node, 'keydown', (event) => this.onThumbKeyDown(event, index));

			return () => {
				offFocus();
				offBlur();
				offPointerDown();
				offKeyDown();
			};
		};

		this.thumbAttachments.set(index, attachment);
		return attachment;
	}

	private get slider() {
		return this.options.getSlider();
	}

	private canStartPointerDrag(event: PointerEvent) {
		return !this.options.isDisabled() && event.button === 0;
	}

	private getPointerValue(event: PointerEvent) {
		if (!this.trackNode) return null;

		const rect = this.trackNode.getBoundingClientRect();
		const size = this.slider.orientationValue === 'vertical' ? rect.height : rect.width;
		if (size <= 0) return null;

		if (this.slider.orientationValue === 'vertical') {
			const offset = rect.bottom - event.clientY;
			return this.slider.getValueFromPercentage((offset / size) * 100);
		}

		const offset = event.clientX - rect.left;
		return this.slider.getValueFromPercentage((offset / size) * 100);
	}

	private focusThumb(index: number) {
		const thumb = this.trackNode?.querySelectorAll<HTMLElement>('[data-slider-thumb]')[index];
		thumb?.focus();
	}

	private capturePointer(node: HTMLElement, event: PointerEvent) {
		node.setPointerCapture(event.pointerId);
		this.captureNode = node;
	}

	private releasePointer(event: PointerEvent) {
		if (this.captureNode?.hasPointerCapture(event.pointerId)) {
			this.captureNode.releasePointerCapture(event.pointerId);
		}
		this.captureNode = null;
	}

	private onTrackPointerDown = (event: PointerEvent) => {
		if (!this.canStartPointerDrag(event) || !this.trackNode) return;

		const pointerValue = this.getPointerValue(event);
		if (pointerValue === null) return;

		event.preventDefault();
		this.capturePointer(this.trackNode, event);
		this.focusThumb(this.slider.startTrackDrag(pointerValue));
	};

	private onThumbPointerDown(event: PointerEvent, index: number, node: HTMLButtonElement) {
		if (!this.canStartPointerDrag(event)) return;

		event.stopPropagation();
		event.preventDefault();
		node.focus();
		this.capturePointer(node, event);
		this.slider.startThumbDrag(index);
	}

	private onRangePointerDown(event: PointerEvent, node: HTMLElement) {
		if (
			!this.canStartPointerDrag(event) ||
			!this.options.isRangeDragEnabled() ||
			!this.slider.isRange
		) {
			return;
		}

		const pointerValue = this.getPointerValue(event);
		if (pointerValue === null) return;

		event.stopPropagation();
		event.preventDefault();
		if (this.slider.startRangeDrag(pointerValue)) {
			this.capturePointer(node, event);
		}
	}

	private onPointerMove = (event: PointerEvent) => {
		if (this.options.isDisabled() || !this.slider.dragState) return;

		const pointerValue = this.getPointerValue(event);
		if (pointerValue === null) return;

		event.preventDefault();
		this.slider.updateDrag(pointerValue);
	};

	private onPointerEnd = (event: PointerEvent) => {
		if (!this.slider.dragState) return;

		this.releasePointer(event);
		this.slider.endDrag();
	};

	private onThumbKeyDown(event: KeyboardEvent, index: number) {
		if (this.options.isDisabled()) return;

		if (this.slider.applyThumbKey(index, event.key, event.shiftKey)) {
			event.preventDefault();
		}
	}

	private onThumbBlur = (event: FocusEvent) => {
		const relatedTarget = event.relatedTarget;
		if (relatedTarget instanceof Node && this.trackNode?.contains(relatedTarget)) return;
		this.options.onThumbBlur();
	};
}
