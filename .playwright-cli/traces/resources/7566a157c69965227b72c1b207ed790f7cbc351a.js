import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Confirmation/Confirmation.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Confirmation[$.FILENAME] = 'src/lib/components/Confirmation/Confirmation.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Dialog from "/src/lib/components/Dialog/Dialog.svelte";
import Button from "/src/lib/components/Button/Button.svelte";
import { onMount, tick } from "/node_modules/.vite/deps/svelte.js?v=1b1d2797";
import { MediaQuery } from "/node_modules/.vite/deps/svelte_reactivity.js?v=1b1d2797";

var root = $.add_locations($.from_html(`<div><!> <!></div>`), Confirmation[$.FILENAME], [[66, 3]]);

function Confirmation($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Confirmation);

	let confirmations = $.tag($.state($.proxy([])), 'confirmations');

	const onConfirmation = (event) => {
		if (event.detail) {
			const confirmationDetail = event.detail;
			const confirmationState = Object.assign(confirmationDetail, { isOpen: false, loading: false });

			$.get(confirmations).push(confirmationState);

			tick().then(() => {
				$.get(confirmations).forEach((a) => {
					if ($.strict_equals(a.id, confirmationState.id)) {
						a.isOpen = true;
					}
				});
			});
		}
	};

	onMount(() => {
		document.addEventListener('confirmation', onConfirmation);

		return () => {
			document.removeEventListener('confirmation', onConfirmation);
		};
	});

	const actionConfirmation = (confirmation, continued) => async () => {
		let result;

		if (continued) {
			const res = confirmation.onConfirm?.();

			confirmation.loading = !!res && res instanceof Promise;
			result = continued && res ? (await $.track_reactivity_loss(res))() : undefined;
		}

		confirmation.loading = false;
		confirmation.isOpen = false;
		document.dispatchEvent(new CustomEvent('confirmation_received', { detail: { id: confirmation.id, continued, result } }));
	};

	const isMobile = new MediaQuery('(max-width: 768px)');
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	$.add_svelte_meta(
		() => $.each(node, 17, () => $.get(confirmations), $.index, ($$anchor, confirmation, $$index) => {
			var fragment_1 = $.comment();
			var node_1 = $.first_child(fragment_1);

			$.validate_binding('bind:open={confirmation.isOpen}', [], () => $.get(confirmation), () => 'isOpen', 61, 2);

			{
				const footer = $.wrap_snippet(Confirmation, function ($$anchor) {
					$.validate_snippet_args(...arguments);

					var div = root();
					var node_2 = $.child(div);

					{
						var consequent = ($$anchor) => {
							var fragment_2 = $.comment();
							var node_3 = $.first_child(fragment_2);

							{
								let $0 = $.derived(() => actionConfirmation($.get(confirmation), false));

								$.add_svelte_meta(
									() => Button(node_3, $.spread_props(
										{
											get disabled() {
												return $.get(confirmation).loading;
											},
											color: 'background'
										},
										() => $.get(confirmation).cancel,
										{
											get onClick() {
												return $.get($0);
											},

											get fullWidth() {
												return isMobile.current;
											},

											children: $.wrap_snippet(Confirmation, ($$anchor, $$slotProps) => {
												$.next();

												var text = $.text();

												$.template_effect(() => $.set_text(text, $.get(confirmation).cancel.text));
												$.append($$anchor, text);
											}),
											$$slots: { default: true }
										}
									)),
									'component',
									Confirmation,
									68,
									5,
									{ componentTag: 'Button' }
								);
							}

							$.append($$anchor, fragment_2);
						};

						var alternate = ($$anchor) => {
							var fragment_4 = $.comment();
							var node_4 = $.first_child(fragment_4);

							{
								let $0 = $.derived(() => actionConfirmation($.get(confirmation), false));

								$.add_svelte_meta(
									() => Button(node_4, {
										get disabled() {
											return $.get(confirmation).loading;
										},
										color: 'background',
										get onClick() {
											return $.get($0);
										},

										get fullWidth() {
											return isMobile.current;
										},

										children: $.wrap_snippet(Confirmation, ($$anchor, $$slotProps) => {
											$.next();

											var text_1 = $.text();

											$.template_effect(() => $.set_text(text_1, $.get(confirmation).cancel));
											$.append($$anchor, text_1);
										}),
										$$slots: { default: true }
									}),
									'component',
									Confirmation,
									78,
									5,
									{ componentTag: 'Button' }
								);
							}

							$.append($$anchor, fragment_4);
						};

						$.add_svelte_meta(
							() => $.if(node_2, ($$render) => {
								if ($.strict_equals(typeof $.get(confirmation).cancel, 'object')) $$render(consequent); else $$render(alternate, -1);
							}),
							'if',
							Confirmation,
							67,
							4
						);
					}

					var node_5 = $.sibling(node_2, 2);

					{
						var consequent_1 = ($$anchor) => {
							var fragment_6 = $.comment();
							var node_6 = $.first_child(fragment_6);

							{
								let $0 = $.derived(() => actionConfirmation($.get(confirmation), true));

								$.add_svelte_meta(
									() => Button(node_6, $.spread_props(
										{
											get loading() {
												return $.get(confirmation).loading;
											}
										},
										() => $.get(confirmation).confirm,
										{
											get onClick() {
												return $.get($0);
											},

											get fullWidth() {
												return isMobile.current;
											},

											children: $.wrap_snippet(Confirmation, ($$anchor, $$slotProps) => {
												$.next();

												var text_2 = $.text();

												$.template_effect(() => $.set_text(text_2, $.get(confirmation).confirm.text));
												$.append($$anchor, text_2);
											}),
											$$slots: { default: true }
										}
									)),
									'component',
									Confirmation,
									89,
									5,
									{ componentTag: 'Button' }
								);
							}

							$.append($$anchor, fragment_6);
						};

						var alternate_1 = ($$anchor) => {
							var fragment_8 = $.comment();
							var node_7 = $.first_child(fragment_8);

							{
								let $0 = $.derived(() => actionConfirmation($.get(confirmation), true));

								$.add_svelte_meta(
									() => Button(node_7, {
										get loading() {
											return $.get(confirmation).loading;
										},

										get onClick() {
											return $.get($0);
										},

										get fullWidth() {
											return isMobile.current;
										},

										children: $.wrap_snippet(Confirmation, ($$anchor, $$slotProps) => {
											$.next();

											var text_3 = $.text();

											$.template_effect(() => $.set_text(text_3, $.get(confirmation).confirm));
											$.append($$anchor, text_3);
										}),
										$$slots: { default: true }
									}),
									'component',
									Confirmation,
									98,
									5,
									{ componentTag: 'Button' }
								);
							}

							$.append($$anchor, fragment_8);
						};

						$.add_svelte_meta(
							() => $.if(node_5, ($$render) => {
								if ($.strict_equals(typeof $.get(confirmation).confirm, 'object')) $$render(consequent_1); else $$render(alternate_1, -1);
							}),
							'if',
							Confirmation,
							88,
							4
						);
					}

					$.reset(div);

					$.template_effect(() => $.set_class(div, 1, $.clsx(isMobile.current
						? 'flex flex-col gap-4 p-2'
						: 'flex justify-end gap-2 p-2')));

					$.append($$anchor, div);
				});

				$.add_svelte_meta(
					() => Dialog(node_1, {
						type: 'alert',
						onClose: () => {
							$.set(confirmations, $.get(confirmations).filter((a) => $.strict_equals(a.id, $.get(confirmation).id, false)), true);
						},
						closable: false,
						closeOnClickOutside: false,
						closeOnEscape: false,
						get title() {
							return $.get(confirmation).title;
						},

						get description() {
							return $.get(confirmation).description;
						},

						get open() {
							return $.get(confirmation).isOpen;
						},

						set open($$value) {
							($.get(confirmation).isOpen = $$value);
						},
						footer,
						$$slots: { footer: true }
					}),
					'component',
					Confirmation,
					53,
					1,
					{ componentTag: 'Dialog' }
				);
			}

			$.append($$anchor, fragment_1);
		}),
		'each',
		Confirmation,
		52,
		0
	);

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Confirmation = $.hmr(Confirmation);

	import.meta.hot.acceptExports(["default"],(module) => {
		Confirmation[$.HMR].update(module.default);
	});
}

