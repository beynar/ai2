<script lang="ts">
	import { Tabs } from '$lib/components/Tabs/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import { TextInput } from '$lib/components/Form/TextInput/index.js';
	import { Badge } from '$lib/components/Badge/index.js';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { bellIcon } from '$lib/components/Icons/bell.js';
	import type { StepperState } from '$lib/components/Stepper/stepperState.svelte.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let simpleActiveTab = $state(0);
	let iconActiveTab = $state(0);
	let programmaticActiveTab = $state(0);
	let verticalActiveTab = $state(0);
	let formActiveTab = $state(0);
	let stepper = $state<StepperState<any>>();

	const simpleTabs = ['Overview', 'Details', 'Settings'];

	const iconTabs = [
		{ label: 'Home', prefix: houseIcon },
		{ label: 'Profile', prefix: userIcon },
		{ label: 'Settings', prefix: gearIcon }
	];

	const verticalTabs = ['Dashboard', 'Analytics', 'Reports'];

	const formTabs = ['Personal Info', 'Contact', 'Preferences'];

	let formData = $state({
		name: '',
		email: '',
		notifications: true
	});

	function handleTabChange(index: number) {
		console.log('Tab changed to:', index);
	}
</script>

<DocPage
	title="Tabs"
	subtitle="Tabbed navigation paired with animated content panels."
	component="Tabs"
	features={[
		'WAI-ARIA tablist with tabpanels',
		'Arrow-key navigation via useNavigation',
		'bindable activeTab and stepper ref',
		'Animated panel transitions via Stepper',
		'Top, bottom, left, right placement'
	]}
