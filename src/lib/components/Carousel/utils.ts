export const bind = (ref: any, props: Record<string, any>) => {
	const descriptors = Object.getOwnPropertyDescriptors(props);
	for (const key in descriptors) {
		Object.defineProperty(ref, key, descriptors[key]);
	}
};
export const getSize = () => {
	const width = window.innerWidth;
	if (width < 640) return 'xs';
	if (width < 768) return 'sm';
	if (width < 1024) return 'md';
	if (width < 1280) return 'lg';
	return 'xl';
};
