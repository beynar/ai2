import type { DocumentSearchMatch } from './documentViewer.props.js';
import { getOoxmlUnitCount, getOoxmlUnitText } from './ooxmlAdapter.js';
import type { DocumentViewerState, SurfaceSearchState } from './documentViewer.state.svelte.js';

const countOccurrences = (text: string, query: string) => {
	const matches: number[] = [];
	let offset = 0;
	for (;;) {
		const index = text.indexOf(query, offset);
		if (index === -1) return matches;
		matches.push(index);
		offset = index + Math.max(1, query.length);
	}
};

const matchPreview = (text: string, index: number, length: number) =>
	text.slice(Math.max(0, index - 28), Math.min(text.length, index + length + 28)).trim();

export class DocumentSearch {
	query = $state('');
	matches = $state<DocumentSearchMatch[]>([]);
	activeMatch = $state(-1);

	private searchToken = 0;

	constructor(private readonly viewer: DocumentViewerState) {}

	search = async (query: string) => {
		this.query = query;
		const needle = query.trim().toLowerCase();
		const model = this.viewer.model;
		if (!needle || !model) {
			this.clear();
			return;
		}
		const token = ++this.searchToken;
		const surface = this.viewer.getSurfaceController();
		if (surface?.search) {
			const state = await surface.search(query);
			if (token === this.searchToken) this.applySurfaceSearch(state);
			return;
		}

		let matches: DocumentSearchMatch[] = [];
		if (model.kind === 'ooxml') {
			const texts = await Promise.all(
				Array.from({ length: getOoxmlUnitCount(model) }, (_, index) =>
					getOoxmlUnitText(model, index)
				)
			);
			if (token !== this.searchToken) return;
			matches = texts.flatMap((text, index) =>
				countOccurrences(text.toLowerCase(), needle).map((offset) => ({
					unit: index + 1,
					text: matchPreview(text, offset, needle.length)
				}))
			);
		} else if (model.kind === 'spreadsheet') {
			matches = model.sheets.flatMap((spreadsheet, sheetIndex) =>
				Array.from(spreadsheet.cells.values()).flatMap((cell) =>
					cell.text.toLowerCase().includes(needle)
						? [{ unit: sheetIndex + 1, text: cell.text, row: cell.row, column: cell.column }]
						: []
				)
			);
		} else if (model.kind === 'legacy') {
			matches = model.units.flatMap((unit, index) => {
				const text = `${unit.title ?? ''}\n${unit.text}`;
				return countOccurrences(text.toLowerCase(), needle).map((offset) => ({
					unit: index + 1,
					text: matchPreview(text, offset, needle.length)
				}));
			});
		}
		if (token !== this.searchToken) return;
		this.matches = matches;
		this.activeMatch = matches.length ? 0 : -1;
		if (matches.length) this.activateMatch(0);
	};

	next = async () => {
		const surface = this.viewer.getSurfaceController();
		if (surface?.nextMatch) {
			this.applySurfaceSearch(surface.nextMatch());
			return;
		}
		if (this.matches.length) this.activateMatch((this.activeMatch + 1) % this.matches.length);
	};

	previous = async () => {
		const surface = this.viewer.getSurfaceController();
		if (surface?.previousMatch) {
			this.applySurfaceSearch(surface.previousMatch());
			return;
		}
		if (this.matches.length) {
			this.activateMatch((this.activeMatch - 1 + this.matches.length) % this.matches.length);
		}
	};

	clear = () => {
		this.cancel();
		this.query = '';
		this.matches = [];
		this.activeMatch = -1;
		this.viewer.getSurfaceController()?.clearSearch?.();
	};

	cancel = () => {
		this.searchToken++;
	};

	private applySurfaceSearch = (state: SurfaceSearchState) => {
		this.matches = state.matches;
		this.activeMatch = state.activeMatch;
	};

	private activateMatch = (index: number) => {
		this.activeMatch = index;
		const match = this.matches[index];
		if (!match) return;
		if (this.viewer.unit === 'sheet') this.viewer.setSheet(match.unit);
		else this.viewer.goTo(match.unit);
	};
}
