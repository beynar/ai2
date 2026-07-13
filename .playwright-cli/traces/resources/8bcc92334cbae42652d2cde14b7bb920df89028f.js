import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/components/image-gallery/+page.svelte");import "/node_modules/.vite/deps/svelte_internal_disclose-version.js?v=1b1d2797";
import "/node_modules/.vite/deps/svelte_internal_flags_async.js?v=1b1d2797";

_page[$.FILENAME] = 'src/routes/components/image-gallery/+page.svelte';

import * as $ from "/node_modules/.vite/deps/svelte_internal_client.js?v=1b1d2797";
import Button from "/src/lib/components/Button/Button.svelte";
import { ImageGallery } from "/src/lib/components/ImageGallery/index.ts";
import ComponentCard from "/src/routes/ComponentCard.svelte";
import DocPage from "/src/routes/DocPage.svelte?t=1783864636289";

var root = $.add_locations(
	$.from_html(`<article class="grid gap-5"><div><p class="text-foreground-muted text-sm font-medium">Field notes</p> <h3 class="mt-1 text-2xl font-semibold">Two scenes, one gallery</h3> <p class="text-foreground-muted mt-2 max-w-prose">The wrapper keeps the article structure intact while image descendants become gallery
							triggers.</p></div> <div class="grid gap-3 sm:grid-cols-[1.4fr_1fr]"><img alt="Mountain valley at sunrise" title="First light over the valley" class="h-72 w-full rounded-xl object-cover"/> <img alt="Concrete house with large glass windows" title="Glass and concrete" class="h-72 w-full rounded-xl object-cover"/></div></article>`),
	_page[$.FILENAME],
	[
		[
			85,
			4,
			[
				[86, 5, [[87, 6], [88, 6], [89, 6]]],
				[94, 5, [[95, 6], [101, 6]]]
			]
		]
	]
);

var root_1 = $.add_locations($.from_html(`<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"><img alt="Desert road with sandstone formations" title="Desert road" class="h-48 w-full rounded-xl object-cover"/> <img alt="Clear turquoise ocean water at a beach" title="Clear ocean water" class="h-48 w-full rounded-xl object-cover"/> <img alt="Night sky over snowy mountains" title="Night sky" class="h-48 w-full rounded-xl object-cover"/></div>`), _page[$.FILENAME], [[139, 5, [[140, 6], [146, 6], [152, 6]]]]);
var root_2 = $.add_locations($.from_html(`<div class="grid gap-4"><!> <!></div>`), _page[$.FILENAME], [[128, 3]]);
var root_3 = $.add_locations($.from_html(`<span> </span>`), _page[$.FILENAME], [[198, 5]]);
var root_4 = $.add_locations($.from_html(`<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"><img alt="Desert road with sandstone formations" title="Road through sandstone formations" class="h-52 w-full rounded-xl object-cover"/> <img alt="Clear turquoise ocean water at a beach" title="Turquoise water at low tide" class="h-52 w-full rounded-xl object-cover"/> <img alt="Night sky over snowy mountains" title="Stars above a snowy ridge" class="h-52 w-full rounded-xl object-cover"/></div>`), _page[$.FILENAME], [[176, 4, [[177, 5], [183, 5], [189, 5]]]]);
var root_5 = $.add_locations($.from_html(`<!> <!> <!>`, 1), _page[$.FILENAME], []);
var root_6 = $.add_locations($.from_html(`<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"><img alt="Desert road with sandstone formations" title="Desert road with sandstone formations" class="h-56 w-full rounded-xl object-cover"/> <img alt="Clear turquoise ocean water at a beach" title="Clear turquoise ocean water" class="h-56 w-full rounded-xl object-cover"/> <img alt="Night sky over snowy mountains" title="Night sky over snowy mountains" class="h-56 w-full rounded-xl object-cover"/></div>`), _page[$.FILENAME], [[47, 3, [[48, 4], [54, 4], [60, 4]]]]);

