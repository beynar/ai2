<script lang="ts">
	import ScrollArea from '$lib/components/ScrollArea/ScrollArea.svelte';
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">ScrollArea Test</h1>

	<div class="mb-8">
		<h2 class="mb-2 text-xl font-semibold">Hover Type (Default)</h2>
		<ScrollArea type="hover" class="border-border h-64 w-64 rounded-md border">
			<div class="p-4">
				<h3 class="mb-2 text-lg font-medium">Simple Content</h3>
				<p class="mb-4">This is a test of the ScrollArea component with type="hover".</p>
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p class="mb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p class="mb-4">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<p class="mb-4">
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
					anim id est laborum.
				</p>
				<h3 class="mb-2 text-lg font-medium">Simple Content</h3>
				<p class="mb-4">This is a test of the ScrollArea component with type="hover".</p>
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p class="mb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p class="mb-4">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<p class="mb-4">
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
					anim id est laborum.
				</p>
				<h3 class="mb-2 text-lg font-medium">Simple Content</h3>
				<p class="mb-4">This is a test of the ScrollArea component with type="hover".</p>
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p class="mb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p class="mb-4">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<p class="mb-4">
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
					anim id est laborum.
				</p>
				<h3 class="mb-2 text-lg font-medium">Simple Content</h3>
				<p class="mb-4">This is a test of the ScrollArea component with type="hover".</p>
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p id="test" class="mb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p class="mb-4">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<p class="mb-4">
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
					anim id est laborum.
				</p>
			</div>
		</ScrollArea>
	</div>

	<div class="mb-8">
		<h2 class="mb-2 text-xl font-semibold">Always Type</h2>
		<ScrollArea type="always" class="border-border h-64 w-64 rounded-md border">
			<div class="p-4">
				<h3 class="mb-2 text-lg font-medium">List Content</h3>
				<ul>
					<li class="mb-2">Item 1</li>
					<li class="mb-2">Item 2</li>
					<li class="mb-2">Item 3</li>
					<li class="mb-2">Item 4</li>
					<li class="mb-2">Item 5</li>
					<li class="mb-2">Item 6</li>
					<li class="mb-2">Item 7</li>
					<li class="mb-2">Item 8</li>
					<li class="mb-2">Item 9</li>
					<li class="mb-2">Item 10</li>
					<li class="mb-2">Item 11</li>
					<li class="mb-2">Item 12</li>
					<li>Item 13</li>
				</ul>
			</div>
		</ScrollArea>
	</div>

	<div class="mb-8">
		<h2 class="mb-2 text-xl font-semibold">Auto Type</h2>
		<ScrollArea type="auto" class="border-border h-64 w-96 rounded-md border">
			<div class="p-4">
				<h3 class="mb-2 text-lg font-medium">Wide Content</h3>
				<div class="whitespace-nowrap">
					<p class="mb-4">This is a test of the ScrollArea component with type="auto".</p>
					<p class="mb-4">
						This content is designed to overflow horizontally to test the auto type behavior: Lorem
						ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>
		</ScrollArea>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-semibold">Scroll Type</h2>
		<ScrollArea type="scroll" class="border-border h-64 w-64 rounded-md border">
			<div class="p-4">
				<h3 class="mb-2 text-lg font-medium">Complex Content</h3>
				<p class="mb-4">This is a test of the ScrollArea component with type="scroll".</p>
				<div class="bg-muted mb-4 rounded p-2">
					<p>This is a div with some content inside.</p>
					<p>It has multiple paragraphs.</p>
					<p>And it's styled with a background color.</p>
				</div>
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<p class="mb-4">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
			</div>
		</ScrollArea>
	</div>
</div>
