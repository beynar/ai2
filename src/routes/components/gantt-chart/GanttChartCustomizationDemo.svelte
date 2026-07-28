<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import { TextInput } from '$lib/components/Form/TextInput/index.js';
	import {
		GanttChart,
		type GanttResolvedTaskNode,
		type GanttTask
	} from '$lib/components/GanttChart/index.js';
	import { parisProjectCalendar } from './ganttChartDemoData.js';

	type TaskFields = { owner: string; discipline: 'design' | 'engineering' | 'research' };

	let editorOpen = $state(false);
	let editingTaskId = $state<string | null>(null);
	let draftTitle = $state<string | null>('');
	let tasks = $state<GanttTask<TaskFields>[]>([
		{
			id: 'research',
			title: 'Research synthesis',
			start: new Date('2026-08-03T07:00:00.000Z'),
			end: new Date('2026-08-06T15:00:00.000Z'),
			progress: 0.75,
			owner: 'Mina',
			discipline: 'research',
			color: 'purple'
		},
		{
			id: 'interface',
			title: 'Interface design',
			start: new Date('2026-08-07T07:00:00.000Z'),
			end: new Date('2026-08-12T15:00:00.000Z'),
			progress: 0.35,
			owner: 'Ada',
			discipline: 'design',
			color: '#d97706'
		},
		{
			id: 'implementation',
			title: 'Implementation',
			start: new Date('2026-08-13T07:00:00.000Z'),
			end: new Date('2026-08-21T15:00:00.000Z'),
			progress: 0.1,
			owner: 'Lin',
			discipline: 'engineering',
			color: 'blue'
		}
	]);

	function openEditor(node: GanttResolvedTaskNode<TaskFields>): void {
		editingTaskId = node.taskId;
		draftTitle = node.task.title;
		editorOpen = true;
	}

	function saveTask(): void {
		const title = draftTitle?.trim();
		if (!editingTaskId || !title) return;
		tasks = tasks.map((task) => (task.id === editingTaskId ? { ...task, title } : task));
		editorOpen = false;
	}
</script>

<GanttChart
	bind:tasks
	calendars={[parisProjectCalendar]}
	projectCalendarId={parisProjectCalendar.id}
	timeZone="Europe/Paris"
	initialScrollDate={new Date('2026-08-11T10:00:00.000Z')}
	onTaskDoubleClick={openEditor}
	class="h-[32rem] w-full"
>
	{#snippet header({ today, fitProject, zoomControl, actions, tasks: headerTasks })}
		<div class="flex w-full flex-wrap items-center justify-between gap-2 px-1">
			<div class="flex items-center gap-1">{@render today()}{@render fitProject()}</div>
			<p class="text-neutral/70 text-sm font-medium">{headerTasks.length} controlled definitions</p>
			<div class="flex items-center gap-1">{@render zoomControl()}{@render actions()}</div>
		</div>
	{/snippet}
	{#snippet actions({ api })}
		<Button size="small" variant="outline" onClick={() => api.fitProject()}>Frame plan</Button>
	{/snippet}
	{#snippet treeCell({ node, column, defaultContent })}
		{@render defaultContent()}
		{#if column.id === 'title'}
			<span class="text-neutral/45 ms-auto text-[0.65rem] uppercase">{node.task.discipline}</span>
		{/if}
	{/snippet}
	{#snippet task({ node })}
		<span class="truncate px-2 text-[0.7rem] font-semibold">{node.task.owner}</span>
	{/snippet}
	{#snippet taskTooltip({ node, defaultContent })}
		{@render defaultContent()}
		<p class="text-neutral/60 mt-1 text-xs">Owned by {node.task.owner} · {node.task.discipline}</p>
	{/snippet}
</GanttChart>

<Dialog
	bind:open={editorOpen}
	title="Edit task"
	description="The application owns this dialog and publishes a fresh task array."
>
	<div class="p-5">
		<TextInput bind:value={draftTitle} label="Task title" required />
	</div>
	{#snippet footer()}
		<Button variant="ghost" color="neutral" onClick={() => (editorOpen = false)}>Cancel</Button>
		<Button onClick={saveTask}>Save task</Button>
	{/snippet}
</Dialog>
