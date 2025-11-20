export const tableDescription = `
# Table Component

The Table component provides a flexible way to display tabular data with support for headers, footers, and customizable rows. It's designed with a configuration-over-markup approach, allowing you to define table structure through props.

## Basic Usage

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	// Header can use strings directly (simplified syntax)
	const header = {
		name: 'Name',
		email: 'Email',
		role: 'Role'
	};
	
	// Rows can also use strings directly
	const rows = [
		{
			cells: {
				name: 'John Doe',
				email: 'john@example.com',
				role: 'Admin'
			}
		},
		{
			cells: {
				name: 'Jane Smith',
				email: 'jane@example.com',
				role: 'User'
			}
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

### Alternative Syntax

You can also use the full object syntax when you need additional properties:

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	// Full object syntax for cells with classes or spans
	const header = {
		name: { content: 'Name', class: 'w-32' },
		email: { content: 'Email' },
		role: { content: 'Role' }
	};
	
	const rows = [
		{
			cells: {
				name: { content: 'John Doe' },
				email: { content: 'john@example.com' },
				role: { content: 'Admin', class: 'text-success' }
			}
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

## Props

### Core Props
- **rows**: TableRow[] (required) - Array of rows to display in the table body
  - Each row can have either \`cells\` (object keyed by column name) or \`content\` (Slot) for flexible rendering
  - Cells in rows are rendered in the same order as the header keys (if header is provided)
- **header**: Record<string, TableCellValue> (optional) - Object of cells for the table header, keyed by column name
  - Each cell can be a \`TableCell\` object, a string, or a Snippet
- **footer**: Record<string, TableCellValue> (optional) - Object of cells for the table footer, keyed by column name
  - Each cell can be a \`TableCell\` object, a string, or a Snippet

### Content Props (Slots)
- **prefix**: Slot (optional) - Content rendered above the table
  - Useful for search/filter controls that will be added later
- **suffix**: Slot (optional) - Content rendered below the table
  - Useful for pagination controls that will be added later
- **caption**: Slot (optional) - Table caption rendered as a <caption> element

### Styling Props
- **class**: string (optional) - Additional CSS classes applied to the table wrapper
- **theme**: TableThemeProps (optional) - Theme overrides for custom styling

## TableCell Type

\`TableCell\` represents a single cell in header, footer, or row:

\`\`\`typescript
type TableCell = {
	content?: Slot;     // String or Snippet
	class?: string;     // Optional CSS classes
	rowSpan?: number;   // Number of rows the cell spans
	colSpan?: number;   // Number of columns the cell spans
};
\`\`\`

## TableCellValue Type

\`TableCellValue\` is a union type that allows flexible cell definitions:

\`\`\`typescript
type TableCellValue = TableCell | Slot;
\`\`\`

This means you can define cells in three ways:
1. **Full object**: \`{ content: 'Name', class: 'w-32' }\` - When you need classes or spans
2. **String**: \`'Name'\` - Simplified syntax for simple text content
3. **Snippet**: \`mySnippet\` - Direct snippet for custom rendering

## TableRow Type

\`TableRow\` represents a row in the table body. It supports two rendering modes:

\`\`\`typescript
type TableRow = {
	cells?: Record<string, TableCellValue>;  // Object of cells keyed by column name (structured mode)
	content?: Slot;                            // Direct content slot (flexible mode)
	class?: string;                            // Optional CSS classes for the row
};
\`\`\`

**Note**: 
- If both \`cells\` and \`content\` are provided, \`content\` takes precedence.
- When \`header\` is provided, cells in rows are rendered in the same order as the header keys.
- If no header is provided, cells are rendered in the order of their keys.
- Cells can be defined as strings, snippets, or full TableCell objects for maximum flexibility.

## Structure

\`\`\`
<div data-slot="table-wrapper">
	{#if prefix}
		<div data-slot="table-prefix">
			<Prefix />
		</div>
	{/if}
	
	<div data-slot="table-container">
		<table data-slot="table">
			{#if caption}
				<caption data-slot="table-caption">
					<Caption />
				</caption>
			{/if}
			
			{#if header}
				<thead data-slot="table-header">
					<tr>
						<th>...</th>
					</tr>
				</thead>
			{/if}
			
			<tbody data-slot="table-body">
				<tr>
					<td>...</td>
				</tr>
			</tbody>
			
			{#if footer}
				<tfoot data-slot="table-footer">
					<tr>
						<td>...</td>
					</tr>
				</tfoot>
			{/if}
		</table>
	</div>
	
	{#if suffix}
		<div data-slot="table-suffix">
			<Suffix />
		</div>
	{/if}
</div>
\`\`\`

## Examples

### Basic Table with Header and Rows

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	// Simplified syntax with strings
	const header = {
		product: 'Product',
		price: 'Price',
		stock: 'Stock'
	};
	
	const rows = [
		{
			cells: {
				product: 'Laptop',
				price: '$999',
				stock: '15'
			}
		},
		{
			cells: {
				product: 'Mouse',
				price: '$25',
				stock: '42'
			}
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

### Table with Mixed Cell Formats

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	{#snippet customStatus()}
		<span class="text-success">✓ Active</span>
	{/snippet}
	
	const header = {
		name: 'Name',  // String
		status: { content: customStatus },  // Snippet
		date: { content: 'Date', class: 'w-32' }  // Full object with class
	};
	
	const rows = [
		{
			cells: {
				name: 'John Doe',  // String
				status: customStatus,  // Snippet
				date: '2024-01-15'  // String
			}
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

### Table with Footer

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	const header = {
		item: { content: 'Item' },
		quantity: { content: 'Quantity' },
		total: { content: 'Total' }
	};
	
	const rows = [
		{
			cells: {
				item: { content: 'Product A' },
				quantity: { content: '2' },
				total: { content: '$200' }
			}
		},
		{
			cells: {
				item: { content: 'Product B' },
				quantity: { content: '1' },
				total: { content: '$150' }
			}
		}
	];
	
	const footer = {
		item: { content: 'Total' },
		quantity: { content: '3' },
		total: { content: '$350' }
	};
</script>

<Table {header} {rows} {footer} />
\`\`\`

### Table with Custom Row Content (Slot)

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	const header = {
		name: { content: 'Name' },
		actions: { content: 'Actions' }
	};
	
	{#snippet customRow()}
		<td>John Doe</td>
		<td>
			<button>Edit</button>
			<button>Delete</button>
		</td>
	{/snippet}
	
	const rows = [
		{ content: customRow }
	];
</script>

<Table {header} {rows} />
\`\`\`

### Table with Prefix and Suffix (Future Features)

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	import { TextInput } from 'svelai/text-input';
	import { Button } from 'svelai/button';
	
	const header = {
		name: { content: 'Name' },
		email: { content: 'Email' }
	};
	
	const rows = [
		{
			cells: {
				name: { content: 'John Doe' },
				email: { content: 'john@example.com' }
			}
		}
	];
</script>

<Table {header} {rows}>
	{#snippet prefix()}
		<div class="mb-4">
			<TextInput placeholder="Search..." />
		</div>
	{/snippet}
	
	{#snippet suffix()}
		<div class="mt-4 flex justify-between">
			<span>Showing 1-10 of 50</span>
			<div class="flex gap-2">
				<Button>Previous</Button>
				<Button>Next</Button>
			</div>
		</div>
	{/snippet}
</Table>
\`\`\`

### Table with Caption

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	const header = {
		month: { content: 'Month' },
		sales: { content: 'Sales' }
	};
	
	const rows = [
		{
			cells: {
				month: { content: 'January' },
				sales: { content: '$5000' }
			}
		}
	];
</script>

<Table {header} {rows}>
	{#snippet caption()}
		Monthly Sales Report
	{/snippet}
</Table>
\`\`\`

### Table with Custom Cell Classes

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	const header = {
		status: { content: 'Status', class: 'w-24' },
		description: { content: 'Description' }
	};
	
	const rows = [
		{
			cells: {
				status: { content: 'Active', class: 'text-success' },
				description: { content: 'System is running normally' }
			}
		},
		{
			cells: {
				status: { content: 'Warning', class: 'text-warning' },
				description: { content: 'High CPU usage detected' }
			},
			class: 'bg-warning/10'
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

### Table with RowSpan and ColSpan

\`\`\`svelte
<script>
	import { Table } from 'svelai/table';
	
	const header = {
		name: { content: 'Name' },
		details: { content: 'Details' },
		status: { content: 'Status' }
	};
	
	const rows = [
		{
			cells: {
				name: { content: 'John Doe', rowSpan: 2 },
				details: { content: 'Email: john@example.com' },
				status: { content: 'Active' }
			}
		},
		{
			cells: {
				details: { content: 'Phone: +1234567890' },
				status: { content: 'Active' }
			}
		}
	];
</script>

<Table {header} {rows} />
\`\`\`

## Accessibility

- Uses semantic HTML elements (\`<table>\`, \`<thead>\`, \`<tbody>\`, \`<tfoot>\`, \`<th>\`, \`<td>\`)
- Supports \`<caption>\` for table descriptions
- Proper heading structure with \`<th>\` elements in header
- Hover states for better interactivity feedback

## Notes

- The component uses a configuration-over-markup approach, making it easy to generate tables from data
- Header, footer, and row cells are defined as objects keyed by column name (\`Record<string, TableCell>\`)
- Cells in rows are automatically rendered in the same order as the header keys (if header is provided)
- Rows can use either structured \`cells\` objects or flexible \`content\` slots
- The \`prefix\` and \`suffix\` slots are designed for future features like search and pagination
- All parts of the table can be styled via the theme system
- The table container includes horizontal scroll for responsive design
- Rows have a subtle hover effect with \`bg-surface-muted/40\`
- All borders use \`border-surface-muted\` for consistency
- Rows have \`py-0.5\` padding for better spacing

## Theme Customization

The Table component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **container**: Table wrapper container styles
- **table**: Main table element styles
- **thead**: Table header section styles
- **tbody**: Table body section styles
- **tfoot**: Table footer section styles
- **row**: Table row styles
- **head**: Header cell styles
- **cell**: Data cell styles
- **caption**: Table caption styles
- **prefix**: Prefix slot container styles
- **suffix**: Suffix slot container styles

### Available Variants

**container**:
- base: Base classes for scrollable container

**table**:
- base: Base classes for table element

**thead**:
- base: Base classes for header section

**tbody**:
- base: Base classes for body section

**tfoot**:
- base: Base classes for footer section

**row**:
- base: Base classes for table rows
- Variants:
  - selected: boolean - Selected row styling (via data-state)

**head**:
- base: Base classes for header cells

**cell**:
- base: Base classes for data cells

**caption**:
- base: Base classes for table caption

**prefix**:
- base: Base classes for prefix slot

**suffix**:
- base: Base classes for suffix slot

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Table 
  {header}
  {rows}
  theme={{
    table: {
      base: 'border-collapse border-2'
    },
    row: {
      base: 'hover:bg-gray-50 transition-colors'
    },
    head: {
      base: 'bg-gray-100 font-semibold'
    }
  }}
/>
\`\`\`

**Custom Row Styling**:
\`\`\`svelte
<Table 
  {header}
  {rows}
  theme={{
    row: {
      base: 'border-b border-gray-200',
      selected: {
        true: 'bg-blue-50'
      }
    },
    cell: {
      base: 'px-4 py-2'
    },
    head: {
      base: 'px-4 py-3 text-left font-bold'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setTableTheme } from 'svelai/table';
  
  setTableTheme({
    table: {
      base: 'w-full border-collapse'
    },
    row: {
      base: 'hover:bg-gray-50 transition-colors',
      selected: {
        true: 'bg-primary/10'
      }
    },
    head: {
      base: 'bg-gray-100 font-semibold'
    }
  });
</script>
\`\`\`
`;

