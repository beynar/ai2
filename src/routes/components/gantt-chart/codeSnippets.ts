export const overviewCode = [
	'<script lang="ts">',
	"  import { GanttChart, type GanttTask } from 'svelai/gantt-chart';",
	'  let tasks = $state<GanttTask[]>(projectTasks);',
	'</script>',
	'',
	'<GanttChart',
	'  bind:tasks',
	'  timeZone="Europe/Paris"',
	'  class="h-[36rem]"',
	'/>'
].join('\n');
