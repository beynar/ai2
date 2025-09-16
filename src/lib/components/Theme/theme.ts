export type ResponsiveProps<T> = ((breakpoint: Breakpoint) => T) | T;

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
