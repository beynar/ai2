<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import GanttChartGuide from './GanttChartGuide.svelte';
	import GanttChartOverviewDemo from './GanttChartOverviewDemo.svelte';
	import { overviewCode } from './codeSnippets.js';
</script>

<DocPage
	title="Gantt chart"
	subtitle="A typed project-scheduling surface with a hierarchical task grid, explicit working calendars, dependency analysis, and immutable controlled state."
	component="GanttChart"
	features={[
		'Hierarchical task definitions with derived summaries and WBS',
		'Explicit IANA zones, working calendars, constraints, and dependency DAG validation',
		'Critical-path, total/free slack, and resource workload analysis',
		'Bindable tasks, dependencies, assignments, expansion, selection, and zoom',
		'Svelai theme and snippet composition inside owned semantics',
		'SSR-safe split shell with one vertical scroll owner'
	]}
>
	<GanttChartGuide />

	<ComponentCard
		title="Controlled project shell"
		description="The tree and time panes share one resolved hierarchy, expansion model, row height, selection, and vertical scroll owner. Resize the inline splitter or change the zoom level without mutating task definitions."
		code={overviewCode}
		class="min-h-0 items-stretch p-3 md:p-5"
	>
		<GanttChartOverviewDemo />
	</ComponentCard>
</DocPage>
