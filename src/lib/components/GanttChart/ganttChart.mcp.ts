export const ganttChartDescription = `
# GanttChart

GanttChart is Svelai's typed project-scheduling surface for Svelte 5. It combines one hierarchical, virtualized tree grid with a synchronized, horizontally windowed time pane. It is a controlled component: task, dependency, and assignment definitions remain application-owned, while resolved WBS, summary spans/progress, durations, slack, critical state, constraint violations, and workload are exposed separately.

## Import

~~~svelte
<script lang="ts">
	import {
		GanttChart,
		type GanttDependency,
		type GanttDependencyCreationRequest,
		type GanttTask
	} from 'svelai/gantt-chart';

	let tasks = $state<GanttTask[]>([
		{ id: 'plan', title: 'Plan', type: 'summary' },
		{
			id: 'design',
			parentId: 'plan',
			title: 'Design',
			start: new Date('2026-07-27T07:00:00.000Z'),
			end: new Date('2026-07-30T15:00:00.000Z'),
			progress: 0.4
		}
	]);
	let dependencies = $state<GanttDependency[]>([]);
	let nextDependencyId = 0;

	function createDependency(request: GanttDependencyCreationRequest): GanttDependency {
		nextDependencyId += 1;
		return {
			id: \`dependency-\${nextDependencyId}\`,
			fromTaskId: request.fromTaskId,
			toTaskId: request.toTaskId,
			type: request.type
		};
	}
</script>

<GanttChart
	bind:tasks
	bind:dependencies
	{createDependency}
	timeZone="Europe/Paris"
	class="h-[36rem]"
/>
~~~

The required timeZone must be UTC or an explicit IANA zone. Contained scrolling needs a definite height. GanttChart never infers a browser or server zone.

## Domain and controlled state

- GanttTask<TTaskFields> preserves consumer fields while reserving owned keys. A normal task is scheduled with start < end or unscheduled with both endpoints absent. A milestone requires equal endpoints. A summary forbids consumer dates and derives its visible descendant span and weighted progress. Optional segments are ordered, non-overlapping intervals inside one logical task span.
- GanttDependency<TDependencyFields> supports finish-start, start-start, finish-finish, and start-finish links plus signed minute/hour/day/week lag. Duplicate ids, missing endpoints, self-links, duplicate semantic links, and cycles throw GanttChartError.
- GanttResource<TResourceFields>, GanttAssignment<TAssignmentFields>, and GanttCalendar are explicit typed inputs. Assignment units are 0 through 1. Calendars use IANA zones, weekday intervals, and civil-date exceptions.
- tasks, dependencies, assignments, expandedTaskIds, selection, and zoom are bindable. resources and calendars are immutable inputs. Every accepted mutation publishes a fresh outer array and fresh changed objects.
- Selection is empty, a task, a dependency, or a tree cell. Query resolved nodes for WBS, derived summary values, elapsed/working duration, earliest/latest dates, total/free slack, critical state, and violations; those values never mutate definitions.

Consumer field generics appear in props, columns, snippets, proposals, hooks, callbacks, change records, resolved nodes, and API queries/mutations. A custom field cannot shadow an owned key, and index-signature custom objects are rejected by the type surface.

## Scheduling

Pass calendars and projectCalendarId to use working-time arithmetic; task calendarId overrides the project calendar. Set autoSchedule to forward accepted changes through successors while preserving working duration. With autoSchedule disabled, moveDependencies optionally carries successors during a task move. Constraints support as-soon-as-possible, start-no-earlier-than, start-no-later-than, finish-no-earlier-than, finish-no-later-than, must-start-on, and must-finish-on.

A leaf with progress === 1 remains in dependency and critical-path analysis and its actual dates constrain successors, but forward scheduling never moves it. Conflicts are exposed as typed violations. Resource calendars affect diagnostic workload only; GanttChart never performs automatic resource leveling.

Use display to toggle criticalPath, baselines, deadlines, constraints, nonWorkingTime, and workload. Resolved analysis and getScheduleAnalysis expose critical task/link ids and violations. getWorkload returns capacity-aware buckets for all resources or an explicit range.

## Layout and presentation

- Built-in zoom levels are hour, day, week, month, quarter, and year. zoomLevels orders enabled ids; scales adds typed custom unit/step/minimum-width/header formatters.
- initialScrollDate, validRange, showTodayIndicator, showWeekends, holidays, rowHeight, overscan, scrollMode, scrollbars, stickyHeader, showHeader, showGrid, gridWidth, minGridWidth, and maxGridWidth configure the split shell without changing the domain model. Move, resize, and range snapping defaults to 1 minute at hour, 15 minutes at day, 1 hour at week, 4 hours at month, 1 day at quarter, and 3 days at year; custom scales derive a step from their lower unit, while snapDuration supplies a fixed consumer override.
- The default WBS, title, start, end, duration, progress, and resources columns accept typed visibility, size, alignment, sort, filter, value, compare, and edit behavior. Custom editable columns provide applyEdit.
- Tasks render leaf/summary/milestone shapes, progress and expected progress, segments, baseline, deadline, labels, continuations, tooltips, non-working shade, project/today lines, constraints, critical state, and SVG dependency connectors.
- resourceView filters or groups rows by resource and sets the compact workload height. resourceAssignments and workloadCell snippets receive typed custom fields and over-allocation state.

## Interactions and immutable transactions

The interactions policy independently enables task move, start/end resize, progress resize, dependency creation, row reorder, indent/outdent, empty-range creation, keyboard, touch, clipboard, and history. loading blocks content mutation but preserves safe navigation; disabled blocks both.

Every UI or API mutation constructs a proposal, validates it, calls canUpdateTask/canUpdateDependency/canUpdateAssignment, calls the corresponding synchronous update hook, revalidates any adjusted record, then publishes immutable collections. onTasksChange, onDependenciesChange, and onAssignmentsChange receive the prior/current collections, affected ids, source/kind, and a guarded one-shot revert. Do not swallow persistence errors: call change.revert() only if desired, then handle or rethrow the error at the application boundary.

Pointer-created links require createDependency(request), because GanttChart cannot fabricate ids or required custom fields. Clipboard paste requires getPasteId(request). It copies one selected standalone task subtree, remaps internal dependencies and assignments, and explicitly omits external dependency links.

## Keyboard and accessibility

Tree cells, task controls, and dependency controls use roving focus across virtual rows. Arrow keys navigate hierarchy and chronology; RTL mirrors physical movement without reversing chronological intent. M, S, E, and P enter task move, start-resize, end-resize, and progress modes. D or Shift+D starts dependency creation; R starts empty-range creation. Enter commits and Escape cancels. Alt+Shift+Arrow keys reorder or change hierarchy. Delete/Backspace requests deletion. Mod+C/Mod+V copy and paste; Mod+Z, Mod+Shift+Z, and Mod+Y use bounded stale-safe history.

Treegrid/timeline roles, expanded/selected/grabbed state, focus restoration, 24px handle hit targets, high contrast, reduced motion, touch long-press/tolerance, and live announcements remain component-owned. Snippets cannot replace these semantic or interaction owners.

## Snippets

GanttChart provides typed Svelte 5 snippets for header, actions, gridHeader, columnHeader, treeCell, taskRow, timeHeaderUpper, timeHeaderLower, task, summaryTask, milestone, taskLabel, taskTooltip, dependencyTooltip, progress, baseline, deadline, nonWorkingTime, resourceAssignments, workloadCell, dragPreview, empty, and loadingContent. Payloads include ready-made defaultContent where meaningful. Header payloads expose owned today, fit-project, zoom, and action snippets.

## Imperative API

Bind the component instance as GanttChartApi. Real methods include:

- Navigation: fitProject, zoomIn, zoomOut, setZoom, scrollToDate, scrollToTask, getVisibleRange.
- Queries: getTask, getResolvedTask, getVisibleTasks, getDependency, getAssignment, getResources, getScheduleAnalysis, getWorkload.
- Hierarchy/selection: expandTask, collapseTask, toggleTask, expandAll, collapseAll, select, clearSelection.
- Mutations: add/update/remove task, dependency, and assignment.
- Workflow: copySelection, paste, undo, redo, canUndo, canRedo, cancelInteraction.

## Application-owned editors and non-goals

GanttChart does not own task creation/edit dialogs. Compose onTaskDoubleClick or onEmptyRangeSelect with Svelai Dialog and Form controls, validate the definition, then publish a fresh controlled array or call the API. Network fetching, persistence, retries, collaboration, recurrence, automatic resource leveling, proprietary import/export, and deployment are outside this package.
`;
