export function getPlainHtmlText(html: string): string {
	if (typeof document === 'undefined') {
		return html.replace(/<[^>]*>/g, '').trim();
	}

	const element = document.createElement('span');
	element.innerHTML = html;
	return element.textContent?.trim() ?? '';
}
