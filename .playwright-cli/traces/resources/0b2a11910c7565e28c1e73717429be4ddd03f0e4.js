import { cva } from "/src/lib/utils/cva/index.ts";
export const heading = cva({
	base: "ui-heading",
	variants: {
		size: {
			h1: "text-4xl",
			h2: "text-3xl",
			h3: "text-2xl",
			h4: "text-xl",
			h5: "text-lg",
			h6: "text-base"
		},
		weight: {
			normal: "font-normal",
			bold: "font-bold",
			light: "font-light"
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right"
		},
		balanced: {
			true: "balanced",
			false: ""
		},
		underline: {
			true: "underline",
			false: ""
		},
		muted: {
			true: "muted",
			false: ""
		}
	}
});

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxXQUFXO0FBRXBCLE9BQU8sTUFBTSxVQUFVLElBQUk7Q0FDMUIsTUFBTTtDQUNOLFVBQVU7RUFDVCxNQUFNO0dBQ0wsSUFBSTtHQUNKLElBQUk7R0FDSixJQUFJO0dBQ0osSUFBSTtHQUNKLElBQUk7R0FDSixJQUFJO0VBQ0w7RUFDQSxRQUFRO0dBQ1AsUUFBUTtHQUNSLE1BQU07R0FDTixPQUFPO0VBQ1I7RUFDQSxPQUFPO0dBQ04sTUFBTTtHQUNOLFFBQVE7R0FDUixPQUFPO0VBQ1I7RUFDQSxVQUFVO0dBQ1QsTUFBTTtHQUNOLE9BQU87RUFDUjtFQUNBLFdBQVc7R0FDVixNQUFNO0dBQ04sT0FBTztFQUNSO0VBQ0EsT0FBTztHQUNOLE1BQU07R0FDTixPQUFPO0VBQ1I7Q0FDRDtBQUNELENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiaGVhZGluZy50aGVtZS50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdmEgfSBmcm9tICckbGliL3V0aWxzL2N2YS9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBoZWFkaW5nID0gY3ZhKHtcblx0YmFzZTogJ3VpLWhlYWRpbmcnLFxuXHR2YXJpYW50czoge1xuXHRcdHNpemU6IHtcblx0XHRcdGgxOiAndGV4dC00eGwnLFxuXHRcdFx0aDI6ICd0ZXh0LTN4bCcsXG5cdFx0XHRoMzogJ3RleHQtMnhsJyxcblx0XHRcdGg0OiAndGV4dC14bCcsXG5cdFx0XHRoNTogJ3RleHQtbGcnLFxuXHRcdFx0aDY6ICd0ZXh0LWJhc2UnXG5cdFx0fSxcblx0XHR3ZWlnaHQ6IHtcblx0XHRcdG5vcm1hbDogJ2ZvbnQtbm9ybWFsJyxcblx0XHRcdGJvbGQ6ICdmb250LWJvbGQnLFxuXHRcdFx0bGlnaHQ6ICdmb250LWxpZ2h0J1xuXHRcdH0sXG5cdFx0YWxpZ246IHtcblx0XHRcdGxlZnQ6ICd0ZXh0LWxlZnQnLFxuXHRcdFx0Y2VudGVyOiAndGV4dC1jZW50ZXInLFxuXHRcdFx0cmlnaHQ6ICd0ZXh0LXJpZ2h0J1xuXHRcdH0sXG5cdFx0YmFsYW5jZWQ6IHtcblx0XHRcdHRydWU6ICdiYWxhbmNlZCcsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdHVuZGVybGluZToge1xuXHRcdFx0dHJ1ZTogJ3VuZGVybGluZScsXG5cdFx0XHRmYWxzZTogJydcblx0XHR9LFxuXHRcdG11dGVkOiB7XG5cdFx0XHR0cnVlOiAnbXV0ZWQnLFxuXHRcdFx0ZmFsc2U6ICcnXG5cdFx0fVxuXHR9XG59KTtcblxuIl19