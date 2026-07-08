<script lang="ts">
	import { starIcon, starIconFill } from '../../Icons/star.js';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import { useI18n } from '$lib/i18n/context.svelte.js';
	import type { RatingInputProps } from './ratingInput.props.js';
	import { useRatingInputTheme } from './ratingInput.theme.js';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		max = 5,
		allowHalf = false,
		readonly = false,
		clearable = true,
		dir,
		color = 'warning',
		i18n,
		label,
		...rest
	}: RatingInputProps = $props();

	const id = $props.id();

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
		onChange: (v) => onChange?.(v),
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		get required() {
			return required;
		},
		get name() {
			return name;
		},
		set name(v: string | undefined) {
			name = v;
		},
		get onValidate() {
			return onValidate;
		},
		get visible() {
			return visible;
		},
		type: 'rating'
	});

	const t = $derived(useI18n(i18n));
	const classes = $derived(useRatingInputTheme(theme));

	// The visible <label for={field.id}> associates with the slider (via id={id}) for focus, but a
	// role="slider" div is not a labelable element, so <label for> does not name it. Adopt the visible
	// label text as the accessible name when it is a plain string; otherwise fall back to t.rating.
	const ariaLabel = $derived(typeof label === 'string' ? label : t.rating);

	// Fixed star-box size (mirrors the `star` theme part). The clipped fill icon must keep this
	// full width so the overflow-hidden clip reveals a fraction of a full-size star, not a shrunk one.
	const boxSizeClass = $derived.by(() => {
		if (rest.size === 'small') return 'size-5';
		if (rest.size === 'large') return 'size-7';
		return 'size-6';
	});

	// While hovering, preview the hovered value; otherwise show the committed value.
	let previewValue = $state<number | null>(null);
	const displayValue = $derived(previewValue ?? field.value ?? 0);
	const step = $derived(allowHalf ? 0.5 : 1);
	const interactive = $derived(!readonly && !field.disabled);

	// Fraction of star `i` (1-based) that should be filled: 0 empty, 0.5 half, 1 full.
	const fillFraction = (i: number) => Math.min(Math.max(displayValue - (i - 1), 0), 1);

	// Resolve the effective reading direction: explicit prop, else the ambient direction.
	const isRtl = () => {
		if (dir) return dir === 'rtl';
		if (typeof window === 'undefined' || !field.node) return false;
		return getComputedStyle(field.node).direction === 'rtl';
	};

	// Compute the value a pointer event over `starIndex` (1-based) points at, honouring
	// half steps and the effective reading direction.
	const valueFromPointer = (event: MouseEvent, starIndex: number, element: HTMLElement) => {
		if (!allowHalf) return starIndex;
		const rect = element.getBoundingClientRect();
		const ratio = (event.clientX - rect.left) / rect.width;
		const leadingHalf = isRtl() ? ratio > 0.5 : ratio < 0.5;
		return leadingHalf ? starIndex - 0.5 : starIndex;
	};

	const commit = (next: number | null) => {
		if (!interactive) return;
		field.value = next;
	};

	const clamp = (next: number) => Math.min(Math.max(next, 0), max);

	const handlePointerMove = (event: PointerEvent, starIndex: number, element: HTMLElement) => {
		if (!interactive) return;
		previewValue = valueFromPointer(event, starIndex, element);
	};

	const handlePointerLeave = () => {
		previewValue = null;
	};

	const handleClick = (event: MouseEvent, starIndex: number, element: HTMLElement) => {
		if (!interactive) return;
		const next = valueFromPointer(event, starIndex, element);
		// Clicking the exact current value clears it when clearable.
		if (clearable && field.value === next) {
			commit(null);
		} else {
			commit(next);
		}
	};

	// Value semantics never flip in RTL: ArrowRight/Up always increase the number.
	const handleKeydown = (event: KeyboardEvent) => {
		if (!interactive) return;
		const current = field.value ?? 0;
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				event.preventDefault();
				commit(clamp(current + step));
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				event.preventDefault();
				commit(clamp(current - step));
				break;
			case 'Home':
				event.preventDefault();
				commit(null);
				break;
			case 'End':
				event.preventDefault();
				commit(max);
				break;
		}
	};
</script>

<Field {field} size={rest.size} {theme} {label} {...rest}>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		{id}
		role="slider"
		tabindex={readonly || field.disabled ? -1 : 0}
		{dir}
		aria-label={ariaLabel}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={field.value ?? 0}
		aria-valuetext={`${field.value ?? 0} ${t.of} ${max}`}
		aria-orientation="horizontal"
		aria-readonly={readonly || undefined}
		aria-disabled={field.disabled || undefined}
		bind:this={field.node}
		bind:focused={field.focused}
		class={classes.container({ size: rest.size, disabled: field.disabled })}
		onkeydown={handleKeydown}
		onpointerleave={handlePointerLeave}
	>
		{#each Array.from({ length: max }, (_, index) => index + 1) as starIndex (starIndex)}
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events, a11y_no_noninteractive_tabindex -->
			<span
				aria-hidden="true"
				tabindex={-1}
				class={classes.star({ size: rest.size, interactive })}
				onpointermove={(event) => handlePointerMove(event, starIndex, event.currentTarget)}
				onclick={(event) => handleClick(event, starIndex, event.currentTarget)}
			>
				<span class={classes.starBase()}>
					{@render starIcon({ class: 'size-full' })}
				</span>
				<span
					class={classes.starFill({ color })}
					style="width: {fillFraction(starIndex) * 100}%; inset-inline-start: 0;"
				>
					<!-- Pinned to the leading edge at full star-box width so the clip reveals a
					     fraction of a full-size star; inset-inline-start flips with RTL for free. -->
					<span class="absolute top-0 {boxSizeClass}" style="inset-inline-start: 0;">
						{@render starIconFill({ class: 'size-full' })}
					</span>
				</span>
			</span>
		{/each}
	</div>
</Field>
