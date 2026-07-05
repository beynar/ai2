import type { FileTree, FileTreeOptions, FileTreeResetOptions } from '@pierre/trees';

export function syncFileTreeOptions(
	fileTree: FileTree,
	previous: FileTreeOptions,
	next: FileTreeOptions
): void {
	if (shouldResetPaths(previous, next)) {
		fileTree.resetPaths(getResetPaths(next), getResetOptions(next));
	}

	if (!Object.is(previous.composition, next.composition)) {
		fileTree.setComposition(next.composition);
	}

	if (!Object.is(previous.gitStatus, next.gitStatus)) {
		fileTree.setGitStatus(next.gitStatus);
	}

	if (!Object.is(previous.icons, next.icons)) {
		fileTree.setIcons(next.icons);
	}
}

export function shouldRemountTree(previous: FileTreeOptions, next: FileTreeOptions): boolean {
	return (
		!Object.is(previous.density, next.density) ||
		!areDragAndDropOptionsEqual(previous.dragAndDrop, next.dragAndDrop) ||
		!Object.is(previous.fileTreeSearchMode, next.fileTreeSearchMode) ||
		!Object.is(previous.flattenEmptyDirectories, next.flattenEmptyDirectories) ||
		!Object.is(previous.id, next.id) ||
		!Object.is(previous.initialExpansion, next.initialExpansion) ||
		!Object.is(previous.initialSearchQuery, next.initialSearchQuery) ||
		!Object.is(previous.initialSelectedPaths, next.initialSelectedPaths) ||
		!Object.is(previous.initialVisibleRowCount, next.initialVisibleRowCount) ||
		!Object.is(previous.itemHeight, next.itemHeight) ||
		!Object.is(previous.onSearchChange, next.onSearchChange) ||
		!Object.is(previous.onSelectionChange, next.onSelectionChange) ||
		!Object.is(previous.overscan, next.overscan) ||
		!Object.is(previous.presorted, next.presorted) ||
		!Object.is(previous.renderRowDecoration, next.renderRowDecoration) ||
		!areRenamingOptionsEqual(previous.renaming, next.renaming) ||
		!Object.is(previous.search, next.search) ||
		!Object.is(previous.searchBlurBehavior, next.searchBlurBehavior) ||
		!Object.is(previous.searchFakeFocus, next.searchFakeFocus) ||
		!Object.is(previous.sort, next.sort) ||
		!Object.is(previous.stickyFolders, next.stickyFolders) ||
		!Object.is(previous.unsafeCSS, next.unsafeCSS)
	);
}

function getResetPaths(options: FileTreeOptions): readonly string[] {
	if (options.preparedInput != null) return options.preparedInput.paths;
	if (options.paths != null) return options.paths;

	throw new Error('Tree cannot reset without `paths` or `preparedInput`.');
}

function getResetOptions(options: FileTreeOptions): FileTreeResetOptions {
	return {
		initialExpandedPaths: options.initialExpandedPaths,
		preparedInput: options.preparedInput
	};
}

function shouldResetPaths(previous: FileTreeOptions, next: FileTreeOptions): boolean {
	return (
		!Object.is(previous.paths, next.paths) ||
		!Object.is(previous.preparedInput, next.preparedInput) ||
		!Object.is(previous.initialExpandedPaths, next.initialExpandedPaths)
	);
}

function areDragAndDropOptionsEqual(
	previous: FileTreeOptions['dragAndDrop'],
	next: FileTreeOptions['dragAndDrop']
): boolean {
	if (Object.is(previous, next)) return true;
	if (typeof previous !== 'object' || previous == null) return false;
	if (typeof next !== 'object' || next == null) return false;

	return (
		Object.is(previous.canDrag, next.canDrag) &&
		Object.is(previous.canDrop, next.canDrop) &&
		Object.is(previous.onDropComplete, next.onDropComplete) &&
		Object.is(previous.onDropError, next.onDropError) &&
		Object.is(previous.openOnDropDelay, next.openOnDropDelay)
	);
}

function areRenamingOptionsEqual(
	previous: FileTreeOptions['renaming'],
	next: FileTreeOptions['renaming']
): boolean {
	if (Object.is(previous, next)) return true;
	if (typeof previous !== 'object' || previous == null) return false;
	if (typeof next !== 'object' || next == null) return false;

	return (
		Object.is(previous.canRename, next.canRename) &&
		Object.is(previous.onError, next.onError) &&
		Object.is(previous.onRename, next.onRename)
	);
}
