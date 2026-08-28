import { mount, unmount, type Snippet } from 'svelte';
import type {
	ContextMenuItem,
	ContextMenuOpenContext,
	FileTree,
	FileTreeCompositionOptions,
	FileTreeDirectoryHandle,
	FileTreeItemHandle,
	FileTreeOptions,
	GitStatusEntry
} from '@pierre/trees';
import TreeContextMenuSnippet from './TreeContextMenuSnippet.svelte';
import TreeHeaderSnippet from './TreeHeaderSnippet.svelte';

type MountedSnippet = {
	component: Record<string, unknown>;
	node: HTMLElement;
};

export type TreeContextMenuSnippetData = {
	path: string;
	name: string;
	depth: number;
	kind: ContextMenuItem['kind'];
	isSelected: boolean;
	isFocused: boolean;
	isExpanded: boolean;
	gitStatus: GitStatusEntry['status'] | undefined;
	itemHandle: FileTreeItemHandle | undefined;
	context: ContextMenuOpenContext;
	close: ContextMenuOpenContext['close'];
	restoreFocus: ContextMenuOpenContext['restoreFocus'];
};

export type TreeSnippetProps = {
	/** Custom header rendered inside the Pierre Trees composition header slot. */
	header?: Snippet;
	/** Custom context menu rendered from Pierre Trees composition context. */
	contextMenu?: Snippet<[TreeContextMenuSnippetData]>;
};

export class TreeSnippetRenderer {
	private contextMenu: MountedSnippet | undefined;
	private header: MountedSnippet | undefined;

	constructor(private getFileTree: () => FileTree | undefined) {}

	compose(options: FileTreeOptions, snippets: TreeSnippetProps): FileTreeOptions {
		if (snippets.header == null) this.clearHeader();
		if (snippets.contextMenu == null) this.clearContextMenu();
		if (snippets.header == null && snippets.contextMenu == null) return options;

		return {
			...options,
			composition: this.createComposition(options.composition, options.gitStatus, snippets)
		};
	}

	cleanUp(): void {
		this.clearHeader();
		this.clearContextMenu();
	}

	private createComposition(
		composition: FileTreeCompositionOptions | undefined,
		gitStatus: readonly GitStatusEntry[] | undefined,
		snippets: TreeSnippetProps
	): FileTreeCompositionOptions {
		const headerSnippet = snippets.header;
		const contextMenuSnippet = snippets.contextMenu;

		return {
			...composition,
			header:
				headerSnippet == null
					? composition?.header
					: {
							...composition?.header,
							render: () => this.renderHeader(headerSnippet)
						},
			contextMenu:
				contextMenuSnippet == null
					? composition?.contextMenu
					: {
							...composition?.contextMenu,
							render: (item, context) =>
								this.renderContextMenu(contextMenuSnippet, item, context, gitStatus),
							onClose: () => {
								this.clearContextMenu();
								composition?.contextMenu?.onClose?.();
							}
						}
		};
	}

	private renderHeader(snippet: Snippet): HTMLElement {
		this.clearHeader();

		const node = document.createElement('div');
		const component = mount(TreeHeaderSnippet, {
			target: node,
			props: {
				children: snippet
			}
		});
		const mountedSnippet = { component, node };
		this.header = mountedSnippet;

		return mountedSnippet.node;
	}

	private renderContextMenu(
		snippet: Snippet<[TreeContextMenuSnippetData]>,
		item: ContextMenuItem,
		context: ContextMenuOpenContext,
		gitStatus: readonly GitStatusEntry[] | undefined
	): HTMLElement {
		this.clearContextMenu();

		const data = this.createContextMenuData(item, context, gitStatus);
		const node = document.createElement('div');
		const component = mount(TreeContextMenuSnippet, {
			target: node,
			props: {
				children: snippet,
				data
			}
		});
		const mountedSnippet = { component, node };
		this.contextMenu = mountedSnippet;

		return mountedSnippet.node;
	}

	private createContextMenuData(
		item: ContextMenuItem,
		context: ContextMenuOpenContext,
		gitStatus: readonly GitStatusEntry[] | undefined
	): TreeContextMenuSnippetData {
		const itemHandle = this.getFileTree()?.getItem(item.path) ?? undefined;

		return {
			path: item.path,
			name: item.name,
			depth: getPathDepth(item.path),
			kind: item.kind,
			isSelected: itemHandle?.isSelected() ?? false,
			isFocused: itemHandle?.isFocused() ?? false,
			isExpanded: isExpandedDirectory(itemHandle),
			gitStatus: gitStatus?.find((entry) => entry.path === item.path)?.status,
			itemHandle,
			context,
			close: context.close,
			restoreFocus: context.restoreFocus
		};
	}

	private clearHeader(): void {
		this.header = unmountSnippet(this.header);
	}

	private clearContextMenu(): void {
		this.contextMenu = unmountSnippet(this.contextMenu);
	}
}

function unmountSnippet(mountedSnippet: MountedSnippet | undefined): undefined {
	if (mountedSnippet == null) return undefined;

	void unmount(mountedSnippet.component);
	mountedSnippet.node.remove();

	return undefined;
}

function isExpandedDirectory(itemHandle: FileTreeItemHandle | undefined): boolean {
	if (!isDirectoryHandle(itemHandle)) return false;
	return itemHandle.isExpanded();
}

function isDirectoryHandle(
	itemHandle: FileTreeItemHandle | undefined
): itemHandle is FileTreeDirectoryHandle {
	return itemHandle?.isDirectory() === true;
}

function getPathDepth(path: string): number {
	const segmentCount = path.split('/').filter((segment) => segment.length > 0).length;
	return Math.max(0, segmentCount - 1);
}
