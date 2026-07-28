import type * as AutoScrollElement from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import type * as Combine from '@atlaskit/pragmatic-drag-and-drop/combine';
import type * as ElementAdapter from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type * as DisableNativeDragPreview from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview';
import type * as PointerOutsideOfPreview from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import type * as SetCustomNativeDragPreview from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import type * as PreventUnhandled from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import type * as Reorder from '@atlaskit/pragmatic-drag-and-drop/reorder';

// The installed Atlaskit packages publish typed directory entry points that Node ESM cannot
// load after SSR externalization. Their explicit CommonJS files are runtime-safe but omit
// adjacent declarations, so this boundary reconnects each verified runtime to its public type.
// @ts-expect-error See compatibility boundary above.
import * as autoScrollRuntime from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/cjs/entry-point/element.js';
// @ts-expect-error See compatibility boundary above.
import * as combineRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/combine.js';
// @ts-expect-error See compatibility boundary above.
import * as elementAdapterRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/element/adapter.js';
// @ts-expect-error See compatibility boundary above.
import * as disableNativeDragPreviewRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/element/disable-native-drag-preview.js';
// @ts-expect-error See compatibility boundary above.
import * as pointerOutsideOfPreviewRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/element/pointer-outside-of-preview.js';
// @ts-expect-error See compatibility boundary above.
import * as setCustomNativeDragPreviewRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/element/set-custom-native-drag-preview.js';
// @ts-expect-error See compatibility boundary above.
import * as preventUnhandledRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/prevent-unhandled.js';
// @ts-expect-error See compatibility boundary above.
import * as reorderRuntime from '@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/reorder.js';

const autoScroll = autoScrollRuntime as typeof AutoScrollElement;
const combineEntry = combineRuntime as typeof Combine;
const elementAdapter = elementAdapterRuntime as typeof ElementAdapter;
const disableNativeDragPreviewEntry =
	disableNativeDragPreviewRuntime as typeof DisableNativeDragPreview;
const pointerOutsideOfPreviewEntry =
	pointerOutsideOfPreviewRuntime as typeof PointerOutsideOfPreview;
const setCustomNativeDragPreviewEntry =
	setCustomNativeDragPreviewRuntime as typeof SetCustomNativeDragPreview;
const preventUnhandledEntry = preventUnhandledRuntime as typeof PreventUnhandled;
const reorderEntry = reorderRuntime as typeof Reorder;
const { preventUnhandled } = preventUnhandledEntry;

export const { autoScrollForElements, autoScrollWindowForElements } = autoScroll;
export const { combine } = combineEntry;
export const draggable: typeof elementAdapter.draggable = (args) =>
	elementAdapter.draggable({
		...args,
		onDragStart(payload) {
			// Keep every library-owned drag on the managed drop path instead of native snap-back.
			preventUnhandled.start();
			args.onDragStart?.(payload);
		},
		onDrop(payload) {
			preventUnhandled.stop();
			args.onDrop?.(payload);
		}
	});
export const { dropTargetForElements, monitorForElements } = elementAdapter;
export const { disableNativeDragPreview } = disableNativeDragPreviewEntry;
export const { pointerOutsideOfPreview } = pointerOutsideOfPreviewEntry;
export const { setCustomNativeDragPreview } = setCustomNativeDragPreviewEntry;
export const { reorder } = reorderEntry;

export type { ElementEventPayloadMap } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
