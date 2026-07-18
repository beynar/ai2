export const basicDataTableCode = `<script lang="ts">
  import { DataTable, type DataTableColumn } from 'svelai/data-table';

  type Person = {
    id: string;
    name: string;
    department: string;
    salary: number;
  };

  const columns: DataTableColumn<Person>[] = [
    {
      id: 'name',
      accessor: 'name',
      header: 'Name',
      sortable: true,
      filter: { type: 'text' }
    },
    {
      id: 'department',
      accessor: 'department',
      header: 'Department',
      filter: {
        type: 'select',
        options: departments.map((value) => ({ value, label: value }))
      }
    },
    {
      id: 'salary',
      accessor: 'salary',
      header: 'Salary',
      sortable: true,
      filter: { type: 'number', min: 0 },
      align: 'end'
    }
  ];
</script>

<DataTable
  {items}
  {columns}
  getRowId={(person) => person.id}
  height={440}
  search={{ placeholder: 'Search the directory', debounce: 120 }}
  pagination={{ pageSize: 25, pageSizes: [25, 50, 100] }}
/>`;

export const editingDataTableCode = `<script lang="ts">
  import {
    DataTable,
    type DataTableCellCommit,
    type DataTableColumn
  } from 'svelai/data-table';

  let items = $state<Person[]>(initialPeople);

  const columns: DataTableColumn<Person>[] = [
    { id: 'name', accessor: 'name', header: 'Name', editor: { type: 'text' } },
    {
      id: 'role',
      accessor: 'role',
      header: 'Role',
      editor: { type: 'select', options: roleOptions }
    },
    {
      id: 'salary',
      accessor: 'salary',
      header: 'Salary',
      editor: { type: 'number', min: 0, step: 1000 }
    }
  ];

  async function commitCell(commit: DataTableCellCommit<Person>) {
    await api.people.update(commit.rowId, commit.columnId, commit.value);
    items = items.map((person) =>
      person.id === commit.rowId
        ? { ...person, [commit.columnId]: commit.value }
        : person
    );
  }
</script>

<DataTable
  {items}
  {columns}
  getRowId={(person) => person.id}
  height={420}
  density="large"
  selectionMode="multiple"
  pagination={{ pageSize: 10, pageSizes: [10, 18] }}
  onCellCommit={commitCell}
/>`;

export const groupingDataTableCode = `<script lang="ts">
  import { DataTable, type DataTableColumn } from 'svelai/data-table';

  const columns: DataTableColumn<Person>[] = [
    {
      id: 'department',
      accessor: 'department',
      header: 'Department',
      groupable: true
    },
    {
      id: 'headcount',
      accessor: () => 1,
      header: 'Headcount',
      aggregation: 'sum'
    },
    {
      id: 'salary',
      accessor: 'salary',
      header: 'Average salary',
      aggregation: 'mean'
    }
  ];
</script>

<DataTable
  {items}
  {columns}
  getRowId={(person) => person.id}
  height={430}
  pagination={false}
  initialState={{ grouping: ['department'] }}
/>`;

export const manualDataTableCode = `<script lang="ts">
  import { DataTable, type DataTableState } from 'svelai/data-table';

  let state = $state<DataTableState>(initialState);
  let items = $state<Person[]>([]);
  let rowCount = $state(0);
  let loading = $state(false);

  $effect(() => {
    const request = state;
	loading = true;
    api.people.list(request).then((response) => {
      items = response.items;
      rowCount = response.rowCount;
	}).finally(() => {
	  loading = false;
    });
  });
</script>

<DataTable
  processingMode="manual"
  {rowCount}
  {items}
  {columns}
  bind:state
  getRowId={(person) => person.id}
  height={410}
  search
  {loading}
  animateRows
/>`;

export const gridDataTableCode = `<DataTable
  {items}
  {columns}
  getRowId={(person) => person.id}
  height={520}
  interactionMode="grid"
  density="small"
  pagination={false}
  overscan={8}
  initialState={{
    columnPinning: { left: ['name'], right: ['status'] }
  }}
/>`;
