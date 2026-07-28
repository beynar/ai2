export const overviewCode = [
	'<script lang="ts">',
	"  import { GanttChart, type GanttDependencyCreationRequest, type GanttTask } from 'svelai/gantt-chart';",
	'  let tasks = $state<GanttTask[]>(projectTasks);',
	'  const createDependency = (request: GanttDependencyCreationRequest) => ({',
	'    id: crypto.randomUUID(),',
	'    fromTaskId: request.fromTaskId,',
	'    toTaskId: request.toTaskId,',
	'    type: request.type',
	'  });',
	'</script>',
	'',
	'<GanttChart',
	'  bind:tasks',
	'  {createDependency}',
	'  timeZone="Europe/Paris"',
	'  class="h-[36rem]"',
	'/>'
].join('\n');
