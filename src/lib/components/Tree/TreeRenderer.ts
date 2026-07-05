import { FILE_TREE_TAG_NAME, FileTree, type FileTreeOptions } from '@pierre/trees';
import { TreeRendererHookSubscriptions, type TreeRendererHooks } from './TreeRendererHooks.js';
import { shouldRemountTree, syncFileTreeOptions } from './tree-renderer-options.js';

export type { TreeRendererHooks };

export class TreeRenderer {
	private container: HTMLElement | undefined;
	private fileTree: FileTree | undefined;
	private hasMounted = false;
	private host: HTMLElement | undefined;
	private hooks: TreeRendererHooks = {};
	private options: FileTreeOptions | undefined;
	private subscriptions = new TreeRendererHookSubscriptions();

	attach(
		container: HTMLElement,
		options: FileTreeOptions,
		hostClass: string | undefined,
		hooks: TreeRendererHooks
	): void {
		this.container = container;
		this.hooks = hooks;
		this.mount(options, hostClass);
	}

	sync(options: FileTreeOptions, hostClass: string | undefined, hooks: TreeRendererHooks): void {
		this.hooks = hooks;

		if (this.container == null) return;

		if (this.fileTree == null || this.host == null || this.options == null) {
			this.mount(options, hostClass);
			return;
		}

		if (shouldRemountTree(this.options, options)) {
			this.mount(options, hostClass);
			return;
		}

		applyHostClass(this.host, hostClass);
		syncFileTreeOptions(this.fileTree, this.options, options);
		this.subscriptions.sync(this.fileTree, this.hooks);
		this.options = options;
	}

	clear(): void {
		this.disposeFileTree();
		this.container?.replaceChildren();
	}

	cleanUp(): void {
		this.disposeFileTree();
		this.container = undefined;
		this.hasMounted = false;
	}

	private mount(options: FileTreeOptions, hostClass: string | undefined): void {
		if (this.container == null) return;

		this.disposeFileTree();

		const host = getOrCreateFileTreeContainer(this.container);
		applyHostClass(host, hostClass);

		this.fileTree = new FileTree(options);

		if (!this.hasMounted && hasPreloadedContent(host)) {
			this.fileTree.hydrate({ fileTreeContainer: host });
		} else {
			this.fileTree.render({ fileTreeContainer: host });
		}

		this.hasMounted = true;
		this.host = host;
		this.options = options;
		this.subscriptions.sync(this.fileTree, this.hooks);
		this.hooks.setFileTree?.(this.fileTree);
		this.hooks.onReady?.(this.fileTree);
	}

	private disposeFileTree(): void {
		const fileTree = this.fileTree;
		this.subscriptions.clear();
		this.fileTree = undefined;
		this.host = undefined;
		this.options = undefined;
		if (fileTree == null) return;

		this.hooks.onDispose?.();
		this.hooks.setFileTree?.(undefined);
		fileTree.cleanUp();
	}
}

function getOrCreateFileTreeContainer(container: HTMLElement): HTMLElement {
	const existingHost = container.querySelector<HTMLElement>(FILE_TREE_TAG_NAME);
	if (existingHost != null) return existingHost;

	const host = document.createElement(FILE_TREE_TAG_NAME);
	container.replaceChildren(host);
	return host;
}

function applyHostClass(host: HTMLElement, hostClass: string | undefined): void {
	if (hostClass == null || hostClass.length === 0) {
		host.removeAttribute('class');
		return;
	}

	host.className = hostClass;
}

function hasPreloadedContent(host: HTMLElement): boolean {
	if (host.shadowRoot?.querySelector('[data-file-tree-id]') != null) return true;
	return (
		host.querySelector(
			'template[shadowrootmode="open"], template[data-file-tree-shadowrootmode="open"]'
		) != null
	);
}
