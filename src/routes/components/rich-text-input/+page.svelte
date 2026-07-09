<script lang="ts">
	import { brainIcon } from '$lib/components/Icons/brain.js';
	import { fileTextIcon } from '$lib/components/Icons/fileText.js';
	import Form from '$lib/components/Form/Form/Form.svelte';
	import { robotIcon } from '$lib/components/Icons/robot.js';
	import { sparkleIcon } from '$lib/components/Icons/sparkle.js';
	import { wrenchIcon } from '$lib/components/Icons/wrench.js';
	import {
		RichTextInput,
		type RichTextInputFormat,
		type RichTextInputItem,
		type RichTextInputTriggers
	} from '$lib/components/RichTextInput/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	const commands: RichTextInputItem[] = [
		{
			id: 'summarize',
			label: '/summarize',
			kind: 'command',
			description: 'Condense the selected context.',
			icon: sparkleIcon,
			keywords: ['recap', 'summary'],
			promptText:
				'Summarize the referenced context and keep only the decisions, risks, and next actions.'
		},
		{
			id: 'draft-reply',
			label: '/reply',
			kind: 'command',
			description: 'Draft a concise response.',
			icon: robotIcon,
			keywords: ['answer', 'message'],
			promptText: 'Draft a concise response using the referenced context.'
		}
	];

	const references: RichTextInputItem[] = [
		{
			id: 'billing',
			label: 'billing-flow.ts',
			kind: 'file',
			group: 'Files',
			description: 'Checkout orchestration',
			icon: fileTextIcon,
			path: 'src/features/billing/billing-flow.ts',
			promptText: 'File: src/features/billing/billing-flow.ts'
		},
		{
			id: 'launch-plan',
			label: 'Launch plan',
			kind: 'reference',
			group: 'References',
			description: 'Release checklist reference',
			icon: fileTextIcon,
			path: 'refs/launch-plan',
			promptText: 'Reference: launch plan checklist'
		}
	];

	const skills: RichTextInputItem[] = [
		{
			id: 'review',
			label: 'Review',
			kind: 'skill',
			description: 'Adversarial code review.',
			icon: brainIcon,
			promptText: 'Skill: review with adversarial attention to regressions and missing tests.'
		},
		{
			id: 'debug',
			label: 'Debug',
			kind: 'skill',
			description: 'Find the smallest reproducible failure.',
			icon: wrenchIcon,
			promptText: 'Skill: debug by isolating the failing state before changing code.'
		}
	];

	const formats: RichTextInputFormat[] = [
		'bold',
		'italic',
		'code',
		'strikethrough',
		'highlight',
		'link',
		'bulletList',
		'orderedList',
		'heading1',
		'heading2',
		'heading3',
		'quote'
	];

	const triggers: RichTextInputTriggers = {
		'/': {
			title: 'AI commands',
			empty: 'No commands found.',
			group: 'Commands',
			tokenKind: 'command',
			items: commands,
			onSearch: (query) => filterItems(commands, query)
		},
		'@': {
			title: 'Mentions',
			empty: 'No files or references found.',
			items: references,
			onSearch: (query) => filterItems(references, query)
		},
		$: {
			title: 'Skills',
			empty: 'No skills found.',
			group: 'Skills',
			tokenKind: 'skill',
			items: skills,
			onSearch: (query) => filterItems(skills, query)
		}
	};

	let value = $state(
		'Review <File id="billing" label="billing-flow.ts" path="src/features/billing/billing-flow.ts" /> with <Skill id="review" label="Review" />'
	);

	function filterItems(items: RichTextInputItem[], query: string) {
		const normalizedQuery = query.toLowerCase();
		if (!normalizedQuery) return items;
		return items.filter(
			(item) =>
				item.id.toLowerCase().includes(normalizedQuery) ||
				item.label.toLowerCase().includes(normalizedQuery) ||
				item.description?.toLowerCase().includes(normalizedQuery) === true ||
				item.keywords?.some((keyword) => keyword.toLowerCase().includes(normalizedQuery)) === true
		);
	}
</script>

