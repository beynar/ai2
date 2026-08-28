import type { CommandGroup } from '../Command/command.props.js';
import { untrack } from 'svelte';
import type { TriggerState } from './composer/trigger.js';
import type {
	RichTextInputSuggestionLifecycleCallback,
	RichTextInputSuggestionLifecycleState
} from './richTextInput.props.js';

export type RichTextInputSuggestionLifecycleOptions = {
	menu: TriggerState | null;
	requestId: number | null;
	isLoading: boolean;
	error: unknown | null;
	highlightedValue: string | null;
	groups: CommandGroup<string>[];
	onSuggestionOpen?: RichTextInputSuggestionLifecycleCallback;
	onSuggestionClose?: RichTextInputSuggestionLifecycleCallback;
	onSuggestionQueryChange?: RichTextInputSuggestionLifecycleCallback;
	onSuggestionHighlightChange?: RichTextInputSuggestionLifecycleCallback;
};

export type RichTextInputSuggestionLifecycleOptionsSource =
	() => RichTextInputSuggestionLifecycleOptions;

export class RichTextInputSuggestionLifecycle {
	private previousState: RichTextInputSuggestionLifecycleState | null = null;

	constructor(private optionsSource: RichTextInputSuggestionLifecycleOptionsSource) {
		$effect(() => this.emitLifecycleChange());
	}

	get state(): RichTextInputSuggestionLifecycleState | null {
		return this.createState(this.options.highlightedValue);
	}

	handleHighlightChange(value: string | undefined) {
		const state = this.createState(value ?? null);
		if (!state) return;
		this.options.onSuggestionHighlightChange?.(state);
	}

	private get options() {
		return this.optionsSource();
	}

	private emitLifecycleChange() {
		const nextState = this.state;
		const previousState = this.previousState;
		if (!previousState && nextState) {
			untrack(() => this.options.onSuggestionOpen?.(nextState));
		}
		if (previousState && nextState && previousState.trigger !== nextState.trigger) {
			untrack(() => {
				this.options.onSuggestionClose?.(previousState);
				this.options.onSuggestionOpen?.(nextState);
			});
		}
		if (
			nextState &&
			(!previousState ||
				previousState.trigger !== nextState.trigger ||
				previousState.query !== nextState.query)
		) {
			untrack(() => this.options.onSuggestionQueryChange?.(nextState));
		}
		if (previousState && !nextState) {
			untrack(() => this.options.onSuggestionClose?.(previousState));
		}
		this.previousState = nextState ? { ...nextState } : null;
	}

	private createState(
		highlightedValue: string | null
	): RichTextInputSuggestionLifecycleState | null {
		const { menu } = this.options;
		if (!menu) return null;
		return {
			trigger: menu.trigger,
			query: menu.query,
			requestId: this.options.requestId,
			isLoading: this.options.isLoading,
			error: this.options.error,
			highlightedValue,
			itemCount: this.options.groups.reduce((count, group) => count + group.items.length, 0)
		};
	}
}
