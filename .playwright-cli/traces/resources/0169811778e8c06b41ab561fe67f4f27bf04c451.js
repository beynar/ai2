/**
* Moves the node to `document.body` (or `target`) on mount and removes it on destroy.
* Use as an attachment: `{@attach portal()}` or `{@attach portal(targetEl)}`.
*/
export function portal(target) {
	return (node) => {
		const mount = target ?? (typeof document !== "undefined" ? document.body : undefined);
		if (!mount) return;
		mount.appendChild(node);
		return () => node.remove();
	};
}

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sU0FBUyxPQUFPLFFBQTJDO0NBQ2pFLFFBQVEsU0FBUztFQUNoQixNQUFNLFFBQ0wsV0FBVyxPQUFPLGFBQWEsY0FBYyxTQUFTLE9BQU87RUFDOUQsSUFBSSxDQUFDLE9BQU87RUFDWixNQUFNLFlBQVksSUFBSTtFQUN0QixhQUFhLEtBQUssT0FBTztDQUMxQjtBQUNEIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbInBvcnRhbC50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnQgfSBmcm9tIFwic3ZlbHRlL2F0dGFjaG1lbnRzXCI7XG5cbi8qKlxuICogTW92ZXMgdGhlIG5vZGUgdG8gYGRvY3VtZW50LmJvZHlgIChvciBgdGFyZ2V0YCkgb24gbW91bnQgYW5kIHJlbW92ZXMgaXQgb24gZGVzdHJveS5cbiAqIFVzZSBhcyBhbiBhdHRhY2htZW50OiBge0BhdHRhY2ggcG9ydGFsKCl9YCBvciBge0BhdHRhY2ggcG9ydGFsKHRhcmdldEVsKX1gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9ydGFsKHRhcmdldD86IEVsZW1lbnQpOiBBdHRhY2htZW50PEhUTUxFbGVtZW50PiB7XG5cdHJldHVybiAobm9kZSkgPT4ge1xuXHRcdGNvbnN0IG1vdW50ID1cblx0XHRcdHRhcmdldCA/PyAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuYm9keSA6IHVuZGVmaW5lZCk7XG5cdFx0aWYgKCFtb3VudCkgcmV0dXJuO1xuXHRcdG1vdW50LmFwcGVuZENoaWxkKG5vZGUpO1xuXHRcdHJldHVybiAoKSA9PiBub2RlLnJlbW92ZSgpO1xuXHR9O1xufVxuIl19