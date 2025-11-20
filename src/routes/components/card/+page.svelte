<script lang="ts">
	import { Card, setCardTheme } from '$lib/components/Card/index.js';
	import Button from '$lib/components/Button/Button.svelte';
	import { colors, sizes, variants } from '$lib/utils/tokens.js';
	import { Form } from '$lib/components/Form/Form/index.js';
</script>

<div class="grid gap-10">
	<!-- Basic Card -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Shadcn Card</h2>

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
	</div>

	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Basic Card</h2>
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
	</div>

	<!-- Card with Action (Snippet) -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card with Action (Snippet)</h2>
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
	</div>

	<!-- Card with Action (ButtonProps Object) -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card with Action (ButtonProps Object)</h2>
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
	</div>

	<!-- Card with Action (ButtonProps with onClick) -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card with Action (ButtonProps with onClick)</h2>
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
	</div>

	<!-- Card Variants -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card Variants</h2>
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
	</div>

	<!-- Card Sizes -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card Sizes</h2>
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
	</div>

	<!-- Card Colors -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card Colors</h2>
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
	</div>

	<!-- Interactive Card (Link) -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Interactive Card (Link)</h2>
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
	</div>

	<!-- Interactive Card (Click Handler) -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Interactive Card (Click Handler)</h2>
		<Card onClick={() => alert('Card clicked!')} onEnter={() => console.log('Hovered')}>
			{#snippet title()}
				Clickable Card
			{/snippet}
			{#snippet children()}
				<p>Click me!</p>
			{/snippet}
		</Card>
	</div>

	<!-- Card with Border Separators -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card with Border Separators</h2>
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
	</div>

	<!-- Card with Footer -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Card with Footer</h2>
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
	</div>

	<!-- Disabled Card -->
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<h2 class="text-xl font-semibold">Disabled Card</h2>
		<Card disabled={true}>
			{#snippet title()}
				Disabled Card
			{/snippet}
			{#snippet children()}
				<p>This card is disabled</p>
			{/snippet}
		</Card>
	</div>
</div>
