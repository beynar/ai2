<script lang="ts">
	import Component from './Component.svelte';
	import Button, { setButtonTheme } from '$lib/components/button/Button.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>
	Visit <a href="https://svelte.dev/docs/kit" class="text-danger sm:text-2xl">svelte.dev/docs/kit</a
	> to read the documentation
</p>

<button class="text-color-light/20 ring ring-indigo-500/20" data-color="primary">Hello</button>
<button class="text-danger/20 ring ring-indigo-500 ring-offset-amber-200">Hello</button>

<button data-color="danger" class="bg-color"> eaz </button>

<div class="bg-primary/20 m-10 size-20 shadow"></div>

<div class="bg-secondary/20 raised-xl m-10 size-20"></div>

<!-- <Component text="eaze" /> -->

{#snippet Test({ text }: { text: string })}
	<button
		onclick={() => {
			console.log({ Test, Component });
		}}
		class="bg-primary text-color-light p-2">{text}</button
	>
{/snippet}

<Button color="primary">Hello</Button>
<!--  -->
<Button color="secondary">Hello</Button>
<Button color="danger">Hello</Button>
<Button color="success">Hello</Button>
<Button color="warning">Hello</Button>
<Button color="info">Hello</Button>

<Button color="primary" variant="soft">Hello</Button>
<Button color="secondary" variant="soft">Hello</Button>
<Button color="danger" variant="soft">Hello</Button>
<Button color="success" variant="soft">Hello</Button>
<Button color="warning" variant="soft">Hello</Button>
<Button color="info" variant="soft">Hello</Button>

<Chip color="primary">Hello</Chip>
<Chip color="secondary">Hello</Chip>
<Chip color="danger">Hello</Chip>
<Chip color="success">Hello</Chip>
<Chip color="warning">Hello</Chip>
<Chip color="info">Hello</Chip>
<Chip color="contrast">Hello</Chip>
<Chip color="surface">Helloeaz</Chip>
<br />
<Chip color="primary" variant="outline">Hello</Chip>
<Chip color="secondary" variant="outline">Hello</Chip>
<Chip color="danger" variant="outline">Hello</Chip>
<Chip color="success" variant="outline">Hello</Chip>
<Chip color="warning" variant="outline">Hello</Chip>
<Chip color="info" variant="outline">Hello</Chip>
<Chip color="contrast" variant="outline">Hello</Chip>
<Chip color="surface" variant="outline">Helloeaz</Chip>
<br />
<Chip color="primary" variant="soft">Hello</Chip>
<Chip color="secondary" variant="soft">Hello</Chip>
<Chip color="danger" variant="soft">Hello</Chip>
<Chip color="success" variant="soft">Hello</Chip>
<Chip color="warning" variant="soft">Hello</Chip>
<Chip color="info" variant="soft">Hello</Chip>
<Chip color="contrast" variant="soft">Hello</Chip>
<Chip color="surface" variant="soft">Helloeaz</Chip>
