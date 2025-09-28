<script lang="ts">
	import Popover from '$lib/components/Popover/Popover.svelte';
	import type { Snippet } from 'svelte';
	import { createRawSnippet } from 'svelte';

	import {} from 'svelte/compiler';
	import ComponentCard from '../../ComponentCard.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';

	const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor`;

	const wrapper2 = createRawSnippet<[Snippet]>((snippet) => {
		return {
			setup(element) {
				// snippet()(element);
			},
			render() {
				return `<div>
					<h1>Hello</h1>
					
				</div>`;
			}
		};
	});

	let buttonRef = $state<HTMLButtonElement | null>(null);
</script>

{#snippet wrapper(children: Snippet)}
	{@render children()}
{/snippet}

{#snippet children()}
	render children
{/snippet}

<div class="h-screen/2 flex gap-10" />

<ComponentCard title="Accordion Classic" class="mt-40 flex !items-start ">
	{@render wrapper(children)}
	{@render wrapper2(children)}

	<Button
		{@attach tooltip({
			content: children,
			position: 'top',
			offset: 5
		})}
	>
		tooltip here
	</Button>
	<Button
		{@attach tooltip({
			content: children,
			position: 'bottom',
			offset: 5
		})}
	>
		tooltip here
	</Button>

	<Popover trigger={false} isOpen ref={buttonRef} position="bottom"
		>default opened with external ref</Popover
	>

	<Popover
		closeOnMouseLeave={false}
		openOnHover
		hoverDelay={1000}
		trigger={{
			content: 'hover open',
			color: 'danger'
		}}
		position="bottom"
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="top"
		trigger={{
			content: 'top',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="left"
		trigger={{
			content: 'left',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="bottom-end"
		trigger={{
			content: 'bottom-end',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="bottom-start"
		trigger={{
			content: 'bottom-start',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="top-start"
		trigger={{
			content: 'top-start',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Popover>
	<Popover
		position="top-end"
		trigger={{
			content: 'top-end',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
			<Popover
				position="top-end"
				trigger={{
					content: 'top-end',
					color: 'danger'
				}}
			>
				<div>
					<h1>Hello</h1>
					<p>{text}</p>
				</div>
			</Popover>
		</div>
	</Popover>
</ComponentCard>
