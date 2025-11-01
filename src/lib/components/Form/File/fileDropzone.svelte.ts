import {
	dropTargetForExternal,
	monitorForExternal
} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { containsFiles, getFiles } from '@atlaskit/pragmatic-drag-and-drop/external/file';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import { fromEvent } from 'file-selector';
import { untrack } from 'svelte';

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
			this.zoneElement?.setAttribute('data-state', this.state);
		});

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

	handleDrop = (event: DragEvent): void => {
		event.preventDefault();
		event.stopPropagation();
		if (this.disabled) return;
		this.state = 'idle';
		const files = event.dataTransfer?.files;
		if (files) {
			this.files = Array.from(files);
		}
	};

	addNewFiles = (files: File[]): void => {
		if (this.disabled) return;
		const newFiles = this.getValidFiles(files);

		if (this.config?.mode === 'single') {
			// In single mode, replace the files array with the first valid file
			const maxFiles = this.config?.maxFiles || 1;
			this.files = newFiles.slice(0, maxFiles);
		} else {
			// In multiple mode, append new files to existing list
			this.files.push(...newFiles);
		}

		this.config?.onChange(this.files);
	};

	removeFile = (file: File): void => {
		if (this.disabled) return;
		this.files = this.files.filter((f) => f !== file);
		// Trigger onChange with updated file list
		this.config?.onChange(this.files);
	};

	getValidFiles = (files: File[]): File[] => {
		if (!this.config) return [];

		const remainingSlots = this.config.maxFiles - this.files.length;

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

	onDragEnter = async (event: DragEvent): Promise<void> => {
		if (!this.config || this.disabled) return;
		const files = await fromEvent(event);
		this.isValid = files.every((file: File | DataTransferItem) => this.matchesAccept(file as File));
	};

	openFileSelector = (e: MouseEvent): void => {
		const hasClickedAButton = e.composedPath().some((node) => node instanceof HTMLButtonElement);
		const hasClickedAnInput = e.composedPath().some((node) => node instanceof HTMLInputElement);
		if (hasClickedAButton || hasClickedAnInput) {
			return;
		}
		this.inputElement?.click();
	};

	zone = (node: HTMLElement) => {
		this.zoneElement = node;
		const cleanup = combine(
			dropTargetForExternal({
				element: node,
				canDrop: containsFiles,
				onDragEnter: () => {
					this.state = this.isValid ? 'valid' : 'invalid';
				},
				onDragLeave: () => {
					this.state = 'potential';
				},
				onDrop: async ({ source }) => {
					const files = getFiles({ source });
					if (!files.length) return;
					this.addNewFiles(files);
				}
			}),
			monitorForExternal({
				canMonitor: containsFiles,
				onDragStart: () => {
					this.state = 'potential';
					preventUnhandled.start();
				},
				onDrop: () => {
					this.state = 'idle';
					preventUnhandled.stop();
				}
			})
		);

		document.addEventListener('dragenter', this.onDragEnter);

		if (this.config?.clickable) {
			node.addEventListener('click', this.openFileSelector);
		}

		return {
			destroy: () => {
				cleanup();
				document.removeEventListener('dragenter', this.onDragEnter);
				node.removeEventListener('click', this.openFileSelector);
			}
		};
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
		this.inputElement = node;
		node.addEventListener('change', this.onChange);
		return {
			destroy: () => {
				node.removeEventListener('change', this.onChange);
			}
		};
	};
}
