import { cva } from '$lib/utils/cva.js';

export const heading = cva({
	base: 'ui-heading',
	variants: {
		size: {
			h1: 'text-4xl',
			h2: 'text-3xl',
			h3: 'text-2xl',
			h4: 'text-xl',
			h5: 'text-lg',
			h6: 'text-base'
		},
		weight: {
			normal: 'font-normal',
			bold: 'font-bold',
			light: 'font-light'
		},
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right'
		},
		balanced: {
			true: 'balanced',
			false: ''
		},
		underline: {
			true: 'underline',
			false: ''
		},
		muted: {
			true: 'muted',
			false: ''
		}
	}
});

