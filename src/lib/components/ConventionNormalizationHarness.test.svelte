<script lang="ts">
	import Code from './Code/Code.svelte';
	import Menu from './Menu/Menu.svelte';
	import PageShell from './PageShell/PageShell.svelte';

	type Scenario = 'code-header' | 'page-shell-title' | 'menu-slots';

	let { scenario }: { scenario: Scenario } = $props();
</script>

{#if scenario === 'code-header'}
	<Code
		code="const answer = 42;"
		language="ts"
		theme={{
			header: { base: 'custom-code-header' }
		}}
	>
		{#snippet header()}
			<span>Code header</span>
		{/snippet}
	</Code>
{:else if scenario === 'page-shell-title'}
	<PageShell
		theme={{
			title: { base: 'custom-page-title' },
			subtitle: { base: 'custom-page-subtitle' }
		}}
	>
		{#snippet title(api)}
			<span data-width={api.contentWidth}>Page title</span>
		{/snippet}

		{#snippet subtitle(api)}
			<span data-width={api.contentWidth}>Page subtitle</span>
		{/snippet}

		{#snippet children(api)}
			<span data-width={api.contentWidth}>Page body</span>
		{/snippet}
	</PageShell>
{:else if scenario === 'menu-slots'}
	<Menu
		items={[]}
		theme={{
			header: { base: 'custom-menu-header' },
			footer: { base: 'custom-menu-footer' }
		}}
	>
		{#snippet header()}
			<span>Menu header</span>
		{/snippet}

		{#snippet footer()}
			<span>Menu footer</span>
		{/snippet}
	</Menu>
{/if}
