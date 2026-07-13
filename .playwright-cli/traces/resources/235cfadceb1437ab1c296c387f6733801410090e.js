/**
* A single Shiki theme whose every color references a `--code-token-*` CSS
* variable. The actual colors are defined in `CodeTheme.svelte` in terms of our
* `--color-*` design tokens, so the highlighting auto-adapts to light/dark for
* free (the CSS variables re-resolve under the active theme selector).
*
* Scope mapping mirrors svelte-pro's `token-shiki-scopes.ts`, trimmed to the
* roles we actually theme. Values are emitted verbatim into inline `style`
* attributes by Shiki, e.g. `color:var(--code-token-keyword)`.
*/
const token = {
	background: "var(--code-token-background)",
	plain: "var(--code-token-plain)",
	comment: "var(--code-token-comment)",
	punctuation: "var(--code-token-punctuation)",
	keyword: "var(--code-token-keyword)",
	string: "var(--code-token-string)",
	number: "var(--code-token-number)",
	constant: "var(--code-token-constant)",
	function: "var(--code-token-function)",
	variable: "var(--code-token-variable)",
	property: "var(--code-token-property)",
	tag: "var(--code-token-tag)",
	regex: "var(--code-token-regex)",
	escape: "var(--code-token-escape)",
	error: "var(--code-token-error)",
	inserted: "var(--code-token-inserted)",
	deleted: "var(--code-token-deleted)",
	changed: "var(--code-token-changed)",
	insertedBackground: "var(--code-token-inserted-background)",
	deletedBackground: "var(--code-token-deleted-background)",
	changedBackground: "var(--code-token-changed-background)"
};
const settings = [
	{ settings: {
		foreground: token.plain,
		background: token.background
	} },
	{
		scope: [
			"comment",
			"punctuation.definition.comment",
			"string.comment"
		],
		settings: {
			foreground: token.comment,
			fontStyle: "italic"
		}
	},
	{
		scope: [
			"punctuation",
			"meta.brace",
			"punctuation.section.embedded",
			"punctuation.definition.tag"
		],
		settings: { foreground: token.punctuation }
	},
	{
		scope: [
			"constant.numeric",
			"constant.language",
			"constant.character.numeric",
			"keyword.other.unit",
			"support.constant"
		],
		settings: { foreground: token.number }
	},
	{
		scope: [
			"constant",
			"entity.name.constant",
			"variable.other.constant",
			"variable.other.enummember",
			"variable.language",
			"meta.module-reference"
		],
		settings: { foreground: token.constant }
	},
	{
		scope: [
			"string",
			"string punctuation.section.embedded source",
			"string.quoted"
		],
		settings: { foreground: token.string }
	},
	{
		scope: [
			"source.regexp",
			"string.regexp",
			"string.regexp.character-class",
			"string.regexp source.ruby.embedded",
			"constant.other.reference.link",
			"string.other.link"
		],
		settings: { foreground: token.regex }
	},
	{
		scope: ["constant.character.escape", "string.regexp constant.character.escape"],
		settings: { foreground: token.escape }
	},
	{
		scope: [
			"keyword",
			"storage",
			"storage.type",
			"storage.modifier",
			"keyword.control"
		],
		settings: { foreground: token.keyword }
	},
	{
		scope: [
			"entity.name.function",
			"support.function",
			"meta.function-call.generic",
			"meta.diff.range"
		],
		settings: { foreground: token.function }
	},
	{
		scope: [
			"support.type.property-name",
			"meta.property-name",
			"meta.object-literal.key",
			"entity.other.attribute-name",
			"support.variable",
			"variable.other.property"
		],
		settings: { foreground: token.property }
	},
	{
		scope: [
			"entity.name.tag",
			"support.class.component",
			"support.type.property-name.json",
			"meta.tag"
		],
		settings: { foreground: token.tag }
	},
	{
		scope: [
			"entity.name.type",
			"entity.name.class",
			"support.type",
			"support.class",
			"entity.other.inherited-class"
		],
		settings: { foreground: token.function }
	},
	{
		scope: [
			"variable",
			"entity.name",
			"meta.definition.variable",
			"variable.parameter",
			"variable.other.readwrite"
		],
		settings: { foreground: token.variable }
	},
	{
		scope: [
			"invalid",
			"invalid.illegal",
			"invalid.broken",
			"invalid.deprecated",
			"message.error"
		],
		settings: { foreground: token.error }
	},
	{
		scope: [
			"markup.deleted",
			"meta.diff.header.from-file",
			"punctuation.definition.deleted"
		],
		settings: {
			foreground: token.deleted,
			background: token.deletedBackground
		}
	},
	{
		scope: [
			"markup.inserted",
			"meta.diff.header.to-file",
			"punctuation.definition.inserted"
		],
		settings: {
			foreground: token.inserted,
			background: token.insertedBackground
		}
	},
	{
		scope: ["markup.changed", "punctuation.definition.changed"],
		settings: {
			foreground: token.changed,
			background: token.changedBackground
		}
	},
	{
		scope: "markup.heading",
		settings: {
			foreground: token.keyword,
			fontStyle: "bold"
		}
	},
	{
		scope: "markup.bold",
		settings: {
			foreground: token.plain,
			fontStyle: "bold"
		}
	},
	{
		scope: "markup.italic",
		settings: {
			foreground: token.plain,
			fontStyle: "italic"
		}
	},
	{
		scope: "markup.underline",
		settings: { fontStyle: "underline" }
	},
	{
		scope: "markup.strikethrough",
		settings: { fontStyle: "strikethrough" }
	},
	{
		scope: ["markup.inline.raw", "markup.raw"],
		settings: { foreground: token.string }
	},
	{
		scope: ["markup.quote", "punctuation.definition.list.begin.markdown"],
		settings: { foreground: token.comment }
	}
];
/** Theme name registered with the highlighter (referenced by `codeToHtml`). */
export const CODE_SYNTAX_THEME_NAME = "svelai-code-tokens";
let cachedTheme;
/** Returns the singleton CSS-variable syntax theme registration. */
export function getCodeSyntaxTheme() {
	cachedTheme ??= {
		name: CODE_SYNTAX_THEME_NAME,
		type: "dark",
		semanticHighlighting: true,
		fg: token.plain,
		bg: token.background,
		colors: {
			foreground: token.plain,
			"editor.background": token.background,
			"editor.foreground": token.plain
		},
		settings
	};
	return cachedTheme;
}

