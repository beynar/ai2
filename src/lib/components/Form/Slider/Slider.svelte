<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import SliderTrack from './SliderTrack.svelte';
	import SliderValueLabels from './SliderValueLabels.svelte';
	import type { SliderProps } from './slider.props.js';
	import { SliderState } from './slider.state.svelte.js';
	import { useSliderTheme } from './slider.theme.js';

	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(min),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		visible,
		onChange,
		color = 'primary',
		marks = [],
		showValue = false,
		formatValue,
		valueLabel,
		rangeLabel,
		mode = 'single',
		variant = 'default',
		thumbs,
		orientation = 'horizontal',
		minStepsBetweenThumbs = 0,
		dragRange = false,
		thumbLabels = [],
		type: _formType,
		...rest
	}: SliderProps & { type?: string } = $props();

	void _formType;

	const id = $props.id();

	const slider = new SliderState({
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get step() {
			return step;
		},
		get thumbs() {
			return thumbs ?? (mode === 'range' ? 2 : undefined);
		},
		get minStepsBetweenThumbs() {
			return minStepsBetweenThumbs;
		},
		get orientation() {
			return orientation;
		},
		get disabled() {
			return disabled;
		},
		get dragRange() {
			return dragRange;
		},
		get focused() {
			return focused;
		},
		set focused(v) {
			focused = v;
		},
		get formatValue() {
			return formatValue;
		}
	});

	const field = createFieldState<'slider' | 'slider-range'>({
		id,
		get value() {
			return slider.fieldValue;
		},
		set value(v) {
			value = v;
		},
		get errors() {
			return errors;
		},
		set errors(v: string[] | boolean) {
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
		onValidate: (val) => slider.validate(val, onValidate),
		get visible() {
			return visible;
		},
		get type() {
			return slider.fieldType;
		}
	});

	const classes = $derived(useSliderTheme(theme));
	const groupLabel = $derived(
		typeof rest.label === 'string' || typeof rest.label === 'number' ? `${rest.label}` : undefined
	);

	const getThumbLabel = (index: number) => {
		if (thumbLabels[index]) return thumbLabels[index];
		if (!slider.isRange) return undefined;
		if (groupLabel) {
			return index === 0
				? `${groupLabel} minimum`
				: index === slider.values.length - 1
					? `${groupLabel} maximum`
					: `${groupLabel} value ${index + 1}`;
		}
		return index === 0
			? 'Minimum value'
			: index === slider.values.length - 1
				? 'Maximum value'
				: `Value ${index + 1}`;
	};
</script>

<Field
	{field}
	size={rest.size}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({
				class: theme?.inputContainer?.base,
				disabled: slider.disabled,
				size: rest.size
			})
		}
	}}
	{...rest}
>
	<div class={classes.root({ orientation: slider.orientationValue, size: rest.size })}>
		{#each slider.values as hiddenValue, index (index)}
			<input type="hidden" name={field.name} value={hiddenValue} disabled={slider.disabled} />
		{/each}

		<div class={classes.control({ orientation: slider.orientationValue })}>
			<SliderTrack
				{id}
				{slider}
				{classes}
				{color}
				{variant}
				size={rest.size}
				{marks}
				{groupLabel}
				{getThumbLabel}
			/>

			{#if showValue || valueLabel || rangeLabel}
				<SliderValueLabels {slider} {classes} size={rest.size} {valueLabel} {rangeLabel} />
			{/if}
		</div>
	</div>
</Field>
