<script lang="ts">
	type Execute = string[];
	let {
		scripts = [],
		css = []
	}: {
		scripts?: string[];
		css?: string[];
	} = $props();
</script>

<svelte:head>
	{@html `<s${'cript'}>
		document.addEventListener('DOMContentLoaded', () => {
        	${scripts
						.map((script) => {
							return `${script}`;
						})
						.join('\n')}
		})
	</s${'cript'}>`}
	{@html `<s${'tyle'}>
            ${css.join('\n\n')}
        </s${'tyle'}>`}
</svelte:head>
