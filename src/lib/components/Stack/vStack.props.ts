import type { StackBase, StackCrossAlignment, StackMainAlignment } from './stack.types.js';

export type VStackProps = StackBase & {
	/** Horizontal, cross-axis alignment. */
	hAlign?: StackCrossAlignment;
	/** Vertical, main-axis alignment. */
	vAlign?: StackMainAlignment;
	/** Main-axis alias for `vAlign`. The explicit axis prop takes precedence. */
	justify?: StackMainAlignment;
	/** Cross-axis alias for `hAlign`. The explicit axis prop takes precedence. */
	align?: StackCrossAlignment;
};
