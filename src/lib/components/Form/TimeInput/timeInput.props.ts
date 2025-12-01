import type { InputProps } from '../Field/field.js';
import type { TimeInputThemeProps } from './timeInput.theme.js';
import type { MaskitoTimeParams } from '@maskito/kit';

export type TimeInputProps = InputProps<'time'> & {
	placeholder?: string;
	as?: 'minuteSinceMidnight' | 'secondSinceMidnight' | 'millisecondSinceMidnight';
	format?: MaskitoTimeParams['mode'];
	maxValues?: MaskitoTimeParams['timeSegmentMaxValues'];
	minValues?: MaskitoTimeParams['timeSegmentMinValues'];
	theme?: TimeInputThemeProps & InputProps<'time'>['theme'];
};

