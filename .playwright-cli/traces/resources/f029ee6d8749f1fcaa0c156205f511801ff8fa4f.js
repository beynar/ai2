import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/SidebarCommandPalette.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

SidebarCommandPalette[$.FILENAME] = 'src/routes/SidebarCommandPalette.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Button from "/src/lib/components/Button/Button.svelte";
import { Command } from "/src/lib/components/Command/index.ts";
import { magnifyingGlassIcon } from "/src/lib/components/Icons/magnifyingGlass.ts";
import { getSidebarCommandGroups } from "/src/routes/getSidebarCommandGroups.ts";

var root = $.add_locations($.from_html(`<span class="min-w-0 flex-1 truncate text-left">Search pages</span> <span aria-hidden="true" class="border-background-muted bg-background-muted text-foreground-muted ml-auto rounded border px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-widest">⌘K</span>`, 1), SidebarCommandPalette[$.FILENAME], [[39, 4], [40, 4]]);
var root_1 = $.add_locations($.from_html(`<div class="border-background-muted text-foreground-muted mt-1 flex items-center gap-3 border-t px-3 py-2 text-xs"><span>Enter to open</span> <span>Esc to close</span> <button type="button" class="ml-auto hover:text-foreground">Close</button></div>`), SidebarCommandPalette[$.FILENAME], [[51, 2, [[54, 3], [55, 3], [56, 3]]]]);

function SidebarCommandPalette($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, SidebarCommandPalette);

	let collapsed = $.prop($$props, 'collapsed', 3, false);
	const commandGroups = $.tag($.derived(() => getSidebarCommandGroups($$props.groups)), 'commandGroups');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		const trigger = $.wrap_snippet(SidebarCommandPalette, function ($$anchor, $$arg0) {
			$.validate_snippet_args(...arguments);

			let open = () => ($$arg0?.()).open;

			open();

			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			{
				let $0 = $.derived(() => collapsed() ? 'Search pages' : undefined);
				let $1 = $.derived(() => !collapsed());
				let $2 = $.derived(() => collapsed() ? 'mx-auto' : 'justify-start');

				$.add_svelte_meta(
					() => Button(node_1, {
						get prefix() {
							return magnifyingGlassIcon;
						},

						get label() {
							return $.get($0);
						},
						color: 'background',
						get squared() {
							return collapsed();
						},

						get fullWidth() {
							return $.get($1);
						},

						get class() {
							return $.get($2);
						},
						onClick: () => open()(),
						size: 'large',
						children: $.wrap_snippet(SidebarCommandPalette, ($$anchor, $$slotProps) => {
							var fragment_2 = $.comment();
							var node_2 = $.first_child(fragment_2);

							{
								var consequent = ($$anchor) => {
									var fragment_3 = root();

									$.next(2);
									$.append($$anchor, fragment_3);
								};

								$.add_svelte_meta(
									() => $.if(node_2, ($$render) => {
										if (!collapsed()) $$render(consequent);
									}),
									'if',
									SidebarCommandPalette,
									38,
									3
								);
							}

							$.append($$anchor, fragment_2);
						}),
						$$slots: { default: true }
					}),
					'component',
					SidebarCommandPalette,
					28,
					2,
					{ componentTag: 'Button' }
				);
			}

			$.append($$anchor, fragment_1);
		});

		const footer = $.wrap_snippet(SidebarCommandPalette, function ($$anchor, $$arg0) {
			$.validate_snippet_args(...arguments);

			let close = () => ($$arg0?.()).close;

			close();

			var div = root_1();
			var button = $.sibling($.child(div), 4);

			$.reset(div);

			$.delegated('click', button, function click() {
				return close()();
			});

			$.append($$anchor, div);
		});

		$.add_svelte_meta(
			() => Command(node, {
				dialog: true,
				shortcut: 'k',
				get items() {
					return $.get(commandGroups);
				},
				title: 'Search pages',
				placeholder: 'Search pages...',
				size: 'normal',
				trigger,
				footer,
				$$slots: { trigger: true, footer: true }
			}),
			'component',
			SidebarCommandPalette,
			19,
			0,
			{ componentTag: 'Command' }
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	SidebarCommandPalette = $.hmr(SidebarCommandPalette);

	import.meta.hot.acceptExports(["default"],(module) => {
		SidebarCommandPalette[$.HMR].update(module.default);
	});
}

