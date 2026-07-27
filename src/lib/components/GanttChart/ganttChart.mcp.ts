export const ganttChartDescription = `
# GanttChart

GanttChart is Svelai's typed project-scheduling surface for Svelte 5. It combines a controlled hierarchical task grid with a synchronized time pane. Consumer task, dependency, assignment, resource, and calendar definitions remain immutable; derived WBS, summary spans, progress, working duration, slack, and critical state are exposed through resolved task nodes.

## Import

~~~svelte
<script lang="ts">
	import { GanttChart, type GanttTask } from 'svelai/gantt-chart';

	let tasks = $state<GanttTask[]>([
		{
			id: 'design',
			title: 'Design',
			start: new Date('2026-07-27T08:00:00.000Z'),
			end: new Date('2026-07-30T16:00:00.000Z'),
			progress: 0.4
		}
	]);
</script>

<GanttChart bind:tasks timeZone="Europe/Paris" class="h-[36rem]" />
~~~

The timeZone prop is required and must be UTC or an explicit IANA zone. Contained scrolling needs a definite height. GanttChart never infers a server or browser zone.

## Controlled model

- tasks, dependencies, and assignments are bindable immutable arrays.
- resources and calendars are immutable inputs.
- expandedTaskIds, selection, and zoom are bindable controlled state.
- task summaries derive their schedule and progress from descendants; consumer summary dates are rejected.
- unscheduled tasks remain in the tree without a taskbar. Milestones require equal start and end instants.
- graph validation rejects duplicate ids, missing references, self-links, duplicate semantic links, and cycles with GanttChartError.

## Current package surface

The package includes the pure hierarchy, calendar, dependency scheduling, constraint, critical-path, slack, and workload engine; controlled shell state; theme API; and SSR-safe split shell. Content snippets render inside component-owned semantic wrappers. Mutation, pointer, dependency editing, clipboard, and history methods surface typed invalid-operation errors until their corresponding interaction owner is present; they never return fake success.

Use callbacks to compose an application-owned editor from Svelai Dialog and Form inputs. GanttChart does not own a task editor dialog, persistence, network requests, automatic resource leveling, or proprietary import/export.
`;