<DocPage
	title="Rich Text Input"
	subtitle="Markdown editor with inline formatting, trigger suggestions, and token insertion."
	component="RichTextInput"
	features={[
		'Bindable markdown value',
		'Slash, mention, and skill trigger suggestions',
		'Inline, list, heading, quote, highlight, and link formatting',
		'Fixed and selected-text toolbar modes',
		'Token metadata in onValueChange'
	]}
>
	<ComponentCard
		description="AI-style composer input with commands, mentions, skills, and a fixed toolbar."
		code={`<RichTextInput
	bind:value
	{triggers}
	toolbar="both"
	formats={formats}
	placeholder="Use / for commands, @ for files or references, $ for skills..."
/>`}
	>
		<div class="flex w-full max-w-4xl flex-col gap-4">
			<RichTextInput
				bind:value
				{triggers}
				toolbar="both"
				{formats}
				placeholder="Use / for commands, @ for files or references, $ for skills..."
			/>
			<div class="border-background-muted bg-background-light rounded-lg border p-3 text-sm">
				<div class="text-foreground-muted mb-2 text-xs font-medium">Markdown value</div>
				<pre
					class="text-foreground max-h-40 overflow-auto whitespace-pre-wrap break-words text-xs">{value}</pre>
			</div>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Fixed Toolbar"
			description="Use toolbar='fixed' when formatting controls should stay visible, toolbar='hover' for selected text, toolbar='both' for both, or toolbar='none' to hide them."
			code={`<RichTextInput
	toolbar="fixed"
	formats={['bold', 'italic', 'link', 'bulletList', 'orderedList']}
	placeholder="Write formatted notes..."
/>`}
		>
			<div class="w-full max-w-3xl">
				<RichTextInput
					toolbar="fixed"
					formats={['bold', 'italic', 'link', 'bulletList', 'orderedList']}
					placeholder="Write formatted notes..."
				/>
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large rich text input sizes."
			code={`<div class="grid w-full max-w-3xl gap-4">
	<RichTextInput label="Small" size="small" toolbar="none" placeholder="Small prompt..." />
	<RichTextInput label="Normal" size="normal" toolbar="none" placeholder="Normal prompt..." />
	<RichTextInput label="Large" size="large" toolbar="none" placeholder="Large prompt..." />
</div>`}
		>
			<div class="grid w-full max-w-3xl gap-4">
				<RichTextInput label="Small" size="small" toolbar="none" placeholder="Small prompt..." />
				<RichTextInput label="Normal" size="normal" toolbar="none" placeholder="Normal prompt..." />
				<RichTextInput label="Large" size="large" toolbar="none" placeholder="Large prompt..." />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Standalone Surface"
			description="Set standalone to render the editor without Field chrome or the input background surface."
			code={`<RichTextInput
	standalone
	toolbar="hover"
	placeholder="Prompt..."
/>`}
		>
			<div class="w-full max-w-3xl">
				<RichTextInput standalone toolbar="hover" placeholder="Prompt..." />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Default Uncapped Height"
			description="By default, the editor grows with its content. Pass maxHeight to opt into an internal scroll cap."
			code={`<RichTextInput
	placeholder="Write without an internal height cap..."
/>`}
		>
			<div class="w-full max-w-3xl">
				<RichTextInput placeholder="Write without an internal height cap..." />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Native Form Value"
			description="Pass name to mirror the markdown value through a hidden input."
			code={`<RichTextInput name="prompt" bind:value placeholder="Prompt..." />`}
		>
			<div class="w-full max-w-3xl">
				<RichTextInput name="prompt" bind:value placeholder="Prompt..." />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Form Field"
			description="Use type: 'rich-text' inside a Form."
			code={`<Form
	inputs={{
		prompt: {
			type: 'rich-text',
			label: 'Prompt',
			placeholder: 'Write a prompt...',
			toolbar: 'fixed'
		}
	}}
/>`}
		>
			<div class="w-full max-w-3xl">
				<Form
					inputs={{
						prompt: {
							type: 'rich-text',
							label: 'Prompt',
							placeholder: 'Write a prompt...',
							toolbar: 'fixed'
						}
					}}
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