export default SidebarCommandPalette;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxNQUFNLE1BQU0sc0NBQXNDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLFFBQVEsa0NBQWtDO0FBRTFELE9BQU8sRUFBRSxtQkFBbUIsUUFBUSwwQ0FBMEM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixRQUFRLDhCQUE4Qjs7Ozs7a0RBTHZFLENBQUM7Ozs7Q0FPQSxJQUFJLEFBRUgsU0FBUyxtQ0FBRztDQU1iLE1BQU0sYUFBYSx5QkFBWSx1QkFBdUI7Ozs7OztRQVc1QyxPQUFPOzs7T0FBRyxJQUFJLHNCQUFKLElBQUk7Ozs7Ozs7OzZCQUdmLFNBQVMsS0FBRyxjQUFjLEdBQUcsU0FBUzs4QkFHakMsU0FBUzs2QkFDZCxTQUFTLEtBQUcsU0FBUyxHQUFHLGVBQWU7OztXQU45Qzs7Y0FDUSxtQkFBbUI7Ozs7Ozs7O2NBR2xCLFNBQVM7Ozs7Ozs7Ozs7cUJBR0gsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztlQUdiLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVlQLE1BQU07OztPQUFHLEtBQUssc0JBQUwsS0FBSzs7OztPQUN0QjtPQUtDLE1BQU0scUJBTFA7O1dBQUE7O3dCQUtDLE1BQU07V0FBb0UsS0FBSzs7O3NCQUxoRjs7OztTQWhDRjs7OztrQkFHTyxhQUFhOzs7OztJQUtWLE9BQU87SUF1QlAsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUFqQ1QiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNpZGViYXJDb21tYW5kUGFsZXR0ZS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IEJ1dHRvbiBmcm9tICckbGliL2NvbXBvbmVudHMvQnV0dG9uL0J1dHRvbi5zdmVsdGUnO1xuXHRpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnJGxpYi9jb21wb25lbnRzL0NvbW1hbmQvaW5kZXguanMnO1xuXHRpbXBvcnQgdHlwZSB7IFNpZGViYXJHcm91cCB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9TaWRlYmFyL2luZGV4LmpzJztcblx0aW1wb3J0IHsgbWFnbmlmeWluZ0dsYXNzSWNvbiB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JY29ucy9tYWduaWZ5aW5nR2xhc3MuanMnO1xuXHRpbXBvcnQgeyBnZXRTaWRlYmFyQ29tbWFuZEdyb3VwcyB9IGZyb20gJy4vZ2V0U2lkZWJhckNvbW1hbmRHcm91cHMuanMnO1xuXG5cdGxldCB7XG5cdFx0Z3JvdXBzLFxuXHRcdGNvbGxhcHNlZCA9IGZhbHNlXG5cdH06IHtcblx0XHRncm91cHM6IFNpZGViYXJHcm91cFtdO1xuXHRcdGNvbGxhcHNlZD86IGJvb2xlYW47XG5cdH0gPSAkcHJvcHMoKTtcblxuXHRjb25zdCBjb21tYW5kR3JvdXBzID0gJGRlcml2ZWQoZ2V0U2lkZWJhckNvbW1hbmRHcm91cHMoZ3JvdXBzKSk7XG48L3NjcmlwdD5cblxuPENvbW1hbmRcblx0ZGlhbG9nXG5cdHNob3J0Y3V0PVwia1wiXG5cdGl0ZW1zPXtjb21tYW5kR3JvdXBzfVxuXHR0aXRsZT1cIlNlYXJjaCBwYWdlc1wiXG5cdHBsYWNlaG9sZGVyPVwiU2VhcmNoIHBhZ2VzLi4uXCJcblx0c2l6ZT1cIm5vcm1hbFwiXG4+XG5cdHsjc25pcHBldCB0cmlnZ2VyKHsgb3BlbiB9KX1cblx0XHQ8QnV0dG9uXG5cdFx0XHRwcmVmaXg9e21hZ25pZnlpbmdHbGFzc0ljb259XG5cdFx0XHRsYWJlbD17Y29sbGFwc2VkID8gJ1NlYXJjaCBwYWdlcycgOiB1bmRlZmluZWR9XG5cdFx0XHRjb2xvcj1cImJhY2tncm91bmRcIlxuXHRcdFx0c3F1YXJlZD17Y29sbGFwc2VkfVxuXHRcdFx0ZnVsbFdpZHRoPXshY29sbGFwc2VkfVxuXHRcdFx0Y2xhc3M9e2NvbGxhcHNlZCA/ICdteC1hdXRvJyA6ICdqdXN0aWZ5LXN0YXJ0J31cblx0XHRcdG9uQ2xpY2s9eygpID0+IG9wZW4oKX1cblx0XHRcdHNpemU9XCJsYXJnZVwiXG5cdFx0PlxuXHRcdFx0eyNpZiAhY29sbGFwc2VkfVxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1pbi13LTAgZmxleC0xIHRydW5jYXRlIHRleHQtbGVmdFwiPlNlYXJjaCBwYWdlczwvc3Bhbj5cblx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRhcmlhLWhpZGRlbj1cInRydWVcIlxuXHRcdFx0XHRcdGNsYXNzPVwiYm9yZGVyLWJhY2tncm91bmQtbXV0ZWQgYmctYmFja2dyb3VuZC1tdXRlZCB0ZXh0LWZvcmVncm91bmQtbXV0ZWQgbWwtYXV0byByb3VuZGVkIGJvcmRlciBweC0xLjUgcHktMC41IHRleHQtWzAuNjg3NXJlbV0gZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZXN0XCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdOKMmEtcblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0ey9pZn1cblx0XHQ8L0J1dHRvbj5cblx0ey9zbmlwcGV0fVxuXG5cdHsjc25pcHBldCBmb290ZXIoeyBjbG9zZSB9KX1cblx0XHQ8ZGl2XG5cdFx0XHRjbGFzcz1cImJvcmRlci1iYWNrZ3JvdW5kLW11dGVkIHRleHQtZm9yZWdyb3VuZC1tdXRlZCBtdC0xIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGJvcmRlci10IHB4LTMgcHktMiB0ZXh0LXhzXCJcblx0XHQ+XG5cdFx0XHQ8c3Bhbj5FbnRlciB0byBvcGVuPC9zcGFuPlxuXHRcdFx0PHNwYW4+RXNjIHRvIGNsb3NlPC9zcGFuPlxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtbC1hdXRvIGhvdmVyOnRleHQtZm9yZWdyb3VuZFwiIG9uY2xpY2s9eygpID0+IGNsb3NlKCl9PlxuXHRcdFx0XHRDbG9zZVxuXHRcdFx0PC9idXR0b24+XG5cdFx0PC9kaXY+XG5cdHsvc25pcHBldH1cbjwvQ29tbWFuZD5cbiJdLCJmaWxlIjoiL1VzZXJzL2FybmF1ZC9jb2RlL2FpMi9zcmMvcm91dGVzL1NpZGViYXJDb21tYW5kUGFsZXR0ZS5zdmVsdGUifQ==