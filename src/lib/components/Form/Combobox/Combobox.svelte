<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { ComboboxProps, ComboboxOption } from './combobox.props.js';
	import Popover from '../../Popover/Popover.svelte';
	import ScrollArea from '../../ScrollArea/ScrollArea.svelte';
	import { xIcon } from '../../Icons/x.js';
	import { magnifyingGlassIcon } from '../../Icons/magnifyingGlass.js';
	import { useDebounce } from '$lib/utils/useDebounce.svelte.js';
	import type { PopoverState } from '../../Popover/popover.state.svelte.js';
	import { useComboboxTheme } from './combobox.theme.js';
	import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
	import { onMount, untrack } from 'svelte';
	import Button from '$lib/components/Button/Button.svelte';

	let {
		value = $bindable(null),
		searchValue = $bindable(''),
		errors = $bindable([]),
		loading = $bindable(false),
		focused = $bindable(false),
		required = false,
		size = 'normal',
		placeholder = '',
		options,
		showAllOnFocus = false,
		getValueOption,
		loadingText = 'Loading...',
		noOptionsText = 'No options found',
		theme,
		disabled,
		name,
		onValidate,
		onChange,
		readonly,
		visible,
		prefix,
		suffix,
		description,
		...rest
	}: ComboboxProps = $props();

	const id = $props.id();
	const listboxId = `${id}-listbox`;
	let highlightedIndex = $state(-1);
	let currentOption = $state<ComboboxOption | null>(
		typeof options === 'function' ? null : options.find((opt) => opt.value === value) || null
	);

	const field = createFieldState({
		id,
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get errors() {
			return errors;
		},
		set errors(v: any) {
			errors = v;
		},
		get focused() {
			return focused;
		},
		set focused(v: boolean) {
			focused = v;
		},
		onChange: (v) => {
			onChange?.(v, currentOption);
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		required,
		name,
		onValidate,
		readonly,
		visible,
		type: 'combobox'
	});

	// Load options state

	// Keyboard navigation state

	const getOptions = async (searchValue?: string | null, showAllOnFocus?: boolean) => {
		const isOptionsAsync = typeof options === 'function';
		if (!searchValue) {
			if (!showAllOnFocus || isOptionsAsync) {
				return { options: [] as ComboboxOption[], error: null };
			} else {
				return { options, error: null };
			}
		} else {
			if (isOptionsAsync) {
				loading = true;
				try {
					const results = await options(searchValue);
					return { options: results, error: null };
				} catch (error) {
					return {
						options: [] as ComboboxOption[],
						error: error instanceof Error ? error.message : 'Failed to load options'
					};
				} finally {
					loading = false;
				}
			} else {
				const result = options.filter((option) =>
					option.label.toLowerCase().includes(searchValue.toLowerCase())
				);

				return { options: result, error: null };
			}
		}
	};
	let optionsAsync = $state<{ options: ComboboxOption[]; error: string | null }>({
		options: [],
		error: null
	});

	const debouncedSearch = useDebounce((searchValue?: string | null, showAllOnFocus?: boolean) => {
		getOptions(searchValue, showAllOnFocus).then((result) => {
			optionsAsync = result;
		});
	}, 100);

	$effect(() => {
		searchValue;
		showAllOnFocus;
		untrack(() => {
			debouncedSearch(searchValue, showAllOnFocus);
		});
	});

	const isOpen = $derived.by(() => {
		// Should show if
		// has error or  has options or has no options and a search value
		// is focused
		return !!(
			field.focused &&
			(optionsAsync.error ||
				optionsAsync.options.length > 0 ||
				(optionsAsync.options.length === 0 && searchValue))
		);
	});

	// Handle option selection
	const handleSelectOption = (option: ComboboxOption) => {
		field.value = option.value;
		searchValue = '';
		highlightedIndex = -1;
		resetHighlightedIndex();
		field.node?.blur();
		currentOption = option;
		// Focus the input after selection
	};

	// Handle clear
	const handleClear = () => {
		field.value = null;
		searchValue = '';
		highlightedIndex = -1;
		field.node?.blur();
		currentOption = null;
	};

	// Handle popover state changes
	const resetHighlightedIndex = () => {
		highlightedIndex = -1;
	};

	$effect(() => {
		optionsAsync.options.length;
		optionsAsync.error;
		untrack(() => {
			resetHighlightedIndex();
		});
	});
	// Use useKeyDown hook for keyboard navigation
	useKeyDown({
		get isActive() {
			return field.focused;
		},
		keys: ['Escape'],
		callback: (event: KeyboardEvent) => {
			field.node?.blur();
		},
		onWindow: true
	});
	const keyDownHook = useKeyDown({
		get isActive() {
			return isOpen || field.focused;
		},
		keys: ['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Home', 'End'],
		callback: (event: KeyboardEvent) => {
			const filteredOptions = optionsAsync.options;
			if (!isOpen || filteredOptions.length === 0) {
				if (event.key === 'ArrowDown' || event.key === 'Enter') {
					if (searchValue) {
						field.focused = true;
					}
				}
				return;
			}

			switch (event.key) {
				case 'ArrowDown': {
					// Wrap around: if at bottom, go to top
					const newIndex =
						highlightedIndex >= filteredOptions.length - 1 ? 0 : highlightedIndex + 1;
					highlightedIndex = newIndex;
					// Scroll highlighted option into view
					const optionElement = document.getElementById(`${id}-option-${newIndex}`);
					if (optionElement) {
						optionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
					}
					break;
				}
				case 'ArrowUp': {
					// Wrap around: if at top (-1 or 0), go to bottom
					const newIndex =
						highlightedIndex <= 0 ? filteredOptions.length - 1 : highlightedIndex - 1;
					highlightedIndex = newIndex;
					// Scroll highlighted option into view
					const optionElement = document.getElementById(`${id}-option-${newIndex}`);
					if (optionElement) {
						optionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
					}
					break;
				}
				case 'Enter':
					if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
						handleSelectOption(filteredOptions[highlightedIndex]);
					}
					break;
				case 'Escape':
					field.focused = false;
					highlightedIndex = -1;
					resetHighlightedIndex();

					break;
				case 'Home': {
					highlightedIndex = 0;
					// Scroll to first option
					const optionElement = document.getElementById(`${id}-option-0`);
					if (optionElement) {
						optionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
					}
					break;
				}
				case 'End': {
					const newIndex = filteredOptions.length - 1;
					highlightedIndex = newIndex;
					// Scroll to last option
					const optionElement = document.getElementById(`${id}-option-${newIndex}`);
					if (optionElement) {
						optionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
					}
					break;
				}
			}
		},
		onWindow: false // Only attach to input element, not window
	});

	onMount(async () => {
		if (field.value) {
			if (typeof options === 'function') {
				currentOption = (await getValueOption?.(field.value)) || null;
			}
		}
	});

	const activeDescendantId = $derived(`${id}-option-${highlightedIndex}`);

	// Determine if we should show clear button
	const showClear = $derived(searchValue || field.value);

	// Default prefix: magnifying glass icon (unless prefix is false or custom snippet provided)
	const effectivePrefix = $derived(prefix === false ? undefined : (prefix ?? magnifyingGlassIcon));

	const classes = $derived(useComboboxTheme(theme));

	// Map size to theme size variant (normal -> medium)
	const themeSize = $derived(size === 'normal' ? 'medium' : size);
