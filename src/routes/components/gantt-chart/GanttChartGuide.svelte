<script lang="ts">
	const guides = [
		{
			title: 'Controlled definitions and resolved state',
			body: 'tasks, dependencies, and assignments are bindable immutable collections. resources and calendars are immutable inputs. Summaries derive their span and weighted progress from descendants; WBS, working duration, slack, critical state, and violations live on resolved nodes instead of mutating consumer records.'
		},
		{
			title: 'Explicit scheduling time',
			body: 'timeZone is required. Project, task, and resource calendars use explicit IANA zones, half-open working intervals, and civil-date exceptions. Unscheduled tasks stay visible without a bar, while milestones require equal start and end instants.'
		},
		{
			title: 'Application-owned editing',
			body: 'GanttChart does not own create or edit dialogs. Compose task callbacks with Svelai Dialog and Form controls, validate the domain record, then publish a fresh controlled array. Persistence and retry policy remain at the application boundary.'
		},
		{
			title: 'Composition and theme',
			body: 'Header, task, timeline, tooltip, progress, project-element, resource, loading, and empty snippets customize content inside component-owned semantics. Use the ganttChart theme key and CSS metric variables for geometry without replacing selection, focus, hit targets, or announcements.'
		}
	];
</script>

<section aria-labelledby="gantt-chart-contract">
	<h2 id="gantt-chart-contract" class="text-neutral text-xl font-semibold">Integration contract</h2>
	<p class="text-neutral/60 mt-2 max-w-4xl text-sm leading-6">
		All scheduled values are absolute <code>Date</code> instants and every range is half-open. Task,
		dependency, resource, assignment, and calendar identifiers must be stable and unique. Invalid
		hierarchies, graph cycles, missing references, contradictory schedules, and stale transactions
		surface as <code>GanttChartError</code>; the component never substitutes plausible data.
	</p>

	<div class="mt-5 grid gap-4 md:grid-cols-2">
		{#each guides as guide (guide.title)}
			<section class="border-neutral-muted bg-surface rounded-xl border p-4">
				<h3 class="text-neutral font-semibold">{guide.title}</h3>
				<p class="text-neutral/65 mt-2 text-sm leading-6">{guide.body}</p>
			</section>
		{/each}
	</div>
</section>
