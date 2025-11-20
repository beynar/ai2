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

## Theme Customization

The Avatar component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **avatar**: Main avatar container styles
- **avatarImage**: Avatar image element styles
- **avatarPrefix**: Prefix badge styles (bottom-left)
- **avatarSuffix**: Suffix badge styles (bottom-right)
- **avatarInitials**: Fallback initials display styles

### Theme Type Definition

\`\`\`typescript
import type { AvatarThemeProps } from 'svelai/avatar';

// Example theme customization
const customTheme: AvatarThemeProps = {
  avatar: {
    base: 'custom-base-classes',
    size: {
      small: 'size-6',
      normal: 'size-8',
      large: 'size-10'
    }
  },
  avatarImage: {
    size: {
      small: '',
      normal: '',
      large: ''
    }
  },
  avatarPrefix: {
    size: {
      small: 'size-5 right-[-0.25rem] bottom-[-0.25rem]',
      normal: 'size-4 right-[-0.3rem] bottom-[-0.2rem]',
      large: 'size-5 left-[-0.4rem] bottom-[-0.4rem]'
    }
  },
  avatarSuffix: {
    size: {
      small: 'size-3.5 left-[-0.25rem] bottom-[-0.25rem]',
      normal: 'size-4 right-[-0.3rem] bottom-[-0.3rem]',
      large: 'size-3.5 right-[-0.4rem] bottom-[-0.4rem]'
    }
  },
  avatarInitials: {
    size: {
      small: 'text-xs',
      normal: 'text-sm',
      large: 'text-base'
    }
  }
};
\`\`\`

### Available Variants

**avatar**:
- base: Base classes applied to all avatars
- Variants:
  - size: 'small' | 'normal' | 'large' - Controls avatar dimensions (6/8/10)

**avatarImage**:
- base: Base classes for avatar image
- Variants:
  - size: 'small' | 'normal' | 'large' - Inherited from avatar size

**avatarPrefix**:
- base: Base classes for prefix badge
- Variants:
  - size: 'small' | 'normal' | 'large' - Badge size and positioning based on avatar size

**avatarSuffix**:
- base: Base classes for suffix badge
- Variants:
  - size: 'small' | 'normal' | 'large' - Badge size and positioning based on avatar size

**avatarInitials**:
- base: Base classes for initials fallback
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size based on avatar size

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Avatar 
  user={{ name: 'John Doe' }}
  theme={{
    avatar: {
      base: 'ring-2 ring-primary',
      size: {
        large: 'size-12'
      }
    },
    avatarInitials: {
      size: {
        large: 'text-lg'
      }
    }
  }}
/>
\`\`\`

**Custom Badge Styling**:
\`\`\`svelte
<Avatar user={{ name: 'Jane Smith' }}>
  {#snippet suffix()}
    <div class="w-3 h-3 bg-success rounded-full"></div>
  {/snippet}
  {#snippet theme()}
    {{
      avatarSuffix: {
        size: {
          normal: 'size-5 ring-2 ring-white'
        }
      }
    }}
  {/snippet}
</Avatar>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setAvatarTheme } from 'svelai/avatar';
  
  setAvatarTheme({
    avatar: {
      base: 'ring-2 ring-surface-muted transition-all',
      size: {
        normal: 'size-10'
      }
    },
    avatarInitials: {
      base: 'font-bold'
    }
  });
</script>
\`\`\`
`;
