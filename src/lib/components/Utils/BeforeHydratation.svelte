<script lang="ts">
	type Execute = string[];
	let {
		once = false,
		scripts = [],
		css = []
	}: {
		once?: boolean;
		scripts?: string[];
		css?: string[];
	} = $props();

	const id = $props.id();
</script>

<svelte:head>
	{@html /*html*/ `<s${'cript'} id="${id}">
		document.addEventListener('DOMContentLoaded', () => {
        	${scripts
						.map((script) => {
							return `${script}`;
						})
						.join('\n')}
	${once ? `document.getElementById('${id}').remove();` : ''}
		})
						// if readyState is complete, execute the scripts directly
	if(document.readyState === 'complete') {
		${scripts
			.map((script) => {
				return `${script}`;
			})
			.join('\n')}
	${once ? `document.getElementById('${id}').remove();` : ''}
	}
	
	</s${'cript'}>`}
	{@html `<s${'tyle'}>
            ${css.join('\n\n')}
        </s${'tyle'}>`}
</svelte:head>
