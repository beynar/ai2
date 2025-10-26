import { dropTargetForExternal, monitorForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
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

	formatSize = (bytes: number): string => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 Byte';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
		if (i === 0) return `${bytes} ${sizes[i]}`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	};

	constructor(opts: { config: FileDropzoneConfig }) {
		this.config = opts.config;

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
				const externalValueAsArray = Array.isArray(externalValue)
					? externalValue
					: [externalValue];
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
		this.state = 'idle';
		const files = event.dataTransfer?.files;
		if (files) {
			this.files = Array.from(files);
		}
	};

	addNewFiles = (files: File[]): void => {
		const newFiles = this.getValidFiles(files);
		this.files.push(...newFiles);
		// Pass all files (not just new ones) to maintain the full list in multiple mode
		this.config?.onChange(this.files);
	};

	removeFile = (file: File): void => {
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
					return (
						this.config!.types.some((type) => file.type.match(type)) &&
						file.size <= this.config!.maxSize
					);
				})
				// Remove duplicates within new files
				.filter((file, _index, self) => {
					return self.filter((f) => f.name === file.name).length === 1;
				})
				// Remove files that already exist in the current file list
				.filter((file) => {
					return !this.files.some((existingFile) => 
						existingFile.name === file.name && existingFile.size === file.size
					);
				})
				.slice(0, remainingSlots)
		);
	};

	onDragEnter = async (event: DragEvent): Promise<void> => {
		if (!this.config) return;
		const files = await fromEvent(event);
		this.isValid = files.every((file: File | DataTransferItem) =>
			this.config!.types.some((type) => (file as File).type.match(type))
		);
	};

	openFileSelector = (e: MouseEvent): void => {
		const hasClickedAButton = e
			.composedPath()
			.some((node) => node instanceof HTMLButtonElement);
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
				onDrop: async ({ source }: { source: any }) => {
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
		const newFiles = this.getValidFiles(files.filter((file: File | DataTransferItem): file is File => file instanceof File));
		this.files.push(...newFiles);
		// Pass all files (not just new ones) to maintain the full list in multiple mode
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
