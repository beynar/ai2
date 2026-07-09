<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import {
		Stat,
		StatDescription,
		StatIndicator,
		StatLabel,
		StatSeparator,
		StatTrend,
		StatValue
	} from '$lib/components/Stat/index.js';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import { chartLineUpIcon } from '$lib/components/Icons/chartLineUp.js';
	import { databaseIcon } from '$lib/components/Icons/database.js';
	import { dotsThreeIcon } from '$lib/components/Icons/dotsThree.js';
	import { percentIcon } from '$lib/components/Icons/percent.js';
	import { receiptIcon } from '$lib/components/Icons/receipt.js';
	import { sealCheckIcon } from '$lib/components/Icons/sealCheck.js';
	import { timerIcon } from '$lib/components/Icons/timer.js';
	import { trendDownIcon } from '$lib/components/Icons/trendDown.js';
	import { trendUpIcon } from '$lib/components/Icons/trendUp.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	const statVariants = variants;
</script>

<DocPage
	title="Stat"
	subtitle="A compact metric surface with label, value, trend, description, and indicator parts."
	component="Stat"
	features={[
		'Convenience slots or compound subcomponents',
		'Parent size and theme cascade to stat parts',
		'Semantic trend and indicator colors',
		'Action indicators render as real buttons',
		'Theme parts for every visual slot'
	]}
