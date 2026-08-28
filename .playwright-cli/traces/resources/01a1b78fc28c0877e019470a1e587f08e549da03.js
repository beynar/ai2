import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/components/ImageGallery/ImageGallery.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

ImageGallery[$.FILENAME] = 'src/lib/components/ImageGallery/ImageGallery.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Slot from "/src/lib/components/Slot/Slot.svelte";
import { caretLeftIcon } from "/src/lib/components/Icons/caretLeft.ts";
import { caretRightIcon } from "/src/lib/components/Icons/caretRight.ts";
import { xIcon } from "/src/lib/components/Icons/x.ts";
import { portal } from "/src/lib/attachments/portal.ts";
import { usePanzoom } from "/src/lib/utils/usePanzoom.svelte.ts";
import { ImageGalleryState } from "/src/lib/components/ImageGallery/imageGallery.state.svelte.ts";
import { useImageGalleryTheme } from "/src/lib/components/ImageGallery/imageGallery.theme.ts";

var rest_excludes = new Set([
	'$$slots',
	'$$events',
	'$$legacy',
	'id',
	'open',
	'activeIndex',
	'imageSelector',
	'disabled',
	'zoomMargin',
	'transitionDuration',
	'closeOnClickOutside',
	'closeOnEscape',
	'lockScroll',
	'buttonLabel',
	'closeLabel',
	'previousLabel',
	'nextLabel',
	'class',
	'onOpenChange',
	'onIndexChange',
	'theme',
	'children',
	'caption'
]);

var root = $.add_locations($.from_html(`<div><div><img draggable="false"/></div></div>`), ImageGallery[$.FILENAME], [[121, 5, [[122, 6, [[123, 7]]]]]]);
var root_1 = $.add_locations($.from_html(`<button type="button"><img alt="" draggable="false"/></button>`), ImageGallery[$.FILENAME], [[139, 6, [[146, 7]]]]);
var root_2 = $.add_locations($.from_html(`<div></div>`), ImageGallery[$.FILENAME], [[137, 4]]);
var root_3 = $.add_locations($.from_html(`<div><button type="button"><!></button> <button type="button"><!></button></div>`), ImageGallery[$.FILENAME], [[153, 4, [[154, 5], [165, 5]]]]);
var root_4 = $.add_locations($.from_html(`<img alt="" aria-hidden="true" data-image-gallery-flip="" draggable="false"/>`), ImageGallery[$.FILENAME], [[180, 3]]);
var root_5 = $.add_locations($.from_html(`<div> </div>`), ImageGallery[$.FILENAME], [[210, 3]]);
var root_6 = $.add_locations($.from_html(`<div role="dialog" aria-modal="true"><button type="button" aria-hidden="true" tabindex="-1"></button> <div data-image-gallery-stage=""><div></div> <!> <!></div> <!> <button type="button"><!></button> <!></div>`), ImageGallery[$.FILENAME], [[101, 1, [[109, 2], [118, 2, [[119, 3]]], [197, 2]]]]);
var root_7 = $.add_locations($.from_html(`<div><!></div> <!>`, 1), ImageGallery[$.FILENAME], [[96, 0]]);

