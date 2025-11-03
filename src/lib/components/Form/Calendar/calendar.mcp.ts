export const calendarDescription = `
# Calendar Component

The Calendar component provides a visual calendar interface for selecting single dates or date ranges with month/year navigation.

## Basic Usage

\`\`\`svelte
<script>
	let selectedDate = $state(null);
</script>

<Calendar bind:value={selectedDate} />
\`\`\`

## Props

### Core Props
- **value**: Date | { start: Date, end: Date } (bindable) - Selected date or range
- **type**: 'calendar' | 'calendar-range' (default: 'calendar')
  - calendar: Single date selection
  - calendar-range: Date range selection

### Display Props
- **month**: number - Current displayed month (0-11)
- **year**: number - Current displayed year
- **showWeekNumbers**: boolean (default: false) - Show week numbers
- **firstDayOfWeek**: 0 | 1 (default: 0) - Start week on Sunday (0) or Monday (1)

### Constraints
- **min**: Date - Minimum selectable date
- **max**: Date - Maximum selectable date
- **disabledDates**: Date[] - Array of disabled dates
- **disabledDays**: number[] - Disabled days of week (0=Sunday, 6=Saturday)

### Behavior Props
- **disabled**: boolean - Disable entire calendar

### Event Props
- **onChange**: (value: Date | DateRange) => void - Called when date selected
- **onMonthChange**: (month: number, year: number) => void - Called when month changes

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Calendar>
	<CalendarHeader>
		<PrevButton />
		<MonthYearSelector />
		<NextButton />
	</CalendarHeader>
	<CalendarGrid>
		<WeekDays />
		<CalendarDays>
			<Day />
			<Day selected />
			<Day disabled />
		</CalendarDays>
	</CalendarGrid>
</Calendar>
\`\`\`

## Examples

### Basic Calendar
\`\`\`svelte
<script>
	let date = $state(new Date());
</script>

<Calendar bind:value={date} />
\`\`\`

### Date Range Selection
\`\`\`svelte
<script>
	let dateRange = $state({ start: null, end: null });
</script>

<Calendar 
	type="calendar-range"
	bind:value={dateRange}
/>
\`\`\`

### With Min/Max Dates
\`\`\`svelte
<script>
	let today = new Date();
	let maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 3);
</script>

<Calendar 
	bind:value={date}
	min={today}
	max={maxDate}
/>
\`\`\`

### Disable Specific Dates
\`\`\`svelte
<script>
	let holidays = [
		new Date('2024-12-25'),
		new Date('2024-01-01')
	];
</script>

<Calendar 
	bind:value={date}
	disabledDates={holidays}
/>
\`\`\`

### Disable Weekends
\`\`\`svelte
<Calendar 
	bind:value={date}
	disabledDays={[0, 6]}
/>
\`\`\`

### With Week Numbers
\`\`\`svelte
<Calendar 
	bind:value={date}
	showWeekNumbers
/>
\`\`\`

### Start Week on Monday
\`\`\`svelte
<Calendar 
	bind:value={date}
	firstDayOfWeek={1}
/>
\`\`\`

### Booking Calendar
\`\`\`svelte
<script>
	let booking = $state({ start: null, end: null });
	let bookedDates = $state([
		new Date('2024-03-15'),
		new Date('2024-03-16')
	]);
</script>

<Calendar 
	type="calendar-range"
	bind:value={booking}
	min={new Date()}
	disabledDates={bookedDates}
/>

{#if booking.start && booking.end}
	<p>
		Selected: {booking.start.toLocaleDateString()} 
		to {booking.end.toLocaleDateString()}
	</p>
{/if}
\`\`\`

### Event Calendar
\`\`\`svelte
<script>
	let selectedDate = $state(new Date());
	let events = {
		'2024-03-15': ['Meeting at 10am', 'Lunch at 12pm'],
		'2024-03-20': ['Conference']
	};
	
	function getEventsForDate(date) {
		const key = date.toISOString().split('T')[0];
		return events[key] || [];
	}
</script>

<Calendar bind:value={selectedDate} />

<div class="events">
	<h3>Events for {selectedDate.toLocaleDateString()}</h3>
	{#each getEventsForDate(selectedDate) as event}
		<div>{event}</div>
	{/each}
</div>
\`\`\`

### Appointment Scheduler
\`\`\`svelte
<script>
	let appointmentDate = $state(null);
	let timeSlot = $state('');
	
	const availableSlots = ['9:00', '10:00', '11:00', '14:00', '15:00'];
</script>

<Calendar 
	bind:value={appointmentDate}
	min={new Date()}
	disabledDays={[0, 6]}
/>

{#if appointmentDate}
	<Select 
		label="Time Slot"
		bind:value={timeSlot}
		options={availableSlots.map(time => ({ 
			value: time, 
			label: time 
		}))}
	/>
{/if}
\`\`\`

### Vacation Planner
\`\`\`svelte
<script>
	let vacation = $state({ start: null, end: null });
	
	$derived days = vacation.start && vacation.end
		? Math.ceil((vacation.end - vacation.start) / (1000 * 60 * 60 * 24))
		: 0;
</script>

<Calendar 
	type="calendar-range"
	bind:value={vacation}
	min={new Date()}
/>

{#if days > 0}
	<p>Vacation duration: {days} days</p>
{/if}
\`\`\`

### Hotel Booking
\`\`\`svelte
<script>
	let checkIn = $state(null);
	let checkOut = $state(null);
	let guests = $state(1);
	
	// Minimum 1 night stay
	$effect(() => {
		if (checkIn && checkOut && checkOut <= checkIn) {
			const nextDay = new Date(checkIn);
			nextDay.setDate(nextDay.getDate() + 1);
			checkOut = nextDay;
		}
	});
</script>

<form>
	<Calendar 
		bind:value={checkIn}
		min={new Date()}
	/>
	
	<Calendar 
		bind:value={checkOut}
		min={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
	/>
	
	<NumberInput 
		label="Guests"
		bind:value={guests}
		min={1}
		max={10}
	/>
	
	<Button type="submit">Check Availability</Button>
</form>
\`\`\`

### Deadline Picker
\`\`\`svelte
<script>
	let deadline = $state(null);
	let priority = $state('normal');
</script>

<Calendar 
	bind:value={deadline}
	min={new Date()}
/>

<RadioInput 
	label="Priority"
	bind:value={priority}
	options={[
		{ value: 'low', label: 'Low' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'high', label: 'High' }
	]}
/>
\`\`\`

## Navigation

Calendar provides:
- Previous/Next month buttons
- Month/Year dropdowns for quick navigation
- Keyboard navigation (arrow keys)
- Today button to jump to current date

## Date Range Selection

In \`calendar-range\` mode:
1. Click first date to set start
2. Hover shows preview of range
3. Click second date to set end
4. Range is highlighted visually

## Keyboard Controls

- **Arrow keys**: Navigate between days
- **Enter/Space**: Select date
- **PageUp/PageDown**: Previous/next month
- **Home/End**: First/last day of month

## Accessibility

- Proper ARIA labels for navigation
- Keyboard navigation support
- Selected dates announced
- Disabled dates communicated
- Focus management

## Notes

- Supports single date or range selection
- Visual feedback for selection and hover
- Respects min/max date constraints
- Can disable specific dates or days of week
- Month/year can be controlled externally
- Works standalone or within DateInput
`;
