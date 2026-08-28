import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/Code/Code.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

Code[$.FILENAME] = 'src/lib/components/Code/Code.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import { useCodeTheme } from "/src/lib/components/Code/code.theme.ts";
import { codeToHtml } from "/src/lib/components/Code/code.highlighter.ts";
import { resolveLanguage, getLanguageLabel } from "/src/lib/components/Code/highlighter/code-languages.ts";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import CodeTheme from "/src/lib/components/Code/CodeTheme.svelte";
import Button from "/src/lib/components/Button/Button.svelte";
import ScrollArea from "/src/lib/components/ScrollArea/ScrollArea.svelte";
import { copyIcon } from "/src/lib/components/Icons/copy.ts";
import { checkIcon } from "/src/lib/components/Icons/check.ts";
import { useClipboard } from "/src/lib/utils/useClipboard.svelte.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'code',
	'language',
	'title',
	'showLineNumbers',
	'showHeader',
	'copyable',
	'wrap',
	'maxHeight',
	'tabSize',
	'header',
	'footer',
	'class',
	'theme'
]);

var root = $.add_locations($.from_html(`<div></div>`), Code[$.FILENAME], [[76, 1]]);
var root_1 = $.add_locations($.from_html(`<div><span> </span> <!></div>`), Code[$.FILENAME], [[95, 2, [[96, 3]]]]);
var root_2 = $.add_locations($.from_html(`<div><!></div>`), Code[$.FILENAME], [[104, 2]]);
var root_3 = $.add_locations($.from_html(`<!>  <div><!> <!> <!> <!></div>`, 1), Code[$.FILENAME], [[81, 0]]);

