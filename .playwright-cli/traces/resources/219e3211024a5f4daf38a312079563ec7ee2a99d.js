import structureMap from "/@id/__x00__virtual:svelai-structure?t=1783864636289";
const INDENT = "  ";
/**
* A ready-to-use `set<Component>Theme({..})` override snippet for a component.
* `default` ships the current default classes; `empty` yields a blank scaffold to
* fill in. Boolean variants are omitted — `setComponentTheme` types them as booleans,
* so they take no string class map.
*/
export function buildThemeSnippet(component, mode) {
	const structure = structureMap[component];
	if (!structure) return "";
	const setter = structure.setter ?? `set${component}Theme`;
	const importPath = structure.importPath ?? "svelai";
	const parts = structure.parts.filter((part) => part.base !== undefined || part.variants?.some((variant) => !isBooleanVariant(variant)));
	const body = parts.map((part) => renderPart(part, mode)).join(",\n");
	return `import { ${setter} } from '${importPath}';\n\n${setter}({\n${body}\n});`;
}
/** One `partName: { base, variant: { value: classes } }` block, indented under the setter. */
function renderPart(part, mode) {
	const lines = [`${INDENT.repeat(2)}base: ${quote(mode === "empty" ? "" : part.base ?? "")}`];
	for (const variant of part.variants ?? []) {
		if (isBooleanVariant(variant)) continue;
		const options = variant.options.map((option) => `${INDENT.repeat(3)}${key(option.value)}: ${quote(mode === "empty" ? "" : option.classes)}`).join(",\n");
		lines.push(`${INDENT.repeat(2)}${key(variant.name)}: {\n${options}\n${INDENT.repeat(2)}}`);
	}
	return `${INDENT}${key(part.name)}: {\n${lines.join(",\n")}\n${INDENT}}`;
}
/** A boolean variant (`{ true, false }`) can't be typed as a string map, so it's skipped. */
function isBooleanVariant(variant) {
	return variant.options.every((option) => option.value === "true" || option.value === "false");
}
/** An object key, bare when it's a valid identifier, quoted otherwise. */
function key(name) {
	return /^[A-Za-z_$][\w$]*$/.test(name) ? name : quote(name);
}
function quote(value) {
	return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxrQkFBa0I7QUFLekIsTUFBTSxTQUFTOzs7Ozs7O0FBUWYsT0FBTyxTQUFTLGtCQUFrQixXQUFtQixNQUFnQztDQUNwRixNQUFNLFlBQVksYUFBYTtDQUMvQixJQUFJLENBQUMsV0FBVyxPQUFPO0NBRXZCLE1BQU0sU0FBUyxVQUFVLFVBQVUsTUFBTSxVQUFVO0NBQ25ELE1BQU0sYUFBYSxVQUFVLGNBQWM7Q0FDM0MsTUFBTSxRQUFRLFVBQVUsTUFBTSxRQUM1QixTQUFTLEtBQUssU0FBUyxhQUFhLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLENBQ2pHO0NBRUEsTUFBTSxPQUFPLE1BQU0sS0FBSyxTQUFTLFdBQVcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztDQUNuRSxPQUFPLFlBQVksT0FBTyxXQUFXLFdBQVcsUUFBUSxPQUFPLE1BQU0sS0FBSztBQUMzRTs7QUFHQSxTQUFTLFdBQVcsTUFBaUIsTUFBZ0M7Q0FDcEUsTUFBTSxRQUFRLENBQUMsR0FBRyxPQUFPLE9BQU8sQ0FBQyxFQUFFLFFBQVEsTUFBTSxTQUFTLFVBQVUsS0FBTSxLQUFLLFFBQVEsRUFBRyxHQUFHO0NBRTdGLEtBQUssTUFBTSxXQUFXLEtBQUssWUFBWSxDQUFDLEdBQUc7RUFDMUMsSUFBSSxpQkFBaUIsT0FBTyxHQUFHO0VBQy9CLE1BQU0sVUFBVSxRQUFRLFFBQ3RCLEtBQ0MsV0FDQSxHQUFHLE9BQU8sT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLE1BQU0sU0FBUyxVQUFVLEtBQUssT0FBTyxPQUFPLEdBQzFGLENBQUMsQ0FDQSxLQUFLLEtBQUs7RUFDWixNQUFNLEtBQUssR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxJQUFJLEVBQUUsT0FBTyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsRUFBRSxFQUFFO0NBQzFGO0NBRUEsT0FBTyxHQUFHLFNBQVMsSUFBSSxLQUFLLElBQUksRUFBRSxPQUFPLE1BQU0sS0FBSyxLQUFLLEVBQUUsSUFBSSxPQUFPO0FBQ3ZFOztBQUdBLFNBQVMsaUJBQWlCLFNBQWdDO0NBQ3pELE9BQU8sUUFBUSxRQUFRLE9BQU8sV0FBVyxPQUFPLFVBQVUsVUFBVSxPQUFPLFVBQVUsT0FBTztBQUM3Rjs7QUFHQSxTQUFTLElBQUksTUFBc0I7Q0FDbEMsT0FBTyxxQkFBcUIsS0FBSyxJQUFJLElBQUksT0FBTyxNQUFNLElBQUk7QUFDM0Q7QUFFQSxTQUFTLE1BQU0sT0FBdUI7Q0FDckMsT0FBTyxJQUFJLE1BQU0sUUFBUSxPQUFPLE1BQU0sQ0FBQyxDQUFDLFFBQVEsTUFBTSxLQUFLLEVBQUU7QUFDOUQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsidGhlbWVTbmlwcGV0LnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHJ1Y3R1cmVNYXAgZnJvbSAndmlydHVhbDpzdmVsYWktc3RydWN0dXJlJztcbmltcG9ydCB0eXBlIHsgVGhlbWVQYXJ0LCBUaGVtZVZhcmlhbnQgfSBmcm9tICcuLi8uLi90b29saW5nL3N0cnVjdHVyZS1kb2NzL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgVGhlbWVTbmlwcGV0TW9kZSA9ICdkZWZhdWx0JyB8ICdlbXB0eSc7XG5cbmNvbnN0IElOREVOVCA9ICcgICc7XG5cbi8qKlxuICogQSByZWFkeS10by11c2UgYHNldDxDb21wb25lbnQ+VGhlbWUoey4ufSlgIG92ZXJyaWRlIHNuaXBwZXQgZm9yIGEgY29tcG9uZW50LlxuICogYGRlZmF1bHRgIHNoaXBzIHRoZSBjdXJyZW50IGRlZmF1bHQgY2xhc3NlczsgYGVtcHR5YCB5aWVsZHMgYSBibGFuayBzY2FmZm9sZCB0b1xuICogZmlsbCBpbi4gQm9vbGVhbiB2YXJpYW50cyBhcmUgb21pdHRlZCDigJQgYHNldENvbXBvbmVudFRoZW1lYCB0eXBlcyB0aGVtIGFzIGJvb2xlYW5zLFxuICogc28gdGhleSB0YWtlIG5vIHN0cmluZyBjbGFzcyBtYXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRoZW1lU25pcHBldChjb21wb25lbnQ6IHN0cmluZywgbW9kZTogVGhlbWVTbmlwcGV0TW9kZSk6IHN0cmluZyB7XG5cdGNvbnN0IHN0cnVjdHVyZSA9IHN0cnVjdHVyZU1hcFtjb21wb25lbnRdO1xuXHRpZiAoIXN0cnVjdHVyZSkgcmV0dXJuICcnO1xuXG5cdGNvbnN0IHNldHRlciA9IHN0cnVjdHVyZS5zZXR0ZXIgPz8gYHNldCR7Y29tcG9uZW50fVRoZW1lYDtcblx0Y29uc3QgaW1wb3J0UGF0aCA9IHN0cnVjdHVyZS5pbXBvcnRQYXRoID8/ICdzdmVsYWknO1xuXHRjb25zdCBwYXJ0cyA9IHN0cnVjdHVyZS5wYXJ0cy5maWx0ZXIoXG5cdFx0KHBhcnQpID0+IHBhcnQuYmFzZSAhPT0gdW5kZWZpbmVkIHx8IHBhcnQudmFyaWFudHM/LnNvbWUoKHZhcmlhbnQpID0+ICFpc0Jvb2xlYW5WYXJpYW50KHZhcmlhbnQpKVxuXHQpO1xuXG5cdGNvbnN0IGJvZHkgPSBwYXJ0cy5tYXAoKHBhcnQpID0+IHJlbmRlclBhcnQocGFydCwgbW9kZSkpLmpvaW4oJyxcXG4nKTtcblx0cmV0dXJuIGBpbXBvcnQgeyAke3NldHRlcn0gfSBmcm9tICcke2ltcG9ydFBhdGh9JztcXG5cXG4ke3NldHRlcn0oe1xcbiR7Ym9keX1cXG59KTtgO1xufVxuXG4vKiogT25lIGBwYXJ0TmFtZTogeyBiYXNlLCB2YXJpYW50OiB7IHZhbHVlOiBjbGFzc2VzIH0gfWAgYmxvY2ssIGluZGVudGVkIHVuZGVyIHRoZSBzZXR0ZXIuICovXG5mdW5jdGlvbiByZW5kZXJQYXJ0KHBhcnQ6IFRoZW1lUGFydCwgbW9kZTogVGhlbWVTbmlwcGV0TW9kZSk6IHN0cmluZyB7XG5cdGNvbnN0IGxpbmVzID0gW2Ake0lOREVOVC5yZXBlYXQoMil9YmFzZTogJHtxdW90ZShtb2RlID09PSAnZW1wdHknID8gJycgOiAocGFydC5iYXNlID8/ICcnKSl9YF07XG5cblx0Zm9yIChjb25zdCB2YXJpYW50IG9mIHBhcnQudmFyaWFudHMgPz8gW10pIHtcblx0XHRpZiAoaXNCb29sZWFuVmFyaWFudCh2YXJpYW50KSkgY29udGludWU7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHZhcmlhbnQub3B0aW9uc1xuXHRcdFx0Lm1hcChcblx0XHRcdFx0KG9wdGlvbikgPT5cblx0XHRcdFx0XHRgJHtJTkRFTlQucmVwZWF0KDMpfSR7a2V5KG9wdGlvbi52YWx1ZSl9OiAke3F1b3RlKG1vZGUgPT09ICdlbXB0eScgPyAnJyA6IG9wdGlvbi5jbGFzc2VzKX1gXG5cdFx0XHQpXG5cdFx0XHQuam9pbignLFxcbicpO1xuXHRcdGxpbmVzLnB1c2goYCR7SU5ERU5ULnJlcGVhdCgyKX0ke2tleSh2YXJpYW50Lm5hbWUpfToge1xcbiR7b3B0aW9uc31cXG4ke0lOREVOVC5yZXBlYXQoMil9fWApO1xuXHR9XG5cblx0cmV0dXJuIGAke0lOREVOVH0ke2tleShwYXJ0Lm5hbWUpfToge1xcbiR7bGluZXMuam9pbignLFxcbicpfVxcbiR7SU5ERU5UfX1gO1xufVxuXG4vKiogQSBib29sZWFuIHZhcmlhbnQgKGB7IHRydWUsIGZhbHNlIH1gKSBjYW4ndCBiZSB0eXBlZCBhcyBhIHN0cmluZyBtYXAsIHNvIGl0J3Mgc2tpcHBlZC4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhblZhcmlhbnQodmFyaWFudDogVGhlbWVWYXJpYW50KTogYm9vbGVhbiB7XG5cdHJldHVybiB2YXJpYW50Lm9wdGlvbnMuZXZlcnkoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSAndHJ1ZScgfHwgb3B0aW9uLnZhbHVlID09PSAnZmFsc2UnKTtcbn1cblxuLyoqIEFuIG9iamVjdCBrZXksIGJhcmUgd2hlbiBpdCdzIGEgdmFsaWQgaWRlbnRpZmllciwgcXVvdGVkIG90aGVyd2lzZS4gKi9cbmZ1bmN0aW9uIGtleShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gL15bQS1aYS16XyRdW1xcdyRdKiQvLnRlc3QobmFtZSkgPyBuYW1lIDogcXVvdGUobmFtZSk7XG59XG5cbmZ1bmN0aW9uIHF1b3RlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gYCcke3ZhbHVlLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpfSdgO1xufVxuIl19