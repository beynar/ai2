<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { Separator } from '$lib/components/Separator/index.js';
	import { MenuOption } from '$lib/components/MenuOption/index.js';
	import { userIcon } from '$lib/components/Icons/user.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { signOutIcon } from '$lib/components/Icons/signOut.js';
</script>

<DocPage
	title="Separator"
	subtitle="A visual divider between content or sections."
	component="Separator"
	features={[
		'role=separator with aria-orientation',
		'decorative mode skips semantics',
		'Horizontal & vertical orientations',
		'Optional centred label slot'
	]}
>
	<ComponentCard
		description="Horizontal divider between two blocks of content."
		code={`<p>Content above</p>
<Separator />
<p>Content below</p>`}
	>
		<div class="space-y-4">
			<p>Content above</p>
			<Separator />
			<p>Content below</p>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Content above and below a horizontal rule.">
			<div class="space-y-4">
				<div>
					<p>Content above</p>
					<Separator />
					<p>Content below</p>
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Centered label between divider lines.">
			<div class="space-y-6">
				<div>
					<p>Sign in with email</p>
					<Separator children="OR" />
					<p>Sign in with Google</p>
				</div>

				<div>
					<p>Section A</p>
					<Separator>CONTINUE</Separator>
					<p>Section B</p>
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Divider color tokens from the design system." class="!min-h-fit">
			<div class="space-y-4">
				<div>
					<p class="text-foreground/70 mb-2 text-sm">Background (default)</p>
					<Separator color="background" />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Primary</p>
					<Separator color="primary" />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Secondary</p>
					<Separator color="secondary" />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Success</p>
					<Separator color="success" />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Danger</p>
					<Separator color="danger" />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">With Label</p>
					<Separator color="primary" children="Primary Section" />
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Border thickness from 1px to 4px." class="!min-h-fit">
			<div class="space-y-4">
				<div>
					<p class="text-foreground/70 mb-2 text-sm">Size 1 (default)</p>
					<Separator size={1} />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Size 2</p>
					<Separator size={2} />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Size 4</p>
					<Separator size={4} />
				</div>

				<div>
					<p class="text-foreground/70 mb-2 text-sm">Size 4 with Color</p>
					<Separator size={4} color="primary" />
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Side-by-side content separated vertically." class="!min-h-fit">
			<div class="space-y-6">
				<div class="flex h-24 items-center gap-4">
					<div class="flex-1 text-center">Left Content</div>
					<Separator orientation="vertical" />
					<div class="flex-1 text-center">Right Content</div>
				</div>

				<div class="flex h-32 items-center gap-4">
					<div class="flex-1 text-center">Section A</div>
					<Separator orientation="vertical" color="primary" size={2} />
					<div class="flex-1 text-center">Section B</div>
					<Separator orientation="vertical" color="primary" size={2} />
					<div class="flex-1 text-center">Section C</div>
				</div>
			</div>
		</ComponentCard>

		<ComponentCard description="Dividing groups inside a menu panel.">
			<div class="bg-background rounded-xl border-background-muted w-64 border p-1">
				<MenuOption prefix={userIcon} title="Profile" description="View your profile" />
				<MenuOption prefix={gearIcon} title="Settings" description="Manage preferences" />

				<Separator class="my-1" />

				<MenuOption color="danger" prefix={signOutIcon} title="Log Out" />
			</div>
		</ComponentCard>

		<ComponentCard description="Section headings with labelled separators." class="!min-h-fit max-w-2xl">
			<div class="space-y-4">
				<section>
					<h3 class="text-xl font-semibold">Personal Information</h3>
					<p class="text-foreground/70">Manage your personal details</p>
				</section>

				<Separator color="primary" size={2} children="Account Settings" />

				<section>
					<h3 class="text-xl font-semibold">Security</h3>
					<p class="text-foreground/70">Password and authentication settings</p>
				</section>

				<Separator color="secondary" children="Preferences" />

				<section>
					<h3 class="text-xl font-semibold">Notifications</h3>
					<p class="text-foreground/70">Manage your notification preferences</p>
				</section>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