>
	<ComponentCard
		description="Basic tabs with string labels and content panels."
		code={`<Tabs items={['Overview', 'Details', 'Settings']} bind:activeTab={activeTab}>
	{#snippet tab1()}
		<div class="p-6">
			<h3 class="mb-3 text-xl font-semibold">Overview</h3>
			<p class="text-foreground/80">
				This is the overview section. Here you can see a summary of all important information
				at a glance.
			</p>
		</div>
	{/snippet}
	{#snippet tab2()}
		<div class="p-6">
			<h3 class="mb-3 text-xl font-semibold">Details</h3>
			<p class="text-foreground/80">
				Detailed information is displayed here. This section provides in-depth data and
				comprehensive insights.
			</p>
		</div>
	{/snippet}
	{#snippet tab3()}
		<div class="p-6">
			<h3 class="mb-3 text-xl font-semibold">Settings</h3>
			<p class="text-foreground/80">
				Configure your preferences and customize the experience to your liking in this
				section.
			</p>
		</div>
	{/snippet}
</Tabs>`}
	>
		<Tabs items={simpleTabs} bind:activeTab={simpleActiveTab}>
			{#snippet tab1()}
				<div class="p-6">
					<h3 class="mb-3 text-xl font-semibold">Overview</h3>
					<p class="text-foreground/80">
						This is the overview section. Here you can see a summary of all important information at
						a glance.
					</p>
				</div>
			{/snippet}
			{#snippet tab2()}
				<div class="p-6">
					<h3 class="mb-3 text-xl font-semibold">Details</h3>
					<p class="text-foreground/80">
						Detailed information is displayed here. This section provides in-depth data and
						comprehensive insights.
					</p>
				</div>
			{/snippet}
			{#snippet tab3()}
				<div class="p-6">
					<h3 class="mb-3 text-xl font-semibold">Settings</h3>
					<p class="text-foreground/80">
						Configure your preferences and customize the experience to your liking in this section.
					</p>
				</div>
			{/snippet}
		</Tabs>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Basic tabs with string labels and content panels.">
			<Tabs
				onChange={(index: number) => {
					console.log('Tab changed to:', index);
				}}
				items={simpleTabs}
				bind:activeTab={simpleActiveTab}
			>
				{#snippet tab1()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Overview</h3>
						<p class="text-foreground/80">
							This is the overview section. Here you can see a summary of all important information
							at a glance.
						</p>
					</div>
				{/snippet}
				{#snippet tab2()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Details</h3>
						<p class="text-foreground/80">
							Detailed information is displayed here. This section provides in-depth data and
							comprehensive insights.
						</p>
					</div>
				{/snippet}
				{#snippet tab3()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Settings</h3>
						<p class="text-foreground/80">
							Configure your preferences and customize the experience to your liking in this
							section.
						</p>
					</div>
				{/snippet}
			</Tabs>
		</ComponentCard>

		<ComponentCard description="Tabs can include prefix icons for better visual identification.">
			<Tabs
				onChange={(index: number) => {
					console.log('Tab changed to:', index);
				}}
				items={simpleTabs}
				bind:activeTab={simpleActiveTab}
			>
				{#snippet tab({ index, item, stepper })}
					{#if item === 'Overview'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-foreground/80">
								Content for {index}
							</p>
						</div>
					{:else if item === 'Details'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-foreground/80">
								Content for {index}
							</p>
						</div>
					{:else if item === 'Settings'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-foreground/80">
								Content for {index}
							</p>
						</div>
					{/if}
				{/snippet}
			</Tabs>
		</ComponentCard>

		<ComponentCard description="Tabs with prefix icons and rich panel content.">
			<Tabs items={iconTabs} bind:activeTab={iconActiveTab}>
				{#snippet tab1()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Home Dashboard</h3>
						<div class="mt-4 grid grid-cols-3 gap-4">
							<div class="bg-primary/10 rounded-lg p-4">
								<div class="text-primary text-2xl font-bold">24</div>
								<div class="text-foreground/70 text-sm">Active Projects</div>
							</div>
							<div class="bg-success/10 rounded-lg p-4">
								<div class="text-success text-2xl font-bold">156</div>
								<div class="text-foreground/70 text-sm">Completed Tasks</div>
							</div>
							<div class="bg-warning/10 rounded-lg p-4">
								<div class="text-warning text-2xl font-bold">8</div>
								<div class="text-foreground/70 text-sm">Pending Reviews</div>
							</div>
						</div>
					</div>
				{/snippet}
				{#snippet tab2()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">User Profile</h3>
						<div class="space-y-3">
							<div class="border-background-muted flex justify-between border-b py-2">
								<span class="text-foreground/70">Username</span>
								<span class="font-medium">johndoe</span>
							</div>
							<div class="border-background-muted flex justify-between border-b py-2">
								<span class="text-foreground/70">Email</span>
								<span class="font-medium">john@example.com</span>
							</div>
							<div class="border-background-muted flex justify-between border-b py-2">
								<span class="text-foreground/70">Member Since</span>
								<span class="font-medium">January 2024</span>
							</div>
						</div>
					</div>
				{/snippet}
				{#snippet tab3()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Application Settings</h3>
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div>
									<div class="font-medium">Dark Mode</div>
									<div class="text-foreground/70 text-sm">Use dark theme</div>
								</div>
								<Button size="small" variant="outline">Toggle</Button>
							</div>
							<div class="flex items-center justify-between">
								<div>
									<div class="font-medium">Notifications</div>
									<div class="text-foreground/70 text-sm">Enable push notifications</div>
								</div>
								<Button size="small" variant="outline">Configure</Button>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</ComponentCard>

		<ComponentCard
			description="Control tab navigation programmatically using the stepper reference."
		>
			<Tabs
				items={['Step 1', 'Step 2', 'Step 3']}
				bind:activeTab={programmaticActiveTab}
				bind:stepper
			>
				{#snippet tab1({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Welcome to Step 1</h3>
						<p class="text-foreground/80">This is the first step of the process.</p>
						<div class="flex gap-2">
							<Button onClick={() => stepper?.next()}>Next Step</Button>
						</div>
					</div>
				{/snippet}
				{#snippet tab2({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Step 2 in Progress</h3>
						<p class="text-foreground/80">You're making progress! This is the middle step.</p>
						<div class="flex gap-2">
							<Button variant="outline" onClick={() => stepper?.previous()}>Previous</Button>
							<Button onClick={() => stepper?.next()}>Next Step</Button>
						</div>
					</div>
				{/snippet}
				{#snippet tab3({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Final Step Complete!</h3>
						<p class="text-foreground/80">You've reached the end of the process.</p>
						<div class="flex gap-2">
							<Button variant="outline" onClick={() => stepper?.previous()}>Previous</Button>
							<Button color="success" onClick={() => stepper?.goTo(0)}>Start Over</Button>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</ComponentCard>

		<ComponentCard
			description="Control where the tabbar appears: top, bottom, left, or right."
			class="!items-start"
		>
			<div class="grid w-full gap-6">
				<div>
					<p class="text-foreground/70 mb-2 text-sm font-medium">Left Placement (Sidebar Style)</p>
					<div class="border-background-muted h-64 rounded border">
						<Tabs
							items={verticalTabs}
							bind:activeTab={verticalActiveTab}
							placement="left"
							tabbarSize="small"
						>
							{#snippet tab1()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Dashboard Overview</h3>
									<p class="text-foreground/80">
										Your main dashboard with key metrics and quick actions.
									</p>
								</div>
							{/snippet}
							{#snippet tab2()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Analytics Data</h3>
									<p class="text-foreground/80">
										Detailed analytics and performance metrics for your account.
									</p>
								</div>
							{/snippet}
							{#snippet tab3()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Generated Reports</h3>
									<p class="text-foreground/80">View and download your generated reports here.</p>
								</div>
							{/snippet}
						</Tabs>
					</div>
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm font-medium">Right Placement</p>
					<div class="border-background-muted h-64 rounded border">
						<Tabs items={['Option A', 'Option B', 'Option C']} placement="right" tabbarSize="small">
							{#snippet tab1()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Option A</h3>
									<p class="text-foreground/80">Content for option A with tabs on the right.</p>
								</div>
							{/snippet}
							{#snippet tab2()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Option B</h3>
									<p class="text-foreground/80">Content for option B with tabs on the right.</p>
								</div>
							{/snippet}
							{#snippet tab3()}
								<div class="p-6">
									<h3 class="mb-3 text-xl font-semibold">Option C</h3>
									<p class="text-foreground/80">Content for option C with tabs on the right.</p>
								</div>
							{/snippet}
						</Tabs>
					</div>
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm font-medium">Bottom Placement</p>
					<Tabs items={['First', 'Second', 'Third']} placement="bottom">
						{#snippet tab1()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">First Tab</h3>
								<p class="text-foreground/80">Content appears above the tabs.</p>
							</div>
						{/snippet}
						{#snippet tab2()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Second Tab</h3>
								<p class="text-foreground/80">Tabs are positioned at the bottom.</p>
							</div>
						{/snippet}
						{#snippet tab3()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Third Tab</h3>
								<p class="text-foreground/80">Great for mobile-style navigation.</p>
							</div>
						{/snippet}
					</Tabs>
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Use tabs to create multi-step forms with validation.">
			<Tabs
				items={formTabs}
				bind:activeTab={formActiveTab}
				onChange={handleTabChange}
				tabbarColor="secondary"
			>
				{#snippet tab1()}
					<div class="space-y-4 p-6">
						<h3 class="mb-4 text-xl font-semibold">Personal Information</h3>
						<TextInput label="Full Name" bind:value={formData.name} placeholder="John Doe" />
						<p class="text-foreground/60 text-sm">
							Enter your full legal name as it appears on your ID.
						</p>
					</div>
				{/snippet}
				{#snippet tab2()}
					<div class="space-y-4 p-6">
						<h3 class="mb-4 text-xl font-semibold">Contact Details</h3>
						<TextInput
							label="Email Address"
							bind:value={formData.email}
							placeholder="john@example.com"
						/>
						<p class="text-foreground/60 text-sm">We'll never share your email with anyone else.</p>
					</div>
				{/snippet}
				{#snippet tab3()}
					<div class="space-y-4 p-6">
						<h3 class="mb-4 text-xl font-semibold">Preferences</h3>
						<div class="bg-background-muted flex items-center justify-between rounded-lg p-4">
							<div>
								<div class="font-medium">Email Notifications</div>
								<div class="text-foreground/70 text-sm">Receive updates via email</div>
							</div>
							<input type="checkbox" bind:checked={formData.notifications} class="h-5 w-5" />
						</div>
						<div class="mt-6 flex gap-2">
							<Button color="primary" fullWidth>Save Profile</Button>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</ComponentCard>

		<ComponentCard
			description="Customize tab appearance with different sizes, colors, and alignments."
		>
			<div class="grid w-full gap-6">
				<div>
					<p class="text-foreground/70 mb-2 text-sm font-medium">Large Size, Success Color</p>
					<Tabs
						items={['Tab 1', 'Tab 2']}
						tabbarSize="large"
						tabbarColor="success"
						tabbarAlignment="center"
					>
						{#snippet tab1()}
							<div class="p-4 text-center">Large tab content 1</div>
						{/snippet}
						{#snippet tab2()}
							<div class="p-4 text-center">Large tab content 2</div>
						{/snippet}
					</Tabs>
				</div>
				<div>
					<p class="text-foreground/70 mb-2 text-sm font-medium">Small Size, Danger Color</p>
					<Tabs
						items={['Alert', 'Warning']}
						tabbarSize="small"
						tabbarColor="danger"
						tabbarAlignment="end"
					>
						{#snippet tab1()}
							<div class="p-4">Alert information</div>
						{/snippet}
						{#snippet tab2()}
							<div class="p-4">Warning details</div>
						{/snippet}
					</Tabs>
				</div>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
