<script lang="ts">
	type ShellComponentId = 'app-shell' | 'sidebar' | 'page-shell';

	let { current }: { current: ShellComponentId } = $props();

	const items: {
		id: ShellComponentId;
		label: string;
		href: string;
		responsibility: string;
		use: string;
		how: string;
	}[] = [
		{
			id: 'app-shell',
			label: 'AppShell',
			href: '/components/app-shell',
			responsibility:
				'Owns the visible app wall, the page host surface, and the composition of Sidebar plus PageShell.',
			use: 'Use it when routes share the same application navigation and page chrome.',
			how: 'Pass a sidebar config, PageShell props, and theme app surfaces through theme.root and theme.page.'
		},
		{
			id: 'sidebar',
			label: 'Sidebar',
			href: '/components/sidebar',
			responsibility:
				'Owns navigation data, the visible navigation panel, collapse, rail, edge reveal, and mobile drawer behavior.',
			use: 'Use it inside AppShell, or standalone when another parent already owns the surrounding wall and content.',
			how: 'Pass items plus variant, collapsible, rail, side, or mode; style the panel with sidebar.theme.panel.'
		},
		{
			id: 'page-shell',
			label: 'PageShell',
			href: '/components/page-shell',
			responsibility:
				'Owns page-level chrome: sticky header, scrollable content, sticky footer, breadcrumbs, and actions.',
			use: 'Use it for screens that need consistent title, context, content width, and footer behavior.',
			how: 'Pass title, subtitle, breadcrumbs, actions, contentPadding, contentWidth, and PageShell theme parts.'
		}
	];
</script>

<section
	aria-labelledby="shell-mental-model-title"
	class="grid gap-3 rounded-xl border border-background-muted bg-background p-4 text-sm text-foreground/70"
>
	<div class="grid gap-1">
		<p id="shell-mental-model-title" class="font-medium text-foreground">Shell mental model</p>
		<p>
			Sidebar moves layout; AppShell paints layout; PageShell shapes the page. Each card links to
			the component that owns that layer.
		</p>
	</div>

	<div class="grid gap-3 md:grid-cols-3">
		{#each items as item}
			<a
				href={item.href}
				aria-current={current === item.id ? 'page' : undefined}
				class="rounded-lg border p-3 transition {current === item.id
					? 'border-primary bg-primary/10 text-foreground'
					: 'border-background-muted bg-background-light text-foreground/75 hover:border-primary/50 hover:text-foreground'}"
			>
				<span class="block font-medium text-foreground">{item.label}</span>
				<span class="mt-2 block">{item.responsibility}</span>
				<span class="mt-2 block">
					<span class="font-medium text-foreground">Use:</span>
					{item.use}
				</span>
				<span class="mt-1 block">
					<span class="font-medium text-foreground">How:</span>
					{item.how}
				</span>
			</a>
		{/each}
	</div>
</section>
