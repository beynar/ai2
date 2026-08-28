export function createImageGalleryOrigin(imageElement: HTMLImageElement) {
	const rect = imageElement.getBoundingClientRect();
	const size = imageElement.getAttribute('data-lg-size');
	if (!size || rect.width <= 0 || rect.height <= 0) {
		return { element: imageElement, remove: () => undefined };
	}

	const origin = document.createElement('span');
	const image = document.createElement('img');
	origin.setAttribute('data-lg-size', size);
	origin.setAttribute('aria-hidden', 'true');
	origin.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;visibility:hidden;pointer-events:none;`;
	image.src = imageElement.currentSrc || imageElement.src;
	image.alt = '';
	image.style.cssText = 'display:block;width:100%;height:100%;';
	origin.append(image);
	document.body.append(origin);

	return { element: origin, remove: () => origin.remove() };
}
