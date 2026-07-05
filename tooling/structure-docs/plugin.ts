import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { Project } from 'ts-morph';
import type { Plugin } from 'vite';
import { extractComponentStructure, readThemeParts, readThemeSetter } from './extract';
import type { StructureMap } from './types';

const VIRTUAL_ID = 'virtual:svelai-structure';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const COMPONENTS_DIR = 'src/lib/components';

/**
 * Internal Vite plugin: serves `virtual:svelai-structure`, a map of each
 * themeable component's rendered markup tree (from its `.svelte`), annotated
 * with slot insertion points and theme parts (from its `*.theme.ts`). Keyed by
 * component name. Never packaged - dev/docs only.
 */
export function svelaiStructureDocs(): Plugin {
	let root = process.cwd();
	let project: Project | null = null;
	let cachedMap: StructureMap | null = null;

	function getProject(): Project {
		return (project ??= new Project({ skipAddingFilesFromTsConfig: true }));
	}

	function buildMap(): StructureMap {
		if (cachedMap) return cachedMap;
		const proj = getProject();
		const componentsRoot = resolve(root, COMPONENTS_DIR);
		const importMap = buildImportMap(root);
		const map: StructureMap = {};

		for (const themeFile of findThemeFiles(componentsRoot)) {
			const svelteFile = findMainSvelte(themeFile);
			if (!svelteFile) continue;
			const name = basename(svelteFile).slice(0, -'.svelte'.length);
			try {
				const parts = readThemeParts(proj, themeFile);
				const source = readFileSync(svelteFile, 'utf8');
				const setter = readThemeSetter(proj, themeFile);
				const importPath = importMap.get(relative(componentsRoot, dirname(svelteFile)));
				map[name] = {
					...extractComponentStructure(source, name, parts),
					...(setter && { setter }),
					...(importPath && { importPath })
				};
			} catch (error) {
				// Skip a single unparseable component (surface it) rather than fail the build.
				console.warn(`[svelai-structure] skipped ${name}: ${(error as Error).message}`);
			}
		}
		cachedMap = map;
		return map;
	}

	return {
		name: 'svelai-structure-docs',
		configResolved(config) {
			root = config.root;
		},
		resolveId(id) {
			if (id === VIRTUAL_ID) return RESOLVED_ID;
		},
		load(id) {
			if (id !== RESOLVED_ID) return;
			return `export default ${JSON.stringify(buildMap())};`;
		},
		handleHotUpdate(ctx) {
			if (!ctx.file.endsWith('.svelte') && !ctx.file.endsWith('.theme.ts')) return;
			if (project) project.getSourceFile(ctx.file)?.refreshFromFileSystemSync();
			cachedMap = null;

			const module = ctx.server.moduleGraph.getModuleById(RESOLVED_ID);
			if (module) {
				ctx.server.moduleGraph.invalidateModule(module);
				return [module];
			}
		}
	};
}

/**
 * Map each component directory (relative to the components root, e.g. "Button",
 * "Form/Combobox") to its published import path (e.g. "svelai/button"), read from
 * `package.json` `exports`. Lets the docs show a copy-pasteable, correct import.
 */
function buildImportMap(root: string): Map<string, string> {
	const map = new Map<string, string>();
	const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
		name?: string;
		exports?: Record<string, { svelte?: string; default?: string } | string>;
	};
	if (!pkg.name || !pkg.exports) return map;

	for (const [subpath, target] of Object.entries(pkg.exports)) {
		const entry = typeof target === 'string' ? target : (target.svelte ?? target.default);
		const dir = entry?.match(/^\.\/dist\/components\/(.+)\/index\.js$/)?.[1];
		// Keep the first (canonical) subpath when several alias the same directory.
		if (dir && !map.has(dir)) map.set(dir, pkg.name + subpath.slice(1));
	}
	return map;
}

/** All `*.theme.ts` files under the components tree. */
function findThemeFiles(dir: string): string[] {
	return readdirSync(dir, { recursive: true, encoding: 'utf8' })
		.filter((entry) => entry.endsWith('.theme.ts'))
		.map((entry) => join(dir, entry));
}

/**
 * The main `.svelte` beside a theme file: `accordion.theme.ts` -> `Accordion.svelte`
 * (case-insensitive basename match). Skips subcomponents with their own themes.
 */
function findMainSvelte(themeFile: string): string | undefined {
	const base = basename(themeFile).replace(/\.theme\.ts$/, '').toLowerCase();
	const dir = dirname(themeFile);
	const sibling = readdirSync(dir).find(
		(file) => file.endsWith('.svelte') && file.slice(0, -'.svelte'.length).toLowerCase() === base
	);
	return sibling ? join(dir, sibling) : undefined;
}
