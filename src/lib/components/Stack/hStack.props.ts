import type { StackBase, StackCrossAlignment, StackMainAlignment } from './stack.types.js';

export type HStackProps = StackBase & {
	/** Horizontal, main-axis alignment. */
	hAlign?: StackMainAlignment;
	/** Vertical, cross-axis alignment. */
	vAlign?: StackCrossAlignment;
	/** Main-axis alias for `hAlign`. The explicit axis prop takes precedence. */
	justify?: StackMainAlignment;
	/** Cross-axis alias for `vAlign`. The explicit axis prop takes precedence. */
	align?: StackCrossAlignment;
};
