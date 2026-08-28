import type { CommandGroup, CommandItem } from '$lib/components/Command/index.js';
import type {
	SidebarGroup,
	SidebarMenuEntry,
	SidebarMenuSubEntry,
	SidebarTreeNode
} from '$lib/components/Sidebar/index.js';

type SidebarPage = {
	label: string;
	href: string;
	keywords: string[];
};

export function getSidebarCommandGroups(groups: SidebarGroup[]): CommandGroup<string>[] {
	const commandGroups: CommandGroup<string>[] = [];
	const seenHrefs = new Set<string>();

	for (const group of groups) {
		const items: CommandItem<string>[] = [];

		for (const page of getSidebarPages(group)) {
			if (seenHrefs.has(page.href)) continue;
			seenHrefs.add(page.href);

			items.push({
				value: page.href,
				label: page.label,
				href: page.href,
				keywords: page.keywords
			});
		}

		if (items.length > 0) {
			commandGroups.push({ heading: group.label, items });
		}
	}

	return commandGroups;
}

function getSidebarPages(group: SidebarGroup): SidebarPage[] {
	const section = group.label ?? '';
	const pages: SidebarPage[] = [];

	for (const entry of group.items ?? []) {
		appendMenuEntry(pages, entry, [section]);
	}

	for (const node of group.tree ?? []) {
		appendTreeNode(pages, node, [section]);
	}

	return pages;
}

function appendMenuEntry(pages: SidebarPage[], entry: SidebarMenuEntry, path: string[]) {
	const nextPath = [...path, entry.label];

	if (entry.href) {
		pages.push({
			label: entry.label,
			href: entry.href,
			keywords: [...path, entry.href]
		});
	}

	for (const item of entry.items ?? []) {
		appendMenuSubEntry(pages, item, nextPath);
	}
}

function appendMenuSubEntry(pages: SidebarPage[], entry: SidebarMenuSubEntry, path: string[]) {
	if (!entry.href) return;

	pages.push({
		label: entry.label,
		href: entry.href,
		keywords: [...path, entry.href]
	});
}

function appendTreeNode(pages: SidebarPage[], node: SidebarTreeNode, path: string[]) {
	const nextPath = [...path, node.label];

	if (node.href) {
		pages.push({
			label: node.label,
			href: node.href,
			keywords: [...path, node.href]
		});
	}

	for (const child of node.children ?? []) {
		appendTreeNode(pages, child, nextPath);
	}
}
