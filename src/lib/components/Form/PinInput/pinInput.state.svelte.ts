import { onMount } from 'svelte';

export const PIN_INPUT_DIGITS_PATTERN = '^\\d+$';
export const PIN_INPUT_CHARS_PATTERN = '^[a-zA-Z]+$';
export const PIN_INPUT_ALPHANUMERIC_PATTERN = '^[a-zA-Z0-9]+$';

const KEYS_TO_IGNORE = new Set([
	'Backspace',
	'Delete',
	'ArrowLeft',
	'ArrowRight',
	'ArrowUp',
	'ArrowDown',
	'Home',
	'End',
	'Escape',
	'Enter',
	'Tab',
	'Shift',
	'Control',
	'Meta',
	'Alt'
]);

export type PinInputPattern = string | RegExp;

export type PinInputCell = {
	index: number;
	char: string | null;
	isActive: boolean;
	hasFakeCaret: boolean;
};

type PinInputStateOptions = {
	value: () => string | null | undefined;
	setValue: (value: string) => void;
	setFocused: (focused: boolean) => void;
	length: () => number;
	pattern: () => PinInputPattern | undefined;
	pasteTransformer: () => ((text: string) => string) | undefined;
	onComplete: () => ((value: string) => void) | undefined;
	disabled: () => boolean | undefined;
};

type SelectionDirection = 'forward' | 'backward' | 'none';
type PreviousSelection = [number | null, number | null, SelectionDirection];
type NormalizedSelection = [number, number, SelectionDirection];

export class PinInputState {
	input = $state<HTMLInputElement | null>(null);
	isFocused = $state(false);
	selectionStart = $state<number | null>(null);
	selectionEnd = $state<number | null>(null);
	#previousValue: string;
	#previousSelection: PreviousSelection = [null, null, 'none'];

	constructor(private options: PinInputStateOptions) {
		this.#previousValue = this.value.slice(0, this.length);

		onMount(() => {
			this.syncInputValue(this.value.slice(0, this.length));
			this.normalizeSelection();

			const document = this.input?.ownerDocument;
			if (!document) return;

			document.addEventListener('selectionchange', this.normalizeSelection, { capture: true });
			return () => {
				document.removeEventListener('selectionchange', this.normalizeSelection, { capture: true });
			};
		});

		$effect(() => {
			const value = this.value;
			const clippedValue = value.slice(0, this.length);
			if (value !== clippedValue) {
				this.options.setValue(clippedValue);
			}
			this.syncInputValue(clippedValue);
			this.notifyComplete(clippedValue);
		});
	}

	get value() {
		return this.options.value() ?? '';
	}

	get length() {
		const length = this.options.length();
		if (!Number.isFinite(length)) return 6;
		return Math.max(1, Math.floor(length));
	}

	get cells() {
		const value = this.value;
		const selectionStart = this.selectionStart ?? Math.min(value.length, this.length - 1);
		const selectionEnd = this.selectionEnd ?? selectionStart;
		const lowerSelection = Math.min(selectionStart, selectionEnd);
		const upperSelection = Math.max(selectionStart, selectionEnd);
		const cursorIndex = Math.min(lowerSelection, this.length - 1);
		const hasRange = upperSelection > lowerSelection;

		return Array.from({ length: this.length }, (_, index) => {
			const char = value[index] ?? null;
			const isActive =
				this.isFocused &&
				(hasRange ? index >= lowerSelection && index < upperSelection : index === cursorIndex);

			return {
				index,
				char,
				isActive,
				hasFakeCaret: isActive && char === null
			} satisfies PinInputCell;
		});
	}

	focus = () => {
		if (this.options.disabled()) return;
		this.input?.focus();
	};

	handlePointerDown = (event: PointerEvent) => {
		if (this.options.disabled()) return;

		event.preventDefault();
		this.input?.focus({ preventScroll: true });
		this.selectCellFromPointer(event);
	};

	handleKeydown = (event: KeyboardEvent) => {
		if (event.isComposing || event.ctrlKey || event.metaKey || KEYS_TO_IGNORE.has(event.key)) {
			return;
		}

		if (event.key.length === 1 && !this.isValueAllowed(event.key)) {
			event.preventDefault();
		}
	};

	handleInput = (event: Event) => {
		const input = event.currentTarget;
		if (!(input instanceof HTMLInputElement)) return;

		const nextValue = input.value.slice(0, this.length);
		if (!this.isValueAllowed(nextValue)) {
			input.value = this.value;
			this.normalizeSelection();
			return;
		}

		this.commitValue(nextValue, input.selectionStart ?? nextValue.length);
		this.normalizeSelection();
	};

	handlePaste = (event: ClipboardEvent) => {
		const input = this.input;
		if (!input) return;

		event.preventDefault();
		const rawText = event.clipboardData?.getData('text/plain') ?? '';
		const transformer = this.options.pasteTransformer();
		const pastedText = transformer ? transformer(rawText) : rawText;
		const selectionStart = input.selectionStart ?? this.value.length;
		const selectionEnd = input.selectionEnd ?? selectionStart;
		const nextValue = (
			this.value.slice(0, selectionStart) +
			pastedText +
			this.value.slice(selectionEnd)
		).slice(0, this.length);

		if (!this.isValueAllowed(nextValue)) return;

		const selectionEndAfterPaste = nextValue.length;
		const selectionStartAfterPaste =
			nextValue.length === this.length
				? Math.max(selectionEndAfterPaste - 1, 0)
				: selectionEndAfterPaste;
		this.commitValue(nextValue, selectionStartAfterPaste, selectionEndAfterPaste);
	};

