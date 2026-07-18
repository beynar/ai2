export const SIDEBAR_DEFAULT_MIN_WIDTH = '12rem';
export const SIDEBAR_DEFAULT_MAX_WIDTH = '32rem';

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

const isFinitePositiveNumber = (value: unknown): value is number =>
	typeof value === 'number' && Number.isFinite(value) && value > 0;

const parseStoredWidth = (value: unknown) => {
	if (!isObject(value) || value.version !== STORAGE_VERSION) return null;
	return isFinitePositiveNumber(value.width) ? value.width : null;
};

export const readSidebarStoredWidth = (storageKey: string): number | null => {
	const storage = getBrowserStorage();
	if (!storage) return null;

	let rawWidth: string | null;
	try {
		rawWidth = storage.getItem(storageKey);
	} catch {
		return null;
	}
	if (!rawWidth) return null;

	try {
		return parseStoredWidth(JSON.parse(rawWidth));
	} catch {
		return null;
	}
};

export const writeSidebarStoredWidth = (storageKey: string, width: number) => {
	const storage = getBrowserStorage();
	if (!storage) return;

	try {
		storage.setItem(storageKey, JSON.stringify({ version: STORAGE_VERSION, width }));
	} catch {
		// Persistence is optional; localStorage may be unavailable or full.
	}
};

export function createSidebarWidthPrehydrationScript(options: {
	elementId: string;
	storageKey: string;
	minWidth?: string | number;
	maxWidth?: string | number;
}) {
	const serializedOptions = serializeForInlineScript({
		...options,
		minWidth: options.minWidth ?? SIDEBAR_DEFAULT_MIN_WIDTH,
		maxWidth: options.maxWidth ?? SIDEBAR_DEFAULT_MAX_WIDTH,
		storageVersion: STORAGE_VERSION
	});

	return `(() => {
	const options = ${serializedOptions};
	const isPositiveNumber = (value) =>
		typeof value === 'number' && Number.isFinite(value) && value > 0;
	const resolveLength = (value, element) => {
		if (isPositiveNumber(value)) return value;
		if (typeof value !== 'string') return null;

		const match = value.trim().match(/^(-?\\d+(?:\\.\\d+)?)\\s*(px|rem|em|%)$/);
		if (!match) return null;
		const amount = Number(match[1]);
		if (!Number.isFinite(amount) || amount <= 0) return null;

		const unit = match[2];
		if (unit === 'px') return amount;
		if (unit === 'rem') {
			return amount * (Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
		}
		if (unit === 'em') {
			return amount * (Number.parseFloat(getComputedStyle(element).fontSize) || 16);
		}

		const containerWidth =
			element.parentElement?.getBoundingClientRect().width ||
			element.getBoundingClientRect().width;
		return containerWidth > 0 ? (containerWidth * amount) / 100 : null;
	};
	const readStoredWidth = () => {
		let rawWidth;
		try {
			rawWidth = localStorage.getItem(options.storageKey);
		} catch {
			return null;
		}
		if (!rawWidth) return null;

		try {
			const parsed = JSON.parse(rawWidth);
			if (!parsed || parsed.version !== options.storageVersion) return null;
			return isPositiveNumber(parsed.width) ? parsed.width : null;
		} catch {
			return null;
		}
	};
	const applyStoredWidth = () => {
		const element = document.getElementById(options.elementId);
		if (!(element instanceof HTMLElement)) return false;

		const storedWidth = readStoredWidth();
		if (storedWidth === null) return true;
		const minWidth = resolveLength(options.minWidth, element);
		const maxWidth = resolveLength(options.maxWidth, element);
		const clampedWidth = Math.min(maxWidth ?? storedWidth, Math.max(minWidth ?? storedWidth, storedWidth));
		element.dataset.widthPrehydrating = 'true';
		element.style.setProperty('--sidebar-width', Math.round(clampedWidth) + 'px');
		return true;
	};

	if (applyStoredWidth()) return;
	const observer = new MutationObserver(() => {
		if (!applyStoredWidth()) return;
		observer.disconnect();
	});
	observer.observe(document.documentElement, { childList: true, subtree: true });
	const finalize = () => {
		if (document.readyState === 'loading') return;
		applyStoredWidth();
		observer.disconnect();
		document.removeEventListener('readystatechange', finalize);
	};
	document.addEventListener('readystatechange', finalize);
})();`;
}

function serializeForInlineScript(value: unknown): string {
	const serialized = JSON.stringify(value);
	if (serialized === undefined) throw new TypeError('Unable to serialize sidebar persistence');

	return serialized
		.replace(/</g, '\\u003c')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');
}