export default Confirmation;
//# sourceMappingURL=data:application/json;base64,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QUFPOzs7Ozs7Ozs2REFFMUIsWUFBWSxFQUFDLE9BQU8sQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUtqQixrQkFBa0IsT0FBQyxZQUFZLEdBQUUsSUFBSTs7O2VBRjlDOzt3QkFDUyxZQUFZLEVBQUMsT0FBTzs7Ozs7Ozs7a0JBRWxCLFFBQVEsQ0FBQyxPQUFPOzs7Ozs7Ozs0REFFMUIsWUFBWSxFQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FmWCxZQUFZLEVBQUMsT0FBTyxFQUFLLFFBQVE7Ozs7Ozs7OzthQXRCN0MsR0FBRzs7eUNBQUgsR0FBRyxZQUFRLFFBQVEsQ0FBQyxPQUFPO1FBQUcseUJBQXlCO1FBQUcsNEJBQTRCOzt3QkFBdEYsR0FBRzs7OztXQWJMOztxQkFFZTthQUNkLGFBQWEsUUFBRyxhQUFhLEVBQUMsTUFBTSxFQUFFLENBQUMscUJBQUssQ0FBQyxDQUFDLEVBQUUsUUFBSyxZQUFZLEVBQUMsRUFBRTtNQUNyRSxDQUFDO2dCQUNTLEtBQUs7MkJBQ00sS0FBSztxQkFDWCxLQUFLOztvQkFFYixZQUFZLEVBQUMsS0FBSzs7OztvQkFDWixZQUFZLEVBQUMsV0FBVzs7O1VBRnJDLElBQVM7b0JBQUUsWUFBWSxFQUFDLE1BQU07OztVQUE5QixJQUFTO2NBQUUsWUFBWSxFQUFDLE1BQU07O01BSXBCLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmViIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ29uZmlybWF0aW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgRGlhbG9nIGZyb20gJy4uL0RpYWxvZy9EaWFsb2cuc3ZlbHRlJztcblx0aW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9CdXR0b24vQnV0dG9uLnN2ZWx0ZSc7XG5cdGltcG9ydCB0eXBlIHsgQ29uZmlybWF0aW9uRGV0YWlsLCBDb25maXJtYXRpb25TdGF0ZSB9IGZyb20gJy4vY29uZmlybWF0aW9uLnN0YXRlLnN2ZWx0ZS5qcyc7XG5cdGltcG9ydCB7IG9uTW91bnQsIHRpY2sgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnc3ZlbHRlL3JlYWN0aXZpdHknO1xuXHRsZXQgY29uZmlybWF0aW9ucyA9ICRzdGF0ZTxDb25maXJtYXRpb25TdGF0ZVtdPihbXSk7XG5cblx0Y29uc3Qgb25Db25maXJtYXRpb24gPSAoZXZlbnQ6IEN1c3RvbUV2ZW50PENvbmZpcm1hdGlvbkRldGFpbD4pID0+IHtcblx0XHRpZiAoZXZlbnQuZGV0YWlsKSB7XG5cdFx0XHRjb25zdCBjb25maXJtYXRpb25EZXRhaWwgPSBldmVudC5kZXRhaWw7XG5cdFx0XHRjb25zdCBjb25maXJtYXRpb25TdGF0ZSA9IE9iamVjdC5hc3NpZ24oY29uZmlybWF0aW9uRGV0YWlsLCB7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlXG5cdFx0XHR9KSBzYXRpc2ZpZXMgQ29uZmlybWF0aW9uU3RhdGU7XG5cdFx0XHRjb25maXJtYXRpb25zLnB1c2goY29uZmlybWF0aW9uU3RhdGUpO1xuXHRcdFx0dGljaygpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRjb25maXJtYXRpb25zLmZvckVhY2goKGEpID0+IHtcblx0XHRcdFx0XHRpZiAoYS5pZCA9PT0gY29uZmlybWF0aW9uU3RhdGUuaWQpIHtcblx0XHRcdFx0XHRcdGEuaXNPcGVuID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdG9uTW91bnQoKCkgPT4ge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpcm1hdGlvbicsIG9uQ29uZmlybWF0aW9uKTtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29uZmlybWF0aW9uJywgb25Db25maXJtYXRpb24pO1xuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0IGFjdGlvbkNvbmZpcm1hdGlvbiA9IChjb25maXJtYXRpb246IENvbmZpcm1hdGlvblN0YXRlLCBjb250aW51ZWQ6IGJvb2xlYW4pID0+IGFzeW5jICgpID0+IHtcblx0XHRsZXQgcmVzdWx0O1xuXHRcdGlmIChjb250aW51ZWQpIHtcblx0XHRcdGNvbnN0IHJlcyA9IGNvbmZpcm1hdGlvbi5vbkNvbmZpcm0/LigpO1xuXHRcdFx0Y29uZmlybWF0aW9uLmxvYWRpbmcgPSAhIXJlcyAmJiByZXMgaW5zdGFuY2VvZiBQcm9taXNlO1xuXHRcdFx0cmVzdWx0ID0gY29udGludWVkICYmIHJlcyA/IGF3YWl0IHJlcyA6IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0Y29uZmlybWF0aW9uLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRjb25maXJtYXRpb24uaXNPcGVuID0gZmFsc2U7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcblx0XHRcdG5ldyBDdXN0b21FdmVudCgnY29uZmlybWF0aW9uX3JlY2VpdmVkJywge1xuXHRcdFx0XHRkZXRhaWw6IHsgaWQ6IGNvbmZpcm1hdGlvbi5pZCwgY29udGludWVkLCByZXN1bHQgfVxuXHRcdFx0fSlcblx0XHQpO1xuXHR9O1xuXHRjb25zdCBpc01vYmlsZSA9IG5ldyBNZWRpYVF1ZXJ5KCcobWF4LXdpZHRoOiA3NjhweCknKTtcbjwvc2NyaXB0PlxuXG57I2VhY2ggY29uZmlybWF0aW9ucyBhcyBjb25maXJtYXRpb259XG5cdDxEaWFsb2dcblx0XHR0eXBlPVwiYWxlcnRcIlxuXHRcdG9uQ2xvc2U9eygpID0+IHtcblx0XHRcdGNvbmZpcm1hdGlvbnMgPSBjb25maXJtYXRpb25zLmZpbHRlcigoYSkgPT4gYS5pZCAhPT0gY29uZmlybWF0aW9uLmlkKTtcblx0XHR9fVxuXHRcdGNsb3NhYmxlPXtmYWxzZX1cblx0XHRjbG9zZU9uQ2xpY2tPdXRzaWRlPXtmYWxzZX1cblx0XHRjbG9zZU9uRXNjYXBlPXtmYWxzZX1cblx0XHRiaW5kOm9wZW49e2NvbmZpcm1hdGlvbi5pc09wZW59XG5cdFx0dGl0bGU9e2NvbmZpcm1hdGlvbi50aXRsZX1cblx0XHRkZXNjcmlwdGlvbj17Y29uZmlybWF0aW9uLmRlc2NyaXB0aW9ufVxuXHQ+XG5cdFx0eyNzbmlwcGV0IGZvb3RlcigpfVxuXHRcdFx0PGRpdiBjbGFzcz17aXNNb2JpbGUuY3VycmVudCA/ICdmbGV4IGZsZXgtY29sIGdhcC00IHAtMicgOiAnZmxleCBqdXN0aWZ5LWVuZCBnYXAtMiBwLTInfT5cblx0XHRcdFx0eyNpZiB0eXBlb2YgY29uZmlybWF0aW9uLmNhbmNlbCA9PT0gJ29iamVjdCd9XG5cdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2NvbmZpcm1hdGlvbi5sb2FkaW5nfVxuXHRcdFx0XHRcdFx0Y29sb3I9XCJiYWNrZ3JvdW5kXCJcblx0XHRcdFx0XHRcdHsuLi5jb25maXJtYXRpb24uY2FuY2VsfVxuXHRcdFx0XHRcdFx0b25DbGljaz17YWN0aW9uQ29uZmlybWF0aW9uKGNvbmZpcm1hdGlvbiwgZmFsc2UpfVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtpc01vYmlsZS5jdXJyZW50fVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtjb25maXJtYXRpb24uY2FuY2VsLnRleHR9XG5cdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRkaXNhYmxlZD17Y29uZmlybWF0aW9uLmxvYWRpbmd9XG5cdFx0XHRcdFx0XHRjb2xvcj1cImJhY2tncm91bmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17YWN0aW9uQ29uZmlybWF0aW9uKGNvbmZpcm1hdGlvbiwgZmFsc2UpfVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtpc01vYmlsZS5jdXJyZW50fVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtjb25maXJtYXRpb24uY2FuY2VsfVxuXHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHR7L2lmfVxuXG5cdFx0XHRcdHsjaWYgdHlwZW9mIGNvbmZpcm1hdGlvbi5jb25maXJtID09PSAnb2JqZWN0J31cblx0XHRcdFx0XHQ8QnV0dG9uXG5cdFx0XHRcdFx0XHRsb2FkaW5nPXtjb25maXJtYXRpb24ubG9hZGluZ31cblx0XHRcdFx0XHRcdHsuLi5jb25maXJtYXRpb24uY29uZmlybX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2FjdGlvbkNvbmZpcm1hdGlvbihjb25maXJtYXRpb24sIHRydWUpfVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtpc01vYmlsZS5jdXJyZW50fVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtjb25maXJtYXRpb24uY29uZmlybS50ZXh0fVxuXHRcdFx0XHRcdDwvQnV0dG9uPlxuXHRcdFx0XHR7OmVsc2V9XG5cdFx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdFx0bG9hZGluZz17Y29uZmlybWF0aW9uLmxvYWRpbmd9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXthY3Rpb25Db25maXJtYXRpb24oY29uZmlybWF0aW9uLCB0cnVlKX1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17aXNNb2JpbGUuY3VycmVudH1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7Y29uZmlybWF0aW9uLmNvbmZpcm19XG5cdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdHsvaWZ9XG5cdFx0XHQ8L2Rpdj5cblx0XHR7L3NuaXBwZXR9XG5cdDwvRGlhbG9nPlxuey9lYWNofVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9Db25maXJtYXRpb24vQ29uZmlybWF0aW9uLnN2ZWx0ZSJ9