function _page($$anchor, $$props) {
	$.check_target(new.target);
	$.push($$props, true, _page);

	let controlledOpen = $.tag($.state(false), 'controlledOpen');
	let controlledIndex = $.tag($.state(1), 'controlledIndex');
	const landscapeOne = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=80';
	const landscapeTwo = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=80';
	const landscapeThree = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1100&q=80';
	const articleOne = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';
	const articleTwo = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80';
	var $$exports = { ...$.legacy_api() };
	var fragment = $.comment();
	var node = $.first_child(fragment);

	{
		const examples = $.wrap_snippet(_page, function ($$anchor) {
			$.validate_snippet_args(...arguments);

			var fragment_1 = root_5();
			var node_1 = $.first_child(fragment_1);

			$.add_svelte_meta(
				() => ComponentCard(node_1, {
					title: 'Article Markup',
					description: 'The component enhances only descendant images and leaves surrounding HTML as authored.',
					class: 'max-w-3xl',
					code: `<ImageGallery>
	<article>
		<h3>Field notes</h3>
		<p>Existing prose stays in place.</p>
		<img src="/mountain.jpg" alt="Mountain valley" title="First light" />
		<img src="/house.jpg" alt="Concrete house" title="Glass and concrete" />
	</article>
</ImageGallery>`,

					children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
						var fragment_2 = $.comment();
						var node_2 = $.first_child(fragment_2);

						$.add_svelte_meta(
							() => ImageGallery(node_2, {
								children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
									var article = root();
									var div = $.sibling($.child(article), 2);
									var img = $.child(div);

									$.set_attribute(img, 'src', articleOne);

									var img_1 = $.sibling(img, 2);

									$.set_attribute(img_1, 'src', articleTwo);
									$.reset(div);
									$.reset(article);
									$.append($$anchor, article);
								}),
								$$slots: { default: true }
							}),
							'component',
							_page,
							84,
							3,
							{ componentTag: 'ImageGallery' }
						);

						$.append($$anchor, fragment_2);
					}),
					$$slots: { default: true }
				}),
				'component',
				_page,
				71,
				2,
				{ componentTag: 'ComponentCard' }
			);

			var node_3 = $.sibling(node_1, 2);

			$.add_svelte_meta(
				() => ComponentCard(node_3, {
					title: 'Controlled',
					description: 'Bind open and activeIndex when an external control should open the zoomed viewer.',
					class: 'max-w-4xl',
					code: `let open = $state(false);
let activeIndex = $state(1);

<Button onClick={() => { activeIndex = 1; open = true; }}>
	Open second image
</Button>

<ImageGallery bind:open bind:activeIndex>
	<img src="/one.jpg" alt="First image" />
	<img src="/two.jpg" alt="Second image" />
</ImageGallery>`,

					children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
						var div_1 = root_2();
						var node_4 = $.child(div_1);

						$.add_svelte_meta(
							() => Button(node_4, {
								variant: 'outline',
								onClick: () => {
									$.set(controlledIndex, 1);
									$.set(controlledOpen, true);
								},

								children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
									$.next();

									var text = $.text('Open second image');

									$.append($$anchor, text);
								}),
								$$slots: { default: true }
							}),
							'component',
							_page,
							129,
							4,
							{ componentTag: 'Button' }
						);

						var node_5 = $.sibling(node_4, 2);

						$.add_svelte_meta(
							() => ImageGallery(node_5, {
								get open() {
									return $.get(controlledOpen);
								},

								set open($$value) {
									$.set(controlledOpen, $$value, true);
								},

								get activeIndex() {
									return $.get(controlledIndex);
								},

								set activeIndex($$value) {
									$.set(controlledIndex, $$value, true);
								},

								children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
									var div_2 = root_1();
									var img_2 = $.child(div_2);

									$.set_attribute(img_2, 'src', landscapeOne);

									var img_3 = $.sibling(img_2, 2);

									$.set_attribute(img_3, 'src', landscapeTwo);

									var img_4 = $.sibling(img_3, 2);

									$.set_attribute(img_4, 'src', landscapeThree);
									$.reset(div_2);
									$.append($$anchor, div_2);
								}),
								$$slots: { default: true }
							}),
							'component',
							_page,
							138,
							4,
							{ componentTag: 'ImageGallery' }
						);

						$.reset(div_1);
						$.append($$anchor, div_1);
					}),
					$$slots: { default: true }
				}),
				'component',
				_page,
				112,
				2,
				{ componentTag: 'ComponentCard' }
			);

			var node_6 = $.sibling(node_3, 2);

			$.add_svelte_meta(
				() => ComponentCard(node_6, {
					title: 'Custom Caption',
					description: 'Use the caption slot when the zoom layer needs richer context.',
					class: 'max-w-4xl',
					code: `<ImageGallery>
	<img src="/one.jpg" alt="Desert road" title="Desert road" />

	{#snippet caption({ activeImage, activeIndex, images })}
		<span>{activeIndex + 1} / {images.length} - {activeImage?.caption}</span>
	{/snippet}
</ImageGallery>`,

					children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
						var fragment_3 = $.comment();
						var node_7 = $.first_child(fragment_3);

						{
							const caption = $.wrap_snippet(_page, function ($$anchor, $$arg0) {
								$.validate_snippet_args(...arguments);

								let activeImage = () => ($$arg0?.()).activeImage;

								activeImage();

								let activeIndex = () => ($$arg0?.()).activeIndex;

								activeIndex();

								let images = () => ($$arg0?.()).images;

								images();

								var span = root_3();
								var text_1 = $.child(span);

								$.reset(span);
								$.template_effect(() => $.set_text(text_1, `${activeIndex() + 1} / ${images().length ?? ''} - ${activeImage()?.caption ?? ''}`));
								$.append($$anchor, span);
							});

							$.add_svelte_meta(
								() => ImageGallery(node_7, {
									caption,
									children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
										var div_3 = root_4();
										var img_5 = $.child(div_3);

										$.set_attribute(img_5, 'src', landscapeOne);

										var img_6 = $.sibling(img_5, 2);

										$.set_attribute(img_6, 'src', landscapeTwo);

										var img_7 = $.sibling(img_6, 2);

										$.set_attribute(img_7, 'src', landscapeThree);
										$.reset(div_3);
										$.append($$anchor, div_3);
									}),
									$$slots: { caption: true, default: true }
								}),
								'component',
								_page,
								175,
								3,
								{ componentTag: 'ImageGallery' }
							);
						}

						$.append($$anchor, fragment_3);
					}),
					$$slots: { default: true }
				}),
				'component',
				_page,
				163,
				2,
				{ componentTag: 'ComponentCard' }
			);

			$.append($$anchor, fragment_1);
		});

		$.add_svelte_meta(
			() => DocPage(node, {
				title: 'Image Gallery',
				subtitle: 'Enhance images inside arbitrary HTML and browse them in a zoomed lightbox.',
				component: 'ImageGallery',
				features: [
					'Wraps existing markup instead of requiring an items array',
					'Discovers descendant images from the DOM',
					'FLIP-zooms the clicked image into a full-viewport layer',
					'Native scroll-snap navigation with wheel and pinch zoom',
					'Controlled open and active index support'
				],
				examples,
				children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
					var fragment_4 = $.comment();
					var node_8 = $.first_child(fragment_4);

					$.add_svelte_meta(
						() => ComponentCard(node_8, {
							title: 'Basic Gallery',
							description: 'Wrap any image grid. Each descendant image becomes a zoom trigger.',
							class: 'max-w-4xl',
							code: `<ImageGallery>
	<div class="grid grid-cols-3 gap-3">
		<img src="/desert-road.jpg" alt="Desert road" title="Desert road" />
		<img src="/clear-water.jpg" alt="Clear ocean water" title="Clear ocean water" />
		<img src="/night-sky.jpg" alt="Night sky" title="Night sky" />
	</div>
</ImageGallery>`,

							children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
								var fragment_5 = $.comment();
								var node_9 = $.first_child(fragment_5);

								$.add_svelte_meta(
									() => ImageGallery(node_9, {
										children: $.wrap_snippet(_page, ($$anchor, $$slotProps) => {
											var div_4 = root_6();
											var img_8 = $.child(div_4);

											$.set_attribute(img_8, 'src', landscapeOne);

											var img_9 = $.sibling(img_8, 2);

											$.set_attribute(img_9, 'src', landscapeTwo);

											var img_10 = $.sibling(img_9, 2);

											$.set_attribute(img_10, 'src', landscapeThree);
											$.reset(div_4);
											$.append($$anchor, div_4);
										}),
										$$slots: { default: true }
									}),
									'component',
									_page,
									46,
									2,
									{ componentTag: 'ImageGallery' }
								);

								$.append($$anchor, fragment_5);
							}),
							$$slots: { default: true }
						}),
						'component',
						_page,
						34,
						1,
						{ componentTag: 'ComponentCard' }
					);

					$.append($$anchor, fragment_4);
				}),
				$$slots: { examples: true, default: true }
			}),
			'component',
			_page,
			22,
			0,
			{ componentTag: 'DocPage' }
		);
	}

	$.append($$anchor, fragment);

	return $.pop($$exports);
}

