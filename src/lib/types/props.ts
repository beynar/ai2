import type { Attachment } from 'svelte/attachments';

export type WithAttachments<T> = T & {
	[key: symbol]: Attachment<HTMLElement> | null | undefined;
};

export type WithoutAttachments<T> = T extends WithAttachments<infer U> ? U : T;
