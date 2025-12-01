export const dateInputDescription = `
# DateInput Component

The DateInput component provides an input field for selecting dates and datetimes with a calendar picker interface.

## Basic Usage

\`\`\`svelte
<script>
	let date = $state(null);
</script>

<DateInput label="Select Date" bind:value={date} />
\`\`\`

## Props

Extends all Field component props plus:

### Core Props
- **value**: Date | string (bindable) - Selected date value
- **type**: 'date' | 'datetime' (default: 'date')
- **min**: Date | string - Minimum allowed date
- **max**: Date | string - Maximum allowed date

### Display Props
- **placeholder**: string - Placeholder text
- **format**: string - Date display format

### Field Props (inherited)
- **label**: string | Snippet - Field label
- **description**: string | Snippet - Helper text
- **error**: string - Error message
- **required**: boolean - Mark as required
- **disabled**: boolean - Disable input
- **size**: 'small' | 'normal' | 'large'

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Field>
	<Label />
	<Description />
	<InputContainer>
		<DateInput />
		<CalendarIcon />
	</InputContainer>
	<Error />
</Field>
\`\`\`

## Examples

### Basic Date Input
\`\`\`svelte
<script>
	let date = $state(null);
</script>

<DateInput 
	label="Birth Date"
	bind:value={date}
/>
\`\`\`

### DateTime Input
\`\`\`svelte
<DateInput 
	type="datetime"
	label="Appointment"
	bind:value={appointmentTime}
/>
\`\`\`

### With Min/Max
\`\`\`svelte
<script>
	let today = new Date();
	let maxDate = new Date(today);
	maxDate.setFullYear(maxDate.getFullYear() + 1);
</script>

<DateInput 
	label="Select Date"
	bind:value={date}
	min={today}
	max={maxDate}
	description="Select a date within the next year"
/>
\`\`\`

### Required Date
\`\`\`svelte
<DateInput 
	label="Appointment Date"
	bind:value={date}
	required
/>
\`\`\`

### Disabled State
\`\`\`svelte
<DateInput 
	label="Registration Date"
	value={new Date('2024-01-01')}
	disabled
/>
\`\`\`

### Booking Form
\`\`\`svelte
<script>
	let checkIn = $state(null);
	let checkOut = $state(null);
	
	$effect(() => {
		// Ensure checkout is after checkin
		if (checkIn && checkOut && checkOut <= checkIn) {
			checkOut = null;
		}
	});
</script>

<form>
	<DateInput 
		label="Check-in Date"
		bind:value={checkIn}
		min={new Date()}
		required
	/>
	
	<DateInput 
		label="Check-out Date"
		bind:value={checkOut}
		min={checkIn || new Date()}
		required
	/>
	
	<Button type="submit">Book Now</Button>
</form>
\`\`\`

### Event Scheduling
\`\`\`svelte
<script>
	let eventStart = $state(null);
	let eventEnd = $state(null);
</script>

<DateInput 
	type="datetime"
	label="Event Start"
	bind:value={eventStart}
	required
/>

<DateInput 
	type="datetime"
	label="Event End"
	bind:value={eventEnd}
	min={eventStart}
	required
/>
\`\`\`

### Age Verification
\`\`\`svelte
<script>
	let birthDate = $state(null);
	let maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);
</script>

<DateInput 
	label="Date of Birth"
	bind:value={birthDate}
	max={maxDate}
	description="You must be 18 or older"
	required
/>
\`\`\`

### Delivery Scheduling
\`\`\`svelte
<script>
	let deliveryDate = $state(null);
	let deliveryTime = $state(null);
	
	// Only allow weekdays
	let minDate = new Date();
	minDate.setDate(minDate.getDate() + 1);
</script>

<DateInput 
	label="Delivery Date"
	bind:value={deliveryDate}
	min={minDate}
	description="Next available delivery date"
	required
/>

<Select 
	label="Time Slot"
	bind:value={deliveryTime}
	options={[
		{ value: '9-12', label: '9:00 AM - 12:00 PM' },
		{ value: '12-15', label: '12:00 PM - 3:00 PM' },
		{ value: '15-18', label: '3:00 PM - 6:00 PM' }
	]}
	required
/>
\`\`\`

### Meeting Scheduler
\`\`\`svelte
<script>
	let meeting = $state({
		date: null,
		duration: '30',
		title: ''
	});
</script>

<form>
	<TextInput 
		label="Meeting Title"
		bind:value={meeting.title}
		required
	/>
	
	<DateInput 
		type="datetime"
		label="Meeting Time"
		bind:value={meeting.date}
		min={new Date()}
		required
	/>
	
	<Select 
		label="Duration"
		bind:value={meeting.duration}
		options={[
			{ value: '15', label: '15 minutes' },
			{ value: '30', label: '30 minutes' },
			{ value: '60', label: '1 hour' }
		]}
	/>
	
	<Button type="submit">Schedule Meeting</Button>
</form>
\`\`\`

### Date Range Filter
\`\`\`svelte
<script>
	let filters = $state({
		startDate: null,
		endDate: null
	});
</script>

<div class="flex gap-4">
	<DateInput 
		label="Start Date"
		bind:value={filters.startDate}
	/>
	
	<DateInput 
		label="End Date"
		bind:value={filters.endDate}
		min={filters.startDate}
	/>
</div>
\`\`\`

## Date Formats

The format prop accepts standard date format strings:
- \`MM/DD/YYYY\` - US format
- \`DD/MM/YYYY\` - European format
- \`YYYY-MM-DD\` - ISO format
- Custom formats supported

## Validation

DateInput validates:
- **required**: Date must be selected
- **min**: Date must be >= min
- **max**: Date must be <= max
- **format**: Valid date format

## Calendar Picker

- Opens on input focus or calendar icon click
- Keyboard navigation (arrow keys)
- Quick month/year selection
- Today button for current date
- Respects min/max constraints

## Accessibility

- Proper label association
- ARIA attributes for date picker
- Keyboard accessible calendar
- Date changes announced to screen readers
- Clear button for clearing selection

## Notes

- Works with Date objects or ISO strings
- Calendar picker shows visual date selection
- Validates date ranges automatically
- Supports both date and datetime selection
- Integrates with form validation

## Theme Customization

The DateInput component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme. It shares the same theme structure as TextInput for the input field.

### Theme Structure

The theme object contains the following parts:
- **input**: Input element styles
- **inputContainer**: Input container wrapper styles

### Available Variants

**input**:
- base: Base classes applied to the input element
- Variants:
  - size: 'small' | 'normal' | 'large' - Text size
  - disabled: boolean - Disabled state styling

**inputContainer**:
- base: Base classes for the input container (handles focus states, borders, padding)
- Variants:
  - size: 'small' | 'normal' | 'large' - Size-based styling
  - disabled: boolean - Disabled state styling

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<DateInput 
  label="Select Date"
  bind:value={date}
  theme={{
    inputContainer: {
      base: 'border-2 rounded-lg',
      size: {
        normal: 'px-4 py-2'
      }
    },
    input: {
      size: {
        normal: 'text-base'
      }
    }
  }}
/>
\`\`\`

**Focus State Customization**:
\`\`\`svelte
<DateInput 
  label="Custom Date"
  bind:value={date}
  theme={{
    inputContainer: {
      base: 'focus-within:ring-2 focus-within:ring-primary focus-within:border-primary'
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setDateInputTheme } from 'svelai/date-input';
  
  setDateInputTheme({
    inputContainer: {
      base: 'rounded-lg border-2 transition-all',
      size: {
        normal: 'px-4 py-2'
      }
    },
    input: {
      base: 'placeholder:text-gray-400'
    }
  });
</script>
\`\`\`
`;
