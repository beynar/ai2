import { fromEvent } from 'file-selector';
import { untrack } from 'svelte';
import { on } from 'svelte/events';

export type FileDropzoneState = 'idle' | 'potential' | 'valid' | 'invalid';

export interface FileDropzoneConfig {
	types: string[];
	maxFiles: number;
	clickable: boolean;
	maxSize: number;
	mode: 'single' | 'multiple';
	value: File | File[] | null;
	onChange: (files: File[]) => void;
}

export class FileDropzone {
	files = $state<File[]>([]);
	zoneElement = $state<HTMLElement | undefined>();
	inputElement = $state<HTMLInputElement | undefined>();
	config = $state<FileDropzoneConfig | undefined>();
	state = $state<FileDropzoneState>('idle');
	isValid = $state<boolean>(false);
	disabled = $state<boolean>(false);
	formatSize = (bytes: number): string => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 Byte';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
		if (i === 0) return `${bytes} ${sizes[i]}`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	};

	private matchesAccept(file: File): boolean {
		if (!this.config || !this.config.types.length) return true;

		return this.config.types.some((pattern) => {
			// Handle empty pattern
			if (!pattern) return true;

			// Handle file extension patterns (e.g., ".jpg", ".pdf")
			if (pattern.startsWith('.')) {
				return file.name.toLowerCase().endsWith(pattern.toLowerCase());
			}

			// Handle MIME type wildcards (e.g., "image/*", "video/*")
			if (pattern.endsWith('/*')) {
				const baseType = pattern.slice(0, -2);
				return file.type.startsWith(baseType + '/');
			}

			// Handle exact MIME type match (e.g., "image/jpeg")
			return file.type === pattern;
		});
	}

	constructor(opts: { config: FileDropzoneConfig; disabled?: boolean }) {
		this.config = opts.config;
		this.disabled = opts.disabled || false;

		$effect(() => {
			const newConfig = opts.config;
			untrack(() => {
				this.config = newConfig;
			});
		});

		$effect(() => {
			const externalValue = this.config?.value;
			untrack(() => {
				if (!externalValue) {
					return;
				}
				const externalValueAsArray = Array.isArray(externalValue) ? externalValue : [externalValue];
				if (
					externalValueAsArray.length &&
					(this.files.length !== externalValueAsArray.length ||
						this.files.some((file) => !externalValueAsArray.includes(file)))
				) {
					this.files = externalValueAsArray;
				}
			});
		});
	}

	onDrop = async (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (this.disabled) return;
		this.state = 'idle';

		const files = (await fromEvent(event)).filter((file): file is File => file instanceof File);
		console.log('files', files);
		if (files.length) {
			const newFiles = this.getValidFiles(files);
			console.log('newFiles', newFiles);
			if (this.config?.mode === 'single') {
				this.files = newFiles.slice(0, 1);
			} else {
				this.files = newFiles.concat(this.files).slice(0, this.config?.maxFiles || 1);
			}

			this.config?.onChange(this.files);
		}
	};

	onDragStart = (event: DragEvent) => {
		if (this.hasFiles(event)) {
			this.state = 'potential';
		}
	};

	// Native drag handlers
	onDragOver = (event: DragEvent) => {
		if (!this.hasFiles(event)) return;
		event.preventDefault();
		event.stopPropagation();
	};

	onDragEnter = async (event: DragEvent) => {
		if (!this.config || this.disabled || !this.hasFiles(event)) {
			return;
		}
		const files = await fromEvent(event);
		this.isValid = files.every((file: File | DataTransferItem) => this.matchesAccept(file as File));
		this.state = this.isValid ? 'valid' : 'invalid';
	};

	onDragLeave = (event: DragEvent) => {
		// Only update state if we're actually leaving the dropzone
		// (not just moving to a child element)
		if (!this.zoneElement?.contains(event.relatedTarget as Node)) {
			this.state = 'potential';
		}
	};

	removeFile = (file: File): void => {
		if (this.disabled) return;
		this.files = this.files.filter((f) => f !== file);
		// Trigger onChange with updated file list
		this.config?.onChange(this.files);
	};

	getValidFiles = (files: File[]): File[] => {
		if (!this.config) return [];

		const remainingSlots = this.config.mode === 'single' ? 1 : this.config.maxFiles;

		return (
			files
				.filter((file) => {
					return this.matchesAccept(file) && file.size <= this.config!.maxSize;
				})
				// Remove duplicates within new files (keep first occurrence by name+size)
				.filter((file, index, self) => {
					return self.findIndex((f) => f.name === file.name && f.size === file.size) === index;
				})
				// Remove files that already exist in the current file list
				.filter((file) => {
					return !this.files.some(
						(existingFile) => existingFile.name === file.name && existingFile.size === file.size
					);
				})
				.slice(0, remainingSlots)
		);
	};

	private hasFiles(event: DragEvent): boolean {
		if (!event.dataTransfer) return false;
		return Array.from(event.dataTransfer.types).includes('Files');
	}

	openFileSelector = (e: MouseEvent): void => {
		const hasClickedAButton = e.composedPath().some((node) => node instanceof HTMLButtonElement);
		const hasClickedAnInput = e.composedPath().some((node) => node instanceof HTMLInputElement);
		if (hasClickedAButton || hasClickedAnInput) {
			return;
		}
		this.inputElement?.click();
	};

	zone = (node: HTMLElement) => {
		untrack(() => {
			this.zoneElement = node;

			// Element-level event listeners
			const offDragOver = on(node, 'dragover', this.onDragOver);
			const offDragEnter = on(node, 'dragenter', this.onDragEnter);
			const offDragLeave = on(node, 'dragleave', this.onDragLeave);
			const offDrop = on(node, 'drop', this.onDrop);
			const offGlobalDragStart = on(document, 'dragstart', this.onDragStart);
			const offClick = on(node, 'click', this.openFileSelector);

			return () => {
				offDragOver();
				offDragEnter();
				offDragLeave();
				offDrop();
				offGlobalDragStart();
				offClick();
			};
		});
	};

	onChange = async (event: Event): Promise<void> => {
		event.preventDefault();
		event.stopPropagation();
		const files = await fromEvent(event);
		if (!files.length) return;
		const newFiles = this.getValidFiles(
			files.filter((file: File | DataTransferItem): file is File => file instanceof File)
		);

		if (this.config?.mode === 'single') {
			// In single mode, replace the files array with the first valid file
			const maxFiles = this.config?.maxFiles || 1;
			this.files = newFiles.slice(0, maxFiles);
		} else {
			// In multiple mode, append new files to existing list
			this.files.push(...newFiles);
		}

		this.config?.onChange(this.files);

		// Reset input value so the same file can be selected again
		if (this.inputElement) {
			this.inputElement.value = '';
		}
	};

	input = (node: HTMLInputElement) => {
		untrack(() => {
			this.inputElement = node;
			node.addEventListener('change', this.onChange);
			return () => {
				node.removeEventListener('change', this.onChange);
			};
		});
	};
}
