<script lang="ts">
	import { DataTable, type DataTableColumn } from '$lib/components/DataTable/index.js';
	import { createPeople, departments, statuses, type Person } from './exampleData.js';

	const people = createPeople(137);
	const columns: DataTableColumn<Person>[] = [
		{
			id: 'name',
			accessor: 'name',
			header: 'Name',
			sortable: true,
			filter: { type: 'text', placeholder: 'Filter names' },
			size: 210
		},
		{
			id: 'department',
			accessor: 'department',
			header: 'Department',
			sortable: true,
			filter: {
				type: 'select',
				options: departments.map((department) => ({ value: department, label: department }))
			}
		},
		{
			id: 'status',
			accessor: 'status',
			header: 'Status',
			filter: {
				type: 'multi-select',
				options: statuses.map((status) => ({ value: status, label: status }))
			},
			size: 140
		},
		{
			id: 'salary',
			accessor: 'salary',
			header: 'Salary',
			sortable: true,
			filter: { type: 'number', min: 0 },
			align: 'end',
			size: 130
		},
		{
			id: 'joinedAt',
			accessor: 'joinedAt',
			header: 'Joined',
			sortable: true,
			filter: { type: 'date' },
			size: 150
		},
		{
			id: 'verified',
			accessor: 'verified',
			header: 'Verified',
			filter: { type: 'boolean', trueLabel: 'Verified', falseLabel: 'Unverified' },
			align: 'center',
			size: 120
		}
	];
</script>

<DataTable
	items={people}
	{columns}
	getRowId={(person) => person.id}
	height={440}
	search={{ placeholder: 'Search the directory', debounce: 120 }}
	pagination={{ pageSize: 25, pageSizes: [25, 50, 100] }}
	caption="People directory"
/>
