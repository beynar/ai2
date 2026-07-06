export type ResizableStoredLayout = {
	version: 1;
	panelIds: string[];
	sizes: number[];
	collapsedPanels: string[];
};

type ResizableStoredLayoutInput = Omit<ResizableStoredLayout, 'version'>;

const STORAGE_VERSION = 1;

const getBrowserStorage = (): Storage | null => {
	if (typeof window === 'undefined') return null;

	try {
		return window.localStorage;
	} catch {
		return null;
	}
};

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumberArray = (value: unknown): value is number[] =>
	Array.isArray(value) && value.every((item) => typeof item === 'number' && Number.isFinite(item));

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((item) => typeof item === 'string');

const parseStoredLayout = (value: unknown): ResizableStoredLayout | null => {
	if (!isObject(value) || value.version !== STORAGE_VERSION) return null;
	if (!isStringArray(value.panelIds)) return null;
	if (!isFiniteNumberArray(value.sizes)) return null;
	if (!isStringArray(value.collapsedPanels)) return null;

	return {
		version: STORAGE_VERSION,
		panelIds: value.panelIds,
		sizes: value.sizes,
		collapsedPanels: value.collapsedPanels
	};
};

export const readResizableStoredLayout = (storageKey: string): ResizableStoredLayout | null => {
	const storage = getBrowserStorage();
	if (!storage) return null;

	let rawLayout: string | null;
	try {
		rawLayout = storage.getItem(storageKey);
	} catch {
		return null;
	}
	if (!rawLayout) return null;

	try {
		return parseStoredLayout(JSON.parse(rawLayout));
	} catch {
		return null;
	}
};

export const writeResizableStoredLayout = (
	storageKey: string,
	layout: ResizableStoredLayoutInput
): boolean => {
	const storage = getBrowserStorage();
	if (!storage) return false;

	try {
		storage.setItem(storageKey, JSON.stringify({ version: STORAGE_VERSION, ...layout }));
		return true;
	} catch {
		return false;
	}
};
