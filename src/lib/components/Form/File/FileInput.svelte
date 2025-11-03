<script lang="ts" generics="Mode extends 'single' | 'multiple' = 'single'">
	import Button from '../../Button/Button.svelte';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import { FileDropzone } from './fileDropzone.svelte.js';
	import type { FileInputProps, FileInputType, FileInputValue } from './fileInput.props.js';
	import { useFileInputTheme } from './fileInput.theme.js';
	import { slide } from 'svelte/transition';
	import Slot from '../../Slot/Slot.svelte';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		mode = 'single' as Mode,
		onChange,
		types = ['image/*'],
		maxFiles = 1,
		clickable = true,
		maxSize = 50 * 1024 * 1024,
		fileList,
		fileListClass,
		fileListProps,
		file,
		fileClass,
		fileProps,
		placeholder = 'Click or drag files here',
		placeholderClass,
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		visible,
		...rest
	}: FileInputProps<Mode> = $props();

	const id = $props.id();

	const field = createFieldState({
		id,
		get value() {
			return value as any;
		},
		set value(v) {
			value = v as FileInputValue<Mode>;
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
			onChange?.(v as FileInputValue<Mode>);
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
		visible,
		type: (mode === 'single' ? 'file' : 'files') as FileInputType<Mode>
	});

	const classes = $derived(useFileInputTheme(theme));

	const isImage = (file: File): boolean => {
		return file.type.startsWith('image/');
	};

	const dropzone = new FileDropzone({
		get disabled() {
			return field.disabled;
		},
		get config() {
			return {
				types,
				maxFiles,
				clickable,
				maxSize,
				mode,
				get value() {
					return field.value as any;
				},
				onChange: (files: File[]) => {
					if (mode === 'single') {
						field.value = files[0] as any;
					} else {
						// In multiple mode, files array contains all files (existing + new)
						field.value = files as any;
					}
				}
			};
		}
	});
</script>

<Field
	{@attach dropzone.zone}
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({
				class: theme?.inputContainer?.base,
				state: dropzone.state,
				disabled: field.disabled
			})
		}
	}}
	attrs={{
		'data-state': dropzone.state,
		'data-clickable': clickable
	}}
	{...rest}
>
	<input
		multiple={mode === 'multiple' && maxFiles > 1}
		hidden
		accept={types.join(',')}
		{@attach dropzone.input}
		type="file"
		disabled={field.disabled}
	/>
	{#if dropzone.files.length === 0}
		<div transition:slide class={classes.placeholder({ class: placeholderClass })}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<polyline points="14 2 14 8 20 8" />
			</svg>
			{#if placeholder}
				<span class="text-contrast-muted mt-2 text-sm">{placeholder}</span>
			{/if}
		</div>
	{:else}
		<div transition:slide class="h-fit w-full">
			<Slot
				render={fileList}
				payload={dropzone}
				props={fileListProps}
				class={classes.fileList({ class: fileListClass })}
			>
				{#each dropzone.files as fil, i (fil.name + fil.size)}
					{@const size = dropzone.formatSize(fil.size)}
					<div transition:slide={{ duration: 300 }}>
						<Slot
							payload={{
								file: fil,
								index: i,
								remove: () => {
									dropzone.removeFile(fil);
								},
								size
							}}
							render={file}
							props={fileProps}
							class={classes.file({ class: fileClass })}
						>
							{#if isImage(fil)}
								{@const src = URL.createObjectURL(fil)}
								<img
									{src}
									alt={fil.name}
									class="border-surface-muted h-16 w-16 shrink-0 rounded border object-cover"
								/>
							{/if}
							<div class="min-w-0 flex-1">
								<div class="truncate">{fil.name}</div>
								<div class="text-contrast-muted text-xs">{size}</div>
							</div>
							<Button variant="ghost" size="small" squared onClick={() => dropzone.removeFile(fil)}>
								{#snippet prefix()}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								{/snippet}
							</Button>
						</Slot>
					</div>
				{/each}
				{#if mode === 'multiple' && dropzone.files.length > 0 && dropzone.files.length < maxFiles}
					<Button
						variant="soft"
						color="primary"
						fullWidth
						onClick={() => dropzone.inputElement?.click()}
					>
						{#snippet prefix()}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						{/snippet}
						Add more files ({dropzone.files.length}/{maxFiles})
					</Button>
				{/if}
			</Slot>
		</div>
	{/if}
</Field>
