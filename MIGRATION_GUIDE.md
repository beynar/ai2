# Migration Guide: Updating Imports to New Component Structure

## Objective

Update your application code to use the new standardized import structure for all components in svelai library. All components now export from `index.ts` files and use kebab-case package exports.

## What Changed

### Before (Old Structure)

- Components exported directly from `.svelte` files or mixed structure
- Mixed PascalCase and kebab-case export names
- Imports from various paths:
  ```typescript
  import Form from '$lib/components/Form/Form/Form.svelte';
  import type { FormProps } from '$lib/components/Form/Form/form.js';
  import { formTheme } from '$lib/components/Form/Form/form.js';
  ```

### After (New Structure)

- All components export from `index.ts` files
- Consistent kebab-case package exports
- Unified import paths:
  ```typescript
  import { Form, type Form } from 'svelai/form';
  ```

## Migration Patterns

### Pattern 1: Package Exports (Recommended)

Use the package.json exports with kebab-case names:

```typescript
// ✅ NEW - Package exports
import { Form } from 'svelai/form';
import { TextInput } from 'svelai/text-input';
import { MultiStepForm } from 'svelai/multi-step-form';
import { Button } from 'svelai/button';
import { Select } from 'svelai/select';
```

## Component Migration Reference

### Form Components

| Old Import               | New Import (Package)               |
| ------------------------ | ---------------------------------- |
| `TextInput.svelte`       | `from 'svelai/text-input'`         |
| `NumberInput.svelte`     | `from 'svelai/number-input'`       |
| `PasswordInput.svelte`   | `from 'svelai/password-input'`     |
| `TextArea.svelte`        | `from 'svelai/text-area'`          |
| `Select.svelte`          | `from 'svelai/select'`             |
| `Combobox.svelte`        | `from 'svelai/combobox'`           |
| `Switch.svelte`          | `from 'svelai/switch'`             |
| `DateInput.svelte`       | `from 'svelai/date-input'`         |
| `TimeInput.svelte`       | `from 'svelai/time-input'`         |
| `PhoneInput.svelte`      | `from 'svelai/phone-input'`        |
| `FileInput.svelte`       | `from 'svelai/file-input'`         |
| `RadioInput.svelte`      | `from 'svelai/radio-input'`        |
| `CheckBoxesInput.svelte` | `from 'svelai/checkboxes-input'`   |
| `CalendarInput.svelte`   | `from 'svelai/calendar-primitive'` |
| `MultiStepForm.svelte`   | `from 'svelai/multi-step-form'`    |
| `Button.svelte`          | `from 'svelai/button'`             |
| `Avatar.svelte`          | `from 'svelai/avatar'`             |
| `Badge.svelte`           | `from 'svelai/badge'`              |
| `Dialog.svelte`          | `from 'svelai/dialog'`             |
| `Toast.svelte`           | `from 'svelai/toast'`              |
| `Confirmation.svelte`    | `from 'svelai/confirmation'`       |

## Detailed Migration Examples

### Example 1: Simple Component Import

**Before:**

```svelte
<script>
	import Button from 'svela/Button';
</script>

<Button>Click me</Button>
```

**After:**

```svelte
<script>
	import { Button } from 'svelai/button';
</script>

<Button>Click me</Button>
```

### Example 2: Component with Props Types

**Before:**

```svelte
<script lang="ts">
	import TextInput from 'svelai/TextInput';
	import type { TextInputProps } from 'svelai/TextInput';

	let props: TextInputProps = {
		type: 'text',
		label: 'Name'
	};
</script>

<TextInput {...props} />
```

**After:**

```svelte
<script lang="ts">
	import { TextInput ,type TextInputProps } from 'svelai/text-input';


	let props: TextInputProps = {
		type: 'text',
		label: 'Name'
	};
</script>

<TextInput {...props} />
```

### Example 3: Component with Theme

**Before:**

```svelte
<script lang="ts">
	import Form, {setFormTheme} from 'svelai/Form';	
	const classes = useFormTheme();
</script>
```

**After:**

```svelte
<script lang="ts">
	import { Form, setFormTheme } from 'svelai/form';

setFormTheme({...})
</script>
```

### Example 4: Multiple Components and Types

**Before:**

```typescript
import Form from 'svelai/Form';
import TextInput from 'svelai/TextInput';
import Button from 'svelai/Button';
```

**After:**

```typescript
import { Form } from 'svelai/form';
import { TextInput } from 'svelai/text-input';
import { Button } from 'svelai/button';
```

### Example 5: Calendar Component (Multiple Exports)

**Before:**

```svelte
<script>
	import CalendarInput from 'svelai/Calendar/CalendarInput';
	import CalendarPrimitive from 'svelai/Form/Calendar/CalendarPrimitive';
</script>
```

**After:**

```svelte
<script>
	import { CalendarInput, CalendarPrimitive } from 'svelai/calendar';
</script>
```

## Verification Checklist

After migration, verify:

- [ ] All component imports use package exports (`svelai/component-name`)
- [ ] All components use named exports (`import { Component }`)
- [ ] All type imports use `type` keyword and new paths
- [ ] Theme functions imported from component packages
- [ ] No direct `.svelte` file imports remain
- [ ] No imports from old types files (e.g., `form.js`, `component.ts`)
- [ ] TypeScript compilation succeeds
- [ ] Application runs without errors
- [ ] All components render correctly
- [ ] Theme customization still works

## Package Export Reference

### Form Components (kebab-case)

- `svelai/form`
- `svelai/text-input`
- `svelai/number-input`
- `svelai/password-input`
- `svelai/text-area`
- `svelai/select`
- `svelai/combobox`
- `svelai/switch`
- `svelai/date-input`
- `svelai/time-input`
- `svelai/phone-input`
- `svelai/file-input`
- `svelai/radio-input`
- `svelai/checkboxes-input`
- `svelai/calendar-primitive`
- `svelai/multi-step-form`
- `svelai/button`
- `svelai/avatar`
- `svelai/badge`
- `svelai/chip`
- `svelai/dialog`
- `svelai/toast`
- `svelai/confirmation`
- `svelai/popover`
- `svelai/tooltip`
- `svelai/scroll-area`
- `svelai/stepper`
- `svelai/meter`
- `svelai/toggle-button`
- `svelai/toggle-button-group`

## Notes

- **Type Safety**: Always use `type` keyword for type-only imports





