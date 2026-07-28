export const overviewCode = [
	'<script lang="ts">',
	"  import { GanttChart, type GanttDependency, type GanttTask } from 'svelai/gantt-chart';",
	'  let tasks = $state<GanttTask[]>([',
	"    { id: 'plan', title: 'Plan', type: 'summary' },",
	"    { id: 'design', parentId: 'plan', title: 'Design', start, end, progress: 0.4 }",
	'  ]);',
	'  let dependencies = $state<GanttDependency[]>([]);',
	'</script>',
	'',
	'<GanttChart',
	'  bind:tasks bind:dependencies',
	'  timeZone="Europe/Paris"',
	'  class="h-[36rem]"',
	'/>'
].join('\n');

export const hierarchyCode = [
	"type TaskFields = { owner: string; risk: 'low' | 'medium' | 'high' };",
	"const isRisk = (value: unknown): value is TaskFields['risk'] =>",
	"  value === 'low' || value === 'medium' || value === 'high';",
	"let expandedTaskIds = $state(['planning']);",
	'let columns: GanttColumnDefinition<TaskFields>[] = [',
	"  { id: 'wbs' },",
	"  { id: 'title', editable: true },",
	"  { id: 'owner', value: ({ node }) => node.task.owner },",
	"  { id: 'risk', sortable: true, editable: true,",
	'    value: ({ node }) => node.task.risk,',
	'    applyEdit: ({ node }, value) => {',
	"      if (!isRisk(value)) throw new Error('Invalid risk value');",
	'      return { ...node.task, risk: value };',
	'    } },',
	"  { id: 'progress' }",
	'];',
	'',
	'<GanttChart bind:tasks bind:expandedTaskIds {columns} timeZone="Europe/Paris" />'
].join('\n');

export const interactionsCode = [
	'<GanttChart',
	'  bind:this={chart} bind:tasks bind:dependencies',
	'  timeZone="Europe/Paris" historyLimit={20}',
	'  getPasteId={({ kind, sourceId, copyIndex }) =>',
	'    `${kind}-${sourceId}-copy-${copyIndex}`}',
	'  onTasksChange={(nextTasks, change) => persist(nextTasks).catch((error) => {',
	'    change.revert();',
	'    throw error;',
	'  })}',
	'  onEmptyRangeSelect={(range) => openCreateDialog(range)}',
	'  class="h-[36rem]"',
	'/>'
].join('\n');

export const dependenciesCode = [
	'<GanttChart',
	'  bind:tasks bind:dependencies',
	'  {createDependency}',
	'  autoSchedule',
	'  display={{ criticalPath: true, constraints: true, baselines: true, deadlines: true }}',
	'  calendars={calendars}',
	'  projectCalendarId="project"',
	'  timeZone="Europe/Paris"',
	'  onScheduleViolations={(violations) => showViolations(violations)}',
	'/>'
].join('\n');

export const resourcesCode = [
	'type ResourceFields = { role: string };',
	"type AssignmentFields = { booking: 'confirmed' | 'tentative' };",
	'',
	'<GanttChart',
	'  bind:tasks bind:assignments {resources}',
	'  display={{ workload: true }}',
	'  resourceView={{ filterResourceIds, groupByResource: true, workloadHeight: 120 }}',
	'  calendars={calendars}',
	'  projectCalendarId="project"',
	'  timeZone="Europe/Paris"',
	'>',
	'  {#snippet resourceAssignments({ assignments, defaultContent })}',
	'    {@render defaultContent()}',
	"    {#if assignments.some((assignment) => assignment.booking === 'tentative')}",
	'      <span>tentative</span>',
	'    {/if}',
	'  {/snippet}',
	'</GanttChart>'
].join('\n');

export const customizationCode = [
	'<GanttChart bind:tasks timeZone="Europe/Paris" onTaskDoubleClick={openEditor}>',
	'  {#snippet header({ today, fitProject, zoomControl })}',
	'    {@render today()}{@render fitProject()}{@render zoomControl()}',
	'  {/snippet}',
	'  {#snippet task({ node })}',
	'    <span>{node.task.owner}</span>',
	'  {/snippet}',
	'</GanttChart>',
	'',
	'<Dialog bind:open={editorOpen} title="Edit task">',
	'  <TextInput bind:value={draftTitle} label="Task title" />',
	'  {#snippet footer()}',
	'    <Button onClick={saveTask}>Save task</Button>',
	'  {/snippet}',
	'</Dialog>'
].join('\n');

export const loadingRtlCode = [
	'<GanttChart',
	'  bind:tasks {loading}',
	'  dir="rtl" locale="ar"',
	'  calendars={newYorkCalendars}',
	'  projectCalendarId="new-york-project"',
	'  timeZone="America/New_York"',
	'  zoom="day"',
	'  class="h-[34rem]"',
	'/>'
].join('\n');

export const largeDataCode = [
	'const tasks: GanttTask[] = Array.from({ length: 5_000 }, (_, index) => ({',
	'  id: `task-${index}`,',
	'  title: `Work package ${index + 1}`,',
	'  start: getStart(index),',
	'  end: getEnd(index)',
	'}));',
	'',
	'<GanttChart',
	'  {tasks}',
	'  timeZone="UTC"',
	'  rowHeight={30}',
	'  overscan={6}',
	'  class="h-[34rem]"',
	'/>'
].join('\n');
