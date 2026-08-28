import type { FileTreeOptions } from '@pierre/trees';
import { preloadFileTree, serializeFileTreeSsrPayload } from '@pierre/trees/ssr';

export type PreloadedTree = {
	markup: string;
};

export function preloadTree(options: FileTreeOptions): PreloadedTree {
	const payload = preloadFileTree(options);

	return {
		markup: serializeFileTreeSsrPayload(payload)
	};
}
