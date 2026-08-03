import { dot, link, text } from '@tanstack/charts';
import { compileColor } from './chart.channels.js';
import type { CompiledMark } from './chart.cartesian.js';
import type { ChartNetworkRelationMark, ChartTreeRelationMark } from './chart.props.js';
import { withoutTooltipPoints } from './chart.mark.js';
import type {
	RelationLabelConfiguration,
	RelationLinkDatum,
	RelationNodeDatum
} from './chart.relation.data.js';

export function compileRelationPointMarks<TRow extends object>(
	nodes: readonly RelationNodeDatum<TRow>[],
	links: readonly RelationLinkDatum[],
	mark: ChartTreeRelationMark<TRow> | ChartNetworkRelationMark<TRow>,
	labels: RelationLabelConfiguration<TRow>,
	path: string
): readonly CompiledMark[] {
	const linkMark = link(links, {
		id: `${mark.id ?? path}:links`,
		x1: 'x1',
		y1: 'y1',
		x2: 'x2',
		y2: 'y2',
		key: 'identity',
		stroke: compileColor(mark.links?.stroke ?? 'neutral'),
		strokeOpacity: mark.links?.strokeOpacity ?? 0.35,
		strokeWidth: (relation) => relation.width ?? 1.5
	});
	const nodeMark = dot(nodes, {
		id: `${mark.id ?? path}:nodes`,
		x: 'x',
		y: 'y',
		z: 'group',
		color: 'group',
		key: 'identity',
		r: mark.nodeRadius ?? 5,
		fill: mark.nodes?.fill ? compileColor(mark.nodes.fill) : undefined,
		fillOpacity: mark.nodes?.fillOpacity,
		stroke: mark.nodes?.stroke ? compileColor(mark.nodes.stroke) : undefined,
		strokeWidth: mark.nodes?.strokeWidth
	});
	if (!labels.enabled) return [linkMark, nodeMark];
	const labelMark = text(nodes, {
		id: `${mark.id ?? path}:labels`,
		x: 'labelX',
		y: 'labelY',
		text: 'label',
		color: 'group',
		key: 'identity',
		anchor: (node) => node.labelAnchor ?? 'middle',
		fill: labels.color ? compileColor(labels.color) : undefined,
		fontSize: labels.fontSize,
		fontWeight: labels.fontWeight
	});
	return [linkMark, nodeMark, withoutTooltipPoints(labelMark)];
}