//# sourceMappingURL=data:application/json;base64,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QUUsT0FBTztFQUFlLFVBQVU7R0FBRSxZQUFZLE1BQU07R0FBTyxXQUFXO0VBQU87Q0FBRTtDQUNqRjtFQUFFLE9BQU87RUFBaUIsVUFBVTtHQUFFLFlBQVksTUFBTTtHQUFPLFdBQVc7RUFBUztDQUFFO0NBQ3JGO0VBQUUsT0FBTztFQUFvQixVQUFVLEVBQUUsV0FBVyxZQUFZO0NBQUU7Q0FDbEU7RUFBRSxPQUFPO0VBQXdCLFVBQVUsRUFBRSxXQUFXLGdCQUFnQjtDQUFFO0NBQzFFO0VBQUUsT0FBTyxDQUFDLHFCQUFxQixZQUFZO0VBQUcsVUFBVSxFQUFFLFlBQVksTUFBTSxPQUFPO0NBQUU7Q0FDckY7RUFDQyxPQUFPLENBQUMsZ0JBQWdCLDRDQUE0QztFQUNwRSxVQUFVLEVBQUUsWUFBWSxNQUFNLFFBQVE7Q0FDdkM7QUFDRDs7QUFHQSxPQUFPLE1BQU0seUJBQXlCO0FBRXRDLElBQUk7O0FBR0osT0FBTyxTQUFTLHFCQUF3QztDQUN2RCxnQkFBZ0I7RUFDZixNQUFNO0VBQ04sTUFBTTtFQUNOLHNCQUFzQjtFQUN0QixJQUFJLE1BQU07RUFDVixJQUFJLE1BQU07RUFDVixRQUFRO0dBQ1AsWUFBWSxNQUFNO0dBQ2xCLHFCQUFxQixNQUFNO0dBQzNCLHFCQUFxQixNQUFNO0VBQzVCO0VBQ0E7Q0FDRDtDQUNBLE9BQU87QUFDUiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJjb2RlLnN5bnRheC10aGVtZS50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFJhd1RoZW1lU2V0dGluZywgVGhlbWVSZWdpc3RyYXRpb24gfSBmcm9tICdzaGlraSc7XG5cbi8qKlxuICogQSBzaW5nbGUgU2hpa2kgdGhlbWUgd2hvc2UgZXZlcnkgY29sb3IgcmVmZXJlbmNlcyBhIGAtLWNvZGUtdG9rZW4tKmAgQ1NTXG4gKiB2YXJpYWJsZS4gVGhlIGFjdHVhbCBjb2xvcnMgYXJlIGRlZmluZWQgaW4gYENvZGVUaGVtZS5zdmVsdGVgIGluIHRlcm1zIG9mIG91clxuICogYC0tY29sb3ItKmAgZGVzaWduIHRva2Vucywgc28gdGhlIGhpZ2hsaWdodGluZyBhdXRvLWFkYXB0cyB0byBsaWdodC9kYXJrIGZvclxuICogZnJlZSAodGhlIENTUyB2YXJpYWJsZXMgcmUtcmVzb2x2ZSB1bmRlciB0aGUgYWN0aXZlIHRoZW1lIHNlbGVjdG9yKS5cbiAqXG4gKiBTY29wZSBtYXBwaW5nIG1pcnJvcnMgc3ZlbHRlLXBybydzIGB0b2tlbi1zaGlraS1zY29wZXMudHNgLCB0cmltbWVkIHRvIHRoZVxuICogcm9sZXMgd2UgYWN0dWFsbHkgdGhlbWUuIFZhbHVlcyBhcmUgZW1pdHRlZCB2ZXJiYXRpbSBpbnRvIGlubGluZSBgc3R5bGVgXG4gKiBhdHRyaWJ1dGVzIGJ5IFNoaWtpLCBlLmcuIGBjb2xvcjp2YXIoLS1jb2RlLXRva2VuLWtleXdvcmQpYC5cbiAqL1xuXG5jb25zdCB0b2tlbiA9IHtcblx0YmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtdG9rZW4tYmFja2dyb3VuZCknLFxuXHRwbGFpbjogJ3ZhcigtLWNvZGUtdG9rZW4tcGxhaW4pJyxcblx0Y29tbWVudDogJ3ZhcigtLWNvZGUtdG9rZW4tY29tbWVudCknLFxuXHRwdW5jdHVhdGlvbjogJ3ZhcigtLWNvZGUtdG9rZW4tcHVuY3R1YXRpb24pJyxcblx0a2V5d29yZDogJ3ZhcigtLWNvZGUtdG9rZW4ta2V5d29yZCknLFxuXHRzdHJpbmc6ICd2YXIoLS1jb2RlLXRva2VuLXN0cmluZyknLFxuXHRudW1iZXI6ICd2YXIoLS1jb2RlLXRva2VuLW51bWJlciknLFxuXHRjb25zdGFudDogJ3ZhcigtLWNvZGUtdG9rZW4tY29uc3RhbnQpJyxcblx0ZnVuY3Rpb246ICd2YXIoLS1jb2RlLXRva2VuLWZ1bmN0aW9uKScsXG5cdHZhcmlhYmxlOiAndmFyKC0tY29kZS10b2tlbi12YXJpYWJsZSknLFxuXHRwcm9wZXJ0eTogJ3ZhcigtLWNvZGUtdG9rZW4tcHJvcGVydHkpJyxcblx0dGFnOiAndmFyKC0tY29kZS10b2tlbi10YWcpJyxcblx0cmVnZXg6ICd2YXIoLS1jb2RlLXRva2VuLXJlZ2V4KScsXG5cdGVzY2FwZTogJ3ZhcigtLWNvZGUtdG9rZW4tZXNjYXBlKScsXG5cdGVycm9yOiAndmFyKC0tY29kZS10b2tlbi1lcnJvciknLFxuXHRpbnNlcnRlZDogJ3ZhcigtLWNvZGUtdG9rZW4taW5zZXJ0ZWQpJyxcblx0ZGVsZXRlZDogJ3ZhcigtLWNvZGUtdG9rZW4tZGVsZXRlZCknLFxuXHRjaGFuZ2VkOiAndmFyKC0tY29kZS10b2tlbi1jaGFuZ2VkKScsXG5cdGluc2VydGVkQmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtdG9rZW4taW5zZXJ0ZWQtYmFja2dyb3VuZCknLFxuXHRkZWxldGVkQmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtdG9rZW4tZGVsZXRlZC1iYWNrZ3JvdW5kKScsXG5cdGNoYW5nZWRCYWNrZ3JvdW5kOiAndmFyKC0tY29kZS10b2tlbi1jaGFuZ2VkLWJhY2tncm91bmQpJ1xufSBhcyBjb25zdDtcblxuY29uc3Qgc2V0dGluZ3M6IFJhd1RoZW1lU2V0dGluZ1tdID0gW1xuXHR7IHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnBsYWluLCBiYWNrZ3JvdW5kOiB0b2tlbi5iYWNrZ3JvdW5kIH0gfSxcblx0e1xuXHRcdHNjb3BlOiBbJ2NvbW1lbnQnLCAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50JywgJ3N0cmluZy5jb21tZW50J10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uY29tbWVudCwgZm9udFN0eWxlOiAnaXRhbGljJyB9XG5cdH0sXG5cdHtcblx0XHRzY29wZTogW1xuXHRcdFx0J3B1bmN0dWF0aW9uJyxcblx0XHRcdCdtZXRhLmJyYWNlJyxcblx0XHRcdCdwdW5jdHVhdGlvbi5zZWN0aW9uLmVtYmVkZGVkJyxcblx0XHRcdCdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZydcblx0XHRdLFxuXHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnB1bmN0dWF0aW9uIH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbXG5cdFx0XHQnY29uc3RhbnQubnVtZXJpYycsXG5cdFx0XHQnY29uc3RhbnQubGFuZ3VhZ2UnLFxuXHRcdFx0J2NvbnN0YW50LmNoYXJhY3Rlci5udW1lcmljJyxcblx0XHRcdCdrZXl3b3JkLm90aGVyLnVuaXQnLFxuXHRcdFx0J3N1cHBvcnQuY29uc3RhbnQnXG5cdFx0XSxcblx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5udW1iZXIgfVxuXHR9LFxuXHR7XG5cdFx0c2NvcGU6IFtcblx0XHRcdCdjb25zdGFudCcsXG5cdFx0XHQnZW50aXR5Lm5hbWUuY29uc3RhbnQnLFxuXHRcdFx0J3ZhcmlhYmxlLm90aGVyLmNvbnN0YW50Jyxcblx0XHRcdCd2YXJpYWJsZS5vdGhlci5lbnVtbWVtYmVyJyxcblx0XHRcdCd2YXJpYWJsZS5sYW5ndWFnZScsXG5cdFx0XHQnbWV0YS5tb2R1bGUtcmVmZXJlbmNlJ1xuXHRcdF0sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uY29uc3RhbnQgfVxuXHR9LFxuXHR7XG5cdFx0c2NvcGU6IFsnc3RyaW5nJywgJ3N0cmluZyBwdW5jdHVhdGlvbi5zZWN0aW9uLmVtYmVkZGVkIHNvdXJjZScsICdzdHJpbmcucXVvdGVkJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uc3RyaW5nIH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbXG5cdFx0XHQnc291cmNlLnJlZ2V4cCcsXG5cdFx0XHQnc3RyaW5nLnJlZ2V4cCcsXG5cdFx0XHQnc3RyaW5nLnJlZ2V4cC5jaGFyYWN0ZXItY2xhc3MnLFxuXHRcdFx0J3N0cmluZy5yZWdleHAgc291cmNlLnJ1YnkuZW1iZWRkZWQnLFxuXHRcdFx0J2NvbnN0YW50Lm90aGVyLnJlZmVyZW5jZS5saW5rJyxcblx0XHRcdCdzdHJpbmcub3RoZXIubGluaydcblx0XHRdLFxuXHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnJlZ2V4IH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUnLCAnc3RyaW5nLnJlZ2V4cCBjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uZXNjYXBlIH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbJ2tleXdvcmQnLCAnc3RvcmFnZScsICdzdG9yYWdlLnR5cGUnLCAnc3RvcmFnZS5tb2RpZmllcicsICdrZXl3b3JkLmNvbnRyb2wnXSxcblx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5rZXl3b3JkIH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbXG5cdFx0XHQnZW50aXR5Lm5hbWUuZnVuY3Rpb24nLFxuXHRcdFx0J3N1cHBvcnQuZnVuY3Rpb24nLFxuXHRcdFx0J21ldGEuZnVuY3Rpb24tY2FsbC5nZW5lcmljJyxcblx0XHRcdCdtZXRhLmRpZmYucmFuZ2UnXG5cdFx0XSxcblx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5mdW5jdGlvbiB9XG5cdH0sXG5cdHtcblx0XHRzY29wZTogW1xuXHRcdFx0J3N1cHBvcnQudHlwZS5wcm9wZXJ0eS1uYW1lJyxcblx0XHRcdCdtZXRhLnByb3BlcnR5LW5hbWUnLFxuXHRcdFx0J21ldGEub2JqZWN0LWxpdGVyYWwua2V5Jyxcblx0XHRcdCdlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUnLFxuXHRcdFx0J3N1cHBvcnQudmFyaWFibGUnLFxuXHRcdFx0J3ZhcmlhYmxlLm90aGVyLnByb3BlcnR5J1xuXHRcdF0sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4ucHJvcGVydHkgfVxuXHR9LFxuXHR7XG5cdFx0c2NvcGU6IFtcblx0XHRcdCdlbnRpdHkubmFtZS50YWcnLFxuXHRcdFx0J3N1cHBvcnQuY2xhc3MuY29tcG9uZW50Jyxcblx0XHRcdCdzdXBwb3J0LnR5cGUucHJvcGVydHktbmFtZS5qc29uJyxcblx0XHRcdCdtZXRhLnRhZydcblx0XHRdLFxuXHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnRhZyB9XG5cdH0sXG5cdHtcblx0XHRzY29wZTogW1xuXHRcdFx0J2VudGl0eS5uYW1lLnR5cGUnLFxuXHRcdFx0J2VudGl0eS5uYW1lLmNsYXNzJyxcblx0XHRcdCdzdXBwb3J0LnR5cGUnLFxuXHRcdFx0J3N1cHBvcnQuY2xhc3MnLFxuXHRcdFx0J2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MnXG5cdFx0XSxcblx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5mdW5jdGlvbiB9XG5cdH0sXG5cdHtcblx0XHRzY29wZTogW1xuXHRcdFx0J3ZhcmlhYmxlJyxcblx0XHRcdCdlbnRpdHkubmFtZScsXG5cdFx0XHQnbWV0YS5kZWZpbml0aW9uLnZhcmlhYmxlJyxcblx0XHRcdCd2YXJpYWJsZS5wYXJhbWV0ZXInLFxuXHRcdFx0J3ZhcmlhYmxlLm90aGVyLnJlYWR3cml0ZSdcblx0XHRdLFxuXHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnZhcmlhYmxlIH1cblx0fSxcblx0e1xuXHRcdHNjb3BlOiBbJ2ludmFsaWQnLCAnaW52YWxpZC5pbGxlZ2FsJywgJ2ludmFsaWQuYnJva2VuJywgJ2ludmFsaWQuZGVwcmVjYXRlZCcsICdtZXNzYWdlLmVycm9yJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uZXJyb3IgfVxuXHR9LFxuXHR7XG5cdFx0c2NvcGU6IFsnbWFya3VwLmRlbGV0ZWQnLCAnbWV0YS5kaWZmLmhlYWRlci5mcm9tLWZpbGUnLCAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5kZWxldGVkJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uZGVsZXRlZCwgYmFja2dyb3VuZDogdG9rZW4uZGVsZXRlZEJhY2tncm91bmQgfVxuXHR9LFxuXHR7XG5cdFx0c2NvcGU6IFsnbWFya3VwLmluc2VydGVkJywgJ21ldGEuZGlmZi5oZWFkZXIudG8tZmlsZScsICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmluc2VydGVkJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uaW5zZXJ0ZWQsIGJhY2tncm91bmQ6IHRva2VuLmluc2VydGVkQmFja2dyb3VuZCB9XG5cdH0sXG5cdHtcblx0XHRzY29wZTogWydtYXJrdXAuY2hhbmdlZCcsICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNoYW5nZWQnXSxcblx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5jaGFuZ2VkLCBiYWNrZ3JvdW5kOiB0b2tlbi5jaGFuZ2VkQmFja2dyb3VuZCB9XG5cdH0sXG5cdHsgc2NvcGU6ICdtYXJrdXAuaGVhZGluZycsIHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLmtleXdvcmQsIGZvbnRTdHlsZTogJ2JvbGQnIH0gfSxcblx0eyBzY29wZTogJ21hcmt1cC5ib2xkJywgc2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4ucGxhaW4sIGZvbnRTdHlsZTogJ2JvbGQnIH0gfSxcblx0eyBzY29wZTogJ21hcmt1cC5pdGFsaWMnLCBzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB0b2tlbi5wbGFpbiwgZm9udFN0eWxlOiAnaXRhbGljJyB9IH0sXG5cdHsgc2NvcGU6ICdtYXJrdXAudW5kZXJsaW5lJywgc2V0dGluZ3M6IHsgZm9udFN0eWxlOiAndW5kZXJsaW5lJyB9IH0sXG5cdHsgc2NvcGU6ICdtYXJrdXAuc3RyaWtldGhyb3VnaCcsIHNldHRpbmdzOiB7IGZvbnRTdHlsZTogJ3N0cmlrZXRocm91Z2gnIH0gfSxcblx0eyBzY29wZTogWydtYXJrdXAuaW5saW5lLnJhdycsICdtYXJrdXAucmF3J10sIHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHRva2VuLnN0cmluZyB9IH0sXG5cdHtcblx0XHRzY29wZTogWydtYXJrdXAucXVvdGUnLCAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5saXN0LmJlZ2luLm1hcmtkb3duJ10sXG5cdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdG9rZW4uY29tbWVudCB9XG5cdH1cbl07XG5cbi8qKiBUaGVtZSBuYW1lIHJlZ2lzdGVyZWQgd2l0aCB0aGUgaGlnaGxpZ2h0ZXIgKHJlZmVyZW5jZWQgYnkgYGNvZGVUb0h0bWxgKS4gKi9cbmV4cG9ydCBjb25zdCBDT0RFX1NZTlRBWF9USEVNRV9OQU1FID0gJ3N2ZWxhaS1jb2RlLXRva2Vucyc7XG5cbmxldCBjYWNoZWRUaGVtZTogVGhlbWVSZWdpc3RyYXRpb24gfCB1bmRlZmluZWQ7XG5cbi8qKiBSZXR1cm5zIHRoZSBzaW5nbGV0b24gQ1NTLXZhcmlhYmxlIHN5bnRheCB0aGVtZSByZWdpc3RyYXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29kZVN5bnRheFRoZW1lKCk6IFRoZW1lUmVnaXN0cmF0aW9uIHtcblx0Y2FjaGVkVGhlbWUgPz89IHtcblx0XHRuYW1lOiBDT0RFX1NZTlRBWF9USEVNRV9OQU1FLFxuXHRcdHR5cGU6ICdkYXJrJyxcblx0XHRzZW1hbnRpY0hpZ2hsaWdodGluZzogdHJ1ZSxcblx0XHRmZzogdG9rZW4ucGxhaW4sXG5cdFx0Ymc6IHRva2VuLmJhY2tncm91bmQsXG5cdFx0Y29sb3JzOiB7XG5cdFx0XHRmb3JlZ3JvdW5kOiB0b2tlbi5wbGFpbixcblx0XHRcdCdlZGl0b3IuYmFja2dyb3VuZCc6IHRva2VuLmJhY2tncm91bmQsXG5cdFx0XHQnZWRpdG9yLmZvcmVncm91bmQnOiB0b2tlbi5wbGFpblxuXHRcdH0sXG5cdFx0c2V0dGluZ3Ncblx0fTtcblx0cmV0dXJuIGNhY2hlZFRoZW1lO1xufVxuIl19