export const toastDescription = `
The toast function displays non-blocking notification messages to the user. It provides color-based methods (primary, secondary, success, warning, danger, info, surface, contrast) that each return a Toast instance.


**Usage:**
\`\`\`typescript
import { toast } from 'svelai/toast';

// Basic toast with a color variant
toast.success({
  title: 'Success!',
  description: 'Your changes have been saved.',
  duration: 4000
});

// Toast with custom position
toast.danger({
  title: 'Error',
  description: 'Something went wrong.',
  position: 'top-center',
  duration: 5000
});

// Toast with loading state
toast.info({
  title: 'Processing',
  description: 'Please wait...',
  loading: true,
  duration: false // Don't auto-close
});

// Toast with callbacks
toast.warning({
  title: 'Warning',
  description: 'This action cannot be undone.',
  duration: 6000,
  onOpen: (toast) => console.log('Toast opened:', toast.id),
  onClose: (toast) => console.log('Toast closed:', toast.id),
  onAutoClose: (toast) => console.log('Toast auto-closed:', toast.id)
});
\`\`\`

**Available Color Methods:**
- \`toast.primary(options)\` - Primary color variant
- \`toast.secondary(options)\` - Secondary color variant
- \`toast.success(options)\` - Success/green variant
- \`toast.warning(options)\` - Warning/yellow variant
- \`toast.danger(options)\` - Danger/red variant
- \`toast.info(options)\` - Info/blue variant
- \`toast.surface(options)\` - Surface color variant
- \`toast.contrast(options)\` - Contrast color variant

**Parameters (all optional):**
- \`title\` (Slot or string): The toast title text
- \`description\` (Slot or string) optional: The toast description/message text
- \`position\` (ToastPosition, optional): Position on screen. Options: \`'top-left'\`, \`'top-right'\`, \`'top-center'\`, \`'bottom-left'\`, \`'bottom-right'\`, \`'bottom-center'\`. Default: \`'bottom-right'\`
- \`duration\` (number | false, optional): Time in milliseconds before auto-closing. Set to \`false\` to disable auto-close. Default: 4000ms
- \`closeOnClick\` (boolean, optional): If true, clicking the toast closes it. Default: inherited from Toaster
- \`showCloseIcon\` (boolean, optional): If true, shows a close button. Default: inherited from Toaster
- \`dismissible\` (boolean, optional): If false, prevents user from dismissing. Default: inherited from Toaster
- \`richColors\` (boolean, optional): If true, uses richer color variants. Default: inherited from Toaster
- \`loading\` (boolean, optional): If true, shows a loading spinner
- \`size\` (Sizes, optional): Size of the toast. Options: \`'small'\`, \`'medium'\`, \`'large'\`
- \`prefix\` (Slot | false, optional): Content to display before the toast text
- \`suffix\` (Slot, optional): Content to display after the toast text
- \`closeIcon\` (Slot, optional): Custom close button component
- \`icon\` (string, optional): Icon name to display before the toast text
- \`important\` (boolean, optional): Controls screen reader sensitivity
- \`animation\` (FSOProps, optional): Custom animation for this toast
- \`id\` (string, optional): Custom ID for the toast. Auto-generated if not provided
- \`onOpen\` (function, optional): Callback when toast opens: \`(toast: Toast) => void\`
- \`onClose\` (function, optional): Callback when toast closes: \`(toast: Toast) => void\`
- \`onAutoClose\` (function, optional): Callback when toast auto-closes after duration: \`(toast: Toast) => void\`

**Returns:**
A \`Toast\` instance that you can use to programmatically control the toast:
- \`toast.remove()\` - Remove the toast manually
- \`toast.id\` - Unique identifier
- \`toast.opts\` - Toast options

**Notes:**
- Toasts are non-blocking and don't prevent user interaction
- Multiple toasts can be displayed simultaneously and will stack based on position
- Toasts pause their auto-close timer when hovered
- Toasts can be dismissed by clicking the close icon, clicking the toast (if \`closeOnClick\` is true), or automatically after the duration expires

## Theme Customization

The Toast component uses a theme object that can be customized using the \`theme\` prop in toast options or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **toast**: Main toast container styles
- **prefix**: Prefix icon/content styles
- **suffix**: Suffix content styles
- **content**: Content wrapper styles
- **closeIcon**: Close button icon styles
- **title**: Title text styles
- **description**: Description text styles

### Available Variants

**toast**:
- base: Base classes for toast container
- Variants:
  - richColors: boolean - Rich color variant styling
  - color: Color variants
  - size: 'small' | 'normal' | 'large' - Toast size

**prefix**:
- base: Base classes for prefix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size
  - color: Color variants
  - richColors: boolean - Rich color variant styling

**suffix**:
- base: Base classes for suffix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Content size
  - color: Color variants
  - richColors: boolean - Rich color variant styling

**content**:
- base: Base classes for content wrapper
- Variants:
  - size: 'small' | 'normal' | 'large' - Content size
  - color: Color variants
  - richColors: boolean - Rich color variant styling

**closeIcon**:
- base: Base classes for close button
- Variants:
  - richColors: boolean - Rich color variant styling
  - color: Color variants

**title**:
- base: Base classes for title text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size
  - color: Color variants
  - richColors: boolean - Rich color variant styling

**description**:
- base: Base classes for description text
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size
  - color: Color variants
  - richColors: boolean - Rich color variant styling

### Usage Examples

**Basic Theme Override**:
\`\`\`typescript
import { toast } from 'svelai/toast';

toast.success({
  title: 'Success',
  description: 'Operation completed',
  theme: {
    toast: {
      base: 'rounded-xl shadow-xl',
      size: {
        normal: 'px-4 py-3'
      }
    }
  }
});
\`\`\`

**Custom Toast Styling**:
\`\`\`typescript
toast.danger({
  title: 'Error',
  description: 'Something went wrong',
  theme: {
    toast: {
      base: 'border-2 border-red-500',
      richColors: {
        true: 'bg-red-50 border-red-500'
      }
    },
    title: {
      base: 'font-bold text-red-900'
    }
  }
});
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setToastTheme } from 'svelai/toast';
  
  setToastTheme({
    toast: {
      base: 'rounded-lg shadow-lg border',
      size: {
        normal: 'px-3 py-2'
      }
    },
    title: {
      base: 'font-semibold'
    }
  });
</script>
\`\`\`
`;