function Code($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, Code);

	const // A floating copy button covers the "code only" case (no header row) where copy would
	// otherwise be unreachable.
	// Clear the "copied" feedback whenever the displayed block changes.
	copyButton = $.wrap_snippet(Code, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var fragment = $.comment();
		var node = $.first_child(fragment);

		{
			let $0 = $.derived(() => clipboard.copied ? 'Copied' : 'Copy');

			$.add_svelte_meta(
				() => Button(node, {
					variant: 'ghost',
					color: 'foreground',
					size: 'small',
					squared: true,
					onClick: copy,
					get label() {
						return $.get($0);
					},

					children: $.wrap_snippet(Code, ($$anchor, $$slotProps) => {
						var fragment_1 = $.comment();
						var node_1 = $.first_child(fragment_1);

						{
							var consequent = ($$anchor) => {
								$.add_svelte_meta(() => checkIcon($$anchor, () => ({ size: 14 })), 'render', Code, 68, 3);
							};

							var alternate = ($$anchor) => {
								$.add_svelte_meta(() => copyIcon($$anchor, () => ({ size: 14 })), 'render', Code, 70, 3);
							};

							$.add_svelte_meta(
								() => $.if(node_1, ($$render) => {
									if (clipboard.copied) $$render(consequent); else $$render(alternate, -1);
								}),
								'if',
								Code,
								67,
								2
							);
						}

						$.append($$anchor, fragment_1);
					}),
					$$slots: { default: true }
				}),
				'component',
				Code,
				59,
				1,
				{ componentTag: 'Button' }
			);
		}

		$.append($$anchor, fragment);
	});

	const codeBody = $.wrap_snippet(Code, function ($$anchor) {
		$.validate_snippet_args(...arguments);

		var div = root();

		$.html(div, () => $.get(highlightedHtml), true);
		$.reset(div);
		$.template_effect(($0) => $.set_class(div, 1, $0), [() => $.clsx($.get(classes).container())]);
		$.append($$anchor, div);
	});

	let language = $.prop($$props, 'language', 3, 'text'),
		showLineNumbers = $.prop($$props, 'showLineNumbers', 3, false),
		showHeader = $.prop($$props, 'showHeader', 3, true),
		copyable = $.prop($$props, 'copyable', 3, true),
		wrap = $.prop($$props, 'wrap', 3, false),
		tabSize = $.prop($$props, 'tabSize', 3, 2),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const classes = $.tag($.derived(() => useCodeTheme($$props.theme)), 'classes');
	const resolvedLanguage = $.tag($.derived(() => resolveLanguage(language())), 'resolvedLanguage');
	const label = $.tag($.derived(() => $$props.title ?? getLanguageLabel(language())), 'label');

	const highlightedHtml = $.tag(
		$.derived(() => codeToHtml($$props.code, {
			language: language(),
			lineNumbers: showLineNumbers(),
			wrap: wrap()
		})),
		'highlightedHtml'
	);

	const maxHeightCss = $.tag($.derived(() => $.strict_equals(typeof $$props.maxHeight, 'number') ? `${$$props.maxHeight}px` : $$props.maxHeight), 'maxHeightCss');
	const clipboard = useClipboard();
	const copy = () => clipboard.copy($$props.code);

	$.user_effect(() => {
		$$props.code;
		language();
		showLineNumbers();
		clipboard.reset();
	});

	var $$exports = { ...$.legacy_api() };
	var fragment_4 = root_3();
	var node_2 = $.first_child(fragment_4);

	$.add_svelte_meta(() => CodeTheme(node_2, {}), 'component', Code, 56, 0, { componentTag: 'CodeTheme' });

	var div_1 = $.sibling(node_2, 2);

	$.attribute_effect(
		div_1,
		($0) => ({
			'data-slot': 'code',
			class: $0,
			...attachments,
			[$.STYLE]: {
				'--code-tab-size': tabSize(),
				'--code-max-height': $.get(maxHeightCss)
			}
		}),
		[() => $.get(classes).root({ className: $$props.class })]
	);

	var node_3 = $.child(div_1);

	{
		var consequent_1 = ($$anchor) => {
			var fragment_5 = $.comment();
			var node_4 = $.first_child(fragment_5);

			{
				let $0 = $.derived(() => $.get(classes).header());

				let $1 = $.derived(() => ({
					language: $.get(resolvedLanguage),
					label: $.get(label),
					copied: clipboard.copied,
					copy
				}));

				$.add_svelte_meta(
					() => Slot(node_4, {
						get render() {
							return $$props.header;
						},

						get class() {
							return $.get($0);
						},

						get payload() {
							return $.get($1);
						}
					}),
					'component',
					Code,
					89,
					2,
					{ componentTag: 'Slot' }
				);
			}

			$.append($$anchor, fragment_5);
		};

		var consequent_3 = ($$anchor) => {
			var div_2 = root_1();
			var span = $.child(div_2);
			var text = $.child(span, true);

			$.reset(span);

			var node_5 = $.sibling(span, 2);

			{
				var consequent_2 = ($$anchor) => {
					$.add_svelte_meta(() => copyButton($$anchor), 'render', Code, 98, 4);
				};

				$.add_svelte_meta(
					() => $.if(node_5, ($$render) => {
						if (copyable()) $$render(consequent_2);
					}),
					'if',
					Code,
					97,
					3
				);
			}

			$.reset(div_2);

			$.template_effect(
				($0, $1) => {
					$.set_class(div_2, 1, $0);
					$.set_class(span, 1, $1);
					$.set_text(text, $.get(label));
				},
				[
					() => $.clsx($.get(classes).header()),
					() => $.clsx($.get(classes).title())
				]
			);

			$.append($$anchor, div_2);
		};

		$.add_svelte_meta(
			() => $.if(node_3, ($$render) => {
				if ($$props.header) $$render(consequent_1); else if (showHeader()) $$render(consequent_3, 1);
			}),
			'if',
			Code,
			88,
			1
		);
	}

	var node_6 = $.sibling(node_3, 2);

	{
		var consequent_4 = ($$anchor) => {
			var div_3 = root_2();
			var node_7 = $.child(div_3);

			$.add_svelte_meta(() => copyButton(node_7), 'render', Code, 105, 3);
			$.reset(div_3);
			$.template_effect(($0) => $.set_class(div_3, 1, $0), [() => $.clsx($.get(classes).floatingCopy())]);
			$.append($$anchor, div_3);
		};

		$.add_svelte_meta(
			() => $.if(node_6, ($$render) => {
				if (copyable() && !$$props.header && !showHeader()) $$render(consequent_4);
			}),
			'if',
			Code,
			103,
			1
		);
	}

	var node_8 = $.sibling(node_6, 2);

	$.add_svelte_meta(
		() => ScrollArea(node_8, {
			type: 'hover',
			class: 'flex max-h-[var(--code-max-height)] flex-col rounded-b-lg',
			children: $.wrap_snippet(Code, ($$anchor, $$slotProps) => {
				$.add_svelte_meta(() => codeBody($$anchor), 'render', Code, 112, 2);
			}),
			$$slots: { default: true }
		}),
		'component',
		Code,
		111,
		1,
		{ componentTag: 'ScrollArea' }
	);

	var node_9 = $.sibling(node_8, 2);

	{
		var consequent_5 = ($$anchor) => {
			var fragment_8 = $.comment();
			var node_10 = $.first_child(fragment_8);

			{
				let $0 = $.derived(() => $.get(classes).footer());

				$.add_svelte_meta(
					() => Slot(node_10, {
						get render() {
							return $$props.footer;
						},

						get class() {
							return $.get($0);
						}
					}),
					'component',
					Code,
					116,
					2,
					{ componentTag: 'Slot' }
				);
			}

			$.append($$anchor, fragment_8);
		};

		$.add_svelte_meta(
			() => $.if(node_9, ($$render) => {
				if ($$props.footer) $$render(consequent_5);
			}),
			'if',
			Code,
			115,
			1
		);
	}

	$.reset(div_1);
	$.append($$anchor, fragment_4);

	return $.pop($$exports);
}

