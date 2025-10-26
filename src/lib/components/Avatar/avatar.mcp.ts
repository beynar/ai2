export const avatarDescription = `
# Avatar Component

The Avatar component displays a user's profile picture with fallback initials. It supports loading states, various sizes, and badges (prefix/suffix). The AvatarGroup component displays multiple avatars with overlap.

## Basic Usage

\`\`\`svelte
<Avatar user={{ name: 'John Doe', avatar: 'https://example.com/avatar.png' }} />
\`\`\`

## Props

### Core Props
- **user**: { name: string; avatar?: string } & T (required) - User object with name and optional avatar URL
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: 24px (1.5rem)
  - normal: 32px (2rem)
  - large: 40px (2.5rem)

### Loading Props
- **delay**: number (default: 0) - Delay in milliseconds before showing avatar
- **loadingState**: 'waiting' | 'loading' | 'errored' | 'success' (default: 'waiting') - Current loading state, can be bindable

### Content Slots
- **prefix**: Snippet<{ name: string; avatar?: string }> - Badge/icon positioned at bottom-left
- **suffix**: Snippet<{ name: string; avatar?: string }> - Badge/icon positioned at bottom-right

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Avatar Structure

\`\`\`
<Avatar>
	<AvatarImage />        <!-- Profile picture -->
	<AvatarPrefix />       <!-- Behind the image (bottom-left) -->
	<AvatarSuffix />       <!-- Absolute position (bottom-right) -->
	<AvatarInitials />     <!-- Fallback initials -->
</Avatar>
\`\`\`

## AvatarGroup Props

### Core Props
- **users**: Array<{ name: string; avatar?: string } & T> (required) - Array of user objects
- **max**: number - Maximum number of avatars to show before "+N" indicator
- **size**: 'small' | 'normal' | 'large' (default: 'normal')

### Content Slots
- **avatar**: Snippet<{ user: T; index: number; avatarProps }> - Custom avatar rendering
- **remainingCount**: Snippet<{ users: T[]; remaining: number }> - Custom "+N" counter rendering

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## AvatarGroup Structure

\`\`\`
<AvatarGroup>
	<Avatar />
	<Avatar />
	<Avatar />
	<AvatarGroupCount />   <!-- "+N" indicator -->
</AvatarGroup>
\`\`\`

## Examples

### Basic Avatar
\`\`\`svelte
<Avatar user={{ name: 'Jane Smith', avatar: '/images/jane.jpg' }} />
\`\`\`

### Without Image (Initials)
\`\`\`svelte
<Avatar user={{ name: 'John Doe' }} />
<!-- Displays "JD" -->
\`\`\`

### Different Sizes
\`\`\`svelte
<Avatar size="small" user={{ name: 'Small User' }} />
<Avatar size="normal" user={{ name: 'Normal User' }} />
<Avatar size="large" user={{ name: 'Large User' }} />
\`\`\`

### With Status Badge (Prefix)
\`\`\`svelte
<Avatar user={{ name: 'John Doe' }}>
	{#snippet prefix()}
		<div class="w-2 h-2 rounded-full bg-success"></div>
	{/snippet}
</Avatar>
\`\`\`

### With Icon Badge (Suffix)
\`\`\`svelte
<Avatar user={{ name: 'Jane Smith' }}>
	{#snippet suffix()}
		<Icon name="check" class="text-success" />
	{/snippet}
</Avatar>
\`\`\`

### With Loading State
\`\`\`svelte
<script>
	let loadingState = $state('loading');
</script>

<Avatar 
	user={{ name: 'John Doe', avatar: '/avatar.jpg' }}
	bind:loadingState
/>
{loadingState}
\`\`\`

### Avatar Group
\`\`\`svelte
<script>
	let users = [
		{ name: 'John Doe', avatar: '/john.jpg' },
		{ name: 'Jane Smith', avatar: '/jane.jpg' },
		{ name: 'Bob Johnson', avatar: '/bob.jpg' }
	];
</script>

<AvatarGroup {users} />
\`\`\`

### Avatar Group with Max Limit
\`\`\`svelte
<AvatarGroup 
	users={[
		{ name: 'User 1' },
		{ name: 'User 2' },
		{ name: 'User 3' },
		{ name: 'User 4' },
		{ name: 'User 5' }
	]}
	max={3}
/>
<!-- Shows 3 avatars + "+2" indicator -->
\`\`\`

### Custom Avatar in Group
\`\`\`svelte
<AvatarGroup {users}>
	{#snippet avatar({ user, index, avatarProps })}
		<Avatar {...avatarProps} user={user}>
			{#snippet suffix()}
				<span class="text-xs">{index + 1}</span>
			{/snippet}
		</Avatar>
	{/snippet}
</AvatarGroup>
\`\`\`

### Custom Remaining Count
\`\`\`svelte
<AvatarGroup {users} max={3}>
	{#snippet remainingCount({ remaining, users })}
		<div class="avatar-count">
			+{remaining} more
		</div>
	{/snippet}
</AvatarGroup>
\`\`\`

### Status Indicators
\`\`\`svelte
<Avatar user={{ name: 'Online User' }}>
	{#snippet suffix()}
		<div class="w-3 h-3 rounded-full bg-success border-2 border-surface"></div>
	{/snippet}
</Avatar>

<Avatar user={{ name: 'Away User' }}>
	{#snippet suffix()}
		<div class="w-3 h-3 rounded-full bg-warning border-2 border-surface"></div>
	{/snippet}
</Avatar>
\`\`\`

## Accessibility

- Automatically generates alt text from user name
- Fallback to initials when image fails to load
- Proper contrast for initials display
- Image loading states are tracked

## Notes

- Initials are automatically extracted from the name (first letter of first two words)
- Avatar image uses object-cover to maintain aspect ratio
- Prefix badge is positioned at bottom-left, behind the image
- Suffix badge is positioned at bottom-right, absolute positioning
- Avatar group creates overlapping effect with negative margins
- Loading states: waiting → loading → success/errored
`;
