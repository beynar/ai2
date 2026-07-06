<script lang="ts">
	import Popover from '../../Popover/Popover.svelte';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import intlTelInput from 'intl-tel-input';
	import PhoneInputCountryPicker from './PhoneInputCountryPicker.svelte';
	import PhoneInputCountryTrigger from './PhoneInputCountryTrigger.svelte';
	import type { PhoneInputProps } from './phoneInput.props.js';
	import { usePhoneInputTheme } from './phoneInput.theme.js';
	import {
		createPhoneCountryOptions,
		getPhoneCountryOption,
		type PhoneCountryOption
	} from './phoneInputCountry.js';
	import { untrack } from 'svelte';
	import { on } from 'svelte/events';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		country = $bindable('fr'),
		iti = $bindable<ReturnType<typeof intlTelInput> | undefined>(),
		required = false,
		strict = true,
		separator,
		searchPlaceholder = 'Search',
		placeholder = 'Phone number',
		theme,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		...rest
	}: PhoneInputProps = $props();

	const id = $props.id();
	const countryPickerId = `${id}-country-picker`;
	let countryPickerOpen = $state(false);
	let phoneInputNode = $state<HTMLInputElement | null>(null);
	const countryOptions = createPhoneCountryOptions(intlTelInput.getAllCountries());

	const getValue = () => {
		if (!iti || !intlTelInput.utils) {
			return (phoneInputNode?.value ?? '').replaceAll(' ', '');
		}

		const phoneValue = iti?.getNumber() || '';
		return phoneValue.replaceAll(' ', '');
	};

	const selectedCountry = $derived(
		getPhoneCountryOption(countryOptions, country) ?? getPhoneCountryOption(countryOptions, 'fr')
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
			onChange?.(v);
		},
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
		onValidate: (value) => {
			const customErrors = onValidate?.(value);
			const isValid = country && intlTelInput.utils && iti?.isValidNumber();
			return customErrors || (isValid ? [] : ['Invalid phone number']);
		},
		get visible() {
			return visible;
		},
		type: 'phone'
	});

	const classes = $derived(usePhoneInputTheme(theme));

	const syncSelectedCountry = () => {
		const selectedIso2 = iti?.getSelectedCountry()?.iso2;

		if (selectedIso2) {
			country = selectedIso2;
		}

		field.value = getValue();
	};

	const selectCountry = (selectedCountry: PhoneCountryOption) => {
		country = selectedCountry.iso2;
		iti?.setSelectedCountry(selectedCountry.iso2);
		field.value = getValue();
		countryPickerOpen = false;
		field.node?.focus();
	};

	const focusInputOnFieldClick = (node: HTMLElement) =>
		on(node, 'click', (event) => {
			const target = event.target;
			if (target instanceof Element && target.closest('button')) return;
			node.querySelector('input')?.focus();
		});

	const usePhoneInput = (node: HTMLInputElement) => {
		return untrack(() => {
			phoneInputNode = node;

			if (value) {
				node.value = value;
			}
			const instance = intlTelInput(node, {
				strictMode: strict,
				initialCountry: selectedCountry?.iso2 ?? '',
				allowPhonewords: false,
				formatAsYouType: true,
				separateDialCode: false,
				showFlags: false,
				countrySelectorMode: 'OFF',
				containerClass: 'min-w-0 w-full flex-1',
				loadUtils: () => import('intl-tel-input/utils')
			});
			iti = instance;

			syncSelectedCountry();
			instance.promise.then(() => {
				if (iti === instance) {
					field.value = getValue();
				}
			});

			const offCountryChange = on(node, 'countrychange', syncSelectedCountry);

			return () => {
				offCountryChange();
				instance.destroy();
				if (phoneInputNode === node) {
					phoneInputNode = null;
				}
				if (iti === instance) {
					iti = undefined;
				}
			};
		});
	};

	$effect(() => {
		const nextCountry = getPhoneCountryOption(countryOptions, country);
		const activeCountry = iti?.getSelectedCountry()?.iso2;

		if (iti && nextCountry && activeCountry !== nextCountry.iso2) {
			iti.setSelectedCountry(nextCountry.iso2);
		}
	});
</script>

<Popover
	id={`${id}-country-popover`}
	bind:open={countryPickerOpen}
	position="bottom-start"
	size="normal"
	class={classes.popover({ class: theme?.popover?.base })}
>
	{#snippet children()}
		<PhoneInputCountryPicker
			id={countryPickerId}
			countries={countryOptions}
			{selectedCountry}
			{searchPlaceholder}
			size={rest.size}
			{theme}
			onSelectCountry={selectCountry}
		/>
	{/snippet}
	{#snippet trigger(popover)}
		<Field
			{field}
			size={rest.size}
			theme={{
				...(theme || {}),
				inputContainer: {
					...(theme?.inputContainer || {}),
					base: classes.inputContainer({
						class: theme?.inputContainer?.base,
						disabled: field.disabled,
						size: rest.size
					})
				}
			}}
			{...rest}
			{@attach popover.reference}
			{@attach focusInputOnFieldClick}
		>
			<PhoneInputCountryTrigger
				country={selectedCountry}
				open={countryPickerOpen}
				disabled={field.disabled}
				controls={countryPickerId}
				size={rest.size}
				{theme}
				onToggle={popover.toggle}
			/>
			<input
				data-1p-ignore
				{@attach usePhoneInput}
				oninput={() => {
					field.value = getValue();
				}}
				type="tel"
				{id}
				name={field.name}
				bind:this={field.node}
				{placeholder}
				class={classes.input({ disabled: field.disabled, size: rest.size })}
				disabled={field.disabled}
			/>
		</Field>
	{/snippet}
</Popover>
