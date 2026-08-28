import { mount, unmount, type Snippet } from 'svelte';
import type { DiffLineAnnotation } from '@pierre/diffs';
import DiffAnnotationSnippet from './DiffAnnotationSnippet.svelte';

type MountedAnnotation = {
	component: Record<string, unknown>;
	node: HTMLElement;
};

/**
 * Bridges `@pierre/diffs`' imperative `renderAnnotation(annotation) => HTMLElement`
 * callback to a Svelte snippet. Each annotation is mounted into a fresh host
 * `<span>` (optionally classed) via `DiffAnnotationSnippet`; `cleanUp()` unmounts
 * them all and is invoked from the component's attachment teardown.
 */
export class DiffAnnotationRenderer {
	private mountedAnnotations: MountedAnnotation[] = [];

	constructor(
		private snippet: Snippet<[DiffLineAnnotation<undefined>]> | undefined,
		private className: string | undefined
	) {}

	render = (annotation: DiffLineAnnotation<undefined>): HTMLElement | undefined => {
		if (this.snippet == null) return undefined;

		const node = document.createElement('span');
		if (this.className) node.className = this.className;

		const component = mount(DiffAnnotationSnippet, {
			target: node,
			props: {
				annotation,
				children: this.snippet
			}
		});

		this.mountedAnnotations.push({ component, node });
		return node;
	};

	cleanUp(): void {
		const mountedAnnotations = this.mountedAnnotations;
		this.mountedAnnotations = [];

		for (const mountedAnnotation of mountedAnnotations) {
			void unmount(mountedAnnotation.component);
			mountedAnnotation.node.remove();
		}
	}
}
