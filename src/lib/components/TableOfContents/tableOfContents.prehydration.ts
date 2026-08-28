import type { TableOfContentsItem, TableOfContentsLevel } from './tableOfContents.props.js';

type TableOfContentsPrehydrationOptions = {
	listId: string;
	railId: string;
	targetSelector?: string;
	headingSelector?: string;
	items?: readonly TableOfContentsItem[];
	offsets: Partial<Record<TableOfContentsLevel, number>>;
	linePositions: Partial<Record<TableOfContentsLevel, { x: number; connectorEnd: number }>>;
	markerRadii: Partial<Record<TableOfContentsLevel, number>>;
	indentRadius: number;
	sizeScale: number;
	showRail: boolean;
	showConnectors: boolean;
	markerVisibility: 'none' | 'active' | 'always';
	itemClass: string;
	linkClass: string;
	trackClass: string;
	markerClass: string;
};

export function createTableOfContentsPrehydrationScript(
	options: TableOfContentsPrehydrationOptions
): string {
	const serializedOptions = serializeForInlineScript(options);

	return `(() => {
	const options = ${serializedOptions};
	const svgNamespace = 'http://www.w3.org/2000/svg';
	const point = (value) => Number(value.toFixed(2)).toString();
	const buildRailPath = (positions) => {
		const radius = Number.isFinite(options.indentRadius)
			? Math.max(0, options.indentRadius) * options.sizeScale
			: 0;
		const first = positions[0];
		const path = [
			'M' + point(first.x) + ' ' + point(first.top),
			'L' + point(first.x) + ' ' + point(first.bottom)
		];

		for (let index = 1; index < positions.length; index += 1) {
			const previous = positions[index - 1];
			const current = positions[index];
			const gap = Math.max(0, current.top - previous.bottom);

			if (current.x === previous.x || gap === 0) {
				path.push('L' + point(current.x) + ' ' + point(current.top));
				path.push('L' + point(current.x) + ' ' + point(current.bottom));
				continue;
			}

			const direction = Math.sign(current.x - previous.x);
			const midpoint = previous.bottom + gap / 2;
			const bendRadius = Math.min(
				radius,
				Math.abs(current.x - previous.x) / 2,
				gap / 2
			);

			path.push('L' + point(previous.x) + ' ' + point(midpoint - bendRadius));
			if (bendRadius > 0) {
				path.push(
					'Q' + point(previous.x) + ' ' + point(midpoint) + ' ' +
					point(previous.x + direction * bendRadius) + ' ' + point(midpoint)
				);
			}
			path.push(
				'L' + point(current.x - direction * bendRadius) + ' ' + point(midpoint)
			);
			if (bendRadius > 0) {
				path.push(
					'Q' + point(current.x) + ' ' + point(midpoint) + ' ' +
					point(current.x) + ' ' + point(midpoint + bendRadius)
				);
			}
			path.push('L' + point(current.x) + ' ' + point(current.top));
			path.push('L' + point(current.x) + ' ' + point(current.bottom));
		}

		return path.join(' ');
	};
	const renderRail = (list, records) => {
		const rail = document.getElementById(options.railId);
		if (!(rail instanceof SVGSVGElement)) return;

		const listRect = list.getBoundingClientRect();
		const links = new Map(
			Array.from(list.querySelectorAll('a[data-toc-id]')).map((link) => [
				link.dataset.tocId,
				link
			])
		);
		const positions = records.flatMap((record) => {
			const link = links.get(record.headingId);
			if (!link) return [];

			const rect = link.getBoundingClientRect();
			const styles = getComputedStyle(link);
			const parsedPaddingTop = Number.parseFloat(styles.paddingTop);
			const parsedPaddingBottom = Number.parseFloat(styles.paddingBottom);
			const paddingTop = Number.isFinite(parsedPaddingTop) ? parsedPaddingTop : 0;
			const paddingBottom = Number.isFinite(parsedPaddingBottom) ? parsedPaddingBottom : 0;
			const top = rect.top - listRect.top + list.scrollTop + paddingTop;
			const bottom = rect.bottom - listRect.top + list.scrollTop - paddingBottom;
			if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom <= top) return [];

			return [{
				level: record.level,
				top: Math.max(0, top),
				bottom: Math.max(1, bottom),
				center: (Math.max(0, top) + Math.max(1, bottom)) / 2,
				x: record.x,
				connectorStart: record.x,
				connectorEnd: record.connectorEnd
			}];
		});

		if ((listRect.width === 0 && listRect.height === 0) || !positions.length) {
			if (rail.dataset.prehydrationSignature === 'empty') return;
			rail.replaceChildren();
			rail.removeAttribute('width');
			rail.removeAttribute('height');
			rail.removeAttribute('viewBox');
			rail.dataset.prehydrationSignature = 'empty';
			return;
		}

		const height = Math.max(1, ...positions.map((position) => position.bottom));
		const width =
			Math.max(...positions.map((position) => position.connectorEnd)) + 2 * options.sizeScale;
		const pathData = buildRailPath(positions);
		const connectorGeometry = options.showConnectors
			? positions.map((position) => [
				position.connectorStart,
				position.connectorEnd,
				position.center
			])
			: [];
		const markerGeometry = options.markerVisibility === 'always'
			? positions.flatMap((position) => {
				const radius = options.markerRadii[position.level];
				if (typeof radius !== 'number' || radius <= 0) return [];

				return [[position.x, position.center, radius, position.level]];
			})
			: [];
		const signature = JSON.stringify([
			width,
			height,
			options.showRail ? pathData : null,
			connectorGeometry,
			markerGeometry
		]);
		if (rail.dataset.prehydrationSignature === signature) return;

		const children = [];
		if (options.showRail) {
			const path = document.createElementNS(svgNamespace, 'path');
			path.setAttribute('d', pathData);
			path.setAttribute('fill', 'none');
			path.setAttribute('stroke-linecap', 'round');
			path.setAttribute('stroke-linejoin', 'round');
			path.setAttribute('stroke-width', String(options.sizeScale));
			path.setAttribute('vector-effect', 'non-scaling-stroke');
			path.setAttribute('class', options.trackClass);
			children.push(path);
		}
		if (options.showConnectors) {
			for (const position of positions) {
				const line = document.createElementNS(svgNamespace, 'line');
				line.setAttribute('x1', String(position.connectorStart));
				line.setAttribute('x2', String(position.connectorEnd));
				line.setAttribute('y1', String(position.center));
				line.setAttribute('y2', String(position.center));
				line.setAttribute('stroke-linecap', 'round');
				line.setAttribute('stroke-width', String(options.sizeScale));
				line.setAttribute('vector-effect', 'non-scaling-stroke');
				line.setAttribute('class', options.trackClass);
				children.push(line);
			}
		}
		if (options.markerVisibility === 'always') {
			for (const position of positions) {
				const radius = options.markerRadii[position.level];
				if (typeof radius !== 'number' || radius <= 0) continue;

				const marker = document.createElementNS(svgNamespace, 'circle');
				marker.setAttribute('data-level', String(position.level));
				marker.setAttribute('cx', String(position.x));
				marker.setAttribute('cy', String(position.center));
				marker.setAttribute('r', String(radius));
				marker.setAttribute('stroke-width', String(1.5 * options.sizeScale));
				marker.setAttribute('vector-effect', 'non-scaling-stroke');
				marker.setAttribute('class', options.markerClass);
				children.push(marker);
			}
		}

		rail.setAttribute('width', String(width));
		rail.setAttribute('height', String(height));
		rail.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
		rail.replaceChildren(...children);
		rail.dataset.prehydrated = 'true';
		rail.dataset.prehydrationSignature = signature;
	};
	const getProvidedRecords = () => {
		if (!Array.isArray(options.items)) return null;

		return options.items.flatMap((item) => {
			const offset = options.offsets[item.level];
			const linePosition = options.linePositions[item.level];
			if (typeof offset !== 'number' || !linePosition) return [];

			return [{
				headingId: item.id,
				level: item.level,
				offset,
				title: item.title,
				x: linePosition.x,
				connectorEnd: linePosition.connectorEnd
			}];
		});
	};
	const renderTableOfContents = () => {
		const list = document.getElementById(options.listId);
		if (!(list instanceof HTMLOListElement)) return false;

		const providedRecords = getProvidedRecords();
		if (providedRecords) {
			renderRail(list, providedRecords);
			return true;
		}

		if (!options.targetSelector || !options.headingSelector) return false;
		const target = document.querySelector(options.targetSelector);
		if (!(target instanceof HTMLElement)) return false;

		const headings = target.querySelectorAll(options.headingSelector);
		const usedIds = new Set();
		const records = [];

		for (const heading of headings) {
			if (heading.closest('[hidden], [aria-hidden="true"], [inert]')) continue;

			const title = (heading.textContent || '').replace(/\\s+/g, ' ').trim();
			if (!title) continue;

			const explicitId = heading.id.trim();
			let headingId = explicitId;
			if (explicitId) {
				const owner = document.getElementById(explicitId);
				if (usedIds.has(explicitId) || (owner && owner !== heading)) continue;
			} else {
				const slug = title
					.normalize('NFKD')
					.replace(/[\\u0300-\\u036f]/g, '')
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/^-|-$/g, '');
				const baseId = 'toc-' + (slug || 'section');
				headingId = baseId;
				let suffix = 2;
				while (usedIds.has(headingId) || document.getElementById(headingId)) {
					headingId = baseId + '-' + suffix;
					suffix += 1;
				}
				heading.id = headingId;
			}

			const level = Number(heading.tagName.slice(1));
			const offset = options.offsets[level];
			const linePosition = options.linePositions[level];
			if (!headingId || typeof offset !== 'number' || !linePosition) continue;
			usedIds.add(headingId);
			records.push({
				headingId,
				level,
				offset,
				title,
				x: linePosition.x,
				connectorEnd: linePosition.connectorEnd
			});
		}

		const signature = JSON.stringify(records);
		if (list.dataset.prehydrationSignature !== signature) {
			const fragment = document.createDocumentFragment();
			for (const record of records) {

				const item = document.createElement('li');
				item.setAttribute('data-slot', 'table-of-contents-item');
				item.className = options.itemClass;

				const link = document.createElement('a');
				link.setAttribute('data-slot', 'table-of-contents-link');
				link.setAttribute('data-toc-id', record.headingId);
				link.setAttribute('data-level', String(record.level));
				link.setAttribute('href', '#' + encodeURIComponent(record.headingId));
				link.className = options.linkClass;
				link.style.paddingInlineStart = record.offset + 'px';
				link.textContent = record.title;

				item.append(link);
				fragment.append(item);
			}

			list.replaceChildren(fragment);
			list.dataset.prehydrated = 'true';
			list.dataset.prehydrationSignature = signature;
		}
		renderRail(list, records);
		return true;
	};

	if (document.readyState !== 'loading') {
		if (renderTableOfContents()) return;
		const observer = new MutationObserver(() => {
			if (!renderTableOfContents()) return;
			observer.disconnect();
		});
		observer.observe(document.documentElement, { childList: true, subtree: true });
		return;
	}

	const observer = new MutationObserver(() => {
		renderTableOfContents();
	});
	const finalize = () => {
		if (document.readyState === 'loading') return;
		renderTableOfContents();
		observer.disconnect();
		document.removeEventListener('readystatechange', finalize);
	};
	observer.observe(document.documentElement, { childList: true, subtree: true });
	document.addEventListener('readystatechange', finalize);
	renderTableOfContents();
})();`;
}

function serializeForInlineScript(value: unknown): string {
	const serialized = JSON.stringify(value);
	if (serialized === undefined) throw new TypeError('Unable to serialize pre-hydration options');

	return serialized
		.replace(/</g, '\\u003c')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');
}