if (import.meta.hot) {
	Code = $.hmr(Code);

	import.meta.hot.acceptExports(["default"],(module) => {
		Code[$.HMR].update(module.default);
	});
}

export default Code;
//# sourceMappingURL=data:application/json;base64,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QixVQUFVOzs7Ozs7Ozs7Ozs7UUFRdEMsVUFBVTs7Ozs0QkFDRCxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUlZLE9BQU8sRUFBQyxNQUFNOzs7V0FBMUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW5DTjs7OztBQTNCTyIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ29kZS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IHR5cGUgeyBDb2RlUHJvcHMgfSBmcm9tICcuL2NvZGUucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VDb2RlVGhlbWUgfSBmcm9tICcuL2NvZGUudGhlbWUuanMnO1xuXHRpbXBvcnQgeyBjb2RlVG9IdG1sIH0gZnJvbSAnLi9jb2RlLmhpZ2hsaWdodGVyLmpzJztcblx0aW1wb3J0IHsgcmVzb2x2ZUxhbmd1YWdlLCBnZXRMYW5ndWFnZUxhYmVsIH0gZnJvbSAnLi9oaWdobGlnaHRlci9jb2RlLWxhbmd1YWdlcy5qcyc7XG5cdGltcG9ydCBTbG90IGZyb20gJy4uL1Nsb3QvU2xvdC5zdmVsdGUnO1xuXHRpbXBvcnQgQ29kZVRoZW1lIGZyb20gJy4vQ29kZVRoZW1lLnN2ZWx0ZSc7XG5cdGltcG9ydCBCdXR0b24gZnJvbSAnLi4vQnV0dG9uL0J1dHRvbi5zdmVsdGUnO1xuXHRpbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuLi9TY3JvbGxBcmVhL1Njcm9sbEFyZWEuc3ZlbHRlJztcblx0aW1wb3J0IHsgY29weUljb24gfSBmcm9tICcuLi9JY29ucy9jb3B5LmpzJztcblx0aW1wb3J0IHsgY2hlY2tJY29uIH0gZnJvbSAnLi4vSWNvbnMvY2hlY2suanMnO1xuXHRpbXBvcnQgeyB1c2VDbGlwYm9hcmQgfSBmcm9tICckbGliL3V0aWxzL3VzZUNsaXBib2FyZC5zdmVsdGUuanMnO1xuXG5cdGxldCB7XG5cdFx0Y29kZSxcblx0XHRsYW5ndWFnZSA9ICd0ZXh0Jyxcblx0XHR0aXRsZSxcblx0XHRzaG93TGluZU51bWJlcnMgPSBmYWxzZSxcblx0XHRzaG93SGVhZGVyID0gdHJ1ZSxcblx0XHRjb3B5YWJsZSA9IHRydWUsXG5cdFx0d3JhcCA9IGZhbHNlLFxuXHRcdG1heEhlaWdodCxcblx0XHR0YWJTaXplID0gMixcblx0XHRoZWFkZXIsXG5cdFx0Zm9vdGVyLFxuXHRcdGNsYXNzOiBjbGFzc05hbWUsXG5cdFx0dGhlbWUsXG5cdFx0Li4uYXR0YWNobWVudHNcblx0fTogQ29kZVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9ICRkZXJpdmVkKHVzZUNvZGVUaGVtZSh0aGVtZSkpO1xuXG5cdGNvbnN0IHJlc29sdmVkTGFuZ3VhZ2UgPSAkZGVyaXZlZChyZXNvbHZlTGFuZ3VhZ2UobGFuZ3VhZ2UpKTtcblx0Y29uc3QgbGFiZWwgPSAkZGVyaXZlZCh0aXRsZSA/PyBnZXRMYW5ndWFnZUxhYmVsKGxhbmd1YWdlKSk7XG5cblx0Y29uc3QgaGlnaGxpZ2h0ZWRIdG1sID0gJGRlcml2ZWQoXG5cdFx0Y29kZVRvSHRtbChjb2RlLCB7IGxhbmd1YWdlLCBsaW5lTnVtYmVyczogc2hvd0xpbmVOdW1iZXJzLCB3cmFwIH0pXG5cdCk7XG5cblx0Y29uc3QgbWF4SGVpZ2h0Q3NzID0gJGRlcml2ZWQodHlwZW9mIG1heEhlaWdodCA9PT0gJ251bWJlcicgPyBgJHttYXhIZWlnaHR9cHhgIDogbWF4SGVpZ2h0KTtcblx0Ly8gQSBmbG9hdGluZyBjb3B5IGJ1dHRvbiBjb3ZlcnMgdGhlIFwiY29kZSBvbmx5XCIgY2FzZSAobm8gaGVhZGVyIHJvdykgd2hlcmUgY29weSB3b3VsZFxuXHQvLyBvdGhlcndpc2UgYmUgdW5yZWFjaGFibGUuXG5cblx0Y29uc3QgY2xpcGJvYXJkID0gdXNlQ2xpcGJvYXJkKCk7XG5cdGNvbnN0IGNvcHkgPSAoKSA9PiBjbGlwYm9hcmQuY29weShjb2RlKTtcblxuXHQvLyBDbGVhciB0aGUgXCJjb3BpZWRcIiBmZWVkYmFjayB3aGVuZXZlciB0aGUgZGlzcGxheWVkIGJsb2NrIGNoYW5nZXMuXG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGNvZGU7XG5cdFx0bGFuZ3VhZ2U7XG5cdFx0c2hvd0xpbmVOdW1iZXJzO1xuXHRcdGNsaXBib2FyZC5yZXNldCgpO1xuXHR9KTtcbjwvc2NyaXB0PlxuXG48Q29kZVRoZW1lIC8+XG5cbnsjc25pcHBldCBjb3B5QnV0dG9uKCl9XG5cdDxCdXR0b25cblx0XHR2YXJpYW50PVwiZ2hvc3RcIlxuXHRcdGNvbG9yPVwiZm9yZWdyb3VuZFwiXG5cdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRzcXVhcmVkXG5cdFx0b25DbGljaz17Y29weX1cblx0XHRsYWJlbD17Y2xpcGJvYXJkLmNvcGllZCA/ICdDb3BpZWQnIDogJ0NvcHknfVxuXHQ+XG5cdFx0eyNpZiBjbGlwYm9hcmQuY29waWVkfVxuXHRcdFx0e0ByZW5kZXIgY2hlY2tJY29uKHsgc2l6ZTogMTQgfSl9XG5cdFx0ezplbHNlfVxuXHRcdFx0e0ByZW5kZXIgY29weUljb24oeyBzaXplOiAxNCB9KX1cblx0XHR7L2lmfVxuXHQ8L0J1dHRvbj5cbnsvc25pcHBldH1cblxueyNzbmlwcGV0IGNvZGVCb2R5KCl9XG5cdDxkaXYgY2xhc3M9e2NsYXNzZXMuY29udGFpbmVyKCl9PlxuXHRcdHtAaHRtbCBoaWdobGlnaHRlZEh0bWx9XG5cdDwvZGl2Plxuey9zbmlwcGV0fVxuXG48ZGl2XG5cdGRhdGEtc2xvdD1cImNvZGVcIlxuXHRjbGFzcz17Y2xhc3Nlcy5yb290KHsgY2xhc3NOYW1lIH0pfVxuXHRzdHlsZTotLWNvZGUtdGFiLXNpemU9e3RhYlNpemV9XG5cdHN0eWxlOi0tY29kZS1tYXgtaGVpZ2h0PXttYXhIZWlnaHRDc3N9XG5cdHsuLi5hdHRhY2htZW50c31cbj5cblx0eyNpZiBoZWFkZXJ9XG5cdFx0PFNsb3Rcblx0XHRcdHJlbmRlcj17aGVhZGVyfVxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMuaGVhZGVyKCl9XG5cdFx0XHRwYXlsb2FkPXt7IGxhbmd1YWdlOiByZXNvbHZlZExhbmd1YWdlLCBsYWJlbCwgY29waWVkOiBjbGlwYm9hcmQuY29waWVkLCBjb3B5IH19XG5cdFx0Lz5cblx0ezplbHNlIGlmIHNob3dIZWFkZXJ9XG5cdFx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5oZWFkZXIoKX0+XG5cdFx0XHQ8c3BhbiBjbGFzcz17Y2xhc3Nlcy50aXRsZSgpfT57bGFiZWx9PC9zcGFuPlxuXHRcdFx0eyNpZiBjb3B5YWJsZX1cblx0XHRcdFx0e0ByZW5kZXIgY29weUJ1dHRvbigpfVxuXHRcdFx0ey9pZn1cblx0XHQ8L2Rpdj5cblx0ey9pZn1cblxuXHR7I2lmIGNvcHlhYmxlICYmICFoZWFkZXIgJiYgIXNob3dIZWFkZXJ9XG5cdFx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5mbG9hdGluZ0NvcHkoKX0+XG5cdFx0XHR7QHJlbmRlciBjb3B5QnV0dG9uKCl9XG5cdFx0PC9kaXY+XG5cdHsvaWZ9XG5cblx0PCEtLSBTY3JvbGxBcmVhIG93bnMgYm90aCBheGVzOiBob3Jpem9udGFsIChsb25nIGxpbmVzKSBuYXRpdmVseSwgdmVydGljYWwgd2hlbiBtYXhIZWlnaHQgY2Fwc1xuXHQgICAgIHRoZSBoZWlnaHQuIEl0cyB2aWV3cG9ydCBpcyB0aGUgZm9jdXNhYmxlIG5hdGl2ZSBzY3JvbGwgcmVnaW9uIChrZXlib2FyZCArIGZvY3VzIHJpbmcpLiAtLT5cblx0PFNjcm9sbEFyZWEgdHlwZT1cImhvdmVyXCIgY2xhc3M9XCJmbGV4IG1heC1oLVt2YXIoLS1jb2RlLW1heC1oZWlnaHQpXSBmbGV4LWNvbCByb3VuZGVkLWItbGdcIj5cblx0XHR7QHJlbmRlciBjb2RlQm9keSgpfVxuXHQ8L1Njcm9sbEFyZWE+XG5cblx0eyNpZiBmb290ZXJ9XG5cdFx0PFNsb3QgcmVuZGVyPXtmb290ZXJ9IGNsYXNzPXtjbGFzc2VzLmZvb3RlcigpfSAvPlxuXHR7L2lmfVxuPC9kaXY+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL2xpYi9jb21wb25lbnRzL0NvZGUvQ29kZS5zdmVsdGUifQ==