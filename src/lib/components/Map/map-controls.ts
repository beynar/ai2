import type { MapControlAction } from './map-types.js';

export const DEFAULT_MAP_CONTROL_ACTIONS: MapControlAction[] = [
	'zoom-in',
	'zoom-out',
	'fit-markers',
	'geolocate',
	'reset'
];

export function resolveMapControlActions(controls: true | MapControlAction[]): MapControlAction[] {
	return controls === true ? DEFAULT_MAP_CONTROL_ACTIONS : [...new Set(controls)];
}

export function getMapControlActionLabel(action: MapControlAction): string {
	switch (action) {
		case 'zoom-in':
			return 'Zoom in';
		case 'zoom-out':
			return 'Zoom out';
		case 'fit-markers':
			return 'Fit markers';
		case 'geolocate':
			return 'Show user location';
		case 'reset':
			return 'Reset map view';
	}
}

export function isMapControlActionDisabled(action: MapControlAction, markerCount: number): boolean {
	return action === 'fit-markers' && markerCount === 0;
}
