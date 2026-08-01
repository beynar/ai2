import type {
	TimelineOrientation,
	TimelinePlacement,
	TimelineVariant
} from '$lib/components/Timeline/index.js';
import type { Density, Sizes } from '$lib/types/theme.js';

export function getOrderCode({
	orientation,
	placement,
	variant,
	size,
	density,
	loading
}: {
	orientation: TimelineOrientation;
	placement: TimelinePlacement;
	variant: TimelineVariant;
	size: Sizes;
	density: Density;
	loading: boolean;
}): string {
	const timeSizeClass = {
		small: 'text-[0.6875rem]',
		normal: 'text-[0.8125rem]',
		large: 'text-[0.9375rem]'
	}[size];
	const timeColorClass = variant === 'soft' ? 'text-color-muted-readable/70' : 'text-neutral/60';
	const isHorizontalAlternate = orientation === 'horizontal' && placement === 'alternate';
	const isHorizontalFixed = orientation === 'horizontal' && placement !== 'alternate';

	return [
		'<script lang="ts">',
		"  import { Timeline, type TimelineItem } from 'svelai/timeline';",
		'',
		'  type OrderEvent = TimelineItem & {',
		"    time: string; status: 'complete' | 'current' | 'upcoming';",
		'  };',
		'',
		'  const items: OrderEvent[] = orderEvents.map((event) =>',
		`    event.status === 'current' ? { ...event, loading: ${loading} } : event`,
		'  );',
		'</script>',
		'',
		'<Timeline',
		'  {items}',
		`  orientation="${orientation}"`,
		`  placement="${placement}"`,
		`  variant="${variant}"`,
		`  size="${size}"`,
		`  density="${density}"`,
		'>',
		'  {#snippet item({ item, defaultContent })}',
		'    <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4">',
		`      <div class="min-w-0${isHorizontalFixed ? ' col-span-2' : ''}" class:opacity-50={item.status === "upcoming"}>`,
		'        {@render defaultContent()}',
		'      </div>',
		...(isHorizontalAlternate
			? []
			: [
					`      <time class="${isHorizontalFixed ? 'col-start-2 row-start-1 justify-self-end ' : ''}${timeSizeClass} ${timeColorClass} whitespace-nowrap tabular-nums">`,
					'        {item.time}',
					'      </time>'
				]),
		'    </div>',
		'  {/snippet}',
		...(isHorizontalAlternate
			? [
					'',
					'  {#snippet opposite({ item, defaultOpposite })}',
					'    <div class="flex items-baseline gap-2 whitespace-nowrap">',
					'      {@render defaultOpposite()}',
					`      <time class="${timeSizeClass} ${timeColorClass} whitespace-nowrap tabular-nums">`,
					'        {item.time}',
					'      </time>',
					'    </div>',
					'  {/snippet}'
				]
			: []),
		'',
		'  {#snippet marker({ item, defaultMarker })}',
		'    {#if item.status === "current"}',
		'      <span class="current-marker">…</span>',
		'    {:else}',
		'      {@render defaultMarker()}',
		'    {/if}',
		'  {/snippet}',
		'</Timeline>'
	].join('\n');
}

export const milestonesCode = [
	"import { Timeline, type TimelineItem } from 'svelai/timeline';",
	'',
	'type Milestone = TimelineItem & {',
	'  dateBadge?: string;',
	'  media?: { label: string; src: string }[];',
	'};',
	'',
	'<Timeline items={milestones} placement="alternate" variant="card">',
	'  {#snippet item({ item, defaultContent })}',
	'    {@render defaultContent()}',
	'    {#if item.media}',
	'      <MediaGrid items={item.media} />',
	'    {/if}',
	'  {/snippet}',
	'',
	'  {#snippet opposite({ item, defaultOpposite })}',
	'    {#if item.dateBadge}',
	'      <Chip>{item.dateBadge}</Chip>',
	'    {:else}',
	'      {@render defaultOpposite()}',
	'    {/if}',
	'  {/snippet}',
	'</Timeline>'
].join('\n');

export const minimalCode = [
	'<Timeline items={releases} density="large">',
	'  {#snippet marker({ index, defaultMarker })}',
	'    {#if index < 2}',
	'      <span class="hollow-marker"></span>',
	'    {:else}',
	'      {@render defaultMarker()}',
	'    {/if}',
	'  {/snippet}',
	'</Timeline>',
	'',
	'<Timeline items={roadmap} size="small" density="small">',
	'  {#snippet marker({ color })}',
	'    <span data-color={color} class="size-2.5 rounded-full bg-color"></span>',
	'  {/snippet}',
	'</Timeline>'
].join('\n');

export const activityCode = [
	'type ActivityItem = TimelineItem & {',
	'  relativeTime: string;',
	'  activityIcon?: Snippet;',
	"  state: 'complete' | 'active';",
	'};',
	'',
	'<Timeline items={activities} density="large">',
	'  {#snippet item({ item, defaultContent })}',
	'    {@render defaultContent()}',
	'    <p>{item.relativeTime}</p>',
	'  {/snippet}',
	'',
	'  {#snippet marker({ item, defaultMarker })}',
	'    {#if item.activityIcon}',
	'      <span class="activity-marker">{@render item.activityIcon()}</span>',
	'    {:else}',
	'      {@render defaultMarker()}',
	'    {/if}',
	'  {/snippet}',
	'</Timeline>'
].join('\n');

export const variantsCode = [
	"const variants = ['ghost', 'card', 'outline', 'soft'] as const;",
	'',
	'{#each variants as variant}',
	'  <Timeline',
	'    items={events}',
	'    {variant}',
	'    size="small"',
	'    density="small"',
	'  />',
	'{/each}'
].join('\n');

export const layoutCode = [
	'<div class="max-w-[34rem]">',
	'  <Timeline',
	'    items={milestones}',
	'    placement="alternate"',
	'    variant="card"',
	'  />',
	'</div>',
	'',
	'<div class="max-w-2xl">',
	'  <Timeline',
	'    items={events}',
	'    orientation="horizontal"',
	'    placement="alternate"',
	'    variant="soft"',
	'    scrollFade',
	'  />',
	'</div>'
].join('\n');
