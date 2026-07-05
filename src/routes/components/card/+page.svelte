<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { Card, setCardTheme } from '$lib/components/Card/index.js';
	import Button from '$lib/components/Button/Button.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import { Form } from '$lib/components/Form/Form/index.js';
</script>

<DocPage
	title="Card"
	subtitle="A flexible surface for grouping related content and actions."
	component="Card"
	features={[
		'Bindable ref to root element',
		'Header, content and footer slots',
		'Renders link or button when interactive',
		'Action slot or ButtonProps shortcut',
		'Variants, colors and size tokens'
	]}
>
	<ComponentCard
		code={`<Card>
	{#snippet title()}
		Card Title
	{/snippet}
	{#snippet description()}
		This is a description of the card content.
	{/snippet}
	{#snippet children()}
		<p>Card content goes here.</p>
	{/snippet}
</Card>`}
	>
		<Card>
			{#snippet title()}
				Card Title
			{/snippet}
			{#snippet description()}
				This is a description of the card content.
			{/snippet}
			{#snippet children()}
				<p>Card content goes here.</p>
			{/snippet}
		</Card>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Shadcn Card">
			<Card
				class="w-full max-w-sm"
				title="Login to your account"
				description="Enter your email below to login to your account"
			>
				{#snippet action()}
					<Button size="small" variant="link">Sign Up</Button>
				{/snippet}

				<Form
					inputs={{
						email: {
							type: 'email',
							label: 'Email',
							required: true
						},
						password: {
							type: 'password',
							label: 'Password',
							required: true
						}
					}}
					onSubmit={() => {
						console.log('submit');
					}}
				></Form>

				{#snippet footer()}
					<Button fullWidth>Login</Button>
					<Button variant="outline" fullWidth>Login with Google</Button>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Basic Card">
			<Card>
				{#snippet title()}
					Card Title
				{/snippet}
				{#snippet description()}
					This is a description of the card content.
				{/snippet}
				{#snippet children()}
					<p>Card content goes here.</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card with Action (Snippet)">
			<Card>
				{#snippet title()}
					Settings
				{/snippet}
				{#snippet description()}
					Manage your preferences
				{/snippet}
				{#snippet action()}
					<Button variant="ghost" size="small">Action</Button>
				{/snippet}
				{#snippet children()}
					<p>Settings content...</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card with Action (ButtonProps Object)">
			<Card
				showBorders
				action={{
					variant: 'ghost',
					size: 'small',
					children: 'Action'
				}}
			>
				{#snippet title()}
					Settings
				{/snippet}
				{#snippet description()}
					Manage your preferences
				{/snippet}
				{#snippet children()}
					<p>Settings content...</p>
				{/snippet}
			</Card>
			<Card
				size="small"
				showBorders
				action={{
					variant: 'ghost',
					size: 'small',
					children: 'Action'
				}}
			>
				{#snippet title()}
					Settings
				{/snippet}
				{#snippet description()}
					Manage your preferences
				{/snippet}
				{#snippet children()}
					<p>Settings content...</p>
				{/snippet}
			</Card>
			<Card
				size="large"
				showBorders
				action={{
					variant: 'ghost',
					size: 'small',
					children: 'Action'
				}}
			>
				{#snippet title()}
					Settings
				{/snippet}
				{#snippet description()}
					Manage your preferences
				{/snippet}
				{#snippet children()}
					<p>Settings content...</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card with Action (ButtonProps with onClick)">
			<Card
				showBorders
				action={{
					variant: 'ghost',
					size: 'small',
					children: 'Delete',
					color: 'danger',
					onClick: () => alert('Deleted!')
				}}
			>
				{#snippet title()}
					Dangerous Action
				{/snippet}
				{#snippet description()}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatibus quos eius
					amet minus animi veritatis incidunt error odit vero quas soluta omnis, optio iste beatae sit
					voluptate neque dolores!
				{/snippet}
				{#snippet children()}
					<p>This action cannot be undone.</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card Variants">
			<div class="grid grid-cols-2 gap-4">
				{#each variants as variant}
					<Card {variant} color="primary">
						{#snippet title()}
							{variant} Card
						{/snippet}
						{#snippet description()}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatibus quos
							eius amet minus animi veritatis incidunt error odit vero quas soluta omnis, optio iste
							beatae sit voluptate neque dolores!
						{/snippet}
						{#snippet children()}
							<p>This is a {variant} variant card.</p>
						{/snippet}
					</Card>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Card Sizes">
			<div class="grid gap-4">
				{#each sizes as size}
					<Card {size}>
						{#snippet title()}
							{size} Card
						{/snippet}
						{#snippet children()}
							<p>This is a {size} size card.</p>
						{/snippet}
					</Card>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Card Colors">
			<div class="grid grid-cols-2 gap-4">
				{#each colors as color}
					<Card {color}>
						{#snippet title()}
							{color} Card
						{/snippet}
						{#snippet description()}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatibus quos
							eius amet minus animi veritatis incidunt error odit vero quas soluta omnis, optio iste
							beatae sit voluptate neque dolores!
						{/snippet}
						{#snippet children()}
							<p>This is a {color} colored card.</p>
						{/snippet}
					</Card>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Interactive Card (Link)">
			<Card href="/" target="_blank" rel="noopener">
				{#snippet title()}
					Article Title
				{/snippet}
				{#snippet description()}
					Read more about this topic
				{/snippet}
				{#snippet children()}
					<p>Article preview...</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Interactive Card (Click Handler)">
			<Card onClick={() => alert('Card clicked!')} onEnter={() => console.log('Hovered')}>
				{#snippet title()}
					Clickable Card
				{/snippet}
				{#snippet children()}
					<p>Click me!</p>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card with Border Separators">
			<Card showBorders={true}>
				{#snippet title()}
					Title
				{/snippet}
				{#snippet children()}
					<p>Content with border above</p>
				{/snippet}
				{#snippet footer()}
					<Button size="small">Action</Button>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Card with Footer">
			<Card>
				{#snippet title()}
					Card with Footer
				{/snippet}
				{#snippet children()}
					<p>Card content...</p>
				{/snippet}
				{#snippet footer()}
					<div class="flex w-full items-center justify-between">
						<span class="text-muted-foreground text-sm">Footer content</span>
						<Button size="small">Action</Button>
					</div>
				{/snippet}
			</Card>
		</ComponentCard>

		<ComponentCard description="Disabled Card">
			<Card disabled={true}>
				{#snippet title()}
					Disabled Card
				{/snippet}
				{#snippet children()}
					<p>This card is disabled</p>
				{/snippet}
			</Card>
		</ComponentCard>
	{/snippet}
</DocPage>
