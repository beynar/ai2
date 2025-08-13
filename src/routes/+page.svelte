<script lang="ts">
	import Component from './Component.svelte';
	import Button, { setButtonTheme } from '$lib/components/Button/Button.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Badge from '$lib/components/Badge/Badge.svelte';

	// setButtonTheme({
	// 	button: {
	// 		base: 'rounded-full'
	// 	}
	// });
</script>

<button data-color="danger" class="bg-color"> eaz </button>

<div class="bg-primary/20 m-10 size-20 shadow"></div>

<div class="bg-secondary/20 raised-xl m-10 size-20"></div>

<!-- <Component text="eaze" /> -->

{#snippet Test({ text }: { text: string })}
	<button
		onClick={() => {
			console.log({ Test, Component });
		}}
		class="bg-primary text-color-light p-2">{text}</button
	>
{/snippet}

<div class="bg-primary/20 size-20 rounded p-1">hello</div>

<!--  -->
<Button color="secondary">Hello</Button>
<Button color="secondary">Hello</Button>
<!-- <Button color="danger">Hello</Button>
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

<div class="flex">
	<div class="flex">
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" size="large">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" size="small">1</Badge>
		</div>
	</div>
	<div class="flex">
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" position="topLeft">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" size="large" position="topRight">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" size="small" position="topRight">1</Badge>
		</div>
	</div>
	<div class="flex">
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" position="bottomLeft">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="primary" size="large" position="bottomRight">1</Badge>
		</div>
		<div class="bg-primary/20 m-10 size-20 shadow">
			<Badge color="danger" size="small" position="bottomRight">1</Badge>
		</div>
	</div>
</div>

<div class="bg-primary/20 m-10 size-20 shadow">
	<Badge
		theme={{
			badge: {
				position: {
					bottomRight: 'bottom-4 right-4'
				}
			}
		}}
		color="danger"
		size="small"
		position="bottomRight"
		>1
		<Badge color="primary" size="small" position="bottomRight"
			>1
			<Badge color="success" size="small" position="bottomRight">1</Badge>
		</Badge>
	</Badge>
</div> -->