>
	<ComponentCard
		class="!min-h-[280px] !items-start"
		code={`<Stat label="Revenue" value="$45,231" trend="+20.1%" trendDirection="up" description="Compared with last month">
	{#snippet indicator()}
		{@render trendUpIcon()}
	{/snippet}
</Stat>`}
	>
		<div class="grid w-full max-w-4xl gap-4 md:grid-cols-3">
			<Stat
				label="Revenue"
				value="$45,231"
				trend="+20.1%"
				trendDirection="up"
				description="Compared with last month"
			>
				{#snippet indicator()}
					{@render trendUpIcon()}
				{/snippet}
			</Stat>
			<Stat
				label="Churn"
				value="2.4%"
				trend="-0.8%"
				trendDirection="down"
				indicatorColor="danger"
				description="Account loss rate"
			>
				{#snippet indicator()}
					{@render trendDownIcon()}
				{/snippet}
			</Stat>
			<Stat
				label="Response"
				value="184ms"
				trend="stable"
				indicatorVariant="icon"
				indicatorColor="info"
				description="P95 API latency"
			>
				{#snippet indicator()}
					{@render timerIcon()}
				{/snippet}
			</Stat>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Compound composition mirrors the source stat-card structure."
			class="!min-h-[280px]"
			code={`<Stat size="large">
	<StatLabel>Active users</StatLabel>
	<StatValue>24,892</StatValue>
	<StatIndicator variant="icon" color="info">
		{@render usersIcon()}
	</StatIndicator>
	<StatSeparator />
	<StatTrend trend="up">
		{@render trendUpIcon()}
		12.4% growth
	</StatTrend>
	<StatDescription>Trailing 30 days across all workspaces</StatDescription>
</Stat>`}
		>
			<div class="grid w-full max-w-4xl gap-4 md:grid-cols-2">
				<Stat size="large">
					<StatLabel>Active users</StatLabel>
					<StatValue>24,892</StatValue>
					<StatIndicator variant="icon" color="info">
						{@render usersIcon()}
					</StatIndicator>
					<StatSeparator />
					<StatTrend trend="up">
						{@render trendUpIcon()}
						12.4% growth
					</StatTrend>
					<StatDescription>Trailing 30 days across all workspaces</StatDescription>
				</Stat>

				<Stat size="large">
					<StatLabel>Paid invoices</StatLabel>
					<StatValue>1,284</StatValue>
					<StatIndicator variant="badge" color="success">Live</StatIndicator>
					<StatSeparator />
					<StatTrend trend="neutral">
						{@render receiptIcon()}
						No collection delay
					</StatTrend>
					<StatDescription>Settlement window remains within target</StatDescription>
				</Stat>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Small, normal, and large sizes adjust padding, icon scale, and type hierarchy."
			class="!min-h-[320px]"
			code={`{#each sizes as size}
	<Stat
		{size}
		label={size + ' storage'}
		value="68%"
		indicatorVariant="icon"
		indicatorColor="primary"
	>
		{#snippet indicator()}
			{@render databaseIcon()}
		{/snippet}
		{#snippet trend()}
			{@render percentIcon()}
			8 points available
		{/snippet}
	</Stat>
{/each}`}
		>
			<div class="grid w-full max-w-4xl gap-4">
				{#each sizes as size}
					<Stat
						{size}
						label={size + ' storage'}
						value="68%"
						indicatorVariant="icon"
						indicatorColor="primary"
					>
						{#snippet indicator()}
							{@render databaseIcon()}
						{/snippet}
						{#snippet trend()}
							{@render percentIcon()}
							8 points available
						{/snippet}
					</Stat>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard
			description="Indicator variants cover plain icons, framed icons, compact badges, and actions."
			class="!min-h-[280px]"
			code={`<Stat label="Default" value="98.2" trend="Healthy">
	{#snippet indicator()}
		{@render sealCheckIcon()}
	{/snippet}
</Stat>

<Stat label="Icon" value="42" indicatorVariant="icon" indicatorColor="info" trend="Queued">
	{#snippet indicator()}
		{@render chartLineUpIcon()}
	{/snippet}
</Stat>

<Stat label="Badge" value="12" indicatorVariant="badge" indicatorColor="warning" trend="Needs review">
	{#snippet indicator()}
		SLA
	{/snippet}
</Stat>

<Stat label="Action" value="7" trend="Open tasks">
	<StatIndicator variant="action" color="foreground" onClick={() => undefined} aria-label="Open actions">
		{@render dotsThreeIcon()}
	</StatIndicator>
</Stat>`}
		>
			<div class="grid w-full max-w-4xl gap-4 md:grid-cols-4">
				<Stat label="Default" value="98.2" trend="Healthy">
					{#snippet indicator()}
						{@render sealCheckIcon()}
					{/snippet}
				</Stat>
				<Stat label="Icon" value="42" indicatorVariant="icon" indicatorColor="info" trend="Queued">
					{#snippet indicator()}
						{@render chartLineUpIcon()}
					{/snippet}
				</Stat>
				<Stat
					label="Badge"
					value="12"
					indicatorVariant="badge"
					indicatorColor="warning"
					trend="Needs review"
				>
					{#snippet indicator()}
						SLA
					{/snippet}
				</Stat>
				<Stat label="Action" value="7" trend="Open tasks">
					<StatIndicator
						variant="action"
						color="foreground"
						onClick={() => undefined}
						aria-label="Open actions"
					>
						{@render dotsThreeIcon()}
					</StatIndicator>
				</Stat>
			</div>
		</ComponentCard>

		<ComponentCard
			description="Surface colors and variants use the same semantic token model as the rest of Svelai."
			class="!min-h-[420px]"
			code={`{#each statVariants as variant}
	{#each colors.slice(0, 4) as color}
		<Stat
			{variant}
			{color}
			label={color}
			value={variant}
			trend="semantic surface"
			indicatorVariant="badge"
			indicatorColor={color}
		>
			{#snippet indicator()}
				{color.slice(0, 1).toUpperCase()}
			{/snippet}
		</Stat>
	{/each}
{/each}`}
		>
			<div class="grid w-full max-w-5xl gap-4 md:grid-cols-4">
				{#each statVariants as variant}
					{#each colors.slice(0, 4) as color}
						<Stat
							{variant}
							{color}
							label={color}
							value={variant}
							trend="semantic surface"
							indicatorVariant="badge"
							indicatorColor={color}
						>
							{#snippet indicator()}
								{color.slice(0, 1).toUpperCase()}
							{/snippet}
						</Stat>
					{/each}
				{/each}
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