function ImageGallery($$anchor, $$props) {
	const generatedId = $.props_id();

	$.check_target(new.target);
	$.push($$props, true, ImageGallery);

	let open = $.prop($$props, 'open', 15, false),
		activeIndex = $.prop($$props, 'activeIndex', 15, 0),
		imageSelector = $.prop($$props, 'imageSelector', 3, 'img'),
		disabled = $.prop($$props, 'disabled', 3, false),
		zoomMargin = $.prop($$props, 'zoomMargin', 3, 32),
		transitionDuration = $.prop($$props, 'transitionDuration', 3, 240),
		closeOnClickOutside = $.prop($$props, 'closeOnClickOutside', 3, true),
		closeOnEscape = $.prop($$props, 'closeOnEscape', 3, true),
		lockScroll = $.prop($$props, 'lockScroll', 3, true),
		buttonLabel = $.prop($$props, 'buttonLabel', 3, 'Open image gallery'),
		closeLabel = $.prop($$props, 'closeLabel', 3, 'Close image gallery'),
		previousLabel = $.prop($$props, 'previousLabel', 3, 'Previous image'),
		nextLabel = $.prop($$props, 'nextLabel', 3, 'Next image'),
		attachments = $.rest_props($$props, rest_excludes, 'attachments');

	const id = $.tag($.derived(() => $$props.id || generatedId), 'id');
	const classes = $.tag($.derived(() => useImageGalleryTheme($$props.theme)), 'classes');

	const state = new ImageGalleryState({
		get imageSelector() {
			return imageSelector();
		},

		get isOpen() {
			return open();
		},

		set isOpen(value) {
			open(value);
		},

		get activeIndex() {
			return activeIndex();
		},

		set activeIndex(value) {
			activeIndex(value);
		},

		get disabled() {
			return disabled();
		},

		get zoomMargin() {
			return zoomMargin();
		},

		get transitionDuration() {
			return transitionDuration();
		},

		get closeOnEscape() {
			return closeOnEscape();
		},

		get lockScroll() {
			return lockScroll();
		},

		get buttonLabel() {
			return buttonLabel();
		},

		get onOpenChange() {
			return $$props.onOpenChange;
		},

		get onIndexChange() {
			return $$props.onIndexChange;
		}
	});

	const imageRect = $.tag($.derived(() => state.imageRect), 'imageRect');

	const panzoom = usePanzoom({
		minZoom: 1,
		maxZoom: 5,
		zoomSpeed: 0.65,
		doubleClickScale: 2,
		activateMouseWheel: true
	});

	const noAttachment = () => {};

	$.user_effect(() => {
		if (activeIndex() >= 0) panzoom.reset();
	});

	var $$exports = { ...$.legacy_api() };
	var fragment = root_7();
	var div = $.first_child(fragment);

	$.attribute_effect(div, ($0) => ({ class: $0, ...attachments }), [() => $.get(classes).root({ className: $$props.class })]);

	var node = $.child(div);

	$.add_svelte_meta(
		() => Slot(node, {
			get render() {
				return $$props.children;
			},

			get payload() {
				return state.payload;
			}
		}),
		'component',
		ImageGallery,
		97,
		1,
		{ componentTag: 'Slot' }
	);

	$.reset(div);
	$.bind_this(div, ($$value) => state.rootElement = $$value, () => state?.rootElement);

	var node_1 = $.sibling(div, 2);

	{
		var consequent_5 = ($$anchor) => {
			var div_1 = root_6();
			var button = $.child(div_1);
			let styles;
			var div_2 = $.sibling(button, 2);
			var div_3 = $.child(div_2);

			$.add_svelte_meta(
				() => $.each(div_3, 21, () => state.images, (image) => image.src, ($$anchor, image) => {
					var div_4 = root();
					var div_5 = $.child(div_4);
					var img = $.child(div_5);

					$.attach(img, () => $.strict_equals($.get(image).index, activeIndex()) ? panzoom.attach : noAttachment);
					$.reset(div_5);
					$.reset(div_4);

					$.template_effect(
						($0, $1, $2) => {
							$.set_class(div_4, 1, $0);
							$.set_class(div_5, 1, $1);
							$.set_attribute(img, 'src', $.get(image).src);
							$.set_attribute(img, 'alt', $.get(image).alt);
							$.set_class(img, 1, $2);
							$.set_attribute(img, 'data-image-gallery-overlay-index', $.get(image).index);
						},
						[
							() => $.clsx($.get(classes).slide({ relation: state.getImageRelation($.get(image).index) })),
							() => $.clsx($.get(classes).slideInner({ relation: state.getImageRelation($.get(image).index) })),
							() => $.clsx($.get(classes).image())
						]
					);

					$.append($$anchor, div_4);
				}),
				'each',
				ImageGallery,
				120,
				4
			);

			$.reset(div_3);
			$.validate_binding('bind:this={state.scrollerElement}', [], () => state, () => 'scrollerElement', 119, 8);
			$.bind_this(div_3, ($$value) => state.scrollerElement = $$value, () => state?.scrollerElement);

			var node_2 = $.sibling(div_3, 2);

			{
				var consequent = ($$anchor) => {
					var div_6 = root_2();

					$.add_svelte_meta(
						() => $.each(div_6, 21, () => state.images, $.index, ($$anchor, image) => {
							var button_1 = root_1();
							var img_1 = $.child(button_1);

							$.reset(button_1);

							$.template_effect(
								($0, $1) => {
									$.set_attribute(button_1, 'aria-label', `Open image ${$.get(image).index + 1}`);
									$.set_attribute(button_1, 'aria-current', $.strict_equals(state.activeIndex, $.get(image).index) ? 'true' : undefined);
									$.set_class(button_1, 1, $0);
									$.set_attribute(img_1, 'src', $.get(image).src);
									$.set_class(img_1, 1, $1);
								},
								[
									() => $.clsx($.get(classes).thumbnail({
										active: $.strict_equals(state.activeIndex, $.get(image).index)
									})),
									() => $.clsx($.get(classes).thumbnailImage())
								]
							);

							$.delegated('click', button_1, function click_1() {
								return state.setActiveIndex($.get(image).index);
							});

							$.append($$anchor, button_1);
						}),
						'each',
						ImageGallery,
						138,
						5
					);

					$.reset(div_6);
					$.validate_binding('bind:this={state.thumbnailScrollerElement}', [], () => state, () => 'thumbnailScrollerElement', 137, 9);
					$.bind_this(div_6, ($$value) => state.thumbnailScrollerElement = $$value, () => state?.thumbnailScrollerElement);
					$.template_effect(($0) => $.set_class(div_6, 1, $0), [() => $.clsx($.get(classes).thumbnails())]);
					$.append($$anchor, div_6);
				};

				$.add_svelte_meta(
					() => $.if(node_2, ($$render) => {
						if (state.images.length > 1) $$render(consequent);
					}),
					'if',
					ImageGallery,
					136,
					3
				);
			}

			var node_3 = $.sibling(node_2, 2);

			{
				var consequent_1 = ($$anchor) => {
					var div_7 = root_3();
					var button_2 = $.child(div_7);
					var node_4 = $.child(button_2);

					$.add_svelte_meta(() => caretLeftIcon(node_4, () => ({ size: 20 })), 'render', ImageGallery, 162, 6);
					$.reset(button_2);

					var button_3 = $.sibling(button_2, 2);
					var node_5 = $.child(button_3);

					$.add_svelte_meta(() => caretRightIcon(node_5, () => ({ size: 20 })), 'render', ImageGallery, 173, 6);
					$.reset(button_3);
					$.reset(div_7);

					$.template_effect(
						($0, $1, $2) => {
							$.set_class(div_7, 1, $0);
							$.set_attribute(button_2, 'aria-controls', $.get(id));
							$.set_attribute(button_2, 'aria-label', previousLabel());
							button_2.disabled = !state.canPrevious;
							$.set_class(button_2, 1, $1);
							$.set_attribute(button_3, 'aria-controls', $.get(id));
							$.set_attribute(button_3, 'aria-label', nextLabel());
							button_3.disabled = !state.canNext;
							$.set_class(button_3, 1, $2);
						},
						[
							() => $.clsx($.get(classes).navigation()),
							() => $.clsx($.get(classes).navigationButton({ direction: 'previous' })),
							() => $.clsx($.get(classes).navigationButton({ direction: 'next' }))
						]
					);

					$.delegated('click', button_2, function (...$$args) {
						$.apply(() => state.previous, this, $$args, ImageGallery, [160, 15]);
					});

					$.delegated('click', button_3, function (...$$args) {
						$.apply(() => state.next, this, $$args, ImageGallery, [171, 15]);
					});

					$.append($$anchor, div_7);
				};

				$.add_svelte_meta(
					() => $.if(node_3, ($$render) => {
						if (state.images.length > 1) $$render(consequent_1);
					}),
					'if',
					ImageGallery,
					152,
					3
				);
			}

			$.reset(div_2);

			var node_6 = $.sibling(div_2, 2);

			{
				var consequent_2 = ($$anchor) => {
					var img_2 = root_4();
					let styles_1;

					$.template_effect(
						($0) => {
							$.set_attribute(img_2, 'src', state.activeImage.src);
							$.set_class(img_2, 1, $0);

							styles_1 = $.set_style(img_2, '', styles_1, {
								left: `${$.get(imageRect).left}px`,
								top: `${$.get(imageRect).top}px`,
								width: `${$.get(imageRect).width}px`,
								height: `${$.get(imageRect).height}px`,
								'border-radius': state.flipBorderRadius,
								transform: state.flipTransform,
								'transition-duration': `${state.animationDuration}ms`
							});
						},
						[
							() => $.clsx($.get(classes).flipImage({ animating: state.flipAnimating }))
						]
					);

					$.append($$anchor, img_2);
				};

				$.add_svelte_meta(
					() => $.if(node_6, ($$render) => {
						if (state.flipVisible && state.activeImage) $$render(consequent_2);
					}),
					'if',
					ImageGallery,
					179,
					2
				);
			}

			var button_4 = $.sibling(node_6, 2);
			var node_7 = $.child(button_4);

			$.add_svelte_meta(() => xIcon(node_7, () => ({ size: 20 })), 'render', ImageGallery, 204, 3);
			$.reset(button_4);
			$.validate_binding('bind:this={state.closeButtonElement}', [], () => state, () => 'closeButtonElement', 199, 3);
			$.bind_this(button_4, ($$value) => state.closeButtonElement = $$value, () => state?.closeButtonElement);

			var node_8 = $.sibling(button_4, 2);

			{
				var consequent_3 = ($$anchor) => {
					var fragment_1 = $.comment();
					var node_9 = $.first_child(fragment_1);

					{
						let $0 = $.derived(() => $.get(classes).caption());

						$.add_svelte_meta(
							() => Slot(node_9, {
								get render() {
									return $$props.caption;
								},

								get payload() {
									return state.payload;
								},

								get class() {
									return $.get($0);
								}
							}),
							'component',
							ImageGallery,
							208,
							3,
							{ componentTag: 'Slot' }
						);
					}

					$.append($$anchor, fragment_1);
				};

				var consequent_4 = ($$anchor) => {
					var div_8 = root_5();
					var text = $.child(div_8, true);

					$.reset(div_8);

					$.template_effect(
						($0) => {
							$.set_class(div_8, 1, $0);
							$.set_text(text, state.activeImage.caption);
						},
						[() => $.clsx($.get(classes).caption())]
					);

					$.append($$anchor, div_8);
				};

				$.add_svelte_meta(
					() => $.if(node_8, ($$render) => {
						if (state.contentVisible && $$props.caption) $$render(consequent_3); else if (state.contentVisible && state.activeImage?.caption) $$render(consequent_4, 1);
					}),
					'if',
					ImageGallery,
					207,
					2
				);
			}

			$.reset(div_1);
			$.attach(div_1, portal);

			$.template_effect(
				($0, $1, $2, $3, $4) => {
					$.set_attribute(div_1, 'id', $.get(id));
					$.set_attribute(div_1, 'aria-label', state.activeImage?.alt || 'Image gallery');
					$.set_class(div_1, 1, $0);
					$.set_class(button, 1, $1);
					styles = $.set_style(button, '', styles, { 'transition-duration': `${state.animationDuration}ms` });
					$.set_class(div_2, 1, $2);
					$.set_class(div_3, 1, $3);
					$.set_class(button_4, 1, $4);
					$.set_attribute(button_4, 'aria-label', closeLabel());
				},
				[
					() => $.clsx($.get(classes).portal()),
					() => $.clsx($.get(classes).overlay({ visible: state.overlayVisible })),
					() => $.clsx($.get(classes).viewport({ visible: state.contentVisible })),
					() => $.clsx($.get(classes).scroller()),
					() => $.clsx($.get(classes).closeButton())
				]
			);

			$.delegated('click', button, function click() {
				return closeOnClickOutside() && state.close();
			});

			$.delegated('click', button_4, function (...$$args) {
				$.apply(() => state.close, this, $$args, ImageGallery, [202, 12]);
			});

			$.append($$anchor, div_1);
		};

		$.add_svelte_meta(
			() => $.if(node_1, ($$render) => {
				if (state.mounted && $.get(imageRect)) $$render(consequent_5);
			}),
			'if',
			ImageGallery,
			100,
			0
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	ImageGallery = $.hmr(ImageGallery);

	import.meta.hot.acceptExports(["default"],(module) => {
		ImageGallery[$.HMR].update(module.default);
	});
}

export default ImageGallery;

$.delegate(['click']);
//# sourceMappingURL=data:application/json;base64,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LG1CQUVDLEVBQUU7cUJBRkgscUJBS1ksS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksZUFBZTtpQkFMckQ7aUJBUUM7MEJBQUEsZ0RBTThCLEtBQUssQ0FBQyxpQkFBaUI7aUJBR3JELEtBQUc7aUJBQ0YsS0FBRztpQkE4RUo7cUJBQUEsd0JBSVksVUFBVTs7O3dCQTlGaEIsT0FBTyxFQUFDLE1BQU07d0JBSWIsT0FBTyxFQUFDLE9BQU8sR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWM7d0JBTzNDLE9BQU8sRUFBQyxRQUFRLEdBQUcsT0FBTyxFQUFFLEtBQUssQ0FBQyxjQUFjO3dCQUNiLE9BQU8sRUFBQyxRQUFRO3dCQWlGdkQsT0FBTyxFQUFDLFdBQVc7Ozs7d0JBM0YxQjtXQUtlLG1CQUFtQixNQUFJLEtBQUssQ0FBQyxLQUFLOzs7d0JBbUZqRDtrQkFLUyxLQUFLLENBQUMsS0FBSzs7O3NCQXJHckI7Ozs7O1FBREcsS0FBSyxDQUFDLE9BQU8sVUFBSSxTQUFTOzs7Ozs7Ozs7Ozs7QUFOdkIiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkltYWdlR2FsbGVyeS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cblx0aW1wb3J0IFNsb3QgZnJvbSAnLi4vU2xvdC9TbG90LnN2ZWx0ZSc7XG5cdGltcG9ydCB7IGNhcmV0TGVmdEljb24gfSBmcm9tICcuLi9JY29ucy9jYXJldExlZnQuanMnO1xuXHRpbXBvcnQgeyBjYXJldFJpZ2h0SWNvbiB9IGZyb20gJy4uL0ljb25zL2NhcmV0UmlnaHQuanMnO1xuXHRpbXBvcnQgeyB4SWNvbiB9IGZyb20gJy4uL0ljb25zL3guanMnO1xuXHRpbXBvcnQgeyBwb3J0YWwgfSBmcm9tICckbGliL2F0dGFjaG1lbnRzL3BvcnRhbC5qcyc7XG5cdGltcG9ydCB7IHVzZVBhbnpvb20gfSBmcm9tICckbGliL3V0aWxzL3VzZVBhbnpvb20uc3ZlbHRlLmpzJztcblx0aW1wb3J0IHsgSW1hZ2VHYWxsZXJ5U3RhdGUgfSBmcm9tICcuL2ltYWdlR2FsbGVyeS5zdGF0ZS5zdmVsdGUuanMnO1xuXHRpbXBvcnQgdHlwZSB7IEltYWdlR2FsbGVyeVByb3BzIH0gZnJvbSAnLi9pbWFnZUdhbGxlcnkucHJvcHMuanMnO1xuXHRpbXBvcnQgeyB1c2VJbWFnZUdhbGxlcnlUaGVtZSB9IGZyb20gJy4vaW1hZ2VHYWxsZXJ5LnRoZW1lLmpzJztcblxuXHRsZXQge1xuXHRcdGlkOiBjdXN0b21JZCxcblx0XHRvcGVuID0gJGJpbmRhYmxlKGZhbHNlKSxcblx0XHRhY3RpdmVJbmRleCA9ICRiaW5kYWJsZSgwKSxcblx0XHRpbWFnZVNlbGVjdG9yID0gJ2ltZycsXG5cdFx0ZGlzYWJsZWQgPSBmYWxzZSxcblx0XHR6b29tTWFyZ2luID0gMzIsXG5cdFx0dHJhbnNpdGlvbkR1cmF0aW9uID0gMjQwLFxuXHRcdGNsb3NlT25DbGlja091dHNpZGUgPSB0cnVlLFxuXHRcdGNsb3NlT25Fc2NhcGUgPSB0cnVlLFxuXHRcdGxvY2tTY3JvbGwgPSB0cnVlLFxuXHRcdGJ1dHRvbkxhYmVsID0gJ09wZW4gaW1hZ2UgZ2FsbGVyeScsXG5cdFx0Y2xvc2VMYWJlbCA9ICdDbG9zZSBpbWFnZSBnYWxsZXJ5Jyxcblx0XHRwcmV2aW91c0xhYmVsID0gJ1ByZXZpb3VzIGltYWdlJyxcblx0XHRuZXh0TGFiZWwgPSAnTmV4dCBpbWFnZScsXG5cdFx0Y2xhc3M6IGNsYXNzTmFtZSxcblx0XHRvbk9wZW5DaGFuZ2UsXG5cdFx0b25JbmRleENoYW5nZSxcblx0XHR0aGVtZSxcblx0XHRjaGlsZHJlbixcblx0XHRjYXB0aW9uLFxuXHRcdC4uLmF0dGFjaG1lbnRzXG5cdH06IEltYWdlR2FsbGVyeVByb3BzID0gJHByb3BzKCk7XG5cblx0Y29uc3QgZ2VuZXJhdGVkSWQgPSAkcHJvcHMuaWQoKTtcblx0Y29uc3QgaWQgPSAkZGVyaXZlZChjdXN0b21JZCB8fCBnZW5lcmF0ZWRJZCk7XG5cdGNvbnN0IGNsYXNzZXMgPSAkZGVyaXZlZCh1c2VJbWFnZUdhbGxlcnlUaGVtZSh0aGVtZSkpO1xuXHRjb25zdCBzdGF0ZSA9IG5ldyBJbWFnZUdhbGxlcnlTdGF0ZSh7XG5cdFx0Z2V0IGltYWdlU2VsZWN0b3IoKSB7XG5cdFx0XHRyZXR1cm4gaW1hZ2VTZWxlY3Rvcjtcblx0XHR9LFxuXHRcdGdldCBpc09wZW4oKSB7XG5cdFx0XHRyZXR1cm4gb3Blbjtcblx0XHR9LFxuXHRcdHNldCBpc09wZW4odmFsdWUpIHtcblx0XHRcdG9wZW4gPSB2YWx1ZTtcblx0XHR9LFxuXHRcdGdldCBhY3RpdmVJbmRleCgpIHtcblx0XHRcdHJldHVybiBhY3RpdmVJbmRleDtcblx0XHR9LFxuXHRcdHNldCBhY3RpdmVJbmRleCh2YWx1ZSkge1xuXHRcdFx0YWN0aXZlSW5kZXggPSB2YWx1ZTtcblx0XHR9LFxuXHRcdGdldCBkaXNhYmxlZCgpIHtcblx0XHRcdHJldHVybiBkaXNhYmxlZDtcblx0XHR9LFxuXHRcdGdldCB6b29tTWFyZ2luKCkge1xuXHRcdFx0cmV0dXJuIHpvb21NYXJnaW47XG5cdFx0fSxcblx0XHRnZXQgdHJhbnNpdGlvbkR1cmF0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRyYW5zaXRpb25EdXJhdGlvbjtcblx0XHR9LFxuXHRcdGdldCBjbG9zZU9uRXNjYXBlKCkge1xuXHRcdFx0cmV0dXJuIGNsb3NlT25Fc2NhcGU7XG5cdFx0fSxcblx0XHRnZXQgbG9ja1Njcm9sbCgpIHtcblx0XHRcdHJldHVybiBsb2NrU2Nyb2xsO1xuXHRcdH0sXG5cdFx0Z2V0IGJ1dHRvbkxhYmVsKCkge1xuXHRcdFx0cmV0dXJuIGJ1dHRvbkxhYmVsO1xuXHRcdH0sXG5cdFx0Z2V0IG9uT3BlbkNoYW5nZSgpIHtcblx0XHRcdHJldHVybiBvbk9wZW5DaGFuZ2U7XG5cdFx0fSxcblx0XHRnZXQgb25JbmRleENoYW5nZSgpIHtcblx0XHRcdHJldHVybiBvbkluZGV4Q2hhbmdlO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgaW1hZ2VSZWN0ID0gJGRlcml2ZWQoc3RhdGUuaW1hZ2VSZWN0KTtcblx0Y29uc3QgcGFuem9vbSA9IHVzZVBhbnpvb20oe1xuXHRcdG1pblpvb206IDEsXG5cdFx0bWF4Wm9vbTogNSxcblx0XHR6b29tU3BlZWQ6IDAuNjUsXG5cdFx0ZG91YmxlQ2xpY2tTY2FsZTogMixcblx0XHRhY3RpdmF0ZU1vdXNlV2hlZWw6IHRydWVcblx0fSk7XG5cdGNvbnN0IG5vQXR0YWNobWVudCA9ICgpID0+IHt9O1xuXG5cdCRlZmZlY3QoKCkgPT4ge1xuXHRcdGlmIChhY3RpdmVJbmRleCA+PSAwKSBwYW56b29tLnJlc2V0KCk7XG5cdH0pO1xuPC9zY3JpcHQ+XG5cbjxkaXYgYmluZDp0aGlzPXtzdGF0ZS5yb290RWxlbWVudH0gY2xhc3M9e2NsYXNzZXMucm9vdCh7IGNsYXNzTmFtZSB9KX0gey4uLmF0dGFjaG1lbnRzfT5cblx0PFNsb3QgcmVuZGVyPXtjaGlsZHJlbn0gcGF5bG9hZD17c3RhdGUucGF5bG9hZH0gLz5cbjwvZGl2PlxuXG57I2lmIHN0YXRlLm1vdW50ZWQgJiYgaW1hZ2VSZWN0fVxuXHQ8ZGl2XG5cdFx0e0BhdHRhY2ggcG9ydGFsKCl9XG5cdFx0e2lkfVxuXHRcdHJvbGU9XCJkaWFsb2dcIlxuXHRcdGFyaWEtbW9kYWw9XCJ0cnVlXCJcblx0XHRhcmlhLWxhYmVsPXtzdGF0ZS5hY3RpdmVJbWFnZT8uYWx0IHx8ICdJbWFnZSBnYWxsZXJ5J31cblx0XHRjbGFzcz17Y2xhc3Nlcy5wb3J0YWwoKX1cblx0PlxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Y2xhc3M9e2NsYXNzZXMub3ZlcmxheSh7IHZpc2libGU6IHN0YXRlLm92ZXJsYXlWaXNpYmxlIH0pfVxuXHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdHRhYmluZGV4PVwiLTFcIlxuXHRcdFx0b25jbGljaz17KCkgPT4gY2xvc2VPbkNsaWNrT3V0c2lkZSAmJiBzdGF0ZS5jbG9zZSgpfVxuXHRcdFx0c3R5bGU6dHJhbnNpdGlvbi1kdXJhdGlvbj17YCR7c3RhdGUuYW5pbWF0aW9uRHVyYXRpb259bXNgfVxuXHRcdD48L2J1dHRvbj5cblxuXHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMudmlld3BvcnQoeyB2aXNpYmxlOiBzdGF0ZS5jb250ZW50VmlzaWJsZSB9KX0gZGF0YS1pbWFnZS1nYWxsZXJ5LXN0YWdlPlxuXHRcdFx0PGRpdiBiaW5kOnRoaXM9e3N0YXRlLnNjcm9sbGVyRWxlbWVudH0gY2xhc3M9e2NsYXNzZXMuc2Nyb2xsZXIoKX0+XG5cdFx0XHRcdHsjZWFjaCBzdGF0ZS5pbWFnZXMgYXMgaW1hZ2UgKGltYWdlLnNyYyl9XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz17Y2xhc3Nlcy5zbGlkZSh7IHJlbGF0aW9uOiBzdGF0ZS5nZXRJbWFnZVJlbGF0aW9uKGltYWdlLmluZGV4KSB9KX0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLnNsaWRlSW5uZXIoeyByZWxhdGlvbjogc3RhdGUuZ2V0SW1hZ2VSZWxhdGlvbihpbWFnZS5pbmRleCkgfSl9PlxuXHRcdFx0XHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0XHRcdFx0c3JjPXtpbWFnZS5zcmN9XG5cdFx0XHRcdFx0XHRcdFx0YWx0PXtpbWFnZS5hbHR9XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMuaW1hZ2UoKX1cblx0XHRcdFx0XHRcdFx0XHRkYXRhLWltYWdlLWdhbGxlcnktb3ZlcmxheS1pbmRleD17aW1hZ2UuaW5kZXh9XG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2dhYmxlPVwiZmFsc2VcIlxuXHRcdFx0XHRcdFx0XHRcdHtAYXR0YWNoIGltYWdlLmluZGV4ID09PSBhY3RpdmVJbmRleCA/IHBhbnpvb20uYXR0YWNoIDogbm9BdHRhY2htZW50fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHsvZWFjaH1cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHR7I2lmIHN0YXRlLmltYWdlcy5sZW5ndGggPiAxfVxuXHRcdFx0XHQ8ZGl2IGJpbmQ6dGhpcz17c3RhdGUudGh1bWJuYWlsU2Nyb2xsZXJFbGVtZW50fSBjbGFzcz17Y2xhc3Nlcy50aHVtYm5haWxzKCl9PlxuXHRcdFx0XHRcdHsjZWFjaCBzdGF0ZS5pbWFnZXMgYXMgaW1hZ2V9XG5cdFx0XHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRhcmlhLWxhYmVsPXtgT3BlbiBpbWFnZSAke2ltYWdlLmluZGV4ICsgMX1gfVxuXHRcdFx0XHRcdFx0XHRhcmlhLWN1cnJlbnQ9e3N0YXRlLmFjdGl2ZUluZGV4ID09PSBpbWFnZS5pbmRleCA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdFx0XHRcdFx0Y2xhc3M9e2NsYXNzZXMudGh1bWJuYWlsKHsgYWN0aXZlOiBzdGF0ZS5hY3RpdmVJbmRleCA9PT0gaW1hZ2UuaW5kZXggfSl9XG5cdFx0XHRcdFx0XHRcdG9uY2xpY2s9eygpID0+IHN0YXRlLnNldEFjdGl2ZUluZGV4KGltYWdlLmluZGV4KX1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2ltYWdlLnNyY30gYWx0PVwiXCIgY2xhc3M9e2NsYXNzZXMudGh1bWJuYWlsSW1hZ2UoKX0gZHJhZ2dhYmxlPVwiZmFsc2VcIiAvPlxuXHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0ey9lYWNofVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdHsvaWZ9XG5cblx0XHRcdHsjaWYgc3RhdGUuaW1hZ2VzLmxlbmd0aCA+IDF9XG5cdFx0XHRcdDxkaXYgY2xhc3M9e2NsYXNzZXMubmF2aWdhdGlvbigpfT5cblx0XHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdGFyaWEtY29udHJvbHM9e2lkfVxuXHRcdFx0XHRcdFx0YXJpYS1sYWJlbD17cHJldmlvdXNMYWJlbH1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXshc3RhdGUuY2FuUHJldmlvdXN9XG5cdFx0XHRcdFx0XHRjbGFzcz17Y2xhc3Nlcy5uYXZpZ2F0aW9uQnV0dG9uKHsgZGlyZWN0aW9uOiAncHJldmlvdXMnIH0pfVxuXHRcdFx0XHRcdFx0b25jbGljaz17c3RhdGUucHJldmlvdXN9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e0ByZW5kZXIgY2FyZXRMZWZ0SWNvbih7IHNpemU6IDIwIH0pfVxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRhcmlhLWNvbnRyb2xzPXtpZH1cblx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9e25leHRMYWJlbH1cblx0XHRcdFx0XHRcdGRpc2FibGVkPXshc3RhdGUuY2FuTmV4dH1cblx0XHRcdFx0XHRcdGNsYXNzPXtjbGFzc2VzLm5hdmlnYXRpb25CdXR0b24oeyBkaXJlY3Rpb246ICduZXh0JyB9KX1cblx0XHRcdFx0XHRcdG9uY2xpY2s9e3N0YXRlLm5leHR9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e0ByZW5kZXIgY2FyZXRSaWdodEljb24oeyBzaXplOiAyMCB9KX1cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR7L2lmfVxuXHRcdDwvZGl2PlxuXG5cdFx0eyNpZiBzdGF0ZS5mbGlwVmlzaWJsZSAmJiBzdGF0ZS5hY3RpdmVJbWFnZX1cblx0XHRcdDxpbWdcblx0XHRcdFx0c3JjPXtzdGF0ZS5hY3RpdmVJbWFnZS5zcmN9XG5cdFx0XHRcdGFsdD1cIlwiXG5cdFx0XHRcdGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG5cdFx0XHRcdGRhdGEtaW1hZ2UtZ2FsbGVyeS1mbGlwXG5cdFx0XHRcdGNsYXNzPXtjbGFzc2VzLmZsaXBJbWFnZSh7IGFuaW1hdGluZzogc3RhdGUuZmxpcEFuaW1hdGluZyB9KX1cblx0XHRcdFx0ZHJhZ2dhYmxlPVwiZmFsc2VcIlxuXHRcdFx0XHRzdHlsZTpsZWZ0PXtgJHtpbWFnZVJlY3QubGVmdH1weGB9XG5cdFx0XHRcdHN0eWxlOnRvcD17YCR7aW1hZ2VSZWN0LnRvcH1weGB9XG5cdFx0XHRcdHN0eWxlOndpZHRoPXtgJHtpbWFnZVJlY3Qud2lkdGh9cHhgfVxuXHRcdFx0XHRzdHlsZTpoZWlnaHQ9e2Ake2ltYWdlUmVjdC5oZWlnaHR9cHhgfVxuXHRcdFx0XHRzdHlsZTpib3JkZXItcmFkaXVzPXtzdGF0ZS5mbGlwQm9yZGVyUmFkaXVzfVxuXHRcdFx0XHRzdHlsZTp0cmFuc2Zvcm09e3N0YXRlLmZsaXBUcmFuc2Zvcm19XG5cdFx0XHRcdHN0eWxlOnRyYW5zaXRpb24tZHVyYXRpb249e2Ake3N0YXRlLmFuaW1hdGlvbkR1cmF0aW9ufW1zYH1cblx0XHRcdC8+XG5cdFx0ey9pZn1cblxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0YmluZDp0aGlzPXtzdGF0ZS5jbG9zZUJ1dHRvbkVsZW1lbnR9XG5cdFx0XHRjbGFzcz17Y2xhc3Nlcy5jbG9zZUJ1dHRvbigpfVxuXHRcdFx0YXJpYS1sYWJlbD17Y2xvc2VMYWJlbH1cblx0XHRcdG9uY2xpY2s9e3N0YXRlLmNsb3NlfVxuXHRcdD5cblx0XHRcdHtAcmVuZGVyIHhJY29uKHsgc2l6ZTogMjAgfSl9XG5cdFx0PC9idXR0b24+XG5cblx0XHR7I2lmIHN0YXRlLmNvbnRlbnRWaXNpYmxlICYmIGNhcHRpb259XG5cdFx0XHQ8U2xvdCByZW5kZXI9e2NhcHRpb259IHBheWxvYWQ9e3N0YXRlLnBheWxvYWR9IGNsYXNzPXtjbGFzc2VzLmNhcHRpb24oKX0gLz5cblx0XHR7OmVsc2UgaWYgc3RhdGUuY29udGVudFZpc2libGUgJiYgc3RhdGUuYWN0aXZlSW1hZ2U/LmNhcHRpb259XG5cdFx0XHQ8ZGl2IGNsYXNzPXtjbGFzc2VzLmNhcHRpb24oKX0+e3N0YXRlLmFjdGl2ZUltYWdlLmNhcHRpb259PC9kaXY+XG5cdFx0ey9pZn1cblx0PC9kaXY+XG57L2lmfVxuIl0sImZpbGUiOiIvVXNlcnMvYXJuYXVkL2NvZGUvYWkyL3NyYy9saWIvY29tcG9uZW50cy9JbWFnZUdhbGxlcnkvSW1hZ2VHYWxsZXJ5LnN2ZWx0ZSJ9