	handleFocus = () => {
		this.isFocused = true;
		this.options.setFocused(true);

		const selectionEnd = this.value.length;
		const selectionStart = Math.min(selectionEnd, this.length - 1);
		this.setSelectionRange(selectionStart, selectionEnd);
	};

	handleBlur = () => {
		this.isFocused = false;
		this.options.setFocused(false);
		this.selectionStart = null;
		this.selectionEnd = null;
	};

	normalizeSelection = () => {
		const input = this.input;
		if (!input) return;

		if (input.ownerDocument.activeElement !== input) {
			this.selectionStart = null;
			this.selectionEnd = null;
			return;
		}

		const nativeStart = this.clampSelection(input.selectionStart ?? this.value.length);
		const nativeEnd = this.clampSelection(input.selectionEnd ?? nativeStart);
		const nativeDirection = input.selectionDirection ?? 'none';
		const previousSelection = this.#previousSelection;
		let selectionStart = nativeStart;
		let selectionEnd = nativeEnd;
		let selectionDirection = nativeDirection;

		if (this.value.length > 0 && nativeStart === nativeEnd) {
			const isInsertMode = nativeStart === this.value.length && this.value.length < this.length;
			if (!isInsertMode) {
				const normalizedSelection = this.getNormalizedSelectionRange(
					nativeStart,
					previousSelection
				);
				if (normalizedSelection) {
					[selectionStart, selectionEnd, selectionDirection] = normalizedSelection;
					this.applyNativeSelection(selectionStart, selectionEnd, selectionDirection);
				}
			}
		}

		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.#previousSelection = [selectionStart, selectionEnd, selectionDirection];
	};

	private commitValue(nextValue: string, selectionStart: number, selectionEnd = selectionStart) {
		this.options.setValue(nextValue);
		if (this.input && this.input.value !== nextValue) {
			this.input.value = nextValue;
		}
		this.setSelectionRange(selectionStart, selectionEnd);
	}

	private setSelectionRange(start: number, end: number, direction: SelectionDirection = 'none') {
		const selectionStart = this.clampSelection(start);
		const selectionEnd = this.clampSelection(end);
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
		this.#previousSelection = [selectionStart, selectionEnd, direction];
		this.applyNativeSelection(selectionStart, selectionEnd, direction);
	}

	private applyNativeSelection(start: number, end: number, direction: SelectionDirection) {
		if (!this.input) return;
		try {
			this.input.setSelectionRange(start, end, direction);
		} catch {
			// Some input modes can reject selection ranges. The mirrored cell state above is enough.
		}
	}

	private getNormalizedSelectionRange(
		caretIndex: number,
		previousSelection: PreviousSelection
	): NormalizedSelection | null {
		if (caretIndex === 0) return [0, 1, 'forward'];
		if (caretIndex === this.length) return [caretIndex - 1, caretIndex, 'backward'];
		if (this.length <= 1 || this.value.length <= 1) return null;

		let offset = 0;
		let direction: SelectionDirection = 'forward';
		const [previousStart, previousEnd] = previousSelection;
		if (previousStart !== null && previousEnd !== null) {
			direction = caretIndex < previousEnd ? 'backward' : 'forward';
			const wasPreviouslyInserting = previousStart === previousEnd && previousStart < this.length;
			if (direction === 'backward' && !wasPreviouslyInserting) {
				offset = -1;
			}
		}

		const start = this.clampSelection(caretIndex + offset);
		return [start, this.clampSelection(start + 1), direction];
	}

	private selectCellFromPointer(event: PointerEvent) {
		const cellIndex = this.getPointerCellIndex(event);
		if (cellIndex === null) {
			const selectionIndex = Math.min(this.value.length, this.length);
			this.setSelectionRange(selectionIndex, selectionIndex);
			return;
		}

		const selectionIndex = Math.min(Math.max(cellIndex, 0), this.length - 1);
		const shouldInsertAtEnd =
			selectionIndex >= this.value.length && this.value.length < this.length;
		if (shouldInsertAtEnd) {
			this.setSelectionRange(this.value.length, this.value.length);
			return;
		}

		const start = Math.min(selectionIndex, Math.max(this.value.length - 1, 0));
		this.setSelectionRange(start, start + 1);
	}

	private getPointerCellIndex(event: PointerEvent) {
		const root = this.input?.parentElement;
		if (!root) return null;

		const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-slot="pin-input-cell"]'));
		if (cells.length === 0) return null;

		const directCellIndex = cells.findIndex((cell) => {
			const rect = cell.getBoundingClientRect();
			return event.clientX >= rect.left && event.clientX <= rect.right;
		});
		if (directCellIndex !== -1) return directCellIndex;

		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;
		for (const [index, cell] of cells.entries()) {
			const rect = cell.getBoundingClientRect();
			const center = rect.left + rect.width / 2;
			const distance = Math.abs(event.clientX - center);
			if (distance < closestDistance) {
				closestIndex = index;
				closestDistance = distance;
			}
		}

		return closestIndex;
	}

	private syncInputValue(value: string) {
		if (!this.input || this.input.value === value) return;
		this.input.value = value;
		if (this.isFocused) {
			queueMicrotask(this.normalizeSelection);
		}
	}

	private notifyComplete(value: string) {
		const previousValue = this.#previousValue;
		if (
			previousValue !== value &&
			previousValue.length < this.length &&
			value.length === this.length
		) {
			this.options.onComplete()?.(value);
		}
		this.#previousValue = value;
	}

	private clampSelection(index: number) {
		return Math.min(Math.max(index, 0), this.length);
	}

	private isValueAllowed(value: string) {
		if (!value) return true;
		const pattern = this.options.pattern();
		if (!pattern) return true;
		const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
		regex.lastIndex = 0;
		return regex.test(value);
	}
}
