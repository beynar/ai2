export const dataTableDescription = `
# DataTable

DataTable is the interactive, virtualized table component for application data. It keeps the
Svelai API public and uses TanStack Table Core privately. Use the lighter \`Table\` component
for static rows that do not need sorting, filtering, selection, editing, grouping, or pagination.

## Basic usage

\`\`\`svelte
<script lang="ts">
  import { DataTable, type DataTableColumn } from 'svelai/data-table';

  type Person = {
    id: string;
    name: string;
    role: string;
    active: boolean;
  };

  const items: Person[] = [
    { id: 'p-1', name: 'Ada Lovelace', role: 'Engineer', active: true },
    { id: 'p-2', name: 'Grace Hopper', role: 'Admiral', active: true }
  ];

  const columns: DataTableColumn<Person>[] = [
    { id: 'name', accessor: 'name', header: 'Name', sortable: true, filter: { type: 'text' } },
    {
      id: 'role',
      accessor: 'role',
      header: 'Role',
      filter: {
        type: 'select',
        options: [
          { value: 'Engineer', label: 'Engineer' },
          { value: 'Admiral', label: 'Admiral' }
        ]
      }
    },
    { id: 'active', accessor: 'active', header: 'Active', filter: { type: 'boolean' } }
  ];
</script>

<DataTable
  {items}
  {columns}
  getRowId={(person) => person.id}
  height={420}
  search
  pagination={{ pageSize: 25, pageSizes: [25, 50, 100] }}
/>
\`\`\`

\`items\`, \`columns\`, \`getRowId\`, and \`height\` are required. Stable identity and a
bounded virtual viewport are deliberately never inferred.

## Core props

- **items**: \`readonly TData[]\` — rows available to the current processing mode.
- **columns**: \`readonly DataTableColumn<TData>[]\` — typed Svelai column definitions.
- **getRowId**: \`(row, index, parent?) => string\` — stable identity for selection and expansion.
- **height**: \`string | number\` — required height of the scroll viewport.
- **density**: \`'small' | 'normal' | 'large'\`, default \`'normal'\`.
- **interactionMode**: \`'table' | 'grid'\`, default \`'table'\`.
- **processingMode**: \`'client' | 'manual'\`, default \`'client'\`.
- **selectionMode**: \`'none' | 'single' | 'multiple'\`, default \`'none'\`.
- **pagination**: \`false | DataTablePaginationConfig\`; defaults to 25 rows with 25/50/100 choices.
- **search**: \`false | true | DataTableSearchConfig\`, default \`false\`.
- **stickyHeader**: boolean, default \`true\`.
- **overscan**: virtual rows mounted beyond the viewport, default \`6\`.
- **estimatedRowHeight**: optional row estimate; density defaults are 32, 40, and 48 pixels.
- **animateRows**: opt-in FLIP movement for stable rows after sorting or filtering, default \`false\`.
- **disabled**: disables selection and editing controls.
- **loading** / **error**: asynchronous presentation states. Loading preserves existing rows,
  marks the table busy, and drives its NetworkIndicator; an empty loading table uses the loading slot.
- **class**, **theme**, **ref**, and Svelte attachments follow normal Svelai conventions.

## Column definitions

\`DataTableColumn<TData, TValue>\` has these fields:

- **id**: stable column identifier.
- **accessor**: a key of \`TData\` or \`(row, index) => TValue\`.
- **header**: string or snippet receiving \`DataTableHeaderPayload<TData>\`.
- **cell**: optional string/snippet receiving \`DataTableCellPayload<TData, TValue>\`.
- **aggregatedCell**: optional aggregate renderer with the same cell payload.
- **sortable**: boolean or comparator \`(left, right, columnId) => number\`.
- **filter**: one built-in filter configuration.
- **groupable**: enables grouping from the column menu.
- **aggregation**: \`count | sum | min | max | mean | median | uniqueCount\` or a custom function.
- **editor**: one built-in editor or a custom editor snippet.
- **hideable**, **resizable**, **reorderable**, **pinnable**: capability flags.
- **align**: \`start | center | end\`.
- **size**, **minSize**, **maxSize**: pixel sizing. Defaults are 180, 80, and 640.
- **class** / **headerClass**: column-level classes for cells and headers.

Header payload:

\`\`\`ts
type DataTableHeaderPayload<TData> = {
  column: DataTableColumn<TData>;
  sorted: false | 'asc' | 'desc';
  sortIndex: number;
  filtered: boolean;
  toggleSorting: (multi?: boolean) => void;
};
\`\`\`

Cell payload:

\`\`\`ts
type DataTableCellPayload<TData, TValue = unknown> = {
  row: TData;
  rowId: string;
  columnId: string;
  value: TValue;
  selected: boolean;
  expanded: boolean;
  depth: number;
  aggregated: boolean;
  grouped: boolean;
  toggleSelected: () => void;
  toggleExpanded: () => void;
  startEditing: () => void;
};
\`\`\`

## Filters

- \`{ type: 'text', placeholder? }\`
- \`{ type: 'number', min?, max? }\` — minimum/maximum range.
- \`{ type: 'select', options }\`
- \`{ type: 'multi-select', options }\`
- \`{ type: 'date', min?, max? }\` — start/end date range.
- \`{ type: 'boolean', trueLabel?, falseLabel? }\`

Each column filter opens in a Popover, exposes its active state, and includes a clear command.
Global search can be enabled with \`search\` or configured with placeholder and debounce values.
Changing search, column filters, sorting, or grouping resets pagination to page one.

## State contract

Bind one state object instead of individual fields:

\`\`\`ts
type DataTableState = {
  sorting: { id: string; desc: boolean }[];
  globalFilter: string;
  columnFilters: { id: string; value: unknown }[];
  pagination: { page: number; pageSize: number }; // page is one-based
  rowSelection: Record<string, boolean>;
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
  columnPinning: { left: string[]; right: string[] };
  columnSizing: Record<string, number>;
  grouping: string[];
  expanded: Record<string, boolean>;
};
\`\`\`

\`initialState\` is read once. A supplied bindable \`state\` takes precedence. Every update
replaces the changed slice immutably and invokes \`onStateChange(nextState)\`.

\`\`\`svelte
<DataTable bind:state onStateChange={(next) => savePreferences(next)} {...props} />
\`\`\`

Row selection is keyed by \`getRowId\`, so it persists when filtering or moving between loaded
pages. The header checkbox selects the current page only.

## Client and manual processing

Client mode runs filtering, sorting, grouping, aggregation, expansion, and pagination locally.

Manual mode delegates filtering, sorting, grouping, aggregation, and pagination as one contract.
It requires \`rowCount\`; \`items\` must already contain the processed current page. Observe
\`state\` or \`onStateChange\`, fetch the matching page, and pass it back without expecting
DataTable to reprocess it.

\`\`\`svelte
<DataTable
  processingMode="manual"
  {rowCount}
  {items}
  {columns}
  bind:state
  getRowId={(row) => row.id}
  height={420}
  {loading}
  animateRows
/>
\`\`\`

## Editing

Built-in editors are text, number, select, date, and switch. DataTable never mutates rows.
Committing calls:

\`\`\`ts
onCellCommit?: (commit: {
  row: TData;
  rowId: string;
  columnId: string;
  previousValue: unknown;
  value: unknown;
}) => void | Promise<void>;
\`\`\`

The editor owns a draft. A changed value renders optimistically while a table-level
NetworkIndicator tracks the asynchronous commit; unchanged values close without invoking
\`onCellCommit\`. A rejected promise rolls the value back, restores the editor, and exposes its
error. Enter and clicking outside the editor commit, Escape cancels, and Tab commits before native
focus movement.

A custom editor uses \`{ type: 'custom', render }\`. Its payload contains row metadata,
\`draft\`, \`pending\`, \`error\`, \`setDraft(value)\`, \`commit()\`, and \`cancel()\`.

## Expansion, grouping, and aggregation

- **getSubRows** returns hierarchical child rows.
- **canExpand** overrides whether a row can expand.
- **expandedContent** renders a detail region for expanded leaf rows.
- Groupable columns expose grouping commands in their header menu.
- Group rows show disclosure state, group value, child count, and aggregate values.

## Slots

- **caption** — semantic table caption.
- **toolbarPrefix** / **toolbarSuffix** — toolbar content.
- **bulkActions** — shown while loaded rows are selected.
- **rowActions** — actions column for each row.
- **expandedContent** — detail content for expanded leaf rows.
- **loadingContent**, **empty**, **noResults**, **errorContent** — state overrides.

Toolbar slots receive \`state\`, \`selectedRows\`, \`visibleRows\`, \`clearFilters()\`, and
\`clearSelection()\`. Row slots receive row identity, selection/expansion state, depth, and
toggle actions.

## Accessibility and keyboard behavior

The default \`interactionMode="table"\` uses native semantic table navigation and leaves the tab
order to controls. Sorting cycles ascending, descending, and none; Shift-click adds sort columns.
The primary sorted header uses \`aria-sort\`, and additional sort priority is announced in labels.

\`interactionMode="grid"\` adds one roving cell tab stop. Arrow keys move between cells,
Home/End move across a row, Ctrl+Home/Ctrl+End move to table boundaries, and PageUp/PageDown move
by the visible page. Enter or F2 enters an editable/interactive cell. Escape returns from editing.
Logical row/column counts and indices remain exposed while rows and center columns are virtualized.

Resize handles support pointer dragging, arrow-key resizing, Home/End min/max sizing, and
double-click reset. Column reordering remains inside the current pin region. Pinning is explicit
through the header menu, and logical inset positioning preserves RTL behavior.

## Virtualization

Rows are always virtualized. Semantic table mode keeps all columns mounted so native header
relationships remain complete. Grid mode additionally virtualizes center columns while pinned
columns stay mounted. \`overscan\` defaults to six rows; dynamic measurement accounts for edited,
grouped, and expanded content.
`;
