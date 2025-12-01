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

<div class="mx-auto max-w-6xl space-y-12 p-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold">Tabs Component</h1>
		<p class="text-contrast/70 mb-8">
			A complete tabbed interface combining Tabbar navigation with animated content panels.
		</p>
	</div>

	<!-- Simple Tabs -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Simple Tabs</h2>
			<p class="text-contrast/70 text-sm">Basic tabs with string labels and content panels.</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Tabs
				onChange={(index: number) => {
					console.log('Tab changed to:', index);
				}}
				tabs={simpleTabs}
				bind:activeTab={simpleActiveTab}
			>
				{#snippet tab1()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Overview</h3>
						<p class="text-contrast/80">
							This is the overview section. Here you can see a summary of all important information
							at a glance.
						</p>
					</div>
				{/snippet}
				{#snippet tab2()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Details</h3>
						<p class="text-contrast/80">
							Detailed information is displayed here. This section provides in-depth data and
							comprehensive insights.
						</p>
					</div>
				{/snippet}
				{#snippet tab3()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Settings</h3>
						<p class="text-contrast/80">
							Configure your preferences and customize the experience to your liking in this
							section.
						</p>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</section>

	<!-- Tabs with Icons -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Tabs with Icons</h2>
			<p class="text-contrast/70 text-sm">
				Tabs can include prefix icons for better visual identification.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Tabs
				onChange={(index: number) => {
					console.log('Tab changed to:', index);
				}}
				tabs={simpleTabs}
				bind:activeTab={simpleActiveTab}
			>
				{#snippet tab({ index, item, stepper })}
					{#if item === 'Overview'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-contrast/80">
								Content for {index}
							</p>
						</div>
					{:else if item === 'Details'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-contrast/80">
								Content for {index}
							</p>
						</div>
					{:else if item === 'Settings'}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">{item}</h3>
							<p class="text-contrast/80">
								Content for {index}
							</p>
						</div>
					{/if}
				{/snippet}
			</Tabs>
		</div>
	</section>
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Tabs with Icons</h2>
			<p class="text-contrast/70 text-sm">
				Tabs can include prefix icons for better visual identification.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Tabs tabs={iconTabs} bind:activeTab={iconActiveTab}>
				{#snippet tab1()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">Home Dashboard</h3>
						<div class="mt-4 grid grid-cols-3 gap-4">
							<div class="bg-primary/10 rounded-lg p-4">
								<div class="text-primary text-2xl font-bold">24</div>
								<div class="text-contrast/70 text-sm">Active Projects</div>
							</div>
							<div class="bg-success/10 rounded-lg p-4">
								<div class="text-success text-2xl font-bold">156</div>
								<div class="text-contrast/70 text-sm">Completed Tasks</div>
							</div>
							<div class="bg-warning/10 rounded-lg p-4">
								<div class="text-warning text-2xl font-bold">8</div>
								<div class="text-contrast/70 text-sm">Pending Reviews</div>
							</div>
						</div>
					</div>
				{/snippet}
				{#snippet tab2()}
					<div class="p-6">
						<h3 class="mb-3 text-xl font-semibold">User Profile</h3>
						<div class="space-y-3">
							<div class="border-surface-muted flex justify-between border-b py-2">
								<span class="text-contrast/70">Username</span>
								<span class="font-medium">johndoe</span>
							</div>
							<div class="border-surface-muted flex justify-between border-b py-2">
								<span class="text-contrast/70">Email</span>
								<span class="font-medium">john@example.com</span>
							</div>
							<div class="border-surface-muted flex justify-between border-b py-2">
								<span class="text-contrast/70">Member Since</span>
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
									<div class="text-contrast/70 text-sm">Use dark theme</div>
								</div>
								<Button size="small" variant="outline">Toggle</Button>
							</div>
							<div class="flex items-center justify-between">
								<div>
									<div class="font-medium">Notifications</div>
									<div class="text-contrast/70 text-sm">Enable push notifications</div>
								</div>
								<Button size="small" variant="outline">Configure</Button>
							</div>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</section>

	<!-- Programmatic Navigation -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Programmatic Navigation</h2>
			<p class="text-contrast/70 text-sm">
				Control tab navigation programmatically using the stepper reference.
			</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Tabs
				tabs={['Step 1', 'Step 2', 'Step 3']}
				bind:activeTab={programmaticActiveTab}
				bind:stepper
			>
				{#snippet tab1({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Welcome to Step 1</h3>
						<p class="text-contrast/80">This is the first step of the process.</p>
						<div class="flex gap-2">
							<Button onClick={() => stepper?.next()}>Next Step</Button>
						</div>
					</div>
				{/snippet}
				{#snippet tab2({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Step 2 in Progress</h3>
						<p class="text-contrast/80">You're making progress! This is the middle step.</p>
						<div class="flex gap-2">
							<Button variant="outline" onClick={() => stepper?.previous()}>Previous</Button>
							<Button onClick={() => stepper?.next()}>Next Step</Button>
						</div>
					</div>
				{/snippet}
				{#snippet tab3({ stepper })}
					<div class="space-y-4 p-6">
						<h3 class="text-xl font-semibold">Final Step Complete!</h3>
						<p class="text-contrast/80">You've reached the end of the process.</p>
						<div class="flex gap-2">
							<Button variant="outline" onClick={() => stepper?.previous()}>Previous</Button>
							<Button color="success" onClick={() => stepper?.goTo(0)}>Start Over</Button>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</section>

	<!-- Tab Placement -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Tab Placement</h2>
			<p class="text-contrast/70 text-sm">
				Control where the tabbar appears: top, bottom, left, or right.
			</p>
		</div>
		<div class="border-surface-muted bg-surface space-y-6 rounded-lg border p-6">
			<!-- Left Placement -->
			<div>
				<p class="text-contrast/70 mb-2 text-sm font-medium">Left Placement (Sidebar Style)</p>
				<div class="border-surface-muted h-64 rounded border">
					<Tabs
						tabs={verticalTabs}
						bind:activeTab={verticalActiveTab}
						placement="left"
						tabbarSize="small"
					>
						{#snippet tab1()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Dashboard Overview</h3>
								<p class="text-contrast/80">
									Your main dashboard with key metrics and quick actions.
								</p>
							</div>
						{/snippet}
						{#snippet tab2()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Analytics Data</h3>
								<p class="text-contrast/80">
									Detailed analytics and performance metrics for your account.
								</p>
							</div>
						{/snippet}
						{#snippet tab3()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Generated Reports</h3>
								<p class="text-contrast/80">View and download your generated reports here.</p>
							</div>
						{/snippet}
					</Tabs>
				</div>
			</div>

			<!-- Right Placement -->
			<div>
				<p class="text-contrast/70 mb-2 text-sm font-medium">Right Placement</p>
				<div class="border-surface-muted h-64 rounded border">
					<Tabs tabs={['Option A', 'Option B', 'Option C']} placement="right" tabbarSize="small">
						{#snippet tab1()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Option A</h3>
								<p class="text-contrast/80">Content for option A with tabs on the right.</p>
							</div>
						{/snippet}
						{#snippet tab2()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Option B</h3>
								<p class="text-contrast/80">Content for option B with tabs on the right.</p>
							</div>
						{/snippet}
						{#snippet tab3()}
							<div class="p-6">
								<h3 class="mb-3 text-xl font-semibold">Option C</h3>
								<p class="text-contrast/80">Content for option C with tabs on the right.</p>
							</div>
						{/snippet}
					</Tabs>
				</div>
			</div>

			<!-- Bottom Placement -->
			<div>
				<p class="text-contrast/70 mb-2 text-sm font-medium">Bottom Placement</p>
				<Tabs tabs={['First', 'Second', 'Third']} placement="bottom">
					{#snippet tab1()}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">First Tab</h3>
							<p class="text-contrast/80">Content appears above the tabs.</p>
						</div>
					{/snippet}
					{#snippet tab2()}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">Second Tab</h3>
							<p class="text-contrast/80">Tabs are positioned at the bottom.</p>
						</div>
					{/snippet}
					{#snippet tab3()}
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold">Third Tab</h3>
							<p class="text-contrast/80">Great for mobile-style navigation.</p>
						</div>
					{/snippet}
				</Tabs>
			</div>
		</div>
	</section>

	<!-- Form Example -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Multi-Step Form</h2>
			<p class="text-contrast/70 text-sm">Use tabs to create multi-step forms with validation.</p>
		</div>
		<div class="border-surface-muted bg-surface rounded-lg border p-6">
			<Tabs
				tabs={formTabs}
				bind:activeTab={formActiveTab}
				onChange={handleTabChange}
				tabbarColor="secondary"
			>
				{#snippet tab1()}
					<div class="space-y-4 p-6">
						<h3 class="mb-4 text-xl font-semibold">Personal Information</h3>
						<TextInput label="Full Name" bind:value={formData.name} placeholder="John Doe" />
						<p class="text-contrast/60 text-sm">
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
						<p class="text-contrast/60 text-sm">We'll never share your email with anyone else.</p>
					</div>
				{/snippet}
				{#snippet tab3()}
					<div class="space-y-4 p-6">
						<h3 class="mb-4 text-xl font-semibold">Preferences</h3>
						<div class="bg-surface-muted flex items-center justify-between rounded-lg p-4">
							<div>
								<div class="font-medium">Email Notifications</div>
								<div class="text-contrast/70 text-sm">Receive updates via email</div>
							</div>
							<input type="checkbox" bind:checked={formData.notifications} class="h-5 w-5" />
						</div>
						<div class="mt-6 flex gap-2">
							<Button color="primary" fullWidth>Save Profile</Button>
						</div>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</section>

	<!-- Custom Styling -->
	<section class="space-y-4">
		<div>
			<h2 class="mb-2 text-2xl font-semibold">Custom Styling</h2>
			<p class="text-contrast/70 text-sm">
				Customize tab appearance with different sizes, colors, and alignments.
			</p>
		</div>
		<div class="border-surface-muted bg-surface space-y-6 rounded-lg border p-6">
			<div>
				<p class="text-contrast/70 mb-2 text-sm font-medium">Large Size, Success Color</p>
				<Tabs
					tabs={['Tab 1', 'Tab 2']}
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
				<p class="text-contrast/70 mb-2 text-sm font-medium">Small Size, Danger Color</p>
				<Tabs
					tabs={['Alert', 'Warning']}
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
	</section>
</div>