</script>

<Popover closeOnClickOutside={false} fitTrigger position="bottom" size="small" offset={20} {isOpen}>
	{#snippet children(popover)}
		<div
			id={listboxId}
			role="listbox"
			aria-label="Options"
			class="flex max-h-[200px] flex-col gap-1"
		>
			{#if loading}
				<div class={classes.loading({ size: themeSize })} role="status" aria-live="polite">
					{loadingText}
				</div>
			{:else if optionsAsync.error}
				<div class={classes.error({ size: themeSize })} role="alert" aria-live="assertive">
					{optionsAsync.error}
				</div>
			{:else if optionsAsync.options.length === 0 && searchValue}
				<div class={classes.noOptions({ size: themeSize })} role="status">{noOptionsText}</div>
			{:else if optionsAsync.options.length === 0 && !searchValue && showAllOnFocus}
				<div class={classes.noOptions({ size: themeSize })} role="status">{noOptionsText}</div>
			{:else if optionsAsync.options.length > 0}
				<ScrollArea scrollOnEdges type="auto" class="flex max-h-[200px] flex-col gap-1">
					{#each optionsAsync.options as option, index}
						<button
							id={`${id}-option-${index}`}
							role="option"
							aria-selected={field.value === option.value}
							class={classes.option({
								highlighted: highlightedIndex === index,
								selected: field.value === option.value
							})}
							onmousedown={(e) => {
								e.stopPropagation();
								e.preventDefault();
							}}
							onclick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								handleSelectOption(option);
							}}
						>
							<span class={classes.optionLabel({ size: themeSize })}>{option.label}</span>
							{#if option.description}
								<span class={classes.optionDescription({ size: themeSize })}
									>{option.description}</span
								>
							{/if}
						</button>
					{/each}
				</ScrollArea>
			{/if}
		</div>
	{/snippet}
	{#snippet trigger(popover: PopoverState)}
		{#snippet clearButtonSuffix()}
			<Button
				variant="ghost"
				size="small"
				color="danger"
				onClick={handleClear}
				label="Clear selection"
				squared
				class="flex h-[1.3lh] max-h-[1.3lh] items-center justify-center"
			>
				{@render xIcon({ size: 20 })}
			</Button>
		{/snippet}

		<Field
			{field}
			{description}
			prefix={effectivePrefix}
			prefixProps={{
				size: 20
			}}
			suffix={suffix || (showClear ? clearButtonSuffix : undefined)}
			theme={{
				...(theme || {}),
				inputContainer: {
					...(theme?.inputContainer || {}),
					base: classes.inputContainer({ class: theme?.inputContainer?.base, size: themeSize })
				}
			}}
			{...rest}
			{@attach popover.reference}
		>
			<input
				data-1p-ignore
				type="text"
				{id}
				name={field.name}
				bind:value={searchValue}
				placeholder={currentOption ? currentOption.label : placeholder}
				bind:this={field.node}
				bind:focused={field.focused}
				{readonly}
				{disabled}
				role="combobox"
				aria-expanded={isOpen}
				aria-controls={isOpen ? listboxId : undefined}
				aria-autocomplete="list"
				aria-activedescendant={isOpen && highlightedIndex >= 0 ? activeDescendantId : undefined}
				aria-haspopup="listbox"
				aria-invalid={!!optionsAsync.error}
				autocomplete="off"
				class={classes.input({ size: themeSize, hasValue: field.value !== null })}
				class:placeholder:text-contrast={currentOption && !searchValue}
				{@attach keyDownHook.reference}
			/>
		</Field>
	{/snippet}
</Popover>
