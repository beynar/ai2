<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { phoneInputTheme } from '$lib/components/Form/PhoneInput/phoneInput.js';
	export const setPhoneInputTheme = setComponentTheme<typeof phoneInputTheme>('phoneInput');
	export const usePhoneInputTheme = useComponentTheme('phoneInput', phoneInputTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import intlTelInput from 'intl-tel-input';
	import 'intl-tel-input/build/css/intlTelInput.css';
	import type { PhoneInputProps } from '$lib/components/Form/PhoneInput/phoneInput.js';
	import { untrack } from 'svelte';
	import fr from 'intl-tel-input/i18n/fr';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		country = $bindable('fr'),
		iti = $bindable<ReturnType<typeof intlTelInput>>(),
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
		readonly,
		visible,
		...rest
	}: PhoneInputProps = $props();

	const id = $props.id();

	const getValue = () => {
		const phoneValue = iti?.getNumber() || '';
		return phoneValue.replaceAll(' ', '');
	};

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
		required,
		name,
		onValidate: (value) => {
			const customErrors = onValidate?.(value);
			const isValid = country && iti?.isValidNumber();
			return customErrors || (isValid ? [] : ['Invalid phone number']);
		},
		readonly,
		visible,
		type: 'phone'
	});

	const classes = $derived(usePhoneInputTheme(theme));

	const usePhoneInput = (node: HTMLInputElement) => {
		untrack(() => {
			if (value) {
				node.value = value;
			}
			iti = intlTelInput(node, {
				strictMode: strict,
				initialCountry: country as any,

				formatOnDisplay: true,
				formatAsYouType: true,
				separateDialCode: true,
				allowDropdown: true,
				nationalMode: true,
				dropdownContainer: document.body,
				i18n: {
					...fr,
					searchPlaceholder,
					countryListAriaLabel: 'Liste des pays'
				},
				useFullscreenPopup: window.matchMedia('(max-width: 768px)').matches,
				loadUtils: () => import('intl-tel-input/utils')
			});

			node.addEventListener('countrychange', () => {
				field.value = getValue();
			});
		});
	};
</script>

{field.value}
<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({ class: theme?.inputContainer?.base })
		}
	}}
	{...rest}
>
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
		class={classes.input()}
	/>
</Field>

<style>
	:global {
		/* Webkit (Chrome, Safari, newer versions of Opera) */
		.scroller::-webkit-scrollbar {
			width: 4px;
		}

		.scroller::-webkit-scrollbar-track {
			background: transparent;
		}

		.scroller::-webkit-scrollbar-thumb {
			background-color: var(--color-surface-dark);
			border-radius: 2px;
		}

		/* For Internet Explorer */
		.scroller {
			padding-right: 0px !important;
			padding-left: 10px !important;
			-ms-scrollbar-track-color: transparent;
			-ms-scrollbar-face-color: var(--color-surface-dark);
			-ms-scrollbar-arrow-color: var(--color-surface-dark);
			scrollbar-width: thin;
			scrollbar-color: var(--color-surface-dark) transparent;
			scrollbar-gutter: stable;
		}

		.iti__search-input {
			border-top-left-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
			border-bottom-right-radius: 0px;
			border-bottom-left-radius: 0px;
			border-bottom-width: 1px;
			--tw-border-opacity: 1;
			border-color: var(--color-surface-muted);
			--tw-bg-opacity: 1;
			background-color: var(--color-surface-dark);
			padding: 0.25rem;
			font-size: 0.875rem;
			line-height: 1.25rem;
			outline: 2px solid transparent;
			outline-offset: 2px;
			padding-left: 2rem !important;
			--current-background: var(--color-surface-light);
			--current-border: var(--color-surface-muted);
		}
		.iti__dropdown-content {
			border: 1px solid
				var(--light-raised-border, var(--current-border, var(--color-surface-lighter))) !important;

			border: var(--light-raised-border);
			--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
			--tw-shadow-colored:
				0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
			box-shadow: var(--dark-raised-shadow);
			margin-top: 0.5rem !important;
			border-radius: 0.5rem;
			--tw-bg-opacity: 1;
			background-color: var(--color-surface-DEFAULT);
			scrollbar-width: thin;
			scrollbar-color: var(--scrollbar-thumb, initial) var(--scrollbar-track, initial);
			border-color: var(--color-surface-muted);
			--current-border: var(--color-surface-muted);
			background-color: var(--color-surface-dark);
			--current-background: var(--color-surface-dark);
		}

		.iti__dropdown-content::-webkit-scrollbar-track {
			background-color: var(--scrollbar-track);
			border-radius: var(--scrollbar-track-radius);
		}

		.iti__dropdown-content::-webkit-scrollbar-track:hover {
			background-color: var(--scrollbar-track-hover, var(--scrollbar-track));
		}

		.iti__dropdown-content::-webkit-scrollbar-track:active {
			background-color: var(
				--scrollbar-track-active,
				var(--scrollbar-track-hover, var(--scrollbar-track))
			);
		}

		.iti__dropdown-content::-webkit-scrollbar-thumb {
			background-color: var(--scrollbar-thumb);
			border-radius: var(--scrollbar-thumb-radius);
		}

		.iti__dropdown-content::-webkit-scrollbar-thumb:hover {
			background-color: var(--scrollbar-thumb-hover, var(--scrollbar-thumb));
		}

		.iti__dropdown-content::-webkit-scrollbar-thumb:active {
			background-color: var(
				--scrollbar-thumb-active,
				var(--scrollbar-thumb-hover, var(--scrollbar-thumb))
			);
		}

		.iti__dropdown-content::-webkit-scrollbar-corner {
			background-color: var(--scrollbar-corner);
			border-radius: var(--scrollbar-corner-radius);
		}

		.iti__dropdown-content::-webkit-scrollbar-corner:hover {
			background-color: var(--scrollbar-corner-hover, var(--scrollbar-corner));
		}

		.iti__dropdown-content::-webkit-scrollbar-corner:active {
			background-color: var(
				--scrollbar-corner-active,
				var(--scrollbar-corner-hover, var(--scrollbar-corner))
			);
		}

		.iti__dropdown-content::-webkit-scrollbar {
			display: block;
			width: 8px;
			height: 8px;
		}
		.iti__country-list {
			font-size: 0.875rem;
			line-height: 1.25rem;
			--tw-text-opacity: 1;
			color: var(--color-contrast-DEFAULT);
			scrollbar-width: none;
			--scrollbar-track: transparent;
		}
		.iti__country-list::-webkit-scrollbar {
			display: none;
		}
		.iti__country.iti__highlight {
			--tw-bg-opacity: 1;
			background-color: var(--color-surface-dark);
			--current-background: var(--color-surface-dark);
		}
	}
</style>
