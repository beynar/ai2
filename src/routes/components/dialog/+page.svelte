<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import ComponentCard from '../../ComponentCard.svelte';

	const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ips
					
					
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ips
					
					
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ips
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
					sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
					Lorem ips`;

	let isOpen = $state(false);
</script>

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<Dialog
		closeOnEscape={false}
		title="Modal"
		description="This is a modal dialog"
		isOpen
		trigger={{
			content: 'modal',
			color: 'danger'
		}}
		type="modal"
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		title="Modal"
		description="This is a modal dialog"
		trigger={{
			content: 'modal',
			color: 'danger'
		}}
		type="modal"
	>
		Lorem ips Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
		dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
		consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
		elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
		amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
		adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
		ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
		consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
		elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
		amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
		adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
		ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
		consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
		elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ips
	</Dialog>
	<Dialog
		type="drawerRight"
		trigger={{
			content: 'drawerRight',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		type="drawerLeft"
		trigger={{
			content: 'drawerLeft',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		type="fullScreen"
		trigger={{
			content: 'fullScreen',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		type="drawerBottom"
		trigger={{
			content: 'drawerBottom',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		type="drawerTop"
		trigger={{
			content: 'drawerTop',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
	<Dialog
		type="alert"
		trigger={{
			content: 'alert',
			color: 'danger'
		}}
	>
		<div>
			<h1>Hello</h1>
			<p>{text}</p>
		</div>
	</Dialog>
</ComponentCard>