if (import.meta.hot) {
	_page = $.hmr(_page);

	import.meta.hot.acceptExports(["default"],(module) => {
		_page[$.HMR].update(module.default);
	});
}

export default _page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0MsT0FBTyxNQUFNLE1BQU0sc0NBQXNDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLFFBQVEsdUNBQXVDO0FBQ3BFLE9BQU8sYUFBYSxNQUFNLDRCQUE0QjtBQUN0RCxPQUFPLE9BQU8sTUFBTSxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBSjNDLENBQUM7Ozs7Q0FNQSxJQUFJLGNBQWMsU0FBRyxPQUFNLENBQUMsS0FBSztDQUNqQyxJQUFJLGVBQWUsU0FBRyxPQUFNLENBQUMsQ0FBQztDQUU5QixNQUFNLFlBQVksR0FDakIsK0ZBQStGO0NBQ2hHLE1BQU0sWUFBWSxHQUNqQiwrRkFBK0Y7Q0FDaEcsTUFBTSxjQUFjLEdBQ25CLCtGQUErRjtDQUNoRyxNQUFNLFVBQVUsR0FDZiwrRkFBK0Y7Q0FDaEcsTUFBTSxVQUFVLEdBQ2YsOEZBQThGOzs7Ozs7UUFtRHJGLFFBQVE7Ozs7Ozs7VUFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQWFDLFlBQVk7O2FBQ1gsT0FBTzthQVNOLEdBQUcscUJBVEosT0FBTzthQVVMLGNBREQsR0FBRzs7eUJBQ0YsWUFDSyxVQUFVOzthQUtmLGtCQU5BOzt5QkFNQSxjQUNLLFVBQVU7aUJBUmhCLEdBQUc7aUJBVEosT0FBTzs0QkFBUCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBMkJUOzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCQyxLQUFHOzJCQUFILEtBQUc7OzthQUNGOzt1QkFFZTtlQUNkLGVBQWUsRUFBRyxDQUFDO2VBQ25CLGNBQWMsRUFBRyxJQUFJO1FBQ3RCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQUlELFlBQVk7WUFBQyxJQUFTO3NCQUFFLGNBQWM7OztZQUF6QixJQUFTO2VBQUUsY0FBYzs7O1lBQUUsV0FBZ0I7c0JBQUUsZUFBZTs7O1lBQWpDLFdBQWdCO2VBQUUsZUFBZTs7OzthQUN4RSxLQUFHO2FBQ0YsZ0JBREQsS0FBRzs7eUJBQ0YsY0FDSyxZQUFZOzthQUtqQixrQkFOQTs7eUJBTUEsY0FDSyxZQUFZOzthQUtqQixrQkFOQTs7eUJBTUEsY0FDSyxjQUFjO2lCQWRwQixLQUFHOzRCQUFILEtBQUc7Ozs7Ozs7Ozs7O2NBWEwsS0FBRzt5QkFBSCxLQUFHOzs7Ozs7Ozs7Ozs7OztVQW1DSjs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFrQ1csT0FBTzs7O1lBQUcsV0FBVyxzQkFBWCxXQUFXOzs7O1lBQUUsV0FBVyxzQkFBWCxXQUFXOzs7O1lBQUUsTUFBTSxzQkFBTixNQUFNOzs7O1lBQ2xELElBQUk7NkJBQUosSUFBSTs7Z0JBQUosSUFBSTtzREFDSCxXQUFXLEtBQUcsQ0FBQyxNQUFLLE1BQU0sR0FBQyxNQUFNLFlBQUssV0FBVyxJQUFFLE9BQU87MkJBRDNELElBQUk7Ozs7Y0F2Qk4sWUFBWTtTQXNCRixPQUFPOztjQXJCaEIsS0FBRztjQUNGLGdCQURELEtBQUc7OzBCQUNGLGNBQ0ssWUFBWTs7Y0FLakIsa0JBTkE7OzBCQU1BLGNBQ0ssWUFBWTs7Y0FLakIsa0JBTkE7OzBCQU1BLGNBQ0ssY0FBYztrQkFkcEIsS0FBRzs2QkFBSCxLQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0ExSlA7Ozs7O0tBS0MsMkRBQTJEO0tBQzNELDBDQUEwQztLQUMxQyx5REFBeUQ7S0FDekQseURBQXlEO0tBQ3pELDBDQUF5Qzs7SUF1Q2hDLFFBQVE7Ozs7OztZQXBDakI7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBWUMsWUFBWTs7ZUFDWCxLQUFHO2VBQ0YsZ0JBREQsS0FBRzs7MkJBQ0YsY0FDSyxZQUFZOztlQUtqQixrQkFOQTs7MkJBTUEsY0FDSyxZQUFZOztlQUtqQixtQkFOQTs7MkJBTUEsZUFDSyxjQUFjO21CQWRwQixLQUFHOzhCQUFILEtBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEzQkMiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIitwYWdlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRpbXBvcnQgQnV0dG9uIGZyb20gJyRsaWIvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IEltYWdlR2FsbGVyeSB9IGZyb20gJyRsaWIvY29tcG9uZW50cy9JbWFnZUdhbGxlcnkvaW5kZXguanMnO1xuXHRpbXBvcnQgQ29tcG9uZW50Q2FyZCBmcm9tICcuLi8uLi9Db21wb25lbnRDYXJkLnN2ZWx0ZSc7XG5cdGltcG9ydCBEb2NQYWdlIGZyb20gJy4uLy4uL0RvY1BhZ2Uuc3ZlbHRlJztcblxuXHRsZXQgY29udHJvbGxlZE9wZW4gPSAkc3RhdGUoZmFsc2UpO1xuXHRsZXQgY29udHJvbGxlZEluZGV4ID0gJHN0YXRlKDEpO1xuXG5cdGNvbnN0IGxhbmRzY2FwZU9uZSA9XG5cdFx0J2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTAwNTM0MzE0MjA5LWEyNWRkYjJiZDQyOT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTExMDAmcT04MCc7XG5cdGNvbnN0IGxhbmRzY2FwZVR3byA9XG5cdFx0J2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA3NTI1NDI4MDM0LWI3MjNjZjk2MWQzZT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTExMDAmcT04MCc7XG5cdGNvbnN0IGxhbmRzY2FwZVRocmVlID1cblx0XHQnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTk2ODEzOTM3ODQtZDEyMDI2NzkzM2JhP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTEwMCZxPTgwJztcblx0Y29uc3QgYXJ0aWNsZU9uZSA9XG5cdFx0J2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDY0ODIyNzU5MDIzLWZlZDYyMmZmMmMzYj9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTEyMDAmcT04MCc7XG5cdGNvbnN0IGFydGljbGVUd28gPVxuXHRcdCdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5NDUyNjU4NTA5NS1jNDE3NDYyNDgxNTY/YXV0bz1mb3JtYXQmZml0PWNyb3Amdz05MDAmcT04MCc7XG48L3NjcmlwdD5cblxuPERvY1BhZ2Vcblx0dGl0bGU9XCJJbWFnZSBHYWxsZXJ5XCJcblx0c3VidGl0bGU9XCJFbmhhbmNlIGltYWdlcyBpbnNpZGUgYXJiaXRyYXJ5IEhUTUwgYW5kIGJyb3dzZSB0aGVtIGluIGEgem9vbWVkIGxpZ2h0Ym94LlwiXG5cdGNvbXBvbmVudD1cIkltYWdlR2FsbGVyeVwiXG5cdGZlYXR1cmVzPXtbXG5cdFx0J1dyYXBzIGV4aXN0aW5nIG1hcmt1cCBpbnN0ZWFkIG9mIHJlcXVpcmluZyBhbiBpdGVtcyBhcnJheScsXG5cdFx0J0Rpc2NvdmVycyBkZXNjZW5kYW50IGltYWdlcyBmcm9tIHRoZSBET00nLFxuXHRcdCdGTElQLXpvb21zIHRoZSBjbGlja2VkIGltYWdlIGludG8gYSBmdWxsLXZpZXdwb3J0IGxheWVyJyxcblx0XHQnTmF0aXZlIHNjcm9sbC1zbmFwIG5hdmlnYXRpb24gd2l0aCB3aGVlbCBhbmQgcGluY2ggem9vbScsXG5cdFx0J0NvbnRyb2xsZWQgb3BlbiBhbmQgYWN0aXZlIGluZGV4IHN1cHBvcnQnXG5cdF19XG4+XG5cdDxDb21wb25lbnRDYXJkXG5cdFx0dGl0bGU9XCJCYXNpYyBHYWxsZXJ5XCJcblx0XHRkZXNjcmlwdGlvbj1cIldyYXAgYW55IGltYWdlIGdyaWQuIEVhY2ggZGVzY2VuZGFudCBpbWFnZSBiZWNvbWVzIGEgem9vbSB0cmlnZ2VyLlwiXG5cdFx0Y2xhc3M9XCJtYXgtdy00eGxcIlxuXHRcdGNvZGU9e2A8SW1hZ2VHYWxsZXJ5PlxuXHQ8ZGl2IGNsYXNzPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtM1wiPlxuXHRcdDxpbWcgc3JjPVwiL2Rlc2VydC1yb2FkLmpwZ1wiIGFsdD1cIkRlc2VydCByb2FkXCIgdGl0bGU9XCJEZXNlcnQgcm9hZFwiIC8+XG5cdFx0PGltZyBzcmM9XCIvY2xlYXItd2F0ZXIuanBnXCIgYWx0PVwiQ2xlYXIgb2NlYW4gd2F0ZXJcIiB0aXRsZT1cIkNsZWFyIG9jZWFuIHdhdGVyXCIgLz5cblx0XHQ8aW1nIHNyYz1cIi9uaWdodC1za3kuanBnXCIgYWx0PVwiTmlnaHQgc2t5XCIgdGl0bGU9XCJOaWdodCBza3lcIiAvPlxuXHQ8L2Rpdj5cbjwvSW1hZ2VHYWxsZXJ5PmB9XG5cdD5cblx0XHQ8SW1hZ2VHYWxsZXJ5PlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyaWQgdy1mdWxsIGdyaWQtY29scy0xIGdhcC0zIHNtOmdyaWQtY29scy0zXCI+XG5cdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRzcmM9e2xhbmRzY2FwZU9uZX1cblx0XHRcdFx0XHRhbHQ9XCJEZXNlcnQgcm9hZCB3aXRoIHNhbmRzdG9uZSBmb3JtYXRpb25zXCJcblx0XHRcdFx0XHR0aXRsZT1cIkRlc2VydCByb2FkIHdpdGggc2FuZHN0b25lIGZvcm1hdGlvbnNcIlxuXHRcdFx0XHRcdGNsYXNzPVwiaC01NiB3LWZ1bGwgcm91bmRlZC14bCBvYmplY3QtY292ZXJcIlxuXHRcdFx0XHQvPlxuXHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0c3JjPXtsYW5kc2NhcGVUd299XG5cdFx0XHRcdFx0YWx0PVwiQ2xlYXIgdHVycXVvaXNlIG9jZWFuIHdhdGVyIGF0IGEgYmVhY2hcIlxuXHRcdFx0XHRcdHRpdGxlPVwiQ2xlYXIgdHVycXVvaXNlIG9jZWFuIHdhdGVyXCJcblx0XHRcdFx0XHRjbGFzcz1cImgtNTYgdy1mdWxsIHJvdW5kZWQteGwgb2JqZWN0LWNvdmVyXCJcblx0XHRcdFx0Lz5cblx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdHNyYz17bGFuZHNjYXBlVGhyZWV9XG5cdFx0XHRcdFx0YWx0PVwiTmlnaHQgc2t5IG92ZXIgc25vd3kgbW91bnRhaW5zXCJcblx0XHRcdFx0XHR0aXRsZT1cIk5pZ2h0IHNreSBvdmVyIHNub3d5IG1vdW50YWluc1wiXG5cdFx0XHRcdFx0Y2xhc3M9XCJoLTU2IHctZnVsbCByb3VuZGVkLXhsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L0ltYWdlR2FsbGVyeT5cblx0PC9Db21wb25lbnRDYXJkPlxuXG5cdHsjc25pcHBldCBleGFtcGxlcygpfVxuXHRcdDxDb21wb25lbnRDYXJkXG5cdFx0XHR0aXRsZT1cIkFydGljbGUgTWFya3VwXCJcblx0XHRcdGRlc2NyaXB0aW9uPVwiVGhlIGNvbXBvbmVudCBlbmhhbmNlcyBvbmx5IGRlc2NlbmRhbnQgaW1hZ2VzIGFuZCBsZWF2ZXMgc3Vycm91bmRpbmcgSFRNTCBhcyBhdXRob3JlZC5cIlxuXHRcdFx0Y2xhc3M9XCJtYXgtdy0zeGxcIlxuXHRcdFx0Y29kZT17YDxJbWFnZUdhbGxlcnk+XG5cdDxhcnRpY2xlPlxuXHRcdDxoMz5GaWVsZCBub3RlczwvaDM+XG5cdFx0PHA+RXhpc3RpbmcgcHJvc2Ugc3RheXMgaW4gcGxhY2UuPC9wPlxuXHRcdDxpbWcgc3JjPVwiL21vdW50YWluLmpwZ1wiIGFsdD1cIk1vdW50YWluIHZhbGxleVwiIHRpdGxlPVwiRmlyc3QgbGlnaHRcIiAvPlxuXHRcdDxpbWcgc3JjPVwiL2hvdXNlLmpwZ1wiIGFsdD1cIkNvbmNyZXRlIGhvdXNlXCIgdGl0bGU9XCJHbGFzcyBhbmQgY29uY3JldGVcIiAvPlxuXHQ8L2FydGljbGU+XG48L0ltYWdlR2FsbGVyeT5gfVxuXHRcdD5cblx0XHRcdDxJbWFnZUdhbGxlcnk+XG5cdFx0XHRcdDxhcnRpY2xlIGNsYXNzPVwiZ3JpZCBnYXAtNVwiPlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC1tdXRlZCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+RmllbGQgbm90ZXM8L3A+XG5cdFx0XHRcdFx0XHQ8aDMgY2xhc3M9XCJtdC0xIHRleHQtMnhsIGZvbnQtc2VtaWJvbGRcIj5Ud28gc2NlbmVzLCBvbmUgZ2FsbGVyeTwvaDM+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInRleHQtZm9yZWdyb3VuZC1tdXRlZCBtdC0yIG1heC13LXByb3NlXCI+XG5cdFx0XHRcdFx0XHRcdFRoZSB3cmFwcGVyIGtlZXBzIHRoZSBhcnRpY2xlIHN0cnVjdHVyZSBpbnRhY3Qgd2hpbGUgaW1hZ2UgZGVzY2VuZGFudHMgYmVjb21lIGdhbGxlcnlcblx0XHRcdFx0XHRcdFx0dHJpZ2dlcnMuXG5cdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImdyaWQgZ2FwLTMgc206Z3JpZC1jb2xzLVsxLjRmcl8xZnJdXCI+XG5cdFx0XHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0XHRcdHNyYz17YXJ0aWNsZU9uZX1cblx0XHRcdFx0XHRcdFx0YWx0PVwiTW91bnRhaW4gdmFsbGV5IGF0IHN1bnJpc2VcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT1cIkZpcnN0IGxpZ2h0IG92ZXIgdGhlIHZhbGxleVwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzPVwiaC03MiB3LWZ1bGwgcm91bmRlZC14bCBvYmplY3QtY292ZXJcIlxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0c3JjPXthcnRpY2xlVHdvfVxuXHRcdFx0XHRcdFx0XHRhbHQ9XCJDb25jcmV0ZSBob3VzZSB3aXRoIGxhcmdlIGdsYXNzIHdpbmRvd3NcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT1cIkdsYXNzIGFuZCBjb25jcmV0ZVwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzPVwiaC03MiB3LWZ1bGwgcm91bmRlZC14bCBvYmplY3QtY292ZXJcIlxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9hcnRpY2xlPlxuXHRcdFx0PC9JbWFnZUdhbGxlcnk+XG5cdFx0PC9Db21wb25lbnRDYXJkPlxuXG5cdFx0PENvbXBvbmVudENhcmRcblx0XHRcdHRpdGxlPVwiQ29udHJvbGxlZFwiXG5cdFx0XHRkZXNjcmlwdGlvbj1cIkJpbmQgb3BlbiBhbmQgYWN0aXZlSW5kZXggd2hlbiBhbiBleHRlcm5hbCBjb250cm9sIHNob3VsZCBvcGVuIHRoZSB6b29tZWQgdmlld2VyLlwiXG5cdFx0XHRjbGFzcz1cIm1heC13LTR4bFwiXG5cdFx0XHRjb2RlPXtgbGV0IG9wZW4gPSAkc3RhdGUoZmFsc2UpO1xubGV0IGFjdGl2ZUluZGV4ID0gJHN0YXRlKDEpO1xuXG48QnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgYWN0aXZlSW5kZXggPSAxOyBvcGVuID0gdHJ1ZTsgfX0+XG5cdE9wZW4gc2Vjb25kIGltYWdlXG48L0J1dHRvbj5cblxuPEltYWdlR2FsbGVyeSBiaW5kOm9wZW4gYmluZDphY3RpdmVJbmRleD5cblx0PGltZyBzcmM9XCIvb25lLmpwZ1wiIGFsdD1cIkZpcnN0IGltYWdlXCIgLz5cblx0PGltZyBzcmM9XCIvdHdvLmpwZ1wiIGFsdD1cIlNlY29uZCBpbWFnZVwiIC8+XG48L0ltYWdlR2FsbGVyeT5gfVxuXHRcdD5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmlkIGdhcC00XCI+XG5cdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHR2YXJpYW50PVwib3V0bGluZVwiXG5cdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29udHJvbGxlZEluZGV4ID0gMTtcblx0XHRcdFx0XHRcdGNvbnRyb2xsZWRPcGVuID0gdHJ1ZTtcblx0XHRcdFx0XHR9fVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0T3BlbiBzZWNvbmQgaW1hZ2Vcblx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdDxJbWFnZUdhbGxlcnkgYmluZDpvcGVuPXtjb250cm9sbGVkT3Blbn0gYmluZDphY3RpdmVJbmRleD17Y29udHJvbGxlZEluZGV4fT5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JpZCB3LWZ1bGwgZ3JpZC1jb2xzLTEgZ2FwLTMgc206Z3JpZC1jb2xzLTNcIj5cblx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0c3JjPXtsYW5kc2NhcGVPbmV9XG5cdFx0XHRcdFx0XHRcdGFsdD1cIkRlc2VydCByb2FkIHdpdGggc2FuZHN0b25lIGZvcm1hdGlvbnNcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT1cIkRlc2VydCByb2FkXCJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJoLTQ4IHctZnVsbCByb3VuZGVkLXhsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdFx0XHRzcmM9e2xhbmRzY2FwZVR3b31cblx0XHRcdFx0XHRcdFx0YWx0PVwiQ2xlYXIgdHVycXVvaXNlIG9jZWFuIHdhdGVyIGF0IGEgYmVhY2hcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT1cIkNsZWFyIG9jZWFuIHdhdGVyXCJcblx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJoLTQ4IHctZnVsbCByb3VuZGVkLXhsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdFx0XHRzcmM9e2xhbmRzY2FwZVRocmVlfVxuXHRcdFx0XHRcdFx0XHRhbHQ9XCJOaWdodCBza3kgb3ZlciBzbm93eSBtb3VudGFpbnNcIlxuXHRcdFx0XHRcdFx0XHR0aXRsZT1cIk5pZ2h0IHNreVwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzPVwiaC00OCB3LWZ1bGwgcm91bmRlZC14bCBvYmplY3QtY292ZXJcIlxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9JbWFnZUdhbGxlcnk+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L0NvbXBvbmVudENhcmQ+XG5cblx0XHQ8Q29tcG9uZW50Q2FyZFxuXHRcdFx0dGl0bGU9XCJDdXN0b20gQ2FwdGlvblwiXG5cdFx0XHRkZXNjcmlwdGlvbj1cIlVzZSB0aGUgY2FwdGlvbiBzbG90IHdoZW4gdGhlIHpvb20gbGF5ZXIgbmVlZHMgcmljaGVyIGNvbnRleHQuXCJcblx0XHRcdGNsYXNzPVwibWF4LXctNHhsXCJcblx0XHRcdGNvZGU9e2A8SW1hZ2VHYWxsZXJ5PlxuXHQ8aW1nIHNyYz1cIi9vbmUuanBnXCIgYWx0PVwiRGVzZXJ0IHJvYWRcIiB0aXRsZT1cIkRlc2VydCByb2FkXCIgLz5cblxuXHR7I3NuaXBwZXQgY2FwdGlvbih7IGFjdGl2ZUltYWdlLCBhY3RpdmVJbmRleCwgaW1hZ2VzIH0pfVxuXHRcdDxzcGFuPnthY3RpdmVJbmRleCArIDF9IC8ge2ltYWdlcy5sZW5ndGh9IC0ge2FjdGl2ZUltYWdlPy5jYXB0aW9ufTwvc3Bhbj5cblx0ey9zbmlwcGV0fVxuPC9JbWFnZUdhbGxlcnk+YH1cblx0XHQ+XG5cdFx0XHQ8SW1hZ2VHYWxsZXJ5PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JpZCB3LWZ1bGwgZ3JpZC1jb2xzLTEgZ2FwLTMgc206Z3JpZC1jb2xzLTNcIj5cblx0XHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0XHRzcmM9e2xhbmRzY2FwZU9uZX1cblx0XHRcdFx0XHRcdGFsdD1cIkRlc2VydCByb2FkIHdpdGggc2FuZHN0b25lIGZvcm1hdGlvbnNcIlxuXHRcdFx0XHRcdFx0dGl0bGU9XCJSb2FkIHRocm91Z2ggc2FuZHN0b25lIGZvcm1hdGlvbnNcIlxuXHRcdFx0XHRcdFx0Y2xhc3M9XCJoLTUyIHctZnVsbCByb3VuZGVkLXhsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0XHRzcmM9e2xhbmRzY2FwZVR3b31cblx0XHRcdFx0XHRcdGFsdD1cIkNsZWFyIHR1cnF1b2lzZSBvY2VhbiB3YXRlciBhdCBhIGJlYWNoXCJcblx0XHRcdFx0XHRcdHRpdGxlPVwiVHVycXVvaXNlIHdhdGVyIGF0IGxvdyB0aWRlXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwiaC01MiB3LWZ1bGwgcm91bmRlZC14bCBvYmplY3QtY292ZXJcIlxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdFx0c3JjPXtsYW5kc2NhcGVUaHJlZX1cblx0XHRcdFx0XHRcdGFsdD1cIk5pZ2h0IHNreSBvdmVyIHNub3d5IG1vdW50YWluc1wiXG5cdFx0XHRcdFx0XHR0aXRsZT1cIlN0YXJzIGFib3ZlIGEgc25vd3kgcmlkZ2VcIlxuXHRcdFx0XHRcdFx0Y2xhc3M9XCJoLTUyIHctZnVsbCByb3VuZGVkLXhsIG9iamVjdC1jb3ZlclwiXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0eyNzbmlwcGV0IGNhcHRpb24oeyBhY3RpdmVJbWFnZSwgYWN0aXZlSW5kZXgsIGltYWdlcyB9KX1cblx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdHthY3RpdmVJbmRleCArIDF9IC8ge2ltYWdlcy5sZW5ndGh9IC0ge2FjdGl2ZUltYWdlPy5jYXB0aW9ufVxuXHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0ey9zbmlwcGV0fVxuXHRcdFx0PC9JbWFnZUdhbGxlcnk+XG5cdFx0PC9Db21wb25lbnRDYXJkPlxuXHR7L3NuaXBwZXR9XG48L0RvY1BhZ2U+XG4iXSwiZmlsZSI6Ii9Vc2Vycy9hcm5hdWQvY29kZS9haTIvc3JjL3JvdXRlcy9jb21wb25lbnRzL2ltYWdlLWdhbGxlcnkvK3BhZ2Uuc3ZlbHRlIn0=