export type FileRejectionReason = 'type' | 'size' | 'duplicate' | 'limit';

export type FileRejection = {
	file: File;
	reason: FileRejectionReason;
};

export type FileAcceptanceOptions = {
	types?: readonly string[];
	maxSize?: number;
	maxFiles?: number;
	currentFiles?: readonly File[];
};

export type FileAcceptanceResult = {
	accepted: File[];
	rejected: FileRejection[];
};

type FileTypeCandidate = Pick<File, 'name' | 'type'>;

export function isAcceptedFileType(
	file: FileTypeCandidate,
	types: readonly string[] = []
): boolean {
	if (types.length === 0) return true;
	const fileName = file.name.toLowerCase();
	const fileType = file.type.toLowerCase();

	return types.some((pattern) => {
		const normalizedPattern = pattern.toLowerCase();
		if (!normalizedPattern || normalizedPattern === '*' || normalizedPattern === '*/*') {
			return true;
		}
		if (normalizedPattern.startsWith('.')) {
			return fileName.endsWith(normalizedPattern);
		}
		if (normalizedPattern.endsWith('/*')) {
			return fileType.startsWith(normalizedPattern.slice(0, -1));
		}
		return fileType === normalizedPattern;
	});
}

function fileIdentity(file: File): string {
	return `${file.name}:${file.size}:${file.lastModified}`;
}

export function acceptFiles(
	files: readonly File[],
	{
		types = [],
		maxSize = Number.POSITIVE_INFINITY,
		maxFiles = Number.POSITIVE_INFINITY,
		currentFiles = []
	}: FileAcceptanceOptions = {}
): FileAcceptanceResult {
	const accepted: File[] = [];
	const rejected: FileRejection[] = [];
	const existing = new Set(currentFiles.map(fileIdentity));
	const remainingSlots = Math.max(0, maxFiles - currentFiles.length);

	for (const file of files) {
		if (!isAcceptedFileType(file, types)) {
			rejected.push({ file, reason: 'type' });
			continue;
		}
		if (file.size > maxSize) {
			rejected.push({ file, reason: 'size' });
			continue;
		}

		const identity = fileIdentity(file);
		if (existing.has(identity)) {
			rejected.push({ file, reason: 'duplicate' });
			continue;
		}
		if (accepted.length >= remainingSlots) {
			rejected.push({ file, reason: 'limit' });
			continue;
		}

		existing.add(identity);
		accepted.push(file);
	}

	return { accepted, rejected };
}
