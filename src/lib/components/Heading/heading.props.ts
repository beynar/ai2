import type { WithAttachments } from '$lib/types/props.js';

export type HeadingProps = WithAttachments<{
	class?: string;
	children?: any;
	size?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
	as?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
	weight?: 'normal' | 'bold' | 'light';
	trim?: 'end' | 'both' | 'start' | 'none';
	align?: 'left' | 'center' | 'right';
	balanced?: boolean;
	underline?: boolean;
	muted?: boolean;
}>;

