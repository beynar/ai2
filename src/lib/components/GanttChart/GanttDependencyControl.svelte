<script lang="ts" generics="TTaskFields extends object, TDependencyFields extends object">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import NumberInput from '$lib/components/Form/NumberInput/NumberInput.svelte';
	import Select from '$lib/components/Form/Select/Select.svelte';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import type { PopoverState } from '$lib/components/Popover/popover.state.svelte.js';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Snippet } from 'svelte';
	import type { GanttDependencyTooltipPayload } from './ganttChart.props.js';
	import type {
		GanttDependency,
		GanttDependencyGeometry,
		GanttLagUnit,
		GanttResolvedDependency
	} from './ganttChart.types.js';

	let {
		dependency,
		geometry,
		messages,
		disabled,
		isSelected,
		dependencyTooltip,
		onActivate,
		onDelete,
		onUpdate
	}: {
		dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>;
		geometry: GanttDependencyGeometry;
		messages: Messages;
		disabled: boolean;
		isSelected: boolean;
		dependencyTooltip?: Snippet<[GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>]>;
		onActivate: (event: MouseEvent) => void;
		onDelete: () => void;
		onUpdate: (dependency: GanttDependency<TDependencyFields>) => boolean;
	} = $props();

	let draftType = $state<GanttDependency['type']>('finish-start');
	let draftLagValue = $state<number | null>(null);
	let draftLagUnit = $state<GanttLagUnit>('day');

	const defaultAccessibleLabel = $derived(
		messages.ganttChartDependencyDescription(
			dependency.fromTask.task.title,
			dependency.toTask.task.title,
			dependency.dependency.type
		)
	);
	const tooltipPayload = $derived<GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>>({
		dependency,
		geometry,
		defaultAccessibleLabel,
		defaultContent: defaultTooltip
	});
	const tooltipAttachment = tooltip({
		get content() {
			return resolvedTooltip;
		},
		position: 'top',
		delay: 350
	});
	const focusLeft = $derived((geometry.fromX + geometry.toX) / 2 - 12);
	const focusTop = $derived((geometry.fromY + geometry.toY) / 2 - 12);

	const dependencyTypes = [
		{ value: 'finish-start', label: 'Finish → start' },
		{ value: 'start-start', label: 'Start → start' },
		{ value: 'finish-finish', label: 'Finish → finish' },
		{ value: 'start-finish', label: 'Start → finish' }
	];
	const lagUnits = [
		{ value: 'minute', label: 'Minutes' },
		{ value: 'hour', label: 'Hours' },
		{ value: 'day', label: 'Days' },
		{ value: 'week', label: 'Weeks' }
	];

	function handleKeydown(event: KeyboardEvent, popover: PopoverState): void {
		if (event.key === 'Delete' || event.key === 'Backspace') {
			event.preventDefault();
			event.stopPropagation();
			if (!dependency.dependency.readOnly) onDelete();
			return;
		}
		if (event.key !== 'Enter' || dependency.dependency.readOnly) return;
		event.preventDefault();
		event.stopPropagation();
		openEditor(popover);
	}

	function openEditor(popover: PopoverState): void {
		draftType = dependency.dependency.type;
		draftLagValue = dependency.dependency.lag?.value ?? null;
		draftLagUnit = dependency.dependency.lag?.unit ?? 'day';
		popover.open();
	}

	function updateDraftType(value: string): void {
		if (
			value === 'finish-start' ||
			value === 'start-start' ||
			value === 'finish-finish' ||
			value === 'start-finish'
		) {
			draftType = value;
		}
	}

	function updateDraftLagUnit(value: string): void {
		if (value === 'minute' || value === 'hour' || value === 'day' || value === 'week') {
			draftLagUnit = value;
		}
	}

	function commitEditor(popover: PopoverState): void {
		const currentLag = dependency.dependency.lag;
		const isUnchanged =
			dependency.dependency.type === draftType &&
			(currentLag === undefined
				? draftLagValue === null
				: currentLag.value === draftLagValue && currentLag.unit === draftLagUnit);
		if (isUnchanged) {
			popover.close();
			return;
		}
		const nextDependency: GanttDependency<TDependencyFields> = {
			...dependency.dependency,
			type: draftType,
			lag: draftLagValue === null ? undefined : { value: draftLagValue, unit: draftLagUnit }
		};
		if (onUpdate(nextDependency)) popover.close();
	}
</script>

<Popover position="bottom" lockScroll={false} openOnClick={false} class="w-72 p-3">
	{#snippet trigger(popover)}
		<button
			type="button"
			aria-label={defaultAccessibleLabel}
			aria-pressed={isSelected}
			aria-keyshortcuts="Enter Delete Backspace"
			aria-haspopup={dependency.dependency.readOnly ? undefined : 'dialog'}
			aria-expanded={dependency.dependency.readOnly ? undefined : popover.isOpen}
			{disabled}
			tabindex={isSelected ? 0 : -1}
			data-gantt-chart-part="connector-control"
			data-dependency-id={dependency.dependency.id}
			class="pointer-events-auto absolute z-20 size-6 rounded-full bg-transparent opacity-0 outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-color/60"
			style:left={`${focusLeft}px`}
			style:top={`${focusTop}px`}
			onpointerdown={(event) => event.stopPropagation()}
			onclick={onActivate}
			ondblclick={(event) => {
				event.stopPropagation();
				if (!dependency.dependency.readOnly) openEditor(popover);
			}}
			onkeydown={(event) => handleKeydown(event, popover)}
			{@attach popover.reference}
			{@attach tooltipAttachment}
		></button>
	{/snippet}

	{#snippet children(popover)}
		<div class="grid gap-3" data-gantt-chart-part="dependency-editor">
			<Select
				size="small"
				label={messages.ganttChartDependencyType}
				items={dependencyTypes}
				value={draftType}
				onChange={updateDraftType}
			/>
			<div class="grid grid-cols-2 gap-2">
				<NumberInput
					size="small"
					label={messages.ganttChartDependencyLag}
					value={draftLagValue}
					showControls={false}
					onChange={(value) => (draftLagValue = value)}
				/>
				<Select
					size="small"
					label={messages.ganttChartDependencyLagUnit}
					items={lagUnits}
					value={draftLagUnit}
					onChange={updateDraftLagUnit}
				/>
			</div>
			<div class="flex justify-end gap-2">
				<Button size="small" variant="ghost" onClick={() => popover.close()}>
					{messages.ganttChartCancel}
				</Button>
				<Button size="small" onClick={() => commitEditor(popover)}>
					{messages.ganttChartApply}
				</Button>
			</div>
		</div>
	{/snippet}
</Popover>

{#snippet defaultTooltip()}
	{defaultAccessibleLabel}
{/snippet}

{#snippet resolvedTooltip()}
	<Slot render={dependencyTooltip ?? defaultTooltip} payload={tooltipPayload} />
{/snippet}
